Các việc liên quan đến các thứ xoay quanh thời gian như kiểu ngày, tháng, năm, giờ, phút, giây ... chắc hẳn là 1 công việc không còn xa lạ với tất cả các lập trình viên chúng ta.
Ruby hỗ trợ các xử lý liên quan đến thời gian đến tận răng, bày sẵn rồi, anh em chỉ việc mang ra dùng, không cần suy nghĩ nhiều. Không tìn thì chúng ta thử tìm hỏi coi :D

Ok, giờ chúng ta giới thiệu 1 chút về các Class "ăn sẵn" về thời gian trong Ruby,
Trong Ruby có 3 class khác nhau về việc xử lý liên quan đến ngày giờ. Tiếng Anh như thế nào thì Ruby cũng tạo ra các lớp tương ứng như thế, quá ư là quen thuộc =))
Cả 2 class `Date` và `DateTime` đều gọi từ thư viện `date`, còn class `Time` thì từ thư viện `time` của Ruby mà ra

Cả 2 class `DateTime` và `Time` đều có thể được sử dụng để xử lý các thuộc tính ngày, tháng, năm, giờ, phút, giây. Nhưng bên dưới, class `Time` lưu trữ các số nguyên, hiển thị các khoảng giây từ Epoch. Chúng ta cũng gọ đó là **unix time**.
Tuy nhiên, class `Time` có 1 số giới hạn. Đầu tiên phải kể đến, nó chỉ có thể đại diện cho các ngày trong khoảng từ 1970 - 2038, (kể từ Ruby v1.9.2, nó có thể đại diện cho ngày từ 1823-11-12 đến 2116-02-20). Thứ hai, múi giờ được giới hạn ở UTC và múi giờ địa phương của hệ thống trong ENV ['TZ'].

Rails cung cấp class `Time` thực sự tốt được gọi là `ActiveSupport :: TimeWithZone`. Nó chứa tất cả các tính năng mà class `Time` có, cộng với nhiều cải tiến, chẳng hạn như hỗ trợ cho các múi giờ có thể cấu hình.
Một điều đáng lưu ý là Rails sẽ luôn chuyển đổi múi giờ thành UTC trước khi nó ghi hoặc đọc từ cơ sở dữ liệu, và không quan tâm bất kể múi giờ bạn đã đặt trong tệp cấu hình là gì. Bạn có thể sử dụng `<attribute_name> _before_type_cast ` để lấy thời gian ban đầu lưu trữ trong cơ sở dữ liệu. Ví dụ để có được múi giờ ban đầu của `created_at` trước khi typecasting, bạn có thể làm:

```Ruby
object.created_at_before_type_cast
```

Trong các phần sau, tôi sẽ cho bạn thấy một số ví dụ và các hàm "ăn sẵn" mà Ruby cung cấp cho chúng ta

### 1. Time
```Ruby
# Get current time using the time zone of current local system
Time.now

# Get current time using the time zone of UTC
Time.now.utc

# Get the unix timestamp of current time => 1364046539
Time.now.to_i

# Convert from unix timestamp back to time form
Time.at(1364046539)

# Format the string output with #strftime method => "March 23, 2013 at 09:48 AM"
Time.at(1364046539).strftime("%B %e, %Y at %I:%M %p")
```

