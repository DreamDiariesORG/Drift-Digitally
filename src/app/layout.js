import "./globals.css";

export const metadata = {
  title: "Drift Digitally",
  description: "Drift Digitally — We Build Brands That Grow, Look Premium, and Never Blend In.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
