import {
  Body,
  Button,
  Card,
  Eyebrow,
  Glyph,
  Heading,
  Section,
} from "./primitives";

export function HeroSplit() {
  const pillars = [
    ["Emotion", "Sets the first reaction."],
    ["Niche", "Sets expected trust signals."],
    ["Positioning", "Shapes affordable, premium, or expert tone."],
    ["Offer", "Controls action colour and pressure level."],
  ];

  return (
    <Section>
      <div className="grid items-center gap-10 @4xl:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow>Colour system</Eyebrow>

          <Heading size="xl" className="max-w-xl leading-[1.05]">
            Trust comes before action.
          </Heading>

          <Body className="mt-5 max-w-lg">
            A palette should not decorate the page. It should guide the first
            feeling, support the market, and make the offer easier to trust.
          </Body>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button>Primary action</Button>
            <Button variant="ghost">Explore tone</Button>
          </div>
        </div>

        <div className="grid gap-3 @xl:grid-cols-2 @4xl:grid-cols-1 @5xl:grid-cols-2">
          {pillars.map(([title, text], index) => (
            <Card key={title}>
              <Glyph>{index + 1}</Glyph>

              <p className="font-['Space_Grotesk'] text-base font-semibold tracking-[-0.02em] text-mp-text">
                {title}
              </p>

              <p className="mt-1 text-sm leading-6 text-mp-muted">{text}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function HeroCentered() {
  return (
    <Section className="text-center">
      <Eyebrow>Now in open beta</Eyebrow>

      <Heading size="xl" className="mx-auto max-w-2xl leading-[1.05]">
        One structure, a different mood every time.
      </Heading>

      <Body className="mx-auto mt-5 max-w-xl">
        Pick the emotion first, then the niche, then the offer. The palette
        follows from those three, not from taste.
      </Body>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button>Get started</Button>
        <Button variant="ghost">See how it works</Button>
      </div>
    </Section>
  );
}

export function FeatureGrid() {
  const features = [
    ["Emotion first", "Decide what someone should feel before choosing a hue."],
    ["Market aware", "A clinic and a gaming brand cannot share an atmosphere."],
    ["Controlled intensity", "Bright earns attention, muted earns maturity."],
  ];

  return (
    <Section>
      <div className="mb-8 max-w-xl">
        <Eyebrow>Why it works</Eyebrow>
        <Heading>Colour creates emotion. Tone creates trust.</Heading>
      </div>

      <div className="grid gap-4 @2xl:grid-cols-2 @4xl:grid-cols-3">
        {features.map(([title, text], index) => (
          <Card key={title}>
            <Glyph>{String(index + 1).padStart(2, "0")}</Glyph>

            <p className="font-['Space_Grotesk'] text-base font-semibold tracking-[-0.02em] text-mp-text">
              {title}
            </p>

            <p className="mt-2 text-sm leading-6 text-mp-muted">{text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function StatRow() {
  const stats = [
    ["21", "Palettes"],
    ["8", "Colour roles"],
    ["4.5:1", "Minimum contrast"],
    ["0", "Runtime deps"],
  ];

  return (
    <Section>
      <div className="grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-4">
        {stats.map(([value, label]) => (
          <Card key={label} className="text-center">
            <p className="font-['Space_Grotesk'] text-3xl font-semibold tracking-[-0.04em] text-mp-primary-ink @2xl:text-4xl">
              {value}
            </p>

            <p className="mt-1 text-xs font-black uppercase tracking-wide text-mp-muted">
              {label}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function Testimonial() {
  return (
    <Section>
      <Card className="@2xl:p-8">
        <p className="font-['Space_Grotesk'] text-lg leading-8 tracking-[-0.01em] text-mp-text @2xl:text-2xl @2xl:leading-9">
          &ldquo;We stopped arguing about which blue we liked and started asking
          what the page needed to feel like. The argument ended that week.&rdquo;
        </p>

        <div className="mt-6 flex items-center gap-3">
          <span className="h-10 w-10 rounded-full bg-mp-primary/25" />

          <div>
            <p className="text-sm font-bold text-mp-text">Dana Whitfield</p>
            <p className="text-xs text-mp-muted">Design lead, Northwind</p>
          </div>
        </div>
      </Card>
    </Section>
  );
}
