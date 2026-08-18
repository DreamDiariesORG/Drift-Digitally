export default function sitemap() {
  const baseUrl = "https://driftdigitally.com";
  const routes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/process",
    "/insights",
    "/industries",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
