"use client"

import type React from "react"
import { Shield } from "@/components/icons"
import { TestimonialSlider } from "@/components/testimonial-slider"
import type { Testimonial } from "@/types/index"

interface SidebarProps {
  testimonials: Testimonial[]
  currentTestimonialIndex: number
  setCurrentTestimonialIndex: (index: number) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  testimonials,
  currentTestimonialIndex,
  setCurrentTestimonialIndex,
}) => {
  return (
    <div className="w-80 bg-blue-50 p-6 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900">OnlineMed</h1>
      </div>

      {/* Money Back Guarantee */}
      <div className="flex items-center gap-2 mb-8 font-bold">
        <Shield className="w-5 h-5 text-blue-600" />
        <span className="text-blue-600 font-bold">Money Back Guarantee</span>
      </div>

      {/* Main Heading */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
          Your <span className="text-blue-600">Work</span> Note
          <br />
          is Minutes Away
        </h2>
      </div>

      {/* Note Text */}
      <div className="mb-auto">
        <p className="text-sm text-gray-600 leading-relaxed">
          Note: Due to capacity we are currently only able to provide a limited number of notes per day. To see if you
          qualify please fill out the following short survey!
        </p>
      </div>

      {/* Testimonial Slider */}
      <TestimonialSlider
        testimonials={testimonials}
        currentTestimonialIndex={currentTestimonialIndex}
        setCurrentTestimonialIndex={setCurrentTestimonialIndex}
      />
    </div>
  )
}
