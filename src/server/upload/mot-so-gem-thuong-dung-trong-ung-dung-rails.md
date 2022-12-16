#### 1. [Pundit](https://github.com/varvet/pundit) – User Authorization

Phân quyền là việc quyết định xem mỗi người dùng sẽ được sử dụng những chức năng gì của ứng dụng. Việc phân quyền được sử dụng rất phổ biến trong các chức năng quản lý dữ liệu bên backend.

[Pundit](https://github.com/varvet/pundit) cung cấp một bộ các công cụ trợ giúp hướng dẫn bạn sử dụng vào class trong Ruby và các mẫu thiết kế hướng đối tượng để xây dựng một hệ thống phân quyền đơn giản, mạnh mẽ và có thể mở rộng một cách dễ dàng.

#### 2. [WebPacker](https://github.com/rails/webpacker) – Javascript Management

JavaScript đang phát triển mạnh mẽ và thay đổi một cách liên tục. Việc sử dụng các file thư viện javascript ở trong thư mục asserts đã không còn phù hợp nữa. Webpacker cung cấp một cách đơn giản để quản lý các gói thư viện Javascript và trình biên dịch mã Javascript rất tiện dụng.

![](https://images.viblo.asia/3b4d12aa-c2de-4ac8-b991-719c56f719af.png)

#### 3. [Rails ERD](https://github.com/voormedia/rails-erd) – ActiveRecord Diagrams

Khi tham gia vào dự án "cũ" việc phải đọc hiểu thiết kế liên quan đến cơ sở dũ liệu là khá khó khắn trong khi tài liệu mô tả dự án thì không rõ ràng. Rails ERD cung cấp một tiện ích tự động sinh ra một sơ đồ quan hệ giữa các bảng trong cơ sở dữ liệu giúp bạn dễ dàng tham khảo và hình dung về hệ thống tốt hơn.


![](https://images.viblo.asia/e50d40b0-a4d9-4ecb-b6aa-0ed4083355f0.png)
#### 4. [Chartkick](https://github.com/ankane/chartkick) – Chart Creator

Chartkick cung cấp công cụ để các biểu đồ thống kê một cách vô cùng đơn giản và đẹp với Javascript.

![](https://images.viblo.asia/4f668e83-dccb-455f-b8f6-25c64280ac3b.png)

#### 5. [Annotate](https://github.com/ctran/annotate_models) – Annotate Rails Classes

Với các `dev` mới hoặc khi làm việc với các dự án lớn với cấu trúc dữ liệu phức tạp thì việc sự dụng annotate làm cho công việc của bạn trở nên đơn giản hơn. Thư viện này sẽ tự động sinh ra cấu trúc của bảng vào trong các lớp liên quan (Model, Serializer ...) như vậy sẽ dễ dàng tham khảo cấu trúc bảng hơn so với việc vào file schema để tìm kiếm.

![](https://images.viblo.asia/55f5e02f-e10a-41af-8193-e18d0b1a40dd.png)

#### 6. [MetaTags](https://github.com/kpumuk/meta-tags) – SEO-Friendly Rails Apps

MetaTags đơn giản hóa SEO bằng cách cho phép bạn dễ dàng cài đặt tất cả các thẻ và mô tả bạn cần cho trang web của mình.


#### 7. [Letter Opener](https://github.com/ryanb/letter_opener)

Việc cài đặt và kiểm thử cho việc gửi mail ở môi trường phát triển khá là mất công. Letter Opener hiển thị nội dung email của ngay trên trình duyệt mà không gửi email nên bạn sẽ không phải chờ đợi. Như vậy, với Letter Opener bạn cũng không cần phải cài đặt thông tin gửi mail trong môi trường phát triển, đồng thời bạn sẽ không phải lo gửi email nhầm cho một ai đó trong môi trường phát triển dự án.

#### 8. [Simple Form](https://github.com/plataformatec/simple_form)

Simple form thực sự đơn giản, giúp việc xây dựng các form bên trang admin của bạn nhanh và đơn giản và hiệu quả. Với simple form công sức `code` ra các form của bạn sẽ được giảm đi khá nhiều.
```ruby
<%= simple_form_for User.new do |f| %>
  <%= f.input :email %>
  <%= f.input :email_confirmation %>
  <%= f.input :tel %>
  <%= f.button :submit %>
<% end %>
```
Với đoạn code đơn giản trên ta đã build ra được một form với đầy đủ cả label và input form như sau
![](https://images.viblo.asia/d216f44f-4bb0-4d68-885b-962181318df4.png)

#### Tham khảo

1. [Useful Ruby on Rails gem](https://blog.planetargon.com/entries/8-useful-ruby-on-rails-gems-we-couldnt-live-without)