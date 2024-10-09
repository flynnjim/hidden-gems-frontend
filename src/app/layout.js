import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/UserContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Hidden Gems",
  description: "Discover hidden gems in your city",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-bgcolor text-black">
        <UserProvider>
          <Header />
          <main className="container mx-auto p-4">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
