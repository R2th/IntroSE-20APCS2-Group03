Sau khi đã biết cách tạo ra các chương trình con và các kiểu dữ liệu tùy theo mục tiêu xây dựng phần mềm. Những thắc mắc còn lại của mình trong phạm vi kiến thức căn bản về C chỉ còn lại một vài điểm nho nhỏ. Đó là các cấu trúc lệnh phổ biến như cấu trúc điều kiện hỗ trợ thay đổi logic hoạt động của code tùy tình huống và cấu trúc hỗ trợ tự động hóa việc lặp các thao tác xử lý khi cần thiết.

## Kiểu dữ liệu bool

Lúc này mình mới nhớ ra là trong cấu hình của C không có [mấy đồng xu `boolean`](https://viblo.asia/p/924lJRY6lPM) được định nghĩa sẵn. Sau một lượt Google thì cũng có thêm thông tin là C đã bổ sung một thư viện tên là `stdbool.h` ở phiên bản C99 (năm 2000). Thư viện này định nghĩa kiểu `bool` dựa trên kiểu dữ liệu cơ bản có độ rộng là `1 byte` giống với kiểu `char`. Tức là được biểu thị bởi 8 bit bộ nhớ và giá trị `false` tương đương với giá trị số học `0`, còn giá trị `true` thì tương đương với giá trị số học `1`.

```Documents\imperative-programming-c\0020-stdbool-library\main.c
#include <stdio.h>
#include <stdbool.h>

int main() {
   bool maybe;
   printf("Size of bool: %i byte \n", sizeof(bool));
   // - - - - - - - - - - - - - - - - - -
   maybe = true;
   printf("true is %i \n", maybe);
   // - - - - - - - - - - - - - - - - - -
   maybe = false;
   printf("false is %i \n", maybe);
   // - - - - - - - - - - - - - - - - - -
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Size of bool: 1 byte
true is 1
false is 0
```

## Các phép tính logic

C cũng cung cấp các phép tính logic để so sánh các giá trị và trả về kết quả là `1` để tượng trưng cho `true`, và trả về `0` để tượng trưng cho `false`. Tuy nhiên ở đây C không quan niệm một chuỗi rỗng `""` hay một ký tự `char '0'` là giá trị tương đương với giá trị số học `0`.

```Documents\imperative-programming-c\0021-logical-operators\main.c
#include <stdio.h>
#include <stdbool.h>

int main() {
   printf("\n ! 0 -> %i", !0);
   printf("\n ! none-zero -> %i", !"none-zero");
   printf("\n - - - - - - - - -");
   printf("\n true && false -> %i", (true && false));
   printf("\n true || false -> %i", (true || false));
   printf("\n - - - - - - - - -");
   printf("\n true && \"\" -> %i", (true && ""));
   printf("\n true && '0' -> %i", (true && '0'));
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

 ! 0 -> 1
 ! none-zero -> 0
 - - - - - - - - -
 true && false -> 0
 true || false -> 1
 - - - - - - - - -
 true && "" -> 1
 true && '0' -> 1
```

Lưu ý ở đây là một giá trị thuộc kiểu dữ liệu bất kỳ đều sẽ được các phép toán logic chuyển đổi về `0` nếu tất cả các `bit` bộ nhớ lưu giá trị đó đều là `0`. Trong trường hợp chỉ cần có ít nhất một `bit` nào đó là `1` thì kết quả chuyển đổi sẽ là `1`. Các giá trị `true` và `false` do thư viện `stdbool.h` cung cấp chỉ là các tên hằng được định nghĩa để viết thay cho `1` và `0` trong các vị trí cần biểu thị ý nghĩa cho code rõ ràng hơn.

## Cấu trúc điều kiện

Như chúng ta đã thấy trong các ví dụ ở trên thì C không có định nghĩa riêng cho kiểu `boolean` mà thực tế là một dạng `typedef` từ một kiểu dữ liệu cơ bản nào đó có độ rộng lưu trữ mà `malloc` cấp cho là `1 byte`. Có lẽ vì vậy nên khi xây dựng cấu trúc điều kiện `if .. else` người ta đã đưa ra một quy ước không liên quan lắm tới kiểu dữ liệu của giá trị điều kiện. 

Đó là ở vị trí `if (value)` thì giá trị `value` cứ miễn không phải là giá trị số học `0` thì khối lệnh sau `if` sẽ được thực hiện, còn nếu `value` là `0` thì sẽ chuyển sang xem xét khối điều kiện tiếp theo (nếu có).

```Documents\imperative-programming-c\0022-conditional-syntax\main.c
#include <stdio.h>

int main() {
   if ("non-zero")
      printf("The value is not 0");
   else
      printf("The value is zero");
   // - - - - - - - - - - - - - - - - - -
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

The value is not 0
```

Do cú pháp nối tiếp các khối `if..else` và cú pháp thay thế `switch` của C và JavaScript hoàn toàn tương đồng nên mình tạm thời chỉ quan tâm tới quy ước xét điều kiện hoạt động như trên. Bây giờ thì chuyển hướng đến chủ đề tiếp theo thôi, đó là các cấu trúc hỗ trợ tự động lặp các thao tác xử lý trong C khi cần thiết.

[[Imperative Programming + C] Bài 8 - Goto & Looping](https://viblo.asia/p/3P0lPJMPKox)