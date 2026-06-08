export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#08131d]/70 px-5 py-6 text-center text-sm font-semibold text-white/60 backdrop-blur">
      <p>
        Built with mood, colour psychology, and too much curiosity by{" "}
        <span className="font-bold text-cyan-300"><a href="https://github.com/freqzas">Larry</a></span>.
      </p>

      <p className="mt-2 text-xs text-slate-300 font-light">
        &copy; 2026  MoodyPalette · A free tool.
      </p>
    </footer>
  );
}