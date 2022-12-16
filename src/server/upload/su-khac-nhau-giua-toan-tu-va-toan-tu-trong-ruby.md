Trong Ruby, toán tử `===` thường được gọi là `case equality operator` (hay còn được gọi là triple equals operator), nó khác với toán tử `==` hay còn được gọi là `generic equality`.

![](https://images.viblo.asia/759cb96a-3148-4f60-b9ac-2e96fd727985.jpeg)

Toán tử `==` dùng để so sánh hai vế có cùng giá trị hay không, đây là cách so sánh phổ biến và cơ bản nhất trong hầu hết các ngôn ngữ lập trình.

Toán tử `===` thì thú vị hơn nhiều, có ở khắp mọi nơi trong Ruby nhưng hầu hết mọi người chưa bao giờ thấy nó thực ra ở đó. Nó ẩn bên trong một cấu trúc điều khiển `case when`thông thường; bất cứ khi nào bạn đang sử dụng `case when`, trên thực tế bạn đang sử dụng toán tử `===`; và chính điều này làm cho câu lệnh `case` trên Ruby mạnh hơn nhiều so với các ngôn ngữ như khác như C hay Java.

```ruby
case foo
when bar
  baz
when quux
  flurb
else
  blarf
end
```

Sẽ tương ứng với

```ruby
_temp = foo

if bar === _temp
  baz
elsif quux === _temp
  flurb
else
  blarf
end
```

Toán tử `===` được hiểu đơn giản là so sánh theo kiểu trường hợp. Các điều kiện của case sẽ đc implement với mỗi class tương ứng như:

- Range
- Regex
- Proc
- ...

Ví dụ đơn giản:

```ruby
(1...10) === 5 # => true
```

Toán tử `===` sẽ đi kiểm tra array trong mệnh đề trên có tồn tại `5` hay không. Nếu có sẽ trả về `true` và nếu không trả về `false`.

```ruby
(1..5) === 3           # => true
(1..5) === 6           # => false
Integer === 42          # => true
Integer === 'fourtytwo' # => false
/ell/ === 'Hello'     # => true
/ell/ === 'Foobar'    # => false
'a' === 'b' # false # different values, different objects
'a' === 'a' # true # same values
```

```ruby
'test' == 'test'  #=> true
'test' === 'test' #=> true
```

Vậy toán tử `==` và toán tử `===` có gì khác nhau?

```ruby
String === 'test'   #=> true
String == 'test'    #=> false
```

Như vậy `===` cũng đơn thuần là so sánh giá trị chứ không phải là so sánh object, chỉ có điều nó dùng case để so sánh và vì thế `===` mới được gọi là `case equality`.

Hãy cùng tìm hiểu một vài trường hợp sử dụng để hiểu thêm về toán tử `===` trong Ruby.

### `Array.grep`

Mảng trong Ruby có một method sử dụng toán tử `===` là [`grep`](https://apidock.com/ruby/Enumerable/grep).
Kết quả trả về là một mảng thỏa mãn.

```ruby
(1..100).grep(38..44)
#=> [38, 39, 40, 41, 42, 43, 44]

names = %w(
  William
  Kate
  Adam
  Alexa
  James
  Natasha
)
names.grep(/am/)
# => %w(William Adam James)

```

### Ranges

Toán tử `===` dùng để kiểm tra xem đối tượng đó là một trong các phần tử của range đó hay không.

```ruby
(2..4) == 3 # => false

(2..4) === 3 # => true
(2..4) === 6 # => false

(Date.parse('2017/08/21')..Date.parse('2017/08/27')) === Date.parse('2017/08/26')
# => true

(Date.parse('2017/08/21')..Date.parse('2017/08/27')) === Date.parse('2017/08/29')
# => false

('a'..'z') === 'a'
# => true

('a'..'z) === 'abc'
# => false
```

### Class / Module

Khi so sánh `mod === obj`, kết quả trả về sẽ là `true` nếu `obj` là một instance của `mod` hoặc là một trong những hậu duệ của mod. Việc sử dụng hạn chế cho `module`, nhưng có thể được sử dụng để phân loại các đối tượng theo `class`. Về cơ bản thực hiện như là `obj.kind_of?(mod)`. Cùng xem ví dụ:

```ruby
'text'.class.ancestors
# => [String, Comparable, Object, Kernel, BasicObject]

String === 'text'
# => true

Object === 'text'
# => true

Numeric === 'text'
# => false
```

### Regexp

So sánh `rxp === str` thì cơ bản sẽ thực hiện như `rxp =~ str >= 0`.

Tức là kết quả trả về `true` khi `str` match với `rxp` và ngược lại thì trả về `false`. Ví dụ:

```ruby
/^[a-z]*$/ === 'HELLO'
#=> false

/^[A-Z]*$/ === 'HELLO'
#=> true
```

### Proc

So sánh `proc === obj` thì sẽ gọi block với một đối tượng như tham số giống như `#call`. Ví dụ:

```ruby
is_today = -> (date) { Date.current === date }

is_today === Date.current
# => true

is_today === Date.tomorrow
# => false

is_today === Date.yesterday
# => false
```

Lambdas thì cũng tương tự với `proc`.

### Object

Với object thì toán tử `===` cũng tương tự như toán tử `==`.

***

Trên đây mình đã trình bày một số điểm khác nhau giữa toán tử `===` và `==` trong Ruby.

Cũng gần giống như thế, trong Javascript, toán tử `===` chỉ trả về `true` nếu như cả hai toán hạng đều cùng một loại và có cùng giá trị. Nếu so sánh khác loại, kết quả sẽ trả về `false`. Bạn có thể xem bài viết chi tiết hơn ở [đây](https://codeaholicguy.com/2016/06/14/nen-dung-hay-de-so-sanh-trong-javascript/).

Hi vọng với bài viết này, bạn sẽ phân biệt được 2 toán tử so sánh này.

Cám ơn

***

### Tham khảo

- https://codeaholicguy.com/2016/06/14/nen-dung-hay-de-so-sanh-trong-javascript/

- https://stackoverflow.com/a/4467823