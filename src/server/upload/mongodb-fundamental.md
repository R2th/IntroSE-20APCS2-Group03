# Overview

MongodDB là cơ sở dữ liệu đa nền tảng. Perfomance cao, dễ dàng cho việc scale
khác với MySQL, MongoDB không có khái niệm bảng hay record mà thay vào đó tương ứng là collection và document 

## Collection:
- là một tập hợp các MongoDB document, Nó tương đương với table trong hệ quản trị cơ sở dữ liệu quan hệ (RDBMS)
- Một collection không cần có schema (tức là các document trong một collection không nhất thiết phải có chung các field hay kiểu dữ liệu)
Document: 
Là một tập các cặp key-value, Document thuộc kiểu dynamic schema nghĩa là các fileds, structure, kiểu dữ liệu giữa các docment là không bắt buộc giống nhau (điều này khác hoàn toàn với cơ sở dữ liệu quan hệ)

**Tại sao nên dùng MongoDB?**

* Structure rõ ràng cho các object
* Không có việc join phức tạp
* Deep query-ability
* Tuning
* Dễ dàng scale 
* Truy cập nhanh hơn do sử dụng internal memory cho việc store woking set
* Data được lưu trữ dưới dạng json document (BSON)
* Index cho tất cả các attribute
* Tính khả dụng cao
* Auto-sharding
* Update nhanh
* MongoDB được dùng ở đâu?
* Big Data
* Content Management and Delivery
* Mobile and Social Infrastructure
* User Data Management
* Data Hub

# Document 
Mongodb lưu trữ data dưới dạng các BSON document, được hình thành từ các cặp key-value 
```
{
   field1: value1,
   field2: value2,
   field3: value3,
   ...
   fieldN: valueN
}
```

Value của của field có thể có các kiểu dữ liệu khác nhau, là bất cứ kiểu nào thuộc kiểu BSON type

**Field của các document là string:**

id: Nó phải là duy nhất trong một collection và giá trị không thay đổi .
Field name không được chưa ký ký tự null, không được bắt đầu bằng ký tự $
MongoDB không support việc trùng field name, mặc dù theo BSON document có thể chứa nhiều key trùng nhau

MongDB sử dụng Dot notation để truy cập vào một mảng 
```
"<array>.<index>"
```

Ví dụ 

```
{
   ...
   contribs: [ "Turing machine", "Turing test", "Turingery" ],
   ...
}
```
ta có thể truy cập vào element thứ 2 bằng cách sử dụng dot notation `contribs.1` 

Cũng sử dụng dot notation với các embed document :

```
{
   ...
   name: { first: "Alan", last: "Turing" },
   contact: { phone: { type: "cell", number: "111-222-3333" } },
   ...
}
```

Ta có thể truy cập vào để lấy số điện thoại bằng cách `contact.phone.number`

_id field trong mongoDB

Đối với mỗi document trong collection đều bắt buộc phải có _id (_id này cũng chính là primary key) nếu như bạn insert một document mà không có id thì MongoDB sẽ tự động tạo ra một ObjectId cho _id field

# MongoDB CRUD 
MongoDB cũng có các phương thức support cho việc insert, delete, update document

![](https://images.viblo.asia/d0c443a0-fdc0-40ed-99ec-2ccfeebc4952.png)

![](https://images.viblo.asia/6a4f1272-ff00-406b-8fdc-08552e1ba277.png)

![](https://images.viblo.asia/426a893b-bdc5-4b56-8710-283a4abe3081.png)

![](https://images.viblo.asia/96ebd04d-a03d-41ef-bb58-8d6a435f7402.png)

Chi tiết hơn bạn có thể xem tại đây https://docs.mongodb.com/manual/crud/

# Aggregation
Aggregation xử lý các record dữ liệu và trả về computed result. Aggregation nhóm các giá trị từ nhiều document lại với nhau và có thể thực hiện nhiều các phép toán khác trên grouped data. MongoDB cũng 3 cách để có thể thực thi aggregation:
* aggregation pipeline
* map-reduce function
* single purpose aggregation methods

## Aggregation Pipeline
Document được đưa vào multi-stage pipeline, sau đó multi-stage pipeline này sẽ chuyển hoá document thành aggregated result.

Hầu hết các pipeline stage đều cung cấp `filters`, `filters` này là thực thi giống như các câu truy vấn và `documnent transformations`đảm nhiệm việc thay đổi đầu ra của document

Các pipeline operation khác cũng cấp cách công cụ cho việc group , sort documents theo một trường hay nhiều trường cũng như tổng hợp nội dung của các arrays, include array của document. Thêm nữa Pipeline stag có thể sử dụng các toán tử cho việc tính toán giá trị trung bình, nối chuỗi cho string. 

Aggregation pipeline có thể sử dụng index để cải thiện performance trong một vài stage của nó.

![](https://images.viblo.asia/8f58c304-83b3-46b3-88a9-ebca4c1330a0.png)

Trên ví dụ trên toán tử `$match` sẽ tìm ra các document có status "A", Tiếp đến là group các cust_id lại với nhau rồi tính tổng của chúng. đối với mỗi cust_id sau khi đã được group sẽ có một field name mới là `_id`

## Map-Reduce
Thông thường thì map-reduce operation có 2 giai đoạn: 
Giai đoạn map stag xử lý từng document và sẽ tạo ra một or nhiều object cho từng input document
Giai đoạn reduce sẽ tiến hành kết hợp các output của map operatioin. 

Cũng giống như các Aggregation operation khác, map-reduce có thể dùng câu truy vấn điều kiện để lấy dữ liệu từ document cũng như sort và limit kết quả trả về.

Map-reduce sử dụng Javascript functions để thực thi việc map và reduce, ngoài ra nó cũng có một operation `finalize`

![](https://images.viblo.asia/8969cbb4-9f7f-45bb-a534-a8c2174e3b77.png)

Output của ví dụ này cũng giống với ví dụ trên nhưng được viết theo kiểu map-reduce 

## Single Purpose Aggregation Operations
MongoDB cũng cung cấp các operation:
```
db.collection.estimatedDocumentCount()
db.collection.count()
db.collection.distinct()
```

Tất cả các operations aggretate document này đến từ một single collection. Chúng cung cấp các phương thức đơn giản để access vào các aggregation processs, chúng không được mềm dẻo, linh hoạt như Aggregation Pipeline và Map-reduce

![](https://images.viblo.asia/26c482ce-b444-4172-bd16-f1dda60d2c20.png)

# Tham khảo
https://docs.mongodb.com/

https://www.sitepoint.com/tag/mongodb/