Trong bài viết này, mình xin giới thiệu một ứng dụng đơn giản trình bày cách gửi email với ActionMailer, ActionMailer Preview và thông qua nhà cung cấp dịch vụ email của bên thứ ba như Gmail.
Tạo một ứng dụng trên rails, gửi email cho người dùng khi người dùng mới được tạo.
### 1. Khởi tạo
```
    $ rails new new_app_name
    $ rails g scaffold user name:string email:string
    $ rake db:migrate
```

Bây giờ chúng ta đã có một ứng dụng cơ bản, Để sử dụng ActionMailer.

Tiếp theo:
```
    $ rails g mailer example_mailer
    create app/mailers/example_mailer.rb
    invoke erb
    create app/views/example_mailer
    invoke test_unit
    create test/mailers/example_mailer_test.rb
    create test/mailers/previews/example_mailer_preview.rb
```

Tạo file : app/mailers/example_mailer.rb

```
    class ExampleMailer < ActionMailer::Base
      default from: "from@example.com"
    end
```
Viêt các phương thức customized email, Trước tiên, bạn nên thay đổi địa chỉ email mặc định từ from@example.com thành địa chỉ email bạn muốn sử dụng làm địa chỉ người gửi.
```
    class ExampleMailer < ActionMailer::Base
      default from: "from@example.com"

      def sample_email(user)
        @user = user
        mail(to: @user.email, subject: 'Sample Email')
      end
    end
```

sample_email lấy tham số người dùng và gửi email sử dụng method mail đến địa chỉ email của người dùng. 

tạo 1 file sample_email.html.erb với định dạng html: 

```
    <!DOCTYPE html>
    <html>
      <head>
        <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
      </head>
      <body>
        <h1>Hi <%= @user.name %></h1>
        <p>
          Sample mail sent using smtp.
        </p>
      </body>
    </html>
```

Tạo app/views/example_mailer/sample_email.text.erb

```
    Hi <%= @user.name %>
    Sample mail sent using smtp.
```

Trong môi trường development, Có thể sử dụng ActionMailer Preview để test.

test/mailers/previews/example_mailer_preview.rb
```
    # Preview all emails at http://localhost:3000/rails/mailers/example_mailer
    class ExampleMailerPreview < ActionMailer::Preview
      def sample_mail_preview
        ExampleMailer.sample_email(User.first)
      end
    end
```

Truy cập:  http://localhost:3000/rails/mailers/example_mailer/sample_mail_preview

Thêm vào file: /config/application.yml

```
    gmail_username: 'username@gmail.com'
    gmail_password: 'Gmail password'
```
### 2. Cấu hình

File /config/environments/production.rb
```
    config.action_mailer.delivery_method = :smtp
    # SMTP settings for gmail
        config.action_mailer.smtp_settings = {
         :address              => "smtp.gmail.com",
         :port                 => 587,
         :user_name            => ENV['gmail_username'],
         :password             => ENV['gmail_password'],
         :authentication       => "plain",
        :enable_starttls_auto => true
    }
```

Dùng gem figaro quuản lý môi trường của dự án. tham khảo: https://github.com/laserlemon/figaro

Tạo file app/controllers/users_controller.rb

```
    def create
      @user = User.new(user_params)
      respond_to do |format|
        if @user.save
          # Sends email to user when user is created.
          ExampleMailer.sample_email(@user).deliver
          format.html { redirect_to @user, notice: 'User was successfully created.' }
          format.json { render :show, status: :created, location: @user }
        else
          format.html { render :new }
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    end
```

Khi một user mới được tạo, email được gửi thông qua phương thức sample_email trong mailMailer.
### 3. Tổng kết
Mình xin kết thúc bài viết của mình tại đây. Rất mong bài viết sẽ giúp ích được cho các bạn. Tham khảo: https://launchschool.com/blog/handling-emails-in-rails