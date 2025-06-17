# Проектна документация

## 🚀 Стартиране на проекта

### Предварителни изисквания
- Docker (версия 20.10.0+)
- Docker Compose (версия 1.29.0+)

### Инсталация
```bash
git clone https://github.com/matmo1/carpartshop.git
cd carpartshop
docker-compose up --build
```
## 🏗️ Структура на проекта

```bash

project-root/
│
├── backend/               # Backend контейнер
│   ├── src/               # Изходен код
│   ├── Dockerfile         # Docker конфигурация
│   └── package.json       # Зависимости (ако е Node.js)
│
├── frontend/              # Frontend контейнер
│   ├── public/            # Статични файлове
│   ├── src/               # Изходен код
│   └── Dockerfile         # Docker конфигурация
│
└── docker-compose.yml     # Комплексна конфигурация
```

## 🛠️ Компоненти

# Backend услуга
    Порт: 8080

    Технологии: Spring boot

# Функционалност:

    Обработка на бизнес логика

    API endpoints

    Връзка с MySQL

# Frontend услуга
    Порт: 3000

    Технологии: React

# Функционалност:

    Потребителски интерфейс

    Комуникация с backend

    Управление на състоянието

## 🐳 Docker команди
Линк към Dockerhub
```bash
https://hub.docker.com/repositories/matmo1

Команда	Описание
docker-compose up	Стартира всички услуги
docker-compose up -d	Стартира в detached режим
docker-compose down	Спира всички услуги
docker-compose logs	Показва логовете
docker-compose build	Пребилдва контейнерите
```