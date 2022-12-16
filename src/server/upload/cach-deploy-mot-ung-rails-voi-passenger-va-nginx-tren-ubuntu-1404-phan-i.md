## Giới thiệu
Nếu bạn là một rails dev chắc hẳn bạn cần 1 web host để deploy ứng dụng của bạn.
Đây là bài hướng dẫn sử dụng phusion Passenger để deploy ứng dụng của bạn. Passenger khác dễ dàng cài đặt, cấu hình và bảo trì nó có thể dụng dụng nginx hoặc apache. Trong bài hưỡng dẫn này mình sẽ sử dụng passenger với nginx trên nền ubuntu 14.04.

Một phương pháp thay thế để triển khai ứng dụng Rails của bạn là với Cài đặt Rails 1 lần nhấp này sử dụng Nginx với Unicorn, một máy chủ HTTP có thể xử lý đồng thời nhiều yêu cầu.

## Bước 1 Tạo droplet
Tạo ubuntu 14.04 droplet. Có nhiều phiên bản bạn có thể chọn với các web nhỏ có thể chọn dung lượng khoảng 512MB. 
![](https://images.viblo.asia/9be3947b-d04a-410a-a935-5782cfd18219.png)

Và tuỳ theo nhu cầu mà bạn chọn bản 64bit hay 32bit.
![](https://images.viblo.asia/1cc099c4-73c2-47c7-906d-6b1c7b838eac.png)

## Bước 2 Thêm sudo user
Sau khi tạo droplet bạn cần một user để quản trị và bảo mât hệ thống. 
Cụ thể thế nào thì mọi người có thêm xem thêm ở bài viết này.
https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04
## Bước 3 cài đặt domain 
Bước setup domain thì có thể có hoặc không cái này là tuỳ chọn. Vì bạn có thể truy cập thông qua địa chỉ IP.
## Bước 4 cài đặt ruby
Tiếp theo bây giờ chúng ta sẽ cài ruby và việc đầu tiên là update các package cần thiết 
```ruby
sudo apt-get update
```
Tiếp theo sẽ cài đặt một số dependencies. Để hệ thống hoạt đông trơ tru nhất.
```
sudo apt-get install build-essential libssl-dev libyaml-dev libreadline-dev openssl curl git-core zlib1g-dev bison libxml2-dev libxslt1-dev libcurl4-openssl-dev nodejs libsqlite3-dev sqlite3
```
Tạo một folder tạm để lưu trữ ruby.
```
mkdir ~/ruby
```
Di chuyển vào folder vừa tạo
```
cd ruby
```
Dowload và giải nén ruby
```
wget http://cache.ruby-lang.org/pub/ruby/2.1/ruby-2.1.3.tar.gz
tar -xzf ruby-2.1.3.tar.gz
```
Di chuyển tới thư mục ruby vừa giản nén và chạy script
```
./configure
```
Lệnh trên sẽ chạy để check các dependencies và tạo `Makefile` để có thể chạy compile code và chạy `make` để chạy file `Makefile` 
```
make
```
Tiếp theo chạy 
```
sudo make insall
```
và kiểm tra version của ruby
```
ruby -v
```
ok đã cài xong ruby bạn có thể xoá folder ruby tạm ban đầu được rồi.
```
rm -rf ~/ruby
``
## Bước 5 cài đặt passenger and nginx
Thông thường chúng ta sẽ cài đặt passenger thông qua ruby gem nhưng ở đây chúng ta sẽ cài đặt qua APT(Advanced Packaging Tool) nhưng hỗ trỡ cho việc quản trị nâng cấp,.. sau này.

Đầy tiên cài đặt PGP key:
```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 561F9B9CAC40B2F7
```
Tạo 1 APT file
 ```
 sudo nano /etc/apt/sources.list.d/passenger.list
 Thêm dòng sau vào file passenger.list
  ```
  deb https://oss-binaries.phusionpassenger.com/apt/passenger trusty main
  ```
  Thay đổi quyển và owner
  ```
 sudo chown root: /etc/apt/sources.list.d/passenger.list
sudo chmod 600 /etc/apt/sources.list.d/passenger.list
  ```
  Update APT
  ```
  sudo apt-get update
  ```
  Cuối cùng cài passenger và nginx
  ```
  sudo apt-get install nginx-extras passenger
  ```
  Bước này sẽ ghi đè lên phiên bản Ruby của chúng tôi sang phiên bản cũ hơn. Để giải quyết vấn đề này, chỉ cần xóa vị trí Ruby không chính xác và tạo một liên kết tượng trưng mới đến tệp nhị phân Ruby chính xác:
  ```
  sudo rm /usr/bin/ruby
 sudo ln -s /usr/local/bin/ruby /usr/bin/ruby
  ```  
  ## Cuối cùng
  
    Trên đây là các bước tạo ubuntu cài đặt passenger và nginx thông qua gói APT của ubuntu ở bài viết sau chúng ta sẽ đi tiếp vào phần cài đặt webserver và deploy ứng dụng. hoặc bạn có thể đi tiếp với bài viết gốc tại đây : [](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-rails-app-with-passenger-and-nginx-on-ubuntu-14-04)