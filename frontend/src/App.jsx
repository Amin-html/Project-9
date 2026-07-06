import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MotoList from './pages/MotoList'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/motos" element={<MotoList />} />
        {/* остальные роуты добавим по мере готовности страниц */}
      </Routes>
    </BrowserRouter>
  )
}

export default App