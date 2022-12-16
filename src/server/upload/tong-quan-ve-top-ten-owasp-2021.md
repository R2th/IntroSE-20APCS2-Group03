![image.png](https://images.viblo.asia/9b325dc7-1f4c-40e6-9bcd-a4ed93275898.png)

**1. Broken Access Control (phá vỡ kiểm soát truy cập)**
* Kiểm soát truy cập là sự kiểm soát người dùng không cho phép họ thực thi những hành động bên ngoài quyền hạn. Các lỗi thường dẫn đến tiết lộ thông tin trái phép, sửa đổi hoặc phá hủy tất cả dữ liệu hoặc thực hiện chức năng ngoài giới hạn của người dùng.
* Các lỗ hổng phổ biến
  * Sửa đổi URL
  * Sửa đổi thông tin nhận dạng để truy cập tài khoản người khác (IDOR)
  * Leo thang đặc quyền
* Cách ngăn chặn
  * Ngoại trừ tài nguyên công cộng, còn lại từ chối theo mặc định
  * Xác thực người dùng khi học quay lại ứng dụng
  * Kiểm tra quyền tại thời điểm người dùng cố gắng thực hiện hành động
* Ví dụ: Kẻ tấn công chỉ cần buộc các trình duyệt đến các URL mục tiêu. Quyền quản trị được yêu cầu để truy cập vào trang quản trị
`https://example.com/app/getappInfo`, `https://example.com/app/admin`

**2. Cryptographic Failures (lỗi mật mã bị hỏng)**
* Bảo mật thông tin nhạy cảm bằng cách mã hóa thông tin theo các cách khác nhau, nhưng nếu cách mã hóa đó kẻ tấn công có thể giải mã được hay là cách thức giải mã không đảm bảo an toàn bản rõ thì những thông tin nhạy cảm đó sẽ bị rò rỉ ra ngoài.
* Các lỗi phổ biến
  * Sử dụng những giao thức truyền dữ liệu dạng rõ như HTTP, FTP,...
  * Sử dụng những mã hóa đã cũ hoặc yếu
  * Sử dụng những hàm băm không dùng nữa như md5, SHA1
  * Khóa bí mật dễ đoán
  * Chuỗi mã hóa không được xác thực
* Cách ngăn chặn
  * Không sử dụng những giao thức đã cũ như FTP, SMTP,... để vận chuyển dữ liệu nhạy cảm
  * Đảm bảo các thuật toán mã hóa đạt tiêu chuẩn mạnh mẽ
  * Mã hóa dữ liệu trên đường truyền bằng TLS, HTTPS
  * Lưu trữ password bằng các hàm băm mạnh như Argon2, scrypt, bcrypt,...
  * Luôn sử dụng mã hóa được xác thực thay vì chỉ mã hóa
* Ví dụ: Một trang web không sử dụng TLS cho tất cả các trang hoặc hỗ trợ mã hóa yếu. Kẻ tấn công giám sát lưu lượng mạng (như tại một mạng không dây không an toàn), hạ cấp các kết nối từ HTTPS xuống HTTP, chặn các yêu cầu và đánh cắp cookie phiên của người dùng. Sau đó, kẻ tấn công phát lại cookie này và chiếm quyền điều khiển phiên của người dùng, truy cập hoặc sửa đổi dữ liệu cá nhân của người dùng. Thay vì những điều trên, họ có thể thay đổi tất cả dữ liệu được vận chuyển, ví dụ như người nhận chuyển tiền.

**3. Injection (Tiêm lệnh)**
* Cuộc tấn công tiêm xảy ra ở bất kì đâu trên trang web có đầu vào từ người dùng mà có đầu ra không xác nhận hoặc mã hóa nó. Có rất nhiều cách tiêm nhưng mình sẽ liệt kê ra 3 loại khá phổ biến
  * SQL injection: tiêm vào một đoạn mã hợp lệ vào trong cơ sở dữ liệu để truy xuất dữ liệu
  * Command injection: tiêm những câu lệnh hệ thống độc hại thường ở dạng tập lệnh để khai thác dữ liệu nhạy cảm
  * XSS - Cross-site Scripting: tiêm những đoạn mã vào trang web mục đích để khai thác dữ liệu trên trang web
* Cách ngăn chặn
  * Sử dụng API an toàn, tránh sử dụng hoàn toàn trình thông dịch, cộng chuỗi trong truy vấn
  * Đối với bất kì truy vấn, hãy thoát các kí tự đặc biệt, lọc đầu vào
* Ví dụ: Một ứng dụng sử dụng dữ liệu không đáng tin cậy trong việc xây dựng lệnh gọi SQL dễ bị tấn công sau:

    `String query = " SELECT * FROM accounts WHERE custID='" + request.getParameter("id") + "'";`
    
    Kẻ tấn công sửa đổi giá trị tham số **id** trong trình duyệt của họ để gửi với đường dẫn: 

    `http://example.com/app/accountView?id=1' or '1'='1`
    
    Từ đó cho phép kẻ tấn công có thể xem được tất cả dữ liệu không chỉ với **id=1**

**4. Insecure Design (Thiết kế không an toàn)**
* Thiết kế an toàn là phân tích các giả định và điều kiện cho các dòng dự kiến đảm bảo chính xác, tránh trường hợp không mong muốn và có hành vi phù hợp với từng trường hợp. Đảm bảo kết quả được ghi lại trong nhật kí của người dùng. Học hỏi từ những sai lầm và đưa ra những cải tiến thích hợp.
* Cách ngăn chặn
  * Thiết lập sử dụng những thư viện mẫu thiết kế an toàn
  * Kiểm tra tính hợp lí ở mỗi cấp ứng dụng
  * Tách các lớp phần trên hệ thống và các lớp mạng
  * Hạn chế tiêu thụ tài nguyên người dùng hoặc dịch vụ
* Ví dụ: Một rạp chiếu phim cho phép đặt chỗ theo nhóm tối đa 15 người trước khi đặt tiền cọc, một kẻ tấn công có thể chạy lệnh để đặt tất cả các chỗ trong rạp sau đó dừng lại ở bước đặt cọc, gây tổn thất lớn về kinh tế

**5. Security Misconfiguration (Cấu hình bảo mật sai)**
* Nếu Insecure Design thuộc về phần thiết kế thì Security Misconfiguration thuộc về phần triển khai. Những lỗi phổ biến thường xảy ra
  * Các tính năng không cần thiết được bật như các port, service, account,...
  * Thiếu việc tăng cường bảo mật cho từng phần của ứng dụng
  * Các tài khoản và mật khẩu vẫn để mặc định không thay đổi
  * Phần mềm đã lỗi thời
* Cách ngăn chặn
  * Loại bỏ những tài nguyên, tính năng không cần thiết
  * Cung cấp sự hiệu quả và an toàn giữa các thành phần
  * Liên tục cập nhật những phiên bản mới nhất
* Ví dụ: Danh sách thư mục không bị tắt trên máy chủ. Kẻ tấn công phát hiện ra chúng có thể liệt kê các thư mục một cách đơn giản. Điều này có thể dẫn đến kẻ tấn công dịch ngược lại đoạn code và là tiềm ẩn rất lớn cho nhiều mối nguy hiểm khác

**6. Vulnerable and Outdated Components (Các thành phần dễ bị tổn thương và lỗi thời)**
* Những lỗi phổ biến
  * Không quét lỗ hổng thường xuyên và đăng ký nhận các bản tin bảo mật liên quan đến các thành phần bạn sử dụng
  * Phần mềm dễ bị tấn công: không được hỗ trợ hoặc lỗi thời
  * Không sửa chữa, nâng cấp các nền tảng
  * Không bảo mật cấu hình của các thành phần
* Cách ngăn chặn
  * Loại bỏ các phụ thuộc không sử dụng, các tính năng, thành phần, tệp và tài liệu không cần thiết
  * Liên tục kiểm tra các phiên bản của cả thành phần phía máy khách và máy chủ
  * Chính lấy các thành phần từ nguồn chính thức qua các liên kết an toàn
* Ví dụ: Các thành phần thường chạy với các đặc quyền giống như chính ứng dụng đó, vì vậy sai sót trong bất kỳ thành phần nào có thể dẫn đến tác động nghiêm trọng. Những sai sót như vậy có thể là ngẫu nhiên hoặc cố ý

**7. Identification and Authentication Failures (Nhận dạng và xác thực bị hỏng) - Broken Authentication**
* Việc xác nhận danh tính, xác thực và quản lí phiên người dùng rất quan trọng trong công cuộc bảo vệ khỏi các cuộc tấn công liên quan đến xác thực. Những lỗi xác thực thường gặp phải
  * Không có biện pháp ngăn chặn các cuộc tấn công brute force
  * Cho phép đặt các mật khẩu yếu như "password"
  * Xác thực đa yếu tố bị thiếu hoặc không hiệu quả
  * Sử dụng các quy trình khôi phục thông tin như "quên mật khẩu" một cách không an toàn
  * Hiển thị mã định danh phiên trong URL, sử dụng lại mã định danh sau khi đăng nhập
* Cách ngăn chặn
  * Sử dụng xác thực đa yếu tố một cách an toàn
  * Giới hạn số lần xác thực nhất định
  * Thực hiện kiểm tra mật khẩu yếu và yêu cầu mật khẩu có độ phức tạp nhất định
  * Đảm bảo các đường dẫn khôi phục thông tin xác thực và API được tăng cường chống lại các cuộc tấn công
  * Sử dụng trình quản lí phiên tích hợp an toàn, tạo ID ngẫu nhiên mới với độ phức tạp cao
* Ví dụ: Bạn đặt mật khẩu quá dễ đoán hay là ứng dụng không giới hạn số lần đăng nhập và kẻ tấn công thực hiện cuộc tấn công từ điển

**8. Software and Data Integrity Failures (Lỗi toàn vẹn dữ liệu và phần mềm) - Insecure Deserialization**
* Các lỗi về tính toàn vẹn của phần mềm và dữ liệu liên quan đến code và cơ sở hạ tầng không bảo vệ khỏi các vi phạm tính toàn vẹn
  * Ứng dụng dựa vào các plugin, thư viện hoặc mô-đun không đáng tin cậy, không an toàn. Dẫn đến truy cập trái phép, thực thi các mã độc hại hoặc xâm nhập hệ thống
  * Tự động cập nhật các bản cập nhật mà không xác minh tính toàn vẹn đầy đủ và được áp dụng cho phiên bản trước đó
* Cách ngăn chặn
  * Sử dụng chữ kí số để xác minh phần mềm
  * Đảm bảo các thư viện và phần phụ thuộc
  * Có công cụ bảo mật để kiểm tra độ an toàn phần mềm
  * Đảm bảo những dữ liệu chưa được kí hoặc chưa được mã hóa không gửi đến các máy khách không đáng tin cậy
* Ví dụ: Cập nhật mà không cần kí, người dùng sẽ vô tình tải về những bản cập nhật chứa mã độc mà kẻ tấn công cố tình phát tán trên mạng để đánh cắp thông tin hay khai thác dữ liệu trong máy nạn nhân

**9. Security Logging and Monitoring Failures (Các lỗi theo dõi và ghi nhật kí bảo mật)**
* Ghi nhật kí bảo mật nhằm giúp phát hiện, báo cáo và phản hồi các vi phạm nhằm kịp thời ngăn chặn các cuộc tấn công nguy hiểm. Ghi nhật kí giám sát và phản hồi không đầy đủ có thể xảy ra bất cứ lúc nào
  * Các sự kiện quan trọng như đăng nhập không thành công hay những thao tác có tác động lớn không được ghi lại
  * Các cảnh báo lỗi không thông báo, không đầy đủ hoặc không rõ ràng
  * Nhật kí các hoạt động API không được giám sát
  * Ứng dụng không thể hoặc phản hồi quá chậm các phát hiện, báo cáo hoặc cảnh báo về các cuộc tấn công đang hoạt động trong thời gian thực
* Cách ngăn chặn
  * Đảm bảo các lỗi đăng nhập, kiểm soát truy cập và xác thực đầu vào phía máy chủ được ghi lại đủ để xác định các tài khoản đáng ngờ
  * Đảm bảo nhật kí được mã hóa chính xác tránh việc tiêm hoặc tấn công vào hệ thống ghi nhật kí hoặc giám sát
  * Đảm bảo các hành động tác động lớn được kiểm tra với các biện pháp kiểm soát tính toàn vẹn để ngăn chặn việc giả mạo hoặc xóa, chẳng hạn như bảng cơ sở dữ liệu chỉ được thêm vào
  * Các nhóm DevSecOps nên thiết lập giám sát và cảnh báo hiệu quả để các hoạt động đáng ngờ được phát hiện và phản hồi nhanh chóng
* Ví dụ: Một hãng hàng không lớn của Ấn Độ đã bị vi phạm dữ liệu liên quan đến dữ liệu cá nhân của hàng triệu hành khách trong hơn mười năm, bao gồm cả dữ liệu hộ chiếu và thẻ tín dụng. Vi phạm dữ liệu xảy ra tại một nhà cung cấp dịch vụ lưu trữ đám mây bên thứ ba, người này đã thông báo cho hãng hàng không về vi phạm sau một thời gian

**10. Server-side Request Forgecy (SSRF- Giả mạo yêu cầu phía máy chủ)**
* SSRF xảy ra bất cứ khi nào khi ứng dụng web đang tìm nạp tài nguyên từ xa mà không xác thực URL do người dùng cung cấp. Nó cho phép kẻ tấn công ép ứng dụng gửi một yêu cầu đến một điểm đích không mong muốn, ngay cả khi được bảo vệ bởi tường lửa
* Cách ngăn chặn
  * Lớp mạng
    * Phân đoạn chức năng truy cập tài nguyên từ xa trong các mạng riêng biệt để giảm tác động của SSRF
    * Thực thi các chính sách tường lửa “từ chối theo mặc định” hoặc các quy tắc kiểm soát truy cập mạng để chặn tất cả trừ lưu lượng mạng nội bộ thiết yếu
  * Lớp ứng dụng
    * Làm sạch và xác thực tất cả dữ liệu đầu vào do người dùng cung cấp
    * Thực thi lược đồ URL, cổng là điểm đến với danh sách cho phép xác thực
    * Tắt chuyển hướng HTTP
* Ví dụ: Những kẻ tấn công có thể truy cập các tệp cục bộ chẳng hạn như hoặc các dịch vụ nội bộ để lấy thông tin nhạy cảm như 
`file:///etc/passwd` và `http://localhost:28017/admin`

> Tham khảo thêm [tại đây](https://owasp.org/www-project-top-ten/)