# NoSQL là gì?
Cơ sở dữ liệu NoSQL (tên gốc là "Non SQL" (phi SQL) hoặc "Non Relational" (phi quan hệ)) , đôi khi cũng thường được gọi là Not-Only SQL..  Cung cấp một cơ chế để lưu trữ và truy xuất dữ liệu được mô hình hóa khác với các quan hệ bảng được sử dụng trong các cơ sở dữ liệu kiểu quan hệ.

NoSQL được phát triển trên Javascript Framework với kiểu dữ liệu là JSON và dạng dữ liệu theo kiểu key và value (1 đặc trưng về dữ liệu trong JSON). NoSQL ra đời như là 1 mảnh vá cho những khuyết điểm và thiếu xót cũng như hạn chế của mô hình dữ liệu quan hệ RDBMS về tốc độ, tính năng, khả năng mở rộng, memory cache,...

Với NoSQL bạn có thể mở rộng dữ liệu mà không lo tới những việc như tạo khóa ngoại, khóa chính, kiểm tra ràng buộc, .v.v...Vì NoSQL không hạn chế việc mở rộng dữ liệu nên tồn tại nhiều nhược điểm như: sự phục thuộc của từng bản ghi, tính nhất quán, toàn vẹn dữ liệu,....nhưng chúng ta có thể chấp nhận những nhược điểm đó để khiến ứng dụng cải thiện hiệu suất cao hơn khi giải quyết những bài toán lớn về hệ thống thông tin, phân tán hay lưu trữ dữ liệu.

Với các CSDL quan hệ, chi phí triển khai cũng như phát triển các ứng dụng sử dụng CSDL quan hệ cũng rất tốn kém và điều quan trọng được bộc lộ rõ khi truy vấn 1 lượng bản ghi lớn trong thời gian rất dài. Tiếp đó những thiết bị cầm tay như smartphone thì không phù hợp để triển khai CSDL quan hệ vì dung lượng bộ nhớ thấp và khả năng xử lý kém hơn máy tính. Và còn rất nhiều lí do khác nữa để chúng ta quyết định việc áp dụng NoSQL vào trong dự án của mình. Bạn có thể tham khảo thêm những thông tin khác về NoSQL trên mạng.

# NoSQL Database Types
**Key – value** data stores: Dữ liệu lưu dưới dạng cặp key – value. Giá trị được truy xuất thông qua key.
  
  Vd:
  
  a. Key/value cache in RAM:  memcached,  Citrusleaf database, Velocity, Redis, Tuple space,... 
  
  b. Key/value save on disk: Memcachedb, Berkeley DB, Tokyo Cabinet, Redis,... 
  
  c. Eventually Consistent Key Value Store: Amazon Dynamo, Voldemort, Dynomite, KAI, Cassandra, Hibari, Project Voldemort,… 
  
  d. Ordered key-value store: NMDB, Memcachedb, Berkeley DB,... 
  
  e. Distributed systems: Apache River, MEMBASE, Azure Table Storage, Amazon Dynamo,...   

**Column-based** : Cơ sở dữ liệu tổ chức dưới dạng các bảng. Gần giống với mô hình RDBMS. Tuy nhiên, Chúng lưu dữ liệu bởi các cột chứ không phải bằng các dòng. Nó khá thích hợp với để hiển thị bằng các phần mềm quản lý kho dữ liệu

Vd:

Hadoop/HBase  –  Apache,  BigTable  –  Google,  Cassandra  - Facebook/Apache, Hypertable - Zvents Inc/Baidu, Cloudera, SciDB, Mnesia, Tablets,…

**Document-based**: Dữ liệu (bán cấu trúc hay semi-structured) được lưu trữ và tổ chức dưới dạng một tập hợp các document. Các document này linh hoạt, mỗi document có một tập nhiều trường.

Vd:

Apache Jackrabbit, CouchDB, IBM Lotus Notes Storage Format (NSF),  MongoDB,  Terrastore,  ThruDB, OrientDB, RavenDB,...

**Graph-based** data-stores: Những CSDL này áp dụng lý thuyết đồ thị trong khoa học máy tính để lưu trữ và truy xuất dữ liệu. Chúng tập trung vào tính rời rạc giữa các phần dữ liệu. Các phần tử đơn vị dữ liệu được biểu thị như một nút và liên kết với các thành phần khác bằng các cạnh.

Vd:

Neo4J, Sones, AllegroGraph, Core Data, DEX, FlockDB, InfoGrid, OpenLink Virtuoso,...


# Lợi ích của NoSQL

* Dữ liệu trong NoSQL DB được lưu dưới dạng document, object. Truy vấn dễ dàng và nhanh hơn RDBMS nhiều.
* NoSQL có thể làm việc hoàn toàn ok với dữ liệu dạng không có cấu trúc.
* Việc đổi cấu trúc dữ liệu (Thêm, xóa trường hoặc bảng) rất dễ dàng và nhanh gọn trong NoSQL.
* NoSQL DB có thể mở rộng, chạy trên nhiều máy một cách dễ dàng.


# MongoDb là gì?

MongoDB là 1 hệ thống CSDL mã nguồn mở được phát triển và hỗ trợ bởi 10gen, là CSDL NoSQL hàng đầu được hàng triệu người sử dụng.


Thay vì lưu trữ dữ liệu dưới dạng bảng và các tuple như trong các CSDL quan hệ thì nó lưu trữ dữ liệu dưới dạng JSON (trong MongoDB được gọi là dạng BSON vì nó lưu trữ dưới dạng binary từ 1 JSON document).

Các tính năng của MongoDB: 

* Document data model with dynamic schemas
* Full, flexible index support and rich queries
* Auto-Sharding for horizontal scalability
* Built-in replication for high availability
* Text search
* Advanced security
* Aggregation Framework and MapReduce
* Large media storage with GridFS

# Tại sao nên sử dụng mongoDb ?

* Dễ học, có một số nét khá giống với CSDL quan hệ – Quản lý bằng command line hoặc bằng GUI như RockMongo hoặc phpMoAdmin
* Linh động, không cần phải định nghĩa cấu trúc dữ liệu trước khi tiến hành lưu trữ nó -> rất tốt khi ta cần làm việc với các dạng dữ liệu không có cấu trúc.
* Khả năng mở rộng tốt (distributed horizontally), khả năng cân bằng tải cao, tích hợp các công nghệ quản lý dữ liệu vẫn tốt khi kích thước và thông lượng trao đổi dữ liệu tăng.
* Miễn phí

# Các khái niệm trong mongodb
**Databases**: MongoDB nhóm các dữ liệu vào trong cơ sở dữ liệu theo một cách tương tự cơ sở dữ liệu quan hệ. Trong RDBMS, một cơ sở dữ liệu là tập hợp các bảng, stored procedures, views, … Trong MongoDB, một cơ sở dữ liệu là một tập các colllections, articles, authors, comments, cateogries,...

**Collection**: Một collection tương đương với 1 bảng trong RDBMS. Documents nằm trong collection sẽ có các trường khác nhau. Thông thường, tất cả các documents trong 1 collection sẽ tương tự nhau hoặc cùng chung mục đích.

**Documents**: là 1 bản ghi trong MongoDB và là đơn vị cơ bản của dữ liệu trong MongoDB. Documents tương tự như các object JSON tuy nhiên đã tồn tại trong cơ sở dữ liệu theo kiểu type-rich (BSON). 1 documents bao gồm tập các trường với từng cặp key-value (Có thể hiểu là mảng nhiều chiều).

# MongoDB CRUD Operations

## Create
 Insert operations thêm documents vào 1 collection. Nếu collection chưa tồn tại, insert operations sẽ tạo mới collection.


MongoDB cung cấp các method sau để insert documents vào 1 collection

* db.collection.insertOne() New in version 3.2
* db.collection.insertMany() New in version 3.2

![](https://images.viblo.asia/2bed6369-bb0a-4ebd-8418-33c92b37e2ee.png)
### Insert one
```
db.inventory.insertOne(
   { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
)
```

Method insert một document vào một collection.. Trường id là trường tự động được thêm cho mỗi object và là duy nhất cho mỗi object

Để truy xuất dữ liệu mà bạn vừa chèn, sử dụng query
```
db.inventory.find( { item: "canvas" } )
```

Tham khảo chi tiết https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/

### Insert multi 
db.collection.insertMany() có thể insert nhiều documents vào một collection, bằng cách truyền một mảng documents vào method:

```
db.inventory.insertMany([
   { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
   { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
   { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
])
```

nếu document không có field _id, MongoDb sẽ tự động thêm vào mỗi documents.

Tham khảo chi tiết https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/

## Read
Read operations retrieves documents from a collection; i.e. queries a collection for documents. MongoDB provides the following methods to read documents from a collection:

* db.collection.find()

![](https://images.viblo.asia/93e40ab3-24bd-407d-a3c9-4a927697616d.png)

Bạn có thể chỉ định bộ lọc truy vấn hoặc điều kiện để xác định document cần tìm

Bạn có thể sử dụng các biểu thức <field>: <value> để chỉ định điều kiện equal và biểu thức toán tử truy vấn.
```
{
  <field1>: <value1>,
  <field2>: { <operator>: <value> },
  ...
}
```
hoặc sử dụng thêm operator, trong đó operator là các toán tử so sánh sau

| Name | Description |
| -------- | -------- | 
| $eq    | 	So sánh bằng với value được chỉ định.     |
| $gt    | 	So sánh lơn hơn value được chỉ định.     |
| $gte    | 	So sánh lơn hơn or bằng value được chỉ định.     |
| $in    | 	So khớp bất kỳ value trong một mảng.     |
| $lt    | 		So sánh nhỏ hơn value được chỉ định.     |
| $lte    | 		So sánh nhỏ hơn value được chỉ định.     |
| $ne    | 		So khớp tất cả giá trị ko bằng với value được chỉ định.     |
| $nin    | 	So khớp tất cả giá trị ko bằng với value được chỉ định trong một mảng.     |

Mọi người tham khảo thêm operator

https://docs.mongodb.com/manual/reference/operator/query/

Vd: tìm tất cả các document trong inventory collection mà có status = D

```
db.inventory.find( { status: "D" } )
```

Sẽ tương tự như query SQL như thế này 
```
SELECT * FROM inventory WHERE status = "D"
```

Hoặc tìm các documents của inventory collection mà có status là A or D
```
db.inventory.find( { status: { $in: [ "A", "D" ] } } )
```

Tham khảo chi tiết https://docs.mongodb.com/manual/reference/method/db.collection.find/
## Update 

Update operations chỉnh sửa documents tồn tại trong một collection. MongoDb cung cấp các method sau để update documents của một collection:

* db.collection.updateOne() New in version 3.2
* db.collection.updateMany() New in version 3.2
* db.collection.replaceOne() New in version 3.2

![](https://images.viblo.asia/ab66e582-7db4-479b-9c82-fedc74618b27.png)

bạn có thể chỉ định bộ lọc truy vấn hoặc điều kiện để xác định document cần update. Các điều kiện sử dụng cú pháp giống như  của read operations
### updateOne

update một document đầu tiên của biểu thức update

Vd:
```
db.inventory.updateOne(
   { item: "paper" },
   {
     $set: { "size.uom": "cm", status: "P" },
     $currentDate: { lastModified: true }
   }
)
```
Update các documents có item là "paper" rồi set giá trị của size.uom = cm và status = p

sử dụng toán tử $currentDate để cập nhật giá trị của trường lastModified thành ngày hiện tại. Nếu trường lastModified không tồn tại, $currentDate sẽ tạo trường.

Xem https://docs.mongodb.com/manual/reference/operator/update/currentDate/#up._S_currentDate để biết chi tiết

Tham khảo chi tiết https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/

### updateMany

Update tất cả các document được tìm thấy của biểu thức

```
db.inventory.updateMany(
   { "qty": { $lt: 50 } },
   {
     $set: { "size.uom": "in", status: "P" },
     $currentDate: { lastModified: true }
   }
)
```

Tham khảo chi tiết https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/

###  replaceOne

Để thay thế toàn bộ nội dung của document ngoại trừ trường _id, chuyển một document hoàn toàn mới làm đối số thứ hai cho db.collection.replaceOne().

Khi replace một documents, document thay thế phải chỉ bao gồm các cặp key /value; tức là không bao gồm các biểu thức toán tử cập nhật.

Documents thay thế có thể có các trường khác nhau từ document gốc. Trong document thay thế, bạn có thể bỏ qua trường _id vì trường _id không thay đổi được; tuy nhiên, nếu bạn bao gồm trường _id, nó phải có cùng giá trị với giá trị hiện tại.

```
db.restaurant.replaceOne(
      { "name" : "Central Perk Cafe" },
      { "name" : "Central Pork Cafe", "Borough" : "Manhattan" }
   );
```

Tham khảo chi tiết https://docs.mongodb.com/manual/reference/method/db.collection.replaceOne/

## Delete 

Delete operation xóa documents từ một collection. MongoDB cung cấp các method sau để delete documents của một collection:

* db.collection.deleteOne() New in version 3.2
* db.collection.deleteMany() New in version 3.2

![](https://images.viblo.asia/535f9fc9-8cd9-4951-a973-123f2d22af55.png)
Bạn có thể chỉ định bộ lọc truy vấn hoặc điều kiện để xác định document cần xóa. Các điều kiện sử dụng cú pháp giống như  của read operations

### deleteMany

Để delete tất cả document từ một collection, ta truyền một document empty tới method deleteMany()

```
db.inventory.deleteMany({})
```

hoặc sử dụng thêm operator để xóa theo điều kiện 
```
{ <field1>: { <operator1>: <value1> }, ... }
```

tương tự operator được sử dụng ở Read operator

Tham khảo chi tiết https://docs.mongodb.com/manual/reference/method/db.collection.deleteMany/

### deleteOne

Để delete một documents từ một collection

vd: xóa 1 documents có _id =...
```
db.orders.deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } );
```

Hoặc xóa document đầu tiên mà có expiryts < ...
```
db.orders.deleteOne( { "expiryts" : { $lt: ISODate("2015-11-01T12:40:15Z") } } );
```

Tham khảo chi tiết https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/#db.collection.deleteOne

# Tổng kết
-Trên là bài tìm hiểu của mình về mongo cơ bản, bài viết còn sơ sài mong các bạn thông cảm.

-Nguồn https://docs.mongodb.com/manual/tutorial/