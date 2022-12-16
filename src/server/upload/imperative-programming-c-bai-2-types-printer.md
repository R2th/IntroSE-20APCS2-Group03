Tiếp tục câu chuyện sau khi đã copy/paste và chạy được chương trình "Hello World" của C; Nói về cái từ khóa `int` được đặt ở phía trước khối `main()` thì mình cũng biết được lơ mơ về cái công dụng của nó. Cái này được gọi là `type hinting` - dịch nôm na là chỉ dẫn, định dạng kiểu dữ liệu - tức là kiểu dữ liệu sẽ xuất hiện ở vị trí nào đó trong code ví dụ như kiểu dữ liệu mà một biến sẽ lưu hoặc một hàm sẽ trả về khi được gọi.

Và những ngôn ngữ mà bắt buộc thao tác `type hinting` trong code thì thường được gọi là `static typing`, bởi vì kiểu của dữ liệu cần làm việc đã được cố định `static` chứ không được linh động `dynamic` như trường hợp của JavaScript nữa. Nếu chúng ta đặt một chuỗi vào vị trí đã được `hint` là một giá trị số học thì trình biên dịch `compiler` sẽ báo lỗi ngay khi thực hiện biên dịch sang tệp thực thi; Hoặc nếu sử dụng một trình thông dịch `interpreter` để chạy code trực tiếp thì khi gặp dữ liệu thực thi không đúng với `hint` cũng sẽ báo lỗi tức thì.

```Documents\imperative-programming-c\0001-static-typing\main.c
#include <stdio.h>

int main() {
   printf("Hello C");
   return "something";
}
```

```CMD|Terminal.io
cd Documents && cd imperative-programming-c && cd 0001-static-typing
gcc main.c -o main

warning: returning 'char *' from a function with return type 'int' makes integer from pointer without a cast
```

Ưu điểm của mỗi thứ mỗi khác. Sự linh động của JavaScript thì cho phép chúng ta viết code ngắn gọn hơn. Còn cái `static typing` của C như đã thấy ở đây thì sẽ giúp chúng ta sàng lọc được nhiều lỗi lập trình tiềm ẩn. :D

## Các hint cơ bản

Hay các kiểu dữ liệu cơ bản đã được định nghĩa sẵn, bao gồm: `void`, `char`, `short`, `int`, `long`, `float`, `double`, `signed`, `unsigned`.

Quá nhiều. Chúng ta sẽ tạm thời chỉ quan tâm tới những thứ thực sự cần thiết cho nhu cầu sử dụng cơ bản thôi được không? :D

- `void` - không có giá trị trả về, hoặc không xác định kiểu dữ liệu.
- `char` - các ký tự đơn. Ví dụ: `'c'`
- `int` - các giá trị số học không có phần thập phân dang dở. Ví dụ: `1001`
- `float` - các giá trị số học có thể hiện cả phần thập phân. Ví dụ: `10.01`

Hình như so với nhu cầu sử dụng cơ bản khi học JavaScript là ở đây chúng ta không có mấy đồng xu `boolean`. Nhưng mình ngó qua cấu hình ngôn ngữ của C thì vẫn có cấu trúc điều kiện `if .. else`, chắc sẽ được xử lý theo cách khác. Bây giờ chúng ta cứ thử sử dụng mấy cái `hint` cơ bản kia đã. :D

```Documents\imperative-programming-c\0002-basic-hint\main.c
#include <stdio.h>

int main() {
   char  character = 'c';
   int   integer   = 1001;
   float floating  = 10.01;
   // - - - - - - - - - -
   printf("Hello C");
   return 0;
}
```

```CMD|Terminal.io
cd Documents && cd imperative-programming-c && cd 0002-basic-hint
gcc main.c -o main
main

Hello C
```

Không có thông báo lỗi nào và cái chương trình "Hello World" vẫn đang hoạt động tốt. Vậy là sử dụng đúng cách rồi. Thay vì sử dụng `var` để tạo ra mấy cái hộp đựng các giá trị như JavaScript thì mỗi cái hộp trong C đều phải được gắn nhãn `hint` để định kiểu dữ liệu có thể được bỏ vào trong đó.

Bây giờ chúng ta cần tìm hiểu thêm một chút về phương thức in các giá trị ra màn hình, mình đã thử thao tác nối chuỗi cơ bản như JavaScript và đặt vào thay đoạn "Hello C" rồi nhưng không được. Vì vậy nên mình đã Google thêm đoạn này nữa để lấy công cụ hiển thị kết quả hoạt động của code ra cửa sổ dòng lệnh.

## Chương trình in printf

Chương trình in `printf` được thiết kế với đầu vào là một chuỗi biểu thị dạng mẫu `template` sẽ được in ra với các vị trí có ký hiệu `%` được sử dụng để gắn dữ liệu truyền vào ở các vị trí tham số tiếp theo.

```Documents\imperative-programming-c\0003-printf-format\main.c
#include <stdio.h>

int main() {
   char  character = 'c';
   int   integer   = 1001;
   float floating  = 10.01;
   // - - - - - - - - - -
   printf("A character: %c \n", character);
   printf("An integer: %i \n", integer);
   printf("A floating-point number: %f \n", floating);
   return 0;
}
```

```CMD|Terminal.io
cd Documents && cd imperative-programming-c && cd 0003-printf-format
gcc main.c -o main
main

A character: c
An integer: 1001
A floating-point number: 10.010000
```

Ngoài ra thì còn 1001 cái ký hiệu để định dạng kết quả in trong `template` của `printf` được liệt kê ở đây: [C Standard Library -> `printf`](https://www.tutorialspoint.com/c_standard_library/c_function_printf.htm). Bạn cũng ngó qua một lượt để biết sơ sơ về khả năng định dạng của trình in `printf` nhé.

## Type & Print in JavaScript

```main.js
var character = "c";
var integer   = 1001;
var floating  = 10.01;
// - - - - - - - - -
console.log(`A character: ${character}`);
console.log(`An integer: ${integer}`);
console.log(`A floating-point number: ${floating}`);
```

Hmm... có lẽ C... rườm rà hơn thật. :D

[[Imperative Programming + C] Bài 3 - Pointer & Scanner](https://viblo.asia/p/Eb85ovQjl2G)