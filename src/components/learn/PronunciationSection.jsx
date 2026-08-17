import { useState, useRef } from 'react'
import pronunciationWords from '../../data/pronunciationWords'

const tiers = [
  {
    min: 0,
    max: 20,
    tamil: "சின்ன பையன்",
    english: "Chinna Payan",
    message: "Enna pesure bro 😭 Keep practicing!",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    image: "/memes/chinna-payan.jpg",
  },
  {
    min: 20,
    max: 60,
    tamil: "பெரிய பையன்",
    english: "Periya Payan",
    message: "Not bad da, keep trying! 🙂",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    image: "/memes/periya-payan.jpg",
  },
  {
    min: 60,
    max: 80,
    tamil: "பெரியவர்",
    english: "Periyavar",
    message: "Aama! Getting there! 💪",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    image: "/memes/periyavar.jpg",
  },
  {
    min: 80,
    max: 101,
    tamil: "அறிவாளர்",
    english: "Arivalar",
    message: "Seri da, nee Tamil thaan! 🔥",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    image: "/memes/arivalar.jpg",
  },
]

function getTier(score) {
  return tiers.find(t => score >= t.min && score < t.max)
}

function scoreWord(heard, expectedTamil) {
  if (!heard || heard.trim() === '') return 0

  // Light normalization — only remove leading/trailing space
  // Keep all Tamil characters including vowel markers
  const normalize = str => str.trim().replace(/\s+/g, '')

  const heardClean = normalize(heard)
  const expectedClean = normalize(expectedTamil)

  // True exact match — still only 98 since speech recognition is never perfect
  if (heardClean === expectedClean){ return Math.round(95+ (Math.random()*5))}

  // Contains check — slightly off but close
  if (heardClean.includes(expectedClean)) return 85
  if (expectedClean.includes(heardClean) && heardClean.length >= expectedClean.length * 0.8) return 80

  // Sequence score — characters matching in order
  function sequenceScore(a, b) {
    let matches = 0
    let j = 0
    for (let i = 0; i < a.length && j < b.length; i++) {
      if (a[i] === b[j]) { matches++; j++ }
    }
    return matches / b.length
  }

  // Character overlap regardless of order
  function overlapScore(a, b) {
    const aArr = [...a]
    let matched = 0
    for (const ch of [...b]) {
      const idx = aArr.indexOf(ch)
      if (idx !== -1) { matched++; aArr.splice(idx, 1) }
    }
    return matched / b.length
  }

  // Prefix match — first 2 chars
  function prefixScore(a, b) {
    const len = Math.min(2, b.length)
    let matches = 0
    for (let i = 0; i < len; i++) {
      if (a[i] === b[i]) matches++
    }
    return matches / len
  }

  // Bigram score
  function bigramScore(a, b) {
    if (b.length < 2) return 0
    const getBigrams = str => {
      const bg = []
      for (let i = 0; i < str.length - 1; i++) bg.push(str[i] + str[i + 1])
      return bg
    }
    const aBg = getBigrams(a)
    const bBg = getBigrams(b)
    let matched = 0
    const aCopy = [...aBg]
    for (const bg of bBg) {
      const idx = aCopy.indexOf(bg)
      if (idx !== -1) { matched++; aCopy.splice(idx, 1) }
    }
    return matched / bBg.length
  }

  // Exact character position matches
  function positionScore(a, b) {
    const len = Math.min(a.length, b.length)
    let matches = 0
    for (let i = 0; i < len; i++) {
      if (a[i] === b[i]) matches++
    }
    return matches / Math.max(a.length, b.length)
  }

  // Length difference penalty — the more different the length the more we penalize
  const lenDiff = Math.abs(heardClean.length - expectedClean.length)
  const lenPenalty = Math.max(0.5, 1 - lenDiff * 0.08)

  const seq = sequenceScore(heardClean, expectedClean)
  const overlap = overlapScore(heardClean, expectedClean)
  const prefix = prefixScore(heardClean, expectedClean)
  const bigram = bigramScore(heardClean, expectedClean)
  const position = positionScore(heardClean, expectedClean)

  // Weighted combination
  const combined = (
    position * 0.30 +
    seq * 0.25 +
    bigram * 0.20 +
    overlap * 0.15 +
    prefix * 0.10
  ) * lenPenalty

  // Piecewise curve for natural spread
  let finalScore
  if (combined >= 0.92) finalScore = 88 + (combined - 0.92) * 150
  else if (combined >= 0.75) finalScore = 70 + (combined - 0.75) * 106
  else if (combined >= 0.55) finalScore = 50 + (combined - 0.55) * 100
  else if (combined >= 0.35) finalScore = 30 + (combined - 0.35) * 100
  else if (combined >= 0.15) finalScore = 12 + (combined - 0.15) * 90
  else finalScore = combined * 80
// Only give 100 for perfect exact match (handled above)
  // Cap everything else at 95 for near-perfect
  return Math.round(Math.min(95, Math.max(1, finalScore)))
}

