# Mở đầu 

Việc deploy ứng dụng rails lên môi trường production thường không phải việc dễ dàng gì. Đôi khi bạn sẽ gặp phải rất nhiều bài toán cần phải giải quyết trên môi trường production như vấn đề về hiệu năng, số lượng người dùng, server down time, ... Qua nhiều lần làm việc với rails, tác giả bài viết đã đúc kết ra được nhiều kinh nghiệm và tổng hợp lại một số tips dùng cho việc chạy ứng dụng rails trên production, vừa là để nâng cao hiệu năng, giảm thiểu lỗi, cũng như giúp cho ứng dụng của bạn dễ dàng quản lý, duy trì sau này hơn.

## Dependencies
Khi thiết kế một ứng dụng rails bạn sẽ phải cần có thêm một số dependencies đi kèm để có thể cài đặt được các công cụ mà rails sử dụng, như git và development tools (như build-essential nếu dùng apt)

NodeJS - Sử dụng cho việc compile assets của ứng dụng (JS và CSS). Bạn có thể có hai lựa chọn cho việc complile assets - Một là kết hợp nodejs + execjs, hai là therubyracer + libv8. Nếu sử dụng libv8 thì nó sẽ download và compile toàn bộ V8 engine (chromium/nodejs javascript) trong lúc chạy bundle install, khiến cho thời gian bundle gem rất là lâu và tốn tài nguyên. Trong khi đó, node chỉ download những binaries đã compile sẵn mà không cần thực hiện compile nên sẽ nhanh hơn rất nhiều.

XML, XSLT, Zlib, OpenSSL development headers - những công cụ này giúp bạn giảm thiểu những khó khăn gặp phải khi lỗi cài đặt gem, điển hình là những gem lỗi cài đặt do thiếu dependencies như nokogiri, puma, mysql,... Ngoài ra thì nokogiri đã update nên sẽ compile XML/XSLT mỗi khi version không chính xác.

## Cài đặt ruby
Nếu như bạn sử dụng hệ thống trên nền Debian, Ubuntu thì nên sử dụng BrightBox's Ruby Packages.. Package đã được precompile, khá ổn định và thường xuyên cập nhập, fixbug. Không nhất thiết phải sử dụng RVM hay rbenv. Hai công cụ quản lý phiên bản cho ruby này đều đem lại một số điểm không cần thiết trên môi trường production: Phải khởi tạo shell trước (ở cả RVM và rbenv), khởi tạo login shell, override một số function cơ bản và, tự động cài thư viện,... Những điều trên rất có lợi cho môi trường development, nhưng khi deploy lên production thì nên sử dụng những package mà hệ thống đã quản lý sẵn thì tốt hơn. Vì thế chỉ nên sử dụng rvm và rbenv khi hệ thống không thể sử dụng sẵn các package của hệ thống

## Phân chia user và group
Tách biệt user và group cho app của bạn. Có thể disable toàn bộ user, không password và không có thêm group khác, sử dụng /bin/false làm shell.

Tạo một folder có dạng *home* để dễ tìm kiếm và để folder app trong đó (/home/app). Đây sẽ là nơi lưu trữ toàn bộ code và assets của bạn. Trên thực tế, bạn có thể đặt folder app/ trong những chỗ khác như /var, /srv, /opt hay /usr/local, miễn là không đặt trong một subfolder của user nào. Bởi vì app của bạn không chỉ là những file có chứa những dòng code, mà còn bao gồm rất nhiều thức khác nữa. Chẳng hạn như SSH configs, các cặp khóa private-public, file chứa biến môi trường, cron jobs, background workers,... Nếu như phân chia cấu trúc thư mục theo từng user/group, bạn sẽ phải reset folder permission tất cả các lần mà bạn không chạy sudo cho username đã sudo (hoặc tắt terminal). Vì thế để có lợi cho sau này thì nên tạo một user/group cho 1 app và đưa app vào một trong folder.

## Checkout the repository

Khi checkout sang branch khác để làm việc, bạn nên tạo ra riêng một folder bên trong folder root để theo dõi sự thay đổi của các files trong folder đó. Cụ thể, nếu như rails root của bạn nằm là /home/app thì nên có một subfolder /home/app/repo để sử dụng cho việc chuyển đổi branch.  Các SSH keys cần thiết cho các tác vụ liên quan đến git (như clone repo, fetch, push) sẽ nằm trong /home/app/.ssh

Một số công cụ như Capistrano cũng giúp bạn tạo ra các folder khác nhau cho mỗi phiên bản release của app, khi chuyển version thì cũng sẽ chuyển đường dẫn đến các folder đó. Với sự hỗ trợ của chúng thì bạn có thể dùng thay cho lệnh "git checkout" hay dùng.

