### I. Giới thiệu
1. Đầu tiên ta phải biết mongodb là gì?
    - Theo các nguồn tin trên mạng thì MongoDB là một trong những cơ sở dữ liệu mã nguồn mở NoSQL phổ biến nhất được biết bằng C++. Nó được phát triển bởi công ty 10gen sau này được biết đến với tên MongoDB Inc.. Vào năm 2015 nó được xếp vào top 4 những hệ thống cơ sở dữ liệu phổ biến nhất.
2. Nền tảng và ngôn ngữ hỗ trợ
    - MongoDB là một cơ sở dữ liệu NoSQL hỗ trợ đa nền tảng, nó có thể chạy trên Windows, Linux và Mac...Nó hỗ trợ hầu hết các ngôn ngữ lập trình phổ biến như C#, Java, PHP, Javascript...và các môi trường phát triển khác nhau.
3. NoSQL là gì?
    - Trước khi tìm hiểu NoSQL là gì, ta tìm hiểu lại SQL là gì?  SQL là viết tắt của Structured Query Language, là ngôn ngữ truy vấn mang tính cấu trúc. Nó được thiết kế để quản lý dữ liệu trong một hệ thống quản lý cơ sở dữ liệu quan hệ (RDBMS). SQL là ngôn ngữ cơ sở dữ liệu, được sử dụng để tạo, xóa trong cơ sở dữ liệu, lấy các hàng và sửa đổi các hàng, … Tất cả DBMS như MySQL, Oracle, MS Access, Sybase, Informix, Postgres và SQL Server sử dụng SQL như là ngôn ngữ cơ sở dữ liệu chuẩn.
    - Vậy NoSQL là gì? Nó là ngôn ngữ truy vấn không có cấu trúc, ngược lại với trên :v, nó lấp đi một số khuyết điểm của SQL là tốc độ, tính năng, khả năng mở rộng,... Tuy nhiên, nó lại bỏ qua tính toàn vẹn của dữ liệu và transaction để đổi lấy hiệu suất nhanh và khả năng mở rộng.
    - Vì vậy, tùy vào từng project mà ta nên áp dụng SQL hay NoSQL

### II. Lợi ích của mongodb
- Ít Schema hơn: MongoDB là một cơ sở dữ liệu dựa trên Document, trong đó một Collection giữ các Document khác nhau. Số trường, nội dung và kích cỡ của Document này có thể khác với Document khác.
- Cấu trúc của một đối tượng là rõ ràng.
- Không có các Join phức tạp.
- Khả năng truy vấn sâu hơn. MongoDB hỗ trợ các truy vấn động trên các Document bởi sử dụng một ngôn ngữ truy vấn dựa trên Document mà mạnh mẽ như SQL.
- Dễ dàng để mở rộng.
- Giống cấu trúc JSON

### III. Làm quen với những thứ cơ bản
1. Tạo database
    ```
    use DATABASE_NAME
    ```
   Câu lệnh `use` ở đây là nếu chưa tồn tại database có name bên dưới thì sẽ tạo mới database này
   
3. Xóa database
    ```
    db.dropDatabase()
    ```
    `db` ở đây là database mình đã `use`, thay vì phải gõ cả tên database dài dòng thì mình chỉ việc dùng `db`.

5. Tạo Collection
    ```
    db.createCollection(name, options)
    ```

    | Tham số | Kiểu | Miêu tả |
    | -------- | -------- | -------- |
    | Name     | Chuỗi     | Tên của Collection     |
    | Options     | Document     | (Tùy ý) Xác định các tùy chọn về kích cỡ bộ nhớ và việc lập chỉ mục     |

7. Xóa Collection
    ```
    db.COLLECTION_NAME.drop()
    ```
    COLLECTION_NAME là tên collection có trong db, ví dụ: `db.users.drop()`

9. Kiểu dữ liệu
- String: Đây là kiểu dữ liệu được sử dụng phổ biến nhất để lưu giữ dữ liệu. Chuỗi trong MongoDB phải là UTF-8 hợp lệ.

- Số nguyên: Kiểu dữ liệu này được sử dụng để lưu một giá trị số. Số nguyên có thể là 32 bit hoặc 64 bit phụ thuộc vào Server của bạn.

- Boolean: Kiểu dữ liệu này được sử dụng để lưu giữ một giá trị Boolean (true/false).

- Double: Kiểu dữ liệu này được sử dụng để lưu các giá trị số thực dấu chấm động.

- Min/ Max keys: Kiểu dữ liệu này được sử dụng để so sánh một giá trị với các phần tử BSON thấp nhất và cao nhất.

- Array: Kiểu dữ liệu này được sử dụng để lưu giữ các mảng hoặc danh sách hoặc nhiều giá trị vào trong một key.

- Timestamp: Giúp thuận tiện cho việc ghi chép hoặc đánh dấu thời điểm một Document được sửa đổi hoặc được thêm vào.

- Object: Kiểu dữ liệu này được sử dụng cho các Document được nhúng vào.

- Null: Kiểu dữ liệu này được sử dụng để lưu một giá trị Null.

- Symbol: Kiểu dữ liệu này được sử dụng giống như một chuỗi, tuy nhiên, nói chung nó được dành riêng cho các ngôn ngữ mà sử dụng kiểu symbol cụ thể.

- Date : Kiểu dữ liệu này được sử dụng để lưu giữ date và time hiện tại trong định dạng UNIX time. Bạn có thể xác định date time riêng cho bạn bằng việc tạo đối tượng Date và truyền ngày, tháng, năm vào trong đó.

- Object ID: Kiểu dữ liệu này được sử dụng để lưu giữ ID của Document.

- Binary data: Kiểu dữ liệu này được sử dụng để lưu giữ dữ liệu nhị phân.

- Code: Kiểu dữ liệu này được sử dụng để lưu giữ JavaScrip code vào trong Document.

- Regular expression: Kiểu dữ liệu này được sử dụng để lưu giữ Regular Expresion.


11. Chèn Document
    ```
    db.COLLECTION_NAME.insert(document)
    ```

13. Truy vấn Document
    ```
    db.COLLECTION_NAME.find()
    ```
   -  Phương thức find() sẽ hiển thị tất cả Document ở dạng không có cấu trúc (hiển thị không theo cấu trúc nào).

- Để hiển thị các kết quả theo một cách đã được định dạng, bạn có thể sử dụng phương thức pretty(). Cú pháp: 
    ```
    db.COLLECTION_NAME.find().pretty()
    ```
- Để truy vấn Document dựa trên điều kiện, ta có thể sử dụng các toán tử sau
- 
| Phép toán |	Cú pháp |	Ví dụ |	Mệnh đề WHERE tương đương |
| --------------- | -------------- | -------- | -------------------------------------------- |
| Equality |	{<key>:<value>} |	db.mycol.find({"by":"tutorials point"}).pretty() |	where by = 'tutorials point' |
| Less Than |	{<key>:{$lt:<value>}} |	db.mycol.find({"likes":{$lt:50}}).pretty() |	where likes < 50 |
| Less Than Equals |	{<key>:{$lte:<value>}} |	db.mycol.find({"likes":{$lte:50}}).pretty() |	where likes <= 50 |
| Greater Than |	{<key>:{$gt:<value>}} |	db.mycol.find({"likes":{$gt:50}}).pretty() |	where likes > 50 |
| Greater Than Equals |	{<key>:{$gte:<value>}} |	db.mycol.find({"likes":{$gte:50}}).pretty() |	where likes >= 50 |
| Not Equals |	{<key>:{$ne:<value>}}	| db.mycol.find({"likes":{$ne:50}}).pretty() |	where likes != 50 |

15. Cập nhật Document
    ```
    db.COLLECTION_NAME.update(SELECTIOIN_CRITERIA, UPDATED_DATA)
    ```
- Phương thức save
    ```
    db.COLLECTION_NAME.save({_id:ObjectId(),NEW_DATA})
    ```
    
17. Xóa Document
    ```
    db.COLLECTION_NAME.remove(DELLETION_CRITTERIA)
    ```
- Chỉ xóa 1 doc
    ```
    db.COLLECTION_NAME.remove(DELETION_CRITERIA,1)
    ```
- Xóa tất cả doc
    ```
    db.COLLECTION_NAME.remove()
    ```
    
21. Giới hạn bản ghi
    ```
    db.COLLECTION_NAME.find().limit(NUMBER)
    ```
    
22. Sắp xếp bản ghi
    ```
    db.COLLECTION_NAME.find().sort({KEY:1})
    ```
    
23. Index (Chỉ mục)
    ```
    db.COLLECTION_NAME.ensureIndex({KEY:1})
    ```

27. Tạo Backup
    ```
    mongodump
    ```
    
    | Cú pháp |	Miêu tả |	Ví dụ | |
    | ------------ | ----------- | ---------- |- |
    | mongodump --host HOST_NAME --port PORT_NUMBER |	Lệnh này sẽ sao lưu tất cả cơ sở dữ liệu của mongod instance đã xác định |	mongodump --host tutorialspoint.com --port 27017 |
    | mongodump --dbpath DB_PATH --out BACKUP_DIRECTORY |	Lệnh này chỉ sao lưu cơ sở dữ liệu đã xác định tại path đã cho. |	 |	mongodump --dbpath /data/db/ --out /data/backup/ |
    | mongodump --collection COLLECTION --db DB_NAME |	Lệnh này chỉ sao lưu Collection đã xác định của cơ sở dữ liệu đã cho |	mongodump --collection mycol --db test |
    
- Phục hồi dữ liệu trong mongodb
    ```
    mongorestore
    ```
    
    ### IV. Kết
    Đây chỉ là những phần nhỏ trong một phần lớn của mongodb, nên để có thể làm được một cách chuyên nghiệp thì cần phải đào sâu hơn về mongodb cũng như NoSQL, mong rằng bài viết này giúp bạn hiểu thêm chút về mongodb :v