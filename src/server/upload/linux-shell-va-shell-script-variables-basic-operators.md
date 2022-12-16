- Xin chào các bạn, trong phần trước chúng ta đã tìm hiểu tổng quan về Shell và Shell Script, nếu bạn chưa đọc có thể xem [tại đây](https://viblo.asia/p/gioi-thieu-ve-linux-shell-va-shell-script-aWj53LweK6m)
- Và trong bài viết này chúng ta sẽ cùng đi sâu hơn về nó. Cụ thể về cái gì? Chúng ta bắt đầu nhé!
# Variables
- Trong Linux (Shell), có 2 loại `variable`:
    - Biến hệ thống: Được tạo và duy trì bởi chính Linux. Thường được viết theo định dạng UPPERCASE.
    - Biến do người dùng định nghĩa (UDV): Được tạo và duy trì bởi người dùng. Thường được viết theo định dạng lowercase.
- Bạn có thể xem các biến hệ thống bằng cách bật `terminal` lên và gõ lệnh `set`:
![](https://images.viblo.asia/2c6fa75c-0a2a-4c5c-9c95-121ac792119e.png)
> Lưu ý: Không nên thay đổi System variable, nó có thể gây ra lỗi hệ thống.

- Định nghĩa variables: `variable_name=variable_value`
    - `variable_name`: Phải bắt đầu bằng ký tự chữ và số hoặc dấu gạch dưới. Ví dụ: HOME, user_name...
    - Không đặt dấu cách ở hai bên của dấu bằng khi gán giá trị cho biến. Ví dụ: `$no =1`, `$no= 1`, `$no = 1`.
    - Các biến có phân biệt chữ hoa, chữ thường, giống như filename trong Linux.
    - Có thể định nghĩa biến NULL như sau: `$no=` `$no=""`
    - Không sử dụng các ký tự `! * - @ $ ...` để đặt tên biến vì chúng có có ý nghĩa đặc biệt với Shell (*).
- Để xem giá trị của biến ta sử dụng lệnh: `echo $VARIABLE_NAME`
![](https://images.viblo.asia/c610999f-9b23-450d-a98d-911e50d6a490.png)
- Biến chỉ đọc: giá trị của nó không thể thay đổi - Cú pháp `readonly variable_name`
![](https://images.viblo.asia/edfb58bd-d8e4-4076-9d70-9e2807076bfd.png)
- Hủy một biến - Cú pháp `unset variable_name`
![](https://images.viblo.asia/096221aa-4593-4e6c-8fd5-8bce72d7f951.png)

## Special variables (*)
- Như đã đề cập ở trên, chúng ta không thể sử dụng các ký tự đặc biệt như `! @ $ ...` để đặt tên cho biến. Điều này là do các ký tự đó được sử dụng trong các biến đặc biệt của Linux. Các biến này được dành riêng cho các chức năng cụ thể:

|  No |  Variable & Description |
| -------- | -------- |
| 1     | **$0** - Tên tệp của lệnh/tập lệnh hiện tại    |
| 2     | **$n** -  Các biến này tương ứng với các đối số truyền vào, **n** là số nguyên dương. Ví dụ: **./test.sh a b** thì đối số $1, $2 lần lượt là a và b   |
| 3     | **$#** - Số lượng đối số truyền vào. Vd: **./test.sh a b** sẽ có 2 đối số|
| 4     | **$?** - Trạng thái thoát ra của lệnh trước được chạy (thường là 0 đại diện cho lệnh trước chạy thành công, khác 0 là failed) Max range [0 – 255]|
| 5     | **$$** - Số tiến trình của shell hiện tại. Đối với Shell Script thì đây là số processID mà nó đang chạy|
| 6     | **$!** - Process number của lệnh background cuối cùng|
| 7     | **$*** - Chứa tất cả các đối số truyền vào. Nếu có 3 đối số truyền vào thì giá trị sẽ là $1 $2 $3 khi sử dụng|
| 8     | **$@** - Chứa tất cả các đối số truyền vào nhưng phân tách thành các đối số riêng lẻ không như $*|

- Xét ví dụ sau. Tạo một file có tên tùy ý, ở đây mình đặt là **test.sh** có nội dung như sau:

![](https://images.viblo.asia/4e6c2cd6-8626-43b2-95c8-adaf227f8868.png)
- Run file này lên rồi quan sát kết quả (nhớ cấp quyền cho file này nhé): **./test.sh Hello World**
![](https://images.viblo.asia/003403af-c889-4163-a435-eda6c837c417.png)

- Các bạn có thấy variable `$*` và `$@` giống nhau không. Về cơ bản thì 2 biến này hoạt động giống nhau, trừ khi chúng được đặt trong dấu **""**. Khi đặt vào dấu ngoặc kép ("") thì:
    - $* : Các đối số đưa vào sẽ được nối thành một chuỗi và được phân cách nhau bởi dấu cách.
    - $@: Các đối số đưa vào sẽ được phân biệt một cách riêng lẻ.
- Xem xét ví dụ sau:
![](https://images.viblo.asia/8fe1a601-c2c6-4845-bc56-6b9e070ef2b7.png)
- Kết quả khi chạy **./test.sh Hello World**:
![](https://images.viblo.asia/3777d2d3-8b99-4dbc-91b2-a0da3744a784.png)

# Basic Operators
- Về cơ bản Shell Linux sử dụng các toán tử cơ bản như các ngôn ngữ lập trình khác như C/C++, Java...
    - Arithmetic Operators
    - Relational Operators
    - Boolean Operators
    - String Operators
    - File Test Operators

### a. Arithmetic Operators (Toán tử số học)
- Ban đầu Shell không có bất kỳ cơ chế nào để thực hiện các phép toán số học, nhưng nó sử đã sử dụng các trương trình bên ngoài như **awk** hoặc **expr** để thực thi.
- Ví dụ sau cho thấy cú pháp cộng 2 số (tạo một file với tên `test.sh` với nội dung sau):

![](https://images.viblo.asia/ec8347bf-18ec-4593-9ef1-2b713104227c.png)

- Chạy lệnh **./test.sh** ta sẽ có kết quả là: **5**
- Những điều sau cần phải chú ý trong phép toán trên:
    - Giữa các toán tử và biểu thức phải có **khoảng trắng**. Ví dụ, **2+2** là không đúng, nên được viết là **2 + 2**.
    - Biểu thức hoàn chỉnh phải được đặt trong dấu ``<biểu thức>`` , được gọi là **backtick**.
- Các toán tử số học được Shell hỗ trợ. Giả sử biến a = 10, biến b = 20:


|  Toán tử | Mô tả | Ví dụ |
| -------- | -------- | -------- |
| +      | Phép cộng     | `expr $a + $b` Kết quả: 30  |
| -       | Phép trừ        | `expr $a - $b` Kết quả: -10 |
| *      | Phép nhân    | `expr $a \* $b` Kết quả: 200 |
| /      | Phép chia    | `expr $b \* $a` Kết quả: 2 |
| %      | Phép chia lấy phần dư   | `expr $b \* $a` Kết quả: 0 |
| =      | Phép gán   | `a = $b` : Gán giá trị của b cho a |
| ==      | Phép so sánh bằng (true, false)   | `[ $a == $b ]` Kết quả: false |
| !=      | Phép so sánh khác (true, false)   | `[ $a == $b ]` Kết quả: true |

- Một điều quan trọng cần lưu ý đó là các biểu thức điều kiện phải nằm trong dấu [] có khoảng trắng xung quanh. Ví dụ **[ $a == $b ]** là đúng, còn **[$a==$b]** là sai.
- Tất cả các phép toán số học được thực hiện bằng cách sử dụng long interger.

### b. Relational Operator (Toán tử quan hệ)
- Shell hỗ trợ các toán tử quan hệ sau đây **dành riêng cho các giá trị số**. Các toán tử này **không hoạt động cho các giá trị chuỗi** trừ khi giá trị của chúng là số.
- Giả sử $a=10 và $b=20:

| Toán tử | Mô tả | Ví dụ |
| -------- | -------- | -------- |
| **-eq**  (Equal)   |   Kiểm tra giá trị của 2 toán hạng có **bằng nhau** không   | `[ $a -eq $b ]` Kết quả: false    |
| **-ne**  (Not Equal)   |   Kiểm tra giá trị của 2 toán hạng có **khác nhau** không   | `[ $a -ne $b ]` Kết quả: true    |
| **-gt**  (Greater than)   |   Kiểm tra giá trị của toán hạng trái có **lớn hơn** giá trị toán hạng phải không   | `[ $a -gt $b ]` Kết quả: false    |
| **-lt**  (Less than)   |   Kiểm tra giá trị của toán hạng trái có **nhỏ hơn** giá trị toán hạng phải không   | `[ $a -lt $b ]` Kết quả: true    |
| **-ge**  (Greater or Equal)   |   Kiểm tra giá trị của toán hạng trái có **lớn hơn hoặc bằng** giá trị toán hạng phải không   | `[ $a -ge $b ]` Kết quả: false    |
| **-le**  (Less or Equal)   |   Kiểm tra giá trị của toán hạng trái có **nhỏ hơn hoặc bằng** giá trị toán hạng phải không   | `[ $a -le $b ]` Kết quả: true    |

### c. Boolean Operators (Toán tử boolean)
- Các toán tử Boolean sau đây được Shell hỗ trợ. Giả sử $a=10, $b=20.

| Toán tử | Mô tả | Ví dụ |
| -------- | -------- | -------- |
| **!**     |  Phủ định logic    | [ ! false ] Kết quả: true    |
| **-o**     |  Phép **OR** - Nếu một trong các toán hạng là đúng thì biểu thức đúng   | [ $a -lt 20 -o $b -gt 100 ] Kết quả: true    |
| **-a**     |  Phép **AND**  -  Nếu tất cả các toán hạng đúng thì biểu thức đúng | [ $a -lt 20 -a $b -gt 100 ] Kết quả:false    |

### d. String Operators
- Giả sử $a="abc", $b="efg":

| Toán tử | Mô tả | Ví dụ |
| -------- | -------- | -------- |
| **=**    |  Kiểm tra xem giá trị của 2 toán hạng có **bằng nhau** không    | [ $a = $b ] Kết quả: false     |
| **!=**    |  Kiểm tra xem giá trị của 2 toán hạng có **khác nhau** không    | [ $a != $b ] Kết quả: true     |
| **-z**    |  Kiểm tra độ dài toán hạng có **bằng** 0 không   | [ -z $a ] Kết quả: false     |
| **-n**    |  Kiểm tra độ dài toán hạng có **khác** 0 không    | [ -n $a ] Kết quả: true     |
| **str**    |  Kiểm tra chuỗi str có khác empty hay không    | [ $a ] Kết quả: true     |

### e. File Test Operators (Toán tử kiểm tra file)
- Giả sử biến $file trỏ đến một file có tên là "test", kích thước của file đó là 100 byte và có quyền **read, write, execute**.

| Toán tử | Mô tả | Ví dụ |
| -------- | -------- | -------- |
| **-b file**     | Kiểm tra file có là [block special file](https://www.computerhope.com/jargon/s/special-file.htm)     | [ -b $file ] Kết quả: false    |
| **-c file**     | Kiểm tra file có là [character special file](https://www.computerhope.com/jargon/s/special-file.htm)     | [ -c $file ] Kết quả: false     |
| **-d file**     | Kiểm tra file có phải là thư mục     | [ -d $file ] Kết quả: false     |
| **-f file**     | Kiểm tra file có là file thông thường, không phải thư mục hoặc special file     | [ -f $file ] Kết quả: true     |
| **-g file**     | Kiểm tra file có cài đặt nhóm bit ID ([SGID](https://news.cloud365.vn/linux_basic-sticky-bit-suid-sgid/)) không     | [ -g $file ] Kết quả: false     |
| **-k file**     | Kiểm tra file có cài đặt [sticky bit](https://news.cloud365.vn/linux_basic-sticky-bit-suid-sgid/) không     | [ -k $file ] Kết quả: false     |
| **-p file**     | Kiểm tra file là một named pipe không     | [ -p $file ] Kết quả: false     |
| **-t file**     | Kiểm tra mô tả file có mở và liên kết với terminal     | [ -t $file ] Kết quả: false     |
| **-u file**     | Kiểm tra file có cài đặt Set User ID ([SUID](https://news.cloud365.vn/linux_basic-sticky-bit-suid-sgid/)) không   | [ -u $file ] Kết quả: false     |
| **-r file**     | Kiểm tra file có thể đọc không     | [ -r $file ] Kết quả: true     |
| **-w file**     | Kiểm tra file có thể ghi không     | [ -w $file ] Kết quả: true     |
| **-x file**     | Kiểm tra file có thể executable không     | [ -x $file ] Kết quả: true     |
| **-s file**     | Kiểm tra kích thước file có lớn hơn 0 không     | [ -s $file ] Kết quả: true     |
| **-e file**     | Kiểm tra file có tồn tại không. Đúng ngay cả khi file thư mục     | [ -e $file ] Kết quả: true     |

# Tổng kết
- Ok, Bài này chúng ta tìm hiểu đến đây thôi, các bạn cố gắng làm nhiều để ghi nhớ nhé. Bài tiếp theo chúng ta sẽ tìm hiểu về Array, Loop, Function... Hãy theo dõi nhé.
- Cảm ơn các bạn đã đọc!
- [Shell Programming - If...else, Array, Loops, Function](https://viblo.asia/p/shell-programming-ifelse-array-loops-function-1Je5EPyjlnL)