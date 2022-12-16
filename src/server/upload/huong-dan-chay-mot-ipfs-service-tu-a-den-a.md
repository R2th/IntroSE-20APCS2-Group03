Trend NFT đang ngày càng phát triển kèm theo đó là nhu cầu lưu trữ các asset như ảnh, video, âm thanh,... ngày càng cao . Một giải pháp được ưa chuộm đó là sử dụng **ipfs** và để có thể đọc các file lưu trữ trên ipfs chúng ta thao tác thông qua **Gateway** .  Bài viết này mình sẽ trình bày cách setup một server ipfs gateway .

# IPFS in nutshell
Chúng ta sẽ điểm lại một chút các khái niệm của ipfs
## You’re a Client. And a Server
Mỗi máy tính chạy IPFS đều hoạt động vừa là client và vừa là server. Một cách dễ hiểu hơn thì, mỗi node chạy IPFS có thể cung cấp dữ liệu cho bất kỳ node nào khác trong mạng ( như một server ) và cũng có thể request nội dung từ bất kỳ node ipfs khác trong mạng ( như client). Vì vậy, nếu bạn chạy IPFS trên máy của mình và tải một ảnh lên mạng IPFS, thì bất kỳ ai khác trên thế giới cũng đang chạy IPFS có thể xem và tải ảnh đó xuống.

## Content Identifiers
Mỗi file được upload lên IPFS sẽ có một địa chỉ duy nhất nó được tạo ra từ việc hash nội dung của file . Địa chỉ này được gọi CID ( Content Identifier ) . IPFS hiện nay sử dụng SHA-256 và output được endcoded bằng Base58 . CID sẽ có dạng : 

`QmTnio7ALfodWncSgkuovvKdfe2TUu6NkhEKkyV2scBrQF`

## Upload lên IPFS
IPFS về cơ bản là một Distributed Hash Table ( DHT ) Bảng này được phân tán vì không node nào trong mạng chứa toàn bộ , thay vào đó mỗi node sẽ chứa một tập hợp con của hash table cũng như thông tin về những node nào đang lưu trữ các phần có liên quan.  

Khi chúng ta tải dữ liệu lên IPFS sẽ có thông báo cho network là có một số dữ liệu mới được tải lên sau đó thêm vào CID ánh xạ đến IP của node vào DHT. Vì thế nếu ai muốn tải dữ liệu đó xuống thì thì sẽ tra cứu bằng CID sau đó tìm IP của node chứa dữ liệu và tải dữ liệu xuống trực tiếp từ IP đó .

Nhiều người có thể upload cùng một file lên các node khác nhau CID sẽ khoogn đổi nên nếu bất cứ node nào trong số những node này offline hoặc ngừng lưu trữ thì những node còn lại vẫn có thể đáp ứng được .
# IPFS Gateway 
Hiện tại thì Cloudflare's read-only Gateway đã được host ở `https://cloudflare-ipfs.com/ipfs/` mọi người chỉ việc thêm với **ipfshash** là có thể truy vấn được như `https://cloudflare-ipfs.com/ipfs/QmPvnfdbJiCfoPJwd4M4491Uc4w8C6DPHpGsB4LqPXQqSR` . Tuy nhiên bài viết này sẽ đi sâu hơn không chỉ là đọc dữ liệu từ trên mạng ipfs thông qua gateway .

## Setting up a Server
Việc tự dựng một node IPFS sẽ thì dữ liệu và tính khả dụng của dữ liệu bản thân upload lên sẽ tốt hơn .
### Prerequisites
Máy chủ Linux , VPS từ một nhà cung cấp như DigitalOcean hoặc một thiết bị nào đó như NUC hoặc Raspberry Pi chạy trên mạng gia đình của bạn thì nó vẫn sẽ hoạt động nhé.
Yêu cầu tối thiểu được đề xuất: - 2 gigabyte RAM - 10 gigabyte dung lượng đĩa - 1 terabyte băng thông mỗi tháng .
Vì IPFS chạy trên **Go 1.12.0 hoặc mới hơn** vì thế hãy chắc chắn bạn cài đúng ipfs version trước nhé . 

