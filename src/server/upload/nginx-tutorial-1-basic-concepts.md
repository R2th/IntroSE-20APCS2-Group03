Chào các bạn!

Mình xin giới thiệu đến các bạn turorial về nginx cơ bản. Tutorial này có ba phần với nội dung như sau:

**Khái niệm cơ bản**: nhận biết sự khác biệt giữa directive và context, mô hình thừa kế và thứ tự nginx chọn server blocks và locations.

**Hiệu suất**: Phần này sẽ hướng dẫn bạn một số mẹo và thủ thuật cải thiện tốc độ. Chúng ta sẽ nói về gzip, caching, buffers và thời gian chờ.

**Thiết lập SSL**: thiết lập cấu hình để phục vụ nội dung qua HTTPS.

## Nginx là gì?
Nginx là một máy chủ web, nó có thể phục vụ dữ liệu của bạn với tốc độ nhanh chóng. Nhưng nginx không chỉ là một máy chủ web. Bạn có thể sử dụng nó như một reverse proxy, giúp tích hợp dễ dàng với các máy chủ  khác như Unicorn hoặc Puma. Bạn có thể phân phối lưu lượng truy cập của mình một cách chính xác (cân bằng tải), truyền phát phương tiện, thay đổi kích thước hình ảnh của bạn một cách nhanh chóng, nội dung bộ đệm và nhiều hơn nữa.

## Install nginx.
Việc cài đặt nginx cũng khá đơn giản và nhiều guide hướng dẫn rất cụ thể nên mình sẽ không để cập đến cách cài nginx ở đây nữa? Nếu bạn nào chưa cài đặt nginx thì có thể làm theo hướng dẫn [tại đây](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)

## Những câu lệnh cơ bản khi làm việc với nginx.
Để start nginx trên hệ thống bạn chạy lệnh sau:
```
sudo nginx
```
Nếu nginx đang chạy trong hệ thống, thì bạn có thể quản lý bằng các lệnh sau;
```
sudo nginx -s stop //shutdown nginx
sudo nginx -s quit // cũng là shutdown nginx nhưng sẽ chờ các worker hoàn thành xong các process đang chạy
sudo nginx -s reload // reload lại file config
sudo nginx -s reopen // mở lại các file log của nginx
```
## Directive and Context
Mặc định file config ngĩn sẽ được tìm thấy theo các đường dẫn dưới đây:
/etc/nginx/nginx.conf,
/usr/local/etc/nginx/nginx.conf,
/usr/local/nginx/conf/nginx.conf
Trong file config này bao gồm:

**directive**: tùy chọn bao gồm tên và tham số và kết thúc bằng dấu chấm phẩy. Ví dụ
```
gzip on;
```
**context**: phần mà bạn có thể khai báo các lệnh (tương tự như scope trong các ngôn ngữ lập trình). Ví dụ
```
worker_processes 2; # directive in global context

http {              # http context
    gzip on;        # directive in http context

  server {          # server context
    listen 80;      # directive in server context
  }
}
```
## Directive types
Khi sử dụng directive, chúng ta phải chú ý khi sử dụng cùng một directive trong nhiều ngữ cảnh, vì mô hình thừa kế khác nhau cho các chỉ thị khác nhau. Có 3 loại chỉ thị, mỗi loại có mô hình thừa kế riêng như sau:
### Normal
Có một giá trị cho mỗi context. Ngoài ra, nó có thể được xác định chỉ một lần trong context. Các hợp đồng phụ có thể ghi đè chỉ thị cha, nhưng ghi đè này sẽ chỉ có hiệu lực trong một văn bản con nhất định. Subcontexts có thể ghi đè lên directive cha, nhưng chỉ có gí trị trong scope context. Ví dụ.
```
gzip on;
gzip off; # Không hợp lệ khi trong cùng một context dùng 2 directive gzip

server {
  location /downloads {
    gzip off; #gzip ở đây sẽ có giá trị là off
  }

  location /assets {
    #  //gzip ở đây sẽ có giá trị là on
  }
```
### Array
Thêm nhiều directive trong cùng một ngữ cảnh sẽ thêm vào các giá trị thay vì ghi đè lên cái đã định nghĩa. Xác định một lệnh trong một subcontext sẽ ghi đè lên các giá trị cha trong  subcontext đã cho.
```
error_log /var/log/nginx/error.log;
error_log /var/log/nginx/error_notive.log notice;
error_log /var/log/nginx/error_debug.log debug;

server {
  location /downloads {
    # ở context này sẽ ghi đè lên các directive error_log của parent
    error_log /var/log/nginx/error_downloads.log;
  }
}
```
### Action directive
Action directive là  directive thay đổi mọi thứ. Hành vi thừa kế của Action directive  sẽ phụ thuộc vào mô-đun. Ví dụ, trong trường hợp lệnh rewrite, mọi directive khớp sẽ được thực thi. Ví dụ
```
server {
  rewrite ^ /foobar;

  location /foobar {
    rewrite ^ /foo;
    rewrite ^ /bar;
  }
}
```
Nếu use fetch path /sample thì:

