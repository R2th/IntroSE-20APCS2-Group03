Nếu như bạn đang sử dụng Rails, rất có thể bạn cũng đang sử dụng cơ chế bảo vệ **CSRF**. Đây là một tính năng đã xuất hiện ngay từ những phiên bản đầu tiên của **Rails**.
Nói qua một chút về **Cross-Site Request Forgery** (CSRF), nó là một phương thức tấn công được thực hiện bằng việc giả mạo các request đến máy chủ của bạn như một người dùng thực sự trong hệ thống. **Rails** chống lại loại tấn công này bằng cách tạo ra các token để xác thực cho mỗi request.
## Tổng quan
CSRF bao gồm hai thành phần:
- Một token được nhúng vào trang HTML, đồng thời nó cũng được lưu lại trong session
- Khi người dùng gửi request, Rails sẽ so sánh chuỗi token nhận được với những gì đang được lưu trong session và đảm bảo chúng trùng khớp
![](https://images.viblo.asia/08ea0c4c-1dda-4151-8146-7a96cc6f2a2a.png)
## Sử dụng trong Rails
Rất đơn giản, chắc hẳn khi vừa khởi tạo project chúng ta đã thấy ngay dòng đầu tiên trong `application_controller.rb` một lời gọi kích hoạt cơ chế bảo vệ CSRF:

```ruby
protect_from_forgery with: :exception
```

Tiếp sau đó là một dòng code trong `application.html.erb`
```ruby
<%= csrf_meta_tags %>
```
Đó cũng chính là hai thành phần mà chúng ta vừa phân tích ở trên. Nhưng chúng thực sự sẽ hoạt động như thế nào?
## Tạo và mã hóa token
Theo đúng vòng hoạt động, chúng ta sẽ bắt đầu với `csrf_meta_tags`. Nó đơn thuần chỉ là một view helper giống như `content_tag`, `link_to`... Chức năng của nó là render ra các thẻ meta có nội dung là các token đã được mã hóa.
```ruby
def csrf_meta_tags
  if protect_against_forgery?
    [
      tag("meta", name: "csrf-param", content: request_forgery_protection_token),
      tag("meta", name: "csrf-token", content: form_authenticity_token)
    ].join("\n").html_safe
  end
end
```
Chúng ta sẽ tập chung vào `csrf-token` vì đó là nơi mọi thứ được bắt đầu. `form_authenticity_token` là một method dùng để lấy nội dung token. Tại thời điểm này, chúng ta sẽ cùng nhau tìm hiểu về module `RequestForgeryProtection`.

`RequestForgeryProtection` là một module chứa đựng logic xử lý mọi thứ với CSRF.  Nó đảm bảo việc xác thực CSRF sẽ được thực hiện trên mỗi request cũng như việc phản hồi nếu như có một request nào đó không được xác thực. Nó cũng là nơi tạo, mã hóa và giải mã CSRF tokens.

Hãy cùng tiếp tục đi sâu vào cách mã hóa CSRF trước khi mọi thứ được nhúng vào trang HTML của bạn. `form_authenticity_token` đơn giản chỉ là một method nhận vào các option parameters và thực hiện một lời giọi tới method `masked_authenticity_token`
```ruby
def form_authenticity_token(form_options: {})
  masked_authenticity_token(session, form_options: form_options)
end
```
Trong method `masked_authenticity_token` mọi thứ mới thực sự được diễn ra:
```ruby
def masked_authenticity_token(session, form_options: {}) 
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
Nó nhận vào session là để truyền vào cho `real_csrf_token`. Tại đây, một token được tạo ra và được lưu lại trong `session[:_csrf_token]` trước khi nó được mã hóa:
```ruby
def real_csrf_token(session) # :doc:
  session[:_csrf_token] ||= SecureRandom.base64(AUTHENTICITY_TOKEN_LENGTH)
  Base64.strict_decode64(session[:_csrf_token])
end
```
Kết quả cuối cùng mà `masked_authenticity_token`trả về là một token được mã hóa từ chuỗi kết hợp từ token lưu trong `session[:_csrf_token]` và một khóa gọi là `one_time_pad`. Khóa này sẽ được sử dụng để giải mã token trong quá trình xác thực sau này.
```ruby
one_time_pad = SecureRandom.random_bytes(AUTHENTICITY_TOKEN_LENGTH)
encrypted_csrf_token = xor_byte_strings(one_time_pad, raw_token)
masked_token = one_time_pad + encrypted_csrf_token
Base64.strict_encode64(masked_token)
```
Toàn bộ quá trình sẽ được mình họa bằng hình ảnh bên dưới:
![](https://images.viblo.asia/2237bcf1-9a3c-4816-b722-1fe2a37f8e44.png)

Khi tất cả hoàn tất, `<%= csrf_meta_tags %>` sẽ render ra ngoài view hai thẻ meta và nội dung của chúng sẽ trông thế này:
```ruby
<meta name="csrf-param" content="authenticity_token" />
<meta name="csrf-token" content="vtaJFQ38doX0b7wQpp0G3H7aUk9HZQni3jHET4yS8nSJRt85Tr6oH7nroQc01dM+C/dlDwt5xPff5LwyZcggeg==" />
```
## Giải mã và xác thực
Vừa rồi chúng ta đã đi tìm hiểu làm thế nào một CSRF token được tạo và nhúng vào HTML. Tiếp theo hãy cùng xem Rails đã làm gì để xác thực một request. Đó cũng là bước cuối cùng trong toàn bộ quá trình bảo vệ CSRF.

Khi người dùng submit form, CSRF token sẽ được gửi theo tương tự như như các form data khác. Nó cũng có thể được gửi thông qua `X-CSRF-Token` của HTTP header.

Trong `ApplicationController`:

```ruby
protect_from_forgery with: :exception
```

Một trong những điều mà `protect_from_forgery` thực hiện là thêm một `before_action` vào `lifecycle` của tất cả các `action` trong `controller`:
```ruby
before_action :verify_authenticity_token, options
```

Callback `verify_authenticity_token` bắt đầu bằng việc so sánh CSRF token nhận được từ request params hoặc từ header với token đã được lưu trong session:
```ruby
def verify_authenticity_token
  if !verified_request?
    # handle errors ...
  end
end

def verified_request?
  !protect_against_forgery? || request.get? || request.head? ||
    (valid_request_origin? && any_authenticity_token_valid?)
end
```
Xác thực `any_authenticity_token_valid?` được thực hiện cuối cùng sau khi các thủ tục thông thường khác đã được thông qua.
```ruby
def any_authenticity_token_valid? # :doc:
  request_authenticity_tokens.any? do |token|
    valid_authenticity_token?(session, token)
  end
end
```
Vì token có thể được gửi dưới dạng form data hoặc thông quan header, do đó Rails chỉ yêu cầu một trong số chúng được xác thực.
Method `valid_authenticity_token?` có chức năng là đảo ngược lại quá trình mà `masked_authenticity_token` trước đó đã thực hiện
## Tổng kết
Quá trình implementation CSRF protection là một ví dụ tuyệt vời về việc phân tách chức năng trong codebase. Bằng việc tạo ra một module tương ứng với một chức năng duy nhất Rails team đã phát triển thêm nhiều tính năng mới qua các phiên bản mà không làm ảnh hưởng đến phần còn lại của codebase.
Hi vọng qua bài viết chúng ta sẽ hiểu hơn về cách hoạt động của cơ chế bảo vệ CSRF trong Rails

Tham khảo: https://medium.com/rubyinside/a-deep-dive-into-csrf-protection-in-rails-19fa0a42c0ef