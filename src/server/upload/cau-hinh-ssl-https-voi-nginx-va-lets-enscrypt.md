Bạn vừa mua domain Toidicafe.vn ở Tenten giá 5 lít và trỏ nó về server của Vultr. Trên server này, bạn dùng nginx bắt các requests và forward đến port 6900, nơi có một Node.js process đang để render website của bạn. Khi truy cập vào website từ trình duyệt thì xuất hiện cảnh báo bảo mật, bạn sẽ phải làm gì ? 
Trong bài này, ta sẽ cấu hình HTTPS cho web với Nginx và Let's Enscrypt để khắc phục tình trạng trên nhé!
# Tại sao phải HTTPS?
Bỏ qua phần thiết lập trên Tenten và Vultr. Chúng ta chỉ cần quan tâm tầng máy chủ web trở xuống. File cấu hình nginx của domain là /etc/nginx/sites-enabled/toidicafe, lúc này đại khái trông như sau:
```
server {

  listen 80;

  server_name toidicafe.vn;

  location / {
    proxy_pass http://127.0.0.1:6900;
    # other stuff
  }

}
```
Như vậy người dùng sẽ truy cập vào website của bạn theo đường dẫn http://toidicafe.vn.
![](https://images.viblo.asia/98487f09-3e7d-4952-a8cf-c61600935ea2.png)

Lúc này mọi dữ liệu trao đổi giữa máy khách với máy chủ của bạn đi qua giao thức HTTP và hoàn toàn không được mã hóa.

Để tăng cường bảo mật, giúp người dùng tin tưởng hơn, bạn nên tạo SSL Certificate cho domain toidicafe.vn, sau đó cài đặt nginx tự điều hướng trang web của bạn về https://toidicafe.vn.

Trước kia, muốn mua được SSL Certificate cũng khá tốn kém và đòi hỏi nhiều bước chứng thực. Còn bây giờ, [Let's Enscrypt](https://letsencrypt.org/) đã mang đến cho chúng ta một giải pháp hoàn toàn miễn phí, trình tự thao tác thực hiện cũng rất nhanh chóng, dễ dàng.

Thêm một lý do nữa, việc trang bị HTTPS thay cho HTTP còn có ý nghĩa về mặt thẩm mỹ và nâng cao đẳng cấp cho website của bạn. Web HTTP ngày nay bị xem như thành phần đáng ngờ, những công dân hạng hai trên internet. Chỉ có HTTPS mới được các trình duyệt xem trọng, vừa mở ra đã thấy chiếc khóa và chữ Secure màu xanh đầy cá tính! Có giả thiết cho rằng Google đánh thứ hạng kết quả từ những trang HTTPS cao hơn "tụi HTTP".
![](https://images.viblo.asia/3e4922db-8399-4c3e-9a96-272e59081e5a.png)

Nếu bạn chưa đủ quyết tâm thì vẫn còn 1 lý do quan trọng khác, đó là nếu bạn muốn làm [Progressive Web Apps](https://web.dev/progressive-web-apps/), bạn sẽ phải dùng đến [Service Worker](https://developer.chrome.com/docs/workbox/service-worker-overview/), mà bé chảnh này thì dứt khoát không chơi với HTTP, phải HTTPS mới chịu! Tất cả các loại đồ chơi hiện đại based trên Service Worker, như [Workbox](https://developers.google.com/web/tools/workbox/), [UpUp](https://www.talater.com/upup/)... đều đòi hỏi HTTPS.

Vậy thì làm thôi!

# Yêu cầu kỹ thuật
* Ubuntu server 16.04 trở lên
* nginx v1.9.x hoặc mới hơn

# Các bước thực hiện
## 1. Cài đặt certbot
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt update
sudo apt install certbot
```
Trong quá trình cài đặt, chương trình có thể sẽ yêu cầu lựa chọn các thông số, bạn cần theo dõi để đưa ra option phù hợp:
![](https://images.viblo.asia/f30a9f12-ac69-4535-8378-0d02c0be71be.png)

Sau khi hoàn tất, trên máy sẽ có thêm 1 lệnh letsencrypt. Bạn thử kiểm tra lại bằng cách gõ letsencrypt --version. Đây là phần client của dịch vụ Let's Enscrypt.
## 2. Point domain tới 1 web tạm
Tạo SSL certificate cho toidicafe.vn thực chất là sử dụng phần client của Let's Enscrypt - lệnh letsencrypt - để tương tác với phần server của nó. Hầu hết tiến trình diễn ra tự động. Chúng ta chỉ cần hiểu sơ sơ rằng, máy chủ Let's Enscrypt sẽ gửi request đến http://toidicafe.vn để làm vài chuyện gì đó riêng nó biết!

Cho nên tạm thời chúng ta tạo 1 web tĩnh, trỏ toidicafe.vn vào đó.
```
mkdir /var/www/html
touch /var/www/html/index.html
mkdir /var/www/html/.well-known
```

Bạn có thể thêm nội dung cho file **index.html**.

Thư mục **.well-known** là nơi Let's Enscrypt sẽ thử access. Bây giờ chúng ta cấu hình lại nginx để từ bên ngoài có thể truy cập đến http://toidicafe.vn/index.html và http://toidicafe.vn/.well-known. Mở lại file cấu hình nginx phía trên, sửa lại thành:
```
server{

  listen 80;

  server_name toidicafe.vn www.toidicafe.vn;
  root /var/www/html;

  index index.htm index.html;

  charset utf-8;

  location / {
    try_files $uri $uri/ =404;
  }
  location ~ /.well-known {
     allow all;
  }
}
```
Load lại thiết lập nginx:
```
sudo service nginx reload
```

Nếu mọi thứ chính xác, reload lại trang http://toidicafe.vn, chúng ta sẽ nhận được nội dung **index.htm**

Chú ý ở nơi quản lý domain bạn cần phải thêm CNAME để cấu hình www.toidicafe.vn như alias của toidicafe.vn, đâu đó như bên dưới:

| Type | Hostname | Value | TTL |
| -------- | -------- | -------- | -------- |
| CNAME     | www.toidicafe.vn     | toidicafe.vn     | 3600 |
| A | toidicafe.vn | 149.28.23.xxx | 3600 |

Nếu không, ở bước sau letsencrypt sẽ báo lỗi.

## 3. Tạo SSL Certificate files
Với lệnh như dưới:
```
sudo letsencrypt certonly -a webroot \
  -w /var/www/html/ \
  -d toidicafe.vn -d www.toidicafe.vn
```
Nếu thành công, letsencrypt sẽ hiển thị kết quả và chúc mừng:
![](https://images.viblo.asia/d61b010c-1e7e-49a7-b086-5a32a56fda29.png)

Kể từ tháng 1 năm 2018, Let's Enscrypt đã chính thức hỗ trợ wildcard. Điều này có nghĩa là bạn chỉ cần generate SSH key 1 lần và dùng cho mọi subdomain có dạng *.toidicafe.vn.

Để làm điều này, bạn cần:
* cấu hình * .toidicafe.vn như alias của toidicafe.vn
* phiên bản **cerbot** từ 0.22 trở về sau. Kiểm tra phiên bản cerbot với lệnh **cerbot --version**

Câu lệnh tạo SSH key cho cả subdomain sẽ hơi khác một chút:
```
sudo certbot certonly  --server https://acme-v02.api.letsencrypt.org/directory \
  --manual --preferred-challenges dns \
   -d toidicafe.vn -d *.toidicafe.vn
```

Với các câu hỏi, đọc kỹ trước khi Enter. Thường yêu cầu trả lời "Yes" mới cho đi tiếp.

Let's Enscrypt sẽ yêu tạo ra các TXT field trên domain. Làm theo hướng dẫn là được:
```
Please deploy a DNS TXT record under the name
_acme-challenge.toidicafe.vn with the following value:

Rs1-6mHlkFqN_GyazftvFBpZD4Ti8rZpUMbF-9Ap6yY

Before continuing, verify the record is deployed.
```

Bây giờ letsencrypt đã generate ra các key cho bạn, lưu trong **/etc/letsencrypt/**.

Kiểm tra với lệnh **ls**:
```
sudo ls -l  /etc/letsencrypt/live/toidicafe.vn
```

Kết quả hiển thị:
![](https://images.viblo.asia/5048e220-dbb9-48e9-9bac-4685c2c347a4.png)

Chúng ta sẽ tạo một [snippet của nginx](https://wiki.meurisse.org/wiki/Nginx#snippets) tên là **ssl-toidicafe.vn.conf** và đưa các khóa này vào để dễ quản lý:
```
sudo nano /etc/nginx/snippets/ssl-toidicafe.vn.conf
```

Copy & paste:
```
ssl_certificate /etc/letsencrypt/live/toidicafe.vn/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/toidicafe.vn/privkey.pem;
```

Save file lại.
## 4. Tham số Diffie-Hellman
[Diffie-Hellman parameters](https://wiki.openssl.org/index.php/Diffie-Hellman_parameters) định nghĩa cách thức OpenSSL xử lý tác vụ [trao đổi khóa Diffie–Hellman](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) giữa máy khách và máy chủ. Tham số này đóng vai trò quan trọng trong việc đánh giá chất lượng SSL.

Để generate ra bộ tham số Diffie-Hellman mới cho server, chúng ta chạy lệnh:
```
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```

Lệnh này chạy mất vài phút:
![](https://images.viblo.asia/ebba3fd4-3884-474c-8059-28fe40d7a62d.png)

Chúng ta sẽ đưa khóa trong file **/etc/ssl/certs/dhparam.pem** này vào một snippet khác của nginx:
```
sudo nano /etc/nginx/snippets/ssl-params.conf
```

Dán vào nội dung sau:
```
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
ssl_ecdh_curve secp384r1;
ssl_session_cache shared:SSL:10m;
ssl_session_tickets off;
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;

ssl_dhparam /etc/ssl/certs/dhparam.pem;
```

Save lại.
## 5. Cấu hình nginx lần nữa
Mọi thứ đã gần như hoàn tất, chúng ta đã có SSL certificate, bộ khóa Diffie-Hellman mới. Cả 2 đều đã chuẩn bị sẵn dưới dạng 2 snippets cho nginx.

Trở lại file cấu hình nginx của domain toidicafe.vn. Vừa nãy chúng ta đã sửa nó để điều hướng về trang HTML tĩnh. Bây giờ mới là cấu hình về cổng Node.js process, kèm theo HTTPS.
```
sudo nano /etc/nginx/sites-enabled/toidicafe
```
Nhập vào nội dung sau:
```
server {

  listen 443 ssl http2;
  listen [::]:443 ssl http2;

  server_name toidicafe.vn;

  charset utf-8;

  include snippets/ssl-toidicafe.vn.conf;
  include snippets/ssl-params.conf;

  location / {
    proxy_pass http://127.0.0.1:6900;
    proxy_read_timeout 300;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_cache_bypass $http_upgrade;
  }
}
```
Chỉ có 2 điểm khác biệt với file cấu hình đầu tiên. Đó là chúng ta thiết lập lắng nghe ở cổng 443 và chèn 2 snippets ở trên để nginx đọc được.

Reload lại cấu hình nginx:
```
sudo service nginx reload
```
Xong, bây giờ chúng ta đã có thể truy cập bằng giao thức HTTPS:
![](https://images.viblo.asia/71877569-aa32-4080-802d-6bd3ec1e2481.png)

## 6. Thêm tự điều hướng
Lúc này trang web hỗ trợ cả 2 giao thức HTTP và HTTPS. Lại thêm 2 biến thể có www. nữa, thành ra tổng cộng 4 đường dẫn:
* http://toidicafe.vn
* https://toidicafe.vn
* http://www.toidicafe.vn
* https://www.toidicafe.vn
* 
* Theo kinh nghiệm của tôi, chúng ta nên chọn https://toidicafe.vn làm đường dẫn chính, mấy cái còn lại thì tự động redirect về đó.

Để làm điều này, chỉ việc mở file cấu hình domain ra, thêm vào một đoạn ở đầu file, trở thành:
```
server {
  listen 80;
  listen [::]:80;
  server_name toidicafe.vn www.toidicafe.vn;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443;
  listen [::]:443;

  include snippets/ssl-toidicafe.vn.conf;
  include snippets/ssl-params.conf;

  server_name www.toidicafe.vn;
  return 301 https://toidicafe.vn$request_uri;
}

server {

  listen 443 ssl http2;
  listen [::]:443 ssl http2;

  server_name toidicafe.vn;

  charset utf-8;

  include snippets/ssl-toidicafe.vn.conf;
  include snippets/ssl-params.conf;

  location / {
    proxy_pass http://127.0.0.1:6900;
    proxy_read_timeout 300;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_cache_bypass $http_upgrade;
  }
}
```
Reload nginx một lần nữa để nhận kết quả mong muốn.

## 7. Kiểm tra chất lượng
Để đánh giá chất lượng SSL/TLS của website, các bạn có thể dùng [công cụ phân tích của SSLLabs](https://www.ssllabs.com/ssltest/analyze.html).

Đây là kết quả cho toidicafe.vn:
![](https://images.viblo.asia/e8b00dc9-4b24-4207-9a09-8b6942710e54.png)

Sở dĩ được xếp hạng A phần lớn nhờ bước tạo tham số Diffie-Hellman. Các website không cập nhật giá trị này thường chỉ dừng lại ở hạng B.
# Hạn chế của Let's Enscrypt
* Chưa hỗ trợ Extended Validation, nên không nhúng tên thương hiệu vào được. Chỉ có chữ "Secure".
* 3 tháng hết hạn, phải nhớ chạy lệnh renew hoặc cài đặt cronjob tự động.


Chúc các bạn chơi vui vẻ. Có gì thiếu sót vui lòng bổ sung thêm bên dưới :)