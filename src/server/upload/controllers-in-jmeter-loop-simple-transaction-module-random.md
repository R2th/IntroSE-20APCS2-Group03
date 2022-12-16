Vậy Logic Controller là gì? Có những loại Logic Controllers nào thường được sử dụng?  Những câu hỏi thường gặp khi bạn sử dụng JMeter. Nếu những request được định nghĩa trong các test plan được thực thi phụ thuộc vào một vài logic, lúc đó sẽ cần đến Logic Controllers. Qua phần mô tả dưới đây có thể giúp đỡ phần nào những thắc mắc trên.

**1. Logic Controller là gì?**

Logic Controller cho phép xác định thứ tự yêu cầu xử lý trong một Thread. Nó cho phép bạn kiểm soát khi nào gửi user request đến máy chủ web. Ví dụ: bạn có thể sử dụng Bộ điều khiển ngẫu nhiên (Random Controllers) để gửi các HTTP requests đến máy chủ một cách ngẫu nhiên.

![](https://images.viblo.asia/2abd9fa1-afc0-4405-9cd4-399ac6e4ddc9.png)

Logic Controllers xác định thứ tự thực hiện yêu cầu của người dùng.
Một số Logic Controllers thường được sử dụng dưới đây:

**Recording Controller**

JMeter có thể lưu lại các bước Kiểm thử; recording controller là một placeholder để lưu trữ lại các bước thực hiện.

![](https://images.viblo.asia/dbbb9e81-2472-4afe-b482-671ee33171b0.png)

**Simple Controller**

Simple Controller là một container lưu trữ user request.

![](https://images.viblo.asia/b6ec642d-e97b-4f1d-839b-ddcd4701a29b.png)

**Loop Controller**

Loop Controller làm cho các user request chạy trong số lần được xác định hoặc lặp vô hạn như trong hình:

![](https://images.viblo.asia/b57622ba-ac97-42ab-902c-513ae52e1118.png)

**Random Controller**

Random Controller làm cho tất cả các user request chạy theo thứ tự ngẫu nhiên trong mỗi vòng lặp.

Ví dụ: bạn có 3 user request đến trang web http://www.google.com theo thứ tự sau:

HTTP request, 
FTP request, 
JDBC request, 
3 request này chạy 5 lần; vậy có tổng số 5 user request sẽ được gửi đến máy chủ Google bởi JMeter.

Theo sequential, các request được gửi lần lượt theo thứ tự HTTP request ->FTP request->JDBC request trong mỗi vòng lặp.
Nếu thứ tự là random, các request sẽ được gửi ngẫu nhiên, FTP request ->HTTP request->JDBC request Hoặc là JDBC request ->FTP request->HTTP request trong mỗi vòng lặp.

![](https://images.viblo.asia/3d0bc21c-6a46-491b-9d18-fa91ec1555dc.png)

**Module Controller**

Mục tiêu của Module Controller là thêm modules cho JMeter.

Các ứng dụng web bao gồm các đơn vị chức năng nhỏ (ví dụ: Đăng nhập, Tạo tài khoản, Đăng xuất ...). Chức năng này có thể được lưu trữ trong Simple Controller dưới dạng "modules". Module Controller sẽ chọn modules cần chạy.

![](https://images.viblo.asia/a2329ae1-aca2-4bab-8c45-004ef53e50b7.png)

Hãy theo dõi kịch bản sau đây:

Bạn muốn mô phỏng:

50 users logging out,
100 users logging in,
30 users search www.google.com.
Bạn có thể sử dụng JMeter để tạo 3 modules. Mỗi module mô phỏng từng hoạt động của người dùng: Login, Log out và Search.

![](https://images.viblo.asia/379bd4f9-545c-43af-ab69-cf9774d6c05e.png)

Module controller chọn module cần chạy:

![](https://images.viblo.asia/c858a2ab-cd6b-417d-a513-4cffed3773a3.png)

**Các bộ điều khiển quan trọng khác**

Interleave Controller: chọn và thực hiện một trong những user request chạy trong mỗi vòng lặp của thread.
Runtime Controller: kiểm soát thời gian được phép chạy.
Ví dụ: nếu chỉ định Runtime Controller chạy 10 giây, JMeter sẽ chạy thử nghiệm trong 10 giây.

![](https://images.viblo.asia/ddcf9d2d-bd36-4300-b36e-febcf7b24d15.png)

 - Transaction Controller: đo tổng thời gian thực hiện để hoàn thành việc thực hiện kiểm thử.
 - Include Controller: được thiết kế để sử dụng gói kiểm thử mở rộng. Bộ điều khiển này cho phép bạn sử dụng nhiều test plans trong JMeter. Xem chi tiết trong bài viết Sử dụng JMeter cho performance testing

**Loop Controller Example**

Phần này hướng dẫn từng bước để thêm Loop Controller vào kế hoạch test performance.

Loop Controller làm cho các samplers chạy theo như số vòng lặp đã chỉ định hay giá trị vòng lặp đã chỉ định cho Thread Group. Ví dụ:

Thêm một HTTP Request vào Loop Controller với số vòng lặp 50.
Cấu hình số vòng lặp của Thread Group thành 2.
Sau đó, JMeter sẽ gửi tổng cộng 50 * 2 = 100 HTTP Requests.
Sau đây là quá trình thực hiện:

![](https://images.viblo.asia/2b705dc9-9fb6-407b-b417-0a43f9049d72.png)

**Bước 1. Cấu hình Thread Group**

*1. Thêm Thread Group*

Nhấp chuột phải vào Test Plan và thêm một thread group mới: Add-> Threads (Users) ->Thread Group

Nhưng trong bảng điều khiển Thread Group, nhập Thread Properties như sau:

![](https://images.viblo.asia/56bd4c21-4c5b-4dec-82da-e6fde46b5d4d.png)

Nó sẽ gửi một user request đến máy chủ web google.com và chạy 2 lần.

*2. Thêm JMeter elements*

Thêm HTTP request default là www.google.com.

*3. Thêm Loop Controller*

Nhấp chuột phải vào Thread Group -> Logic Controller -> Loop Controller

![](https://images.viblo.asia/b3d0d689-ecfc-4485-827e-b0c6f4f7c0fd.png)

**Bước 2. Cấu hình Loop Controller**

Thêm giá trị 50 vào trường Loop Count như hình dưới đây. Một user request gửi đến máy chủ web google.com sẽ chạy 50 lần. Nếu loop value = 2, JMeter sẽ gửi tổng cộng 2 * 50 = 100 HTTP Requests.

![](https://images.viblo.asia/f91ec125-5bd5-470f-a41e-2259e90486ea.png)

Nhấp chuột phải vào Loop Controller, Add -> Sampler -> HTTP request

![](https://images.viblo.asia/4ea614e3-39f8-4a6d-a82d-37278e17dd5a.png)

**Bước 3. Thêm View Results in Table**

Vì vậy, test plan được hiển thị trong hình dưới đây:

![](https://images.viblo.asia/70f74775-5fc2-4589-b51f-111441b56ba9.png)

**Bước 4. Chạy thử nghiệm**

Bây giờ hãy trở về View Results in Table, nhấp vào nút Start trên thanh Menu (Ctrl + R) để chạy thử nghiệm.

Như trong hình bên dưới, JMeter mô phỏng một yêu cầu người dùng được gửi 100 lần đến máy chủ web http://www.google.com/. Chương trình kiểm thử dừng sau khi user request được gửi trong 100 lần.

![](https://images.viblo.asia/f17193f8-434a-4ae1-ae84-d80a9bacfcb7.png)

***Xử lý sự cố:***

Nếu bạn gặp vấn đề trong khi chạy kịch bản trên, hãy làm như sau:

1. Kiểm tra xem bạn đang kết nối với internet thông qua proxy. Nếu có, loại bỏ proxy.
2. Khởi động Jmeter.
3. Mở Trình điều khiểnTestPlan.jmx trong Jmeter.
4. Nhấp vào Nhóm chủ đề -> Xem kết quả trong Bảng.
5. Chạy thử nghiệm

Tài liệu tham khảo: https://www.guru99.com/controllers-in-jmeter.html