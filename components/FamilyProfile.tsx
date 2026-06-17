'use client';

import { useGardenPlanner } from '@/app/garden-planner/GardenPlannerContext';
import { ROLE_LABELS, CONSUMPTION_MULTIPLIERS } from '@/types/garden-planner';
import type { FamilyRole } from '@/types/garden-planner';
import { ZONES } from '@/data/zones';

const ROLES: FamilyRole[] = ['child', 'teen', 'adult', 'senior'];

const ROLE_DESCRIPTIONS: Record<FamilyRole, string> = {
  child: '40% of adult consumption',
  teen: '80% of adult consumption',
  adult: 'Baseline (1.0×)',
  senior: '70% of adult consumption',
};

export function FamilyProfile() {
  const {
    state, adultEquivalents, familySize,
    addMember, setMemberCount,
    setSafetyMargin, setZone,
  } = useGardenPlanner();

  return (
    <div className="space-y-10">

      {/* Zone Selection */}
      <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
        <h2 className="font-serif text-xl font-bold text-[#1C1C1A]">Your USDA Zone</h2>
        <p className="mt-1 text-sm text-[#1C1C1A]/65">
          Your zone determines planting dates throughout the planner.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {ZONES.map((z) => (
            <button
              key={z.zone}
              onClick={() => setZone(z.zone)}
              className={`rounded border-2 px-4 py-2 text-sm font-bold transition ${
                state.zone === z.zone
                  ? 'border-[#2C4A2E] bg-[#2C4A2E] text-white'
                  : 'border-[#1C1C1A] bg-[#B8B6AE] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-[#D7D4CC]'
              }`}
            >
              Zone {z.zone}
            </button>
          ))}
        </div>
        {(() => {
          const z = ZONES.find((z) => z.zone === state.zone);
          if (!z) return null;
          return (
            <p className="mt-3 text-sm text-[#1C1C1A]/70">
              <span className="font-bold text-[#1C1C1A]">Zone {z.zone}:</span>{' '}
              {z.description}
            </p>
          );
        })()}
      </section>

      {/* Family Members */}
      <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1C1C1A]">Family Members</h2>
            <p className="mt-1 text-sm text-[#1C1C1A]/65">
              Set how many people in each age group. The planner adjusts food
              targets using USDA consumption weights.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#8B2A2A]">
              Total
            </p>
            <p className="font-serif text-3xl font-bold text-[#1C1C1A]">{familySize}</p>
            <p className="text-xs text-[#1C1C1A]/55">
              {adultEquivalents.toFixed(1)} adult equiv.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {ROLES.map((role) => {
            const member = state.familyMembers.find((m) => m.role === role);
            const count = member?.count ?? 0;
            return (
              <div
                key={role}
                className="flex items-center gap-4 rounded-sm border border-[#1C1C1A]/15 bg-[#B8B6AE] px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#1C1C1A]">{ROLE_LABELS[role]}</p>
                  <p className="text-xs text-[#1C1C1A]/55">{ROLE_DESCRIPTIONS[role]}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (count > 0 && member) setMemberCount(member.id, count - 1);
                    }}
                    disabled={count === 0}
                    className="flex h-8 w-8 items-center justify-center rounded border-2 border-[#1C1C1A] bg-[#D7D4CC] text-lg font-bold text-[#1C1C1A] transition hover:bg-[#8B2A2A] hover:text-white disabled:opacity-30"
                    aria-label={`Remove ${role}`}
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-serif text-xl font-bold text-[#1C1C1A]">
                    {count}
                  </span>
                  <button
                    onClick={() => {
                      if (member) {
                        setMemberCount(member.id, count + 1);
                      } else {
                        addMember(role);
                      }
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded border-2 border-[#2C4A2E] bg-[#2C4A2E] text-lg font-bold text-white transition hover:bg-[#1a2e1b]"
                    aria-label={`Add ${role}`}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Consumption multiplier legend */}
        <div className="mt-4 rounded-sm border border-[#1C1C1A]/12 bg-[#D7D4CC]/60 p-3">
          <p className="text-xs text-[#1C1C1A]/60">
            <strong className="text-[#1C1C1A]">How consumption is calculated:</strong>{' '}
            {ROLES.map((r, i) => (
              <span key={r}>
                {ROLE_LABELS[r]} = {CONSUMPTION_MULTIPLIERS[r]}×
                {i < ROLES.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Safety Margin */}
      <section className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-6 shadow-[6px_6px_0_rgba(44,74,46,0.14)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1C1C1A]">Safety Margin</h2>
            <p className="mt-1 text-sm text-[#1C1C1A]/65">
              Grow extra to account for pests, drought, failed plantings, and preserving
              the surplus. Food security plans should always run a buffer.
            </p>
          </div>
          <div className="text-right">
            <p className="font-serif text-3xl font-bold text-[#8B2A2A]">
              +{Math.round(state.safetyMargin * 100)}%
            </p>
          </div>
        </div>

        <div className="mt-4">
          <input
            type="range"
            min={0.1}
            max={0.5}
            step={0.05}
            value={state.safetyMargin}
            onChange={(e) => setSafetyMargin(parseFloat(e.target.value))}
            className="w-full accent-[#2C4A2E]"
          />
          <div className="mt-1 flex justify-between text-xs text-[#1C1C1A]/55">
            <span>10% (bare minimum)</span>
            <span>30% (recommended)</span>
            <span>50% (preservation focus)</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          {[10, 20, 30, 40, 50].map((pct) => (
            <button
              key={pct}
              onClick={() => setSafetyMargin(pct / 100)}
              className={`flex-1 rounded border-2 py-1.5 text-xs font-bold transition ${
                Math.round(state.safetyMargin * 100) === pct
                  ? 'border-[#2C4A2E] bg-[#2C4A2E] text-white'
                  : 'border-[#1C1C1A] bg-[#B8B6AE] text-[#1C1C1A] hover:bg-[#1C1C1A] hover:text-white'
              }`}
            >
              +{pct}%
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-sm bg-[#2C4A2E]/10 p-3 text-sm leading-6 text-[#1C1C1A]/70">
          <strong className="text-[#1C1C1A]">Example:</strong> A family needing 30 lbs of tomatoes
          with a 20% safety margin targets 36 lbs of production.
          At 12 lbs per plant, that means 3 plants — not 2.5 rounded down.
          Always round up.
        </div>
      </section>

      {/* Summary row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Family Size', value: familySize, sub: 'people' },
          { label: 'Adult Equivalents', value: adultEquivalents.toFixed(1), sub: 'consumption units' },
          { label: 'Safety Buffer', value: `+${Math.round(state.safetyMargin * 100)}%`, sub: 'above annual need' },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 text-center shadow-[4px_4px_0_rgba(44,74,46,0.12)]"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#8B2A2A]">
              {card.label}
            </p>
            <p className="mt-2 font-serif text-3xl font-bold text-[#1C1C1A]">{card.value}</p>
            <p className="mt-1 text-xs text-[#1C1C1A]/55">{card.sub}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
