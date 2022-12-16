# Lời nói đầu
Khi một project đang được thiết kế, điều đầu tiên cần nghĩ đến là mục đích của nó sẽ là gì ... đâu là giải pháp tốt nhất và đâu là giải pháp thay thế. Trong phát triễn phần mềm, mọi thứ đều được thực hiện để phục vụ dữ liệu, vì vậy quá trình xây dựng và thiết kế cơ sở dữ liệu là rất quan trọng

# Tổng quan

PgModeler là từ viết tắt của PostgreQuery Database Modeler và là một công cụ mô hình hóa cơ sở dữ liệu nguồn mở được thiết kế đặc biệt cho PostgresSQL. Công cụ này có đầy đủ tính năng cho phép người dùng nhanh chóng tạo các mô hình cơ sở dữ liệu (ERD) xuất chúng thành nhiều chế độ, từ hình ảnh PNG, tập tin SQL để có thể chạy trực tiếp trên máy chủ postgresSql.
Ngoài ra, phần mềm này có khả năng so sánh các mô hình và cơ sở dữ liệu từ đó tạo ra các tập lệnh SQL có thể được sử dụng để đồng bộ hóa cơ sở dữ liệu hiện có.
Trang chủ:  https://pgmodeler.io/
Github: https://github.com/pgmodeler/pgmodeler
# Các tính năng chính
-  Tự động tạo columns và constraints
-  Export models với 5 cách khác nhau :   SQL script file , PNG , SVG, HTML Format hay trực tiếp vào Sql Server
-  Tự động tạo các model từ database có sẵn
-  Hỗ trợ các tiệp dựa trên XML
-  Tạo tập lệnh SQL để đồng bộ hóa cả mô hình và cơ sở dữ liệu
-  Quản lí PostgresSql hiện có
......

![](https://images.viblo.asia/e4e5d352-73b9-4d45-bd5d-bbe0aef3df03.png)

#  Cài đặt
Qúa trình cài đặt rất đơn giản, chỉ cần tải xuống từ trang web và tiến hành chạy như các phần mêm thông thường

![](https://images.viblo.asia/363eb468-5645-458e-b34c-9223abf8d26b.png)

# Thiết kế mô hình Entity Relationship Diagram trong PgModeler

Khi đã cài đặt thành công PgModeler, tiến hành thiết kết ERD trong PgModeler để thiết lập mối quan hệ giữa các bảng. Ví dụ ở đây là các bảng customer, film, rental.

![](https://images.viblo.asia/cca815e5-9325-46cf-ba2e-021d0df6983f.png)

Các ràng buộc đại diện cho các khóa có thể được nhìn thấy, như pk, fk và thậm chí là NOT NULL, được biểu diễn bằng màu xanh lá cây ở bên phải của mỗi bảng. Các mối quan hệ giữa các bảng được mô tả một cách đầy đủ và rõ ràng khiến cho mô hình rất rõ ràng khi xem

## Thiết lập kết nối đến PostgresSql

Như đã đề cập từ trước một trong những tính năng của PgModeler là liên kết đến hệ cơ sở dữ liệu PostgresSq.. Để liên kết đến hệ cơ sở dữ liệu SQL, chỉ cần cấu hình kết nối với các thông tin như hình
![](https://images.viblo.asia/dda89e88-3e62-469a-bb3a-78c8c7ef2a93.png)

 ## Export data

PgModeler hỗ trợ nhiều kiểu export data từ PgModeler đến PostgresSql hay ra các định dạng khác.

### Export to PostgresSql

Mở màn hình Export Model , chọn version Database Server trong mục Connection  , xác định phiên bảng PostgresSql muốn export, lựa chọn thêm các tùy chọn có muốn xóa DB hay Object không rồi bấm Export như hình dưới

![](https://images.viblo.asia/f55ae0f5-1516-4450-bc64-73f2aaee5004.PNG)

###  Export to SQL File

Mở màn hinh Export Model , chọn đường dẫn lưu SQL file, xác định phiên bảng PostgresSql muốn export rồi bấm Export như hình dưới

![](https://images.viblo.asia/256213f0-8ca4-4dfc-9643-1efd45b5b036.PNG)

### Export to Graphics file

PgModeler hỗ trợ export ra 2 định dạng Graphic File phổ biến là PNG và SVG . 

Mở màn hinh Export Model , chọn đường dẫn lưu file cần export, xác định kiểu file muốn export : PNG hay SVG. Xác định thêm các tùy chọn phụ như kích cỡ , grid .... rồi bấm export

![](https://images.viblo.asia/582253fb-7dfd-41cf-bf85-75170267a898.PNG)


### Export to HTML

Mở màn hinh Export Model , chọn đường dẫn lưu HTML file, xác định kiểu file muốn export : Standalone hay Splitted. Ngoài ra có thể thêm tùy chọn kèm theo index. Sau đó bấm export

![](https://images.viblo.asia/f81ca378-f5a0-4cee-ba0a-e786bede0caf.PNG)


# Kết luận
Quá trình xây dựng và thiết kế cơ sở dữ liệu là rất quan trọng trong mỗi dữ án.  Hy vọng qua bài viết có thể giúp các bạn nắm được cách xây dựng và thiết kế cơ sở dữ liêu dùng PgModeler. Hẹn gặp lại các bạn trong bài viết kế tiếp