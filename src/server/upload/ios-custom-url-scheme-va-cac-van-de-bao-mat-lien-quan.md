Trong quá trình phát triền các ứng dụng iOS, hẳn chúng ta không lạ gì với khái niệm về custom URL scheme. Là một trong các phương thức Interprocess call (IPC) được áp dụng trong iOS, custom URL scheme giúp các nhà phát triển ứng dụng có thể gọi tới các chức năng khác nhau của ứng dụng từ một ứng dụng khác. Tính tiện dụng của tính năng này rất rõ ràng, vậy các vấn đề bảo mật của nó thì sao? Trong bài này mình xin phép trình bày một số lỗ hổng có thể xảy ra trong việc áp dụng custom URL scheme trong ứng dụng iOS.

## I. Custom URL Scheme


### 1. Khái niệm custom URL scheme

Custom URL Scheme là một cấu trúc sử dụng các URL đặc biệt để liên kết với các nội dung của ứng dụng. Điều này cho phép người dùng có thể gọi tới các tài nguyên có trong ứng dụng. Việc gọi này có thể thực hiện khi người dùng gọi tới URL này từ một email, web browser, ... URL này cũng có thể giúp các ứng dụng khác gọi tới các tài nguyên của ứng dụng.

Custom URL scheme có thể được sử dụng dưới dạng:
- deep link
- universal link

Mọi người có thể tham khảo thêm về 2 loại này theo tài liệu của Apple nhé.
## II. Các lỗ hổng với custom URL scheme
Trên thực tế, các tấn công vào custom URL thường xảy ra do sự thiếu xử lí dữ liệu gửi từ url scheme, không xác thực nguồn của request được gửi tới qua url scheme hoặc do cơ chế xác thực thông qua url scheme có lỗ hổng có thể khai thác được. Dưới đây mình sẽ trình bày một vài lỗ hổng mà mình đã tìm hiểu được về cơ chế custom URL scheme này. Thông thường các tấn công này xảy ra với deeplink.

### 1. URL scheme hijacking
Việc sử dụng deeplink trong cơ chế custom url scheme mang lại rất nhiều những tiện lợi trong việc sử dụng ứng dụng. Tuy nhiên, iOS lại không hề nghiêm cấm việc các ứng dụng có thể đăng kí cùng một url scheme. Và cơ chế xử lí của hệ điều hành lúc này sẽ là First In First Serve, tức là anh nào đăng kí trước thì gọi anh đó. 

Vậy kẻ xấu có thể lợi dụng gì từ điều này? Để dễ hình dung mình sẽ tạo dựng một kịch bản như này. Đầu tiên, ta có 2 ứng dụng an toàn A và B. Ứng dụng A có thể gọi tới một chức năng X của B thông qua deeplink.