Bạn có thể tìm hiểu thêm về cách định thời gian và các chi tiết về chỉ thị định dạng tại [Ruby’s Time document](http://ruby-doc.org/core-2.0.0/Time.html#method-i-strftime).
Khi sử dụng class `Time`,  tôi muốn luôn chuyển đổi nó thành dấu thời gian unix, vì biểu mẫu nguyên có thể được lưu trữ, lập chỉ mục hoặc sắp xếp một cách dễ dàng.
Ngoài ra nó có thể được sử dụng trong trường hợp khoảng cách giữa hai thời gian quan trọng hơn chính xác thời gian, trường hợp sử dụng này có thể được tìm thấy trong tweets, nơi nó hiển thị 1 phút trước thay vì thời gian thực sự.

### 2. Time with Zone (ActiveSupport::TimeWithZone)

**TimeWithZone** được tạo ra tương đồng như 1 API của Ruby ** Time** để cả 2 có thể dễ dàng hoán đổi giá trị cho nhau.
Dưới đây là một số ví dụ cho bạn thấy cách sử dụng TimeWithZone trong Rails:

```Ruby
# Set the time zone for the TimeWithZone instance
Time.zone = 'Central Time (US & Canada)'

# Get current time using the time zone you set
Time.zone.now

# Convert from unix timestamp integer to a time instance using the time zone you set
Time.zone.at(1364046539)

# - Convert from unix timestamp back to a time instance
# - Set the time zone to Eastern Time
# - Change the output string format => "03/23/13 09:48 AM"
Time.at(1364046539).in_time_zone("Eastern Time (US & Canada)").strftime("%m/%d/%y %I:%M %p")
```

Rails cung cấp rất nhiều hàm "ăn sẵn" hữu ích, sử dụng key-word bằng tiếng Anh hết sức đơn giản. Điểm này mình thích nhất, điều mà ở ngôn ngữ khác (như Javascript) không hỗ trợ tận răng các hàm chuyển đổi như thế.

```Ruby
# Get the time of n day, week, month, year ago
1.day.ago
2.days.ago
1.week.ago
3.months.ago
1.year.ago

# Get the beginning of or end of the day, week, month ...
Time.now.beginning_of_day
30.days.ago.end_of_day
1.week.ago.end_of_month

# Convert time to unix timestamp
1.week.ago.beginning_of_day.to_i

# Convert time instance to date instance
1.month.ago.to_date
```
Bạn có thể tìm thêm các method trong [Tài liệu](http://api.rubyonrails.org/classes/Time.html).

### 3. Time distance
Rails cũng cung cấp các phương thức khoảng cách thời gian trong [ActionView :: Helpers](http://api.rubyonrails.org/classes/ActionView/Helpers/DateHelper.html#method-i-distance_of_time_in_words) để bạn có được định dạng thời gian theo kiểu twitter.
```Ruby
# inside of your .erb view files or under your help class
diff = Time.now.to_i - 1.hour.ago.to_i
distance_of_time_in_words(diff)
distance_of_time_in_words_to_now(1.hour.ago)
```

### 4. Customized time zone by user
Đối với ứng dụng Rails, bạn có thể đặt múi giờ mặc định trong `/config/application.rb`
```Ruby
# /config/application.rb
config.time_zone = 'Central Time (US & Canada)'
```

Để có danh sách các tên múi giờ được Rails hỗ trợ, bạn có thể sử dụng
```Ruby
ActiveSupport::TimeZone.zones_map(&:name)
```

Thông thường, chúng tôi muốn cung cấp đầu vào được chọn trong biểu mẫu để người dùng chọn múi giờ mong muốn của họ. Bạn có thể cung cấp trường nhập (ví dụ: sử dụng tên: time_zone) trong một dạng như sau:
```Ruby
<%= f.time_zone_select :time_zone %>
```

Bạn cũng có thể thêm các tùy chọn khác, ví dụ: chỉ cho phép múi giờ của Hoa Kỳ và sử dụng múi giờ Thái Bình Dương làm mặc định, như được hiển thị bên dưới:
```Ruby
# use US time zone only, with default
<%= f.time_zone_select :time_zone, ActiveSupport::TimeZone.us_zones, :default => "Pacific Time (US & Canada)" %>
```

### 5. Date and DateTime
Đối với hầu hết các trường hợp, Thời gian với lớp múi giờ từ ActiveSupport của Rails là đủ. Nhưng đôi khi, khi bạn chỉ cần một định dạng chuỗi của năm, tháng và ngày, lớp Date vẫn đáng để thử.
Cả Date và DateTime đều đi kèm với phương thức #parse, cho phép bạn chuyển đổi một chuỗi ngày tháng thành một đối tượng Date. Ngoài ra còn có một phương thức khá được gọi là #strptime, cho phép bạn định nghĩa rõ ràng định dạng mẫu của ngày và giờ bạn sẽ phân tích cú pháp. Ví dụ được hiển thị bên dưới:

```Ruby
require 'date'

# use parse to create a date object
Date.parse("2014-1-1")
DateTime.parse("2014-1-1")

# explicitly define the date format using strptime
Date.strptime("12/13/2013", "%m/%d/%Y")
```

Bạn cũng có thể sử dụng phạm vi ngày để tạo danh sách chuỗi ngày tháng. Ví dụ: trong một trong các ứng dụng của tôi, chúng tôi sử dụng chuỗi ngày làm khóa để lưu trữ thông tin về số lượng trong Redis:
```Ruby
# Generate date string in 30 days range
days_str = (30.days.ago.to_date...Date.today).map{ |date| date.strftime("%Y:%m:%d") }
```

Ngày cũng đi kèm với một dãy tên ngày rất tiện dụng, có thể dễ dàng sử dụng với Drop-down
```Ruby
Date.today.wday # the day of week
Date::DAYNAMES[Date.today.wday] # => "Saturday"
Date::DAYNAMES.each_with_index.to_a #  => [["Sunday", 0], ["Monday", 1], ["Tuesday", 2], ["Wednesday", 3], ["Thursday", 4], ["Friday", 5], ["Saturday", 6]]

# Use day names in select field:
# <%= select(:report, :day, Date::DAYNAMES.each_with_index.to_a, {:selected => 1} %>
```

Thời gian, ngày tháng, DateTime đều có thể hoán đổi cho nhau bằng cách sử dụng các phương thức to_time, to_date và to_datetime.
```Ruby
# Convert DateTime to Time
DateTime.parse('March 3rd 2013 04:05:06 AM').to_time.class # => Time

# Convert Time to Date
1.day.ago.to_date.class # => Date

# Convert to DateTime
Time.now.to_datetime
```

Hơn nữa, bạn có thể sử dụng phương thức #to_i để thay đổi một đối tượng Date hoặc DateTime thành một Dấu thời gian Unix biểu diễn số nguyên giây kể từ Epoch:
```Ruby
# Parse date string and convert to timestamp in seconds
Date.parse("2014-1-1").to_time.to_i
DateTime.parse("2014-1-1").to_time.to_i
```

### Tài liệu tham khảo
Dịch từ nguồn: http://stevenyue.com/blogs/date-time-datetime-in-ruby-and-rails/