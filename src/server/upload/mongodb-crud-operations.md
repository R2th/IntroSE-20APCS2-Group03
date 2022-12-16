#  Giới thiệu về MongoDB
## 1. MongoDB là gì?
* MongoDB là một **Document Database**: 
    * Mỗi một bản ghi trong MongoDb là một **document** - một cấu trúc dữ liệu bao gồm các cặp field và value.
    * MongoDB documents tương tự với JSON object.
    * Các giá trị của các trường có thể bao gồm document khác, một mảng, hoặc mảng của các document.
    
* Lợi ích của việc sử dụng document là:
   
    * Document  tương ứng với các kiểu dữ liệu tự nhiên trong nhiều ngôn ngữ lập trình.
    * Sử dụng các mảng và documents nhúng giảm thiểu việc join tốn công sức như cơ sở dữ liệu quan hệ.
    * Các trường có thể thay đổi từ document này sang document khác dẫn đên cấu trúc dữ liệu có thể dễ dàng thay đổi.
* Các tính năng chính của MongoDB
    * Hiệu suất cao: MongoDB hỗ trợ các mô hình dữ liệu nhúng làm giảm hoạt động vào ra trên hệ thống cơ sở dữ liệu. Đồng thời các chỉ mục (indexes) hỗ trợ truy vấn nhanh.
    * Ngôn ngữ truy vấn mạnh mẽ: MongoDB cung cấp ngôn ngữ truy vấn phong phú cho các hoạt động đọc ghi (CRUD) cũng như Data Aggregation, Text Search
    * MongoDB là cơ sở dữ liệu phân tán do đó dễ dàng mở rộng theo chiều ngang, khả năng sẵn có cao...
    * Hỗ trợ nhiều công cụ lưu trữ.
    * MongoDB miễn phí sử dụng
