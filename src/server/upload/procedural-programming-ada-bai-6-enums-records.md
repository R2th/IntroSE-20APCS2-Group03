Như vậy là chúng ta đã điểm qua các kiểu dữ liệu đơn nguyên được định nghĩa sẵn bởi Ada và một thao tác rất hữu ích khi muốn tạo ràng buộc biên lưu trữ nhỏ hơn cho một biến bất kỳ. Đó là thao tác định nghĩa một `subtype` từ một kiểu dữ liệu đã được định nghĩa trước đó.

## Type

Một `subtype` không phải là một kiểu dữ liệu hoàn toàn mới so với kiểu ban đầu và có thể tham gia vào các biểu thức tính toán cùng với kiểu ban đầu mà không cần phải thực hiện thao tác chuyển đổi kiểu dữ liệu. Bên cạnh đó thì `Ada` cũng hỗ trợ chúng ta định nghĩa các kiểu `type` hoàn toàn mới.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   type d is new Integer range 1 .. 31;
   Day : d;
   I : Integer;
begin
   Day := 23;
   I := 1;
   -- try to increase Day by I
   Day := Day + I;
   Put_Line (d'Image (Day));
end Main;
```

Ở đây chúng ta đang định nghĩa kiểu `d` để biểu thị các ngày trong tháng từ kiểu số nguyên `Integer` với biên giá trị giới hạn trong khoảng `1 .. 31`. Sau đó chúng ta đã khai báo biến `Day : d` và biến `I : Integer`, và thử thực hiện phép toán cộng gộp giá trị số nguyên `I` vào `Day`. Do `d` là kiểu dữ liệu hoàn toàn mới chứ không phải là một `subtype`, thao tác này hiển nhiên sẽ không hợp lệ.

```Console.io
gprbuild -q -P learn_ada.gpr
main.adb:18:15: error: invalid operand types for operator "+"
main.adb:18:15: error: left operand has type "d" defined at line 5
main.adb:18:15: error: right operand has type "Standard.Integer"
gprbuild: *** compilation phase failed
```

## Enum

Trước khi tự định nghĩa một kiểu dữ liệu phức hợp với thao tác `type`, chúng ta sẽ xem xét một trường hợp phổ biến khác - đó là khi chúng ta muốn định nghĩa một kiểu đơn nguyên với một tập giá trị hữu hạn có thể liệt kê được `Enumerable`.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   type dddd is (Sun, Mon, Tue, Wed, Thu, Fri, Sat);
begin
   for Day in dddd loop
      case Day is
         When Sun => Put_Line (dddd'Image (Day) & " : Sunday");
         When Mon => Put_Line (dddd'Image (Day) & " : Monday");
         When Tue => Put_Line (dddd'Image (Day) & " : Tuesday");
         When Wed => Put_Line (dddd'Image (Day) & " : Wednesday");
         When Thu => Put_Line (dddd'Image (Day) & " : Thursday");
         When Fri => Put_Line (dddd'Image (Day) & " : Friday");
         When Sat => Put_Line (dddd'Image (Day) & " : Saturday");
      end case;
   end loop;
end Main;
```

Ở đây chúng ta đang định nghĩa `dddd` là một kiểu `type` mới với tập giá trị được liệt kê trong ngoặc đơn `( Sun, ..., Sat );`. Sau đó chúng ta đã thử lặp qua tập giá trị này và in các giá trị này kèm theo ý nghĩa biểu thị các ngày trong tuần.

```Console.io
SUN : Sunday
MON : Monday
TUE : Tuesday
WED : Wednesday
THU : Thursday
FRI : Friday
SAT : Saturday
```

Như đã thấy trong kết quả thì chúng ta có các giá trị được liệt kê trong cặp ngoặc đơn định nghĩa `dddd` đã được lưu thành một tập các hằng số mà chúng ta có thể lặp qua bằng một vòng lặp. Thao tác định nghĩa các kiểu `Enum` rất hữu ích khi sử dụng với `case .. when` bởi chúng ta có thể dễ dàng liệt kê đầy đủ các trường hợp khả thi mà không cần dự trù `when others`.

## Record

Tất cả những kiểu dữ liệu mà chúng ta đã biết tới trước đó, đều là các kiểu đơn nguyên. Bây giờ chúng ta sẽ tự định nghĩa một kiểu dữ liệu tổ hợp. Tương tự như việc sử dụng `struct` trong `C`, thì `Ada` gọi đây là `record` (bản ghi) - để mô tả các bản ghi dữ liệu về các thực thể trong cuộc sống.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   type Date is record
      Day   : Integer range 1 .. 31;
      Month : Integer range 1 .. 12;
      Year  : Integer range 1 .. 3000;
   end record;

   Birthday : Date;
begin
   Birthday := ( Day   => 13
               , Month => 2
               , Year  => 1990 );

   Put_Line ("Birthday : record Date");
   Put_Line ("   Day   => " & Integer'Image (Birthday.Day));
   Put_Line ("   Month => " & Integer'Image (Birthday.Month));
   Put_Line ("   Year  => " & Integer'Image (Birthday.Year));
end Main;
```

Ở đây chúng ta định nghĩa một kiểu `record` có tên là `Date` để mô tả ngày tháng với các trường dữ liệu lần lượt là `Day`, `Month`, `Year`, đều là các giá trị số nguyên `Integer`. Sau đó chúng ta đã tạo ra một bản ghi `Bỉrthday` với các trường dữ liệu tương ứng.

```Console.io
Birthday : record Date
   Day   =>  13
   Month =>  2
   Year  =>  1990
```

Ok. Như vậy là chúng ta đã biết cách tự định nghĩa một kiểu dữ liệu phức hợp để mô tả các thực thể dữ liệu cần quản lý. Trong bài viết tiếp theo, chúng ta sẽ điểm qua cấu trúc mảng `Array` để hỗ trợ lưu trữ tập các bản ghi dữ liệu và những điểm khác biệt của `Array` trong `Ada` so với các ngôn ngữ khác.

[[Procedural Programming + Ada] Bài 7 - Arrays &  Strings](https://viblo.asia/p/yZjJYjgDLOE)