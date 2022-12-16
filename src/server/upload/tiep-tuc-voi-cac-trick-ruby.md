Quá trình tiếp cùng ngôn ngữ Ruby của mình cũng khá là đủ để tỏ tình rồi (>6 tháng). Trong bài viết ngày mình tiếp tục  tổng hợp một số điều thú vị cho anh em có thêm kinh nghiệm làm quen này !!
## Cùng lúc gia tăng cả chữ và số 
```
"1".next
#=> "2"

"a".next
#=> "b"

"1a".next
#=> "1b"

"1z".next
#=> "2a"

"1aa".next
#=> "1ab"

"1az".next
#=> "1ba"

"1aaz".next
#=> "1aba"
```
## Associative arrays
```
aa = [ %w[Someone 1],
      %w[Bla 2]]

p aa.assoc("Someone")
p aa.assoc("Bla")

# Result:
# ["Someone", "1"]
# ["Bla", "2"]

p aa.rassoc("1")
p aa.rassoc("2")

# Result:
# ["Someone", "1"]
# ["Bla", "2"]
```
## At exit method
Chuyển đổi khối thành một đối tượng Proc (và do đó liên kết nó tại điểm gọi) và đăng ký nó để thực thi khi chương trình thoát. Nếu nhiều trình xử lý được đăng ký, chúng được thực hiện theo thứ tự ngược lại đăng ký.
```
#Basic use
puts 'script start'
at_exit do
  puts 'thực hiện at_exit method lần đầu'
end

#anywhere in your code again
at_exit do
  puts 'thực hiện at_exit method lần 2'
end
puts "script end"

#Result:
#script start
#script end
#thực hiện at_exit method lần 2
#thực hiện at_exit method lần đầu


#Own exception crash logger
at_exit do
  if $!            # Nếu chương trình thoát do ngoại lệ
    puts 'Exiting'

    #bạn có thể lưu log vào file
    #bạn có thể gửi notification đến ứng dụng khác
  end
end
```
## Autovivification
Một tính năng huyền thoại của Perl, định nghĩa hơi phức tạo nhưng bạn có thể đọc ví dụ sau để hiểu:
```
deep = Hash.new { |hash,key| hash[key] = Hash.new(&hash.default_proc) }


deep[:a][:b][:c][:d] = 42
p deep

# Result:
# {:a=>{:b=>{:c=>{:d=>42}}}}
```
## Blocks có thể lấy ra blocks :thinking:
```
var = :var
object = Object.new

object.define_singleton_method(:show_var_and_block) do |&block|
  p [var, block]
end

object.show_var_and_block { :block }

# Result:
# [:var, #<Proc:0x007ffd6c038128@./blocks_can_take_blocks.rb:8>]
```
## Case trên một ranges
```
age = rand(1..100)
p age

case age
  when -Float::INFINITY..20
    p 'bạn còn quá trẻ'
  when 21..64
    p 'Tuổi của bạn phù hợp'
  when 65..Float::INFINITY
    p 'Bạn quá già'
end

# Result:
# 55
# "Tuổi của bạn phù hợp"
```
## Cycle
```
ring = %w[one two three].cycle

p ring.take(5)

# Result:
# ["one", "two", "three", "one", "two"]
```
## Fast memoization fibonacci
À thì bài toán kinh điển mà 
```
fibonacci = Hash.new{ |numbers,index|
  numbers[index] = fibonacci[index - 2] + fibonacci[index - 1]
}.update(0 => 0, 1 => 1)


p fibonacci[300]

# Result:
# 222232244629420445529739893461909967206666939096499764990979600
```

## Shortcut variable interpolation
```
@instance = :instance
@@class = :class
$global = :global

p "#@instance, #@@class, và #$global variables không cần  dấu ngoặc"

# Result:
# "instance, class, và global variables không cần  dấu ngoặc"
```
## Biến trong regex
```
if  /\A(?<first>\w+),\s*(?<last>\w+)\z/ =~ "Ha, Quang"
  puts "#{first} #{last}"
end

# Result:
# Ha Quang
```
## Zip
Dưới đây là ví dụ xử dụng !!
```
letters = "a".."d"
numbers = 1..3

letters.zip(numbers) do |letter, number|
  p(letter: letter, number: number)
end

# Result:
# {:letter=>"a", :number=>1}
# {:letter=>"b", :number=>2}
# {:letter=>"c", :number=>3}
# {:letter=>"d", :number=>nil}
```
## Nội suy Block Parameters
Bạn muốn lặp qua một hash,  lấy các phần tử và sử dụng. Proc#parameters là một lựa chọn không tồi
Ví dụ:

```
hash = {
  first_name: "John",
  last_name:  "Smith",
  age: 35,
  # ...
}

hash.using do |first_name, last_name|
  puts "Hello, #{first_name} #{last_name}."
end

# or even...

circle = {
  radius: 5,
  color: "blue",
  # ...
}

area = circle.using { |radius| Math::PI * radius**2 }
```

Các thực hiện:
```
class Hash
  module Using
    def using(&block)
      values = block.parameters.map do |(type, name)|
        self[name]
      end

      block.call(*values)
    end
  end

  include Using
end
```

Trên đây là một vài tricks mà mình tổng hợp được !! Mong ràng những thư mình tổng hợp giúp đỡ bạn tiếp cận với ruby dễ dàng hơn :joy::joy::joy::joy::joy: