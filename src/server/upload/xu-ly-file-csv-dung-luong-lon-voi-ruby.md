Việc xử lý file lớn là một hoạt động cần bộ nhớ lớn và có thể khiến máy chủ hết RAM và đổi sang ổ đĩa. Chúng ta cùng xem một số cách xử lý tệp CSV với Ruby sau và cùng xem mức tiêu thụ bộ nhớ và tốc độ thực hiện.
## 1. Chuẩn bị file CSV mẫu
    
   
  Trước khi bắt đầu, chúng ta cần chuẩn bị một file CSV `data.csv` với một triệu bản ghi (~80M) để test. 
   
   Ở đây, chúng ta sẽ tạo ra file đó trong `user_csv.rb`
    
 ```
                require 'csv'
                require_relative './helpers'

                headers = ['id', 'name', 'email', 'city', 'street', 'country']

                name    = "DuongNT"
                email   = "nguyen.thuy.duong@framgia.com"
                city    = "Ha Noi City"
                street  = "Nguyen Trai Road"
                country = "Ha Dong Country"

                print_memory_usage do
                  print_time_spent do
                    CSV.open('data.csv', 'w', write_headers: true, headers: headers) do |csv|
                      1_000_000.times do |i|
                        csv << [i, name, email, city, street, country]
                      end
                    end
                  end
                end
```
    
## 2. Bộ nhớ cần sử dụng và thời gian thực hiện

 Để thực hiện được đoạn code trên, ta cần có file `helpers.rb` định nghĩa 2 helper methods để đo và tính toán bộ nhớ sử dụngvà thời gian thực hiện
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

Kết quả khi chạy user_csv.rb như sau:

```
$ ruby user_csv.rb
Time: 7.66
Memory: 0.77 MB
```

Kết quả có thể khác nhau do cấu hình mỗi máy nhưng vấn đề là khi tạo file CSV, quá trình xử lý của Ruby không tăng đột biến việc sử dụng bộ nhớ bởi vì garbage collector (GC) đã lấy lại được dữ liệu cũ đã sử dụng. Sự gia tăng bộ nhớ dùng để process là khoảng 1MB, và nó tạo một file CSV khoảng 86MB. Để kiểm chứng, chúng ta hãy xem:

```
$:: ls -lah data.csv
-rw-rw-r-- 1 duong duong 86M Mar 22 07:47 data.csv
```

## 3. Đọc file CSV từ một file cùng lúc (CSV.read)
Hãy build một object CSV từ file `data.csv` và iterate với đoạn code sau:

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

Kết quả là:

```
$:: ruby sum.rb
Sum: 499999500000
Time: 18.29
Memory: 917.71 MB
```

ĐIều cần lưu ý ở đây là bộ nhớ lên đến gần 920MB. Lý do là vì chúng ta build toàn bộ object CSV trong bộ nhớ, điều này dẫn đến rất nhiều đối tượng dạng String được tạo ra bởi thư viện CSV và việc sử dụng bộ nhớ quá nhiều so với kích thước thực tế của tập tin.

## 4.  Parse CSV từ bộ nhớ String (CSV.parse)

Giờ thử xem một cách khác nhé: Build một đối tượng CSV từ nội dung trong bộ nhớ có sẵn và iterate với đoạn code sau:

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
Kết quả như sau:
```
$:: ruby sum2.rb
Sum: 499999500000
Time: 18.14
Memory: 1050.32 MB
```

Bạn có thể thấy, việc bộ nhớ sử dung ở đây tăng là do sự gia tăng bộ nhớ từ ví dụ trước cộng với kích thước bộ nhớ của nội dung tập tin mà chúng ta đọc trong bộ nhớ(86MB)

## 5.  Parse từng dòng của file CSV dạng String từ bộ nhớ (CSV.new)
Chúng ta load nội dung file vào một String và parse nó từng dòng một
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
Kết quả như sau:

```
$:: ruby sum3.rb
Sum: 499999500000
Time: 9.9
Memory: 85.75 MB
```

Thật đáng ngạc nhiên! 

Kết quả trên cho ta thấy , bộ nhớ được sử dụng chỉ khoảng 86MB (xấp xỉ bằng dung lượng file). Điều này là vì nội dung file đưuọc load trong bộ nhớ và thời gian xử lý nhanh gấp 2 lần. Hướng tiếp cận này thực sự rất hữu ích khi mà chúng ta chỉ cần nội dung mà không nhất thiết phải đọc hết một tập tin mà chỉ cần đọc từng dòng một.

## 6.  Parse từng dòng của file CSV từ IO Object
Với cách trên, chúng ta thấy khá là tốt khi mà bộ nhớ sử dụng chỉ bằng với dung lượng của file. Như vậy có thực sự tốt chưa? Có cách nào đó tốt hơn không?

Câu trả lời là: Có! Nếu như chúng ta đã có nội dung của file CSV. Hãy sử dụng một file chứa đường dẫn của các IO object.

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

Kết quả như sau:
```
 $:: ruby sum4.rb
Sum: 499999500000
Time: 11.07
Memory: 0.26 MB
```

Ở cuối đoạn code trên ta thấy bộ nhớ sử dụng ít hơn 1M nhưng thời gian thì khá chậm so với các cách trước đó bỏi vì có thêm sự tham gia của IO. Thư viện CSV đã xây dựng cơ chế cho nó bằng cách sử dụng `CSV.foreach`, theo cách như sau:
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

Chúng ta có thể thấy kết quả của cuối cùng chạy như sau:

```
$:: ruby sum5.rb
Sum: 499999500000
Time: 11.33
Memory: 0.0 MB
```

Hãy tưởng tượng bạn cần xử lý một file CSV dung lượng lớn khoảng 10GB hoặc hơn thì việc sử dụng cách này là một lựa chọn tuyệt vời!!!