Chắc hẳn các bạn đã quá quen thuộc với các file csv, hầu hết đã từng sử dụng, làm việc với chúng. Những lợi ích trước tiên mà ai cũng dễ nhận thấy là file csv có dung lượng nhẹ, xử lý truy xuất rất nhanh...Bài viết này giới thiệu một số điều cơ bản khi làm việc với file CSV trong ngôn ngữ Ruby

# CSV là gì?
Trước hết, file CSV(Comma Separated Values) là một định dạng văn bản, nơi các giá trị được ngăn cách nhau bởi dấu phẩy, định dạng CSV thường xuyên được sử dụng để lưu các bảng tính quy mô nhỏ như danh bạ, danh sách lớp, báo cáo…. 

Giả sử bạn có một nhà hàng và đang lưu thông tin của các khách hàng trong một file csv. Mỗi thông tin của một khách hàng là một hàng trong file csv gồm những thông tin sau:

- Tên của khách hàng
- Tổng số lần họ đến và thưởng thức bữa ăn tại nhà hàng
- Tổng số tiền mà họ đã sử dụng tại nhà hàng
- Một feedback ngắn của khách hàng để miêu tả thức ăn của nhà hàng

Chúng ta sẽ bắt đầu bằng file csv nhỏ chứa thông tin 4 khách hàng thường xuyên nhất, như sau:
![](https://images.viblo.asia/b10bbdc3-9701-476e-87dc-d4e648168484.jpg)

Với file csv trên, điều gì sẽ xảy ra khi ta mở nó bằng một trình plain text nào đó như notepad hay sublime, gía trị trong các dòng blank ở đây là gì?
```
    Dan,34,2548,Lovin it!
    Maria,55,5054,_____________
    Carlos,22,4352,_________________
    Stephany,34,6542,I want bigger steaks!!!!!
```
Thì 2 dòng blank sẽ là:
```
    Maria,55,5054,"Good, delicious food"
    Carlos,22,4352,"I am ""pleased"", but could be better"
```
Do vậy:
- Nếu trong một ô của file csv mà có dấu phẩy, thì bạn cần bao đoạn text của ô lại vào trong dấu nháy kép, như ở dòng thứ 2
- Nếu mọi thứ phức tạp hơn một chút, bên trong ô có dấu phẩy và dấu nháy kép trong ô thì ta cần gói dấu nháy kép vào trong một dấu nháy kép khác


# Xử lý file CSV trong Ruby
Chúng ta đã hiểu được file csv là gì và cách nó thể hiện, bây giờ chúng ta sẽ đi qua một vài cách cơ bản làm việc với file CSV trong Ruby.
Ruby có hẳn một thư viện về csv: https://ruby-doc.org/stdlib-2.0.0/libdoc/csv/rdoc/CSV.html, để xử dụng chúng bạn chỉ cần:
```
    require "csv"
```
Trong Ruby bạn có thể import file csv chỉ 1 lần(lưu toàn bộ file vào ram để xử lý) hoặc là lần lượt đọc và xử lý từng dòng một(row by row). Mỗi cách dùng đều có ưu điểm và nhược điểm riêng, chẳng hạn, bạn sẽ chẳng muốn import 1 file với khoảng 300 000 dòng một lần vào máy tính với Ram 512M => crash chương trình.
Cùng xem xét sự khác nhau ở ví dụ sau: Trước hết ta tạo 1 file csv có 1 triệu dòng và tính toán performance về ram và time xử lý:
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
    
    require 'csv'

headers = ['id', 'name', 'email', 'city', 'street', 'country']

name    = "Pink Panther"
email   = "pink.panther@example.com"
city    = "Pink City"
street  = "Pink Road"
country = "Pink Country"

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
Kết quả chúng ta mất 6.49s và 1.9M ram để tạo một file csv có độ lớn 74M
```
khuongs-MacBook-Pro:Downloads khuong$ ruby generate_csv.rb
Time: 6.49
Memory: 1.9 MB
khuongs-MacBook-Pro:Downloads khuong$ ls -lah data.csv
-rw-r--r--  1 khuong  staff    74M May 20 12:21 data.csv
```

Giờ nếu ta đọc file trên bằng cách load cả file vào một object 1 lần để đọc:
```
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
Và kết quả thu được thật khủng khiếp:
```
khuongs-MacBook-Pro:Downloads khuong$ ruby generate_csv.rb
Sum: 499999500000
Time: 16.59
Memory: 1073.66 MB
```
Tiêu tốn 16.59s và 1073.66MB Ram để đọc hết file csv trên, nhưng nếu sử dụng foreach để đọc lần lượt từng dòng một thì kết quả là:
```
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
```
khuongs-MacBook-Pro:Downloads khuong$ ruby generate_csv.rb
Sum: 499999500000
Time: 10.84
Memory: 0.84 MB
```

Thư viện cũng xử lý với đối tượng là string, không chỉ với file. Nếu bạn có một đối tượng string trong Ruby, các đoạn text được ngăn cách nhau bởi dấu phẩy, bạn có thể convert chúng đến một thể hiện của csv(nơi một bảng tương ứng với 1 mảng của những mảng khác(row)) với method CSV.parse:
```
a_string = "Dan,34\nMaria,55"
CSV.parse(a_string) #=> [["Dan", "34"], ["Maria", "55"]]
```

Bạn cũng có thể truyền vào một block với CSV.parse:
```
CSV.parse(a_string) { |row| puts row.inspect } 
#=> produces ["Dan", "34"] and ["Maria", "55"] on separate lines
```

Nói chung sử dụng CSV.parse mà không có block tương đương với CSV.read trong input. Còn CSV.parse với block tương đương với foreach.

# Nếu file CSV là SSV (semi-colon-separated values)?
Vào một ngày đẹp trời, bạn nhận được một file csv, nơi các ô trong file với những text không phải ngăn cách nhau bằng dấu phẩy mà là dấu chấm phẩy chẳng hạn:
```
James;1;43;Not bad
Robin;1;56;Fish is tasty
Anna;1;79;"Good; better; the best!"
```

Với 4 method bên trên trong thư viện ruby, ngoài tham số truyền vào đầu tiên là tên file, ta còn có thể khai báo một tham số thứ 2 như là optional. Tham số thứ 2 chứa đa dạng các options hướng dẫn cách Ruby xử lý từng kiểu file. Option được sử dụng phổ biến nhất là:
```
:col_sep => ';'
```
Giúp định dạng dấu ngăn cách ở đây là dấu chấm phẩy, khi đó tất cả method trên sẽ được thực hiện nếu ta add thêm một tham số thứ 2:
```
CSV.foreach('newcomers.csv', col_sep: ';') { |row| p row }
a_string = "Dan;34\nMaria;55"
CSV.parse(a_string, col_sep: ';') #=> [["Dan", "34"], ["Maria", "55"]]
```
Có nhiều kiểu option trong tham số thứ 2 này, chi tiết hơn các bạn có thể tham khảo tại: http://ruby-doc.org/stdlib-1.9.3/libdoc/csv/rdoc/CSV.html#method-c-new

# Làm quen với bài toán nhỏ
Trở lại với file customers.csv chứa thông tin những khách hàng thường xuyên nhất của cửa hàng. Bây giờ chúng ta cần tính số tiền trung bình được sử dụng mỗi lần họ đến. Thật dễ dàng cho chúng ta bằng cách chia tổng số tiền họ đã dùng cho tổng số lần họ đến:
```
average_money_spent = Array.new
  CSV.foreach('customers.csv') do |row|
    average_money_spent << row[2] / row[1]
    # row is just an ordinary array and you access its elements with []
  end #=> Undefined method '/' for "2548":String
```
Theo mặc định, mọi kiểu dữ liệu trong file csv đều được coi như string, nên trong trường hợp này số tiền hay số lần đến của khách hàng thực ra là các giá trị string. May mắn thay, bạn có thể custom lại mặc định thành các kiểu dữ liệu mong muốn bằng cách thêm option (converters: :numeric)
```
CSV.read('customers_separated_with_semicolons.csv', col_sep: ';', converters: :numeric)
```
Khi đó tất cả giá trị số sẽ được convert theo đúng format của chúng. Integer trở thành Fixnum, Decimal thành Float, ...

# In kết quả ra một file
Chúng ta sẽ add một kết mới tới sheet customer để hiển thị số tiền trung bình mỗi khách hàng tiêu khi đến nhà hàng. Nhắc lại nội dung file csv ban đầu của chúng ta là:
```
Dan,34,2548,Lovin it!
Maria,55,5054,"Good, delicious food"
Carlos,22,4352,"I am ""pleased"", but could be better"
Stephany,34,6542,I want bigger steaks!!!!!
```
Và chúng ta đã thực hiện đoạn code sau để tính giá trị trung bình:
```
average_money_spent = Array.new
CSV.foreach('customers.csv', converters: :numeric) do |row|
  average_money_spent << row[2] / row[1]
end
```

Lưu trữ nội dung file kết quả vào một array:
```
customers_array = CSV.read('test.txt')
customers_array.each do |customer|
 customer << average_money_spent.shift
end
```
Và tiến hành in array trên vào nội dung file csv mới:
```
CSV.open('our-new-customers-file.csv', 'w') do |csv_object|
  customers.array.each do |row_array|
    csv_object << row_array
  end
end
```

# Lời kết
Trên đây chúng ta đã đi 1 vòng quanh cơ bản về csv và thư viện csv của Ruby, chúng ta đã biết được cách csv làm việc và thao tác với chúng. Bài viết sẽ được tiếp tục trong phần tới. Thanks for read

Tham khảo:
https://ruby-doc.org/stdlib-2.0.0/libdoc/csv/rdoc/CSV.html

https://www.sitepoint.com/guide-ruby-csv-library-part/

https://dalibornasevic.com/posts/68-processing-large-csv-files-with-ruby