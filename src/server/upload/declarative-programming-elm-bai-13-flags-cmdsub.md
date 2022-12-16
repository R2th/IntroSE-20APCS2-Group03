Trước hết chúc ta hãy thử xem định nghĩa của  [`Browser.element`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#element) có thêm yếu tố nào mới so với `Browser.sandbox`.

```elm
element :
   { init : flags -> ( model, Cmd msg )
   , view : model -> Html msg
   , update : msg -> model -> ( model, Cmd msg )
   , subscriptions : model -> Sub msg
   }
   -> Program flags model msg
```

- `init` - lúc này có dạng tiếp nhận một tham số có tên là `flags` và trả về một `Tuple (model, Cmd msg)`.
- `view` - không có gì thay đổi và vẫn nhận một tham số đầu vào duy nhất là một bản ghi `model` để tạo ra một cấu trúc `HTML msg`.
- `update` - vẫn nhận vào một tin nhắn sự kiện `msg` được gửi tới từ trình điều khiển chính `Browser.element` và trả về một `Tuple (model, Cmd msg)`.
- `subscriptions` - nhận vào một bản ghi `model` và tạo ra một chương trình theo dõi sự kiện của trình duyệt `Sub msg`.
- Và cuối cùng là kết quả trả về của trình đóng gói `Browser.element` - là một chương trình `Program` nhận vào các tham số `flags`, `model`, `msg`.

## Flags

Công dụng của `Cmd` và `Sub` thì chúng ta đã có nhắc tới trước đó rồi, và ở đây chúng ta đang có thêm một yếu tố mới đó là `flags` - tạm dịch là các giá trị gắn cờ - xuất hiện ở trình khởi tạo `init` và trình kết quả `Program`. Như vậy là `flags` sẽ được truyền vào từ môi trường bên ngoài `Program` và sử dụng cho trình khởi tạo `init` khi người dùng tải trang web lần đầu.

Để gắn một chương trình `Program` đã được biên dịch thành tệp `element.js` vào một website đã xây dựng trước đó thì chúng ta vẫn thực hiện tương tự như khi sử dụng `Browser.sandbox`. Đó là tạo một phần tử HTML với `id` đặc định và truyền vào lệnh khởi tạo `Program`.

```html
<html>
<head>
   <meta charset="UTF-8">
   <title> Main </title>
   <script src="elm-time.js"> </script>
</head>
<body>
   <div id="elm-time"></div>
   <script>
      var app = Elm.Main.init({
         node: document.getElementById("elm-time"),
         flags: Date.now()
      });
   </script>
</body>
</html>
```

Đó là cách mà chúng ta truyền dữ liệu khởi tạo nội dung vào một `Element`. Điều này rất quan trọng, bởi vì thông thường thì chúng ta sẽ muốn tạo ra các `Element` có khả năng tái sử dụng nhiều lần. Và vì vậy nên những dữ liệu mang tính chất tạo cấu hình để `Element` hoạt động dựa trên đó - không nên được viết cố định vào code xử lý logic của `Element`.

Ví dụ bạn có thể sẽ rất muốn tạo ra một thanh điều hướng `Navbar` bằng `Elm` và dữ liệu để tạo nội dung cụ thể cho thanh `Navbar` sẽ được truyền vào tại thời điểm khởi tạo như trong code ví dụ ở trên. Hoặc, chúng ta sẽ chỉ cần truyền vào duy nhất một `URL` trỏ tới `API` cung cấp danh sách các đề mục `Category` của trang web ở dạng `JSON`.

Như vậy `Element` mà bạn xây dựng sẽ có thể được chia sẻ để sử dụng cho các trang web khác và người sử dụng code của bạn sẽ không cần phải đọc hiểu `Elm`. Việc tìm vị trí để gắn nội dung tĩnh trong code `Elm` sẽ không còn là yếu tố cần thiết nữa, và đó cũng chính là mong muốn chung khi chúng ta viết bất kì một chương trình nào, trong bất kỳ ngôn ngữ nào.

## HTTP Request

Bây giờ chúng ta sẽ cùng xem xét ví dụ về một `Element` đơn giản thực hiện việc gửi yêu cầu `HTTP request` tới một `server` để lấy nội dung, được `Elm` giới thiệu trong tài liệu hướng dẫn.

Ở đây chúng ta đang có một trình hiển thị nội dung văn bản `Reader` với các yếu tố kiến trúc có phương thức hoạt động hơi khác một chút so với `Sandboxed Buttons`. Chương trình khởi đầu tại `Main` với tham số `flags` tạm thời để trống vì chúng ta chưa cần gắn `Element` này vào trang web nào cả.

```src/Main.elm
module Main exposing (main)

import Browser exposing (..)
import Http exposing (..)
import Html exposing (..)

-- MAIN - - - - - - - - - - - - - - - - - -

main : Program () Model Msg
main = Browser.element (Reader init update subscriptions view)

type alias Reader =
   { init : () -> (Model, Cmd Msg)
   , update : Msg -> Model -> (Model, Cmd Msg)
   , subscriptions : Model -> Sub Msg
   , view : Model -> Html Msg
   }
```

Ngay sau đó thì `init` sẽ được kích hoạt để tạo ra bản ghi trạng thái đầu tiên kèm theo lệnh gửi yêu cầu truy vấn nội dung văn bản qua `HTTP`.

```src/Main.elm
-- INIT - - - - - - - - - - - - - - - - - -

type Model = Loading
           | Failure
           | Success String
 
 type Msg = GotResponse (Result Http.Error String)

init : () -> (Model, Cmd Msg)
init _ =
   let command = Http.get { url = "https://elm-lang.org/assets/public-opinion.txt"
                          , expect = Http.expectString GotResponse
                          }
   in ( Loading, command )
```

Như vậy là giá trị bản ghi mà `init` khởi tạo ban đầu sẽ là một giá trị bất kỳ thuộc kiểu `Loading` và sẽ được `Program` truyền vào `view`. Ngay sau khi khởi tạo giá trị `Loading` thì `init` cũng đồng thời gửi yêu cầu truy vấn nội dung qua `HTTP`. Ngay khi có kết quả truy vấn thì `Program` sẽ chuyển một giá trị thuộc kiểu `Cmd Msg` tới cho trình `update`.

```src/Main.elm
-- VIEW - - - - - - - - - - - - - - - - - -

view : Model -> Html Msg
view model = case model of
   Loading -> text "Loading..."
   Failure -> text "I was unable to load your book."
   Success fullText -> pre [] [ text fullText ]
```

Trong ví dụ này thì `view` sẽ tạo ra cấu trúc `HTML` bằng cách `Pattern Matching` kiểu bản ghi đầu vào. Ban đầu khi nhận được kiểu `Loading` thì sẽ chỉ hiện dòng chữ `"Loading..."`. Các trường hợp `pattern` dữ liệu khác sẽ có thể xuất hiện khi trình `update` được kích hoạt.

```src/Main.elm
-- UPDATE - - - - - - - - - - - - - - - - - -

update : Msg -> Model -> (Model, Cmd Msg)
update msg model = case msg of
   GotResponse (Err _) -> ( Failure, Cmd.none )
   GotResponse (Ok txt) -> ( Success txt, Cmd.none )
```

Ở đây chúng ta chỉ có một trường hợp trình `update` được kích hoạt đó là khi nhận được thông báo `GotResponse` của thao tác gửi yêu cầu `HTTP Request`. Sau khi tạo ra bản ghi `Model` mới là `Failure` hoặc `Success txt` thì chúng ta không cần kích hoạt thêm lệnh tương tác nào `Cmd.none`. Bản ghi `Model` mới theo chu trình xử lý mà chúng ta đã biết sẽ được gửi tới `view` để cập nhật nội dung hiển thị.

```src/Main.elm
-- SUBSCRIPTIONS - - - - - - - - - - - - - - - - - -

subscriptions : Model -> Sub Msg
subscriptions model = Sub.none
```

Yếu tố kiến trúc cuối cùng là `subscriptions` do chưa cần sử dụng tới nên được biểu thị bằng giá trị `Sub.none` vô nghĩa đối với trình điều khiển `Program`.

```CMD|Teminal.io
cd Documents && cd learn-elm
elm reactor
```

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/1654a37e-489b-4753-bef9-dd70870963a1.png)

