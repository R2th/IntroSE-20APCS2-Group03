Case statement là một trong những cấu trúc mạnh nhất của ngôn ngử lập trình, riêng Ruby case statement thường bị đánh giá thấp trong việc code hàng ngày.

Ruby dùng phương thức so sánh bằng `===` để so sánh tương ứng trong case statement. Trong bài này sẽ tiếp cận về thêm tùy chọn hành vi cho case statement.

#### Proc như một match target
Một thuận lợi của `proc` là phương thức case equality của nó cho kết quả thực hiện `proc` của chính nó, có ích và nhanh chóng cho matching conditions:
```
def palindrome? word
  case word
  when proc{|w| w.reverse == w }
    true
  else
    false
  end
end
```

#### Mã có hiệu quả hơn với custom matchers
Custom matchers có thể giúp chúng ta code hiệu qủa hơn và gần hơn với ý định.
```
DivisibilityMatcher = Struct.new(:divisor) do
  def ===(target)
    target % divisor == 0
  end
end

def divisible_by(num)
  DivisibilityMatcher.new(num)
end

case 18
when divisible_by(5)
  puts "divisible by 5"
when divisible_by(3)
  puts "divisible by 3"
when divisible_by(2)
  puts "divisible by 2"
end

=> divisible by 3
```

#### Matchers cho membership evaluation
Sử dụng một case đơn giản để mở rộng case xử lý membership evaluation:
```
MembershipEvaluationMatcher = Struct.new(:collection) do
  def ===(target)
    collection.include? target
  end
end

def member_of collection
  MembershipEvaluationMatcher.new collection
end

case 1
when member_of(%w[a b c])
  puts 'case 1'
when member_of([1,2,3])
  puts 'case 2'
end

=> case 2
```

#### Matcher composition
Lợi thế của việc có các matcher object  chỉ xử lý việc kết hợp là chúng ta có thể tạo ra theo những cách nhìn từ quan điểm của sự kết hợp.

Hãy mở rộng kiểm tra chia để minh họa phần trên. Bạn có thể nhận thấy rằng cách viết trên không rơi vào các điều kiện - vì vậy trong khi chia hết cho 3, còn chia hết cho 2 thì không. Hãy kiểm tra cả hai bằng cách sử dụng một matcher.
```
CompositeDivisibilityMatcher = Struct.new(:matchers) do
  def ===(target) 
    combine_results matchers.map{|m| m === target }
  end

  def combine_results match_results
    false
  end
end

class AllDivisibilityMatcher < CompositeDivisibilityMatcher 
  def combine_results match_results
    match_results.reduce(:&)
  end
end

class AnyDivisibilityMatcher < CompositeDivisibilityMatcher
  def combine_results match_results
    match_results.reduce(:|)
  end
end

DivisibilityMatcher = Struct.new(:divisor) do
  def ===(target)
    target % divisor == 0
  end

  def &(matcher)
    AllDivisibilityMatcher.new([self, matcher])
  end

  def |(matcher)
    AnyDivisibilityMatcher.new([self, matcher])
  end

end

def divisible_by(num)
  DivisibilityMatcher.new(num)
end

(1..100).each do |num|
  case num
  when divisible_by(3) & divisible_by(5)
    puts 'FizzBuzz'
  when divisible_by(3)
    puts 'Fizz'
  when divisible_by(5)
    puts 'Buzz'
  else
    puts num
  end
end
```

Chúng ta có thể tận dụng `proc currying` giảm một số thừ bị thừa.
```
is_divisible = proc {|a,b| a % b == 0 }
is_divisible_by_all = proc {|arr, a| arr.map(&is_divisible.curry[a]).reduce(:&) }
is_divisible_by_any = proc {|arr, a| arr.map(&is_divisible.curry[a]).reduce(:|) }

case 18
when is_divisible_by_all.curry[[2, 3]]
puts 'div by 2 and 3'
when is_divisible_by_any.curry[[2, 3]]
puts 'div by 2 or 3'
end

=> div by 2 and 3
```

#### Matching against incomplete data structures
Chúng ta có thể mở rộng khái niệm này để phù hợp với cấu trúc dữ liệu tương tự chưa được xác định. Ở ví dụ dưới chúng ta kết hợp một list mà các giá trị bị thiếu được chú thích bằng `:_`. Case statement sẽ bỏ quả các phần tử khi matching.
```
module Matchers
  ListMatcher = Struct.new(:matchable_list) do
    def ===(list)
      return false unless list.length == matchable_list.length
      list.each_with_index do |item, idx|
        case matchable_list[idx]
        when :_, item
          next
        else
          return false
        end       
      end
      true
    end 
  end
end

def matches array
  Matchers::ListMatcher.new array
end

case [1,2,3]
when matches([1, :_ , 2, 3])
  puts "case 1"
when matches([4, 5, 6])
  puts "case 2"
when matches([:_, 1, 2])
  puts "case 3"
when matches([1, :_ , 3])
  puts "case 4"
end

# Outputs: case 4
```

#### Truy xuất các mục dữ liệu bị thiếu
Nếu chúng ta so sánh với cấu trúc dữ liệu không đầy đủ thì có thể tốt hơn khi truy xuất các phần tử thiếu đó. Việc này đòi hỏi thêm bản mẫu.
```
module Matchers

  Matchable = Struct.new(:target) do
    def matches
      @matches ||= []
    end
  end

  ListMatcher = Struct.new(:matchable_list) do
    def ===(list)
      return false unless list.target.length == matchable_list.length

      match_results = []

      list.target.each_with_index do |item, idx|
        case matchable_list[idx]
        when :_
          match_results << item
          next
        when item
          next
        else
          return false
        end       
      end

      list.matches << match_results
      true
    end 
  end

end

def matches array
  Matchers::ListMatcher.new array
end

matchable = Matchers::Matchable.new([1,2,3])

case matchable
when matches([1, :_ , 2, 3])
  puts "case 1"
when matches([4, 5, 6])
  puts "case 2"
when matches([:_, 1, 2])
  puts "case 3"
when matches([1, :_ , 3])
  puts "case 4"
end

puts matchable.matches
 => [[2]]
```

Khi chạy kết hợp các câu lệnh trường hợp nhều lần sẽ tiếp tục nối các kết quả khợp vào danh sách kết hợp.

Đến đây chúng ta đã xem qua một số các sử dụng của case mà nó có thể xây dựng thành cấu trúc để minh tận dụng lợi thế của nó.

> Bài này được dịch ra từ bài gốc [Extending the ruby case statement for fun and profit](https://lorefnon.me/2015/12/07/extending-the-ruby-case-statement-for-fun-and-profit.html#matching-against-incomplete-data-structures)