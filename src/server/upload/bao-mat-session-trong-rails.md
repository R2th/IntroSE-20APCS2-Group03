## Introduction
Hầu hết các frameworks phát triển web hiện này đều hỗ trợ và giúp đỡ các developer rất nhiều trong việc xây dựng các ứng dụng web. Một vài trong chúng còn giúp bảo mật tốt hơn cho ứng dụng web. Trong thực tế, không có một framework nào là hoàn hảo: nếu bạn sử dụng chúng một cách thông minh và khéo léo, bạn có thể xây dựng các ứng dụng có độ bảo mật cao với nhiều framework. Ruby on rails có một vài method như vậy, ví dụ như chống lại các cuộc tấn công SQL injection chẳng hạn.

Vấn đề bảo mật còn phụ thuộc vào người sử dụng framework, đôi khi còn vào phương thức phát triển. Và nó phụ thuộc vào tất cả các tầng của môi trường web: lưu trữ ở back-end, web server và web app. Tập đoàn Gartner ước tính, 75% các vụ tấn công nằm ở tầng web application, và tìm thấy rằng trong 300 trang web được khảo sát, có đến 97% chứa lỗ hổng để tấn công. Bởi vì, các web app này tương đối dễ tấn công, vì chúng rất dễ hiểu và thực thi, ngay cả đối với người bình thường.

Các lỗ hổng đối với các ứng dụng web bao gồm: chiếm đoạt tài khoản người dùng, bỏ qua việc kiểm soát truy cập, đọc và thay đổi những dữ liệu nhạy cảm, hay trình bày những nội dung gian lận. Hoặc kẻ tấn công có thể cài đặt một chương trình Trojan, hoặc phần mềm gửi thư không mong muốn, nhằm mục đích xấu. Để ngăn chặn các cuộc tấn công, giảm thiểu tác động của chúng và loại bỏ các lỗ hổng, trước hết bạn phải hiểu đầy đủ các phương pháp tấn công để tìm ra biện pháp đối phó chính xác, đó là những gì bài viết này hướng đến.
## Sessions
Nơi phù hợp để bắt đầu là với sessions, cái mà khá dễ bị tấn công
Sessions là gì?
```
 HTTP is a stateless protocol. Sessions make it stateful.
```
Hầu hết các ứng dụng cần theo dõi trạng thái của một người dùng cụ thể. Ví dụ như nội dung của giỏ mua hàng hoặc id của người dùng đang đăng nhập. Nếu không có sessions, người dùng phải định danh, authenticate trên mỗi request của mình. Rails sẽ tự động tạo một session mới khi người dùng bắt đầu truy cập vào ứng dụng. Về sau, nó sẽ load session đang tồn tại nếu người dùng đã sử dụng ứng dụng rùi.

Một session là một hash các giá trị và thêm một session ID thường là một chuỗi string 32 kí tự để định danh hash. Mỗi cookie được gửi đến trình duyệt của client chứa ID của session. Và trình duyệt sẽ gửi nó đến server với mỗi request từ client. Trong Rails, bạn có thể save hay get các giá trị đó bằng các method của session:
```ruby
 session[:user_id] = @current_user.id
    User.find(session[:user_id])
```
### Session ID
```ruby
    The session ID is a 32-character random hex string.
```
Hầu hết các ứng dụng web đều có một hệ thống authenticate: một người dùng cung cấp user name và password, sau đó ứng dụng web kiểm tra và lưu user id tương ứng vào session. Với mỗi request từ người dùng, ứng dụng web sẽ xác thực user bằng user id của session mà không cần một authenticate mới.

Cookie đóng vai trò xác thực tạm thời cho các ứng dụng web. Do vậy, bất kì ai lấy được cookie đó có thể sử dụng các ứng dụng web như với quyền của người dùng đó, với những hậu quả nghiêm trọng có thể xảy ra. Dưới đây là một số cách để hack một session và các biện pháp để đối phó với chúng:

