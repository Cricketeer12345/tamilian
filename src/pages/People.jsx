import { useState } from 'react'
import people from '../data/people'

const eras = [
  { key: 'all', label: 'All' },
  { key: 'ancient', label: 'Ancient', sub: 'Before 300 AD' },
  { key: 'classical', label: 'Classical', sub: '300 AD – 1900s' },
  { key: 'modern', label: 'Modern', sub: '1900s – Present' },
]

function People() {
  const [selectedEra, setSelectedEra] = useState('all')

  const filtered = selectedEra === 'all'
    ? people
    : people.filter(p => p.era === selectedEra)

  return (
    <div className="min-h-screen bg-amber-50 flex">

      {/* Sidebar */}
      <div className="w-56 bg-white border-r border-gray-200 p-6 flex flex-col gap-3 min-h-screen">
        <h2 className="text-lg font-bold text-red-800 mb-4">Filter by Era</h2>
        {eras.map(era => (
          <button
            key={era.key}
            onClick={() => setSelectedEra(era.key)}
            className={`text-left px-4 py-3 rounded-xl transition ${selectedEra === era.key
              ? 'bg-red-800 text-white'
              : 'bg-amber-50 text-gray-700 hover:bg-amber-100'
              }`}
          >
            <div className="font-semibold">{era.label}</div>
            {era.sub && (
              <div className={`text-xs mt-0.5 ${selectedEra === era.key ? 'text-red-200' : 'text-gray-400'}`}>
                {era.sub}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-red-800 mb-2">Famous Tamils</h1>
        <p className="text-gray-500 mb-8">Legends and icons who shaped Tamil culture and history.</p>

        <div className="flex flex-col gap-6">
          {filtered.map(person => (
            <div key={person.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition flex overflow-hidden h-52">

              {/* Left — Image + Name + Years */}
              <div className="w-50 h-52 flex-shrink-0 flex flex-col">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-32 object-fill"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/192x128?text=No+Image'
                  }}
                />
                <div className="p-3 flex-1 bg-red-800 text-white">
                  <h3 className="text-sm font-bold leading-tight">{person.name}</h3>
                  <p className="text-xs text-red-200 mt-1">{person.years}</p>
                </div>
              </div>

              {/* Right — Field tag + Description */}
              <div className="flex-1 p-6 flex flex-col justify-start mb-0 gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-red-700 bg-red-50 px-3 py-1 rounded-full self-start mb-2">
                  {person.field}
                </span>
                <p className="text-gray-600 text-base leading-relaxed">
                  {person.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default People