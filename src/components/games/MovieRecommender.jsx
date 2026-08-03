import { useState } from 'react'

// 🔧 PASTE YOUR TMDB API READ ACCESS TOKEN HERE
const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmRiNTUyYzIyYjc5OGZmMzY5ZTI1YjI1NzI5MzRjOSIsIm5iZiI6MTc4NTU0MzAyNS45MjYsInN1YiI6IjZhNmQzOTcxNjk0Y2JhYjY3YTk2NjU2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.flrj3iVMTpfoZtAvMS1LCdkryDs9ofn9-V8pI4cOJWQ'
const TMDB_BASE = 'https://api.themoviedb.org/3'
const TMDB_IMG = 'https://image.tmdb.org/t/p/w500'

const genres = [
  { label: 'Action/Mass', tmdbIds: [28] },
  { label: 'Comedy', tmdbIds: [35] },
  { label: 'Horror', tmdbIds: [27] },
  { label: 'Feel Good', tmdbIds: [10751, 35] },
  { label: 'Sad/Emotional', tmdbIds: [18] },
  { label: 'Thriller', tmdbIds: [53] },
  { label: 'Romance', tmdbIds: [10749] },
  { label: 'Family', tmdbIds: [10751] },
  { label: 'Superhit', tmdbIds: [28, 18, 35] },
]

const popularActors = [
  'Any',
  'Rajinikanth',
  'Vijay',
  'Ajith Kumar',
  'Kamal Haasan',
  'Dhanush',
  'Vikram',
  'Suriya',
  'Sivakarthikeyan',
  'Vijay Sethupathi',
  'STR Simbu',
]

const popularDirectors = [
  'Any',
  'Shankar',
  'Mani Ratnam',
  'Lokesh Kanagaraj',
  'Atlee',
  'Vetrimaaran',
  'AR Murugadoss',
  'Pa Ranjith',
  'Karthik Subbaraj',
  'Nelson Dilipkumar',
  'Gautham Menon',
]

const yearRanges = [
  { label: 'All Time', min: 1950, max: 2025 },
  { label: 'Latest (Past 6 Months)', min: null, max: null, latest: true },
  { label: '2020s', min: 2020, max: 2025 },
  { label: '2010s', min: 2010, max: 2019 },
  { label: '2000s', min: 2000, max: 2009 },
  { label: '90s', min: 1990, max: 1999 },
  { label: 'Classic (Before 1990)', min: 1950, max: 1989 },
]

const ratings = [
  { label: 'Any', value: 0 },
  { label: '6+', value: 6 },
  { label: '7+', value: 7 },
  { label: '7.5+', value: 7.5 },
  { label: '8+', value: 8 },
  { label: '8.5+', value: 8.5 },
]

async function tmdbFetch(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      'Content-Type': 'application/json',
    }
  })
  return res.json()
}

async function getMovieCredits(movieId) {
  const data = await tmdbFetch(`${TMDB_BASE}/movie/${movieId}/credits?language=en-US`)
  // Only pick crew member whose job is exactly "Director"
  const director = data.crew?.find(c => c.job === 'Director')?.name || 'Unknown'
  const cast = data.cast?.slice(0, 3).map(c => c.name).join(', ') || 'Unknown'
  return { director, cast }
}

