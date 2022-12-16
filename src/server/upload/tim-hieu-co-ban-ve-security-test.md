### Security Testing là gì?
Security testing được định nghĩa là 1 dạng kiểm thử phần mềm (Software Testing) nhằm đảm bảo hệ thống phần mềm và các ứng dụng được bảo vệ an toàn khỏi các lỗ hổng, mối đe dọa hay bất cứ nguy hiểm nào có thể dẫn tới tổn thất lớn. 
Tiến hành kiểm thử bảo mật của bất kỳ hệ thống nào là tìm ra tất cả các sơ hở và điểm yếu có thể có của hệ thống đó mà có nguy cơ dẫn đến việc mất thông tin, doanh thu bị công khai hay hủy hoại danh tiếng của công ty do nhân viên hoặc người ngoài của Tổ chức. 
Mục tiêu của kiểm thử bảo mật là xác định các mối đe dọa trong hệ thống và đo lường các lỗ hổng tiềm ẩn của nó, để hệ thống không bị ngừng hoạt động hoặc bị khai thác ngoài ý muốn. Nó cũng giúp phát hiện tất cả các rủi ro bảo mật có thể có trong hệ thống và giúp các developer khắc phục các sự cố này bằng cách sửa code. 

### Các dạng thức của Security Testing
Có bảy loại thử nghiệm bảo mật chính theo phương pháp kiểm thử bảo mật mã nguồn mở: 
![](https://images.viblo.asia/0ac01243-ddf4-4afb-b4b8-d19902c14143.png)
1. *Vulnerability Scanning / Quét lỗ hổng*: phương pháp này được thực hiện bằng phần mềm tự động quét hệ thống chống lại các lỗ hổng đã biết 
2. *Security Scanning / Quét bảo mật*: xác định những điểm yếu của hệ thống mạng và hệ thống nói chung, sau đó cung cấp các giải pháp để giảm thiểu những rủi ro. Phương pháp quét này có thể được thực hiện bằng cả quét bằng tay (manual scanning) và quét tự động (automated scanning)
3. *Penetration testing / Kiểm thử thâm nhập*: Loại kiểm thử này mô phỏng một cuộc tấn công từ một tin tặc độc hại. Kiểm thử này bao gồm phân tích một hệ thống cụ thể để kiểm tra các lỗ hổng tiềm ẩn đối với nỗ lực tấn công, xâm nhập hệ thống từ bên ngoài.
4. *Risk Assessment / Đánh giá rủi ro*: Kiểm thử này bao gồm phân tích các rủi ro bảo mật theo dõi được trong tổ chức. Mức độ rủi ro được phân loại là Thấp, Trung bình và Cao. Phương pháp kiểm thử này đề xuất các kiểm soát và các biện pháp để giảm thiểu rủi ro.
5. *Security Auditing / Kiểm toán bảo mật*: Đây là một dạng kiểm tra nội bộ ứng dụng và hệ điều hành để tìm ra các lỗi bảo mật. Việc kiểm toán cũng có thể được thực hiện thông qua kiểm tra từng dòng code (inspection of code)
6. *Ethical hacking*: là hack một hệ thống phần mềm tổ chức. Không giống như các tin tặc độc hại những kẻ hack hệ thống với mục đích đánh cắp, Ethical hacking là phương pháp hack hệ thống với mục đích là để các lỗ hổng bảo mật trong hệ thống lộ ra và có phương án khắc phục. 
7. *Posture Assessment / Đánh giá tổng thế*: là phương pháp kết hợp Security scanning, Ethical Hacking và Risk Assessments để đưa ra một cái nhìn tổng quát, toàn diện về bức tranh hiện trạng bảo mật của một tổ chức, một hệ thống. 

### Security testing được thực hiện trong vòng đời phát triển phần mềm (SDLC) như thế nào ? 
Có 1 sự thật là chi phí sẽ luôn cao hơn nếu tiến hành kiểm thử bảo mật sau giai đoạn triển khai phần mềm (software implementation phase) hoặc sau giai đoạn phát triển (deployment). Vì vậy, cần phải tích hợp kiểm thử bảo mật trong vòng đời SDLC trong các giai đoạn trước đó.
Dưới đây là các quy trình bảo mật tương ứng được áp dụng trong các giai đoạn trong SDLC.
![](https://images.viblo.asia/33d4fcf2-94ca-46d2-b7f1-a99bd3c5092a.png)

| Các giai đoạn trong SDLC  | Quy trình bảo mật | 
| -------- | -------- |
| Requirements     | Phân tích bảo mật cho các yêu cầu và kiểm tra tình trạng lạm dụng / trường hợp sử dụng sai     |
| Design     | Phân tích rủi ro bảo mật trong giai đoạn thiết kế. Phát triển test plan có bao gồm Security test trong đó     | 
| Coding and Unit Testing     | Static and Dynamic Testing và Security White Box Testing     | 
| Integration Testing     | Black Box Testing     | 
| System Testing     | Black Box Testing và Vulnerability scanning     | 
| Implementation     | Penetration Testing, Vulnerability Scanning     | 
| Support     | Phân tích ảnh hưởng của bản vá lỗi    |

Kịch bản test (test plan) nên bao gồm: 
* Các case test Security hoặc các scenarios
* Dữ liệu test liên quan đến security testing
* Các tools test được yêu cầu để thực hiện security testing
* Phân tích kết quả kiểm thử dựa trên các tools bảo mật khác nhau

1 vài trường hợp ví dụ về security test như là: 
- Password phải được mã hóa khi input 
- Các role khác nhau thì được quyền truy cập vào các mục khác nhau và truy cập không thành công vào mục không có permission 
- Tùy từng TH khác nhau mà Back button bị vô hiệu hóa

### Methodologies/ Approach / Techniques for Security Testing: 
Trong kiểm thử bảo mật, mỗi phương pháp khác nhau đều tuân theo các loại sau:
* Tiger box: việc hacking thường được thực hiện trên laptop có đầy đủ các OS và các công cụ hack. Việc test này giúp tester có thể tiến hành đánh giá và tấn công các lỗ hổng.
* Blackbox: tester được quyền kiểm tra mọi thứ về cấu trúc liên kết mạng và các công nghệ đi kèm.
* Grey box: một phần thông tin về hệ thống được cung cấp cho tester, đây là sự kết hợp giữa white box và blackbox models

Security Testing Roles
* Hackers - truy cập trái phép vào hệ thống máy tính hoặc mạng
* Crackers - đột nhập vào hệ thống để đánh cắp hoặc phá hủy dữ liệu
* Ethical Hacker - tiến hành hầu hết các hoạt động phá hoại nhưng với sự cho phép của chủ sỡ hữu
* Script Kiddies or packet monkeys - Các hacker có kỹ năng về lập trình nhưng thiếu kinh nghiệm

Security Testing Tool

1) Owasp: Dự án bảo mật ứng dụng Web (OWASP) là một tổ chức phi lợi nhuận thế giới tập trung vào việc cải thiện tính bảo mật của phần mềm. Dự án có nhiều công cụ để kiểm tra các môi trường và các giao thức phần mềm khác nhau. Các công cụ hàng đầu của dự án bao gồm:
- Zed Attack Proxy (ZAP – một công cụ kiểm tra thâm nhập tích hợp)
- OWASP Dependency Check (quét các dependencies của dự án và kiểm tra phát hiện lỗ hổng)
- OWASP Web Testing Environment Project (tập hợp các công cụ và tài liệu bảo mật)

2) Wireshark: là một công cụ phân tích mạng (trước đây được gọi là Ethereal). Nó quản lý các gói tin theo thời gian thực và hiển thị chúng ở định dạng có thể đọc được. Về cơ bản nó là một bộ phân tích gói mạng - cung cấp các thông tin chi tiết dù là nhỏ nhất về các giao thức mạng, giải mã, thông tin gói, v.v
Wireshark là một mã nguồn mở và có thể sử dụng được trên Linux, Windows, OS X, Solaris, NetBSD, FreeBSD và nhiều hệ thống khác. Thông tin được nhận thông qua công cụ này có thể được xem qua GUI hoặc TShark Utility ở chế độ TTY

