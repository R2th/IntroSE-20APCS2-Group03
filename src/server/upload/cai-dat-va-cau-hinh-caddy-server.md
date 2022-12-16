# Mở đầu
Bạn đã quá quen thuộc với các web server truyền thống như: Nginx, Apache, … Mình nghĩ bạn nên thử qua  caddyserver. Bạn sẽ không còn lo lắng, mệt mỏi khi phải đi tìm đọc tài liệu, tìm kiếm thông cài đặt cấu hình để hệ thống hoạt động một cách trơn tru. Mà thay vào đó, bạn chỉ việc dành 1 phút để tạo và config server chỉ với một vài dòng code để hệ thống server bắt đầu chạy. Nó cực kỳ đơn giản, và các tài liệu sáng sủa dễ hiểu thì có thể trong tương lai gần nó sẽ là đối thủ của nginx.

![](https://caddyserver.com/resources/images/moving-parts.svg)

# Giới thiệu
Caddy là một nền tảng web server mạnh mẽ, được viết bằng Go  là 1 open-source và đang được cộng đồng phát triển rất mạnh mẽ.  Nó hướng tới HTTP/2.0 và mặc định sử dụng HTTPS. Ngoài ra còn là một lựa chọn tuyệt vời cho: load balancing, cổng api, ingress controller, process supervisor, task scheduler.

# Cài đặt 
Bạn có thể tải trực tiếp từ github sử dụng curl:
```
$ curl -OL "https://github.com/caddyserver/caddy/releases/latest/download/ASSET"
```

Sử dụng wget: 
```
$ wget "https://github.com/caddyserver/caddy/releases/latest/download/ASSET"
```

### Cài đặt cho Debian, Ubuntu, Raspbian

```
echo "deb [trusted=yes] https://apt.fury.io/caddy/ /" \
    | sudo tee -a /etc/apt/sources.list.d/caddy-fury.list
sudo apt update
sudo apt install caddy
```
### Cài đặt cho Fedora, RedHat, CentOS
Fedora or RHEL/CentOS 8:
```
dnf install 'dnf-command(copr)'
dnf copr enable @caddy/caddy
dnf install caddy
```
RHEL/CentOS 7:
```
yum install yum-plugin-copr
yum copr enable @caddy/caddy
yum install caddy
```
### Cài đặt cho macOS
```
brew install caddy
```

Sau khi cài đặt xong bạn có thể kiểm tra xem caddy đã hoạt động chưa bằng lệnh: 
```
caddy version
```
Kiểm tra trạng thái của caddy:
```
systemctl status caddy
```
Bạn có thể dừng caddy với lệnh :
```
sudo systemctl stop caddy
```
Để nhận các thay đổi trong file config bạn có thể chạy lệnh: 
```
sudo systemctl reload caddy
```

> Lưu ý : Không dừng service khi thay đổi config. Dừng service sẽ dẫn đến  downtime hệ thông.  thay vào đó hãy sử dụng lệnh reload để thay thế.

# Cấu hình
Caddy cung cấp cho chúng ta 2 cách cấu hình với JSON file và Caddyfile:

## Với Jsonfile

Đầu tiên chúng ta tạo 1 file json với nội dung sau: 
```json
{
	"apps": {
		"http": {
			"servers": {
				"example": {
					"listen": [":2015"],
					"routes": [
						{
							"handle": [{
								"handler": "static_response",
								"body": "Hello, world!"
							}]
						}
					]
				}
			}
		}
	}
}

```

Để apply file này chúng ta cần sử dụng 1 api của candy:

```
curl localhost:2019/load \
	-X POST \
	-H "Content-Type: application/json" \
	-d @caddy.json
```

Để kiểm tra xem chúng ta đã cấu hình thành công hay chưa hãy dùng lệnh: 
```
curl localhost:2015
Hello, world!
```

nếu xuất hiện "Hello, world!" thì chúc mừng bạn đã cấu hình thành công. bạn có thể tham khảo qua JSON document. tại đây. https://caddyserver.com/docs/json/

### với Caddyfile
Để cấu hình với caddyfile bạn cần tạo một file với tên là Caddyfile 
Để chạy được ứng dụng "Helllo world" như trên thì với Caddyfile thì hoàn toàn đơn giản như sau: 
```
localhost
tls internal
respond "Hello, world!"
```
Như file cấu hình trên có dòng localhost đây là tên domain bạn cần cấu hình. Ngoài ra, để cấu hình https cho Caddy Server bạn có thể cấu hình nhanh chóng bằng cách sử dụng config tls internal, Caddy sẽ sử dụng tệp chứng chỉ cục bộ cho trang web này.

# Ứng dụng

Giả sử một ứng dụng web của chúng ta có frontend được xây dựng với nuxtjs và được chạy ở cổng 3000. và api backend laravel chạy ở cổng 8000. vậy  làm thế nào để forward vào ứng dụng này với Caddy. Rất đơn giản các bạn tạo 1 file Caddyfile với lệnh sau:
```
localhost
tls internal
reverse_proxy localhost:3000
route /api/* {
    uri strip_prefix /api
    reverse_proxy localhost:9000
```

vậu là chúng ta đã cấu hình xong ứng dụng rồi với:
Client: localhost
Server API: localhost/api/

Trên đây là 2 cách cấu hình phổ biến của caddy. Thử so sánh qua 2 cách cấu hình này nhé. bạn có thể tham khảo trên trang chủ tại đây https://caddyserver.com/docs/getting-started

# So sánh JSON và Caddyfile

So sánh ưu và nhược điểm của json và caddyfile: 

![](https://images.viblo.asia/ed7e0fe9-fb47-494a-81e1-3263580379e3.png)

# Kết luận

Caddy vẫn còn khá mới mẻ. và đang được cộng đồng phát triển tích cực. Có lẽ một ngày không xa nó sẽ trở lên phổ biến. vậy hãy tìm kiểu nó ngay ngày hôm nay nhé các pro.
Chào, Thân ái và quết thắng !!!

Tham khảo : 

https://caddyserver.com/

https://www.marketenterprise.vn/