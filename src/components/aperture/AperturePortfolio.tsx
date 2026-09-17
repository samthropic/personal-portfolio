"use client";

import Image from "next/image";
import {
  education,
  experience,
  leadership,
  projects,
  site,
  skills,
  type Experience,
} from "@/data/site";
import { FilmFX } from "./FilmFX";
import { FilmBurnIntro } from "./FilmBurnIntro";
import { ScrollProgress } from "./ScrollProgress";
import { ScrollStage } from "./ScrollStage";
import { DrivenProjectReel } from "./DrivenProjectReel";
import styles from "./portfolio.module.css";

function ExperienceTake({
  job,
  index,
}: {
  job: Experience;
  index: number;
}) {
  const hasStills = Boolean(job.stills?.length);
  const direction = index % 2 === 0 ? 1 : -1;

  return (
    <ScrollStage className={styles.take} direction={direction}>
      <div className={`${styles.takeFrame} ${hasStills ? styles.takeWithStills : ""}`}>
        {hasStills ? (
          <div className={styles.stillStrip} aria-label={`${job.company} stills`}>
            {job.stills!.map((still) => (
              <figure key={still.src} className={styles.still}>
                <div className={styles.stillInner}>
                  <Image
                    src={still.src}
                    alt={still.alt}
                    fill
                    sizes="(max-width: 700px) 70vw, 280px"
                    className={styles.stillImg}
                    style={
                      still.position
                        ? { objectPosition: still.position }
                        : undefined
                    }
                  />
                </div>
                <figcaption className={styles.stillCap}>Still</figcaption>
              </figure>
            ))}
          </div>
        ) : null}

        <div className={styles.takeBody}>
          <div className={styles.takeMatte}>
            <span className={styles.takeNum}>
              Take {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.takeTitle}>{job.company}</h3>
            <p className={styles.takeRole}>{job.role}</p>
            <p className={styles.takeDates}>
              {job.dates}
              <span aria-hidden> · </span>
              {job.location}
            </p>
            <ul className={styles.beats}>
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <div className={styles.sprocket} aria-hidden>
            {Array.from({ length: 10 }).map((_, n) => (
              <span key={n} />
            ))}
          </div>
        </div>
      </div>
    </ScrollStage>
  );
}

export function AperturePortfolio() {
  return (
    <div className={styles.root}>
      <FilmBurnIntro />
      <FilmFX />
      <ScrollProgress />
      <div className={styles.letterboxTop} aria-hidden />
      <div className={styles.letterboxBottom} aria-hidden />

      <nav className={styles.nav}>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#credits">Credits</a>
        <a href="#contact">Contact</a>
      </nav>

      <main>
        <header className={styles.titleCard}>
          <div className={styles.heroPortrait}>
            <Image
              src="/stills/hero.png"
              alt="Sam Fiallos"
              width={120}
              height={120}
              priority
              className={styles.portraitImg}
            />
          </div>
          <p className={styles.rec}>
            <span className={styles.recDot} /> Rec
          </p>
          <h1 className={styles.name}>{site.name}</h1>
          <p className={styles.meta}>
            {site.location}
            <span aria-hidden> / </span>
            NYU Tandon · CS · 2027
          </p>
          <div className={styles.heroActions}>
            <a href="#experience">Watch the reel</a>
            <a className={styles.ghost} href={`mailto:${site.email}`}>
              Email
            </a>
          </div>
        </header>

        <section id="experience" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Experience</h2>
            <p>Production log</p>
          </div>

          <div className={styles.takes}>
            {experience.map((job, i) => (
              <ExperienceTake
                key={`${job.company}-${job.dates}`}
                job={job}
                index={i}
              />
            ))}
          </div>
        </section>

        <section id="projects" className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Projects</h2>
            <p>Browse the reel</p>
          </div>

          <DrivenProjectReel>
            {projects.map((p, i) => (
              <ScrollStage key={p.title} className={styles.clip}>
                <div
                  className={`${styles.clipFrame} ${p.stills?.length ? styles.clipWithStill : ""}`}
                >
                  {p.stills?.[0] ? (
                    <div className={styles.clipStill}>
                      <Image
                        src={p.stills[0].src}
                        alt={p.stills[0].alt}
                        fill
                        sizes="(max-width: 700px) 85vw, 420px"
                        className={styles.clipStillImg}
                      />
                    </div>
                  ) : null}
                  <div className={styles.clipBody}>
                    <div className={styles.clipMatte}>
                      <span className={styles.takeNum}>
                        Scene {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3>{p.title}</h3>
                      <p className={styles.logline}>{p.logline}</p>
                      <p className={styles.detail}>{p.detail}</p>
                      <p className={styles.stack}>{p.stack.join("  /  ")}</p>
                      {p.href ? (
                        <a
                          className={styles.projectLink}
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open live site
                        </a>
                      ) : null}
                    </div>
                    <div className={styles.sprocket} aria-hidden>
                      {Array.from({ length: 8 }).map((_, n) => (
                        <span key={n} />
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollStage>
            ))}
          </DrivenProjectReel>
        </section>

        <section id="credits" className={styles.section}>
          <ScrollStage className={styles.creditsStage}>
            <div className={styles.sectionHead}>
              <h2>Credits</h2>
              <p>Education, stack, and leadership.</p>
            </div>

            <div className={styles.credits}>
              <div className={styles.creditBlock}>
                <h3>Education</h3>
                <p className={styles.creditLead}>{education.school}</p>
                <p>
                  {education.degree}
                  <span aria-hidden> · </span>
                  {education.grad}
                </p>
                <p className={styles.muted}>{education.location}</p>
                <p className={styles.muted}>
                  Coursework: {education.coursework.join(", ")}
                </p>
              </div>

              <div className={styles.creditBlock}>
                <h3>Stack</h3>
                <p>
                  <span className={styles.creditLabel}>Languages</span>
                  {skills.languages.join(", ")}
                </p>
                <p>
                  <span className={styles.creditLabel}>Frameworks</span>
                  {skills.frameworks.join(", ")}
                </p>
                <p>
                  <span className={styles.creditLabel}>Systems</span>
                  {skills.systems.join(", ")}
                </p>
              </div>

              <div className={`${styles.creditBlock} ${styles.leadershipBlock}`}>
                <h3>Leadership</h3>
                <ul className={styles.leadList}>
                  {leadership.map((role) => (
                    <li key={`${role.org}-${role.title}`} className={styles.leadItem}>
                      <p className={styles.leadTitle}>{role.title}</p>
                      <p className={styles.leadOrg}>{role.org}</p>
                      {role.stills?.length ? (
                        <div
                          className={styles.stillStrip}
                          aria-label={`${role.org} stills`}
                        >
                          {role.stills.map((still) => (
                            <figure key={still.src} className={styles.still}>
                              <div className={styles.stillInner}>
                                <Image
                                  src={still.src}
                                  alt={still.alt}
                                  fill
                                  sizes="(max-width: 700px) 70vw, 280px"
                                  className={styles.stillImg}
                                  style={
                                    still.position
                                      ? { objectPosition: still.position }
                                      : undefined
                                  }
                                />
                              </div>
                              <figcaption className={styles.stillCap}>
                                Still
                              </figcaption>
                            </figure>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollStage>
        </section>

        <section id="contact" className={styles.contact}>
          <ScrollStage className={styles.contactStage}>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p className={styles.contactLinks}>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href={`tel:${site.phone.replace(/\D/g, "")}`}>{site.phone}</a>
            </p>
          </ScrollStage>
        </section>

        <footer className={styles.footer}>
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>New York</span>
        </footer>
      </main>
    </div>
  );
}
