# Mở đầu
Trong khi thực hiện dự án, việc enable https là cần thiết  để thực hiện 1 số chức năng cached, sw,
web camera, ...nên nay mình giới thiệu 2 cách để thực hiện.  Cách làm của mình đứng dưới góc nhìn của
1 dev frontend (ReactJS) nên cách làm còn chưa tốt, có bạn có gì góp ý mình thêm

# Bắt tay thực hiện: Có 2 cách
## 1> Https với create-react-app:
#### a> khởi tạo dự án:
Khởi tạo dự án mới và chạy với câu lệnh đơn giản:
```shell
npx create-react-app my-app
cd my-app
npm start
```
Ta được kết quả như sau:
![](https://images.viblo.asia/e04f929c-e379-47db-9e71-8f448325f5c9.JPG)


### b> enable https:
 Để enable https thì ta có thể vào file package.json và sửa lại:
- window cmd
```shell
set HTTPS=true&&npm start
```
- Windows (Powershell)
```shell
($env:HTTPS = "true") -and (npm start)
```

- Linux, macOS (Bash)
```shell
HTTPS=true npm start
```
Riêng với linux thì ta có thể cấu hình custom https:
```shell
HTTPS=true SSL_CRT_FILE=cert.crt SSL_KEY_FILE=cert.key npm start
```
(bạn có thể tạo crt bằng openssl:
```shell
openssl req \
-newkey rsa:2048 -nodes -keyout domain.key \
-out domain.csr
```
)

====> kết quả: trên trình duyệt vào địa chỉ https://localhost
- Trên linux hoặc ubuntu bạn sẽ thấy nó sẽ bị warning do lỗi https
không hợp lệ
  
- Trên window thì tớ thử đôi lúc cứ bị lỗi:
![](https://images.viblo.asia/3abd922e-c0b4-4c9f-86e7-6239a43abc0d.JPG)

  
 
====> Nhược điểm của cách này:
- Vẫn bị đỏ https: Có 1 cách để khỏi đỏ https là import https tuy nhiên cách này
tớ giờ thử lại đã không hiệu quả, cách này nhược điểm nữa là chỉ áp
dụng cho Chrome và chỉ 1 máy duy nhất đó
- Chỉ áp dụng với create-react-app khi dev, run production là thua (??)

## 2> Enbable với bất kỳ dự án frontend nào:
Cách này đại loại là tớ sẽ dùng nginx kết hợp cấu hình file .host. Chi tiết như sau:

- Bước 1: cài đặt nginx:
 
 Window: http://nginx.org/en/download.html
 
Linux:  Theo link này nha bạn: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04

- Bước 2: đăng ký 1 ssl, ví dụ tớ đăng ký với domain là testviblo.com
- Bước 3:
  Vào thư mục nginx tạo thêm 2 folder: cert/cert.crt cert/private.key để chứa cert và key ssl
- Bước 4: vào thư mục nginx tìm file nginx.conf  (ví dụ trên MacOs: /usr/local/etc/nginx/nginx.conf) cấu hình:

```json
.... (đoạn này bạn đừng đổi)
server {
  listen 443 ssl;
  ssl_certificate cert/cert.crt;
  ssl_certificate_key cert/private.key;
  server_name localhost;

  location / {
  proxy_pass          http://localhost:5000;
}

}
```

Sau đó bạn dùng lệnh để khởi động lại nginx:
```shell
sudo nginx -s stop
sudo nginx
```

- Bước 5:
Vào file host: thêm dòng sau : 127.0.0.1 testviblo.com

===> Kết quả:  giờ bạn vàohttps://testviblo.com sẽ được enalbe https trên bất kỳ trình duyệt
nào trên máy  kể cả IE

===> Tình huống mở rộng:
- QA muốn test qua ip: trên máy QA chỉ cần cấu hình ở bước 5 là được(với ip là ip của máy bạn)
- Nếu mà có nhiều member trong team => tạo ra n subserver dựa trên nginx
bạn thêm giống bước 4 chỉ khác ở nameserver lúc này

```json
server_name teddy.testviblo.me; // Change here
```

- Test trên máy android đời thấp: cái này mình phải cấu hình domain 1 chút, dài dòng nên mình update sau vậy thì bài
dài rồi (chủ yếu không work 1 số dòng cũ nên không dám chém@@!)
 
 
# Kết luận:
Trên đây là 2 cách mình đang dùng,các bạn có gì góp ý thì comment nhé. Mình sẽ update bài viết nếu có gì mới ,Cảm ơn các bạn nhiều 

PS: có 1 số hình minh họa mình sẽ upload sau nhé 


### Tài liệu tham khảo
- React create app:
  https://create-react-app.dev/docs/using-https-in-development/
  
- nginx: https://www.nginx.com/