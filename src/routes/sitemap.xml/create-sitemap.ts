export interface SitemapEntry {
  loc: string;
  changefreq: string;
  lastmod: string;
  priority: number;
}

export function createSitemap(entries: SitemapEntry[]) {
  const baseUrl = `https://${process.env.AZURE_CUSTOM_DOMAIN ?? "localhost"}`;

  return `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${entries.map(
        (entry) => `
          <url>
              <loc>${baseUrl}${entry.loc.startsWith("/") ? "" : "/"}${entry.loc}</loc>
              <priority>${entry.priority}</priority>
              <changefreq>${entry.changefreq}</changefreq>
              <lastmod>${new Date().toISOString()}</lastmod>
          </url>`,
      )}
    </urlset>
    `.trim();
}
