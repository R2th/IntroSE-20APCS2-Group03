# Tổng quan về vấn đề bảo mật
Trở lại với chuỗi bài viết về hướng dẫn lập trình an toàn cho lập trình viên, bài viết thứ tư trong series's post: [Secure coding for developers](https://viblo.asia/s/secure-coding-for-developers-dbZN76EalYM) sẽ tiếp tục với nội dung về các vấn đề liên quan đến các vấn đề: Error handling and Logging, Data protection. Việc xử lý lỗi hệ thống, lỗi ứng dụng hay lưu log ứng dụng là vấn đề cần được quan tâm vì nếu không được xử lý đúng cách ứng dụng sẽ lộ ra những thông tin nhạy cảm tạo điều kiện để kẻ tấn công thu thập thông tin và tấn công hệ thống. Vấn đề tiếp theo là việc bảo vệ dữ liệu (thông tin tối quan trọng của ứng dụng), nếu việc bảo dữ liệu không tốt sẽ gây ra những hậu quả nặng nề thậm chí ảnh hưởng đến tiền bạc và cả hoạt động của công ty.

# Secure Coding Practices Checklist
## Error Handling and Logging
Các yêu cầu trong việc thực hiện xử lý lỗi của ứng dụng, quản lý việc thông báo lỗi của ứng dụng tránh việc ứng dụng bắn lỗi gây ra việc lộ các thông tin nhạy cảm của ứng dụng. Việc lưu trữ log cũng cần thực hiện đúng yêu cầu, lưu đủ thông tin và tránh lưu các thông tin nhạy cảm của ứng dụng hoặc người dùng.
![](https://images.viblo.asia/04420e68-f97d-45c6-8dba-102dc4ef778e.png)


**1. Không để lộ thông tin nhạy cảm trong các phản hồi lỗi từ trang web, bao gồm chi tiết hệ thống, phiên bản của ứng dụng hoặc thông tin tài khoản**

- Khi trả về lỗi cần thiết laajpd dể ứng dụng chỉ trả về thoont in chung, không chứa các thông tin chi tiết của ứng dụng tránh việc hacker lợi dụng để thu thập thông tin từ đó tiến hành tấn công.

**2. Sử dụng các trình xử lý lỗi không hiển thị thông tin debug hoặc thông tin stack trace**
- Cần xử lý phần bắt lỗi không trả về thông tin debug hay thông tin của stack trong thông báo lỗi trả về.

**3. Thông báo lỗi chung và tiến hành chỉnh sửa các trang thôn báo lỗi mặc định**
- Cần trả về thông báo lỗi chung và tiến hành custom các trang thôn báo lỗi để trả về khi trang web gặp lỗi. Tránh sử dụng các trang thông báo lỗi mặc định của framework vì các trang thông báo này thường chứa nhiều thông tin liên quan đến ứng dụng và phiên bản.

**4. Xử lý bộ nhớ được cấp một cách thích hợp khi các lỗi về condition xảy ra xảy ra**
- Bộ nhớ được cấp phát cần được xử lý hoặc xóa đi khi có các lỗi về condition xảy ra tránh việc lộ lọt thông tin hệ thống ra bên ngoài

**5. Lỗi xử lý logic liên quan đến kiểm soát bảo mật nên từ chối quyền truy cập theo mặc định**
- Các xử lý lỗi liên quan đến bảo mật cần được bảo vệ và chỉ được cấp quyền truy cập cho đối tượng được cấp phép

**6. Tất cả các thông tin nhật ký phải được triển khai và xử lý trên một hệ thống đáng tin cậy (ví dụ: Máy chủ)**
- Hệ thống đáng tin cậy được kiểm soát và quản lý chặt chẽ giúp quản lý lỗi được an toàn hơn

**7. Các thông tin về xử lý lỗi cần ghi lại cả thông tin về các events thành công và thất bại**
- Việc này giúp đảm bảo tất cả các sự kiện được giám sát chặt chẽ và có thể tiến hành truy vết khi có vấn đề xảy ra

**8. Đảm bảo log chứa dữ liệu những event quan trọng**
- Log phải chứa thông tin: thời gian xảy ra sự kiện, mức độ nghiêm trọng cho từng sự kiện, tag cho từng event, thông tin tài khoản thực hiện event, source ip, dest ip, mô tả sự kiện...

**9. Đảm bảo đầuvào log chứa các dữ liệu chưa được validate sẽ không được thực thi như mã thực thi trên server.**
- Điều này tránh các lỗi liên quan đến thực thi lệnh tùy ý trên server thông qua việc chèn dữ liệu độc hại ở trường của http header request.

**10. Chỉ giới hạn quyền truy cập vào log cho các user được cấp quyền**
- Điều này tránh các truy cập trái phép tới server chứa thông tin log của những user không có quyền hay kẻ tấn công

**11. Sử dụng một quy trình tập trung cho tất cả các log**
- Giúp việc quản lý log được thực hiện một cách nhất quán và hiệu quả

**12. Không lưu trữ thông tin nhạy cảm trong log, bao gồm các chi tiết hệ thống không cần thiết, thông tin phiên bản phần mềm hoặc mật khẩu người dùng**
- Các thông tin nhạy cảm này không nên lưu trữ tránh trường hợp file log bị truy cập trái phép có thể dẫn tới lộ thông tin nhạy cảm

**13. Đảm bảo rằng có hệ thống phân tích lỗi**
- Lỗi được lưu lại cần có hệ thống xử lý và phân tích lỗi

**14. Log cần ghi lại tất cả các sự kiện quan trọng như sau**

- Ghi lại tất cả các lỗi xác thực đầu vào
- Ghi lại tất cả các lần xác thực, đặc biệt là các lần thất bại
- Ghi lại tất cả các lỗi kiểm soát truy cập
- Ghi lại tất cả các sự kiện giả mạo rõ ràng, bao gồm cả những thay đổi bất ngờ đối với dữ liệu trạng thái
- Ghi log toàn bộ sự kiện cố gắng đăng nhập nhiều lần (brute force) hoặc phiên làm việc hết hạn
- Ghi nhật ký tất cả các ngoại lệ của hệ thống
- Ghi nhật ký tất cả các chức năng quản trị, bao gồm cả các thay đổi đối với cài đặt cấu hình bảo mật
- Ghi lại tất cả các lỗi kết nối TLS phụ trợ
- Ghi lại lỗi mô-đun mật mã ghi nhật ký

**15. Sử dụng hàm băm để mã hóa giúp xác thực tính toàn vẹn của các file log**
- Sử dụng hàm băm MD5 để kiểm tra tính toàn vẹ của file log giúp tránh các truy cập sửa đổi trái phép


## Data protection
Việc bảo vệ thông tin nhạy cảm của hệ thống cũng như của người dùng khi thực hiện lưu trữ là vấn đề quan trọng trong việc giúp bảo vệ tính toàn vẹn dữ liệu của hệ thống thông tin. Đây là vấn đề sống còn của việc một ứng dụng có thực sự được bảo vệ an toàn.
![](https://images.viblo.asia/11219679-2bd8-464b-bd8e-c864a0a6da25.jpg)


**1. Thực hiện ít đặc quyền nhất, hạn chế người dùng đúng với chức năng, dữ liệu và thông tin của hệ thống yêu cầu theo chức năng nhất định**
- Thực hiện phân quyền tài khoản theo đúng chắc năng giúp hạn chế các truy cập trái phép hoặc nhầm lẫn gây thất thoát dữ liệu

**2. Bảo vệ tất cả các bản sao được lưu trong bộ nhớ cache hoặc tạm thời của dữ liệu nhạy cảm được lưu trữ trên máy chủ khỏi bị truy cập trái phép và xóa các tệp tin tạm khi không sử dụng.**
- Thông tin được lưu trữ trong cache hay bộ nhớ tạm cần được xử lý đúng tránh việc lộ lọt thông tin khi các dữ liệu này bị truy cập trái phép từ kẻ tấn công thông qua cac hình thức tấn công nhằm đọc dữ liệu trong bộ nhớ cache


**3. Mã hóa khi thực hiện lưu trữ thông tin nhạy cảm, như dữ liệu xác minh , xác thực trên phía server. Luôn sử dụng các thuật toán mã hóa chuẩn và đã được kiểm tra kỹ lưỡng**
- Thông tin lưu trữ được mã hóa giúp chống lại việc đọc dễ dàng các dữ liệu này nếu có sự cố về lộ lọt thông tin. Việc sử dụng thuật toán mã hóa cũng cần lưu ý sử dụng thuật toán mã hóa mạnh, tránh việc sử dụng các thuật toán mã hóa tự viết.

**4. Bảo vệ mã nguồn phía máy chủ không bị người dùng tải xuống**
- Thực hiện bảo vệ mã nguồn bằng việc phân quyền thư mục mã nguồn, tắt directory listing, không để lộ source code và đường dẫn lưu trữ source code.

**5. Không lưu trữ mật khẩu, connecttion string hoặc thông tin nhạy cảm khác dưới dạng bản rõ (clear text) hoặc theo bất kỳ cách mã hóa không an toàn nào ở phía máy khách.**
- Điều này bao gồm việc nhúng vào các định dạng không an toàn như: MS viewstate, Adobe flash hoặc mã biên dịch

**6. Xóa tất cả các comments không cần thiết trong mã nguồn**
- Các đoạn comments có thể chứa thông tin truy cập của người dùng hay database hoặc có thể tiết lộ các thông tin nhạy cảm khác của hệ thống

**7. Xóa ứng dụng và tài liệu hệ thống không cần thiết khi không có nhu cầu sử dụng.**
- Điều này có thể giúp hạn chế tiết lộ thông tin hữu ích cho những kẻ tấn công có thể thu thập thông tin cũng như tránh việc tấn công vào những hệ thống được bảo vệ kém do chúng ta không sử dụng nên ít quan tâm tới.

**8. Không gửi thông tin nhạy cảm trong các tham số yêu cầu HTTP GET**
- Thông tin nhạy cảm bao gồm: username, password, token, session_id, key... Vì các thông tin này có thể bị ghi lại dễ dàng trong file log dẫn đến lộ lọt các thông tin nhạy cảm

**9. Tắt các tính năng tự động hoàn thành username và password trên trình duyệt**
- Khuyến cáo này giúp hạn chế nguy cơ về lộ lọt thông tin liên quan đến người dùng khi người dùng lưu trữ thông tin đăng nhập trên trình duyệt.

**10. Tắt bộ nhớ đệm phía máy khách trên các trang chứa thông tin nhạy cảm.**
- Khuyến nghị thiết lập: Cache-Control: no-store trong HTTP header

**11. Ứng dụng nên hỗ trợ loại bỏ dữ liệu nhạy cảm khi dữ liệu đó không còn được yêu cầu.**
- Ví dụ nếu thông tin về tài chính, thông tin cá nhân trên các website cần được loại bỏ nếu sau một thời gian người dùng không tương tác trên hệ thống (> 1 năm)

**12. Thực hiện các kiểm soát truy cập thích hợp cho dữ liệu nhạy cảm được lưu trữ trên máy chủ.**
- Điều này bao gồm dữ liệu, tệp tạm thời và dữ liệu mà chỉ người dùng hệ thống cụ thể mới có thể truy cập được.
# Tổng kết
Phần 4 trong series này giúp cac lập trình viên bảo vệ các thông tin của người dùng và thông tin của hệ thống tránh việc lộ lọt thông tin nhạy cảm qua các thông tin debug hoặc thông tin debug của hệ thống. Khuyến nghị giúp bảo vệ dữ liệu người dùng khỏi các cuộc tấn công truy cập trái phép và hạn chế rủi ro nếu có sự cố về lộ lọt thông tin.
Mình mong bài viết giúp ích cho những lập trình viên có cái nhìn đúng đắn về việc bảo vệ dữ liệu hệ thống và dữ liệu người dùng.

Cảm ơn các bạn đã theo dõi!!!