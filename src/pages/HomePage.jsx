import { motion } from "framer-motion";
import Footer from "../components/Footer";
const groups = [
  {
    title: "The Power Colors",
    subtitle: "Urgency, Passion, Status",
    colors: [
      {
        name: "Red",
        mood: "High-energy, passion, speed, loud.",
        industry: "Food, Entertainment, Retail Clearance.",
        luxury: "Burgundy / Crimson",
        luxuryVibe: "Royalty, fine wine, heritage, classic luxury.",
      },
      {
        name: "Red-Orange",
        mood: "Aggressive, playful, vibrating, active.",
        industry: "Fitness, Tech Startups, Gaming.",
        luxury: "Terracotta / Rust",
        luxuryVibe: "Artisanal, architectural, premium earthy goods.",
      },
      {
        name: "Red-Violet",
        mood: "Dramatic, creative, rebellious, edgy.",
        industry: "Creative Agencies, Avant-Garde Beauty.",
        luxury: "Plum / Wine",
        luxuryVibe: "High-fashion, mystery, premium cosmetics.",
      },
    ],
  },
  {
    title: "The Sun Colors",
    subtitle: "Optimism, Warmth, Approachability",
    colors: [
      {
        name: "Orange",
        mood: "Friendliness, vitality, budget-friendly.",
        industry: "E-commerce, Home Improvement, Logistics.",
        luxury: "Burnt Amber",
        luxuryVibe: "Luxury leather goods, high-end autumn fashion.",
      },
      {
        name: "Yellow-Orange",
        mood: "Warmth, comfort, caution, mainstream.",
        industry: "Food, Transport, Hospitality.",
        luxury: "Champagne / Cream",
        luxuryVibe: "Exclusive resorts, bridal luxury, premium packaging.",
      },
      {
        name: "Yellow",
        mood: "Happiness, youth, intellect, temporary attention.",
        industry: "Fast Food, Retail Sales, Energy.",
        luxury: "Gold",
        luxuryVibe: "Absolute wealth, premium status, heirloom jewelry.",
      },
    ],
  },
  {
    title: "The Nature Colors",
    subtitle: "Growth, Stability, Refreshment",
    colors: [
      {
        name: "Yellow-Green",
        mood: "Freshness, innovation, sharp, youthful.",
        industry: "App Development, Energy Drinks, Youth Brands.",
        luxury: "Olive / Moss",
        luxuryVibe: "High-end safari/outdoor gear, quiet luxury, organic oils.",
      },
      {
        name: "Green",
        mood: "Balance, safety, trust, standard wealth.",
        industry: "Finance, Sustainability, Agriculture.",
        luxury: "Emerald / Forest Green",
        luxuryVibe: "Private banking, historic clubs, old-money luxury.",
      },
      {
        name: "Blue-Green",
        mood: "Calmness, clarity, healing, serenity.",
        industry: "Medical, Spas, Premium Hospitality.",
        luxury: "Teal / Tiffany Blue",
        luxuryVibe: "Iconic high-end jewelry, pristine wellness, luxury travel.",
      },
    ],
  },
  {
    title: "The Trust & Logic Colors",
    subtitle: "Trust, Security, Authority",
    colors: [
      {
        name: "Blue",
        mood: "Trust, security, logic, corporate stability.",
        industry: "Corporate Banking, Tech Giants, Insurance.",
        luxury: "Navy / Midnight Blue",
        luxuryVibe: "Executive power, luxury yachts, bespoke tailoring.",
      },
      {
        name: "Blue-Violet",
        mood: "Intuition, mystery, futuristic, deep.",
        industry: "Tech Hardware, Nightlife, AI Brands.",
        luxury: "Indigo",
        luxuryVibe: "Raw denim craftsmanship, premium stationery, artisan tech.",
      },
      {
        name: "Violet",
        mood: "Royalty, spirituality, extravagance, exotic.",
        industry: "Premium Services, Anti-Aging, Astrology.",
        luxury: "Deep Purple",
        luxuryVibe: "Luxury mattresses, premium chocolate, velvet textures.",
      },
    ],
  },
];

