Hôm nay là một bài viết hướng dẫn cách cấu hình HTTPS wildcard với Let's Encrypt nhé. Đảm bảo dễ hiểu và chính xác luôn.

Trước mình đã thực hiện cấu hình HTTPS cho vài project, có tìm hiểu kha khá trên google. Làm xong thấy chạy được, web hiện xanh nên tưởng ok rồi. Ngờ đâu 3 tháng sau chứng chỉ hết hạn, vào xem thì thấy job renew bị fail. Nguyên nhân do generate chứng chỉ với mode `--manual` nên không auto renew được (cũng có cách cơ mà phức tạp lắm).

https://eff-certbot.readthedocs.io/en/stable/using.html#manual

Kinh nghiệm rút ra là nên lên trang chủ Certbot đọc thì tốt hơn. Các bài viết mình xem qua một là outdated, hai là hướng dẫn không chính xác (dùng mode `--manual` mà lại có job renew mới hay). Có thể trước đây chạy được, nhưng khi mình làm thì không. Nên nay mình ngoi lên viết bài chia sẻ lại cho mọi người đây.

# 1. Giới thiệu vài thứ

## 1.1. HTTPS & SSL

Các bạn web dev hẳn không lạ gì với HTTPS và SSL nữa. Và mình cũng không muốn nhắc thêm ở đây (vì bài này khá dài), nên mình để lại link tham khảo cho bạn nào chưa biết nhé.

https://www.cloudflare.com/learning/ssl/what-is-https/

https://www.cloudflare.com/learning/ssl/what-is-ssl/

Cơ bản thì SSL (hoặc TLS) là một lớp bảo mật, còn HTTPS là kết hợp của giao thức HTTP và SSL, giúp mã hóa dữ liệu truyền đi. Phần này các bạn cũng tìm hiểu thêm nhé, mình không rành nên không dám chém nhiều.

Domain muốn có HTTPS thì cần một chứng chỉ SSL phù hợp.

## 1.2. SSL wildcard

Với chứng chỉ SSL bình thường, chỉ có thể active cho một domain gốc (ví dụ `example.com`). Những subdomain của nó (như `blog.example.com`) thì không dùng được chứng chỉ này (trình duyệt không trust).

Với mỗi subdomain phải tạo chứng chỉ riêng, sẽ rất phiền nếu bạn có nhiều subdomain.

