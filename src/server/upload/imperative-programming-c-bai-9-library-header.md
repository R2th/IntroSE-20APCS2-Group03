Bây giờ thì chúng ta đã có thể nghĩ tới việc bắt tay vào viết một vài chương trình đơn giản bằng C. Điểm quan trọng nhất cần tìm hiểu bây giờ có lẽ là cách phân chia code thành nhiều tệp để quản lý và viết test dễ dàng hơn. Vì vậy nên mình đã Google thử cách để tạo ra một thư viện kiểu như mấy cái `stdio.h`, `stdlib.h`, hay `stdbool.h` mà chúng ta đã sử dụng trước đó. Tiện thể thì kết quả là Google có gợi ý luôn chủ đề liên quan là thư viện tiêu chuẩn `standard library` của C.

## Standard Library

Câu chuyện ở đây là có vài cái trình biên dịch `compiler` khác nhau đang được sử dụng bởi cộng đồng C. Trong số đó thì cái `gcc` mà chúng ta đang sử dụng là rất rất phổ biến so với số còn lại. Tuy nhiên để đảm bảo có một sự nhất quán nền tảng giữa các `compiler` thì C đã đưa ra khái niệm thư viện tiêu chuẩn. Đó là một bộ các thư viện nhỏ cung cấp các chương trình con hỗ trợ chức năng nền tảng để người viết code có thể sử dụng và xây dựng nên những chương trình của mình.

