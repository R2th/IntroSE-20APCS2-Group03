Sau khi đã điểm qua xong những công cụ hỗ trợ thao tác với các kiểu dữ liệu căn bản, chúng ta tiếp tục tìm đến nhóm công cụ hỗ trợ tạo logic xử lý linh động cho code tùy vào trạng thái của dữ liệu nhận được và lặp các thao tác xử lý trên tập dữ liệu. Và ở bài viết này thì chúng ta sẽ cần chạy thử code của các `sub-program`, do đó nên việc tương tác với kết quả code chúng ta sẽ thực hiện với `elm reactor`.

```CMD|Terminal.io
cd Documents && cd learn-elm
elm reactor
```

[`http://localhost:8000/src/`](http://localhost:8000/src/)
![](https://images.viblo.asia/64886d8e-df5e-4381-8aef-21dc9cfd2754.png)

## Pattern Matching

Đầu tiên là cấu trúc logic có tên gọi là `Pattern Matching`, thường được xem là tương đương với cấu trúc lệnh điều kiện hay rẽ nhánh trong môi trường `Imperative`. Tên gọi này có hai từ và chúng ta sẽ quan tâm tới yếu tố `Matching` trước. Các ngôn ngữ thuần `Declarative` gọi cấu trúc logic rẽ nhánh là `Matching` (sự đối chiếu) là bởi vì chương trình của chúng ta sẽ không có các câu lệnh tuần tự mà thay vào đó là các định nghĩa song song.

```src/Tell.elm
module Tell exposing (day)

day : Int -> String
day n = case n of
   0 -> "Sunday"
   1 -> "Monday"
   2 -> "Tuesday"
   3 -> "Wednesday"
   4 -> "Thursday"
   5 -> "Friday"
   6 -> "Saturday"
   _ -> "Unknown"
```

Đoạn định nghĩa `day n` như trên sẽ được trình biên dịch `compiler` đọc lần lượt là:

```day.txt
day 0 = "Sunday"
day 1 = "Monday"
day 2 = "Tuesday"
day 3 = "Wednesday"
day 4 = "Thursday"
day 5 = "Friday"
day 6 = "Saturday"
day _ = "Unknown"
```

Riêng vị trí cuối cùng thì ký hiệu `_` sẽ được đọc là những giá trị khác của `n`. Bây giờ chúng ta sẽ sửa lại chương trình `main` và xem kết quả chạy thử code `Tell.day` trên trình duyệt.

```src/Main.elm
module Main exposing (main)
import Html exposing (..)
import Tell exposing (..)

main : Html message
main = Html.text (Tell.day 0)
```

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/43f45ae2-a1fa-4b0b-b423-c99f787970cd.png)

Ok. như vậy là chúng ta đang có một cú pháp dạng `switch..case` hoạt động tốt. Tuy nhiên bạn thấy đấy, điểm khác biệt ở đây là, ở phía bên phải của các `case` đều là các giá trị `value`, chứ không phải là các câu lệnh `statement`. Cú pháp `case..of` mà chúng ta thấy ở đây, là một dạng biểu thức liên hệ để thay thế cho việc viết lại nhiều lần tên của `sub-program` trong định nghĩa như phần giải thích phía trên. Vì vậy người ta sử dụng từ `Matching` (đối chiếu) thay cho từ `conditional` (điều kiện) trong môi trường `Imperative`.

> Thế còn `Pattern` thì sao ?

Từ đó có nghĩa là dạng thức - tức là chúng ta sẽ có thể đối chiếu bằng các dạng thức của dữ liệu chứ không nhất thiết phải là các giá trị cụ thể. Ví dụ như tên định kiểu của giá trị nhận được, hoặc dạng thức mô tả các trạng thái của các cấu trúc dữ liệu - ví dụ `List` rỗng, 1 phần tử, 2 phần tử, hoặc nhiều hơn, v.v...

```src/Tell.elm
module Tell exposing (any, day)

any : Maybe a -> String
any value = case value of
   Just a  -> "Something"
   Nothing -> "Nothing"

-- day : ...
```

```src/Main.elm
-- ...
main = Html.text (Tell.any (Just 1001))
```

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/55ac0a07-792c-4638-ad23-2a5e4eea7a7b.png)

Trong trường hợp này, nếu như chúng ta truyền vào `Just.any` một cái `Just` chứa bất kỳ giá trị nào thì kết quả hiện thị cũng đều là `"Something"`. Còn nếu truyền vào `Tell.any Nothing` thì kết quả hiển thị sẽ là chuỗi `"Nothing"`. Điều đó có nghĩa là chương trình con `Tell.any` chỉ quan tâm tới việc giá trị đó được xếp loại nào trong `Maybe`, chứ không  quan tâm tới câu hỏi giá trị đó là gì? định lượng bao nhiêu? hay có nội dung thế nào?

Chúng ta hãy tiếp tục viết một chương trình con để nhận định trạng thái dữ liệu của một `List` bất kỳ.

```src/Tell.elm
module Tell exposing (list, any, day)

list : List a -> String
list l = case l of
   []    -> "Empty"
   [x]   -> "Exactly One"
   x::xs -> "X and other Xs"

-- any : ...
-- day : ...
```

```src/Main.elm
-- ...
main = Html.text (Tell.list [0,1,2,3,4,5,6,7,8,9])
```

