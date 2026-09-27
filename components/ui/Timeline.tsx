import type { ReactNode } from "react";

type Step = {
  title: string;
  description: string;
  icon: ReactNode;
};

type Props = {
  steps: Step[];
  className?: string;
};

export function Timeline({ steps, className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-0 right-0 top-4 hidden h-px bg-border md:block" />
      <div
        className="absolute right-0 top-[0.85rem] hidden h-0 w-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-border md:block"
        aria-hidden
      />
      <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex flex-col items-center text-center">
            <span className="relative z-10 mb-5 flex h-8 w-8 items-center justify-center rounded-full bg-green text-xs font-semibold text-cream">
              {index + 1}
            </span>
            <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-beige-soft text-gold">
              {step.icon}
            </span>
            <h3 className="font-serif text-xl text-green">{step.title}</h3>
            <p className="prose-body mt-2 max-w-xs text-sm">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
