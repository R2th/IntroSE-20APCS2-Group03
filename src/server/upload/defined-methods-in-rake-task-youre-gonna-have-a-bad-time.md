# Rake là gì?
Rake giúp bạn quản lí các task trong rails, với mục đích gom nhóm các mã lệnh ruby thực thi nhiều lần vào một task chung để sử dụng lại nhiều lần. Đối với một lập trình ruby thì chắc hẳn bạn đã sử dụng đến nó nhiều rồi mà vẫn chưa biết nó là gì, sau đây là một số rake task mà rails đã định nghĩa sẳn như: rake db:create, rake db:migrate, rake db:seed...


Bạn có thể xem danh sách tasks bằng lệnh sau:

```
rake -T
```
# Định nghĩa method trong Rake task thì sẽ thế nào?
Rake tasks cung cấp một cách tốt đẹp để xử lý các tác vụ phổ biến xung quanh một dự án ruby. Trong các dự án Rails, chúng gần như không thể tránh khỏi và thậm chí có thư mục riêng của chúng mà từ đó chúng được tự động tải. Cuối cùng, một dự án sẽ phát triển về kích thước và độ phức tạp để đảm bảo nhiều file tasks để phân tách mối quan tâm tốt hơn. Điều này một mình là không có gì phải lo lắng, nhưng đó là khi bạn bắt đầu sử dụng các methods trong các file tasks của bạn, lúc đó bạn sẽ gặp vấn đề về các task.

### Ví dụ.

Giả sử project rails có 2 methods `caculate`, `save` và 1 task `run` trong 2 file rake `blog_metrics` và `create_blog_post`(Ở đây các methods được đinh nghĩ đơn giản để minh họa thôi):

```
namespace :blog_metrics do
  desc "Caculate and save blog metric"
  task :run do
    caculate_blog_metrics
    save
  end

  def caculate_blog_metrics
    puts "Caculate blog metrics"
  end

  def save
    puts "Save blog metrics"
  ends
end
```

Và đây kết quả khi bạn chạy task trên:
```
rake blog_metrics:run
Caculate blog metrics
Save blog metrics
```


Mọi thứ vẫn ổn. Bây giờ mình thêm một task create new blog post như sau:

```
namespace :create_blog_post do
  desc "Create and saving blog post"
  task run: :environment do
    generate_default_blog_post
    save
  end

  def generate_default_blog_post
    puts "Generating default blog post"
  end

  def save
    puts "Save default blog post"
  end
end
```


Tiếp tục xem kết quả của task vừa mới tạo nào:
```
Generating default blog post
Save default blog post
```

Vẫn không có vấn đề gì xảy ra. Giờ bạn hãy thử chạy lại task run trong blog_metrics

```
rake blog_metrics:run
Caculate blog metrics
Save default blog post
```

Giờ thì thế nào đây. Kết quả sao lại thế này nhỉ.

Kết quả trả về là hàm `save` trong task `create_blog_post` ư.

Và đó chính là vấn đề mình muốn đề cập đến. Rails tự động tải các tasks khi thực hiện bất kì rake task nào đó. Lưu ý ở đây là các phương thức được định nghĩa trong các tệp tác vụ được tải kết thúc được định nghĩa trên global namespace. Do đó, các methods được định nghĩa này có thể truy cập được qua các rake file, vì vậy có thể cho các methods dễ xung đột và được xác định lại nếu tên của chúng khớp nhau.

Để hiểu rõ hơn, hãy xem thứ tự luồng của các events:
> 1. `rake blog_metrics`
> 2. Rails load hết các rake tasks
> 3. `lib/tasks/blog_metrics.rake` loaded và định nghĩa 2 method `#caculate_blog_metrics` và `#save`
> 4. `lib/tasks/create_blog_post_task.rake` loaded và định nghĩa method `#generate_default_blog_post` và định nghĩa lại method `#save`
> 5. `blog_metrics` task đã thực thi method `save` được định nghĩa sau cùng.


### Làm thế nào để giải quyết vấn đề trên

#### 1. Nên định nghĩa các method khác tên nhau


```
# lib/tasks/blog_metrics.rake
desc 'Calculate and save blog metrics'
task :blog_metrics do
  metrics = calculate_blog_metrics
  save_blog_metrics
end

def calculate_blog_metrics
  puts "Calculating blog metrics"
end

def save_blog_metrics
  puts "Saving blog metrics"
end
# lib/tasks/create_blog_post_task.rake
desc 'Create and save a new blog post'
task :create_blog_post do
  blog_post = generate_default_blog_post
  save_default_blog_post
end

def generate_default_blog_post
  puts "Generating a default blog post"
end

def save_default_blog_post
  puts "Saving defualt blog post"
end
```


#### 2. Trích xuất methods từ module/class

```
# lib/blog_metric_calculator.rb
class BlogMetricCalculator
  def metrics
    puts "Calculating blog metrics"
  end

  def save(metrics)
    puts "Saving blog metrics"
  end
end

# lib/tasks/blog_metrics.rake
require 'lib/blog_metric_calculator'

desc 'Calculate and save blog metrics'
task :blog_metrics do
  calculator = BlogMetricCalculator.new
  calculator.save(calculator.metrics)
end
# lib/blog_post_creator.rb
module BlogPostCreator
  def self.create_default_blog_post
    puts "Generating a default blog post"
  end

  def self.save(post)
    puts "Saving default blog post"
  end
end

# lib/tasks/create_blog_post.rake
require 'lib/blog_post_creator'

desc 'Create and save a new blog post'
task :create_blog_post do
  blog_post = BlogPostCreator.create_default_blog_post
  BlogPostCreator.save(blog_post)
end
```

#### 3. Viết trực tiếp vào task
```
# lib/tasks/blog_metrics.rake
desc 'Calculate and save blog metrics'
task :blog_metrics do
  puts "Calculating blog metrics"
  metrics = # Inline calculating work

  puts "Saving blog metrics"
  # Inline saving work
end
# lib/tasks/create_blog_post.rake
desc 'Create and save a new blog post'
task :create_blog_post do
  puts "Generating a default blog post"
  blog_post = # Inline blog post generation work

  puts "Saving default blog post"
  # Inline saving work
end
```

# Lời kết
Trên đây là những gì mình đọc được từ một bài viết, các bạn có thể tham khảo [tại đây](https://kevinjalbert.com/defined_methods-in-rake-tasks-you-re-gonna-have-a-bad-time/).
Mình mới tìm hiểu nên có nhiều thiếu sót. Hy vọng mọi người có thể bổ sung thêm cho mình.

Cảm ơn mọi người đã đọc.