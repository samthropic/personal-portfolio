"use client";

import type { ReactNode } from "react";
import styles from "./drivenReel.module.css";

/** Stable horizontal project reel — scrub sideways, snap to each scene. */
export function DrivenProjectReel({ children }: { children: ReactNode }) {
  return (
    <div className={styles.gate} aria-label="Project reel">
      <div className={styles.strip}>{children}</div>
      <p className={styles.hint}>Swipe or scroll sideways to browse scenes</p>
    </div>
  );
}
