Mình đang tìm hiểu về Elasticsearch, mình đi dạo mọt vòng trên mạng để tìm hiểu cách cài công cụ này lên Ubutu. Nhưng không hiểu sao máy mình trở quẻ, mình đã thử cài theo 1 số hướng dẫn nhưng bị lỗi, nên mình mạo muội được chia sẻ lại cách cài đặt Elasticsearch.
Bài viết này của mình là tổng hợp kiến thức từ nhiều nguồn khác nhau =))))))))

Đâù tiên, Elasticsearch yêu cầu môi trường JDK (***Java Development Kit**  - là một gói các công cụ phát triển phần mềm dựa trên Java*) để có thể quẩy...
1. Install JDK
* Điều đầu tiên bạn nên luôn luôn làm là cập nhật hệ thống của bạn, chạy các lệnh sau:
```
apt-get update && apt-get upgrade
```
* Cài JDK và cấu hình JDK mặc định bằng lệnh:
```
apt-get install default-jdk
```
Sau khi cài đặt bạn có thể kiểm tra lại bằng các lệnh sau:
 java -version
 echo $JAVA_HOME
Môi trường JDK đã sẵn sàng, chúng ta sẽ chuyển tới bước cài đặt Elasticsearch

2. Install Elasticsearch

* Import GPG key 
 `sudo apt-get install apt-transport-https`
` wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -`

* Add repository 5.x
 `sudo add-apt-repository "deb https://artifacts.elastic.co/packages/5.x/apt stable main`"

*  Install:
 `sudo apt-get update`
` sudo apt-get install elasticsearch`

3. Configure
Mở file *elasticsearch.yml* bằng câu lệnh sau:
 sudo nano /etc/elasticsearch/elasticsearch.yml
... tiến hành chỉnh sửa một số chỗ trong file:
    `network.host: localhost`
    `http.port: 9200`

4. Launch Elasticsearch
Chạy lần lượt các câu lệnh sau:
`sudo ufw allow from anywhere to any port 9200`
`sudo ufw enable`
`sudo ufw status`
`sudo systemctl status elasticsearch`

`sudo /bin/systemctl enable elasticsearch.service`
`sudo systemctl start elasticsearch.service`
`sudo systemctl stop elasticsearch.service`

5. Kiểm tra cài đặt:
* Sử dụng câu lệnh: 
`curl -X GET localhost:9200`
* Kết quả các bạn sẽ được thấy một file json trông giống thế này, các thông số có thể khác chút ít, nhưng về cơ bản nó sẽ có dạng như thế này, và xin chúc mừng, bạn đã cài đặt thành công!
 ```
{
  "name" : "ZaOE-IQ",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "sBxAHZ0nQxWZ3ew_L8OOIw",
  "version" : {
    "number" : "6.8.1",
    "build_flavor" : "default",
    "build_type" : "deb",
    "build_hash" : "1fad4e1",
    "build_date" : "2019-06-18T13:16:52.517138Z",
    "build_snapshot" : false,
    "lucene_version" : "7.7.0",
    "minimum_wire_compatibility_version" : "5.6.0",
    "minimum_index_compatibility_version" : "5.0.0"
  },
  "tagline" : "You Know, for Search"
}
```


* Bài viết này được tham khảo từ:
>  https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-elasticsearch-on-ubuntu-16-04
* Nếu bạn muốn cài đặt một phiên bản khác, có thể tham khảo tại link:
> https://www.elastic.co/guide/en/beats/libbeat/5.6/elasticsearch-installation.html`
* Nếu bạn muốn xóa phiên bản hiện tại, bạn có thể tham khảo theo link này:
> https://serverfault.com/questions/699977/ubuntu-uninstall-elasticsearch