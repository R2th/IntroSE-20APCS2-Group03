## 1.Mở đầu
Internationalization (I18n) là quá trình (hoặc khái niệm của quy trình) để tạo ra một ứng dụng "quốc tế".  Nghĩa là, làm cho nó có thể hỗ trợ hầu như mọi ngôn ngữ  trên Trái đất.
## 2.Cài đặt
* Hãy bắt đầu với việc cài gem trong `Gemfile`
```
gem "rails-i18n"
```
Run `bundle install`

* Cấu hình đường dẫn để load các file language
```
# config/application.rb
config.i18n.load_path += Dir[Rails.root.join('config, 'locales', '**', '*.{rb,yml}')]
```
*  Cấu hình những ngôn ngữ mà chúng ta cần hiển thị
 ```
# config/application.rb
config.i18n.available_locales = [:en, :vi]
 ```
 * Bây giờ project đã hỗ trợ tiếng Anh và tiếng Việt. Tiếp theo chúng ta cài đặt ngôn ngữ mặc định khi chạy ứng dụng.
 ```
 # config/application.rb
 config.i18n.default_locale = :vi
 ```
* Cài đặt function để set ngôn ngữ trước khi load trang 
```
# app/controllers/application_controller.rb
before_action :set_locale
def set_locale
   I18n.locale = params[:locale] || I18n.default_locale
end
  ```
* Để tránh gặp phải lỗi : ActionController::RoutingError, ta thêm phương thức sau
```
# app/controllers/application_controller.rb
def default_url_options
  {locale: I18n.locale}
end
```
* Tuy nhiên có một vấn đề mỗi khi chuyển route thì nội dung của trang web sẽ hiển thị theo default locale. Để hiển thị theo nhiều ngôn ngữ ta cấu hình router như sau:
```
#config/routes.rb
scope "(:locale)", locale: /en|vi/ do
.....
end
```
* Thêm 2 dòng sau vào views để có thẻ click chuyển đổi giữa các ngôn ngữ.
```
<%= link_to "English", locale:"en" %>
<%= link_to "Vietnamese", locale:"vi" %>
```
* Lúc đó đường dẫn sẽ có dạng tương tự như sau 
```
http://localhost:3000/en
or
http://localhost:3000/vi
```
## 3.Ứng dụng
### 1. Sử dụng Scopes
1. Tất cả các bản dịch nằm trên cùng một mức.
```
# config/locales/vi.yml
vi:
  welcome: Chào mừng!
  bye: Tạm biệt!
  some_error: Một điều gì đó đã xảy ra...
```
Việc gọi các bản dịch như sau
```
t("welcome")
t("bye")
t("some_error")
```
Tuy nhiên việc có tất cả các bản dịch nằm trên cùng một mức sẽ không thuận tiện khi bạn có nhiều trang trong ứng dụng của mình, vì vậy ta nên sử dụng scopes

2. Các bản dịch sử dụng scopes.
```
# config/locales/vi.yml
vi:
  pages:
    index:
      welcome: Chào mừng!
```
Ta có thể gọi bản dịch bằng các cách sau
```
t("pages.index.welcome")
t("index.welcome", scope: :pages)
t(:welcome, scope: "pages.index")
t(:welcome, scope: [:pages, :index])
```    
Điều tuyệt vời, khi phạm vi được đặt tên theo đường dẫn của các thư mục chúng ta có thể viết nó một cách ngắn gọn
```
# views/pages/index.html.erb
<%= t ".welcome" %>
```
### 2. HTML
Để sử dụng html ta thêm hậu tố _html vào khóa:
```
# config/locales/vi.yml
 vi:
  pages:
    index:
      welcome_html: <h1>Chào mừng!</h1>
```
Để sử dụng chúng trong views ta thực hiện như sau
```
# views/pages/index.html.erb
<%= t ".welcome" %>
```
Một tùy chọn khác là lồng khóa html như thế này:
```
# config/locales/vi.yml
vi:
  pages:
    index:
      welcome:
        html: <h1>Welcome!</h1>
```
Để sử dụng chúng trong views ta thực hiện như sau
```
# views/pages/index.html.erb
<%= t ".welcome.html" %>
```
### 3. ActiveRecord
Ta có thể sử dụng I18n để khai báo các active record của model
```
# config/locales/vi.yml
vi:
  activerecord:
    models:
      user: "User"
    attributes:
      user:
        name: "Name"
        email: "Email"
```
Ta thường sử dụng các định nghĩa này trong các form làm việc với các thuộc tính của model

```
<%= f.label :title %>
```

Tiếp theo cung cấp một số quy tắc validation cho model:
```
# models/post.rb
...
validates :title, presence: true
validates :body, presence: true, length: {minimum: 2}
```
Active Record sẽ tìm kiếm các tin nhắn theo thứ tự này:
```
vi:
  activerecord:
    errors:
      models:
        post:
          attributes:
            title:
              blank: không được để trống
            body:
              blank: không được để trống
              too_short: "Độ dài chuỗi quá ngắn
```
Nó được ghi lại trong [Rails Internationalization (I18n) API Guide](https://guides.rubyonrails.org/i18n.html#translations-for-active-record-models) có thể cung cấp cho bạn một số thông tin chi tiết hơn.
### 4. Date and time
Rails cung cấp chuẩn hóa thời gian theo từng quốc gia với các format khác nhau
```
# config/locales/vi.yml
vi:
  time:
    formats:
      own: "%H:%M:%S, %d %B"
      default: "%d-%m-%Y"
      long: "%d %B, %Y"
      short: "%d %b"
```
Để sử dụng chúng trong views ta sử dụng các cú pháp sau:
```
l(post.created_at, format: :long)
```
Load format từ file vi.yml ứng với biến **long** đã định nghĩa
```
l(post.created_at, format: '%H:%M:%S, %d %B')
```
Format time **default** được định nghĩa sẵn trong lời gọi
```
l(post.created_at, locale: :vi)
```
### 5. Count
Ta cũng có thể chuẩn hóa hệ đếm theo định dạng của mỗi quốc gia
```
# locales/en.yml
    en:
      posts:
        index:
          count:
            one: "%{count} post"
            other: "%{count} posts"
# locales/vi.yml
    vi:
      posts:
        index:
          count:
            one: "%{count} bài đăng"
```
Để sử dụng trong view ta dùng cú pháp sau:
```
<%= t(".count", count: @posts.length) %>
```
## 4. Kết luận
**Tham khảo**
* https://github.com/svenfuchs/rails-i18n/blob/master/rails/locale/vi.yml
* https://phraseapp.com/blog/posts/rails-i18n-guide/
* http://guides.rubyonrails.org/i18n.html