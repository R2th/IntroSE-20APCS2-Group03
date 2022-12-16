Tiếp tục seri dịch cuốn Ruby performance optimization, trong bài viết này, chúng ta sẽ cùng tìm hiểu về phần 2 - Sửa vấn đề hiệu năng phổ biến

Nguyên nhân code bị chậm hầu như chỉ đến từ một vài nguyên nhân phổ biển. Đặc biệt là với các lập trình Ruby, thay vì tập trung viết code thuần để giải quyết, chúng ta lại sử dụng lạm dụng quá mức các tính năng của ngôn ngữ, các thư viện chuẩn, các gem và framework. Mỗi cái đấy lại đưa đến các vấn đề hiệu năng riêng. Có thể là không hiệu quả trong việc thiết kế bộ nhớ. Do đó chúng ta cần cực kỳ cẩn thận trong cách viết code và các tính năng hay ngôn ngữ mà chúng ta sử dụng đến.

Có 2 nguyên nhân phổ biến dẫn đến hiệu năng kém trong phần trước đó là do khởi tạo quá nhiều bộ nhớ và việc sao chép lại cấu trúc dữ liệu.

Sao chép bối cảnh thực thi code, lặp lại bộ nhớ quá nặng, chuyển đổi kiểu dữ liệu lâu, và các hàm lặp lại không an toàn là một trong các số ít vấn đề. Trong phần này, chúng ta sẽ lần lượt đi qua các bước để phòng tránh. Nhưng trước hết, cần xem lại các công cụ để đo, đánh giá nguyên nhân.

Trong phần trước chúng ta đã sử dụng `Benchmark.realtime` để đo thời gian chạy code và `'ps -o rss= -p #{Process.pid}'.to_i` để đo dung lượng bộ nhớ được sử dụng khi code chạy. Để hiểu hơn cách giảm bộ nhớ tiêu thụ trong việc cải thiện hiệu năng, chúng ta cũng đo số lượng lời gọi hàm GC. Ruby cung cấp hàm `GC#stat` để trả về số lượng lời gọi GC.

Chúng ta sẽ xây dựng một công cụ để đo các thông số, thời gian thực thi code, số lần chạy GC, tổng số bộ nhớ được khởi tạo, kết hợp sử dụng option --no-gc và tắt GC để so sánh.

```ruby
require "json" 
require "benchmark"

def measure(&block)
no_gc = (ARGV[0] == "--no-gc")

if no_gc GC.disable
else
# collect memory allocated during library loading # and our own code before the measurement GC.start
end

memory_before = `ps -o rss= -p #{Process.pid}`.to_i/1024 gc_stat_before = GC.stat
time = Benchmark.realtime do
    yield 
 end
puts ObjectSpace.count_objects unless no_gc
    GC.start(full_mark: true, immediate_sweep: true, immediate_mark: false)
end
puts ObjectSpace.count_objects
gc_stat_after = GC.stat
memory_after = `ps -o rss= -p #{Process.pid}`.to_i/1024

  puts({
    RUBY_VERSION => {
        gc: no_gc ? 'disabled' : 'enabled',
        time: time.round(2),
        gc_count: gc_stat_after[:count] - gc_stat_before[:count], memory: "%d MB" % (memory_after - memory_before)
    } 
 }.to_json)
end
```

Công cụ đo bộ nhớ với GC và không có GC sẽ khác nhau. Trong các trường hợp thông thường, chúng ta sẽ lấy số lượng bộ nhớ được khởi tạo bởi blockblock. Chúng ta sẽ dùng số liệu này để tìm ra bộ nhớ bị thừa. 

Bước đầu tiên để làm cho ứng dụng nhanh hơn là tiết kiệm bộ nhớ. Mỗi khi bạn tạo hay sao chép cái gì trong bộ nhớ, tức là bạn đã thêm việc cho GC. Dưới đây là các cách để viết code không dùng quá nhiều bộ nhớ.

#### Sửa chuỗi string ở chính nó

Chương trình Ruby sử dụng rất nhiều chuỗi, và sao chép cũng rất nhiều. Trong hầu hết trường hợp, chúng thực sự không cần thiết. Bạn có thể sửa các chuỗi tại một chỗ, nghĩa là thay vì tạo ra rất nhiều phiên bản sao chép đã được thay đổi, bạn có thể thay đổi trên chuỗi ban đầu. 

Ruby có một nhóm các hàm `bang!` để sửa ngay tại chính object đó. VD gsub!, capitalize!, downcase!, upcase!, delete!, reverse!, slice!, ... Nó là ý tưởng rất hay khi bạn không còn cần phải giữ lại chuỗi ban đầu. 

```ruby
require 'wrapper'

