Sau khi đã hiểu được lơ mơ về việc tổ chức lưu trữ dữ liệu cấp thấp thì mối quan tâm tiếp theo của mình là làm thế nào để có thể lưu trữ và sử dụng được một mảng các giá trị? Cụ thể là làm thế nào để có thể lưu trữ và sử dụng một series các ký tự chữ viết được sắp xếp cạnh nhau mà chúng ta hay gọi là một chuỗi `string` như trong JavaScript? Câu hỏi này lại tiếp tục dẫn mình tới với những kiến thức và thao tác khác liên quan tới `pointer`.

## String in C

Để lưu trữ được nhiều ký tự chữ cái liền nhau thì chúng ta chỉ đơn giản là thực hiện đăng ký quyền sử dụng một phần bộ nhớ rộng hơn thôi. :D

```Documents\imperative-programming-c\0007-get-a-string\main.c
#include <stdio.h>
#include <stdlib.h>

int main() {
   char* stringRef = malloc(24 * sizeof(char));
   printf("Input your name: ");  scanf("%s", stringRef);
   // - - - - - - - - - - - - - - - - - -
   printf("Hello, %s", stringRef);
   free(stringRef);
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Input your name: Semi Art
Hello, Semi
```

Ấy... kết quả in ra lại thiếu mất một phần chuỗi đã nhập vào. Chắc chắn không phải là do thiếu bộ nhớ để lưu trữ kết quả nhập liệu. Ở đoạn `malloc` mình đã thử đăng ký `24` khoảng nhỏ để lưu các ký tự. Mà cái nội dung nhập thử thì dài chưa tới chục ký tự.

