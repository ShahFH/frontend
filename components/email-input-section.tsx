"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "@/components/icons"
import { useState, useEffect } from "react"

interface EmailInputSectionProps {
  email: string
  setEmail: (email: string) => void
  isLoading: boolean
  showEmailShimmer: boolean
  onValidityChange: (isValid: boolean) => void // Re-added prop to communicate validity
}

export const EmailInputSection: React.FC<EmailInputSectionProps> = ({
  email,
  setEmail,
  isLoading,
  showEmailShimmer,
  onValidityChange,
}) => {
  const [isValidEmail, setIsValidEmail] = useState(true) // Re-added state for email validity

  // Basic email validation regex
  const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    // Consider empty string valid for initial state, but require format for actual input
    const isValid = validateEmailFormat(newEmail) || newEmail === ""
    setIsValidEmail(isValid)
    onValidityChange(isValid) // Communicate validity to parent
  }

  // Initial validation when component mounts or email prop changes
  useEffect(() => {
    const isValid = validateEmailFormat(email) || email === ""
    setIsValidEmail(isValid)
    onValidityChange(isValid)
  }, [email, onValidityChange])

  return (
    <motion.div
      key="email-input-field-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="mb-12"
    >
      <motion.div
        layoutId="email-form-container"
        className="relative flex items-center h-12 rounded-lg border-2" // Removed conditional border-red-500
        animate={{
          backgroundColor: isLoading ? "#FFFFFF" : "#FFFFFF",
          borderColor: isLoading ? "#3B82F6" : "#BFDBFE", // Removed invalid email border color
        }}
        transition={{ duration: 0.3 }}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={handleEmailChange} // Use the new handler
          className="w-full h-full px-4 pr-12 text-[16px] text-[#353849] bg-transparent focus:border-[#2563EB] focus:ring-0 focus:outline focus:outline-blue-600 py-0 leading-[3rem]"
          disabled={isLoading}
        />
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-3 bottom-3 transform -translate-y-1/2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Loader2 className="w-5 h-5 text-[#2563EB]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Removed AnimatePresence and motion.p for error message */}
    </motion.div>
  )
}
