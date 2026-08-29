import {
  useEffect,
  useRef,
  type ReactNode,
  type CSSProperties,
} from "react";

/**
 * CardStack — the structural motion system from the brief.
 *
 * Each <StackCard> is a full-viewport panel. The next card slides up over
 * the current one (sticky positioning); the outgoing card scales down,
 * lifts slightly and dims. Motion values are read once from the central
 * tokens in theme.css so the timing/easing stays configurable in one place.
 * Honors prefers-reduced-motion (no transforms, plain document flow).
 */

function readToken(name: string, fallback: number): number {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

export function CardStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobile = () => window.innerWidth < 768;

    const activateAll = () =>
      root
        .querySelectorAll(".ft-card")
        .forEach((c) => c.classList.add("is-active"));

    if (reduced.matches) {
      activateAll();
      return;
    }

    /* Mobile: plain vertical flow; reveal content as cards enter view.
       Threshold is viewport-relative (rootMargin), not a fraction of the
       card — tall cards must still reveal on short phone viewports. */
    if (isMobile()) {
      const cardsM = Array.from(root.querySelectorAll<HTMLElement>(".ft-card"));
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("is-active");
          }),
        { threshold: 0, rootMargin: "0px 0px -20% 0px" },
      );
      cardsM.forEach((c) => io.observe(c));
      return () => io.disconnect();
    }

    const items = Array.from(
      root.querySelectorAll<HTMLElement>(".ft-stack-item"),
    );
    const cards = items.map(
      (it) => it.querySelector<HTMLElement>(".ft-card")!,
    );
    const dims = items.map(
      (it) => it.querySelector<HTMLElement>(".ft-card-dim")!,
    );

    const SCALE = readToken("--ft-stack-scale", 0.045);
    const LIFT = readToken("--ft-stack-lift", 26);
    const DIM = readToken("--ft-stack-dim", 0.35);

    let tops: number[] = [];
    const measure = () => {
      tops = items.map((it) => it.getBoundingClientRect().top + window.scrollY);
    };
    measure();

    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const mid = y + vh * 0.5;

      for (let i = 0; i < items.length; i++) {
        // progress: 0 = card fully in view, 1 = next card fully covers it
        const next = tops[i + 1];
        let p = 0;
        if (next !== undefined) {
          // how far the next wrapper's top has travelled up into the viewport
          p = Math.min(Math.max((y + vh - next) / vh, 0), 1);
        }
        const card = cards[i];
        if (p > 0) {
          card.style.transform = `scale(${1 - p * SCALE}) translateY(${-p * LIFT}px)`;
          dims[i].style.opacity = String(p * DIM);
        } else {
          card.style.transform = "";
          dims[i].style.opacity = "0";
        }
        // active state drives inner content reveal
        const top = tops[i];
        const bottom = next !== undefined ? next : top + vh;
        card.classList.toggle("is-active", mid >= top && mid < bottom + vh * 0.5);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={ref} className="ft-stack">
      {children}
    </div>
  );
}

export function StackCard({
  id,
  variant,
  flush = false,
  label,
  children,
  style,
}: {
  id?: string;
  variant?: "alt" | "inverse";
  flush?: boolean;
  label: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const cls =
    "ft-card" +
    (variant === "alt" ? " ft-card--alt" : "") +
    (variant === "inverse" ? " ft-card--inverse" : "");
  return (
    <section className="ft-stack-item" id={id} aria-label={label}>
      <div className={cls} style={style}>
        <div className="ft-card-dim" aria-hidden="true" />
        <div className={`ft-card-body${flush ? " ft-card-body--flush" : ""}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
