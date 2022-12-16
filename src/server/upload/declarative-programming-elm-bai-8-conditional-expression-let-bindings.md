Sau khi viết lại chương trình `sumNumberArray` bằng `JS` thì mình mới nhận ra rằng, cú pháp `Pattern Matching` rất gọn gàng nhưng cũng có giới hạn nhất định. Đó là cú pháp này không thể thực hiện việc kiểm tra định lượng của dữ liệu bằng các phép nhận định so sánh `<`, `==`, `>`, v.v... Vì vậy nên chúng ta sẽ cần ghi chú thêm một cú pháp khác nữa có tên gọi là biểu thức điều kiện `Conditional Expression`.

```CMD|Terminal.io
cd Documents && cd learn-elm
elm reactor
```

## Conditional Expression

Nghe tên gọi đã thấy quen thuộc rồi. Chắc chắn là có liên quan tới `if..else`. Tuy nhiên chúng ta cần lưu ý rằng đây là biểu thức `expression` chứ không phải là cấu trúc lệnh `structure`. Logic hoạt động ở đây là dựa trên điều kiện của dữ liệu để chọn giá trị trả về, chứ không phải là chọn câu lệnh để thực hiện.

```src/Tell.elm
module Tell exposing
   ( age
   , point
   , list
   , any
   , day
   )

age : Int -> String
age n = if (n <= 12) then "Being built by Heaven"
   else if (n <= 21) then "Unpacking old Story"
   else if (n < 101) then "Learning new Lessons"
   else                   "Finished Learning"

-- point : ...
```

```src/Main.elm
module Main exposing (main)
import Html exposing (..)
import Tell exposing (..)

main : Html message
main = Html.text <| (Tell.age 1001)
```

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/9dd5ccf3-0a9b-4c58-a0e6-3d46372435ce.png)

## Let Bindings

Ngoài ra thì chúng ta còn có thêm một cú pháp `binding` để có thể đưa ra một biểu thức trả về ngắn gọn với các tên định danh hoàn toàn mới so với các tham số - sau đó gắn kèm các định nghĩa giải thích cho các tên định danh đó.

```src/Tell.elm
module Tell exposing
   ( boxVolume
   , age
   , position
   , list
   , any
   , day
   )

boxVolume : Float -> Float -> Float -> Float
boxVolume a b height =
   let area = a * b
   in  area * height

-- age : ...
```

```src/Main.elm
-- ...
main = Html.text <| String.fromFloat <| (Tell.boxVolume 5.1 6.9 7.2)
```

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/b5a71319-e85c-49ff-8038-f632f6faa2e0.png)

Thực tế thì cú pháp này trông khá `Imperative`, tuy nhiên lại là lựa chọn `binding` duy nhất trong `Elm`. Ở một ngôn ngữ khác có tên gọi là `Haskell` người ta thường dùng cú pháp có chiều viết diễn giải ngược lại như thế này:

```where.hs
boxVolume a b c = area * c
   where area = a * b
```

Lối viết diễn dịch với biểu thức kết quả được đặt cùng dòng với biểu thức định nghĩa `sub-program` ở phía bên trái sẽ giúp chúng ta có thể tách lấy thông tin định nghĩa tổng quát của `sub-program` rất nhanh trong dòng đầu tiên. Sau đó, nếu thực sự cần thiết, chúng ta có thể tiếp tục đọc các dòng `binding` thông tin giải thích cho các yếu tố xuất hiện trong biểu thức ban đầu.

Thôi thì ở môi trường nào có công cụ gì thì chúng ta sẽ tận dụng công cụ đó. Cứ sử dụng cú pháp `let..in` nhiều rồi cũng sẽ quen. Cứ tìm đọc biểu thức `in..` trước vậy. Tuy nhiên do đó nên chúng ta phải lưu ý không nên viết nhiều biểu thức `let..in` xếp chồng trong cùng một đoạn code định nghĩa. Bởi vì như vậy sẽ rất khó để tổng quát thông tin khi đọc. Tốt nhất là chúng ta chỉ nên có một cặp `let..in` và có thể có nhiều biểu thức cùng cấp đứng sau `let` để giải thích cho các yếu tố cần thiết.

```src/Tell.elm
module Tell exposing
   ( cylinderVolume
   , boxVolume
   , age
   , position
   , list
   , any
   , day
   )

cylinderVolume : Float -> Float -> Float
cylinderVolume radius height = 
   let sideArea = 2 * pi * radius * height
       topArea = pi * radius ^ 2
   in  sideArea + 2 * topArea

-- boxVolume : ...
```

```src/Main.elm
-- ...
main = Html.text <| String.fromFloat <| (Tell.cylinderVolume 1.0 9.0)
```

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/a7964d08-2fa9-4df9-83ac-2e3d4e881108.png)

## Conditional Expression in JS

```ternary.js
// -- main : any -> null
const main = (_) => console.log (tellAge (1001))

// -- tellAge : number -> string
const tellAge = (age) => (age <= 12) ? "Being built by Heaven"
                       : (age <= 21) ? "Unpacking old Story"
                       : (age < 101) ? "Learning new Lessons"
                       :               "Finished Learning"

// -- start program
main (Infinity)
```

[[Declarative Programming + Elm] Bài 9 - Maybe & Result](https://viblo.asia/p/Yym40ZD9L91)