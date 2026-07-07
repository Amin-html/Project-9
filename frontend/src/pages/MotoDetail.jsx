import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import ReviewForm from '../components/ReviewForm'
import { AuthContext } from '../context/AuthContext'
import './MotoDetail.scss'
import { CompareContext } from '../context/CompareContext'

function MotoDetail() {
  const { id } = useParams()
  const { isAuthenticated } = useContext(AuthContext)
  const [moto, setMoto] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const { toggleCompare, isInCompare } = useContext(CompareContext)
  const inCompare = moto ? isInCompare(moto.id) : false

  useEffect(() => {
    setLoading(true)
    Promise.all([
      api.get(`/motos/${id}/`),
      api.get(`/reviews/${id}/`),
    ])
      .then(([motoRes, reviewsRes]) => {
        setMoto(motoRes.data)
        setReviews(reviewsRes.data)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))

    // добавляем в историю просмотров, если авторизован
    if (isAuthenticated) {
      // отдельный silent-запрос, ошибку игнорируем — это не критично для UX
      api.post(`/history/${id}/`).catch(() => {})
    }
  }, [id])

  // проверяем, есть ли этот мото уже в избранном
  useEffect(() => {
    if (!isAuthenticated) return
    api.get('/favorites/')
      .then(res => {
        const found = res.data.some(fav => fav.motorcycle === Number(id))
        setIsFavorite(found)
      })
      .catch(err => console.error(err))
  }, [id, isAuthenticated])

  const toggleFavorite = async () => {
    if (!isAuthenticated) return
    try {
      const res = await api.post(`/favorites/${id}/`)
      setIsFavorite(res.data.status === 'added')
    } catch (err) {
      console.error(err)
    }
  }

  const handleReviewAdded = (newReview) => {
    setReviews(prev => [newReview, ...prev])
  }

  if (loading) return <p className="container">Загрузка...</p>
  if (!moto) return <p className="container">Мотоцикл не найден</p>

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div className="moto-detail container">
      <div className="moto-detail__main">
        <img src={moto.image} alt={moto.model} />
        <div className="moto-detail__info">
          <span className="moto-detail__brand">{moto.brand_name}</span>
          <h1>{moto.model}</h1>
          {avgRating && (
            <div className="moto-detail__rating">★ {avgRating} ({reviews.length} отзывов)</div>
          )}
          <p className="moto-detail__price">{moto.price.toLocaleString()} $</p>

          {isAuthenticated && (
            <button
              className={inCompare ? 'btn-favorite btn-favorite--active' : 'btn-favorite'}
              onClick={() => toggleCompare(moto)}
            >
              {inCompare ? '✓ В сравнении' : '+ Сравнить'}
            </button>

          )}

          <div className="moto-detail__specs">
            <div><span>Год</span><strong>{moto.year}</strong></div>
            <div><span>Объём</span><strong>{moto.engine_volume} см³</strong></div>
            <div><span>Мощность</span><strong>{moto.power} л.с.</strong></div>
            <div><span>Тип</span><strong>{moto.moto_type}</strong></div>
          </div>

          <p className="moto-detail__description">{moto.description}</p>
        </div>
      </div>

      <section className="moto-detail__reviews">
        <h2>Отзывы</h2>
        <ReviewForm motoId={id} onReviewAdded={handleReviewAdded} />
        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p>Пока нет отзывов — будьте первым!</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-item__header">
                  <strong>{review.username}</strong>
                  <span>{'★'.repeat(review.rating)}</span>
                </div>
                <p>{review.text}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default MotoDetail