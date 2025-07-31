"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "@/components/icons"

interface EmailInputSectionProps {
  email: string
  setEmail: (email: string) => void
  isLoading: boolean
  showEmailShimmer: boolean
}

export const EmailInputSection: React.FC<EmailInputSectionProps> = ({
  email,
  setEmail,
  isLoading,
  showEmailShimmer,
}) => {
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
        className="relative flex items-center h-12 rounded-lg border-2"
        animate={{
          backgroundColor: isLoading ? "#DBEAFE" : "#FFFFFF", // blue-100
          borderColor: isLoading ? "#3B82F6" : "#BFDBFE", // blue-600 : blue-200
        }}
        transition={{ duration: 0.3 }}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-full px-4 pr-12 text-base bg-transparent focus:border-[#2563EB] focus:ring-0 focus:outline focus:outline-blue-600 py-0 leading-[3rem]"
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
    </motion.div>
  )
}
