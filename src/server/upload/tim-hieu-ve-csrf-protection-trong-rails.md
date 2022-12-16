Chắc hẳn với một Rails developer thì đã khá quen với CSRF protection. Nó đã được đưa vào Rails gần như [ngay từ đầu](https://github.com/rails/rails/commit/4e3ed5bc44f6cd20c9e353ab63fd24b92a7942be) - một tính năng cực kì hữu ích trong Rails giúp bạn phát triển dễ dàng hơn.

Về cơ bản, Cross-Site Request Forgery (CSRF) là một dạng tấn công cho phép một người dùng độc hại giả mạo các yêu cầu hợp pháp đến máy chủ (giả mạo như là một người dùng đã được chứng thực). Rails bảo vệ chống lại kiểu tấn công này bằng cách tạo ra các thẻ duy nhất và xác nhận tính xác thực của chúng với mỗi lần gửi.

Gần đây, tôi đã làm việc trên một tính năng tại Unbounce, yêu cầu phải suy nghĩ về CSRF và cách xử lý nó trong các yêu cầu Javascript phía client. Đó là lúc tôi nhận ra rằng tôi thực sự biết về nó như thế nào - chỉ ở mức khái niệm viết tắt!

Tôi đã quyết định đi sâu vào Rails codebase để hiểu làm thế nào các tính năng đã được thực hiện. Sau đây là kết quả về cách CSRF protection hoạt động trong Rails. Chúng ta sẽ xem xét cách tạo ra các mã thông báo cho từng phản hồi và cách chúng được sử dụng cho yêu cầu gửi đến để xác thực tính xác thực của yêu cầu.

# Cơ bản
Có hai thành phần của CSRF. Thứ nhất, một mã thông báo duy nhất được nhúng trong HTML của trang web của bạn. Cùng một mã thông báo này cũng được lưu trữ trong cookie phiên. Khi người dùng tạo một yêu cầu POST, mã thông báo CSRF từ HTML sẽ được gửi cùng với yêu cầu đó. Rails so sánh mã thông báo từ trang bằng mã thông báo từ cookie phiên để đảm bảo chúng phù hợp.

![](https://images.viblo.asia/8b16014a-9f34-4587-a62d-7a08aa3b5a78.png)

# Cách sử dụng
Mặc định Rails sẽ hộ trợ CSRF protection. Nó được khai báo trong `application_controller.rb` cho phép CSRF protection:

```Ruby
# app/controllers/application_controller.rb

protect_from_forgery with: :exception
```

Tiếp theo khai báo ở view như sau:
```Ruby
# app/views/layouts/application.html.erb

<%= csrf_meta_tags %>
```

Điều này được thực hiện mặc định khi bạn tạo một project Rails mới. Nhưng nó thực sự hoạt động như thế nào?

# Tạo và mã hóa (Generation and Encryption)

Chúng tôi sẽ bắt đầu với helper method **#csrf_meta_tags** nhúng `authenticity token` vào HTML.

```Ruby
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

Ở đây chúng ta chỉ cần tập trung vào thẻ **csrf-token**, đó là nơi mọi thứ kì diệu xảy ra. 
Helper gọi tới method **#form_authenticity_token** để lấy token thông báo thực tế. Tại thời điểm này, chúng tôi đã nhập module RequestForgeryProtection của ActionController.

Module RequestForgeryProtection xử lý tất cả mọi thứ để làm với CSRF. Nó nổi tiếng với method **#protect_from_forgery** mà bạn nhìn thấy trong ApplicationController, thiết lập một số móc để đảm bảo xác nhận CSRF được kích hoạt trên mỗi yêu cầu và làm thế nào để trả lời nếu yêu cầu không được xác minh. Nhưng nó cũng quan tâm đến việc sinh ra, mã hóa và giải mã các thẻ CSRF. Những gì tôi thích về module này là phạm vi nhỏ của nó; ngoài một số view helper, bạn có thể thấy toàn bộ việc thực hiện bảo vệ CSRF ngay trong file này.

Hãy tiếp tục đi sâu xuống cách CSRF token kết thúc bằng HTML. **#form_authenticity_token** là một phương thức bao bọc đơn giản truyền bất kỳ thông số tùy chọn nào, cũng như session, thành **#masked_authenticity_token**:

```Ruby
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

Kể từ khi giới thiệu [các CSRF token cho mỗi form trong Rails 5](http://edgeguides.rubyonrails.org/upgrading_ruby_on_rails.html#per-form-csrf-tokens), phương thức **#masked_authenticity_token** đã trở nên phức tạp hơn một chút. Với mục đích của bài viết này, chúng tôi sẽ tập trung vào việc triển khai ban đầu, một CSRF token duy nhất cho mỗi yêu cầu - một kết thúc trong thẻ **meta**. Trong trường hợp đó, chúng ta chỉ có thể tập trung vào nhánh **else** của điều kiện ở trên, kết thúc việc thiết lập **raw_token** thành giá trị trả về của method **#real_csrf_token.**

Tại sao chúng ta vượt qua **session** vào **#real_csrf_token?** Bởi vì phương thức này thực sự làm hai việc: nó tạo ra, không mã hóa mã token, và nó stuffs token vào session cookie:

```Ruby
# actionpack/lib/action_controller/metal/request_forgery_protection.rb

def real_csrf_token(session) # :doc:
  session[:_csrf_token] ||= SecureRandom.base64(AUTHENTICITY_TOKEN_LENGTH)
  Base64.strict_decode64(session[:_csrf_token])
end
```

Hãy nhớ rằng phương thức này được gọi cuối cùng bởi vì chúng ta đã gọi **#csrf_meta_tags** trong application layout. Đây là Rails Magic cổ điển - một tác dụng phụ thông minh đảm bảo token trong session cookie sẽ luôn phù hợp với token trên trang, bởi vì việc hiển thị token cho trang không thể xảy ra mà không cần chèn thêm token đó vào cookie.

Dù sao, chúng ta hãy nhìn vào dưới cùng của method **#masked_authenticity_token**:

```Ruby
 one_time_pad = SecureRandom.random_bytes(AUTHENTICITY_TOKEN_LENGTH)
  encrypted_csrf_token = xor_byte_strings(one_time_pad, raw_token)
  masked_token = one_time_pad + encrypted_csrf_token
  Base64.strict_encode64(masked_token)
```

Thời gian cho một số mật mã. Sau khi đã chèn token vào session cookie, method này liên quan đến việc trả lại token kết thúc bằng HTML thuần túy và ở đây sẽ thực hiện một số biện pháp phòng ngừa (chủ yếu để [giảm thiểu khả năng tấn công SSL BREAK](https://github.com/rails/rails/pull/16570), mà tôi sẽ không đi vào đây). Lưu ý rằng chúng tôi đã không mã hóa các token mà đi vào session cookie, bởi vì như của Rails 4 session cookie chính nó sẽ được mã hóa.

Đầu tiên, chúng ta tạo one_time_pad mà chúng ta sẽ sử dụng để mã hóa raw token. one_time_pad là một kỹ thuật mật mã sử dụng khóa được tạo ngẫu nhiên để mã hóa một raw token bằng cùng độ dài và yêu cầu khóa được sử dụng để giải mã tin nhắn. Nó được gọi là pad "một lần" vì lý do: mỗi key được sử dụng cho một tin nhắn, và sau đó bị loại bỏ. Rails thực hiện điều này bằng cách tạo ra one_time_pad mới cho mỗi CSRF token mới, sau đó sử dụng nó để mã hóa các token bằng cách sử dụng XOR bitwise operation. Chuỗi pad một lần được thêm vào chuỗi mã hoá, sau đó mã hóa Base64 để tạo chuỗi sẵn sàng cho HTML.

![](https://images.viblo.asia/3d59ee24-cc8e-4628-b4ab-02960aca896f.png)

Tổng quan về cách mã hoá CSRF token hoạt động. Tôi đã sử dụng 12 ký tự ở đây để minh họa; chiều dài mã thẻ mặc định là 32 ký tự.

Khi thao tác này hoàn tất, chúng tôi sẽ gửi authenticity token trở lại ngăn xếp, nơi nó kết thúc trong application layout được hiển thị:

```Ruby
<meta name="csrf-param" content="authenticity_token" />
<meta name="csrf-token" content="vtaJFQ38doX0b7wQpp0G3H7aUk9HZQni3jHET4yS8nSJRt85Tr6oH7nroQc01dM+C/dlDwt5xPff5LwyZcggeg==" />
```

# Giải mã và xác minh (Decryption and verification)
Tiếp theo, chúng ta hãy nhìn vào cách Rails xác nhận một yêu cầu gửi đến.

Khi người dùng gửi form trên trang web của bạn, CSRF token được gửi cùng với phần còn lại của form data (một tham số được gọi là **authenticity_token** theo mặc định). Nó cũng có thể được gửi qua **X-CSRF-Token** HTTP header.

Tiếp tục chú ý tới dòng này trong ApplicationController:

```Ruby
# app/controllers/application_controller.rb

protect_from_forgery with: :exception
```

Trong số những thứ khác, method **#protect_from_forgery** này thêm before_action vào vòng đời của mọi controller action:

```Ruby
before_action :verify_authenticity_token, options
```

Action này trước khi bắt đầu quá trình so sánh CSRF token trong phần request params hoặc header với token trong session  cookie:

```Ruby
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

Sau khi thực hiện một số tác vụ quản trị (ví dụ: chúng tôi không cần phải xác minh các yêu cầu HEAD hoặc GET), quy trình xác minh của chúng tôi bắt đầu một cách nghiêm túc với cuộc gọi tới **#any_authenticity_token_valid?**:

```Ruby
def any_authenticity_token_valid? # :doc:
  request_authenticity_tokens.any? do |token|
    valid_authenticity_token?(session, token)
  end
end
```

Vì một yêu cầu có thể vượt qua mã thông báo trong các params hoặc header, Rails chỉ yêu cầu rằng ít nhất một trong số những token này phù hợp với mã thông báo trong session cookie.

**#valid_authenticity_token?** là một method khá dài, nhưng cuối cùng nó chỉ làm ngược lại **#masked_authenticity_token** để giải mã và so sánh token:

```Ruby
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

Trước tiên, chúng ta cần lấy chuỗi mã hoá Base64 và giải mã nó để kết thúc với "masked token". Từ đây, chúng tôi phát hiện ra token và sau đó so sánh nó với token trong session:

```Ruby
def unmask_token(masked_token) # :doc:
  one_time_pad = masked_token[0...AUTHENTICITY_TOKEN_LENGTH]
  encrypted_csrf_token = masked_token[AUTHENTICITY_TOKEN_LENGTH..-1]
  xor_byte_strings(one_time_pad, encrypted_csrf_token)
end
```

Trước khi **#unmask_token** có thể thực hiện ma thuật mã hóa cần thiết để giải mã token, chúng ta phải tách token đã được che dấu vào các phần cần thiết của nó: one-time pad và token được mã hóa. Sau đó, nó XOR hai string để cuối cùng tạo ra token thuần túy.

Cuối cùng, **#compare_with_real_token** dựa vào `ActiveSupport :: SecureUtils` để đảm bảo các token match với nhau:
```Ruby
def compare_with_real_token(token, session) # :doc:
  ActiveSupport::SecurityUtils.secure_compare(token, real_csrf_token(session))
end
```

Và, cuối cùng, yêu cầu được xác thực - bạn sẽ vượt qua!

# Tóm lại

Trước đó, tôi đã không bao giờ suy nghĩ quá nhiều về CSRF prorection, vì như nhiều thứ khác trong Rails, nó "chỉ làm việc". Mỗi lần trong một khoảng thời gian, thật là vui khi nhìn thấy phía sau bức màn ma thuật và xem điều gì đang xảy ra.

Tôi nghĩ rằng việc thực hiện bảo vệ CSRF là một ví dụ tuyệt vời của việc tách trách nhiệm trong một codebase. Bằng cách tạo ra một mô-đun đơn lẻ và phơi bày một giao diện công cộng nhỏ và nhất quán, việc triển khai bên dưới có thể thay đổi ít hoặc không có tác động đến phần còn lại của codebase - và bạn có thể thấy hành động này khi nhóm Rails đã thêm các tính năng mới vào CSRF bảo vệ trong những năm qua, chẳng hạn như thẻ mỗi form.

Tôi học rất nhiều mỗi khi tôi nhảy vào Rails codebase. Tôi hy vọng điều này truyền cảm hứng cho bạn để làm điều tương tự với Rails codebase.

Bài viết này mình dịch từ bài viết [A Deep Dive into CSRF Protection in Rails](https://medium.com/rubyinside/a-deep-dive-into-csrf-protection-in-rails-19fa0a42c0ef)