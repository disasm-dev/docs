# docs.disasm.dev

Astro + Starlight. Guides are in `src/content/docs`; the API reference is generated from the OpenAPI specs in
`openapi/` by `starlight-openapi`, one section per spec (listed in `astro.config.mjs`).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

To add a product: write its spec in `openapi/`, add it to `specs` in `astro.config.mjs`, and add its guide pages to the
sidebar there.

Every push to `main` builds the site and publishes it to GitHub Pages as https://docs.disasm.dev
(`.github/workflows/deploy.yml`).
