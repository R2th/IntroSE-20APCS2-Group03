Service - một trong những thành phần ứng dụng của Android, bị nhiều người hiểu sai từ bản chất cho đến cách sử dụng. 10 điều quan trọng về service dưới đây sẽ giúp bạn hiểu rõ hơn về service. Bài đăng này không nói đến chi tiết về cách hoạt động của service, thay vào đó nó là một cái nhìn tổng quan, những sự hiểu sai về service cần được làm rõ.
### 1.  MỘT SERVICE KHÔNG PHẢI LÀ MỘT PHIÊN BẢN TỐT HƠN CỦA ASYNCTASK
Service không được tạo ra để thực hiện các phép toán không đồng bộ dưới background thông thường, mục đích của nó là để thực thi logic ngay cả khi không có Activity nào hiển thị.
Hãy nhớ rằng mỗi Service là một thành phần đặc biệt có ảnh hưởng đến tài nguyên của hệ thống chứ không chỉ riêng ứng dụng.
###  2.  MỘT SERVICE THEO MẶC ĐỊNH CHẠY TRÊN MAIN THREAD, CÙNG MỘT TIẾN TRÌNH VỚI ỨNG DỤNG CỦA BẠN
Bạn có thể tùy chọn chạy nó trên một tiến trình khác, nhưng nên tránh trường hợp đó trừ khi thực sự cần thiết vì giá phải trả lại cho việc sử dụng đó là rất đắt.
###  3.  KHÔNG CÓ PHÉP MÀU NÀO ĐẰNG SAU INTENTSERVICE
IntentService hoạt động bằng việc khởi tạo một HandlerThread, trên đó nó sẽ được đưa vào các hàng đợi để thực hiện, một kỹ thuật bạn có thể dễ dàng sử dụng mà không cần Service.
###  4.  CHỈ CÓ MỘT INSTANCE CỦA SERVICE MỘT LÚC
Bạn có thể khởi tạo nhiều lần một Service nhưng chỉ có duy nhất một instance một lúc, ngay cả khi tiến trình hoặc ứng dụng bên ngoài tương tác với nó.
###  5.  MỘT SERVICE CÓ THỂ DỄ DÀNG BỊ HỦY BỎ
Bạn có thể đánh dấu một Service là foreground để nó khó bị hủy bỏ hơn, nhưng chỉ nên làm vậy nếu thực sự cần thiết.
Lưu ý rằng khi code đang chạy trong các phương thức onCreate(), onStartCommand() hay onDestroy() thì Service được coi như là đang chạy trong foreground để đảm bảo việc khởi tạo và hủy bỏ diễn ra thành công.
###  6.  MỘT SERVICE CÓ THỂ LÀ “STARTED”, “BOUND” HOẶC CẢ HAI CÙNG MỘT LÚC
Việc dừng một service sẽ không thực hiện được nếu có các thành phần giàng buộc đến nó, và loại bỏ sự giàng buộc của tất cả các thành phần đến service cũng không hủy bỏ service đến khi nó được dừng một cách tường minh. Cũng nên lưu ý rằng kể cả bạn gọi startService() bao nhiêu lần thì chỉ cẩn gọi stopService() hoặc stopSelf() một lần là Service sẽ bị dừng lại.
Hình bên dưới là vòng đời của một started và bound service (nguồn: medium.com)
![](https://images.viblo.asia/df37c66d-0f87-4c86-881c-a3a499fcc7f7.png)
###  7.  START_FLAG_REDELIVERY SẼ TRÁNH MẤT DỮ LIỆU ĐẦU VÀO
Nếu bạn truyền dữ liệu khi khởi tạo Service thì việc trả về cờ START_FLAG_REDELIVERY trong onStartCommand() sẽ hữu ích khi Service bị hủy bỏ trong quá trình xử lý dữ liệu đó.
###  8.  THÔNG BÁO FOREGROUND CÓ THỂ ĐƯỢC ẨN ĐI MỘT PHẦN
Một foreground Service phải hiển thị một thông báo cố định, nhưng bạn có thể cho thông báo đó có giá trị ưu tiên PRIORITY_MIN để ẩn nó đi khỏi thanh trạng thái.
###  9.  MỘT SERVICE CÓ THỂ BẮT ĐẦU MỘT ACTIVITY
Cũng giống như các Context mà không phải Activity, bạn có thể bắt đầu một Activity từ một Service nếu thêm cờ FLAG_ACTIVITY_NEW_TASK.
Ngoài ra cũng có thể hiển thị Toast và thông báo trên thanh trạng thái.
###  10.  BẠN ĐƯỢC SỬ DỤNG SINGLE RESPONSIBILITY PRINCIPLE
Bạn không nên gói hết logic nghiệp vụ trong lớp Service mà nên khai triển trên các lớp khác nhau. Theo cách đó, bạn có thể tự do sử dụng chúng ở những nơi khác.
### NGUỒN THAM KHẢO
[Medium](https://medium.com/@workingkills/10-things-didn-t-know-about-android-s-service-component-a2880b74b2b3)