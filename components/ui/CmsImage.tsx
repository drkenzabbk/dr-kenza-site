import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Renders a Sanity CMS image, or a soft placeholder when missing. */
export function CmsImage({
  src,
  alt,
  className = "object-cover",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: Props) {
  if (!src) {
    return <div className="absolute inset-0 bg-beige-soft" aria-hidden />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={className}
      sizes={sizes}
    />
  );
}
