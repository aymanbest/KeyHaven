import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generatePassword(
  length: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean,
  seedWord: string = "",
  seedPosition: string = "none"
): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercase = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

  let chars = ""
  if (useUppercase) chars += uppercase
  if (useLowercase) chars += lowercase
  if (useNumbers) chars += numbers
  if (useSymbols) chars += symbols

  if (chars.length === 0) return ""

  let password = ""
  for (let i = 0; i < length - seedWord.length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  if (seedWord) {
    switch (seedPosition) {
      case "start":
        password = seedWord + password
        break
      case "end":
        password = password + seedWord
        break
      case "scrambled":
        const combined = (seedWord + password).split('')
        for (let i = combined.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [combined[i], combined[j]] = [combined[j], combined[i]]
        }
        password = combined.join('')
        break
    }
  }

  return password.slice(0, length)
}

export interface PasswordEntry {
  password: string
  note: string
  createdAt: string
}

export function savePasswordToHistory(password: string, note: string) {
  const history = JSON.parse(localStorage.getItem("passwordHistory") || "[]") as PasswordEntry[]
  history.unshift({ password, note, createdAt: new Date().toISOString() })
  localStorage.setItem("passwordHistory", JSON.stringify(history.slice(0, 10))) // Keep only the last 10 entries
}

export function getPasswordHistory(): PasswordEntry[] {
  return JSON.parse(localStorage.getItem("passwordHistory") || "[]") as PasswordEntry[]
}

