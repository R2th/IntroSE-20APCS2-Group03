Bên cạnh cấu trúc `if..else` hỗ trợ điều khiển logic thực thi code dựa trên điều kiện được cung cấp, thì C còn cung cấp một bộ công cụ khác giúp thay đổi trình tự thực thi các câu lệnh. Đó là lệnh `goto` và thao tác gắn nhãn `label:` cho một câu lệnh đơn hoặc một khối lệnh nào đó.

## goto label;

Logic hoạt động của câu lệnh này rất đơn giản. Trình thực thi code sẽ di chuyển thẳng tới vị trí câu lệnh đơn hoặc khối lệnh nào đó ở trong cùng phạm vi của `sub-program` hiện tại và có gắn nhãn `label:`.

```Documents\imperative-programming-c\0023-goto-label\main.c
#include <stdio.h>

int main() {
   goto label;

   printf("This statement should be ignored.");

   label: printf("This statement is labeled.");
   
   // - - - - - - - - - - - - - - - - - -
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

This statement is labeled.
```

Trong đó thì tên nhãn `label` có thể được đặt tùy ý miễn sao không phải là một từ khóa đã được định nghĩa sẵn của C hoặc tên biến hay tên một chương trình con nào đó.

## goto loop;

Chức năng của câu lệnh `goto label;` không bị giới hạn là phải luôn di chuyển tới một vị trí được gắn nhãn `label:` sau đó. Chúng ta hoàn toàn có thể sử dụng `goto label;` ở vị trí đứng sau điểm được gắn nhãn `label:` để lặp lại tiến trình thực thi một đoạn code. Tuy nhiên trong trường hợp này thì chúng ta sẽ cần thiết lập thêm một cơ chế để dừng việc xoay vòng từ `goto label;` sau một số lần lặp hữu hạn.

```Documents\imperative-programming-c\0024-goto-loop\main.c
#include <stdio.h>

int main() {
   int count = 0;
   // - - - - - - - - - - - - - - - - - -
   loop: count += 1;
      printf("Do something ... \n");
      printf("Looped %i time(s) \n", count);
   if (count < 9) goto loop;
   // - - - - - - - - - - - - - - - - - -
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Do something ...
Looped 1 time(s)
Do something ...
Looped 2 time(s)
Do something ...
Looped 3 time(s)
Do something ...
Looped 4 time(s)
Do something ...
Looped 5 time(s)
Do something ...
Looped 6 time(s)
Do something ...
Looped 7 time(s)
Do something ...
Looped 8 time(s)
Do something ...
Looped 9 time(s)
```

Trong code ví dụ ở trên, chúng ta có hai điểm nối mở đầu và kết thúc vòng lặp là vị trí gắn nhãn `loop:` và vị trí xét điều kiện để quay trở lại bằng `goto loop;`.

Các câu lệnh ở giữa hai điểm này có thể được viết thẳng hàng mà không cần thụt vào thêm một khoảng như trong code ví dụ. Tuy nhiên nếu viết thụt vào như vậy chúng ta sẽ dễ quan sát hơn. Và đồng thời những câu lệnh ảnh hưởng tới biến xét điều kiện như biến `count` trong ví dụ trên nên được đặt ở ví trí đầu hoặc cuối của vòng lặp, hoặc viết lùi lại ngang hàng với hai điểm nối mở đầu vòng lặp và xét điều kiện lặp.

## Các cú pháp lặp

Việc cần phải viết code để tự động lặp lại một số thao tác xử lý là rất phổ biến và vì vậy nên C có cung cấp các cú pháp lặp mà mình thường gọi là [các cú pháp vòng lặp nguyên thủy](https://viblo.asia/p/LzD5dR60ZjY).

Tất cả các cú pháp này về cơ bản là được đưa ra để chúng ta không phải viết các lệnh `goto` và đặt nhiều tên `loop_label` khi cần viết nhiều vòng lặp trong cùng một đoạn code. Nhờ vậy thì code viết bởi nhiều người khác sau sẽ có giao diện chung về các từ khóa tượng trưng cho vòng lặp như `for`, `while`, `do..while`.

Tuy nhiên thì mỗi lựa chọn đều có lợi điểm riêng và mình chọn tiếp tục sử dụng `goto label;` để tự tạo các logic code lặp trong C. Lý do là bởi vì mình không học C để thi Hackathon hay hướng đến lập trình nhúng trên các thiết bị đầu cuối, vì vậy nên sẽ không quan tâm mấy tới những cú pháp "ngắn gọn" sẵn có của C.

Thay vào đó thì mình muốn sử dụng những công cụ cơ bản của C cung cấp để xây dựng nên những công cụ cần sử dụng có cú pháp thân thiện với một newbie JavaScript. :D

[[Imperative Programming + C] Bài 9 - Header & Preprocessor](https://viblo.asia/p/bWrZnQBrKxw)