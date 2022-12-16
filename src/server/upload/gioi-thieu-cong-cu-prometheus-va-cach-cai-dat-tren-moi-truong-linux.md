![](https://images.viblo.asia/9da1491f-a27c-46fd-a519-b48e0ab2f9a6.png)

#### Prometheus là gì?
`Prometheus` là một hệ thống giám sát (monitoring system) và bộ công cụ cảnh báo (alerting toolkit) mã nguồn mở. Dữ liệu sử dụng trong `Prometheus` là `time series database`, đây là một khái niệm sử dụng để mô tả những database chuyên dụng được sinh ra cho việc tối ưu lưu trữ dữ liệu theo các mốc thời gian, có thể kể đến như các thông số về tình trạng server, lượng tài nguyên RAM, CPU tiêu thụ, ... 
Các thông số này được lưu dưới dạng các mốc thời gian, từ những dữ liệu đó ta có thể xử lý để mô phỏng thành các biểu đồ giúp dễ dàng quan sát sự biến đổi của dữ liệu theo các mốc thời gian nhờ đó có thể nắm bắt được tình trạng của server để phát hiện những vấn đề và đưa ra cách giải quyết một cách kịp thời.

#### Cách thức hoạt động của Prometheus

![](https://images.viblo.asia/5c075f8a-6a5b-4bbd-b756-ac4fe24dfde1.png)
`Prometheus` sẽ `pull` các dữ liệu về thông qua giao thức `HTTP` theo mỗi khoảng thời gian được chúng ta thiết lập thông qua các cách khác nhau:

1. **Instrumenting:**  Có thể được hiểu là các thư viện được xây dựng, tích hợp vào các hệ thống để có thể tuỳ biến những dự liệu của hệ thống và hiển thị các số liệu tương thích với Prometheus trên một URL nhất định. Prometheus sẽ thực hiện việc cào dữ liệu định kỳ trên URL đó để lấy các thông tin.
2. **Exporters:** Là những ứng dụng được viết sẵn tương thích với các công nghệ, service phổ biến hiện có như MongoDB, SQL, server, ... Bản thân những service này không thể tự export dữ liệu cho Prometheus nên cần những Exporter hỗ trợ làm việc này.
3. **Pushgateway:** Bạn định nghĩa các batchs, jobs để export dữ liệu tương thích bới Prometheus và push chúng tới một gateway để cho Prometheus có thể pull về.


#### Cài đặt Prometheus trên môi trường Linux
Để cài đặt Prometheus đầu tiên chúng ra cài tải phiên bản `Prometheus` thích hợp về máy. Các bạn có thể tìm các phiên bản `Prometheus` tại [đây](https://prometheus.io/download/). Ở thời điểm mình viết bài viết này phiên bản mới nhất của prometheus là `
2.20.0-rc.1`. Các bạn có thể tải thông qua `wget` bằng lệnh như sau:

```
$ wget https://github.com/prometheus/prometheus/releases/download/v2.20.0-rc.1/prometheus-2.20.0-rc.1.linux-amd64.tar.gz
```

Tiếp theo chúng ta giải nén thư mục `prometheus-2.20.0-rc.1.linux-amd64.tar.gz` mà chúng ta đã tải về:

```
$ tar xvzf prometheus-2.20.0-rc.1.linux-amd64.tar.gz
```

Sau khi giải nén ta thu được thư mục với nội dung như sau:
![](https://images.viblo.asia/9e7adf6f-e305-4ef3-875d-cbb981800da6.png)
Ở đây có một số file chúng ta cần chú ý như:
* **prometheus.yml:** Đây là file cấu hình của Prometheus, bằng cách chỉnh sửa file này bạn có thể tuỳ chỉnh Prometheus server theo cách của bạn. Các bạn có thể tham khảo thêm tại [Prometheus configuration](https://prometheus.io/docs/prometheus/latest/configuration/configuration/).
* **prometheus:** Là một binary file. Bạn có thể thực thi file này để khởi chạy Prometheus.
* **promtool:** Là một tool giúp bạn kiểm tra các thiết lập cho Prometheus.

Một cách "nông dân" chúng ta hoàn toàn có thể chạy trực tiếp file `prometheus`. Nhưng chúng ta cùng thiết lập để chạy  `Prometheus` như một service trên môi trường Linux.

Để bảo mật chúng ta tạo một user và một group để quản lý `Prometheus`:
```
$ sudo useradd -rs /bin/false prometheus
```

Tiếp theo chúng ta di chuyển các file binary trong thư mục đã giải nén về `/usr/local/bin`:

```
$ sudo cp prometheus promtool /usr/local/bin
```

Cấp quyền cho user chúng ta đã tạo đối với promethus file:
```
$ sudo chown prometheus:prometheus /usr/local/bin/prometheus
```

Tạo 1 thư mục prometheus trong `/etc` và di chuyển các tài nguyên cần thiết:
```
$ sudo mkdir /etc/prometheus
$ sudo cp -R consoles/ console_libraries/ prometheus.yml /etc/prometheus
```
 Tạo một thư mục để lưu trữ dữ liệu cho Prometheus:
 ```
 sudo mkdir -p data/prometheus
 ```
 
 Cấp quyền có các thư mục vừa tạo:
 ```
 $ sudo chown -R prometheus:prometheus data/prometheus /etc/prometheus/*
 ```
 
 Khâu chuẩn bị đã xong, giờ chúng ta tạo một service để thực thi `Prometheus`. Di chuyển đến `/lib/systemd/system` và tạo 1 file `prometheus.service`:
 ```
$ cd /lib/systemd/system
$ sudo touch prometheus.service
 ```
 
 Định nghĩa file `prometheus.service` như sau:
 
 ```
 [Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=prometheus
Group=prometheus
ExecStart=/usr/local/bin/prometheus \
  --config.file=/etc/prometheus/prometheus.yml \
  --storage.tsdb.path=/data/prometheus \
  --web.console.templates=/etc/prometheus/consoles \
  --web.console.libraries=/etc/prometheus/console_libraries \
  --web.listen-address=0.0.0.0:9090 \
  --web.enable-admin-api

Restart=always

[Install]
WantedBy=multi-user.target
 ```
 
 Như vậy khi service start chương trình `prometheus` trong thư mục `/usr/local/bin` sẽ được thực thi với các param tương ứng đã được định nghĩa. Ta lưu lại file và thực hiện start service:
 ```
$ sudo systemctl enable prometheus
$ sudo systemctl start prometheus
 ```
 
 Check trạng thái của service với câu lệnh:
 ```
 $ sudo systemctl status prometheus
 ```
 Nếu trạng thái như sau tức là service chúng ta đã khởi chạy thành công:
 ![](https://images.viblo.asia/29475ee8-a5a4-4839-8d48-c36ba769333a.png)

Nếu service khởi chạy thất bại các bạn có thể sử dụng lệnh để có thể lấy thông tin về lỗi đã xảy ra và fix:
```
$ journalctl -xe
```

Sau khi service đã khởi chạy các bạn có thể truy cập vào địa chỉ [http://localhost:9090/graph](http://localhost:9090/graph). Mặc định Prometheus sẽ tự monitoring chính bản thân nó, chúng ta có thể thực thi các query và có thể xem các biểu đồ tương ứng:

![](https://images.viblo.asia/2841a666-8e56-4f56-b2fd-797980ba8f2d.png)

#### Lời kết
Qua bài viết mình đã hướng dẫn các bạn cách cài đặt và thiết lập `Prometheus` như một service trên môi trường Linux. Có thể các bạn chưa thấy được sức mạnh của Prometheus thông qua bài viết này nhưng đây là tiền đề cho những bài viết tiếp theo, ở bài viết tiếp theo mình sẽ hướng dẫn mọi người làm nhiều thứ hay ho hơn với `Prometheus` như monitor tài nguyên của server, monitor mongodb, ... thông qua các `exporter` và kết hợp với [Grafana](https://grafana.com/) để có những biểu đồ real-time xịn xò hỗ trợ cho việc monitoring một cách vô cùng hiệu quả. Hy vọng các bạn sẽ ủng hộ những bài viết tiếp theo của mình. :)

#### Tham khảo 
https://devconnected.com/

https://prometheus.io/