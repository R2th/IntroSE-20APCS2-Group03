### Lời nói đầu!
Chào mọi người! Mình là một newbie RoR rank gỗ đoàn V (lol). Vài năm trước đây, mình từng được học qua RoR và nói thật mình đã khá vất vả với một việc tưởng chừng như rất đơn giản là cấu hình một biến môi trường khi xây dựng Rails app. Một phần nguyên nhân cũng bởi vì mình luổn search bằng tiếng Việt và không tìm thấy một bài viết nào nói về vấn đề này (vì nó quá amateur chăng (facepalm)). Kết quả sau đó, Mình đành sử dụng biện pháp thông minh khác đấy là hardcode =)). Lần này khi quyết định yêu lại RoR mình lại một lần nữa cũng gặp phải vấn đề tương tự, nhưng may thay việc cố gắng search bằng đủ từ tiếng Anh có thể nghĩ ra cũng cho mình một vài bài viết nói về vấn đề này. Nên mình tổng hợp bài viết này để các bạn new to Rails như mình bây giờ dễ dàng tìm kiếm và cũng là đánh dấu mốc yêu lại Ruby của mình (ahihi). Đến đây.... rất cảm ơn các bạn đã cố gắng đọc bài (yaoming).
    
### Environment Variables.
Rất nhiều ứng dụng yêu cầu chúng ta phải cài đặt cấu hình các thông tin xác thực email account hoặc các API keys cho các external service. Chúng ta có thể dễ dàng xử lý vấn đề này bằng cách cài đặt cấu hình cục bộ tới ứng dụng sử dụng các biến môi trường.
Hệ điều hành (Linux, Mac OS X, Windows) cung cấp các cơ chế để thiết lập các biến môi trường cục bộ, cũng như Heroku hay các nền tảng triển khai khác. Ở đây, mình đưa ra cách làm thế nào để set các biến môi trường cục bộ trên Unix shell và 2 lựa chọn thay thế để set các biến môi trường trên ứng dụng mà không có Unix shell.
    
### Keeping Environment Variables Private.
Các remote repos cũng như Github là một nơi để lưu trữ và chia sẻ code. Nếu project của bạn là open source. bất kì dev nào cũng có thể truy cập tới code của bạn. Bạn không muốn chia sẻ các thông tin xác thực tài khoản email hay các API keys một cách công khai. Nếu bạn là một thành viên trong một team cùng với một private git Repo. Lúc đó, việc cài đặt trên local của bạn có thể sẽ không còn phù hợp cho tất cả thành viên trong team nữa. Một cách tổng quát, bạn không nên lưu trữ các thông tin xác thực tài khoản email hay các API keys trên một git repo dùng chung.
    
### Gmail Example.
Xem xét một ứng dụng sử dụng Gmail để gửi mail message. Việc truy cập tới Gmail yêu cầu phải có username và password để truy cập tới tài khoản Gmail của bạn. Trên ứng dụng Rails của bạn, bạn sẽ cần phải cấu hình các thông tin xác thực này trên file ***config/environments/production.rb***. Một phần của file này trông sẽ kiểu như sau:
```
config.action_mailer.smtp_settings = {
  address: "smtp.gmail.com",
  port: 587,
  domain: "example.com",
  authentication: "plain",
  enable_starttls_auto: true,
  user_name: ENV["GMAIL_USERNAME"],
  password: ENV["GMAIL_PASSWORD"]
}
```
Chúng ta có thể hardcode username và password của Gmail vào trong file nhưng điều này cũng đồng nghĩa nó sẽ được hiển thị cho bất kì ai có quyền truy cập vào git repo. Thay vào đó, chúng ta sử dụng biến Ruby ```ENV["GMAIL_USERNAME"]``` để làm biến môi trường. Biến này có thể được sử dụng ở bất kỳ đâu trong ứng dụng Rails. Ruby sẽ thay thế ```ENV["GMAIL_USERNAME"]``` bằng một biến môi trường.
    Bây giờ chúng ta sẽ cùng xem xét làm thế nào để set một biến môi trường cục bộ.
    
