**I. Giới thiệu về Kiểm tra bảo mật ứng dụng web:**

Do có lượng dữ liệu khổng lồ được lưu trữ trong các ứng dụng web và số lượng giao dịch ngày càng tăng một cách chóng mặt thì việc kiểm tra bảo mật cho các ứng dụng web đang ngày càng trở nên rất quan trọng .

Trong bài viết này, chúng tôi sẽ tìm hiểu chi tiết về các thuật ngữ chính được sử dụng trong Kiểm tra bảo mật trang web và phương pháp tiếp cận kiểm thử.

Trước tiên hãy tìm hiểu xem Kiểm tra bảo mật là gì?
Kiểm tra bảo mật là quá trình kiểm tra xem dữ liệu mật có được bảo vệ hay không (nghĩa là nó không được mở ra với các cá nhân / tổ chức không sở hữu) và người dùng chỉ có thể thực hiện những nhiệm vụ mà họ được phép thực hiện (Ví dụ người dùng sẽ không thể thay đổi chức năng của ứng dụng web theo cách không có chủ ý, v.v.).
![](https://images.viblo.asia/75d14dc0-3d99-4a6d-9f7e-65ce9cec7229.jpg)

**II. Kiểm tra bảo mật các ứng dụng web**

Một số thuật ngữ chính được sử dụng trong kiểm tra bảo mật

Trước khi chúng ta tìm hiểu sâu hơn, thì nên làm quen với một số thuật ngữ thường được sử dụng trong ứng dụng web Kiểm tra bảo mật:

*1. Vulnerability là gì?*

Đây là điểm yếu trong ứng dụng web. Nguyên nhân của sự yếu kém có thể là do gặp nhiều bugs trong ứng dụng, (mã độc SQL / script) hoặc sự hiện diện của virus.

*2. Manipulation URL là gì?*

Một số ứng dụng web giao tiếp thông tin giữa máy khách (trình duyệt) và máy chủ trong URL. Thay đổi một số thông tin trong URL đôi khi có thể dẫn đến hành vi ngoài ý muốn của máy chủ và điều này được gọi là Thao tác URL.

*3. SQL injection là gì?*

Đây là quá trình chèn các câu lệnh SQL thông qua giao diện người dùng ứng dụng web vào một số truy vấn sau đó được máy chủ thực thi.

*4. XSS (Cross Site Scripting) là gì?*

Khi người dùng chèn tập lệnh HTML / phía máy khách trong giao diện người dùng của ứng dụng web, phần chèn này sẽ hiển thị cho người dùng khác và nó được gọi là XSS.

*5. Spoofing là gì?*

Đó là việc tạo ra các trang web hoặc email tương tự để lừa bịp user được gọi là spoofing


**III. Các phương pháp kiểm tra an ninh**

Để thực hiện kiểm tra bảo mật hữu ích cho ứng dụng web, người kiểm tra bảo mật cần có kiến thức tốt về giao thức HTTP.

 Quan trọng là phải hiểu cách client (trình duyệt) và máy chủ (server) giao tiếp với nhau bằng HTTP như thế nào.

Ngoài ra, người kiểm tra còn nên biết những điều cơ bản về các lỗi SQL injection và XSS và cách phát hiện ra chúng.

Hy vọng, số lượng lỗi bảo mật có trong ứng dụng web sẽ không cao. Tuy nhiên, nếu testers có khả năng mô tả chính xác tất cả các lỗi bảo mật với tất cả các chi tiết cần thiết chắc chắn sẽ giúp ích cho đội phát triển rất nhiều.

Dưới đây là một số phương pháp để kiểm tra Bảo mật Web:

# 1. Bẻ khóa mật khẩu
![](https://images.viblo.asia/b6c8f566-c15c-478e-b3bc-d407dab760b2.jpg)
Việc kiểm tra bảo mật trên một ứng dụng web có thể được bắt đầu bằng cách bẻ khóa mật khẩu. Để đăng nhập vào các trang riêng tư (private) của ứng dụng, người ta có thể đoán tên người dùng / mật khẩu hoặc sử dụng một số công cụ bẻ khóa mật khẩu. Danh sách tên người dùng và mật khẩu phổ biến có sẵn cùng với các công cụ bẻ khóa mật khẩu nguồn mở. Nếu ứng dụng web không yêu cầu user cài đặt một mật khẩu phức tạp (ví dụ: với bảng chữ cái, số và ký tự đặc biệt hoặc với ít nhất một số ký tự được yêu cầu), có thể không mất nhiều thời gian để bẻ khóa tên người dùng và mật khẩu.

Nếu tên người dùng hoặc mật khẩu được lưu trữ trong cookie mà không cần mã hóa, kẻ tấn công có thể sử dụng các phương pháp khác nhau để đánh cắp cookie và thông tin được lưu trữ trong cookie như tên người dùng và mật khẩu.

# 2. Thao tác URL thông qua các phương thức HTTP GET
Người kiểm tra nên kiểm tra xem ứng dụng có chuyển thông tin quan trọng trong chuỗi truy vấn hay không. Điều này xảy ra khi ứng dụng sử dụng phương thức HTTP GET để truyền thông tin giữa máy khách và máy chủ. Thông tin được truyền qua các tham số trong chuỗi truy vấn. Người kiểm tra có thể sửa đổi một giá trị tham số trong chuỗi truy vấn để kiểm tra xem máy chủ có chấp nhận nó không.

Thông qua HTTP GET yêu cầu thông tin người dùng được chuyển đến máy chủ để xác thực hoặc nạp dữ liệu. Kẻ tấn công có thể thao tác mọi biến đầu vào được truyền từ yêu cầu GET này đến máy chủ để lấy thông tin cần thiết hoặc phá dữ liệu. Trong các điều kiện như vậy, bất kỳ hành vi bất thường nào của ứng dụng hoặc máy chủ web là cánh cửa để kẻ tấn công xâm nhập vào ứng dụng.

# 3.  SQL injection 
![](https://images.viblo.asia/cf4a7761-8be1-4e60-870a-e2729078a573.gif)
Yếu tố tiếp theo cần được kiểm tra là SQLinjection. Việc nhập một dấu  (‘) vào bất kỳ textbox nào đều sẽ bị ứng dụng từ chối. Thay vào đó, nếu tester gặp lỗi cơ sở dữ liệu, điều đó có nghĩa là đầu vào của người dùng được chèn vào một số truy vấn sau đó được thực hiện bởi một ứng dụng. Trong trường hợp như vậy, ứng dụng dễ bị tấn công SQL injection.

Các cuộc tấn công SQL injection rất quan trọng vì kẻ tấn công có thể lấy thông tin mật từ cơ sở dữ liệu máy chủ. Để kiểm tra các điểm nhập SQL injection vào ứng dụng web của bạn, hãy tìm hiểu mã từ cơ sở mã của bạn nơi các truy vấn trực tiếp của MySQL được thực thi trên cơ sở dữ liệu bằng cách chấp nhận một số đầu vào của người dùng.

Nếu dữ liệu đầu vào của người dùng được tạo trong các truy vấn SQL để truy vấn cơ sở dữ liệu, kẻ tấn công có thể tiêm các câu lệnh SQL hoặc một phần của các câu lệnh SQL làm đầu vào của người dùng để trích xuất thông tin quan trọng từ cơ sở dữ liệu thậm chí kẻ tấn công còn đánh sập cả ứng dụng, từ lỗi truy vấn SQL được hiển thị trên trình duyệt, kẻ tấn công có thể lấy thông tin mà chúng đang tìm kiếm.

Các ký tự đặc biệt từ đầu vào của người dùng nên được xử lý / ẩn đi đúng cách trong các trường hợp như vậy.

# 4. Lỗi XSS
![](https://images.viblo.asia/8cff757e-0507-4f0f-be08-ba22285715f8.jpg)
Một người tester cũng nên kiểm tra ứng dụng web để tìm XSS (Tập lệnh chéo trang). Bất kỳ HTML nào, ví dụ: thẻ <HTML> hoặc bất kỳ script nào, ví dụ: thẻ  <SCRIPT> không được chấp nhận. Nếu đúng như vậy, thì ứng dụng có thể dễ bị tấn công bởi Cross Site Scripting.

Kẻ tấn công có thể sử dụng phương pháp này để thực thi các script hoặc URL độc hại trên trình duyệt của nạn nhân. Sử dụng , kẻ tấn công có thể sử dụng các tập lệnh như JavaScript để đánh cắp cookie của người dùng và thông tin được lưu trữ trong cookie.


Ví dụ với website sau: http://www.examplesite.com/index.php?userid=123&query=xyz

Kẻ tấn công có thể dễ dàng vượt qua một số đầu vào độc hại hoặc <script> dưới dạng tham số ‘&querry` truy vấn có thể hack được dữ liệu người dùng / máy chủ quan trọng trên trình duyệt.

Lưu ý quan trọng: Trong quá trình kiểm tra Bảo mật, người kiểm tra cần hết sức cẩn thận để không sửa đổi bất kỳ điều nào sau đây:

- Cấu hình của ứng dụng hoặc máy chủ
-  Dịch vụ chạy trên máy chủ
-  Dữ liệu người dùng hoặc khách hàng hiện có được lưu trữ bởi ứng dụng

Ngoài ra, cần tránh kiểm tra bảo mật trong hệ thống thật (chỉ nên kiểm tra bảo mật trước khi release cho người dùng).

Phần kết luận:
Mục đích của kiểm tra bảo mật là khám phá các lỗ hổng của ứng dụng web để các nhà phát triển có thể loại bỏ các lỗ hổng này khỏi ứng dụng của mình và làm cho ứng dụng web và dữ liệu an toàn khỏi mọi hành động tấn công.

Bài viết được tham khảo và dịch từ link: https://www.softwaretestinghelp.com/security-testing-of-web-applications/