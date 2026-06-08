import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
const palettes = [
  {
    id: "cv",
    name: "CV / Career",
    formula: "Calm + Career + Job Seeker + Resume Help",
    atmosphere: "Non-judgmental, clear, responsible, trustworthy.",
    colors: {
      bg: "#101923",
      surface: "#172331",
      text: "#ffffff",
      muted: "#cbd5e1",
      primary: "#7dd3fc",
      secondary: "#14b8a6",
      accent: "#67e8f9",
      button: "#14b8a6",
    },
  },
  {
    id: "healthcare",
    name: "Healthcare",
    formula: "Supportive + Hospital + Affordable + Services",
    atmosphere: "Safe, clean, human, caring, not financially aggressive.",
    colors: {
      bg: "#f7fbfc",
      surface: "#ffffff",
      text: "#17313b",
      muted: "#607783",
      primary: "#8ecae6",
      secondary: "#74c69d",
      accent: "#d8f3dc",
      button: "#2a9d8f",
    },
  },
  {
    id: "luxury",
    name: "Luxury",
    formula: "Premium + Executive + High Status + Exclusive Service",
    atmosphere: "Controlled, expensive, calm authority, old-money feel.",
    colors: {
      bg: "#0b0f14",
      surface: "#141a22",
      text: "#f8fafc",
      muted: "#a8b0bb",
      primary: "#d6b25e",
      secondary: "#334155",
      accent: "#f5e6b8",
      button: "#d6b25e",
    },
  },
  {
    id: "gaming",
    name: "Gaming",
    formula: "Excited + Game + Competitive User + Reward System",
    atmosphere: "Energy, challenge, action, movement, reward.",
    colors: {
      bg: "#0f1020",
      surface: "#191b35",
      text: "#ffffff",
      muted: "#c4c7e7",
      primary: "#8b5cf6",
      secondary: "#06b6d4",
      accent: "#f97316",
      button: "#8b5cf6",
    },
  },
  {
    id: "finance",
    name: "Finance",
    formula: "Secure + Finance + Risk-Aware User + Money Control",
    atmosphere: "Stable, responsible, serious, controlled.",
    colors: {
      bg: "#0f172a",
      surface: "#162033",
      text: "#ffffff",
      muted: "#cbd5e1",
      primary: "#38bdf8",
      secondary: "#22c55e",
      accent: "#94a3b8",
      button: "#2563eb",
    },
  },
  {
    id: "education",
    name: "Education",
    formula: "Curious + Learning + Beginner Student + Knowledge Platform",
    atmosphere: "Clear, encouraging, safe to fail, mentally open.",
    colors: {
      bg: "#f8fbff",
      surface: "#ffffff",
      text: "#172033",
      muted: "#64748b",
      primary: "#60a5fa",
      secondary: "#22c55e",
      accent: "#dbeafe",
      button: "#2563eb",
    },
  },
  {
    id: "wellness",
    name: "Wellness / Spa",
    formula: "Relaxed + Wellness + Overloaded User + Recovery Service",
    atmosphere: "Soft, peaceful, natural, emotionally light.",
    colors: {
      bg: "#f5fbf8",
      surface: "#ffffff",
      text: "#1f2f2b",
      muted: "#6b7f78",
      primary: "#8dd6c2",
      secondary: "#a7c957",
      accent: "#e7f6ef",
      button: "#2d8f7b",
    },
  },
  {
    id: "food",
    name: "Food / Restaurant",
    formula: "Warm + Food + Hungry Customer + Comfort Experience",
    atmosphere: "Appetizing, friendly, warm, inviting.",
    colors: {
      bg: "#fff8ed",
      surface: "#ffffff",
      text: "#2b1d14",
      muted: "#806b5a",
      primary: "#f59e0b",
      secondary: "#ef4444",
      accent: "#fed7aa",
      button: "#c2410c",
    },
  },
  {
    id: "fitness",
    name: "Fitness",
    formula: "Driven + Fitness + Goal-Oriented User + Transformation",
    atmosphere: "Energetic, bold, disciplined, action-focused.",
    colors: {
      bg: "#111827",
      surface: "#1f2937",
      text: "#ffffff",
      muted: "#cbd5e1",
      primary: "#f97316",
      secondary: "#ef4444",
      accent: "#fde68a",
      button: "#f97316",
    },
  },
  {
    id: "construction",
    name: "Construction",
    formula: "Reliable + Construction + Practical Buyer + Building Service",
    atmosphere: "Strong, grounded, industrial, dependable.",
    colors: {
      bg: "#111827",
      surface: "#1f2937",
      text: "#ffffff",
      muted: "#cbd5e1",
      primary: "#f59e0b",
      secondary: "#64748b",
      accent: "#fef3c7",
      button: "#d97706",
    },
  },
  {
    id: "legal",
    name: "Legal",
    formula: "Serious + Law + High-Risk Client + Professional Advice",
    atmosphere: "Authority, structure, trust, controlled seriousness.",
    colors: {
      bg: "#0f172a",
      surface: "#172033",
      text: "#ffffff",
      muted: "#cbd5e1",
      primary: "#94a3b8",
      secondary: "#b08968",
      accent: "#e5e7eb",
      button: "#475569",
    },
  },
  {
    id: "realestate",
    name: "Real Estate",
    formula: "Aspirational + Property + Buyer/Seller + Trusted Deal",
    atmosphere: "Stable, premium, clean, life-upgrade feeling.",
    colors: {
      bg: "#f8fafc",
      surface: "#ffffff",
      text: "#1e293b",
      muted: "#64748b",
      primary: "#0f766e",
      secondary: "#c8a45d",
      accent: "#ecfdf5",
      button: "#0f766e",
    },
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    formula: "Convenient + Retail + Browsing Customer + Fast Purchase",
    atmosphere: "Clear, friendly, quick, low-friction.",
    colors: {
      bg: "#f8fafc",
      surface: "#ffffff",
      text: "#172033",
      muted: "#64748b",
      primary: "#3b82f6",
      secondary: "#f97316",
      accent: "#dbeafe",
      button: "#2563eb",
    },
  },
  {
    id: "saas",
    name: "SaaS / Tech",
    formula: "Efficient + SaaS + Busy Operator + Productivity Tool",
    atmosphere: "Modern, clean, logical, scalable.",
    colors: {
      bg: "#0b1220",
      surface: "#111827",
      text: "#ffffff",
      muted: "#cbd5e1",
      primary: "#38bdf8",
      secondary: "#14b8a6",
      accent: "#a78bfa",
      button: "#0ea5e9",
    },
  },
  {
    id: "ai",
    name: "AI Product",
    formula: "Futuristic + AI + Curious User + Intelligent Automation",
    atmosphere: "Smart, advanced, mysterious, high-tech.",
    colors: {
      bg: "#090b16",
      surface: "#141827",
      text: "#ffffff",
      muted: "#c4c7d9",
      primary: "#8b5cf6",
      secondary: "#06b6d4",
      accent: "#c084fc",
      button: "#7c3aed",
    },
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    formula: "Protected + Security + Risk-Aware Business + Defense System",
    atmosphere: "Secure, sharp, serious, controlled threat protection.",
    colors: {
      bg: "#050b12",
      surface: "#0f172a",
      text: "#ffffff",
      muted: "#94a3b8",
      primary: "#22c55e",
      secondary: "#38bdf8",
      accent: "#14532d",
      button: "#16a34a",
    },
  },
  {
    id: "beauty",
    name: "Beauty / Cosmetics",
    formula: "Elegant + Beauty + Self-Image User + Personal Enhancement",
    atmosphere: "Soft, premium, expressive, confident.",
    colors: {
      bg: "#fff7fb",
      surface: "#ffffff",
      text: "#2b1723",
      muted: "#8a6b7b",
      primary: "#f0a6ca",
      secondary: "#b76e79",
      accent: "#fde2f3",
      button: "#be5b8a",
    },
  },
  {
    id: "eco",
    name: "Eco / Sustainability",
    formula: "Responsible + Sustainability + Conscious Buyer + Ethical Product",
    atmosphere: "Natural, honest, grounded, clean.",
    colors: {
      bg: "#f6fbf4",
      surface: "#ffffff",
      text: "#1f2f24",
      muted: "#647464",
      primary: "#65a30d",
      secondary: "#2f855a",
      accent: "#e7f5df",
      button: "#3f7d20",
    },
  },
  {
    id: "travel",
    name: "Travel",
    formula: "Inspired + Travel + Experience Seeker + Escape/Adventure",
    atmosphere: "Open, fresh, premium, emotionally freeing.",
    colors: {
      bg: "#f5fbff",
      surface: "#ffffff",
      text: "#163040",
      muted: "#607783",
      primary: "#38bdf8",
      secondary: "#f59e0b",
      accent: "#dff6ff",
      button: "#0284c7",
    },
  },
  {
    id: "creator",
    name: "Creator / Portfolio",
    formula: "Expressive + Creative + Personal Brand + Showcase",
    atmosphere: "Individual, stylish, memorable, artistic.",
    colors: {
      bg: "#111018",
      surface: "#1c1a27",
      text: "#ffffff",
      muted: "#cfc9dc",
      primary: "#ec4899",
      secondary: "#8b5cf6",
      accent: "#facc15",
      button: "#ec4899",
    },
  },
  {
    id: "nonprofit",
    name: "Non-Profit",
    formula: "Compassionate + Community + Supporter + Social Impact",
    atmosphere: "Human, warm, trustworthy, meaningful.",
    colors: {
      bg: "#fbfaf7",
      surface: "#ffffff",
      text: "#24312f",
      muted: "#6b7b78",
      primary: "#2a9d8f",
      secondary: "#e9c46a",
      accent: "#e6f4f1",
      button: "#23867a",
    },
  },
];

