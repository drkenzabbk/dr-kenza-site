import { IconStarFilled } from "@tabler/icons-react";

/** Floating trust badge for hero portraits — mirrors the real rating shown in Testimonials. */
export function StatBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute left-4 top-4 z-10 flex items-center gap-2 rounded-2xl border border-border bg-white/95 px-3.5 py-2.5 shadow-lg backdrop-blur ${className}`}
    >
      <span className="flex items-center gap-0.5 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStarFilled key={i} className="h-3 w-3" />
        ))}
      </span>
      <span className="font-serif text-sm text-green">5,0</span>
    </div>
  );
}
