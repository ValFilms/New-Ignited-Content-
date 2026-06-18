// hero.jsx — cinematic hero: intro choreography, cursor-parallax ball, live dashboard
const { useEffect: useHeroEffect, useRef: useHeroRef, useState: useHeroState } = React;

/* sparkline path that draws itself in when visible */
function Sparkline({ points = [88, 70, 74, 52, 47, 38, 30, 24, 18, 12], w = 280, h = 64 }) {
  const ref = useHeroRef(null);
  const step = w / (points.length - 1);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${((p / 100) * h).toFixed(1)}`).join(" ");
  useHeroEffect(() => {
    const path = ref.current;
    if (!path) return;
    if (motionLevel() === "off") return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          path.style.transition = "stroke-dashoffset 2.2s cubic-bezier(0.22,1,0.36,1) .4s";
          path.style.strokeDashoffset = "0";
          io.disconnect();
        }
      });
    }, { threshold: 0.5 });
    io.observe(path);
    return () => io.disconnect();
  }, []);
  return (
    <svg className="spark-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ignite)" stopOpacity="0.35"></stop>
          <stop offset="100%" stopColor="var(--ignite)" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#sparkFill)" stroke="none" opacity="0.8"></path>
      <path ref={ref} d={d} fill="none" stroke="var(--ignite-2)" strokeWidth="2.5" strokeLinecap="round"></path>
    </svg>
  );
}

/* live readout dashboard card */
function HeroDash() {
  const [inq, setInq] = useHeroState(23);
  const [flash, setFlash] = useHeroState(false);
  useHeroEffect(() => {
    if (motionLevel() === "off") return;
    let alive = true, timer;
    const schedule = () => {
      timer = setTimeout(() => {
        if (!alive) return;
        setInq((v) => v + 1);
        setFlash(true);
        setTimeout(() => alive && setFlash(false), 900);
        schedule();
      }, 4200 + Math.random() * 4200);
    };
    schedule();
    return () => { alive = false; clearTimeout(timer); };
  }, []);
  return (
    <div className="hero-dash hi" style={{ "--hd": "650ms" }}>
      <div className="dash-head">
        <span className={`dash-dot${flash ? " hot" : ""}`}></span>
        <span className="mono-tag">Live · campaign readout</span>
        <span className="mono-tag dim dash-week">This week</span>
      </div>
      <div className="dash-big">
        <div className="mono-tag dim">Booked appointments — to date</div>
        <div className="dash-num"><Counter to={250} prefix="$" suffix="K+" duration={2200} /></div>
        <Sparkline points={[86, 78, 80, 64, 58, 60, 44, 38, 26, 14]} />
      </div>
      <div className="dash-split">
        <div className="dash-cell">
          <div className="mono-tag dim">Pipeline value</div>
          <div className="dash-num sm"><Counter to={2} prefix="$" suffix="M+" duration={2400} /></div>
        </div>
        <div className="dash-cell">
          <div className="mono-tag dim">Cost / tint inquiry</div>
          <div className="dash-num sm"><Counter to={2} prefix="$" duration={2400} /></div>
        </div>
      </div>
      <div className="dash-foot">
        <span className="mono-tag dim">New inquiries</span>
        <span className={`dash-inq${flash ? " bump" : ""}`}>{inq}</span>
        <span className="dash-gauge"><span style={{ width: "94%" }}></span></span>
        <span className="mono-tag dim">94% calendar fill</span>
      </div>
    </div>
  );
}

function Hero({ onBook }) {
  const stageRef = useHeroRef(null);
  const ballRef = useHeroRef(null);
  const glowRef = useHeroRef(null);
  const [lit, setLit] = useHeroState(false);

  /* ignition: flip the stage to .lit shortly after mount */
  useHeroEffect(() => {
    const t = setTimeout(() => setLit(true), 120);
    return () => clearTimeout(t);
  }, []);

  /* cursor parallax on the ball (lerped) */
  useHeroEffect(() => {
    const stage = stageRef.current, ball = ballRef.current, glow = glowRef.current;
    if (!stage || !ball) return;
    let raf = null, tx = 0, ty = 0, cx = 0, cy = 0;
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      ball.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px)`;
      if (glow) glow.style.transform = `translate(${(cx * 0.6).toFixed(1)}px, ${(cy * 0.6).toFixed(1)}px)`;
      if (Math.abs(tx - cx) > 0.15 || Math.abs(ty - cy) > 0.15) raf = requestAnimationFrame(loop);
      else raf = null;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const onMove = (e) => {
      const lvl = motionLevel();
      if (lvl === "off") return;
      const f = lvl === "full" ? 1 : 0.4;
      const r = stage.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 56 * f;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 40 * f;
      kick();
    };
    const onLeave = () => { tx = 0; ty = 0; kick(); };
    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);
    return () => {
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={`hero hero-stage grid-bg${lit ? " lit" : ""}`} ref={stageRef} data-screen-label="Hero">
      <div className="hero-sun" ref={glowRef}></div>
      <div className="hero-ball" ref={ballRef}>
        <Ball size={420} pulse glow />
      </div>
      <div className="wrap hero-inner">
        <div className="hero-lead">
          <div className="eyebrow hi" style={{ "--hd": "80ms" }}>Marketing for autostyling shops</div>
          <h1 className="hero-h1">
            <span className="hl"><span className="hi" style={{ "--hd": "180ms" }}>Every bay.</span></span>
            <span className="hl"><span className="hi ig-em" style={{ "--hd": "300ms" }}>Booked.</span></span>
            <span className="hl"><span className="hi" style={{ "--hd": "420ms" }}>All year.</span></span>
          </h1>
          <p className="hero-sub hi" style={{ "--hd": "540ms" }}>
            Tint, PPF &amp; ceramic shops hire us to turn ad spend into installs on the
            calendar — <strong>$250K+ booked</strong> and <strong>$2M+ in pipeline</strong> so far.
          </p>
          <div className="hero-ctas hi" style={{ "--hd": "640ms" }}>
            <Magnetic><button className="btn btn-primary" onClick={onBook}>Book a strategy call<span className="arrow">→</span></button></Magnetic>
            <Magnetic strength={0.22}><a className="btn btn-ghost" href="#results">See the receipts</a></Magnetic>
          </div>
          <div className="hero-trust hi" style={{ "--hd": "760ms" }}>
            <span className="mono-tag dim">Tint · PPF · Ceramic · Detailing · Wrap</span>
          </div>
        </div>
        <HeroDash />
      </div>
      <div className="hero-scroll hi" style={{ "--hd": "900ms" }} aria-hidden="true">
        <span className="hero-scroll-line"></span>
        <span className="mono-tag dim">Scroll</span>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, HeroDash, Sparkline });
