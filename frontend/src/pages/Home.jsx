import { useEffect, useState } from 'react'
import api from '../api/axios'
import { Link } from 'react-router-dom'
import './Home.scss'

function Home() {
  const [motos, setMotos] = useState([])

  useEffect(() => {
    // берём первые несколько мотоциклов для превью на главной
    api.get('/motos/')
      .then(res => setMotos(res.data.slice(0, 4)))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="home">
      <section className="hero container">
        <h1>Найди свой идеальный мотоцикл</h1>
        <p>Каталог, отзывы, сравнение — всё в одном месте</p>
        <Link to="/motos" className="btn">Смотреть каталог</Link>
      </section>

      <section className="container">
        <h2>Популярные модели</h2>
        <div className="moto-grid">
          {motos.map(moto => (
            <div key={moto.id} className="moto-preview">
              <img src={moto.image} alt={moto.model} />
              <h3>{moto.brand_name} {moto.model}</h3>
              <p>{moto.price.toLocaleString()} $</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home