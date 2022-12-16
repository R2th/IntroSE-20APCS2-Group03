Các mảng mới trong JavaScript có thể được tạo ra từ một vài thao tác tiềm năng là:

- Khởi tạo mảng rỗng
- Khởi tạo mảng với một số phần tử đã biết trước
- Khởi tạo mảng từ dữ liệu copy từ một mảng khác (1 phần hoặc toàn bộ)
- Khởi tạo mảng từ dữ liệu copy gộp của hai mảng khác nhau

Hãy khởi đầu với trường hợp khởi tạo một mảng rỗng.

## array_new (capacity)

Tính cho tới thời điểm hiện tại thì những kiến thức mà chúng ta đang có về C đang định hình một sự khác biệt cơ bản giữa các mảng trong C và JavaScript là tính linh động về độ dài. Một mảng trong C sẽ có dung lượng cố định và cần được chỉ định trước ngay tại thời điểm khai báo mảng chứ không thể thay đổi trong quá trình sử dụng mảng. Trong khi đó thì một mảng trong JavaScript lại có dung lượng lưu động và không cố định ở thời điểm khởi tạo.

Điều này cũng tạo ra một ràng buộc nhất định khi sử dụng mảng trong C, đó là trước khi thực hiện một thao tác bổ sung thêm các phần tử mới vào mảng; Thì chúng ta sẽ cần phải kiểm tra số lượng phần tử trong mảng (`length`) đã lấp đầy dung lượng tiềm năng (`capacity`) của mảng hay chưa.

Bởi vì nếu như chúng ta cố thực hiện lưu trữ dữ liệu vào một vùng bộ nhớ chưa xin cấp từ hệ điều hành thì sẽ có hai khả năng: Hoặc là thao tác ghi dữ liệu sẽ báo lỗi; Hoặc là thao tác ghi dữ liệu vẫn thành công nhưng sau đó dữ liệu sẽ có thể bị ghi đè bởi chương trình khác. Trong cả hai trường hợp thì chương trình của chúng ta sẽ có khả năng vận hành không như mong muốn.

Vì vậy nên `array_struct` của chúng ta nên có thêm trường `capacity` dành cho logic kiểm tra trạng thái còn chỗ trống hoặc đã đầy của mảng.

```simplicity-dsa-c/index.h
typedef double val;
typedef void* ref;

// - - - Array

typedef struct {
   void* at;
   int   length;
   int   capacity;
} array_struct;

typedef array_struct* Array;

Array array_new (int capacity);
Array array_from (void* literal, int length, int capacity);
Array array_slice (Array origin, int start, int end);
Array array_concat (Array first, Array second);
void* array_destroy (Array thearray);
```

```simplicity-dsa-c/array/new.c
#include <stdlib.h>
#include "../index.h"

Array array_new (int capacity)
   {  Array thearray = malloc (sizeof (array_struct));
      thearray->at = malloc (capacity * 8);
      thearray->length = 0;
      thearray->capacity = capacity;
      return thearray;
   }
```

Bây giờ thì chúng ta đã có thao tác khởi tạo mảng rỗng ngắn gọn hơn rất nhiều so với bài trước. Chỉ một dòng thôi. :D

```simplicity-dsa-c/test.c
#include <stdio.h>
#include "index.h"

int main ()
   {  Array thearray = array_new (1024);
      // - storing data
      ((val*) thearray->at)[0] = 10.01;
      thearray->length += 1;
      // - print some info
      printf ("The first element: %lf \n", ((val*) thearray->at)[0]);
      printf ("Length of the array: %i \n", thearray->length);
      printf ("Capacity of the array: %i \n", thearray->capacity);
      return 0;
   }
```

```CMD.io
gcc test.c array\*.c -o test
test
```

```Terminal.io
gcc test.c array/*.c -o test
test
```

```CMD|Terminal.io
The first element: 10.010000 
Length of the array: 1
Capacity of the array: 1024
```

