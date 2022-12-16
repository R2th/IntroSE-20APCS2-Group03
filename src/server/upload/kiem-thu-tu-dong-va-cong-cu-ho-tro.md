Kiểm thử đang được xem là giải pháp chủ yếu nhằm đảm bảo chất lượng cho các sản phẩm phần mềm. Tuy nhiên, các hoạt động kiểm thử hiện nay chủ yếu được thực hiện một cách thủ công và tiêu tốn khoảng 30-50% tài nguyên (thời gian, nhân lực và chi phí) của quá trình phát triển sản phẩm phần mềm. Hơn nữa, độ phức tạp của các phần mềm ngày càng tăng và trong môi trường cạnh tranh như hiện nay đòi hỏi các công ty phần mềm phải áp dụng các phương pháp và công cụ nhằm tự động hóa các hoạt động kiểm thử. Chương này giới thiệu về kiểm thử tự động và các công cụ hỗ trợ nhằm giải quyết vấn đề này. 
# 1. Tổng quan về kiểm thử tự động
Kiểm thử tự động là quá trình thực hiện một cách tự động các bước trong một kịch bản kiểm thử. Kiểm thử tự động bằng một công cụ nhằm rút ngắn thời gian kiểm thử. Mục đích của kiểm thử tự động là giảm thiểu thời gian, công sức và kinh phí, tăng độ tin cậy, tăng tính hiệu quả và giảm sự nhàm chán cho người kiểm thử trong quá trình kiểm thử sản phẩm phần mềm. Kiểm thử tự động sẽ được sử dụng khi dự án không đủ tài nguyên (thời gian, nhân lực và chi phí), phải thực hiện kiểm thử hồi quy khi sản phẩm được sửa đổi hoặc nâng cấp và cần kiểm thử lại các tính năng đã thực hiện tốt trước đó, kiểm tra khả năng vận hành của sản phẩm trong các môi trường đặc biệt (đo tốc độ xử lý trung bình ứng với mỗi yêu cầu, xác định khả năng chịu tải tối đa, xác định cấu hình tối thiểu để thực thi hệ thống, kiểm tra các cơ chế an ninh và an toàn, ...). 
# 2. Kiến trúc của một bộ công cụ kiểm thử tự động
Trong thức tế, có rất nhiều bộ công cụ hỗ trợ kiểm thử tự động được phát triển nhằm góp phần giải quyết các vấn đề khó khăn của quy trình kiểm thử. Hình 2.1 mô tả kiến trúc chung nhất của một bộ kiểm thử tự động. Trong kiến trúc này, các công cụ kiểm thử được tích hợp trong một quy trình thống nhất nhằm hỗ trợ đầy đủ các hoạt động kiểm thử trong quy trình kiểm thử các sản phẩm phần mềm.

