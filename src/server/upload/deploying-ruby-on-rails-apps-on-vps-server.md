Tôi muốn giới thiệu cho bạn một phương pháp để deploy các ứng dụng Ruby on Rails hoàn toàn theo cách riêng của bạn. Nó không phải là một giải pháp miễn phí, nhưng nó chắc chắn là giá cả phải chăng và bạn sẽ có một mã hóa thú vị hơn rất nhiều trong Ruby mà không có tất cả các hạn chế paywall.
## Thiết lập VPS
Để bắt đầu, bạn cần một VPS mà bạn có thể kết nối thông qua ssh. Giả sử chúng ta có một và chúng ta có thể kết nối với nó thông qua: $ ssh vps.com.
Tên miền cũng được yêu cầu khi tôi muốn phân phối các ứng dụng bằng cách sử dụng tên miền phụ. Giả sử chúng ta có miền vps.com trỏ đến địa chỉ IP VPS của tôi.
Đầu tiên chúng ta cần tạo một file cho VPS của chúng ta dưới thư mục nodes /. File sẽ chạy 3 vai trò:
* bootstrap (setting up locale, install nodejs, rbenv)
* web (nginx)
* database (postgresql)
```
# nodes/vps.com.json

{
  "run_list": [
    "role[bootstrap]",
    "role[web]",
    "role[database]"
  ]
}
```

Cài đặt gem trước khi bạn bắt đầu làm việc với VPS (`$ gem install bundler` nếu bạn chưa có nó): `$ bundle install.`
Để chuẩn bị & làm việc với vps chạy: `knife solo bootstrap vps`
Ok, bây giờ bạn phải có một ứng dụng RoR tuyệt vời mà bạn không thể chờ đợi lâu hơn nữa để chia sẻ với thế giới. Làm thôi nào!
Tạo vai trò cho ứng dụng (tên có thể giống với tên ứng dụng) chạy công thức "rails_app":
```
# roles/example_app.json

{
  "json_class": "Chef::Role",
  "run_list": [
    "recipe[rails_app]"
  ],
  "override_attributes": {
    "app_name": "example_app",
    "authorized_keys": [
      "ssh-rsa AsadsadsecretZZZ deployer@example.com",
      "ssh-rsa BsadsadsecretZZZ me@example.com",
      "ssh-rsa CsadsadsecretZZZ contributor@example.com"
    ]
  }
}
```

Ứng dụng sẽ có sẵn dưới tên miền phụ, trong trường hợp này là: http://example_app.vps.com. Ngoài vai trò được tạo vẫn cần một file để chạy vai trò ứng dụng:
```
# nodes/example_app.vps.com.json

{
  "run_list": [
    "role[example_app]"
  ]
}
```

Bạn cần cấu hình ssh cho example_app.vps.com, như hình dưới đây:
```
Host example_app.vps.com
  HostName vps.com
  User example_app
  ForwardAgent yes
  IdentityFile ~/.ssh/me_rsa
```

Chạy ứng dụng với tư cách là người dùng root: `knife solo cook root@example_app.com.vps`.
VPS đã sẵn sàng để đi, tất cả những gì còn lại là triển khai mã nguồn ứng dụng RoR qua
## Ứng dụng Rails
Thêm gem capistrano và unicorn vào Gemfile:
```
# Gemfile

gem 'capistrano', '3.2.1'
gem 'capistrano-rails'
gem 'capistrano-rbenv', '~> 2.0'

group :production do
  gem 'unicorn', '4.8.3'
end
```

Tiếp theo chạy: `$ bundle install.`
Tạo tệp Capfile vào thư mục gốc của ứng dụng:
```
# Capfile

require 'capistrano/setup'
require 'capistrano/deploy'
require 'capistrano/rbenv'
require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'
```

Tạo file config / deploy.rb:
```
# config/deploy.rb

lock '3.2.1'

set :application, 'example_app'
set :repo_url, 'git@github.com:username/example_app.git'

set :rbenv_custom_path, '/usr/local/rbenv'
set :rbenv_ruby, '2.1.5'

set :pty, true
set :sudo_prompt, ""
set :linked_files, %w{
  config/database.yml
  config/nginx.production.conf
  config/secrets.yml
  config/unicorn.rb
  config/unicorn_init.sh
}
set :linked_dirs, %w{ tmp log }
set :scm, :git
set :tmp_dir, "/home/#{fetch(:application)}/tmp"

namespace :deploy do
  %w{start stop restart}.each do |command|
    desc "#{command} unicorn server"
    task command do
      on roles(:app) do
        execute "service unicorn_#{fetch(:application)} #{command}"
      end
    end
  end
  after :finishing, :restart
end
```

và tạo file deploy/production.rb:
```
# config/deploy/production.rb

set :branch, :master
set :deploy_to, '/home/example_app/production'

server 'example_app.vps.com',
  user: 'example_app',
  roles: %w{ web app db },
  ssh_options: {
    forward_agent: true
  }
```

Cũng nên nhớ thêm database.yml và secret.yml vào .gitignore vì các tệp đó đã có trên VPS và cam kết tất cả các thay đổi của bạn.
Chúng ta đã gần xong rồi ... Bây giờ deploy ứng dụng của trên VPS: `$ bundle exec cap production deploy`.

Chúc mọi người thành công!