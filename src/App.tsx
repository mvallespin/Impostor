import { useState } from 'react'
import GameSettingsScreen from './screens/GameSettingsScreen'
import PackageSelectionScreen from './screens/PackageSelectionScreen'
import GamePlayScreen from './screens/GamePlayScreen'

type Screen = 'settings' | 'packages' | 'gameplay'

export interface GameSettings {
  numPlayers: number
  players: string[]
  numImpostors: number
  hasClue: boolean
  rounds: number | 'infinite'
  duration: number | 'unlimited'
}

export interface WordPackage {
  id: string
  name: string
  words: string[]
  isCustom: boolean
  selected: boolean
}

// Generate unique session ID - each device/browser gets its own namespace
const generateSessionId = (): string => {
  const sessionKey = 'impostor_session_id'
  let sessionId = sessionStorage.getItem(sessionKey)
  
  if (!sessionId) {
    // Generate new session ID if doesn't exist
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    sessionStorage.setItem(sessionKey, sessionId)
  }
  
  return sessionId
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('settings')
  const [sessionId] = useState(generateSessionId())
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    numPlayers: 5,
    players: [],
    numImpostors: 1,
    hasClue: true,
    rounds: 1,
    duration: 3,
  })
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [wordPackages, setWordPackages] = useState<WordPackage[]>([])

  const handleSettingsSubmit = (settings: GameSettings) => {
    setGameSettings(settings)
    setCurrentScreen('packages')
  }

  const handlePackagesSubmit = (selected: string[]) => {
    setSelectedPackages(selected)
    setCurrentScreen('gameplay')
  }

  const handleBackToSettings = () => {
    setCurrentScreen('settings')
  }

  const handleBackToPackages = () => {
    setCurrentScreen('packages')
  }

  const handleAddCustomPackage = (name: string, words: string[]) => {
    const newPackage: WordPackage = {
      id: `custom_${Date.now()}`,
      name,
      words: words.map(w => w.trim()).filter(w => w.length > 0),
      isCustom: true,
      selected: true,
    }
    
    const updated = [...wordPackages, newPackage]
    setWordPackages(updated)
    setSelectedPackages(prev => [...prev, newPackage.id])
  }

  return (
    <div className="min-h-screen bg-impostor-cream">
      {currentScreen === 'settings' && (
        <GameSettingsScreen
          sessionId={sessionId}
          initialSettings={gameSettings}
          onSubmit={handleSettingsSubmit}
        />
      )}
      {currentScreen === 'packages' && (
        <PackageSelectionScreen
          packages={wordPackages}
          selectedIds={selectedPackages}
          onAddCustom={handleAddCustomPackage}
          onSubmit={handlePackagesSubmit}
          onBack={handleBackToSettings}
        />
      )}
      {currentScreen === 'gameplay' && (
        <GamePlayScreen
          settings={gameSettings}
          selectedPackageIds={selectedPackages}
          packages={wordPackages}
          onBack={handleBackToPackages}
        />
      )}
    </div>
  )
}

export default App
