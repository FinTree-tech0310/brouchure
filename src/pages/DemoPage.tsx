import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CardStack, StackCard } from "../components/CardStack";
import { DEMO_SECTIONS, type DemoSection, type DemoShots, type DemoVideo } from "../data/demo";

/* ==========================================================================
   DEMO LECTURES PAGE — /demo
   3 cards: 1) lecture grid with section tabs  2) sample Juice Notes with
   page-swap animation  3) platform previews (doubt forum / LMS / mock test).
   All content is demo placeholder material (see src/data/demo.ts).
   ========================================================================== */

export default function DemoPage() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<DemoVideo | null>(null);
  const section = DEMO_SECTIONS[active];

  useEffect(() => setPlaying(null), [section.key]);

  return (
    <CardStack>
      {/* ------------------------------------------------ Card 1: lectures */}
      <StackCard label="Demo lectures">
        <p className="ft-label ft-reveal">Demo lectures</p>
        <h1 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 0.5rem" }}>
          Watch a class before you join one.
        </h1>
        <p className="ft-sub ft-reveal" data-delay="1" style={{ maxWidth: 640, fontSize: "1rem" }}>
          {(section.videos ?? section.lectures).length} sample lectures per programme. Full lectures open after enrolment.
        </p>

        <div
          className="ft-reveal"
          data-delay="2"
          role="tablist"
          aria-label="Programme"
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", margin: "1.5rem 0 1.25rem" }}
        >
          {DEMO_SECTIONS.map((s, i) => (
            <button
              key={s.key}
              role="tab"
              aria-selected={i === active}
              className={`ft-demo-tab${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              {s.tab}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ft-reveal" data-delay="2">
          {(section.videos ?? section.lectures).map((item, i) => {
            const video = section.videos ? (item as DemoVideo) : null;
            const topic = video ? video.title : (item as string);
            return (
              <div
                key={`${section.key}-${i}`}
                className={`ft-demo-tile${video ? " ft-demo-tile--video" : ""}`}
                role={video ? "button" : undefined}
                tabIndex={video ? 0 : undefined}
                style={video ? { cursor: "pointer" } : undefined}
                onClick={video ? () => setPlaying(video) : undefined}
                onKeyDown={
                  video
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setPlaying(video);
                        }
                      }
                    : undefined
                }
                aria-label={video ? `Play ${video.title}` : undefined}
              >
                {video && (
                  <span className="ft-demo-thumb" aria-hidden="true">
                    <img
                      src={`https://i.ytimg.com/vi/${video.yt}/hqdefault.jpg`}
                      alt=""
                      loading="lazy"
                    />
                    <span className="ft-play" />
                  </span>
                )}
                {!video && <span className="ft-play" aria-hidden="true" />}
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: "0.92rem", lineHeight: 1.3 }}>{topic}</p>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      letterSpacing: "var(--ft-tracking-label)",
                      textTransform: "uppercase",
                      color: "var(--ft-teach)",
                      marginTop: 4,
                    }}
                  >
                    Demo lecture {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {playing &&
          createPortal(
            <div
              className="ft-lightbox"
              onClick={() => setPlaying(null)}
              role="dialog"
              aria-modal="true"
              aria-label={playing.title}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{ width: "min(880px, 92vw)" }}
              >
                <div
                  style={{
                    aspectRatio: "16 / 9",
                    borderRadius: "var(--ft-radius-tile)",
                    overflow: "hidden",
                    background: "#000",
                  }}
                >
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${playing.yt}?autoplay=1&rel=0`}
                    title={playing.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", border: 0, display: "block" }}
                  />
                </div>
                <p
                  style={{
                    marginTop: "0.75rem",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "var(--ft-paper)",
                  }}
                >
                  {playing.title}
                </p>
              </div>
            </div>,
            document.body
          )}
      </StackCard>

      {/* ------------------------------------------ Card 2: juice notes flip */}
      <StackCard label="Sample Juice Notes" variant="alt">
        <div className="flex items-center gap-3 flex-wrap ft-reveal">
          <p className="ft-label">Sample Juice Notes</p>
          <span className="ft-chip">{section.heading}</span>
        </div>
        <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 0.5rem" }}>
          Flip through the notes.
        </h2>
        <p className="ft-sub ft-reveal" data-delay="1" style={{ maxWidth: 640, fontSize: "1rem" }}>
          The distilled version of every class — one idea per page.
        </p>
        <JuiceNotesFlip key={section.key} section={section} />
      </StackCard>

      {/* --------------------------------------- Card 3: platform previews */}
      <StackCard label="Inside the platform">
        <p className="ft-label ft-reveal">Inside the platform</p>
        <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 0.5rem" }}>
          Doubts, LMS and mocks — in one place.
        </h2>
        <p className="ft-sub ft-reveal" data-delay="1" style={{ maxWidth: 640, fontSize: "1rem" }}>
          A preview of the tools every {section.heading} learner studies with.
        </p>
        <div className="grid gap-4 lg:grid-cols-3 mt-8 ft-reveal" data-delay="2">
          <DoubtForumMock heading={section.heading} shots={section.shots} />
          <LmsMock heading={section.heading} shots={section.shots} />
          <MockTestMock heading={section.heading} shots={section.shots} />
        </div>
      </StackCard>
    </CardStack>
  );
}

/* ------------------------------------------------ sample juice notes flip */
function JuiceNotesFlip({ section }: { section: DemoSection }) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const pdf = section.juicePages;
  const pages = section.juice;
  const count = pdf ? pdf.images.length : pages.length;

  useEffect(() => setPage(0), [section.key]);

  const go = (n: number) => {
    const next = ((n % count) + count) % count;
    setDir(next > page || (page === count - 1 && next === 0) ? 1 : -1);
    setPage(next);
  };

  const current = pages[page];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] mt-8 ft-reveal" data-delay="2" style={{ alignItems: "center" }}>
      {/* note page viewer */}
      <div>
        <div className="ft-jn-stage">
          <article key={`${section.key}-${page}`} className={`ft-jn-page${pdf ? " ft-jn-page--img" : ""}`} data-dir={dir}>
            <p className="ft-label" style={{ marginBottom: "0.6rem" }}>
              Juice notes · {section.heading} · {pdf ? pdf.title : "demo"}
            </p>
            {pdf && (
              <img
                src={pdf.images[page]}
                alt={`${section.heading} Juice Notes — ${pdf.title}, page ${page + 1}`}
              />
            )}
            {!pdf && (
              <>
            <h3
              style={{
                fontFamily: "var(--ft-font-display)",
                fontWeight: 800,
                fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)",
                color: "var(--ft-indigo)",
                lineHeight: 1.1,
              }}
            >
              {current.title}
            </h3>
            <ul style={{ margin: "1.1rem 0 0", padding: 0, listStyle: "none", display: "grid", gap: "0.7rem" }}>
              {current.points.map((pt, i) => (
                <li key={i} style={{ display: "flex", gap: "0.6rem", fontSize: "0.95rem", lineHeight: 1.5 }}>
                  <span style={{ color: "var(--ft-teach)", fontWeight: 900, flexShrink: 0 }}>✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            {current.formula && (
              <p
                style={{
                  marginTop: "1.2rem",
                  fontFamily: "var(--ft-font-mono)",
                  fontSize: "0.9rem",
                  background: "var(--ft-surface-sunken)",
                  borderRadius: "var(--ft-radius-organic-sm)",
                  padding: "0.6rem 1rem",
                  display: "inline-block",
                }}
              >
                {current.formula}
              </p>
            )}
              </>
            )}
            <span className="ft-jn-pageno">
              {page + 1} / {count}
            </span>
          </article>
        </div>

        {/* controls */}
        <div className="flex items-center gap-4" style={{ marginTop: "1.1rem" }}>
          <button className="ft-jn-arrow" onClick={() => go(page - 1)} aria-label="Previous page">
            ←
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Note pages" style={{ flexWrap: "wrap" }}>
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === page}
                aria-label={`Page ${i + 1}`}
                onClick={() => go(i)}
                className={`ft-jn-dot${i === page ? " is-active" : ""}`}
              />
            ))}
          </div>
          <button className="ft-jn-arrow" onClick={() => go(page + 1)} aria-label="Next page">
            →
          </button>
        </div>
      </div>

      {/* page index */}
      <div>
        <p className="ft-label" style={{ marginBottom: "1rem" }}>In this sample{pdf ? ` — ${pdf.title}` : ""}</p>
        <div className="grid gap-3">
          {pdf
            ? pdf.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`ft-tile ft-jn-index${i === page ? " is-active" : ""}`}
                  style={{ textAlign: "left", padding: "0.9rem 1.1rem", cursor: "pointer", font: "inherit" }}
                >
                  <span style={{ color: "var(--ft-teach)", fontWeight: 900, marginRight: "0.6rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontWeight: i === page ? 700 : 500 }}>Page {i + 1}</span>
                </button>
              ))
            : pages.map((p, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`ft-tile ft-jn-index${i === page ? " is-active" : ""}`}
                  style={{ textAlign: "left", padding: "0.9rem 1.1rem", cursor: "pointer", font: "inherit" }}
                >
                  <span style={{ color: "var(--ft-teach)", fontWeight: 900, marginRight: "0.6rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontWeight: i === page ? 700 : 500 }}>{p.title}</span>
                </button>
              ))}
        </div>
        <p style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "var(--ft-ink-faint)" }}>
          Demo pages — final notes are shared with enrolled learners.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- platform mocks */
function DemoTag() {
  return <span className="ft-chip ft-chip--demo">Demo</span>;
}

function ShotImg({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={{
        width: "100%",
        display: "block",
        borderRadius: "var(--ft-radius-organic-sm)",
        border: "1px solid var(--ft-line)",
      }}
    />
  );
}

function DoubtForumMock({ heading, shots }: { heading: string; shots?: DemoShots }) {
  if (shots?.doubt?.length) {
    return (
      <div className="ft-tile" style={{ padding: "1.25rem" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
          <p className="ft-label">Doubt forum</p>
        </div>
        <div className="grid gap-3">
          {shots.doubt.map((src, i) => (
            <ShotImg key={src} src={src} alt={`${heading} — doubt forum, screenshot ${i + 1}`} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="ft-tile" style={{ padding: "1.25rem" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
        <p className="ft-label">Doubt forum</p>
        <DemoTag />
      </div>
      <div className="ft-mock-bubble ft-mock-bubble--in">
        <p style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
          “Why does capitalising interest raise CFO in year 1?”
        </p>
        <p className="ft-mock-meta">Aarav · CFA L1 · 2h ago</p>
      </div>
      <div className="ft-mock-bubble ft-mock-bubble--out">
        <p style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
          It moves the outflow from operating to investing — so CFO looks higher, CFI lower. We
          covered this in class 4; rewatch from 18:20.
        </p>
        <p className="ft-mock-meta">Mentor · FinTree</p>
      </div>
      <div className="ft-mock-input">Ask your doubt…</div>
    </div>
  );
}

function LmsMock({ heading, shots }: { heading: string; shots?: DemoShots }) {
  if (shots?.lms) {
    return (
      <div className="ft-tile" style={{ padding: "1.25rem" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
          <p className="ft-label">LMS</p>
        </div>
        <ShotImg src={shots.lms} alt={`${heading} — LMS screenshot`} />
      </div>
    );
  }
  const rows = [
    { name: "Module 1 · Foundations", pct: 100 },
    { name: "Module 2 · Core concepts", pct: 65 },
    { name: "Module 3 · Practice sets", pct: 20 },
  ];
  return (
    <div className="ft-tile" style={{ padding: "1.25rem" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
        <p className="ft-label">LMS</p>
        <DemoTag />
      </div>
      <p style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem" }}>{heading} — your batch</p>
      <div className="grid gap-4">
        {rows.map((r) => (
          <div key={r.name}>
            <div className="flex justify-between" style={{ fontSize: "0.8rem", marginBottom: 5 }}>
              <span style={{ fontWeight: 600 }}>{r.name}</span>
              <span style={{ color: "var(--ft-ink-faint)" }}>{r.pct}%</span>
            </div>
            <div style={{ height: 8, background: "var(--ft-surface-sunken)", borderRadius: 4 }}>
              <div
                style={{
                  height: "100%",
                  width: `${r.pct}%`,
                  background: "var(--ft-evergreen)",
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="ft-mock-meta" style={{ marginTop: "1rem" }}>Next live class · Saturday 11 am</p>
    </div>
  );
}

function MockTestMock({ heading, shots }: { heading: string; shots?: DemoShots }) {
  if (shots?.test?.length) {
    return (
      <div className="ft-tile" style={{ padding: "1.25rem" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
          <p className="ft-label">Mock test</p>
        </div>
        <div className="grid gap-3">
          {shots.test.map((src, i) => (
            <ShotImg key={src} src={src} alt={`${heading} — quiz & mock test, screenshot ${i + 1}`} />
          ))}
        </div>
      </div>
    );
  }
  const opts = ["A. ₹10,000", "B. ₹10,500", "C. ₹11,025", "D. ₹11,550"];
  return (
    <div className="ft-tile" style={{ padding: "1.25rem" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: "1rem" }}>
        <p className="ft-label">Mock test</p>
        <DemoTag />
      </div>
      <div className="flex justify-between" style={{ fontSize: "0.78rem", color: "var(--ft-ink-faint)", marginBottom: "0.75rem" }}>
        <span>Question 12 of 40</span>
        <span style={{ fontFamily: "var(--ft-font-mono)" }}>00:41:16</span>
      </div>
      <p style={{ fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.5, marginBottom: "0.9rem" }}>
        ₹10,000 invested at 5% compounded annually grows to what amount in 2 years?
      </p>
      <div className="grid gap-2">
        {opts.map((o, i) => (
          <div key={o} className={`ft-mock-opt${i === 2 ? " is-picked" : ""}`}>
            {o}
          </div>
        ))}
      </div>
      <div className="ft-btn" style={{ marginTop: "1rem", padding: "0.55rem 1.25rem", fontSize: "0.85rem", pointerEvents: "none" }}>
        Submit answer
      </div>
    </div>
  );
}
