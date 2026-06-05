import { useEffect } from "react";
import { useLocation } from "wouter";
import { consumePendingAnchor } from "../../lib/scroll-anchor";

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const anchor = consumePendingAnchor();
    if (anchor) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
        });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location]);

  return null;
}
