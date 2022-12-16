Trong bài viết này, chúng ta sẽ xem xét một ví dụ đơn giản mà `Elm` đưa ra về việc xử lý yêu cầu điều hướng giữa các trang nội dung đơn khi người dùng nhấn vào một liên kết bất kỳ trong SPA. Để thực hiện ví dụ này, chúng ta sẽ cần cài đặt thêm một `package` hỗ trợ.

```CMD|Terminal.io
cd Documents && cd learn-elm
elm install elm/url
elm reactor
```

## Navigation

Đầu tiên vẫn là chương trình `main` với đầy đủ các yếu tố kiến trúc theo yêu cầu tham số đầu vào của `Browser.application`.

```src/Main.elm
module Main exposing (main)

import Browser exposing (..)
import Browser.Navigation as Navigation exposing (Key)
import Html exposing (..)
import Html.Attributes as Attributes exposing (..)
import Url exposing (..)

-- main - - - - - - - - - - - - - - - - - - - - - - - - - - -

type alias SPA =
   { init : () -> Url -> Key -> ( Model, Cmd Msg )
   , view : Model -> Document Msg
   , update : Msg -> Model -> ( Model, Cmd Msg )
   , subscriptions : Model -> Sub Msg
   , onUrlRequest : UrlRequest -> Msg
   , onUrlChange : Url -> Msg
   }

main : Program () Model Msg
main = Browser.application
   ( SPA init view update subscriptions onUrlRequest onUrlChange )
```

Chúng ta sẽ có một kiến trúc HTML rấ đơn giản bao gồm một danh sách `<ul>` các liên kết điều hướng và một `<div>` hiển thị nội dung của trang đơn tương ứng với mỗi liên kết. Nội dung hiển thị ở đây sẽ chỉ đơn giản là đường dẫn đầy đủ của trang đơn cần hiển thị. Do đó nên `init` và `view` cũng khá đơn giản.

```src/Main.elm
-- init - - - - - - - - - - - - - - - - - - - - - - - - - - -

type alias Model = { key : Key
                   , url : Url
                   }

init : () -> Url -> Key -> ( Model, Cmd Msg )
init _ url key = ( Model key url, Cmd.none )

-- view - - - - - - - - - - - - - - - - - - - - - - - - - - -

view : Model -> Document Msg
view model =
   { title = "URL & Navigation"
   , body = [ ul [] [ li [] [ link "/home" ]
                    , li [] [ link "/profile" ]
                    , li [] [ link "/reviews/the-century-of-the-self" ]
                    , li [] [ link "/reviews/public-opinion" ]
                    , li [] [ link "/reviews/shah-of-shahs" ]
                    ]
            , div [] [ h1 [] [ text ( Url.toString model.url ) ] ]
            ]
   }

link : String -> Html msg
link path = a [ href path ] [ text path ]
```

Ở đây cả `init` và `view` đều không có điểm nào gửi `Msg` tới trình điều khiển chính `Program`. Tuy nhiên có một yếu tố mới đó là kiểu `Key` được sử dụng tại `init`. Giá trị này được sử dụng để đảm bảo các `sub-program` của `module Navigation` bao gồm `pushUrl`, `replaceUrl`, `back`, và `forward` sẽ chỉ có hiệu lực nếu được cung cấp đúng `key` đã khởi tạo khi trang web mới được tải về trình duyệt.

Các trường hợp xử lý tại trình `update` lúc này sẽ bao gồm:

- Người dùng nhập địa chỉ mới vào thanh địa chỉ `Address Bar` của trình duyệt web.
- Người dùng click chuột vào một liên kết trong trang web:
    - Liên kết trỏ tới một trang đơn cùng hệ thống
    - Liên kết trỏ tới một trang web khác

```src/Main.elm
-- update - - - - - - - - - - - - - - - - - - - - - - - - - - -

type Msg = LinkClicked UrlRequest
         | UrlChanged Url

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model = case msg of
   UrlChanged newURL -> ( { model | url = newURL }, Cmd.none )
   LinkClicked urlRequest -> case urlRequest of
      Browser.Internal url -> ( model, Navigation.pushUrl model.key ( Url.toString url ) )
      Browser.External href -> ( model, Navigation.load href )
```

Và các yếu tố kiến trúc còn lại...

```src/Main.elm
-- subscriptions - - - - - - - - - - - - - - - - - - - - - - - - - - -

subscriptions : Model -> Sub Msg
subscriptions _ = Sub.none

-- onUrlRequest - - - - - - - - - - - - - - - - - - - - - - - - - - -

onUrlRequest : UrlRequest -> Msg
onUrlRequest = LinkClicked

-- onUrlChange - - - - - - - - - - - - - - - - - - - - - - - - - - -

onUrlChange : Url -> Msg
onUrlChange = UrlChanged
```

Logic điều hướng của SPA lúc này khá dễ theo dõi với `onUrlChange` và `onUrlRequest`. Bởi vì sau cùng thì khi liên kết thay đổi, chúng ta cũng chỉ có các khả năng này:

- Hoặc là người dùng nhập một địa chỉ mới vào thanh `address bar`, thì `onUrlChange` sẽ được kích hoạt và `UrlChanged` được gửi tới trình `update`.
- Hoặc là người dùng click chuột vào một liên kết trong trang web, thì `onUrlRequest` sẽ được kích hoạt và `LinkClicked` được gửi tới trình `update`.

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/e069cafb-491f-4f5d-8329-5d9b24d2b15a.png)

Trường hợp duy nhất mà `update` cần phải tạo ra bản ghi `Model` với `url` mới đó là khi người dùng click chuột vào một liên kết trỏ tới trang đơn nội dung trong cùng hệ thống. Đó là khi bản ghi `Model` mới được gửi tới `view` và chúng ta sẽ có giao diện của trang web được thay đổi thành giao diện trang đơn phù hợp với yêu cầu.

Và hiển nhiên, trong trường hợp này thì trình duyệt web sẽ không cần phải tải lại toàn bộ văn bản HTML và người dùng sẽ không phải tạm thời nhìn thấy một cửa sổ trống.

## URL Parser

Trên thực tế thì sau thao tác điều hướng căn bản, chúng ta sẽ phải tìm hiểu thêm cách thức để phân tích đường dẫn yêu cầu `Request Url` trong trường hợp người dùng nhấn vào một liên kết trỏ tới một trang đơn cùng hệ thống.

Tuy nhiên việc tìm hiểu các công cụ xử lý nhóm tác vụ này sẽ yêu cầu sử dụng các `sub-program` được gọi là `Higher Order Functions` mà mình đã xác định là để dành cho Sub-Series tiếp theo. Và vì vậy nên câu chuyện `SPA` của chúng ta sẽ cần lui lại một chút cho đến khi `Higher Order Functions` và một số khái niệm liên quan được giới thiệu xong ở Sub-Series mới.

(chưa đăng tải) [[Functional Programming + Elm] Bài 1 - ... ](#)