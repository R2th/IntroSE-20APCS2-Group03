**Cơ sở dữ liệu NoSQL là gì**

Cơ sơ dữ liệu NoSQL được xây dựng cho các mô hình dữ liệu cụ thể và có các lược đồ linh hoạt cho các ứng dụng hiện đại. Cơ sở NoSQL được sử dụng rộng rãi vì khả năng phát triển, chức năng và hiệu suất cho các ứng dụng quy mô lớn. Chúng sử dụng nhiều mô hình dữ liệu đa dạng như văn bản, key-value, graph, tọa độ ...

**Cơ sở dữ liệu NoSQL hoạt động như thế nào?**

NoSQL sử dụng nhiều loại mô hình dữ liệu để truy cập và quản lý dữ liệu. Các loại cơ sở dữ liệu này được tối ưu hóa dành riêng cho các ứng dụng có mô hình dữ liệu linh hoạt, lượng dữ liệu lớn và độ trễ thấp, có thể đạt được bằng cách giảm bớt một số hạn chế về tính nhất quán của dữ liệu của các cơ sở dữ liệu khác.
VÍ dụ về mô hình dữ liệu dành cho cơ sở dữ liệu sách đơn giản:

- Trong cơ sở dữ liệu quan hệ, thông tin về một cuốn sách thường được phân tách và lưu trữ trong các table khác nhau, chúng quan hệ với nhau bằng những khóa chính và khóa ngoại.

     + Trong table  **book** có các cột như **ID** của sách, **name**, **version**.

    + Tong table **author** có các cột **ID** của tác giả, **name**.

    + Trong table **book-author** sẽ lưu trữ mối quan hệ giữ table **book** và **author** bao gồm các cột **authorId** và **bookId**.

    => Cơ sở dữ liệu quan hệ cho phép  thực thi tính toàn vẹn dữ liệu giữa nhiều bảng trong database, chuẩn hóa để giảm dư thừa và thường tối ưu hóa cho mục đích lưu trữ.

- Trong cơ sở dữ liệu NoSQL, thông tin về một cuốn sách thường được lưu trữ dưới dạng Json. Các thông tin như **id sách**, **tên sách**, **version**, **tên tác giả**, **id tác giả** được lưu trữ dưới dạng key-value trong cùng một collection.

    => Trong mô hình này dữ liệu được tối ưu hoá cho việc phát triển trực quan và khả năng thay đổi quy mô theo chiều ngang.

**Vì sao nên sử dụng cơ sở dữ liệu NoSQL?**

Cơ sở dữ liệu NoSQL phù hợp cho nhiều ứng dụng hiện đại như di động, web, trò chơi đòi hỏi có cơ sở dữ liệu linh hoạt, khả năng thay đổi quy mô, hiệu năng cao.

-  **Linh hoạt**: NoSQL thường cung cấp các sơ đồ linh hoạt cho giai đoạn phát triển nhanh hơn và có khả năng lặp lại cao hơn. Mô hình dữ liệu linh hoạt khiến NoSQL thành lựa chọn lý tưởng cho dữ liệu không được tổ chức thành cấu trúc hoặc cấu trúc chưa hoàn chỉnh.

- **Khả năng thay đổi quy mô**: Cơ sở dữ liệu NoSQL được thiết kế để tăng quy mô bằng cách phân phối các cụm phần cứng thay vì tăng quy mô bằng cách bổ sung máy chủ.

- **Hiệu suất cao**: NoSQL được tối ưu hóa theo mô hình dữ liệu (ví dụ như văn bản, key-value) và các mẫu truy cập giúp tăng hiệu năng cáo hơn so với cơ sở dữ liệu quan hệ.

- **Chức năng cao**: NoSQL cung cấp các API và kiểu dữ liệu thiết thực cho từng mô hình dữ liệu tương ứng.

**Các loại cơ sở dữ liệu NoSQL**

