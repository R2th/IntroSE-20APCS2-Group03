Xem log là một phần vô cùng quan trọng để hiểu được ứng dụng của bạn. Log lưu lại các hoạt động của hệ thống bao gồm truy vấn dữ liệu, request đến server, và lỗi. Với việc ghi log một cách thích hợp, bạn luôn có thông tin chuyên sâu, toàn diện về cách sử dụng và hiệu suất của ứng dụng trong từng ngữ cảnh. Trong bài viết này, chúng ta sẽ điểm qua các cách để ghi log của Rails và xem xem đâu là cách tốt nhất để ghi lại log. Bài viết này cũng sẽ chỉ cho bạn cách để tăng tính hữu dụng của log thông qua thư viện Lograge.

Lưu ý là những ví dụ trong bài viết này là cho Rails 5.2.0 trên nền tảng Linux. Nếu bạn dùng môi trường khác, bạn có thể phải thay đổi một chút cho thích hợp.
## Làm việc với các level của log
Ứng dụng Rails có 3 môi trường, cấu hình trong thư mục `config/environments/`: *development.rb*, *test.rb* và *production.rb*. Mỗi môi trường này lại sinh ra một file log riêng. Rails server mặc định chạy trên môi trường development, nên log cũng được tự động ghi vào file `development.log`.

Rails sử dụng 6 level khác nhau của log: *debug*, *info*, *warn*, *error*, *fatal*, và *unknown*. Mỗi level này định nghĩa những thông tin khác nhau của log:
* **Debug**: thông tin cụ thể cho developer và admin hệ thống, bao gồm các lệnh gọi database, hay là kiểm tra thuộc tính của đối tượng. Nó là level chi tiết nhất.
* **Info**: thông tin về hoạt động của ứng dụng giống như bắt đầu hay dừng service.
* **Warn**: những thao tác mà ứng dụng có thể dễ dàng khôi phục nhưng nên được giải quyết sớm, nó có thể bao gồm việc dùng gem đã hết hạn hoặc thử lại một thao tác.
* **Error**: lỗi khiến thao tác thất bại (ví dụ thiếu data hay file) nhưng nó chỉ lưu lại log exception và ứng dụng vẫn chạy tiếp
* **Fatal**: lỗi khiến ứng dụng bị crash và cần xử lý ngay lập tức để tránh mất dữ liệu.
* **Unknown**: những message không nằm trong các loại trên nhưng vẫn được ghi lại.

Level *debug* và *info* lưu lại hầu hết thông tin về các hoạt động của ứng dụng, trong khi những level cao hơn chỉ lưu cảnh báo hoặc lỗi. Level *debug* và *info* nghe định nghĩa có vẻ hơi giống nhau, mình sẽ đưa ra ví dụ để mọi người thấy được sự khác biệt của 2 level này. 

Mặc định ứng dụng Rails sẽ lưu lại level *debug* cho tất cả môi trường, bao gồm cả production. Một mục log *debug* có thể chứa nhiều thông tin: 
```
Started POST "/articles" for 127.0.0.1 at 2018-06-27 15:48:10 +0000
Processing by ArticlesController#create as HTML
  Parameters: {"utf8"=>"✓", "article"=>{"title"=>"Create New Post", "text"=>"Description for new post"}, "commit"=>"Save Article"}
  [1m[35m (0.2ms)[0m  [1m[35mBEGIN[0m
  ↳ app/controllers/articles_controller.rb:20
  [1m[36mArticle Create (1.0ms)[0m  [1m[32mINSERT INTO "articles" ("title", "text", "created_at", "updated_at") VALUES ($1, $2, $3, $4) RETURNING "id"[0m  [["title", "Create New Post"], ["text", "Description for new post"], ["created_at", "2018-06-27 15:48:11.116208"], ["updated_at", "2018-06-27 15:48:11.116208"]]
  ↳ app/controllers/articles_controller.rb:20
  [1m[35m (0.5ms)[0m  [1m[35mCOMMIT[0m
  ↳ app/controllers/articles_controller.rb:20
Redirected to http://localhost:3000/articles/29
Completed 302 Found in 25ms (ActiveRecord: 4.5ms)
```
Vì level này bao gồm các thông tin chi tiết liên quan tới ứng dụng, nó rất có ích trong môi trường development hay test. Tuy nhiên nó trở nên hơi dài dòng ở môi trường production. Bạn có thể điều chỉnh level cho bất kì môi trường nào bằng cách sửa file config của môi trường đấy:
```
# config/environments/development.rb
config.log_level = :info 
```
Level *info* chỉ đưa ra thông tin về các request, bỏ qua các thông tin chi tiết:
```
Started POST "/articles" for 10.0.2.2 at 2018-06-06 18:06:18 +0000
Cannot render console from 10.0.2.2! Allowed networks: 127.0.0.1, ::1, 127.0.0.0/127.255.255.255
Processing by ArticlesController#create as HTML
  Rendering articles/new.html.erb within layouts/application
  Rendered articles/new.html.erb within layouts/application (1.8ms)
Completed 200 OK in 146ms (Views: 140.7ms | ActiveRecord: 0.3ms)
```
### Diễn giải log
Cả hai ví dụ trên đều cho thấy thông tin để hiểu được hoạt động của ứng dụng:
* **Request và URL endpoint**: phương thức request HTTP (ví dụ GET, POST, hay PUT) gửi tới URL endpoint cụ thể.
* **Controller và action**: phương thức được gọi tới để hoàn thành request.
* **Template và partial**: các file cần thiết để sinh ra trang hiển thị cho URL endpoint.
* **Request status**: trạng thái HTTP trả về khi hoàn thành request và thời gian phản hồi.

