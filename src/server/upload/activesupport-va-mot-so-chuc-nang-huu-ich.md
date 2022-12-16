### Giới thiệu

Mọi developers sử dụng Rails để xây dựng ứng dụng của mình đều sử dụng Active-Support. Nó mở rộng Rails và mọi lập trình viên có thể đã từng sử dụng nó một lần:
```
... rails/rails.gemspec

  21  s.files = ["README.md"]
  22
  23  s.add_dependency "activesupport", version
  24  s.add_dependency "actionpack",    version
  25  s.add_dependency "actionview",    version
  ```
  Nhưng thường thì nhiều người không nhận ra nó khi họ sử dụng gem này. Bài viết này gợi lại một số tính năng hữu ích mà Active Support  mang lại cho các ứng dụng Rails của chúng ta.
  
###   Gem
  
  Active Support là một collection các phần mở rộng cho các lớp Ruby chuẩn. Chủ yếu mục tiêu của chúng là làm việc với Web, nhưng nó cũng có nhiều phần mở rộng hữu ích khác có thể có ích trong việc phát triển các ứng dụng không phải web. Thường thì khi chúng ta tạo ra ứng dụng Rails, hầu hết những thứ tuyệt vời đều đã có sẵn cho chúng ta, bởi vì Active Support bổ sung các phần mở rộng của nó vào các lớp Ruby chuẩn. Tất cả các thay đổi, mà các lớp tiêu chuẩn được tiếp xúc, có thể được xem tại đây.
  
  [https://github.com/rails/rails/tree/master/activesupport/lib/active_support/](https://github.com/rails/rails/tree/master/activesupport/lib/active_support/)
  
  Hãy cùng xem chi tiết những thay đổi này như thế nào.
  
###   Những gì chúng ta đã có
  
  Active Support góp phần chuyển đổi các `object` thành `string`. Thay vì dùng ký hiệu Ruby cơ bản với `e`, chúng ta sẽ nhận được 1 số thực dấu phẩy động.
  ```
  > require "bigdecimal"
  => true
  > BigDecimal.new("0.2").to_s
  => "0.2e0"
  
  rails c
  > BigDecimal.new("0.2").to_s
  => "0.2"
  ```
  Class `Range` cũng được thay đổi. Phương thức `Range.to_s` giả định đối số là một trong các định dạng, nhưng giờ chỉ có 1 định dạng có sẵn - `:db`
  ```
  > (Date.today..Date.tomorrow).to_s
=> "2018-04-27..2018-04-28"
> (Date.today..Date.tomorrow).to_s(:db)
=> "BETWEEN '2018-04-27' AND '2018-04-28'"
```

Phương thức `Range.include?` cũng được các nhà phát triển module chú ý đến bằng cách thêm khả năng pass một `range` khác làm đối số. Qua đó, nó kiểm tra một range lồng nhau trong một range khác:

```
ruby > (Date.yesterday..Date.tomorrow).include?((Date.today..Date.tomorrow) ) => true
```
Chúng ta đều đã biết về phương thức `Array.slice`, Active Support cũng thêm chức năng này trong Hash, nó hoạt động tương tự như đối với Array, nhưng sử dụng các `key` thay vì các chỉ mục.
```
ruby > [1,2,3,4].slice((1..2)) => [2, 3] > {a: 1, b: 2, c: 3}.slice(:a, :c) => {:a=>1, :c=>3}
```

### Những gì chúng ta đã quen


Chúng ta sử dụng phương thức `present?` và `blank?` rất nhiều trong code của mình nhưng phương thức này không nằm trong colection tiêu chuẩn của Ruby. Những phương thức này được cung cấp trong ứng dụng Rails của chúng ta nhờ Active Support.
```
 #...rails/activesupport/lib/active_support/core_ext/object/blank.rb

19 def blank?
20  respond_to?(:empty?) ? !!empty? : !self
21 end

26 def present?
27  !blank?
28 end
```
Như bạn thấy, đây là một test cho phương thức `empty?` (phương thức từ Object). Active Support cũng định nghĩa hành vi của các class method cơ bản sau: `NilClass, FalseClass, TrueClass, Array, Hash, String, Numeric, Time` và một phương thức khác là `symbolize_keys`, nó sử dụng một phiên bản mở rộng để làm việc với các keys trong Hash: `transform_keys`

```
25 def transform_keys!
26   return enum_for(:transform_keys!) { size } unless block_given?
27   keys.each do |key|
28     self[yield(key)] = delete(key)
29   end
30   self
31 end unless method_defined? :transform_keys!
```
Trong đoạn code trên, chúng ta tạo một key mới bằng cách chạy block trên key cũ, đồng thời lấy giá trị từ key cũ và xóa nó. Nó được sử dụng để cài đặt các thiết kế design pattern, được sử dụng trong chức năng `delegate`.

```
#draper/draper.gemspec
    20 s.add_dependency 'activesupport', '~> 5.0'

   # ... rails/activesupport/lib/active_support/core_ext/module/delegation.rb

    157  def delegate(*methods, to: nil, prefix: nil, allow_nil: nil)
    158    unless to
    
```

Chúng ta nên đề cập ở đây rằng phần mở rộng này không sử dụng chuẩn `Module::Forwardable`.

Nhờ Active Support, có một "chức năng đối tượng giả" trong Rails (một cái gì đó giống như `Hashie::Mash`), không có gì kỳ diệu trong Rails configuration - chỉ đơn giản là `Hash`:

```
    config.active_storage = ActiveSupport::OrderedOptions.new
    ...
    config.action_mailer = ActiveSupport::OrderedOptions.new
    ...
    config.active_job = ActiveSupport::OrderedOptions.new
    ...
    config.i18n = ActiveSupport::OrderedOptions.new
    ...
    config.i18n.fallbacks = ActiveSupport::OrderedOptions.new
    ...
    config.action_controller = ActiveSupport::OrderedOptions.new
    ...
    config.active_support = ActiveSupport::OrderedOptions.new
    ...
    config.active_record = ActiveSupport::OrderedOptions.new
    ...
    #https://github.com/rails/rails/blob/master/railties/lib/rails/application/configuration.rb
    def method_missing(method, *args)
      if method =~ /=$/
        @configurations[$`.to_sym] = args.first
      else
        @configurations.fetch(method) {
          @configurations[method] = ActiveSupport::OrderedOptions.new
        }
      end
    end
