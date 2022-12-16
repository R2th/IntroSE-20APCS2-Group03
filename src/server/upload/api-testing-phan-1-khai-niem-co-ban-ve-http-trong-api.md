# 1. API Testing là gì?
API Testing khác với Test hoặc bắt bugs thông thường ở chỗ bạn sẽ không sử dụng trình duyệt web hoặc thiết bị di động để kiểm tra, nhưng bạn sẽ phải sử dụng các ứng dụng client chuyên dụng như Postman, nơi tất cả các yêu cầu đến máy chủ của khách hàng sẽ được gửi trực tiếp bởi bạn, và không phải từ một trang web.
API là từ viết tắt của Application Programming Interface - Giao diện lập trình ứng dụng, mô tả một tập hợp các hướng dẫn rõ ràng được tạo ra để hai ứng dụng giao tiếp với nhau.
# 2. Khái niệm cơ bản về HTTP trong API
Hypertext Transfer Protocol (HTTP) - Giao thức truyền siêu văn bản là nền tảng của giao tiếp dữ liệu cho World Wide Web. Do đó, nó là giao thức ứng dụng phổ biến nhất được sử dụng trên Internet.
HTTP hoạt động như một giao thức stateless, request-response không đối xứng. Máy khách HTTP gửi thông điệp *yêu cầu (request)* HTTP đến máy chủ. Máy chủ trả về một thông điệp *phản hồi (response)* cho khách hàng:

