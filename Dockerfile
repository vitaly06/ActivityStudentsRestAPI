# Этап сборки (builder)
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Копируем только файлы, необходимые для установки зависимостей
COPY package*.json ./
COPY prisma ./prisma

# Устанавливаем зависимости с учетом peerDependencies
RUN npm ci --legacy-peer-deps && \
    npx prisma generate

# Копируем все остальные файлы
COPY . .

# Билдим приложение
RUN npm run build

# Этап production
FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Копируем только необходимые файлы из builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/.env ./

# Устанавливаем только production зависимости с тем же флагом
RUN npm prune --production --legacy-peer-deps

# Открываем порт приложения
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "start:prod"]