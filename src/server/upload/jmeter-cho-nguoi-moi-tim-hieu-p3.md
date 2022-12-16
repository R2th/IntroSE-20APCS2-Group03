Ở [bài trước](https://viblo.asia/p/jmeter-cho-nguoi-moi-tim-hieu-p2-RnB5pGxdlPG) mọi người đã hiểu và cài đặt môi trường cho jmeter, tiếp theo bài này mình sẽ giới thiệu cách tạo các kịch bản và nó hoạt động như thế nào. Đầu tiên sẽ là kịch bản đơn giản.

# Kịch bản đơn giản (Simple script)
## ThreadGroup
Đầu tiên hãy tạo 1 ThreadGroup bằng cách click chuột phải vào *Test Plan*, sau đó chọn *Add > Threads (users) > Thread Group.*
![](https://images.viblo.asia/61e61c0f-ebba-4e60-a2a1-0745340e6892.png)

ThreadGroup là container cho logic sẽ được chạy bởi một người dùng. Nói cách khác, nó chứa tất cả các logic sẽ được chạy bởi nhiều luồng mà bạn muốn song song.

Như bạn thấy, một ThreadGroup có nhiều thiết lập, với quan trọng nhất là:
* Number of Threads: số lượng các luồng đồng thời chạy trong quá trình kiểm tra.
* Duration (sec): Thời gian thử nghiệm sẽ kéo dài bao lâu.

Group panel của Thread cũng có các cài đặt như dưới đây:
* When encountering a Sampler error: Trong trường hợp với bất kỳ lỗi nào xảy ra khi thực hiện test, bạn có thể cho phép test..
    1. Continue (đang chạy)
    2. Stop Thread (dừng luồng hiện tại)
    3. Stop Test (Hoàn thành)
* Number of Threads: Mô phỏng người dùng đồng thời.
* Ramp-Up Period: Tăng đều tải từ 0 đến mục tiêu mà bạn muốn trong khoảng thời gian này.
* Loop Count: Tổng số lần lặp.
* Scheduler Configuration:
    1. Duration: Tổng thời gian thử nghiệm tính bằng giây
    2. Startup Delay: Số giây trước khi người dùng tăng tốc.
*  Scheduler Configuration: Bạn có thể cấu hình thời gian bắt đầu và kết thúc chạy thử nghiệm.

## Http Request
Ngay bây giờ hãy thêm ngay một đối tượng [HTTP Request](http://jmeter.apache.org/usermanual/component_reference.html#HTTP_Request)

Chuột phải trên *ThreadGroup* Sau đó chọn *Add > Sampler > Http Request*.
![](https://images.viblo.asia/5a444702-3305-466c-8b01-e502f1b0940f.png)

Trong ví dụ này, tôi đã cấu hình một GET HTTP Request đến trang https://httpbin.org
*  Protocol: https.
*  Server Name or IP: httpbin.org.
*  Port Number: 443 (default https port).
*  Path: /.

Một lần nữa, có rất nhiều lựa chọn ở đây. (và những thứ này thậm chí sẽ không vừa với màn hình) Hầu hết thời gian, bạn sẽ không thiết kế Http Request từ đầu. Đó là cách tốt hơn để ghi lại chúng bằng JMeter.

JMeter tích hợp sẵn Trình ghi cho phép ghi lại tất cả các yêu cầu HTTP khi sử dụng trình duyệt của bạn. Tại sao không đặt tất cả các yêu cầu bằng tay? Đơn giản vì nó là không thực tế. Một số ứng dụng web có thể gửi hơn 100 yêu cầu.

## View Results Tree
Bây giờ là lúc để thực thi người dùng của chúng tôi bao gồm yêu cầu duy nhất và xem kết quả.

Chúng ta sẽ thêm một trình nghe Tree View View. Hãy nhớ rằng lisener này chỉ dành cho mục đích gỡ lỗi.
![](https://images.viblo.asia/8660a549-1029-413f-af16-dd33f20a5c2c.png)
Trình lắng nghe giao diện người dùng này cho phép bạn xem kết quả của các requests đang được thực hiện. Nhấp vào Run > Start trong menu trên cùng để chạy.

Một số điểm chính ở đây:
* Green color: Chống lại tên Truy cập TutorialsPoint Trang chủ cho biết thành công.
* JMeter stores all các request và phản hồi đã gửi và nhận.
* Sampler Result Tab cho thấy số liệu JMeter thu thập về request và thời gian phản hồi.
* Request Tab hiển thị yêu cầu đã được phát.
* Response Tab cho thấy phản hồi được gửi bởi máy chủ web đến JMeter.

Tab thứ hai là Request, hiển thị tất cả dữ liệu được gửi đến máy chủ web như là một phần của request.
![](https://images.viblo.asia/d0538b49-0119-4638-8824-1fed1e79051b.png)

*Số liệu sẽ xuất hiện cho yêu cầu đang được thực thi*

Trên màn hình này, trong khung nhìn Sample Result, bạn sẽ thấy một cái gì đó như:
```
Thread Name: Thread Group 1-1
Sample Start: 2018-03-28 14:13:04 CEST
Load time: 925 # Network Load Time in millis
Connect Time: 783 # Network Connect Time in millis
Latency: 925 # Network Latency Time in millis
Size in bytes: 13426
Sent bytes:115
Headers size in bytes: 297
Body size in bytes: 13129
Sample Count: 1
Error Count: 0
Data type ("text"|"bin"|""): text
Response code: 200
Response message: OK

Response headers:
HTTP/1.1 200 OK
Connection: keep-alive
Server: meinheld/0.6.1
Date: Wed, 28 Mar 2018 12:13:04 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 13129
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
X-Powered-By: Flask
X-Processed-Time: 0
Via: 1.1 vegur


HTTPSampleResult fields:
ContentType: text/html; charset=utf-8
DataEncoding: utf-8
```
Nó chứa rất nhiều số liệu về thời gian phản hồi của máy chủ.

# Kết Luận
Mình đã giới thiệu sơ qua về các thông số, ý nghĩa và cách cấu hình kịch bản đơn gian, hy vọng nó sẽ giúp ích cho mọi người để áp dụng giải quyết các công việc theo đúng yêu cầu. Bài viết sau mình sẽ đi sâu vào tao các kịch bản khó hơn một chút. Một lần nữa cám ơn các bạn đã đón đọc, Many thanks!