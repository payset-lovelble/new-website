// Static build of the Payset Private site from the Payset Website design system (PaysetWeb components).
const fs = require('fs');
const path = require('path');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
global.window = { React };
eval(fs.readFileSync(path.join(__dirname, 'ds-bundle.js'), 'utf8'));
const W = global.window.PaysetWeb;
const h = React.createElement;
const OUT = process.argv[2];
const A = (f) => '/assets/' + f;

const LEGAL = 'Pay Set Limited is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011 (FRN 900920). Payset is not a bank: client funds are safeguarded and are not covered by the Financial Services Compensation Scheme. Registered in England and Wales, company number 11529161. 9th Floor, 9 Appold Street, London EC2A 2AP.';
const NAV = [
  { label: 'The service', href: '/service' },
  { label: 'Who we work with', href: '/clients' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];
const APPLY_URL = 'https://apply.payset.io/';
const INVITE = { label: 'Apply now', href: APPLY_URL };
const TALK = { label: 'Talk to us', href: APPLY_URL };

const Container = (p) => h('div', { className: 'pw-container' }, p.children);
const Section = (p) => h('section', { id: p.id, className: 'pw-root ps-section' + (p.tone ? ' ps-section--' + p.tone : '') }, h(Container, null, p.children));
const Over = (t, dark) => h('p', { className: 'pw-overline' }, t);
const H2 = (t) => h('h2', { className: 'pw-title pw-title--h2' }, t);
const H3 = (t) => h('h3', { className: 'pw-title pw-title--h3' }, t);
const H4 = (t) => h('h3', { className: 'pw-title pw-title--h4' }, t);
const Lead = (t) => h('p', { className: 'pw-lead' }, t);
const Body = (t) => h('p', { className: 'pw-body' }, t);
const Head = (eyebrow, title, lead, action) => action
  ? h('div', { className: 'ps-head ps-head--row' }, h('div', null, eyebrow && Over(eyebrow), H2(title), lead && Lead(lead)), action)
  : h('div', { className: 'ps-head' }, eyebrow && Over(eyebrow), H2(title), lead && Lead(lead));
const Rules = (items, large) => h('ul', { className: 'ps-rules' + (large ? ' ps-rules--large' : '') },
  items.map((it, i) => Array.isArray(it)
    ? h('li', { key: i }, h('span', { className: 'ps-strong' }, it[0]), h('span', { className: 'ps-small' }, it[1]))
    : h('li', { key: i }, it)));
const Img = (src, alt) => h('img', { src: A(src), alt: alt || '' });

const Facts = (items) => h('div', { className: 'ps-facts' }, items.map(([v, l]) =>
  h('div', { className: 'ps-fact', key: l }, h('span', { className: 'ps-figure' }, v), h('p', { className: 'ps-small' }, l))));

const CTA = (props) => h('section', { className: 'pw-root ps-section ps-section--flush-top' }, h(Container, null,
  h(W.CTABand, Object.assign({
    eyebrow: 'By invitation',
    title: 'Not for everyone. Possibly for you.',
    body: 'If your business moves money across borders and expects someone to pick up, apply. We review every application personally.',
    ctaLabel: 'Apply now', ctaHref: APPLY_URL, secondaryLabel: 'Talk to us', secondaryHref: APPLY_URL,
  }, props))));

const Chat = () => h('div', { className: 'ps-chat', role: 'img', 'aria-label': 'Example conversation with a relationship manager' },
  h('div', { className: 'ps-chat__who' }, h('span', { className: 'ps-chat__avatar', 'aria-hidden': 'true' }, 'RM'),
    h('div', null, h('div', { className: 'ps-chat__name' }, '[Name], your account manager'), h('div', { className: 'ps-chat__status' }, 'Available now · London'))),
  h('div', { className: 'ps-bubble' }, 'Your 1 800 000 USD payment to Shenzhen is held by the receiving bank for a document check. I’ve sent them the invoice and will confirm when it lands.'),
  h('div', { className: 'ps-bubble ps-bubble--me' }, 'Thank you. Also, we’re opening a subsidiary in Dubai next month.'),
  h('div', { className: 'ps-bubble' }, 'Congratulations. I’ll prepare AED accounts under your group and send the document list today.'));

// Trustpilot TrustBoxes, as on payset.io: Micro Star on light grounds, Micro Combo on dark. The rating is loaded live.
const TRUSTPILOT = { businessUnitId: '61dd51c9957c497122f360e5', reviewUrl: 'https://www.trustpilot.com/review/payset.io' };
const Trustpilot = ({ dark }) => h('div', {
    className: 'trustpilot-widget pz-trustpilot', 'data-locale': 'en-US',
    'data-template-id': dark ? '5419b637fa0340045cd0c936' : '5419b732fbfb950b10de65e5',
    'data-businessunit-id': TRUSTPILOT.businessUnitId, 'data-style-height': dark ? '20px' : '24px', 'data-style-width': '100%',
    'data-theme': dark ? 'dark' : 'light' },
  h('a', { href: TRUSTPILOT.reviewUrl, target: '_blank', rel: 'noopener' }, 'Trustpilot'));

function Page(title, desc, body) {
  const html = renderToStaticMarkup(h(React.Fragment, null,
    h(W.NavBar, { links: NAV, ctaLabel: 'Apply now', ctaHref: APPLY_URL, signInLabel: 'Sign in', signInHref: 'https://app.payset.io', homeHref: '/' }),
    h('main', { id: 'main' }, body),
    h(W.Footer, {
      tagline: 'Financial services, personal service, by invitation.',
      columns: [
        { title: 'Payset Private', links: NAV.slice(0, 4) },
        { title: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Introductions', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Contact', href: '/about#contact' }] },
        { title: 'Legal', links: [{ label: 'Safeguarding', href: '/about#safeguarding' }, { label: 'Terms', href: '#' }, { label: 'Privacy', href: '#' }, { label: 'Cookies', href: '#' }] },
      ],
      legal: LEGAL,
    }))).replace(/(<footer[\s\S]*?)logo-white\.svg/, '$1logo-green.svg'); // light footer, as on payset.io
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/tokens.css">
<link rel="stylesheet" href="/bundle.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/site.css">
<link rel="stylesheet" href="/payset.css">
<script async src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"></script>
</head>
<body>
${html}
</body>
</html>
`;
}

const pages = {};

/* ---------- Home ---------- */
// Layout follows the current payset.io home: centred hero, then rounded cards in one column.
const Btn = (label, href, kind) => h('a', { className: 'pz-btn pz-btn--' + kind, href }, label);
const Ctas = () => h('div', { className: 'pz-ctas' }, Btn(TALK.label, TALK.href, 'neon'), Btn(INVITE.label, INVITE.href, 'black'));
const Tag = (label, href, kind) => h('a', { className: 'pz-tag pz-tag--' + (kind || 'light'), href }, label);
const Tile = (p) => h('article', { className: 'pz-tile' + (p.dark ? ' pz-tile--dark' : '') + (p.tall ? ' pz-tile--tall' : ''), style: { background: p.bg } },
  h('div', { className: 'pz-tile__text' }, h('h3', null, p.title), h('p', null, p.body)),
  p.img && h('img', { className: 'pz-tile__img' + (p.ui ? ' pz-tile__img--ui' : '') + (p.cards ? ' pz-tile__img--cards' : ''), src: A(p.img), alt: p.alt || '' }),
  h('div', { className: 'pz-tile__foot' }, Tag(p.tag, p.href, p.tagKind)));
// Small 2px-stroke glyphs in circles, as on payset.io.
const ICONS = {
  headset: ['M4 14v-2a8 8 0 0 1 16 0v2', 'M4 14h3v5H5a1 1 0 0 1-1-1z', 'M20 14h-3v5h2a1 1 0 0 0 1-1z', 'M17 19c0 1.5-2 2-5 2'],
  bell: ['M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z', 'M10 20a2 2 0 0 0 4 0'],
  layers: ['M12 3l9 5-9 5-9-5z', 'M3 13l9 5 9-5'],
  badge: ['M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z', 'M9 12l2 2 4-4'],
  vault: ['M4 5h16v14H4z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', 'M12 12h0', 'M7 19v2', 'M17 19v2'],
  key: ['M14 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z', 'M9.5 14.5L3 21', 'M5 19l2 2', 'M14 8v4'],
};
const Icon = (name) => h('svg', { viewBox: '0 0 24 24', width: 28, height: 28, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' },
  ICONS[name].map((d, i) => h('path', { key: i, d })));
const Point = (icon, title, body) => h('div', { className: 'pz-point' },
  h('span', { className: 'pz-point__icon' }, Icon(icon)), h('h3', null, title), h('p', null, body));

pages['index.html'] = Page('Payset Private | Private financial services',
  'Accounts, FX and cross-border payments for businesses operating across jurisdictions, with a dedicated account manager.',
  h('div', { className: 'pz' },
    h('section', { className: 'pz-hero' },
      h('h1', { className: 'pz-hero__title' }, 'Private financial services'),
      h('h2', { className: 'pz-hero__sub' }, 'Accounts in your company’s name, FX priced on your volume and a dedicated account manager, for businesses operating across jurisdictions.'),
      h(Ctas), h(Trustpilot)),

    h('div', { className: 'pz-cards' },
      h('section', { className: 'pz-photo-card' },
        Img('photo-woman-at-work.webp', ''),
        h('div', { className: 'pz-photo-card__text' },
          h('h2', null, 'Every payment followed through to arrival.'),
          h('p', null, 'Hold, send and receive 34 currencies across 180+ countries. Large and time-critical payments are tracked by your account manager until they land.')),
        h('ul', { className: 'pz-glass', 'aria-label': 'Example payments' },
          [['Supplier payment, Shenzhen', 'Tracked by your account manager', '1 800 000 USD'], ['Client receipt, Cyprus entity', 'Received', '250 000 EUR'], ['Payroll, UK entity', 'Sent', '84 500 GBP']].map(([n, s, v]) =>
            h('li', { key: n }, h('span', null, h('b', null, n), h('small', null, s)), h('strong', null, v)))),
        h('div', { className: 'pz-photo-card__foot' }, Tag('The service', '/service', 'neon'))),

      h('div', { className: 'pz-bento' },
        h('div', { className: 'pz-bento__col' },
          h(Tile, { bg: '#CFC8C1', title: 'FX priced on your volume', body: '38 FX pairs, around the clock. No public rate card: pricing is agreed in advance around how much you move.', img: 'obj-swap-crop.webp', tag: 'Currency exchange', href: '/service#fx' }),
          h(Tile, { bg: '#9B9C9D', title: 'Accounts in your company’s name', body: 'Hold, send and receive 34 currencies for your group and every entity in it.', img: 'obj-globe-crop.webp', tag: 'Multi-currency accounts', href: '/service#accounts', tagKind: 'black' })),
        h(Tile, { tall: true, dark: true, bg: '#706E67', title: 'Every rail your business needs', body: 'SEPA, SEPA Instant, SWIFT and Faster Payments, with status from signature to arrival.', img: 'ui-transaction-status-crop.webp', ui: true, alt: 'Transaction status panel showing a payment signed and sent', tag: 'Payments', href: '/service#payments', tagKind: 'neon' })),

      h('section', { className: 'pz-card pz-card--stone pz-center' },
        h('h2', { className: 'pz-giant' }, 'Personal service'),
        h('p', { className: 'pz-lead' }, 'One named account manager who knows your business, your suppliers and your deadlines. Reachable by message, call or in person, and usually the first to spot a problem.'),
        h('div', { className: 'pz-support-media' }, h('div', { className: 'ps-photo' }, Img('photo-headset.webp', 'An account manager on a call at her desk'), h(Chat))),
        h('div', { className: 'pz-points' },
          Point('headset', 'Someone who picks up', 'One named person, not a ticket queue. Reachable by message, call or in person.'),
          Point('bell', 'Acts first', 'A held payment or a missing document: you hear it from us before you have to ask.'),
          Point('layers', 'Knows your group', 'Every entity, corridor and approver, so new accounts and payments move quickly.')),
        h(Ctas)),

      h('div', { className: 'pz-bento' },
        h(Tile, { tall: true, bg: '#CFC8C1', title: 'Debit cards for your team', body: 'Payset debit cards for the people who spend on your company’s behalf, each with its own limits and spending rules.', img: 'obj-debit-cards.webp', cards: true, tag: 'Cards', href: '/service#cards', tagKind: 'black' }),
        h('div', { className: 'pz-bento__col' },
          h(Tile, { bg: '#706E67', dark: true, title: 'Personal service. Institutional controls.', body: 'Decide who can create, approve and release payments, by person, entity and amount.', img: 'ui-members-crop.webp', ui: true, alt: 'Team members panel with permissions', tag: 'Controls', href: '/service#control', tagKind: 'black' }),
          h(Tile, { bg: '#2B2728', dark: true, title: 'Statements for every entity', body: 'Statements and transaction detail per account and entity, ready for your finance team.', img: 'ui-statement-crop.webp', ui: true, alt: 'Account statement panel', tag: 'Reporting', href: '/service#payments', tagKind: 'neon' }))),

      h('section', { className: 'pz-card pz-card--dark pz-center' },
        h('h2', { className: 'pz-giant' }, 'Businesses that banks find complicated'),
        h('p', { className: 'pz-lead' }, 'International companies moving 250 000 EUR or more each month, often through several entities and jurisdictions. We understand them, and we stay with them.'),
        h('div', { className: 'pz-chips' },
          ['Licensed iGaming', 'Performance marketing', 'Digital assets', 'Software and digital services', 'Consulting', 'Holding structures'].map((t, i) =>
            h('a', { key: t, className: 'pz-chip', href: '/clients#' + ['igaming', 'marketing', 'digital-assets', 'software', 'consulting', 'holdings'][i] }, t))),
        h('div', { className: 'pz-center-row' }, Tag('Who we work with', '/clients', 'outline')),
        h(Trustpilot, { dark: true })),

      h('section', { className: 'pz-card pz-card--green pz-center' },
        h('h2', { className: 'pz-giant' }, 'Your money, safeguarded'),
        h('p', { className: 'pz-lead' }, 'Payset is authorised by the FCA as an Electronic Money Institution. Client funds are safeguarded, and every payment sits behind the approvals you set.'),
        h('div', { className: 'pz-hero-object' }, Img('obj-lock.webp', '')),
        h('div', { className: 'pz-points' },
          Point('badge', 'FCA authorised', 'Authorised under the Electronic Money Regulations 2011, FRN 900920.'),
          Point('vault', 'Safeguarded funds', 'Client funds are held separately from Payset’s own money.'),
          Point('key', 'Approvals and 2FA', 'Multi-signature approvals, permissions and two-factor sign-in.'))),

      h('section', { className: 'pz-card pz-card--stone pz-center' },
        h('h2', { className: 'pz-giant' }, 'Not for everyone. Possibly for you.'),
        h('p', { className: 'pz-lead' }, 'If your business moves money across borders and expects someone to pick up, apply. We review every application personally.'),
        h(Ctas), h(Trustpilot)))));

/* ---------- The service ---------- */
pages['service.html'] = Page('The service | Payset Private', 'Accounts, FX and payments run by a dedicated account manager.',
  h(React.Fragment, null,
    h(W.Hero, { eyebrow: 'The service', size: 'h1', align: 'left', title: 'Your money, personally handled.',
      lead: 'Accounts, FX and payments for businesses operating across jurisdictions. Run by an account manager who knows your business, and the team behind them.',
      primaryCta: INVITE, secondaryCta: TALK, image: A('obj-coin-holder.webp') }),
    h(Section, { id: 'manager', tone: 'subtle' },
      h('div', { className: 'ps-split' },
        h('div', { className: 'ps-photo' }, Img('photo-hotel-call.webp', 'A client on a call while travelling')),
        h('div', { className: 'ps-split__text' }, Over('Account manager'), H2('One person who knows your business. And picks up.'),
          Lead('Everything starts with your account manager. They learn how your business moves money, who you pay and when it matters, then make sure it happens.'),
          Rules([['Reachable by message, call or in person', 'On the app you already use. Typical reply in [REPLY TIME] during business hours.'],
            ['Acts before you ask', 'A held payment, a missing document, a rate you were waiting for.'],
            ['Grows with your structure', 'New entity, new market, new currency: accounts prepared and paperwork explained.'],
            ['A team behind them', 'Payments, FX and compliance specialists across the UK, Portugal, Israel and Romania.']])))),
    h(Section, { id: 'accounts' },
      Head('Accounts', 'Every entity. Every currency. One relationship.', 'Accounts in your company’s name, for each entity in your group, wherever it’s incorporated.'),
      h('div', { className: 'ps-grid-3' },
        h(W.FeatureCard, { image: A('obj-globe.webp'), title: '34 currencies', body: 'Hold balances without converting until you choose to, with IBANs and local details in your company’s name.' }),
        h(W.FeatureCard, { tone: 'brand', image: A('obj-user-pics.webp'), title: 'Multi-entity groups', body: 'Holding companies and subsidiaries under one login and one account manager.' }),
        h(W.FeatureCard, { image: A('obj-magnifier.webp'), title: 'Onboarding led by people', body: 'Complex structures welcome. We ask the right questions once and explain every request.' }))),
    h(Section, { id: 'fx' },
      h('div', { className: 'ps-band ps-band--inverse' },
        h('div', { className: 'ps-split' },
          h('div', { className: 'ps-split__text' }, Over('FX'), H2('FX priced on your volume, not a rate card.'), Lead('Your pricing is set around how much you move and where. Talk to the person who sets it.'),
            Rules([['38 currency pairs', 'Exchange around the clock.'], ['Rates agreed in advance', 'Lock a rate with your account manager, then pay on your schedule.'], ['Rate alerts that act', 'Tell us your target. We message you when the market gets there.']])),
          h('div', null, Img('obj-swap.webp', ''))))),
    h(Section, { id: 'payments', tone: 'subtle' },
      h('div', { className: 'ps-stack' },
        h(W.ProductShowcase, { image: A('ui-transaction-status.webp'), imageAlt: 'Transaction status panel', eyebrow: 'Payments', title: 'Every payment followed through to arrival.', body: 'Send to 180+ countries over SEPA, SEPA Instant, SWIFT and Faster Payments. Your account manager tracks large and time-critical payments and chases them before you have to ask.', points: ['Bulk and recurring payments', 'Payouts at volume', 'Urgent same-day where the rail allows'] }),
        h(W.ProductShowcase, { reverse: true, image: A('ui-statement.webp'), imageAlt: 'Statements panel', eyebrow: 'Documents', title: 'Statements and letters, prepared for you.', body: 'Standard and accounting statements on demand. Reference letters and audit confirmations prepared by your account manager.' }))),
    h(Section, { id: 'cards' },
      h(W.ProductShowcase, { image: A('obj-debit-cards.webp'), imageAlt: 'Three money-green Payset debit cards', eyebrow: 'Cards', title: 'Debit cards for the people who spend for you.', body: 'Payset debit cards for your team, drawn on your company’s accounts. Your account manager sets them up with you, card by card.', points: ['A card for each person who spends', 'Limits and spending rules per card', 'Every card payment in your statements'] })),
    h(Section, { id: 'digital-assets' },
      h('div', { className: 'ps-band ps-band--brand' },
        h('div', { className: 'ps-split' },
          h('div', { className: 'ps-split__text' }, Over('Digital assets'), H2('Fiat rails for digital asset businesses.'),
            Lead('Banks hesitate. We don’t. Operating accounts and fiat on- and off-ramp for digital asset businesses, alongside our MiCA-licensed group company.'),
            h('div', { className: 'pw-btn-row', style: { marginTop: '8px' } }, h(W.Button, { variant: 'accent', href: APPLY_URL, arrow: true }, 'Apply now'))),
          h('div', null, Img('obj-lock.webp', ''))))),
    h(Section, { id: 'control', tone: 'subtle' },
      h(W.ProductShowcase, { image: A('ui-spending-rules.webp'), imageAlt: 'Spending rules panel', eyebrow: 'Control and security', title: 'Two signatures on every payment over 10 000 EUR.', body: 'Set the rules once. Every payment follows them, for every entity and every member.', points: ['Multi-signature approvals and spending rules', 'Permissions by person, entity and limit', 'Two-factor sign-in and transaction monitoring', 'Client funds safeguarded and never lent out'] })),
    h(Section, null,
      h('div', { className: 'ps-split', style: { alignItems: 'start' } },
        h('div', { className: 'ps-split__text' }, H2('What you won’t find here.')),
        Rules(['Ticket numbers and chatbots.', 'A different person every time you call.', 'Accounts closed without a conversation.', 'A free tier, because the service isn’t automated.'], true))),
    h(CTA, { title: 'Meet your account manager.', body: 'Typical clients move 250 000 EUR or more each month. Apply and a senior member of our team will call you within one business day.' })));

/* ---------- Who we work with ---------- */
const SEG = [
  ['igaming', 'Licensed iGaming operators and affiliates', 'obj-chart.webp', 'Operating accounts and partner payouts for licensed operators and the affiliates that work with them, onboarded by people who understand gaming licences.', ['Operating and settlement accounts by entity', 'Affiliate and partner payouts at volume', 'Licences we work with: [LICENCE LIST]']],
  ['marketing', 'Performance and online marketing', 'obj-magnifier.webp', 'Media buyers, SEO agencies and affiliate networks paying publishers, platforms and partners in many countries every week.', ['Mass payouts in EUR, USD and GBP', 'Client receipts in several currencies', 'Payments released on time, every cycle']],
  ['digital-assets', 'Digital asset businesses', 'obj-lock.webp', 'Fiat operating accounts and on- and off-ramp for exchanges, brokers and Web3 companies, alongside our MiCA-licensed group company.', ['Fiat accounts for operating flows', 'Specialist onboarding for licensed models', 'Settlement in major fiat currencies']],
  ['software', 'Software and digital services', 'obj-toggle.webp', 'Product companies and studios paying international teams and contractors, and collecting from clients worldwide.', ['Contractor payments in local currency', 'Collections in USD, EUR and GBP', 'FX on payroll runs, priced on your volume']],
  ['consulting', 'Consulting and professional services', 'obj-coin-holder.webp', 'Advisory and service firms with clients and partners in several countries, who need payments on time and paperwork right.', ['Client receipts across currencies', 'Reference letters and statements on request', 'One relationship for every entity']],
  ['holdings', 'International holding structures', 'obj-globe.webp', 'Groups with companies in the UK, Cyprus, the UAE, Hong Kong, Israel and beyond. Every entity gets its own accounts, all under one account manager.', ['Accounts for each entity, one login', 'Intra-group transfers handled quickly', 'New entities onboarded as you grow']],
];
pages['clients.html'] = Page('Who we work with | Payset Private', 'The businesses Payset Private serves.',
  h(React.Fragment, null,
    h(W.Hero, { eyebrow: 'Who we work with', size: 'h1', align: 'left', title: 'Businesses that banks find complicated. We don’t.',
      lead: 'International businesses that move 250 000 EUR or more each month, often through several entities and jurisdictions. Banks see complexity. We see a client worth knowing properly.',
      primaryCta: INVITE, image: A('obj-uk-lock.webp') }),
    h(Section, { tone: 'subtle' },
      h('div', { className: 'ps-links' }, SEG.map((s) => h('a', { key: s[0], className: 'ps-chip', href: '#' + s[0] }, s[1])))),
    h(Section, null,
      h('div', { className: 'ps-stack' }, SEG.map((s, i) =>
        h('article', { key: s[0], id: s[0], className: 'ps-split' + (i % 2 ? ' ps-split--reverse' : '') },
          h('div', { className: 'ps-split__text' }, H2(s[1]), Lead(s[3]),
            h('ul', { className: 'ps-ticks', style: { borderTop: 0, paddingTop: '8px' } }, s[4].map((p) => h('li', { key: p }, p)))),
          h('div', { style: { background: 'var(--surface-subtle)', borderRadius: 'var(--radius-lg)', padding: '32px', display: 'flex', justifyContent: 'center' } },
            h('img', { src: A(s[2]), alt: '', style: { maxHeight: '360px', width: 'auto', maxWidth: '100%' } })))))),
    h(Section, { tone: 'subtle' },
      h('div', { className: 'ps-split', style: { alignItems: 'start' } },
        h('div', { className: 'ps-split__text' }, H2('Who we’re not for.'), Lead('We say so on the first call, and point you somewhere better suited.')),
        Rules(['Businesses moving less than 100 000 EUR a month.', 'Domestic, single-currency payments.', 'One-off transfers.', 'Anyone looking for a free account.'], true))),
    h(Section, null, h(W.CTABand, { eyebrow: 'By invitation', title: 'Sound like your business?', body: 'Tell us how you move money. A senior member of our team will call you within one business day.', ctaLabel: 'Apply now', ctaHref: APPLY_URL, tone: 'brand' }))));

/* ---------- How it works ---------- */
const STEPS = [
  ['Apply', '5 minutes', 'Tell us about your company, your monthly volume, your currencies and where you pay and get paid. If a client introduced you, say who.'],
  ['A conversation', 'Within one business day', 'A senior member of our team calls you. We want to understand how your business moves money, and you should know exactly what we can and can’t do.'],
  ['Your proposal', 'After the call', 'A plan built around your volume and corridors: monthly fee, FX pricing and service level, in writing.'],
  ['Onboarding, led by people', '[ONBOARDING TIME]', 'Your account manager collects what compliance needs once, explains every request and keeps it moving. Then your accounts open.'],
];
pages['how-it-works.html'] = Page('How it works | Payset Private', 'How joining Payset Private works.',
  h(React.Fragment, null,
    h(W.Hero, { eyebrow: 'How it works', size: 'h1', align: 'left', title: 'From application to your first payment.', lead: 'Joining Payset Private is a conversation, not a form. Here is what happens after you apply.', primaryCta: INVITE, image: A('obj-toggle.webp') }),
    h(Section, null,
      h('ol', { className: 'ps-steps' }, STEPS.map((s, i) => h('li', { key: s[0], className: 'ps-step' },
        h('div', { className: 'ps-step__meta' }, h('span', { className: 'ps-step__n' }, String(i + 1).padStart(2, '0')), h('span', { className: 'ps-small' }, s[1])),
        h('div', { className: 'ps-split__text' }, H3(s[0]), Lead(s[2])))))),
    h(Section, { tone: 'subtle' },
      h('div', { className: 'ps-split', style: { alignItems: 'start' } },
        h('div', { className: 'ps-split__text' }, H2('What to have ready.'), Lead('We confirm the exact list on the call. Most companies need:')),
        Rules([['Company documents', 'Certificate of incorporation, articles, register of directors and shareholders.'],
          ['Ownership and control', 'ID and proof of address for directors and beneficial owners.'],
          ['How you make money', 'A short description of your business, main clients and suppliers, and licences where relevant.'],
          ['Expected activity', 'Monthly volumes, currencies and the countries you pay and receive from.']]))),
    h(Section, null,
      h('div', { className: 'ps-split', style: { alignItems: 'start' } },
        h('div', { className: 'ps-split__text' }, H2('Questions.')),
        h('div', { className: 'ps-faq' },
          [['Can I open an account online?', 'No. Every client starts with a conversation, so we can confirm we’re the right fit before you share documents.'],
           ['What if we move less than 250 000 EUR a month?', 'Apply anyway if you’re growing quickly. If we’re not the right fit, we’ll tell you on the call.'],
           ['Do you work with groups with many entities?', 'Yes. Each entity gets its own accounts, all under one account manager.'],
           ['Is Payset a bank?', 'No. Payset is an Electronic Money Institution authorised by the FCA. Client funds are safeguarded, held separately from our own and never lent out.']]
            .map(([q, a]) => h('details', { key: q }, h('summary', null, q), Body(a)))))),
    h(CTA)));

/* ---------- Pricing ---------- */
const Plan = (name, price, band, items, brand) => h('article', { className: 'ps-plan' + (brand ? ' ps-plan--brand' : '') },
  Over(name), h('div', { className: 'ps-price' }, price, price !== 'Bespoke' ? h('span', null, ' / month') : null),
  h('p', { className: 'ps-strong', style: { margin: 0 } }, band),
  h('ul', { className: 'ps-ticks' }, items.map((t) => h('li', { key: t }, t))));
pages['pricing.html'] = Page('Pricing | Payset Private', 'Plans priced on your volume, each with a dedicated account manager.',
  h(React.Fragment, null,
    h(W.Hero, { eyebrow: 'Pricing', size: 'h1', title: 'Priced for the service, not the account.', lead: 'Every plan includes a dedicated account manager. Your monthly fee and FX pricing are set by your volume and corridors, and agreed in writing before you start.' }),
    h(Section, { tone: 'subtle' },
      h('div', { className: 'ps-grid-3' },
        Plan('[PLAN NAME 1]', '[PRICE] EUR', '100 000 – 250 000 EUR per month', ['Dedicated account manager', 'Accounts for up to [N] entities', 'FX priced on your volume']),
        Plan('[PLAN NAME 2]', '[PRICE] EUR', '250 000 – 1 000 000 EUR per month', ['Everything in [PLAN NAME 1]', 'Priority payment tracking and chasing', 'Rate alerts and agreed rates'], true),
        Plan('[PLAN NAME 3]', 'Bespoke', '1 000 000 EUR+ per month', ['Everything in [PLAN NAME 2]', 'Unlimited entities', 'Pricing agreed with our FX desk'])),
      h('p', { className: 'ps-small', style: { marginTop: '24px' } }, 'Prices shown are starting points. Your proposal confirms the exact fee, FX pricing and service level.')),
    h(Section, null,
      h('div', { className: 'ps-split', style: { alignItems: 'start' } },
        h('div', { className: 'ps-split__text' }, H2('Every plan includes.')),
        Rules([['A named account manager', 'Reachable by message, call or in person.'], ['Accounts in your company’s name', '34 currencies, SEPA, SWIFT and Faster Payments.'], ['Safeguarded funds', 'Held separately and never lent out.'], ['Controls for your team', 'Permissions, multi-signature approvals and two-factor sign-in.']]))),
    h(Section, { tone: 'subtle' },
      h('div', { className: 'ps-split' },
        h('div', { className: 'ps-split__text' }, H2('Why there’s no free plan.'), Lead('The service is run by people, not automated. A fixed monthly fee means we can limit how many clients each account manager serves, and give each one the attention they pay for.')),
        h('div', { style: { display: 'flex', justifyContent: 'center' } }, h('img', { src: A('obj-user-pics.webp'), alt: '', style: { maxWidth: '420px', width: '100%' } })))),
    h(CTA)));

/* ---------- About ---------- */
pages['about.html'] = Page('About | Payset Private', 'Payset is an FCA-authorised Electronic Money Institution serving a select group of businesses.',
  h(React.Fragment, null,
    h(W.Hero, { eyebrow: 'About', size: 'h1', align: 'left', title: 'A small institution, on purpose.', lead: 'Payset is a London-based Electronic Money Institution authorised by the FCA. We serve a select group of businesses operating across jurisdictions, and keep that group small so every client is known by name.', primaryCta: INVITE, image: A('obj-lock.webp') }),
    h(Section, { tone: 'subtle' },
      Facts([['FRN 900920', 'FCA-authorised Electronic Money Institution'], ['4', 'countries: UK, Portugal, Israel, Romania'], ['~70', 'people across payments, FX, compliance and product'], ['34', 'currencies, 180+ countries reached']])),
    h(Section, null,
      h('div', { className: 'ps-split' },
        h('div', { className: 'ps-split__text' }, Over('What we believe'), H2('Money should move with someone watching it.'),
          Lead('Banks have grown too large to know their business clients. Payment apps have removed the people altogether. We built Payset for companies that need both speed and a person who answers.')),
        h('div', { className: 'ps-photo' }, Img('photo-woman-at-work.webp', 'A client working from her office')))),
    h(Section, { tone: 'subtle' },
      Head('Leadership', 'The people accountable for your money.'),
      h('div', { className: 'ps-grid-4' },
        [['Pedro Batista', 'Group CEO'], ['[NAME]', '[ROLE]'], ['[NAME]', '[ROLE]'], ['[NAME]', '[ROLE]']].map(([n, r], i) =>
          h('div', { className: 'ps-person', key: i }, h('div', { className: 'ps-person__photo' }, '[PORTRAIT]'), h('div', null, H4(n), h('p', { className: 'ps-small' }, r)))))),
    h(Section, { id: 'safeguarding' },
      h('div', { className: 'ps-split' },
        h('div', { className: 'ps-split__text' }, Over('Regulation and safeguarding'), H2('How your money is protected.'),
          Rules([['Authorised by the FCA', 'Pay Set Limited is an Electronic Money Institution, FRN 900920.'], ['Safeguarded, not lent out', 'Client funds are held separately from our own money at regulated institutions.'], ['Not a bank', 'Funds are not covered by the Financial Services Compensation Scheme. Safeguarding protects them instead.']])),
        h('div', { className: 'ps-photo' }, Img('obj-uk-lock.webp', 'A green padlock with a Union Jack sticker')))),
    h(Section, { id: 'contact', tone: 'subtle' },
      h('div', { className: 'ps-split', style: { alignItems: 'start' } },
        h('div', { className: 'ps-split__text' }, H2('Where we are.'), Lead('Existing clients: speak to your account manager directly.')),
        Rules([['London', '9th Floor, 9 Appold Street, London EC2A 2AP. Headquarters.'], ['Portugal', '[CITY]'], ['Israel', '[CITY]'], ['Romania', '[CITY]']]))),
    h(CTA)));

for (const [f, html] of Object.entries(pages)) fs.writeFileSync(path.join(OUT, f), html);
console.log('built', Object.keys(pages).join(', '));