Ở level *debug*, ngoài các dữ liệu trên còn bao gồm:
* **Parameters**: dữ liệu được truy xuất hoặc được gửi thông qua URL hoặc phương thức HTTP request
* **Database call**: truy vấn ActiveRecord được gọi để lấy data cần thiết cho request.

Trạng thái HTTP có các loại như thành công (2xx), chuyển hướng (3xx), lỗi client (4xx), lỗi server (5xx). Nếu bị lỗi client hoặc lỗi server, bạn có thể tìm thấy manh mối trong log để từ đó tìm ra nguyên nhân và giải quết:
```
Started GET "/articles/1" for 127.0.0.1 at 2018-06-27 15:42:44 +0000
Processing by ArticlesController#show as HTML
  Parameters: {"id"=>"1"}
Completed 500 Internal Server Error in 49ms (ActiveRecord: 0.0ms)
  
NameError (uninitialized constant ArticlesController::Article):
  
app/controllers/articles_controller.rb:7:in `show'
```
Ví dụ nếu bạn không tìm thấy trang mà request gọi đến, nó hiện lỗi:
```
No route matches [GET] "/sign_up"
```
Nó có nghĩa bạn đã đường dẫn này chưa được định nghĩa trong file `config/routes.rb`. 

Mặc dù ở dạng mặc định, Rails log đã cung cấp khá nhiều thông tin hữu ích, nhưng để thu thập thông tin tốt hơn, có có thể thêm một số thay đổi.
## Tinh chỉnh logs
Để cải thiện log mà ứng dụng sinh ra, bạn có thể tinh chỉnh lại nó với ActiveSupport::Logger class. Class này được built từ bản Rails 5.2 trở lên và cung cấp các phương thức làm việc với log. Chúng ta sẽ xem class này được sử dụng thế nào qua ví dụ truy xuất thông tin về một bài viết dưới đây:
```
def show
  @article = Article.find(params[:id])
end
```
Nếu bạn muốn in ra log các thuộc tính của bài viết được chọn, bạn có thể thêm vào phương thức này một dòng lệnh ghi lại log:
```
def show
  @article = Article.find(params[:id])
  logger.debug "Article Information: #{@article.attributes.inspect}"
end
```
Phương thức `inspect` của Ruby in ra tất cả các thuộc tính có liên quan đến đối tượng được chọn, bao gồm timestamps, ids, và giá trị các trường. Trong trường hợp này, khi bài viết được chọn, ứng dụng sẽ sinh ra một dòng log trong level *debug* tương tự như này:
```
Article Information: {"id"=>6, "title"=>"New Article", "text"=>"Creating a new article.", "created_at"=>Tue, 19 Jun 2018 14:46:48 UTC +00:00, "updated_at"=>Tue, 19 Jun 2018 14:46:48 UTC +00:00}
```
Lệnh `logger.debug` trong ví dụ trên là cách tốt nhất để biểu diễn thông tin trong log của bạn khi phát triển các tính năng. Lệnh `logger.warn` và `logger.error` có thể dùng để cảnh báo hoặc ném ra exception. Điều quan trọng nhất cần lưu ý là level log ở mỗi môi trường, nó quyết định thông tin gì sẽ được ghi lại trong log. Ứng dụng của bạn sẽ không thể ghi lại lệnh `logger.debug` như ví dụ trên, nếu môi trường đó được set level *warn*.

Trong ứng dụng nhỏ, Rail quản lý log rất tốt, vì vậy bạn có thể dễ dàng debug lỗi mà không cần đến thư viện bên ngoài. Nhưng khi ứng dụng của bạn phát triển hơn, bạn sẽ cần xem xét một cách tốt hơn để quản lý khối lượng lớn log nó sinh ra.
## Chuyển đổi log với Lograge
Ứng dụng production có thể sinh ra log cho nhiều quy trình vào cùng 1 thời điểm, trộn lẫn dữ liệu và khiến ta khó có thể phân tích được các thông tin từ log ấy. Bạn có thể quản lý cái đống phức tạp ấy bằng cách sử dụng thư viện để chuyển log thành một dạng dễ đọc và phân tích. Ví dụ như thư viện Lograge có thể dọn dẹp đống log và chuyển nó thành các định dạng khác, bao gồm cả JSON.
Để bắt đầu với Lograge, thêm `gem 'lograge'` và `gem 'lograge-sql'` và trong Gemfile và install nó:
```
bundle install
```
Gem `lograge-sql` là phần mở rộng của Lograge để thêm toàn bộ truy vấn database sinh ra trong level debug vào định dạng log JSON mới.

Bạn có thể dễ dàng enable và cấu hình thư viện bên thứ 3 với file initializer, và Rails sẽ tự động nhận nó khi chạy service. Rails load file initializer sau framework và gem. Tạo file **lograge.rb** trong thư mục config/initializers và thêm đoạn code sau:
```
#config/initializers/lograge.rb
require 'lograge/sql/extension'

