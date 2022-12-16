Trong bài viết này, mình muốn chia sẻ tới các bạn về Checklist các bước kiểm thử cho ứng dụng Web App, chúng ta cùng tìm hiểu nhé.

# Kiểm thử ứng dụng Web là gì?

Kiểm thử ứng dụng Web (Web Application Penetration Testing) là một phương pháp được dùng để xác định, phân tích và báo cáo những lỗ hổng đã tồn tại trên ứng dụng Web. Chẳng hạn các lỗ hổng như lỗi tràn bộ đệm, lỗi đầu vào, xác thực Bypass, SQL Injection, CSRF, XSS. Quá trình và quy trình kiểm thử cho một ứng dụng Web sẽ được lặp đi lặp lại thường xuyên nhằm đảm bảo ngăn chặn mọi lỗ hổng và những nguy cơ tấn công có thể xảy ra.

# Các bước kiểm thử ứng dụng Web App
##  THU THẬP THÔNG TIN

1.Truy xuất và phân tích tệp tin (file) robot.txt

=> Công cụ: GNU Wget

2.Kiểm tra phiên bản của .database Details, kiểm tra các thành phần kỹ thuật bị lỗi, lỗi do mã code yêu cầu các trang không hợp lệ.

3.Thực hiện chức năng tìm kiếm theo thư mục và quét lỗ hổng. Để thu thập tất cả các liên kết (URL) trong ứng dụng Web bạn có thể dùng công cụ NMAP và Nessus.

4.Xác định các điểm còn trống trong ứng dụng như OWSAP ZAP, Burb Proxy, TemperIE, dữ liệu WebscarabTemper.

5.Kiểm tra mã nguồn từ các trang truy cập trong giao diện của ứng dụng.

6.Kiểm tra các loại tệp hoặc các thư mục, tiện ích mở rộng có trong ứng dụng web với một số định dạng như .ASP, .EXE, .HTML, .PHP.

Bạn có thể xem chi tiết Các công cụ kiểm tra lỗ hổng Web app tại đây https://securitybox.vn/1049/12-cong-cu-danh-gia-lo-hong-bao-mat-web-ung-dung-he-thong-tot-nhat/ nhé!

## KIỂM TRA TÍNH XÁCH THỰC

1.Kiểm tra các phiên làm việc có thể ‘tái sử dụng’ sau khi Logout. Đồng thời, bạn cũng nên kiểm tra xem ứng dụng có tự đăng xuất người dùng trong một khoảng thời gian nhất định nào không.

2.Tiếp theo, bạn cần đảm bảo đằng những thông tin nhạy cảm có được lưu trữ trong trình duyệt hay không. Nếu thông tin hay dữ liệu quan trọng chưa được bảo mật, bạn cần mã hóa file, tệp lại.

3.Kiểm tra và thiết lập lại mật khẩu

=> Giải pháp: sử dụng kỹ thuật crack mật khẩu để đặt những câu hỏi bí mật và xác thực tính bảo mật của mật khẩu đã tồn tại.

4.Kiểm tra cơ chế “Remember my password”.

5.Kiểm thử xâm nhập lỗ hổng của CAPTCHA xem có an toàn không.

## KIỂM THỬ QUẢN LÝ CẤU HÌNH

1.Kiểm tra thư mục của máy chủ, đánh giá các tệp tin, tài liệu về máy chủ và ứng dụng.

2.Phân tích các banner trên máy chủ Web server, sau đó tiến hành quét hệ thống.

3.Kiểm tra và xác minh các tài liệu cũ, các dữ liệu đã được sao lưu và các tệp tham chiếu như mã nguồn, mật khẩu, các đường dẫn, phần cài đặt.

5.Kiểm tra và xác định các cổng kết nối với các dịch vụ SSL/TLS

=> Công cụ: NMAP, Nessus

6.Đánh giá độ bảo mật của HTTP

=> Sử dụng Netcat và Telnet

7.Kiểm tra tính năng quản lý cấu hình ứng dụng để xem lại thông tin về mã nguồn, nhật ký về tệp tin và các lỗi mặc định liên quan tới code.

## KIỂM TRA PHIÊN LÀM VIỆC

Wep-Application-Pentest-Testing

Phiên làm việc là một trong những phần quan trọng trong việc kiểm thử Web app. Các bước kiểm tra session như sau:

1.Check URL trong các khu vực hạn chế để kiểm tra lỗ hổng CSRF ( Cross Site Request Forgery).

2.Kiểm tra các biến Exposed Session bằng Encryption và sử dụng lại các token của session, proxies, bộ nhớ đệm, GET&POST.

3.Thu thập số mẫu cookie và phân tích thuật toán cookie, giả mạo Cookie hợp lệ để thực hiện tấn công.

4.Kiểm tra thuộc tính cookie bằng Burb Proxy, OWASP ZAP.

5.Kiểm tra các phiên làm việc session cố định để người dùng tránh bị tấn công bởi kỹ thuật session Hijacking.

## KIỂM THỬ XÁC THỰC DỮ LIỆU

1.Kiểm thử phân tích mã nguồn lỗi code javascript

2.Thực hiện kiểm tra các truy vấn liên quan tới lỗi SQL Injection hoặc thực hiện kiểm thử lỗi SQL injection theo tiêu chuẩn quốc tế.

=> Công cụ tham khảo: SQLninja, SQLdumper, SQL injection injector.

3.Phân tích các đoạn mã trong HTML, kiểm thử lỗ hổng XSS.

=> Công cụ tham khảo: XSS proxy, Backframe, Burb, XSS Assistant

4.Thực hiện phương pháp tấn công LDAP để kiểm tra những thông tin nhạy cảm về người dùng và dữ liệu bên trong máy chủ.

5.Kiểm thử tấn công IMAP/SMTP để truy cập vào phần backend của mail server.

6.Thực hiện kỹ thuật tấn công XPATH để truy cập vào các thông tin bí mật.

7.Kiểm thử lỗ hổng XML injection. XML injection là một trong những lỗi điển hình của Web App mà người kiểm thử các ứng dụng web phải chú ý. Mục đích của việc Pentest XML injection là để kiểm tra thêm thông tin về cấu trúc XML của hệ thống.

8.Kiểm tra lỗi trong bộ nhớ đệm của web app

Trên đây là tổng hợp những kiến thức  về checklist kiểm thử ứng dụng Web App mà mình muốn chia sẻ  và để 1 web tester/QA cần biết . Chúc các bạn thành công!.