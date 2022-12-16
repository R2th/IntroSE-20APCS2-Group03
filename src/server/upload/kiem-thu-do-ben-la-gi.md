*Hãy tưởng tượng khi bạn kiểm thử một ứng dụng/ phần mềm có tải trọng lớn và dưới cách nhìn của một QA/Tester bạn muốn biết liệu với tải trọng này ứng dụng/phần mềm có thể hoạt động được trong bao lâu nếu bạn liên tục sử dụng chúng? Nếu có những thắc mắc tương tự như trên, bài viết dưới dây có thể giúp đỡ bạn trả lời câu hỏi này.*

### Kiểm thử độ bền là gì? 

Kiểm thử độ bền thường được thực hiện ở giai đoạn cuối của chu kỳ phát triển phần mềm. Nó đảm bảo rằng các ứng dụng có đủ khả năng để xử lý tải trọng lớn mà không có bất kỳ sự giảm hiệu suất nào trong thời gian phản ứng. Kiểu kiểm thử này là cả một quá trình , có thể kéo dài đến hàng năm. Điều này làm nên sự khác nhau giữa kiểm thử độ bền và kiểm thử thử nghiệm tải (thường kết thúc sau một khoảng thời gian ngắn).
![](https://images.viblo.asia/ff1d59a9-963e-4392-a719-5536fd89d0e3.jpg)

### Vậy mục tiêu của kiểm thử độ bền là chi?
Mục tiêu chính của thử nghiệm Độ bền là kiểm tra rò rỉ bộ nhớ. Nó được thực hiện để đảm bảo rằng các khiếm khuyết hoặc rò rỉ bộ nhớ không xảy ra sau quá trình sử dụng bình thường.
Phải đảm bảo rằng sau một thời gian dài, thời gian phản hồi của hệ thống sẽ vẫn như cũ hoặc tốt hơn khi bắt đầu thử nghiệm. Khác với thử nghiệm áp lực (stress) đưa hệ thống thử nghiệm đến giới hạn của nó, thử nghiệm độ bền sẽ đưa ứng dụng đến giới hạn của nó theo thời gian .

### Những điều cần kiểm tra trong kiểm thử độ bền
1. Kiểm tra rò rỉ bộ nhớ 
 Kiểm tra được thực hiện để xác minh nếu có bất kỳ rò rỉ bộ nhớ trong ứng dụng thứ có thể gây treo cứng của hệ thống hoặc hệ điều hành.
2. Kiểm tra kết nối đóng cửa giữa lớp của hệ thống 
 Nếu kết nối giữa các lớp của hệ thống không được đóng thành công, nó có thể trì hoãn một số hoặc tất cả các module của hệ thống.
3. Kiểm tra kết nối cơ sở dữ liệu đóng thành công 
 Nếu kết nối cơ sở dữ liệu không được đóng thành công, có thể dẫn đến sụp đổ hệ thống
4. Kiểm tra thời gian phản hồi 
Hệ thống được kiểm tra thời gian đáp ứng của hệ thống khi ứng dụng trở nên kém hiệu quả do kết quả của việc sử dụng hệ thống kéo dài.

### Làm thế nào để thực hiện Thử nghiệm độ bền?
Dưới đây là phương pháp thử nghiệm cơ bản để kiểm tra độ bền: 

*  Kiểm tra Môi trường – Xác định các phần cứng, phần mềm, hệ điều hành yêu cầu cho kiểm tra độ bền, gán vai trò và trách nhiệm trong nhóm, …Các môi trường nên sẵn sàng trước khi thực hiện thử nghiệm. Bạn cũng cần phải ước tính quy mô sản xuất cơ sở dữ liệu thông thường và tăng trưởng hàng năm.

* Tạo kế hoạch kiểm tra, kịch bản – Dựa trên tính chất của thử nghiệm – bằng tay, tự động hóa hay kết hợp cả hai mà thiết kế test case, review, và việc thực hiện nên được lên kế hoạch rõ ràng.

* Ước lượng Thử nghiệm – Cung cấp ước tính khoảng thời gian để hoàn thành giai đoạn thử nghiệm. Cần phân tích trên cơ sở số người kiểm tra tham gia và số lượng chu kỳ kiểm tra yêu cầu.

* Phân tích rủi ro – Phân tích rủi ro và đưa ra những hành động thích hợp để phòng ngừa.

* Lịch kiểm tra

### Ví dụ về  kiểm thử độ bền 

Ví dụ 1 tình huống cần kiểm thử độ bền:

- 1 trang mua sắm trực tuyến thường xuyên có  gia tăng đột biến về lưu lượng truy cập mỗi khi đến các dịp sale/ lễ tết ...vv...
=>  Chúng ta cần kiểm tra xem ở điều kiện số người truy cập tối đa và hoạt động trong 1 khoảng thời gian dài (ví dụ 2 tháng ) thì hệ thống hoạt động ổn định hay không và liệu có sự cố đang tiếc gì xảy ra không?
Hãy thử thực hiện theo các bước phía trên nhé 

**Bước 1: Kiểm tra môi trường**

 Bạn cần chuẩn bị  các phần cứng, phần mềm, hệ điều hành yêu cầu cho kiểm tra độ bền, phân chia vài trò của từng thành viên trong nhóm. 
Việc này bạn cần chuẩn bị kĩ và cần hỗ trợ từ các bộ phận khác nhau. Vậy nên bạn nên list ra các mục cần chuẩn bị, các đơn vị và bộ phận sẽ trợ giúp, cùng với đó, phân chia rõ vài trò cùng từng thành viên trong nhóm , thành viên nào phụ trách phần công việc nào - liên quan tới các bộ phận nào..
 
**Bước 2: Tạo kế hoạch kiểm tra**

Thiết kế test case, review, và lên kế hoạch.

Ví dụ: bạn sẽ thực hiện kiểm thử trong bao lâu?  Những điều gì bạn cần kiểm tra trong quá trình này ? từ đó bạn sẽ có testcasse/checlist tương ứng cho việc thử nghiệm

**Bước 3: Ước lượng thử nghiệm**

Ước lượng khoảng thời gian cần thử nghiệm. 

Ví  Dụ:
Websiste mua sắm có những khoảng thời gian sale /dịp lễ tết /mua sắm kéo daì đến 2-3 tuần. Và những thời gian đó, lượng người truy cập rất đông, vì vậy boss muốn hệ thống luôn được đảm bảo trong thời gian ít nhaatst là 2-3 tuần đó => Bạn sẽ lên kế hoạch thử nghiệm trong 1 khoảng thời gian dài hơn 2-3 tuần nhiều để chắc chắn rằng dù có ra sao thì hệ thống cũng chẳng sao
=> Và tất nhiên để làm được điều đó bạn cần bàn bạc với các bên và cho ra con số hợp lý nhất để thực hiện theo nó.

**Bước 4: Phân tích rủi ro**

Rủi ro là điều khó tránh khỏi trong quá trình thử nghiệm, hãy liệt kê ra các rủi ro có thể xảy ra và nếu rơi vào tình huống đó cần khắc phục ra sao?

Ví dụ :
- Tình huống website có tối đa số người truy cập trong khoảng thời gian 1 tuần liên tục => Web bị sập , vậy cần xử lý ra sao ? Đó là câu hỏi bạn cần đặt ra.

**Bước 5: Lập lịch kiểm tra**

Chắc chắc điều không thể thiếu là phải có 1 lịch kiểm tra định kì khi thực hiện thử nghiệm này. 

Ví dụ:
Bạn lập lịch kiểm tra hằng ngày vào 1 giờ nhất định : Đảm bảo hệ thống luôn hoạt động tốt, không có rò rỉ dữ liệu..vv Nếu có sự cố cần được ghi nhận lại và tìm cách khắc phục.
Ngoài ra, bạn cũng cần xác định ngân sách, sản phẩm trong khung thời gian đó.

### Giới thiệu 1 số công cụ kiểm tra độ bền

**1. LoadRunner**

LoadRunner của HP là một công cụ Load Testing được sử dụng rộng rãi. Kết quả kiểm thử từ Loadrunner được coi một chuẩn kiểm thử.

![](https://images.viblo.asia/ef21c829-13a0-4591-b94f-c3c47f5866a6.png)

**2. Jmeter** 

  Jmeter là một công cụ kiểm thử mã nguồn mở. Nó là một ứng dụng thuần Java cho việc kiểm thử hiệu năng. Nó cần JDK 5 hoặc cao hơn để hoạt động.
  
  ![](https://images.viblo.asia/540ce1fe-b2f3-4352-b9e3-bbcc48cf323b.png)

**3. Stress Tester** 

Công cụ này cung cấp các phân tích sâu hơn về hiệu suất của ứng dụng web, cung cấp kết quả ở định dạng đồ họa và rất dễ sử dụng.

![](https://images.viblo.asia/30d4dae2-55a8-4512-b48e-f25e84bddf19.gif)

**4. Neo load** 

Đây là một công cụ phổ biến có sẵn trên thị trường để kiểm thử các ứng dụng web và điện thoại di động. Công cụ này có thể mô phỏng hàng ngàn người dùng để đánh giá hiệu suất ứng dụng dưới tải và phân tích thời gian phản hồi. Nó cũng hỗ trợ tích hợp icloud, load test và stress test. Nó rất dễ sử dụng, tiết kiệm chi phí và cung cấp khả năng mở rộng tốt.

![](https://images.viblo.asia/f6609599-3408-47e2-b0cc-c4cffbf73573.png)

### Kết luận

Mục tiêu kiểm thử độ bền là kiểm tra hệ thống trong điều kiện quá tải. Nó giám sát các tài nguyên hệ thống như bộ nhớ, bộ xử lý, mạng v..v.., và kiểm tra khả năng của hệ thống để phục hồi trở lại trạng thái bình thường. Nó kiểm tra xem hệ thống có hiển thị các thông báo lỗi thích hợp hay không. Và mục đích cuối cùng là để đảm bảo hệ thống vẫn sử dụng tốt ngay cả khi nó đã được vận hành trong một thời gian dài và liên tục.

-----


* Bài viết được tham khảo tại các nguồn : 
1. https://www.guru99.com/stress-testing-tutorial.html
2. https://securitybox.vn/