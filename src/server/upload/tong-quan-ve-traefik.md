## Lời mở đầu
Chào mọi người! Trong bài viết này, mình sẽ giới thiệu tới bạn đọc cái nhìn tổng quan về Traefik (phiên âm là /ˈtræfɪk/ luôn ha). Mục tiêu của mình là sẽ làm một số bài viết xoay quanh câu chuyện về anh chàng [Traefik](https://traefik.io). Nhưng trước hết, chúng ta cần thiết có một bài mở đầu như này để biết Traefik nó là cái gì và nó sẽ làm được gì cũng như cách thứ hoạt động của nó. Hy vọng sẽ là một bài hữu ích để các bạn bắt đầu với Traefik dễ dàng hơn.

![](https://images.viblo.asia/fce9ff11-3106-42c9-a27a-324e55df6b0c.png)

## Giới thiệu Traefik
Traefik là một Reverse-proxy đời mới, và cũng là load balancer để làm cho việc deploy hệ thống microservice được trở lên dễ dàng hơn. Tích hợp rất nhiều các thành phần infrastructure như Docker, Swarm mode, Kubernetes, Marathon, Consul, Etcd, Rancher, Amazon ECS... Và tính `tự động` là điểm quan trọng nhất trong các config với traefik.

## Traefik sinh ra để làm gì?

### Traefik và Microservices
Chắc hẳn `Microservices architecture` là một cụm từ không mấy xa lạ tại thời điểm công nghệ năm 2018 hiện tại. Đúng theo nghĩa đen, `microservice` nó là một kiểu kiến trúc hệ thống để dựng lên application của chúng ta. Tại đó, application được định nghĩa dưới dạng một tập hợp các services. Mỗi service sẽ đảm nhiệm một phần chức năng trong hệ thống, kết hợp với Docker thì quá là tuyệt vời. Để người dùng truy cập vào hệ thống microservice thì bạn cần một `reverse proxy`. Và `reverse proxy` chính là một trong số các vấn đề mà chúng ta gặp phải trong kiến trúc này. [Traefik](https://traefik.io) sinh ra để giải quyết việc đó.

### Vấn đề với Reverse-proxy
Thông thường, chúng ta cần reverse-proxy để định tuyến tới các service, mapping qua sub-domain hoặc chỉ là một path. Chẳng hạn, `domain.com` là domain chính, hiển thị Web UI của application, `api.domain.com` điều hướng tới api service hay `domain.com/landing-page` định tuyến tới một landing page, etc. Dưới đây là một bức hình minh hoạ từ Traefik, để giúp bạn hiểu hơn những gì mình nói ở trên.

![https://docs.traefik.io/img/architecture.png](https://docs.traefik.io/img/architecture.png)

Vấn đề nảy sinh khi chúng ta phải làm việc với nó thường xuyên, nhiều lần trên ngày. Và công việc định tuyến với reverse-proxy lặp đi lặp lại thật sự nhàm chán. Và câu chuyện định tuyến này trở nên "peace of cake" qua vài dòng config với traefik. Và traefik sẽ generate các routes tương ứng, kết nối các thành phần web-ui, api, landing-page ở trên với thế giới bên ngoài.

Và khi kết hợp với docker thì quá ngon, dù bạn chạy single host, hay multi-host. 

## Cách tính năng
Các bạn có thể tham khảo thêm qua website của traefik. Mình xin phép chỉ liệt kê một số tính năng hiện tại mình đang dùng với traefik.
- Traefik tự động cập nhật cấu hình mà không phải restart
- Hỗ trợ nhiều giải thuật load balancing
- Free HTTPS cho microservice với Let's Encrypt
- Websocket, HTTP/2, GRPC
- Chống quá tải với Circuit breakers
- Lưu access logs (JSON, CLF)
- Fast :D
- Có Rest API cho bạn sử dụng để để update các config.

## Bạn nên biết trước gì?
Bạn nên biết trước phần này để nắm được tổng quan hơn trước khi bắt đầu với Traefik. Theo như mình tìm hiểu thì chúng ta có thể cấu hình cho Traefik qua 3 cách thức:
1. File cấu hình `.toml`
2. Docker API
3. RESTful API

Các cách được sử dụng nhiều là cách 1 và cách 2 (`toml` file + Docker API).

### Toml file
Đây là loại file có đuôi mở rộng là `.toml`. Tương tự như file `.ini`. Cú pháp có dạng: `key = value`. Cú pháp `[key]` để định nghĩa một `table` trong TOML, được sử dụng để định nghĩa một nhóm các config.

Khi làm việc với toml file bạn cần chú ý cơ bản sau:
- TOML phân biệt chữ hoa chữ thường.
- File TOML phải là tài liệu Unicode được mã hóa `UTF-8` hợp lệ.
- Khoảng trắng được TOML hiểu là ký tự `tab (0x09)` hoặc `dấu cách (0x20)`.
- Dòng mới được hiểu là ký tự `LF (0x0A)` hoặc `CRLF (0x0D0A)`.
- Comment đến hết dòng được sử dụng bằng dấu `#`.

VD: Một mẫu ví dụ về cú pháp của TOML

```markdown:toml
# This is a TOML document.

title = "TOML Example"

[owner] # Định nghĩa nhóm owner
name = "Tom Preston-Werner"
dob = 1979-05-27T07:32:00-08:00 # First class dates

[database]
server = "192.168.1.1"
ports = [ 8001, 8001, 8002 ]
connection_max = 5000
enabled = true

[servers]

  # Indentation (tabs and/or spaces) is allowed but not required
  [servers.alpha]
  ip = "10.0.0.1"
  dc = "eqdc10"

  [servers.beta]
  ip = "10.0.0.2"
  dc = "eqdc10"

[clients]
data = [ ["gamma", "delta"], [1, 2] ]

# Line breaks are OK when inside arrays
hosts = [
  "alpha",
  "omega"
]
```

Chi tiết hơn các bạn [xem ở đây](https://github.com/toml-lang/toml).

### Docker API
Các cấu hình của Traefik có thể được define với Docker api qua docker-compose. Sử dụng từ khóa `command`, `labels`. Trong đó, commands cần có `--docker` để khai báo sử dụng docker api cho traefik.

VD:

```yaml
version: '3'

services:
    reverse-proxy:
        image: traefik/traefik:latest
        commands: --api --docker --
        ports:
            - 80:80
            - 443:443
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock
        labels:
            - traefik.enable=true
            - traefik.port=80

```

Xem thêm về Traefik docker [tại đây](https://docs.traefik.io/configuration/backends/docker/).

### RESTful API
Enable rest api bằng cách thêm group rest vào file `.toml`:
```shell:toml
# Enable REST Provider.
[rest]
  # Name of the related entry point
  #
  # Optional
  # Default: "traefik"
  #
  entryPoint = "traefik"
```

Sau đó đơn giản là chúng ta thực hiện gửi các HTTP request tới các api sau:

| Path | Method | Description |
| -------- | -------- | -------- |
| /api/providers/web     | PUT     | provider     |
| /api/providers/rest     | PUT     | provider     |

Chi tiết về RESTful API của Traefik [tại đây](https://docs.traefik.io/configuration/backends/rest/). Chúng ta cùng chuyển sang mục tiếp theo để tìm hiểu về các khái niệm cơ bản của Traefik.

## Khái niệm cơ bản của Traefik

### Entrypoints
Như bạn thấy trong hình minh hoạ về revese-proxy với Traefik ở trên, chúng ta dễ nhận thấy có 2 thành phần mạng:
- Public: Phía bên trái bạn, bao gồm các sub-domain, path mà người sử dụng sẽ thấy, người dùng có thể kết nối, sử dụng các điểm này.
- Private: Phần phía bên phải bạn, gồm mạng nội bộ kết nối giữa các services và Traefik. Hay các backend service nằm trong mạng private này. Mạng này thì người dùng không thể sử dụng trực tiếp được.

Entrypoints là khái niệm ám chỉ các điểm kết nối mạng để Traefik dùng để định tuyến cho revese-proxy, là cánh cổng để kết nối vào mạng public. Hình minh họa cho entrypoint:

![https://docs.traefik.io/img/internal.png](https://docs.traefik.io/img/internal.png)

Mỗi entrypoint đều được bắt buộc gán bí danh, và một public port cho nó. Bí danh bạn và port có thể thiết lập tùy ý. Ngoài ra sẽ có các thuộc tính đi kèm mà Traefik định nghĩa.

Thông thường chúng ta thường đinh nghĩa ít nhất 2 entrypoint cho web gồm:
- HTTP: Run ở port 80. Là điểm kết nối mạng trên giao thức HTTP.
- HTTPS: Run ở port 443. Là điểm kết nối mạng trên giao thức HTTPS. Vì là giao thức HTTPS nên bạn cần định nghĩa thêm các certificate file cho nó. Bạn có thể mua từ các nhà cung cấp dịch vụ tên miền, hosting. Hoặc có thể sử dụng free certificate với Let's Encrypt mà được tích hợp sẵn với Traefik.

Ví dụ:
```markdown:toml
[entryPoints]
  [entryPoints.http]
  address = ":80"
    [entryPoints.http.redirect]
    entryPoint = "https"

  [entryPoints.https]
  address = ":443"
    [entryPoints.https.tls]
      [[entryPoints.https.tls.certificates]]
      certFile = "tests/traefik.crt"
      keyFile = "tests/traefik.key"
```

### Frontends
`Frontends` là một bộ quy tắc xác định cách các request được chuyển tiếp từ một entrypoint đến một backend service trong mạng private network.

Các quy tắc được phân chia ra làm hai loại:
1. Modifiers: Chỉ dùng để chỉnh sửa các request được gửi tới. Không can thiệp vào việc định tuyến.
2. Matchers: Sẽ xác định một request cho được chuyển tiếp tới backend service nào đó hay không. Như vậy, nó quyết định tới việc định tuyến của Traefik.

Khi cấu hình Traefik qua bộ qua tắc của `Frontends` sẽ được define kiểu như sau:

```ruby:toml
[frontends]
  [frontends.frontend1]
  backend = "backend2"
    [frontends.frontend1.routes.test_1]
    rule = "Host:test.localhost,test2.localhost"
  [frontends.frontend2]
  backend = "backend1"
  passHostHeader = true
  passTLSCert = true
  priority = 10
  entrypoints = ["https"] # overrides defaultEntryPoints
    [frontends.frontend2.routes.test_1]
    rule = "HostRegexp:localhost,{subdomain:[a-z]+}.localhost"
  [frontends.frontend3]
  backend = "backend2"
    [frontends.frontend3.routes.test_1]
    rule = "Host:test3.localhost;Path:/test"
```

### Backends
Một `backend` là chịu trách nhiệm cho việc load balancing lưu lượng truy cập từ các frontends tới tập các servers. Bởi vậy, nên khi chúng ta định nghĩa các backend trong file cấu hình, thường là một danh sách cách thông tin về các server, cách thức load balancing... Và nên nhớ cho mình đấy là **một backend** nhé.

Ví dụ: Định nghia hai backend, mỗi backend lại có một set là 2 servers, như thế thực chất ta sử sụng 4 servers.

```shell:toml
[backends]
  [backends.backend1]
    # ...
    [backends.backend1.servers.server1]
    url = "http://172.17.0.2:80"
    weight = 10
    [backends.backend1.servers.server2]
    url = "http://172.17.0.3:80"
    weight = 1
  [backends.backend2]
    # ...
    [backends.backend2.servers.server1]
    url = "http://172.17.0.4:80"
    weight = 1
    [backends.backend2.servers.server2]
    url = "http://172.17.0.5:80"
    weight = 2
```

Ngoài ra, còn có các cấu hình khác bạn nên tìm hiểu thêm gồm:
- Ngăn ngừa quá tải server
- Giới hạn số connection tối đa
- Sticky session
- Health check

## Tổng kết
Trên đây là bài giới thiệu tổng quan về  Traefik tới các bạn. Hy vọng sẽ là tài liệu giúp các bạn mới tìm hiểu sẽ dễ dàng nghiên cứu Traefik hơn. Nếu bạn hỏi "Phần tiếp theo của bài này sẽ có gì?" thì mình sẽ trả lời, phần tiếp theo của bài viết sẽ là một Practice với Traefik và Docker: ***Cấu hình Traefik đơn giản cho dự án với Docker***.

Nếu có mọi thắc mắc, góp ý, vui lòng để lại comment phía dưới để mình biết và cập nhật. Cuối cùng, chân thành cảm ơn các bạn quan tâm đã đón đọc. Hẹn gặp lại các bạn lần sau! :D

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***