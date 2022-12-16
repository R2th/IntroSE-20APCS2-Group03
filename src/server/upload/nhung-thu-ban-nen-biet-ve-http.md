Trong bài này, mình sẽ lướt qua về cách mà www (world wide web) hoạt động ở mức cơ bản.

Công nghệ cốt lõi là HTTP - Hypertext Transfer Protocol. Nó là phương thức giao tiếp bạn sử dụng khi bạn lướt web.

Ở mức cơ bản thì khi bạn ghé thăm một trang web, trình duyệt tạo ra một HTTP request tới máy chủ web. Sau đó máy chủ web sẽ trả về một tài nguyên (resource) như là ảnh, video hay đoạn text nào đó, cái mà sau đó sẽ được hiển thị ra cho bạn.

Đây là mô hình dựa trên thông điệp của HTTP. Mỗi tương tác HTTP bao gồm một request và một response (yêu cầu lên server và phản hồi từ server về client).

Theo như bản chất thì HTTP là phương thức không trạng thái (stateless) - tức là tất cả các request hoàn toàn tách biệt với nhau. Nên mỗi request từ trình duyệt của bạn phải bao gồm đủ thông tin của chính nó để giúp server xử lý đúng theo yêu cầu từ client.
Điều đó còn có nghĩa là mỗi giao dịch của mô hình dựa trên thông điệp của HTTP được xử lý riêng biệt với các giao dịch khác.

### URLs
URL (Uniform Réource Locator) có thế là khái niệm được biết đến nhiều nhất trong thế giới Web. Nó còn là một trong những khái niệm quan trọng và hữu ích nhất, một URL là một địa chỉ web thường được sử dụng để định danh các tài nguyên trên trang Web.

Ý tưởng của một trang web được cấu trúc xoay quanh các tài nguyên (images, videos, text...). Từ thủa sơ khai, công nghệ Web là một nền tảng giúp chia sẻ text/HTML files, images ...và như vậy có thể coi nó là một bộ sưu tập các tài nguyên.

