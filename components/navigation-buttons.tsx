"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "@/components/icons"
import { motion } from "framer-motion"
import type { FormState } from "@/types/index"

interface NavigationButtonsProps {
  formState: FormState
  email: string
  isLoading: boolean
  verificationCode: string[]
  handleBack: () => void
  handleNext: () => Promise<void>
  isEmailInputValid: boolean // Re-added prop for email input validity
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  formState,
  email,
  isLoading,
  verificationCode,
  handleBack,
  handleNext,
  isEmailInputValid, // Destructure new prop
}) => {
  return (
    <motion.div layout className="flex justify-between items-center" transition={{ duration: 0.6, ease: "easeInOut" }}>
      <Button
        variant="ghost"
        onClick={handleBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-transparent p-0"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </Button>

      <Button
        onClick={formState === "email" ? handleNext : undefined}
        className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-2 rounded-lg font-medium disabled:opacity-50"
        disabled={
          formState === "email"
            ? !email.trim() || isLoading || !isEmailInputValid // Disable if email is invalid
            : verificationCode.some((digit) => !digit)
        }
      >
        {isLoading ? "Sending..." : "Next"}
      </Button>
    </motion.div>
  )
}
