## Pattern matching

Một cách switch case mới đã được giới thiệu, cho phép bạn viết các câu switch case như thế này:

```ruby
def test_pattern(value)
  case value
  in 0
    'Zero'
  in Integer if value < 0
    'Negative'
  in Integer => n
    "Number #{n}"
  in { value: x }
    "Hash value: #{x}"
  in _
    'Unknown'
  end
end

test_pattern(-1)            #=> 'Negative'
test_pattern(0)             #=> 'Zero'
test_pattern(2)             #=> 'Number: 2'
test_pattern({ value: 3 })  #=> 'Hash value: 3'
test_pattern('four')        #=> 'Unknown'
```

## Startless ranges

Trong 2.6, chúng ta có end-less ranges và lần này chúng ta sẽ nhận được start-less ranges. Điều này sẽ cho phép cú pháp như:

```ruby
case n
when ..0  then 'Negative'
when 1..9 then 'Single digit'
when 10.. then 'Two or more'
end
```

Một ứng dụng thú vị khác của điều này là khả năng sử nó trong DSL. Chẳng hạn, chúng ta có thể làm điều này trong ActiveRecord:

```ruby
Task.where(due_on: ..Date.today)
```

## Numbered parametes

Một cú pháp mới đã được thêm vào để cho phép đặt tên các tham số của block bằng một số nguyên.

```ruby
(1..3).map { _1 * _1 } #=> [1, 4, 9]

hash = { a: 2, b: 3 }
hash.map { "#{_1} = #{_2}" } #=> ["a = 1", "b = 2"]

add_3 = -> { _1 + _2 + _3 }
add_3.call(3, 5, 7) #=> 15
```

Đây là những ví dụ giả định, nhưng đến giờ tôi vẫn tin rằng không đáng để thêm cú pháp mới này và tôi không thấy mình sử dụng cú pháp này qua các đối số rõ ràng.

## Phương thức Enumerable và Array mới

Enumerable#tally đếm số lần xuất hiện của từng mục trong một enumerable và trả về nó dưới dạng hash.

```ruby
strings = ['a', 'a', 'a', 'b', 'c']
strings.tally
#=> { 'a' => 3, 'b' => 1, 'c' => 1 }

# in 2.6, we'd do it like this:
strings.each_with_object({}) do |value, result|
  result[value] ||= 0
  result[value] += 1
end
```

Enumerable#filter_map kết hợp select và map thành một khối duy nhất, tránh việc phải có một mảng trung gian.

```ruby
# squares of odd numbers in 1..10
(1..10).filter_map { |x| x*x if x.odd? } #=> [1, 9, 25, 49, 81]

# ruby 2.6
(1..10).select(&:odd?).map { |x| x*x }
```


Array#intersection tương đương với việc gọi "&" ở một array, nhưng cho phép có nhiều đối số.

```ruby
[1,2,3,4,5].intersection([2,3,4], [2,4,5]) #=> [2, 4]
```

Enumerator::Lazy#eager chuyển đổi một lazy enumerator thành một enumerator mà không có lười.

```ruby
(1..).lazy
  .select(&:odd?)    # lazy
  .take(3)           # lazy
  .eager             # next operation will be non-lazy
  .map { |x| x * x } #=> [1, 9, 25]
```

## Cú pháp chuyển tiếp tham số

Cú pháp mới (...) đã được thêm vào để cho phép chuyển tham số từ phương thức cha sang phương thức con. (Trong ví dụ dưới là từ add_and_double sang add)

```ruby
def add(a, b)
  a + b
end

def add_and_double(...)
  add(...) * 2
end

add_and_double(2, 3) #=> 10
```

## Compaction GC

Trình thu gom rác của Ruby đã nhận được những cải tiến liên tục với mỗi bản cập nhật, và lần này, một compactor đã được giới thiệu để chống phân mảnh và giúp giảm mức sử dụng bộ nhớ. Một phương pháp GC.compact cũng được giới thiệu, để cho phép kích hoạt nén thủ công.

## Gọi private method bằng self


Hành vi của private method đã thay đổi một chút. Trước đây, nếu bạn gọi một phương thức private bằng self, (ví dụ: self.foo), thì đó sẽ trả về NoMethodError vì các phương thức private chỉ có thể được gọi trên hàm con. Điều này đã thay đổi để việc self gọi một phương thức private không còn trả về lỗi nữa

Điều này trước đây chỉ có thể áp dụng cho private attr_accessors, nhưng bây giờ đã được mở rộng cho tất cả các phương thức private.

## Những feature nào mà chúng ta vẫn chưa nhận được?


Bên cạnh tất cả các tính năng mới đã được thêm vào, phiên bản này cũng có một số features thú vị nhưng vẫn chưa hoàn chỉnh. Sau đây là một số ít  các tính năng thử nghiệm được giới thiệu nhưng bị reverted trước khi phát hành cuối cùng.

Pipeline operator đã được giới thiệu, nhưng được reverted lại dựa trên phản hồi của cộng đồng.

```ruby
# with pipeline
foo
  |> bar 1, 2
  |> display

# normal method chaining
foo
  .bar(1, 2)
  .display
```

Tôi cảm thấy rằng đó là một bổ sung không cần thiết bởi vì nó trông giống pipeline operator Elixir, nhưng hoạt động hiệu quả như một lần gọi method . Trong ví dụ trên, sự khác biệt duy nhất là  (|>) không yêu cầu dấu ngoặc đơn xung quanh các tham số, trong khi đó là điều bắt buộc cho lệnh gọi phương thức bình thường.

Một toán tử tham chiếu tới phương thức đã được giới thiệu và sau đó được gỡ bỏ. Điều này sẽ cho phép viết File.method (: read) là File.:read. Bạn có thể sử dụng nó để chain các operations theo một cách khác:

```ruby
some_uri
  .then(&Net::HTTP.:get)
  .then(&JSON.:parse)
```


Điều này đã bị reverted vì Matz và nhóm của anh muốn suy nghĩ lại về thiết kế rộng xung quanh cách các tính năng lập trình chức năng sẽ hoạt động như thế nào trong Ruby.

Các chuỗi bất biến sẽ không được mặc định. Khi frozen_string_literal: true được giới thiệu trong Ruby 2.3, kế hoạch là làm cho chuỗi ký tự không thay đổi là mặc định trong Ruby 3.0. Tuy nhiên, Matz đã miễn cưỡng từ bỏ ý tưởng này để tránh các vấn đề tương thích với gem và để việc chuyển đổi sang Ruby 3.0 dễ dàng hơn.

Và cuối cùng, nói qua về flip flop operator. Tính năng khó hiểu này không được dùng nữa trong 2.6, với hy vọng rằng nó sẽ bị xóa trong 3.0. Tuy nhiên, sau một vài yêu cầu từ cộng đồng, Matz đã quyết định revered deprecation, vì vậy, nó sẽ không biến mất trong tương lai gần.

- Link bài viết gốc:
https://nithinbekal.com/posts/ruby-2-7/