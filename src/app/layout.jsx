import "./globals.css";
import { ThemeContextProvider } from "../lib/ThemeContext.jsx";

export const metadata = {
  title: "StayNest - Find Your Perfect Stay",
  description:
    "Discover and book amazing hotels, resorts, and accommodations worldwide with StayNest",
  keywords: "hotels, booking, travel, accommodation, vacation, resort",
  icons: {
    icon: "/staynestlogo.png",
    shortcut: "/staynestlogo.png",
    apple: "/staynestlogo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  );
}
