Hé lâu mọi người, đây là bài viết đầu tiên trong series mình viết về Nginx. 

Nội dung của bài viết này chủ yếu đề cập đến các khái niệm cơ bản dành cho những bạn nhập môn Nginx, các cao nhân có nhiều kinh nghiệm thì có thể bỏ qua bài này, hoặc comment bên dưới nếu mọi người thấy nội dung mình trình bày có vấn đề gì đó không ổn hen.

Series này mình lấy rất nhiều thông tin từ các bài viết của tác giả Mateusz Dobek, các bạn có thể theo dõi và ủng hộ các bài viết của anh ấy ở đây: https://www.netguru.com/blog/author/mateusz-dobek

Giờ thì bắt tay vào công chuyện thôi nào :keyboard: 

## 1. Nginx là gì
Nginx là một máy chủ proxy ngược mã nguồn mở (open source reverse proxy server) sử dụng phổ biến giao thức HTTP, HTTPS, SMTP, POP3 và IMAP.

Nginx thường được chọn để cân bằng tải (load balancer), HTTP cache và máy chủ web (web server). NGINX là một web server mạnh mẽ và sử dụng kiến trúc đơn luồng, hướng sự kiện vì thế nó hiệu quả hơn Apache server nếu được cấu hình chính xác.
Ngoài ra thì bạn có thể sử dụng nó như một reverse proxy dễ dàng tích hợp với các upstream servers chậm hơn(như Unicorn hay Puma)

Ngày càng được ưa chuộng và có mặt trên khắp các máy chủ Linux, Nginx hiện nay được sử dụng bởi 1- 4% tổng số lượng tên miền toàn thế giới, điển hình là Facebook, Microsoft, Google, Apple,…

![nginx-la-gi-01.jpg](https://images.viblo.asia/0ba9a6b8-ced9-4dfb-9427-4e340196184b.jpg)

Kiến trúc cơ bản của nginx bao gồm process chính và những worker của nó. Master processs đọc file config và duy trì tiến trình các worker, còn các worker sẽ thực hiện các tác vụ xử lý request.

## 2. Base command

Để chạy nginx, đơn giản chỉ cần chạy `[sudo] nginx`

Khi instance nginx đang chạy, bạn chỉ cần gõ lệnh sau để quản lý

```

[sudo] nginx -s signal
Available signals:

stop: fast shutdown
quit: graceful shutdown (wait for workers to finish their processes)
reload: reload the configuration file
reopen: reopen the log files
```

Các lệnh này mình đang sử dụng trên Linux nhé

## 3. Directive và Context

Mặc định thì file config của nginx có thể được tìm thấy ở các thư mục sau:
```

/etc/nginx/nginx.conf,
/usr/local/etc/nginx/nginx.conf, or
/usr/local/nginx/conf/nginx.conf
```

Trong file này thì sẽ gồm 2 thành phần chính:
### 3.1. Directive
Option này gồm tên và parameter, kết thúc bằng dấu chấm phẩy. Ví dụ như
`gzip on;`
### 3.2. Context
Đây là phần mà bạn sẽ khai báo các directive(tương tự như scope trong các ngôn ngữ lập trình)

```
worker_processes 2; # directive in global context

http {              # http context
    gzip on;        # directive in http context

  server {          # server context
    listen 80;      # directive in server context
  }
```

## 4. Directive types
Chỗ này bạn phải chú ý tí nè, nhất là khi sử dụng một directive trong nhiều context khác nhau.
Có 3 loại directive, mỗi loại có một mô hình thừa kế khác nhau

### 4.1. Normal

Kiểu này sẽ có một giá trị ở trong mỗi context. Nó sẽ chỉ được define 1 lần duy nhất trong context. 

Các context con có thể overide directive của cha, nhưng directive được overide này chỉ hợp lệ bên trong context con đó mà thôi.

```
gzip on;
gzip off; # illegal to have 2 normal directives in same context

server {
  location /downloads {
    gzip off;
  }

  location /assets {
    # gzip is in here
  }
}
```

### 4.2 Array
Thêm directive vào trong một context thì giá trị sẽ được thêm vào array thay vì overwrite tất cả dữ liệu cũ.
Tuy nhiên, khi define directive ở context con thì sẽ override tất cả giá trị bằng value mới ở trong context con đó 

```
error_log /var/log/nginx/error.log;
error_log /var/log/nginx/error_notice.log notice;
error_log /var/log/nginx/error_debug.log debug;

server {
  location /downloads {
    # this will override all the parent directives
    error_log /var/log/nginx/error_downloads.log;
  }
}
```

### 4.3 Action directive

Khả năng kế thừa của loại này sẽ phụ thuộc vào module
Ví dụ, ở trường hợp  rewrite directive bên dưới, tất cả các directive trùng khớp đều được thực thi

```
server {
  rewrite ^ /foobar;

  location /foobar {
    rewrite ^ /foo;
    rewrite ^ /bar;
  }
}
```

Với return directive thì sẽ giống như tên gọi, giá trị được return ngay lập tức
```
server {
  location / {
    return 200;
    return 404;
  }
}
```

Hẹn gặp lại mọi người ở Part 2, mình sẽ đưa ra một số chú ý về cách xử lý request và config file.

See you later :hugs: