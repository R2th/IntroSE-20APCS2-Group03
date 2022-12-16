### 1. Introduce gem sidekiq-cron:
- Khi muốn implement cron job, ta thường dùm gem `whenever`, muốn implement background job, ta thường dùng gem `sidekiq`.
- Sử dụng gem `sidekiq-cron` có thể thay thế cả 2 gem trên.

### 2. Install:
- Thêm gem "sidekiq-cron" vào `Gemfile` và chạy `bundle install`.
    ```ruby
    gem "sidekiq-cron"
    ```
- Sau khi install gem `sidekiq-cron`, mở file `Gemfile.lock` bạn sẽ thấy gem `sidekiq` cũng đã được install và thêm vào trong `Gemfile.lock` nên ta không cần phải install thêm gem `sidekiq` sau khi đã install gem `sidekiq-cron`.
- Tương tự như gem `sidekiq`, ra cũng cần cần tạo file `config/initialize/sidekiq.rb` và tạo connection với `redis`
    ```ruby
    # config/initialize/sidekiq.rb
    Sidekiq.configure_server do |config|
      config.redis = { url: "redis://localhost:6379/0" }
    end

    Sidekiq.configure_client do |config|
      config.redis = { url: "redis://localhost:6379/0" }
    end
    ```

### 3. Cronjob:
- Với gem `schedule`, ta cần tạo 1 file `config/schedule.rb` để khai báo cronjob.
- Với gem `sidekiq-cron`, ra cần tạo 1 file `config/schedule.yml` để khai báo cronjob.
    ```ruby
    Sidekiq.configure_server do |config|
      config.redis = { url: "redis://localhost:6379/0" }

      schedule_file = "config/schedule.yml"
      if File.exist?(schedule_file)
        Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
      end
    end
    ```
- File `config/schedule.yml` khai báo các cronjob.
    ```yaml
    # config/schedule.yml
    hard_worker:
      cron: "* * * * *"
      class: "HardWorker"
      queue: "default"
    ```
- Trong đó: `hard_worker` là tên của job và phải là duy nhất.
- `cron`: schedule để chạy cronjob
- `class`: class của worker sẽ chạy cronjob.
- `queue`: lưu job trong queue của redis.
- Có thêm 1 số option khác như: `args`, `date_as_argument`, `active_job`, `queue_name_prefix`, `queue_name_delimiter`, `description`

### 4. Cron syntax:
- Mỗi cron được tạo thành từ 5 params:
    1.  `minute`: 0 - 59
    1. `hour`: 0 - 23
    1.  `day_of_month`: 1 - 31
    1.  `month`:  0 - 11
    1.  `day_of_week`: 0 - 6
- Mặc định là: `* * * * *` thì cron jon sẽ được chạy mỗi phút 1 lần.
- Thay đổi các params này sẽ thay đổi thời gian cron job được chạy.
- Ví dụ: `*/10 * * * *` thì cronjob sẽ được chạy 10 phút / 1 lần (ví dụ 22:00, 22: 10, 22: 20, ....).
- Ví dụ: `10 * * * *` thì cronjob sẽ được chạy vào phút thứ 10 của mỗi h / 1 lần (ví dụ: 22:10, 23:10, ...).
- Ví dụ: `0,5,10 * * *` thì cronjob sẽ được chạy vào phút thứ 0, 5, 10 của mỗi h / 1 lần (ví dụ: 22:00, 22:05, 22:10, ...)
- Ví dụ: `0-10 * * * *` thì cron job sẽ được chạy mỗi phút 1 lần từ phút thứ 0 - 10 của mỗi h 1 lần (ví dụ: 22:00, 22:01, 22:02, 22:03, 22:04, 22:05, 22:06, 22:07, 22:08, 22:09, 22:10, ....)
- Tương tự cho các tham số sau tương ứng với hour, day_of_month, month, day_of_week.

### 5. Create worker:
- Tạo class `HarkWorker` trong `app/workers`
    ```ruby
    # app/workers/hard_worker.rb
    class HardWorker
      include Sidekiq::Worker

      def perform
        puts "HarkWorker is performing"
      end
    end
    ```

### 6. Run redis and sidekiq
- Sau khi hoàn thành các bước trên, bạn cần chạy `redis-server` và `bundle exec sidekiq` để chạy redis và sidekiq.

### 7. Sidekiq UI:
- Thêm `sidekiq/cron/web` vào route để xem danh sách cron job với sidekiq UI.
    ```ruby
    # config/routes.rb
    require "sidekiq/web"
    require "sidekiq/cron/web"

    Rails.application.routes.draw do
      mount Sidekiq::Web => "/sidekiq"
    end
    ```
    
![](https://images.viblo.asia/98287b86-b811-4efe-9eeb-37dec8205d03.png)

### 8. Document:
- Gem sidekiq-cron: https://github.com/ondrejbartas/sidekiq-cron
- Source code tham khảo: https://github.com/thanhlt-1007/sidekiq-cron
- Ngoài ra bạn có thể tham khảo thêm gem sidekiq-scheduler: https://github.com/moove-it/sidekiq-scheduler