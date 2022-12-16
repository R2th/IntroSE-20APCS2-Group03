Amazon Web Service ngày càng phát triển và hỗ trợ nhiều tính năng tuyệt vời. Hôm nay chúng ta sẽ cùng tìm hiểu cơ bản về Amazon Relational Database Service (RDS).

### I. Database (Cơ sở dữ liệu) là gì ?
Database là từ được sử dụng phổ biến trong các lĩnh vực thuộc công nghệ thông tin, dữ liệu, lập trình và phần mềm… .Database là cơ sở dữ liệu, là một bộ sưu tập dữ liệu được tổ chức bày bản và thường được truy cập từ hệ thống máy tính hoặc tồn tại dưới dạng tập tin trong hệ quản trị cơ sở dữ liệu. Nó cho phép một ứng dụng lưu, quản lý và truy xuất dữ liệu một cách nhanh chóng

**Relation Database** là cơ sở dữ liệu quan hệ chứa ít nhất một bảng mà bạn có thể hình dung dưới dạng một trang tính trải rộng với các cột và hàng. Trong bảng cơ sở dữ liệu quan hệ, các cột cũng có thể được gọi là thuộc tính và hàng cũng có thể được gọi là bản ghi hoặc bộ giá trị. Có 2 loại **Relation Database**:

**Online Transaction Processing (OLTP)** : Cơ sở dữ liệu OLTP phù hợp với các ứng dụng đọc và ghi dữ liệu thường xuyên, theo thứ tự
nhiều lần mỗi giây. Chúng được tối ưu hóa cho các truy vấn nhanh và những truy vấn đó có xu hướng
thường xuyên và có thể dự đoán được. Tùy thuộc vào kích thước của cơ sở dữ liệu và hiệu suất của nó
yêu cầu, cơ sở dữ liệu OLTP có thể có yêu cầu bộ nhớ cao để nó có thể
lưu trữ các phần được truy cập thường xuyên của bảng trong bộ nhớ để truy cập nhanh. Nói chung, một
máy chủ có bộ nhớ dồi dào và khả năng tính toán xử lý tất cả các lần ghi vào cơ sở dữ liệu OLTP. Cơ sở dữ liệu OLTP sẽ là một ứng cử viên sáng giá để hỗ trợ một hệ thống đặt hàng trực tuyến chuyên xử lý hàng trăm đơn hàng mỗi phút.

 **Online Analytic Processing** : Cơ sở dữ liệu OLAP được tối ưu hóa cho các truy vấn phức tạp dựa trên các tập dữ liệu lớn nên nó
Cơ sở dữ liệu OLAP có xu hướng yêu cầu tính toán và lưu trữ nặng. Trong kho dữ liệu
ứng dụng, thông thường là tổng hợp nhiều cơ sở dữ liệu OLTP vào một cơ sở dữ liệu OLAP duy nhất.
Ví dụ: trong cơ sở dữ liệu OLTP cho hệ thống quản lý nhân viên, dữ liệu nhân viên
có thể được trải rộng trên nhiều bảng. Theo khoảng thời gian đều đặn nhưng không thường xuyên, một nhà kho dữ liệu sẽ tổng hợp các bảng này thành một bảng duy nhất trong cơ sở dữ liệu OLAP. Điều này làm cho nó
dễ dàng hơn để viết các truy vấn dựa trên dữ liệu và giảm lượng thời gian cần thiết để xử lý
một truy vấn như vậy. Với cơ sở dữ liệu OLAP lớn, thông thường nhiều máy chủ cơ sở dữ liệu sẽ
chia sẻ khối lượng tính toán của các truy vấn phức tạp. Trong một quá trình được gọi là phân vùng, mỗi
máy chủ nhận một phần của cơ sở dữ liệu mà nó chịu trách nhiệm.

