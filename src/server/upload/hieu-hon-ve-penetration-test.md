Chắc các bạn đều đã từng nghe hoặc biết tới nhưng kỹ sư bảo mật làm việc cho những công ty về công nghệ thông tin. Họ thường được biết đến như những hacker mũ trắng (white hat). Vậy các bạn đã từng nghe hoặc biết về công việc họ làm thường ngày là gì chưa? Bài viết này mình sẽ cho các bạn hiểu rõ hơn về một trong những công việc mà họ thường làm, hiểu hơn về cách thức làm việc của họ và hơn nữa là rõ hơn về những giá trị mà công việc của họ đem lại cho công ty. Bài viết nhằm giải thích cũng như mô tả rõ hơn về công việc **penetration testing** (kiểm thử xâm nhập).
![](https://images.viblo.asia/77af77ae-213e-4d73-b9fb-ce130b491858.jpg)

# Khái niệm Penetration testing
## Penetration testing là gì?
Có rất nhiều định nghĩa khác nhau về khái niệm này, ở đây mình dẫn chứng theo [wiki](https://en.wikipedia.org/wiki/Penetration_test) như sau:
> A penetration test, colloquially known as a pen test, pentest or ethical hacking, is an authorized simulated cyberattack on a computer system, performed to evaluate the security of the system. The test is performed to identify both weaknesses (also referred to as vulnerabilities), including the potential for unauthorized parties to gain access to the system's features and data, as well as strengths, enabling a full risk assessment to be completed.> 

Penetration testing hay pentest (kiểm thử xâm nhập) có thể hiểu đơn giản là công việc kiểm tra, đánh giá khả năng bảo vệ cơ sở hạ tầng của tổ chức như mạng, ứng dụng, hệ thống và người dùng khỏi các mối đe dọa bên ngoài cũng như bên trong độ hay chính là độ an toàn của hệ thống công nghệ thông tin (CNTT) bằng cách mô phỏng các cuộc tấn công vào hệ thống (các cuộc tấn công được thực hiện như những kẻ tấn công thực sự) dưới sự cho phép của chủ quản hệ thống. Quá trình thử nghiệm được thực hiện để xác định tất cả điểm yếu (còn được gọi là lỗ hổng) đang tồn tại trong hệ thống từ đó đưa ra các biện pháp nhằm bảo vệ an toàn cho hệ thống. Ở đây có một số khái niệm mọi người cần nắm được để hiểu rõ hơn về công việc kiểm thử xâm nhập này.  Kết quả kiểm thử được ghi lại và cung cấp trong một báo cáo toàn diện cho quản lý điều hành của và chuyên viên kỹ thuật của hệ thống

**Vulnerabilities**: Vulnerabilities là lỗ hổng bảo mật trong một phần của phần mềm, phần cứng hoặc hệ điều hành, cung cấp một khả năng để tấn công  hệ thống. Một lỗ hổng có thể đơn giản như mật khẩu yếu hoặc phức tạp như lỗi tràn bộ đệm hoặc các lỗ hổng SQL injection.

**Exploits**: Là quá trình khác thác lỗ hổng bảo mật thông qua việc dựa vào các điểm yếu, sự cố hay lỗ hổng của phần mềm nhằm mục tiêu gây ra các hoạt động bất thường của ứng dụng theo ý của kẻ tấn công. Những hành động đó có thể bao gồm các hành động leo thang đặc quyền, một cuộc tấn công từ chối dịch vụ, đánh cắp các thông tin nhạy cảm …

**Payloads**: Là các đoạn mã hay một phần của phần mềm được sử dụng trong quá trình khai thác lỗ hổng (exploit)
## Lợi ích của pentest
Chính cách làm của pentest là thực hiện mô phỏng các cuộc tấn công như những hacker thực sự nên nó đem lại rất nhiều lợi ích. Sau đây là một số lợi ích của công việc pentest mang lại
* Chủ động xác định các mối đe dọa và xác định xác suất tấn công vào tài sản thông tin
* Kiêm tra toàn diện đảm bảo rằng hệ thống đang hoạt động trong một giới hạn chấp nhận được về rủi ro bảo mật thông tin
* Giúp xác định các các vectơ tấn công và xác định tác động kinh doanh có thể gây ra của một cuộc tấn công thành công. Từ đó có các bước chuẩn bị có thể được thực hiện để ngăn chặn việc khai thác lỗ hổng.
* Đảm bảo triển khai một cách hiệu quả các biện pháp phỏng thủ (tường lửa, bộ định tuyến và máy chủ web..)
* Đảm bảo tuân thủ các quy định, tiêu chuẩn trên thế giới. Ví dụ: (ISO / IEC 27001: 2013, PCI-DSS, HIPPA, FISMA, v.v.)
## Khi nào chúng ta cần thực hiện pentest:
* Khi có một vài thay đổi trong cơ sở hạ tầng thông tin của tổ chức
* Khi có các vấn đề bảo mật liên quan đến các thành phần hệ thống được công bố
* Khi có các phần mềm mới được cài đặt hay cập nhật
* Khi có thay đổi về mặt chính sách
## Điểm khác nhau giữa Penetration Testing và Ethical Hacking?
Mặc dù đây là hai khác niệm có liên quan chặt chẽ tới nhau, nhiều khi chúng còn được sử dụng thay thế cho nhau. Nhưng chúng với có những điểm khác biệt cơ bản sau:


| Penetration Testing | Ethical Hacking |
| -------- | -------- |
| Tiếp cận tập trung vào một mục tiêu cụ thể (web, mobile..)     | Tiếp cận một cách toàn diện     |
| Cần có kiến thức và kỹ năng tốt trong lĩnh vực cụ thể được yêu cầu tiến hành kiểm tra thâm nhập (web, mobile..). |Cần có kiến thức toàn diện về Công cụ, kỹ thuật và thủ tục (TTP) của kẻ tấn công để thỏa hiệp hệ thống thông tin          |
| Cần có kỹ năng viết báo cáo thật tốt     | Không yêu cầu  kỹ năng về viết báo cáo tốt   |
| Yêu cầu có các giấy tờ thỏa thuận bắt buộc, hợp đồng..     | Hầu như không yêu cầu về tài liệu     |

Qua đây có thể thấy, penetration testing là tập con của Ethical hacking

## Điểm khác nhau giữa penetration testing, vulnerability scanning và security audit

| Penetration testing | Vulnerability Assessment | Security Audit |
| -------- | -------- | -------- |
| Kiểm tra bảo mật bằng cách kiểm tra xem tổ chức có tuân theo một tập hợp các chính sách và quy trình bảo mật tiêu chuẩn không     | Đánh giá lỗ hổng tập trung vào việc tìm ra các lỗ hổng trong hệ thống thông tin nhưng không đưa ra cách thức lỗ hổng có thể bị khai thác hay mức độ thiệt hại có thể xảy ra do việc khai thác lỗ hổng thành công    |  Thực hiện khai thác và tấn công thử nghiệm (POC attack) nhằm chứng minh một vấn đề an ninh là tồn tại     |

Qua bảng so sánh có thể thấy. Kiểm thử xâm nhập không chỉ đơn giản là kiểm tra xem hệ thống có đáp ứng các yêu cầu theo một danh sách yêu cầu bảo mật đơn thuần. Vulnerability assessment chính là một bước trong pentest. Hay nói cách khác, pentest đi xa hơn vulnerability assessment hay security audit qua việc thực hiện chỉ ra cách thứ khai thác lỗ hổng và tác động của nó tới hệ thống
# Các phương pháp kiểm thử trong pentest
## Hộp đen (Black box)
- Kiểm thử từ bên ngoài vào (Black box Pentest): các cuộc tấn công sẽ được thực hiện mà không có bất kỳ thông tin nào, pentester sẽ đặt mình vào vị trí của những tin tặc mũ đen và cố gắng bằng mọi cách để thâm nhập vào được hệ thống của khách hàng.
- Pentester sẽ mô phỏng một cuộc tấn công thực sự vào hệ thống. Quá trình thử nghiệm bao gồm một loạt ứng các lỗ hổng bảo mật ở cấp dụng được xác định bởi OWASP và WASC, nhắm mục tiêu các lỗ hổng bảo mật nguy hiểm tiềm tàng trong ứng dụng của khách hàng . Quá trình thử nghiệm sẽ tiết lộ các lỗ hổng, thiệt hại khai thác tiềm năng và mức độ nghiêm trọng.
- **Phân loại:**
    - Blind Testing: Mô phỏng các phương pháp của một hacker không có hoặc cực kì ít thông tin được cung cấp cho nhóm kiểm tra thâm nhập, quá trình kiểm thử thường tốn thời gian và công sức thực hiện.
    - Double-Blind Testing: Rất ít người trong tổ chức biết về kiểm tra thâm nhập đang được tiến hành. Quá trình kiểm thử có liên quan đến kiểm tra bảo mật của tổ chức giám sát, xác định sự cố và các thủ tục ứng phó
## Hộp trắng (White box)
- Kiểm thử từ bên trong ra (White box Pentest): là các thông tin về mạng nội bộ và ngoại sẽ được cung cấp bởi khách hàng, các pentester có thể có quyền truy cập vào hệ thống thông tin từ đó sẽ đánh giá an ninh mạng dựa trên đó.
- **Phân loại:**
    - Announced Testing: Quá trình kiểm thử có sự hợp tác và tham gia cùng của đội quản trị hệ thống thông tin. 
    - Unannounced Testing: Thường chỉ những quản lý cấp cao được biết đến quá trình kiểm thử. Thực hiện kiểm tra việc xử lý, phản hồi các cuộc tấn công của nhân viên quản trị hệ thống thông tin.
## Hộp xám (Gray box)
- Kiểm thử hộp xám (Gray-box): Là phương pháp kết hợp cà white-box và black-box testing. Ở đây, pentester được cung cấp một phần thông tin của hệ thống, và giới hạn truy cập một phần vào hệ thống.

Việc lựa chọn phương pháp kiểm thử do tổ chức quyết định, dựa vào yêu cầu, mục đích, thời gian và khả năng tài chính của tổ chức đó. Trong khi kiểm tra bằng phương pháp blackbox đem lại đánh giá chính xác về khả năng tấn công của những hacker thực sự thì whitebox đem lại lợi thế về thời gian, quyền truy cập hệ thống cũng như những hiểu biết chính xác về hệ thống, từ đó tìm ra các điểm yêu tồn tại trên hệ thống. Lập kế hoạch kiểm tra cẩn thận và hiểu biết về các ràng buộc kiểm tra là cần thiết khi có giới hạn thời gian và nguồn lực để kiểm tra được tiến hành. Dựa vào lợi thế của các phương pháp, tổ chức cần đưa ra kế hoạch và lựa chọn phương pháp phù hợp
# Pentest được sử dụng vào đối tượng nào?
Pentest được sử dụng để kiểm thử an ninh rất nhiều đối tượng khác nhau, mỗi đối tượng mà pentest được sử dụng lại có nhiều cách thức và phạm vi thực hiện khác nhau. Dưới đây là một số đối tượng sử dụng pentest như một phương thức đánh giá đảm bảo an ninh
## Network Penetration Testing
* Giúp xác định các vấn đề bảo mật trong thiết kế, triển khai và vận hành mạng network
* Một số vấn đề an ninh thường gặp phải đối với mạng network:
    * Sử dụng cac giao thức kém bảo mật (telnet, http, ftp..)
    * Mở nhiều cổng và dịch vụ mà không sử dụng tới
    * Phần mềm và hệ điều hành không được cập nhật thường xuyên
    * Thiết lập sai các config trong các thiết bị mạng: firewall, IDS, server
## Web Application Penetration Testing
* Giúp tìm ra các điểm yếu bảo mật web tồn tại trong thiết kế, phát triển và triển khai ứng dụng web
* Các điểm yếu bảo mật trong web thông dụng: (Theo [OWASP TOP 10 2017](https://owasp.org/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_Top_10)):
    * Injection: Các lỗi về tiêm nhiễm mã độc hại
    * Broken Authentication: Phá vỡ cơ chế xác thực
    * Sensitive Data Exposure: Lộ lọt các thông tin nhạy cảm
    * ML External Entities (XXE): Lỗi liên quan đến xử lý XML
    * Broken Access Control: Phá vỡ cơ chế phân quyền truy cập
    * Security Misconfiguration: Cấu hình bảo mật không đúng
    * Cross-Site Scripting (XSS): Tấn công tiêm nhiễm mã javascript độc hại
    * Insecure Deserialization: Cơ chế deserialization thiếu an toàn
    * Using Components with Known Vulnerabilities: Sử dụng các thành phần chứa lỗ hổng
    * Insufficient Logging & Monitoring: Ghi nhật ký và giám sát không đầy đủ
## Social Engineering Penetration Testing
* Giúp xác định nhân viên xác thực, theo dõi, xác thực, xử lý, các quy trình và công nghệ không đúng cách
* Các vấn đề thường gặp phải:
    * Truy cập vào các đường link, email độc hại
    * Trở thành nạn nhân của tấn công lừa đảo (phishing) qua email, điện thoại
    * Để lộ thông tin nhạy cảm cho người lạ
    * Cho phép người lạ, không có thẩm quyền vào
    * Kết nối USB vào máy trạm
## Wireless Network Penetration Testing
* Giúp xác định các cấu hình sai trong cơ sở hạ tầng mạng không dây
* Các vấn đề bảo mật thường gặp mạng không dây:
    * Sự hiện diện của các điểm truy cập không được phép, điểm truy cập lừa đảo
    * Các tiêu chuẩn mã hóa không dây không an toàn
    * Công nghệ không dây mã hóa yếu
    * Không hỗ trợ công nghệ mạng không dây
## Mobile Device Penetration Testing
* Giúp bạn phát hiện các vấn đề bảo mật liên quan đến thiết bị di động và việc sử dụng chúng
* Các vấn đề bảo mật phổ biến với thiết bị di động
    * Không thực hiện hoặc thực hiện không đúng chính sách BYOD (Bring Your Own Device)
    * Sử dụng thiết bị di động trái phép
    * Sử dụng thiết bị di động đã root hoặc bẻ khóa
    * Kết nối với các mạng WIFI không an toàn
## Cloud Penetration Testing
* Giúp bạn xác định các vấn đề bảo mật trong cơ sở hạ tầng đám mây
* Các dịch vụ đám mây cũng phải đối mặt với các vấn đề bảo mật cụ thể của đám mây sau
    * Bảo vệ không đủ dữ liệu
    * Các vấn đề về băng thông và kết nối mạng
    * Quản lý truy cập người dùng kém
    * API không an toàn
    * Không có chính sách quyền riêng tư đối với hành động của người dùng trên đám mây
    * Các mối đe dọa bảo mật từ bên trong
#   Quy trình thực hiện pentest
## Quy trình kiểm thử xâm nhập
![](https://images.viblo.asia/600c6803-8fb0-4934-9c89-53b26f4ff601.png)


| Xác định phạm vi | Thực hiện kiểm thử xâm nhập | Báo cáo kết quả |
| -------- | -------- | -------- |
| Xác định phạm vi, đối tượng kiểm thử   | Bao gồm các bước thu thập thông tin, kiểm tra bảo mật hệ thống     | Thực hiện viết báo cáo chi tiết lỗ hổng và đưa ra khuyến nghị     |
## Các giai đoạn trong kiểm thử
**Pre-Attack Phase**: Ở giai đoạn này, chúng ta cần thực hiện các công việc sau:

* Thực hiện các thỏa thuận, hợp đồng, cam kết cần thiết
* Xác định scope của công việc kiểm thử: Phạm vi, đối tượng, thời gian kiểm thử
* Thu thập thông tin
* Dò quét cổng dịch vụ, vulnerability scan

**Attack Phase**: Ở giai đoạn này chúng ta thực hiện kiểm tra và khai thác lỗ hổng như một hacker thực sự:

* Thực hiện khai thác lỗ hổng, thực nghiệm (POC)
* Khi phát hiện lỗ hổng nghiêm trọng cần báo cho chủ dịch vụ, không thực hiện phá hay khai thác thông tin khi không được phép

**Post-Attack Phase**: Ở bước này chúng ta sẽ thực hiện các công việc sau khi kiểm thử bao gồm:
* Đưa ra báo cáo lỗ hổng, trình bày lỗ hổng với chủ dịch vụ
* Đưa ra khuyến nghị vá lỗ hổng
* Thực hiện kiểm tra lỗ hổng sau khi vá
# Một số  Penetration Testing Methodologies
Chúng ta có rất nhiều các chuẩn , framework, methodologies khác nhau trong việc thực hiện kiểm thử:

**Các chuẩn độc quyền:**
- EC-Council's LPT
- IBM
- ISS
- McAfee Foundstone

**Open source:**
- OSSTMM
- ISSAF
- NIST
- OWASP
# Kết luận
Bài viết trên mình chỉ đề cập tới các vấn đề hết sức cơ bản của công việc Penetration Testing (Kiểm thử xâm nhập). Mong rằng qua bài viết các bạn có thêm hiểu biết cũng như cái nhìn chính xác về công việc của những kỹ sư bảo mật. Cảm ơn các bạn đã theo dõi bài viết :D!!!