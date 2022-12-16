Sau khi đã xem qua sơ lược nội dung thư viện tiêu chuẩn của C thì mình mới chợt nhận ra là C không cung định nghĩa sẵn cho các kiểu dữ liệu tổ hợp phổ biến kiểu như `Map` hay `Set` của JavaScript. Ngay cả đối với `Array` thì C cũng không có nhiều công cụ định nghĩa sẵn để hỗ trợ các thao tác chỉnh sửa, ghép nối nhanh các mảng bất kỳ.

## Data Structures & Applications

Điều này đã khiến mình phải thay đổi kế hoạch viết các chương trình nhỏ sang một hướng đi khác. Đó là xây dựng các kiểu dữ liệu tổ hợp phổ biến và các phương thức để làm việc với các kiểu dữ liệu đó. Sau một hồi Google thì mình có tóm được một cái chủ đề rất phù hợp với nhu cầu là `Data Structures & Algorithms (DSA)` - thấy thường được dịch là "Cấu Trúc Dữ Liệu & Giải Thuật".

Tuy nhiên bản thân mình lại không có ý định đặt nặng vấn đề nghiên cứu giải thuật ở thời điểm hiện tại. Lý do là lớp ứng dụng mình hướng tới không cần kiến thức ở dạng tối ưu hiệu năng xử lý hay thứ gì đó cao siêu cả. Thứ mình muốn chỉ là tìm hiểu cách thức xây dựng nên những công cụ lập trình phổ biến từ các công cụ thô sơ mà C cung cấp. Qua đó để có thể hiểu hơn về những thao tác mà mình thực hiện trong code JavaScript ở tầng xây dựng web và ứng dụng desktop.

Vì vậy nên ở đây mình thay từ `Algorithms` bằng `Applications` và một project nho nhỏ có tên là `simplicity-dsa-c` sẽ được bắt đầu từ bài viết này. Mục tiêu là để xây dựng một thư viện bao gồm các cấu trúc dữ liệu `Data Structures` như kiểu `Map`, `Set`, v.v... và các phương thức hỗ trợ các thao tác làm việc với các kiểu dữ liệu này.

## Value & Reference

Xuyên suốt cái `project` nho nhỏ này thì cũng là tiến trình mà mình cập nhật dần những lỗ hổng kiến thức về các khái niệm đã giới thiệu trong các bài viết trước đó. Cụ thể là trong bài viết mở đầu này thì mình chọn ôn lại một chút kiến thức về việc sử dụng các biến trong C để lưu trữ các giá trị đơn nguyên và các địa chỉ tham chiếu.

Như đã biết thì chúng ta có thể sử dụng các từ khóa như `int`, `char`, `float`, v.v... để khai báo các biến lưu trữ các giá trị đơn nguyên thuộc các kiểu này. Đồng thời thì chúng ta cũng có thể tạo ra các biến con trỏ để lưu trữ địa chỉ tham chiếu tới các vùng bộ nhớ lưu trữ các giá trị đó bằng cách thêm hậu tố `*` sau các từ khóa định kiểu vừa đề cập.

```main.c
#include <stdio.h>

int main ()
   {  float value = 10.01;
      float* reference = &value;
      // - - - - - - - - - - - - - - - - - -
      printf ("Stored value: %f \n", value);
      printf ("Stored reference: %p \n", reference);
      // - - - - - - - - - - - - - - - - - -
      return 0;
   }
```

```CMD|Terminal.io
gcc main.c -o main
main

Stored value: 10.010000 
Stored reference: 000000000061fde4
```

Nói riêng về các biến con trỏ `pointer` được sử dụng để lưu trữ địa chỉ tham chiếu ví dụ như biến `reference` trong ví dụ ở trên. Thực tế thì độ dài của chuỗi mô tả địa chỉ này là cố định đối với mọi kiểu dữ liệu. Khi chúng ta tạo ra một biến con trỏ thì C sẽ tự động phân bổ một vùng bộ nhớ rộng `8 byte = 64 bit` để lưu một chuỗi địa chỉ tham chiếu bất kỳ mà chúng ta gán vào sau đó.

```main.c
#include <stdio.h>

int main ()
   {  printf ("Size of char*  : %i bit \n", 8 * sizeof (char*));
      printf ("Size of int*   : %i bit \n", 8 * sizeof (int*));
      printf ("Size of float* : %i bit \n", 8 * sizeof (float*));
      // - - - - - - - - - - - - - - - - - -
      return 0;
   }
```

```CMD|Terminal.io
gcc main.c -o main
main

Size of char*  : 64 bit
Size of int*   : 64 bit
Size of float* : 64 bit
```

