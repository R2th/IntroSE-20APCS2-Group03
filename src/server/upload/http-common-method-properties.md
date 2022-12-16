Dạo này thấy mọi người tự dưng bàn tán nhiều về mấy HTTP Requests, những tưởng ai cũng biết từ hồi mới nhập học CNTT.
Cơ mà càng đọc càng thấy mông lung, tự thấy những gì mình biết lại không còn chắc chắn nữa.
Tìm đọc tài liệu trên mạng cũng sợ mấy bác tam sao thất bản, đọc tài liệu của Mozilla họ cũng refer đến đồ của IETF nên là đọc từ nguồn cho chắc vậy.
Nếu mình dịch có chỗ nào sai mong các bạn chỉ giáo và "lượng thứ" :D

Bài sau dịch từ tài liệu [RFC 7231, section 4.2:  Common Method Properties](https://tools.ietf.org/html/rfc7231#section-4.2)

# RFC 7231 Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content

## Section 4.2:  Common Method Properties

Trước khi vào section này thì mình tổng hợp lại danh sách HTTP Method ([Section 4.1](https://tools.ietf.org/html/rfc7231#section-4.1) Nguyên si không dịch)

```
   +---------+-------------------------------------------------+-------+
   | Method  | Description                                     | Sec.  |
   +---------+-------------------------------------------------+-------+
   | GET     | Transfer a current representation of the target | 4.3.1 |
   |         | resource.                                       |       |
   | HEAD    | Same as GET, but only transfer the status line  | 4.3.2 |
   |         | and header section.                             |       |
   | POST    | Perform resource-specific processing on the     | 4.3.3 |
   |         | request payload.                                |       |
   | PUT     | Replace all current representations of the      | 4.3.4 |
   |         | target resource with the request payload.       |       |
   | DELETE  | Remove all current representations of the       | 4.3.5 |
   |         | target resource.                                |       |
   | CONNECT | Establish a tunnel to the server identified by  | 4.3.6 |
   |         | the target resource.                            |       |
   | OPTIONS | Describe the communication options for the      | 4.3.7 |
   |         | target resource.                                |       |
   | TRACE   | Perform a message loop-back test along the path | 4.3.8 |
   |         | to the target resource.                         |       |
   +---------+-------------------------------------------------+-------+
   ```
   
###    4.2.1 Safe methods (Phương thức an toàn)

Request methods được gọi là "safe" (an toàn) nếu bản thân nó được định nghĩa là read-only (chỉ đọc). Có nghĩa là client KHÔNG yêu cầu hay kỳ vọng bất kỳ thay đổi gì trên servers. Do vậy, khi safe methods được sử dụng, người ta kỳ vọng nó sẽ không gây ra bất kỳ lỗi gì cho server, không gây ra mất mát dữ liệu trong hệ thống hay tạo ra gánh nặng gì lên server.

Định nghĩa này của safe methods không ngăn cấm các hành động tiềm ẩn nguy cơ gây hại cho hệ thống, bản thân nó KHÔNG hoàn toàn read-only và có thể gây ra tác dụng phụ. Tuy nhiên, điều quan trọng là client KHÔNG mong chờ bất kỳ xử lý thêm thắt nào phía server và KHÔNG chịu trách nhiệm cho các xử lý đó. Ví dụ, không phân biệt request method là gì thì hầu hết server sẽ lưu lại thông tin request vào logfile mỗi khi kết thúc response. Hành động này được xem là an toàn mặc dù việc ghi log file có thể khiến full ổ cứng và crash server. Tương tự vậy, 1 request mục tiêu ban đầu là lựa chọn quảng cáo trên website, có thể gây ra tác dụng phụ là mất thêm phí cho tài khoản quảng cáo.

Dựa theo định nghĩa trên, các method sau được xem là an toàn: GET, HEAD, OPTIONS, and TRACE.

Mục tiêu của việc phân biệt safe và unsafe method là cho phép chạy quá trình tự động lấy dữ liệu (spiders) và cải thiện hiệu năng cache (pre-fetching) có thể chạy mà không lo gây ra lỗi cho hệ thống. Ngoài ra nó cũng cho phép user agent phải áp dụng các biện pháp ràng buộc lên các quá trình tự động sử dụng unsafe method khi xử lý dữ liệu có nguy cơ gây hại.

Phía user agent NÊN phân biệt giữa safe và unsafe method và cảnh báo cho user, ví dụ cho họ biết được là 1 hành động unsafe sắp được thực thi.

Khi phía xây dựng hệ thống cho phép thực hiện action thông qua request parameter, đơn vị đó phải chịu trách nhiệm cho việc thống nhất giữa xử lý thực tế với ý nghĩa của method đó. Ví dụ, khá nhiều ứng dụng web cho phép chèn action vào parameter, ví dụ "page?do=delete". Nếu kết quả của request này là thực hiện hành động unsafe thì phía quản lý PHẢI vô hiệu hoá hoặc không cho phép action này, trừng nào nó còn dùng safe method. Nếu không làm được việc này sẽ gây ra hậu quả không tốt cho hệ thống, các quá trình tự động có thể thực hiện GET đến toàn bộ URI liên quan và gây ra tác động xấu.

### 4.2.2.  Idempotent Methods

> Idempotent: Tra từ điển thì là "Luỹ đẳng", đại ý là "Không thay đổi giá trị sau khi nó tự nhân lên"

Một phương thức được coi là "idempotent" nếu nếu ảnh hưởng của nó lên server không thay đổi kể cả khi nó được gọi 1 lần hay nhiều lần. Với định nghĩa này thì method PUT, DELETE và các safe methods được coi là "idempotent".

Giống như định nghĩa của safe method, đặc tính của idempotent là chỉ tác động đến những phần mà phía client request lên, và server thoải mái trong việc ghi log, lưu version history hoặc triển khai các xử lý non-idempotent cho các indempotent request.

Idempotent được tách biệt ra riêng bởi nó có thể lặp đi lặp lại 1 cách tự động, trong trường hợp kết nối giữa client và server bị ngắt trước khi client kịp đọc response từ server. Ví dụ, nếu client gửi PUT request lên và kết nối bị ngắt trước khi nhận response, thì client có thể tạo 1 kết nối mới và thực hiện idempotent request. Việc lặp đi lặp lại request sẽ cho ra cùng một kết quả mong muốn, ngay cả khi request đầu tiên có thành công, mặc dù response giữa các lần có thể khác nhau.

### Cacheable Methods

Phương thức được coi là "cacheable" nếu kết quả của nó được phép tái sử dụng trong tương lai. Chi tiết tham khảo [RFC7234](https://tools.ietf.org/html/rfc7234). Thông thường, 1 safe method có thể hoạt động không phục thuộc vào việc phân quyền sẽ là cacheable. Định nghĩa này cho phép GET, HEAD, POST là cacheable, mặc dù thông thường việc implement cache chỉ support GET và HEAD.

# Quan điểm cá nhân

Bài dịch chỉ dịch 1 phần của docs, phần chính [4.3.  Method Definitions](https://tools.ietf.org/html/rfc7231#section-4.3) xin dành cho bạn đọc tự nghiên cứu.
Cá nhân mình cũng trải qua 1 vài dự án, bài học xương máu nhất là

> ĐỪNG BAO GIỜ CREATE/UPDATE BẢN GHI KHI REQUEST METHOD LÀ GET

(Ở đây không nói đến bản ghi lưu lại log access)

Mình gặp 1 vài lần rồi,  toang lắm... Hy vọng các bạn tự ngẫm được sự nguy hiểm của điều này.