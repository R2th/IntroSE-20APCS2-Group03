Nếu ngày nay bạn sử dụng Rails, hay bất kỳ framework nào thuộc hàng không quá cổ lỗ sĩ, thì nhiều khả năng là bạn đã có cơ chế chống CSRF rồi đó. Từ [thủa ban đầu của Rails](https://github.com/rails/rails/commit/4e3ed5bc44f6cd20c9e353ab63fd24b92a7942be) đã như vậy rồi, và đó cũng là một trong những tính năng của Rails khiến cho bạn code ngon mà không cần nghĩ ngợi gì nhiều.

Nói sơ qua thì `CSRF` - hay viết đầy đủ là `Cross-Site Request Forgery` là một kiểu tấn công cho phép kẻ tấn công giả danh một người dùng đã được xác thực để gửi một request tới server của chúng ta. Đây là một trong những dạng tấn công khá cơ bản và có từ rất lâu rồi, giờ hầu như ai cũng biết, và vì thế đa số các framework đều có cơ chế phòng chống. Cách làm chung phổ biến là tạo ra một token unique và trong mỗi request gửi lên, sẽ có một bước kiểm tra độ xác thực của request thông qua token này. Vì framework hỗ trợ sẵn hết, nên có lẽ rất nhiều trong chúng ta chỉ biết chung chung thế, chứ chưa một lần xem cụ thể xem nó hoạt động từng bước như thế nào. Trong bài viết hôm nay, ta hãy thử tìm hiểu cặn kẽ cách mà Rails đã làm.

### Những điều cơ bản nên biết

Có 2 thành phần cơ bản trong cơ chế chống `CSRF`. Trước tiên, đó là một token unique được nhúng trong trang HTML của bạn. Token đó đồng thời cũng được lưu trong session cookies. Khi người dùng gửi lên một `POST` request, `CSRF token` trong trang HTML sẽ được gửi kèm cùng request. Rails sẽ so sánh token đó với token được lưu trong session cookie để đảm bảo là chúng khớp nhau.
![](https://images.viblo.asia/19067244-435c-4ff4-97d2-471d38193fe7.png)

### Dùng như thế nào

Nếu bạn dùng Rails, coi như mặc định là bạn đã có cơ chế chống `CSRF` rồi. Bắt đầu với dòng code này trong file `application_controller.rb` .
```
protect_from_forgery with: :exception
```

Sau đó, chỉ cần dòng này trong file `application.html.erb:`

```
<%= csrf_meta_tags %>
```

Thế là xong. Chỉ đơn giản thế thôi nên chẳng mấy khi ta để ý đến chung. Nhưng còn phía dưới, Rails đã làm những gì ?

### Khởi tạo và mã hóa

Đầu tiên, chúng ta bắt đầu với `#csrf_meta_tags`. Đây là một view helper đơn giản giúp nhúng token xác thực vào trong trang HTML:

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

Chúng ta sẽ tập trung vào tag `csrf-token ` vì mọi logic đa phần diễn ra ở đây. Tag helper này gọi đến `#form_authenticity_token` để lấy về token. Tới đây, chúng ta đã chạm tới module `RequestForgeryProtection` của `ActionControllers`. Đoạn này bắt đầu vui đây!

Module `RequestForgeryProtection` xử lý tất cả những gì liên quan đến `CSRF`. Thường được biết đến qua phương thức `#protect_from_forgery` bạn thấy trong `ApplicationController`, trong  phương thức này  ta sử dụng một vài hooks để đảm bảo rằng việc xác thực `CSRF` được gọi đến trong mọi request, và xử lý thế nào nếu như xác thực này thất bại. Ngoài ra, nó cũng phụ trách việc khởi tạo, mã hóa và giải mã `CSRF` token.

Tiếp tục tìm hiểu xem làm sao mà `CSRF token` của chúng ta được xuất hiện trong trang HTML. `#form_authenticity_token` là một wrapper method đơn giản trong đó truyền tất cả những optional parameter cùng với cả session  xuống cho `#masked_authenticity_token`:

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

Từ ngày Rails 5 đưa ra [per-form CSRF tokens](http://edgeguides.rubyonrails.org/upgrading_ruby_on_rails.html#per-form-csrf-tokens), phương thức `#masked_authenticity_token` đã phức tạp hơn kha khá. Trong khuôn khổ bài viết này ( nhằm giải thích cơ chế chống `CSRF` ) chúng ta sẽ tập trung vào cách mà phương thức này được triển khai hồi đầu, mỗi một request có một token duy nhất, được gắn trong tag `meta`. Trong trường hợp này, chúng ta có thể chỉ cần tập trung vào nhánh `else` của khối điều kiện bên trên, trong đó gán cho `raw_token` giá trị trả về của `#real_csrf_token`.

Tại sao chúng ta lại cần truyền `session` vào trong `#real_csrf_token`? Bởi vì thật ra phương thức này thực hiện hai việc:  nó tạo ra một token nguyên gốc, chưa mã hóa, *và* nó gắn token này vào trong session cookie:
```
# actionpack/lib/action_controller/metal/request_forgery_protection.rb

def real_csrf_token(session) # :doc:
  session[:_csrf_token] ||= SecureRandom.base64(AUTHENTICITY_TOKEN_LENGTH)
  Base64.strict_decode64(session[:_csrf_token])
end
```
Hãy nhớ rằng, phương thức này được gọi đến là do ban đầu, chúng ta gọi `#csrf_meta_tags` trong application layout. Đây là một cách làm khá điển hình của Rails - một giải pháp thông minh đảm bảo cho chúng ta rằng token lưu trong session cookie sẽ luôn khớp với token trong trang HTML, bởi vì chúng ta không thể tạo ra token cho trang HTML mà không chèn token đó vào trong cookie.

Quay lại câu chuyện của chúng ta, hãy xem đoạn cuối của `#masked_authenticity_token`:

```
  one_time_pad = SecureRandom.random_bytes(AUTHENTICITY_TOKEN_LENGTH)
  encrypted_csrf_token = xor_byte_strings(one_time_pad, raw_token)
  masked_token = one_time_pad + encrypted_csrf_token
  Base64.strict_encode64(masked_token)
```

Tới đây, ta hãy nhớ lại một chút kiến thức về mã hóa. Ở đây, vì phương thức này sẽ phải trả về token dưới dạng text trong HTML, ta cần làm một vài biện pháp đề phòng ( có lẽ chủ yếu là để tránh các [lỗ hổng SSL](https://github.com/rails/rails/pull/16570) ). Lưu ý là chúng ta không mã hóa token trong session cookie, vì từ Rails 4 trở đi, bản thân session cookie đã được mã hóa rồi.

Đầu tiên, chúng ta sẽ tạo ra một chuỗi dùng một lần (gọi là `one-time pad`) để mã hóa token. Đây là một kỹ thuật mã hóa sử dụng một key được tạo ngẫu nhiên có độ dài bằng độ dài chuỗi cần mã hóa, để đem vào mã hóa, và khi giải mã sẽ cần có key này. Sở dĩ gọi là dùng một lần vì mỗi key sẽ được dùng chô một message, sau đó bỏ đi không lưu lại. Rails thực hiện việc này bằng cách tạo ra one-time pad cho mọi CSRF token mới, sau đó dùng nó để mã hóa token với thuật toán XOR. One-time pad sau đó được gắn thêm vào chuỗi sau mã hóa, và đem encode  base64 để hiển thị được trong trang HTML


![](https://images.viblo.asia/9ba1d6f1-6eff-47e0-8906-2bc52310e990.png)

Sau khi hoàn thành, ta sẽ trả về chuỗi thu được, và đến cuối cùng sẽ render nó ra trên application layout:

```
<meta name="csrf-param" content="authenticity_token" />
<meta name="csrf-token" content="vtaJFQ38doX0b7wQpp0G3H7aUk9HZQni3jHET4yS8nSJRt85Tr6oH7nroQc01dM+C/dlDwt5xPff5LwyZcggeg==" />
```

### Giải mã và xác thực

Khi user submit một form lên cho server, CSRF sẽ được gửi kèm theo ( mặc định là trong param `authenticity_token`). Ngoài ra, nó cũng có thể được gửi trong header `X-CSRF-Token` của request.

Hãy nhớ lại dòng này trong `ApplicationController`: 

```
protect_from_forgery with: :exception
```

Ngoài những nhiệm vụ khác, `#protect_from_forgery` còn thêm vào một hành động `before-action` cho mọi controller action :

```
before_action :verify_authenticity_token, options
```

Trong hàm `before_action` này sẽ tiến hành việc  so sánh CSRF token nhận được với token trong session :

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

Quá trình xác thực của chúng ta thật sự được tiến hành khi gọi đến `#any_authenticity_token_valid?`:

```
def any_authenticity_token_valid? # :doc:
  request_authenticity_tokens.any? do |token|
    valid_authenticity_token?(session, token)
  end
end
```

Phương thức ```#valid_authenticity_token?` khá là dài, nhưng nói chung là nó chỉ làm ngược lại những gì diễn ra trong hàm `#masked_authenticity_token` nhằm giải mã và đem token ra so sánh: 

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

Chúng ta decode đoạn string đã được qua base64 encode, để thu được "masked token". Từ đây, chúng ta thực hiện việc "unmask" nó và só sánh với token trong session:
```
def unmask_token(masked_token) # :doc:
  one_time_pad = masked_token[0...AUTHENTICITY_TOKEN_LENGTH]
  encrypted_csrf_token = masked_token[AUTHENTICITY_TOKEN_LENGTH..-1]
  xor_byte_strings(one_time_pad, encrypted_csrf_token)
end
```

Trước khi `#unmask_token ` có thể thực hiện việc giải mã, ta cần phải đem `masked_token` chia thành 2 phần, `one-time pad` và token đã qua mã hóa. Sau đó, ta đem 2 phần thực hiện phép `XOR` để lấy ra token dưới dạng plaintext.

Và cuối cùng, `#compare_with_real_token` dựa vào hàm `ActiveSupport::SecureUtils` để đảm bảo 2 token của ta khớp nhau

```
def compare_with_real_token(token, session) # :doc:
  ActiveSupport::SecurityUtils.secure_compare(token, real_csrf_token(session))
end
```

Qua được đoạn này, request của ta đã được chứng thực là hợp lệ.

### Lời kết

Trước giờ, chúng ta không để ý đến việc chống `CSRF`, vì cũng như nhiều tính năng khác trong Rails, nó "hoạt động ngon sẵn rồi". Tuy nhiên, thỉnh thoảng chọc ngoáy vào xem cụ thể framework đã thực hiện những công việc gì, ngoài chuyện khá thú vị và giúp ta hiểu sâu thêm về cách thức hoạt động, đôi khi cũng cho ta nhiều bài học khác. Ví dụ như ở đây,  tôi cho rằng cách implement cơ chế chống CSRF này là một ví dụ tốt về chuyện phân chia trách nhiệm - `separation of responsibilities ` - trong code. Qua việc tạo  ra một module duy nhất và chỉ expose một interface nhỏ, ổn định ra bên ngoài, việc implement cụ thể đằng sau có thể thoải mái thay đổi mà không sợ ảnh hưởng tới những phần code khác. Cụ thể là trong suốt những năm qua, đội ngũ phát triển Rails đã âm thầm thêm vào nhiều tính năng chống CSRF mới, như là per-form token mà không hề sợ người dùng framework bị ảnh hưởng.