- Bài viết được dịch từ bài [HTTP and everything you need to know about it](https://medium.com/faun/http-and-everything-you-need-to-know-about-it-8273bc224491) của tác giả [faun](https://medium.com/faun).
-----

![](https://miro.medium.com/max/6016/1*6aNxPVn2fqCP_033WzUwXA.jpeg)

-----
HTTP là viết tắt của Hypertext Transfer Protocol và HTTP là giao thức giao tiếp được sử dụng để duyệt web. Giao thức này sử dụng dựa trên mô hình mà trong đó máy khách của bạn thực hiện request HTTP đến máy chủ web và máy chủ đó phản hồi với tài nguyên được hiển thị trong trình duyệt.

> Mỗi tương tác HTTP bao gồm một request và phản hồi. Theo bản chất của nó, HTTP là stateless.

**stateless** có nghĩa là tất cả các request đều tách biệt với nhau vì vậy mọi request phải tự chứa đủ thông tin để thực hiện request. Điều đó có nghĩa là mỗi transaction của thông điệp dựa trên mô hình của HTTP được xử lý riêng biệt với nhau.

### URL
**URL** (Uniform Resource Locator) có lẽ là khái niệm được biết đến nhiều nhất của Web. Nó cũng là một trong những khái niệm quan trọng và hữu ích nhất. URL là một địa chỉ web được sử dụng để xác định tài nguyên trên Web. (Nghĩa là mỗi một url được gửi đến web server tại 1 thời điểm sẽ chỉ nhận về duy nhất 1 tài nguyên xác định. Gần giống với pure function trong javascript.)

> Ý tưởng về web được cấu trúc xung quanh các tài nguyên, từ khi bắt đầu, Web là nền tảng để chia sẻ text / HTML, tài liệu, hình ảnh, v.v. và như vậy nó có thể được coi là một *collection of resources*.

![](https://miro.medium.com/max/1000/0*DTR8JpFZo31ht-Kd)
Các giao thức đáng chú ý khác là:
* File Transfer Protocol (FTP) - là giao thức chuẩn được sử dụng để truyền tệp giữa máy khách và máy chủ qua mạng.
* Simple Mail Transfer Protocol (SMTP)  là một tiêu chuẩn để truyền email.

**Domain** — Tên được sử dụng để xác định **một hoặc nhiều** địa chỉ IP nơi tài nguyên được đặt.

**Path** Chỉ định vị trí tài nguyên trên máy chủ. Nó sử dụng logic tương tự như vị trí tài nguyên được sử dụng trên thiết bị bạn đang đọc bài viết này (tức là /p/nhung-dieu-can-biet-ve-http-gDVK2mvA5Lj hoặc C: / my Cars / VWBeetle.pdf).

**Parameters**  - Dữ liệu bổ sung được sử dụng để xác định hoặc lọc tài nguyên trên máy chủ.
> **Chú ý**
When searching for articles and more information about HTTP you may encounter the term URI (or uniform resource identifier). URI is sometimes being used instead of URL but mostly in formal specifications and by people who want to show off :)
Khi tìm kiếm các bài viết và biết thêm thông tin về HTTP, bạn có thể gặp cụm từ URI (uniform resource identifier - mã định danh tài nguyên thống nhất). URI đôi khi được sử dụng thay vì URL nhưng chủ yếu là trong các thông số kỹ thuật chính thức và bởi những người muốn thể hiện, khoe khoang :)

-----
### HTTP Requests
Trong HTTP, mọi request phải có địa chỉ URL. Ngoài ra, request cần một phương thức. Bốn phương thức HTTP chính là:
* GET
* PUT
* POST
* DELETE

Tôi sẽ giải thích các phương thức này và hơn thế nữa, trong phần Phương thức HTTP của bài viết này.

Và các phương thức này tương ứng trực tiếp với các hành động bên trên:
* read
* update
* create
* delete

Tất cả các thông điệp HTTP có một hoặc nhiều `header`, theo sau là `body` tùy chọn. Phần body chứa dữ liệu sẽ được gửi cùng với `request` hoặc dữ liệu nhận được cùng với `response`.

Phần đầu tiên của mỗi request HTTP chứa ba mục:

Thí dụ:
> * GET /adds/search-result?item=vw+beetle HTTP/1.1
>
Khi một URL chứa một dấu ? Khác có nghĩa là nó chứa một truy vấn. Điều đó có nghĩa là nó sẽ gửi các tham số của tài nguyên được request.

1. Phần đầu tiên là một phương thức cho biết phương thức HTTP nào được sử dụng. Được sử dụng phổ biến nhất là phương thức GET. Phương thức GET lấy một tài nguyên từ máy chủ web và vì GET không có phần thân thông điệp sau header  là cần thiết.
2. Phần thứ hai là một URL được request.
3. Phần thứ ba là một phiên bản HTTP đang được sử dụng. Phiên bản 1.1. là phiên bản phổ biến nhất cho hầu hết các trình duyệt, tuy nhiên, phiên bản 2.0 đang chiếm lĩnh.


-----


Ngoài ra còn có một số điều thú vị khác trong request HTTP:

**Referer header** - cho biết URL mà từ đórequest bắt nguồn.

**User-Agent header** - thông tin bổ sung về trình duyệt đang được sử dụng để tạo request.

**Host header**- xác định duy nhất một tên máy chủ, cần thiết khi nhiều trang web được lưu trữ trên cùng một máy chủ.

**Cookie header** - gửi tham số bổ sung cho client.


-----


### HTTP Responses
Giống như trong các request HTTP, các phản hồi HTTP cũng bao gồm ba mục:
Thí dụ:
HTTP/1.1 200 OK
1. Phần đầu tiên là phiên bản HTTP đang được sử dụng.
2. Phần thứ hai là code http status của kết quả cho request.
3. Phần thứ ba là một mô tả văn bản của phần thứ hai.


-----


Có một số điều thú vị khác trong HTTP response:
**Server header** — thông tin mà phần mềm máy chủ web đang được sử dụng.\

**Set-Cookie header** — phát cookie cho trình duyệt.

**Message body** — Thông thường, một  HTTP response có thể chứa nội dung.

**Content-Length header** — cho biết kích thước của body theo bytes.

### HTTP Methods
Các phương thức phổ biến nhất là GET và POST, tuy nhiên còn có nhiều phương thức hơn nữa.

GET - được sử dụng để request dữ liệu từ một tài nguyên được chỉ định trong đó dữ liệu không được sửa đổi theo bất kỳ cách nào vì các request GET không thay đổi trạng thái của tài nguyên.

POST - được sử dụng để gửi dữ liệu đến máy chủ để tạo tài nguyên.

PUT - phương pháp để cập nhật tài nguyên hiện có trên máy chủ bằng cách sử dụng nội dung trong phần thân của request.

HEAD - phương thức này có chức năng tương tự như phương thức GET nhưng với một điểm khác biệt là sự trở lại của phương thức HEAD không được chứa phần thân trong résponse. Tuy nhiên, phần trả về sẽ chứa các tiêu đề giống như khi GET được sử dụng. Phương thức HEAD được sử dụng để kiểm tra xem tài nguyên có mặt trước khi thực hiện request GET không.

TRACE - phương pháp được thiết kế cho mục đích chẩn đoán. Response sẽ chứa trong body chính xác của request message.

OPTION - phương pháp này được sử dụng để mô tả các tùy chọn giao tiếp (phương thức HTTP) có sẵn cho tài nguyên đích.

PATCH - Phương thức PATCH được sử dụng để áp dụng sửa đổi một phần cho tài nguyên.

DELETE - Phương thức XÓA xóa tài nguyên đã chỉ định.

### REST
Representational state transfer (REST) là một kiểu kiến trúc trong đó request và response chứa representation cho trạng thái hiện tại của tài nguyên hệ thống.

Cách thông thường:
* http://carapp.com/search?make=wv&model=beetle

REST-style:
* http://carapp.com/search/vw/beetle

Cần nhiều hơn để biết về API REST vì vậy xin vui lòng tìm hiểu kỹ hơn.

### HTTP Headers
Có ba thành phần chính tạo nên cấu trúc request / response. bao gôm:

* First line
* Headers
* Body/Content

Chúng ta đã nói về First line trong các request + response HTTP, chức năng body đã được đề cập và bây giờ chúng ta sẽ nói về các HTTP headers.

Các HTTP headers được thêm vào sau dòng đầu tiên và được định nghĩa là các cặp `name: value` được phân tách bằng dấu hai chấm. Các HTTP headers được sử dụng để gửi các tham số bổ sung cùng với request hoặc response.

Như chúng ta đã nói, phần body của tin nhắn bao gồm dữ liệu được gửi cùng với request hoặc dữ liệu nhận được cùng với response.

Có nhiều loại headers  khác nhau và chúng ta nhóm dựa trên việc sử dụng chúng thành 4 loại chính:
**General header** - Các tiêu đề có thể được sử dụng trong cả request và response message và độc lập với dữ liệu được trao đổi.
**Request header**- Các tiêu đề này xác định các tham số cho dữ liệu được request hoặc các tham số cung cấp thông tin quan trọng về ứng dụng client thực hiện request.
**Response header**  - Những tiêu đề này chứa thông tin về response.
**Entity header** - Các Entity header mô tả nội dung tạo nên phần body của thông điệp.
![](https://miro.medium.com/max/837/0*0BI1BEJpajUiJ_4R)

### HTTP status codes

Mỗi HTTP response mesage phải chứa HTTP status code trong dòng đầu tiên, cho chúng ta biết kết quả của request.

Có năm nhóm status code được nhóm theo chữ số đầu tiên:
* 1xx — thông tin.
* 2xx — request đã thành công.
* 3xx — máy client được chuyển hướng redirected tời một tài nguyên(resource) khác.
* 4xx — request bao gồm một lỗi của một số loại.
* 5xx — Máy chủ gặp lỗi khi thực hiện yêu cầu

> Danh sách đầy đủ các HTTP status code và giải thích:
> [https://developer.mozilla.org/en-US/docs/Web/HTTP/Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

### HTTPS (Hypertext Transfer Protocol Secure)
bỏa mật phiên bản của giao thức HTTP là HyperText Transfer Protocol Secure (HTTPS)
HTTPS cung cấp sư liên lạc được mã hóa giữa trình duyệt (client) và website (server).

Trong HTTPS, giao thức liên lạc được mã hóa bằng Bảo mật lớp vận chuyển (Transport Layer Security (TLS) ) hoặc Lớp cổng bảo mật ( Secure Sockets Layer (SSL)).

Do đó, giao thức cũng thường được gọi là HTTP qua TLS hoặc HTTP qua SSL.

cả giao thức TLS và SSL đều sử dụng hệ thống mã hóa bất đối xứng. Hệ thống mã hóa bất đối xứng sử dụng khóa chung (khóa mã hóa) và khóa riêng (khóa giải mã) để mã hóa tin nhắn. Bất cứ ai cũng có thể sử dụng khóa chung để mã hóa tin nhắn. Tuy nhiên, khóa riêng là bí mật và điều đó có nghĩa là chỉ người nhận dự định mới có thể giải mã tin nhắn.
![](https://miro.medium.com/max/450/0*pB_y5GVIF_O_z4lw.gif)

### SSL/TLS handshake

Khi bạn yêu cầu kết nối HTTPS đến một trang web, trang web sẽ gửi chứng chỉ SSL của nó tới trình duyệt của bạn. Đó là nơi mà trình duyệt và trang web của bạn bắt đầu giao tiếp được gọi là SSL/TLS handshake. SSL/TLS handshake bao gồm một loạt các bước trong đó trình duyệt và trang web xác thực lẫn nhau và bắt đầu liên lạc qua SSL / TLS tunnel.
Như bạn có thể nhận thấy, khi một SSL / TLS tunnel an toàn đáng tin cậy được sử dụng trong khi kết nối HTTPS, 1 padlock icon màu xanh lá cây được hiển thị trên thanh địa chỉ của trình duyệt.

![](https://miro.medium.com/max/254/0*g7q-rF8JTGp7fs19)

### Lợi ích của HTTPS
Những lợi ích chính của HTTPS là:
* Thông tin khách hàng, như số thẻ tín dụng và thông tin nhạy cảm khác, được mã hóa và không thể bị chặn.
* Khách truy cập có thể xác minh bạn là doanh nghiệp đã đăng ký và bạn sở hữu tên miền.
* Khách hàng biết rằng họ không được phép truy cập các trang web mà không có HTTPS, và do đó, họ có nhiều khả năng tin tưởng và hoàn thành giao dịch mua từ các trang web sử dụng HTTPS.

----