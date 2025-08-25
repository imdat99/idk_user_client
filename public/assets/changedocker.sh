#!/bin/bash

# ===============================
# Script đổi thư mục data Docker
# ===============================

NEW_DOCKER_DIR="$1"

if [ -z "$NEW_DOCKER_DIR" ]; then
    echo "❌ Vui lòng cung cấp đường dẫn mới cho Docker data."
    echo "👉 Cách dùng: sudo ./change-docker-data.sh /duong/dan/moi"
    exit 1
fi

echo "📁 Tạo thư mục mới: $NEW_DOCKER_DIR"
sudo mkdir -p "$NEW_DOCKER_DIR"
sudo chown -R root:root "$NEW_DOCKER_DIR"

echo "🛑 Dừng Docker..."
sudo systemctl stop docker

if [ -d "/var/lib/docker" ]; then
    echo "📦 Đang sao chép dữ liệu cũ sang $NEW_DOCKER_DIR..."
    sudo rsync -aP /var/lib/docker/ "$NEW_DOCKER_DIR/"
fi

echo "⚙️ Cấu hình Docker với thư mục mới..."
sudo tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "data-root": "$NEW_DOCKER_DIR"
}
EOF

echo "🚀 Khởi động lại Docker..."
sudo systemctl daemon-reload
sudo systemctl start docker

echo "✅ Hoàn tất! Thư mục Docker mới là:"
docker info | grep "Docker Root Dir"
