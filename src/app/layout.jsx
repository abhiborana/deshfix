import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Deshfix | Lets Fix Bharat",
  description:
    "Real problems • Real solutions | Practical Reforms • Better INDIA 🇮🇳 | From potholes to policies | Join the movement ⬇️",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  minimalUI: true,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased bg-neutral-200 text-black dark:bg-neutral-950 dark:text-white h-dvh w-screen overflow-hidden flex divide-x divide-neutral-300 dark:divide-neutral-800",
          geist.className
        )}
      >
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 p-4 h-full overflow-y-auto">{children}</main>
          {/* <section className="flex flex-col p-4 h-full w-fit md:w-full max-w-56"></section> */}
          <Analytics />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