## 2. Cơ bản về MongoDB
### 2.1 Database
* Trong MongoDB, database chứa các collection gồm các document.
* Để chọn database để sử dụng, trong [mongo shell](https://docs.mongodb.com/manual/mongo/), sử dụng câu lệnh 
    ```
    use myDB
    ```
* Nếu DB chưa tồn tại, MongoDB sẽ tạo một DB khi mà bạn lần đầu lưu trữ dữ liệu cho database.
    ```
    use myNewDB

    db.myNewCollection1.insertOne( { x: 1 } )
    ```

    **insertOne()** sẽ tạo cả database myNewDB và collection myNewCollection1 nếu chúng đều không tồn tại.
### 2.2 Collection
* **Collection** tương đương với **Bảng (table)** trong cơ sở dữ liệu quan hệ
* Collection chứa các document
### 2.3 Document
* **Document** tương đương với **bản ghi dữ liệu (data record)** trong cơ sở dữ liệu quan hệ.
* Document ở đây là **BSON** document.[ BSON](https://docs.mongodb.com/manual/reference/bson-types/) là biểu diễn nhị phân của  JSON document.
* Các document của MongoDB bao gồm các cặp (field: value) theo cấu trúc sau:
    ```
    {
       field1: value1,
       field2: value2,
       field3: value3,
       ...
       fieldN: valueN
    }
    ```

*   Value ở đây có thể là bất kì kiểu dữ liệu BSON nào, có thể là document khác, mảng, hay là mảng của các document, ví dụ document sau chứa các giá trị thuộc các kiểu khác nhau:
    ```
    var mydoc = {
       _id: ObjectId("5099803df3f4948bd2f98391"),
       name: { first: "Alan", last: "Turing" },
       birth: new Date('Jun 23, 1912'),
       death: new Date('Jun 07, 1954'),
       contribs: [ "Turing machine", "Turing test", "Turingery" ],
       views : NumberLong(1250000)
    }
    ```
## 3. MongoDB CRUD Operations
### 3.1 Create Operations
* Create hay Insert thêm một document mới vào một collection. Nếu collection hiện không tồn tại, insert sẽ tạo collection.
* MongoDB cung cấp 2 phương thức để chèn document vào một collection
    * **db.collection.insertOne()**: chèn một tài liệu mới vào một collection. Nếu document không có trường _id , MongoDB sẽ tự động thêm trường _id với value kiểu ObjectId.
    

        ```
        db.inventory.insertOne(
           { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
        )
        ```
        **insertOne()** trả về một document bao gồm id của document vừa mới insert vào và một trường acknowleadge (chúng ta sẽ tìm hiểu về trường này sau): 
        ```
        {
           "acknowledged" : true,
           "insertedId" : ObjectId("56fc40f9d735c28df206d078")
        }
        ```


    * **db.collection.insertMany()**: insert nhiều document vào một collection, truyền vào phương thức là mảng các document
        ```
        db.inventory.insertMany([
           { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
           { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
           { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
        ])
        ```
        Ví  dụ trên chèn 3 document mới vào collection inventory. Nếu document không chỉ định trường _id, MongoDB thêm trường _id với một giá trị kiểu ObjectId vào mỗi document.
### 3.2 Read Operations
Read operation truy xuất documents từ một collection
* **Để lấy ra tất cả các document trong collection, truyền vào một document trống vào phương thức find**
    ```
    db.inventory.find( {} )
    ```
    Hành động này tương đương với câu lệnh SQL sau:
    ```
    SELECT * FROM inventory
    ```
* **Điều kiện  Bằng:**

    Để chỉ dịnh điều kiện bằng, sử dụng biểu thức `<field>:<value>`:
    
    ```
    { <field1>: <value1>, ... }
    ```

   Câu lệnh dưới đây lấy ra các document có status bằng "D" từ collection inventory
    ```
    db.inventory.find( { status: "D" } )
    ```

    Hành động này tương đương với câu lệnh SQL sau:
    ```
    SELECT * FROM inventory WHERE status = "D"
    ```
* **Chỉ định điều kiện sử dụng các toán tử truy vấn:**

    Cú pháp:
    ```
    { <field1>: { <operator1>: <value1> }, ... }
    ```
    Ví dụ: Câu lệnh dưới đây lấy ra tất cả các document từ inventory collection với status bằng "A" hoặc "D"

    ```
    db.inventory.find( { status: { $in: [ "A", "D" ] } } )
    ```

    Câu lệnh trên tương ứng với câu lệnh SQL sau:
    
    ```
    SELECT * FROM inventory WHERE status in ("A", "D")
    ```

    Tham Khảo  [Query and Projection Operators](https://docs.mongodb.com/manual/reference/operator/query/) để biết thêm các toán tử truy vấn của MongoDB

* **Truy vấn AND**
  

    Một truy vấn kết hợp có thể chỉ định các điều kiện thỏa mãn cho nhiều trường của document.
    Ví dụ dưới đây lấy ra tất cả các documents trong collection inventory với trường status bằng "a" và trường qty ít hơn 30 (**$lt**)

    ```
    db.inventory.find( { status: "A", qty: { $lt: 30 } } )
    ```

    Câu lệnh trên tương đương với câu lệnh SQL sau:
    ```
    SELECT * FROM inventory WHERE status = "A" AND qty < 30
    ```

    Tham khảo [ comparison operators](https://docs.mongodb.com/manual/reference/operator/query-comparison/#query-selectors-comparison) để biết thêm về các toán tử so sánh của MongoDB


* **Truy vấn OR**

    Ví dụ sau lấy ra các tài liệu trong collection có trường status bằng "A" hoặc qty ít hơn 30
    ```
    db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } )
    ```

    Câu lệnh trên tương ứng với câu lệnh SQL sau:
    ```
    SELECT * FROM inventory WHERE status = "A" OR qty < 30
    ```

* Truy vấn kết hợp AND, OR

    Ví dụ sau lấy ra tất cả các document trong collection có trường status bằng "A" và trường qty ít hơn (**$lt**) 30 hoặc trường item bắt đầu với kí tự p
    ```
    db.inventory.find( {
         status: "A",
         $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
    } )
    ```
   
   Câu lệnh trên tương đương với câu lệnh SQL sau:
    ```
    SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%")
    ```

### 3.3 Update Operations
* Update operation chỉnh sửa documents đã tồn tại trong một collection. Để update một document, MongoDB cung cấp [các toán tử update](https://docs.mongodb.com/manual/reference/operator/update/) trong đó có **$set**.
* Để sử dụng các toán tử update, truyền vào phương thức update một update document
    ```
    {
      <update operator>: { <field1>: <value1>, ... },
      <update operator>: { <field2>: <value2>, ... },
      ...
    }
    ```
* Một vài toán tử update, trong đó có $set, sẽ tạo ra các trường nếu trường đó không tồn tại
* **Update một document** với **db.collection.updateOne()**

    Ví dụ sau sẽ update document đầu tiên mà có trường item bằng "paper":
    ```
    db.inventory.updateOne(
       { item: "paper" },
       {
         $set: { "size.uom": "cm", status: "P" },
         $currentDate: { lastModified: true }
       }
    )
    ```
    *  Sử dụng toán tử $set để updatee giá trị của trường size.uom thành cm và giá trị của trương field thành "P"
    *  Sử dụng toán tử $currentDate để update giá trị của trường **lastModified** thành ngày hiện tại. Nếu **lastModified** không tồn tại, $currentDate sẽ tạo trường này.
* **Update nhiều Document** với **db.collection.updateMany()**
   
   
   Ví dụ sau cập nhật tất cả các document của collection inventory có trường qty ít hơn 50
    ```
    db.inventory.updateMany(
       { "qty": { $lt: 50 } },
       {
         $set: { "size.uom": "in", status: "P" },
         $currentDate: { lastModified: true }
       }
    )
    ```
* **Repace một document**


    Để thay thế toàn bộ nội dung của một document (ngoại trừ trường _id), truyền vào toàn bộ document mới là một tham số thứ hai của hàm **db.collection.replaceOne().**

    Khi thay thế một document, document thay thế phải chỉ được bao gồm các cặp field/value, không được bao gồm các biểu thức [update operators](https://docs.mongodb.com/manual/reference/operator/update/)

    Document thay thế có thể có nhiều trường từ document ban đầu. Trong document thay thế, bạn có thể bỏ đi trường _id vì trường _id là không thay đổi. Tuy nhiên nếu bạn bao gồm trường _id, nó phải có cùng giá trị với giá trị hiện tại.
    
    Ví  dụ dưới đây thay thế document đầu tiên từ collection inventory mà có item bằng "paper"

    ```
    db.inventory.replaceOne(
       { item: "paper" },
       { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
    )
    ```
### 3.4 Delete Operation
Delete operation xóa bỏ document từ một collection.

* Để xóa tất cả các tài liệu từ một collection, truyền một document **filter** {} tới phương thức **db.collection.deleteMany()**
* Ví dụ sau xóa tất cả các document của collection inventory
    ```
    db.inventory.deleteMany({})
    ```
*    Xóa tất cả các document thỏa mãn điều kiện
   
       Bạn  có thể chỉ định các tiêu chí hoặc bộ lọc xác định các tài liệu cần xóa.
       
       Để chỉ định điều kiện bằng, sử dụng biểu thức **<field>:<value>**
   
     Có thể sử dụng [query operators ](https://docs.mongodb.com/manual/reference/operator/query/#query-selectors) để chỉ định các điều kiện:
    
        ```
        { <field1>: { <operator1>: <value1> }, ... }
        ```

        Ví dụ sau xóa tất cả các documents mà có trường status bằng "A"
    
    
        ```
        db.inventory.deleteMany({ status : "A" })
        ```
    *   Xóa chỉ một document thỏa mãn điều kiện
     
           Để xóa chỉ một document phù hợp với điều kiện( trường hợp có nhiều document thỏa mãn thì sẽ xóa document đầu tiên), sử dụng **db.collection.deleteOne()**

        Ví dụ sau xóa document đầu tiên mà có status bằng "D"
        ```
        db.inventory.deleteOne( { status: "D" } )
        ```
    
##   4. Tổng kết
* Trên đây là những phương thức CRUD hay dùng nhất trong MongDB. Trong bài viết sau mình sẽ viết chi tiết hơn về các phương thức truy vấn khác trong MongoDB. Mong bài viết  này hữu ích đối với các bạn.
* Nguồn tham khảo: https://docs.mongodb.com/manual/crud/