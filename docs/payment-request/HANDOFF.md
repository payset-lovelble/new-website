# Payset opening payment request: spec for apply.payset.io

Generate one payment request per approved client. It asks for the **setup fee + first 3 months of the plan fee**, paid **before the client gets account access**, either by bank transfer into the client's own new Payset account details or in crypto.

Reference files (repo `payset-lovelble/new-website`, branch `claude/zealous-thompson-muu936`):
- `docs/Payset_Payment_Request_Template.docx` / `.pdf`: the approved layout.
- `docs/payment-request/make_bill.js`: the docx-js generator for that layout (A4, Arial, 2 cm margins). Replace its `[placeholders]` with the inputs below.
- `docs/payment-request/logo.png`: green Payset logo, 1040×284.

## Inputs per client

| Field | Source | Example |
|---|---|---|
| company_name | application | Acme Trading Ltd |
| registered_address, city_postcode_country | application | 1 High St / London EC1 1AA, UK |
| company_number | application | 12345678 |
| application_id | apply system | APP-004512 |
| request_no | generate: `PR-YYYY-NNNN`, unique, sequential | PR-2026-0042 |
| date | issue date | 19 October 2026 |
| company_location | manager selects | `eu_uk` or `non_eu_uk` |
| complex_structure | manager selects | `true` / `false` |
| plan | manager selects | `business` / `scale` / `private` |
| first_months | issue month +0..+2 | November 2026 to January 2027 |
| iban, bic, sort_code_account | client's newly issued Payset account (EUR); sort code/account only if GBP details exist, otherwise omit row | |
| crypto_asset_network, wallet_address, crypto_amount, rate_date | ops/treasury at issue time; omit Option 2 entirely for UK-resident clients | USDT, TRC20 |

## Pricing rules (EUR)

- Setup fee: **€500** EU/UK company, **€1,000** non-EU/UK company.
- Complex structure: **+€500** one-time, only if selected (otherwise drop the line or show qty 0).
- Monthly plan fee × 3: Business **€100** (€300), Scale **€300** (€900), Private **€1,500** (€4,500).
- VAT: **Exempt**. Total = subtotal.
- Examples: EU Business simple = €800; non-EU Scale complex = €1,000 + €500 + €900 = €2,400; EU Private = €500 + €4,500 = €5,000.

## Document content (in order)

1. Header: logo left; right: "Payment request" / "Opening payment, before account access".
2. BILL TO: company name, address, "Company number: …". DETAILS: Request no., Date, Application ID, Payment due "Before account access".
3. SETUP OPTIONS (shows the manager's selections): Company location, Complex structure, Plan.
4. Intro: "Thank you for choosing Payset. Your application is approved. To open your account, please pay the setup fee and your first three months of plan fees below."
5. Line items (Description / Qty / Unit price / Amount):
   - Setup fee: "One-time. €500 for an EU/UK company, €1,000 for a non-EU/UK company."
   - Complex structure (if selected): "One-time." 1 × €500.
   - Monthly plan fee: {Plan}: "First three months, paid in advance: {Month 1} to {Month 3}." 3 × fee.
   - Subtotal, VAT "Exempt", **Total due**.
6. How to pay:
   - Option 1: Bank transfer to your Payset account: Account name (client), IBAN, BIC/SWIFT, Sort code/account (if any), Currency EUR, Reference = request_no. Note: "These are your own new account details. Send the payment from your existing business account."
   - Option 2: Crypto: Asset and network, Wallet address, Amount ("{amount} at the rate quoted on {date}"), Reference. Note (mandatory): "Provided by our separately licensed group partner, not by Pay Set Limited. Not an FCA-regulated activity. Not available to clients resident in the UK."
7. Good to know:
   - Your account opens as soon as this payment is received in full.
   - The setup fee is non-refundable. The three months of plan fees cover your first three billing months; regular monthly billing starts in month four.
   - Use the reference above. Intermediary bank charges are paid by the sender. This request is valid for 30 days; after that your approval lapses.
   - Questions? Contact your Payset team at business@payset.io.
8. Footer (every page, small grey): "Pay Set Limited is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011 (FRN 900920). Payset is not a bank: client funds are safeguarded and are not covered by the Financial Services Compensation Scheme. Registered in England and Wales, company number 11529161. 9th Floor, 9 Appold Street, London EC2A 2AP."

## Style

Green `#256C4A` (labels, section rules, option titles), ink `#1A1A1A`, muted `#646464`, rules `#D9D4CE`, tinted fills `#F5F2EF`. Arial. One A4 page.

## Behaviour

- Output PDF (send to client) + keep DOCX for edits. File name: `Payset_Payment_Request_{request_no}.pdf`.
- Expiry = date + 30 days; on expiry mark the application's approval as lapsed.
- On receipt of the full amount with the reference, unlock account access and set the next billing date to month 4.
- Never call Payset a bank. Never offer crypto to UK-resident clients.
