export type FormState = "email" | "verification"

export type Testimonial = {
  id: number
  initials: string
  name: string
  role: string
  location: string
  rating: number
  timeAgo: string
  review: string
}
