Hiện nay, khi các ứng dụng theo kiến trúc Microservice ngày càng phổ biến, chúng ta không chỉ quản lý logs của 1 ứng dụng trên 1 máy chủ mà bây giờ sẽ là hàng chục, hàng trăm các container khác nhau, log nằm dải rác trên nhiều máy chủ. Việc debug, monitor ứng dụng trở nên khó khăn hơn, vì thế những bộ ứng dụng xây dựng nhằm mục đích tập trung logs của ứng dụng về một nơi trở thành những công cụ hiệu quả.

Trong bài viết này, mình sẽ chia sẻ việc dựng một bộ ứng dụng Graylog và cấu hình cho các container gửi logs lên Graylog như thế nào?

## Về Graylog

`Graylog` được coi là một ứng dụng quản lý log tập trung. `Graylog` có thể lưu trữ hàng terabytes logs mỗi ngày, xử lý và lưu trữ vào bộ nhớ. Giao diện web của Graylog cho phép bạn tìm kiếm các bản ghi, truy suất thông tin nhanh trong, sắp xếp và hiển thị theo dạng bản đồ, bảng,...

Collecting Data: Kiến trúc của Graylog cho phép nhận vào input là bất kỳ dạng cấu trúc dữ liệu nào, bao gồm `log messages` và `network traffic` từ :
- - Syslog (TCP, UDP, AMQP, Kafka)
- - GELF(TCP, UDP, AMQP, Kafka, HTTP)
- - AWS - AWS Logs, FlowLogs, CloudTrail
- - Beats/Logstash
- - CEF (TCP, UDP, AMQP, Kafka)
- - JSON Path from HTTP API
- - Netflow (UDP)
- - Plain/Raw Text (TCP, UDP, AMQP, Kafka)
Organizing Data: Các raw logs, raw message sẽ được phân tích và làm giàu thông tin, khiến chúng hữu dụng với người quản lý và hệ thống downstream.

## Triển khai Graylog với Docker

Mình sẽ sử dụng `Docker Compose` để triển khai ứng dụng. Trong môi trường `production`, chúng ta không được khuyến khích sử dụng `Docker Compose`, thay vào đó là `Docker Swarm`, cũng rất dễ dàng để migrate cú pháp của Docker Compose qua Docker Swarm thôi

```yaml:docker-compose.yml
version: '3'
services:
  mongo:
    image: mongo:3
    volumes:
      - "./mongo/data/db:/data/db"
    networks:
      - graylog
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch-oss:6.8.5
    volumes:
      - "./elasticsearch/data:/usr/share/elasticsearch/data"
    environment:
      - http.host=0.0.0.0
      - transport.host=localhost
      - network.host=0.0.0.0
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    deploy:
      resources:
        limits:
          memory: 1g
    networks:
      - graylog
  graylog:
    image: graylog/graylog:3.2
    volumes:
      - "./graylog:/usr/share/graylog/data/journal"
    environment:
      - GRAYLOG_PASSWORD_SECRET=somepasswordpepper
      # Password: admin
      - GRAYLOG_ROOT_PASSWORD_SHA2=8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
      - GRAYLOG_HTTP_EXTERNAL_URI=http://127.0.0.1:9000/
    networks:
      - graylog
    depends_on:
      - mongo
      - elasticsearch
    ports:
      - 9000:9000
      - 5140:5140
      - 1514:1514/udp
      - 12201:12201
      - 12201:12201/udp
networks:
  graylog:
    driver: bridge
```

> Mình có sử dụng thêm 3 thư mục dùng với mục đích là volumes của các services, nên cần cấp quyền read-write cho các thư mục đó trước nhé.

Sau đó chỉ cần chạy `docker-compose up` và chờ ứng dụng bật lên là ổn, bạn chỉ cần truy cập vào địa chỉ: http://localhost:9000 để sử dụng giao diện web. Bạn đăng nhập với tài khoản/ mật khẩu là `admin / admin`. 

![](https://images.viblo.asia/39b5f08d-0770-45d7-874c-3026d90e5617.png)

Vậy là mình đã bật được ứng dụng lên, đến bước tiếp theo thôi.

## Cấu hình để gửi logs lên Graylog.

### Cấu hình Input cho Graylog

Bạn truy cập vào đây để tạo cấu hình Input cho Graylog http://localhost:9000/system/inputs , mình sẽ gửi log từ Syslog thông qua TCP nên mình cấu hình như sau: 
![](https://images.viblo.asia/cf09ff4b-7c9a-4100-b357-80c368953ce4.png)

![](https://images.viblo.asia/9366e02f-b996-4996-8da7-9f9f7335d67d.png)

Nhấn `Save` và chờ nó  chuyển sang trạng thái `RUNNING` là được.

![](https://images.viblo.asia/ebb29eea-ef50-4f14-9887-9369b416d238.png)

### Cấu hình trên ứng dụng để chúng gửi log lên Graylog

Ở đây mình sử dụng `Rsyslog` để gửi log lên Graylog. Tùy vào hệ điều hành của bạn, cần cài thêm Rsyslog.

Cấu hình output của Rsyslog trong file `/etc/rsyslog.conf` :
```bash:/etc/rsyslog.conf
...
*.* @@localhost:5140;RSYSLOG_SyslogProtocol23Format
```

Sau đó bạn restart service rsyslog để máy nhận cấu hình mới
```
$ sudo  service rsyslog restart
```

Mình sẽ test bằng cách login/logout máy tính =)) và BÙM

![](https://images.viblo.asia/64e37228-4519-4137-a00b-9326782b4300.png)
 log đã được gửi lên Graylog thành công.
 
 ## Tạm kết
 
 Trên đây là các bước cấu hình cơ bản để xây dựng Graylog nhằm mục đích thu thập logs từ các nguồn khác nhau về một địa điểm. Nâng cao hơn 1 chút thì bạn có thể cấu hình trong Graylog các filter để lọc các logs theo từng ứng dụng, từng loại log, từng log level khác nhau.