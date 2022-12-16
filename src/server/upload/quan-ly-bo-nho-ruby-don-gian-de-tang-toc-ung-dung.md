Như chúng ta đều biết, ngôn ngữ C và C++ thì việc quản lý bộ nhớ được thực hiện thủ công bởi các dev. Nhưng với các ngon ngữ khác như Ruby, Python, Java, bộ nhớ được quản lý bởi các bộ thu thập rác -  garbage collector (GC)

## Giới thiệu Ruby GC

Vậy GC là gì? GC là một module Ruby cung cấp interface cho cơ chế thu dọn rác của Ruby. Có 2 phương thức quan trọng và được dùng phổ biến nhất là GC.stat và GC.start.

GC.start để bắt đầu khởi tạo bộ thu dọn rác, giải phóng bộ nhớ.

GC.stat hiển thị các thông số của GC, nếu chạy GC.stat trong irb, ta sẽ có kết quả:

```
{ 
 :count=>9, 
 :heap_allocated_pages=>132, 
 :heap_sorted_length=>133, 
 :heap_allocatable_pages=>0, 
 :heap_available_slots=>53798, 
 :heap_live_slots=>53585, 
 :heap_free_slots=>213, 
 :heap_final_slots=>0, 
 :heap_marked_slots=>23105, 
 :heap_swept_slots=>13998, 
 :heap_eden_pages=>132, 
 :heap_tomb_pages=>0, 
 :total_allocated_pages=>132, 
 :total_freed_pages=>0, 
 :total_allocated_objects=>164009, 
 :total_freed_objects=>110424, 
 :malloc_increase_bytes=>389720, 
 :malloc_increase_bytes_limit=>16777216, 
 :minor_gc_count=>6, 
 :major_gc_count=>3, 
 :remembered_wb_unprotected_objects=>210, 
 :remembered_wb_unprotected_objects_limit=>394, 
 :old_objects=>20937, 
 :old_objects_limit=>37436, 
 :oldmalloc_increase_bytes=>390184, 
 :oldmalloc_increase_bytes_limit=>16777216
}
```

Có một số lượng khá lớn các thông tin ở đây, tuy nhiên, thực tế chỉ có 2 thông tin mà chúng ta nên tập trung vào, đó là `:total_allocated_objects` và `:total_freed_objects`. Đó là hiển thị tất cả các object được khởi tạo và hiển thị tổng số object đang không sử dụng.

Thêm vào đó, để theo dõi bộ nhớ hoạt động của Ruby, chúng ta có thể dùng 1 gem là `get_process_mem` để lấy lượng sử dụng bộ nhớ của một tiến trình. Chúng ta thêm gem `get_process_mem` vào Gemfile và chạy bundle install. Sau đó, khởi tạo object GetProcessMem và sử dụng lệnh `.mb` để trả về dung lượng bộ nhớ đã dùng bằng MB. Chúng ta có thể cài đặt môi trường test bằng cách:

```ruby
require ‘get_process_mem’
GC.start
allocated_before = GC.stat(:total_allocated_objects)
freed_before = GC.stat(:total_freed_objects)
mem = GetProcessMem.new
puts “Memory usage before: #{mem.mb} MB.”
#
# some code to test
#
mem = GetProcessMem.new
puts “Memory usage after: #{mem.mb} MB.”
GC.start
allocated_after = GC.stat(:total_allocated_objects)
freed_after = GC.stat(:total_freed_objects)
puts “Total objects allocated: #{allocated_after — allocated_before}”
puts “Total objects freed: #{freed_after — freed_before}”
```

Bây giờ, bắt đầu test:

###  Bài test 1: mảng object 

Đầu tiên, chạy thử một mảng, bởi vì các object được giữ lại trong một mảng, hãy xem chạy gì sẽ xảy ra nếu chúng ta giữ lại một lượng lớn các object trong một array:

```ruby
array = []
1_000_000.times do
 array << “a sample string”
end
```

Và kết quả là:

```ruby
Memory usage before: 11.70703125 MB.
Memory usage after: 60.765625 MB.
Total objects allocated: 1000119
Total objects freed: 140
```

Như bạn thấy, dung lượng bộ nhớ sử dụng đã tăng một cách đáng kể và chỉ rất ít object được giải phóng. Chúng ta đã tạo ra 1,000,000 bản copy của string mẫu nhưng chúng không được bộ thu rác xử lý, bởi vì Ruby đoán là chúng có thể sẽ được dùng trong tương lại, bởi vì chúng ta đang giữ lại các object.

Nhưng điều gì sẽ xảy ra nếu vẫn là 1,000,000 lần nhưng không giữ lại chúng?

```ruby
1_000_000.times do
 string = “a sample string”
end
```

