![](https://images.viblo.asia/91fc2c74-c5ec-4ac2-89c1-4cacdc3312a4.jpg)

2020 là một năm lớn đối với cộng đồng Ruby. Những người sáng lập Ruby có một món quà thực sự tuyệt vời cho chúng ta vào giáng sinh với việc phát hành Ruby 3.0!

Món quà tuy đẹp nhưng bên trong cũng có rất nhiều tính năng hay ho.

Bản nâng cấp lần này tập trung vào một số vấn đề chính là : performance, concurrency, static analysis, transition issues.

![](https://images.viblo.asia/202db073-ec99-4be2-8dcc-a79138988404.png)

### Performance

Mọi người đều biết Ruby là ngôn ngữ hoàn hảo cho MVPs, prototypes vàstartups, nhưng tốc độ của Ruby chắc chắn là vấn đề lớn nhất đối với ngôn ngữ lập trình.

Ruby 3.0 nhanh gấp 3 lần so với Ruby 2. 

Theo như  Optcarrot benchmark đo hiệu suất luồng, dựa trên khối lượng công việc mô phỏng trò chơi của NES. Kết quả khá bất ngờ :

![](https://images.viblo.asia/c4f79b3f-06b5-4e2d-b725-af7d39adf7cf.png)

Trong version 2.6 vẫn còn một số vẫn đề về hiệu suất của Ruby on Rails về việc sứ dụng bộ nhớ.  Vấn đề này xảy ra khi các lập trình viên tạo đối tượng mới sau đó bị  swept away. Khi điều này xảy ra rất nhiều không gian cho các đối tượng như vậy vẫn chưa được sử dụng và chúng ta sử dụng nhiều bộ nhớ hơn mức thực sự cần thiết.

Để khác phục điều này version 3.0 đã được giải quyết bằng một trình nén rác (GP).

GP làm 2 nhiệm vụ chính :
1. Tách đối tượng: trong khi một số đối tượng được ghim,  phần còn lại có thể được chuyển vào heap.
2. Tự động nén: không có lệnh đặc biệt nào được yêu cầu để thu gọn rác - trong phiên bản mới, tính năng nén tự động được hỗ trợ đầy đủ.

### Hiệu suất CPU 
Một trong những bản cập nhật để hứa hẹn nhất cho hiệu suất của CPU Ruby . Ruby đã tối ưu hóa trình biên dịch JIT (Just In Time) từ các phiên bản trước. Trình biên dịch Ruby MJIT lần đầu tiên được giới thiệu trong Ruby 2.6. Ruby 3 MJIT đi kèm với bảo mật tốt hơn và dường như cải thiện hiệu suất của ứng dụng web ở mức độ cao hơn.

Việc triển khai MJIT khác với JIT thông thường. Khi các phương thức được gọi nhiều lần, v.d. 10000 lần, MJIT sẽ chọn các phương thức như vậy có thể được biên dịch thành mã gốc và đặt chúng vào một hàng đợi. Sau đó MJIT sẽ tìm nạp hàng đợi và chuyển đổi chúng thành mã gốc.

### Concurrency / Parallel

**Ractor**

Concurrency  rất quan trọng trong  đa luồng . Nhờ Ractor (một mô hình Actor giống như trừu tượng concurrency), cùng với Async Fiber, Ruby trở thành một ngôn ngữ concurrency thực sự. Ractor cho phép thực thi song song mà không lo ngại về an toàn vì nó có thể chia sẻ các đối tượng bình thường. Giao tiếp giữa các Ractors được hỗ trợ bằng cách trao đổi tin nhắn.

Để hạn chế việc chia sẻ các đối tượng, Ractor đưa ra một số hạn chế đối với cú pháp của Ruby (không có nhiều Ractor thì không có hạn chế nào).

Chương trình nhỏ sau đây đo thời gian thực hiện của chức năng **tak** chuẩn nổi tiếng ( [Tak (function) - Wikipedia](https://en.wikipedia.org/wiki/Tak_(function)) ), bằng cách thực hiện nó 4 lần tuần tự so với 4 lần song song với ractors.

``` ruby
def tarai(x, y, z) =
  x <= y ? y : tarai(tarai(x-1, y, z),
                     tarai(y-1, z, x),
                     tarai(z-1, x, y))
require 'benchmark'
Benchmark.bm do |x|
  # sequential version
  x.report('seq'){ 4.times{ tarai(14, 7, 0) } }

  # parallel version
  x.report('par'){
    4.times.map do
      Ractor.new { tarai(14, 7, 0) }
    end.each(&:take)
  }
end
```

Kết quả khá tốt khi chạy song song nhanh hơn gấp  3,87 so với việc chạy tuần tự với cấu hình  Ubuntu 20.04, Intel(R) Core(TM) i7-6700 (4 cores, 8 hardware threads).

```
Benchmark result:
          user     system      total        real
seq  64.560736   0.001101  64.561837 ( 64.562194)
par  66.422010   0.015999  66.438009 ( 16.685797)
```


### Fiber Scheduler

Được giới thiệu để đánh chặn các hoạt động chặn, cho phép đồng thời trọng lượng nhẹ mà không cần thay đổi mã hiện có.

Các lớp/ phương thức hỗ trợ :

* Mutex#lock, Mutex#unlock, Mutex#sleep
* ConditionVariable#wait
* Queue#pop, SizedQueue#push
* Thread#join
* Kernel#sleep
* Process.wait
* IO#wait, IO#read, IO#write, and related methods (e.g. #wait_readable, #gets, #puts, and so on).

### Các tính năng mới đáng chú ý khác

**One-line pattern matching syntax change**
Đối sánh mẫu một dòng trước đây đã sử dụng **in** bây giờ nó được thay thế bằng **=>**

example:

ruby 2.7: ```{ name: 'John', role: 'CTO' } in {name:}```

ruby 3.0  ` { name: 'John', role: 'CTO' } => {name:}`

**Endless Method **

Ruby 3.0 bổ sung thêm định nghĩa phương thức vô tận. Nó cho phép chúng ta tạo các định nghĩa phương pháp mà không cần từ khóa end

`def square(x) = x * x`

**Kết luận**

Với những cải tiến lớn về hiệu suất, khả năng sử dụng bộ nhớ, phân tích tĩnh và các tính năng mới, nhà phát triển đã rất tin tưởng vào tương lai của Ruby. Với Ruby 3, các ứng dụng có thể mở rộng hơn và làm việc thú vị hơn. Năm 2021 sắp tới không chỉ là một năm mới mà còn là một kỷ nguyên mới cho tất cả những người theo chủ nghĩa Ruby.

Tài liệu tham khảo :

https://medium.com/selleo/why-is-ruby-still-a-good-choice-in-2021-an-introduction-to-ruby-3-0-cc8a3d588bbc 

https://www.ruby-lang.org/en/news/2020/12/25/ruby-3-0-0-released/