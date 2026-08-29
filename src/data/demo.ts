/* ==========================================================================
   DEMO LECTURES PAGE — content
   All lecture lists, juice-note pages and platform previews are DEMO
   placeholders. Swap these arrays with the real material when supplied —
   no component changes needed.
   ========================================================================== */

export type DemoJuicePage = {
  title: string;
  points: string[];
  formula?: string;
};

export type DemoVideo = {
  title: string;
  yt: string; /* YouTube video id */
};

export type DemoJuicePdf = {
  title: string;    /* e.g. "Quants LM 1" */
  images: string[]; /* scanned note pages, in order */
};

export type DemoShots = {
  doubt?: string[]; /* Q&A / doubt forum screenshots */
  lms?: string;     /* LMS screenshot */
  test?: string[];  /* quiz + mock test screenshots */
};

export type DemoSection = {
  key: string;
  tab: string;      /* label shown in the tab bar */
  heading: string;  /* full name shown in the section chip */
  lectures: string[]; /* demo lecture topics (used when no videos) */
  videos?: DemoVideo[]; /* real YouTube demo lectures — when present, tiles play */
  juice: DemoJuicePage[]; /* sample juice-note pages (flip through) */
  juicePages?: DemoJuicePdf; /* real Juice Notes sample — when present, pages flip as images */
  shots?: DemoShots; /* real platform screenshots — when present, replace the mocks */
};

