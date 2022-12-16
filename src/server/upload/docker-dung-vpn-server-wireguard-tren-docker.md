![](https://images.viblo.asia/6a1cb3b6-24ee-4d16-966b-2698609af758.png)

Trong bài viết hôm nay mình chia sẻ các bạn cách tạo máy chủ VPN riêng của bạn với **WireGuard** chạy trên **Docker**.
# 1. Tổng quan
**[WireGuard](https://www.wireguard.com/)** là giải pháp VPN miễn phí, mã nguồn mở được phát triển nhằm thay thế giải pháp **IPSec**. **WireGuard** được phát triển như là module của Kernel với mục tiêu kế thừa các tính năng sẵn có của **Kernel Linux**, từ đó tối ưu hiệu năng giải pháp.
Hiện nay giải pháp **WireGuard** đang dần trở nên phổ biến. Và đặc biệt hơn, **WireGuard** đã chính thức được phát hành cùng Kernel version 5.6 vào tháng 3 năm 2020, tức tất cả phiên bản, [distro Linux](https://vi.wikipedia.org/wiki/B%E1%BA%A3n_ph%C3%A2n_ph%E1%BB%91i_Linux) sử dụng Kernel từ verion 5.6 trở đi sẽ có sẵn giải pháp **WireGuard**.

**WireGuard** sử dụng các giao thức mã hóa và các thuật toán để bảo vệ dữ liệu. Ban đầu, **WireGuard** được phát triển dành cho **Linux**. Hiện nay, nó đã phổ biến trên **Windows, macOS, BSD, iOS và Android**.

# 2.Cài đặt Wireguard  
Trong trường bài chia sẻ này mình sử dụng **Ubuntu 20.04 LTS** và các bản phân phối khác tương tự.

**Server VPN WireGuard**:
> OS: Ubuntu 20.04 LTS
> 
> Cấu hình: 2 CPU / 2 GB RAM / 20 GB Disk
> 
> IP: 123.123.123.123 (IP Public – eth0)

**Client**: Window hoặc Mobile App Android
  ## 2.1.Cài đặt Docker và Docker-Compose

```
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo usermod -aG docker $USER
newgrp docker
```
## 2.2.Tạo một docker-compose file

Đầu tiên, các bạn tạo một thư mục **/opt/wireguard-server** và file **docker-compose.yaml** mới trong thư mục này.
```
mkdir /opt/wireguard-server
```
```
vim /opt/wireguard-server/docker-compose.yaml
```

```
version: "2.1"
services:
 wireguard:
  image: linuxserver/wireguard
  container_name: wireguard
  cap_add:
   - NET_ADMIN
   - SYS_MODULE
  environment:
   - PUID=1000
   - PGID=1000
   - TZ=Aisa/Ho_Chi_Minh
   - SERVERURL=wireguard.domain.com #optional
   - SERVERPORT=51820 #optional
   - PEERS=1 #optional
   - PEERDNS=auto #optional
   - INTERNAL_SUBNET=10.10.100.0 #optional
  volumes:
   - /opt/wireguard-server/config:/config
   - /lib/modules:/lib/modules
  ports:
   - 51820:51820/udp
  sysctls:
   - net.ipv4.conf.all.src_valid_mark=1
  restart: unless-stopped
```
## 2.3.Thiết lập WireGuard Server
Chúng ta khởi động bằng command sau:
```
cd /opt/wireguard-server
docker-compose up -d
```
## 2.4.Kết nối đến client
Tất cả file config được lưu trữ tại **/opt/wireguard-server/config**. Chúng ta cần copy file **peer1/peer1.conf** cho client và đổi tên thành **wg0.conf** để kết nối với server. 

Nếu muốn kết nối với QR code chúng ta dùng command sau để in command lên terminal.
```
docker exec -it wireguard /app/show-peer <peer-number>
```
## 2.5.Thêm nhiều config cho client
Trong file docker-compose ta điều chỉnh lại thông số  **PEERS=2** và restart lại container
```
docker-compose up -d --force-recreate
```
Vậy là xong! Bạn đã có 1 VPN cho riêng mình rồi, vượt qua những tháng ngày “cá mập cắn cáp” 😅😅😅  
 Chúc bạn cài đặt thành công!
{@embed: https://www.youtube.com/watch?v=8BE6u8JGUK4}