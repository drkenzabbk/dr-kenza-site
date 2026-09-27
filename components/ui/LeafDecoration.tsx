import { IconLeaf } from "@tabler/icons-react";

type Props = {
  className?: string;
  opacity?: number;
};

/** Decorative botanical leaf line-art used across pages */
export function LeafDecoration({ className = "", opacity = 0.18 }: Props) {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none text-gold ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      <path
        d="M100 268C100 268 42 210 42 140C42 78 100 28 100 28C100 28 158 78 158 140C158 210 100 268 100 268Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M100 28V250"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M100 70C78 86 62 110 55 136"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M100 100C122 116 140 138 146 164"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M100 140C80 152 68 172 62 192"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M100 170C118 182 132 200 138 218"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

export function LeafMark({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return <IconLeaf className={`text-gold ${className}`} stroke={1.5} />;
}
