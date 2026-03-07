import { useState } from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'

interface CreateCustomPackageModalProps {
  onSubmit: (name: string, words: string[]) => void
  onCancel: () => void
}

function CreateCustomPackageModal({ onSubmit, onCancel }: CreateCustomPackageModalProps) {
  const [name, setName] = useState('')
  const [wordsText, setWordsText] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Por favor, ingresa un nombre para el paquete')
      return
    }

    const words = wordsText
      .split(',')
      .map(w => w.trim())
      .filter(w => w.length > 0)

    if (words.length === 0) {
      alert('Por favor, ingresa al menos una palabra')
      return
    }

    onSubmit(name.trim(), words)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 w-full max-w-sm border border-impostor-red/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-impostor-red">Crear Paquete</h2>
          <button
            onClick={onCancel}
            className="text-impostor-red hover:text-impostor-red-light"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-impostor-text text-sm font-semibold mb-2">
              Nombre del Paquete
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ej: Superhéroes, Videojuegos"
              className="w-full bg-impostor-cream text-impostor-text rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-impostor-red border border-impostor-cream-dark"
            />
          </div>

          <div>
            <label className="block text-impostor-text text-sm font-semibold mb-2">
              Palabras (separadas por comas)
            </label>
            <textarea
              value={wordsText}
              onChange={e => setWordsText(e.target.value)}
              placeholder="Ej: Batman, Superman, Ironman, Spiderman"
              rows={6}
              className="w-full bg-impostor-cream text-impostor-text rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-impostor-red resize-none border border-impostor-cream-dark"
            />
            <p className="text-impostor-text-secondary text-xs mt-2">
              Mínimo 2 palabras recomendadas
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              onClick={onCancel}
              className="flex-1 bg-impostor-cream hover:bg-impostor-cream-dark text-impostor-text rounded-lg py-2 font-bold transition border border-impostor-cream-dark"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-impostor-red hover:bg-impostor-red-light text-white rounded-lg py-2 font-bold transition"
            >
              Crear
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CreateCustomPackageModal
