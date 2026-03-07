import { useState, useEffect, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'
import { GameSettings, WordPackage } from '../App'

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
    // Get all words from selected packages
    const wordsSet = new Set<string>()
    selectedPackageIds.forEach(id => {
      const pkg = packages.find(p => p.id === id)
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
      <div className="h-screen bg-impostor-cream p-3 flex flex-col justify-between items-center overflow-hidden">
        <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md">
          {showWord ? (
            <>
              <div className="bg-white rounded-2xl p-5 text-center mb-4 border-2 border-impostor-red w-full">
                {isImpostor ? (
                  <div>
                    <p className="text-impostor-text-secondary text-xs font-semibold mb-2">TÚ ERES</p>
                    <p className="text-4xl sm:text-5xl font-black text-impostor-red">IMPOSTOR</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-impostor-text-secondary text-xs font-semibold mb-2">LA PALABRA ES:</p>
                    <p className="text-3xl sm:text-5xl font-black text-impostor-text break-words line-clamp-3">{currentWord}</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleNextPlayer}
                className={`w-full py-3 rounded-xl font-bold text-sm sm:text-base transition ${
                  currentPlayerIndex === playerIndices.length - 1
                    ? 'bg-impostor-red hover:bg-impostor-red-light text-white'
                    : 'bg-impostor-red hover:bg-impostor-red-light text-white'
                }`}
              >
                {currentPlayerIndex === playerIndices.length - 1 ? 'Iniciar Debate' : 'Siguiente'}
              </button>
            </>
          ) : (
            <>
              <div className="text-center">
                <p className="text-impostor-text-secondary text-xs font-semibold mb-2">Turno de:</p>
                <p className="text-3xl sm:text-4xl font-black text-impostor-red mb-4">{currentPlayer}</p>
                <p className="text-impostor-text text-sm mb-4">¿Preparado?</p>
              </div>

              <button
                onClick={handleViewWord}
                className="w-full bg-impostor-red hover:bg-impostor-red-light active:scale-95 text-white font-bold py-3 rounded-xl text-base transition"
              >
                Ver Palabra/Rol
              </button>
            </>
          )}
        </div>

        <p className="text-impostor-text-secondary text-xs text-center pb-2">
          {currentPlayerIndex + 1}/{playerIndices.length}
        </p>
      </div>
    )
  }

  // Debate screen
  if (gameState === 'debate') {
    return (
      <div className="h-screen bg-impostor-cream p-3 flex flex-col justify-between items-center">
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-md">
          <h1 className="text-3xl sm:text-4xl font-bold text-impostor-red mb-4">¡En Debate!</h1>
          <p className="text-impostor-text text-sm sm:text-base mb-6">
            Identificad al Impostor
          </p>
        </div>

        <button
          onClick={handleRevealImpostor}
          className="w-full max-w-md bg-impostor-red hover:bg-impostor-red-light active:scale-95 text-white font-bold py-3 rounded-xl text-base transition mb-3"
        >
          Desvelar Impostor
        </button>
      </div>
    )
  }

  // Results screen
  return (
    <div className="h-screen bg-impostor-cream p-3 flex flex-col justify-between items-center overflow-y-auto">
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-md w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-impostor-red mb-4">¡Fin de Ronda!</h1>
        
        <div className="mb-6 w-full">
          <p className="text-impostor-text-secondary text-xs font-semibold mb-2">El Impostor:</p>
          <div className="bg-impostor-red text-white rounded-xl p-4 mb-4">
            <p className="text-2xl sm:text-3xl font-black">{impostorIndices.map(idx => players[idx]).join(', ')}</p>
          </div>
          <p className="text-impostor-text text-sm">
            Palabra: <span className="font-bold text-impostor-red">{currentWord}</span>
          </p>
        </div>
      </div>

      <div className="space-y-2 w-full max-w-md">
        <button
          onClick={handlePlayAgain}
          className="w-full bg-impostor-red hover:bg-impostor-red-light active:scale-95 text-white font-bold py-3 rounded-xl text-base transition flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          Jugar de Nuevo
        </button>
        <button
          onClick={onBack}
          className="w-full bg-white hover:bg-impostor-cream-dark border border-impostor-red text-impostor-red font-bold py-2 rounded-xl text-sm transition"
        >
          Volver al Menú
        </button>
      </div>
    </div>
  )
}

export default GamePlayScreen
