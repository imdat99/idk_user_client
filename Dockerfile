# Multi-stage build cho RSBuild
FROM node:24-alpine AS builder

# Thiết lập working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock* ./
COPY pnpm-lock.yaml* ./

# Cài đặt dependencies
# Sử dụng npm cache mount để tăng tốc build
RUN --mount=type=cache,target=/root/.npm \
    if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
    else npm ci --only=production; fi

# Copy source code
COPY . .

# Build ứng dụng
RUN npm run build

# Production stage
FROM oven/bun:1.2.21-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/index.bun.ts ./index.bun.ts

EXPOSE 3000

CMD [ "bun", "index.bun.ts" ]