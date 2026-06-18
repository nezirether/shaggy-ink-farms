import { EmailCapture } from "@/components/EmailCapture";

export function PlannerSaveCapture() {
  return (
    <EmailCapture
      segment="garden-planner"
      source="garden-planner"
      eyebrow="Save My Plan"
      title="Save my plan, email it later, and get seasonal planting reminders."
      description="This is a capture-only Phase 2 step. It does not change planner calculations, but it does let us tag planner users and support future email-my-plan follow-up."
      buttonLabel="Save My Plan"
      helperText="We will use this for planner follow-up, seasonal reminders, and future email-my-plan delivery."
      captureType="planner-save"
      compact
    />
  );
}
