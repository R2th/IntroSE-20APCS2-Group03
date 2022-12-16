- Bài viết được dịch từ bài [The defined? keyword in Ruby](https://medium.com/rubycademy/the-defined-keyword-in-ruby-b7a5a5a48e1e) của tác giả [Mehdi Farsi](https://medium.com/@farsi_mehdi).
-----

![](https://miro.medium.com/max/3000/1*DAwqXzLIU3rQINerqUBiLQ.jpeg)

-----
Từ khóa defined? nằm trong [bộ các keywords của ruby](https://viblo.asia/p/ngon-ngu-lap-trinh-ruby-phan-1-maGK7bYM5j2#_215-bo-cac-keywords-cua-ruby-16)

*Tổng quan về định nghĩa? từ khóa với một trường hợp sử dụng từ source code Ruby .. và một mẹo tối ưu hóa!*

Trong bài viết này, chúng ta sẽ khám phá các chủ đề sau:
* Từ khóa `defined?`
* `defined?` trong bối cảnh của `resolv-replace`
* `defined? yield` vs `block_given?`

---
## Từ khóa defined?
In Ruby, the defined? keyword returns a string that represents the type of the entity passed as argument. Here is an exhaustive list of what you can pass to defined?

Trong Ruby,  từ khóa `defined?` trả về một chuỗi đại diện cho loại *thực thể* được truyền dưới dạng đối số. Dưới đây là danh sách khảo sát về việc bạn có thể chuyển những đối số gì tới `defined?`:
```ruby
defined? String # => "constant"
defined? puts   # => "method"
defined? [1, 2] # => "expression"

@@a, @a, a = 21, 42, 84
defined? @aa   # => "class variable"
defined? @a    # => "instance-variable"
defined? a     # => "local-variable"
defined? a = 2 # => "assignment"
defined? $$    # => "global-variable"

def hello
  defined? yield
end

hello {} # => "yield"

class A
  def hello; end
end

class B
  def hello
    defined? super
  end
end

B.new.hello # => "super"
```
Here, we can see that defined? handles a maximum of cases. But some cases are more relevant than others. For example, let’s see how the resolv-replace library — available in the Ruby Standard Library — takes advantage of this keyword to handle a really “tricky” case.

Ở đây, chúng ta có thể thấy rằng `defined?` xử lý hầu như toàn bộ các trường hợp đối số. Nhưng một số trường hợp có liên quan hơn và khác với mấy TH trên. Ví dụ: hãy xem cách thư viện `resolv-replace` - có sẵn trong [Thư viện tiêu chuẩn của Ruby](https://ruby-doc.org/stdlib-2.7.1/) - tận dụng từ khóa này để xử lý một trường hợp thực sự "khó khăn".

---
## `defined?` trong ngữ cảnh `resolv-replace`

Thư viện này chỉ đơn giản là các bản vá lỗi (IP|TCP|UDP|SOCKS) Các lớp **Socket** được cung cấp bởi thư viện socket để sử dụng trình phân giải `Resolv` [**DNS resolver**](https://ruby-doc.org/stdlib-2.7.1/libdoc/resolv/rdoc/Resolv.html).

Trong trường hợp của SOCKSSocket, việc vá lỗi khỉ chỉ can thiệp khi trình thông dịch Ruby được biên dịch với `--enable-socks` flag. 

---
Cái đoạn này tác gỉa ko nói rõ nên cần tìm hiểu thêm 1 chút về SOCKSSocket và  `--enable-socks`:
* Nguyên nhân bởi vì trong trình thông dịch ruby 2.7.1 thì SOCKSSocket chỉ là tính năng optional, trừ phi nó được recompile với `--enable-socks` flag:
```ruby
irb> require "socket"
 => true
irb> defined? SOCKSSocket
 => nil
```
```ruby
?> ./configure --enable-socks
...
?> make && make install
..
?> irb
2.7.1 :001> require "socket"
 => true
2.7.1 :002> defined? SOCKSSocket
 => "constant"
```
* => nói tóm lại thằng SOCKSSocket là 1 case đặc biệt về cách dùng từ khóa `define?` (xem thêm [điều kiện mở class trong ruby](https://medium.com/rubycademy/conditional-class-opening-in-ruby-49a4524b7f85) nếu muốn tìm hiểu về `--enable-socks` và `--enable-flag`).

---
Quay lại bài viết của TG:

Vì vậy, hãy xem cách thư viện resolv-replace xử lý trường hợp phức tạp này.
```ruby
# in lib/resolv-replace.rb

class SOCKSSocket < TCPSocket
  # :stopdoc:
  alias original_resolv_initialize initialize
  # :startdoc:
  def initialize(host, serv)
    original_resolv_initialize(IPSocket.getaddress(host), port)
  end
end if defined? SOCKSSocket
```
Lưu ý modifier(bổ trợ cho class) - điều kiện `if` ở dòng số 10. Vậy thật ra, để chọn *"có vá lớp này hay không"*, thư viện `resolv-replace` thay thế chỉ cần kiểm tra xem hằng số SOCKSSocket có được định nghĩa bằng cách sử dụng keyword `defined?` hay không?. Thật vậy, như đã thấy trong [phần trước](https://medium.com/rubycademy/conditional-class-opening-in-ruby-49a4524b7f85), SOCKSSocket **chỉ được định nghĩa** nếu trình thông dịch Ruby được biên dịch bằng cờ `--enable-flag`.

Vì vậy, vì từ khóa `class` chỉ là một cú pháp của việc bắt đầu định nghĩa 1 lớp và "mở" lớp đấy ra(class definition and class opening), chứ chưa "đóng lớp" để execute code nên bạn có thể gọi một bổ trợ `-if` để check điều kiện thực thi đoạn code này (hoặc không).

Bây giờ chúng ta hãy xem cách sử dụng `defined?` có thể tác động tích cực đến hiệu suất của ứng dụng của bạn như thế nào ?

---
## `defined?(yield)` vs `block_given?`

Nếu trong chương trình của bạn, bạn xử lý một số lượng lớn các **blocks**, sau đó `defined? yieald` chắc chắn có thể trở thành một sự tối ưu hóa thực sự cho hiệu suất chương trình của bạn. Thật vậy, để check xem một block có được truyền vào phương thức của bạn hay không, bạn thường sử dụng phương thức `Kernel#block_given?` (Kernel vốn sẵn có tại [mô hình ruby Object](https://viblo.asia/p/mo-hinh-ruby-object-63vKjdekl2R))
```ruby
def method_with_block_given
  yield if block_given?
end

method_with_block_given { 42 } # => 42
method_with_block_given        # => nil
```
Here method_with_block_given checks if a block is passed as argument by using Kernel#block_given?. If so, then yield is called and the block is executed. Otherwise, block_given? returns false and yield is never executed.

Ở đây `method_with_block_given` kiểm tra xem một block có được chuyển làm đối số hay không bằng cách sử dụng `Kernel#block_given?`. Nếu đúng như vậy, thì `yield` được gọi và **block** được thực thi. Nếu không, block_given? trả về false và `yield` không bao giờ được thực thi.
> trong source code của rails gem devise rất hay thấy sửa dụng block_given?

Ruby cung cấp một cách khác để đạt được kết quả tương tự: `defined?(yield)`
```ruby
def method_with_defined_yield
  yield if defined?(yield)
end

method_with_defined_yield {42} # => 42
method_with_defined_yield      # => nil
```
Sự khác biệt chính giữa 2 biểu thức này là được `defined?(yield)` nhanh hơn `Kernel#block_given?`. Thật vậy, nó là một từ khóa cơ bản của ruby khi `block_given?` là một method. Vì vậy, `block_given?` chậm hơn do cái giá cửa việc gọi phương thức được thêm vào một phương thức khác là [Method Lookup Path](https://viblo.asia/p/rubyonrails-ruby-method-lookup-path-jvElaBgo5kw).

Hãy generate **benchmark-ips** reports để xem sự khác biệt giữa `defined?(yield)` và `block_given?`:
```ruby
require 'benchmark/ips'

def method_with_block_given
  yield if block_given?
end

def method_with_defined_yield
  yield if defined?(yield)
end


Benchmark.ips do |x|
  x.config(:time => 5, :warmup => 2)

  x.report("block_given?") { method_with_block_given {42} }
  x.report("defined? yield") { method_with_defined_yield {42} }

  x.compare!
end
```

```
Warming up --------------------------------------
        block_given?   988.926k i/100ms
      defined? yield     1.259M i/100ms
Calculating -------------------------------------
        block_given?      9.897M (± 1.1%) i/s -     50.435M in   5.096367s
      defined? yield     12.561M (± 1.8%) i/s -     62.944M in   5.012616s

Comparison:
      defined? yield: 12561217.9 i/s
        block_given?:  9897436.6 i/s - 1.27x  (± 0.00) slower
```
Chúng ta có thể thấy rằng `block_given?` có chậm hơn 1,27 lần so với `defined?(yield)`.

Nhưng như đã thấy trong benchmark ở trên, chúng ta có thể gọi `block_given` 9,897M lần trong một giây. Vì vậy, hãy nhớ rằng việc tối ưu hóa này chỉ phù hợp với một lượng lớn lệnh gọi khối. Và trừ phi có trương hợp cụ thể cầ dùng, bình thường nếu chỉ muốn tối ưu peformance thì cơ bản không cần thiết, nếu muốn code chạy nhanh hơn cả mức sử dụng các method của thư viện chuẩn ngôn ngữ thì tốt nhất nên chuyển qua C hoặc php7 mà code =)).

---

`defined?` không phải là từ khóa phổ biến nhất trong Ruby. Tuy nhiên, trong một số trường hợp, từ khóa này trở thành một tài sản mạnh mẽ để nâng cao hiệu suất chương trình của bạn hoặc để xử lý các trường hợp phức tạp trong đó hằng số, phương thức, v.v. được load có điều kiện (ví dụ như resolv-replace).