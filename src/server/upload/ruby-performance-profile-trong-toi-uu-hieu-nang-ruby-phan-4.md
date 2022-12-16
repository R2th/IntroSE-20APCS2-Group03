Trong các phần trước, chúng ta đã tìm hiểu các kỹ thuật trong việc tối ưu hoá performance ruby. Nhưng nếu như các kỹ thuật đấy không có hiệu quả thì sao? Câu trả lời đó là `profile` 

Kỹ thuật profile là cách duy nhất trả lời cho câu hỏi là `cái gì làm cho code bị chậm?`. Trong bài viết này, chúng ta sẽ cùng tìm hiểu những bí mật trong profile mà có thể dễ dàng tìm ra được những thứ gây chậm trong chương trình.

Bài viết này sẽ có 2 phần chính, đó là đo đạc bộ nhớ và CPU được dùng. Phần 2 là chuyển đổi kết quả thu được trước đó để chỉ ra các phần code chạy chậm.

Công cụ được sử dụng trong quá trình profile là `ruby-prof`. Nó sẽ đo thời gian thực thi của chương trình và sẽ chia nhỏ thành các hàm riêng biệt mà chương trình sử dụng.

Sau khi bạn thực hiện đo đạc từ ruby-prof, bạn có thể trực quan hoá chúng với các công cụ in được xây dựng bởi ruby-prof hay với KCachegrind.

Ngoài ra, chúng ta cần xác đinh rõ quy tắc trong profile CPU. Đầu tiên và quy tắc duy nhất để cho quá trình profile CPU thành công là `tắt garbage collector`

### Đo đạc với Ruby-prof 

`ruby-prof` là gem của Ruby bao gồm cả API và công cụ command-line.  Trong Rails, chúng ta có thể kiểm tra một request bằng cách thêm ruby-prof vào trong quá trình middleware.

#### 1. ruby-prof API 
VD:

```ruby
require 'date' 
require 'rubygems' 
require 'ruby-prof'

GC.disable
RubyProf.start 
Date.parse("2014-07-01") 
result = RubyProf.stop

printer = RubyProf::FlatPrinter.new(result) printer.print(File.open("ruby_prof_example_api1_profile.txt", "w+"))
```

Ta có thể sử dụng block cho ruby-prof:
```ruby
result = RubyProf.profile do 
   Date.parse("2014-07-01")
end
```

Có một vài kiểu report cho ruby-prof để in ra kết quả, trên đây ta sử dụng `FlatPrinter`, nó sẽ hiển thị tổng số thời gian thực thi của mỗi hàm. Bạn sẽ dễ dàng nhìn được các hàm gây tốn thời gian cho CPU.

Khi chạy, ta sẽ có một kết quả profile như sau:

#ruby_prof_example_api1_profile.txt

Thread ID: 70237499659060 

Fiber ID: 70237507374720 

Total: 0.001111

Sort by: self_time

| %self | total | self | wait | child | calls | name |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 59.98 | 0.001 | 0.001 | 0.000 | 0.000 | 2 | Regexp#match |
|28.96 | 0.001 | 0.000 | 0.000 | 0.001 | 1 | <Class::Date>#parse |
| 4.72 | 0.001 | 0.000 | 0.000 | 0.001 | 1 | Global#[Nomethod] |
| 3.81 | 0.000 | 0.000 | 0.000 | 0.000 | 1 | String#gsub! |
| 1.22 | 0.000 | 0.000 | 0.000 | 0.000 | 1 | MatchData#begin |
| 0.67 | 0.000 | 0.000 | 0.000 | 0.000 | 1 | String#[]= |
| 0.38 | 0.000 | 0.000 | 0.000 | 0.000 | 1 | Fixnum#div |
| 0.25 | 0.000 | 0.000 | 0.000 | 0.000 | 1 | MatchData#end |

Code trên dành hơn 60% thời gian vào việc tìm ngày được truyền vào qua regular expression. Hầu hết số thời gian còn lại được dùng cho `Date#parse`, có thể chính là việc khởi tạo object Date.

