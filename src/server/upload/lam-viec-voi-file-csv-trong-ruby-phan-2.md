Ở bài viết này, mình xin giới thiệu một thư viện giúp import dữ liệu vào database với một lượng dữ liệu lớn, giúp ta cải thiện rất nhiều vấn đề về performance: activerecord-import
# activerecord-import là gì?

- activerecord-import là một thư viện hỗ trợ bulk insert dữ liệu với ActiveRecord
- Một trong những tính năng chính là follow các active record associations và tối thiểu hoá số lượng các câu insert SQL cần thiết, tránh vấn đề N+1 insert. Ví dụ: giả sử bạn có một schema như sau:
    + Publisher has many Books
    + Book has many Reviews

Và bạn muốn bulk insert 100 publishers mới, với mỗi publisher có 10k books, kèm theo 3 reviews cho mỗi book. Thư viện này sẽ follow quan hệ giữa chúng và chỉ sinh ra 3 câu query insert: một cho publisher, một cho book và một cho review.
Theo cách thông thường, với bài toán trên ActiveRecord sẽ tạo ra 100 câu insert cho các publishers, với mỗi publisher cần 10k insert book, nên sinh ra 100 * 10 000 = 1 000 000 câu query insert để insert hết đống books, và tương tự cần tới 3 triệu câu insert để insert hết đống reviews
Từ hơn 4M câu query insert đã được rút gọn lại chỉ còn 3, thực sự là performance đã được cải thiện rõ rệt, trong trường hợp trên, nó đã convert time để chạy batch insert từ 18h -> nhỏ hơn 2h
# Sử dụng
Để sử dụng activerecord-import chúng ta có 2 cách:
- Import gem trong list gem file:
```
gem 'activerecord-import'
```
- require sử dụng trong file bất kì:
```
require 'active_record'
require 'activerecord-import'
```
# activerecord-import làm được những gì?
- activerecord-import có thể làm việc với những cột và mảng các gía trị của nó(fastest)
- activerecord-import có thể làm việc với các đối tượng model(faster)
- activerecord-import có thể thực hiện các validations(fast)
- activerecord-import có thể update các records(mysql hoặc postgress 9.5+)

# activerecord-import cung cấp cho chúng ta những vũ khí gì?
Chúng ta sẽ tìm hiểu lần lượt các method mà thư viện activerecord-import cung cấp:

## 1.bulk_import(*args) ⇒ Object

- import một tập hợp các giá trị vào database, method này đặc biệt có hiệu quả hơn việc sử dụng các method của ActiveRecord như: ActiveRecord::Base#create hoặc ActiveRecord::Base#save nhiều lần. Method này hữu ích khi bạn muốn tạo nhiều bản ghi một lúc và không quan tâm đến return kết quả mỗi khi một bản ghi được insert. Nó có thể sử dụng với option check hoặc không check validation. Một điều lưu ý ở đây là nó sẽ bỏ qua các ActiveRecord::Callback trong suốt quá trình import, cách sử dụng:
```
Model.import array_of_models -> import bằng việc truyền vào một mảng các đối tượng của model mà bạn muốn import
Model.import column_names, array_of_models - > params đầu tiên là mảng các cột mà bạn muốn update, params thứ 2 là mảng các object của model
Model.import array_of_hash_objects
Model.import column_names, array_of_hash_objects
Model.import column_names, array_of_values
Model.import column_names, array_of_values, options -> tham số thứ 3 là option, là một hash, gồm các options được giới thiệu bên dưới
```

- Options:
   
   + validate: true hoặc false, quá trình import sẽ chạy validate hay không, mặc định là có
   + on_duplicate_key_ignore: true hoặc false, quá trình import sẽ bỏ qua các bản ghi trùng lặp(duplicate các primary key) và tiếp tục import hay không? Trong Postgress nó tương đương với: ON CONFLICT DO NOTHING hay trong Mysql là INSERT IGNORE
   + ignore: là một alias của on_duplicate_key_ignore
   + on_duplicate_key_update: một mảng hoặc một hash, nó tương tự như option ON DUPLICATE KEY UPDATE khi insert trong mysql, hay ON CONFLICT DO UPDATE trong Postgress.
   + synchronize: đồng bộ các bản ghi được chỉ định khi nó đc đang được import
   + batch_size: chỉ định số lượng tối đa các bản ghi mỗi lần insert. mặc định là all

