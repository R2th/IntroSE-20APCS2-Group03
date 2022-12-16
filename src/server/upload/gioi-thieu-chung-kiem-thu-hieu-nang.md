Kiểm thử hiệu năng được tiến hành để giúp cho đội ngũ phát triển phần mềm có thể giải quyết được những câu hỏi như là :
- Liệu ứng dụng có đáp ứng đủ cho người dùng 1 cách nhanh chóng?
- Liệu ứng dụng có ổn định như mong muốn của người dùng về khả năng chịu tải không?
# 1.  Mục đích kiểm thử hiệu năng
-  Nhằm giảm bớt những rủi ro của việc ứng dụng, ngăn ngừa hệ thống downtime và sẵn sàng trước các vấn đề gặp phải, nâng cấp và phát triển phần mềm .
-  Xác nhận và xác minh những thuộc tính chất lượng khác của hệ thống như : khả năng mở rộng, độ tin cậy và mức độ sử dụng tài nguyên.
-  Xác định công suất vận hành tối đa của một ứng dụng như các điểm "thắt cổ chai" (bottleneck) và xác định phần tử nào là nguyên nhân gây ra điều đó.
![](https://images.viblo.asia/732902b9-02b3-4f4a-a8f5-d113afd4503c.png)
- Chứng minh rằng hệ thống đáp ứng tiêu chí về hiệu năng đã đặt ra và có thể triển khai thực tế. 
- Có thể tính toán hiệu năng các phần nhỏ của hệ thống, từ đó tìm ra nguyên nhân của những phần gây chậm hiệu năng hệ thống. 
- Đưa ra chiến lược sizing(xác định cấu hình) hệ thống 
- Tìm điểm yếu của hệ thống để đưa ra những rủi ro và phương án khắc phục
###  Các yếu tố được kiểm thử
- Thời gian đáp ứng (response time) 
- Tỷ lệ lỗi (pass/fail)
-  Thông lượng (throughput)
- Số yêu cầu trên 1 giây (TPS – transaction per second) 
- Số người dùng đồng thời (thread/concurrent user / virtual user) 
- Tài nguyên máy (RAM, CPU…)
# 2. Các thuật ngữ trong kiểm thử hiệu năng
- CCU – Concurrent user: số lượng user đẩy tải (Thread/virtual user) 
- Resoure Monitoring: (giám sát tài nguyên hệ thống)
- TPS (Transaction Per Second): Số Transaction được xử lý thành công trong 1 giây. 
- Throughput: số Transaction xử lý thành công trong 1 đơn vị thời gian
- Respond Time: Thời gian phản hồi của hệ thống, tính từ lúc request được gửi đi tới khi nhận được respond trả về từ hệ thống. 
- Ngưỡng: Số user tối đa mà chức năng cho phép khi truy cập đồng thời.
- Breaking point( Điểm chết của hệ thống): Số user truy cập đồng thời vào hệ thống làm hệ thống bị chết hoặc dán đoạn.
# 3. Các loại kiểm thử hiệu năng
![](https://images.viblo.asia/a89e29a1-d7cc-4552-842e-805e50d5a0a3.jpg)
##  Load Testing:
- Là một quá trình đẩy request và đo lường phản ứng của hệ thống hoặc thiết bị. 
- Load testing được thực hiện để xác định hành vi của một hệ thống dưới điều kiện tải bình thường và điều kiện tải cao tải. 
- Load testing giúp xác định khả năng hoạt động tối đa của hệ thống cũng như bất cứ tắc nghẽn (bottlenecks) hay yếu tố gây ra sự suy thoái (degradation).
- Các tham số: Respond Time, TPS, throughput,….
## Capacity test & volume test
- Là kiểm thử phi chức năng.
- Kiểm thử với một lượng dữ liệu lớn. Dữ liệu có thể là kích thước cơ sở dữ liệu hoặc kích thước của 1 tập tin giao tiếp (.dat, .xml) là đối tượng của volume testing
- Capacity test: xác định chiến lược để định cỡ (sizing) hệ thống nhằm đáp ứng được yêu cầu hiệu năng của hệ thống trong tương lai.
## Endurance test
- Test độ bền: là một phần của Load test nhằm xác định các thông số hiệu năng của hệ thống trong điều kiện tải dự kiến trong 1 thời gian dài.
##  Street test
- Là một cách để kiểm tra (độ) tính tin cậy. 
- Là việc đẩy hệ thống lên trên mức giới hạn của nó (điều kiện tải cực cao) để xác định các điểm yếu (weak point – các lỗi như đồng bộ, thiếu bộ nhớ...) 
- Làm gián đoạn trang web bằng cách tăng lượng tải cao hơn và kiểm tra xem hệ thống phản ứng như thế nào và phục hồi như thế nào.
## Spike Testing 
Spike testing là một loại stress testing, nó được đưa ra để đánh giá hiệu năng của phần mềm khi khối lượng công việc tăng lên nhanh chóng và thường xuyên. Khối lượng công việc thường sẽ vượt quá mức bình thường trong thời gian ngắn.
# 4. Quy trình kiểm thử hiệu năng
Thực hiện kiểm thử tải cho một hệ thống dựa trên các giới hạn hệ thống đã đưa ra trước 
Thực hiện kiểm thử tải để xác định các giới hạn cho một hệ thống để đưa ra các giới hạn cho một hệ thống, để đưa ra các giới hạn cho việc triển khai duy trì và phát triển hệ thống. Vậy để thực hiện hiệu quả loại test này chúng ta cần thực hiện lần lượt 4 bước cơ bản sau :
## Lập kế hoạch test
- Mục tiêu kiểm thử, yêu cầu kiểm thử, thiết kế kiểm thử và các quản trị dự án. Các bước thực hiện được mô tả một cách rõ ràng , mục đích thu được sau khi test phải được mô tả chi tiết . Xác định yêu cầu về hiệu năng, cấu hình của ranh giới và xác định khi nào bắt đầu kiểm thử
 ## Thiết lập kịch bản test
- Kịch bản là trình tự các thao tác, các script sẽ được thực hiện trong một khoảng thời gian với 1 số người dùng xác định để đạt được các mục đích test khác nhau
## Tạo lập scripts
-  Là những thao tác thực tế của người dùng được lưu lại nhằm phục vụ cho việc kiểm thử hiệu năng
## Thực thi kịch bản test
- Thực hiện chạy chương trình trên nhiều máy tính khác nhau trong cùng một thời điểm để kiểm thử, và quản lý/giám sát việc thực thi trong suốt quá trình chạy. 
## Phân tích kết quả test
- Phân tích kết quả sau khi thực thi và đưa ra những kết luận về hiệu năng

*Tóm lại performance testing  là 1 loại kiểm thử phần mềm tập trung vào việc kiểm tra hoạt động của hệ thống với các trường hợp truy cập đặc thù. Kiểm thử hiệu năng không phải loại kiểm thử tập trung vào việc tìm ra lỗi phần mềm hoặc sai sót của hệ thống mà để đo lường dựa theo các mốc và tiêu chuẩn, nhờ đó có thể giúp cho đội dev phỏng đoán được và loại trừ các rủi ro trong quá trình vận hành hệ thống.*