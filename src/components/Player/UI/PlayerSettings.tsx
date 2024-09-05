import React from 'react'

interface Source {
  url: string
  quality: string
  isM3U8: boolean
}

interface PlayerSettingsProps {
  isVisible: boolean
  sources: Source[]
  currentSrc: Source
  setCurrentSrc: (src: Source) => void
  videoRef: React.RefObject<HTMLVideoElement>
}

const PlayerSettings: React.FC<PlayerSettingsProps> = ({
  isVisible,
  sources,
  currentSrc,
  setCurrentSrc,
  videoRef
}) => {
  const handleSourceChange = (src: Source) => {
    const video = videoRef.current
    if (!video) return

    if (currentSrc.quality === src.quality) {
      return
    }

    const currentTime = video.currentTime

    setCurrentSrc(src)

    video.addEventListener(
      'loadedmetadata',
      () => {
        video.currentTime = currentTime
      },
      { once: true }
    )
  }

  return (
    isVisible && (
      <div className="absolute bottom-20 right-4 flex w-48 flex-col items-start rounded-md bg-gray-800 p-4">
        {sources.map((source, index) => (
          <button
            key={index}
            onClick={() => handleSourceChange(source)}
            className={`${
              source.quality === currentSrc.quality ? 'font-bold' : ''
            }`}
          >
            {source.quality}
          </button>
        ))}
      </div>
    )
  )
}

export default PlayerSettings