async function searchMovies(filters) {
  const { selectedGenres, yearRange, minRating, sortBy, actor, director } = filters

  const isSuperhit = selectedGenres.some(g => g.label === 'Superhit')
  const otherGenres = selectedGenres.filter(g => g.label !== 'Superhit')

  const genreIds = otherGenres.length > 0
    ? [...new Set(otherGenres.flatMap(g => g.tmdbIds))].join('|')
    : ''

  let dateFrom, dateTo
  if (yearRange.latest) {
    const today = new Date()
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(today.getMonth() - 6)
    dateFrom = sixMonthsAgo.toISOString().slice(0, 10)
    dateTo = today.toISOString().slice(0, 10)
  } else {
    dateFrom = `${yearRange.min}-01-01`
    dateTo = `${yearRange.max}-12-31`
  }

  let url = `${TMDB_BASE}/discover/movie?with_original_language=ta&region=IN&language=en-US`
  url += `&primary_release_date.gte=${dateFrom}`
  url += `&primary_release_date.lte=${dateTo}`
  if (genreIds) url += `&with_genres=${genreIds}`

  // Superhit definition: high rating + many votes = overperformed expectations
  if (isSuperhit) {
    url += `&vote_average.gte=6.5&vote_count.gte=50&sort_by=vote_count.desc`
  } else {
    if (minRating > 0) url += `&vote_average.gte=${minRating}&vote_count.gte=50`
    url += `&sort_by=${sortBy}`
  }

  // Actor search
  if (actor && actor !== 'Any') {
    const actorSearch = await tmdbFetch(
      `${TMDB_BASE}/search/person?query=${encodeURIComponent(actor)}&language=en-US`
    )
    // Find person who is known for acting, not directing
    const actorResult = actorSearch.results?.find(
      p => p.known_for_department === 'Acting'
    )
    if (actorResult) url += `&with_cast=${actorResult.id}`
  }

  // Director search — strict match by name and department
  if (director && director !== 'Any') {
    const directorSearch = await tmdbFetch(
      `${TMDB_BASE}/search/person?query=${encodeURIComponent(director)}&language=en-US`
    )
    // Only pick someone whose known department is Directing
    const directorResult = directorSearch.results?.find(
      p => p.known_for_department === 'Directing'
    )
    if (directorResult) {
      // Use with_crew for director role specifically
      url += `&with_crew=${directorResult.id}`
    }
  }

  const data = await tmdbFetch(url)
  return data.results || []
}

function StarRating({ rating }) {
  const score = Math.round(rating) / 2
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= score ? 'text-yellow-400' : 'text-gray-300'}>★</span>
      ))}
      <span className="text-sm font-bold text-gray-700 ml-1">{rating.toFixed(1)}/10</span>
    </div>
  )
}

