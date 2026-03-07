interface TimerProps {
  timeMs: number
}

function Timer({ timeMs }: TimerProps) {
  const seconds = Math.ceil(timeMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const formatted = `${minutes}:${secs.toString().padStart(2, '0')}`

  return (
    <div className="text-center">
      <p className="text-impostor-text-secondary text-sm mb-2">Tiempo disponible</p>
      <div className={`text-6xl font-black font-mono ${
        seconds <= 10 ? 'text-impostor-red animate-pulse' : 'text-impostor-text'
      }`}>
        {formatted}
      </div>
    </div>
  )
}

export default Timer
