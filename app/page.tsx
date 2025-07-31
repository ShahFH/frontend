"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { EmailInputSection } from "@/components/email-input-section"
import { VerificationSection } from "@/components/verification-section"
import { NavigationButtons } from "@/components/navigation-buttons"
import type { FormState, Testimonial } from "@/types/index"

const testimonials: Testimonial[] = [
  {
    id: 1,
    initials: "NP",
    name: "Nick P.",
    role: "Student",
    location: "New York",
    rating: 5,
    timeAgo: "1 week ago",
    review:
      "Woke up with severe stomach flu and needed documentation for work. The doctor was thorough, professional, and I had my note in minutes.",
  },
  {
    id: 2,
    initials: "JS",
    name: "Jane S.",
    role: "Teacher",
    location: "California",
    rating: 5,
    timeAgo: "3 days ago",
    review:
      "OnlineMed made getting a doctor's note incredibly easy. The process was quick, and the note was accepted without any issues. Highly recommend!",
  },
  {
    id: 3,
    initials: "MK",
    name: "Mark K.",
    role: "Engineer",
    location: "Texas",
    rating: 5,
    timeAgo: "2 weeks ago",
    review:
      "Needed a note for a minor injury. The virtual consultation was efficient, and I received my documentation promptly. Excellent service!",
  },
]

const Page: React.FC = () => {
  const [email, setEmail] = useState("")
  const [formState, setFormState] = useState<FormState>("email")
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [showEmailShimmer, setShowEmailShimmer] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  const handleNext = async () => {
    if (!email.trim()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setFormState("verification")
    setShowEmailShimmer(true) // Trigger shimmer when entering verification state
  }

  const handleBack = () => {
    if (formState === "verification") {
      setFormState("email")
      setVerificationCode(["", "", "", ""])
      setIsLoading(false)
      setShowEmailShimmer(false) // Reset shimmer state
    }
    // Add logic for going to previous step in the overall flow if this were a multi-step form
  }

  const handleChangeEmail = () => {
    setFormState("email")
    setVerificationCode(["", "", "", ""])
    setIsLoading(false)
    setShowEmailShimmer(false) // Reset shimmer state
  }

  const handleVerificationInput = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Effect to turn off shimmer after a short duration
  useEffect(() => {
    if (showEmailShimmer) {
      const timer = setTimeout(() => {
        setShowEmailShimmer(false)
      }, 1500) // Shimmer for 1.5 seconds
      return () => clearTimeout(timer)
    }
  }, [showEmailShimmer])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        testimonials={testimonials}
        currentTestimonialIndex={currentTestimonialIndex}
        setCurrentTestimonialIndex={setCurrentTestimonialIndex}
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Step Indicator */}
          <motion.div
            className="mb-8 text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-600 font-medium">Step 3/9</span>
          </motion.div>

          {/* Question */}
          <motion.div
            className="text-left mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-3xl font-bold text-gray-900">What is your email?</h3>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            className="text-left mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-600">This is where we send the note</p>
          </motion.div>

          {/* Email Input / Display & Verification Section */}
          <AnimatePresence mode="wait">
            {formState === "email" ? (
              <EmailInputSection
                email={email}
                setEmail={setEmail}
                isLoading={isLoading}
                showEmailShimmer={showEmailShimmer}
              />
            ) : (
              <VerificationSection
                email={email}
                verificationCode={verificationCode}
                inputRefs={inputRefs}
                handleVerificationInput={handleVerificationInput}
                handleKeyDown={handleKeyDown}
                handleChangeEmail={handleChangeEmail}
                showEmailShimmer={showEmailShimmer}
              />
            )}
          </AnimatePresence>

          <NavigationButtons
            formState={formState}
            email={email}
            isLoading={isLoading}
            verificationCode={verificationCode}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
