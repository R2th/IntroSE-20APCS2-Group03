**Giới thiệu về SQL Injection**

**SQL Injection** là một kỹ thuật cho phép kẻ tấn công (attacker) lợi dụng lỗ hổng của việc kiểm tra dữ liệu đầu vào trong các ứng dụng web (Web Application) và các thông báo lỗi (Error Message) của hệ quản trị cơ sở dữ liệu trả về để inject (tiêm vào) và thi hành các câu lệnh truy vấn SQL bất hợp pháp. SQL Injection có thể cho phép kẻ tấn công thực hiện các thao tác: xóa (delete), thêm (insert), sửa (update) ... trên cơ sở dữ liệu của ứng dụng, thậm chí là trên server của ứng dụng đang chạy.

* SQL Injection được biết đến như là vật trung gian tấn công trên các ứng dụng web có dữ liệu được quản lý bằng các hệ quản trị cơ sở dữ liệu như: SQL Server, Oracle, MySQL, DB2, Sysbase ...
* SQL Injection là một kỹ thuật tấn công ứng dụng web phổ biến, đặc biệt với các ứng dụng PHP (4) và ASP (5) do sự phổ biến của các ứng dụng web loại này .

-- Hậu quả: Khi một ứng dụng web bị tấn công SQL Injection, hậu quả để lại là vô cùng lớn:
* Đọc được dữ liệu không được phép truy nhập trong CSDL: Kẻ tấn công có thể đọc được những dữ liệu quan trọng trong cơ sở dữ liệu như thông tin về tài khoản user (bao gồm cả email, password, thông tin về thẻ ngân hàng ,... ); các thông tin về tài khoản người quản trị admin, thông tin về server, ...
* Sửa đổi trái phép: Trong kỹ thuật tấn công SQL Injection, thông qua việc chèn các câu lệnh như insert, update, delete, ... vào các câu lệnh truy vấn cơ sở dữ liệu, kẻ tấn công có thể thực hiện việc thêm, sửa, xóa các trường trong cơ sở dữ liệu một cách tùy ý mà không cần bất cứ một quyền nào cả.

Ngoài ra , kẻ tấn công có thể lợi dụng để đăng nhập với quyền admin để thực hiện việc sửa
đổi cơ sở dữ liệu một cách hợp pháp.
* Thực hiện mã tấn công từ xa: Ngoài việc chèn vào các câu lệnh truy vấn vào cơ sở dữ liệu, kẻ tấn công có thể chèn vào các đoạn mã script nguy hiểm , phục vụ cho các mục đích tấn công khác, tấn công từ xa vào hệ thống ứng dụng web .

**Các hướng khai thác SQL Injection**

Những đoạn script SQL nguy hiểm có thể được “tiêm” vào câu truy vấn thông qua nhiều cách khác nhau.

-- Thông qua user input

User Input là những dữ liệu do người dùng nhập vào, tương tác với các ứng dụng web thông qua các form nhập liệu: tài khoản và mật khẩu đăng nhập vào hệ thống, các thông tin của người dùng như ngày sinh, email ,.... ; ô input search: yêu cầu tìm kiếm các thông tin trong hệ thống, ...
![](https://images.viblo.asia/61e2e108-8f76-4953-baff-452466cfe4d0.png)

* Những dữ liệu được người dùng nhập vào này được trình duyệt Web (web browser) gửi đến server thông qua phương thức HTTP GET hay POST và trở thành tham số cho ứng dụng web truy cập tới cơ sở dữ liệu.

Ví dụ , khi người dùng nhập vào ô tìm kiếm từ “SQL Injection”, web browser sẽ gửi cho server yêu cầu tìm kiếm, web server sẽ tìm kiếm trong cơ sở dữ liệu và tìm ra các bản ghi mà nội dung của nó chứa từ khóa “SQL Injection” và trả lại kết quả cho người dùng.
![](https://images.viblo.asia/846d0a39-509f-41c4-b993-89a74f1131c4.png)

* Trong hình trên , khi người dùng nhập vào User ID = 1; trình duyệt gửi 1 gói tin HTTP GET tới server chứa tham số id=1, tham số này sẽ xuất hiện trên thanh URL của trình duyệt. Khi nhận được một request, ứng dụng web tìm kiếm trong cơ sở dữ liệu và trả về cho người dùng user có id = 1.
* Ta có thể tấn công SQL Injection thông qua cách truyền các câu lệnh SQL thông qua các tham số input này .

-- Thông qua cookies

![](https://images.viblo.asia/de7a819c-ade1-46aa-aff4-aa7ad3d4cda2.png)

* Cookies là những tệp tin lưu trữ thông tin trạng thái của người dùng khi truy cập các ứng dụng web. Những thông tin này do người lập trình quyết định, được tạo ra ở server và lưu trữ tại client.
* Khi người dùng truy cập lại ứng dụng web, cookies được Web Browser gửi lên server giúp phục hồi lại những trạng thái của người dùng trong lần truy cập trước đó. Trong một số ứng dụng web thương mại, cookies còn được sử dụng để lưu trữ những sở thích của người dùng, khi đó ứng dụng web sẽ sử dụng cookies để đưa ra những gợi ý tốt nhất cho người dùng khi mua sản phẩm.
![](https://images.viblo.asia/f7e64f6d-a0fc-460d-883d-cf8e1e891321.png)
* Do được lưu trữ ở client nên người dùng có thể chỉnh sửa tùy ý, vì vậy nếu ứng dụng web sử dụng những thông tin lưu trong cookies để xây dựng các truy vấn tới cơ sở dữ liệu thì hacker hoàn toàn có thể chèn vào cookies những Script SQL để thực hiện một cuộc tấn công SQL Injection.

-- Thông qua các biến server
* Biến server là các biến sử dụng trong quá trình truyền tải thông tin giữa client với server như Http Header, Network Header...
* Các giá trị được lưu trong biến server có thể được ứng dụng web sử dụng như trong việc logging truy cập hay thống kê truy cập theo user agent... Những công việc này đều có sự tương tác với cơ sở dữ liệu nên các kẻ tấn công hoàn toàn có thể sử dụng các biến server trong việc khai thác SQL Injection.
![](https://images.viblo.asia/c24a08b3-955b-486c-bdab-54eb1e124065.png)

-- Second – order Injection

Đây là kỹ thuật ít được sử dụng vì rất khó để nhận biết một ứng dụng web có bị mặc lỗi này hay không. Kỹ thuật này được mô tả như sau: Trước hết, kẻ tấn công “inject” vào cơ sở dữ liệu một đoạn mã. Đoạn mã này chưa hề gây nguy hiểm cho hệ thống nhưng nó sẽ được sử dụng làm bàn đạp cho lần inject tiếp theo của hacker. Chúng ta hãy xem một ví dụ cụ thể để hiểu hơn về kỹ thuật này.
Một hacker truy cập vào một ứng dụng web và cố gắng đăng ký một tài khoản có username là “administrator’ –”. Sau đó hacker này thực hiện thao tác thay đổi mật khẩu. Thao tác thay đổi mật khẩu được ứng dụng web xử lý như sau :

![](https://images.viblo.asia/3546cc26-4e8a-4e6b-ae27-7848b8e1a687.png)

Với username đã đăng ký ở trên, câu truy vấn trên trở thành :

![](https://images.viblo.asia/9d9a1764-5415-4786-b15e-c77e117d524b.png)

Như vậy, kẻ tấn công đã thay đổi được password của tài khoản administrator và có thể đăng nhập dưới tên tài khoản administrator.