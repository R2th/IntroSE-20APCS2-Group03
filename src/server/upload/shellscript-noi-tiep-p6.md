###### Chúng ta tiếp tục cùng tìm hiểu những phần tiếp theo của shell script nhé !
##### :small_red_triangle_down: Hàm (Function)<br>
**1. Basic**
- Tạo một function khá đơn giản. Ta có thể được viết bằng hai định dạng khác nhau:
```bash
function_name () {
  <commands>
}

#or

function function_name {
  <commands>
}
```

:black_small_square: Lưu ý:
- Cả hai hoạt động như nhau và không có cái nào nhanh hơn cái nào cả.
- Trong các ngôn ngữ lập trình khác, thông thường có các đối số được truyền cho hàm được liệt kê bên trong ngoặc `()`. Còn trong Bash, thì ta sẽ viết mà không truyền bất cứ thứ gì vào trong ngoặc.
- Định nghĩa hàm phải xuất hiện trong tập lệnh trước khi có bất kỳ lệnh nào gọi đến hàm.
- Ví dụ:
```bash
#!/bin/bash

example () { #line 3
  echo Hello World #line 4
}
example #line 6
example #line 7
```
- Dòng 3: Ta bắt đầu định nghĩa hàm bằng cách đặt tên cho nó.
- Dòng 4: Trong dấu ngoặc nhọn, ta có thể viết nhiều lệnh chúng ta muốn.
- Dòng 6, 7:  Khi hàm đã được xác định, chúng ta có thể gọi nó bao nhiêu lần tùy thích và nó sẽ thực thi các lệnh đó.
<hr>

**2. Truyền tham số (Passing Argument)**
- Ta thường truyền tham số khi ta muốn xử lý một số dữ liệu từ bên ngoài vào, ta sẽ truyền các tham số ngay sau tên hàm. Ví dụ như:
```bash
#!/bin/bash

example () {
  echo Hello, My name is $1
}
example Nam
example Nu
```
- Kết quả trả về:
```
➜  ~ ./arguments.sh                                                                    
Hello, My name is Nam
Hello, My name is Nu
```
<hr>

**3. Trả về giá trị (Return value)**
- Như ta đã biết, hầu hết các ngôn ngữ lập trình đều có  thể trả về giá trị cho các hàm, việc này được coi như là phương tiện để các hàm gửi dữ liệu trở lại nơi chúng được gọi. Nhưng các hàm `shell` không cho phép ta làm điều đó. Tuy nhiên, nó cho phép ta return trạng thái trả về. Giống như làm cho một chương trình hay một câu lệnh dừng lại đã thành công hay chưa. Ở đây, ta sử dụng `return` để chỉ trạng thái trả về. Ví dụ:
```bash
#!/bin/bash

example () {
  echo Hello, My name is $1
  return 3 #line 5
}
example Nam
example Nu
echo This function has a return value of $? #line 10
```
- Dòng 5: Ở đây, là trạng thái trả về của một hàm.
- Dòng 10: Biến $? Chứa trạng thái trả về của lệnh hoặc hàm đã chạy trước đó.
- Lưu ý: Thông thường, trạng thái trả về 0 cho biết mọi thứ đã thành công. Giá trị khác 0 cho thấy đã xảy ra lỗi.
- Kết quả:
```bash
➜  ~ ./example.sh
Hello, My name is Nam
Hello, My name is Nu
This function has a return value of 3
```
<hr>

Ngoài ra, ta sẽ bổ sung thêm một chút về phạm vi biến và cách ghi đè lệnh 
##### :small_red_triangle_down: Phạm vi của biến (Variable Scope)<br>
- Mặc định thì phạm vi của một biến là `global`. Điều đó có nghĩa là nó có thể sử dụng ở mọi nơi trong script.
- Nếu ta tạo một biến `local` trong một hàm thì nó chỉ có tác dụng trong hàm đó. Cú pháp sẽ như sau:
```bash
local variable_name=<variable_value>
```
- Ví dụ:
```bash
#!/bin/bash

var_example () {
local variable1='local 1'
  echo Inside function: variable1 is $variable1 : variable2 is $variable2
  variable1='variable1 changed again'
  variable2='variable2 changed again'
}
variable1='global 1'
variable2='global 2'

echo Before function call: variable1 is $variable1 : variable2 is $variable2
var_example
echo After function call: variable1 is $variable1 : variable2 is $variable2
```
- Kết quả:
```bash
➜  ~ ./var_example.sh
Before function call: variable1 is global 1 : variable2 is global 2
Inside function: variable1 is local 1 : variable2 is global 2
After function call: variable1 is global 1 : variable2 is variable2 changed again
```
##### :small_red_triangle_down: Ghi đè lệnh (Overriding Command)<br>
- Có thể đặt tên một hàm cùng tên với một lệnh mà ta thường sử dụng. Ví dụ:
```bash
#!/bin/bash

ls () {
  command ls -1 #Hiện thị tên file/thư mục trong thư mục đang gọi
}
ls
```
- Kết quả trả về:
```
➜  ~ ./overriding.sh
build
Desktop
Documents
Downloads
examples.desktop
example.sh
```
<hr>

##### Cảm ơn các bạn đã đọc bài viết của mình nhé!