Tuyệt, như vậy là chúng ta đã có một trình khởi tạo `array_struct` mô tả mảng rỗng với dung lượng tùy chọn. Cách thức để tạo mảng với dung lượng lưu động như JavaScript thì chúng ta sẽ suy nghĩ đến sau. Cứ biết là sẽ có cách và sẽ tìm ra được. :D

```array.js
var thearray = new Array (0);
// - storing data
thearray[0] = 10.01;
// - print some info
console.log ("The first element: " + thearray.at(0));
console.log ("Length of the array: " + thearray.length);
```

Trường hợp tiếp theo là khi chúng ta khởi tạo mảng mới và ngay lập tức liệt kê một số phần tử mà chúng ta đã biết trước.

## array_from (literal, length, capacity)

Thao tác khởi tạo một `array_struct` mà chúng ta đã định nghĩa với một số phần tử được liệt kê trước cũng hoàn toàn có thể được thu gọn trong một dòng. Các công cụ lập trình mà C cung cấp hoàn toàn có khả năng này. Tuy nhiên mình cảm thấy nếu tận dụng cú pháp tạo mảng đơn thuần `literal` mà C có sẵn sau đó thêm một dòng gọi trình khởi tạo `array_struct` thì code sẽ gọn gàng và dễ theo dõi hơn rất nhiều.

```simplicity-dsa-c/array/from.c
#include <stdlib.h>
#include "../index.h"

Array array_from (
   void* literal,
   int   length,
   int   capacity
) // -
   {  Array thearray = malloc (sizeof (array_struct));
      thearray->at = literal;
      thearray->length = length;
      thearray->capacity = capacity;
      return thearray;
   }
```

```simplicity-dsa-c/test.c
#include <stdio.h>
#include "index.h"

int main ()
   {  val numbers[1024] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
      Array thearray = array_from (numbers, 10, 1024);
      // - insert new data
      ((val*) thearray->at)[10] = 108;
      thearray->length += 1;
      // - print some info
      printf ("The first element: %lf \n", ((val*) thearray->at)[10]);
      printf ("Length of the array: %i \n", thearray->length);
      printf ("Capacity of the array: %i \n", thearray->capacity);
      return 0;
   }
```

```CMD|Terminal.io
gcc ... -o test
test

The first element: 108.000000 
Length of the array: 11
Capacity of the array: 1024
```

## array_slice (origin, start, end)

Trường hợp kế tiếp là khởi tạo một mảng mới từ nội dung sao chép được từ một mảng đã có trước. Nhiều ngôn ngữ lập trình khác như Java hay C# gọi thao tác này là `copy` còn JavaScript gọi là `slice`. Mặc dù cách nói `slice` dễ bị hiểu lầm là thao tác khiến mảng ban đầu bị thay đổi, nhưng thôi thì dùng nhiều cũng quen. :D Ở đây mình sử dụng cách đặt tên của JavaScript vì đang là một newbie JavaScript nên cứ thuận theo vậy cho quen.

Mảng ban đầu `origin` sẽ không bị thay đổi bởi trình `array_slice`, và thay vào đó thì `sub-program` này sẽ trả về một mảng mới toanh. Nội dung `copy` được sẽ là các phần tử có trị số chỉ vị trí bắt đầu từ `start` cho tới `end` nhưng không bao gồm `end`.

```simplicity-dsa-c/array/slice.c
#include <stdlib.h>
#include "../index.h"

Array array_slice (
   Array origin,
   int   start,
   int   end
) // -
   {  int index; val element;
      Array slice = array_new (origin->capacity);
      // - slice's length
      if (end > origin->length) end = origin->length;
      slice->length = end - start;
      // - copy content
      index = start - 1;
      loop: index += 1;
         element = ((val*) origin->at)[index];
         ((val*) slice->at)[index] = element;
      if (index < end) goto loop;
      return slice;
   }
```

