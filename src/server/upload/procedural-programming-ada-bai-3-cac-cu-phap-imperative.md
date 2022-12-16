Để tiện cho việc tạo và quản lý các tệp code rời cho mỗi ví dụ, chúng ta sẽ thiết lập `project` và sử dụng trình `gprbuild` thay cho trình biên dịch `gnatmake`. Ở đây mình sẽ tạo một thư mục có tên là `learn-ada` trong `Documents` với cấu trúc như sau:

```
learn-ada
├── learn_ada.gpr
├── obj
└── src
    └── main.adb
```

Tệp `learn_ada.gpr` là một dạng khai báo giống như `package.json` của các `project` trên nền `NodeJS`, tuy nhiên có cấu trúc đơn giản hơn khá nhiều:

```learn_ada.gpr
project Learn_Ada is
   for Languages use ("Ada", "C");
   for Source_Dirs use ("src/**");
   for Object_Dir use "obj";
   for Main use ("main.adb");
   -- for Library_Kind use "Dynamic";
   -- for Library_Dir use "lib";
   -- for Library_Name use "compiled_pkg";
end Learn_Ada;

```

- Chúng ta có các ngôn ngữ có thể được sử dụng trong `project` là `Ada` và `C` (có thể lược bỏ bớt tùy nhu cầu sử dụng).
- Tất cả các tệp code mà chúng ta viết sẽ được đặt trong thư mục `src`, và các cấp thư mục con bên trong `src`.
- Thư mục chứa các tệp thực thi sau khi biên dịch xong là `obj`.
- Code của chương trình sẽ bắt đầu từ tệp `main.adb` đặt ở ngay cấp đầu tiên trong thư mục `src`.
- Cuối cùng là các dòng `comment` ví dụ cho việc khai báo sử dụng thêm một thư viện mà chúng ta viết đã biên dịch thành các tệp thực thi, bao gồm:
    - Kiểu thư viện đã được biên dịch gọi là `Dynamic`
    - Tên thư mục chứa các tệp thực thi là `lib`
    - Tên project của thư viện là `compiled_pkg`

Bây giờ chúng ta cần `copy/paste` lại code của chương trình `Hello World`:

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   -- khu vực khai báo các biến
begin
   -- in "Hello, Ada !" ra cửa sổ dòng lệnh
   Put_Line ("Hello, Ada !");
end Main;
```

Trong cửa sổ dòng lệnh, di chuyển tới thư mục làm việc là `Documents/learn-ada`, sau đó chạy lệnh biên dịch bằng trình quản lý dự án `gprbuild`.

```CMD|Terminal.io
cd Documents && cd learn-ada
gprbuild learn_ada.gpr

learn_ada.gpr:1:09: warning: there are no sources of language "C" in this project
Compile
   [Ada]          main.adb
Bind
   [gprbind]      main.bexch
   [Ada]          main.ali
Link
   [link]         main.adb
