import { Check } from 'lucide-react'
import { WordPackage } from '../App'

interface PackageCardProps {
  package: WordPackage
  isSelected: boolean
  onToggle: () => void
}

// Map package IDs to icons (using emoji-like icons)
const PACKAGE_ICONS: Record<string, string> = {
  animals: '🦁',
  movies: '🎬',
  series: '📺',
  food: '🍕',
  general: '🌍',
  famous: '⭐',
}

function PackageCard({ package: pkg, isSelected, onToggle }: PackageCardProps) {
  const icon = PACKAGE_ICONS[pkg.id] || '📦'

  return (
    <button
      onClick={onToggle}
      className={`rounded-2xl p-4 text-center transition-all relative ${
        isSelected
          ? 'bg-impostor-red border-2 border-impostor-red-dark'
          : 'bg-white hover:bg-impostor-cream-dark border-2 border-transparent hover:border-impostor-red/50'
      }`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className={`font-bold text-sm mb-2 ${isSelected ? 'text-white' : 'text-impostor-text'}`}>
        {pkg.name}
      </h3>
      <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-impostor-text-secondary'}`}>
        {pkg.words.length} palabras
      </p>

      {isSelected && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
          <Check size={16} className="text-impostor-red" />
        </div>
      )}
    </button>
  )
}

export default PackageCard
