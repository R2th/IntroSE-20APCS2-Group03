# Lời mở đầu
Để có được một sản phẩm phần mềm tốt việc test performance là việc hết sức quan trọng để xác định độ ổn định của hệ thống, Để test được hắn một mình bạn không thể gửi request bằng cơm để test chịu tải của server được, vì vậy các công cụ hỗ trợ test chịu tải của server ra đời để giúp cho chúng ta đỡ vất vả hơn phần nào. Cũng có rẩt nhiều công cụ hỗ trợ cho việc test này như Artillery, Jmeter ....

Trong bài viết này chúng ta hãy cùng đi tìm hiểu về 1 công cụ mình mới được khai sáng, đó chính là K6.io

![](https://images.viblo.asia/ec05af0d-2517-4f52-b340-4dd13ba15477.PNG)

# Cài đặt
K6.io phát hành các gói cài đặt và sử dụng trên rất nhiều hệ điều hành, hệ thống như linux, mac, window, docker….

## Linux (Debian/Ubuntu)
```
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
$ echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
$ sudo apt-get update
$ sudo apt-get install k6
```
## Mac (brew)
Sử dụng [brew](https://brew.sh/)
```
$ brew install k6
```

## Windows (MSI installer)
```
$ Download the k6 installer: https://dl.bintray.com/loadimpact/windows/k6-latest-amd64.msi
```

Nếu bạn dùng [Chocolatey package manager ](https://chocolatey.org/). Bạn có thể cài đặt k6 bằng cách sau:
```
$ choco install k6
```

## Docker
```
$ docker pull loadimpact/k6
```

Ở bài viết này mình sẽ dùng docker để cài đặt.
## Kiểm tra version
Để xem cài đặt thành công k6 hay chưa dùng lệnh: 
```
$ k6 version
# k6 v0.31.1 (2021-03-17T13:23:23+0000/e9d8349, go1.15.8, linux/amd64)
```

Vậy là cài đặt thành công  !!!!

# Kiểm tra độ chịu tải với k6
## Running k6
Vì k6 sử dụng file javascript để chạy test nên khá dễ dàng tiếp cận. Chúng ta tạo một file với tên homepage.js đơn giản với nội dung sau:
```js
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  VUs: 10,
  duration: '30s',
};

export default function() {
   http.get('https://phamtuananh1996.github.io');
   sleep(1);
}
```

Ở đây mình khai báo VUs = 10 và duration = 30 giây có nghĩa là quá trình test sẽ mô tả 10 user vào website https://phamtuananh1996.github.io trong vòng 30 giây (VUs viết tắt của  virtual user)

Tiến hành chạy test:
```
$ k6 run homepage.js
```
Hoặc chạy với docker:
```
docker run -i loadimpact/k6 run - <homepage.js
```

sau khi chạy xong k6 sẽ tổng hợp số liệu như sau:

```
data_received..............: 148 MB 2.5 MB/s
data_sent..................: 1.0 MB 17 kB/s
http_req_blocked...........: avg=1.92ms   min=1µs      med=5µs      max=288.73ms p(90)=11µs     p(95)=17µs
http_req_connecting........: avg=1.01ms   min=0s       med=0s       max=166.44ms p(90)=0s       p(95)=0s
http_req_duration..........: avg=143.14ms min=112.87ms med=136.03ms max=1.18s    p(90)=164.2ms  p(95)=177.75ms
http_req_receiving.........: avg=5.53ms   min=49µs     med=2.11ms   max=1.01s    p(90)=9.25ms   p(95)=11.8ms
http_req_sending...........: avg=30.01µs  min=7µs      med=24µs     max=1.89ms   p(90)=48µs     p(95)=63µs
http_req_tls_handshaking...: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
http_req_waiting...........: avg=137.57ms min=111.44ms med=132.59ms max=589.4ms  p(90)=159.95ms p(95)=169.41ms
http_reqs..................: 13491  224.848869/s
iteration_duration.........: avg=445.48ms min=413.05ms med=436.36ms max=1.48s    p(90)=464.94ms p(95)=479.66ms
iterations.................: 13410  223.498876/s
vus........................: 100    min=100 max=100
vus_max....................: 100    min=100 max=100

```

Vậy là đã chạy ok rồi. Các thông số mình sẽ giải thích ở phần dưới nhé.

Đây chỉ là 1 case đơn giản. Trên thực tế thì phức tạp hơn trong thực tế thì user thường tương tác với Server theo một kịch bản chứ không chỉ đơn thuần là gửi request, hay số lượng user sẽ tăng lên hay giảm đi.
## Stages: ramping up/down VUs
Bạn cũng có thể tăng và giảm số lượng VUs trong quá trình kiểm tra. Chúng ta có thể config ở `options.stages`

```js
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
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function() {
   http.get('https://phamtuananh1996.github.io');
   sleep(1);
}
```

Ở đây thì mình có tăng số lượng user (target) lên dần dần và thời gian (duration) cũng tăng dần dần và đột ngột giảm user về 0 nhắm kiểm tra độ chịu tải của server (Stress Test)

# Results visualization với Cloud k6
k6.io cũng cung cấp cho chúng ta cloud để thực hiện việc test và kiểm tra kết quả bằng hình ảnh trực quan, hoặc bạn cũng có thể chạy test dưới local sau đó stream result lên k6 Cloud. 

k6.io cho người dùng dùng thử chỉ bằng cách đăng ký tài khoản bằng gmail hoặc github. Với mỗi tài khoản, người dùng có thể thực hiện miễn phí 50 lượt test. Ngoài ra còn giới hạn những thông số cấu hình cho các loại test. Ở đây mình sử dụng gmail để đăng nhập.

Đây là giao diện dashboard khi đăng nhập xong.  Ở giao diện này, sẽ có 2 lựa chọn để tạo test là **Test builder** và **Script editor**.

![](https://images.viblo.asia/aa6933ed-9203-459b-a083-1828c0265809.png)

**Test builder** cho phép chúng ta tạo test bằng giao diện trực quan, còn **Script editor** cho phép chúng ta tạo các đoạn script bằng js và chạy trên nền cloud.

## Script editor
K6 Cloud cũng cấp luôn cho chúng ta 1 trình soạn thảo và đoạn code mẫu việc của chúng ta là copy đoạn code bên trên và paste vào thôi. sau khi xong ấn vào run . vì Hiện tại mình đang là free user, nên tối đa có thể chạy với 50 VUs và 12 phút vì thế mình điều chỉnh đoạn code test của mình xuống như sau:
```js
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2s', target: 10 }, // below normal load
    { duration: '5s', target: 10 },
    { duration: '2s', target: 20 }, // normal load
    { duration: '5s', target: 20 },
    { duration: '2s', target: 30 }, // around the breaking point
    { duration: '5s', target: 30 },
    { duration: '2s', target: 40 }, // beyond the breaking point
    { duration: '5s', target: 40 },
    { duration: '10s', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  http.get('https://phamtuananh1996.github.io');
  sleep(1);
}

```

![](https://images.viblo.asia/0396af06-d719-499e-934a-2f0eae902789.gif)

Đợi sau khi chạy xong ta sẽ có giao diện sau, cũng là giao diện cuối khi hoàn thành test:
![](https://images.viblo.asia/d5ece6ee-a026-4763-a10d-3ac35d18696f.png)

Ở giao diện này, ta có thể thấy được rất nhiều các thông số như các biểu đồ về VUs, request, hiển thị lỗi, metrics… Như ở đây mình thấy với 40 user hoạt động cùng lúc trong vòng 5s thì website vẫn không vấn đề gì và hoạt động bình thường .
## Cloud tests from the CLI
Chúng ta cũng có thể chạy test trên local thông qua CLI và upload kết quả đó lên cloud để có thể theo dõi trực quan hơn băng biểu đồ, hình ảnh do cloud cung cấp.

Đầu tiên phải đăng nhâp k6 cloud từ cli:

Đăng nhập bằng username và password:
```
$ k6 login cloud
```
Đăng nhập bằng API Token:

```
$ k6 login cloud --token <YOUR_K6_CLOUD_API_TOKEN>
```

Để lấy được API Token sau khi đăng nhập chúng ta có thể vào https://app.k6.io/account/api-token để lấy.

Chạy kịch bản test trên local và stream lên cloud k6:
```
$ k6 cloud script.js
```

Sau khi chạy xong sẽ có 1 số thông tin và 1 đường dẫn url đến trang xem kết quả test trên cloud (output):
```
        /\      |‾‾|  /‾‾/  /‾/
   /\  /  \     |  |_/  /  / /
  /  \/    \    |      |  /  ‾‾\
 /          \   |  |‾\  \ | (_) |
/ __________ \  |__|  \__\ \___/ .io

execution: cloud
script: script.js
output: https://app.k6.io/runs/TEST_RUN_ID

```

Bạn có thể điều hướng đến url đó để xem kết quả test một cách trực quan:
![](https://images.viblo.asia/a0c5f3b0-1b11-44e1-b787-a23154363019.png)

# Results output
Sau khi chay test local xong bạn sẽ thấy các thông số này:
```
data_received..............: 148 MB 2.5 MB/s
data_sent..................: 1.0 MB 17 kB/s
http_req_blocked...........: avg=1.92ms   min=1µs      med=5µs      max=288.73ms p(90)=11µs     p(95)=17µs
http_req_connecting........: avg=1.01ms   min=0s       med=0s       max=166.44ms p(90)=0s       p(95)=0s
http_req_duration..........: avg=143.14ms min=112.87ms med=136.03ms max=1.18s    p(90)=164.2ms  p(95)=177.75ms
http_req_receiving.........: avg=5.53ms   min=49µs     med=2.11ms   max=1.01s    p(90)=9.25ms   p(95)=11.8ms
http_req_sending...........: avg=30.01µs  min=7µs      med=24µs     max=1.89ms   p(90)=48µs     p(95)=63µs
http_req_tls_handshaking...: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
http_req_waiting...........: avg=137.57ms min=111.44ms med=132.59ms max=589.4ms  p(90)=159.95ms p(95)=169.41ms
http_reqs..................: 13491  224.848869/s
iteration_duration.........: avg=445.48ms min=413.05ms med=436.36ms max=1.48s    p(90)=464.94ms p(95)=479.66ms
iterations.................: 13410  223.498876/s
vus........................: 100    min=100 max=100
vus_max....................: 100    min=100 max=100

```
 Mỗi thông số http_req đều có các thông số (avg, min. max, med, p(90), p(95))


http_req_blocked: Thời gian VU dành để chờ được phân bổ kết nối TCP từ nhóm kết nối.

http_req_connecting: Thời gian VU dành để thiết lập kết nối TCP đến máy chủ từ xa

http_req_duration: Thời gian thực hiện tra cứu DNS.

http_req_receiving: Thời gian nhận được trả lời từ máy chủ từ xa.

http_req_sending: Thời gian dành để truyền các yêu cầu HTTP đến máy chủ từ xa.

http_req_tls_handshaking: thời gian máy khách và máy chủ, xác nhận lẫn nhau và bắt đầu giao tiếp

http_req_waiting: Thời gian chờ đợi phản hồi trở lại từ máy chủ từ xa (sau khi đã gửi yêu cầu).

http_reqs: Tổng số yêu cầu HTTP được thực hiện trong toàn bộ thử nghiệm

iteration_duration: Tổng thời gian cho yêu cầu. (http_req_sending + http_req_waiting + http_req_receiving)

iterations: Tổng số lần tất cả các VU trong thử nghiệm được quản lý để chạy qua hàm default ().

vus: Có bao nhiêu VU thử nghiệm được cấu hình để mô phỏng.

vus_max: Số lượng vị trí VU được phân bổ trước mà thử nghiệm được định cấu hình (vus_max cho phép bạn mở rộng số lượng VU trong thử nghiệm để tối đa số lượng đó).

# Kết luận
Trên đây mình có giới thiệu sơ lược về kiểm trả perfomance bằng k6.io và sử dụng cloud k6 để test và visualization kết quả. Nhưng vì dùng bản miễn phí nên bị giới hạn khá nhiều. 

Bài sau mình sẽ viết về việc dùng InfluxDB + Grafana để hiển thị kết qủa test miễn phí.

blog: https://phamtuananh1996.github.io/

Tham khảo: https://k6.io/docs/