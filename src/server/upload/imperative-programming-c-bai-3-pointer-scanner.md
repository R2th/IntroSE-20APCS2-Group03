Cách mà chúng ta đã tạo ra và sử dụng các biến ở bài trước là một trong số hai giao diện lập trình mà C cung cấp. Nó khá gần gũi và thân thiện với góc nhìn của một newbie đã có [nền tảng lập trình căn bản từ JavaScript](https://viblo.asia/s/Wj53OQQP56m). Thôi thì chúng ta cứ tạm gọi đó là giao diện lập trình bậc cao đi. :D

## Giao diện lập trình bậc thấp

Bên cạnh đó thì C còn cung cấp một giao diện lập trình khác, mà khi sử dụng giao diện này thì chúng ta sẽ có thể hiểu được rõ hơn những phép màu của các ngôn ngữ lập trình bậc cao như JavaScript. Và sau khi đã hoàn toàn hiểu rõ thì đó sẽ là những phép màu thực sự chứ chắc chắn sẽ không phải là những điểm tiềm năng tạo ra các vấn đề nữa. :D

```Documents\imperative-programming-c\0004-using-pointer\main.c
#include <stdio.h>
#include <stdlib.h>

int main() {
   char* charReference = malloc(1);
   printf("Memory address: %p \n", charReference);
   // - - - - - - - - -
   *charReference = 'c';
   printf("Stored character: %c \n", *charReference);
   // - - - - - - - - -
   free(charReference);
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Memory address: 0000000000c013d0
Stored character: c
```

Ở đây chúng ta có một đoạn code ví dụ tạo ra một cái hộp `charReference` định kiểu là `char*` - có thêm ký hiệu `*` so với mấy cái `hint` ở bài trước. Những chiếc hộp được gắn `hint` kèm hậu tố `*` như thế này được gọi là con trỏ - hay `pointer` - lưu địa chỉ của một vùng nào đó trong bộ nhớ máy tính. 

Như ví dụ ở trên thì địa chỉ của vùng bộ nhớ mà `charReference` đang trỏ đến là `0000000000c013d0`. Cái địa chỉ này được chương trình `malloc` (memory allocate) trả về khi chúng ta truyền vào một giá trị số học mô tả độ rộng của vùng bộ nhớ cần sử dụng.

```c
char* charReference = malloc(1);
```

Thao tác này là một dạng khai báo với hệ điều hành để được cấp phát quyền sử dụng một phần nhỏ bộ nhớ đệm cho chương trình mà chúng ta đang viết. Có như vậy thì các chương trình khác trong cùng máy tính mới không ghi đè dữ liệu vận hành lên các vùng bộ nhớ mà chương trình này đang sử dụng, và ngược lại. :D Lúc này khi nhắc tới cái tên `charReference` ở đoạn `printf` sau đó, C sẽ hiểu là chúng ta đang muốn xem cái địa chỉ dài dòng kia, chứ không phải là một ký tự chữ cái.

```c
printf("Memory address: %p \n", charReference);
```

Và để lưu một ký tự vào vùng bộ nhớ đó thì thao tác gán giá trị cần được viết như thế này:

```c
*charReference = 'c';
```

Ký hiệu `*` được gắn trước `charReference` sẽ biểu thị là chúng ta đang muốn thực hiện thao tác lưu trữ một giá trị tại địa chỉ đó. Và lần thứ hai khi sử dụng `printf`, thao tác truy xuất `*charReference` biểu thị là chúng ta muốn lấy ra giá trị đã được lưu trữ chứ không phải là cái địa chỉ dài dòng kia.

```c
printf("Stored character: %c \n", *charReference);
```

Cuối cùng là khi đã sử dụng xong vùng bộ nhớ cho mục đích lưu trữ tạm thời khi chương trình vận hành, chúng ta cần trả lại cho hệ điều hành để các phần mềm khác có thể đăng ký được sử dụng.

```c
free(charReference);
```

## Độ rộng kiểu dữ liệu

Rồi... như vậy là giao diện lập trình bậc cao thực ra đã tự động hóa thao tác đăng ký quyền sử dụng một vùng bộ nhớ khi chúng ta khai báo một biến có định kiểu; Còn việc chúng ta có lưu một giá trị nào đó vào vùng bộ nhớ đã đăng ký hay không thì còn tùy vào logic của code sử dụng sau đó.

Thắc mắc mới của mình lúc này là cái giá trị độ rộng truyền vào chương trình con `malloc`. Nhiều hơn `1` có được không? Nếu có thì bao nhiêu sẽ là đủ? Thế rồi những câu hỏi này dẫn mình tới khái niệm về độ rộng của các kiểu dữ liệu.

Cụ thể thì là dữ liệu được lưu trữ trong máy tính hay các thiết bị thông minh mà chúng ta đang sử dụng được biểu thị bằng các ô nhớ nhỏ li ti gọi là `bit`. Mỗi một ô nhớ này có thể lưu một trong hai giá trị là `0` hoặc `1`. Và để biểu thị một giá trị số học hay một ký tự đơn thì người ta cần tạo ra một bộ quy ước để chuyển đổi từ một dãy `bit` sang kiểu dữ liệu thông thường mà chúng ta hay sử dụng.

Và để biểu thị một chữ cái, hay một giá trị thuộc kiểu `char` thì người ta đã quy ước là cần `8` ô nhớ liên tiếp cạnh nhau. Vì vậy kiểu `char` được xem là có độ rộng `8 bit` hoặc `1 byte`. 

Các kiểu dữ liệu khác nhau được tạo ra bởi nhu cầu biểu thị dữ liệu lưu trữ khác nhau và hiển nhiên sẽ có độ rộng khác nhau. Tuy nhiên thì chúng ta sẽ không cần phải tìm và ghi nhớ độ rộng của từng kiểu dữ liệu để làm việc ở cấp độ này. C có cung cấp một chương trình con nho nhỏ có tên là `sizeof()` để trả về độ rộng của kiểu dữ liệu mà chúng ta muốn sử dụng.

```Documents\imperative-programming-c\0005-type-width\main.c
#include <stdio.h>
#include <stdlib.h>

int main() {
   char*  charRef  = malloc(sizeof(char));
   int*   intRef   = malloc(sizeof(int));
   float* floatRef = malloc(sizeof(float));
   // - - - - - - - - -
   *charRef  = 'c';
   *intRef   = 1001;
   *floatRef = 10.01;
   // - - - - - - - - -
   printf("A character: %c \n", *charRef);
   printf("An integer: %i \n", *intRef);
   printf("A floating-point number: %f \n", *floatRef);
   // - - - - - - - - -
   free(charRef);
   free(intRef);
   free(floatRef);
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

A character: c
An integer: 1001
A floating-point number: 10.010000
```

## Chương trình đọc scanf

Sau khi đã hiểu được thêm một chút về việc định kiểu dữ liệu trong C thì thứ mà mình rất quan tâm là các thao tác I/O để nhập/xuất dữ liệu cơ bản. Cụ thể là thao tác in dữ liệu ra màn hình `console` thì cũng đã khá quen thuộc rồi. Bây giờ chỉ cần thêm thao tác nhận dữ liệu vào từ thao tác người dùng qua `console` nữa là có thể bắt đầu nghĩ tới ý tưởng viết một chương trình nhập/xuất dữ liệu đơn giản.

Vì vậy nên mình lại thêm một lượt Google nữa và tìm được một chương trình con `scanf` được thiết kế để hoạt động bổ trợ cho cái `printf` đã biết. Cái `sub-program` này sẽ nhận vào một địa chỉ lưu trữ của một vùng bộ nhớ và lưu nội dung quét được từ `console` vào vùng bộ nhớ đó. Vừa hay, mới học xong về `pointer` là có cái xài luôn. :D

```Documents\imperative-programming-c\0006-using-scanf\main.c
#include <stdio.h>
#include <stdlib.h>

int main() {
   char*  charRef  = malloc(sizeof(char));
   int*   intRef   = malloc(sizeof(int));
   float* floatRef = malloc(sizeof(float));
   // - - - - - - - - -
   printf("Input a character: ");               scanf("%c", charRef);
   printf("Input an integer: ");                scanf("%i", intRef);
   printf("Input a floating-point number: ");   scanf("%f", floatRef);
   // - - - - - - - - -
   printf("A character: %c \n", *charRef);
   printf("An integer: %i \n", *intRef);
   printf("A floating-point number: %f \n", *floatRef);
   // - - - - - - - - -
   free(charRef);
   free(intRef);
   free(floatRef);
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Input a character: c
Input an integer: 1001
Input a floating-point number: 10.01

A character: c
An integer: 1001
A floating-point number: 10.010000
```

## Value & Reference in JavaScript

Như chúng ta đã thấy thì khi gọi một chương trình con `sub-program` trong C, chúng ta có thể chọn truyền `giá trị` đã lưu trữ trong một biến, hoặc truyền `địa chỉ` của vùng bộ nhớ mà biến đó đã được cấp.

Tuy nhiên thì đối với các ngôn ngữ lập trình bậc cao như JavaScript thì mọi thứ lại được tự động hóa theo một nguyên tắc nhất định mà chúng ta không thể can thiệp được. Cụ thể là khi chúng ta tạo ra một chiếc hộp lưu trữ bằng `var`, `let`, hay `const`; Sau đó truyền chiếc hộp này vào một lời gọi `sub-program` thì thứ mà `sub-program` nhận được sẽ tùy vào kiểu dữ liệu mà biến đó đang lưu trữ. Nếu như biến đó đang lưu trữ một giá trị đơn nguyên `primitive` thì thứ mà `sub-program` nhận được sẽ chính là `giá trị` đó; Còn nếu như biến đó đang lưu trữ các giá trị phức hợp kiểu như `object` thì thứ mà `sub-program` nhận được sẽ là địa chỉ tham chiếu của `object` đó.

```reference.js
const just = { value: 1001 };

const changeValue = (reference) => {
   reference.value = 10;
}

changeValue(just);
console.log(just);
// { value: 10 }
```

Trong ví dụ trên thì khi chúng ta thực hiện thao tác `changeValue(just)`, JavaScript đã không tạo ra một `object` mới là bản sao của `object` ban đầu để truyền vào vị trí của tham số `reference`; Mà thay vào đó thì địa chỉ tham chiếu của `object` đang lưu trữ tại `just` sẽ được truyền vào qua tham số `reference`, và code bên trong chương trình con `changeValue` đã có thể thay đổi nội dung của `object` ban đầu mà không cần thực hiện tham chiếu trực tiếp bằng biến `just` ngoại vi.

Hmm... C... kỳ diệu thật. :D

[[Imperative Programming + C] Bài 4 - String & Array](https://viblo.asia/p/aWj53myPZ6m)