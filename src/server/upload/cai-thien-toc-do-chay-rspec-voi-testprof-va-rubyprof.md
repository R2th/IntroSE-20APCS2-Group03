Nếu bạn là lập trình viên RoR hẳn đã quá quen thuộc với những thuật ngữ như là Unit test, BDD, hay RSpec rồi. Hôm nay mình sẽ không đi sâu vào tìm hiểu từng thuật ngữ trên, mà sẽ giới thiệu với các bạn một công cụ tuyệt vời cho những ai đã viết RSpec, những dự án đã dùng RSpec để chạy test trong CI pipeline của mình - đó là TestProf. Chắc là các bạn cũng đã từng tự chứng kiến những dự án có số lượng code RSpec khổng lồ và chạy mất rất nhiều thời gian rồi đúng không, và các bạn chắc cũng đã có ý nghĩ muốn đập hết đống code RSpec đó đi để viết lại từ đầu, mong là tốc độ chạy của nó sẽ tốt hơn, nhưng đôi khi dự án của bạn bận sấp mặt và bạn không có thời gian làm điều đó, hơn nữa là bạn cũng chẳng thể biết được nguyên nhân cốt lõi làm RSpec dự án của bạn chạy chậm là do đâu mà ra. Bài giới thiệu hôm nay của mình sẽ giúp các bạn vượt qua tất cả các khó khăn đó với TestProf.

### Giới thiệu về TestProf

TestProf là tập hợp của các công cụ phân tích hiệu năng RSpec trong một gem duy nhất, nó giúp bạn tìm ra nguyên nhân cốt lõi tại sao RSpec của bạn lại chạy chậm bằng việc cung cấp:

- Một phương thức tiện lợi để chạy ruby profiler với gem `ruby-prof`, tất cả những gì bạn cần là cài gem `ruby-prof` và sử dụng phương thức sẵn có của `test-prof` mà không phải sửa quá nhiều code.
- Công cụ phân tích việc sử dụng Factories để generate dữ liệu test có hiệu quả hay không.
- Event profile - phân tích thời gian chạy test thường được sử dụng vào hoạt động nào.

Cùng với việc đưa ra các công cụ phân tích tuyệt vời như vậy, `test-prof` còn đưa ra các recipes, hay có thể gọi là các helper thay thế để cải thiện code RSpec của chúng ta, giúp chúng chạy nhanh hơn mà không phải thay đổi quá nhiều cấu trúc code hiện tại. Hình dưới đây tổng hợp tất cả những công cụ mà `test-prof` cung cấp. Ngoài ra, `test-prof` còn hỗ trợ việc phân tích hiệu năng cho cả Minitest, rất tiện lợi cho những dự án viết unit test mà không dùng RSpec.

