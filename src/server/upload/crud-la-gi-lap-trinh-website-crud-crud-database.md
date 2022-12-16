## CRUD là gì? CRUD là viết tắt của 4 từ tiếng Anh: Create, Read, Update, Delete. CRUD là 4 tính năng quan trọng nhất để làm việc với Database của một Website.
Giả sử rằng, bạn có một Website Tin Tức. Vậy CRUD là gì trong Website Tin Tức của bạn? CRUD là tính năng trên Front-End, Back-End hay Database? Tại sao cần giao diện CRUD trong Website?
![](https://images.viblo.asia/6c18b19b-2bca-4039-91b7-c2d286d4802e.png)
### 1. CREATE – Tạo Mới Bài Viết, Tạo Mới Người Dùng

Để tạo một bài viết mới, quản trị viên Website sẽ nhập thông tin từ giao diện HTML. Gửi lên máy chủ Website thông qua HTML Form, xử lý và lưu trữ vào Database. 

Máy chủ sẽ thực hiện công việc phức tạp như kiểm tra tính hợp lệ, kiểm tra sự trùng lặp,.. lưu trữ vào Database một bài viết mới.

Tính năng CREATE trong CRUD đơn giản là quá trình lưu trữ một bản ghi mới lên Database. Hay còn gọi là tạo mới bản ghi trên Database chính là CREATE trong CRUD.

*Ví dụ về tính năng CREATE trong CRUD:*
* Người dùng đặt mua hàng trên Website Thương Mại Điện Tử cũng chính là CREATE. Website TMĐT tạo đơn hàng trên Database để lưu trữ thông tin của người mua hàng, sản phẩm họ mua,…
* Người dùng đăng một bình luận trên Facebook, Facebook phải tạo mới một dòng dữ liệu trên Database của họ.

### 2. READ – Đọc Nội Dung Bài Viết, Đọc Thông Tin Người Dùng, Đọc Thông Tin Đơn Hàng, Xem Sản Phẩm

Ở tính năng CREATE, bạn đã có bài viết mới được lưu trữ vào Database. CREATE là tính năng tạo mới một bản ghi trên Database. Tính năng READ sẽ là tính năng xem bản ghi đó, hay còn gọi là đọc bản ghi đó.

Hiểu đơn giản thì READ là lúc người dùng xem một bài viết, xem một thông tin từ Database. Phần hiển thị giao diện sẽ do bạn đảm nhiệm. Người dùng gửi yêu cầu đến máy chủ và xem bài viết đã lưu trữ trong Database.

Tính năng READ trong CRUD là quá trình một bản ghi từ Database lấy ra. Hay còn gọi là đọc bản ghi từ Database, xem bản ghi từ Database.

*Ví dụ về tính năng READ trong CRUD:*
* Người dùng click vào link bài viết, dựa vào đường dẫn đó, máy chủ phản hồi một bài viết cụ thể. Bài viết được đọc từ Database và hiển thị do người Lập Trình Viên Website đã thiết kế sẵn.
* Người dùng xem thông tin chi tiết sản phẩm, bao gồm kích thước sản phẩm, giá tiền sản phẩm,…
* Người dùng xem trang chủ của Website Tin Tức. Toàn bộ tiêu đề bài viết, hình ảnh được sắp xếp và hiển thị, đó là READ trong CRUD.
* Người dùng lướt New Feeds của Facebook, đó là READ từ Database, tính năng R – trong CRUD.

### 3. UPDATE – Chỉnh Sửa Bài Viết, Cập Nhật Giá Sản Phẩm, Người Dùng Đổi Mật Khẩu

Update trong CRUD chính là cập nhật, cập nhật thông tin bản ghi đã được lưu trữ từ trước. Hoàn toàn không tạo ra bản ghi, hay còn gọi là dòng dữ liệu mới.

Cập nhật thông tin trong Database sẽ dựa trên một số đặc điểm. Có thể dựa trên id, hoặc những đặc tính chung như cùng chuyên mục,… Update dữ liệu trong Database có thể update một hoặc nhiều bản ghi, tùy thuộc vào tính năng của Website.

*Ví dụ về tính năng Update trong CRUD:*
* Quản Trị Viên Website chỉnh sửa thông tin bài viết đã được tạo trước đó.
* Người Dùng Website chỉnh sửa bình luận.
* Người Dùng Facebook chỉnh sửa bài đăng.

### 4. DELETE – Xóa Bài Viết, Xóa Bình Luận, Xóa Đơn Hàng Lỗi

Xóa đi một bản ghi đã có từ trước trong Cơ Sở Dữ Liệu thông qua giao diện người dùng. Delete một người dùng đã tồn tại trong Database là công việc do Lập Trình Viên Back-End đảm nhiệm.

Tính năng DELETE trong CRUD là loại bỏ đi dữ liệu đã tồn tại, dữ liệu được tạo từ CREATE.

Trong dự án Lập Trình Website thực tế, xóa dữ liệu người dùng thông qua giao diện là ẩn. Ẩn dữ liệu người dùng để có thể phục hồi trong trường hợp cần thiết.

*Ví dụ về tính năng Delete trong CRUD:*
* Quản Trị Viên Website xóa đi bài viết đã đăng.
* Người dùng xóa đi bình luận của chính họ.
* Vậy CRUD là gì? CRUD là 4 tính năng chính để làm việc với Cơ Sở Dữ Liệu. Hầu hết mọi tính năng trên Website đều có liên quan đến CRUD.

Một tính năng đơn giản trên Website có thể là CREATE với READ, CREATE rồi UPDATE. Điều này tùy thuộc vào tính logic của tính năng và dự án. 
Xem thêm về CRUD thực tế tại: https://namcoi.com/du-an/aptech-php-laravel-crud-user/public/users