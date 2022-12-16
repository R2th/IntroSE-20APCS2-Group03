# Parallel in Ruby

Một câu hỏi thường đặt ra khi muốn tăng hiệu suất làm việc của chương trình: đoạn xử lí này có thể thực hiện song song để tăng tốc độ cũng như tận dụng khả năng phần cứng mà hệ thống hỗ trợ. Câu trả lời mà chúng ta có thể nghĩ đến là xử lý bằng multiple thread hoặc multiple process. Vậy Ruby có hỗ trợ những giải pháp này hay không, hiệu suất thực tế khi dùng những giải pháp này như thế nào? Hãy lần lượt xem xét và thử nghiệm với từng phương pháp một

## Ruby và threading

Từ phiên bản ruby 1.9, Ruby đã có khả năng multiple threading.
Để chạy code Ruby chúng ta cần có interpreter - trình thông dịch - và người tạo ra ngôn ngữ Ruby, Yukihiro Matsumoto đã cung cấp interpreter đầu tiên mà chúng ta vẫn thường sử dụng tên là MRI (Matz’s Ruby Interpreter).
Bản Ruby 1.9 với sự ra đời của cơ chế global interpreter lock (GIL) trong interpreter này, Ruby đã có thể multi-threading. MRI Ruby hỗ trợ native thread trong khi đó trước phiên bản 1.9 chỉ có green thread được hỗ trợ. Có thể nói từ bản 1.9 trở đi Ruby mới thực sự hỗ trợ OS-level threads.

### Native Threads vs Green Threads

Sự khách biệt giưã 2 loại thread trên đó là kernel nhận biết native threads chứ không nhận biết green threads.
Nói cách khác nếu chương trình của bạn dùng green threads thì từ góc độ kernel đó vẫn là 1 chương trình single thread. Việc tạo, xoá, lên lịch cho thread đều nằm trong process và bị ẩn dưới con mắt của kernel.

Bạn có thể kiểm chứng bằng cách chạy chương trình dưới đây trên ruby 1.8 và 1.9

```Ruby
t1 = Thread.new { while true ; end }
t2 = Thread.new { while true ; end }
t1.join # wait for thread 1 to finish
t2.join # wait for thread 2 to finish
```

Trên Ruby 1.8

```
kt:ruby nguyen.thanh.tungb$ rvm use 1.8.7
Using /Users/nguyen.thanh.tungb/.rvm/gems/ruby-1.8.7-head
kt:ruby nguyen.thanh.tungb$ ruby --version
ruby 1.8.7 (2014-01-28 patchlevel 376) [i686-darwin16.7.0]
kt:ruby nguyen.thanh.tungb$ ruby two_threads.rb &
[1] 9263
kt:ruby nguyen.thanh.tungb$ ps M 9263
USER               PID   TT   %CPU STAT PRI     STIME     UTIME COMMAND
nguyen.thanh.tungb  9263 s008   66.1 R     7T   0:31.39   5:38.93 ruby two_threads.rb
kt:ruby nguyen.thanh.tungb$ kill -9 9263
```

Như bạn đã thấy, kết quả của câu lệnh ps cho biết chỉ có thực sự 1 thread khi chạy chương trình

Trên Ruby 1.9

```
kt:ruby nguyen.thanh.tungb$ rvm use 1.9.3
Using /Users/nguyen.thanh.tungb/.rvm/gems/ruby-1.9.3-p551
kt:ruby nguyen.thanh.tungb$ ruby -v
ruby 1.9.3p551 (2014-11-13 revision 48407) [x86_64-darwin16.7.0]
kt:ruby nguyen.thanh.tungb$ ruby two_threads.rb &
[1] 9896
kt:ruby nguyen.thanh.tungb$ ps M 9896
USER               PID   TT   %CPU STAT PRI     STIME     UTIME COMMAND
nguyen.thanh.tungb  9896 s007    0.0 S    31T   0:00.01   0:00.04 ruby two_threads.rb
                  9896         0.0 S    31T   0:00.00   0:00.00
                  9896        51.1 S    16T   0:00.05   0:02.33
                  9896         7.3 R    30T   0:00.04   0:02.18
                  9896        24.9 S    27T   0:00.04   0:02.17
```

