References: https://stackjava.com/elasticsearch/huong-dan-cai-dat-elasticsearch-tren-ubuntu-16-04.html

(Xem thêm: [Hướng dẫn toàn bộ Elasticsearch](https://stackjava.com/elasticsearch))

(Xem thêm: [Hướng dẫn cài đặt Elasticsearch trên Windows 10](https://stackjava.com/elasticsearch/huong-dan-cai-dat-elasticsearch-tren-windows-10.html))

## Yêu cầu
Elasticsearch yêu cầu Java 8 trở lên và phải thiết lập biến môi trường `JAVA_HOME` cho java, do đó trước khi cài Elasticsearch, hãy chắc chắn rằng bạn đã cài Java version >= 8 trên máy rồi nhé.

Kiểm tra bằng lệnh `java -version` để biết máy máy mình đã cài Java chưa và phiên bản Java đang cài là bao nhiêu:

![](https://stackjava.com/wp-content/uploads/2018/07/ubuntu-install-elasticsearch-0-1.png)

Kiểm tra biến môi trường `JAVA_HOME` đã được thiết lập chưa bằng lệnh: `echo $JAVA_HOME`

![](https://stackjava.com/wp-content/uploads/2018/05/ubuntu-install-elasticsearch-0.png)

(Xem lại: [Cài đặt Java và thiết lập biến môi trường trên Ubuntu](https://stackjava.com/install/cai-dat-java-tren-linux-ubuntu-oracle-jdk-open-jdk.html))

## Cài đặt Elasticsearch

Download và cài đặt Elasticsearch PGP Key bằng lệnh sau:
```
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
```

Để cài đặt Elasticsearch trên Ubuntu ta có 2 cách là cài từ Repository hoặc cài từ file .deb

**Cách 1: Cách Elasticsearch bằng APT Repository**

Cài gói `apt-transport-https`

```
sudo apt-get install apt-transport-https
```
Lưu định nghĩa repository vào `/etc/apt/sources.list.d/elastic-6.x.list`:

(Repository mặc định ko có elasticsearch)

```
echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-6.x.list
```

Cài đặt Elasticsearch bằng lệnh:

```
sudo apt-get update && sudo apt-get install elasticsearch
```
Done!

**Cách 2: cài đặt elasticsearch bằng gói .deb**

Chạy các lệnh dưới đây để tải và cài đặt elasticsearch bằng file .deb

```
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.4.0.deb
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.4.0.deb.sha512
shasum -a 512 -c elasticsearch-6.4.0.deb.sha512 
sudo dpkg -i elasticsearch-6.4.0.deb
```
Done!

## Chạy elasticsearch.
Elasticsearch sau khi được cài đặt sẽ không tự động chạy.

Để khởi động, start, stop elasticsearch ta làm như sau:

Kích hoạt serivce elasticsearch và tự động start khi khởi động máy:

```
sudo /bin/systemctl daemon-reload
sudo /bin/systemctl enable elasticsearch.service
```

Để start, stop, xem thông tin service elasticsearch ta dùng các lệnh sau:

```
sudo systemctl start elasticsearch
sudo systemctl stop elasticsearch
sudo systemctl status elasticsearch
```
## Demo:
Start elasticsearch và xem trạng thái:

![](https://stackjava.com/wp-content/uploads/2018/07/ubuntu-install-elasticsearch-2.png)

Sau khi cài đặt và start serice elasticsearch, mặc định elasticsearch sẽ chạy trên cổng 9200.

Các bạn có thể dùng lệnh `curl localhost:9200`  hoặc truy cập url `localhost:9200` trên trình duyệt để xem thông tin elasticsearch:

![](https://stackjava.com/wp-content/uploads/2018/07/ubuntu-install-elasticsearch-3.png)

![](https://stackjava.com/wp-content/uploads/2018/07/ubuntu-install-elasticsearch-4.png)

Okay, Done!

References:
[https://stackjava.com/elasticsearch/huong-dan-cai-dat-elasticsearch-tren-ubuntu-16-04.html](https://stackjava.com/elasticsearch/huong-dan-cai-dat-elasticsearch-tren-ubuntu-16-04.html)

[https://www.elastic.co/…/current/deb.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html)