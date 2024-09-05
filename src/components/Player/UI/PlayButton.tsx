import { Pause, Play } from 'lucide-react'
import React from 'react'

interface PlayButtonProps {
  videoRef: React.RefObject<HTMLVideoElement>
  isPlaying: boolean
}

const PlayButton: React.FC<PlayButtonProps> = ({ videoRef, isPlaying }) => {
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  return (
    <button onClick={togglePlay} className="rounded-full p-2 hover:bg-blue-700">
      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
    </button>
  )
}

export default PlayButton
