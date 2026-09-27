import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  badge?: ReactNode;
  priority?: boolean;
};

export function RoundedImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  badge,
  priority = false,
}: Props) {
  return (
    <div className={`relative overflow-hidden bg-beige-soft ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`object-cover ${imageClassName}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : null}
      {badge}
    </div>
  );
}
