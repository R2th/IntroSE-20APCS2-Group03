**Security Testing:**
* Kiểm thử bảo mật là kiểm tra ứng dụng để tìm ra các lỗ hỏng về bảo mật.
* Các website/ app về buôn bán, ngân hàng, mạng xã hội,... có thể bị nhiễm virus bất cứ lúc nào nên kiểm thử bảo mật là cần thiết và quan trọng.

**Giới thiệu về ZAP**

OWASP Zed Attack Proxy (ZAP) là một công cụ miễn phí và phổ biến được duy trì bởi hằng trăm nghìn tình nguyện viên trên toàn thế giới. Nó là công cụ bổ ích khi kiểm tra bảo mật thủ công vì nó giúp chúng ta tìm ra các lỗ hỏng bảo mật trên website một cách tự động.  
ZAP là được gọi là "man-in-the-middle proxy", nó đứng giữa trình duyệt của người test và ứng dụng web, nó có thể ngăn chặn và kiểm trả các thông điệp được gửi đi, sửa đổi và gửi tiếp các thông điệp đó đến đích.
![](https://images.viblo.asia/06b24f50-5699-4502-88cc-f3cba6e5b45f.PNG)

Và nếu một network proxy khác được sử dụng, ZAP có thể được cấu hình để connect với proxy đó.
![](https://images.viblo.asia/bef348a0-802f-4c24-a3c3-09847192d57b.PNG)

*Những lý do bạn nên sử dụng ZAP:*

* ZAP được set up nhanh chóng, dễ dàng.
* Hỗ trợ trên nhiều nền tảng như Windows, Linux, MacOS, Cross platform package.
* Nó không yêu cầu bạn có nhiều kiến thức về Kiểm thử bảo mật.
* Kiểm thử được thực hiện một cách tự động, bạn có thể thực hiện các kiểm thử manual khác trong lúc đó.
* Liệt kê tất cả các lỗ hỏng mà ZAP quét được từ ứng dụng của bạn.
* Cung cấp giải pháp cho deverloper ngăn chặn các lỗi bảo mật.
* Quét tất cả các trang and highlight vùng bị ảnh hưởng bởi lỗ hỏng bảo mật.
* Cung cấp thông tin cho một bản báo cáo chi tiết.

**Các tính năng của ZAP**

* Intercepting Proxy
* Traditional and AJAX spiders
* Automated scanner
* Passive scanner
* Forced browsing
* Fuzzer
* Dynamic SSL certificates
* Smartcard and Client Digital Certificates support
* Web sockets support
* Support for a wide range of scripting languages
* Plug-n-Hack support
* Authentication and session support
* Powerful REST based API
* Automatic updating option
* Integrated and growing marketplace of add-ons

**Install ZAP**
Bạn có thể download ZAP từ [Owasp.org](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project)
Chú ý là bạn cần cài đặt Java 8+ trước khi cài ZAP version 2.8.0

**Sử dụng ZAP tool với chế độ Automated scan**

***Bước 1:***

Khi open App bạn sẽ được lựa chọn có lưu giữ lại Session hay không. Theo mặc định, ZAP session sẽ được  ghi vào đĩa ở HSQLDB với tên và location mặc định. Nếu bạn lựa chọn không duy trì session, các tệp được ghi sẽ được xóa khi thoát ZAP. Nếu bạn duy trì session, thông tin sẽ được ghi lại, bạn sẽ có thể truy cập lại tệp và tùy chỉnh tên và vị trí.

***Bước 2:***   

Nhập URL của website mà bạn muốn check vào field URL to attack

***Bước 3:***

Click Attack button
![](https://images.viblo.asia/444848a2-9d9a-4808-a6b3-ada397beb9dd.PNG)

Zap sẽ scan tự động website mà bạn đã nhập và show các report các lỗ hỏng tìm được ở Tab Alert. Các báo cáo được thể hiện theo từng loại lỗi hỏng và show số lượng lỗi tìm được của từng lỗ hỏng và URL tìm ra nó. Các loại warming sẽ khác nhau tùy thuộc vào trang web của bạn, ví dụ như:
1. X-Frame-Options Header Scanner
2. Session ID in URL Rewrite
3. Cookie Without Secure Flag
4. Private IP Disclosure


![](https://images.viblo.asia/c53b7500-8fb0-4d16-8e57-130b4326cf6c.PNG)

***Bước 4:***

Bạn có thể xem các thông tin chi tiết của lỗ hỏng bằng cách click vào một lỗ hỏng bất kỳ từ tab Alert. Các dòng code gây ra lỗi sẽ được highlight như ảnh dưới đây

![](https://images.viblo.asia/9eaf9293-c4f9-4848-8aaf-62d96213ec7d.PNG)

*Ngoài ra, bạn có thể tìm được giải pháp được suggest ở mục Solution, thông tin lỗ hỏng ở Description và thông tin tham khảo ở Reference*

**Các trang web bạn có thể thực hành**

1. [bWAPP](http://www.itsecgames.com/)
2. [Damn Vulnerable iOS App (DVIA)](http://damnvulnerableiosapp.com/)
3. [Game of hacks](http://www.gameofhacks.com/)
4. [Google-gruyere](http://google-gruyere.appspot.com/)
5. [Hackthis](https://www.hackthis.co.uk)
6. [Hack this site](https://www.hackthissite.org/)
7. [McAfee HacMe Sites](https://www.mcafee.com/enterprise/en-us/downloads/free-tools.html)
8. [Try2Hack](http://www.try2hack.nl/)
9. [OverTheWire](http://overthewire.org/wargames/)
10. [WebGoal](http://webappsecmovies.sourceforge.net/webgoat/)



Refer:
https://bit.ly/2J15wjs https://www.zaproxy.org/ https://bit.ly/2OYxLDa https://bit.ly/1QNCwIb  https://bit.ly/31r1cQw https://bit.ly/2MQ8RD1
ZAPGettingStartedGuide-2.8.pdf