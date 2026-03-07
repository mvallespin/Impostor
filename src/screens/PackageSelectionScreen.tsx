import { useState } from 'react'
import { X, Plus, Check } from 'lucide-react'
import { WordPackage } from '../App'
import PackageCard from '../components/PackageCard'
import CreateCustomPackageModal from '../components/CreateCustomPackageModal'

// Default packages with emojis as simple icons
const DEFAULT_PACKAGES: WordPackage[] = [
  {
    id: 'animals',
    name: 'Animales',
    words: ['Perro', 'Gato', 'Elefante', 'León', 'Pingüino', 'Delfín', 'Águila', 'Serpiente'],
    isCustom: false,
    selected: false,
  },
  {
    id: 'movies',
    name: 'Películas',
    words: ['Avatar', 'Titanic', 'Inception', 'Matrix', 'Interestelar', 'Gladiador', 'Shrek', 'Toy Story'],
    isCustom: false,
    selected: false,
  },
  {
    id: 'food',
    name: 'Comida',
    words: ['Pizza', 'Sushi', 'Hamburguesa', 'Pasta', 'Tacos', 'Ramen', 'Sopa', 'Ensalada'],
    isCustom: false,
    selected: false,
  },
  {
    id: 'places',
    name: 'Lugares',
    words: ['Playa', 'Montaña', 'Castillo', 'Bosque', 'Desierto', 'Cueva', 'Isla', 'Volcán'],
    isCustom: false,
    selected: false,
  },
  {
    id: 'jobs',
    name: 'Trabajos',
    words: ['Abogado', 'Programador', 'Chef', 'Astronauta', 'Piloto', 'Docente', 'Médico', 'Veterinario'],
    isCustom: false,
    selected: false,
  },
  {
    id: 'sports',
    name: 'Deportes',
    words: ['Fútbol', 'Baloncesto', 'Natación', 'Tenis', 'Golf', 'Esquí', 'Surf', 'Boxeo'],
    isCustom: false,
    selected: false,
  },
]

interface PackageSelectionScreenProps {
  packages: WordPackage[]
  selectedIds: string[]
  onAddCustom: (name: string, words: string[]) => void
  onSubmit: (selectedIds: string[]) => void
  onBack: () => void
}

function PackageSelectionScreen({
  packages,
  selectedIds,
  onAddCustom,
  onSubmit,
  onBack,
}: PackageSelectionScreenProps) {
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [allPackages, setAllPackages] = useState<WordPackage[]>(() => {
    const combined = [...DEFAULT_PACKAGES, ...packages.filter(p => p.isCustom)]
    return combined.map(p => ({
      ...p,
      selected: selectedIds.includes(p.id),
    }))
  })

  const togglePackage = (id: string) => {
    setAllPackages(prev =>
      prev.map(p =>
        p.id === id ? { ...p, selected: !p.selected } : p
      )
    )
  }

  const handleAddCustom = (name: string, words: string[]) => {
    onAddCustom(name, words)
    setShowCustomModal(false)
    const newPackage: WordPackage = {
      id: `custom_${Date.now()}`,
      name,
      words: words.map(w => w.trim()).filter(w => w.length > 0),
      isCustom: true,
      selected: true,
    }
    setAllPackages(prev => [...prev, newPackage])
  }

  const handleSubmit = () => {
    const selected = allPackages.filter(p => p.selected).map(p => p.id)
    if (selected.length === 0) {
      alert('Por favor, selecciona al menos un paquete de palabras')
      return
    }
    onSubmit(selected)
  }

  const selectedCount = allPackages.filter(p => p.selected).length

  return (
    <div className="h-screen bg-impostor-cream p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-impostor-red">Paquetes</h1>
        <button
          onClick={onBack}
          className="text-impostor-red hover:text-impostor-red-light"
        >
          <X size={28} />
        </button>
      </div>

      {/* Packages Grid */}
      <div className="flex-1 overflow-y-auto pb-2">
        <div className="grid grid-cols-2 gap-2">
          {allPackages.map(pkg => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              isSelected={pkg.selected}
              onToggle={() => togglePackage(pkg.id)}
            />
          ))}

          {/* Add Custom Package Button */}
          <button
            onClick={() => setShowCustomModal(true)}
            className="bg-white hover:bg-impostor-cream-dark border-2 border-dashed border-impostor-red rounded-xl p-4 flex flex-col items-center justify-center min-h-32 transition"
          >
            <Plus size={28} className="text-impostor-red mb-1" />
            <span className="text-impostor-red font-bold text-center text-xs">
              Crear paquete
            </span>
          </button>
        </div>
      </div>

      {/* Custom Package Modal */}
      {showCustomModal && (
        <CreateCustomPackageModal
          onSubmit={handleAddCustom}
          onCancel={() => setShowCustomModal(false)}
        />
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={selectedCount === 0}
        className="w-full bg-impostor-red hover:bg-impostor-red-light disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-white font-bold py-4 rounded-xl text-lg transition flex items-center justify-center gap-2 mt-2"
      >
        <Check size={20} />
        Iniciar ({selectedCount})
      </button>
    </div>
  )
}

export default PackageSelectionScreen
