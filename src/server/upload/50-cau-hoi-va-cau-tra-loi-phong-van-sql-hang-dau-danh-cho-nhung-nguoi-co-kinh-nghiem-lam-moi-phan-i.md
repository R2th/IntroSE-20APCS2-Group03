SQL là viết tắt của Structured Query Language là một ngôn ngữ lập trình dành riêng cho miền để quản lý dữ liệu trong Hệ thống quản lý cơ sở dữ liệu. Kỹ năng lập trình SQL rất được mong muốn và yêu cầu trên thị trường, vì có một lượng lớn Hệ thống quản lý cơ sở dữ liệu (DBMS) trong hầu hết mọi ứng dụng phần mềm. Để có được một công việc, các ứng viên cần phải vượt qua cuộc phỏng vấn, trong đó họ được hỏi nhiều câu hỏi phỏng vấn SQL khác nhau.

Sau đây là danh sách các câu hỏi SQL được tuyển chọn để phỏng vấn kèm theo câu trả lời, có thể sẽ được hỏi trong cuộc phỏng vấn SQL. Các ứng viên có khả năng được hỏi các câu hỏi phỏng vấn SQL cơ bản đến các câu hỏi phỏng vấn SQL cấp độ cao hơn cho các chuyên gia kinh nghiệm 3 năm, tùy thuộc vào kinh nghiệm của họ và nhiều yếu tố khác. Danh sách dưới đây bao gồm tất cả các câu hỏi phỏng vấn kỹ thuật SQL dành cho người mới bắt đầu cũng như các câu hỏi phỏng vấn máy chủ SQL dành cho các ứng viên có kinh nghiệm và một số câu hỏi phỏng vấn truy vấn SQL.

# 1. DBMS là gì?
Hệ quản trị cơ sở dữ liệu (DBMS) là một chương trình kiểm soát việc tạo, duy trì và sử dụng cơ sở dữ liệu. DBMS có thể được gọi là Trình quản lý tệp quản lý dữ liệu trong cơ sở dữ liệu hơn là lưu nó trong hệ thống tệp.

# 2. RDBMS là gì?
RDBMS là viết tắt của Hệ thống quản lý cơ sở dữ liệu quan hệ. RDBMS lưu trữ dữ liệu vào tập hợp các bảng, được liên kết bởi các trường chung giữa các cột của bảng. Nó cũng cung cấp các toán tử quan hệ để thao tác dữ liệu được lưu trữ trong các bảng.

Ví dụ: SQL Server.

# 3. SQL là gì?
SQL là viết tắt của Structured Query Language, và nó được sử dụng để giao tiếp với Cơ sở dữ liệu. Đây là một ngôn ngữ tiêu chuẩn được sử dụng để thực hiện các tác vụ như truy xuất, cập nhật, chèn và xóa dữ liệu khỏi cơ sở dữ liệu.
Lệnh SQL tiêu chuẩn là Chọn.

# 4. Cơ sở dữ liệu là gì?
Cơ sở dữ liệu không là gì khác ngoài một dạng dữ liệu có tổ chức để dễ dàng truy cập, lưu trữ, truy xuất và quản lý dữ liệu. Đây còn được gọi là dạng dữ liệu có cấu trúc có thể được truy cập theo nhiều cách.

Ví dụ: Cơ sở dữ liệu Quản lý trường học, Cơ sở dữ liệu quản lý ngân hàng.

# 5. Bảng và Trường là gì?
Bảng là một tập hợp dữ liệu được tổ chức theo mô hình với các Cột và Hàng. Các cột có thể được phân loại là dọc và Hàng ngang. Một bảng có số cột cụ thể được gọi là trường nhưng có thể có bất kỳ số hàng nào được gọi là bản ghi.

Thí dụ:.
Bảng: Nhân viên.
Trường: Emp ID, Emp Name, Date of Birth.
Dữ liệu: 201456, David, 15/11/1960.

# 6. Khóa chính là gì?
Khóa chính là một tổ hợp các trường chỉ định duy nhất một hàng. Đây là một loại khóa duy nhất đặc biệt và nó có ràng buộc NOT NULL ngầm. Có nghĩa là, các giá trị khóa chính không thể là NULL.

# 7. Khóa duy nhất là gì?
Ràng buộc khóa duy nhất được xác định duy nhất mỗi bản ghi trong cơ sở dữ liệu. Điều này cung cấp tính duy nhất cho cột hoặc tập hợp các cột.

