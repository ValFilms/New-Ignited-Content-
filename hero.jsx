// hero.jsx — three switchable hero directions
const { useEffect: useHeroEffect, useRef: useHeroRef, useState: useHeroState } = React;

const HERO_COPY = {
  eyebrow: "Marketing for autostyling shops",
  head: ["Keep every bay", "booked", "year-round."],
  sub: "We build the demand engine for tint, PPF & ceramic shops — turning ad spend into booked appointments and a calendar that stays full through every season.",
  primary: "Book a strategy call",
  secondary: "See the numbers",
};

function HeroCTAs({ onBook }) {
  return (
    <div className="hero-ctas">
      <button className="btn btn-primary" onClick={onBook}>
        {HERO_COPY.primary}<span className="arrow">→</span>
      </button>
      <a className="btn btn-ghost" href="#results">{HERO_COPY.secondary}</a>
    </div>
  );
}

const HERO_CHIPS = [
  { k: "Ad spend managed", v: "$200K+" },
  { k: "Cost / tint inquiry", v: "$2" },
  { k: "Focus", v: "1 industry" },
];

/* ---------- A · TELEMETRY (data-forward SaaS) ---------- */
function HeroTelemetry({ onBook }) {
  return (
    <section className="hero hero-telemetry grid-bg">
      <div className="hero-glow" />
      <div className="wrap hero-inner">
        <div className="hero-lead">
          <Reveal as="div" className="eyebrow" >{HERO_COPY.eyebrow}</Reveal>
          <Reveal as="h1" className="hero-h1" delay={60}>
            Keep every bay <span className="ig-em">booked</span><br />— all year.
          </Reveal>
          <Reveal as="p" className="hero-sub" delay={120}>{HERO_COPY.sub}</Reveal>
          <Reveal delay={180}><HeroCTAs onBook={onBook} /></Reveal>
          <Reveal className="hero-trust" delay={240}>
            <span className="mono-tag">Tint · PPF · Ceramic · Detailing · Wrap</span>
          </Reveal>
        </div>

        <Reveal className="hero-dash" delay={120}>
          <div className="dash-head">
            <span className="dash-dot" /><span className="mono-tag">LIVE · CAMPAIGN READOUT</span>
            <Ball size={26} style={{ marginLeft: "auto" }} />
          </div>
          <div className="dash-big">
            <div className="mono-tag dim">Managed ad spend</div>
            <div className="dash-num"><Counter to={200} prefix="$" suffix="K+" /></div>
          </div>
          <div className="dash-split">
            <div className="dash-cell">
              <div className="mono-tag dim">Cost / tint inquiry</div>
              <div className="dash-num sm"><Counter to={2} prefix="$" /></div>
              <div className="spark"><span style={{ height: "70%" }} /><span style={{ height: "52%" }} /><span style={{ height: "40%" }} /><span style={{ height: "28%" }} /><span style={{ height: "18%" }} className="hot" /></div>
            </div>
            <div className="dash-cell">
              <div className="mono-tag dim">Calendar fill</div>
              <div className="dash-num sm"><Counter to={94} suffix="%" /></div>
              <div className="gauge"><span style={{ width: "94%" }} /></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- B · GARAGE (gritty motorsport) ---------- */
function HeroGarage({ onBook }) {
  return (
    <section className="hero hero-garage carbon grain">
      <div className="garage-sun"><Ball size={460} pulse glow /></div>
      <div className="garage-stripe" />
      <div className="wrap hero-inner garage-inner">
        <Reveal as="div" className="eyebrow no-rule garage-eye">⟶ {HERO_COPY.eyebrow}</Reveal>
        <Reveal as="h1" className="garage-h1" delay={60}>
          KEEP EVERY<br />BAY <span className="ig-em">BOOKED</span>
        </Reveal>
        <Reveal as="p" className="hero-sub garage-sub" delay={120}>{HERO_COPY.sub}</Reveal>
        <Reveal delay={180}><HeroCTAs onBook={onBook} /></Reveal>
        <Reveal className="garage-stats" delay={240}>
          {HERO_CHIPS.map((c, i) => (
            <div className="garage-stat" key={i}>
              <div className="garage-stat-v">{c.v}</div>
              <div className="mono-tag dim">{c.k}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- C · SPLIT (premium editorial) ---------- */
function HeroSplit({ onBook }) {
  return (
    <section className="hero hero-split">
      <div className="wrap hero-inner split-inner">
        <div className="split-lead">
          <Reveal as="div" className="eyebrow">{HERO_COPY.eyebrow}</Reveal>
          <Reveal as="h1" className="split-h1" delay={60}>
            Keep every bay <span className="ig-em">booked</span>, year-round.
          </Reveal>
          <Reveal as="p" className="hero-sub" delay={120}>{HERO_COPY.sub}</Reveal>
          <Reveal delay={180}><HeroCTAs onBook={onBook} /></Reveal>
        </div>
        <Reveal className="split-visual" delay={120}>
          <div className="split-frame carbon">
            <div className="split-ball-glow" />
            <Ball size={300} pulse glow />
            <div className="float-chip chip-a">
              <div className="mono-tag dim">Ad spend managed</div>
              <div className="chip-v">$200K+</div>
            </div>
            <div className="float-chip chip-b">
              <div className="mono-tag dim">Cost / tint inquiry</div>
              <div className="chip-v">$2</div>
            </div>
            <div className="float-chip chip-c">
              <span className="mono-tag">Tint · PPF · Ceramic</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Hero({ variant, onBook }) {
  if (variant === "garage") return <HeroGarage onBook={onBook} />;
  if (variant === "split") return <HeroSplit onBook={onBook} />;
  return <HeroTelemetry onBook={onBook} />;
}

Object.assign(window, { Hero });
