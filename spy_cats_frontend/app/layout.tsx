import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spy Cats Dashboard",
  description: "Management dashboard for the Spy Cat Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100`}
      >
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white p-2 rounded-full mr-4">
                  <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-white">Spy Cat Agency</h1>
              </div>
              <nav className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="bg-blue-800 text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                </div>
              </nav>
            </div>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer className="bg-white mt-12">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Spy Cat Agency. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}