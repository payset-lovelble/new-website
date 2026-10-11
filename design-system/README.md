Building mockups using Claude should use this design system.

Payset is an FCA-authorised electronic money institution in London. The website, payset.io, sells: multi-currency accounts, FX and cross-border payments for companies that move large volumes and want a dedicated account manager on call. Membership is by invitation. Every page should feel like a private bank's front door: calm, warm, confident and selective, never a self-serve fintech funnel.

Use this system for payset.io pages, landing pages and marketing visuals. For the internal admin product, use the Payset Backoffice system instead. Both share the same brand colours (money green, neon accent, charcoal, rice) and the same names for them.

## Content fundamentals

### Voice
- **Private, plain and assured.** Write like a senior relationship manager talking to a CFO. Short declarative sentences. No hype, no exclamation marks, no emoji.
- **Selective, not exclusive-sounding.** Say who it's for and what they get. Avoid "elite", "VIP" and "luxury".
- **We and you.** Payset is "we", the client is "you". Name the person who helps: "your account manager", not "our support team".
- **Specific over clever.** "Two signatures on every payment over 10 000 EUR" beats "Total control".

### Lines to reuse
- Home H1: **A private financial institution, by invitation.**
- Primary CTA: **Request an invitation**. Secondary: **Talk to us**. Existing clients: **Sign in**.
- Never use: "Sign up free", "Open an account in minutes", "Get started".

### Casing and punctuation
- Sentence case for headlines, buttons, nav and labels. Uppercase only through the `overline` style (eyebrows, pills).
- Headlines end with a full stop when they're a sentence ("Membership is by invitation."). Labels and buttons don't.
- Use the single ellipsis character (…) and the middle dot (·) for inline separators.

### Numbers and money
- Amounts: number, a space as the thousands separator, then the ISO code: **10 000 EUR**, **53 250.00 EUR**. This matches the product UI renders.
- Large figures use the `figure` style with tabular numerals.
- Never invent statistics, client counts, volumes or ratings. Leave a bracketed placeholder ("[CURRENCY COUNT]") until the figure is confirmed.

### Testimonials and regulatory copy
- Quotes must be real, approved and attributed to a named client. Never write them for a client.
- Every page carries the FCA line in the `Footer`: "Pay Set Limited is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011 (FRN [FRN])." Don't call Payset a bank.

## Visual foundations

