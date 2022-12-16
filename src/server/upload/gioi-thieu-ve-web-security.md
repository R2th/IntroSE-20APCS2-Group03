Có rất nhiều lý do để học về web security như:
- Bạn là một người dùng lo lắng về việc thông tin cá nhân bị rò rỉ.
- Bạn là một web developer muốn làm cho trang web của bạn bảo mật hơn.
- Bạn là một web developer đang tìm việc, và bạn muốn sẵn sàng nếu người phỏng vấn hỏi bạn về web security.
...

Bài viết này sẽ giải thích một số thuật ngữ phổ biến về web security.

Trước khi đi vào chi tiết, trước tiên cần hiểu các khái niệm cốt lõi về bảo mật.
## Hai khái niệm trong bảo mật
### Không ai an toàn 100%
Không tồn tại khái niệm được bảo vệ 100% khỏi việc bị hack.
### Một lớp bảo vệ là không đủ
Bạn không thể chỉ nói ...
> Ồ, vì tôi đã triển khai CSP, tôi an toàn. Tôi có thể loại bỏ cross-site scripting khỏi danh sách lỗ hổng của mình bởi vì nó không thể xảy ra bây giờ.

Có thể đó là suy nghĩ của một số người, nhưng cũng thật dễ để chính bạn cũng suy nghĩ theo hướng như vậy. Bảo mật không hề đơn giản.

Ta sẽ bắt đầu với một thứ mà mọi người gặp khá sớm trong hành trình phát triển web của họ.
## Cross-Origin Resource Sharing (CORS)
Bạn đã từng gặp một lỗi như thế này?
```
No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.
```
Tìm kiếm nó trên google, một số người khuyên bạn cài đặt một extension có thể xóa bỏ mọi vấn đề.
### CORS ở đó để bảo vệ bạn chứ không phải làm hại bạn.
Để giải thích CORS giúp bạn như thế nào, trước tiên hãy nói về cookies, đặc biệt là **authentication cookies**. Authentication cookies được sử dụng để nói với server rằng bạn đã login, và nó sẽ được tự động gửi kèm bất kỳ request nào đến server. 

Giả sử bạn login vào Facebook, và họ sử dụng authentication cookies. Bạn click vào `bit.ly/r43nugi` và nó redirect bạn đến `superevilwebsite.rocks`. Một script trong trang `superevilwebsite.rocks` tạo một request đến `facebook.com` và gửi kèm authentication cookie của bạn.

Nếu không có CORS, hành vi như trên có thể làm thay đổi thông tin tài khoản mà bạn không hề biết, cho đến khi ai đó đăng bài có kèm link `bit.ly/r43nugi` trên dòng thời gian của bạn, và tất cả bạn bè của bạn click vào link đó. Và sau đó, bài đăng trên lại được đăng trên dòng thời gian của bạn bè của bạn. Chu kỳ như vậy cứ tiếp tục và chinh phục tất cả người dùng Facebook.

Tuy nhiên, với CORS, Facebook có thể chỉ cho phép các request với origin là `facebook.com` được phép sửa dữ liệu trên server của họ. Nói cách khác, họ có thể giới hạn việc chia sẻ tài nguyên cross-origin. Sau đó bạn có thể hỏi ...
> superevilwebsite.rocks có thể thay đổi origin header trong request của họ và nó trông giống như đến từ facebook.com?

Họ có thể thử, nhưng nó sẽ không hoạt động vì browser sẽ bỏ qua nó và sử dụng origin thật.
> Ok, nhưng nếu superevilwebsite.rocks tạo một request server-side thì chuyện gì sẽ thế nào?

Trong trường hợp này, họ có thể vượt qua được CORS, tuy nhiên lại không thể gửi kèm theo authentication cookie của bạn. Script cần được thực thi ở client side để có thể truy cập được vào client side cookies của bạn.
## Content Security Policy (CSP)
Để hiểu về CSP, trước hết ta cần nói về lỗ hỏng phổ biến nhất trên web: XSS - cross-site scripting.

XSS là khi một kẻ xấu xa nào đó inject Javascript vào client side code. Bạn có thể nghĩ ...
> Họ định làm gì vậy? Thay đổi màu sắc từ đỏ thành xanh?

Giả sử ai đó inject JavaScript thành công vào trang web mà bạn truy cập. Họ có thể làm những gì?
* Họ có thể tạo HTTP requests đến trang web khác và mạo danh bạn.
* Họ có thể thêm một anchor tag dẫn bạn đến một trang web giống hệt trang web bạn đang truy cập nhưng là trang web độc hại.
* Họ có thể thêm script tag với inline JavaScript.
* Họ có thể thêm script tag nạp vào mã JavaScript từ một nguồn nào đó.
* Họ có thể thêm một iframe bao phủ trang và trông giống như một phần của trang web yêu cầu bạn nhập mật khẩu.

Có rất nhiều khả năng khác có thể xảy ra.

CSP cố gắng ngăn chặn điều này xảy ra bằng cách hạn chế:
* Những gì có thể được mở trong một iframe
* Những stylesheets nào có thể được load.
* Những nơi được phép thực hiện request.

Vậy nó làm việc như thế nào?

Khi bạn click vào một link hay gõ một url vào thanh địa chỉ của trình duyệt web, trình duyệt sẽ tạo một GET request. Server sẽ xử lý request và trả về HTML cùng với một vài HTTP header. Nếu bạn muốn biết header gì được trả về, inspect trình duyệt và mở tab Network, sau đó truy cập một vài website.

