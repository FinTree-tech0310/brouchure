import { CardStack, StackCard } from "../components/CardStack";
import {
  AttemptSimulator,
  CompareTable,
  CounsellorGrid,
  ExamDetails,
  FailureGaps,
  FeeGrid,
  LPR,
  type ExamLevel,
  type FeeConfig,
  type SimulatorConfig,
} from "../components/programme";
import { SITE } from "../data/site";
import { LPR_SHARED, MODES_SHARED } from "../data/frm-fm";

export type ProgrammeConfig = {
  key: string;
  name: string;
  full: string;
  heroTitle: string;
  heroImg: string;
  charter: { title: string; body: string[] };
  careersTitle: string;
  careers: { role: string; desc: string }[];
  compare: {
    heads: string[];
    rows: { dim: string; a?: string; b?: string; c?: string }[];
    note: string;
  };
  compareChart?: { label: string; bars: { name: string; value: number; display: string }[] }[];
  simulator: SimulatorConfig;
  exams: ExamLevel[];
  failure: { title: string; body: string; gaps: { title: string; text: string }[] };
  fees: FeeConfig;
};

/* simple horizontal bar chart (duration / cost trajectories) */
function TrajectoryChart({
  chart,
}: {
  chart: { label: string; bars: { name: string; value: number; display: string }[] }[];
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2 mt-10">
      {chart.map((group) => {
        const max = Math.max(...group.bars.map((b) => b.value));
        return (
          <div key={group.label}>
            <p className="ft-label mb-4">{group.label}</p>
            <div className="grid gap-3">
              {group.bars.map((b) => (
                <div key={b.name}>
                  <div className="flex justify-between" style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                    <span style={{ fontWeight: 600 }}>{b.name}</span>
                    <span style={{ color: "var(--ft-ink-faint)" }}>{b.display}</span>
                  </div>
                  <div style={{ height: 10, background: "var(--ft-surface-sunken)", borderRadius: 5 }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${(b.value / max) * 100}%`,
                        background: "var(--ft-accent)",
                        borderRadius: 5,
                        transition: "width 600ms var(--ft-ease-stack)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ProgrammePage({ cfg }: { cfg: ProgrammeConfig }) {
  return (
    <CardStack>
      {/* Card 1 — the credential itself (FinTree does not appear yet) */}
      <StackCard label={`What ${cfg.name} is`}>
        <p className="ft-label ft-reveal">{cfg.full}</p>
        <h1 className="ft-hero ft-reveal" data-delay="1" style={{ margin: "1rem 0 1.5rem", maxWidth: 900 }}>
          {cfg.heroTitle}
        </h1>
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div>
            {cfg.charter.body.map((p, i) => (
              <p key={i} className="ft-sub ft-reveal" data-delay={String(i + 2)} style={{ marginBottom: "1rem", maxWidth: 620 }}>
                {p}
              </p>
            ))}
          </div>
          {/* country-count visual — placeholder world map */}
          <div className="ft-ph ft-ph--img ft-reveal" data-delay="2" style={{ aspectRatio: "16/9", width: "100%" }}>
            <img src={cfg.heroImg} alt={cfg.full} loading="lazy" />
          </div>
        </div>
      </StackCard>

      {/* Card 2 — careers */}
      <StackCard label="Career options" variant="alt">
        <p className="ft-label ft-reveal">Where it leads</p>
        <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 2.5rem" }}>
          {cfg.careersTitle}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cfg.careers.map((c, i) => (
            <div key={c.role} className="ft-tile ft-reveal" data-delay={String((i % 3) + 1)} style={{ padding: "1.5rem" }}>
              <p style={{ fontWeight: 800, fontSize: "1.05rem" }}>{c.role}</p>
              <p style={{ fontSize: "0.88rem", color: "var(--ft-ink-soft)", lineHeight: 1.6, marginTop: "0.5rem" }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </StackCard>

      {/* Card 3 — comparison */}
      <StackCard label="Honest comparison">
        <p className="ft-label ft-reveal">Honestly compared</p>
        <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 2rem" }}>
          {cfg.compare.heads.join(" vs ")}.
        </h2>
        <div className="ft-reveal" data-delay="2">
          <CompareTable heads={cfg.compare.heads} rows={cfg.compare.rows} note={cfg.compare.note} />
          {cfg.compareChart && <TrajectoryChart chart={cfg.compareChart} />}
        </div>
      </StackCard>

      {/* Card 4 — attempt simulator */}
      <StackCard label="Attempt simulator" variant="inverse">
        <div className="text-center" style={{ maxWidth: 680, margin: "0 auto 2.5rem" }}>
          <p className="ft-label ft-reveal">Your journey, mapped</p>
          <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 0.75rem" }}>
            Where do you actually stand?
          </h2>
          <p className="ft-sub ft-reveal" data-delay="2">
            Answer three questions and see a realistic first attempt — not a hopeful one.
          </p>
        </div>
        <div className="ft-reveal" data-delay="2">
          <AttemptSimulator config={cfg.simulator} />
        </div>
      </StackCard>

      {/* Card 5 — exam details */}
      <StackCard label="Exam details">
        <p className="ft-label ft-reveal">Know the terrain</p>
        <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 2rem" }}>
          Exam details.
        </h2>
        <div className="ft-reveal" data-delay="2" style={{ overflowY: "auto" }}>
          <ExamDetails levels={cfg.exams} />
        </div>
      </StackCard>

      {/* Card 6 — why candidates fail */}
      <StackCard label="Why candidates fail" variant="alt">
        <div className="ft-reveal">
          <FailureGaps title={cfg.failure.title} body={cfg.failure.body} gaps={cfg.failure.gaps} />
        </div>
      </StackCard>

      {/* Card 7 — LPR system (FinTree enters here) */}
      <StackCard label="The LPR system">
        <p className="ft-label ft-reveal">The method · FinTree</p>
        <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 0.5rem" }}>
          {LPR_SHARED.title}
        </h2>
        <p className="ft-sub ft-reveal" data-delay="2" style={{ marginBottom: "2.5rem" }}>
          {LPR_SHARED.sub}
        </p>
        <LPR stages={LPR_SHARED.stages} />
        <div className="grid gap-4 md:grid-cols-3 mt-8 ft-reveal" data-delay="3">
          {MODES_SHARED.map((m) => (
            <div key={m.name} style={{ borderTop: "1px solid var(--ft-line)", paddingTop: "1rem" }}>
              <p style={{ fontWeight: 700 }}>
                {m.name} <span style={{ fontWeight: 400, color: "var(--ft-ink-faint)", fontSize: "0.85rem" }}>· {m.where}</span>
              </p>
              <p style={{ fontSize: "0.88rem", color: "var(--ft-ink-soft)", marginTop: "0.3rem", lineHeight: 1.55 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </StackCard>

      {/* Card 8 — packages & fees */}
      <StackCard label="Packages and fees" variant="alt">
        <p className="ft-label ft-reveal">Plans & fees</p>
        <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 0.5rem" }}>
          Pick your level, see your number.
        </h2>
        <p className="ft-sub ft-reveal" data-delay="2" style={{ marginBottom: "2rem", fontSize: "0.95rem" }}>
          Pick your level and exam window — the plans and fees for that attempt. Support: {SITE.support}
        </p>
        <div className="ft-reveal" data-delay="2" style={{ overflowY: "auto", maxHeight: "62vh" }}>
          <FeeGrid fees={cfg.fees} />
        </div>
      </StackCard>

      {/* Card 9 — counsellors */}
      <StackCard label="Talk to a counsellor">
        <p className="ft-label ft-reveal">When you're ready</p>
        <h2 className="ft-title ft-reveal" data-delay="1" style={{ margin: "0.75rem 0 0.75rem" }}>
          Talk to a person.
        </h2>
        <p className="ft-sub ft-reveal" data-delay="2" style={{ maxWidth: 640, marginBottom: "2.5rem" }}>
          Ask them anything — even whether this is the right path for you at all.
        </p>
        <div className="ft-reveal" data-delay="2">
          <CounsellorGrid />
        </div>
      </StackCard>
    </CardStack>
  );
}
