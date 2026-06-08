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

  const changePage = (nextPage) => {
    window.history.pushState(null, "", `#${nextPage}`);
    setPage(nextPage);
  };

  return (
    <>
      <nav className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/55 p-2 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
          <div className="hidden items-center gap-2 px-3 sm:flex">
            <span className="h-3 w-3 rounded-full bg-gradient-to-br from-sky-300 via-teal-300 to-emerald-300 shadow-[0_0_18px_rgba(45,212,191,0.7)]" />
            <span className="font-['Space_Grotesk'] text-sm text-purple-200 font-semibold tracking-[-0.02em]">
              Moody<span className="text-teal-200">Palette</span>
            </span>
          </div>

          {pages.map((item) => {
            const active = page === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => changePage(item.id)}
                className={`relative cursor-pointer rounded-full px-5 py-2 text-sm font-black transition ${
                  active ? "text-slate-950" : "text-white/75 hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="active-page-pill"
                    className="absolute inset-0 rounded-full bg-cyan-300"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {page === "home" ? <HomePage /> : <PreviewPage />}
    </>
  );
}