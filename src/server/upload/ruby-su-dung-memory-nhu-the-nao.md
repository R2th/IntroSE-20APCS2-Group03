## Lời mở đầu:

Tôi chưa bao giờ gặp một developer nào phàn nàn về việc code chạy nhanh hơn hoặc chiếm ít RAM hơn cả. 

Trong Ruby, bộ nhớ (memory) đặc biệt quan trọng, tuy nhiên không phải ai cũng biết rõ tại sao bộ nhớ của họ tăng hoặc giảm khi code được chạy.

Bài viết này sẽ trình bày về những hiểu biết cơ bản về objects trong Ruby, liên quan đến việc sử dụng bộ nhớ, và một vài thủ thuật phố biến để điều tra khi apps của bạn bị out of memory.

## Lưu trữ object
    
Không chỉ ở Ruby, ngôn ngữ lập trình nào cũng làm tăng lượng memory sử dụng do nó lưu trữ objects.

`Constants` trong Ruby không bao giờ được dọn dẹp (`Garbabe collected` - `GC`) nên nếu  constant có tham chiếu (**reference**) tới object nào đó, object đó sẽ không được giải phóng. Ví dụ:
        
```Ruby
RETAINED = []
100_000.times do
  RETAINED << "a string"
end
```

Nếu ta chạy đoạn code trên cùng với debugger `GC.stat(:total_freed_objects)` - lệnh này giúp trả về số lượng objects đã được giải phóng bởi Ruby. 

Ta so sánh kết quả trước và sau sẽ không có sự khác biệt nhiều:

```Ruby
# Ruby 2.2.2

GC.start
before = GC.stat(:total_freed_objects)

RETAINED = []
100_000.times do
  RETAINED << "a string"
end

GC.start
after = GC.stat(:total_freed_objects)
puts "Objects Freed: #{after - before}"

# => "Objects Freed: 6
```

Ta đã tạo 100,000 bản copy của `"a string"` nhưng Ruby nghĩ rằng ta **có thể** sử dụng lại gía trị đó trong tương lai, vậy nên nó không thể được giải phóng.

Objects không thể được giải phóng khi nó đang được reference từ global object. Dạng như `constants`, `global variables`, `modules`, và `class`. 
Phải đặc biệt cẩn thận khi reference object từ bất cứ cái gì có thể truy cập global nhé.

Cũng là đoạn code trên, nhưng ta sửa đi tý, không cho nó lưu trữ objects nữa:

```Ruby
100_000.times do
  foo = "a string"
end
```

Kết quả số lượng objects được giải phóng là: `Objects Freed: 100005`. 

