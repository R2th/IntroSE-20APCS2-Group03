Trong bài viết này mình sẽ không đi sâu về định nghĩa Elastic search cũng như Kibana, Logstash là gì mà sẽ hướng dẫn cách cài đặt cũng như cách import dữ liệu từ database vào Elasticsearch bằng Logstash để sử dụng.
## Tổng quát
Theo wikipedia thì Elasticsearch là một công cụ tìm kiếm dựa trên phần mềm Lucene. Nó cung cấp một bộ máy tìm kiếm dạng phân tán, có đầy đủ công cụ với một giao diện web HTTP có hỗ trợ dữ liệu JSON. Elasticsearch được phát triển bằng Java và được phát hành dạng nguồn mở theo giấy phép Apache. Elasticsearch là một công cụ tìm kiếm phổ biến nhất, theo sau là Apache Solr, cũng dựa trên Lucene.

Kibana là ứng dụng nền web để tìm kiếm và trực quan dựa trên việc tương tác với Elasticsearch đã cài đặt ở trên. Các bạn có thể hiểu nôm na thì Kibana như là màn hình để hiển thị dữ liệu từ Elastich search vậy.

Logstash: Theo định nghĩa thì logstash là một công cụ mã nguồn mở thu thập dữ liệu có khả năng liên hợp theo thời gian thực. Logstash có thể hợp nhất dữ liệu từ các nguồn khác nhau và chuẩn hóa dữ liệu ở phần xử lý tiếp theo. Ở đây mình sẽ dùng logstash để migrate dữ liệu từ database vào Elasticsearch
## Cài đặt
### Elasticsearch và Kibana
Có nhiều cách để cài đặt elasticsearch và kibana. Tuy nhiên cách mình thấy đơn giản và hiệu quả nhất là sử dụng docker-compose. Để thực hiện kết nối 2 service trong docker trước tiên cần thiết lập một network chung cho 2 service đó theo mô hình 
![image.png](https://images.viblo.asia/81361cbe-5439-4c98-a088-d49aef436c49.png)

Chi tiết file docker-compose.yml như sau:
```
version: "3.0"
services:
  elasticsearch:
    container_name: es-container
    image: docker.elastic.co/elasticsearch/elasticsearch:7.17.0
    environment:
      - xpack.security.enabled=false
      - "discovery.type=single-node"
    networks:
      - es-net
    ports:
      - 9200:9200
  kibana:
    container_name: kb-container
    image: docker.elastic.co/kibana/kibana:7.17.0
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
Ở đây mình đang sử dụng phiên bản Elasticsearch 7.17.0. Các bạn có thể sửa lại phiên bản nào mà mình muốn sử dụng.
Khởi chạy docker-compose bằng lệnh
```
docker-compose up -d
```
Trong đó, -d sẽ thực khởi chạy docker bằng chế độ detact.
```
docker ps
```
![image.png](https://images.viblo.asia/af29ac11-f5d1-4c7c-8502-45e5bef0cbb4.png)
Kiểm tra xem Elasticsearch và Kibana đã được khởi chạy thành công chưa. Mặc định Elasticsearch sẽ được khởi chạy ở http://localhost:9200/ và Kibana ở http://localhost:5601/
![image.png](https://images.viblo.asia/64e9467c-333f-4124-a4c8-28ef9f21b497.png)
![image.png](https://images.viblo.asia/9c290959-ea6b-482e-ab4f-3b609eea9adf.png)
Nếu muốn stop cả 2 service trên ta sử dụng lệnh
```
docker-compose down 
```
### Logstash
Có nhiều cách để migrate data từ cơ sở dữ liệu của bạn sang elasticsearch. Ở đây mình sẽ cài đặt và sử dụng logstash để làm việc đó. Mình sẽ cài đặt logstash theo cách thông thường thay vì tích hợp luôn vào docker-compose như 2 service trên.
Tải về và cài đặt Public Signing Key:
```
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
```
Cài đặt apt-transport-https
```
sudo apt-get install apt-transport-https
```
Kho lưu trữ được lưu ở /etc/apt/sources.list.d/elastic-7.x.list:
```
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list
```
Cài đặt
```
sudo apt-get update && sudo apt-get install logstash
```
Kiểm tra xem logstash đã được cài đặt thành công và sẵn sàng để sử dụng chưa? Cd vào thư mục logstash và chạy bằng quyền user root.
```
cd /usr/share/logstash && sudo su
```
Chạy câu lệnh sau:
```
bin/logstash -e 'input { stdin { } } output { stdout {} }'
```
Chờ đến khi pipeline started thì gõ ký tự bất kỳ => Màn hình xuất ra kết quả tương ứng thì Logstash đã được cài đặt thành công và sẵn sàng sử dụng.
![image.png](https://images.viblo.asia/6e4b7c75-01d6-4282-b0a6-86b8f8abdcb5.png)
## Migrate data
Okay. Tới đây thì mình đã cài đặt thành công cả 3 service là Elasticsearch, Kibana và Logstash rồi. Tuy nhiên hiện Elasticsearch của chúng ta không có data nào cả. Mình sẽ sử dụng JDBC Input kết hợp Logstash để migrate data có sẵn từ MySql sang Elasticsearch.
Đầu tiên ta cần download MySql JDBC Driver.
Cd vào thư mục logstash và chạy bằng quyền user root.
```
cd /usr/share/logstash && sudo su
```
Tạo file pipeline.conf. File này sẽ chứa những config liên quan đến DB. Các bạn có thể đọc thêm tại https://www.elastic.co/guide/en/cloud/current/ec-getting-started-search-use-cases-db-logstash.html
```
gedit example-pipeline.conf
```
Nội dung:
```
input {
  jdbc {
    jdbc_driver_library => "/usr/share/logstash/lib/mysql-connector-java-8.0.27.jar"
    jdbc_driver_class => "com.mysql.jdbc.Driver"
    jdbc_validate_connection => true
    jdbc_connection_string => "jdbc:mysql://localhost:3306/g2-aio-db"
    jdbc_paging_enabled => true
    jdbc_user => "root"
    jdbc_password => "ngocman11"
    last_run_metadata_path => "/tmp/.logstash_jdbc_last_run"
    use_column_value => true
    tracking_column => "updated_at"
    tracking_column_type => "timestamp"
    clean_run => true
    statement => "SELECT * FROM `g2-aio-db`.users WHERE deleted_at is null AND updated_at > :sql_last_value AND updated_at < now() ORDER BY updated_at ASC;"
  }
}

filter {
  mutate {
    copy => { "id" => "[@metadata][_id]"}
    remove_field => ["id", "@version", "unix_ts_in_secs"]
  }
}
output {
  stdout { codec =>  "rubydebug"}
  elasticsearch {
      index => "users_index"
      document_id => "%{[@metadata][_id]}"
  }
}

```
Khởi chạy file my-pipeline.conf.
```
bin/logstash -f  example-pipeline.conf --config.reload.automatic
```
 Quan sát trên terminal:
 ![image.png](https://images.viblo.asia/c81f25f6-8872-4250-90c4-acd031c1a6f9.png)
 Quan sát trên Kibana. Truy cập vào http://localhost:5601/app/management/data/index_management/indices sẽ thấy users_index vừa được tạo.
![image.png](https://images.viblo.asia/64bd82a8-70e4-40a3-8981-610f2d0e2612.png)
Create index pattern để dễ nhìn
![image.png](https://images.viblo.asia/8db3c9db-2a93-4999-91b8-343478edf033.png)
Vào main menu mục Analytics → Discover để xem.
## Truy vấn
Okay. Vậy là chúng ta đã có data ở Elasticsearch để truy vấn. Khởi chạy postman và truy vấn thử. Đường dẫn mặc định cho lệnh tìm kiếm là:
```
localhost:9200/users_index/_search
```
Mình thử search theo column birthday và có năm sinh 1993 và xem kết quả trả về:
```
localhost:9200/users_index/_search?q=birthday:1993
```
```
{
    "took": 24,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 0.6931471,
        "hits": [
            {
                "_index": "users_index",
                "_type": "_doc",
                "_id": "1",
                "_score": 0.6931471,
                "_source": {
                    "closest_parent_id": null,
                    "status": 1,
                    "bio": null,
                    "chatwork_id": "123",
                    "github_id": "mannn-2274",
                    "team_id": null,
                    "name": "Nguyen Ngoc Man",
                    "phone_number": "0345526444",
                    "birthday": "10-11-1993",
                    "created_at": null,
                    "deleted_at": null,
                    "employee_code": "B44554456",
                    "@timestamp": "2022-03-13T06:40:20.720Z",
                    "role": 0,
                    "email": "nguyen.ngoc.man@sun-asterisk.com",
                    "parent_path": null,
                    "updated_at": "2021-05-23T04:51:24.000Z",
                    "gender": 1,
                    "position": 1
                }
            }
        ]
    }
}
```
## Tạm kết
Bài viết tới đây cũng khá dài. Trên đây là những mình muốn note lại nhỡ sau này cần áp dụng vào dự án. Vẫn còn nhiều vấn đề cần tìm hiểu thêm như là cluster elastic search. Hiểu nôm na như các instance của elastic search để khi 1 instance bị quá tải hay lỗi gì đó thì còn có instance khác thay thể tránh xảy ra trường hợp die cả hệ thống tìm kiếm. Cron job để migrate data theo giờ. Hoặc migrate data sử dụng trigger thay vì logstash,.... 

Okay. Cám ơn mọi người đã kiên nhẫn đọc tới đây. Xin cám ơn và hẹn gặp lại ở các bài viết khác.
## Tài liệu tham khảo
https://www.elastic.co/

https://viblo.asia/p/tich-hop-elasticsearch-va-kibana-vao-docker-compose-Az45bymqlxY

https://dbschema.com/jdbc-driver/MySql.html

Note: Cám ơn em Nguyễn Thanh Huyền đã chia sẻ phần config và cài đặt Logstash.