const rules = [
  {
    label: "1",
    title: "Start with feeling",
    text: "Before choosing colours, define what the user should feel first: calm, trust, urgency, safety, confidence, or excitement.",
  },
  {
    label: "2",
    title: "Match the market",
    text: "A hospital, CV tool, luxury brand, and gaming app should not share the same atmosphere. The niche decides the tone.",
  },
  {
    label: "3",
    title: "Control the intensity",
    text: "Bright colours create attention. Muted colours create maturity. Contrast creates direction.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0d1722] text-white">
      <section className="relative px-5 py-14 sm:px-7 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_34rem),radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_30rem),radial-gradient(circle_at_bottom,rgba(16,185,129,0.09),transparent_38rem)]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div>
              <p className="mb-5 mt-12 inline-flex rounded-full border border-cyan-300/20 bg-white/[0.055] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
                Design Psychology · Palette Logic
              </p>

             <h1 className="text-[4rem] font-semibold leading-[0.92] tracking-[-0.07em] sm:text-7xl lg:text-7xl">
               <span className="text-purple-200">Moody</span><span className="text-teal-200">Palette</span>
               <span className="block text-[3.5rem] mt-6 bg-gradient-to-r from-teal-400/80 to-blue-400/80 bg-clip-text text-transparent">
                 Colour System
               </span>
             </h1>

              <p className="mt-6 max-w-2xl text-sm text-base leading-7 text-slate-300">
                A compact system for turning emotion, niche, status, and offer
                into a colour palette that matches the product atmosphere.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
              <p className="font-['Space_Grotesk'] text-2xl font-semibold tracking-tight text-white">
                Emotion + Niche + Positioning + Offer
              </p>

              <div className="my-4 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />

              <p className="font-['Space_Grotesk'] bg-gradient-to-r from-sky-300 to-emerald-300 bg-clip-text text-3xl font-semibold tracking-[-0.04em] text-transparent">
                = Palette
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                The goal is not to pick nice colours. The goal is to create the
                correct emotional room.
              </p>
            </div>
          </motion.section>

          <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {groups.map((group, groupIndex) => (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.42, delay: groupIndex * 0.06 }}
                className="rounded-[1.7rem] border border-white/10 bg-white/[0.045] p-4 shadow-xl shadow-black/20 backdrop-blur"
              >
                <div className="mb-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-300">
                    Group {groupIndex + 1}
                  </p>

                  <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-semibold tracking-[-0.04em] text-white">
                    {group.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    {group.subtitle}
                  </p>
                </div>

                <div className="space-y-3">
                  {group.colors.map((color) => (
                    <div
                      key={color.name}
                      className="rounded-2xl border border-white/10 bg-[#0C141C]/80 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/25 shadow-xl"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <h3 className="font-['Space_Grotesk'] text-lg font-semibold tracking-tight text-white">
                          {color.name}
                        </h3>

                        <span className="rounded-full bg-cyan-300/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-cyan-200">
                          Pure
                        </span>
                      </div>

                      <div className="mt-4 grid gap-2.5 text-sm leading-6 text-slate-300">
                        <p>
                          <span className="font-black font-semibold text-purple-400/80">
                            Mood:
                          </span>{" "}
                          {color.mood}
                        </p>

                        <p>
                          <span className="font-black font-semibold text-sky-400/80">
                            Industry:
                          </span>{" "}
                          {color.industry}
                        </p>

                        <p>
                          <span className="font-black font-semibold text-yellow-400/70">
                            Luxury:
                          </span>{" "}
                          {color.luxury}
                        </p>

                        <p className="text-slate-500">{color.luxuryVibe}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </section>

          <section className="mt-14">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-teal-300">
                  Golden Rules
                </p>

                <h2 className="mt-2 font-['Space_Grotesk'] text-4xl font-semibold tracking-[-0.05em]">
                  How colours become expensive
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-slate-400">
                Colour creates emotion. Tone creates trust. Contrast creates direction.
              </p>
            </div>

           <div className="grid gap-4 md:grid-cols-3">
             {rules.map((rule, index) => (
               <motion.div
                 key={rule.title}
                 initial={{ opacity: 0, y: 18 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.35, delay: index * 0.06 }}
                 className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#132332]/70 p-5 shadow-xl shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/25"
               >
                 <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 transition group-hover:opacity-100" />

                 <div className="mb-5 flex items-center justify-between gap-4">
                   <span className="text-4xl font-semibold tracking-[-0.06em] text-teal-300/65">
                     {rule.label}
                   </span>

                   <span className="h-2 w-2 rounded-full bg-gradient-to-r from-sky-300 to-teal-300 shadow-[0_0_18px_rgba(45,212,191,0.65)]" />
                 </div>

                 <h3 className="font-['Space_Grotesk'] text-xl font-semibold tracking-[-0.03em] text-white">
                   {rule.title}
                 </h3>

                 <p className="mt-3 text-sm leading-7 text-slate-400">
                   {rule.text}
                 </p>
               </motion.div>
             ))}
           </div>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}