### II. Relation Database Service
**Amazon Relational Database Service (RDS)** là một dịch vụ cơ sở dữ liệu được quản lý cho phép
bạn chạy hệ thống cơ sở dữ liệu quan hệ trên đám mây. RDS đảm nhận việc thiết lập cơ sở dữ liệu
hệ thống, thực hiện sao lưu, đảm bảo tính sẵn sàng cao và vá phần mềm cơ sở dữ liệu
và hệ điều hành cơ bản. RDS cũng giúp bạn dễ dàng khôi phục từ cơ sở dữ liệu
lỗi, khôi phục dữ liệu và mở rộng quy mô cơ sở dữ liệu của bạn để đạt được mức hiệu suất và khả năng tận dụng mà ứng dụng của bạn yêu cầu.
Để triển khai cơ sở dữ liệu bằng RDS, bạn bắt đầu bằng cách định cấu hình một phiên bản cơ sở dữ liệu,
là một môi trường cơ sở dữ liệu bị cô lập. Một phiên bản cơ sở dữ liệu tồn tại trong một đám mây riêng ảo
(VPC) mà bạn chỉ định, nhưng không giống như phiên bản EC2, AWS quản lý đầy đủ các phiên bản cơ sở dữ liệu.
Bạn không thể SSH vào chúng và chúng không hiển thị trong các phiên bản EC2 của bạn. Để sử dụng Amazon RDS, chúng ta cần biết rõ 1 số điểm sau :

**Database engine** chỉ đơn giản là phần mềm lưu trữ, tổ chức và truy xuất dữ liệu trong một cơ sở dữ liệu. Mỗi cá thể cơ sở dữ liệu chỉ chạy một công cụ cơ sở dữ liệu. RDS cung cấp sáu điều sau đây
công cụ cơ sở dữ liệu để lựa chọn:
- **Mysql** : MySQL được thiết kế cho các ứng dụng OLTP như blog và thương mại điện tử. RDS
cung cấp các phiên bản MySQL Community Edition mới nhất, bao gồm 5.5, 5.6 và 5.7. MySQL
cung cấp hai công cụ lưu trữ — MyISAM và InnoDB — nhưng bạn nên sử dụng công cụ sau vì nó là
chỉ một tương thích với các bản sao lưu tự động do RDS quản lý.
- **MariaDB**:  MariaDB là một thay thế nhị phân thả vào cho MySQL. Nó đã được tạo ra hơn
lo ngại về tương lai của MySQL sau khi Oracle mua lại công ty đã phát triển nó. RDS
cung cấp nhiều phiên bản MariaDB, từ 10.0.17 đến 10.2. MariaDB hỗ trợ
công cụ lưu trữ XtraDB và InnoDB, nhưng AWS khuyên bạn nên sử dụng công cụ sau để tương thích mẹ tối đa với RDS
- **Oracle** : Oracle là một trong những hệ thống quản lý cơ sở dữ liệu quan hệ được triển khai rộng rãi nhất. Một số ứng dụng yêu cầu rõ ràng một cơ sở dữ liệu Oracle.
- **PostgreSQL**:  PostgreSQL tự quảng cáo là nguồn mở tương thích với Oracle nhất
cơ sở dữ liệu. Đây là một lựa chọn tốt khi bạn có các ứng dụng nội bộ đã được phát triển
cho Oracle nhưng muốn giảm chi phí. RDS cung cấp các phiên bản của PostgreSQL từ
9.3.12-R1 đến 10.4-R1.
- **Amazon Aurora**: Aurora là sự thay thế nhị phân thả vào của Amazon cho MySQL và
PostgreSQL. Aurora cung cấp hiệu suất ghi tốt hơn cả hai bằng cách sử dụng lớp tuổi stor được ảo hóa giúp giảm số lần ghi vào bộ nhớ bên dưới. Tùy thuộc vào phiên bản bạn chọn, Aurora tương thích với PostgreSQL hoặc MySQL
nhập và xuất các công cụ và ảnh chụp nhanh. Aurora được thiết kế để cho phép bạn di chuyển liên tục
từ một triển khai hiện có sử dụng một trong hai cơ sở dữ liệu nguồn mở đó. Đối với
Các phiên bản tương thích với MySQL, Aurora chỉ hỗ trợ công cụ lưu trữ InnoDB. Ngoài ra,
Tính năng Aurora Backtrack cho MySQL cho phép bạn, trong vòng vài giây, khôi phục
cơ sở dữ liệu đến bất kỳ thời điểm nào trong vòng 72 giờ qua
- **Microsoft SQL Server** : RDS cung cấp nhiều phiên bản Microsoft SQL Server: 2008 R2,
2012, 2014, 2016 và 2017. Đối với phiên bản, bạn có thể chọn Express, Web, Standard,
và Doanh nghiệp. Sự đa dạng về hương vị giúp bạn có thể di chuyển một SQL Server hiện có
cơ sở dữ liệu từ triển khai tại chỗ sang RDS mà không cần phải thực hiện bất kỳ cơ sở dữ liệu nào
nâng cấp.

