*Bài viết sau được dịch từ link: https://stackify.com/ultimate-guide-performance-testing-and-software-testing/*

## 1. Kiểm thử hiệu năng là gì?

Kiểm thử hiệu năng là 1 loại kiểm thử phần mềm tập trung vào việc kiểm tra hoạt động của hệ thống với các trường hợp truy cập đặc thù. Kiểm thử hiệu năng không phải loại kiểm thử tập trung vào việc tìm ra lỗi phần mềm hoặc sai sót của hệ thống mà để đo lường dựa theo các mốc và tiêu chuẩn, nhờ đó có thể giúp cho đội dev phỏng đoán được và loại trừ các rủi ro trong quá trình vận hành hệ thống.

## 2. Kiểm thử hiệu năng thuộc loại kiểm thử nào? 

Để hiểu phần mềm hoạt động thực tế như thế nào, sẽ có nhiều loại kiểm thử hiệu năng được áp dụng trong suốt quá trình kiểm thử phần mềm. Đây là loại kiểm thử phi chức năng, được thiết kế để xác định sự sẵn sàng của hệ thống. (Kiểm thử chức năng tập trung vào những chức năng riêng biệt của phần mềm).
 
## 3. Các loại kiểm thử hiệu năng thông dụng:

![](https://stackify.com/wp-content/uploads/2017/04/TestingTypes.png)

**3.1 Load testing (Kiểm thử tải trọng)**

Kiểm thử tải trọng để đánh giá hiệu năng hệ thống khi khối lượng công việc tăng lên (Khối lượng công việc ở đây được hiểu là khối lượng request từ phía user). Hệ thống được giám sát để tính toán thời gian phản hồi và giữ hệ thống ổn định khi khối lượng công việc tăng lên. 

**3.2 Stress testing**

Không giống như kiểm thử tải trọng, stress được biết đến như là kiểm thử sự tới hạn của hệ thống- nó được dùng để đo lường hiệu năng của hệ thống khi vượt quá các thông số bình thường. Phần mềm có thể sẽ phải tiếp nhận nhiều người dùng hoặc nhiều luồng truy cập hơn khả năng của nó. 
Mục đích của stress testing là đo lường mức độ ổn định của phần mềm. Hệ thống gặp trục trặc ở phần nào và làm thế nào để phần mềm có thể khắc phục lỗi đó?

**3.3 Spike Testing**

Spike testing là một loại stress testing, nó được đưa ra để đánh giá hiệu năng của phần mềm khi khối lượng công việc tăng lên nhanh chóng và thường xuyên. Khối lượng công việc thường sẽ vượt quá mức bình thường trong thời gian ngắn.

**3.4 Endurance testing (Kiểm thử độ bền vững)**

Kiểm thử độ bền vững - còn được gọi là soak testing - là chỉ số đánh giá phần mềm hoạt động như thế nào với khối lượng công việc thông thường trong một thời gian dài. Mục đích của loại kiểm thử này là để kiểm tra những vấn đề về bộ nhớ của hệ thống như rò rỉ bộ nhớ (memory leak) (Rò rỉ bộ nhớ thường xảy ra khi hệ thống gặp vấn đề trong việc giải phóng bộ nhớ không sử dụng nữa. Rò rỉ bộ nhớ có thể làm suy giảm hiệu năng của hệ thống hoặc khiến hệ thống ngừng hoạt động)	

**3.5 Scalability testing (Kiểm thử khả năng mở rộng)**

Kiểm thử khả năng mở rộng được dùng để xác định xem phần mềm có hoạt động hiệu quả nếu khối lượng công việc tăng hay không. Nó được thực hiện bằng cách thêm khối lượng user truy cập hoặc khối lượng data đồng thời theo dõi hoạt động của hệ thống. Khối lượng công việc có thể không thay đổi trong khi các tài nguyên như CPUs hay dung lượng bộ nhớ thay đổi. 

**3.6 Volume Testing (Kiểm thử khối lượng)**

Kiểm thử khối lượng xác định phần mềm hoạt động hiệu quả như thế nào với khối lượng lớn dữ liệu. Nó còn được biết đến như flood testing bởi nó kiểm thử hệ thống với một khối lượng lớn dữ liệu

## 4. Những vấn đề chung cần chú ý trong kiểm thử hiệu năng

Trong quá trình kiểm thử hiệu năng, nhóm phát triển có nhiệm vụ tìm ra những triệu chứng không bình thường và vấn đề của hiệu năng. Các vấn đề về tốc độ như phản hồi chậm hay thời gian tải lâu thường xuyên được chú ý nhưng ngoài ra cũng có những vấn đề khác về hiệu năng có thể được phát hiện:

- Bottlenecking- Thường xảy ra khi luồng dữ liệu bị ngắt hoặc ngừng vì không đủ bộ nhớ khi khối lượng request tăng lên
- Khả năng mở rộng kém: Nếu phần mềm không thể đáp ứng kỳ vọng với số lượng task xảy ra đồng thời, kết quả có thể bị ngưng trệ, lỗi có thể tăng lên hoặc những hành vi không mong muốn của hệ thống xảy ra có thể ảnh hưởng bởi những yếu tố sau: 
  + Disk usage (khối lượng sử dụng ổ đĩa)
  + CPU usage (khối lượng sử dụng CPU)
  + Memory leaks (Rò rỉ bộ nhớ)
  + Operating system limitations (Giới hạn của hệ thống)
  + Poor network configuration (Cấu hình mạng kém)

- Vấn đề về cấu hình phần mềm: Các cài đặt chung không được cài đặt đầy đủ để đáp ứng với khối lượng công việc
- Thiếu tài nguyên phần cứng: Kiểm tra hiệu suất có thể cho thấy các hạn chế về bộ nhớ vật lý hoặc cho thấy các CPU hoạt động kém.

## 5. 7 bước kiểm thử hiệu năng

 - B1. Ghi lại hành động người dùng
 - B2. Chuẩn bị thông số kiểm thử
 - B3. Nhóm các hành động người dùng
 - B4. Tạo các load scenarios
 - B5. Mô phỏng và thực thi tải
 - B6. Phân tích kết quả kiểm thử
 - B7. Báo cáo
 
![](https://stackify.com/wp-content/uploads/2017/04/Performance-Testing-Process.jpg)

Được biết đến như môi trường phát triển phần mềm, môi trường kiểm thử là nơi mà phần mềm, phần cứng và mạng được thiết lập để thực hiện các kiểm thử hiệu năng. Để sử dụng môi trường kiểm thử cho kiểm thử hiệu năng, đội phát triển cần thực hiện 7 bước sau:
  
  **1. Xác định môi trường kiểm thử**
     Xác định phần cứng, phần mềm, cấu hình mạng và công cụ sẵn có cho phép đội kiểm thử thiết kế kịch bản kiểm thử sớm. Môi trường kiểm thử hiệu năng có thể bao gồm:
     - Một phần của production với ít server và cấu hình nhỏ hơn
     - Một phần của production với ít server và cùng cấu hình
     - Bản sao của production
     - Production thực tế

  **2. Xác định các metrics**
     Ngoài việc xác định các metric như thời gian phản hồi, thông lượng và các ràng buộc, bạn phải xác định cả những tiêu chí thành công khi kiểm thử hiệu suất.

  **3. Lên kế hoạch và thiết kế các bài kiểm thử hiệu suất**
     Bạn phải xác định các đặc tả phương thức kiểm thử hiệu suất có cân nhắc đến các yếu tố như sự đa dạng của người dùng, dữ liệu kiểm thử và các số liệu đích.

  **4. Cấu hình môi trường kiểm thử**
     Hãy chuẩn bị đủ tất cả các nhân tố trong môi trường kiểm thử và các công cụ cần thiết để theo dõi các nguồn tài nguyên.

  **5. Triển khai thiết kế kiểm thử của bạn và Phát triển các bài kiểm thử**

 **6. Thực hiện các bài kiểm thử**
     Ngoài việc cho chạy các bài kiểm thử hiệu suất, bạn còn phải giám sát và nắm rõ lượng dữ liệu được sản sinh.

  **7. Thực hiện các bài kiểm thử**
     Hãy phân tích dữ liệu và chia sẻ những gì mình tìm được, sau đó chạy các bài kiểm thử hiệu suất lần nữa với các thông số giống và khác lần đầu.
     
## 6. Các số liệu kiểm thử hiệu suất cần được đo đạc
Số liệu là nhân tố cần thiết để nắm được chất lượng và độ hiệu quả của việc kiểm thử hiệu suất. Nếu không xác định được các số liệu đo lường thì không thể cải thiện kiểm thử hiệu suất được. Ở đây có 2 định nghĩa cần được làm rõ:

- **Measurements** (Số liệu đo lường) - Các dữ liệu thu được, ví dụ như thời gian cần để hệ thống hồi đáp lại 1 request.
- **Metrics** (Số liệu) - Một phép toán dùng các số liệu đo lường để xác định chất lượng của kết quả nhận được, ví dụ như thời gian hồi đáp trung bình (tổng thời gian hồi đáp/số request).

Có rất nhiều cách đo tốc độ, khả năng mở rộng và mức độ ổn định nhưng mỗi vòng kiểm tra hiệu suất đều không thể sử dụng hết các yếu tố trên được. Trong những số liệu được dùng trong việc kiểm thử hiệu suất, các số liệu sau đây thường được dùng hơn cả:

**6.1 Response time (Thời gian hồi đáp)**

Tổng thời gian gửi 1 request và nhận được hồi đáp.

**6.2 Wait time**

Còn được biết đến với cái tên thời gian chờ đợi hay thời gian xử lý request trung bình. Thông số này cho các dev biết thời gian nhận được byte đầu tiên sau khi request được gửi.

**6.3 Average load time (Thời gian tải trung bình)**

Nếu xét theo góc nhìn của người dùng, thời gian trung bình để truyền tải mỗi request là một thông số quan trọng về chất lượng.

**6.4 Peak response time (Thời gian hồi đáp dài nhất)**

Đây là thông số về quãng thời gian lâu nhất để hoàn thành một request. Nếu thông số này vượt trội so với thời gian trung bình thì rất có thể đã xuất hiện lỗi.

**6.5 Error rate (Tỉ lệ lỗi)**

Phép tính này cho ra số phần trăm request dẫn đến lỗi so với tổng số request. Các lỗi này thường xuất hiện khi lượng công việc vượt quá dung lượng bộ nhớ.

**6.6 Concurrent users (Số người dùng đồng thời)**

Đây là cách thông dụng nhất để đo lượng công việc - số lượng người dùng đang hoạt động ở bất kỳ thời điểm nào. Thông số này còn được gọi là load size
(kích cỡ công việc).

**6.7 Requests per second (Số request mỗi giây)**

Số lượng request được xử lý.

**6.8 Transactions passed/failed (Số lượng giao dịch thành công/thất bại)**

Tổng số request thành công hoặc không thành công.

**6.9 Throughput (Thông lượng)**

Thông lượng, được tính bằng đơn vị kilobyte/s, cho biết số lượng băng thông được sử dụng khi kiểm thử.

**6.10 CPU utilization (Hiệu suất CPU)**

Thời gian CPU cần để xử lý request.

**6.11 Memory utilization (Hiệu suất bộ nhớ)**

Dung lượng cần có để xử lý request.