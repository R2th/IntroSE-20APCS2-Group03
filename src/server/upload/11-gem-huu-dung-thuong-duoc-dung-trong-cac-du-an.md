Khi làm việc với ngôn ngữ lập trình, chúng ta thường tìm kiếm các công cụ hỗ trợ để giúp làm việc dễ dàng hơn. Đối với Ruby, các gem được tạo ra và hoàn thiện từng ngày, trong đó có những gem rất hữu ích và được sử dụng khá nhiều trong các dự an thực tế hiện nay.
<br><br>
Dưới đây là một số gem hữu ích thường được sử dụng với các chức năng cơ bản nhưng lại vô cùng quan trọng với các dự án. Chúng ta có thể dễ dàng cài đặt và sử dụng nhanh chóng để có thể hoàn thành dự án nhanh chóng và dễ dàng hơn.

![](https://images.viblo.asia/53ef7d72-a575-447f-9bed-47a3d6a8c188.png)

# **1. CanCanCan**
Nếu bạn xây dựng một ứng dụng với nhiều loại user và điều bạn lo lắng nhất chính là phân quyền cho các user của bạn. Một giải pháp hiệu quả cho bạn đó là sử dụng gem Cancancan để phân quyền cho các user.


Cancancan là một thư viện phân quyền cho ruby on rails, nó hạn chế các tài nguyên mà một user được phép truy cập. Tất cả các quyền hạn được quy định ở một nơi duy nhất (là class Ability) và riêng biệt với controllers, views và database queries.

```ruby
class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    if user.admin?
      can :manage, :all
    else
      can :read, :all
    end
  end
end
```
Ngoài ra bạn có thể sử dụng Gem `Pundit` cũng có tính năng phân quyền tương đương. `Pundit` cung cấp một bộ helpers hướng dẫn bạn sử dụng các class Ruby thông thường và các mẫu thiết kế hướng đối tượng để xây dựng một hệ thống ủy quyền đơn giản, mạnh mẽ và có thể mở rộng.


-----

# **2. Devise**
Devise là một gem rất linh hoạt được sử trong quá trình xác thực người dùng. Nó hỗ trợ hầu hết tất cả mọi việc bạn cần trong việc quản lí và xác thực người dùng trong hệ thống của bạn. Nó cho phép bạn có thể tạo nhiều Model trong cùng một lúc;Nó dược xây dựng dựa trên các module nên bạn có thể chỉ sử dụng những gì bạn thực sự cần. Gem devise có 10 module chính như mã hóa mật khẩu, xác thực email, khôi phục và reset mật khẩu, session timeouts, …
```ruby
class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :confirmable, :recoverable, stretches: 20
end
```
-----
# **3. Better_Errors**
Việc hiển thị lỗi theo trang mặc định của Rails đôi khi làm chúng ta rất khó để biết chính xác lỗi đó là gì vì rất ít thông tin được hiển thị. Vì vậy để những đoạn message error trông rõ ràng hơn thuận tiện cho việc fix bug chúng ta có thể sử dụng gem bettererrors kết hợp với bindingofcaller.
![](https://images.viblo.asia/57e658bc-81de-4950-bd6e-ddd419ca9d9c.png)


-----


# **4. Delayed_job**
Chắc hẳn khi bạn tham gia lập trình RoR, bạn đã nghe đến khái niệm "Background Job". "Background Job" là gì? Đó là một tiến trình xử lý bên ngoài luồng request/response thông thường và là một thành phần của bất kỳ web framework hiện đại nào. Đối với các request có thời gian response lâu hoặc yêu cầu thực hiện trong tương lai, để không mất trải nghiệm của khách hàng (khách hàng phải đợi request thực hiện xong) thì sử dụng background job là điều hoàn toàn hợp lý. Các tiến trình này sẽ chạy ngầm, và không hiển thị với người dùng cuối. Có 1 gem là tiêu biểu cho background job của RoR đó là: Delayed_job.
<br>
Delayed_job nhằm tạo ra các tiến trình không đồng bộ, giúp tạo ra các job xử lý tác vụ riêng biệt (gửi mail, ảnh, ...), có thời gian thực thi không đồng bộ với server, từ đó nhằm giảm tải và tăng hiệu suất thực thi cho server, mang lại hiệu quả cao.
```ruby
# without delayed_job
Notifier.signup(@user).deliver

# with delayed_job
Notifier.delay.signup(@user)

# with delayed_job running at a specific time
Notifier.delay(run_at: 5.minutes.from_now).signup(@user)
```


-----


# **5. Letter_opener**
Trong quá trình xây dựng 1 ứng dụng, cần làm chức năng gửi mail tuy nhiên bạn gặp một số vấn đề như sau:

* Bạn không muốn thiết lập mail thử nghiệm.
* Bạn không muốn 1 mail spam sẽ được gửi từ mail thử nghiệm của bạn vô tình đến 1 mail nào đó. Khiến rò rĩ thông tin đến end-user, hoặc vô tình public dự án đang trong quá trình phát triển ra ngoài.
* Không cần phải mở mail để test, Muốn reivew email ngay trên trình duyệt.

=> Gem "Letter Opener" sẽ giúp bạn giải quyết vấn đề đó một cách đơn giản.
![](https://images.viblo.asia/e21c8d2e-a736-4ed4-9b6e-50a987f2b6d7.jpg)


-----


# **6. Mina**
Giống như `Capistrano`, `Mina` là công cụ dùng để deploy website. Tại sao lại sử dụng `Mina` thay thế cho `Capistrano`? Lý do vì `Mina` đặc biệt có lợi thế hơn về mặt tốc độ, cụ thể nó cung cấp khả năng deploy, khởi tạo mọi thứ bằng đoạn script Bash và thực thi chúng trên server. Tương tự với các tập tin migration, `Mina` hỗ trợ các dòng lệnh để thực thi riêng của mình, nếu chúng ta không cấu hình các thư mục CSS, JS, image như yêu cầu của nó thì những thư mục này sẽ không được thực thi.
```
➜  project git:(master) ✗ mina production deploy
-----> Creating a temporary build path        
-----> Fetching new git commits        
-----> Using git branch 'master'        
       Cloning into '.'... 
       done. 
-----> Using this git commit        

       user (0695b54): 
       > increase credits after manual order update 

-----> Symlinking shared paths        
-----> Installing gem dependencies using Bundler        
       # list of gems ommited
       Your bundle is complete! 
       Gems in the groups development and test were not installed. 
       It was installed into ./vendor/bundle 
-----> DB schema unchanged; skipping DB migration        
-----> Skipping asset precompilation        
-----> Cleaning up old releases (keeping 5)        
-----> Build finished        
-----> Moving build to releases/307        
-----> Updating the current symlink        
-----> Launching        
-----> Symlink system to shared        
-----> Restarting application        
-----> Done. Deployed v307        
       Elapsed time: 2.00 seconds
```


-----


# **7. Paperclip**

Khi bạn phát triển một website application , tính năng đăng tải hình ảnh , avatar ... là một tính đăng quan trọng và cần thiết đều có ở phần lớn các webiste . Paperclip có lẽ là giải pháp quản lý tập tin đính kèm phổ biến nhất cho Rails (hơn 13 triệu lượt tải về) nó được đánh giá khá cao trong việc upload cũng như thao tác ảnh. Những điều để đưa gem này trở nên thành công vì nó có một cộng đồng lớn sử dụng, có nhiều tính năng và tài liệu hướng dẫn dễ hiểu và kỹ lưỡng.
 Với Paperclip , mọi việc trở nên khá đơn giản (với sự hỗ trợ của ImageMagick) và dễ dàng.

```ruby 
class User < ActiveRecord::Base
  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
end
```


-----


# **8. Simple_form**
Simple Form là một gem linh hoạt trong việc hộ trợ tạo form. Mục tiêu cơ bản của Simple Form là giúp bạn tìm thấy những thiết kế đơn giản và hữu ích nhất cho form.

```ruby 
= simple_form_for @user do |f|
  = f.input :username, label: 'Your username please'
  = f.input :password, hint: 'No special characters.'
  = f.input :email, placeholder: 'user@domain.com'
  = f.input :remember_me, inline_label: 'Yes, remember me'
  = f.button :submit
```

-----

# **9. Rspec_rails**
Rspec là một gem rất mạnh trong ruby on rails nhằm mục đích kiểm thử các chức năng được viết bởi ruby on rails.

Tại sao sử dụng rspec?

* rspec có cú pháp rất ngắn gọn, dễ đọc dễ viết
* Test result dễ đọc
* hỗ trợ việc viết testkey tiện lợi.

```ruby 
require "spec_helper"

describe User do
  it "orders by last name" do
    lindeman = User.create!(first_name: "Andy", last_name: "Lindeman")
    chelimsky = User.create!(first_name: "David", last_name: "Chelimsky")

    expect(User.ordered_by_last_name).to eq([chelimsky, lindeman])
  end
end
```


-----


# **10. Factory_girl_rails** 
Factory Girl cho phép bạn tạo object cần thiết khi test. Bạn có thể tạo random một object với nhiều loại dữ liệu khi test thay vì chỉ có một giá trị default.
```ruby 
# spec/factories/user.rb
FactoryGirl.define do
  factory :user do
    first_name "Andy"
    last_name  "Lindeman"
  end
end

# spec/models/user_spec.rb
require "spec_helper"

describe User do
  it "orders by last name" do
    lindeman = create(:user)
    chelimsky = create(:user, first_name: "David", last_name: "Chelimsky")

    expect(User.ordered_by_last_name).to eq([chelimsky, lindeman])
  end
end
```


-----



-----


# **11. Byebug**

Khi code gặp vấn đề , chúng ta sẽ theo dõi màn hình console để biết được lỗi gì đang xảy ra. Nhưng đôi khi console không giúp chúng ta tìm được gốc rễ của lỗi mà chúng ta gặp phải. Khi đó gem byebug sẽ giúp bạn giải quyết vấn đề đó. 

Byebug cung cấp một số các chức năng cơ bản như:
* Stepping: thực thi các câu lệnh theo trình tự.
* Breaking: tạo breakpoint, conditional breakpoint…
* Evaluating: Basic REPL functionality.
* Tracking: theo dõi sự thay đổi của variables hay các dòng lệnh khi thực thi.


-----


Tài liệu tham khảo:

https://infinum.co/the-capsized-eight/a-gem-for-every-occasion-11-great-ruby-libraries-we-use-on-every-project