# 1. Index là gì ?
Index (hay chỉ mục) là một cấu trúc dữ liệu để tăng hiệu suất truy vấn của cơ sở dữ liệu. Index cho phép cơ sở dữ liệu thực hiện một số câu truy vấn có điều kiện nhanh hơn so với thông thường. Nhưng index cũng được lưu trên bộ nhớ và tiêu tốn không gian bộ nhớ và thời gian để tạo, cập nhật index nên khi sử dụng index cần phải suy xét kĩ.

# 2. Khi nào sử dụng index ?
Index giúp tăng tốc độ truy vấn của một số câu lệnh select có điều kiện vì vậy nó đặc biệt hữu dụng khi câu lệnh truy vấn được sử dụng thường xuyên (hoặc cột được tạo index thường được truy vấn) và số lượng bản ghi lớn. 

Khó để xác định khi nào sử dụng index, nó phụ thuộc nhiều vào các bài toán thực tế tuy nhiên có một số quy luật thường thấy khi chọn một cột (hoặc tập các cột) để tạo index: 

1. Khóa và các cột có giá trị độc nhất (unique): Database thường sẽ tự động tạo index cho các cột này nên để tranh việc trùng lặp và tiêu tốn bộ nhớ ta không nên tạo thêm index cho chúng.
2. Tần suất được sử dụng: Khi tần suất sử dụng câu truy vấn càng lớn thì việc tạo index sẽ giúp làm giảm càng nhiều thời gian truy vấn (tính tổng).
3. Số lượng bản ghi của bảng: Số lượng bản ghi của bảng càng nhiều thì tốc độ truy vấn sẽ càng giảm lợi thế của việc sử dụng index trên các bảng này lại càng rõ ràng so với những bảng có số lượng bản ghi ít. Đặc biệt đối với trường hợp một bảng có ít bản ghi (100 - vài nghìn) ta không nên tạo chỉ mục cho chúng.
4. Dữ liệu của bảng tăng trưởng nhanh: Index sẽ tự động cập nhật khi có một bản ghi được thêm vào cơ sở dữ liệu, vì vậy khi đánh chỉ mục cho 1 bảng nó sẽ làm chậm lại các hành động thêm sửa xóa bản ghi. Vậy nên một bảng thường xuyên được cập nhật nên có ít index hơn một bảng hiếm khi cập nhật.
5. Không gian bộ nhớ: Khi tạo index sẽ sử dụng chính không gian bộ nhớ của cơ sở dữ liệu nên khi cơ sở dữ liệu có kích thước lớn ta cần lựa chọn cẩn thận trường nào sẽ sử dụng làm index.
6. Dữ liệu có đa dạng giá trị: Index được tạo dựa trên các giá trị trong cột mà nó trỏ tới ví dụ như cột index được tạo chỉ có 3 giá trị A, B, C thì index được tạo sẽ có giá trị nhỏ hơn nhiều so với cột có dải giá trị trải dài cả bảng chữ cái. Index trên cột có ít giá trị ví dụ cột sex sẽ không làm tăng nhiều tốc độ truy vấn tuy nhiên đối với những cột có nhiều giá trị riêng biệt như cột name sẽ làm tăng tốc độ truy vấn đáng kể.

# 3. Ưu điểm của việc sử dụng index.
1. Thường sẽ làm tăng hiệu năng truy vấn khi điều kiện rơi vào các cột được đánh chỉ mục.
2. Giúp ta có thể truy vấn dữ liệu nhanh hơn.
3. Có thể được sử dụng để sắp xếp dữ liệu.
4. Các chỉ mục độc nhất đảm bảo tính duy nhất của trường trong cơ sở dữ liệu.

# 4. Nhược điểm của sử dụng index.
1. Làm giảm hiệu năng các câu lệnh insert, update ,delete.
2. Chiếm dụng bộ nhớ.

# 5. Các tạo index trong PostgreSQL.
Để tạo chỉ mục trong PostgreSQL ta dùng câu lệnh: 

`CREATE INDEX ten_index ON [TABLE NAME] (COLUMN1, COLUMN2, ...)`

Nếu muốn tạo chỉ mục độc nhất (không cho phép chèn dữ liệu trùng lặp nào vào bảng):

`CREATE UNIQUE INDEX ten_index ON [TABLE NAME] (COLUMN1, COLUMN2, …)`

Khi không cần dùng index nữa có thể xóa theo cú pháp: 

`DROP INDEX ten_index`

Ngoài ra còn nhiều lựa chọn khi tạo index, để biết thêm các bạn tham khảo link: https://www.postgresql.org/docs/11/sql-createindex.html 

# 6. Tài liệu tham khảo.
- http://dcx.sybase.com/1200/en/dbusage/when-using-perform.html
- https://specialties.bayt.com/en/specialties/q/59171/what-are-advantages-and-disadvantages-of-indexing-in-database/