Bây giờ, hãy cùng tìm hiểu cách sử dụng công dòng lệnh.

#### 2. Công cụ dòng lệnh ruby-prof 

Ta có chương trình:
```ruby
require 'date'

GC.disable
Date.parse("2014-07-01")
```

Ta chạy lệnh `ruby-prof` để thực hiện profile chương trình trên:
```ruby
$ ruby-prof -p flat -m 1 -f ruby_prof_example_command_profile.txt\
ruby_prof_example_command.rb
```

Option -p để xác định format output cho profile. Và -m để giới hạn hiển thị cho tất cả các hàm mà mất ít hơn một thời gian cụ thể nào đó. Trong trường hợp này, ta sẽ ko cần quan tâm đến hàm nào chạy ít hơn 1%.

Ta có kết quả:
Thread ID: 69883126035220 

Fiber ID: 69883132260680 

Total: 0.002094

Sort by: self_time

| %self  |  total   |  self |    wait |   child |  calls | name |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 17.37 | 0.001 | 0.000 | 0.000 | 0.001 | 3 | Kernel#gem_original_requi |
| 16.97 | 0.000 | 0.000 | 0.000 | 0.000 | 2 | Regexp#match |
| 10.85 | 0.001 | 0.000 | 0.000 | 0.000 | 1 | <Class::Date>#parse |
| 2.36 | 0.000 | 0.000 | 0.000 | 0.000 | 113 | Module#method_added |
| 1.83 | 0.000 | 0.000 | 0.000 | 0.000 | 6 | IO#set_encoding |
| 1.57 | 0.000 | 0.000 | 0.000 | 0.000 | 1 | String#gsub! |
| 1.23 | 0.000 | 0.000 | 0.000 | 0.000 | 6 | MonitorMixin#mon_enter |
| 1.16 | 0.002 | 0.000 | 0.000 | 0.002 | 2 | Global#[Nomethod] |
| 1.12 | 0.000 | 0.000 | 0.000 | 0.000 | 3 | Array#each |
| 1.07 | 0.000 | 0.000 | 0.000 | 0.000 | 49 | BasicObject#singleton_met |
| 1.03 | 0.000 | 0.000 | 0.000 | 0.000 | 6 | MonitorMixin#mon_exit |

Với profile như trên, ta có thể theo dõi được lệnh nào mất nhiều thời gian nhất trong cả chương trình. Trong trường hợp này là `Kernel#gem_original_require`, chúng ta cũng có thể thấy thời gian dành cho lệnh `require 'date'`. Ngoài ra là các hàm khởi tạo instance, lớp cũng được xuất hiện. Cũng không ngạc nhiên, khi với một chương trình đơn giản như này thì thời gian cho việc khởi tạo khá nhiều so với các code cần thiết.

Với một profile được tạo ra bởi công cụ ruby-prof sẽ rất hữu ích nếu bạn quan tâm đến tối ưu chương trình khi khởi động và thời gian tải gem. Với những trường hợp khác, nó cũng thêm rất nhiều dữ liệu vào bản kết quả, và bạn nên sử dụng ruby-prof API hơn.

#### 3. Rails Middleware

Ruby-prof API hoạt động tốt nhât khi bạn muốn tạo profile cho 1 phần của ứng dụng Rails, vd như controller action, hay thời gian render template. Nhưng nếu muốn tìm hiểu đến middleware, routing hay khởi tạo controller, bạn cần cài đặt ruby-prof như middleware.

Để làm điều này, cần thêm gem ruby-prof vào Gemfile:
`gem 'ruby-prof'`

Thêm bộ adapter Rack của ruby-prof vào middleware, trong `config/application.rb`

```ruby
config.middleware.use Rack::RubyProf, path: '/tmp/rails_profile'
```

Hàm `use` sẽ thêm profiler vào bên dưới middleware stack. Vì vậy profile sẽ được thêm vào code khởi tạo Rails, nhưng bỏ qua middleware.  Nếu bạn muốn profile middleware, thì cần thêm profiler trước Rack::Runtime.

```ruby
config.middleware.insert_before Rack::Runtime, Rack::RubyProf, path: '/tmp/rails_profile'
```

