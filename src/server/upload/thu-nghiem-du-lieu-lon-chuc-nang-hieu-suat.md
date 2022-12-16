# Dữ liệu Lớn là gì?
Dữ liệu lớn là tập hợp các tập dữ liệu lớn không thể xử lý bằng các kỹ thuật điện toán truyền thống. Việc kiểm tra các tập dữ liệu này liên quan đến các công cụ, kỹ thuật và khuôn khổ để xử lý. Dữ liệu lớn liên quan đến việc tạo ra, lưu trữ, truy xuất và phân tích dữ liệu đáng chú ý về khối lượng, đa dạng và vận tốc.
### Chiến lược kiểm tra dữ liệu lớn
Kiểm tra ứng dụng Dữ liệu Lớn là việc xác minh việc xử lý dữ liệu của nó nhiều hơn là thử nghiệm các tính năng riêng của sản phẩm phần mềm. Khi nói đến Kiểm tra dữ liệu lớn, hiệu suất và kiểm tra chức năng là chìa khóa.

Trong kỹ thuật kiểm tra dữ liệu lớn, kỹ sư kiểm tra chất lượng xác minh việc xử lý thành công terabyte dữ liệu bằng cách sử dụng cụm hàng hóa và các thành phần hỗ trợ khác.Nó đòi hỏi một mức độ cao của các kỹ năng kiểm tra như là chế biến rất nhanh. Xử lý có thể có ba loại
![](https://images.viblo.asia/52075470-0130-40c7-b699-04137c4e61a2.png)
Cùng với điều này, chất lượng dữ liệu cũng là một yếu tố quan trọng trong thử nghiệm dữ liệu lớn. Trước khi thử nghiệm ứng dụng, nó là cần thiết để kiểm tra chất lượng của dữ liệu và cần được xem xét như là một phần của thử nghiệm cơ sở dữ liệu. Nó liên quan đến việc kiểm tra các đặc điểm khác nhau như sự phù hợp, chính xác, trùng lắp, nhất quán, hiệu lực, đầy đủ dữ liệu, v.v.

Các bước kiểm tra trong việc xác minh các ứng dụng dữ liệu lớn.
Hình dưới đây cung cấp tổng quan mức cao về các giai đoạn trong Thử nghiệm các ứng dụng dữ liệu lớn
![](https://images.viblo.asia/4a6b5ed8-244e-418d-a2ac-2b449b52ae66.png)

Thử nghiệm dữ liệu lớn có thể được chia thành ba bước:

Bước 1: Xác nhận Phân đoạn Dữ liệu

Bước đầu tiên của thử nghiệm dữ liệu lớn, còn được gọi là giai đoạn trước khi Hadoop liên quan đến quá trình xác nhận.

* 	Dữ liệu từ các nguồn khác nhau như RDBMS, weblog, phương tiện truyền thông xã hội, v.v ... cần được xác nhận để đảm bảo rằng dữ liệu chính xác được đưa vào hệ thống
* So sánh dữ liệu nguồn với dữ liệu được đẩy vào hệ thống Hadoop để đảm bảo chúng khớp
* Xác minh dữ liệu đúng được trích xuất và nạp vào vị trí HDFS chính xác.

Các công cụ như Talend , Datameer , có thể được sử dụng để xác thực giai đoạn dữ liệu

Bước 2: Xác nhận "MapReduce"

Bước thứ hai là xác nhận "MapReduce". Trong giai đoạn này, người kiểm tra xác minh tính hợp lệ logic kinh doanh trên mỗi nút và sau đó xác nhận chúng sau khi chạy với nhiều nút, đảm bảo rằng
* Bản đồ Giảm quá trình hoạt động chính xác
* Các quy tắc tập hợp dữ liệu hoặc tách biệt được thực hiện trên dữ liệu
* Các cặp giá trị chính được tạo ra
* Xác thực dữ liệu sau khi Giảm Bản đồ

Bước 3: Giai đoạn Xác nhận Đầu ra

Giai đoạn cuối cùng hoặc thứ ba của Kiểm tra Dữ liệu Lớn là quá trình xác nhận đầu ra.Các tệp dữ liệu đầu ra được tạo và sẵn sàng chuyển sang EDW (Enterprise Data Warehouse) hoặc bất kỳ hệ thống nào khác dựa trên yêu cầu.

Các hoạt động trong giai đoạn thứ ba bao gồm

* 	Để kiểm tra các quy tắc chuyển đổi được áp dụng chính xác
* Để kiểm tra tính toàn vẹn dữ liệu và tải dữ liệu thành công vào hệ thống mục tiêu
* Để kiểm tra rằng không có dữ liệu tham nhũng bằng cách so sánh các dữ liệu mục tiêu với dữ liệu hệ thống tập tin HDFS
### Kiểm tra kiến trúc
Hadoop xử lý khối lượng dữ liệu rất lớn và rất nhiều tài nguyên. Do đó, việc kiểm tra kiến ​​trúc rất quan trọng để đảm bảo thành công cho dự án Big Data của bạn. Hệ thống được thiết kế kém hoặc không đúng có thể dẫn đến sự xuống cấp của hệ thống, và hệ thống có thể không đáp ứng yêu cầu. Atleast, hiệu suất và dịch vụ thử nghiệm Failover nên được thực hiện trong một môi trường Hadoop.

Kiểm tra hiệu suất bao gồm kiểm tra thời gian hoàn thành công việc, sử dụng bộ nhớ, thông lượng dữ liệu và các chỉ số hệ thống tương tự. Mặc dù động cơ của dịch vụ thử nghiệm Failover là xác minh rằng xử lý dữ liệu xảy ra liên tục trong trường hợp không thành công các nút dữ liệu
### Kiểm tra năng suất
Thử nghiệm hiệu suất cho dữ liệu lớn bao gồm hai hành động chính
* 	**Nhập dữ liệu và Xuyên suốt** : Trong giai đoạn này, người kiểm tra xác minh cách hệ thống nhanh có thể tiêu thụ dữ liệu từ nhiều nguồn dữ liệu khác nhau. Thử nghiệm liên quan đến nhận dạng thông điệp khác nhau mà hàng đợi có thể xử lý trong một khung thời gian nhất định. Nó cũng bao gồm dữ liệu nhanh như thế nào có thể được chèn vào kho dữ liệu cơ sở như tốc độ chèn vào một cơ sở dữ liệu Mongo và Cassandra.
* 	**Xử lý dữ liệu**: Nó bao gồm kiểm tra tốc độ truy vấn hoặc bản đồ giảm việc làm được thực hiện. Nó cũng bao gồm việc kiểm tra xử lý dữ liệu một cách độc lập khi lưu trữ dữ liệu cơ bản được phổ biến trong bộ dữ liệu. Ví dụ: chạy Bản đồ Giảm công việc trên HDFS cơ bản
* 	**Hiệu suất của Tiểu hợp phần** : Các hệ thống này được tạo thành từ nhiều thành phần, và nó là điều cần thiết để kiểm tra từng thành phần một cách độc lập. Ví dụ: nhanh chóng được lập chỉ mục và sử dụng thông báo như thế nào, công việc lập bản đồ, hiệu suất truy vấn, tìm kiếm, v.v ...
### Phương pháp kiểm tra hiệu năng
Kiểm tra hiệu suất cho ứng dụng dữ liệu lớn liên quan đến việc kiểm tra khối lượng lớn dữ liệu có cấu trúc và không có cấu trúc, và nó đòi hỏi một phương pháp kiểm tra cụ thể để kiểm tra dữ liệu lớn như vậy.
![](https://images.viblo.asia/a90fbc4e-051d-4bb2-9a7b-c3f2be576012.png)
Thử nghiệm Hiệu suất được thực hiện theo thứ tự này
1.	Quá trình bắt đầu với việc thiết lập các cụm dữ liệu lớn mà là để được kiểm tra cho hiệu suất
2.	Xác định và thiết kế khối lượng công việc tương ứng
3.	Chuẩn bị các khách hàng cá nhân (Custom Scripts được tạo ra)
4.	Thực hiện các bài kiểm tra và phân tích kết quả (Nếu mục tiêu không được đáp ứng thì điều chỉnh các thành phần và thực hiện lại)
5.	Cấu hình tối ưu
### Tham số để kiểm tra hiệu suất
Các tham số khác cần được kiểm tra để kiểm tra hiệu năng là
* Lưu trữ dữ liệu: Cách dữ liệu được lưu trữ trong các nút khác nhau
* 	Biên bản cam kết: Ghi cam kết lớn như thế nào được phép phát triển
* 	Tương tranh: Làm thế nào nhiều chủ đề có thể thực hiện viết và đọc hoạt động
* 	Bộ nhớ đệm: Điều chỉnh cài đặt bộ nhớ cache "hàng bộ nhớ cache" và "bộ nhớ cache chính".
* 	Thời gian chờ: Giá trị cho thời gian chờ kết nối, thời gian chờ truy vấn, v.v.
* 	JVM Tham số: Heap size, thuật toán thu GC, v.v ..
* 	Bản đồ giảm hiệu suất: Phân loại, hợp nhất, v.v ...
* 	Hàng đợi tin nhắn: Tỷ lệ thư, kích thước, v.v ...
### Kiểm tra Nhu cầu Môi trường
Môi trường thử nghiệm cần phụ thuộc vào loại ứng dụng mà bạn đang thử nghiệm. Đối với việc kiểm tra dữ liệu lớn, môi trường thử nghiệm phải bao gồm

* Cần có đủ không gian để lưu trữ và xử lý số lượng lớn dữ liệu
* Nó phải có cluster với các nút và dữ liệu phân tán
* 	Nó nên có CPU tối thiểu và sử dụng bộ nhớ để giữ hiệu suất cao
### Thử nghiệm dữ liệu lớn với Thử nghiệm CSDL truyền thống


| Tính chất  | Kiểm tra cơ sở dữ liệu truyền thống| Thử nghiệm dữ liệu lớn|
| -------- | -------- | -------- |
| Dữ liệu     | Người kiểm tra làm việc với dữ liệu có cấu trúc   | Người kiểm tra hoạt động với cả dữ liệu được cấu trúc cũng như dữ liệu phi cấu trúc    |
|  |Cách tiếp cận kiểm tra được xác định rõ ràng và được kiểm tra về thời gian | Phương pháp thử nghiệm yêu cầu nỗ lực nghiên cứu và phát triển tập trung |
|  |Người kiểm tra có thể lựa chọn chiến lược "lấy mẫu" bằng chiến lược "Xác minh" một cách thủ công bằng công cụ tự động hóa | Chiến lược "lấy mẫu" trong dữ liệu lớn là một thách thức |
| Cơ sở hạ tầng | Nó không đòi hỏi môi trường kiểm tra đặc biệt vì kích thước file bị giới hạn |Nó đòi hỏi môi trường thử nghiệm đặc biệt do kích thước và tệp dữ liệu lớn (HDFS) |
| Công cụ Xác thực |Người kiểm tra sử dụng macrodựa trên Excel hoặc các công cụ tự động hóa dựa trên giao diện người dùng| Không có công cụ được xác định, phạm vi rộng lớn từ các công cụ lập trình như MapReduce đến HIVEQL |
|  | Công cụ kiểm tra có thể được sử dụng với kiến ​​thức hoạt động cơ bản và đào tạo ít hơn. | Nó đòi hỏi một bộ kỹ năng cụ thể và đào tạo để vận hành công cụ kiểm tra. Ngoài ra, các công cụ đang ở giai đoạn mới mẻ của họ và làm thêm giờ nó có thể đến với các tính năng mới. |

### Các công cụ được sử dụng trong các kịch bản dữ liệu lớn


| Cụm dữ liệu lớn | Công cụ Dữ liệu Lớn | 
| -------- | -------- |
| NoSQL    | CouchDB, Cơ sở dữ liệuMongoDB, Cassandra, Redis, ZooKeeper, Hbase    | 
| MapReduce| Hadoop, Hive, lợn, Cascading, Oozie, Kafka, S4, MapR, Flume |
| Lưu trữ |S3, HDFS (Hệ thống tệp phân phối Hadoop) |
| Máy chủ | Đàn hồi, Heroku , đàn hồi, Google App Engine, EC2 |
| Chế biến |R, Yahoo! Ống, Mechanical Turk, BigSheets, Datameer |
# Thách thức trong thử nghiệm dữ liệu lớn
**Tự động hóa**

Tự động thử nghiệm cho dữ liệu lớn đòi hỏi người có chuyên môn kỹ thuật. Ngoài ra, các công cụ tự động không được trang bị để xử lý các sự cố không mong muốn phát sinh trong quá trình thử nghiệm

**Ảo hóa**

Đây là một trong những giai đoạn thử nghiệm. Độ trễ của máy ảo tạo ra các vấn đề về thời gian trong kiểm tra dữ liệu theo thời gian thực. Ngoài ra quản lý hình ảnh trong dữ liệu lớn là một rắc rối.

**Bộ dữ liệu lớn**

* Cần phải xác minh thêm dữ liệu và cần phải làm nhanh hơn.
*  Cần tự động hóa nỗ lực kiểm tra.
*  Cần để có thể kiểm tra trên nền tảng khác nhau
## Thách thức thử nghiệm hiệu năng
* Tập hợp các công nghệ đa dạng : Mỗi tiểu hợp phần thuộc về các công nghệ khác nhau và đòi hỏi sự kiểm tra riêng biệt
* 	Không có các công cụ cụ thể : Không một công cụ nào có thể thực hiện việc kiểm tra đầu cuối. Ví dụ, NoSQL có thể không phù hợp với hàng đợi tin nhắn
* 	Kiểm tra Scripting : Một mức độ cao của kịch bản là cần thiết để thiết kế các kịch bản thử nghiệm và các trường hợp thử nghiệm
* 	Kiểm tra môi trường : Nó cần môi trường thử nghiệm đặc biệt do kích thước dữ liệu lớn
* 	Giải pháp giám sát : Có các giải pháp hạn chế có thể giám sát toàn bộ môi trường
* 	Giải pháp chẩn đoán : Giải pháp tùy chỉnh được yêu cầu để phát triển để khoan các khu vực nút cổ chai về hiệu năng

### ***Tóm lược***

* 	Khi công nghệ dữ liệu và phân tích dữ liệu tiến lên một cấp độ tiếp theo thì việc kiểm tra dữ liệu lớn là không thể tránh khỏi.
* 	Xử lý dữ liệu lớn có thể là Batch, Real-Time, hoặc Interactive
* 	3 giai đoạn thử nghiệm các ứng dụng dữ liệu lớn là
    * 	 Xác thực giai đoạn dữ liệu
    * 	 Xác nhận "MapReduce"
    * 	 Pha xác nhận đầu ra
* 	Thử nghiệm Kiến trúc là giai đoạn quan trọng của Thử nghiệm dữ liệu lớn vì hệ thống được thiết kế kém có thể dẫn đến lỗi chưa từng thấy và sự xuống cấp của hiệu suất
* 	Thử nghiệm hiệu suất cho dữ liệu lớn bao gồm xác minh
    *   Thông lượng dữ liệu
    *   Xử lí dữ liệu
    *   Hiệu suất của tiểu hợp phần
* 	Thử nghiệm dữ liệu lớn rất khác so với Thử nghiệm dữ liệu truyền thống về công cụ Dữ liệu, Cơ sở hạ tầng & Xác nhận
* 	Thử nghiệm kiểm tra dữ liệu lớn bao gồm ảo hóa, kiểm tra tự động và xử lý tập dữ liệu lớn. Thực hiện kiểm tra các ứng dụng dữ liệu lớn cũng là một vấn đề.

Bài viết tham khảo từ: https://www.guru99.com/big-data-testing-functional-performance.html