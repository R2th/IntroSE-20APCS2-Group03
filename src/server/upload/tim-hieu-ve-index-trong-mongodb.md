# Giới thiệu về Index
Index trong database cũng giống như mục lục của một cuốn sách. Thay vì tìm từng trang của cuốn sách Database tạo một mục lục, và nó chỉ việc tìm nội dung của cuốn sách qua mục lục đó. Qua đó giúp cho câu lệnh truy vấn nhanh hơn.
Một câu truy vấn không có index được gọi là **table scan**. Nghĩa là Database phải xem qua toàn bộ các Document để tìm được kết quả truy vấn, và đối với các collection lớn, câu truy vấn sẽ rất chậm. Để có ví dụ cụ thể, bạn có thể test thử như sau:
```js
    use test     // chúng ta dùng database test để thử.
    for(var i = 0; i < 1000000; i++) {
        db.users.insert({
            i: i,
            username: 'user' + i,
            age: Math.floor(Math.random() * 100)
        });
    }
```
Đoạn code trên sẽ tạo ra một triệu user và nó tốn khá nhiều thời gian, sau khi tạo xong bạn có thể  xem tốc độ một câu truy vấn không có index sẽ như thế nào với lệnh [`cursor.explain()`](https://docs.mongodb.com/manual/reference/method/cursor.explain/)
```
db.users.find({username: 'user112'}).explain("executionStats")["executionStats"]
{
	"executionSuccess" : true,
	"nReturned" : 1,
	"executionTimeMillis" : 269,
	"totalKeysExamined" : 0,
	"totalDocsExamined" : 1000000,
	"executionStages" : {
		"stage" : "COLLSCAN",
		"filter" : {
			"username" : {
				"$eq" : "user112"
			}
		},
		"nReturned" : 1,
		"executionTimeMillisEstimate" : 211,
		"works" : 1000002,
		"advanced" : 1,
		"needTime" : 1000000,
		"needYield" : 0,
		"saveState" : 7813,
		"restoreState" : 7813,
		"isEOF" : 1,
		"invalidates" : 0,
		"direction" : "forward",
		"docsExamined" : 1000000
	}
}
```
Kết quả trả về cho biết thời gian thực hiện hết 211ms (executionTimeMillisEstimate) và đã duyệt trong collection 1000000 lần. Để tối ưu bạn có thể thêm limit vào lệnh truy vấn khi chỉ muốn lấy ra một vài kết quả, ở đây chỉ có một user có tên `user112` mình sẽ thêm limit(1). Thông tin thêm về các thông số, bạn có thể xem ở đây https://docs.mongodb.com/manual/reference/explain-results/#executionstats
```js
db.users.find({username: 'user112'}).limit(1).explain("executionStats")["executionStats"]
{
	"executionSuccess" : true,
	"nReturned" : 1,
	"executionTimeMillis" : 0,
	"totalKeysExamined" : 0,
	"totalDocsExamined" : 113,
	"executionStages" : {
		"stage" : "LIMIT",
		"nReturned" : 1,
		"executionTimeMillisEstimate" : 0,
		"works" : 115,
		"advanced" : 1,
		"needTime" : 113,
		"needYield" : 0,
		"saveState" : 0,
		"restoreState" : 0,
		"isEOF" : 1,
		"invalidates" : 0,
		"limitAmount" : 1,
		"inputStage" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"username" : {
					"$eq" : "user112"
				}
			},
			"nReturned" : 1,
			"executionTimeMillisEstimate" : 0,
			"works" : 114,
			"advanced" : 1,
			"needTime" : 113,
			"needYield" : 0,
			"saveState" : 0,
			"restoreState" : 0,
			"isEOF" : 0,
			"invalidates" : 0,
			"direction" : "forward",
			"docsExamined" : 113
		}
	}
}
```
Thời gian thực thi và số lần duyệt đã giảm chỉ còn 0ms và 113 lần duyệt, vì user112 ở đầu collection. Nếu là user999999 thì số lần duyệt và tốc độ thực thi sẽ lại như lần đầu chúng ta đã thử.
Để giải quết vấn đề này triệt để, chúng ta có thể đánh index cho bảng user. Ở đây mình sẽ đánh index cho trường username.
```
db.users.createIndex({username: 1}) // Đánh index cho username theo thứ tự tăng dần, -1 là giảm dần.
db.users.getIndexes() // Xem index nào đã có.
[
	{
		"v" : 2,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "test.users"
	},
	{
		"v" : 2,
		"key" : {
			"username" : 1
		},
		"name" : "username_1",
		"ns" : "test.users"
	}
]
```
Sau khi đánh index ta có thể xem lại kết quả truy vấn.
```js
db.users.find({username: 'user112'}).explain("executionStats")["executionStats"]
{
	"executionSuccess" : true,
	"nReturned" : 1,
	"executionTimeMillis" : 3,
	"totalKeysExamined" : 1,
	"totalDocsExamined" : 1,
	"executionStages" : {
		"stage" : "FETCH",
		"nReturned" : 1,
		"executionTimeMillisEstimate" : 0,
		"works" : 2,
		"advanced" : 1,
		"needTime" : 0,
		"needYield" : 0,
		"saveState" : 0,
		"restoreState" : 0,
		"isEOF" : 1,
		"invalidates" : 0,
		"docsExamined" : 1,
		"alreadyHasObj" : 0,
		"inputStage" : {
			"stage" : "IXSCAN",
			"nReturned" : 1,
			"executionTimeMillisEstimate" : 0,
			"works" : 2,
			"advanced" : 1,
			"needTime" : 0,
			"needYield" : 0,
			"saveState" : 0,
			"restoreState" : 0,
			"isEOF" : 1,
			"invalidates" : 0,
			"keyPattern" : {
				"username" : 1
			},
			"indexName" : "username_1",
			"isMultiKey" : false,
			"multiKeyPaths" : {
				"username" : [ ]
			},
			"isUnique" : false,
			"isSparse" : false,
			"isPartial" : false,
			"indexVersion" : 2,
			"direction" : "forward",
			"indexBounds" : {
				"username" : [
					"[\"user112\", \"user112\"]"
				]
			},
			"keysExamined" : 1,
			"seeks" : 1,
			"dupsTested" : 0,
			"dupsDropped" : 0,
			"seenInvalidated" : 0
		}
	}
}
```
Kết quả đưa ra ngay lập tức :).  Tuy nhiên, bạn cũng không thể lạm dụng Index ở mọi nơi được. Việc đánh index cũng tiêu tốn thêm bộ nhớ trong Database để chứa các bảng Index, và làm giảm tốc độ các câu lệnh thêm, sửa, xóa (các câu lệnh ghi vào Database). Bởi vì với mỗi lần dữ liệu thay đổi MongoDB sẽ phải đánh lại toàn bộ Index, để đảm bảo dữ liệu truy vấn chính xác.

