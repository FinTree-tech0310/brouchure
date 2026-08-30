import { useState } from "react";
import { COUNSELLORS, SITE } from "../data/site";

/* ------------------------------------------------------------------
   Attempt simulator — level → persona → weekly hours → attempt window
   Mapping data comes from the source brochure (see data files).
------------------------------------------------------------------- */
export type SimulatorConfig = {
  levels: string[];
  personas: { key: string; label: string; sub: string }[];
  hours: string[];
  hoursLabel: Record<string, string>;
  attemptByLevel: Record<string, Record<string, string>>;
  resultLabel?: string;
};

export function AttemptSimulator({ config }: { config: SimulatorConfig }) {
  const [step, setStep] = useState(1);
  const [level, setLevel] = useState<string | null>(null);
  const [persona, setPersona] = useState<string | null>(null);
  const [hours, setHours] = useState<string | null>(null);

  const result =
    level && hours ? config.attemptByLevel[level]?.[hours] ?? null : null;

  const reset = () => {
    setStep(1);
    setLevel(null);
    setPersona(null);
    setHours(null);
  };

  const Opt = ({
    picked,
    onClick,
    title,
    sub,
  }: {
    picked: boolean;
    onClick: () => void;
    title: string;
    sub?: string;
  }) => (
    <button className={`ft-sim-opt${picked ? " is-picked" : ""}`} onClick={onClick}>
      <span style={{ fontWeight: 700, display: "block" }}>{title}</span>
      {sub && (
        <span style={{ fontSize: "0.85rem", color: "var(--ft-ink-soft)" }}>{sub}</span>
      )}
    </button>
  );

  return (
    <div className="ft-tile" style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)", maxWidth: 720, margin: "0 auto" }}>
      <div className="flex gap-2 justify-center mb-6" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            style={{
              width: 34,
              height: 4,
              borderRadius: 2,
              background: step >= n || result ? "var(--ft-accent)" : "var(--ft-line)",
              transition: "background 300ms",
            }}
          />
        ))}
      </div>

      {step === 1 && !result && (
        <div>
          <p className="ft-label mb-4 text-center">1 · Which level?</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {config.levels.map((l) => (
              <Opt
                key={l}
                picked={level === l}
                title={l}
                onClick={() => {
                  setLevel(l);
                  setTimeout(() => setStep(2), 220);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {step === 2 && !result && (
        <div>
          <p className="ft-label mb-4 text-center">2 · Who are you?</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {config.personas.map((p) => (
              <Opt
                key={p.key}
                picked={persona === p.key}
                title={p.label}
                sub={p.sub}
                onClick={() => {
                  setPersona(p.key);
                  setTimeout(() => setStep(3), 220);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {step === 3 && !result && (
        <div>
          <p className="ft-label mb-4 text-center">3 · Honest daily study hours?</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {config.hours.map((h) => (
              <Opt
                key={h}
                picked={hours === h}
                title={config.hoursLabel[h] ?? h}
                onClick={() => setHours(h)}
              />
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="text-center">
          <p className="ft-label">{config.resultLabel ?? "A realistic first attempt"}</p>
          <p
            style={{
              fontFamily: "var(--ft-font-display)",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              margin: "0.75rem 0",
              letterSpacing: "-0.01em",
            }}
          >
            {result}
          </p>
          <p className="ft-sub" style={{ fontSize: "0.95rem" }}>
            {level} · {persona === "student" ? "Student" : "Working professional"} ·{" "}
            {config.hoursLabel[hours!]}
          </p>
          <p className="ft-sub" style={{ fontSize: "0.9rem", marginTop: "0.75rem" }}>
            That's not a deadline. It's a starting point you can trust.
          </p>
          <div className="flex gap-3 justify-center mt-6 flex-wrap">
            <button className="ft-btn ft-btn--ghost" onClick={reset}>
              Start over
            </button>
            <a className="ft-btn" href={`tel:${SITE.support.replace(/\s/g, "")}`}>
              Talk it through with a counsellor
            </a>
          </div>
        </div>
      )}

      {!result && step > 1 && (
        <div className="text-center mt-5">
          <button
            onClick={() => setStep(step - 1)}
            style={{
              background: "none",
              border: "none",
              color: "var(--ft-ink-faint)",
              cursor: "pointer",
              fontSize: "0.85rem",
              textDecoration: "underline",
            }}
          >
            ← Change previous answer
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   Comparison table (CFA vs CA vs MBA etc.)
------------------------------------------------------------------- */
export function CompareTable({
  heads,
  rows,
  note,
}: {
  heads: string[];
  rows: { dim: string; a?: string; b?: string; c?: string; cfa?: string; ca?: string; mba?: string }[];
  note: string;
}) {
  const cell = (r: (typeof rows)[number], i: number) =>
    i === 0 ? r.a ?? r.cfa ?? "" : i === 1 ? r.b ?? r.ca ?? "" : r.c ?? r.mba ?? "";
  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <table className="ft-table" style={{ minWidth: 680 }}>
          <thead>
            <tr>
              <th style={{ width: "16%" }}></th>
              {heads.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.dim}>
                <td style={{ fontWeight: 700 }}>{r.dim}</td>
                {heads.map((_, i) => (
                  <td key={i} style={{ color: "var(--ft-ink-soft)", lineHeight: 1.55 }}>
                    {cell(r, i)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: "0.8rem", color: "var(--ft-ink-faint)", marginTop: "1rem", lineHeight: 1.6 }}>
        {note}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
   Exam details — tabbed by level/part
------------------------------------------------------------------- */
export type ExamLevel = {
  level: string;
  intro: string;
  structure: { k: string; v: string }[];
  note: string;
  weights: [string, string][];
  weightsTitle: string;
  pathways?: string[];
};

export function ExamDetails({ levels }: { levels: ExamLevel[] }) {
  const [active, setActive] = useState(0);
  const L = levels[active];
  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-8" role="tablist" aria-label="Exam level">
        {levels.map((l, i) => (
          <button
            key={l.level}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            style={{
              padding: "0.55rem 1.2rem",
              borderRadius: "var(--ft-radius-pill)",
              border: "1px solid var(--ft-line)",
              background: i === active ? "var(--ft-accent)" : "transparent",
              color: i === active ? "var(--ft-accent-ink)" : "var(--ft-ink-soft)",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            {l.level}
          </button>
        ))}
      </div>

      <p className="ft-sub" style={{ maxWidth: 780, marginBottom: "2rem" }}>{L.intro}</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {L.structure.map((s) => (
          <div key={s.k} className="ft-tile" style={{ padding: "1.1rem 1.25rem" }}>
            <p className="ft-label">{s.k}</p>
            <p style={{ fontWeight: 700, marginTop: "0.4rem", lineHeight: 1.4 }}>{s.v}</p>
          </div>
        ))}
      </div>

      {L.weights.length > 0 && (
        <div>
          <p className="ft-label mb-4">{L.weightsTitle}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {L.weights.map(([name, w]) => (
              <div
                key={name}
                className="flex justify-between items-center"
                style={{
                  padding: "0.65rem 0.9rem",
                  borderBottom: "1px solid var(--ft-line)",
                  fontSize: "0.92rem",
                }}
              >
                <span style={{ color: "var(--ft-ink-soft)" }}>{name}</span>
                <strong>{w}</strong>
              </div>
            ))}
          </div>
          {L.pathways && (
            <p className="ft-sub" style={{ fontSize: "0.9rem", marginTop: "1rem" }}>
              Choose one pathway (30–35%): {L.pathways.join(" · ")}
            </p>
          )}
        </div>
      )}

      <p style={{ fontSize: "0.85rem", color: "var(--ft-ink-faint)", marginTop: "1.5rem", lineHeight: 1.6, maxWidth: 780 }}>
        {L.note}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
   Failure gaps — calm, diagnostic
------------------------------------------------------------------- */
export function FailureGaps({
  title,
  body,
  gaps,
}: {
  title: string;
  body: string;
  gaps: { title: string; text: string }[];
}) {
  return (
    <div>
      <h2 className="ft-title">{title}</h2>
      <p className="ft-sub" style={{ maxWidth: 720, margin: "1.25rem 0 2.5rem" }}>{body}</p>
      <div className="grid gap-4 md:grid-cols-3">
        {gaps.map((g, i) => (
          <div key={g.title} className="ft-tile ft-reveal" data-delay={String(i + 1)} style={{ padding: "1.75rem" }}>
            <p className="ft-label">0{i + 1}</p>
            <p style={{ fontWeight: 800, fontSize: "1.3rem", margin: "0.6rem 0 0.4rem" }}>{g.title}</p>
            <p style={{ color: "var(--ft-ink-soft)", lineHeight: 1.6 }}>{g.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   LPR method — three connected stages
------------------------------------------------------------------- */
export function LPR({
  stages,
}: {
  stages: { key: string; title: string; sub: string; text: string }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3" style={{ position: "relative" }}>
      {stages.map((s, i) => (
        <div
          key={s.key}
          className="ft-tile ft-reveal"
          data-delay={String(i + 1)}
          style={{ padding: "2rem", position: "relative" }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "var(--ft-accent)",
              color: "var(--ft-accent-ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "1.4rem",
              marginBottom: "1.25rem",
            }}
          >
            {s.key}
          </div>
          <p style={{ fontWeight: 800, fontSize: "1.25rem" }}>
            {s.title}{" "}
            <span style={{ fontWeight: 500, color: "var(--ft-ink-soft)", fontSize: "1rem" }}>{s.sub}</span>
          </p>
          <p style={{ color: "var(--ft-ink-soft)", lineHeight: 1.65, marginTop: "0.6rem" }}>{s.text}</p>
          {i < stages.length - 1 && (
            <span
              aria-hidden="true"
              className="hidden md:block"
              style={{
                position: "absolute",
                right: "-1.35rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--ft-ink-faint)",
                fontSize: "1.4rem",
                zIndex: 2,
              }}
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
   Fee picker — level → exam window → plan cards (like the course
   pages: choose level, choose attempt, compare plans side by side).
------------------------------------------------------------------- */
export type FeeConfig = {
  note?: string;
  plans: string[];
  levels: {
    level: string;
    plans?: string[];
    specialisations?: string[];
    windows: { window: string; prices: (string | null)[] }[];
    note?: string;
  }[];
  packs: { name: string; tag: string; price: string; desc: string }[];
  combos?: { name: string; tag: string; price: string; desc: string }[];
  footnote: string;
};

const PLAN_META: Record<string, { kind: string; features: string[] }> = {
  Classroom: {
    kind: "Instructor-led",
    features: ["Classroom + online live sessions", "Printed Juice Notes™", "48-hour archive of every live session", "Doubt-clearing forum"],
  },
  "Live School": {
    kind: "Instructor-led",
    features: ["Live online classes — nothing pre-recorded", "Soft-copy Juice Notes™", "48-hour archive of every live session", "Doubt-clearing forum"],
  },
  "Home School": {
    kind: "Self-paced",
    features: ["Pre-recorded videos", "Soft-copy Juice Notes™", "Doubt-clearing forum"],
  },
  Essential: {
    kind: "Self-paced",
    features: ["Pre-recorded videos", "Doubt-clearing forum"],
  },
};

export function FeeGrid({ fees }: { fees: FeeConfig }) {
  const [levelIdx, setLevelIdx] = useState(0);
  const [windowIdx, setWindowIdx] = useState(0);
  const [specIdx, setSpecIdx] = useState(0);

  const lvl = fees.levels[levelIdx];
  const plans = lvl.plans ?? fees.plans;
  const win = lvl.windows[Math.min(windowIdx, lvl.windows.length - 1)];

  return (
    <div>
      {fees.note && (
        <p className="ft-sub" style={{ maxWidth: 780, marginBottom: "2rem", fontSize: "0.95rem" }}>
          {fees.note}
        </p>
      )}

      {/* step 1 — level */}
      {fees.levels.length > 1 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <p className="ft-label" style={{ marginBottom: "0.75rem" }}>1 · Pick your level</p>
          <div role="tablist" aria-label="Level" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {fees.levels.map((l, i) => (
              <button
                key={l.level}
                role="tab"
                aria-selected={i === levelIdx}
                className={`ft-demo-tab${i === levelIdx ? " is-active" : ""}`}
                onClick={() => {
                  setLevelIdx(i);
                  setWindowIdx(0);
                  setSpecIdx(0);
                }}
              >
                {l.level}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* step 2 — exam window */}
      {lvl.windows.length > 1 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <p className="ft-label" style={{ marginBottom: "0.75rem" }}>2 · Choose exam attempt</p>
          <div role="tablist" aria-label="Exam attempt" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {lvl.windows.map((w, i) => (
              <button
                key={w.window}
                role="tab"
                aria-selected={i === Math.min(windowIdx, lvl.windows.length - 1)}
                className={`ft-demo-tab${i === Math.min(windowIdx, lvl.windows.length - 1) ? " is-active" : ""}`}
                onClick={() => setWindowIdx(i)}
              >
                {w.window}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* step 3 — specialisation (CFA L3) */}
      {lvl.specialisations && (
        <div style={{ marginBottom: "1.5rem" }}>
          <p className="ft-label" style={{ marginBottom: "0.75rem" }}>3 · Choose your specialisation</p>
          <div role="tablist" aria-label="Specialisation" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {lvl.specialisations.map((s, i) => (
              <button
                key={s}
                role="tab"
                aria-selected={i === specIdx}
                className={`ft-demo-tab${i === specIdx ? " is-active" : ""}`}
                onClick={() => setSpecIdx(i)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* plan cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" style={{ alignItems: "stretch" }}>
        {plans.map((p, i) => {
          const price = win.prices[i];
          if (price == null) return null;
          const meta = PLAN_META[p];
          return (
            <div key={p} className="ft-tile" style={{ padding: "1.4rem", display: "flex", flexDirection: "column" }}>
              <p className="ft-label">{meta?.kind ?? "Plan"}</p>
              <p style={{ fontWeight: 800, fontSize: "1.05rem", marginTop: "0.4rem" }}>{p}</p>
              <p
                style={{
                  fontFamily: "var(--ft-font-display)",
                  fontWeight: 800,
                  fontSize: "1.6rem",
                  color: "var(--ft-indigo)",
                  marginTop: "0.6rem",
                }}
              >
                {price}
              </p>
              {meta && (
                <ul style={{ margin: "0.9rem 0 0", padding: 0, listStyle: "none", display: "grid", gap: "0.5rem" }}>
                  {meta.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: "0.5rem", fontSize: "0.82rem", lineHeight: 1.45, color: "var(--ft-ink-soft)" }}>
                      <span style={{ color: "var(--ft-teach)", fontWeight: 900, flexShrink: 0 }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      {lvl.note && (
        <p style={{ fontSize: "0.8rem", color: "var(--ft-ink-faint)", marginTop: "0.75rem" }}>{lvl.note}</p>
      )}

      {fees.packs.length > 0 && (
        <div className="mt-8">
          <p className="ft-label mb-4">Special packs</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fees.packs.map((p) => (
              <div key={p.name} className="ft-tile" style={{ padding: "1.4rem" }}>
                <p className="ft-label">{p.tag}</p>
                <p style={{ fontWeight: 800, marginTop: "0.5rem" }}>{p.name}</p>
                <p style={{ fontWeight: 700, color: "var(--ft-accent)", marginTop: "0.25rem" }}>{p.price}</p>
                <p style={{ fontSize: "0.83rem", color: "var(--ft-ink-soft)", marginTop: "0.6rem", lineHeight: 1.55 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {fees.combos && fees.combos.length > 0 && (
        <div className="mt-8">
          <p className="ft-label mb-4">Combo packs</p>
          <p style={{ fontSize: "0.83rem", color: "var(--ft-ink-faint)", marginBottom: "1rem" }}>
            Save up to 35% vs buying separately — prices vary by plan.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fees.combos.map((p) => (
              <div key={`${p.tag}-${p.name}`} className="ft-tile" style={{ padding: "1.4rem" }}>
                <p className="ft-label">{p.tag}</p>
                <p style={{ fontWeight: 800, marginTop: "0.5rem" }}>{p.name}</p>
                <p style={{ fontWeight: 700, color: "var(--ft-accent)", marginTop: "0.25rem" }}>{p.price}</p>
                <p style={{ fontSize: "0.83rem", color: "var(--ft-ink-soft)", marginTop: "0.6rem", lineHeight: 1.55 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p style={{ fontSize: "0.8rem", color: "var(--ft-ink-faint)", marginTop: "1.5rem", lineHeight: 1.6 }}>
        {fees.footnote}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
   Counsellor grid
------------------------------------------------------------------- */
export function CounsellorGrid() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COUNSELLORS.map((c) => (
          <div key={c.name} className="ft-tile" style={{ padding: "1.25rem", textAlign: "center" }}>
            <div className={`ft-ph${c.img ? " ft-ph--img" : ""}`} style={{ width: 84, height: 84, borderRadius: "50%", margin: "0 auto 0.9rem", fontSize: "0.55rem" }}>
              {c.img ? <img src={c.img} alt={c.name} loading="lazy" /> : "[photo]"}
            </div>
            <p style={{ fontWeight: 700 }}>{c.name}</p>
            <p style={{ fontSize: "0.8rem", color: "var(--ft-ink-faint)", marginTop: "0.2rem" }}>{c.role}</p>
          </div>
        ))}
      </div>
      <p className="ft-sub" style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.95rem" }}>
        No checkout, no pressure — just a real conversation. Support line:{" "}
        <a href={`tel:${SITE.support.replace(/\s/g, "")}`} style={{ fontWeight: 700, color: "inherit" }}>
          {SITE.support}
        </a>
      </p>
    </div>
  );
}
