Cấu hình ngôn ngữ của `Ada` có hỗ trợ một dạng thiết kế có tên là `Design by Contract` - có thể được hiểu là thiết kế phần mềm dựa trên các điều kiện ràng buộc đối với dòng dữ liệu trao đổi giữa các `sub-program`. Thuật ngữ này được giới thiệu lần đầu bởi giáo sư Bertrand Meyer khi trình bày về nguyên lý thiết kế của ngôn ngữ lập trình [`Eiffel`](https://www.eiffel.org/doc/solutions/Eiffel_Software_Free_Eiffel_Library_License_%28IFELL%29) do chính ông tạo ra.

Trong bối cảnh của `Eiffel` - là một ngôn ngữ lập trình hướng đối tượng `OOP` - các thỏa thuận `contract` xuất hiện với vai trò là các điều kiện ràng buộc căn bản trong tương tác giữa các `object`. Ý tưởng này xuất phát từ các giao dịch thương mại trong cuộc sống hàng ngày của chúng ta, khi mà các bên tham gia đều phải xác nhận sự đồng thuận trên các bản hợp đồng giao dịch.

Và trong `Ada`, nguyên lý `DbC` căn bản được biểu thị bởi các yếu tố:

- Các ràng buộc `contract` trước `pre` và sau `post` tương tác - áp dụng cho các `sub-program`.
- Các ràng buộc `contract` định kiểu `predicate` - giống với `pre` và `post` nhưng áp dụng cho các `type`.
- Các ràng buộc `contract` định kiểu `invariant` - giống với `predicate` nhưng áp dụng cho các kiểu định nghĩa `private`.

## Pre & Post

Các ràng buộc `contract` trước `pre` và sau `post` được sử dụng để mô tả dự kiến đối với các tham số và giá trị trả về của các `sub-program`. 

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
   Result : Integer;
   
   procedure Do_Something
      ( Input  : in Integer
      ; Output : out Integer )
   with Pre => (Input > 0)
      , Post => (Output < 9) is
   begin -- Do_Something
      Output := 9;
   end Do_Something;
begin -- Main
   Result := 9;
   Do_Something (0, Result);
   Put_Line (Integer'Image (Result));
end Main;
```

Trong code ví dụ ở trên, chúng ta có `procedure Do_Something` với khối `contract` được chỉ định bởi các khóa `with` theo sau đó là các vế điều kiện `Pre` và `Post`. Và ở phần code sử dụng `Do_Something`, chúng ta đã truyền các giá trị vào các tham số tương ứng là `Input = 0` và `Ouput = 9` đều không hợp lệ với các `contract`. Để các tính năng `DbC` có thể hoạt động thì chúng ta cần chỉ định cho trình biên dịch kích hoạt chế độ kiểm tra `assertion` bằng tham số `-gnata`.

```CMD|Terminal.io
gprbuild -gnat2020 -gnata learn_ada.gpr
```

Do chế độ `assertion` là các yếu tố kiểm tra sẽ được áp dụng tại thời điểm `runtime` để tạo ra các `Exception` phù hợp. Vì vậy nên chúng ta sẽ không thấy `gnat` thông báo lỗi trong tiến trình biên dịch.

```CMD|Terminal.io
cd obj && main && cd ..

raised ADA.ASSERTIONS.ASSERTION_ERROR : failed precondition from main.adb:...
```

Như vậy là chương trình sẽ dừng hoạt động ngay khi thao tác kiểm tra tại `Pre` tạo ra `Exception`. Bạn có thể chỉnh sửa lại code ví dụ để kiểm tra hoạt động của vế điều kiện `Post` nếu muốn. Kết quả thông báo lỗi sẽ không có gì khác biệt nhiều.

```CMD|Terminal.io
raised ADA.ASSERTIONS.ASSERTION_ERROR : failed postcondition from main.adb:...
```

Đối với các hàm `function` thì kết quả được trả về không thông qua tham số nào và vì vậy nên `Ada` có cung cấp thuộc tính `Function'Result` để hỗ trợ mô tả `Post contract`.

```function-contracts.adb
function Triple (Value : Integer)
   return Integer
with Pre => (Value > 0)
   , Post => (Triple'Result < 100)
is Result : Integer;
begin -- Triple
   Result := Value * 3;
   return Result;
end Triple;
```

## Predicates

Các vế điều kiện `Pre` và `Post` chỉ có hiệu lực khi các `sub-program` được vận hành thực tế. Vì vậy nên các công cụ này sẽ chỉ thể hiện các `Exception` tại `run-time`. Tuy nhiên, các `Predicate` áp dụng cho các `type` lại có thêm khả năng kiểm tra tại thời điểm biên dịch code. Cụ thể là chúng ta có 2 loại `Predicate`:

- `Static_Predicate` - kiểm tra các đối tượng dữ liệu ở thời điểm biên dịch `compile-time`. Ví dụ như các hằng số được định nghĩa bởi các thư viện bên ngoài mà chúng ta muốn tích hợp vào `project`.
- `Dynamic_Predicate` - kiểm tra các đối tượng dữ liệu ở thời điểm vận hành `run-time`.

Về cú pháp sử dụng thì chúng ta vẫn sẽ sử dụng từ khóa `with` để liệt kê các vế `Predicate` giống với khi viết các vế `Pre` và `Post`. Tuy nhiên, khối `contract` lúc này được đặt cố định ở cuối code định nghĩa `type` hoặc `subtype`.

```predicate.adb
type Course is record
   Name       : Unbounded_String;
   Start_Date : Date;
   End_Date   : Date;
end record
with Dynamic_Predicate => (Course.Start_Date < Course.End_Date);
```

Lưu ý ở đây là các `Predicate` chỉ hỗ trợ các `type` và `subtype` được cung cấp định nghĩa `public`. Trong trường hợp cần sử dụng tính năng đóng gói `Type Encapsulation` đã được giới thiệu trước đó, bạn có thể tham khảo thêm tài liệu về `Type_Invariant` tại đây - [`learn.adacore.com`](https://learn.adacore.com/courses/intro-to-ada/chapters/contracts.html#type-invariants).

## Exceptions

Như vậy là chúng ta đã biết thêm những công cụ hỗ trợ kiểm tra kết quả vận hành của code mà không cần phải viết `Unit Test`. Khi đã có thể tạo ra những `Exception` mô tả các trường hợp ngoại lệ, công cụ tiếp theo mà chúng ta cần tìm hiểu là cú pháp xử lý ngoại lệ của `Ada`.

```src/main.adb
with Ada.Text_IO; use Ada.Text_IO;
with Ada.Exceptions;  use Ada.Exceptions;

procedure Main is
   Type_Exception : exception;
   Value_Exception : exception;
begin -- Main
   raise Value_Exception with "Message of Value_Exception";

   -- maybe ...
   -- long ...
   -- code ...
   
   exception
      when Exc : Type_Exception => Put_Line ("Invalid Type");
      when Exc : Value_Exception => Put_Line (Exception_Message (Exc));
end Main;
```

Trong code ví dụ ở trên, chúng ta đã tự định nghĩa các kiểu `Type_Exception` và `Value_Exception`. Sau đó phát động một sự kiện ngoại lệ với kiểu `Value_Exception`. Các sự kiện ngoại lệ sẽ được chuyển tiếp từ nơi được phát động cho tới các khối `block` tham chiếu từ bên ngoài, cho đến khi tìm thấy trong phạm vi của một `block` nào đó có một khối xử lý ngoại lệ `exception .. when` như trên.

Trong trường hợp một ngoại lệ đã được phát động và chuyển tiếp cho tới khối code tại `Main` và vẫn không tìm thấy khối xử lý ngoại lệ `exception .. when` nào thì chương trình sẽ dừng hoạt động tại vị trí câu lệnh phát động sự kiện ngoại lệ.

[[Procedural Programming + Ada] Bài 14 - Multi-Tasking & Protected Types](https://viblo.asia/p/EbNVQZ5b4vR)