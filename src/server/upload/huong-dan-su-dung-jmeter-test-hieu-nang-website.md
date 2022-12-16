Performance testing là một loại test quan trọng để xác định ứng dụng web đang được kiểm tra có đáp ứng các yêu cầu tải cao hay không. Loại test này được dùng để phân tích hiệu năng máy chủ một cách tổng thể khi chịu tải nặng.

Chuỗi bài viết này mình sẽ giới thiệu tới các bạn 1 công cụ test rất mạnh mẽ và phổ biến hiện nay: Apache Jmeter


Cụm bài viết của mình gồm các phần từ bắt đầu cho tới nâng cao:

***Jmeter có thể làm gì?***

Jmeter là công cụ giúp ta giả lập thao tác của người dùng trên web. Bằng việc giả lập các thao tác của một số lượng người dùng nhất định, Jmeter giúp ta đánh giá được các kết quả:
– Web có thể chịu được bao nhiêu lượt truy cập/thao tác liên tục cùng lúc?
– Để đáp ứng số lượng X người sử dụng, thì cần phân phối họ truy cập trong bao lâu? Như thế nào để Web vẫn hoạt động bình thường?
– Thời gian response dữ liệu của server với từng mức tải người dùng?
– Kết hợp với 1 số tool monitor server, ta có thể theo dõi thay đổi vật lý của server khi có tải lớn như: CPU, RAM, Network traffic… (Phần này mình sẽ có bài viết khác giới thiệu về các tool monitor – Link đang cập nhật)

***Cài đặt và khởi chạy Jmeter***

B1: Các bạn Download Apache Jmeter mới nhất tại https://jmeter.apache.org/download_jmeter.cgi

B2: Để chạy được Jmeter, bạn cần cài thêm JDK của Java nữa, download tại https://www.oracle.com/java/technologies/javase-downloads.html

B3: Chạy JDK

B4: Chạy Jmeter: Sau khi download Jmeter, các bạn giải nén và chạy file .jar trong thư mục /bin

