# Lời mở đầu
Cùng với sự phát triễn của các hệ thống lớn, NOSQL đang dần trở thành một xu thế tất yếu đối với các hệ thống yêu cầu xử lý số lượng dữ liệu lớn, yêu cầu truy vấn nhanh và có thể dễ dàng mở rộng. MongoDB đang dần trở thành một trong những hệ cơ sở dữ liệu tốt nhất cho việc này. Có rất nhiều tính năng nổi trội trong việc xử lý dữ liệu trong mongoDb, tuy nhiên nổi bật nhất vẫn là Aggregation.  Đây là một tính năng rất hữu ích dùng để tính toán số lượng dữ liệu lớn trên tập hợp các document(tương tự như bảng trong SQL). Bài viết này sẽ giới thiệu cơ bản về các toán tử và cách thức hoạt động của Aggregation.

# Tổng quan
Aggregation framework là một truy vấn nâng cao của MongoDb, cho phép thực hiện tính toán , xử lý và kết hợp từ nhiều document(tương tự các bảng trong SQL) để cho ra thông tin cần thiết. 
Ví dụ : Chúng ta có  các document :  sales, product và user , chúng ta có thể dùng Aggregation framework để tính toán thông tin từ 3 bảng này như danh số bán trong tháng này, danh số theo sản phẩm hoặc theo user. Có thể hình dung Aggregation tương tự như lệnh GROUP BY trong SQL.

# Nguyên tắc hoạt động.
Khi thực hiện theo tác với Aggregation framework , về nguyên tắc Aggregation sẽ thực hiện xử lý dựa theo các aggregation pipeline. Mỗi step thực hiện một tính toán duy nhất trong các dữ liệu đầu vào và tạo dữ liệu đầu ra.  Để hiểu hơn chúng ta có thể nhìn luồng xử lý phía dưới :

