Với việc hỗ trợ của các tool tự động thì việc thự hiện "Zero Downtime Deployment" không còn là vấn đề khó cho hầu hết các project web. Vấn đề hiện tại là chọn tool nào cho dự án của mình. Với Laravel, chúng ta có khá là nhiều lựa chọn được viết bằng PHP như:
- Rocketeer - http://rocketeer.autopergamene.eu/
- Envoy - https://laravel.com/docs/6.x/envoy
- Deployer - https://deployer.org/

Tuy nhiên trong bài này, mình sẽ nói về việc triển khai auto deploy project Laravel với capistrano - 1 gem của ruby.

# 1. Giới thiệu
Có khá là nhiều bài viết về Capistrano trên viblo nên mình chỉ giới thiệu sơ lược về Capistrano.

Capistrano là 1 tool được viết bằng ngôn ngữ Ruby cho phép việc tự động thực hiện một tập hợp các câu lệnh trên 1 hay 1 vài remote server bằng cách sử dụng SSH. Capistrano có thể chạy song song trên nhiều server cùng lúc, việc này giúp chúng ta giảm thiểu đáng kể thời gian deploy khi cần deploy lên nhiều server.

# 2. Triển khai
Mình đã triển khai và đẩy code lên [laravel-capistrano](https://github.com/doanhpv-0200/laravel-capistrano), và trong bài viết này mình sẽ dựa vào code trên github trên.

Sau khi triển khai, cấu trúc thư mục của project sẽ tương tự như sau:
```ruby
=begin Deploy directory structure:
/var/www/test-deploy
├── current -> /var/www/test-deploy/releases/20191216080141
├── releases
│   ├── 20191216075447
│   ├── 20191216075558
│   ├── 20191216075711
│   ├── 20191216075932
│   └── 20191216080141
├── repo
│   ├── ....
│   └── ....
├── revisions.log
└── shared
    ├── ....
    └── storage 
=end
```

## 2.1. Cài đặt các thành phần cần thiết
- Bạn cần cài đặt ruby và gem capistrano trên máy đặt config của Capistrano
- Bạn cần chắc chắn máy này có thể ssh vào server mà bạn muốn deploy
- Bạn cần chắc chắn server phải có quyền truy cập vào git/svn/... chứa code cần deploy
- Cài đặt gem capistrano
```bash
gem install capistrano
```
- *optional*: nếu các bạn muốn thông báo lên slack thì các bạn cần cài đặt thêm gem `slackistrano`
```bash
gem install slackistrano
```

## 2.2. Configure
Sau khi clone code trên github, chúng ta chỉ cần chỉnh sửa file config là có thể thực hiện deploy luôn. 
```bash
cp config/deploy.rb.example config/deploy.rb
cp config/deploy/staging.rb.example config/deploy/staging.rb
cp config/deploy/production.rb.example config/deploy/production.rb
```

### `config/deploy.rb`
Trong file này bạn cần cập nhật lại thông tin của các thành phần như sau:

```ruby
# Config application
set :application, "test-deploy"
set :repo_url, "git@github.com:YOUR_USER_NAME/REPOSITORY.git"

# Config for deploy path
set :deploy_to, '/var/www/test-deploy'
set :releases_dir, '/var/www/test-deploy/releases'

# Default env
set :dotenv_file, '/PATH/TO/.env'

# Default value for keep_releases is 5
set :keep_releases, 5

# List of worker servers
set :workers_servers, []

# Slack configure
set :slackistrano, {
   klass: Slackistrano::CustomMessaging,
   channel: '#your-channel',
   webhook: 'your-incoming-webhook-url'
}
```

Nếu dự án của bạn không dùng slack, bạn có thể comment đoạn code config của slack ở trên lại.

### `config/deploy/production.rb`
```ruby
# server web detail
# You need to change ip and user for your server
server '10.0.0.10', user: 'deploy', roles: %w{web app laravel}

# Config ssh option
set :ssh_options, {
   keys: %w(LINK/TO/YOUR/private_key),
   forward_agent: false,
   auth_methods: %w(publickey)
}
```

## 2.3. Deploy
Để deploy, các bạn có thể tham khảo cách sử dụng bên dưới
```bash
# Deploy with default branch in config deploy.rb
cap staging deploy

# Deploy with tag 1.0.1
cap staging deploy branch=1.0.1

# Deploy with tag 1.0.2 and run Seeder_0_0_1 and Seeder_0_0_2
cap staging deploy branch=1.0.2 seeders=Seeder_0_0_1,Seeder_0_0_2

# Rollback deploy
cap staging rollback

# Rollback deploy to specific release
cap staging rollback ROLLBACK_RELEASE=20191001101213
```

## 2.4. Run single task
Ngoài việc thực hiện 1 tập hợp các task/câu lệnh như trên thì chúng ta có thể thực hiện từng câu lệnh riêng rẽ:

```bash
# Rollback migrate
cap staging laravel:migrate_rollback

# List all release (for rollback release above)
cap staging web:release_list
```

## 2.5. Mở rộng
Code của mình ở trên chỉ đáp ứng được việc deploy một project laravel cơ bản. Nếu các bạn cần thêm các tác vụ đặc biệt khác, các bạn có thể viết thêm và đặt vào thư mục `lib/capistrano/tasks`, nó sẽ tự động được `include` trong quá trình chạy.

# Kết
Như các bạn thấy, việc thực hiện deploy project laravel với capistrano khá là đơn giản. Chỉ cần vài config cơ bản là bạn có thể deploy ngay :smiley: