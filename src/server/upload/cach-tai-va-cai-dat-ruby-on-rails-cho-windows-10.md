Trong bài viết hôm nay mình sẽ chia sẻ các bạn cách tải và cài đặt Ruby on Rails trên môi trường windows 10 nhằm phục vụ cho quá trình học tập và thực hành.
Vì phần lớn các dependencies và các hướng dẫn của Ruby on Rails đề hoạt động tốt trên môi trường Linux nên trong bài viết này mình sẽ hướng dẫn các bạn cách để có thể chạy được Linux trên máy windows của bạn.


**Lưu ý rằng nó chỉ hoạt động trên windows 10 64-bit**
# **Cài đặt Windows subsystem cho Linux**
Windows 10 cho phép bạn chạy các hệ điều hành khác nhau bên trong Windows tương tự như một máy ảo nhưng được triển khai một cách ngyên bản. Chúng ta sẽ sử dụng điều này để cài đặt Ruby và chạy các ứng dụng Rails của chúng ta

Mở Powershell as Administrator và chạy:
```PHP
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
vào store trên Windows 10 tìm kiến ubuntu vào get về máy của mình
![image.png](https://images.viblo.asia/f4bd39d8-4f44-4a14-bfcb-5fb791044767.png)

Sau khi cài thành công, mở lên trong Start Menu hoặc chạy lệnh `wsl` trong PowerShell hoặc command prompt, bạn sẽ được hỏi setup một user mới cho ubuntu. Như vậy là đã cài thành công Windows subsytem cho Linux

# Cài đặt Ruby
Đầu tiên ta tiến hành cài một số dependencies cần thiết cho Ruby
```PHP
sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common libffi-dev
```
Tiếp theo ta tiến hành cài đặt `rbenv` và `ruby-build`
```PHP
cd
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL
```
Tiến hành cài ruby bằng `rbenv` bằng câu lệnh `rbenv install <phiên bản ruby>` ở đây mình cài ruby 2.7.1
```PHP
rbenv install 2.7.1
rbenv global 2.7.1
```
Chạy `ruby -v` để kiểm tra phiên bản ruby nếu hiện ra `ruby 2.7.1p83 (2020-03-31 revision a0c7c23c9c) [x86_64-linux]` thì bạn đã cài thành công ruby
cuối cùng ta chạy
```PHP
gem install bundler
rbenv rehash
```
để cài đặt cái bundler cần thiết
# Cài đặt Rails
Vì những ứng dụng Rails ngày nay có rất nhiều dependencies nên chúng ta cần cài một Javascript runtime là NodeJS và package manager là Yarn
```PHP
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update
sudo apt-get install -y nodejs yarn
```
Sau khi cài xong ta tiến hành cài đặt Rails phiên bản 6.1.3.2  
```PHP
gem install rails -v 6.1.3.2
rbenv rehash
```
Để kiểm tra Rails đã cài thành công chưa ta chạy lệnh `rails -v`
# Tổng kết
Vậy là ta đã cài xong ruby và rails trên windows subsystem cho Linux. Để tạo ứng dụng Rails đầu tiên ta tiến hành
```PHP
Di chuyển đến ổ C trên windows (làm điều này mỗi khi bạn mở Linux console)
cd /mnt/c
Tạo một thư mục chứ project của bạn
mkdir -p code
Di chuyển vào project
cd code
Tạo một ứng dụng Rails
rails new hello-world
Di chuyển vào project hello-world và tiến hành chạy project
cd hello-world
rails server
```
Truy cập http://localhost:3000 
![screencapture-localhost-3000-2021-08-19-19_17_24.png](https://images.viblo.asia/9d1518fb-16d7-4005-9c29-37a9ec7afc7e.png)
vậy là bạn đã có thể tiến hành lập trình ruby trên windows rồi.
Hy vọng bài viết này có ích với bạn
# Document
* Bạn có thể tham khảo thêm tài liệu về cách cài đặt tại: https://gorails.com/setup/windows/10
* Đọc thêm tài liệu về rails: https://rubyonrails.org/