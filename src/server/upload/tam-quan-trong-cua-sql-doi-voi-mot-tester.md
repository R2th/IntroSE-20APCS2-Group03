Đối với một Tester thì yêu cầu chuyên môn về SQL phụ thuộc vào từng dự án khác nhau. Nếu dự án của bạn về kho dữ liệu thì  và phần lớn của việc kiểm thử là tập trung vào tính chính xác của dữ liệu thì đòi hỏi người kiểm thử cần phải có các kiến thức về SQL. Còn khi dự án của bạn chỉ cần kiểm tra về giao diện hiển thị thì yêu cầu kiến thức về SQL không cần thiết. Bạn thử hình dùng xem, khi đi phỏng vấn nếu một người kiểm thử có kiến thức tốt về SQL thì chắc chắn hồ sơ của họ sẽ được ưu tiên so với các hồ sơ khác, đó là một điểm cộng lớn của một người kiểm thử. Còn trong công việc, điều này sẽ khiến anh ta nổi bật giữa đám đông và kiến thức về cơ sở dữ liệu và SQL sẽ giúp họ hoàn thành tốt công việc của mình. Vậy SQL là gì?
## 1. SQL là gì?
SQL là ngôn ngữ máy tính, giúp cho thao tác lưu trữ và truy xuất dữ liệu được lưu trữ trong một cơ sở dữ liệu quan hệ. SQL là viết tắt của Structured Query Language là ngôn ngữ truy vấn có cấu trúc. 
 ![](https://images.viblo.asia/061038aa-1da1-47cc-913c-d62654653677.jpg)

Có thể coi SQL là ngôn ngữ chung mà bất cứ hệ thống cơ sở dữ liệu quan hệ (RDBMS) nào cũng phải đáp ứng như: Oracle Database, SQL Server, My SQL,...

SQL là một ngôn ngữ được tiêu chuẩn hóa bởi ANSI (American National Standards Institute) – Viện tiêu chuẩn quốc gia Hoa Kỳ. Đây cũng đồng thời là ngôn ngữ được sử dụng phổ biến trong các hệ thống quản lý cơ sở dữ liệu quan hệ và hỗ trợ sử dụng trong các công ty lớn về công nghệ.

## 2. Tại sao sử dụng SQL?
![](https://images.viblo.asia/6e6c490b-8859-47fb-a3a1-8b26c826eab7.jpg)

Khi một doanh nghiệp cần một hệ thống để quản lý thông tin nhân viên thì họ phải thiết kế cơ sở dữ liệu để quản lý. Việc lưu trữ các thông tin bằng excel thì quản lý rất khó khăn. Trong trường hợp bạn muốn thêm hay sửa xóa thông tin ai đó sẽ mất nhiều thời gian. SQL sẽ giúp bạn quản lý và truy vấn thông tin nhanh hơn và bảo trì thông tin cũng dễ dàng hơn. Chính vì vậy người ta thường sử dụng SQL cho các mục đích như sau:
* Tạo cơ sở dữ liệu, bảng và view mới.
* Chỉnh sửa các bản ghi vào trong một cơ sở dữ liệu.
* Xóa các bản ghi từ một cơ sở dữ liệu.
* Lấy thông tin từ cơ sở dữ liệu.
## 3. Dự án/ tình huống cần có kiến thức SQL
*  Di chuyển dữ liệu
*  Cơ sở dữ liệu lên cấp
*  Dự án kinh doanh thông minh
*  Kho dữ liệu

## 4. Kiến thức về SQL và cơ sở dữ liệu mà Tester cần có
* Nhận biết các loại cơ sở dữ liệu khác nhau của nó.
* Có kiến thức chuyên môn về kết nối với cơ sở dữ liệu cho các khách hàng khác nhau
* Hiểu mối quan hệ giữa các bảng cơ sở dữ liệu, khóa và chỉ mục
* Có thể viết câu lệnh truy vấn cơ bản và phức tạp của SQL.
* Giải thích các truy vấn phức tạp hơn.
* Có kiến thức về bảng cơ sở dữ liệu, chỉ mục và khóa.

## 5. Các câu lệnh SQL thường sử dụng trong kiểm thử
* Data Manipulation Language (DML): Được sử dụng để truy xuất, lưu trữ, sửa đổi, xóa, chèn và cập nhật dữ liệu trong cơ sở dữ liệu. Ví dụ: câu lệnh SELECT, UPDATE và INSERT.
* Data Definition Language (DDL): Được sử dụng để tạo và sửa đổi cấu trúc của các đối tượng cơ sở dữ liệu trong cơ sở dữ liệu. Ví dụ: CREATE, ALTER and DROP.
* Transactional Control Language (TCL): Quản lý các giao dịch khác nhau xảy ra trong cơ sở dữ liệu. Ví dụ: các câu lệnh COMMIT, ROLLBACK.
* Inner Join: Lấy các bản ghi khớp từ cả hai bảng.
* Distinct: Lấy các giá trị khác nhau từ một hoặc nhiều trường.
* In: Toán tử này được sử dụng để tìm giá trị có trong danh sách hay không.
* Between: Toán tử này được sử dụng để truy xuất các giá trị trong một phạm vi.
* Like: Toán tử này được sử dụng thực hiện khớp mẫu bằng cách sử dụng ký tự đại diện; nó được sử dụng trong mệnh đề where.
* Order By theo mệnh đề: Sắp xếp các bản ghi bảng theo thứ tự tăng dần hoặc giảm dần. Thứ tự mặc định là tăng dần.
* Group By: Sử dụng Group By các câu lệnh với hàm tổng hợp để nhóm tập kết quả với một hoặc nhiều cột.
* Hàm tổng hợp: Thực hiện phép tính trên một tập hợp các giá trị và trả về một giá trị duy nhất. Ví dụ: Average, Min, Max, Sum, Count,...

Trên đây là những thông tin cần thiết của SQL đối với một người kiểm thử. Những bài viết sau mình sẽ đi sâu vào các câu lệnh cụ thể cho từng trường hợp khi sử dụng các câu lệnh SQL. Cám ơn mọi người nhiều! :)

### Tài liệu tham khảo: 
https://www.tutorialspoint.com/sql/sql-overview.htm
https://www.oodlestechnologies.com/blogs/Importance-of-SQL-for-testers/
https://menaentrepreneur.org/2017/07/the-importance-of-sql-skills-for-testing-profile/