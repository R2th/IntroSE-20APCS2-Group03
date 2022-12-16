Trước khi đi sâu vào checklist cho một ứng dụng Rails, bạn có thể hỏi, "Không phải [Brakeman](https://brakemanscanner.org/) và các đánh giá pull request là đủ rồi sao?"

Chắc chắn, các vấn đề về SQL injection có thể được phát hiện ra bằng các công cụ tự động, điều này thật tuyệt. Nó được cải tiến một cách liên tục. Nhưng họ vẫn có thể bỏ lỡ một số vấn đề. Ví dụ: họ không thể tìm thấy lỗ hổng trong logic ứng dụng. Vì vậy, sẽ không tuyệt vời khi tự tin hơn về bảo mật bằng cách sử dụng Brakeman, kiểm tra lỗ hổng logic và phát triển các quy tắc chung để các vấn đề trong quá khứ không lặp lại?

Hướng dẫn này bao gồm hai điểm cuối cùng bằng cách xem xét trên 10 lỗ hổng hàng đầu được tìm thấy bởi Dự án Bảo mật Ứng dụng Web Mở (OWASP). Một số điều sau đây đã được Brakeman đề cập, nhưng tôi đã đưa vào một số ví dụ và đề xuất thực tế về các chính sách mã hóa chung để bảo mật hơn. Tất nhiên, nếu bạn chỉ đang tìm kiếm các giải pháp nhanh chóng và không quá nhiều cho chiến lược, hãy chú ý đến phần "Hành động" bên dưới.

