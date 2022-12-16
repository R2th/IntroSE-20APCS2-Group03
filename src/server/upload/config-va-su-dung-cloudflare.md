Hiện nay giao thức HTTPS đang ngày càng được sử dụng rộng rãi vì những ưu điểm về bảo mật mà nó mang lại. Khi phát triển sản phẩm có sử dụng dịch vụ của bên thứ ba, đơn giản nhất là việc hỗ trợ người dùng đăng nhập thông qua mạng xã hộ như Google hay Facebook,
vì lý do bảo mật mà Google hay Facebook có thể sẽ yêu cầu trang web của bạn phải có chứng chỉ SSL. Tuy nhiên để có được một chứng chỉ SSL chúng ta có thể sẽ phải bỏ ra một khoản không hề nhỏ. CloudFlare là một giải pháp tuyệt vời cho vấn đề đó.
## CloudFlare là gì?
CloudFlare đóng vai trò là DNS trung gian, nó sẽ nằm giữa kết nối giữa domain và hosting. Mọi truy cập từ bên ngoài tới website sẽ đi qua CloudFlare trước, sau đó mới được chuyển tới host chứa website. Vì vậy mà bạn có thể yên tâm vì website sẽ được bảo vệ để hạn chế được tấn công DDoS, spam bình luận trên blog và một số phương thức tấn công cơ bản khác.

Có thể bạn sẽ nghĩ việc sử dụng một DNS trung gian sẽ phải đánh đổi với tốc độ của trang web. Nhưng thực tế CloudFlare sẽ lưu một bản bộ nhớ đệm (cache) của website trên máy chủ của CDN của họ và từ đó phân phối cho người dùng truy cập ở gần máy chủ đó nhất nên tốc độ website của bạn còn có thể được tăng lên. Hiện nay CloudFlare cung cấp cả những dịch vụ miễn phí và trả phí, tương ứng với đó là mức độ bảo mật và chất lượng của dịch vụ cũng sẽ khác nhau.

