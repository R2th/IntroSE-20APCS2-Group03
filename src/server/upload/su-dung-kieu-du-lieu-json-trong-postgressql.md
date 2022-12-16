# Lời nói đầu
Như  chúng ta đã biết, **JSON** đã trở thành một hình thức trao đổi dữ liệu phổ biến trong web application. Mặc dù có rất nhiều hệ cơ sở dữ liệu **NoSql** có thể thao tác và lưu trữ trực tiếp định dạng **JSON**(Ví dụ : **MongoDb**), tuy nhiên những ai đã từng làm việc với hệ cơ sở dữ liệu quan hệ (RDBMS) mong muốn có thể lưu trữ trực tiếp định dạng **JSON** trong cơ sở dữ liệu của họ.

# Lịch sử phát triễn kiểu dữ liệu JSON trong PostgresSql
* Kể từ phiên bản **PostgresSql** 9.2, **PostgresSql** cho phép chúng ta có thể thực hiện lưu trữ và thao tác với kiểu dữ liệu JSON. 

* Đến phiên bản 9.3, **PostgresSql** tăng cường đáng kể hỗ trợ **JSON** và thêm  các hàm dùng để edit, extracting , casting sang các kiểu dữ liệu khác
 
* Đến phiên bản  9.4, **PostgresSql** đã giới thiệu kiểu dữ liệu  **JSONB** một dạng nhị phân của JSON qua đó có thể tận dùng Index để tăng tốc độ truy vấn.  
 
* Đến phiên bản 9.5,  **PostgresSql** giới  thiệu nhiều function hơn cho **Jsonb**, bao gồm các hàm để thiết lập các object trong **Jsonb**. 
 
* Đến phiên bản 9.6 , hàm **jsonb_insert** được thêm vào nhằm chèn vào một mảng jsonb hiện có hoặc thêm vào một **key - value** vào mảng nếu không tồn tại.  

**PostgreSQL** có hai loại dữ liệu riêng để lưu trữ  **JSON**:  **JSON** và **JSONB** .
 
# JSON và JSONB
Như đã đề cập , **PostgreSQL** hỗ trợ hai loại dữ liệu: JSON và JSONB. Mặc dù các loại dữ liệu này được cho là gần như giống hệt nhau, có một số khác biệt về hiệu suất và cách thức lưu trữ.

**JSON**: Kiểu dữ liệu **JSON** lưu trữ một bản sao chính xác của dữ liệu đầu vào( khoảng trắng , thứ tự các key trong object và các khoá trùng lặp) . Điều này dẫn đến việc truy vấn chậm vì các hàm trong **PostgresSql** phải phân tích cú pháp mỗi khi thực hiện truy vấn. 

**JSONB**:  **JSONB** được lưu trữ dưới dạng định dạng nhị phân  và do đó không cần phân tích cú pháp khi thực hiện truy vấn. **Jsonb** sẽ không đảm bảo thứ tự chèn, không cho phép trùng key , xoá các khoảng trắng.  Một lợi thế của kiểu dữ liệu **JSONB**  là hỗ trợ **Index** do đó tạo ra sự khác biệt lớn trong vấn đề hiệu suất khi thực hiện truy vấn. Tuy nhiên, định dạng nhị phân của **JSONB** dẫn đến sự chậm trễ nhỏ trong quá trình input data.

Qua đó nếu không có yêu cầu gì quá đặc biệt, **JSONB** là kiểu dữ liệu nên chọn khi thực hiện lưu **JSON** trong **PostgresSql**

# Các toán tử cơ bản khi thao tác với JSON/JSONB

Dưới đây là bảng các toán tử được sử dụng để thao  tác với cả 2 kiểu dữ liệu JSON/JSONB


| Toán tử | Kiểu | Mô tả |  Ví dụ |  Kết quả  | 
| -------- | -------- | -------- | -------- | -------- |
| ->     | int     | Lấy một phần tử từ mảng JSON     | ‘[{“a”:”test”},{“b”:”test1”},{“c”:”test2”}]’::json->2     | “c”:”test2”     |
| ->  | text    | Lấy một trường trong Json theo khoá       |  ‘{“a”: {“b”:”test”}}’::json->’a’     | “b”:”test”     |
| ->>     | int     | Lấy một mảng  đối tượng Json dưới dạng text    | ‘[1,2,3]’::json->>2     | 3     |
| ->>	     | text     | Lấy một trường trong Json dưới dạng text    | ‘{“a”:1,”b”:2}’::json->>’b’   | 2     |
| #>     | text[]     | Lấy đối tượng JSON tại đường dẫn đã chỉ định   | ‘{“a”: {“b”:{“c”: “test”}}}’::json#>'{a,b}’     | {“c”: “test”}     |
| #>     | text[]     | Lấy đối tượng JSON tại đường dẫn đã chỉ định dưới dạng text     | ‘{“a”:[1,2,3],”b”:[4,5,6]}’::json#>>'{a,2}’     | 3     |

# Ví dụ cơ bản về sử dụng JSON trong PostgresSql
## JSON
### * Inserting JSON Data
Đầu tiên cần phải tạo bảng để lưu trữ **JSON**, chúng ta phải xác định một cột là loại **json** như sau

`CREATE TABLE persons (id serial PRIMARY KEY, person json);`

Lưu ý: **PostgreSQL** tự động validate data input đảm bảo những gì bạn đang thêm là JSON hợp lệ.   Nếu một data json input không hợp lệ, việc insert sẽ không thành công

Thực hiện insert 

```
INSERT INTO persons (person)
VALUES ('{
"name":"Sonia",
"spouse":
{
"name":"Alex",
"parents":
{
"father":"Rafael",
"mother":"Ofelia"
},
"phones":
[
{
"type":"work",
"number":"123456"
},
{
"type":"cell",
"number":"341123123"
}
]
},
"children":
[{
"name":"Brandon",
"gender":"M"
},
{
"name":"Azaleah",
"girl":true,
"phones": []
}
]
}');
```

### Truy vấn Json

Cách đơn giản nhất để truy vấn JSon đã được lưu trữ là sử dụng các toán tử đã được giới thiệu ở bảng phía trên. Một số ví dụ về truy vấn Json

Truy vấn một trường trong Json: ( trường hơp này là name)
```
SELECT person->'name' as name FROM persons;
```

