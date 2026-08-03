import { useState } from 'react'
import PronunciationSection from '../components/learn/PronunciationSection'
import AlphabetSection from '../components/learn/AlphabetSection'

const tabs = [
  { key: 'alphabet', label: '🔤 Letter Bank' },
  { key: 'pronunciation', label: '🗣️ Pronunciation' },
]

function Learn() {
  const [activeTab, setActiveTab] = useState('alphabet')

  return (
    <div className="min-h-screen bg-amber-50">

      <div className="bg-red-800 text-white px-10 py-10">
        <h1 className="text-4xl font-bold mb-2">Learn Tamil</h1>
        <p className="text-red-200 text-lg">Start your journey into one of the world's oldest languages.</p>
      </div>

      <div className="bg-white border-b border-gray-200 px-10 flex gap-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-4 px-6 font-semibold text-sm whitespace-nowrap border-b-2 transition ${
              activeTab === tab.key
                ? 'border-red-800 text-red-800'
                : 'border-transparent text-gray-500 hover:text-red-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-10">
        {activeTab === 'alphabet' && <AlphabetSection />}
        {activeTab === 'pronunciation' && <PronunciationSection />}
      </div>

    </div>
  )
}

export default Learn