## I. Overview
**Capistrano** là một **tool** được sử dụng để **tự động hóa và triển khai máy chủ từ xa**, được viết bằng **Ruby**. Nó sử dụng **SSH** để kết nối với máy chủ để thực hiện các hoạt động khác nhau và Rake để xác định các nhiệm vụ cần thiết để thực hiện triển khai trên một máy chủ cụ thể. Để **tự động hóa các nhiệm vụ triển khai lặp đi lặp lại**, nó cũng có thể được sử dụng cho bất kỳ **ngôn ngữ** hoặc **framework** nào bao gồm **Java, PHP, Rails**, v.v.

Ngoài ra, bạn có thể **viết các kịch bản triển khai tự động của riêng mình** bằng cách viết các **rake tasks**. Tuy nhiên, Capistrano cung cấp **cấu trúc cơ bản** cho **multiple plugins** để triển khai chúng dễ dàng. Sau đây là **cấu trúc tệp**:
```ruby
├── Capfile
├── config
│   ├── deploy
│   │   ├── production.rb
│   │   └── staging.rb
│   └── deploy.rb
└── lib
    └── capistrano
            └── tasks
```
Ở đây, **Capfile** được sử dụng để yêu cầu các tệp plugin và xác định tác vụ rake do người dùng xác định. **Config / Deploy** là một thư mục nơi các tệp tin môi trường  (staging/production) được đặt cho máy chủ. **Deploy.rb** tập tin được sử dụng để xác định các biến chung, cấu hình, và nhiệm vụ, vv. Ngoài ra, **Lib / Capistrano / Tasks** là một thư mục mà người dùng xác định tùy chỉnh rake task cho capistrano được đặt.
## II. Setup in Ruby on Rails
Trong **Gemfile** của một dự án, chỉ định “**capistrano**” làm **core gem** và bất kỳ gem nào khác như “**capistrano-rails**” để cung cấp chức năng mở rộng.
```ruby
group :development do
  gem "capistrano", "~> 3.4" #capistrano core library
  gem 'capistrano-rails', '~> 1.1' #capistrano plugin for rails specific features
end
```
Để thêm chức năng bổ sung trong **Capfile**, gem "**capistrano-rails**" được required ở đây. Thêm dòng mã sau vào để **import** gem cần thiết:
```ruby
require 'capistrano/rails'
```
Để tạo **công thức capistrano** trong tệp **deploy.rb**, hãy đặt các **biến** sau được sử dụng bởi capistrano cho tất cả các môi trường:
```ruby
set :application, application/folder_name/on/server
set :branch, 'master' #your SCM branch
set :scm, :git
set :rails_env, :production
set :pty, true
set :keep_releases, 5
```
Để tạo **capistrano recipe** trong tệp **config / deploy / production.rb**, hãy **đặt biến môi trường cụ thể** (production trong trường hợp sau):
```ruby
server ‘serverIP_or_domain’, user: ‘user_name_to_connect_to_server’, roles: %w{app db web}
set :repo_url, 'Your git or any other SCM's repository url'
set :deploy_to, "/home/ubuntu/#{fetch :application}"
```
Ở đây, “**serverIP_or_domain**” là địa chỉ IP hoặc tên miền mà máy khách sử dụng để kết nối với máy chủ để triển khai.

Các **tasks** được chia sẻ giữa tất cả các môi trường được đặt trong tệp **deploy.rb** như các **biến** trong khi các **task của môi trường cụ thể** được đặt trong các files môi trường tương ứng của chúng (ví dụ, các **task của môi trường production** sẽ được đặt trong tệp **config / deploy / production.rb**).

Hai tasks sau đây được trình bày như một ví dụ về các **rake task** có **Capistrano DSL Support**.

1. Ví dụ này được sử dụng để kiểm tra quyền truy cập vào một máy chủ được chỉ định.
```ruby
desc "Check that we can access specified server"
task :check_write_permissions do
  on roles(:all) do |host|
    if test("[ -w #{fetch(:deploy_to)} ]")
      info "#{fetch(:deploy_to)} is writable on #{host}"
    else
      error "#{fetch(:deploy_to)} is not writable on #{host}"
      exit
    end
  end
end
```
2. Ví dụ này được sử dụng để kiểm tra xem **Git local branch có được đồng bộ hóa với remote branch** hay không.
```ruby
desc "checks whether local git is in sync with remote"
task :check_is_repo_updated do
  on roles(:web) do |host|
   unless `git rev-parse HEAD` === `git rev-parse origin/#{fetch(:branch, 'master')}`
      info "WARNING: local git is not synced with #{fetch(:branch, 'master')}"
      info "To solve this: Run git push origin #{fetch(:branch, 'master')} to sync"
      exit
    end
  end
end
 
# make sure that check_is_repo_updated runs after check_write_permissions task
after :check_write_permissions, :check_is_repo_updated
```
## III.reference
https://vteams.com/blog/remote-server-automation-and-deployment-with-capistrano