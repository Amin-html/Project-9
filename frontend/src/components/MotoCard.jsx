import { Link } from 'react-router-dom'
import './MotoCard.scss'

function MotoCard({ moto }) {
  return (
    <Link to={`/motos/${moto.id}`} className="moto-card">
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
  )
}

export default MotoCard