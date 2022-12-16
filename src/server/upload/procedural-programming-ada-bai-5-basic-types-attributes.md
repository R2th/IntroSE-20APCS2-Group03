Thiết kế của `Ada` có trọng tâm nhấn rất mạnh vào tính năng định kiểu đặc biệt mạnh mẽ. Nếu để kể hết những yếu tố chi tiết mà `Ada` cung cấp xoay quanh tính năng này thì có lẽ chúng ta sẽ cần khoảng vài bài viết với mật độ kiến thức khá dày. Tuy nhiên thì để duy trì mọi thứ đơn giản và có cái nhìn tổng quan tốt hơn, trong bài viết này chúng ta sẽ chỉ điểm danh qua một số kiểu dữ liệu cơ bản tương tự như đã sử dụng trong các ngôn ngữ khác.

## Basic Types

[ Các Giá Trị Số Học ]

- `Integer` - biểu thị các giá trị số nguyên.
- `Float` - biểu thị các giá trị số thực với độ rộng lưu trữ `32bit`.
- `Long_Float` - tương đương với `double` trong `C`, `Java`, v.v... và `number` trong `JavaScript` với độ rộng lưu trữ `64bit`.

Có một đặc trưng đáng lưu ý ở đây, đó là `Ada` sẽ không bao giờ tự động ngầm định thao tác chuyển đổi kiểu dữ liệu ngay cả khi trình biên dịch đã có đủ dữ kiện về kiểu dữ liệu của các biến.

```main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   A, B : Integer;
   R : Float;
begin
   A := 0;
   B := 1;
   R := A + B;
   Put_Line ("Result : " & Float'Image (R));
end Main;
```

```Console.io
gprbuild -q -P learn_ada.gpr
check_positive.adb:9:11: error: expected type "Standard.Float"
check_positive.adb:9:11: error: found type "Standard.Integer"
```

[ Nhận Định Logic ]

- `Boolean` - biểu thị các giá trị nhận định logic `TRUE` hoặc `FALSE`.

[ Nội Dung Văn Bản ]

- `Character` - biểu thị các ký tự đơn bao gồm các chữ cái và các ký tự đặc biệt.
- `String` - biểu thị chuỗi ký tự có độ dài cố định.
- `Bounded_String` - lưu trữ chuỗi có độ dài không cố định nhưng có độ dài tối đa khi định nghĩa.
- `Unbounded_String` - lưu trữ chuỗi có độ dài không cố định và không giới hạn độ dài tối đa.

Hm.. có lẽ đây là điểm cần lưu ý, chúng ta sẽ cần xác định rõ các thao tác muốn thực hiện với một chuỗi ký tự để chọn kiểu dữ liệu phù hợp trong `Ada`.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   -- khai báo biến có độ rộng 10 ký tự
   Message : String (1 .. 10);
begin
   -- thử lưu chuỗi có độ rộng 6 ký tự
   Message := "Hello!";
   Put_Line (Message);
end Main;
```

```Console.io
gprbuild -q -P learn_ada.gpr
main.adb:7:15: warning: wrong length for array of subtype of "Standard.String" defined at line 5 [enabled by default]
main.adb:7:15: warning: Constraint_Error will be raised at run time [enabled by default]

out/main
raised CONSTRAINT_ERROR : main.adb:7 length check failed
```

[ Giá Trị Vô Nghĩa ]

Đặc biệt, `Ada` không sử dụng giá trị `null` để biểu thị sự thiếu vắng dữ liệu ở một tên định danh bất kỳ. Nơi duy nhất mà `null` được sử dụng là các biến con trỏ mà chúng ta sẽ nói đến trong một bài viết khác.

## Subtypes

Nhân tiện khi thực hiện một ví dụ về đặc trưng định kiểu của `Ada` với `String`. Chúng ta đang có một thông báo lỗi liên quan tới từ `subtype` - tạm dịch là một kiểu dữ liệu có biên giá trị nhỏ hơn được định nghĩa từ một kiểu dữ liệu đã có trước đó.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   subtype Positive_Integer is Integer range 1 .. Integer'Last;
   P : Positive_Integer;
   I : Integer;
begin
   I := 9;
   P := I - 8;
   P := P - 1;   -- error
   Put_Line ("P is " & Integer'Image (P));
end Main;
```

