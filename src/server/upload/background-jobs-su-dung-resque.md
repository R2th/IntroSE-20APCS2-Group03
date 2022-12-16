# Giới thiệu
* Khi xây dựng trang web, điều quan trọng là giảm thời gian phản hồi của bạn. Các yêu cầu chạy dài hạn chế tài nguyên máy chủ, làm giảm nhận thức của người dùng về trang web của bạn và khó quản lý các lỗi.
* Có một giải pháp cho điều này: trả lại một phản hồi thành công, sau đó lên lịch một số tính toán sẽ diễn ra sau đó, ngoài chu kỳ yêu cầu / phản hồi ban đầu.
## Bạn có cần một job queue?
* Làm thế nào để bạn xác định các vùng của ứng dụng có thể được hưởng lợi từ background job? Một số vùng chung phổ biến cho công việc không đồng bộ:
    * Xử lý dữ liệu - ví dụ: tạo hình thu nhỏ hoặc thay đổi kích thước hình ảnh
    * API của bên thứ 3 - tương tác với dịch vụ bên ngoài trang web của bạn
    * Bảo trì - các phiên cũ sắp hết hạn, quét bộ đệm
    * Email - một yêu cầu khiến một email được gửi đi
* Các ứng dụng có thiết kế OO tốt giúp dễ dàng gửi các jobs đến các workers, OO kém khiến việc trích xuất jobs trở nên khó khăn do các phản hồi yêu cầu có xu hướng chồng chéo. Mặc dù có nhiều giải pháp khác nhau để cung cấp background job nhưng ta sẽ tập trung vào việc sử dụng Resque, thư viện hàng đợi được triển khai rộng rãi nhất.
# Cài đặt Resque
## Cài đặt Redis
* Bạn sẽ cần cài đặt Redis. Giả sử bạn đang sử dụng Ubuntu và sử dụng Terminal:
```
sudo apt update
sudo apt install redis-server
```
* Khởi động redis với câu lệnh:
```
sudo systemctl restart redis.service
```
## Cài đặt Resque
* Cài đặt Resque bằng việc thêm *gem "resque"* vào *Gemfile* và chạy lệnh *bundle*.
# Tạo một fake delay
* Ví dụ về background jobs, chúng ta sẽ tạo giả một quy trình bị hoãn. Trong *ArticlesController#create*, hãy thêm một phương thức *sleep* sẽ trì hoãn controller của chúng ta trong 5 giây.
```
class ArticlesController < ApplicationController
  # more code goes here

  def create
    @article = Article.new(params[:article])

    if @article.save
      sleep(5)

      flash[:notice] = "Article was created."
      redirect_to articles_path
    else
      render :new
    end
  end
end
```
* Bây giờ, hãy khởi chạy ứng dụng của bạn và cố gắng tạo một article. Bạn sẽ thấy rằng có độ trễ 5 giây.
* Hãy chuyển quá trình giả đó sang một công việc nền.
# Tạo job
* Một giải pháp tốt là tạo một thư mục *app/jobs* và lưu trữ các jobs class của bạn ở đó. Tạo một file có tên *sleeper.rb* trong thư mục app/jobs của bạn.
* Một Resque job là bất kỳ lớp hoặc mô-đun Ruby nào có phương thức lớp perform. Đặt mã sau vào file *sleeper.rb* của bạn.
```
class Sleeper
  @queue = :sleep

  def self.perform(seconds)
    sleep(seconds)
  end
end
```
* Resque có thể duy trì nhiều hàng đợi cho các loại jobs khác nhau. Bằng cách thiết lập biến thực thể lớp *@queue*, worker này sẽ chỉ tìm kiếm các jobs trên hàng đợi *:sleep*.
# Xếp hàng job
* Xếp hàng một job trong Resque trông như sau:
```
Resque.enqueue(Sleeper, 5)
```
* Các tham số sẽ được tuần tự hóa dưới dạng JSON và được nối vào hàng đợi Redis được chỉ định trong job class. Lời gọi trên sẽ được thêm vào hàng đợi *sleep* với JSON sau:
```
{
  'class': 'Sleeper',
  'args': [ 5 ]
}
```
* Bây giờ chúng ta có quy trình giả mạo trong Sleeper job của mình, chúng ta có thể chỉnh sửa controller của mình để gọi background job thay thế.
* Các jobs chỉ cần truy cập vào các models của bạn. Nếu bạn muốn kích hoạt hành động của controller, thì đó là dấu hiệu cho thấy hành động của controller đang giữ logic miền cần được đẩy xuống model. Khi một job được tạo nó sẽ được thêm vào một danh sách cấu trúc dữ liệu trong Redis. Resque worker sẽ cố gắng truy cập đến job.
# Giám sát hàng đợi Resque
* Resque cung cấp ứng dụng *Sinatra* như một giao diện web để giám sát trạng thái của các *queues* và *worker* và xem thống kê của các trường hợp.
## Cài đặt
* Ứng dụng front-end này không được load mặc định nhưng chúng ta có thể load nó trong file routes. Mở file *config/routes.rb* và cấu hình ứng dụng như sau:
```
require 'resque/server'

# Of course, you need to substitute your application name here, a block
# like this probably already exists.
MyApp::Application.routes.draw do
  mount Resque::Server.new, at: "/resque"
end
```
* Reset lại Rails server. Truy cập *http://localhost:3000/resque* trên trình duyệt để kiểm tra phần web backend. 
## Overview
* Trên tab Overview, bạn có thể thấy danh sách các queues và workers. Mỗi queue hiển thị số lượng job đang chờ xử lý. Danh sách workers hiển thị các queues mà mỗi worker đang làm việc và job hiện đang được xử lý (nếu có).
![](https://images.viblo.asia/2f5927ec-8175-492d-b259-1648df74bb45.png)
## Failed
* Tab Failed hiển thị các jobs không thành công cùng với ngoại lệ đã được ném ra, thông báo lỗi và dòng xảy ra lỗi. Bạn cũng có thể bắt đầu các jobs cần thử lại trên trang này hoặc xóa chúng khỏi lịch sử các công việc không thành công.
![](https://images.viblo.asia/c8841e79-8ed8-4fcb-a1b4-77e6e649dbe9.png)
## Workers
* Tab Workers hiển thị danh sách tất cả các workers và trạng thái của chúng. Nhấp vào một worker sẽ hiển thị thông tin chi tiết của worker bao gồm máy chủ, pid, thời điểm nó được khởi động, bao nhiêu công việc được xử lý và bao nhiêu lỗi nó đã gặp phải.
## Stats
* Tab Stats hiển thị số liệu thống kê tổng thể của phiên bản Resque cũng như danh sách tất cả các khóa trong Redis. Nhấn vào các khóa sẽ hiển thị giá trị của khóa, vì vậy điều này cung cấp một cách nhanh chóng để xem bên trong Redis mà không cần phải kết nối và kích hoạt ứng dụng dòng lệnh.
# Khởi động Workers
* Resque cung cấp các rake tasks để bắt đầu một hoặc nhiều workers. Thêm *require 'resque/tasks'* vào đầu *Rakefile*. Sau đó bạn sẽ thấy chúng được thêm các tác vụ có sẵn của mình:
```
bundle exec rake -T resque
rake resque:failures:sort  # Sort the 'failed' queue for the redis_multi_queue failure backend
rake resque:work           # Start a Resque worker
rake resque:workers        # Start multiple Resque workers.
```
* Bạn có thể kiểm soát các tác vụ này bằng các biến môi trường:
    * **QUEUE** kiểm soát hàng đợi nào sẽ được giám sát
    * **COUNT** đặt số lượng worker (chỉ với resque:workers)
* Vì vậy, hãy khởi động một worker bằng cách chạy:
```
bundle exec rake environment resque:work QUEUE=sleep
```
* Khi tác vụ rake bắt đầu, nó sẽ bắt đầu xử lý các job từ hàng đợi. Bây giờ hãy truy cập ứng dụng của bạn và cố gắng tạo một article. Vì chúng tôi đặt phương pháp *sleep* trong background job, bạn sẽ nhận thấy rằng độ trễ đã biến mất.
# Thêm Rake Tasks
* Nếu bạn đang ở trong tình huống worker không cần quyền truy cập vào ứng dụng Rails của bạn, hãy bỏ qua *environment* và bạn sẽ tiết kiệm được rất nhiều bộ nhớ / thời gian khởi động:
```
rake resque:work QUEUE=sleep
```
## Định dạng nhật ký
* Nếu bạn muốn thay đổi định dạng nhật ký của Resque, hãy tạo một trình khởi tạo để thực hiện. Mở ra *config/initializers/resque.rb* và đặt cái này vào đó:
```
Resque.logger.formatter = Resque::QuietFormatter.new
```
* Đây là mặc định. Nếu bạn muốn verbose, hãy làm như sau:
```
Resque.logger.formatter = Resque::VerboseFormatter.new
```
hoặc thậm chí:
```
Resque.logger.formatter = Resque::VeryVerboseFormatter.new
```
*  Resque sử dụng một biến thể của trình ghi nhật ký Ruby chuẩn (*monologger*) có hành vi tương đương. Vì vậy, nếu bạn muốn, bạn có thể viết bộ định dạng của riêng mình để có được chính xác cách ghi nhật ký bạn muốn. Với *VerboseFormatter*:
```
bundle exec rake environment resque:work QUEUE=sleep
*** Checking sleep
*** Found job on sleep
*** got: (Job{sleep} | Sleeper | [5])
*** resque-1.25.1: Processing sleep since 1386736305 [Sleeper]
*** Running before_fork hooks with [(Job{sleep} | Sleeper | [5])]
*** resque-1.25.1: Forked 13978 at 1386736305
*** Running after_fork hooks with [(Job{sleep} | Sleeper | [5])]
*** done: (Job{sleep} | Sleeper | [5])
``` 
Và với *VeryVerboseFormatter*:
```
bundle exec rake environment resque:work QUEUE=sleep
** [21:35:54 2013-12-10] 14071: Checking sleep
** [21:35:54 2013-12-10] 14071: Found job on sleep
** [21:35:54 2013-12-10] 14071: got: (Job{sleep} | Sleeper | [5])
** [21:35:54 2013-12-10] 14071: resque-1.25.1: Processing sleep since 1386736554 [Sleeper]
** [21:35:54 2013-12-10] 14071: Running before_fork hooks with [(Job{sleep} | Sleeper | [5])]
** [21:35:54 2013-12-10] 14071: resque-1.25.1: Forked 14101 at 1386736554
** [21:35:54 2013-12-10] 14101: Running after_fork hooks with [(Job{sleep} | Sleeper | [5])]
** [21:35:59 2013-12-10] 14101: done: (Job{sleep} | Sleeper | [5])
```
* Vì worker sẽ khởi động trên các máy chủ từ xa, sẽ rất hữu ích khi chuyển hướng đầu ra nhật ký của họ thay vì chỉ in nó dạng STDOUT mà sẽ bị mất. Làm điều này trong *config/initializers/resque.rb*:
```
Resque.logger = MonoLogger.new(File.open("#{Rails.root}/log/resque.log", "w+"))
Resque.logger.formatter = Resque::QuietFormatter.new
```
# Tính toán Queuing
* Kéo code project Blogger và cài đặt để chạy:
```
git clone git://github.com/JumpstartLab/blogger_advanced.git
cd blogger_advanced
bundle
bundle exec rake db:setup
bundle exec rake
```
* Khởi chạy server và vào root page. Đây là màn *DashboardController#index* mà ta sẽ chứng minh lợi ích của jobs
## Tại sao sử dụng Job
* Ứng dụng blogger theo dõi tổng số từ cho tất cả các bài báo và tất cả các bình luận trên trang tổng quan. Hiện tại, nó sẽ tính toán lại các giá trị này cho mỗi yêu cầu của trang bảng điều khiển.
```
  def show
    @articles = Article.for_dashboard
    @article_count = Article.count
    @article_word_count = Article.total_word_count
    @most_popular_article = Article.most_popular

    @comments = Comment.for_dashboard
    @comment_count = Comment.count
    @comment_word_count = Comment.total_word_count
  end
```
* Các phương thức *totalwordcount* trên *Article* và *Comment* đều được triển khai như sau:
```
def self.total_word_count
    all.inject(0) {|total, a| total += a.word_count }
end
```
* Kết quả là mỗi lần xem trang dashboard khiến một phép tính liên quan đến mỗi nhận xét hoặc bài viết được chạy lại. Đây là loại hoạt động gây ra sự chậm chạp nên *A) được lưu trong bộ nhớ cache* và *B) được tính toán trong background*. Việc giới thiệu Resque job vào ứng dụng của sẽ giúp thay đổi này tương đối đơn giản và dễ thực hiện.
## Viết Word Count job
* Trước khi chúng ta viết lớp job class tùy chỉnh của mình, hãy tạo sẵn các Resque Rake tasks để chúng ta có thể chạy hàng đợi worker của mình sau này. Tạo tệp *lib/tasks/resque.rake* và thêm dòng sau:
```
require 'resque/tasks'
```
* Chạy *bundle exec rake -T* sẽ hiển thị cho chúng ta một danh sách bao gồm hai nhiệm vụ liên quan đến Resque. Chúng ta sẽ muốn thay thế lời gọi nội tuyến *Comment.total_word_count* bằng một thứ gì đó được chạy trong nền, tức là Resque job. Tạo một thư mục có tên *app/jobs*, sau đó bên trong nó tạo một file có tên *comment_total_word_count.rb*.
```
class CommentTotalWordCount
  @queue = :total_word_count

  def self.perform
    Comment.total_word_count
  end
end
```
* Chúng ta đã chuyển lệnh gọi tính tổng số từ cho các nhận xét sang một phương thức job, chuyển hoạt động chậm khỏi chu trình yêu cầu-phản hồi, nhưng chúng ta chưa lưu trữ kết quả của phép tính ở bất kỳ đâu mà yêu cầu có thể truy xuất nó. Chúng tôi có thể lưu trữ nó ở đâu đó trong cơ sở dữ liệu, nhưng hiện tại không có nơi nào rõ ràng để đặt nó. Một bảng dashboard của một số loại có vẻ khá kém hấp dẫn. May mắn thay, một lợi ích phụ của việc sử dụng Resque là chúng tôi có quyền truy cập vào một phiên bản Redis miễn phí. Redis là một nơi tự nhiên để lưu trữ một giá trị như thế này.
* Cách dễ nhất để truy cập máy chủ Redis trong Ruby là thông qua *gem redis*. Mặc dù chúng ta có thể thêm gem redis vào Gemfile của mình, nhưng nó không cần thiết vì Resque đã khai báo nó như một phụ thuộc. Tuy nhiên, chúng ta sẽ cần đưa một *Redis endpoint* vào ứng dụng Rails của mình để có thể dễ dàng truy cập vào kho bộ nhớ.
* Tạo tệp trình khởi tạo *config/initializers/redis.rb* và thêm nội dung sau:
```
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
* Sau khi khởi động lại nhanh máy chủ Rails, giờ đây chúng ta sẽ có một trình xử lý khả dụng trên toàn cầu trên Redis store. Thay thế với Resque job và lưu trữ kết quả tính toán số từ:
```
class CommentTotalWordCount
  @queue = :total_word_count

  def self.perform
    DataCache.set 'comment_total_word_count', Comment.total_word_count
  end
