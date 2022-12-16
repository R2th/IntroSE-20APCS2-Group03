ice_cube là một thư viện của Ruby dùng để xử lý các event xảy ra định kỳ hoặc lặp đi lặp lại. Nó giúp chúng ta xử lý các events đó dễ dàng và rất nhanh. 
Ví dụ cơ bản nhất là dùng để tạo các event trên calendar chẳng hạn.

# Cài đặt

```
gem "ice_cube"

// hoặc

gem install ice_cube

```

# Cách sử dụng
Vi dụ bạn muốn hiển thị các event xảy ra :
> Every friday the 13th that falls in October

Vậy nếu mình tự viết thì nó sẽ phức tạp. Với ice_cube thì mình sẽ xử lý bài toán này rất đơn giản như sau.

```ruby
# khởi tạo object
schedule = IceCube::Schedule.new

# tạo rule cho schedule trên
schedule.add_recurrence_rule(
  IceCube::Rule.yearly.day_of_month(13).day(:friday).month_of_year(:october)
)
```

Từ object đó mính sẽ gọi được các method có sẵn của ice_cube như lấy tất cả các events, check schedule đó có xảy ra trên ngày nào đấy không, .... có rất nhiều method mình có thể dùng được. Dưới đây sẽ là một số method và cách sử dụng nó.

## Khởi tạo schedule object

```
schedule = IceCube::Schedule.new(start_time = Time.now,  end_time)
```
start_time và end_time là optional

## Tạo rules cho schedule

Có nhiều loại rules như sau:

### Daily

```ruby
# every day
schedule.add_recurrence_rule IceCube::Rule.daily

# every n day
schedule.add_recurrence_rule IceCube::Rule.daily(n)
```

### Weekly

```ruby
# every week
schedule.add_recurrence_rule IceCube::Rule.weekly

# every other week on monday and tuesday
schedule.add_recurrence_rule IceCube::Rule.weekly(2).day(:monday, :tuesday)

# for programmatic convenience (same as above)
schedule.add_recurrence_rule IceCube::Rule.weekly(2).day(1, 2)

# specifying a weekly interval with a different first weekday (defaults to Sunday)
schedule.add_recurrence_rule IceCube::Rule.weekly(1, :monday)
```

Tương tự với các rules trên:
* monthly
* yearly
* hourly
* minutely
* secondly

Chi tiết về các rules đó bạn vào xem tài liệu của nó.

### Gọi các method cần thiết

Sau khi bạn đã khởi tạo schedule, add rule cho schedule đó xong, tiếp theo mình có thể gọi các method mình cần.

```ruby
# lấy ra các events cho đến end_time
occurrences = schedule.occurrences(end_time)

#lấy ra tất cả các events 
occurrences = schedule.all_occurrences

# kiểm tra schedule đó có xảy ra ở trong thời gian nào đó không 
# for single time
schedule.occurs_at?(now + 1.day)

# for single day
schedule.occurs_on?(Date.today)

# lấy first(n) của events
schedule.first(2) 
schedule.first    

# lấy last(n) của events
schedule.last(2) 
schedule.last   

...
```

Như ví dụ trên bạn sẽ biết cách gọi method thế nào rồi, còn khá nhiều methods nữa, bạn có thể vào tài liệu của nó để xem chi tiết.


### Persistence
Trên thực tế người dùng sẽ tạo rules đó trên UI chứ không phải bằng code, vậy làm thế nào để lưu các rules đó vào db được?

**Mình sẽ implement theo cách dưới đây:**

* Tạo UI chọn events:

Ở đây, nếu bạn muốn tự code form cũng được. Mình sẽ nhận được params cần thiết từ form đó để dùng cho việc tạo rulé cho schedule.

Nhưng để hỗ trợ việc tạo form dễ dàng, ở đây cũng có gem https://github.com/GetJobber/recurring_select
Nó sẽ generate sẵn form để hỗ trợ trong việc chọn các rules cho bạn rồi.

*  Tạo rules:

Sau khi bạn đã có form rồi, tiếp theo bạn cần phải lấy params từ form đó và tạo rule cho event đấy.
Cuối cùng sẽ lưu rule đã tạo đó vào db.

Mình có thể lưu rules dưới dạng yaml, hash, ical. 

```ruby
yaml = schedule.to_yaml
IceCube::Schedule.from_yaml(yaml)

hash = schedule.to_hash
IceCube::Schedule.from_hash(hash)

ical = schedule.to_ical
IceCube::Schedule.from_ical(ical)
```

Từ data đó mình chỉ lưu nó và db là xong. 

# Conclusion

Đến đây bạn đã hiểu về cách cài đặt cũng như sử dụng gem này rồi. 

Chi tiết hãy xem các tài liệu sau:

https://github.com/seejohnrun/ice_cube

https://github.com/GetJobber/recurring_select