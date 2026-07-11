/**
 * Optional Cloudflare Pages advanced-mode Worker.
 * Purpose:
 * - eastbridge.vn loads Vietnamese at the root.
 * - eastbridge.my redirects matching public pages to /ms/.
 * - eastbridge.sg redirects matching public pages to /zh/.
 * - Serves a domain-specific robots.txt.
 *
 * In Cloudflare Pages advanced mode, rename this file to /_worker.js.
 * The Pages project must expose the ASSETS binding.
 */
const MS = {
  '/':'/ms/', '/index.html':'/ms/', '/gioi-thieu.html':'/ms/tentang.html', '/about.html':'/ms/tentang.html',
  '/dich-vu.html':'/ms/perkhidmatan.html', '/services.html':'/ms/perkhidmatan.html',
  '/giai-phap.html':'/ms/penyelesaian.html', '/solutions.html':'/ms/penyelesaian.html',
  '/nganh.html':'/ms/industri.html', '/industries.html':'/ms/industri.html',
  '/dao-tao.html':'/ms/latihan.html', '/training.html':'/ms/latihan.html',
  '/co-van.html':'/ms/khidmat-nasihat.html', '/advisory.html':'/ms/khidmat-nasihat.html',
  '/doi-tac.html':'/ms/rakan-kongsi.html', '/partners.html':'/ms/rakan-kongsi.html',
  '/csr.html':'/ms/csr.html', '/lien-he.html':'/ms/hubungi.html', '/contact.html':'/ms/hubungi.html',
  '/lumora-studio.html':'/ms/lumora-studio.html'
};
const ZH = {
  '/':'/zh/', '/index.html':'/zh/', '/gioi-thieu.html':'/zh/about.html', '/about.html':'/zh/about.html',
  '/dich-vu.html':'/zh/services.html', '/services.html':'/zh/services.html',
  '/giai-phap.html':'/zh/solutions.html', '/solutions.html':'/zh/solutions.html',
  '/nganh.html':'/zh/industries.html', '/industries.html':'/zh/industries.html',
  '/dao-tao.html':'/zh/training.html', '/training.html':'/zh/training.html',
  '/co-van.html':'/zh/advisory.html', '/advisory.html':'/zh/advisory.html',
  '/doi-tac.html':'/zh/partners.html', '/partners.html':'/zh/partners.html',
  '/csr.html':'/zh/csr.html', '/lien-he.html':'/zh/contact.html', '/contact.html':'/zh/contact.html',
  '/lumora-studio.html':'/zh/lumora-studio.html'
};
const ROBOTS = {
  vn: `User-agent: *\nAllow: /\nSitemap: https://eastbridge.vn/sitemap.xml\n`,
  my: `User-agent: *\nAllow: /\nSitemap: https://eastbridge.my/sitemap-my.xml\n`,
  sg: `User-agent: *\nAllow: /\nSitemap: https://eastbridge.sg/sitemap-sg.xml\n`
};
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const isMY = host === 'eastbridge.my' || host === 'www.eastbridge.my';
    const isSG = host === 'eastbridge.sg' || host === 'www.eastbridge.sg';
    if (url.pathname === '/robots.txt') {
      const body = isMY ? ROBOTS.my : isSG ? ROBOTS.sg : ROBOTS.vn;
      return new Response(body, {headers:{'content-type':'text/plain; charset=utf-8','cache-control':'public, max-age=3600'}});
    }
    if (isMY && !url.pathname.startsWith('/ms/') && MS[url.pathname]) {
      const target = new URL(MS[url.pathname], url.origin); target.search = url.search;
      return Response.redirect(target.toString(), 301);
    }
    if (isSG && !url.pathname.startsWith('/zh/') && ZH[url.pathname]) {
      const target = new URL(ZH[url.pathname], url.origin); target.search = url.search;
      return Response.redirect(target.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};
