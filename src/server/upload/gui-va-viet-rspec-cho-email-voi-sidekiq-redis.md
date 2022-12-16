## Tại sao phải sử dụng Background Job?
Vào một ngày đẹp trời, khách hàng bấm vào send email cho nhân viên để cập nhật thông tin về công ty => "ting ting" - thông báo gửi về đã thành công với nhân viên công ty ~ 100 người. Trên thực tế, số lượng nhân viên không chỉ như vậy mà lớn hơn rất nhiều, và lần này chắc rồi vẫn sẽ là "ting ting" nhưng thay vào "thành công" là "có chắc request còn đây" - "Request timed out", việc này xảy ra do số lượng email send đi là quá lớn và làm request vượt quá khoảng thời gian cho phép. Do đó `Background Job` xuất hiện, giúp tiến trình xử lý phụ tách riêng với luồng xử lý chính và đẩy tốc độ tải trang lên tối ưu. Chạy `Background Job` khá giống với nguyên lý tảng băng trôi, những tác vụ phụ sẽ được đưa xuống phần chìm của tảng băng xử lý ngầm và để lại trên bề mặt những thứ người dùng muốn thấy.

![](https://images.viblo.asia/3a135159-ee5e-4567-ba0d-8ccfb3278aae.png)

 ## Sidekiq and Redis
 
Khi làm việc với rails, bạn hẳn đã nghe qua hai cái tên quen thuộc Sidekiq và Redis hầu như sẽ gắn liền với tất cả các dự án bạn tham gia. Về mặt nguyên lý hoạt động, Redis là server nơi lưu lại các Job và Sidekiq sẽ lấy ra đưa vào queue để thực hiện lần lượt các Job đó, kết hợp cả Sidekiq và Redis ta được một `Background Job` hoàn chỉnh cho việc xử lý các tiến trình phức tạp ở client. Để sử dụng Sidekiq theo trình tự các bước như sau (trước đó bạn phải config client gửi được email qua smtp và catch email bằng mailcatcher):

1.  Cài đặt gem sidekiq ``` gem "sidekiq" ```
2.  Thêm vào ```config/sidekiq.yml ```  với nội dung như sau: 
    ```
    :concurrency: 5
    :max_retries: 5
    staging:
      :concurrency: 5
    production:
      :concurrency: 5
    :queues:
      - default
      - mailers
     ```
    Ở đây concurrency có nghĩa là số lượng job được xử lý trong một lần, queue độ ưu tiên hàng chờ xử lý được sắp xếp theo độ ưu tiên.
3. Trong file ```application.rb``` bổ sung:
 ``` config.active_job.queue_adapter = :sidekiq ```
 4. Cuối cùng chúng ta connect Sidekiq với Redis là xong:
```
    Sidekiq.configure_server do |config|
      config.redis = {url: "redis://localhost:6379/0"}
    end

    Sidekiq.configure_client do |config|
      config.redis = {url: "redis://localhost:6379/0"}
    end
```

Việc tiếp theo là install Redis: 
 ``` sudo apt install redis ```.
Để có thể thấy được khái quát hơn về redis-server ```sudo service redis-server stop``` để dừng và ```redis-server``` bắt đầu lại lúc đó chúng sẽ có 2 giao diện của Sidekiq và Redis như sau (bật redis-server trước sidekiq): 

Sidekiq:

![](https://images.viblo.asia/a344e388-7821-47bd-aabf-e0a845e4f077.png)

Redis:
![](https://images.viblo.asia/2a29f3d0-2246-4e9b-b247-045a2e20905d.png)

## Sử dụng sidekiq để send email

1. Cài đặt default email from trong file ApplicationMailer, thường thì set biến ENV["DEFAULT_EMAIL_FROM"] để tiện cho trường hợp thay đổi các email mặc định:
    ``` 
    class ApplicationMailer < ActionMailer::Base
      default from: "example@email.com"
      layout "mailer"
    end
    ```
2. Tạo file  ```mailers/users_mailer.rb``` 
      ```
      class UsersMailer < ApplicationMailer
          def welcome user
              @user = user
              mail(to: @user.email, subject: ("welcome email"))
          end
      end
     ```
3. Trong thư mục views add thư mục ```views/users_mailer/welcome.html.erb```
    ```
    <div>
        Hi <%= @user.name %>,
        This is test email 
    </div>
    ```
 4. Vào controller/service send email: 
 
      Sử dụng câu ```UsersMailer.welcome(user).deliver_later``` để đưa email vào Background Job. Việc send email thường diễn ra cuối cùng khi bạn đã xử lý xong tất cả mọi thông tin tránh việc spam hay chưa hoàn thành transaction mà vẫn gửi email. 
  
Sidekiq và Redis còn khá nhiều options hay mình sẽ dành cho một bài viết khác, đối với hiện tại việc cài đặt và sử dụng cơ bản như vậy là xong. Tiếp theo là quá trình viết rspec cho UsersMailer, thông thường các dự án thường yêu cầu client có số lượng line code coverage > 99% và yếu tố quan trọng là giảm thiểu khả năng gây ra "incident" (rò rỉ thông tin) nên việc viết test cho mailer là bắt buộc.

## Rspec mailer

> Nguyên lý quan trọng nhất đối với việc test email, trong quá trình test không có bắt kỳ email nào bị lọt ra ngoài cũng như khi bạn call method `.deliver_later` thì Job cũng không đưa xuống Sidekiq để xử lý  (luôn bật Sidekiq kiểm tra trong quá trình viết test).

Trước tiên đến với phần cài đặt `config/environments/test.rb`, thêm các config sau vào file test.rb:

   ```
      config.action_mailer.delivery_method = :test
      config.active_job.queue_adapter = :test
      config.action_mailer.perform_deliveries = false
  ```

*  `config.action_mailer.delivery_method = :test` lưu email message vào array `ActionMailer::Base.deliveries`.
*  `config.active_job.queue_adapter = :test` thay thế cho Sidekiq ở môi trường dev.
* `config.action_mailer.perform_deliveries = false` chặn việc deliver email một cách không kiểm soát kể cả ở môi trường test.

Để viết `spec/mailers/users_mailer_spec.rb` ta có nhiều cách: 
 
 Cách 1: Dễ hiểu nhưng hạn chế sử dụng
 ```
    require "rails_helper"

    RSpec.describe UsersMailer, type: :mailer do
      describe ".welcome" do
        let(:user) {create :user}
        let!(:mail) {UsersMailer.welcome(user).deliver_later}

        it {expect(enqueued_jobs.size).to eq 1}
        context "check mail contents" do
          before do
            stub_const("ENV", {"EXAMPLE_ENV" => "example env"})
          end
          # stub các biến ENV dùng trong mail 

          it do
            perform_enqueued_jobs do
              UsersMailer.welcome(user).deliver_later
            end

            mail = ActionMailer::Base.deliveries.last
            expect(mail.subject).to eq "welcome email"
            expect(mail.from).to eq "example@email.com"
            expect(mail.to).to eq [user.email]
          end
        end
      end
    end
 
 ```
 
 Cách 2: Dùng khi default_from là biến ENV
 
 Bởi vì UsersMailer < ApplicationMailer nên ApplicationMailer sẽ được chạy qua trước, do đó việc 
 `stub_const("ENV", {"DEFAULT_EMAIL_FROM" => "example@env.com"})` chỉ nằm trong vùng UsersMailer không mang lại ý nghĩa. Để rõ hơn,  thử đặt `binding.pry` check debug từ ApplicationMailer sau line `default from: ENV["DEFAULT_EMAIL_FROM"]` kết quả thu được sẽ là  ENV["DEFAULT_EMAIL_FROM"] = nil.
 
 Lúc này, rails hỗ trợ cho chúng ta `gem "rspec-activemodel-mocks"`  để sử dụng rspec test doubles (https://relishapp.com/rspec/rspec-mocks/docs/basics/test-doubles) 
 
```
require "rails_helper"
require "rspec/active_model/mocks"

RSpec.describe UsersMailer, type: :mailer do
  describe ".welcome" do
    let(:user) {mock_model User, email: "example@email.com"}
    let(:mail) {UsersMailer.welcome(user)}

    before do
      stub_const("ENV", {"EXAMPLE_ENV" => "example env"})
    end

    it do
      expect(mail.to).to eq ["example@email.com"]
      expect(mail.subject).to eq "welcome email"
    end
  end
end
```

## Tổng kết

Ở trên mình đã giới thiệu cho các bạn về cách cài đặt, sử dụng Sidekiq và Redis cũng như template cho việc test email. Hi vọng qua bài viết này sẽ giúp các bạn giải quyết được vấn đề đang gặp phải. Happy Coding!

## References

[1] https://guides.rubyonrails.org/action_mailer_basics.html

[2] https://api.rubyonrails.org/v6.0.3.2/classes/ActiveJob/TestHelper.html

[3] https://relishapp.com/rspec/rspec-mocks/v/2-11/docs/stubbing-constants/stub-defined-constant

[4] https://github.com/mperham/sidekiq