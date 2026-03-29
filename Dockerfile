# Stage 1: Build
FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production runner
FROM node:20-alpine AS runner

RUN apk add --no-cache python3 make g++ \
  && addgroup -S appgroup \
  && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

COPY --from=builder /app/src/lib/schema.sql ./src/lib/schema.sql
COPY --from=builder /app/scripts/seed-db.js ./scripts/seed-db.js

COPY --from=builder /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3
COPY --from=builder /app/node_modules/bindings ./node_modules/bindings
COPY --from=builder /app/node_modules/file-uri-to-path ./node_modules/file-uri-to-path
COPY --from=builder /app/node_modules/bcryptjs ./node_modules/bcryptjs

RUN mkdir -p /app/data && chown -R appuser:appgroup /app/data

USER appuser
EXPOSE 3000

ENV NODE_ENV=production
ENV DATABASE_PATH=/app/data/database.sqlite
ENV SCHEMA_PATH=/app/src/lib/schema.sql
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

CMD ["node", "server.js"]
