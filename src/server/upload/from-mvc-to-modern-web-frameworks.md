Bài viết được dịch từ nguồn: https://hackernoon.com/from-mvc-to-modern-web-frameworks-8067ec9dee65

Model-View-Controller (MVC) là một trong những mô hình phổ biến và có ảnh hưởng nhất trong cấu trúc phần mềm. Mặc dù nhiều người cho rằng MVC đã lỗi thời, nó vẫn là một mô hình hữu ích. Trong bài đăng này, thay vì tôi sẽ nêu rõ cách thức nó phát triển thành các frameworks web hiện đại mà chúng ta biết và yêu thích ngày nay.

## Inception

Năm 1978, Trygve Reenskaugh và Adele Goldberg đặt ra cái tên là `Model-View-Controller`. Trygve tin rằng MVC và các biến thể của nó đã tạo thành `pattern language` , ngôn ngữ chung để mọi người nói về các vấn đề và giải pháp của họ. Nếu MVC được bao gồm trong sách `design pattern`, có lẽ chúng ta sẽ tìm thấy nó trong phần `behavioral pattern`.

Đây là bài viết của Trygve năm 2003, `MVC, Its Past and Present`. Trygve liệt kê mười một mẫu hình thành MVC `pattern language`. Tôi cho rằng về cơ bản là giống nhau:

![](https://images.viblo.asia/2caa51a9-e9c1-433b-8738-bf3709af0922.png)

Vai trò của `controller` và `view` có thể được sử dụng bởi cùng một đối tượng khi chúng được kết hợp rất chặt chẽ với nhau - Trygve Reenskaugh (một điểm đã được tranh luận không ngừng trong cộng đồng)

## Native MVC

Trong những thập kỷ tiếp theo, MVC tồn tại lâu hơn `Smalltalk` và các ứng dụng được cung cấp cho Mac OS và Windows khi các hệ thống đó phát triển và phát triển nhanh chóng. Sau này, khi điện thoại thông minh bắt đầu xuất hiện, các ứng dụng di động gốc cho Windows Mobile và các phiên bản đầu tiên của iOS cũng dựa vào MVC và các biến thể của nó. Tại Microsoft, MVC sau đó đã phát triển thành MVVM , cung cấp sức mạnh cho các dự án như WPF, Silverlight và Xamarin.

## Web MVC

Vào đầu những năm 2000, một số web framework quan trọng đã sử dụng `pattern language` của MVC: Spring, Ruby on Rails, PHP và ASP.net. Các `framework` này đã thêm một `responsibility`  mới cho `controller`: xử lý yêu cầu HTTP. Nó là một cái gì đó như thế này:

![](https://images.viblo.asia/1460eb3b-6ca1-4e61-975f-90403b555df9.png)

`Controller` là điểm truy cập vào ứng dụng, thay vì `view`. `Responsibility` của `view` cũng thay đổi: thay vì trực tiếp trình bày một cái gì đó cho người dùng và xử lý dữ liệu đầu vào, công việc của nó là `bundle` một gói HTML, JS và CSS để trình duyệt hiển thị. HTML / JS sẽ chứa logic như các trình xử lý nhấp vào `button` sẽ gửi một hành động trở lại `controller` thông qua XMLHttpRequest. Lưu ý rằng không có sự hiện diện đáng kể của MVC `pattern` trong trình duyệt. Điều đó sẽ sớm thay đổi với sự ra đời của web `framework` hiện đại.

## Modern Web Frameworks

Khi cuộc chiến trình duyệt đã ổn định, cuối cùng chúng ta cũng đã có được những thứ hay ho: XMLHttpRequest, DOM API ổn định, ES6, v.v. Với sức mạnh và tính linh hoạt ngày càng tăng này, các công ty bắt đầu xây dựng các ứng dụng web ngày càng phức tạp hơn (đôi khi được gọi là `Single Page Apps- SPA`), trái ngược với các trang web đơn giản có liên quan. Các Web `framework` hiện đại giúp tổ chức sự phức tạp phía `client` ngày càng tăng này và giữ cho sự phát triển ứng dụng có thể kiểm soát tốt và hiệu quả.

Thông thường, các `framework` này đã giới thiệu một bước xây dựng bổ sung để tạo HTML, JS và CSS tĩnh, để lưu trữ trực tiếp thông qua `View Controller` đơn giản (thường là một trình xử lý tại / hoặc /index.html). Bản chất tĩnh của các `resource` này có nghĩa là chúng ta có thể đặt các `cache-control header` và dựa vào CDN để giúp phục vụ chúng với độ trễ thấp hơn. Các `Single Page Apps` bao gồm logic (trong JS) để tạo các yêu cầu API HTTP đối với một tập hợp các `resource` được cung cấp bởi API `controller`, thường phản hồi với JSON:

![](https://images.viblo.asia/a95d9de4-b3a6-4daa-b8a2-27715a5a5968.png)

Điều đó đưa chúng ta đến ngày hôm nay: React , Vue  và Angular là các Web `framework` hiện đại phổ biến nhất. Các `model web framework` này tương tự như thế nào với MVC? Tất cả đều có một số loại `view`, vì vậy mọi sự so sánh sẽ cần được thực hiện ở lớp tiếp theo: `state` (`model`), logic trung gian (`controller`) và đồng bộ hóa.

Vue là đơn giản nhất: các tài liệu của nó nói rõ rằng Vue là `implementation` của MVVM . Angular cũng là MVVM-ish theo mặc định . Tuy nhiên, React được phát triển từ một ngôi sao đang hấp hối, sử dụng `super-pattern` có tên Flux :

![](https://images.viblo.asia/61b68897-99a9-4c37-9f1a-bbedc72e270e.png)

`Flux` là tất cả về dữ liệu một chiều. Hãy nhớ lại rằng Model trong MVC đại diện cho dữ liệu sẽ được View hiển thị. Flux phân `responsibility` của MVC `model`; nó sử dụng các `action` / API cho logic nghiệp vụ và `store` để xử lý trạng thái. Bạn có thể nghĩ `store` là một Mô hình thụ động nguyên khối cho toàn bộ ứng dụng.

Tại sao `Flux` lại hoạt động theo dạng dữ liệu một chiều? Lý do diễn ra như sau: khi một ứng dụng phát triển phức tạp, việc quản lý các thay đổi `state` ngày càng khó khăn hơn, đặc biệt là nếu những thay đổi đó đến từ các nguồn khác nhau. Trái ngược với Liên kết dữ liệu , trong đó `view function` thể hiện có thể thay đổi của ViewModel để thay đổi thuộc tính, React tạo `view function` mới như một chức năng của `state` / `props` . `View` không bao giờ cần phải lo lắng về những thay đổi `state` cục bộ. Ứng dụng chỉ có thể thay đổi bằng cách tạo một `Model instance` mới trong `state tree`. Khi React muốn cập nhật ứng dụng, nó sẽ thay thế một phần của `state tree` của nó bằng một đối tượng mới, điều này `triggers` việc tạo (các) `view` mới.

Mặc dù dữ liệu một chiều là `powerful concept`, nhưng nó không có quá nhiều ưu điểm và cũng không nâng React / Flux lên một mức cạnh tranh so với Angular / Vue. 

(Theo ý kiến cá nhân mình thì React đã có Redux và tùy theo mỗi trường hợp mà có thể chọn `framework` khác nhau, mỗi cái đều có ưu nhược điểm)

![](https://images.viblo.asia/bf6646b5-c639-4ed3-8a65-946578020e5c.png)

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn