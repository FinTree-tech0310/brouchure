import ProgrammePage from "./ProgrammePage";
import { FRM } from "../data/frm-fm";

export default function FrmPage() {
  return (
    <ProgrammePage
      cfg={{
        key: "frm",
        name: "the FRM designation",
        full: "Financial Risk Manager · GARP",
        heroTitle: "The credential risk teams hire for.",
        heroImg: "/visuals/frm-hero.jpg",
        charter: FRM.charter,
        careersTitle: "Career options after FRM.",
        careers: FRM.careers,
        compare: {
          heads: FRM.compare.heads,
          rows: FRM.compare.rows,
          note: FRM.compare.note,
        },
        simulator: FRM.simulator,
        exams: FRM.exams,
        failure: FRM.failure,
        fees: FRM.fees,
      }}
    />
  );
}
