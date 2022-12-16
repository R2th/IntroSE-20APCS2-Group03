## Lời mở đầu

Trong bài viết lần trước với tựa đề [Tổng quan về Traefik](https://viblo.asia/p/XL6lAA8Dlek) mình đã có cơ hội giới thiệu tới mọi người một thằng Reverse-proxy | Load-balancer có tên là Traefik. Lần đó mình đã đề cập, cấu hình thằng Traefik với docker chỉ bằng một vài config ngắn gọn. Bài viết lần này, chúng ta cũng thực hành coi nó đúng không ha. Chúng ta sẽ làm một bài thực hành nhỏ để bắt đầu với Traefik với các kiến thức cơ bản mình nghĩ là cần có như sau:
- [Tổng quan về Traefik](https://viblo.asia/p/XL6lAA8Dlek)
- Docker và Docker Compose
- Kiến thức cơ bản về web, cơ bản thôi các bạn ha. Đại loại như http, https chạy ở port bao nhiêu thì bạn cũng phải biết rồi ha. :P

Tất nhiên đó là những gì chúng ta nên biết trước, bạn chưa biết cũng không sao. Và bây giờ chúng ta cùng bắt tay vào tạo một *reverse-proxy* tích hợp *Let's Encrypt* - **Giúp tự động tạo chứng chỉ bảo mật SSL miễn phí** cho *https* với Traefik nhé! :) Bài thực hành này được thực hiện trên môi trường Ubuntu, nếu bạn thực hiện trên mội trường khác gặp lỗi hay thử google trước rồi vào đây comment để nhận trợ giúp nhé.

## First practice - Whoami
### Đối tượng
Đây là phần kiến thức cơ bản làm việc với Traefik nên bài viết này hướng tới các bạn đang bắt đầu tìm hiểu về nó. Nên vui lòng không mang gạch đá vào đây nhé mọi người. :D Mọi ý kiến đóng góp, thắc mắc các bạn vui lòng thả một comment vào phía cuối bài viết nhé.

### Mục đích
Mục đích của bài thực hành lần này là để các bạn làm quen với Traefik. Biết vận dụng kiến thức về Traefik ở bài trước để tạo reverse-proxy cơ bản cho một web service của mình bằng Docker. Cấu hình để chạy được service `whoami` lên và cho nhận được response trả về khi truy cập vào tên miền. Ví dụ:

```bash
Hostname :  6e0030e67d6a
IP :  127.0.0.1
IP :  ::1
IP :  172.17.0.27
IP :  fe80::42:acff:fe11:1b
GET / HTTP/1.1
Host: 0.0.0.0:32769
User-Agent: curl/7.35.0
Accept: */*
```

### Các bước thực hành
Chúng ta sẽ liệt kê ra các bước để tạo một reverse proxy nhé:
1. Chuẩn bị các docker image cho service của bạn và image Traefik. Chúng ta sử dụng image `containous/whoami` - coi nó là web service của các bạn nha. Image này là một web service bình thường chạy ở port 80. Nó đơn giản chỉ là trả về thông tin của service đấy, IP client đang dùng để truy cập như kết quả mẫu ở bên trên. Nếu các bạn chạy service của bạn, hãy dockerize service đấy thành một image và thực hiện tương tự. Đó là cách mà bạn deploy một service lên production với docker.
2. Cấu hình và chạy Traefik của bạn lên.
3. Tiếp theo, chạy web service whoami và xem kết quả.
4. Cấu hình sử dụng `Let's Encrypt` để Traefik tự động tạo chứng chỉ SSL miễn phí dùng cho https protocol.

## Bắt đầu
### Chuẩn bị docker image
Chúng ta sẽ pull các docker image cần cho bài thực hành này:
```bash
docker pull traefik:1.7
docker pull containous/whoami:latest
```

Các bạn nhớ là với image Traefik hay các image DBMS như Mysql, Postgres... bạn nên chỉ rõ một version các bạn sẽ dùng nhé. Vì khi các bạn deploy lên production mà sử dụng tag `latest` sẽ tiềm ẩn các sự cố không mong muốn vì nó sẽ pull bản image mới nhất về. Chẳng hạn như Traefik bản mới có thay đổi api config thì rất có thể service của bạn sẽ bị crash.

### Cấu hình và chạy Traefik
Mở terminal lên, mình sẽ tạo một folder có tên là `first-practice` để chứa toàn bộ các file cấu hình cần thiết nha cho gọn nha.
```bash
mkdir first-practice
cd first-practice
```

Mình sẽ tạo một file `traefik.yml` để chạy Traefik với `docker-compose` và khai báo Traefik service như sau:
```yaml
version: '3.5'

services:
  traefik:
    image: traefik:1.7
    command:
      - --api
      - --docker
      - --docker.domain=traefik.local
      - --docker.exposedByDefault=false
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - 80:80
      - 443:443
      - 8080:8080
    networks:
      - reverse-proxy

networks:
  reverse-proxy:
    name: reverse-proxy

```

**Trong đó các command:**
- `--api` để enable Web Dashboard UI của Traefik lên và xem các service đang chạy qua nó. Mặc định trang dashboard này expose tại port 8080.
- `--docker` để enable docker intergrate của Traefik. Giúp bạn chỉnh sửa các cấu hình của traefik ngay tại phần command
- `--docker.exposedByDefault=false` nếu false, các container trong stack của bạn không chứa label `docker.enable=true` sẽ bị Traefik bỏ qua. Mặc định, Traefik sẽ tạo reverse-proxy tới tất cả các container trong cùng stack của bạn do đó ta cần set false để chỉ enable traefik với những service ta cần.

Bây giờ, hãy chạy nó lên nhé:
```bash
docker-compose -f traefik.yml up -d
```

Tới đây bạn sẽ thấy traefik đang run tại port 80, 443, 8080. Khi bạn truy cập `traefik.local:8080` (trỏ domain này về 0.0.0.0 nhé mọi người) sẽ thấy trang dashboard của traefik hiện ra.

### Cấu hình chạy web service
Bước này, chúng ta đã chuẩn bị được service traefik. Tiếp tục tạo một web service whoami nha. Chúng ta tạo thêm một file `whoami.yml` để config docker-compose với nội dung sau:
```yaml
version: '3.5'

services:
  whoami:
    image: containous/whoami:latest
    networks:
      - reverse-proxy
      - whoami-network
    labels:
      - "traefik.enable=true"
      - "traefik.port=80"
      - "traefik.frontend.rule=Host:whoami.traefik.local"

networks:
  reverse-proxy:
    external: true
  whoami-network:
    name: whoami

```

**Trong đó:**
- Chúng ta tương tác các cấu hình cho traefik thông qua các `labels` trong file `whoami.yml` của docker-compose. Mỗi labels là một string các bạn nhé.
- `traefik.enable` để bật traefik làm reverse-proxy cho service này.
- `traefik.port` để chỉ rõ cho traefik service này chạy ở port bao nhiêu. Có thể một service của bạn chạy ở port 8000, hãy thay 80 thành 8000. Mặc định không có label này, traefik sẽ sử dụng port 80.
- `traefik.frontend.rule`. Magic sẽ nằm ở nữa nè các bạn. Bài một mình có đề cập hai thành phần trong traefik là `Frontend` và `Backend`. Frontend sẽ chứa các role, modifier để tạo redirect các request tới các service backend tương ứng. Và chúng ta có một label tạo một rule đơn giản là gán web service này cho tên miền `whoami.traefik.local`. Để khi truy cập tới domain trên, web service sẽ hiện ra.
- Ngoài ra, các bạn tham khảo thêm danh sách `labels` của docker [tại đây](https://docs.traefik.io/configuration/backends/docker/#on-containers).

Chạy service này lên:
```
docker-compose -f whoami.yml up
```

Bây giờ, bạn mở `whoami.traefik.local` trên trình duyệt sẽ thấy web service chạy và response về text hiển thị như mẫu:
```bash
Hostname :  6e0030e67d6a
IP :  127.0.0.1
IP :  ::1
IP :  172.17.0.27
IP :  fe80::42:acff:fe11:1b
GET / HTTP/1.1
Host: 0.0.0.0:32769
User-Agent: curl/7.35.0
Accept: */*
```

> - Bạn có thể sử dụng thêm các modifier để kích hoạt traefik tới các path bạn muốn, ví dụ:
> `traefik.frontend.rule=Host:whoami.traefik.local; PathPrefixStrip:/public` Chạy dưới path `/public`.
> - Bạn có thể scale service lên, traefik sẽ tự load-balacing tới các container theo cơ chế `Round Robin`.
>     ```bash
>     docker-compose scale whoami=3
>     ```
> Khi truy cập web, bạn sẽ thấy hostname trong response trả về sẽ thay đổi. Chúng ta sẽ tìm hiểu thêm về load-balancing với traefik trong bài khác nha.

### Cấu hình Let's Encrypt và Traefik
Sau khi làm xong bước 3, web service của bạn đã được chạy lên, truy nhiên chưa có cấu hình nào để tự động tạo SSL miễn phí với *Let's Encrypt*. Chúng ta sẽ cùng nhau thực hiện tiếp trong mục này.
- Tạo file `config/traefik.toml` để cấu hình traefik với SSL được thuận tiện hơn.
- Tạo file `config/acme.json`, file này để trống và đặt chmod có giá trị `0600`, chứa các ssl key được sinh ra từ `Let's Encrypt`. Nội dung file này được tự động sinh ra từ traefik nên chú ý là để trống file này.

```bash
# Create acme.json for let's encrypt:
touch config/acme.json
chmod 600 config/acme.json

# Create traefik config file:
touch config/traefik.toml
```

Thêm nội dung vào file traefik như sau:
```ini
defaultEntryPoints = ["https","http"]

[entryPoints]
  [entryPoints.http]
  address = ":80"
    [entryPoints.http.redirect]
    entryPoint = "https"
  [entryPoints.https]
  address = ":443"
  [entryPoints.https.tls]

[acme]
email = "your-email@example.com"
storage = "acme.json"
entryPoint = "https"
onHostRule = true
[acme.httpChallenge]
entryPoint = "http"
```

**Trong đó:**
- Chúng ta tạo 2 entrypoint, một cho giao thức http (port 80), một cho https (port 443). Chú ý `entryPoints.http.redirect` thêm các chỉ định redirect tới https thay thế khi client truy cập bằng http.
- Thay email của bạn trong mục `[acme]`, email này được dùng để đăng ký với *Let's Encrypt*. Mỗi domain-email sẽ có rate-limit trong tuần. Khi bạn tắt đi bật lại traefik nhiều lần tới mức bị limite thì sẽ không tạo lại được key vào file acme.json nữa. Nên cần giữ cẩn thận file acme.json nhé. :D

Sau khi tạo file config của Traefik, việc còn lại là mount nó vào trong container, sửa file `traefik.yml` rồi chạy lại docker-compose up cho traefik:
```yaml
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./config/traefik.toml:/traefik.toml
      - ./config/acme.json:/acme.json
```

```bash
docker-compose -f traefik.yml up
```


Từ bây giờ, bạn truy cập vào domain whoami.traefik.local sẽ được chạy trên https, xanh nét căng. :) Tới đây cũng là kết thúc bài viết traefik và docker lần này. Mọi ý kiến thắc mắc hãy vui lòng tạo comment phía dưới cho mình nhé. Cảm ơn mọi người.

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***