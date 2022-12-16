Cùng với `tagged record` thì phiên bản `Ada 95` còn bổ sung thêm thuộc tính `Class` và định nghĩa `Type'Class` là một kiểu dữ liệu trừu tượng - còn được gọi với một cái tên khác là lớp tổng quan `Classwide` - biểu trưng cho tất cả các kiểu dữ liệu trong cùng dòng kế thừa bao gồm chính kiểu `Type` và các kiểu mở rộng từ `Type`.

Điều này cho phép chúng ta sử dụng một biến duy nhất để biểu trưng cho nhiều kiểu `tagged record` khác nhau trong cùng dòng kế thừa tại một vị trí trong code. Và kết hợp với một tính năng khác của `tagged record`, đó là cho phép định nghĩa lại các `primitive operation` kế thừa từ kiểu ban đầu hay còn được gọi là `overriding`, bộ đôi công cụ này sẽ giúp chúng ta biểu thị tính đa hình `Polymorphism` theo kiểu `sub-typing`.

Mặc dù những tính năng và thuật ngữ này được vay mượn từ `OOP`, tuy nhiên ở đây mình sẽ chú trọng nhiều hơn vào việc các tính năng mới được thể hiện trong code như thế nào. Còn vê các thuật ngữ của `OOP` thì mình sẽ không sử dụng nguyên bản trong Sub-Series này vì để ưu tiên trọng tâm cho `Procedural`.

Trong trường hợp bạn chưa tiếp xúc nhiều với `OOP` thì trước đó mình đã giới thiệu sơ lược trong các bài viết về `JavaScript` trong Series [Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/p/AZoJj7BzLY7). Và chúng ta sẽ đề cập lại chi tiết trong Sub-Series tiếp theo của Series Các Mô Hình Lập Trình Phổ Biến mà chúng ta đang thực hiện ở đây - một Sub-Series khác dành riêng cho `OOP` cũng giống như các mô hình lập trình trước đó.

## Type'Class

> Thuộc tính `Class` của kiểu `Type` sẽ trả về một kiểu dữ liệu trừu tượng - biểu trưng cho tất cả các kiểu dữ liệu khác trong cùng dòng kế thừa bao gồm chính kiểu `Type` và các kiểu mở rộng từ `Type`.

Chúng ta sẽ tận dụng code ví dụ trong bài trước và xem lại định nghĩa của các kiểu `tagged record` đã định nghĩa trong tệp cấu hình của `package Humanity`.

```files.txt
src
├── humanity        
│   ├── humanity.adb
│   └── humanity.ads
└── main.adb
```

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

Ở đây chúng ta đang có kiểu `Crafter` được định nghĩa mở rộng từ `Person`. Như vậy theo định nghĩa `Type'Class` được cung cấp thì nếu một biến được định kiểu là `Person'Class`, thì biến đó sẽ có thể lưu một `tagged record` thuộc kiểu `Person` hoặc `Crafter` đều hợp lệ. Bây giờ chúng ta sẽ sửa lại code sử dụng `package Humanity` trong tệp khởi chạy `main.adb` để kiểm chứng lại điều này.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Humanity; use Humanity;

procedure Main is
   Semi_Dev : Crafter := ( Name => "Semi Dev_   "
                         , Age => 32
                         , Level => 1001 );
   Someone : Person'Class := Semi_Dev;
begin
   Put_Line ("- - Person'Class - - - -");
   Put_Name (Someone);
   Put_Age (Someone);
end Main;
```

```CMD|Terminal.io
- - Person'Class - - - -
Name => Semi Dev_
Age =>  32
```

Logic biểu thị trong code ví dụ ở đây là chúng ta có biến `Someone` sẽ lưu trữ một `tagged record` thuộc bất kỳ kiểu dữ liệu nào kế thừa từ `Person`. Vì vậy bản ghi này chắc chắn sẽ có đủ các trường dữ liệu đã định nghĩa tại `Person` và hiển nhiên sẽ là đối số hợp lệ đối với các `primitive` của `Person` là: `Put_Name` và `Put_Age`.

## Overriding Primitive

Nói về thao tác `overriding` - định nghĩa lại các yếu tố đã được định nghĩa trước đó trong kiểu ban đầu `super` tại kiểu kế thừa `derived`: Ở đây `Ada` không cung cấp tính năng đóng gói `Encapsulation` ở cấp độ của các trường dữ liệu và vì vậy nên chúng ta sẽ chỉ có duy nhất thao tác `overriding`đối với các `primitive operation`.

Để làm ví dụ minh họa cho tính năng này, chúng ta sẽ định nghĩa thêm một `primitive` cho kiểu `Person` có tên là `Put_Info` và sau đó thực hiện thao tác `overriding` để `Put_Info` trực tiếp trở thành `primitive` của kiểu `Crafter`.

```src/humanity/humanity.ads
package Humanity is

   type Person is tagged record
      Name : String (1 .. 12);
      Age : Integer;
   end record;

   procedure Put_Info (Self : in Person); -- <<<<
   procedure Put_Name (Self : in Person);
   procedure Put_Age (Self : in Person);

   -- derived - - - - - - - - - - - - - - -

   type Crafter is new Person with record
      Level : Integer;
   end record;

   procedure Put_Info (Self : in Crafter); -- overriding
   procedure Put_Level (Self : in Crafter);
   
end Humanity;
```

```src/humanity/humanity.adb
with Ada.Text_IO; use Ada.Text_IO;

package body Humanity is

   procedure Put_Info (Self : in Person) is
   begin
      Put_Line ("- - Person record - - - -");
      Put_Name (Self);
      Put_Age (Self);
   end Put_Info;
   
   -- ...
   
   -- derived - - - - - - - - - - - - - - -

   procedure Put_Info (Self : in Crafter) is
   begin
      Put_Line ("- - Crafter record - - - -");
      Put_Name (Self);
      Put_Age (Self);
      Put_Level (Self);
   end Put_Info;
   
   -- ...
   
end Humanity;
```

Và bây giờ ở code sử dụng tại tệp khởi chạy `main.adb`, chúng ta đã có thể sử dụng `Put_Info` để xem thông tin chi tiết của mỗi kiểu bản ghi.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Humanity; use Humanity;

procedure Main is
   Class_Access : access Person'Class;
begin
   Class_Access := new Person'( Name => "Thinh Tran  "
                              , Age => 32 );
   Put_Info (Class_Access.all);

   Class_Access := new Crafter'( Name => "Semi Dev_   "
                               , Age => 32
                               , Level => 1001 );
   Put_Info (Class_Access.all);
end Main;
```

> Thao tác `dereference` tường minh `Class_Access.all` sử dụng để chuyển từ kiểu con trỏ `access` về kiểu dữ liệu thực - được bổ sung ngày `5/12` tại bài viết về [`Access Pointer`](https://viblo.asia/p/BQyJK32bJMe#_dereference-access-3).

```CMD|Terminal.io
- - Person record - - - -
Name => Thinh Tran
Age =>  32
- - Crafter record - - - -
Name => Semi Dev_
Age =>  32
Level =>  1001
```

Tiếp theo, chúng ta sẽ tìm hiểu về tính năng đóng gói `Encapsulation` giúp ẩn đi các yếu tố tiện ích nội bộ trong `package` không cần chia sẻ cho code sử dụng bên ngoài.

[[Procedural Programming + Ada] Bài 11 - Package Privacy & Type Encapsulation](https://viblo.asia/p/vlZL9NdvVQK)