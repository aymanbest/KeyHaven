import { PasswordGenerator } from "@/components/password-generator"

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
        Craft Your Secure Key
      </h1>
      <PasswordGenerator />
    </div>
  )
}

