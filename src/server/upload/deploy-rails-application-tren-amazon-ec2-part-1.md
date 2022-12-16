# Giới thiệu
Mình đang tìm hiểu về deploy trên EC2 và config Unicorn, Nginx, mySql. Vì vậy bài viết đầu tiên trong loạt bài này mình xin được giới thiệu về dịch vụ AWS, và deploy ứng dụng rails trên AWS
# Amazon EC2 là gì?
Theo định nghĩa trên trang chủ của amazon



-----

Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides secure, resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.

-----
Dễ hiểu thì EC 2 viết tắt bởi Elastic Cloud nó cho phép người dùng có thể tạo và cấu hình 1 server. Khi có nhu cầu người dùng có thể dễ dàng scale công năng của server một cách dễ dàng.

# Đăng ký EC2
Bạn phải có 1 tài khoản AWS lưu ý để đăng ký tài khoản và sử dụng dịch vụ EC2 bạn cần phải có 1 thẻ thanh toán quốc tế.
1. Đăng nhập vào EC2 console page https://us-west-2.console.aws.amazon.com/console/home?region=us-west-2
2. tìm và chọn dich vụ EC2
    ![](https://images.viblo.asia/aab53e7b-7c58-46f2-8374-209c0f9af7a1.png)
    
3. click button launch intance để tạo 1 intance (để bắt đầu sử dụng dịch vụ EC2 và chạy 1 vitrual server)
    ![](https://images.viblo.asia/482fa06b-113d-4a95-85e7-75857cb5500a.png)
   
4. Chọn  Amazon Machine Image (AMI) 
    
    ở đây mình chọn Ubutu server 16.4 LTS![](https://images.viblo.asia/ff2fef81-476f-4d98-84b5-1fa57662e286.png)
5. Cấu hình phần cứng cho Intance 
    ở đây mình chọn `t2.micro` vì cấu hình của nó ok (Variable ECUs, 1 vCPUs, 2.5 GHz, Intel Xeon Family, 1 GiB memory, EBS only) và còn miễn phí 1 năm nữa.
    chọn t2.micro và click `Next:Configure Instance Details`
    ![](https://images.viblo.asia/83868ca6-db4f-45a4-ac71-bcf9e79f000a.png)
6. Bước này cứ để mặc định thôi và click `Next: Add Storage`
    ![](https://images.viblo.asia/ef9583c1-a4b3-4a2d-8747-db649f9c354d.png)
7. Sử dụng cấu hình default là ổn, tiếp tục và click `Next: Add Tags`
    ![](https://images.viblo.asia/cc6faeb3-477d-4cb9-ac47-2416b61a0874.png)
8. Đặt tên cho Intance và click `Next: Configure Security Group` 
    ![](https://images.viblo.asia/48598625-135d-453c-b3cb-f56cdfd0a082.png)
9. Click Add Rule và chọn type là HTTP, config thế này để request từ bên ngoài internet có thể tới được Nginx server. Rồi click `Review And Launch`
    ![](https://images.viblo.asia/4b677917-179c-4dae-8d3c-08cd10253b26.png)
10. Kiểm tra lại config và click launch.
    ![](https://images.viblo.asia/72ee631d-f7ec-4e71-8ca8-b877ca2bd8b5.png)
 11. Tạo key và Click `Launch Instance`
     ![](https://images.viblo.asia/f6cab91f-45d7-440e-8e6e-e57d0f70faaf.png)
     Nếu bạn chưa có thì chọn `create a new key pair` và đặt tên `key pair name` xong download key pair về.
 12. Chờ 1 chút bạn sẽ thấy Instance đang chạy.
     ![](https://images.viblo.asia/bf2203a1-1f39-4651-b147-07209c0e9410.png)
 Vậy là 12 bước để bạn đăng ký dịch vụ ec2 và cấu hình xong 1 con instance(VPS)
 # Connect tới VPS của mình bằng ssh
 Việc đăng nhập bằng ssh sẽ bảo mật hơn là mật khẩu.
 1. Click Connect : AWS hướng dẫn mình các connect tới VPS bằng ssh
     ![](https://images.viblo.asia/7c0cd842-697a-44bb-b818-e5e4c6a148f5.png)
 2.  Ssh vào server
 
     `ssh -i "MinhDT-Key.pem" ubuntu@ec2-34-217-95-70.us-west-2.compute.amazonaws.com`
     
     Như vậy là mình đã connect thành công vs VPS
3. Tạo 1 tài khoản khác với quyền sudo
     Như ta đã biết việc sử dụng tài khoản `non-root` là cần thiết vì tài khoản này sẽ bị giới hạn phạm vi hoạt động, muốn huỷ hoại server mình thì chỉ gói gọn trong phạm vi tài khoản đó thôi, nếu muốn lấn quyền thì phải nhập mật khấu cho sudo 
    
    - create user non-root `sudo adduser username`
    - nhập password và confirm password
    - nhập thông tin của user
    
        ex:
    
        ![](https://images.viblo.asia/a6e7546f-c24d-4044-83ca-64a932059854.png)
   - set quyền cho user mới tạo `sudo visudo` và add dòng `%username ALL=(ALL) ALL`
     ex: `%minhdt ALL=(ALL)ALL`
   - login account `su - username`
     ex : `su - minhdt`
 4. ssh user với github (bạn có thể không dùng ssh nhưng như mình nói ở trên password có thể bị đánh cắp chứ mất cặp key thì gần như không thể xảy ra)
     
     - generate key `ssh-keygen`
     - cat .ssh/id_rsa.pub
     - copy output và paste vào https://github.com/settings/keys
     Như vậy là ta đã ssh user với tài khoản github thành công
 5. Note:
    Như bạn thấy ở mục 2 ssh vào server `ssh -i "MinhDT-Key.pem" ubuntu@ec2-34-217-95-70.us-west-2.compute.amazonaws.com` nó khá là dài và khó nhớ vì vậy các bạn có thể config sau đó là cấu hình 1 alias tương ứng cho ssh:
    - `vim ~/.ssh/config
    - add vào file
    ```
    Host alias-name
    HostName xx.yy.zz.tt
    User user_name
    Port xxx
    IdentityFile path/to/ssh/file
    ```
    ex: 
    ```
    Host rails-server
    HostName ec2-34-217-95-70.us-west-2.compute.amazonaws.com
    User ubuntu
    Port 22
    IdentityFile ~/.ssh/MinhDT-key.pem
    ```
     - sau đó chỉ việc gõ `ssh alias-name` ex :`ssh rails-server`
# Cài đặt mỗi trường trên EC2
## Installing Ruby
Mình sử dụng rbenv để install ruby
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs yarn
cd
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL

rbenv install 2.5.0
rbenv global 2.5.0
ruby -v
```
## Installing Rails
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
gem install rails -v 5.1.4
```
## Installing MySql
```
sudo apt-get install mysql-server mysql-client libmysqlclient-dev
```
# Run Rails Server trên EC2
Sau khi cài đặt xong việc chạy rails server khác là đơn giản:
1. Bạn tạo 1 application
2.  Push code lên github
3.  Trên EC2 bạn clone app
4.  RAILS_ENV=production rake assets:precompile (precompile assets của app để image, css, js đc load)
5.  RAILS_ENV=production rails server
6.  mở cổng 3000 cho server:
    
    - trong mục `security groups` click `launch-wizard-6`
    - chỉnh sửa mở cổng 3000 như trong hình
    ![](https://images.viblo.asia/4dc3e6cb-28eb-453f-b99f-77c08ffd5cc0.png)
  7.  http://IPv4_Public_IP:3000 (IPv4_Public_IP sẽ được lấy trên EC2 console)![](https://images.viblo.asia/393f5859-5054-4c04-9920-8e86d09bf00a.png)
  Vậy là đã xong ^^ 
# Kết luận
 Phần này mình xin đề cập tới việc giới thiệu ec2 và deploy lên ec2. Bài sau mình sẽ nói về unicorn, nginx,...