/* ==========================================================================
   FRM + FINANCIAL MODELLING content — same structure as CFA, content swapped.
   ========================================================================== */

export const FRM = {
  charter: {
    title: "What the FRM designation is",
    body: [
      "The Financial Risk Manager (FRM)®, from GARP, is the global credential for identifying, measuring and managing risk — market, credit, operational, liquidity.",
      "Two exams — Part I and Part II — plus two years of relevant work. Respected across banks, fintechs, consulting and treasury worldwide.",
    ],
  },
  careers: [
    { role: "Credit Risk Analyst", desc: "Price the risk that borrowers default." },
    { role: "Risk Manager", desc: "Own a firm's risk framework — limits, monitoring, reporting." },
    { role: "Treasury Manager", desc: "Manage liquidity, funding and market exposures." },
    { role: "Compliance Manager", desc: "Keep the firm inside the lines — Basel, SEBI, policy." },
    { role: "Business Analyst", desc: "Turn risk and regulatory needs into working systems." },
    { role: "Chief Risk Officer", desc: "The senior seat: risk appetite, governance, board reporting." },
  ],
  compare: {
    note: "Presented evenly — the right credential depends on the career you want. FRM figures marked ~ are approximate; confirm current fees with GARP.",
    heads: ["FRM", "CFA", "MBA (Finance)"],
    rows: [
      { dim: "Best for", a: "Risk careers in banks, fintechs, consulting, treasury — the specialist credential", b: "Investment roles — equity research, portfolio management, wealth", c: "General management — finance depth varies by college" },
      { dim: "The path", a: "2 exams, self-paced — no degree required to register", b: "3 exams, self-paced (~300 hrs/level)", c: "Entrance prep + 2-year full-time degree" },
      { dim: "Typical duration", a: "~1–2 years for both parts, at your pace", b: "~2–4 years, at your pace", c: "2 years full-time, plus prep" },
      { dim: "Approx cost (IN)", a: "~₹1–1.5 lakh all-in [placeholder — confirm current GARP fees]", b: "~₹4–5.5 lakh all-in", c: "~₹5–30 lakh, plus foregone salary" },
      { dim: "Typical IN pay", a: "[placeholder — confirm]", b: "Charterholder ~₹20–40 LPA in core finance", c: "Top-20 B-schools ~₹25–36 LPA; wider market trails" },
    ],
  },
  simulator: {
    levels: ["Part I", "Part II"],
    personas: [
      { key: "student", label: "Student", sub: "studying full-time or alongside college" },
      { key: "working", label: "Working professional", sub: "fitting study around a job" },
    ],
    hours: ["2–4", "4–6", "6–8"],
    hoursLabel: { "2–4": "2–4 hrs/day", "4–6": "4–6 hrs/day", "6–8": "6–8 hrs/day" } as Record<string, string>,
    /* FRM windows are May / Aug / Nov; typical prep is 4–6 months per part */
    attemptByLevel: {
      "Part I": { "6–8": "May 2027", "4–6": "August 2027", "2–4": "November 2027" },
      "Part II": { "6–8": "May 2027", "4–6": "August 2027", "2–4": "November 2027" },
    } as Record<string, Record<string, string>>,
  },
  exams: [
    {
      level: "Part I",
      intro:
        "The tools of risk: foundations of risk management, quantitative analysis, financial markets and products, valuation and risk models. Typical prep: 4–6 months. No degree required to register.",
      structure: [
        { k: "Format", v: "Computer-based · 100 MCQs" },
        { k: "Duration", v: "4 hours" },
        { k: "Exam windows", v: "May · Aug · Nov" },
        { k: "Registration fee", v: "[placeholder — see garp.org]" },
      ],
      note: "Passport or government-issued driver's licence required. Permitted calculators: TI BA II Plus / Professional, HP 12C.",
      weights: [
        ["Foundations of Risk Management", "20%"],
        ["Quantitative Analysis", "20%"],
        ["Financial Markets and Products", "30%"],
        ["Valuation and Risk Models", "30%"],
      ] as [string, string][],
      weightsTitle: "The four topics · exam weightage",
    },
    {
      level: "Part II",
      intro:
        "From tools to practice: market, credit, operational and liquidity risk, plus investment management and current issues. Pass Part II within 4 years of Part I, then document 2 years of relevant work to earn the designation.",
      structure: [
        { k: "Format", v: "Computer-based · 80 MCQs" },
        { k: "Duration", v: "4 hours" },
        { k: "Exam windows", v: "May · Aug · Nov" },
        { k: "Registration fee", v: "[placeholder — see garp.org]" },
      ],
      note: "Scholarships exist exclusively for students and faculty in GARP's Academic Partner Program. FinTree can't grant or influence scholarships.",
      weights: [
        ["Market Risk Measurement & Management", "~20%"],
        ["Credit Risk Measurement & Management", "~20%"],
        ["Operational Risk & Resilience", "~20%"],
        ["Liquidity & Treasury Risk", "~15%"],
        ["Risk Management & Investment Management", "~15%"],
        ["Current Issues in Financial Markets", "~10%"],
      ] as [string, string][],
      weightsTitle: "The six topics · exam weightage",
    },
  ],
  failure: {
    title: "Why capable people still fail FRM.",
    body: "The syllabus is wide and the quant is real — but most failures trace back to the same three quiet gaps. Name them, and they stop being fatal.",
    gaps: [
      { title: "Concepts", text: "Formulas memorised without the intuition underneath." },
      { title: "Practice", text: "Question banks opened weeks before the exam, not months." },
      { title: "Strategy", text: "No plan for 100 questions in 4 hours — pacing never rehearsed." },
    ],
  },
  fees: {
    note: "No Classroom format for FRM — Live School, Home School and Essential. Starts at ₹30,000.",
    plans: ["Live School", "Home School", "Essential"],
    levels: [
      {
        level: "Part I",
        windows: [
          { window: "Nov 2026", prices: ["₹36,000", "₹33,000", "₹30,000"] },
          { window: "May 2027", prices: ["₹42,000", "₹39,000", "₹36,000"] },
          { window: "Aug 2027", prices: ["₹45,000", "₹42,000", "₹39,000"] },
          { window: "Nov 2027", prices: ["₹48,000", "₹45,000", "₹42,000"] },
        ],
      },
      {
        level: "Part II",
        plans: ["Home School"],
        windows: [
          { window: "Nov 2026", prices: ["₹39,000"] },
          { window: "May 2027", prices: ["₹45,000"] },
          { window: "Aug 2027", prices: ["₹48,000"] },
          { window: "Nov 2027", prices: ["₹51,000"] },
        ],
        note: "Part II is offered in the self-paced Home School format.",
      },
    ],
    packs: [],
    footnote: "Combo packs for Part I + II are available — ask a counsellor.",
  },
};

