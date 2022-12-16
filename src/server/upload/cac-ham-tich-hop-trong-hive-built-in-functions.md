Đây đã là bài thứ 9 trong series về Hive rồi ^^ 
# 1. Built-in Functions
Hive hỗ trợ các hàm có tích hợp sẵn sau đây:


| Kiểu trả về | Cú pháp | Mô tả |
| -------- | -------- | -------- |
| BIGINT    | round(double a)	     | Trả về giá trị làm tròn BIGINT của double     |
| BIGINT    | floor(double a)	     | Trả về giá trị lớn nhất BIGINT bằng hoặc bé hơn double     |
| BIGINT    | ceil(double a)	     | Trả về giá trị bé nhất BIGINT bằng hoặc lớn hơn double     |
| double    | rand(), rand(int seed)	     | Trả về giá trị ngẫu nhiên thay đổi từ hàng này sang hàng khác      |
| string    | concat(string A, string B,...)	     | Trả về kết quả nối chuỗi các string, B sau A     |
| string    | substr(string A, int start)	     | Trả về chuỗi con của A bắt đầu từ vị trí bắt đầu cho đến hết chuỗi A.     |
| string    | substr(string A, int start, int length)	     | Trả về chuỗi con của A bắt đầu từ vị trí bắt đầu có độ dài length     |
| string    | upper(string A)	     | Trả về chuỗi kết quả từ việc chuyển đổi tất cả các ký tự của A thành chữ hoa |
| string    | ucase(string A)	     | Tương tự như trên     |
| string    | lower(string A)	     | Trả về chuỗi kết quả từ việc chuyển đổi tất cả các ký tự của A thành chữ thường     |
| string    | lcase(string A)	     | Tương tự như trên     |
| string    | trim(string A)	     |  Trả về chuỗi kết quả từ việc cắt kí tự space từ cả hai đầu của A.    |
| string    | ltrim(string A)	     |  Trả về chuỗi kết quả từ việc cắt kí tự space từ đầu bên tay trái của A    |
| string    | rtrim(string A)	     | Trả về chuỗi kết quả từ việc cắt kí tự space từ đầu bên tay phải của A     |
| string    | regexp_replace(string A, string B, string C)	     |  Nó trả về chuỗi kết quả từ việc thay thế tất cả các chuỗi con trong B khớp với cú pháp biểu thức chính quy Java bằng C.    |
| int    | size(Map<K.V>)	     | Trả về số lượng elements trong kiểu map     |
| int    | size(Array<T>)	     | Trả về số lượng elements trong kiểu mảng    |
| giá trị của    | cast(<expr> as <type>)	     | Nó chuyển đổi kết quả của biểu thức expr thành <type> ví dụ:  cast ('1' dưới dạng BIGINT) chuyển đổi chuỗi '1' thành biểu diễn tích phân.  Một NULL được trả về nếu chuyển đổi không thành công.     |
| string    | from_unixtime(int unixtime)	     | Chuyển đổi số giây trong Unix time (mốc 1970-01-01 00:00:00 UTC) sang một chuỗi đại diện cho thời gian hiện tại của timezone hiện tại với dạng "1970-01-01 00:00:00"     |
| string    | to_date(string timestamp)	     | Trả về phần ngày tháng năm  của chuỗi: to_date("1970-01-01 00:00:00") = "1970-01-01"      |
| int    | year(string date)	     | Trả về phần năm của date: year("1970-01-01 00:00:00") = 1970, year("1970-01-01") = 1970    |
| int    | month(string date)	     | Trả về phần tháng của date: month("1970-11-01 00:00:00") = 11, month("1970-11-01") = 11      |
| int    | day(string date)	     | Trả về phần ngày của date: day("1970-11-01 00:00:00") = 1, day("1970-11-01") = 1     |
| string    | get_json_object(string json_string, string path)	     | Trích xuất đối tượng json từ chuỗi json dựa trên đường dẫn json được chỉ định và trả về chuỗi json của đối tượng json được trích xuất.  Nó trả về NULL nếu chuỗi json đầu vào không hợp lệ.     |

### Ví dụ 
Câu truy vấn sau đây minh họa một vài hàm tích hợp có sắn:

**round()**
```
hive> SELECT round(2.6) from temp;
```
Khi câu truy vấn được thực thi thành công, bạn sẽ thấy response sau:
```
3.0
```

**floor()**
```
hive> SELECT floor(2.6) from temp;
```
Khi câu truy vấn được thực thi thành công, bạn sẽ nhận được response sau:
```
2.0
```
    
**ceil()**
    
```
hive> SELECT ceil(2.6) from temp;
```

Khi thực thi thành công câu truy vấn, bạn sẽ thấy response sau:
```
3.0
```

# 2. Aggregate Functions
Hive hỗ trợ các hàm aggregate có sẵn sau. Việc sử dụng các hàm này cũng tương tự như các làm aggregate trong SQL 


| Kiểu trả về | Cú pháp | Mô tả |
| -------- | -------- | -------- |
| BiGINT     | count(*), count(expr),	     | count(*) - Trả về tổng số cột được lấy     |
| DOUBLE     | sum(col), sum(DISTINCT col)	     | Trả về tổng của các thành phần trong group hoặc tổng của các giá trị riêng biệt trong cột của group    |
| DOUBLE     | avg(col), avg(DISTINCT col)	     | Trả về giá trị trung bình của elements trong group hoặc trung bình của giá trị riêng biệt của cột trong group     |
| DOUBLE     | min(col)	     | Trả về giá trị bé nhất của cột trong group    |
| DOUBLE     | max(col)	     | Trả về giá trị cao nhất của cột trong group     |