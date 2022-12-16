### Lý do Automation Testing ra đời

![](https://images.viblo.asia/d3660fd1-a9e8-4fdc-971d-a3ea760c824a.jpg)

Bạn được phân công kiểm thử một ứng dụng. Ứng dụng đó chứa 100 biểu mẫu và hàng ngàn báo cáo. Một biểu mẫu chứa khoảng 50 trường khác nhau. Bạn cố gắng nhập dữ liệu cho biểu mẫu này mất khoảng 10 phút. Sau đó, bạn gửi thông tin.  Bạn phát hiện một số lỗi khi nhập và gửi dữ liệu.

Đến ngày hôm sau, Dev đã sửa lỗi mà bạn phát hiện và yêu cầu bạn kiểm tra lại lỗi.  Bạn kiểm tra bằng các bước đã làm tương tự như ngày hôm qua và bạn thấy rằng lỗi đã được sửa.
Đến ngày thứ ba, bạn lại được yêu cầu kiểm tra ứng dụng. Bây giờ bạn lại phải kiểm tra biểu mẫu đó để đảm bảo rằng không có vấn đề nào bị phát sinh. Bạn lại thực hiện các thao tác nhập liệu trong 10 phút.
 
Hãy tưởng tượng trong vòng 1 tháng, bạn phải thực hiện kiểm thử ứng dụng bằng thao tác thủ công, nhập dữ liệu vào 50 trường và làm đi làm lại công việc này nhiều lần.
Bạn sẽ cảm thấy nhàm chán và mệt mỏi, bạn không còn muốn nhập 50 trường dữ liệu để kiểm tra nữa. Lỗi không được phát hiện, bạn để lọt lỗi đến khách hàng.

Chúng ta không thể làm một công việc giống nhau với cùng năng lượng, tốc độ và độ chính xác mỗi ngày. Automation Testing ra đời để giải quyết vấn đề này, giúp thực hiện một công việc được lặp đi lặp lại với cùng tốc độ và độ chính xác.
Thay vì manual testing, ta để máy thực hiện việc testing mà tester phải làm.

### Automation Testing (Kiểm thử tự động hóa) là gì?

Automation Testing là một kỹ thuật kiểm thử phần mềm để kiểm tra và so sánh kết quả thực tế với kết quả mong đợi. 
Automation Testing được thực hiện bằng cách viết các kịch bản thử nghiệm và sử dụng công cụ. Kỹ thuật kiểm thử này được sử dụng để kiểm tra các nhiệm vụ lặp đi lặp lại và các nhiệm vụ thử nghiệm khác khó thực hiện thủ công.

### Xây dựng kịch bản Automation Testing tốt nhất.
 
Trước khi xây dựng kịch bản Automation Testing, chúng ta cần xác định rõ chúng ta muốn đạt được gì?
Một kịch bản Automation Testing không chính xác có thể làm phá hỏng toàn bộ công việc và người kiểm thử cũng sẽ mất nhiều thời gian để sửa lỗi kịch bản, gây ảnh hưởng đến kế hoạch kiểm thử.
Sau đó cần xây dựng chiến lược Automation Testing phù hợp với sản phẩm.
Hãy nhóm các test case có cùng đặc điểm thành một nhóm. Hình ảnh dưới đây mô tả cách các test case được chia thành các nhóm nhỏ.

![](https://images.viblo.asia/22549784-1571-4ec5-a7b0-e3e152a47b8a.jpg)

### Ví dụ đơn giản về tự động hóa thử nghiệm

Khi kiểm tra một phần mềm trên máy tính, chúng ta sử dụng chuột và bàn phím để thực hiện các bước của mình. Công cụ dùng để thực hiện Automation Testing sẽ giả lập các thao tác bằng bàn phím và chuột tương tự như tester thao tác bằng cách sử dụng một kịch bản hoặc ngôn ngữ lập trình

Ví dụ: Bạn cần kiểm tra chức năng tính toán bằng một phép cộng hai số nguyên. Kịch bản sẽ thực hiện các thao tác tương tự khi sử dụng chuột và bàn phím.
Các bước kiểm tra thủ công là:
1. Mở máy tính
2. Nhấn 1
3. Nhấn +
4. Nhấn 2
5. Nhấn =
Kết quả hiển thị là 3
6. Tắt máy tính

Khi chuyển sang chạy bằng kịch bản script thì sẽ như sau:
![](https://images.viblo.asia/956ea745-6f93-438c-acfe-117ae217d901.png)

Câu lệnh Assert.AreEqual("5", txtResult.DisplayText,”Calculator is not showing 5); nghĩa là gì?

Mong muốn kết quả của phép tính trên là 3 sẽ hiển thị trên màn hình nhưng trên thực tế có thể sẽ có kết quả khác được hiển thị.
Với tất cả các test case, chúng ta luôn so sánh kết quả mong đợi và kết quả thực tế của phép tính.

Trường hợp kết quả hiển thị không phải là 3 thì tức là trường hợp kiểm tra này không thành công.
Trong đoạn script trên,  3 là kết quả mong đợi, txtResult. DisplayText là kết quả thực tế . Nếu chúng không bằng nhau thì thông báo  rằng "Calculator is not showing 5" sẽ được hiển thị.

### Các loại Automation Testing

![](https://images.viblo.asia/b356b23e-1dfb-408b-997e-74ec89532739.png)

Automation Testing được chia thành các loại khác nhau dựa trên các tiêu chí như loại kiểm thử, giai đoạn kiểm thử, phương pháp kiểm thử.
Chúng ta cùng tìm hiểu kỹ hơn về 3 loại Automation Testing phổ biến

**Automated Unit Tests**

Automation Testing được viết để kiểm tra code. Lỗi được xác định trong các chức năng, phương thức và thói quen code bởi các nhà phát triển.

Một số công cụ phổ biến nhất hiện có là NUnit và JUnit. Microsoft cũng cung cấp công cụriêng để thử nghiệm đơn vị gọi là MSTest. 

**Automated Web Service / API Tests**

Giao diện lập trình ứng dụng (API) giúp phần mềm có thể nói chuyện với các ứng dụng phần mềm khác. Cũng giống như bất kỳ phần mềm nào khác, API cần phải được kiểm tra. 

Những gì chúng ta kiểm tra ở đây thường là các vấn đề về chức năng, tuân thủ về bảo mật. Trong các ứng dụng web, chúng ta có thể kiểm tra yêu cầu và phản hồi của ứng dụng xem chúng có an toàn và được mã hóa hay không.

**Automated GUI Tests**

Loại thử nghiệm Automation này là hình thức tự động hóa khó khăn nhất vì nó liên quan đến giao diện người dùng của ứng dụng.

GUI rất có thể thay đổi. Nhưng loại thử nghiệm này cũng gần nhất với những gì người dùng sẽ làm với ứng dụng. Vì người dùng sẽ sử dụng chuột và bàn phím, các kiểm tra GUI tự động cũng bắt chước hành vi tương tự bằng cách sử dụng chuột và bàn phím để nhấp hoặc ghi vào các đối tượng có trên giao diện người dùng. Do đó, chúng ta có thể tìm thấy các lỗi sớm và nó có thể được sử dụng trong nhiều tình huống như kiểm tra hồi quy hoặc điền vào các biểu mẫu mất quá nhiều thời gian.

Các công cụ kiểm tra GUI phổ biến nhất là Micro Focus Unified Functional tests (UFT), Selenium, Test Complete và Microsoft Coded UI (là một phần của phiên bản cao cấp và cao cấp của Visual Studio).

### Công cụ thực hiện Automation Testing

Một số công cụ về Automation Testing phổ biến như:

- Selenium: Công cụ thử nghiệm Ứng dụng web. Cung cấp nhiều hỗ trợ trình duyệt.
- Junit và Nunit: Công cụ chủ yếu được sử dụng để kiểm tra Unit tests.
- QTP: Công cụ cho các ứng dụng không phải web
- Sikuli: Công cụ mã nguồn mở để kiểm tra GUI.
- Soap UI: Công cụ kiểm tra API.
- Rest Assured: Công cụ kiểm tra API.
- Appium: Công cụ hỗ trợ kiểm tra ứng dụng di động.
- Jmeter: Công cụ được sử dụng để kiểm tra hiệu suất.
- Test NG: Test NG không phải là một công cụ tự động hóa, tuy nhiên, nó cung cấp hỗ trợ tuyệt vời cho các tự động hóa được xây dựng bằng selen, appium, yên tâm, v.v.

### Phần kết luận

Ban đầu, chi phí thực hiện Automation Testing cao hơn những phương pháp khác. Nó bao gồm chi phí của công cụ, chi phí về con người và chi phí đào tạo.

Nhưng khi các kịch bản script đã chính xác, chúng có thể được thực hiện liên tục hàng trăm lần với cùng độ chính xác và khá nhanh chóng. Điều này sẽ tiết kiệm nhiều giờ thử nghiệm bằng phương pháp thủ công. 
Vì vậy, chi phí giảm dần và cuối cùng nó trở thành một phương pháp hiệu quả để kiểm thử hồi quy.

Nguồn tham khảo: https://www.softwaretestinghelp.com/automation-testing-tutorial-1/?fbclid=IwAR38qdVJacmg4T9YIueBVnhDNV3VWp0Hb6pIF5ZkNseSaYe67toK2K4WWSU