```
Chỉ là `ActiveSupport::OrderedOptions` và một chút metaprogramming.

Một đặc điểm khác của Active Support là phương thức `try`.

```
    7  def try(*a, &b)
    8    try!(*a, &b) if a.empty? || respond_to?(a.first)
    9  end
    10
    11  def try!(*a, &b)
    12    if a.empty? && block_given?
    13      if b.arity == 0
    14        instance_eval(&b)
    15      else
    16        yield self
    17      end
    18    else
    19      public_send(*a, &b)
    20    end
    21  end
```

Không có gì khó hiểu về phương thức này. Đối với bất kỳ ai trong số các bạn, giống như tôi, những người không biết rằng `arity` xác định định lượng và định tính của tập các đối số mà phương thức trả về:
```
    class C
      def one;    end
      def two(a); end
      def three(*a);  end
      def four(a, b); end
      def five(a, b, *c);    end
      def six(a, b, *c, &d); end
    end
    c = C.new
    c.method(:one).arity     #=> 0
    c.method(:two).arity     #=> 1
    c.method(:three).arity   #=> -1
    c.method(:four).arity    #=> 2
    c.method(:five).arity    #=> -3
    c.method(:six).arity     #=> -3
  # ©https://apidock.com/ruby/Method/arity
```

Một ví dụ phổ biến khác từ `Active Support` là vị ngữ `in?` . và nó tương đương với `include?` trong Rails. Ngoài ra Ruby không biết phương thức như là cha của module /class. Trong bất kỳ tình huống khó hiểu nào, nó sẽ trả lại `Object`.

```
    13 parent_name = name =~ /::[^:]+\Z/ ? $```.freeze : nil
    ...
    35  parent_name ? ActiveSupport::Inflector.constantize(parent_name) : Object
```