Bạn có thể nhìn thấy response header trông như sau:
```
content-security-policy: default-src * data: blob:;script-src *.facebook.com *.fbcdn.net *.facebook.net *.google-analytics.com *.virtualearth.net *.google.com 127.0.0.1:* *.spotilocal.com:* 'unsafe-inline' 'unsafe-eval' *.atlassolutions.com blob: data: 'self';style-src data: blob: 'unsafe-inline' *;connect-src *.facebook.com facebook.com *.fbcdn.net *.facebook.net *.spotilocal.com:* wss://*.facebook.com:* https://fb.scanandcleanlocal.com:* *.atlassolutions.com attachment.fbsbx.com ws://localhost:* blob: *.cdninstagram.com 'self' chrome-extension://boadgeojelhgndaghljhdicfkmllpafd chrome-extension://dliochdbjfkdbacpmhlcpmleaejidimm;
```
Đó là content security policy của `facebook.com`. Thử format lại đoạn trên cho dễ nhìn hơn:
```
content-security-policy:
default-src * data: blob:;
script-src *.facebook.com *.fbcdn.net *.facebook.net *.google-analytics.com *.virtualearth.net *.google.com 127.0.0.1:* *.spotilocal.com:* 'unsafe-inline' 'unsafe-eval' *.atlassolutions.com blob: data: 'self';
style-src data: blob: 'unsafe-inline' *;
connect-src *.facebook.com facebook.com *.fbcdn.net *.facebook.net *.spotilocal.com:* wss://*.facebook.com:* https://fb.scanandcleanlocal.com:* *.atlassolutions.com attachment.fbsbx.com ws://localhost:* blob: *.cdninstagram.com 'self' chrome-extension://boadgeojelhgndaghljhdicfkmllpafd chrome-extension://dliochdbjfkdbacpmhlcpmleaejidimm;
```
Bây giờ, xem xét lần lượt từ trên xuống.
* `default-src`: policy mặc định trong việc load content như JavaScript, Images, CSS, Fonts, AJAX requests, Frames, HTML5 Media.
* `script-src`: định nghĩa các nguồn hợp lệ của Javascript.
* `style-src`: định nghĩa các nguồn hợp lệ của stylesheet.
* `connect-src`: sử dụng với `XMLHttpRequest` (AJAX), `WebSocket` hay `EventSource`. Nếu không được cho phép thì trình duyệt sẽ trả về status code là 400.

Có rất nhiều CSP directives khác ngoài những cái được liệt kê ở trên. Browser sẽ đọc CSP header và áp dụng các directives đó với mọi file HTML.

Nếu không có CSP header, mọi thứ được cho phép và không có gì hạn chế.
## HTTPS hay HTTP
Chắc chắn bạn đã nghe về HTTPS. Có thể bạn đã nghe ai đó nói ...
> Tại sao tôi cần quan tâm đến việc sử dụng HTTPS nếu tôi chỉ truy cập một trang web chơi trò chơi.

Có thể bạn đã nghe nói rằng Chrome sẽ đánh dấu trang web của bạn là không an toàn nếu đó không phải là HTTPS.

Về cốt lõi, HTTPS khá đơn giản. HTTPS được mã hóa còn HTTP thì không.

Vậy tại sao điều này lại quan trọng nếu bạn không gửi dữ liệu nhạy cảm?

Nếu bạn sử dụng wifi công cộng ở một quán cà phê không có mật khẩu thì sẽ rất dễ dàng để ai đó theo dõi được các request và response của bạn. Nếu dữ liệu không được mã hóa, ai đó có thể làm bất cứ điều gì họ muốn với nó. Họ có thể chỉnh sửa HTML, CSS, hay JavaScript trước khi nó được tiếp nhận bởi browser.

> Ok, nhưng làm thế nào máy tính của tôi và máy chủ biết cách mã hóa / giải mã nhưng MITM (Man in the Middle) thì không?
 
Đó là lý do SSL (Secure Sockets Layer) và gần đây hơn TLS (Transport Layer Security) ra đời. TLS đã thay thế SSL vào năm 1999 khi công nghệ mã hóa được sử dụng trong HTTPS. TLS làm việc như thế nào nằm ngoài phạm vi bài viết này.
## HTTP Strict-Transport-Security (HSTS)
Cái này khá đơn giản. Hãy lấy Facebook header làm một ví dụ:
```
strict-transport-security: max-age=15552000; preload
```
* `max-age` chỉ định thời gian trình duyệt nhớ để ép buộc người dùng truy cập trang web sử dụng HTTPS.
* `preload` là một dịch vụ được lưu trữ bởi Google và không phải là một phần của đặc tả HSTS.

Header này chỉ được áp dụng khi bạn truy cập trang web sử dụng HTTPS. Nếu bạn truy cập trang web thông qua HTTP, header này sẽ bị bỏ qua.

Khi bạn truy cập `facebook.com` lần đầu tiên, và bạn biết HTTPS an toàn hơn HTTP, bạn sử dụng HTTPS, `https://facebook.com`. Khi trình duyệt nhận được HTML, nó nhận được header trên và buộc bạn chuyển hướng sang HTTPS trong những lần request sau. Một tháng sau, một người bạn gửi cho bạn link đến Facebook sử dụng HTTP, `http://facebook.com` và bạn click vào nó. Vì 1 tháng nhỏ hơn 15552000 giây chỉ định bởi `max-age`, trình duyệt sẽ gửi request sử dụng HTTPS, ngăn chặn khả năng bị tấn công MITM.
## Tổng kết
Bảo mật web rất quan trọng cho dù bạn đang ở đâu trong hành trình phát triển web của mình. Bạn tiếp xúc với nó nhiều hơn sẽ ngày càng tốt hơn cho bạn. 
## Tham khảo
[https://medium.com/free-code-camp/a-quick-introduction-to-web-security-f90beaf4dd41](https://medium.com/free-code-camp/a-quick-introduction-to-web-security-f90beaf4dd41)