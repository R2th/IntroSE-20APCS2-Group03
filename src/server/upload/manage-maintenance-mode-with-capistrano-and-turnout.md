Vì một số lý do khách quan như là khi chúng ta cần xử lý lượng dữ liệu lớn, backup dữ liệu, deploy, hay nâng cấp server,... Khi đó chúng ta cần chuyển web về chế độ maintenance. Khi đó điều quan trọng là làm sao để show cho người dùng biết được web chúng ta đang trong quá trình maintenance chứ không phải là web có vấn đề gì khác. Vì thế chúng ta cần phải show cho người dùng 1 giao diện trực quan nhất bao gồm các thông tin về quá trình bảo trì, thời gian từ bao giờ đến khi nào, bảo trì vì lý do gì (cái này không cần thiết lắm), hoặc là một dòng trạng thái báo đang trong quá trình xử lý dữ liệu,... Và điều này là tốt nhất khi nó có thể bật, tắt bất cứ lúc nào.

Để làm điều đó dưới đây chúng ta sẽ tìm hiểu một cách đơn giản (bài viết sử dụng nginx):
- Config nginx block
- Thêm capistrano task cho quá trình maintenance dễ dàng và có thể custom cho từng server

#### Config nginx block
Chúng ta sẽ config nginx, nếu có file `maintenance.txt` (hoặc bất kì tên nào, file nào mà bạn muốn, chỉ cần check nếu nó tồn tại thì chúng ta sẽ coi như đang ở chế độ maintenance) thì sẽ return về mã code `503`. Sau đó config mã code `503` thì return về file `maintenance.html` hoặc file nào đó mà chúng ta sẽ dùng để show ra khi thực hiện maintenance. Chúng ta sẽ thực hiện config trong block `server {}` như sau:
```
error_page 503 /maintenance.html;

location /maintenance.html {
    root /your_folder/maintenance;
}

location @unicorn {
    if ( -e /your_folder/maintenance/maintenance_all.txt ) {
      return 503;
    }
   ...
}
```
Như vậy chúng ta rất dễ dàng để open chế độ maintenance chỉ cần tạo ra file `maintenance_all.txt` và khi muốn tắt chúng ta chỉ việc remove nó đi.

Để đơn giản hóa vấn đề và có thể đẩy lên tất cả server mà không cần phải lên từng server tạo file, chúng ta sẽ add quá trình tạo file và remove bằng capistrano cũng tương tự như deploy vậy.

#### Capistrano config
Tạo namespace maintenance với các task `on` hoặc `off` chế độ maintenance, với task `on` chúng ta sẽ execute tạo file và ngược lại đối với task `off` chúng ta sẽ execute remove file đi.

```
namespace :maintenance do  
  desc "Show maintenance page"
  task :on do
    on roles(:app) do
      execute :touch, "/your_folder/maintenance/maintenance_all.txt"
    end
  end

  desc "End maintenance"
  task :off do
    on roles(:app) do
      execute :rm, "-f /your_folder/maintenance/maintenance_all.txt"
   end
  end
end
```
Quá trình on, off bây giờ rất đơn giản.
```
# On maintenance
 bundle exec cap #{env} maintenance:on --trace
 
# Off maintenance
bundle exec cap #{env} maintenance:off --trace
```
Khi bạn muốn nâng cấp server mà muốn trước khi release cho clients muốn test thử một chút, mà hiện tại muốn end chế độ maintenance thì bao gồm cả clients sẽ nhìn thấy, vậy làm sao để chúng ta có thể truy cập vào trang web bình thường trong khi đó clients sẽ không nhìn thấy. Dưới đây chúng ta sẽ làm điều đó bằng cách sử dụng gem [turnout](https://github.com/biola/turnout)
#### Config private maintenance
Đầu tiên chúng ta sẽ config `turnout` với file path trong đó sẽ config những `allowed_ips` mà chúng ta cho phép được access khi bật maintenance, config `page_path` nơi 

```
# config/initializers/turnout.rb

Turnout.configure do |config|
  config.named_maintenance_file_paths = {default: "#{your_path}/maintenance/maintenance.yml"}
  config.maintenance_pages_path = "#{your_path}/maintenance"
  config.default_maintenance_page = Turnout::MaintenancePage::HTML
end
```
Khi bạn dùng config như thế này, chỉ cần file `#{your_path}/maintenance/maintenance.yml` có tồn tại thì lập tức chế độ maintenance sẽ được bật trừ những `allowed_ips` config ra tất cả mọi người request từ một IP khác sẽ show ra chế độ maintenance. Và dưới đây chúng ta sẽ sử dụng chúng với capistrano đã viết bên trên.

**Ứng dụng với capistrano**
Chúng ta sẽ thêm task `:private` cho việc private access. Trong đó chúng ta sẽ upload file `maintenance.yml`, remove file `maintenance_all.txt` và khi `end` thì chúng ta sẽ remove hết những file đó đi:
```
namespace :maintenance do  
  desc "Show maintenance page"
  task :on do
    on roles(:app) do
      upload! "/your_path/maintenance.yml", "/your_folder/maintenance/maintenance.yml"
      execute :touch, "/your_folder/maintenance/maintenance_all.txt"
    end
  end

  task :private do
    on roles(:app) do
      upload! "/your_path/maintenance.yml", "/your_folder/maintenance/maintenance.yml"
      execute :rm, " -f /your_folder/tmp/maintenance/maintenance_all.txt"
    end
  end
​
  desc "End maintenance"
  task :off do
    on roles(:app) do
      execute :rm, "-f /your_folder/maintenance/maintenance.yml"
      execute :rm, "-f /your_folder/maintenance/maintenance_all.txt"
   end
  end
end
```
Muốn bật chết độ private view bạn chỉ cần:
```
bundle exec cap #{env} maintenance:private --trace
```

#### Tổng kết
Trên bạn đã học được cách bật chế độ maintenance bao gồm private và all, hy vọng sẽ giúp bạn quản lý chế độ maintenance tốt hơn.