Trước khi nói chi tiết về mảng `Array` trong `Ada` thì chúng ta sẽ điểm lại khái niệm `Array` mà chúng ta đã được cập nhật sau khi đã đi qua một vài bài viết về cấu trúc dữ liệu `DSA` trong Sub-Series [[Imperative Programming + C]](https://viblo.asia/p/imperative-programming-c-bai-11-simplicity-dsa-c-array-mo-dau-oOVlY0dnZ8W).

> Mảng `Array` là một trong số những cấu trúc dữ liệu phổ biến được sử dụng để lưu trữ tập các giá trị hữu hạn ở dạng `key/value`, tương tự như `Object` và `Map`. Tuy nhiên, đặc trưng riêng của `Array` so với hai cấu trúc dữ liệu còn lại là các khóa `key` của `Array` chỉ có thể là các giá trị số nguyên `Integer` trong cùng một tập đếm `Enum`. Và cũng vì lý do này nên các khóa `key` của `Array` hay thường được gọi là các trị số đề mục `index`.

## Array

Điểm thú vị ở đây là `Ada` sử dụng định nghĩa `Array` hoàn toàn chính xác như trên. Chúng ta sẽ không có những ràng buộc kiểu như: Tập `key` của `Array` phải xuất phát từ `0`. Khá giống với `C` và các ngôn ngữ định kiểu tĩnh `static-typing` khác, khi sử dụng `Array` trong `Ada` thì chúng ta sẽ cần phải khai báo `Array` với độ dài cố định để trình biên dịch phân bổ bộ nhớ và kiểu dữ liệu lưu trữ.

Tuy nhiên thay vì chỉ đặt vào một giá trị số nguyên để mô tả độ rộng của `Array` thì ở đây - trong `Ada` - chúng ta sẽ cần phải chỉ ra một tập giá trị số nguyên `Integer` được sử dụng để làm tập trị số đề mục `Index`.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   -- define array type
   type Integer_Array is
      array (1 .. 9) of Integer;
   -- declare variables
   The_Array : Integer_Array;
   Value : Integer;
begin
   -- initialize array
   The_Array := (10, 20, 30, 40, 50, 60, 70, 80, 90);
   -- print the array
   for I in The_Array'Range loop
      Value := The_Array (I);
      Put_Line ( "The_Array "
               & Integer'Image (I)
               & " => "
               & Integer'Image (Value) );
   end loop;
end Main;
```

Oh, và với định nghĩa `Array` như trong code ví dụ trên thì chúng ta sẽ có một mảng lưu trữ các giá trị số nguyên `Integer` với tập `Index` xuất phát từ `1` thay vì luôn luôn mặc định là `0` như các ngôn ngữ khác. Và ở đây chúng ta cũng biết thêm một thuộc tính `Attribute` của `Array` được sử dụng rất phổ biến trong `Ada` đó là `Range`. Khi gọi `Array'Range` thì chúng ta sẽ thu được một tập các giá trị số nguyên `Enum` đang được sử dụng làm các trị số đề mục `Index` cho `Array` đó.

```CMD|Terminal.io
The_Array  1 =>  10
The_Array  2 =>  20
The_Array  3 =>  30
The_Array  4 =>  40
The_Array  5 =>  50
The_Array  6 =>  60
The_Array  7 =>  70
The_Array  8 =>  80
The_Array  9 =>  90
```

Và như đã đề cập trước đó thì định nghĩa `Array` của `Ada` thực sự hoàn toàn nguyên bản. Chúng ta chỉ cần đảm bảo rằng tập `Index` là tập các giá trị số nguyên có thể đếm tuần tự `Enum`. 

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   -- define array type
   type Index is (Sun, Mon, Tue, Wed, Thu, Fri, Sat);
   type Integer_Array is
      array (Index) of Integer;
   -- declare variables
   The_Array : Integer_Array;
   Value : Integer;
begin
   -- initialize array
   The_Array := (0, 10, 20, 30, 40, 50, 60);
   -- update first index
   The_Array (Sun) := 90;
   -- print the array
   for I in Index loop
      Value := The_Array (I);
      Put_Line ( "The_Array "
               & Index'Image (I)
               & " => "
               & Integer'Image (Value) );
   end loop;
end Main;
```

Điều này có thể trở nên khả thi bởi vì các kiểu `Enum` mà chúng ta tự định nghĩa trong các ngôn ngữ lập trình nói chung đều sẽ tạo ra một tập giá trị số nguyên `Integer` với tên tham chiếu đặc định tùy ý muốn.

```CMD|Terminal.io
The_Array SUN =>  90
The_Array MON =>  10
The_Array TUE =>  20
The_Array WED =>  30
The_Array THU =>  40
The_Array FRI =>  50
The_Array SAT =>  60
```

## Aggregate

Sau khi đã điểm qua định nghĩa `Array` trong `Ada` thì có một câu hỏi mới phát sinh về thao tác khởi tạo giá trị mặc định cho các phần tử trong mảng. Cụ thể là giả sử chúng ta cung cấp định nghĩa một mảng số nguyên có `Index` là một tập `Enum` có độ rộng `100` thì lúc này chúng ta sẽ không thể cứ thế liệt kê lần lượt `100` giá trị mặc định tương ứng trong cú pháp khởi tạo mảng.

Thay vào đó thì chúng ta sẽ có thể sử dụng cú pháp khởi tạo các giá trị giống với cú pháp khởi tạo của `record` và thường được gọi là cú pháp mô tả tập hợp `Aggregate Notation` hay ngắn gọn là `Aggregate`. Đối với `Array` thì chúng ta sẽ có thể sử dụng một khóa đặc biệt có tên gọi là `others` để áp dụng một giá trị mặc định cho tất cả các vị trí `Index` chưa được liệt kê.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   -- define array type
   type Index is (Sun, Mon, Tue, Wed, Thu, Fri, Sat);
   type Integer_Array is
      array (Index) of Integer;
   -- declare variables
   The_Array : Integer_Array;
   Value : Integer;
begin
   -- initialize array
   The_Array := ( Mon => 10
                , Tue => 20
                , others => 0 );
   -- print the array
   for I in Index loop
      Value := The_Array (I);
      Put_Line ( "The_Array "
               & Index'Image (I)
               & " => "
               & Integer'Image (Value) );
   end loop;
end Main;
```

Như trong code ví dụ ở trên thì chúng ta đã chỉ định vị trí của khóa `Mon` sẽ lưu giá trị `10`, và vị trí của khóa `Tue` sẽ lưu giá trị là `20`. Tất cả các vị trí còn lại trong mảng sẽ được xem là các khóa thuộc nhóm `others` và lưu giá trị `0`.

```CMD|Terminal.io
The_Array SUN =>  0
The_Array MON =>  10
The_Array TUE =>  20
The_Array WED =>  0
The_Array THU =>  0
The_Array FRI =>  0
The_Array SAT =>  0
```

## String

Kiểu chuỗi ký tự `String` là một kiểu `Array` được định nghĩa sẵn và cung cấp trong các ngôn ngữ lập trình nói chung với các `sub-program` tiện ích hoạt động theo phương thức của `Array`. Ở đây chúng ta cũng sẽ điểm qua một số đặc điểm của `String` trong `Ada` trên phương diện là một `Array` chứa các giá trị thuộc kiểu `Character`.

```src.main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   Name : String (1 .. 9);
begin
   Name := "Semi Dev ";
   Name (9) := '_';
   Put_Line (Name);
end Main;
```

Chính xác thì kiểu `String (1 .. 9)` có ý nghĩa tương đương với `array (1 .. 9) of Character`. Tuy nhiên nếu như chúng ta định nghĩa lại một kiểu giá trị tương đương với `String` đã có sẵn thì với những thao tác như `Put_Line` chúng ta sẽ phải thực hiện việc chuyển kiểu dữ liệu thủ công sang kiểu `String` do `Ada` không hỗ trợ việc chuyển kiểu dữ liệu ngầm định.

```CMD|Terminal.io
Semi Dev_
```

Oh, không hề có thông báo lỗi khi chúng ta thay đổi ký tự cuối cùng trong chuỗi `Name`. Tức là `Ada` không hẳn nhìn nhận `String` là một kiểu đơn nguyên `primitive` như các ngôn ngữ khác, mà thay vào đó thì chúng ta đang có chính xác một `Array` các giá trị `Character` và có thể thực hiện các thao tác chỉnh sửa `Array` thông thường.

Thao tác khởi tạo giá trị cho các vị trí trong `String` cũng có thể được thực hiện theo từng phần với các dải `Index` nhỏ, thay vì khởi tạo với một chuỗi có đủ độ rộng như định nghĩa.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   Name : String (1 .. 9);
begin
   Name (1 .. 4) := "Semi";
   Name (5) := ' ';
   Name (6 .. 8) := "Dev";
   Name (9) := '_';
   Put_Line (Name);
end Main;
```

Và khi muốn tách lấy một phần của mảng ký tự ban đầu thì chúng ta cũng có thể sử dụng cú pháp `Index` dạng `range` tương tự

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   Name : String (1 .. 9);
begin
   Name := "Semi Dev_";
   Put_Line ("First Name: " & Name (1 .. 4));
end Main;
```

```CMD|Terminal.io
First Name: Semi
```

Oh, như vậy là ngay cả trong trường hợp sử dụng kiểu `String` có độ rộng cố định thì chúng ta cũng không hẳn cần phải tạo ra nhiều biến lưu trữ khác nhau. Điều quan trọng là dự trù độ rộng tối đa của dữ liệu cần lưu trữ và sau đó thực hiện các thao tác chỉnh sửa trực tiếp nội dung của chuỗi đó.

## Discriminant

Thao tác khai báo biến `Name : String (1 .. 9)` khiến mình nhận ra là cú pháp định nghĩa `Array` ở phía trên vẫn còn một điểm thiếu linh động. Giả sử chúng ta tạo ra các biến kiểu `String` lưu trữ nội chung khác nhau như tiêu đề các cuốn sách `Title` và tên tác giả `Author` thì hiển nhiên chúng ta sẽ gắn kiểu `String` có độ rộng khác nhau cho mỗi biến này.

Thành phần tham số được đặt trong cặp ngoặc đơn `(...)` sau tên kiểu dữ liệu được `Ada` gọi là các tham số phân định `Discriminant`, bởi các tham số này sẽ khiến cho các biến được xem là có định kiểu khác nhau. Cụ thể là một biến được định kiểu `String (1 .. 9)` thì hiển nhiên là sẽ không tương đồng với một biến được định kiểu `String (1 .. 5)`.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   -- define array type
   type Character_Array is
      array (Integer range <>) of Character;
   -- declare variables
   First_Name : Character_Array (1 .. 4);
   Last_Name : Character_Array (6 .. 9);
   Full_Name : String (1 .. 9);
begin
   -- initialize variables
   First_Name := ('S', 'e', 'm', 'i');
   Last_Name := ('D', 'e', 'v', '_');
   Full_Name := (others => ' ');
   -- compute full name
   for I in First_Name'Range loop
      Full_Name (I) := First_Name (I);
   end loop;
   for I in Last_Name'Range loop
      Full_Name (I) := Last_Name (I);
   end loop;
   -- print full name
   Put_Line ("Full Name: " & Full_Name);
end Main;
```

Cặp ký hiệu `<>` mà chúng ta đặt vào phần định nghĩa `range` của `Index` có nghĩa là hai giá trị biên của `range` sẽ được cung cấp ở thời điểm mà kiểu `Character_Array` được sử dụng để định kiểu cho các biến cụ thể. Hiển nhiên trong `Ada` thì không chỉ các `Array` mới có thành phần `Discriminant` như thế này và chúng ta sẽ còn có thể định nghĩa các kiểu dữ liệu khác với khả năng biến thiên theo các tham số `Discriminant` để phù hợp với nhu cầu sử dụng.

```CMD|Terminal
Full Name: Semi Dev_
```

Trong bài viết tiếp theo chúng ta sẽ tìm hiểu thêm về `Record` và các kiểu giá trị lưu trữ địa chỉ tham chiếu hay còn được gọi là con trỏ `pointer` trong `C`.

[[Procedural Programming + Ada] Bài 8 - Record Defaults & Access Pointers](https://viblo.asia/p/BQyJK32bJMe)