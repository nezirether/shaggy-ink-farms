import Link from 'next/link';
import type { GrowingGuide } from '@/data/growingGuides';

interface GuideCardProps {
  guide: GrowingGuide;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Planting Methods': '#2C4A2E',
  'Soil & Fertility': '#7A4A2A',
  'Pest & Disease': '#8B2A2A',
  'Planning & Layout': '#3A5A8A',
  'Crop-Specific': '#C6933F',
  'Season Extension': '#4A6741',
  'Food Preservation': '#6A4A8A',
};

export function GuideCard({ guide }: GuideCardProps) {
  const isPublished = guide.status === 'published';
  const color = CATEGORY_COLORS[guide.category] ?? '#2C4A2E';

  const cardContent = (
    <div
      className={`group flex h-full flex-col rounded-sm border-2 border-[#1C1C1A] bg-[#D7D4CC] p-5 shadow-[4px_4px_0_rgba(44,74,46,0.12)] transition ${
        isPublished
          ? 'hover:shadow-[6px_6px_0_rgba(44,74,46,0.2)] hover:-translate-y-0.5'
          : 'opacity-75'
      }`}
    >
      {/* Category badge */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className="rounded-sm px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white"
          style={{ backgroundColor: color }}
        >
          {guide.category}
        </span>
        {!isPublished && (
          <span className="rounded-sm border border-[#1C1C1A]/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#1C1C1A]/50">
            Coming Soon
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-serif text-[1.05rem] font-bold leading-snug text-[#1C1C1A] group-hover:text-[#2C4A2E]">
        {guide.title}
      </h3>

      {/* Description */}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1C1C1A]/65">
        {guide.description}
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-[#1C1C1A]/45">
          {isPublished ? `${guide.readingTimeMinutes} min read` : 'In progress'}
        </span>
        {isPublished && (
          <span className="text-xs font-bold text-[#2C4A2E] group-hover:underline">
            Read guide →
          </span>
        )}
      </div>
    </div>
  );

  if (!isPublished) {
    return <div className="h-full">{cardContent}</div>;
  }

  return (
    <Link href={`/learn/growing-guides/${guide.slug}`} className="block h-full">
      {cardContent}
    </Link>
  );
}