3) W3af: là một framework có chức năng kiểm nghiệm và tấn công ứng dụng web, bao gồm 3 loại plugin: điều tra (discovery), kiểm nghiệm (audit) và tấn công(attack). 
3 loại plugin này phối hợp với nhau để tìm ra bất cứ lỗ hổng nào của site, vd: discovery plugin sẽ tìm kiếm các url khác nhau để kiểm tra các lỗ hổng và chuyển tiếp nó đến audit plugin và sau đó audit plugin sẽ tiếp tục dùng các url này để tiếp tục tìm các lỗ hổng khác.

### Myths and Facts of Security testing: 

|  Myths | Facts|
| -------- | -------- |
| Chúng ta không cần chính sách bảo mật bởi chúng ta có business quy mô nhỏ     | Bất cứ cá nhân hay công ty nào cũng cần có bảo mật |
| Tiêu tốn chi phí vào security test sẽ chẳng mang lại bất cứ lợi ích gì    | Security test có thể chỉ ra các vùng cần được cải thiện, từ đó cải thiện chúng hiệu quả hơn, giảm thiểu nguy cơ sập hệ thống (reduce downtime) |
| Cách duy nhất để bảo mật là gỡ bỏ nó đi     | Cách duy nhất và tốt nhất để bảo mật cho một tổ chức là tìm ra cách "Bảo mật hoàn hảo". Cách thức bảo mật hoàn hảo là phương pháp vừa bảo mật được hệ thống và vừa phù hợp với business và chính sách công ty |
| Mạng Internet là không an toàn. Tôi sẽ đầu tư các phần mềm và phần cứng để bảo vệ hệ thống và business.| Việc đầu tư kinh phí vào phần mềm và phần cứng cũng sẽ trở thành những vấn nạn to lớn nếu ta không thực sự hiểu về security và cách thức áp dụng nó vào từng doanh nghiệp |

### Kết luận
Security test là kiểm thử quan trọng nhất đối với một ứng dụng và kiểm tra xem dữ liệu tuyệt mật có thực sự được giữ bí mật hay không. Trong loại kiểm thử này, tester sẽ đóng vai trò của hacker và khai thác các lỗ hổng có thể có xung quanh hệ thống để tìm các lỗi liên quan đến bảo mật. Security test đóng vai trò rất quan trọng trong công nghệ kỹ thuật phần mềm để bảo vệ dữ liệu bằng mọi cách.

References: https://www.guru99.com/what-is-security-testing.html?fbclid=IwAR1y1QmC6JKJp5Eijo22DerVxPdy7XIUErYTI-nc_BQ6Umo8fltqHX-f7_s