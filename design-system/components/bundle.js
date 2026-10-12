/* @ds-bundle: {"format":4,"namespace":"PaysetWeb","components":[{"name":"Button"},{"name":"Tag"},{"name":"Pill"},{"name":"Logo"},{"name":"NavBar"},{"name":"Hero"},{"name":"TrustBox"},{"name":"PhotoCard"},{"name":"Tile"},{"name":"SectionCard"},{"name":"IconPoint"},{"name":"FeatureCard"},{"name":"ProductShowcase"},{"name":"Testimonial"},{"name":"CTABand"},{"name":"Footer"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  var LOGO = {
    green: "/_blob/11d41c5f02e06af250dcb0388b81bb7b",
    white: "/_blob/c87495c645008bc63cf85f21dfac96e5"
  };

  /* Trustpilot TrustBox templates used on payset.io and the Payset business unit. */
  var TRUSTPILOT = {
    businessUnitId: "61dd51c9957c497122f360e5",
    reviewUrl: "https://www.trustpilot.com/review/payset.io",
    light: "5419b732fbfb950b10de65e5",
    dark: "5419b637fa0340045cd0c936"
  };

  /* 2px-stroke glyphs for IconPoint circles. */
  var ICONS = {
    headset: ["M4 14v-2a8 8 0 0 1 16 0v2", "M4 14h3v5H5a1 1 0 0 1-1-1z", "M20 14h-3v5h2a1 1 0 0 0 1-1z", "M17 19c0 1.5-2 2-5 2"],
    bell: ["M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z", "M10 20a2 2 0 0 0 4 0"],
    layers: ["M12 3l9 5-9 5-9-5z", "M3 13l9 5 9-5"],
    badge: ["M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z", "M9 12l2 2 4-4"],
    vault: ["M4 5h16v14H4z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", "M7 19v2", "M17 19v2"],
    key: ["M14 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z", "M9.5 14.5L3 21", "M5 19l2 2", "M14 8v4"],
    globe: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M3 12h18", "M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z"],
    swap: ["M4 8h13l-3-3", "M20 16H7l3 3"],
    chart: ["M4 20V10", "M10 20V4", "M16 20v-7", "M22 20H2"]
  };

  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) { if (arguments[i]) out.push(arguments[i]); }
    return out.join(" ");
  }

  function Arrow() {
    return h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
      h("path", { d: "M5 12h14" }), h("path", { d: "M13 6l6 6-6 6" }));
  }

  function Glyph(props) {
    var paths = ICONS[props.name] || ICONS.headset;
    return h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
      paths.map(function (d, i) { return h("path", { key: i, d: d }); }));
  }

  /* Button: primary black pill with a neon label, contact neon rectangle, secondary outline, ghost, accent neon pill. */
  function Button(props) {
    var variant = props.variant || "primary";
    var size = props.size || "md";
    var cls = cx("pw-btn", "pw-btn--" + variant, "pw-btn--" + size, props.className);
    var kids = [props.children, props.arrow ? h(Arrow, { key: "a" }) : null];
    if (props.href) return h("a", { className: cls, href: props.href }, kids);
    return h("button", { type: props.type || "button", className: cls, onClick: props.onClick, disabled: props.disabled }, kids);
  }

  /* Tag: pill link at the foot of a tile or photo card; chip for segment lists on dark cards. */
  function Tag(props) {
    return h("a", { className: cx("pw-tag", "pw-tag--" + (props.tone || "light"), props.className), href: props.href || "#" }, props.children);
  }

  /* Pill: small uppercase label, e.g. "By invitation". */
  function Pill(props) {
    var tone = props.tone || "neutral";
    return h("span", { className: cx("pw-pill", "pw-pill--" + tone, props.className) },
      props.dot ? h("span", { className: "pw-pill__dot", "aria-hidden": "true" }) : null,
      props.children);
  }

  /* Logo: the Payset wordmark. onDark picks the white file; "auto" follows the theme. */
  function Logo(props) {
    var mode = props.onDark === true ? "dark" : props.onDark === false ? "light" : "auto";
    var height = props.height || 28;
    var style = { height: height + "px", width: "auto" };
    if (mode === "dark") return h("img", { className: "pw-logo", src: LOGO.white, alt: "Payset", style: style });
    if (mode === "light") return h("img", { className: "pw-logo", src: LOGO.green, alt: "Payset", style: style });
    return h("span", { className: "pw-logo-auto" },
      h("img", { className: "pw-logo pw-logo--onlight", src: LOGO.green, alt: "Payset", style: style }),
      h("img", { className: "pw-logo pw-logo--ondark", src: LOGO.white, alt: "", "aria-hidden": "true", style: style }));
  }

  /* NavBar: logo, page links, outlined Sign in and the black pill CTA. */
  function NavBar(props) {
    var tone = props.tone || "light";
    var dark = tone === "dark";
    var links = props.links || [];
    return h("header", { className: cx("pw-root", "pw-nav", "pw-nav--" + tone, dark ? "pw-on-dark" : null) },
      h("div", { className: "pw-container pw-nav__inner" },
        h("a", { className: "pw-nav__logo", href: props.homeHref || "/", "aria-label": "Payset home" }, h(Logo, { onDark: dark ? true : undefined })),
        h("nav", { "aria-label": "Main", style: { flex: 1, minWidth: 0 } },
          h("ul", { className: "pw-nav__links" }, links.map(function (l) {
            return h("li", { key: l.label }, h("a", { href: l.href || "#" }, l.label));
          }))),
        h("div", { className: "pw-nav__actions" },
          props.signInHref ? h(Button, { variant: "secondary", size: "md", href: props.signInHref, className: "pw-nav__signin" }, props.signInLabel || "Sign in") : null,
          h(Button, { variant: dark ? "accent" : "primary", size: "md", href: props.ctaHref || "#" }, props.ctaLabel || "Request an invitation"))));
  }

  /* TrustBox: Trustpilot widget markup. The page loads widget.trustpilot.com's bootstrap script; until it runs, the link shows. */
  function TrustBox(props) {
    var dark = props.theme === "dark";
    return h("div", {
      className: cx("trustpilot-widget", "pw-trustbox", props.className), "data-locale": "en-US",
      "data-template-id": dark ? TRUSTPILOT.dark : TRUSTPILOT.light,
      "data-businessunit-id": props.businessUnitId || TRUSTPILOT.businessUnitId,
      "data-style-height": dark ? "20px" : "24px", "data-style-width": "100%", "data-theme": dark ? "dark" : "light"
    }, h("a", { href: TRUSTPILOT.reviewUrl, target: "_blank", rel: "noopener" }, "Read our reviews on Trustpilot"));
  }

  /* Hero: centred display title, bold subtitle, contact + primary buttons and the TrustBox; or text beside an image on inner pages. */
  function Hero(props) {
    var dark = props.tone === "dark";
    var contact = props.contactCta || props.secondaryCta;
    var center = !props.image && props.align !== "left";
    return h("section", { className: cx("pw-root", "pw-hero", dark ? "pw-hero--dark pw-on-dark" : null, center ? "pw-hero--center" : null) },
      h("div", { className: "pw-container pw-hero__grid" },
        h("div", { className: "pw-hero__text" },
          props.eyebrow ? h(Pill, { tone: dark ? "inverse" : "neutral", dot: true }, props.eyebrow) : null,
          h("h1", { className: cx("pw-title", props.size === "h1" ? "pw-title--h1" : "pw-title--display") }, props.title),
          props.subtitle ? h("h2", { className: "pw-subtitle" }, props.subtitle) : null,
          props.lead ? h("p", { className: "pw-lead" }, props.lead) : null,
          (props.primaryCta || contact) ? h("div", { className: "pw-btn-row pw-btn-row--stack" },
            contact ? h(Button, { variant: "contact", size: "lg", href: contact.href || "#" }, contact.label) : null,
            props.primaryCta ? h(Button, { variant: dark ? "accent" : "primary", size: "lg", href: props.primaryCta.href || "#" }, props.primaryCta.label) : null) : null,
          props.trustpilot ? h(TrustBox, { theme: dark ? "dark" : "light" }) : null),
        props.image ? h("div", { className: "pw-hero__media" }, h("img", { src: props.image, alt: props.imageAlt || "" })) : null));
  }

  /* PhotoCard: a full-width photograph with a white title, glass amount rows and a tag. */
  function PhotoCard(props) {
    var rows = props.rows || [];
    return h("section", { className: "pw-root pw-photo-card" },
      h("img", { className: "pw-photo-card__img", src: props.image, alt: props.imageAlt || "" }),
      h("div", { className: "pw-photo-card__text" },
        h("h2", { className: "pw-title pw-title--card" }, props.title),
        props.body ? h("p", null, props.body) : null),
      rows.length ? h("ul", { className: "pw-glass", "aria-label": props.rowsLabel || "Example payments" }, rows.map(function (r) {
        return h("li", { key: r.label }, h("span", null, h("b", null, r.label), r.status ? h("small", null, r.status) : null), h("strong", null, r.amount));
      })) : null,
      props.tag ? h("div", null, h(Tag, { tone: props.tag.tone || "neon", href: props.tag.href }, props.tag.label)) : null);
  }

  /* Tile: one bento tile. object = a 3D render bleeding off the corner; ui = a Product UI render on stone. */
  function Tile(props) {
    var tone = props.tone || "taupe";
    return h("article", { className: cx("pw-root", "pw-tile", "pw-tile--" + tone, props.tall ? "pw-tile--tall" : null) },
      h("div", { className: "pw-tile__text" },
        h("h3", { className: "pw-title pw-title--h4" }, props.title),
        props.body ? h("p", null, props.body) : null),
      props.object ? h("img", { className: "pw-tile__object", src: props.object, alt: "" }) : null,
      props.ui ? h("img", { className: "pw-tile__ui", src: props.ui, alt: props.uiAlt || "" }) : null,
      props.tag ? h("div", { className: "pw-tile__foot" }, h(Tag, { tone: props.tag.tone || "light", href: props.tag.href }, props.tag.label)) : null);
  }

  /* SectionCard: centred giant title and lead on a stone, dark or green card; children below. */
  function SectionCard(props) {
    var tone = props.tone || "stone";
    return h("section", { className: cx("pw-root", "pw-section-card", "pw-section-card--" + tone, tone !== "stone" ? "pw-on-dark" : null) },
      h("h2", { className: "pw-title pw-title--giant" }, props.title),
      props.lead ? h("p", { className: "pw-lead" }, props.lead) : null,
      props.children);
  }

  /* IconPoint: a 2px glyph in a circle, a title and one line; use three inside a .pw-points row. */
  function IconPoint(props) {
    return h("div", { className: "pw-point" },
      h("span", { className: "pw-point__icon" }, h(Glyph, { name: props.icon })),
      h("h3", null, props.title),
      props.body ? h("p", null, props.body) : null);
  }

  /* FeatureCard: a 3D object above a short title and paragraph. */
  function FeatureCard(props) {
    var tone = props.tone || "raised";
    return h("article", { className: cx("pw-root", "pw-feature", tone !== "raised" ? "pw-feature--" + tone : null, tone === "brand" ? "pw-on-dark" : null) },
      props.image ? h("div", { className: "pw-feature__media" }, h("img", { src: props.image, alt: props.imageAlt || "" })) : null,
      h("h3", { className: "pw-title pw-title--h4" }, props.title),
      props.body ? h("p", { className: "pw-body" }, props.body) : null,
      props.link ? h("div", null, h(Button, { variant: "ghost", size: "md", href: props.link.href || "#", arrow: true }, props.link.label)) : null);
  }

  /* ProductShowcase: a Product UI render on the stone ground beside copy. */
  function ProductShowcase(props) {
    return h("div", { className: cx("pw-root", "pw-showcase", props.reverse ? "pw-showcase--reverse" : null) },
      h("div", { className: "pw-showcase__media" }, h("img", { src: props.image, alt: props.imageAlt || "" })),
      h("div", { className: "pw-showcase__text" },
        props.eyebrow ? h("p", { className: "pw-overline" }, props.eyebrow) : null,
        h("h3", { className: "pw-title pw-title--card" }, props.title),
        props.body ? h("p", { className: "pw-body" }, props.body) : null,
        props.points ? h("ul", { style: { margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }, className: "pw-body" },
          props.points.map(function (p) { return h("li", { key: p }, p); })) : null));
  }

  /* Testimonial: a media frame beside a dark panel with the quote, name, role and company. */
  function Testimonial(props) {
    return h("figure", { className: "pw-root pw-quote", style: { margin: 0 } },
      h("div", { className: "pw-quote__photo" }, props.photo ? h("img", { src: props.photo, alt: props.photoAlt || "" }) : null),
      h("div", { className: "pw-quote__body" },
        h("blockquote", { className: "pw-quote__text", style: { margin: 0 } }, props.quote),
        h("figcaption", { className: "pw-quote__who" },
          h("span", { className: "pw-quote__name" }, props.name),
          props.role ? h("span", null, props.role) : null,
          props.company ? h("span", null, props.company) : null)));
  }

  /* CTABand: the closing card: giant title, lead, contact + primary buttons, optional TrustBox. */
  function CTABand(props) {
    var tone = props.tone || "stone";
    var dark = tone !== "stone";
    return h("section", { className: cx("pw-root", "pw-cta", tone !== "stone" ? "pw-cta--" + tone : null, dark ? "pw-on-dark" : null) },
      h("div", { className: "pw-cta__text" },
        props.eyebrow ? h("p", { className: "pw-overline" }, props.eyebrow) : null,
        h("h2", { className: "pw-title pw-title--giant" }, props.title),
        props.body ? h("p", { className: "pw-lead" }, props.body) : null),
      h("div", { className: "pw-btn-row pw-btn-row--stack" },
        props.secondaryLabel ? h(Button, { variant: "contact", size: "lg", href: props.secondaryHref || "#" }, props.secondaryLabel) : null,
        h(Button, { variant: dark ? "accent" : "primary", size: "lg", href: props.ctaHref || "#" }, props.ctaLabel || "Request an invitation")),
      props.trustpilot ? h(TrustBox, { theme: dark ? "dark" : "light" }) : null);
  }

  /* Footer: light footer with the green logo, link columns and the regulatory line. */
  function Footer(props) {
    var cols = props.columns || [];
    return h("footer", { className: "pw-root pw-footer" },
      h("div", { className: "pw-container" },
        h("div", { className: "pw-footer__top" },
          h("div", { className: "pw-footer__brand" }, h(Logo, { onDark: false }), props.tagline ? h("p", { className: "pw-body", style: { margin: 0, maxWidth: "32ch" } }, props.tagline) : null),
          cols.map(function (c) {
            return h("nav", { className: "pw-footer__col", key: c.title, "aria-label": c.title },
              h("h3", null, c.title),
              h("ul", null, (c.links || []).map(function (l) { return h("li", { key: l.label }, h("a", { href: l.href || "#" }, l.label)); })));
          })),
        props.legal ? h("p", { className: "pw-footer__legal", style: { margin: 0 } }, props.legal) : null));
  }

  window.PaysetWeb = {
    Button: Button,
    Tag: Tag,
    Pill: Pill,
    Logo: Logo,
    NavBar: NavBar,
    Hero: Hero,
    TrustBox: TrustBox,
    PhotoCard: PhotoCard,
    Tile: Tile,
    SectionCard: SectionCard,
    IconPoint: IconPoint,
    FeatureCard: FeatureCard,
    ProductShowcase: ProductShowcase,
    Testimonial: Testimonial,
    CTABand: CTABand,
    Footer: Footer
  };
})();
