// Payset opening payment request (pro forma): setup fee + 3 months of monthly fees, payable before account access.
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType,
  BorderStyle, ShadingType, ImageRun, Footer, TabStopType, CheckBox,
} = require('docx');

const OUT = process.argv[2];
const LOGO = fs.readFileSync(path.join(__dirname, 'logo.png'));
const GREEN = '256C4A', INK = '1A1A1A', MUTED = '646464', RULE = 'D9D4CE', TINT = 'F5F2EF';
const FONT = 'Arial';

const t = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || 20, bold: o.bold, color: o.color || INK, italics: o.italics });
const p = (runs, o = {}) => new Paragraph({ children: Array.isArray(runs) ? runs : [runs], alignment: o.align, spacing: { before: o.before || 0, after: o.after === undefined ? 80 : o.after }, border: o.border, tabStops: o.tabs });
const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: none, bottom: none, left: none, right: none };
const W = 9638; // A4 text width with 2 cm margins (DXA)

const cell = (children, width, o = {}) => new TableCell({
  children: Array.isArray(children) ? children : [children], width: { size: width, type: WidthType.DXA },
  borders: o.borders || noBorders, shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
  margins: { top: o.pad || 80, bottom: o.pad || 80, left: 120, right: 120 },
});

// Header: logo left, document title right
const header = new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: [4819, 4819],
  rows: [new TableRow({ children: [
    cell(p(new ImageRun({ type: 'png', data: LOGO, transformation: { width: 128, height: 35 } })), 4819),
    cell([p(t('Payment request', { size: 32, bold: true }), { align: AlignmentType.RIGHT, after: 40 }),
          p(t('Opening payment, before account access', { color: MUTED }), { align: AlignmentType.RIGHT })], 4819),
  ] })],
});

// Parties and reference block
const kv = (k, v) => p([t(k + '  ', { color: MUTED, size: 18 }), t(v, { size: 20 })], { after: 40 });
const parties = new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: [4819, 4819],
  rows: [new TableRow({ children: [
    cell([p(t('BILL TO', { size: 16, bold: true, color: GREEN }), { after: 60 }),
          p(t('[Client company legal name]', { bold: true })), p(t('[Registered address]')), p(t('[City, postcode, country]')),
          p(t('Company number: [number]', { color: MUTED, size: 18 }))], 4819),
    cell([p(t('DETAILS', { size: 16, bold: true, color: GREEN }), { after: 60 }),
          kv('Request no.', '[PR-YYYY-0000]'), kv('Date', '[DD Month YYYY]'), kv('Application ID', '[APP-000000]'),
          kv('Payment due', 'Before account access')], 4819),
  ] })],
});

// Setup options: manager ticks one box per row (clickable in Word)
const box = (label, checked) => [new CheckBox({ checked: !!checked, checkedState: { value: '2612', font: 'Segoe UI Symbol' }, uncheckedState: { value: '2610', font: 'Segoe UI Symbol' } }), t(' ' + label + '      ')];
const optRow = (k, opts) => p([t(k + '  ', { color: MUTED, size: 18 }), ...opts.flatMap(([l, c]) => box(l, c))], { after: 40 });
const options = [
  optRow('Company location', [['EU / UK: €500 setup fee'], ['Non-EU/UK: €1,000 setup fee (Scale or Private only)']]),
  optRow('Complex structure', [['No'], ['Yes: +€500']]),
  optRow('Plan', [['Business €100/mo'], ['Scale €300/mo'], ['Private €1,500/mo']]),
];

// Line items
const COLS = [5038, 1500, 1500, 1600];
const rule = { style: BorderStyle.SINGLE, size: 4, color: RULE };
const head = (txt, i, right) => cell(p(t(txt, { size: 16, bold: true, color: MUTED }), { align: right ? AlignmentType.RIGHT : undefined, after: 0 }), COLS[i], { fill: TINT, pad: 100 });
const row = (cells, o = {}) => new TableRow({ children: cells.map((c, i) => cell(
  p(c.map ? c : t(c, { bold: o.bold, size: o.size }), { align: i > 0 ? AlignmentType.RIGHT : undefined, after: 0 }),
  COLS[i], { borders: { top: none, left: none, right: none, bottom: o.last ? none : rule }, pad: 110 })) });
const desc = (main, sub) => [t(main, { bold: true }), new TextRun({ break: 1 }), t(sub, { size: 17, color: MUTED })];