Với Rack::RubyProf middleware được tải lên, bạn sẽ có kết quả báo cáo được lưu trong đường dẫn bạn cài đặt ở trên. 

Đừng quên cần disable GC trước khi Rack::RubyProf bắt đầu. Cách tốt nhất để làm là viết một hay nhiều middleware và thêm vào trước profiler trong stack.

```ruby
class GCDisabler
  def initialize(app)
    @app = app
  end
  
  def call(env) 
    GC.start
    GC.disable
    response = @app.call(env) GC.enable
    response
  end 
end

# in config/application.rb
config.middleware.insert_before Rack::RubyProf, GCDisabler
```

### Trực quan hoá với Ruby-Prof Printer 

Ruby-prof có thể tạo ra nhiều kiểu báo cáo dễ hiểu. Có 3 kiểu phổ biến nhất là flat, call graph và call stack. Mỗi loại sẽ có mục đích khác nhau. Chúng ta sẽ bắt đầu bằng chương trình phức tạp hơn để áp dụng với từng loại profiler:

```ruby
require 'date' 
require 'rubygems' 
require 'ruby-prof'

# chương trình tạo file CSV với cấu trúc
# 1, John McTest, 1980-07-01
# 2, Peter McGregor, 1985-12-23 
# 3, Sylvia McIntosh, 1989-06-13

def generate_test_data
   50000.times.map do |i|
       name = ["John", "Peter", "Sylvia"][rand(3)] + " " +
                       ["McTest", "McGregor", "McIntosh"][rand(3)]
       [i, name, Time.at(rand * Time.now.to_i).strftime("%Y-%m-%d") ].join(',')
   end.join("\n") 
end

def parse_data(data)
   data.split("\n").map! { |row| parse_row(row) }
end

def parse_row(row)
   row.split(",").map! { |col| parse_col(col) }
end

def parse_col(col) 
   if col =~ /^\d+$/
      col.to_i
   elsif col =~ /^\d{4}-\d{2}-\d{2}$/
      Date.parse(col)
   else
      col
   end 
end

def find_youngest(people)
   people.map! { |person| person[2] }.max
end

data = generate_test_data 
GC.disable
result = RubyProf.profile do
   people = parse_data(data)
   find_youngest(people)
end

printer = RubyProf::FlatPrinter.new(result)
printer.print(File.open("app_flat_profile.txt", "w+"), min_percent: 3) 
printer = RubyProf::GraphPrinter.new(result)
printer.print(File.open("app_graph_profile.txt", "w+"), min_percent: 3) 
printer = RubyProf::CallStackPrinter.new(result)
printer.print(File.open("app_call_stack_profile.html", "w+"))
```

Chương trình trên sẽ tạo random CSV với danh sách những người và bao gồm ngày sinh, xử lý nó và tìm ra người trẻ nhất từ danh sách. Ta sẽ in ra 3 bản báo cáo theo 3 loại trên. Và giới hạn để in các hàm mất nhiều hơn 3% tổng thời gian.

#### Flat report: Tìm các hàm chạy chậm 
Flat profile sẽ hiển thị tổng thời gian mỗi hàm khi chạy. VD với chương trình trên ta có:

Thread ID: 70137029546800 

Fiber ID: 70137039955760 

Total: 1.882948

Sort by: self_time

| %self |   total |     self    |  wait |    child   |  calls | name |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 27.33 | 1.354 | 0.515 | 0.000 | 0.839 | 150000 | Object#parse_col |
| 22.31 | 0.806 | 0.420 | 0.000 | 0.386 | 50000 | <Class::Date>#parse |
| 8.59 | 0.162 | 0.162 | 0.000 | 0.000 | 100000 | Regexp#match |
| 5.11 | 1.707 | 0.096 | 0.000 | 1.611 | 50000 | Object#parse_row |
| 4.79 | 1.797 | 0.090 | 0.000 | 1.707 | 50002 | Array#map! |
| 4.66 | 0.088 | 0.088 | 0.000 | 0.000 | 50001 | String#split |
| 4.46 | 0.084 | 0.084 | 0.000 | 0.000 | 50000 | String#gsub! |