**Database Instance Classes** Khi khởi chạy một phiên bản cơ sở dữ liệu, bạn phải quyết định xem nó cần bao nhiêu công suất xử lý, memory, băng thông mạng và thông lượng đĩa. RDS cung cấp nhiều loại cơ sở dữ liệu
các lớp thể hiện để đáp ứng nhu cầu hiệu suất đa dạng của các cơ sở dữ liệu khác nhau. Nếu bạn nhận được
nó sai hoặc nếu nhu cầu của bạn thay đổi, bạn có thể chuyển thể hiện của mình sang một lớp khác. RDS
chia các lớp cá thể cơ sở dữ liệu thành ba loại sau :
- **Standard** : tiêu chuẩn đáp ứng nhu cầu của hầu hết các cơ sở dữ liệu. Phiên bản thế hệ mới nhất
lớp là db.m4, cung cấp tối đa : 256 GB memory, 64 vCPU, 25 Gbps network bandwidth, 10,000 Mbps (1,280 MBps) disk throughput
- **Memory Optimized** : dành cho cơ sở dữ liệu có hiệu suất cao. Cung cấp thêm bộ nhớ cho cơ sở dữ liệu cho phép nó lưu trữ nhiều dữ liệu hơn trong bộ nhớ,
điều này có thể dẫn đến thời gian truy vấn nhanh hơn. Phiên bản thế hệ mới nhất là db.x1e và nó
cung cấp lên đến : 3,904 GB memory,  128 vCPU, 25 Gbps network bandwidth, 14,000 Mbps (1,750 MBps) disk throughput
- **Burst Capable (Burstable)**: để phát triển, thử nghiệm và các cơ sở dữ liệu phi sản xuất khác. Duy nhất
lớp thể hiện có thể bùng nổ có sẵn là db.t2 và nó cung cấp cho bạn tối đa: 32 GB memory , 8v CPU.

**Storage**  việc chọn đúng bộ nhớ cho phiên bản cơ sở dữ liệu của bạn không chỉ đơn thuần là đảm bảo cho bạn
có đủ dung lượng đĩa. Bạn cũng phải quyết định tốc độ lưu trữ phải đáp ứng
yêu cầu hiệu suất của ứng dụng được cơ sở dữ liệu của bạn hỗ trợ. Có 3 loại storage: 
- **General-Purpose SSD** : cung cấp khả năng lưu trữ hiệu quả về chi phí, lý tưởng cho nhiều khối lượng công việc. Các khối lượng này cung cấp độ trễ mili giây một chữ số và khả năng tăng vọt lên 3.000 IOPS trong thời gian dài. Hiệu suất cơ bản cho các ổ này được xác định bởi kích thước của ổ.
- **Provisioned IOPS**: được thiết kế để đáp ứng nhu cầu của khối lượng công việc chuyên sâu vào I / O, đặc biệt là khối lượng công việc cơ sở dữ liệu, yêu cầu độ trễ I / O thấp và thông lượng I / O nhất quán.
- **Magnetic** : Amazon RDS cũng hỗ trợ lưu trữ từ tính để tương thích ngược. Chúng tôi khuyên bạn nên sử dụng SSD Mục đích Chung hoặc IOPS được cung cấp cho bất kỳ nhu cầu lưu trữ mới nào. Số lượng bộ nhớ tối đa được phép cho các phiên bản DB trên bộ nhớ từ tính ít hơn so với các loại bộ nhớ khác

Trên là một số kiến thức cơ bản cần biết trước khi sử dụng Amazon Relation Database Service (RDS). Hy vọng nó sẽ giúp ích được cho các bạn. 

https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html