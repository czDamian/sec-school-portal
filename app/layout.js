import { CivicAuthProvider } from "@civic/auth/nextjs";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "Memorial Grammar School",
  description: "Memorial Grammar School Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <CivicAuthProvider>{children}</CivicAuthProvider>
      </body>
    </html>
  );
}
