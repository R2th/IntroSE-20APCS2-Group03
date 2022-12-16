Xử lý các file lớn là một hoạt động đòi hỏi nhiều bộ nhớ và có thể khiến các máy chủ hết bộ nhớ RAM và disk. Hãy xem xét một số cách để xử lý tệp CSV bằng Ruby và đo mức tiêu thụ bộ nhớ và hiệu suất tốc độ.
- Trước khi bắt đầu, hãy chuẩn bị dữ liệu tệp test.csv với 1 triệu row (~ 75 MB) để sử dụng trong các thử nghiệm.
```
require 'csv'
require_relative './helpers'

headers = ['id', 'name', 'email', 'city', 'street', 'country']

name    = "Pink Panther"
email   = "pink.panther@example.com"
city    = "Pink City"
street  = "Pink Road"
country = "Pink Country"

print_memory_usage do
  print_time_spent do
    CSV.open('test.csv', 'w', write_headers: true, headers: headers) do |csv|
      1_000_000.times do |i|
        csv << [i, name, email, city, street, country]
      end
    end
  end
end
```
Chúng ta sẽ sử dụng benchmark để đo thời gian thực thi:
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
Kết quả khi tạo file test.csv:
```
Time: 5.17
Memory: 1.08 MB
```
Quá trình tạo file không tốn nhiều bộ nhớ do ruby sử dụng bộ gom rác (GC) đang lấy lại bộ nhớ đã sử dụng. Mức tăng bộ nhớ của quá trình là khoảng 1 MB và nó đã tạo ra một tệp CSV có kích thước 75 MB.

## Reading file csv
Bây giờ chúng ta sẽ tiến hành đọc file csv vừa tạo.
```
require_relative './helpers'
require 'csv'

print_memory_usage do
  print_time_spent do
    csv = CSV.read('data.csv', headers: true)
    sum = 0

    csv.each do |row|
      sum += row['id'].to_i
    end

    puts "Sum: #{sum}"
  end
end
```
Result:
```
Sum: 499999500000
Time: 19.84
Memory: 920.14 MB
```
Điều quan trọng cần lưu ý ở đây là bộ nhớ lớn tăng vọt lên tới 920 MB. Đó là bởi vì chúng tôi xây dựng toàn bộ đối tượng CSV trong bộ nhớ. Điều đó khiến rất nhiều đối tượng Chuỗi được tạo bởi thư viện CSV và bộ nhớ đã sử dụng cao hơn nhiều so với kích thước thực của tệp CSV.
## Parsing CSV from in memory String (CSV.parse)
```
require_relative './helpers'
require 'csv'

print_memory_usage do
  print_time_spent do
    content = File.read('data.csv')
    csv = CSV.parse(content, headers: true)
    sum = 0

    csv.each do |row|
      sum += row['id'].to_i
    end

    puts "Sum: #{sum}"
  end
end
```
result:
```
Sum: 499999500000
Time: 21.71
Memory: 1003.69 MB
```
Như chúng ta có thể thấy từ kết quả, mức tăng bộ nhớ là về mức tăng bộ nhớ so với ví dụ trước cộng với kích thước bộ nhớ của nội dung tệp mà chúng ta đọc trong bộ nhớ (75MB).
## Parsing CSV line by line from String in memory (CSV.new)
```
require_relative './helpers'
require 'csv'

print_memory_usage do
  print_time_spent do
    content = File.read('data.csv')
    csv = CSV.new(content, headers: true)
    sum = 0

    while row = csv.shift
      sum += row['id'].to_i
    end

    puts "Sum: #{sum}"
  end
end
```
result:
```
Sum: 499999500000
Time: 9.73
Memory: 74.64 MB
```
Từ kết quả, chúng ta có thể thấy rằng bộ nhớ được sử dụng có kích thước tệp (75 MB) do nội dung tệp được tải trong bộ nhớ và thời gian xử lý nhanh hơn khoảng hai lần. Cách tiếp cận này hữu ích khi chúng ta có nội dung mà chúng ta không cần phải đọc nó từ một tệp và chúng ta chỉ muốn lặp lại từng dòng một.
## Parsing CSV file line by line from IO object
```
require_relative './helpers'
require 'csv'

print_memory_usage do
  print_time_spent do
    File.open('data.csv', 'r') do |file|
      csv = CSV.new(file, headers: true)
      sum = 0

      while row = csv.shift
        sum += row['id'].to_i
      end

      puts "Sum: #{sum}"
    end
  end
end
```
Resutl:
```
Sum: 499999500000
Time: 9.88
Memory: 0.58 MB
```
chúng ta thấy tăng ít hơn 1 MB bộ nhớ. Thời gian dường như chậm hơn một chút so với kịch bản trước đó vì có nhiều IO tham gia.Thư viện CSV có một cơ chế tích hợp sẵn cho việc này đó là sử dụng **CSV.foreach**.
```
require_relative './helpers'
require 'csv'

print_memory_usage do
  print_time_spent do
    sum = 0

    CSV.foreach('data.csv', headers: true) do |row|
      sum += row['id'].to_i
    end

    puts "Sum: #{sum}"
  end
end
```
Result:
```
Sum: 499999500000
Time: 9.84
Memory: 0.53 MB
```
Hãy tưởng tượng bạn cần xử lý các tệp CSV lớn từ 10 GB trở lên. Quyết định sử dụng CSV.foreach là hợp lý nhất. Hy vọng bài viết này có thể giúp mọi người có thể xử lỳ file csv một cách hiệu quả.

Happy coding !!:raised_hand_with_fingers_splayed::raised_hand_with_fingers_splayed::raised_hand_with_fingers_splayed:

Source: https://dalibornasevic.com/posts/68-processing-large-csv-files-with-ruby