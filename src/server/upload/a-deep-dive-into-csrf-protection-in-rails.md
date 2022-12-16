Chắc hẳn các bạn developer đã rất quen thuộc với `CSRF` - một tính năng khá là quan trọng và hữu ích của Rails.
` Cross-Site Request Forgery (CSRF)` là một dạng tấn công cho phép user dùng những mã độc hại giả mạo những request hợp pháp gửi đến server, giả mạo như một user đã xác thực. Rails bảo vệ và chống lại dạng tấn công này bằng cách tạo ra 1 `token` duy nhất và xác minh xác thực nó đối với mỗi lần gửi request.

Phạm vi bài viết này chúng ta sẽ cùng đi sâu vào hệ thống mã nguồn của Rails để tìm hiểu về cách thức triển khai chức năng này. 
Chúng ta sẽ cùng nhau khám phá cách `CSRF protection` hoạt động trong Rails cũng như cách khởi tạo một `token` cho mỗi respone và cách `token` này được sử dụng trên mỗi request đến để xác minh xác thực request này.

### 1. Cơ bản

`CSRF` gồm 2 thành phần: 
- một `token` duy nhất được nhúng vào đoạn mã HTML của website.
- một `token` tương tự cũng được lưu trữ trong session cookie.

Khi user tạo một request `POST` thì `CSRF token ` được lấy ra từ HTML sẽ được gửi kèm cùng với request đó. Rails sẽ so sánh token này với token lấy từ cookie để đảm bảo rằng chúng matching với nhau.

![](https://images.viblo.asia/466ba744-201e-45ed-9102-3d54b0164211.png)

### 2. Cách sử dụng

Về cơ bản, mặc định Rails sẽ support `CSRF protection `. Và chúng ta chỉ cần làm đơn giản qua hai bước sau: 

- thêm vào `application_controller.rb`:

```
protect_from_forgery with: :exception
```

- rồi thêm vào `application.html.erb`:

```
<%= csrf_meta_tags %>
```

Nhưng thực sự thì nó hoạt động như thế nào?

### 3. Khởi tạo và mã hóa

- Chúng ta sẽ bắt đầu với `#csrf_meta_tags` nhúng token xác thực vào HTML:

```
# actionview/lib/action_view/helpers/csrf_helper.rb

def csrf_meta_tags
  if protect_against_forgery?
    [
      tag("meta", name: "csrf-param", content: request_forgery_protection_token),
      tag("meta", name: "csrf-token", content: form_authenticity_token)
    ].join("\n").html_safe
  end
end
```

chúng ta sẽ tập trung vào thẻ `csrf-token` vì đó là nơi sẽ xảy ra các phép màu kì diệu =))
helper sẽ `#form_authenticity_token` để lấy ra thằng `actual token`. Ngay thời điểm này, nhập mô-đun `RequestForgeryProtection` của `ActionController`.
Thằng ` RequestForgeryProtection` xử lý tất tần tật mọi thứ với `CSRF`. Đặc biệt method `#protect_from_forgery ` trong `ApplicationController` - nó thiết lập một số hooks để đảm bảo xác thực `CSRF` được kích hoạt trên mỗi request và cách respone nếu request đó không được xác minh.
Ngoài ra, nó cũng đảm nhiệm việc tạo, mã hóa và giải mã các thẻ `CSRF`. Module này có phạm vi nhỏ, ngoài một số view helper thì toàn bộ việc thực hiện `CSRF protection` đều diễn ra ngay trong file này.


Ta tiếp tục tìm hiểu về `CSRF token ` kết thúc trong HTMKL, `#form_authenticity_token` là một method wrapper đơn giản có thể truyền bất kỳ parameters tùy chọn nào, cũng như session, thành `#masked_authenticity_token`:

```
# actionpack/lib/action_controller/metal/request_forgery_protection.rb

# Sets the token value for the current session.
def form_authenticity_token(form_options: {})
  masked_authenticity_token(session, form_options: form_options)
end

# Creates a masked version of the authenticity token that varies
# on each request. The masking is used to mitigate SSL attacks
# like BREACH.
def masked_authenticity_token(session, form_options: {}) # :doc:
  # ...
  raw_token = if per_form_csrf_tokens && action && method
    # ...
  else
    real_csrf_token(session)
  end

  one_time_pad = SecureRandom.random_bytes(AUTHENTICITY_TOKEN_LENGTH)
  encrypted_csrf_token = xor_byte_strings(one_time_pad, raw_token)
  masked_token = one_time_pad + encrypted_csrf_token
  Base64.strict_encode64(masked_token)
end
```

Từ khi giới thiệu `CSRF tokens` trong [per-form CSRF tokens in Rails 5](https://edgeguides.rubyonrails.org/upgrading_ruby_on_rails.html#per-form-csrf-tokens) thì method `#masked_authenticity_token` đã trở nên phức tạp hơn đối chút. Với mục đích của việc khám phá này ta sẽ tập trung vào việc triển khai ban đầu, một mã `CSRF token` duy nhất cho mỗi request - một mã thông báo kết thúc trong thẻ meta. Trong trường hợp đó, chúng ta chỉ có thể tập trung vào nhánh khác của điều kiện ở trên, kết thúc thiết lập `raw_token` thành giá trị trả về của `#real_csrf_token`.

Tại sao chúng ta pass session và vào `#real_csrf_token?`. Bởi vì method này thực sự thực hiện hai điều là: tạo ra mã thông báo thô, không mã hóa token và đưa token vào session cookie:

```
# actionpack/lib/action_controller/metal/request_forgery_protection.rb

def real_csrf_token(session) # :doc:
  session[:_csrf_token] ||= SecureRandom.base64(AUTHENTICITY_TOKEN_LENGTH)
  Base64.strict_decode64(session[:_csrf_token])
end
```

Sỡ dĩ method trên được gọi vì chúng ta đã khai báo `#csrf_meta_tags` trong layout. Đây là Rails Magic cổ điển - một hiệu ứng phụ thông minh đảm bảo `token` trong `session cookie` sẽ luôn matching với `token` trên trang, vì việc render `token` cho trang web không thể xảy ra nếu không chèn cùng một `token` đó vào cookie.

Dù sao, chúng ta hãy xem phía cuối method #masked_authenticity_token:

```
  one_time_pad = SecureRandom.random_bytes(AUTHENTICITY_TOKEN_LENGTH)
  encrypted_csrf_token = xor_byte_strings(one_time_pad, raw_token)
  masked_token = one_time_pad + encrypted_csrf_token
  Base64.strict_encode64(masked_token)
```

Sau khi chèn token vào session cookie, method này liên quan đến việc return token kết thúc bằng HTML thuần túy và ở đây sẽ làm một số phương pháp phòng ngừa (chủ yếu để giảm thiểu khả năng tấn công SSL BREAK). Lưu ý rằng không mã hóa các token mà đi vào session cookie, bởi vì ở Rails 4 session cookie chính nó sẽ được mã hóa.

Trước tiên, tạo một `one_time_pad` dùng để mã hóa thằng `raw token`. `one_time_pad` là một kỹ thuật mật mã sử dụng khóa được tạo ngẫu nhiên để mã hóa một `raw token` có cùng độ dài và yêu cầu key được sử dụng để giải mã thông điệp. Nó được gọi là pad "một lần" vì: mỗi key được sử dụng cho một tin nhắn rồi sau đó bị loại bỏ. Rails thực hiện điều này bằng cách tạo `one_time_pad` mới cho mỗi `CSRF token` mới, sau đó dùng nó mã hóa các token bằng cách dùng XOR bitwise operation. Chuỗi pad một lần được thêm vào chuỗi mã hoá, sau đó mã hóa Base64 để tạo chuỗi sẵn sàng cho HTML.

![](https://images.viblo.asia/6b72a84a-b3f8-41fc-89b2-35b76c47a88a.png)

Khi thao tác này hoàn tất, sẽ gửi 1 `authenticity token ` sao lưu ngăn xếp, nơi nó kết thúc trong application layout đc render:

```
<meta name="csrf-param" content="authenticity_token" />
<meta name="csrf-token" content="vtaJFQ38doX0b7wQpp0G3H7aUk9HZQni3jHET4yS8nSJRt85Tr6oH7nroQc01dM+C/dlDwt5xPff5LwyZcggeg==" />
```

### 4. Giải mã và xác minh

Phía trên đã giải thích về việc `CSRF token` được khởi tạo và cách nó kết thúc trong HTML và cookie. Tiếp theo, chúng ta sẽ cùng xem xét về cách Rails xác minh những request đến.

Khi user submit form trên trang web, `CSRF token` sẽ được gửi cùng với phần còn lại của form data(param `authenticity_token ` là default). Nó cũng có thể được gửi qua `HTTP X-CSRF-Token header`.

Nhớ lại dòng này `protect_from_forgery with: :exception` trong file ` ApplicationController`

Trong số những thứ khác, method `#protect_from_forgery` này add 1 before-action vào vòng đời của mọi controller action:

```
before_action :verify_authenticity_token, options
```

Những `before action` này bắt đầu quá trình so sánh `CSRF token` trong request params hoặc header với `token` trong `session cookie`:

```
# actionpack/lib/action_controller/metal/request_forgery_protection.rb

def verify_authenticity_token # :doc:
  # ...
  if !verified_request?
    # handle errors ...
  end
end

# ...

def verified_request? # :doc:
  !protect_against_forgery? || request.get? || request.head? ||
    (valid_request_origin? && any_authenticity_token_valid?)
end

```

Sau khi thực hiện một số tác vụ quản lý(không cần xác minh request HEAD hoặc GET), quy trình xác minh bắt đầu một cách nghiêm túc với lệnh gọi `#any_authenticity_token_valid ?`:

```
def any_authenticity_token_valid? # :doc:
  request_authenticity_tokens.any? do |token|
    valid_authenticity_token?(session, token)
  end
end
```

Khi đó, một request có thể pass token trong form params hoặc như một header. Rails yêu cầu tối thiểu một trong những `token` đó matching với thằng `token` trong `session cookie`

thằng `#valid_authenticity_token? ` là một method dài dòng nhưng sau cuối nó cũng chỉ là method nghịch của ` #masked_authenticity_token` để giải mã và so sánh `token`.

```
def valid_authenticity_token?(session, encoded_masked_token) # :doc:
  # ...
  
  begin
    masked_token = Base64.strict_decode64(encoded_masked_token)
  rescue ArgumentError # encoded_masked_token is invalid Base64
    return false
  end

  if masked_token.length == AUTHENTICITY_TOKEN_LENGTH
    # ...

  elsif masked_token.length == AUTHENTICITY_TOKEN_LENGTH * 2
    csrf_token = unmask_token(masked_token)

    compare_with_real_token(csrf_token, session) ||
      valid_per_form_csrf_token?(csrf_token, session)
  else
    false # Token is malformed.
  end
end
```


Đầu tiên, cần lấy chuỗi mã hóa Base64 và giải mã nó để kết thúc bằng "masked token". Từ đây, sẽ hiển thị `token` và sau đó so sánh nó với mã với thằng `token` trong session:

```
def unmask_token(masked_token) # :doc:
  one_time_pad = masked_token[0...AUTHENTICITY_TOKEN_LENGTH]
  encrypted_csrf_token = masked_token[AUTHENTICITY_TOKEN_LENGTH..-1]
  xor_byte_strings(one_time_pad, encrypted_csrf_token)
end
```

Trước khi `#unmask_token` có thể thực hiện phép thuật mật mã cần thiết để giải mã token, phải chia masked token  thành các phần cần thiết của nó: `one-time pad` và `encrypted token`. Sau đó, XORs hai string để tạo ra thằng  plaintext token. 
Cuối cùng, `#compare_with_real_token` dựa vào `ActiveSupport :: SecureUtils` để đảm bảo token matching:

```
def compare_with_real_token(token, session) # :doc:
  ActiveSupport::SecurityUtils.secure_compare(token, real_csrf_token(session))
end
```

Và cuối cùng, request đã được xác thực.

**Thanks for your reading!**

Bài viết được dịch từ nguồn [A Deep Dive into CSRF Protection in Rails](https://medium.com/rubyinside/a-deep-dive-into-csrf-protection-in-rails-19fa0a42c0ef)