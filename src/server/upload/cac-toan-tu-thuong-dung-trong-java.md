*  Nhằm giúp các bạn dễ hiểu và không bị rối thì ở bài viết này mình sẽ chỉ giới thiệu cho các bạn một số toán tử thường dùng và phổ biến.

### 1. Toán tử số học
* Các toán tử số học được sử dụng trong các biểu thức toán học theo cách tương tự như chúng được sử dụng trong đại số học.

| Toán tử | Tên | Mô tả |
| -------- | -------- | -------- |
| + | Cộng | Là tổng của hai toán hạng |
| - | Trừ | Là hiệu của hai toán hạng. |
| * | Nhân | Là tích của hai toán hạng. |
| / | Chia | Là thương của phép chia. |
| % | Phép chia lấy dư | Giá trị trả về là phần dư của phép chia |
| ++ | Tăng dần | Tăng giá trị của biến lên 1. `a++ <=> a = a + 1` |
| -- | Giảm dần | Giảm giá trị của biến 1 đơn vị. `a-- <=> a = a - 1` |
| += | Cộng và gán giá trị | Cộng các giá trị của toán hạng bên trái vào toán hạng bên phải và gán giá trị trả về vào toán hạng bên trái. `c+=a <=> c = c + a` |
| -= | Trừ và gán giá trị | Trừ các giá trị của toán hạng bên trái vào toán toán hạng bên phải và gán giá trị trả về vào toán hạng bên trái. `c-=a <=>  c = c - a` |
| *= | Nhân và gán | Nhân các giá trị của toán hạng bên trái với toán toán hạng bên phải và gán giá trị trả về vào toán hạng bên trái. `c*=a <=> c = c*a` |
| /= | Chia và gán | Chia giá trị của toán hạng bên trái cho toán toán hạng bên phải và gán giá trị trả về vào toán hạng bên trái. `c/=a <=> c = c/a` |
| %= | Lấy số dư và gán | Chia giá trị của toán hạng bên trái cho toán toán hạng bên phải và gán giá trị số dư vào toán hạng bên trái. `c%=a <=> c = c%a` |

### 2. Toán tử quan hệ
* Các toán tử quan hệ được sử dụng kiểm tra mối quan hệ giữa hai toán hạng.

| Toán tử | Tên | Mô tả |
| -------- | -------- | -------- |
| == | So sánh bằng | Toán tử này kiểm tra sự tương đương của hai toán hạng |
| != | So sánh khác | Toán tử này kiểm tra sự khác nhau của hai toán hạng |
| > | Lớn hơn | Kiểm tra giá trị của toán hạng bên phải lớn hơn toán hạng bên trái hay không |
| < | Nhỏ hơn | Kiểm tra giá trị của toán hạng bên phải có nhỏ hơn toán hạng bên trái hay không |
| >= | Lớn hơn hoặc bằng | Kiểm tra giá trị của toán hạng bên phải có lớn hơn hoặc bằng toán hạng bên trái hay không |
| <= | Nhỏ hơn hoặc bằng | Kiểm tra giá trị của toán hạng bên phải có nhỏ hơn hoặc bằng toán hạng bên trái hay không |

### 3. Toán tử logic trong Java
* Các toán tử logic làm việc với các toán hạng Boolean. Các toán tử quan hệ được sử dụng trong các cấu trúc điều khiển.

| Toán tử | Tên | Mô tả |
| -------- | -------- | -------- |
| && | Toán tử và (AND) | Trả về một giá trị “Đúng” (True) nếu chỉ khi cả hai toán tử có giá trị “True” |
| || | Toán tử hoặc (OR) | Trả về giá trị “True” nếu ít nhất một giá trị là True |
| ^ | Toán tử XOR | Trả về giá trị True nếu và chỉ nếu chỉ một trong các giá trị là True, các trường hợp còn lại cho giá trị False (sai) |
| ! | Toán tử phủ định (NOT) | Toán hạng đơn tử NOT. Chuyển giá trị từ True sang False và ngược lại. |

### 4. Thứ tự ưu tiên của các toán tử
* Thứ tự ưu tiên quyết định trật tự thực hiện các toán tử trên các biểu thức.

| Thứ tự | Mô tả |
| -------- | -------- |
| 1	| Các toán tử đơn như +,-,++,--	|
| 2	| Các toán tử số học và các toán tử dịch như *,/,+,-,<<,>>	|
| 3	| Các toán tử quan hệ như >,<,>=,<=,= =,!=	|
| 4	| Các toán tử logic và Bit như &&,||,&,|,^	|
| 5	| Các toán tử gán như =,*=,/=,+=,-=	|

### 5. Thay đổi thứ tự ưu tiên của các toán tử
* Để thay đổi thứ tự ưu tiên trên một biểu thức, bạn có thể sử dụng dấu ngoặc đơn ():
    * Phần trong ngoặc đơn được thực hiện trước.
    * Nếu dùng nhiều ngoặc đơn lồng nhau thì toán tử nằm trong ngoặc đơn phía trong sẽ thực thi trước, sau đó đến các vòng phía ngoài.
    * Trong phạm vi một cặp ngoặc đơn thì quy tắc thứ tự ưu tiên vẫn giữ nguyên tác dụng.