- [`assert.h`](https://en.cppreference.com/w/c/error)
- [`complex.h`](https://en.cppreference.com/w/c/numeric/complex)
- [`ctype.h`](https://en.cppreference.com/w/c/string/byte)
- [`errno.h`](https://en.cppreference.com/w/c/error)
- [`fenv.h`](https://en.cppreference.com/w/c/numeric/fenv)
- [`float.h`](https://en.cppreference.com/w/c/types/limits#Limits_of_floating_point_types)
- [`inttypes.h`](https://en.cppreference.com/w/c/types/integer)
- [`iso646.h`](https://en.cppreference.com/w/c/language/operator_alternative)
- [`limits.h`](https://en.cppreference.com/w/c/types/limits)
- [`locale.h`](https://en.cppreference.com/w/c/locale)
- [`math.h`](https://en.cppreference.com/w/c/numeric/math)
- [`setjmp.h`](https://en.cppreference.com/w/c/program)
- [`signal.h`](https://en.cppreference.com/w/c/program)
- [`stdalign.h`](https://en.cppreference.com/w/c/types)
- [`stdarg.h`](https://en.cppreference.com/w/c/variadic)
- [`stdatomic.h`](https://en.cppreference.com/w/c/thread#Atomic_operations)
- [`stdbool.h`](https://en.cppreference.com/w/c/types)
- [`stddef.h`](https://en.cppreference.com/w/c/types)
- [`stdint.h`](https://en.cppreference.com/w/c/types/integer)
- [`stdio.h`](https://en.cppreference.com/w/c/io)
- [`stdlib.h`](https://www.tutorialspoint.com/c_standard_library/stdlib_h.htm)
- [`stdnoreturn.h`](https://www.gnu.org/software/gnulib/manual/html_node/stdnoreturn_002eh.html)
- [`string.h`](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/string.h.html)
- [`tgmath.h`](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/tgmath.h.html)
- [`threads.h`](https://en.cppreference.com/w/c/thread)
- [`time.h`](https://en.cppreference.com/w/c/chrono)
- [`uchar.h`](https://en.cppreference.com/w/c/string/multibyte)
- [`wchar.h`](https://en.cppreference.com/w/c/string/wide)
- [`wctype.h`](https://en.cppreference.com/w/c/string/wide)

Ngoài thư viện tiêu chuẩn gồm các thư viện con ở trên thì các trình `compiler` khác nhau sẽ có cung cấp một vài thư viện riêng tùy thuộc vào môi trường ứng dụng mà `compiler` đó hướng tới. Các thư viện được cung cấp mặc định bởi các `compiler` có thể được sử dụng bằng cú pháp như sau:

```c
#include <library.h>
```

Còn các thư viện mà chúng ta tạo ra khi xây dựng các chương trình ứng dụng sẽ được sử dụng bằng cú pháp gần tương tự với chuỗi mô tả đường dẫn tương đối trỏ tới tệp thư viện tính từ vị trí của tệp code đang thực hiện `#include`.

```c
#include "path/to/library.h"
```

## Header File

Thiết kế thư viện đơn giản nhất là một tệp có định dạng `.h` thường được gọi là tệp `header`. Ở đây chúng ta sẽ có một ví dụ nhỏ về một tệp `math.h` tự định nghĩa được đặt trong cùng thư mục với tệp `main.c`.

```math.h
float sum(float a, float b) {
   return a + b;
}
```

```main.c
#include <stdio.h>
#include "math.h"

int main() {
   float a = 9.0;
   float b = 1.8;
   float result = sum(a, b);
   printf("Sum of %f and %f is %f", a, b, result);
   // - - - - - - - - - - - - - - - - - -
   return 0;
}
```

Lúc này khi chúng ta thực hiện thao tác chạy lệnh biên dịch thì tất cả nội dung code trong tệp `math.h` tự định nghĩa sẽ được copy/paste vào chính xác vị trí của dòng `#include "math.h"`.

```CMD|Terminal.io
gcc main.c -o main
main

Sum of 9.000000 and 1.800000 is 10.800000
```

Trên thực tế thì các thư viện của C thường được thiết kế ở dạng một tệp `header` và các tệp code định dạng `.c` như tệp `main`. Trong đó thì tệp `header` sẽ chỉ chứa code định nghĩa các kiểu dữ liệu và khai báo ngắn gọn về các chương trình con; Còn các tệp `.c` sẽ chứa code định nghĩa chi tiết về các chương trình con đã được khai báo trong tệp `header`.

Sau đó, tại bước thực hiện biên dịch chương trình thì chúng ta sẽ cần liệt kê tất cả các tệp `.c` đã được sử dụng.

```CMD|Terminal.io
gcc main.c one.c two.c three.c ... -o main
```

Mục đích của cách thực hiện này đó là tệp `header` sẽ có thể được sử dụng làm chỉ mục để tổng quát nội dung của thư viện; Và các hằng số hay các kiểu dữ liệu tự định nghĩa sẽ có thể được sử dụng chung cho nhiều tệp `.c` chứa code định nghĩa chi tiết các chương trình con.

Trong khi đó thì các tệp `.c` chứa code định nghĩa các chương trình con do đã được tách nhỏ sẽ có thể viết test riêng dễ dàng và thuận tiện hơn trong việc quản lý các tệp code.

## C Preprocessor

Khi một chương trình mà chúng ta đang xây dựng được mở rộng và sử dụng nhiều thư viện khác nhau, có một vấn đề nho nhỏ có khả năng sẽ phát sinh. Đó là tất cả các định nghĩa hằng, kiểu dữ liệu, và các chương trình con ở cấp ngoài cùng của các thư viện sẽ đều mặc định được nhìn thấy bởi các phần code khác. 

Lúc này sẽ có khả năng xuất hiện nhiều hơn một đoạn code định nghĩa sử dụng cùng tên định danh, ví dụ như một tên hằng được định nghĩa trong hai thư viện. Chính vì vậy nên C còn cung cấp thêm các chỉ dẫn `directive` giúp chúng ta tạo ra các logic xử lý trước khi biên dịch - vì vậy nên các chỉ dẫn này còn được gọi là [`preprocessor`](https://www.tutorialspoint.com/cprogramming/c_preprocessors.htm). 

Code ví dụ dưới dây sẽ minh họa một thao tác kiểm tra xem một tên định danh `infinity`. Nếu `infinity` đã được định nghĩa bởi `#define` trong một tệp nào đó được `#include` trước tệp này thì sẽ không thực hiện thao tác `#define` lại ở đây.

```infinity.h
#define infinity 1001
```

```main.c
#include <stdio.h>
#include "infinity.h"

#if !defined (infinity)
   #define infinity 81
#endif

int main() {
   printf("Infinity: %i", infinity);
   return 0;
}
```

Do ở tệp `infinity.h` thì tên định danh `infinity` đã được định nghĩa trước, vì vậy nên đoạn code kiểm tra tiền xử lý ở tệp `main.c` đã không định nghĩa lại thành `81`. Và kết quả được in ra là `1001`.

```CMD|Terminal.io
gcc main.c -o main
main

Infinity: 1001
```

Nhắc tới chỉ dẫn `#define`, C có định nghĩa sẵn một số `macro` cơ bản để hỗ trợ truy xuất một số thông tin hệ thống thường dùng dưới đây.

```main.c
#include <stdio.h>

int main() {
   printf("Date: %s \n", __DATE__ );
   printf("Time: %s \n", __TIME__ );
   printf("File: %s \n", __FILE__ );
   printf("Line: %d \n", __LINE__ );
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Date: Jun 13 2022 
Time: 20:19:39
File: main.c
Line: 7
```

[[Imperative Programming + C] Bài 10 - Simplicity DSA-C](https://viblo.asia/p/Qpmleznn5rd)