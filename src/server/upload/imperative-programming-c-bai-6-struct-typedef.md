Thông thường thì bước đầu tiên khi chúng ta bắt tay vào việc xây dựng một chương trình phần mềm sẽ là xác định đối tượng dữ liệu cần quản lý. Hay nói một cách khác là chúng ta cần định nghĩa một kiểu dữ liệu mô phỏng lại thông tin cần quản lý của các thực thể trong cuộc sống.

Ví dụ điển hình là khi [xây dựng một trang blog cá nhân đơn giản](https://viblo.asia/s/Wj53OQQP56m) chúng ta đã định nghĩa kiểu dữ liệu `Article` gồm các trường `id`, `title`, `content`, v.v... để mô tả các bản ghi bài viết.

Một chương trình viết trong C cũng như vậy, và C có cung cấp một vài cú pháp để người viết code có thể tự định nghĩa kiểu dữ liệu riêng, có ý nghĩa với bối cảnh của chương trình đang xây dựng.

## Định nghĩa Struct

Chúng ta sẽ bắt đầu với từ khóa `struct`, khá giống với `class` trong JavaScript ở cấp độ sử dụng cơ bản. Ở đây chúng ta sẽ có một đoạn code ví dụ cách định nghĩa một kiểu dữ liệu tổ hợp tên là `book`.

```Documents\imperative-programming-c\0013-define-struct\main.c
#include <stdio.h>

struct book {
   int   id;
   char  title[100];
};

int main() {
   struct book   laotzu = {
      .id = 0,
      .title = "Tao Te Ching"
   };
   // - - - - - - - - - - - - - - - - - -
   printf("@Id: %i \n", laotzu.id);
   printf("Title: %s \n", laotzu.title);
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

@Id: 0
Title: Tao Te Ching
```

Thao tác định nghĩa và sử dụng một `struct` thực sự rất quen thuộc và có nhiều điểm tương đồng với `class` trong JavaScript, đặc biệt là ở đoạn truy xuất các phần tử đóng gói bên trong bằng phép thực thi `.`

Điểm duy nhất mà mình thấy có phần hơi rườm rà đó là ở vị trí `type-hint` chúng ta đang phải viết nguyên cả cụm từ `struct book` để biểu thị cho kiểu dữ liệu của biến `laotzu`.

## Sử dụng Typedef

Code đẹp và dễ đọc đã, mọi thứ logic khác sẽ để dành tìm hiểu sau. Mình có Google thêm về cách tạo ra tên tham chiếu cho các kiểu dữ liệu sẵn có thì C lại có cung cấp thêm một từ khóa `typedef` (type define). Từ khóa này sẽ giúp chúng ta tạo ra một tên gọi thay thế `alias` cho bất kỳ kiểu dữ liệu nào.

```Documents\imperative-programming-c\0014-typedef-struct\main.c
#include <stdio.h>

struct _book {
   int   id;
   char  title[100];
};

typedef   struct _book   book;

int main() {
   book laotzu = {
      .id = 0,
      .title = "Tao Te Ching"
   };
   // - - - - - - - - - - - - - - - - - -
   printf("@Id: %i \n", laotzu.id);
   printf("Title: %s \n", laotzu.title);
   return 0;
}
```

Cú pháp định nghĩa của `struct` còn cho phép định nghĩa kiểu dữ liệu không tên giống với `class` của JavaScript; Do đó code định nghĩa `struct` và `typedef` ở phía trên còn có thể viết ngắn gọn như thế này.

```c
typedef struct {
   int   id;
   char  title[100];
} book;
```

Việc sử dụng `typedef` thực sự rất linh động, chúng ta thậm chí còn có thể đặt tên cho các kiểu `pointer` để có giao diện viết code tương đồng với JavaScript.

```Documents\imperative-programming-c\0015-typedef-string\main.c
#include <stdio.h>

typedef char* String;

int main() {
   String message = "Just be";
   printf("%s", message);
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Just be
```

## Phép thực thi &

Phép thực thi này đáng lẽ nên được xếp cùng nội dung của bài viết về khái niệm biến con trỏ `pointer`. Tuy nhiên thì ở thời điểm đó mình rất muốn duy trì mọi thứ đơn giản để tập trung vào tư duy quản lý bộ nhớ đệm. Và ở thời điểm hiện tại thì đây lại là công cụ rất cần thiết để làm việc với `struct`.

Phép thực thi `&` có thể gọi tên là phép lấy địa chỉ `address operator` - sẽ nhận vào một biến đứng sau đó và trả về địa chỉ của vùng bộ nhớ mà biến đó đang trỏ tới.

```Documents\imperative-programing-c\0016-address-operator\main.c
#include <stdio.h>

int main() {
   int age = 1001;
   int* ageRef = &age;
   // - - - - - - - - - - - - - - - - - -
   printf("Reference: %p \n", ageRef);
   printf("Value: %i \n", *ageRef);
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Reference: 000000000061fde4
Value: 1001
```

Khi sử dụng `struct` để truyền vào một `sub-program`, thì một biến kiểu `struct` lại có phương thức hoạt động giống với các biến kiểu đơn giản như `int`, `char`, v.v... Chương trình con sẽ nhận được một `struct` bản sao của `struct` được truyền vào; Và code bên trong  `sub-program` sẽ không thể thay đổi được nội dung của `struct` ban đầu.

```Documents\imparative-programming-c\0017-pass-struct-copy\main.c
#include <stdio.h>

typedef struct {
   int   id;
   char  title[100];
} book;

void updateid(book copy) {
   copy.id = 1;
}

int main() {
   book laotzu = {
      .id = 0,
      .title = "Tao Te Ching"
   };
   // - - - - - - - - - - - - - - - - - -
   updateid(laotzu);
   printf("Updated Id: %i", laotzu.id);
   // - - - - - - - - - - - - - - - - - -
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Updated Id: 0
```

Để chương trình con `updateId` có thể hoạt động được thì chúng ta có thể sửa lại `sub-program` này một chút và trả về `struct` bản sao để thay thế `struct` ban đầu.

```Documents\imparative-programming-c\0017-pass-struct-copy\main.c
#include <stdio.h>

typedef struct {
   int   id;
   char  title[100];
} book;

book updateid(book copy) {
   copy.id = 1;
   return copy;
}

int main() {
   book laotzu = {
      .id = 0,
      .title = "Tao Te Ching"
   };
   // - - - - - - - - - - - - - - - - - -
   laotzu = updateid(laotzu);
   printf("Updated Id: %i", laotzu.id);
   // - - - - - - - - - - - - - - - - - -
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Updated Id: 1
```

Hoặc một cách làm khác, đó là chúng ta có thể truyền địa chỉ tham chiếu của `struct` ban đầu vào chương trình con `updateId`. Và như vậy, code bên trong `sub-program` này sẽ có thể thay đổi nội dung của `struct` ban đầu. Tuy nhiên thao tác truy xuất tới các trường dữ liệu thông qua một biến con trỏ khác sẽ có cách viết hơi rườm rà một chút.

```Documents\imparative-programming-c\0018-pass-struct-reference\main.c
#include <stdio.h>

typedef struct {
   int   id;
   char  title[100];
} book;

void updateid(book* reference) {
   (*reference).id = 1;
}

int main() {
   book laotzu = {
      .id = 0,
      .title = "Tao Te Ching"
   };
   // - - - - - - - - - - - - - - - - - -
   updateid(&laotzu);
   printf("Updated Id: %i", laotzu.id);
   return 0;
}
```

```CMD|Terminal.io
gcc main.c -o main
main

Updated Id: 1
```

Ở đoạn `(*reference).id` thường được viết lại thành `reference->id`. Cách viết sử dụng ký hiệu mũi tên `->` trông ngắn gọn hơn và thường được sử dụng nhiều hơn từ kết quả mà mình Google được. Tuy nhiên trong code ví dụ mình muốn mô tả logic hoạt động thông thường như khi chúng ta sử dụng các biến `pointer` trong những bài trước đó. :D

## Struct in JavaScript

Trong JavaScript, các `object` thuần dữ liệu không có chứa các phương thức là dạng triển khai cao hơn của `struct`. Tuy nhiên khi truyền một `object` vào một `sub-program` thì JavaScript sẽ mặc định là truyền địa chỉ tham chiếu của `object` đó chứ không tự động tạo ra một `object` bản sao như cách xử lý `struct` mặc định của C.

```main.js
class Book {
   constructor(givenId, givenTitle) {
      this.id = givenId;
      this.title = givenTitle;
   }
}

function updateId(reference) {
   reference.id = 1;
}

void function main() {
   var laotzu = new Book(0, "Tao Te Ching");
   updateId(laotzu);
   console.log(laotzu.id);
} ();
```

Mỗi một ngôn ngữ và môi trường lập trình đều có những đặc thù riêng và mình cảm thấy cách xử lý mặc định của C khi truyền một `struct` vào một `sub-program` cũng rất dễ hiểu. Tuy nhiên logic xử lý tự động tạo ra bản sao dữ liệu như thế này có phần hơi bất đồng bộ so với `String` và `Array` của chính môi trường C. Do đó nên mình đã tìm hiểu thêm một chút thông tin và chọn ra một quy ước `convention` về cách đặt tên và sử dụng `struct` để phù hợp với logic sử dụng của mình.

Mục tiêu của `convention` này là để đồng bộ logic xử lý chung khi truyền các kiểu dữ liệu phức hợp vào các `sub-program` trong C. Đó là thao tác truyền một cấu trúc dữ liệu phức hợp như `String`, `Array`, hay một `struct` nào đó, sẽ luôn luôn mặc định là truyền vào địa chỉ tham chiếu từ một `pointer`. Như vậy chương trình con có thể quyết định lựa chọn:

- Chỉnh sửa nội dung của cấu trúc dữ liệu ban đầu thông qua địa chỉ tham chiếu được truyền vào.
- Hoặc chủ động tạo ra một cấu trúc dữ liệu bản sao kèm theo những cập nhật thay đổi để trả về.

```Documents\imperative-programming-c\0019-struct-convention\main.c
#include <stdio.h>
 
typedef char* String

typedef struct {
   int      id;
   String   title;
} book;

typedef book* Book;

Book construct(int id, String title) {
   book new = {
      .id = id,
      .title = title
   };
   Book reference = &new;
   return reference;
}

void updateid(Book reference) {
   reference->id = 1;
}

int main() {
   Book laotzu = construct(0, "Tao Te Ching");
   updateid(laotzu);
   // - - - - - - - - - - - - - - - - - -
   printf("Updated Id: %i", laotzu->id);
   return 0;
}
```

Khi sử dụng `convention` này, các kiểu dữ liệu đại diện sẽ đều được đặt tên với chữ cái đầu tiên được viết hoa để biểu thị cho kiểu biến con trỏ `pointer` và cần được khởi tạo qua một chương trình con `construct` như trong code ví dụ trên. 

Cũng khá thuận tiện và đằng nào thì khi chúng ta viết một chương trình bất kỳ cũng đều sẽ cần tạo ra các thư viện cung cấp các `sub-program` tiện ích cho mỗi kiểu dữ liệu; Thêm một chương trình `construct` nho nhỏ thì chắc là cũng không có gì quá bất tiện đâu nhỉ. :D

[[Imperative Programming + C] Bài 7 - Boolean & Switching](https://viblo.asia/p/1VgZv27OZAw)