### **1. Kiểm thử bảo mật là gì?**

Kiểm thử bảo mật là một loại kiểm thử phần mềm nhằm khám phá các lỗ hổng, mối đe dọa, rủi ro trong một ứng dụng phần mềm và ngăn chặn các cuộc tấn công độc hại từ những kẻ xâm nhập. Mục đích của Kiểm tra bảo mật là xác định tất cả các lỗ hổng và điểm yếu có thể có của hệ thống phần mềm có thể dẫn đến việc mất thông tin, doanh thu, danh tiếng dưới tay của nhân viên hoặc người ngoài của Tổ chức.

Mục tiêu của kiểm tra bảo mật là xác định các mối đe dọa trong hệ thống và đo lường các lỗ hổng tiềm ẩn của nó, để hệ thống không ngừng hoạt động hoặc bị khai thác. Nó cũng giúp phát hiện tất cả các rủi ro bảo mật có thể có trong hệ thống và giúp các nhà phát triển khắc phục các sự cố này thông qua mã hóa.

### **2. Các loại kiểm thử bảo mật**

Có bảy loại thử nghiệm bảo mật chính:

![](https://images.viblo.asia/3175014e-d802-4dfc-be8c-47a7c70f2bc5.jpg)


* Quét lỗ hổng (Vulnerability Scanning): Điều này được thực hiện thông qua phần mềm tự động để quét một hệ thống chống lại các chữ ký dễ bị tổn thương đã biết.
* Quét bảo mật (Security Scanning): Nó liên quan đến việc xác định các điểm yếu của mạng và hệ thống, và sau đó cung cấp các giải pháp để giảm các rủi ro này. Quá trình quét này có thể được thực hiện cho cả Quét thủ công và Tự động.
* Kiểm tra thâm nhập (Penetration testing): Loại thử nghiệm này mô phỏng một cuộc tấn công từ một tin tặc độc hại. Thử nghiệm này bao gồm phân tích một hệ thống cụ thể để kiểm tra các lỗ hổng tiềm ẩn đối với nỗ lực hack bên ngoài.
* Đánh giá rủi ro (Risk Assessment): Thử nghiệm này bao gồm phân tích các rủi ro bảo mật được quan sát trong tổ chức. Rủi ro được phân loại là Thấp, Trung bình và Cao. Thử nghiệm này khuyến nghị kiểm soát và các biện pháp để giảm thiểu rủi ro.
* Kiểm toán bảo mật (Security Auditing): Đây là một kiểm tra nội bộ của Ứng dụng và Hệ điều hành cho các lỗi bảo mật. Việc kiểm toán cũng có thể được thực hiện thông qua kiểm tra từng dòng mã
* Hack đạo đức (Ethical hacking): Đó là hack một hệ thống phần mềm tổ chức. Không giống như các tin tặc độc hại, những kẻ đánh cắp lợi ích của chúng, mục đích là để lộ các lỗ hổng bảo mật trong hệ thống.
* Đánh giá tư thế (Posture Assessment): Điều này kết hợp quét Bảo mật, Hack đạo đức và Đánh giá rủi ro để hiển thị một tư thế bảo mật tổng thể của một tổ chức.

### **3. Cách để kiểm thử bảo mật**

chi phí đó sẽ cao hơn nếu chúng ta hoãn kiểm tra bảo mật sau giai đoạn triển khai phần mềm hoặc sau khi triển khai. Vì vậy, cần phải liên quan đến thử nghiệm bảo mật trong vòng đời SDLC trong các giai đoạn trước.

Hãy xem xét các quy trình Bảo mật tương ứng được áp dụng cho mọi giai đoạn trong SDLC.

![](https://images.viblo.asia/4f181473-56ed-4bbd-aa6c-6a175e132e28.png)


| Các pha SDLC | Quy trình bảo mật | 
| -------- | -------- |
| Requirements   | Phân tích bảo mật cho các yêu cầu và kiểm tra các trường hợp lạm dụng     | 
| Design   | Phân tích rủi ro bảo mật để thiết kế. Phát triển Kế hoạch kiểm tra bao gồm kiểm tra bảo mật    | 
| Coding and Unit Testing   | Kiểm tra tĩnh - động và kiểm tra hộp trắng     | 
| Integration Testing   | Kiểm tra hộp đen    | 
| System Testing   | Kiểm tra hộp đen và quét lỗ hổng     | 
| Implementation   | Kiểm tra thâm nhập, quét lỗ hổng     | 
| Support   | Phân tích tác động của các bản vá lỗi    | 

**Kế hoạch kiểm tra nên bao gồm:**

* Các trường hợp hoặc tình huống kiểm tra liên quan đến bảo mật
* Kiểm tra dữ liệu liên quan đến kiểm tra bảo mật
* Công cụ kiểm tra cần thiết để kiểm tra bảo mật
* Phân tích các thử nghiệm đầu ra khác nhau từ các công cụ bảo mật khác nhau

### **4. Phương pháp, kĩ thuật kiểm thử bảo mật**

Trong thử nghiệm bảo mật, các phương pháp khác nhau được tuân theo và chúng như sau:

* Tiger Box: Việc hack này thường được thực hiện trên máy tính xách tay có bộ sưu tập HĐH và công cụ hack. Thử nghiệm này giúp người kiểm tra thâm nhập và người kiểm tra bảo mật tiến hành đánh giá và tấn công lỗ hổng.
* Hộp đen: Tester được ủy quyền để thử nghiệm mọi thứ về cấu trúc liên kết mạng và công nghệ.
* Hộp màu xám: Thông tin một phần được cung cấp cho người kiểm tra về hệ thống và nó là sự kết hợp của các mô hình hộp trắng và đen.

### **5. Các vai trò trong kiểm thử bảo mật**

* Tin tặc (Hackers) - Truy cập hệ thống máy tính hoặc mạng mà không được phép
* Crackers (Crackers) - Đột nhập vào hệ thống để đánh cắp hoặc phá hủy dữ liệu
* Hacker đạo đức (Ethical Hacker) - Thực hiện hầu hết các hoạt động vi phạm nhưng được sự cho phép của chủ sở hữu
* Script Kiddies hoặc gói khỉ (Script Kiddies or packet monkeys) - Tin tặc thiếu kinh nghiệm có kỹ năng ngôn ngữ lập trình

Bài viết về kiểm thử bảo mật của mình xin được kết thúc ở đây! Nếu bạn nào đam mê và muốn tìm hiểu kĩ hơn về kiểm thử bảo mật, các bạn có thể tìm hiểu thêm thông qua nguồn tài liệu dưới đấy. Mình xin cảm ơn!

***Tài liệu tham khảo***: https://www.guru99.com/what-is-security-testing.html