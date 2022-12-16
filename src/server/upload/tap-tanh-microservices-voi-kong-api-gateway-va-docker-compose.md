Tiếp tục chuỗi tìm hiểu về Kubernetes - Microservices archiecture, thành phần quan trọng nhất trong khối microservices theo mình nghĩ có lẽ là API Gateway, vì vậy bài viết hôm nay chúng ta cùng tìm hiểu về API Gateway và cùng làm một demo nhỏ về API Gateway với **Kong API Gateway** sử dụng docker-compose nhé mọi người.

Trước khi vào phần demo thì cùng lướt qua một vài khái niệm nhé!

## API Gateway là gì?
API Gateway là phương pháp tiếp cận tối ưu cho kiến trúc microservices. Một API Gateway là một máy chủ truy xuất duy nhất vào hệ thống. Nó cũng tương tự như Design Patterns Facade dựa trên OOP

API Gateway che giấu đi thông tin kiến trúc hệ thống nội bộ và cung cấp các API tùy chỉnh cho mỗi Client. API Gateway còn có trách nhiệm xác thực, giám sát, cân bằng tải, caching, định hình yêu cầu và quản lí thông tin, xử lí phản hồi tĩnh.

![](https://images.viblo.asia/5384931f-fdc4-4f23-81d2-0dfb710323c9.png)

API Gateway làm nhiệm vụ định tuyến các yêu cầu, kết hợp và chuyển đổi các giao thức. Tất cả yêu cầu từ Client đều đi qua API Gateway. Sau đó thì API Gateway định tuyến các yêu cầu này tới microservices phù hợp. API Gateway sẽ xử lý yêu cầu của người dùng bằng cách gọi đến một loạt microservices rồi tổng hợp các kết quả. Nó có thể chuyển đổi giữa các giao thức web như HTTP, WebSocket và các giao thức nội bộ không thân thiện với web.

## Kong API Gateway

> The world’s most popular API gateway. Built for hybrid and multi-cloud, optimized for microservices and distributed architectures. Get started today – download Kong Gateway for free.

Kong API Gateway là API Gateway cũng như là một nền tảng cho API. Nó hoạt động như một phần mềm trung gian giữa các máy Client và các Service trong hệ thống của bạn.

![](https://images.viblo.asia/374f30f7-f29a-43bc-b0a3-2985c28944de.png)

Kong nhẹ, hiệu suất cao và dễ dàng mở rộng. Ngoài việc làm một API Gateway thông thường, Kong cung cấp nhiều chức năng khác như Authentication, Authorization, Security, Trafic control, Serverless, Analytics & monitoring, request/response transformation, logging ...

Các plugin có thể tích hợp vào Kong được list ở đây, https://docs.konghq.com/hub


**TOP các chức năng nổi bật của Kong**

- Routing, load balancing, health checking - Tất cả có thể cấu hình thông qua Admin API hoặc khai báo sẵn.
- Authentication and Authorization APIs, có thể dùng JWT, Basic authentication, ACLs và nhiều cách khác.
- Proxy, SSL/TLS termination, connectivity hỗ trợ Layer 4/ Layer 7 (L4 / L7)
- Các plugins để thực thi kiểm soát traffic, chuyển đổi req / res, logging, monitoring.
- Các mô hình triển khai Declarative Databaseless Deployment, Hibrid Deployment
- Tích hợp ingress controller native cho Kubernetes

Kong based trên NGINX và lua-nginx-module, chính tính pluggable của nó làm cho nó linh hoạt và mạnh mẽ.

Với nhiều ưu điểm cũng như việc tích hợp và sử dụng khá đơn giản nên Kong đang là API Gateway phổ biến nhất thế giới.

### Các cách tương tác với Kong
Hình dung cơ bản thì khi một request đến với Kong, nó sẽ query trong database và lấy các thông tin liên quan đến api đó như địa chỉ ip, domain name, path, port, protocol, connection timeout ...
Và điều hướng request đó đến đúng endpoint cần đến - service(s) đang chạy trong hệ thống

Ví dụ chúng ta có service response api users, ở ip `10.0.1.1:3000`, để gọi đến service đó thì cần tạo ở Kong API một services và khai báo địa chỉ ip, port, path tương ứng và route để Kong có thể điều hướng đúng.

Có thể thao tác với Kong trực tiếp qua API dùng postman chẳng hạn, hay dùng CURL ... Kong cung cấp admin api để thêm sửa xóa các services dễ dàng.

```shell
~/demo/microservice/kong $ curl -i -X GET  127.0.0.1:8001/services
HTTP/1.1 200 OK
Date: Sun, 15 Aug 2021 06:21:31 GMT
Content-Type: application/json; charset=utf-8
Connection: keep-alive
Access-Control-Allow-Origin: *
Content-Length: 389
X-Kong-Admin-Latency: 2
Server: kong/2.5.0

{"data":[{"port":443,"protocol":"https","client_certificate":null,"name":"get_simple_html","connect_timeout":60000,"read_timeout":60000,"host":"httpbin.org","path":"/html","write_timeout":60000,"id":"0e090616-b1a1-4157-a121-54c299f72f68","created_at":1628942414,"updated_at":1628942414,"tls_verify":null,"retries":5,"tags":null,"tls_verify_depth":null,"ca_certificates":null}],"next":null} 
```

## Konga - Kong GUI
Để việc thao tác với Kong bớt khô khan và thêm sinh động hơn thì cần một giao diện quản trị tích hợp phải không nào.

> More than just another GUI to KONG Admin API
Konga là một bộ giao diện web tích hợp giúp dễ dàng thao tác với Kong mà không phải thông qua Command line.

Các chức năng chính của Konga:
- Quản trị tất cả API của Kong Admin
- Import consumers từ các resource như Database, files, API...
- Quản lý nhiều Kong Node
- Backup, restore và migrate Kong Node sử dụng snapshots
- Monitor Node và trạng thái của API sử dụng healthcheck
- Email & Slack notification
- Có thể quản lý nhiều Users sử dụng hệ thống
- Dễ dàng tích hợp với các hệ quản trị CSDL như MySQL, PostgreSQL, MongoDB

![image.png](https://images.viblo.asia/171c3c3d-4fdb-40e3-bd43-3fe16351dba3.png)

Về cơ bản thì Kong có bản Enterprise, có hỗ trợ giao diện chuyên nghiệp cũng như được sự support chính thức từ Kong.

Nhưng với những AE đam mê open-source - thực ra là ko đủ tiền mua Enterprise (hihi) thì trước tiên hãy làm quen với các command line, và sau đó là các tool opensource phổ biến, vì thế nên hôm nay mình chọn Konga để thực hành với Kong.

Mọi người có thể tìm hiểu thêm về Konga ở đây : https://github.com/pantsel/konga

Giao diện kiểu CMS quản trị quen thuộc với đầy đủ chức năng giúp quản trị viên có thể thao tác với Kong API một cách rất dễ dàng

![](https://images.viblo.asia/390c80a2-9d63-4acb-9a39-6edf2d034650.png)

## Docker-compose
Cài đặt Kong, Konga, Kong database bằng docker - docker-compose
Tất cả đều có ở document của Kong và Konga, chúng ta có thể cài đặt trực tiếp lên máy, cũng có thể cài đặt và chạy thông qua docker.
Các document về docker của Kong và Konga ở đây:

**- Kong :** https://github.com/Kong/docker-kong

**- Konga :** https://github.com/pantsel/konga

Ở bài này mình sẽ sample một file docker-compose nhé

Các service sẽ chạy bao gồm:
- **kong-migrations**, **kong-migrations-up** để setup database migration cho Kong
- **kong**, **db** để chạy Kong và PG database host cho Kong
- **konga-prepare** chạy prepare db cho Konga
- **konga** chính là Kong GUI của chúng ta
- **json-api** một micro service response json - mình build sample
```yaml
version: '3.7'
volumes:
  kong_data: {}
  kong_prefix_vol:
    driver_opts:
     type: tmpfs
     device: tmpfs
  kong_tmp_vol:
    driver_opts:
     type: tmpfs
     device: tmpfs
networks:
  kong-net:
    external: false
services:
  kong-migrations:
    image: "${KONG_DOCKER_TAG:-kong:latest}"
    command: kong migrations bootstrap
    depends_on:
      - db
    environment:
      KONG_DATABASE: postgres
      KONG_PG_DATABASE: ${KONG_PG_DATABASE:-kong}
      KONG_PG_HOST: db
      KONG_PG_USER: ${KONG_PG_USER:-kong}
      KONG_PG_PASSWORD_FILE: /run/secrets/kong_postgres_password
    secrets:
      - kong_postgres_password
    networks:
      - kong-net
    restart: on-failure
    deploy:
      restart_policy:
        condition: on-failure
  kong-migrations-up:
    image: "${KONG_DOCKER_TAG:-kong:latest}"
    command: kong migrations up && kong migrations finish
    depends_on:
      - db
    environment:
      KONG_DATABASE: postgres
      KONG_PG_DATABASE: ${KONG_PG_DATABASE:-kong}
      KONG_PG_HOST: db
      KONG_PG_USER: ${KONG_PG_USER:-kong}
      KONG_PG_PASSWORD_FILE: /run/secrets/kong_postgres_password
    secrets:
      - kong_postgres_password
    networks:
      - kong-net
    restart: on-failure
    deploy:
      restart_policy:
        condition: on-failure
  kong:
    image: "${KONG_DOCKER_TAG:-kong:latest}"
    user: "${KONG_USER:-kong}"
    depends_on:
      - db
    environment:
      KONG_ADMIN_ACCESS_LOG: /dev/stdout
      KONG_ADMIN_ERROR_LOG: /dev/stderr
      KONG_PROXY_LISTEN: "${KONG_PROXY_LISTEN:-0.0.0.0:8000}"
      KONG_ADMIN_LISTEN: "${KONG_ADMIN_LISTEN:-0.0.0.0:8001}"
      KONG_CASSANDRA_CONTACT_POINTS: db
      KONG_DATABASE: postgres
      KONG_PG_DATABASE: ${KONG_PG_DATABASE:-kong}
      KONG_PG_HOST: db
      KONG_PG_USER: ${KONG_PG_USER:-kong}
      KONG_PROXY_ACCESS_LOG: /dev/stdout
      KONG_PROXY_ERROR_LOG: /dev/stderr
      KONG_PG_PASSWORD_FILE: /run/secrets/kong_postgres_password
      KONG_PREFIX: ${KONG_PREFIX:-/var/run/kong}
    secrets:
      - kong_postgres_password
    networks:
      - kong-net
    ports:
      - "${KONG_INBOUND_PROXY_LISTEN:-0.0.0.0}:8000:8000/tcp"
      - "${KONG_INBOUND_SSL_PROXY_LISTEN:-0.0.0.0}:8443:8443/tcp"
      - "127.0.0.1:8001:8001/tcp"
      - "127.0.0.1:8444:8444/tcp"
    healthcheck:
      test: ["CMD", "kong", "health"]
      interval: 10s
      timeout: 10s
      retries: 10
    restart: on-failure:5
    read_only: true
    volumes:
      - kong_prefix_vol:${KONG_PREFIX:-/var/run/kong}
      - kong_tmp_vol:/tmp
    deploy:
      restart_policy:
        delay: 50s
        condition: on-failure
        max_attempts: 5
        window: 10s
      resources:
        limits:
          cpus: "${KONG_CPU_LIMIT:-2}"
          memory: ${KONG_MEMORY_LIMIT:-2g}
    security_opt:
      - no-new-privileges
  db:
    image: postgres:9.5
    environment:
      POSTGRES_DB: ${KONG_PG_DATABASE:-kong}
      POSTGRES_USER: ${KONG_PG_USER:-kong}
      POSTGRES_PASSWORD_FILE: /run/secrets/kong_postgres_password
    secrets:
      - kong_postgres_password
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "${KONG_PG_USER:-kong}"]
      interval: 30s
      timeout: 30s
      retries: 3
    restart: on-failure
    deploy:
      restart_policy:
        condition: on-failure
    stdin_open: true
    tty: true
    networks:
      - kong-net
    volumes:
      - kong_data:/var/lib/postgresql/data
  konga-prepare:
    image: pantsel/konga
    container_name: konga-prepare
    command: "-c prepare -a postgres -u postgresql://kong:kong@db:5432/konga"
    networks:
      - kong-net
    restart: on-failure
    links:
      - db:db
    depends_on:
      - db
  konga:
    image: pantsel/konga
    container_name: konga
    restart: on-failure
    links:
      - db:db
    depends_on:
      - db
      - konga-prepare
    networks:
      - kong-net
    env_file:
      - .konga-docker-env
    ports:
      - "1337:1337"
  # Sample json api only
  json-api:
    image: json-api:latest
    networks:
      - kong-net
secrets:
  kong_postgres_password:
    file: ./POSTGRES_PASSWORD
```

Konga sẽ chạy ở port 1337, lần đầu thì hãy tạo một tài khoản quản trị viên để truy cập konga.

Sau khi đã tạo account và đăng nhập thành công, hãy tạo một services và routes sample nhé

Mình có chạy json-api service, hãy ví dụ service này chính là một service trong hệ thống microservices , và hãy cấu hình để Kong làm API gateway trỏ đến service này nhé.

Để thêm service, chúng ta vào http://127.0.0.1:1337/#!/services, và thêm service mới ở đây mình sẽ đặt tên là `json_service`
- host: `json-api`
- port: `4000`
- path: `/`
- protocol: `http`

Như vậy là thêm xong một service, bây giờ chúng ta sẽ cần thêm route để point đến service này, ở trang `Service details` chọn `Routes` => `Add routes`

 - name: `json_service_route`
 - paths: `/json_service_route`
 - protocols: `http`

Cùng xem kết quả nhé

![](https://images.viblo.asia/dc2b4d5f-caaa-4686-8757-3b1c980dcac7.png)

![](https://images.viblo.asia/7214d676-ac96-47fb-a842-097c643a2e1c.png)

Như vậy là chúng ta vừa tìm hiểu cơ bản về API Gateway, Kong API Gateway cũng như thực hành một sample API Gateway sử dụng docker-compose

Cảm ơn mọi người đã theo dõi bài viết!