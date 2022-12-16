_Điều gì xảy ra khi ta truy cập một trang web bằng cách sử dụng trình duyệt (Chrome, Firefox, ...) ?
Và sau đó là sẽ nhận được phản hồi nhanh chóng khi tìm kiếm một thứ gì đó trên [google.com](google.com) hoặc đơn giản
chỉ là truy cập
vào một website đơn thuần. Một không gian rộng lớn đằng sau những thao tác đó là những phân đoạn xử lý lần lượt, những
kết nối được tạo giữa con người và internet rộng lớn, những không mấy ai trong chúng ta biết rõ về việc "nó" đã hoạt
động và làm những gì ? Một uẩn khúc cũng rất đáng được nói đến ở đây. Bài viết này sẽ mô tả về việc "nó" đã hoạt
động như thế nào._

**_HTTP (Hypertext Transfer Protocol) - "The Big Picture in Web world"_**

"The Big Picture in Web world" - Một bức tranh lớn trong thế giới của web? Tại sao lại được gọi là một "big picture"
trong một thế giới web rộng lớn? Bởi vì trong mô hình web hiện đại ngày nay thì giao thức truyền tải cơ bản giữa
client và server nói chung đều sử dụng HTTP bao gồm việc gửi đi những gói tin (HTTP request) hoặc việc nhận những phản
hồi của máy chủ (HTTP response)

Thực tế, khi ta truy cập một website và tương tác với các thành phần của
website thì bản chất của việc tương tác này là browser (trình duyệt) giúp gửi những HTTP Request, khi đó browser chúng
ta đang sử dụng đóng vai trò là HTTP Client.

