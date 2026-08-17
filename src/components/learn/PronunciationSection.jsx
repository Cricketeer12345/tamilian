import { useState, useRef, useEffect } from 'react'
import pronunciationWords from '../../data/pronunciationWords'

const tiers = [
  {
    min: 0, max: 20,
    tamil: "சின்ன பையன்", english: "Chinna Payan",
    message: "Enna pesure bro 😭 Keep practicing!",
    color: "text-red-600", bg: "bg-red-50", border: "border-red-200",
    image: "/memes/chinna-payan.jpg",
  },
  {
    min: 20, max: 60,
    tamil: "பெரிய பையன்", english: "Periya Payan",
    message: "Not bad da, keep trying! 🙂",
    color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200",
    image: "/memes/periya-payan.jpg",
  },
  {
    min: 60, max: 80,
    tamil: "பெரியவர்", english: "Periyavar",
    message: "Aama! Getting there! 💪",
    color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200",
    image: "/memes/periyavar.jpg",
  },
  {
    min: 80, max: 101,
    tamil: "அறிவாளர்", english: "Arivalar",
    message: "Seri da, nee Tamil thaan! 🔥",
    color: "text-green-600", bg: "bg-green-50", border: "border-green-200",
    image: "/memes/arivalar.jpg",
  },
]

function getTier(score) {
  return tiers.find(t => score >= t.min && score < t.max)
}

function scoreWord(heard, expectedTamil) {
  if (!heard || heard.trim() === '') return 0
  const normalize = str => str.trim().replace(/\s+/g, '')
  const heardClean = normalize(heard)
  const expectedClean = normalize(expectedTamil)
  if (heardClean === expectedClean) return Math.round(95 + Math.random() * 5)
  if (heardClean.includes(expectedClean)) return 85
  if (expectedClean.includes(heardClean) && heardClean.length >= expectedClean.length * 0.8) return 80

  function sequenceScore(a, b) {
    let matches = 0, j = 0
    for (let i = 0; i < a.length && j < b.length; i++) {
      if (a[i] === b[j]) { matches++; j++ }
    }
    return matches / b.length
  }
  function overlapScore(a, b) {
    const aArr = [...a]; let matched = 0
    for (const ch of [...b]) {
      const idx = aArr.indexOf(ch)
      if (idx !== -1) { matched++; aArr.splice(idx, 1) }
    }
    return matched / b.length
  }
  function prefixScore(a, b) {
    const len = Math.min(2, b.length); let matches = 0
    for (let i = 0; i < len; i++) { if (a[i] === b[i]) matches++ }
    return matches / len
  }
  function bigramScore(a, b) {
    if (b.length < 2) return 0
    const getBigrams = str => {
      const bg = []
      for (let i = 0; i < str.length - 1; i++) bg.push(str[i] + str[i + 1])
      return bg
    }
    const aBg = getBigrams(a), bBg = getBigrams(b); let matched = 0
    const aCopy = [...aBg]
    for (const bg of bBg) {
      const idx = aCopy.indexOf(bg)
      if (idx !== -1) { matched++; aCopy.splice(idx, 1) }
    }
    return matched / bBg.length
  }
  function positionScore(a, b) {
    const len = Math.min(a.length, b.length); let matches = 0
    for (let i = 0; i < len; i++) { if (a[i] === b[i]) matches++ }
    return matches / Math.max(a.length, b.length)
  }
  const lenDiff = Math.abs(heardClean.length - expectedClean.length)
  const lenPenalty = Math.max(0.5, 1 - lenDiff * 0.08)
  const combined = (
    positionScore(heardClean, expectedClean) * 0.30 +
    sequenceScore(heardClean, expectedClean) * 0.25 +
    bigramScore(heardClean, expectedClean) * 0.20 +
    overlapScore(heardClean, expectedClean) * 0.15 +
    prefixScore(heardClean, expectedClean) * 0.10
  ) * lenPenalty
  let finalScore
  if (combined >= 0.92) finalScore = 88 + (combined - 0.92) * 150
  else if (combined >= 0.75) finalScore = 70 + (combined - 0.75) * 106
  else if (combined >= 0.55) finalScore = 50 + (combined - 0.55) * 100
  else if (combined >= 0.35) finalScore = 30 + (combined - 0.35) * 100
  else if (combined >= 0.15) finalScore = 12 + (combined - 0.15) * 90
  else finalScore = combined * 80
  return Math.round(Math.min(95, Math.max(1, finalScore)))
}

