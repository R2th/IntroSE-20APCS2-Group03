Data Repository là một thuật ngữ chung được sử dụng để chỉ nơi lưu trữ dữ liệu đã được thu thập, tổ chức và cô lập để nó có thể được sử dụng cho các hoạt động kinh doanh hoặc khai thác để báo cáo và phân tích dữ liệu. 
Nó có thể là một cơ sở hạ tầng cơ sở dữ liệu nhỏ hoặc lớn với một hoặc nhiều cơ sở dữ liệu để quản lý và lưu trữ các bộ dữ liệu. 
Trong bài viết này, mình sẽ cung cấp một cái nhìn tổng quan về các loại Data Repository khác nhau

### I. Databases - Cơ sở dữ liệu
Cơ sở dữ liệu là một tập hợp dữ liệu hoặc thông tin, được thiết kế để lưu trữ, tìm kiếm và truy xuất và sửa đổi dữ liệu **và** một hệ thống quản lý cơ sở dữ liệu, hoặc DBMS, là một tập hợp các chương trình tạo và duy trì cơ sở dữ liệu. Nó cho phép bạn lưu trữ, sửa đổi và trích xuất thông tin từ cơ sở dữ liệu bằng cách sử dụng một chức năng gọi là truy vấn. 

Ví dụ: nếu bạn muốn tìm khách hàng đã không hoạt động từ sáu tháng trở lên, khi đó bạn sẽ sử dụng chức năng truy vấn, hệ thống quản lý cơ sở dữ liệu sẽ lấy dữ liệu của tất cả khách hàng từ database đã không hoạt động trong sáu tháng trở lên. 

Mặc dù Database và DBMS khác nhau, tuy nhiên các thuật ngữ thường được sử dụng thay thế cho nhau. 
Có nhiều loại cơ sở dữ liệu khác nhau. Một số yếu tố ảnh hưởng đến việc lựa chọn cơ sở dữ liệu, chẳng hạn như kiểu dữ liệu và cấu trúc, cơ chế truy vấn, yêu cầu độ trễ, tốc độ giao dịch và độ lớn dữ liệu, ở đây mình sẽ giới thiệu hai loại cơ sở dữ liệu chính là cơ sở dữ liệu liên quan và không quan hệ. 
#### 1. RDBMS - cơ sở dữ liệu quan hệ
Cơ sở dữ liệu quan hệ, còn được gọi là RDBMS, xây dựng dựa trên các nguyên tắc tổ chức của các tệp phẳng, với dữ liệu được tổ chức thành một định dạng bảng với các hàng và cột theo cấu trúc và lược đồ được xác định rõ. Tuy nhiên, không giống như các tệp phẳng, RDBMS được tối ưu hóa cho các hoạt động dữ liệu và truy vấn liên quan đến nhiều bảng và khối lượng dữ liệu lớn hơn nhiều. 
Ngôn ngữ truy vấn có cấu trúc, hoặc SQL, là ngôn ngữ truy vấn tiêu chuẩn cho cơ sở dữ liệu quan hệ. 
#### 2. NoSQL - cơ sở dữ liệu phi quan hệ
Cơ sở dữ liệu phi quan hệ, còn được gọi là NoSQL. Các cơ sở dữ liệu phi quan hệ đã xuất hiện để đáp ứng với khối lượng, tính đa dạng và tốc độ mà dữ liệu được tạo ra ngày nay, chủ yếu bị ảnh hưởng bởi những tiến bộ trong điện toán đám mây, Internet of things và sự phát triển social media. Được xây dựng để tối ưu tốc độ, tính linh hoạt và quy mô lớn, cơ sở dữ liệu phi quan hệ cho phép lưu trữ dữ liệu theo kiểu không có lược đồ hoặc không có ràng buộc. 
NoSQL được sử dụng rộng rãi để xử lý dữ liệu lớn. 

### II. Data Warehouse
Kho dữ liệu hoạt động như một kho lưu trữ trung tâm hợp nhất thông tin đến từ các nguồn khác nhau và hợp nhất thông qua quy trình trích xuất, chuyển đổi và tải, còn được gọi là quy trình ETL (Extract - Transform - Load), thành một cơ sở dữ liệu toàn diện cho phân tích và trí thông minh kinh doanh. 
Ở cấp độ cao, quy trình ETL giúp bạn trích xuất dữ liệu từ các nguồn dữ liệu khác nhau, chuyển đổi dữ liệu thành trạng thái sạch và có thể sử dụng và tải dữ liệu vào Data Warehouse của doanh nghiệp. 
Liên quan đến Data Warehouse là các khái niệm về Data Mart và Data Lake, mình sẽ đề cập sau. 

#### Tham khảo từ khoá học Data Analyst của IBM