"use client"

import type React from "react"
import { Shield } from "@/components/icons"
import { TestimonialSlider } from "@/components/testimonial-slider"
import type { Testimonial } from "@/types/index"
import "../app/globals.css"

import Image from "next/image"

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
    <div className="w-[354px] p-6 hidden sm:flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[20px] H1 text-[#111827]">OnlineMed</h1>
      </div>

      {/* Money Back Guarantee */}
      <div className="flex items-center gap-2 mb-8 font-bold">
        <Image className="w-5 h-5" src="/approved.png" alt="Money Back Guarantee" width={20} height={20} />
        <span className="text-blue-600 font-bold text-[14px]">Money Back Guarantee</span>
      </div>

      {/* Main Heading */}
      <div className="mb-8">
        <h2 className="text-[32px] H1 font-bold text-gray-900 leading-tight">
          Your <span className="text-blue-600">Work</span> Note
          <br />
          is Minutes Away
        </h2>
      </div>

      {/* Note Text */}
      <div className="mb-auto">
        <p className="text-[16] text-[#111827] leading-relaxed">
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
