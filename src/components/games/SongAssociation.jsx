import { useState, useEffect, useRef } from 'react'
import songWords from '../../data/songAssociationWords'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

// screens: welcome | playing | reveal | finished
function SongAssociation() {
  const [screen, setScreen] = useState('welcome')
  const [words, setWords] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [timerRunning, setTimerRunning] = useState(false)
  const timerRef = useRef(null)

  const currentWord = words[currentIndex]

  function startGame() {
    setWords(shuffle(songWords))
    setCurrentIndex(0)
    setTimeLeft(10)
    setScreen('playing')
    setTimerRunning(true)
  }

  function handleNext() {
    clearInterval(timerRef.current)
    if (currentIndex + 1 >= words.length) {
      setScreen('finished')
    } else {
      setCurrentIndex(i => i + 1)
      setTimeLeft(10)
      setScreen('playing')
      setTimerRunning(true)
    }
  }

  function handleReveal() {
    clearInterval(timerRef.current)
    setTimerRunning(false)
    setScreen('reveal')
  }

  // Timer logic
  useEffect(() => {
    if (timerRunning && screen === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current)
            setTimerRunning(false)
            setScreen('reveal')
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [timerRunning, screen, currentIndex])

  // WELCOME SCREEN
  if (screen === 'welcome') {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <p className="text-6xl mb-6">🎵</p>
        <h2 className="text-4xl font-bold text-red-800 mb-4">Tamil Song Association</h2>
        <div className="bg-white rounded-2xl shadow p-8 text-left mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">How to play</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">1.</span>
              <p className="text-gray-600">A Tamil word will appear on screen.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">2.</span>
              <p className="text-gray-600">You have <strong>10 seconds</strong> to sing or name a Tamil song that contains that word.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">3.</span>
              <p className="text-gray-600">After 10 seconds, example songs will be revealed.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">4.</span>
              <p className="text-gray-600">Click <strong>Next</strong> to move to the next word. All <strong>20 words</strong> will be shown in random order.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">5.</span>
              <p className="text-gray-600">Best played as a <strong>family or group game!</strong></p>
            </div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="w-full bg-red-800 text-white py-4 rounded-xl text-xl font-bold hover:bg-red-700 transition"
        >
          Start Game
        </button>
      </div>
    )
  }

  // FINISHED SCREEN
  if (screen === 'finished') {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <p className="text-6xl mb-6">🎉</p>
        <h2 className="text-4xl font-bold text-red-800 mb-4">Mudinduchu!</h2>
        <p className="text-gray-500 text-lg mb-8">You went through all 20 words. Nalla irundhucha?</p>
        <button
          onClick={startGame}
          className="w-full bg-red-800 text-white py-4 rounded-xl text-xl font-bold hover:bg-red-700 transition"
        >
          Play Again
        </button>
      </div>
    )
  }

  // PLAYING SCREEN
  if (screen === 'playing') {
    return (
      <div className="max-w-xl mx-auto py-10 px-4">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-red-800">Tamil Song Association</h2>
          <span className="text-sm text-gray-400">Word {currentIndex + 1} of {words.length}</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-red-800 h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex) / words.length) * 100}%` }}
          />
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          <div className={`text-8xl font-bold mb-2 transition-colors ${
            timeLeft <= 3 ? 'text-red-500' : 'text-red-800'
          }`}>
            {timeLeft}
          </div>
          <p className="text-gray-400 text-sm">seconds to name a song</p>
        </div>

        {/* Word Card */}
        <div className="bg-white rounded-2xl shadow p-10 text-center mb-6">
          <p className="text-7xl font-bold text-gray-800 mb-3">{currentWord.word}</p>
          <p className="text-2xl font-semibold text-red-800 mb-2">{currentWord.transliteration}</p>
          <p className="text-gray-400 text-lg">{currentWord.meaning}</p>
        </div>

        <button
          onClick={handleReveal}
          className="w-full py-4 rounded-xl font-bold text-white text-lg bg-gray-700 hover:bg-gray-600 transition"
        >
          Reveal Songs Early
        </button>

      </div>
    )
  }

  // REVEAL SCREEN
  if (screen === 'reveal') {
    return (
      <div className="max-w-xl mx-auto py-10 px-4">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-red-800">Tamil Song Association</h2>
          <span className="text-sm text-gray-400">Word {currentIndex + 1} of {words.length}</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-red-800 h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex) / words.length) * 100}%` }}
          />
        </div>

        {/* Word Card */}
        <div className="bg-white rounded-2xl shadow p-6 text-center mb-6">
          <p className="text-5xl font-bold text-gray-800 mb-2">{currentWord.word}</p>
          <p className="text-xl font-semibold text-red-800 mb-1">{currentWord.transliteration}</p>
          <p className="text-gray-400">{currentWord.meaning}</p>
        </div>

        {/* Songs Revealed */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold text-red-800 mb-4">Songs with this word</h3>
          <div className="space-y-3">
            {currentWord.songs.map((song, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-red-800 font-bold mt-0.5">🎵</span>
                <p className="text-gray-700 font-medium">{song}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl font-bold text-white text-lg bg-red-800 hover:bg-red-700 transition"
        >
          {currentIndex + 1 >= words.length ? 'See Finish Screen' : 'Next Word'}
        </button>

      </div>
    )
  }
}

export default SongAssociation