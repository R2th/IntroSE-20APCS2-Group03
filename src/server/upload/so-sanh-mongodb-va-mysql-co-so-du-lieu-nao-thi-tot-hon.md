# Giới thiệu
Các cơ sở dữ liệu quan hệ giữ vị trí đi đầu trong nhiều thập kỷ và vào thời gian đó là sự lựa chọn là khá rõ ràng MySQL, Oracle hoặc MS SQL.Chúng đã từng là cơ sở cho hàng tấn ứng dụng doanh nghiệp, trong khi các ứng dụng hiện đại đòi hỏi sự đa dạng và khả năng mở rộng hơn.Các cơ sở dữ liệu phi quan hệ, như MongoDB, đã xuất hiện để đáp ứng các yêu cầu đang tồn tại và thay thế môi trường quan hệ hiện tại.
# MySQL là gì?
![](https://images.viblo.asia/9fb8a344-5959-4d97-9670-5e542ebabb0b.jpg)



MySQL là một hệ thống quản lý cơ sở dữ liệu quan hệ mã nguồn mở (RDBMS) đầy đủ tính năng, ban đầu được xây dựng bởi MySQL AB và hiện đang thuộc sở hữu của Tập đoàn Oracle.
Nó Lưu trữ dữ liệu trong các bảng cái mà được nhóm vào cơ sở dữ liệu, sử dụng Ngôn ngữ truy vấn có cấu trúc (SQL) để truy cập dữ liệu và các lệnh như 'SELECT', UPDATE’, ‘INSERT’ và ‘DELETE’để quản lý .Các thông tin liên quan có thể lưu trữ ở bảng khác, nhưng việc sử dụng các hoạt động JOIN  cho phép bạn tương quan với nó, thực hiện các truy vấn trên các bảng khác nhau và giảm thiểu khả năng trùng lặp dữ liệu.


MySQL tương thích với gần như tất cả các hệ điều hành, cụ thể là Windows, Linux, Unix, Apple, FreeBSD và nhiều hệ điều hành khác..Nó hỗ trợ các công cụ lưu trữ khác nhau như  InnoDB, Federated, MyISAM, Memory, CSV, Archive, Blackhole và Merge.

# MongoDB là gì?

![](https://images.viblo.asia/b64796b2-b25f-4792-9e41-d90550b3c573.png)
MongoDB là một cơ sở dữ liệu hướng tài liệu mã nguồn mở phổ biến được phát triển bởi 10gen, sau này được gọi là MongoDB Inc. Trong trường hợp này, các tài liệu được tạo và lưu trữ trong các tệp BSON, định dạng Binary JSON (JavaScript Object Notation),vì vậy tất cả các loại dữ liệu JS là được hỗ trợ. Trong trường hợp đó, MongoDB thường được áp dụng cho các dự án Node.js. Ngoài ra, JSON cho phép chuyển dữ liệu giữa các máy chủ và ứng dụng web bằng cách sử dụng định dạng có thể đọc được. Nó cũng là một lựa chọn tốt hơn, khi nói đến dung lượng và tốc độ lưu trữ, vì nó mang lại hiệu quả và độ tin cậy cao hơn.

Một trong những lợi ích hàng đầu được MongoDB cung cấp là việc sử dụng các lược đồ động giúp loại bỏ nhu cầu xác định trước cấu trúc, như các trường hoặc các loại giá trị. Mô hình như vậy cho phép biểu diễn mối quan hệ phân cấp, lưu trữ mảng và khả năng thay đổi cấu trúc bản ghi bằng cách thêm hoặc xóa các trường. Giải pháp NoQuery này đi kèm với nhúng,auto-sharding, và on-board replication để có khả năng mở rộng tốt hơn và tính sẵn sàng cao.



# So sánh MySQL và MongoDB :



| | MySQL | MongoDB |
| -------- | -------- | -------- |
| Viết bởi ngôn ngữ  | 	C++, C    | 	C++, C và JavaScript   |
| Kiểu  | 	RDBMS(Hệ thống quản lý cơ sở dữ liệu quan hệ | 	Hướng tài liệu  |
| Các điểm chính  | 	Table  , Row ,Column | 	Collection , Document, Field |
|License| GPL v2 / Giấy phép thương mại có sẵn OD | OD	GNU AGPL v3.0 / Giấy phép thương mại có sẵn OD |
| Lược đồ  | 	Strict| 	Dynamic |
|Scaling | 	Theo chiều dọc| 	Theo chiều ngang |
|Các tính năng chính | Tìm kiếm và đánh chỉ số full text ,Hỗ trợ nhân rộng tích hợp, Trigger, SubSELECT,Truy vấn bộ nhớ đệm,Hỗ trợ SSL,Hỗ trợ Unicode,Công cụ lưu trữ khác nhau với các đặc tính hiệu suất khác nhau| 	Auto-sharding,Native replication,Hỗ trợ mô hình dữ liệu nhúng,Chỉ số phụ toàn diện,Hỗ trợ ngôn ngữ truy vấn phong phú,Hỗ trợ công cụ lưu trữ khác nhau|
|Sử dụng tốt nhất cho | 	Cấu trúc dữ liệu phù hợp với bảng và hàng,Sự phụ thuộc mạnh mẽ vào,các giao dịch nhiều hàng,Cập nhật thường xuyên và sửa đổi khối lượng lớn bản ghi,Bộ dữ liệu tương đối nhỏ   | 	Tải ghi cao,Lược đồ không ổn định,DB của bạn được thiết lập để phát triển lớn,Dữ liệu dựa trên vị trí,HA (tính sẵn sàng cao) trong môi trường không ổn định là bắt buộc,Không có quản trị viên cơ sở dữ liệu (DBA) |


# MySQL và MongoDB: ưu và nhược điểm

So sánh hiệu năng MongoDB và MySQL là khó khăn, vì cả hai hệ thống quản lý đều cực kỳ hữu ích và sự khác biệt cốt lõi làm nền tảng cho các hoạt động cơ bản và cách tiếp cận ban đầu của chúng. Tuy nhiên, MongoDB vs MySQL là một đối số nóng đang diễn ra trong một thời gian: cơ sở dữ liệu quan hệ trưởng thành chống lại một hệ thống phi quan hệ trẻ. Cả hai đều là nguồn mở và dễ dàng có sẵn, cũng như cả hai hệ thống cung cấp các phiên bản thương mại với hàng tấn các tính năng bổ sung.


|MySQL ưu điểm | MongoDB ưu điểm |
| -------- | -------- | -------- |
|Hỗ trợ giao dịch Atomic,Hỗ trợ  JOIN,Giải pháp Mature,Hệ thống bảo mật đặc quyền và mật khẩu    | Xác thực tài liệu,Công cụ lưu trữ tích hợp,Rút ngắn thời gian giữa thất bại chính và phục hồi|
|MySQL nhược điểm| MongoDB nhược điểm |
|Mở rộng quy mô,Mối quan tâm ổn định,Phát triển dựa vào cộng đồng |  Không phải là lựa chọn tốt nhất cho các ứng dụng có giao dịch phức tạp,Không phải là một thay thế snap-in cho các giải pháp cũ,Giải pháp trẻ |

# Chọn cơ sở dữ liệu nào?
MongoDB thu hút người dùng với triết lý đơn giản và cởi mở, cũng như cộng đồng hợp tác và hữu ích, trong khi người dùng báo cáo chính xác điều ngược lại về MySQL, sau khi mua lại Oracle. Một vấn đề khác với vấn đề thứ hai là chủ sở hữu tập trung vào phát triển MariaDB cùng với việc từ chối chấp nhận các bản vá cộng đồng và để cung cấp kế hoạch bền vững. Những yếu tố này đã dẫn đến tình trạng bế tắc, mặc dù MySQL vẫn là giải pháp phù hợp cho nhiều công ty trên toàn thế giới.


So sánh tốc độ MongoDB với MySQL, các nhà phát triển lưu ý rằng cái sau thiếu tốc độ và gặp khó khăn với khối lượng dữ liệu lớn, do đó, nó sẽ là lựa chọn tốt hơn cho các công ty có cơ sở dữ liệu nhỏ hơn và tìm kiếm một giải pháp tổng quát hơn. Mặc dù đây là một trong những lợi thế của MongoDB so với MySQL: khả năng đối phó với lượng dữ liệu lớn và không có cấu trúc.

Để trả lời câu hỏi chính: khi nào nên sử dụng MongoDB thay vì MySQL? Bạn cần phải tính đến các yêu cầu dự án của mình và các mục tiêu xa hơn. MySQL được công nhận vì hiệu suất cao, tính linh hoạt, bảo vệ dữ liệu đáng tin cậy, tính sẵn sàng cao và dễ quản lý. Lập chỉ mục dữ liệu phù hợp có thể giải quyết vấn đề với hiệu suất, tạo thuận lợi cho sự tương tác và đảm bảo sự mạnh mẽ. Nhưng nếu dữ liệu của bạn không có cấu trúc và phức tạp, hoặc nếu bạn có thể xác định trước sơ đồ của bạn, thì bạn sẽ chọn tốt hơn cho MongoDB. Và hơn thế nữa, nếu bạn cần xử lý một khối lượng dữ liệu lớn và lưu trữ dưới dạng tài liệu - MongoDB sẽ giúp bạn đáp ứng các thách thức.

Refer: https://da-14.com/blog/mongodb-vs-mysql-comparison-which-database-better