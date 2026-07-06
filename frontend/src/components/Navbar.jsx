import { Link } from 'react-router-dom'
import './Navbar.scss'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">MotoStore</Link>
        <div className="navbar__links">
          <Link to="/motos">Каталог</Link>
          <Link to="/favorites">Избранное</Link>
          <Link to="/compare">Сравнить</Link>
          <Link to="/profile">Профиль</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar