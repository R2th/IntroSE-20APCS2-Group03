Hẳn các bạn cũng biết rằng, để deploy một ứng dụng lên server, chúng ta phải trải qua rất nhiều bước. Việc viết từng lệnh một mỗi khi cần triển khai, update một ứng dụng khiến chúng ta mệt mỏi, tốn thời gian, công sức, cũng như việc tiềm tàng xảy ra các lỗi không đáng có. 

Vậy nên hôm nay mình sẽ giới thiệu với mọi người về Capistrano để deploy ứng dụng lên server. Đây là một công cụ rất nổi tiếng, giúp chúng ta có thể deploy một ứng dụng thông qua 1 câu lệnh !

**Chú ý:** Mình sẽ mặc định khi mọi người đọc bài này là đã biết rõ về cách deploy một ứng dụng Ruby. Capistrano chỉ có tác dụng khi mọi người hiểu về deploy, còn nếu như chưa biết về deploy, hãy đọc qua [tutorial](https://www.phusionpassenger.com/library/walkthroughs/deploy/ruby/) này đã nhé !
# Một vài khái niệm cơ bản

## Giới thiệu qua

Capistrano là 1 công cụ cho phép việc tự động thực hiện câu lệnh trên 1 remote server bằng cách sử dụng SSH. Capistrano hoạt động trên máy tính cá nhân của bạn (chứ không phải trên server) sau đó sẽ truy cập vào 1 hoặc 1 vài server (do chúng ta cấu hình) thông qua SSH để thực hiện các câu lệnh được chúng ta thiết lập sẵn. Capistrano sử dụng Ruby làm ngôn ngữ để viết script.

Capistrano sẽ yêu cầu chúng ta phải cung cấp cho nó tối thiểu những thứ sau:
1. Một Capistrano script, trong đó bao gồm những câu lệnh Capistrano phải thực hiện, cũng như server nào cần thực hiện những câu lệnh đó. File script này sử dụng Ruby để viết.
2. Một hoặc một vài configuration file để cung cấp thông tin các server, cũng như cách đăng nhập vào các server đó.

Capistrano còn có thể chạy các câu lệnh đồng thời trên các server khác nhau, điều này rất có lợi khi các bạn triển khai các ứng dụng lớn lên nhiều server khác nhau.

## Workflow

1. Đầu tiên, dĩ nhiên rồi, chúng ta cần phải cài đặt và chỉnh sửa Capistrano trên máy tính cá nhân của mình (lưu ý là máy tính cá nhân chứ không phải server nhé)
2. Mỗi khi cần deploy một version mới của ứng dụng, chúng ta cần phải:
* Commit và push toàn bộ code lên git repo (mà chúng ta đã cung cấp trong Capistrano)
* Chạy câu lệnh deploy của Capistrano

## Recipes:

Capistrano rất hữu dụng, nhưng sức mạnh thực sự của nó nằm ở các recipes mà cộng đồng xây dựng cho nó. 

Ví dụ, nếu chúng ta sử dụng `capistrano/deploy` recipe, trong đó sẽ chứa các câu lệnh giúp chúng ta tự động `git clone`, `git pull`, cũng như hỗ trợ cho việc rollback rất dễ dàng. Tất cả những điều chúng ta cần phải làm đó là cung cấp cho Capistrano URL của git repo. 

Hoặc nếu như bạn muốn deploy một ứng dụng rails, `capistrano-rails` sẽ giúp bạn chạy câu lệnh `bundle install`, compile Rails assets, chạy db migrate,...

## Cấu trúc directory của Capistrano:

Sau khi deploy app lên server bằng Capistrano, directory sẽ có cấu trúc như sau:

```ruby
myapp
 ├──  releases
 │       ├── 20150080072500
 │       ├── 20150090083000
 │       ├── 20150100093500
 │       ├── 20150110104000
 │       └── 20150120114500
 │            ├── <checked out files from Git repository>
 │            └── config
 │                 ├──  database.yml -> /var/www/myapp/shared/config/database.yml
 │                 └──  secrets.yml  -> /var/www/myapp/shared/config/secrets.yml
 │
 ├──  current -> /var/www/myapp/releases/20150120114500/
 ├──  repo
 │       └── <VCS related data>
 └──  shared
         ├── <linked_files and linked_dirs>
         └── config
              ├── database.yml
              └── secrets.yml
```

1. `releases` chứa toàn bộ các phiên bản của app, được đánh dấu bằng các timestamped folder. Mỗi khi bạn bảo với Capistrano deploy phiên bản mới lên, Capistrano sẽ clone từ Git repo về và lưu nó trong 1 thư mục con của `releases`.
2. `current` đơn giản thì nó là một [symlink](https://en.wikipedia.org/wiki/Symbolic_link) chỉ đến version mới nhất được chứa trong `releases` (dựa theo timestamp). Symlink này chỉ update khi quá trình deploy hoàn tất, nếu quá trình deploy fail ở bất kỳ bước nào, symlink này vẫn chỉ đến version cũ trước đó.
3. `repo` lưu giữ một bản copy của GIt repo, để lần sau có thể thực hiện pull về nhanh hơn.
4. `shared` đây là 1 thư mục rất hay ho của Capistrano, để mình lấy cho các bạn một ví dụ:

Bởi vì Capistrano hoạt động bằng việc clone ứng dụng từ Git về, vì thế nên chỉ những file được chúng ta upload lên Git mới có thể được clone về. Vậy ví dụ với một ứng dụng Rails, có những file mà ta chỉ có thể giữ ở môi trường local (database.yml, secrets.yml,...) thì làm sao ta có thể sử dụng được đây ? Và Capistrano đưa ra giải pháp, đó là người dùng có thể cấu hình các file, thậm chí là cả các folder mà có thể chia sẻ trực tiếp giữa môi trường development và môi trường production (máy cá nhân và server). Những file này sẽ luôn tồn tại dù cho chúng ta có đưa phiên bản thứ bao nhiêu lên đi chăng nữa.

Để cấu hình các file, folder được chia sẻ, Capistrano cung cấp cho ta 2 configuration options đó là `linked_files` và `linked_dirs`

# Cài đặt Capistrano
## Khởi tạo
Đầu tiên chúng ta cần phải cài đặt Capistrano trên chính ứng dụng Ruby mà chúng ta đang làm việt. Mở `Gemfile` ra và thêm vào:
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

Sau đó hãy chạy 2 câu lệnh:
```bash
bundle install

bundle exec cap install
```

## Chỉnh sửa Capfile:
`Capfile` là nơi đầu tiên Capistrano đọc đến, trong file này sẽ define recipes nào bạn muốn sử dụng.

Khi mới mở Capfile, nó sẽ trông như sau:
```Ruby
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

Có thể thấy rằng những recipes hay dùng đã được comment sẵn lại ở đây, khi ta cần sử dụng recipe nào, chỉ cần uncomment là xong.

## Chỉnh sửa file config/deploy.rb

Khi mới mở ra, file này trông như sau:

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

* Đầu tiên mọi người sẽ để ý đến trong file có rất nhiều câu lệnh bắt đầu bằng `set`, `set` ở đây chính là các configuration values của Capistrano, dùng để điều chỉnh các giá trị cài đặt cho Capistrano. Có thể thấy trong file mặc định đã có rất nhiều ví dụ mẫu, giải thích ý nghĩa của dòng lệnh, các bạn có thể thử uncomment xem hiệu quả của các dòng `set` đó ra sao, hoặc có thể tìm hiểu thêm ở [đây](http://capistranorb.com/documentation/getting-started/configuration/).
* Điều thứ 2 chúng ta cần để ý tới đó là `namespace` block ở trong file này. Chúng ta có thể sử dụng block này để tạo thêm các câu lệnh cần xử lý trong quá trình deploy. Đối với các app đơn giản thì chỉ cần sử dụng theo các recipe đã đề cập ở trên, nhưng đối với các app phức tạp thì chuyện chúng ta phải tự mình thêm các câu lệnh là chuyện hoàn toàn có thể xảy ra. 
Khi ứng dụng được deploy, nó sẽ phải chạy qua các `steps` đã được định nghĩa ở recipe `capistrano/deploy`, các `steps` đó như sau:
1. Clone code về release directory
2. Cài đặt linked file và directory
3. Chạy các lệnh như bundle install, db migrate,...
4. Chuyển đổi `current` symlink
5. Khởi động lại server

Như trong ví dụ tồn tại sẵn trong file, nó có nghĩa là chúng ta sẽ tạo thêm 1 task với tên gọi `:clear_cache` sau khi ứng dụng chạy bước `restart` (bước số 5). Trong block này ta có thể viết gì tùy muốn, nó cũng giống như các hàm callback ta hay viết trong model vậy.

## Chỉnh sửa file config/deploy/production.rb

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

File này được sử dụng để chỉ ra các server mà Capistrano sẽ chạy command để deploy lên. Như các bạn có thể thấy trong file, có 2 cách chính để chỉ định các server cũng như cách đăng nhập vào các server đó.
* Đầu tiên là sử dụng 1 global config cho toàn bộ các server. Điều này có nghĩa là các server của chúng ta đều sử dụng chung 1 mã rsa để đăng nhập thông qua ssh từ máy local.
* Cách thức thứ 2 là nếu như có server nào sử dụng 1 mã rsa khác với những server còn lại, thì ta có thể định nghĩa riêng cho server đó.

# Tài liệu tham khảo

https://www.phusionpassenger.com/library/deploy/standalone/automating_app_updates/ruby/