![](https://images.viblo.asia/f802283f-fe48-4112-aae9-64ebe07cb97b.png)

Nếu bạn là một người mới dùng **Git**, khi clone một repository sẽ có 2 lựa chọn: **Clone with HTTPS** hay **Clone with SSH**. Các bạn sẽ phân vân không biết nên dùng cái nào vì đôi khi, dùng link nào cũng clone được repository đó (yaoming), hay vì không biết chọn gì thì sẽ chọn giải pháp an toàn là **Download ZIP** (??). Rồi bạn được mentor gợi ý cài **SSH key** cho Github của mình, tạo sao nên dùng cái đó? Hãy đọc bài viết này nhé. :)

## 1. HTTPS và SSH là gì?
Chắc hẳn các bạn nào là newbie cũng có câu hỏi này nhỉ? 

Nhìn chung, HTTPS và SSH đều là những giao thức để truyền dữ liệu từ client đến server giống như HTTP, FTP, sFTP, FTPs, vv. Với giao thức HTTP, tất cả dữ liệu truyền giữa client và server đều là dạng *plain text* (văn bản thuần), và nó được truyền trên mạng Internet. Vì vậy, những dữ liệu này rất dễ bị tấn công, bị hack bởi hacker và bị chặn các yêu cầu (request). Sẽ chẳng có vấn đề gì nếu dữ liệu của bạn không quan trọng hoặc không cần được bảo mật, nhưng nếu dữ liệu đó là những thông tin cá nhân hoặc các key cần bảo mật thì sao? Chắc chắn thông tin đó cần phải được *mã hóa* đúng không? Khi đó, nếu hacker bắt được gói tin của bạn, họ cũng khó có thể lấy được thông tin nhạy cảm từ đó. Đó là lý do các giao thức an toàn hơn như HTTPS, ftps, sftp, ssh, SSL / TLS được phát triển. 

Khi làm việc với Git, ta có 2 loại repository (gọi tắt là repo) là public và private. Với các repo public thì có dùng giao thức HTTP cũng không có vấn đề gì, vì đó là những repo được công khai và ai cũng có thể sử dụng nó. Nhưng với các repo private thì cần những phương thức bảo mật hơn để truyền dữ liệu giữa các developer (những người có quyền làm việc với repo private) với repo đó, tránh bị hacker tấn công. 

Git dùng một số giao thức nhưng phổ biến nhất là HTTPS và SSH. Các Git server như Github, Gitlab, Bitbuckets cũng sử dụng 2 phương thức này. Chúng đều là các giao thức đáng tin cậy và an toàn.

