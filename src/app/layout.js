import "./globals.css";

export const metadata = {
  title: "UpliftBiz",
  description: "Find local Black/Minority-owned businesses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
