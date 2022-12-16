Câu chuyện của `tagged record` là vào những năm 1990 thì người ta đã xây dựng xong các kiến trúc vi xử lý hỗ trợ mô phỏng `object` trong bộ nhớ đệm và điều này đã tạo tiền đề cho mô hình lập trình hướng đối tượng `OOP` được `MIT` giới thiệu trước đó vào khoảng những năm cuối thập niên 1950 và đầu 1960 đang trở thành tiêu điểm của cả ngành lập trình phần mềm nói chung. Và phiên bản cập nhật năm 1995 của `Ada` cũng không ngoại lệ so với các ngôn ngữ lập trình phổ biến lúc bấy giờ - đã giới thiệu một vài công cụ để hỗ trợ mô hình lập trình này.

> Năm 1995 cũng là năm mà ngôn ngữ Java chính thức được giới thiệu và ngay lập tức trở thành một trong số những ngôn ngữ lập trình phổ biến nhất với thiết kế 100% đặt nền móng trên `OOP`.  

## Tagged Record

Về khía cạnh kĩ thuật, các `record` trong `Ada` tương đương với các `struct` trong `C`. Các cấu trúc này đều không có khả năng mở rộng bằng kiểu dữ liệu kế thừa `derived type` và cũng không có chứa thêm thông tin định danh nào khác ngoài các trường dữ liệu mà chúng ta tự viết định nghĩa.

Tức là ở thời điểm vận hành phần mềm `runtime` thì chúng ta sẽ không có thông tin định danh nào đặc trưng để nhanh chóng xác định `record` này thuộc `type` nào nếu giả sử các `record` có thêm tính năng kế thừa. Trong khi đó thì yếu tố định danh như thế này lại rất quan trọng đối với `OOP`.

Và vì tất cả những lý do trên thì phiên bản `Ada 95` đã giới thiệu `tagged record` với những tính năng mong đợi hỗ trợ nói trên để hỗ trợ mô hình `OOP`. Trong bài viết này thì chúng ta tạm thời sẽ chỉ quan tâm tới khả năng mở rộng và kế thừa của các `tagged record` và để dành đặc tính còn lại cho một bài viết sau đó.

```src/humanity/humanity.ads
package Humanity is

   type Person is tagged record
      Name : String (1 .. 12);
      Age : Integer;
   end record;

   type Crafter is new Person with record
      Level : Integer;
   end record;

end Humanity;
```

Việc định nghĩa một `tagged record` không có gì khác biệt so với định nghĩa `record` thông thường ngoài từ khóa bổ sung `tagged`. Tuy nhiên, như đã nói thì `tagged record` cho phép thực hiện thao tác kế thừa với cú pháp như trên. Từ khóa `with` được sử dụng để gộp `record` trong định nghĩa mới vào `record` được định nghĩa ở kiểu `Person` ban đầu và tạo thành kiểu `Crafter`.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Humanity; use Humanity;

procedure Main is
   Someone : Crafter;
