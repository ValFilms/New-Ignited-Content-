// ui.jsx — shared primitives: Ball, Counter, Reveal, Marquee, useReveal
const { useState, useEffect, useRef } = React;

/* The Ignited ball — a CSS radial-gradient sphere */
function Ball({ size = 64, glow = true, pulse = true, style = {}, className = "" }) {
  return (
    <span
      className={`ball${glow ? " glow" : ""}${pulse ? " pulse" : ""} ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    />
  );
}

/* Count-up number that fires when scrolled into view */
function Counter({ to, duration = 1600, prefix = "", suffix = "", decimals = 0, className = "", style = {} }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  const shown = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return <span ref={ref} className={className} style={style}>{prefix}{shown}{suffix}</span>;
}

/* Scroll reveal wrapper */
function Reveal({ children, delay = 0, as = "div", className = "", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); } });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</Tag>;
}

/* Infinite marquee of pills */
function Marquee({ items, className = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track">
        {row.map((it, i) => (
          <span className="marquee-item" key={i}>
            <span className="marquee-dot" />{it}
          </span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Ball, Counter, Reveal, Marquee });
