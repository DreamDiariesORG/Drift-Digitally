import "./globals.css";

export const metadata = {
  title: "Drift Digitally",
  description:
    "Drift Digitally — We Build Brands That Grow, Look Premium, and Never Blend In.",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning prevents false warnings from browser extensions
    // (e.g. password managers, dark-mode tools) that inject attributes on <html>.
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
