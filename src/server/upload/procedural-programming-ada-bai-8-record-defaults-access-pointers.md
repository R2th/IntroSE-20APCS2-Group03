Mặc dù việc thiết lập giá trị mặc định cho các trường dữ liệu khi khởi tạo `record` được `Ada` hỗ trợ ở cấp độ cú pháp của ngôn ngữ. Tuy nhiên ở bài viết giới thiệu về `record` trước đó, mình đã tránh đề cập tới để duy trì định nghĩa `record` đơn giản và tập trung vào các yếu tố định kiểu dữ liệu. Và bây giờ đã là thời điểm phù hợp để chúng ta có thể tìm hiểu nhiều hơn về `record` trong `Ada`.

## Record Defaults

Để thiết lập giá trị mặc định cho các trường dữ liệu của `record`, thao tác cần thực hiện chỉ đơn giản là gắn thêm một phép gán vào sau các yếu tố định kiểu dữ liệu giống với các ngôn ngữ như `TypeScript` hay `Kotlin`.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   type Date is record
      Day   : Integer range 1 .. 31   := 1;
      Month : Integer range 1 .. 12   := 1;
      Year  : Integer range 1 .. 3000 := 1900;
   end record;

   Birthday : Date;
begin
   Put_Line ("Birthday : record Date");
   Put_Line ("   Day   => " & Integer'Image (Birthday.Day));
   Put_Line ("   Month => " & Integer'Image (Birthday.Month));
   Put_Line ("   Year  => " & Integer'Image (Birthday.Year));
end Main;
```

Và thực tế thì tất cả các biến được khai báo ở bất kỳ vị trí nào, bao gồm các tham số của các `sub-program` và các biến cục bộ cũng đều có thể được gắn giá trị mặc định với thao tác tương tự (nếu cần thiết).

```CMD|Terminal.io
Birthday : record Date
   Day   =>  1
   Month =>  1
   Year  =>  1900
```

## Discriminant

Các `record` cũng có thể được định nghĩa kèm theo `discriminant`. Điều này cũng rất cần thiết nếu như chúng ta đang thiết kế `record` có chứa các `array` và muốn để cho code sử dụng bên ngoài quyết định độ rộng của `array` bên trong `record` ở thời điểm định kiểu dữ liệu cho biến lưu trữ.

```discriminant.adb
subtype Positive_Integer is Integer range 1 .. Integer'Last;
type Item_List (size : Positive_Integer) is record
   Name : String;
   List : array (1 .. size) of String;
end record;
```

Ngoài ra thì các yếu tố `discriminant` còn được sử dụng để định nghĩa `variant record` - tạm hiểu là kiểu `record` có cấu trúc thay đổi tùy thuộc vào yếu tố `discriminiant` được cung cấp ở thời điểm định kiểu cho một biến nào đó. Các `variant record` của `Ada` được so sánh tương đương với `union` trong `C` hay `C++` và các kiểu dữ liệu gộp `sum type` trong các ngôn ngữ `FP` như `Elm` hay `Haskell`.

Tuy nhiên vì một vài lý do chủ quan về mặt cú pháp ngôn ngữ, mình sẽ không sử dụng các `variant record` trong suốt Sub-Series này và chỉ trích dẫn liên kết tham khảo ở đây nếu bạn quan tâm [`learn.adacore.com > Variant Records`](https://learn.adacore.com/courses/intro-to-ada/chapters/more_about_records.html#variant-records).

## Access Pointer

Các biến con trỏ `pointer` trong `C` hay `C++` là các công cụ lập trình rất mạnh mẽ. Tuy nhiên, với góc nhìn đứng từ môi trường ứng dụng và triết lý thiết kế của `Ada` thì đây lại là những cấu trúc thiếu an toàn. Chính vì vậy nên `Ada` đã cung cấp những công cụ thay thế như các chỉ dẫn `in` và `out` cho các tham số của các `sub-program`, và một khái niệm biến tham chiếu có tên là `access`.

Mặc dù được `Ada` gọi là kiểu con trỏ nhưng các biến `access` không có ý nghĩa về mặt cấu trúc giống như các `pointer` trong `C` hay `C++`, mà thực ra các con trỏ `access` chỉ mang tính chất danh nghĩa và cung cấp thêm một cú pháp sử dụng thay thế cho kiểu dữ liệu ban đầu.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   type Item; -- early declaration
   type Item_Access is access Item;

   -- detail definition
   type Item is record
      Value: Integer;
      Next_Access: Item_Access;
   end record;

   -- declare local variables
   Integer_List_Access: Item_Access;
   New_Access : Item_Access;
   Current_Access: Item_Access;
begin
   New_Access := new Item'( Value => 0, Next_Access => null );
   Integer_List_Access := New_Access;

   -- add new item
   New_Access := new Item'( Value => 1, Next_Access => Integer_List_Access );
   Integer_List_Access := New_Access;

   -- add new item
   New_Access := new Item'( Value => 2, Next_Access => Integer_List_Access );
   Integer_List_Access := New_Access;
   
   -- move cursor to first item and print list
   Current_Access := Integer_List_Access;
   Put ("List : ");
   while Current_Access /= null loop
      Put (Integer'Image (Current_Access.Value) & " ");
      Current_Access := Current_Access.Next_Access;
   end loop;
end Main;
```

```CMD|Terminal.io
List :  2  1  0
```

Trong code ví dụ này thì chúng ta đang định nghĩa `Integer_List` là một danh sách xuất phát từ một `Item` nối tiếp tới một `Item` tiếp theo, và cứ thế cho tới vô cùng. Chúng ta sẽ không thể định nghĩa trường `Next` trỏ tới chính kiểu `Item` đang định nghĩa, tuy nhiên lại có thể tạo ra một kiểu con trỏ `access` gián tiếp trỏ tới `Item` để sử dụng ở đây.

Tất cả các thao thực hiện thông qua các con trỏ `access` đều có cú pháp giống với khi thao tác qua các biến thông thường, ngoại trừ thao tác khởi tạo giá trị lưu trữ sẽ yêu cầu sử dụng phép thực thi `new`, và thao tác truy xuất tổng bộ `record` từ con trỏ `access` sẽ được thực hiện thông qua trường `Record_Access.all` để có thể gán sang một biến khác thuộc kiểu dữ liệu ban đầu.

Và ở đây chúng ta có giá trị `null` được `Ada` chỉ sử dụng duy nhất cho các con trỏ `access` để mô tả trạng thái vô định, chưa trỏ tới một đối tượng dữ liệu nào. Còn ngoài ra thì như đã nói trước đó là `Ada` không hỗ trợ việc sử dụng giá trị `null` cho các kiểu dữ liệu khác. Khi xây dựng các `package` cung cấp các công cụ làm việc với một kiểu dữ liệu nào đó, chúng ta sẽ phải tự định nghĩa trường hợp giá trị vô nghĩa với logic hoạt động của các `sub-program` nếu cần thiết.

Oh, và chúng ta lại được biết thêm là các kiểu dữ liệu có thể được khai báo ngắn gọn `declaration` ở phía trên và sau đó định nghĩa chi tiết `definition` có thể được viết vào một thời điểm sau đó. Bằng cách này thì chúng ta sẽ có thể sử dụng tên của một kiểu dữ liệu được khai báo tạm thời cho các định nghĩa kiểu dữ liệu khác có liên quan liên quan - trước khi viết định nghĩa cụ thể cho kiểu ban đầu.

## Dereference Access

Ngoài ra thì khi sử dụng các biến con trỏ `access` thì đôi khi chúng ta sẽ muốn thực hiện thao tác gán thông tin từ một con trỏ `access` vào một biến thuộc kiểu dữ liệu ban đầu. Thao tác này được gọi là `dereference` và được thực hiện thông qua khóa `all` của con trỏ `access`.

```dereference.adb
Pointer : Item_Access = new Item'( Value => 1, Next_Access => null );
Normal : Item := Pointer.all;
```

Đây là thao tác đặc biệt duy nhất được `Ada` ngầm định cho các `record` và các `array`. Ngoài ra thì trong các trường hợp khác, nếu như chúng ta sử dụng tính năng đóng gói để ẩn đi định nghĩa chi tiết của các kiểu dữ liệu thì thao tác `dereference` sẽ phải được thực hiện trong code như trên.

Và ở chiều ngược lại của `dereference`, khi chúng ta muốn tách lấy địa chỉ tham chiếu từ một biến thông thường để gán vào một con trỏ `access`. Khóa `all` của con trỏ `access` vẫn được sử dụng với ý nghĩa tương tự.

```reference.adb
Normal : Item := ( Value => 1, Next_Access => null );
Pointer : Item_Access := null;
-- ...
Pointer.all := Normal;
```

Vẫn còn rất nhiều thứ đề nói về `record` và chúng ta sẽ tiếp tục tìm hiểu thêm ở những bài viết tiếp theo.

[[Procedural Programming + Ada] Bài 9 - Tagged Records & Primitive Operations](https://viblo.asia/p/zXRJ8jmqVGq)