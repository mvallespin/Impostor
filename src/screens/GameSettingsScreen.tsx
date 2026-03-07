import { useState, useEffect } from 'react'
import { Plus, Minus, X } from 'lucide-react'
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
        // Ensure numImpostors is valid (min 1, max numPlayers)
        numImpostors: Math.max(1, Math.min(prev.numImpostors || 1, initialSettings.players.length)),
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
            // Ensure numImpostors is valid (min 1, max numPlayers)
            numImpostors: Math.max(1, Math.min(prev.numImpostors || 1, parsed.length)),
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
        // Ensure numImpostors doesn't exceed numPlayers
        numImpostors: Math.min(prev.numImpostors, playerNames.length),
      }))
      setCurrentPlayerName('')
      setShowPlayerNameInput(false)
    }
  }

  const handleStartGame = () => {
    if (settings.numPlayers === 0) {
      alert('Debes tener al menos 1 jugador')
      return
    }
    if (settings.numImpostors === 0) {
      alert('Debes tener al menos 1 impostor')
      return
    }
    if (settings.numImpostors > settings.numPlayers) {
      alert('El número de impostores no puede ser mayor que el número de jugadores')
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
      <div className="min-h-screen bg-impostor-cream p-4 flex flex-col">
        <button
          onClick={() => {
            // Restore playerNames to last saved state
            setPlayerNames(settings.players.length > 0 ? settings.players : [])
            setCurrentPlayerName('')
            setShowPlayerNameInput(false)
          }}
          className="self-start text-impostor-red hover:text-impostor-red-light mb-6"
        >
          <X size={24} />
        </button>

        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-impostor-red mb-8">
            Nombres de Jugadores
          </h1>

          <div className="space-y-3 mb-8 max-h-60 overflow-y-auto">
            {playerNames.map((name, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white rounded-lg p-3 border border-impostor-cream-dark"
              >
                <span className="text-impostor-text">{name}</span>
                <button
                  onClick={() => handleRemovePlayer(index)}
                  className="text-impostor-red hover:text-impostor-red-light"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={currentPlayerName}
              onChange={(e) => setCurrentPlayerName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddPlayer()
                }
              }}
              placeholder="Nombre del jugador"
              className="flex-1 bg-white text-impostor-text rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-impostor-red border border-impostor-cream-dark"
            />
            <button
              onClick={handleAddPlayer}
              className="bg-impostor-red hover:bg-impostor-red-light text-white px-6 py-2 rounded-lg font-bold transition"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => {
                // Restore playerNames to last saved state
                setPlayerNames(settings.players.length > 0 ? settings.players : [])
                setCurrentPlayerName('')
                setShowPlayerNameInput(false)
              }}
              className="flex-1 bg-white hover:bg-impostor-cream-dark text-impostor-red border border-impostor-red rounded-lg py-3 font-bold"
            >
              Cancelar
            </button>
            <button
              onClick={handleFinishPlayers}
              disabled={playerNames.length === 0}
              className="flex-1 bg-impostor-red hover:bg-impostor-red-light disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold"
            >
              Confirmar ({playerNames.length})
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-impostor-cream p-4 flex flex-col justify-center items-center">
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold text-impostor-red text-center mb-6">
          El Impostor
        </h1>

        <div className="space-y-3 mb-6">
          {/* Players */}
          <div className="bg-impostor-cream-dark rounded-xl p-5 border border-impostor-red/10">
            <div className="text-center mb-3">
              <p className="text-impostor-text-secondary text-sm font-semibold">Jugadores</p>
              <p className="text-5xl font-black text-impostor-red">{settings.numPlayers}</p>
            </div>
            <button
              onClick={() => setShowPlayerNameInput(true)}
              className="w-full bg-impostor-red hover:bg-impostor-red-light text-white py-3 rounded-lg font-bold text-base transition"
            >
              {playerNames.length > 0 ? `✓ Editar (${playerNames.length})` : 'Añadir Nombres'}
            </button>
          </div>

          {/* Impostors */}
          <div className="bg-impostor-cream-dark rounded-xl p-5 border border-impostor-red/10">
            <label className="block text-impostor-text text-sm font-semibold mb-3 text-center">
              Impostores
            </label>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() =>
                  setSettings(prev => ({
                    ...prev,
                    numImpostors: Math.max(1, prev.numImpostors - 1),
                  }))
                }
                disabled={settings.numImpostors <= 1 || settings.numPlayers === 0}
                className="bg-impostor-red hover:bg-impostor-red-light disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition"
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
                    numImpostors: Math.min(prev.numPlayers, prev.numImpostors + 1),
                  }))
                }
                disabled={settings.numImpostors >= settings.numPlayers || settings.numPlayers === 0}
                className="bg-impostor-red hover:bg-impostor-red-light disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition"
              >
                <Plus size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleStartGame}
          disabled={settings.numPlayers === 0 || settings.numImpostors === 0 || settings.numImpostors > settings.numPlayers}
          className="w-full bg-impostor-red hover:bg-impostor-red-light disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-white font-bold py-4 rounded-xl text-lg transition"
        >
          Seleccionar Palabras
        </button>
      </div>
    </div>
  )
}

export default GameSettingsScreen
