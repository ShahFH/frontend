"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import "../app/globals.css"

interface VerificationSectionProps {
  email: string
  verificationCode: string[]
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>
  handleVerificationInput: (index: number, value: string) => void
  handleKeyDown: (index: number, e: React.KeyboardEvent) => void
  handleChangeEmail: () => void
  showEmailShimmer: boolean
}

export const VerificationSection: React.FC<VerificationSectionProps> = ({
  email,
  verificationCode,
  inputRefs,
  handleVerificationInput,
  handleKeyDown,
  handleChangeEmail,
  showEmailShimmer,
}) => {
  return (
    <motion.div
      key="verification-display-container-wrapper"
      layout
      initial={{ opacity: 0, y: 20 }} // Added y: 20 for initial position (starts lower)
      animate={{ opacity: 1, y: 0 }} // Animates to final position (moves up)
      exit={{ opacity: 0, y: -20 }} // Exits by moving up and fading out
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8"
    >
      <motion.div
        layoutId="email-form-container"
        className="bg-blue-50 px-[24px] py-3 flex items-center justify-between border-b border-gray-200"
        transition={{ duration: 0.5, ease: "easeInOut" }} // Explicit transition for layoutId element
      >
        <div className="flex items-center gap-3">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }} // Adjusted delay
            className="text-[#2563EB] text-[16px] font-medium"
          >
            Email
          </motion.span>
          <span className="relative overflow-hidden">
            <span
              
              className="relative z-10 text-[#2563EB] shiny-text"
            >
              {email}
            </span>
            {showEmailShimmer && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent z-0"
              />
            )}
          </span>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.9 }} // Adjusted delay
        >
          <Button
            variant="ghost"
            onClick={handleChangeEmail}
            className="bg-[#4B556399] hover:bg-[#2f363e99] hover:bg-gray-100 px-3 py-1 h-auto text-[14px] underline"
          >
            Change
          </Button>
        </motion.div>
      </motion.div>

      {/* Verification Section Content */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ duration: 0.3, delay: 0.1,  ease: "easeOut" }}
        className="p-[24px]"
      >
        <h4 className="text-[16px] H1 text-gray-900 mb-2">Enter verification code</h4>
        <p className="text-[16px] text-[#353849] mb-6">
          Enter the code sent to <span className="font-medium">{email}</span> to use your saved information.
        </p>

        {/* Verification Code Inputs */}
        <div className="flex gap-3 mb-4">
          {verificationCode.map((digit, index) => (
            <div
            >
              <Input
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleVerificationInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-200 rounded-[12px] focus:rounded-[8px] focus:border-blue-500 focus:ring-0"
              />
            </div>
          ))}
        </div>

        {/* Send Again Link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1.0 }}>
          <p className="text-sm text-[#4B5563] opacity-60">
            Didn't receive a code? <button className="text-[#3971ED] hover:text-blue-700 font-medium">Send again</button>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
