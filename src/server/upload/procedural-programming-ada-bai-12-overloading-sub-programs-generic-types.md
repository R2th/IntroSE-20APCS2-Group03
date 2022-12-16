Nói riêng về đặc tính Đa Hình `Polymorphism`, đây không phải là một đặc trưng riêng của `OOP` mà là một trong số những khái niệm chung phổ biến của lĩnh vực khoa học máy tính nói chung. Và việc biểu thị `Polymorphism` được quan tâm trong mọi môi trường lập trình bao gồm cả `Procedural Programming` và `Functional Programming`.

Trong một bài viết trước đó của Series [Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/p/gwd43B9XVX9), mình đã cố gắng giới thiệu định nghĩa tổng quan và các kiểu logic biểu thị `Polymorphism` khi nói tới mô hình lập trình `OOP`. Trong số các kiểu logic biểu thị `Polymorphism` được tổng hợp bởi [`Wikipedia`](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) thì ở đây chúng ta đã được thấy `Sub-Typing Polymorphism` xuất hiện cùng với khái niệm `Type'Class`.

Ngoài ra thì các kiểu logic biểu thị còn lại là `Ad-hoc Polymorphism` và `Parametric Polymorphism` được hỗ trợ bởi các tính năng khác của ngôn ngữ, bao gồm:

- `Overloading Sub-program` - định nghĩa lại các phiên bản khác nhau của cùng một tên gọi `sub-program` với các bộ chữ ký `signature` khác nhau, bao gồm bộ kiểu dữ liệu của các tham số và kiểu dữ liệu trả về (nếu có).
- `Generic Type` - sử dụng tên biểu trưng trừu tượng `Type` cho thao tác định kiểu để biểu thị cho kiểu dữ liệu bất kỳ dùng làm tham số cho các `sub-program` và `package`. Sau đó, ở mỗi thời điểm viết code sử dụng các `sub-program` và `package` thì chúng ta có thể chỉ định một kiểu dữ liệu cụ thể tại vị trí của `Type` tùy nhu cầu sử dụng.

## Overloading Sub-program

Ở đây chúng ta sẽ làm một ví dụ nhỏ gói gọn trong tệp khởi chạy `main.adb` với tên `procedure` là `Put_Total` sẽ được `overload` với các `signature` lần lượt là: `Put_Total (String, String)` và `Put_Total (Integer, Integer)`.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Humanity; use Humanity;

