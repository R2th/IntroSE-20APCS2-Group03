Trong bài viết này, mình sẽ đề cập đến cách deploy 1 project Rails hay PHP lên AWS bằng ElasticBeanstalk

### Giới thiệu 
AWS hay Amazon Web Services là tập hợp trăm dịch vụ, mỗi dịch vụ sẽ gồm một vùng chức năng. VD như để tạo các server riêng như EC2 service, lưu trữ dùng S3 , deploy code là ElasticBeanstalk

Với Elastic Beanstalk, bạn có thể nhanh chóng deploy và quản lý các app trên AWS Cloud mà không cần phải lo lắng về hạ tầng server. AWS Elastic Beanstalk giảm bớt các quản lý phức tạp mà không giới hạn các lựa chọn hay điều khiển. Bạn đơn giản chỉ cần tải code của bạn lên server Elastic Beanstalk, Elastic Beanstalk sẽ tự động tính toán các yêu cầu bộ nhớ, cân bằng tải, mở rộng và theo dõi tình trạng hoạt động của app. 

### Cách sử dụng
Giả sử bạn có 1 project có sẵn.

Để sử dụng ElasticBeanstalk, bạn cần cài đặt [`eb-cli`](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)
```ruby
# Cài đặt eb-cli
$ pip install awsebcli --upgrade --user

# Thêm đường dẫn file thực thi vào biến PATH
LOCAL_PATH = ~/Library/Python/3.4/bin
export PATH=LOCAL_PATH:$PATH  # file .bash_profile hoặc .zshrc
source ~/.bash_profile

# Kiểm tra eb đã được cài thành công
eb --version
```

Tiếp theo chạy lệnh `eb init` để khởi tạo ứng dụng trên aws, khi đó, aws yêu cầu thông tin access key id  và Secret access key. Nếu bạn chưa có thì có thể tạo mới tài khoản IAM Users của riêng mình thay vì sử dụng  access key id  và Secret access key của tài khoản root.

Bạn vào [trang](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) để khởi tạo tài khoản IAM,  và sử dụng access key id  và Secret access key cho thông tin eb init.

Ngoài ra, bạn có thể chạy lệnh `aws configure` để config cho aws trên máy, để những lần sau chạy eb init cho các project khác, sẽ không cần phải nhập các thông tin đó. 

Với ElasticBeanstalk, ta có lệnh `printenv` và `setenv` để hiển thị và cài đặt biến môi trường cho ứng dụng. Ưu điểm lớn của ElasticBeanstalk là khi cập nhật biến môi trường, ta không cần phải reset lại hệ thống, với những ứng dụng được setup bằng tay thì việc cập nhật biến môi trường thật ác mộng, khi có những trường hợp cập nhật giá trí mới thì phải stop start web server, sẽ làm ảnh hưởng đến hệ thống.

Tiếp theo , ta chọn môi trường để deploy đến, thông qua lệnh `eb list`, và `eb use enviroment_name`

và chạy `eb deploy` để thực hiện deploy code bằng ElasticBeanstalk. Đợi vài phút là code mới đã được cập nhật lên hệ thống, rất đơn giản.