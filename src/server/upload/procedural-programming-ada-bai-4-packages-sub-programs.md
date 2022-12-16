Trong tất cả các ví dụ trước đó thì chúng ta đã sử dụng một tệp `main.adb` duy nhất được chỉnh sửa code nhiều lần để tìm hiểu về các yếu tố đơn giản. Tuy nhiên, `Ada` rất xem trọng việc tách chương trình mà chúng ta viết thành nhiều tệp khác nhau và vì vậy nên chỉ cho phép định nghĩa một `sub-program` duy nhất trong mỗi tệp.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;


function Sub is
   -- 
begin
   Put_Line ("Just a sub-program");
end Sub;


procedure Main is
   --
begin
   Put_Line ("The main program");
end Main;
```

```
gprbuild -q -P learn_ada.gpr

learn_ada.gpr:1:09: warning: there are no sources of language "c" in this project
main.adb:12:01: error: end of file expected, file can have only one compilation unit
gprbuild: *** compilation phase failed
```

Dòng `warning` đầu tiên là do mình đã khai báo thêm có sử dụng `C` kèm trong `project`, nếu bạn không muốn thấy thông báo này hiện lặp lại thì có thể bỏ `C` trong danh sách ngôn ngữ sử dụng trong tệp `learn_ada.gpr`.

Như vậy là trình biên dịch sẽ báo lỗi ngay ở vị trí mà chúng ta bắt đầu định nghĩa khối `procedure` thứ hai. Và để tiếp tục tiến xa hơn, chúng ta sẽ cần phải tìm hiểu cách tạo ra và sử dụng các `package`.

## Package

Khái niệm `package` trong `Ada` có thể được hiểu với ý nghĩa tương đương với thư viện `library` trong `C`. Chúng ta sẽ cần tạo ra một tệp khai báo tổng quan bao gồm các hằng số `constant` và chữ ký của các `sub-program` mà thư viện đó cung cấp. Tương ứng với kiểu tệp khai báo `header.h` của `C` thì chúng ta sẽ có một tệp cấu hình `specification.ads`. Và tệp mã nguồn cũng chứa code logic chi tiết được `Ada` gọi là `body.adb` và yêu cầu đặt cùng tên với tệp cấu hình.

Đây là một ví dụ về code khai báo cấu hình và viết code định nghĩa chi tiết cho một `package`:

```src/week/week.ads
with Ada.Text_IO; use Ada.Text_IO;

package Week is

   Sun : constant String := "Sunday";
   Mon : constant String := "Monday";
   Tue : constant String := "Tuesday";
   Wed : constant String := "Wednesday";
   Thu : constant String := "Thursday";
   Fri : constant String := "Friday";
   Sat : constant String := "Saturday";

   procedure Put_Weeks;

end Week;
```

```src/week/week.adb
package body Week is

   procedure Put_Weeks is
      --
   begin
      Put_Line ("Sun means " & Sun);
      Put_Line ("Mon means " & Mon);
      Put_Line ("Tue means " & Tue);
      Put_Line ("Wed means " & Wed);
      Put_Line ("Thu means " & Thu);
      Put_Line ("Fri means " & Fri);
      Put_Line ("Sat means " & Sat);
   end Put_Weeks;
   
end Week;
```

Bây giờ chúng ta đã có thể sử dụng `package Week` trong chương trình chính.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Week; use Week;

procedure Main is
   --
begin
   Put_Line ("Using package: Week");
   Put_Weeks;
end Main;
```

```CMD|Terminal.io
Using package: Week
Mon means Monday
Tue means Tuesday
Wed means Wednesday
Thu means Thursday
Fri means Friday
Sat means Saturday
Sun means Sunday
```

Trong trường hợp cần kiến trúc chương trình với nhiều `package` xếp lớp. Ví dụ như trong `Week` chúng ta cần chia nhỏ thành các `package` nhỏ hơn thì chúng ta có thể thực hiện như sau. Trong thư mục `week` chúng ta sẽ tạo thêm thư mục `child`.

```src/week/child/week-child.ads
with Ada.Text_IO; use Ada.Text_IO;

package Week.Child is
   procedure Put_Week_Child;
end Week.Child;
```

