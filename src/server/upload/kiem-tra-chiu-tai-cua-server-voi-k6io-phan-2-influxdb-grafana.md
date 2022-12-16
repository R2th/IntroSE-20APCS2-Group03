# Mở đầu 
Ở phần trước mình đã giới thiệu sơ qua về kiểm tra chịu tải của server với k6.io, cách settup , visualization kết quả với cloud k6 tuy nhiên do dùng bản miễn phí nên vẫn còn nhiều giới hạn ví dụ chỉ có thể visualization được 50 user trong 12 phút. Muốn nhiều hơn chúng ta phải trả phí. vì vậy hôm nay mình viết tiếp phần 2 hướng dẫn visualization kết quả hoàn toàn miễn phí mà không bị giới hạn với InfluxDB + Grafana. 

Các bạn có thể xem qua phần 1 ở đây: 
[Kiểm tra chịu tải của server với K6.io (Phần 1)](https://viblo.asia/p/kiem-tra-chiu-tai-cua-server-voi-k6io-phan-1-bWrZnVywZxw)

![](https://k6.io/docs/static/5b7ecf17cae56371683a7ecdce447a4b/ce447/grafana-visualization.png)
# InfluxDB
InfluxDB là một cơ sở dữ liệu chuỗi thời gian nguồn mở được phát triển bởi InfluxData. Ở bài viết này sẽ dùng với mục đích lưu lại các thông số mà k6 thu thập được từ việc chạy test.

Những tính năng chính mà Influxdb hỗ trợ có thể kể đến như :

* Có các API đọc ghi dễ hiểu, hiệu suất cao
* Plugin hỗ trợ cho các giao thức nhập dữ liệu khác như Graphite, collectd và OpenTSDB (Phần này trong khuôn khổ bài viết mình chưa thể thực nghiệm)
*  Câu query tương đồng với SQL do đó rất dễ để những người đã có base về SQL ứng dụng
* Đánh index theo các trường tags giúp truy vấn tốc độ. 
* Các truy vấn liên tục tự động tính toán dữ liệu tổng hợp để làm cho các truy vấn thường xuyên hiệu quả hơn. Và cuối cùng thì Influxdb có cả mã nguồn mở và phiên bản cho enterprise

## Cái đặt InfluxDB
### Linux (Debian/Ubuntu)
```
$ sudo apt install influxdb
```

### macOS
```
$ brew install influxdb
```
## Chạy k6 test và upload kết quả vào InfluxDB
k6 có hỗ trợ tích hợp để xuất dữ liệu kết quả trực tiếp tới cơ sở dữ liệu InfluxDB bằng cách sử dụng option --out (-o)

### Linux & MacOS
```
k6 run --out influxdb=http://localhost:8086/myk6db script.js
```
### Docker
```
docker run -i loadimpact/k6 run --out influxdb=http://localhost:8086/myk6db - <script.js
```
# Grafana
Grafana là một nền tảng open-source chuyên phục vụ mục đích theo dõi và đánh giá các số liệu thu được. Bất kì lĩnh vực nào có thể thu được dữ liệu theo dòng thời gian đều có thể hiển thị tối ưu trên Grafana. Ngoài khả năng kết nối đa dạng với các nguồn dữ liệu, phần giao diện của công cụ này rất thân thiền với người dùng. Dễ dàng đưa ra thông tin và cảnh báo.

## Cài đặt Grafana
```
$ sudo apt install grafana
```

### macOS
```
$ brew install grafana
```

Sau khi cài đặt xong grafana chúng ta đã có InfluxDB server chạy ở cổng 8086 và Grafana server chạy ở cổng 3000. Tiếp theo chúng ta có thể visualize k6 metrics rồi. 

# Sử dụng docker-compose được settup sẵn 
Để thay thế các cài đặt bên trên, thì k6 cũng đã xây dựng sẵn file docker-composer giúp cài đặt nhanh chóng  InfluxDB và Grafana. Để sử dụng chỉ cần chạy lệnh: 
```
$ git clone 'https://github.com/k6io/k6'
$ cd k6
$ docker-compose up -d \
    influxdb \
    grafana
```

Truy cập vào Grafana server http://localhost:3000

![](https://images.viblo.asia/6431bee7-68ed-46d6-b3c9-3b5d2f185a56.png)
Vậy là ok rồi . tiếp theo là chạy test và visualize metrics.
Để chạy test thì mình cd vào thư mục k6/samples vào tạo file test với nội dùng sau: 
```k6/samples/blog.js
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400}, // beyond the breaking point
    { duration: '5m', target: 400},
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  http.get('https://phamtuananh1996.github.io');
  sleep(1);
}

```

Để chạy test dùng lệnh
```
docker-compose run -v \
    $PWD/samples:/scripts \
    k6 run /scripts/blog.js
```

Để visualize metrics thì mình sẽ dùng Grafana dashboards được cấu hình sẵn cho k6 được cộng đồng phát triển như:
* [dcadwallader](https://grafana.com/grafana/dashboards/2587)
* [Stian Øvrevåge](https://grafana.com/grafana/dashboards/4411)
* [cyaiox](https://grafana.com/grafana/dashboards/8156)
* [smockvavelsky](https://grafana.com/grafana/dashboards/10553)
* [K m](https://grafana.com/grafana/dashboards/10660)

Để sử dụng mình vào http://localhost:3000/dashboard/import để thêm id. Sau đó chọn InfluxDB data source

![](https://images.viblo.asia/80a5b45d-2214-44f5-a2a4-e40f1d1117ea.gif)

Sau khi chạy test đây là thành quả

![](https://images.viblo.asia/f73483a4-3c9c-460a-a9c2-30f3f97e0b90.png)

Vậy là chúng ta có thể visualize k6 metrics với giao diện trực quan và realtime rồi

# Kết luận
Cảm ơn các bạn đã đọc bài viết. nếu hay thì cho mình xin 1 upvote, chia sẻ nhé.

Tham khảo: https://k6.io/docs/results-visualization/influxdb-+-grafana

blog: https://phamtuananh1996.github.io