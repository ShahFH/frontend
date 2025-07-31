"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

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
        className="bg-blue-50 px-4 py-3 flex items-center justify-between border-b border-gray-200"
        transition={{ duration: 0.5, ease: "easeInOut" }} // Explicit transition for layoutId element
      >
        <div className="flex items-center gap-3">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }} // Adjusted delay
            className="text-blue-600 font-medium"
          >
            Email
          </motion.span>
          <span className="relative overflow-hidden">
            <motion.span
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: [0, 5, 0], opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }} // Adjusted delay
              className="relative z-10 text-gray-900"
            >
              {email}
            </motion.span>
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
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-1 h-auto text-sm"
          >
            Change
          </Button>
        </motion.div>
      </motion.div>

      {/* Verification Section Content */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-4"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-2">Enter verification code</h4>
        <p className="text-sm text-gray-600 mb-6">
          Enter the code sent to <span className="font-medium">{email}</span> to use your saved information.
        </p>

        {/* Verification Code Inputs */}
        <div className="flex gap-3 mb-4">
          {verificationCode.map((digit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
            >
              <Input
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleVerificationInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-0"
              />
            </motion.div>
          ))}
        </div>

        {/* Send Again Link */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1.0 }}>
          <p className="text-sm text-gray-500">
            Didn't receive a code? <button className="text-blue-600 hover:text-blue-700 font-medium">Send again</button>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
