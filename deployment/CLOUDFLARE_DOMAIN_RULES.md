# Cloudflare domain routing summary

Use 301 redirects or the included Worker so that regional domains land on their language folders:

- Host equals `eastbridge.my` or `www.eastbridge.my`, path is `/` → `/ms/`
- Host equals `eastbridge.sg` or `www.eastbridge.sg`, path is `/` → `/zh/`
- Keep `eastbridge.vn` root unchanged because Vietnamese is the default.

For strong SEO, keep each localized page accessible through its dedicated URL and do not replace all pages with browser-language detection. The HTML pages already contain reciprocal cross-domain hreflang annotations.