![](https://images.viblo.asia/0789dbdc-d8c0-481e-ae88-36541236661d.jpg)

- Protocol: Thường là phương thức HTTP (hoặc HTTPs - phương thức bảo mật nâng cấp của HTTP). Các phương thức đáng chú ý khác: FTP (File Transfer Protocal), SMTP (Simple Mail Transfer Protocol) ...
- Domain: Tên dùng để định danh một hoặc nhiều địa chỉ IP, nơi mà tài nguyên đang được lưu trữ.
- Path: Chỉ định vị trí tài nguyên trên máy chủ. Nó sử dụng chung logic như vị trí tài nguyên được sử dụng trên thiết bị (máy chủ server)
- Parameters: Các dữ liệu thêm được sử dụng để xác định hoặc sàng lọc tài nguyên trên server.

Lưu ý: Khi tìm kiếm các bài viết và thêm thông tin về HTTP, bạn có thế gặp thuật ngữ URI (Uniform Resource Identifier). URI thỉnh thoảng được sử dụng thay vì URL nhưng chủ yếu là trong các trường hợp mang tính chất kỹ thuật đặc trưng bởi những người thích thể hiện (quan điểm của tác giả)

### HTTP Requests
Trong HTTP, mỗi yêu cầu (request) phải có một địa chỉ URL. Thêm nữa, ***request***  cần một phương thức. 4 phương thức chính thường được sử dụng là:
- GET
- PUT
- POST
- DELETE

Mình sẽ giải thích các phương thức này trong phần sau. Những phương thức trên tương ứng với các thao tác sau:
- read
- update
- create
- delete

Tất cả các thông điệp HTTP có một hoặc nhiều headers, theo nữa là một nội dung tin nhắn tùy chọn. Body chứa nội dung trong request gửi đi hoặc dữ liệu trả về trong response trả về.

Phần đầu tiên của mỗi HTTP request chứa 3 items:

Ví dụ:
    - GET/adds/search-result?item=vw+beetle HTTP/1.1

Khi một URL chứa một ký tự "?", nghĩa là nó chứa một câu truy vấn. Điều đó nghĩa là nó gửi các tham số cho việc yêu cầu tài nguyên cần thiết.

1. Phần đầu tiên là một phương thức, giúp phân biệt phương thức HTTP nào được sử dụng. Phương thức hay được dùng nhất là GET. GET lấy thông tin của một resource từ web server và GET không có message body.
2. Phần thứ 2 là một requested URL (cái đã giải thích trong phần trên)
3. Phần thứ 3 là một phiên bản HTTP được sử dụng. Phiên bản 1.1 là phiên bản phổ biến nhất cho các trình duyệt, tuy nhiên 2.0 đang trở nên dần phổ biến.

Còn một vài thứ thú vị khác trong một HTTP request:

**Referer header** - cho biết URL nguồn từ đâu

**User-Agent header** - thông tin thêm về trình duyệt được sử dụng để tạo ra request

**Host header** - xác định duy nhất của tên host, nó rất cần thiết khi nhiều trang web được host trên cùng một server.

**Cookie header** - submit thêm các tham số từ cookie tới server.

### HTTP Responses

Giống như HTTP requests, HTTP responses chứa 3 thông số:

Ví dụ: 

HTTP/1.1 200 OK

1. Phần đầu tiên là phiên bản HTTP được sử dụng
2. phần thứ 2 là mã code thể hiện trạng thái của request
3. Phần thứ 3 là diễn giải bằng text của mã code phần 2

Có một vài thứ thú vị trong một HTTP response:

**Server header** - thông tin về ngôn ngữ (framework) web server đang sử dụng

**Set-Cookie header** - lưu các tham số vào cookie của trình duyệt

**Message body** - chuẩn chung của một HTTP response là message body

**Content-Length header** - cho biết dung lượng của message body.

### HTTP Methods
Các phương thức phổ biến nhất là GET và POST.

**GET** - Sử dụng khi yêu cầu data từ một nguồn xác định, nơi mà data không bị thay đổi bằng bất kì cách nào. GET request không thay đổi trạng thái của tài nguyên.
- **POST** - sử dụng khi gửi data tới server để tạo ra tài nguyên mới.
- **PUT** - sử dụng để thay đổi thông tin của một tài nguyên đã tồn tại trong hệ thống bằng cách sử dụng nội dung trong body của request
- **HEAD** - sử dụng giống phương thức GET ở trên, khác ở chỗ kết quả trả về của HEAD không chứa body nhưng sẽ chứa các header giống như nếu sử dụng GET. Bạn sử dụng HEAD để check xem resource cần lấy có tồn tại hay không.
- **TRACE** - sử dụng cho mục đích chuẩn đoán. Response sẽ chứa nội dung của request message trong body trả về.
- **OPTIONS** - Sử dụng để miêu tả các tùy chọn giao tiếp (HTTPs method) mà có thể dùng cho resource mục tiêu.
- **PATCH** -  Sử dụng để áp dụng sửa đổi 1 phần cho resource
- **DELETE** - sử dụng để xóa một resource chỉ định

### REST
Representational State Transfer (REST) là một phong cách kiến trúc, nơi mà requests và responses chứa các tiêu biểu của trạng thái hiện tại của tài nguyên hệ thống. Vì khái niệm khá rộng và không nằm trong phạm vi bài viết nên chi tiết các bạn tham khảo tại:
- [http://carapp.com/search?make=wv&model=beetle](http://carapp.com/search?make=wv&model=beetle)
- https://www.freecodecamp.org/news/how-the-web-works-part-iii-http-rest-e61bc50fa0a/

### HTTP Headers
Có 3 thành phần chính tạo nên cấu trúc request/response:
- First line
- Headers
- Body/Content

Chúng ta đã nói về "first line" và "body" trong các phần trên.

HTTP headers được thêm vào sau "first line" và được khai báo theo kiểu các cặp: *name-value*, phân tách bởi dấu chấm phẩy. HTTP headers được sử dụng để gửi thêm các tham số trong các request/response.

Như mình đã nói, body của message chứa các dữ liệu được gửi với request hoặc data được nhận với response.

Có các loại headers khác nhau và chúng được nhóm thành 4 loại lớn dựa trên cách sử dụng chúng:

- **General header** - các Headers có thể được sử dụng trong cả request hoặc response và chúng độc lập với data được trao đổi.
- **Request header** - các Headers định nghĩa các tham số dùng cho việc data requested hoặc đưa ra các thông tin quan trọng trong việc giúp client tạo request.
- **Response header** - Các tham số chứa thông tin về các response trả về.
- **Entity header** - Chứa thông tin về body message.

![Các loại headers](https://images.viblo.asia/0e7ced5b-90a9-40aa-aee9-37a082726554.jpg)

### HTTP status codes và HTTPS
Các phần trên khá dài và rộng nên mình sẽ đề cập ở bài viết khác, chúc các bạn thành công! :)

Link tham khảo: https://www.freecodecamp.org/news/http-and-everything-you-need-to-know-about-it/