```src/week/child/week-child.adb
package body Week.Child is

   procedure Put_Week_Child is
      --
   begin
      Put_Line ("Child package of Week");
   end Put_Week_Child;

end Week.Child;
```

Và sử dụng `Week.Child` tại chương trình `main` giống như một `package` độc lập.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Week.Child; use Week.Child;

procedure Main is
   --
begin
   Put_Line ("Using package: Week.Child");
   Put_Week_Child;
end Main;
```

```CMD|Terminal.io
Using package: Week.Child
Child package of Week
```

## Sub-program

Có hai kiểu `sub-program` trong `Ada`, đó là các các Thủ Tục `procedure` và Hàm `function`. Điểm khác biệt căn bản giữa hai kiểu `sub-program` này đó là một Hàm `function` sẽ luôn luôn trả về một giá trị ở vị trí được gọi, còn một Thủ Tục `procedure` thì không bao giờ.

Và ngược lại, một Hàm `function` sẽ không bao giờ tạo ra thay đổi tác động tới các yếu tố bên ngoài chính nó, còn một Thủ Tục `procedure` lại sẽ luôn tác động lên các yếu tố bên ngoài ví dụ như trạng thái hiển thị và các biến ngoại vi.

Hay nói một cách khác, `Ada` không hỗ trợ việc tạo ra một `sub-program` vừa tạo ra sự thay đổi tới môi trường bên ngoài và vừa trả về một giá trị ở vị trí được gọi. Chính sự phân bổ chức năng của các `sub-program` được định hình rõ ràng ở cấp độ cú pháp của ngôn ngữ như thế này, sẽ buộc chúng ta hình thành thói quen thiết kế các `sub-program` có chủ đích rõ ràng hơn.

Ví dụ nếu cần thực hiện một thao tác thay đổi trạng thái hiển thị của `console` thì hiển nhiên chúng ta sẽ phải nghĩ tới một `procedure`. Còn nếu cần một công cụ hỗ trợ thu gọn logic tính toán thì có thể chúng ta sẽ muốn sử dụng một `function` hơn - để đảm bảo là sẽ không có dòng code đi lạc nào tạo ra hiệu ứng biên `side-effect` không mong muốn.

### `procedure`

Từ đầu cho tới giờ thì chúng ta đã sử dụng các `procedure` căn bản không có các tham số `parameter`. Và bây giờ chúng ta sẽ làm một ví dụ định nghĩa `procedure` có các tham số. Để thuận tiện thì chúng ta sẽ bổ sung thêm một `procedure Increment` trong `package Week`.

```src/week/week.ads
with Ada.Text_IO; use Ada.Text_IO;

package Week is

   -- ... constant String ...

   procedure Put_Weeks;
   
   procedure Increment
      ( Day : in Integer
      ; Increased : out Integer );
   
end Week;
```

```src/week/week.adb
package body Week is

   -- procedure Put_Weeks ...
   
   procedure Increment
      ( Day : in Integer
      ; Increased : out Integer ) is
   begin
      Increased := Day + 1;
   end Increment;
   
end Week;
```

Và sau đó thử sử dụng `Increment` trong `Main`:

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Week;

procedure Main is
   Day : Integer;
begin
   Day := 0;
   Week.Increment (Day, Day);
   Put_Line ("Increased :" & Integer'Image (Day));
end Main;
```

```CMD|Terminal.io
Increased : 1
```

Ngoài yếu tố định kiểu dữ liệu của các tham số thì `procedure` có thêm các từ khóa `in` và `out` đính kèm ở phía trước. Từ khóa `in` sẽ giúp chúng ta giới hạn chức năng của tham số `Day` trong code logic chi tiết của `Increment`, và đảm bảo sẽ không có thao tác nào tạo ra sự thay đổi giá trị qua tên tham chiếu `Day`.

Trong khi đó thì từ khóa `out` sẽ giúp chúng ta đảm bảo rằng, `procedure` này sẽ bắt buộc phải tạo ra tác động thay đổi thông qua tên tham chiếu `Increased`, và chỉ có thể thực hiện thao tác đọc dữ liệu lưu trữ trong `Increased` sau khi đã thao tác thay đổi giá trị.

