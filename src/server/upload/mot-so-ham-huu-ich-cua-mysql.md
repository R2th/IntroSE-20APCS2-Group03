## Giới thiệu
Với anh em developer chúng ta, có rất nhiều cách để chúng ta có thể thao tác và xử lý với database, query để lấy được dữ liệu cần thiết rồi xử lý tiếp bằng ngôn ngữ lập trình, sử dụng các function mà thư viện backend chúng ta đang làm hỗ trợ,.... Nhưng có thể bạn chưa biết là MySQL cũng đã cung cấp cho chúng ta một số functión rất hữu ích để giúp chúng ta xử lý dữ liệu dễ dàng hơn, hãy cùng điểm qua một số những functions hay ho sau đây nhé.

### FIND_IN_SET

Trả về vị trí của chuỗi trong danh sách chuỗi được phân tách bằng dấu phẩy.

**Cú pháp**

`FIND_IN_SET( string, string_list )`

**string**: Chuỗi cần tìm.

**string_lis**t: Danh sách các giá trị chuỗi được phân tách bằng dấu phẩy cần tìm kiếm.

*Ví dụ:*
```
mysql> SELECT FIND_IN_SET('d', 'a,b,c,d,e,f');
Ket qua: 4
 
mysql> SELECT FIND_IN_SET('B', 'a,b,c,d,e,f');
Ket qua: 2
 
mysql> SELECT FIND_IN_SET('h', 'a,b,c,d,e,f,g,h');
Ket qua: 8
```

### TRIM

Hàm **TRIM** loại bỏ tất cả các ký tự được chỉ định từ đầu hoặc cuối chuỗi.

**Cú pháp**

`TRIM( [ leading | trailing | both ] [ trim_character FROM ] string )`

**leading**: Không bắt buộc. Loại bỏ trim_character từ phía trước của chuỗi.

**trailing**: Không bắt buộc. Loại bỏ trim_character khỏi cuối chuỗi.

**both**: Không bắt buộc. Các ký tự sẽ được loại bỏ khỏi chuỗi. Nếu tham số này bị bỏ qua, nó sẽ xóa các ký tự khoảng trắng khỏi chuỗi.

**string**: Các chuỗi để cắt.

**Lưu ý**:

- Nếu bạn không chỉ định giá trị cho tham số đầu tiên (LEADING, TRAILING, BOTH), hàm TRIM sẽ mặc định là BOTH và loại bỏ trim_character khỏi cả mặt trước và cuối chuỗi.

- Nếu bạn không chỉ định trim_character, hàm TRIM sẽ mặc định ký tự sẽ bị xóa dưới dạng ký tự khoảng trắng.

*Ví dụ:*

`SELECT TRIM(LEADING ' ' FROM '      viblo.asia      ');`

Ket qua: 'viblo.asia      '

`SELECT TRIM(TRAILING ' ' FROM '      viblo.asia      ');`

Ket qua: '      viblo.asia'
 
`SELECT TRIM(BOTH ' ' FROM '      viblo.asia     ');`

Ket qua: 'viblo.asia'
 
`SELECT TRIM(' ' FROM '      viblo.asia     ');`

Ket qua: 'viblo.asia'

### COALESCE
Hàm COALEScE sẽ trả về giá trị khác NULL đầu tiên trong một danh sách

Cú pháp:
  
`COALESCE( expression1, expression2, ... expression_n )`
  
*  Ví dụ: *
  
`SELECT COALESCE(null, null, null, 'A', 'B');

Kết quả: 'A'
  
`SELECT COALESCE('A', 'B', null, 'C', 'D');`

Kết quả: 'A'

`SELECT COALESCE(null, 1, 2, 3, null, 4);`

Kết quả: 1

### FIELD

`Hàm FIELD trả về vị trí của một giá trị trong một list các giá trị khác.`

*Cú pháp:*

`FIELD( value, val1, val2, val3, ... )`

Trong đó value là giá trị cần xác định vị trí. Val1.... là danh sách giá trị được tìm kiếm.

*Ví dụ:*

`SELECT FIELD('B', 'a', 'b', 'c', 'd', 'e', 'f');`

Kết quả: 2

`SELECT FIELD(15, 10, 20, 15, 40);`

Result: 3

`SELECT FIELD('c', 'a', 'b');`

Kết quả: 0

### STRCMP

Hàm STRCMP kiểm tra xem 2 chuỗi có giống nhau hay không

*Cú pháp:*

`STRCMP(string1, string2)`

**Chú ý:**
+ Nếu string1 giống với string2 hàm này sẽ trả về kết quả = 0
 + Nếu string1 nhỏ hơn string2 hàm trả về kết quả = -1

Ví dụ:

`SELECT STRCMP('welcome', 'welcome');`

Kết quả: 0

`SELECT STRCMP('welcome', 'hello world');`

Kết quả: -1

`SELECT STRCMP('some thing', 'com');`

Kết quả: 1

###  REPEAT
Hàm REPEAT lặp lại một chuỗi số lần xác định.

**Cú pháp:**

`REPEAT(string, number)`

*string*: chuỗi để lặp lại

*number*: số lần lặp lại chuỗi

**Lưu ý**: Nếu number nhỏ hơn 1, hàm REPEAT sẽ trả về một chuỗi trống.

Ví dụ:

`SELECT REPEAT('VIBLO', 3);`

Ket qua: 'VIBLOVIBLOVIBLO'
 
`SELECT REPEAT(' ', 5);`

Ket qua: '     '
 
`SELECT REPEAT('viblo.asia', 0);`

Ket qua: ''

## Lời kết

Đây là một số function mà mình nghĩ nó sẽ hữu ích (trong 1 đống các function có sẵn của MySQL). Hy vọng là nó cũng giúp ích cho mọi người.