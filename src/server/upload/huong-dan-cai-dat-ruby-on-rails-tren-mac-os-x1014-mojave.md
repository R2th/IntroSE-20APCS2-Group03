Mở đầu ngắn gọn là việc bỗng dưng chuyển từ code trên Win sang Mac OS khiến mình trở thành 1 đứa nhà quê. Và đứa nhà quê này sau 1 hồi mày mò các bí kíp cài RoR khác nhau và vài lần factory reset máy thì với máy mình cũng như các đồng môn khác, cách hiệu quả nhất là ở trang [gorails](https://gorails.com/setup/osx/10.14-mojave).(Link nguồn)
# Tổng quan
Quá trình này chỉ mất có 30 phút
# Cài homebrew
Trước tiên chúng ta sẽ cài Homebrew. Với những người thuộc CLB dùng Táo thì đã quen với Homebrew rồi. Còn với Nhập môn dùng Táo thì xin giới thiệu đây là công cụ giúp chúng ta có thể quản lý và tải các gói cài đặt 1 cách dễ dàng từ nguồn.

Lệnh cài Homebrew khá là đơn giản. Khi bị yêu cầu cài thêm XCode CommandLine Tools, hãy gõ "yes".

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
# Cài đặt Ruby
Giờ thì chúng ta cài Ruby trước. Chúng ta sẽ cài Ruby qua `rbenv`(Mình không-hề-có-thiện-cảm với `rvm` cho lắm vì nó cho mình vài lần cài lại)
```
brew install rbenv ruby-build

# Thêm rbenv vào bash để tự động load mỗi lần bạn mở terminal
echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
source ~/.bash_profile

# Cài Ruby
rbenv install 2.5.3
rbenv global 2.5.3
ruby -v
```
# Cấu hình git
Skip bước này cũng ok, nhưng  mỗi lần push code lên mà phải gõ lại toàn bộ username với mật khẩu git quả là lằng nhằng kinh lên. Và mình thì sinh năm Chuột, không phải năm Trâu mà đi gõ đi gõ lại cái mớ ấy.
Đây sẽ là cách bạn cấu hình Github. Gõ lần lượt các lệnh sau:
```
git config --global color.ui true
git config --global user.name "YOUR NAME"
git config --global user.email "YOUR@EMAIL.com"
ssh-keygen -t rsa -C "YOUR@EMAIL.com"
```
Gõ xong lệnh cuối bạn sẽ nhìn thấy terminal hiện thế này

![](https://images.viblo.asia/7ecee944-c4dc-44c8-8c07-d53aa0fd0cb4.png)

Hãy gõ Enter 3 lần để cuộc đời đơn giản. Không chịu trách nhiệm nếu bước này các bạn thích sáng tạo =)))

Sau đó các bạn sẽ có hình ảnh sau

![](https://images.viblo.asia/8c4bb22d-a09d-4650-98a8-5ad8f80f4f8d.png)

Gõ lệnh
```
cat ~/.ssh/id_rsa.pub
```
Bạn sẽ có kq sau

![](https://images.viblo.asia/655f6dc4-e05e-470d-b0b6-6ecefeef2ef6.png)

Copy toàn bộ dòng từ `ssh-rsa` tới trước email của bạn rồi thêm ssh key ở GitHub:  https://github.com/settings/keys

![](https://images.viblo.asia/6652cb69-868c-4ab6-8b29-4727523f33e8.png)

Bấm New SSH key và paste key của bạn:

![](https://images.viblo.asia/3976c7d8-cc0d-4859-be0b-1be87c456634.png)

Bấm Add SHH Key để hoàn thành.

Sau đó hãy kiểm tra bằng lệnh
```
ssh -T git@github.com
```

![](https://images.viblo.asia/a27365e0-fd14-4bd8-a587-75f35c78131c.png)

Thế này là bạn cấu hình xong

# Cài Rails
Thôi bước này chắc các bạn nắm rồi và nắm nhanh là đằng khác
```
gem install rails -v 5.2.1
```
```
rbenv rehash
```
Kiểm tra
```
rails -v
# output dự kiến: Rails 5.2.1
```
# Database
Bạn thích cài gì thì cài
## sqlite3
```
brew install sqlite3
```
## MySQL
```
brew install mysql

# Chạy mysql
brew services start mysql
```
## PostgreSQL
```
brew install postgresql

# Chạy postgresql
brew services start postgresql
```
# Cuối cùng
Chạy lệnh sau để cài tất cả các gem cần tới extension của C
```
sudo installer -pkg /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg -target /
```

Cuối cùng là thử
```
rails new myapp

#### Nếu muốn dùng MySQL
rails new myapp -d mysql

#### Nếu muốn dùng Postgres
# Bạn sẽ cần phải chỉnh username trong config/database.yml thành
# tương tự như OSX user account của bạn. (ví dụ như trong ảnh trên của mình là 'quanhoang')
rails new myapp -d postgresql

# chuyển tới thư mục của ứng dụng
cd myapp

# Nếu bạn có cài đặt MySQL hoặc Postgres tên đăng nhập/mật khẩu, chỉnh
# config/database.yml để chứa tên đăng nhập/mật khẩu bạn đã đặt

# Tạo database
rake db:create

rails server
```
# Mục quảng cáo
Kể từ hồi đổi vũ khí, mình đã và đang phải cố gắng nhiều hơn. Hãy ủng hộ cho những bài dịch từ tiếng Nhật sang tiếng Việt của mình:

- https://viblo.asia/p/tim-hieu-ve-aws-codebuild-XL6lAkeJKek
- https://viblo.asia/p/thu-nghich-ngom-voi-fabric-oOVlYWj4K8W