![](https://images.viblo.asia/19cc0ee7-f99a-4387-8733-03e06c94916c.png)


Để cài đặt `test-prof`, chúng ta chỉ cần khai báo trong Gemfile:

```ruby
group :test do
  gem "test-prof"
end
```

Phần tiếp theo, chúng ta sẽ đi vào tìm hiểu chi tiết những công cụ đã được đề cập ở trên.

### Khai thác thông tin theo loại test case

Việc tìm kiếm ra ngay nguyên nhân khiến RSpec hoạt động kém hiệu quả là rất khó, việc đầu tiên cần làm là xác định xem ***phần nào của các test cases chúng ta đang viết chiếm nhiều thời gian chạy nhất***.

Để trả lời câu hỏi đó, chúng ta sẽ sử dụng Tag Profiler (TagProf) của `test-prof`, TagProf là một profiler đơn giản thu thập thông tin hiệu năng chạy RSpec của các loại test case phân loại bởi tag của chúng. Bình thường, `rspec-rails` sẽ tự động phân chia các test case bởi tag mặc định là theo controller, model, helper.... Khi viết test chắc hẳn chúng ta cũng hay mặc định gán tag cho chúng mà không để ý.

Ví dụ:

```ruby
# loại test với tag model
RSpec.describe Admin, type: :model do
    ...
end 

# loại test với tag controller
RSpec.describe AdminsController, type: :controller do
    ...
end 
```

Với TagProf, chúng ta có thể biết được các thông tin về thời gian chạy mỗi loại test, chiếm bao nhiêu phần trăm tổng thời gian chạy, mỗi loại test đó có bao nhiêu example (test case), chiếm bao nhiêu phần trăm tổng số test case, thời gian trung bình chạy 1 case là bao nhiêu. Tất cả việc chúng ta phải làm là set biến môi trường trước khi chạy rspec:

```ruby
// định nghĩa chạy rspec phân loại theo type
$ TAG_PROF=type bundle exec rspec
```

Chúng ta có thể thu được một kết quả như sau:

```ruby
[TEST PROF INFO] TagProf report for type

       type          time   total  %total   %time           avg

    request     00:04.808      42   33.87   54.70     00:00.114
 controller     00:02.855      42   33.87   32.48     00:00.067
      model     00:01.127      40   32.26   12.82     00:00.028
```

Chú ý là ở ví dụ trên, chúng ta sử dụng phân loại theo `type`, chúng ta có thể định nghĩa chạy test theo một tag khác, ví dụ như `function` chẳng hạn:

```ruby
# test liên quan đến chức năng đăng nhập admin
RSpec.describe "", function: :admin_login do
    ...
end 

# test liên quan đến chức năng quản lý
RSpec.describe "", function: :manage do
    ...
end 
```

Chúng ta cũng có thể generate một bảng báo cáo với format html trực quan, dễ nhìn bằng cách chạy rspec như sau:

```ruby
TAG_PROF=type TAG_PROF_FORMAT=html bundle exec rspec
```

Chúng ta có thể thu được một file report như sau:

![](https://images.viblo.asia/494203b2-68c8-4986-a63a-1e6cc51734dc.png)

### Xác định phương thức chiếm nhiều thời gian chạy nhất

Sau khi đã xác định được thành phần nào chạy chậm, chúng ta có thể chỉ chạy test với loại tag đó và tiếp tục phân tích xem nguyên nhân chính khiến loại test đó chạy chậm là do đâu. Đây là nơi `ruby-prof` tỏa sáng, tất nhiên là với sự giúp đỡ của `test-prof`, trước hết việc tích hợp `ruby-prof` phải yêu cầu chúng ta khai báo nó trong Gemfile

```ruby
group :development, :test do
  gem "ruby-prof", ">= 0.17.0", require: false
end
```

Nếu ai đã từng sử dụng gem này để test thời gian chạy của method chắc cũng biết để đo được kết quả như vậy, ta phải thực hiện thêm bằng tay code vào trước và sau mỗi đoạn code, tuy nhiên hoạt động với `test-prof` thì chúng ta không cần làm vậy. `ruby-prof` có thể chạy ở 2 mode là global và per-example, với mode global chúng ta chỉ cần chạy rspec như sau mà không phải sửa code:

```ruby
TEST_RUBY_PROF=1 bundle exec rspec...
```

Để chạy per-example, chúng ta thêm shared context option vào sau những example cần profile:

```ruby
it "is doing heavy stuff", :rprof do
  # ...
end
```

Sau khi chạy chúng ta thu được kết quả như sau, thời gian chạy của từng method khi chạy test được sắp xếp theo thứ tự giảm dần:

```
%self     calls  name
20.85       721   <Class::BCrypt::Engine>#__bc_crypt
 2.31      4690  *ActiveSupport::Notifications::Instrumenter#instrument
 1.12     47489   Arel::Visitors::Visitor#dispatch
 1.04    205208   String#to_s
 0.87    531377   Module#===
 0.87    117109  *Class#new
```

trong file output (đường dẫn sẽ được in ra màn hình sau khi rspec chạy xong) sẽ có giải thích chi tiết về từng cột trong phần kết quả trên, tuy nhiên ở đây mình sẽ nêu ra định nghĩa cơ bản:
- `%self` phần trăm thời gian chạy method đó trên tổng thời gian.
- `calls` method được gọi bao nhiêu lần.
- `name` tên method và nó được gọi từ class hay instance của class nào.

`ruby-prof` có thể chạy với hai mode là `wall` và `cpu`, trong đó `wall` time đo thời gian chạy thực tế trôi qua khi method được gọi, còn `cpu` time đo thời gian cpu xử lý method đó (nghĩa là nếu có một process khác được xử lý bởi cpu, thời gian đó sẽ không được ghi nhận trong kết quả). Cá nhân mình thì thấy chế độ mặc định `wall` time có ích hơn vì nó đo thời gian mà con người chúng ta phải chờ đợi để chạy rspec. Như chúng ta thấy ở ví dụ trên, method `bc_crypt` được gọi ít nhất nhưng lại tốn nhiều thời gian nhất, cho chúng ta suy luận là có thể phần code liên quan đến mã hóa password gây chậm rspec, từ đó có biện pháp để cải thiện.

Một số common method có thể được loại bỏ khỏi list profiling bằng cách thêm config sau vào `rails_helper.rb`:

```ruby
TestProf::RubyProf.configure do |config|
  config.custom_exclusions = {User => %i[save save!]}
end
```

`test-prof` mặc định enable việc loại bỏ common method, để disable chức năng này ta cẩn thêm config sau:

```ruby
config.exclude_common_methods = false
```

### Xác định sự kiện nào diễn ra nhiều nhất

EventProf là một công cụ của `test-prof` giúp thu thập sư kiện diễn ra nhiều nhất. Nó hoạt động giống như cơ chế notification và instrumentation của ActiveSupport (nếu ai chưa biết thì có thể tìm hiểu tại [đây](https://api.rubyonrails.org/classes/ActiveSupport/Notifications.html)). Về cơ bản nó hoạt động giống như khi chúng ta chạy rspec với option `-p`, sẽ in ra 5 hoặc 10 test suite chạy chậm nhất, nhưng thay vào đó chúng ta sẽ theo dõi một hoặc nhiều sự kiện.

`test-prof` hỗ trợ tất cả các sự kiện mà ActiveSupport định nghĩa từ trước như `sql.active_record`, `render_template.action_view`, ... (đọc thêm tại [đây](https://api.rubyonrails.org/classes/ActiveSupport/Notifications.html)). Ngoài ra, nó còn hỗ trợ một vài custom event khác như `factory.create` (track sự kiện tạo dữ liệu nhờ Factories), `sidekiq.inline`, `sidekiq.jobs` (track các sự kiện liên quan đến chạy sidekiq job, inline). 

Để chạy EventProf, chúng ta cũng không cần phải chỉnh sửa code gì cả (một điều tuyệt vời của `test-prof` là chúng ta không cần chỉnh sửa qúa nhiều code để chạy) chỉ cần chạy lệnh rspec như sau:

```ruby
EVENT_PROF='sql.active_record' rspec ...
```

Chúng ta cũng có thể đo nhiều sự kiện bằng cách cung cấp list các event cách nhau bởi dấu phẩy `,`.

```ruby
EVENT_PROF='sql.active_record,perform.active_job' rspec ...
```

Chúng ta sẽ thu được kết quả như sau:

```
[TEST PROF INFO] EventProf results for sql.active_record

Total time: 00:00.256 of 00:00.512 (50.00%)
Total events: 1031

Top 5 slowest suites (by time):

AnswersController (./spec/controllers/answers_controller_spec.rb:3) – 00:00.119 (549 / 20) of 00:00.200 (59.50%)
QuestionsController (./spec/controllers/questions_controller_spec.rb:3) – 00:00.105 (360 / 18) of 00:00.125 (84.00%)
CommentsController (./spec/controllers/comments_controller_spec.rb:3) – 00:00.032 (122 / 4) of 00:00.064 (50.00%)

Top 5 slowest tests (by time):

destroys question (./spec/controllers/questions_controller_spec.rb:38) – 00:00.022 (29) of 00:00.064 (34.38%)
change comments count (./spec/controllers/comments_controller_spec.rb:7) – 00:00.011 (34) of 00:00.022 (50.00%)
change Votes count (./spec/shared_examples/controllers/voted_examples.rb:23) – 00:00.008 (25) of 00:00.022 (36.36%)
change Votes count (./spec/shared_examples/controllers/voted_examples.rb:23) – 00:00.008 (32) of 00:00.035 (22.86%)
fails (./spec/shared_examples/controllers/invalid_examples.rb:3) – 00:00.007 (34) of 00:00.014 (50.00%)
```

Kết quả bao gồm các thông tin như, thời gian chạy của event trên tổng thời gian, số lần event xảy ra và các test suite và test case chậm nhất.

Mặc định thì EventProf thu thập thông số dựa trên test suite, nếu bạn muốn EventProf thu thập trên từng example, ta cần config như sau:

```ruby
TestProf::EventProf.configure do |config|
  config.per_example = true
end
```

hoặc thêm variable `EVENT_PROF_EXAMPLES=1`.



-----


Như vậy chúng ta đã tìm hiểu được một số cách để thu thập thông tin về hiệu năng chạy RSpec, chắc hẳn giờ bạn đã có thể phần nào tìm được nguyên nhân gây chậm các test case hiện tại của dự án bạn là gì rồi. Mình sẽ để dành việc phân tích hiệu năng tạo dữ liệu test, các recipes cải thiện test case vào một phần khác.

Bài viết được tham khảo tại:
- https://test-prof.evilmartians.io/#/
- https://evilmartians.com/chronicles/testprof-a-good-doctor-for-slow-ruby-tests
- https://guides.rubyonrails.org/active_support_instrumentation.html
- https://ruby-prof.github.io/