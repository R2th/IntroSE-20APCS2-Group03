![](https://hackernoon.com/drafts/7p1mn330q4.png)
- Trong thời đại hiện nay, chúng ta luôn có kết nối mạng nhanh, đáng tin cậy trên các thiết bị di động. Thật không may, cho dù bạn đang lái xe trên đường, bao quanh bởi hàng ngàn người khác đang sử dụng điện thoại, hoặc thậm chí ở một khu vực là vị trí đắc địa của dữ liệu, bạn sẽ không gặp phải vấn đề kết nối. May mắn thay, các vấn đề như thế này có thể được giảm thiểu bằng cách lưu trữ dữ liệu cục bộ. Một số giải pháp để giải quyết việc này đó là [Couchbase ](http://www.couchbase.com/)
### Couchbase 
- Couchbase là một công ty cung cấp cơ sở dữ liệu NoSQL phân tán có thể được lưu trữ local hoặc trên clould 
- [Couchbase Mobile](https://www.couchbase.com/products/mobile) được thừa hưởng từ Couchbase một cách tuyệt vời bằng cách cung cấp khả năng quản lí và đồng bộ dữ liệu trên bất kì cloud hay server nào đến thiết bị động gồm ba phần chính :
1. Couchbase Lite : cơ sở dữ liệu NoSQL được thiết kế theo dạng Json được dùng trong app mobile
2. Sync Gateway : một cơ chế đồng bộ hóa trên internet giúp đồng bộ hóa dữ liệu giữa client và server một cách an toàn
3.  Couchbase Server, một nền tảng cơ sở dữ liệu NoSQL có khả năng mở rộng cao 

![](https://hackernoon.com/photos/gsw7B04U0yPHQTIT0Z29jKY2Yy63-zm230nm)

### Couchbase Lite 
- Như đã nói ở trên Couchbase Lite là một công cụ cơ sở dữ liệu có khả năng đồng bộ hóa được tổ chức dưới dạng NoSQL. Trong khi các cơ sở dữ liệu quan hệ được tạo thành một tập hợp các bảng, còn với Couchbase được tổ chức dưới dạng Json

```Json
{
  "name": "Rob",
  "age": 34,
  "type": "person"
}
```
- Couchbase Lite còn sử dụng một giải pháp mã hóa nhị phân hiệu quả được gọi là Fleece. Fleece là một mã hóa nhị phân cho dữ liệu bán cấu trúc. Mô hình dữ liệu của nó là superset  của JSON, thêm hỗ trợ cho các giá trị nhị phân. Một số đặc điểm của nó 
1. **Very fast to read (đọc rất nhanh)** : Không cần phân tích cú pháp và dữ liệu có thể được điều hướng và đọc mà không cần phân bổ heap. Fleece object là con trỏ nội bộ vào dữ liệu thô. Mảng và từ điển có thể được truy cập ngẫu nhiên. Hiệu suất trên dữ liệu quy mô thực tế đã đạt mức 20 lần so với JSON. Bạn có thể xem [benchmark](https://github.com/couchbaselabs/fleece/blob/master/Performance.md) để kiểm chứng 
2. **Compact (Nhỏ gọn)**: Các giá trị đơn giản sẽ có cùng kích thước với JSON. Các giá trị phức tạp có thể nhỏ hơn nhiều, vì các giá trị lặp lại, đặc biệt là các chuỗi, chỉ cần được lưu trữ một lần.
3. **Efficient to convert into native objects**: chuyển đổi thành các đối tượng nguyên thủy hiệu quả)
4.**Appendable (có thể bổ xung)** : Fleece được biết đến là một [persistent data structure](https://en.wikipedia.org/wiki/Persistent_data_structure) . Một Fleece document có thể được thay đổi bằng cách thêm dữ liệu vào nó. Sự thay đổi thường là rất nhỏ so với ban đầu nên rất đơn giản kiểm soát version 

- Couchbase Lite hiện tại đang cung cấp bao gồm hầu hết tất cả các nền tảng di động như IOS, Android, Xamarin 

### Cách hoạt động cơ bản
- Couchbase Lite hỗ trợ việc thêm sửa xóa. Dưới đây là một ví dụ với MutbleDocument

**Swift (iOS)**

``` swift
let doc = MutableDocument()
    .setString("person", forKey: "type")
    .setString("Rob", forKey: "name")
    .setInt(34, forKey: "age")
try database.saveDocument(doc)
```

**Java (Android)**

``` java 
MutableDocument doc = new MutableDocument();
newTask.setString("type", "person");
newTask.setString("name", "Rob");
newTask.setInt("age", 34);
try {
    database.save(doc);
} catch (CouchbaseLiteException e) {
    Log.e(TAG, e.toString());
}
```

**C # (Xamarin)**

``` c
using (var doc = new MutableDocument("person::1")) 
{
    doc.SetString("type", "person");
    doc.SetString("name", "Rob");
    doc.SetInt("age", 34);

    db.Save(doc);
}

```
- Với Xamarin bạn còn có thể sử dụng Couchbase.Lite.Mapping!

### Truy vấn

- Nếu bạn đã từng xử dụng Realm thì bạn thấy rằng cách truy vấn của CouchBase Lite cũng tương tự như Realm. 
- Dưới đây là một số ví dụ cơ bản

**Swift (iOS)**
``` swift
let query = QueryBuilder
    .select(SelectResult.all())
    .from(DataSource.database(database))
    .where(Expression.property("type").equalTo(Expression.string("person"))))Query query = QueryBuilder
    .select(SelectResult.all())
    .from(DataSource.database(database))
    .where(Expression.property("type").equalTo(Expression.string("person"))));
```

**Java (Android)**
``` java 
Query query = QueryBuilder
    .select(SelectResult.all())
    .from(DataSource.database(database))
    .where(Expression.property("type").equalTo(Expression.string("person"))));

```

**C # (Xamarin)**
``` c
 var query = QueryBuilder.Select(SelectResult.All())
    .From(DataSource.Database(db))
    .Where(Expression.Property("type").EqualTo(Expression.String("person"))));
```

Ngoài ra nó còn hỗ trợ LiveQuery nghĩa là nó hỗ trợ việc lắng nghe dữ liệu thay đổi, đây là một cách tuyệt vời để phản ứng lại với UI cho người dùng.
**Swift (iOS)**
``` swift
let token = query.addChangeListener { (change) in
for result in change.results! {
    print(result.keys)
}
```
**Java (Android)**
``` java 
ListenerToken token = query.addChangeListener(change -> {
    for (Result result: change.getResults()) {
        Log.d(TAG, "results: " + result.getKeys());
    }
});
```
**C # (Xamarin)**
``` c
var token = query.AddChangeListener((sender, args) =>
{
    var allResult = args.Results.AllResults();
    foreach (var result in allResult) {
        Console.WriteLine(result.Keys);
    }
});
```

### Full - text search
Full Text Search cho phép ta tạo, quản lý và truy vấn các index có mục đích đặc biệt, được xác định trên document trong database. Full Text Search cung cấp các khả năng mở rộng truy vấn với ngôn ngữ tự nhiên
Create FTS index 
**Swift (iOS)**
``` swift
do {
    let index = IndexBuilder.fullTextIndex(items: FullTextIndexItem.property("name")).ignoreAccents(false)
    try database.createIndex(index, withName: "nameFTSIndex")
} catch let error {
    print(error.localizedDescription)
}
``` 
**Java (Android)**
``` java 
database.createIndex(
    "nameFTSIndex",
    IndexBuilder.fullTextIndex(FullTextIndexItem.property("name")).ignoreAccents(false));
```
**C # (Xamarin)**
``` c
var index = IndexBuilder.FullTextIndex(FullTextIndexItem.Property("name")).IgnoreAccents(false);
db.CreateIndex("nameFTSIndex", index);
```
* Tạo truy vấn full text search

**Swift (iOS)**
``` swift 
let whereClause = FullTextExpression.index("nameFTSIndex").match("'buy'")
let query = QueryBuilder
    .select(SelectResult.expression(Meta.id))
    .from(DataSource.database(database))
    .where(whereClause)

do {
    for result in try query.execute() {
        print("document id \(result.string(at: 0)!)")
    }
} catch let error {
    print(error.localizedDescription)
}
```

**Java (Android)**
```java
Expression whereClause = FullTextExpression.index("nameFTSIndex").match("buy");
Query ftsQuery = QueryBuilder.select(SelectResult.expression(Meta.id))
    .from(DataSource.database(database))
    .where(whereClause);
ResultSet ftsQueryResult = ftsQuery.execute();
for (Result result : ftsQueryResult) {
    Log.i(
        TAG,
        String.format("document properties %s", result.getString(0)));
}
```

**C # (Xamarin)**

```c
var whereClause = FullTextExpression.Index("nameFTSIndex").Match("'buy'");
using (var query = QueryBuilder.Select(SelectResult.Expression(Meta.ID))
    .From(DataSource.Database(db))
    .Where(whereClause)) {
    foreach (var result in query.Execute()) {
        Console.WriteLine($"Document id {result.GetString(0)}");
    }
}
```

### Predictive querying (Truy vấn dự đoán)
Couchbase Lite còn hỗ trợ truy vấn dự đoán sử dụng học máy, bằng cách cung cấp các hàm truy vấn có thể xử lý dữ liệu document (thuộc tính hoặc đốm màu) thông qua các ML Model được đào tạo .

![](https://hackernoon.com/photos/gsw7B04U0yPHQTIT0Z29jKY2Yy63-tpdi9304f)

Để tìm hiểu thêm về Predictive querying bạn có thể đọc thêm tài liệu ở [đây](https://hackernoon.com/couchbase-mobile-the-power-of-nosql-on-the-edge-dkdhx30jl)

### Peer-to-peer Replication
- Cho phép các thiết bị chạy Couchbase Lite đồng bộ hóa trực tiếp dữ liệu với nhau. Couchbase Lite chịu trách nhiệm lưu trữ dữ liệu và theo dõi quá trình trao đổi dữ liệu, nhưng không chịu trách nhiệm cho việc truyền dữ liệu.

![](https://hackernoon.com/photos/gsw7B04U0yPHQTIT0Z29jKY2Yy63-vhgbz30zp)

Việc gửi và nhận dữ liệu phải được xử lý bowru platform API hoặc framework thứ 3 

### Sync Gateway
- Sync Gateway là một máy chủ web quản lý an toàn việc kiểm soát truy cập và đồng bộ hóa dữ liệu giữa Couchbase Lite và Couchbase Server.

![](https://hackernoon.com/photos/gsw7B04U0yPHQTIT0Z29jKY2Yy63-wv63xr6)

Đối với Mobile developer, việc tạo ra chức năng đồng bộ hóa chưa bao giờ là chuyện dễ dàng. Có rất nhiều vấn đề phải xử lý như
1. Khả năng giải quyết xung đột cho các dữ liệu có thể được cập nhật hoặc xóa bởi nhiều người dùng cùng một lúc
2. Cấu hình linh hoạt để thích ứng vơi thay đổi
3. Điều chỉnh , kiếm soát truy cập dữ liệu thông qua xác thực và ủy quyền

Rất may là Sync Gateway đã xử lý tất cả những vấn đề đó

**Giải quyết xung đột**

Kể từ Couch Lite 2.0 tất cả những conflict khi update dữ liệu đều được tự động giải quyết

**Configuration**
File config xác định cấu hình server và database hay nhiều database, Sync Gateway có thể tương tác
```json
{
  "logging": {
    "console": {
     "log_level": "debug",
     "log_keys": ["*"],
     "color_enabled": false
   }
  },
  "databases": {
    "couchdraw": {
      "server": "http://localhost:8091",
      "bucket": "couchdraw",
      "username": "couchdraw_user",
      "password": "password",
      "num_index_replicas": 0,
      "enable_shared_bucket_access": true,
      "import_docs": "continuous",
      "users": { "GUEST": { "disabled": false, "admin_channels": ["*"] } },
      "allow_conflicts": false,
      "revs_limit": 20
    }
  }
}

```

Để tìm hiểu chi tiết về file config bạn có thể xem chi tiết [tại đây ](https://docs.couchbase.com/sync-gateway/2.5/config-properties.html)

**Kiểm soát truy cập**
Sync Gateway hỗ trợ nhiều cách thức xác thực
1. [Basic Authentication](https://docs.couchbase.com/sync-gateway/2.5/authentication.html#basic-authentication) : cung cấp tên người dùng và mật khẩu để xác thực
2. [Auth Providers](https://docs.couchbase.com/sync-gateway/2.5/authentication.html#auth-providers) : Sync Gateway cũng cấp cấp cách xác thực với Facebook, Google
3. [Custom Authentication](https://docs.couchbase.com/sync-gateway/2.5/authentication.html#custom-authentication) : Xử dụng server app để tự xử lý việc xác thực và tạo ra session trên Sync Gateway Admin REST API
4. [OpenID Connect Authentication](https://docs.couchbase.com/sync-gateway/2.5/authentication.html#openid-connect): Sử dụng OpenID connect (Google+, Paypal,...) để xác thực người dùng 

### Định tuyến dữ liệu
Sync Gateway sử dụng các channel để giúp dễ dàng chia sẻ cơ sở dữ liệu giữa một số lượng lớn người dùng và kiểm soát quyền truy cập vào cơ sở dữ liệu. Channel là trung gian giữa dữ liệu và người dùng. Mỗi document trong database thuộc về một tập hợp các channel và mọi user đều được phép truy cập vào một tập hợp các channel. User có thể sử dụng các channel để 
1. Phân vùng tập dữ liệu.
2. Cho phép người dùng truy cập tài liệu.
3. Giảm thiểu lượng dữ liệu được đồng bộ hóa xuống các thiết bị

### Couchbase Server
Couchbase server là một cơ sở dữ liệu phân tán NoSQL opensource. Nó chuyên cung cấp quản lý dữ liệu có độ trễ thấp cho các ứng dụng web, mobile, IOT,..
Couchbase Lite thông qua Sync Gateway, mặc dù không phải là bắt buộc, tích hợp với Couchbase Server để cung cấp giải pháp hoàn chỉnh

Bạn có thể tìm hiểu thêm cách sử dụng Couchbase Mobile [tại đây](https://docs.couchbase.com/userprofile-couchbase-mobile/standalone/userprofile/android/userprofile_basic.html) 

### References
- https://hackernoon.com/couchbase-mobile-the-power-of-nosql-on-the-edge-dkdhx30jl