import Hls from 'hls.js'
import React, { useEffect, useRef, useState } from 'react'
import { memo } from 'react'

import FullScreenButton from './UI/FullScreenButton'
import PlayButton from './UI/PlayButton'
import PlayerSettings from './UI/PlayerSettings'
import ProgressBar from './UI/ProgressBar'
import RuntimeProgress from './UI/RuntimeProgress'
import SettingsButton from './UI/SettingsButton'
import VolumeControl from './UI/VolumeControl'

interface VideoPlayerSource {
  url: string
  quality: string
  isM3U8: boolean
}

interface VideoPlayerProps {
  sources: VideoPlayerSource[]
}

const VideoPlayer: React.FC<VideoPlayerProps> = memo(({ sources }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [currentSrc, setCurrentSrc] = useState<VideoPlayerSource>(
    sources.find((source) => source.quality === 'auto') ?? sources[0]
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video || !currentSrc) return

    const hls = new Hls()
    hls.loadSource(currentSrc.url)
    hls.attachMedia(video)

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    })

    return () => {
      hls.destroy()
    }
  }, [currentSrc])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const handlePlayStateChange = () => {
    const video = videoRef.current
    if (video) {
      setIsPlaying(!video.paused)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.addEventListener('play', handlePlayStateChange)
    video.addEventListener('pause', handlePlayStateChange)

    return () => {
      video.removeEventListener('play', handlePlayStateChange)
      video.removeEventListener('pause', handlePlayStateChange)
    }
  }, [])

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-2xl bg-gray-900 text-white"
      // onMouseEnter={() => setShowControls(true)}
      // onMouseLeave={() => setShowControls(false)}
    >
      <video ref={videoRef} className="w-full" onClick={togglePlay} />
      {showControls && (
        <div className="absolute bottom-0 left-0 flex w-full flex-col gap-2 bg-gradient-to-t from-black to-transparent p-4">
          <ProgressBar videoRef={videoRef} />
          <PlayerSettings
            videoRef={videoRef}
            isVisible={showSettings}
            sources={sources}
            currentSrc={currentSrc}
            setCurrentSrc={setCurrentSrc}
          />
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <PlayButton videoRef={videoRef} isPlaying={isPlaying} />
              <VolumeControl videoRef={videoRef} />
              <RuntimeProgress videoRef={videoRef} />
            </div>
            <div className="flex items-center">
              <SettingsButton
                showSettings={showSettings}
                onClick={toggleSettings}
              />
              <FullScreenButton containerRef={containerRef} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
export default VideoPlayer