Trong code ví dụ trên thì thao tác copy dữ liệu từ mảng ban đầu `origin` sang mảng mới `slice` được thực hiện qua con trỏ kiểu `val*`. Tuy nhiên do chúng ta đã định nghĩa kiểu `val` từ `double` và có cùng độ rộng với kiểu `ref` được định nghĩa từ `void*`; Do đó nên `sub-program` này cũng sẽ hoạt động tốt đối với cả những mảng lưu các địa chỉ tham chiếu.

Bây giờ chúng ta sẽ viết `test` sử dụng trình `array_slice` để `copy` một phần của mảng ban đầu có chứa các chuỗi. Thao tác `slice` mà chúng ta thực hiện trong  ví dụ này sẽ bỏ qua chuỗi đầu tiên trong mảng gốc và như vậy mảng kết quả sẽ có độ dài `length` nhỏ hơn một chút.

```simplicity-dsa-c/test.c
#include <stdio.h>
#include "index.h"

int main ()
   {  ref words[1024] = { "the", "quick", "brown", "fox" };
      Array origin = array_from (words, 4, 1024);
      Array slice = array_slice (origin, 1, 9);
      // - print some info
      int lastid = slice->length;
      printf ("The last element of the slice: %s \n", ((ref*) slice->at)[lastid]);
      printf ("Length of the slice: %i \n", slice->length);
      printf ("Capacity of the slice: %i \n", slice->capacity);
      return 0;
   }
```

```CMD|Terminal.io
gcc ... -o test
test

The last element of the slice: fox 
Length of the slice: 3
Capacity of the slice: 1024
```

Có lẽ JavaScript sử dụng từ `slice` là để nhấn trọng tâm vào việc tách lấy một phần dữ liệu của mảng ban đầu chứ không phải là chủ đạo để `copy` toàn bộ. Tuy nhiên trước khi cú pháp `destructuring` và phép dàn trải `spread operator` xuất hiện thì `slice` lại là một lựa chọn thường dùng cho tác vụ sao chép nội dung của một mảng.

```slice.js
var origin = new Array ("the", "quick", "brown", "fox");
var slice = origin.slice(1, Infinity);
var copy = [ ...origin ];
// - - - - - - - - -
console.log(slice);
// [ "quick", "brown", "fox" ]
// - - - - - - - - -
console.log(copy);
// [ "the", "quick", "brown", "fox" ]
```

## array_concat (first, second)

Trường hợp cuối cùng là khởi tạo mảng mới có nội dung `copy` được từ hai mảng ban đầu. JavaScript gọi đây là phép nối `concat` để nhấn vào việc nội dung của mảng thứ nhất và nội dung của mảng thứ hai sẽ được ghi nối tiếp với nhau trong mảng mới được tạo ra. Tuy nhiên về căn bản thao tác mà `sub-program` này thực hiện vẫn là `copy` và hai mảng ban đầu sẽ không bị tác động thay đổi gì về mặt nội dung.

Như vậy cũng được, chúng ta sẽ có thêm nhiều tên khác nhau để đặt cho các phiên bản khác nhau của chương trình `copy` mảng. Tuy nhiên logic biểu thị cơ bản của `concat` là nội dung của mảng thứ hai sẽ được `copy` nối tiếp vào mảng thứ nhất. Do đó nên chúng ta sẽ mặc định mảng mới được tạo ra với dung lượng `capacity` tương đương với mảng đầu tiên.

```simplicity-dsa-c/array/concat.c
#include <stdlib.h>
#include "../index.h"

Array array_concat (
   Array first,
   Array second
) // -
   {  int copyid, newid; val element;
      // - copy the first array
      Array concat = array_slice (first, 0, first->length);
      // - total length
      concat->length += second->length;
      // - copy the second array
      copyid = -1; newid = (first->length - 1);
      loop: copyid += 1; newid += 1;
         element = ((val*) second->at)[copyid];
         ((val*) concat->at)[newid] = element;
      if (copyid < second->length) goto loop;
      return concat;
   }
```

