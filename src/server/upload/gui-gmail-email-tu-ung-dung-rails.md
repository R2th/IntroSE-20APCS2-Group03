Sau khi tốn cả buổi chiều để fix lỗi thì ngay sau đó mình đã quyết định phải viết ngay bài này để note lại, về sau có gì còn xem lại 😂😂 .<br>
Bài viết sẽ gồm 2 phần, phần 1 nói về chức năng gửi email có tên miền ngẫu nhiên và kiểm tra danh sách thư đã gửi bằng gem `mailcatcher`.<br>
Phần 2 viết về cách gửi thư Gmail (tên miền là @gmail.com ấy).

Chúng ta sẽ tạo 1 app Rails có chức năng create Post, sau mỗi lần Post được create thành công thì email được gửi đi.

# Let's Start
> Ruby version: 2.7.2<br>
Rails version : 6.1.5<br>
Database : default SQLite3

<h1>Part 1: Gửi email với tên miền ngẫu nhiên</h1>
<h3>1. Tạo model post</h3>

Tạo app Rails mới có tên  `testapp`

```
rails new testapp
```
Đợi chạy xong thì direct đến địa chỉ app vừa tạo

```
cd testapp
```

Tạo model `post` bằng scaffold

```
rails g scaffold post email:string content:text
```
Sau đó, chạy lệnh migrate để tạo database
```
rails db:migrate
```

<h3>2. Tạo Mailer</h3>
Trong Rails, ActionMailer được sử dụng để nhận và gửi mail. ActionMailer khá giống với Controller. Controller dùng Template để hiển thi ra màn hình,  ActionMailer cũng dùng Template để tạo và gửi mail.<br>

Tạo ActionMailer có tên `PostMailer` :

