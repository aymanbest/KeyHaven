"use client"

import { motion } from "framer-motion"
import { Lock, Key, Shield, Fingerprint, Eye, EyeOff } from 'lucide-react'

const icons = [Lock, Key, Shield, Fingerprint, Eye, EyeOff]

export function BackgroundDesign() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-background to-secondary/20" />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(60)].map((_, i) => {
          const Icon = icons[Math.floor(Math.random() * icons.length)]
          return (
            <motion.div
              key={i}
              className="absolute text-primary/10"
              style={{
                fontSize: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Icon />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

