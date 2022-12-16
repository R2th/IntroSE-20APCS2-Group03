Làm việc với những file dữ liệu lớn, điển hình là CSV không phải là chuyện hiếm gặp. Với Ruby, có khá nhiều cách để xử lý thông tin những file này, nhưng hay cùng kiểm chứng xem tài nguyên hệ thống được tiêu tốn thế nào cho mỗi cách.

Khởi tạo môi trường
```
Ruby version : 2.4.0
Operation : macOS SierraSierra 10.12.5
Processor : 2.7 GHz Intel Core i5
Memory : 8 GB 1867 MHz DDR3
```

Tạo file helpers.rb chứa method hiển thị thời gian và lượng bộ nhớ sử dụng :
```ruby
require "benchmark"

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

Sau đó thử 1 file csv khoảng trên dưới 1 triệu dòng.
```ruby
require "csv"
require_relative "./helpers"

headers = ["id", "name", "email"]

name    = "Elijah Mikaelson"
email   = "elijah@mikaelson.com"

print_memory_usage do
  print_time_spent do
    CSV.open("data.csv", "w", write_headers: true, headers: headers) do |csv|
      1_000_000.times do |i|
        csv << [i, name, email]
      end
    end
  end
end
```

Với máy mình, đây là thông số được trả về khi tạo file csv trên :
```
Time: 4.69
Memory: 0.14 MB
```

File data.csv tạo ra có dung lượng khoảng 43 MB. 

## Sử dụng CSV.read để đọc cả file
```ruby
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
```
Sum: 499999500000
Time: 10.85
Memory: 626.81 MB
```
Xử lý file csv có 43 MB mà đã dùng tới hơn 600 MB, điều này thật sự là không ổn. Điều này xảy ra do có quá nhiều String object được tạo ra, và không được dọn dẹp ngay sau khi đã sử dụng.

## Sử dụng CSV.parse
Lần này ta đọc file csv sau đó khởi tạo thành một CSV object để sử dụng.
```ruby
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
```
Sum: 499999500000
Time: 11.1
Memory: 638.34 MB
```
Hiển nhiên bộ nhớ tiêu tốn tăng lên do chứa cả object CSV ta vừa parse được.

## Xử lý từng dòng của file
```ruby
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

Sum: 499999500000
Time: 9.27
Memory: 42.85 MB
```
Đã thấy sự khác biệt, với cách đọc từng dòng này, ta chỉ tốn bộ nhớ lưu lại CSV object, kích thước tương đương dung lượng file csv thực tế.

## Xử lý từng dòng của file từ IO object
```ruby
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

Sum: 499999500000
Time: 9.93
Memory: 0.23 MB
```
Bạn có thấy gì không, chỉ 0.23 MB thôi ?

Hoặc ta có thể dùng CSV.foreach

```ruby
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

Sum: 499999500000
Time: 9.65
Memory: 0.2 MB
```
Để tạo ra sự khác biệt này, theo mình khi sử dụng IO object, thực chất ta đang stream nội dung của object, dùng tới đâu load tới đó chứ không phải load tất cả nội dung file vào bộ nhớ, từ đó dẫn tới sự khác biết hoàn toàn bộ nhớ.

## Kết luận
Phần lớn các trường hợp ta xử lý file csv lớn đều không cần load tất cả vào bộ nhớ làm gì, vì vậy ta hoàn toàn có những cách để xử lý để tiết kiệm tài nguyên hệ thống triệt để.