* Sniff cookie trong một mạng không an toàn, chẳng hạn như một mạng LAN không dây, Với một mạng LAN không dây không được mã hóa, thật là dễ dàng để nghe được các traffic của tất cả các clients đã kết nối. Đứng về góc nhìn của nhà phát triển web, chúng ta cần cung cấp một kết nối an toàn qua SSL. Kể từ Rails 3.1 trở đi, điều này có thể thực hiện bằng việc config SSL trong file config
  `  config.force_ssl = true`
* Hầu hết người dùng không có thói quen clear cookie sau khi truy cập tại một điểm internet công cộng nào đó, như quán nét chẳng hạn. Vì vậy, nếu người dùng cuối quên chưa log out khỏi ứng dụng web, bạn có thể thể sử dụng chúng với quyền user này. Hãy cung cấp một button log-out trong ứng dụng của bạn và đặt nó ở chỗ bắt mắt.
* Có rất nhiều các cuộc tấn công cross-site scripting (XSS) nhắm vào cookie của người dùng. Chi tiết hơn bạn có thể tham khảo tại: http://guides.rubyonrails.org/security.html#cross-site-scripting-xss
### Lưu ý khi sử dụng session
* Không lưu trữ những objects lớn trong một session. Thay vào đó, bạn nên lưu chúng và database và save id của chúng trong session. Điều này sẽ dễ dàng trong việc đồng bộ và tránh tràn bộ nhớ session. Đây cũng là một ý tưởng hay, nếu bạn sửa đổi cấu trúc của một đối tượng, thì bạn vẫn dễ dàng đồng bộ chúng vì bạn chỉ lưu id của đối tượng trong session.
* Dữ liệu quan trọng không nên lưu trong session. Nếu người dùng xóa cookie của họ hoặc đóng trình duyệt, chúng sẽ bị mất.

### Lưu trữ session
 Rails cung cấp một vài công cụ lưu trữ session, điển hình là
```ruby
    ActionDispatch::Session::CookieStore.
```
CookieStore lưu session hash trực tiếp tại cookie phía client. Phía server nhận session hash từ cookie và get session ID. Điều đó sẽ làm tăng đáng kể tốc độ của ứng dụng, nhưng đó là một storage gây tranh cãi và bạn phải nghĩ về các vấn đề bảo mật xung quanh nó:

* Cookies lưu trữ được tối đa dữ liệu 4kB. Điều này hoàn toàn hợp lý vì không nên lưu trữ một lượng dữ liệu lớn trong một session. Thường chỉ lưu id của database trong cookies.
* Client có thể xem mọi thứ mà bạn lưu trữ trong một session, bởi vì nó được lưu trữ ở dạng clear-text(dạng base64 encoded). Vì vậy bạn không muốn lưu trữ bất kì dữ liệu bí mật ở đây. Để ngăn chặn giả mạo, một digest đã được tạo từ session với một secret phía server(secrets.secret_key) và chèn vào phần cuối của cookie.
Tuy nhiên, kể từ Rails 4, storage default là EncryptedCookieStore. Với EncryptedCookieStore, session được mã hóa trước khi được lưu trữ vào cookie. Điều này sẽ ngăn chặn người dùng truy cập và giả mạo nội dung của cookie. Do vậy session trở thành một nơi an toàn để lưu trữ dữ liệu. secrets.secret_key được lưu trong config/secrets.yml

Do vậy, vấn đề bảo mật phụ thuộc hoàn toàn vào secret key này, và một giải thuật digest(thường default là SHA1). secrets.secret_key_base được sử dụng như một khóa đặc biệt cho phép session được verify lại nhằm ngăn chặn giả mạo.
```ruby
 development:
      secret_key_base: a75d...

    test:
      secret_key_base: 492f...

    production:
      secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>
```
### Tấn công CookieStore Sessions
Nó làm việc như sau:

* Một người dùng get tài khoản tín dụng, số tiền được lưu trong session(đó là ý tưởng tồi tệ, nhưng giả sử vậy)
* Người dùng mua thứ gì đó
* Số tiền tín dụng giảm và giá trị mới được thay đổi trong session
* Người dùng copy cookie từ bước trước khi mua và replace vào cookie mới
* Người dùng có tài khoản nguyên bản khi chưa mua
Việc add thêm một Nonce trong session sẽ giải quyết được replay attacks. Một nonce chỉ valid một lần, và server phải theo dõi tất cả nonces valid. Công việc trở nên phức tạp hơn nếu hệ thống chạy trên một vài servers. Lưu trữ nonces trong database sẽ ngăn chặn toàn bộ muc đích của CookieStore .