Còn trong trường hợp chúng ta sử dụng cả `in` và `out` cho cùng một tham số, thì từ khóa `in` sẽ cho phép đọc dữ liệu trong tham số đó trước khi có thao tác thay đổi giá trị lưu trữ, và từ khóa `out` sẽ tạo ràng buộc là `procedure` chắc chắn sẽ phải tạo ra tác động thay đổi dữ liệu thông qua tham số đó.

Trong môi trường của `C` thì chúng ta có thể sử dụng từ khóa `const` để mô phỏng lại các tham số `in`, còn các tham số `out` thì sẽ là các con trỏ `pointer`.

```main.c
#include <stdio.h>

#define procedure void
#define in(type) const type
#define out(type) type*

procedure increment
   ( in(int) day
   , out(int) increasedRef )
{ // - begin
   *increasedRef = day + 1;
} // - end

procedure main ()
{ // - is
   int day;
   // - begin
   day = 0;
   increment (day, &day);
   printf ("Increased : %i \n", day);
} // - end
```

Bây giờ giả sử ở bên trong code định nghĩa `procedure`, nếu chúng ta thực hiện một phép gán thay đổi giá trị trên tên tham chiếu `Day` trong code ví dụ của `Ada` - hay `day` trong code ví dụ của `C` ở trên, thì chắc chắn trình biên dịch sẽ thông báo lỗi.

Tuy nhiên thì khi mô phỏng lại tham số `out` của `Ada` bằng con trỏ `pointer` trong `C` thì chúng ta không thể đảm bảo được rằng tham số đó chắc chắn phải được sử dụng. Nếu chúng ta quên không tạo ra thao tác nào tác động tới con trỏ đó thì trình biên dịch của `C` cũng sẽ không đưa ra nhắc nhở nào.

Bạn thấy đấy, nếu xét trên khía cạnh giao diện lập trình bậc cao thì việc đem so sánh `C` với `Ada` chắc chắn sẽ là một sự thiệt thòi cho `C`. Và có lẽ, khi đã biết tới `Ada` thì việc sử dụng `C` sẽ chỉ có nhiều ý nghĩa nếu như chúng ta muốn giao tiếp với các thư viện cung cấp bởi các môi trường phát triển phần mềm khác.

Ví dụ đơn cử là trình điều khiển của các `DBMS` chắc chắn sẽ luôn có phiên bản dành cho `C` đầu tiên rồi sau đó mới là các phiên bản dành cho các ngôn ngữ lập trình bậc cao phổ biến. Bởi vì dù gì thì `C` cũng là gốc rễ của các hệ điều hành mà chúng ta đang sử dụng. :D

### `function`

Bây giờ chúng ta sẽ chỉnh sửa lại `Increment` một chút và sử dụng định nghĩa `function` thay thế cho `procedure`.

```src/week/week.ads
package Week is

   -- ... constant String ...

   procedure Put_Weeks;
   function Increment (Day : Integer) return Integer;
   
end Week;
```

```src/week/week.adb
package body Week is

   -- procedure Put_Weeks ...

   function Increment (Day : in Integer)
      return Integer is
   begin
      return Day + 1;
   end Increment;
   
end Week;
```

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Week;

procedure Main is
   Day : Integer;
begin
   Day := 0;
   Day := Week.Increment (Day);
   Put_Line ("Increased :" & Integer'Image (Day));
end Main;
```

Do các Hàm `function` được định nghĩa là sẽ không tạo ra thay đổi tác động tới môi trường bên ngoài nên chúng ta không cần các chỉ dẫn `in` và `out` cho các tham số. Thay vào đó thì mặc định tất cả các tham số được truyền vào sẽ đều là `in` và không có bất kỳ thao tác nào dạng như phép gán giá trị được cho phép thực hiện trên các tên tham chiếu này. Nếu muốn thực hiện các thao tác tính toán có logic phức tạp, chúng ta sẽ phải khai báo thêm các biến cục bộ để sử dụng.

[[Procedural Programming + Ada] Bài 5 - Basic Types & Attributes](https://viblo.asia/p/EbNVQZR04vR)