Đoạn code trên có memory sử dụng nhỏ hơn rất nhiều, loanh quanh khoảng `6mb` so với `12mb` của việc giữ lại reference tới các object.
Bạn có thể tự mình đo đạc bằng gem [get_process_mem](https://github.com/schneems/get_process_mem)

Ngoài ra, ta có thể xác định có lưu trữ objects hay không bằng cách dùng `GC.stat(:total_allocated_objects)`, kết quả tính toán sẽ dựa trên công thức **total_allocated_objects - total_freed_objects** - tổng số objects đã cấp phát trừ đi tổng số object được giải phóng.

## Tốc độ

Tất cả mọi người đều quen thuộc với từ **DRY** hay **Don't repeat yourself**. 

Điều này đúng trong lúc viết code, và cũng đúng cho việc cấp phát objects.

Việc giữ lại objects để sử dụng trong tương lai thay vì phải tạo nhiều lần nó là hợp lý, chả có gì sai cả.

Ruby có sẵn tính năng này cho `String` bằng cách thêm đoạn `.freeze` vào. 
Trình thông dịch sẽ hiểu rằng, bạn không có ý định thay đổi `string` đó, nên object sẽ được lưu trữ và sử dụng lại. Ví dụ:

```Ruby
RETAINED = []
100_000.times do
  RETAINED << "a string".freeze
end
```

Chạy đoạn code trên với `GC.stat`, bạn vẫn nhận được `Objects Freed: 6`, nhưng memory sử dụng lại rất thấp. 

Ta xác minh bằng `GC.stat(:total_allocated_objects)` => Chỉ một vài objects được cấp phát cho `"a string"` được lưu trữ và tái sử dụng luôn.

Thay vì lưu trữ 100,000 objects khác nhau, Ruby có thể giữ lại 1 object string với 100,000 tham chiếu tới object đó. 

Ngoài việc giảm lượng memory sử dụng, nó cũng giúp tốc độ được cải thiện đáng kể vì Ruby không phải mất thời gian khởi tạo thêm object, cấp phát memory nữa.
Double check bằng [benchmark-ips](https://github.com/evanphx/benchmark-ips) nếu bạn muốn.

Mặc dù kiểu **DRY** này rất phổ biến cho `string` trong Ruby, tuy nhiên bạn cũng có thể làm điều tương tự với các objects khác bằng cách gán nó với một `constant`. 

Dưới đây là pattern khá thông dụng khi lưu trữ external connections, như Redis chẳng hạn. Ví dụ:

```Ruby
RETAINED_REDIS_CONNECTION = Redis.new
```

Khi constant được liên kết tới Redis connection, nó sẽ không bao giờ được giải phóng.

## Thời gian tồn tại của objects

Hầu hết các objects đều chỉ tồn tại trong thời gian ngắn, có nghĩa là ngay sau khi được tạo ra, chúng không có reference và sẽ được giải phóng. 

Ví dụ với đoạn code dưới đây:

```Ruby
User.where(name: "schneems").first
```

Nhìn bề ngoài, nó yêu cầu vài objects (hash, symbol `:name`, string `"schneems"`).

Tuy nhiên, mỗi khi thực thi, rất nhiều objects khác được sinh ra thêm để giúp hoàn thiện cho câu truy vấn SQL và các objects này chỉ tồn tại trong function mà chúng được tạo đang thực thi.

Vậy tại sao ta phải quan tâm đến các objects dạng như thế này làm gì?

Khi tạo ra nhiều objects dạng medium và long lived sẽ khiến cho memory tăng dần theo thời gian. 
Nếu GC được kích hoạt ngay trong thời điểm các objects đó vẫn đang có reference, điều đó có thể còn gây ngốn nhiều RAM hơn.

## Ngốn RAM

Khi bạn có lượng objects được dùng lớn hơn lượng Ruby đang nắm giữ memory, nó sẽ yêu cầu cấp phát thêm bộ nhớ. 

Yêu cầu cấp phát thêm memory từ hệ điều hành là một hoạt động rất tốn kém, vì vậy Ruby luôn cố thực hiện với tần suất nhỏ nhất có thể.

Thay vì mỗi lần chỉ yêu cầu cấp phát vài KB, nó lại yêu cầu lấy cả cục lớn 1 lúc. 
Bạn có thể set giá trị này một cách thủ công bằng biến ENV `RUBY_GC_HEAP_GROWTH_FACTOR`.

Ví dụ, nếu ruby đang tiêu thụ 100mb mà bạn đặt `RUBY_GC_HEAP_GROWTH_FACTOR=1.1`, khi Ruby cấp phát lại bố nhớ, nó sẽ nhận được 110mb.

Một khi Ruby apps khởi động, nó sẽ tiếp tục tăng theo cùng tỷ lệ phần trăm đó, cho đến khi đạt được mức ổn định mà chương trình có thể thực thi được trong lượng memory cấp phát.

Nếu set giá trị ENV thấp xuống, ta phải chạy GC và cấp phát memory thường xuyên hơn.

Nếu set giá trị ENV cao lên, GC chạy ít lại và ta nhận cấp phát memory nhiều hơn lượng mà ta cần.

Suy nghĩ về hành vi trên của Ruby, ta có thể suy ra rằng, việc tạo các objects không lưu trữ có ảnh hưởng tới việc sử dụng bộ nhớ tổng thể. Ví dụ:

```Ruby
def make_an_array
  array = []
  10_000_000.times do
    array <<  "a string"
  end
  return nil
end
```

Khi chúng ta thực thi method trên, 10,000,000 string được tạo. Khi kết thúc method, cái đám string đó không được reference bởi bất cứ thứ gì nên sẽ được giải phóng.

Tuy nhiên, trong khi chương trình đang chạy, Ruby phải cấp phát lượng memory để có chỗ cho 10,000,000 strings. Điều này cần tới hơn 500mb RAM!!!

![](https://images.viblo.asia/1f96aaa2-9cff-48da-a81b-08181234e7d4.png)

Điều này chả ảnh hưởng gì nếu những xử lý còn lại chỉ cần tới 10mb. 

Nhưng hãy tưởng tượng rằng, quá trình này gây hết bộ nhớ ở giữa 1 request lớn => GC bắt buộc phải kích hoạt và cấp phát thêm memory nếu nó không có đủ slots.

Như đã nói ở trên, vì việc yêu cầu cấp phát thêm bộ nhớ là rất tốn kém, nên Ruby sẽ giữ lượng memory này trong 1 khoảng thời gian.

Nếu việc sử dụng vượt giới hạn memory xảy ra 1 lần, nó có thể xảy ra tiếp lần nữa. Memory rồi cũng được giải phóng, nhưng là giải phóng từ từ -> RAM vào như nước sông Đà, RAM ra nhỏ giọt như cà phê phin.

Nếu bạn quan tâm tới performance, tốt nhất là giảm thiểu các **điểm nóng** tạo objects bất cứ khi nào có thể.

## Modification for speed

Một mẹo tôi hay dùng để tăng tốc cho chương trình và giảm lượng objects cần cấp phát là thay đổi trực tiếp thay vì tạo mới objects. 

Ví dụ, dưới đây là đoạn code lấy từ gem [mime-types](https://github.com/halostatue/mime-types):

```Ruby
matchdata.captures.map { |e|
  e.downcase.gsub(%r{[Xx]-}o, '')
end
```

Đoạn code trên trả về [matchdata object](http://ruby-doc.org/core-2.2.1/MatchData.html) từ regex `match` method. 
Nó tạo ra array với mỗi phần tử được downcase và bỏ đi vài ký tự.

Trông nó rất ok, cho tới khi nó được gọi cả ngàn lần mỗi khi gem `mime-types` được require.

Mỗi method gọi `downcase` và `gsub` tạo ra object string mới - điều này tốn thời gian và memory. Để tránh việc đó, ta có thể tay đổi trực tiếp bằng cách:

```Ruby
matchdata.captures.map { |e|
  e.downcase!
  e.gsub!(%r{[Xx]-}o, ''.freeze)
  e
}
```

Code dài dòng hơn, nhưng chắc chắn nhanh hơn nhiều.

*Note:* Bạn không cần dùng `constant` để lưu trữ đoạn `regex`, vì tất ca các ký tự `regex` trong Ruby đều được `frozen` hết rồi.

Trước khi ốp kiểu chỉnh sửa này vào, hãy đảm bảo bạn đã test kỹ. Vì nếu biến này có dùng ở chỗ khác thì toang lắm.

Ngoài ra, chỉ nên tối ưu ở những **điểm nóng**, nơi mà bạn đã xác định nó tạo ra số lượng objects quá lớn mà không cần thiết.

Một cách hay để tìm ra những cấp phát không cần thiết là sử dụng gem [derailed_benchmarks](https://github.com/schneems/derailed_benchmarks) ở application level.

Ở tầng thấp hơn thì nên dùng gem [allocation_tracer](https://github.com/ko1/allocation_tracer) và gem [memory_profiler](https://github.com/SamSaffron/memory_profiler).

## PS

Như tôi đã đề cập ở trên, Ruby có giải phóng memory, nhưng CHẬM. Sau khi chạy `make_an_array`, bạn có thể quan sát quá trình Ruby giải phóng memory bằng cách chạy:

```Ruby
while true
  GC.start
end
```

Memory sẽ giảm xuống, nhưng rất chậm. Mỗi lần Ruby giải phóng một lượng nhỏ các slots, trong khi lúc request thì request cả cục to.

Đối với hầu hết các apps, chẳng hạn như web apps, hành động cấp phát memory có thể chỉ kích hoạt khi request tới endpoint. Khi endpoint được request thường xuyên, ta không thể ỷ lại vào cái cách mà Ruby giải phóng bộ nhớ được.

Ngoài ra, việc giải phóng bộ nhớ tốn thời gian. Tốt hơn hết là giảm thiểu việc tạo objects trong các **điểm nóng** khi chúng ta có thể.

### Warm up

Từ những kiến thức trên, ta hãy thử thực hành điều tra và đo lường. Chọn một vài tool mà mình đã đề cập ở trên:

- [derailed_benchmarks](https://github.com/schneems/derailed_benchmarks)
- [allocation_tracer](https://github.com/ko1/allocation_tracer)
- [memory_profiler](https://github.com/SamSaffron/memory_profiler)
- [benchmark-ips](https://github.com/evanphx/benchmark-ips)

Rồi benchmark code, đào sâu và tìm ra các **điểm nóng**. 

Có thể nó nằm ở đoạn code bạn viết, nhưng có thể nó nằm ở third party gem và cố gắng optimize nó. 

Tiếp tục lặp lại mô hình này: tìm điểm nóng, tối ưu hóa, đo lường.

Dần dần thuần hóa Ruby nào các bác!!

## Nguồn:

- https://www.sitepoint.com/ruby-uses-memory/