const categories = [
  { id: "all", name: "All" },
  { id: "career", name: "Career" },
  { id: "health", name: "Health" },
  { id: "business", name: "Business" },
  { id: "tech", name: "Tech" },
  { id: "lifestyle", name: "Lifestyle" },
];

const paletteCategory = {
  cv: "career",
  education: "career",

  healthcare: "health",
  wellness: "health",
  beauty: "health",

  finance: "business",
  luxury: "business",
  legal: "business",
  realestate: "business",
  ecommerce: "business",
  construction: "business",
  nonprofit: "business",

  saas: "tech",
  ai: "tech",
  cybersecurity: "tech",
  gaming: "tech",

  food: "lifestyle",
  fitness: "lifestyle",
  eco: "lifestyle",
  travel: "lifestyle",
  creator: "lifestyle",
};

export default function PreviewPage() {
  const [activeId, setActiveId] = useState("cv");
  const [category, setCategory] = useState("all");

  const active = palettes.find((p) => p.id === activeId) ?? palettes[0];
  const [toast, setToast] = useState("");

  const copyColor = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`Copied ${value}`);

      setTimeout(() => {
        setToast("");
      }, 1600);
    } catch {
      setToast("Copy failed");
      setTimeout(() => {
        setToast("");
      }, 1600);
    }
  };
    const filteredPalettes = useMemo(() => {
    if (category === "all") return palettes;
    return palettes.filter((palette) => paletteCategory[palette.id] === category);
  }, [category]);

  const colorRoles = [
    ["Background", active.colors.bg],
    ["Surface", active.colors.surface],
    ["Text", active.colors.text],
    ["Primary", active.colors.primary],
    ["Secondary", active.colors.secondary],
    ["Accent", active.colors.accent],
    ["Button", active.colors.button],
  ];

  return (
    <main
      className="min-h-screen overflow-hidden transition-colors duration-500"
      style={{
        background: `
          radial-gradient(circle at top left, ${active.colors.primary}30, transparent 36rem),
          radial-gradient(circle at top right, ${active.colors.secondary}24, transparent 34rem),
          radial-gradient(circle at bottom, ${active.colors.accent}18, transparent 42rem),
          ${active.colors.bg}
        `,
        color: active.colors.text,
      }}
    >
      <section className="mx-auto max-w-[1500px] px-5 py-8 sm:px-7 lg:px-10">
        <header className="mb-6 flex items-center justify-center">
          <div className="relative overflow-hidden rounded-full border border-cyan-300/20 bg-black/45 px-4 py-2 text-xs font-black tracking-[0.08em] shadow-xl shadow-cyan-950/25 backdrop-blur-xl">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500/15 via-black/20 to-cyan-400/15" />

            <span className="relative z-10">
              <span className="bg-gradient-to-r from-purple-300 to-rose-300 bg-clip-text text-transparent">
                Moody
              </span>
              <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Palette
              </span>
              <span className="ml-1 text-white/90">
                Preview
              </span>
            </span>
          </div>
        </header>

        <section className="mb-8 [perspective:1200px]">
          <motion.div
            key={active.id + "-hero"}
            initial={{ opacity: 0, y: 18, rotateX: 2 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ y: -4, rotateX: 0.8, rotateY: -0.6 }}
            transition={{ duration: 0.35 }}
            className="group relative overflow-hidden rounded-[2rem] border p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            style={{
              background: `
                linear-gradient(145deg, ${active.colors.surface}f2 0%, ${active.colors.surface}cc 48%, ${active.colors.bg}66 100%)
              `,
              borderColor: `${active.colors.primary}38`,
              boxShadow: `
                0 34px 95px ${active.colors.primary}22,
                0 12px 35px rgba(0,0,0,0.22),
                inset 0 1px 0 rgba(255,255,255,0.12),
                inset 0 -36px 90px ${active.colors.bg}24
              `,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `
                  radial-gradient(circle at 16% 0%, ${active.colors.primary}24, transparent 28rem),
                  radial-gradient(circle at 90% 18%, ${active.colors.secondary}1f, transparent 24rem),
                  linear-gradient(180deg, rgba(255,255,255,0.06), transparent 38%)
                `,
              }}
            />

            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl transition duration-500 group-hover:scale-110"
              style={{ background: `${active.colors.primary}24` }}
            />

            <div className="relative" style={{ transform: "translateZ(18px)" }}>
              <p
                className="mb-4 inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] shadow-lg backdrop-blur"
                style={{
                  background: `${active.colors.primary}18`,
                  borderColor: `${active.colors.primary}30`,
                  color: active.colors.primary,
                  boxShadow: `0 10px 28px ${active.colors.primary}14`,
                }}
              >
                {active.name} visual tone
              </p>
              <h1 className="max-w-5xl text-[2.85rem] font-light leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-5xl">
                One structure.
                <span
                  className="block bg-clip-text text-transparent text-[3.5rem] lg:text-6xl"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${active.colors.primary}, ${active.colors.secondary})`,
                  }}
                >
                  Different <span className="bg-gradient-to-r from-purple-300 to-rose-300 bg-clip-text text-transparent"> mood </span>
                </span>
              </h1>
              <p
                className="mt-5 pl-1 max-w-3xl leading-8 text-md"
                style={{ color: active.colors.muted }}
              >
                {active.formula}
              </p>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <aside
            className="relative overflow-hidden rounded-[2rem] border p-4 shadow-2xl backdrop-blur-xl lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:overflow-hidden"
            style={{
              background: `
                linear-gradient(145deg, ${active.colors.surface}ee, ${active.colors.bg}55)
              `,
              borderColor: `${active.colors.primary}2f`,
              boxShadow: `
                0 28px 85px ${active.colors.primary}18,
                inset 0 1px 0 rgba(255,255,255,0.10),
                inset 0 -40px 80px rgba(0,0,0,0.12)
              `,
            }}
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl"
              style={{ background: `${active.colors.primary}18` }}
            />

            <div className="relative mb-4">
              <h2 className="font-['Space_Grotesk'] text-2xl font-semibold tracking-[-0.04em]">
                Mood Library
              </h2>

              <p
                className="mt-1 text-sm leading-6"
                style={{ color: active.colors.muted }}
              >
                Choose a niche and watch the same layout create a different mood.
              </p>
            </div>

            <div className="relative mb-4 flex flex-wrap gap-2">
              {categories.map((item) => {
                const selected = category === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    className="cursor-pointer rounded-full border px-3 py-2 text-xs font-black transition hover:-translate-y-0.5"
                    style={{
                      background: selected
                        ? `linear-gradient(135deg, ${active.colors.primary}, ${active.colors.secondary})`
                        : `${active.colors.bg}33`,
                      borderColor: selected
                        ? active.colors.primary
                        : `${active.colors.primary}35`,
                      color: selected ? active.colors.bg : active.colors.text,
                      boxShadow: selected
                        ? `0 12px 28px ${active.colors.primary}22`
                        : "none",
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            <div className="relative grid max-h-[58vh] gap-3 overflow-y-auto pr-1 lg:max-h-[calc(100vh-17rem)]">
              {filteredPalettes.map((palette) => {
                const selected = activeId === palette.id;

                return (
                  <button
                    key={palette.id}
                    type="button"
                    onClick={() => setActiveId(palette.id)}
                    className="group cursor-pointer rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: selected
                        ? `linear-gradient(145deg, ${palette.colors.primary}24, ${active.colors.bg}22)`
                        : `${active.colors.bg}26`,
                      borderColor: selected
                        ? palette.colors.primary
                        : `${active.colors.primary}22`,
                      color: active.colors.text,
                      boxShadow: selected
                        ? `0 16px 42px ${palette.colors.primary}18, inset 0 1px 0 rgba(255,255,255,0.08)`
                        : `inset 0 1px 0 rgba(255,255,255,0.04)`,
                    }}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex gap-1.5">
                        <span
                          className="h-5 w-5 rounded-full border border-white/20 shadow-lg"
                          style={{ background: palette.colors.primary }}
                        />
                        <span
                          className="h-5 w-5 rounded-full border border-white/20 shadow-lg"
                          style={{ background: palette.colors.secondary }}
                        />
                        <span
                          className="h-5 w-5 rounded-full border border-white/20 shadow-lg"
                          style={{ background: palette.colors.accent }}
                        />
                      </div>

                      {selected && (
                        <span
                          className="rounded-full px-2 py-1 text-[10px] font-black uppercase"
                          style={{
                            background: active.colors.primary,
                            color: active.colors.bg,
                          }}
                        >
                          Selected
                        </span>
                      )}
                    </div>

                    <p className="font-['Space_Grotesk'] text-base font-semibold tracking-[-0.02em]">
                      {palette.name}
                    </p>

                    <p
                      className="mt-1 text-xs leading-5"
                      style={{ color: active.colors.muted }}
                    >
                      {palette.atmosphere}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="grid gap-6">
            <AnimatePresence mode="wait">
              <motion.section
                key={active.id + "-preview"}
                initial={{ opacity: 0, scale: 0.98, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -18 }}
                transition={{ duration: 0.35 }}
                className="relative overflow-hidden rounded-[2.5rem] border shadow-2xl [perspective:1200px]"
                style={{
                  background: `
                    linear-gradient(145deg, ${active.colors.surface}f2, ${active.colors.bg}55)
                  `,
                  borderColor: `${active.colors.primary}35`,
                  boxShadow: `
                    0 35px 95px ${active.colors.primary}20,
                    0 14px 45px rgba(0,0,0,0.24),
                    inset 0 1px 0 rgba(255,255,255,0.10)
                  `,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(circle at 10% 0%, ${active.colors.primary}20, transparent 26rem),
                      radial-gradient(circle at 100% 30%, ${active.colors.secondary}18, transparent 24rem),
                      linear-gradient(180deg, rgba(255,255,255,0.06), transparent 42%)
                    `,
                  }}
                />

                <div className="relative grid lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="p-8 sm:p-12 lg:p-16">
                    <p
                      className="mb-5 inline-flex rounded-full border px-4 py-2 text-sm font-black shadow-lg backdrop-blur"
                      style={{
                        background: `${active.colors.primary}18`,
                        borderColor: `${active.colors.primary}35`,
                        color: active.colors.primary,
                      }}
                    >
                      {active.name} tone preview
                    </p>

                    <h2 className="max-w-2xl font-['Space_Grotesk'] text-4xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl">
                      Trust comes before action.
                    </h2>

                    <p
                      className="mt-6 max-w-xl text-lg leading-8"
                      style={{ color: active.colors.muted }}
                    >
                      A palette should not decorate the page. It should guide the first
                      feeling, support the market, and make the offer easier to trust.
                    </p>

                    <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                      <button
                        type="button"
                        className="cursor-pointer rounded-2xl px-7 py-4 font-black shadow-xl transition hover:-translate-y-1"
                        style={{
                          background: active.colors.button,
                          color: active.colors.bg,
                          boxShadow: `0 18px 38px ${active.colors.button}42`,
                        }}
                      >
                        Primary action →
                      </button>

                      <button
                        type="button"
                        className="cursor-pointer rounded-2xl border px-7 py-4 font-black transition hover:-translate-y-1"
                        style={{
                          background: `${active.colors.bg}20`,
                          borderColor: `${active.colors.primary}55`,
                          color: active.colors.text,
                        }}
                      >
                        Explore tone
                      </button>
                    </div>
                  </div>

                  <div
                    className="border-t p-8 sm:p-12 lg:border-l lg:border-t-0"
                    style={{ borderColor: `${active.colors.primary}22` }}
                  >
                    <div className="grid gap-5">
                      {[
                        ["Emotion", "Sets the first reaction."],
                        ["Niche", "Sets expected trust signals."],
                        ["Positioning", "Shapes affordable, premium, or expert tone."],
                        ["Offer", "Controls action colour and pressure level."],
                      ].map(([title, text], index) => (
                        <div
                          key={title}
                          className="rounded-3xl border p-5 transition hover:-translate-y-1"
                          style={{
                            background: `${active.colors.bg}35`,
                            borderColor: `${active.colors.primary}25`,
                            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`,
                          }}
                        >
                          <div
                            className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl font-black shadow-lg"
                            style={{
                              background: `${active.colors.primary}22`,
                              color: active.colors.primary,
                              boxShadow: `0 12px 30px ${active.colors.primary}16`,
                            }}
                          >
                            {index + 1}
                          </div>

                          <p className="font-['Space_Grotesk'] text-lg font-semibold tracking-[-0.02em]">
                            {title}
                          </p>

                          <p
                            className="mt-1 text-sm leading-6"
                            style={{ color: active.colors.muted }}
                          >
                            {text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>
            </AnimatePresence>

            <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
              <div
                className="relative overflow-hidden rounded-[2rem] border p-6 shadow-xl backdrop-blur-xl"
                style={{
                  background: `
                    linear-gradient(145deg, ${active.colors.surface}e8, ${active.colors.bg}42)
                  `,
                  borderColor: `${active.colors.primary}26`,
                  boxShadow: `
                    0 20px 60px ${active.colors.primary}14,
                    inset 0 1px 0 rgba(255,255,255,0.08)
                  `,
                }}
              >
                <p
                  className="text-sm font-black uppercase tracking-[0.2em]"
                  style={{ color: active.colors.primary }}
                >
                  Current Direction
                </p>

                <h3 className="mt-3 font-['Space_Grotesk'] text-3xl font-semibold tracking-[-0.04em]">
                  {active.atmosphere}
                </h3>

                <p
                  className="mt-4 leading-8"
                  style={{ color: active.colors.muted }}
                >
                  This preview shows how one structure can shift from calm to premium,
                  energetic, serious, friendly, or futuristic through colour roles alone.
                </p>
              </div>

              <div
                className="relative overflow-hidden rounded-[2rem] border p-6 shadow-xl backdrop-blur-xl"
                style={{
                  background: `
                    linear-gradient(145deg, ${active.colors.surface}e8, ${active.colors.bg}42)
                  `,
                  borderColor: `${active.colors.primary}26`,
                  boxShadow: `
                    0 20px 60px ${active.colors.primary}14,
                    inset 0 1px 0 rgba(255,255,255,0.08)
                  `,
                }}
              >
                <p
                  className="text-sm font-black uppercase tracking-[0.2em]"
                  style={{ color: active.colors.primary }}
                >
                  Palette Roles
                </p>

                <div className="mt-5 grid gap-3">
                  {colorRoles.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 rounded-2xl border p-3"
                      style={{
                        background: `${active.colors.bg}28`,
                        borderColor: `${active.colors.primary}22`,
                      }}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className="h-9 w-9 shrink-0 rounded-xl border border-white/20 shadow-lg"
                          style={{ background: value }}
                        />

                        <div className="min-w-0">
                          <p className="text-sm font-black">{label}</p>
                          <p className="text-xs opacity-65">{value}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => copyColor(value)}
                        className="shrink-0 cursor-pointer rounded-full px-3 py-1 text-xs font-black transition hover:scale-105"
                        style={{
                          background: `${active.colors.primary}22`,
                          color: active.colors.primary,
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.22 }}
                className="fixed left-1/2 top-6 z-[999] -translate-x-1/2 rounded-full border px-5 py-3 text-sm font-black shadow-2xl backdrop-blur-xl"
                style={{
                  background: `${active.colors.surface}f2`,
                  borderColor: `${active.colors.primary}44`,
                  color: active.colors.text,
                  boxShadow: `0 18px 45px ${active.colors.primary}25`,
                }}
              >
                {toast}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </section>
      <Footer />
    </main>
  );
}