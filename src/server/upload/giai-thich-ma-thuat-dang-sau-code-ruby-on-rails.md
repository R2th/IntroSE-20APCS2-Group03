Bài viết này mình muốn giới thiệu một số hàm làm nên tính độc đáo của Ruby on Rails code.
## 1. Kiểm tra sự hiện diện
Nếu đã code Rails bạn không xa lạ gì với các hàm `present?` và `blank?`. Cùng với đó `.presence`, chúng được sử dụng để xác minh xem một thứ nhất định (biến, đối tượng, thuộc tính) có bất kỳ giá trị nào hay không. Chúng phổ biến và hoạt động với mọi loại giá trị, và ẩn sâu bên trong, chúng rất đơn giản.

### blank?
Phương thức này kết thúc bằng dấu ngoặc kép vì nó luôn trả về giá trị boolean: truehoặc false. Như tôi đã đề cập trước đây, logic của nó là sơ đẳng. Chúng ta hãy xem xét kỹ hơn blank?mã nguồn cho các loại đối tượng khác nhau.

## 2. Object
```
def blank?
  respond_to?(:empty?) ? !!empty? : !self
end
```

Định nghĩa trên rất linh hoạt vì các đối tượng Ruby như mảng, hash và string triển khai phuơng thức `empty?` nhưng bạn cũng có thể sử dụng  và triển khai phương thức này trong các lớp của mình:

```
class Garage
  delegate :empty?, to: :@cars
  def initialize
    @cars = []
  end

  def park_car(car)
    @cars << car
  end
end
```
bạn có thể kiểm tra nó khi không có ô tô nào đậu bên trong nhà để xe và khi bạn đậu một ô tô:

```
garage = Garage.new
garage.blank? # => true

garage.park_car("Tesla")
garage.blank? # => false
```

## 3. String
Mặc dù string được thực hiện phương thức  `empty?`, nhưng không phải lúc nào cũng nên sử dụng phương thức đó. Nó sẽ không hoạt động nếu chuỗi chứa khoảng trắng; đó là lý do tại sao Rails triển khai `blank?` cho các string hơi khác một chút:

```
def blank?
  empty? ||
    begin
      !!/\A[[:space:]]*\z/.match(self, 0)
    rescue Encoding::CompatibilityError
      ENCODED_BLANKS[self.encoding].match?(self)
    end
end
```
Bởi vì regexp không tiện lợi, `empty?` được sử dụng ngay từ đầu, và nó là đủ trong hầu hết các trường hợp khi string không chứa bất kỳ thứ gì.

## 4. Integer
Đối với số nguyên `blank?` sẽ luôn trả về false:

```
def blank?
  false
end
```
## 5. Other objects
Rails triển khai `blank?` cho các đối tượng khác cũng như bao gồm:

* `ActiveRecord` mối quan hệ và lỗi
* Cấu hình cơ sở dữ liệu
* `TimeWithZone`, `Time`, `Date`, Và `DateTime`

Các định nghĩa phương pháp rất đơn giản; thông thường, họ quay trở lại falsehoặc được ủy quyền cho một phương thức khác, vì vậy không cần phải hiển thị nguồn của họ.

### present?
Phương thức này chỉ là một phép đảo ngược phương thức `blank?` để đơn giản cho các đối tượng khác nhau:

```
def present?
  !blank?
end
```

### presence
Trước khi tôi chỉ cho bạn source của method này, hãy xem một ví dụ đơn giản để hiểu tại sao bạn cần sử dụng nó:

```
class User < ApplicationRecord
  def full_address
    return address.full_address if address.full_address.present?

    "No location"
  end
end
```
Phương pháp trên khá đơn giản, nhưng chúng ta có thể biến nó thành một lớp lót với `presence`:

```
class User < ApplicationRecord
  def full_address
    address.full_address.presence || "No location"
  end
end
```
Khi giá trị hiện diện, phương thức trả về giá trị; nếu không, nó trả về nil; đó là lý do tại sao giá trị bổ sung được trả về. Hãy xem source của nó:

```
def presence
  self if present?
end
```
Một lần nữa, mã nguồn rất đơn giản, nhưng nó sẽ hoạt động hoàn hảo với bất kỳ loại đối tượng nào.

### Thao tác ngày với 1.day, 2.months.ago, v.v.
Rails giúp bạn dễ dàng thao tác ngày tháng bằng cách cung cấp một giao diện với nhiều giá trị mà con người có thể đọc được:

