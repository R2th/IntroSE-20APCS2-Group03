## Introduction

Trước hết cùng cùng hiểu "thread" là gì? Như theo Wikipedia:

> In computer science, a thread of execution is the smallest sequence of programmed instructions that can be managed independently by an operating system scheduler. A thread is a light-weight process.

`A thread is a light-weight process`. Có thể tưởng tượng thread là một phiên bản nhẹ hơn của process. Một thread có thể thực hiện bất cứ tác vụ gì mà một process có thể thực hiện. Nhiều thread nằm trong cùng một process sẽ dùng một không gian bộ nhớ giống nhau. Điều này cho phép các thread đọc và viết cùng một kiểu cấu trúc và dữ liệu, giao tiếp dễ dành giữa các thread với nhau. Việc có nhiều thread chạy song song trong cùng một process giúp multitasking nhẹ và dễ dàng hơn.

Hãy cùng tìm hiểu sâu hơn về thread hữu ích như thế nào:

## Basic Example
Xét đoạn mã sau:

```
def calculate_sum(arr)
  sum = 0
  arr.each do |item|
    sum += item
  end
  sum
end

@items1 = [12, 34, 55]
@items2 = [45, 90, 2]
@items3 = [99, 22, 31]

puts "items1 = #{calculate_sum(@items1)}"
puts "items2 = #{calculate_sum(@items2)}"
puts "items3 = #{calculate_sum(@items3)}"
```

Kết quả:

```
items1 = 101
items2 = 137
items3 = 152
```

Đây là một đoạn chương trình đơn giản sẽ giúp bạn hiểu tại sao nên sử dụng thread. Trong đoạn mã trên, chúng ta có 3 mảng và một function calculate_sum để tính tổng các đoạn mã trên. Sẽ có vấn đề xảy ra trong trường hợp, chúng ta sẽ không thể nhận được tổng của mảng `items2` nếu chúng ta không nhận được kết quả của `items1`. Đó cũng là vấn đề tương tự đối với `items3`. Chỉ cần thay đổi đoạn mã chút vấn đề trên sẽ xảy ra:

```
def calculate_sum(arr)
  sleep(2)
  sum = 0
  arr.each do |item|
    sum += item
  end
  sum
end
```

Trong đoạn code trên, mình có thêm lệnh sleep(2), nó sẽ khiến calculate_sum tạm dừng thực thi trong 2 giây và sau đó tiếp tục. Cụ thể hơn `items1` sẽ nhận được tổng sau 2 giây, `items3` sẽ là 4 giây (2 giây cho `items1` thêm 2 giây cho `items2`) và `items3` nhận được kết quả  sau 6 giây. Đây là nhưng gì mình muốn.

Các mảng items này không phụ thuộc vào nhau, điều này sẽ là lý tưởng để tính tổng số tiền của chúng một cách độc lập. Với lý tường này `threads` sẽ là ưu tiên hàng đầu để giải quyết.

Threads cho phép chúng ta di chuyển các phần khác nhau của chương trình sang các các ngữ cảnh thực thi khác nhau để nó có thể  thực thi độc lập. Giờ, hãy cùng viết một version threaded/multithreaded cho chương trình bên trên.

```
def calculate_sum(arr)
  sleep(2)
  sum = 0
  arr.each do |item|
    sum += item
  end
  sum
end

@items1 = [12, 34, 55]
@items2 = [45, 90, 2]
@items3 = [99, 22, 31]

threads = (1..3).map do |i|
  Thread.new(i) do |i|
    items = instance_variable_get("@items#{i}")
    puts "items#{i} = #{calculate_sum(items)}"
  end
end
threads.each {|t| t.join}
```

Phương thức `calculate_sum` cũng giống như đoạn mã trước đó chúng ta đã thêm sleep(2). Các mảng `items` vẫn giữ như cũ. Phần thay đổi quan trọng nhất là các chúng ta gọi `calculate_sum` trong mỗi mảng. Chúng ta gọi hàm `calculate_sum` tương ứng với mỗi mảng trong một luồng Thread.new. Đây là cách tạo `thread` trong Rail.

Chúng ta đã thực hiện một chút metaprogramming để có được từng mảng `items` theo chỉ chỉ số `i` trong vòng lặp. Ở cuối chương trình chúng ta yêu cầu `threads` xử lý các khối mà chúng ta đã cung cấp cho họ.

Nếu bạn chạy đoạn mã trên, bạn có thể thấy hết kết quả đầu ra:

```
items2 = 137
items3 = 152
items1 = 101
```

Thay vì nhận được phản hồi cho mảng `items2` sau 4 giây và mảng `items3` 6 giây, mình đã nhận được kết quả tổng của các mảng sau 2 giây. Sau ví dụ này chúng ta đã thấy được sức mạnh và hiệu suất tốt hơn và hiểu  quả khi sử dụng `threads`. Thay vì tính tổng một mảng tại một thời điểm, chúng ta tính tổng của tất cả các mảng cùng một lúc hoặc đồng thời. 


## Race Conditions

Mỗi tính năng thường đi kèm theo một mức giá. Threads thật tiện ích, nhưng nếu bạn đang code ứng dụng `multithread` thì bạn nên biết các xử lý `race coditions`. Thế điều kiện `race coditions` là gì? Theo Wikipedia:

