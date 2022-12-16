## Bối cảnh
Mình từng khá là đau đầu với câu chuyện setting và update biến môi trường (env) khi deploy.

Tưởng tượng mình có 10 server. Mỗi lần thay đổi ENV mình phải sửa trên từng server và restart lại service. Thời gian xử lí vừa lâu vừa có thể gây rủi ro nhầm lẫn
Bằng chứng là mình đã từng quên set ENV ở 2/10 server. Khá là toang

Mất bò mới lo làm chuồng, lúc này mình mới nghĩ tới việc lưu ENV tập trung. Việc quản lý tập trung ENV ở 1 nơi sẽ giúp việc update env / config diễn ra 1 cách nhanh chóng hơn 

Mình có viết 1 cái script để sửa env ở 1 server, và copy file env lên các server còn lại.
Điều này đã hạn chế được phần nào sai sót.

Nhưng vẫn chưa ưng cái bụng lắm... Mình tìm tới SSM

## Dùng SSM Parameter Store làm gì nhỉ
Hiện tại, mình biết khá nhiều người vẫn đang update ENV theo cách copy file env lên các server, thậm chí là vào sửa trên từng server. 

Bây h chúng ta có bài toán như này... 

Mình thực hiện deploy 1 Rails app lên EC2 thuộc Auto-scale group.
Để App có thể bât lên 1 cách nhanh nhất, mình tạo AMI với source code có sẵn.
Nếu thực hiện lưu config ở image, sẽ cần tạo AMI mới cho mỗi lần thay đổi 

Để giải quyết vấn đề này, có thể dùng SSM Parameter Store để load ENV ở boot time 

### Khai báo các biến môi trường
![](https://support.clearcloud.co.uk/hc/article_attachments/360040958271/aws-systems-manager-parameter-store.png)
### Set IAM role để có thể access tới SSM từ EC2
![image.png](https://images.viblo.asia/6ef68237-41f4-4861-b552-0b599c2d139d.png)

### Load ENV khi khởi chạy app 
```html
Gemfile.rb

gem "aws-sdk-ssm"
```

```ruby
Aws::SSM::Client.new.get_parameters_by_path(path: "#{Rails.env}/", recursive: true, with_decryption: true).parameters.each do |param|
  ENV[param["name"].split("/").last] = param["value"]
end
```
Giả sử chúng ta có biến môi trường  `production/MY_API_KEY`, 
đoạn code này sẽ set `ENV ["MY_API_KEY"]` theo giá trị được khai báo trên AWS

Khá là đơn giản, mỗi lần App được bật lên, nó sẽ tự load ENV mới nhất 

### Đối với các ENV cần được load trước Rails boot up
Ở bên trên, ENV sẽ được load trong quá trình Rails boot up

Trong 1 số trường hợp, chúng ta cần load 1 số ENV từ trước quá trình này.  

Ví dụ, nếu bạn deploy bằng Capistrano

![image.png](https://images.viblo.asia/d18a6b96-55ad-4a2d-8691-d488f6652a51.png)
 Ta cần load ENV là IP của các server sẽ thực hiện deploy code từ bước starting.

 Nhưng tới bước publishing, App mới được restart, lúc này Rails mới được boot.

 Ngoài ra, cơ chế deploy của Capistrano là sử dụng SSH, và command được chạy bởi Cap sẽ được tính là non-interactive login shell và không load các file .env

 Về non-interactive login shell, bạn có thể đọc thêm ở đây: https://unix.stackexchange.com/questions/38175/difference-between-login-shell-and-non-login-shell
 ![image.png](https://images.viblo.asia/d092804b-880c-475f-a8b7-79ac8b3337c3.png)

 Để Capistrano nhận ENV chúng ta có thể lưu các biến này vào .env file và sử dụng 
 ```
 gem dotenv-rails
 ```
 để xử lí

 Example:

 ```
 deploy.rb

 set :linked_files, %w{.env}

# Load ENV from .env in shared folder
Dotenv.load fetch(:env_path)
 ```
 ```ruby
 config/application.rb

 Bundler.require(*Rails.groups)

# Load ENV
Aws::SSM::Client.new.get_parameters_by_path(path: "#{Rails.env}/", recursive: true, with_decryption: true).parameters.each do |param|
  ENV[param["name"].split("/").last] = param["value"]
end
```
 Ở đây, chúng ta sẽ tạo 1 file .env ở share_path lưu các biến môi trường cân load trước khi boot-time. 

 Khi chạy lệnh deploy, Cap sẽ load file .env từ share_path.

 Khi deploy, tới bước bundle và boot Rails, sẽ load env từ SSM 
 (ahihi)

 ## Tổng kết
 Có rất nhiều cách để xử lí ENV, phụ thuộc vào người thiết kế và lên kịch bản deploy. Mỗi cách sẽ có các đặc điểm riêng. Hi vọng mn sẽ tìm được cách phù hợp cho mình