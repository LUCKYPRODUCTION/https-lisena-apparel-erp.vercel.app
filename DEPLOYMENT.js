# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: lisena
      POSTGRES_USER: lisena
      POSTGRES_PASSWORD: lisena123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  web:
    build: ./apps/web
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - api
    environment:
      DATABASE_URL: "postgresql://lisena:lisena123@postgres:5432/lisena"

  api:
    build: ./apps/api
    ports:
      - "3001:3001"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: "postgresql://lisena:lisena123@postgres:5432/lisena"

volumes:
  postgres_data:
