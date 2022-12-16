# Đặt vấn đề

![](https://images.viblo.asia/4b982b02-1c2f-4b51-bd1e-a52a16001079.jpeg)

Cũng giống như nhiều lập trình viên khác, mình thường hay dùng các trang web về code như stackoverflow để tìm kiếm các giải pháp cho logic của mình, và kết quả tìm được thường là nhưng dòng code ngắn gọn vi diệu chỉ có 1 dòng + sử dụng nhưng cú pháp, method mà trước đây mình chưa từng biết tới, trong khi code của mình phải mất cả chục dòng mới ra được kết quả.
<br>

Tuy nhiên mình nhận ra rằng viết code theo cách này có ít nhất hai nhược điểm lớn. Đầu tiền, các dòng code ngắn gọn thường đọc rất khó hiểu và phải sự dụng một vài lần mới hiểu được ý nghĩa của đoạn code đó. Điều thứ hai là, mặc dù đoạn code đó ngắn gọn hơn nhưng chưa chắc hiệu năng đã lại tốt hơn.
<br>

Mình sẽ sử dụng [code challenge](https://www.codewars.com/kata/fibonacci-tribonacci-and-friends/ruby) này làm ví dụ. Challenge này yêu cầu chúng ta viết một method để tạo ra một dãy số bắt đầu bằng 4 số cho trước và các số tiếp theo là tổng của 4 số đứng trước nó. Method viết ra phải nhận được hai tham số, tham số thứ nhất là một mảng các số cho trước gọi là *signature*, tham số thứ hai là một số nguyên n (chính là độ dài mong muốn của dãy số trả về). Ví dụ:
```ruby
xbonacci([1, 1, 1, 1], 10)
 => [1, 1, 1, 1, 4, 7, 13, 25, 49, 94]
```
<br>

Cả hai method sau đều có thể giải quyết được bài toán trên:
```ruby
def my_xbonacci(signature, n)
   count_from_index = 0
   digits_to_sum = signature.length
   until signature.length == n
     next_num = signature.slice(count_from_index, digits_to_sum).inject(0) { |sum, elm| sum + elm }
     signature.push(next_num)
     count_from_index += 1
   end
   
   return signature
end
```

```ruby
def their_xbonacci(s,n)
   n.times.map { s << s.inject(:+); s.shift }
end
```

Ngay lập tức bạn có thể thấy: "quào! method thứ hai thật ngắn gọn", đúng không? Tuy nhiên, hay dành ra một phút để đọc cả hai method từ đầu tới cuối để hiểu được chúng đang làm gì.
<br>

Hy vọng rằng các bạn có thể dễ dàng đọc hiểu được method thứ nhất :grin: — đầu tiên chúng ta khởi tạo bộ đếm *count_from_index* để theo dõi được chúng ta sẽ tính toán giá trị của phần tử tiếp theo bắt đầu từ phần tử nào trong mỗi vòng lặp. Chúng ta cũng sẽ theo dõi cần cộng tổng bao nhiêu phần tử để tính ra phần tử tiếp theo bằng biến *digits_to_sum* — trong ví dụ ở trên, giá trị này sẽ là 4 (chính là độ dài của tham số *signature*). Cho tới khi độ dài của mảng *signature* bằng với độ dài mong muốn *n*, cứ mỗi vòng lặp chúng ta sẽ cộng tổng bốn số cuối cùng trong mảng *signature* và tăng bộ đếm thêm 1 đơn vị. Cuối cùng, chúng ta trả về mảng *signature* mới.
<br>

Tiếp đến method thứ hai...

![](https://images.viblo.asia/fdc12a6f-fbcb-4511-be28-b1ecfb60dc87.gif)

Hãy thử phân tích phương án thứ hai.
<br>

`n.times` tạo ra một object Enumerable và chúng ta dùng `.map` để lặp nó. Ở mỗi vòng lặp, chúng ta dùng `.inject` để cộng tất cả các phần tử trong mảng thành một giá trị và push nó vào cuối mảng signature (hay mảng *s* ). Sau đó chúng ta dùng `.shift` loại bỏ phần tử đầu tiên khỏi mảng *s* để có được mảng *s* mới chỉ chưa hai phần từ cuối cùng của mảng *s* ở vòng lặp trước cùng với phần từ mới được tính ra. `.shift` cũng trả về phần tử được loại bỏ ra ở mỗi vòng lặp và nó được đưa vào trong mảng được tạo ra bởi `.map`, do đó sau khi chạy method chúng ta có được một mảng đầy đủ các phần từ ban đầu cùng với các phần từ mới được tạo ra.
<br>

Không có gì phải bàn cãi, method thứ hai rất rất ngăn gọn hơn so với method thứ nhất. Nhưng xét về mặt *dễ đọc*, nếu có ai bảo mình chỉnh sửa cho nó thành dễ đọc thì mình không nghĩ rằng mình có thể thay đổi nó một cách có ý nghĩa mà không cần viết lại toàn bộ.
<br>

Vậy còn về mặt *hiệu năng* thì sao? Cái quan trọng là chúng ta cần biết được method nào thực sự làm việc tốt hơn!
<br>

# Áp dụng module Benchmark của Ruby
[Module Benchmark](https://ruby-doc.org/stdlib-2.6.4/libdoc/benchmark/rdoc/Benchmark.html) được tích hợp sẵn trong Ruby và sẽ báo cho bạn biết khoảng thời gian các method của bạn cần để hoàn thành. Tuyệt vời, phải không? Chúng ta có thể sử dụng Benchmark để kiểm tra thời gian chạy thực sự của mỗi method và kiểm tra xem method nào hiệu quả hơn.
<br>

Đầu tiên, hãy `require 'benchmark'`. Hầu hết các trường hợp bạn sẽ cần dùng đến hai method của module là `.bm` và `.bmbm`.
<br>

Sử dụng cả hai method sẽ như sau:
```ruby
Benchmark.bmbm do |x|
   x.report(“My xbonacci”) {my_xbonacci(signature, n)}
   x.report(“Their xbonacci”) {their_xbonacci(signature, n)}
end
```

Method sẽ có một block, ở trong đó, chúng ta gọi `.report` để chạy một benchmark report. Tham số đầu của method `.report` là một label để chúng ta có thể phân biệt được method nào với method nào sau khi report chạy xong. Trong block, chúng ta gọi các method chúng ta muốn benchmark, mỗi method ở một dòng.
<br>

Điểm khác nhau duy nhất giữa `.bm` và `.bmbm` là `.bmbm` sẽ chạy benchmark hai lần liên tiếp nhằm giảm tác động của các yếu tố bên ngoài như là việc giải phóng bộ nhớ khi các biến được giải phóng...
<br>

Module Benchmark chỉ có thế cho phép bạn đo lường về mặt thời gian, nhưng chúng ta cũng có thể xem được tác động của một method tới việc sử dụng bộ nhớ là như thế nào nhờ vào [gem benchmark-memory](https://github.com/michaelherold/benchmark-memory). Thêm nó bằng lệnh `gem install benchmark-memory` và require nó `require 'benchmark/memory'`. Cách sử dụng nó cũng tương tự như với module Benchmark — nhưng thay vì dùng method `.bmbm` chúng ta dùng method `.memory`.
<br>

Ngoài ra module Benchmark còn có method `.measure`, tuy nhiên method này chỉ trả về report cho toàn bộ đoạn code trong block sau khi chạy, trong khi mục đích của việc benchmark là nhằm so sánh các phương án để tìm ra phương án tối ưu hơn nên method `.bm` tỏ ra hữu ích hơn khi nó có thể trả về report của nhiều method trong các block sau một lần chạy benchmark.
# Kết quả
OK, giờ chúng ta đã biết được cách dùng Benchmark, hãy benchmark hai method của chúng ta. Toàn bộ code chúng ta cần sẽ như sau:

```ruby
require 'benchmark'
require 'benchmark/memory'

def my_xbonacci(signature, n)
   count_from_index = 0
   digits_to_sum = signature.length
   until signature.length == n
     next_num = signature.slice(count_from_index, digits_to_sum).inject(0) { |sum, elm| sum + elm }
     signature.push(next_num)
     count_from_index+=1
   end
   return signature
end

def their_xbonacci(s,n)
   n.times.map { s << s.inject(:+); s.shift }
end

# benchmark setup
def benchmark(signature, n)
   Benchmark.bmbm do |x|
     x.report("My xbonacci") {my_xbonacci(signature, n)}
     x.report("Their xbonacci") {their_xbonacci(signature, n)}
   end
   
   Benchmark.memory do |x|
     x.report("My xbonacci") {my_xbonacci(signature, n)}
     x.report("Their xbonacci") {their_xbonacci(signature, n)}
   end
end
```

Chúng ta cũng sẽ dùng input ở ví dụ ban đầu:
```ruby
benchmark([1, 1, 1, 1], 10).to_s
```

Trong IRB, chúng ta sẽ thu được report:
```
# Vì chúng ta sử dụng .bmbm nên sẽ chạy thử trước:
Rehearsal --------------------------------------------------
My xbonacci      0.000000   0.000000   0.000000 (  0.000028)
Their xbonacci   0.000000   0.000000   0.000000 (  0.000043)
----------------------------------------- total: 0.000000sec

# Sau đó là lần chạy thật:
                     user     system      total        real
My xbonacci      0.000000   0.000000   0.000000 (  0.000006)
Their xbonacci   0.000000   0.000000   0.000000 (  0.000016)

# Benchmark memory:
Calculating -------------------------------------
         My xbonacci     0.000  memsize (     0.000  retained)
                         0.000  objects (     0.000  retained)
                         0.000  strings (     0.000  retained)
      Their xbonacci   320.000  memsize (     0.000  retained)
                         2.000  objects (     0.000  retained)
                         0.000  strings (     0.000  retained)
```

Với time benchmark, *user*, *system*, và *real* chỉ các đồng hồ khác nhau mà Benchmark dùng để đo thời gian. Với memory benchmark, memsize đơn vị sẽ là bytes. Phía trên chỉ là benchmark nhanh với số lượng phần tử nhỏ, chúng ta hãy thử benchmark với số lượng phần tử lớn hơn (các bạn chỉ nên test với vài nghìn phần từ, nhiều hơn là treo máy đó :grin:):

```
benchmark([1, 1, 1, 1], 1000).to_s

Rehearsal --------------------------------------------------
My xbonacci      0.010000   0.000000   0.010000 (  0.009468)
Their xbonacci   0.250000   0.000000   0.250000 (  0.249149)
----------------------------------------- total: 0.260000sec

                     user     system      total        real
My xbonacci      0.000000   0.000000   0.000000 (  0.000003)
Their xbonacci   0.330000   0.000000   0.330000 (  0.327281)
Calculating -------------------------------------
         My xbonacci     0.000  memsize (     0.000  retained)
                         0.000  objects (     0.000  retained)
                         0.000  strings (     0.000  retained)
      Their xbonacci   409.727M memsize (   472.512k retained)
                       999.002k objects (     1.000k retained)
                         0.000  strings (     0.000  retained)
```

#### Wow!
Mặc dù thời gian chạy của mỗi method chỉ ở mức mili giây nhưng chúng ta vẫn có thể thấy được method ngắn hơn có thời gian thực thi lâu hơn rất nhiều, đặc biệt với lượng phần tử lớn. Về mặt memory cũng tương tự, code rõ ràng hơn gần như không tốn chút bộ nhớ nào trong khi phiên bản ngắn gọn lại tốn tới tận **409 MB(!)**. Điều này được lý giải bởi phía sau mỗi method, sẽ có những tác vụ ngầm và sẽ có những tác vụ ngốn nhiều tài nguyên hơn so với các tác vụ khác, ở ví dụ của chúng ta, chính method `.map` gây nên điều đó.

# Kết luận
Vì Ruby cung cấp cho chúng ta rất nhiều cách để làm cùng một việc gì đó nên nhiều khi chúng ta không ý thức được những thứ đang chạy ngầm sau mỗi dòng code. Tuy nhiên, là một lập trình viên, chắc chắn đến một lúc nào đó sẽ phải xem xét về vấn đề hiệu năng của các method, và Benchmark và benchmark-memory là những khởi đầu tốt trong việc tìm hiểu vì sao các dòng code của bạn lại bị chậm đi.
<br>

Cuối cùng, hãy nhớ rằng, ngắn gọn hơn không phải lúc nào cũng đi cùng với sự dễ đọc và hiệu năng tốt hơn!

---

Source: https://medium.com/swlh/benchmarking-in-ruby-86a6c28c1e97