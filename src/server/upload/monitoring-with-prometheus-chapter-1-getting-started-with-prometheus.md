## Giới thiệu
Chào các bạn tới với Prometheus Series, ở bài trước chúng ta đã tìm hiểu sơ lược về Prometheus. Ở bài này, chúng ta sẽ tìm hiểu kỹ hơn về các khái niệm của Prometheus và kiến trúc của nó, sau đó ta sẽ cài đặt và cấu hình một Prometheus đơn giản.

![](https://images.viblo.asia/fee657b7-ef13-4850-8fe8-ca3618408aca.png)

Như ta đã nói ở bài trước Prometheus là một công cụ chuyên dùng trong việc giám sát hệ thống bằng cách thu thập dữ liệu tình trạng của các ứng dụng, vậy Prometheus sẽ thực hiện việc đó như thế nào?

## How does Prometheus work?
Prometheus sẽ thực việc thu thập dữ liệu bằng cách kéo dữ liệu từ các hạ tầng hoặc ứng dụng nó cần giám sát về. Các hạ tầng và ứng dụng mà Prometheus giám sát được gọi là targets, các targets này sẽ được định nghĩa trong file cấu hình của Prometheus.

Các targets cần phải cung cấp một HTTP endpoints, sau đó Prometheus sẽ kéo dữ liệu bằng cách gọi vào các endpoints và lưu kết quả mà endpoint trả về, những dữ liệu đó được gọi là time series data.

![](https://images.viblo.asia/1d998b3d-db13-4046-af4d-9b4cd5852e44.png)

Để targets có thể cung cấp được time series data thì ta sẽ có hai cách:
+ Đối với hạ tầng thì ta sẽ xài một công cụ gọi là exporters, ví dụ `prometheus/node_exporter` cho máy chủ.
+ Đối với ứng dụng thì ta sẽ cài thư viện tương ứng vào ứng dụng đó, ví dụ đối với ứng dụng JAVA thì ta xài `prometheus/client_java`.

Ta sẽ thường nghe thuật ngữ metrics, giải thích đơn giản metrics là tập họp của nhiều time series mà có tên giống nhau. Để hiểu hơn về time series và metrics được trả về từ các targets thì ta sẽ tìm hiểu cách dữ liệu được định dạng.

## Prometheus Data Model
Ví dụ một time series được trả về từ target có giá trị như sau:

```
container_cpu_load_average_10s{id="/docker", instance="10.0.2.15:8080", job="docker"} 0
```

Định đạng của dữ liệu ở trên như sau:

```
<metric name>{<label name>=<label value>, ...} <samples>
```

Tiếp theo là những thuật ngữ các bạn cần nhớ khi đi phỏng vấn:
+ Phần `<metric name>{<label name>=<label value>, ...}` được gọi là notation, nó là tập của metric name và một hoặc nhiều labels, notation sẽ được dùng để định nghĩa một time series.
+ Phần `<samples>` được gọi là Samples, nó là dữ liệu của time series, giá trị của nó là một số thuộc kiểu dữ liệu float64.
+ Phần `<metric name>` là tên của metric.
+ Phần `{<label name>=<label value>, ...}` sẽ chứa tập họp của các labels, một label là dữ liệu kiểu key-value pairs.

Ví dụ dữ liệu ở trên ta sẽ có `container_cpu_load_average_10s` là metric name, `id="/docker"` là label với key là id và vaule là docker, notation để định nghĩa time series trên là `container_cpu_load_average_10s{id="/docker", instance="10.0.2.15:8080", job="docker"}`, và dữ liệu của nó là 0.

Khi Prometheus gọi vào endpoint của một target thì sẽ có rất nhiều time series data như trên được trả về, sau đó Prometheus sẽ lưu các dữ liệu đó lại, và Prometheus sẽ cung cấp cho ta bộ công cụ để truy vấn dữ liệu đó, hoặc dùng công cụ khác để truy vấn dữ liệu và biểu diễn nó thành dạng biểu đồ để ta biết được tình trạng của hệ thống và ứng dụng.

## Querying data, Alert and Visualization
Để truy vấn dữ liệu trong Prometheus ta sử dụng ngôn ngữ PromQL, Prometheus có cung cấp cho ta một Expression Browser để ta gõ câu truy vấn, hình minh họa.

![image.png](https://images.viblo.asia/4fd155a6-faff-4637-b6dd-b1502e7c46bd.png)

Ta không thể lúc nào cũng bật máy tính lên và quan sát hệ thống, ta cần có một hệ thống cảnh báo, Prometheus có cung cấp cho ta bộ công cụ Alertmanager. Nếu có gì bất thường trong hệ thống của ta thì Prometheus sẽ thông báo cho ta thông qua Alertmanager.

![image.png](https://images.viblo.asia/2d801109-8647-4b0b-8573-cc0930f9d44d.png)

Và cuối cùng để biểu diễn dữ liệu lên biểu đồ thì ta sẽ dùng Grafana.

![image.png](https://images.viblo.asia/2eccc8e6-bbaf-45d6-b714-2c0e97bb6c83.png)

Ta sẽ tìm hiểu về querying data, alert và visualization ở các bài sau. Giờ ta sẽ tiến hành cài đặt và cấu hình Prometheus đơn giản.

## Installing Prometheus
Ở series này mình sẽ hướng dẫn các bạn trên môi trường Linux, các bạn cài máy ảo để thực hành series này nhé, để cài đặt Prometheus thì ta có thể dùng linux package hoặc docker đều được.

Để cài đặt bằng linux package, các bạn truy cập trang [Prometheus Download](https://prometheus.io/download/), kiếm package phù hợp với OS của các bạn, ví dụ mình xài Centos thì mình cài như sau.

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.39.0/prometheus-2.39.0.linux-amd64.tar.gz
```

Nếu chưa có wget thì các bạn cài nó `sudo yum install wget`, tiếp theo ta giải nén file đã tải ở trên.

```bash
tar -xzf prometheus-2.39.0.linux-amd64.tar.gz
sudo mv prometheus-2.39.0.linux-amd64/prometheus /usr/local/bin/
```

Trong folder `prometheus-2.39.0.linux-amd64` cũng có một công cụ khác khá hữu ích là `promtool`, ta sẽ dùng nó để kiểm tra cú pháp của file cấu hình Prometheus.

```bash
sudo mv prometheus-2.39.0.linux-amd64/promtool /usr/local/bin/
```

Kiểm tra thử xem ta đã cài thành công chưa.

```bash
prometheus --version
prometheus, version 2.39.0 (branch: HEAD, revision: 6d7f26c46ff70286944991f95d791dff03174eea)
  build user:       root@bc053716806f
  build date:       20221005-05:09:43
  go version:       go1.19.1
  platform:         linux/amd64
```

Ok, vậy là ta đã cài prometheus thành công, tiếp theo ta sẽ chạy Prometheus với cấu hình đơn giản.

## Configuring Prometheus
Cấu hình Prometheus được viết bằng YAML file, cấu hình mặc định của nó nằm trong folder `prometheus-2.39.0.linux-amd64` với tên là `prometheus.yml` mà ta đã giải nén ở trên, hãy xem qua nó.

```bash
cat prometheus-2.39.0.linux-amd64/prometheus.yml
```

```yaml
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ["localhost:9090"]
```

File cấu hình mặc định có 4 phần cấu hình chính là: global, alerting, rule_files, và scrape_configs.

### Global
Phần *global* chứa cấu hình chung cho toàn bộ Prometheus.

Trường `scrape_interval` định nghĩa trong bao lâu thì Prometheus sẽ thực hiện kéo dữ liệu một lần, ở trên ta chỉ định là 15 giây.

Trường `evaluation_interval`định nghĩa trong bao lâu thì Prometheus sẽ thực hiện đánh giá lại rule một lần, tạm thời ta chưa cần quan tâm cấu hình này.

### Alerting
Phần *alerting* chứa cấu hình về công cụ mà ta sẽ gửi cảnh báo tới nếu hệ thống ta có vấn đề, như đã nói ở trên đối với Prometheus thì ta sẽ dùng Alertmanager.  Hiện tại ta không cần xài alert nên ta đóng nó lại bằng dấu `#`.

### Rule files
Phần *rulefiles* sẽ chứa cấu hình định nghĩa rule khi nào Prometheus sẽ cần bắn alert qua Alertmanager và các rule về *recording*, ta sẽ tìm hiểu các rules này sau.

### Scrape configuration
Phần mà ta quan tâm nhất bây giờ là `scrape_configs`, đây là cấu hình để ta định nghĩa các targets mà ta sẽ cần giám sát.

```yaml
scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]
```

Thuộc tính `job_name` dùng để định nghĩa tên của target mà ta giám sát, ở đây ta đặt là prometheus.

Thuộc tính `targets` trong `static_configs` dùng để định nghĩa địa chỉ của target, nó sẽ là một mảng các địa chỉ.

Cấu hình mặc định của Prometheus là sẽ giám sát chính bản thân nó, khi bạn chạy Prometheus thì nó sẽ lắng nghe ở port 9090 và cung cấp một đường dẫn là `/metrics` để ta lấy metrics của nó.

```bash
curl localhost:9090/metrics
```

Nên ở cấu hình trên, thuộc tính job_name ta đặt tên là prometheus và targets ta điền vào địa chỉ là `localhost:9090`, mặc định đường dẫn mà Prometheus sẽ gọi là `metrics`, nếu target ta có đường dẫn khác thì ta sẽ chỉ định nó bằng thuộc tính `metrics_path`, ví dụ:

```yaml
scrape_configs:
  - job_name: "nodejs-server"
    metrics_path: /other-path
    static_configs:
      - targets: ["localhost:3000"]
```

Prometheus sẽ kéo dữ liệu thông qua endpoint `localhost:3000/other-path`.

## Running Prometheus
Giờ ta sẽ chạy Prometheus, nhưng trước đó ta nên di chuyển file cấu hình tới folder phù hợp hơn.

```bash
sudo mkdir -p /etc/prometheus
sudo mv prometheus-2.39.0.linux-amd64/prometheus.yml /etc/prometheus/
```

Tạo thư mục `/etc/prometheus` và di chuyển file cấu hình vào trong nó, sau đó ta chạy Prometheus server.

```bash
prometheus --config.file "/etc/prometheus/prometheus.yml"
```

```bash
ts=2022-10-05T07:21:29.148Z caller=main.go:500 level=info msg="No time or size retention was set so using the default time retention" duration=15d
ts=2022-10-05T07:21:29.148Z caller=main.go:544 level=info msg="Starting Prometheus Server" mode=server version="(version=2.39.0, branch=HEAD, revision=6d7f26c46ff70286944991f95d791dff03174eea)"
...
```

Ta sẽ chỉ định file cấu hình bằng CLI flag là `--config.file`. Giờ thì Prometheus của ta đã chạy thành công, các bạn kiểm tra bằng cách mở một terminal khác lên và gọi vào nó như sau.

```bash
curl localhost:9090/metrics
```

```bash
# HELP go_gc_duration_seconds A summary of the pause duration of garbage collection cycles.
# TYPE go_gc_duration_seconds summary
go_gc_duration_seconds{quantile="0"} 1.3545e-05
go_gc_duration_seconds{quantile="0.25"} 1.6924e-05
go_gc_duration_seconds{quantile="0.5"} 3.8626e-05
go_gc_duration_seconds{quantile="0.75"} 4.503e-05
go_gc_duration_seconds{quantile="1"} 0.000437923
...
```

Nếu bạn thấy nó trả về được một đống time series data thì ta đã chạy được Prometheus server. Các bạn mở browser lên và truy cập bằng địa chỉ máy ảo của bạn với port là 9090, ta sẽ thấy UI của Prometheus.

![](https://images.viblo.asia/6c259687-083c-4777-aadc-fe6c3098a079.png)

Chạy thử một câu truy vấn `up{job="prometheus"}`, đây là time series để ta biết target của ta còn sống không.

![](https://images.viblo.asia/2556baf3-2427-4515-8121-2aefed28f4d8.png)

Nếu ta thấy Prometheus UI trả về được dữ liệu thì ta đã thành công 😁. Nếu các bạn không xài máy ảo thì ta có thể thực hành nhanh bằng cách dùng docker để chạy, chỉ đơn giản bằng một vài command như sau.

```bash
docker network create local
docker run --name prometheus --network local -p 9090:9090 -v /etc/prometheus:/etc/prometheus -d prom/prometheus
```

Các bạn có thể chọn chạy bằng linux package hoặc docker đều được, mình sẽ hướng dẫn bằng cả hai cách xuyên suốt series này. **Nếu các bạn chọn chạy bằng docker thì nên chạy câu lệnh `docker network create local` để tạo network tên là local, ta sẽ cần nó ở các bài sau.**

 Done 😁. Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để nhận thông báo về bài viết sớm nhất nhé.

## Kết luận
Vậy là ta đã tìm hiểu xong các khái niệm cơ bản về Prometheus và cách cài đặt nó. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).

Đồng đội [Junior Backend Engineer](https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067).

Đồng đội [Junior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/junior-frontend-engineer-1068).

Đồng đội [Onsite Merchandising (Web Admin)](https://tuyendung.hoang-phuc.com/careers/job/945)