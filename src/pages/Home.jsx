import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-amber-50">

      {/* Hero Section */}
      <div className="text-center py-24 px-8 bg-red-800 text-white">
        
        <h1 className="text-5xl font-bold mb-6">Welcome to Tamilian</h1>
        <p className="text-xl max-w-2xl mx-auto text-red-100 mb-12">
          Explore the world's oldest living language. Learn Tamil script,
          common phrases, and discover the people who shaped Tamil culture.
        </p>
        <p className="text-6xl">வாழ்க தமிழ்!</p>
      </div>

      {/* Cards Section */}
      <div className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">

        <Link to="/learn" className="bg-white rounded-2xl p-8">
          <div><img src="https://png.pngtree.com/png-clipart/20230316/original/pngtree-thiruvalluvar-vector-design-png-image_8990338.png" style={{ width: 150, height: 150, marginBottom: 2, margin: "0 auto" }}/></div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Learn Tamil</h2>
          <p className="text-gray-600">
            Start with the alphabet, learn common phrases, and understand basic grammar.
          </p>
        </Link>

        <Link to="/people" className="bg-white rounded-2xl p-8">
          <div><img src="https://images.seeklogo.com/logo-png/30/1/mk-apj-logo-png_seeklogo-304798.png" style={{ width: 150, height: 150, marginBottom: 2, margin: "0 auto" }} /></div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Famous Tamils</h2>
          <p className="text-gray-600">
            Discover historical legends and modern icons who shaped Tamil heritage.
          </p>
        </Link>

        <Link to="/games" className="bg-white rounded-2xl p-8">
          <div><img src="https://www.image2url.com/r2/default/images/1780713490694-a69ac4e2-f1b6-42f4-b267-fd1ae408fed2.png" style={{ width: 150, height: 150, marginBottom: 2, margin: "0 auto" }} /></div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Games</h2>
          <p className="text-gray-600">
            Play games based on Tamil movies and try out the Movie Recommender to find something to watch.
          </p>
        </Link>

      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-400 text-sm border-t border-amber-200">
        Tamilian — Celebrating the Tamil language and its people
      </div>

    </div>
  )
}

export default Home