![](https://images.viblo.asia/4344287b-bbd8-4659-8fb9-6a4a9da671fa.jpg)

HTTP resources được xác định duy nhất bởi các URL (Uniform Resource Locators - Bộ định vị tài nguyên đồng nhất) dưới dạng *http* và *https* URI (Uniform Resource Identifiers - Mã định danh tài nguyên đồng nhất).

URL có cú pháp sau:

protocol://hostname:port/path-and-resource-name

**Protocol:** Giao thức ứng dụng. Thông thường https hoặc http trong API Web.

**Hostname:** Tên miền (domain name) để xác định máy tính chủ (máy chủ web).

**Port:** Số cổng TCP mà máy chủ đang lắng nghe yêu cầu của máy khách. Nếu bị bỏ qua, mặc định nó sẽ là 443 cho các yêu cầu https và 80 cho các yêu cầu http.

**Path and resource name:** bao gồm một chuỗi các phân đoạn đường dẫn được phân tách bằng dấu gạch chéo (/) và tên tài nguyên được yêu cầu, và có thể bao gồm phần mở rộng tệp

Ví dụ: https://www.utest.com/academy/tracks/1

Trong đó https là giao thức, www.utest.com là miền và /academy/track/1 là đường dẫn và tên tài nguyên.
Vì cổng không được nêu rõ ràng, nên trong trường hợp này, máy khách (tức là trình duyệt web) đặt nó mặc định thành 443.

Các thông điệp HTTP-Request và HTTP-Response có chung cấu trúc cơ bản:

![](https://images.viblo.asia/a70c2dd0-d5e3-4b01-bd34-6b3494e547ef.png)

Ví dụ về HTTP-Request

![](https://images.viblo.asia/031c17b5-62b1-48cc-afd8-e66495f2a21c.png)

Dòng yêu cầu quy định phương thức HTTP, resource ("/") và phiên bản HTTP (1.1).

Trong ví dụ trên, phương thức "GET" được sử dụng để yêu cầu lấy một tài nguyên cụ thể. Các phương thức HTTP phổ biến khác là:

**POST** - Đăng nội dung lên máy chủ.

**HEAD** - Chỉ yêu cầu các http headers, bỏ qua phần thân của thông điệp phản hồi. Điều này có thể được sử dụng để lấy các tùy chọn cấu hình nhất định.

**OPTIONS** - Yêu cầu mô tả các tùy chọn giao tiếp cho tài nguyên đích, máy chủ sẽ phản hồi với danh sách các phương thức HTTP được hỗ trợ.

**PUT** - Một phương thức khác để gửi nội dung đến máy chủ. POST được sử dụng phổ biến hơn trên các trang web, trong khi PUT phổ biến hơn trong API.

**DELETE** - Hướng dẫn máy chủ web xóa một tài nguyên hoặc nội dung cụ thể.

## Request Headers

Các trường HTTP header là một phần trong phần tiêu đề của thông điệp yêu cầu và phản hồi. Chúng có thể xác định rất nhiều thông số vận hành của giao dịch HTTP:

**Host:** www.utest.com - Tên miền của máy chủ.

**User-Agent:** Mozilla/5.0 - Chuỗi tác nhân người dùng của trình duyệt.

**Accept**: text/html, */* - Một phần của quá trình đàm phán nội dung; Các loại phương tiện media được chấp nhận cho các phản hồi.

**Accept-Language:** en-US, en - Danh sách các ngôn ngữ của con người được chấp nhận cho các phản hồi (đàm phán nội dung).

**Connection:** close - Tùy chọn điều khiển cho kết nối hiện tại.

Ví dụ về HTTP-Response:

![](https://images.viblo.asia/ef5c6320-3ade-4c0a-b6a5-2a643006283d.png)

Dòng trạng thái cho biết các yêu cầu đã thành công, phiên bản HTTP, và mã trạng thái http:

**200 OK** - Yêu cầu đã thành công.

**302 Found** - Hướng dẫn người dùng xem (duyệt đến) một URL khác.

**400 Bad Request** -  Máy chủ không thể hoặc sẽ không xử lý yêu cầu do lỗi máy khách (ví dụ: lỗi cú pháp, kích thước, định dạng thông báo).

**501 Not Implemented** - Máy chủ không thể thực hiện đầy đủ các yêu cầu hoặc không nhận ra phương thức yêu cầu.

Mã trạng thái HTTP response được phần tách thành năm loại, trong đó các chữ số đầu tiên của mã trạng thái xác định lớp của phản hồi:

* 1xx (Informational)
* 2xx (Successful)
* 3xx (Redirection)
* 4xx (Client Error)
* 5xx (Server Error)

## Response Headers

Các trường Response Header (cũng trong các Request Header) là các cặp "key-value" được phân tách bằng dấu hai chấm. Ví dụ “Connection: close” thì "Connection" là key và "close" là value. Một số ví dụ từ phản hồi trên:

**Date:** Fri, 06 Sep 2019 06:42:56 GMT - HTTP-date xác định ngày và thời gian khi thông điệp được gửi (Thời gian của máy chủ trực tuyến!).

**Content-Type:** text/html; charset=UTF-8 - Loại MIME của nội dung trong phần thân thông điệp phản hồi.

**Connection:** close - Tùy chọn điều khiển cho kết nối hiện tại. "close", có nghĩa là kết nối sẽ bị đóng sau khi hoàn thành phản hồi. Tùy chọn duy nhất khác có thể sử dụng là "keep-alive", cho biết có thể có các thông điệp khác theo sau, và do đó khách hàng nên duy trì kết nối liên tục.

**Cache-Control:** no-cache - Điều này cho biết tất cả các cơ chế bộ nhớ đệm từ máy chủ đến máy khách đều có thể lưu trữ thông điệp này. Một giá trị khả dĩ khác sẽ là: “Cache-Control: max-age=x”, được tính bằng giây. Chỉ ra rằng đối tượng có thể không được lưu trữ lâu hơn x giây.

**Expires:** Thu, 01 Jan 1970 00:00:01 GMT - Sau ngày này, phản hồi được coi là hết hạn

**Content-Length:** 3761 - Độ dài phần thân của phản hồi được tính bằng byte.

Có hàng tá các Request và Response Header có thể khác. Nhiều trong số chúng đã tự rõ ràng, những header khác phải được tìm hiểu sâu hơn.

## Query strings

Có rất nhiều lựa chọn để truyền dữ liệu đến máy chủ web trong các yêu cầu HTTP. Trong các trang web, các cách phổ biến nhất là thông qua các chuỗi truy vấn, JSON trong các yêu cầu nền - backround request (không tải lại trang) và nhiều yêu cầu POST. Trong API, dữ liệu thường sẽ được truyền qua XML hoặc JSON thay vì biểu mẫu (forms). Những phương pháp đó sẽ được thảo luận sau. Trước tiên, hãy nhìn vào cách truyền dữ liệu biểu mẫu (form-data) truyền thống với các chuỗi truy vấn:

![](https://images.viblo.asia/6e4aa5e7-39b1-482f-aefa-625872e51aa3.png)

Ảnh chụp ở trên hiển thị dạng html đơn giản với hai trường nhập và nút gửi. Phương thức của người dùng được định nghĩa là "GET", cũng là giá trị mặc định nếu thuộc tính bị bỏ qua.
Sau khi gửi, đầu vào sẽ được gửi đến vị trí được chỉ định là **"/test/demo_form.php"** của máy chủ hiện tại (nơi đặt biểu mẫu):

https://www.example.com/test/demo_form.php?name1=value&amp;name2=value2

Như bạn có thể thấy, nội dung biểu mẫu được truyền trong URL của yêu cầu GET dưới dạng chuỗi truy vấn. Bao gồm một chuỗi các cặp name/value được thêm vào trang đích sau một dấu ?. Các cặp name/value riêng lẻ (name1 = value1 và name2 = value2) được phân tách bằng ký hiệu &. Trang đích được xác định trong tham số “action” của biểu mẫu. Yêu cầu tương tự khi phương thức được thay đổi thành POST sẽ như thế này:

![](https://images.viblo.asia/bcd5a3b6-5ee7-4794-846f-a25d1da06803.png)

Cặp name/value tương tự, **name1=value1&name2=value2**, hiện truyền trong nội dung thông điệp ở dưới cùng của yêu cầu, bên dưới dòng trống tách nó ra khỏi tiêu đề thông điệp.

![](https://images.viblo.asia/43181426-e310-4973-a0c7-233faa0878ac.png)

"content-type" header được đóng khung ở trên đang báo cho máy chủ biết rằng dữ liệu được mã hóa url. Điều đó có nghĩa là tất cả các ký tự không phải ASCII sẽ được chuyển đổi. Ví dụ: một ký tự space chuyển thành +, một "@" chuyển thành "% 40", v.v. Biểu mẫu tương tự được truyền dưới dạng **multipart/form-data**, bằng cách xác định thuộc tính "enctype", sẽ trông như thế này:

![](https://images.viblo.asia/3c555417-6152-4bb8-873d-bdc1b14815d7.png)

Các giá trị hiện được phân tách bằng “boundary”, sẽ được trình duyệt tự động thiết lập. Mỗi giá trị có một hoặc nhiều thuộc tính bổ sung. Phương pháp này thường được sử dụng cho các hình thức tải tập tin lên trong các trang web. Lưu ý thuộc tính “enctype” cần được thêm vào trong mã nguồn của biểu mẫu:

![](https://images.viblo.asia/5a012ab9-60f3-4bdb-8967-22b5e4b9a85d.png)


--Còn tiếp --

**Nguồn tham khảo:**

Dịch từ: https://www.utest.com/academy/tracks/28/courses/http-basics