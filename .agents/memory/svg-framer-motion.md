---
name: SVG animation in Framer Motion
description: How to animate pulsing rings in SVG without "r: undefined" errors
---

Animating SVG presentation attributes like `r` via `animate={{ r: [5, 13, 5] }}` on `motion.circle` throws browser warnings ("Expected length, undefined") because Framer Motion does not reliably initialise SVG attributes before animation starts.

**How to apply:** Use `motion.g` wrapping a plain `<circle>`, and animate `scale` + `opacity` on the group, with `style={{ originX: "${cx}px", originY: "${cy}px" }}` to pin the transform origin to the circle centre.

```tsx
<motion.g
  style={{ originX: `${cx}px`, originY: `${cy}px` }}
  animate={{ scale: [0.5, 2.2, 0.5], opacity: [0.55, 0, 0.55] }}
  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
>
  <circle cx={cx} cy={cy} r={6} fill="none" stroke="#111" strokeWidth="1.1" />
</motion.g>
```

**Why:** Framer Motion sets the animated value to `undefined` during the first render for SVG attributes it doesn't know the initial value of. Wrapping in a group and using CSS transform (scale) avoids the attribute path entirely.
