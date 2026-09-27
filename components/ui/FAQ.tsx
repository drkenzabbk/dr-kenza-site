"use client";

import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

type Item = { question: string; answer: string };

type Props = {
  items: Item[];
  className?: string;
};

export function FAQ({ items, className = "" }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={`divide-y divide-border ${className}`}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question} className="py-4">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-green md:text-xl">
                {item.question}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-green">
                {isOpen ? (
                  <IconMinus className="h-4 w-4" stroke={1.5} />
                ) : (
                  <IconPlus className="h-4 w-4" stroke={1.5} />
                )}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="prose-body pt-3 pr-10 text-sm md:text-[0.95rem]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
