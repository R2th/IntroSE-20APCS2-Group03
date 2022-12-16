Như vậy là chúng ta đã có thể hiểu được các yếu tố cú pháp căn bản trong code chương trình mở đầu với `Elm`. Giống với tiến trình học `JavaScript` hay `C` trước đó, bước tiếp theo để tìm hiểu một ngôn ngữ lập trình bất kỳ sau khi đã nắm bắt được cú pháp căn bản, đó là chúng ta cần làm quen với các kiểu dữ liệu cơ bản mà ngôn ngữ và môi trường vận hành cung cấp.

```Documents/learn-elm/src/Main.elm
-- ...

main : Html message
main = text (greet "Elm")
```

```Documents/learn-elm/src/Greet.elm
module Greet exposing (greet)

greet : String -> String
greet name = "Hello " ++ name ++ " Module !"
```

Trong code ví dụ của chương trình mở đầu thì chúng ta có kiểu `Html message` và `String` đang được sử dụng làm `type-hint`. Trong đó thì `Html message` là kiểu dữ liệu được định nghĩa mở rộng từ các kiểu dữ liệu căn bản và cung cấp bởi `module Html` dành cho việc xây dựng giao diện người dùng trên nền web. Và chúng ta sẽ tạm thời chỉ quan tâm tới những kiểu dữ liệu căn bản kèm theo cách thức để định nghĩa những kiểu dữ liệu phức hợp theo ý muốn. Còn về `module Html` thì chúng ta sẽ tiếng hành tìm hiểu sau khi đã nắm bắt được phần trọng tâm của ngôn ngữ.

## Primitive

Giống với `JavaScript` và `C`, ở đây `Elm` cũng định nghĩa những kiểu dữ liệu có tính cấu trúc dựa trên các kiểu dữ liệu căn bản thường được gọi là `primitive` - hay các kiểu dữ liệu để biểu thị các kiểu giá trị đơn giản và nguyên bản. Để thực hiện các ví dụ mô tả phần kiến thức này, chúng ta sẽ cần mở thêm một cửa sổ dòng lệnh khác và di chuyển tới cùng thư mục làm việc `learn-elm` và chạy lệnh `elm repl`.

```CMD|Terminal.io
cd Documents && cd learn-elm
elm repl
```

Câu lệnh `elm repl` sẽ chuyển cửa sổ dòng lệnh của hệ điều hành thành một môi trường code tương tác, nơi mà chúng ta có thể viết các mảnh code ngắn và xem ngay được kết quả kiểm tra của trình biên dịch `compiler`.

```REPL.elm
import Greet exposing (..)
greet "Elm REPL"
```