Bạn có thể thấy là có nhiều hơn 1 thread khi chạy chương trình ruby, còn tại sao chúng ta lại thấy 4 thread ở đây sẽ được đề cập sau.

Native thread rõ ràng là tốt hơn vì đó là cách duy nhất để đạt được xử lí song song (parallel) thực sự. Việc lên lịch thực hiện tại kernel và chỉ có kernel mới có thể đồng thời lên lịch các threads cho nhiều processors

Concurrency (đồng bộ) khác với parallel (song song).　Concurrency có nghĩa là ứng dụng có khả năng thực hiện nhiều task tại một thời điểm.　Bằng cách switch (chuyển giao qua lại) rất nhanh giữa các thread do đó ta có cảm giác nhiều thread đang chạy tại một thời điểm. Green threads hiệu quả cho concurrency nhưng để parallel (song song) thì cần có native threads.

Câu chuyện sẽ không có ý nghĩa gì mấy nếu chúng ta chạy chương trình trên 1 máy single-processor mặc dù việc xử lí đồng bộ vẫn có giá trị trong việc giúp processor chuyển qua thực hiện công việc của 1 thread khác khi curent threaf bị block vì 1 vài lí do nào đấy (e.g. IO blocking)

### Global Interpreter Lock

Vậy là trên lý thuyết, Ruby đã hỗ trợ multi-thread thực sự ở level kernel và có vẻ việc lập trình song song dùng multi-thread là đầy triển vọng nhưng thực tế `lập trình song song bằng multi-thread vẫn là chưa thể trên Ruby`. Lý do nằm ở cơ chế `Global Interpreter Lock (GIL)`. `GIL` là cơ chế được xây dựng trong interpretre để đảm bảo 2 threads thuộc về cùng 1 chương trình Ruby không thể thực hiện song song (wtf)

Điều này dẫn đến chuyện có vẻ như lợi thế có được từ native thread có từ Ruby 1.9 đã không còn nữa (facepalm)

#### Extra threads trong Ruby 1.9

Khi interpreter quyết định chuyển thread thì các bước sau sẽ được thực hiện

- Thread hiện tại nhả GIL
- Scheduler chọn thread kế tiếp
- Thread mới chiếm GIL.

Quyết định thực hiện chuyển thread được thực hiện thông qua gía trị của 1 flag được gắn với từng thread. Khi giá trị của flag đó là `true` thì đến lúc giá trị flag bị set thành `false` thì quá trình chuyển thread diễn ra. Việc set giá trị flag thành `true` là trách nhiệnm của một extra thread gọi là timer thread thực hiện việc set giá trị flag cho các thread, lặp đi lặp lại các công việc sau

- (1) Đợi 1 khoảng thời gian cố định
- (2) Set giá trị của flag là `true`
- (3) Lặp lại bước (1)

Mục đích của timer thread này là để giúp quyết định chuyển thread có hiệu quả. Interpreter chỉ đơn giản là check gía trị của flag xem có phải chuyển thread hay không. Đây cũng là lí do dẫn đến có 4 thread trong ví dụ chúng ta thấy lúc trước (1 thread chính, 2 thread con sinh ra trong quá trình chạy chương trình, 1 timer thread)

### Multiple thread vs single thread với MRI

Với mục tiêu chính là tốc độ cùng với việc chúng ta đã biết rằng MRI không cho phép chúng ta chạy 2 thread của 1 chương trình cùng 1 lúc vậy thì tốc độ khi chúng ta chạy single thread bình thường vs sử dụng multiple thread có sự khác biệt như thế nào

Dưới đây là 1 chương trình để test thử tốc độ khi cùng thực hiện cùng 1 công việc khi thực hiện multiple process vs single thread