![](https://images.viblo.asia/849c2fe0-5857-4661-92e8-8b7fc240f225.png)

Trong code ví dụ thì `pattern` ở trường hợp cuối cùng là `x::xs` có nghĩa là khi `List l` là kết quả của thao tác chèn một phần tử `x` vào một `List xs` có chứa các giá trị khác tương tự như `x`. Điều đó cũng có nghĩa là khi `List l` có chứa ít nhất 2 phần tử trở lên - bao gồm `X` và các `X` khác.

> Cùng lúc `matching` bằng các giá trị cụ thể đặt trong các `pattern` có được không ?

Có, chắc chắn là được! Nếu có một số hữu hạn các giá trị đặc biệt cần quan tâm trong logic xử lý của code thì chúng ta có thể đặt các giá trị đó vào vị trí của các biến sử dụng trong các `pattern`. Lúc này `Elm` sẽ kiểm tra tính phù hợp của dữ liệu thực tế cả về mặt `pattern` và giá trị tại vị trí các biến.

Các `pattern` đối với `List` như vậy là đã khá linh động rồi. Bây giờ, chúng ta hãy thử làm ví dụ với các `Tuple` mô tả tọa độ của các điểm trong không gian 3D -

```src/Tell.elm
module Tell exposing
   ( position
   , list
   , any
   , day
   )

position : (Int, Int, Int) -> String
position coordinates = case coordinates of
   (0, 0, 0) -> "Root of the Universe"
   (0, _, _) -> "On the X-axis"
   (_, 0, _) -> "On the Y-axis"
   (_, _, 0) -> "On the Z-axis"
           _ -> "Roaming the Universe"

-- list : ...
-- any : ...
-- day : ...
```

```src/Main.elm
-- ...
main = Html.text (Tell.position (1, 2, 3))
```

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/6a023abf-2280-43c0-b7de-cc0520d6415e.png)

## Recursion

Sau khi đã biết cách tạo logic linh động cho code dựa trên kiểu và dạng thức của dữ liệu thì chúng ta cần thêm một công cụ nữa để hỗ trợ lặp thao tác trên tập dữ liệu `List`. Chúng ta đã biết sử dụng công cụ này trước đó rồi. Định nghĩa đệ quy `recursion` đã được nhắc đến trong bài viết [Imperative & Declarative](https://viblo.asia/p/gDVK2r2XKLj) của Series Tự Học Lập Trình Web.

```src/Recursion.elm
module Recursion exposing (sumIntList)

sumIntList : List Int -> Int
sumIntList range = case range of
   []          -> 0
   first::rest -> first + (sumIntList rest)
```

```src/Main.elm
module Main exposing (main)
import Html exposing (..)
import Recursion exposing (..)

main : Html message
main = Html.text (String.fromInt (Recursion.sumIntList (List.range 0 9)))
```

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/dfa02f7e-9a53-42ca-80ab-ca2f7f634d29.png)

Ậy... viết tới đây thì mình mới để ý là chúng ta đang cần một giải pháp viết gọn lại các lời gọi `sub-program` xếp chồng nhiều lớp như thế kia. Các cặp ngoặc đơn được đặt trên cùng hàng chữ sẽ khá khó để nhận diện nhanh chóng khi chúng ta đọc lướt qua code.

```src/Main.elm
-- ...
main = Html.text <| String.fromInt <| Recursion.sumIntList <| List.range 0 9
```

Chỉ đơn giản là cứ mỗi một cặp ngoặc đơn, chúng ta sẽ thay thế bằng một ký hiệu `<|` để chuyển kết quả của `sub-program` bên trong ra bên ngoài ở phía bên trái. Bạn cũng có thể sử dụng các ký hiệu `|>` để sắp xếp thứ tự của các `sub-program` theo chiều ngược lại hoặc danh sách sổ dọc cũng rất dễ theo dõi. Tuy nhiên, tuần tự viết như vậy sẽ khiến `pattern` suy luận logic của chúng ta nghiêng về phía `Imperative` và sẽ ảnh hưởng nhất định tới việc làm quen với tư duy giải quyết các vấn đề theo lối đệ quy `recursion` đặc biệt quan trọng trong môi trường `Declarative`.

Lựa chọn của mỗi người có lẽ sẽ khác nhau. Mình thì chọn giữ nguyên thứ tự viết tên các `sub-program` theo chiều đệ quy. Và khi viết liệt kê dạng danh sách sổ dọc thì mỗi ký hiệu `<|` sẽ có thể hiểu là kết quả thực thi code sẽ được chuyển ngược về dòng trên.

```src/Main.elm
-- ...
main = Html.text
    <| String.fromInt
    <| Recursion.sumIntList
    <| List.range 0 9
```

## Recursion in JS

```recursion.js
// -- main : any => null
const main = (_) => console.log (sumNumberArray ([1,2,3,4,5,6,7,8,9]))

// -- sumNumberArray : [number] -> number
const sumNumberArray = (numberArray) =>
   { var [first, ...rest] = numberArray
   ; if (numberArray.length == 0)   return 0
   ; if ("any-other-case")          return first + sumNumberArray (rest)
   }

// -- start program
main (Infinity)
```

[[Declarative Programming + Elm] Bài 8 - Conditional Expression](https://viblo.asia/p/aNj4vXy3L6r)