import { useState, useEffect, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'
import { GameSettings, WordPackage } from '../App'

// Default packages - same as in PackageSelectionScreen
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

interface GamePlayScreenProps {
  settings: GameSettings
  selectedPackageIds: string[]
  packages: WordPackage[]
  onBack: () => void
}

function GamePlayScreen({
  settings,
  selectedPackageIds,
  packages,
  onBack,
}: GamePlayScreenProps) {
  const [gameState, setGameState] = useState<'reveal' | 'debate' | 'results'>('reveal')
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [impostorIndices, setImpostorIndices] = useState<number[]>([])
  const [currentWord, setCurrentWord] = useState('')
  const [isImpostor, setIsImpostor] = useState(false)
  const [showWord, setShowWord] = useState(false)
  const [allWords, setAllWords] = useState<string[]>([])
  const [playerIndices, setPlayerIndices] = useState<number[]>([])

  // Get player list
  const players = settings.players.length > 0 
    ? settings.players 
    : Array.from({ length: settings.numPlayers }, (_, i) => `Jugador ${i + 1}`)

  // Initialize game on mount
  useEffect(() => {
    // Combine DEFAULT_PACKAGES and custom packages
    const allPackages = [...DEFAULT_PACKAGES, ...packages]
    
    // Get all words from selected packages
    const wordsSet = new Set<string>()
    selectedPackageIds.forEach(id => {
      const pkg = allPackages.find(p => p.id === id)
      if (pkg) {
        pkg.words.forEach(w => wordsSet.add(w))
      }
    })
    const words = Array.from(wordsSet)
    setAllWords(words)

    // Select random word
    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)]
      setCurrentWord(randomWord)
    }

    // Randomly select impostors
    const impostorCount = Math.min(settings.numImpostors, players.length - 1)
    const indices: number[] = []
    while (indices.length < impostorCount) {
      const idx = Math.floor(Math.random() * players.length)
      if (!indices.includes(idx)) {
        indices.push(idx)
      }
    }
    setImpostorIndices(indices)

    // Create shuffled player order starting from random player
    const randomStart = Math.floor(Math.random() * players.length)
    const shuffled = []
    for (let i = 0; i < players.length; i++) {
      shuffled.push((randomStart + i) % players.length)
    }
    setPlayerIndices(shuffled)
    setCurrentPlayerIndex(0)
  }, [settings, packages, selectedPackageIds])


  const currentPlayerIdx = playerIndices[currentPlayerIndex]
  const currentPlayer = players[currentPlayerIdx]
  const currentIsImpostor = impostorIndices.includes(currentPlayerIdx)

  const handleViewWord = useCallback(() => {
    setIsImpostor(currentIsImpostor)
    setShowWord(true)
  }, [currentIsImpostor])

  const handleNextPlayer = () => {
    setShowWord(false)
    setIsImpostor(false)

    // Check if all players have seen their role
    if (currentPlayerIndex === playerIndices.length - 1) {
      // All players have seen their role, start debate
      setGameState('debate')
    } else {
      setCurrentPlayerIndex(prev => prev + 1)
    }
  }

  const handleRevealImpostor = () => {
    setGameState('results')
  }

  const handlePlayAgain = () => {
    // Select new word
    if (allWords.length > 0) {
      const randomWord = allWords[Math.floor(Math.random() * allWords.length)]
      setCurrentWord(randomWord)
    }

    // Recalculate impostors
    const impostorCount = Math.min(settings.numImpostors, players.length - 1)
    const indices: number[] = []
    while (indices.length < impostorCount) {
      const idx = Math.floor(Math.random() * players.length)
      if (!indices.includes(idx)) {
        indices.push(idx)
      }
    }
    setImpostorIndices(indices)

    // Shuffle player order again
    const randomStart = Math.floor(Math.random() * players.length)
    const shuffled = []
    for (let i = 0; i < players.length; i++) {
      shuffled.push((randomStart + i) % players.length)
    }
    setPlayerIndices(shuffled)
    setCurrentPlayerIndex(0)

    setGameState('reveal')
  }

  // Reveal screen - each player sees their word
  if (gameState === 'reveal') {
    return (
      <div className="h-[100dvh] bg-impostor-cream p-4 pb-[calc(env(safe-area-inset-bottom)+12px)] flex flex-col justify-center items-center overflow-hidden">
        <div className="w-full max-w-sm">
          {showWord ? (
            <>
              <div className="bg-white rounded-2xl p-6 text-center border-2 border-impostor-red mb-4">
                {isImpostor ? (
                  <div>
                    <p className="text-impostor-text-secondary text-sm font-semibold mb-2">TÚ ERES</p>
                    <p className="text-5xl font-black text-impostor-red">IMPOSTOR</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-impostor-text-secondary text-xs font-semibold mb-2">LA PALABRA ES:</p>
                    <p className="text-4xl font-black text-impostor-text break-words">{currentWord}</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleNextPlayer}
                className="w-full bg-impostor-red hover:bg-impostor-red-light text-white font-bold py-4 rounded-xl text-lg transition"
              >
                {currentPlayerIndex === playerIndices.length - 1 ? 'Iniciar Debate' : 'Siguiente'}
              </button>

              <p className="text-impostor-text-secondary text-xs text-center pt-3">
                {currentPlayerIndex + 1}/{playerIndices.length}
              </p>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <p className="text-impostor-text-secondary text-sm font-semibold mb-2">Turno de:</p>
                <p className="text-5xl font-black text-impostor-red mb-4">{currentPlayer}</p>
                <p className="text-impostor-text text-base">¿Preparado?</p>
              </div>

              <button
                onClick={handleViewWord}
                className="w-full bg-impostor-red hover:bg-impostor-red-light active:scale-95 text-white font-bold py-4 rounded-xl text-lg transition"
              >
                Ver Palabra/Rol
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // Debate screen
  if (gameState === 'debate') {
    return (
      <div className="h-[100dvh] bg-impostor-cream p-4 pb-[calc(env(safe-area-inset-bottom)+12px)] flex flex-col justify-center items-center overflow-hidden">
        <div className="w-full max-w-sm text-center mb-6">
          <h1 className="text-4xl font-bold text-impostor-red mb-4">¡En Debate!</h1>
          <p className="text-impostor-text text-lg">
            Identificad al Impostor
          </p>
        </div>

        <button
          onClick={handleRevealImpostor}
          className="w-full max-w-sm bg-impostor-red hover:bg-impostor-red-light active:scale-95 text-white font-bold py-4 rounded-xl text-lg transition"
        >
          Desvelar Impostor
        </button>
      </div>
    )
  }

  // Results screen
  return (
    <div className="h-[100dvh] bg-impostor-cream p-4 pb-[calc(env(safe-area-inset-bottom)+12px)] flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full max-w-sm text-center mb-6">
        <h1 className="text-4xl font-bold text-impostor-red mb-4">¡Fin de Ronda!</h1>
        
        <p className="text-impostor-text-secondary text-sm font-semibold mb-2">El Impostor:</p>
        <div className="bg-impostor-red text-white rounded-xl p-4 mb-3">
          <p className="text-3xl font-black">{impostorIndices.map(idx => players[idx]).join(', ')}</p>
        </div>
        <p className="text-impostor-text text-base">
          Palabra: <span className="font-bold text-impostor-red">{currentWord}</span>
        </p>
      </div>

      <div className="space-y-2 w-full max-w-sm">
        <button
          onClick={handlePlayAgain}
          className="w-full bg-impostor-red hover:bg-impostor-red-light active:scale-95 text-white font-bold py-4 rounded-xl text-lg transition flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          Jugar de Nuevo
        </button>
        <button
          onClick={onBack}
          className="w-full bg-white hover:bg-impostor-cream-dark border border-impostor-red text-impostor-red font-bold py-3 rounded-xl text-base transition"
        >
          Volver al Menú
        </button>
      </div>
    </div>
  )
}

export default GamePlayScreen
