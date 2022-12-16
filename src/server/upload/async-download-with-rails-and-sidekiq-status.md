# Lời mở đầu

Trong dự án hiện tại mình đang tham gia có chức năng export dữ liệu từ các bảng trong database ra file Excel (`*.xlsx`). Việc export dữ liệu ít (trên môi trường development hoặc testing) thì không có vấn đề gì nghiêm trọng cả. Nhưng khi lên môi trường production với lượng dữ liệu rất lớn sẽ cần rất nhiều thời gian để export file và gây ra chết trang. Vậy nên mình đã được giao tìm hiểu làm sao để có thể thực hiện công việc này mà không gây ra vấn đề gặp phải. Và mình đã làm theo thằng Google!Drive là thực hiện công việc export file ở background, client sẽ thực hiện gọi lên server theo một khoảng thời gian cố định để kiểm tra xem công việc đã hoàn tất chưa. Nếu hoàn tất thì thực hiện download file đó. Nghe có vẻ khó hiểu nhỉ? Vậy chúng ta đi vào chi tiết bằng bài viết dưới đây của mình nhé!

# Chuẩn bị

Đầu tiên, chúng ta sẽ tạo một project Rails để thực hiện test nhé!

```
rails new simple-async-download -d mysql --skip-action-mailer --skip-action-cable --skip-turbolinks --skip-test
```

Sau đó, chúng ta thêm một số gem sau vào `Gemfile` để làm việc với background job:

```ruby
# Background Job
gem "resque"
gem "resque-scheduler"
gem "sidekiq"
gem "sidekiq-status"
```

Tiếp, chúng ta thêm gem sau vào `Gemfile` để làm việc với file Microsoft Excel (`*.xlsx`):

```ruby
gem "axlsx"
gem "zip-zip"
```

Rồi chạy lệnh

```
bundle install
```

để thực hiện cài các gem mới đã thêm. Tiếp theo, chúng ta tạo migration và seed data để thực hiện export ra file `*.xlsx`. Đầu tiên là file migration:

```
rails g model user --migration
```

```ruby
class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :address
      t.string :phone
      t.timestamps
    end
  end
end
```

Tiếp theo, tạo seed dữ liệu cho bảng user. Bạn hãy thêm gem `faker` vào `Gemfile` để tạo cho tiện nhé.

```ruby
(1..100).each do |idx|
  name = Faker::Name.unique.name
  email = Faker::Internet.email
  addr = Faker::Address.full_address
  phone = Faker::PhoneNumber.cell_phone

  puts "Create user #{idx}:\n\t- Name: #{name}\n\t- Email: #{email}\n\t- Address: #{addr}\n\t- Phone: #{phone}"

  User.create name: name, email: email, address: addr, phone: phone
end
```

Đã xong phần dữ liệu mẫu. Giờ chúng ta sang phần cài đặt cho Sidekiq và Resque. Đầu tiên là include Resque tasks vào Rake tasks:

```
rails g task resque setup
```

```ruby
# lib/tasks/resque.rake
require "resque/tasks"
require "resque/scheduler/tasks"

task "resque:setup" => :environment do
  ENV["QUEUE"] = "*"
end
```

Tiếp, cài đặt cho Resque kết nối với Redis

```ruby
# config/initializers/resque.rb
require "resque/scheduler"
require "resque/scheduler/server"

redis_configs = Rails.configuration.database_configuration[Rails.env]["redis"]
Resque.redis = Redis.new redis_configs
Resque.redis.namespace = "resque:AsyncDownload"

Dir[Rails.root.join("app", "jobs", "*.rb")].each{|file| require file}
```

Tiếp theo là Sidekiq với Redis và Sidekiq Status:

```ruby
# config/initializers/sidekiq.rb
REDIS_SERVER_CONFIG = Rails.application.config
  .database_configuration[Rails.env]["redis"]
REDIS_HOST = REDIS_SERVER_CONFIG["host"]
REDIS_PORT = REDIS_SERVER_CONFIG["port"]
REDIS_DB = REDIS_SERVER_CONFIG["db"]

Sidekiq.configure_server do |config|
  config.redis = {url: "redis://#{REDIS_HOST}:#{REDIS_PORT}/#{REDIS_DB}"}
  Sidekiq::Status.configure_server_middleware config
end

Sidekiq.configure_client do |config|
  config.redis = {url: "redis://#{REDIS_HOST}:#{REDIS_PORT}/#{REDIS_DB}"}
  Sidekiq::Status.configure_client_middleware config
end
```

