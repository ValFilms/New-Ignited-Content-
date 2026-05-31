// sections.jsx — nav, results, services, process, footer
const { useEffect: useSecEffect, useState: useSecState } = React;

function Nav({ onBook }) {
  const [scrolled, setScrolled] = useSecState(false);
  useSecEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a className="brand" href="#top">
          <Ball size={34} pulse={false} />
          <span className="brand-name">IGNITED<span className="co"> CONTENT</span></span>
        </a>
        <div className="nav-links">
          <a href="#results">Results</a>
          <a href="#services">Services</a>
          <a href="#process">How it works</a>
        </div>
        <div className="nav-cta">
          <span className="nav-phone">Tint · PPF · Ceramic</span>
          <button className="btn btn-primary" onClick={onBook} style={{ padding: "11px 18px", fontSize: 14 }}>
            Book a call<span className="arrow">→</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ---------- RESULTS / PROOF ---------- */
const STATS = [
  { v: 200, prefix: "$", suffix: "K+", k: "Managed in ad spend", note: "Across autostyling clients — and counting." },
  { v: 2, prefix: "$", suffix: "", k: "Cost per tint inquiry", note: "As low as. Tint is our sharpest channel." },
  { v: 5, prefix: "", suffix: "", k: "Services we specialize in", note: "Tint, PPF, ceramic, detailing & wrap." },
  { v: 100, prefix: "", suffix: "%", k: "Built for autostyling", note: "One industry. No generalist agency noise." },
];

function Results() {
  return (
    <section className="sec results" id="results">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">The receipts</div>
          <Reveal as="h2" className="sec-h2">
            We don't pitch theory.<br /><span className="ig-em">The numbers talk.</span>
          </Reveal>
          <Reveal as="p" className="sec-lede" delay={80}>
            Every dollar is tracked from first click to a confirmed appointment in your bay. Here's what that looks like.
          </Reveal>
        </div>
        <div className="stat-grid">
          {STATS.map((s, i) => (
            <Reveal className="stat-card" delay={i * 80} key={i}>
              <div className="stat-num">
                <Counter to={s.v} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="stat-k">{s.k}</div>
              <div className="stat-note">{s.note}</div>
              <div className="stat-ticks tick-row">
                {Array.from({ length: 9 }).map((_, j) => (
                  <span className={`tick${j === 8 ? " hot" : ""}`} key={j} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES ---------- */
const SERVICES = [
  { tag: "Flagship", name: "Window Tint", lead: true, desc: "Year-round demand, fast turnaround, and our lowest cost per inquiry. The engine that keeps the schedule full in every season." },
  { tag: "High-ticket", name: "Paint Protection Film", lead: true, desc: "Premium jobs, premium margins. We position your PPF work in front of owners who actually value their paint." },
  { tag: "Recurring", name: "Ceramic Coating", desc: "Upsell-ready campaigns that pair naturally with tint and PPF to raise your average ticket." },
  { tag: "Volume", name: "Mobile Detailing", desc: "Keep techs busy between big installs with a steady stream of booked detailing appointments." },
  { tag: "Showpiece", name: "Vinyl Wrapping", desc: "Build the brand and the bookings for your highest-visibility, highest-margin transformations." },
];

function Services({ onBook }) {
  return (
    <section className="sec services-sec" id="services">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">What we fill your calendar with</div>
          <Reveal as="h2" className="sec-h2">Built for every bay<br />in your shop.</Reveal>
          <Reveal as="p" className="sec-lede" delay={80}>
            We market the work you actually want more of — weighted toward the services that pay. Tint and PPF lead the way.
          </Reveal>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <Reveal className={`svc-card${s.lead ? " lead" : ""}`} delay={i * 70} key={i}>
              <div className="svc-top">
                <span className="svc-tag">{s.tag}</span>
                <span className="svc-idx mono-tag dim">0{i + 1}</span>
              </div>
              <h3 className="svc-name">{s.name}</h3>
              <p className="svc-desc">{s.desc}</p>
              {s.lead && <span className="svc-flag"><span className="svc-flag-dot" />Top performer</span>}
            </Reveal>
          ))}
          <Reveal className="svc-card svc-cta" delay={SERVICES.length * 70}>
            <h3 className="svc-name">Run all five?<br /><span className="ig-em">Even better.</span></h3>
            <p className="svc-desc">We sequence campaigns so each service feeds the next and your average ticket climbs.</p>
            <button className="btn btn-primary" onClick={onBook} style={{ marginTop: "auto" }}>
              Book a strategy call<span className="arrow">→</span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
const STEPS = [
  { n: "01", t: "Book a strategy call", d: "Tell us your shop, your services, and where you want to grow. We map the fastest path to a fuller calendar." },
  { n: "02", t: "We build the offer & engine", d: "Custom creative, offers, and campaigns tuned to your market — launched on the channels your customers actually use." },
  { n: "03", t: "Appointments hit your calendar", d: "Qualified inquiries turn into booked jobs in your bay. You see every one, tracked end to end." },
  { n: "04", t: "We optimize & scale", d: "We cut what doesn't work, double down on what does, and push your cost per booking lower month over month." },
];

function Process() {
  return (
    <section className="sec process-sec grid-bg" id="process">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">How it works</div>
          <Reveal as="h2" className="sec-h2">From first call to a<br /><span className="ig-em">full schedule.</span></Reveal>
        </div>
        <div className="step-grid">
          {STEPS.map((s, i) => (
            <Reveal className="step" delay={i * 80} key={i}>
              <div className="step-n">{s.n}</div>
              <h3 className="step-t">{s.t}</h3>
              <p className="step-d">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ onBook }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-cta">
          <div>
            <div className="eyebrow">Ready when you are</div>
            <h2 className="footer-h2">Let's keep your<br /><span className="ig-em">bays booked.</span></h2>
          </div>
          <button className="btn btn-primary footer-btn" onClick={onBook}>
            Book a strategy call<span className="arrow">→</span>
          </button>
        </div>
        <div className="footer-bottom">
          <a className="brand" href="#top">
            <Ball size={28} pulse={false} />
            <span className="brand-name">IGNITED<span className="co"> CONTENT</span></span>
          </a>
          <span className="footer-links mono-tag dim">
            <a href="privacy.html">Privacy</a>
            <span className="dot-sep">·</span>
            <a href="terms.html">Terms</a>
          </span>
          <span className="mono-tag dim">© {new Date().getFullYear()} Ignited Content Co.</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Results, Services, Process, Footer });