```
rails g PostMailer creation_email
```
![image.png](https://images.viblo.asia/49ba5bfa-ac26-4b17-9729-83df4f4638d0.png)

Bằng câu lệnh trên, cùng với ActionMailer `PostMailer`, 2 file `creation_email.html.erb` và `creation_email.text.erb` cũng được tạo. 2 file này sẽ tạo Template để hiển thị nội dung mail được gửi.<br><br>
Bên trong file `testapp/mailers/post_mailer.rb` sửa hàm `creation_email` như sau:

```ruby
class PostMailer < ApplicationMailer
  def creation_email(post)
    @post = post

    mail to: post.email, subject: "Hello World", from: "test@example.com"
  end
end
```

Hàm `creaton_email` sẽ nhận `@post` từ form như 1 parameter.<br>
Mail có subject là `"Hello World"`,  sau khi được tạo sẽ gửi đến địa chỉ chúng ta viết trong `:email`, và tên người gửi là `"test@example.com"`.<br>
Ngoài ra, nếu các bạn muốn thống nhất địa chỉ người gửi, bất kể mail nào đều có chung 1 địa chỉ người gửi thì chúng ta có thể chỉ định giá trị default trong file `testapp/mailers/post_mailer.rb` như sau:
```ruby
class PostMailer < ApplicationMailer
    default from: 'test@example.com

  def creation_email(post)
    @post = post
....
```

<h3>3. Tạo Template </h3>

Ở đây chúng ta sẽ sửa file  `creation_email.html.erb` và `creation_email.text.erb` để tạo Template hiển thị nội dung mail. Mọi người có thể sửa theo ý thích còn mình sẽ sửa như dưới đây 😂😂:
<br>`creation_email.html.erb`
```
<h1>Post#creation_email</h1>
<p>find me in app/views/post_mailer/creation_email.html.erb</p>

<p><%= @post.content %></p>
```

<br>`creation_email.text.erb` 
```
Post#creation_email
find me in app/views/post_mailer/creation_email.text.erb

<%= @post.content %>
```

<h3>4. Chức năng gửi mail</h3>

Như ở đầu mình nói, app này sẽ có chức năng gửi mail đến người nhận mỗi khi post mới được `create`. Do đó, chúng ta sẽ gọi `ActionMailer` từ hàm `create` trong Controller và gửi mail sau khi save thành công `@post`. Thêm `PostMailer.creation_email(@post).deliver_now` vào hàm `create`:<br><br>
`testapp/app/controllers/posts_controller.rb`
<br>

```ruby
def create
    @post = Post.new(post_params)

    respond_to do |format|
      if @post.save
        PostMailer.creation_email(@post).deliver_now    #thêm vào dòng này
        format.html { redirect_to post_url(@post), notice: "Post was successfully created." }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end
```

Dùng hàm `deliver_now` thì mail sẽ được gửi ngay lập tức. Ngoài ra còn có hàm `deliver_later`. Ví dụ nếu viết như dưới đây, 5p sau khi post mới được save, mail sẽ được gửi đi.
``` 
PostMailer.creation_email(@post).deliver_later(wait: 5.minutes)
``` 

<h3>5. Xem mail đã gửi</h3>

Chúng ta dùng gem `mailcatcher` để xác nhận các mail đã được gửi. Đầu tiên, ta sẽ install gem `mailcatcher` bằng terminal:
```
gem install mailcatcher
```

Vì `mailcatcher` sử dụng server SMTP nên cần phải thay đổi cài đặt trong môi trường development. Thêm vào file `config/environments/development.rb` như dưới đây. 
```
... # giản lược
# Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
     address: '127.0.0.1',
     port: 1025
}
... # giản lược
```
Nếu server rails đang chạy thì các bạn hãy khởi động lại server nhé.

Trước khi tạo post mới, nhập vào terminal dòng dưới đây để khởi động `mailcatcher`: 
```
mailcatcher
```

![image.png](https://images.viblo.asia/36ba0702-937e-4279-971a-bb2dd0402e6c.png)

<br>

<h3>6. Hoàn thành</h3>

Sau khi khởi động `mailcatcher`, cùng thử tạo post mới và xem kết quả nào !

![image.png](https://images.viblo.asia/dcfe888e-20ea-4588-be97-095ed9da48aa.png)

Trong terminal sẽ hiển thị thông báo gửi mail thành công

![image.png](https://images.viblo.asia/ed61b188-66bf-4f56-8282-797185369b7c.png)

Truy cập vào cổng 1080: `localhost:1080/` để xem kết quả nha ^^.
<br><strong>File HTML</strong>

![image.png](https://images.viblo.asia/e23e34d2-c664-436b-8ced-3e48fada18b9.png)

Yes, It's works! 😊😊
<br>Vậy là chúng ta đã gửi mail thành công. Giờ có thể thoát `mailcatcher` bằng nút  Quit ở góc phải màn hình. 
<br>
<br>
<br>
<h1> Part 2: Gửi thư Gmail</h1>
<h3>1. Thay đổi cài đặt trong môi trường development</h3>

Ở Part  1 chúng ta đã xây dựng được chức năng gửi mail. Để có thể gửi thư qua Gmail thì chỉ cần thay đổi một chút ở file `config/environments/development.rb`. <br>
Xóa đoạn code đã thêm ở  `development.rb` rồi thêm đoạn code dưới đây
```ruby
  config.action_mailer.default_url_options = {host: "localhost:3000"}
  config.action_mailer.perform_deliveries = true
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
      enable_starttls_auto: true,
      address: "smtp.gmail.com",
      port: 587,
      :domain => 'smtp.gmail.com',
      user_name: 'huykhoa11@gmail.com',  # Tên tài khoản gmail mà các bạn tạo mật khẩu ứng dụng.
      password: 'bivnraxz********',      # Mật khẩu ứng dụng của các bạn. (ở đây mình cố tình thay bằng dấu * đấy)
      authentication: :plain
  }
```

* user_name: Tên tài khoản gmail mà các bạn tạo `mật khẩu ứng dụng`.
* password: `mật khẩu ứng dụng` của bạn.
> Mật khẩu ứng dụng là mật mã gồm 16 chữ số cho phép một ứng dụng hoặc thiết bị kém an toàn truy cập vào Tài khoản Google của bạn. Chỉ những tài khoản đã bật tính năng Xác minh 2 bước mới có thể sử dụng Mật khẩu ứng dụng.

Chú ý cần bật  `Xác minh 2 bước` cho tài khoản Gmail.

Nếu các bạn chưa biết `mật khẩu ứng dụng` là gì và cách tạo `mật khẩu ứng dụng` ra sao thì có thể đọc thêm ở đây .<br>https://support.google.com/accounts/answer/185833?hl=vi


<h3>Hoàn thành</h3>
cùng thử tạo post mới nhé!

![image.png](https://images.viblo.asia/1d817617-d88c-4bd9-be3d-654a7a6f5b49.png)

Sau khi tạo, vào hộp thư đến của Gmail và kiểm tra kết quả nào!

![image.png](https://images.viblo.asia/54bd67fa-eaf3-43df-813d-fc2e247f5f82.png)

Yes, It's works! 😊😊

# Tổng kết
Vây là chúng ta đã gửi mail thành công từ Rails App. Mọi người cùng đọc và góp ý nha ^^.

<h3>Nguồn tham khảo</h3>
1. Sách 現場で使える Ruby on Rails 5 速度実践ガイド 5.2 対応, tái bản lần thứ 6 ngày 27/12/2019, trang 299-305.<br>
2.  https://qiita.com/miriwo/items/06d7d69aff47fd02fbc1
<br>