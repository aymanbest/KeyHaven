import { PasswordHistory } from "@/components/password-history"

export default function HistoryPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
        Your Key Vault
      </h1>
      <PasswordHistory />
    </div>
  )
}