* 1.second
* 1.minute
* 1.hour
* 1.day
* 1.week
* 1.month
* 1.year
Với Ruby thuần túy, để thêm 5 giờ vào thời điểm hiện tại, bạn sẽ phải làm như sau:
```
Time.now + (60 * 60 * 5)
```
trong khi với Rails, bạn có thể chỉ cần làm:
```
Time.now + 5.hours
```
Điều này hoàn toàn đơn giản và có thể đọc được cùng một lúc. Chúng ta hãy xem xét kỹ hơn bên dưới của biểu thức đó.

### Thời gian hỗ trợ tích cực
Lớp chịu trách nhiệm về logic được đề cập là `ActiveSupport::Duration`. Hai lệnh gọi đó trả về cùng một giá trị:
```
60.seconds
ActiveSupport::Duration.new(60, seconds: 60)
```
Đối số đầu tiên là biểu diễn thời gian tính bằng giây và đối số thứ hai là đối số chính trong đó khóa là tên của đơn vị và giá trị là số giây, giờ, ngày, v.v.

Vì Rails mở rộng các lớp số, các phương thức như ngày, tháng, v.v., có sẵn trên số nguyên chuẩn hoặc số float. Bạn có thể sao chép hành vi đó bằng cách mở Integerlớp và thêm một số logic tùy chỉnh:
```
class Car; end

class Integer
  def cars
    Array.new(self) { Car.new }
  end
end
```
Bây giờ, nếu chúng ta muốn tạo hai chiếc ô tô, chúng ta có thể làm như sau:
```
2.cars # => [#<Car:0x00007ff2b01cae80>, #<Car:0x00007ff2b01cae58>]
```
### Cách đây một thời gian: Some time ago
Với Rails, chúng ta có thể xem ngày trước bằng cuộc gọi sau:
```
6.hours.ago
```
Vì chúng ta biết logic đằng sau là gì `6.hours`, bây giờ chúng ta có thể xem xét method `ago`. Phương pháp này sử dụng một mô-đun Hỗ trợ Hoạt động khác được gọi `TimeWithZone`.

Method `since` được gọi chấp nhận số giây và trả về thời gian trong quá khứ hoặc tương lai. Nếu số giây là số âm, nó sẽ trả về thời gian trong quá khứ:
```
1.hour.ago
# the same as
Time.current.since(-1 * (60 * 60))

1.hour.from_now
# the same as
Time.current.since(60 * 60)
```
### Cộng và trừ
Một điều còn lại để giải thích về cách chơi với ngày tháng với sự trợ giúp của Rails. Bạn thường có thể phát hiện ra mẫu sau trong nhiều ứng dụng:
```
Time.at(value) + 5.hours
```
Vậy điều gì sẽ xảy ra nếu bạn muốn tăng giá trị thời gian lên một số giờ nhất định? Vì `+` chỉ là một phương thức được gọi trên một `Time` instance, chúng ta có thể kiểm tra vị trí phương thức được xác định bằng cách thực thi đoạn mã sau:
```
Time.instance_method(:+).source_location
```
Một lần nữa, `ActiveSupport` ghi đè phương thức mặc định, vì vậy có thể chuyển `ActiveSupport::Duration` làm đối số. Trong Ruby thuần túy, bạn bị giới hạn đối với `Time` . Hãy kiểm tra định nghĩa vì nó là một định nghĩa phức tạp và không rõ ràng khi bạn nhìn vào nó lần đầu tiên:

```
def plus_with_duration(other) #:nodoc:
  if ActiveSupport::Duration === other
    other.since(self)
  else
    plus_without_duration(other)
  end
end

alias_method :plus_without_duration, :+
alias_method :+, :plus_with_duration
```
Khi bạn gọi `+`, method  `plus_with_duration`  được gọi. Khi đối số là trường hợp của `ActiveSupport::Duration`, thì sincephương thức được gọi, mà chúng ta đã thảo luận trước đó. Nếu không, method `plus_without_duration` được gọi, là bí danh cho `+`, vì vậy phương thức chuẩn cho `Time` được thực thi.

Nhờ thủ thuật này, chúng ta có thể hỗ trợ cả `Duration` instance và `Time` instance làm đối số.

`Delegation`
Delegation là một quá trình đơn giản để thực thi các phương thức trên một lớp nhất định được thực thi với một đối tượng khác nằm bên trong thể hiện của đối tượng mà phương thức được thực thi trên đó. Mô tả này có vẻ hơi phức tạp, vì vậy chúng ta hãy xem xét ví dụ sau:

