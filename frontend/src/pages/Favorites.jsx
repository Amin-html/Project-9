import { useEffect, useState } from 'react'
import api from '../api/axios'
import MotoCard from '../components/MotoCard'
import './MotoList.scss' // переиспользуем сетку карточек

function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/favorites/')
      .then(res => setFavorites(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="container">Загрузка...</p>

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h1 style={{ marginBottom: 24 }}>Избранное</h1>
      {favorites.length === 0 ? (
        <p>Пока пусто — добавляй мотоциклы через страницу мотоцикла</p>
      ) : (
        <div className="moto-list__grid">
          {favorites.map(fav => (
            <MotoCard key={fav.id} moto={fav.motorcycle_detail} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites