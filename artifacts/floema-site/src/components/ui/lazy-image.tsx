import { useState } from "react";
import { motion, type VariantLabels, type TargetAndTransition } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  aspectRatio?: string;
  wrapperStyle?: React.CSSProperties;
  shimmerColor?: string;
  objectFit?: React.CSSProperties["objectFit"];
  objectPosition?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  imgStyle?: React.CSSProperties;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement>;
  whileHover?: VariantLabels | TargetAndTransition;
  motionTransition?: object;
}

export function LazyImage({
  src,
  alt,
  fill = false,
  aspectRatio,
  wrapperStyle,
  shimmerColor = "#141414",
  objectFit = "cover",
  objectPosition = "center",
  loading = "lazy",
  decoding = "async",
  imgStyle,
  className,
  onMouseEnter,
  onMouseLeave,
  whileHover,
  motionTransition,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  if (fill) {
    return (
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={className}
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{
          opacity: { duration: 0.5, ease: "easeOut" },
          ...(motionTransition ?? {}),
        }}
        whileHover={whileHover}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit,
          objectPosition,
          display: "block",
          ...imgStyle,
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: "relative",
        aspectRatio,
        overflow: "hidden",
        background: shimmerColor,
        ...wrapperStyle,
      }}
    >
      {!loaded && (
        <div
          className="img-shimmer"
          style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={className}
        onLoad={() => setLoaded(true)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          width: "100%",
          height: "100%",
          objectFit,
          objectPosition,
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          ...imgStyle,
        }}
      />
    </div>
  );
}
