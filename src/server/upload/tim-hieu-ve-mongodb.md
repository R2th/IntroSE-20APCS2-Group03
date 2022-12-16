# Tìm hiểu về MongoDB
Bài viết là một số tìm hiểu của mình để sử dụng MongoDb.
# Một số khái niệm cơ bản
## Documents
Document Là một khái niệm cơ bản nhất trong MongoDB, nó tương đương với một hàng trong các hệ quản trị cơ sở dữ liệu quan hệ khác vậy nhưng khả năng lưu trữ đa dạng hơn nhiều. Document có cấu trúc theo dạng nhiều bộ các key-value giống như dạng json, ví dụ:
```
{"title": "MongoDB", "content": "Tìm hiểu về MongoDB"}
```
## Collections
Một collection là một nhóm các document, nếu document tương tự một hàng trong các cơ sở dữ liệu quan hệ thì collection sẽ tương đương với một bảng. Điều đặc biệt hơn là collection có thể lưu trữ rất linh hoạt. Ví dụ để lưu thông tin bài viết và các bình luận trong bài viết, ta sẽ phải tạo 2 bảng như sau:

| ---------Posts----------- | 
| -------- |
| id|
| Title|
| Content|
| Author|
| Created_at|

|---------Comments-------------- | 
| -------- |
| id|
| Email|
| Content|
| Post_id|

Tuy nhiên ta chỉ cần một collection để lưu toàn bộ thông tin như trên, và document chứa thông tin một bài viết sẽ có dạng:
```
{
    "title": "MongoDB",
    "content": "Tìm hiểu về MongoDB",
    " Author": "hungkq",
    "Comments": [
        {
            "email": "Email1@gmail.com",
            "content": "..."
        },
        {
            "email": "Email2@gmail.com",
            "content": "..."
        }
    ]
}
```
Về cơ bản, bàn hoạn toàn có thể lưu toàn bộ thông tin cần sử dụng chỉ với một Collection. Nhưng tốt nhất bạn không nên làm vậy :)
Collection chứa quá nhiều thông tin sẽ gặp phải vấn đề về hiệu suất, quản lý khi code, lưu trữ.
## Database
Database là một nhóm các collection. Một máy chủ MongoDB có thể chứa 0 hoặc nhiều database. Khi vừa cài đặt ta sẽ có 3 database mặc định là admin, local, test.

**Admin**

Là database gốc của MongoDB, chứa các thông tin để xác thực, bảo mật. Nếu một user được thêm vào admin database, user này sẽ có tất cẩ các quyền trên tất các database. 

**Local**

Database này chỉ được sử dụng trong replication system. Nó sẽ lưu thữ thông tin của từng máy chủ thành viên trong Replica Set.

**Test**

Database này giống như các database bình thường khác. Bạn có thể dùng nó để luyện tập.

# MongoDB Shell
MongoDB có một Javascript Shell giúp bạn có thể tương tác với MongoDB bằng câu lệnh. Bạn có thể dùng lệnh sau để kết nối với MongoDB chạy trên **localhost của bạn** và có cổng mặc định là **27017**
```
mongo
```

Chạy với host và port tùy chỉnh thì dụng lệnh sau
```
mongo --host <HOSTNAME> --port <PORT>
```

Vì là một Javascript shell bạn hoàn toàn có thể viết mã Javascript để thực hiện các phép toán, function,....
```js
> Math.PI
3.141592653589793
> function random(s,f) {
... return Math.floor(Math.random() * (s - f + 1) + f);
... }
> random(1,5)
2
> 
```

Một số câu lệnh hữu ích bạn có thể sử dụng:
```js
show dbs                         //show databases name
show collections                 //show collections in current database
show users                       //show users in current database
load('script.js')                //running scripts with the shell 
```
# Các câu lệnh dùng trong MongoDB
## Tạo mới một document
Để thêm một document vào một collection. Bạn có thể dùng lệnh insert
```js
db.users.insert({'username': 'hungk'})
```
Bạn cũng có thể thêm nhiều bản ghi cùng lúc với lệnh insertMany
```js
db.users.insertMany(
    [
        {username: 'test1'},
        {username: 'test2'}
    ]
)
```