procedure Main is

   procedure Put_Total (First, Second : in String) is
   begin
      Put_Line (First & " " & Second);
   end Put_Total;

   procedure Put_Total (First, Second : in Integer) is
   begin
      Put_Line ("Total : " & Integer'Image (First + Second));
   end Put_Total;

begin -- Main

    Put_Total ("Try", "Best");
    Put_Total (1, 2);

end Main;
```

```CMD|Terminal.io
Try Best
Total :  3
```

Thao tác `overloading function` cũng không có gì khác biệt so với `procedure`, cứ miễn sao chúng ta tạo ra các `signature` khác nhau cho mỗi phiên bản định nghĩa `function` cùng tên. Lưu ý duy nhất đó là đối với `funtion` thì chúng ta sẽ có các `signature` bao gồm cả kiểu dữ liệu trả về `return`. Và có lẽ chúng ta sẽ không cần viết thêm code ví dụ cho các `funtion` .

## Generic Sub-program

Hãy xuất phát với một ví dụ đơn giản, định nghĩa `generic type` sử dụng cho một `sub-program`.

```learn-ada/src.tree
src
├── main.adb
└── printer
    ├── printer.adb
    └── printer.ads
```

```src/printer/printer.ads
package Printer is
   generic type T is private;
   procedure Print (Value : in T);
end Printer;
```

```src/printer/printer.adb
with Ada.Text_IO; use Ada.Text_IO;

package body Printer is

   procedure Print (Value : in T) is
   begin
      Put_Line ("Value : " & T'Image (Value));
   end Print;

end Printer;
```

Như vậy là chúng ta đang có kiểu `T` được định nghĩa là một `generic type` và sử dụng để định kiểu cho tham số `Value`. Lúc này khi viết code sử dụng `Print`,  chúng ta có thể chỉ định kiểu dữ liệu cụ thể tùy mục đích sử dụng.

```src/main.adb
with Printer; use Printer;

procedure Main is
   procedure Print_Integer is new Print (T => Integer);
   procedure Print_Float is new Print (T => Float);
begin
   Print_Integer (123456789);
   Print_Float (12.3456789);
end Main;
```

> Lưu ý về trình biên dịch GNAT - Để sử dụng thuộc tính `Image` của một kiểu bất kỳ `T`, chúng ta sẽ cần chỉ định cho trình biên dịch chế độ hoạt động sử dụng phiên bản mới nhất của ngôn ngữ `Ada`.

```CMD|Terminal.io
gprbuild -gnat2020 learn_ada.gpr
cd obj && main && cd ..
```

```CMD|Terminal.io
Value :  123456789
Value :  1.23457E+01
```

Tuyệt.. Như vậy là chúng ta đã không phải viết lặp lại code định nghĩa chương trình `Print` cho mỗi kiểu dữ liệu. Và trong trưởng hợp cần sử dụng thêm nhiều tham số `generic` khác nữa, chúng ta chỉ cần định nghĩa thêm các `generic type` khác tương tự như `T`.

Một lưu ý khác nữa, đó là khi sử dụng các `generic sub-program` như trên thì chúng ta không hẳn cần phải đặt nhiều tên khác nhau cho `sub-program` cụ thể, mà có thể viết ở dạng `overloading` với cùng một tên gọi.

```src/main.adb
with Printer; use Printer;

procedure Main is
   procedure Print_Value is new Print (T => Integer);
   procedure Print_Value is new Print (T => Float);
begin
   Print_Value (123456789);
   Print_Value (12.3456789);
end Main;
```

## Generic Package

Trong trường hợp muốn sử dụng `generic type` trong định nghĩa của `record`, chúng ta sẽ cần phải di chuyển việc khai báo `generic type` ra phía bên ngoài `package`. Thao tác này sẽ biểu thị rằng - `package` này được thiết kế dạng tổng quát.

```learn-ada/src.tree
src
├── list
│   ├── list.adb
│   └── list.ads
└── main.adb
```

```src/list/list.ads
generic type T is private;

package List is

   type Item;
   type Item_Access is access Item;

   -- - - - - - - - - - - - - -

   type Container is record
      Head_Access : Item_Access;
   end record;

   type Item is record
      Value : T;
      Next_Access : Item_Access;
   end record;

   -- - - - - - - - - - - - - -

   procedure Add_Value
      ( List_Container : in out Container
      ; New_Value : in T );
                        
   procedure Print_All (List_Container : in Container);

end List;
```

Đây là code ví dụ của bài viết về con trỏ `access` mà chúng ta đã đi qua trước đó được viết lại với `generic type`.

```src/list/list.adb
with Ada.Text_IO; use Ada.Text_IO;

package body List is

   procedure Add_Value
      ( List_Container : in out Container
      ; New_Value : in T )
   is New_Access : Item_Access;
   begin -- Add_Value
      New_Access := new Item'(New_Value, List_Container.Head_Access);
      List_Container.Head_Access := New_Access;
   end Add_Value;

   procedure Print_All (List_Container : in Container) is
      Current_Access : Item_Access;
   begin -- Print_All
      Current_Access := List_Container.Head_Access;
      Put ("List : ");
      while Current_Access /= null loop
         Put (T'Image (Current_Access.Value) & " ");
         Current_Access := Current_Access.Next_Access;
      end loop;
   end Print_All;

end List;
```

Và khi viết code sử dụng `generic package` thì chúng ta cũng dùng cú pháp `new` để chỉ định kiểu dữ liệu cụ thể cho toàn bộ tất cả các vị trí sử dụng `T` trong định nghĩa của `package`.

```src/main.adb
with List;

procedure Main is
   package Integer_List is new List (T => Integer);
   Number_List : Integer_List.Container;
   New_Access : Integer_List.Item_Access;
begin
   Number_List := (Head_Access => null);
   -- add new items
   Integer_List.Add_Value (Number_List, 0);
   Integer_List.Add_Value (Number_List, 1);
   Integer_List.Add_Value (Number_List, 2);
   -- print the list
   Integer_List.Print_All (Number_List);
end Main;
```

```CMD|Terminal.io
List :  2  1  0
```

Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu về một công cụ rất đặc biệt của `Ada` - có mặt trong một số ít các ngôn ngữ lập trình khác.

[[Procedural Programming + Ada] Bài 13 - Design by Contracts](https://viblo.asia/p/bXP4WPjkJ7G)