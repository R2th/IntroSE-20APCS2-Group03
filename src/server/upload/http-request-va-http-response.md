## HTTP Message
Như chúng ta đã biết, HTTP là giao thức được thiết kế theo kiểu client – server, giao tiếp giữa client và server dựa vào một cặp request – response, client đưa ra các request và server trả lời các request này.

## HTTP Request
Để bắt đầu trao đổi dữ liệu, phía client khởi tạo một HTTP session bằng cách mở một kết nối TCP đến HTTP server sau đó gửi request đến server này. Request có thể được tạo bằng nhiều cách, trực tiếp khi người dùng nhấp vào một liên kết trên trình duyệt hoặc gián tiếp, ví dụ như một video được đính kèm trong một website và việc request đến website này sẽ dẫn đến một request tới video ấy.

![](https://images.viblo.asia/35c26af0-90d7-40a7-b97d-35d4dac86837.png)
<br>*Ví dụ một HTTP Request*

Bắt đầu của HTTP Request sẽ là dòng Request-Line bao gồm 3 thông tin đó là:

* Method: là phương thức mà HTTP Request này sử dụng, thường là GET, POST, ngoài ra còn một số phương thức khác như HEAD, PUT, DELETE, OPTION, CONNECT. Trong ví dụ trên là GET
* URI: là địa chỉ định danh của tài nguyên. Trong tường hợp này URI là / - tức request cho tài nguyên gốc, nếu request không yêu cầu một tài nguyên cụ thể, URI có thể là dấu *.
* HTTP version: là phiên bản HTTP đang sử dụng, ở đây là HTTP 1.1.

Tiếp theo là các trường request-header, cho phép client gửi thêm các thông tin bổ sung về thông điệp HTTP request và về chính client. Một số trường thông dụng như:

* Accept: loại nội dung có thể nhận được từ thông điệp response. Ví dụ: text/plain, text/html…
* Accept-Encoding: các kiểu nén được chấp nhận. Ví dụ: gzip, deflate, xz, exi…
* Connection: tùy chọn điều khiển cho kết nối hiện thời. Ví dụ: keep-alive, Upgrade…
* Cookie: thông tin HTTP Cookie từ server.
* User-Agent: thông tin về user agent của người dùng.

## Phương thức GET và POST

Hai phương thức được sử dụng nhiều nhất trong HTTP request là GET và POST

Với GET, câu truy vấn sẽ được đính kèm vào đường dẫn của HTTP request. Ví dụ: /?username=”abc”&password=”def”

Một số đặc điểm của phương thức GET:

* GET request có thể được cached, bookmark và lưu trong lịch sử của trình duyệt.
* GET request bị giới hạn về chiều dài, do chiều dài của URL là có hạn.
* GET request không nên dùng với dữ liệu quan trọng, chỉ dùng để nhận dữ liệu.

Ngược lại, với POST thì câu truy vấn sẽ được gửi trong phần message body của HTTP request, một số đặc điểm của POST như:

* POST không thể, cached, bookmark hay lưu trong lịch sử trình duyệt.
* POST không bị giới hạn về độ dài.

Các phương thức khác

Ngoài GET và POST, HTTP request còn có thể có một số phương thức khác như:

* HEAD: giống như GET nhưng chỉ gửi về HTTP header.
* PUT: tải lên một mô tả về URI định trước.
* DELETE: xóa một tài nguyên định trước.
* OPTIONS: trả về phương thức HTTP mà server hỗ trợ.
* CONNECT: chuyển kết nối của HTTP request thành một kết nối HTTP tunnel.

## HTTP Response

Cấu trúc HTTP response gần giống với HTTP request, chỉ khác nhau là thay vì Request-Line, thì HTTP có response có Status-Line. Và giống như Request-Line, Status-Line cũng có ba phần như sau:
* HTTP-version: phiên bản HTTP cao nhất mà server hỗ trợ.
* Status-Code: mã kết quả trả về.
* Reason-Phrase: mô tả về Status-Code.

![](https://images.viblo.asia/d4d042c6-1606-44c8-a7cc-0130d38f281e.png)
<br>*Ví dụ một HTTP Response*

## HTTP Status Codes

Một số loại Status-Code thông dụng mà server trả về cho client như sau:

1xx: information Message: các status code này chỉ có tính chất tạm thời, client có thể không quan tâm.

2xx Successful: khi đã xử lý thành công request của client, server trả về status dạng này:
* 200 OK: request thành công.
* 202 Accepted: request đã được nhận, nhưng không có kết quả nào trả về, thông báo cho client tiếp tục chờ đợi.
* 204 No Content: request đã được xử lý nhưng không có thành phần nào được trả về.
* 205 Reset: giống như 204 nhưng mã này còn yêu câu client reset lại document view.
* 206 Partial Content: server chỉ gửi về một phần dữ liệu, phụ thuộc vào giá trị range header của client đã gửi.

3xx Redirection: server thông báo cho client phải thực hiện thêm thao tác để hoàn tất request:
* 301 Moved Permanently: tài nguyên đã được chuyển hoàn toàn tới địa chỉ Location trong HTTP response.
* 303 See other: tài nguyên đã được chuyển tạm thời tới địa chỉ Location trong HTTP response.
* 304 Not Modified: tài nguyên không thay đổi từ lần cuối client request, nên client có thể sử dụng đã lưu trong cache.

4xx Client error: lỗi của client:
* 400 Bad Request: request không đúng dạng, cú pháp.
* 401 Unauthorized: client chưa xác thực.
* 403 Forbidden: client không có quyền truy cập.
* 404 Not Found: không tìm thấy tài nguyên.
* 405 Method Not Allowed: phương thức không được server hỗ trợ.

5xx Server Error: lỗi của server:
* 500 Internal Server Error: có lỗi trong quá trình xử lý của server.
* 501 Not Implemented: server không hỗ trợ chức năng client yêu cầu.
* 503: Service Unavailable: Server bị quá tải, hoặc bị lỗi xử lý.

### Tài liệu tham khảo
https://www.stdio.vn/articles/http-request-va-http-response-202