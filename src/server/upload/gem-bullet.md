Các Bullet gem được thiết kế để giúp bạn tăng hiệu suất của ứng dụng bằng cách giảm số lượng lượt truy vấn .

# Cài đặt

```Ruby
$ gem install bullet
```

Hoặc thêm vào Gemfile rồi `bundle install`:

```Ruby
gem 'bullet', group: 'development'
```
Lưu ý: Phải thêm gem bullet vào sau activerecord (rails) và mongoid.

# Thiết lập

Thêm vào trong `config/environments/development.rb` đoạn  mã sau đây:

```Ruby
config.after_initialize do
  Bullet.enable = true
  Bullet.sentry = true
  Bullet.alert = true
  Bullet.bullet_logger = true
  Bullet.console = true
  Bullet.growl = true
  Bullet.xmpp = { :account  => 'bullets_account@jabber.org',
                  :password => 'bullets_password_for_jabber',
                  :receiver => 'your_account@jabber.org',
                  :show_online_status => true }
  Bullet.rails_logger = true
  Bullet.honeybadger = true
  Bullet.bugsnag = true
  Bullet.airbrake = true
  Bullet.rollbar = true
  Bullet.add_footer = true
  Bullet.stacktrace_includes = [ 'your_gem', 'your_middleware' ]
  Bullet.stacktrace_excludes = [ 'their_gem', 'their_middleware' ]
  Bullet.slack = { webhook_url: 'http://some.slack.url', channel: '#default', username: 'notifier' }
end
```

Đoạn mã trên sẽ cho phép bật tất cả hệ thống thông báo của Bullet:

- **Bullet.enable**: kích hoạt gem Bullet gem, nhưng không làm gì
- **Bullet.alert**: bật lên một cảnh báo JavaScript trong trình duyệt 
- **Bullet.bullet_logger**:  log ra trong file `Rails.root/log/bullet.log`
-  **Bullet.console**: log cảnh báo trong console.log của trình duyệt 
- **Bullet.growl**: bật lên cảnh báo Growl nếu hệ thống của bạn đã cài đặt Growl
- **Bullet.rails_logger**: thêm cảnh báo trực tiếp tới Rails log
- **Bullet.honeybadger**: thêm thông báo tới Honeybadger
- **Bullet.bugsnag**:  thêm thông báo tới bugsnag
- **Bullet.airbrake**:  thêm thông báo tới airbrake
- **Bullet.rollbar**:  thêm thông báo tới rollbar
- **Bullet.sentry**: thêm thông báo tới sentry
- **Bullet.add_footer**: thêm thông báo ở phía dưới bên trái page.
- **Bullet.stacktrace_includes**: chỉ rõ các đường dẫn dẫn đến query N+1 trong các gem thiết lập
- **Bullet.stacktrace_excludes**: bỏ qua các đường dẫn đẫn đến query  N+1 trong các gem thiết lập
- **Bullet.slack**: thêm thông báo tới slack
- **Bullet.raise**: raise errors

Bullet cũng cho phép bạn vô hiệu hóa các mục nếu bạn thấy không cần thiết:

```Ruby
# Each of these settings defaults to true

# Detect N+1 queries
Bullet.n_plus_one_query_enable     = false

# Detect eager-loaded associations which are not used
Bullet.unused_eager_loading_enable = false

# Detect unnecessary COUNT queries which could be avoided
# with a counter_cache
Bullet.counter_cache_enable        = false
```

**Log**

Log của Bullet trong file `log/bullet.log`:

- N+1 Query:

```Ruby
2009-08-25 20:40:17[INFO] N+1 Query: PATH_INFO: /posts;    model: Post => associations: [comments]·
Add to your finder: :include => [:comments]
2009-08-25 20:40:17[INFO] N+1 Query: method call stack:·
/Users/richard/Downloads/test/app/views/posts/index.html.erb:11:in `_run_erb_app47views47posts47index46html46erb'
/Users/richard/Downloads/test/app/views/posts/index.html.erb:8:in `each'
/Users/richard/Downloads/test/app/views/posts/index.html.erb:8:in `_run_erb_app47views47posts47index46html46erb'
/Users/richard/Downloads/test/app/controllers/posts_controller.rb:7:in `index'
```

- Unused eager loading: (includes thừa)

```Ruby
009-08-25 20:53:56[INFO] Unused eager loadings: PATH_INFO: /posts;    model: Post => associations: [comments]·
Remove from your finder: :include => [:comments]
```

- Need counter cache:

```Ruby
$2009-09-11 09:46:50[INFO] Need Counter Cache
  Post => [:comments]
```

Chú ý: Nếu bạn thấy Bullet không hoạt động, thì hãy disable bộ nhớ cache của trình duyệt.

_Tài liệu dịch_: https://github.com/flyerhzm/bullet