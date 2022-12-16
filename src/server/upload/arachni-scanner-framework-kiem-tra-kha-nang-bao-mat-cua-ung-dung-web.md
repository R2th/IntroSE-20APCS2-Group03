# Giới thiệu
Arachni là một framework phục vụ cho tester và admin đánh giá khả năng bảo mật của ứng dụng web.
Framework này sử dụng được trên các hệ điều hành MS Windows, Mac OS X và Linux. Nó được phát hành dưới dạng portable package, nên cho phép sử dụng ngay lập tức.
Do được tích hợp vào trình duyệt, framework này có thể hỗ trợ những ứng dụng web phức tạp được tạo bởi các công nghệ như JavaScript, HTML5, DOM manipulation và AJAX.
# So sánh

|| [Arachni](https://www.arachni-scanner.com/) | [SonarQube](https://www.sonarqube.org/) | [Grabber](http://rgaucher.info/beta/grabber/)
| -------- | -------- | -------- | -------- 
| Sử dụng | Có giao diện trên web | Có giao diện trên web | Gõ lệnh trong terminal
| Phạm vi hoạt động | Quét khả năng bảo mật | Quét code smell, code coverage, khả năng bảo mật, ... | Quét khả năng bảo mật
| Cấu hình | Dễ dàng qua giao diện | Dễ dàng qua giao diện | Bằng file conf
| Output report | Giao diện dễ nhìn, hỗ trợ nhiều định dạng | Giao diện dễ nhìn, chỉ rõ vị trí có issue trong code | File XML

# Chức năng
Arachni thực hiện check khả năng bảo mật và log các issue vào report.
### Active check
Active check tấn công ứng dụng web thông qua các input
* SQL injection (`sql_injection`).
* Blind SQL injection dựa vào nội dung phản hồi (`sql_injection_differential`).
* Blind SQL injection dựa vào độ trễ của thời gian phản hồi (`sql_injection_timing`).
* NoSQL injection (`no_sql_injection`).
* Phát hiện kỹ thuật tấn công CSRF (`csrf`).
* Code injection (`code_injection`).
* Blind code injection dựa vào độ trễ của thời gian phản hồi (`code_injection_timing`).
* LDAP injection (`ldap_injection`).
* v.v.... [Chi tiết xem ở đây.](https://www.arachni-scanner.com/features/framework/#Active)
### Passive check
Passive check kiểm tra các file, thư mục, và các khóa đang sử dụng
* Các HTTP method được cấp quyền (`allowed_methods`).
* Các file backup (`backup_files`).
* Các thư mục backup (`backup_directories`).
* Common administration interfaces (`common_admin_interfaces`).
* Common directories (`common_directories`).
* Common files (`common_files`).
* HTTP PUT (`http_put`).
* v.v.... [Chi tiết xem ở đây.](https://www.arachni-scanner.com/features/framework/#Passive)
# Hướng dẫn sử dụng
1. Vào https://www.arachni-scanner.com/ tải về bản mới nhất. Click file exe vừa tải về sẽ giải nén ra một thư mục Arachni portable dùng được ngay. Trong thư mục này, xem hướng dẫn sử dụng trong README.
2. Vào thư mục Arachni > bin. Bật arachni_web sẽ mở màn hình cmd như sau.
![](https://images.viblo.asia/cc5d7fc6-ae4e-48b3-9fd8-1b876484ea8a.jpg)
3. Mở trình duyệt, vào http://localhost:9292 để truy cập giao diện web của Arachni
![](https://images.viblo.asia/904a50d8-d81e-47e7-93a5-022b6d114940.jpg)
4. Vào Scans để xem danh sách scan đang chạy (Active), đã hoàn thành (Finished), tạm ngừng (Suspended).
5. Vào Scans > New, nhập URL để bắt đầu quét khả năng bảo mật của trang web.
6. Vào Scans > Schedule để lập lịch quét. Có thể lập lịch quét tại thời điểm mong muốn, quét định kì.
7. Vào Profiles để xem danh sách cấu hình. Ta có thể xem, sửa, sao chép, xóa, export cấu hình trong danh sách.
8. Vào Profiles > New để tạo cấu hình mới.