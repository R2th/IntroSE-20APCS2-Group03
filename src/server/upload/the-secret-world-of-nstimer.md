`Timer` cho phép chúng ta thực hiện một công việc sau 1 khoảng thời gian chờ (một lần hoặc lặp lại nhiều lần). Có nhiều loại đồng hồ - `clocks` - được sử dụng để tạo ra `Timers`, ngay cả khi chúng chạy ở cùng tốc độ - `rate` - chúng vẫn có những hành vi khác nhau. Chúng ta có thể list ra những loại Timer như sau:
*  Real-time clock (RTC): Nó là `computer clock` (thường ở dạng mạch tích hợp) theo thời gian hiện tại; người dùng có thể thay đổi đồng hồ này tuỳ ý và sử dụng NTP (Network Time Protocol) là tốt nhất để giữ nó đồng bộ với các tham chiếu từ bên ngoài. Giá trị của nó tăng 1 giây với mỗi giây ngoài đời thực nhưng đôi khi nó có thể nhanh/chậm hơn hoặc nhảy vọt lên (theo kiểu tăng từ 1 đến 4 chẳng hạn, nhưng nó ko bao giờ lùi lại. Nếu NTP đồng bộ và thấy rằng clock đang chạy nhanh, nó sẽ giảm tốc độ xuống cho đến khi thời gian thực)
*  Monotonic Timer: Nó là 1 bộ đếm được tăng lên bằng tín hiệu vật lý gửi tới CPU sử dụng `Timer Interrupt`. Trong nền tảng của Apple, giá trị này được trả về bằng `Mach kernel` thông qua `mach_absolute_time()`. Giá trị trở về phụ thuộc vào CPU nên bạn không thể chỉ nhân nó với 1 hằng số để có giá trị thời gian thực, thay vào đó, bạn nên gọi một hàm chuyển đổi do hệ thống cung cấp để convert nó về giá trị thực (`CoreAnimation` có 1 method thuận tiện cho việc đó: `CACurrentMediaTime()). Thực tế nó được thiết lập lại khi khởi động, vì vậy ko nên dùng nó để xem giờ =)) mà cách dùng tốt nhất cho nó đó là đo sự khác biệt giữa 2 khoảng thời gian.
*  Boot Timer: Nó là một `Monotonic Timer` đặc biệt mà không hề tạm dừng khi hệ thống `sleep`; cách phổ biến nhất để lấy giá trị của nó là gọi function `uptime` từ terminal.
Trong nền tảng của Apple, cách phổ biến nhất để khởi tạo 1 `Timer` là sử dụng class `NSTimer`, trong thực tế class đó chỉ là 1 `wrapper` của một `Monotonic Timer`. Vì vậy, sử dụng `NSTimer` có thể dẫn đến một `hành vi không thể đoán trước được`, đặc biệt là ở iOS.

### How NSTimer works
Để hiểu rõ và đầy đủ về NSTimer, chúng ta cần nói 1 chút về NSRunLoop: Mỗi khi khởi chạy, một application sẽ tạo ra `NSThread` đầu tiên được gọi là `Main Thread`. Mỗi Thread có một `Run loop` liên kết với nó để quản lý `input sources` như chuột, phím, touches, connections,... và rõ ràng cả `Timers` nữa.

Bạn có thể hiểu `RunLoop` như một `postbox` đợi các tin nhắn mới và đưa chún đến với những người nhận thích hợp: Về cơ bản nó cũng như cơ chế nhắn tin, sử dụng cho giao tiếp đồng bộ hoặc liên thông -`inter-thread`. Một số platforms như Windows, gọi nó là `Message Pump` nhưng khái niệm bên trong vẫn như vậy. 

Thực tế, `Run Loop` thể hiện sự khác biệt cơ bản giữa `command-line` và `interactive (UI-based) application`: Khi mà `command-line` khởi động với params, thực thi công việc và exit thì interactive app chờ input từ user, thực hiện và lại tiếp tục chờ đợi.

Có chính xác một `Runloop` mỗi thread. Một `Run  Loop` được tạo thành bở một bộ sưu tập các `input sources` (phím, touches,..) để được theo dõi và một `collection` các `observers` để được thông báo. Rõ ràng, một `RunLoop` được khởi tạo với một `mode` cụ thể: Trong vòng đời của nó, chỉ những `sources` liên kết đến `mode` đó được theo dõi và cho phép gửi các events, chỉ các `observer` liên kết với mode đó mới được thông báo về dữ liệu mới.
Cocoa/UIKit định nghĩa 1 số mode: trong iOS có 1 mode đặc biệt được gọi là: UITrackingRunLoopMode: Nó được thiêt lập trong lúc theo dõi các controls diễn ra. Đó là một phần cơ bản bởi vì nó cho phép các `UI events` được trình bày một cách mượt mà. Ví dụ như việc `drap loop` hoặc các `user interface tracking loops`, việc xử lý trong mode này sẽ giới hạn các input event. Ví dụ khi khi bạn drag ở UITableView trong mode này, trong lúc run loop của main thread ở trong `UITrackingRunLoopMode` hầu hết các event background như callback của network sẽ không deliver và không có việc xử lý thêm nào cả (tức là sẽ không có lag trong lúc scrolling).
Trong `continous loop` để check các events, `NSRunLoop` cũng check các event thuộc kiểu timer interval, mỗi khi tìm thấy nó sẽ gọi method mà đã được register bởi NSTImer. Điều này thì có ý nghĩa gì cho NSTimers? Nó rất đơn giản: thông thường chúng không được kích hoạt khi user đang scroll 1 table/scrollView hoặc làm bất cứ điều gì khác mà đặt runloop trong mode theo dõi các event.

### The no-no of NSTimer
Ngay cả khi việc sử dụng `NSTImer` là chấp nhận được thì tác giả của bài viết vẫn có một giải pháp thay thế tốt hơn để tránh ít nhất một số hạn chế của class này.

### No pure Swift Classes
Trong khi điều này không phải vấn đề lớn, chúng ta muốn có một Timer không phụ thuộc từ `NSObject` và ObjectiveC - nới mà chúng ta có thể thiết lập một event callbak mà không cần lo lắng về retain cycles

### No support for real-time
Có nghĩa là `NSTimer` không thể hoạt động như một bộ đếm thời gian thực: Vấn đề của vòng lặp khi mà các event kích hoạt được quản lý là nó có thể bị delay và bạn có thể mất đi ựu chính xác
Trên thực tế cả `NSTimer` và `GCD timer` đều không phù hợp với nhu cầu thời gian thực (bạn không thể sử dụng chúng cho việc xử lý độ trễ - `latency-sensitive` - như đồng bộ video buffer hoặc xử lý âm thanh) độ phân giải hiệu quả cho timer được giới hạn trong khoảng 50-100 mili giây.

### Requires a valid Run Loop
Như bạn đã thấy, NSTimer yêu cầu một runloop đang active, khi khởi tạo trong Main Thread nó tự động sử dụng runloop main. Nếu bạn cần phải tạo ra 1 background timer bạn sẽ phải gắn nó với runloop của thread và gọi `run()` để nó có thể hoạt động.

### Retain Cycles & Threads issues
Bạn cũng phải chú ý đến `invalidate()`; Bạn phải nhớ để gọi nó nếu không runloop sẽ giữu một `strong reference` tới target object của timer và có thể dẫn đến memory leak. Hơn nữa `invalidate()` phải được gọi trong cùng thread mà bạn tạo ra timer

### Cannot be reused
Một điều nữa là bạn không thể reuse lại một instance của timer khi nó đã `invalidated`, bạn buộc phải cấp phát cho một instance mới, `no pause no resume`

### A new Timer with Grand Central Dispatch
GCD cung cấp 1 giải pháp thay thế dễ dàng để tạo timer : DispatchSourceTimer
Phạm vi của chúng ta đó là sử dụng nó để tạo ra 1 Timer class mới: Chúng ta gọi nó là `Repeat`. Mục tiêu chính là:
* Làm đơn giản các `APIs methods` để tạo và quản lý timer
* Tránh các `strong reference` tới target đích và tránh việc kế thừa `NSObject`
* Sử dụng callbak để thông báo về việc các sự kiện được kích hoạt, cho phép nhiều observer cùng subscribe tới 1 timer
* Có khả năng pause, start, resume và reset timer
* Có khả năng thiết lập các `repeat modes` khác nhau 
Trước hết, chúng ta muốn xác định một cách dễ dàng để chỉ ra interval của timer, chúng ta có thể dùng `DispatchTimeInteval` nhưng chúng ta cũng muốn có thể thiết lập 1 float value cho second trong khi class original chỉ cho phép dùng int value. 
Repeat.Interval chỉ là 1 enum với một thuộc tính value mà trả về một `DispatchInterval` đúng và cho phép chúng ta xác định 1 giá trị của đơn vị thời gian:
``` swift
public enum Interval {
  case nanoseconds(_: Int)
  case microseconds(_: Int)
  case milliseconds(_: Int)
  case seconds(_: Double)
  case hours(_: Int)
  case days(_: Int)
 
  internal var value: DispatchTimeInterval {
	switch self {
	case .nanoseconds(let v):		return .nanoseconds(v)
	case .microseconds(let v):		return .microseconds(v)
	case .milliseconds(let v):		return .milliseconds(v)
	case .seconds(let v):			return .milliseconds(Int( Double(v) * Double(1000)))
	case .hours(let v):			return .seconds(v * 3600)
	case .days(let v):			return .seconds(v * 86400)
   	}
   }
}
```

Function chính của class chúng ta đó là `configureTimer()` nơi mà chúng ta tạo ra `DispatchSourceTimer` của mình:
``` swift
private func configureTimer() -> DispatchSourceTimer {
  let timer = DispatchSource.makeTimerSource(queue: (queue ?? DispatchQueue(label: "com.repeat.queue")))
  let repatInterval = interval.value
  let deadline: DispatchTime = (DispatchTime.now() + repatInterval)
  if self.mode.isRepeating {
    timer.schedule(deadline: deadline, repeating: repatInterval, leeway: torelance)
  } else {
    timer.schedule(deadline: deadline, leeway: torelance)
  }
		
  timer.setEventHandler { [weak self] in
    if let unwrapped = self {
       unwrapped.timeFired()
    }
  }
  return timer
}
```

Đoạn code trên chỉ tạo ra một `DispatchSourceTimer` được gắn với một `DispatchQueue` cho trước (hoặc tạo mới), thiết lập hành vi lặp và setup một callback để nhận các events trả về (bạn hãy chú ý tới [weak self])

Để có thể chấp nhận việc multiple observer chúng ta định nghĩa một `Dictionary` nới chúng ta lưu mỗi một observer function cùng với một identifier. Mỗi khi được kích hoạt, dictionary đó sẽ được liệt kê và gửi tới mỗi observer đã đăng ký. Identifier cũng được dùng để xóa đi một observer hiện có

``` swift
public typealias ObserverToken = UInt64 
public typealias Observer = ((Repeat) -> (Void))
private var observers = [ObserverToken : Observer]()
```

Việc register và unregister observer:
``` swift
@discardableResult
public func observe(_ observer: @escaping Observer) -> ObserverToken {
  var (new,overflow) = self.nextObserverID.addingReportingOverflow(1)
  if overflow { // you need to add an incredible number of offset...sure you can't
    self.nextObserverID = 0
    new = 0
  }
  self.observers[new] = observer
  return new
 }
	
public func remove(observer id: ObserverToken) {
  self.observers.removeValue(forKey: id)
}
	
public func removeAllObservers() {
  self.observers.removeAll()
}
```

Chúng ta cũng thêm các chức năng pause, start/resume và reset. Như đã nói, GCD timers có thể hơi "nhạy cảm": nếu bạn resume/suspend một timer đã resume/suspend, app sẽ bị crash với 1 lỗi kiểu như `"Over-resume of an object"`. Để giải quyết nó, chún ta chỉ cần cân bằng việc gọi suspend và resume. Mối methode có một `safe wrapper` để tránh việc `multiple calls` tới cùng 1 trạng thái.
``` swift
public func reset(_ interval: Interval?) {
  guard self.isRunning else { return }
  self.pause()
  self.timer = configureTimer()
  self.start()
}
	
public func start() -> Bool {
  guard self.isRunning == false else { return false }
  self.timer.resume()
  self.isRunning = true
  return true
}
	
public func pause() -> Bool {
  guard self.isRunning else { return false }
  self.timer.suspend()
  self.isRunning = false
  return true
}

deinit {
  self.observers.removeAll()
  self.timer.cancel()
  // If the timer is suspended, calling cancel without resuming
  // triggers a crash. This is documented here
  // https://forums.developer.apple.com/thread/15902
  self.start()
}
```

Như bạn thấy,  `deinit()` hơi đặc biệt 1 chút: Chúng ta cần đảm bảo rằng timer được `deallocated` bằng việc cancel instance của timer nếu không nó sẽ gọi đến một object đã bị deallocated. Ngoài ra chúng ta cũng tránh việc cancel 1 timer mà đã bị suspended bởi vì nó sẽ gây ra crash.
Cuối cùng chúng ta muốn hiển thị một số shortcuts như:

`* every(_ interval: Interval, count: Int? = nil, handler: @escaping Observer)
 * once(after interval: Interval, _ observer: @escaping Observer)`

Ví dụ tạo timer:
```swift
let timer = Repeat.every(.seconds(0.5), count: 10) { _ in
 // callback
}

let timer = Repeat.once(after: .seconds(5) { _ in
  // callback
}
```

thêm một observer nữa:
```swift
let observer = timer.observe { _ in
 // callback		
}
// anytime in the future...
timer.remove(observer)
```

Link github của tác giả: [Repeat](https://github.com/malcommac/Repeat)

### Reference
https://medium.com/@danielemargutti/the-secret-world-of-nstimer-708f508c9eb