## Bundle Install
Các gem của ruby mặc định sẽ tự động tạo ra documentation (RI và RDOC). Điều này tốn rất nhiều thời gian trong lúc bundle và bạn có thể disable chúng trong môi trường development lẫn production bằng cách tạo một file như sau: 
```
# /etc/gemrc
gem: --no-ri --no-rdoc
```
Sau đó, tạo ra folder: /home/app/gems và symlink /home/app/repo/vendor/bundle tới /home/app/gem 
Folder repo có thể bị xóa đi sau mỗi lần release, nhưng sử dụng symlink thì một khi gem đã cài đặt thì sẽ không phải download lại lần nữa khi có release.
Ngoài ra  nên chạy lệnh bundler với các option ít nhất là như sau đây: `bundle install --deployment --cleann --without development test`

## Persistent Folders

Tất cả các folder/file mà app của bạn cần đều phải được tạo ra, copy vào và thao tác bên trong **home/app/repo**. Code bên trong ứng dụng của bạn không nên tác động trực tiếp tới các files, folder khác bên ngoài đường dẫn này. Vì vậy nếu bạn đang config một cỗ nào đó có sử dụng đường dẫn nằm ngoài phạm vi này thì bạn nên copy nó vào bên trong và sử dụng.

Ví dụ như đối với Paperclip, bạn sẽ tạo folder `/home/app/uploads` và symlink tới `/home/app/repo/public/uploads`. Bằng cách này, ứng dụng của bạn sẽ đọc và ghi file thẳng vào `public/uploads` khi deploy, nhưng toàn bộ files thật sẽ tách biệt khỏi app và không bị ảnh hưởng khi có trục trặc gì xảy ra. 

## Configuration vs. Environment 

Rails có nhiều môi trường khác nhau , có nhiều dự án
Ví dụ, bạn có những môi trường như development, QA, staging, UAT và production,.... Nhưng không nên tạo ra 5 môi trường khacsn hau cho mỗi trường hợp này. 

**Environment:** Mỗi environment tượng trưng cho một chế độ runtime riêng, hoặc một cách hoạt động riêng. Ví dụ như cache_classes, serve_static_files, threadsafe, và trên môi trường production thì sẽ enable tính năng cache

**Configuration:** Còn configuration là các giá trị settings cho mỗi trường hợp sử dụng. Cách họat động sẽ giống nhau nhưng database, cache khác nhau thì sẽ có configuration khác nhau. 

Như vậy, ứng dụng của bạn chạy ở chế độ Production, với Configuration cho trường hợp QA/UAT/Production. Bạn nên phân định rõ ràng giữa hai khái niệm này. Có thể thay đổi file config tùy biến cho từng case sử dụng, còn môi trường chạy thì vẫn là production cho các trường hợp QA/UAT/Production kia. Cả 3 trường hợp đều chạy server với điều kiện **RAILS_ENV=production**. Nói tóm lại, một app chỉ nên sử dụng 3 môi trường là **development, test** và **production**

Ví dụ như khi sử dụng SendGrid/Mandrill để gửi email, bạn không muốn những mail thật từ người dùng gửi dến các tài khoản mail trong môi trường QA và UAT, thì một cách giải quyết là tạo ra những dummy account môi trường này và thực hiện test gửi mail vào những account đó sau khi đã thêm một chút config để mail được gửi đến các account này. Như vậy là đã có thể đáp ứng được việc chạy trên môi trường production **RAILS_ENV=production** mà vẫn có dữ liệu, code để cho QA và khách hàng test. 

Trong một số trường hợp, logic của việc gửi mail trên môi trường QA/UAT khác với production thì bạn nên tạo ra một hoặc nhiều dummy/stub server để sử dụng cho từng trường hợp. Bởi vì để nắm rõ được tương tác (behavior) của ứng dụng production khi người dùng cuối sử dụng thì tốt nhất QA/UAT cũng phải được test thử trên môi trường và cấu hình tương tự.

## Configuration 

