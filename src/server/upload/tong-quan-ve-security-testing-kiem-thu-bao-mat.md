Kiểm thử bảo mật cho website là phương thức hiệu quả để đánh giá khả năng bảo mật của một website. Bài viết này sẽ giới thiệu các phương pháp kiểm thử bảo mật cho website để các bạn dễ hình dung hơn về nó.
# 1. Security (bảo mật) là gì?

Bảo mật  là một loạt các biện pháp để nhằm bảo vệ một ứng dụng chống lại các hành động không lường trước được, khiến cho ứng dụng ngừng hoạt động hoặc bị tốn công. 

# 2. Security Testing (Kiểm thử bảo mật) là gì?

- Kiểm thử bảo mật (Security Testing) là một trong những phần quan trọng trong phát triển phần mềm, nhằm đảm bảo các hệ thống và ứng dụng trong một tổ chức không có bất kỳ sơ hở nào có thể gây ra các tổn thất về an toàn bảo mật.

- Kiểm thử bảo mật  là tìm kiếm tất cả các lỗ hổng và điểm yếu trong hệ thống mà dẫn đến rò rỉ thông tin của tổ chức.

- Mục đích của Kiểm thử bảo mật là xác định các mối đe dọa và các lỗ hổng trong hệ thống và giúp xác định rằng dữ liệu và tài nguyên của nó được bảo vệ khỏi những kẻ xâm nhập có thể và giúp các nhóm phát triển phần mềm trong việc khắc phục các vấn đề này.

# 3.  Khu vực tập trung
Có bốn lĩnh vực trọng tâm chính được xem xét trong kiểm thử bảo mật (Đặc biệt đối với các trang web / ứng dụng):

- **Bảo mật mạng (Network security)**: liên quan đến việc tìm kiếm các lỗ hổng trong cơ sở hạ tầng mạng (tài nguyên và chính sách).
- **Bảo mật phần mềm hệ thống  (System software security)**: liên quan đến việc đánh giá các điểm yếu trong các phần mềm khác nhau (hệ điều hành, hệ thống cơ sở dữ liệu và phần mềm khác) mà ứng dụng phụ thuộc vào.
- **Bảo mật ứng dụng phía máy khách (Client-side application security)**: liên quan đến việc đảm bảo rằng máy khách (trình duyệt hoặc bất kỳ công cụ nào như vậy) không thể bị thao túng.
- **Bảo mật ứng dụng phía máy chủ (Server-side application security)**: liên quan đến việc đảm bảo rằng mã máy chủ và các công nghệ của nó đủ mạnh để chống lại mọi sự xâm nhập.


# 4. Các hình thức Kiểm thử bảo mật

Theo ISECOM (Open Source Security Testing) có 7 hình thức Kiểm thử bảo mật:

- **Rà soát các lỗ hổng tiềm ẩn – Vulnerable Scanning**: thực hiện thông qua các phần mềm để tự động scan một hệ thống nhằm phát hiện ra các lỗ hổng dựa trên các signatures đã biết.
- **Rà soát các điểm yếu của hệ thống – Security Scanning**: bao gồm việc xác định các điểm yếu của mạng và hệ thống, cung cấp các giải pháp nhằm giảm thiểu các rủi ro này. Có thể thực hiện bằng thủ công hoặc tự động.
- **Đánh giá bảo mật bằng cách tấn công vào hệ thống – Penetration testing**: là loại kiểm thử mô phỏng cuộc tấn công từ phía một hacker thiếu thiện ý. Kiểm thử bao gồm việc phân tích một hệ thống cụ thể, tìm ra các lỗ hổng tiềm ẩn bằng cách tấn công từ bên ngoài.
- **Đánh giá rủi ro – Risk Assessment** : liên quan đến phân tích các rủi ro bảo mật nhận thấy được. Các rủi ro được phân loại là Low, Medium, High. Loại kiểm thử này đưa ra các khuyến nghị nhằm giảm thiểu các rủi ro.
- **Kiểm toán an ninh – Security Auditing**: Kiểm tra bảo mật nội bộ ứng dụng và OS.
- **Tấn công vào hệ thống tìm các điểm yếu bảo mật – Ethical hacking**: Các hacker thiện ý thực hiện phương pháp tương tự như những kẻ tấn công “thiếu thiện ý”, với mục tiêu tìm kiếm các điểm yếu bảo mật và xác định cách thức để thâm nhập vào mục tiêu, nhằm đánh giá mức độ thiệt hại do các lổ hỗng này gây ra, từ đó đưa ra cảnh báo cùng những phương án gia cố, kiện toàn bảo mật thích hợp.
- **Posture assessment**: Kết hợp Security Scanning, Ethical hacking và Risk Assessment đánh giá bảo mật tổng thể một tổ chức.

