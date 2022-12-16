### Introduction
Chúng ta có thể `cache` lại các value object để tiết kiệm cho bộ nhớ. Với mỗi instance được tạo ra đều chiếm lượng memory nhất định,  giả sử trong database của hệ thống hiện có khoảng 100,000 users ở các quốc gia (country) khác nhau, trong trường hợp chúng ta muốn phân loại user theo từng quốc gia (country), hoặc theo các  country attribute: `Customer.map(&:country).map(&:code).uniq`, với việc khởi tạo cả trăm nghìn Country instances thì cũng cần đến khá nhiều memory.
### Implement
Để mô phỏng lại cơ chế caching với class ban đầu là `Country`, ta có thể override lại method `new`:
```ruby
class Country
  def self.new(code)
    @instance_cache ||= {}
    @instance_cache[code] = super(code) unless @instance_cache.key?(code)
    @instance_cache.fetch(code)
  end

  def initialize(code)
    @code = code
  end
end
```
Khi ta call đến `Country.new("A")`, luồng hoạt động sẽ như sau:
* `@instance_cache` ban đầu sẽ là một hash rỗng nếu chưa từng được định nghĩa trước đó
* Trường hợp `A` được khởi tạo lần đầu, instance mới sẽ được tạo và `A` sẽ được thêm vào list key của `@instance_cache`
* Sau đó là instance của `A` được trả về


Để thuận tiện cho việc so sánh, ta có thể thêm 1 class uncached, với phương thức khởi tạo thông thường:
```ruby
class CountryUncached
  def initialize code
    @code = code
  end
end
```
Xét ví dụ:
```ruby
> z = CountryUncached.new("A")
=> #<CountryUncached:0x0000000007d10cc0 @code="A">
> x = CountryUncached.new("A")
=> #<CountryUncached:0x0000000007dcdf50 @code="A">
> v = CountryUncached.new("B")
=> #<CountryUncached:0x00000000082533e0 @code="B">
> z == x
=> false
> z.object_id
=> 65570400
> x.object_id
=> 65957800
> v.object_id
=> 68327920
```
Có thể thấy rằng với mỗi instances được khởi tạo, thì hệ thống đều phải dành ra vùng nhớ khác nhau để cung cấp cho các instance riêng biệt, dù có các cặp object đều có cùng values. Việc cấp phát bộ nhớ liên tục như vậy đều tiêu tốn ít nhiều memory của hệ thống.


Còn với class `Country` có sử dụng cache, với các ví dụ tương tự:
```ruby
> a = Country.new("A")
=> #<Country:0x0000000006208ef0 @code="A">
> b = Country.new("A")
=> #<Country:0x0000000006208ef0 @code="A">
> c = Country.new("B")
=> #<Country:0x00000000067c6a18 @code="B">
> a == b
=> true
> a.object_id
=> 51398520
> b.object_id
=> 51398520
```
Có thể thấy với class `Country`, value của các instances với cùng code đều được cached lại, với cùng `object_id` - là phương thức trả về định danh của đối tượng. Ở đây 2 instances `a` và `b` đều cùng trỏ tới 1 đối tượng trong vùng nhớ, hệ thống không phải cấp phát bộ nhớ cho toàn bộ instances được khởi tạo nữa, mà chỉ với các instance với các value khác nhau.

 
 Với cách overrite lại method `new` như ở trên, mặc dù bộ nhớ được tiết kiệm hơn, nhưng số lượng logic phải xử lí trong mỗi lần khởi tạo sẽ nhiều hơn thông thường, dẫn đến trường hợp với số lượng instance lớn thì sẽ có sự chênh lệch về thời gian:
 ```ruby
 def initialize_with_cache
  Benchmark.measure do
    10000000.times do
      Country.new("A")
    end
  end.total
end

def initialize_without_cache
  Benchmark.measure do
    10000000.times do
      CountryUncached.new("B")
    end
  end.total
end
 ```
 Kết quả:
 ```ruby
> initialize_with_cache
=> 2.4899999999999993
> initialize_without_cache
=> 2.0500000000000007
 ```
 Vì vậy chúng ta nên cân nhắc việc áp dụng value cached sao cho hợp lý với từng hoàn cảnh.
 ### Summary
 Bài viết nhằm chia sẻ một chút kiến thức liên quan đến Instance Caching. Trong quá trình tìm hiểu không khỏi tránh những thiếu sót, cảm ơn bạn đã dành thời gian theo dõi.
 
 Nguồn:
  - https://dev.to/databasesponge/ruby-value-object-instance-caching-3h6f