## Cài đặt CloudFlare
Để sử dụng các dịch vụ tuyệt vời của CloudFlare, đầu tiên bạn phải đăng ký một tài khoản tại [đây](https://dash.cloudflare.com/login) . Sau khi hoàn thành một vài thủ tục xác nhận tài khoản thông thường chúng ta sẽ được chuyển đến màn hình [quản lý](https://dash.cloudflare.com) chính của CloudFlare. Tại đây chúng ta sẽ nhập tên miền cần sử dụng dịch vụ và ấn vào `+ Add a Site`

**1. Cài đặt DNS**

Sau khi đăng ký tên miền thành công, chúng ta sẽ chuyển đến màn hình quản lý các dịch vụ được cung cấp cho tên miền đã đăng ký.

![](https://images.viblo.asia/a203f47e-f0c0-4532-8fbb-d8daaa7177c9.png)

Chuyển sang mục DNS sau đó hãy điền đầy đủ các bản ghi DNS trong tên miền của bạn hoặc đơn giản chỉ là IP trỏ đến tên miền, ấn vào nút `Add Record` để hoàn thành.

![](https://images.viblo.asia/c9394e32-ed3b-4158-a988-e05477dd158c.png)

Ứng với một tên miền chúng ta sẽ được cung cấp 2 nameserver

![](https://images.viblo.asia/129630b5-c5de-4f8e-9379-31140f51b3c4.png)

Như đã nói ở trên, CloudFlare là một DNS trung gian, do đó để sử dụng dịch vụ chúng ta phải thay đổi nameserver của nhà cung cấp tên miền bằng nameserver của CloudFlare.

![](https://images.viblo.asia/897a1e50-c42c-4c14-8c9a-e9877c123856.png)

**2. Đăng ký chứng chỉ SSL**

CloudFlare cung cấp 3 loại chứng chỉ SSL cho chúng ta lựa chọn đó là:
- **Flexible SSL:** Đây là loại SSL dễ cài đặt nhất nên cũng được sử dụng nhiều nhất. Chỉ cần hoàn thành xong bước DNS ở trên là gần như chúng ta đã có thể sử dụng dịch vụ này rồi. Tuy nhiên traffic trao đổi giữa Cloudflare và server website sẽ không được mã hóa
- **Full SSL:** Loại này có tính bảo mật cao hơn so với Flexible SSL do traffic trao đổi giữa CloudFlare và server đã được mã hóa. Để sử dụng chúng ta phải cài đặt chứng chỉ SSL lên server nên nhìn chung sẽ phức tạp và khó thực hiện hơn. Trong phạm vi bài viết chúng ta sẽ lựa chọn cài đặt loại chứng chỉ này.
- **Full SSL (Strick):** Đây là một dịch vụ trả phí đi cùng với đó là mức độ bảo mật sẽ cao hơn vì các chứng chỉ SSL phải được xác thực từ các nhà cung cấp chứ không thể dùng chứng chỉ SSL tự tạo hoặc miễn phí như hai loại trên được.

Chuyển sang mục Crypto, tại phần **SSL** chúng ta lựa chọn option Full:

![](https://images.viblo.asia/f45dddb6-d8fc-495d-ac35-24ba99972991.png)

Tại phần **Origin Certificates** chúng ta ấn vào `Create Certificate` để tạo chứng chỉ do CloudFlare cung cấp:

![](https://images.viblo.asia/625aa92c-e287-4f59-b5af-86a1eb0bd79d.png)

Hộp thoại setting sẽ hiện lên và bạn chỉ cần ấn vào `Next`:

![](https://images.viblo.asia/6980a6cb-1079-4e16-8b88-33836eb672f7.png)

Tại đây bạn có thể sẽ gặp một vài thông báo lỗi, đó có thể là do quá trình thay đổi nameserver ở trên chưa hoàn thành nên hãy kiểm tra và thử lại nhé. CloudFlare sẽ tạo cho bạn một `CERTIFICATE` cùng với đó là một `PRIVATE KEY`. Hãy copy và lưu chúng vào một nơi nào đó vì bạn sẽ không thể lấy lại được hai giá trị này.

**3. Bật sử dụng HTTPS**

Tiếp theo, để chuyển toàn bộ các thành phần của website sang sử dụng https chúng ta cần phải bật **On** tại mục **Always Use HTTPS**

![](https://images.viblo.asia/c278ee2d-305f-4a5e-8923-93d7290148a6.png)

## Cài đặt SSL trên server

Sau khi hoàn thành các bước cài đặt trên CloudFlare, bây giờ là lúc chúng ta sẽ sử dụng đến `CERTIFICATE` và `PRIVATE KEY` vừa mới lưu lại từ trước.
Mình sử dụng VPS Ubuntu của AWS, webserver NGINX nên các bước thực hiện hiện sẽ là:

- Tạo file `/home/deploy/.certs/server.pem` lưu nội dung của `CERTIFICATE`
- Tạo file `/home/deploy/.certs/server.key` sẽ lưu nội dung của `PRIVATE KEY`
- Thêm vào config của NGINX
```
server {
  ...
  listen 443;
  ssl on;
  ssl_certificate /home/deploy/.certs/server.pem;
  ssl_certificate_key /home/deploy/.certs/server.key;

  ssl_session_timeout  5m;

  ssl_protocols SSLv2 SSLv3 TLSv1;
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;
 ...
}
```

- Restart lại server tận hưởng thành quả
## Tổng kết
Vừa rồi chúng ta đã từng bước đi cài đặt và sử dụng CloudFlare. Vẫn còn rất nhiều các dịch vụ khác mà CloudFlare cung cấp, các bạn có thể tự tìm hiểu để làm trang web của mình thêm bảo mật, tốc độ và chuyên nghiệp hơn nhé.