```Console.io
gprbuild -q -P learn_ada.gpr
main.adb:10:11: warning: value not in range of type "Positive_Integer" defined at line 4 [enabled by default]
main.adb:10:11: warning: Constraint_Error will be raised at run time [enabled by default]

out/main
raised CONSTRAINT_ERROR : main.adb:10 range check failed
```

Như đã thấy thì trong kết quả biên dịch code chúng ta đã nhận được cảnh báo `warning` ở dòng `P := P - 1;` sẽ bị tràn giá trị lưu trữ. Tuy nhiên ở dòng `P := I - 8;` thì logic vận hành hoàn toàn được cho phép chứ không giống như trong trường hợp của `Float` và `Integer`.

Và ở đây chúng ta có thể hiểu rằng `subtype` sẽ không tạo ra một kiểu dữ liệu mới, mà tạo ra một giới hạn ràng buộc nhỏ hơn so với kiểu dữ liệu ban đầu. Chúng ta sẽ có thể sử dụng các thao tác tính toán với các biến thuộc kiểu dữ liệu gốc bình thường. Thao tác định nghĩa `subtype` như thế này sẽ rất hữu ích nếu chúng ta muốn tạo ràng buộc cho một biến lưu kết quả tính toán.

## Attributes

Các thuộc tính `attribute` trong `Ada` có thể được hiểu như các phương thức được thiết kế để làm việc với các yếu tố như kiểu dữ liệu `Type`, các giá trị `Value`, và các chương trình con `Sub-program`. Chúng ta đã sử dụng `attribute` ngay từ ví dụ `Hello, World!` ở bài viết mở đầu. Đó là `Image`, một thuộc tính chung của các kiểu dữ liệu để chuyển một giá trị thuộc kiểu đó thành một chuỗi `String`.

```main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   N : Integer;
begin
   N := 0;
   Put_Line ("N is " & Integer'Image (N));
   -- update value
   N := N + 1;
   Put_Line ("Now is " & Integer'Image (N));
end Main;
```

Ký tự nháy đơn `'` ở đây được sử dụng khá giống với phép thực thi `.` khi chúng ta sử dụng một phương thức `static` trong `JavaScript`. Và để duy trì mục tiêu của bài viết xoay quanh việc giới thiệu các khái niệm thì chúng ta sẽ chỉ ghi chú một số thuộc tính `attribute` phổ biến sau:

- `Type'Image (Value)` - chuyển một giá trị `Value` thuộc kiểu `Type` thành chuỗi `String`.
- `Type'Value (String)` - chuyển một chuỗi `String` thành một giá trị `Value` thuộc kiểu `Type`.
- `Type'First` - trả về giá trị đầu tiên trong biên giá trị thuộc kiểu `Type`.
- `Type'Last` - trả về giá trị cuối cùng trong biên giá trị thuộc kiểu `Type`.

Còn đây là danh sách đầy đủ các thuộc tính `attribute` mà `Ada` cung cấp: [`Wikipedia - Attribute List`](https://en.wikibooks.org/wiki/Ada_Programming/Attributes)

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   N : Integer;
begin
   N := Integer'Value ("1990");
   Put_Line ("Scanned : " & Integer'Image (N));
   --
   N := Integer'First;
   Put_Line ("Min : " & Integer'Image (N));
   --
   N := Integer'Last;
   Put_Line ("Max : " & Integer'Image (N));
end Main;
```

```Console.io
Scanned :  1990
Min : -2147483648
Max :  2147483647
```

Trong bài viết tiếp theo, chúng ta sẽ nói về việc tự định nghĩa các kiểu dữ liệu mới.

[[Procedural Programming + Ada] Bài 6 - Enums & Records](https://viblo.asia/p/GAWVpoKDL05)