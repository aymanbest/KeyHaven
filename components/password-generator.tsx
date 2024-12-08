"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { generatePassword, savePasswordToHistory } from "@/lib/utils"
import { Lock, Copy, Check } from 'lucide-react'

export function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(12)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [useSeed, setUseSeed] = useState(false)
  const [seedWord, setSeedWord] = useState("")
  const [seedPosition, setSeedPosition] = useState("start")
  const [note, setNote] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(
      length,
      useUppercase,
      useLowercase,
      useNumbers,
      useSymbols,
      useSeed ? seedWord : "",
      useSeed ? seedPosition : "none"
    )
    setPassword(newPassword)
  }

  const handleSavePassword = () => {
    if (password) {
      savePasswordToHistory(password, note)
      setNote("")
      window.dispatchEvent(new CustomEvent('passwordSaved'))
    }
  }

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Password Generator
          </CardTitle>
          <CardDescription>Customize your password settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Input value={password} readOnly className="flex-grow text-lg" />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handleGeneratePassword}>Generate</Button>
            </motion.div>
            <Button variant="outline" size="icon" onClick={handleCopyPassword}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Password Length: {length}</Label>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Slider
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                min={6}
                max={30}
                step={1}
                className="w-full"
              />
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Switch id="uppercase" checked={useUppercase} onCheckedChange={setUseUppercase} />
              </motion.div>
              <Label htmlFor="uppercase">Uppercase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Switch id="lowercase" checked={useLowercase} onCheckedChange={setUseLowercase} />
              </motion.div>
              <Label htmlFor="lowercase">Lowercase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Switch id="numbers" checked={useNumbers} onCheckedChange={setUseNumbers} />
              </motion.div>
              <Label htmlFor="numbers">Numbers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Switch id="symbols" checked={useSymbols} onCheckedChange={setUseSymbols} />
              </motion.div>
              <Label htmlFor="symbols">Symbols</Label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Switch id="useSeed" checked={useSeed} onCheckedChange={setUseSeed} />
            </motion.div>
            <Label htmlFor="useSeed">Use Seed Word</Label>
          </div>
          <AnimatePresence>
            {useSeed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="seedWord">Seed Word</Label>
                  <Input
                    id="seedWord"
                    value={seedWord}
                    onChange={(e) => setSeedWord(e.target.value)}
                    placeholder="Enter a seed word"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Seed Position</Label>
                  <RadioGroup value={seedPosition} onValueChange={setSeedPosition} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="start" id="start" />
                      <Label htmlFor="start">Start</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="end" id="end" />
                      <Label htmlFor="end">End</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scrambled" id="scrambled" />
                      <Label htmlFor="scrambled">Scrambled</Label>
                    </div>
                  </RadioGroup>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note for this password..."
            />
          </div>
        </CardContent>
        <CardFooter>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleSavePassword} className="w-full">Save Password</Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

