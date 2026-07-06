import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MotoList from './pages/MotoList'
import MotoDetail from './pages/MotoDetail'
import { AuthProvider } from './context/AuthContext'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/motos" element={<MotoList />} />
              <Route path="/motos/:id" element={<MotoDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={<Profile />} />
              {/* остальные роуты добавим по мере готовности страниц */}
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App