'use client';

import { useState } from 'react';
import {
  SUPPORTED_CITIES,
  getCurrentWeek,
  getWeekDateRange,
  getWeeklyRecommendation,
  getCityInfo,
} from '@/lib/growingRecommendations';
import type { WeeklyTask } from '@/lib/growingRecommendations';

const CATEGORY_STYLES: Record<
  WeeklyTask['category'],
  { bg: string; text: string; label: string }
> = {
  Plant:    { bg: '#2C4A2E', text: 'white', label: 'Plant' },
  Maintain: { bg: '#4A6741', text: 'white', label: 'Maintain' },
  Harvest:  { bg: '#C6933F', text: 'white', label: 'Harvest' },
  Prepare:  { bg: '#3A5A8A', text: 'white', label: 'Prepare' },
  Watch:    { bg: '#8B2A2A', text: 'white', label: 'Watch' },
};

export function WeeklyGrowingGuide() {
  const currentWeek = getCurrentWeek();
  const [selectedCity, setSelectedCity] = useState('anderson-ca');
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const city = getCityInfo(selectedCity);
  const recommendation = getWeeklyRecommendation(selectedCity, selectedWeek);
  const dateRange = getWeekDateRange(selectedWeek);

  const weeks = Array.from({ length: 52 }, (_, i) => i + 1);

  return (
    <div className="space-y-6" id="weekly-guide">
      {/* Controls */}
      <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5">
        <h3 className="mb-4 font-serif text-lg font-bold text-[#1C1C1A]">
          What should I do this week?
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* City selector */}
          <div>
            <label className="mb-1.5 block text-xs font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/60">
              Your Location
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full rounded-sm border-2 border-[#1C1C1A] bg-[#B8B6AE] px-3 py-2 text-sm font-bold text-[#1C1C1A] focus:border-[#2C4A2E] focus:outline-none"
            >
              {SUPPORTED_CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.displayName}, {c.state} (Zone {c.zone})
                </option>
              ))}
            </select>
          </div>

          {/* Week selector */}
          <div>
            <label className="mb-1.5 block text-xs font-extrabold uppercase tracking-[0.14em] text-[#1C1C1A]/60">
              Week
            </label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
              className="w-full rounded-sm border-2 border-[#1C1C1A] bg-[#B8B6AE] px-3 py-2 text-sm font-bold text-[#1C1C1A] focus:border-[#2C4A2E] focus:outline-none"
            >
              {weeks.map((w) => (
                <option key={w} value={w}>
                  Week {w}{w === currentWeek ? ' (this week)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* City summary */}
        {city && (
          <div className="mt-4 flex flex-wrap gap-4 border-t border-[#1C1C1A]/15 pt-4 text-xs text-[#1C1C1A]/60">
            <span><strong className="text-[#1C1C1A]">Zone:</strong> {city.zone}</span>
            <span><strong className="text-[#1C1C1A]">Last frost:</strong> {city.lastFrostDate}</span>
            <span><strong className="text-[#1C1C1A]">First frost:</strong> {city.firstFrostDate}</span>
            <span><strong className="text-[#1C1C1A]">Summer high:</strong> {city.summerHighF}°F avg</span>
          </div>
        )}
      </div>

      {/* Recommendation */}
      {recommendation ? (
        <div className="rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] overflow-hidden">
          {/* Week header */}
          <div className="border-b-2 border-[#1C1C1A] bg-[#2C4A2E] px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C6933F]">
                  Week {selectedWeek} · {dateRange}
                </p>
                <h4 className="mt-1 font-serif text-xl font-bold text-white">
                  {recommendation.headline}
                </h4>
              </div>
              {selectedWeek === currentWeek && (
                <span className="shrink-0 rounded-sm bg-[#C6933F] px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white">
                  This Week
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {recommendation.summary}
            </p>
          </div>

          {/* Tasks */}
          <div className="p-5">
            <div className="space-y-3">
              {recommendation.tasks.map((task, i) => {
                const style = CATEGORY_STYLES[task.category];
                return (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 shrink-0 rounded-sm px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.1em]"
                      style={{ backgroundColor: style.bg, color: style.text }}
                    >
                      {style.label}
                    </span>
                    <p className="text-sm leading-relaxed text-[#1C1C1A]/80">
                      {task.task}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Insider note */}
            {recommendation.insiderNote && (
              <div className="mt-5 rounded-sm border-l-4 border-[#C6933F] bg-[#C6933F]/10 px-4 py-3">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#C6933F]">
                  From the farm
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#1C1C1A]/75">
                  {recommendation.insiderNote}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-sm border-2 border-dashed border-[#1C1C1A]/25 p-8 text-center">
          <p className="text-sm text-[#1C1C1A]/50">
            No recommendation available for this week.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSelectedWeek((w) => Math.max(1, w - 1))}
          disabled={selectedWeek <= 1}
          className="rounded-sm border-2 border-[#1C1C1A] bg-[#B8B6AE] px-4 py-2 text-xs font-bold text-[#1C1C1A] transition hover:bg-[#1C1C1A] hover:text-[#D7D4CC] disabled:opacity-30"
        >
          ← Previous week
        </button>
        <button
          onClick={() => setSelectedWeek(currentWeek)}
          className="rounded-sm border-2 border-[#2C4A2E] bg-[#2C4A2E] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1a2e1b]"
        >
          Jump to this week
        </button>
        <button
          onClick={() => setSelectedWeek((w) => Math.min(52, w + 1))}
          disabled={selectedWeek >= 52}
          className="rounded-sm border-2 border-[#1C1C1A] bg-[#B8B6AE] px-4 py-2 text-xs font-bold text-[#1C1C1A] transition hover:bg-[#1C1C1A] hover:text-[#D7D4CC] disabled:opacity-30"
        >
          Next week →
        </button>
      </div>
    </div>
  );
}
