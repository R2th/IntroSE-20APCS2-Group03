Giả dụ rằng bạn có một số đoạn code Ruby và bạn muốn cải tiến các đoạn code đó. Nhưng bạn không biết rằng liệu cách code mới của mình có nhanh hơn cách cũ hay không. Làm thế nào để biết được điều đó? Benchmarking sẽ giúp bạn và may mắn thay, trong Ruby vốn đã có sẵn thư viện để làm việc này. Đó chính là Benchmark module.

### Cách sử dụng cơ bản
* Đầu tiên, để sử dụng Benchmark, chúng ta cần require thư viện với `require "benchmark"`
* Để đo thời gian thực thi một đoạn code, bạn chỉ cần dùng `Benchmark.measure`.

```ruby
require "benchmark"

i=0
puts Benchmark.measure { 10000.times { i+=1 } }
```

kết quả như sau:

```
0.000349   0.000029   0.000378 (  0.000374)
```

Những con số trên là gì? Mình xin giải thích như sau:
![](https://images.viblo.asia/8204e377-2c0e-473a-b39c-415d6827b3a5.png)
Trong đó:
* user CPU time là lượng thời gian CPU dành cho tiến trình chạy các tác vụ của riêng nó (chạy ngoài kernel của hệ điều hành).
* system CPU time là lượng thời gian CPU dùng để khai thác tài nguyên, chạy trong kernel của hệ điều hành.
* thời gian chạy thực tế là thông số quan trọng nhất, cho chúng ta biết thời gian chính xác để thực thi đoạn code.

Tuy nhiên, phương thức measure không được sử dụng nhiều. Lý do là vì nó chỉ in ra được thời gian thực thi của một đoạn code mà thôi. <br>
Benchmark được sử dụng chủ yếu là để so sánh thời gian thực thi của các đoạn code giải quyết cùng một bài toán. Và benchmark có một số phương thức để làm việc này.

###  Benchmark#bm
Phương thức này cho phép chúng ta đo thời gian chạy của vài đoạn code và in kết quả ra màn hình theo thứ tự.
 Ví dụ:
```ruby
require "benchmark"

loop_times = 100_000

Benchmark.bm do |bm|
  # first_block
  bm.report do
    i = 0
    loop_times.times do
      i+=1
    end
  end
  
  # second_block
  bm.report do
    i=0
    loop_times.times do
      i=i+1
    end
  end
end
```

 kết quả như sau:
```
        user     system      total        real
   0.003552   0.000000   0.003552 (  0.003549)
   0.003662   0.000000   0.003662 (  0.003664)

```

core API chính là:
```ruby
Benchmark.bm do |bm|
  bm.report { first_block }
  bm.report { second_block }
end
```
`Benchmark.bm` sẽ cung cấp cho bạn một phương thức là report, thứ mà bạn sẽ dùng để đo thời gian thực thi của đoạn code mà bạn muốn. Benchmark sẽ chạy tất cả các đoạn code và in ra kết quả theo thứ tự.<br>
*Đôi khi, khi bạn chạy các đoạn code đơn giản, chạy rất nhanh, khoảng thời gian thực thi giữa chúng chênh lệch quá nhỏ, thì bạn cần phải cho các đoạn code được chạy nhiều lần để cho khoảng thời gian thực thi có sự chênh lệch rõ rệt. Lúc đó thì benchmarking mới có tác dụng.*

### Labels
Ở ví dụ phía trên, mình đã sử dụng comment để chú thích cho từng đoạn code. Tất nhiên kết quả in ra sẽ không hiện comment lên. Tuy nhiên Benchmark cho phép chúng ta tạo ra các label cho từng đoạn code khi gọi phương thức report và các label đó sẽ được in ra tương ứng với từng đoạn code.
Ví dụ:
```ruby
require "benchmark"

loop_times = 100_000

Benchmark.bm do |bm|
  bm.report("first_block") do
    i = 0
    loop_times.times do
      i+=1
    end
  end

  bm.report("second_block") do
    i=0
    loop_times.times do
      i=i+1
    end
  end
end
```
và kết quả là:
```
        user     system      total        real
first_block  0.003658   0.000000   0.003658 (  0.003656)
second_block  0.004295   0.000015   0.004310 (  0.004331)
```
có vẻ chưa hợp lý cho lắm. Để căn lề cho phần header thì chúng ta có thể truyền một đối số khi gọi Benchmark.bm như `Benchmark.bm 12`, tức là căn lề 12 khoảng trắng:
```ruby
require "benchmark"

loop_times = 100_000

Benchmark.bm 12 do |bm|
  bm.report("first_block") do
    i = 0
    loop_times.times do
      i+=1
    end
  end

  bm.report("second_block") do
    i=0
    loop_times.times do
      i=i+1
    end
  end
end
```
kết quả là:
```
                  user     system      total        real
first_block    0.004960   0.000094   0.005054 (  0.005071)
second_block   0.005380   0.000000   0.005380 (  0.005395)
```
### Benchmark#bmbm
Đôi khi, đoạn code của bạn tạo ra rất nhiều object, kết quả đo đạc sẽ bị sai lệch bởi cơ chế cấp phát bộ nhớ của Ruby hay là GC của Ruby. <br>
Khi tạo ra rất nhiều object, một đoạn code sẽ cần chạy GC, trong khi các đoạn code thì không cần; hoặc là chỉ một đoạn code, nhưng nó bị kẹt lúc cấp phát thêm bộ nhớ. Trong 2 trường hợp trên, kết quả đo sẽ bị sai lệch. Đây là lúc bạn cần sử dụng `Benchmark.bmbm`.
Phương thức này sẽ đo thời gian chạy của đoạn code trong 2 lần.
* Lần thứ nhất: nó chạy đoạn code, khởi tạo những thứ cần thiết và buộc GC phải chạy, lần đầu này chỉ là chạy thử (rehearsal) thôi.
* Lần thứ hai: nó chạy đoạn code một lần nữa, lần này là chạy thật.
Cách làm này đảm bảo tính chính xác của kết quả đo.
Ví dụ:
```ruby
require "benchmark"

array = Array 1..10_000_000

Benchmark.bmbm 7 do |bm|
  bm.report "reverse" do
    array.dup.reverse
  end

  bm.report "reverse!" do
    array.dup.reverse!
  end
end
```
Ví dụ trên tạo ra rất nhiều object, và Ruby phải cấp phát thêm bộ nhớ cho nó ở lần chạy thứ nhất. Khi chạy lần hai thì bộ nhớ đã sẵn sàng và chỉ cần phải đo quá trình thực thi lệnh mà thôi.<br>
Kết quả là:
```
Rehearsal --------------------------------------------
reverse    0.020000   0.020000   0.040000 (  0.050908)
reverse!   0.030000   0.020000   0.050000 (  0.048042)
----------------------------------- total: 0.090000sec

               user     system      total        real
reverse    0.010000   0.000000   0.010000 (  0.015385)
reverse!   0.030000   0.000000   0.030000 (  0.023973)
```

### Kết luận
Khi bạn muốn tối ưu chương trình của mình, hãy nhớ cần phải luôn luôn đo thời gian thực thi của các đoạn code để đàm bảo cách làm mới phải nhanh hơn cách cũ nhé!