Ồ... như vậy việc khai báo các biến con trỏ khác kiểu có lẽ chỉ là để hướng dẫn cho trình biên dịch hiểu được thao tác đọc giá trị lưu trữ thông qua một con trỏ nên được thực hiện như thế nào. Ví dụ như biến con trỏ kiểu `char*` thì thao tác đọc `*reference` sẽ tách lấy giá trị được lưu trong `1 byte = 8 bit` tính từ ô nhớ đang được trỏ tới; Còn biến con trỏ kiểu `float*` thì thao tác đọc `*reference` sẽ tách lấy giá trị được lưu trong `4 byte = 32 bit`.

Việc phân chia các kiểu dữ liệu đơn nguyên trong C có lẽ chỉ nhằm mục đích tối ưu sử dụng bộ nhớ đối với môi trường lập trình nhúng `embedded`, nơi mà các thiết bị có tài nguyên về bộ nhớ đệm rất hữu hạn. Còn đối với các ứng dụng ở lớp phổ thông như chúng ta viết bằng JavaScript hay các ngôn ngữ lập trình bậc cao tương đương thì sự tối ưu này không hẳn là cần thiết và sẽ tạo ra giao diện lập trình có phần hơi rườm rà.

Có lẽ chúng ta sẽ có thể chọn ra duy nhất một kiểu dữ liệu có độ rộng phổ biến nhất để lưu bất kỳ giá trị đơn nguyên nào. Và sau đó thì ở thao tác đọc giá trị đã lưu thì chúng ta sẽ có thể tạo ra tùy chỉnh để thu được kết quả phù hợp với mục đích sử dụng. Như vậy thì chúng ta sẽ không cần phải ghi nhớ chi tiết hết các kiểu dữ liệu trong C, trừ khi chạm tới tầng ứng dụng cấp thấp như lập trình nhúng `embedded`.

## Types & Conversion

Cụ thể là sau một lượt Google thì mình có thêm thông tin về kiểu Number của JavaScript là kiểu số thực `double 64bit` (8 byte); Và trong các ngôn ngữ khác như Java hay C# và C ở đây thì kiểu dữ liệu này cũng được gọi với tên tương tự. Cũng giống với kiểu `float` mà chúng ta đã sử dụng từ đầu Series tới giờ thôi, nhưng có độ rộng lưu trữ gấp 2 lần và như vậy sẽ có khả năng lưu trữ các giá trị số học ở biên độ rộng hơn gấp 2 lần. :D

```main.c
#include <stdio.h>
#include <float.h>

int main ()
   {  double value = DBL_MAX;
      printf ("Max value of double: %lf", value);
      // - - - - - - - - - - - - - - - - - -
      return 0;
   }
```

Ở đây có một chút lưu ý là thao tác `printf` in ra giá trị `double` thì chúng ta cần sử dụng `pattern` là `%lf` (long float) - vẫn là `float` nhưng mà dài hơn một chút. :D

```CMD|Terminal.io
gcc main.c -o main
main

Max value of double: 179769313486231570814527423731704356798070567525844996598917476803157260780028538760589558632766878171540458953514382464234321326889464182768467546703537516986049910576551282076245490090389328944075868508455133942304583236903222948165808559332123348274797826204144723168738177180919299881250404026184124858368.000000
```

Đó là khả năng lưu trữ giá trị cực đại. Biên giá trị còn lại là giá trị âm của `DBL_MAX` có chênh lệch một chút không đáng kể. Nhưng có lẽ là chúng ta sẽ không mấy khi phải quan tâm tới hai giá trị biên này trong các ứng dụng phổ thông.

Không chỉ các giá trị số học. Chúng ta cũng có thể sử dụng kiểu `double` để lưu trữ các ký tự đơn mà trước đó chúng ta đã sử dụng kiểu `char`. Lý do là bởi vì các ký tự đơn chỉ có ý nghĩa biểu thị ở bề mặt code và bề mặt hiển thị, còn thực tế thì dữ liệu lưu xuống các ô nhớ vẫn là các `bit` giá trị `0` hoặc `1`. Và thao tác đọc kiểu `char` thực ra sẽ đọc được một giá trị số học lưu trữ trong `1 byte = 8 bit` bộ nhớ đầu tiên tính từ ô nhớ đang được trỏ tới. Sau đó chuyển đổi giá trị số học này thành một ký tự ở bề mặt biểu thị ví dụ như khi `printf`.

