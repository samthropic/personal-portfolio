"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./scroll.module.css";

/** Maps element scroll position to 0–1 with smoothstep easing. */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.92;
      const end = vh * 0.28;
      const raw = (start - rect.top) / (start - end);
      const clamped = Math.min(1, Math.max(0, raw));
      const p = clamped * clamped * (3 - 2 * clamped);
      setProgress(reduce ? (rect.top < vh && rect.bottom > 0 ? 1 : 0) : p);
      setInView(rect.top < vh * 0.95 && rect.bottom > vh * 0.05);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { ref, progress, inView };
}

export function ScrollStage({
  children,
  className,
  direction = 1,
}: {
  children: ReactNode;
  className?: string;
  /** 1 = enter from right, -1 = enter from left */
  direction?: 1 | -1;
}) {
  const { ref, progress, inView } = useScrollProgress<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.stage} ${inView ? styles.stageLive : ""} ${className ?? ""}`}
      style={
        {
          "--p": progress,
          "--dir": direction,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
