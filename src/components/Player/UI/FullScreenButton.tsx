import { Maximize, Minimize } from 'lucide-react'
import { useState } from 'react'

interface FullScreenButtonProps {
  containerRef: React.RefObject<HTMLDivElement>
}

const FullScreenButton: React.FC<FullScreenButtonProps> = ({
  containerRef
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true))
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false))
    }
  }
  return (
    <button
      onClick={toggleFullscreen}
      className="rounded-full p-2 hover:bg-blue-700"
    >
      {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
    </button>
  )
}
export default FullScreenButton
