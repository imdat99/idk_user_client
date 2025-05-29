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
FROM nginx:alpine AS production

# Copy built files từ builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config (tùy chọn)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]