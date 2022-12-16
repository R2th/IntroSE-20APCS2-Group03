Chắc hẳn là các lập trình viên chúng ta đã rất thân thuộc với các thao tác quen mắt như: `CSV.read`, `CSV.open`, `CSV.foreach`... khi làm việc với các file csv trong RoR Project.
Nhưng chưa hẳn chúng ta đã để ý tới sự khác nhau và việc ảnh hưởng đến bộ nhớ cũng như performance khi sử dụng những thao tác đó.

Thật ra, nếu làm việc với các file csv dữ liệu bé thì giữa các thao tác nêu trên không có sự khác biệt quá lớn. Nhưng nếu làm việc với file csv dữ liệu lớn thì sao???

Trong khi xử lý các tệp lớn là một hoạt động chuyên sâu về bộ nhớ và có thể khiến máy chủ hết bộ nhớ RAM và chuyển sang đĩa. 

Ở phạm vi bài viết này chúng ta cùng nhau đi tìm hiểu một vài phương pháp xử lý file csv dung lượng lớn với Ruby và đo mức tiêu thụ bộ nhớ, hiệu suất tốc độ.

Trước khi bắt đầu, ta cùng chuẩn bị một file csv `data.csv` với dung lượng thật lớn dữ liệu cỡ 1 triệu dòng (~ 75 MB) như sau:

```
require "csv"
require_relative "./helpers"

headers = ["id", "name", "email", "city", "street", "country"]

name    = "Pink Dream"
email   = "pinkdream@example.com"
city    = "Pink City"
street  = "Pink Road"
country = "Pink Country"

print_memory_usage do
  print_time_spent do
    CSV.open("data.csv", "w", write_headers: true, headers: headers) do |csv|
      1_000_000.times do |i|
        csv << [i, name, email, city, street, country]
      end
    end
  end
end

```

**Bộ nhớ được sử dụng và thời gian sử dụng**

Chúng ta sẽ cần `helpers.rb` xác định hai phương thức trợ giúp để đo và in ra bộ nhớ được sử dụng và thời gian sử dụng như sau:

```
require 'benchmark'

def print_memory_usage
  memory_before = `ps -o rss= -p #{Process.pid}`.to_i
  yield
  memory_after = `ps -o rss= -p #{Process.pid}`.to_i

  puts "Memory: #{((memory_after - memory_before) / 1024.0).round(2)} MB"
end

def print_time_spent
  time = Benchmark.realtime do
    yield
  end

  puts "Time: #{time.round(2)}"
end

```
Và. kết quả để tạo tệp CSV là:
```
$ ruby generate_csv.rb
Time: 5.17
Memory: 1.08 MB
```

Đầu ra có thể khác nhau giữa các máy, nhưng vấn đề là khi xây dựng tệp CSV, quá trình Ruby không tăng đột biến trong việc sử dụng bộ nhớ vì bộ thu gom rác (GC) đã lấy lại bộ nhớ đã sử dụng. Sự gia tăng bộ nhớ của quá trình này là khoảng 1MB, và nó tạo ra một tập tin CSV với kích thước 75 MB.


### Đọc CSV từ một tệp cùng một lúc (CSV.read)

Ta sẽ xây dựng một đối tượng CSV từ một tệp (data.csv) và lặp lại với tập lệnh sau:

```
require_relative "./helpers"
require "csv"

print_memory_usage do
  print_time_spent do
    csv = CSV.read("data.csv", headers: true)
    sum = 0

    csv.each do |row|
      sum += row["id"].to_i
    end

    puts "Sum: #{sum}"
  end
end

Kết quả là:
$ ruby parse1.rb
Sum: 499999500000
Time: 19.84
Memory: 920.14 MB

```

### Phân tích cú pháp CSV từ trong bộ nhớ chuỗi (CSV.parse)

Xây dựng một đối tượng CSV từ một nội dung trong bộ nhớ như sau:

```
require_relative "./helpers"
require "csv"

