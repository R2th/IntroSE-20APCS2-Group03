Ok... sau khi đã biết được sơ sơ về các kiểu dữ liệu cơ bản của C thì cũng là lúc mà mình đặt câu hỏi nhiều hơn về các chương trình con `sub-program` - hay được hiểu nôm na là các khối lệnh được định nghĩa gắn với một tên gọi và có thể được gọi `callable` lặp lại ở những nơi khác trong bộ code khi cần sử dụng tới.

## Khái niệm Sub-Program

Theo cách gọi của các bạn thích môn Toán hay có nền tảng lập trình xuất phát từ các ngôn ngữ như Lisp, Haskell, thì các `sub-program` hay các khối `callable` thường được gọi là các hàm `function`. Còn đối với những bạn xuất phát từ các ngôn ngữ như Ada, SQL, thì các chương trình con sẽ được gọi chung là `sub-program` và sau đó chia thành hai loại là các thủ tục `procedure` hoặc các hàm `function`.

Và ở đây, với C thì chúng ta không có ràng buộc nào về thuật ngữ nói về các khối `sub-program` này và cũng không có các từ khóa ràng buộc trong code như `procedure` hay `function`. Về cơ bản thì các `sub-program` trong C hoàn toàn có thể là các hàm `function` khi sử dụng kèm lệnh `return` để trả về kết quả tại vị trí được gọi; Hoặc cũng có thể là các thủ tục `procedure` nếu như chúng ta sử dụng `hint` kiểu dữ liệu trả về là `void` và trong phần thân hàm sẽ không cần sử dụng `return`.

```sub-program.c
int function() {
   // ... statements;
   return 0;
}

void procedure() {
   // ... statements;
}
```

## Khai báo Sub-Program

Thao tác tạo ra và sử dụng các `sub-program` trong C thực sự không có gì khác biệt quá nhiều so với JavaScript ngoài việc thêm phần sử dụng `hint` để định kiểu dữ liệu trả về. Tuy nhiên trong trường hợp khi chúng ta muốn viết code sử dụng các `sub-program` trước khi viết code định nghĩa chi tiết thì C sẽ không tự động hóa tính năng `hoisting` để dồn các phần code định nghĩa lên trước phần code sử dụng.

Thay vào đó thì chúng ta có thể viết thêm một dòng code khai báo ngắn gọn về các `sub-program` ở đầu tệp code để đưa ra chỉ dẫn cho trình biên dịch `compiler` thực hiện thao tác `hoisting` nếu cần thiết.

```Documents\0011-sub-program-hoisting\main.c
#include <stdio.h>

// - khai báo sub-program
float doubleof(float number);

int main() {
   float anumber = 1234.5;
   float doubled = doubleof(anumber);
   printf("Double of %f is %f", anumber, doubled);
   return 0;
}

float doubleof(float anumber) {
   return anumber * 2;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Double of 1234.500000 is 2469.000000
```

## Sử dụng Macro

Bên cạnh các thao tác khai báo và định nghĩa các `sub-program` như trên thì C còn hỗ trợ một cú pháp khác để tạo ra các khối code `callable` có thể được tái sử dụng nhiều lần. Đó là chúng ta sẽ có thể sử dụng chỉ dẫn `#define` để gắn tên cho một đoạn code như thế này:

```Documents\imperative-programming-c\0012-define-macro\main.c
#include <stdio.h>

#define doubleof(anumber) (anumber * 2)

int main() {
   int anumber = 12345;
   int doubled = doubleof(anumber);
   printf("Double of %i is %i", anumber, doubled);
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Double of 12345 is 24690
```

Điểm khác biệt trong cách sử dụng chỉ dẫn `#define` như thế này đó là cơ chế thực thi code. Các khối code được tạo ra bởi chỉ dẫn `#define` được gọi là `macro` và sẽ được trình biên dịch thực hiện sao chép tới các vị trí mà các `macro` được gọi tên. Sau đó tiến trình biên dịch toàn bộ tệp code C sang tệp thực thi của hệ điều hành mới bắt đầu được thực hiện.

Mặc dù các `macro` cũng hỗ trợ việc tạo ra và sử dụng các tham số đầu vào, tuy nhiên thực tế thì đây chỉ là các biến tượng trưng `placeholder` cho phần code cần sao chép chứ không mang logic hoạt động chi tiết như định kiểu dữ liệu `type-hinting` hay chức năng lưu trữ dữ liệu như các biến thực thụ.

Vì vậy nên các `macro` không thường được sử dụng để thay thế chức năng chính của các cú pháp khai báo và định nghĩa `sub-program`; Mà thường được dùng để tạo ra giao diện lập trình linh động hơn khi chúng ta muốn tạo ra một thư viện `library` cung cấp các công cụ tiện ích để làm việc xoay quanh các đối tượng dữ liệu.

## Sub-Program in JavaScript

```main.js
void function main() {
   var anumber = 12345;
   var doubled = doubleOf(anumber);
   console.log(`Double of ${anumber} is ${doubled}`);
} ();

function doubleOf(anumber) {
   return anumber * 2;
}
```

[[Imperative Programming + C] Bài 6 - Struct & Typedef](https://viblo.asia/p/4dbZNQbkKYM)