Và kết quả là:

```ruby
Memory usage before: 11.5859375 MB.
Memory usage after: 11.5859375 MB.
Total objects allocated: 1000118
Total objects freed: 1000140
```

Bây giờ, tất cả các object đã được giải phóng và bộ nhớ được dùng trước và sau đều thực sự không thay đổi.

Vậy, làm sau chúng ta có thể vừa giữ lại dữ liệu vào mảng như lần test đầu tiên, nhưng vẫn giảm bộ nhớ tiêu thụ? Có một cách là gọi lệnh `freeze` trong string. freeze là một phương thức được xây dựng để ngăn chặn việc chỉnh sửa một object, do đó nó có thể dễ dàng được tái sử dụng và tái tham chiếu. 

```ruby
array = []
1_000_000.times do
 array << “a sample string”.freeze
end
```

Và kết quả là:

```ruby
Memory usage before: 11.63671875 MB.
Memory usage after: 19.26953125 MB.
Total objects allocated: 119
Total objects freed: 140
```

Như bạn thấy đấy, mặc dù tổng số object được giải phóng không thay đổi quá nhiều, nhưng tổng số object được khởi tạo và dung lượng bộ nhớ tiêu thụ ít hơn rất nhiều so với bài test đầu tiên. Vậy chuyện gì đã xảy ra với Ruby, vấn đề ở đây là thay vì lưu trữ  1,000,000 object khác nhau, Ruby chỉ lưu trữ một chuỗi string nhưng có 1,000,000 tham chiếu đến object đấy.

Thêm vào đó, kết quả tương tự cũng có thể đạt được bởi một phương pháp phổ biến hơn, chỉ đơn giản là gán string cho một biến:

```ruby
array = []
string = “a sample string”
1_000_000.times do
 array << string
end
```

Và kết quả đạt được:

```ruby
Memory usage before: 11.57421875 MB.
Memory usage after: 19.32421875 MB.
Total objects allocated: 120
Total objects freed: 140
```

Điều này rất đáng lưu ý, vì thông thường trong quá trình code, chúng ta ít khi tách 1 biến riêng để lưu string object như thế, vì sẽ làm cho code nhìn không được đẹp, tuy vậy với lợi ích giảm bớt tiêu thụ bộ nhớ thì rất đáng để code xấu một chút.

Một VD khác, giả sử chúng ta thay đổi các object enum:

```ruby
array = [“cat”, “mice”, “dog”, “giraffe”,”elephant”]
array *= 100_000 #copy mảng 100000 lần
array.map do |element|
 element.gsub(/[aeiou]/, ‘*’).upcase
end
```

và kết quả:

```ruby
Memory usage before: 11.640625 MB.
Memory usage after: 92.2578125 MB.
Total objects allocated: 3500129
Total objects freed: 3500142
```

Vậy có cách nào giảm bộ nhớ tiêu thụ và tăng tốc? bắt đầu từ Ruby 2.0, chúng ta có thể tạo ra `enumerators lazy`, nó là một tính năng rất tuyệt với, giúp cải thiện đáng kể bộ nhớ tiêu thụ khi gắn các phương thức vào một enumerator. Để sử dụng tính năng này, chúng ta chỉ đơn giản là thêm lazy vào enumerator:

```ruby
array = [“cat”, “mice”, “dog”, “giraffe”,”elephant”]
array *= 100_000 #copy mảng 100000 lần
array.lazy.map do |element|
 element.gsub(/[aeiou]/, ‘*’).upcase
end
```

Điều gì sẽ xảy ra:

```ruby
Memory usage before: 11.62109375 MB.
Memory usage after: 15.28515625 MB.
Total objects allocated: 136
Total objects freed: 149
```

Vâng , thật tuyệt vời, chỉ đơn giản thêm method `lazzy`, chúng ta đã có thể giảm bớt một số lượng rất lớn bộ nhớ tiêu thụ khi chạy.

### Bài test 2: đọc file CSV

Đọc file CSV là tính năng mà gần như mọi chương trình chúng ta đều có, thông thường, khi đọc file CSV, ta hay sử dụng method `CSV.read`, method này sẽ đọc và load toàn bộ file CSV vào bộ nhớ, ta có theo dõi VD, với 1 file CSV có dung lượng 70MB:

Ta chạy lệnh đọc file với CSV.read để in ra dòng đầu tiên 

```ruby
CSV.read(file_path, encoding: Encoding::SJIS).first
```

kết quả là 

```ruby
Memory usage before: 154.3828125 MB.
Memory usage after: 663.17578125 MB.
Total objects allocated: 19473032
Total objects freed: 19473078
```