Và Ruby không biết về các lớp con (phương thức lớp con). Để có được thông tin này, bạn phải lật ngược toàn bộ `ObjectSpace` và nó có rất nhiều resources:
```
#irb
    > ObjectSpace.each_object(Class){|k| p k.name}
    .....
    => 510

   #rails c
    > ObjectSpace.each_object(Class){|k| p k.name}
    ..........................(Beware – a very long output)
    => 15795
```
Bạn có biết rằng trong Rails, bạn có thể định nghĩa các thuộc tính của một lớp (không phải biến instance)? Thêm nữa là, bạn có thể làm điều đó, không phải thông qua ký hiệu kinh điển “@@”, mà thông qua `class_attribute`. Chúng ta sẽ định nghĩa lại chúng trong ví dụ sau và hãy so sánh:
```
#ruby 
@@default_params = {mime_version: "1.0", charset: "UTF-8", content_type: "text/plain", parts_order: [ "text/plain", "text/enriched", "text/html" ]}.freeze
```
và
```
  class_attribute :default_params
  self.default_params = {mime_version: "1.0",
  charset: "UTF-8",
  content_type: "text/plain",
  parts_order: [ "text/plain", "text/enriched", "text/html" ]}.freeze
```

Sự khác biệt này là đáng kể. Chúng không chỉ ảnh hưởng đến `default_params` từ phiên bản như chúng ta muốn mà chúng ta vẫn có thể kế thừa từ lớp cơ sở(base class) và đặt `default_params` trong lớp dẫn xuất(derived class ) mà không làm hỏng lớp cơ sở.
```
#irb
    >  class TestClass
    >      @@variable = "var"
    >      def self.variable
    >          # Return the value of this variable
    >           @@variable
    >      end
    >  end
    => :variable
    > TestClass.variable
    => "var"
    > class AnotherClass < TestClass
    >   @@variable = "not var"
    >   def self.variable
    >         # Return the value of this variable
    >          @@variable
    >   end
    > end
    => :variable
    > AnotherClass.variable
    => "not var"
    > TestClass.variable
    => "not var"
```
với `class_attribute` điều đó sẽ không xảy ra.

Ngoài ra, phương thức `instance_values`, `instance_variable_names`  không có trong thư viện ruby cơ sở - những gì về `instance_variables` (Object method) được định nghĩa trong phần mở rộng.

Module `Date` có thể giúp bạn có thể tìm thấy những ngày gần nhất theo ngày trong tuần, và ngày trước hoặc sau ngày được chỉ định tại một khoảng thời gian nhất định. Chưa kể đến quan hệ giữa `Date` và `DateTime`.
```
  > date = Date.new(2018, 4, 30)
  => Mon, 30 Apr 2018
  > date.beginning_of_day
  => Mon, 30 Apr 2018 00:00:00 WIB +07:00
```

Bằng cách này, trong `irb` dòng  `date = Date.new (2018, 4, 30)` sẽ có một kết quả hoàn toàn khác.
```
  > date = Date.new(2018, 4, 30)
  => #<Date: 2018-04-30 ((2458239j,0s,0n),+0s,2299161j)>
```
Đây cũng là Active Support, và đặc biệt là các định nghĩa lại các phương thức `inspect` và `to_s` trong lớp `Date`.
```
# activesupport/lib/active_support/core_ext/date/conversions.rb

  46  def to_formatted_s(format = :default)
  47   if formatter = DATE_FORMATS[format]
  48     if formatter.respond_to?(:call)
  49       formatter.call(self).to_s
  50     else
  51       strftime(formatter)
  52     end
  53   else
  54     to_default_s
  55   end
  56  end
  57 alias_method :to_default_s, :to_s
  58 alias_method :to_s, :to_formatted_xs

...
  61  def readable_inspect
  62    strftime("%a, %d %b %Y")
  63  end
  64  alias_method :default_inspect, :inspect
  65  alias_method :inspect, :readable_inspect
```
Và đó mới chỉ là đỉnh của tảng băng trôi. Bạn sẽ không tìm thấy các phương thức `truncate`, `starts_with?` và `ends_with?`, `indent` trong thư viện cơ sở. Không thể tìm thấy tất cả các nội dung thú vị như `dasherize`, `titleize`, `underscore`, `camelize`, `demodulize`, v.v. Bạn có muốn xử lý các params request HTTP không? hãy sử dụng Active Support (phương thức `to_param`, `to_query`). Không thể truy cập tới các phần tử của objects collection với `from`, `to`. Có các phần mở rộng cho các class `Numeric` (`years`, `days`, `hours`, `seconds`, `kilobytes`, `megabytes`, `gigabytes`, `exabytes`) và nhiều phần bổ sung hữu ích khác.
Tìm hiểu thêm về lợi ích của Active Support tại [đây](http://edgeguides.rubyonrails.org/active_support_core_extensions.html).

Link nguồn: http://jetrockets.pro/blog/active-support-outside-inside