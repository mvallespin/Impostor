import { useState, useEffect } from 'react'
import { Plus, Minus, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { GameSettings } from '../App'

interface GameSettingsScreenProps {
  sessionId: string
  initialSettings: GameSettings
  onSubmit: (settings: GameSettings) => void
}

function GameSettingsScreen({ sessionId, initialSettings, onSubmit }: GameSettingsScreenProps) {
  const [settings, setSettings] = useState<GameSettings>(initialSettings)
  const [showPlayerNameInput, setShowPlayerNameInput] = useState(false)
  const [playerNames, setPlayerNames] = useState<string[]>(initialSettings.players || [])
  const [currentPlayerName, setCurrentPlayerName] = useState('')

  const clampImpostors = (numImpostors: number, numPlayers: number): number => {
    const maxImpostors = Math.max(0, numPlayers - 1)
    if (maxImpostors === 0) {
      return 0
    }
    return Math.min(Math.max(1, numImpostors), maxImpostors)
  }

  // Create namespaced key for this session
  const getStorageKey = (key: string) => `${sessionId}_${key}`

  // Load player names from initialSettings when component mounts or initialSettings changes
  useEffect(() => {
    if (initialSettings.players && initialSettings.players.length > 0) {
      setPlayerNames(initialSettings.players)
      // Update localStorage to match
      localStorage.setItem(getStorageKey('impostor_players'), JSON.stringify(initialSettings.players))
      // Sync numPlayers with loaded players
      setSettings(prev => ({
        ...prev,
        players: initialSettings.players,
        numPlayers: initialSettings.players.length,
        // Ensure numImpostors is valid (min 1 when possible, and always < numPlayers)
        numImpostors: clampImpostors(prev.numImpostors || 1, initialSettings.players.length),
      }))
    } else {
      // Only load from localStorage if initialSettings is empty
      const saved = localStorage.getItem(getStorageKey('impostor_players'))
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setPlayerNames(parsed)
          // Sync numPlayers with loaded players from localStorage
          setSettings(prev => ({
            ...prev,
            players: parsed,
            numPlayers: parsed.length,
            // Ensure numImpostors is valid (min 1 when possible, and always < numPlayers)
            numImpostors: clampImpostors(prev.numImpostors || 1, parsed.length),
          }))
        } catch (e) {
          console.error('Error loading players:', e)
        }
      }
    }
  }, [sessionId, initialSettings.players])

  const handleAddPlayer = () => {
    if (currentPlayerName.trim()) {
      const updated = [...playerNames, currentPlayerName.trim()]
      setPlayerNames(updated)
      setCurrentPlayerName('')
      localStorage.setItem(getStorageKey('impostor_players'), JSON.stringify(updated))
    }
  }

  const handleRemovePlayer = (index: number) => {
    const updated = playerNames.filter((_, i) => i !== index)
    setPlayerNames(updated)
    localStorage.setItem(getStorageKey('impostor_players'), JSON.stringify(updated))
  }

  const handleFinishPlayers = () => {
    if (playerNames.length > 0) {
      setSettings(prev => ({
        ...prev,
        players: playerNames,
        numPlayers: playerNames.length,
        // Keep impostors valid after editing names
        numImpostors: clampImpostors(prev.numImpostors, playerNames.length),
      }))
      setCurrentPlayerName('')
      setShowPlayerNameInput(false)
    }
  }

  const handleStartGame = () => {
    if (settings.numPlayers < 2) {
      alert('Debes tener al menos 2 jugadores')
      return
    }
    if (settings.numImpostors === 0) {
      alert('Debes tener al menos 1 impostor')
      return
    }
    if (settings.numImpostors >= settings.numPlayers) {
      alert('El número de impostores debe ser menor que el número de jugadores')
      return
    }
    const finalSettings: GameSettings = {
      ...settings,
      players: playerNames.length > 0 ? playerNames : Array.from({ length: settings.numPlayers }, (_, i) => `Jugador ${i + 1}`),
      numImpostors: settings.numImpostors,
      hasClue: true,
      rounds: 1,
      duration: 'unlimited',
    }
    onSubmit(finalSettings)
  }

  if (showPlayerNameInput) {
    return (
      <div className="h-[100dvh] bg-impostor-bg text-impostor-text-on-dark px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+12px)] flex flex-col overflow-hidden impostor-page-enter">
        <button
          onClick={() => {
            // Restore playerNames to last saved state
            setPlayerNames(settings.players.length > 0 ? settings.players : [])
            setCurrentPlayerName('')
            setShowPlayerNameInput(false)
          }}
          className="self-start text-impostor-red hover:text-impostor-red-light mb-4"
        >
          <X size={24} />
        </button>

        <div className="flex-1 min-h-0 flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold text-impostor-red mb-5">
            Nombres de Jugadores
          </h1>

          <motion.div
            className="impostor-panel p-3 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-impostor-muted text-xs font-semibold mb-2">
              Añade jugadores
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentPlayerName}
                onChange={(e) => setCurrentPlayerName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddPlayer()
                  }
                }}
                placeholder="Escribe un nombre"
                className="flex-1 bg-impostor-bg/70 text-impostor-text-on-dark rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-impostor-red border-2 border-impostor-red/25"
              />
              <button
                onClick={handleAddPlayer}
                className="impostor-primary-btn px-6 py-3 rounded-lg shadow-sm"
              >
                <Plus size={20} />
              </button>
            </div>
          </motion.div>

          <div className="space-y-3 flex-1 min-h-0 overflow-y-auto pr-1">
            {playerNames.map((name, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-impostor-surface-soft rounded-lg p-3 border border-white/10"
              >
                <span className="text-impostor-text-on-dark">{name}</span>
                <button
                  onClick={() => handleRemovePlayer(index)}
                  className="text-impostor-red hover:text-impostor-red-light"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => {
                // Restore playerNames to last saved state
                setPlayerNames(settings.players.length > 0 ? settings.players : [])
                setCurrentPlayerName('')
                setShowPlayerNameInput(false)
              }}
              className="flex-1 impostor-secondary-btn rounded-lg py-3"
            >
              Cancelar
            </button>
            <button
              onClick={handleFinishPlayers}
              disabled={playerNames.length === 0}
              className="flex-1 impostor-primary-btn py-3 rounded-lg"
            >
              Confirmar ({playerNames.length})
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[100dvh] bg-impostor-bg text-impostor-text-on-dark p-4 pb-[calc(env(safe-area-inset-bottom)+16px)] flex flex-col justify-center items-center overflow-hidden impostor-page-enter">
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold text-impostor-red text-center mb-6 tracking-tight">
          El Impostor
        </h1>

        <div className="space-y-3 mb-6">
          {/* Players */}
          <motion.div
            className="impostor-panel p-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: 0.04 }}
          >
            <div className="text-center mb-3">
              <p className="text-impostor-muted text-sm font-semibold">Jugadores</p>
              <p className="text-5xl font-black text-impostor-red">{settings.numPlayers}</p>
            </div>
            <button
              onClick={() => setShowPlayerNameInput(true)}
              className="w-full impostor-primary-btn py-3 rounded-lg text-base"
            >
              {playerNames.length > 0 ? `✓ Editar (${playerNames.length})` : 'Añadir Nombres'}
            </button>
          </motion.div>

          {/* Impostors */}
          <motion.div
            className="impostor-panel p-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: 0.1 }}
          >
            <label className="block text-impostor-text-on-dark text-sm font-semibold mb-3 text-center">
              Impostores
            </label>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() =>
                  setSettings(prev => ({
                    ...prev,
                    numImpostors: clampImpostors(prev.numImpostors - 1, prev.numPlayers),
                  }))
                }
                disabled={settings.numPlayers <= 1 || settings.numImpostors <= 1}
                className="impostor-primary-btn p-3 rounded-lg"
              >
                <Minus size={24} />
              </button>
              <span className="text-5xl font-black text-impostor-red flex-1 text-center">
                {settings.numImpostors}
              </span>
              <button
                onClick={() =>
                  setSettings(prev => ({
                    ...prev,
                    numImpostors: clampImpostors(prev.numImpostors + 1, prev.numPlayers),
                  }))
                }
                disabled={settings.numPlayers <= 1 || settings.numImpostors >= settings.numPlayers - 1}
                className="impostor-primary-btn p-3 rounded-lg"
              >
                <Plus size={24} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleStartGame}
          disabled={settings.numPlayers < 2 || settings.numImpostors === 0 || settings.numImpostors >= settings.numPlayers}
          className="w-full impostor-primary-btn py-4 rounded-xl text-lg"
        >
          Seleccionar Palabras
        </button>
      </div>
    </div>
  )
}

export default GameSettingsScreen