![](https://images.viblo.asia/3fd9edae-b41e-453c-87e6-8d3d95025fb5.png)

 Hình 1: Khởi chạy Jmeter

***Giới thiệu các thành phần trong Jmeter***

Các bạn vui lòng đọc kĩ phần này, trước khi bắt tay vào test hiệu năng 1 cách nghiêm túc. Chúng ta cần hiểu và nắm được ý nghĩa của các thành phần trong Jmeter. Tất nhiên nếu đơn giản bạn chỉ muốn test lượt truy cập vào website của bạn mà không mô phỏng thao tác nào của họ trên đó thì có thể bỏ qua phần này.
Trong phần này chúng ta sẽ tìm hiểu các thành phần sau:

***Thread Group***

Controller (Sampler Controller & Logic Controller)
Configuration Element
Listener
Timer
 
Thread Group
Tạo 1 thread group: TestPlan > Add > Threads (Users) > Thread group

![](https://images.viblo.asia/551262a7-5054-45a4-a09c-d2265abd665a.png)

Hình 2: Tạo thread group
Một Thread Group đại diện cho một nhóm người dùng, và nó chứa tất cả những yếu tố khác.Mỗi Thread Group sẽ mô phỏng những người dùng để thực hiện một trường hợp thử nghiệm cụ thể. Thread Group cho phép tester thực hiện những tùy chỉnh về:

***Số lượng Thread:*** Mỗi Thread đại diện cho một người dùng ảo, JMeter cho phép thay đổi số lượng người dùng không hạn chế để thực hiện các thử nghiệm.
***Ram-Up Period:*** Thời gian để bắt đầu tất cả những Thread.
***Loop Count:*** Số lần lặp lại những yêu cầu của người dùng. Ngoài ra còn có những tùy chọn khác như việc chạy các Thread vào lịch biểu định sẵn, xác định hành động sẽ thực hiện khi xảy ra lỗi…

![](https://images.viblo.asia/36ff42af-638e-45e3-bef4-be0cfa9e1853.png)

Hình 3: Các thành phần của Thread Group

VD: Number of Threads: 100, Ram-Up Period: 100, Loop Count: 1. Tức là Jmeter sẽ giả lập thao tác cho 100 user thực hiện trong 600s, tức là mỗi user sẽ tiến hành thực hiện cách nhau 1s (100s/100) và lặp lại 1 lần.
![](https://images.viblo.asia/bb087581-8f30-4e8d-b4ab-fafd478d8c11.png)

***Chú ý***:  100 user + Loop count: 1 khác gì 50 user + Loop count 2.
Về tổng số request thì bằng nhau, Jmeter sẽ thực hiện 100 lượt test.
Tuy nhiên có sự khác nhau về thứ tự thực hiện của các user như sau:

![](https://images.viblo.asia/bef7aeb1-fecb-4f7e-93de-f3d3b53b8c1d.png)

Controller: HTTP Request Defaults
Tạo HTTP Request Defaults: Add > Config Element > HTTP Request Defaults.
HTTP Request Defaults: Định nghĩa trang web mà mình sẽ thực hiện xuyên suốt kịch bản test. 1 kịch bản test có thể có nhiều Http request khác nhau ở các URI (Path) khác nhau, nhưng đều xuất phát ở cùng 1 domain được định nghĩa ở HTTP Request Defaults.
Trong bảng HTTP Request Defaults, hãy nhập tên trang web cần được kiểm tra ( http://www.google.com ), port Number: 80 (Hầu hết các http request trả về dữ liệu qua cổng 80)

Http request: Định nghĩa 1 request mô phỏng cho 1 chức năng/thao tác của user trên hệ thống.
Để thêm mới Http request: Add -> Sampler -> HTTP Request.

![](https://images.viblo.asia/bd156659-0f3c-462e-a8ee-5e2849bab366.png)

Trong Bảng HTTP Request, trường Path cho biết yêu cầu URL nào bạn muốn gửi tới server. Nếu bạn để trống trường này, request sẽ được gửi tới URL: google.com (Đã được config trước đó ở http request default)
Ở đây ta còn có thể định nghĩa phương thức truy cập tới URL trên gồm: GET/POST/HEAD/PUT/DELETE/….
Phổ biến nhất hay dùng là GET/POST.
Để truyền thêm param cho request, ấn nút Add.

**Configuration Element**
HTTP Cookie Manager: Hầu hết các trang web đều sử dụng cookie để lưu dữ liệu. Do đó, cần thêm element này để có thể lưu dữ liệu của user sau khi thực hiện controller login.
CSV Data Set Config: Dùng để quy định file dữ liệu đầu vào cho kịch bản test với nhiều người dùng khác nhau cùng sử dụng 1 chức năng.
VD: Kịch bản test: 100 user login vào hệ thống sử dụng 100 tài khoản khác nhau. Danh sách username, password của 100 tài khoản đó sẽ được lưu trong file csv_account.txt. Jmeter sẽ đọc dữ liệu từ file này và lần lượt gửi dữ liệu vào mỗi request.

![](https://images.viblo.asia/767824b5-0a5e-4111-998a-ed07fac29fa2.png)

Mẫu file csv_account.txt

![](https://images.viblo.asia/e6a127cb-1b3e-4aff-8ffc-836dbb88988f.png)

Giải thích CSV data
***Filename:*** đường dẫn tới file dữ liệu
***Varible names:*** Tên các biến mình định nghĩa, theo thứ tự dữ liệu từ trái qua phải
***Delimiter***: Kí tự dùng để phân cách giá trị các biến.
Theo như file csv_account.txt bên trên thì mình định nghĩa format dữ liệu sẽ là: username, password.
Để sử dụng các giá trị từ file dữ liệu đưa vào http request, cấu hình như sau:


Tại cột value, ta sử dụng các biến đã định nghĩa bên trên. Chú ý cú pháp sử dụng là: ${ten_bien}

**Listener**
Công cụ Listener mà JMeter cung cấp cho phép xem những kết quả thu được từ việc chạy thử nghiệm dưới các dạng khác nhau như: đồ thị, bảng biểu, cây.. Các listeners sẽ cung cấp một cách trực quan nhất những dữ liệu thu thập được từ việc thực thi các Test case. Tester cũng sẽ có thể tùy chỉnh những thông tin mà Listener trả về một cách dễ dàng bởi các tính năng trong giao diện cụ thể của từng Listener. Có rất nhiều dạng Listener được JMeter cung cấp, có thể kể đến một số Listener thường được sử dụng để cung cấp như:


Summary report: báo cáo tóm tắt kết quả thực hiện test.
 
**View Results Tree:** Báo cáo chi tiết kết quả thực hiện của từng request. Tại đây ta có thể xem lại dữ liệu request đó đã gửi đi, và dữ liệu nhận được từ phía server.
**View Results in Table**: Chi tiết kết quả thực hiện từng request ở dạng bảng. (Chi tiết của dạng summary report)
***Graph Results:*** Biểu đồ thống kê thời gian phản hồi và các tham số sau mỗi request được gửi đi.

![](https://images.viblo.asia/48b56763-f44f-4cbc-a8bb-c721a12dc423.png)

Summary Report

***Label:*** Tên http request
***Sample:*** số lượng request đã thực hiện
***Avarage:*** Thời gian phản hồi trung bình. Đơn vị ms.
***Min***: Thời gian phản hồi ngắn nhất;
***Max:*** Thời gian phản hồi lâu nhất
***Std.*** Dev: Độ lêch chuẩn thời gian phản hồi
***Error*** %: Tỉ lệ % số request bị lỗi (Không nhận được phản hồi từ server).
***Throughput***: Số request server có thể xử lý/ second/minute/hour.
***Received KB/sec***: Thông lượng KB nhận được/giây
***Sent KB/sec***: Thông lượng KB gửi đi/giây
***Avg. Bytes***: Dữ liệu phản hồi trung bình

![](https://images.viblo.asia/f44c421f-c889-4d84-bea2-559b15e694ce.png)

*View Results Tree***

![](https://images.viblo.asia/2d96f3f5-336f-4413-9210-94129251f252.png)

View Results In Table

![](https://images.viblo.asia/da5bf83f-547a-4c04-bacd-9a5cc35a42b8.png)

Graph Results

Ở dưới cùng của hình ảnh, có các số liệu thống kê sau đây, được biểu thị bằng màu sắc:
• Đen: Tổng số mẫu hiện tại được gửi – 100.
• Màu xanh dương : Mức trung bình hiện tại của tất cả các mẫu được gửi – 428ms.
• Màu đỏ : Độ lệch chuẩn hiện tại – 325ms.
• Màu xanh lá cây : Tỷ lệ thông lượng biểu thị số lượng yêu cầu mỗi phút mà máy chủ xử lý. – 59 964 request/phút
1 vài chú ý:
Throughput càng cao càng tốt. Chứng tỏ server xử lý được nhiều request/thời gian. Nó biểu hiện cho khả năng máy chủ xử lý tải nặng. Throughput càng cao thì hiệu suất máy chủ càng tốt
Deviation: Tham số Deviation được hiện màu đỏ, nó chỉ ra sai lệch so với mức trung bình. Giá trị Deviation càng nhỏ thì càng tốt.

***Timer***
Timer là một phần rất quan trọng khi xây dựng một Test Plan, nó cho phép cài đặt khoảng thời gian giữa 2 yêu cầu kế tiếp nhau mà người dùng ảo gửi đến máy chủ. Điều này sẽ tạo ra một mô phỏng thực tế nhất so với hoạt động thực tế của người dùng trên website.
JMeter cung cấp nhiều Timer với các dạng khác nhau để thiết lập thời gian nghỉ giữa việc thực hiện 2 yêu cầu , như :
• Constant Timer: xác lập thời gian là một hằng số.
• Uniform Random Timer: xác lập thời gian nghỉ ở một khoảng xác định.
Để sử dụng Timer, ta tạo 1 Flow control action và đặt timer vào trong Follow đó.

![](https://images.viblo.asia/723809ce-052d-4165-802f-a338c15a219f.png)

Tạo Flow control action: Add -> Sampler -> Follow Control Action
Sau đó ta chọn thêm Timer cho Action này. Ở đây ta sử dụng Uniform Random Timer

![](https://images.viblo.asia/e54ab7ce-0851-4c71-abe7-5f4442de3fe8.png)

Action này sẽ “Pause” lại trong khoảng từ 600 ms -> 1000 ms. Rồi mới chuyển qua request tiếp theo.

Vậy là mình đã giới thiệu các thành phần quan trọng của Jmeter trước khi bắt đầu xây dựng một kịch bản test cụ thể.
Tham khảo
https://jmeter.apache.org/usermanual/component_reference.html