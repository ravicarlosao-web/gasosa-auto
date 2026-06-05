export const EASE_OUT: [number, number, number, number] = [0.0, 0, 0.18, 1];

export const textVariants = {
  enter: (d: number) => ({ opacity: 0, y: d > 0 ? 30 : -30 }),
  center: {
    opacity: 1,
    y: 0,
    transition: {
      y:      { type: "spring" as const, stiffness: 120, damping: 24, restDelta: 0.001 },
      opacity:{ duration: 0.6, ease: EASE_OUT },
    },
  },
  exit: (d: number) => ({ opacity: 0, y: d > 0 ? 30 : -30, transition: { duration: 0.28, ease: [0.4, 0, 0.6, 1] as [number, number, number, number] } }),
};

export const FADE_UP = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      y:      { type: "spring" as const, stiffness: 90, damping: 22, restDelta: 0.001, delay },
      opacity:{ duration: 0.85, ease: EASE_OUT, delay },
      filter: { duration: 0.75, ease: EASE_OUT, delay: delay + 0.04 },
    },
  }),
};

export const REVEAL_ROW = {
  hidden: { opacity: 0, y: 44, filter: "blur(6px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      y:      { type: "spring" as const, stiffness: 75, damping: 20, restDelta: 0.001, delay },
      opacity:{ duration: 0.95, ease: EASE_OUT, delay },
      filter: { duration: 0.85, ease: EASE_OUT, delay: delay + 0.06 },
    },
  }),
};
