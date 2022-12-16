Hi lại là mình đây loạt bài này mình sẽ giới thiệu về Jmeter và hướng dẫn tạo test performance trên Jmeter nhé

Jmeter là mã nguồn mở được viết bằng java. Jmeter là công cụ để đo độ tải và performance, Web – HTTP, HTTPS, SOAP, Database via JDBC, LDAP, JMS, Mail – SMTP(S), POP3(S) and IMAP(S)…  ===> Nói chung thì các bạn chỉ cần hiểu nó là công cụ sử dụng để do performance của 1 ứng dụng

**Ưu điểm** :

– Rất nhẹ, không cần cài đặt, miễn phí.

– Nền tảng xử lý đa luồng cho phép mô phỏng nhiều mẫu bởi nhiều thread của các chức năng khác nhau trên các thread group khác nhau

– Dễ dàng thêm các plugin và tạo các báo cáo phù hợp yêu cầu

– Được hỗ trợ mạnh bởi cộng đồng open source

**Cài đặt**: 
- Link Download Jmeter http://jmeter.apache.org/download_jmeter.cgi

– Sau khi download về giải nén và mở thư mục đó ra

**Cách thức hoạt động**

![](https://images.viblo.asia/198816ff-6643-42a7-8b9d-d9916031b998.png)

Jmeter thực hiện giả lập một nhóm người dùng gửi các yêu cầu tới một máy chủ, nhận và xử lý các phản hồi từ máy chủ và cung cấp các kết quả báo cáo hiệu suất dưới dạng báo cáo

**Các thành phần cơ bản trong jmeter**:

– Test Plan: là kịch bản test, gồm các bước sẽ được thực thi trong jmeter

– Thread Group: đại diện cho 1 ngón người dùng tác động vào hệ thống

– Logic Controller: cho tạo ra các logic cho các sample gửi tới hệ thống cần kiểm tra

– Sampler: Các yêu cầu sẽ được gửi tới máy chủ

– Config Element: được sử dụng để cấu hình các tham số cho sampler

– Timer: Điều chỉnh khoảng thời gian dừng giữa các lần gửi yêu cầu.

– Listener: Cho phép thu thập thông tin kết quả. Có thể đưa ra các báo cáo kết quả kiểm tra dạng đồ thị, hoặc xuất ra tập tin.

– Assertions: sử dụng để nhận biết được request thực thi thành công hay không

– Pre Processors: Được sử dụng để thực thi một số hành động trước khi Sampler Request được gửi đến máy chủ.

– Post Processors: Được sử dụng để thực hiện một số hành động sau khi Sampler Request được thực thi và được gửi đến máy chủ.

**Test plan**

- Được sử dụng tạo ra kịch bản test, chứa các thành phần sử dụng cho việc test:

![](https://images.viblo.asia/523ef414-56e1-4f39-9246-725d2db4e09d.png)

- User Defined Variable:   Đây là nơi chứa các cặp tên và giá trị của biến. Bạn có thể thêm một hay nhiều biến   bằng cách ấn button Add.

- Run Thread Groups consecutively: Trong test plan yên cầu phải có ít nhất 1 threadgroup . trường hợp test plan có nhiều  thread group, Run Thread Groups consecutively được chọn thì sẽ thực hiện 
lần lượt các thread group từ trên xuống dưới.  Nếu ko được chọn thì các threadgroup sẽ được chạy cùng lúc.

- Run teardown Thread Groups after shutdown of main threads: Các luồng TearDown sẽ được thực thi sau khi việc thực hiện kiểm thử kết thúc thực hiện các luồng thông thường của nó.
Function test mode: Nếu checkbox này được chọn, thì các thông tin của sampler requests (các request gửi lên server) và response data (dữ liệu server phản hồi về) sẽ được lưu vào trong các listener.

- ThreadGroup: Đại diện cho tập các user sẽ thực hiện request tới server, Các loại threadgroup thông thường chia thành 3 loại

![](https://images.viblo.asia/f0b085e0-8299-45b3-b58f-9ba369c24b32.png)

- Setup threadgroup:  sẽ được chạy trước khi chạy sampler

- Teardown threadgroup: sẽ được chạy sau khi kết thúc main threadgroup

- Main threadgroup:  sẽ là threadgroup chính thực hiện test case

- Action to taken after sampler error: Hành động sẽ được thực hiện khi nhận response lỗi

- Continue: tiếp tục chạy sample nếu có lỗi

- Start next thread loop: Dừng thread lại và chạy thread tiếp theo

- Stop thread: dừng tiến trình lại

- stop test now: dừng tiến trình lại ko gửi sampler

- Number threadgroup : số lượng user được tạo ra trong quá trình test

- Ramp-up Period: thời gian để tạo ra số lượng user được định nghĩa trong number threadgroup

- loop count: số lần gửi yêu cầu tới server
     + Forever: sẽ gửi cho tới khi chạy xong
     + loop count: sẽ gửi 10 lần
- Scheduler: sử dụng cấu hình thời gian chạy test
    + duration(seconds): thời gian chạy kịch bản
 	+ startup delay (seconds): thời gian delay khi bắt đầu chạy thread


**Thành phần con của threadgroup**

- Samplers:cho phép định nghĩa ra các request để gửi tới server, jmeter hỗ trợ các loại request như sau: HTTP request, HTTPS request, JDBC request, java request, soap/xml-rpc request, web service (soap) request, LDAP request, LDAP extended request, access log …

- logic controller: tạo logic xử lý cho sample request trong 1 thread đưa ra quyết định cho các request.

- Listener: cho phép truy cập , tổng hợp các thông tin biểu thị dưới dạng graph, tree, table … cho phép lưu giữ thông tin dưới dạng csv, xml, txt, nó được add vào bất kỳ đâu trong testplan và chỉ thu thập dữ liệu cùng cấp, hoặc cấp dưới nó

-  timer:có thể dùng timer để xác định  khoảng thời gian gửi giữa các request.

- Assertions:cho phép xác nhận phản hồi từ phía server ( ví dụ khi nhận được response http status: 200 => pass, http status khác 200 sẽ fail)

- configuration elements: cho phép người dùng tạo các giá trị mặc định và biến được sử dụng trong các samplers

- Pre-Processor elements: sử dụng để chỉnh sửa thiết lập sample request trước khi nó được chạy, update các biến hoặc update các biến.

-  Post-processor Element: thực hiện sau khi request được gửi đi, thông thường post-processor element tường được đặt làm con của sample để đảm bảo nó chỉ chạy sau sampler