![](https://images.viblo.asia/73d42a84-0946-4a5c-994e-c1e1fdffb691.png)

*Hình 2.1: Kiến trúc chung của một bộ kiểm thử tự động* 

Các công cụ cơ bản trong kiến trúc này bao gồm:

* **Quản lý kiểm thử:** công cụ này cho phép quản lý việc thực hiện / thực thi các ca kiểm thử. Nó giám sát việc thực hiện từng ca kiểm thử ứng với bộ giá trị đầu vào, giá trị đầu ra mong muốn và giá trị đầu ra thực tế. JUnit là một ví dụ điển hình về công cụ này.
* **Sinh các ca kiểm thử:** Đây là một trong những công cụ quan trọng nhất của các bộ kiểm thử tự động. Tùy thuộc vào các kỹ thuật kiểm thử được áp dụng, công cụ này sẽ sinh ra tập các ca kiểm thử (chưa gồm giá trị đầu ra mong muốn) cho chương trình/đơn vị chương trình cần kiểm thử. Các ca kiểm thử được sinh ra chỉ chứa giá trị đầu vào để thực hiện nó. Các giá trị này có thể được lựa chọn trong cơ sở dữ liệu hoặc được sinh một cách ngẫu nhiên.
* **Sinh giá trị đầu ra mong muốn:** Các ca kiểm thử được sinh ra bởi công cụ trên chỉ chứa các giá trị đầu vào. Công cụ này cho phép sinh ra giá trị đầu ra mong muốn ứng với mỗi bộ dữ liệu đầu vào của mỗi ca kiểm thử. Giá trị đầu ra mong muốn này sẽ được so sánh với giá trị đầu ra thực tế khi thực hiện ca kiểm thử này nhằm phát hiện ra các lỗi/khiếm khuyết của sản phẩm.
* **So sánh kết quả kiểm thử:** Công cụ này so sánh giá trị đầu ra thực tế và giá trị đầu ra mong muốn của mỗi ca kiểm thử khi nó được thực hiện trên chương trình/đơn vị chương trình cần kiểm thử.
* **Tạo báo cáo kiểm thử:** Một trong những ưu điểm của các bộ công cụ kiểm thử tự động là nó có cơ chế sinh báo cáo kiểm thử một cách chính xác và nhất quán. Dựa vào kết quả của công cụ so sánh kết quả kiểm thử, công cụ này sẽ tự động sinh ra báo cáo kết quả kiểm thử theo định dạng mong muốn của đơn vị phát triển.
* **Phân tích động:** Công cụ này cung cấp một cơ chế nhằm kiểm tra việc thực hiện của các câu lệnh của chương trình cần kiểm thử nhằm phát hiện ra các lỗi và phát hiện các câu lệnh/đoạn lệnh không được thực hiện bới một tập các ca kiểm thử cho trước. Công cụ này cũng rất hiệu quả trong việc đánh giá tính hiệu quả của một bộ kiểm thử cho trước.
* **Bộ mô phỏng:** Có nhiều loại mình mô phỏng được cung cấp trong các bộ kiểm thử tự động. Mục đích của các công cụ này là mô phỏng quá trình thực hiện của chương trình cần kiểm thử. Ví dụ, các công cụ mô phỏng giao diện người dùng cho phép thực hiện tự động các tương tác giữa người dùng và sản phẩm. Selenium1 là một ví dụ về một công cụ mô phỏng giao diện người dùng cho các ứng dụng Web. 

Trong thực tế, các bộ công cụ kiểm thử tự động có thể có thêm một số
công cụ khác như cho phép đặc tả các tính chất của hệ thống cần kiểm thử,
vân vân. Một số bộ công cụ chỉ hỗ trợ một số công cụ trong các công cụ đã
liệt kê ở trên.

# 3. Một số công cụ kiểm thử tự động
## 3.1 CFT4CUint
Nhằm cung cấp một công cụ kiểm thử tự động các đơn vị chương trình (các hàm) viết bằng ngôn ngữ C phục vụ các sinh viên trong việc nghiên cứu và học tập, chúng tôi đã phát triển một công cụ có tên CFT4CUnit (Control Flow Testing for C Unit). Công cụ này tự động hóa các bước trong quy trình kiểm thử dòng điều khiển như đã giới thiệu trong chương6. Đầu vào của công cụ này là các hàm/đơn vị chương trình viết bằng ngôn ngữ C và độ đo cần kiểm thử. Công cụ sẽ xây dựng đồ thị dòng dữ liệu ứng với độ đo này, hiễn thị đồ thị luồng điều khiển một cách trực quan và sinh ra các ca kiểm thử tương ứng. Các ca kiểm thử được sinh ra sẽ được xuất ra một tệp nhằm giúp cho kiểm thử viên thêm gia trị đầu ra mong muốn vào mỗi ca kiểm thử. Khi kiểm thử viên làm việc với mỗi ca kiểm thử, công cụ cho phép làm nổi bật dòng điều khiển của đơn vị chương trình ứng với ca kiểm thử này nhằm trợ giúp trong việc sinh giá trị đầu ra mong muốn một cách chính xác. Cuối cùng, công cụ cho phép thực hiện các ca kiểm thử và tạo ra báo cáo kiểm thử.

![](https://images.viblo.asia/eb837b1f-dc2d-4beb-b636-6222e7b3562f.png)

*Hình 3.1: Hàm IsTrangle làm đầu vào cho công cụ CFT4CUint.*

Hình 3.1 là mã nguồn của hàm IsTrangle bằng ngôn ngữ C. Hàm này sẽ được cung cấp làm đầu vào cho công cụ CFT4CUnit. Đồ thị dòng điều khiển và các ca kiểm thử của Hàm IsTrangle sinh bởi công cụ CFT4CUnit như giao diện trong hình 9.3. Công cụ này cùng tài liệu hướng dẫn sử dụng và các ví dụ áp dụng được cung cấp tại. Chúng tôi cũng đã cung cấp mã nguồn của công cụ này nhằm cho phép các sinh viên có thể mở rộng công cụ này phục vụ các mục đích học tập và nghiên cứu.

![](https://images.viblo.asia/644e6a51-38c6-42a8-b1b4-d7ba48bd72bc.png)

*Hình 3.2 Đồ thị dòng điều khiển và các ca kiểm thử của Hàm IsTrangle sinh bởi công cụ CFT4CUint*

## 3.2 JDFT
Với mục tiêu như công cụ CFT4CUnit, chúng tôi đã phát triển công cụ có tên JDFT (Data Flow Testing for Java Programs) nhằm tự động hóa phương pháp kiểm thử dòng dữ liệu như đã giới thiệu trong chương 7. Đầu vào của công cụ này là các tệp .java tương ứng với mã nguồn của một lớp đối tượng.
Công cụ cho phép chọn tệp đầu vào như giao diện trong hình 9.4.

MỘT SỐ CÔNG CỤ KIỂM THỬ TỰ ĐỘNG 

![](https://images.viblo.asia/9bc1cefa-81a0-4557-8564-44a6651ddc3d.png)

*Hình 3.3 Giao diện cho phép chọn tệp mã nguồn .java cần kiểm thử*

Sau khi chọn tệp đầu vào, JDFT sẽ tự động xây dựng đồ thị dòng dữ liệu và hiễn thị nó cũng mã nguồn tương ứng như giao diện trong hình 3.4. Cuối cùng, công cụ sẽ sinh các ca kiểm thử cùng đầu ra mong muốn ứng với từng ca kiểm thử được sinh ra. Các ca kiểm thử này sẽ được lưu lại dưới một tệp Excel nhằm sử dụng lại trong tương lai. JDFT sẽ phân tích và sinh báo cáo kiểm thử như hình 3.5.
Công cụ này cùng tài liệu hướng dẫn sử dụng và các ví dụ áp dụng được cung cấp tại. Chúng tôi cũng đã cung cấp mã nguồn của công cụ này nhằm cho phép các sinh viên có thể mở rộng công cụ này phục vụ các mục đích học tập và nghiên cứu.

![](https://images.viblo.asia/62c4aa12-9763-42f2-8ee6-7e189cad0488.png)

*Hình 3.4 Giao diện hiển thị mã nguồn và đồ thị dòng điều khiển*

## 3.3 JUnit
Công cụ kiểm thử cho các đơn vị chương trình viết bằng Java, JUnit4 , cung cấp một cơ sở hạ tầng chuẩn cho việc thiết lập các bộ kiểm thử. Một khi bộ kiểm thử được thiết lập, nó có thể tự động chạy mỗi khi mã thay đổi. JUnit khuyến khích các nhà phát triển viết các kịch bản kiểm thử, chèn các mã
kiểm thử vào mã nguồn Java và thực hiện chúng để phát hiện các lỗi bên trong đơn vị chương trình. Khác với các công cụ khác, JUnit không hỗ trợ cơ chế sinh các ca kiểm thử. Hiện nay, JUnit đã được tích hợp trong Eclipse và hỗ trợ rất đắc lực cho quá trình kiểm thử.

![](https://images.viblo.asia/6517e4b6-9a32-4c9f-9e43-4511090f9f83.png)

*Hình 3.5 Báo cáo kiểm thử được sinh bởi công cụ JDFT

## 3.4 QuickTest Professional

Quick Test Professional là phần mềm kiểm soát việc kiểm thử tự động các chức năng của các sản phẩm phần mềm cần kiểm thử. Sản phẩm này bao gồm một tập các mô-đun có thể tương tác với nhau nhằm quản lý toàn bộ quy trình kiểm thử phần mềm. Quick Test Professional là một công cụ hỗ trợ kiểm thử hàm (kiểm thử chức năng) và cho phép tiến hành kiểm thử hồi quy một cách tự động.

## 3.5 Apache JMeter
 Apache JMeter được dùng để kiểm thử khả năng chịu tải và kiểm thử hiệu năng cho các ứng dụng Web và một số ứng dụng khác. Công cụ này hỗ trợ kiểm thử hiệu năng của các mã nguồn được viết bằng các ngôn ngữ khác nhau như PHP, Java, ASP.NET, . . . Apache JMeter mô phỏng khả năng chịu tải của các máy chủ trên máy sử dụng để kiểm thử hệ thống. Công cụ này hỗ trợ giao diện đồ họa giúp phân tích tốt hiệu suất khi kiểm thử đồng thời nhiều ca kiểm thử. Ngoài ra, Apache JMeter còn hỗ trợ thêm nhiều tiện ích khác. Các tiện ích này được cung cấp tại http://jmeter-plugins.org 
 
 ## 3.6 Load Runner
 
   Load Runner giả lập một môi trường ảo gồm nhiều người dùng thực hiện các giao dịch cùng một lúc nhằm giám sát các thông số xử lý của phần mềm cần kiểm thử. Kết quả thống kê sẽ được lưu lại và cho phép kiểm thử viên thực hiện phân tích nhằm kiểm thử khả năng chịu tải và các yêu cầu phi chức năng khác của sản phẩm.
   Trong quá trình kiểm thử, Load Runner tự động tạo ra các kịch bản kiểm thử để lưu lại các thao tác người dùng tương tác lên phần mềm. Mỗi kịch bản này còn được xem là hoạt động của một người dùng ảo mà Load Runner giả lập. Ngoài ra, công cụ này còn cho phép tổ chức, điều chỉnh, quản lý và
giám sát hoạt động kiểm tra khả năng chịu tải. 

# 4. Tổng kết
Kiểm thử tự động đang được quan tâm như là một giải pháp hiệu quả và duy nhất nhằm cải thiện tính chính xác và hiệu quả cũng như giảm kinh phí và rút ngắn thời gian trong quá trình kiểm thử các sản phẩm phần mềm. Đã có nhiều công cụ được phát triển hỗ trợ các mục đích trên. Tùy thuộc vào yêu cầu kiểm thử của từng sản phẩm, các công ty sẽ lựa chọn các công cụ phù hợp. Tuy nhiên, rất khó để tìm được một bộ công cụ đáp ứng tất cả các yêu cầu kiểm thử. Trong nhiều trường hợp, các công ty cần chủ động mở rộng và phát triển thêm các công cụ phục vụ các mục đích cụ thể.