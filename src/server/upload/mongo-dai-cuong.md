## 1. Cài đặt MongoDB
#### Trên window
Truy cập vào url: https://www.mongodb.com/try/download/community
- Phiên bản Community là phiên bản dành cho cộng đồng miễn phí
- Version: 5.0.2(current) - tại thời điểm tháng 9/2021
- Platform: Windows
- Package: msi

![cài đặt mongoDB community server](https://images.viblo.asia/d2e85b95-086d-43bf-ae7a-6b5bc9c98dbc.jpg)

#### Trên Ubuntu

```js
// Cập nhật phiên bản phần mềm
sudo apt update

// Cài mongoDB
sudo apt install mongodb

// Kiểm tra mongoDB cài được chưa?
sudo systemctl status mongodb
```

## 2. Kiểm tra mongoDB

```js
// Đối với window khi chưa cài biến môi trường,
// thì ta phải vào tận nơi cài đặt, mở cmd tại đây
C:\Program Files\MongoDB\Server\5.0\bin

// Khởi động mongoDB
mongo

// Kết quả
MongoDB shell version v5.0.2
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("4246f2ac-0933-47cd-9e7c-09b8730ed98e") }
MongoDB server version: 5.0.2
```

```js
// Thoát mongoDB
exit

// Kết quả
bye
```

## 3. Thao tác với database

### 3-1. Xem danh sách
```js
show dbs

// Kết quả
admin         0.000GB
config        0.000GB
local         0.000GB
```

### 3-2. Tạo DB mới hoặc sử dụng DB có sẵn
```js
use <new_database>

// Ví dụ
use shopping_app

// Kết quả
switched to db shopping_app
```

### 3-3. Xem đang sử dụng DB nào
```js
db

// Kết quả
shopping_app
```

### 3-4. Xóa DB
```js
use <db_name>
db.dropDatabase()

// Ví dụ
use shopping_app
db.dropDatabase()

// Kết quả
> use shopping_app
switched to db shopping_app
> db.dropDatabase()
{ "ok" : 1 }
```

### 3-5. Import DB từ CSV
Kể từ Version 4.4.0, bạn phải cài đặt thêm MongoDB Database Tools để import, export data.

Link hướng dẫn: https://docs.mongodb.com/database-tools/installation/installation/

Link cài đặt: https://www.mongodb.com/try/download/database-tools

![mongodb-tool.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1629800044677/flFpz5_C7.jpeg)

```js
// Đối với window khi chưa cài biến môi trường,
// thì ta phải vào tận nơi cài đặt, mở cmd tại đây
C:\Program Files\MongoDB\Tools\100\bin

mongoimport --type csv -d <db_name> -c <collection_name> --headerline --drop /path/to/file.csv

--type: kiểu là csv
-d: tên database
-c: tên collection
--headerline: bỏ đi dòng đầu của file csv
--drop: nếu database đã tồn tại thì xóa và tạo mới
/path/to/file.csv: đường dẫn tới file csv

// Ví dụ
mongoimport --type csv -d shopping_app -c users --headerline --drop D:\backup\db-shopping-app.csv
```

### 3-6. Import DB từ JSON
```js
mongoimport --type json -d <db_name> -c <collection_name> --drop /path/to/file.json

// Ví dụ
mongoimport --type json -d shopping_app -c users --drop D:\backup\db-shopping-app.json
```

### 3-7. Export DB

```js
mongodump --db <db_name> --out /path/to
mongodump --db <db_name> --out /path/to --gzip

--out: chỗ lưu database

// Ví dụ
mongodump --db shopping_app --out D:\backupDB
mongodump --db shopping_app --out D:\backupDB --gzip
```

## 4. Collection

### 4-1. Xem collections
```js
show collections
```

### 4-2. Thêm collection
```js
db.category.insert({name: 'Laptop'})
// Hoặc
db.createCollection('Laptop')

// Kết quả
{ "ok" : 1 }
```

### 4-3. Sửa collection
```js
db.<collection_name>.renameCollection('new_name')

// Ví dụ
db.users.renameCollection('Users')

// Kết quả
{ "ok" : 1 }
```

### 4-4. Xóa collection
```js
db.<collection_name>.drop()

// Ví dụ
db.users.drop()

// Kết quả
true
```

### 4-5. Export collection ra json
```js
mongoexport --db <db_name> --collection <collection_name> --out /path/to
// Ngắn gọn
mongoexport -d <db_name> -c <collection_name> -o /path/to


// Ví dụ
mongoexport -d shpping_app -c users -o "D:\backupDB\collectionUsers.json"
```

### 4-6. Export collection ra csv
```js
mongoexport -d <db_name> -c <collection_name> --type csv -o /path/to -f id,first_name,last_name

-f: các field muốn export

// Ví dụ
mongoexport -d shopping_app -c users --type csv -o "D:\backupDB\collectionUsers.json" -f id,first_name,last_name
```

### 4-7. Import collection từ json

```js
mongoimport -d <db_name> -c <collection_name> --file /path/to/file.json
```

### 4-8. Import collection từ csv

```js
mongoimport --d <db_name> -c <collection_name> --type csv --file /path/to/file.csv
```

## 5. Query data
```js
db.<collection_name>.find(query)
db.<collection_name>.findOne(query)

collection_name: tên của collection
find: trả về tất cả dữ liệu
findOne: trả về dữ liệu đầu tiên
query: là một object mô tả bên dưới

/*==============================*/
find({}) // tìm tất cả

{key: value} // So sánh bằng
{age: 69} // tìm với tuổi bằng 69

{key: {$ne: value}} // So sánh không bằng
{age: {$ne: 69}} // tìm với tuổi khác 69

{key: {$gt: value}} // Nhỏ hơn
{age: {$gt: 69}} // tìm với tuổi nhỏ hơn 69

{key: {$gte: value}} // Nhỏ hơn bằng
{age: {$gte: 69}} // tìm với tuổi nhỏ hơn bằng 69

{key: {$lt: value}} // Lớn hơn
{age: {$lt: 69}} // tìm với tuổi lớn hơn 69

{key: {$lte: value}} // Lớn hơn bằng
{age: {$lte: 69}} // tìm với tuổi lớn hơn bằng 69

{key: {$in: value}} // Nằm trong những giá trị này
{age: {$in: [36, 49, 50]}} // tìm với tuổi bằng 36-49-50

{key: {$nin: value}} // Không nằm trong những giá trị này
{age: {$nin: [36, 49, 50]}} // tìm với tuổi khác 36-49-50

{key: value} // Áp dụng được với regex

{email: /\.gmail$/} // tìm với email kết thúc bằng .gmail
{ip_address: /^1/} // tìm với ip bắt đầu bằng 1
```

## 6. Multi-field query
Điều kiện AND
```js
db.<collection_name>.find(
  { key1: value1, key2: value2 }
)

// tìm với điều kiện giới tính là 'Male' và tuổi lớn hơn 69
{gender: 'Male', age: {$lt: 69}}
```
Điều kiện OR
```js
db.<collection_name>.find({ 
  $or: [
    { key1: value1 },
    { key2: value2 }
  ]
})

// tìm với điều kiện giới tính là 'Male' hoặc tuổi lớn hơn 69
{
  $or: [
    { gender: 'Male' },
    { age: {$lt: 69} }
  ]
}
```

## 7. Nested object
Cách tìm khi value dạng object
```js
// document trong mongoDB
{
  ...
  profile: {
    city: 'Hanoi',
    work: '2B Company'
  }
}

// tìm với điều kiện profile city là Hanoi
db.<collection_name>.find({ profile.city: 'Hanoi' })
```

## 8. Array field
Cách tìm khi value dạng array
```js
// document trong mongoDB
{
  ...
  languages: ['English', 'Japanese', 'Vietnamese']
}

// tìm với điều kiện languages là English
db.<collection_name>.find({ languages: 'English' })
```

```js
// document trong mongoDB
{
  ...
  languages: ['English', 'Japanese', 'Vietnamese']
}

// tìm với điều kiện languages có chứa 2 giá trị
db.<collection_name>.find({ languages: { $size: 2 }})
```

## 9. Array of embedded documents
Cách tìm khi value dạng array các object
```js
// document trong mongoDB
{
  ...
  pets: [
    {type: 'cat', name: 'Linnea'},
    {type: 'dog', name: 'Tom'},
    {type: 'cat', name: 'Kylie'}
  ]
}

// tìm với điều kiện pets type là cat
db.<collection_name>.find({ 
  pets.type: 'cat'
})

// Hoặc
db.<collection_name>.find({ 
  pets: {
    $elementMatch: { type: 'cat' }
  }
})
```

## 10. Query empty field
Cách tìm khi document không có field
```js
// data
{first_name: 'ken', last_name: 'trung'}
{first_name: 'thu', last_name: 'thuy', age: 18}

// tìm với điều kiện có field age
db.<collection_name>.find({ age: null })

// Hoặc
db.<collection_name>.find({ age: { $exists: false }})
```
## 11. $where
Giá trị nhận vào của `$where` là string
```js
db.<collection_name>.find({ $where: 'javascript expression' })

// Ví dụ
db.<collection_name>.find({ first_name: 'ken' })
db.<collection_name>.find({ $where: 'this.first_name === "ken"' })
db.<collection_name>.find({ $where: 'this.first_name === this.last_name' })
```

## 12. Pagination
```js
// trả về số lượng, không trả về dữ liệu
db.<collection_name>.count(query)

// bỏ qua X phần tử và chỉ lấy Y phần tử
db.<collection_name>.find(query).skip(x).limit(y)
```

## 13. Sort
```js
db.<collection_name>.find(query).sort({ field: -1 })

1: ascending order (tăng dần)
-1: descending order (giảm dần)
```

## 14. CRUD
```js
db.<collection_name>.save()
db.<collection_name>.insert(data)
db.<collection_name>.insertMany(datas)
db.<collection_name>.find(query)
db.<collection_name>.findOne(query)
db.<collection_name>.updateOne(query, data)
db.<collection_name>.updateMany(query, data)
db.<collection_name>.delete(query)
db.<collection_name>.deleteOne(query)
```

```js
// insert-document.js
db.users.insert({
  first_name: 'ken',
  last_name: 'trung'
})
load('script/insert-document.js')
```

```js
var user = {}
user.first_name = 'ken'
user.last_name = 'trung'
db.<collection_name>.save(user)

// Tìm document có _id là gì, sau đó update trường first_name
db.<collection_name>.updateOne(
  { _id: ... },
  { $set: {first_name: 'ken' }}
)

// Tìm document có _id là gì, sau đó update language nằm trong settings
// Trường settings là array và ta chỉ muốn update 1 trường trong đó
db.<collection_name>.updateOne(
  { _id: ... },
  { $set: {settings.languages: 'vn' }}
)
```

## 15. Atomic operator
```js
// $inc: tăng - giảm số lượng
// $push: thêm 1 data vào mảng
// $pull: xóa 1 data ra khỏi mảng
// $addToSet: nếu chưa có thì thêm, có rồi thì chỉ update

db.<collection_name>.updateOne(
  {_id: ...},
  {$inc: {viewCount + 1}}
)
```