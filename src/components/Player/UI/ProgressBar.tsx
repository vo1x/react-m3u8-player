import React, { useEffect, useState } from 'react'

interface ProgressBarProps {
  videoRef: React.RefObject<HTMLVideoElement>
}

const ProgressBar: React.FC<ProgressBarProps> = ({ videoRef }) => {
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleLoadedMetadata = () => setDuration(video.duration)

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    // Cleanup
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [videoRef])

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newTime = parseFloat(e.target.value)
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  return (
    <input
      type="range"
      min="0"
      max={duration}
      value={currentTime}
      onChange={handleSeek}
      className="w-full accent-blue-500"
      step="0.1"
    />
  )
}

export default ProgressBar
