***Xem thêm*** : [***Công nghệ web và dịch vụ trực tuyến***](https://www.tailieubkhn.com/2021/10/cong-nghe-web-va-dich-vu-truc-tuyen.html)
## Giới thiệu nhanh về HTTP
HTTP là giao thức cơ bản được World Wide Web sử dụng và giao thức này xác định cách thức thông báo được định dạng và truyền đi cũng như các hành động mà server và trình duyệt Web phải thực hiện để đáp ứng các lệnh khác nhau. HTTP như là một cầu nối giữa client và server.

![image.png](https://images.viblo.asia/3a7949e9-0cb9-4940-a965-fffd50a66082.png)

Có rất nhiều khía cạnh khi nói về HTTP, tuy nhiên trong bài viết này chúng ta chỉ đề cập tới những tính chất liên quan nhất đến chủ đề chính của bài viết hôm nay đó là _stateless_. _Stateless_ nghĩa là giữa hai yêu cầu HTTP bất kì không có bất cứ liên kết gì với nhau cả, mỗi request về server là độc lập. Ví dụ dễ hiểu hơn, ví dụ bạn đăng nhập Facebook với tài khoản của bạn, và ngay sau đó bạn điều hướng tới trang cài đặt hoặc trang cá nhân thì bạn sẽ bị yêu cầu đăng nhập lại vì server không biết rằng bạn là người vừa đăng nhập. Tuy nhiên, với session và token chúng ta có thể nói cho server biết tôi là người vừa đăng nhập vào tài khoản đó và hãy cấp quyền cho tôi truy cập vào trang đó.

## Xác thực với session 
Cách đơn giản nhất để nói cho server biết rằng chúng ta là người vừa đăng nhập là username và mật khẩu của người dùng sẽ được lưu trữ tại cookie trên máy client và request gửi lên tiếp theo sẽ gửi kèm theo username và mật khẩu, đây là cách thông thường mà chắc ai cũng nghĩ tới tuy nhiên việc lưu trữ username và mật khẩu tại máy client là không an toàn về mọi mặt. Vậy lưu trữ ở client không an toàn chúng ta sẽ chuyển sang lưu trữ các thông tin này trên server.

![image.png](https://images.viblo.asia/e428d454-c208-451a-9586-69c9d68cc308.png)

Xác thực bằng session là cách mà thông tin về trạng thái của người dùng sẽ được lưu trữ vào bộ nhớ của server. Khi sử dụng hệ thống xác thực dựa trên session, server sẽ tạo và lưu trữ dữ liệu phiên trong bộ nhớ của nó khi người dùng đăng nhập và sau đó lưu session ID trong cookie trên trình duyệt của người dùng. Session ID sẽ được gửi lên cùng trong các request tiếp theo từ máy client tới server, và server sẽ so sánh nó với dữ liệu được lưu trữ trong bộ nhớ của server.

## Xác thực với token

![image.png](https://images.viblo.asia/fe71769c-5f05-4a91-8f78-1f34ba47e889.png)

Xác thực với token là một phương pháp xác thực mà trạng thái của user sẽ được lưu trữ tại máy client và dĩ nhiên là không phải lưu trữ dạng thô như cách mà chúng ta đề cập ở bên trên. Hiện nay thì xác thực với token là lựa chọn ưa thích cho RESTful API. Trong xác thực với token, dữ liệu người dùng được mã hóa thành JWT (Json Web Token) với một secret và được gửi lại cho client. JWT sau đó được lưu trữ ở phía máy client và được gửi kèm theo trong các request tiếp theo trong header, server xác thực JWT được gửi lên trước khi gửi phản hồi lại cho máy client. 

Trong Postman, để thêm token vào cho các request của bạn, vào tab _Authorization_ chọn _Bearer Token_ và dán token của bạn vào ô tương ứng: 

![image.png](https://images.viblo.asia/c1c9530e-7b57-4f64-a8cd-42fee10666a4.png)

## Ưu và nhược điểm của xác thực bằng token so với session
### Ưu điểm
- *Xác thực bằng token là có khả năng mở rộng và hiệu quả hơn:*  vì sessions lưu trữ trên server, khả năng mở rộng là một vấn đề khi có một lượng lớn người dùng sử dụng hệ thống cùng 1 lúc còn với token là không thành vấn đề khi chúng được lưu trữ tại client. Hơn nữa, server chỉ cần tạo và xác minh token cùng với thông tin, có nghĩa là có thể duy trì nhiều người dùng hơn trên một trang web hoặc ứng dụng cùng một lúc mà không gặp bất kỳ rắc rối nào.
- *Xác thực bằng token linh hoạt và có hiệu suất cao:* token có thể được sử dụng trên nhiều máy chủ và chúng có thể cung cấp xác thực cho các trang web và ứng dụng khác nhau cùng một lúc. Điều này giúp khuyến khích nhiều cơ hội hợp tác hơn giữa các doanh nghiệp và nền tảng để có trải nghiệm hoàn hảo.
- *Xác thực bằng token là bảo mật*

### Hạn chế
- Secret key bị mất: token chỉ dựa vào một khóa duy nhất vì vậy nếu vì bất cứ lý do gì mà khóa này bị mất hoặc bị lộ thì sẽ gây đến các hậu quả nghiêm trọng. 
- Token có kích thước lớn hơn nhiều so với Session ID được lưu trữ trong cookie vì token chứa nhiều thông tin của người dùng hơn
- Thời gian sử dụng của token thường ngắn hơn so với session
- Ngoài ra có nhiều ý kiến cho rằng token là kém bảo mật hơn so với session

### Vậy nên sử dụng session hay token?
Mặc dù token đang có chút lợi thế tuy nhiên chúng ta không thể khẳng định ngay là phương pháp nào được ưu tiên để xác thực. Cả hai phương pháp có thể được sử dụng để thay thế cho nhau hoặc kết hợp cả hai trong một hệ thống, điều này còn tùy thuộc vào doanh nghiệp, nhóm phát triển và trường hợp sử dụng. 

Tham khảo: 
- [https://dev.to/thecodearcher/](https://dev.to/thecodearcher/what-really-is-the-difference-between-session-and-token-based-authentication-2o39) 
- [https://viblo.asia/u/hct97](https://viblo.asia/p/session-va-token-based-authentication-yMnKMNbNZ7P)
- [https://www.loginradius.com/](https://www.loginradius.com/blog/start-with-identity/pros-cons-token-authentication/)
- [https://stackoverflow.com/](https://stackoverflow.com/questions/40200413/sessions-vs-token-based-authentication)