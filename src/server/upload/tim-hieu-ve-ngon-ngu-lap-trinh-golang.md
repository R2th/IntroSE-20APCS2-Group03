**Golang là gì?**

Go(Golang) là ngôn ngữ lập trình mã nguồn mở, được phát triển tại Google bởi Robert Griesemer, Rob Pike and Ken Thompson vào năm 2007.
    
**Tại sao lại là Golang?**

 Vài năm gần đây có một sự phát triển mạnh mẽ trong giới ngôn ngữ lập trình mang tên Golang. Các tin tuyển dụng và Golang ngày càng nhiều hơn và chưa có dấu hiệu thuyên giảm, đặc biệt khi cơn sốt Blockchain đang nóng hơn khi nào hết. Rất dễ để bạn có thể tìm thấy 1 JD về Backend hoặc Blockchain có yêu cầu ngôn ngữ Golang hiện nay.
 
**Tính tiện dụng của Go**
![image.png](https://images.viblo.asia/5b9357ec-9cd2-4483-b6fe-77f46c94c3bf.png)

Go là một ngôn ngữ có tính tinh gọn trong cú pháp, hạn chế các cú pháp dài dòng như các ngôn ngữ khác.

Bởi vì Google là 1 big firm và có hàng ngàn developer làm việc trên cùng 1 mã nguồn nên Go được sinh ra đơn giản, dễ đọc dễ hiểu và hạn chế các side effect( thay đổi bên ngoài hàm) để các developer làm việc chung với nhau một cách nhanh và hiệu quả nhất.

Tốc độ nhị phân của Golang đương nhiễn sẽ có thể chậm hơn C++. Tuy nhiên hiệu suất làm việc giữa chúng lại không có sự chênh lệch nhiều. Và Golang cũng nhanh hơn các ngôn ngữ phổ biến khác như Java, Python, Ruby... Vì thế đây có thể xem là một điểm cộng cho Golang.

Go không có hàm khởi tạo (constructors).

Go không có chú thích (annotations) như Java.

Go không có *try catch* nhưng có Error handling, là một cơ chế xử lý lỗi đơn giản khác với try catch trên các ngôn ngữ khác dựa vào giá trị lỗi trả về của hàm.

**Nhược điểm của Go**

Có điểm mạnh tất nhiên cũng sẽ có điểm yếu. Đó là việc Go không có OOP(lập trình hướng đối tượng). Điều này sẽ khiến cho những bạn developer từ các ngôn ngữ lập trình hướng đối tượng như Java, C++ sẽ gặp chi ít khó khăn.

Không hỗ trợ thao tác trên con trỏ (vì lý do bảo mật).

Không hỗ trợ Generic. Điều này làm giảm khả năng reusable code và giảm hiểu quả trong quá trình phát triển. Vì là static-type nên khi hỗ trợ Generic có thể làm giảm tốc độ thực thi, làm mất đi tính chất đáng có của Go. Nhưng sau version 1.18 thì Go đã thông báo sẽ chính thức hỗ trợ Generic.

**Phía sau lưng Go**

Vâng, nếu ta lùi bước về sau thì sẽ thấy sau lưng chú chuột chũi này là Google. Một ông lớn có cơ sở hạ tầng về cloud server lớn nhất thế giới và nó đòi hỏi khả năng mở rộng cũng như tính hiểu quả cao. Do đó Golang được thiết kế để giải quyết các vấn đề đó.

Song đó các công ty lớn về nhiều lĩnh vực cũng đã và đang sử dụng Go để phát triển như BBC, IBM, Intel, Twitch, Dropbox, SoundCloud.
https://d3hi6wehcrq5by.cloudfront.net/itnavi-blog/2020/11/Golang-l%C3%A0-g%C3%AC-2.jpg
  **Tóm lại**
  
  Go có sự khác biệt với các ngôn ngữ lập trình hướng đối tượng. Nhưng nó mang đến hiệu suất(performance) tốt như C/C++ và có trải nghiệm tốt khi viết code nhờ cú pháp tinh gọn như Python.
  
  Để cải thiện hiệu suất của ứng dụng đừng ép phần cứng (hardware) phải làm việc cực lực mà hãy chia sẻ một phần gánh nặng đó cho các đoạn code, khi đó người dùng sẽ có trải nghiệm tốt hơn nhưng chi phí bỏ ra lại rẻ hơn.
  
  Cuối cùng các bạn có thể tham khảo nhiều hơn về Go, cũng như cú pháp về Go có thể tìm kiếm dễ dàng trên google. Ngoài ra Google cũng có 1 tour du lịch mà các bạn newbie có thể trải nghiệm tại đây: https://go.dev/tour/welcome/1
  
  Bài viết tham khảo:
  
  Giới thiệu và cú pháp của Golang: https://viblo.asia/p/gioi-thieu-ngon-ngu-lap-trinh-golang-1VgZv9VrKAw
  
  Tại sao nên học Golang: https://topdev.vn/blog/golang-la-gi-va-tai-sao-ban-nen-hoc-go/
  
  Tìm hiểu về Golang: https://medium.com/@tinhuynh1/t%C3%ACm-hi%E1%BB%83u-v%E1%BB%81-golang-v%C3%A0-c%C3%A1ch-c%C3%A0i-%C4%91%E1%BA%B7t-a31f6ab7f4de