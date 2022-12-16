Sau khi đã điểm qua những thao tác cơ bản với các giá trị số học và logic thì chúng ta còn `Char` và
`String` là `primitive`. Nhân tiện thì khi nói tới `String`, mặc dù là `primitive` nhưng trong hầu
hết các ngôn ngữ lập trình nói chung thì `String` đều có thêm khả năng tương tác giống với một
dải các giá trị được lưu trữ dạng liệt kê `sequence`. Do đó nên mình quyết định là sẽ mang `List`
vào nội dung của bài này và để dành `Tuple` và `Record` cho bài viết sau cho dễ so sánh.

```CMD|Terminal.io
cd Documents && cd learn-elm
elm repl
```

## Char

`Module:` [`elm/core/Char`](https://package.elm-lang.org/packages/elm/core/latest/Char)

Các ngôn ngữ định kiểu dữ liệu tĩnh `static-typing` như `C` hay `Java` đều có kiểu `Char` tách 
riêng khỏi `String` và đều sử dụng các cặp nháy đơn `'A'` để biểu thị các giá trị `Char` trong 
code. Ở đây `Elm` cũng sử dụng quy ước tương tự và chúng ta cũng có thêm một thư viện cung
cấp các `sub-program` để làm việc với các giá trị `Char` trong liên kết ở trên.

Số lượng các thao tác được cung cấp với `Char` cũng không nhiều, nên có lẽ chúng ta có thể liệt
kê hết ở đây. Đầu tiên sẽ là các thao tác kiểm tra ký tự số, ký tự chữ, kiểu viết thường, kiểu viết hoa.
Các ký tự kiểm tra trong ví dụ:

- Chữ số `0`
- Chữ viết thường `o`
- Chữ viết hoa `O`

```REPL.elm
Char.isDigit '0'   -- True
Char.isDigit 'o'   -- False
Char.isDigit 'O'   -- False

Char.isAlpha '0'   -- False
Char.isAlpha 'o'   -- True
Char.isAlpha 'O'   -- True

Char.isUpper '0'   -- False
Char.isUpper 'o'   -- False
Char.isUpper 'O'   -- True

Char.isLower '0'   -- False
Char.isLower 'o'   -- True
Char.isLower 'O'   -- False
```

Trong code ví dụ ở đây thì mình muốn viết đủ tên của `module` để bổ nghĩa cho tên của các 
`sub-program`. Nếu bạn cảm thấy rườm rà và muốn code gọn hơn thì có thể thêm thao tác
`exposing` như trong các bài viết mở đầu.

```REPL.elm
import Char exposing (..)
```

Nhóm thao tác còn lại là chuyển đổi qua lại giữa kiểu chữ viết thường <=> chữ viết hoa, và
chuyển đổi giữa mã Unicode <=> ký tự chữ cái.

```REPL.elm
Char.toUpper 'a'   -- 'A'
char.toLower 'A'   -- 'a'

Char.toCode 'a'    -- 97
Char.fromCode 98   -- 'b'
```

## String

`Module:` [`elm/core/String`](https://package.elm-lang.org/packages/elm/core/latest/String)

Ngoài cách biểu thị bằng một cặp nháy kép `"a string"` thì `Elm` còn cho phép mô tả nội dung
văn bản dài trên nhiều dòng liền nhau bằng 3 cặp nháy kép -

```REPL.elm
"""A string with a line br
eak in Elm"""

-- "A string with a line br\n  eak in Elm" : String
```

Ở đây mình có lưu ý một chút. Đó là cái khoảng trống giữa ký tự xuống dòng mới `\newline` và 
`eak...` là do trong môi trường `Elm REPL` tự động thụt đầu dòng khi chúng ta viết code. Còn 
logic chuẩn thì khi viết vào code trong tệp và chạy `elm make` hay `elm reactor` thì chúng ta sẽ 
có từ `br\neak`.

Số lượng thao tác thường sử dụng với `String` thì có rất nhiều, tuy nhiên ở đây mình sẽ chỉ liệt
kê một số thao tác mà mình chú ý ở cấp độ cú pháp `JS` và tham chiếu sang `Elm`.

```REPL.elm
-- "Check if a string is empty in JS" == ""
String.isEmpty "Check in Elm"

-- "JS String" + " concatenation"
"Elm String" ++ " concatenation"

-- "A" + "ppend a character in JS"
(String.fromChar 'A') ++ "ppend a character in Elm"

-- [ ... "JS String to Array" ]
String.toList "Elm String to List Char"
```

Các thao tác còn lại được `JS` cung cấp dưới dạng `sub-program` thì ở đây `Elm` cũng có khá đầy 
đủ và cách thức sử dụng thì cũng không có gì khác biệt. Tuy nhiên có nhóm
[Higher Order Functions](https://package.elm-lang.org/packages/elm/core/latest/String#map)
thì mình lưu ý là sẽ tạm thời chưa sử dụng trong Sub-Series này và để dành cho tới Sub-Series
tiếp theo về `Functional Programming`.

[`compare : comparable -> comparable -> Order`](https://package.elm-lang.org/packages/elm/core/latest/Basics#compare)

Bây giờ chúng ta sẽ nói về thao tác so sánh `String` ở cuối bài viết trước. Logic mà `compare` sử
dụng rất đơn giản; Đó là cứ lấy ra lần lượt từng cặp ký tự ở cùng thứ tự vị trí trong các chuỗi để
so sánh bằng mã ký tự `character code`. Ngay khi gặp một cặp ký tự có mã khác nhau thì sẽ dừng 
kiểm tra và sử dụng kết quả so sánh đó `GT` (lớn hơn) hoặc `LT` (nhỏ hơn), hoặc nếu tất cả các
cặp ký tự đều trùng lặp thì sẽ kết luận là `EQ` (bằng nhau). Lưu ý duy nhất là ở vị trí kết thúc một
chuỗi thì các ngôn ngữ lập trình đều sử dụng ký tự `\0` có mã ký tự là `0`.

```REPL.elm
compare "elm" "Elm"   -- GT
Char.toCode 'e'       -- 101
Char.toCode 'E'       -- 69

compare "el" "elm"   -- LT
Char.toCode '\0'     -- 0
Char.toCode 'm'      -- 109

compare "0" ""     -- GT
Char.toCode '0'    -- 48
Char.toCode '\0'   -- 0

compare "blank" "bl nk"   -- GT
Char.toCode 'a'           -- 97
Char.toCode ' '           -- 32

commpare "" " "   -- LT
```

## List

`Module:` [`elm/core/List`](https://package.elm-lang.org/packages/elm/core/latest/List)

Thực tế thì `List` và `Array` là hai cấu trúc dữ liệu khác nhau và không thể so sánh tương đồng
hoàn toàn về cách thức sử dụng `List` trong `Elm` và cách thức sử dụng `Array` trong `JS`. 
Điểm khác biệt căn bản giữa hai kiểu `sequence` này đó là `List` không hỗ trợ việc truy xuất
nhanh một phần tử bằng trị số chỉ vị trí `index` như kiểu `JSarray[1001]`.

Tuy nhiên thì chúng ta có thể tạm thời quan tâm trước hết tới những thao tác khác, được `JS` 
hoặc `Elm` hỗ trợ ở cấp độ cú pháp của ngôn ngữ -

```REPL.elm
-- var concatenated = [ ...["Array","concatenation"], ...["in","JS"] ]
["List","concatenation"] ++ ["in","Elm"]

-- var appended = [ "Append", ...["to","Array","in","JS"] ]
"Append" :: ["to","List","in","Elm"]
["Append"] ++ ["to","List","in","Elm"]
List.append ["Append"] ["to","List","in","Elm"]

-- var prepended = [ ...["JS","Array","and"], "Prepend" ]
List.append ["Elm","List","and"] ["Prepend"]
```

Ậy, mấy cái `List` trong `Elm` không có thao tác `List.prepend` nên code chỗ này trông có hơi 
bất đồng về mặt cú pháp. Mặc dù chúng ta cũng có thể tự định nghĩa thêm thao tác `prepend`
dựa trên `List.append` nếu muốn; Tuy nhiên mình nghĩ là thiết kế sử dụng như thế này hẳn phải
có lý do và chúng ta nên tạm thời đặt một chút băn khoăn ở đây cho đến khi quen với thao tác
sử dụng `List` trong những tình huống cụ thể.

Ngoài ra thì còn thao tác tách lấy một phần nội dung trong `sequence` thì ở cấp độ cú pháp của
ngôn ngữ `JS` còn cung cấp một thao tác có tên là `destructuring`. Ở đây `Elm` chỉ hỗ trợ ở cấp
độ `sub-program` và có điểm mà chúng ta cần phải lưu ý ở phần kết quả thu được.

```REPL.elm
-- var [head, ...tail] = ["Head", "Tail", "of", "JS", "Array"]

alist = ["Head", "Tail", "of", "Elm", "List"]

List.head alist
-- Just "Head" : Maybe String

List.tail alist
-- Just ["Tail","of","Elm","List"] : Maybe (List String)
```

Các kết quả này đều có điểm chung là thuộc kiểu `Maybe` và có một tham số dữ liệu kiểu biến 
thiên `a` bất kỳ. Mở định nghĩa của `Maybe` xem nào: 
[`elm/core/Maybe`](https://package.elm-lang.org/packages/elm/core/latest/Maybe)

```Maybe.elm
type Maybe a = Just a | Nothing
```

Chúng ta đang có `Maybe a` là một kiểu `Union`. và nếu như một giá trị thu được từ một 
`sub-program` mà có kết quả được `type-hint` là `Maybe a`, thì có khả năng giá trị đó sẽ  thuộc
kiểu `Just a` hoặc `Nothing`. Trong đó thì `Nothing` không được định nghĩa và được xem là một 
giá trị tương đương với `null` hay `undefined` ở các môi trường lập trình khác; Còn `Just` là một 
kiểu vỏ bọc đơn giản được thiết kế để có thể chứa được một giá trị của kiểu bất kỳ `a`.

Lý do chung chung là thao tác tách lấy dữ liệu của một `sequence` như trên thì chúng ta có một
trường hợp đặc biệt đó là khi nguồn dữ liệu là một `sequence` rỗng -

```REPL.elm
-- var [head, ...tail] = []

List.head []   -- Nothing : Maybe a
List.tail []   -- Nothing : Maybe (List a)
```

Đối với trường hợp của `JS` thì chúng ta có kết quả thu được là một giá trị `head = undefined` và
một mảng `tail = []`. Còn trong môi trường của `Elm` thì chúng ta thu được các giá trị `Nothing`
cùng kiểu với kiểu giá trị dự tính. Cụ thể là với `List.head` thì chúng ta mong muốn thu được một
giá trị `a` trong `List`, còn với `List.tail` thì chúng ta mong muốn thu được một `List` nhỏ hơn.

Thiết kế này nhằm mục đích khiến cho các giá trị thu được sẽ luôn có ý nghĩa trong mọi trường hợp
của `List` ban đầu; Và chúng ta sẽ có thể sử dụng các giá trị thu được này để điều hướng logic xử
lý tình huống `case` của code sau đó. Tuy nhiên chúng ta sẽ để dành việc tìm hiểu công cụ giúp
điều hướng logic  `case` và cả việc lặp thao tác xử lý `looping` cho đến khi đã điểm qua xong các 
thao tác với `Tuple` và  `Record`.

[[Declarative Programming + Elm] Bài 6 - Tuple & Record](vlZL9N1vVQK)