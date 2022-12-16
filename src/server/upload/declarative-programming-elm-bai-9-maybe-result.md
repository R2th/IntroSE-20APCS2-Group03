Một trong những điều đảm bảo khi chúng ta viết chương trình trong các môi trường định kiểu tĩnh `static-typing` đó là chúng ta sẽ có thể hạn chế được việc nhìn thấy chương trình phát sinh lỗi khi vận hành. Ngoài lý do định kiểu tĩnh thì một phần khác còn là bởi vì chúng ta được phép định nghĩa các ngoại lệ của chương trình giống như các kiểu dữ liệu có ý nghĩa khác. Và từ đó thì chúng ta có thể tạo logic để đưa ra những sự đáp ứng cần thiết với các trường hợp ngoại lệ phát sinh khi vận hành.

Giả sử khi tương tác với thao tác nhập liệu của người dùng và thu thập thông tin về tuổi tác, chúng ta sẽ có thể định nghĩa kiểu dữ liệu như thế này:

```maybe.elm
type MaybeAge = Age Int | InvalidInput

toAge : String -> MaybeAge
toAge userInput =
   ...
```

Và trong mọi trường hợp kết quả nhập liệu từ người dùng thì chúng ta đều có thể truyền qua chương trình `toAge` hợp lệ. Các giá trị nhập liệu phù hợp thì sẽ cho kết quả là `Age 21` hay `Age 1001`, trong khi đó thì những giá trị không phù hợp sẽ cho kết quả là `InvalidInput`. Sau đó chúng ta có thể sử dụng `Pattern Matching` để đảm bảo rằng cả hai trường hợp kết quả nhập liệu `Age Int` và `Invalid Input` đều được đáp ứng phù hợp và như vậy chương trình sẽ không bị dừng đột ngột.

Dạng thức xử lý như thế này sẽ xuất hiện thường xuyên. Ví dụ như khi viết một ứng dụng trang đơn `SPA` để làm giao diện cho một trang blog và đóng gói nội dung bài viết `Post` nhập liệu bởi người dùng để gửi về `server`; Hiển nhiên chúng ta sẽ không muốn những trường hợp dữ liệu như người dùng quên nhập tiêu đề `Title` hay gửi bản nháp chưa nhập nội dung `Content` phải chờ xử lý gửi/nhận từ `server`. Để nhận biết và đưa ra logic đáp ứng ngay cho người dùng trong những trường hợp này thì chúng ta có thể định nghĩa một kiểu `MaybePost` tương  tự như `MaybeAge` trong ví dụ trên.

```maybe.elm
type MaybePost = Post { title : String, content : String }
               | NoTitle
               | NoContent

toPost : String -> String -> MaybePost
toPost title content =
   ...

viewPreview : MaybePost -> Html msg
   ...
```

```REPL.elm
-- toPost "hi" "sup?" == Post { title = "hi", content = "sup?" }
-- toPost "" "sup?"   == NoTitle
-- toPost "hi" ""     == NoContent
```

Với một chương trình con `viewPreview` để xem trước nội dung của các `Post` hợp lệ, bây giờ chúng ta sẽ có thể biểu hiện các thông báo lỗi đặc trưng cho mỗi trường hợp dữ liệu và nhắc nhở người dùng.

Những trường hợp cần xử lý ngoại lệ như thế này là cực kỳ phổ biến và hiệu quả sẽ tốt nhất khi bạn định nghĩa đầy đủ các kiểu ngoại lệ chính xác với bối cảnh cần xử lý. Tuy nhiên trong nhiều trường hợp xử lý ngoại lệ đơn giản thì bạn có thể sử dụng những kiểu mô tả ngoại lệ sẵn có của `Elm`. Vì vậy nên bây giờ chúng ta sẽ tìm hiểu về `Maybe` và `Result`.

## Maybe