Trong đó:

`%self`: là phần trăm trên tổng thời gian tiêu tốn cho hàm này.

`total`: là tổng thời gian mất cho hàm này, bao gồm thời gian thực thi của hàm khi được gọi.

`self`: là thời gian tiêu tốn cho hàm đó, không bao gồm thời gian thực thi khi nó gọi.

`wait`: là thời gian chờ các thread khác. Nó sẽ luôn là 0 với ứng dụng đơn thread. 

`child`: là thời gian tiêu tốn trong các hàm được gọi từ hàm hiện tại 

`calls`: là tổng số lời gọi đến hàm đó 

Flat report được sắp xếp theo thời gian. Vì vậy các hàm ở trên cùng là hàm chạy tốn thời gian nhất. 

Và giá trị self time trong báo cáo là tổng số thời gian chạy của tất cả lời gọi đến hàm đó, không phân biệt bất cứ lời gọi nào trong code. VD, hàm `String#split` được gọi trực tiếp từ parse_data và 50.000 lần trong vòng lặp parse_row. Trong báo cáo, ta thấy hàm String#split được gọi tất cả 50.001 lần.

Hãy lưu ý là self time không bao gồm thời gian các lời gọi hàm lồng nhau. VD, self time của Object#parse_col không gồm thời gian chạy tìm kiếm regular expresson hay quá trình biên dịch date. Mặc dù chỉ với một hàm đơn giản với chỉ một biểu thức if-else, Object#parse_col vẫn mất một khoảng thời gian đáng kể. 

Ta đều biết, hàm trên cùng là chạy chậm nhất. Vì vậy cần tối ưu nó đầu tiên. Nhưng quá trình tối ưu hoá không dễ dàng. Nó không thể tối ưu hàm chậm nhất bằng self time, vì 2 lý do:

- Profiler chỉ báo cáo một khoảng self time lớn cho một hàm thậm chí cả khi bạn tăng tốc nó.. VD, Object#parse_col không làm gì trong này. Tất cả là do thực thi biểu thức if-else..
- Hàm chậm nhất có thể là một hàm thư viên hay đủ đơn giản để bạn không thể tối ưu. VD, Array#map là hàm chậm thứ 3. Nhưng nó là một thư viện và chúng ta không thể trực tiếp sửa.

Cả 2 trường hợp trên thực ra là do bởi số lời gọi hàm hơn là code trong hàm. Vì vậy, cách hiểu quả nhất để tối ưu là giảm bớt số lời gọi hàm. Và bạn cần biết hàm được gọi ở đâu và thường xuyên như nào. Nhưng trong báo cáo flat report không hiển thị điều đó. Vậy, bạn cần profile khác, đó là graph report - báo cáo đồ thị.

#### Graph report: Hiểu được những phần code nào chậm 

Graph report được sắp xếp theo tổng số thời gian chạy hàm, bao gồm thời gian từ lúc gọi hàm. 

Thread ID: 70137029546800 

Fiber ID: 70137039955760

Total Time: 1.8829480049999994 

Sort by: total_time

