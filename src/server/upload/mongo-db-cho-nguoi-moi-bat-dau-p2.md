# Lời nói đầu
Gần đây, mình mới bắt đầu nghiên cứu và sử dụng mongo db nên có chút kiến thức cơ bản về Mongo muốn share và note ra đây coi như để nhở (Biết đâu sẽ có ích cho ai đó). Những kiến thức ít ỏi này không toàn diện nhưng mình nghĩ là những điều cơ bản và cần thiết để có thể sử dụng cơ bản được mongodb . Vì đây chỉ là những kiến thức ít ỏi của bản thân nên nếu có gì sai mong các bạn gọp ý giúp mình. Let go !!!

[Mongo DB cho người mới bắt đầu ! (P1) ](https://viblo.asia/p/mongo-db-cho-nguoi-moi-bat-dau-Qbq5Qavz5D8)

[Mongo DB cho người mới bắt đầu ! (P2) ](#)
# Nội dung
Trong bài viết trước mình đã giới thiệu những điều cơ bản về Mongo, cách cài đặt , setup và sử dụng MongoDB một cách cơ bản nhất. Tiếp theo sau đây mình sẽ giới thiệu kĩ hơn về các query trong Mongo. Nào bắt đầu nhé .

Ok, đầu tiên chúng ta sẽ tạo các dữ liệu mẫu cho bài viết đề các bạn có thể có 1 cái nhìn cụ thể hơn về các query của chúng ta. OK, bạn hay vào mongo và chạy command sau để tạo db mẫu nhé :

```
db.inventory.insertMany([
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
]);
```

## Select All Record

Hơi nhắc lại xíu nhưng thôi thừa hơn thiếu, để lấy được toàn bộ các document trong 1 collection thì bạn đơn giản chỉ cần sử dụng phương thức `find` với không có đối số truyền vào . Cụ thể như sau :

```
db.inventory.find( {} )
```

Query bên trên tương đương với câu query sau bên Sql:

```
SELECT * FROM inventory
```

## Specify Equality Condition

Để query một điều kiện `=` cụ thể , chỉ cần sử dụng cụm `<field>:<value>`  trong object của phương thức `find`.

Chúng ta sẽ đi vào ví dụ cụ thể nhé , giờ mình cần lấy tất cả các bản ghi có `status` là `D`. Câu query cụ thể dư sau :

```
db.inventory.find( { status: "D" } )
```

Tương tự với câu SQL query sau :

```
SELECT * FROM inventory WHERE status = "D"
```

## Specify Conditions Using Query Operators

Bạn cũng có thể địn nghĩa các điều kiên bằng các biểu thức điều kiện với các toán tử so sanh cụ thể như sau :



| Biểu thức  | Mô tả  | 
| -------- | -------- | 
| $eq     | Phép so sánh bằng     | 
| $gt     | Phép so sanh lớn hơn     | 
| $gte     | Phép so sanh lớn hơn hoặc bằng     | 
| $in     | Phép so sánh với 1 trong các phần tử của mảng     | 
| $lt     |  Phép so sánh nhỏ hơn     | 
| $lte     | Phép so sánh nhỏ hơn hoặc bằng     | 
| $ne     | Phép so sánh khác (Nhận các giá trị không bằng)     | 
| $nin     | Phép so sánh khắc với tất cả các phần tử của mảng     | 

Biểu thức điều kiện này có dạng như sau :

```
{ <field1>: { <operator1>: <value1> }, ... }
```

Ví dụ : Chúng ta sẽ lấy tất cả các document mà có `status` là `A` hoặc `D`. Câu query đại khái sẽ như sau :

```
db.inventory.find( { status: { $in: [ "A", "D" ] } } )
```

Tương tự với câu SQL query sau :

```
SELECT * FROM inventory WHERE status in ("A", "D")
```


> Thực tế với bài toán bên trên thì chúng ta cũng  có thể sử dụng toán tử logic `$or` tuy nhiên nếu query trên cùng một field , sẽ tốt hơn nếu dùng toán tử `$in`


## Specify AND Conditions

Thông thường mà nói chúng ta rất ít khi cần truy vấn dữ liệu mà chỉ cần truy vấn qua một field trong một document. Ít nhất thì cũng phải một vài field và khi đó chúng ta sẽ cần sử dụng đến toán tử logic AND trong câu truy vấn để select dữ liệu

Ví dụ cụ thể: Chúng ta cần select dữ liệu có `status` là A và thêm một điều kiện nữa là có `qty` nhỏ hơn 30. Truy vấn đại khái sẽ như sau :

```
db.inventory.find( { status: "A", qty: { $lt: 30 } } )
```

Tương tự với câu SQL query sau :

```
SELECT * FROM inventory WHERE status = "A" AND qty < 30
```

## Specify OR Conditions

Với toán tử logic `OR` chúng ta sẽ có thể lọc ra các bản ghi đung với một trong các điều kiện mà chúng ta đưa ra .


Ví dụ cụ thể : Cần lấy các bản ghi có `status` là A hoặc `qty` nhỏ hơn 30. Câu query sẽ như sau :

```
db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } )
```

Tương tự với câu SQL query sau :

```
SELECT * FROM inventory WHERE status = "A" OR qty < 30
```

## Các toán tử logic

| Biểu thức  | Mô tả  | 
| -------- | -------- | 
| $and     | Các bản ghi hợp lệ là các bản ghi đúng với tất cả điều kiện  | 
| $not     | Các bản ghi hợp lệ là các bản ghi không đúng  1 trong các điều kiện  | 
| $nor     | Các bản ghi hợp lệ là các bản ghi không đúng với tất cả điều kiện  | 
| $or     | Các bản ghi hợp lệ là các bản ghi đúng với một trong các điều kiện  | 

## Specify AND as well as OR Conditions

Nhiều khi độ phức tạp của các truy vấn nó sẽ bao gồm nhiều điều kiện là sự kết hợp của các toán tử logic . Trong ví dụ sau mình trình bày ta sẽ nói về sự kết hợp giữa `AND` vs `OR`

Ví dụ : Lấy các bản ghi mà `status` là A và `qty` nhỏ hơn 30 hoặc `item` bắt đầu bằng chữ p. Query cụ thể như sau :

```
db.inventory.find( {
     status: "A",
     $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
} )
```

Tương tự với câu SQL query sau :

```
SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%")
```

##  Kết luận

Đến đây, bài viết sơ sài của mình đã kết thúc. Nếu các bạn cảm thấy nó bổ ích thì upvote 1 cái giúp mình nhé . Ở bài viết sau mình sẽ đề cập đến nhiều query phức tạp hơn nữa của select dữ liệu. Cám ơn các bạn đã đọc đến hết bài viết . Thank you !

# Tài liệu tham khảo.

[https://docs.mongodb.com/](https://docs.mongodb.com/)