Giải pháp tốt nhất chống lại nó là không lưu trữ bất kì dữ liệu loại này trong session, mà chỉ lưu trong database. Trong trường hợp này thì thông tin credit nên lưu trong database, còn logged_in_user_id trong session
### Session Fixation
![](https://images.viblo.asia/f50bb303-c90b-448d-9637-661bdec0dd93.png)
Phía bên trên là sơ đồ một cuộc tấn công session fixation. Cuộc tấn công tập trung vào việc thay đổi ID session của nạn nhân để tấn công, ép trình duyệt của nạn nhân sử dụng một ID session nào đó mà không cần thiết ăn cắp session ID của người dùng, các bước được cụ thể hóa như sau:

* Hacker tạo một session ID hợp lệ tại một hệ thống tín dụng nào đó chẳng hạn, login đăng nhập và get lấy một session ID hợp lệ, như hành động 1 và 2
* Truy cập định kì vào ứng dụng để giữ session luôn ở trạng thái action
* Kẻ tấn công xâm nhập và thay đổi buộc trình duyệt của người dùng sử dụng session ID bên trên(hành động số 3). Do không thể thay đổi cookie của một tên miền khác nên hacker có thể chạy một mã javascript từ tên miền của ứng dụng mục tiêu. Ịnjection một mã JS vào ứng dụng bằng XSS. Ví dụ như:
```ruby
    <script>document.cookie="_session_id=16d5b78abb28e3d6206b60f22a03c8d9";</script>
```
* Kẻ tấn công bẫy nạn nhân click vào một trang có chứa mã Javascript đó. Do vậy trình duyệt nạn nhận sẽ tự động thay đổi session ID
* Khi session ID bẫy được sử dụng, nạn nhận truy cập lại hệ thống tín dụng và tất nhiên, yêu cầu xác thực để login.
* Kể từ bây giờ cả nạn nhân và hacker đồng thời sử dụng hệ thống tín dụng với cùng một session. Session có hiệu lực mà nạn nhân không hề hay biết
### Session Fixation - Cách giải quyết
Cách giải quyết hiệu quả nhất là định danh một session mới và loại bỏ session cũ sau khi đăng nhập thành công. Bằng cách đó, hacker không thể sử dụng session cố định. Đây cũng là một biện pháp hiệu quả chống ăn cắp session. Dưới đây là cách để tạo ra một session mới trong Rails:
```ruby
  reset_session
```
Nếu bạn đang sử dụng gem Devise, nó sẽ tự động tạo mới và hết hạn các session ID sau khi bạn đăng nhập. Sau khi đăng nhập session cũ bị loại bỏ và session mới được sinh ra. Một biện pháp đối phó khác là lưu các thuộc tính đặc trưng của người dùng trong session, xác minh chúng mỗi lần request, và deny nếu không hợp lệ. Chẳng hạn như địa chỉ IP hoặc tên trình duyệt web. Khi lưu địa chỉ IP, bạn phải nhớ rằng các nhà cung cấp dịch vụ internet ẩn người dùng của họ đằng sau các proxy.
### Session Expiry

Có thể set thời gian hết hạn expires date của cookie với một session ID. Tuy nhiên, phía client có thể edit cookie trong trình duyệt nên việc set expires cho session phía server sẽ an toàn hơn. Dưới đây là ví dụ để set expires của session trong database:
```ruby
    class Session < ApplicationRecord
      def self.sweep(time = 1.hour)
        if time.is_a?(String)
          time = time.split.inject { |count, unit| count.to_i.send(unit) }
        end

        delete_all "updated_at < '#{time.ago.to_s(:db)}'"
      end
    end
```
## Lời kết
Trên đây là cách thức hoạt động, tấn công và phương pháp phòng tránh đối với kiểu tấn công session.