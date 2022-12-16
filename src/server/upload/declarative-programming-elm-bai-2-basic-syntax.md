Sau khi đã `copy/paste` và chạy thử thành công chương trình `Hello World` đơn giản thì chúng ta đã có thể bắt đầu xem xét từng yếu tố mới mẻ trong cú pháp của một ngôn ngữ lập trình thuần `Declarative`. Câu chuyện lúc này quay trở lại với phần định nghĩa căn bản song song của hai mô hình lập trình `Imperative Programming` và `Declarative Programming`.

## Ngôn ngữ thuần Declarative

Như đã giới thiệu trước đó trong bài viết [[JavaScript] Bài 23 - Imperative & Declarative](https://viblo.asia/p/javascript-bai-23-imperative-declarative-gDVK2r2XKLj) của Series Tự Học Lập Trình Web, thì từ `Imperative` chỉ đơn giản là để mô tả khía cạnh tạo nên logic hoạt động của code bằng `các câu lệnh tuần tự`. Trong hầu hết các ngôn ngữ lập trình thì người ta còn sử dụng thêm các cú pháp `Declarative` cho phép người viết code đặt tên cho các đoạn code nhằm mục đích sắp xếp kiến trúc của chương trình, có thể là các chương trình con `sub-program`, hay các hàm `function`, hay `class`, v.v....

Và thường thì các ngôn ngữ lập trình phổ biến được gọi là `Imperative` thì có nghĩa là sẽ có yếu tố đầu tiên đóng vai trò chủ đạo, chứ không hẳn là thuần `Imperative` 100%. Còn nếu một ngôn ngữ nào đó được gọi là `Declarative` thì ngoài khả năng trộn lẫn các yếu tố `Imperative` ví dụ như `SQL`, chúng ta còn có thể sẽ bắt gặp các ngôn ngữ thuần `Declarative` 99.99%.

À.. chỗ này thì chúng ta có thể hiểu là chương trình được viết bởi một ngôn ngữ thuần `Declarative` sẽ không có `các câu lệnh logic tuần tự`. Các chương trình con `sub-program` và cả những yếu tố khác nữa trong môi trường thuần `Declarative`, sẽ được tạo ra hoàn toàn bằng các cú pháp khai báo và biểu đạt logic tương quan với nhau chứ không được xây dựng bởi các câu lệnh logic tuần tự. Xuất phát từ chương trình chính `main` là điểm khởi chạy một chương trình bất kỳ, chúng ta có định nghĩa ngắn gọn thế này -

```program.txt
output = main (input)
```

Đó có nghĩa là khi sử dụng một chương trình `program` bất kỳ thì chúng ta luôn dự kiến một kết quả `output` sẽ có thể thu được từ việc gọi chương trình chính `main` với một tham số đầu vào `input`. Cái dạng thức này hình như là được ảnh hưởng từ một lĩnh vực nào đó khác thì phải. :D

```math.txt
y = f(x)
```

Chắc chắn là như vậy rồi. :D Thế rồi logic xử lý bên trong của chương trình `main` sẽ được biểu thị như thế nào nếu như chúng ta không được sử dụng các câu lệnh logic tuần tự? Hãy xem cùng xem lại code chương trình `Hello Elm !` ở bài viết trước một chút.

```~/Documents/learn-elm/src/Main.elm
module Main exposing (main)
import Html exposing (Html, text)

main : Html message
main = text "Hello Elm !"
```

Ở đây chúng ta có code logic của chương trình chính `main` chỉ có một dòng duy nhất là -

```~/Documents/learn-elm/src/Main.elm
-- ...
main = text "Hello Elm !"
```

Và dòng code này có thể được đọc là chương trình chính `main` không yêu cầu tham số đầu vào và được định nghĩa là `=` kết quả của việc chạy chương trình con `text` với tham số truyền vào là chuỗi `Hello Elm !`. Như vậy là điểm mới mẻ đầu tiên mà chúng ta nhận thấy trong cú pháp của `Elm` đó là khi gọi một `sub-program`, chúng ta sẽ không cần phải viết các dấu ngoặc đơn `()` như cú pháp của `C` hay `JavaScript`.

Bây giờ chúng ta sẽ chỉnh sửa lại chương trình này một chút và thử xem cú pháp khai báo một `sub-program` có yêu cầu tham số đầu vào trông như thế nào -

```~/Documents/learn-elm/src/Main.elm
module Main exposing (main)
import Html exposing (Html, text)

main : Html message
main = text (greet "Elm")

greet : String -> String
greet name = "Hello " ++ name ++ " again !"
```

Sau khi sửa lại code, tại cửa sổ dòng lệnh, bạn chạy câu lệnh sau -

```CMD|Terminal.io
elm reactor
```

Lúc này trình biên dịch `elm` sẽ tạo một `HTTP server` tự động cập nhật kết quả code và chúng ta sẽ không cần phải gõ lại lệnh `elm make` nữa. Tệp `index.html` và thư mục hỗ trợ `elm-stuff` đều có thể được xóa đi và chỉ khi nào chúng ta đã học đủ kiến thức về cú pháp ngôn ngữ và các công cụ để xây dựng một trang web đơn thì mới cần thiết phải biên dịch thành tệp thực thi như vậy. Để xem kết quả vận hành của code, bạn mở cửa sổ trình duyệt web và truy cập vào địa chỉ dưới đây -

[`http://localhost:8000/`](http://localhost:8000/)
![](https://images.viblo.asia/e3e7ded3-270f-4eeb-b519-f6c804005bec.png)

Ở giao diện quản lý tệp hiện ra trong cửa sổ trình duyệt web, bạn mở thư mục `src` và nhấn vào tên tệp `Main.elm` để xem kết quả vận hành của code mới chỉnh sửa lại.

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/2f0e4718-7df1-4c93-b2a6-65e400bb1a14.png)

Như vậy là để khai báo hay định nghĩa một `sub-program` có yêu cầu tham số đầu vào thì chúng ta chỉ cần viết tên của tham số đó ngay sau tên của `sub-program` -

```~/Documents/learn-elm/src/Main.elm
-- ...
greet name = "Hello " ++ name ++ " again !"
```

Như vậy thì nhìn chung là chúng ta sẽ có một chương trình được viết trong môi trường thuần `Declarative` sẽ là các lời gọi xếp chồng của các chương trình con để xử lý từng phần một của logic cần biểu thị cho đến khi thu được kết quả `output` cuối cùng. Hiển nhiên là bên cạnh đó thì chúng ta cũng sẽ có những cú pháp hỗ trợ khác nữa để diễn đạt logic của chương trình ngắn gọn,  xúc tích, và liền lạc hơn, để giảm thiểu số lượng các `sub-program` cần được tạo ra. :D

## Định kiểu dữ liệu

Giống với `C`, trình biên dịch của `Elm` sẽ giúp chúng ta sàng lọc những lỗi lập trình tiềm ẩn bằng cách duyệt qua các yếu tố định kiểu `type-hinting` trong code mà chúng ta viết, để đảm bảo rằng chương trình sau khi được biên dịch xong sẽ không có lỗi phát sinh trong quá trình vận hành `runtime error`.

Và ở đây `Elm` cũng có một cơ chế tự động ngầm định kiểu dữ liệu của các biến hay các tham số nếu như đã có đủ thông tin nhờ các phép thực thi `operator` hay các `sub-program` đang sử dụng các biến này. Mặc dù vậy thì chúng ta vẫn nên khởi đầu ngay với việc học cách viết `type-hinting` đầy đủ như code ví dụ mà mình đã `copy/paste` để giới thiệu trong các ví dụ trước đó.

Cụ thể là chúng ta có chương trình con `greet` được `type-hint` là sẽ nhận vào một tham số kiểu `String` và trả về kết quả là một giá trị cũng thuộc kiểu `String`.

```~/Documents/learn-elm/src/Main.elm
-- ...
greet : String -> String
```

Còn chương trình chính `main` như đã nói trước đó là sẽ không yêu cầu tham số đầu vào và trả về kết quả thuộc kiểu `Html message`.

## Sử dụng Module

Yếu tố còn lại mà chúng ta chưa nói đến trong chương trình mở đầu đó là các tên định danh như kiểu chương trình con `Html message`, hay chương trình con `text` được cung cấp từ dòng `import` ở phía trên.

```~/Documents/learn-elm/src/Main.elm
-- ...
import Html exposing (Html, text)
```

Dòng này thì có thể hiểu đơn giản là chúng ta đang `import` một `module` có sẵn với tên là `Html` và phần `exposing (Html, text)` là để khi viết code sử dụng các tên định danh này ở phía bên dưới thì chúng ta sẽ không phải viết lại nhiều lần tên của `module` đứng ở phía trước và tham chiếu bởi dấu `.` như thế này -

```~/Documents/learn-elm/src/Main.elm
-- ...

main : Html.Html message
main = Html.text ...
```

Cuối cùng là tham số `message` trong dòng `type-hint` có thể được đặt tên định danh tùy ý giống như tham số `name` đối với chương trình con `greet`. Và trong hầu hết các trường hợp khi xây dựng các ứng dụng đơn giản, chúng ta sẽ không mấy khi gặp phải vấn đề trùng lặp tên định danh từ các `module` khác nhau; Do đó, chúng ta có thể viết tắt đoạn `exposing` thành ký hiệu biểu trưng `..` thay cho danh sách các tên dịnh danh. Như vậy, tất cả các thành phần trong `module` được `import`, chắc chắn sẽ có thể được sử dụng bằng cách viết tên trực tiếp mà không tham chiếu bằng tên `module` đứng ở phía trước.

Đó là thao tác `import` một `module` để sử dụng. Bây giờ chúng ta sẽ tách chương trình con `greet` ra một `module` riêng. Trong thư mục `src`, chúng ta cần tạo thêm một tệp mới là `Greet.elm` và di chuyển code định nghĩa chương trình con `greet` vào như sau - 

```~/Documents/learn-elm/src/Greet.elm
module Greet exposing (greet)

greet : String -> String
greet name = "Hello " ++ name ++ " !"
```

Để khai báo một `module` thì chúng ta cần viết ngay ở dòng đầu tiên của tệp đó và `exposing` để mở những thành phần mà chúng ta muốn code ở các `module` khác có thể `import` để sử dụng. Tuy nhiên khác với thao tác `exposing` khi `import`, khi khai báo các `module`, thường thì chúng ta nên liệt kê chính xác chỉ những thành phần muốn để mở cho code bên ngoài sử dụng, chứ không nên sử dụng cú pháp tự động `exposing` toàn bộ.

Ở tệp `Main.elm`, chúng ta thực hiện thao tác `import Greet` tương tự như đối với `module Html` và mặc định `exposing` tất cả các thành phần mà code định nghĩa của các `module` đó đã `exposing` ra bên ngoài.

```~/Documents/learn-elm/src/Main.elm
module Main exposing (main)
import Html exposing (..)
import Greet exposing (..)

main : Html message
main = text (greet "Elm Module")
```

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/65714e9e-7637-49d7-841b-1c57e4a137d5.png)

Như vậy là chúng ta đã nắm bắt được cú pháp căn bản của một ngôn ngữ thuần `Declarative` để biểu thị các `sub-program` đơn giản. Tiếp theo, chúng ta sẽ tìm hiểu về các kiểu dữ liệu căn bản và các cú pháp hỗ trợ, giúp cho chúng ta có khả năng biểu thị logic hoạt động phức tạp hơn khi định nghĩa các `sub-program`.

## Hello JS again !

```main.js
// -- main : any -> null
const main = (_) => console.log (greet ("JS"))

// -- greet : string -> string
const greet = (name) => "Hello " + name + " again !"

// -- start program
main (Infinity)
```

[[Declarative Programming + Elm] Bài 3 - Basic Types](https://viblo.asia/p/y37LdA5MVov)