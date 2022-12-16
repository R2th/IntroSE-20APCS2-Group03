## NoSQL

![](https://images.viblo.asia/31f09fd0-0eb2-44a6-b3c3-f4231bd55324.jpg)

### 1. NoSQL là gì ?

**NoSQL** viết tắt của **Not Only SQL** hay **Not SQL**, là một hệ thống quản lý phân phối (**DMS**) cho các mô hình dữ liệu ***phi quan hệ***, có cấu trúc linh hoạt, API đơn giản và cũng dễ dàng mở rộng, phù hợp với các ứng dụng hiện đại với số lượng dữ liệu phân tán khổng lồ hay các web thời gian thực.

![](https://images.viblo.asia/2a076679-c782-4d75-ae45-25c8f7bdaaac.png)

Thuật ngữ này được giới thiệu lần đầu tiên năm 1998 và từ đó được gọi chung cho các lightweight cơ sở dữ liệu quan hệ mã nguồn mở nhưng không sử dụng truy vấn SQL. Đến năm 2009, NoSQL được giới thiệu lại trong một hội thảo về CSDL mã nguồn mở phân tán bởi Eric Evans, đã đánh dấu bước phát triển mới cho thế hệ cơ sở dữ liệu: ***phân tán*** (distributed) và ***phi quan hệ*** (non-relational).

NoSQL bao gồm một loạt các công nghệ cơ sở dữ liệu khác nhau được phát triển để đáp ứng các yêu cầu lưu trữ dữ liệu có cấu trúc, bán cấu trúc, không cấu trúc hay đa hình của các ứng dụng hiện đại.

### 2. Tại sao lại là NoSQL?

**RDBMS** được sử dụng rất rộng trong các ứng dụng không chỉ bởi tính **ACID**, nhất quán và toàn vẹn cho dữ liệu, ... mà còn bởi cộng đồng support vô cùng mạnh mẽ. Tuy nhiên, nó vẫn còn tồn tại nhiều khuyết điểm, mà quan trọng nhất đó chính là vấn đề về hiệu năng: thời gian phản hồi của hệ thống sẽ trở nên ***chậm*** khi khối lượng dữ liệu ngày càng mở rộng, yêu cầu thay đổi, cập nhật dữ liệu nhanh chóng ngày càng tăng.

Để giải quyết vấn đề này, chúng ta có thể "mở rộng" (**scale-up**) hệ thống bằng cách nâng cấp phần cứng hiện có, nhưng quá trình này rất tốn kém và không triệt để. Ngoài ra, **RDBMS** được thiết kế chỉ để chạy trên một máy chủ (***master***), nên khi muốn mở rộng, nó sẽ rất khó để thực thi trên nhiều cụm khác (***clustering***).

![](https://images.viblo.asia/552a4497-1bfc-4533-b722-423eaffc1812.png)

**NoSQL** xuất hiện đã giải quyết những thiếu sót trên của CSDL quan hệ. <br>Được phát triển dựa trên ý tưởng về những CSDL với thiết kế đơn giản, nhưng có khả năng lưu trữ dữ liệu cực lớn cùng cấu trúc linh hoạt, truy vấn dữ liệu tốc độ cao cho kết quả nhanh chóng mà không cần quá nhiều yêu cầu về phần cứng cũng như các tài nguyên hệ thống, tăng khả năng chịu lỗi.

**NoSQL DB** là cơ sở dữ liệu phi quan hệ, vì vậy nó có khả năng "nhân rộng" (**scale-out**), mở rộng theo "***chiều ngang***" cho các cụm máy chủ đơn giản tốt hơn RDBMS khi cần phân phối tải CSDL bất cứ khi nào tải tăng, giúp kiểm soát tính khả dụng tốt hơn.

![](https://images.viblo.asia/b3b7a2c0-3b04-49e3-beaa-cd8f3f40de72.png)

### 3. Ưu điểm

- NoSQL DB có khả năng mở rộng theo chiều ngang và cung cấp hiệu năng vượt trội, nó giải quyết tốt một số vấn đề mà RDBMS không giải quyết được như:
    - Vấn đề về việc thay đổi dữ liệu một cách nhanh chóng với khối lượng lớn, cập nhật liên tục ở một thời điểm, những dữ liệu này có dạng cấu trúc, bán cấu trúc, không cấu trúc hay đa hình.
    - Xử lý dữ liệu đa dạng và phức tạp với hiệu quả như nhau.
    - Cung cấp một thiết kế lược đồ linh hoạt có thể dễ dàng thay đổi mà không có thời gian chết hoặc gián đoạn.
    - Khi làm việc với mô hình Agile, các sprints lặp lại nhanh và cần push code thường xuyên.
    - Lập trình hướng đối tượng, dễ dùng và linh hoạt.
    - Sử dụng kiến trúc quy mô phân tán theo vị trí địa lý thay vì kiến trúc nguyên khối tốn kém.
    - Không cần máy chỉ hiệu năng cao chuyên dụng.
- Không giới hạn lưu trữ dữ liệu và người dùng hệ thống (***High Scalability***).
- NoSQL chấp nhận lưu trữ dữ liệu trùng lặp nên khi một node (commodity machine) nào đó bị chết cũng sẽ không ảnh hưởng tới toàn bộ hệ thống (***High Availability - HA***), khả năng tái tạo dễ dàng.
- Mô hình hóa, truy vấn và deploy linh hoạt, việc bổ sung thêm/loại bỏ các node, hệ thống sẽ tự động nhận biết để lưu trữ mà không cần phải can thiệp thủ công.
- Thiết kế phân tán nên NoSQL giảm thiểu tối đa được các phép tính toán, I/O liên quan kết hợp với batch processing đảm bảo đủ xử lý các yêu cầu dữ liệu.
- Có thể đảm nhận vai trò như một nguồn dữ liệu chính cho các ứng dụng trực tuyến.

### 4. Nhược điểm

- NoSQL chấp nhận tính nhất quán yếu do vậy cập nhật mới không đảm bảo rằng các truy xuất sau đó sẽ thấy ngay được sự thay đổi. Sau một khoảng thời gian lan truyền (không xác định) thì tính nhất quán cuối cùng của dữ liệu mới sẽ được đảm bảo.
- Không có quy tắc chuẩn hóa và lược đồ cụ thể nên trách nhiệm sẽ được chuyển từ CSDL sang các nhà phát triển ứng dụng.
- Khả năng truy vấn hạn chế, không hoạt động tốt với dữ liệu quan hệ.
- Khi khối lượng dữ liệu tăng lên, rất khó để duy trì các giá trị duy nhất.
- Hạn chế kỹ năng chuyên môn mở một mức nào đó đối với người sử dụng, các nhà phát triển mới.
- Khó khăn khi thay đổi hệ thống trong quá trình làm việc.

### 5. Một số loại NoSQL Databases

![](https://images.viblo.asia/ec4d2708-e95f-4c4e-80f7-6aa655316077.png)

Hiện nay có khá nhiều ***NoSQL Database Management System*** như MongoDB, RavenDB, Redis, Neo4J, … Nhưng chủ yếu có thể chia thành 4 loại, mỗi loại đều có các thuộc tính và giới hạn riêng, và chúng ta nên cân nhắc lựa chọn một CSDL phù hợp nhất với các yêu cầu của ứng dụng trước khi sử dụng chúng.

- ***Document databases***: ghép cắp từng key với một cấu trúc dữ liệu phức tạp được gọi là document. Document có thể chứa nhiều cặp key-value, hoặc cặp key-array khác nhau, hoặc thậm chí là các documents lồng nhau.
- ***Graph stores*** (như Neo4J, Giraph): Một cơ sở dữ liệu kiểu đồ thị lưu trữ các thực thể cũng như các mối quan hệ giữa các thực thể đó. Thực thể được lưu trữ dưới dạng một node với mối quan hệ là các cạnh. Một cạnh biểu thị một mối quan hệ giữa các node. Mỗi node và cạnh có một định danh duy nhất. Graph stores được sử dụng để lưu trữ thông tin về các mạng dữ liệu, chẳng hạn như các social connections, logistics, dữ liệu không gian, ... 
- ***Key-value stores***: là các cơ sở dữ liệu NoSQL đơn giản nhất. Mỗi item trong cơ sở dữ liệu được lưu trữ dưới dạng tên thuộc tính (hoặc key) duy nhất, cùng với giá trị của nó, có thể có dạng JSON, BLOB, string, ... Nó được thiết kế theo cách như vậy để có thể xử lý nhiều dữ liệu và tải nặng.
- ***Wide-column stores*** (như Cassandra, HBase):  lưu trữ dữ liệu theo dạng cột thay vì các hàng, mỗi cột được xử lý riêng biệt. Giá trị của CSDL cột đơn được lưu trữ liên tục và tối ưu hóa cho các truy vấn trên các bộ dữ liệu (dataset) lớn như quản lý kho dữ liệu, kinh doanh thông minh, CRM, danh mục thẻ thư viện.

### 6. SQL vs NoSQL

| RDBMS |NoSQL| 
|---|---|
| Sử dụng ngôn ngữ truy vấn SQL  |  Không sử dụng SQL, không khai báo ngôn ngữ truy vấn |
| Dữ liệu có cấu trúc, có tổ chức  | Dữ liệu đa dạng, có thể có cấu trúc, bán cấu trúc, không cấu trúc, đa hình, … <br>Dữ liệu phi quan hệ và không thể đoán trước |
| Có định nghĩa schema cụ thể  | Không định nghĩa schema, cấu trúc linh hoạt  |
|Dữ liệu và các quan hệ được lưu trữ trong các bảng riêng biệt | Document databases, Graph stores, Key-value stores, Wide-column stores|
|Có tính chặt chẽ nhưng khó mở rộng|Ưu tiên cho hiệu năng, tính sẵn sàng cao và khả năng mở rộng, dễ dàng phân tán|
|MySQL, PostGreSQL, Microsoft SQL Server, Oracle, ...|MongoDB, RavenDB, Amazon DynamoDB, Riak, ...|

## MongoDB

![](https://images.viblo.asia/1c7666d2-fdbe-425f-b96f-3f7ee373db04.png)

### 1. MongoDB là gì?

**MongoDB** là một cơ sở dữ liệu document mã nguồn mở, đa nền tảng với khả năng mở rộng và hiệu năng cao cùng tốc độ truy vấn dữ liệu vượt trội với chỉ mục, và là CSDL hàng đầu của **NoSQL**, được viết bằng C++.

### 2. Tại sao nên sử dụng MongoDB?

- MongoDB lưu trữ dữ liệu định hướng document một cách linh hoạt, định dạng JSON, điều này có nghĩa là các trường có thể được thay đổi từ document này sang document khác và cấu trúc dữ liệu có thể được thay đổi theo thời gian, cập nhật nhanh chóng.
- Document model ánh xạ tới các objects trong code giúp dễ dàng làm việc với dữ liệu.
- Truy vấn đặc biệt, đa dạng, lập chỉ mục và tổng hợp theo thời gian thực cung cấp các phương thức mạnh mẽ giúp truy cập và phân tích dữ liệu. Index được đánh trên bất kỳ thuộc tính.
- MongoDB là một cơ sở dữ liệu phân tán, vì vậy tính sẵn sàng cao, nhân rộng tích hợp theo chiều "ngang" và phân tán theo vị trí địa lý có thể dễ dàng xây dựng và sử dụng. Tự động sharding, bảo vệ end-to-end và chuyển đổi dự phòng.
- MongoDB là một công cụ quản lý để tự động hóa, giám sát và sao lưu.
- MongoDB là miễn phí.

![](https://images.viblo.asia/50fdb356-8f3a-4b91-960d-3b33a0fa3cb3.png)

### 3. Khi nào nên sử dụng MongoDB?

- Hệ thống Big Data yêu cầu truy vấn nhanh.
- Hệ thống thời gian thực yêu cầu phản hồi nhanh.
- Hệ thống có lượng request lớn, thương mại điện tử.
- Các hệ thống mà server không có RDBMS.
- Quản lý và phân phối nội dung.
- Cơ sở hạ tầng di động và xã hội.
- Quản lý dữ liệu người dùng.
- Quản lý cấu hình.
- Data Hub.
- Duy trì dữ liệu dựa trên vị trí - dữ liệu không gian địa lý.
- Hệ thống cấu trúc không chặt chẽ - thiết kế có thể thay đổi theo thời gian.

### 4. Khi nào không nên sử dụng MongoDB?

- Hệ thống cần sử dụng nhiều transaction (như ngân hàng) do MongoDB không có cơ chế transaction.
- Các hệ thống cần sử dụng joins (SQL).
- Hệ thống có cấu trúc, thiết kế chặt chẽ, khó phá bỏ.

### 5. Ưu điểm

- Ít lược đồ: MongoDB là một cơ sở dữ liệu hướng document trong đó một collection chứa các document khác nhau. Số lượng trường, nội dung và kích thước của document có thể khác nhau từ document này sang document khác. Dữ liệu không đồng nhất, không ràng buộc.
- Trường “_id” luôn được tự động đánh index giúp tốc độ truy vấn thông tin đạt hiệu năng cao nhất.
- Cấu trúc của một đối tượng được biểu diễn rõ ràng dưới dạng JSON.
- Hỗ trợ dữ liệu không gian địa lý.
- Không joins phức tạp.
- Khả năng truy vấn sâu: MongoDB hỗ trợ các truy vấn động trên các documents bằng ngôn ngữ truy vấn hướng document mạnh mẽ tương tự như SQL.
- Khả năng điều chỉnh, dễ phân tán.
- Dễ mở rộng theo chiều ngang, hiệu năng cao, tính sẵn sàng cao.
- Linh hoạt: cập nhật các trường sẽ ít hoặc không ảnh hưởng tới ứng dụng.
- Tích hợp dễ dàng với Big Data Hadoop.
- Chuyển đổi/ánh xạ các đối tượng trong ứng dụng thành các đối tượng cơ sở dữ liệu không cần thiết.
- Phân tán đám mây như AWS, Microsoft, RedHat,dotCloud and SoftLayer, ...
- Sử dụng bộ nhớ trong để lưu trữ bộ làm việc, cho phép truy cập dữ liệu nhanh hơn. Khi truy vấn dữ liệu, bản ghi kết quả được cached trên RAM, giúp lần truy vấn sau nhanh hơn mà không cần đọc lại từ ổ cứng.

### 6. Nhược điểm

- MongoDB không có các tính chất ràng buộc mạnh mẽ như trong RDBMS (ACID) nên khi thao tác với MongoDB cần hết sức cẩn thận.
- Không hỗ trợ transaction hoặc transaction rất phức tạp.
- Không hỗ trợ join nên dễ trùng lặp dữ liệu.
- Sử dụng nhiều bộ nhớ do dữ liệu lưu dưới dạng key-value, các collection chỉ khác về value và key bị lặp lại.
- Giới hạn kích thước bản ghi (< 16Mb).
- Khi cập nhật dữ liệu, MongoDB sẽ không cập nhật ngay xuống ổ cứng, sau 60s mới thực hiện ghi toàn bộ dữ liệu thay đổi từ RAM sang ổ cứng. Do vậy, sẽ có khả năng mất dữ liệu khi xảy ra các trường hợp không mong muốn.
- Không hỗ trợ function/stored procedure để ràng buộc logic.

### 7. Các khái niệm cơ bản trong MongoDB

![](https://images.viblo.asia/b27dc846-28cb-4980-b6c8-80f44f4b313d.png)

Bất kỳ cơ sở dữ liệu quan hệ nào cũng có thiết kế lược đồ điển hình hiển thị số lượng bảng và mối quan hệ giữa các bảng này. Trong khi ở MongoDB, không có khái niệm về mối quan hệ.

![](https://images.viblo.asia/e79a2d11-1008-4c7a-b71d-5c5841877d7b.png)

Một server MongoDB thường có nhiều CSDL. CSDL là một container vật lý chứa các collections.
- Collection: là một tập hợp các documents, tương tự như table trong RDBMS. Nó được lưu trữ trong một database và không thực thi schema. <br>Các documents trong cùng một collection có thể có liên quan hoặc mục tiêu tương tự nhau, nhưng có thể chứa các trường khác nhau. Các trường chung giữa các document của collection có thể chứa các loại dữ liệu khác nhau.
- Document: là một tập hợp các cặp key-value, có schema linh hoạt.
     - **_id**: định danh của một document, mặc định là một số hexadecimal 12 bytes giúp đảm bảo tính duy nhất của mọi document. Tuy nhiên, cũng có thể cung cấp _id khi insert document. 

![](https://images.viblo.asia/00e8c177-cd38-46e2-a326-be33510a4ac7.png)

### 8. Một số lệnh truy vấn cơ bản 

|Truy vấn|MongoDB|MySQL|
|---|---|---|
|Tạo DB|use db_name;|CREATE DATABASE db_name;|
|Xóa DB|db.dropDatabase();|DROP DATABASE db_name;|
|Tạo bảng|db.createCollection('t_name');|CREATE TABLE t_name (c1_name c1_type, c2_name c2_type ...);|
|Xóa bảng|db.t_name.drop();|DROP TABLE t_name;|
|Chèn bảng|db.t_name.insert({c1_name: c1_value, c2_name: c2_type, ...});|INSERT INTO t_name (c1_name, c2_name, ...) VALUES (c1_type, c2_type, ...);|
|Cập nhật|db.t_name.update({ _id: id_value }, { $set: { c_name: c_new_value } });|UPDATE t_name SET c_name = c_new_value WHERE id = c_id;|
|Xóa|db.t_name.remove({_id: id_value});|DELETE FROM t_name WHERE id = c_id;|
|Xóa all|db.t_name.deleteMany();|DELETE FROM t_name;|
|Tìm all|db.t_name.find();|SELECT * FROM t_name;|
|Tìm theo trường|db.t_name.find({c_name: c_value});|SELECT * FROM t_name WHERE c_name = c_value;|

### 9. So sánh MongoDB với một số CSDL khác

[Redis - MySQL - MongoDB](https://viblo.asia/p/so-sanh-redis-mysql-va-mongodb-Az45br265xY)

### 10. Tham khảo

1. [What is MongoDB?](https://www.mongodb.com/what-is-mongodb)
2. [NoSQL](https://www.mongodb.com/nosql-explained)