function pickRandomWords() {
  const simple = pronunciationWords.filter(w => w.id >= 1 && w.id <= 15)
  const medium = pronunciationWords.filter(w => w.id >= 16 && w.id <= 35)
  const complex = pronunciationWords.filter(w => w.id >= 36 && w.id <= 50)
  const pick = (arr, n) => [...arr].sort(() => Math.random() - 0.5).slice(0, n)
  return [...pick(simple, 3), ...pick(medium, 3), ...pick(complex, 3)]
}

const isIOS = typeof navigator !== 'undefined' && (
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
)

function PronunciationSection() {
  const [screen, setScreen] = useState('welcome')
  const [words, setWords] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [wordScore, setWordScore] = useState(null)
  const [scores, setScores] = useState([])
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)
  const [micReady, setMicReady] = useState(false)
  const [micError, setMicError] = useState('')

  const recognitionRef = useRef(null)
  const transcriptRef = useRef('')
  const currentIndexRef = useRef(0)
  const wordsRef = useRef([])
  const attemptsRef = useRef(0)
  // Keep the stream alive the entire quiz — never stop it
  const streamRef = useRef(null)

  function syncIndex(idx) { setCurrentIndex(idx); currentIndexRef.current = idx }
  function syncWords(w) { setWords(w); wordsRef.current = w }
  function syncAttempts(n) { setAttempts(n); attemptsRef.current = n }

  // Request mic permission once when component mounts on iOS
  useEffect(() => {
    if (!isIOS) return
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        // KEEP STREAM ALIVE — store it, never stop it
        streamRef.current = stream
        setMicReady(true)
      })
      .catch(() => {
        setMicError('Microphone access denied. Please tap Allow when the popup appears and reload the page.')
      })
    return () => {
      // Only stop stream when component fully unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop())
      }
    }
  }, [])

  function startQuiz() {
    const selected = pickRandomWords()
    syncWords(selected)
    syncIndex(0)
    syncAttempts(0)
    setScores([])
    setWordScore(null)
    setError('')
    setIsListening(false)
    setProcessing(false)
    transcriptRef.current = ''
    setScreen('practice')
  }

  function resetWordState() {
    if (recognitionRef.current) {
      try { recognitionRef.current.abort() } catch (e) {}
      recognitionRef.current = null
    }
    transcriptRef.current = ''
    syncAttempts(0)
    setWordScore(null)
    setError('')
    setIsListening(false)
    setProcessing(false)
  }

  function processResult(transcript) {
    const expectedTamil = wordsRef.current[currentIndexRef.current]?.tamil
    const calculated = (!transcript || transcript.trim() === '')
      ? 0
      : scoreWord(transcript, expectedTamil)
    setWordScore(calculated)
    setIsListening(false)
    setProcessing(false)
    recognitionRef.current = null
  }

  // Called from direct button tap — synchronous, no async before rec.start()
  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError('Speech recognition not supported. On iPhone use Safari.')
      return
    }

    transcriptRef.current = ''
    setError('')
    setWordScore(null)
    setProcessing(false)

    const rec = new SpeechRecognition()
    rec.lang = 'ta-IN'
    rec.continuous = false
    rec.interimResults = false
    rec.maxAlternatives = isIOS ? 1 : 5
    recognitionRef.current = rec

    rec.onstart = () => setIsListening(true)

    rec.onresult = (event) => {
      let best = ''
      for (let i = 0; i < event.results.length; i++) {
        for (let j = 0; j < event.results[i].length; j++) {
          const t = event.results[i][j].transcript || ''
          if (t.length > best.length) best = t
        }
      }
      transcriptRef.current = best
      if (isIOS) {
        syncAttempts(attemptsRef.current + 1)
        processResult(best)
      }
    }

    rec.onend = () => {
      if (!isIOS) {
        processResult(transcriptRef.current)
      } else {
        // onend fired without onresult — nothing was heard
        if (isListening) {
          syncAttempts(attemptsRef.current + 1)
          processResult('')
        }
      }
      setIsListening(false)
      recognitionRef.current = null
    }

    rec.onerror = (event) => {
      recognitionRef.current = null
      setIsListening(false)
      setProcessing(false)
      if (event.error === 'no-speech') {
        syncAttempts(attemptsRef.current + 1)
        setWordScore(0)
        return
      }
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('Microphone blocked. Please reload the page and tap Allow.')
        return
      }
      setError('Could not hear you. Please try again.')
    }

    // Synchronous start — called directly from button tap with no awaits before it
    try {
      rec.start()
    } catch (e) {
      setError('Could not start. Please try again.')
      setIsListening(false)
    }
  }

  function stopListening() {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop() } catch (e) {}
    }
    syncAttempts(attemptsRef.current + 1)
    setIsListening(false)
    setProcessing(true)
  }

  function handleNext() {
    const finalScore = wordScore !== null ? wordScore : 0
    const newScores = [...scores, finalScore]
    setScores(newScores)
    if (currentIndex + 1 >= words.length) {
      setScreen('results')
    } else {
      syncIndex(currentIndex + 1)
      resetWordState()
    }
  }

  const currentWord = words[currentIndex]
  const overallScore = scores.length > 0
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0
  const finalTier = getTier(overallScore)

  // WELCOME SCREEN
  if (screen === 'welcome') {
    return (
      <div className="max-w-xl mx-auto py-12 px-6">
        <div className="text-center mb-8">
          <p className="text-5xl mb-4">🗣️</p>
          <h2 className="text-3xl font-bold text-red-800 mb-2">Pronunciation Practice</h2>
          <p className="text-gray-500">Test how well you can say Tamil words out loud.</p>
        </div>

        {micError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-center">
            {micError}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">How it works</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">1.</span>
              <p className="text-gray-600">You will get 9 random Tamil words — 3 simple, 3 medium, 3 complex.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">2.</span>
              {isIOS
                ? <p className="text-gray-600">Tap <strong>Speak</strong> and say the word clearly — it scores automatically when you stop speaking.</p>
                : <p className="text-gray-600">Click <strong>Start</strong> to record, then <strong>Stop</strong> when done saying the word.</p>
              }
            </div>
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">3.</span>
              <p className="text-gray-600">You get one more attempt if not happy with your first try.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">4.</span>
              <p className="text-gray-600">Maximum <strong>2 attempts per word</strong>.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">5.</span>
              <p className="text-gray-600">After all 9 words you will get your final score and Tamil title!</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
          {isIOS
            ? micReady
              ? '✅ Microphone ready! Tap Start Practice to begin.'
              : '⚠️ Use Safari on iPhone. Allow microphone access when the popup appears — it should appear automatically.'
            : '⚠️ Works best in Google Chrome. Allow microphone access when prompted.'
          }
        </div>

        <button
          onClick={startQuiz}
          disabled={isIOS && !micReady}
          className={`w-full py-4 rounded-xl text-lg font-bold transition ${
            isIOS && !micReady
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-800 text-white hover:bg-red-700'
          }`}
        >
          {isIOS && !micReady ? 'Waiting for microphone...' : 'Start Practice'}
        </button>
      </div>
    )
  }

  // RESULTS SCREEN
  if (screen === 'results') {
    return (
      <div className="max-w-xl mx-auto py-12 px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-red-800 mb-2">Your Results</h2>
          <p className="text-gray-500">Here is how you did across all 9 words.</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Word by Word</h3>
          <div className="space-y-3">
            {words.map((word, i) => (
              <div key={word.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-700">{word.transliteration}</p>
                  <p className="text-xs text-gray-400">{word.tamil}</p>
                </div>
                <span className={`font-bold text-lg ${
                  scores[i] >= 80 ? 'text-green-600' :
                  scores[i] >= 60 ? 'text-blue-600' :
                  scores[i] >= 20 ? 'text-orange-500' : 'text-red-500'
                }`}>
                  {scores[i]}/100
                </span>
              </div>
            ))}
          </div>
        </div>
        {finalTier && (
          <div className={`rounded-2xl border p-8 text-center ${finalTier.bg} ${finalTier.border}`}>
            <p className="text-6xl font-bold mb-2">{overallScore}<span className="text-3xl">/100</span></p>
            <p className={`text-3xl font-bold mb-1 ${finalTier.color}`}>{finalTier.tamil}</p>
            <p className={`text-xl font-semibold mb-1 ${finalTier.color}`}>{finalTier.english}</p>
            <p className="text-gray-600 mb-6">{finalTier.message}</p>
            <img
              src={finalTier.image}
              alt={finalTier.english}
              className="w-64 h-48 object-fill mx-auto rounded-xl"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>
        )}
        <button
          onClick={startQuiz}
          className="w-full mt-6 bg-red-800 text-white py-4 rounded-xl text-lg font-bold hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    )
  }

  // PRACTICE SCREEN
  return (
    <div className="max-w-xl mx-auto py-10 px-6">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-red-800">Pronunciation Practice</h2>
        <span className="text-sm text-gray-400">Word {currentIndex + 1} of {words.length}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-red-800 h-2 rounded-full transition-all"
          style={{ width: `${(currentIndex / words.length) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-2xl shadow p-10 text-center mb-6">
        <p className="text-6xl mb-4">{currentWord.tamil}</p>
        <p className="text-3xl font-bold text-red-800 mb-2">{currentWord.transliteration}</p>
        <p className="text-gray-500 text-lg">{currentWord.meaning}</p>
      </div>

      <p className="text-center text-sm text-gray-400 mb-4">
        Attempts used: {attempts} / 2
      </p>

      {attempts < 2 && (
        <button
          onClick={isListening && !isIOS ? stopListening : startListening}
          disabled={processing || isListening && isIOS}
          className={`w-full py-4 rounded-xl font-bold text-white text-lg transition mb-4 ${
            isListening
              ? isIOS
                ? 'bg-red-500 cursor-not-allowed animate-pulse'
                : 'bg-red-500 hover:bg-red-400'
              : processing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-800 hover:bg-red-700'
          }`}
        >
          {isListening
            ? isIOS
              ? '🎙️ Listening... say the word'
              : '⏹️ Stop'
            : processing
            ? 'Calculating...'
            : attempts === 1
            ? '🔁 Try Again'
            : '🎤 Speak'}
        </button>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4 text-center">
          {error}
        </div>
      )}

      {attempts > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 text-center">
          {processing ? (
            <p className="text-gray-500 font-medium animate-pulse">Calculating...</p>
          ) : (
            <p className="text-lg font-bold text-red-800">
              Attempt {attempts} score: {wordScore}/100
            </p>
          )}
        </div>
      )}

      {attempts > 0 && !processing && !isListening && (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl font-bold text-white text-lg bg-gray-700 hover:bg-gray-600 transition"
        >
          {currentIndex + 1 >= words.length ? 'See My Results' : 'Next Word'}
        </button>
      )}

    </div>
  )
}

export default PronunciationSection
