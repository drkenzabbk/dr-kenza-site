import Link from "next/link";
import { IconCalendarEvent } from "@tabler/icons-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "ghost-gold";

const variants: Record<Variant, string> = {
  primary:
    "bg-green text-white hover:bg-green-deep shadow-sm border border-transparent",
  accent:
    "bg-gold text-green hover:bg-gold-soft shadow-sm border border-transparent",
  outline:
    "bg-transparent text-green border border-green/25 hover:border-green/50 hover:bg-white",
  "ghost-gold":
    "bg-transparent text-green border border-gold hover:bg-gold/10",
};

type ButtonBaseProps = {
  variant?: Variant;
  showCalendar?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, keyof ButtonBaseProps | "href">;

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    showCalendar = false,
    className = "",
    children,
    ...rest
  } = props;

  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-colors duration-200",
    variants[variant],
    className,
  ].join(" ");

  const content = (
    <>
      {showCalendar ? <IconCalendarEvent className="h-4 w-4" stroke={1.6} /> : null}
      {children}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {content}
    </button>
  );
}