str="X"*1024*1024*10 #10MBstring
measure do
    str = str.downcase
end

measure do
    str.downcase!
end

$ ruby -I . string_in_place1.rb --no-gc 
{"2.2.0":{"gc":"disabled","time":0.02,"gc_count":0,"memory":"9 MB"}} 
{"2.2.0":{"gc":"disabled","time":0.01,"gc_count":0,"memory":"0 MB"}}
```

Hàm String#downcase được gọi ở dòng 5 đã khởi tạo khoảng 10MB bộ nhớ để thực hiện sao chép một chuỗi, sau đó thay đổi nó thành lowercase. Với hàm bang ở dòng 8, bạn không cần thêm bộ nhớ cho việc đó. 

Một hàm rất hữu ích cho chuỗi đó là `<<`. Nó sẽ cộng ghép chuỗi bằng cách gắn một chuỗi mới vào chuỗi gốc. Khi được yêu cầu thêm một chuỗi cho chuỗi khác, hầu hết dev sẽ viết là:

```ruby
x = "foo" 
x += "bar"

 Đoạn code này tương ứng với
x = "foo"
y = x + "bar" 
x = y
```

Khi đó Ruby sẽ khởi tạo thêm bộ nhớ để lưu trữ kết quả của việc ghép chuỗi. Code sử dụng toán tử shift sẽ không cần phải thêm bộ nhớ bổ sung nếu kết quả chuỗi của bạn nhỏ hơn 40 byte ( với kiến trúc 64 bit ). Nếu chuỗi lớn hơn, Ruby sẽ chỉ khởi tạo đủ bộ nhớ để lưu thêm chuỗi được thêm. Khi đó, ta nên viết lại là:

```ruby
x = "foo" 
x << "bar"
```

#### Sửa mảng và hash trên chính nó 

Tương tự như các chuỗi, mảng và hash cũng có thể được chỉnh sửa lại trên chính nó. Nếu bạn xem trong tài liệu Ruby API, bạn sẽ thấy các hàm bang! như  map!, select!, reject!, .... Ý tưởng tương tự như trên, bạn không cần phải tạo các bản sao được chỉnh sửa lại cho mảng ban đầu nếu không thực sự cần thiết.

```ruby
# không dùng bang!
require 'wrapper'

data = Array.new(100) { "x" * 1024 * 1024 }
measure do
    data.map { |str| str.upcase }
end

# dùng bang!
require 'wrapper'

data = Array.new(100) { "x" * 1024 * 1024 }
measure do
    data.map! { |str| str.upcase! }
end

# kết quả
                                           map and upcase     map! and upcase!
Tổng thời gian      0.22 s                 0.14 s
Bộ nhớ thêm         100 MB                 0 MB
Lời gọi GC           3                      0
```

Code đã nhanh hơn 35% chỉ với việc thêm kí tự !., rất đơn giản.

#### Đọc file từng dòng một 

Sẽ rất tốn bộ nhớ khi đọc toàn bộ file. Dĩ nhiên, trong một vài trường hợp điều đó sẽ rất tiện lợi. Nhưng thông thường, với Ruby, thì sẽ cực kì tốn bộ nhớ. Nó sẽ không hiệu quả, VD khi đọc 1 file CSV có 26MB dữ liệu, thì nó sẽ thêm đúng 26 MB bộ nhớ. 

```ruby
require 'wrapper' 

measure do
    File.read("data.csv") 
end

$ ruby -I . file_reading1.rb --no-gc 
{"2.2.0":{"gc":"disabled","time":0.02,"gc_count":0,"memory":"25 MB"}}
```

Ở đây, chúng ta chỉ đơn giản tạo một đối tượng File và lưu 26 MB chuỗi tại đó. Không cần thêm bộ nhớ. Nhưng mọi thứ lại rất nhanh trở nên kém hiệu quả khi chúng ta cố gắng đọc file. Khi đó, cần tiêu tốn 158 MB để chia file CSV đó thành các dòng và cột.  

```ruby
require 'wrapper' 
measure do
    File.readlines("data.csv").map! { |line| line.split(",") } 
end

