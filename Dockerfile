# Multi-stage Dockerfile for Next.js
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production --no-audit --no-fund

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# ensure public contains root static files so Next serves them
RUN mkdir -p public \
  && cp -a index.html buch.html meditationen.html gedanken.html shop.html public/ 2>/dev/null || true \
  && cp -a styles.css public/ 2>/dev/null || true \
  && cp -a assets public/ 2>/dev/null || true
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm","run","start"]
