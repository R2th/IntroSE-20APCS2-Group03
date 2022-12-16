![](https://images.viblo.asia/5673cbb8-c947-4b40-901c-84461d618756.jpg)
### Mở đầu
Việc cho phép nhiều người dùng đăng nhập vào các trang web app cực xịn của bạn chưa bao giờ dễ dàng đến thế. Người dùng gửi request bao gồm tài khoản, mật khẩu,....  sau đó bạn kiểm tra xem người dùng có "bịp" mình không, nếu đạt yêu cầu bạn sẽ cấp cho người dùng ID của họ. Đoạn code trông sẽ như thế này:
```
if user = User.authenticate(username, password)
  session[:user_id] = user.id
end
```
Tất nhiên là đoạn code này nó hoạt động rất tốt, đúng như mong đợi, tuy nhiên nó không hoàn toàn được bảo mật cho lắm. Hiện tại framework Ruby on Rails chỉ đảm bảo rằng người dùng không thể đọc hoặc giả mạo nội dung session của bạn, nhưng nó lại không thể ngăn một hacker nào đó vô trộm mất cái session cookies và sử dụng trong mục đích cá nhân, tệ hơn nữa là bọn chúng mạo danh nạn nhân để trục lợi.

Sau khi đọc bài hướng dẫn này, bạn sẽ biết:
* Sesion là gì?
* Session ID
* Kĩ thuật hack Session Hijacking
* Session Guidelines

### Session
1. Session là gì ?
> HTTP is a stateless protocol. Sessions make it stateful.

Một session hay còn gọi là một "phiên" làm việc. Trong Computer Science, nó đơn giản là cách giao tiếp giữa client (ở đây là trình duyệt web hoặc ứng dụng trên thiết bị của bạn) với server.
2. Session được tạo ra như thế nào? 
Một session được khởi tạo khi client gửi request đến sever, nó tồn tại xuyên suốt từ trang này đến trang khác trong ứng dụng và chỉ kết thúc khi hết thời gian timeout hoặc khi bạn close ứng dụng. 
3. Session được lưu ở đâu?
Những gì bạn ghi trong session sẽ được lưu trong một tệp tin trên server. Chính vì điều này, nếu bạn dùng session một cách vô tội vạ thì sẽ khiến cho server phải lưu rất nhiều. Đặc biệt nếu ứng dụng đó có đến vài triệu người dùng chẳng hạn thì … điều đó thật là kinh khủng. Thông thường chúng ta chỉ nên lưu trữ những thông tin tạm thời trong session VD như: thông tin đăng nhập, thông tin các sản phẩm trong giỏ hàng…

### SessionID
> The session ID is a 32-character random hex string  

Session ID được tạo ra bằng cách sử dụng  `SecureRandom.hex`. `SecureRandom.hex` sẽ tạo ra một đoạn chuỗi thập lục phân một cách ngẫu nhiên bằng việc sử dụng các thư viện phần mềm bảo mật truyền thông (OpenSSL, /dev/urandom hoặc Win32 CryptoAPI) cho việc tạo ra một đoạn mã hóa số. Hiện tại việc dùng kĩ thuật [Brute-force](https://quantrimang.com/cuoc-tan-cong-brute-force-la-gi-157987)  vẫn chưa thể lấy được session ID nên các bạn có thể yên tâm rùi :)).
Nói nôm na đoạn session ID sẽ được tạo thông qua  trong rails, VD, bạn bật terminal lên và gõ:
```
$ cd ~/<tên project của bạn>
$ rails c
> SecureRandom.hex(12)
=> "dce23eb4d475bd032ed843e7"
```
`"dce23eb4d475bd032ed843e7"` chính là session ID.
Với mỗi session sẽ được cấp phát một định danh Session ID duy nhất. Khi kết thúc một phiên làm việc và bắt đầu một phiên mới, bạn sẽ được cấp một SessionID khác với trước đó.

### Session Hijacking
> Stealing a user's session ID lets an attacker use the web application in the victim's name.

Như chúng ta đã biết, quá trình xác thực người dùng của một app nó sẽ diễn ra như thế này:
(Trường hợp này sẽ diễn ra một cách bình thường, nên mình sẽ bỏ qua trường hợp người dùng nhập sai)
![](https://images.viblo.asia/52bf5726-2bd2-4d13-85f8-afffdf62fd0a.png)

* (1) Client sẽ gửi request lên phía server, bao gồm email, password
* (2) Phía server nhận request, lấy email, mật khẩu, thực hiện quá trình xác thực người dùng, nếu đúng server sẽ lưu user_id của người dùng vào session trên server, đồng thời tạo ra session ID.
* (3) Server trả về View và cookies, trong cookies này có chứa session ID mà ở bước 2 đã tạo.
* (4) Client nhận View và Cookies
* (5) Client thực hiện bước (1), tuy nhiên lần này sẽ không gửi email, password nữa mà sẽ gửi session ID
* (6) Server so sánh session ID của cookies với cái đã lưu trên server
* (7) Server trả về view
* (8) Client nhận view

Trên kia là những bước xác thực người dùng, từ bây giờ, một "phiên" của người dùng sẽ là hợp lệ. Bất kì request nào server sẽ kiểm tra session ID mà không cần phải xác nhận lần nào nữa. Do vậy, session đóng vai trò xác thực tạm thời cho ứng dụng web, bất cứ ai chiếm được session ID từ người khác, đều có thể sử dụng ứng dụng web với tư cách là người dùng đó.

Hijacking là một kĩ thuật lấy cắp session ID của một người dùng và cho phép hacker sử dụng ứng dụng web dưới quyền của nạn nhân. Dưới đây là một số cách để chiếm quyền điều khiển session và các biện pháp đối phó:
* Dò cookie trong một mạng lưới internet không an toàn. Mạng cục bộ không dây (WLAN) là một ví dụ cho những mạng lưới như thế, vì trong mạng lưới này các thông tin sẽ không được mã hóa, và ta sã phải sử dụng SSL để thiết lập bảo vệ cho ứng dụng. 
    Trong Rails 3.1 trở lên, điều này có thể được thực hiện bằng cách luôn buộc kết nối SSL trong tệp `config/application.rb` của bạn:
```
config.force_ssl = true
```
* Đi chơi net nhưng quên không đăng xuất facebook cũng là một ví dụ cho việc hack hijacking, khi đó hacker có sẵn trong tay mọi thông tin của bạn mà không phải động phím gì cả :))  
Cách phòng chống: xóa cookies, đăng xuất, tắt trình duyệt, tắt máy,..... (và nhớ trả tiền net :) )
* Sử dụng kĩ thuật XSS (cái này mình chịu, nhưng đọc ở một số trang web có nên ghi tạm vào :v )
* Ngoài ra còn có kĩ thuật Session Fixation, cũng khá giống Hijacking,  thay vì đánh cắp một cookies từ người dùng, hacker sẽ dùng một cookies khác, cái mà hacker biết rõ nó (hoặc tạo ra một cái), gán cho người dùng, lúc này session ID mà người dùng sẽ là của hacker  
Cách phòng chống: sử dụng [reset_session](https://apidock.com/rails/ActionController/Base/reset_session)

### Session Guidelines
Dưới đây là một số hướng dẫn chung về sử dụng session:
* Không lưu trữ large objects trong một phiên. Thay vào đó, bạn nên lưu trữ chúng trong database và lưu id của chúng trong phiên. Điều này sẽ giúp cho data không lấp đầy không gian lưu trữ trong session của bạn (tùy thuộc vào dung lượng lưu trữ session bạn đã chọn). Đây cũng sẽ là một ý tưởng tốt, nếu bạn sửa đổi cấu trúc của một đối tượng và các phiên bản cũ của nó vẫn còn trong một số cookie của người dùng. Với các kho lưu trữ phía server, bạn có thể xóa các phiên, nhưng với các kho lưu trữ phía máy khách, điều này rất khó để giảm thiểu.
* Dữ liệu quan trọng không nên được lưu trữ trong session. Nếu người dùng xóa cookie hoặc đóng trình duyệt, họ sẽ bị mất đống dữ liệu đó. Và với bộ lưu trữ session storage phía máy khách, người dùng có thể đọc được đống dữ liệu.

### Lời kết
Trên đây là những kiến thức mà mình biết được khi lang thang trên world-wide-web, cảm ơn mọi người đã đọc bài viết. Hi vọng mọi người có thể comment các thiếu sót trong bài viết của mình. Mình xin cảm ơn ^^ (Thankyou)