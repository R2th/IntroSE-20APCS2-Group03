Với phiên bản Ruby 2.7 có một số tính năng được cải tiến và thêm mới trong đó có 2 phần sẽ được trình bày trong bài viết này đó là `Enumerator#produce` và toán tử `...`.

### Enumerator#produce
Trước tiên để in ra 10 số đầu tiên của dãy fibonacci sẽ cần viết code như sau với `Ruby 2.6.5`
```
2.6.5 :001 > result = Enumerator.new do |yielder|
2.6.5 :002 >     base_1 = 0
2.6.5 :003?>     base_2 = 1
2.6.5 :004?>     loop do
2.6.5 :005 >       yielder.yield base_1
2.6.5 :006?>       base_1, base_2 = base_2, base_1 + base_2
2.6.5 :007?>     end
2.6.5 :008?>   end
 => #<Enumerator: #<Enumerator::Generator:0x00007fabfa8c9b48>:each>
2.6.5 :009 > result.take(10)
 => [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

Như đã chạy trên cần phải dùng `loop` và `yield` để có được kết quả mong muốn.

Bây giờ chúng ta có thể dùng `Enumerator#produce` với `Ruby 2.7.0-preview2` để có cùng kết quả nhưng đơn giản hơn.
```
2.7.0-preview2 :001 > Enumerator.produce([0, 1]) { |base_1, base_2| [base_2, base_1 + base_2] }.take(10).map(&:first)
 => [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 ```
 
 `Enumerator.produce(initial, &block)` sẽ tạo dãy vô hạn trong đó mỗi phân tử tiếp theo được tính toán bằng áp dụng `block` trước đó.
 
 `initial` là dãy phân tử đầu tiên, có thể dùng `produce` mà không cần giá trị `initial`.
 
  `Enumerator.produce(&block)` sẽ tạo dãy vô hạn với phân tử đầu tiên của dãy sẽ là kết quả của gọi block không có đối số.
  
  ```
  2.7.0-preview2 :001 > require 'date'
 => true
2.7.0-preview2 :002 > Enumerator.produce { Date.today+rand(30) }.detect{ |date| !date.sunday? || !date.saturday? }
 => #<Date: 2020-02-07 ((2458887j,0s,0n),+0s,2299161j)>
 ```
 
 Như đã trình bày trên với `produce` giúp tạo enumerators với code sạch sẽ và đơn giản hơn.
 Để tìm hiểu thêm về tính năng này có thể truy cập theo [link](https://bugs.ruby-lang.org/issues/14781) này.
 
 ### Cú pháp tốc ký `...` để truyền tiếp đối số
 
 Trong Ruby 2.7 đã thêm một cú pháp tốc ký `...` để truyền tiếp đối số cho một method.
 Hiện tại các toán tử có sẵn như `*` và `**` cho các đối số đơn và từ khóa đối số, được dùng để chỉ định bất kỳ các đối số hoặc biến đổi array hoặc hash thành một số đối số.
 
 Ý tưởng của toán tử `...` để bắt tất cả và truyền tiếp các đối số bất chấp kiểu, do vậy cho phép truyền tiếp các đối số đơn, từ khóa hoặc các block. Nói chung là sẽ truyền tiếp tất tất, tương tự với gọi `super` không có đối số.
 
 Hãy xem xét ví dụ dưới bằng xác định một phương pháp chấp nhận một số đối số thường như từ khóa và block.
 
 ```
 2.7.0-preview2 :002 > def perform(*args, **kws, &block)
2.7.0-preview2 :003 >   block.call(args, kws)
2.7.0-preview2 :004 > end
 => :perform
```

Tiếp đến sẽ xác định phương thức `call` mà truyền tiếp tất cả các đối số cho `perform` bằng tóan tử `...`

```
2.7.0-preview2 :005 > def call(...)
2.7.0-preview2 :006 >   perform(...)
2.7.0-preview2 :007 > end
 => :call
 ```
 
 Thử gọi `call` với các đối số trộn và block sẽ thực thi như sau:
 ```
 2.7.0-preview2 :008 > call(1, 2, 3, k1: 4, k2: 5) {|*x| puts x}
1
2
3
{:k1=>4, :k2=>5}
```
Từ này trở đi toán tử `...` có thể giới hạn để đơn giản hóa việc truyền tiếp hoặc delegating các đối số cho một phương thức.

Tuy nhiên, tính năng này sẽ được cả tiến như xử lý các đối số dẫn đầu mà có ưu điểm cho việc sử dụng như `method_missing`.

```
def method_missing(name, ...)
  if name.to_s.end_with?('=')
    update(name, ...)
  end
end
```

Cảm ơn các bạn đã đọc bài viết.

Tham khảo
- [Ruby 2.7 adds Enumerator#produce](https://blog.saeloun.com/2019/11/27/ruby-2-7-enumerator-produce.html)
- [Ruby 2.7 adds shorthand syntax for arguments forwarding](https://blog.saeloun.com/2019/12/04/ruby-2-7-adds-new-operator-for-arguments-forwarding.html)