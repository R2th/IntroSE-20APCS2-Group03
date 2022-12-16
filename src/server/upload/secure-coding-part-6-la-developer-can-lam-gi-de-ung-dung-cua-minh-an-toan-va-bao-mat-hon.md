Bài thứ 6 chuỗi series [hướng dẫn lập trình an toàn cho lập trình viên](https://viblo.asia/s/secure-coding-for-developers-dbZN76EalYM), bài viết tiếp theo trong: Secure coding for developers sẽ tiếp tục với nội dung Database Security và File Management. Quản trị tốt cơ sở dữ liệu cũng như hệ thống lưu trữ file là vấn đề quan trọng và cần ưu tiên hàng đầu trong các vấn đề bảo mật website. Đây thường là nơi chứa các thông tin nhạy cảm, thông tin quan trọng của người dùng mà chúng ta cần bảo vệ.

# Secure Coding Practices Checklist
## Database Security
Cơ sở dữ liệu lưu trữ những thông tin quan trọng của người dùng và là dữ liệu cần được bảo vệ hàng đầu của mỗi hệ thống website. Nếu để lộ lọt hoặc sửa đổi trái phép các thông tin này thì không chỉ ảnh hưởng nghiêm trọng về mặt nghiệp vụ khách hàng mà còn thiệt hại về tài chính, uy tín cũng như tài sản của chủ quản website. Việc ngăn chặn các lỗi liên quan đến Input validation là một trong những biện pháp quan trọng để hạn chế vấn đề này. Bên cạnh đó, các yếu tố khác liên quan đến thiết lập và khai thác sử dụng cơ sở dữ liệu cũng quan trọng không kém. Các biện pháp giúp an toàn cơ sở dữ liệu sẽ được đề cập dưới đây:

![](https://images.viblo.asia/144d1432-2b8c-4828-9fef-6296a29580f9.jpg)


**1. Sử dụng tham số hóa câu lệnh truy vấn SQL (parameterized queries)**
- Giữ cho truy vấn và dữ liệu được tách biệt. Thay vì nối chuỗi trong truy vấn SQL, các tham số được truyền vào thông các biến. Việc này giúp chống lại lỗi SQL Injection khi người dùng truyền vào những dữ liệu độc hại.

**2. Thực hiện xác thực dữ liệu đầu vào và encoded dữ liệu đầu ra**
- Việc này giúp hạn chế các nguy cơ về SQL Injection thông qua việc xác định các ký tự meta characters. Nếu việc xác thực không thành công thì không thực hiện truyền vào và thực thi câu lệnh SQL.

**3. Đảm bảo tất cả các biến được kiểm tra trước khi thực hiện truyền vào câu truy vấn**

**4. Đảm bảo cơ sở dữ liệu chạy với đặc quyền tối thiểu, tuyệt đối không chạy với quyền root.**
- Cơ sở dữ liệu cần chạy với user với quyền thấp nhât, được phân quyền rõ ràng và chỉ có thể truy cập tới cơ sở dữ liệu nhất định. Việc này ngăn chặn việc tấn công leo quyền nếu web server bị SQLi hoặc khai thác dữ liệu của cơ sở dữ liệu khác.

**5. Thông tin truy cập cơ sở dữ liệu cần an toàn**
- Tài khoản/mật khẩu truy cập cơ sở dữ liệu cần đủ mạnh, không sử dụng các thông tin mặc định hoặc dễ đoán. Việc đặt thông tin tài khoản / mật khẩu mạnh giúp hạn chế nguy cơ tấn công bruteforce tài khoản truy cập cơ sở dữ liệu.

**6. Các chuỗi thông tin cơ sở dữ liệu không được hardcode trong mã nguồn ứng dụng.**
- Các chuỗi kết nối cơ sở dữ liệu cần được lưu trữ trong các file config riêng biệt trên một hệ thống tin cậy và cần được mã hóa àn toàn bằng các thuật toán mã hóa mạnh. 

**7. Sử dụng stored procedure cho các truy cập dữ liệu trừu tượng**
- Stored Procedure bao gồm các câu lệnh Transact-SQL và được lưu lại trong cơ sở dữ liệu. Các lập trình viên chỉ cần gọi ra và thực thi thông qua SQL hoặc ngay trong ứng dụng đang phát triển. Việc này hạn chế các tác vụ cấp cao mà người dùng bình thường không thể truy cập vào được.

**8. Thực hiện đóng cơ sở dữ liệu nếu không còn truy cập**
-  Cần thực hiện đóng cơ sở dữ liệu nếu không còn thực hiện truy cập dữ liệu từ cơ sở dữ liệu. Việc này hạn chế các truy cập trái phép tới cơ sở dữ liệu nếu người dùng vô tình không đóng kết nối cơ sở dữ liệu.

**9. Thực hiện loại bỏ hoặc thay đổi tất cả các thông tin truy cập mặc định vào cơ sở dữ liệu.**
- Các thông tin truy cập mặc định được chia sẻ trên internet rất nhiều và có thể bị lợi dụng để tấn công nếu cơ sở dữ liệu không xóa bỏ hoặc thay đổi thông tin đăng nhập các tài khoản mặc định. Khi thay đổi, cần sử dụng các mật khẩu mạnh. Thực hiện bật xác thực 2FA cho các tài khoản quan trọng

**10. Thực hiện tắt tất cả các hàm cơ sở dữ liệu không cần thiết**
- Ví dụ về các hàm không cần thiết: unnecessary stored procedures or services, utility
packages,) chỉ cài đặt những hàm cần thiết.

**11. Loại bỏ các cơ sở dữ liệu, dữ liệu của vendor (information schemma..)**
- Hạn chế việc thu thập thông tin tới cơ sở dữ liệu hoặc lợi dụng để tấn công vào cơ sở dữ liệu của website.

**12. Loại bỏ hoặc disabled tất cả các tìa khoản không hỗ trợ cho các yêu cầu về mặt bussiness.**
- Những tài khoản mặc định, tài khoản không sử dụng cho nhu cầu về yêu cầu hệ thống cần được loại bỏ khỏi hệ thống.

**13. Mỗi tài khoản kết nối tới cơ sở dữ liệu cần được phân quyền rõ ràng, riêng biệt theo đúng chức năng, nhiệm vụ và quyền hạn**
- Ví du cần tạo ra các tài khoản riền biệt như: user, read-only user, guest, administrators..

## File Management
Bên cạnh cơ sở dữ liệu thì file cũng là tài nguyên vô cùng quan trọng của một website: Nó có thể là các file ảnh, video, file văn bản... của người dùng upload lên. Các file này là dữ liệu của người dùng và cần được bảo vệ để tránh bị truy cập hay sửa đổi trái phép. Các khuyến nghị dưới đây sẽ giúp các lập trình viên có thể giải quyết phần nào vấn đề này:

![](https://images.viblo.asia/10e1778d-54fb-42d8-b4f1-ef968bbb71c9.png)


**1. Không truyền trực tiếp dữ liệu người dùng cung cấp vào bất kì hàm include động nào**.
- Include function là một cơ chế của php cho phép gọi tới 1 file khác vào file hiện tại. Nếu không được xử lý đúng, điều này có thể dẫn tới lỗi file inclusion. Các file này cần được hardcode hoặc white list các file được phép include tới.

**2. Yêu cầu xác thực trước khi cho người dùng có thể thực hiện upload**
- Việc xác thực người dùng giúp hạn chế việc upload trái phép các file độc hại cũng như phục vụ quá trình truy vết người dùng khi có tấn công xảy ra.

**3. Giới hạn các loại file (extension file) được phép upload lên server.**
-  Đối với các chức năng upload cần white list các file được upload phù hợp với yêu cầu về chức năng( Ví dụ: Chức năng upload avatar chỉ cho phép: `png` và `jpg`

**4. Giới hạn các loại file (header file) được phép upload lên server.**
-  Đối với các chức năng upload cần white list các file-header được upload phù hợp với yêu cầu về chức năng( Ví dụ: Chức năng upload avatar chỉ cho phép `Content-type` là: `image/jpeg` và `image/png`

**5. Không lưu trữ file cùng với server chạy dịch vụ web**
- Thực hiện lưu trữ file ở một server riêng biệt hoặc sử dụng dịch vụ lưu trữ file của bên thứ 3: Amazon web service: s3

**6. Ngăn chặn việc upload và thực thi các file trên server**
- Chúng ta nên thực hiện tắt quyền thực thi đối với thư mục lưu trữ file để tránh việc lợi dụng tấn công các lỗi remote code excution. Đồng thời  phân quyền tối thiểu đối với server lưu trữ file

**7. Thực hiện truy cập file một cách an toàn**
-  Khi thực hiện truy cập tới các file tồn tại trên server, sử dụng white list các tên và loại được phép. Kiểm tra các tham số được tuyền vào để loại bỏ các ký tự đặc biệt, ký tự nguy hiểm không có trong tên file (`../ , .. , /, %2f )` để tránh các lỗi directory travesal. Hoặc thực hiện hardcode tên file và đường dẫn truy cập tới file, không nhận tham số từ người dùng.

**8. Không thực hiện truyền dữ liệu người dùng vào các dynamic redirect.**
- Khi thực hiện redirect cần hard code giá trị URL được phép hoặc white list các url được phép redirect tới. Việc này ngăn chặn kẻ tấn công điều hướng người dùng tới các website độc hại.

**9. Không thực hiện truyền các thư mục hay đường dẫn file để truy cập file**
- Thay vào đó sử dụng các hàm để hash đường dẫn thành một chuỗi cố định, tránh người dùng đoán được thư mục hoặc đường dẫn tuyệt đối của file.

**10. Không trả về đường dẫn tuyệt đối của file tới người dùng**
- Không trả về đường dẫn tuyệt đối (Ví dụ: /var/www/html/uploads/filename.jpg) vì kẻ tấn công có thể biết được đường dẫn tuyệt đối của website từ đó thực hiện tấn công các lỗ hổng khác. Chỉ trả về tên file hoặc đường dẫn thư mục chứa file (/uploads/filename.jpg

**11. Phân quyền thư mục lưu trữ file an toàn**
- Nên thực hiện phân quyền thư mục file là : `read-only` để tránh những sửa đổi trái phép từ kẻ tấn công

**12. Sử dụng trình quét virus để kiểm tra file người dùng upload**
- Việc này giúp loại bỏ các file độc hại, virus mà người dùng upload lên.

# Tổng kết
Một lần nữa nhân mạnh lại: cơ sở dữ liệu và file là những tài nguyên quan trọng của website vì vậy việc đảm bảo an toàn cho hệ thống cơ sở dữ liệu và file là vô cùng quan trọng. Thực hiện tốt các biện pháp trên giúp đảm bảo an toàn cho hệ thống website cũng như an toàn cho tài nguyên quan trọng là dữ liệu người dùng. Cảm ơn các bạn đã theo dõi và đừng quên xem thêm các phần trước của mình trong chuỗi series này nhé: [Secure coding for developers](https://viblo.asia/s/secure-coding-for-developers-dbZN76EalYM)