Hiện tại thì tệp `public-opinion.txt` được cung cấp tại `URL` do `Elm` cung cấp ở trình `init` vẫn đang khả dụng và bạn sẽ thấy dòng chữ `"Loading..."` sẽ chỉ được hiển thị trong một khoảng thời gian ngắn ngay sau khi trang web được tải về. Sau đó thì nội dung hiển thị sẽ được cập nhật như trong ảnh chụp màn hình.

## Cmd & Sub

Như chúng ta đã thấy thì yếu tố tin nhắn mệnh lệnh `Cmd Msg` đã khiến cho logic hoạt động của chương trình `Program` tạo ra bởi `Browser.element` trở nên linh động hơn rất nhiều so với `Browser.sandbox`.

Tin nhắn sự kiện `Msg` có thể được gửi tới từ rất nhiều điểm khác nhau trong chương trình - khi kết thúc thao tác khởi tạo bản ghi `Model` đầu tiên, khi người dùng tương tác với cấu trúc `Html Msg` được tạo ra bởi `view`, khi kết thúc mỗi `case` xử lý của chính chương trình `update`, và khi `Sub Msg` nhận biết được một sự kiện xảy ra trong tổng quan môi trường trình duyệt web.

Như vậy yếu tố còn lại mà chúng ta cần tìm hiểu là `subscriptions` - trình khởi tạo các `Sub Msg` theo dõi các sự kiện xảy ra trong môi trường trình duyệt web tổng quan. Vậy có những kiểu sự kiện nào có thể được gắn `Sub Msg`? Tất cả đều được liệt kê tại đây: [`Browser.Events`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Events)

- [`onClick`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Events#onClick) - khi có một click chuột xảy ra ở bất kỳ đâu trong trang web
- [`onMouseMove`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Events#onMouseMove) - khi người dùng di chuyển con trỏ chuột ở bất kỳ đâu
- [`onMouseDown`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Events#onMouseDown) - khi người dùng nhấn xuống nút click chuột bên trái/phải ở bất kỳ đâu
- [`onMouseUp`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Events#onMouseUp) - khi người dùng nhả nút click chuột ở bất kỳ đâu
- [`onKeyPress`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Events#onKeyPress) - khi người dùng nhấn một phím bất kỳ và nhả ra
- [`onKeyDown`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Events#onKeyDown) - khi người dùng nhấn một phím bất kỳ
- [`onKeyUp`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Events#onKeyUp) - khi người dùng nhả một phím bất kỳ
- [`onAnimationFrame`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Events#onAnimationFrame) - khi có `animation` hoạt động
- [`onResize`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Events#onResize) - khi người dùng thu hẹp hoặc mở rộng cửa sổ trình duyệt
- [`onVisibilityChange`](https://package.elm-lang.org/packages/elm/browser/latest/Browser-Events#onVisibilityChange) - khi trạng thái hiển thị của cửa sổ trình duyệt thay đổi

Thực tế thì `Sub Msg` còn có thể được tạo ra từ những chương trình khác nữa ví dụ như [`Time.every`](https://package.elm-lang.org/packages/elm/time/latest/Time#every) được cung cấp bởi [`package: elm/time`](https://package.elm-lang.org/packages/elm/time/latest/). Và vì vậy nên `Program` lúc này sẽ có khá nhiều khả năng để tương tác với môi trường bên ngoài.

Bây giờ chúng ta sẽ thử xem xét một ví dụ khác mà `Elm` đặt trên trang chủ để hiểu rõ hơn về các yếu tố `Cmd/Sub/Msg`.

```CMD|Terminal.io
elm install elm/time
```

```src/Main.io
module Main exposing (main)

import Browser exposing (..)
import Time exposing (..)
import Task exposing (..)
import Html exposing (..)


-- MAIN - - - - - - - - - - - - - - - - - -
main : Program () Model Msg
main = Browser.element (Clock init view update subscriptions)

type alias Clock =
   { init : () -> (Model, Cmd Msg)
   , view : Model -> Html Msg
   , update : Msg -> Model -> (Model, Cmd Msg)
   , subscriptions : Model -> Sub Msg
   }
```

Ở đây chúng ta sẽ tạo ra một chiếc đồng hồ đơn giản bằng cách truy vấn thông tin thời gian từ hệ thống sau đó cập nhật trạng thái hiển thị mỗi giây. Do không cần sử dụng tới tham số đầu vào khi khởi tạo `Program` nên chúng ta vẫn sẽ để trống tham số `flags`.

```src/Main.elm
-- INIT - - - - - - - - - - - - - - - - - -

type alias Model =
  { zone : Time.Zone
  , time : Time.Posix
  }

type Msg = Tick Time.Posix
         | AdjustTimeZone Time.Zone

init : () -> (Model, Cmd Msg)
init _ =
  ( Model Time.utc (Time.millisToPosix 0)
  , Task.perform AdjustTimeZone Time.here
  )
```

Ngoài `module Time` đã nói tới ở trên thì trình `init` còn sử dụng thêm [`module Task`](https://package.elm-lang.org/packages/elm/core/latest/Task) trong `package: elm/core`, để thực hiện một tác vụ được hẹn trễ lại một chút sau khi đã khởi tạo bản ghi `Model` đầu tiên. Đó là thao tác điều chỉnh múi giờ cho phù hợp với vị trí hiện tại của người dùng trên trái đất.

```src/Main.elm
-- VIEW - - - - - - - - - - - - - - - - - -

view : Model -> Html Msg
view model =
  let hour   = String.fromInt (Time.toHour   model.zone model.time)
      minute = String.fromInt (Time.toMinute model.zone model.time)
      second = String.fromInt (Time.toSecond model.zone model.time)
  in  h1 [] [ text (hour ++ ":" ++ minute ++ ":" ++ second) ]
```

Cấu trúc `Html Msg` đơn giản được `view` tạo ra với một thẻ `<h1>` duy nhất có chứa thông tin về thời gian từ bản ghi `Model` được truyền vào.

```src/Main.elm
-- UPDATE - - - - - - - - - - - - - - - - - -

update : Msg -> Model -> (Model, Cmd Msg)
update msg model = case msg of
    AdjustTimeZone newZone -> ( { model | zone = newZone }
                              , Cmd.none
                              )
    Tick time -> ( { model | time = time }
                 , Cmd.none
                 )
```

Tác vụ điều chỉnh múi giờ `AdjustTimeZone` được phát động bởi `init` sau khi thực hiện xong sẽ gửi `Cmd Msg` tới `Program` và sau đó `Msg` được gửi tới `update` để cập nhật thông tin hiển thị. Tới đây thì `update` sẽ tạo ra bản ghi `Model` mới và dừng vòng lặp lệnh tương tác `Cmd Msg` với `Cmd.none`.

Ngoài ra thì `update` còn có một trường hợp `Msg` được gửi tới thuộc kiểu `Tick time` được tạo ra bởi `subscriptions`.

```src/Main.elm
-- SUBSCRIPTIONS - - - - - - - - - - - - - - - - - -

subscriptions : Model -> Sub Msg
subscriptions _ = Time.every 1000 Tick
```

Sau mỗi giây `1000 ms` thì `Sub Msg` được tạo ra bởi `Tick` sẽ gửi `Msg` tới trình điều khiển chính `Program` và `Msg` tiếp tục được chuyển tới trình `update` để thực hiện `case` còn lại.

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/5e9fd835-1ab9-4094-9a68-62a59ab817a4.png)

Như vậy là chúng ta đã điểm tra một lượt những điểm mới mẻ trong kiến trúc của `Browser.element`. Đây cũng là những yếu tố cần thiết để chúng ta có thể tạo ra những `Element` hữu ích cho trang web đã xây dựng trước đó.

[[Declarative Programming + Elm] Bài 14 - Web Apps](https://viblo.asia/p/vlZL9NG8VQK)