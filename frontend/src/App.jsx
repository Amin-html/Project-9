import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CompareProvider } from './context/CompareContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MotoList from './pages/MotoList'
import MotoDetail from './pages/MotoDetail'
import Compare from './components/Compare'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <AuthProvider>
      <CompareProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/motos" element={<MotoList />} />
            <Route path="/motos/:id" element={<MotoDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </CompareProvider>
    </AuthProvider>
  )
}

export default App