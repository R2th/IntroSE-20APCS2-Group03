Bắt đầu từ Mysql 5.7.8, Mysql hỗ trợ kiểu dữ liệu JSON được xác định nghĩa bởi [RFC 7159](https://tools.ietf.org/html/rfc7159) , cho phép truy cập vào dữ liệu trong các tài liệu JSON (Javascript Notation Object).
Các điểm lợi của việc lưu dữ liệu vào cột dạng JSON: 
- Tự động xác thực các dữ liệu dạng JSON
- Tối ưu hoá định dạng lưu trữ
- Các hàm trong SQL hỗ trợ việc thao tác với dữ liệu cột JSON như tạo mới, quản lý hay tìm kiếm
- Chuẩn hoá, hợp nhất dữ liệu JSON
## Tạo Dữ Liệu JSON
Dữ liệu dạng JSON có 2 dạng phổ biến là **Mảng JSON(Array Json)** và **Đối tượng JSON(Object Json)**. **Mảng Json** chứa các giá trị được phân tách với nhau bởi dấu `,` và được đặt bên trong `[` và `]` : 
```
["abc", 10, null, true, false]
```
**Đối tượng Json** chứa tập hợp các cặp khoá - giá trị (key - value) được phân tách với nhau cũng bởi dấu `,` và được đặt bên trong `{` và `}`: 
```
{"k1": "value", "k2": 10}
```
Tuy nhiên với nhiều trường hợp phức tạp, dữ liệu JSON còn có dạng **lồng nhau (Nesting)**: 
```
[99, {"id": "HK500", "cost": 75.99}, ["hot", "cold"]]
{"k1": "value", "k2": [10, 20]}
```
trong mảng JSON chứ đối tượng JSON và ngược lại.
Trong MySQL, các giá trị JSON được viết dưới dạng chuỗi. MySQL phân tích bất kỳ chuỗi nào được sử dụng trong ngữ cảnh yêu cầu giá trị JSON và tạo ra lỗi nếu nó không hợp lệ như JSON. Thêm một giá trị vào cột dạng JSON: 
```
mysql> INSERT INTO t1 VALUES('{"key1": "value1", "key2": "value2"}');
Query OK, 1 row affected (0.01 sec)

mysql> INSERT INTO t1 VALUES('[1, 2,');
ERROR 3140 (22032) at line 2: Invalid JSON text:
"Invalid value." at position 6 in value (or column) '[1, 2,'.
```
## Thao Tác với Dữ Liệu Cột JSON
- Hãy tưởng tượng khi bạn muốn lấy một giá trị nào đó trong một cột dữ liệu JSON(ở đây lấy giá trị name): 
```
mysql> SELECT JSON_EXTRACT('{"id": 14, "name": "Aztalan"}', '$.name');
+---------------------------------------------------------+
| JSON_EXTRACT('{"id": 14, "name": "Aztalan"}', '$.name') |
+---------------------------------------------------------+
| "Aztalan"                                               |
+---------------------------------------------------------+
```
Ở đây Mysql cung cấp hàm `JSON_EXTRACT()` giúp trả về dữ liệu từ một tài liệu JSON. Dữ liệu được trả về dựa theo **đường dẫn** cung cấp, trong ví dụ trên chúng ta thấy **đường dẫn** ở đây là `$.name`.
Tìm hiểu sâu hơn về **đường dẫn** này nhé: `$` là kí tự thể hiện tài liệu JSON đang được xét đến , `name` chính là tên khoá ta muốn lấy. Tuy nhiên với các dạng dữ liệu JSON thì **đường dẫn** lại khác nhau.
Với dạng **Mảng JSON** thì **đường dẫn** có dạng `$[n]` còn với **Đối tượng JSON** là `$.key`, `n` là vị trí giá trị chúng ta muốn lấy trong mảng và `key` là tên khoá của giá trị chúng ta muốn lấy.
```
mysql> SELECT JSON_EXTRACT('["abc", 14, "Aztalan"]', '$[0]');
+---------------------------------------------------------+
| JSON_EXTRACT('["abc", 14, "Aztalan"]', '$[0]')          |
+---------------------------------------------------------+
| "abc"                                                   |
+---------------------------------------------------------+
```
Tuy nhiên với trường hợp dữ liệu dạng lồng nhau thì **đường dẫn** của chúng ta không đơn giản như vậy. Cùng xem ví dụ sau nhé: 
```
[3, {"a": [5, 6], "b": 10}, [99, 100]]
```
Đây là một mảng JSON vậy nếu chúng ta muốn lấy giá trị `3` trong mảng thì **đường dẫn** sẽ là `$[0]` (trong một array vị trí đầu tiên sẽ bắt đầu là 0), nhưng nếu chọn lấy giá trị thứ 2 ta sẽ có một đối tượng JSON `{"a": [5, 6], "b": 10}` vậy nếu bài toán đặt ra là muốn lấy giá trị của khoá `b` trong đối tượng JSON này thì ta phải có đường dẫn như nào?. Để lấy giá trị của khoá `b` ta sẽ có đường dẫn là `$[1].b`. Với tuỳ trường hợp dạng dữ liệu JSON ta sẽ có đường dẫn là `$[n].key` với dạng mảng lồng object JSON và `$.key[n]` mới dạng object lồng mảng JSON.
-  Một số hàm phổ biến được Mysql hỗ trợ như `JSON_SET`, `JSON_INSERT`, `JSON_REPLACE` hay `JSON_REMOVE`.
```
mysql> SET @j = '["a", {"b": [true, false]}, [10, 20]]';
```
JSON_SET () thay thế các giá trị cho các đường dẫn tồn tại và thêm các giá trị cho các đường dẫn không tồn tại:
```
mysql> SELECT JSON_SET(@j, '$[1].b[0]', 1, '$[2][2]', 2);
+--------------------------------------------+
| JSON_SET(@j, '$[1].b[0]', 1, '$[2][2]', 2) |
+--------------------------------------------+
| ["a", {"b": [1, false]}, [10, 20, 2]]      |
+--------------------------------------------+
```
JSON_INSERT () thêm các giá trị mới nhưng không thay thế các giá trị hiện có:
```
mysql> SELECT JSON_INSERT(@j, '$[1].b[0]', 1, '$[2][2]', 2);
+-----------------------------------------------+
| JSON_INSERT(@j, '$[1].b[0]', 1, '$[2][2]', 2) |
+-----------------------------------------------+
| ["a", {"b": [true, false]}, [10, 20, 2]]      |
+-----------------------------------------------+
```
JSON_REPLACE () thay thế các giá trị hiện có và bỏ qua các giá trị mới:
```
mysql> SELECT JSON_REPLACE(@j, '$[1].b[0]', 1, '$[2][2]', 2);
+------------------------------------------------+
| JSON_REPLACE(@j, '$[1].b[0]', 1, '$[2][2]', 2) |
+------------------------------------------------+
| ["a", {"b": [1, false]}, [10, 20]]             |
+------------------------------------------------+
```
JSON_REMOVE () lấy một tài liệu JSON và một hoặc nhiều đường dẫn chỉ định các giá trị sẽ bị xóa khỏi tài liệu. Giá trị trả về là tài liệu gốc trừ đi các giá trị được chọn bởi các đường dẫn tồn tại trong tài liệu:
```
mysql> SELECT JSON_REMOVE(@j, '$[2]', '$[1].b[1]', '$[1].b[1]');
+---------------------------------------------------+
| JSON_REMOVE(@j, '$[2]', '$[1].b[1]', '$[1].b[1]') |
+---------------------------------------------------+
| ["a", {"b": [true]}]                              |
+---------------------------------------------------+
```
Trên là một số kiến thức cơ bản về dạng dữ liệu JSON trong MYSQL mình thấy cần thiết nhất, hy vọng sẽ có ích với các bạn!!.
## Tài liệu Tham Khảo
https://dev.mysql.com/doc/refman/8.0/en/json.html