ví dụ:
```
class BlogPost < ActiveRecord::Base ; end

# Example using array of model objects
posts = [ BlogPost.new author_name: 'Zach Dennis', title: 'AREXT',
          BlogPost.new author_name: 'Zach Dennis', title: 'AREXT2',
          BlogPost.new author_name: 'Zach Dennis', title: 'AREXT3' ]
BlogPost.import posts

# Example using array_of_hash_objects
# NOTE: column_names will be determined by using the keys of the first hash in the array. If later hashes in the
# array have different keys an exception will be raised. If you have hashes to import with different sets of keys
# we recommend grouping these into batches before importing.
values = [ {author_name: 'zdennis', title: 'test post'} ], [ {author_name: 'jdoe', title: 'another test post'} ] ]
BlogPost.import values

# Example using column_names and array_of_hash_objects
columns = [ :author_name, :title ]
values = [ {author_name: 'zdennis', title: 'test post'} ], [ {author_name: 'jdoe', title: 'another test post'} ] ]
BlogPost.import columns, values

# Example using column_names and array_of_values
columns = [ :author_name, :title ]
values = [ [ 'zdennis', 'test post' ], [ 'jdoe', 'another test post' ] ]
BlogPost.import columns, values

# Example using column_names, array_of_value and options
columns = [ :author_name, :title ]
values = [ [ 'zdennis', 'test post' ], [ 'jdoe', 'another test post' ] ]
BlogPost.import( columns, values, validate: false  )

# Example synchronizing existing instances in memory
post = BlogPost.where(author_name: 'zdennis').first
puts post.author_name # => 'zdennis'
columns = [ :author_name, :title ]
values = [ [ 'yoda', 'test post' ] ]
BlogPost.import posts, synchronize: [ post ]
puts post.author_name # => 'yoda'

# Example synchronizing unsaved/new instances in memory by using a uniqued imported field
posts = [BlogPost.new(title: "Foo"), BlogPost.new(title: "Bar")]
BlogPost.import posts, synchronize: posts, synchronize_keys: [:title]
puts posts.first.persisted? # => true
```

## 2.bulk_import!(*args) ⇒ Object

Import một tập hợp các giá trị nếu tất cả chúng là hợp lệ. Quá trình import sẽ fail khi gặp lỗi validation đầu tiên và raise lỗi ActiveRecord::RecordInvalid với instance bị lỗi:
```
# File 'lib/activerecord-import/import.rb', line 468

def bulk_import!(*args)
  options = args.last.is_a?( Hash ) ? args.pop : {}
  options[:validate] = true
  options[:raise_error] = true

  bulk_import(*args, options)
end
```
về cơ bản thì nó là sự kết hợp giữa import thông thường kèm với option validate và raise error

Và còn một số method khác nữa, các bạn có thể tìm hiểu chi tiết thêm tại: https://www.rubydoc.info/gems/activerecord-import/ActiveRecord/Base
# Ví dụ:

Chúng ta hãy bắt đầu một ví dụ đơn giản và tiến hành tính toán performance cho chúng:
Giả sử chúng ta có một schema đơn giản là company như sau:
```
class Company < ApplicationRecord
  validates :name, presence: true, uniqueness: true
end
```
Model company có trường name kiểu string, với validate là present và uniqueness.
Ta sẽ tạo một file csv với 1 triệu dòng, gồm 500k dòng valid và 500k dòng invalid:
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

headers = ['name']

print_memory_usage do
  print_time_spent do
    CSV.open('data.csv', 'w', write_headers: true, headers: headers) do |csv|
      500_000.times do |i|
        csv << ["company_name_#{i+1}"]
        csv << ["company_name_#{i+1}"]
      end
    end
  end
end

khuongs-MacBook-Pro:Ats_Project khuong$ ruby create_csv.rb 
Time: 2.27
Memory: 0.53
```

Với cách làm cũ, ta lần lượt load từng dòng trong file csv và tiến hành insert từng record một:
```
module PerformanceComputing
  private
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
end


require 'benchmark'
require 'csv'

class BasicInsert
    include PerformanceComputing

  def initialize file_name
    @file_name = file_name
  end

  def perform
    print_memory_usage do
      print_time_spent do
        CSV.foreach(file_name, headers: true) do |row|
          Company.create(name: row["name"])
        end
      end
    end
  end
  
  private
  attr_reader :file_name  
end
```
Và kết quả là(và thực tế là tôi đã ngủ 1 giấc rùi mới dậy xem kết quả):
```
BasicInsert.new("data.csv").perform
Time: 4746.51
Memory: 34.87 MB
[3] pry(main)> Company.count
   (84.4ms)  SELECT COUNT(*) FROM `companies` WHERE `companies`.`deleted_at` IS NULL
=> 500000
```
Cần 4746s để có thể import hết file csv có 1 triệu dòng và thu được 500k bản ghi company

Bây giờ, ta sẽ sử dụng activerecord-import xem kết quả ra sau: đặt batch_size = 10k

```
require 'benchmark'
require 'csv'

class OptimizeInsert
  include PerformanceComputing

  HEADER_LINE = 1.freeze
  BATCH_SIZE = 10_000.freeze

  def initialize file_name
    @file_name = file_name
  end

  def perform
    print_memory_usage do
      print_time_spent do
        File.open(file_name) do |file|
          file.lazy.drop(HEADER_LINE).each_slice(BATCH_SIZE) do |lines|
            Company.import [:name], CSV.parse(lines.join)
          end
        end
      end
    end
  end
  
  private
  attr_reader :file_name  
end
```
Và kết quả thu được thật sự ngoài mong đợi:
```
OptimizeInsert.new("data.csv").perform
Time: 662.98
Memory: 56.21 MB
[30] pry(main)> Company.count
   (92.4ms)  SELECT COUNT(*) FROM `companies` WHERE `companies`.`deleted_at` IS NULL
=> 500000
```
Chỉ mất 662s để cho kết quả tương tự (honho)

# Lời kết
Trên đây là một phương pháp để tối ưu khi bạn muốn import một lượng dữ liệu lớn vào database. Hy vọng sẽ giúp ích được các bạn trong công việc. To be continue...
Tham khảo:
https://github.com/zdennis/activerecord-import