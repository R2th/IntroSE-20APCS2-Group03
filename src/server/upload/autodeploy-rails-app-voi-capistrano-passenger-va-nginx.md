Nếu bạn làm deploy theo các bước như trong [Ruby deployment tutorial](https://www.phusionpassenger.com/library/walkthroughs/deploy/ruby/), bạn hẳn đã biết việc deploy các bản cập nhật ứng dụng Rails cần nhiều bước . Việc thực hiện tất cả các bước này rất mất thời gian và dễ xảy ra lỗi.<br>
Bài viết này sẽ chia sẻ cho bạn cách tự động hóa việc deploy các bản cập nhật ứng dụng thông qua Capistrano. Capistrano là một công cụ tự động hóa nhiệm vụ phổ biến trong số các nhà phát triển Ruby. Khi Capistrano được thiết lập, việc triển khai các bản cập nhật ứng dụng tiếp theo chỉ cần một lệnh duy nhất.
* Lưu ý: Bạn nên cài sẵn Nginx và Passenger . Tốt nhất là cài Nginx trên 1 máy và Passenger trên 1 vài máy khác để có thể thấy sự kết nối giữa các server , ngoài ra hay nhớ rằng tất cả các máy này đều dùng chung 1 database nhé 
# Khái niệm cơ bản
### Chức năng cơ bản
* Capistrano là một công cụ để tự động hóa việc thực hiện các lệnh trên các máy chủ từ xa thông qua SSH.<br>
* Capistrano chạy cục bộ - trên máy tính của bạn - và đăng nhập vào một hoặc nhiều máy chủ từ xa thông qua SSH để thực thi các lệnh. Vì tập lệnh Capistrano theo cú pháp Ruby và do Capistrano chạy cục bộ, tập lệnh Capistrano có thể sử dụng mã Ruby tùy ý để xử lý kết quả của mỗi lần thực thi lệnh, ví dụ để xác định lệnh nào sẽ thực hiện tiếp theo.<br>
* Capistrano cũng có thể chạy các lệnh song song trên nhiều máy chủ. Điều này đặc biệt hữu ích trong các tình huống khi bạn mở rộng ứng dụng của mình ra nhiều máy chủ và muốn triển khai đồng thời đến từng máy chủ.
### Quy trình làm việc
Quy trình làm việc của Capistrano như sau:
1. Đầu tiên, bạn cần cài đặt và cấu hình Capistrano.
2. Mỗi khi bạn sẵn sàng triển khai một phiên bản mới của ứng dụng, bạn cần:
* Commit và push tất cả các thay đổi trong úng dụng của bản lên Git repository của bạn
* Và chạy lệnh deploy bằng capistrano 
### Cấu trúc thư mục Capistrano
![](https://images.viblo.asia/49a25ff9-8f82-4de0-9b82-412fd85027ee.jpg)
1. releases: Hiểu đơn giản là nơi lưu giữ các phiên bản đã được deploy của ứng dụng
2. current: trỏ đến phiên bản mới nhất được deploy của ứng dụng nếu deploy thành công. Ngược lại nếu quá trình deploy có bất kỳ sự cố current sẽ trỏ đển phiên bản deploy thành công gần đây nhất
3. repo: giữ 1 bản sao lưu trữ của Git repository, giúp các lần pull code tiếp theo nhanh hơn
4. shared: nơi lưu trữ nhưng file cố định trong quá trình deploy
# Khởi tạo Capistrano
Việc đầu tiên phải làm là cài đặt Capistrano vào Project Ruby của bạn. Thêm những gem sau vào Gemfile:
```ruby
group :development do
  gem 'capistrano'
  gem 'capistrano-bundler'
  gem 'capistrano-passenger', '>= 0.1.1'

  # Remove the following if your app does not use Rails
  gem 'capistrano-rails'

  # Remove the following if your server does not use RVM
  gem 'capistrano-rvm'
end
```
Sau đó chạy `bundle install` và khởi tạo Capistrano:
```
$ bundle install
...
$ bundle exec cap install
mkdir -p config/deploy
create config/deploy.rb
create config/deploy/staging.rb
create config/deploy/production.rb
mkdir -p lib/capistrano/tasks
create Capfile
Capified
```
# Sửa Capfile
Capfile chính là đầu vào của Capistrano. Nó xác định các phương thức được sử dụng trong quá trình deploy . Vậy nên bạn cần chình sửa Capfile để chỉ ra các phương thức cần dùng<br>
Khi mở Capfile bạn sẽ thấy:
```ruby
# Load DSL and set up stages
require 'capistrano/setup'

# Include default deployment tasks
require 'capistrano/deploy'

# Include tasks from other gems included in your Gemfile
#
# For documentation on these, see for example:
#
#   https://github.com/capistrano/rvm
#   https://github.com/capistrano/rbenv
#   https://github.com/capistrano/chruby
#   https://github.com/capistrano/bundler
#   https://github.com/capistrano/rails
#   https://github.com/capistrano/passenger
#
# require 'capistrano/rvm'
# require 'capistrano/rbenv'
# require 'capistrano/chruby'
# require 'capistrano/bundler'
# require 'capistrano/rails/assets'
# require 'capistrano/rails/migrations'
# require 'capistrano/passenger'

# Load custom tasks from `lib/capistrano/tasks' if you have any defined
Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }
```
Chúng ta muốn Capistrano tự động chạy `bundle install` và bảo passenger tự động restart lại ứng dụng trên app server . Chúng ta sẽ sử dụng `capistrano-bundler` và `capistrano-passenger`. Do đó chúng ta uncommented 2 dòng sau: 
```ruby
require 'capistrano/bundler'
require 'capistrano/passenger'
```
Nếu ứng dụng của chúng ta là Rails app, uncommented 2 dòng sau:
```ruby
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'
```
Và nếu chúng ta dùng RVM, uncommented:
```ruby
require 'capistrano/rvm'
```
Ngoài ra chúng ta cũng có thể chọn rbenv and chruby bằng cách uncommented các lựa chọn như với rvm nhé.
# Sửa config/deploy.rb
Tệp này chứa các giá trị cấu hình kiểm soát cách các công thức được tải sẽ thực hiện. Nó cũng định nghĩa các lệnh bổ sung sẽ được thực thi trên các máy chủ. Bạn phải chỉnh sửa nó theo tình huống của bạn.<br>
Khi mở file cúng ta sẽ thấy:
```ruby
# config valid only for current version of Capistrano
lock '3.3.5'

set :application, 'my_app_name'
set :repo_url, 'git@example.com:me/my_repo.git'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('bin', 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end
```
### Variables
Cài đặt các giá trị cấu hình. Các giá trị này được sử dụng bởi các phương thức đã được tải lên Capfile . Sau đây là 1 vài cấu hình tiêu biểu:
* application: được sử dụng bởi `capistrano/deploy` . Liên quan chạt chẽ với nó là biên deploy_to: giá trị mặc định phục thuộc vào biến application. Do đó, nếu bạn đặt application là hello , Capistrano sẽ deploy tới /var/www/hello trừ khi bạn tùy trỉnh thêm biến deploy_to.
* repo_url: xác định nơi clone/pull code 
* linked_files and linked_dirs: được sử dụng bởi `capistrano/deploy` để liên kết thư mục shared với thư mục release
### Tasks
Bên trong block namespace, bạn có thể xác định các lệnh bổ sung để thực thi trong quá trình triển khai. Đối với các ứng dụng đơn giản, không cần thực hiện các lệnh bổ sung, nhưng đối với các ứng dụng phức tạp hơn, tính linh hoạt này rất hữu ích.<br>

## Hướng dẫn chính sửa
1. Xóa dòng lock vì dòng này vì ý nghĩa của nó là khóa phiên bản Capistrano thành 1 phiên bản cố định nhưng Bundler đã hoạt động như một cơ chế khóa phiên bản Gem , vậy nên lock khá thừa.
2. Đặt application là tên ứng dụng của bạn (ví dụ: myapp) . Lưu ý rằng điều này ảnh hưởng đến thư mục mà Capistrano triển khai như đã giải thích trước đó.
3. Đặt repo_url là url của repo trên gihub của bạn
4. Nếu úng dụng của bạn là Rails app, hãy đặt 2 option này:
```ruby
set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')
```
5. Nếu bạn sử dụng RVM , hãy đặt phiên bản RVM mà bạn đang sử dụng:
```ruby
set :rvm_ruby_version, '2.2.1'
```
6. Đặt môi trường chạy Passenger và restart app:
```ruby
set :passenger_environment_variables, { :path => '/path-to-passenger/bin:$PATH' }
set :passenger_restart_command, '/path-to-passenger/bin/passenger-config restart-app'
```
Thay `/path-to-passenger` bằng đường dẫn đến nơi Passenger được cài đặt
# Sửa config/deploy/production.rb
Khi bạn mở file này:
```ruby
# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary server in each group
# is considered to be the first unless any hosts have the primary
# property set.  Don't declare `role :all`, it's a meta role.

role :app, %w{deploy@example.com}
role :web, %w{deploy@example.com}
role :db,  %w{deploy@example.com}


# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server definition into the
# server list. The second argument is a, or duck-types, Hash and is
# used to set extended properties on the server.

server 'example.com', user: 'deploy', roles: %w{web app}, my_property: :my_value


# Custom SSH Options
# ==================
# You may pass any option but keep in mind that net/ssh understands a
# limited set of options, consult[net/ssh documentation](http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start).
#
# Global options
# --------------
#  set :ssh_options, {
#    keys: %w(/home/rlisowski/.ssh/id_rsa),
#    forward_agent: false,
#    auth_methods: %w(password)
#  }
#
# And/or per server (overrides global)
# ------------------------------------
# server 'example.com',
#   user: 'user_name',
#   roles: %w{web app},
#   ssh_options: {
#     user: 'user_name', # overrides user setting above
#     keys: %w(/home/user_name/.ssh/id_rsa),
#     forward_agent: false,
#     auth_methods: %w(publickey password)
#     # password: 'please use keys'
#   }
```
Nếu bạn có nhiều máy chủ, chỉ cần thêm chúng vào vai trò ứng dụng và web (nhưng không phải vai trò db, vì vai trò đó chỉ ra cơ sở dữ liệu chạy trên máy nào). Ví dụ:
```ruby
# Multi-server example
role :app, %w{myappuser@myserver.com myappuser@myserver2.com}
role :web, %w{myappuser@myserver.com myappuser@myserver2.com}
role :db,  %w{myappuser@myserver.com}
```
Nếu bạn sử dụng SSH key để kết nối tới các máy chủ:
```ruby
# Global options
# --------------
set :ssh_options, {
  keys: %w(/path-to-your-ec2-key.pem),
  forward_agent: false,
  auth_methods: %w(publickey password)
}
```
# Chuẩn bị các server
Đăng nhập vào các server với quyền admin sau đó:
### Cài đặt git
```
sudo apt-get install -y git
```
### Cài đặt tài khoản người dùng( Nếu bạn chưa có)
```
# Add user account
sudo adduser myappuser &&

# Setup initial SSH key
sudo mkdir -p ~myappuser/.ssh &&
sudo sh -c "cat $HOME/.ssh/authorized_keys >> ~myappuser/.ssh/authorized_keys" && \
sudo chown -R myappuser: ~myappuser/.ssh &&
sudo chmod 700 ~myappuser/.ssh &&
sudo sh -c "chmod 600 ~myappuser/.ssh/*"
```
Thay tên myappuser bằng tên bạn muốn
### Thiết lập cấu trúc thư mục cơ bản
```
sudo mkdir -p /var/www/myapp/shared
sudo chown myappuser: /var/www/myapp /var/www/myapp/shared
```
### Tạo tập tin cấu hình ban đầu
Nếu ứng dụng của bạn là ứng dụng Rails, thì nó sẽ yêu cầu config/database.yml và config/secret.yml. Nội dung của các tệp cấu hình này giống hệt nhau trên mỗi máy chủ. Thư mục shared là nơi hoàn hảo để đặt chúng. Và như được định cấu hình trước trong config/deploy.rb, Capistrano sẽ tự động tạo liên kết tượng trưng trong thư mục phát hành cho các tệp đó.<br>
Trên mỗi máy server tạo `shared/config` và thêm `database.yml`, `secrets.yml`:
```
sudo mkdir -p /var/www/myapp/shared/config
nano /var/www/myapp/shared/config/database.yml &&
  nano /var/www/myapp/shared/config/secrets.yml
```
Sau đó cài đặt quyền truy cập:
```
sudo chown -R myappuser: /var/www/myapp/shared/config
chmod 600 /var/www/myapp/shared/config/database.yml
chmod 600 /var/www/myapp/shared/config/secrets.yml
```
### Cấu hình Passenger
Như cấu hình trong `config/deploy.rb`, Capistrano sẽ deploy úng dụng được phát hành đến `/var/www/myapp/releases`, với `/var/www/myapp/current` trỏ đến phiên bản mới nhất . Vì vậy, Passenger phải được cấu hình để phục vụ ứng dụng từ `/var/www/myapp/current/public`.<br>
Mở tệp cấu hình Nginx trong máy chủ ảo , sửa đường dẫn `root` đến `/var/www/myapp/current/public`. Lưu ý rằng `public` nằm trong `/var/www/myapp/current`. Sau đó restart lại nginx.
# Deploying a new release
Trên máy tính local của bạn , hay thử 1 vài thay đổi sau đó commit và push code lên github . Sau đó chạy Capistrano để deploy:
```
bundle exec cap production deploy
```
## Lời Kết
Vậy là chúng ta tìm hiểu xong cách deploy 1 ứng dụng Rails lên máy chủ ảo sử dụng Nginx với vai trò Web Server , Passenger với vai trò App Server và Capistrano.
## Tài liệu tham khảo
https://www.phusionpassenger.com/library/deploy/nginx/automating_app_updates/ruby/