> Race conditions arise in software when separate computer processes or threads of execution depend on some shared state. Operations upon shared states are critical sections that must be mutually exclusive. Failure to obey this rule opens up the possibility of corrupting the shared state.

Nói một các đơn giản, nếu chúng ta có một số dữ liệu được chia sẻ mà có thể được truy cập bởi nhiều luồng thì dữ liệu của chúng ta sẽ không bị vấn đề gì (không bị hỏng) sau khi tất cả các luồng kết thúc thực thi.

## Example

```
class Item
  class << self; attr_accessor :price end
  @price = 0
end

(1..10).each { Item.price += 10 }

puts "Item.price = #{Item.price}"
```

Mình đã tạo ra một lớp `Item` đơn giản với một biến class `price`. `Item.price` được tăng lên trong vòng lặp. Kết quả chạy chường trình này:

```
Item.price = 100
```

Giờ hãy xem phiên bản multithreaded cho đoạn mã trên:

```
class Item
  class << self; attr_accessor :price end
  @price = 0
end

threads = (1..10).map do |i|
  Thread.new(i) do |i|
    item_price = Item.price # Reading value
    sleep(rand(0..2))
    item_price += 10        # Updating value
    sleep(rand(0..2))
    Item.price = item_price # Writing value
  end
end

threads.each {|t| t.join}

puts "Item.price = #{Item.price}"
```
Class `Item` là như nhau. Tuy nhiên mình có thay đổi các chúng tăng giá trị `price`. Ở đây mình đã sử dụng `sleep` trong đoạn mã trên cho bạn thấy các vấn đề có thể xảy ra đồng thời. Chạy đoạn chương trình nhiều lần và quan sát kết quả:

```
Item.price = 40
```

Kết quả đầu ra lần đầu tiên là không chính xác và không nhất quán. Đầu ra không còn là 100 nữa và đôi khi bạn có thể thấy là 30, 40 hoặc 70, v.v. Đây là một `race condition`. Ở đây dữ liệu không còn chính xác và bị hỏng mỗi lần chạy chương trình.

## Mutual Exclusion

Để khắc phục `race conditions`, chúng ta phải điều khiển  

```
class Item
  class << self; attr_accessor :price end
  @price = 0
end

mutex = Mutex.new

threads = (1..10).map do |i|
  Thread.new(i) do |i|
    mutex.synchronize do 
      item_price = Item.price # Reading value
      sleep(rand(0..2))
      item_price += 10        # Updating value
      sleep(rand(0..2))
      Item.price = item_price # Writing value
    end
  end
end

threads.each {|t| t.join}

puts "Item.price = #{Item.price}"
```

Kết quả:

```
Item.price = 100
```

Điều này xảy ra bởi vì `mutex.synchronize`. Một và chỉ một `thread` có thể truy cập khối đươc bao bọc bởi `mutex.synchronize` bất cứ lúc nào. các `thread` khác phải chờ cho đến khi luồng hiện tại đang xử lý hoàn tất.

Rails là threadsafe và sử dụng lớp Mutex để  tránh `race conditions` khi multiple thread cố gắng truy cập cùng một mã. Hãy xem đoạn [code](https://github.com/rack/rack/blob/master/lib/rack/lock.rb#L16) từ Rack::Lock middleware. Bạn sẽ thấy rằng `@mutex.lock` được sử dụng để chặn `threads` khác cố truy cập cùng một mã. Để biết chi tiết chuyên sâu về  multithreading in Rails hãy đọc qua bài viết [What is config.threadsafe!](https://www.sitepoint.com/config-threadsafe/). Ngoài ra, bạn có thể truy cập page [Ruby Mutex](http://ruby-doc.org/core-2.0.0/Mutex.html) để tham khảo về lớp Mutex.

## Types of Threads in Different Ruby Versions

Trong Ruby 1.8, có `green` threads. Green threads được thực thi và kiểm soát bởi người phiên dịch. Dưới đây là ưu điểm và nhược điểm của nó:

Ưu điêm:
* Cross platform (quản lý bởi VM).
* Thống nhất Hành vi/ Điều khiển.
* Nhẹ, nhanh hơn dung lượng bộ nhớ nhỏ hơn. 

Nhược điểm:
* Không được tối ưu hóa
* Giới hạn 1 CPU
* Chặn I/O chặn tất cả thread

Kể từ Ruby 1.9, Ruby sử dụng các native threads. Native threads có nghĩa là mỗi chuỗi được tạo bởi Ruby được ánh xạ trực tiếp tới một chuỗi được tạo ở Hệ điều hành. Mọi ngôn ngữ lập trình hiện tại đều thực thi các native threads nên việc sử dụng native threads có ý nghĩa hơn. 

Một số ưu điểm của native threads:
* Chạy trên nhiều bộ xử lý
* Theo lịch bởi hệ điều hành
* Chặn các hoạt động I/O không chặn các thread khác. 

Mình hy vọng bạn thích bài viết này và có thể áp dụng thread cho Ruby của bạn trong tương lai.


## Reference material
* https://ruby-doc.org/core-2.2.0/Thread.html
* http://rubylearning.com/satishtalim/ruby_threads.html
* https://www.sitepoint.com/threads-ruby/
* https://www.tutorialspoint.com/ruby/ruby_multithreading.htm