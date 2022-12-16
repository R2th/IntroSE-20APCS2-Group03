## CORS, CSP, HSTS và một số từ khóa bảo mật web!

Sau đây là một số lý do về mà ta nên học về bảo mật web:
1. Bạn là người dùng lo lắng về sự rò rỉ thông tin cá nhân
2. Bạn là một Web Developer và muốn làm cho ứng dụng web trở nên an toàn hơn
3. Bạn muốn nâng cao kiến thức về bảo mật web để chuẩn bị cho các câu hỏi phỏng vấn
Vậy, Tôi hi vọng bài viết này sẽ giúp các bạn hiểu một vài từ khóa về bảo mật website

## Hai Khái Niệm Cơ Bản Về Security

**No one is ever 100% safe.**

Không có bất cứ thứ gì là tuyệt đối an toàn.

**One layer of protection is not enough.**

Một lớp bảo vệ là không đủ.

## Cross-Origin Resource Sharing (CORS)

Bạn đã bao giờ nhận được một lỗi trông giống như thế này chưa?
```
No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.
``` 
Bạn chắc chắn không phải một mình. Sau khi bạn tìm kiếm nó hoặc ai đó nói với bạn về để có được Extention thì vấn đề của bạn mới được giải quyết.

**CORS để bảo vệ bạn.**

Để giải thích cách CORS giúp bạn, trước tiên hãy nói về cookie, cụ thể là cookie xác thực. Cookie xác thực được sử dụng để thông báo cho máy chủ mà bạn đã đăng nhập và chúng được tự động gửi cùng với bất kỳ yêu cầu nào bạn thực hiện cho máy chủ đó.


Giả sử bạn đã đăng nhập vào Facebook và họ sử dụng cookie xác thực. Bạn bấm vào bit.ly/r43nugi để chuyển hướng bạn đến superevilwebsite.rocks. Một kịch bản trong superevilwebsite.rocks làm cho một yêu cầu phía máy khách để facebook.com gửi cookie xác thực của bạn!


Nếu không c CORS, họ có thể thay đổi tài khoản của bạn mà bạn không hề biết. Cho đến khi, họ đăng bit.ly/r43nugi trên dòng thời gian của bạn, và tất cả bạn bè của bạn nhấp vào nó, và sau đó họ đăng bit.ly/r43nugi trên tất cả các dòng thời gian của bạn bè và sau đó chu kỳ tiếp tục  đầu tiên chinh phục tất cả người dùng Facebook và thế giới được tiêu thụ bởi superevilwebsite.rocks.
Tuy nhiên, Nếu có CORS, Facebook sẽ chỉ cho phép các yêu cầu có nguồn gốc từ facebook.com để chỉnh sửa dữ liệu trên máy chủ của họ. Nói cách khác, họ sẽ hạn chế chia sẻ tài nguyên gốc. Sau đó bạn có thể yêu cầu…
## Content Security Policy (CSP)
> Content Security Policy (CSP) là chính sách bảo mật nội dung, được sử dụng để xác định các nguồn nội dung an toàn trên website mà trình duyệt có thể tải về cho người dùng. CSP là biện pháp đối phó rất hiệu quả với kiểu hack chèn mã độc Cross Site Scripting (XSS).

Mục tiêu chính của CSP là giảm thiểu và báo cáo các cuộc tấn công XSS. Tấn công XSS khai thác sự tin tưởng của trình duyệt về nội dung nhận được từ máy chủ. Các Script độc hại được thực thi bởi trình duyệt của nạn nhân bởi vì trình duyệt tin tưởng nguồn của nội dung, ngay cả khi nó không đến từ nơi mà nó dường như đến từ đó.

CSP làm cho các quản trị viên máy chủ có thể giảm hoặc loại bỏ các vector mà XSS có thể xuất hiện bằng cách chỉ định các tên miền mà trình duyệt nên xem là nguồn hợp lệ của các tập lệnh thực thi. Trình duyệt tương thích CSP sau đó sẽ chỉ thực thi các tập lệnh được tải trong các tệp nguồn nhận được từ các miền thuộc danh sách đó, bỏ qua tất cả các tập lệnh khác (bao gồm các tập lệnh nội dòng và các thuộc tính HTML xử lý sự kiện).

Là một hình thức bảo vệ tối ưu, các trang web không bao giờ cho phép các tập lệnh được thực thi có thể chọn không cho phép thực thi tập lệnh.

**Ở bài viết sau mình sẽ nói về HSTS và một số từ khóa bảo mật web !**
Cảm ơn bạn đã theo dõi