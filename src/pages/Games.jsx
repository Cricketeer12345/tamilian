import { useState } from 'react'
import SongAssociation from '../components/games/SongAssociation'
import MovieRecommender from '../components/games/MovieRecommender'

const tabs = [
  { key: 'songassociation', label: '🎵 Tamil Song Association' },
  { key: 'movierecommender', label: '🎬 Movie Recommender' },
]

function Games() {
  const [activeTab, setActiveTab] = useState('songassociation')

  return (
    <div className="min-h-screen bg-amber-50">

      <div className="bg-red-800 text-white px-10 py-10">
        <h1 className="text-4xl font-bold mb-2">Games</h1>
        <p className="text-red-200 text-lg">Fun ways to explore Tamil language and culture.</p>
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
        {activeTab === 'songassociation' && <SongAssociation />}
        {activeTab === 'movierecommender' && <MovieRecommender />}
      </div>

      <div className="text-center py-8 text-gray-400 text-sm border-t border-amber-200 mt-10">
        For other Tamil games, check out{' '}
        <a
          href="https://kodle.in/play"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-800 font-semibold hover:underline"
        >
          Kodle
        </a>
      </div>

    </div>
  )
}

export default Games