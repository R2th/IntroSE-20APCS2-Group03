Nhóm công cụ cuối cùng ở cấp độ cú pháp ngôn ngữ của `Ada` mà chúng ta sẽ tìm hiểu là cú pháp định nghĩa tác vụ song song và cú pháp hỗ trợ tích hợp trực tiếp với ngôn ngữ `C`.

## Multi-tasking

Một tác vụ `task` về cơ bản là một chương trình `Main` khác, sẽ được vận hành song song với tiến trình chạy code của chương trình `Main` ban đầu. Vì vậy nên chúng ta có thể dự kiến trước rằng code định nghĩa `task` sẽ là một dạng `procedure`. Tuy nhiên đôi khi việc quản lý các `task` bằng logic code cũng cần thiết, và vì vậy nên `task` cần phải là một kiểu dữ liệu. Và vì vậy nên chúng ta có khái niệm `task type`.

```src/async/async.ads
package Async is
   task type Extra_Task is
      entry Start (From_Caller : in out Integer);
   end Extra_Task;
end Async;
```

```src/async/async.adb
with Ada.Text_IO; use Ada.Text_IO;

package body Async is
   task body Extra_Task is
      In_Task : Integer;
   begin
      accept Start (From_Caller : in out Integer) do
         In_Task := From_Caller;
         From_Caller := 9;
      end Start;
      
      delay 1.2;
      Put_Line ("In Extra Task : " & Integer'Image (In_Task));
   end Extra_Task;
end Async;
```

Ở đây chúng ta đang khai báo một `task type` đơn giản có tên là `Extra_Task`. Điểm đặc biệt ở đây là bản thân `Extra_Task` được định nghĩa với khối `begin ... end Extra_Task;` giống với một `procedure`, nhưng lại được khai báo và mở đầu định nghĩa giống như một `package` có chứa một `procedure Start`.

Như vậy là chúng ta có thể dự kiến code sử dụng bên ngoài sẽ vừa có thể xem `Extra_Task` như một `type` để khai báo các biến `task`, và vừa có thể xem mỗi tên biến này sẽ giống như một tên tham chiếu của `package` và có thể trỏ tới `procedure Start` để khởi chạy.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Async; use Async;
 
procedure Main is
   T : Extra_Task;
   V : Integer;
begin
   V := 1;
   Put_Line ("In Main : " & Integer'Image (V));
   
   T.Start (V);
   Put_Line ("In Main : " & Integer'Image (V));
end Main;
```

```CMD|Terminal.io
In Main :  1
In Main :  9
... delay 1.2s
In Extra Task :  1
```

Kết quả vận hành mô tả rằng tiến trình chạy code của `Main` vẫn được tiếp diễn ngay sau khi tác vụ `T` được kích hoạt ở dòng `T.Start (V);`. Thêm vào đó là code được định nghĩa bên trong `procedure Start` của `Extra_Task` được vận hành đồng bộ giữa tiến trình chạy code chính `task Main` và tác vụ `T : Extra_Task`.

Sau khi phần code được định nghĩa bên trong `procedure Start` kết thúc, câu lệnh `delay 1.2;` được sử dụng để khiến tiến trình chạy code của `T` bị chậm lại `1.2s` và thể hiện được rằng tác vụ `T` được vận hành bất đồng bộ so với tiến trình chạy tác vụ chính `task Main`.

Cả `task Main` và `T : Extra_Task` đều là các `procedure` khởi đầu các tiến trình chạy code và có thể được xem là điểm khởi đầu của các chương trình khác nhau, có thể khai báo các biến tài nguyên riêng như `V : Integer` và `In_Task : Integer` để lưu trữ thông tin cần làm việc trong suốt tiến trình vận hành của mỗi `task`.

## Importing C from Ada

Như đã giới thiệu trươc đó trong bài viết mở đầu của Sub-Series này, chúng ta sẽ có thể dễ dàng tích hợp code `C` vào một `project Ada`. Thậm chí chúng ta còn có thể viết code logic song song trên các tệp của `C` sau đó thực hiện biên dịch toàn bộ các tệp code `C` và `Ada` của `project` với `gprbuild`.

Để sử dụng nhiều ngôn ngữ trong một `project Ada`, chúng ta cần liệt kê tên của các ngôn ngữ muốn sử dụng tại tệp cấu hình của `project`. Các ngôn ngữ khác ngoài `C`, ví dụ như `Fortran`, `Assembler`, v.v... có thể sẽ yêu cầu khai báo thêm các thông tin bổ sung về trình biên dịch để `gprbuild` có thể điều khiển tiến trình biên dịch song song với các tệp code `Ada`.

```learn_ada.gpr
project Learn_Ada is
   for Languages use ("Ada", "C");
   -- for ...
end Learn_Ada;
```

Sau đó thì chúng ta có thể tạo các tệp code `C` trong thư mục `src` của `project`.

```src/foreign/foreign.h
int triple (int value);
void print (int value);
```

```src/foreign/foreign.c
#include "stdio.h"
#include "./foreign.h"

int triple (int value) {
   return value * 3;
}

void print (int value) {
   printf ("Printing from C... \n");
   printf ("Value : %i \n", value);
}
```

Ở đây chúng ta có một tệp `header.h` định nghĩa một `struct` và khai báo một hàm `triple` được định nghĩa trong tệp `body.c`. Để sử dụng các yếu tố này trong code của `Ada`, chúng ta cần tạo ra code khai báo tương ứng để tham chiếu tới các yếu tố đã được định nghĩa bằng code `C`.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Interfaces.C;
 
procedure Main is
   subtype C_int is Interfaces.C.int;

   function C_triple (Value : C_int)
      return C_int
   with Convention => C,
        Import => True,
        External_Name => "triple";
   
   procedure C_print (Value : in C_int)
   with Convention => C,
        Import => True,
        External_Name => "print";

   Value : C_int;
begin
   Value := 9;
   Value := C_triple (Value);
   C_print (Value);
end Main;
```

```CMD|Terminal.io
Printing from C... 
Value : 27
```

## Exporting Ada to C

Ở chiều tương tác ngược lại, khi chúng ta muốn gọi một `sub-program` đã được viết bằng code `Ada` trong một tệp code `C` cùng `project` thì thao tác cần thực hiện là `Export` thông qua `Interfaces.C`.

```src/export/export.ads
with Interfaces.C; use Interfaces.C;

package Export is
   subtype C_int is Interfaces.C.int;

   function Add
      ( A : C_int
      , B : C_int )
      return C_int
   with Convention    => C,
        Export        => True,
        External_Name => "add";
end Export;
```

```src/export/export.adb
package body Export is

   function Add
      ( A : C_int
      , B : C_int )
      return C_int is
   begin
      return A + B ;
   end Add;

end Export;
```

Như vậy trong một tệp code `C` bất kỳ đó, chúng ta sẽ có thể xem như hàm `add` đã được định nghĩa ở phạm vi toàn cục `global` và khai báo bằng từ khóa `extern` trước khi sử dụng.

```anywhere.c
#include <stdio.h>

extern int add (int a, int b);

// bây giờ `add` đã có thể được gọi
// trong một `sub-program` nào đó .
```

[[Procedural Programming + Ada] Bài 15 - Standard Library & Package Manager](https://viblo.asia/p/aAY4qw25LPw)