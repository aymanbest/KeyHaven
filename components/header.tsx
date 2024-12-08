"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Lock } from 'lucide-react'
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function Header() {
  const pathname = usePathname()

  return (
    <motion.header
      className="border-b relative z-10 bg-background/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Lock className="h-6 w-6" />
            </motion.div>
            <span className="font-bold text-xl">KeyHaven</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Generate
              </motion.span>
            </Link>
            <Link
              href="/history"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/history" ? "text-primary" : "text-muted-foreground"
              )}
            >
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                History
              </motion.span>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

