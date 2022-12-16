## Problem
Vào một ngày không đẹp trời, mình có gặp phải một vấn đề như sau: 

Rails app của mình có 2 server batch để chạy Sidekiq, thực  thi các Job bất đồng bộ. Sau khi sửa code và thực hiện deploy, 1 server gặp lỗi, không thể thực thi được Job. Sau một hồi điều tra mình phát hiện 2 server đang có code khác nhau. 1 server đã có code mới (khi deploy) và 1 server vẫn chạy theo code cũ.

Tiếp tục điều tra sâu hơn, mình tìm được nguyên nhân do hệ thống có sử dụng Monit để giám sát các service. Về monit, các bạn có thể tham khảo thêm tại đây: https://viblo.asia/p/gioi-thieu-ve-monit-cong-cu-giam-sat-server-manh-me-gAm5ybDXKdb

Tại monit, có config để tự động restart lại sidekiq khi service không chạy, monit thực hiện kiểm tra 2 phút/ lần
```
check process sidekiq with pidfile FILE_PATH/sidekiq.pid
if does not exist then exec "/bin/bash -c '/opt/scripts/restart_sidekiq.sh'"
```

Mình có sử dụng gem "capistrano-sidekiq"  https://github.com/seuros/capistrano-sidekiq

Khi thực hiện deploy, các step liên quan tới SIDEKIQ sẽ thực hiện như sau:

1. gửi 1 lệnh kill với flag là USR1. Khi nhận flag này, sidekiq sẽ ngừng nhận thêm việc thực thi Job. (ngừng add job vào queue) chứ ko shutdown.

2. kéo code mới về, đặt ở 1 thư mục có tên là ngày deploy 

3. gửi thêm 1 lệnh kill với flag là TERM. Khi nhận flag này sidekiq sẽ shutdown. Job đang thực thi sẽ được chờ xong, Job trong hàng đợi sẽ được đẩy ngược vào Redis.

4. Tạo symlink gán folder code mới được tạo tới thư mục current ( sidekiq khi bật sẽ load code trong thư mục current)

5. Bật sidekiq

Đúng tại bước 3, monit cũng kiểm tra, không thấy sidekiq chạy, Monit bật sidekiq lên. Lúc này symlink vẫn chưa được tạo, sidekiq ở server này bật lên vẫn chạy theo code cũ. Và thế là TOANG.

## The solution
Giải pháp đưa ra là sẽ thực hiện Unmonitor Sidekiq bằng Monit khi thực hiện deploy. Và Monitor lại sau khi quá trình deploy đã hoàn tất. 

Để thực hiện điều này, có 2 cách: 

- Sử dụng luôn Gem "capistrano-sidekiq" ở trên. https://github.com/seuros/capistrano-sidekiq#usage
- Sửa config deploy.

Đổi với việc sửa config deploy, có thể thực hiện như sau: 

Các bước xảy ra trong quá trình deploy bằng Cap:
```
deploy
  deploy:starting
    [before]
      deploy:ensure_stage
      deploy:set_shared_assets
    deploy:check
  deploy:started
  deploy:updating
    git:create_release
    deploy:symlink:shared
  deploy:updated
    [before]
      deploy:bundle
    [after]
      deploy:migrate
      deploy:compile_assets
      deploy:normalize_assets
  deploy:publishing
    deploy:symlink:release
  deploy:published
  deploy:finishing
    deploy:cleanup
  deploy:finished
    deploy:log_revision
   ```
   Chúng ta sẽ thực hiện unmonitor sau bước `check` và monitor lại sau bước `finishing` 
   
   Tại `config/deploy.rb`
   
   Thêm các task:
   ```
namespace :sidekiq do
  namespace :monit do
    desc "Monitor sidekiq"
    task :monitor do
      on roles(:batch) do
        execute "sudo /usr/bin/monit monitor sidekiq"
      end
    end

    desc "Unmonitor sidekiq"
    task :unmonitor do
      on roles(:batch) do
        execute "sudo /usr/bin/monit unmonitor sidekiq"
      end
    end
  end
en
```
Và sau đó 
```
 after :check, "sidekiq:monit:unmonitor"
 after :finishing, "sidekiq:monit:monitor"
```

it worked like a charm.

Hi vọng không ae nào gặp phải vấn đề giống mình :D