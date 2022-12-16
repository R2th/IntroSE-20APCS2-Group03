Như vậy là chúng ta đã có các `sub-program` hỗ trợ việc khởi tạo các `Array` mới trong các tình huống ứng dụng khác nhau. Tiếp theo chúng ta sẽ cùng xem lại một số thao tác cơ bản làm việc với mảng và đặt một chút suy nghĩ về vấn đề tạo mảng với độ dài linh động như JavaScript.

## Data Table

Ngoài việc được sử dụng để lưu trữ các dải giá trị số học hay các chuỗi rời rạc, các mảng thường được sử dụng như các bảng dữ liệu lưu trữ các bản ghi như một `database` nho nhỏ trong các chương trình. Trường hợp mô tả các bảng dữ liệu có thể được hiểu đơn giản là khi chúng ta lưu trữ các `struct` bản ghi dữ liệu trong mảng. Lúc này mỗi một `struct` bản ghi dữ liệu sẽ là một hàng trong bảng, và mỗi trường dữ liệu của `struct` chính là tên cột trong bảng.

Nhân tiện khi nói tới ví dụ này thì chúng ta sẽ tạo một `struct` bản ghi dữ liệu để sử dụng xuyên suốt cái `project` nho nhỏ `simplicity-dsa-c`. Đối tượng dữ liệu ở đây sẽ là các bản ghi mô tả thông tin bìa của các cuốn sách có tên là `Book`. Ở đây mình sẽ liệt kê lại một chút về cấu trúc thư mục hiện tại của `simplicity-dsa-c`.

```project-folder.txt
[simplicity-dsa-c]
.  |
.  +-----test.c
.  +-----index.h
.  |
.  +-----[array]
.  |        |
.  |        +-----new.c
.  |        +-----from.c
.  |        +-----slice.c
.  |        +-----concat.c
.  |        +-----destroy.c
.  |
.  +-----[book]
.           |
.           +-----new.c
.           +-----print.c
.           +-----destroy.c
```

Bổ sung định nghĩa `struct_book` và các `sub-program` làm việc với `Book`.

```index.h
typedef double val;
typedef void* ref;

// - Array - - - - - - - - - - - - - - - - -

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

// - Book - - - - - - - - - - - - - - - - -

typedef struct {
   int id;
   ref title;
   ref author;
   val rating;
} book_struct;

typedef book_struct* Book;

Book book_new (int id, ref title, ref author, val rating);
void book_print (Book thebook);
void book_destroy (Book thebook);
```

```book/new.c
#include <stdlib.h>
#include "../index.h"

Book book_new (
   int id,
   ref title,
   ref author,
   val rating
) // -
   {  Book newbook = malloc (sizeof (book_struct));
      newbook->id = id;
      newbook->title = title;
      newbook->author = author;
      newbook->rating = rating;
      return newbook;
   }
```

## Create Table

Chúng ta sẽ khởi đầu với việc tạo một bảng dữ liệu có sẵn một vài bản ghi và in ra màn hình.

```test.c
#include <stdio.h>
#include "index.h"

void print_header ();
void print_data (Array booktable);
void print_row (Book abook);

int main ()
   {  Book laotzu = book_new (0, "Tao Te Ching", "Lao Tzu", 9.0);
      Book lotus = book_new (1, "Lotus Sutra", "Buddha", 10.0);
      Book yoga = book_new (2, "Yoga Sutra", "Patanjali", 9.8);
      // - CREATE TABLE - - - - - - - - - - - - - - - - -
      Book literal[10000] = { laotzu, lotus, yoga };
      Array booktable = array_from (literal, 3, 10000);
      // - PRINT TABLE - - - - - - - - - - - - - - - - -
      print_header ();
      print_data (booktable);
      return 0;
   }

void print_header ()
   {  printf ("+------------+---------------------------+------------------+-------------+ \n");
      printf ("|  Id        |  Title                    |  Author          |  Rating     | \n");
      printf ("+------------+---------------------------+------------------+-------------+ \n");
   }

void print_data (Array booktable)
   {  int index; Book selected;
      if (booktable->length == 0) return;
      // - else print - - - - - - - - - - - - - - - - -
      index = -1;
      loop: index += 1;
         selected = ((ref*) booktable->at)[index];
         print_row (selected);
      if (index < booktable->length - 1) goto loop;
   }

void print_row (Book abook)
   {  printf (
         "|  %-9i |  %-24s |  %-15s |  %-10.1lf | \n",
         abook->id, abook->title, abook->author, abook->rating
      );
      printf ("+------------+---------------------------+------------------+-------------+ \n");
   }
```

