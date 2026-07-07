import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CompareContext } from '../context/CompareContext'
import './MotoCard.scss'

function MotoCard({ moto }) {
  const { toggleCompare, isInCompare } = useContext(CompareContext)
  const inCompare = isInCompare(moto.id)

  const handleCompareClick = (e) => {
    e.preventDefault() // не даём Link сработать при клике на кнопку
    toggleCompare(moto)
  }

  return (
    <div className="moto-card">
      <Link to={`/motos/${moto.id}`}>
        <img src={moto.image} alt={moto.model} />
        <div className="moto-card__body">
          <span className="moto-card__brand">{moto.brand_name}</span>
          <h3>{moto.model}</h3>
          <div className="moto-card__meta">
            <span>{moto.year} г.</span>
            <span>{moto.engine_volume} см³</span>
          </div>
          <p className="moto-card__price">{moto.price.toLocaleString()} $</p>
        </div>
      </Link>
      <button
        className={inCompare ? 'moto-card__compare-btn moto-card__compare-btn--active' : 'moto-card__compare-btn'}
        onClick={handleCompareClick}
      >
        {inCompare ? '✓ В сравнении' : '+ Сравнить'}
      </button>
    </div>
  )
}

export default MotoCard