```Ruby
require 'thread'
require 'benchmark'
LIMIT = 1*10**4
W = [0, 7, 10]

def default_sum
  sum1 = 0
  (1..(W.max*LIMIT)).each do |x|
    sum1+=x
  end
  puts " single result = #{sum1} "
end

def parallel_sum
  r2 = 0
  th_arr = []
  sum = 0
  W[0...-1].each_with_index do |w, i|
    th_arr << Thread.new {
      temp = 0
      ((W[i]*LIMIT+1)..(W[i+1]*LIMIT)).each do |x|
        temp+=x
      end
      sum+=temp
    }
  end
  th_arr.each {|th| th.join}
  puts " threads = #{th_arr.length}"
  puts "  parallel result = #{sum} "
end

Benchmark.bm do |y|
  y.report { parallel_sum }
  y.report { default_sum }
end
```

Mục tiêu của chương trình này là tính tổng các số tự nhiên từ 1 cho đến W.max * LIMIT. (trong ví dụ này là 10*LIMIT)

Cách đầu tiên là tính tổng bằng 1 vòng lặp như bình thường. Cách thứ 2 là thực hiện tính các giá trị tổng con theo các đoạn giá trị 0→7*LIMIT và 7*LIMIT+1→10*LIMIT sau đó tính tổng của các giá trị tổng con này.

Kết quả với `LIMIT=10**4`

```
kt:ruby nguyen.thanh.tungb$ ruby sum.rb
       user     system      total        real
  threads = 2
  parallel result = 5000050000
  0.010000   0.000000   0.010000 (  0.006083)
  single result = 5000050000
  0.000000   0.000000   0.000000 (  0.005571)
```

Kết quả này cho thấy thời gian chạy khi thực hiện multiple thread thậm chí còn chậm hơn cả chạy single thread. (orz)
Vậy việc thực hiện multiple thread có ý nghĩa gì đây ?
Hãy tăng `LIMIT` lên 1 giá trị đủ lớn

Kết quả với `LIMIT=1*10**7`
```
kt:ruby nguyen.thanh.tungb$ ruby sum.rb
       user     system      total        real
  threads = 2
  parallel result = 5000000050000000
  5.290000   0.020000   5.310000 (  5.503673)
  single result = 5000000050000000
  5.830000   0.030000   5.860000 (  5.956419)
```

Kết quả với `LIMIT=5*10**7`

```
kt:ruby nguyen.thanh.tungb$ ruby sum.rb
       user     system      total        real
  threads = 2
  parallel result = 125000000250000000
 25.520000   0.100000  25.620000 ( 26.023533)
  single result = 125000000250000000
 27.550000   0.120000  27.670000 ( 28.149483)
```

Như vậy khi giá trị LIMIT đạt đủ lớn thì ta có thể thấy phương pháp sử dụng multiple thread nhanh hơn tuy nhiên nó không thể đạt được đến mức độ nhanh xấp xỉ gấp đôi. Lí do là chúng ta không có 2 thread thực sự chạy song song, việc chương trình chạy nhanh hơn hay chậm hơn khi dùng 2 thread phụ thuộc vào trade-off cho effort chuyển thread và khoảng thời gian chờ khi các thao tác tính toán với số lớn. Khi `LIMIT` càng lớn thì việc chuyển thread có lợi hơn dẫn đến chương trình chạy nhanh hơn.

### Real Multi-Threading trong Ruby

Chúng ta đã đề cập đến bộ original Ruby interpreter - MRI - được viết bằng ngôn ngữ C. Nó hỗ trợ các extensions viết bởi C và các đoạn code không safe-thread - với sự hỗ trợ của GIL. Nhưng điều dó cũng khiến chúng ta bị hạn chế khi muốn lập trình song song.

Để có 1 chương trình thực sự multi-threading chúng ta có thể sử dụng JRuby.

JRuby là một implementation của Ruby được chạy trong máy ảo Java. Nó bị mất đi một số C extension có trong Ruby "thuần" mà chúng ta hay sử dụng nhưng bù lại có lợi thế của Java Threads, thứ được thiết kế để có thể lập trình song song thực sự.

Có thể kể đến 1 số thư viện nổi tiếng mà có thể tương tác tốt với JRuby:

- Puma: Rack-based web server tích hợp tốt với Sinatra, Rails
- Sidekiq: hỗ trợ thực hiện các job chạy background

### MRI Ruby vs JRuby