```

Như vậy là tiến trình biên dịch chương trình "Hello, World!" đã thành công với một cảnh báo `warning` nhè nhẹ về việc chúng ta đã khai báo rằng `project` này sẽ sử dụng lẫn 2 ngôn ngữ là `Ada` và `C` nhưng trình biên dịch lại chưa tìm thấy tệp code `C` nào cả. 

Bạn có thể điều chỉnh lại code khai báo trong tệp `learn_ada.gpr` để lược bỏ bớt `C` trong danh sách các ngôn ngữ sử dụng trong `project` hoặc cứ bỏ qua cái dòng `warning` kia cũng được. Đằng nào thì chúng ta cũng sẽ tìm hiểu về cách thức giao tiếp trực tiếp giữa `Ada` và `C` sau khi đã nắm được phần kiến thức trọng tâm về ngôn ngữ `Ada`.

Bây giờ chúng ta sẽ tiếp tục chạy tệp thực thi `main` được `gprbuild` tạo ra trong thư mục `obj`.

```CMD.io
obj\main
```

```Terminal.io
obj/main
```

![image.png](https://images.viblo.asia/be65a21e-285e-4c10-bcf9-eee30a8eef6f.png)

Thao tác chạy lệnh biên dịch và tệp `main` sẽ cố định thế này bởi vì chúng ta đã thiết lập tệp `gpr` để tự tìm tất cả các tệp code trong thư mục `src`. Trong các ví dụ từ đây trở về sau thì mình sẽ chỉ `copy/paste` kết quả chạy tệp `main` để giảm bớt các thao tác lặp không cần thiết. Và bây giờ thì chúng ta sẽ điểm danh qua tất cả các cú pháp `imperative` phổ biến.

## Khai Báo Biến

Mở đầu là thao tác khai báo biến và phép gán giá trị. Chúng ta có tên các biến được đặt theo dạng thức của các `sub-program` và các `package`, với chữ cái đầu tiên của mỗi từ viết hoa và các từ được nối với nhau bởi dấu gạch chân `_`. 

Cú pháp định kiểu dữ liệu cho biến của `Ada` là dạng mô tả hậu tố giống với `Scala`, `TypeScript`, `Kotlin`, v.v... Theo sau tên biến là `: Type`. Và thao tác gán sử dụng ký hiệu `:=` giống với `SQL` thay vì ký hiệu `=` như phần lớn các ngôn ngữ khác.

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

```CMD|Terminal.io
N is  0
Now is  1
```

Do hiện tại chúng ta chưa chạm tới các thư viện tiêu chuẩn nên sẽ tạm ghi nhớ thao tác nối chuỗi là `&`. Kèm theo đó là thao tác chuyển số nguyên `N` sang kiểu chuỗi là `Integer'Image (N)`. So với `C` thì phần khai báo biến được `Ada` quy định khu vực riêng bằng cấu trúc của cú pháp. Còn khi viết chương trình trong `C` thì thói quen của các `dev` giỏi truyền lại là nên tập trung khai báo trong các dòng đầu tiên của các `sub-program`.

## If .. Then .. Else

Cú pháp `if .. else` nối tiếp của `Ada` cũng rất thân thuộc so với các ngôn ngữ `Imperative` khác. Ở đây chúng ta có từ `then` được sử dụng để kết thúc biểu thức xét điều kiện và ở đoạn nối tiếp `else if` được viết gộp thành `elsif` theo phiên âm.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;

procedure Main is
   N : Integer;
begin
   Put ("Enter : "); Get (N);

   if N = 0 or N = 360 then
      Put_Line ("Due North");
   elsif N in 1 .. 89 then
      Put_Line ("North-East");
   elsif N = 90 then
      Put_Line ("Due East");
   elsif N in 91 .. 179 then
      Put_Line ("South-East");
   elsif N = 180 then
      Put_Line ("Due South");
   elsif N in 181 .. 269 then
      Put_Line ("South-West");
   elsif N = 270 then
      Put_Line ("Due West");
   elsif N in 271 .. 359 then
      Put_Line ("North-West");
   else
      Put_Line ("Not in Range");
   end if;
end Main;
```

Nhân tiện thì chúng ta học được thêm thao tác in chuỗi không ngắt dòng `Put (String)` và thao tác `Get (N)` để đọc kết quả nhập liệu của người dùng và ghi vào biến `N`. Các phép kiểm tra điều kiện được sử dụng trong ví dụ bao gồm:

- Kiểm tra nhận định giá trị tương đương `=`.
- Từ khóa `or` tương đương với ký hiệu `||` trong `C` và `JavaScript` mà chúng ta đã biết.
- Phép kiểm tra `in` để xét phần tử thuộc một tập hợp các giá trị nào đó.

```CMD|Terminal.io
Enter : 0
Due North
```

Thực sự là nếu xét trên tiêu chí giao diện lập trình bậc cao thì `Ada` thân thiện hơn so với `C` rất nhiều. Nếu bạn để ý thì các thủ tục có sẵn của `Ada` đều có tên rất rõ ràng và đầy đủ chứ không viết tắt như các `sub-program` trong thư viện tiêu chuẩn của `C`. Ví dụ như trình chuyển kiểu bất kỳ sang kiểu số nguyên của `C` được đặt tên là `atoi()` - nếu được hiểu đầy đủ thì là `any_to_integer`.

Câu chuyện nằm ở chỗ là `C` được thiết kế khởi điểm để giao tiếp ở cấp độ tiếp giáp với các tài nguyên của hệ thống `low-level programming`, người ta luôn cố gắng tối giản các tên định danh trong thao tác đặt tên các biến và các `sub-program`. Có lẽ vì vậy nên `C` mạnh mẽ nhưng việc sử dụng `C` cho các ứng dụng phổ thông lại rất nhọc nhằn so với các ngôn ngữ lập trình bậc cao. Và `Ada`, có lẽ là được tạo ra để hoàn thiện `C` ở khía cạnh này.

## Case .. When

Thay vì `switch .. case` thì chúng ta có `case .. when` rất tương đồng với `SQL`:

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;

procedure Main is
   N : Integer;
begin
   Put ("Enter : "); Get (N);

   case N is
      when 0 | 360      => Put_Line ("Due North");
      when 1 .. 89      => Put_Line ("North-East");
      when 90           => Put_Line ("Due East");
      when 91 .. 179    => Put_Line ("South-East");
      when 180          => Put_Line ("Due South");
      when 181 .. 269   => Put_Line ("South-West");
      when 270          => Put_Line ("Due West");
      when 271 .. 359   => Put_Line ("North-West");
      when others       => Put_Line ("Au revoir");
   end case;
end Main;
```

