## 1. Giới thiệu 
 Xin chào các bạn chắc bạn nào đã từng đọc bài viết của mình thì cũng biết mình là một dev làm web nhỉ. Đến với những lần chia sẻ thì mình mong muốn chia sẻ đến các bạn đang làm web cũng như đang có hướng theo con đường lập trình một chút những kiến thức mà mình đã tìm hiểu được.
 
 Chắc các bạn làm website thì không thể thiếu chức năng gửi email đúng không nào?  Email được gửi đến khách hàng ví dụ khi khách hàng mua hàng ở website thông tin đơn hàng sẽ được gửi về email cho người dùng, hay tài khoản người dùng trên website đổi password hay quên password thì hay gửi mail...
 
 Hôm nay đến với bài chia sẻ mình xin giới thiệu với các bạn một gem của rails hỗ trợ chúng ta test chức năng gửi email ở local nhé.
## 2. Cách dùng
 Vì tại sao rails có gem 'letter_opener' mà tại sao lại sinh ra gem 'letter_opener_web' thì mình xin giải thích là gem 'letter_opener_web' là phiên bản gem cải tiến từ gem 'letter_opener' và nó có giao diện gửi show email được gửi như khi chúng ta gửi mail thật nhé.
 
 Để hiểu rõ hơn về gem thì chúng ta cùng đi vào một ứng dụng demo để hiểu rõ hơn.
 
 Việc đầu tiên là các bạn tạo cho mình một project Ruby on Rails nhé. Sau đó copy gem bên dưới cho vào file GemFile và chạy bundle.
 
```
  gem 'letter_opener_web'
```

Chúng ta thêm 1 dòng vào trong thư mục development.rb

```
  config.action_mailer.delivery_method = :letter_opener_web
```

Trong đường dẫn router thì chúng ta thêm route show kết quả chúng ta gửi email

```
  mount LetterOpenerWeb::Engine, at: "/letter_opener_web" if Rails.env.development?
```

OK ở đây mình sẽ tạo một chức năng gửi email cho tài khoản user mỗi khi tạo thành công nhé.

Mình cần chạy đoạn code dưới để generate ra một giao diện để tạo User

```
  rails g scaffold User name:string email:string
```
Ok chúng ta sau khi vào route http://localhost:3000/users/new thì sẽ có một giao diện rails tự tạo cho chúng ta như thế này.

![](https://images.viblo.asia/9eb45ab8-14f7-4afd-bb0d-5c121c53764b.png)

Nhiệm vụ là khi chúng ta nhập tên và email sau đó ấn tạo User nếu thành công thì sẽ gửi một email đến tài khoản email vừa tạo.

Các bạn chạy lệnh bên dưới để tạo ra file feedback_mailer.rb
```
   rails generate mailer FeedbackMailer
```
 Trong thư mục vừa tạo thì tôi sẽ tạo một hàm feedback_mailer cấu hình với tham số truyền vào là user có name và email, subject(tiêu đề của bức thư khi chúng ta gửi mail). 
```
    class FeedbackMailer < ApplicationMailer
      default from: "from@example.com"
      layout 'mailer'

      def feedback_mailer user
        @user = user
        mail to: @user.email, subject: "Hello"
      end
    end
```
 Trong đó :
     default from: cấu hình mail mặc định khi gửi(mail from)
    
  Chúng ta cũng cần tạo một file views để hiển thị show ra nội dung muốn gửi đi
  
  Trong forder views/feedback_mailer các bạn tạo một file feedback_mailer.text.erb có nội dung: 
  
  ```
    Hello <%= @user.name %>
  ```
  Ở đây thì tuỳ cac bạn thôi nội dung muốn gửi đến user tùy vào từng chức năng. Ví dụ khi tạo mới một User thì sẽ gửi email chào User đó, khi gửi mail mua sản phẩm thì các bạn có thể gửi thông tin sản phẩm qua mail... 
  
  Đến đây mình chỉ cần thêm một gọi đến hàm feedback_mailer trong FeedbackMailer và thực hiện gửi mail.
  
   ```
      # POST /users
      # POST /users.json
      def create
        @user = User.new(user_params)

        respond_to do |format|
          if @user.save
            format.html { redirect_to @user, notice: 'User was successfully created.' }
            format.json { render :show, status: :created, location: @user }
            FeedbackMailer.feedback_mailer(@user).deliver_later
          else
            format.html { render :new }
            format.json { render json: @user.errors, status: :unprocessable_entity }
          end
        end
      end
   ```
   
   Và đây là kết quả mình nhận được:
   
   ![](https://images.viblo.asia/4b17db49-f486-44c4-b5f9-e94d5007de84.png)
   
   The end!

## 3. Kết luận
Ok. Bên trên mình cũng đã chia sẻ kiến thức mà mình mới tìm hiểu được. Nếu thấy hay thì các bạn hãy cho mình một like nhé. Nếu các bạn học được gì mới thì hãy chia sẻ cho mọi người cùng tiến bộ nhé :innocent::innocent:!

Tài liệu tham khảo:
https://github.com/fgrehm/letter_opener_web