=> Directive rewrite ^ /foobar được thực thi sẽ rewrite /sample thành /foobar

=> Bây giờ path khớp với  location /foobar

=> Directive rewrite ^ /foo  được thực thi sẽ rewrite /foobar thành /foo

=> Directive rewrite ^ /bar  được thực thi sẽ rewrite /foo thành /bar
## Processing requests
Trong nginx, chúng ta có thể chỉ định nhiều virtual server, mỗi virtual server được mô tả bởi một context server { }
```
server {
  listen      *:80 default_server;
  server_name netguru.co;

  return 200 "Hello from netguru.co";
}

server {
  listen      *:80;
  server_name foo.co;

  return 200 "Hello from foo.co";
}

server {
  listen      *:81;
  server_name bar.co;

  return 200 "Hello from bar.co";
}
```
Với file config như trên, đầu tiên Nginx kiểm tra chỉ thị listen của virtual server để xem virtual server lắng nge ở port nào, tiếp theo sẽ kiểm tra server_name directive từ host header của request.
Nginx sẽ chọn virtual server theo thứ tự ưu tiên như sau:
1. Server lắng nge trên IP:port với một chị thị server_name phù hợp.
2.  Server lắng nge trên IP:port với cờ default_server.
3.  Server lắng nge trên IP:port(cái đầu tiên được định nghĩa)
4.  Nếu không math với bất cứ virtual server  nào thì sẽ từ chối connect. 

Trong ví dụ trên thì 
```
Request to foo.co:80     => "Hello from foo.co"
Request to www.foo.co:80 => "Hello from netguru.co"
Request to bar.co:80     => "Hello from netguru.co"
Request to bar.co:81     => "Hello from bar.co"
Request to foo.co:81     => "Hello from bar.co"
```
### server_name directive
Lệnh server_name chấp nhận nhiều giá trị. Nó cũng cho phép kết hợp với wildcard và biểu thức chính quy. Ví dụ
```
server_name netguru.co www.netguru.co; # exact match
server_name *.netguru.co;              # wildcard matching
server_name netguru.*;                 # wildcard matching
server_name  ~^[0-9]*\.netguru\.co$;   # regexp matching
```
Khi định nghĩa không rõ thì nginx sẽ ưu tiên theo thứ tự sau:
1. server_name chính xác.
2. Tên ký tự đại diện dài nhất bắt đầu bằng dấu hoa thị, ví dụ: * .example.org
3. Tên ký tự đại diện dài nhất kết thúc bằng dấu hoa thị, ví dụ: "mail.*"
4. Biểu thức chính quy đầu tiên
### listen directive
Phần lớn listen directive được sử dụng như sau:
```
listen 127.0.0.1:80;
listen 127.0.0.1;    # by default port :80 is used

listen *:81;
listen 81;           # by default all ips are used

listen [::]:80;      # IPv6 addresses
listen [::1];        # IPv6 addresses
```

Tuy nhiên, cũng có thể chỉ định các socket UNIX-domain:
```
listen unix:/var/run/nginx.sock;
```
Chúng ta cũng có thể sử dụng hostname
```
listen localhost:80;
listen netguru.co:80;
```
### Minimal configuration
Với những thông tin ở trên, bây giờ chúng ta có thể tạo một file config như sau:
```
# /etc/nginx/nginx.conf

events {}                   # event context needs to be defined to consider config valid

http {
 server {
    listen 80;
    server_name  netguru.co  www.netguru.co  *.netguru.co;

    return 200 "Hello";
  }
}
```

## root, location directives
### root directive
root directive cho phép nginx ánh xạ yêu cầu đến vào hệ thống tệp.
```
server {
  listen 80;
  server_name netguru.co;
  root /var/www/netguru.co;
}
```
config trên cho phép nginx return nội dung cho request
```
netguru.co:80/index.html     # returns /var/www/netguru.com/index.html
netguru.co:80/foo/index.html # returns /var/www/netguru.com/foo/index.html
```
### location directive
location directive tùy thuộc vào URI được yêu cầu.
> location [modifier] path

```
location /foo {
  # ...
}
```

Nếu không chỉ định modifier cụ thể thì path được xem là tiền tố, mọi ký tự có thể theo sau. Ở ví dụ trên sẽ khớp với
```
/foo
/fooo
/foo123
/foo/bar/index.html
...
```

Nhiều location directives có thể được sử dụng trong cùng một context:
```
server {
  listen 80;
  server_name netguru.co;
  root /var/www/netguru.co;

  location / {
    return 200 "root";
  }

  location /foo {
    return 200 "foo";
  }
}
```

```
netguru.co:80   /       # => "root"
netguru.co:80   /foo    # => "foo"
netguru.co:80   /foo123 # => "foo"
netguru.co:80   /bar    # => "root"
```

Trên đây mình giới thiệu đến các bạn những hiểu biết cơ bản về nginx để có thể setup một virtual servers đơn giản. 
Thân chào cả nhà!!!!