| %self  |  total   |  self |    wait |   child |  calls | name |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
|100.00%|0.01%|1.883|0.000|1.883|1|Global#[No method]|
|||1.777|0.000|1.777|1/1|Object#parse_data|
|||0.106|0.000|0.106|1/1|Object#find_youngest|
|95.46%|4.79%|0.000|0.000|0.000|50000/50002|Object#parse_row|
|||0.031|0.031|0.000|1/50002|Object#find_youngest|
|||1.767|0.060|1.707|1/50002|Object#parse_data|
|||1.797|0.090|1.707|50002|Array#map!|
|||1.707|0.096|1.611|50000/50000|Object#parse_row|
|||1.354|0.515|0.839|150000/150000|Object#parse_col|
|94.39%|0.00%|1.777|0.000|1.777|1/1|Global#[No method]|
|||1.777|0.000|1.777|1|Object#parse_data|
|||1.767|0.060|1.707|1/50002|Array#map!|
|||0.010|0.010|0.000|1/50001|String#split|
|90.67%|5.11%|1.707|0.096|1.611|50000/50000|Array#map!|
|||1.707|0.096|1.611|50000|Object#parse_row|
|||0.077|0.077|0.000|50000/50001|String#split|
|||0.000|0.000|0.000|50000/50002|Array#map!|
|71.88%|27.33%|1.354|0.515|0.839|150000/150000|Array#map!|
|||1.354|0.515|0.839|150000|Object#parse_col|
|||0.806|0.420|0.386|50000/50000|<Class::Date>#parse|
|||0.033|0.033|0.000|50000/50000|String#to_i|
|42.79%|22.31%|0.806|0.420|0.386|50000/50000|Object#parse_col|
|||0.806|0.420|0.386|50000|<Class::Date>#parse|
|||0.162|0.162|0.000|100000/100000|Regexp#match|
|||0.084|0.084|0.000|50000/50000|String#gsub!|
|||0.046|0.046|0.000|50000/50000|String#[]=|
|||0.039|0.039|0.000|50000/50000|MatchData#begin|
|||0.031|0.031|0.000|50000/50000|Fixnum#div|
|||0.024|0.024|0.000|50000/50000|MatchData#end|
|8.59%|8.59%|0.162|0.162|0.000|100000/100000|<Class::Date>#parse|
|||0.162|0.162|0.000|100000|Regexp#match|
|5.61%|0.00%|0.106|0.000|0.106|1/1|Global#[No method]|
|||0.106|0.000|0.106|1|Object#find_youngest|
|||0.075|0.000|0.075|1/1|Enumerable#max|
|||0.031|0.031|0.000|1/50002|Array#map!|
|4.66%|4.66%|0.010|0.010|0.000|1/50001|Object#parse_data|
|||0.077|0.077|0.000|50000/50001|Object#parse_row|
|||0.088|0.088|0.000|50001|String#split|
|4.46%|4.46%|0.084|0.084|0.000|50000/50000|<Class::Date>#parse|
|||0.084|0.084|0.000|50000|String#gsub!|
|3.98%|0.00%|0.075|0.000|0.075|1/1|Object#find_youngest|
|||0.075|0.000|0.075|1|Enumerable#max|
|||0.075|0.035|0.040|1/1|Array#each|
|3.98%|1.87%|0.075|0.035|0.040|1/1|Enumerable#max|
|||0.075|0.035|0.040|1|Array#each|
|||0.040|0.040|0.000|49999/49999|Date#<=>|

Ý nghĩa của các cột cũng tương tự như flat report. Nhưng với các lời gọi hàm ngay lập tức sẽ được để ở trên và những lời gọi được gọi thì sẽ để bên dưới. 

Dòng thứ 2 là Array#map! yêu cầu nhiều nỗ lực hơn. Hàm chạy ở giữa, bởi vì bao gồm cả 3 lời gọi ở trên và 2 lời được gọi ở dưới. 

Cột Calls hiển thị Array#map! 50.002 lần: 50.000 lần là từ Object#parse_now, một là từ Object#find_youngest, và một là từ Object#parse_data. 

Cột timing cho lời gọi có nghĩa khác. Mỗi lời gọi sẽ hiển thị total, self và child mà Array#map! cần khi lời gọi được thực thi. 

Thông tin hữu ích có từ bài report đó là thứ nhất, chúng ta có thể lấy được cái nhìn toàn cảnh tại nơi chương trình chạy. VD, chương trình chạy mất hầu như 90% thời gian dữ liệu xử lý các dòng CSV. Thứ hai, chúng ta có thể theo dấu profile từ trên xuống dưới để chỉ ra ý tưởng phần code nào chúng ta nên tối ưu. VD, chúng ta thấy được hàm chậm nhất thông qua tổng thời gian Array#map! gọi  Object#parse_row. Đó là gọi String#split, có thời gian self time khá nhiều. Vì vậy có một cách để tối ưu đó là giảm số lượng lời gọi String#split hay thay thế chúng với hàm khác.