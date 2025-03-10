# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем файлы package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем файл .env в контейнер
COPY .env ./

# Копируем папку prisma в контейнер
COPY prisma ./prisma

# Генерируем Prisma Client
RUN npx prisma generate

# Копируем остальные файлы приложения в контейнер
COPY . .

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "start:dev"]