Thao tác `copy` nội dung của mảng thứ hai được thực hiện từ trị số chỉ vị trí là `copyid = 0` cho đến khi đi hết độ dài của mảng thứ hai `second->length`. Ở đây chúng ta vẫn sẽ thực hiện việc chung chuyển các `bit` dữ liệu qua con trỏ kiểu `val*` có độ rộng `8 byte` và hiển nhiên cũng sẽ hoạt động tốt với các mảng chứa địa chỉ tham chiếu.

```simplicity-dsa-c/test.c
#include <stdio.h>
#include "index.h"

int main ()
   {  // - the first array
      ref subject[1024] = { "the", "quick", "brown", "fox" };
      Array first = array_from (subject, 4, 1024);
      // - the second array
      ref action[100] = { "jumps", "over", "the", "lazy", "dog" };
      Array second = array_from (action, 5, 100);
      // - concat two arrays
      Array concat = array_concat (first, second);
      // - print some info
      int lastid = (concat->length - 1);
      printf ("The last element: %s \n", ((ref*) concat->at)[lastid]);
      printf ("Length of concat: %i \n", concat->length);
      printf ("Capacity of concat: %i \n", concat->capacity);
      return 0;
   }
```

```CMD|Terminal.io
gcc ... -o test
test

The last element: dog 
Length of concat: 9
Capacity of concat: 1024
```

Như vậy là chúng ta đã có đủ các `sub-program` hỗ trợ khởi tạo mảng mới trong các trường hợp khác nhau tương ứng với các phương thức thường gặp trong JavaScript.

```concat.js
var first = new Array ("the", "quick", "brown", "fox");
var second = new Array ("jumps", "over", "the", "lazy", "dog");
var concat = first.concat(second);
// - print some info
var lastid = concat.length - 1;
console.log("The last element: " + concat[lastid]);
console.log("Length of concat: " + concat.length);
```

## array_destroy (thearray)

Đây là một phần bổ sung nhỏ dành riêng cho C chứ không liên quan gì tới các ngôn ngữ lập trình bậc cao như JavaScript, C#, hay Java, v.v... Câu chuyện ở đây là chúng ta đang thực hiện quản lý bộ nhớ thủ công bằng chương trình xin cấp phát bộ nhớ `malloc` để tạo ra các `array_struct`; Do đó nên chúng ta sẽ cần có một `sub-program` hỗ trợ tự động hóa việc giải phóng bộ nhớ khi không còn sử dụng tới một `array_struct` nào đó.

```simplicity-dsa-c/array/destroy.c
#include <stdlib.h>
#include "../index.h"

void* array_destroy (Array thearray)
   {  free (thearray->at);
      free (thearray);
      return NULL;
   }
```

## Kết thúc bài viết

Mặc dù các chương trình `array_slice` và `array_concat` có phản ánh những chức năng khác ngoài việc khởi tạo một mảng mới. Tuy nhiên những thao tác này thực sự hoàn toàn không gây ảnh hưởng tạo ra sự thay đổi về mặt nội dung của các mảng ban đầu.

Trong khi đó thì những thao tác mang tính chất bổ sung, chỉnh sửa, xóa... trực tiếp thay đổi nội dung của mảng lại rất phổ biến; Do đó trong bài viết tiếp theo, chúng ta sẽ điểm lại những thao tác làm việc cơ bản với mảng qua ví dụ quản lý các bản ghi dữ liệu.

Qua đó chúng ta sẽ có thể hiểu rõ hơn về những ưu điểm của việc sử dụng mảng để lưu trữ dữ liệu tạm thời trong phần mềm; Và đồng thời sẽ có thể suy nghĩ về những khả năng mà JavaScript đã có thể tạo ra một giao diện lập trình sử dụng mảng có dung lượng không cố định.

[[Imperative Programming + C] Bài 14 - Simplicity DSA-C Array (tiếp theo)](https://viblo.asia/p/GrLZDoXwKk0)