Ràng buộc khóa chính có ràng buộc duy nhất tự động được xác định trên nó. Nhưng không phải, trong trường hợp của Unique Key.

Có thể có nhiều ràng buộc duy nhất được xác định cho mỗi bảng, nhưng chỉ một ràng buộc khóa chính được xác định cho mỗi bảng.

# 8. Khoá ngoại là gì?
Khóa ngoại là một bảng có thể liên quan đến khóa chính của bảng khác. Mối quan hệ cần được tạo giữa hai bảng bằng cách tham chiếu khóa ngoại với khóa chính của bảng khác.

# 9. Tham gia là gì?
Đây là một từ khóa được sử dụng để truy vấn dữ liệu từ nhiều bảng hơn dựa trên mối quan hệ giữa các trường của bảng. Các phím đóng một vai trò quan trọng khi các JOIN được sử dụng.

# 10. Các kiểu nối và giải thích từng kiểu?
Có nhiều kiểu nối khác nhau có thể được sử dụng để truy xuất dữ liệu và nó phụ thuộc vào mối quan hệ giữa các bảng.

* **Inner Join**

Kết nối bên trong trả về các hàng khi có ít nhất một hàng khớp giữa các bảng.

* **Right Join**

Nối phải trả về các hàng phổ biến giữa các bảng và tất cả các hàng của bảng bên phải. Đơn giản, nó trả về tất cả các hàng từ bảng bên phải mặc dù không có hàng nào phù hợp trong bảng bên trái.

* **Left Join**

Nối trái trả về các hàng phổ biến giữa các bảng và tất cả các hàng của bảng bên trái. Đơn giản, nó trả về tất cả các hàng từ bảng bên trái mặc dù không có kết quả phù hợp nào trong bảng bên phải.

* **Full Join**

Tham gia đầy đủ các hàng trả về khi có các hàng phù hợp trong bất kỳ một trong các bảng. Điều này có nghĩa là, nó trả về tất cả các hàng từ bảng bên trái và tất cả các hàng từ bảng bên phải.

# 11. Normalization là gì?
Normalization là quá trình giảm thiểu sự dư thừa và phụ thuộc bằng cách tổ chức các trường và bảng của cơ sở dữ liệu. Mục đích chính của Chuẩn hóa là thêm, xóa hoặc sửa đổi trường có thể được thực hiện trong một bảng duy nhất.

# 12. DeNormalization là gì?
DeNormalization là một kỹ thuật được sử dụng để truy cập dữ liệu từ các dạng cơ sở dữ liệu thông thường cao hơn đến thấp hơn. Nó cũng là quá trình đưa sự dư thừa vào một bảng bằng cách kết hợp dữ liệu từ các bảng liên quan.'

# 13. Tất cả các chuẩn hóa khác nhau là gì?
Các dạng thông thường có thể được chia thành 5 dạng, và chúng được giải thích bên dưới -.

* **Dạng chuẩn đầu tiên (1NF):**

Thao tác này sẽ xóa tất cả các cột trùng lặp khỏi bảng. Tạo bảng cho dữ liệu liên quan và xác định các cột duy nhất.

* **Dạng chuẩn thứ hai (2NF):**

Đáp ứng tất cả các yêu cầu của hình thức thông thường đầu tiên. Đặt các tập dữ liệu con trong các bảng riêng biệt và Tạo mối quan hệ giữa các bảng bằng khóa chính.

* **Dạng chuẩn thứ ba (3NF):**

Điều này phải đáp ứng tất cả các yêu cầu của 2NF. Loại bỏ các cột không phụ thuộc vào các ràng buộc khóa chính.

* **Dạng chuẩn thứ tư (4NF):**

Đáp ứng tất cả các yêu cầu của dạng chuẩn thứ ba và nó không được có các phụ thuộc đa giá trị.

# 14. View là gì?
Một khung nhìn là một bảng ảo bao gồm một tập con dữ liệu được chứa trong một bảng. Các chế độ xem hầu như không hiển thị và cần ít dung lượng hơn để lưu trữ. Chế độ xem có thể có dữ liệu của một hoặc nhiều bảng được kết hợp và nó tùy thuộc vào mối quan hệ.

# 15. Index là gì?
Chỉ mục là phương pháp điều chỉnh hiệu suất cho phép truy xuất nhanh hơn các bản ghi từ bảng. Một chỉ mục tạo một mục nhập cho mỗi giá trị và việc lấy dữ liệu sẽ nhanh hơn.

# Tài liệu tham khảo:

https://www.guru99.com/sql-interview-questions-answers.html