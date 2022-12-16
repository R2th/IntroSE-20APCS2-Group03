# **1. Smoke testing**
Smoke testing là quá trình kiểm tra bản build có ổn định hay không? Để xem bản build có đủ ổn định để thực hiện test chi tiết hay không (trong trường hợp bản build không ổn định, lỗi luôn chức năng chính hoặc build bị lỗi thì trả lại Dev, yêu cầu sửa luôn. Hay kiểm tra các tính năng quan trọng có đang hoạt động hay không.

Nó là 1 bài test hồi quy nhỏ và nhanh của các chức năng chính. Nó là 1 bài test đơn giản cho thấy sản phẩm đã sẵn sàng cho việc test chưa.

# **2. Functional testing**

Kiểm thử chức năng là 1 loại kiểm thử phần mềm, theo đó hệ thống được kiểm tra theo các yêu cầu/đặc tả chức năng.
Các chức năng(hoặc tính năng) được kiểm tra bằng cách cung cấp cho chúng đầu vào và kiểm tra đầu ra. Kiểm thử chức năng đảm bảo rằng các yêu cầu được đáp ứng đúng bởi ứng dụng. Loại kiểm thử này không liên quan đến cách xử lí xảy ra, mà là, với kết quả xử lí. Nó mô phòng việc sử dụng hệ thống thực tế nhưng không đưa ra bất kỳ giả định cấu trúc hệ thống nào.

Trong quá trình kiểm thử chức năng, kỹ thuật kiểm thử hộp đen được sử dụng.

Kiểm thử chức năng thường được thực hiện trong các cấp độ kiểm thử hệ thống và kiểm thử chấp nhận.

Thông thường, kiểm thử chức năng bao gồm các bước sau:
+ Xác định các chức năng mà phần mềm dự kiến sẽ thực hiện
+ Tạo dữ liệu đầu vào dựa trên đặc tả chức năng
+ Xác định đầu ra dựa trên các đặc tả chức năng
+ Thực hiện kiểm thử
+ So sánh kết quả thực tế và kết quả mong đợi

Kiểm thử chức năng hiệu quả hơn khi các điều kiện kiểm thử được tạo trực tiếp từ yêu cầu người dùng. Khi các điều kiện kiểm tra được tạo từ tài liệu hệ thống, các lỗi trong tài liệu đó sẽ không được phát hiện thông qua kiểm thử và đây có thể là nguyên nhân người dùng cuối phẫn nộ khi họ sử dụng phần mềm.

# **3. Usability testing**
Kiểm thử khả năng sử dụng là một loại kiểm thử được thực hiện từ góc độ người dùng cuối để xác định xem hệ thống có dễ sử dụng hay không.

Hệ thống có thể được xây dựng 100% theo đặc tả. Tuy nhiên, chúng có thể không thể sử dụng được khi rơi vào tay người dùng cuối. chẳng hạn người dùng cần in Báo cáo cập nhật tài chính, cứ sau 30 phút họ phải trải qua các bước sau:
+ Đăng nhập vào hệ thống.
+ Click báo cáo.
+ Từ các nhóm báo cáo, chọn báo cáo tài chính.
+ Từ danh sách báo cáo tài chính, chọn báo cáo cập nhật tài chính.
+ Chỉ định các tham số sau:
	Phạm vi ngày
	Múi giờ
	Các phòng ban
	Các đơn vị
+ Click tạo báo cáo.
+ Click in.
+ Chọn 1 tùy chọn: In dưới dạng PDF hoặc in thật.
=> Nếu đó là trường hợp thì hệ thống có thể không sử dụng được(mặc dù nó hoạt động rất tốt). Nếu báo cáo được in thường xuyên, sẽ không thuận tiện nếu người dùng có thể hoàn thành công việc chỉ trong vài cú nhấp chuột, thay vì phải trải qua nhiều bước như liệt kê ở trên. Điều gì sẽ xảy ra nếu có 1 tính năng lưu các báo cáo được tạo thường xuyên dưới dạng mẫu và nếu các báo cáo đã lưu có sẵn để in từ trang chủ.

Kiểm tra khả năng sử dụng thường được thực hiện trong suốt các mức của kiểm thử hệ thống và kiểm thử chấp nhận.

Lời khuyên:
+ Hiểu người dùng của hệ thống là ai?
+ Hiểu nhu cầu kinh doanh của họ là gì?
+ Cố gắng bắt chước hành vi của họ?
+ Bạn có giỏi nhập vai không? Nếu không, thực hành.
=>	Kiểm thử khả năng sử dụng không được nhầm lẫn với kiểm thử chấp nhận người dùng hoặc giao diện người dùng/ kiểm tra nhìn và cảm nhận.

# **4. Security testing**
Kiểm thử bảo mật là một loại kiểm thử phần mềm có ý định phát hiện ra các lỗ hổng của hệ thống và xác đinh rằng dữ liệu và tài nguyên của nó được bảo vệ khỏi những kẻ xâm nhập có thể.

Có bốn lĩnh vực trọng tâm chính được xem xét trong kiểm thử bảo mật(đặc biệt đối với các trang web/ứng dụng):
+ Bảo mật mạng: điều này liên quan đến việc tìm kiếm các lỗ hổng trong cơ sở hạ tầng mạng(tài nguyên và chính sách)
+ Bảo mật phần mềm hệ thống: điều này liên quan đến việc đánh giá các điểm yếu trong các phần mềm khác nhau(hệ điều hành, hệ thống csdl và phần mềm khác) mà ứng ụng phụ thuộc vào.
+ Bảo mật ứng dụng phía máy khách: Điều này liên quan đến việc đảm bảo rằng máy khách (trình duyệt hoặc bất kỳ công cụ nào như vậy) không thể bị thao túng.
+ Bảo mật ứng dụng phía máy chủ: Điều này liên quan đến việc đảm bảo rằng mã máy chủ và các công nghệ của nó đủ mạnh để chống lại mọi sự xâm nhập.

Có vô số cách để phá vỡ một ứng dụng. Và kiểm thử bảo mật không phải là biện pháp duy nhất(hoặc tốt nhất) về mức độ an toàn của một ứng dụng. Nhưng khuyến khích rằng kiểm thử bảo mật được đưa vào như một phần của quy trình phát triển phần mềm tiêu chuẩn.

Ví dụ: SQL injection
+  SQL injection là kĩ thuật tiêm mã có thể phá hủy cơ sở dữ liệu, là 1 trong những kĩ thuật hacking web phổ biến nhất. Là vị trí của mã độc trong các câu lệnh SQL, thông qua đầu vào trang web.
+ Thường xảy ra khi trang web yêu cầu người dùng nhập như tên người dùng/mã người dùng thay vì tên/id, người dùng cung cấp cho bạn 1 câu lệnh SQL mà bạn vô tình chạy trên csdl của mình.
+ Dev có thể bỏ quên trường hợp này khi code, nên việc test bảo mật là rất quan trọng.

# **5. Performance testing**
Kiểm thử hiệu năng là một loại kiểm thử phần mềm, nó đo tải khả năng của 1 hệ thống và cách cư xử trong điều kiện hoạt động bình thường. nó tìm ra điểm ngưỡng tối đa chịu tải của hệ thống

Kiểm thử hiệu năng cũng đo cả hệ thống chiếm dụng tài nguyên như: CPU, RAM hay bộ nhớ. Nếu vượt ngưỡng( như chiếm 80% RAM) thì hiệu năng của hệ thống không đạt

Ví dụ: kiểm tra hiệu năng của 1 trang Login với số lượng user đăng nhập tăng dần là: 100, 200, 300, 400, 1000… xem response time trả về là bao nhiêu ms, tức là 1000 user đăng nhập cùng 1 lúc thì thời gian hoàn thành sẽ làm bao nhiêu. Ngoài ra cũng tăng dần số lượng user truy cập cùng 1 lúc để tìm ngưỡng chết(peak) của hệ thống
Các tool test hiệu năng: Load Runner, Jmeter 
Các bước thực hiện trên Jmeter:
+ Ghi script
+ Chỉnh sửa script( như xóa script thừa, đổi tên nếu cần)
+ Chạy script
+  Add báo cáo và tổng hợp báo cáo

# **6. Regression testing**

Test hồi quy là test lại 1 chức năng đã được làm xong, đã được test xong rồi, đã hết lỗi nhưng do có sự thay đổi 1 chức năng khác mà lại có ảnh hưởng đến nó, thì phải test 1 chức năng đã xong rồi thì gọi là test hồi quy.

Hoặc ngay cả khi re test để đóng bug, mà thấy chức năng Developer sửa có thể làm ảnh hưởng đến 1 chức năng khác đã xong rồi thì tester cũng nên test hồi quy lại chức năng đó để tránh có lỗi tiềm ẩn mà không biết.

Kiểm thử hồi quy có thể được thực hiện trong bất kỳ cấp độ kiểm thử bào nhưng chủ yếu liên quan trong kiểm thử hệ thống.

# **7. Tài liệu tham khảo**
http://softwaretestingfundamentals.com - Mục Type