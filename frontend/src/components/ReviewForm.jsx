import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../api/axios'
import './ReviewForm.scss'

function ReviewForm({ motoId, onReviewAdded }) {
  const { isAuthenticated } = useContext(AuthContext)
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post(`/reviews/${motoId}/`, { rating, text })
      onReviewAdded(res.data)
      setText('')
      setRating(5)
    } catch (err) {
      // например, если юзер уже оставлял отзыв на этот мото
      setError(err.response?.data?.detail || 'Не удалось отправить отзыв')
    }
  }

  if (!isAuthenticated) {
    return <p className="review-form__login-hint">Войдите, чтобы оставить отзыв</p>
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-form__rating">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={star <= rating ? 'star star--active' : 'star'}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        placeholder="Ваш отзыв..."
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      {error && <p className="review-form__error">{error}</p>}
      <button type="submit" className="btn">Отправить отзыв</button>
    </form>
  )
}

export default ReviewForm