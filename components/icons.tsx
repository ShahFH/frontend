import type React from "react"
import { ShieldIcon, StarIcon, Loader2Icon, ChevronLeftIcon } from "lucide-react"

interface IconProps {
  className?: string
}

export const Shield: React.FC<IconProps> = ({ className }) => <ShieldIcon className={className} />
export const Star: React.FC<IconProps> = ({ className }) => <StarIcon className={className} />
export const Loader2: React.FC<IconProps> = ({ className }) => <Loader2Icon className={className} />
export const ChevronLeft: React.FC<IconProps> = ({ className }) => <ChevronLeftIcon className={className} />
