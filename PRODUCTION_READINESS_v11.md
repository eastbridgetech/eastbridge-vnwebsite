# EastBridge v11.0 Production Readiness

## Completed

- Vietnamese is the root/default language.
- English is stored under `/en/`.
- Malay is stored under `/ms/` and targets `eastbridge.my` canonicals.
- Simplified Chinese is stored under `/zh/` and targets `eastbridge.sg` canonicals.
- Every public page includes self-referencing canonical metadata and reciprocal language alternates.
- `x-default` points to the Vietnamese equivalent.
- Separate same-host sitemaps are supplied for Vietnam, Malaysia and Singapore.
- Legacy English-root and `/vi/` paths are redirected or provided with noindex fallback pages.
- The CSR page uses a restrained Vietnam red/yellow visual system, star motif and local-impact messaging.
- Navigation, language selection, mobile hero actions, animations and accessibility motion preferences are implemented.
- GitHub Pages and Cloudflare deployment support files are included.

## Final owner actions

1. Confirm the final legal company name, address, privacy wording and public team-member consent.
2. Replace the Bing verification token if Bing provides a different value.
3. Add the Google Search Console verification record or file supplied to the domain owner.
4. Configure DNS and SSL for all three domains.
5. Test the contact mailto flow on desktop and mobile.
6. Submit each domain and its matching sitemap to Google Search Console and Bing Webmaster Tools.
7. Connect a privacy-respecting analytics platform only after consent and privacy requirements are confirmed.

## Recommended launch model

Use Cloudflare Pages as the production edge for all three domains and retain GitHub as the version-controlled source. GitHub Pages can also publish `eastbridge.vn` directly as a staging or fallback deployment.
