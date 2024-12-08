import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { BackgroundDesign } from "@/components/background-design"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KeyHaven",
  description: "Generate secure passwords and manage your password history",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen relative overflow-hidden">
            <BackgroundDesign />
            <Header />
            <main className="flex-grow container mx-auto p-4 relative z-10 flex items-center justify-center">
              {children}
            </main>
            <footer className="border-t relative z-10">
              <div className="container mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} KeyHaven Generator. All rights reserved.
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

