![](https://images.viblo.asia/ce07a555-9927-4e14-a975-c73d1337e52b.png)

# Đặt vấn đề
Trong thời buổi công nghệ số phát triển ngày một mạnh mẽ như hiện nay, mọi công việc của con người đều hướng tới tự động hóa sử dụng nền tảng Internet. Nó đem đến cho người sử dụng rất nhiều tiện ích, nhưng đi kèm là những rủi ro vô cùng lớn, trong đó phải kể đến rủi ro về bảo mật. 
Đã có rất nhiều trường hợp rò rỉ thông tin của người sử dụng, kể cả những hệ thống lớn tưởng chừng như đã được bảo mật kĩ càng, dẫn đến hậu quả vô cùng to lớn. Do vậy, việc đảm bảo tính bảo mật của ứng dụng đang ngày càng trở nên quan trọng và Security Testing cũng là một trong những phần không thể thiếu trong kiểm thử phần mềm.
# Security Testing là gì?
Vậy Security Testing là gì? 
Security Testing - kiểm thử bảo mật là hoạt động nhằm tìm ra các lỗ hổng của hệ thống và xác định rằng dữ liệu và tài nguyên của hệ thống được bảo vệ khỏi những rủi ro về bảo mật có thể xảy ra. Kiểm thử bảo mật giúp xác định các mối đe dọa tiềm ẩn của hệ thống, phát hiện các nguy cơ bảo mật có thể có để đội phát triển phần mềm cải thiện và khắc phục.
## Các nguyên tắc cơ bản của kiểm thử bảo mật
Có 7 nguyên tắc cơ bản trong kiểm thử bảo mật như sau:

**Authentication**: Tính chứng thực

**Authorization**: Tính định danh

**Confidentiality**: Tính bảo mật

**Availability**: Tính khả dụng

**Integrity**: Tính toàn vẹn

**Non-repudiation**: Tính không bác bỏ

**Resilience**: Khả năng phục hồi
## Quy trình kiểm thử bảo mật
**1. Vulnerable Scanning** - Rà soát các lỗ hổng tiềm ẩn: thực hiện thông qua các phần mềm để tự động scan một hệ thống nhằm phát hiện ra các lỗ hổng dựa trên các signatures đã biết.

**2. Security Scanning** - Rà soát các điểm yếu của hệ thống : bao gồm việc xác định các điểm yếu của mạng và hệ thống, sau đó cung cấp các giải pháp nhằm giảm thiểu các rủi ro này. Có thể thực hiện bằng thủ công hoặc tự động.

**3. Penetration testing** - Kiểm thử thâm nhập: Đây là loại kiểm thử mô phỏng cuộc tấn công từ phía một hacker thiếu thiện ý. Kiểm thử bao gồm việc phân tích một hệ thống cụ thể, tìm ra các lỗ hổng tiềm ẩn bằng cách tấn công từ bên ngoài.

**4. Risk Assessment** - Đánh giá rủi ro: Kiểm thử này liên quan đến phân tích các rủi ro bảo mật nhận thấy được. Các rủi ro được phân loại là Low, Medium, High. Loại kiểm thử này đưa ra các khuyến nghị nhằm giảm thiểu các rủi ro.

**5. Security Auditing** - Kiểm toán an ninh : Kiểm tra bảo mật nội bộ ứng dụng và OS.

**6. Ethical hacking** - Tấn công vào hệ thống tìm các điểm yếu bảo mật: Các hacker thiện ý thực hiện phương pháp tương tự như những kẻ tấn công “thiếu thiện ý”, với mục tiêu tìm kiếm các điểm yếu bảo mật và xác định cách thức để thâm nhập vào mục tiêu, nhằm đánh giá mức độ thiệt hại do các lổ hỗng này gây ra, từ đó đưa ra cảnh báo cùng những phương án gia cố, kiện toàn bảo mật thích hợp.

**7. Posture assessment**: Kết hợp Security Scanning, Ethical hacking và Risk Assessment đánh giá bảo mật tổng thể một tổ chức.
# Kiểm thử bảo mật trong vòng đời phát triển phần mềm (SDLC)
![](https://images.viblo.asia/4d0c44ca-1e5b-4d58-bc45-3eaa988f1a1f.png)


| Giai đoạn  | Quy trình bảo mật | 
| -------- | -------- | -------- |
| Requirement  |  Phân tích bảo mật cho các yêu cầu và kiểm tra tình trạng lạm dụng / trường hợp sử dụng sai   |
|Plan    | Phân tích rủi ro bảo mật trong giai đoạn thiết kế. Phát triển test plan có bao gồm Security test trong đó  | 
|Coding & Unit Testing  |    Static and Dynamic Testing & Security White Box Testing |
| Integration Testing | Blackbox Testing |
| System Testing | Black Box Testing & Vulnerability scanning |
| Implementation | Penetration Testing, Vulnerability Scanning |
| Maintainance  | Phân tích tác động của các bản vá lỗi   |     
# Một số kĩ thuật kiểm thử bảo mật

![](https://images.viblo.asia/3f72e393-2310-4e63-bf15-3a2545d71a0f.jpg)

### Penetration testing (Kiểm thử thâm nhập)
Được thực hiện bằng cách tấn công vào hệ thống nhằm tìm ra các lỗ hổng có thể khai thác. Có 2 loại:

**White box Testing**:  Người kiểm thử thực hiện test dựa trên thông tin nội bộ được khách hàng cung cấp như Địa chỉ IP, Code & Sơ đồ cấu trúc của hệ thống

**Black box Testing**: Tester không có bất kì thông tin nào về hệ thống đang thử nghiệm. Cách này có thể đạt được độ chính xác cao hơn do chúng ta đang mô phỏng lại thử nghiệm giống như tin tặc không có thông tin về hệ thống
### Password cracking (Bẻ khóa mật khẩu)
Các chương trình bẻ khóa mật khẩu có thể được sử dụng để xác định các mật khẩu yếu. Với mật khẩu dễ đoán (như kiểu 123456, ngày sinh…) thì đều là mồi ngon cho hacker. Do đó tester cần kiểm thử bảo mật các module liên quan mật khẩu như đăng ký, đổi pass, quên pass… Qua đó đảm bảo hệ thống chỉ cho phép đặt mật khẩu phức tạp (bao gồm chữ, số, ký tự đặc biệt, độ dài tối thiểu…). 

Ngoài ra một số hệ thống lưu trữ user/pass trong cookies thì việc của tester là kiểm tra xem các cookies này đã được mã hóa hay chưa?
### Security Scanning & Vulnerability Scanning
Dùng một số công cụ để quét lỗ hổng bảo mật trên ứng dụng web, OS hay mạng lưới

Một số công cụ quét lỗ hổng phổ biến: Owasp, Wireshark, Nessus,...
### SQL Injection
Tester thực hiện kiểm tra SQL Injection trên tất cả các tính năng nhập thông tin từ textbox. Đảm bảo sử dụng các dấu đặc thù sẽ bị từ chối như nháy đơn, chấm phẩy, ngoặc đơn, ngoặc kép. Kiểm tra trong database đảm bảo việc lưu trữ các dữ liệu này đều đã được xử lý sơ bộ.
### Cross Site Scripting (XSS):
Tester cần thực hiện kiểm tra việc lọc đầu vào có được áp dụng với tất cả các loại dữ liệu nhập vào chưa (Textbox, URL…). Đảm bảo loại bỏ toàn bộ các nội dung không hợp lệ, như các thẻ HTML hoặc thẻ SCRIPT. Đồng thời kiểm tra cả các ký tự đặc biệt : dấu nháy đơn, dấu lớn hơn (>), dấu nhỏ hơn (<)
### URL manipulation through HTTP GET methods
Sau khi xác định được các modude sử dụng giao thức HTTP GET, Tester thực hiện kiểm tra các chức năng có tính năng submit xem có gửi thông tin quan trọng trong đường dẫn URL không.
### Risk Assessment
Kỹ thuật này đánh giá rủi ro và lỗ hổng tiềm ẩn hầu như dựa trên kinh nghiệm của các chuyên gia bảo mật là chính
# Một số lưu ý khi thực hiện kiểm thử phần mềm để đảm bảo tính bảo mật hệ thống
Việc thực hiện Security Testing đòi hỏi người kiểm thử cần có những kiến thức chuyên môn và hiểu biết sâu rộng về lĩnh vực kiểm thử phần mềm cũng như an toàn thông tin. Thông thường, khi thực hiện manual testing chúng ta không thể phát hiện được các lỗ hổng bảo mật của hệ thống. Tuy nhiên, có một vài lưu ý trong khi thực hiện việc kiểm thử hệ thống mà các QA dù không có kiến thức sâu về an toàn thông tin vẫn có thể thực hiện nhằm tránh các vấn đề về bảo mật như :

1. Không sử dụng các phần mềm hay các công cụ hỗ trợ online khi thực hiện các thao tác với hệ thống hay các tài liệu liên quan để đảm bảo thông tin về dự án không được rò rỉ ra ngoài
2.  Nếu sử dụng các công cụ hay phần mềm offline (khi quay phim hay chụp ảnh màn hình ), cần đảm bảo chúng được tải về từ các nguồn đáng tin cậy
     Một số công cụ hay được sử dụng như Licecap, Snagit, Peek,...
3. Đối với các hệ thống có nhiều role như : admin, user, guest,... cần chú ý check case phân quyền : đảm bảo với các tài khoản guest thông thường không được truy cập hay có các chức năng đặc biệt như của user và admin, tài khoản user cũng không thể có các màn hình hay các phân quyền của admin,...
4. Các test data cần phải kiểm soát được : không sử dụng các test data không thể kiểm soát được, đặc biệt các dữ liệu quan trọng như số điện thoại, email, tài khoản ngân hàng,vv... Chỉ sử dụng những data test được cấp hoặc được tạo ra và có thể kiểm soát được
5. Chú ý thực hiện các test case SQL Injection, XSS Injection, chèn html đối với các trường text. Thông thường, các lỗi này khá hiếm khi xảy ra nhưng tác hại của nó đối với việc bảo mật hệ thống là vô cùng to lớn.
6.  Đối với các hệ thống chứa đựng những dữ liệu nhạy cảm (như tài chính, ngân hàng, bảo hiểm,...) có thể đề xuất một vài tính năng như bảo mật 2 lớp, yêu cầu xác thực token, OTP, đòi hỏi mật khẩu có độ phức tạp cao,vv...