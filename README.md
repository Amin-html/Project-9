# MotoStore 🏍️

Full-stack платформа продажи мотоциклов с каталогом, отзывами, избранным и сравнением характеристик.

## Стек

**Бэкенд:** Django + Django REST Framework + JWT (SimpleJWT) + PostgreSQL + django-filter
**Фронтенд:** React (Vite) + React Router + Axios + SCSS
**Инфраструктура:** Docker Compose (db + backend + frontend)

## Функционал

- Каталог мотоциклов с фильтрацией по цене, бренду, типу и поиском по модели
- Детальная страница с характеристиками, описанием и отзывами
- Система отзывов и рейтинга (1-5 звёзд)
- Избранное — добавление/удаление мотоциклов
- Сравнение до 3 мотоциклов одновременно с таблицей характеристик
- Профиль пользователя с историей просмотров
- JWT-аутентификация (регистрация, логин)

## Модели

Brand → Motorcycle → UserProfile
                  ↓
               Favorite
               Review (рейтинг 1-5)
               ViewHistory

## API эндпоинты

| Метод | Путь | Описание |
|---|---|---|
| GET | `/api/brands/` | Список брендов |
| GET | `/api/motos/` | Список мотоциклов (`?brand=&type=&q=&min=&max=`) |
| GET | `/api/motos/<id>/` | Детали мотоцикла |
| GET/POST | `/api/reviews/<moto_id>/` | Отзывы |
| GET | `/api/favorites/` | Список избранного |
| POST | `/api/favorites/<id>/` | Добавить/убрать из избранного |
| GET | `/api/profile/` | Профиль |
| GET | `/api/history/` | История просмотров |
| POST | `/api/auth/register/` | Регистрация |
| POST | `/api/auth/login/` | Логин (JWT) |

## Запуск

```bash
docker-compose up --build
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

- Фронтенд: http://localhost:3000
- Бэкенд API: http://localhost:8000/api
- Админка: http://localhost:8000/admin

## Скриншоты

*(добавь сюда 2-3 скрина: главная, каталог, сравнение)*