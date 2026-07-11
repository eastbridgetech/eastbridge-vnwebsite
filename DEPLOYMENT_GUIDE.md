# Deployment Guide — EastBridge v11.0

## A. Upload to GitHub

1. Extract the ZIP on your computer.
2. Open the extracted website folder and select **all files and folders inside it**.
3. Drag those items into the GitHub repository upload area. Do not upload only the ZIP and do not add an extra parent folder.
4. Commit with a message such as `Deploy EastBridge multilingual website v11.0`.
5. Confirm that `index.html`, `assets/`, `en/`, `ms/`, `zh/`, `CNAME` and `.github/` appear at the repository root.

## B. GitHub Pages

The package includes `.github/workflows/pages.yml` and `CNAME` set to `eastbridge.vn`.

1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions**.
3. Push or commit to the `main` branch.
4. Open **Actions** and wait for `Deploy EastBridge website to GitHub Pages` to complete.
5. In DNS, add the GitHub Pages records recommended by GitHub for the apex domain and configure `www` if required.
6. Enable **Enforce HTTPS** after DNS becomes valid.

GitHub Pages supports one configured custom domain per Pages site. Therefore, use `eastbridge.vn` as the GitHub Pages custom domain. Use Cloudflare Pages or a Cloudflare Worker/redirect layer for `eastbridge.my` and `eastbridge.sg`.

## C. Recommended Cloudflare Pages production deployment

1. In Cloudflare, create a Pages project connected to the same GitHub repository.
2. Framework preset: **None**.
3. Build command: leave blank.
4. Build output directory: `/` (repository root).
5. Add custom domains:
   - `eastbridge.vn`
   - `eastbridge.my`
   - `eastbridge.sg`
6. The `_headers` and `_redirects` files are included for security headers, caching and legacy-path redirects.
7. For hostname-specific defaults, use `cloudflare/domain-router-worker.js`:
   - In Pages advanced mode, copy it to the repository root as `_worker.js`.
   - Confirm the Pages `ASSETS` binding is available.
   - Deploy and test before enabling production traffic.

Expected default behaviour:

- `https://eastbridge.vn/` → Vietnamese root
- `https://eastbridge.my/` → `https://eastbridge.my/ms/`
- `https://eastbridge.sg/` → `https://eastbridge.sg/zh/`

The in-page JavaScript also provides a fallback redirect, but the Cloudflare 301 is the preferred production routing method.

## D. SEO submission

Add and verify all three domain properties in Google Search Console and Bing Webmaster Tools.

Submit:

- `https://eastbridge.vn/sitemap.xml`
- `https://eastbridge.my/sitemap-my.xml`
- `https://eastbridge.sg/sitemap-sg.xml`

The page metadata already includes:

- Unique page titles and descriptions
- Self-referencing canonicals
- Reciprocal `hreflang` for `vi-VN`, `en`, `ms-MY`, `zh-Hans-SG`
- `x-default` to the Vietnamese equivalent
- Open Graph and Twitter metadata
- Organization, WebPage and Breadcrumb structured data
- Course structured data on training pages

## E. Verification and analytics

- `BingSiteAuth.xml` is retained from the previous package. Replace it if Bing provides a new verification token.
- Add the exact Google verification record or file issued to the domain owner; no placeholder verification code has been invented.
- Add analytics only after selecting the platform and confirming privacy/consent requirements.

## F. Go-live checklist

- Verify all DNS records and SSL certificates.
- Test every language from the same corresponding page.
- Test mobile navigation and hero buttons at 360 px, 390 px and 430 px widths.
- Test the contact email form on Windows, Android and iOS.
- Confirm team biographies and names have public-use approval.
- Confirm legal, privacy, cookie and terms pages required for the operating model.
- Run Lighthouse/PageSpeed after deployment because production caching and network conditions affect scores.
