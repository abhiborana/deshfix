import Navbar from "@/components/navbar";
import PostDialog from "@/components/post-dialog";
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
  generator: "Next.js",
  applicationName: "deshfix",
  title: "Deshfix | Lets Fix Bharat",
  description:
    "Real problems • Real solutions | Practical Reforms • Better INDIA 🇮🇳 | From potholes to policies | Join the movement ⬇️",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  referrer: "no-referrer-when-downgrade",
  keywords: [
    "India",
    "Bharat",
    "Politics",
    "Elections",
    "Public welfare",
    "Bjp",
    "Congress",
    "Aam Aadmi Party",
  ],
};

export const viewport = {
  viewportFit: "cover",
  width: "device-width",
  // initialScale: 1,
  // maximumScale: 1,
  // userScalable: false,
  minimalUI: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        cz-shortcut-listen="true"
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
          <PostDialog />
          <Analytics />
          <Toaster richColors theme="light" />
        </ThemeProvider>
      </body>
    </html>
  );
}