```CMD.io
gcc test.c array\*.c book\*.c -o test
```

```Terminal.io
gcc test.c array/*.c book/*.c -o test
```

```CMD|Terminal.io
test

+-----------+---------------------------+------------------+-------------+ 
|  Id       |  Title                    |  Author          |  Rating     | 
+-----------+---------------------------+------------------+-------------+ 
|  0        |  Tao Te Ching             |  Lao Tzu         |  9.0        | 
+-----------+---------------------------+------------------+-------------+ 
|  1        |  Lotus Sutra              |  Buddha          |  10.0       | 
+-----------+---------------------------+------------------+-------------+ 
|  2        |  Yoga Sutra               |  Patanjali       |  9.8        | 
+-----------+---------------------------+------------------+-------------+
```

## Insert Into

Thao tác đầu tiên là chèn thêm bản ghi mới vào bảng tại một thời điểm bất kỳ và giả định là chúng ta không biết chính xác số lượng bản ghi đã có mặt trong bảng. Ở đây chúng ta sẽ cần tạo `id` cho bản ghi mới dựa trên `id` của bản ghi mới nhất.

```test.c
int main ()
   {  // - CREATE TABLE - - - - - - - - - - - - - - - - - - - -
      // - GENERATE ID - - - - - - - - - - - - - - - - - - - -
      int lastindex = booktable->length - 1;
      Book lastrecord = ((ref*) booktable->at)[lastindex];
      int newbookid = lastrecord->id + 1;
      // - ÍNSERT INTO - - - - - - - - - - - - - - - - - - - -
      Book theprophet = book_new (newbookid, "The Prophet", "Kahlil Gibran", 9.0);
      int index = booktable->length;
      ((ref*) booktable->at)[index] = theprophet;
      booktable->length += 1;
      // - PRINT TABLE - - - - - - - - - - - - - - - - -
   }
```

```CMD|Terminal.io
gcc ... -o test
test

+-----------+---------------------------+------------------+-------------+ 
|  Id       |  Title                    |  Author          |  Rating     | 
+-----------+---------------------------+------------------+-------------+ 
|  0        |  Tao Te Ching             |  Lao Tzu         |  9.0        | 
+-----------+---------------------------+------------------+-------------+ 
|  1        |  Lotus Sutra              |  Buddha          |  10.0       | 
+-----------+---------------------------+------------------+-------------+ 
|  2        |  Yoga Sutra               |  Patanjali       |  9.8        | 
+-----------+---------------------------+------------------+-------------+ 
|  3        |  The Prophet              |  Kahlil Gibran   |  9.0        | 
+-----------+---------------------------+------------------+-------------+
```

Ồ... mặc dù chúng ta chỉ vừa mới thực hiện một thao tác căn bản đó là thêm một bản ghi vào bảng dữ liệu vào vị trí tiếp theo trong bảng. Tuy nhiên ngay sau thao tác này thì chúng ta đã có đủ chất liệu để đặt ra một số câu hỏi về giới hạn của việc sử dụng mảng.

