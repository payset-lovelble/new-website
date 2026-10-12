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
- Home H1: **Financial services, personal service, by invitation.** Home subtitle (the H2): one sentence on what clients get.
- Primary CTA: **Request an invitation** (black pill). Contact: **Talk to us** (neon rectangle, placed first). Existing clients: **Sign in**.
- Never use: "Sign up free", "Open an account in minutes", "Get started".

### Casing and punctuation
- Sentence case for headlines, buttons, nav and labels. Uppercase only through the `overline` style (eyebrows, pills).
- Hero and photo-card headlines end with a full stop when they're a sentence ("Every payment followed through to arrival."). Giant section-card titles ("Personal service"), labels, tags and buttons don't.
- Use the single ellipsis character (…) and the middle dot (·) for inline separators.

### Numbers and money
- Amounts: number, a space as the thousands separator, then the ISO code: **10 000 EUR**, **53 250.00 EUR**. This matches the product UI renders.
- Large figures use the `figure` style with tabular numerals.
- Never invent statistics, client counts, volumes or ratings. Leave a bracketed placeholder ("[CURRENCY COUNT]") until the figure is confirmed. The Trustpilot rating only ever comes from the live `TrustBox`.

### Testimonials and regulatory copy
- Quotes must be real, approved and attributed to a named client. Never write them for a client.
- Every page carries the FCA line in the `Footer`: "Pay Set Limited is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011 (FRN [FRN])." Don't call Payset a bank.

## Visual foundations

This system follows the live payset.io: a cream page, huge bold centred titles, and the content in rounded cards stacked 16px apart in one 1280px column.

### Colour
- **Ground:** `surface` (warm cream `rice-00`, #F5F2EF). Sections sit on cards, not full-bleed bands.
- **Cards:** `surface-card` (stone `rice-02`) for centred sections and the closing CTA; `surface-inverse` (`graphite`) for who we work with and stories; `surface-brand` (money green) for safeguarding. Bento tiles use `rice-03` (taupe), `sand`, `pewter`, `stone` and `espresso`. Never two cards of the same tone touching.
- **Text:** `ink-head` (#333) for hero titles and subtitles, `ink` for body, `ink-inverse` on dark, green and stone cards, `grey-60` for footer labels and legal copy.
- **Neon** (`brand-accent`, #00F572) is a fill: the rectangular contact button and neon tags, always with a charcoal label; and the label colour on the black pill. Never neon text on cream, never white text on neon.
- **Money green** (#256C4A) is the logo colour and the safeguarding card. It is not a button colour any more.
- **Stone** (#706E67) sits behind Product UI renders, whose ground is baked in.
- Solid fields only. The one exception is the glass rows over a photo (`glass`, 12px blur) and the left-to-right shade that keeps a photo card's title readable.

### Typography
- **Titles: ES Rebond Grotesque, bold 700** (`--font-display`), tracking -0.2px. **Text: Inter Tight** 400/500 (`--font-sans`), from Google Fonts.
- payset.io serves a *trial* build of ES Rebond Grotesque. Licensed .woff2 files still need to be added under `fonts/`; until then every title falls back to Public Sans bold.
- `display` (120/104) once, for the home hero, centred. `giant` (100/80) for section-card titles. `h1` (88/80) for inner-page heros, `h2` (56/54) for left-aligned section titles, `card-title` (38/38) over photos, `h4` (24/28) for tiles and icon points.
- `subtitle` (24/36 bold, display face) is the H2 under the home hero. `lead` (20/32) under giant titles, centred. `tile-body` (15/24) in tiles and icon points.
- Under 768px: `display` 52/50, `giant` and `h1` 48/46, `h2` 36/36, `card-title` 30/32, `subtitle` 22/28.

### Layout
- Nav: one 1120px row, 64px high, no rule.
- Home: centred hero (title, subtitle, buttons, TrustBox), then a `.pw-stack` of cards: `PhotoCard` → a `Tile` row (two stacked beside one tall) → stone `SectionCard` (personal service) → a two-tile row → dark `SectionCard` (who we work with) → green `SectionCard` (safeguarding) → `CTABand` → light `Footer`.
- Cards: 24px radius, 64px vertical padding (centred cards) or 24px (tiles), 16px apart. Tiles are 439px tall; a tall tile matches two.
- Inner pages: the same nav, hero, cards and footer; long text sections may sit on plain `surface` with `space-128` padding.

### Radii, borders, shadows
- `radius-lg` (24px) on every card, tile and media frame. `radius-pill` (32px) on the black pill, tags and chips. `radius-button` (6px) on the neon contact button. `radius-sm` (8px) on the outlined Sign in.
- Cards and tiles are flat: no shadows, no borders. `shadow-card` only for a panel floating over a photo (the chat card); `shadow-float` for the scrolled nav.

### Imagery
Imagery does most of the brand work. There are four kinds, each with one job:
1. **Objects** (`assets/Objects`). Tactile 3D renders in terrazzo, pale wood and money-green felt, with transparent grounds. In tiles they bleed off the bottom-right corner; on the green card the padlock sits centred, cropped to its body. One object per idea, never collaged.
2. **Cards** (`assets/Cards`). The money-green Payset card, in hero and product contexts. The card-mask files are black-ground production masks, not page imagery.
3. **Product UI** (`assets/Product UI`). Real panels rendered on stone. Show them in `stone` tiles and `ProductShowcase` only.
4. **Photography** (`assets/Photography`, `assets/Portraits`). Warm, natural-light editorial photos of people at work. The `PhotoCard` fills a whole card with one, subject on the right. These people are models, never clients.

Files ending `-d` are desktop crops and `-m` mobile crops of the same image; `-sq` is square. Serve the matching crop at each breakpoint.

### Motion
Quiet and functional. Hover changes colour in 160ms. No parallax, bouncing or scroll-triggered reveals; content is visible on load. Respect `prefers-reduced-motion`.

### States
- Hover: the black pill goes to pure black; neon goes to `brand-accent-hover`; outlines get a 4% fill; links underline.
- Focus: 2px solid `focus-ring` outline with a 2px offset on every interactive element (the accent on dark grounds).
- Disabled: 45% opacity, not hidden.

## Iconography
- Features and tiles use **3D objects**, not icons.
- `IconPoint` rows inside section cards use simple 2px-stroke line glyphs in 80px circles, as on payset.io: charcoal on a cream circle (stone cards), neon on a darker circle (green and dark cards).
- Small UI glyphs (arrows, chevrons, menu, close): the same 2px stroke, round caps, `currentColor`.
- No emoji anywhere.

## Trust
- The Trustpilot `TrustBox` sits under the hero buttons, on the dark who-we-work-with card and under the closing CTA. It loads the rating live from Trustpilot (Payset business unit `61dd51c9957c497122f360e5`); pages load Trustpilot's bootstrap script once.

## Logo
- Use the files in `assets/Logos`: `payset-logo-full-green.svg` on cream (nav and footer), `payset-logo-full-white.svg` on charcoal, money green, stone and photos. The short "p" marks are for avatars and favicons.
- Minimum height 20px. Never recolour, outline, add effects to or rebuild the mark.

## Components
`NavBar`, `Hero`, `PhotoCard`, `Tile`, `SectionCard`, `CTABand` and `Footer` are page sections; `FeatureCard`, `ProductShowcase` and `Testimonial` serve inner pages; `Button`, `Tag`, `Pill`, `IconPoint`, `TrustBox` and `Logo` are the parts they share.