Tiếp theo chúng ta sẽ đi sâu vào việc sử dụng config file. Chẳng hạn bạn có những giá trị cần config khác nhau cho mỗi server QA/UAT/prodcution (Kết nối tới database nào, URL ngoài ứng dụng, settings cho email,...), và các server này đều chạy trên nền production. Khi đó ban nên đưa mỗi giá trị đó vào ứng dụng bằng cách gán biến cho chúng:
- **BAD:** Chỉ tạo ra một file .yml với toàn bộ key/value cho các loại servers khác nhau 
- **GOOD:** Tạo yml files load config từ các biến môi trường, và một file biến môi trường riêng cho 
``` 
# BAD: 
qa: 
  database_url: ...
  google_client_id: ...
uat: 
  database_url: ...
  google_client_id:
production: database_url
  database_url: ...
  google_client_id: ...
  
# GOOD: 
  
  production:
    database_url: <%= ENV['MYAPP_DATABASE_URL'] %>
    google_id: <%= ENV['MYAPP_GOOGLE_ID'] %>
    google_secret: <%= ENV['MYAPP_GOOGLE_SECRET'] %>
# qa.env
  MYAPP_DATABASE_URL: postgres://...
  ...
# uat.env:
  MYAPP_DATABASE_URL: postgres://...
  ...
  
# Trong lúc deploy, copy file qa.env hoặc uat.env thành .env
```
Nói chung, nên sử dụng các file dotenv (.env). Hầu hết các dự án hiện tại đều sử dụng cách này. Vì đơn giản file này chỉ là nơi lưu trữ các biến môi trường, setting config. Bạn có thể load env trong Bash shells và profiles, hay cung cấp env cho docker để sử dụng.

## Một số config cần thiết 

Bạn nên đưa các config sau đây vào tỏng .env của mình: 

- **RAILS_ENV** (hoặc **RACK_ENV**)
-  **PORT**: Chỉ định cổng mà server của bạn sử dụng 
-  **TIMEZONE**: Timezone của server đó.  Bạn có thể định nghĩa cho ứng dụng rails **config.time_zone** và set bằng với giá trị này. Toàn bộ trường date/time trong database nên có giá trị đi kèm với timezone, và lưu trữ ở dạng UTC. Nếu không bạn sẽ rất đau đầu khi phải xử lý những trường hợp liên quan đến người dùng đến từ khắp nơi trên thế giới.
- Các biến môi trường khác thì bạn nên thêm tiền tố "APP_" phía trước, biểu thị chúng chỉ được sử dụng cho ứng dụng này và không bị trùng tên với biến môi trường của hệ thống.

## App server 

Một số người sử dụng Nginx cùng với passenger, nhưng tại sao lại phải cài dặt một service riêng như vậy? Tùy vào yêu cầu hệ thống của bạn, bạn có thể tích hợp nginx hoặc không. Không nên lấy nginx làm phần cốt lõi cho ứng dụng của bạn mà chỉ sử dụng nó như một proxy phụ trợ. Phải hiểu rằng nginx chỉ là một reverse proxy hỗ trợ cho ứng dụng của bạn 

## Logging

Logs là thứ lưu lại lịch sử hoạt động ứng dụng của bạn, và bạn nên log lại toàn bộ requeat chả app, cũng như các request tương tác với các service bên ngoài, đảm bảo rằng không bỏ sót bất cứ loại log nào. Ví dụ như:

```
begin
  # Thực hiện thao tác gì đó
  render :ok
rescue => e
  render 'some failure page'
  # Không nên bỏ qua exception mà hãy dùng logger.error
end
```

Tuy nhiên có một vấn đề là khi có nhiều workers hay thread cùng hoạt động thì logs của các thành phần sẽ bị lẫn lộn với nhau. Vì thế hãy đảm bảo rằng tất cả các request có một ID riêng biệt


Ngoài ra, khi xuất log thì bạn nên sử dụng lệnh **Rails.logger.info** thay vì sử dụng **puts** của ruby

```
# BAD:
puts "my log"
# GOOD:
Rails.logger.info "my log" 
```

Sau khi đã config hoàn chỉnh cho logging, bạn có thể view logs theo nhiều cách khác nhau để theo dõi một vấn đề nào đó của ứng dụng. Chẳng hạn như có thể filter một số request tới một endpoint cụ thể nhằm debug cho endpoint đó, hay filter chỉ hiển thị những request có tác động đến database. Nói chung, bạn nên tận dụng tốt khả năng mạnh mẽ của rails log.

 # Kết luân
 
 Trên đây là một số kinh nghiệm tác giả đã đúc kết được trong quá trình đẩy dự án rails lên production trong nhiều năm. Áp dụng những phương pháp trên, bạn có thể đưa vào sử dụng cho nhiều trường hợp khác nhau, với nhiều use case và yêu cầu khác nhau mà vẫn đảm bảo các practices cần thiết khi deploy. 

Bài viết đến đây là kết thúc, cảm ơn các bạn đã theo dõi! 

Nguồn: https://medium.com/@rdsubhas/ruby-in-production-lessons-learned-36d7ab726d99