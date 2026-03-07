import { useState } from 'react'
import { motion } from 'framer-motion'
import { EyeOff } from 'lucide-react'

interface RevealCardProps {
  onReveal: () => void
}

function RevealCard({ onReveal }: RevealCardProps) {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm">
      <p className="text-impostor-text text-center mb-8">
        Desliza hacia arriba para revelar
      </p>

      <motion.div
        drag="y"
        dragConstraints={{ top: -200, bottom: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false)
          if (info.offset.y < -100) {
            onReveal()
          }
        }}
        className={`w-full rounded-3xl p-12 text-center cursor-grab active:cursor-grabbing ${
          isDragging ? 'bg-impostor-red/80' : 'bg-impostor-red'
        } border-4 border-impostor-red-dark transition`}
      >
        <div className="flex flex-col items-center gap-4">
          <EyeOff size={48} className="text-white" />
          <p className="text-white font-bold text-lg">Tapa Cerrada</p>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <ChevronUp size={18} />
            Arrastra hacia arriba
          </div>
        </div>
      </motion.div>

      <p className="text-impostor-text-secondary text-xs mt-12 text-center">
        Mantén el móvil en alto para que otros no vean
      </p>
    </div>
  )
}

// Simple chevron icon if lucide doesn't have it
function ChevronUp({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  )
}

export default RevealCard
