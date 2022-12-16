### Giới thiệu
Benchmarking  trong ruby là một công cụ thiết yếu để bạn đánh giá tóc độ của một đoạn code, một block code nào đó trong Ruby, từ đó có thể đưa ra được những hướng giải quyết bài toán khác để tăng tốc độ của đoạn chương trình. Trong Standard Library của ruby cung cấp cho chúng ta [Benchmark module](https://ruby-doc.org/stdlib-2.5.0/libdoc/benchmark/rdoc/Benchmark.html) có thể được sử dụng để đo thời gian chạy của bất kỳ block code nào đó
 Để sử dụng chúng ta chỉ cần như sau:
 ```ruby
 require 'benchmark'
# => true
 ```
###  Benchmarking một block code
Để benchmarking một block code đơn giản, chúng ta sử dụng ``#measure `` method
```ruby
puts Benchmark.measure { 10_000_000.times { Object.new } }
#        user     system      total        real
# => 1.280000   0.000000   1.280000 (  1.283235)
```
Chúng ta có thể thấy Kết quả được trả về tính bằng giây, do đó, việc khởi tạo 10 triệu Object chỉ mất hơn một giây.

Nếu chúng ta muốn in kết quả cùng với một message, chúng ta có thể làm như sau:
```ruby
result = Benchmark.realtime { 10_000_000.times { Object.new } }

puts "Creating ten million objects: #{realtime.round(2)}s"
# => Creating ten million objects: 1.29s
```
Rất là đơn giản đúng không nào.
### So sánh các block code
Một vấn để được đặt ra thì luôn có nhiều cách giải quyết khác nhau, khi code cũng thế. Vì vậy để chọn ra được cách làm nhanh, chính xác và tốt nhất thực sự là một điều rất khó, nhất là đối với những block code xử lý logic phức tạp, khi đó Benchmark chính là công cụ được sử dụng để so sánh các blockcode.
Ví dụ:
```ruby
# DP version
def fib_dp(n)
  (2..n).reduce([0, 1]) { |m| m << m.last(2).reduce(:+) }[n]
end

# Recursive version
def fib_rec(n)
  return 0 if n == 0
  return 1 if n == 1

  fib_rec(n - 1) + fib_rec(n - 2)
end
```
Ở hai method trên, đối với method thứ 2 sử dụng đệ quy tốc đọ sẽ rất chậm nếu n là một số lớn, sử dụng method ``#bm`` để có thể thấy sự khác biệt:
```ruby
Benchmark.bm(10) do |x|
  x.report('dp:')        { fib_dp(35) }
  x.report('recursive:') { fib_rec(35) }
end

#                  user     system      total        real
# dp:          0.000000   0.000000   0.000000 (  0.000035)
# recursive:   1.680000   0.000000   1.680000 (  1.671631)
```
Đối số đầu tiên của method ``#bm`` quy định độ rộng của label (dp, recursive), để canh giá trị hiển thị về bên trái.

Chúng ta có thể thấy, đối với hàm ``#fib_rec`` quy để chạy xong cần mất hơn 1,5 giây, còn đối với hàm ``#fib_dp`` thời gian thực thi là không đáng kể, trên thực tế hàm ``#fib_dp`` có thể chạy rất nhanh khi n lớn, chúng ta có thể thấy rõ như sau:
```ruby
puts Benchmark.measure { fib_dp(100_000) }
#        user     system      total        real
# => 0.350000   0.000000   0.350000 (  0.350249)
```
với ``n=100_000`` thì hàm ``#fib_dp`` chạy hết 0.35 giây trong khi với ``n=35`` thì hàm ``#fib_rec`` đã phải chạy hết hơn 1,5 giây.

### Sử dụng benchmark-ips
[benchmark-ips](https://github.com/evanphx/benchmark-ips) là một gem cung cấp cho chúng ta nhiều tính năng hơn so với module Benchmark  mặc định. Để sử dụng thì cần cài đặt nó và require vào chương trình của bạn.
```ruby
require 'benchmark/ips'
```
Sử dụng gem trên để kiểm tra các phương thức sau:
```ruby
Benchmark.ips do |x|
  x.report('dp: ')        { fib_dp(35) }
  x.report('recursive: ') { fib_rec(35) }

  x.compare!
end

# Calculating -------------------------------------
#                 dp:      5.600k i/100ms
#          recursive:      1.000  i/100ms
# -------------------------------------------------
#                 dp:      60.299k (± 2.0%) i/s -    302.400k
#          recursive:       0.517  (± 0.0%) i/s -      3.000  in   5.800686s
#
# Comparison:
#                 dp: :    60299.5 i/s
#          recursive: :        0.5 i/s - 116590.15x slower
```
Sự khác biệt duy nhất là lời gọi `` x.compare!`` ở cuối cùng block. Chúng ta có thể thấy nhờ gem benchmark/ips mà nhiều thông tin khác của hai method được in ra màn hình như số lần lặp lại mỗi giây, độ lệch chuẩn và cuối cùng là so sánh cho thấy method ``#fib_rec`` không được tối ưu hóa chậm hơn 100 000 lần so với method ``#fib_dp``
### Kết luận
Nếu bạn từng thắc mặc tại sao ``Enumerable#each`` nhanh hơn so với vòng lặp ``for`` hoặc ``[].map.flatten`` chậm hơn so với ``[].flat_map`` thì có thể vào [fast-ruby](https://github.com/JuanitoFatas/fast-ruby) ở đấy chứa những câu trả lời chính xác cho vấn đề trên, trong đó có thể thấy được ứng dụng của Benchmark vào việc so sánh tốc độ của các method có sẵn trong ruby, từ đó cân nhắc việc sử dụng các method sao cho hợp lý, khoa học.

Cuối cùng có thể nói rằng Benchmark module và benchmark-ips gem thực sự dễ dàng sử dụng và rất cần thiết cho một lập trình viện Ruby để tăng performance
### Tham khảo
http://mitrev.net/ruby/2015/08/28/benchmarking-ruby/