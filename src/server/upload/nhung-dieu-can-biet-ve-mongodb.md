# 0. Mở đầu.
- xin chào các bạn bắt đầu từ bài viết này mình xin chia sẻ đến các bạn loạt bài viết tìm hiểu về MongoDB, với bài mở đầu mình sẽ giới thiệu những điều cơ bản nhất về MongoDB và so sánh sự giống và khác nhau giữa MongoDB và MySql.
- Các bạn cùng theo dõi bài viết của mình nhé.
# 1. MongoDB là gì.
## a, Khái niệm.
* MongoDB là một hệ quản trị cơ sở dữ liệu mã nguồn mở thuộc học NoSQL. Nó được thiết kế theo kiểu hướng đối tượng, các bảng trong MongoDB được cấu trúc rất linh hoạt, cho phép các dữ liệu lưu trữ trên bảng không cần tuân theo một cấu trúc nhất định nào cả (điều này rất thích hợp để làm big data).
* MongoDB lưu trữ dữ liệu theo hướng tài liệu (document), các dữ liệu được lưu trữ trong document kiểu JSON nên truy vấn sẽ rất nhanh.
## b, ưu điểm của MongoDB.
* Schema linh hoạt: Do MongoDB sử dụng lưu trữ dữ liệu dưới dạng Document JSON nên mỗi một collection sẽ các các kích cỡ và các document khác nhau.
Cấu trúc đối tượng rõ ràng: Tuy rằng cấu trúc của dữ liệu là linh hoạt nhưng đối tượng của nó được xác định rất rõ ràng. Sử dụng bộ nhớ nội tại, nên truy vấn sẽ rất nhanh.
* MongoDB rất dễ mở rộng.
* Không có các join: Điều này cũng góp phần tạo nên tốc độ truy vấn cực nhanh trên mongoDB.
* MongoDB phù hợp cho các ứng dụng realtime.
## c,Nhược điểm của MongoDB.
Điều đầu tiên phải kể đến ở đây là MongoDB không có các tính chất ràng buộc như trong RDBMS nên khi thao tác với mongoDB thì phải hết sức cẩn thận.
MongoDB sử dụng sẽ hao tốn tài nguyên của hệ thống nhiều hơn RDBMS. Nhưng đến thời điểm hiện tại thì vấn đề này không còn là điều lo ngại nữa (Máy giờ trâu bò lắm rồi).
# 2. So sánh MongoDB với MySql.
## a, Cấu trúc.
-Đầu tiên, để cho dễ hiểu mình sẽ có một dữ liệu trên MySQL như sau:
![](https://images.viblo.asia/6d95bfce-b9d7-485d-ba5b-addbd5b62ee4.png).
-Lúc này nếu như trên mysql thì các bạn phải thực hiện tạo 2 bảng (table) để lưu trữ dữ liệu. Nhưng với MongoDB thì các bạn sẽ chỉ cần đến 1 collection để lưu trữ nó dạng như sau:
```javascript
{
    "_id": "_id",
    "name": "name",
    "price": "price",
    "status": "status",
    "gallery": [
        {"image_path": "image_path"},
        {"image_path": "image_path2"},
    ]
}
```
Sau đây là một vài so sánh sự khác nhau dữ MongoDB và RDBMS (Cơ sở dữ liệu quan hệ).
![](https://images.viblo.asia/155a36ee-964e-41e4-934b-8a2bfb01fde0.png).
## b, hiệu năng.
![](https://images.viblo.asia/74971868-4231-41c2-963d-aadcba6732cd.png).
Biểu đồ gây tranh cãi về việc MongoDB chèn dữ liệu nhanh hơn SQL Server tới hơn 100 lần

Hãy thử tưởng tượng rằng bạn đang thành lập 1 hệ thống website thanh toán trực tuyến, có liên quan tới nhiều đơn vị dữ liệu khác nhau. Nếu có 1 hệ quản trị cơ sở dữ liệu nào đó hoạt động nhanh hơn SQL Server nhiều lần, miễn phí, dễ giám sát và xử lý, toàn bộ hệ thống ứng dụng của bạn với LINQ (tạm dịch là ngôn ngữ truy vấn được tích hợp vào ngôn ngữ lập trình) thì MongoDB chắc chắn sẽ là sự lựa chọn không thể tốt hơn.
Và khi có hệ quản trị cơ sở dữ liệu như vậy thì chúng ta có thể triển khai và hoạt động trên hầu hết các thiết bị phần cứng phổ biến hiện nay, chứ không phải là dòng thiết bị máy chủ cao cấp và chuyên dụng. Đồng nghĩa với việc đó là không cần phải mua hoặc thuê server như trước, và tất nhiên chi phí ban đầu phải bỏ ra thấp hơn rất nhiều, trong khi lợi nhuận hoặc doanh thu thì gần như không thay đổi.
# 3. Những thuật ngữ đầu tiên trong MongoDB.
* **_id** – Là trường bắt buộc có trong mỗi document. Trường _id đại diện cho một giá trị duy nhất trong document MongoDB. Trường _id cũng có thể được hiểu là khóa chính trong document. Nếu bạn thêm mới một document thì MongoDB sẽ tự động sinh ra một _id đại diện cho document đó và là duy nhất trong cơ sở dữ liệu MongoDB.

* **Collection** – Là nhóm của nhiều document trong MongoDB. Collection có thể được hiểu là một bảng tương ứng trong cơ sở dữ liệu RDBMS (Relational Database Management System). Collection nằm trong một cơ sở dữ liệu duy nhất. Các collection không phải định nghĩa các cột, các hàng hay kiểu dữ liệu trước.

* **Cursor** – Đây là một con trỏ đến tập kết quả của một truy vấn. Máy khách có thể lặp qua một con trỏ để lấy kết quả.

* **Database** – Nơi chứa các Collection, giống với cơ sở dữ liệu RDMS chúng chứa các bảng. Mỗi Database có một tập tin riêng lưu trữ trên bộ nhớ vật lý. Một mấy chủ MongoDB có thể chứa nhiều Database.

* **Document** – Một bản ghi thuộc một Collection thì được gọi là một Document. Các Document lần lượt bao gồm các trường tên và giá trị.

* **Field** – Là một cặp name – value trong một document. Một document có thể có không hoặc nhiều trường. Các trường giống các cột ở cơ sở dữ liệu quan hệ.

* **JSON** – Viết tắt của JavaScript Object Notation. Con người có thể đọc được ở định dạng văn bản đơn giản thể hiện cho các dữ liệu có cấu trúc. Hiện tại JSON đang hỗ trợ rất nhiều ngôn ngữ lập trình.

* **Index** – Là những cấu trúc dữ liệu đặc biệt, dùng để chứa một phần nhỏ của các tập dữ liệu một cách dễ dàng để quét. Chỉ số lưu trữ giá trị của một fields cụ thể hoặc thiết lập các fields, sắp xếp theo giá trị của các fields này. Index hỗ trợ độ phân tích một cách hiệu quả các truy vấn. Nếu không có chỉ mục, MongoDB sẽ phải quét tất cả các documents của collection để chọn ra những document phù hợp với câu truy vấn. Quá trình quét này là không hiệu quả và yêu cầu MongoDB để xử lý một khối lượng lớn dữ liệu.

Hãy lưu ý sự khác biệt của các trường và **_id**  trong một document. Một **_id** được dùng để đại diện cho một document và chúng được sinh ra khi thêm một Document vào Collection.

# 4. Các kiểu dữ liệu trong MongoDB.
* **Chuỗi** : Đây là kiểu dữ liệu được sử dụng phổ biến nhất để lưu giữ dữ liệu. Chuỗi trong MongoDB phải là UTF-8 hợp lệ.
* **Số nguyên** : Kiểu dữ liệu này được sử dụng để lưu một giá trị số. Số nguyên có thể là 32 bit hoặc 64 bit phụ thuộc vào Server của bạn.
* **Boolean** : Kiểu dữ liệu này được sử dụng để lưu giữ một giá trị Boolean (true/false).
* **Double** : Kiểu dữ liệu này được sử dụng để lưu các giá trị số thực dấu chấm động.
* **Min/ Max keys**: Kiểu dữ liệu này được sử dụng để so sánh một giá trị với các phần tử BSON thấp nhất và cao nhất.
* **Mảng**: Kiểu dữ liệu này được sử dụng để lưu giữ các mảng hoặc danh sách hoặc nhiều giá trị vào trong một key.
* **Timestamp** : Đánh dấu thời điểm một Document được sửa đổi hoặc được thêm vào.
* **Object**: Kiểu dữ liệu này được sử dụng cho các Document được nhúng vào.
* **Null**: Kiểu dữ liệu này được sử dụng để lưu một giá trị Null.
* **Symbol**: Kiểu dữ liệu này được sử dụng giống như một chuỗi
* **Date** : Kiểu dữ liệu này được sử dụng để lưu giữ date và time hiện tại trong định dạng UNIX time.
* **Object ID**: Kiểu dữ liệu này được sử dụng để lưu giữ ID của Document.
* **Binary data**: Kiểu dữ liệu này được sử dụng để lưu giữ dữ liệu nhị phân.

# 5. So sánh cấu trúc truy vấn của MongoDB và MySql.


|Nhóm lệnh | sql| MongoDb|
| -------- | -------- | -------- |
| **insert**    |  INSERT INTO USERS VALUES(3,5)   | db.users.insert({a:3,b:5})   |
| **select** | SELECT a,b FROM users | db.users.find({}, {a:1,b:1}) |
| | SELECT * FROM users | db.users.find()|
| | SELECT * FROM users WHERE age=33 | db.users.find({age:33}) |
| | SELECT a,b FROM users WHERE age=33 | db.users.find({age:33}, {a:1,b:1}) |
| | SELECT * FROM users WHERE age=33 ORDER BY name | db.users.find({age:33}).sort({name:1}) |
| | SELECT * FROM users WHERE age>33 | db.users.find({age:{$gt:33}}) |
| | SELECT * FROM users WHERE age!=33 | db.users.find({age:{$ne:33}}) |
| | SELECT * FROM users WHERE age!=33	| db.users.find({age:{$ne:33}}) |
| | SELECT * FROM users WHERE name LIKE “Joe%” | db.users.find({name:/^Joe/}) |
| | SELECT * FROM users WHERE age>33 AND age<=40 | AND age<=40	db.users.find({‘age’:{$gt:33,$lte:40}}) |
| | SELECT * FROM users ORDER BY name DESC | db.users.find().sort({name:-1}) |
| | SELECT * FROM users WHERE a=1 and b=’q’ | b.users.find({a:1,b:’q’}) |
| | SELECT * FROM users LIMIT 10 SKIP 20 | db.users.find().limit(10).skip(20) |
| **update** | UPDATE users SET a=1 WHERE b=’q’ | db.users.update({b:’q’},{$set:{a:1}},false,true) |
| | UPDATE users SET a=a+2 WHERE b=’q | db.users.update({b:’q’},{$inc:{a:2}},false,true) |
| **delete** | DELETE FROM users WHERE z=”abc” | db.users.remove({z:’abc’}); |
# 6, Tổng kết.
Hy vọng rằng với bài viết này các bạn đã có những khái niệm cơ bản về MongoDB và có sự so sánh giữa MongoDB và MySql.
Hãy đón xem các bài viết tiếp theo của mình về chuỗi bài Mongo nhé.