# A1 SQL Injection
Dưới đây là [lỗ hổng SQL injection từ dự án nguồn mở](https://github.com/fatfreecrm/fat_free_crm/commit/078035f1ef73ed85285ac9d128c3c5f670cef066#diff-14dfef9f01460f69f175a8e6bd7d143dL66) hiện đã được khắc phục
```Ruby
comments, emails = params[:id].split("+") 
Comment.update_all("state = '#{params[:state]}'", "id IN 
(#{comments})") unless comments.blank?
```
Điều này dễ bị tấn công bởi SQL injection thông qua cả hai tham số: `params[:state]` và `params[:id]`. Kẻ tấn công có thể cập nhật `comments.user_id` thành ID của chúng để sở hữu tất cả và do đó có thể đọc tất cả:
```
http://localhost:3000/timeline?id=1&type=&state=2', user_id = '1
```
Điều đó nhắc nhở chúng ta về hai chính sách chính chúng ta nên luôn luôn quan tâm:
* Xem xét tất cả các tham số do người dùng cung cấp và thuộc tính có thể gây hại
* Không bao giờ sử dụng chuỗi (# {...}) trong chuỗi SQL, ngay cả khi bạn hoàn toàn chắc chắn rằng giá trị được chèn là an toàn. Cũng tránh internal model scopes hoặc methods mà tất cả đầu vào được kiểm soát bởi chính bạn. Điều này là để ngăn chặn sự nhầm lẫn là ai chịu trách nhiệm cho việc thoát khỏi đầu vào của người dùng, mà nên luôn luôn là phương thức mà cuối cùng đưa chuỗi vào trong SQL cuối cùng.
## Hành động
* Tìm hiểu về SQL injection trong [lesser-known ARel methods](http://rails-sqli.org/), như ` User.order("#{params[:sortby]} ASC")`
* Thực hiện tìm kiếm thủ công trong toàn bộ dự án của bạn và tìm kiếm các phương pháp trong [trang tính lừa đảo này](https://rorsecurity.info/sql-injection-in-rails). Họ có sử dụng trực tiếp giá trị do người dùng cung cấp không?
* Sử dụng Hash hoặc Array form cho các điều kiện SQL, chuyển đổi các số nguyên mong muốn thành các số nguyên, và đưa vào danh sách trắng hoặc khử trùng các tham số khác. Sử dụng các biện pháp đối phó này ngay cả khi bạn chắc chắn rằng không có cách nào để người dùng ảnh hưởng đến thông số. Đây là tuyến phòng thủ thứ hai và làm cho code tương lai. Các developer khác có thể sử dụng phương thức của bạn sau sáu tháng với dữ liệu do người dùng cung cấp.
# A1 Other Injection
Hãy xem [một đoạn trích khác từ cùng một commit](https://github.com/fatfreecrm/fat_free_crm/commit/078035f1ef73ed85285ac9d128c3c5f670cef066#diff-14dfef9f01460f69f175a8e6bd7d143dL61)
```
model = params[:type].camelize.constantize 
item = model.find(params[:id]) 
item.update_attribute(:state, params[:state])
```
Điều này là dễ bị tổn thương khi Ruby class injection. Kẻ tấn công có thể định nghĩa một tham số tùy ý [:type] Ruby class đáp ứng các phương thức `find()` và `update_attribute()` và sau đó cập nhật trạng thái của một đối tượng tùy ý thông qua `params[:state]`

Điều đó nhắc nhở chúng ta một lần nữa rằng chúng ta cần phải kiểm tra lại tất cả các tham số khi chúng trở về từ người dùng

Một loại nữa là [command line injection](https://rorsecurity.info/portfolio/command-injection-in-rails) có thể xảy ra trong các phương thức dòng lệnh Rails (`%x[]`, `system()`, `exec()`, …). Vì thế đừng sử dụng `system("ls", params[:options])`. Kẻ tấn công có thể chuỗi lệnh bằng cách sử dụng các toán tử sau: &, &&, |, ||, v.v.
## Hành động
* Kiểm tra lại việc sử dụng [constantize](http://api.rubyonrails.org/classes/String.html#method-i-constantize), [classify](http://api.rubyonrails.org/classes/ActiveSupport/Inflector.html#method-i-classify), and [safe_constantize](http://api.rubyonrails.org/classes/String.html#method-i-safe_constantize). Đảm bảo rằng tên class không bị ảnh hưởng bởi người dùng.
* Chống lại command line injection, làm tương tự cho các phương thức `%x[]`, `system()`, `exec()`, …
# A2 Sessions và cookies
Tóm lại, cookie (và sessions) có thể bị đánh cắp, [phát lại](https://en.wikipedia.org/wiki/Replay_attack) và đôi khi được sửa đổi hoặc đọc. Ngày nay, các cookie phiên Rails được gắn cờ là [HttpOnly](https://rorsecurity.info/portfolio/httponly-cookies-in-rails) theo mặc định, do đó, session cookie không thể bị đánh cắp với lỗ hổng XSS nữa. Nhưng nếu bạn sử dụng các cookie khác, chúng cũng sẽ cần được gắn cờ. Nhân tiện, tính năng “remember me” của Devise là dựa trên cookie và đã được đánh dấu là HttpOnly
## Hành động
* Tìm kiếm truy cập `cookie` trên
* Gán mọi thứ như `cookies[:user_name], cookies.signed[:user_id]` hoặc `cookies.permanent[:login]` thành 1 hash như `cookies[:login] = {value: "user", httponly: true}`

Khi tất cả được thực hiện, vẫn có khả năng người dùng tự phát lại cookie hoặc sửa đổi chúng. Đó là lý do tại sao điều quan trọng là không lưu trữ "state" trong session hoặc cookie. Ví dụ phổ biến là trình hướng dẫn bạn thêm phiếu giảm giá một lần vào session ở Bước 2. Nếu người dùng sao chép session cookie trong Bước 2, người đó có thể sử dụng lại phiếu giảm giá một lần sau này bằng cách dán lại cookie vào trình duyệt. Điều này thường chỉ xảy ra với các  cookie-based sessions.

Ngoài ra, điều quan trọng cần nhớ là `cookie [: user_name]` và `cookies.permanent [: login]` có thể bị sửa đổi bởi người dùng
## Hành động
* Tìm kiếm toàn bộ dự án cho các truy cập `cookie` và `session`. Nếu code lưu trữ một cái gì đó trong đó, liệu giá trị này có gây hại nếu nó được dán lại sau này không? Ví dụ: trong bước sau trong trình hướng dẫn, trong session tiếp theo hoặc trong một tài khoản hoàn toàn khác? Và trong cùng một bước, hãy kiểm tra xem giá trị đó có hay không phải là một bí mật. Người dùng có nên biết về điều đó không?
* Nếu là một cookie đơn giản (`cookie [: user_name]`, `cookies.permanent [: login]`), một cookie đã ký (`cookies.signed [: user_id]`), hoặc session không được mã hóa, mã hóa cookie / session hoặc không lưu trữ trong đó.
* Khi bạn đang đọc giá trị từ `cookie [: user_name]` hoặc `cookie.permanent [: login]`, bạn có đang xác thực lại giá trị không? Nó có thể đã được sửa đổi bởi người dùng.

Nếu ứng dụng chỉ là HTTPS, bạn có thể dễ dàng thêm cờ Bảo mật vào session cookie và tất cả các cookie khác để nó không bị rò rỉ trong chuyển hướng từ HTTP sang HTTPS.
## Hành động
* Tìm kiếm trình truy cập `cookie` lần nữa và đánh dấu chúng là "secure": `cookie [: login] = {value: "user", httponly: true, secure: true}`
* Thêm một cờ tương tự trong `config/initializers/session_store.rb`

# A2 Xác thực - Authentication
Bạn có thể nói, “Tôi ổn. Tôi sử dụng Devise, và nó hoạt động tốt. ”Nó có, nhưng vẫn còn một vài điều bạn có thể kiểm tra và một số biện pháp bảo mật bổ sung mà bạn có thể thêm vào.
## Hành động
* Bạn có thể có một kiểm tra xác thực trong ApplicationController, vì vậy mỗi hành động mới được xác thực. Nếu bạn đang thực hiện kiểm tra đầy đủ, hãy đảm bảo rằng bộ lọc xác thực không bao giờ bị bỏ qua ở đâu đó
* Mật khẩu có thể quá ngắn, quá đơn giản hoặc có thể được yêu cầu thay đổi hai tháng một lần nhưng người dùng luôn chuyển sang những từ mà họ đã sử dụng trước đây. Điều đó có an toàn không? Tùy thuộc vào yêu cầu của bạn, nhưng nó chắc chắn đáng để suy nghĩ. [Tiện ích mở rộng Devise](https://github.com/phatworx/devise_security_extension) này cho phép bạn hết hạn mật khẩu sau một thời gian và lưu trữ mật khẩu để chúng không thể sử dụng được nữa. Cấu hình Devise cũng bao gồm một tùy chọn cho độ dài mật khẩu tối thiểu. Và đây là một [cuộc thảo luận và triển khai](https://github.com/loomio/loomio/issues/1872) cho các mật khẩu phức tạp hơn.
* Kiểm tra chiến lược của bạn chống lại sự cưỡng bức (against brute-forcing). Nếu có thể, hãy sử dụng [mô-đun Devise](http://www.rubydoc.info/github/plataformatec/devise/master/Devise/Models/Lockable) để khóa người dùng sau một số lần đăng nhập thất bại. Sử dụng [Rack::Attack](https://rorsecurity.info/portfolio/rackattack-rate-limits-against-ddos-and-abusive-users) để xếp hạng các yêu cầu giới hạn mà bạn chọn. Hoặc thêm Captchas vào trang đăng nhập / đăng ký / mở khóa bằng [tiện ích mở rộng Devise](https://github.com/phatworx/devise_security_extension).
# A3 XSS
Trước tiên, bạn cần escaping strategy. Điều đó có nghĩa là tìm ra lớp kiến trúc nào chịu trách nhiệm thoát và những gì cần được thoát.

Hãy xem [ví dụ đầu tiên từ Discourse](https://github.com/discourse/discourse) có tính năng bỏ phiếu bằng các hộp bật lên trong giao diện người dùng. [Pull request này](https://github.com/discourse/discourse/pull/3442/files) cho thấy rằng điều quan trọng là phải biết ai chịu trách nhiệm trốn thoát. Thông thường, đó là quan điểm. Tuy nhiên, trong trường hợp này, ứng dụng sẽ hiển thị JSON sẽ chỉ được thoát theo ngữ cảnh JSON. Nhưng các thông báo lỗi sẽ được sử dụng trong ngữ cảnh HTML và có vẻ như lớp trình bày này không (hoặc không thể thoát).

Ở [ví dụ tiếp theo](https://github.com/fatfreecrm/fat_free_crm/commit/47e12f84227ee535ae41582fb165b4b511dbb43d?diff=split#diff-a3aa7ad665c3bc24d90c48ffb047b11bR15) chúng ta đang xem xét cách sử dụng `html_safe` và phương thức `raw()` hoạt động rất giống nhau.

Code ở 15 trước khi thay đổi không sai

```
= "To: ".html_safe << email.sent_to
```

Nhưng nó đòi hỏi một số kiến thức về cách thức hoạt động của [SafeBuffer](https://rorsecurity.info/portfolio/html-safe-activesupportsafebuffer-explained) Kết quả của chuỗi HTML-safe << một chuỗi không an toàn là gì? Bạn có thể mong đợi một chuỗi không an toàn. Trên thực tế nó sẽ là một chuỗi HTML an toàn, nhưng phía bên phải sẽ được thoát.

Vì vậy, tất cả là chính xác trong ví dụ này, nhưng một chút phức tạp và ai đó có thể thử nghiệm với nhiều hơn `.html_safe` hoặc `raw()` các cuộc gọi trong tương lai. Vì vậy, chia nhỏ nó ra và sử dụng ít hơn `.html_safe` là một đầu tư tốt vào khả năng bảo trì.

Lỗ hổng thực tế trong mã này nằm trong [dòng 1](https://github.com/fatfreecrm/fat_free_crm/blob/47e12f84227ee535ae41582fb165b4b511dbb43d/app/views/emails/_email.html.haml) (xem bên dưới) kết hợp với [dòng 25](https://github.com/fatfreecrm/fat_free_crm/commit/47e12f84227ee535ae41582fb165b4b511dbb43d?diff=split#diff-a3aa7ad665c3bc24d90c48ffb047b11bL25)

```
L1: truncated = truncate(email.body_without_textile.to_s.gsub("\n", " "), :length => 125 - email.subject.to_s.size) 
L25: %tt= (" - " << truncated).html_safe
```

Sử dụng [truncate()](http://apidock.com/rails/v3.2.8/ActionView/Helpers/TextHelper/truncate), không thoát trong phiên bản Rails 3.2.8 nhưng đánh dấu chuỗi là không an toàn HTML. Trong phiên bản Rails mới nhất, nó thoát chuỗi bị cắt ngắn. Dòng 25 sau đó sử dụng ký hiệu <<, có lẽ với hy vọng rằng phía bên phải (cắt ngắn) sẽ bị loại bỏ. Tuy nhiên, hai chuỗi HTML-unsafe được ghép nối vào một chuỗi không an toàn mà không có bất kỳ thoát nào. Sau đó, nó được đánh dấu là HTML-safe  và không được thoát

Có 1 số điều có thể rút ta sau đây:
* Bạn sẽ cần chiến lược cho phương thức `raw()` và `html_safe`. Làm thế nào và ở đâu nên được phép được sử dụng? Bạn phải chắc chắn 100% chuỗi không bao gồm code injection từ người dùng. Tốt hơn là tránh sử dụng `html_safe` hoặc `raw()` bất cứ khi nào có thể và thay vì thoát ra một lần quá thường xuyên.
* Khi sử dụng string helper Rails (hoặc của riêng), hãy đảm bảo bạn biết nó làm gì và nếu nó thay đổi khi bạn đang di chuyển sang phiên bản mới. Ví dụ, so sánh `truncate()` trong [3.2.8](http://apidock.com/rails/v3.2.8/ActionView/Helpers/TextHelper/truncate) và [4.2](http://apidock.com/rails/v4.2.1/ActionView/Helpers/TextHelper/truncate).
* Ai chịu trách nhiệm escaping? Thông thường, nó phải là lớp presenter, vì nó cần phải được thoát theo ngữ cảnh (HTML, JSON,…). Tuy nhiên, nếu view không (hoặc không thể thoát), bạn có thể phải thoát trong model đó.
## Hành động
* Tìm kiếm dự án cho `html_safe` hoặc `raw()` và giảm mức sử dụng bất cứ khi nào có thể.
* Làm cho text helpers của riêng bạn thoát khỏi đầu vào để có thể sử dụng chúng một cách an toàn trong view.
* Thêm (có thể) hành vi bất ngờ của trình text helpers vào chính sách bảo mật trung tâm, ví dụ: trong tệp `SECURITY.md`. Ngoài ra, hãy mô tả chiến lược sử dụng `html_safe` và `raw()` và chiến lược "chịu trách nhiệm" ở đó.
# A4 Phân quyền - Authorization
Có thể bạn đã có quyền ủy quyền ở cấp độ đầu tiên: user thường chỉ có thể xem nội dung của riêng họ, admin có thể xem mọi thứ. Tuy nhiên, mức thứ hai trở nên phức tạp hơn và thường không đầy đủ.

Đây là 1 ví dụ:
* Model User [accepts nested attributes](http://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html) cho permission của user như sau `accepts_nested_attributes_for :permission`
* Model Permission có một cờ cho những gì được người dùng cho phép ví dụ: add_users
* Controller sử dụng `User.update_attributes(params[:user])` trong action update cho cả admin và user thường
* Mặc dù không có checkbox ở UI, nhưng một user thường có thể thêm `<input type="checkbox" name="user[permission_attributes][add_users]" value="1" checked="checked" />` vào để giành quyền quản trị. Điều đó có nghĩ là bạn đã cho phép các thay đổi thông qua params[:user][:permission_attributes]

Rõ ràng như trong ví dụ này, kiểm tra này thường bị lãng quên. Vì vậy, việc kiểm tra mã của bạn cho các vấn đề tương tự là một đầu tư tốt.
## Hành động
* Tìm kiếm code của bạn cho accepts_nested_attributes_for thường gây ra các vấn đề về ủy quyền như thế này. Cố gắng tránh sử dụng phương pháp này bất cứ khi nào bạn có thể.
* Điều này đôi khi cũng xảy ra ở các đối tượng con (ví dụ: comment của post) kết hợp với hai user có cùng role. Trong CommentsController, phải đảm bảo rằng comment này thực sự thuộc về post đó (cũng như comment thuộc về user đó).
* Điều quan trọng là ủy quyền rõ ràng và có thể bảo trì. Để thực hành, hãy tưởng tượng bạn đang bắt đầu ở một công ty mới và bạn xem [tệp xác thực trung tâm](https://github.com/loomio/loomio/blob/11317f884a921df23b6ca5c41f9a388720b82c6f/app/models/ability.rb). Có dễ hiểu và dễ bảo trì cho bạn không? Nếu không, hãy so sánh nó với sơ đồ ủy quyền của bạn và có thể chia nhỏ nó một chút.
* Bộ lọc ủy quyền của bạn có phải là phương pháp trung tâm trước mỗi hành động (như [load_and_authorize_resource](https://github.com/CanCanCommunity/cancancan) trong ApplicationController) hay một cái gì đó mà developer phải thêm thủ công cho mỗi action không? Sau này đôi khi làm tăng nguy cơ sẽ không được thêm vào các “internal” action mới.
* Lên kế hoạch cho trường hợp xấu nhất: Ai đó có quyền truy cập vào tài khoản admin bằng cách nghe lén trên session cookie hoặc thậm chí là mật khẩu. Hãy chắc chắn rằng kẻ tấn công không thể làm quá nhiều trong ứng dụng trong trường hợp đó. Ví dụ: yêu cầu nhập lại mật khẩu hoặc mã bảo mật một lần (ví dụ: qua: paranoid_verification).

# A5 Lỗi cấu hình bảo mật - Security Misconfiguration
Ứng dụng Rails của bạn có bị định cấu hình sai hay không phụ thuộc phần lớn vào những gì nó làm. Nhưng có một vài tùy chọn cấu hình chung mà bạn có thể kiểm tra.

## Hành động
* Rails sẽ gửi [tiêu đề HTTP mới để bảo mật hơn theo mặc định](http://guides.rubyonrails.org/security.html#default-headers) ngay bây giờ. Trong các phiên bản Rails cũ hơn, bạn có thể sử dụng [gem SecureHeaders](https://github.com/twitter/secureheaders) để làm tương tự, và thậm chí trong Rails cập nhật của bạn, bạn có thể thêm nhiều tiêu đề hơn nữa. Bạn nên biết những gì mặc định và những thứ khác làm, nên hãy tham khảo gem để được giải thích thêm.
* Bạn có thể biết mảng [Rails.application.config.filter_parameters](http://guides.rubyonrails.org/action_controller_overview.html#parameters-filtering). Hãy dành một hoặc hai phút để xem xét rằng tất cả các thông số nhạy cảm thực sự được thêm vào đây. Bạn có thể được yêu cầu theo luật để giữ tin nhắn cá nhân hoặc dữ liệu của bệnh nhân ở những nơi ít nhất có thể hoặc ít nhất là trong nước (nếu bạn muốn sử dụng dịch vụ tổng hợp nhật ký từ nước ngoài). Lưu ý rằng: mật khẩu cũng sẽ lọc `:password_confirmation`, do đó bạn không phải liệt kê tất cả các biến
* Nếu ứng dụng chuyển hướng đến địa chỉ bao gồm mã thông báo, bạn cũng nên thêm chúng vào mảng [Rails.application.config.filter_redirect](http://guides.rubyonrails.org/action_controller_overview.html#redirects-filtering)
* Ngoài ra, bạn nên đảm bảo nguồn gem của mình là HTTPS chứ không phải `git: //` hoặc `:github`. Xem ở [đây](https://rorsecurity.info/portfolio/rubygems-security) để biết thêm chi tiết.
# A6 Truyền dữ liệu nhạy cảm - Sensitive Data Transmission
Ai đó bên cạnh người dùng trong coffeeshop có thể nghe trộm việc truyền dữ liệu. Vì vậy, nếu bạn có thể, làm cho toàn bộ ứng dụng chỉ SSL. Nếu cả hai HTTPS và HTTP URL có sẵn, một người ở giữa vẫn có thể loại bỏ tất cả các liên kết an toàn trong nền để giữ nạn nhân trong phiên bản HTTP.

Một vấn đề khác là trình duyệt không biết rằng ứng dụng của bạn chỉ là SSL. Vì vậy, một kẻ tấn công tinh vi hơn có thể cung cấp phiên bản HTTP cho người dùng bằng cách chuyển tiếp tất cả lưu lượng truy cập đến phiên bản HTTPS trong nền. Đó là lý do tại sao [HSTS](https://tools.ietf.org/html/rfc6797#section-2.3) tồn tại và bạn có thể đã đọc về nó trên trang [gem SecureHeaders](https://github.com/twitter/secureheaders) từ phần A5 ở trên.
## Hành động
* Đồng thời đánh dấu tất cả cookie “An toàn” để trình duyệt của người dùng không gửi cookie (session) trong yêu cầu HTTP không an toàn (sau đó sẽ chuyển hướng đến phiên bản HTTPS).
* Đặt lời nhắc liên tục [kiểm tra bảo mật TLS / SSL](https://www.ssllabs.com/ssltest/) của bạn để biết các lỗ hổng mới nhất
* Đây cũng là về lưu trữ an toàn vì những thứ được lưu trữ có thể được chuyển sau này, ví dụ, thông qua dịch vụ tổng hợp nhật ký hoặc trong bản sao lưu. Vì vậy, mã hóa thông tin nhận dạng cá nhân ở cấp ứng dụng nơi bạn có thể, ví dụ, sử dụng [attire_encrypted.](https://github.com/attr-encrypted/attr_encrypted)
* Tắt tính năng tự động hoàn thành trong mục nhập form nhạy cảm: `<input type="email" name="email" autocomplete="off" />`
# A7 Thiếu kiểm soát truy cập cấp chức năng - Missing Function Level Access Control
Lưu ý: Phần này trong [TOP 10 của OWASP](https://www.owasp.org/index.php/Top_10_2013-A7-Missing_Function_Level_Access_Control) nhắc nhở chúng ta về những gì chúng tôi đã đề cập trong phần A2 và A4: Kiểm tra lại xác thực và ủy quyền trong mọi hành động, đặc biệt là trong hành động ẩn hoặc nội bộ.
# A8 Cross-Site Request Forgery (CSRF)
Có thể bạn đã kiểm tra điều gì sẽ xảy ra nếu biện pháp đối phó của Rails, authenticity token, bị thiếu. Bạn cũng có thể đã thử các [ Rails escalation strategies](https://rorsecurity.info/portfolio/cross-site-request-forgery-and-rails) cho CSRF. Tốt, vì vậy, hãy tập trung vào hai vấn đề xảy ra vẫn khá thường xuyên.

Bạn có cung cấp tính năng xác thực “remember me” không? Hãy kiểm tra xem điều gì xảy ra nếu bạn đăng nhập bằng hộp kiểm “remember me” và một sự cố CSRF. Chuyển tới biểu mẫu tạo thứ gì đó, điền vào và xóa authenticity token bằng bảng điều khiển dành cho developer (phần tử đầu tiên trong biểu mẫu hoặc nếu đó là biểu mẫu từ xa, thẻ meta có tên là csrf-token), gửi và xem tại nhật ký của Rails. Nó sẽ nói "failed to verify the authenticity token" nhưng cũng không tạo đối tượng đó. Tuy nhiên, nếu đối tượng từ biểu mẫu được tạo ra, bạn đã tìm thấy một lỗ hổng CSRF khá phổ biến.

Chuyện gì đã xảy ra? Token sai khiến Rails gán người dùng hiện tại bằng cách xóa hoặc gia hạn session (phụ thuộc vào cấu hình `protect_from_forgery` trong ApplicationController của bạn, `protect_from_forgery with: :exception`khác nhau). Nhưng tính năng "remember me" trong một cookie riêng biệt đã đăng nhập lại bạn và sau đó chạy hành động
## Hành động 
* Overwrite phương thức [handle_unverified_request](https://github.com/rails/rails/blob/e7feaff70f13b56a0507e9f4dfaf3ebc361cb8e6/actionpack/lib/action_controller/metal/request_forgery_protection.rb#L208) trong ApplicationController
* Chạy triển khai ban đầu (ví dụ: với `super`) nhưng cũng xóa cookie "remember me"

Đây là vấn đề thường xuyên thứ hai: với API, [Rails document](http://api.rubyonrails.org/classes/ActionController/RequestForgeryProtection.html) nói rằng: "Có lẽ, bạn sẽ có một chương trình xác thực khác." Tốt, vì vậy, hãy đảm bảo rằng session người dùng của ứng dụng chính không hoạt động trong API có lẽ không có bảo vệ CSRF. Nếu không có, hãy đăng nhập vào ứng dụng chính, nhập URL của API trong trình duyệt và xem liệu API có xác thực bạn hay không.

Nếu nó hoạt động, kẻ tấn công có thể chạy một cuộc tấn công CSRF chống lại API. Sử dụng công cụ REST để kiểm tra các hành động API non-GET và sau đó sử dụng authentication scheme khác cho API không dựa trên cookie.
## Hành động 
* Tôi biết bạn đã kiểm tra nó rồi, nhưng hãy dành một phút để đảm bảo không có routes nào trong đầu ra của `rake routes | grep GET` thay đổi trạng thái của ứng dụng. Nếu có, có thể chuyển đổi chúng thành non-GET để sử dụng tính năng bảo vệ CSRF của Rails không?
* [Tài liệu Rails](http://api.rubyonrails.org/classes/ActionController/RequestForgeryProtection.html) hơi gây nhầm lẫn về các yêu cầu cho các định dạng khác nhau. Theo mặc định, chúng cũng sẽ được kiểm tra trong ứng dụng chính. Vì vậy, trước khi bạn `skip_before_action :verify_authenticity_token`, đảm bảo rằng action  không thay đổi, xóa hoặc tạo nội dung nào đó (đáng kể).
# A9 Sử dụng các thành phần có lỗ hổng đã biết - Using Components with Known Vulnerabilities
Chúng ta rất khó có thể cập nhật phần mềm ngay lập tức. Một tuần với [chiến lược bảo mật của Rails](http://bauland42.com/articles/a-week-with-a-rails-security-strategy/) có thể là giải cứu.
## Hành động
* Tập thói quen luôn cập nhật các bản cập nhật mỗi tuần nhưng giới hạn thời gian bạn dành cho việc này. Bằng cách đó phần mềm được cập nhật, có thể từ từ, nhưng nó được thực hiện.
# A10 Chuyển hướng không được xác định và chuyển tiếp - Unvalidated Redirects and Forwards
Chúng ta cần xác thực chúng vì các liên kết hoặc chuyển hướng có thể dẫn người dùng đến các trang bên ngoài để lừa đảo hoặc một trang tương tự. Dưới đây là ví dụ về [chuyển hướng không được hỗ trợ](https://github.com/openstreetmap/openstreetmap-website/blob/835eff634651a98602897a1fbdaa4a6426beedb1/app/controllers/application_controller.rb#L76)
```Ruby 
redirect_to Hash[params].merge(:cookie_test => "true")
```

Có lý do chính đáng để `redirect_to params` không được phép nữa. Nếu thông qua một chuỗi, nó sẽ chuyển hướng đến URL đó. Nếu đã vượt qua một Hash, nó vẫn dễ bị tổn thương vì [url_for](http://api.rubyonrails.org/classes/ActionDispatch/Routing/UrlFor.html#method-i-url_for) cung cấp tùy chọn `:host`.

## Hành động
* Ví dụ: nếu bạn đang xác thực URL, cho trang web của người dùng, hãy đảm bảo bạn lọc một số schemes ít được biết đến hơn: `data:text/html;charset=utf-8,://<script>alert(1)</script>` dưới dạng liên kết sẽ chạy HTML / JS đó và xác thực dưới dạng URL nếu bạn chỉ đang kiểm tra để bao gồm: //. Tương tự với liên kết này: `javascript: alert (': //')`
* Chuyển hướng cho phép URL đầy đủ dưới dạng tham số, vì vậy hãy kiểm tra chuỗi chuyển hướng. Tuy nhiên,  `redirect_to params [: return_to] unless params [: return_to] = ~ / \ Ahttp /` cố gắng không cho phép các URL bên ngoài, nhưng nó sẽ cho phép các schemes URL tương đối như //attacker.com. Việc xác thực này có thể giúp: `params [: return_to] = ~% r (\ A # {root_url})`
* Kiểm tra tất cả redirect_to chấp nhận một Hash nơi người dùng có thể chuyển một tùy chọn :host.

# Tổng kết

Mặc dù bạn có thể đã tìm thấy một số lỗ hổng với các công cụ tự động, nhưng không phải tất cả sự số bảo mật đều có thể bị phát hiện. Hướng dẫn này sẽ cung cấp cho bạn danh sách chi tiết những gì cần kiểm tra trước khi đưa bản release mới vào production: kiểm tra mã cho lỗ hổng trong logic của ứng dụng, chuẩn bị ứng dụng cho các cuộc tấn công phổ biến nhất và thêm một số biện pháp bảo mật bổ sung.

Chúng tôi cũng đã phát triển các quy tắc mã hóa chung để các vấn đề trong quá khứ không lặp lại. Mô tả các quy tắc mã hóa này và các cuộc tấn công và lỗ hổng phổ biến nhất có liên quan đến ứng dụng của bạn ở vị trí trung tâm, ví dụ: trong tệp `SECURITY.md`. Trong tệp này, cũng thêm các phương thức Rails cần thêm sự chú ý vì chúng hoạt động hơi khác so với dự kiến. Hãy nhớ mô tả chiến lược của bạn cho phương thức `html_safe` (xem A2) và chống lại SQL injection trong file đó. Một chiến lược hay khác là đặt câu hỏi khi sử dụng trực tiếp đầu vào của người dùng, như “Giá trị này có thể là gì?” Có thể là injection string, đối tượng không mong muốn (loại), ID của người dùng khác, nil, 0, chuỗi rỗng, Hash, hoặc một mảng?

Và đây chỉ là một phần của cái mà tôi gọi là chiến lược bảo mật của Rails. Nếu bạn có một ít thời gian, bạn có thể bắt đầu [một tuần với chiến lược bảo mật của Rails](http://bauland42.com/articles/a-week-with-a-rails-security-strategy/)