function pickRandomWords() {
  const simple = pronunciationWords.filter(w => w.id >= 1 && w.id <= 15)
  const medium = pronunciationWords.filter(w => w.id >= 16 && w.id <= 35)
  const complex = pronunciationWords.filter(w => w.id >= 36 && w.id <= 50)
  const pick = (arr, n) => [...arr].sort(() => Math.random() - 0.5).slice(0, n)
  return [...pick(simple, 3), ...pick(medium, 3), ...pick(complex, 3)]
}

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

  const recognitionRef = useRef(null)
  const transcriptRef = useRef('')
  const currentIndexRef = useRef(0)
  const wordsRef = useRef([])

  function syncIndex(idx) {
    setCurrentIndex(idx)
    currentIndexRef.current = idx
  }

  function syncWords(w) {
    setWords(w)
    wordsRef.current = w
  }

  function startQuiz() {
    const selected = pickRandomWords()
    syncWords(selected)
    syncIndex(0)
    setScores([])
    setAttempts(0)
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
    setAttempts(0)
    setWordScore(null)
    setError('')
    setIsListening(false)
    setProcessing(false)
  }

  async function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    setError('Speech recognition is not supported. On iPhone use Safari, on desktop use Chrome.')
    return
  }

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

  // On iOS Safari we must manually request mic permission first
  // This triggers the native permission popup
  if (isIOS) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      // Stop the stream immediately — we just needed the permission prompt
      stream.getTracks().forEach(track => track.stop())
    } catch (e) {
      setError('Microphone access denied. Go to Settings → Safari → scroll to Tamilian → enable Microphone.')
      return
    }
  }

  transcriptRef.current = ''

  const rec = new SpeechRecognition()
  rec.lang = 'ta-IN'

  if (isIOS) {
    rec.continuous = false
    rec.interimResults = false
    rec.maxAlternatives = 1
  } else {
    rec.continuous = true
    rec.interimResults = true
    rec.maxAlternatives = 5
  }

  recognitionRef.current = rec
  setIsListening(true)
  setWordScore(null)
  setError('')
  setProcessing(false)

  try {
    rec.start()
  } catch (e) {
    setError('Could not start microphone. Please try again.')
    setIsListening(false)
    return
  }

  rec.onstart = () => {
    setIsListening(true)
  }

  rec.onresult = (event) => {
    let bestTranscript = ''

    if (isIOS) {
      bestTranscript = event.results[0]?.[0]?.transcript || ''
    } else {
      let bestConfidence = 0
      for (let i = 0; i < event.results.length; i++) {
        for (let j = 0; j < event.results[i].length; j++) {
          if (event.results[i][j].confidence >= bestConfidence) {
            bestConfidence = event.results[i][j].confidence
            bestTranscript = event.results[i][j].transcript
          }
        }
      }
    }

    if (bestTranscript) {
      transcriptRef.current = bestTranscript
    }
  }

  rec.onend = () => {
    const transcript = transcriptRef.current
    const expectedTamil = wordsRef.current[currentIndexRef.current]?.tamil

    recognitionRef.current = null
    setIsListening(false)

    if (!transcript || transcript.trim() === '') {
      setWordScore(0)
      setProcessing(false)
      return
    }

    const calculated = scoreWord(transcript, expectedTamil)
    setWordScore(calculated)
    setProcessing(false)
  }

  rec.onerror = (event) => {
    recognitionRef.current = null

    if (event.error === 'no-speech') {
      setIsListening(false)
      setProcessing(false)
      if (!transcriptRef.current) setWordScore(0)
      return
    }
    if (event.error === 'not-allowed') {
      setError('Microphone access denied. Go to Settings → Safari → scroll to Tamilian → enable Microphone.')
      setIsListening(false)
      setProcessing(false)
      return
    }
    if (event.error === 'service-not-allowed') {
      setError('Speech recognition not allowed. Make sure you are using Safari on iPhone and microphone is enabled in Settings.')
      setIsListening(false)
      setProcessing(false)
      return
    }
    setError('Microphone issue. Please try again.')
    setIsListening(false)
    setProcessing(false)
  }
}

function stopListening() {
  if (recognitionRef.current) {
    try { recognitionRef.current.stop() } catch (e) {}
  }
  setIsListening(false)
  setProcessing(true)
  setAttempts(a => a + 1)
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

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">How it works</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">1.</span>
              <p className="text-gray-600">You will get 9 random Tamil words — 3 simple, 3 medium, 3 complex.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">2.</span>
              <p className="text-gray-600">Click <strong>Start</strong> to begin recording, then click <strong>Stop</strong> when you are done saying the word.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">3.</span>
              <p className="text-gray-600">You get one more attempt if you are not happy with your first try.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">4.</span>
              <p className="text-gray-600">Maximum <strong>2 attempts per word</strong>. Click Next Word when ready to move on.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-red-800 font-bold text-lg">5.</span>
              <p className="text-gray-600">After all 9 words you will get your final score and Tamil title!</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
  ⚠️ Works best in <strong>Chrome on Android or desktop</strong>. On <strong>iPhone or iPad</strong>, use <strong>Safari</strong> and go to <strong>Settings → Safari → Microphone</strong> and set it to Allow. Speak clearly and wait a moment after clicking Start before saying the word.
</div>

        <button
          onClick={startQuiz}
          className="w-full bg-red-800 text-white py-4 rounded-xl text-lg font-bold hover:bg-red-700 transition"
        >
          Start Practice
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
            <p className="text-6xl font-bold mb-2">
              {overallScore}<span className="text-3xl">/100</span>
            </p>
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
          onClick={isListening ? stopListening : startListening}
          disabled={processing}
          className={`w-full py-4 rounded-xl font-bold text-white text-lg transition mb-4 ${
            isListening
              ? 'bg-red-500 hover:bg-red-400'
              : processing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-800 hover:bg-red-700'
          }`}
        >
          {isListening
            ? '⏹️ Stop'
            : processing
            ? 'Calculating...'
            : attempts === 1
            ? '🔁 Try Again'
            : '🎤 Start'}
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

      {attempts > 0 && !processing && (
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
