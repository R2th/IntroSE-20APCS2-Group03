Ở bài viết [API Gateway là gì? Tại sao một hệ thống microservices lại cần API Gateway?](https://viblo.asia/p/api-gateway-la-gi-tai-sao-mot-he-thong-microservices-lai-can-api-gateway-Do754pDX5M6) mình đã nói tới khái niệm về API Gateway, nó là gì, nó có ăn được không và tại sao hệ thống microservices lại cần tới nó. Trong bài viết tiếp theo này, mình sẽ giới thiệu về Kong API Gateway và chạy Kong API Gateway trên Docker.

# Tại sao lại là Kong?

## Giới thiệu 

![](https://cdn-images-1.medium.com/max/1200/1*gjFEvJt_18hI5Sk39fL2nQ.png)

Kong là một open-source API Gateway và platform, Kong được viết bằng ngôn ngữ Lua và xây dựng trên NGINX. Kong hỗ trợ nhiều plugins giúp cho việc triển khai microservices dễ dàng hơn như authentication, rate-limiting, transformation, logging,... Mình có thể tự viết plugins cho Kong bằng Lua tùy vào nhu cầu sử dụng.

![](https://www.bbva.com/wp-content/uploads/2017/11/image5.png)


## Ưu điểm của Kong 

### Khả năng mở rộng dễ dàng

Kong server là stateless, chúng ta có thể thêm hoặc xóa bao nhiêu nodes tùy ý, miễn là chúng trỏ vào 1 datastores.
Kong Datastore có thể chọn 1 trong 2 loại DB
  - **Postgres**: khi muốn xây dựng một hệ thống Api Gateway tập chung, đơn giản, hiệu năng tốt. Mặc định thì Kong sẽ sử dụng Postgres làm datastore.
  - **Cassandra**: Dùng cassandra khi muốn xây dựng một hệ thống api gateway phân tán, tính khả dụng cao, chịu tải tốt, dễ dàng scale. Cassandra sẽ chạy tốt nhất trên các server có cấu hình mạnh.

### Hiệu năng khủng

Trong các bài test performance thì Kong là một trong những API Gateway có hiệu năng cao nhất, nó có thể xử lý được một lượng rất lớn requests / s

### Nhiều plugins

Kong hỗ trợ rất nhiều plugins tùy vào chức năng như authen, logging, traffic control, analytics & monitoring...giúp quản lý cũng như theo dõi các microservices được hiệu quả và dễ dàng hơn thay vì chỉ đảm nhận mỗi việc routing requests.
![](https://images.viblo.asia/cfd77453-a898-499a-b14f-dedb9d51f623.png)

### Miễn phí

Kong có 2 phiên bản là Community và Enterprise. Bản Enterprise thì hỗ trợ nhiều thứ hơn như Kong Admin GUI, hỗ trợ trực tuyến, sử dụng các Plugins Enterprises và tất nhiên là nó phải mất tiền, nhiều tiền là đằng khác. Tuy nhiên với nhu cầu sử dụng bình thường thì bản miễn phí của nó là Community là đủ dùng rồi, và ta có thể sử dụng [Konga](https://pantsel.github.io/konga/) để quản lý và config Kong bằng GUI thay cho việc gửi request tới Kong Admin (Kong Commnity không có GUI, chỉ bản Enterprise mới có) 

# Cài đặt

Kong hỗ trợ rất nhiều nền tảng để có thể cài đặt lên như Ubuntu, Centos, Red Hat, Kubernetes, Docker...cụ thể hơn, bạn có thể vào [đây](https://konghq.com/install/) để tải phiên bản phù hợp với mình.
![](https://images.viblo.asia/c7371c43-4beb-411f-9cf7-000199df91a4.png)

### Kong on Docker

Việc cài đặt Kong có hướng dẫn rất đầy đủ và chi tiết trên trang chủ, chúng ta sẽ phải cài đặt `Kong Server`, `Kong Datastore`, `Konga` để quản lý Kong, `Database` cho Konga, khá là nhiều thứ, để dễ dàng hơn cho mọi người thì mình sẽ cung cấp "Kong ăn liền" trên `Docker` bằng việc sử dụng docker-compose. Tất cả những gì bạn cần là một máy tính có cài `Docker` , `docker-compose` và mạng internet.

`docker-compose.yml` 
```docker
version: "3"

networks:
 kong-net:
  driver: bridge

services:

  #######################################
  # Postgres: The database used by Kong
  #######################################
  kong-database:
    image: postgres:9.6
    restart: always
    networks:
      - kong-net
    environment:
      POSTGRES_USER: kong
      POSTGRES_DB: kong
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "kong"]
      interval: 5s
      timeout: 5s
      retries: 5

  #######################################
  # Kong database migration
  #######################################
  kong-migration:
    image: kong:latest
    command: "kong migrations bootstrap"
    networks:
      - kong-net
    restart: on-failure
    environment:
      KONG_PG_HOST: kong-database
    links:
      - kong-database
    depends_on:
      - kong-database

  #######################################
  # Kong: The API Gateway
  #######################################
  kong:
    image: kong:latest
    restart: always
    networks:
      - kong-net
    environment:
      KONG_PG_HOST: kong-database
      KONG_DATABASE: postgres 
      KONG_PROXY_LISTEN: 0.0.0.0:8000
      KONG_PROXY_LISTEN_SSL: 0.0.0.0:8443
      KONG_ADMIN_LISTEN: 0.0.0.0:8001
    depends_on:
      - kong-migration
      - kong-database
    healthcheck:
      test: ["CMD", "curl", "-f", "http://kong:8001"]
      interval: 5s
      timeout: 2s
      retries: 15
    ports:
      - "8001:8001"
      - "8000:8000"

  #######################################
  # Konga database prepare
  #######################################
  konga-prepare:
    image: pantsel/konga:next
    command: "-c prepare -a postgres -u postgresql://kong@kong-database:5432/konga_db"
    networks:
      - kong-net
    restart: on-failure
    links:
      - kong-database
    depends_on:
      - kong-database

  #######################################
  # Konga: Kong GUI
  #######################################
  konga:
    image: pantsel/konga:next
    restart: always
    networks:
        - kong-net
    environment:
      DB_ADAPTER: postgres
      DB_HOST: kong-database
      DB_USER: kong
      TOKEN_SECRET: km1GUr4RkcQD7DewhJPNXrCuZwcKmqjb
      DB_DATABASE: konga_db
      NODE_ENV: production
    depends_on:
      - kong-database
    ports:
      - "1337:1337"
```

#### Giải thích các services được sử dụng ở trong docker-compose file và cách tùy chỉnh

- **kong-database**
  - Overview: Database được dùng làm datastore cho Kong.
  - Details: Service này sử dụng `Postgre` bản 9.6  từ docker hub, được sử dụng làm datastore cho Kong Server. 
    - Environment variables:
      - POSTGRES_USER: database user name (default: kong).
      - POSTGRES_DB: database name (default: kong).
      - POSTGRES_PASSWORD: database user's password (default: kong).
      
- **kong**
  - Overview: Kong Server.
  - Details: Service này sử dụng `Kong Comunity Edittion` image mới nhất, chính chủ của Kong từ docker hub (phiên bản sử dụng alpine linux) https://hub.docker.com/_/kong 
  - Environment variables:
    - KONG_DATABASE: `postgres` /`cassandra` - config database sử dụng bởi Kong, ở đây chúng ta dùng `postgres`.
    - KONG_PG_HOST: Postgres database address.
    - KONG_PG_PASSWORD: Postgres database user's password.
    - KONG_PROXY_LISTEN: Địa chỉ mà ta sẽ gửi `http` requests tới Kong để xử lý và routing (default: 0.0.0.0:8000, trên môi trường production sử dụng 0.0.0.0:80).
    - KONG_PROXY_LISTEN_SSL: Địa chỉ mà ta sẽ gửi `https` requests tới Kong để xử lý và routing  (default: 0.0.0.0:8443, trên môi trường production sử dụng 0.0.0.0:443
    - KONG_ADMIN_LISTEN: Địa chỉ mà ta sẽ sử dụng để quản lý Kong thông qua việc gửi request tới hoặc sử dụng Konga.
-**konga**
    - Overview: Konga GUI.
    - Detail: Service này sử dụng `konga` image từ dockerhub để cung cấp giao diện quản lý, monitoring cho Kong, thay vì việc bắn request bằng tay tới Kong Admin.
- **kong-migration**
    - Overview: Migrate database để Kong có thể sử dụng
-**konga-prepare**
    - Overview: Prepare db để sử dụng cho Konga

### Cài đặt Kong

Clone file docker-compose trên

```bash
git clone https://github.com/huyhoc1310/kong-docker-ce.git
```

Change directory tới thư mục chứa docker-compose file

```bash
cd kong-docker-ce
```

Chạy docker-compose

```bash
docker-compose up --build
```

Chúng ta sẽ đợi 1 lát để cho các services được chạy xong, kiểm tra thử xem Kong đã được chạy thành công bằng cách gửi thử request tới Kong Admin 

```bash
curl -i http://localhost:8001
```

Tiếp theo ta vào Konga (port 1337) để bắt đầu sử dụng Kong bằng cách sử dụng trình duyệt và vào địa chỉ `http://localhost:1337`. Konga sẽ yêu cầu chúng ta tạo tài khoản Admin để sử dụng 
![](https://images.viblo.asia/8c0077e3-8df2-4a75-a521-c741d424ae0c.png)

Sau khi tạo xong tài khoản và đăng nhập, việc đầu tiên chúng ta cần làm sẽ là kết nối Konga với Kong Server thông qua Kong Admin bằng cách điền vào form, với Kong admin url là địa chỉ của Kong admin, trong trường hợp này chúng ta sẽ phải sử dụng địa chỉ mạng nội bộ của máy đang sử dụng thay vì `localhost` vì Konga đang được chạy ở trong Docker container. Để kiểm tra địa chỉ của máy, ta có thể sử dụng lệnh `ifconfig` (với Unix, đã cài nettools). Máy của mình là 192.168.5.14
![](https://images.viblo.asia/c4a2d1a9-7806-43df-baa0-f3e012243cdb.png)

Sau khi create connection, chúng ta đã có thể quản lý Kong server từ Konga.
![](https://images.viblo.asia/a24837be-f43d-4a86-8778-361bffa57ef3.png)

# Tổng kết
Trong bài viết lần này, mình đã giới thiệu một API Gateway rất thông dụng và mạnh mẽ hiện nay là Kong API Gateway và cách cài đặt nó chạy trên Docker. Bài viết tiếp theo mình sẽ hướng dẫn chi tiết cách config và sử dụng Kong để quản lý hệ thống microservices một cách hiệu quả.