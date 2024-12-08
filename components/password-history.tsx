"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react'
import { getPasswordHistory, PasswordEntry } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function PasswordHistory() {
  const [history, setHistory] = useState<PasswordEntry[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [revealedPasswords, setRevealedPasswords] = useState<{ [key: number]: boolean }>({})
  const [expandedNotes, setExpandedNotes] = useState<{ [key: number]: boolean }>({})

  const itemsPerPage = 8
  const totalPages = Math.ceil(history.length / itemsPerPage)

  useEffect(() => {
    setHistory(getPasswordHistory())
    const handlePasswordSaved = () => {
      setHistory(getPasswordHistory())
    }
    window.addEventListener('passwordSaved', handlePasswordSaved)
    return () => {
      window.removeEventListener('passwordSaved', handlePasswordSaved)
    }
  }, [])

  const togglePasswordReveal = (index: number) => {
    setRevealedPasswords(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const toggleNoteExpand = (index: number) => {
    setExpandedNotes(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const paginatedHistory = history.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {paginatedHistory.map((entry, index) => (
            <motion.div
              key={entry.createdAt}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              layout
              whileHover={{ scale: 1.02 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {new Date(entry.createdAt).toLocaleString()}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePasswordReveal(index)}
                  >
                    {revealedPasswords[index] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <Input
                    type={revealedPasswords[index] ? "text" : "password"}
                    value={entry.password}
                    readOnly
                    className="mb-2"
                  />
                  <div className="mt-2 flex-grow">
                    <CardDescription className="text-sm">
                      {entry.note && entry.note.length > 100 ? (
                        <Collapsible>
                          <div className="hidden md:block">
                            <span className="line-clamp-2">{entry.note}</span>
                            <span className="hidden group-hover:inline">{entry.note}</span>
                          </div>
                          <div className="md:hidden">
                            <span>{entry.note.slice(0, 100)}...</span>
                            <CollapsibleContent>{entry.note.slice(100)}</CollapsibleContent>
                            <CollapsibleTrigger asChild>
                              <Button variant="link" size="sm" className="p-0 h-auto font-normal">
                                {expandedNotes[index] ? (
                                  <span className="flex items-center">Read less <ChevronUp className="h-4 w-4 ml-1" /></span>
                                ) : (
                                  <span className="flex items-center">Read more <ChevronDown className="h-4 w-4 ml-1" /></span>
                                )}
                              </Button>
                            </CollapsibleTrigger>
                          </div>
                        </Collapsible>
                      ) : (
                        entry.note || "No note provided"
                      )}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