begin
   Someone := ( Name => "Semi Dev_   "
              , Age => 32
              , Level => 1001 );
   Put_Line ("Crafter record");
   Put_Line ("   Name => " & Someone.Name);
   Put_Line ("   Age => " & Integer'Image (Someone.Age));
   Put_Line ("   Level => " & Integer'Image (Someone.Level));
end Main;
```

```CMD|Terminal.io
Crafter record
   Name => Semi Dev_
   Age =>  32
   Level =>  1001
```

## Primitive Operation

Cũng trong phiên bản cập nhật năm 1995 này thì `Ada` còn đưa ra thêm một khái niệm được gọi là phép thực thi nguyên thể `primitive operation` hay còn được gọi ngắn gọn là `primitive`. Khái niệm này được sử dụng để nói về sự liên hệ giữa các `sub-program` và kiểu dữ liệu mà chúng được thiết kế để làm việc xoay quanh.

Khi các `sub-program` được định nghĩa trong cùng `package` với kiểu dữ liệu `Type` được sử dụng làm tham số đầu vào, thì các `sub-program` đó sẽ được gọi là các `primitive operation` của kiểu `Type`. Lúc này, nếu như chúng ta tạo ra một kiểu dữ liệu mới `Derived_Type` từ kiểu `Type` thì các `sub-program` này cũng sẽ trở thành `primitives` của `Derived_Type`.

Và hiển nhiên, các `sub-program` đã có sẽ hoạt động tốt với `Derived_Type` mà không yêu cầu chúng ta phải thực hiện thao tác chuyển kiểu dữ liệu.

```src/humanity/humanity.ads
package Humanity is

   type Person is tagged record
      Name : String (1 .. 12);
      Age : Integer;
   end record;

   procedure Put_Name (Self : in Person);
   procedure Put_Age (Self : in Person);

   -- derived - - - - - - - - - - - - - - -

   type Crafter is new Person with record
      Level : Integer;
   end record;

   procedure Put_Level (Self : in Crafter);

end Humanity;
```

```src/humanity/humanity.adb
with Ada.Text_IO; use Ada.Text_IO;

package body Humanity is

   procedure Put_Name (Self : in Person) is
   begin
      Put_Line ("Name => " & Self.Name);
   end Put_Name;
   
   procedure Put_Age (Self : in Person) is
   begin
      Put_Line ("Age => " & Integer'Image (Self.Age));
   end Put_Age;

   -- derived - - - - - - - - - - - - - - -

   procedure Put_Level (Self : in Crafter) is
   begin
      Put_Line ("Level => " & Integer'Image (Self.Level));
   end Put_Level;

end Humanity;
```

Ở đây chúng ta sẽ di chuyển các lệnh in thông tin của các trường dữ liệu vào định nghĩa các `procedure` tương ứng trong `package Person`. Trong đó thì `Put_Name` và `Put_Age` được định nghĩa là `primitive` của kiểu `Person` và sẽ được áp dụng tại `main.adb` với tham số đầu vào thuộc kiểu `Crafter`.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Humanity; use Humanity;

procedure Main is
   Someone : Crafter;
begin
   Someone := ( Name => "Semi Dev_   "
              , Age => 32
              , Level => 1001 );
   Put_Line ("- - Crafter - - - -");
   Put_Name (Someone);
   Put_Age (Someone);
   Put_Level (Someone);
end Main;
```

```CMD|Terminal.io
- - Crafter - - - -
Name => Semi Dev_
Age =>  32
Level =>  1001
```

Khái niệm `primitive operation` không chỉ áp dụng đối với các `sub-program` làm việc xoay quanh các kiểu `record` mà là với tất cả các kiểu dữ liệu khác được định nghĩa từ các kiểu dữ liệu đơn nguyên như `Integer`, `String`, v.v...

Riêng đối với các `tagged record`, các `primitive operation` còn có thể được gọi với cú pháp sử dụng phép thực thi `.` giống với các ngôn ngữ `OOP` phổ biến. Chính vì vậy nên có thể trong một số thư viện code chúng ta sẽ có thể nhìn thấy các ví dụ sử dụng cú pháp dạng này và một số khác thì lại khuyến khích sử dụng ở dạng cú pháp `sub-program` trực quan thông thường.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Humanity; use Humanity;

procedure Main is
   Someone : Crafter;
begin
   Someone := ( Name => "Semi Dev_   "
              , Age => 32
              , Level => 1001 );
   Put_Line ("- - Crafter - - - -");
   Someone.Put_Name;
   Someone.Put_Age;
   Someone.Put_Level;
end Main;
```

Lựa chọn là tùy thuộc ở mỗi người. Đối với bản thân mình thì sẽ chọn sử dụng cú pháp gọi các `sub-program` trực quan trong một ngôn ngữ chủ điểm `Procedural Programming`. Bởi cách thức mà chúng ta biểu thị các yếu tố trong code đôi khi sẽ tạo ra sự tác động ngược lại tới khuynh hướng tư duy của chính mình. Và khi sử dụng một ngôn ngữ chủ điểm `Procedural`, thì lối tư duy tác động khách quan lên các bản ghi dữ liệu `record` sẽ phù hợp hơn so với lối tư duy tương tác giữa các đối tượng thực thể `object`.

Các yếu tố vay mượn từ `OOP` như các tính năng kế thừa `Inheritance`, đóng gói `Encapsulation`, đa hình `Polymorphism`, và trừu tượng `Abstraction` sẽ trở thành những công cụ rất hữu ích. Tuy nhiên, dù gì thì đây cũng chỉ là các tính năng mang tính chất mở rộng `extension` chứ không thể so sánh được với các ngôn ngữ chủ điểm `OOP`.

Và ở tính năng đầu tiên `Inheritance`, điều quan trọng nhất là chúng ta đã có thêm khả năng định nghĩa các kiểu `record` mô phỏng lại hình thái kế thừa từ các thực thể dữ liệu trong thực tế. Kèm theo đó là các `sub-program` cũng có thể được áp dụng cho các kiểu kế thừa và giúp chúng ta giảm thiểu được rất nhiều code lặp.

[[Procedural Programming + Ada] Bài 10 - Type'Class & Overriding Primitives](https://viblo.asia/p/PwlVmy7mV5Z)