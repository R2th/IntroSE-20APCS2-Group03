Đại dịch Covid19 bùng phát kéo theo dãn cách xã hội, các ứng dụng về hội họp trực tuyến trở nên hot hơn bao giờ hết. Ta có thể kể đến các ông lớn như Google Hangout, Zoom, Skype...
Ở bài viết này mình sẽ hướng dẫn các bạn xây dựng và triển khai hệ thống họp trực tuyến với Jitsi. 
OK. Let's start!!!
## Giới thiệu về Jitsi 
Jitsi là một tập hợp các dự án nguồn mở về video conference, an toàn,dễ sử dụng và dễ dàng làm chủ.
Mình vẽ sơ đồ cơ bản nhất về Jitsi để các bạn dễ hình dung nhé.
```
                   +                           +
                   |                           |
                   |                           |
                   v                           |
                  443                          |
               +-------+                       |
               |       |                       |
               | Nginx |                       |
               |       |                       |
               +--+-+--+                       |
                  | |                          |
+------------+    | |    +--------------+      |
|            |    | |    |              |      |
| jitsi-meet +<---+ +--->+ prosody/xmpp |      |
|            |files 5280 |              |      |
+------------+           +--------------+      v
                     5222,5347^    ^5347   4443,10000
                +--------+    |    |    +-------------+
                |        |    |    |    |             |
                | jicofo +----^    ^----+ videobridge |
                |        |              |             |
                +--------+              +-------------+
```
# Install Jitsi Meet
Trước hết bạn cần chuẩn bị 1 domain. Ví dụ : `meet.example.org`
## Thêm kho lưu trữ gói Jitsi
```
curl https://download.jitsi.org/jitsi-key.gpg.key | sudo sh -c 'gpg --dearmor > /usr/share/keyrings/jitsi-keyring.gpg'
echo 'deb [signed-by=/usr/share/keyrings/jitsi-keyring.gpg] https://download.jitsi.org stable/' | sudo tee /etc/apt/sources.list.d/jitsi-stable.list > /dev/null

# update all package sources
sudo apt update
```
## Cài đặt cấu hình firewall
Các cổng sau cần được mở trong tường lửa của bạn, để cho phép lưu lượng truy cập đến máy chủ Jitsi Meet:
* 80 TCP - config http
* 443 TCP - config https 
* 4443 TCP - để truyền video/audio dự phòng (ví dụ: khi UDP bị chặn)
* 10000 UDP - để truyền video/audio
* 22 TCP - alow ssh

Ở đây mình sử dụng `ufw`  nhé
```
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 4443/tcp
sudo ufw allow 10000/udp
sudo ufw allow 22/tcp
sudo ufw enable
```
Lệnh để kiểm tra trạng thái của firewall
`sudo ufw status verbose`

## install
**Note: Bạn sẽ cần cài đặt Nginx trước **

 `sudo apt install nginx`

**Tiếp theo là lệnh cài đặt jitsi-meet**

```
# jitsi-meet installation
sudo apt install jitsi-meet
```

**Sau 1 loạt các lệnh chạy màn hình của bạn sẽ hiển thị ô để nhập domain. Ở đây mình nhập domain mà mình đã chuẩn bị từ trước**

**TLS Certificate**
Để có thể truyền hình ảnh và audio, bạn cần có [TLS Certificate](https://en.wikipedia.org/wiki/Transport_Layer_Security)
Trong quá trình cài đặt Jitsi Meet, có các option cho bạn:
* **Generate a new self-signed certificate** 
* **I want to use my own certificate**

> Jitsi *recommend* chúng ta chọn **Generate a new self-signed certificate** và  tạo Lets-Encrypt Certificate sau đó. Tuy nhiên nếu bạn có ssl của riêng mình thì bạn có thể chọn **I want to use my own certificate** . Cài đặt sẽ show ra 2 box cho bạn nhập đường dẫn đến  *key* và *crt* của mình

**Tạo Let's Encrypt certificate**

Note: Bước này dành cho những bạn chọn **Generate a new self-signed certificate**

`sudo /usr/share/jitsi-meet/scripts/install-letsencrypt-cert.sh`

## Advanced configuration
`vi /etc/jitsi/videobridge/sip-communicator.properties`

Add nội dung sau vào file trên:
```
org.ice4j.ice.harvest.NAT_HARVESTER_LOCAL_ADDRESS=<Local.IP.Address>
org.ice4j.ice.harvest.NAT_HARVESTER_PUBLIC_ADDRESS=<Public.IP.Address>
```
Restart videobridge: 
```
service jitsi-videobridge2 restart
 ```
> Đến bước này là ta đã hoàn thành việc cài đặt rồi đó!
> Bật trình duyệt và thưởng thức thôi nào.
> Truy cập : `domain của bạn` (ví dụ: `meet.example.org`)  và nhập 1 id bất kỳ, cùng id sẽ vào cùng room nhé :heart_eyes::heart_eyes::heart_eyes::heart_eyes:


##### Note: nếu bạn bị lỗi người thứ 3 connect vào lớp thì tất cả ko nhìn thấy cam và ko nghe dc mic của nhau thì fix như sau:	

```
vi /etc/jitsi/jicofo/sip-communicator.properties	
```

Add nội dung sau vào file trên:	
```
org.jitsi.jicofo.ALWAYS_TRUST_MODE_ENABLED=true
```

Restart jicofo	
```
service jicofo restart
```

# Tham khảo
https://jitsi.github.io/handbook/docs/intro