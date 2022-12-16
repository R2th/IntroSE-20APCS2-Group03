Khi nói đến việc chọn một cơ sở dữ liệu để bắt đầu một ứng dụng, một trong những quyết định lớn nhất đặt ra là chọn cấu trúc dữ liệu quan hệ (SQL) hay không có quan hệ (NoSQL). Mặc dù cả hai đều là những tuỳ chọn khả thi, nhưng vẫn có một số khác biệt giữa chúng mà người dùng cần phải ghi nhớ trước khi đưa ra quyết định. 

## The Big Picture Difference
### The Language

Giả sử như ở ngoài đời thật, ở một thị trấn A, nơi mà tất cả mọi người đều nói chung một ngôn ngữ. Tất cả các hoạt động đều được xây dựng xung quanh ngôn ngữ đó, tất cả các hình thức giao tiếp đều sử dụng nó. Một cách ngắn gọn, ngôn ngữ đó là cách duy nhất mà cư dân ở thị trấn hiểu và tương tác với thế giới bên ngoài. Thay đổi ngôn ngữ ở một nơi sẽ gây nhầm lẫn và bối rối cho mọi cư dân.

Bây giờ, ở một thị trấn khác - thị trấn B, nơi mà mỗi nhà trong đó có thể nói một loại ngôn ngữ khác nhau. Mọi người tương tác với thế giới bên ngoài theo cách khác nhau, và không có một sự hiểu biết hay nhìn nhận thế giới "chung" cho tất cả mọi người. Nếu một nhà khác biệt, nó cũng không ảnh hưởng đến tất cả mọi người.

Điều này giúp minh hoạ một trong những khác biệt cơ bản giữa cơ sở dữ liệu quan hệ SQL và không quan hệ NoSQL, và sự khác biệt này có ý nghĩa lớn, hãy cùng giải thích:

### SQL databases

Sql database sử dụng ngôn ngữ truy vấn có cấu trúc (SQL) để định nghĩa và điều khiển dữ liệu. Một mặt, nó cực kỳ mạnh mẽ: SQL là một trong những tuỳ chọn linh hoạt và được sử dụng rộng rãi nhất hiện giờ, làm cho nó trở thành một lựa chọn an toàn và đặc biệt tuyệt vời cho những truy vấn phức tạp. Mặt khác, nó cũng có hạn chế, SQL yêu cầucầuu bạn sử dụng các lược đồ được xác định trước để xác định cấu trúc dữ liệu trước khi bạn làm việc với nó. Thêm vào đó, tất cả dữ liệu của bạn phải theo cùng một cấu trúc. Điều này đòi hỏi sự chuẩn bị trước đáng kể và như với thị trấn A, điều đó có nghĩa là một sự thay đổi trong cấu trúc sẽ vừa khó khăn và gây rối cho toàn bộ hệ thống.

### A NoSQL database