![](https://images.viblo.asia/ff0e5a9d-4233-4ed6-b51b-08e57a150cb7.png)

Tuy nhiên, trước khi người dùng cài đặt ứng dụng B, trong máy đã tồn tại một ứng dụng C. Ứng dụng này đã đăng kí trước một url scheme giống với ứng dụng B, do đó, request của ứng dụng A gửi qua cho ứng dụng B sẽ vô tình gửi tới ứng dụng C. Từ đó dẫn tới các hệ quả là:
- ứng dụng A không thể sử dụng tính năng X của ứng dụng B (mất tính sẵn sàng của ứng dụng)
- Trong request của ứng dụng A có thể chứa các thông tin nhạy cảm và chúng có thể bị đọc bởi ứng dụng C (mất tính bảo mật của ứng dụng).
- Cấu trúc của request 

![](https://images.viblo.asia/20a94516-5f89-46c0-b4a1-3f778ac5734e.png)

Thực ra tấn công loại này rất hiếm khi xảy ra. Tuy nhiên, hiếm không có nghĩa là không thể. Do đó, việc đề phòng các tấn công này là rất cần thiết. 
- đối với phía nhà phát triển: 
    - không nên gửi các thông tin nhạy cảm qua cơ chế này, có thể có phương thức khác để sử dụng tính năng X trong trường hợp không thể sử dụng custom url scheme.
    - Sử dụng universal link 
- Về phía người dùng: nếu một tính năng của ứng dụng gọi từ ứng dụng khác không thể thực hiện được thì nên kiểm tra xem custom url có bị đăng kí trước bởi ứng dụng nào hay không và cân nhắc gỡ bỏ.
### 2. Injection 
Là một loại lỗ hổng thường xuyên góp mặt trong top 10 các lỗ hổng bị khai thác nhiều nhất (mình sử dụng thống kê của OWASP), tấn công injection có thể thực hiện trên rất nhiều các attack vectors. Và custom url scheme cũng không là ngoại lệ. Lỗ hổng injection xảy ra khi mà các nhà phát triển không xử lý tốt các dữ liệu đầu vào. Mô hình chung của tấn công injection có thể hình dung đơn giản như sau.

![](https://images.viblo.asia/94cda01b-aa29-4182-9395-70f11d44f73e.png)

Để ngăn chặn các tấn công kiểu injection, những practices sau có thể cân nhắc được sử dụng:
- Xử lý tất cả các giá trị được gửi từ phía người dùng.
- Cấp quyền tối thiểu cho tài khoản người dùng, ứng dụng.
- Các thông tin hay chức năng nhạy cảm cần yêu cầu thêm một bước xác thực

### 3. Broken Access Control
Đây cũng là một lỗ hổng thường xuyên gặp trong ứng dụng nói chung và các ứng dụng iOS nói riêng. Tấn công loại này thường xảy ra do không kiểm tra uỷ quyền (authorization) của người dùng trong việc truy cập tới tài nguyên hay chức năng của ứng dụng. Có rất nhiều các kịch bản có thể dẫn tới lỗ hổng loại này. Hãy cùng xem xét tình huống đơn giản nhất nhé.

Đầu tiên, người dùng với **id=123** có quyền truy cập tới thông tin của mình thông qua custom url `Application://getInfo?id=` 

![](https://images.viblo.asia/62b684b3-2c87-46af-94d9-e8c95a4ec4a0.png)

Tuy nhiên, *Application* lại không có các kiểm tra giá trị được gửi từ phía người dùng. Thế nên, người dùng có thể thay giá trị *id* để truy cập tới thông tin của các người dùng khác.

![](https://images.viblo.asia/db41af93-0b3c-4e35-9700-ef2f2c98790a.png)

Các tấn công loại này ảnh hưởng nghiêm trọng tới tính bảo mật của thông tin (confidentiality) và đôi khi là tính toàn vẹn của dữ liệu (integrity). Do đó, cần có các giải pháp để ngăn chặn, giảm thiểu các tấn công này. Các practices có thể cân nhắc sử dụng có thể sử dụng như:
-  Cấp quyền tối thiểu cho tài khoản người dùng, ứng dụng
-  Xác thực uỷ quyền đối với các request gửi tới.
-  Các chức năng hay tài nguyên nhạy cảm cần có thêm bước xác thực.

## III. Ví dụ thực tế

### 1. LINE custom url takeover

Trước đây, LINE có sử dụng một deeplink cho tính năng nhắn tin là `line://` sử dụng cho tính năng nhắn tin của ứng dụng này. Tuy nhiên, deeplink này hiện đã không còn được sử dụng nữa. Nguyên nhân được LINE đưa ra có thể thấy ngay trên tài liệu của ứng dụng này:

> `line://` is deprecated because it allows a takeover attack of the URL scheme. A `line://` takeover attack is an attack in which a user clicks on a URL following `line://` and a non-LINE app may start regardless of the intention of the LINE user. This attack is only established under certain conditions.


Có thể tạm dịch là 

> custom url `line://` hiện đã không còn được sử dụng do nó cho phép các tấn công chiếm url scheme. Một tấn công chiếm url scheme `line://` là tấn công mà khi người dùng bấm vào đường dẫn  `line://` thì một ứng dụng không phải LINE sẽ được gọi tới dù người dùng muốn hay không. Tấn công này chỉ khả thi trong các điều kiện xác định

Có thể xem thêm về điều này tại tài liệu của line về custom url tại [đây](https://developers.line.biz/en/docs/line-login/using-line-url-scheme/).

### 2. Wechat hijacking

Đây là một bài mình xin tóm tắt lại của một nhóm nghiên cứu khác. Mọi người có thể xem bài viết đó tại [đây](https://blog.trendmicro.com/trendlabs-security-intelligence/ios-url-scheme-susceptible-to-hijacking/). Theo như bài viết, Wechat cho phép một ứng dụng khác tên *Suning* có thể xác thực thông qua custom url.

![](https://images.viblo.asia/efdac77c-8f5c-428a-95d3-36cd46eb6dcd.png)

Đầu tiên, ứng dụng Suning gửi một yêu cầu đăng nhập tới Wechat **(1)**. We chat sẽ gửi một request token lên Wechat server **(2)** và nhận về một login-token **(3)**. Token này sẽ được gửi lại cho Suning **(4)** để Suning thực hiện xác thực với Wechat server **(5)** **(6)**.

Tuy nhiên, trong quá trình gửi login-request **(1)**, Wechat không xác thực nguồn gửi của request này. Ngoài ra, Suning sử dụng cùng một scheme cho request này. Theo đó, kẻ tấn công có thể sử dụng URL scheme này để gửi login request tới Wechat để lấy login token rồi sử dụng token này để lấy được thông tin của người dùng.

![](https://images.viblo.asia/beedbade-a064-4d87-a615-44938beb221f.png)

Chi tiết hơn một chút, các url được sử dụng để giao tiếp giữa Suning và Wechat có:

![](https://images.viblo.asia/a249db54-387a-4511-aebf-f0e70694da3b.png)

theo đó, trong request được Suning gửi tới phía Wechat cùng với một giá trị phức tập là `wxe386966df7b712ca`. Giá trị này được đăng kí với Wechat như là Suning login. Tuy nhiên, Wechat không kiểm tra nguồn gửi của của request mà chỉ nhận và trả lại token dựa theo giá trị kia. Kết quả là một ứng dụng khác có thể sử dụng giá trị này để thực hiện đăng nhập Wechat để lấy token và đọc dữ liệu người dùng bên ứng dụng Suning.

## III. References

[https://blog.trendmicro.com/trendlabs-security-intelligence/ios-url-scheme-susceptible-to-hijacking/](https://blog.trendmicro.com/trendlabs-security-intelligence/ios-url-scheme-susceptible-to-hijacking/)

[https://developers.line.biz/en/docs/line-login/using-line-url-scheme/](https://developers.line.biz/en/docs/line-login/using-line-url-scheme/)