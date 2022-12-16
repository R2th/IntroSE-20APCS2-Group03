# 1. Kiến Trúc Elm
- Mẫu Đơn Giản:
Mọi chương trình Elm sẽ chia nhỏ thành 3 phần riêng biệt:
Model: trạng thái của ứng dụng
Update: cách để cập nhật trạng thái
View: cách để nhìn thấy state như là HTML
Các mẫu này luôn xuất phát từ các khung có sẵn sau và được phát triển cho từng trường hợp riêng biệt:
```
import Html exposing (..)


-- MODEL

type alias Model = { ... }


-- UPDATE

type Msg = Reset | ...

update : Msg -> Model -> Model
update msg model =
  case msg of
    Reset -> ...
    ...


-- VIEW

view : Model -> Html Msg
view model =
  ...
```
Đây thực sự là bản chất của cấu trung Elm. Tiếp theo chúng ta sẽ phát triển logic dựa theo khung này.
## 2. Kiến trúc Elm + User Input:
Vị dụ đơn giản đầu tiên là 1 bộ đếm có chức năng tăng và giảm. Nó sẽ giúp chúng ta có cái nhìn tổng quát.
Đầu tiên chúng ta cần khai báo Model. Trong chương trình của chúng ta, Model là trạng thái của app, là số lần được đếm. Chúng ta khai báo trong Elm:
```
type alias Model = Int
```
Như vậy là đã xong khai báo Model. Tiếp theo là phần Update. Chúng ta cần phải xác định làm thế nào state thay đổi.Đầu tiên chúng ta khai báo tập hợp các Message tượng trưng cho từng cách update state.
```
type Msg = Increment | Decrement
```
Sau đó chúng ta khai báo hàm update mô tả chúng ta sẽ làm gì khi nhận được 1 Message khai báo ở trên
```
update: Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            mode + 1
            
        Decrement ->
            model - 1
```
Ở đây khi nhận được Message là Decrement thì chúng ta giảm model đi 1 và ngược lại.
Và tiếp theo là làm thế nào để show dữ liệu này lên HTML. Elm có thư viện tên là elm-lang/html cung cấp dầy đủ chức năng HTML5 dưới dạng functions trong Elm:
```
view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (toString model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
```

Một điều cần chú ý ở đây là view function tạo ra HTML Message . Điều đó có nghĩa là nó chính là 1 đoạn HTML có thể tạo ra các giá trị Message. Khi chúng ta thấy onClick với Increment và Decrement. Chúng sẽ được đưa trực tiếp cho update function.