```main.c
#include <stdio.h>

int main ()
   {  double value = (double) 'a';
      // - - - - - - - - - - - - - - - - - -
      printf ("Stored value as double: %lf \n", value);
      printf ("Stored value as integer: %i \n", (int) value);
      printf ("Stored value as character: %c \n", (char) value);
      // - - - - - - - - - - - - - - - - - -
      return 0;
   }
```

Thao tác đặt một cái `(type-hint)` đứng ngay phía trước các giá trị như trong ví dụ trên được gọi là ép hay chuyển đổi kiểu dữ liệu. Thực tế thì thao tác này chỉ cần thiết khi chúng ta muốn chuyển từ kiểu dữ liệu có độ rộng lưu trữ lớn hơn về kiểu có độ rộng nhỏ hơn. Và ở vị trí lưu ký tự `a` vào biến `value` hoàn toàn có thể để C tự động thực hiện chuyển kiểu vì trình biên dịch đã có đủ thông tin từ kiểu ban đầu `char` và kiểu lưu trữ `double`.

```CMD|Terminal.io
Stored value as double: 97.000000
Stored value as integer: 97
Stored value as character: a
```

Tuyệt... như vậy chúng ta sẽ chỉ cần định nghĩa một kiểu dữ liệu đơn nguyên duy nhất khi cần tạo ra các biến lưu dữ liệu tạm thời. Còn ở thời điểm truy xuất và sử dụng thì tùy mục đích để xem xét việc chuyển kiểu dữ liệu cho phù hợp. :D

```main.c
#include <stdio.h>

typedef double val;

int main ()
   {  val number = 10.01;
      printf ("Stored number: %lf \n", number);
      // - - - - - - - - - - - - - - - - - -
      val character = 'a';
      printf ("Stored character: %c \n", (char) character);
      // - - - - - - - - - - - - - - - - - -
      return 0;
   }
```

```CMD|Terminal.io
gcc main.c -o main
main

Stored number: 10.010000
Stored character: a
```

Khá giống với JavaScript rồi. :D Bây giờ còn một trường hợp nữa là khi làm việc với các kiểu dữ liệu phức hợp. Lúc này hiển nhiên chúng ta sẽ cần tạo ra các biến con trỏ `pointer` để lưu trữ địa chỉ tham chiếu của một khối dữ liệu, ví dụ như một chuỗi, một mảng, hay một `struct`, v.v... 

Trong trường hợp này thì C có cho phép tạo ra con trỏ kiểu `void*` để lưu địa chỉ tham chiếu của một kiểu bất kỳ. Và chúng ta cũng có thể chuyển đổi kiểu con trỏ từ `void*` tới các kiểu khác như `char*`, `int*`, `double*`, `struct something*`, v.v... để thực hiện các thao tác làm việc với kiểu dữ liệu tương ứng.

```main.c
#include <stdio.h>

typedef void* ref;

int main ()
   {  ref message = "infinity";
      printf ("Stored reference: %p \n", message);
      // - - - - - - - - - - - - - - - - - -
      char* charRef = message;
      printf ("First letter: %c \n", charRef[0]);
      printf ("Stored string: %s \n", charRef);
      // - - - - - - - - - - - - - - - - - -
      return 0;
   }
```

```CMD|Terminal.io
gcc main.c -o main
main

Stored reference: 000000000040a000
First letter: i
Stored string: infinity
```

Ở đây biến con trỏ `message` sẽ lưu địa chỉ tham chiếu tới ô nhớ đầu tiên của một vùng bộ nhớ mô tả chuỗi `infinity` mà không quan tâm tới vùng bộ nhớ đó rộng bao nhiêu hay kiểu dữ liệu là gì.

Sau đó nếu như chúng ta không thực hiện thao tác chuyển kiểu con trỏ sang `char*` mà thử đọc ký tự đầu tiên trong chuỗi bằng `message[0]` thì sẽ gặp thông báo lỗi. Lý do là kiểu `void*` không mô tả được cho trình biên dịch kiểu dữ liệu của các phần tử trong mảng đã lưu. Tuy nhiên khi chuyển sang `char*` sau đó thực hiện truy xuất thì trình biên dịch sẽ hiểu là cần đọc `1 byte = 8 bit` đầu tiên để lấy ra ký tự thứ nhất.

Tuyệt, như vậy chúng ta sẽ khởi đầu cái `project` nho nhỏ với hai kiểu khai báo biến đại diện là `double` và `void*`. :D

```simplicity-dsa-c/index.h
typedef double val;
typedef void* ref;
```

Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu về mảng `Array` và xây dựng các `sub-program` hỗ trợ làm việc với các mảng.

[[Imperative Programming + C] Bài 11 - Simplicity DSA Array (mở đầu)](https://viblo.asia/p/oOVlY0dnZ8W)