## Cài đặt IPFS
Đầu tiên sẽ cần phải install IPFS daemon . Vì làm việc với server nên sẽ cài cli cho nhanh thay vì dùng bản IPFS Destop . Các bạn có thể tham khảo việc download trên các hệ điệu hành khác nhau tại [đây](https://docs.ipfs.io/install/command-line/#system-requirements) . Hoặc có thể tham khảo [IPFS Releases](https://github.com/ipfs/go-ipfs/releases) để chọn version ipfs phù hợp. Bài viết này mình sẽ demo chạy trên Linux

1. Đầu tiên download Linux binary from `dist.ipfs.io` 
```sh
wget https://dist.ipfs.io/go-ipfs/v0.8.0/go-ipfs_v0.8.0_linux-amd64.tar.gz
```
2. Unzip file :
```sh
tar -xvzf go-ipfs_v0.8.0_linux-amd64.tar.gz
```
3. vào go-ipfs folder và chạy script
```sh
cd go-ipfs
sudo bash install.sh
```
4.  Test xem Ipfs đã được intall đúng chưa :
```sh
ipfs --version

> ipfs version 0.8.0
```
## Adding the Service
**systemd** là bộ phần mềm đi được tích hợp trong hầu hết các phiên bản của Linux, nó cho phép người dùng tạo và quản lý các dịch vụ nền ( backgroud services ). Các dịch vụ này được khởi động run khi máy chủ khởi động và sẽ khởi động lại nếu chúng bị lỗi và lưu logs đầu của chúng vào đĩa. 

Để thực hiện việc này, chúng tôi tạo một tệp đơn vị tại **/etc/systemd/system/ipfs.service** với nội dung:
```
[Unit]
Description=IPFS Daemon

[Service]
ExecStart=/usr/local/bin/ipfs daemon
User=root
Restart=always
LimitNOFILE=10240

[Install]
WantedBy=multi-user.target
```
Thay đổi dòng "**User = root**" nếu bạn không chạy daemon dưới dạng root . Sau đó chạy 
```sh
sudo systemctl daemon-reload
sudo systemctl enable ipfs
sudo systemctl start ipfs
```
### Notes on systemd
- Xem các thông tin về daemon IPFS chạy :
```
systemctl status ipfs
```
- Stop the daemon :
```
systemctl systemctl stop ipfs
```
- Start the daemon :
```
systemctl start ipfs
```
- Xem tất cả các logs từ daemon :
```
journalctl -u ipfs
```
- Xem logs mới nhất :
```
journalctl -f -u ipfs
```

## Config
**IPFS được config hình thông file json, được đặt mặc định tại `~/.ipfs/config`.** Có rất nhiều mục cần config ví dụ như Datastore của node ipfs hay  số lượng peer connect

Ví dụ :
```
{
  "Peering": {
    "Peers": [
      {
        "ID": "QmPeerID1",
        "Addrs": ["/ip4/18.1.1.1/tcp/4001"]
      },
      {
        "ID": "QmPeerID2",
        "Addrs": ["/ip4/18.1.1.2/tcp/4001", "/ip4/18.1.1.2/udp/4001/quic"]
      }
    ]
  }
  ...
}
```

### NGINX

Chúng ta cần config Addresses gateway trước khi config nginx

```
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8080
```

Để public gateway thông qua domain ra ngoài chúng ta cần config một chút , cũng khá giống việc chúng ta config server bình thường thôi .

Đầu tiên tạo file ở `/etc/nginx/sites-avaiable`  ví dụ tạo file **ipfs-gateway** :
```
server {
        listen 80;
        server_name your.domain;

        access_log /var/log/nginx/ipfs.access.log;
        error_log /var/log/nginx/ipfs.error.log;

        location / {
                proxy_pass http://0.0.0.0:8080/;
        }
}
```
Tiếp tục chúng ta sẽ tạo symblic link đến **sites-enabled**
```
sudo ln -s  ./ipfs-gateway ../sites-enabled
```

Sau đó test thử xem đúng cú pháp của nginx chưa : 

```
sudo nginx -t
```

Và sau đó restart nginx 

```
sudo systemctl restart  nginx
```

## Reference :
- https://developers.cloudflare.com/distributed-web/ipfs-gateway/browsing-ipfs
- https://medium.com/@cvcassano/protecting-an-ipfs-node-with-nginx-reverse-proxy-on-ubuntu-18-04-e56685a10bcc