### Colour
- **Ground:** `surface` (warm cream `rice-00`) in the light theme, `brand-charcoal` in the dark theme. Alternate long pages with `surface-subtle` bands.
- **Text:** `ink` for headlines and body, `ink-muted` for leads and captions, `ink-brand` for eyebrows and inline links.
- **Money green** (`brand-money`, #256C4A) is the brand. Use it for the primary button on light grounds, one emphasised card per row (`FeatureCard` tone `brand`) and full-bleed brand bands (`surface-brand`).
- **Neon accent** (`brand-accent`, #00F572) only appears on dark grounds (`surface-inverse`, `surface-brand`, `stone`, photos), always with `on-accent` (charcoal) text. Never use it as text on cream, and never put white text on it.
- **Stone** (`surface-showcase`, #706E67) exists only behind Product UI renders, which have that ground baked in.
- **Dark bands:** `surface-inverse` with `ink-inverse` text and the accent button. Footer and CTA band use it in both themes.
- No gradients, glows or glass. Colour comes in solid fields.

### Typography
- One family: **Rebond Grotesque** (`--font-sans`), the Payset brand face. Weights 400, 500 and 600.
- The licensed Rebond files aren't loaded in this system yet. Every style falls back to **Public Sans** from Google Fonts, which has close metrics. Load it with `https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600&display=swap` until the Rebond .woff2 files are added under `fonts/`.
- Use `display` once, for the home hero. Use `h1` for inner-page heroes, `h2` for section titles, `h3` for showcase titles and `h4` for card titles. Headlines use negative tracking (in the tokens) and `text-wrap: balance`.
- Use `lead` (20/30, `ink-muted`) under every hero and section title, `body` for running copy (max 64ch), and `overline` for eyebrows.
- Under 768px: `display` 48/48, `h1` 40/44, `h2` 32/38, `h3` 24/32.

### Spacing and layout
- 8px rhythm. Content sits in a centred `container-max` (1280px) with `space-24` side gutters (`space-16` on mobile).
- Sections get `space-128` vertical padding on desktop and 72px on mobile. Heros get `space-96`.
- Title block to content: `space-64`. Text column to media: `space-48`. Grid gaps: `space-24`.
- Grids: three feature cards per row on desktop, one on mobile. Showcases alternate image side down the page (`reverse`).

### Radii, borders, shadows
- Soft, rounded objects: the 3D renders are pills and rounded tablets, so the UI follows. `radius-pill` for buttons and pills, `radius-md` for cards, `radius-lg` for media frames, `radius-xl` for inset bands.
- Hairlines (`border`) separate sections. Cards on cream use `shadow-card`; nothing else casts a shadow except the scrolled nav (`shadow-float`).

### Imagery
Imagery does most of the brand work. There are four kinds, each with one job:
1. **Objects** (`assets/Objects`). Tactile 3D renders in terrazzo, pale wood and money-green felt, with transparent grounds: the 1M tablet, the swap arrows, the globe, the padlock, the toggle, currency coins. Use them as illustrations in `FeatureCard`s and heros, on `surface` or `surface-subtle`. One object per idea, never collaged.
2. **Cards** (`assets/Cards`). The money-green Payset card, in hero and product contexts. The card-mask files are black-ground production masks, not page imagery.
3. **Product UI** (`assets/Product UI`). Real panels (spending rules, multi-signature, statements, transaction status) rendered on stone. Show them in `ProductShowcase` only.
4. **Photography** (`assets/Photography`, `assets/Portraits`). Warm, natural-light editorial photos of people at work, often with plants and window shadows. Use them for testimonials, about pages and section breaks, framed with `radius-lg`.

Files ending `-d` are desktop crops and `-m` mobile crops of the same image; `-sq` is square. Serve the matching crop at each breakpoint.

### Motion
Quiet and functional. Hover changes colour in 160ms. No parallax, bouncing or scroll-triggered reveals; content is visible on load. Respect `prefers-reduced-motion`.

### States
- Hover: primary darkens to `primary-hover`; secondary's border goes to full `ink`; links underline.
- Focus: 2px solid `focus-ring` outline with a 2px offset on every interactive element (the accent on dark grounds).
- Disabled: 45% opacity, not hidden.

## Iconography
- The website uses **3D objects instead of icons** for features and sections. Don't replace them with line icons.
- For small UI glyphs (arrows, chevrons, menu, close), use simple 2px-stroke inline SVG with round caps, like the `Button` arrow, in `currentColor`.
- No emoji anywhere.

## Logo
- Use the files in `assets/Logos`: `payset-logo-full-green.svg` on cream and white, `payset-logo-full-white.svg` on charcoal, money green, stone and photos. The short "p" marks are for avatars and favicons.
- Minimum height 20px. Never recolour, outline, add effects to or rebuild the mark.

## Components
`NavBar`, `Hero`, `FeatureCard`, `ProductShowcase`, `Testimonial`, `CTABand` and `Footer` are page sections; `Button`, `Pill` and `Logo` are the parts they share. A typical page: `NavBar` → `Hero` → a three-card `FeatureCard` row → two or three alternating `ProductShowcase`s → `Testimonial` → `CTABand` → `Footer`.

---

## Consuming this system (generated — do not edit)

Every path named below is under `project/` in this design system: read `project/api/tokens.md`, not `api/tokens.md`.

`components/bundle.js` defines `window.PaysetWeb` (10 components); `components/bundle.css` is its stylesheet; `tokens.css` is every token as a CSS variable plus `@font-face` for the fonts. `components/bundle.css` reads its variables from `tokens.css`. The bundle needs react 18 (not packed in this system: bring your own copy) (`window.React`), react-dom 18 (not packed in this system: bring your own copy) (`window.ReactDOM`), loaded before it. Build any UI by mounting these components; never hand-build a control or draw an icon the system provides.

- **Standalone page:** inline `tokens.css` and `components/bundle.css` in a `<style>`, then the library files and `components/bundle.js` as classic scripts (a file containing `</style`, `</script` or `<!--` breaks an inline element: write the sequence `<\/style`, `<\/script` or `\x3C!--` in your copy, or load that file by URL).
- **Design canvas:** bring `components/bundle.css`, `components/bundle.js` and `components/index.d.ts` (for the editor’s props panel) onto the canvas in full, as the canvas type’s design-system components reference says (a server-side copy first where it offers one); load the stylesheet before the script; skip the library files (the artboard supplies React); mount with `<x-import component-from-global-scope="PaysetWeb.<Comp>" …>`.
- **Slides deck, or any surface that cannot run the bundle:** tokens only — the values are on `api/tokens.md`; the deck takes `tokens.json` by file path for its colour pickers.

**Read, per thing:** a component’s props, parts and examples: `api/components/<Comp>.md`; token values: `api/tokens.md`; stored assets and their paths: `api/assets/<Group>.md`. After this README, fetch the cards and fonts you need in ONE message as parallel calls — none depends on another.

**Two rules.** Before you use a thing — a component, a token group, an icon, an asset — read its card from the index below; a value you did not read from a card is a guess. `tokens.json`, `manifest.json`, `components/index.d.ts` and `design-system.json` are sources for tools: hand them over. `components/<Comp>/README.md` and `assets/<Group>/README.md` are the long-form second read a card links to; `SKILL.md` and `artifact-type/` beside them are authoring guidance, not needed to consume the system.

## Index (generated — do not edit)

**Tokens**

- `api/tokens.md` — Every token: surface, text, fill, border, palette, type, spacing, radius, shadow. (8.8k)

**Icons and assets**

- `api/assets/Logos.md` — 6 files, by asset id. (1.8k)
- `api/assets/Objects.md` — 27 files, by asset id. (3.3k)
- `api/assets/Cards.md` — 12 files, by asset id. (2.1k)
- `api/assets/Product-UI.md` — 14 files, by asset id. (2.3k)
- `api/assets/Photography.md` — 19 files, by asset id. (2.9k)
- `api/assets/Portraits.md` — 6 files, by asset id. (1.3k)
- `api/assets/Avatars.md` — 3 files, by asset id. (1.0k)
- `api/assets/Comparison-logos.md` — 5 files, by asset id. (1.4k)

**Components** (`api/components/<Comp>.md`, 10)

- **Actions**: `Button` — Pill-shaped action for every link or button on the site · `Pill` — Small uppercase label that sets context above a title
- **Brand**: `Logo` — The Payset wordmark, from the brand's own SVG files
- **Navigation**: `NavBar` — Top navigation: logo, page links, sign-in and the invitation CTA · `Footer` — Site footer: white logo, link columns and the regulatory line
- **Sections**: `Hero` — Page opener with the H1, a lead paragraph, CTAs and an optional image · `FeatureCard` — A 3D object above a short title and paragraph, used in grids of three · `ProductShowcase` — A Product UI render on the stone ground, beside an eyebrow, title, paragraph and optional bullet points · `Testimonial` — A client photo beside their quote, name and role · `CTABand` — Closing call to action on a dark (default) or money-green band, inset from the page edge