function MovieRecommender() {
  const [selectedGenres, setSelectedGenres] = useState([])
  const [yearRange, setYearRange] = useState(yearRanges[0])
  const [minRating, setMinRating] = useState(ratings[0])
  const [sortBy, setSortBy] = useState('vote_average.desc')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)
  const [actor, setActor] = useState('Any')
  const [director, setDirector] = useState('Any')
  const [count, setCount] = useState(10)

  function toggleGenre(genre) {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    )
  }

  async function handleSearch() {
  setLoading(true)
  setError('')
  setMovies([])
  setSearched(true)

  try {
    const results = await searchMovies({
      selectedGenres,
      yearRange,
      minRating: minRating.value,
      sortBy,
      actor,
      director,
    })

    const detailed = await Promise.all(
      results.slice(0, count).map(async movie => {
        const { director: dir, cast } = await getMovieCredits(movie.id)
        return { ...movie, director: dir, cast }
      })
    )

    setMovies(detailed)
  } catch (e) {
    setError('Something went wrong fetching movies. Check your API token and try again.')
  }

  setLoading(false)
}

  function handleReset() {
  setSelectedGenres([])
  setYearRange(yearRanges[0])
  setMinRating(ratings[0])
  setSortBy('vote_average.desc')
  setActor('Any')
  setDirector('Any')
  setCount(10)
  setMovies([])
  setSearched(false)
  setError('')
}

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      <div className="text-center mb-10">
        <p className="text-5xl mb-4">🎬</p>
        <h2 className="text-3xl font-bold text-red-800 mb-2">Tamil Movie Recommender</h2>
        <p className="text-gray-500">Filter Tamil movies by genre, era, and rating.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        {/* Genre */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3">Genre / Category</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
              <button
                key={genre.label}
                onClick={() => toggleGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                  selectedGenres.includes(genre)
                    ? 'bg-red-800 text-white border-red-800'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-red-400'
                }`}
              >
                {genre.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

  {/* Era */}
  <div>
    <h3 className="text-sm font-bold text-gray-700 mb-2">Era</h3>
    <select
      value={yearRange.label}
      onChange={e => setYearRange(yearRanges.find(y => y.label === e.target.value))}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 bg-white"
    >
      {yearRanges.map(y => (
        <option key={y.label} value={y.label}>{y.label}</option>
      ))}
    </select>
  </div>

  {/* Min Rating */}
  <div>
    <h3 className="text-sm font-bold text-gray-700 mb-2">Minimum IMDB Rating</h3>
    <select
      value={minRating.label}
      onChange={e => setMinRating(ratings.find(r => r.label === e.target.value))}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 bg-white"
    >
      {ratings.map(r => (
        <option key={r.label} value={r.label}>{r.label}</option>
      ))}
    </select>
  </div>

  {/* Sort By */}
  <div>
    <h3 className="text-sm font-bold text-gray-700 mb-2">Sort By</h3>
    <select
      value={sortBy}
      onChange={e => setSortBy(e.target.value)}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 bg-white"
    >
      <option value="vote_average.desc">Highest Rated</option>
      <option value="popularity.desc">Most Popular</option>
      <option value="primary_release_date.desc">Newest First</option>
      <option value="primary_release_date.asc">Oldest First</option>
    </select>
  </div>

  {/* Actor */}
<div>
  <h3 className="text-sm font-bold text-gray-700 mb-2">Lead Actor</h3>
  <select
    value={actor}
    onChange={e => setActor(e.target.value)}
    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 bg-white"
  >
    {popularActors.map(a => (
      <option key={a} value={a}>{a}</option>
    ))}
  </select>
</div>

{/* Director */}
<div>
  <h3 className="text-sm font-bold text-gray-700 mb-2">Director</h3>
  <select
    value={director}
    onChange={e => setDirector(e.target.value)}
    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 bg-white"
  >
    {popularDirectors.map(d => (
      <option key={d} value={d}>{d}</option>
    ))}
  </select>
</div>

</div>

{/* Count Slider */}
<div className="mb-6">
  <h3 className="text-sm font-bold text-gray-700 mb-2">
    Number of movies to show: <span className="text-red-800">{count}</span>
  </h3>
  <input
    type="range"
    min={5}
    max={20}
    step={5}
    value={count}
    onChange={e => setCount(Number(e.target.value))}
    className="w-full accent-red-800"
  />
  <div className="flex justify-between text-xs text-gray-400 mt-1">
    <span>5</span><span>10</span><span>15</span><span>20</span>
  </div>
</div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSearch}
            disabled={loading}
            className={`flex-1 py-3 rounded-xl font-bold text-white transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-800 hover:bg-red-700'
            }`}
          >
            {loading ? 'Searching...' : '🎬 Find Movies'}
          </button>
          {searched && (
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl font-bold text-gray-600 border border-gray-300 hover:bg-gray-50 transition"
            >
              Reset
            </button>
          )}
        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-center">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <p className="text-4xl mb-4 animate-bounce">🎬</p>
          <p className="text-gray-500 font-medium">Searching Tamil cinema...</p>
        </div>
      )}

      {/* Results */}
      {!loading && movies.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-6">{movies.length} movies found</h3>
          <div className="flex flex-col gap-6">
            {movies.map((movie, i) => (
              <div key={i} className="bg-white rounded-2xl shadow hover:shadow-lg transition flex overflow-hidden">

                {/* Poster */}
                <div className="w-36 flex-shrink-0">
                  {movie.poster_path ? (
                    <img
                      src={`${TMDB_IMG}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-4xl">🎬</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{movie.title}</h4>
                      {movie.original_title !== movie.title && (
                        <p className="text-gray-400 text-sm">{movie.original_title}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <StarRating rating={movie.vote_average} />
                      <p className="text-xs text-gray-400 mt-1">
                        {movie.release_date?.slice(0, 4)}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 mb-3">
                    <span className="font-semibold text-gray-700">Director:</span> {movie.director} &nbsp;|&nbsp;
                    <span className="font-semibold text-gray-700">Cast:</span> {movie.cast}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {movie.overview || 'No description available.'}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {!loading && searched && movies.length === 0 && !error && (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🎭</p>
          <p className="text-gray-500">No movies found. Try different filters!</p>
        </div>
      )}

    </div>
  )
}

export default MovieRecommender