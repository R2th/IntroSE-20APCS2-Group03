Ok... tuy nhiên trước khi tạo ra một `struct` để gắn thêm thuộc tính `length` cho các `array` thì chúng ta sẽ tản mạn thêm một chút về giao diện sử dụng mảng trong code mà C đã cung cấp sẵn.

## Các biến có địa chỉ liền kề

Thực tế thì ở cấp độ lưu trữ bậc thấp, chúng ta đã biết rằng khi khai báo một mảng bằng cú pháp ngoặc vuông `[]`, chúng ta thực ra đang tạo ra một dãy các ô nhớ lưu dữ liệu có độ rộng bằng nhau. Và địa chỉ của ô nhớ đầu tiên trong mảng sẽ được lưu lại vào một biến con trỏ mà chúng ta đặt tên khi khai báo mảng.

```index.h
typedef double val;
typedef void* ref;
```

```test.c
#include <stdio.h>
#include "index.h"

int main ()
   {  val numbers[128] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
      printf ("Array's Address: %p \n", numbers);
      printf ("First element: %lf \n", *(numbers+0));
      printf ("Second element: %lf \n", *(numbers+1));
      return 0;
   }
```

```CMD|Terminal.io
gcc test.c -o test
test

Array's Address: 000000000061f9e0 
First element: 0.000000 
Second element: 1.000000
```

Nếu vậy thì khi chúng ta khai báo một biến con trỏ và chỉ xin cấp một khoảng bộ nhớ vừa đủ để lưu một giá trị `val` thì cũng có thể được xem là khai báo một mảng có chứa một phần tử duy nhất.

```test.c
#include <stdio.h>
#include <stdlib.h>
#include "index.h"

int main ()
   {  val* numbers = malloc (8);
      numbers[0] = 9;
      printf ("Array's Address: %p \n", numbers);
      printf ("First element: %lf \n", numbers[0]);
      return 0;
   }
```

```CMD|Terminal.io
gcc test.c -o test
test

Array's Address: 00000000001e13d0 
First element: 9.000000
```

## Kiểu dữ liệu của array

Câu chuyện lúc này quay trở lại với các con trỏ và việc phân bổ bộ nhớ. Khi chúng ta sử dụng chương trình `malloc` để xin cấp bộ nhớ lưu trữ tạm thời từ hệ điều hành, chúng ta có thể lưu lại địa chỉ được cấp trong bất kỳ kiểu con trỏ nào như `char*`, `int*`, `float*`, v.v... Lý do là địa chỉ trả về qua chương trình `malloc` được định nghĩa kiểu `void*` và có thể được chuyển kiểu hợp lệ sang kiểu con trỏ khác bất kỳ.

Điều này còn có ý nghĩa rằng các ô nhớ được cấp phát thực ra không mô tả kiểu dữ liệu mà chúng ta lưu vào đó. Tất cả đều chỉ là các `bit` dữ liệu biểu thị giá trị `0` hoặc `1`, và rồi sau đó được nhóm với nhau ở trên bề mặt code bằng các từ khóa định kiểu `type-hinting` để giúp chúng ta biểu thị logic hoạt động mà chúng ta muốn truyền tải cho trình biên dịch `compiler`.

Ví dụ như một biến con trỏ kiểu `val` mà chúng ta đã định nghĩa từ `double` sẽ biểu thị là chúng ta có thể thực hiện thao tác đọc/ghi dữ liệu trên `8 byte = 64 bit` bộ nhớ. Và một biến con trỏ kiểu `ref` cũng có thể thực hiện thao tác đọc/ghi trên vùng bộ nhớ tương tự nếu trỏ tới cùng địa chỉ đó.

```test.c
#include <stdio.h>
#include <stdlib.h>
#include "index.h"

int main ()
   {  void* thearray = malloc (8);
      val* valarray = thearray;
      ref* refarray = thearray;
      // - - - - - - - - - - - - - - - - - -
      valarray[0] = 10.01;
      printf ("First element: %lf", refarray[0]);
      return 0;
   }
```

```CMD|Terminal.io
gcc test.c -o test
test

First element: 10.010000
```

Ồ... chúng ta đã thực hiện thao tác ghi các `bit` dữ liệu vào `8 byte` bộ nhớ được cấp thông qua một con trỏ kiểu `val`, và logic biểu thị trên bề mặt code là chúng ta đang muốn lưu thông tin mô tả giá trị số học `10.01`.

Rồi sau đó chúng ta lại thực hiện thao tác đọc dữ liệu từ `8 byte` bộ nhớ này thông qua con trỏ kiểu `ref`. Dữ liệu mà chúng ta đọc được vẫn là các `bit` dữ liệu đã được lưu trước đó, và truyền vào chương trình `printf`. Sau đó khi sử dụng `pattern` định dạng là `%lf` để biểu thị ý nghĩa của các `bit` dữ liệu này ở dạng một giá trị số học thì chúng ta lại được thấy kết quả hiển thị là `10.01`.

