Như đã được giới thiệu từ những bài viết mở đầu, cái tên `Elm` không chỉ có ý nghĩa là một ngôn ngữ lập trình mà còn là một môi trường phát triển ứng dụng web mặt tiền `Front-End` với các thư viện dựng sẵn tính kiến trúc.

Tính cho tới thời điểm này, chúng ta đã đi qua những kiến thức trọng tâm của ngôn ngữ `Elm` để có thể sử dụng như những ngôn ngữ lập trình đã biết là `JS` hay `C` để tạo ra những logic tính toán trên các tập dữ liệu. Và bây giờ chính là thời điểm rất phù hợp để chúng ta tìm hiểu về kiến trúc `Front-End` mà môi trường `Elm` cung cấp để có thể tạo ra một ứng dụng web trang đơn `SPA` như đã nhắc đến trước đó.

## Basic Pattern

Kiến trúc `Elm Architecture` là một dạng thức triển khai cho các ứng dụng web mặt tiền `Front-End` và được sát nhập vào các thư viện dựng sẵn của `Elm` một cách rất tự nhiên chứ không theo một lộ trình phát triển định trước. Các lập trình viên tạo ra và sử dụng `Elm` liên tục nhận biết những dạng thức triển khai code căn bản xuất hiện khi họ xây dựng các ứng dụng bằng `Elm` và từ đó tạo ra những thư viện tổng quát những công cụ thiết yếu.

Thật khó tưởng tượng được làm thế nào mà cộng đồng `Elm` lại có thể tạo ra nền tảng lập trình có tính kiến trúc rõ ràng theo một tiến trình tự nhiên mà hoàn toàn không có những dự tính trước! Đó có thể cũng là điểm đặc trưng trong văn hóa của `Elm` và lối tư duy đệ quy `recursion`. :D