Mặt khác, NoSQL database có lược đồ linh hoạt cho dự liệu phi cấu trúc, và dữ liệu được lưu trữ theo nhiều cách: nó có thể được định hướng theo cột, theo hướng tài liệu hay đồ thị hoặc tổ chức dưới dạng key-value. Tính linh hoạt này có nghĩa là:
  - Bạn có thể tạo ra các tài liệu mà không cần định nghĩa cấu trúc của chúng trước.
  - Mỗi tài liệu có thể có cấu trúc riêng của chúng.
  - Cú pháp có thể thay đổi từ database này đến database khác.
  - Và bạn có thể thêm các trường dữ liệu khi bạn muốn.
 
 ### The Scalability
 
 Trong hầu hết các tình huống, SQL database có khả năng mở rộng theo chiều dọc, điều đó có nghĩa là bạn có thể tăng tải trên một máy chủ bằng cách tăng những thứ như CPU, RAM hay SSD. NoSQL database, mặt khác, lại có khả năng mở rộng theo chiều ngang. Điều đó có nghĩa là bạn xử lý nhiều lưu lượng hơn bằng cáh lưu trữ, hoặc thêm vào nhiều máy chủ hơn trong cơ sở dữ liệu. Nó giống như việc thêm nhiều tầng vào cùng một toà nhà so với việc thêm nhiều toà nhà vào bên cạnh toà nhà sẵn có. Điều cuối cùng có thể trở nên lớn hơn và mạnh mẽ hơn, làm cho NoSQL trở thành lựa chọn ưu tiên cho các tập dữ liệu lớn và thường xuyên thay đổi.
 
 ### The Structure
 
 SQL database dựa trên bảng (table-based), trong khi NoSQL lại dựa trên tài liệu (document-based), cặp giá trị key-value, cơ sở dữ liệu dạng đồ thị hoặc wide-column. Điều này làm cho cơ sở dữ liệu quan hệ SQL trở thành một lựa chọn tốt hơn cho các ứng dụng đòi hỏi các giao dịch multi-row chẳng hạn như hệ thống kế toán, hoặc các hệ thống cũ được xây dựng cho cấu trúc quan hệ.
 
 Một số ví dụ về cơ sở dữ liệu SQL như MySQL, Oracle, PostgreSQL và Microsoft SQL Server. NoSQL thì có MongoDB, BigTable, Redis, RavenDB Cassandra, HBase, Neo4j và CouchDB.
 
 ## SQL vs NoSQL: MySQL vs MongoDB
 
 Bây giờ chúng ta đã biết được sự khác biệt về cấu trúc chính giữa SQL và NoSQL, hãy đi sâu vào sự khác biệt giữa hai cơ sở dữ liệu, xem xét cụ thể giữa MySQL và MongoDB.
 
 ### MySQL: Cơ sở dữ liệu quan hệ
 
 Một số lợi ích và điểm mạnh của MySQL:
 
   - **Maturity**: MySQL là một cơ sở dữ liệu cực kỳ trưởng thành, có nghĩa là nó có một cộng đồng lớn, thủ nghiệm rộng rãi và khá ổn định.
   - **Compatibility**: MySQL có sẵn cho tất cả các nền tảng chính, bao gồm Linux, Windows, Mac, BSD và Solaris. Nó cũng có các trình kết nối tới nhiều ngôn ngữ như Node.js, Ruby, C#, C++, Java, Perl, Python và PHP, nghĩa là không có giới hạn trong ngôn ngữ truy vấn SQL.
   - **Cost-effective**: cơ sở dữ liệu mã nguồn mở và miễn phí.
   - **Replicable**: MySQL có thể được sao chép trên nhiều node, nghĩa là khối lượng công việc có thể được giảm và khả năng mở rộng cũng như tính sẵn sàng của ứng dụng có thể được tăng lên.
   - **Sharding**: Mặc dù Sharding không thể thực hiện trên hầu hết các cơ sở dữ liệu SQL, nhưng nó có thể được thực hiện trên MySQL.

### MongoDB: Cơ sở dữ liệu phi quan hệ

Một số lợi ích và điểm mạnh của MongoDB:

  - **Dynamic schema**: nó cho phép bạn lịnh hoạt thay đổi lược đồ cơ sở dữ liệu mà không làm thay đổi dữ liệu hiện có.
  - **Scalability**: có thể mở rộng theo chiều ngang, giúp giảm khối lượng công việc và mở rộng business một cách dễ dàng.
  - **Manageability**: cơ sở dữ liệu không yêu cầu hệ quản trị. Vì nó khá thân thiện với người dùng theo cách này, nó có thể được sử dụng bở cả nhà phát triển và quản trị viên.
  - **Speed**: hiệu năng cao cho những truy vấn đơn giản.
  - **Flexibility**: Bạn có thể thêm các cột hay trường mới trên MongoDB mà không làm ảnh hưởng tới những hàng có sẵn hay hiệu năng ứng dụng.
  
## So Which database is right for your business?

MySQL là một lựa chọn mạnh mẽ cho bất kỳ business nào sẽ được hưởng lợi từ cấu trúc được xác định trước và hệ thống các lược đồ. Ví dụ: các ứng dụng đòi hỏi các giao dịch mutli-row như hệ thống kế toán, hệ thống theo dõi đơn hàng...

MongoDB, mặt khác, là lựa chọn tốt cho những hệ thống có tốc độ phát triển nhanh hoặc cơ sở dữ liệu không có định nghĩa rõ ràng. Cụ thể hơn, nếu bạn không thể định nghĩa một lược đồ cho cơ sở dữ liệu của bạn, nếu lược đồ của bạn thay đổi liên tục như thường thấy với các ứng dụng di động, phân tích theo thời gian thực, hệ thống quản lý nội dung...MongoDB là sự lựa chọn tuyệt vời cho bạn.