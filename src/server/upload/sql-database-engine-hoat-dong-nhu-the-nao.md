Hiện nay, đối với những người đang học tập và làm việc trong lĩnh vực công nghệ thông tin, chắc hẳn đều đang hoặc đã làm việc với SQL. Nhưng có nhiều người thậm chí làm việc với SQL, làm dự án sử dụng SQL nhưng không biết SQL thực sự hoạt động như thế nào. Không nhiều người quan tâm đến hoạt động bên trong của SQL.  Bởi thực ra không cần biết chúng, ta vẫn có thể tạo và truy vấn dữ liệu bằng bất kỳ chưng trình SQL nào
![](https://images.viblo.asia/07e7bbdf-2079-4879-8526-1343ef72d816.png)
## SQL là một ngôn ngữ lập trình hay một ngôn ngữ truy vấn?
SQL là viết tắ của Structured Query Language, nghĩa là ngôn ngữ truy vấn dữ liệu. Có thể coi SQL là ngôn ngữ chung mà bất kì hệ thống cơ sở dữ liệu quan hệ (RDBMS) nào cũng phải đáp ứng.  Nhưng nhiều developer gọi SQL là ngôn ngữ lập trình đặc biệt. SQL gồm 2 thành phần: biên dịch và thực thi. Trình biên dịch có nhiệm vụ chuyển các câu lạnh thành các thủ tục và máy chạy các thủ tục đó. Vậy, dưới góc nhìn biên dịch và thực thi, nếu có ai đó nói SQL là một ngôn ngữ lập trình thì ở một mức độ nào đó, nó được coi là đúng đấy chứ?

## Tại sao phải dùng SQL nếu bất kì ngôn ngữ lập trình nào cũng có thể tạo CRUD program?
Có một sự thật là bất kì ngôn ngữ lập trình nào cũng có thể tạo một chương trình thực thi các thao tác CRUD (create, read, update, delete) đơn giản, nhưng đối với những truy vấn phức tạp, chúng ta sẽ có thể phải viết hàng trăm dòng code. SQL cho ta những cú pháp đơn giản hơn, và đặc biệt là mối quan hệ giữa các bản ghi.
## Tổng quan về SQL
Như đã nói ở trên, SQL được định nghĩa là một ngôn ngữ truy vấn dữ liệu. Mục đích của SQL là để tương tác với cơ sở dữ liệu quan hệ, mà trong đó dữ liệu được lưu ở dạng bảng. SQL có thể quản lý một lượng lớn dữ liệu, đặc biệt là các dữ liệu được ghi đồng thời và chúng ta có nhiều thay đổi với dữ liệu đó
Khi sử dụng SQL để quản lý dữ liệu, người dùng sẽ có thể thực hiện CRUD giữa các cơ sở dữ liệu. Có nhiều hệ quản trị cơ sở dữ liệu quan hệ (DBMS) khác nhau như MySQL, SQLite, Postgres SQL, v.v.. và tất cả chúng có tính năng như nhau
Có một số thuật ngữ trong cơ sở dữ liệu như: database server, database engine, database management system. Trong cơ sở dữ liệ, ta có thể hoán đổi 3 thuật ngữ này. Khi nói SQL engine hoặc SQL server có thể hiểu chúng là giống nhau
## SQL Engine là gì?
SQL Engine là một phần mềm thu thập và chuyển đổi các câu lệnh SQL để các hoạt động thích hợp có thể thực hiện trên cơ sở dữ liệu quan hệ. Mục tiêu của SQL Engine là để tạo CRUD khỏi cơ sở dữ liệu
Một SQL Engine bao gồm 2 thành phần chính: một công cụ lưu trữ và một bộ xử lý truy vấn. Ngày nay một số DBMS SQL hiện đại có nhiều hơn một công cụ lưu trữ. SQL đã chiếm lĩnh một phần lớn thị trường và có nhiều doanh nghiệp sử dụng hệ thống SQL để xử lý các giao dịch và phân tích.
## SQL Database Engine hoạt động như thế nào?
Nhìn bề ngoài, chúng ta biết SQL Engine biên dịch truy vấn và máy thự hiện truy vấn. Nhưng hãy đi sâu hơn một chút về cách thức hoạt động của nó.
Việc thực thi hoàn thành một truy vấn được chia thành các giai đoạn chính:
- Biên dịch (phân tích cú pháp, kiểm tra ngữ nghĩa), ghép nối
- Tối ưu hóa
- Thực thi
### Biên dịch - phân tích cú pháp
Câu lệnh truy vấn được mã hóa thành các từ riêng lẻ với các mệnh đề thích hợp
### Biên dịch - kiểm tra ngữ nghĩa
Kiểm tra xác nhận tính hợp lệ của câu lệnh khớp với danh mục của hệ thống. Giai đoạn này kiểm tra xem truy vấn có hợp lệ hay không, nó cũng xác nhận quyền hạn của người dùng để thực thi câu lệnh
### Biên dịch - ghép nối
Tạo biển diễn nhị phân tương ứng cho câu lệnh đã nhập. Ở giai đoạn này, câu lệnh đã được biên dịch, bây giờ nó sẽ được gửi đến máy chủ cơ sở dữ liệu để tối ưu hóa và thực thi
### Tối ưu hóa
Tạo thuật toán tối ưu nhất cho mã byte được tạo ở trên. Tính năng này còn được gọi là Query Optimizer hoặc Relational Engine
### Thực thi
Máy sẽ lấy mã code đã được tối ưu và thực thi nó 
> SQL STATEMENT --> Parsing -->Binding --> Query Optimization --> Query Execution --> Resul
## SQL chuyển đổi dữ liệu thành dạng bảng
SQL được viết bằng C và nó sử dụng nguyên tắc cây nhị phân (Binary-Tree) để tạo dữ liệu đến lưu trữ trong các hàng và cột. Trong cấu trúc cây nhị phân, các nhánh con tiếp tục trỏ đến phần dữ liệu mới, cấu trúc cơ sở dữ liệu SQL cũng tương tự như vậy, trong đó dữ lữ liệu được chuyển thành các bảng với các cột và hàng dữ liệu trỏ vào nhau
![](https://images.viblo.asia/d7e86687-591b-476e-81a2-d2d6a388e1e4.png)