![](https://images.viblo.asia/5a01a922-1860-40e7-b43b-231a3cb759e4.PNG)

Nhìn vào chúng ta có thể thấy , khi một document được đưa vào Aggregation pipeline để xử lý. Việc thực hiện sẽ được thực hiện tuần tự .  Operation 1 -> Operation 2 ... -> Operation N .  Đầu ra của Operation 1 sẽ là input đầu vào của Operation 2 và cứ vậy. Cuối cùng sau khi xử lý xong dữ liệu sẽ được output.

Một số Operation cơ bản trong Aggregation :

 **$project**  :   chỉ định các field mong muốn truy vấn.

**$match** : chọn document mong muốn truy vấn.

**$limit**:  giới hạn số lượng document 

**$skip** : bỏ qua document nhất định

**$group**:  nhóm các document theo điều kiện nhất định

**$sort**: sắp xếp document

**$unwind** : thực hiện thao tác mở rộng trên một mảng , tạo một ouput document cho mỗi giá trị trong mảng đó

**$out** : ghi kết quả sau khi thực hiện trên pipeline vào một collection. (chỉ áp dụng đối với version 2.6 trở đi)

Dưới đây là một ví dụ aggregation framework pipeline khi thực hiện theo dựa trên các toán tử match , group and sort :

`db.products.aggregate([ {$match: …}, {$group: …}, {$sort: …} ] )`

Các toán tử sẽ được thực hiện được mô tả như hình dưới :

![](https://images.viblo.asia/c9f54c4e-f0ab-4b1f-91b5-3d7b4dea6ff2.PNG)

Hình trên khi thực hiện tính toán trên collection products.

1 :  Đầu tiên operation $match sẽ đươc thực thi. $match sẽ  chọn một số document nhất định từ input.

2:  Sau khi thực hiện operation $match,  các giá trị từ kết quả output ra của **$match** sẽ được dùng làm đầu vào cho operation $group.  Toán tử này có nhiệm vụ group các kết quả đầu ra theo điều kiện cụ thể ví dụ tính tổng hoặc trung bình cộng . 

3:  Output của operation $group sẽ được sử dụng làm input cho operation **$sort**. Operation **$Sort**  có nhiệm vụ sắp xếp các kết quả (theo điều kiện cho trước) và trả ra kết quả cuối

Bảng so sánh giữa SQL và aggregation framework :



|SQL command |Aggregation framework operator|
| -------- | -------- | 
| SELECT    | $project $group functions: $sum, $min, $avg, etc. |
| FROM     | db.collectionName.aggregate(...)     |
| JOIN     | $unwind     |
| GROUP BY     | $group     |
| HAVING     |$match     |


# Một số ví dụ về các operator trong Aggregation

Aggregation sử dụng rất nhiều các operator để tính toán trên các document xác định . Bài viết này sẽ chỉ đề cập đến nhất operator thường xuyên được dùng nhất . 

Dữ liệu được sử dụng cho các toán tử tính toán dưới bài viết :

Name collection :  **Customer**
Data:
```
/* 1 */
{
    "_id" : ObjectId("549988b74c71737b38c32991"),
    "address" : "47 Mockingbird Ln",
    "city" : "Lynnfield",
    "cust_type_cd" : "I",
    "fed_id" : "111-11-1111",
    "postal_code" : "01940",
    "state" : "MA",
    "officer" : {
        "_id" : ObjectId("549989904c71737b38c329a2"),
        "first_name" : "John",
        "last_name" : "Chilton",
        "start_date" : ISODate("1995-04-30T17:00:00.000Z"),
        "title" : "President",
        "cust_id" : 10
    },
    "individual" : {
        "birth_date" : ISODate("1972-04-21T17:00:00.000Z"),
        "first_name" : "James",
        "last_name" : "Hadley",
        "_id" : ObjectId("549989924c71737b38c329a6")
    }
}

/* 2 */
{
    "_id" : ObjectId("549988b74c71737b38c32992"),
    "address" : "372 Clearwater Blvd",
    "city" : "Woburn",
    "cust_type_cd" : "I",
    "fed_id" : "222-22-2222",
    "postal_code" : "01801",
    "state" : "MA",
    "officer" : {
        "_id" : ObjectId("549989944c71737b38c329b4"),
        "first_name" : "Paul",
        "last_name" : "Hardy",
        "start_date" : ISODate("2000-12-31T17:00:00.000Z"),
        "title" : "President",
        "cust_id" : 11
    },
    "individual" : {
        "birth_date" : ISODate("1968-08-14T17:00:00.000Z"),
        "first_name" : "Susan",
        "last_name" : "Tingley",
        "_id" : ObjectId("549989954c71737b38c329b8")
    }
}

/* 3 */
{
    "_id" : ObjectId("549988b74c71737b38c32993"),
    "address" : "18 Jessup Rd",
    "city" : "Quincy",
    "cust_type_cd" : "I",
    "fed_id" : "333-33-3333",
    "postal_code" : "02169",
    "state" : "MA",
    "officer" : {
        "_id" : ObjectId("549989964c71737b38c329c6"),
        "first_name" : "Carl",
        "last_name" : "Lutz",
        "start_date" : ISODate("2002-06-29T17:00:00.000Z"),
        "title" : "President",
        "cust_id" : 12
    },
    "individual" : {
        "birth_date" : ISODate("1958-02-05T17:00:00.000Z"),
        "first_name" : "Frank",
        "last_name" : "Tucker",
        "_id" : ObjectId("549989994c71737b38c329ca")
    }
}

/* 4 */
{
    "_id" : ObjectId("549988b74c71737b38c32994"),
    "address" : "12 Buchanan Ln",
    "city" : "Waltham",
    "cust_type_cd" : "I",
    "fed_id" : "444-44-4444",
    "postal_code" : "02451",
    "state" : "MA",
    "officer" : {
        "_id" : ObjectId("5499899a4c71737b38c329d8"),
        "first_name" : "Stanley",
        "last_name" : "Cheswick",
        "start_date" : ISODate("1999-04-30T17:00:00.000Z"),
        "title" : "President",
        "cust_id" : 13
    },
    "individual" : {
        "birth_date" : ISODate("1966-12-21T17:00:00.000Z"),
        "first_name" : "John",
        "last_name" : "Hayward",
        "_id" : ObjectId("5499899b4c71737b38c329dc")
    }
}

/* 5 */
{
    "_id" : ObjectId("549988b74c71737b38c32995"),
    "address" : "2341 Main St",
    "city" : "Salem",
    "cust_type_cd" : "I",
    "fed_id" : "555-55-5555",
    "postal_code" : "03079",
    "state" : "NH",
    "individual" : {
        "birth_date" : ISODate("1971-08-24T17:00:00.000Z"),
        "first_name" : "Charles",
        "last_name" : "Frasier",
        "_id" : ObjectId("5499899c4c71737b38c329ee")
    }
}

/* 6 */
{
    "_id" : ObjectId("549988b74c71737b38c32996"),
    "address" : "12 Blaylock Ln",
    "city" : "Waltham",
    "cust_type_cd" : "I",
    "fed_id" : "666-66-6666",
    "postal_code" : "02451",
    "state" : "MA",
    "individual" : {
        "birth_date" : ISODate("1962-09-13T17:00:00.000Z"),
        "first_name" : "John",
        "last_name" : "Spencer",
        "_id" : ObjectId("5499899e4c71737b38c32a00")
    }
}

/* 7 */
{
    "_id" : ObjectId("549988b74c71737b38c32997"),
    "address" : "29 Admiral Ln",
    "city" : "Wilmington",
    "cust_type_cd" : "I",
    "fed_id" : "777-77-7777",
    "postal_code" : "01887",
    "state" : "MA",
    "individual" : {
        "birth_date" : ISODate("1947-03-18T17:00:00.000Z"),
        "first_name" : "Margaret",
        "last_name" : "Young",
        "_id" : ObjectId("5499899f4c71737b38c32a12")
    }
}

/* 8 */
{
    "_id" : ObjectId("549988b74c71737b38c32998"),
    "address" : "472 Freedom Rd",
    "city" : "Salem",
    "cust_type_cd" : "I",
    "fed_id" : "888-88-8888",
    "postal_code" : "03079",
    "state" : "NH",
    "individual" : {
        "birth_date" : ISODate("1977-06-30T17:00:00.000Z"),
        "first_name" : "Louis",
        "last_name" : "Blake",
        "_id" : ObjectId("549989a14c71737b38c32a24")
    }
}

/* 9 */
{
    "_id" : ObjectId("549988b74c71737b38c32999"),
    "address" : "29 Maple St",
    "city" : "Newton",
    "cust_type_cd" : "I",
    "fed_id" : "999-99-9999",
    "postal_code" : "02458",
    "state" : "MA",
    "individual" : {
        "birth_date" : ISODate("1968-06-15T17:00:00.000Z"),
        "first_name" : "Richard",
        "last_name" : "Farley",
        "_id" : ObjectId("549989a24c71737b38c32a36")
    }
}

/* 10 */
{
    "_id" : ObjectId("549988b74c71737b38c3299a"),
    "address" : "7 Industrial Way",
    "city" : "Salem",
    "cust_type_cd" : "B",
    "fed_id" : "04-1111111",
    "postal_code" : "03079",
    "state" : "NH",
    "business" : {
        "incorp_date" : ISODate("1995-04-30T17:00:00.000Z"),
        "name" : "Chilton Engineering",
        "state_id" : "12-345-678",
        "_id" : ObjectId("549989a34c71737b38c32a37")
    }
}

/* 11 */
{
    "_id" : ObjectId("549988b74c71737b38c3299b"),
    "address" : "287A Corporate Ave",
    "city" : "Wilmington",
    "cust_type_cd" : "B",
    "fed_id" : "04-2222222",
    "postal_code" : "01887",
    "state" : "MA",
    "business" : {
        "incorp_date" : ISODate("2000-12-31T17:00:00.000Z"),
        "name" : "Northeast Cooling Inc.",
        "state_id" : "23-456-789",
        "_id" : ObjectId("549989a54c71737b38c32a49")
    }
}

/* 12 */
{
    "_id" : ObjectId("549988b74c71737b38c3299c"),
    "address" : "789 Main St",
    "city" : "Salem",
    "cust_type_cd" : "B",
    "fed_id" : "04-3333333",
    "postal_code" : "03079",
    "state" : "NH",
    "business" : {
        "incorp_date" : ISODate("2002-06-29T17:00:00.000Z"),
        "name" : "Superior Auto Body",
        "state_id" : "34-567-890",
        "_id" : ObjectId("549989a64c71737b38c32a5b")
    }
}

/* 13 */
{
    "_id" : ObjectId("549988b74c71737b38c3299d"),
    "address" : "4772 Presidential Way",
    "city" : "Quincy",
    "cust_type_cd" : "B",
    "fed_id" : "04-4444444",
    "postal_code" : "02169",
    "state" : "MA",
    "business" : {
        "incorp_date" : ISODate("1999-04-30T17:00:00.000Z"),
        "name" : "AAA Insurance Inc.",
        "state_id" : "45-678-901",
        "_id" : ObjectId("549989a84c71737b38c32a6d")
    }
}
```

## $match operator

Đây là một operator rất phổ biến và được dùng nhiều nhất . Mục đích chính của operator này là xác định những document phù hợp với điều kiện cho trước. 

Cú pháp :  `{ $match: { <query> } }`

Câu lệnh dưới đây sẽ thực hiện chọn các document với các khách hàng ở city :   **Salem**

```
db.Customer.aggregate(
    [ { $match : { city : "Salem" } } ]
);
```

Kết quả :

```
/* 1 */
{
    "_id" : ObjectId("549988b74c71737b38c32995"),
    "address" : "2341 Main St",
    "city" : "Salem",
    "cust_type_cd" : "I",
    "fed_id" : "555-55-5555",
    "postal_code" : "03079",
    "state" : "NH",
    "individual" : {
        "birth_date" : ISODate("1971-08-24T17:00:00.000Z"),
        "first_name" : "Charles",
        "last_name" : "Frasier",
        "_id" : ObjectId("5499899c4c71737b38c329ee")
    }
}

/* 2 */
{
    "_id" : ObjectId("549988b74c71737b38c32998"),
    "address" : "472 Freedom Rd",
    "city" : "Salem",
    "cust_type_cd" : "I",
    "fed_id" : "888-88-8888",
    "postal_code" : "03079",
    "state" : "NH",
    "individual" : {
        "birth_date" : ISODate("1977-06-30T17:00:00.000Z"),
        "first_name" : "Louis",
        "last_name" : "Blake",
        "_id" : ObjectId("549989a14c71737b38c32a24")
    }
}

/* 3 */
{
    "_id" : ObjectId("549988b74c71737b38c3299a"),
    "address" : "7 Industrial Way",
    "city" : "Salem",
    "cust_type_cd" : "B",
    "fed_id" : "04-1111111",
    "postal_code" : "03079",
    "state" : "NH",
    "business" : {
        "incorp_date" : ISODate("1995-04-30T17:00:00.000Z"),
        "name" : "Chilton Engineering",
        "state_id" : "12-345-678",
        "_id" : ObjectId("549989a34c71737b38c32a37")
    }
}

/* 4 */
{
    "_id" : ObjectId("549988b74c71737b38c3299c"),
    "address" : "789 Main St",
    "city" : "Salem",
    "cust_type_cd" : "B",
    "fed_id" : "04-3333333",
    "postal_code" : "03079",
    "state" : "NH",
    "business" : {
        "incorp_date" : ISODate("2002-06-29T17:00:00.000Z"),
        "name" : "Superior Auto Body",
        "state_id" : "34-567-890",
        "_id" : ObjectId("549989a64c71737b38c32a5b")
    }
}
```
## $project operator 

Chỉ định các field cần thiết khi thực hiện truy vấn dựa vào input đầu vào..
 
Cú pháp :  `{ $project: { <specification(s)> } }`
    
Ví dụ : Câu lệnh bên dưới sẽ chỉ lấy các field address , city , state từ collection customer

`db.Customer.aggregate( [ { $project : { address : 1 , city : 1 , state: 1 } } ] )`

Kết quả :

```
/* 1 */
{
    "_id" : ObjectId("549988b74c71737b38c32991"),
    "address" : "47 Mockingbird Ln",
    "city" : "Lynnfield",
    "state" : "MA"
}

/* 2 */
{
    "_id" : ObjectId("549988b74c71737b38c32992"),
    "address" : "372 Clearwater Blvd",
    "city" : "Woburn",
    "state" : "MA"
}

/* 3 */
{
    "_id" : ObjectId("549988b74c71737b38c32993"),
    "address" : "18 Jessup Rd",
    "city" : "Quincy",
    "state" : "MA"
}

/* 4 */
{
    "_id" : ObjectId("549988b74c71737b38c32994"),
    "address" : "12 Buchanan Ln",
    "city" : "Waltham",
    "state" : "MA"
}

/* 5 */
{
    "_id" : ObjectId("549988b74c71737b38c32995"),
    "address" : "2341 Main St",
    "city" : "Salem",
    "state" : "NH"
}

/* 6 */
{
    "_id" : ObjectId("549988b74c71737b38c32996"),
    "address" : "12 Blaylock Ln",
    "city" : "Waltham",
    "state" : "MA"
}

/* 7 */
{
    "_id" : ObjectId("549988b74c71737b38c32997"),
    "address" : "29 Admiral Ln",
    "city" : "Wilmington",
    "state" : "MA"
}

/* 8 */
{
    "_id" : ObjectId("549988b74c71737b38c32998"),
    "address" : "472 Freedom Rd",
    "city" : "Salem",
    "state" : "NH"
}

/* 9 */
{
    "_id" : ObjectId("549988b74c71737b38c32999"),
    "address" : "29 Maple St",
    "city" : "Newton",
    "state" : "MA"
}

/* 10 */
{
    "_id" : ObjectId("549988b74c71737b38c3299a"),
    "address" : "7 Industrial Way",
    "city" : "Salem",
    "state" : "NH"
}

/* 11 */
{
    "_id" : ObjectId("549988b74c71737b38c3299b"),
    "address" : "287A Corporate Ave",
    "city" : "Wilmington",
    "state" : "MA"
}

/* 12 */
{
    "_id" : ObjectId("549988b74c71737b38c3299c"),
    "address" : "789 Main St",
    "city" : "Salem",
    "state" : "NH"
}

/* 13 */
{
    "_id" : ObjectId("549988b74c71737b38c3299d"),
    "address" : "4772 Presidential Way",
    "city" : "Quincy",
    "state" : "MA"
}
```
## $group operator 

Nhóm các input document  dựa vào các điều kiện cho trước;

Cú pháp :

```
{
  $group:
    {
      _id: <expression>, // Group By Expression
      <field1>: { <accumulator1> : <expression1> },
      ...
    }
 }
```

Câu lệnh dưới sẽ thực hiện group các khách hàng có cùng state và thực hiện count trên các giá trị đã group:

```
db.Customer.aggregate([
  {
    $group : {
       _id : "$state",
       count: { $sum: 1 }
    }
  }
 ])
```

Kết quả : 

```
/* 1 */
{
    "_id" : "NH",
    "count" : 4.0
}

/* 2 */
{
    "_id" : "MA",
    "count" : 9.0
}
```
## $limit operator
 Operator này thường được dùng để giới hạn số lượng document output.
Cú pháp : `{ $limit: <positive integer> }`

Ví dụ : Câu lệnh dưới sẽ giới hạn document output là 2: 

```
db.Customer.aggregate([
    { $limit : 2 }
]);
```
Kết quả :

```
/* 1 */
{
    "_id" : ObjectId("549988b74c71737b38c32991"),
    "address" : "47 Mockingbird Ln",
    "city" : "Lynnfield",
    "cust_type_cd" : "I",
    "fed_id" : "111-11-1111",
    "postal_code" : "01940",
    "state" : "MA",
    "officer" : {
        "_id" : ObjectId("549989904c71737b38c329a2"),
        "first_name" : "John",
        "last_name" : "Chilton",
        "start_date" : ISODate("1995-04-30T17:00:00.000Z"),
        "title" : "President",
        "cust_id" : 10
    },
    "individual" : {
        "birth_date" : ISODate("1972-04-21T17:00:00.000Z"),
        "first_name" : "James",
        "last_name" : "Hadley",
        "_id" : ObjectId("549989924c71737b38c329a6")
    }
}

/* 2 */
{
    "_id" : ObjectId("549988b74c71737b38c32992"),
    "address" : "372 Clearwater Blvd",
    "city" : "Woburn",
    "cust_type_cd" : "I",
    "fed_id" : "222-22-2222",
    "postal_code" : "01801",
    "state" : "MA",
    "officer" : {
        "_id" : ObjectId("549989944c71737b38c329b4"),
        "first_name" : "Paul",
        "last_name" : "Hardy",
        "start_date" : ISODate("2000-12-31T17:00:00.000Z"),
        "title" : "President",
        "cust_id" : 11
    },
    "individual" : {
        "birth_date" : ISODate("1968-08-14T17:00:00.000Z"),
        "first_name" : "Susan",
        "last_name" : "Tingley",
        "_id" : ObjectId("549989954c71737b38c329b8")
    }
}
```
## $sort operator
 Operator thường được dùng để sắp xếp các kết quả sau khi đã thực hiện tính toán xong. 
Cú pháp : ` { $sort: { <field1>: <sort order>, <field2>: <sort order> ... } }`

Ví dụ :  Câu lệnh dưới sẽ thực hiện sort các kết quả theo thứ tự tăng dần của postal_code và giảm dần của fed_id và thực hiện lấy 2 bảng ghi đầu tiên

```
db.Customer.aggregate(
   [
     { $sort : { postal_code : 1, fed_id: -1 } },
     {$limit: 2}
   ]
)
```

Lưu ý :  1 tương ứng với tăng dần và -1 giảm dần

Kết quả :

```
/* 1 */
{
    "_id" : ObjectId("549988b74c71737b38c32992"),
    "address" : "372 Clearwater Blvd",
    "city" : "Woburn",
    "cust_type_cd" : "I",
    "fed_id" : "222-22-2222",
    "postal_code" : "01801",
    "state" : "MA",
    "officer" : {
        "_id" : ObjectId("549989944c71737b38c329b4"),
        "first_name" : "Paul",
        "last_name" : "Hardy",
        "start_date" : ISODate("2000-12-31T17:00:00.000Z"),
        "title" : "President",
        "cust_id" : 11
    },
    "individual" : {
        "birth_date" : ISODate("1968-08-14T17:00:00.000Z"),
        "first_name" : "Susan",
        "last_name" : "Tingley",
        "_id" : ObjectId("549989954c71737b38c329b8")
    }
}

/* 2 */
{
    "_id" : ObjectId("549988b74c71737b38c32997"),
    "address" : "29 Admiral Ln",
    "city" : "Wilmington",
    "cust_type_cd" : "I",
    "fed_id" : "777-77-7777",
    "postal_code" : "01887",
    "state" : "MA",
    "individual" : {
        "birth_date" : ISODate("1947-03-18T17:00:00.000Z"),
        "first_name" : "Margaret",
        "last_name" : "Young",
        "_id" : ObjectId("5499899f4c71737b38c32a12")
    }
}
      
```    

# Kết hợp các operator

Trên thực tế việc thao tác và làm việc với Aggregation là sự kết hợp của nhiều operator khác nhau để có thể cho ra kết quả mong muốn. Dưới đây là một số ví dụ :

##  $Match operator + $Project operator

Câu lệnh phía dưới sẽ thực hiện lọc ra các khách hàng ở city là Woburn và state là  MA . Kết quả sẽ được hiển thị chỉ với 2 trường address và officer .

```
db.Customer.aggregate([  
{
    $match: {
      city: "Woburn",
      state: "MA"
    }
  },
{
    $project: {
      address: 1,
      officer: 1
    }
  }
])
```

Kết quả :
```
/* 1 */
{
    "_id" : ObjectId("549988b74c71737b38c32992"),
    "address" : "372 Clearwater Blvd",
    "officer" : {
        "_id" : ObjectId("549989944c71737b38c329b4"),
        "first_name" : "Paul",
        "last_name" : "Hardy",
        "start_date" : ISODate("2000-12-31T17:00:00.000Z"),
        "title" : "President",
        "cust_id" : 11
    }
}
```
##  $Match operator + $Group operator + $Sort operator + $limit operator

Câu lệnh phía dưới là sự kết hợp của 4  operator : Match , Group, Sort and Limit. Câu lệnh này sẽ tìm các khách hàng với state là : MA , sau đó sẽ nhóm các khách hàng vừa tìm được theo city và đếm xem có bao nhiêu khách hàng ở mỗi city. Tiếp theo thực hiện sort các kết quả vừa tìm được theo postal_code theo thứ tự tăng dần và lấy 5 quả đầu tiên tìm được.

```
db.Customer.aggregate([
  // First Stage
  {
    $match : { "state":  "MA"  }
  },
  // Second Stage
  {
    $group : {
       _id : "$city",
       count: { $sum: 1 }
    }
  },
  // Third Stage
  {
    $sort : { postal_code: 1 }
  },
  {
    $limit : 5
  }
 ])
```
Kết quả :
```

/* 1 */
{
    "_id" : "Woburn",
    "count" : 1.0
}

/* 2 */
{
    "_id" : "Quincy",
    "count" : 2.0
}

/* 3 */
{
    "_id" : "Wilmington",
    "count" : 2.0
}

/* 4 */
{
    "_id" : "Waltham",
    "count" : 2.0
}

/* 5 */
{
    "_id" : "Newton",
    "count" : 1.0
}
```
##  $Match operator + $Group operator + $Sort operator + $Out Operator

Câu lệnh dưới đây thực hiện tương tự ví dụ phía trên tuy nhiên sẽ không giới hạn số lượng document khi output ra và sẽ sử dụng Operator Out để tạo ra một collection mới mang tên NewCustomer. Operator Out cho phép tạo ra một collection mới từ kết quả truy vấn trả về.

```
db.Customer.aggregate([
  // First Stage
  {
    $match : { "state":  "MA"  }
  },
  // Second Stage
  {
    $group : {
       _id : "$city",
       count: { $sum: 1 }
    }
  },
  // Third Stage
  {
    $sort : { postal_code: 1 }
  },
  {$out: 'newCustomer'}
 ])
```
Kết quả :  Collection newCustomer đã được tạo. Thực hiện query trên collection mới với lệnh : ` db.getCollection('newCustomer').find({})` . 

Kết quả thông tin của collection này là toàn bộ dữ liệu đã được tính toán với các operator : Match , Group ,  Sort

```
/* 1 */
{
    "_id" : "Woburn",
    "count" : 1.0
}

/* 2 */
{
    "_id" : "Quincy",
    "count" : 2.0
}

/* 3 */
{
    "_id" : "Lynnfield",
    "count" : 1.0
}

/* 4 */
{
    "_id" : "Waltham",
    "count" : 2.0
}

/* 5 */
{
    "_id" : "Wilmington",
    "count" : 2.0
}

/* 6 */
{
    "_id" : "Newton",
    "count" : 1.0
}
```

# Kết luận
Aggregation là một trong những tính năng nổi bật và quan trọng trong việc tính toán xử lý dữ liệu trong mongoDb mà hầu hết các hệ thống hiện nay đang dùng. Nắm vững Aggregation Framework khiến chúng ta dễ dàng thao tác xử lý một cách đơn giản data với MongoDB. Aggregation còn rất nhiều tính năng phạm vi bài viết chưa đề cập đến như : cursor(dùng cho việc xử lý dữ liệu quá 16MB) , explain hay allowDiskUse.  Trong bài viết kế tiếp mình sẽ đề cập đến các tính năng này. Hẹn gặp lại các bạn trong các bài viết tiếp theo

# Tài liệu tham khảo

https://docs.mongodb.com/manual/reference/operator/aggregation/