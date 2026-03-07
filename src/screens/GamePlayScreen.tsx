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
      <div className="min-h-screen bg-impostor-cream p-4 flex flex-col justify-center items-center">
        <div className="max-w-md w-full">
          {showWord ? (
            <>
              <div className="bg-white rounded-3xl p-8 text-center mb-8 border-2 border-impostor-red">
                {isImpostor ? (
                  <div>
                    <p className="text-impostor-text-secondary text-sm font-semibold mb-4">TÚ ERES</p>
                    <p className="text-5xl font-black text-impostor-red">IMPOSTOR</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-impostor-text-secondary text-xs font-semibold mb-3">LA PALABRA SECRETA ES:</p>
                    <p className="text-5xl font-black text-impostor-text break-words">{currentWord}</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleNextPlayer}
                className={`w-full py-4 rounded-xl font-bold text-lg transition ${
                  currentPlayerIndex === playerIndices.length - 1
                    ? 'bg-impostor-red hover:bg-impostor-red-light text-white'
                    : 'bg-impostor-red hover:bg-impostor-red-light text-white'
                }`}
              >
                {currentPlayerIndex === playerIndices.length - 1 ? 'Iniciar Debate' : 'Pasar al Siguiente Jugador'}
              </button>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <p className="text-impostor-text-secondary text-sm font-semibold mb-4">Turno de:</p>
                <p className="text-5xl font-black text-impostor-red mb-8">{currentPlayer}</p>
                <p className="text-impostor-text text-lg mb-6">¿Preparado para ver tu rol?</p>
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

        <p className="text-impostor-text-secondary text-xs mt-12 text-center">
          Jugador {currentPlayerIndex + 1} de {playerIndices.length}
        </p>
      </div>
    )
  }

  // Debate screen
  if (gameState === 'debate') {
    return (
      <div className="min-h-screen bg-impostor-cream p-4 flex flex-col justify-center items-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-impostor-red mb-8">¡En Debate!</h1>
          <p className="text-impostor-text text-lg mb-12">
            Identificad al Impostor entre vosotros antes de que pase el tiempo
          </p>

          <button
            onClick={handleRevealImpostor}
            className="w-full bg-impostor-red hover:bg-impostor-red-light active:scale-95 text-white font-bold py-4 rounded-xl text-lg transition"
          >
            Desvelar Impostor
          </button>
        </div>
      </div>
    )
  }

  // Results screen
  return (
    <div className="min-h-screen bg-impostor-cream p-4 flex flex-col justify-center items-center">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-impostor-red mb-12">¡Fin de la Ronda!</h1>
        
        <div className="mb-12">
          <p className="text-impostor-text-secondary text-sm font-semibold mb-4">El/La Impostor era:</p>
          <div className="bg-impostor-red text-white rounded-2xl p-8 mb-6">
            <p className="text-4xl font-black">{impostorIndices.map(idx => players[idx]).join(', ')}</p>
          </div>
          <p className="text-impostor-text text-lg">
            Palabra: <span className="font-bold text-impostor-red">{currentWord}</span>
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handlePlayAgain}
            className="w-full bg-impostor-red hover:bg-impostor-red-light active:scale-95 text-white font-bold py-4 rounded-xl text-lg transition flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            Jugar de Nuevo
          </button>
          <button
            onClick={onBack}
            className="w-full bg-white hover:bg-impostor-cream-dark border border-impostor-red text-impostor-red font-bold py-3 rounded-xl text-lg transition"
          >
            Volver al Menú
          </button>
        </div>
      </div>
    </div>
  )
}

export default GamePlayScreen
