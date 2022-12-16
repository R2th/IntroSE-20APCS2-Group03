Như vậy là chúng ta đã biết cách sử dụng trình đóng gói `Browser.element`, một trong hai lựa chọn được sử dụng nhiều nhất trong số các lựa chọn được `module Browser` cung cấp. Bây giờ chúng ta sẽ tìm hiểu về các lựa chọn còn lại là `Browser.document` và `Browser.application`.

## Browser.document

Trước đó thì `Browser.document` được sử dụng khá nhiều bởi chương trình này cho kết quả build cuối cùng là một tệp `HTML`. Code xử lý logic ở `view` lúc này có thêm khả năng điều chỉnh các yếu tố như `<title>` và `<body>`.

```elm
document :
   { init : flags -> ( model, Cmd msg )
   , view : model -> Document msg
   , update : msg -> model -> ( model, Cmd msg )
   , subscriptions : model -> Sub msg
   }
   -> Program flags model msg
```

Điều này cho phép chúng ta sử dụng `Elm` như các ngôn ngữ `Templating` khác kiểu như `EJS` nhưng có thêm khả năng xử lý logic mạnh mẽ hơn. Các tệp `HTML template` sẽ được chọn và gửi tới trình duyệt web kèm theo `flags` là `URL` truy vấn nội dung để hiển thị.

Tuy nhiên ở thời điểm hiện tại thì công nghệ lập trình web ở phía mặt tiền `Front-End` đã có rất nhiều sự thay đổi. Người ta thường nói tới cái tên `SPA - Single Page Application` - dịch nôm na là ứng dụng web trang đơn. Tức là thay vì tạo ra nhiều tệp `HTML template` rời thì chúng ta sẽ chỉ tạo ra một tệp `HTML template` duy nhất.

## Browser.application

So với `Browser.element` và `Browser.document` thì chương trình `Browser.application` yêu cầu các thành phần kiến trúc phức tạp hơn khá nhiều.

```elm
application :
   { init : flags -> Url -> Key -> ( model, Cmd msg )
   , view : model -> Document msg
   , update : msg -> model -> ( model, Cmd msg )
   , subscriptions : model -> Sub msg
   , onUrlRequest : UrlRequest -> msg
   , onUrlChange : Url -> msg
   }
   -> Program flags model msg
```

Yếu tố `Url` lúc này đã không còn là lựa chọn mà người viết code sẽ ngầm định đem vào logic xử lý của `init` mà đã trở thành tham số bắt buộc. Chúng ta sẽ chỉ có một tệp `HTML template` duy nhất được gửi tới trình duyệt web trong mọi trường hợp truy cập trang web lần đầu tiên. Sau đó mỗi khi người dùng nhấn vào một liên kết trong trang web thì các yếu tố `onUrlRequest` và `onUrlChange` sẽ thực hiện việc phân tích `URL` và truy vấn nội dung từ `server`.

Kết quả truy vấn nội dung mới sẽ được chuyển cho `update` để tiến hành cập nhật bản ghi `Model`, rồi chuyển cho `view` để tạo ra cấu trúc `HTML` mới. Như vậy, khi người dùng di chuyển giữa các trang đơn khác nhau trong trang web thì trình duyệt sẽ không cần phải tải lại toàn bộ cấu trúc `HTML` mà chỉ cập nhật những phần khác biệt khi so sánh cấu trúc của các trang đơn. ĐIều này khiến cho hiệu năng sử dụng được cải thiện đáng kể.

Ví dụ điển hình mà chúng ta có thể xem trực tiếp đó là trang web của chính `Elm`, khi chúng ta nhấn vào một liên kết bất kỳ để chuyển trang thì sự thay đổi nội dung được đáp ứng gần như tức thì. Lý do là vì toàn bộ cấu trúc `HTML` của tất cả các thành phần trong tất cả các trang đơn đều đã được tải về trong lần truy cập đầu tiên. Những lượt gửi yêu cầu nội dung tiếp theo thì `server` sẽ chỉ gửi phản hồi dữ liệu ở dạng `JSON`. Dữ liệu này sau đó sẽ được logic xử lý của `update` và `view` sử dụng để tạo ra sự thay đổi cần thiết trong khung hiển thị.

## Element & Application

Trình đóng gói `Browser.element` vẫn luôn là lựa chọn đầu tiên và phổ biến nhất. Bởi vì ngay cả khi chúng ta có dự định xây dựng một `SPA` thì các yếu tố để kiến trúc nên một `SPA` vẫn phải được chia nhỏ tới cấp của `Element` để viết code cụ thể. Trong trường hợp này thì `Browser.element` sẽ giúp chúng ta kiểm tra kết quả hoạt động của từng thành phần trong `project`.

Còn trong trường hợp sử dụng cho các website đã xây dựng trước đó thì `Brower.element`, như đã biết, sẽ giúp chúng ta tạo ra các thành phần có khả năng được gắn vào một trang web hoàn chỉnh với đầy đủ khả năng tương tác.

Và trong những bài viết tiếp theo, chúng ta sẽ tập trung vào việc tìm hiểu các yếu tố kiến trúc của `Browser.application` để có thể tạo ra một `SPA` theo ý muốn. Một ứng dụng `Application` duy nhất có khả năng tạo ra các cấu trúc `HTML` phù hợp với từng yêu cầu của người sử dụng trang web.

[[Declarative Programming + Elm] Bài 15 - Navigation & URL Parser](https://viblo.asia/p/EoW4obZlVml)