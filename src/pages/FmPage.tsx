import ProgrammePage from "./ProgrammePage";
import { FM } from "../data/frm-fm";

export default function FmPage() {
  return (
    <ProgrammePage
      cfg={{
        key: "fm",
        name: "financial modelling",
        full: "Financial Modelling · FinTree certification",
        heroTitle: "Not a template. A thinking model.",
        heroImg: "/visuals/fm-hero.jpg",
        charter: FM.charter,
        careersTitle: "Where modelling skills take you.",
        careers: FM.careers,
        compare: {
          heads: FM.compare.heads,
          rows: FM.compare.rows,
          note: FM.compare.note,
        },
        simulator: FM.simulator,
        exams: FM.exams,
        failure: FM.failure,
        fees: FM.fees,
      }}
    />
  );
}
