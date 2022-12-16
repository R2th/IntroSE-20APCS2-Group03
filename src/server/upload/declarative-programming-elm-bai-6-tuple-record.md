Thực tế thì `Elm` còn hỗ trợ thêm các cấu trúc dữ liệu khác mà chúng ta đã gặp trong `JS` là `Map` và `Set`, tuy nhiên các cấu trúc dữ liệu này đều không có các thao tác được hỗ trợ ở cấp độ cú pháp của ngôn ngữ. Và để sử dụng một cách hiệu quả thì chúng ta sẽ cần phải nhờ tới sự hỗ trợ của nhóm công cụ được đánh dấu là `Higher Order Function` trong phần tài liệu của mỗi cấu trúc.

Như đã nói ở bài viết trước thì chúng ta sẽ để dành tất cả những thao tác liên quan tới cái tên `Higher Order Function` cho Sub-Series tiếp theo về `Functional Programming`. Do đó nên các cấu trúc `Map` và `Set` sẽ không được nhắc đến ở đây. Và chúng ta có `Tuple`, `Record`, là những cấu trúc dữ liệu cuối cùng trong `Sub-Series` này với một số lợi điểm khi sử dụng do được hỗ trợ một vài thao tác nhất định ở cấp độ cú pháp của ngôn ngữ.

```CMD|Terminal.io
cd Documents && cd learn-elm
elm repl
```

## Tuple

`Module:` [`elm/core/Tuple`](https://package.elm-lang.org/packages/elm/core/latest/Tuple)

Để mô tả thông tin về các đối tượng dữ liệu đơn giản, chúng ta có thể sử dụng `Tuple` - có thể được xem là một `List` có độ dài cố định, hay một bản ghi ngầm định vị trí của các trường dữ liệu.

```REPL.elm
point : (Int, Int)
point = (0, 1)

-- (0,1) : (Int, Int)
```

Ví dụ đơn giản nhất là khi chúng ta muốn mô tả các điểm trong mặt phẳng 2D hoặc trong không gian 3D. Lúc này tên của các trường dữ liệu không hẳn quan trọng bởi có thể ngầm định hiểu bằng vị trí của các trục tọa độ đã quá phổ biến và quen thuộc là `(x, y)` hoặc `(x, y, z)`.

Trong tài liệu của `Elm` có ghi chú là đối với các đối tượng dữ liệu có từ 3 trường trở lên thì nên sử dụng `Record` để có thể mô tả rõ ràng tên của các trường dữ liệu. Và ở đây chúng ta có các thao tác trong `module` được cung cấp mặc định để hỗ trợ các `Tuple` đôi dạng `(a, b)`.

```REPL.elm
Tuple.pair "Terra" 1001   -- ("Terra", 1001)

Tuple.first ("Solis", 1001)   -- "Solis"
Tuple.second ("Luna", 1001)   -- 1001
```

Các thao tác còn lại đều thuộc về nhóm `Higher Order Function` và chúng ta sẽ để dành cho Sub-Series tiếp theo. Tuy nhiên vẫn còn một vài thao tác với `Tuple` rất hữu ích khi sử dụng với cú pháp điều hướng logic `case` khiến cho `Tuple` là một lựa chọn phổ biến. Và chúng ta sẽ sớm được gặp lại `Tuple` trong bài viết tiếp theo. :D

## Record

`Module:` [`elm/not/found`](#)

Hm... trong [`package/elm/core`](https://package.elm-lang.org/packages/elm/core/1.0.5/) lại hoàn toàn không có `module` nào liên quan tới `Record`. À có lẽ là bởi vì cấu trúc của `Record` hoàn toàn là do chúng ta tự định nghĩa nên các Dev của `Elm` đã không thể tổng quát hóa được các công cụ cần thiết.

Mặc dù vậy thì `Record` lại được `Elm` hỗ trợ ở cấp độ cú pháp của ngôn ngữ, bao gồm cú pháp định nghĩa và cú pháp sử dụng với `case` giống như đối với `Tuple`. Ở đây chúng ta sẽ nhắc lại phần định nghĩa `Record` vậy, đằng nào thì cũng đã lỡ ghi tên lên tiêu đề của bài viết rồi. :D

```REPL.elm
type alias Book =
   { id : Int
   , title : String
   , rating : Float
   }

laotzu = Book 0 "Tao Te Ching" 9.0

-- { id = 0, rating = 9.0, title = "Tao Te Ching" } : Book
```

Và để truy xuất giá trị của một trường dữ liệu trong `Record` -

```REPL.elm
laotzu.title   -- "Tao Te Ching"
```

Hoặc, theo một cách khác -

```REPL.elm
.rating laotzu   -- 9.0
```

Việc cập nhật giá trị của một trường dữ liệu sẽ tạo ra một bản ghi `Record` mới chứ không làm thay đổi nội dung của bản ghi cũ. À, nói tới đây thì mình cũng muốn lưu ý luôn, đó là tất các giá trị trong môi trường `Elm` sẽ đều là bất biến `immutable` sau khi đã được tạo ra. Chúng ta có thể tạo ra thêm các giá trị mới dựa trên thao tác với các giá trị cũ, nhưng dứt khoát không thể thay đổi các giá trị đã xuất hiện.

```REPL.elm
updated = { laotzu | rating = 10 }
-- { id = 0, rating = 10, title = "Tao Te Ching" }

laotzu
-- { id = 0, rating = 9, title = "Tao Te Ching" }
```

Cụ thể là chúng ta đã nói tên định danh `laotzu` là một bản ghi `Book` với thông tin như trên. Thì chúng ta sẽ không thể thay đổi `laotzu` thành một bản ghi khác. Thay vào đó thì chúng ta sẽ cần phải tạo ra một biến khác tên là `updated` để lưu bản ghi mới được tạo ra sau khi đã cập nhật.

## Tuple & Record in JS

```tuple.js
var point = [0, 1]
var [first, second] = point

console.log (first)    // 0
console.log (second)   // 1
```

```record.js
var laotzu =
   { id: 0
   , title: "Tao Te Ching"
   , rating: 9.0
   }

var updated =
   { ...laotzu
   , rating: 10
   }

console.log (updated)   // -- { id: 0, title: "Tao Te Ching", rating: 10 }
console.log (laotzu)    // -- { id: 0, title: "Tao Te Ching", rating: 9 }
```

```getter.js
// -- window._ | global._

window._ = new Object (null)
_.rating = (record) => record.rating

console.log (_.rating (laotzu))    // 9
console.log (_.rating (updated))   // 10
```

[[Declarative Programming + Elm] Bài 7 - Pattern Matching & Recursion](https://viblo.asia/p/PAoJe6BpL1j)