MongoDB cho phép bạn có 64 Index trên mỗi collection, nhưng bình thường thì rất hiếm khi dùng hết được :v

Giải thích rõ hơn thì bảng Index của Collection users sẽ có dạng
```js
{
    ...
    "user100" => 0x0c965148
    "user101" => 0xf51f818e
    "user102" => 0x00fd7934
    ...
}
```
Mỗi Index lấy giá trị của username là khóa và chứa giá trị là địa chỉ vật lý của thông tin Document lưu trên ổ đĩa. Ví dụ khi truy vấn là tìm `user100`, MongoDB sẽ gọi INDEXES['user100'] và lấy ra địa chỉ trỏ đến Document từ đó có thông tin của Document và trả về.
# Sử dụng Compound Index
Loại Index mình sử dụng ở trên gọi là Single Field Index. Mình sẽ giới thiệu tiếp về Compound Index, với loại index này là bạn có  thể đánh index cho 2 hay nhiều trường cùng một lúc. Đối với các câu truy vấn có nhiều điều kiện thì chỉ đánh index cho 1 trường là không đủ. Ví dụ mình có 1 triệu người dùng, một nửa là nam và một nửa là nữ. Số user này nằm trong độ tuổi 20-29, vậy mỗi độ tuổi sẽ có 100k người dùng. Giờ mình muốn query tất cả các user nữ 20 tuổi. trước tiên mình đánh index cho trường `gender` trong bảng.
```js
db.users.createIndex({gender: 1});
db.users.find({gender: 'female', age: 29});
```
Câu truy vấn trên sẽ lấy ngay ra được 500 nghìn users nữ, tuy nhiên ta vẫn sẽ phải duyệt qua 500 nghìn users này để tìm các users có tuổi là 29. Tiếp theo mình sẽ xóa index đã đánh, và đánh lại index cho trường age.
```js
db.users.dropIndex({gender: 1});
db.users.createIndex({age: 1});
db.users.find({gender: 'female', age: 29});
```
Lần này thì DB sẽ chỉ phải duyệt qua 100 nghìn users để tìm các users có giới tính nữ. Bạn có thể thấy khi đánh Index ta nên chọn các trường có tính duy nhất lớn hơn để đánh Index. Tuy nhiên ta vẫn có thể đánh index cho cả 2 trường cùng 1 lúc.
```js
db.users.createIndex({age: 1, gender: 1});
db.users.find({gender: 'female', age: 29});
```
Với cách này DB sẽ lấy ra ngay lập tức 50 nghìn users tương ứng. Vậy là với các câu lệnh truy vấn phức tạp hơn bạn có thể nghiên cứu để đánh Index cho các trường sao cho hiệu quả hơn.

# Tổng kết
Qua bài viết của mình hy vọng các bạn có thể hiểu thêm về đánh Index, không chỉ với MongoDB mà còn cả với các hệ quản trị CSDL khác. Nếu có gì sai sót, mọi người có thể góp ý thêm cho mình, xin cảm ơn.