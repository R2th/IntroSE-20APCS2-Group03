# Lời mở đầu

Cross-site scripting (XSS) là một loại lỗ hổng bảo mật máy tính cho phép kẻ tấn công chèn mã vào một trang web. Khi người dùng truy cập trang web sau khi mã đó được nhúng, nó sẽ được thực thi trong trình duyệt của người dùng. TỪ đó, kẻ tấn công có thể lấy cắp cookie của người dùng, hoặc lợi dụng admin để thay đổi thông tin trên hệ thống,...

Hãy thử kiểm tra kiến thức về XSS của bạn trong Rails nhé !

# Một số câu hỏi

## Câu 1:
Ví dụ nào dưới đây an toàn với XSS ?

```erb
<%= @user.comment %>
<%= html_escape @user.comment %>
<%= sanitize @user.comment %>
<%= raw @user.comment %>
<%= @user.comment.html_safe %>
```

Câu trả lời là 3 option đầu tiên. Kể từ Rails 3 trở đi, Rails đã tự động hỗ trợ phòng tránh XSS. Tất cả những chuỗi được truyền qua ```<%= %>``` đã được tự động [escape](https://cultivatehq.com/posts/rails-3-html-escaping/). Thậm chí, ở option 2 còn thừa khi escape tận 2 lần.

2 option cuối là không an toàn với XSS. Sử dụng ```raw``` hoặc ```html_safe``` thì khi render ```@user.comment``` sẽ không được escape. Khi đó, nếu như có 1 attacker nhúng mã JS và comment thông qua tag ```<script>``` thì tất cả những user khác khi nhìn thấy comment đó, trình duyệt sẽ tự động thực hiện đoạn code JS được attacker nhúng vào. Từ đó có thể ăn cắp cookie hoặc mượn tay admin thay đổi thông tin trên hệ thống.

## Câu 2:

Giả sử như chúng ta muốn implement một method như sau trong helper:

```ruby
module ApplicationHelper
  def strong(content)
    # Các content được truyền vào sẽ được nằm trong tag `strong`
  end
end
```

Cách implement nào sau đây là an toàn với XSS ?

```ruby
content_tag(:strong, content)
"<strong>#{html_escape content}</strong>"
"<strong>#{content}</strong>".html_safe
raw("<strong>#{content}</strong>")
```

Chỉ option 1 là đúng ! ```content_tag``` (cũng như ```tag```) escape content được truyền vào, sau đó đưa nó vào trong tag ```strong```.

Option 2 sẽ escape content với html_escape, tuy nhiên nó cũng sẽ escape tag ```strong``` được truyền vào. Do đó đoạn code sẽ không thực hiện đúng như những gì ta muốn.

2 option còn lại thì lại tương tự với câu hỏi 1.

## Câu hỏi cuối

Một kiểu tấn công XSS thường thấy đó là lợi dụng thuộc tính ```href``` trong tag ```a```. Nếu nó bắt đầu với ```javascript:``` hay ```data:``` thì đoạn mã sẽ được thực hiện khi người dùng click vào link.

Vậy cách viết nào dưới đây an toàn với XSS ?

```html
<a href='<%= @user.website %>'>Personal Website</a>
<%= link_to 'Personal Website', @user.website %>
<%= link_to 'Personal Website', sanitize(@user.website) %>
<%= sanitize link_to 'Personal Website', @user.website %>
```

Chỉ option cuối là an toàn. ```sanitize``` chỉ hoạt động với toàn bộ tag HTML, không hoạt động với URL. Điều này có nghĩa là bạn nên sử dụng ```sanitize``` với cả tag ```a``` chứ không phải riêng với thuộc tính ```href```.

# Tổng kết

* Rails có cơ chế tự động escape khi code nằm trong thẻ <%= %>
* Chỉ sử dụng ```raw``` và ```html_safe``` khi bạn chắc chắn rằng mình đang render code html (Ví dụ như khi lấy nội dung từ [CKEditor](https://ckeditor.com/)).
* Rails sẽ không thể bảo vệ hệ thống của bạn nếu như bạn truyền những gì user nhập vào tag ```a``` hoặc ```link_to```. Trong trường hợp đó thì bạn cần phải sử dụng ```sanitize```.

Để phát hiện những lỗ hổng XSS, tôi khuyên bạn nên sử dụng thử [brakeman](https://github.com/presidentbeef/brakeman). Nó sẽ phân tích những lỗ hổng trên hệ thống Rails của bạn.

# Nguồn bài viết

https://revs.runtime-revolution.com/rails-quiz-xss-edition-6ace80dc9515