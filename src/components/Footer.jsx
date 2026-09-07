export default function Footer() {
  return (
    <footer className="border-t border-mp-primary/15 bg-mp-surface/60 px-5 py-6 text-center text-sm font-semibold text-mp-muted backdrop-blur">
      <p>
        Built with mood, colour psychology, and too much curiosity by{" "}
        <span className="font-bold text-mp-primary-ink">
          <a href="https://github.com/freqzas">Larry</a>
        </span>
        .
      </p>

      <p className="mt-2 text-xs font-light text-mp-muted">
        &copy; 2026 MoodyPalette &middot; A free tool.
      </p>
    </footer>
  );
}
