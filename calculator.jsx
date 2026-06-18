// calculator.jsx — interactive ROI calculator ("The math")
const { useState: useCalcState, useEffect: useCalcEffect, useRef: useCalcRef } = React;

/* tween a displayed number toward its target */
function useTween(target, speed = 0.14) {
  const [shown, setShown] = useCalcState(target);
  const raf = useCalcRef(null);
  const cur = useCalcRef(target);
  useCalcEffect(() => {
    if (motionLevel() === "off") { cur.current = target; setShown(target); return; }
    const loop = () => {
      cur.current += (target - cur.current) * speed;
      if (Math.abs(target - cur.current) < Math.max(1, target * 0.001)) {
        cur.current = target;
        setShown(target);
        raf.current = null;
        return;
      }
      setShown(cur.current);
      raf.current = requestAnimationFrame(loop);
    };
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(loop);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, speed]);
  return shown;
}

function CalcSlider({ label, value, onChange, min, max, step, fmt }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="calc-slider">
      <span className="calc-slider-head">
        <span className="mono-tag">{label}</span>
        <span className="calc-slider-val">{fmt(value)}</span>
      </span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--p": `${pct}%` }}
      />
      <span className="calc-slider-ends mono-tag dim"><span>{fmt(min)}</span><span>{fmt(max)}</span></span>
    </label>
  );
}

const money = (n) => "$" + Math.round(n).toLocaleString();

function Calculator({ onBook }) {
  const [jobs, setJobs] = useCalcState(6);
  const [ticket, setTicket] = useCalcState(450);

  const monthly = jobs * 4.33 * ticket;
  const yearly = monthly * 12;
  const shownMonthly = useTween(monthly);
  const shownYearly = useTween(yearly);

  return (
    <section className="sec calc-sec" id="math" data-screen-label="ROI calculator">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">The math</div>
          <Reveal as="h2" className="sec-h2">What a fuller calendar<br /><span className="ig-em">is worth to you.</span></Reveal>
          <Reveal as="p" className="sec-lede" delay={80}>
            Drag the sliders. This is your shop's upside — extra installs we book, times what each one pays.
          </Reveal>
        </div>

        <Reveal className="calc-panel-wrap" delay={120}>
          <div className="calc-panel">
            <div className="calc-inputs">
              <CalcSlider
                label="Extra installs / week" value={jobs} onChange={setJobs}
                min={1} max={25} step={1} fmt={(v) => `${v}`} />
              <CalcSlider
                label="Average ticket" value={ticket} onChange={setTicket}
                min={150} max={3000} step={50} fmt={money} />
              <p className="calc-note mono-tag dim">
                Tint avg ≈ $350 · PPF ≈ $1,800 · Ceramic ≈ $900
              </p>
            </div>
            <div className="calc-out">
              <div className="calc-out-cell">
                <div className="mono-tag dim">Added revenue / month</div>
                <div className="calc-num">{money(shownMonthly)}</div>
              </div>
              <div className="calc-out-rule" aria-hidden="true"></div>
              <div className="calc-out-cell">
                <div className="mono-tag dim">Added revenue / year</div>
                <div className="calc-num big ig-em">{money(shownYearly)}</div>
              </div>
              <Magnetic style={{ alignSelf: "flex-start" }}>
                <button className="btn btn-primary" onClick={onBook}>Make it real<span className="arrow">→</span></button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Calculator });