Tất cả object được khởi tạo thì đều được giải phóng hết, tuy nhiên bộ nhớ tiêu thụ lại là hơn 500MB, con số này khá là cao trong khi file CSV test mới là 70MB, giả sử file test mà 1GB thì chắc là bộ nhớ tràn luôn rồi.

Vậy chúng ta có giải pháp gì, vừa đảm bảo GC xử lý tốt, vừa giảm bớt bộ nhớ tiêu thụ, có, đó là `CSV.foreach`

```ruby
CSV.foreach(file_path, encoding: Encoding::SJIS).first
```

Ta được:

```ruby
Memory usage before: 154.94140625 MB.
Memory usage after: 156.203125 MB.
Total objects allocated: 377
Total objects freed: 399
```

Vâng, object đã được giải phóng hết, và bộ nhớ tiêu thụ chỉ có 2MB, cơ chế của CSV.foreach là chỉ load từng row của file CSV, còn CSV.read sẽ load toàn bộ file CSV vào bộ nhớ, cách này có thể giúp load dữ liệu về sau rất là nhanh vì toàn bộ file đã nằm trong bộ nhớ, nhưng thời gian load ban đầu sẽ rất lâu và bộ nhớ sẽ tốn rất nhiều, ảnh hưởng đến cách hoạt động khác.

### Bài test 3: query với includes relation

Chúng ta đều biết, cách giải quyết đơn giản nhất cho lỗi query N + 1 đó là dùng lệnh `includes`, khi đó thay vì trigger từng câu query cho mỗi element cha, thì chỉ có 2 query, 1 là lấy dữ liệu cha, và 2 là lấy tất cả các dữ liệu của relation con có quan hệ với id cha

VD:

```ruby
# company has_many user 

User.all.limit(10).each do |user|
    puts user.company.name
end

# với lệnh này, sẽ sinh ra 11 câu query, 1 là lấy 10 user, và 10 query còn lại để lấy thông tin company 

# sử dụng includes

User.includes(:company).all.limit(10).each do |user|
  puts user.company.name
end

# includes sẽ chỉ sinh ra 2 query, 1 là để lấy 10 user, và 1 query còn lại để lấy toàn bộ company có liên quan đến 10 user 
```

bản chất của includes - thực ra là preload trong trường hợp này, đó là dùng 1 query để lấy tất các đối tượng liên quan, và lưu những object này vào bộ nhớ, khi đó, khi gọi user.company.name thì company.name của 1 user đã được lưu sẵn trong bộ nhớ rồi nên sẽ lấy ra luôn.

Cách này rất giảm bớt query DB rất nhiều, nhưng có 1 điểm cần lưu ý, đó là sẽ load toàn bộ record company liên quan đến user vào bộ nhớ, giả sử dữ liệu cho mỗi object company có 50 cột, trong khi ta chỉ sử dụng 2 trường thôi thì sẽ rất là lãng phí bộ nhớ khi phải lưu lại toàn bộ record với 50 cột.

Vậy thay vì sử dụng includes, ta dùng truy vấn select của SQL, lấy thêm các cột cần thiết qua truy vấn User, như thế với mỗi object user, thì sẽ chỉ cần thêm vài cột thông tin company mà ta cần, sẽ giảm bớt đáng kể bộ nhớ sử dụng.

Cách này rất nên áp dụng khi thực hiện export data. Thông thường khi code, khi export dữ liệu 1 bản ghi, ta hay phải kèm theo các dữ liệu liên quan ở các bảng khác, bình thường ta sẽ dùng includes để cache truy vấn, load toàn bộ object vào bộ nhớ, nhưng nếu data của mỗi bảng rất lớn, 50 hoặc 100 trường, và ta phải thêm quan hệ với rất nhiều bảng khác, thì dùng lệnh includes sẽ rất nguy hiểm với bộ nhớ, rất dễ bị tràn bộ nhớ. Khi đó, ta nên sử dụng truy vấn select SQL, chỉ lấy các cột cần thiết của mỗi record, như vậy, bộ nhớ tiêu thụ sẽ giảm đáng kể, ta sẽ chỉ load các cột cần thiết mà thôi.

## Tổng kết

Để tăng tốc ứng dụng thông qua việc quản lý bộ nhớ, ta cần có 2 chú ý chính: đó là dung lượng bộ nhớ tiêu thụ và tổng số object được giải phóng.

Tối ưu nhất đó là bộ nhớ tiêu thụ ít và tổng số object được giải phóng hết so với số object khởi tạo, 1 trong 2 yếu tố không thoả mãn sẽ làm cho ứng dụng có vấn đề với performance, điều này có thể làm được thông qua việc đánh giá dựa theo số liệu từ file setup bên trên, từ đấy ta sẽ tìm ra được nguyên nhân gây tốn bộ nhớ và cách giải quyết phù hợp.