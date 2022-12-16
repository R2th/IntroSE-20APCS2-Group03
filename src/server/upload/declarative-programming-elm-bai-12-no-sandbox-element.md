Trong ví dụ trước thì chúng ta đã được xem cách mà `Elm Architecture` phiên dịch ý nghĩa sự kiện thao tác của người dùng thành các tin nhắn `Message`, và đáp ứng lại bằng cách tạo ra một bản ghi `Model` mới để gửi cho chương trình vẽ giao diện `view`. Sau đó `view` lại tiếp tục tạo ra một cấu trúc `HTMl DOM` mới được bọc bên trong kiểu `Html Message` và ...

## Browser.sandbox

Cấu trúc  `HTML DOM` mới lúc này sẽ được chương trình [`Browser.sanbox`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#sandbox) thực hiện so sánh với cấu trúc `HTML DOM` đang được hiển thị trong văn bản HTML và chỉ thực hiện cập nhật những `HTML Node` ở cấp gần nhất với nơi có sự thay đổi.

![](https://images.viblo.asia/48edf321-4dda-4950-95b8-9146eee9d73e.png)

Câu chuyện mới của chúng ta lúc này đó là [`Browser.sanbox`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#sandbox) được thiết kế để đảm bảo code xử lý logic mà chúng ta viết sẽ chỉ có thể thực hiện các thao tác làm việc với cấu trúc `DOM`. Ngoài ra thì chắc chắn sẽ không có một kiểu tương tác nào khác được hỗ trợ, ví dụ như gửi yêu cầu `HTTP Request` tới một `server` nào đó để truy vấn dữ liệu cập nhật nội dung.

Và vì vậy nên `Elm` nói rằng chương trình tạo môi trường tiếp theo mà chúng ta nên tìm hiểu sau [`Browser.sanbox`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#sandbox) là ...

## Browser.element

Chương trình [`Browser.element`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#element) cũng được thiết kế để đóng gói các thành phần `init`, `view`, `update` thành một `Element`, để bạn có thể chèn vào một website bất kỳ đã được xây dựng trước đó.

Điểm khác biệt căn bản là chúng ta sẽ còn có thêm khả năng gửi lệnh tương tác tới môi trường vận hành `JavaScript Engine`, để yêu cầu thực hiện các kiểu tác vụ khác. Ví dụ như gửi yêu cầu [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) tới một máy chủ web `server` nào đó để truy vấn dữ liệu, truy vấn thông tin thời gian từ hệ điều hành, tạo ra một giá trị ngẫu nhiên, v.v... 

![](https://images.viblo.asia/a80734a2-7799-4aa5-8ed3-4d4d86b0d040.png)

Hiển nhiên, như chúng ta có thể nhìn thấy trong sơ đồ khái quát chu trình hoạt động của một `Element` được đóng gói bằng [`Browser.element`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#element), thì chúng ta sẽ còn có thêm các chương trình theo dõi sự kiện tương tác của hệ thống `Subscription` đi kèm với định nghĩa lệnh tương tác `Command` như đã nói ở trên.

Về căn bản thì chúng ta sẽ có thể tạo ra các `Subscription` để theo dõi hệ thống vận hành và chờ một sự kiện nhất định xảy ra. Sau đó, mỗi khi kiểu sự kiện phù hợp được trình duyệt web phát động thì `Subscription` sẽ gửi một tin nhắn `Message` tới trình điều hành chính của `Element` và kích hoạt `update` để thực hiện logic cập nhật phù hợp.

## Dependency Packages

Trong các ví dụ tiếp theo, chúng ta sẽ sử dụng thêm những `package` hỗ trợ khác bên cạnh [`elm/core`](https://package.elm-lang.org/packages/elm/core/latest/) và [`elm/html`](https://package.elm-lang.org/packages/elm/html/latest/) đã được cài đặt sẵn trong môi trường `elm`. Để cài đặt thêm `package` hỗ trợ cho `project` đang làm việc thì chúng ta có thể chạy lệnh `elm install` trong thư mục của `project`.

```CMD|Terminal.io
cd Documents && cd learn-elm
elm install elm/http
```

Sau mỗi lần chạy lệnh `elm install` để cài đặt một `package` mới thì chúng ta sẽ thấy thông báo kết quả cài đặt có kèm theo các `package` khác nữa hỗ trợ cho `package` chính mà chúng ta cần sử dụng. Và lựa chọn tự động cập nhật nội dung tệp `elm.json` mà trình khởi tạo `elm init` đã tạo ra khi chúng ta khởi đầu `project` trước đó.

```CMD|Terminal.io
$ elm install elm/http
Here is my plan:
  
  Add:
     elm/bytes    1.0.8
     elm/file     1.0.5
     elm/http     2.0.0

Would you like me to update your elm.json accordingly? [Y/n]: Y
Success!
```

Sau đó thì chúng ta có thể tự kiểm tra lại trong tệp quản lý `project` để đảm bảo các `package` chính đã được liệt kê ở trường `dependencies`.

```elm.json
"dependencies": {
   "direct": {
      "elm/browser": "1.0.2",
      "elm/core": "1.0.5",
      "elm/html": "1.0.0",
      "elm/http": "2.0.0",
   },
   "indirect": {
      "elm/json": "1.1.3",
      "elm/bytes": "1.0.8",
      "elm/file": "1.0.5",
      "elm/time": "1.0.0",
      "elm/url": "1.0.0",
      "elm/virtual-dom": "1.0.3"
   }
},
```

Như vậy là chúng ta đã có đầy đủ các công cụ hỗ trợ cần thiết để tiếp tục tìm hiểu về [`Browser.element`](https://package.elm-lang.org/packages/elm/browser/latest/Browser#element).

[[Declarative Programming + Elm] Bài 13 - Flags & Cmd/Sub](https://viblo.asia/p/n1j4l3X7Vwl)