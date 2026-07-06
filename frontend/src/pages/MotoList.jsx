import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api/axios'
import MotoCard from '../components/MotoCard'
import PriceRange from '../components/PriceRange'
import './MotoList.scss'

const PRICE_MIN = 0
const PRICE_MAX = 35000

function MotoList() {
  const [motos, setMotos] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const [price, setPrice] = useState({
    min: Number(searchParams.get('min')) || PRICE_MIN,
    max: Number(searchParams.get('max')) || PRICE_MAX,
  })
  const [type, setType] = useState(searchParams.get('type') || '')
  const [brand, setBrand] = useState(searchParams.get('brand') || '')
  const [query, setQuery] = useState(searchParams.get('q') || '')

  // подгружаем бренды один раз
  useEffect(() => {
    api.get('/brands/').then(res => setBrands(res.data))
  }, [])

  // подгружаем мотоциклы при любом изменении фильтров
  useEffect(() => {
    setLoading(true)
    const params = {}
    if (price.min > PRICE_MIN) params.min = price.min
    if (price.max < PRICE_MAX) params.max = price.max
    if (type) params.type = type
    if (brand) params.brand = brand
    if (query) params.q = query

    // синхронизируем URL с фильтрами, чтобы можно было делиться ссылкой
    setSearchParams(params)

    api.get('/motos/', { params })
      .then(res => setMotos(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [price, type, brand, query])

  return (
    <div className="moto-list container">
      <aside className="moto-list__filters">
        <h3>Фильтры</h3>

        <div className="filter-group">
          <label>Цена</label>
          <PriceRange
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={price}
            onChange={setPrice}
          />
        </div>

        <div className="filter-group">
          <label>Бренд</label>
          <select value={brand} onChange={e => setBrand(e.target.value)}>
            <option value="">Все</option>
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Тип</label>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="">Все</option>
            <option value="sport">Спорт</option>
            <option value="cruiser">Круизер</option>
            <option value="enduro">Эндуро</option>
            <option value="naked">Нейкед</option>
            <option value="touring">Туристический</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Поиск</label>
          <input
            type="text"
            placeholder="Модель..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </aside>

      <main className="moto-list__grid">
        {loading ? (
          <p>Загрузка...</p>
        ) : motos.length === 0 ? (
          <p>Ничего не найдено</p>
        ) : (
          motos.map(moto => <MotoCard key={moto.id} moto={moto} />)
        )}
      </main>
    </div>
  )
}

export default MotoList