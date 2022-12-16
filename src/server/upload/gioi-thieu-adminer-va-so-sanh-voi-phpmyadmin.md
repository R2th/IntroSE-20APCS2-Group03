### 1. Mở đầu
Adminer là một ứng dụng web miễn phí cung cấp GUI sử dụng kết hợp với hệ thống quản lý cơ sở dữ liệu MySQL. Đây là công cụ quản trị MySQL hay nhưng chưa được phổ biến và sử dụng nhiều nếu so sánh với phpMyAdmin. Lý do theo mình có thể là do phpMyAdmin được cài đặt cùng với bộ XAMPP, rất nhiều bạn khi mới bắt đầu học PHP đã dùng qua XAMPP nên cũng quen luôn với phpMyAdmin nên sau đó cũng không muốn đổi qua một GUI khác.
Sau đây mình sẽ đưa ra một số điểm theo mình là Adminer vượt trội hơn phpMyAdmin:

### 2. So sánh Adminer và phpMyAdmin
| Tính năng | phpMyAdmin 3.3.9 | Adminer 3.1.0 |Ghi chú
| -------- | -------- | -------- | -------- |
| CSDL được hỗ trợ   | MySQL     | MySQL, SQLite, PostgreSQL, MS SQL, Oracle     |Adminer hỗ trợ nhiều loại CSDL khác nhau  |
|Đăng nhập|Một phần|Toàn bộ|Adminer toàn bộ tính năng đăng nhập bao gồm cả danh sách người dùng, phpMyAdmin chỉ hỗ trợ thông qua dạng config|
|Tạo bảng|Không thông minh|Thông minh|Trong phpMyAdmin, bạn phải chỉ định số lượng các trường trước khi tạo bảng. Adminer thêm các trường tự động.|
|Thay đổi bảng (Alter table)|Hạn chế|Tự do|phpMyAdmin không thể di chuyển các cột và không thể thêm các cột ở các vị trí khác nhau cùng một lúc (mọi bảng thay đổi đều rất chậm khi áp dụng cho các bảng lớn). Adminer có thể sắp xếp lại các cột và thêm chúng ở những nơi khác nhau - cùng một lúc.|
|Enum type|Khó|Thuận tiện|Adminer cung cấp textarea với một mục trên mỗi dòng để tạo kiểu enum.|
|Chỉ mục (indexs)|Mỗi lần một index|Tất cả trong cùng một lần|Thêm một chỉ mục là một hành động mất thời gian với các bảng lớn. Adminer cho phép thao tác với tất cả các chỉ mục cùng nhau.|
|Khóa ngoại|Giới hạn|Không giới hạn|Không thể tạo khóa ngoại nhiều cột trong phpMyAdmin. Bạn phải tạo một chỉ mục theo cách thủ công trước khi bạn tạo khóa ngoại. Adminer cung cấp giao diện khóa ngoại trực tiếp trong bảng tạo / thay đổi.|
|Giao diện người dùng|Dễ gây nhầm lẫn|Trực quan|Một ví dụ áp dụng cho nhiều trường hợp khác nhau: có một biểu tượng theo tên bảng trong bảng điều hướng. Một nửa người dùng không biết rằng nó có chức năng khác với tên bảng, nửa còn lại không chắc chắn đó là chức năng nào.|
|Triggers, routines, events|Không tạo, thay đổi bằng tay|Hỗ trợ đầy đủ|phpMyAdmin không cung cấp giao diện để tạo các đối tượng này và chỉ có chức năng nguyên thủy để thay đổi chúng.|
|Gọi routines|Chỉ SQL|Thân thiện|Gọi các stored procedures và functions được lưu trữ trong phpMyAdmin chỉ có thể bằng cách tạo một truy vấn SQL. Adminer cung cấp một giao diện thân thiện.|
|Select dữ liệu|Thiếu xót|functions, grouping|Adminer cho phép grouping kết quả và áp dụng functions cho các cột trong các câu lệnh được chọn. Cũng có thể đặt hàng theo nhiều cột cùng một lúc. phpMyAdmin thiếu các tính năng này.|
|Tải xuống trường Blob|Bảng phụ|Tự động|Bạn chỉ có thể tải xuống nội dung của một trường blob trong phpMyAdmin bằng cách tạo các bảng bổ sung, chỉ định chúng trong cấu hình và đánh dấu thủ công các trường có thể tải xuống.Adminer cho phép tải xuống bất kỳ blob nào.|
|Quan hệ (Relations)|Bảng phụ|Tự động|Để liên kết dữ liệu thông qua các khóa ngoại, bạn phải tạo một bảng phụ và chỉ định nó trong cấu hình của phpMyAdmin.|
|Chỉnh sửa hàng loạt|Không có|Sẵn có|Không có cách nào để thay đổi giá trị trường cho nhiều hàng cùng một lúc trong phpMyAdmin. Adminer cung cấp cả sửa đổi tương đối và tuyệt đối.|
|Chỉnh sửa nhiều|Phức tạp|Dễ hơn|Ví dụ: để sửa lỗi chính tả trên mười hàng: Bạn phải chọn các hàng này trong phpMyAdmin, chỉnh sửa chúng, tìm lại lỗi chính tả và lưu lại. Trong Adminer, chỉ cần nhấp đúp vào một lỗi đánh máy và lưu lại.|
|Clone row|Dễ bị lỗi|An toàn|phpMyAdmin cung cấp tính năng nhân bản hàng sau khi chỉnh sửa tiêu chuẩn, do đó có thể ghi đè hàng do nhầm lẫn. Adminer có một nút đặc biệt được hiển thị trước thao tác này.|
|Schema|Bảng phụ|Tự động|Schema trong phpMyAdmin chỉ khả dụng sau khi thiết lập và chỉ định các bảng bổ sung trong tệp cấu hình và chỉ thông qua PDF hoặc <canvas>. Adminer sử dụng HTML và JavaScript.|
|Đồng bộ hóa|Yêu cầu truy cập từ xa|Làm việc ở bất cứ đâu|Tính năng đồng bộ hóa phpMyAdmin không hoạt động nếu không có quyền truy cập từ xa vào máy chủ thường bị tường lửa vô hiệu hóa. Adminer sử dụng một cách tiếp cận khác - nó có thể tạo xuất ALTER để tạo các lệnh thay đổi để đồng bộ hóa cơ sở dữ liệu đích với nguồn sau khi chạy trên máy chủ từ xa.|
|Danh sách cơ sở dữ liệu|Chậm|Nhanh|Danh sách cơ sở dữ liệu chậm vì nó hiển thị số lượng bảng. Adminer tải dữ liệu này không đồng bộ.|
|Giải thích ý nghĩa biến|Một dòng duy nhất|Có documentation|phpMyAdmin hiển thị một bản tóm tắt để giải thích biến, Adminer liên kết đến tài liệu chính thức.|
|Mở nhiều tab|Khóa|Không khóa|Khi một tab trình duyệt đang thực hiện một thao tác dài, không thể hoạt động với phpMyAdmin trong một tab khác. Mặt khác, Adminer đồng thời và không chặn.|
|Phím tắt|Khó khăn|Tiện dụng|Trong phpMyAdmin, Ctrl + Trái / Phải không bỏ qua các từ như là tiêu chuẩn, thay vào đó, nó di chuyển giữa các trường. Trong Adminer, các phím tắt hoạt động như mong đợi: Tab bên trong văn bản SQL hoạt động và Ctrl + Enter gửi biểu mẫu.|
|Tổng hiệu suất|Chậm|Nhanh|Adminer trung bình nhanh hơn 28% (theo thử nghiệm độc lập của Juraj Hajdúch).|
|Thông báo phiên bản mới|Email|Ngay bên trong Adminer|Bạn có thể đăng ký thông báo email trong phpMyAdmin. Adminer thân thiện hơn với người dùng: tính khả dụng của phiên bản mới được hiển thị tự động trong chính Adminer. Ngoài ra còn có một kênh RSS cho cả hai công cụ.
|Yêu cầu|PHP 5.2+, MySQL 5+	|PHP 4.3+, MySQL 4.1+|Adminer làm việc ngay cả với các phiên bản cũ hơn của PHP và MySQL. phpMyAdmin yêu cầu hạ cấp để hoạt động trong các phiên bản cũ hơn.|
### 3. Kết luận
Bài viết mình có tham khảo ở https://www.adminer.org/en/phpmyadmin/. Mình thấy Adminer làm một tool rất tốt, dễ dùng, giao diện đơn giản, đầy đủ chức năng cần thiết. Nếu có dịp các bạn cũng nên dùng thử, mình tin khi đã dùng quen các bạn sẽ rất thích và không muốn trở lại phpMyAdmin nữa. 
   
Cảm ơn các bạn đã theo dõi bài biết của mình. Happy coding and peace out! :v: