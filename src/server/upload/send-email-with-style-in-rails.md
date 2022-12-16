# **Send email with style in rails**
> Bài viết được dịch từ https://www.imaginarycloud.com/blog/rails-send-emails-with-style/

## 1. Giới thiệu bài toán
Bạn đã từng phải gửi email từ ứng dụng Ruby on Rails ?

Có lẽ câu trả lời của bạn là "Có". Hầu hết chúng ta đều đã xử lý một số vấn đề với việc gửi email định dạng HTML bằng ứng dụng Ruby on Rails. Một số CSS đã được công nhận, nhưng thường chúng ta sẽ viết các view bằng css inline, dẫn đến các tệp lớn và gần như k thể đọc được.
Các giải pháp có sẵn để giải quyết vấn đề này là gì? Sau một số nghiên cứu, tôi đã tìm thấy một vài gem được phát hành gần đây và có thể giup nạn hoàn thành nhiệm vụ này như: [Roadie](http://github.com/Mange/roadie), [Premailer-rails](https://github.com/fphilipe/premailer-rails), [actionmailer_inline_css](https://github.com/premailer/actionmailer_inline_css) and [inline_styles_mailer](https://github.com/billhorsman/inline_styles_mailer) 

Sau đây, tôi sẽ đi qua từng gem và giải thích về cách cài đặt và sử dụng chúng.

## 2. Các giải pháp
### * ROADIE

Roadie tự động nhận được tất cả CSS mà bạn chú ý đặc biệt đến các selector. Ngoài ra, nó viết lại tất cả tương đối thành các đường dẫn tuyệt đối và tôn trọng bất kỳ kiểu inline style nào mà bạn có thể có. nó cũng có thêm bộ khung HTML và có thể sử dụng partials.

> Cài đặt và sử dụng:

Thêm gem vào Gemfile, sau đó `bundle install`: 
```
gem 'roadie', '~> 3.4'
```
Tiếp theo, tạo một đối tượng mới của Roadie:
```
document = Roadie::Document.new "<html><body></body></html>"
document.add_css "body { color: green; }"
document.transform
# => "<html><body style=\"color:green;\"></body></html>"
```
Chuyển đổi một phần với #transaction_partial:
```
document.add_css "div { color: green; }"
document.transform_partial
# => "<div style=\"color:green;\">Hello world!</div>"
```

Một số options có thể sử dụng để cấu hình đối tượng của bạn (xem thêm [tại đây](http://github.com/Mange/roadie) ):
* url_options - chỉ ra cách xây dựng URL tuyệt đối
* keep_uninlinable_css - đặt thành false để bỏ qua các CSS inline
* merge_media_queries - đặt thành false để không nhóm các truy vấn media. một số người dùng có thể không muốn nhóm cfasc quy tắc trong các truy vấn media vì điều đó có thể dẫn tới các qui tắc bị sắp xếp lại.
* asset_providers - danh sách các asset provider được gọi khi file  CSS đc tham chiếu
* external_asset_providers - danh sách các asset providers được gọi khi URL CSS tuyệt đối đc tham chiếu
* before_transformation - một callback chạy trước khi bắt đầu chuyển đổi
* after_transformation - một callback chạy sau khi chuyển đổi được hoàn thành

> Nhận xét về Roadie:

Roadie cực kỳ đầy đủ và với một số tùy chọn hữu ích, tuy nhiên, theo tôi nó có thê hơi phức tạp, tùy thuộc vào những gì bạn cần hoặc muốn. Nếu bạn cần sử dụng tài nguyên CDN hoặc sử dụng một bộ đệm, gem này sẽ là lựa chọn tốt nhất.

### * PREMAILER-RAILS

Giống như Roadie, Premailer-rails thực hiện công việc tuyệt vời khi chuyển đổi CSS của bạn thành inline style. bạn k cần Rails để sử dụng chúng vì chúng có thể chơi tốt với Sinatra.
Premailer-rails tự động được sử dụng bởi actionmailer sau khi bạn thêm nó vào Gemfile.  Premailer-rails sử dụng  Premailer.

> Cài đặt và sử dụng:

Thêm gem vào Gemfile, sau đó `bundle install`: 
```
gem 'premailer-rails'
```

Premailer default configs:
```
{
  input_encoding: 'UTF-8',
  generate_text_part: true,
  strategies: [:filesystem, :asset_pipeline, :network]
}
```

Để ngăn Premailer tạo một phần tử văn bản từ html, chỉ cần đặt generate_text_part = false
nếu cần, bạn có thể tắt Premailer cho một email nhất định, đặt skip_premailer = true như sau:
```
class UserMailer < ActionMailer::Base
  def welcome_email(user)
    mail to: user.email,
         subject: 'Welcome to My Awesome Site',
         skip_premailer: true
  end
end
```

> ÝNhận xét về Premailer-rails:

Premailer rất đơn giản để sử dụng và cấu hình, nêu bạn chỉ muốn gửi email theo kiểu mà không có cấu hình đặc biệt gì thì gem này là một lựa chọn tốt.

### * ACTIONMAILER INLINE CSS
Giống như Premailer và actionmailer inline CSS, gem này sử dụng Premailer và hoạt động rất sáng tạo.
> Cài đặt và sử dụng:

Thêm vào gemfile sau đó `bundle install`:
```
gem 'inline_styles_mailer'
```

Và sau đó chỉ cần thêm vào các trình gửi thư mong muốn, dòng bao gồm cho InlineStylesMailer:
```
class FooMailer < ActionMailer::Base
  include InlineStylesMailer
  def foo(email)
    mail(:to => email, :subject => "Foo foo!")
  end
end
```

Nếu bạn có file css app/assets/stylesheets/foo_mailer* (trong đó * có thể là .css, .css.scss, hoặc css.sass) thì nó sẽ tự động đc áp dụng cho mail sử dụng inline_style.

Nếu bạn muốn, bạn có thể sử dụng một file css khác:
```
class FooMailer < ActionMailer::Base
  include InlineStylesMailer
  use_stylesheet '_bar.css.sass'
  ...
end
```

Bạn thậm chí có thể sử dụng nhiều hơn 1 file css:

```
class FooMailer < ActionMailer::Base
  include InlineStylesMailer
  stylesheet_path 'public/stylesheets'
  ...
end
```

> Nhận xét về Inline style mailer:

Inline_style mailer cũng là một lựa chọn tốt, nó khá giống vói Premailer-rails và Actionmailer inline css. Nó dễ dàng cấu hình và có thể xử lý nhiều tệp css. theo tôi đó cũng là một lựa chọn tốt. tùy thuộc vào những điều bạn cần.
## Kết luận

Tùy thuộc vào nhu cầu của bạn là gì, bạn có thể lựa chọn 1 trong 3 gem dựa trên Premailer(Premailer-rails, Actionmailer Inline CSS và Inline Styles Mailer) hoặc Roadie.

Roadie có các tùy chọn cấu hình nâng cao (nếu bạn cần cấu hình đặc biệt để sử dụng CDN hoặc sử dụng bộ đệm) có thể trở nên hữu ích nhưng nếu yêu cầu của bạn không quá cao, bạn có thể chọn giữa ba loại gem khác, tất cả đều dựa trên premailer và cách sử dụng tương tự.