3 phương thức nil?, empty?, blank? là những lựa chọn mà bạn sẽ sử dụng nhiều nhất trong quá trình sử dụng và làm việc với ruby. Nhưng nếu bạn chưa nắm bắt được hết các trường hợp của nó thì đây có thể là một trong những nguy cơ tiềm ẩn cao trong quá trình phát triển dự án. Qua bài viết chúng ta có thể đánh giá chính xác những ứng dụng mà những phương thức này có thể đem đến.

### nil?
* Là phương thức của `Ruby`
* Có thể sử dụng trên bất cứ đâu bạn muốn
* Trả về giá trị `true` chỉ khi kết quả là nil

``` ruby
nil.nil?
# => true

false.nil?
# => false

0.nil?
# => false

"".nil?
# => false

[].nil?
#=> false
```

### empty?
* Là phương thức của `Ruby`
* Có thể sử dụng trên những *collections* như `Array`, `Hash`, `Set`,...
* Trả về giá trị `true` chỉ khi những *collections* không có phần tử nào.

``` ruby
[].empty?
# => true

{}.empty?
# => true

Set.new.empty?
# => true
```

* Nhưng thuộc tính này không có trong Enumerable. Enumerator là một đối tượng lặp với quy tắc được đề ra trước, nhưng không không phải mọi đối tượng lặp đều có những giá trị trả về.

``` ruby
fibonacci = Enumerator.new do |y|
  a = b = 1
  loop do
    y << a
    a, b = b, a + b
  end
end

fibonacci.empty?
# NoMethodError: undefined method `empty?' for #<Enumerator:
```

* Một trường hợp đặc biệt khác đó là bạn có thể sử dụng `empty?` trên `String`. Cấu tạo của String có thể hiểu đơn giản là một collection của character.

``` ruby
"".empty?
# => true

" ".empty?
# => false
```

* Từ đây có một vấn đề với `empty?` đó là khi bạn muốn sử dụng nó bạn phải biết được chính xác lớp của đối tượng này. nếu bạn không biết đối tượng này là `Array` hay `nil` và muốn sử dụng `empty?` thì nó không an toàn. Bạn cần thực biện giải pháp kiểm tra kép.

``` ruby
object = rand > 0.5 ? nil : array
object.empty? # can raise an exception

if !object.nil? && !object.empty? # doh...
  # do something
end
```

### blank?
* Là phương thức của `Rails`
* `nil` và `false` chắc chắn là blank
* `true` không phải là blank

``` ruby
nil.blank?
# => true

false.blank?
# => true

true.blank?
# => false
```

* `Array` và `Hash` là blank khi chúng là empty. Rails thực hiện điều này bằng cách sử dụng alias_method.

``` ruby
class Array
  #   [].blank?      # => true
  #   [1,2,3].blank? # => false
  alias_method :blank?, :empty?
end

class Hash
  #   {}.blank?                # => true
  #   { key: 'value' }.blank?  # => false
  alias_method :blank?, :empty?
end

[].blank?
# => true

[1, nil, 2].blank?
# => false

{}.blank?
# => true

{"key" => "value"}.blank?
# => false
```

* Ở ví dụ trên ta có `"  ".blank? #=> true` bạn có thấy sự khác biệt khi sử dụng String#blank? có sự khác biệt so với String#empty? của Ruby. 

``` ruby
class String
  BLANK_RE = /\A[[:space:]]*\z/

  # A string is blank if it's empty or contains whitespaces only:
  #
  #   ''.blank?       # => true
  #   '   '.blank?    # => true
  #   "\t\n\r".blank? # => true
  #   ' blah '.blank? # => false
  #
  # Unicode whitespace is supported:
  #
  #   "\u00a0".blank? # => true
  #
  def blank?
    # The regexp that matches blank strings is expensive. For the case of empty
    # strings we can speed up this method (~3.5x) with an empty? call. The
    # penalty for the rest of strings is marginal.
    empty? || BLANK_RE.match?(self)
  end
end
```

Giải thích cho việc khoảng trắng của chuỗi string vẫn là true khi kiểm tra blank. Điều này rất thuận tiện cho các ứng dụng web khi bạn luôn không muốn so sánh cách chuỗi khác nhau khi chúng chỉ chứa khoảng trắng.

* Logic blank với những object khác là nó sẽ kiểm tra empty? được định nghĩa cụ thể dưới đây

``` ruby
class Object
  # An object is blank if it's false, empty, or a whitespace string.
  # For example, +false+, '', '   ', +nil+, [], and {} are all blank.
  #
  # This simplifies
  #
  #   !address || address.empty?
  #
  # to
  #
  #   address.blank?
  #
  # @return [true, false]
  def blank?
    respond_to?(:empty?) ? !!empty? : !self
  end
```

!!empty? là phủ định kép của empty? nó giúp cho các trường hợp khi gọi empty? mà trả về nil, một chuỗi hoặc số khác biệt với mong đợi giá trị trả về là kiểu Boolean. Nên giá trị luôn được trả về là kiểu boolean.

``` ruby
!!true
# => true

!!false
# => false

!!nil
 => false

!!0
# => true

!!"abc"
# => true
```

Bạn cũng có thể sử dụng blank với những lớp riêng của bạn có định nghĩa empty? riêng.

``` ruby
class Car
  def initialize
    @passengers = []
  end

  def enter(passenger)
    @passengers << passenger
  end

  def empty?
    @passengers.empty?
  end

  def run
    # ...
  end
end

car = Car.new
car.blank?
# => true

car.enter("robert")

car.blank?
# => false
```

* Trong đối tượng dạng số hoặc thời gian mọi người đều nghĩ là object nhưng trong rails họ đã định nghĩ lại phương thức blank? và điều này dường như giúp thực hiện nhanh hơn khi sử dụng blank trong `Numberic` và `Time` như sau.

``` ruby
class Numeric #:nodoc:
  #   1.blank? # => false
  #   0.blank? # => false
  def blank?
    false
  end
end

class Time #:nodoc:
  #   Time.now.blank? # => false
  def blank?
    false
  end
end
```

### present?
* Là phương thức của `Rails`
* present? là phụ định của blank? và bạn có thể dụng  ở bất kỳ đâu

``` ruby
class Object
  # An object is present if it's not blank.
  def present?
    !blank?
  end
end
```

### present
Được cung cấp bởi Rails. Bạn có thể sử dụng trong những trường hợp sau:

``` ruby
params[:state] || params[:country] || 'US'
```

Trường hợp ở đây những params có thể trả về rỗng hoặc '' (khoảng trắng) và kết quả cuối cùng bạn muốn nhận là 'US'.

``` ruby
state   = params[:state]   if params[:state].present?
country = params[:country] if params[:country].present?
region  = state || country || 'US'
```

Bạn có thể viết thành

``` ruby
params[:state].presence || params[:country].presence || 'US'
```

Nó được định nghĩa đơn giản như sau

``` ruby
class Object
  def presence
    self if present?
  end
end
```

### Kết luận
Việc sử dụng lẫn lộn những phương thức này là không nên. Nếu bạn đang dùng rails thì bạn nên sử dụng `present?` hoặc là `blank?`. Nó hoạt động và có sẵn trên tất cả các đối tượng và bạn không cần kiểm tra nil? hay empty? một cách thủ công nữa.

Cảm ơn đã đón đọc.