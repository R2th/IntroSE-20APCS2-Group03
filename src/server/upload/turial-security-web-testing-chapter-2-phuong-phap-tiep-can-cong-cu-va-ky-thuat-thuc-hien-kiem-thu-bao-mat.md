Trong chương 1(https://viblo.asia/p/tutorial-security-web-testing-chapter-1-tong-quan-ve-kiem-thu-bao-mat-oOVlYN4V58W), chúng ta đã tìm hiểu tổng quan về kiểm thử bảo mật (Security testing), qua đó nắm được khái niệm, tầm quan trọng và mục đích của kiểm thử bảo mật. Với chương 2, chúng ta sẽ đi sâu hơn về cách thức tiếp cận kiểm thử bảo mật, các công cụ và kỹ thuật thực hiện. 

Trước khi đi vào phân tích cách thức tiếp cận với các kỹ thuật kiểm thử bảo mật, chúng ta cần hiểu rõ hơn về các loại nguy cơ bảo mật là gì, từ đó với mỗi loại nguy cơ, ta sẽ có cách tiếp cận và kỹ thuật kiểm thử khác nhau.
### 1.Các loại nguy cơ bảo mật
1. Privilege Elevation (Chiếm quyền điều khiển)

Chiếm quyền điều khiển là một dạng tấn công mà hacker có một tài khoản thường trên hệ thống và sử dụng tài khoản này để tăng đặc quyền điều khiển hệ thống của mình (lên mức như một admin). Nếu thành công, kiểu tấn công này có thể dẫn đến việc hacker chiếm được các đặc quyền cao như root của Unix, Administrator của Web. Một khi đã có các quyền này, hacker có thể thực hiện xâm nhập toàn diện hệ thống một cách hiệu quả.

2. SQL Injection (Lỗ hổng truy vấn dữ liệu)

Đây là một lỗi cổ xưa nhất quả đất, tuy nhiên đến hiện tại vẫn còn là nỗi ác mộng với các coder tay mơ. Thực tế hiện tại, hầu hết các framework đều đã hỗ trợ xử lý lỗ hổng này nên trừ khi có coder gà mờ nào muốn code web từ tay trắng mới dễ xảy ra lỗi này.
Dù vậy, SQL Injection vẫn là lỗ hổng rất nguy hiểm, một khi khai thác được, hacker có thể truy vấn được toàn bộ thông tin trong database. Cơ chế của SQL Injection thì thực tế rất đơn giản, Hacker thay đổi thông tin nhập vào trên các textbox và từ đó thay đổi câu lệnh SQL thông qua việc cộng chuỗi. Với các Web thực hiện truy vấn thông qua SQL Thuần, tức mang thẳng câu lệnh từ các ô input vào chạy, thì việc khai thác thông SQL Injection thực sự dễ dàng.

3. Unauthorized Data Access (Truy vấn dữ liệu trái phép)

Trong khi thực hiện SQL Injection để truy vấn toàn bộ thông tin hoặc chiếm quyền điều khiển toàn bộ hệ thống thường khó xảy ra, thì việc truy vấn dữ liệu trái phép lại là một kiểu tấn công phổ biến. Truy vấn dữ liệu trái phép bao gồm nhiều cách thức sau :

oThông qua các hoạt động hiển thị dữ liệu 

oThông qua việc giám sát việc truy cập của người khác để lấy thông tin xác thực

oThông qua việc giám sát dữ liệu truy cập của người khác

4. URL Manipulation (Thao túng URL)

URL Manipulation là cách thức tấn công thông qua việc thao túng chuỗi truy vấn URL của Website, qua đó hacker có thể nắm được các thông tin quan trọng. Cách thức tấn công này thường nhắm vào các ứng dụng web sử dụng giao thức HTTP GET để truyền thông tin giữa client và server, khi sử dụng giao thức này, thông tin sẽ được truyền trong các tham số và hiển thị rõ ràng trong URL.

5. Denial of Service (DoS – Từ chối dịch vụ)

Dos là cách thức tấn công nhằm vào máy chủ (server) hoặc tài nguyên mạng (switch, banwitch…) với mục đích làm gián đoạn quá trình cung cấp dịch vụ, đôi khi gây ra cao tải database và sập toàn bộ Website, không thể khởi động lại được. Đây là dạng tấn công phổ biết nhất thế giới hiện nay, cực kỳ đa dạng từ cách thức tấn công cũng như phòng chống. Nói chung là làm cách nào cũng được, huy động thủ công hoặc máy móc (botnet) để truy vấn liên tục vào web gây sập web, như kiểu mua vé Online VFF cũng là một dạng DoS thủ công từ hơn 100000 người thích xem bóng đá và thích bán vé bóng đá như em.

6. Data Manipulation (Thao tác dữ liệu)

Thao tác dữ liệu là cách thức tấn công mà hacker thay đổi dữ liệu hoặc một page hiển thị thông tin của website để khoe mẽ cho oai.

7. Identity Spoofing (Giả mạo nhận dạng)

Giả mao nhận dạng là  một kỹ thuật trong đó tin tặc sử dụng thông tin đăng nhập của của người dùng hoặc thiết bị hợp pháp, qua đó khởi động các cuộc tấn công vào máy chủ mạng, đánh cắp dữ liệu hoặc bypass quá các quyền kiểm soát.

8. Cross-Site Scripting (XSS)

Cross-site scripting là một lỗ hổng phổ biến trong ứng dụng web. Để khai thác một lỗ hổng XSS, hacker sẽ chèn mã độc thông qua các đoạn script để thực thi chúng ở phía client. Thông thường, các cuộc tấn công XSS được sử dụng để vượt qua các kiểm soát truy cập và mạo danh người dùng.
Phân loại: Có 3 loại Reflected XSS, Stored XSS và DOM-based XSS.
Dưới đây là thống kê tỷ lệ phát hiện các nguy cơ bảo mật, trong đó top 3 chính là DoS, SQL Injection và Cross-Site Scripting.
![](https://images.viblo.asia/703ca17b-adec-4c95-905e-ea0a46336472.png)

### 2.Các kỹ thuật kiểm thử bảo mật
Sau khi đã hiểu sơ qua các cách thức tấn công bảo mật, chúng ta tiếp tục suy nghĩ xem làm cách nào để chống lại chúng. Tất nhiên là không thể tay không bắt giặc được, để có thể triển khai một cách hiệu quả các nghiệp vụ kiểm thử bảo mật, tester cần có các kiến thức nhất định về giao thức HTTP, cơ chế client-server, cơ bản về SQL và XSS. Dưới đây là mô tả sơ bộ các kỹ thuật kiểm thử bảo mật : 

1. Cross Site Scripting (XSS):

Tester cần thực hiện kiểm tra việc lọc đầu vào có được áp dụng với tất cả các loại dữ liệu nhập vào chưa (Textbox, URL…). Đảm bảo loại bỏ toàn bộ các nội dung không hợp lệ, như các thẻ HTML hoặc thẻ SCRIPT. Đồng thời kiểm tra cả các ký tự đặc biệt : dấu nháy đơn, dấu lớn hơn (>), dấu nhỏ hơn (<)

2. Ethical Hacking (Hacker mũ trắng) :

Một cách hiệu quả để đánh giá mức độ bảo mật của hệ thống là hack thử xem sao. Do đó việc thuê một cá nhân hoặc tổ chức hoặc nhiều tiền thì tuyển hẳn một cao thủ hacker để chuyên thực hiện các cuộc tấn công thử vào hệ thống trước khi release là một nghiệp vụ rất phổ biến trên thế giới. Sau đó dựa vào các đánh giá và đề xuất của hacker mũ trắng, đội dự án sẽ quyết định các cách thức và giải pháp bảo mật chính xác.

3. Password Cracking (Bẻ khóa password)

Kỹ thuật bẻ khóa password là một kỹ thuật quan trọng trong việc kiểm thử bảo mật. Với mật khẩu dễ đoán (như kiểu 123456, ngày sinh…) thì đều là mồi ngon cho hacker. Do đó tester cần kiểm thử bảo mật các module liên quan mật khẩu như đăng ký, đổi pass, quên pass… Qua đó đảm bảo hệ thống chỉ cho phép đặt mật khẩu phức tạp (bao gồm chữ, số, ký tự đặc biệt, độ dài tối thiểu…). Ngoài ra một số hệ thống lưu trữ user/pass trong cookies thì việc của tester là kiểm tra xem các cookies này đã được mã hóa hay chưa?

 4. Penetration Testing (Kiểm tra thâm nhập)

Penetration Testing ( Pentest ) chính là đánh giá độ an toàn bằng cách tấn công vào hệ thống. Mục tiêu của pentest là đánh giá hạ tầng mạng, đánh giá hệ thống máy chủ, đánh giá ứng dụng web. Có 3 phương pháp được sử dụng trong pentest là :

* Hộp đen : Tấn công từ ngoài vào (black box Pen Test): các cuộc tấn công được thực hiện mà không có bất kỳ thông tin nào, pentester sẽ đặt mình vào vị trí của những tin tặc mũ đen và cố gắng bằng mọi cách để thâm nhập vào được mạng nội, ngoại của khách hàng. Pentester sẽ mô phỏng một cuộc tấn công thực sự vào ứng dụng ,quá trình thử nghiệm bao gồm một loạt các lỗ hổng bảo mật ở cấp ứng dụng được xác định bởi OWASP và WASC, nhắm mục tiêu các lỗ hổng bảo mật nguy hiểm tiềm tàng trong ứng dụng của khách hàng. Quá trình thử nghiệm sẽ tiết lộ các lỗ hổng, thiệt hại khai thác tiềm năng và mức độ nghiêm trọng

* Hộp trắng : Tấn công từ trong ra (white box Pen Test): là các thông tin về mạng nội bộ và ngoại sẽ được cung cấp bởi khách hàng và Pentester sẽ đánh giá an ninh mạng dựa trên đó. Điều quan trọng là cho các tổ chức để xác định rủi ro và mối đe dọa của họ xuất phát từ đâu Nếu doanh nghiệp cảm nhận được nó đến từ các nhân viên, khách hàng hoặc đối tác thương mại, nó có thể có lợi để tiến hành một thử nghiệm hộp Penetration trắng. Nhân viên, khách hàng và các đối tác thương mại có kiến thức về thông tin của doanh nghiệp. Họ có thể biết rằng Doanh Nghiệp  có một Intranet hoặc Extranet, trang web, và họ cũng có thể có các thông tin cho phép họ để đăng nhập vào hệ thống. Họ có thể biết nhân viên làm việc trong tổ chức, cơ cấu quản lý, các ứng dụng chạy trong môi trường. Tất cả các thông tin này có thể được sử dụng để khởi động các cuộc tấn công nhắm mục tiêu nhiều hơn đối với một cơ sở hạ tầng, mà có thể không được xác định là một phần của một sự tham gia thử nghiệm Black Box.

* Hộp xám : Kiểm định hộp xám (Gray-box hay Crystal-box): Giả định như hacker được cung cấp tài khoản một người dùng thông thường và tiến hành tấn công vào hệ thống như một nhân viên của doanh nghiệp

5. Risk Assessment

Đánh giá rủi ro là một quá trình đánh giá và quyết định rủi ro liên quan các loại thất thoát hoặc lỗ hổng có thể xảy ra. Kỹ thuật này hơi chung chung, hầu hết dựa trên khả năng chém gió và kinh nghiệm của các chuyên gia là chính, không liên quan nhiều đến nhiệm vụ của tester.

 6. Security Auditing
 
Thực hiện Audit hệ thống thông qua một bộ KPI có sẵn

7. Security Scanning & Vulnerability Scanning

Dùng một số công cụ để quét lỗ hổng bảo mật trên ứng dụng web. OS hay mạng lưới

8. SQL Injection

Tester thực hiện kiểm tra SQL Injection trên tất cả các tính năng nhập thông tin từ textbox. Đảm bảo sử dụng các dấu đặc thù sẽ bị từ chối như nháy đơn, chấm phẩy, ngoặc đơn, ngoặc kép. Kiểm tra trong database đảm bảo việc lưu trữ các dữ liệu này đều đã được xử lý sơ bộ.

9. URL manipulation through HTTP GET methods

Sau khi xác định được các modude sử dụng giao thức HTTP GET, Tester thực hiện kiểm tra các chức năng có tính năng submit xem có gửi thông tin quan trọng trong đường dẫn URL không.

10. Buffer Overflow Testing

Tester thực hiện kiểm tra giá trị biên của các tham số input đầu vào như độ dài tối đa của chuỗi, các chuỗi phức tạp…

### 3.Phương pháp triển khai kiểm thử bảo mật
Sau khi nắm được sơ bộ các kỹ thuật kiểm thử bảo mật, chúng ta tiếp tục đi sâu hơn về các bước triển khai kiểm thử bảo mật :

-Nghiên cứu kiến trúc bảo mật : bước dầu tiên là hiểu yêu cầu kinh doanh, nghiệp vụ của hệ thống, mục tiêu bảo mật của khách hàng cũng như của công ty phần mềm. Kế hoạch kiểm thử cần cân nhắc tất cả yếu tố liên quan đến bảo mật, một số chuẩn của từng tổ chức, ví dụ như chuẩn PCI.

-Phân tích kiến trúc bảo mật : Nắm rõ và phân tích chi tiết các yêu cầu của ứng dụng được test

-Phân loại kiểm thử bảo mật : Thu thập toàn bộ các thông tin liên quan trong quá trình triển khai dự án như : phần mềm, framework, phần cứng, công nghệ, đường truyền mạng... Lập danh sách các lỗ hổng và rủi ro bảo mật có thể xảy ra (có thể tham khảo mục 1).

-Xây dựng Profile các nguy cơ bảo mật : Từ các bước phân tích tổng thể và chi tiết ở trên, xây dựng một bản profile các nguy cơ bảo mật, đồng thời chủ động đưa ra các kỹ thuật kiểm thử phù hợp với từng nguy cơ.

-Kế hoạch kiểm thử : dựa trên bản Profile trên, Test xây dựng kế hoạch kiểm thử

-Xây dựng ma trận nguyên nhân : với mỗi nguy cơ bảo mật, xây dựng ma trận các nguyên nhân có thể gây ra vấn đề bảo mật này và phương thức kiểm thử chi tiết.

-Thống nhất công cụ hỗ trợ kiểm thử bảo mật : Với các hệ thống lớn, không thể test thủ công toàn bộ các testcase kiểm thử bảo mật, do đó cần có một tập các công cụ hỗ trợ kiểm thử.  Đảm bảo quá trình test được nhanh và chính xác hơn.

-Xây dựng testcase : Sau khi hoàn thành các bước trên, tester thực hiện xây dựng các testcase kiểm thử bảo mật.

-Thực hiện testcase : Thực hiện lặp đi lặp lại các testcase, phát hiện lỗi và kiểm thử sau khi fix lỗi. 

-Báo cáo : thực hiện báo cáo chi tiết về các phát hiện trong quá trình kiểm thử bảo mật, các trường hợp có khả năng fix được và đã được fix, các trường hợp vẫn chưa giải pháp dứt điểm và nguy cơ ảnh hưởng khi bị khai thác.

### 4.Các công cụ hỗ trợ test


Dưới đây là các công cụ hỗ trợ kiểm thử bảo mật phổ biến và đã được kiểm nghiệm thực tế, tùy vào yêu cầu và thực tế triển khai dự án, team test cần quyết định sẽ sử dụng các công cụ nào, mỗi công cụ sẽ tham gia vào kiểm thử nguy cơ nào : 



| Tools | Mô tả | Yêu cầu môi trường |
| -------- | -------- | -------- |
| BeEF     | BeEF (Browser Exploitation Framework) là công cụ tập trung vào kiểm thử các trình duyệt Web. Người dùng có thể xây dựng các kịch bản tấn công và qua đó đánh giá mức độ bảo mật của một trang web.     | Linux, Apple Mac OS X and Microsoft Windows     |
|BFBTester – Brute Force Binary Tester |BFBTester là một công cụ hỗ trợ kiểm tra bảo mật của các ứng dụng mã hóa dạng nhị phân. Công cụ này tập trung vào kiểm tra các case liên quan input đầu vào, đặc biệt tập trung vào kiểm tra các biên dữ liệu.  | POSIX, BSD, FreeBSD, OpenBSD, Linux|
|Brakeman|Brakeman là một ứng dụng quét lỗ hổng bảo mật của source code, được thiết kế riêng cho các ứng dụng code bằng Ruby on Rails. Nó thực hiện phân tích mã ứng dụng Rails và đưa ra các vấn đề bảo mật ở bất kỳ giai đoạn phát triển nào.|Rails 3|
|CROSS|The CROSS (Codenomicon Robust Open Source Software) là chương trình quét lỗ hổng trong source code của các ứng dụng mã nguồn mở. Nó sử dụng giao thức mạng DEFENSICS giúp các dự án tìm nhanh số lượng lớn các lỗi nghiêm trọng.|130 protocol interfaces and formats|
|Ettercap|Ettercap là công cụ free và chuyên về tìm kiếm các lỗ hổng bảo mật mạng cho các ứng dụng mã nguồn mở, đặc biệt các cuộc tấn công trung gian trên mạng LAN (man-in-the-middle). ||
|Flawfinder|Flawfinder là công cụ quét bảo mật cho các ứng dụng viết bằng C/C++ |Python 1.5 or greater|
|Gendarme|Gendarme là công cụ quét bảo mật cho các ứng dụng .NET và thư viện liên quan. Gendarme kiểm tra các ứng dụng .NET chứa sourcecode ở định dạng ECMA CIL (Mono và .NET). |.NET (Mono or MS runtime)|
|Knock Subdomain Scan|Knock là một công cụ hiệu quả chuyên về kiểm thử bảo mật cho domain. Công cụ này rất hữu dụng để thử nghiệm xâm nhập hộp đen nhằm tìm các vấn đề bảo mật trên các tên miền chính và tên miền phụ (subdomain)|Linux, Windows and MAC OS X with Python version 2.x|
|Metasploit|The Metasploit Framework mà một mã nguồn mở tiên tiến cho phép phát triển, test và sử dụng để khai thác lỗ hổng trong source code. Dự án này ban đầu phát triển như một trò chơi trên mạng di động, sau đó nhanh chóng phát triển thành một công cụ mạnh mẽ để thử nghiệm thâm nhập, khai thác và nghiên cứu các lỗ hổng bảo mật.|Win32 / UNIX|
|Nessus|The Nessus vulnerability scanner là công cụ hàng đầu thế giới về quét lỗ hổng. Bao gồm kiểm tra các cấu hình, hồ sơ tài sản, dữ liệu nhạy cảm và lỗ hổng bảo mật. Đây là công cụ mà nhiều công ty lớn ở Việt Nam đang sử dụng trong việc kiểm thử bảo mật các ứng dụng nội bộ quan trọng.|Linux, Solaris, Mac, Windows|
|Nikto|Nikto là một công cụ mã nguồn mở, chuyên được sử dụng trên các server để phát hiện các cấu hình phần mềm lỗi thời (out of date), dữ liệu không hợp lệ… |Windows/UNIX|
|Nmap|Nmap (Network Mapper) là công cụ quét bảo mật mạng. Nmap sử dụng các gói IP để xác định các máy chủ khả dụng trên mạng, dịch vụ, OS, loại tường lửa đang được sử dung. Từ đó đưa ra các đánh giá bảo mật mức độ mạng.|Linux, Windows, and Mac OS X.|
|nsiqcppstyle|nsiqcppstyle là công cụ kiểm tra bảo mật cho các ứng dụng viết bằng C/C++|Platform Independent|
|Oedipus|Oedipus là một công cụ kiểm tra bảo mật cho các ứng dụng web viết bằng ruby. Nó có khả năng phân tích các loại log khác nhau và xác định các lỗ hổng bảo mật.|OS Independent|
|Zed Attack Proxy|The Zed Attack Proxy (ZAP) là một công cụ hỗ trợ kiểm thử thâm nhập để tìm lỗ hổng trong các ứng dụng web. Đây là công cụ khá chuyên nghiệp để triển khai kiểm thử thâm nhập.|Windows, Linux, Mac OS|
|Paros|Paros là một úng dụng hỗ trợ kiểm thử web, kiểm tra việc trao đổi dữ liệu giữa client và server thông qua các giao thức HTTP/HTTPS. |Cross-platform, Java JRE/JDK 1.4.2 or above|
|Social Engineer Toolkit|The Social-Engineer Toolkit (SET) là một công cụ mã nguồn mở, nó tập trung khai thác bảo mật ở khía cạnh con người hơn là hệ thống. Công cụ này hỗ trợ gửi mail, java applet… có chưa mã tấn công. Có thể sử dụng công cụ này để test việc lừa gà trong công ty.|Linux, Apple Mac OS X and Microsoft Windows|
|Skipfish|Skipfish là một công cụ quét bảo mật cho web. Đây là công cụ chuyên nghiệp.|Linux, FreeBSD, MacOS X, and Windows|
|Vega|Vega là công cụ mã nguồn mở, đa nền tảng, có giao diện thân thiện, được sử dụng để kiểm thử bảo mật các nguy cơ phổ biến như SQL Injection, XSS… Các module tấn công trong Vega được viết bằng java script, người dùng hoàn toàn có thể sửa đổi hoặc viết mới module tấn công riêng cho mình.|Java, Linux, Windows.|
|Wapiti|Wapiti là công cụ mã nguồn mở, được viết bằng python, chuyên quét lỗ hổng bảo mật trên các web.|Python|
|Websecurify|Websecurify là một công cụ tự động phát hiện các lỗ hổng web|Unix, Linux, and Windows|
|Wireshark|Wireshark là công cụ phân tích gói tin trên mạng. Đây là công cụ rất phổ biến, được áp dụng rộng rãi trong nhiều lĩnh vực, từ gà đến chuyên gia, nhằm phân tích các gói tin được truyền trên mạng. Từ đó làm cơ sở để xử lý sự cố, phân tích, phát triển phần mềm, giao thức mạng.|Unix, Linux, and Windows|



### 5.Tham khảo
* https://www.3pillarglobal.com/insights/approaches-tools-techniques-for-security-testing
* https://searchsoftwarequality.techtarget.com/tutorial/Learning-Guide-Application-security-testing-techniques
* https://www.testbytes.net/blog/security-testing-threats-tools-techniques/