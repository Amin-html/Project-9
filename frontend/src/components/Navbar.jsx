import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import './Navbar.scss'
import { CompareContext } from '../context/CompareContext'

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  const { compareList } = useContext(CompareContext)
  

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">MotoStore</Link>
        <div className="navbar__links">
          <Link to="/motos">Каталог</Link>
          <Link to="/favorites">Избранное</Link>
          <Link to="/compare">
            Сравнить {compareList.length > 0 && `(${compareList.length})`}
          </Link>
          <Link to="/profile">Профиль</Link>
          {isAuthenticated ? (
            <button className="navbar__logout" onClick={handleLogout}>Выйти</button>
          ) : (
            <Link to="/login">Войти</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar