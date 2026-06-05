import { createContext } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import type { Lang } from "../translations";

export const NavThemeCtx = createContext(false);

export const MotionLink = motion.create(Link) as React.ComponentType<
  React.ComponentPropsWithRef<typeof Link> &
    Parameters<typeof motion.create>[1] &
    Record<string, unknown>
>;

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "PT", label: "PT" },
  { code: "EN", label: "EN" },
  { code: "ES", label: "ES" },
];
