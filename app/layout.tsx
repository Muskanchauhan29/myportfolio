import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muskan | Data Science Portfolio",
  description:
    "Muskan Chauhan — Data Science student at Maharshi Dayanand University. Turning raw data into real insights.",
  keywords: ["Data Science", "Portfolio", "Python", "Machine Learning", "Muskan Chauhan"],
  authors: [{ name: "Muskan Chauhan" }],
  openGraph: {
    title: "Muskan | Data Science Portfolio",
    description: "Turning raw data into real insights",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="antialiased" style={{ backgroundColor: "#F9F7F4" }}>
        {children}
      </body>
    </html>
  );
}