$ ruby -I . file_reading2.rb --no-gc 
{"2.2.0":{"gc":"disabled","time":0.45,"gc_count":0,"memory":"186 MB"}}
```

Vậy cách Ruby sử dụng bộ nhớ cho trường hợp này là như nào? File sẽ có khoảng 163.000 hàng dữ liệu trong 11 cột. Vì vậy, để lưu toàn bộ nội dung đã được dịch, chúng ta cần khởi tạo 163.000 đối tượng hàng và 1.793.000 đối tượng cột, tổng cộng là 1.956.000 đối tượng. Với kiến trúc 64 bit, nó yêu cầu xấp xỉ 75 MB. Cùng với 26 MB cho việc đọc file, chương trình chúng ta cần thêm ít nhất 101 MB bộ nhớ. Thêm vào đó, không phải tất cả các chuỗi đủ nhỏ để vừa vào 40 byte của đối tượng Ruby, nên Ruby cần khởi tạo nhiều bộ nhớ hơn để lưu trữ chúng. Nghĩa là cần thêm 85MB để dùng. Kết quả là chương trình đơn giản đã tiêu tốn gấp 7 lần kích thước dữ liệu sau khi được dịch.

Nhưng bộ dịch CSV của Ruby còn tốn nhiều hơn khi cần 346 MB bộ nhớ, gấp 13 lần kích thước dữ liệu.

```ruby
require 'wrapper' 
require 'csv'

measure do 
    CSV.read("data.csv")
end

$ ruby -I . file_reading3.rb --no-gc
{"2.2.0":{"gc":"disabled","time":2.66,"gc_count":0,"memory":"368 MB"}}
```

Giải pháp cho vấn đề này là gì? Chúng ta có thể đọc và dịch dữ liệu file theo từng dòng nhiều nhất có thể. Trong phần trước, chúng ta đã thử và giúp tăng tốc gấp 2 lần 

```ruby
require 'wrapper'

measure do
    file = File.open("data.csv", "r") 
    while line = file.gets
        line.split(",") 
    end
end
```

và với CSV file

```ruby
require 'csv' 
require 'wrapper'

measure do
    file = CSV.open("data.csv") 
    while line = file.readline 
    end
end
```

và kết quả là bộ nhớ vẫn được giữ nguyên như trước: 171 MB và 367 MB.

```ruby
$ ruby -I . file_reading4.rb --no-gc 
{"2.2.0":{"gc":"disabled","time":0.45,"gc_count":0,"memory":"171 MB"}} 

$ ruby -I . file_reading5.rb --no-gc 
{"2.2.0":{"gc":"disabled","time":2.64,"gc_count":0,"memory":"367 MB"}}
```

Nếu bạn nghĩ kỹ hơn, bạn sẽ hiểu. Không cần quan tâm cách chúng ta dịch file, theo 1 lần hay từng dòng, mà là cuối cùng khởi tạo cùng số lượng bộ nhớ. Và nhìn vào thời gian thực thi, nó cũng tương tự. Vậy khác nhau ở đâu?

Chúng ta cùng đo tổng số lượng bộ nhớ được khởi tạo. Điều này cần thiết khi chúng ta muốn biết chính xác tổng cộng có bao nhiêu bộ nhớ mà code cần sử dụng. Nhưng nó không có nghĩa là bộ nhớ bị rò rỉ. Trong thời gian code chạy, GC sẽ xoá ngay bộ nhớ không được dùng. Điều này sẽ giảm bớt cả số bộ nhớ tiêu thụ và thời gian GC bởi vì càng ít dữ liệu trong bộ nhớ tại thời điểm làm việc.

Khi chúng ta đọc file từng dòng, chúng ta yêu cầu Ruby là không cần quan tâm đến dòng trước. Khi đó, GC sẽ thu thập chúng khi chương trình đang chạy. Vì vậy, muốn thấy được sự tối ưu, bạn cần bật GC. 

```ruby
# Trước khi tối ưu 
$ ruby -I . file_reading2.rb 
{"2.2.0":{"gc":"enabled","time":0.68,"gc_count":11,"memory":"144 MB"}} 

$ ruby -I . file_reading3.rb 
{"2.2.0":{"gc":"enabled","time":3.25,"gc_count":17,"memory":"175 MB"}}


# Sau khi tối ưu 
$ ruby -I . file_reading4.rb 
{"2.2.0":{"gc":"enabled","time":0.44,"gc_count":106,"memory":"0 MB"}} 

$ ruby -I . file_reading5.rb 
{"2.2.0":{"gc":"enabled","time":2.62,"gc_count":246,"memory":"1 MB"}}
```

Bây giờ , bạn sẽ thấy tạo sao đọc file theo từng dòng là ý tưởng tốt. Đầu tiên, bạn hầu như sẽ không sử dụng thêm bộ nhớ. Thực tế, bạn sẽ chỉ lưu dòng bạn đang chạy. Thứ hai là chương trình sẽ chạy nhanh hơn. Tốc độ phụ thuộc vào kích thước dữ liệu. Nó sẽ có 35% cho việc đọc file và 20% cho CSV dịch.