`Module:` [`elm/core/Maybe`](https://package.elm-lang.org/packages/elm/core/latest/Maybe)

Chúng ta đã gặp `Maybe` trong những bài viết trước đó rồi. và khi trở nên quen thuộc với `Elm`, chúng ta sẽ gặp lại `Maybe` rất thường xuyên.

```maybe.elm
type Maybe a = Just a | Nothing
```

Đây là một hợp kiểu `Union` có hai biến thể là `Just` và `Nothing`. Trong đó thì `Just` là một kiểu vỏ bọc đơn giản để có thể chứa được một giá trị thuộc bất kỳ kiểu dữ liệu nào bao gồm cả `primitive` và có cấu trúc. Còn `Nothing` thì là một giá trị đặc biệt tượng trưng cho trường hợp dữ liệu vô nghĩa.

Hai trường hợp xử lý ngoại lệ căn bản với `Maybe` là các chương trình có logic xử lý không toàn phần `Partial Function` và khi muốn mô tả các cấu trúc bản ghi dữ liệu có các trường không bắt buộc `Optional Field`.

Một `Partial Function` là khi chúng ta viết một chương trình con `sub-program` mà chỉ muốn đưa ra kết quả đối với một số trường hợp dữ liệu nhất định và nói `Nothing` với các trường hợp khác. Ví dụ như trình chuyển đổi [`String.toFloat`](https://package.elm-lang.org/packages/elm/core/latest/String#toFloat) sẵn có của `Elm`.

```RELP.elm
String.toFloat
-- <function> : String -> Maybe Float

String.toFloat "10.01"
-- Just 10.01 : Maybe Float

String.toFloat "one"
-- Nothing : Maybe Float
```

Và `Optional Field` là các trường dữ liệu không bắt buộc khi chúng ta tạo các cấu trúc dữ liệu mô tả các bản ghi ví dụ như thế này.

```optional.elm
type alias User =
   { name : String
   , age : Maybe Int
   }
```

Điểm đáng nói là thiết kế ngôn ngữ và trình biên của `Elm` sẽ tạo ra ràng buộc rằng: Nếu như chúng ta viết một `sub-program` xử lý dữ liệu của các bản ghi này, thì `Maybe` chắc chắn sẽ khiến chúng ta phải `Pattern Matching` chứ không thể bỏ qua các trường hợp nhập liệu khả thi của người dùng.

## Result

`Module:` [`elm/core/Result`](https://package.elm-lang.org/packages/elm/core/1.0.5/Result)

Kiểu `Maybe` có thể giúp chúng ta tạo ra ràng buộc cần phải viết code xử lý tình huống cho các ngoại lệ `Exception`. Nhưng lại không thể giúp chúng ta mô tả nguyên nhân khi có ngoại lệ xảy ra. Ví dụ như khi chúng ta thử biên dịch code và trình biên dịch chỉ đơn giản là hiển thị một kết quả `Nothing` thì chúng ta sẽ phải rất lay hoay trong việc tìm ra vị trí và nguyên nhân phát sinh kết quả này trong code.

Đây là lý do khiến cho kiểu `Result` xuất hiện và trở nên hữu ích. Chúng ta có thể sử dụng `Result` để `type-hint` cho các thao tác có khả năng không thành công.

```result.elm
type Result error value
   = Ok value | Err error
```

Nếu logic xử lý thành công thì kết quả trả về sẽ là một giá trị `value` được bọc trong kiểu `Ok`, còn với logic xử lý không thành công thì kế quả trả về sẽ là một giá trị kiểu `Err`.

```valid.elm
isValidAge : String -> Result String Int
isValidAge input = case String.toInt input of
   Nothing  -> Err "That is Not a Number!"
   Just age -> if age < 0    then Err "Invalid for Age!"
          else if age > 1001 then Err "Legendary Being?"
          else                    Ok age
```

Bây giờ thì chúng ta không chỉ có thể kiểm tra tính hợp lệ của `age` mà còn có thể đưa ra thông báo lỗi cụ thể tùy thuộc vào các trường hợp nhập liệu khác nhau bởi người dùng. Kiểu đáp ứng này rõ ràng là tốt hơn so với `Nothing`.

Kiểu `Result` còn có thể giúp chúng ta phục hồi logic xử lý của chương trình để thử lại vào một thời điểm sau đó. Ví dụ điển hình là khi chúng ta gửi yêu cầu `HTTP` để truy vấn dữ liệu từ một nguồn nào đó. Kết quả truy vấn có thể sẽ không khả dụng theo nhiều khả năng khác nhau.

```http.elm
type Error
   = BadUrl String
   | Timeout
   | NetworkError
   | BadStatus Int
   | BadBody String
```

Chúng ta chắc chắn sẽ có thể hiển thị các thông báo lỗi phù hợp như đã thấy trong ví dụ trước đó. Nhưng chúng ta cũng có thể phục hồi logic xử lý để thử gửi yêu cầu truy vấn dữ liệu lại lần nữa nếu nhìn thấy `Timeout` bởi vì rất có thể lỗi phát sinh đó chỉ là ngẫu nhiên và tạm thời. Còn nếu là `BadStatus 404` thì hiển nhiên là chúng ta không cần phải mất công thử gửi yêu cầu lại nữa.

## Maybe & Result in JS

Do thiết kế ngôn ngữ và môi trường vận hành của `JavaScript`, chúng ta sẽ không có được cơ chế tạo ràng buộc yêu cầu logic xử lý ngoại lệ như `Maybe`. Thay vào đó thì chúng ta sẽ cần tập luyện thói quen viết cấu hình trước để liệt kê các trường hợp dữ liệu khả thi và sau đó thiết kế các kiểu `Error` để mô tả chi tiết khi nhận được kết quả `null`.

Lưu ý duy nhất về việc viết code xử lý ngoại lệ, đó là chúng ta nên tập trung ở tầng cao nhất, gần với code đáp ứng yêu cầu nhất, trong mỗi tuyến xử lý `route` bất kỳ. Giả sử chúng ta có một `sub-program` được gọi đầu tiên rồi sau `sub-program` đó sẽ lại ủy thác một phần công việc cho một `sub-program` khác và cứ thế tiếp tục cho tới `sub-program` thứ `n`. Như vậy thì chúng ta chỉ nên cố gắng viết một lần `try..catch` ở `sub-program` đầu tiên và tạo logic xử lý cho các kiểu `Error` đã định nghĩa.

À.. đó là tản mạn đối với trường hợp logic xử lý phức tạp và thực sự cần thiết. Còn đối với ví dụ `inputAge` ở phía trên thì điều quan trọng nhất là chúng ta cần đọc kĩ cấu hình của các `sub-program` hỗ trợ mà `JS` cung cấp để có thể dự trù được kết quả nhập liệu và chuyển kiểu dữ liệu.

```exception.js
// -- main : any -> null
const main = (_) => window.alert (tellAge (parseAge (inputAge (_))))

// -- tellAge : maybe age -> string
const tellAge = (age) => (Number.isNaN (age)) ? "Invalid Input"
                       :          (age <= 12) ? "Being built by Heaven"
                       :          (age <= 21) ? "Unpacking old Story"
                       :          (age < 101) ? "Learning new Lessons"
                       :                        "Finished Learning"

// -- parseAge : string -> maybe age
const parseAge = (input) => Number.parseInt (input)

// -- inputAge : any -> string
const inputAge = (_) => window.prompt ("How old are you?", _)

// -- start program
main (Infinity)
```

[[Declarative Programming + Elm] Bài 10 - Elm Architecture](https://viblo.asia/p/018J25k54YK)