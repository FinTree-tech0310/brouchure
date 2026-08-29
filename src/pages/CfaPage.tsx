import ProgrammePage from "./ProgrammePage";
import { CFA } from "../data/site";

export default function CfaPage() {
  return (
    <ProgrammePage
      cfg={{
        key: "cfa",
        name: "the CFA charter",
        full: "Chartered Financial Analyst · CFA Institute",
        heroTitle: "The global benchmark for investment professionals.",
        heroImg: "/visuals/cfa-hero.jpg",
        charter: CFA.charter,
        careersTitle: "Career options after CFA.",
        careers: CFA.careers,
        compare: {
          heads: ["CFA", "CA", "MBA (Finance)"],
          rows: CFA.compare.rows.map((r) => ({ dim: r.dim, a: r.cfa, b: r.ca, c: r.mba })),
          note: CFA.compare.note,
        },
        compareChart: [
          {
            label: "Typical duration (years · range midpoints, approx.)",
            bars: [
              { name: "CFA", value: 3, display: "~2–4 yrs" },
              { name: "CA", value: 4.75, display: "~4.5–5 yrs" },
              { name: "MBA", value: 3, display: "2 yrs + prep" },
            ],
          },
          {
            label: "Approx all-in cost (₹ lakh · range midpoints, approx.)",
            bars: [
              { name: "CFA", value: 4.75, display: "~₹4–5.5L" },
              { name: "CA", value: 2.5, display: "~₹1–4L + articleship" },
              { name: "MBA", value: 17.5, display: "~₹5–30L + salary" },
            ],
          },
        ],
        simulator: CFA.simulator,
        exams: CFA.exams,
        failure: CFA.failure,
        fees: CFA.fees,
      }}
    />
  );
}
