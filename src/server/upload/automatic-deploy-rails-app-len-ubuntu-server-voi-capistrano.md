# Capistrano là gì?

Lật lại phần 1 và 2 để deploy lên server:

*  ssh vào server
*  push code từ github về
*  restart unicorn
Vậy là mất 3 bước để deploy code lên server. 
- Thì Capistrano sẽ làm thay chúng ta chỉ 1 câu lệnh trên local.
- An toàn hơn khi phiên bản mới deploy xong và sãn sàng chạy thì mới thay phiên bản hiện tại. (tránh những trường hợp xấu như rớt mạng, server down...)
- lưu 5 phiên bản gần nhất giúp bạn có thể quay về các bản cũ nếu ko ưng ý,
# Setup Capistrano Deploy với Unicorn
Chú ý:  khi chạy với rails 5.0.0.1, trong gemfile mặc định mở thêm puma, vì thế ta cần bỏ dòng này đi `#gem 'puma' ~> 3.0`

Mình setup trên local nhé =.="
1.  Thêm gem `capistrano` vào gemfile
    ```
      group :development do
        gem 'capistrano-rails', require: false
        gem 'capistrano-bundler', require: false
        gem 'capistrano-rbenv'
        gem 'capistrano', '~> 3.4.0'
      end
    ```
2. bundle exec cap install
    sinh template cap với câu lệnh trên
    ```
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
    Giải thích 1 chút về các thư mục và chức năng của nó nhé:

    - Capfile định nghĩa các thư viện con của capistrano dùng trong việc deploy

        ex:
        ```
        require 'capistrano/rails/migrations'  #chạy migration
        require 'capistrano/rails/assets'  #add asset
        ```
    - config/deploy.rb
        ```
        # config valid only for current version of Capistrano
        lock '3.4.1'
        
        # ex: demo-deploy
        set :application, 'my_app_name' 
        # ex: git@github.com:me/demo-deploy.git
        set :repo_url, 'git@example.com:me/my_repo.git' #

        # Default branch is :master
        # ex: master
        # ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

        # Default deploy_to directory is /var/www/my_app_name
        # ex: /home/deploy/demo-deploy/current
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
        # ex: set :linked_files, %w{config/database.yml config/secrets.yml}
        # set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

        # Default value for linked_dirs is []
        # set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads}
        # set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

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


        Với app rails mà mình làm từ trước mình sẽ config đơn giản như sau:
        ```
        lock '3.4.0'

        # Change these
        set :repo_url,        'git@github.com:me/demo-deploy.git'
        set :application,     'demo-deploy'
        set :user,            'deploy'

        set :pty,             true
        set :deploy_via,      :remote_cache
        set :deploy_to,       "/home/#{fetch(:user)}/#{fetch(:application)}/current"
        set :linked_files, %w{config/database.yml config/secrets.yml}
        set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads}
        set :keep_releases, 5

        namespace :deploy do
          desc "seed database"
          task :seed do
            on roles(:db) do |host|
              within "#{release_path}" do
                execute :rake, "db:seed"
              end
            end
          end
          after :migrate, :seed
        end

        ```
        
    - config/deploy
         Default tạo cho mình 2 môi trường production và staging
         config file `production.rb`
         ```
         user = 'deploy'
        ip_address = '34.217.95.70/'

        role :app, ["#{user}@#{ip_address}"]
        role :web, ["#{user}@#{ip_address}"]
        role :db,  ["#{user}@#{ip_address}"]

        server ip_address,
               user: user,
               roles: %w{web app}

        set :rails_env, 'production'

        set :bundle_flags, '--no-deployment'

        set :ssh_options, {
          keys: %w(~/.ssh/id_rsa.pub),
          forward_agent: true,
          port: 22
        }

         set :nginx_server_name, 'demo_deploy.appconus.com'
         ```
         
    - lib/capistrano/tasks/
        
        Chứa của custom task
        
   => ok vậy là đã xong. Giờ chỉ còn bước cuối là push code server với capistrano thôi.
   
   # Setup Setup Capistrano Deploy với Puma
   1. Thêm gem vào `Gemfile`
       ```
       group :development do
          gem 'capistrano'
          gem 'capistrano3-puma'
          gem 'capistrano-rails' 
          gem 'capistrano-bundler'
          gem 'capistrano-rvm'
        end
       ```
   2. xong `bundle install` 
   3. Để show file config Capitrano sử dụng câu lệnh `cap install STAGES=production`
   4. add required vào `Capfile`:
       ```
        require 'capistrano/rvm'
        require 'capistrano/bundler'
        require 'capistrano/rails/migrations'
        require 'capistrano/rails/assets' 
        require 'capistrano/puma'
       ```
    5. file deploy.rb add thêm 1 số config cho puma vào:
         ```
         set :repo_url,        'git@github.com:me/demo-deploy.git'
        set :application,     'demo-deploy'
        set :user,            'deploy'

        set :pty,             true
        set :deploy_via,      :remote_cache
        set :deploy_to,       "/home/#{fetch(:user)}/#{fetch(:application)}/current"
        set :linked_files, %w{config/database.yml config/secrets.yml}
        set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads}
        set :keep_releases, 5

        namespace :deploy do
          desc "seed database"
          task :seed do
            on roles(:db) do |host|
              within "#{release_path}" do
                execute :rake, "db:seed"
              end
            end
          end
          after :migrate, :seed

        set :puma_rackup, -> {File.join(current_path, "config.ru")}
        set :puma_state, -> {"#{shared_path}/tmp/pids/puma.state"}
        set :puma_pid, -> {"#{shared_path}/tmp/pids/puma.pid"}
        set :puma_bind, -> {"unix://#{shared_path}/tmp/sockets/puma.sock"}
        set :puma_conf, -> {"#{shared_path}/puma.rb"}
        set :puma_access_log, -> {"#{shared_path}/log/puma_access.log"}
        set :puma_error_log, -> {"#{shared_path}/log/puma_error.log"}
        set :puma_role, :app
        set :puma_env, fetch(:rack_env, fetch(:rails_env, "staging"))
        set :puma_threads, [0, 8]
        set :puma_workers, 0
        set :puma_worker_timeout, nil
        set :puma_init_active_record, true
        set :puma_preload_app, false
         ```
     6. Vậy là chúng ta đã config xong với Puma khi sử dụng gem `gem 'capistrano3-puma'`
   # Deploy
   Dùng  ` bundle exec cap production deploy` để push code lên môi trường production
   Cap sẽ truy cập vào 2 file deploy.rb và production.rb để tiến hàng deploy....
   Các file log đều được lưu trong thư mục `shared/log` mà chúng ta đã config 
   
   # Kết Luận
   Vậy là mình đã xong series về loạt bài deloy app rails lên ec2. Đi từ chi tiết tới sử dụng gem để automatic việc deploy.