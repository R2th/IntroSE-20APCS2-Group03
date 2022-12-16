**A. BẢO MẬT WEBSITE**

Khi công nghệ ngày càng phát triển chúng ta sẽ gặp nhiều thông tin  cũng như thực tế các Website bị hack thường dùng code bị nhiễm mã độc (malware). Lỗ hổng bảo mật trên code sẽ giúp Hacker thực hiện các phương pháp tấn công để chèn malware vào website. Để tìm hiểu kĩ hơn hãy cùng bắt đầu bằng các câu hỏi

*1. Hack Website là gì?*
 
Hack là hành động thâm nhập trái phép vào phần cứng hoặc phần mềm.
Hack Website là xâm nhập trái phép vào Website, truy cập vào các khu vực mà người dùng bình thường không được phép như hosting, trang quản trị, soạn thảo…
Hack website cũng bao gồm hành động can thiệp vào mã nguồn, database và chỉnh sửa nội dung và thay đổi các tính năng của Website trái phép.

*2. Mục đích Hack Website là gì?*

Vào những năm đầu của kỷ nguyên Web, thì các tay hacker tấn công khai thác các lỗ hổng bảo mật trên Website mục đích chỉ để thể hiện số má – hoặc phá hoại, có thể để cảnh báo các lỗ hổng bảo mật mà quản trị web không biết. Các lỗ hổng bảo mật trên Website – dù dùng mã nguồn gì thì cũng luôn luôn tồn tại.
Đôi khi, các lỗ hổng bảo mật bắt nguồn từ các lỗi cực kỳ sơ đẳng, ví dụ như lưu thông tin đăng nhập trên máy tính, điện thoại rồi mang ra tiệm sửa, … hoặc lỗ hổng do code cẩu thả gây ra…

So với thời kỳ đầu, thì mục đích của Hack Website hiện nay 99% là vì tiền, như ăn cắp dữ liệu để bán lại, ăn cắp thông tin thẻ tín dụng/ ghi nợ để rút tiền, hack mướn cho các đối thủ cạnh tranh không lành mạnh, phát tán nội dung cho các thế lực xấu….

*3. Các phương thức hack Website phổ biến nhất*

Có 2 kiểu tấn công là:

- **Access Control:** tìm cách truy cập trái phép vào tài khoản quản trị hosting/vps hay website bằng cách dò thông tin đăng nhập. Tiêu biểu là cách tấn công website nổi tiếng Brute Force Attack.
Software Vulnerabilities – Code Injection: khai thác lỗ hổng bảo mật trên phần mềm, code để tấn công vào website, cài các phần mềm độc hại (malware) để thực hiện các tác vụ xấu. Tiêu biểu loại này là SQL Injection (SQLi), tấn công XSS, LFI (Local File Inclusion) và RFI (Remote File Inclusion).
- **Software Vulnerabilities - Code Injection**: khai thác lỗ hổng bảo mật trên phần mềm, code để tấn công vào website, cài các phần mềm độc hại (malware) để thực hiện các tác vụ xấu. Tiêu biểu loại này là SQL Injection (SQLi), tấn công XSS, LFI (Local File Inclusion) và RFI (Remote File Inclusion).
 
 Dù là kiểu tấn công nào, thì cuối cùng, kết quả thường là Website của bạn sẽ bị chèn mã độc, để hacker có thể để lại một backdoor cho phép họ thâm nhập sau này, hoặc mã độc âm thầm thực hiện các tác vụ gây hại trên website.
 
 Vậy để kiểm thử phần mềm một cách hiệu quả thì chắc hẳn các bạn cũng đã tự thêm vào checklist của mình các case bảo mật cần thiết cho hệ thống đặc biệt là đổi với  kiểm thử website. Trước hết thì bắt đầu một câu chuyện luôn là định nghĩa vấn đề.

**B. NHỮNG CÁCH ĐỂ KIỂM THỬ WEBSITE HIỆU QUẢ**

 Kiểm thử website là tên gọi được đặt cho một quá trình kiểm thử phần mềm tập trung vào việc kiểm tra các ứng dụng web. Ứng dụng web cần được kiểm tra hoàn toàn trước khi đi vào hoạt động, điều này có thể giúp giải quyết các vấn đề trong ứng dụng web trước khi tiếp xúc với người dùng như các vấn đề về chức năng, bảo mật, các vấn đề dịch vụ web, các vấn đề tích hợp và khả năng xử lý lưu lượng truy cập, trong quá trình kiểm thử website, cần cố gắng phát hiện ra lỗi có thể xảy ra trong hệ thống nhằm giải quyết kịp thời. 
 
*Phần tiếp theo sẽ tập trung vào Kiểm thử bảo mật website*
 
 Được thực hiện để đảm bảo rằng có bất kỳ rò rỉ thông tin nào về mã hoá dữ liệu hay không. Trong website thương mại điện tử, kiểm thử bảo mật đóng một vai trò rất quan trọng, nếu thông tin an toàn thì kiểm tra xem làm thế nào để lưu trữ các thông tin nhạy cảm như thẻ tín dụng, thanh toán hóa đơn…Các hoạt động kiểm tra sẽ bao gồm:

- Kiểm tra các thư mục web hoặc tập tin web có thể truy cập được trừ khi không được cấu hình để tải xuống.
- Kiểm tra CAPTCHA đã được thêm vào và hoạt động bình thường cho đăng nhập để tự động ngăn chặn các đăng nhập hay chưa.
- Kiểm tra việc cố truy cập thông tin bằng cách thay đổi tham số trong chuỗi truy vấn. Ví dụ: nếu bạn đang chỉnh sửa thông tin và trên URL bạn thấy UserID = nickname, hãy thử thay đổi các giá trị tham số này và kiểm tra xem ứng dụng có cung cấp thông tin người dùng khác không, nên từ chối hiển thị cho trường hợp này để ngăn chặn việc xem thông tin người dùng khác.
- Kiểm tra session hết hạn sau thời gian được xác định nếu người dùng không thao tác trên website.
- Kiểm tra username/password không hợp lệ.
 - Kiểm tra truy cập trái phép vào các trang an toàn, nếu người dùng thay đổi từ “https” sang “http” thì thông báo thích hợp sẽ được hiển thị và ngược lại.
- Kiểm tra việc truy cập các trang internal, nếu đăng nhập được yêu cầu thì người dùng nên được chuyển hướng đến trang đăng nhập hoặc thông báo thích hợp sẽ được hiển thị.
- Các thông tin liên quan đến giao dịch, thông báo lỗi, cố gắng đăng nhập nên được ghi vào file log.
- Kiểm tra các tệp tin có bị hạn chế tải xuống hay không.

Trên đây là một vài chia sẻ nhỏ cảm ơn mọi người đã theo dõi.