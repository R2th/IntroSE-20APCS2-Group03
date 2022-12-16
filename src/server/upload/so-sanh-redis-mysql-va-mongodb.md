![](https://images.viblo.asia/81264e09-7710-43f9-a9f7-bf235ff3c64c.png)
### 1. Số liệu thống kê
| Số liệu | Redis | Mongodb|MySQL|
| -------- | -------- | -------- |--------|
| Github Stars     | 38.8k     | 16.7k     |4.3k|
|Github Forks|15.1k|4.2k|1.7k|
|Last commit|20h|15h|19h|
|Hacker News Points|855|623|1.1k|
|Reddit Points|245|782|9.7k|
|StackOverflow questions|16.7k|118.5k|572.1k|
### 2. Cấu trúc cơ sở dữ liệu
| Redis | Mongodb|MySQL|
| -------- | -------- |--------|
|- Key-value store.<br>- Redis là một mã nguồn mở, BSD licensed, lưu trữ dữ liệu dưới dạng key-value trong bộ nhớ. <br>- Nó thường được gọi là máy chủ cấu trúc dữ liệu vì các key có thể chứa chuỗi, băm, danh sách, set và sorted-set.<br>- Cấu trúc này khác với các cơ sở dữ liệu quan hệ có các bảng, hàng và cột; có thể gây khó khăn cho một số bộ đệm SQL truyền thống tới master.|- Document store.<br>- MongoDB lưu trữ dữ liệu trong các document tương tự như JSON và có thể thay đổi về cấu trúc, cung cấp một schema linh hoạt, năng động. <br>- Trong Mongodb collection của document không có cấu trúc được xác định trước và các column có thể thay đổi cho các document khác nhau.<br>- MongoDB cũng được thiết kế để có tính sẵn sàng và khả năng mở rộng cao, với tính năng sao chép và tự động tích hợp sẵn.|- Relational DBMS.<br>- MySQL cung cấp một máy chủ cơ sở dữ liệu quan hệ SQL (Ngôn ngữ truy vấn có cấu trúc) rất nhanh, đa luồng, đa người dùng và mạnh mẽ. <br>- MySQL Server được thiết kế cho các hệ thống sản xuất tải trọng nặng, nhiệm vụ quan trọng cũng như nhúng vào phần mềm được triển khai hàng loạt.|
### 3.  Một số database models khác
| Redis | Mongodb|MySQL|
| -------- | -------- |--------|
|Document store <br>Graph DBMS <br>Search engine <br>Time Series DBMS|X|Document store |
### 4. Tại sao nên sử dụng?
| Redis | Mongodb|MySQL|
| -------- | -------- |--------|
|- Cơ sở dữ liệu NoSQL.<br>- Dễ cài đặt, sử dụng, deploy và duy trì.<br>- Lưu trữ dữ liệu trong bộ nhớ nên cho hiệu năng cao và tốc độ nhanh.<br>- Mã nguồn mở, ổn định, chi phí hiệu quả.<br>- Tính mở rộng và sẵn sàng cao, sao chép bất đồng bộ, …<br>- Tích hợp dễ dàng với Sidekiq cho Rails background job.<br>- Cấu trúc dữ liệu đa dạng, ...|- Một trong những document store phổ biến nhất.<br>- NoSQL.<br>- Dễ dàng setup, sử dụng cũng như duy trì.<br>- Mã nguồn mở, miễn phí, đáng tin cậy có tốc độ và hiệu năng nhanh.<br>- Khả năng linh hoạt, mở rộng, sẵn sàng cao, có khả năng auto-sharding.<br>- Hỗ trợ đầy đủ index, tốc độ cập nhật nhanh chóng.|- RDBMS mã nguồn mở được sử dụng rộng rãi.<br>- Cơ sở dữ liệu SQL.<br>- Mã nguồn mở miễn phí, dễ sử dụng, khả năng tương thích cao, hỗ trợ đa nền tảng, cộng đồng phát triển mạnh mẽ.<br>- Hỗ trợ index và full-text searching.<br>- Nhanh, sẵn có và bảo mật.<br>- Một RDBMS mạnh mẽ có số lượng ứng dụng gần như không giới hạn.|
### 5. Khi nào nên sử dụng?
| Redis | Mongodb|MySQL|
| -------- | -------- |--------|
|- Dữ liệu key-value.<br>- Caching.<br>- Lo lắng và có thời gian cân nhắc thiết kế cơ sở dữ liệu.<br>- Thực sự cần hiệu năng cao.<br>- Không quan tâm nhiều tới scaling, kích thước dữ liệu ổn định.|- Dữ liệu phức tạp, lớn, đang phát triển.<br>- Linh hoạt, dễ để học.<br>- Prototyping, Startups, Hackathons<br>- Không quan tâm lắm về cơ sở dữ liệu.<br>- Cần thay đổi schema nhanh chóng.<br>- Các hệ thống realtime (thời gian thực) yêu cầu phản hồi nhanh, bigdata với yêu cầu truy vấn nhanh, có tần suất write/insert lớn.<br>- Sử dụng làm search engine.|- Cơ sở dữ liệu quan hệ.<br>- Khi có các hoạt động phân tán.<br>- Cần bảo mật cao và hoạt động đơn giản.<br>- các giải pháp tùy chỉnh.<br>- Không nên sử dụng khi dữ liệu lớn dần và không thể cache hết lên memory.<br>- Cần tuân thủ SQL và sự thi hành đồng thời.|
### 6. Nhược điểm
| Redis | Mongodb|MySQL|
| -------- | -------- |--------|
|- Vì Redis sử dụng RAM làm bộ nhớ cho mình nên khi lượng file cache lớn thì sẽ dẫn đến trường hợp thiếu RAM cho Server.<br>- Không thể truy vấn trực tiếp các object.|- Không hỗ trợ JOIN.<br>- Dữ liệu dễ bị sai ro không có ràng buộc.<br>- Sử dụng nhiều bộ nhớ và giới hạn kích thước bản ghi (< 16Mb).|- Thuộc sở hữu của một công ty với dự thảo riêng của họ.<br>- Cần bổ sung thêm nhiều tính năng doanh nghiệp như các công cụ và tính năng mở rộng.<br>- Nhiều report về vấn đề lưu trữ procedures và triggers, xử lý transaction không hiệu quả.<br>- Phát triển chậm từ khi bị mua lại.|
### 7. Các công ty đã sử dụng
| Redis | Mongodb|MySQL|
| -------- | -------- |--------|
|Airbnb, Uber Technologies, Instagram, Medium, Pinterest, Twitter, Reddit, Slack, Instacart, Lyft, Stack Exchange, Shopify, StackShare, Udemy, DigitalOcean , Samsung ...|Uber Technologies, Lyft, Codecademy, MIT, Rainist, CircleCI, Bodybuilding.com, OpenGov, Hootsuite, Keen, Trello, 500px, nrise, OpenTable, eBay ...|Airbnb, Uber Technologies, Netflix, Dropbox, Pinterest, Twitter, Slack, Shopify, LinkedIn, Coursera, Udemy, DigitalOcean, 9GAG, Asana, Yelp ...|
### 8. Công cụ tích hợp
| Redis | Mongodb|MySQL|
| -------- | -------- |--------|
|Datadog, Presto, EasyEngine, Heroku Redis, Spring Data, Tyk Cloud, OpsDash, SignalFx ...|Datadog, Mongoose, Metabase, MongoDB Atlas, JSON, Azure Cosmos DB, Presto, Redash ...|Travis CI, Slick, Datadog, Composer, Metabase, Amazon RDS for Aurora, Sequelize, JSON ...|
### 9. Một số tiêu chí khác
|Tiêu chí| Redis | Mongodb|MySQL|
|--------| -------- | -------- |--------|
|Website và tài liệu|https://redis.io/<br>https://redis.io/documentation | https://www.mongodb.com/<br>https://docs.mongodb.com/manual/ | https://www.mysql.com/ <br>https://dev.mysql.com/doc/ |
Năm phát hành|2009|2009|1995|
|Nhà phát triển|Salvatore Sanfilippo|MongoDB, Inc|Oracle |
|Phiên bản phát hành hiện tại|5.0.5, May 2019|4.0.10, May 2019|8.0.17, July 2019|
|Chỉ dựa trên cloud|Không|Không|Không|
|Ngôn ngữ thực thi|C|C++|C and C++|
|Hệ điều hành máy chủ|BSD<br>Linux<br>OS X<br>Windows |Linux<br>OS X<br>Solaris<br>Windows|FreeBSD<br>Linux<br>OS X<br>Solaris<br>Windows|
|Data scheme|Schema-free|Schema-free|Có|
|Typing |Một phần|Có|Có|
|Hỗ trợ XML|Không|X|Có|
|Secondary indexes|Có|Có|Có|
|SQL|Không|Các truy vấn SQL chỉ đọc qua trình kết nối MongoDB cho BI|Có|
|API và các phương thức truy cập khác|Proprietary protocol|Proprietary protocol using JSON|Proprietary native API<br>ADO.NET<br>JDBC<br>ODBC|
|Hỗ trợ các ngôn ngữ lập trình|C, C#, C++, Clojure, Crystal, D, Dart, Elixir, Erlang, Fancy, Go, Haskell, Haxe, Java, JavaScript (Node.js), Lisp, Lua, MatLab, Objective-C, OCaml, Pascal, Perl, PHP, Prolog, Pure Data, Python, R, Rebol, Ruby, Rust, Scala, Scheme, Smalltalk, Swift, Tcl, Visual Basic|Actionscript , C, C#, C++, Clojure, ColdFusion, D, Dart, Delphi, Erlang, Go, Groovy, Haskell, Java, JavaScript, Lisp, Lua, MatLab, Perl, PHP, PowerShell, Prolog, Python, R, Ruby, Scala, Smalltalk |Ada, C, C#, C++, D, Delphi, Eiffel, Erlang, Haskell, Java, JavaScript (Node.js), Objective-C, OCaml, Perl, PHP, Python, Ruby, Scheme, Tcl|
|Server-side scripts |Lua|JavaScript| Có|
|Triggers|Không|Không|Có|
|Phân vùng|Sharding|Sharding|Phân vùng ngang, sharding với MySQL Cluster hoặc MySQL Fabric|
|Replication|Master-slave <br>Multi-master|Master-slave|Master-master <br>Master-slave|
|MapReduce |Không|Có|Không|
|Khái niệm nhất quán|- Sự nhất quán cuối cùng mạnh với CRDT.<br>- Tính nhất quán cuối cùng.|- Tính nhất quán cuối cùng.<br>- Tính nhất quán ngay lập tức.|- Tính nhất quán ngay lập tức.|
|Foreign keys |Không|Không|Có|
|Transaction|Khóa tối ưu, thực thi nguyên tử các khối lệnh và tập lệnh.|Multi-document ACID Transactions với snapshot isolation.|ACID |
|Concurrency |Có|Có|Có|
|Durability |Có|Có|Có|
|In-memory|Có|Có|Có|
|User|Kiểm soát truy cập dựa trên mật khẩu đơn giản.|Quyền truy cập cho user và role.|User có khái niệm ủy quyền chi tiết.|
### 10. Lãi suất theo thời gian
![](https://images.viblo.asia/7259e1e2-112e-4a33-9b7d-b8cd8465765c.png)
### 11. Tham khảo
[Redis - Mongobd](https://blog.panoply.io/redis-vs-mongodb)

[Mongodb - MySQL - Redis](https://stackshare.io/stackups/mongodb-vs-mysql-vs-redis)