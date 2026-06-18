// ui.jsx — shared primitives: Ball, Counter, Reveal, Marquee, Magnetic, hooks
const { useState, useEffect, useRef, useCallback } = React;

/* current motion level: "full" | "subtle" | "off" (reads the attr App sets) */
function motionLevel() {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
  return document.documentElement.getAttribute("data-motion") || "full";
}

/* The Ignited ball — a CSS radial-gradient sphere */
function Ball({ size = 64, glow = true, pulse = true, style = {}, className = "" }) {
  return (
    <span
      className={`ball${glow ? " glow" : ""}${pulse ? " pulse" : ""} ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    ></span>
  );
}

/* Count-up number that fires when scrolled into view */
function Counter({ to, duration = 1800, prefix = "", suffix = "", decimals = 0, className = "", style = {} }) {
  const [val, setVal] = useState(motionLevel() === "off" ? to : 0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (motionLevel() === "off") { setVal(to); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 4);
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
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</Tag>;
}

/* Magnetic wrapper — child element eases toward the cursor.
   Also feeds --mx/--my (cursor position in %) for spotlight effects. */
function Magnetic({ children, strength = 0.32, className = "", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = null, tx = 0, ty = 0, cx = 0, cy = 0, active = false;
    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1 || active) raf = requestAnimationFrame(loop);
      else { raf = null; if (tx === 0 && ty === 0) el.style.transform = ""; }
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const onMove = (e) => {
      if (motionLevel() !== "full") return;
      const r = el.getBoundingClientRect();
      const relX = e.clientX - r.left, relY = e.clientY - r.top;
      el.style.setProperty("--mx", `${((relX / r.width) * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${((relY / r.height) * 100).toFixed(1)}%`);
      tx = (relX - r.width / 2) * strength;
      ty = (relY - r.height / 2) * strength;
      active = true; kick();
    };
    const onLeave = () => { tx = 0; ty = 0; active = false; kick(); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);
  return <span ref={ref} className={`magnetic ${className}`} style={{ display: "inline-block", ...style }}>{children}</span>;
}

/* Spotlight — sets --mx/--my (in px) on hover for border/glow tracking */
function useSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - r.left}px`);
      el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
  return ref;
}

function SpotCard({ children, className = "", style = {}, as = "div", ...rest }) {
  const ref = useSpotlight();
  const Tag = as;
  return <Tag ref={ref} className={`spot-card ${className}`} style={style} {...rest}>{children}</Tag>;
}

/* Infinite marquee of pills */
function Marquee({ items, className = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {row.map((it, i) => (
          <span className="marquee-item" key={i}>
            <span className="marquee-dot"></span>{it}
          </span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Ball, Counter, Reveal, Marquee, Magnetic, SpotCard, useSpotlight, motionLevel });
