import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Learn from './pages/Learn'
import People from './pages/People'
import Games from './pages/Games'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/people" element={<People />} />
        <Route path="/games" element={<Games />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}

export default App