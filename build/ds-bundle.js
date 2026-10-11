/* @ds-bundle: {"format":4,"namespace":"PaysetWeb","components":[{"name":"Button"},{"name":"Pill"},{"name":"Logo"},{"name":"NavBar"},{"name":"Hero"},{"name":"FeatureCard"},{"name":"ProductShowcase"},{"name":"Testimonial"},{"name":"CTABand"},{"name":"Footer"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  var LOGO = {
    green: "/assets/logo-green.svg",
    white: "/assets/logo-white.svg"
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

  /* Button: pill-shaped action. Renders <a> when href is given, else <button>. */
  function Button(props) {
    var variant = props.variant || "primary";
    var size = props.size || "md";
    var cls = cx("pw-btn", "pw-btn--" + variant, "pw-btn--" + size, props.className);
    var kids = [props.children, props.arrow ? h(Arrow, { key: "a" }) : null];
    if (props.href) return h("a", { className: cls, href: props.href }, kids);
    return h("button", { type: props.type || "button", className: cls, onClick: props.onClick, disabled: props.disabled }, kids);
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

  /* NavBar: top navigation with the logo, page links and the invitation CTA. */
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
          props.signInHref ? h(Button, { variant: "ghost", size: "md", href: props.signInHref, className: "pw-nav__signin" }, props.signInLabel || "Sign in") : null,
          h(Button, { variant: dark ? "accent" : "primary", size: "md", href: props.ctaHref || "#" }, props.ctaLabel || "Request an invitation"))));
  }

  /* Hero: page opener. Title, lead, up to two CTAs and an optional image. */
  function Hero(props) {
    var dark = props.tone === "dark";
    var center = !props.image && props.align !== "left";
    return h("section", { className: cx("pw-root", "pw-hero", dark ? "pw-hero--dark pw-on-dark" : null, center ? "pw-hero--center" : null) },
      h("div", { className: "pw-container pw-hero__grid" },
        h("div", { className: "pw-hero__text" },
          props.eyebrow ? h(Pill, { tone: dark ? "inverse" : "neutral", dot: true }, props.eyebrow) : null,
          h("h1", { className: cx("pw-title", props.size === "h1" ? "pw-title--h1" : "pw-title--display") }, props.title),
          props.lead ? h("p", { className: "pw-lead" }, props.lead) : null,
          (props.primaryCta || props.secondaryCta) ? h("div", { className: "pw-btn-row", style: { marginTop: "8px", justifyContent: center ? "center" : "flex-start" } },
            props.primaryCta ? h(Button, { variant: dark ? "accent" : "primary", size: "lg", href: props.primaryCta.href || "#", arrow: true }, props.primaryCta.label) : null,
            props.secondaryCta ? h(Button, { variant: "secondary", size: "lg", href: props.secondaryCta.href || "#" }, props.secondaryCta.label) : null) : null),
        props.image ? h("div", { className: "pw-hero__media" }, h("img", { src: props.image, alt: props.imageAlt || "" })) : null));
  }

  /* FeatureCard: a 3D object above a short title and paragraph. */
  function FeatureCard(props) {
    var tone = props.tone || "raised";
    return h("article", { className: cx("pw-root", "pw-feature", tone !== "raised" ? "pw-feature--" + tone : null, tone === "brand" ? "pw-on-brand" : null) },
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
        h("h3", { className: "pw-title pw-title--h3" }, props.title),
        props.body ? h("p", { className: "pw-body" }, props.body) : null,
        props.points ? h("ul", { style: { margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }, className: "pw-body" },
          props.points.map(function (p) { return h("li", { key: p }, p); })) : null));
  }

  /* Testimonial: a client photo with their quote, name and role. */
  function Testimonial(props) {
    return h("figure", { className: "pw-root pw-quote", style: { margin: 0 } },
      h("div", { className: "pw-quote__photo" }, props.photo ? h("img", { src: props.photo, alt: props.photoAlt || "" }) : null),
      h("div", { className: "pw-quote__body" },
        h("blockquote", { className: "pw-quote__text", style: { margin: 0 } }, props.quote),
        h("figcaption", { className: "pw-quote__who" },
          h("span", { className: "pw-quote__name" }, props.name),
          h("span", { className: "pw-quote__role" }, [props.role, props.company].filter(Boolean).join(", ")))));
  }

  /* CTABand: closing call to action on a dark or money-green band. */
  function CTABand(props) {
    var brand = props.tone === "brand";
    return h("section", { className: cx("pw-root", "pw-cta", brand ? "pw-cta--brand pw-on-brand" : null, "pw-on-dark") },
      h("div", { className: "pw-cta__text" },
        props.eyebrow ? h("p", { className: "pw-overline" }, props.eyebrow) : null,
        h("h2", { className: "pw-title pw-title--h2" }, props.title),
        props.body ? h("p", { className: "pw-lead" }, props.body) : null),
      h("div", { className: "pw-btn-row" },
        h(Button, { variant: "accent", size: "lg", href: props.ctaHref || "#", arrow: true }, props.ctaLabel || "Request an invitation"),
        props.secondaryLabel ? h(Button, { variant: "secondary", size: "lg", href: props.secondaryHref || "#" }, props.secondaryLabel) : null));
  }

  /* Footer: link columns, the white logo and the regulatory line. */
  function Footer(props) {
    var cols = props.columns || [];
    return h("footer", { className: "pw-root pw-footer pw-on-dark" },
      h("div", { className: "pw-container" },
        h("div", { className: "pw-footer__top" },
          h("div", { className: "pw-footer__brand" }, h(Logo, { onDark: true }), props.tagline ? h("p", { className: "pw-body", style: { margin: 0, maxWidth: "32ch" } }, props.tagline) : null),
          cols.map(function (c) {
            return h("nav", { className: "pw-footer__col", key: c.title, "aria-label": c.title },
              h("h3", null, c.title),
              h("ul", null, (c.links || []).map(function (l) { return h("li", { key: l.label }, h("a", { href: l.href || "#" }, l.label)); })));
          })),
        props.legal ? h("p", { className: "pw-footer__legal", style: { margin: 0 } }, props.legal) : null));
  }

  window.PaysetWeb = {
    Button: Button,
    Pill: Pill,
    Logo: Logo,
    NavBar: NavBar,
    Hero: Hero,
    FeatureCard: FeatureCard,
    ProductShowcase: ProductShowcase,
    Testimonial: Testimonial,
    CTABand: CTABand,
    Footer: Footer
  };
})();
