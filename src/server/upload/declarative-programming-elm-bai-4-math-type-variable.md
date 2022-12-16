Bây giờ chúng ta sẽ bắt đầu nói về các điểm cần lưu ý về các thao tác xử lý phổ biến đối với các kiểu 
dữ liệu đã được giới thiệu trong bài viết trước. Tuy nhiên thì trước khi bắt đầu với các ví dụ chi tiết, 
mình  vẫn muốn liệt kê lại danh sách tên các kiểu dữ liệu ở đây để chúng ta có thể tiện theo dõi
mạch logic và liên hệ giữa các kiểu (nếu có) -

- `Float`, `Int`, `number` - các giá trị số học. Ví dụ: `10.01`, `10`, ...
- `Bool` - các giá trị nhận định logic `True` và `False`
- `Char` - các ký tự đơn. Ví dụ: `'A'`, `'z'`, ...
- `String` - các chuỗi văn bản. Ví dụ: `"Elm Language"`
- `List` - lưu trữ các giá trị cùng kiểu theo dạng danh sách liệt kê
- `Record` - mô tả các bản ghi giống với `C struct` và `JS Object`
- `Tuple` - mô tả các bản ghi ngắn gọn không có tên trường dữ liệu

Ok.. chúng ta bắt đầu thôi. Để tiết kiệm thời gian thì chúng ta sẽ tương tác với `Elm REPL` giống như
bài viết trước. Tuy nhiên, bạn có thể tạo các tệp `module` để lưu lại code ví dụ nếu muốn.

```CMD|Terminal.io
cd Documents && cd learn-elm
elm repl
```

## Các phép tính số học