export const DEMO_SECTIONS: DemoSection[] = [
  {
    key: "cfa-l1",
    tab: "CFA L1",
    heading: "CFA Level I",
    lectures: [
      "Quantitative Methods",
      "Economics",
      "Financial Statement Analysis",
      "Corporate Issuers",
      "Equity Investments",
      "Fixed Income",
      "Derivatives",
      "Alternative Investments",
      "Ethical & Professional Standards",
    ],
    videos: [
      { title: "Normal Distribution (13 mins) · Quantitative Methods", yt: "uboV9HEj2gk" },
      { title: "Demand for Money (9 mins) · Economics", yt: "0kiA1YJpKzA" },
      { title: "FCFF (33 mins) · Financial Statement Analysis", yt: "C5dRcWtmgyM" },
      { title: "Cash Conversion Cycle (21 mins) · Corporate Issuers", yt: "7XzV6xgenug" },
      { title: "Equity Valuation (35 mins) · Equity Investments", yt: "6AUy8rJvytA" },
      { title: "Mod Duration (35 mins) · Fixed Income", yt: "XhYaEsbSuCk" },
      { title: "Put Call Parity (23 mins) · Derivatives", yt: "v6tq01bOE28" },
      { title: "Hedge Funds (29 mins) · Alternative Investments", yt: "RWGw9Zy5s2I" },
      { title: "Efficient Frontier (43 mins) · Portfolio Management", yt: "UZJ61gIWHjY" },
    ],
    juice: [
      {
        title: "Time Value of Money",
        points: [
          "Every rupee has a timestamp — discount it before you compare it.",
          "Annuity first, perpetuity second: the exam loves the gap between them.",
          "NPV vs IRR — when they disagree, NPV wins.",
        ],
        formula: "PV = FV ÷ (1 + r)ⁿ",
      },
      {
        title: "Ethics quick map",
        points: [
          "Standard first, sub-clause second — never memorise clauses cold.",
          "The 'reasonable basis' question appears in almost every vignette.",
          "When in doubt, the stricter of law vs Standards applies.",
        ],
      },
      {
        title: "FRA ratios that matter",
        points: [
          "ROE decomposes into margin × turnover × leverage (DuPont).",
          "Current ratio vs quick ratio — inventory is the difference.",
          "Capitalising vs expensing shifts everything: EBIT, CFO, leverage.",
        ],
        formula: "ROE = Net income ÷ Average equity",
      },
    ],
    juicePages: {
      title: "Quants LM 1",
      images: Array.from({ length: 8 }, (_, i) => `/juice/cfa-l1/page-${String(i + 1).padStart(2, "0")}.jpg`),
    },
    shots: {
      doubt: ["/platform/cfa-l1/doubt-1.jpg", "/platform/cfa-l1/doubt-2.jpg", "/platform/cfa-l1/doubt-3.jpg"],
      lms: "/platform/cfa-l1/lms.jpg",
      test: ["/platform/cfa-l1/quiz.jpg", "/platform/cfa-l1/mock.jpg"],
    },
  },
  {
    key: "cfa-l2",
    tab: "CFA L2",
    heading: "CFA Level II",
    lectures: [
      "Equity Valuation",
      "Financial Statement Analysis",
      "Fixed Income Valuation",
      "Derivatives",
      "Corporate Issuers",
      "Quantitative Methods",
      "Economics",
      "Alternative Investments",
      "Ethics in Practice",
    ],
    videos: [
      { title: "ARCH and GARCH (38 mins) · Quantitative Methods", yt: "7K4UOTuE95w" },
      { title: "Triangular Arbitrage (17 mins) · Economics", yt: "jyjrPXDNIh8" },
      { title: "ESOPs (17 mins) · Financial Statement Analysis", yt: "a4rBo2e1z6k" },
      { title: "Cost of Capital: Advance Topics (30 mins) · Corporate Issuers", yt: "bhy5MEGY69E" },
      { title: "Market Based Valuation (30 mins) · Equity Investments", yt: "JklFfDHaw4I" },
      { title: "Credit Analysis Model (24 mins) · Fixed Income", yt: "HN_F5lEUTd0" },
      { title: "Black and Scholes (34 mins) · Derivatives", yt: "knXUCzXJPhg" },
      { title: "Hedge Fund Strategies (24 mins) · Alternative Investments", yt: "uxd9GU5L1i4" },
      { title: "Analysis of Active Portfolio Management (22 mins) · Portfolio Management", yt: "zNg8oBqI5Bw" },
    ],
    juice: [
      {
        title: "Equity valuation shortcuts",
        points: [
          "DDM, FCF, residual income — pick the model from the story, not habit.",
          "Growth lives in retention × ROE; everything else is noise.",
          "Terminal value is 60–80% of the answer. Sanity-check it first.",
        ],
        formula: "V₀ = D₁ ÷ (r − g)",
      },
      {
        title: "FCFF vs FCFE",
        points: [
          "FCFF discounts at WACC, FCFE at cost of equity — never mix.",
          "Start from EBIT for FCFF, net income for FCFE.",
          "Net borrowing only appears in FCFE.",
        ],
      },
      {
        title: "Derivatives payoff sketches",
        points: [
          "Draw the payoff before touching the formula.",
          "Put–call parity is the one identity that solves half the item set.",
          "Forwards have symmetric payoff; options don't.",
        ],
        formula: "c + PV(X) = p + S₀",
      },
    ],
    juicePages: {
      title: "Ethics LM 1",
      images: Array.from({ length: 7 }, (_, i) => `/juice/cfa-l2/page-${String(i + 1).padStart(2, "0")}.jpg`),
    },
    shots: {
      doubt: ["/platform/cfa-l2/doubt-1.jpg", "/platform/cfa-l2/doubt-2.jpg"],
      lms: "/platform/cfa-l2/lms.jpg",
      test: ["/platform/cfa-l2/quiz.jpg", "/platform/cfa-l2/mock.jpg"],
    },
  },
  {
    key: "cfa-l3",
    tab: "CFA L3",
    heading: "CFA Level III",
    lectures: [
      "Asset Allocation",
      "Portfolio Construction",
      "Private Wealth Management",
      "Private Markets",
      "Performance Measurement",
      "Behavioural Finance",
      "Risk Management",
      "Derivatives & Currency",
      "Ethics & GIPS",
    ],
    videos: [
      { title: "Type I and Type II Errors in Manager Hiring and Continuation Decisions (19 mins)", yt: "YMi9qlyNpkk" },
      { title: "Application of Economic Growth Trend Analysis to the Formulation of CMEs (20 mins)", yt: "NUZKzfNlIx0" },
      { title: "Importance of Liquidity Planning in Allocating to AIs (16 mins)", yt: "A36TGkxgOM0" },
      { title: "Option Strategies (14 mins)", yt: "YS4SOUE-OZ4" },
      { title: "Active Investment Strategies — Factor Based Strategies (15 mins)", yt: "i5pdFSmZ-fk" },
      { title: "Private Equity Strategies (11 mins)", yt: "vlSxa85WlxE" },
      { title: "The Private Wealth Management Industry Part II (13 mins)", yt: "B4OfTAlbJ0w" },
    ],
    juice: [
      {
        title: "IPS in one page",
        points: [
          "Return objective = spending need + inflation, stated before risk.",
          "Willingness vs ability — the lower of the two caps the risk budget.",
          "Constraints: time, tax, legal, liquidity, unique. All five, every time.",
        ],
      },
      {
        title: "Asset allocation frameworks",
        points: [
          "Asset-only, liability-relative, goals-based — know who each serves.",
          "Mean-variance output is unstable; resampling tames it.",
          "Corner portfolios are the exam's favourite shortcut.",
        ],
        formula: "E(Rₚ) = Σ wᵢ · E(Rᵢ)",
      },
      {
        title: "Performance & GIPS cues",
        points: [
          "Time-weighted for the manager, money-weighted for the client.",
          "GIPS: composite construction is where points are won and lost.",
          "Attribution = allocation + selection + interaction.",
        ],
      },
    ],
    juicePages: {
      title: "Performance Measurement",
      images: Array.from({ length: 17 }, (_, i) => `/juice/cfa-l3/page-${String(i + 1).padStart(2, "0")}.jpg`),
    },
    shots: {
      doubt: ["/platform/cfa-l3/doubt-1.jpg"],
      lms: "/platform/cfa-l3/lms.jpg",
      test: ["/platform/cfa-l3/mock.jpg"],
    },
  },
  {
    key: "frm",
    tab: "FRM",
    heading: "FRM (Part I & II)",
    lectures: [
      "Foundations of Risk Management",
      "Quantitative Analysis",
      "Financial Markets & Products",
      "Valuation & Risk Models",
      "Market Risk",
      "Credit Risk",
      "Operational Risk",
      "Liquidity Risk",
      "Investment Management",
    ],
    juice: [
      {
        title: "VaR in one page",
        points: [
          "VaR answers: 'how bad can it get on a normal-bad day?'",
          "Parametric, historical, Monte Carlo — same question, three lenses.",
          "Expected shortfall picks up where VaR stops looking.",
        ],
        formula: "VaR = μ − z · σ",
      },
      {
        title: "Credit risk drivers",
        points: [
          "PD × LGD × EAD — every credit model is a variation on this.",
          "Rating migrations matter more than defaults in a given year.",
          "Correlation is the hidden lever in portfolio credit risk.",
        ],
      },
      {
        title: "Operational risk buckets",
        points: [
          "Internal fraud, external fraud, process failures — know the taxonomy.",
          "RISK-ADJUSTED capital starts with clean loss data.",
          "Scenario analysis fills the tail where data runs out.",
        ],
      },
    ],
    juicePages: {
      title: "Measures of Financial Risk",
      images: Array.from({ length: 3 }, (_, i) => `/juice/frm/page-${String(i + 1).padStart(2, "0")}.jpg`),
    },
    shots: {
      doubt: ["/platform/frm/doubt-1.jpg"],
      test: ["/platform/frm/quiz.jpg", "/platform/frm/mock.jpg"],
    },
  },
  {
    key: "fm",
    tab: "FM",
    heading: "Financial Modelling",
    lectures: [
      "Excel Foundations",
      "Reading Financial Statements",
      "Building a 3-Statement Model",
      "DCF Valuation",
      "Comparable Companies",
      "Scenario & Sensitivity Analysis",
      "Charts & Dashboards",
      "Merger Basics",
      "Capstone Project",
    ],
    videos: [
      { title: "Financial Model of RateGain — Day 1 (2 h 23 mins)", yt: "fPw4GhKrbQU" },
    ],
    juice: [
      {
        title: "DCF checklist",
        points: [
          "Forecast FCF first, WACC second, terminal value last.",
          "One driver per assumption cell — no hardcoding inside formulas.",
          "Sanity-check: implied multiples should agree with the comps.",
        ],
        formula: "EV = Σ FCFₜ ÷ (1 + WACC)ᵗ",
      },
      {
        title: "Comps in five steps",
        points: [
          "Screen peers → spread financials → normalise → multiply → conclude.",
          "EV/EBITDA for capital-structure-neutral comparison.",
          "Outliers get excluded with a written reason, never silently.",
        ],
      },
      {
        title: "Model hygiene rules",
        points: [
          "Blue inputs, black formulas, green cross-sheet links.",
          "One timeline row, every sheet, same columns.",
          "Checks page: balance sheet balances or nothing ships.",
        ],
      },
    ],
    juicePages: {
      title: "Monitoring Liquidity",
      images: Array.from({ length: 8 }, (_, i) => `/juice/fm/page-${String(i + 1).padStart(2, "0")}.jpg`),
    },
  },
];
