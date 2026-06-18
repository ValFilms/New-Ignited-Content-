// app.jsx — composition + Tweaks
const { useEffect: useAppEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "ember",
  "typeface": "expanded",
  "motion": "full"
}/*EDITMODE-END*/;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
}

const ACCENT_OPTS = [
  { value: "ember", label: "Ember" },
  { value: "amber", label: "Amber" },
  { value: "red", label: "Red" },
  { value: "lime", label: "Lime" },
];
const TYPE_OPTS = [
  { value: "expanded", label: "Expanded" },
  { value: "grotesk", label: "Grotesk" },
  { value: "mono", label: "Mono" },
];
const MOTION_OPTS = [
  { value: "full", label: "Full" },
  { value: "subtle", label: "Subtle" },
  { value: "off", label: "Off" },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const onBook = () => scrollToId("book");

  useAppEffect(() => {
    const root = document.documentElement;
    if (t.accent && t.accent !== "ember") root.setAttribute("data-accent", t.accent);
    else root.removeAttribute("data-accent");
    if (t.typeface && t.typeface !== "expanded") root.setAttribute("data-typeface", t.typeface);
    else root.removeAttribute("data-typeface");
    root.setAttribute("data-motion", t.motion || "full");
  }, [t.accent, t.typeface, t.motion]);

  return (
    <div id="top">
      <Nav onBook={onBook} />
      <Hero onBook={onBook} />
      <Marquee items={["Window Tint", "Paint Protection Film", "Ceramic Coating", "Mobile Detailing", "Vinyl Wrap", "Year-Round Demand"]} />
      <Results />
      <Services onBook={onBook} />
      <Process />
      <Testimonials />
      <Calculator onBook={onBook} />
      <BookSection />
      <Footer onBook={onBook} />

      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakRadio label="Accent" value={t.accent}
          options={ACCENT_OPTS}
          onChange={(v) => setTweak("accent", v)} />
        <TweakRadio label="Typeface" value={t.typeface}
          options={TYPE_OPTS}
          onChange={(v) => setTweak("typeface", v)} />
        <TweakSection label="Motion" />
        <TweakRadio label="Animation intensity" value={t.motion}
          options={MOTION_OPTS}
          onChange={(v) => setTweak("motion", v)} />
      </TweaksPanel>
    </div>
  );
}

/* set motion attr before first paint so intro choreography lands correctly */
document.documentElement.setAttribute("data-motion", "full");

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
