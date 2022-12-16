Index hỗ trợ hiệu quả trong việc thực thi truy vấn trong Mongo, không có index MongoDB phải thực thi scan từng document trong một collection để lấy được những document phù hợp với câu truy vấn

Index là những cấu trúc dữ liệu đặc biệt nó lưu trữ một phần nhỏ của data collection theo để có thể lấy ra một cách đơn giản nhất, Index lưu trữ dự liệu của một trường hay nhiều trường và được sắp xếp theo giá trị của trường. 

MongoDB có thể trả về một kết quả đã được sắp xếp bằng cách sử dụng order trong index.

Select và order sử dụng index

Về cơ bản thì index trong MongoDB cũng giống như index trong các kiểu database system khác. MongoDB định nghĩa index ở tầng collection level và hỗ trợ index ở bất cứ field hay sub-field nào trong document của MongoDB collection.

## Default _id index

MongoDB tạo ra một uniqe index on trường id ngay khi collection được tạo. `id` index để tránh việc người dùng thêm các document vào trong collection có cùng giá trị trên `id`field.
Chú ý: bạn không thể xoá index trên trường `id`này này được.

## Tạo index trong Mongo
Cú pháp như sau:
```
db.collection.createIndex( <key and index type specification>, <options> )
```

Method `createIndex`chỉ tạo ra một index nếu như index đó chưa tồn tại 


## các kiểu index
### Single field
MongoDB support việc tạo người dùng tự index (ascending/descending indexes)

```
> db.myCollections.findOne()
{
	"_id" : ObjectId("5c1cd1f5d0ae891a3d038bfc"),
	"name" : "Peter",
	"age" : 23
}
```
Tạo index cho trường name 
```
> db.myCollections.createIndex({name: 1})
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
```
Giá trị bên trong hàm tạo index để chỉ ra kiểu index cho trường đó . Như ví dụ trên là 1, thì việc order cho trường name là tăng dần và ngược lại nếu giá trị là -1 thì order là giảm dần

### Tạo index cho một embed field 
MongoDB cho phép bạn tạo index trong embedded document, 
Tạo index cho math
```
> db.myCollections.findOne({name: "Marry"})
{
	"_id" : ObjectId("5c1cd7b4d0ae891a3d038bfd"),
	"name" : "Marry",
	"age" : 20,
	"education" : {
		"math" : 10
	}
}

```

```
> db.myCollections.createIndex({"education.math": 1})
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 2,
	"numIndexesAfter" : 3,
	"ok" : 1
}
```

### Tạo index cho embeded document
Như ví dụ phía trên thì `education` là một embeded document , ta tạo index cho nó với cú pháp
```
> db.myCollections.createIndex({"education": 1})
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 3,
	"numIndexesAfter" : 4,
	"ok" : 1
}
```

## Index trên nhiều trường

```
db.collection.createIndex( { <field1>: <type>, <field2>: <type2>, ... } )
```

```
> db.myCollections.findOne({name: "Micky"})
{
	"_id" : ObjectId("5c1f62988a80d3a396109a40"),
	"name" : "Micky",
	"age" : 21,
	"gender" : "male",
	"education" : {
		"math" : 8
	}
}
```
Giả sử ta sẽ đánh index cho 2 trường age và gender

```
db.myCollections.createIndex({age: 1, gender: -1})
```
Collection sẽ được sort theo `age`, sau đó mới sort `gender`

*Prefix trong index nhiều trường*
Giả sử tôi index cho 3 trường sau
```
db.myCollections.createIndex({name: 1, age: 1, gender: -1})
```

Index sẽ có tác dụng khi search theo các trường sau:

* Trường `name`
* Trường `name` và `age`
* Trường `name`, `age` và `gender`

Có thể thấy index có tác dụng khi ta search các trường theo thứ tự từ trái qua phải

Mongodb index cũng support việc search theo trường `name` và `gender` thế nhưng nó không hiệu quả 

Trong các trường hợp dưới đây thì Mongo index không support khi ta search theo các trường dưới đây:

* Trường `age`
* Trường `age` và `gender` 
* Trường `gender` 

Bởi vì khi search bị thiếu trường `name` (thiếu prefix)

# Multikey Index
MongoDB sử dụng multikey index để index cho mảng, Nếu bạn index cho một trường mà nó store một mảng thì MongoDB sẽ tạo từng key riêng biệt cho từng phần tử của mảng. 
MongoDB sẽ tự động xác định liệu có tạo ra multiky index nếu index field có chứa mảng value, bạn không cần phải khai báo tường minh multikey type.

Về mặt cú pháp thì vẫn giống đối với Single field 

```
db.coll.createIndex( { <field>: < 1 or -1 > } )
```


# Nguồn tham khảo

https://docs.mongodb.com/manual/indexes