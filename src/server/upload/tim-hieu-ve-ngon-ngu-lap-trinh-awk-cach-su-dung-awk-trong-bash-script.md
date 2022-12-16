# 1. Tổng quan
* Trước hết, bạn cần biết AWK là một ngôn ngữ lập trình. Nó có thể xử lý các tác vụ liên quan đến text phức tạp chỉ với một vài dòng code @@.
* AWK là một ngôn ngữ lập trình thông dịch. Nó được thiết kế **đặc biệt và mạnh mẽ cho việc xử lý text**. Tên của nó được lấy từ chữ cái đầu của 3 tác giả **Alfred Aho, Peter Weinberger, and Brian Kernighan.**
* Nó được ứng dụng để xử lý text với các file .txt, .csv với kích thước lên tới GB, các thao tác như đọc file, ghi chép theo dòng, cột,.. một cách nhanh chóng
* AWK có thể sử dụng một shell scripting trong Ubuntu, có thể chạy dưới định dạng .sh
* Phiên bản AWK được viết và bảo trì bởi Free Software Foundation (FSF); nó thường được biết đến với tên GNU AWK.

# 2. Các loại AWK
* AWK: nguồn gốc AWK từ phòng thí nghiệm AT&T
* NAWK: bản mới hơn của AWK từ phòng thí nghiệm AT&T
* GAWK: Hay còn gọi là GNU AWK. Tất cả các bản phát hành GNU/Linux đều có GAWK. Nó tương thích với AWK và NAWK

`$ which awk`

# 3. WorkFlow
AWK mặc định đã được cài trong hầu hết các phiên bản GNU/Linux, bạn có thể kiểm tra nó bằng lệnh `$ which awk`. Nếu bạn dùng các bản GNU/Linux chưa được cài awk, bạn có thể tham khảo cách cài đặt, AWK, NAWK hoặc GAWK.
## 3.1. WorkFlow
WorkFlow của AWK khá đơn giản: Read, Execute, and Repeat
![](https://images.viblo.asia/2d75815a-2197-4504-ab3c-2cdc9d13e74e.jpg)


* Read (đọc): AWK đọc từng dòng của file đầu vào và lưu trữ nó trong bộ nhớ.
* Execute (thực thi): Tất cả các lệnh AWK được thực thi tuần tự với file input, mặc định AWK thực thi lệnh theo từng dòng, bạn có thể thay đổi nó thông qua việc sắp xếp các patterns.
* Repeat (lặp lại): Quá trình lặp lại cho đến khi đọc đến dòng cuối cùng

```
BEGIN {
    # BEGIN block code
}

# body code

END {
   # END block code  
}
```
## 3.2. Cú pháp cơ bản
Có 2 cách để bạn sử dụng các lệnh AWK.

* Cách 1: Bạn có thể sử dụng trực tiếp các tùy chọn trong lệnh awk

`$ awk [options] file ...`

* Cách 2: Bạn viết ra riêng 1 file và sử dụng

File test.sh
```
BEGIN {
    # BEGIN block code
}

FILENAME == ARGV[1] {
    print $0
}

END {
   # END block code  
}
```
Sau đó chạy thôi:
`$ awk test.sh students.csv`
# 4. Một số câu lệnh cơ bản
## 4.1. Xử lý file
Như đã nói ở trên, awk được thiết kế để xử lý đọc và ghi file text rất mạnh mẽ
Xét file **marks.txt** có dạng như sau để xử lý:
```
1) Amit     Physics   80
2) Rahul    Maths     90
3) Shyam    Biology   87
4) Kedar    English   85
5) Hari     History   89
```
* Sử dụng kí tự `$` để lấy các thông tin theo cột của file đầu vào (nó sẽ coi như mỗi cột cách nhau bởi dấu cách, dấu tab hoặc kí tự hết dòng)

Ví dụ muốn in ra cột 3 và cột 4 của file ta sử dụng lệnh sau:

`$ awk '{print $3 "\t" $4}' marks.txt`

Và đây là kết quả 
```
    Physics   80
    Maths     90
    Biology   87
    English   85
    History   89
```
* Sử dụng `$0` để hiển thị toàn bộ các cột của 1 dòng
* Ghi vào file:

`$ awk '{print "6)" "\t" "MinhNV" "\t" "Maths" "\t" "80"}' marks.txt`

## 4.2. Biến
- Các đối số đầu vào của lệnh awk được ghi nhận trong mảng ARGC
Ví dụ như đọc file marks.txt trên:

```C
BEGIN {
}

# lấy tham số đầu tiên
FILENAME == ARGV[1] {
    print $0 # hiển thị theo dòng 
}

END {
    
}
```

Sau đó chạy:

`$ awk test.sh marks.txt`

- Một vài biến tùy chọn khác (các biến này có thể gán trong khối BEGIN)

Tùy chọn -F: tùy chọn theo dòng (hoặc gán giá trị này cho biến FS)
```C
$ # second field where input field separator is :
$ echo 'foo:123:bar:789' | awk -F: '{print $2}'
123

$ # last field
$ echo 'foo:123:bar:789' | awk -F: '{print $NF}'
789

$ # first and last field
$ # note the use of , and space between output fields
$ echo 'foo:123:bar:789' | awk -F: '{print $1, $NF}'
foo 789
```

Biến NR: số dòng đã đọc được.

Biến FNR trong việc xử lý nhiều file cùng 1 lúc (số dòng đã đọc được theo file).
...

Chi tiết tham khảo tại [đây](https://github.com/learnbyexample/Command-line-text-processing/blob/master/gnu_awk.md)
- Đặt tên biến
Cú pháp khá đơn giản: `variable_name = value`

```C
BEGIN {
}

FILENAME == ARGV[1] {
    name = "MinhNV"
    print name
}

END {
    
}
```
## 4.3. Mảng
Cú pháp: `array_name[index] = value`

```C
$ awk 'BEGIN {
   fruits["mango"] = "yellow";
   fruits["orange"] = "orange"
   print fruits["orange"] "\n" fruits["mango"]
}'
```

## 4.4. Function
Cú pháp chung:
```C
function function_name(argument1, argument2, ...) { 
   function body
}
```
Ví dụ như
```C
# Returns minimum number
function find_min(num1, num2){
   if (num1 < num2)
   return num1
   return num2
}
# Returns maximum number
function find_max(num1, num2){
   if (num1 > num2)
   return num1
   return num2
}
# Main function
function main(num1, num2){
   # Find minimum number
   result = find_min(10, 20)
   print "Minimum =", result
  
   # Find maximum number
   result = find_max(10, 20)
   print "Maximum =", result
}
# Script execution starts here
BEGIN {
   main(10, 20)
}
```
Kết quả sẽ là:
```
Minimum = 10
Maximum = 20
```

# 5. Tổng kết
Trên đó mới chỉ là cơ bản qua về AWK, các đoạn script đọc file và xử lý text với tốc độ nhanh chóng. Chi tiết các bạn có thể tìm hiểu thêm

* [AWK Tutorial](https://www.tutorialspoint.com/awk/awk_user_defined_functions.htm)
* [Command line text processing](https://github.com/learnbyexample/Command-line-text-processing/blob/master/gnu_awk.md)
* [Định dạng ngày tháng](https://stackoverflow.com/questions/20361982/get-current-time-in-hours-and-minutes)