# Giới thiệu
Elasticsearch là công cụ tìm kiếm và phân tích phân tán, RESTful mã nguồn mở, được xây dựng trên Apache Lucene. Kibana là một nền tảng phân tích hiển thị dữ liệu từ Elasticsearch một cách trực quan dễ sử dụng . Kibana cũng là một công cụ mã nguồn mở miễn phí, cho tất cả mọi người sử dụng. Kibana cung cấp các tính năng cho người dùng quản lý như biểu đồ cột, biểu đồ đường, biểu đồ tròn, biểu đồ nhiệt và nhiều loại chart khác nữa.
Bài viết sau sẽ hướng dẫn tích hợp Elasticsearch và Kibana vào docker-compose
# Nội dung
Để thực hiện kết nối 2 service trong docker trước tiên cần thiết lập một network chung cho 2 service đó mô hình như sau

![](https://images.viblo.asia/83ab4f4e-d93e-4317-a340-8a8680609e33.png)

Như hình để thực hiện kết nội cần tạo một network ES-NET bằng lệnh sau:

**docker network create es-net --driver=bridge**

Để kiểm tra network được tạo hay chưa chúng ta dùng lệnh : 

**docker network ls**

Kết quả :

```
NETWORK ID NAME DRIVER SCOPE
acd9ccf2f539 bridge bridge local
f14ca1c8849e es-net bridge local
6840debcb248 host host local
f514cb30a663 none null local
```

# Install and run Elastic search service

Trước tiên chúng ta cần thực hiện pull image Elasticsearch và chạy nó trên docker bằng lệnh sau
```

docker run -d \
--name es-container \
--net es-net \
-p 9200:9200 \
-e xpack.security.enabled=false \
-e discovery.type=single-node \
docker.elastic.co/elasticsearch/elasticsearch:7.11.0
```

--name chỉ định name của container là es-container và --net chỉ định network là es-net , -p xác định port 9200 được export, type node là single-node , version phiên bản 7.11.0

# Install and run kibana service

Sau cùng chúng ta cần pull image kibana và thực hiện connect đến elastic bằng câu lệnh dưới. 

```
docker run -d \
--name kb-container \
--net es-net \
-p 5601:5601 \
-e ELASTICSEARCH_HOSTS=http://es-container:9200 \
docker.elastic.co/kibana/kibana:7.11.0
```

Tương tự lệnh trên sẽ thực hiện chạy docker với các thông số

--name tên container
--net chỉ định network là es-net( trùng với network đã sử dụng ở elasticsearch)
-p chỉ định port
-e xác định container elactic search dùng để link đến. ở đây là http://es-container:920 với es-container là tên container

Sau khi thực hiện run Kibana và mở browser ở địa chỉ http://localhost:5601

Giao diện sẽ như hình

![](https://images.viblo.asia/4d8a6e7b-5949-4ae0-a6a6-78bccc1be708.png)


## Shutting service

Nếu muốn shutdown elastic search hoặc kibana thực hiện lệnh sau :

```
docker container stop kb-container
docker container stop es-container
```

Nếu muốn xóa tất cả hẵn sử dụng lệnh

```
docker container prune
```

## Tích hợp tất cả vào docker-compose

Chúng ta có thể tích hợp các câu lệnh trên vào docker compose bằng cách viết file docker-compose.yml như sau

```
version: "3.0"
services:
  elasticsearch:
    container_name: es-container
    image: docker.elastic.co/elasticsearch/elasticsearch:7.11.0
    environment:
      - xpack.security.enabled=false
      - "discovery.type=single-node"
    networks:
      - es-net
    ports:
      - 9200:9200
  kibana:
    container_name: kb-container
    image: docker.elastic.co/kibana/kibana:7.11.0
    environment:
      - ELASTICSEARCH_HOSTS=http://es-container:9200
    networks:
      - es-net
    depends_on:
      - elasticsearch
    ports:
      - 5601:5601
networks:
  es-net:
    driver: bridge
```

Khởi chạy docker-compose bằng lệnh

```
docker-compose up -d
```

trong đó -d sẽ thực khởi chạy docker bằng chế độ detact 

Nếu muốn stop cả 2 service trên sử dụng lệnh

```
docker-compose down 
```