Vậy là khâu chuẩn bị đã gần xong rồi. Giờ chúng ta chỉ cần một view hiển thị nút Export nữa là có thể đi vào phần chính rồi. Chúng ta làm nốt nào. Tạo controller:

```
rails g controller users index --no-stylesheets --no-javascripts --no-assets --no-helper
```

Update lại 2 file là `config/routes.rb` và `app/views/users/index.html.erb`

```ruby
# config/routes.rb
Rails.application.routes.draw do
  root to: "users#index"
end
```

```erb
<!-- app/views/users/index.html.erb -->
<h1>Export users</h1>
<button id="export">Export</button>
<div class="export-status"></div>
```

Vậy là xong, phần chuẩn bị nghe có vẻ vật vã nhỉ :smiling_imp:. Tiếp theo, chúng ta bắt tay vào thực hiện phần chính là export user ở background và response file đã export cho download nhé.

# Thực hiện

OK, giờ chúng ta bắt tay thực hiện phần chính của bài viết này, là export tất cả users ra file Excel ở worker và trả file ra cho người dùng download khi thực hiện export xong. Đầu tiên chúng ta thêm mime `xlsx` vào `mime_types.rb`:

```Ruby
# config/initializers/mime_types.rb
Mime::Type.register "application/vnd.ms-excel", :xlsx
```

Tiếp, chúng ta thực hiện phía server, tạo một Sidekiq worker để thực hiện export danh sách users ra file:

```
rails g sidekiq:worker ExportUser
```

Sau đó, chúng ta thực hiện nghiệp vụ export ở `ExportUserWorker`:

```ruby
# app/workers/export_user_worker.rb
class ExportUserWorker
  include Sidekiq::Worker
  # Include thêm cái này để chúng ta có thể track status của 1 worker.
  # Các bạn có thể đọc thêm doc của sidekiq-status để có thêm chi tiết.
  include Sidekiq::Status::Worker

  def perform
    # Lấy tất users
    users = User.pluck :id, :name, :email, :address, :phone
    # Báo cho SidekiqStatus rằng có tổng bao nhiêu users
    total users.size
    # Tạo Axlsx package
    xlsx_package = Axlsx::Package.new
    # Tạo Axlsx workbook
    xlsx_workbook = xlsx_package.workbook
    
    # Thêm sheet với tên Users
    xlsx_workbook.add_worksheet(name: "Users") do |worksheet|
      # Thêm dòng đầu gọi là header của file
      worksheet.add_row %w(ID Name Email Address Phone)
      
      # Duyệt tất cả users với index tính từ 1.
      users.each.with_index(1) do |user, idx|
        # Thêm row dữ liệu tương ứng với header đã tạo
        worksheet.add_row user
        # Báo cho SidekiqStatus rằng chúng ta đang thực hiện export đến user thứ bao nhiêu
        # để nó tính toán % hoàn thành cho chúng ta sử dụng sau đó
        at idx
        # Tạm nghỉ 500ms cho mỗi lần thêm 1 dòng.
        # Dùng trong khi chúng ta test. Bạn có thể sử dụng số khác :D
        sleep 0.5
      end
    end
    
    # Lưu file vào thư mục tmp với suffix là ID của job đang chạy
    xlsx_package.serialize Rails.root.join("tmp", "users_export_#{self.jid}.xlsx")
  end
end
```

Xong phần export ra file ở worker. Giờ chúng ta thực hiện edit Users controller. Thêm 3 methods sau:

