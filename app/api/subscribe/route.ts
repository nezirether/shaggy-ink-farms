import { NextResponse } from 'next/server';
import {
  EMAIL_SIGNUP_INTERESTS,
  isEmailSignupInterest,
  type EmailSignupInterest,
} from '@/lib/email-signup';

export const runtime = 'nodejs';

const successMessage = "You're on the list.";
const RESEND_API_BASE = 'https://api.resend.com/contacts';

type ResendError = {
  name: string;
  message: string;
};

type ResendContactResponse = {
  data: { id: string } | null;
  error: ResendError | null;
};

function field(formData: FormData, key: string): string {
  return String(formData.get(key) ?? '').trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getInterest(value: string): EmailSignupInterest {
  return isEmailSignupInterest(value) ? value : 'farm';
}

function contactPayload({
  email,
  firstName,
  interest,
  source,
}: {
  email: string;
  firstName: string;
  interest: EmailSignupInterest;
  source: string;
}) {
  const interestDetails = EMAIL_SIGNUP_INTERESTS[interest];
  return {
    email,
    firstName: firstName || undefined,
    unsubscribed: false,
    properties: {
      signup_interest: interest,
      signup_interest_label: interestDetails.label,
      signup_source: source,
    },
  };
}

function contactUpdatePayload({
  interest,
  source,
}: {
  interest: EmailSignupInterest;
  source: string;
}) {
  const interestDetails = EMAIL_SIGNUP_INTERESTS[interest];
  return {
    properties: {
      signup_interest: interest,
      signup_interest_label: interestDetails.label,
      signup_source: source,
    },
  };
}

async function resendRequest(
  apiKey: string,
  method: 'POST' | 'PATCH',
  body: Record<string, unknown>,
): Promise<ResendContactResponse> {
  try {
    const response = await fetch(RESEND_API_BASE, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const payload = await response.json() as Record<string, unknown>;

    if (!response.ok) {
      return {
        data: null,
        error: {
          name: String(payload.name ?? 'resend_error'),
          message: String(payload.message ?? `Request failed with status ${response.status}`),
        },
      };
    }

    return {
      data: { id: String((payload as { id?: string }).id ?? '') },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        name: 'network_error',
        message: error instanceof Error ? error.message : 'Unknown network error',
      },
    };
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const firstName = field(formData, 'firstName');
  const email = field(formData, 'email').toLowerCase();
  const interest = getInterest(field(formData, 'interest'));
  const source = field(formData, 'source') || 'website';
  const company = field(formData, 'company');

  if (company) {
    return NextResponse.json({ message: successMessage });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[subscribe] RESEND_API_KEY is not set.');
    return NextResponse.json(
      {
        message:
          'Farm updates are almost ready. Please check back soon or email hello@shaggyinkfarms.com.',
      },
      { status: 503 },
    );
  }

  let createResult = await resendRequest(
    apiKey,
    'POST',
    contactPayload({ email, firstName, interest, source }),
  );

  if (createResult.error && !createResult.error.message.toLowerCase().includes('already exist')) {
    console.warn(
      `[subscribe] Retrying without properties - ${createResult.error.name}: ${createResult.error.message}`,
    );
    createResult = await resendRequest(apiKey, 'POST', {
      email,
      firstName: firstName || undefined,
      unsubscribed: false,
    });
  }

  if (!createResult.error) {
    console.log(
      `[subscribe] Contact created: ${createResult.data?.id ?? 'unknown'} (email: ${email}, source: ${source})`,
    );
    return NextResponse.json({ message: successMessage });
  }

  const isDuplicate = createResult.error.message.toLowerCase().includes('already exist');
  if (!isDuplicate) {
    console.error(
      `[subscribe] Resend create error for ${email} - ${createResult.error.name}: ${createResult.error.message}`,
    );
    return NextResponse.json(
      {
        message:
          'The farm updates list could not be joined right now. Please try again soon.',
      },
      { status: 502 },
    );
  }

  let updateResult = await resendRequest(apiKey, 'PATCH', {
    email,
    ...contactUpdatePayload({ interest, source }),
  });

  if (updateResult.error) {
    if (
      updateResult.error.message.toLowerCase().includes('property') ||
      updateResult.error.name === 'validation_error'
    ) {
      updateResult = await resendRequest(apiKey, 'PATCH', { email });
    }

    if (updateResult.error) {
      console.error(
        `[subscribe] Resend update error for ${email} - ${updateResult.error.name}: ${updateResult.error.message}`,
      );
      return NextResponse.json(
        {
          message:
            'The farm updates list could not be joined right now. Please try again soon.',
        },
        { status: 502 },
      );
    }
  }

  console.log(
    `[subscribe] Contact updated: ${updateResult.data?.id ?? 'unknown'} (email: ${email}, source: ${source})`,
  );
  return NextResponse.json({ message: successMessage });
}
