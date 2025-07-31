"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "@/components/icons"
import { useEffect } from "react"
import type { Testimonial } from "@/types/index"
import "../app/globals.css"

interface TestimonialSliderProps {
  testimonials: Testimonial[]
  currentTestimonialIndex: number
  setCurrentTestimonialIndex: (index: number) => void
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
  currentTestimonialIndex,
  setCurrentTestimonialIndex,
}) => {
  // Auto-play for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000) // Change testimonial every 5 seconds
    return () => clearInterval(interval)
  }, [testimonials.length, setCurrentTestimonialIndex])

  const currentTestimonial = testimonials[currentTestimonialIndex]

  return (
    <>
      <div className="relative h-[200px] overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-white rounded-lg p-4 shadow-sm"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-200 rounded-[12px] flex items-center justify-center">
                <span className="text-sm font-semibold text-orange-800">{currentTestimonial.initials}</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{currentTestimonial.name}</div>
                <div className="text-sm text-gray-500">
                  {currentTestimonial.role} • {currentTestimonial.location}
                </div>
              </div>
            </div>

            {/* Stars and Date */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                ))}
              </div>
              <span className="text-sm text-gray-500">{currentTestimonial.timeAgo}</span>
            </div>

            {/* Review Text */}
            <p className="text-sm text-gray-700 leading-relaxed">{currentTestimonial.review}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-2 mt-6 justify-start">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === currentTestimonialIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentTestimonialIndex(index)}
          ></div>
        ))}
      </div>
    </>
  )
}