Điều này có ý nghĩa là chúng ta có thể tạo ra một mảng không định kiểu dữ liệu và sau đó có thể thực hiện thao tác thông qua các kiểu con trỏ khác nhau để lưu trữ và làm việc với các kiểu dữ liệu khác nhau.

```test.c
#include <stdio.h>
#include <stdlib.h>
#include "index.h"

int main ()
   {  void* thearray = malloc (10 * 8);
      val* valarray = thearray;
      ref* refarray = thearray;
      // - - - - - - - - - - - - - - - - - -
      valarray[0] = 10.01;
      refarray[1] = "Infinity";
      // - - - - - - - - - - - - - - - - - -
      printf ("First element: %lf \n", valarray[0]);
      printf ("Second element: %s \n", refarray[1]);
      return 0;
   }
```

```CMD|Terminal.io
gcc test.c -o test
test

First element: 10.010000 
Second element: Infinity
```

Và như vậy thực ra các mảng trong C mặc định cũng đều là `mixed array`. Vấn đề chính nằm ở chỗ chúng ta cần tạo ra được một giao diện để sử dụng ở bề mặt code dễ dàng hơn. Tuy nhiên các `mixed array` - hay còn được gọi là `tuple` - cũng không hẳn là quan trọng khi chúng ta đã có `struct` hoặc trong các ngôn ngữ lập trình khác thì chúng ta có thể sử dụng `map` hoặc `object` cho mục đích mô tả các bản ghi dữ liệu.

## Struct mô tả một mảng bất kỳ

Đối với các ngôn ngữ định kiểu dữ liệu tĩnh như Java, C#, thì người ra thường cung cấp một giao diện sử dụng mảng cơ bản với các dấu ngoặc vuông `[]` và yêu cầu khai báo các mảng có độ dài cố định. Như chúng ta thấy thì C cũng vậy, tuy nhiên đây chỉ là độ dài tối đa chứ không chắc chắn là số phần tử đang có mặt trong mảng. Lý do là vì các phần mềm mà chúng ta xây dựng sẽ luôn phải làm việc với tập dữ liệu có sự thay đổi.

Như vậy chúng ta nên gọi độ dài của mảng khi khai báo là dung lượng - hay `capacity`, còn độ dài như JavaScript đặt tên là `length` là để mô tả số phần tử đang có mặt trong mảng. Và định nghĩa `struct` để mô tả một `array` lưu kiểu dữ liệu bất kỳ của chúng ta sẽ có các trường như thế này.

```index.h
typedef double val;
typedef void* ref;

typedef struct {
   void* at;
   int   length;
} array_struct;

typedef array_struct* Array;
```

Tạm thời thì chúng ta sẽ chưa vội quan tâm tới cái `capacity` và thử tạo một `array_struct` để xem cú pháp sử dụng có điểm nào cần làm gọn.

```test.c
#include <stdio.h>
#include <stdlib.h>
#include "index.h"

int main ()
   {  // - - - initialize the array
      Array thearray = malloc (sizeof (array_struct));
      thearray->at = malloc (10 * 8);
      thearray->length = 0;
      // - - - store a number
      ((val*) thearray->at)[0] = 10.01;
      thearray->length += 1;
      // - - - store a string
      ((ref*) thearray->at)[1] = "Infinity";
      thearray->length += 1;
      // - - - print some info
      printf ("First element: %lf \n", ((val*) thearray->at)[0]);
      printf ("Second element: %s \n", ((ref*) thearray->at)[1]);
      printf ("Length: %i \n", thearray->length);
      return 0;
   }
```

```CMD|Terminal.io
gcc test.c -o test
test

First element: 10.010000 
Second element: Infinity
Length: 2
```

Dường như không có gì quá rườm rà và chúng ta đã có cú pháp sử dụng mảng khá giống với các phương thức của mảng trong JavaScript mà chúng ta đã làm ví dụ ở bài trước.

```array.js
var stringArray = new Array ("the", "quick", "brown", "fox");
console.log( stringArray.at(0) );   // "the"
console.log( stringArray.at(1) );   // "quick"
console.log( stringArray.length );  // 4
```

Ồ... chúng ta cần thêm một `sub-program` hỗ trợ khởi tạo mảng với một số giá trị cho trước. Thêm vào đó thì các mảng thường được sử dụng để mô tả một bảng dữ liệu gồm các bản ghi giống như một cơ sở dữ liệu mini trong các chương trình; Do đó chúng ta sẽ tìm hiểu thêm một chút về các thao tác phổ biến khi làm việc với mảng và xây dựng một vài `sub-program` để hỗ trợ các thao tác này.

[[Imperative Programming + C] Bài 13 - Simplicity DSA-C Array (tiếp theo)](https://viblo.asia/p/YWOZrP0Y5Q0)