Rails.application.configure do
    # Lograge config
    config.lograge.enabled = true
    config.lograge.formatter = Lograge::Formatters::Json.new
    config.colorize_logging = false

    config.lograge.custom_options = lambda do |event|
      { :params => event.payload[:params] }
  end
end
```
Đoạn code trên sẽ load thư viện **lograge-sql** và enable **Lograge** thay cho Rails log thông thường. Lograge hỗ trợ nhiều kiểu định dạng (tham khảo thêm tại: https://github.com/roidrage/lograge#installation), nhưng phổ biến nhất là JSON. Chúng ta disable colorized logging để nhìn đỡ bị rối. Bạn có thể thêm custom data vào Lograge log bằng cách sử dụng `custom_options` như ví dụ trên.

Khởi động lại server để load cấu hình Lograge và format log mới:
```
rails s
```
Giờ, thay vì nhìn thấy định dạng log thông thường:
```
Started GET "/articles" for 127.0.0.1 at 2018-06-19 14:46:53 +0000
Processing by ArticlesController#index as HTML
  Rendering articles/index.html.erb within layouts/application
  Article Load (0.4ms) SELECT "articles".* FROM "articles"
  ↳ app/views/articles/index.html.erb:11
  Rendered articles/index.html.erb within layouts/application (2.8ms)
Completed 200 OK in 150ms (Views: 119.9ms | ActiveRecord: 0.4ms)
```
Bạn sẽ nhìn thấy định dạng JSON, có nhiều cấu trúc hơn:
```
{
"method":"GET",
"path":"/articles/",
"format":"html",
"controller":"ArticlesController",
"action":"index",
"status":200,
"duration":150,
"view":119.9,
"db":.4,
"params":{
   "controller":"articles",
   "action":"index"
},
"sql_queries":"'Article Load (0.47) SELECT \"articles\".* FROM \"articles\"'"
}
```
Nếu bạn muốn giữ lại log cũ và ghi định dạng log JSON mới sang file mới, bạn có thể thêm vào file initializer `lograge.rb`:
```
config.lograge.keep_original_rails_log = true
config.lograge.logger = ActiveSupport::Logger.new "#{Rails.root}/log/lograge_#{Rails.env}.log"
```
### Setting log levels
Còn một điều nữa cần lưu ý là cách Lograge set level log. Lograge set mặc định tất cả log là level *info*, vì vậy ngay cả khi ứng dụng của bạn lưu lại log lỗi, Lograge vẫn có thể chuyển nó thành *info*. Bạn có thể sửa và cấú hình riêng level log bằng cách thêm vào file **application_controller.rb**:
```
# controllers/application_controller.rb
def append_info_to_payload(payload)
      super
     case 
        when payload[:status] == 200
          payload[:level] = "INFO"
        when payload[:status] == 302
          payload[:level] = "WARN"
        else
          payload[:level] = "ERROR"
        end
end
```
Nó set level log dựa vào status, ghi đè lên level log mặc định, giờ bạn có thể thêm biến `level` vào `custom_options` trong file initializer **lograge.rb**:
```
#config/initializers/lograge.rb
[...]
    config.lograge.custom_options = lambda do |event|
      { :params => event.payload[:params],
        :level => event.payload[:level],
      }
    end
```
Log của bạn giờ sẽ bao gồm cả thuộc tính *level* với giá trị được set dựa trên trạng thái HTTP:
```
{  
  [...]
   "status": 200,
   "level":"INFO"
}
```
Với Rails và Lograge, bạn có rất nhiều cách linh hoạt để tạo và biến nó thành format mà bạn cần. Hy vọng bài viết sẽ có ích với bạn. Cảm ơn đã theo dõi! 

Nguồn: https://www.datadoghq.com/blog/managing-rails-application-logs