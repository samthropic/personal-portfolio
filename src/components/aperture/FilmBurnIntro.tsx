"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./filmBurn.module.css";

const PLAYBACK_RATE = 0.62;
const FADE_SECONDS = 0.75; // media-time seconds near the end
const MIN_MS = 1400; // don't dismiss sooner than this (except errors)
const MAX_MS = 6000; // hard failsafe

/** Full-screen film-burn intro; last stretch blends into the site. */
export function FilmBurnIntro() {
  // Cover first paint so the portfolio never flashes underneath.
  const [active, setActive] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(false);
      return;
    }

    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video || !overlay) {
      setActive(false);
      return;
    }

    let raf = 0;
    let started = false;
    let finished = false;
    const startedAt = performance.now();

    const finish = (force = false) => {
      if (finished) return;
      const elapsed = performance.now() - startedAt;
      if (!force && elapsed < MIN_MS) {
        window.setTimeout(() => finish(true), MIN_MS - elapsed);
        return;
      }
      finished = true;
      cancelAnimationFrame(raf);
      try {
        video.pause();
      } catch {
        /* ignore */
      }
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      window.setTimeout(() => setActive(false), 180);
    };

    const tick = () => {
      if (finished) return;
      const duration = video.duration;
      if (Number.isFinite(duration) && duration > 0) {
        const fadeWindow = Math.min(FADE_SECONDS, duration * 0.4);
        const fadeStart = Math.max(0, duration - fadeWindow);
        if (video.currentTime >= fadeStart) {
          const t = (video.currentTime - fadeStart) / fadeWindow;
          overlay.style.opacity = String(Math.max(0, 1 - t * t));
        } else {
          overlay.style.opacity = "1";
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const startPlayback = async () => {
      if (started || finished) return;
      started = true;
      try {
        video.muted = true;
        video.playsInline = true;
        video.playbackRate = PLAYBACK_RATE;
        if (video.currentTime > 0) video.currentTime = 0;
        await video.play();
        raf = requestAnimationFrame(tick);
      } catch {
        finish(true);
      }
    };

    const onEnded = () => finish(false);
    const onError = () => finish(true);

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    if (video.readyState >= 2) {
      void startPlayback();
    } else {
      video.addEventListener("canplay", startPlayback, { once: true });
      try {
        video.load();
      } catch {
        finish(true);
      }
    }

    const safety = window.setTimeout(() => finish(true), MAX_MS);

    return () => {
      finished = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      video.removeEventListener("canplay", startPlayback);
      try {
        video.pause();
      } catch {
        /* ignore */
      }
    };
  }, []);

  if (!active) return null;

  return (
    <div ref={overlayRef} className={styles.overlay} role="presentation">
      <video
        ref={videoRef}
        className={styles.video}
        src="/fx/film-burn-intro.mp4"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
