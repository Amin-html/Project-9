import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CompareContext } from '../context/CompareContext'
import './Compare.scss'

// характеристики, которые выводим построчно в таблице
const SPECS = [
  { key: 'price', label: 'Цена', format: v => `${v.toLocaleString()} $` },
  { key: 'year', label: 'Год' },
  { key: 'engine_volume', label: 'Объём двигателя', format: v => `${v} см³` },
  { key: 'power', label: 'Мощность', format: v => `${v} л.с.` },
  { key: 'moto_type', label: 'Тип' },
]

function Compare() {
  const { compareList, removeFromCompare, clearCompare } = useContext(CompareContext)

  if (compareList.length === 0) {
    return (
      <div className="container compare-empty">
        <h1>Сравнение мотоциклов</h1>
        <p>Список пуст — добавь мотоциклы из каталога, нажав "Сравнить"</p>
        <Link to="/motos" className="btn">Перейти в каталог</Link>
      </div>
    )
  }

  return (
    <div className="container compare">
      <div className="compare__header">
        <h1>Сравнение мотоциклов</h1>
        <button className="compare__clear" onClick={clearCompare}>Очистить всё</button>
      </div>

      <div className="compare__table">
        <div className="compare__row compare__row--images">
          <div className="compare__label" />
          {compareList.map(moto => (
            <div key={moto.id} className="compare__col">
              <button
                className="compare__remove"
                onClick={() => removeFromCompare(moto.id)}
                title="Убрать из сравнения"
              >
                ✕
              </button>
              <img src={moto.image} alt={moto.model} />
              <h3>{moto.brand_name} {moto.model}</h3>
            </div>
          ))}
        </div>

        {SPECS.map(spec => (
          <div key={spec.key} className="compare__row">
            <div className="compare__label">{spec.label}</div>
            {compareList.map(moto => (
              <div key={moto.id} className="compare__col compare__value">
                {spec.format ? spec.format(moto[spec.key]) : moto[spec.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Compare