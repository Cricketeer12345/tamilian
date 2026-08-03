import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-red-800 tracking-wide">
        தமிழன் | Tamilian
      </Link>
      <div className="flex gap-8">
        <Link to="/" className="text-gray-700 hover:text-red-800 font-medium">
          Home
        </Link>
        <Link to="/learn" className="text-gray-700 hover:text-red-800 font-medium">
          Learn
        </Link>
        <Link to="/people" className="text-gray-700 hover:text-red-800 font-medium">
          People
        </Link>
        <Link to="/games" className="text-gray-700 hover:text-red-800 font-medium">
          Games
        </Link>
      </div>
    </nav>
  )
}

export default Navbar