import { useEffect, useState } from 'react'
import api from '../api/axios'
import './Profile.scss'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    api.get('/profile/').then(res => setProfile(res.data))
    api.get('/history/').then(res => setHistory(res.data)).catch(() => {})
  }, [])

  if (!profile) return <p className="container">Загрузка...</p>

  return (
    <div className="profile container">
      <h1>Профиль</h1>
      <div className="profile__card">
        <p><span>Имя пользователя</span>{profile.username}</p>
        <p><span>Email</span>{profile.email || '—'}</p>
        <p><span>Телефон</span>{profile.phone || '—'}</p>
      </div>

      <h2>История просмотров</h2>
      <div className="profile__history">
        {history.length === 0 ? (
          <p>Пока нет просмотров</p>
        ) : (
          history.map(item => (
            <div key={item.id} className="profile__history-item">
              Мотоцикл #{item.motorcycle} — {new Date(item.viewed_at).toLocaleString()}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Profile