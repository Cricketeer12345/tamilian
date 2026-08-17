import { useState } from 'react'
import { uyir, mei, uyirmei } from '../../data/tamilAlphabet'

const GOOGLE_FORM_URL = 'https://forms.gle/WagYAhnxkvtV1zfdA'

function AlphabetSection() {
    const [hovered, setHovered] = useState(null)

    return (
        <div className="py-10 px-4 flex gap-8 max-w-7xl mx-auto">

            {/* Left — Table */}
            <div className="flex-1 overflow-x-auto">

                {/* Legend */}
                <div className="flex gap-4 mb-6 flex-wrap">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-100 border border-red-300" />
                        <span className="text-sm text-gray-600">உயிர் Uyir (Vowels)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300" />
                        <span className="text-sm text-gray-600">மெய் Mei (Consonants)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-amber-50 border border-amber-300" />
                        <span className="text-sm text-gray-600">உயிர்மெய் Uyirmei (Combined)</span>
                    </div>
                </div>

                {/* Uyir Row */}
                <div className="mb-6">
                    <p className="text-sm font-bold text-red-800 mb-2">உயிர் — Vowels</p>
                    <div className="flex flex-wrap gap-2">
                        {uyir.map((item) => (
                            <div
                                key={item.letter}
                                onMouseEnter={() => setHovered({ type: 'uyir', ...item })}
                                onMouseLeave={() => setHovered(null)}
                                className="w-12 h-12 flex flex-col items-center justify-center rounded-lg border border-red-300 bg-red-100 hover:bg-red-200 cursor-pointer transition"
                            >
                                <span className="text-lg font-bold text-red-900">{item.letter}</span>
                                <span className="text-xs text-red-600">{item.transliteration}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mei Row */}
                <div className="mb-6">
                    <p className="text-sm font-bold text-blue-800 mb-2">மெய் — Consonants</p>
                    <div className="flex flex-wrap gap-2">
                        {mei.map((item) => (
                            <div
                                key={item.letter}
                                onMouseEnter={() => setHovered({ type: 'mei', ...item })}
                                onMouseLeave={() => setHovered(null)}
                                className="w-12 h-12 flex flex-col items-center justify-center rounded-lg border border-blue-300 bg-blue-100 hover:bg-blue-200 cursor-pointer transition"
                            >
                                <span className="text-lg font-bold text-blue-900">{item.letter}</span>
                                <span className="text-xs text-blue-600">{item.transliteration}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Uyirmei Grid */}
                <div>
                    <p className="text-sm font-bold text-amber-800 mb-2">உயிர்மெய் — Combined Letters</p>
                    <div className="overflow-x-auto">
                        <table className="border-collapse">
                            <thead>
                                <tr>
                                    <th className="w-14 h-10 text-xs text-gray-500 font-semibold"></th>
                                    {uyir.map(v => (
                                        <th key={v.letter} className="w-12 h-10 text-center text-xs text-red-700 font-bold bg-red-50 border border-red-200">
                                            {v.letter}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {uyirmei.map((row) => (
                                    <tr key={row.consonant}>
                                        <td className="w-14 h-10 text-center text-xs text-blue-700 font-bold bg-blue-50 border border-blue-200">
                                            {row.consonant}
                                        </td>
                                        {row.combinations.map((cell) => (
                                            <td
                                                key={cell.letter}
                                                onMouseEnter={() => setHovered({ type: 'uyirmei', ...cell })}
                                                onMouseLeave={() => setHovered(null)}
                                                className={`w-12 h-10 text-center border cursor-pointer transition ${cell.word
                                                    ? 'border-amber-200 bg-amber-50 hover:bg-amber-200'
                                                    : 'border-gray-200 bg-gray-100 hover:bg-gray-200'
                                                    }`}
                                            >
                                                <span className={`text-base font-bold ${cell.word ? 'text-gray-800' : 'text-gray-400'}`}>
                                                    {cell.letter}
                                                </span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right — Hover Panel + Community Box */}
            <div className="w-80 flex-shrink-0">
                <div className="sticky top-6 flex flex-col gap-4">

                    {/* Hover Panel */}
                    {hovered ? (
                        <div className={`rounded-2xl border p-6 text-center shadow ${hovered.type === 'uyir'
                            ? 'bg-red-50 border-red-300'
                            : hovered.type === 'mei'
                                ? 'bg-blue-50 border-blue-300'
                                : hovered.word
                                    ? 'bg-amber-50 border-amber-300'
                                    : 'bg-gray-100 border-gray-300'
                            }`}>
                            <p className={`text-7xl font-bold mb-3 ${hovered.word === null && hovered.type === 'uyirmei' ? 'text-gray-400' : 'text-gray-800'
                                }`}>
                                {hovered.letter}
                            </p>
                            <p className={`text-xl font-bold mb-1 ${hovered.type === 'uyir' ? 'text-red-700' :
                                hovered.type === 'mei' ? 'text-blue-700' :
                                    hovered.word ? 'text-amber-700' : 'text-gray-400'
                                }`}>
                                {hovered.transliteration}
                            </p>
                            <p className="text-xs uppercase tracking-wide text-gray-400 mb-4">
                                {hovered.type === 'uyir' ? 'Vowel' : hovered.type === 'mei' ? 'Consonant' : 'Combined'}
                            </p>
                            {hovered.word ? (
                                <div className="bg-white rounded-xl p-4 text-left">
                                    <p className="text-xs text-gray-400 mb-1">Example word</p>
                                    <p className="text-lg font-bold text-gray-800">{hovered.word}</p>
                                    <p className="text-sm text-gray-500">{hovered.meaning}</p>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl p-4 text-center">
                                    <p className="text-sm text-gray-400">No common word for this combination</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
                            <p className="text-4xl mb-3">👆</p>
                            <p className="text-gray-400 text-sm">Hover over any letter to see details </p>
                            <p className="text-gray-400 text-sm">(rotate device on mobile) </p>
                        </div>
                    )}

                    {/* Community Contribution Box */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow">
                        <p className="text-lg mb-2">💡</p>
                        <h3 className="text-sm font-bold text-gray-700 mb-1">Know a missing word?</h3>
                        <p className="text-xs text-gray-400 mb-4">
                            If you know a Tamil word for a letter we are missing, let us know. No sign up needed.
                        </p>
                        <a
                            href={GOOGLE_FORM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center py-2 rounded-lg bg-red-800 text-white text-sm font-semibold hover:bg-red-700 transition"
                        >
                            Submit a Word
                        </a>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default AlphabetSection