![image.png](https://images.viblo.asia/34bb9a4d-9377-4e60-bbc9-b1da04c8eb54.png)

Thay vào đó hãy dùng chứng chỉ SSL wildcard. Chứng chỉ wildcard dạng `*.example.com` áp dụng được cho mọi subdomain. Trong bài mình sẽ hướng dẫn cách cấu hình loại chứng chỉ này nhé.

## 1.3. Let's Encrypt & Certbot

Let's Encrypt là SSL provider miễn phí và siêu phổ biến rồi, mình cũng không nhắc lại nhiều. Thay vì mua chứng chỉ từ các nhà cung cấp có phí như Comodo, Symantec,... thì tại sao không chọn Let's Encrypt vì nó free 😂

Tuy nhiên, chứng chỉ Let's Encrypt chỉ có thời hạn 3 tháng, sau đó cần gia hạn (renew) lại. Nhưng đừng lo, việc này có thể thực hiện tự động bằng cronjob dễ dàng.

Còn Certbot, đơn giản đây chỉ là một tool dùng lấy chứng chỉ Let's Encrypt cho bạn thôi.

https://certbot.eff.org/

# 2. Chuẩn bị

## 2.1. Cài Certbot

Trước mình cài Certbot, tham khảo một số trang thì hướng dẫn đủ cách, như add key, clone repository,... khá là phức tạp. Có trang hướng dẫn dùng `certbot-auto` thì mình nói luôn đây là version cũ nhé, nên dùng cách khác mới hơn. Với mình thì chỉ cần chạy lệnh sau là được (trên Ubuntu, với các distro khác bạn google thêm nhé).

```bash
sudo apt install certbot
```

Ngoài ra trên trang chủ Certbot có hướng dẫn dùng snap, thấy cũng khá ok.

## 2.2. Cài DNS plugin

Certbot có một số plugin hỗ trợ các DNS provider tương ứng (Google Domains, DigitalOcean,...). Plugin sẽ làm vai trò xác thực bạn sở hữu domain đó, khi bạn tạo chứng chỉ hoặc khi gia hạn chứng chỉ đã có.

https://eff-certbot.readthedocs.io/en/stable/using.html#dns-plugins

Trong bài mình chọn DigitalOcean nhé, vì phần xác thực của nó đơn giản nhất (và mình đã làm qua rồi nên chắc chắn hơn).

```bash
sudo apt install python3-certbot-dns-digitalocean
```

Với các plugin khác bạn tìm tên package tương ứng trên Google nhé (đúng ra trong link trên nên có phần cài đặt, cơ mà không có đâu).

## 2.3. Đổi DNS nameserver

Bạn có thể đặt câu hỏi, nhỡ mình không mua domain ở DigitalOcean thì sao. Đừng lo, lúc đầu mình cũng nghĩ là không được, nhưng rồi được anh leader chỉ cho vài đường.

> Đơn giản chỉ cần vô trang quản lý domain, tìm phần sửa DNS nameserver, rồi trỏ nameserver về DigitalOcean là được.
> 
> Lúc này DigitalOcean sẽ trở thành DNS provider cho domain rồi.

Nhưng trước đó, bạn cần tài khoản DigitalOcean trước. Sau đó vào trang quản lý, góc trên bên phải chọn thêm domain như hình và nhập domain vào là được.

![image.png](https://images.viblo.asia/03a07faa-38eb-4b49-b06f-a1e7aef5edb7.png)

Xong bước này, đảm bảo domain chưa có ai đăng kí từ trước trên DigitalOcean. Sau đó mới qua trang quản lý domain cũ đổi DNS nameserver. Ví dụ domain của mình trước mua ở Google Domains thì làm như sau.

![image.png](https://images.viblo.asia/4a9893c0-4a58-499e-832c-956cbd1be73d.png)

Trỏ về hai địa chỉ `ns1.digitalocean.com` với `ns2.digitalocean.com` là được. Thường sẽ đợi tầm 15 phút để update (với mình là vậy).

# 3. Thực hiện cấu hình

## 3.1. Tạo credentials file

Bước đầu tiên bạn cần tạo file credentials chứa token của DigitalOcean. Plugin Certbot sẽ dựa vào file này để xác thực bạn là chủ sở hữu tài khoản DigitalOcean và domain.

Trong trang quản lý của DigitalOcean, chọn như hình để generate Personal access token mới. Ở bước này cần chú ý 2 điều:

- Cấp cả hai quyền Read và Write
- Thời gian hết hạn đặt là No expiry (không hết hạn)

Xong xuôi bạn copy token lại và qua bước tiếp theo.

![image.png](https://images.viblo.asia/4f037aa2-0b9b-4a89-b731-477f872e4578.png)

Thực hiện SSH lên server, ở đây mình dùng VPS. Chạy lệnh sau để tạo file credentials mới.

```bash
nano ~/certbot-creds.ini
```

Và paste token đã copy vào theo cấu trúc sau.

```ini
# Thay token đã copy vào dấu ba chấm
dns_digitalocean_token = ...
```

Lưu file lại và chạy lệnh sau để giới hạn permission chỉ cho tài khoản của bạn.

```bash
sudo chmod 600 ~/certbot-creds.ini
```

## 3.2. Generate chứng chỉ

Chạy Certbot với các option như sau, mình viết thành nhiều dòng cho dễ đọc, nếu bạn không biết cách gõ nhiều dòng trong terminal thì cứ gõ chung một dòng thôi nhé.

```bash
# Thay thế domain của bạn cho phù hợp
sudo certbot certonly
    -d tonghoangvu.dev
    -d *.tonghoangvu.dev
    --dns-digitalocean
    --dns-digitalocean-credentials ~/certbot-creds.ini
```

Lệnh trên sẽ tạo chứng chỉ chung cho cả domain gốc `tonghoangvu.dev` và wildcard `*.tonghoangvu.dev`, khá tiện với mình. Và lệnh trên cũng chỉ định dùng DNS plugin nào và file credentials phù hợp để xác thực.

Hình dưới là toàn bộ log ở bước này. Lần đầu chạy Certbot sẽ hỏi email của bạn (để thông báo khi chứng chỉ sắp hết hạn) và vài câu yes/no, cứ chọn như bình thường thôi.

![image.png](https://images.viblo.asia/6ee4771f-957b-485d-acf4-5a30dcac32c1.png)

Do câu lệnh trên mình dùng mode `certonly`, nên chỉ generate 2 file `fullchain.pem` và `privkey.pem`. Do mình thích tự cấu hình thủ công với 2 file này hơn, ngoài ra Certbot cũng có thể tự động setup chứng chỉ cho bạn luôn.

![image.png](https://images.viblo.asia/62aebdfb-cf09-40d7-be72-1171af394a99.png)

Ví dụ đây là cấu hình Nginx cho một static web của mình. Nginx làm reverse proxy, nên chỉ cần cấu hình HTTPS cho Nginx thôi, các service phía sau không cần cấu hình nữa.

![image.png](https://images.viblo.asia/3c8590fc-244d-4b21-945f-2a9580401e84.png)

## 3.3. Cấu hình redirect sang HTTPS

Khi cấu hình HTTPS thường phải cấu hình thêm cho việc chuyển hướng (redirect) từ HTTP sang HTTPS. Với các domain `.dev`, `.app` thì sẽ tự động redirect bởi trình duyệt, còn những tên miền khác thì không. Bạn cần thực hiện cấu hình Nginx thủ công trong những trường hợp này.

Cách làm chỉ cần bắt các request với tên miền và port 80, return về mã 301 và URL mới (HTTPS).

![image.png](https://images.viblo.asia/8a0a2523-ad65-40ea-9f70-a275f40fde58.png)

Cấu hình HTTPS cho một static web và redirect của mình.

## 3.4. Cấu hình auto renew

Trước hết test thử xem renew có bị lỗi gì không. Chạy lệnh renew với flag `--dry-run` để mô phỏng lại việc renew (không tác động gì tới hệ thống thật). Còn lúc chạy job thì bỏ `--dry-run` ra là được.

```bash
sudo certbot renew --dry-run
```

Kết quả hiện như hình là thành công, không có lỗi gì nhé. Tuy nhiên, nên chạy dry run sau khi đổi nameserver một thời gian (vài tiếng), chạy ngay lập tức thì DNS chưa kịp update nên sẽ không thành công.

![image.png](https://images.viblo.asia/61f0f233-32d1-462f-83e2-4241826ca515.png)

Cuối cùng là thiết lập cronjob chạy lệnh renew liên tục thôi, khoảng 2 lần một ngày. Certbot sẽ tự check chứng chỉ gần hết hạn thì mới renew, còn không thì bỏ qua, nên bạn cũng đừng lo việc thay chứng chỉ liên tục sẽ ảnh hưởng đến hệ thống.

```bash
sudo crontab -e
```

![image.png](https://images.viblo.asia/4f4fc3c3-bf95-45c2-b97e-ea4597767098.png)

File crontab mở ra sẽ gồm nhiều dòng, mỗi dòng là một cron expression (mô tả lúc nào chạy) và câu lệnh thực hiện. Như trong hình, mình chạy job lúc 1h và 13h mỗi ngày, và xuất log ra file  `/var/log/letsencrypt/renew.log` (khi bị lỗi thì tiện xem lại hơn).

![image.png](https://images.viblo.asia/b017f4e5-4b33-44fe-b86e-c025bd01a1e1.png)

---

Okay bài hôm nay đến đây thôi. Thực sự đây là bài viết dài nhất của mình, tốn cả mấy buổi mới viết xong. Hi vọng bạn nào đọc được bài này, làm theo và thành công hãy cho mình một upvote hoặc share nhé. Cảm ơn mọi người nhiều 😍