MongoDB có giới hạn việc thêm Document là bạn nên giữ cho một Document của bạn dưới 16MB. Vì vậy ngay cả khi MongoDB rất linh hoạt, bạn cũng nên tính toán cẩn thận khi tạo collection để không phải rơi vào trường hợp Document vượt quá 16MB. Để xem một Document đang chứa bao nhiêu dung lượng, bạn có thể dùng lệnh Object.bsonsize(doc) từ mongoshell.
## Lệnh truy vấn dữ liệu
Để query trong MongoDB bạn có thể dùng lệnh find().
```js
db.users.find()
```
Câu lệnh trên sẽ trả về tất cả user trong collection users. Bạn có thể thêm các điều kiện vào câu truy vấn.
```js
db.users.find({age: 18})                            //Tìm tất cả user 18 tuổi
db.users.find({gender: 'male', age: 18})            //Tìm tất cả user 18 tuổi và là nam giới
```
Để chỉ ra các trường bạn muốn trả về
```js
db.users.find({age: 18}, {username: 1, _id: 0})     //Tìm tất cả user 18 tuổi, chỉ trả về username, và không trả về _id
```
MongoDB còn cung cấp một số operators đặc biệt hỗ trợ truy vấn.

| Tên | Cách dùng |
| -------- | -------- |
|$eq | Tìm các giá trị bằng giá trị chỉ định|
|$gt | Tìm các giá trị lớn hơn giá trị chỉ định|
|$gte | Tìm các giá trị lớn hơn bằng giá trị chỉ định|
|$lt | Tìm các giá trị nhỏ hơn giá trị chỉ định|
|$lte | Tìm các giá trị nhỏ hơn bằng giá trị chỉ định|
|$ne | Tìm các giá trị không bằng giá trị chỉ định|
|$in | Tìm các giá trị có trong mảng chỉ định|
|$nin | Tìm các giá trị không có trong mảng chỉ định|

Ví dụ:
```js
db.users.find({age: { $gt: 18, $lt: 24 }})
db.users.find({age: { $in: [18,19,20] }})
```

## Chỉnh sửa một Document
Để chỉnh sửa một document hiện có bạn có thể dùng lệnh update, nó có dạng như sau:
```js
db.users.update(query, value)
db.users.update({age: 22}, {username: 'hungkq'})
```
Với lệnh update bạn nên sử dụng một query có thể xác định một document duy nhất, trong trường hợp có nhiều document cùng được truy vấn. MongoDB sẽ chỉ update document đầu tiên tìm thấy. **Có một chú ý đặc biệt là lệnh update, sẽ thay thế toàn bộ document tìm được thành giá trị bạn truyền vào.**
```js
db.users.find()
> { "_id" : ObjectId("5d0ffb438f4cfec5b6fcaeb0"), "username" : "user1", "age" : 22, "gender" : "male" }
db.users.update({username: 'user1'}, {age: 24})
db.users.find()
> { "_id" : ObjectId("5d0ffb438f4cfec5b6fcaeb0"), "age" : 22 }
```
Như bạn thấy, dùng lệnh update sai cách có thể khá nguy hiểm. MongoDB cung cấp một số update operators đặc biệt để sử dụng là:
| Tên | Cách dùng |
| -------- | -------- |
|$currentDate | Đặt giá trị trường chỉ định thành thời gian hiện tại|
|$inc | Tăng giá trị trường chỉ định|
|$set |Đặt giá trị trường chỉ định |
|$rename | Đổi tên trường chỉ định|
|$unset | Xóa trường chỉ định khỏi document |

Ví dụ:

```js
db.users.update({username: 'user1'},{$set: {age: 24}})
```

Tổng kết
Qua bài viết, hy vọng mọi người có thể biết thêm một số kiến thức cơ bản trong quá trình sử dụng MongoDB. Có gì sai sót, mong mọi người góp ý thêm ![](https://tracktracktrack.herokuapp.com/0egnk6uoptxb9fay/img)