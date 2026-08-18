import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://driftdigitally.com"),
  title: {
    default: "Drift Digitally | Premium Digital Agency & Web Development",
    template: "%s | Drift Digitally",
  },
  description:
    "Drift Digitally is a premier digital agency building high-performance websites, custom web applications, brand identities, and digital growth strategies that never blend in.",
  keywords: [
    "Drift Digitally",
    "Digital Agency",
    "Web Development",
    "UI UX Design",
    "Brand Strategy",
    "Digital Marketing",
    "Drift Digitally Agency",
  ],
  authors: [{ name: "Drift Digitally", url: "https://driftdigitally.com" }],
  creator: "Drift Digitally",
  publisher: "Drift Digitally",
  openGraph: {
    title: "Drift Digitally | Premium Digital Agency & Web Development",
    description:
      "Drift Digitally — We Build Brands That Grow, Look Premium, and Never Blend In.",
    url: "https://driftdigitally.com",
    siteName: "Drift Digitally",
    images: [
      {
        url: "https://driftdigitally.com/logo.png",
        width: 2000,
        height: 2000,
        alt: "Drift Digitally Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drift Digitally | Premium Digital Agency & Web Development",
    description:
      "Drift Digitally — We Build Brands That Grow, Look Premium, and Never Blend In.",
    images: ["https://driftdigitally.com/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Drift Digitally",
  alternateName: ["DriftDigitally", "Drift Digitally Agency"],
  url: "https://driftdigitally.com",
  logo: "https://driftdigitally.com/logo.png",
  image: "https://driftdigitally.com/logo.png",
  description:
    "Drift Digitally is a premier digital agency building high-performance websites, custom web applications, brand identities, and digital growth strategies.",
  sameAs: [],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Drift Digitally",
  alternateName: ["DriftDigitally", "Drift Digitally Agency"],
  url: "https://driftdigitally.com",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning prevents false warnings from browser extensions
    // (e.g. password managers, dark-mode tools) that inject attributes on <html>.
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebSite),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

