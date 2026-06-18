// book.jsx — booking section with the live GoHighLevel (LeadConnector) calendar embed
const GHL_BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/ID4iDYXACVn8Gl4bRsIm";
const GHL_EMBED_SCRIPT = "https://link.msgsndr.com/js/form_embed.js";

const BOOK_POINTS = [
  { t: "20 minutes, no pitch deck", d: "We look at your shop, your market, and your current booking flow." },
  { t: "You leave with a plan", d: "Even if we never work together — you'll know your fastest path to a fuller calendar." },
  { t: "Autostyling only", d: "You won't be explaining what PPF is. We already know your business." },
];

function BookSection() {
  const loaded = useRef(false);
  useEffect(() => {
    // load the LeadConnector embed script once so the iframe auto-sizes
    if (loaded.current) return;
    loaded.current = true;
    if (document.querySelector(`script[src="${GHL_EMBED_SCRIPT}"]`)) return;
    const s = document.createElement("script");
    s.src = GHL_EMBED_SCRIPT;
    s.type = "text/javascript";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section className="sec book-sec" id="book" data-screen-label="Book a call">
      <div className="wrap book-inner">
        <div className="book-lead">
          <div className="eyebrow">Book a strategy call</div>
          <Reveal as="h2" className="sec-h2">Grab a slot.<br /><span className="ig-em">Light it up.</span></Reveal>
          <div className="book-points">
            {BOOK_POINTS.map((p, i) => (
              <Reveal className="book-point" delay={100 + i * 90} key={i}>
                <span className="book-point-dot"><span></span></span>
                <div>
                  <div className="book-point-t">{p.t}</div>
                  <p className="book-point-d">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="book-embed-wrap" delay={140}>
          <div className="book-embed" id="ghl-embed">
            <iframe
              src={GHL_BOOKING_URL}
              title="Book a strategy call"
              scrolling="no"
              id="ID4iDYXACVn8Gl4bRsIm_1781763992059"
              style={{ width: "100%", border: "none", overflow: "hidden" }}
            ></iframe>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { BookSection });
