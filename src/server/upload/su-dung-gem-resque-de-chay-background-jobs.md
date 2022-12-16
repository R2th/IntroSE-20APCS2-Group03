Khi phát triển dự án, chắc hẳn các bạn cũng đã quen thuộc với khái niệm background jobs để xử lý ngầm nhiều tác vụ khác nhau mà không làm ảnh hưởng đến trải nghiệm của người dùng. Trong bài viết này mình xin giới thiệu với các bạn gem **Resque** (đừng nhầm với rescue nhé :D)

- Link github 
https://github.com/resque/resque

![](https://images.viblo.asia/8192b3d6-b28c-4286-ad4e-f6571e2de08e.png)

### Cài đặt
Cũng giống như **Sidekiq**, để sử dụng **Resque** thì trước tiên ta phải cài đặt **Redis**. Nếu bạn đang sử dụng MacOS nên có thể cài đặt bằng `brew` như sau:
```
brew install redis
```
Bạn có thể khởi động redis thủ công bằng lệnh `redis-server`.
Cài đặt **Resque** thì cũng rất đơn giản bằng cách thêm `gem 'resque'` vào Gemfile và tiến hành bundle.

### Tạo job
Tạo thư mục `app/jobs` để chứa các file job, ví dụ với file `sleeper.rb` để cho hệ thống ngủ trong một khoảng thời gian là tham số truyền vào, như sau:

```ruby
class Sleeper
  @queue = :sleep

  def self.perform(seconds)
    sleep(seconds)
  end
end
```
Resque có thể duy trì nhiều hàng đợi cho các loại công việc khác nhau. Bằng cách thiết lập biến instance `@queue`, worker này sẽ chỉ tìm kiếm các công việc trên hàng đợi `sleep` mà thôi.

### Hàng đợi job
Đưa job vào hàng đợi như này `Resque.enqueue(Sleeper, 5)`
Các tham số sẽ được tuần tự hóa dưới dạng JSON và được nối vào hàng đợi Redis được chỉ định trong job. Sau khi gọi như trên, job sẽ được thêm vào hàng đợi `sleep` với JSON sau:
```
{
  'class': 'Sleeper',
  'args': [ 5 ]
}
```
Khi một job được tạo ra, nó sẽ được thêm vào danh sách cấu trúc dữ liệu trong Redis. Một worker Resque sau đó sẽ xử lý công việc.

### Monitoring 
**Resque** cung cấp một ứng dụng Sinatra giống như giao diện web để theo dõi trạng thái của queues, workers và xem các số liệu thống kê khác

Ứng dụng này mặc định không được load nên bạn sẽ phải thêm việc load này vào file `config/routes.rb` như sau:
```
require 'resque/server'

MyApp::Application.routes.draw do
  mount Resque::Server.new, at: '/resque'
end
```
Khởi động lại server và mở link `http://localhost:3000/resque` để xem kết quả nhé.

![](https://images.viblo.asia/27590b6a-da59-47ca-bbb7-072fcc22fbd8.png)https://images.viblo.asia/27590b6a-da59-47ca-bbb7-072fcc22fbd8.png
Có thể thấy màn hình được chia ra làm một số tab như:
- Overview: hiển thị danh sách các hàng đợi và các worker đang làm việc.
- Failed: hiển thị danh sách các job chạy không thành công và một số thông tin chi tiết về job đó.
- Workers: hiển thị danh sách các worker và trạng thái của nó.
- Stats: hiển thị số liệu thống kê tổng thể của phiên bản Resque cũng như danh sách tất cả các key trong Redis

### Khởi động worker
Resque cung cấp rake task để khởi chạy một hoặc nhiều worker. Thêm `require 'resque/tasks'` vào đầu file `Rakefile`, sau đó bạn sẽ thấy chúng được thêm vào task khả dụng.
```
bundle exec rake -T resque
```
Bạn có thể chỉ định cụ thể hơn cho task với các biến môi trường như:
- `QUEUE` hàng đợi nào sẽ được theo dõi.
- `COUNT` xác đinh số lượng worker (chỉ sử dụng với `resque:workers`).
Bây giờ bạn khởi chạy một worker bằng lệnh như sau:
```
bundle exec rake environment resque:work QUEUE=sleep
```
Khi rake task bắt đầu, nó sẽ bắt đầu xử lý công việc từ hàng đợi.
Nếu bạn đang ở trong tình huống mà worker không cần quyền truy cập vào ứng dụng Rails, bạn nên bỏ qua `environment` và bạn sẽ tiết kiệm được rất nhiều bộ nhớ, thời gian khởi động.

### Định dạng log
Nếu bạn muốn thay đổi định dạng log của Resque, hãy tạo file `config/initializers/resque.rb`, mặc định thì sẽ định dạng `QuietFormatter`, tuy nhiên nếu muốn log ra đầy đủ hơn thì bạn có thể config như sau:
```ruby
Resque.logger.formatter = Resque::VerboseFormatter.new
```
Với `VerboseFormatter`, log sẽ như này:
```
$ bundle exec rake environment resque:work QUEUE=sleep
*** Checking sleep
*** Found job on sleep
*** got: (Job{sleep} | Sleeper | [5])
*** resque-1.25.1: Processing sleep since 1386736305 [Sleeper]
*** Running before_fork hooks with [(Job{sleep} | Sleeper | [5])]
*** resque-1.25.1: Forked 13978 at 1386736305
*** Running after_fork hooks with [(Job{sleep} | Sleeper | [5])]
*** done: (Job{sleep} | Sleeper | [5])
```

Đầy đủ hơn nữa thì dùng `VeryVerboseFormatter`, log sẽ như này:
```
$ bundle exec rake environment resque:work QUEUE=sleep
** [21:35:54 2013-12-10] 14071: Checking sleep
** [21:35:54 2013-12-10] 14071: Found job on sleep
** [21:35:54 2013-12-10] 14071: got: (Job{sleep} | Sleeper | [5])
** [21:35:54 2013-12-10] 14071: resque-1.25.1: Processing sleep since 1386736554 [Sleeper]
** [21:35:54 2013-12-10] 14071: Running before_fork hooks with [(Job{sleep} | Sleeper | [5])]
** [21:35:54 2013-12-10] 14071: resque-1.25.1: Forked 14101 at 1386736554
** [21:35:54 2013-12-10] 14101: Running after_fork hooks with [(Job{sleep} | Sleeper | [5])]
** [21:35:59 2013-12-10] 14101: done: (Job{sleep} | Sleeper | [5])
```
Nếu muốn xem lại đầy đủ toàn bộ log, bạn có thể xuất log ra file như này:
```ruby
Resque.logger = MonoLogger.new(File.open("#{Rails.root}/log/resque.log", "w+"))
Resque.logger.formatter = Resque::QuietFormatter.new
```

### Tính toán việc sắp xếp hàng đợi
Đây là một demo có sẵn của chính tác giả của Resque, bạn vào link [blogger_advanced](https://github.com/JumpstartLab/blogger_advanced#getting-started) thực hiện theo hướng dẫn, xong xuôi thì bật server lên và vào trang root - `DashboardController#show` để minh họa cho lợi ích của job.

Cùng xem qua code cho method này:
```ruby
class DashboardController < ApplicationController
  def show
    @articles             = Article.for_dashboard
    @article_count        = Article.count
    @article_word_count   = Article.total_word_count
    @most_popular_article = Article.most_popular

    @comments           = Comment.for_dashboard
    @comment_count      = Comment.count
    @comment_word_count = Comment.total_word_count
  end
end
```
Ứng dụng này theo dõi tổng số từ cho tất cả các bài viết và tất cả comment trên dashboard. Hiện tại, nó sẽ tính toán lại các giá trị này cho mỗi yêu cầu của trang.
Method `total_word_count` của model `Article` và `Comment` như sau:
```ruby
  def self.total_word_count
    all.inject(0) {|total, a| total += a.word_count }
  end
```
Cứ mỗi lần vào trang dashboard là phải chạy lại method trên tính toán, sẽ rất mất thời gian và tốn tài nguyên. Đây là lúc sử dụng **Resque**. 

### Job
Trước khi viết lớp custom job, ta phải làm cho Resque rake task sẵn sàng để có thể chạy worker mới viết sau đó. Tạo file `lib/tasks/resque.rake` và thêm dòng `require 'resque/tasks'` vào. Sau đó chạy lệnh `bundle exec rake -T` nên bao gồm danh sách 2 tác vụ lệ quan đến Resque.
Tạo thư mục mới `app/jobs` và tạo file `comment_total_word_count.rb` bên trong như này:
```ruby
class CommentTotalWordCount
  @queue = :total_word_count

  def self.perform
    Comment.total_word_count
  end
end
```
Như vậy là ta đã di chuyển phần đếm số từ của `Comment` vào trong job. Tuy nhiên lại chưa lưu trữ kết quả của phép tính ở bất kỳ đâu mà yêu cầu có thể truy xuất nó. Đây là lúc ta cần đến Redis. Khi cài gem `resque` thì nó cũng đã tích hợp sẵn gem `redis` cho ứng dụng của bạn rồi. Tuy nhiên vẫn cần mang endpoint Redis vào ứng dụng để có thể dễ dàng truy cập vào bộ nhớ lưu trữ. Tạo file `config/initializers/redis.rb` như sau:
```ruby
class DataCache
  def self.data
    @data ||= Redis.new(host: 'localhost', port: 6379)
  end

  def self.set(key, value)
    data.set(key, value)
  end

  def self.get(key)
    data.get(key)
  end

  def self.get_i(key)
    data.get(key).to_i
  end
end
```
Sửa lại job `CommentTotalWordCount` một chút như này:
```ruby
class CommentTotalWordCount
  @queue = :total_word_count

  def self.perform
    DataCache.set 'comment_total_word_count', Comment.total_word_count
  end
end
```
Giờ bạn có thể chạy worker bằng cách chạy ` bundle exec rake environment resque:work QUEUE=total_word_count`, như thế là việc đếm số từ của comment đã được chuyển vào background job. Hãy gọi đến job từ trong controller bằng `enqueue` như sau:
```ruby
class CommentsController < ApplicationController
  def create
    article = Article.find(params[:comment][:article_id])
    comment = article.comments.create(params[:comment])

    Resque.enqueue(CommentTotalWordCount)

    flash[:notice] = "Your comment was added."
    redirect_to article_path(article)
  end
end
```
Ta đã lưu lại tổng số từ tại thời điểm mỗi comment mới được tạo ra để truy xuất về sau. Hãy gọi đến để sử dụng trong màn hình dashboard:
```ruby
class DashboardController < ApplicationController
  def show
    @articles = Article.for_dashboard
    @article_count = Article.count
    @article_word_count = Article.total_word_count
    @most_popular_article = Article.most_popular

    @comments = Comment.for_dashboard
    @comment_count = Comment.count
    @comment_word_count = DataCache.get_i('comment_total_word_count')
  end
end
```

Bạn cũng có thể refactor lại code một chút, đẩy phần tính toán và gọi đến `DataCache` vào trong model để code ở controller và worker gọn gàng hơn:
```ruby
class Comment

  # ...

  def self.update_statistics
    calculate_total_word_count
  end

  def self.calculate_total_word_count
    total = all.inject(0) {|total, a| total += a.word_count }
    DataCache.set 'comment/total_word_count', total
  end

  def self.total_word_count
    DataCache.get_i('comment/total_word_count')
  end
end
```
### Kết
Trên đây là những kiến thức cơ bản nhất về Resque, hi vọng nó sẽ có ích với các bạn đang làm quen với gem này. Mình sẽ có thêm bài viết về cách sử dụng nâng cao hơn về Resque.
Cám ơn bạn đã theo dõi bài viết này.

***
### Tham khảo
- http://tutorials.jumpstartlab.com/topics/performance/background_jobs.html