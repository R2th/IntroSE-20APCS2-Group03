Là một lập trình viên, đặc biệt là lập trình viên web. Một câu hỏi có lẽ thường xuyên được đặt ra đó là 'Tôi sẽ dùng cơ sở dữ liệu nào để thiết kế cho ứng dụng của mình' (cơ sở quan hệ như mysql hay cơ sở quan hệ NoSQL). Câu trả lời có lẽ là tùy vào ứng dụng của ta ưu tiên nặng việc đọc hơn hay là ghi và update nhiều hơn, tùy thuộc vào việc ta sẽ mở rộng ứng dụng như thế nào. <br>
Ở bài viết này, chúng ta sẽ thảo luận về việc thiết kế model ở ngoài thực tế với mongoDB. <br>
Đầu tiên, hãy cùng xem tại sao thiết kế với mongoDB lại quan trọng. Có một vài lí do để ta tìm hiểu về điều nay, nhiều người có thể sẽ nghĩ thiết kế với mongoDB sẽ giống như ta thiết kế với quan hệ cơ sở dữ liệu như mysql..., điều này sẽ vô tình không cho phép ta tận dụng được lợi thế vốn có của mongoDB. <br>
# So sánh Relational vs mongoDB
![](https://images.viblo.asia/78c16aad-c369-49b0-a88c-c1927ee38ad5.png)
Mới đầu khi nghĩ về 2 loại này có thể ta nghĩ chúng có chung thiết kế đó là sẽ chia nhỏ các bảng ra và cho mối quan hệ giữa chúng. Tuy nhiên với mongoDB, ta có thể thấy chúng có những đặc điểm khác với kiểu quan hệ dữ liệu như mysql mà ta từng biết. Cùng xem ví dụ dưới đây: <br>
## Relational schema design
Bình thường khi thiết kế loại quan hệ này, chúng ta sẽ dựa vào chuẩn hóa dữ liệu [3NF](https://en.wikipedia.org/wiki/Database_normalization#Satisfying_3NF) để thiết kế các bảng dữ liệu, chia chúng thành các table riêng biệt nhau và sẽ không để trùng lặp dữ liệu giữa chúng.
![](https://images.viblo.asia/e833272b-6f3b-4a3b-8295-deddf1ae17b3.png)
Như trên hình trên chúng ta chia chúng thành các table riêng biệt nhau, giữa các bảng sẽ liên kết với nhau bằng khóa ngoại (Foreign keys) <br>
## MongoDB Schema Design
Tuy nhiên, khi chuyển sang thiết kế với mongoDB, quan điểm thiết kế sẽ gói gọn bởi 2 từ: **No rules**. Khi đó, khi ta thiết kế cơ sở dữ liệu, ta sẽ phụ thuộc sao cho tốt nhất với ứng dụng mà ta viết ra chứ không nhất thiết phải chia bảng dữ liệu riêng biệt và phải theo chuẩn hóa dữ liệu như kiểu thiết kế relation design. Cùng xem một dữ liệu trong bảng với mongoDB: <br>
``` javascript
    {
        "first_name": "Paul",
        "surname": "Miller",
        "cell": "447557505611",
        "city": "London",
        "location": [45.123, 47.232],
        "profession": ["banking", "finance", "trader"],
        "cars": [
            {
                "model": "Bentley",
                "year": 1973
            },
            {
                "model": "Rolls Royce",
                "year": 1965
            }
        ]
    }
```
Nhìn vào dữ liệu có thể thấy, thay vì ta chia dữ liệu ra các bảng và lưu trữ riêng biệt, ở đây chúng ra sẽ gộp chúng trong một object, với các kiểu dữ liệu khác nhau như Array, Object... Điều này có thể dẫn đến việc khi chúng ta query lấy dữ liệu sẽ không giống như chúng ta đã làm ở bên relational.  <br>
## Embedding vs. Referencing
MongoDB sẽ cho ta 2 lựa chọn khi thiết kế dữ liệu. Chúng ta có thể gắn dữ liệu trực tiếp vào object, hoặc reference chúng và sử dụng [$lookup](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/) operation để query. <br>
### Embedding
* Ưu điểm: <br>
    - Khi query ta có thể lấy tất cả các dữ liệu liên quan trong 1 query <br>
    - Tránh việc sử dụng join với nhiều bảng như bên relational hoặc sử dụng lookup <br>
    - Update các thông tin liên quan cũng trong một câu lệnh query <br>
* Hạn chế: <br>
    - Lấy các dữ liệu trong một câu query cũng đồng nghĩa với việc có thể ta sẽ lấy ra những dữ liệu không cần thiết. Ta có thể cải thiện chúng bằng cách hạn chế size của document trong mỗi câu query <br>
    - Với mỗi document trong mongoDB chỉ giới hạn tối đa là 16MB. Do đó việc lưu quá nhiều data có thể dẫn đến việc tràn giới hạn này <br>
### Referencing
* Ưu điểm: <br>
    - Khi chia tách data ra, chúng ta sẽ hạn chế được dung lượng phải lưu trong các documents <br>
    - Việc phải query ra các dữ liệu thừa cũng hạn chế hơn <br>
    - Giảm thiểu được việc duplidate dữ liệu <br>
* Hạn chế
    - Giống như kiểu quan hệ relation, khi query lấy dữ liệu ta phải tốn ít nhất là 2 query hoặc phải sử dụng $lookup để lấy ra các dữ liệu <br>
# Các loại relationships với mongoDB
## One-to-One
Hãy cùng nhìn vào ví dụ của một User document. Trong ví dụ này, một user chỉ có duy nhất một name. Chúng ta có thể hiểu relationship này như là một cặp key-value trong database của ta <br>
``` javascript
    {
        "_id": "ObjectId('AAA')",
        "name": "Joe Karlsson",
        "company": "MongoDB",
        "twitter": "@JoeKarlsson1",
        "twitch": "joe_karlsson",
        "tiktok": "joekarlsson",
        "website": "joekarlsson.com"
    }
```
Với kiểu quan hệ này, chúng ta sẽ ưu tiên thiết kế theo dạng **embedded** <br>
## One-to-Few
Hãy cùng xét một kịch bản khác, khi ta phải lưu một vài địa chỉ ứng với mỗi user. Với kiểu thiết kế này, chúng ta sẽ có dữ liệu như ví dụ sau <br>
``` javascript
    {
        "_id": "ObjectId('AAA')",
        "name": "Joe Karlsson",
        "company": "MongoDB",
        "twitter": "@JoeKarlsson1",
        "twitch": "joe_karlsson",
        "tiktok": "joekarlsson",
        "website": "joekarlsson.com",
        "addresses": [
            { "street": "123 Sesame St", "city": "Anytown", "cc": "USA" },
            { "street": "123 Avenue Q",  "city": "New York", "cc": "USA" }
        ]
    }
```
Như ở trên đã đề cập là khi thiết kế với mongoDB ta không có rule nào cho chúng (**No rules**). Tuy nhiên, có một 'rule' khi thiết kế mà ta có thể xem xét đó là <br>
```
    Ưu tiên thiết kế theo dạng embedding trừ phi có một lý do chính đáng nào để không làm nó
```
Và với kiểu one-to-few này ta cũng ưu tiên thiết kế dạng embedding <br>
## One-to-Many
Có thể kiểu này chúng ta đã quá quen thuộc trong thiết kết relation và trong mongoDB cũng cho phép ta làm điều đó. Giả sử thiết kế một trang thương mại điện tử, với mỗi product, ta sẽ có nhiều phần (Parts) để lưu thông tin của chúng. Mỗi product sẽ lưu các array của các Object IDs tương ứng với các Parts đó <br>
``` javascript
    // Products
    {
        "name": "left-handed smoke shifter",
        "manufacturer": "Acme Corp",
        "catalog_number": "1234",
        "parts": ["ObjectID('AAAA')", "ObjectID('BBBB')", "ObjectID('CCCC')"]
    }
```
``` javascript
    // Parts
    {
        "_id" : "ObjectID('AAAA')",
        "partno" : "123-aff-456",
        "name" : "#4 grommet",
        "qty": "94",
        "cost": "0.94",
        "price":" 3.99"
    }
```
Đển đây ta lại có 'rule' khác khi thiết kế đó là <br>
```
    Khi cần truy cập dữ liệu một object của chính nó là lý do để ta không thiết kế theo dạng embedded
```
## One-to-Squillions
Nếu ta muốn có một schema đáp ứng được hàng triệu subdocuments, thì ta nên xem xét kiểu thiết kế này. Giả sử, ta được giao nhiệm vụ thiết kế một hệ thống tạo log server cho app. Mỗi server có thể có một lượng dữ liệu log khổng lồ. Có thể ta sẽ thiết kế với mỗi host sẽ lưu dữ liệu của các logs message, Tuy nhiên với mongoDB, khi ta tracking data mà không biết giới hạn của array khi lưu trữ chúng thì sẽ rất nguy hiểm, vì ta không biết được sẽ có bao nhiêu log được sinh ra, nó có thể đạt đến giới hạn 16MB như ta đã tìm hiểu ở bên trên. Vì vậy, thay vì việc thiết kết như thế này, ta sẽ để mỗi log message lưu trữ dữ liệu của host và message đính kèm. Bằng việc lưu data trong mỗi log, ta sẽ không phải lo lắng về việc sẽ tràn dữ liệu khi lưu trữ trong array. <br>
``` javascript
    // Hosts
    {
        "_id": ObjectID("AAAB"),
        "name": "goofy.example.com",
        "ipaddr": "127.66.66.66"
    }
```
``` javascript
    // Log Message
    {
        "time": ISODate("2014-03-28T09:42:41.382Z"),
        "message": "cpu is on fire!",
        "host": ObjectID("AAAB")
    }
```
Ta có thêm một 'rule' đó là <br>
```
    Array không nên được dùng nếu ta không biết giới hạn của chúng. Nếu có hơn một vài trăm document bên phía 'many', không nên dùng embedding. Nếu có hơn một vài nghìn documents bên phía 'many', không nên sử dụng mảng của các Object ID để reference.
```
## Many-to-Many
Cuối cùng, chúng ta sẽ đến với kiểu thiết kế nhiều-nhiều. Với kiểu này, hãy tưởng tượng ta build một ứng dụng là TODO app. Trong app của chúng ta, mộg user sẽ có nhiều task, và một task có thể được assign cho nhiều user. Ta sẽ có như sau <br>
``` javasript
    // Users
    {
        "_id": ObjectID("AAF1"),
        "name": "Kate Monster",
        "tasks": [ObjectID("ADF9"), ObjectID("AE02"), ObjectID("AE73")]
    }
```
``` javascript
    // Tasks
    {
        "_id": ObjectID("ADF9"),
        "description": "Write blog post about MongoDB schema design",
        "due_date": ISODate("2014-04-01"),
        "owners": [ObjectID("AAF1"), ObjectID("BB3G")]
    }
```
Nhìn vào ví dụ trên có thể thấy mỗi user sẽ có một array để lưu trữ các object ID của task, và mỗi task sẽ lưu trữ array các object ID của user mà được assign bởi task đó. <br>
# Kết luận
Trên đây là những gì tìm hiểu về các cách để thiết kế dữ liệu với mongoDB, có thể thấy có khá nhiều cách thiết kế khác nhau có thể kết hợp lại. Có một số 'rules' đưa ra khi thiết kế tuy nhiên nó không phải là bắt buộc, mà sẽ phụ thuộc hoàn toàn vào ứng dụng ta đang phát triển để có một thiết kế tốt và linh hoạt nhất. Hi vọng bài viết giúp ích cho mọi người, hẹn gặp lại!
# Reference
https://www.mongodb.com/developer/article/schema-design-anti-pattern-massive-arrays/ <br>
https://www.tutorialspoint.com/mongodb/index.htm <br>
https://www.mongodb.com/developer/article/mongodb-schema-design-best-practices/ <br>
https://docs.mongodb.com/manual/core/data-model-design/ <br>