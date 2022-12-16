## 1. I18n là gì ?
Trong xu hướng toàn cầu hóa hiện nay, việc các trang web hiển thị với nhiều ngôn ngữ khác nhau là rất cần thiết. 
Quốc tế hóa trong tiếng Anh gọi là Internationalization, vì có 18 chữ cái ở giữa chữ cái i và chữ cái n nên hay được gọi ngắn gọn là i18n.
## I18n trong Rails 5.2

Rails cho phép áp dụng I18n ở cả views và controllers<br>
Một số tính năng API mà rails 5 cung cấp trong việc hỗ trợ quốc tế hóa ngôn ngữ trong ứng dụng
* Looking up translations
* Interpolating data into translations
* Pluralizing translations
* Using safe HTML translations (view helper method only)
* Localizing dates, numbers, currency

## 2. Cài đặt project toy-app làm ví dụ
Cài đặt project và cập nhật gem 
```ruby
rails new toy_app
cd toy_app
bundle install
```
Cài đặt model user
![](https://images.viblo.asia/331bab3b-ca13-41ac-997a-425204c90a6b.png)
```ruby
rails generate scaffold User name:string email:string
rails db:migrate
```
Vậy là chúng ta có một project với chức năng thêm, sửa, xóa và xem user với các views tương ứng
Tiếp theo chúng ta sẽ áp dụng I18n vào project trên.
## 3. Cấu hình I18n project rails
Khi ứng dụng được tạo đã được cài đặt sẵn ngôn ngữ tiếng anh trong `config/locales`.<br>
Để website hiển thị với các ngôn ngữ khác, chúng ta tạo các file languages.yml trong thư mục.<br>
Ví dụ:<br>
Tiếng Việt ta tạo file vi.yml<br>
Tiếng Nhật ta tạo file jp.yml<br>
**Cấu trúc của file này**
```yml
|vi:
|--models
|----book
|------es.rb
|------en.rb
|--books
|----es.rb
|----en.rb
|--users
|----es.rb
|----en.rb
|----
```
Mồi thành phần con indetion 2 space so với cha.
Chúng ta có thể thêm gem i18n để hỗ trợ nhiều tính năng hơn
``` ruby
Gemfile
gem 'rails-i18n'
Run bundle install
```
Cấu hình đường dẫn để load các file language trong `config/application.rb`
```ruby
config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}')]
```
Cài đặt function để set ngôn ngữ trước khi load trang trong `application_controller.rb`
```ruby
before_action :set_locale
  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end
```
Cấu hình những ngôn ngữ mà chúng ta cần hiển thị trong file `config/application.rb`
```ruby
config.i18n.available_locales = [:en, :vi]
```
Bây giờ project đã hỗ trợ tiếng Anh và tiếng Việt. Tiếp theo chúng ta cài đặt ngôn ngữ mặc định khi chạy ứng dụng.
```ruby
config.i18n.default_locale = :vi
```
Để trang web có thể chuyển đổi qua lại giữa các ngôn ngữ ta cấu hình trong `application_controller.rb`<br>
```ruby
def set_locale
  locale = params[:locale].to_s.strip.to_sym
  I18n.locale = I18n.available_locales.include?(locale) ?
    locale : I18n.default_locale
end
```
Thêm 2 dòng sau vào views để có thẻ click chuyển đổi giữa các ngôn ngữ.
```ruby
<%= link_to "English", locale:"en" %>
<%= link_to "Vietnamese", locale:"vi" %>
```
![](https://images.viblo.asia/51a3b430-d21b-441b-9eac-b2d036257e11.png)
![](https://images.viblo.asia/1858e9d9-69bf-4970-9cea-a0d810711956.png)
Tuy nhiên có một vấn đề mỗi khi chuyển route thì nội dung của trang web sẽ hiển thị theo default loacale. Để hiển thị theo nhiều ngôn ngữ ta cấu hình router như sau:
```ruby
#config/routes.rb
scope "(:locale)", locale: /en|vi/ do
.....
end
```
Để tránh gặp phải lỗi : `ActionController::RoutingError`, ta thêm phương thức sau vào file `application_controller.rb`
```ruby
def default_url_options
  {locale: I18n.locale}
end
```
Sau khi thêm các cấu hình cần thiết, nội dung các file trong toy_app như sau:<br>
File `#config/routes.rb`
```ruby
Rails.application.routes.draw do
  scope "(:locale)", locale: /en|vi/ do
    resources :microposts
    resources :users
  end
end  
```
File `application_controller.rb`
```ruby
class ApplicationController < ActionController::Base
  before_action :set_locale

  private
  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end
  def default_url_options
    {locale: I18n.locale}
  end
end
```
## 4. Các dịch vụ của I18n trong Rails
**Ví dụ** trên view `app/views/users/index.html.erb`
```html
<h1>Listing users</h1>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th colspan="3"></th>
    </tr>
  </thead>
<% @users.each do |user| %>
  <tr>
    <td><%= user.name %></td>
    <td><%= user.email %></td>
    <td><%= link_to 'Show', user %></td>
    <td><%= link_to 'Edit', edit_user_path(user) %></td>
    <td><%= link_to 'Destroy', user, method: :delete,
      data: { confirm: 'Are you sure?' } %></td>
  </tr>
<% end %>
</table>
<br>
<%= link_to 'New User', new_user_path %>
```
### Text
Ta khai báo các biến cố định trong các file .yml trong config/locales/*.yml
```yml
en:
  users:
    index:
      user: 'Users'
      name: 'Name'
      email: 'Email'
      show: 'Show'
      edit: 'Edit'
      destroy: 'Destroy'
      new_user: 'New User'
      date: 'Create date' 
```
```yml
vi:
  users:
    index:
      user: 'Người dùng'
      name: 'Tên'
      email: 'Địa chỉ mail'
      show: 'Xem chi tiết'
      edit: 'Chinh sửa'
      destroy: 'Xóa'
      new_user: 'Thêm người dùng'
      date: 'Ngày tạo'
```

Để sử dụng các biến text trong view ta dùng phương thức t(translate) để load giá trị ".name".
```ruby
<%= t("users.index.user")` %>
<%= t(".name") %>
```
Ta cũng có thể viết như sau, nếu trong câu lệnh chỉ chứa I18n:
```ruby
<%= t  ".name" %>
```

Để buộc biến đó sẽ load theo 1 ngôn ngữ nào đó, ta khai báo local
```ruby
<%= t(".name", locale: :en) %>
```

Rails cũng cung cấp việc chuẩn hóa HTML tag
Ta khai báo biến trong en.yml
```yml
    en:
      users:
        index:
          bold_text: '<b>Welcome to toy-app</b>'
```

Để sử dụng ta cũng dùng cú pháp như đối với text
```ruby
<%= t('.bold_text') %>
```

### Active Record
Ta có thể sử dụng I18n để khai báo các active record của model
```yml
en:
  activerecord:
    models:
      user: "User"
    attributes:
      user:
        name: "Name"
        email: "Email"
```
Ta thường sử dụng các định nghĩa này trong các form làm việc với các thuộc tính của model
```ruby 
<%= f.label :title %>
```
### Date and time
Rails cung cấp chuẩn hóa thời gian theo từng quốc gia với các format khác nhau.
Ta cấu hình các file .yml như sau:
```yml
en:
  time:
    formats:
      own: "%H:%M:%S, %d %B"
      default: "%d-%m-%Y"
      long: "%d %B, %Y"
      short: "%d %b"
```
Để sử dụng chúng trong views ta sử dụng các cú pháp sau:<br>
```ruby 
l(post.created_at, format: :long)
```
Load format từ file en.yml ứng với biến long đã định nghĩa <br>
```ruby
l(post.created_at, format: '%H:%M:%S, %d %B')
```
Format time với định dạng được định nghĩa luôn trong lời gọi<br>
```ruby 
l(post.created_at, locale: :en)
```
Buộc time tuân thủ theo file en.yml dù có chuyển sang ngôn ngữ khác
### Curency
Việc chuẩn hóa cách biểu diễn tiền tệ tương ứng với mỗi quốc gia sử dụng các ngôn ngữ khác nhau rất cần thiết và phổ biến sử dụng trong các trang web thương mại điện tử,...<br>
**Ví dụ:** Chuẩn hóa theo đơn vị đồng ở Việt Nam với định dạng chuẩn, ta định nghĩa trong vi.yml như sau:
#### Kiểu đơn giản
```yml
# config/locales/en.yml
en:
  currency: "$"
 
# config/locales/vi.yml
es:
  currency: "đồng"
```
Để sử dụng ta dùng cú pháp sau
```ruby
<%= t("currency")#{@product.price}" %>
```
#### Kiểu định dạng currency trong number
```yml
  vi:
    number:
    currency:
      format:
        delimiter: "."                  // Phân cách phần thập phân
        format: "%n %u"                 // Định dạng
        precision: 0      
        separator: ","                  // Phân cách các giá trị triệu, tỷ,...
        significant: false
        strip_insignificant_zeros: false
        unit: "đồng"                    // Đơn vị
```
Để áp dụng trong các views, ta sử dụng các cú pháp sau:
```ruby
<%= number_to_currency(@number) %>
```

### Count
Ta cũng có thể chuẩn hóa hệ đếm theo định dạng của mỗi quốc gia
```yml
locales/en.yml
    en:
      posts:
        index:
          count:
            one: "%{count} post"
            other: "%{count} posts"
```
```yml
locales/vi.yml
    en:
      users:
        index:
          count:
            one: "%{count} người dùng"
```
Để sử dụng trong view ta dùng cú pháp sau:
```ruby
<%= t('.count', count: @posts.length) %>
```
## 5. Kết luận

## Tham khảo 
* https://github.com/svenfuchs/rails-i18n/blob/master/rails/locale/vi.yml
* http://guides.rubyonrails.org/i18n.html
* https://phraseapp.com/blog/posts/rails-i18n-guide/
* http://guides.rubyonrails.org/i18n.html