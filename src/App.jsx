import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HomePage from "./pages/HomePage";
import PreviewPage from "./pages/PreviewPage";

const pages = [
  { id: "home", label: "Home" },
  { id: "preview", label: "Preview" },
];

function getPageFromHash() {
  const hash = window.location.hash.replace("#", "");
  return pages.some((page) => page.id === hash) ? hash : "home";
}

export default function App() {
  const [page, setPage] = useState(getPageFromHash);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setPage(getPageFromHash());
    };

    window.addEventListener("hashchange", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const changePage = (nextPage) => {
    window.history.pushState(null, "", `#${nextPage}`);
    setPage(nextPage);
  };

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full overflow-hidden border-b px-4 py-4 transition-all duration-300 ${
          scrolled
            ? "border-cyan-300/15 shadow-2xl shadow-black/35 backdrop-blur-2xl"
            : "border-white/10 shadow-xl shadow-black/20 backdrop-blur-xl"
        }`}
      >
        {/* Header background: purple top / black middle / cyan bottom */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black/80"
        />

        {/* Purple top blur */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-16 h-28 w-[140%] rounded-full bg-purple-500/30 blur-3xl"
          animate={{ x: ["-6%", "6%", "-6%"] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Cyan bottom blur */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-20 h-28 w-[140%] rounded-full bg-cyan-400/25 blur-3xl"
          animate={{ x: ["6%", "-6%", "6%"] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Black glass middle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-[46%] -translate-y-1/2 bg-black/35 blur-sm"
        />

        {/* Soft moving shine */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-35"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "220% 220%",
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Brand group */}
          <div className="justify-self-start">
            <div className="flex items-center gap-3">
              {/* Logo block */}
              <div className="relative flex h-[76px] w-[76px] items-center justify-center">
                {/* purple glow */}
                <span className="pointer-events-none absolute -left-1 top-1 h-14 w-14 rounded-full bg-purple-500/45 blur-xl" />

                {/* cyan glow */}
                <span className="pointer-events-none absolute -right-1 bottom-1 h-14 w-14 rounded-full bg-cyan-400/45 blur-xl" />

                {/* dark depth behind logo */}
                <span className="pointer-events-none absolute inset-3 rounded-3xl bg-black/25 blur-md" />

                <img
                  src="/logo.png"
                  alt="MoodyPalette"
                  className="relative z-10 h-[68px] w-[68px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]"
                />
              </div>

              {/* Brand name pill */}
                <div className="relative hidden overflow-hidden rounded-full bg-gradient-to-b from-white/10 via-black/40 to-black/60 px-5 py-2 text-base font-black tracking-tight font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_2px_4px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:inline-flex">

                  {/* split background */}
                  <span className="absolute inset-y-0 right-0 w-1/2 rounded-r-full bg-gradient-to-r from-purple-500/10 to-rose-400/20" />
                  <span className="absolute inset-y-0 left-0 w-1/2 rounded-l-full bg-gradient-to-r from-cyan-400/20 to-emerald-400/10 " />

                  {/* shine */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60 border-2 border-white/10 " />

                  <span className="relative z-10 mr-5 bg-gradient-to-r from-purple-400 to-rose-400/80 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]">
                    Moody
                  </span>

                  <span className="relative z-10 ml-1 bg-gradient-to-r from-emerald-400/80 to-cyan-400  bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]">
                    Palette
                  </span>
                </div>

            </div>
          </div>

          {/* Center Navigation */}
          <nav className="justify-self-center">
            <div
              className={`relative overflow-hidden rounded-full border p-1.5 backdrop-blur-xl transition-all duration-300 ${
                scrolled
                  ? "border-[2px] [border-style:ridge] border-indigo-400/70 bg-gradient-to-t from-black/40 to-white/20 shadow-xl shadow-black/50"
                  : "border-[2px] [border-style:ridge] border-indigo-400/50 bg-gradient-to-t from-black/40 to-white/20 shadow-xl shadow-black/30"
              }`}
            >
              {/* Moving shine inside nav */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-45"
                animate={{ x: ["-45%", "45%", "-45%"] }}
                transition={{duration: 6,repeat: Infinity,ease: "easeInOut",}}
                style={{ background:"linear-gradient(90deg, transparent, rgba(0, 213, 255, 0.24), transparent)", }}
              />

              <div className="relative flex items-center gap-1">
                {pages.map((item) => {
                  const active = page === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => changePage(item.id)}
                      className={`relative min-w-[82px] cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition sm:min-w-[92px] sm:px-5 ${
                        active ? "text-slate-200 text-shadow-lg/30" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="active-page-pill"
                          className="absolute inset-0 rounded-full border-b border-b-[2px] [border-b-style:ridge] border-b-sky-900 bg-linear-to-b from-indigo-500/70 to-sky-500/70 shadow-[inset_0_3px_2px_rgba(0, 0, 0, 1),0_0_6px_rgba(0, 0, 0, 0.5)]"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                        />
                      )}

                      <span className="relative z-10">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Right Back Button */}
          <div className="flex justify-self-end">
            {page !== "home" && (
              <button
                type="button"
                onClick={() => changePage("home")}
                className="rounded-full border border-[2px] [border-style:ridge] border-indigo-400/70 bg-gradient-to-t from-black/40 to-white/20 px-4 py-2 text-sm font-black text-cyan-100 shadow-xl shadow-black/50 backdrop-blur-xl transition hover:border-cyan-300/50 font-semibold"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </header>
      <div className="pt-26">
        {page === "home" ? <HomePage /> : <PreviewPage />}
      </div>
    </>
  );
}