export const FM = {
  charter: {
    title: "What financial modelling is",
    body: [
      "Financial modelling turns a company's historicals and assumptions into a forecast that drives decisions — three statements connected, scenarios built, value arrived at.",
      "At FinTree you build from a blank sheet — real listed-company data, ending in a full equity research write-up. The skills research, IB, corporate finance and FP&A teams actually test for.",
    ],
  },
  careers: [
    { role: "Equity Research", desc: "Build the model behind every buy/sell note — forecasts, valuation, thesis." },
    { role: "Investment Banking", desc: "Model mergers, acquisitions and capital raises under deadline." },
    { role: "Corporate Finance", desc: "Budget, forecast and evaluate projects inside a company." },
    { role: "FP&A", desc: "Own the planning cycle — rolling forecasts, variance analysis, board packs." },
    { role: "Private Equity", desc: "Stress-test buyout returns with LBO and scenario models." },
    { role: "Credit Analysis", desc: "Model repayment capacity — cash flows under downside cases." },
  ],
  compare: {
    note: "Financial Modelling is a skill course, not a credential — it pairs with whatever path you're on.",
    heads: ["Financial Modelling", "CFA", "MBA (Finance)"],
    rows: [
      { dim: "Best for", a: "Job-ready modelling skill — the practical work finance roles test for", b: "The global investment credential", c: "General management & leadership" },
      { dim: "The path", a: "One course, self-paced — 6 months' access, real-company projects", b: "3 exams over ~2–4 years", c: "2-year full-time degree" },
      { dim: "Typical duration", a: "~4–6 months alongside college or work", b: "~2–4 years", c: "2 years + entrance prep" },
      { dim: "Approx cost (IN)", a: "from ₹36,000", b: "~₹4–5.5 lakh all-in", c: "~₹5–30 lakh + foregone salary" },
      { dim: "Outcome", a: "FinTree certificate + placement-cell assistance", b: "The CFA charter", c: "A management degree" },
    ],
  },
  simulator: {
    levels: ["Standard track", "With CFA prep"],
    personas: [
      { key: "student", label: "Student", sub: "studying full-time or alongside college" },
      { key: "working", label: "Working professional", sub: "fitting learning around a job" },
    ],
    hours: ["2–4", "4–6", "6–8"],
    hoursLabel: { "2–4": "2–4 hrs/day", "4–6": "4–6 hrs/day", "6–8": "6–8 hrs/day" } as Record<string, string>,
    /* pacing within the 6-month access window */
    attemptByLevel: {
      "Standard track": { "6–8": "~2 months to completion", "4–6": "~3–4 months to completion", "2–4": "~5–6 months to completion" },
      "With CFA prep": { "6–8": "~3 months alongside CFA", "4–6": "~4–5 months alongside CFA", "2–4": "~6 months alongside CFA" },
    } as Record<string, Record<string, string>>,
    resultLabel: "A realistic completion window",
  },
  exams: [
    {
      level: "Curriculum",
      intro:
        "Four modules, from picking the company to defending the thesis. Pre-requisite: basic Excel (formulas, lookups, PivotTables). New to finance entirely? Start with the free Level Zero™ program.",
      structure: [
        { k: "Access", v: "6 months · self-paced videos" },
        { k: "Projects", v: "Listed-company, real data" },
        { k: "Certificate", v: "FinTree certificate on clearing the exam" },
        { k: "Placement", v: "Assistance via the FinTree placement cell" },
      ],
      note: "Every number is a decision, not a pre-filled template — you work with real data from publicly listed companies.",
      weights: [
        ["01 · Art of Stock Picking", "screen & select"],
        ["02 · Model Infrastructure", "build the engine"],
        ["03 · Forecasting", "drivers & schedules"],
        ["04 · Valuation & Report Writing", "DCF, comps, thesis"],
      ] as [string, string][],
      weightsTitle: "The four modules",
    },
    {
      level: "The Examination",
      intro:
        "The exam mirrors the job: submit a complete model, then defend it. Scores come back privately with Loom video feedback — iterate fast.",
      structure: [
        { k: "Exam Part I", v: "Full model — 3 statements, schedules, valuation, scenarios, thesis" },
        { k: "Exam Part II", v: "Private scoring with Loom feedback — iterate and resubmit" },
      ],
      note: "The output is conversation-ready: interviewers can open your model and you can walk them through every assumption.",
      weights: [] as [string, string][],
      weightsTitle: "",
    },
  ],
  failure: {
    title: "Why most modelling courses don't stick.",
    body: "Plenty of people 'know' modelling and still freeze in front of a blank sheet. The gaps are predictable:",
    gaps: [
      { title: "Templates", text: "Pre-filled files teach where numbers go, never why they move." },
      { title: "Toy data", text: "Cleaned-up examples collapse the moment real annual reports arrive." },
      { title: "No feedback", text: "A model nobody reviews is a mistake you keep practising." },
    ],
  },
  fees: {
    note: "Financial Modelling is a self-paced course with 6 months' access.",
    plans: ["Home School"],
    levels: [
      {
        level: "Financial Modelling",
        windows: [{ window: "Rolling admission", prices: ["₹36,000"] }],
      },
    ],
    packs: [],
    footnote:
      "Incl. GST. Financial Modelling is included free with CFA combo packs.",
  },
};

/* LPR is shared across programmes */
export const LPR_SHARED = {
  title: "How FinTree actually helps: the LPR method.",
  sub: "Three gaps. Three deliberate answers — a sequence, not a slogan.",
  stages: [
    { key: "L", title: "Learn.", sub: "concept clarity first", text: "You understand why before you ever memorise what." },
    { key: "P", title: "Practice.", sub: "pressure, rehearsed", text: "Cases, drills, weekly and mock tests — pressure meets prepared hands." },
    { key: "R", title: "Revise.", sub: "until it holds", text: "A revision system and mentors that stay until it holds." },
  ],
};

export const MODES_SHARED = [
  { name: "Classroom", where: "Pune", desc: "For those who learn best in the room." },
  { name: "Live School", where: "Live, from anywhere", desc: "Live classes from anywhere — nothing pre-recorded." },
  { name: "Home School", where: "Fully self-paced", desc: "For the disciplined and the time-tight." },
];
