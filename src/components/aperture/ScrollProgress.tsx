"use client";

import { useEffect, useState } from "react";
import styles from "./scroll.module.css";

/** Film-strip progress + timecode driven by page scroll. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const frames = Math.floor(progress * 2400)
    .toString()
    .padStart(4, "0");
  const seconds = (progress * 96).toFixed(1).padStart(5, "0");

  return (
    <div className={styles.progress} aria-hidden>
      <div className={styles.bar} style={{ transform: `scaleX(${progress})` }} />
      <span className={styles.tc}>
        {seconds}s · {frames}f
      </span>
    </div>
  );
}