print_memory_usage do
  print_time_spent do
    content = File.read("data.csv")
    csv = CSV.parse(content, headers: true)
    sum = 0

    csv.each do |row|
      sum += row["id"].to_i
    end

    puts "Sum: #{sum}"
  end
end

Kết quả là:
$ ruby parse1.rb
Sum: 499999500000
Time: 19.84
Memory: 920.14 MB
```

Chúng ta để ý thấy, ở đây là bộ nhớ lớn tăng đột biến lên 920 MB (thatlavidieu).
Điều này xảy ra bởi vì chúng ta vừa xây dựng toàn bộ đối tượng CSV trong bộ nhớ. Chính vì thế mà đã gây ra rất nhiều đối tượng String được tạo bởi thư viện CSV và bộ nhớ đã sử dụng cao hơn nhiều so với kích thước thực tế của tệp CSV.

### Phân tích cú pháp dòng CSV theo dòng từ chuỗi trong bộ nhớ (CSV.new)

Bây giờ chúng ta sẽ tải nội dung tập tin trong một String và phân tích nó theo từng dòng để xem điều gì sẽ xảy ra

```ruby
require_relative "./helpers"
require "csv"

print_memory_usage do
  print_time_spent do
    content = File.read("data.csv")
    csv = CSV.new(content, headers: true)
    sum = 0

    while row = csv.shift
      sum += row["id"].to_i
    end

    puts "Sum: #{sum}"
  end
end

Kết quả là:
$ ruby parse3.rb
Sum: 499999500000
Time: 9.73
Memory: 74.64 MB

```

Từ kết quả chúng ta có thể thấy rằng bộ nhớ được sử dụng cỡ bằng kích thước tệp (75 MB) vì nội dung tệp được tải trong bộ nhớ và thời gian xử lý nhanh hơn gấp hai lần. 
`Cách tiếp cận này rất hữu ích khi chúng ta có nội dung mà chúng ta không cần đọc nó từ một tệp và chỉ muốn lặp lại nó theo từng dòng.`

### Phân tích cú pháp tệp CSV theo dòng từ đối tượng IO

Liệu có cách nào xử lý tốt hơn so với cách trước?
Câu trả lời là: Có, nếu chúng ta có nội dung CSV trong một tệp thì hãy sử dụng một đối tượng tập tin IO trực tiếp:

```ruby
require_relative "./helpers"
require "csv"

print_memory_usage do
  print_time_spent do
    File.open("data.csv", "r") do |file|
      csv = CSV.new(file, headers: true)
      sum = 0

      while row = csv.shift
        sum += row["id"].to_i
      end

      puts "Sum: #{sum}"
    end
  end
end

Kết quả là:
$ ruby parse4.rb
Sum: 499999500000
Time: 9.88
Memory: 0.58 MB
```

Sau khi chạy xong thì 1 MB bộ nhớ tăng lên tuy thời gian có vẻ chậm hơn rất nhiều so với cách làm trước vì có nhiều IO tham gia hơn. 
Và thư viện CSV có cơ chế tích hợp cho điều này, đó chính là `CSV.foreach`:

```
require_relative "./helpers"
require "csv"

print_memory_usage do
  print_time_spent do
    sum = 0

    CSV.foreach("data.csv", headers: true) do |row|
      sum += row["id"].to_i
    end

    puts "Sum: #{sum}"
  end
end

Kết quả tương tự:
$ ruby parse5.rb
Sum: 499999500000
Time: 9.84
Memory: 0.53 MB

```

Chúng ta có thể thấy rất rõ kết quả khi dùng `CSV.foreach`, không chỉ thời gian xử lý nhanh mà việc sử dụng bộ nhớ cũng được giảm đáng kể :D

=> Khi các bạn cần cần xử lý các tệp CSV lớn có dung lượng từ 10GB trở lên thì cứ mạnh dạn mà sử dụng cách cuối cùng nhé. `foreach` luộn đồng hành cùng bạn =))

Bài viết được dịch và tham khảo từ [đây](https://dalibornasevic.com/posts/68-processing-large-csv-files-with-ruby)

**Thanks for your reading!**