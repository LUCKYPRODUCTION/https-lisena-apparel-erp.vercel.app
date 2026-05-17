// packages/ui/src/components/ui/card.tsx
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const cardVariants = cva(
  "glassmorphism rounded-2xl border-0 bg-gradient-to-br from-white/80 to-white/20 backdrop-blur-xl shadow-xl",
  {
    variants: {
      variant: {
        default: "glassmorphism",
        outline: "border border-white/20 bg-transparent/50"
      }
    }
  }
)

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ className }))}
      {...props}
    />
  )
}