![](https://images.viblo.asia/6e106e4e-2ba4-4820-a752-819fb6c88770.png)

Như bạn đã thấy thì trong kết quả thực thi của lời gọi chương trình con `greet` thì giá trị thu được là một chuỗi `"Hello Elm REPL !"` và có tên kiểu dữ liệu là `String`. Ngoài ra thì chúng ta còn các kiểu dữ liệu `primitive` khác là:

- `Char` - biểu thị các ký tự chữ cái đơn lẻ. Ví dụ: `'E'`
- `Bool` - biểu thị các giá trị nhận định logic `True` và `False`
- `Float` - biểu thị các giá trị số thực. Ví dụ: `10.01`
- `Int` - biểu thị các giá trị số nguyên. Ví dụ: `10`

![](https://images.viblo.asia/4aa8c717-9337-4e4c-b4d8-fdd81d23a773.png)

À.. ngoài ra thì còn có kiểu `number` để tượng trưng cho một giá trị số học bất kỳ khi mà chúng ta không cung cấp thông tin gì thêm cho trình biên dịch `compiler` biết đó là `Float` hay `Int`.

## Record

Tương tự với các ngôn ngữ lập trình `Imperative`, tính năng căn bản mà chúng ta cần tới khi làm việc với các kiểu dữ liệu đó là có thể tự định nghĩa các kiểu dữ liệu có cấu trúc để mô tả các đối tượng thực tế. Ví dụ như để mô tả một bản ghi dữ liệu về một bìa sách thì chúng ta có thể định nghĩa một `Object` trong `JavaScript`, hay một `struct` trong `C`. Ở đây thì `Elm` gọi đó là bản ghi `Record` và có thể được định nghĩa bằng cú pháp như sau -

```REPL.elm
type alias Book =
   { title : String
   , rating : Float
   }

Book "Tao Te Ching" 9.9

-- { rating = 9.9, title = "Tao Te Ching" } : Book
```

![](https://images.viblo.asia/0122868e-ee40-4368-b305-a3e6dd031700.png)

Ồ.. dường như cách sử dụng `Book` để tạo ra một bản ghi với tiêu đề `title` và tỉ lệ bình chọn `rating` được cung cấp khá giống với cách sử dụng một chương trình con `sub-program`.

```REPL.elm
Book

-- <function> : String -> Float -> Book
```

Khi nhập `Book` vào `Elm REPL` nhấn `Enter` như các giá trị `primitive` thì chúng ta thấy là bản thân tên định danh `Book` cũng là một giá trị thuộc kiểu hàm `<function>`. Hàm này sẽ nhận vào tham số đầu tiên kiểu `String` và tham số thứ hai kiểu `Float`, sau đó trả về kết quả là một bản ghi kiểu `Book`.

`Ghi chú`
> Trên thực tế thì chỉ dẫn `type alias` được sử dụng để đặt tên tham chiếu thay thế cho một kiểu dữ liệu phức hợp bất kỳ, tương tự với `typedef` trong `C`.  

## Tuple

Tuy nhiên thì `Record` lại không hẳn là kiểu dữ liệu phức hợp phổ biến nhất để mô tả các bản ghi dữ liệu trong các ngôn ngữ chủ điểm `Declarative`. Thay vào đó thì một kiểu dữ liệu khác có tên là `Tuple` lại thường được sử dụng nhiều hơn cho nhu cầu mô tả các bản ghi dữ liệu đơn giản.

```REPL.elm
( "Yijing", 9.8 )

-- ("Yijing",9.8) : ( String, Float )
```

## List

Sau khi đã có khả năng tự định nghĩa một kiểu dữ liệu bản ghi phù hợp với chương trình muốn xây dựng, thì công cụ tiếp thiết yếu tiếp theo mà chúng ta cần đó là một kiểu dữ liệu tập hợp giúp lưu trữ một danh sách các bản ghi giống như một cơ sở dữ liệu mini trong môi trường vận hành logic của code. Như vậy chúng ta sẽ có thể nghĩ đến các thao tác xử lý tập hợp như tính tổng hay trung bình giá trị một trường dữ liệu nào đó của các bản ghi, hoặc tìm ra các bản ghi phù hợp với một tiêu chí sàng lọc dữ liệu nào đó, v.v...

Đối với nhu cầu sắp xếp dữ liệu như thế này, ở các ngôn ngữ `Imperative` phổ biến sẽ luôn đề cập tới khái niệm mảng dữ liệu `Array` đầu tiên với khả năng truy xuất các phần tử dựa trên trị số chỉ vị trí `index`. Còn ở các ngôn ngữ đặt nền móng chủ điểm trên `Declarative` như `Elm` thì chúng ta sẽ có một khái niệm tập dữ liệu tên là danh sách `List`. Khá giống với `Array`, các phần tử trong `List` cũng được lưu trữ liền kề nhau theo dạng liệt kê phẳng. Khác biệt căn bản là ở chỗ `List` không hỗ trợ thao tác truy xuất các phần tử con bằng trị số chỉ vị trí `index`.

```REPL.elm
[ "Hello", "Elm", "List" ]
-- ["Hello","Elm","List"] : List String

[ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I' ]
-- ['A','B','C','D','E','F','G','H','I'] : List Char

[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
-- [1,2,3,4,5,6,7,8,9] : List number
```

## Union

Một kiểu dữ liệu phổ biến khác thường gặp trong các ngôn ngữ chủ điểm `Declarative` đó là kiểu `Union` - tạm hiểu là tổ hợp của các kiểu dữ liệu khác nhau. Để định nghĩa một kiểu `Union` chúng ta bỏ đi từ khóa `alias` và sử dụng phép thực thi `|` để liệt kê danh sách các kiểu dữ liệu có khả năng được sử dụng bên trong vỏ bọc `Union`.

```REPL.elm
type Stock = Available | Unavailable

type alias Book =
   { title : String
   , rating : Float
   , stock : Stock
   }

Book "Yoga Sutra" 9.0 Available

-- { rating = 9, stock = Available, title = "Yoga Sutra" } : Book
```

Ở đây chúng ta đã tạo ra một kiểu `Union` tên là `Stock`. Khi chúng ta sử dụng `Stock` để làm `type-hint` ở đâu đó thì dữ liệu phù hợp sẽ có thể là một trong hai kiểu `Available` hoặc `Unavailble`.

Tuy nhiên do chúng ta không cung cấp thông tin định nghĩa về các kiểu dữ liệu thành phần bên trong `Union`, vì vậy nên `Elm` sẽ tạo ra các giá trị tượng trưng cho mỗi tên định danh này. Và như vậy chúng ta có thể sử dụng kiểu `Union` này theo cách khá giống với kiểu `Bool` nếu như có định nghĩa thêm các chương trình con để tạo logic tương quan giữa hai giá trị `Available` và `Unavailble`.

Ok.. như vậy là chúng ta đã biết được các kiểu dữ liệu căn bản của một ngôn ngữ `Declarative`. Trong các bài viết sau thì chúng ta sẽ nói chi tiết hơn về các thao tác phổ biến trên các giá trị thuộc các kiểu dữ liệu này.

[[Declarative Programming + Elm] Bài 4 - Math & Type Variable](https://viblo.asia/p/zXRJ8jq5VGq)