![](https://images.viblo.asia/b3b9e86b-b69b-40ad-82dc-e53422a8a786.png)


Về phía server, khi tiếp nhận và xử lý HTTP request từ client sẽ thực hiện gửi lại thông tin phản hồi (HTTP Response) về
phía browser, Từ đây browser sẽ tiến hành xử lý cú pháp của phản hồi.

HTTP Client ở đây không nhất thiết phải là browser. HTTP Client có thể là bất kì tools nào có thể gửi HTTP Request
và nhận HTTP Response thì được gọi là một HTTP Client.

**_Định nghĩa HTTP Client:_**

_HTTP Client có thể là bất kì tools nào có thể gửi HTTP Request và nhận HTTP Response thì được gọi là một HTTP Client._

Vậy chúng ta đã có định nghĩa về HTTP Client là gì. Tiếp đến, hãy xem xét cách một request được gửi đi.

# HTTP request flow

![](https://images.viblo.asia/bdf6bde2-253c-47d2-bd12-71a2b70323d3.png)

Hình trên mô tả về cách mà một HTTP Request được gửi đi, được tính từ lúc người dùng nhập URL vào thanh địa chỉ của
trình duyệt. Giờ hãy "zoom in" vào các step trên để xem rõ chúng thực sự được xử lý như thế nào.

### Analyze URL

-----------------------------------------------------------------------------------

Ngay khi nhập text vào thanh address bar của trình duyệt. Đối với những trình duyệt hiện đại ngày này thì sẽ tiến hành
phân tích đoạn text mà user nhập vào có thực sự là một URL, nếu đó không phải là một URL hợp lệ thì trình duyệt sẽ
tiến hành sử dụng search engine mặc định đối với đoạn text user vừa nhập.

Giả định rằng đoạn text user nhập là một URL (VD: _ghtk.me_):
Khi submit request, trình duyệt sẽ tiến hành build full URL. Sau đó sẽ tiến hành kiểm tra website có URL vừa nhập vào có
được cấp chứng chỉ TLS/SSL. Điều này giúp trình duyệt build URL dạng HTTP hoặc HTTPS

![](https://images.viblo.asia/a3a1262f-1277-406a-b8db-d5e01745336f.png)

### DNS Lookup

-----------------------------------------------------------------------------------

Địa chỉ URL đóng vai trò như là một cách để biểu diễn địa chỉ giúp user có thể dễ hiểu hơn, nhưng thực tế thì
internet được tổ chức theo cách mà máy tính có thể tra cứu chính xác vị trí của máy khác thông qua địa chỉ IP.

![](https://images.viblo.asia/b763789e-0dd0-4164-9a0e-9302076f5157.png)

Đầu tiên trình duyệt sẽ kiểm tra DNS local xem trước đây tên miền này đã được máy tính giải quyết chưa. Nếu không tìm
thấy, trình duyệt sẽ sử dụng trình phân giải DNS (DNS resolver) để yêu cầu truy xuất thông tin server.

Server DNS có thể đã có domain IP trong bộ nhớ cache. Nếu không nó sẽ hỏi server DNS gốc - **root DNS server**(*). Giả
sử nếu tìm kiếm url **ghtk.me**, ngay sau khi root DNS server nhận được yêu cầu, nó sẽ chuyển tiếp yêu cầu đến TLD
Server (Top-level Domain Server) để lấy ra địa chỉ IP của URL với tên miền **_.me_**.

_Root DNS là một hệ thống các server (bao gồm 13 server được phân tán trên khắp thế giới, nó quản lý tất cả các tên
miền (VD: .com, .vn, .net))_

### TCP request handshaking

-----------------------------------------------------------------------------------

Với địa chỉ IP đã được lấy, giờ đây trình duyệt sẽ có thể kết nối TCP tới đó.
TCP sử dụng kiểu bắt tay ba chiều (three-way handshake) để thiết lập kết nối TCP/IP qua internet dựa trên địa chỉ IP.
TCP handshake là một quá trình, client cần bắt đầu giao tiếp với server bằng cách tạo một request session tới server.
Session đó được bắt đầu bằng cách client sẽ gửi một SYN signal để khởi tạo kết nối. Tiếp đó server sẽ xác nhận phản hồi
đã nhận được SYN signal và gửi lại client với signal là SYN/ACK, trong trường hợp server không chấp nhận connection,
thay vì SYN/ACK được gửi thì server sẽ gửi RST/ACK (Reset Acknowledgement) signal.
Server bắt buộc phải gửi lại thông báo bởi vì TCP là chuẩn tin cậy nên nếu client không nhận được signal được gửi từ
server thì server sẽ được ngầm hiểu là gói tin bị gửi đi đã bị thất lạc và sẽ gửi lại thông báo mới.

![](https://images.viblo.asia/8717d415-0b5e-4a70-a44b-c04e98ce111d.png)

(
Nguồn
ảnh: [https://miro.medium.com/max/1052/1*8KMzJGUBCPne2HT7Z2Noyw.png](https://miro.medium.com/max/1052/1*8KMzJGUBCPne2HT7Z2Noyw.png))

Ngay sau khi client nhận được SYN/ACK signal thì sẽ trả lời server bằng ACK signal, mục đích là để thông báo cho máy
chủ biết là client đã nhận được SYN/ACK signal và kết nối được thiết lập hoàn tất.

_Đọc thêm:_ [TCP 3-Way Handshake](https://medium.com/@yildirimabdrhm/tcp-3-way-handshake-2e4d4d674ff6)

_Sau khi kết nối được khởi tạo thành công, từ đây các HTTP request-response giữa client và server sẽ được gửi và nhận
tự do. Dưới đây sẽ điểm qua về thành phần cơ bản của một HTTP request_

# HTTP Request Properties

### Request Line:

`GET /login HTTP/1.1`

Có thể thấy cấu trúc của một request line có 3 phần:

- HTTP Method: Hành động đang được yêu cầu tới server.
- URL path: Xác định vị tri tài nguyên mà request áp dụng, dùng để ánh xạ yêu cầu tới chức năng mà ứng dụng xử lý.
- HTTP versions: Phiên bản HTTP của client, server dựa trên verison này để đưa ra phản hồi thích hợp tới client. HTTP
  version được sử dụng có thể ảnh hưởng tới HTTP headers, status code và body content của response.

### HTTP Headers

Là một HTTP Header có thể được sử dụng trong một HTTP Request, chứa thông tin bổ sung của một HTTP client request giúp
server có thể điều chỉnh phản hồi dựa trên các thuộc tính được cung cấp.

Dưới đây là một số thuộc tính thường gặp của headers. Có thể đọc thêm
tại [HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

    - User-Agent: Chứa 1 string xác định các thuộc tính bao gồm: giao thức mạng, hệ điều hành, loại ứng dụng, nhà cung
      cấp và phiên bản của client.
    - Cookie: Chưa thông tin HTTP Cookie được lưu trữ trước đó do server gửi lên với thuộc tính Set-Cookie
    - Host: Chỉ định tên domain của server
    - Accept: Cho phép loại nội dung nào được chấp nhận, được biểu diễn dưới dạng MIME.
    - Connection (*): Trạng thái của kết nối TCP có được mở sau khi một request kết thúc.
    - Referer: Chứa địa chỉ của trang thực hiện request. Cho phép server xác định một trang mà mọi người đang truy cập
      trang đó.
    - Origin: Cho biết nguồn gốc của 1 request (có thể là một domain hoặc bao gồm hostname và port)
    - Set-Cookie: Giá trị của cookie được tạo bởi server và gửi tới tới client
    - Access-Control-Allow-Origin: Chứa domain mà response có thể được gửi đến client qua Origin
    - Access-Control-Max-Age: Thuộc tính chỉ định thời gian để caching preflight(*) response trong cùng một request URL.
    - Content-Type: Cho biết loại media type của resource để tiến hành mã hóa nội dung trước khi gửi lên client
    - Content-Length: Giá trị kích thước của resource tính bằng bytes
    - Strict-Transport-Security: Nếu thuộc tính này được cung cấp thì các request bằng HTTP sẽ không bao giờ được chấp
      nhận và sẽ được tự động chuyển đổi hết sang HTTPS. Chỉ số của thuộc tính này cho browser biết thời gian ghi nhớ
      của trang web chỉ có thể được truy cập bằng HTTPS.
    - Cache-Control: Chỉ định phương thức lưu cache của client request và server response và thời gian hết hạn.

**(*) Preflight request:**
Là một loại HTTP Request được tự động tạo ra bởi browser, nó là một HTTP Request có request
methods là OPTIONS, được gửi trước khi thực hiện một request method dạng (POST, DELETE, PUT) với mục đích là
confirm với server trước khi thực hiện request.

**(*)Connection:**
Nhận 2 giá trị

- **keep-alive**: connection này sẽ được giữ xuyên suốt trong phiên làm việc giữa client và server, và sẽ
  có thời gian hết hạn được xét trên thuộc tính `Keep-Alive` của HTTP Headers
- **close**: connection sẽ được đóng ngay khi response được gửi đi, kể cả khi client sử dụng thuộc
  tính `Connection: keep-alive`.

### Message Body

Được sử dụng với những dạng HTTP methods để gửi dữ liệu đầu vào đến server (POST, PUT) với nội dung chứa thông số cần
được gửi xuống, có thể được mã hóa theo một cách nào đó để truyền tải. Đối với HTTP method là GET thì sẽ thường chỉ yêu
cầu server gửi kết quả tài nguyên đến nên không có message body.

# HTTP Response Properties

Được tạo ra bởi server và gửi đến client. Với mục đích là cung cấp kết quả phàn hồi của request mà client đã
request hoặc sẽ thông báo cho client biết lỗi khi server xử lý request thất bại.

### HTTP Headers

Là một HTTP Header được trả về trong một HTTP Response, bổ sung thêm ý nghĩa cho response.

### Status line

`HTTP/1.1 200 OK`

Cấu trúc của một status line có 3 phần:

- HTTP version: Hiển thị phiên bản HTTP
- Status code: Một số có 3 chữ số biểu thị kết quả của yêu cầu. Chữ số đầu tiên đại diện cho lớp xác định của response:
    + 1xx: Informational - Server đã nhận được request
    + 2xx: Success - OK
    + 3xx: Redirection - Phải thực hiện những hành động khác để hoàn thành request
    + 4xx: Client Error - Request chứa những payload không chính xác so với quy định của server hoặc server không thể
      xác thực ủy quyền trên client đó
    + 5xx: Server Error - Được trả ra khi server không thể thực hiện được request

- Status text: Bổ sung ý nghĩa cho **status code**, là một đoạn text tóm tắt ý nghĩa của **status code**

### Message Body

Chứa nội dung kết quả của request được trả ra bởi server. Để phản hồi một request success, thì nội dung chứa tài nguyên
mà client đã request hoặc một số thông tin về trạng thái (status code, status text) về hành động của client đã request.
Đối với request không thành công, nội dung có thể cung cấp thêm một số thông tin về lỗi được trả về như lý do gây ra
lỗi.

# Lời kết

Bài viết này dựa vào kiến thức và trải nghiệm thực tế của bản thân muốn chia sẻ về những "bề nổi" mà một HTTP hoạt động
nói chung cũng như việc tương tác giữa trình duyệt (browser) và server nói riêng, những khái niệm và những kết nối được
tạo ra, đó cũng là những
thứ tổng quan nhất và dễ dàng nhất mà người đọc có thể hiểu được trong thế giới internet rộng lớn và về cách mà một
website hoạt đông như thế nào. Cảm ơn vì đã theo dõi và hẹn gặp
laị vào những bài viết tiếp theo.

Thân ái và quyết thắng