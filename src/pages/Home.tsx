import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { CardStack, StackCard } from "../components/CardStack";
import {
  SITE,
  PROGRAMMES,
  FOUNDER,
  REVIEWS,
  GALLERY,
  ALUMNI_LOGOS,
  PLACEMENT,
} from "../data/site";

/* ---------------------------------------------------------------- Card 1 */
function IntroCard() {
  return (
    <StackCard label="Introduction">
      <div className="flex flex-col justify-center h-full">
        <p className="ft-label ft-reveal">FinTree Education · Pune · since {SITE.founded}</p>
        <h1 className="ft-hero ft-reveal" data-delay="1" style={{ maxWidth: 900, margin: "1rem 0" }}>
          {SITE.tagline}
        </h1>
        <p className="ft-sub ft-reveal" data-delay="2" style={{ maxWidth: 620 }}>
          Fourteen years, one job: making finance finally click — understanding
          before the exam.
        </p>
        <div className="grid gap-4 md:grid-cols-3 mt-10 ft-reveal" data-delay="3">
          {PROGRAMMES.map((p) => (
            <Link
              key={p.key}
              to={p.path}
              className="ft-tile"
              style={{ padding: "1.5rem", textDecoration: "none", color: "inherit", display: "block" }}
            >
              <p className="ft-label">{p.full}</p>
              <p style={{ fontWeight: 800, fontSize: "1.6rem", margin: "0.4rem 0" }}>{p.name}</p>
              <p style={{ fontSize: "0.9rem", color: "var(--ft-ink-soft)", lineHeight: 1.55 }}>{p.blurb}</p>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, display: "inline-block", marginTop: "0.9rem" }}>
                Explore →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-12 ft-reveal" data-delay="3">
          <span className="ft-scroll-hint">Scroll</span>
        </div>
      </div>
    </StackCard>
  );
}

/* ---------------------------------------------------------------- Card 2 */
function AboutCard() {
  return (
    <StackCard label="About FinTree" variant="alt">
      <p className="ft-label ft-reveal">About FinTree</p>
      <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 1rem" }}>
        Fourteen years of making finance click.
      </h2>
      <p className="ft-sub ft-reveal" data-delay="2" style={{ maxWidth: 680 }}>
        One Pune classroom in {SITE.founded}. 80,000+ learners in 50+ countries today.
        The rule hasn't changed: concept before memorisation.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 ft-reveal" data-delay="2">
        {SITE.stats.map((s) => (
          <div key={s.label} className="ft-tile" style={{ padding: "1.25rem", textAlign: "center" }}>
            <p style={{ fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-0.01em" }}>{s.value}</p>
            <p className="ft-label" style={{ marginTop: "0.25rem" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </StackCard>
  );
}

/* ---------------------------------------------------------------- Card 3 */
function FounderCard() {
  return (
    <StackCard label="Utkarsh Jain, founder">
      <div className="grid gap-10 md:grid-cols-2 items-center h-full">
        <div className="ft-ph ft-ph--img ft-reveal" style={{ aspectRatio: "4/5", maxHeight: "62vh", width: "100%" }}>
          <img src="/photos/founder.jpg" alt="Utkarsh Jain teaching a FinTree batch" />
        </div>
        <div>
          <p className="ft-label ft-reveal">The mind behind the method</p>
          <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 1.25rem" }}>
            {FOUNDER.name}
          </h2>
          <blockquote
            className="ft-sub ft-reveal"
            data-delay="2"
            style={{
              borderLeft: "3px solid var(--ft-accent)",
              paddingLeft: "1.25rem",
              fontStyle: "italic",
            }}
          >
            "{FOUNDER.quote}"
          </blockquote>
          <p className="ft-reveal" data-delay="3" style={{ marginTop: "1.5rem", fontWeight: 600, lineHeight: 1.7 }}>
            {FOUNDER.credentials}
          </p>
        </div>
      </div>
    </StackCard>
  );
}

/* ---------------------------------------------------------------- Card 4 */
function ReviewsCard() {
  const track = [...REVIEWS, ...REVIEWS];
  return (
    <StackCard label="Student reviews" variant="alt">
      <p className="ft-label ft-reveal">Reviews</p>
      <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 0.5rem" }}>
        You'd be in good company.
      </h2>
      <p className="ft-sub ft-reveal" data-delay="2" style={{ marginBottom: "2.5rem" }}>
        Rated 4.9 across 1,218 reviews.
      </p>
      <div className="ft-marquee ft-reveal" data-delay="2" style={{ margin: "0 calc(var(--ft-gutter) * -1)" }}>
        <div className="ft-marquee-track" style={{ padding: "0.5rem var(--ft-gutter)" }}>
          {track.map((r, i) => (
            <figure
              key={i}
              className="ft-tile"
              style={{ width: 340, flexShrink: 0, padding: "1.5rem", display: "flex", flexDirection: "column" }}
            >
              <blockquote style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--ft-ink-soft)", flex: 1 }}>
                "{r.text}"
              </blockquote>
              <figcaption style={{ marginTop: "1rem" }}>
                <p style={{ fontWeight: 700, fontSize: "0.92rem" }}>{r.name}</p>
                <p style={{ fontSize: "0.78rem", color: "var(--ft-ink-faint)" }}>{r.meta}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </StackCard>
  );
}

/* ---------------------------------------------------------------- Card 5 */
/* per-photo focal tweaks so the teacher stays in frame on square crops */
const GALLERY_POS: Record<string, React.CSSProperties> = {
  /* run taller than the tile and anchor bottom-right: crops the ceiling,
     keeps the teacher's head and the front rows visible */
  "classroom-2.jpg": {
    position: "absolute",
    right: 0,
    bottom: 0,
    height: "135%",
    width: "auto",
    maxWidth: "none",
    borderRadius: 0,
  },
};

function GalleryCard() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <StackCard label="Photo gallery">
      <p className="ft-label ft-reveal">Gallery</p>
      <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 2rem" }}>
        Inside FinTree.
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {GALLERY.map((g) => (
          <div key={g.cluster} className="ft-reveal" data-delay="2">
            <p className="ft-label" style={{ marginBottom: "0.75rem" }}>{g.cluster}</p>
            <div className="grid grid-cols-2 gap-3">
              {g.images.map((img, i) => {
                const id = `${g.cluster} #${i + 1}`;
                const src = `/photos/${img}`;
                return (
                  <button
                    key={i}
                    className="ft-ph ft-ph--img"
                    style={{ aspectRatio: "1", cursor: "zoom-in" }}
                    onClick={() => setOpen(src)}
                    aria-label={`Open image ${id}`}
                  >
                    <img src={src} alt={`${g.cluster} — FinTree`} loading="lazy" style={GALLERY_POS[img]} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {open &&
        createPortal(
          <div className="ft-lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label="Image preview">
            <img
              src={open}
              alt="FinTree — gallery photo"
              style={{ width: "min(880px, 92vw)", maxHeight: "82vh", objectFit: "contain", borderRadius: "var(--ft-radius-tile)" }}
            />
          </div>,
          document.body
        )}
    </StackCard>
  );
}

/* ---------------------------------------------------------------- Card 6 */
function AlumniCard() {
  return (
    <StackCard label="Where our alumni work" variant="inverse">
      <p className="ft-label ft-reveal">Outcomes</p>
      <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 1rem" }}>
        Where our alumni work.
      </h2>
      <p className="ft-sub ft-reveal" data-delay="2" style={{ maxWidth: 640, marginBottom: "2.5rem" }}>
        Global banks, ratings agencies, asset managers, research houses.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ft-reveal" data-delay="2">
        {ALUMNI_LOGOS.map((l) => (
          <div key={l.name} className="ft-logo-cell">
            <img src={l.img} alt={l.name} loading="lazy" />
          </div>
        ))}
      </div>
    </StackCard>
  );
}

/* ---------------------------------------------------------------- Card 7 */
function PlacementCard() {
  return (
    <StackCard label="Placement support">
      <p className="ft-label ft-reveal">Placement support</p>
      <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 1rem" }}>
        We don't place you. We prepare you.
      </h2>
      <p className="ft-sub ft-reveal" data-delay="2" style={{ maxWidth: 760 }}>
        {PLACEMENT.intro}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 ft-reveal" data-delay="2">
        {PLACEMENT.stats.map((s) => (
          <div key={s.label} className="ft-tile" style={{ padding: "1.25rem", textAlign: "center" }}>
            <p style={{ fontWeight: 800, fontSize: "1.5rem" }}>{s.value}</p>
            <p className="ft-label" style={{ marginTop: "0.25rem" }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3 mt-8 ft-reveal" data-delay="3">
        {PLACEMENT.steps.map((s) => (
          <div key={s.title} style={{ borderLeft: "2px solid var(--ft-accent)", paddingLeft: "1.1rem" }}>
            <p style={{ fontWeight: 700 }}>{s.title}</p>
            <p style={{ fontSize: "0.9rem", color: "var(--ft-ink-soft)", lineHeight: 1.6, marginTop: "0.3rem" }}>
              {s.text}
            </p>
          </div>
        ))}
      </div>
      <p className="ft-label mt-10 mb-3 ft-reveal" data-delay="3">Hiring partners</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 ft-reveal" data-delay="3">
        {PLACEMENT.hiringLogos.map((l) => (
          <div key={l.name} className="ft-logo-cell" style={{ minHeight: 64 }}>
            <img src={l.img} alt={l.name} loading="lazy" />
          </div>
        ))}
      </div>
    </StackCard>
  );
}

/* ---------------------------------------------------------------- Card 8 */
function PathsCard() {
  return (
    <StackCard label="Choose your path" flush>
      <div className="flex flex-col h-full" style={{ minHeight: "100vh" }}>
        <div style={{ padding: "0 var(--ft-gutter)", maxWidth: "var(--ft-content-max)", margin: "0 auto", width: "100%" }}>
          <p className="ft-label ft-reveal">Choose your path</p>
          <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 2rem" }}>
            Three doors. Pick one.
          </h2>
        </div>
        <div className="flex flex-col md:flex-row flex-1" style={{ flex: 1 }}>
          {PROGRAMMES.map((p) => (
            <Link key={p.key} to={p.path} className="ft-door ft-reveal" data-delay="2">
              <p className="ft-label" style={{ color: "inherit", opacity: 0.6 }}>{p.full}</p>
              <p style={{ fontWeight: 800, fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                {p.name}
              </p>
              <p style={{ fontSize: "0.95rem", opacity: 0.75, maxWidth: 380, lineHeight: 1.55 }}>{p.blurb}</p>
              <span style={{ fontWeight: 700, marginTop: "0.75rem" }}>Enter →</span>
            </Link>
          ))}
        </div>
      </div>
    </StackCard>
  );
}

export default function Home() {
  return (
    <CardStack>
      <IntroCard />
      <AboutCard />
      <FounderCard />
      <ReviewsCard />
      <GalleryCard />
      <AlumniCard />
      <PlacementCard />
      <PathsCard />
    </CardStack>
  );
}