const items = new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: COLS,
  rows: [
    new TableRow({ tableHeader: true, children: [head('DESCRIPTION', 0), head('QTY', 1, true), head('UNIT PRICE', 2, true), head('AMOUNT', 3, true)] }),
    row([desc('Setup fee', 'One-time. €500 for an EU/UK company, €1,000 for a non-EU/UK company (Scale and Private only).'), '1', '€[500.00]', '€[500.00]']),
    row([desc('Complex structure', 'One-time, only if ticked above. Otherwise enter 0.'), '[0]', '€500.00', '€[0.00]']),
    row([desc('Monthly plan fee: [Business]', 'First three months, paid in advance: [Month 1] to [Month 3]. Business €100, Scale €300, Private €1,500.'), '3', '€[100.00]', '€[300.00]'], { last: true }),
  ],
});

// Totals
const TW = [5538, 2000, 2100];
const tot = (label, amount, strong) => new TableRow({ children: [
  cell(p(t(''), { after: 0 }), TW[0]),
  cell(p(t(label, { bold: strong, size: strong ? 22 : 20, color: strong ? INK : MUTED }), { after: 0 }), TW[1], { fill: strong ? TINT : undefined }),
  cell(p(t(amount, { bold: strong, size: strong ? 22 : 20 }), { align: AlignmentType.RIGHT, after: 0 }), TW[2], { fill: strong ? TINT : undefined }),
] });
const totals = new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: TW,
  rows: [tot('Subtotal', '€[800.00]'), tot('VAT', 'Exempt'), tot('Total due', '€[800.00]', true)],
});

// Payment options
const section = (title) => p(t(title, { size: 22, bold: true }), { before: 240, after: 100, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GREEN, space: 4 } } });
const payBox = (title, lines) => cell([p(t(title, { bold: true, color: GREEN }), { after: 80 }), ...lines], 4769, { fill: TINT, pad: 120 });
const pay = new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: [4769, 100, 4769],
  rows: [new TableRow({ children: [
    payBox('Option 1: Bank transfer to your Payset account', [
      kv('Account name', '[Client company legal name]'), kv('IBAN', '[IBAN]'), kv('BIC / SWIFT', '[BIC]'),
      kv('Sort code / account', '[for GBP]'), kv('Currency', 'EUR'), kv('Reference', '[PR-YYYY-0000]'),
      p(t('These are your own new account details. Send the payment from your existing business account.', { size: 17, color: MUTED }), { before: 80 })]),
    cell(p(t('')), 100),
    payBox('Option 2: Crypto', [
      kv('Asset and network', '[e.g. USDT, TRC20]'), kv('Wallet address', '[address]'), kv('Amount', '[amount] at the rate quoted on [date]'), kv('Reference', '[PR-YYYY-0000]'),
      p(t('Provided by our separately licensed group partner, not by Pay Set Limited. Not an FCA-regulated activity. Not available to clients resident in the UK.', { size: 17, color: MUTED }), { before: 80 })]),
  ] })],
});

const bullet = (text) => p([t('•  ', { color: GREEN, bold: true }), t(text)], { after: 40 });
const terms = [
  bullet('Your account opens as soon as this payment is received in full.'),
  bullet('The setup fee is non-refundable. The three months of plan fees cover your first three billing months; regular monthly billing starts in month four.'),
  bullet('Use the reference above. Intermediary bank charges are paid by the sender. This request is valid for 30 days; after that your approval lapses.'),
  bullet('Questions? Contact your Payset team at business@payset.io.'),
];

const legal = 'Pay Set Limited is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011 (FRN 900920). Payset is not a bank: client funds are safeguarded and are not covered by the Financial Services Compensation Scheme. Registered in England and Wales, company number 11529161. 9th Floor, 9 Appold Street, London EC2A 2AP.';

const doc = new Document({
  creator: 'Payset', title: 'Payset payment request', description: 'Opening payment: setup fee and three months of plan fees',
  styles: { default: { document: { run: { font: FONT, size: 20, color: INK } } } },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    footers: { default: new Footer({ children: [p(t(legal, { size: 14, color: MUTED }), { after: 0 })] }) },
    children: [
      header,
      p(t(''), { after: 120, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 4 } } }),
      parties,
      p(t('SETUP OPTIONS', { size: 16, bold: true, color: GREEN }), { before: 120, after: 60 }),
      ...options,
      p(t('Thank you for choosing Payset. Your application is approved. To open your account, please pay the setup fee and your first three months of plan fees below.'), { before: 120, after: 120 }),
      items,
      totals,
      section('How to pay'),
      pay,
      section('Good to know'),
      ...terms,
    ],
  }],
});

Packer.toBuffer(doc).then((b) => { fs.writeFileSync(OUT, b); console.log('wrote', OUT); });
