## Giới thiệu về ELK
Lưu trữ log, quản lý log là một trong những phần thiết yếu trong mọi thiết lập vì log cực kỳ hữu ích khi khắc phục sự cố xảy ra với ứng dụng của bạn. Hôm nay, tôi sẽ giới thiệu một bộ công cụ mã nguồn mở giúp thu thập và quản lý log trực tiếp trên Rails app. Đó là ELK (Elasticsearch, Logstash và Kibana). ELK là một log server và giao diện web quản lý log, bao gồm **Elasticsearch** (là một công cụ tìm kiếm và phân tích toàn văn bản mã nguồn mở, dựa trên công cụ tìm kiếm Apache Lucene), **Logstash** (là một trình tổng hợp log thu thập dữ liệu từ nhiều nguồn đầu vào khác nhau, thực hiện các biến đổi và cải tiến khác nhau và sau đó gửi nó đến Elaticsearch) và **Kibana** (là một công cụ quản lý và trực quan hóa dữ liệu cho Elaticsearch cung cấp biểu đồ thời gian thực, biểu đồ đường, biểu đồ hình tròn và bản đồ). Và cũng không kém quần quan trọng là **Beats** (cụ thể là filebeat beats-pattern giúp vận chuyển các log từ client về server). 

![alt](https://images.viblo.asia/f69f4903-af27-4bbe-ac19-b1efffc8b5ac.png)

ELK phổ biến vì nó đáp ứng nhu cầu trong việc phân tích và quản lý log, là một nền tảng phân tích đơn giản nhưng vô cùng mạnh mẽ. 
## Cách sử dụng ELK để quản lý log
Các thành phần khác nhau trong ELK được thiết kế để tương tác với nhau mà không cần cấu hình quá nhiều. Đối với môi trường phát triển quy mô nhỏ, kiến trúc cổ điển sẽ như sau:
![alt](https://images.viblo.asia/2d07f312-e318-4b10-86bd-1a2caf878baa.png)

Tuy nhiên, để xử lý các đường ống phức tạp hơn được xây dựng để xử lý một lượng lớn dữ liệu trong sản xuất, các thành phần bổ sung có thể sẽ được thêm vào kiến trúc ghi log của bạn, để phục hồi (Redis) và bảo mật (Nginx):
![alt](https://images.viblo.asia/377fc5b7-d9c6-4402-9024-ccd393b82c79.png)

## Cài đặt ELK
ELK có thể được cài đặt bằng nhiều phương pháp khác nhau và trên một loạt các hệ điều hành và môi trường khác nhau. Tôi sẽ cung cấp một ví dụ để cài đặt tất cả các thành phần Elaticsearch, Logstash, Kibana và Filebeat - trên Linux. 
### Cài đặt Elasticsearch
Tải xuống và cài đặt khóa ký công khai:
```
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
```
Đối với Debian, sau đó chúng ta cần cài đặt gói apt-transport-https:
```
sudo apt-get install apt-transport-https
```
Lưu kho lưu trữ vào /etc/apt/sources.list.d/elastic-7.x.list:
```
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list
```
Cuối cùng là cập nhật kho lưu trữ và cài đặt Elasticsearch
```
sudo apt-get update && sudo apt-get install elasticsearch
```
Sau khi cài đặt xong, chạy Elasticsearch bằng lệnh: 
```
sudo service elasticsearch start
```
Để xác nhận rằng mọi thứ đều hoạt động như mong đợi, hãy chạy curl hoặc truy cập trình duyệt của bạn tới http://localhost:9200 và bạn sẽ thấy:
```
{
  "name" : "hoanghung",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "qeYhHeRdSNCPWX0AFEeEpQ",
  "version" : {
    "number" : "7.4.0",
    "build_flavor" : "default",
    "build_type" : "deb",
    "build_hash" : "22e1767283e61a198cb4db791ea66e3f11ab9910",
    "build_date" : "2019-09-27T08:36:48.569419Z",
    "build_snapshot" : false,
    "lucene_version" : "8.2.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```
### Cài đặt Logstash
Logstash yêu cầu Java 8 hoặc Java 11 để chạy, vì vậy tôi sẽ bắt đầu quá trình thiết lập Logstash với việc cài đặt Java:
```
sudo apt-get install default-jre
```
Xác minh java đã được cài đặt:
```
java -version
openjdk version "1.8.0_222"
OpenJDK Runtime Environment (build 1.8.0_222-8u222-b10-1ubuntu1~18.04.1-b10)
OpenJDK 64-Bit Server VM (build 25.222-b10, mixed mode)
```
Vì tôi đã xác định kho lưu trữ trong hệ thống, tất cả những gì chúng tôi phải làm để cài đặt Logstash là chạy:
```
sudo apt-get install logstash
```
Tôi sẽ quay lại chạy Logstash sau khi cài đặt và chạy Kibana
### Cài đặt Kibana
Bạn có thể cài đặt Kibana với câu lệnh:
```
sudo apt-get update && sudo apt-get install kibana
```
Bây giờ, bắt đầu Kibana với:
```
sudo service kibana start
```
### Cài đặt Filebeat
Cài đặt **Filebeat** với các câu lệnh:
```
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.4.0-amd64.deb
sudo dpkg -i filebeat-7.4.0-amd64.deb
```
Khởi chạy **Filebeat** và sau đó là **Logstash** mà tôi đã cài đặt trước đó:
```
sudo systemctl start filebeat
sudo systemctl start logstash
```
Xác nhận là **Kibana**, **Logstash**, **Filebeat** của bạn đã chạy thành công với các câu lệnh:
```
sudo systemctl status kibana
sudo systemctl status logstash
sudo systemctl status filebeat
```
Đèn báo xanh là bạn đã chạy thành công. Ví dụ:
```
● kibana.service - Kibana
   Loaded: loaded (/etc/systemd/system/kibana.service; disabled; vendor preset: enabled)
   Active: active (running) since Thu 2019-10-17 21:15:41 +07; 1h 55min ago
 Main PID: 5073 (node)
    Tasks: 21 (limit: 4915)
   CGroup: /system.slice/kibana.service
           └─5073 /usr/share/kibana/bin/../node/bin/node /usr/share/kibana/bin/../src/cli -c /etc/kibana/kibana.yml

Thg 10 17 21:20:23 hoanghung kibana[5073]: {"type":"response","@timestamp":"2019-10-17T14:20:23Z","tags":[],"pid":5073,"method":"get","statusCod
Thg 10 17 21:20:23 hoanghung kibana[5073]: {"type":"response","@timestamp":"2019-10-17T14:20:23Z","tags":[],"pid":5073,"method":"post","statusCo
Thg 10 17 21:20:23 hoanghung kibana[5073]: {"type":"response","@timestamp":"2019-10-17T14:20:23Z","tags":[],"pid":5073,"method":"get","statusCod
Thg 10 17 21:20:23 hoanghung kibana[5073]: {"type":"response","@timestamp":"2019-10-17T14:20:23Z","tags":[],"pid":5073,"method":"put","statusCod
Thg 10 17 21:20:32 hoanghung kibana[5073]: {"type":"response","@timestamp":"2019-10-17T14:20:32Z","tags":[],"pid":5073,"method":"get","statusCod
Thg 10 17 21:20:33 hoanghung kibana[5073]: {"type":"response","@timestamp":"2019-10-17T14:20:32Z","tags":[],"pid":5073,"method":"get","statusCod
Thg 10 17 21:20:33 hoanghung kibana[5073]: {"type":"response","@timestamp":"2019-10-17T14:20:33Z","tags":[],"pid":5073,"method":"post","statusCo
Thg 10 17 21:20:35 hoanghung kibana[5073]: {"type":"response","@timestamp":"2019-10-17T14:20:35Z","tags":[],"pid":5073,"method":"get","statusCod
Thg 10 17 21:20:36 hoanghung kibana[5073]: {"type":"response","@timestamp":"2019-10-17T14:20:36Z","tags":[],"pid":5073,"method":"post","statusCo
Thg 10 17 21:20:37 hoanghung kibana[5073]: {"type":"response","@timestamp":"2019-10-17T14:20:37Z","tags":[],"pid":5073,"method":"get","statusCod
```
## Cấu hình với Rails app
Tiếp theo chúng mình sẽ tiến hành config elk với rails app để hiển thị log trên **Kibana** thông qua **Logstash** và gem *logstash-logger*
### Cấu hình Logstash
Cấu hình cho Logstash trong chuỗi xử lý log tương ứng với 3 modules:
1. **Input**: tiếp nhận/thu thập dữ liệu log ở dạng thô từ nhiều nguồn khác nhau (filebeat, redis, syslog, ...).
2. **Filter**: sau khi tiếp nhận dữ liệu sẽ tiến hành xử lý (thêm, sửa, xóa) để xây dựng cấu trúc log event như mong muốn.
3. **Output**: sau cùng là chuyển tiếp dữ liệu log event về cho **Elasticsearch** tiếp nhận lưu trữ log hoặc hiển thị log với **Kibana**.

![alt](https://images.viblo.asia/7473415f-6f36-4f9c-9f76-0f8c9c74c182.jpeg)

```
$ cd /etc/logstash/conf.d
$ sudo touch 01-rails-development.conf 02-beats-input.conf 10-syslog-filter.conf 30-elasticsearch-output.conf
```
Tôi đang làm trên app mẫu của tôi có tên là r-oe17-p2-park-booking và tôi đặt nội dung của các file cấu hình như sau:
1. **01-rails-development.conf**
```
input {
  file {
    path => "/home/hoanghung/r-oe17-p2-park-booking/log/development.log"
    type => "rails"
    codec => json {
      charset => "UTF-8"
    }
  }
}
filter {
  ruby {
    init => "require 'digest/sha1'; require 'json'"
    code => "event['fingerprint'] = Digest::SHA1.hexdigest event.to_json"
  }
}
output {
  elasticsearch {
    hosts => ["localhost:9200"]
    document_id => "%{fingerprint}"
    index => "logstash-%{type}-%{+YYYY.MM.dd}"
  }
}
```
2. **02-beats-input.conf**
```
input {
  beats {
    port => 5044
  }
}
```
3. **10-syslog-filter.conf**
```
filter {
  if [type] == "syslog" {
    grok {
      match => { "message" => "%{SYSLOGTIMESTAMP:syslog_timestamp} %{SYSLOGHOST:syslog_hostname} %{DATA:syslog_program}(?:\[%{POSINT:syslog_pid}\])?: %{GREEDYDATA:syslog_message}" }
      add_field => [ "received_at", "%{@timestamp}" ]
      add_field => [ "received_from", "%{host}" ]
    }
    syslog_pri { }
    date {
      match => [ "syslog_timestamp", "MMM  d HH:mm:ss", "MMM dd HH:mm:ss" ]
    }
  }
}
```
4. **30-elasticsearch-output.conf**
```
output {
  elasticsearch {
    hosts => ["localhost:9200"]
    sniffing => true
    manage_template => false
    index => "%{[@metadata][beat]}-%{+YYYY.MM.dd}"
    document_type => "%{[@metadata][type]}"
  }
}
```
### Cấu hình Rails
Thêm gem *"logstash-logger"* vào Gemfile và chạy bundle install.
Tại file *environments/development.rb* tôi thêm:
```
config.logstash.type = :file
config.logstash.path = "log/development.log"
```
Sau đó tôi restart lại **Logstash**:
```
$ sudo service logstash restart
```
## Khởi động Rails app và Kibana
Mở **Kibana** trong trình duyệt của bạn với: http://localhost:5601. Bạn sẽ thấy giao diện trang chủ **Kibana**:

![alt](https://images.viblo.asia/a9bdc125-161c-4225-82ea-52b2706d356c.png)

Khởi động Rails app và quay lại Kibana, bạn sẽ quan sát thấy log đã được hiển thị ở tab Discover:

![alt](https://images.viblo.asia/1970b5bd-382d-4717-a12a-6eb3486a6b0f.png)

![alt](https://images.viblo.asia/cf8b7f81-51d3-4da6-96c4-a867c5e90cc9.png)

## Kết luận
Trên đây là bài viết cài đặt và cấu hình ELK (Elasticsearch - Logstash - Kibana) với ứng dụng Rails mà tôi đã tìm hiểu được. Bạn có thể tìm hiểu sâu hơn về ELK tại [đây](https://www.elastic.co/products/elastic-stack)
Tham khảo từ: [https://logz.io/learn/complete-guide-elk-stack/#intro](https://logz.io/learn/complete-guide-elk-stack/#intro)