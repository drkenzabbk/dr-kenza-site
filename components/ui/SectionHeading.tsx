import { LeafMark } from "./LeafDecoration";

type Props = {
  label?: string;
  title: string;
  accent?: string;
  align?: "left" | "center";
  className?: string;
  showLeaf?: boolean;
  description?: string;
};

export function SectionHeading({
  label,
  title,
  accent,
  align = "left",
  className = "",
  showLeaf = true,
  description,
}: Props) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {label ? (
        <span className="section-label">
          {showLeaf ? <LeafMark /> : null}
          {label}
        </span>
      ) : null}
      <h2 className="font-serif text-3xl leading-tight text-green md:text-4xl lg:text-[2.75rem]">
        {title}
        {accent ? (
          <>
            {" "}
            <span className="accent-italic">{accent}</span>
          </>
        ) : null}
      </h2>
      {description ? <p className="prose-body max-w-xl">{description}</p> : null}
    </div>
  );
}