```ruby
# app/controllers/users_controller.rb
  # Method này thực hiện gọi worker và trả ra Job ID để chúng ta track status
  def export
    respond_to do |format|
      format.json do
        job_id = ExportUserWorker.perform_async

        render json: {
          jid: job_id
        }
      end
    end
  end

  # Method này sẽ track job status theo Job ID
  def export_status
    respond_to do |format|
      format.json do
        job_id = params[:job_id]
        # Method get_all này trả ra cho chúng ta khá nhiều dữ liệu
        # các bạn có thể xem thêm tại Github của gem
        job_status = Sidekiq::Status.get_all(job_id).symbolize_keys

        render json: {
          # Status hiện tại của job
          status: job_status[:status],
          # % hoàn thành của job
          percentage: job_status[:pct_complete]
        }
      end
    end
  end
  
  # Method này sẽ trả lại file đã được export cho người dùng
  def export_download
    job_id = params[:id]
    exported_file_name = "users_export_#{job_id}.xlsx"
    filename = "UserData_#{DateTime.now.strftime("%Y%m%d_%H%M%S")}"

    respond_to do |format|
      format.xlsx do
        send_file Rails.root.join("tmp", exported_file_name), type: :xlsx, filename: filename
      end
    end
  end
```

Vậy là xong controller. Giờ chúng ta thêm 3 routes vào file `config/routes.rb`:

```ruby
# config/routes.rb
  get "/export" => "users#export"
  get "/export_status" => "users#export_status"
  get "/export_download" => "#users#export_download"
```

OK, đã xong phía server. Tiếp theo, chúng ta sang phía client, đầu tiên là tạo một file JavaScript để thực hiện gọi AJAX lên server thực hiện export file, kiểm tra trạng thái của việc export và thực hiện download khi export xong rồi nhúng nó vàp `app/assets/javascripts/application.js`:

```javascript
//= require users
```

Giờ chúng ta thực hiện viết code cho file `app/assets/javascripts/users.js`:

```javascript
// app/assets/javascripts/users.js
$(function() {
  var $statusElm = $("div.export-status");
  // Gắn sự kiện cho cho nút export
  $("button#export").on("click", function(e) {
    // Gọi AJAX lên server để tạo job
    $.ajax({
      url: "/export",
      dataType: "json"
    }).done(function(response, status, ajaxOpts) {
      if (status === "success" && response && response.jid) {
        // Khi gọi thành công, lấy Job ID
        var jobId = response.jid;
        // Tạo tên cho vòng lặp kiểm tra status, để chúng ta sẽ clear vòng lặp
        // khi hoàn thành.
        var intervalName = "job_" + jobId;

        $statusElm.text("Exporting 0%...");
        /**
         * Tạo vòng lặp với mỗi 800ms sẽ gọi lên để kiểm tra status.
         * Đây là môi trường localhost nên tốc độ response nhanh.
         * Còn môi trường server thực tế thì bạn nên tăng lên. Mình xem thử thì
         * thằng Google!Drive nó 4s (4000ms) mới gọi 1 lần kiểm tra
         */
        window[intervalName] = setInterval(function() {
          getExportJobStatus(jobId, intervalName);
        }, 800);
      }
    }).fail(function(error) {
      console.log(error);
    });
  });

  function getExportJobStatus(jobId, intervalName) {
    // Gọi AJAX lên kiểm tra status của Job ID hiện tại
    $.ajax({
      url: "/export_status",
      dataType: "json",
      data: {
        job_id: jobId
      }
    }).done(function(response, status, ajaxOpt) {
      if (status === "success") {
        // Lấy % hoàn thành của Job hiện tại
        var percentage = response.percentage;

        $statusElm.text("Exporting " + percentage + "%...");
        
        if (response.status === "complete") {
          $statusElm.text("Export completed. Downloading...");
          setTimeout(function() {
            /**
             * Nếu job có status là complete thì thực hiện xóa vòng lặp
             * với tên đã đặt ở phía trên rồi xóa biến đã tạo và cuối cùng là
             * redirect user tới method download file với job id hiện tại
             */
            clearInterval(window[intervalName]);
            delete window[intervalName];

            $(location).attr("href", "/export_download.xlsx?id=" + jobId);
            $statusElm.text("");
          }, 500);
        }
      }
    }).fail(function(error) {
      console.log(error);
    });
  }
});
```

Đến đây là xong. Chúng ta đã hoàn thành việc export file bằng worker và thực hiện trả file cho người dùng khi export thành công. Giờ chúng ta thử test nhé. Đầu tiên bạn bật Rails server lên:

```
rails server
```

Sau đó, bật Sidekiq:

```
bundle exec sidekiq
```

Giờ chúng ta sẽ truy cập vào http://localhost:3000 và bật F12, chọn tab Network và bấm thử nút Export để hưởng thụ thành quả :smiley:!

