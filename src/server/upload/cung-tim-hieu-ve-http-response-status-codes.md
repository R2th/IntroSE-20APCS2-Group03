# Giới thiệu 
- Xin chào mọi người hôm nay mình có một chủ đề về các response HTTP , thực chất khi làm việc nhiều nhưng chúng ta đôi khi vẫn không biết các response trả về ví như lỗi 500 là gì hay trả về 200 là gì (chỉ là ví dụ thôi nhé :D còn 2 status này hầu hết ai cũng biết rồi )  ? Thi hôm nay mình xinh phép chia sẻ đôi chút về các trạng thái được trả về từ HTTP response nhé . 
- Trạng thái phản hồi HTTP cho biết liệu một yêu cầu HTTP cụ thể đã được hoàn thành thành công hay chưa. Phản hồi được nhóm trong năm lớp sau đây : 
## I. Ormational responses (100–199),
## II. Successful responses (200–299),
## III. Redirects (300–399),
## iV. Client errors (400–499),
## V. Server errors (500–599).
- Các mã trạng thái dưới đây được xác định bởi [ section 10 of RFC 2616](https://tools.ietf.org/html/rfc2616#section-10.3.8) . Bạn có thể tìm thấy một đặc điểm kỹ thuật được cập nhật trong đây [RFC 7231. ](https://tools.ietf.org/html/rfc7231#section-6.5.1) .
> Nếu bạn nhận được phản hồi không có trong danh sách này, thì đó là phản hồi không chuẩn, có thể là tùy chỉnh cho phần mềm của máy chủ nhé !
## 1. Information responses
- **100 Continue** Phản hồi tạm thời này cho thấy mọi thứ cho đến nay đều ổn và khách hàng nên tiếp tục yêu cầu hoặc bỏ qua phản hồi nếu yêu cầu đã kết thúc.
- **101 Switching Protocol**  Mã này được gửi để đáp lại tiêu đề yêu cầu nâng cấp từ máy khách và cho biết giao thức mà máy chủ đang chuyển sang .
- **102 Processing (WebDAV)** Cho biết rằng máy chủ đã nhận được và đang xử lý yêu cầu, nhưng chưa có phản hồi nào.
- **103 Early Hints** Trạng thái này chủ yếu được sử dụng với tiêu đề Liên kết, cho phép tác nhân người dùng bắt đầu tải trước tài nguyên trong khi máy chủ chuẩn bị phản hồi.

## 2. Successful responses
- **200 OK** Yêu cầu đã thành công. Ý nghĩa của thành công phụ thuộc vào phương thức HTTP sau đây :
    - GET: dữ liệu đã được get về thành công .
    - HEAD : các tiêu đề , thực thể đều nằm trong response trả về .
    - PUT or POST: kết quả của hành động được trả về .
    - TRACE: Phần thân thông báo chứa thông báo yêu cầu mà máy chủ nhận được
 - **201 Created** Yêu cầu đã thành công và kết quả  mới đã được tạo. Đây thường là phản hồi được gửi sau khi POST yêu cầu .
 - **202 Accepted** Yêu cầu đã được nhận nhưng chưa được thực hiện. Vì HTTP không có cách nào để gửi phản hồi không đồng bộ cho biết kết quả của yêu cầu. Nó được dành cho các trường hợp trong đó một quy trình hoặc máy chủ khác xử lý yêu cầu hoặc xử lý hàng loạt .
 - **203 Non-Authoritative Information** Phản hồi này có nghĩa là thông tin meta được trả về không hoàn toàn giống với thông tin có sẵn từ máy chủ .
 - **204 No Content** Response không có nội dung trả về .
 - **205 Reset Content** Yêu cầu người dùng thiết lập lại dữ liệu đã gửi yêu cầu đến máy chủ.
 - **206 Partial Content** Phản hồi này được sử dụng khi Range tiêu đề được gửi từ client để chỉ yêu cầu một phần của tài nguyên .
 - **207 Multi-Status( WebDAV )** Truyền tải thông tin về nhiều tài nguyên, trong các tình huống có thể có nhiều trạng thái phù hợp
 - **208 Already Reported( WebDAV )** Được sử dụng bên trong một <dav:propstat> Phần tử phản hồi để tránh liên tục liệt kê nhiều ràng buộc .
 - **226 IM Used( Mã hóa HTTP Delta )**  Máy chủ đã thực hiện một GET yêu cầu  và phản hồi là một đại diện cho kết quả của một hoặc nhiều thao tác thể hiện được áp dụng cho thể hiện hiện tại.

## 3. Redirection messages
- **300 Multiple Choice** Yêu cầu có nhiều hơn một response .(Không có cách chuẩn hóa nào để chọn một trong các câu trả lời, nhưng các liên kết HTML đến các khả năng được đề nghị để người dùng có thể chọn.) 
- **301 Moved Permanently** URL được yêu cầu đã được thay đổi vĩnh viễn thay vào đó là 1 URL mới hoàn toàn .
- **302 Found** phản hồi này có nghĩa là URI của tài nguyên được yêu cầu đã được thay đổi tạm thời  .
- **303 See Other** Máy chủ đã gửi phản hồi này để chỉ đạo client nhận tài nguyên được yêu cầu tại một URI khác với yêu cầu GET dữ liệu về .
- **304 Not Modified** Điều này được sử dụng cho mục đích lưu trữ . Nó báo với client rằng phản hồi chưa được sửa đổi, vì vậy có thể tiếp tục sử dụng cùng một phiên bản được lưu trong bộ nhớ cache của phản hồi .
- **305 Use Proxy** Được xác định trong phiên bản trước của đặc tả HTTP để chỉ ra rằng phản hồi được yêu cầu phải được truy cập bởi proxy. Nó đã bị phản đối do những lo ngại về bảo mật liên quan đến cấu hình trong dải của proxy.
- **306 unused** Phản hồi này không còn được sử dụng; nó chỉ là dành riêng. Nó được sử dụng trong phiên bản trước của HTTP / 1.1.
- **307 Temporary Redirect** Máy chủ gửi phản hồi này để chỉ đạo client nhận tài nguyên được yêu cầu tại một URI khác với cùng phương thức đã được sử dụng trong yêu cầu trước đó. Điều này có giốg với **302 Found** , người dùng không được thay đổi phương thức HTTP được sử dụng: Nếu ông A POST được sử dụng trong yêu cầu đầu tiên, thì POST phải sử dụng đến yêu cầu thứ hai.
- **308 Permanent Redirect** Điều này có nghĩa là dữ liệu hiện được đặt vĩnh viễn tại một URI khác, được chỉ định bởi Location: HTTP Response header. Điều này có cùng giống với 301 Moved Permanently .
## 4. Client error responses
- **400 Bad Request** Server không hiểu yêu cầu do request không hợp lê .
- **401 Unauthorized** phản hồi này có nghĩa là "không được xác thực". Đó là  phía client phải tự xác thực để nhận được phản hồi yêu cầu , 
>  trạng thái này nếu ai đã từ sử dụng basic Authen rồi thì sẽ rõ .
- **402 Payment Required**   Mục đích ban đầu để tạo mã này là sử dụng nó cho các hệ thống thanh toán kỹ thuật số, tuy nhiên mã trạng thái này rất hiếm khi được sử dụng và không có quy ước chuẩn nào tồn tại.
- **403 Forbidden** Khách hàng không có quyền truy cập vào nội dung, vì vậy máy chủ từ chối cung cấp tài nguyên được yêu cầu. Không giống như 401, danh tính của máy khách được biết đến máy chủ.
- **404 Not Found** status này quá là quen thuộc nhể , Server nó không tìm thấy đc yêu cầu để trả về đơn giản truy cập 1 post mà không có trong hệ thống đó . 
- **405 Method Not Allowed** trạng thái này là do sai phương thức khi gửi đi . 
- **406 Not Acceptable** phản hồi này được gửi khi máy chủ web, sau khi thực hiện đàm phán nội dung do máy chủ điều khiển , không tìm thấy bất kỳ nội dung nào phù hợp với tiêu chí do tác nhân người dùng đưa ra.
- **407 Proxy Authentication Required**
Điều này tương tự với 401 nhưng việc xác thực là cần thiết để được thực hiện bởi một proxy.

- **408 Request Timeout**
Phản hồi này được gửi trên một kết nối bởi một số máy chủ, thậm chí không có bất kỳ yêu cầu nào trước đó của khách hàng. Điều đó có nghĩa là máy chủ muốn tắt kết nối không sử dụng này. Phản hồi này được sử dụng nhiều hơn vì một số trình duyệt, như Chrome, Firefox 27+ hoặc IE9, sử dụng các cơ chế kết nối trước HTTP để tăng tốc độ lướt web. Cũng lưu ý rằng một số máy chủ chỉ tắt kết nối mà không gửi trạng thái này.

- **409 Conflict**
Phản hồi này được gửi khi yêu cầu xung đột với trạng thái hiện tại của máy chủ.

- **410 Gone**
Phản hồi này được gửi khi nội dung được yêu cầu đã bị xóa vĩnh viễn khỏi máy chủ, không có địa chỉ chuyển tiếp. Khách hàng dự kiến sẽ loại bỏ bộ nhớ cache và liên kết đến tài nguyên. Đặc tả HTTP dự định mã trạng thái này sẽ được sử dụng cho "dịch vụ quảng cáo, thời gian giới hạn". API không cần bắt buộc phải chỉ ra các tài nguyên đã bị xóa với trạng thái này.

- **411 Length Required**
Máy chủ từ chối yêu cầu vì trường Content-Length tiêu đề không được xác định và máy chủ yêu cầu.

- **412 Precondition Failed**
Client đã chỉ ra các điều kiện tiên quyết trong các tiêu đề mà máy chủ không đáp ứng.

- **413 Payload Too Large**
Thực thể yêu cầu lớn hơn giới hạn được xác định bởi máy chủ; máy chủ có thể đóng kết nối hoặc trả về **Retry-After** .
 - **414 URI Too Long**
URI được khách hàng yêu cầu dài hơn máy chủ .
- **415 Unsupported Media Type**
Định dạng phương tiện của dữ liệu được yêu cầu không được máy chủ hỗ trợ, vì vậy máy chủ sẽ từ chối yêu cầu.
- **416 Range Not Satisfiable**
Phạm vi được chỉ định bởi trường Range  trong yêu cầu không thể được thực hiện; có thể phạm vi nằm ngoài kích thước của dữ liệu của URI mục tiêu.
- **417 Expectation Failed**
Mã phản hồi này có nghĩa là sự mong đợi được chỉ ra bởi trường Expect tiêu đề yêu cầu không thể được đáp ứng bởi máy chủ.
- **418 I'm a teapot**
Máy chủ từ chối request.
- **421 Misdirected Request**
Yêu cầu được hướng đến một máy chủ không thể tạo phản hồi. Điều này có thể được gửi bởi một máy chủ không được cấu hình để tạo phản hồi cho sự kết hợp giữa lược đồ và quyền hạn được bao gồm trong URI yêu cầu.
- **422 Unprocessable Entity( WebDAV )**
Yêu cầu được hình thành tốt nhưng không thể thực hiện được do lỗi ngữ nghĩa.

- **423 Locked( WebDAV )**
Tài nguyên đang được truy cập bị khóa.

- **424 Failed Dependency( WebDAV )**
Yêu cầu không thành công do thất bại của yêu cầu trước đó.

- **425 Too Early**
Chỉ ra rằng máy chủ không sẵn sàng  xử lý yêu cầu .

- **426 Upgrade Required**
Máy chủ từ chối thực hiện yêu cầu bằng giao thức hiện tại nhưng có thể sẵn sàng thực hiện sau khi máy khách nâng cấp lên giao thức khác. Máy chủ gửi một Upgrade tiêu đề trong phản hồi 426 để chỉ ra các giao thức được yêu cầu.

- **428 Precondition Required**
Máy chủ gốc yêu cầu phải có điều kiện. Phản hồi này nhằm ngăn chặn sự cố 'lost update', trong đó máy khách nhận trạng thái của tài nguyên, sửa đổi nó và đưa nó trở lại máy chủ, trong khi đó, bên thứ ba đã sửa đổi trạng thái trên máy chủ, dẫn đến xung đột.

- **429 Too Many Requests**
Người dùng đã gửi quá nhiều yêu cầu trong một khoảng thời gian nhất định ("rate limiting").

- **431 Request Header Fields Too Large**
Máy chủ không sẵn sàng xử lý yêu cầu vì các trường tiêu đề của nó quá lớn. Yêu cầu có thể được gửi lại sau khi giảm kích thước của các trường tiêu đề yêu cầu.

- **451 Unavailable For Legal Reasons**
Tác nhân người dùng đã yêu cầu một tài nguyên không thể được cung cấp một cách hợp pháp, chẳng hạn như một trang web được kiểm duyệt bởi chính phủ.
## 5. Server error responses
- **500 Internal Server Error**
Máy chủ đã gặp phải tình huống không biết cách xử lý.

- **501 Not Implemented**
Phương thức yêu cầu không được máy chủ hỗ trợ và không thể xử lý. Các phương thức duy nhất mà các máy chủ được yêu cầu hỗ trợ (và do đó không phải trả lại mã này) là GET và HEAD.

- **502 Bad Gateway**
Phản hồi lỗi này có nghĩa là máy chủ, trong khi làm việc như một cổng để nhận được phản hồi cần thiết để xử lý yêu cầu, đã nhận được phản hồi không hợp lệ.

- **503 Service Unavailabl**e
Máy chủ chưa sẵn sàng để xử lý yêu cầu. Nguyên nhân phổ biến là một máy chủ ngừng hoạt động để bảo trì hoặc bị quá tải. Lưu ý rằng cùng với phản hồi này, một trang thân thiện với người dùng giải thích vấn đề nên được gửi. Phản hồi này nên được sử dụng cho các điều kiện tạm thời và Retry-After, nếu có thể, chứa thời gian ước tính trước khi phục hồi dịch vụ. Quản trị viên web cũng phải quan tâm đến các tiêu đề liên quan đến bộ đệm được gửi cùng với phản hồi này, vì các phản hồi điều kiện tạm thời này thường không nên được lưu vào bộ đệm.

- **504 Gateway Timeout**
Phản hồi lỗi này được đưa ra khi máy chủ hoạt động như một cổng và không thể nhận được phản hồi kịp thời.

- **505 HTTP Version Not Supported**
Phiên bản HTTP được sử dụng trong yêu cầu không được máy chủ hỗ trợ.

- **506 Variant Also Negotiates**
Máy chủ có lỗi cấu hình bên trong tài nguyên biến thể được chọn được cấu hình để tham gia vào quá trình đàm phán nội dung minh bạch, và do đó không phải là điểm kết thúc thích hợp trong quá trình đàm phán.

- **507 Insufficient Storage( WebDAV )**
Phương thức không thể được thực hiện trên tài nguyên vì máy chủ không thể lưu trữ biểu diễn cần thiết để hoàn thành yêu cầu.

- **508 Loop Detected( WebDAV )**
Máy chủ đã phát hiện một vòng lặp vô hạn trong khi xử lý yêu cầu.

- **510 Not Extended**
Cần mở rộng thêm cho yêu cầu để máy chủ thực hiện nó.

- **511 Network Authentication Required**
Mã trạng thái 511 chỉ ra rằng máy khách cần xác thực để có quyền truy cập mạng.

# Kết Thúc 
- Hy  vọng răng bài viết sẽ đem lại ý nghĩa cho bạn nếu thấy hay hay cho mình 1 upvote để có thể ra những bài viết hay hơn . cảm ơn đã ghé thăm bài viết này . (bye)