`basic pattern`
![](https://images.viblo.asia/02d715b8-e2be-4b9e-a324-2e64c943e62c.png)

Đó là kiến trúc căn bản của một ứng dụng `Elm` bất kỳ. Khởi đầu thì `Elm` sẽ tạo ra một tệp `HTML` để gửi tới trình duyệt web, và sau đó thì khi người dùng thao tác trên giao diện web sẽ tạo ra các sự kiện `event`. Các sự kiện này được mô tả bằng các chuỗi thông tin thu nhận được từ giao diện người dùng và sẽ được logic xử lý tạo ra bởi `Elm` phân tích và đưa ra những thay đổi cập nhật cho giao diện web nếu cần thiết.

Những thứ xảy ra trong một chương trình `Elm` bất kỳ sẽ luôn được chia thành 3 `sub-program` căn bản như thế này:

- **init** - trình khởi tạo bản ghi dữ liệu mô phỏng `model` dùng cho ứng dụng
- **view** - chương trình cấu trúc HTML để tạo giao diện người dùng với `input` là một bản ghi `model`
- **update** - trình xử lý tin nhắn sự kiện `message` để tạo ra các bản ghi `model` cập nhật

Các yếu tố này là phần cốt lõi của kiến trúc `Elm Architecture` và sẽ được kết hợp lại bởi một trong số những chương trình được cung cấp bởi [`module Browser`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#element) để tạo ra một thành phần kiến trúc `component`, hoặc một văn bản HTML hoàn chỉnh `document`, hoặc một ứng dụng web trang đơn `application`, có khả năng tương tác đáp ứng và cập nhật giao diện mà không cần tải lại toàn bộ giao diện của trang web.

## Common Packages

Để tiện cho việc tra cứu thông tin về các công cụ hỗ trợ được sử dụng trong các ví dụ thì ở đây chúng ta sẽ liệt kê trước những `package` phổ biến do chính `Elm` cung cấp. Các `package` khác do cộng đồng người dùng `Elm` phát triển có thể được tìm thấy tại đây:

[`https://package.elm-lang.org/`](https://package.elm-lang.org/)

- [`elm/core`](https://package.elm-lang.org/packages/elm/core/latest/) - các công cụ làm việc với các kiểu dữ liệu căn bản của ngôn ngữ `Elm` mà chúng ta đã biết.
- [`elm/html`](https://package.elm-lang.org/packages/elm/html/latest/) - các công cụ hỗ trợ kiến trúc và cập nhật văn bản HTML.
- [`elm/browser`](https://package.elm-lang.org/packages/elm/browser/latest/) - các API tương tác với cửa sổ trình duyệt web.
- [`elm/http`](https://package.elm-lang.org/packages/elm/html/latest/) - hỗ trợ tạo và gửi yêu cầu tương tác `request` từ trình duyệt web tới `server`.
- [`elm/url`](https://package.elm-lang.org/packages/elm/url/latest/) - các công cụ hỗ trợ phân tích URL sử dụng cho HTTP và định tuyến cho ứng dụng trang đơn SPA.
- [`elm/json`](https://package.elm-lang.org/packages/elm/json/latest/) - các công cụ hỗ trợ làm việc với JSON.
- [`elm/file`](https://package.elm-lang.org/packages/elm/file/latest/) - chọn tệp, tải tệp, làm việc với nội dung của tệp.
- [`elm/svg`](https://package.elm-lang.org/packages/elm/svg/latest/) - hỗ trợ cấu trúc đối tượng đồ họa SVG.
- [`elm/time`](https://package.elm-lang.org/packages/elm/time/latest/) - làm việc với dữ liệu mô tả thời gian.
- [`elm/random`](https://package.elm-lang.org/packages/elm/random/latest/) - tạo ra các giá trị ngẫu nhiên.

## HTML Template

`Package:` [`elm/html`](https://package.elm-lang.org/packages/elm/html/latest/Html)

Trước hết thì chúng ta sẽ làm quen với thao tác cấu trúc nội dung HTML để có thể tạo ra một bản mẫu `template` cho chương trình cần xây dựng đã. Thao tác này chúng ta cũng đã gặp ngay từ những bài viết đầu tiên. Đó chính là chương trình `Hello World` trả về một phần tử `Html message`.

```src/Main.elm
module Main exposing (main)
import Html exposing (Html, text)

main : Html message
main = text "Hello Elm !"
```

Trong `package html` có rất nhiều `sub-program` có cùng kiểu dữ liệu trả về như thế này để mô tả một phần tử HTML và sau đó sẽ được câu lệnh `elm make` biên dịch và đặt vào trong nội dung của một văn bản HTML.

Chương trình `text` mà chúng ta đã sử dụng là để tạo ra một `text node`. Đây là kiểu phần tử con của tất cả các phần tử HTML kiểu như `p`, `div`, `button`, v.v... Còn nếu muốn làm tắt và khởi tạo trực tiếp một `HTML node` thì chúng ta chỉ cần sử dụng các chương trình có tên tương ứng với thẻ HTML muốn sử dụng. Hãy thử tạo ra một thẻ tiêu đề chính [`h1`](https://package.elm-lang.org/packages/elm/html/latest/Html#h1).

```elm
h1 : List (Attribute msg) -> List (Html msg) -> Html msg
```

Tham số yêu cầu là một danh sách `List` các thuộc tính [`Attribute msg`](https://package.elm-lang.org/packages/elm/html/latest/Html-Attributes) và một danh sách các phần tử con [`HTML msg`](https://package.elm-lang.org/packages/elm/html/latest/Html). Ở đây chúng ta sẽ thử gắn `id="app"` cho phần tử `h1` được tạo ra, và nội dung `text="Hello HTML"`.

```src/Main.elm
module Main exposing (main)
import Html exposing (..)
import Html.Attributes exposing (..)

main : Html message
main = h1 [attribute "id" "app"] [text "Hello HTML"]
```

```CMD|Terminal.io
cd Documents && cd learn-elm
elm reactor
```

[`http://localhost:8000/src/Main.elm`](http://localhost:8000/src/Main.elm)
![](https://images.viblo.asia/9094519b-ea8d-4135-ad4b-4282cdfed7f3.png)

Khá đơn giản, như vậy để cấu trúc nên `template HTML` phù hợp với nhu cầu sử dụng thì chúng ta chỉ cần chủ yếu là xếp chồng các phần tử `HTML node` trong danh sách tham số thứ hai. Trong bài viết tiếp theo, chúng ta sẽ xem xét một ví dụ đơn giản đã được code sẵn và giới thiệu trên trang chủ của `Elm`.

[[Declarative Programming + Elm] Bài 11 - Buttons Example](https://viblo.asia/p/m2vJPwK84eK)