Chúng ta hãy thực hiện 1 bài test để so sánh tốc độ khi chạy cùng 1 chương trình trên MRI Ruby và JRuby

```Ruby
# benchmark.rb
require 'benchmark'

n = 5000
Benchmark.bm do |x|
  x.report { for i in 1..n; a = "1"; end }
  x.report { n.times do   ; a = "1"; end }
  x.report { 1.upto(n) do ; a = "1"; end }
end
```

Kết quả với Ruby 1.9.3

```
kt:ruby nguyen.thanh.tungb$ ruby -v
ruby 1.9.3p551 (2014-11-13 revision 48407) [x86_64-darwin16.7.0]
kt:ruby nguyen.thanh.tungb$ ruby benchmark.rb
       user     system      total        real
   0.000000   0.000000   0.000000 (  0.001205)
   0.000000   0.000000   0.000000 (  0.000487)
   0.000000   0.000000   0.000000 (  0.000637)
```

Kết quả với JRuby
```
kt:ruby nguyen.thanh.tungb$ ruby -v
jruby 9.1.15.0 (2.3.3) 2017-12-07 929fde8 Java HotSpot(TM) 64-Bit Server VM 9.0.1+11 on 9.0.1+11 +jit [darwin-x86_64]
kt:ruby nguyen.thanh.tungb$ ruby benchmark.rb
       user     system      total        real
   0.030000   0.000000   0.030000 (  0.008913)
   0.020000   0.000000   0.020000 (  0.009924)
   0.030000   0.000000   0.030000 (  0.017507)
```


Thời gian thực thi khi chạy trên JRuby rõ ràng là chậm hơn nhiều so với chạy trên MRI Ruby (càng biết thêm nhiều thứ lại càng thấy chậm hơn là thế nào)

Tuy nhiên sẽ thế nào nếu giá trị `n` lớn hơn rất nhiều `n=50000000` (50 triệu)

Kết quả với Ruby 1.9.3
```
kt:ruby nguyen.thanh.tungb$ ruby benchmark.rb
       user     system      total        real
   6.460000   0.030000   6.490000 (  6.661388)
   5.440000   0.020000   5.460000 (  5.527137)
   5.290000   0.020000   5.310000 (  5.332776)
```

Kết quả với JRuby
```
kt:ruby nguyen.thanh.tungb$ ruby benchmark.rb
       user     system      total        real
   7.040000   0.140000   7.180000 (  6.225191)
   4.260000   0.080000   4.340000 (  4.489042)
   4.050000   0.070000   4.120000 (  3.953462)
```

Như vậy với `n` đủ lớn JRuby đã nhanh hơn Ruby 1.9.3

Và bây giờ là bài test quan trọng nhất, multiple thread. Hãy thay đổi đoạn code 1 chút

```Ruby
#benchmark.rb
require 'benchmark'

n = 50000000
Benchmark.bm do |x|
  t1 = Thread.new { x.report {for i in 1..n; a = "1"; end } }
  t2 = Thread.new { x.report {n.times do   ; a = "1"; end } }
  t3 = Thread.new { x.report {1.upto(n) do ; a = "1"; end } }
  t1.join # wait for thread 1 to finish
  t2.join # wait for thread 2 to finish
  t3.join # wait for thread 3 to finish
end
```
Kết quả với Ruby 1.9.3

```
kt:ruby nguyen.thanh.tungb$ ruby benchmark.rb
       user     system      total        real
    14.710000   0.090000  14.800000 ( 15.320108)
 14.730000   0.100000  14.830000 ( 15.340411)
 14.500000   0.090000  14.590000 ( 15.111696)
```

Kết quả với JRuby
```
kt:ruby nguyen.thanh.tungb$ ruby benchmark.rb
       user     system      total        real
    17.090000   0.170000  17.260000 (  5.820645)
 18.940000   0.200000  19.140000 (  6.515712)
 20.130000   0.210000  20.340000 (  7.690582)
```

Đến đây chúng ta mới thấy rõ được lợi ích của việc dùng JRuby. Với việc hỗ trợ muliple-thread thực sự, tốc độ đã được cải thiện đáng kể.