Rõ ràng là nếu như chúng ta chèn bản ghi mới vào một vị trí trước đó, ví dụ như ngay sau bản ghi đầu tiên có trị số `index=0`; Và nếu như chúng ta đang có `1001` bản ghi trong bảng tại thời điểm thực hiện thao tác chèn bản ghi mới, thì chúng ta sẽ phải lặp qua `1000` bản ghi tính từ bản ghi có `index=1` để di chuyển từng bản ghi tiến về phía trước để tạo chỗ trống cho bản ghi mới.

Hoặc khi xóa một bản ghi nào đó ở vị trí giữa mảng có `index=n` thì chúng ta cũng sẽ phải thực hiện thao tác ngược lại. Đó là lặp qua tất cả các bản ghi tính từ `index=n+1` để di chuyển từng bản ghi lùi lại một bước để lấp chỗ trống của bản ghi vừa xóa.

Mặc dù logic xử lý ở đây cũng không có gì quá khó thực hiện, tuy nhiên điều này cũng cho thấy rằng ngoài đặc tính có dung lượng lưu trữ cố định thì mảng còn có một chút sự bất tiện trong thao tác quản lý dữ liệu trong những trường hợp nhất định. Và đây chính là điểm khiến mình quan tâm tới việc tìm hiểu thêm về một cấu trúc dữ liệu khác có tên là `List` - tạm dịch là danh sách.

(sắp đăng tải) [[Imperative Programming + C] Bài 15 - Simplicity DSA List (giới thiệu)](#)

## Dynamic Capacity

Nói tới khả năng tạo mảng có độ dài linh động như JavaScript, thực tế thì chúng ta cũng biết rằng các mảng trong JavaScript là các Object chứ không phải là mảng đơn thuần như cú pháp tạo mảng mặc định của C. 

Điều đó có nghĩa là khi chúng ta sử dụng cú pháp với các dấu ngoặc vuông `[]` để thêm phần tử mới vào mảng, logic xử lý sau khi đi qua trình thông dịch `interpreter` của JavaScript Engine hoàn toàn có khả năng thực hiện thêm thao tác phân bổ lại bộ nhớ lưu trữ để mở rộng mảng với `capacity` lớn hơn. Điều này hoàn toàn không ảnh hưởng tới địa chỉ tham chiếu của `object Array` bao bọc bên ngoài.

Ở đây chúng ta cũng có thể thực hiện logic tương tự bằng cách xin cấp lại bộ nhớ để tạo ra một mảng rộng hơn thay thế cho mảng lưu trữ thực đang được gắn tại trường `booktable->at`; Sau đó thực hiện sao chép dữ liệu từ mảng cũ sang mảng mới mà không ảnh hưởng tới địa chỉ của `array_struct` vỏ bọc bên ngoài. Tuy nhiên thao tác này cũng lại cần thực hiện việc lặp qua và di chuyển địa chỉ tham chiếu của 1001 bản ghi đã lưu trong mảng cũ sang mảng mới, không kém phần rườm rà so với thao tác chèn bản ghi mới hay xóa một bản ghi ở giữa mảng như đã nói ở trên.

 ## Declarative Programming + Elm

Việc tìm hiểu về các cấu trúc dữ liệu và cái mini project `simplicity-dsa-c` của mình vẫn sẽ còn tiếp tục. Tuy nhiên mục tiêu chính của [Series Một Số Mô Hình Lập Trình Phổ Biến](https://viblo.asia/s/jeZ103X3KWz) vẫn cần được tập trung; Do đó nên sau khi đã khá quen thuộc với việc sử dụng một ngôn ngữ lập trình định kiểu tĩnh `static-typing`, thì đây cũng đã là thời điểm rất phù hợp để chúng ta bắt đầu một Sub-Series mới song song với `[Imperative Programming + C]`. Hy vọng bạn sẽ tiếp tục cùng đồng hành. :D

[[Declarative Programming + Elm] Bài 1 - Hello Elm !](https://viblo.asia/p/WR5JRD2nVGv)