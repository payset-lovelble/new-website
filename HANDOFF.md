# Payset Private site: handoff

- `build/build.js` renders every page to static HTML from the Payset Website design system components (`window.PaysetWeb`), using React's server renderer.
  Run: `cd build && npm install && node build.js ../public`
- `build/ds-bundle.js` is the design system's component bundle with logo paths pointed at `/assets/`.
- `design-system/` is the Payset Website design system: README (brand rules, voice, imagery), tokens, component bundle and per-component API cards.
- `public/` (one level up) is the current built site: HTML, `tokens.css`, `bundle.css`, `site.css`, `assets/`.
- Deploy: `fly deploy` from the project root (Dockerfile + nginx.conf + fly.toml).