Kết quả:  ![](https://images.viblo.asia/98d63dbf-0822-4c85-81f0-d23e5de5a655.PNG)

Một câu lệnh khác truy vấn trong json 

`SELECT person->'spouse'->'parents'->'father'  FROM persons;`

Kết quả : ![](https://images.viblo.asia/bebfae85-dde0-42ff-b146-2910e6a78fc3.PNG)

Câu lệnh trên có thể viết lại theo dạng path array như sau :

`SELECT person#>array['spouse','parents','father'] FROM persons;`

Kết quả tương tự như ví dụ phía trên. Lưu ý rằng toán tử #> để chỉ định cho Postgres biết phía sau là  path array

Để thao tác với một mảng trong JSON, chúng ta phải sử dụng array index. JSON array luôn luôn bắt đầu bằng 0, không giống như Postgres arrays, index bắt đầu bằng 1.

Ví dụ : Sẽ tìm tên của children ở vị trí index = 0
`SELECT person->'children'->0->'name' as name_children FROM persons;`

Kết quả : ![](https://images.viblo.asia/5c41e191-da60-4f9e-8fae-5753b4067cbe.PNG)

Có thể viết lại theo dạng path array như sau :

`SELECT person#>array['children','0','name'] FROM persons;`

Lưu ý: Tất các các ví dụ phía trên, kết quả trả về giá trị dưới dạng JSON primitives (số,
chuỗi, booleans). Để trả về kết quả biểu dưới text thực hiện thêm một dấu lớn hơn (>) vào câu lệnh truy vấn:

`SELECT person->'spouse'->'parents'->>'father' FROM persons;`

Kết quả : ![](https://images.viblo.asia/bbc079c6-d848-4929-8662-9f4d53d92826.PNG)

## JSONB

Về việc thao tác với **JSONB** có một vài sự khác biệt so với **JSON**.  
### * Inserting JSONB Data

Trước tiên, thực hiện tạo một bảng persons khác với kiểu dữ liệu JSONB như sau :

`CREATE TABLE persons_b (id serial PRIMARY KEY, person jsonb);`

Việc thực hiện insert ở **JSONB** giống với JSON. Chúng ta sẽ sử dụng lại các dữ liệu đã insert phía trên để insert. Sự khác nhau chủ yếu ở cách thức query, vì vậy chúng ta sẽ tập trung vào nó :

### * Query JSONB Data

Thực hiện 2 câu lệnh truy vấn:

Với kiểu JSONB:

`SELECT person As b FROM persons_b WHERE id = 1;`

Kết quả : 
```
{
    "name": "Sonia",
    "spouse": {
        "name": "Alex",
        "phones": [
            {
                "type": "work",
                "number": "123456"
            },
            {
                "type": "cell",
                "number": "341123123"
            }
        ],
        "parents": {
            "father": "Rafael",
            "mother": "Ofelia"
        }
    },
    "children": [
        {
            "name": "Brandon",
            "gender": "M"
        },
        {
            "girl": true,
            "name": "Azaleah",
            "phones": []
        }
    ]
}
```


Với kiểu **JSON**

`SELECT person As j FROM persons WHERE id = 1;`

Kết quả :

```
{
"name":"Sonia",
"spouse":
{
"name":"Alex",
"parents":
{
"father":"Rafael",
"mother":"Ofelia"
},
"phones":
[
{
"type":"work",
"number":"123456"
},
{
"type":"cell",
"number":"341123123"
}
]
},
"children":
[{
"name":"Brandon",
"gender":"M"
},
{
"name":"Azaleah",
"girl":true,
"phones": []
}
]
}
```

Nhìn vào 2 kết quả có thể thấy, JSONB format lại data đầu vào, xoá các khoảng trắng và không đảm bảo thứ tự chèn trong khi Json giữ các thứ tự data được chèn, giữ các khoảng trắng và không format lại dữ liệu đầu vào.

Ngoài các toán tử hỗ trợ khi thao tác sử dụng **JSON**, **JSONB** sẽ sử dụng một số toán tử dành riêng cho **JSONB** như sau :  bằng (=), có chứa (@>), có chứa (<@), tồn tại key (?), ...

Ví dụ : Lấy tất cả các person có child name là Brandon, sử dụng toán tử @> , câu lệnh sẽ như sau :

```
SELECT person->>'name' As name
FROM persons_b
WHERE person @> '{"children":[{"name":"Brandon"}]}';
```

Kết quả :  ![](https://images.viblo.asia/f74c49f5-13d0-4e8a-819b-07378b97bbe2.PNG)

Một lợi thế của kiểu **JSONB** mà  kiểu **JSON** không có được đó là **JSON** có thể sử dụng **index** để tăng tốc độ truy vấn. Để sử dụng index thực hiện như sau :

`CREATE INDEX ix_persons_jb_person_gin ON persons_b USING gin (person);`

### Edit data trong JSONB

Như đã giới thiệu, kể từ phiên bản 9.5, **JSONB** giới thiệu 2 toán tử **concatenation**(||) và **subtraction**(-) để thao tác trong **JSONB** ( Chỉ áp dụng cho kiểu **JSONB** không áp dụng cho  kiểu JSON)

Toán tử **concatenation** có thể sử dụng để thêm hoặc thay thế thuộc tính cho **JSONB**. 

**Ví dụ** : Ở ví dụ dưới chúng ta sẽ sử dụng toán tử **concatenation** để thêm một địa chỉ với person có tên là Sonia và sử dụng **RETURNING** để cập nhật lại giá trị

```
UPDATE persons_b
SET person = person || '{"address": "DN"}'::jsonb
WHERE person @> '{"name":"Sonia"}'
RETURNING person;
```

Kết quả : 
```
{
    "name": "Sonia",
    "spouse": {
        "name": "Alex",
        "phones": [
            {
                "type": "work",
                "number": "123456"
            },
            {
                "type": "cell",
                "number": "341123123"
            }
        ],
        "parents": {
            "father": "Rafael",
            "mother": "Ofelia"
        }
    },
    "address": "DN",
    "children": [
        {
            "name": "Brandon",
            "gender": "M"
        },
        {
            "girl": true,
            "name": "Azaleah",
            "phones": []
        }
    ]
}
```

Như có thể thấy phía trên, trường **address** đã được thêm vào khi thực hiện cập nhật

Bởi vì **JSONB**  không cho phép key bị  trùng nên nếu muốn cập nhật giá trị lại ví dụ thay "address": "DN" bằng "address": "VN" chỉ cần thay đổi giá trị DN thành VN trong câu lệnh trên như sau:

```
UPDATE persons_b
SET person = person || '{"address": "VN"}'::jsonb
WHERE person @> '{"name":"Sonia"}'
RETURNING person;
```

Kết quả: 

```
{
    "name": "Sonia",
    "spouse": {
        "name": "Alex",
        "phones": [
            {
                "type": "work",
                "number": "123456"
            },
            {
                "type": "cell",
                "number": "341123123"
            }
        ],
        "parents": {
            "father": "Rafael",
            "mother": "Ofelia"
        }
    },
    "address": "VN",
    "children": [
        {
            "name": "Brandon",
            "gender": "M"
        },
        {
            "girl": true,
            "name": "Azaleah",
            "phones": []
        }
    ]
}
```

Nếu muốn thực hiện xoá địa chỉ address đã được thêm vào ở ví dụ trên,  chúng ta có thể sử dụng toán tử  **subtraction(-)**  như sau :

```
UPDATE persons_b
SET person = person - 'address'
WHERE person @> '{"name":"Sonia"}';
```

Thực hiện truy vấn lại với câu lệnh **select** kết quả **address** đã bị xoá ra khỏi person có tên **Sonia**
```

{
    "name": "Sonia",
    "spouse": {
        "name": "Alex",
        "phones": [
            {
                "type": "work",
                "number": "123456"
            },
            {
                "type": "cell",
                "number": "341123123"
            }
        ],
        "parents": {
            "father": "Rafael",
            "mother": "Ofelia"
        }
    },
    "children": [
        {
            "name": "Brandon",
            "gender": "M"
        },
        {
            "girl": true,
            "name": "Azaleah",
            "phones": []
        }
    ]
```
}

# Kết luận
**JSON** là một định dạng rất phổ biến hiện nay, bằng cách tích hợp JSON vào hệ cơ sở dữ liệu của mình, **POSTGRESQL** khiến việc thao tác với JSON đơn giản hơn bao giờ hết. Hy vọng qua bài viết sẽ giúp ích mọi người trong việc hiểu rõ hơn về **JSON** trong **Postgresql** và tích hợp nó vào trong project của mình. PostgresSql hỗ trợ nhiều hàm để thao tác với **JSON** mà trong phạm vi bài viết chưa đề cập đến. Trong bài viết tới mình sẽ trình bày kỹ hơn về các hàm này để thuận tiện trong việc thao tác với **JSON** trong **PostgresSql**. Hẹn gặp lại các bạn trong các bài viết tới.

# Tài liệu tham khảo

https://www.postgresql.org/docs/10/datatype-json.html