end
```
* Bây giờ chúng ta biết tên của hàng đợi Resque mà job đang sử dụng, chúng ta hãy bắt đầu lên Resque worker bằng cách chạy nó trong Rake tasks:
```
bundle exec rake environment resque:work QUEUE=total_word_count
```
* Lưu ý rằng điều này sẽ chặn thiết bị đầu cuối mà nó đang chạy. Giờ đây, chúng ta có thể tìm tổng số từ cho các nhận xét trong nền, nhưng chúng ta vẫn cần xếp hàng chờ job tại một số điểm. Nơi tốt nhất để đặt điều này là trong bộ điều khiển, sau khi chúng ta đưa ra nhận xét mới.
```
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
* Bây giờ chúng ta đang lưu trữ tổng số từ hiện tại sau khi mỗi nhận xét được tạo để có thể truy xuất nó sau này. Nếu chúng ta quay lại dashboard controller, chúng ta có thể tận dụng điều này bằng cách xóa lệnh gọi đến Comment.total_word_count, thay thế bằng truy vấn Redis:
```
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
## Tái cấu trúc lại với cách tiếp cận tốt hơn
* Những gì chúng ta đã làm cho đến nay về cơ bản hoạt động, nhưng có một số khía cạnh không mong muốn có thể được cải thiện. Đầu tiên, chúng ta đã làm rò rỉ thông tin về nơi dữ liệu của bảng Comment tổng hợp được lưu trữ ngoài model Comment phạm vi controller Dashboard và job class. Đó có lẽ không phải là một ý tưởng tuyệt vời.
* Hãy cập nhật Comment class để có hai phương thức cho tổng số từ: một phương thức tính toán và lưu trữ tổng số và một phương thức truy xuất nó. Bằng cách đó, chúng ta có thể di chuyển tất cả các thông tin lữu trữ của nó trong Redis vào Comment class như sau:
```
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
* Giờ điều chỉnh lại job class:
```
class CommentTotalWordCount
  @queue = :total_word_count

  def self.perform
    Comment.calculate_total_word_count
  end
end
```
* Cuối cùng, hãy truy cập lại *DashboardController* và đưa mọi thứ trở lại như cách chúng ta đã xây dựng ban đầu:
```
def show
    @articles = Article.for_dashboard
    @article_count = Article.count
    @article_word_count = Article.total_word_count
    @most_popular_article = Article.most_popular

    @comments = Comment.for_dashboard
    @comment_count = Comment.count
    @comment_word_count = Comment.total_word_count
end
```
* Trước khi chúng ta bắt đầu triển khai job partern, hành động *DasboardController#show* không biết về kéo theo việc tính toán *Comment.totalwordcount*. Chúng ta đã đi đến vòng tròn đầy đủ: bây giờ nó không biết gì về công việc nền và bộ nhớ đệm đang diễn ra ngầm. Đây có lẽ là một dấu hiệu tốt.
# Kết luận
* Chúng ta đã tiết kiệm hiệu năng lớn cho mỗi yêu cầu xem trang dashboard bằng cách giảm tải tính toán tổng số từ cho các nhận xét cho một job. Tuy nhiên, chúng tôi vẫn phải chịu một hệ quả tương tự cho các bài báo. Vì vậy, ta nên:
    * Cập nhật việc tính toán tổng số từ cho các bài báo bằng việc sử dụng job partern giống với cách tính ở phần nhận xét đã làm.
    * Việc thực hiện Resque job cho Comment sẽ gặp vấn đề khi nhiều Resque worker cùng chạy. Hãy sử dụng lệnh Redis MULTI để khắc phục điều này.
* Chúc các bạn thành công
* Tham khảo:
    * [Background Jobs with Resque](http://tutorials.jumpstartlab.com/topics/performance/background_jobs.html)
    * [https://github.com/resque/resque](https://github.com/resque/resque)
    * [https://github.com/redis/redis-rb](https://github.com/redis/redis-rb)