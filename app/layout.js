import { Nunito } from "next/font/google";
import "./globals.css";

const geistSans = Nunito({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: "Pokedex",
  description: "Pokedex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className}`}
      >
        {children}
      </body>
    </html>
  );
}
