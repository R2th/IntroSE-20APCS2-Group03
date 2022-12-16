# Những thao tác cơ bản nhất khi làm việc với MongoDB
Để tiếp nối chủ đề tìm hiểu về MongoDB (các bạn có thể đọc [tại đây](https://viblo.asia/p/mongodb-va-nhung-dieu-co-ban-nhat-mongodb-phan-1-naQZRX4m5vx)) thì bài viết này của mình sẽ giới thiệu thao tác cơ bản nhất trên MongoDB. 
## Tạo cơ sở dữ liệu và Collection trong Mongo
Bất kỳ cơ sở dữ liệu nào để có thể thao tác được thì trước tiên chúng ta nhất định phải có cơ sở dữ liệu :sweat_smile: .
Bước đầu tiên và cơ bản nhất của việc sử dụng MongoDB cũng vậy, bạn phải có cơ sở dữ liệu (database) và collection. Database được sử dụng để lưu trữ toàn bộ các Collection và Collection lại được sử dụng để lưu trữ tất cả các document. Mỗi Document là 1 cặp FieldName và FieldValue (VD)
```
{
    "employeeId": 1,
    "employeeName": "Jerry"
}
```
Nhìn vào ví dụ trên sẽ có FieldName: [employeeId, employeeName] tương ứng sẽ là FieldValue: [1, "Jerry"].

### Tạo database sử dụng câu lệnh "use"
Để tạo được 1 database trong MongoDB rất đơn giản.
* Với hệ điều hành Window
> use MyDatabase

`use` được dùng để tạo một database mới chưa được tạo trước đó nếu database đã có terminal sẽ hiển thị thông tin như sau: `switched to db EmployeeDB`

### Tạo collection/table sử dụng "insert"
Cách đơn giản nhất để tạo 1 Collection là chèn 1 bản ghi (chính là 1 document gồm có FieldName và FieldValue). Nếu collection chưa tồn tại thì 1 collection mới sẽ được tạo ra. Ví dụ về việc insert:
```
db.Employee.insert
(
	{
		"Employeeid" : 1,
		"EmployeeName" : "Martin"
	}
)
```
Với ví dụ đơn giản này ta đã tạo được 1 collection bằng việc sử dụng lệnh `insert`.

### Thêm một document sử dụng lệnh "insert"
MongoDB cung cấp lệnh `insert()` để có thể thêm một document vào trong 1 collection. Dưới đây là các bước mà bạn có thể làm theo để có thể insert được 1 document vào collection.
1. Viết câu lệnh `insert`
```
db.Employee.insert (
)
```
2.  Trong lệnh `insert` sẽ viết document mà bạn cần thêm vào, nó sẽ bao gồm field name & field value.
```
{
    "Employeeid": 1,
    "EmployeeName": "May"
}
```
Khi thực thi đoạn code trên ta sẽ thêm được 1 document vào trong collection `Employee`.

### Thêm một mảng documents
Bên cạnh việc thêm 1 document vào collection MongoDB cũng hỗ trợ việc thêm nhiều documents vào trong collection trong cùng một thời điểm. Dưới đây là một cách để thêm nhiều document cùng một lúc vào collection.
1. Tạo một biến JavaScript để lưu danh sách các document.
2. Mỗi cặp giá trị lưu document phải bao gồm fieldName và fieldValue.
3. Sử dụng `insert()` để insert mảng document đó vào collection.
```
var myEmployee=
	[
	
		{
			"Employeeid" : 1,
			"EmployeeName" : "Smith"
		},
		{
			"Employeeid"   : 2,
			"EmployeeName" : "Mohan"
		},
		{
			"Employeeid"   : 3,
			"EmployeeName" : "Joe"
		},

	];

	db.Employee.insert(myEmployee);
```
Thực thi đoạn code trên ta sẽ thấy được thông tin `"nInserted": 3` tương đương với việc bạn đã insert thành công 3 document vào trong collection.

**In dưới dạng Json**
- Json được hiểu đơn giản là một dạng lưu trữ dữ liệu được gọi là *JavaScript Object Notation*. Json là một dạng lưu trữ dữ liệu có tổ chức và rất dễ đọc. Phần này chúng ta sẽ sử dụng định dạng Json cho đầu ra dữ liệu để có cái nhìn đơn giản hơn. Để in document dưới dạng Json bạn có thể sử dụng `db.Employee.find().forEach(printjson)`.

`find().forEach` được dùng để chắc chắn tất cả các document trong collection `Employee` đều được duyệt qua. Trong function `forEach` sử dụng `printjson` để các document in ra dưới dạng Json.
![](https://images.viblo.asia/6318a85c-b030-4357-bf38-3cf7630b9b96.png)
Bạn có thể thấy khi dữ liệu hiển thị ra có thêm một trường là `_id`, liệu bạn có thắc mắc tại sao lại có thêm trường này? Đây là một trường được sinh ra tự động trong MongoDB. Trường này được gọi như là `primary key`. Phần tiếp theo đây sẽ giúp chúng ta có cái nhìn cụ thể hơn về primary key trong MongoDB.
### Primary key MongoDB 
Trong MongoDB trường _id như là primary key cho collection, đây là trường định danh cho từng document trong collection. Trường _id có một giá trị ObjectID duy nhất.

Mặc định khi insert document ta không cần phải thêm _id vì nó được tự động thêm khi chúng ta insert. Khi chúng ta query các document trong collection chúng ta có thể dễ dàng thấy mỗi document đều xuất hiện thêm trường _id và giá trị của chúng là duy nhất.

Mặc dù _id được sinh tự động nhưng khi insert document vào collection bạn vẫn có thể tự tạo _id cho từng document. Để đảm bảo không tự động sinh _id trong document bạn cần chỉ định rõ trường _id trong từng document khi insert vào collection. 

Ví dụ `db.Employee.insert({_id:10, "EmployeeName" : "Smith"})`.

Trong ví dụ này chúng ta đã thiết lập giá trị trường _id cụ thể khi insert.
![](https://images.viblo.asia/36b91e84-96ee-4b8c-8bab-8dfd7dc05d67.png)

Trên đây là bài tìm hiểu cơ bản của mình về các thao tác cơ bản nhất của MongoDB cũng như primary key trong MongoDB, cảm ơn mọi người đã đọc bài, rất mong được sự góp ý từ các bạn.

Tham khảo:
1. https://www.guru99.com/create-read-update-operations-mongodb.html
2. https://www.guru99.com/add-mongodb-array-using-insert.html
3. https://www.guru99.com/mongodb-objectid.html