Sau khi Google thêm 1 lượt thì mình mới biết rằng cái này là do thiết kế của trình `scanf`. Khi hoạt động với `pattern` được cung cấp là `%s`, thì chương trình nhỏ này sẽ chỉ quét tới khi gặp một ký tự khoảng trống. Nếu muốn thay đổi phương thức hoạt động này thì chúng ta cần thay đổi cái `pattern` truyền vào thành `%[^\n]s` - cách sử dụng `pattern` của `scanf` là một dạng biểu thị `RegExp` đã được biết tới khi học [JavaScript](https://viblo.asia/p/Qbq5QRv4KD8).

Mình nghĩ đoạn này cũng không cần phải phân tích rõ ngữ nghĩa của từng thứ trong cái `pattern` kia đâu. Cứ nhớ mặc định luôn cái `pattern` đó là sử dụng để `scan` chuỗi có kèm các khoảng trống giữa các từ là được. :D Còn ở vị trí gọi trình in `printf` thì cái `%s` sẽ chỉ đơn giản là định dạng nội dung được lưu trong vùng bộ nhớ `stringRef` thành một chuỗi ký tự được in ra liền nhau.

## Array in C

Trong ví dụ ở phần trên thì cũng chính là chúng ta đã tạo ra một mảng rồi. Đó là một mảng các ký tự đơn được lưu trữ liền kề nhau. Định nghĩa mảng trong các ngôn ngữ lập trình nói chung còn có một phần gắn với thao tác truy xuất các phần tử trong mảng. Đó là một cấu trúc dữ liệu có thể được truy xuất từng phần bằng trị số chỉ vị trí của các phần tử.

```Documents\imperative-programming-c\0008-using-array\main.c
#include <stdio.h>
#include <stdlib.h>

int main() {
   char* stringRef = malloc(24 * sizeof(char));
   printf("Input your name: ");  scanf("%[^\n]s", stringRef);
   // - - - - - - - - - - - - - - - - - -
   printf("First  character: %c \n", *(stringRef + 0));
   printf("Second character: %c \n", *(stringRef + 1));
   printf("Third  character: %c \n", *(stringRef + 2));
   printf("Fourth character: %c \n", *(stringRef + 3));
   // - - - - - - - - - - - - - - - - - -
   free(stringRef);
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Input your name: Semi Art

First  character: S
Second character: e
Third  character: m
Fourth character: i
```

Ở đây tao tác in ra một ký tự đơn với `pattern` là `%c` đã khá quen thuộc rồi. Việc lấy ra một giá trị đã lưu trữ thông qua con trỏ bằng cú pháp `*ref` cũng không có gì xa lạ. Tuy nhiên mấy phép toán cộng `+` thao tác trên địa chỉ lưu trữ thì lại là thứ hoàn toàn mới.

Khi chúng ta tạo ra con trỏ `stringRef` và trỏ tới một vùng bộ nhớ do `malloc` đăng ký. Địa chỉ được lưu lại thực ra là địa chỉ đại diện của khoảng bộ nhớ đầu tiên trong dãy `24` khoảng có độ rộng `char` được hệ điều hành cấp cho. Thao tác đọc `*` sẽ chỉ lấy ra duy nhất giá trị lưu trong khoảng nhỏ đầu tiên.

Để lấy ra giá trị `char` tiếp theo thì chúng ta cần thay đổi vị trí bắt đầu thao tác đọc `*`. Và phép toán `stringRef + 1` không phải là một phép cộng số học, mà là thao tác tính địa chỉ của khoảng `char` tiếp theo dựa trên địa chỉ `stringRef` ban đầu. Tương tự, phép toán `stringRef + 2` sẽ là để tính địa chỉ của khoảng `char` kế tiếp, v.v... Có lẽ đây là lý do mà các lập trình viên đều bắt đầu đếm từ `0`. :D

## Giao diện lập trình bậc cao

Việc hiểu được sơ bộ về quản lý bộ nhớ và giao diện lập trình cấp thấp của C rất quan trọng. Điều này đã giúp mình làm rõ được một vài thắc mắc trong logic vận hành của JavaScript. Tuy nhiên về mặt cú pháp sử dụng thì C có cung cấp thêm giao diện lập trình thân thiện với các ngôn ngữ bậc cao và chúng ta cứ nên tìm hiểu để sử dụng hết khả năng đã. :D

Để tạo ra một mảng như trong ví dụ trên thì chúng ta còn có thể viết như sau:

```Documents\imperative-programming-c\0009-array-common-syntax\main.c
#include <stdio.h>
#include <stdlib.h>

int main() {
   char stringRef[24];
   printf("Input your name: ");  scanf("%[^\n]s", stringRef);
   // - - - - - - - - - - - - - - - - - -
   printf("First character : %c \n", stringRef[0]);
   printf("Second character: %c \n", stringRef[1]);
   printf("Third character : %c \n", stringRef[2]);
   printf("Fourth character: %c \n", stringRef[3]);
   // - - - - - - - - - - - - - - - - - -
   return 0;
}
```

Cách viết này rất thân thiện hơn và rất gần gũi với cú pháp sử dụng mảng trong JavaScript. Ở đây `stringRef` vẫn là một `pointer` và được truyền vào `scanf` như code ví dụ trước đó. Thao tác đăng ký một vùng bộ nhớ rộng `24` ký tự đơn được biểu thị ngắn gọn hơn, và thao tác trả lại vùng bộ nhớ này ở cuối chương trình đã được tự động xử lý ngầm định. Thao tác đọc từng ký tự đơn cũng được thu gọn với cú pháp tương đồng như JavaScript.

Chắc chắn là nếu như gắn bó với C một cách nghiêm túc thì chúng ta vẫn sẽ phải sử dụng tốt giao diện lập trình cấp thấp. Đồng thời sẽ phải quen với việc tự viết code quản lý bộ nhớ lưu trữ dữ liệu tạm thời với `malloc()` và `free()`. 

Tuy nhiên mục tiêu của mình khi bắt đầu Sub-Series này không phải là một cột mốc xa xôi trong lập trình C; Mà chỉ là để hiểu được thêm một vài khái niệm căn bản trong lập trình, để giúp mình hiểu rõ hơn mỗi thao tác mà mình thực hiện trên nền JavaScript nói riêng, và tiến trình chung chung để kiến trúc nên một phần mềm nào đó mà mình mong muốn. Do đó nên mình sẽ ưu tiên sử dụng giao diện lập trình đơn giản và gần với cú pháp của JavaScript hơn. :D

## Khởi tạo nội dung String & Array

Đây là trường hợp khi chúng ta muốn khởi tạo một chuỗi hoặc mảng có nội dung định trước mà không phải là chờ từ nguồn nhập liệu bởi người dùng hoặc code bên ngoài. Lúc này do nội dung lưu trữ đã được biết trước nên chúng ta có thể không ghi độ rộng của mảng và để trình biên dịch tự động tính toán từ số phần tử được khởi tạo. Hiển nhiên, sau đó độ rộng của mảng sẽ là cố định và nếu chúng ta muốn bổ sung thêm phần tử mới thì sẽ cần tạo mảng khác hoặc phân bổ lại bộ nhớ bằng `malloc` nếu cần thiết. :D

```Documents\imperative-programming-c\0010-literal-string-array\main.c
#include <stdio.h>
#include <stdlib.h>

int main() {
   char name[] = "Semi Art";
   int sequence[] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
   // - - - - - - - - - - - - - - - - - -
   printf("Name: %s \n", name);
   printf("Number: %i \n", sequence[9]);
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Name: Semi Art
Number: 9
```

## String & Array in JavaScript

```main.js
var name = "Semi Art";
var sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// - - - - - - - - -
console.log(`Name: ${name}`);
console.log(`Number: ${sequence[9]}`);
```

À... thì ra C... cũng không rườm rà lắm. :D

[[Imperative Programming + C] Bài 5 - Sub-Program & Macro](https://viblo.asia/p/LzD5domWljY)