// sections.jsx — nav, results, services, process, testimonials, footer
const { useEffect: useSecEffect, useState: useSecState, useRef: useSecRef } = React;

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
          <a href="#math">The math</a>
        </div>
        <div className="nav-cta">
          <span className="nav-phone mono-tag dim">Tint · PPF · Ceramic</span>
          <Magnetic strength={0.2}>
            <button className="btn btn-primary btn-sm" onClick={onBook}>Book a call<span className="arrow">→</span></button>
          </Magnetic>
        </div>
      </div>
    </nav>
  );
}

/* ---------- RESULTS — the receipts, numbers as the hero ---------- */
const SUPPORT_STATS = [
  { v: 200, prefix: "$", suffix: "K+", k: "Ad spend managed", note: "Tracked from first click to a confirmed install." },
  { v: 2, prefix: "$", suffix: "", k: "Cost per tint inquiry", note: "As low as. Tint is our sharpest channel." },
  { v: 100, prefix: "", suffix: "%", k: "Autostyling only", note: "One industry. Zero generalist-agency noise." },
];

function Results() {
  return (
    <section className="sec results" id="results" data-screen-label="Results">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">The receipts</div>
          <Reveal as="h2" className="sec-h2">
            We don't pitch theory.<br /><span className="ig-em">The numbers talk.</span>
          </Reveal>
        </div>
      </div>

      {/* the two headline numbers — full-bleed, massive */}
      <div className="big-stats">
        <Reveal className="big-stat">
          <div className="big-stat-num"><Counter to={250} prefix="$" suffix="K+" duration={2200} /></div>
          <div className="big-stat-k">in booked appointments</div>
          <p className="big-stat-note">Real installs on real calendars — not clicks, not "leads." Confirmed jobs in client bays.</p>
        </Reveal>
        <div className="big-stat-rule" aria-hidden="true"></div>
        <Reveal className="big-stat" delay={120}>
          <div className="big-stat-num"><Counter to={2} prefix="$" suffix="M+" duration={2400} /></div>
          <div className="big-stat-k">in pipeline value</div>
          <p className="big-stat-note">Qualified demand generated for client shops — quotes out the door and deals in motion.</p>
        </Reveal>
      </div>

      <div className="wrap">
        <div className="stat-grid">
          {SUPPORT_STATS.map((s, i) => (
            <Reveal className="stat-card" delay={i * 90} key={i}>
              <SpotCard className="stat-card-in">
                <div className="stat-num"><Counter to={s.v} prefix={s.prefix} suffix={s.suffix} /></div>
                <div className="stat-k">{s.k}</div>
                <div className="stat-note">{s.note}</div>
              </SpotCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES ---------- */
const SERVICES = [
  { tag: "Flagship", name: "Window Tint", href: "window-tint.html", lead: true, desc: "Year-round demand, fast turnaround, our lowest cost per inquiry. The engine that keeps the schedule full in every season." },
  { tag: "High-ticket", name: "Paint Protection Film", href: "ppf.html", lead: true, desc: "Premium jobs, premium margins. We put your PPF work in front of owners who actually value their paint." },
  { tag: "Recurring", name: "Ceramic Coating", href: "ceramic.html", desc: "Upsell-ready campaigns that pair naturally with tint and PPF to raise your average ticket." },
  { tag: "Volume", name: "Mobile Detailing", href: "detailing.html", desc: "Keep techs busy between big installs with a steady stream of booked detailing appointments." },
  { tag: "Showpiece", name: "Vinyl Wrapping", href: "wrap.html", desc: "Build the brand — and the bookings — for your highest-visibility, highest-margin transformations." },
];

function Services({ onBook }) {
  return (
    <section className="sec services-sec" id="services" data-screen-label="Services">
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
            <Reveal className={`svc-wrap${s.lead ? " lead" : ""}`} delay={i * 70} key={i}>
              <SpotCard as="a" href={s.href} className={`svc-card${s.lead ? " lead" : ""} linked`}>
                <div className="svc-top">
                  <span className="svc-tag">{s.tag}</span>
                  <span className="svc-idx mono-tag dim">0{i + 1}</span>
                </div>
                <h3 className="svc-name">{s.name}</h3>
                <p className="svc-desc">{s.desc}</p>
                {s.lead && <span className="svc-flag"><span className="svc-flag-dot"></span>Top performer</span>}
                <span className="svc-more mono-tag">Learn more <span className="arrow">→</span></span>
              </SpotCard>
            </Reveal>
          ))}
          <Reveal className="svc-wrap" delay={SERVICES.length * 70}>
            <SpotCard className="svc-card svc-cta">
              <h3 className="svc-name">Run all five?<br /><span className="ig-em">Even better.</span></h3>
              <p className="svc-desc">We sequence campaigns so each service feeds the next and your average ticket climbs.</p>
              <Magnetic strength={0.2} style={{ marginTop: "auto" }}>
                <button className="btn btn-primary" onClick={onBook}>Book a strategy call<span className="arrow">→</span></button>
              </Magnetic>
            </SpotCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS — line draws down as you scroll ---------- */
const STEPS = [
  { n: "01", t: "Book a strategy call", d: "Tell us your shop, your services, and where you want to grow. We map the fastest path to a fuller calendar." },
  { n: "02", t: "We build the engine", d: "Custom creative, offers, and campaigns tuned to your market — launched on the channels your customers actually use." },
  { n: "03", t: "Appointments hit your calendar", d: "Qualified inquiries turn into booked jobs in your bay. You see every one, tracked end to end." },
  { n: "04", t: "We optimize & scale", d: "We cut what doesn't work, double down on what does, and push your cost per booking lower month over month." },
];

function Process() {
  const lineRef = useSecRef(null);
  const secRef = useSecRef(null);
  useSecEffect(() => {
    const sec = secRef.current, line = lineRef.current;
    if (!sec || !line) return;
    const onScroll = () => {
      if (motionLevel() === "off") { line.style.transform = "scaleY(1)"; return; }
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height)));
      line.style.transform = `scaleY(${p.toFixed(3)})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section className="sec process-sec grid-bg" id="process" ref={secRef} data-screen-label="Process">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">How it works</div>
          <Reveal as="h2" className="sec-h2">From first call to a<br /><span className="ig-em">full schedule.</span></Reveal>
        </div>
        <div className="step-rail">
          <div className="step-line"><span ref={lineRef}></span></div>
          <div className="step-grid">
            {STEPS.map((s, i) => (
              <Reveal className="step" delay={i * 90} key={i}>
                <div className="step-n"><span>{s.n}</span></div>
                <h3 className="step-t">{s.t}</h3>
                <p className="step-d">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS — placeholder quotes, swap in real ones ---------- */
// Anonymized client testimonials — swap WHO/WHERE for real names + cities once clients OK it.
const QUOTES = [
  {
    q: "We went from chasing referrals to a calendar that's booked two weeks out. Tint inquiries come in for a couple bucks each — I've never seen acquisition costs like it.",
    who: "Owner", where: "High-volume tint & PPF shop · Phoenix metro", featured: true,
  },
  { q: "We added mobile detailing to the mix and it filled the gaps between big installs almost immediately. Techs stay busy, revenue stays consistent.", who: "Owner", where: "Mobile detailing & ceramic studio · DFW" },
  { q: "They get our business. No explaining what PPF is, no wasted spend. Just installs on the schedule.", who: "Owner", where: "PPF & wrap shop · South Florida" },
];

function Testimonials() {
  return (
    <section className="sec quotes-sec" id="words" data-screen-label="Testimonials">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">From the shops</div>
          <Reveal as="h2" className="sec-h2">Owners keep the<br /><span className="ig-em">receipts too.</span></Reveal>
        </div>
        <div className="quote-grid">
          {QUOTES.map((t, i) => (
            <Reveal className={`quote-wrap${t.featured ? " featured" : ""}`} delay={i * 90} key={i}>
              <SpotCard className={`quote-card${t.featured ? " featured" : ""}`}>
                <span className="quote-mark" aria-hidden="true">“</span>
                <p className="quote-q">{t.q}</p>
                <div className="quote-who">
                  <Ball size={30} pulse={false} glow={false} />
                  <div>
                    <div className="quote-name">{t.who}</div>
                    <div className="mono-tag dim">{t.where}</div>
                  </div>
                </div>
              </SpotCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ onBook }) {
  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="wrap">
        <div className="footer-cta">
          <div>
            <div className="eyebrow">Ready when you are</div>
            <h2 className="footer-h2">Let's keep your<br /><span className="ig-em">bays booked.</span></h2>
          </div>
          <Magnetic>
            <button className="btn btn-primary footer-btn" onClick={onBook}>Book a strategy call<span className="arrow">→</span></button>
          </Magnetic>
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

Object.assign(window, { Nav, Results, Services, Process, Testimonials, Footer });
