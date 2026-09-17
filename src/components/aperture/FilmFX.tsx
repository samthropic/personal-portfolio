"use client";

import { useEffect, useRef } from "react";
import styles from "./film.module.css";

/** Subtle film grain only. */
export function FilmFX() {
  const grainRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let frame = 0;

    const w = 160;
    const h = 90;
    canvas.width = w;
    canvas.height = h;

    const noise = () => {
      frame++;
      if (frame % 8 === 0) {
        const image = ctx.createImageData(w, h);
        const data = image.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = 110 + ((Math.random() * 35) | 0);
          data[i] = data[i + 1] = data[i + 2] = v;
          data[i + 3] = 255;
        }
        ctx.putImageData(image, 0, 0);
      }
      raf = requestAnimationFrame(noise);
    };

    noise();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={grainRef} className={styles.grain} aria-hidden />;
}