```
class Profile
  def image_url
    'image_url'
  end

  def nickname
    'nick'
  end
end

class User
  def initialize
    @profile = Profile.new
  end

  def image_url
    @profile.image_url
  end

  def nickname
    @profile.nickname
  end
end

user = User.new
user.nickname # => 'nick'
user.image_url # => 'image_url'
```
Đây là ủy quyền rõ ràng khi chúng tôi sử dụng đối tượng khác một cách rõ ràng và gọi phương thức mong muốn trên đó. Nếu chúng ta muốn ủy thác nhiều phương thức hơn, chúng ta có thể dễ dàng tự lặp lại và làm cho định nghĩa lớp ngày càng dài hơn.

## 6. Ruby standard delegation
Core Ruby cũng cung cấp một cách để ủy quyền các phương thức:
```
require 'forwardable'

class User
  extend Forwardable

  def initialize
    @profile = Profile.new
  end

  def_delegators :@profile, :nickname, :image_url
end
```
Bạn phải nhớ extend class của mình với mô-đun `Forwardable`; nếu không, bạn sẽ không thể sử dụng `def_delegators` . Chúng ta hãy xem xét sự ủy quyền thay thế được cung cấp bởi Rails.

### Rails delegation
Nếu bạn đang sử dụng Rails, bạn có thể ủy quyền các phương thức bằng cách sau:

```
class User
  delegate :nickname, :image_url, to: :@profile

  def initialize
    @profile = Profile.new
  end
end
```
Nó được triển khai như thế nào trong Rails? Trước tiên, chúng ta hãy tìm nguồn gốc của phương thức:
```
User.method(:delegate).source_location
```
Một lần nữa, đó là module `ActiveSuppor`  và phần mở rộng cốt lõi của nó cho module:

```
def delegate(*methods, to: nil, prefix: nil, allow_nil: nil, private: nil)
  # definition
end
```
Như bạn có thể thấy sự ủy quyền của Rails linh hoạt hơn vì bạn có thể đạt được những điều sau đây.

### Thêm prefix
Chúng tôi chỉ có thể sử dụng một tiền tố để làm cho ủy quyền rõ ràng hơn:

```
class User
  delegate :nickname, to: :@profile, prefix: :profile
end

User.new.profile_nickname # => 'nick'
```
### Allow for nil values
```
class User
  delegate :nickname, to: :@profile, allow_nil: true

  def initialize
    @profile = nil
  end
end

User.new.nickname # => nil
```
### Delegation private
Nếu bạn muốn ủy quyền các phương thức nhưng đặt chúng ở chế độ riêng tư, bạn có thể thêm tùy chọn riêng tư:

```
class User
  delegate :nickname, to: :@profile, private: true
end
```
Nếu bạn gọi ngay bây giờ `User.new.nickname`, bạn sẽ nhận được `NoMethodError` vì lỗi chỉ có bên trong lớp và để gọi nó bên trong, bạn phải sử dụng `send`-` User.new.send(:nickname)`.

### Giải thích ma thuật đằng sau delegate từ Rails
Thời gian điều tra. Cách ủy quyền đang làm việc trong Rails rất đơn giản và có thể hơi ngạc nhiên đối với bạn. Nếu bạn đang gọi cho delegate sau:
```
delegate :nickname, to: :@profile, allow_nil: true, prefix: :profile
```
thì Rails đang xây dựng định nghĩa sau dưới dạng văn bản (và lặp lại nó cho mọi phương thức được ủy quyền):

```
def profile_nickname
  _ = @profile
  if !_.nil? || nil.respond_to?(:nickname)
    _.nickname
  end
end
```
sau đó Rails tìm thấy nơi mà phương thức nên được định nghĩa bằng cách gọi một phương thức từ module `Thread::Backtrace::Location` được cung cấp bởi Ruby thuần túy:

```
location = caller_locations(1, 1).first
path = location.path
line = location.lineno
```
và sau đó sử dụng method `module_eval`  để thực thi chuỗi trong ngữ cảnh của module:
```
module_eval(method_def.join(";"), file, line)
```
Các biến  `method_def`  là một mảng với các phương pháp định nghĩa. Đối số tệp và dòng được truyền, nhưng chúng chỉ được sử dụng cho các thông báo lỗi.

Trên đây là 1 số method khá hay dùng trong Ruby code và thể hiện tính ưu việt của nó.

Tài liệu: https://guides.rubyonrails.org/index.html