Bây giờ chúng ta sẽ xem xét một ví dụ sẵn có trong tài liệu hướng dẫn online của `Elm` có tên là các nút nhấn `Buttons`. Ví dụ này cũng chính là ví dụ trong tấm hình mô phỏng kiến trúc cơ bản của `Elm` ở phần đầu tiên của bài viết trước. Trình tự thực hiện ví dụ của chúng ta sẽ là `make it work` rồi mới `make it nice`. Và đoạn thêm code CSS để khiến các thành phần dễ nhìn hơn chúng ta sẽ để sau cùng, khi các thành phần đã có thể hoạt động tốt.

## Abstraction

Chúng ta sẽ có một `div` hiển thị một giá trị số nguyên, kèm theo 2 nút nhấn `+` và `-` để thực hiện chức năng tăng/giảm giá trị được hiển thị.

![](https://images.viblo.asia/02d715b8-e2be-4b9e-a324-2e64c943e62c.png)

Khởi đầu thì chúng ta cần xác định kết quả `output` của chương trình. Và trong [`module Browser`](https://package.elm-lang.org/packages/elm/browser/latest/) thì ở ngay phần đầu `Elm` khuyến khích sử dụng trình [`Browser.sandbox`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#sandbox) để học tương tác căn bản. Chương trình này chỉ yêu cầu đúng bộ tham số đầu vào tối thiểu là một `Record { init, view, update }` mà chúng ta đã nói trong phần giới thiệu kiến trúc `Elm Architecture` căn bản.

Như vậy nếu như chúng ta đặt tên cho chương trình là `Buttons` và đóng gói trong một `module` riêng thì chương trình `Main` sẽ cố định là như thế này:

```src/Main.elm
module Main exposing (main)
import Browser exposing (..)
import Buttons exposing (..)

main : Program () Model Message
main = Browser.sandbox (Buttons init view update)
```

Ở đây các tên định danh kiểu bản ghi `Model`, kiểu tin nhắn sự kiện `Message`, trình khởi tạo bản ghi `Buttons`, và các chương trình `init`, `view`, `update`, tất cả đều sẽ được định nghĩa trong `module Buttons`.

```src/Buttons.elm
module Buttons exposing (Buttons)

type alias Buttons = Nothing
```

Để tạo bản ghi sử dụng cho [`Browser.sandbox`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#sandbox) thì chúng ta cần xem qua cấu hình của chương trình con này một chút.

```Browser.elm
sandbox :
   { init : model
   , view : model -> Html msg
   , update : msg -> model -> model
   }
   -> Program () model msg
```

Như vậy là chúng ta sẽ cần một bản ghi `Record` có chứa các chương trình `init`, `view`, `update` như trên. Theo phương cách suy nghĩ đệ quy `recursion` thì chúng ta sẽ tạm dừng cái trình khởi tạo `Buttons` như trên để định nghĩa các `sub-program` trước.

Và để kiểm tra hoạt động của các chương trình con trong `module`, chúng ta sẽ chưa thể sử dụng `elm reactor` mà sẽ cần phải tương tác với `elm repl`.

```CMD|Terminal.io
cd Documents && cd learn-elm
elm repl
```

## Init

Đầu tiên là `init` - chương trình khởi tạo bản ghi dữ liệu `Model` để sử dụng cho `view` bày ra giao diện người dùng. Như vậy chúng ta sẽ cần định nghĩa kiểu bản ghi `Model` trước để sử dụng cho `init`. 

Do chương trình của chúng ta chỉ có một yếu tố duy nhất mang tính cập nhật đó là giá trị số nguyên được hiển thị giữa hai nút nhấn `+` và `-`, nên chúng ta sẽ có kiểu `Model` đơn giản. Và chương trình `init` để khởi tạo bản ghi dữ liệu đầu tiên cũng không có gì đáng lưu ý. Không yêu cầu tham số đầu vào và trả về chính xác bản ghi `Model` là được.

```Buttons.elm
module Buttons exposing
   ( Buttons
   , Model
   , init
   )

type alias Buttons = Nothing

-- Initializer - - - - - - - - -

type alias Model = { value : Int }

init : Model
init = Model 0
```

```REPL.elm
init
-- { value = 0 } : Model 
```

## View

Tiếp theo là `view` - chương trình cấu trúc `template HTML` để dựng giao diện người dùng. Ở đây chúng ta cũng đồng thời định nghĩa các kiểu tin nhắn sự kiện `Message` để mô tả ý nghĩa thao tác của người dùng. Và với tính năng tương tác của hai nút nhấn tăng/giảm giá trị như dự kiến thì chúng ta sẽ có hai kiểu tin nhắn tương ứng là `Increment` và `Decrement`.

```Buttons.elm
module Buttons exposing (..)
import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)

-- type alias Buttons = Nothing

-- Initializer ...
-- Templater - - - - - - - - -

type Message = Increment | Decrement

view : Model -> Html Message
view model =
   let value = String.fromInt model.value
   in  div  [ attribute "id" "app" ]
            [ button [ onClick Decrement ] [ text "-" ]
            , div [ attribute "id" "out" ] [ text value ]
            , button [ onClick Increment ] [ text "+" ]
            ]
```

Ở đây phần `id="app"` và `id="out"` mình sử dụng để làm bộ chọn cho code CSS sau khi đã hoàn thành logic hoạt động.

```REPL.elm
view (Model 1001)
-- <internals> : Html.Html Message
```

Có lẽ là `view` đã có thể hoạt động tốt. Tuy nhiên nếu như bạn muốn kiểm tra kết quả hiển thị thì có thể viết thêm một chương trình `main` ngay trong `module Buttons` và mở tệp `Buttons.elm` trong `elm reactor`.

```Buttons.elm
-- Initializer ...
-- Templater - - - - - - - - -

-- view : ...

main : Html Message
main = view (Model 1001)
```

Chúng ta vẫn sẽ cần sử dụng tới `elm repl` vì vậy nên bạn hãy mở thêm một cửa sổ dòng lệnh khác cho `elm reactor`.

```CMD|Terminal.io
cd Documents && cd learn-elm
elm reactor
```

`http://localhost:8000/src/Buttons.elm`
![](https://images.viblo.asia/84abc0f8-64ef-4d10-816f-e4216b579d8f.png)

## Update

Cuối cùng là `update` - chương trình này sẽ nhận vào một tin nhắn sự kiện `Message` và một bản ghi `Model` mô tả dữ liệu đang hiển thị ở thời điểm hiện tại. Sau đó `update` sẽ phân tích tin nhắn sự kiện và tạo ra một bản ghi `Model` mới với giá trị tăng hoặc giảm 1 đơn vị.

```Buttons.elm
-- Initializer ...
-- Templater ...
-- Updater - - - - - - - - -

update : Message -> Model -> Model
update message model =
   case message of
      Increment -> Model (model.value + 1)
      Decrement -> Model (model.value - 1)
```

```REPL.elm
update Increment (Model 0)
-- { value = 1 } : Model

update Decrement (Model 0)
-- { value = -1 } : Model
```

## Buttons

Như vậy là tất cả các `sub-program` đều đã hoạt động tốt. Bây giờ chúng ta chỉ cần hoàn thành nốt định nghĩa bản ghi `Buttons` và chạy thử chương trình trong `elm reactor`.

```src/Buttons.elm
module Buttons exposing (..)
import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)

type alias Buttons =
   { init : Model
   , view : Model -> Html Message
   , update : Message -> Model -> Model
   }

-- Initializer ...
-- Templater ...
-- Updater ...
```

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/7c2da856-451a-4eeb-9389-18ab46352a06.png)

Sau khi click thử vào các nút `+` và `-`, nếu như bạn thấy mọi thứ đã hoạt động ổn cả thì có thể nhấn `Ctrl+C` để dừng `elm reactor` và chạy lệnh `elm make`.

```CMD|Terminal.io
elm make src/Main.elm
Success!

    Main ───> index.html
```

Bây giờ bạn có thể gắn thêm một `<link href="style.css">`  vào tệp `index.html` vừa được tạo ra và thêm một đoạn code CSS trước khi mở tệp này trực tiếp bằng trình duyệt web để kiểm tra hoạt động.

```src/style.css
* {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}

#app {
   border: 1px solid lightgray;
   border-radius: 5px;
   display: inline-block;
   margin: 27px 45px;
   padding: 9px;
}

#app button {
   font-size: 21px;
   border-radius: 50%;
   border: none;
   padding: 12px 21px;
   margin: 0 2px;
   cursor: pointer;
}

#out {
   font-size: 24px;
   text-align: center;
   display: inline-block;
   padding: 9px 24px;
   min-width: 90px;
}
```

![](https://images.viblo.asia/9dbe69e7-ddd6-483f-b9ae-67037727e93c.png)

Oh... và đó là trình tự để tạo ra một `element` với kiến trúc `Elm Architecture`. Mặt khác thì [`Browser.sandbox`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#sandbox) sẽ giới hạn `element` này không thể tương tác với môi trường bên ngoài. Như vậy sẽ rất an toàn để bạn thử tạo ra một vài `element` như các danh sách dạng sổ xuống `dropdown` hay trình chiếu ảnh `carousel` để chèn vào trang web mà bạn đã xây dựng trước đó.

```CMD|Terminal.io
elm make src/Main.elm --output elm-buttons.js
```

Để nhúng `element` vừa tạo ra vào một trang web mà bạn đã xây dựng trước đó, bạn cần nhúng tệp `button.js` và `style.css` vào `template` của trang web đang có. Và bổ sung thêm một cặp thẻ:

```html
   <link rel="stylesheet" href="elm-buttons.css">
</head>
<body>
   <!-- somewhere in -->
   <div id="elm-buttons"></div>
   <!-- the document -->

   <script src="elm-buttons.js"></script>
   <script>
      const app = Elm.Main.init({
         node: document.getElementById("elm-buttons")
      });      
   </script>
```

Trong trường hợp bạn muốn tạo ra các `element` có khả năng tương tác với các thành phần bên ngoài hay gửi yêu cầu truy vấn dữ liệu tới `server`, thì chúng ta có [`Browser.element`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#element). Chương trình này sẽ yêu cầu thêm một vài yếu tố khác trong tham số đầu vào để hỗ trợ cho các thao tác truy vấn dữ liệu từ `server` được thực thi bất đồng bộ `async`. Và như vậy mối quan tâm tiếp theo của chúng ta sẽ là cách gửi các yêu cầu truy vấn `HTTP request` và cập nhật kết quả từ các thao tác `async`.

## Elm Architecture in JS/jQuery

```buttons.js
/* -- init - - - - - - - - - */

// -- Model = { value : any }
const Model = (value) => ({ value })

// -- init : number -> Model
const init = (value) => Model (value)


/* -- view - - - - - - - - - */

// -- view : Model -> jElement
const view = (model) =>
   $(`
      <div id="app" data-value="${model.value}">
         <button> - </button>
         <div id="out"> ${model.value} </div>
         <button> + </button>
      </div>
   `)


/* -- update - - - - - - - - - */

// -- Message = Decrement | Increment
const Decrement = "decrease"
const Increment = "increase"

// -- update : Message -> Model -> Model
const update = (message) => (model) =>
   { if (message == Decrement) return Model (model.value - 1)
   ; if (message == Increment) return Model (model.value + 1)
   ; if ("any-other-case")     throw new Error ("Invalid Message")
   }


/* -- Buttons - - - - - - - - - */

// -- Buttons : init -> view -> update -> jElement
const Buttons = (init) => (view) => (update) =>
   { var $app = view (init (0))
   ; $app.on(`${Increment} ${Decrement}`, (event) =>
      { var value = Number.parseInt($app.attr("data-value"))
      ; var model = update (event.type) (Model (value))
      ; $app.attr("data-value", model.value)
      ; $app.children("div").text(model.value)
      })
   ; $app.children("button").first().on("click", (event) => $app.trigger(Decrement))
   ; $app.children("button").last().on("click", (event) => $app.trigger(Increment))
   ; return $app
   }

// -- render app
$("#js-buttons").append(Buttons (init) (view) (update))
```

[[Declarative Programming + Elm] Bài 12 - No-sandbox Element](commands-subscriptions-y37LdA2gVov)