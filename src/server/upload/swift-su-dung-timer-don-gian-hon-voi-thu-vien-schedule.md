# Giới thiệu
Chào các bạn, với một iOS developer chắc hẳn các bạn đã từng làm với *Timer*, và việc quản lý Timer không phải là việc dễ dàng. Hôm nay, tôi sẽ giới thiệu đến các bạn một thư viện có thể giúp các bạn xử lý các case trong phát triển iOS khi cần sử dụng đến các tác vụ timer dễ dàng hơn, đó chính là [Schedule](https://github.com/jianstm/Schedule). Vậy Schedule có gì tốt chúng ta cùng nhau tìm hiểu nhé! 
# Thư viện Schedule
Schedule được định nghĩa là một công cụ thực hiện các tác vụ timer nhẹ (lightweight) và có các cú pháp cực kì thân thiện với người dùng. 
![](https://images.viblo.asia/ad4717e2-af49-4e1f-9689-ec36272c64f6.png)https://images.viblo.asia/ad4717e2-af49-4e1f-9689-ec36272c64f6.png
## Usage
### Khởi tạo một tác vụ hết sức dễ dàng
Ở đây, ta thực hiện một tác vụ sau khi thực hiện đoạn code 3 giây:
```
Schedule.after(3.seconds).do {
    print("3 seconds passed!")
}
```
### Khởi tạo các tác vụ dựa vào thời gian
Lặp lại tác vụ sau 3 giây:
```
Schedule.every(3.seconds).do { }`
```

Thực hiện tác vụ sau 1h và lặp lại sau 1 phút:
```
Schedule.after(1.hour, repeating: 1.minute).do { }
```

Thực hiện tác vụ vào các thời điểm 1, 5, 10 giây:
```
Schedule.of(1.second, 5.second, 10.second).do { }`
```

Thực hiện tác vụ vào lúc 5h
```
Schedule.at("5: 00").do { }`
```

Thực hiện tác vụ vào lúc 9h sáng thứ 2 và thứ 3 hàng tuần:
```
Schedule.every(.monday, .tuesday).at("9:00:00").do { }`
```

Thực hiện tác vụ vào lúc 1030 ngày 30 tháng 9:
```
Schedule.every(.september(30)).at(10, 30).do { }`
```

Thực hiện tác vụ vào một ngày cụ thể nào đó:
```
Schedule.of(date0, date1, date2).do { }
```

### Quy định quy tắc riêng
Schedule cũng  cung cấp một số toán tử, vì vậy chúng ta có thể sử dụng chúng để tùy chỉnh các quy tắc của riêng mình:
```
/// Concat
let s0 = Schedule.at(birthdate)
let s1 = Schedule.every(1.year)
let birthdaySchedule = s0.concat.s1
birthdaySchedule.do { 
    print("Happy birthday")
}

/// Merge
let s3 = Schedule.every(.january(1)).at("8:00")
let s4 = Schedule.every(.october(1)).at("9:00 AM")
let holiday = s3.merge(s4)
holidaySchedule.do {
    print("Happy holiday")
}

/// First
let s5 = Schedule.after(5.seconds).concat(Schedule.every(1.day))
let s6 = s5.first(10)

/// Until
let s7 = Schedule.every(.monday).at(11, 12)
let s8 = s7.until(date)
```
### Support ngôn ngữ tự nhiên: hiện tại chỉ có tiếng anh

Schedule.every("one hour and ten minutes").do { } // lặp lại sau 1h10 phút

Schedule.every("1 hour, 5 minutes and 10 seconds").do { } // lặp lại sau 1h5 phút10 giây
### Quản lý tác vụ
Với schedule, mỗi tác vụ mới được tạo sẽ được tự động giữ bởi một biến toàn cục và sẽ không được giải phóng cho đến khi bạn chủ động hủy nó. Vì vậy, bạn không cần phải thêm biến vào bộ điều khiển và viết vô nghĩa như bộ đếm thời gian weak var: Timer, self.timer = timer:
```
let task = Schedule.every(1.minute).do { }
task.suspend()		// will increase task's suspensions
task.resume() 		// will decrease task's suspensions, but no over resume at all, I will handle this for you~
task.cancel() 		// cancel a task will remove it from the internal holder, that is, will decrease task's reference count by one, if there are no other holders, task will be released.
```
### Thực hiện tác vụ trên các Class nhất định
Sử dụng câu lệnh như bên dưới, thì việc thực hiện tác vụ chỉ xảy ra trên `self` (1 class nào đó). Và khi class đó được giải phóng thì tác vụ cũng sẽ huỷ bỏ.
```
Schedule.every(1.second).do(host: self) {
    // do something, and cancel the task when `self` is deallocated, it's very useful when you want to bind a task's lifetime to a controller.
}
```

### Action
Chúng ta có thể thêm các tác vụ khác vào cùng một tác vụ và xóa chúng bất cứ lúc nào ta muốn:
```
let dailyTask = Schedule.every(1.day)
dailyTask.addAction {
    print("open eyes")
}
dailyTask.addAction {
    print("get up")
}
let key = dailyTask.addAction {
    print("take a shower")
}
dailyTask.removeAction(byKey: key)
```
### Tag
Chúng ta cũng có thể sắp xếp các tác vụ bằng **tag** và sử dụng hàng đợi để xác định vị trí nhiệm vụ sẽ được gửi đi:
```
let s = Schedule.every(1.day)
let task0 = s.do(queue: myTaskQueue, tag: "log") { }
let task1 = s.do(queue: myTaskQueue, tag: "log") { }

task0.addTag("database")
task1.removeTag("log")

Task.suspend(byTag: "log")
Task.resume(byTag: "log")
Task.cancel(byTag: "log")
```
### Lifecycle
Chúng ta cũng có thể setup vòng đời cho tác vụ:
```
task.setLifetime(10.hours) // will be cancelled after 10 hours.
task.addLifetime(1.hour)  // will add 1 hour to tasks lifetime
task.restOfLifetime == 11.hours
```
# Tổng kết
Trên đây tôi đã giới thiệu đến các bạn một thư viện giúp các bạn đơn giản hoá việc thực hiện các tác vụ quản lý Timer trước đây. Ngoài những function đã giới thiệu bên trên các bạn hãy thử cùng tôi tìm hiểu thêm các function thú vị khác nhé! Hãy cùng nhau fork về và phát triển thư viện tốt hơn nữa nhé! 
Cám ơn các bạn đã đọc bài viết và chúc các bạn một ngày tốt lành!
Library link: https://github.com/jianstm/Schedule