{@youtube:https://youtu.be/dz8h76h8ui4}

Vậy là xong. Giờ chúng ta sang phần cuối, là phần thực hiện xóa các file export để tránh rác server. Phần này không có gì ghê gớm cả. Chỉ đơn giản là chúng ta tạo một scheduler, chạy với thời gian nhất định, quét các file có trong thư mục `tmp` và kiểm tra xem file đó được tạo từ bao giờ, nếu quá thời gian quy định thì chúng ta sẽ thực hiện xóa file đó đi (tránh trường hợp có người dùng vừa tạo xong file mà chưa kịp download mà bị job của chúng ta xóa :smile:)!

Chúng ta sẽ sử dụng Resque scheduler để thực hiện việc chạy job theo một khoảng thời gian nhất định nhé. Đầu tiên, update lại file `config/initializers/resque.rb`

```ruby
Resque.schedule = YAML.load_file(
  Rails.root.join("config", "resque_schedule.yml")
)
```

Sau đó, tạo service để thực hiện quét và xóa các file hết hạn:

```ruby
# app/services/clear_old_user_exports_service.rb

class ClearOldUserExportsService
  EXPIRED_TIME_IN_HOUR = 1

  class << self
    def clear
      # Lấy tất cả các *.xlsx có prefix là users_export_ trong thư mục tmp
      user_export_files = Dir[Rails.root.join("tmp", "users_export_*.xlsx")]
      # Tạo một mảng chứa danh sách các file đã hết hạn
      expired_files = []
      
      # Duyệt các file đã lấy
      user_export_files.each do |file|
        # Lấy thời gian tạo của file
        # Bạn có thể đọc thêm tại đây: https://ruby-doc.org/core-1.9.3/File/Stat.html
        created_time = File::Stat.new(file).ctime
        # Tính thời gian đã tạo
        hour_ago = ((Time.now - created_time) / EXPIRED_TIME_IN_HOUR.hour)
        
        # Bỏ qua nếu nó chưa đủ thời gian
        next if hour_ago < EXPIRED_TIME_IN_HOUR
        # Thêm file đã hết hạn vào danh sách
        expired_files << file
        # Xóa file đã hết hạn
        FileUtils.rm file
      end

      write_log user_export_files.size, expired_files
    end

    private
    def write_log total_files, expired_files
      logger = Logger.new Rails.root.join("log", "clear_user_export.log")
      log_content = "\n==========ClearOldStaffExportsService==========\n"
      log_content << "Total files: #{total_files}\n"
      log_content << "Expired files: #{expired_files.size}\n"
      log_content << expired_files.map{|f| "- #{f}"}.join("\n")
      log_content << "\n==========***************************==========\n"

      logger.info log_content
    end
  end
end
```

Xong phần xử lý. Giờ chúng ta tạo một job để chạy. Thực hiện tạo và edit file `app/jobs/clear_old_user_exports.rb`:

```ruby
class ClearOldUserExportsJob
  @queue = :clear_old_user_exports

  def perform
    ClearOldUserExportsService.clear
  end
end
```

Tiếp, thêm job vào file `config/resque_schedule.yml`

```yaml
ClearOldUserExports:
  # Chúng ta thực hiện chạy 2h/lần. Nếu bạn muốn, bạn có thể sửa
  # Để test, chúng ta chạy 1'/lần thì bạn thay thành như sau:
  # cron: "*/1 * * * *"
  cron: "0 */2 * * *"
  description: "Clear old user export files"
```

Vậy là xong. Giờ bạn có thể chạy lệnh:

```
bundle exec rake resque:scheduler
```

và

```
bundle exec rake resque:work
```

để thực hiện chạy job và kiểm tra log file tại `log/clear_user_export.log`.

# Lời kết
Đến đây là kết thúc bài viết của mình. Những gì mình viết ra nó không phải là hoàn hảo. Nhưng nó cũng sẽ cho mọi người một cái nhìn cơ bản về việc download một file cần nhiều thời gian thực thi ở background mà không gây ra chết trang khi server thực hiện công việc export quá lâu. Hy vọng bài viết sẽ phần nào có ích cho mọi người. Hẹn gặp lại mọi người ở bài viết sau nhé :wave:!

Link source code: https://github.com/namnv609/ror-simple-async-export-download

> Original post: https://namnv609.cf/posts/async-download-with-rails-and-sidekiq-status.html