`Module:` [`elm/core/Basics`](https://package.elm-lang.org/packages/elm/core/latest/Basics)

Không có gì khác biệt nhiều so với các ngôn ngữ `Imperative` như `C` hay `JavaScript` mà chúng 
ta đã biết. Các phép tính `+`, `-`, `*`, `/` căn bản.

```REPL.elm
1.0 + 2.0
-- 3 : Float
```

Tuy nhiên, lưu ý đầu tiên là `Elm` không hỗ trợ tự động chuyển kiểu dữ liệu từ `Int` sang `Float`. 
Giá trị trả về bởi `round` được định kiểu `Int`, và `1 : Int` thì không thể cộng trực tiếp với 
`2.0 : Float` -

```REPL.elm
(round 1.0) + 2.0
-- thông báo lỗi
```

Thế nhưng `1 : number` và `2.0 : Float` thì lại hợp lệ với phép tính `+` như vậy. Về lý do thì
chúng ta sẽ để dành cho hạng mục cuối bài. :D

```REPL.elm
1 + 2.0
-- 3 : Float
```

Có phép chia lấy phần nguyên với ký hiệu `//` thì mình chưa gặp bao giờ.

```REPL.elm
9 // 2
-- 4 : Int
```

Phép lũy thừa sử dụng ký hiệu `^`, khác với `**` của `JS`.

```REPL.elm
2 ^ 10
-- 1024 : number
```

Ngoài ra thì các thao tác khác sẽ được xử lý bởi các `sub-program`. Ví dụ như phép chia lấy phần dư 
`9 % 2` trong `JS` -

```REPL.elm
remainderBy 2 9
-- 1 : Int
```

Lấy giá trị nghịch đảo của một số trong `Elm` sẽ không sử dụng phép toán `-`. Lý do thì mình xin để 
dành sang hẳn `Sub-Series` tiếp theo. Ở đây chúng ta cứ xem như quy ước xử lý đặc biệt và sử dụng
như vậy đi. :D - 

```REPL.elm
negate -9
-- 9 : number
```

 Giá trị tuyệt đối -
 
 ```REPL.elm
 abs 10.01
 -- 10.01 : Float
 
 abs -10.01
 -- 10.01 : Float
 ```
 
  Căn bậc 2 -
  
  ```REPL.elm
  sqrt 81
  -- 9 : Float
  ```

Làm tròn giá trị tới biên gần -

```REPL.elm
round 10.01
-- 10 : Int

round 1.9
-- 2 : Int
```

Làm tròn lên và xuống -

```REPL.elm
ceiling 9.5
-- 10 : Int

floor 9.5
-- 9 : Int
```

Suy giảm về gốc 0 -

```REPL.elm
truncate 9.8
-- 9 : Int

truncate -9.8
-- -9 : Int
```

Kiểm tra `NaN` của một giá trị thu được từ một phép thực thi trả về kiểu `Float` -

```REPL.elm
isNaN (0/0)       -- True
isNaN (sqrt -1)   -- True : Bool
isNaN 1           -- False : Bool
```

Phép chia cho `0/0` và lấy căn bậc hai của `-1` không thể cho kết quả có ý nghĩa số học, do đó 
nên chúng ta thu được giá trị `NaN`. Tuy nhiên trường hợp dưới dây thì kết quả là dương vô cùng
`Infinite` vẫn thuộc kiểu `Float`.

```REPL.elm
isNaN (1/0)
-- False : Bool
```

và để kiểm tra một giá trị trả về từ một thao tác định kiểu `Float` có phải là `Infinite` hay không -

```REPL.elm
isInfinite (0/0)       -- False
isInfinite (sqrt -1)   -- False
isInfinite (1/0)       -- True
isInfinite 1           -- False
```

`NaN` và `Infinite` về căn bản là khác nhau: `NaN` không có ý nghĩa số học, còn `Infinite` thì là
một giá trị số học.

## Các phép tính logic

Các ký hiệu `&&` và `||` được `Elm` sử dụng với ý nghĩa tương tự như `C` và `JS`. Tuy nhiên phép 
phủ định hay còn được gọi là lấy nghịch đảo một giá trị `Bool` được xử lý bằng chương trình `not`,
thay vì ký hiệu `!` như `C` và `JS`.

```REPL.elm
not True
-- False : Bool

not False
-- True : Bool
```

 Các phép nhận định so sánh, hầu hết vẫn sử dụng các ký hiệu như chúng ta đã biết là `==`, `>`, 
 `<`, `>=`, `<=`. Duy nhất có ký hiệu `!=` trong `C` và `JS` để kiểm tra nhận định hai giá trị là 
 khác nhau, được `Elm` thay thế bởi `/=`.
 
 ```REPL.elm
 1 /= 0.9
 -- True : Bool
 
 1 /= 1.0
 -- False : Bool
 ```
 
 ## Type Variable
 
 Các ngôn ngữ thuần `Declarative` hầu hết đều được xây dựng với một tinh thần chung - đó là
 khả năng định kiểu rất mạnh mẽ và nghiêm ngặt `strong-typing`. Và ở đây chúng ta có `Elm`
 là một trong số đó.
 
Cụ thể là thông báo lỗi như ví dụ phép tính `+` giữa một giá trị `Int` và một giá trị `Float` mà 
chúng ta đã nhìn thấy ở phần đầu của bài viết. Mặc dù trình biên dịch `compiler` của `Elm` đã
có đủ thông tin về các giá trị nhận được trước khi thực hiện phép tính, tuy nhiên chỉ đơn giản là
`Elm` không hỗ trợ tự động chuyển đổi kiểu ngầm định trong trường hợp này. Và chúng ta sẽ
cần phải thực hiện việc chuyển kiểu dữ liệu trong code của mình -

```REPL.elm
(toFloat (round 1.0)) + 2.0
-- 3 : Float
```

> Ồ thế nhưng tại sao phép tính `1 + 2.0` lại không có thông báo lỗi ?

Giá trị `1` trả về bởi [`round`](https://package.elm-lang.org/packages/elm/core/latest/Basics#round) 
được định kiểu là `Int`. Còn giá trị `1` mà chúng ta viết trực tiếp vào trong tệp code của chúng ta
thì lại chưa được định kiểu cố định, do đó nên `Elm` sẽ xem là một giá trị thuộc kiểu biến thiên `number`.

Khái niệm kiểu biến thiên `Type Variable`, có thể hiểu đơn giản là một kiểu dữ liệu bất kỳ mà trình
biên dịch `compiler` không tìm thấy thông tin định kiểu rõ ràng trong code. Và sẽ cố gắng tìm ra 
một logic xử lý thành công phù hợp nhất.

Chính xác thì một kiểu biến thiên `a` được hiểu là một kiểu `Union` bao gồm tất cả các kiểu dữ liệu 
mà trình biên dịch thu thập được trong code định nghĩa của toàn bộ chương trình `project`. Tuy 
nhiên, `Elm` cũng có tạo ra một vài `Type Variable` với khả năng hữu hạn hơn so với `a`. Đó là -

- `number` - là một giá trị số học; Vì vậy nên có thể là `Float` hoặc `Int`.
- `comparable` - là một giá trị có thể so sánh được bằng chương trình [`compare`](https://package.elm-lang.org/packages/elm/core/latest/Basics#compare); Bao gồm `Int`, `Float`, `Char`, `String`, và `List/Tupple` của các kiểu đó.
- `appendable` - là một giá trị có thể thực hiện các thao tác nối ghép nội dung; Vì vậy nên có thể là `String` hoặc `List`.
- `compappend` - là một giá trị vừa thuộc `comparable` và vừa thuộc `appendable`.

Như vậy khi trình biên dịch đọc phép tính `1 + 2.0` thì giá trị `2.0` đã có đủ thông tin định kiểu 
rõ ràng là `Float` do có dấu phẩy thập phân `.`; Còn giá trị `1` thì chưa có thông tin định kiểu
cụ thể nên sẽ là `number`. Logic thành công phù hợp nhất là `Float + Float` và chúng ta có
logic được biên dịch là `1.0 + 2.0`. Phép tính được thực hiện và không có thông báo lỗi.

## comparable

Nhân tiện sau khi giới thiệu xong khái niệm kiểu biến thiên `Type Variable` thì chúng ta đang có
vài kiểu được định nghĩa sẵn như đã được liệt kê ở trên. Cái `number` thì chúng ta đã vừa sử dụng
để làm ví dụ minh họa ở trên rồi, và trong số mấy kiểu còn lại thì ở đây chúng ta đã có đủ kiến 
thức để nói về `comparable`.

> Một giá trị thuộc kiểu `comparable` sẽ có thể được sử dụng trong một thao tác so sánh bằng 
chương trình [`compare`](https://package.elm-lang.org/packages/elm/core/latest/Basics#compare). 

Ở chỗ này chúng ta cần lưu ý một chút để tránh nhầm lẫn. Các phép toán logic `>`, `<`, `==`,  `/=`, 
v.v... mà trả về các giá trị `Bool` thì được sử dụng để `kiểm tra` một nhận định so sánh.  Hay nói 
cách khác là để kiểm tra một sự đánh giá. Và thao tác `kiểm tra` như vậy sẽ mang ý nghĩa có phần 
hơi khác một chút với thao tác `so sánh` bằng
[`compare`](https://package.elm-lang.org/packages/elm/core/latest/Basics#compare) mà chúng 
ta vừa nói ở trên.

Một phép kiểm tra `a == b` sẽ đưa ra kết quả trả lời cho câu hỏi: "`a` có giá trị bằng `b`. Đúng 
hay Sai? Nếu `đúng` thì chọn `True`, còn nếu `sai` thì chọn `False`. 30 giây suy nghĩ bắt đầu !"

```REPL.elm
1 == 0.9
-- False : Bool
```

Còn một phép so sánh `compare a b`, ở mặt khác,  sẽ đưa ra kết quả trả lời cho câu hỏi: "`a` so 
với `b` thì thế nào? Bằng à `EQ`? Hay nhỏ hơn `LT`? Hay lớn hơn `GT`? Trả lời ngay và luôn !"

```REPL.elm
compare 1 0.9
-- GT : Order
```

Kết quả của một phép `so sánh`, sau đó, hiển nhiên cũng sẽ có thể được sử dụng để điều hướng
logic hoạt động của code mà chúng ta xây dựng. Và `Elm` cũng có một vài chương trình cơ bản, 
rất hữu ích, cần sử dụng tới các giá trị `Order` này.

```REPL.elm
-- max : comparable -> comparable -> comparable
max 1 0.9

-- min : comparable -> comparable -> comparable
min "abc" "xyz"
```

Về việc hai chuỗi `"abc"` và `"xyz"` được `compare` với logic như thế nào thì chúng ta sẽ để dành
cho bài viết tiếp theo. :D

[[Declarative Programming + Elm] Bài 5 - String & List](https://viblo.asia/p/qPoL7XE1Vvk)