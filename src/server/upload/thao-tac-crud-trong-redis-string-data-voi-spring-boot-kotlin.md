Trong bài viết giới thiệu về một số điểm cơ bản:
- Build Redis server với docker compose 
- Kết nối Spring boot với Redis server viết bằng Kotlin
- Thao tác CRUD dạng string data qua Rest controller

### Redis server

Redis là kho dữ liệu để lưu trữ cấu trúc dữ liệu trong bộ nhớ, sử dụng như một cơ sở dữ liệu key-value phân tán, cache và thông điệp với độ bền tùy chọn. Redis hỗ trợ các loại cấu trúc dữ liệu trừu tượng khác nhau như strings, lists, maps, sets, sorted sets, HyperLogLogs, bitmaps, streams, và spatial indices.

#### Basic command SET and GET

##### SET command

SET command là xét key để chứ gía trị string. Nếu key đã chứa một giá trị, nó sẽ bị ghi đè với kiểu dữ liệu tương ứng.

Các tùy chọn:
- SET command hỗ trợ một số tùy chọn để tùy chỉnh hành vi:
- EX seconds -- Xét thời gian hết hạn đơn vị giây.
- PX milliseconds -- Xét thời gian hết hạn đơn vị mili giây.
- EXAT timestamp-seconds -- Xét thời gian hết hạn đơn vị Unix tại thời điểm key sẽ hết hạn đơn vị giây.
- PXAT timestamp-milliseconds -- Xét thời gian hết hạn đơn vị Unix tại thời điểm key sẽ hết hạn đơn vị mili giây.
- NX -- Chỉ xét khi key chưa tồn tại.
- XX -- Chỉ xét khi key đã tồn tại.
- KEEPTTL -- Giữ lại thời gian tồn tại liên quan đến khóa.
- GET -- Trả lại giá trị cũ lưu trữ tại key hoặc nil khi khóa không tồn tại.

##### GET command

GET command lấy giá trị của key. Nếu Nếu key chưa tồn tại giá trị cụ thể sẽ trả về nil. Trả về lỗi khi gía trị cần lưu trữ tại key không phải là string, vì GET chỉ xử lý các giá trị string.

#### Spring Data Redis

Spring Data Redis là một phần của Spring Data cho phép tùy chỉnh dễ dàng và truy cập với Redis từ các ứng dụng Spring. Nó cung cấp cả sự trừu tượng cấp thấp và cấp cao để tương tác với cơ sở dữ liệu cho người dùng khỏi những lo lắng về cơ sở hạ tầng.
Các tính năng:
- Các package kết nối trừu tượng cấp thấp qua một số Redis driver(Lettuce và Jedis).
- Bản dịch ngoại lệ sang phân cấp ngoại lệ Truy cập dữ liệu di động của Spring cho các trường hợp ngoại lệ của trình điều khiển Redis.
- RedisTemplate cung cấp tính trừu tượng cấp cao để thực hiện các hoạt động Redis khác nhau, hỗ trợ dịch ngoại lệ và tuần tự hóa.
- Hỗ trợ Pubsub (chẳng hạn như MessageListenerContainer dành cho POJO theo hướng tin nhắn).
- Hỗ trợ Redis Sentinel và Redis Cluster.
- API phản ứng bằng cách sử dụng Lettuce driver.
- JDK, String, JSON và Spring Object / XML để map với các serializer.
- Triển khai tập JDK trên Redis.
- Các lớp hỗ trợ bộ đếm nguyên tử.
- Chức năng Sắp xếp và Pipelining.
- Hỗ trợ chuyên dụng cho mẫu SORT, SORT / GET và các giá trị hàng loạt trả về.
- Thực hiện Redis cho sự trừu tượng hóa bộ nhớ cache của Spring 3.1.
- Tự động triển khai các giao diện Kho lưu trữ bao gồm hỗ trợ các phương pháp truy vấn tùy chỉnh sử dụng @EnableRedisRepositories.
- CDI(Customer Data Integration) hỗ trợ cho kho lưu trữ.

### Build project
Chúng ta sẽ tạo một ứng dụng Spring boot với các thông số sau:
![Screen Shot 2021-06-20 at 8.30.34 PM.png](https://images.viblo.asia/e7f6746d-460e-4526-8bb9-4a5a11327bc5.png)
#### Create Redis server
Sử dụng docker image `redis:alpine` với docker-compose
```docker-compose.yml
version: "3"

services:
  redis-spring-boot:
    image: redis:alpine
    ports:
      - 6380:6379
    tty: true
```

#### Connect to Spring boot to Redis server
Viết đoạn code kết nối từ ứng dụng Spring boot với Redis
![Screen Shot 2021-06-20 at 8.32.57 PM.png](https://images.viblo.asia/1e858398-9e18-417c-a337-f2de0befcc83.png)
#### Rest Controller
- Create Service: để xử lý logic thao tác với Redis bằng `redisValueOps`
![Screen Shot 2021-06-20 at 8.34.43 PM.png](https://images.viblo.asia/0cba6c83-d527-431d-92a6-620c5dc0e290.png)
- Create Rest Controller: call service và nhận request từ client
![Screen Shot 2021-06-20 at 8.35.09 PM.png](https://images.viblo.asia/768bb705-4b08-4d98-b5b3-16c4fc0c7c80.png)

#### Demo
Trong ứng dụng mình có setup thêm [springdoc-openapi-ui](https://springdoc.org/) để dễ dàng gọi các request.
![Screen Shot 2021-06-20 at 8.40.34 PM.png](https://images.viblo.asia/c31c2730-f267-42f5-8032-b34de7873280.png)
- POST request
![Screen Shot 2021-06-20 at 8.42.20 PM.png](https://images.viblo.asia/fd7439e9-c20d-4802-995a-9096b8a35f3c.png)
- GET request
![Screen Shot 2021-06-20 at 8.42.41 PM.png](https://images.viblo.asia/47aa6b7a-4cf4-4fa9-8d9d-fa6ee3f0f4e5.png)
- PUT request
![Screen Shot 2021-06-20 at 8.43.45 PM.png](https://images.viblo.asia/394fe155-16df-4236-be71-b5427138e600.png)
![Screen Shot 2021-06-20 at 8.44.01 PM.png](https://images.viblo.asia/b04143f5-db68-4a03-b46f-6f076ff029b7.png)
- DELETE request
![Screen Shot 2021-06-20 at 8.43.00 PM.png](https://images.viblo.asia/d6c6fc9c-5b5d-4e10-a7c9-f921305b6f5b.png)
![Screen Shot 2021-06-20 at 8.46.48 PM.png](https://images.viblo.asia/f8bd2139-fe78-4e97-80bc-e9eb04c69bd9.png)

#### References
- [springdoc-openapi](https://springdoc.org/)
- [Spring Data Redis](https://spring.io/projects/spring-data-redis)
- [GET - Redis](https://redis.io/commands/get)
- [SET - Redis](https://redis.io/commands/set)