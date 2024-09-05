import VideoPlayer from '@/components/Player/VideoPlayer'

function App() {
  const sources = [
    {
      url: 'URL1',
      quality: '1080',
      isM3U8: true
    },
    {
      url: 'URL2',
      quality: '720',
      isM3U8: true
    },
    {
      url: 'URL3',
      quality: '360',
      isM3U8: true
    }
  ]

  return (
    <div>
      <VideoPlayer sources={sources} />
    </div>
  )
}

export default App
