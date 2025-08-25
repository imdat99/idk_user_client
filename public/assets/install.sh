#!/bin/bash

# --- CÀI ĐẶT VÀ ĐĂNG NHẬP TAILSCALE ---
curl -fsSL https://tailscale.com/install.sh | sh \
  && sudo systemctl start tailscaled \
  && sudo tailscale up --login-server=https://headscale.xemdi.app --auth-key=c9893404d9ec1d8ff0b22f6718b8d690bef4c1e1ee74b17d --accept-dns=false \
  && sudo systemctl unmask docker \
  && sudo systemctl unmask docker.service \
  && sudo systemctl unmask docker.socket \
  && sudo systemctl unmask containerd \
  && sudo systemctl unmask containerd.service


#!/bin/bash

# ===============================
# Script đổi thư mục data Docker
# ===============================

NEW_DOCKER_DIR="/home/containerd-data"

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


# --- wait for 10 seconds ---
echo "⏳ Đang chờ Tailscale khởi động..."
sleep 10

sudo systemctl start containerd \
  && sudo systemctl start docker

# --- LẤY TAILSCALE IP ---
TS_IP=$(tailscale ip --4 | head -n 1)

if [ -z "$TS_IP" ]; then
  echo "❌ Không lấy được Tailscale IP. Tailscale có thể chưa chạy hoặc chưa đăng nhập."
  exit 1
fi

echo "✅ Tailscale IP của node này: $TS_IP"

# --- JOIN K3S AGENT ---
echo "🚀 Đang join vào K3s master tại $MASTER_TS_IP..."

curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--node-ip=$TS_IP --flannel-iface=tailscale0 --snapshotter=native agent --docker --data-dir=$NEW_DOCKER_DIR " \
    K3S_URL="https://100.64.0.22:6443" \
    K3S_TOKEN="K10873a4288d1bcb7f7cf430f6ac5daa297616e79a7a4294510269d8fdb899b4158::server:1a3c218411998a684777af59f0cd07e3" \
    sh -

sudo fuser -k 9100/tcp
# --- CÀI ĐẶT METRICS SERVER ---
sudo apt-get install htop -y \
&& htop
