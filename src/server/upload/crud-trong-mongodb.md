![](https://images.viblo.asia/39151b3b-546c-4be1-989a-afd930108781.jpg)
Trong bài viết này, chúng ta sẽ tìm hiểu một vài ví dụ về hệ thống ‘CRUD’ trong MongoDB.
## Khôi phục mongostore
Sau khi chắc chắn mongod và mongo đã được khởi động, hãy bật ‘terminal’ và sử dụng câu lệnh:  `mongorestore dump`
![](https://images.viblo.asia/0e8e5436-eef3-4525-8476-5367b1675720.png)
## Creating documents
Có hai lệnh chính để ‘Creating documents’ trong MongoDB:

Mặc dù MongoDB có khả năng tự tạo ID, chúng ta vẫn có thể tuỳ chỉnh những ID đó bởi `_id` parameter trong các cú pháp insert…().

Để nhập vào nhiều dữ liệu đồng thời, chúng ta sẽ dùng cú pháp `insertMany()` – cú pháp này sẽ nhập vào DB một mảng dữ liệu trong đó gồm các tham số là `documents`. Mỗi khi được thực thi, nó sẽ trả về các id cho từng `document` trong mảng. Và để xoá `collection`, sử dụng câu lệnh `drop()`. Và đôi khi chúng ta nhập dữ liệu với số lượng lớn – sẽ xảy ra những dữ liệu bị trùng lặp và đặc biệt nếu chúng ta nhập những dữ liệu trùng id thì hệ thống sẽ trả về các thông báo lỗi:

```
db.startup.insertMany(
[
{_id:"id1", name:"Uber"},
{_id:"id2", name:"Airbnb"},
{_id:"id1", name:"Uber"},
]
);
```

![](https://images.viblo.asia/0bee294b-e038-4fde-af1d-30b023ab6c91.png)

MongoDB sẽ dừng quá trình nhập liệu và nếu chúng ta muốn bỏ qua lỗi này có thể dùng cú pháp `ordered:false` :

```
db.startup.insertMany(
[
{_id:"id1", name:"Uber"},
{_id:"id2", name:"Airbnb"},
{_id:"id1", name:"Airbnb"},
],
{ordered: false}
);
```

## Trường _id
MongoDB gán trường `id` tới mỗi `document` và đặt khoá chính và `index` tại đó. Mặc định MongoDB tạo ra những giá trị sẵn có cho trường  `id` với thuộc tính là `ObjectID`. Giá trị này được định nghĩa dưới dạng BSON và có cấu trúc như sau:

```
ObjectID (12 bytes HEX string) = Date (4 bytes, a timestamp value representing number of seconds since the Unix epoch) + MAC address (3 bytes) + PID (2 bytes) + Counter (3 bytes)
```

## Reading documents
Lọc dữ liệu với cú pháp `find()`:
```
db.Collection1.find({name: 'ABC'})
```

Ngoài ra chúng ta có thể dùng hàm count() và pretty() để nhận được dữ liệu dễ đọc hơn. Hoặc kết quả truy vấn dữ liệu trả về có thể được rút gọn lại với cú pháp sau:
```
db.Collection1.find({name: 'ABC', rollNo: 5})
```
Cần chú ý rằng những bộ lọc này mặc định đã được sử dụng toán tử “AND”, để sử dụng toán tử “OR” chúng ta cần dùng cú pháp `$or`. Các bộ lọc này sẽ được tuỳ chỉnh tuỳ thuộc vào cấu trúc của `document`. Ví dụ: thuộc tính `name` trong đối tượng `school`, chúng ta sẽ đặt bộ lọc như sau: “school.name” = ‘AUHS’.

So sánh bằng trong một mảng có thể được thực hiện như sau:
* trên toàn bộ mảng
* dựa trên từng phần tử
* dựa trên phần tử cụ thể
* có thể kết hợp phức tạp hơn bằng cách sử sụng các toán tử

Trong đoạn truy vấn sau:

```
db.Collection1.find({name: ['ABC','XYZ']})
```

MongoDB sẽ xác định các `documents` bằng cách kết hợp các mảng của một hay nhiều giá trị. Giờ đây thứ tự của các thuộc tính không còn là vấn đề, điều này có nghĩa rằng chúng ta sẽ nối những document ABC, XYZ như hai phần tử của tên mảng.

```
{name:["ABC","GHI","XYZ"]},
{name:["DEF","ABC","XYZ"]}
```
Trong document phía trên, để lấy ra tất cả các document với ABC là phần tử đầu tiên, chúng ta sẽ dùng câu truy vấn sau:

```
db.Schools.find({'name.0': 'ABC' })
```
## Cursors trong MongoDB
MongoDB trả về kết quả hàng loạt và để xem còn lại bao nhiêu đối tượng còn sót lại, chúng ta sử dụng `objLeftInBatch()`:

```
var c = db.Schools.find();
var doc = function() {return c.hasNext()? c.next : null;}
c.objLeftInBatch();
```
## Projection trong MongoDB

Trong MongoDB, ý nghĩa của `projection` là chỉ chọn dữ liệu cần thiết thay vì chọn toàn bộ dữ liệu của một `document`. Nếu một `document` có 5 trường và bạn chỉ cần 3 trường, thì bạn chỉ nên chọn 3 trường từ `document` đó.

## Toán tử so sánh trong MongoDB
Chúng ta có thể sử dụng toán tử so sánh thông qua các câu truy vấn, ví dụ:
```
db.Schools.find({rollNo: {$gt: 10}})
```

để tìm ra tất cả các sinh viên có roll number > 10. Và với $lt để giới hạn dữ liệu trong khoảng giá trị, ví dụ:

```
db.Schools.find({rollNo: {$gt: 10, $lt: 50}})
```

Ngoài ra còn những toán tử như là: $gte (lớn hơn hoặc bằng), $lte (nhỏ hơn hoặc bằng), $ne (khác). Một điều cần chú ý với toán tử $ne đó là không chỉ trả về documents có giá trị khác với giá trị được chỉ định mà còn trả về những document không chứa các phần tử trong nó.

## Element operators trong MongoDB
Bởi mô hình dữ liệu linh hoạt của MongoDB nên chúng ta có thể dễ dàng nhận ra sự tồn tại hay không tồn tại của các trường. Sự linh hoạt của mô hình này còn được mở rộng tới từng trường giá trị bên trong, nó có thể cho phép chúng ta có thể có các trường giống nhau trong các Collection với dữ liệu khác nhau. Ngoài ra `$exists` được dùng để kiểm tra sự tồn tại của phần tử và `$type` được dùng để xác định loại dữ liệu của từng trường.

## Logical operators

Giống như `SQL`, có những logical operators như là `$and, $or, $not, $nor`. Ví dụ:

```
db.Schools.find({
$and: [{ rollNo: { $gt: 10 }}, { rollNo: { $gt: 50 }}]
})

db.Schools.find({
$or: [{ rollNo: { $gt: 10 }}, { rollNo: { $gt: 50 }}]
})
```

Câu hỏi đặt ra là: Tại sao chúng ta có toán tử `$and` trong khi mặc định bộ lọc đã có chức năng `AND`

Bới dưới dạng JSON `document`, chúng ta không thể dùng những key bị trùng lặp. Với ví dụ của toán tử `$and` ở trên, chúng ta phải dùng tới AND `rollNo` hai lần. Cần ghi nhớ rằng `$and` được dùng khi chúng ta cần lọc dữ liệu có cùng trường.

## Regular operators
```
db.Schools.find({
{ name: { $regex: /^AB\s.*/ }}
})
```

* dấu `/` dùng để bắt đầu và kết thúc biểu thức chính.
* dấu `^`  để bắt đầu matching với chính xác với ký tự AB viết hoa.
* dấu `.` để tìm ký tự bất kỳ.
* dấu `*` để kiểm tra ký tự xuất hiện không hoặc nhiều lần.
* `\s` là khoảng trắng đằng sau AB.

Các toán tử sau thường được sử dụng để làm việc với mảng:

* `$all` để lấy tất cả các giá trị trong mảng.
* `$size` để xem kich thước của mảng.
* `$elemMatch` trả về giá trị trong khoảng định sẵn.

## Updating documents

MongoDB cung cấp 3 cách để update documents.
* `updateOne()` – đối số đầu tiên là đối tượng được chỉ định, đối số thứ 2 là giá trị được thay đổi
* `updateMany()`
* `replaceOne()`

```
db.Schools.updateOne({ name: "ABC" }, { $set: { rollNo: 15 } })
```

Toán tử `$set` thay thế (hoặc thêm vào nếu không tồn tại) giá trị của trường được chỉ định. Và để làm việc với các mảng cũng như vậy, đối với mỗi mảng chúng ta sử dụng toán tử `$each.$position` và sử dụng `$push` để chỉ định vị trí trong mảng để thêm các đối tượng.

Đôi khi chúng ta sẽ gặp phải các phần tử được gán với giá trị `NULL`. Điều này để tránh không cần sử dụng toán tử `$unset`.

```
db.Schools.updateMany({ name: null }, { $unset: { name: "" } })
```

Trên đây mình đã giới thiệu qua về một vài thao tác cơ bản khi làm việc với MongoDB, bài viết còn nhiều thiếu sót. Cám ơn mọi người đã đọc bài viết.