# 5. Ví dụ
Đây là ví dụ về kiểm tra bảo mật rất cơ bản mà bất kỳ ai cũng có thể thực hiện trên trang web / ứng dụng:
- Đăng nhập vào ứng dụng web.
- Đăng xuất khỏi ứng dụng web.
- Mật khẩu cần phải ở dạng mã hóa.
- Ứng dụng hoặc hệ thống cần phải kiểm soát người dùng, không cho phép các người dùng không hợp lệ.
- Kiểm tra cookies và session time.
- Với các website tài chính, nút  back của trình duyệt không nên hoạt động.
- Nhấp vào nút BACK của trình duyệt (Kiểm tra xem có được yêu cầu đăng nhập lại không hoặc nếu được cung cấp ứng dụng đăng nhập.)

=> Đa phần các loại kiểm tra bảo mật liên quan đến các bước phức tạp và suy nghĩ vượt trội, nhưng đôi khi, đó là các thử nghiệm đơn giản giống như các thử nghiệm ở trên giúp phơi bày các rủi ro bảo mật nghiêm trọng nhất.
# 6. Phương pháp Kiểm thử bảo mật

- Tiger Box: được thực hiện trên một laptop, trong đó có cài đặt một tập các các hệ điều hành và các công cụ hack. Phương pháp này giúp các nhân viên kiểm thử penetration testers và security testers tiến hành đánh giá các lỗ hổng và các cuộc tấn công để phát hiện và ngăn chặn kịp thời.
 VD: Nikto, AppScan, WebScarab,  Wa3f, Acunetix, CyStack Scanning ...
- Black Box:  là việc kiểm tra khả năng bảo mật của ứng dụng từ bên ngoài. Quan sát các dữ liệu được gửi đến ứng dụng và các dữ liệu từ ứng dụng xuất ra mà không cần hiểu đến hoạt động bên trong của nó. Quá trình xử lý dữ liệu từ bên ngoài đến ứng dụng có thể thực hiện bằng thủ công hoặc sử dụng công cụ tự động gửi đến ứng dụng.

- White box: là quá trình kiểm tra trực tiếp mã nguồn của ứng dụng web để tìm ra các lỗi bảo mật. Quá trình quan sát và kiểm tra mã nguồn có thể thực hiện thủ công hoặc thực hiện bằng công cụ. 
Quá trình thực hiện bằng công cụ tức là quá trình mà công cụ sẽ thực hiện quét toàn bộ mã nguồn của ứng dụng và dựa trên tập nhận biết các hàm, các chỉ dẫn có khả năng gây ra lỗi bởi ngôn ngữ lập trình phát triển ứng dụng web.

# 7. Xây dựng niềm tin
Có rất nhiều cách để phá vỡ một ứng dụng và kiểm tra bảo mật, không phải là biện pháp duy nhất về mức độ an toàn của một ứng dụng. Nhưng, rất khuyến khích rằng kiểm thử bảo mật được đưa vào như một phần của quy trình phát triển phần mềm tiêu chuẩn. Thế giới đang tràn ngập tin tặc và mọi người đều mong muốn có thể tin tưởng vào hệ thống / phần mềm mà một người sản xuất hoặc sử dụng.
# 8. Kết luận
Kiểm thử bảo mật là loại kiểm thử quan trọng nhất đối với một ứng dụng và giúp xác định liệu các dữ liệu quan trọng có được đảm bảo mật hay không.
Với loại kiểm thử này, tester đóng vai trò kẻ tấn công hệ thống để tìm ra các lỗ hổng bảo mật.
# Tham khảo
http://softwaretestingfundamentals.com/security-testing/