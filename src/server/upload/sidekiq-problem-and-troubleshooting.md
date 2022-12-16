Như mọi người đã biết thì gem được sử dụng rất nhiều trong ruby, nó là một thư viện như bao ngôn ngữ khác mà thôi. Tuy nhiên, mỗi thư viện hay mỗi gem đều có problem và điều quan trọng là chúng ta sẽ xử lý nó như thế nào. Vậy nên ở bài viết này mình sẽ chia sẻ với các bạn một trong số nhưng gem hay dùng nhất trong một dự án Ruby đó chính là [`Sidekiq`](https://github.com/mperham/sidekiq)  . 
### Giới thiệu Sidekiq
Sidekiq là gem dùng để thực hiện công việc chạy ngầm, ví dụ như bạn gửi 1000 email mà phải đợi nó gửi từng cái một thì ...(haiz) vừa lâu, vừa mất thời gian đợi, trong khi đó khi sử dụng sidekiq thì chúng ta gửi 1000 mail trong job và không hề ảnh hưởng đến công việc tiếp theo mình làm...

Sidekiq cũng sử dụng multi thread để thực hiện đa luồng, nhiều công việc hỗ trợ chúng ta rất nhiều trong việc xử lý về performance\n
Và một vài thông tin khác thì mọi người có thể tham khảo ở wiki hay là docs của gem  [`Sidekiq`](https://github.com/mperham/sidekiq)  . 
### Problem and Troubleshooting

**Cannot find ModelName with id=23523623** 

Nếu chúng ta đảm bảo về mặt dữ liệu thì không sao,. Tuy nhiên nếu như xảy ra trường hợp như trên trong sidekiq thì nó sẽ try job liên tục cho record không tìm thấy này. Giải phảp ở đây chính là `after_commit`:
```ruby
class User < ActiveRecord::Base
  after_commit :greet, on: :create

  def greet
    UserMailer.delay.send_welcome_email(self.id)
  end
end
```
Note: after_commit sẽ không được gọi trong test của bạn khi đã bật `use_transactional_fixtures`, nhưng [test_after_commit](https://github.com/grosser/test_after_commit) đã được viết để trợ giúp trong trường hợp này.
Nếu như không sử dụng ActiveRecord model thì bạn nên sử dụng perform để chạy sau khi commit success:
```ruby
YourWorker.perform_in(5.seconds, 1, 2, 3)
```
Dù cho cách nào thì cơ chế retry của sidekiq sinh ra lỗi RecordNotFound lần đầu nhưng lần sau sẽ success.

**Autoloading**

Autoloading và eager loading là một nguyên nhân thường gặp nhất, và nên nhớ rằng tất cả Sidekiq đều là do Rails boot. Nếu bjan gặp một vấn để, và đó là giữa code và Rails mà Rails quy ước về cấu hình. Nếu bjan follow code theo convention khi đặt tên các class, thì code của bạn sẽ chạy OK. 
Some tip:

  * Không config thêm path trong autoload_paths hoặc eager_Load_path. và hãy follow theo convention. Bất kỳ folder nào nằm trong `app/` có thể chức code ruby, nên bạn không cần config bất cứ thứ gì.
   * Hãy move code đến `app/lib/` từ `Lib/` và chắc chắn rằng code theo follow class/filename convention. 
    
  
**Heroku "ERR max number of clients reached"**

Đó chính là khi bạn đã đạt maxping số lượng kết nối redis tối đa theo plan của bạn.
Giới hạn về số lượng kết nối redis mỗi process nằm ở trọng config/sidekiq.yml. Ví dụ. nếu bạn đang dùng gói Nano và muốn sử dụng web client thì bạn phải đặt concurrency về 3
```ruby
concurrency:  3
```

**Sidekiq Web is not reachable, và rails sẽ returns ActionController::RoutingError**

Nếu bạn đang sử dụng Rails 3.1, 3.2 cũng với asset_pipeline thì hayx thử thêm đoạn sau vào file config.ru thay vì chỉ định routes trong routes.rb
```ruby
require 'sidekiq/web'

run Rack::URLMap.new(
    "/" => Rails.application,
    "/sidekiq" => Sidekiq::Web
)
```
Nếu bạn dùng NGINX thì hãy bỏ comment dòng sau:
```ruby
config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect'
```
và comment
```ruby
# config.action_dispatch.x_sendfile_header = "X-Sendfile"
```
**The threads are not processing jobs**

Nếu như bạn đang migrate từ Resque thì bạn hãy đảm bảo rằng redis của bạn không chứa một task cũ nào. Bạn hoàn toàn có thể xóa tất cả các key và value trong tất cả các database với redis-cli flushall. Một vấn đề phổ biến khác là bạn có thể đã định nghĩa một namespace trong `Sidekiq.configure_server` nhưng không phải trong `Sidekiq.configure_client` hoặc  cái gì khác. Và hãy chắc chắn là đã config cả 2 rồi nhé. ^^

Một vấn đề khác mà một số người gặp phải là do `rspec-sidekiq` gây ra. Bạn cần đảm bảo rằng rspec-sidekiq nằm trong `group test`:
```ruby
group :test do
  gem 'rspec-sidekiq'
end
```
Related stackoverflow:  http://stackoverflow.com/a/17065723/1965817

**Sidekiq process bị crash?**


Only two things can cause a Ruby VM to crash: a VM bug or a native gem bug. Sidekiq is pure Ruby and cannot crash the Ruby VM on its own. A couple of notes:

Ruby can have a bug - make sure you are running the latest Ruby version
native gem bugs can cause crashes - make sure you are running the latest version of all native gems so you have the latest fixes
every time the Sidekiq process crashes, any messages being processed are lost. You can avoid this with Sidekiq Pro's reliable fetch feature.
You can get a list of all native gems in your app with this command:

bundle exec ruby -e 'puts Gem.loaded_specs.values.select{ |i| !i.extensions.empty? }.map{ |i| i.name }'

Chỉ có hai thứ có thể khiến máy ảo của Ruby gặp sự cố: lỗi máy ảo hoặc lỗi do gem. Sidekiq là Ruby gem thuần túy và không thể tự mình phá vỡ Ruby VM(Visual Machine).

*Một vài lưu ý:*

* Ruby có thể có lỗi và hãy đảm bảo bạn đang chạy phiên bản Ruby mới nhất
* Gem có thể sinh ra crash - hãy đảm bảo rằng mọi phiên bản gem đang dùng là mới nhất để cập nhật những bản vá lỗi kịp thời
* Mọi người lấy hết danh sách gem ở local đang dùng theo câu lệnh sau:
```ruby
bundle exec ruby -e 'puts Gem.loaded_specs.values.select{ |i| !i.extensions.empty? }.map{ |i| i.name }'
```

### SUMMARY

Trên đây là một vài problem và troubleshooting của sidekiq mà mình tìm hiểu và sưu tầm được, hi vọng là mọi người hiểu được phần nào bài viết.

Để biết rõ hơn về bài viết xin mời mọi người tham khảo bài viết tại [Problem and Troubleshooting](https://github.com/mperham/sidekiq/wiki/Problems-and-Troubleshooting)

Xin cảm ơn mọi người đã đọc bài viết của mình!