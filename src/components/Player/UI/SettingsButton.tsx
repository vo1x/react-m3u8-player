import { Settings } from 'lucide-react'

interface SettingsButtonProps {
  showSettings: boolean
  onClick: () => void
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
  showSettings,
  onClick
}) => {
  return (
    <button
      className={`rounded-full p-2 hover:bg-blue-700 ${
        showSettings ? 'bg-blue-700' : ''
      }`}
      onClick={onClick}
    >
      <Settings size={24} />
    </button>
  )
}
export default SettingsButton
