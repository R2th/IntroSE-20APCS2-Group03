# Giới thiệu
Shell cung cấp một giao diện với Unix. Nó tổng hợp các input nhập vào khi gõ lệnh và thực hiện các chương trình dựa trên input đó. Khi một chương trình thực hiện xong, nó sẽ hiển thị output theo như đã mô tả.

Shell là môi trường trong đó chúng ta có thể chạy commands, programs, shell scripts.

### Dấu nhắc
Trong Unix có 2 loại shell chính là Bourne shell và C shell. Với Bourne shell, dấu nhắc "$" để biểu thị bắt đầu 1 lệnh, tên lệnh liền ngay sau là 1 từ chứ không có khoảng trống; còn với C shell dấu nhắc là "%". ( Ở đây sẽ đề cập đến Bourne shell thôi !)

### Script
Bourne shell thì thường mặc định sẽ cài trong /bin/sh với mọi version Unix, vì thế mà nó có thể thực thi các csript trên nhiều version của Unix.

Để hệ thống hiểu được rằng script file sẽ được chạy bởi Shell, dòng đầu tiên sẽ có dạng  " !# /bin/sh " hoặc " !# /bin/bash "

### Comments
Dòng bắt đầu bởi "# " sẽ được hiểu là đang đánh dấu comment. Ví dụ :
```
# Phải cách dấu thăng này ra nhé, viết liền hôk hỉu đâu
```

# Biến trong sh, bash
### Đặt tên
Tên biến chỉ được cấu thành từ chữ cái, chữ số (không dùng để bắt đầu) và dấu gạch dưới "".
Các kí tự khác, đặc biệt là  " ! " hay " * " hay  "  - " đều không được chấp nhận, lí do là nó đã được sử dụng cho các cú pháp cơ bản sẵn có của shell.

Thêm 1 điều nữa là tên biến được quy ước sẽ được viết hoa.

Ví dụ tên hợp lệ: 
```
_GINTOKI
SHIMURA_SHINPACHI
KAGURA_1
```

Không hợp lệ :
```
2_SACHAN
-KONDO
HIJIKATA-TOSHIO
OKITA!
```
### Khai báo và gán giá trị
Cách thức vô cùng bình thường, hệt như những gì bạn đã biết khi chưa đọc bài này !
```
variable_name=variable_v
```
Viết liền nhé, quen tay tách dấu "=" ra là không ổn đâu :v: 

variable_v nhận các kiểu dữ liệu cơ bản như string, int.

### Truy cập giá trị biến
Sử dụng tiền tố "$" đằng trước tên biến để truy cập giá trị đã lưu vào biến:
```
#!/bin/sh

NAME="KASTURA KOTARO"
echo $NAME
```
Outpu => KASTURA KOTARO
### Biến Read-only
Sau khi biến đã có giá trị được lưu thì chỉ cần thêm "readonly" phía trước. Khi đó giá trị của biến là bất biến xuyên suốt quá trình thực thi.
```
readonly NAME
```
### Loại bỏ biến
Dùng từ khóa unset và bạn sẽ không còn truy cập được giá trị đã lưu cho biến trước đó nữa.
```
unset Name
```

## Các biến đặc biệt


|  Biến| Mô tả |
| -------- | -------- |
| $0     | Tên chính script file đang chạy    |
| $n     | Giá trị truyền vào ở vị trí thứ n khi gõ lệnh chạy shell trên terminal chẳng hạn     |
| $#     | Số lượng các argument truyền vào khi gõ lệnh chạy shell     |
| $*     | Chứa tất cả tham số được đưa vào script, nó được xem như 1 chuỗi chứa tất cả     |
| $@     | Chứa tất cả tham số nhưng phân biệt thành những tham số riêng lẻ     |
| $?     | Trạng thái thoát ra của lệnh ngay trước đó được chạy     |
| $$     | Số tiến trình của shell hiện tại. Đối với Shell script đây là số ProcessID mà chúng đang chạy     |
| $!     | 	Số tiến trình của lệnh background trước     |


Ví dụ: 

file learn.sh như sau:
```
#!/bin/sh

echo "File Name: $0"
echo "First Parameter : $1"
echo "Second Parameter : $2"
echo "Quoted Values: $@"
echo "Quoted Values: $*"
echo "Total Number of Parameters : $#"
```
Khi chạy lệnh  
```
$./learn.sh Yoshida Shoyo
```
Output => 
```
File Name : ./test.sh
First Parameter : Yoshida
Second Parameter : Shoyo
Quoted Values: Yoshida Shoyo
Quoted Values: Yoshida Shoyo
Total Number of Parameters : 2
```