- **key-value**: có khả năng phân mảnh cao và cho phép thay đổi quy mô theo chiều ngang mà các loại hình cơ sở dữ liệu khác không thể làm được. Mô hình key-value được dùng cho trò chơi, công nghệ quảng cáo  và đặc biệt thích hợp cho IoT.
- **Document**: dữ liệu thường được biểu diễn dưới dạng một đối tượng hoặc văn bản dạng Json. Nó giúp nhà phát triển dễ dàng lưu trữ và truy vấn dữ liệu trong một cơ sở dữ liệu. Với tính chất linh hoạt, bán cấu trúc và phân cấp của cơ sở dữ liệu document cho phép chúng phát triển phù hợp với yêu cầu của ứng dụng. MongoDB là một trong nhưng cơ sở dữ liệu document phổ biến cung cấp các API mạnh mẽ và trực quan để phát triển.
- **Graph**: mục đích của cơ sở dữ liệu graph là giúp việc dựng và chạy ứng dụng hoạt động với các bộ dữ liệu có khả năng kết nối cao dễ dàng hơn. Graph thường được sử dụng cho các đồ thị, mạng xã hội... Amazon Neptune là dịch vụ cơ sở dữ liệu graph, hổ trợ cả mô hình đồ thị thuộc tính lẫn Framework mô tả tài nguyên (RDF), có 2 lựa chọn API graph cho người dùng là TinkerPop và RDF/SPARQL. Các cơ sở dữ liệu graph phổ biến có Neo4j và Giraph.
- **In-memory**: Cơ sở dữ liệu này được sử dụng để đáp ứng những yêu cầu cần thời gian phản hồi đạt mức micro giây và lưu lượng có thể đạt mức đỉnh điểm vào bất kỳ thời gian nào.
-**Search**: một trong nhưng cơ sở dữ liệu search là Amazon Elasticsearch (Amazon ES) là cơ sở dữ liệu chuyện dụng để cung cấp khả năng ảo hóa và phân tích dữ liệu do máy tạo gần như theo thời gian thực. Amazone ES còn là công cụ tìm kiếm mạnh mẽ, có hiệu năng cao.
**So sánh giữa SQL và NoSQL**
Trong nhiều thập kỷ, SQL là mô hình dữ liệu chiếm nhiều ưu thế về lượng sử dụng để phát triển ứng dụng trong đó phải kể đến như Oracle, SQL Server, MySQL, Postgres. Mãi cuối năm 2000 các mô hình dữ liệu khác mới được đưa vào áp dụng và được gọi là NoSQL.

**Một số khác biệt giữa SQL và NoSQL.**

|  | SQL | NoSQL|
| -------- | -------- | -------- |
| Khối lượng công việc tối ưu     | được thiết kế để xử lý các giao dịch (OLTP) có tính ổn định cao và thích hợp xử lí phân tích trực tuyến (OLAP)     | được thế kế cho OLTP cho một số mẫu truy cập dữ liệu , bao gồm ứng dụng có độ trễ thấp, phục vụ phân tích dữ liệu có cấu trúc chưa hoàn chỉnh     |
| Mô hình dữ liệu     | mô hình chuẩn hóa dữ liệu vào bảng thành từng cột và hàng, quy định rõ ràng bảng, hàng, cột, chỉ mục, quan hệ. Thực hiện tính toàn vẹn dữ liệu    | cung cấp nhiều mô hình dữ liệu như document, graph, key-value, in-memory, search   |
| Thuộc tính ACID   | đòi hỏi transaction phải thực thi đầy đủ hoặc không thực thi, dữ liệu phải nhất quán với sơ đồ cơ sở dữ liệu, các transaction phải tách biệt nhau, khả năng phục hồi khi có hư hỏng    | nới lỏng một số thuộc tính ACID để có mô hình linh hoạt có khả năng thay đổi theo chiều ngang là lựa chọn tuyệt vời cho các trường hợp cần thông lượng cao, độ trễ thấp  |
| Quy mô  |thường tăng quy mô bằng cách tăng phần cứng hoặc thêm các bản sao   | có tính phân mảnh cao, có khả năng tăng quy mô bằng cách dùng kiến trúc được phân phối để tăng thông lượng, đem đến hiệu năng ổn định với quy mô gần như không giới hạn |
| Hiệu năng | phụ thuộc vào hệ thống con của ổ đĩa   | thường được xem là chức năng của kích cỡ cụm phần cứng, độ trễ mạng và ứng dụng đưa ra lệnh gọi |
|API | yêu cầu lưu trữ và truy xuất sử dụng các câu truy vấn có cấu trúc SQL   | API trên cơ sở đối tượng cho phép các nhà phát triển ứng dụng dễ dàng lưu trữ và truy xuất cấu trúc dữ liệu trong bộ nhớ |

**Thuật ngữ SQL với NoSQL**

| SQL| MongoDB | DynamoDB |Cassandra  | Couchbase |
| -------- | -------- | -------- |-------- | -------- |
| Table     | Collection     | Table     |Table     | Data bucket     |
| Row     | Document     | Item     |Row     | Document     |
| Column |	Field |	Attribute |	Column |	Field |
|Primary key|	ObjectId|	Primary key| Primary key|	Document ID|
| Index| Index	| Secondary index	| Index	| Index| 
| View| 	View| 	Global secondary index	| Materialized view	| View| 
| Nested table or object| 	Embedded document	| Map	| Map	| Map| 
| Array	| Array| 	List| 	List	| List| 



ref: [https://aws.amazon.com/nosql/](https://aws.amazon.com/nosql/)