### HTTPS
Đây là giao thức bảo mật hơn của HTTP, dữ liệu được truyền đi đều được mã hóa. HTTPS sử dụng cổng 443 đều tạo kết nối. Phương thức xác thực là sử dụng *cặp public/private key*.  Đây là phương thức được sử dụng phổ biến.
### SSH:
SSH viết tắt của [Secured Shell](https://en.wikipedia.org/wiki/Secure_Shell_Protocol). Nó cũng là 1 giao thức an toàn, dữ liệu đều được mã hóa. SSH sử dụng cổng 22 để tạo kết nối và xác thực. Việc xác thực các thiết bị từ xa sử dụng mã khóa công khai (public-key cryptography). Phương thức xác thực là *cặp public/private key hoặc userid/password*. Chúng được sử dụng để giảm rủi ro khi đăng nhập máy chủ từ xa (remote server).

**SSH làm việc như thế nào?**

Giả sử, chúng ta có 1 máy client (thường là máy local của bạn) và 1 máy server (có thể liên tưởng đến git server như Github). Khi cài đặt SSH key, bạn sẽ có 1 cặp public/private key. Server sẽ giữ public key, còn private key lưu ở máy client. Giống như khi bạn lưu public key vào tài khoản Github vậy. Khi client muốn kết nối với server:
* Client sẽ gửi ID trong cặp khóa để xác thực danh tính
* Server nhận được sẽ dùng public key để mã hóa nó và gửi lại cho client. 
* Client nhận lại và dùng private key để giải mã và gửi lại server. Khi đó, kết nối được tạo ra và client sẽ có thể làm việc với server. 

Nói một cách ngắn gọn, khi cài đặt SSH key, bạn sẽ có cặp public/private key. Public key lưu ở Git server, private key lưu ở local. Khi bạn muốn thực hiện hành động trên Git, private key của bạn phải khớp với public key trên server. Khi thiết nối được tạo ra, bạn sẽ ko cần sử dụng đến username và password nữa. 

Bây giờ, chúng ta sẽ nói về HTTPS và SSH trong Git sâu hơn nhé.
## 2. HTTPS
Khi sử dụng HTTPS, tất cả các thao tác với Git đều rất dễ dàng, không cần phải cài đặt thêm gì cả. Tuy nhiên, khi fetch, push hoặc pull, Git sẽ yêu cầu bạn nhập tên tài khoản và mật khẩu, vì nó dùng xác thực dựa trên mật khẩu. Vì vậy, để không phải nhập nhiều lần, các bạn hãy cài đặt global username và password, và nhớ đặt mật khẩu mạnh mẽ chút chút nhé.

**Tại sao nên dùng HTTPS?**
* HTTPS được sử dụng khá phổ biến, nhiều người biết nhất nên những người mới sử dụng sẽ thấy dễ dàng hơn và dễ hiểu hơn vì không cần cài đặt gì nhiều cả.
* Không yêu cầu phải tạo và cài đặt cặp key trên Git server như khi dùng SSH key.
* Rất dễ dàng để có thể truy cập và làm việc với các repo trên Git tại nhiều nơi, chỉ cần bạn cung cấp đúng thông tin tài khoản.
* HTTPS là cổng *open firewall* và không yêu cầu cài đặt lại firewall.

**Nhược điểm**
* Mỗi khi thực hiện thao tác với repo, bạn phải nhập lại username/password. Để khắc phục nó, bạn có thể cài đặt những thông tin này bằng git global hoặc sử dụng những công cụ quản lý tài quản khác. Tuy nhiên, nếu bạn thay đổi username/password, bạn phải cài đặt lại những chỗ liên quan. :)
* Nếu bạn bị lộ thông tin tài khoản, tất cả các repo bạn được phép truy cập đều có thể bị đe dọa như đổi owner, xóa dữ liệu hoặc các hành động trái phép khác. 
* Nếu bạn sử dụng mật khẩu 2 lớp (*two-factor authentication enabled(2FA))*, bạn sẽ phải dùng *personal access token(PAT)* thay cho mật khẩu thông thường. Như vậy, việc xác thực sẽ rất mất thời gian. 

**Chú ý khi dùng HTTPS**
* Dùng mật khẩu mạnh
* Không để lộ, làm mất thông tin tài khoản Git.
## 3. SSH
SSH sử dụng mã hóa khóa công khai (public key encryption) để thực hiện xác thực và bảo vệ dữ liệu. Để sử dụng nó, bạn phải tạo ra cặp SSH key trên máy tính của mình và lưu lại private key, thêm public key vào tài khoản Git server của mình. Cách cài đặt [ở đây](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) nha.

Sau khi cài đặt xong, bạn sẽ không cần làm gì thêm khi push, pull hay fetch nữa.

**Tại sao nên dùng SSH?**
* Sử dụng SSH an toàn hoan dùng mật khẩu thông thường.
* Không yêu cầu nhập username/password để xác thực như HTTPS. (**đây là nguyên nhân chính nè (hihi)**)
* Không yêu cầu nhập PAT khi dùng bảo mật 2 lớp.
* Nếu bạn mất private key, các dữ liệu git của bạn vẫn bị đe dọa. Tuy nhiên, tài khoản Git server của bạn vẫn còn. Khi đó, bạn có thể vào tài khoản đó, thực hiện các biện pháp để ngăn chặn bị tấn công ngay lập tức (ahihi).
* Có vẻ SSH bảo mật hơn HTTPS vì nó ko dùng mật khẩu để xác thực. 

**Nhược điểm**
* Bạn vẫn phải có tài khoản Git server để clone repo nhé.
* Đôi khi, Networks and Firewall có thể không cho phép kết nối SSH. Tuy nhiên, bạn vẫn có thể cài đặt lại. :)
* Việc cài đặt bàn đầu hơi mất thời gian, tuy nhiên nó không hề khó nha.

## Tổng kết
Tóm lại, bạn có thể dùng loại giao thức nào đều được, vì chúng đều là các giao thức bảo mật dữ liệu. Bài viết giúp các bạn hiểu tại sao chúng ta lại dùng 1 trong 2 cách đó mà thôi, và giúp các bạn mới đỡ hoang mang khi được gợi ý dùng *SSH key* thui. 

Cảm ơn các bạn đã đọc đến đây. Hẹn gặp lại.

# Tài liệu tham khảo
Cài đặt SSH key: 
https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account

https://ourtechroom.com/tech/https-vs-ssh-in-git/#toc2

https://www.keycdn.com/blog/difference-between-http-and-https