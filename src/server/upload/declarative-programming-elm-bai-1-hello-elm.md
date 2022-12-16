Song hành cùng với `Imperative Programming` là mô hình lập trình nền tảng có tên là `Declarative Programming`, cũng đã được giới thiệu trong một bài viết trước đó tại [Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/p/gDVK2r2XKLj). Và ở tại Series Một Số Mô Hình Lập Trình Phổ Biến này thì mình cũng đã thử xây dựng Sub-Series `Declarative Programming + SQL` với một vài bài viết mở đầu cũng như hướng dẫn thiết lập môi trường học tập. 

Tuy nhiên thì vì một số lý do khách quan và vì căn bản là mình không có mục tiêu ứng dụng cụ thể trong tương lai đối với ngôn ngữ `SQL` và các hệ quản trị `database` dựng sẵn kèm tính năng bảo mật; Do đó nên mình đã quyết định chuyển hướng sang một ngôn ngữ khác có tên là [Elm](https://elm-lang.org/) (Element) và khởi đầu lại Sub-Series `Declarative Programming` với bài viết này.

Thực sự rất xin lỗi nếu như bạn đã theo dõi [Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/p/gDVK2r2XKLj) và đã cùng đồng hành cho đến thời điểm này vì sự thay đổi kế hoạch học tập bất ngờ. Trong trường hợp bạn thực sự quan tâm tới `SQL` và chưa tìm được nguồn hướng dẫn tự học vừa ý, thì ở phần cuối bài viết này mình sẽ cố gắng liệt kê sơ lược về lộ trình tự học `SQL` bằng các công cụ `W3schools.com` và `Google Translate`. Hy vọng phần sơ đồ tóm tắt sơ lược này sẽ có thể giúp ích cho bạn phần nào trong hành trình sưu tầm kĩ năng code mong muốn.

## Hello Elm !

Không hẳn là một ngôn ngữ lập trình phổ biến, tuy nhiên `Elm` lại là một xuất phát điểm lý tưởng cho bất kỳ ai đã có nền móng kiến thức lập trình web căn bản và muốn tìm hiểu về mô hình lập trình `Declarative Programming` thuần túy. Ngôn ngữ này được thiết kế kèm theo một trình biên dịch `compiler` tích hợp các thư viện mặc định hướng đến môi trường ứng dụng web mặt tiền `Front-End`.

Cụ thể là chúng ta sẽ viết code logic bằng `Elm` ví dụ như thế này -

```Main.elm
module Main exposing (main)
import Html exposing (Html, text)

main : Html message
main = text "Hello Elm !"
```

và sau đó trình biên dịch sẽ chuyển các tệp code `.elm` thành một tệp `index.html` duy nhất có cấu trúc như thế này -

```index.html
<!doctype html>
<html>
<head>
   <meta charset="UTF-8">
   <title> Main </title>
   <style> ... </style>
</head>
<body>
   <pre id="elm"> </pre>
   <script> ... </script>
</body>
</html>
```

Trong đó thì phần code `JavaScript` trong cặp thẻ `<script>` sẽ chứa logic được biên dịch từ code `Elm` và khiến cho đoạn chữ `Hello Elm !` sẽ được chèn vào bên trong nội dung của phần tử `<pre id="elm">` khi mở xem trong trình duyệt web.

Hiển nhiên là chúng ta sẽ không bao giờ cần phải mở tệp `HTML` này để chỉnh sửa trực tiếp phần code `JavaScript` được trình biên dịch của `Elm` tạo ra ở đây. Tư duy sử dụng căn bản ở đây là chúng ta sẽ chỉ xem tệp `index.html` giống với tệp lệnh thực thi của `C` sau khi đã được biên dịch. Và thay vì nhận được một tệp lệnh thực thi trực tiếp bởi hệ điều hành thì chúng ta đang nhận được một tệp lệnh thực thi bởi trình duyệt web.

## Khả năng của Elm

Trên thực tế thì trường hợp ví dụ như trên chỉ là để giới thiệu tiềm năng ứng dụng khởi điểm của `Elm` khi ngôn ngữ này mới ra mắt kèm theo `module Html` mặc định. Còn ở thời điểm hiện tại thì cộng đồng lập trình viên sử dụng ngôn ngữ này đã xây dựng thêm những module khác cho phép viết ứng dụng `Back-End` chạy trên nền `NodeJs`. Vì vậy nên sẽ có khá nhiều lý do để bạn tìm hiểu ngôn ngữ này khi có thời gian tản mạn tìm kiếm kiến thức mới:

- Để tìm hiểu sơ lược về khái niệm `Declarative Programming`
- Và xa hơn một chút sẽ là `Functional Programming` sẽ được nói đến trong Sub-Series nối tiếp ngay sau Sub-Series này.
- Để học cách xây dựng một ứng dụng web đáp ứng trên một tệp HTML đơn (SPA - Single Page Application).
- Hay cách viết một ứng dụng `Server-Side` theo một lối tư duy khác so với cách mà chúng ta đã xây dựng code `server` cho một trang blog cá nhân đơn giản trên nền `NodeJS` tại [ Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/p/L4x5xANrKBM)

## Cài đặt môi trường Elm

Ok, sau khi đã đọc lướt qua phần giới thiệu sơ lược về `Elm`, nếu như bạn có dư đôi chút thời gian để tìm hiểu thêm một ngôn ngữ lập trình mới bên cạnh lộ trình tự học của cá nhân bạn thì chúng ta sẽ chính thức bắt đầu gặp `Elm` ngay bây giờ. Việc cần thực hiện đầu tiên là cài đặt môi trường phát triển phần mềm của `Elm` bao gồm một trình biên dịch `compiler` kiêm quản lý các `package` giống như kiểu `NPM` đối với `NodeJS`.

- [Link tải về bộ cài `Elm` cho Windows](https://github.com/elm/compiler/releases/download/0.19.1/installer-for-windows.exe) - cực kỳ nhẹ, chỉ khoảng ~ 8 MB.
- [Hướng dẫn cài đặt từ nguồn Online cho Linux](https://github.com/elm/compiler/blob/master/installers/linux/README.md) - khoảng 3 câu lệnh Terminal và thời gian thực thi trong một nháy mắt.

Sau khi đã cài đặt xong theo hướng dẫn thì bạn mở cửa sổ dòng lệnh của hệ điều hành mà bạn đang sử dụng và gõ lệnh để kiểm tra kết quả cài đặt như sau -

```CMD|Terminal.io
elm --help
```

![](https://images.viblo.asia/2f7ec2c6-1818-458f-b367-650a74297b58.png)

Nếu như trong cửa sổ dòng lệnh hiện ra một đoạn hướng dẫn sử dụng trình biên dịch `elm` với một số câu lệnh phổ biến như trong ảnh chụp màn hình ở trên thì bạn đã có thể bắt đầu tìm hiểu ngôn ngữ lập trình này rồi đấy.

## Khởi tạo ứng dụng "Hello Elm !"

Khá giống với khi sử dụng `npm`, ở đây chúng ta sẽ cần khởi tạo một thư mục rỗng có tên ví dụ như `learn-elm` đặt trong `Documents` chẳng hạn. Sau đó trong cửa sổ dòng lệnh, di chuyển con trỏ làm việc vào bên trong thư mục này và chạy lệnh `elm init`.

```CMD|Terminal.io
cd Documents
mkdir learn-elm
cd learn-elm
elm init
```

![](https://images.viblo.asia/79d41571-1b2a-4bc1-ad49-f5c8c7fbfd09.png)

Lúc này chúng ta sẽ có một `project Elm` với một tệp khai báo tên là `elm.json` có chức năng giống với tệp `package.json` khi làm việc với một `project NodeJS` và một thư mục rỗng có tên là `src` là nơi sẽ chứa các tệp code mà chúng ta sẽ viết bằng ngôn ngữ `Elm`.

Hãy tạm chưa cần phải quan tâm tới các yếu tố mặc định đang có mặt trong tệp `elm.json` bởi vì chúng ta vẫn chưa bắt đầu xây dựng một `project` nào cả mà chỉ đang chuẩn bị môi trường để học những khái niệm căn bản của `Elm`. Ứng dụng quan trọng nhất của chúng ta lúc này là một chương trình đơn giản in ra văn bản HTML một dòng chữ `Hello Elm !`.

Trong thư mục `src`, chúng ta cần khởi tạo một tệp `Main.elm` có nội dung như đã nói ở phần giới thiệu phía trên -

```Documents/learn-elm/src/Main.elm
module Main exposing (main)
import Html exposing (Html, text)

main : Html message
main = text "Hello Elm !"
```

Sau đó trong cửa sổ dòng lệnh, chúng ta cần chạy lệnh biên dịch tệp `Main.elm` thành tệp thực thi `index.html` để chạy được bởi trình duyệt web -

```CMD|Terminal.io
elm make ./src/Main.elm
```

Lúc này bạn sẽ thấy trong thư mục `learn-elm` có thêm tệp `index.html` đã xuất hiện kèm theo một thư mục có tên là `elm-stuff`. Thư mục mới xuất hiện này có chứa các tệp hỗ trợ khác, tuy nhiên những tệp này chỉ nhằm mục đích hỗ trợ trong quá trình biên dịch chứ không cần phải được gắn kèm với tệp kết quả `index.html`.

Điều này có nghĩa là khi học đủ những kiến thức cần thiết về ngôn ngữ `Elm` và các thư viện hỗ trợ thì chúng ta sẽ có thể tạo ra một tệp `index.html` độc lập - có chứa code logic xử lý giao diện bằng `JavaScript`. Bạn sẽ có thể xây dựng một trang blog cá nhân bằng cách tách phần mềm vẽ giao diện blog thành một tệp `index.html` độc lập và tương tác với phần mềm `Server` để cập nhật thông tin khi người dùng nhấn vào các liên kết hoặc nút nhấn.

Ok, như vậy là đã khá đủ đối với bài viết giới thiệu mở đầu về ngôn ngữ `Elm`. Chúng ta sẽ nói về các yếu tố trong chương trình `Hello Elm !` ở bài viết tiếp theo.

[[Declarative Programming + Elm] Bài 2 - Basic Syntax](https://viblo.asia/p/W13VM2zD4Y7)

## Lộ trình tự học SQL

Công cụ: [W3schools.com](https://www.w3schools.com/mysql/default.asp) & [Google Translate](https://translate.google.com/)

- `Types & Defaults - Common Types, DEFAULT, AUTO_INCREMENT` - Các kiểu dữ liệu căn bản để lưu các kiểu nội dung phổ biến như số lượng, tiền tệ, boolean, nội dung văn bản, tài khoản người dùng, chuỗi mô tả thời gian.
- `Constrains & References - NOT NULL, UNIQUE, FK->PK, CHECK` - Các công cụ đặt ràng buộc lên các trường dữ liệu trong các bảng để đảm bảo các dữ liệu mới được lưu vào đều phù hợp.
- `Multi-table Queries - SELECT JOIN & UNION` - Cách sử dụng câu lệnh `SELECT` để kết hợp dữ liệu truy vấn đồng thời từ các bảng khác nhau.
- `Mutative Operations - INSERT, UPDATE, DELETE` - Các câu lệnh có ảnh hưởng tới trạng thái của dữ liệu trong `database` bao gồm thêm mới, cập nhật, và xóa bỏ.
- `Aggregate Operations - GROUP BY & HAVING` - Các hàm xử lý dữ liệu trên tập hợp các bản ghi có thể giúp chuyển một số tác vụ xử lý logic trên tập dữ liệu vào `Server SQL` và giảm số lượng bản ghi dữ liệu phải gửi tới cho phần mềm yêu cầu bên ngoài.
- `Procedures & Functions - @VAR, DECLARE & SET, SELECT INTO` - Cách tạo các chương trình nhỏ `sub-program` có tên ngắn gọn, giúp tạo giao diện gửi yêu cầu điều khiển tới `Server SQL` đơn giản hơn.
- `Switching & Looping - CASE..WHEN, WHILE..DO` - Các cấu trúc lệnh xử lý logic cho phép chuyển các tác vụ xử lý dữ liệu phức tạp hơn vào `Server SQL`.
- `Views & Triggers` - Các `VIEW` là các bảng dữ liệu ảo được tạo ra bằng các câu lệnh `SELECT` hoặc các `PROCEDURE` với kết quả được lưu đệm và cập nhật nhanh chóng giúp tăng hiệu suất xử lý yêu cầu. Còn các `TRIGGER` là các `PROCEDURE` được gắn với sự kiện khi có yêu cầu tương tác lên `VIEW` thì sẽ được kích hoạt tự động xử lý thêm logic cần thiết - một dạng `EventListener` như khi học `JavaScript`.
- `Transactions & Savepoints` - Cái này và cái gạch đầu dòng ở ngay phía trên sẽ ít khi được sử dụng, trừ khi bạn cần xây dựng một ứng dụng có tính năng khá phức tạp. `TRANSACTION` được hiểu như một nhóm các yêu cầu được `Server SQL` thực hiện trong một phiên đối thoại với phần mềm gửi yêu cầu. `TRANSACTION` giúp đảm bảo hoặc là tất cả các yêu cầu trong một phiên đối thoại đó đều được thực hiện thành công, hoặc hủy bỏ tất cả. Còn `SAVEPOINT` là điểm ghi nhớ trạng thái dữ liệu mà bạn muốn `Server SQL` quay ngược trở lại khi có một yêu cầu trong một `TRANSACTION` không được thực hiện thành công.