import { Volume2, VolumeX } from 'lucide-react'
import { useState } from 'react'

interface VolumeControlProps {
  videoRef: React.RefObject<HTMLVideoElement>
}

const VolumeControl: React.FC<VolumeControlProps> = ({ videoRef }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = parseFloat(e.target.value)
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  return (
    <div
      className="flex items-center pr-2 "
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      <button
        onClick={toggleMute}
        className={`rounded-full p-2 hover:bg-blue-700 ${
          showVolumeSlider ? 'bg-blue-700' : ''
        }`}
        onMouseEnter={() => setShowVolumeSlider(true)}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
      {showVolumeSlider && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 accent-blue-500"
        />
      )}
    </div>
  )
}

export default VolumeControl
