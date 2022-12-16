![image.png](https://images.viblo.asia/cb4cbc55-efa3-4b9f-8cf5-c6ab7b5f6409.png)

Trong bài viết này mình sẽ hướng dẫn các bạn cách sử dụng Docker để deploy một website có SSL (tức là https) rất đơn giản. Ví dụ kết quả:

![image.png](https://images.viblo.asia/dd320a22-3c63-40ae-9a22-8d68746b100d.png)

## Các bước chuẩn bị

* Có một VPS/Server có thể SSH vào được (hoặc xem [hướng dẫn tạo Droplet Digital Ocean](https://200lab.io/blog/digital-ocean-huong-dan-tao-droplet/)).
* Sở hữu một domain cá nhân. Bạn có thể mua tại [Namecheap.com](https://www.namecheap.com/). À nhớ trỏ domain vào IP public của VPS/Server nhé.
* Vì dùng Docker nên bạn cần hiểu một chút Docker nhé. Xem thêm [Docker là gì? Tại sao lại cần nó?](https://200lab.io/blog/docker-la-gi-khi-nao-nen-dung-docker/)

Để chuẩn bị thì mình đã tạo 1 domain: demo.viettranx.com trỏ vào Droplet IP.

## Cài đặt Docker trên VPS/Server

Do bài trước mình đã hướng dẫn các bạn tạo VPS Ubuntu nên bài này mình đi tiếp cho tiện nhé. Hãy chắc rằng bạn đã SSH vào được VPS với lệnh:

```
ssh root@your_domain
```

![image.png](https://images.viblo.asia/54e3c442-8cdc-4200-90e8-292fdc514bab.png)

Thực thi tiếp các câu lệnh sau:

```
sudo apt-get update

sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Xem chi tiết tai document cài đặt Docker cho từng OS tại đây: https://docs.docker.com/engine/install/ubuntu/

> Rất có khả năng các bạn sẽ gặp lỗi liên quan tới containerd.io.

![image.png](https://images.viblo.asia/dcd365e0-38b9-42f8-aaf5-21a89e6f1441.png)

Nếu vậy các bạn chạy tiếp các câu sau:

```
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic test"

sudo apt update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Nếu mọi thứ đã ngon lành, các bạn thử với lệnh: `docker -v` và thấy version Docker in ra là ngon lành.

## Run lần lượt các container cần thiết

### Container Nginx

```
docker run -d -p 80:80 -p 443:443 --name nginx-proxy  --privileged=true \
  -e ENABLE_IPV6=true \
  -v ~/nginx/vhost.d:/etc/nginx/vhost.d \
  -v ~/nginx-certs:/etc/nginx/certs:ro \
  -v ~/nginx-conf:/etc/nginx/conf.d \
  -v ~/nginx-logs:/var/log/nginx \
  -v /usr/share/nginx/html \
  -v /var/run/docker.sock:/tmp/docker.sock:ro \
  jwilder/nginx-proxy
```

Nginx mục đích để chúng ta có một reverse proxy, chịu trách nhiệm điều hướng các request từ ngoài vào đúng các service. Đương nhiên Nginx sẽ còn nhiều chức năng khác, tuy nhiên trong giới hạn bài viết này mình chỉ cần nó cho mục đích đơn giản vậy thôi.

Xem thêm các tham số cấu hình container jwilder/nginx-proxy: [https://github.com/nginx-proxy/nginx-proxy](https://github.com/nginx-proxy/nginx-proxy)

Bản chất container này là automated Nginx. Tức là nó sẽ tự động thiết lập cho toàn bộ các container khi có có các biến môi trường phù hợp. Phần tiếp theo sẽ cho các bạn thấy rõ điều đó.

### Container web service

Nhân vật chính mà chúng ta cần deploy đây rồi. Để đơn giản mình sẽ dùng lại Image yeasy/simple-web:

```
docker run -it -d --name simple-web \
  -e VIRTUAL_HOST="demo.viettranx.com" \
  -e VIRTUAL_PORT=80 \
  yeasy/simple-web
```

Trong đó có 2 ENV cần lưu ý:

* VIRTUAL_HOST: Domain của bạn (ở đây mình dùng demo.viettranx.com)
* VIRTUAL_PORT: PORT kết nối vào webservice.

Cả 2 ENV này đều không phải bản thân container yeasy/simple-web. Chúng là của container jwilder/nginx-proxy. Nói đơn giản là nginx container này sẽ theo dõi tất cả container run lên nếu có 2 ENV đó là nó tự phát sinh config phù hợp và reload Nginx. Bình thường chúng ta phải làm bằng tay, quá tuyệt.

> Bạn có thể dùng với bất kỳ một service container nào cũng được nhé!!

Kết quả bạn mở trình duyệt và chạy url: http://demo.viettranx.com

![image.png](https://images.viblo.asia/c5e3def9-3de6-4c4d-b6b0-2f8996ad8b32.png)

### Cấu hình SSL – Hoàn toàn miễn phí

Tới đây các bạn đã có được một website chạy trên chính doamin của bạn. Tuy nhiên nó là http thôi, không có mã hoá đường truyền. Vì thế trước URL trên trình duyệt sẽ có “Not Secure“.

Điều này khiến website bạn có độ tin cậy kém, đặc biệt là những chỗ login hoặc thanh toán là người dùng sẽ e dè ngay. Thêm vào đó website bạn sẽ khó mà tương tác được với các nền tảng dùng https.

OK. Để dùng được https, bạn có thể mua một SSL xịn hẳn hoi, loại basic cũng cỡ 4$/năm thôi. Tuy nhiên có một giải pháp nữa là dùng SSL FREE từ Let’s Encrypt.

```
docker run -d --privileged=true \
  -v ~/nginx/vhost.d:/etc/nginx/vhost.d \
  -v ~/nginx-certs:/etc/nginx/certs:rw \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --volumes-from nginx-proxy \
  jrcs/letsencrypt-nginx-proxy-companion
```

Khoan nha, chưa effect gì đâu, các bạn cần gỡ container web ra và chạy lại với lệnh sau

```
docker rm -f simple-web

docker run -it -d --name simple-web \
  -e VIRTUAL_HOST="demo.viettranx.com" \
  -e VIRTUAL_PORT=80 \
  -e LETSENCRYPT_HOST="demo.viettranx.com" \
  -e LETSENCRYPT_EMAIL="blog@demo.viettranx.com" \
  yeasy/simple-web
```

Đợi tầm 60s, các bạn truy cập web với URL: https://demo.viettranx.com

![image.png](https://images.viblo.asia/bad2ba8d-1bbc-41db-9b06-4807121c27ea.png)

Chuyện gì vừa xảy ra vậy!!

Bản chất container jrcs/letsencrypt-nginx-proxy-companion cũng tự động theo dõi các container, nó phối hợp cùng container nginx trước đó để có thể cung cấp SSL Let’s Encrypt. Miễn là container có chứa ENV:

* LETSENCRYPT_HOST: Domain của bạn (ở đây mình dùng demo.viettranx.com)
* LETSENCRYPT_EMAIL: Email bạn muốn dùng để đăng ký SSL, không cần là một email thật nhé.

Không những cấp SSL Let’s Encrypt, container này còn tự động check và gian hạn cho chúng ta luôn. Hạn sử dụng của SSL này là 90 ngày thôi. Hồi đó mình cứ phải canh để chạy câu lệnh gia hạn hoặc set cron job nhưng giờ thì hết rồi. Quá tiện lợi đúng không?!

Xem thêm các cấu hình khác tại:

https://github.com/JrCs/docker-nginx-proxy-letsencrypt

## Kết

Bài viết này nhằm giúp các bạn có được một service bất kỳ run với Docker để có được Nginx làm reverse proxy và SSL FREE với Let’s Encrypt đơn giản nhất. Những yếu tố nặng nề kỹ thuật hoặc cơ chế vận hành mình xin được bỏ qua. Chúc các bạn deploy được các service của mình nhanh chóng và hiệu quả hơn với phương pháp này nhé.

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/docker-nginx-lets-encrypt-web-service-ssl/)