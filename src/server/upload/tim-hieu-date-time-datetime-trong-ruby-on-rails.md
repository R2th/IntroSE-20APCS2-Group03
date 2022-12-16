`Date`, `Time` và `DateTime` là những class trong Ruby giúp chúng ta có thể tương tác với thời gian thực, xác định thời gian truy xuất các bản ghi, tạo các lịch sử thay đổi

Việc nắm bắt được chúng trong Ruby on Rails giúp bạn rất nhiều trong việc code:

- Làm việc với các múi giờ (time zones), code ở Việt Nam nhưng giờ giấc setting là bên Nhật
- Điều chỉnh các format cho phù hợp với output của từng dự án, ví trí cần truy xuất
- Hiểu và biết được scope của từng class `Date`, `Time`, `DateTime` trong Ruby hoặc Rails
- Biết thêm các phương thức của `ActiveSupport` trong Rails, cái này thật sự rất rất hữu dụng trong việc viết code, trông sẽ pro và sạch sẽ hơn

![](https://images.viblo.asia/20e6e491-ed23-48d7-bce3-0b34456874cc.jpg)

Thôi không dài dòng nữa, triển luôn nào !!!

### `Time` Class trong Ruby

`Time` Class trong Ruby dungf để đặc tả cho ngày và thời gian thực

Ngày (date) có 3 thành phần:

- Ngày (day)
- Tháng (month)
- Năm (year)

Và thời gian (time) có:

- Giờ (hours)
- Phút (minutes)
- Giây (seconds)

Tất cả các thông tin trên được lưu trữ trong class `Time`

Có 3 cách để khởi tạo một đối tượng `Time`:

- Sử dụng `Time.now`
- Sử dụng `Time.new`
- Sử dụng `at` với đầu vào là Unix timestamp

Ví dụ:

```
Time.now
# 2018-10-19 15:43:20 +0200

Time.new(2018, 1, 1)
# 2018-01-01 00:00:00 +0100

Time.at(15000000000)
# 2017-07-14 04:40:00 +0200
```

Bạn cũng có thể truy xuất ngày giờ bằng các thuộc tính được hỗ trợ sẵn:

```
t = Time.now

puts t.day
puts t.month
puts t.hour
```

Ngoài ra, bạn cũng có thể hỏi xem ngày đó có tương ứng với ngày trong tuần không

Ví dụ như, hôm nay có phải là chủ nhật ?

```
t = Time.now

puts t.monday?
puts t.sunday?
puts t.friday?
```

### Các múi giờ (Time Zones)

Đối tượng `Time` có liên kết với các Time zone trên thế giới, điều này giúp ta kiểm tra được thời gian (time) hiện tại trên từng khu vực (zone)

```
Time.zone.now
```

Nếu bạn muốn kiểm tra múi giờ xem thời gian chênh lệch bao nhiêu, ta có thể dùng `utc_offset`, output của nó sẽ là giây, muốn kiểm tra với đơn vị là giờ thì ta chia cho `3600`

```
t = Time.now

t.zone
# "CET"

t.utc_offset / 3600
# 1
```

Hoặc có thể lấy thời gian hiện tại `utc`

```
Time.now.utc
```


### Các chuẩn (Format) `Time` trong Ruby

Ruby có các phương thức để hiển thị thời gian theo các cách khác nhau tùy thuộc vào từng yêu cầu cụ thể

Phương thức được sử dụng nhiều nhất là `strftime` (string from time), chuyển từ định dạng `Time` sang `string`

```
time = Time.new

time.strftime("%d/%m/%Y")        # "05/12/2015"
time.strftime("%k:%M")           # "17:48"
time.strftime("%I:%M %p")        # "11:04 PM"
time.strftime("Today is %A")     # "Today is Sunday"
time.strftime("%d of %B, %Y")    # "21 of December, 2015"
time.strftime("Unix time is %s") # "Unix time is 1449336630"
```

Như các bạn thấy thì phương thức trên khá là linh hoạt, có thể chỉ hiển thị ngày, có lúc thì hiển thị giờ, ... việc đó tùy thuộc vào các format được viết sau các tiền tố `%`

```
%d	Day of the month (01..31)
%m	Month of the year (01..12) Use %-m for (1..12)
%k	Hour (0..23)
%M	Minutes
%S	Seconds (00..60)
%I	Hour (1..12)
%p	AM/PM
%Y	Year
%A	Day of the week (name)
%B	Month (name)
```

Với các format này thì chúng ta có thể lấy time zone đơn giản hơn:

```
Time.now.strftime("%Z")
# "+07"
```

Còn rất nhiều các format nữa, bạn có thể tham khảo ở [đây](https://apidock.com/ruby/DateTime/strftime)


### Dễ dàng tạo `Timestamp`

Bạn có thể tạo ra thời gian kiểu `timestamp` với phương thức `to_i` trong Ruby

```
Time.now.to_i
# 1571602633
```

### Time Difference

Đôi khi, bạn cần làm việc với thời gian của tương lai hoặc của quá khứ, chúng ta cần cộng hoặc trừ với thời gian hiện tại

Luôn nhớ rằng, đơn vị của đối tượng `Time` luôn là giây (seconds), nên ta có thể:

```
time = Time.new + 20
# Thêm 20s

// Check value
Time.new > time
# false
```

### `Date` Class

`Date` class lưu trữ tất cả các giá trị ngày, tháng, năm, với đơn vị nhỏ nhất là ngày.

Nếu bạn muốn sử dụng `Date` , bạn nên `require 'date'`

Bạn có thể sử dụng `Date.today` để lấy ngày tháng hiện tại

Không giống với `Time`, `Date.new` không phải là alias của `today` (`Time.new` là alias của `Time.now`)

```
Date.today # Current date
Date.new   # Returns a negative date
```

Đơn vị của `Date` class sẽ là ngày (của `Time` class là giây), vậy nên khi chúng ta thực hiện cộng hay trừ bớt gía trị chúng ta sẽ được 

```
Date.today + 1 #tomorrow
Date.today - 1 #yesterday
```

### Phân tích `Date`

Phuơng thức `Date.parse` sẽ cố gắng phân tích bất kì chuỗi string nào trở thành `Date`

Nó sử dụng thuật toán tìm kiếm và xác định format cho một `Date`

Vậy nên nếu không đặt trong những chuẩn nhất định, thì chúng ta có thể ra những kết quả không mong muốn: 

Ví dụ:

```
Date.parse("10/10/2010")  # -> 2010-10-10
Date.parse("September 3") # -> 2015-09-03
Date.parse("May I have a cup of coffee, please?") # -> 1 of May
```

Khi phân tích một `Date`, chúng ta nên sử dụng thêm một số chuẩn nhất định, ví dụ như `Date.iso8601`, đây cũng là chuẩn đơn giản nhất mà máy tính có thể hiểu được, [TÌm hiểu thêm](https://vi.wikipedia.org/wiki/ISO_8601) 

Format của `iso8601` là:

```
year-month-day
```

Và nếu một ngoại lệ `ArgumentError` sẽ được xuất ra nếu đầu vào không hợp lệ

```
Date.iso8601("2010-10-10") # 2010-10-10
Date.iso8601("10/10/2010")  # ArgumentError 
Date.iso8601("May I have a cup of coffee, please?") # ArgumentError
```

### Date Constants

`Date` class có một vài hàm hằng hữu dụng mà không phải ai cũng biết

`Date::MONTHNAMES`, tạo ra một mảng tên các tháng trong một năm, với `index = 0` thì sẽ có giá trị `nil` trong mảng, muốn bỏ giá trị `nil` đó, ta đơn giản sử dụng `compact` cho một mảng thôi

`Date::DAYNAMES` tạo ra một mảng tên các ngày trong một tuần, bắt đầu bằng chủ nhật (sunday), nếu muốn mảng đó bắt đầu bằng thứ 2 (monday), ta nên sử dụng thêm phương thức `rotate`

```
Date::MONTHNAMES
# [nil, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

Date::MONTHNAMES.compact
#["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

Date::DAYNAMES
# ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

Date::DAYNAMES.rotate
["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
```

### `DateTime` Class

`DateTime` class là một `subclass` của `Date`

```
require 'date'

DateTime.superclass
# Date

```

`DateTime` là kết hợp của `Date` và `Time` nên nó có các đặc tính của cả 2

```
require 'date'

DateTime.now
# DateTime: 2019-10-20T09:37:16+07:00

DateTime.new(2001,2,3,4,5,6)
# 2001-02-03T04:05:06+00:00 

DateTime.new(2001,2,3,4,5,6,'+03:00')
# 2001-02-03T04:05:06+03:00

d = DateTime.parse('3rd Feb 2001 04:05:06+03:30')
# 2001-02-03T04:05:06+03:30

d.hour              #=> 4
d.min               #=> 5
d.sec               #=> 6
d.offset            #=> (7/48)
d.zone              #=> "+03:30"

d = d.new_offset('+09:00')
# 2001-02-04%21:35:06+09:00
d.strftime('%I:%M:%S %p')
# "09:35:06 PM"
```

[Xem thêm](https://ruby-doc.org/stdlib-2.6.1/libdoc/date/rdoc/DateTime.html)

### ActiveSupport – Time & Date

Nếu như bạn đang sử dụng Rails thì bạn chắc rằng đã quen với cú pháp `3.days.ago`

Những phuơng thức này không có trong Ruby thuần, mà nó đựoc thêm bởi `ActiveSupport` của Rails

```
1.hour.to_i  # 3600
1.day        # ActiveSupport::Duration
3.days.ago   # ActiveSupport::TimeWithZone
```

Một số phương thức chỉ có trong rails

```
date = Time.current
date.change(hour: 20)
date.at_beginning_of_day
```

Đơn giản hơn nếu muốn format một `Date`

```
date = Date.today

date.to_formatted_s(:short) # "16 Jul"
date.to_formatted_s(:long)  # "July 16, 2018"
```

Với Rails, ta còn có thể sử dụng `I18n.localize` để xác định format cho từng kiểu với key word `format`:

```
# app/views/home/index.html.erb
<h1><%= t :hello_world %></h1>
<p><%= flash[:notice] %></p>
<p><%= l Time.now, format: :short %></p>
```

```
# config/locales/pirate.yml
pirate:
  time:
    formats:
      short: "arrrround %H'ish"
```

Rails cung cấp class `ActiveSupport::TimeWithZone` để lưu thời gian và múi giờ, giúp đồng bộ trong thời gian của từng khu vực.
Như là việc dev ở Việt Nam nhưng lại tính toán cho giờ Nhật vậy

Cài đặt đơn giản trong `config/application.rb`

```
# config/application.rb
config.time_zone = 'Asia/Tokyo'
```

Thì khi ta lấy thời gian hiện tại:

```
Time.current
# Mon, 21 Oct 2019 18:11:54 JST +09:00
```

Lưu ý ở đây là ở tầng DB thì giá trị vẫn lưu dưới time zone là `UTC +0`, chỉ khi ta select giá trị đó, thì giá trị sẽ đựoc tính toán chuyển sang timezone tương tứng trong setting `application.rb`

[Tham khảo thêm](https://api.rubyonrails.org/v5.1/classes/DateTime.html)

### Tổng kết

Bài viết trên là tổng hợp của mình về `Date`, `Time` và `Datetime` trong Ruby on Rails, hi vọng giúp ích được mọi người

Cảm ơn mọi người đã theo dõi.

Tài liêu tham khảo:

https://www.rubyguides.com/2015/12/ruby-time/

https://apidock.com/ruby/DateTime/strftime

https://api.rubyonrails.org/v5.1/classes/DateTime.html

https://guides.rubyonrails.org/i18n.html#adding-date-time-formats

https://ruby-doc.org/stdlib-2.6.1/libdoc/date/rdoc/DateTime.html