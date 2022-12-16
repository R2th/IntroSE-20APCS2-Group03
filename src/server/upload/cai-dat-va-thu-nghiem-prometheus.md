Tiếp nối sau bài [Prometheus là gì ?](https://viblo.asia/p/prometheus-la-gi-924lJ3805PM) , ở bài này mình sẽ giới thiệu các bạn cách thử nghiệm nhanh Prometheus. Sau khi tìm hiểu tính năng và định nghĩa chung của Prometheus chắc hẳn các bạn đang muốn xem nó hoạt động thực sự như thế nào.

Cùng mình thử nghiệm Prometheus trên môi trường Development trước khi quyết định triển khai trên môi trường Production nhé.

#### Môi trường cài đặt Prometheus
Hiện có 2 cách thông dụng nhất là cài đặt bằng Docker container hoặc trên máy chủ Linux. Tuy nhiên để tối giản thời gian thử nghiệm mình sẽ làm trên Docker container Lab, môi trường máy chủ cũng sẽ tương tự, không khác nhiều cách cấu hình. Có điều chú ý là trên Container khá thoải mái với việc Port và Network Group, các bạn cần rất cẩn thận bảo mật phần giao tiếp với các dịch vụ khác khi cài đặt trên máy chủ kết nối internet.

#### Cài đặt Prometheus trên môi trường Linux
Hiện tại Docker Hub đã có image Prometheus "officially" tuy nhiên hãy làm quen việc cài đặt từ source code để sau này có thể thực hiện trên máy chủ thật.
Đầu tiên các bạn hãy chạy một Container vói Image `ubuntu:16.04`

##### Tạo Docker network riêng:

```bash
$ docker network create --driver bridge lab-prom
```

##### Chạy container ubuntu:

```bash
$ docker run -itd --network=lab-prom -v /Users/vulong/Downloads/lab-prom/prom-1:/var/log -p 9090:9090 --name prom-1 ubuntu:16.04
```

##### Cài đặt Prometheus phiên bản công bố mới nhất. 
Các bạn có thể tìm các phiên bản Prometheus [tại đây](https://github.com/prometheus/). Sử dụng wget để tải xuống bản Release:

```bash
$ cd /opt/
$ wget https://github.com/prometheus/prometheus/releases/download/v2.20.1/prometheus-2.20.1.linux-amd64.tar.gz
$ tar -xzvf prometheus-2.20.1.linux-amd64.tar.gz
```

##### Tạo user riêng:

```bash
$ useradd --no-create-home --shell /bin/false prometheus
```

* prometheus.yml: Đây là file cấu hình của Prometheus, bằng cách chỉnh sửa file này bạn có thể tuỳ chỉnh Prometheus server theo cách của bạn. Các bạn có thể tham khảo thêm tại Prometheus configuration.

* prometheus: Là một binary file. Bạn có thể thực thi file này để khởi chạy Prometheus.

* promtool: Là một tool giúp bạn kiểm tra các thiết lập cho Prometheus.

##### Di chuyển các file về vị trí hợp lý và cấp quyền cho user promethus với promethus file:

```bash
mkdir /etc/prometheus
mkdir /var/lib/prometheus
chown prometheus:prometheus /etc/prometheus
chown prometheus:prometheus /var/lib/prometheus


cp prometheus-2.20.1.linux-amd64/prometheus /usr/local/bin/
cp prometheus-2.20.1.linux-amd64/promtool /usr/local/bin/
chown prometheus:prometheus /usr/local/bin/prometheus
chown prometheus:prometheus /usr/local/bin/promtool
chmod +x /usr/local/bin/prometheus /usr/local/bin/promtool


cp -r prometheus-2.20.1.linux-amd64/consoles /etc/prometheus
cp -r prometheus-2.20.1.linux-amd64/console_libraries /etc/prometheus
chown -R prometheus:prometheus /etc/prometheus/consoles
chown -R prometheus:prometheus /etc/prometheus/console_libraries
```

##### Tạo file cấu hình với nội dung như sau:
```bash
$ vi /etc/prometheus/prometheus.yml
```
```yaml
global:
  scrape_interval: 10s

scrape_configs:
  - job_name: 'prometheus_master'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```

* global: Có tác dụng nên toàn bộ các cấu  hình dịch vụ cần theo dõi.
* scrape_configs: Bao gồm các cấu hình dịch vụ cần lấy dữ liệu theo dõi. Một dịch vụ có thể có nhiều target để lấy dữ liệu.
* scrape_interval: Thời gian định kỳ lấy dữ liệu.

##### Tạo một thư mục để lưu dữ liệu cho Prometheus:

```bash
$ sudo mkdir -p /data/prometheus
```

##### Chạy service Prometheus với các file config đã copy phía trên:

```bash
$ /usr/local/bin/prometheus \
--config.file=/etc/prometheus/prometheus.yml \
--storage.tsdb.path=/prometheus \
--web.console.libraries=/usr/share/prometheus/console_libraries \
--web.console.templates=/usr/share/prometheus/consoles
```

Sau khi chạy thành công bạn có thể vào website quản lý ở máy host với địa chỉ ```http://127.0.0.1:9090```

![](https://images.viblo.asia/bd2145d0-776f-4091-a5d4-5ad8e7f6a84c.png)

##### Thử nghiệm với Apache ActiveMQ
Hiện tại với 1 server Prometheus nó sẽ tự thu thập dữ liệu của chính nó. Để thử nghiệm việc lấy dữ liệu thực tế các dịch vụ khác, mình sẽ dựng thêm một container chạy Apache ActiveMQ. Như đã nêu ở bài trước những dịch vụ cần theo dõi theo thời gian như Queue sẽ rất thích hợp khi áp dụng Prometheus.

Chạy Container với image ```vromero/activemq-artemis```:

```bash
$ docker run -it --rm \
    --network=lab-prom \
    -p 8161:8161 \
    -p 61616:61616 \
    -e ARTEMIS_USERNAME=admin \
    -e ARTEMIS_PASSWORD=123456 \
    -e ENABLE_JMX=true \
    -e JMX_PORT=1199 \
    -e JMX_RMI_PORT=1198 \
    -p 9404:9404 \
    -e ENABLE_JMX_EXPORTER=true \
    --name acqueue
    vromero/activemq-artemis
```

Các bạn có thể tìm hiểu thêm cách config image này tại [Github của tác giả](https://github.com/vromero/activemq-artemis-docker/blob/master/README.md).

Image này đã có sẵn Exporter nên chúng ta chỉ cần khai báo target để Prometheus lấy thông tin

Endpoint: `acqueue:9404`

Chúng ta sửa lại `/etc/prometheus/prometheus.yml` một chút:

```yaml
global:
  scrape_interval: 10s

scrape_configs:
  - job_name: 'prometheus_master'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'activemq_artemis'
    scrape_interval: 5s
    static_configs:
      - targets: ['acqueue:9404']
```
##### Khởi động lại Prometheus và xem thử Graph

![](https://images.viblo.asia/a0480e18-389a-4b16-b34c-f1c94fba2cfe.png)

Đây là dữ liệu số lượng Message trong queue ```do-somethings```. Các bạn có thể thấy số lượng message tăng đến 10 và giữ nguyên, sau đó 1 khoảng thời gian bắt đầu giảm. Điều này có thể tạm cho rằng phía Dequeue đang có vấn đề, cần kiểm tra phần đó trước, sau đó kiểm tra đến server ActiveMQ và cuối cùng là các network có liên quan.

#### Kết luận
Về cơ bản dựa vào những thông số theo thời gian trên, chúng ta có thể biết được sớm những hiện tượng gây lỗi cho hệ thống. Để các Chart và màu sắc đẹp hơn, dễ nhìn hơn, ở bài viết sau mình sẽ thử nghiệm thêm Grafana và kết nối với các dịch vụ Alert.