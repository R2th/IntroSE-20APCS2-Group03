# Lời mở đầu
Cross-Site Request Forgery (CSRF) là một phương thức tấn công buộc người dùng thực thi các hành động không mong muốn trên 1 ứng dụng web mà họ đang được xác thực thông qua đăng nhập. Phương thức tấn công này tập trung vào việc gửi lên các request thay đổi trạng thái chứ không phải lấy cắp dữ liệu do người thực thi tấn công không thể truy vấn các response được trả về. Với sự trợ giúp của các công cụ xã hội hiện đại (gửi link thông qua mail hoặc công cụ chat), hacker có thể lừa cho người dùng thực thi một request mà chúng đã dựng sẵn. Nếu người dùng là user thường, thì hậu quả của tấn công CSRF có thể ép người dùng thực thi các hành động như chuyển khoản, thay đổi email, thông tin cá nhân,... Nếu người dùng có quyền admin, hậu quả sẽ nặng nề hơn, có thể gây hư hại cho cả 1 hệ thống.

Trên Viblo đã có một bài viết chi tiết về tấn công CSRF, mọi người có thể tham khảo tại [đây](https://viblo.asia/p/ky-thuat-tan-cong-csrf-va-cach-phong-chong-amoG84bOGz8P)

Để ngăn chặn các cuộc tấn công CSRF, Rails sẽ sinh ra một token đặc biệt, và token này sẽ được xác thực mỗi khi submit gửi lên 1 request thông qua phương thức ```protect_from_forgery```, được include mặc định trong ```application_controller``` khi khởi tạo ứng dụng Rails.

Gần đây mình có làm 1 ticket liên quan đến phương thức ```protect_from_forgery```. Để giải quyết vấn đề mặc dù không mất quá nhiều effort, nhưng mình quyết định tìm hiểu kĩ hơn về cách mà tính năng này được áp dụng và thực thi trong Rails. Và mình sẽ chia sẽ nhưng tìm hiểu của mình trong bài viết này.

-----

# Bề nổi của vấn đề
Khi làm việc với Rails, các bạn chắc hẳn không còn xa lạ với phương thức ```form_for``` hay ```form_tag```. Và chắc hẳn phần lớn các bạn biết rằng, khi xây dựng form, sẽ có 1 thẻ hidden_field của thuộc tính ```authenticity_token``` được chèn vào nội dung form.
![](https://images.viblo.asia/b1a179f9-4ca0-433c-8197-ee07c26aeb62.png)

Token này, ngoài ra còn được lưu trữ trên session với key là ```_csrf_token```. Khi người dùng thực hiện gửi request lên với phương thức POST, ```authenticity_token``` sẽ được gửi lên cùng với form. Rails sẽ xác thực token này bằng cách so sánh với token được lưu trong session.

# Sinh và mã hóa token
Khi chúng ta gọi đến phương thức [form_for](https://github.com/rails/rails/blob/7e881a18d945d13f82619bd059569ecc0abbf17c/actionview/lib/action_view/helpers/form_helper.rb#L430) hoặc [form_tag](https://github.com/rails/rails/blob/master/actionview/lib/action_view/helpers/form_tag_helper.rb#L71) được định nghĩa tương ứng trong 2 helper ```form_helper``` và ```form_tag_helper```, 2 phương thức này đều sẽ gọi tới phương thức [form_tag_with_body](https://apidock.com/rails/ActionView/Helpers/FormTagHelper/form_tag_with_body), chạy qua [form_tag_html](https://apidock.com/rails/ActionView/Helpers/FormTagHelper/form_tag_html) và gọi tiếp tới phương thức [extra_tags_for_form](https://apidock.com/rails/ActionView/Helpers/FormTagHelper/extra_tags_for_form). Chúng ta sẽ phân tích đoạn code của phương thức này:
```ruby
# File actionview/lib/action_view/helpers/form_tag_helper.rb, line 836
def extra_tags_for_form(html_options)
  authenticity_token = html_options.delete("authenticity_token")
  method = html_options.delete("method").to_s

  method_tag = case method
    when /^get$/ # must be case-insensitive, but can't use downcase as might be nil
      html_options["method"] = "get"
      ''
    when /^post$/, "", nil
      html_options["method"] = "post"
      token_tag(authenticity_token)
    else
      html_options["method"] = "post"
      method_tag(method) + token_tag(authenticity_token)
  end

  if html_options.delete("enforce_utf8") { true }
    utf8_enforcer_tag + method_tag
  else
    method_tag
  end
end
```
Khi chúng ta khai báo 1 form, sẽ có 1 tham số optional là ```:method```. Khi ```:method``` được gửi lên kèm với ```html_options``` vào phương thức ```extra_tags_for_form``` sẽ xuất hiện 3 case. Nếu method được gửi lên match với ```/^post$/```, hoặc có giá trị là rỗng, nil thì phương thức [token_tag](https://apidock.com/rails/ActionView/Helpers/FormTagHelper/token_tag) sẽ được gọi đến để sinh ra 1 thẻ hidden input với name là ```authenticity_token```. Nếu method gửi lên không match với cả ```/^post$/``` và ```/^get$/```, có nghĩa là người dùng muốn thực thi phương thức PUT, PATCH hoặc DELETE, thì ở đây ```html_options["method"]``` vẫn có giá trị là POST, nhưng đi kèm với thẻ hidden_field authenticity_token, sẽ có thêm 1 thẻ hidden input có name là ```method``` để lưu method tương ứng. Giá trị của thẻ token_tag được khởi tạo bằng cách gọi từ phương thức [form_authenticity_token](https://apidock.com/rails/ActionController/RequestForgeryProtection/form_authenticity_token) để đi vào [masked_authenticity_token](https://apidock.com/rails/ActionController/RequestForgeryProtection/masked_authenticity_token). Tại đây, chúng ta đang làm việc với module ```RequestForgeryProtection``` thuộc module ```ActionController```. Module này phụ trách các vấn đề liên quan đến CSRF, bao gồm cả việc khởi tạo, mã hóa và xác thực CSRF token.

Hãy cùng nghĩa qua đoạn code trong 2 phương thức được đề cập ở trên:
```ruby
# Sets the token value for the current session.
def form_authenticity_token(form_options: {})
    masked_authenticity_token(session, form_options: form_options)
end
  
# Creates a masked version of the authenticity token that varies
# on each request. The masking is used to mitigate SSL attacks
# like BREACH.
def masked_authenticity_token(session, form_options: {}) # :doc:
    one_time_pad = SecureRandom.random_bytes(AUTHENTICITY_TOKEN_LENGTH)
    encrypted_csrf_token = xor_byte_strings(one_time_pad, real_csrf_token(session))
    masked_token = one_time_pad + encrypted_csrf_token
    Base64.strict_encode64(masked_token)
end  
```

1 lưu ý nhỏ, đoạn code bên trên là thuộc phiên bản Rails 4.2.7. Từ phiên bản Rails 5 trở đi, phương thức ```masked_authenticity_token``` đã trở nên phức tạp hơn (tham khảo trên Github của Rails). Tuy nhiên với mục đích của bài viết, chúng ta chỉ cần tập trung vào việc thực hiện ban đầu như trong phiên bản 4.2.7.

Tiếp tục vọc code. Trước hết tập trung vào phương thức [real_csrf_token](https://apidock.com/rails/ActionController/RequestForgeryProtection/real_csrf_token). Tại sao ở đây chúng ta cần truyền vào session? Bởi, phương thức này sẽ sinh ra 1 mã raw, chưa được mã hóa, và mà nãy sẽ được lưu lại trong session. 
```ruby
# File actionpack/lib/action_controller/metal/request_forgery_protection.rb, line 315
def real_csrf_token(session)
    session[:_csrf_token] ||= SecureRandom.base64(AUTHENTICITY_TOKEN_LENGTH)
    Base64.strict_decode64(session[:_csrf_token])
end
```
Bằng việc gọi đến hàm ```real_csrf_token``` cuối cùng sẽ đảm bảo cho token được lưu trong session luôn khớp với token được nhúng vào trong form, bởi việc nhúng token vào form không thể xảy ra nếu token chưa được sinh và lưu lại trong session. 

Quay trở lại với phương thức ```masked_authenticity_token```. Đầu tiên, chúng ta định nghĩa 1 one time pad (OTP) dùng để mã hóa token. OTP là kỹ thuật mã hóa sử dụng khóa được sinh ngẫu nhiên để mã hóa 1 tin nhắn văn bản thô có cùng độ dài (ở đây là 32 ký tự), và yêu cầu chính khóa đó để giải mã. Kỹ thuật này được gọi là "one time" vì 1 lí do: mỗi khóa chỉ được sử dụng 1 lần cho 1 thông điệp và sau đó bị loại bỏ. Rails sử dụng kỹ thuật này để sinh ra 1 OTP đối với mỗi CSRF token mới được sinh, và dùng nó để mã hóa token sử dụng toán tử bitwise XOR. Chuỗi OTP được thêm vào phía trước chuỗi mã hóa, sau đó sử dụng kỹ thuật mã hóa Base64 để cho ra kết quả cuối cùng. Chuỗi trả về này sẽ là đoạn mã giá trị của thẻ authenticity_token mà chúng ta thấy trên HTML.
0![](https://images.viblo.asia/5a15d043-67f5-49fd-99ff-f5e666630f2a.png)

# Giải mã và xác thực
Bây giờ, chúng ta sẽ đi tìm hiểu cơ chế Rails xác thực 1 request được gửi lên.

Như đã nói ở trên, khi người dùng thực hiện gửi request lên với phương thức POST, ```authenticity_token``` sẽ được gửi lên cùng với form. Bởi phương thức ```protect_from_forgery``` đã được thêm sẵn vào trong ```ApplicationController```, nên mỗi khi ứng dụng của chúng ta chạy, 1 callback sẽ mặc định được thêm vào:
```ruby
def protect_from_forgery(options = {})
    options = options.reverse_merge(prepend: false)

    self.forgery_protection_strategy = protection_method_class(options[:with] || :null_session)
    self.request_forgery_protection_token ||= :authenticity_token
    before_action :verify_authenticity_token, options
    append_after_action :verify_same_origin_request
end
```
Callback mà mình đang nhắc đến là ```verify_authenticity_token```
```ruby
def verify_authenticity_token # :doc:
    mark_for_same_origin_verification!

    if !verified_request?
      if logger && log_warning_on_csrf_failure
        if valid_request_origin?
          logger.warn "Can't verify CSRF token authenticity."
        else
          logger.warn "HTTP Origin header (#{request.origin}) didn't match request.base_url (#{request.base_url})"
        end
      end
      handle_unverified_request
    end
end
```
Callback này sẽ thực thi việc kiểm tra request có được xác thực hay không thông qua hàm ```verified_request?``` bằng cách so sánh token trong session với token được gửi lên trong params hoặc token trong header của request
```ruby
# * Does the form_authenticity_token match the given token value from the params?
# * Does the X-CSRF-Token header match the form_authenticity_token?
def verified_request? # :doc:
!protect_against_forgery? || request.get? || request.head? ||
  (valid_request_origin? && any_authenticity_token_valid?)
end
```
Chúng ta sẽ quan tâm đến việc check ```any_authenticity_token_valid?```
```ruby
 def any_authenticity_token_valid? # :doc:
    request_authenticity_tokens.any? do |token|
      valid_authenticity_token?(session, token)
    end
end
```
Do 1 request có thể gửi token lên theo cả params và request header nên Rails chỉ yêu cầu 1 trong 2 token thỏa match với token lưu trong session.
```ruby
def valid_authenticity_token?(session, encoded_masked_token) # :doc:
    if encoded_masked_token.nil? || encoded_masked_token.empty? || !encoded_masked_token.is_a?(String)
      return false
    end

    begin
      masked_token = Base64.strict_decode64(encoded_masked_token)
    rescue ArgumentError # encoded_masked_token is invalid Base64
      return false
    end

    # See if it's actually a masked token or not. In order to
    # deploy this code, we should be able to handle any unmasked
    # tokens that we've issued without error.

    if masked_token.length == AUTHENTICITY_TOKEN_LENGTH
      # This is actually an unmasked token. This is expected if
      # you have just upgraded to masked tokens, but should stop
      # happening shortly after installing this gem.
      compare_with_real_token masked_token, session

    elsif masked_token.length == AUTHENTICITY_TOKEN_LENGTH * 2
      csrf_token = unmask_token(masked_token)

      compare_with_real_token(csrf_token, session) ||
        valid_per_form_csrf_token?(csrf_token, session)
    else
      false # Token is malformed.
    end
end
```
Phương thức [valid_authenticity_token?](https://apidock.com/rails/ActionController/RequestForgeryProtection/valid_authenticity_token%3F) nhằm mục đích giải mã và so sánh token. Đầu tiên, để trả về ```masked_token```, đoạn token được mã hóa Base64 trước đó sẽ được giải mã. Tiếp đến đoạn code ở dưới, cần chú ý rằng ```masked_token``` trả về khi mã hóa sẽ là 1 chuỗi 64 kí tự bao gồm 32 kí tự OTP và 32 kí tự của đoạn mã Base64, do đó ở đoạn điều kiện ta có 1 điều kiện là nếu ```masked_token.length == AUTHENTICITY_TOKEN_LENGTH * 2``` (với ```AUTHENTICITY_TOKEN_LENGTH``` = 32) thì sẽ thực hiện ```unmask_token``` để trả về ```csrf_token```. Nếu ```masked_token.length == AUTHENTICITY_TOKEN_LENGTH``` thì chúng ta có thể thấy được như trong đoạn comment: đây thực chất đã là 1 unmasked_token.
```ruby
def unmask_token(masked_token) # :doc:
    # Split the token into the one-time pad and the encrypted
    # value and decrypt it.
    one_time_pad = masked_token[0...AUTHENTICITY_TOKEN_LENGTH]
    encrypted_csrf_token = masked_token[AUTHENTICITY_TOKEN_LENGTH..-1]
    xor_byte_strings(one_time_pad, encrypted_csrf_token)
end
```
Phương thức ```unmask_token``` sẽ thực hiện tách ```masked_token``` thành 2 thành phần cấu thành nên nó: 1 OTP và 1 token đã được mã hóa, rồi từ 2 thành phần đó sẽ trả về được 1 đoạn văn bản thô. Với ```unmasked_token``` được trả về sẽ tiến hành so sánh thông qua ```compare_with_real_token```
```ruby
def compare_with_real_token(token, session) # :doc:
    ActiveSupport::SecurityUtils.fixed_length_secure_compare(token, real_csrf_token(session))
end
```

# Thực thi sau xác thực
Vậy sau khi xác thực xong, thì chuyện gì sẽ xảy ra. Hãy 1 lần nữa nhìn lại phương thức ```verify_authenticity_token```:
```ruby
def verify_authenticity_token # :doc:
    mark_for_same_origin_verification!

    if !verified_request?
      #code
      handle_unverified_request
    end
end
```
Ngoài những đoạn log cảnh báo, mình muốn các bạn chú ý vào phương thức ```handle_unverified_request```
```ruby
def handle_unverified_request # :doc:
    forgery_protection_strategy.new(self).handle_unverified_request
end
```
Trước khi chạy vào callback ```verify_authenticity_token```, ```forgery_protection_strategy``` được định nghĩa như sau:
```ruby
self.forgery_protection_strategy = protection_method_class(options[:with] || :null_session)
```
Và đây là phương thức ```protection_method_class```:
```ruby
def protection_method_class(name)
    ActionController::RequestForgeryProtection::ProtectionMethods.const_get(name.to_s.classify)
rescue NameError
    raise ArgumentError, "Invalid request forgery protection method, use :null_session, :exception, or :reset_session"
end
```
Vậy, ```forgery_protection_strategy``` ở đây sẽ là một Object thuộc Module ```ProtectionMethods```. Bên trong module này có các lớp được định nghĩa như sau:
```ruby
module ProtectionMethods
  class NullSession
    def initialize(controller)
      @controller = controller
    end

    # This is the method that defines the application behavior when a request is found to be unverified.
    def handle_unverified_request
      request = @controller.request
      request.session = NullSessionHash.new(request)
      request.flash = nil
      request.session_options = { skip: true }
      request.cookie_jar = NullCookieJar.build(request, {})
    end

    private

      class NullSessionHash < Rack::Session::Abstract::SessionHash #:nodoc:
        def initialize(req)
          super(nil, req)
          @data = {}
          @loaded = true
        end

        # no-op
        def destroy; end

        def exists?
          true
        end
      end

      class NullCookieJar < ActionDispatch::Cookies::CookieJar #:nodoc:
        def write(*)
          # nothing
        end
      end
  end

  class ResetSession
    def initialize(controller)
      @controller = controller
    end

    def handle_unverified_request
      @controller.reset_session
    end
  end

  class Exception
    def initialize(controller)
      @controller = controller
    end

    def handle_unverified_request
      raise ActionController::InvalidAuthenticityToken
    end
  end
end
```
Trong cả 3 class đều được định nghĩa phương thức ```handle_unverified_request```. Vậy việc phương thức nào sẽ được gọi tới phụ thuộc vào tham số được truyền vào method ```protection_method_class```. Mặc định tham số truyền vào sẽ là ```:null_session```, và khi đó class ```NullSession``` sẽ được gọi tới. Và vì lí do này, đi kèm với phương thức ```protect_from_forgery``` sẽ có 1 vài options đi kèm, nhưng mình muốn nói ở đây là options ```:with``` với các giá trị đi kèm là ```:exception```, ```:reset_session``` và ```:null_session```. Với mỗi giá trị được truyền vào, phương thức ```handle_unverified_request``` ở Class tương ứng sẽ được gọi tới. Khi khởi tạo một ứng dụng Rails, ```protect_from_forgery with: :exception``` sẽ được thêm vào mặc định để gọi tới lớp ```Exception```. Tại sao lại như vậy?

Có thể thấy, trong lớp ```Exception```, khi hàm ```handle_unverified_request```, một exception sẽ được raise lên và thông báo, và chương trình không chạy tiếp nữa, đồng nghĩa với việc request không hợp lệ gửi lên sẽ không được thực thi. Đối với lớp ResetSession, chỉ đơn thuần là khởi tạo lại session, và lớp NullSession thì thực thi clear dữ liệu trong session cũng như dữ liệu của flash và các cookies được liên kết, tuy nhiên, chương trình vẫn tiếp tục chạy, đồng nghĩa với việc, các thông tin người dùng nhập trong các ô input submit lên vẫn sẽ được xử lý và gây ra thay đổi, và đây chính là lỗ hổng bảo mật. 

Có lẽ đây chính là lí do tham số ```with: :exception``` được mặc định thêm vào khi khởi tạo 1 ứng dụng Rails. Trong nhiều trường hợp, việc gọi đến hàm ```handle_unverified_request``` thuộc class NullSession sẽ không còn là vấn đề, đơn cử như khi ứng dụng Devise vào ứng dụng, lúc này khi người dùng gửi lên 1 request sẽ thông qua xác thực người dùng, tuy nhiên lúc này session đã bị clear nên xác thực không được thông qua, và request không được thực hiện. Tuy nhiên, mình vẫn khuyến cáo mọi người nên sử dụng tham số ```with: :exception``` để nâng cao tính bảo mật của hệ thống.

# Lời kết
Trên đây là những gì mình đã tìm hiểu được về cơ chế phòng chống CSRF trong Rails. Tất nhiên, đó là những kiến thức mình tổng hợp và đúc kết được khi tham khảo nhiều nguồn trên mạng cũng như qua dự án thực tế. Nếu có gì mình viết trên đây chưa thực sự đúng, rất mong nhận được phản hồi từ các bạn.