Oh.. phép thực thi `or` trong cú pháp này được thay bằng ký hiệu `|`. Mình đã thử sử dụng ký hiệu này vào lại vị trí của `or` trong cú pháp `if .. else` thì thấy báo lỗi. Đây là điểm mà chúng ta có thể cần phải ghi nhớ ngay và luôn.

## Ternary Operator

Ngoài các cấu trúc lệnh rẽ nhánh thì trong `C` và `JavaScript` chúng ta còn biểu thức điều kiện `Ternary Operator` để kiểm tra một điều kiện và chọn giá trị gán cho biến.

```main.js
var first = 1
var second = 12
var which = (first > second) ? first : second
console.log (which)
// result : 12
```

Nếu `first > second` thì chọn `first` để gán vào `which`, nếu không thì chọn `second`. Và trong một số ngôn ngữ khác thì các ký hiệu `?` và `:` sẽ được thay bằng các từ khóa mang ý nghĩa rõ ràng hơn. Mà nếu vậy thì `Ada` chắc chắn là sẽ sử dụng các từ khóa, ở bài trước họ giới thiệu rõ ràng vậy rồi mà.

```src/main.adb
procedure Main is
   First, Second, Which : Integer;
begin
   First := 1;
   Second := 12;
   Which := (if First > Second then First else Second);
   Put_Line ("Which : " & Integer'Image (Which));
end Main;
```

```CMD|Terminal.io
Which :  12
```

Ngôn ngữ `Elm` được giới thiệu trong Sub-Series trước đó cũng có biểu thức điều kiện `if .. else` tương tự. Tuy nhiên, điểm khác biệt là trong `Ada` chúng ta sẽ cần sử dụng một cặp ngoặc đơn `()` để khoanh vùng biểu thức này. Có lẽ là vì để dễ tách thông tin khi đọc một câu lệnh dài với các yếu tố được cách đều bằng một khoảng trống.

## Các Vòng Lặp

So với các ngôn ngữ `Imperative` phổ biến thì `Ada` không có cú pháp `do .. while`, mà thay vào đó thì có vòng lặp đơn thuần `bare-loop` không giới hạn số lần lặp. Ở đây chúng ta sẽ phải chèn một câu lệnh kiểm tra điều kiện và thoát khỏi vòng lặp vào một số điểm cần thiết:

- `loop` - từ khóa mở đầu vòng lặp
- `exit when .. ;` - câu lệnh kiểm tra điều kiện thoát khỏi vòng lặp
- `end loop;` - từ khóa kết thúc vòng lặp

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;

procedure Main is
   I : Integer;
begin
   I := 0;
   
   loop
      Put (Integer'Image (I));
      I := I + 1;
      exit when I = 9;
   end loop;
end Main;
```

```CMD|Terminal.io
 1 2 3 4 5 6 7 8 9
```

Cú pháp vòng lặp `for .. in` có cách thức hoạt động khá giống với các cú pháp `for .. in/of` của `JavaScript`.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;

procedure Main is
   --
begin
   for I in 1 .. 9 loop
      Put (Integer'Image (I));
   end loop;
end Main;
```

Và cú pháp vòng lặp `while` cũng rất thân thuộc.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Ada.Integer_Text_IO; use Ada.Integer_Text_IO;

procedure Main is
   I : Integer;
begin
   I := 1;

   while I <= 9 loop
      Put (Integer'Image (I));
      I := I + 1;
   end loop;
end Main;
```

Tiếp theo chúng ta sẽ nói về các `sub-program`...

[[Procedural Programming + Ada] Bài 4 -  Package & Sub-Program](https://viblo.asia/p/aAY4qwjrLPw)