"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./filmBurn.module.css";

/** Full-screen film-burn intro; last second blends into the site. */
export function FilmBurnIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video || !overlay) return;

    let raf = 0;
    let started = false;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      window.setTimeout(() => setVisible(false), 50);
    };

    const tick = () => {
      const duration = video.duration;
      if (Number.isFinite(duration) && duration > 0) {
        const fadeWindow = Math.min(1, duration); // last second of the clip
        const fadeStart = Math.max(0, duration - fadeWindow);
        if (video.currentTime >= fadeStart) {
          const t = (video.currentTime - fadeStart) / fadeWindow;
          const opacity = 1 - t * t;
          overlay.style.opacity = String(Math.max(0, opacity));
        } else {
          overlay.style.opacity = "1";
        }
      }
      if (!video.ended && !finished) {
        raf = requestAnimationFrame(tick);
      }
    };

    const startPlayback = async () => {
      if (started) return;
      started = true;
      video.currentTime = 0;
      video.playbackRate = 0.55;
      try {
        video.muted = true;
        await video.play();
        raf = requestAnimationFrame(tick);
      } catch {
        finish();
      }
    };

    const onEnded = () => {
      overlay.style.opacity = "0";
      finish();
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", finish);

    if (video.readyState >= 2) {
      void startPlayback();
    } else {
      video.addEventListener("canplay", startPlayback, { once: true });
      video.load();
    }

    const safety = window.setTimeout(finish, 4000);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", finish);
      video.removeEventListener("canplay", startPlayback);
      window.clearTimeout(safety);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div ref={overlayRef} className={styles.overlay} role="presentation">
      <video
        ref={videoRef}
        className={styles.video}
        src="/fx/film-burn-intro.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
      />
    </div>
  );
}