### Option One: Set Unix Environment Variables.
Nếu bạn đã quen thuộc với Unix, có thể bạn đã có kinh nghiệm trong việc cài đặt biến môi trường, Biến môi trường Unix thường được set trong một file mà nó được đọc khi bắt đầu một tương tác shell (file ***~/.bashrc***).
Bạn có đang sử dụng một bash shell? sử dụng lệnh ```echo $SHELL``` để tìm và sửa file ***~/.bashrc***. Lấy ví dụ Gmail phía trên thêm dòng sau vào file:
```
export GMAIL_USERNAME="myname@gmail.com"
```
Tiếp theo chúng ta sẽ restart lại terminal để sử dụng.
Điều quan trọng là bạn sẽ cần phải học cách sử dụng Unix shell như một dev thực thụ. Hơn nữa, các vấn đề với shell thường khá khó để giải quyết đặc biệt khi bạn sử dụng [RVM](https://rvm.io/) hoặc khi ứng dụng được khởi chạy theo một cách không theo chuẩn.

Chúng ta sẽ cùng xem xét 2 lựa chọn thay thế để sử dụng Unix shell bằng một vài dòng code được thêm vào trong ứng dụng Rails để set các biến môi trường. Sử dụng một trong những lựa chọn này khi mà bạn không muốn set biến môi trường trên Unix shell.
    
### Option Two: Use the Figaro Gem.
Gem [Figaro](https://github.com/laserlemon/figaro) cung cấp một sự lựa chọn thay thế thực tiễn để cài đặt biến môi trường trên Unix shell. Gem này tận dụng lợi thế khả năng của Ruby để set các biến môi trường cũng như đọc chúng. Gem đọc file ***config/application.yml*** và thực hiện set các biến môi trường trước khi bất kì thứ gì được cấu hình trong ứng dụng Rails.

Nếu bạn muốn sử dụng các xác thực khác nhau trong các môi trường development, test, hoặc production. Gem cho phép chỉ định các thông tin xác thực khác nhau trong file ***config/application.yml***. Nếu bạn đang triển khai trên Heroku, gem cung cấp một rake task cho phép set tất cả biến môi trường lên Heroku. Gem cũng cung cấp cho bạn một cú pháp để truy cập tới các biến môi trường cũng như để gọi các phương thực Figaro, những cái này rất hữu ích trong việc cài đặt các thử nghiệm.
    
Với gem Figaro, bạn dễ dàng cấu hình các biến. Bạn cũng sẽ thấy nó hữu ích trong việc thiết lập các thông số khác bên cạnh các thông tin xác thực email account hay private API keys.
Để sử dụng nó, chúng ta sẽ add tới ***Gemfile***:
```
gem 'figaro'
```
Chạy ```$ bundle install```

Gem cung cấp một generator:
```$ bundle exec figaro install```
Generator sẽ tạo một file ***config/application.yml*** và sửa file ***.gitignore*** để ngăn không cho file bị checked tới git repo.
Bây giờ bạn có thể add biến môi trường theo cặp key/value tới file ***config/application.yml***:
```
GMAIL_USERNAME: Your_Username
```

Lúc này các biến môi trường sẽ được available bất kì đâu trong ứng dụng như ENV variables:
```
ENV["GMAIL_USERNAME"]
```

Điều này mang lại cho bạn sự thuận tiện trong việc sử dụng các biến tương tự trong code cho dù chúng được set bởi Unix shell hay ***config/application.yml*** của gem Figaro. Các biến trong file ***config/application.yml*** sẽ ghì đè các biến trong Unix shell.
Trong tests hoặc các tình huống khác nơi mà biến ENV có thể không phù hợp, bạn có thể truy cập các giá trị cấu hình bằng cách gọi hàm Figaro.
```
Figaro.env.gmail_username
```

Sử dụng cú pháp này cho việc cài đặt các xác thực khác nhau trong môi trường development, test hoặc production.
```
HELLO: world
development:
  HELLO: developers
production:
  HELLO: users
  ```
  
Với trường hợp trên biến ```ENV["HELLO"]``` sẽ được tạo là "developers" trên development, "users" trên production và "world" nếu khác.

Figaro cung cấp một rake task để set biến môi trường trên file ***config/application.yml*** như là các biến môi trường trên Heroku.
```
rake figaro:heroku
```

### Option Three: Use a local_env.yml File.
Giống như gem Figaro, kĩ thuật này tận dụng lợi thế khả năng của Ruby để set các biến môi trường cũng như đọc chúng. Gem Figaro có các tính năng bổ sung mà chúng ta đã tìm hiểu phía trên. Tuy nhiên, nếu bạn muốn biết làm thế nào để set các biến môi trường từ bên trong ứng dụng Rails của bạn, hay bạn không muốn add gem Figaro vào ứng dụng thì bạn có thể xem xét cách triển khai này.
    
Chúng ta sẽ tạo một file đơn giản chứa các cặp key/value của từng biến môi trường theo format chuẩn YAML file và cũng cần phải chắc chắn rằng nó đã được listed vào ***.gitignore*** để không bị checked tới git repo. Sau đó chúng ta sẽ thêm một vài dòng code vào ***config/application.rb*** để đọc file và set biến môi trường trước khi bất kì thứ gì được cấu hình trên ứng dụng Rails.
    
### The local_env.yml File
Tạo một file có tên ***config/local_env.yml***:
```
#Rename this file to local_env.yml
#Add account settings and API keys here.
#This file should be listed in .gitignore to keep your settings secret!
#Each entry gets set as a local environment variable.
#This file overrides ENV variables in the Unix shell.
#For example, setting:
#GMAIL_USERNAME: 'Your_Gmail_Username'
#makes 'Your_Gmail_Username' available as ENV["GMAIL_USERNAME"]
GMAIL_USERNAME: 'Your_Gmail_Username'
```

### Set .gitignore
Nếu bạn đã tạo một repo cho ứng dụng, trên thư mục root của ứng dụng sẽ có một file name ***.gitignore*** (là một hidden file). Hãy chắc chắn rằng file ***.gitignore*** có chứa:
```
/config/local_env.yml
```
Điều này sẽ tránh cho file ***config/local_env.yml*** của bạn bị checked tới git repo và những người khác có thể nhìn thấy nó.

### Rails Application Configuration File
Rails cung cấp file ***config/application.rb*** cho việc chỉ định cài đặt các thành phần khác nhau của Rails. Chúng ta muốn set biến môi trường trước bất kì một cài đặt nào khác. Rails cung cấp một method ```config.before_configuration``` để làm điều này. Các bạn có thể tham khảo thêm tại RailsGuide [Configuring Rails Applications](https://guides.rubyonrails.org/configuring.html).
Tìm đoạn code này phía dưới cùng của file ***config/application.rb***
```
#Version of your assets, change this if you want to expire all your assets
    config.assets.version = '1.0'
```
   
Add thêm đoạn code này ngay sau đoạn code phía trên:
```
config.before_configuration do
  env_file = File.join(Rails.root, 'config', 'local_env.yml')
  YAML.load(File.open(env_file)).each do |key, value|
    ENV[key.to_s] = value
  end if File.exists?(env_file)
end
```
Đoạn code sẽ mở file ***config/local_env.yml***, đọc các cặp key/value và set các biến môi trường.

Đoạn code này chỉ chạy nếu file tồn tại, khi đó đoạn code sẽ overrides các biến ENV trên Unix shell. Nếu bạn thích set các biến môi trường trên Unix shell hơn thì đừng tạo file ***config/local_env.yml***.

### Using Environment Variables.
Sử dụng ```ENV["GMAIL_USERNAME"]``` bất kì đâu trong ứng dụng Rails. Ứng dụng của bạn sẽ không hiểu nếu nó không được load từ file ***config/local_env.yml*** hoặc từ Unix shell.

### Distinguishing Development From Test Environments
Khi bạn muốn sử dụng các chứng thực tài khoản hoặc các API keys khác nhau cho các môi trường test và dev.
Đặt tên cho các biến khác nhau:
```
GMAIL_USERNAME_DEV: 'Your_Gmail_Username_For_Development'
GMAIL_USERNAME_TEST: 'Your_Gmail_Username_For_Tests'
```
và sử dụng các biến có điều kiện:
```
if Rails.env.development?
  config.action_mailer.smtp_settings = {
    user_name: ENV["GMAIL_USERNAME_DEV"]
  }
end

if Rails.env.test?
  config.action_mailer.smtp_settings = {
    user_name: ENV["GMAIL_USERNAME_TEST"]
  }
end

if Rails.env.production?
  config.action_mailer.smtp_settings = {
    user_name: ENV["GMAIL_USERNAME"]
  }
end
```
Cách tiếp cận này làm việc với file ***config/local_env.yml*** hoặc các biến môi trường ở trong Unix shell.

### Setting Environment Variables on Heroku
Heroku là một lựa chọn phổ biến với chi phí thấp và dễ dàng trong việc cấu hình Rails App hosting.
Heroku cung cấp một cơ chế đơn giản cho việc cài đặt các biến môi trường. Set các biến môi trường để cung cấp tương ứng data ứng dụng của bạn được lấy từ môi trường local shell.
Cho ví dụ về bài toán Gmail phía trên:
```
$ heroku config:add GMAIL_USERNAME=myname@gmail.com
```

hoặc nếu bạn có multiple environments trên Heroku:
```
$ heroku config:add GMAIL_USERNAME=myname@gmail.com --remote staging
```

Bạn có thể kiểm tra mọi thứ đã được add chính xác bằng cách runing:
```
$ heroku info --app myapp
```

"myapp" là tên ứng dụng của bạn trên Heroku.
Nếu bạn sử dụng Figaro gem, chỉ cần chạy:
```
rake figaro:heroku
```

Lưu ý rằng bạn sẽ không sử dụng file ***config/application.yml***. File ***.gitignore*** của bạn sẽ tránh cho nó bị add tới git repo. Nó sẽ không tồn tại khi bạn deploy tới Heroku và ứng dụng của bạn sẽ lấy các biến môi trường từ bảng cấu hình Heroko.

***THE END!***

Cảm ơn các cụ đã đọc bài (thankyou2)!

Nguồn tham khảo: http://railsapps.github.io/rails-environment-variables.html