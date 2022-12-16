Simple Calendar là thư viện được thiết kế lên để giúp các developer xây dựng calendar một cách nhanh chống và dễ dàng. Thư viện này có thể render calendar rất linh hoạt như render calendar với day view, week view, month view, .... Hơn nữa nó cũng có thể dùng để render các events vào trên calendar đó. 

# Cài đặt
Add vào Gemfile:

```ruby
gem "simple_calendar", "~> 2.0"
```

=> `bundle install`

Add vào file `app/assets/stylesheets/application.css`

```js
*= require simple_calendar
```


# Cách sử dụng
### Month Calendar
Bạn có thể generate calendar hiển thị theo tháng sử dụng method sau:

```ruby
<%= month_calendar do |date| %>
  <%= date %>
<% end %>
```

params start_date default sẽ là current date.
![](https://images.viblo.asia/e28e143d-fb8a-4e43-ba79-62bbfeedbf69.png)

### Week Calendar
Bạn có thể generate calendar hiển thị theo tuần sử dụng method sau:
```ruby
<%= week_calendar number_of_weeks: 2 do |date| %>
  <%= date %>
<% end %>
```

Trong đó number_of_weeks là số lượng tuần để hiển thị, default sẽ là 1.

### Calendar với số lượng ngày bất kỳ

```ruby
<%= calendar number_of_days: 4 do |date| %>
  <%= date %>
<% end %>
```

Trong đó number_of_days là số lượng ngày để hiển thị, default là 4.

### Custom tên params
Default params start_date sẽ được dùng và hiển thị trên URL. Để customize params này thành tên khác, bạn có thể truyền `start_date_param` trong hàm calendar như sau:

```ruby
<%= calendar start_date_param: :my_date do |date| %>
  <%= date %>
<% end %>
```

### Rendering Events
Các method trên bạn có thể dùng nó để render thành các calendar theo tháng, tuần, ngày, ...
Ở đây chúng ta sẽ dùng nó để render các sự kiện trên nó. 

* Step 1: 

Create model với 2 attributes cần thiết là: `start_time` và `end_time`.
Nếu model đó chỉ có attribute start_time, có nghĩa là nó là sự kiện chỉ xảy ra trong ngày. Nếu có cả end_time có nghĩa là sự kiện đó xảy ra trong vòng nhiều ngày.

```ruby
# single day events
$ rails g model Meeting name start_time:datetime

# multi-day events
$ rails g model Meeting name start_time:datetime end_time:datetime
```

Mình sẽ create data cho event này như sau:

```ruby
Meeting.create start_time: Time.current, name: "Current" 

Meeting.create start_time: Time.current + 1.day, name: "Tomorrow" 

Meeting.create start_time: Time.current, end_time: Time.current + 1.days, name: "Multi 2 days"
```

* Step 2

Từ model trên, mình có thể query để lấy event đó để hiện thị trên calendar như sau:

```ruby
def index
  @meetings = Meeting.all
end
```

Tiếp theo trong view, bạn chỉ cần truyền option `events` vào. Nó sẽ tự động render ngày mà sự kiện đó xảy ra với từng ngày trên calendar.

```ruby
<%= month_calendar events: @meetings do |date, meetings| %>
  <%= date %>

  <% meetings.each do |meeting| %>
    <div>
      <%= meeting.name %>
    </div>
  <% end %>
<% end %
```

Kết quả sẽ như sau:
![](https://images.viblo.asia/7fe48595-036c-453a-8da7-4a519f04dfd8.png)

Đến đây mình đã xây dựng được calendar đơn giản theo yêu cầu mình muốn. Hơn nữa, mình cũng có thể customize View của calendar đó được, chị tiết hãy xem tài liệu của nó [Customizing The Calendar](https://github.com/excid3/simple_calendar#customizing-the-calendar)

# References
https://github.com/excid3/simple_calendar