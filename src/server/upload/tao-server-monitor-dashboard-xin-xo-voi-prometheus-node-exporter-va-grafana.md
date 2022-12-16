![](https://images.viblo.asia/d91c505e-5845-4d3c-a68f-cd6d3fdb1f17.jpg)

### Mở đầu
Thông thường để xem các thông số hệ thống như CPU, RAM, ổ cứng bạn hoàn toàn có thể sử dụng command line để xem các thông tin đó. Tuy nhiên để để thuận tiện hơn cho việc quan sát những thông số về hệ thống chúng ta cần có những giải pháp trực quan, tiện lợi giúp cho những công việc đó trở nên đơn giản hơn. Chúng ta sẽ cùng nhau xây dựng một dashboard giúp quan sát những thông số đó bằng cách sử dụng `Prometheus`. Nếu bạn chưa biết về `Prometheus` mình đã có bài viết giới thiệu về [Prometheus](https://viblo.asia/p/gioi-thieu-cong-cu-prometheus-va-cach-cai-dat-tren-moi-truong-linux-4P856vOR5Y3). Các bạn hãy đọc bài viết trước và cài đặt `Prometheus` trước khi tiếp tục đọc bài viết này. Như đã nói trong bài viết trước chúng ta có thể sử dụng các `exporter` cho việc xuất các dữ liệu cần thiết cho `Prometheus`. Trong bài viết này mình sẽ sử dụng một exporter để xuất dữ liệu về hệ thống như các thông số về CPU, RAM, ... cho `Prometheus` đó là `Node Exporter`.

#### Cài đặt Node Exporter
Việc thiết lập cài đặt `Node Exporter` khá giống với việc chúng ta cài đặt `Prometheus` trong bài viết trước. Chúng ta cùng nhau cài đặt `Node Exporter` như một service chạy trên hệ điều hành Linux của chúng ta.
Đầu tiên chúng ta cần tải phiên bản mới nhất của `Node Exporter` về. Các bạn có thể tìm kiếm phiên bản của `Node Exporter` tại [https://prometheus.io/download/](https://prometheus.io/download/).
```bash
$ wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz
```

Tiếp theo là giải nén thư mục chúng ta vừa mới tải về:
```bash
$ tar xvzf node_exporter-1.0.1.linux-amd64.tar.gz
```

Tạo một user cho việc quản lý exporter:
```bash
$ sudo useradd -rs /bin/false node_exporter
```

Copy binary file trong thư mục đã giải nén tới địa chỉ `/usr/local/bin`:
```bash
$ cd node_exporter-1.0.1.linux-amd64/
$ cp node_exporter /usr/local/bin
```

Thiết lập quyền cho binary file:
```bash
$ chown node_exporter:node_exporter /usr/local/bin/node_exporter
```

Tạo một service cho việc chạy `Node Exporter`
```bash
$ cd /lib/systemd/system
$ sudo vim node_exporter.service
```

Thêm nội dung như sau vào service file:
```shell
[Unit]
Description=Node Exporter
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
```

Khởi chạy service chúng ta vừa mới tạo:
```bash
$ sudo systemctl daemon-reload
$ sudo systemctl start node_exporter
```

Kiểm tra service với lệnh:
```bash
sudo systemctl status node_exporter
```
![](https://images.viblo.asia/888d2d2a-7aab-456d-873b-675717c56ca4.png)

Như hình bên trên là service của chúng ta đã hoạt động. Mặc định của `Node Exporter` sẽ hoạt động tại cổng `9100`.

Chúng ta có thể kiểm tra bằng cách truy cập vào địa chỉ [http://localhost:9100/metrics](http://localhost:9100/metrics)

Sau khi `Node Exporter` đã hoạt động chúng ta cần chỉnh sửa file cấu hình của Prometheus là `prometheus.yml` trong bài viết trước để `Prometheus` có thể lấy được dữ liệu từ `Node Exporter`. Mình thay đổi thiết lập global > scrape_interval về 1s để có thể cào dữ liệu mỗi giây và static_configs thêm địa chỉ để lấy dữ liệu về từ `Node Exporter`.

![](https://images.viblo.asia/e4aaa763-4886-4709-9c03-c8633f062fe6.png)
Như vậy chúng ta đã hoàn thành công việc thiết lập `Node Exporter` và xuất dữ liệu cho `Prometheus`. Dữ liệu chúng ta đã có, để có thể sử dụng dữ liệu và hiển thị trên một dashboard mình sử dụng thêm một công cụ có tên là `Grafana`.

#### Grafana và cài đặt
`Grafana` là một nền tảng dùng cho việc xây dựng các hệ thống analystics và monitoring. Dựa vào các metric đã thu thập được thông qua `Grafana` chúng ta có thể tạo ra các dashboard giúp trực quan hóa các metric. Việc xây dựng các dashboard là một công việc quan trọng trong monitoring, bằng việc sử dụng `Grafana` chúng ta chúng ta có thể áp dụng được cho rất nhiều các giải pháp khác nhau như Prometheus, InfluxDB, ElasticSearch, Loki, ...

Để cài đặt `Grafana` hết sức đơn giản, chúng ta có thể tại Grafana về tại [https://grafana.com/grafana/download](https://grafana.com/grafana/download) thực hiện cài đặt theo hướng dẫn và start service.
```bash
$ sudo systemctl status grafana-server
```
Mặc định Grafana sẽ khởi chạy tại cổng 3000. Chúng ta sẽ truy cập tại địa chỉ [http://localhost:3000](http://localhost:3000). Một trang web hiện ra và thực hiện đăng nhập với tài khoản mặc định là `admin` và mật khẩu là `admin`. Sau khi đăng nhập lần đầu chúng ta thực hiện việc thay đổi mật khẩu mặc định và chúng ta vào được giao diện quản lý của Grafana.
Chúng ta vào Configuration và thực hiện add Data source từ Prometheus và thiết lập.

![](https://images.viblo.asia/6efa38ac-8166-4e3f-a97f-5b7a0dabeb50.png)

![](https://images.viblo.asia/56af1c6a-c338-4117-9aa6-580033b7cd5d.png)

Tiếp theo chúng ta tạo một Dashboard cho `Node Exporter` một cách đơn giản nhất là sử dụng những Dashboard đã được xây dựng sẵn. Có rất nhiều Dashboard đã được xây dựng sẵn với nhiều mục đich chúng ta có thể tìm kiếm được tại đây [https://grafana.com/grafana/dashboards](https://grafana.com/grafana/dashboards). Trong bài viết này mình sử dụng một Dashboard cho `Node Exporter` có tên là `Node Exporter Full` các bạn có thể tìm kiếm tại địa chỉ trên. Dashboard này có **ID 1860** chúng ta có thể lấy được dễ dàng thông qua URL.

![](https://images.viblo.asia/5429ba34-1e79-48b9-8283-a490fd69ada0.png)

Để import Dashboard bạn click vào nút dấu cộng và chọn import. Nhập ID của Dashboard và chọn Load một màn hình config hiện ra, chúng ta chọn Data Source từ `Prometheus` đã tạo từ trước và nhấn vào import.

![](https://images.viblo.asia/944aeaed-2f3d-4563-9916-b6f4266b5e81.png)

**BÙM!!!**
Chúng ta có được một dashboard hết sức "xịn xò" trông như sau:

![](https://images.viblo.asia/80a4ce6d-2728-45e2-9c16-94e9c76a402d.png)

Chúng ta có thể xem được rất nhiều thông tin về hệ thống từ dashboard như thông tin về CPU, RAM, Network traffic, ... phục vụ rất tốt cho công việc monitoring của chúng ta.

#### Kết luận
Trong bài viết mình đã hướng dẫn cách cài đặt `Node Exporter` và `Grafana` để kết hợp với `Prometheus` tạo ra một Dashboard có khả năng monitor các thông số của hệ thống. Các bạn hoàn toàn có thể sử dụng dashboard này cho việc monitoring server của các bạn. Trong các bài viết tiếp theo mình sẽ tiếp tục chia sẻ thêm những tính năng hay ho của các công cụ trên. Các bạn hãy đón xem nhé, hy vọng bài viết sẽ có ích đối với các bạn.

#### Tham khảo

[https://devconnected.com/](https://devconnected.com/)

[https://grafana.com/](https://grafana.com/)

[https://prometheus.io/](https://prometheus.io/)