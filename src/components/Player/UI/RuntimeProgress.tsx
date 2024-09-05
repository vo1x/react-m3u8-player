import React, { useEffect, useState } from 'react'

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor(time % 60)

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

interface RuntimeProgressProps {
  videoRef: React.RefObject<HTMLVideoElement>
}

const RuntimeProgress: React.FC<RuntimeProgressProps> = ({ videoRef }) => {
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

  return (
    <div className="flex items-center space-x-1 text-white">
      <span>{formatTime(currentTime)}</span>
      <span>/</span>
      <span>{formatTime(duration)}</span>
    </div>
  )
}

export default RuntimeProgress
