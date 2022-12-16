Chào các bạn.
Hà Nội sao đợt này nóng thế không biết :(. Sắp không thở được nữa rồi.

Như thế là một tuần làm việc nữa lại sắp sửa trôi qua. Cố lên nào các anh em của tôi.

Ở phần trước chúng ta đã hoàn thành việc tạo giao diện cho ứng dụng luộc trứng. Chúng ta đã có output như thế này

![](https://images.viblo.asia/cdb55f4b-25ef-4848-9be8-ade303a630e6.png)

Trong phần này chúng ta sẽ đưa các chức năng kết hợp với giao diện trong phần trước để hoàn thành ứng dụng.

# Sandboxing

Ứng dụng dùng cơ chế sandbox sẽ có vùng nhớ độc lập hoàn toàn với hệ thống, không thể can thiệp vào các file của ứng dụng của chúng ta từ những ứng dụng khác, bị hạn chế quyền truy cập và quyền ghi. Đối với ứng dụng iOS, đây là cơ chế bắt buộc. Còn đối với macOS, nó là tuỳ chọn, tuy nhiên, nếu bạn muốn phân phối ứng dụng của bạn qua App Store của Mac,nó phải dùng sandbox. Thông thường, bạn nên dùng sandbox cho ứng dụng của bạn, bởi vì nó sẽ làm cho ứng dụng của bạn ít khả năng bị lỗi hơn. Đây là một khái niệm khá quen thuộc với lập trình viên iOS.


Để bật Sandboxing ứng dụng của chúng ta, chọn phần project trong "Project Navigator". Chọn EggTimer trong danh sách "Targets", sau đó chọn "Capabilities" trong tab ở trên cùng. Bấn vào switch để bật "App Sandbox". Màn hình sẽ hiện ra cho chúng ta rất nhiều tuỳ chọn và quyền truy cập cho ứng dụng. Ứng dụng của chúng ta không cần phải thay đổi những tuỳ chọn ở bên dưới nên sẽ bỏ qua phần này.

![](https://images.viblo.asia/9193fdd7-6859-4673-a3b1-cade0c7067d2.png)

# Sắp xếp file

Nhìn vào phần "*Project Navigator*". Tất cả các file được liệt kê không có thứ tự nào. Tuy ứng dụng của chúng ta không có nhiều file nhưng vẫn phải sắp xếp chúng lại vào các folder để việc làm quen, từ đó khi đối mặt với các project lớn hơn sẽ rất hữu dụng cho việc tìm kiếm sau này.

![](https://images.viblo.asia/0cd37fdb-671c-4124-be02-c4b84475b3e9.png)

Chọn 2 file view controller bằng cách click vào một file sau đó Shift-Click vào file còn lại. Chuột phải và chọn "*New Group from Selection*" từ popup menu. Đặt tên group là "*View Controllers*". Chúng ta sẽ cần một vài file model cho project, vì vậy ấn vào group EggTimer. Chuột phải và chọn "*New Group*", đặt tên nó là "*Model*".

Cuối cùng, chọn "*Info.plist*" và "*EggTimer.entitlements*" và đặt chúng vào group "*Suppporting Files*".

Kéo thả các group vào trong "*Project Navigator*" cho giống như ảnh.

![](https://images.viblo.asia/84671fa3-2c81-4b48-8f04-5ab05603c03e.png)

# Model trong MVC

Chọn group "*Model*" trong "*Project Navigator*" và chọn File/New/File... Chọn macOS/Swift File và chọn Next. Đặt tên cho file là "*EggTimer.swift*" và chọn "*Create*" để tạo.

Thêm đoạn code dưới sau:

```
class EggTimer {

  var timer: Timer? = nil
  var startTime: Date?
  var duration: TimeInterval = 360      // default = 6 minutes
  var elapsedTime: TimeInterval = 0

}
```

Ảnh trên là những properties của EggTimer. "*TimerInterval*" sẽ biểu hiện số giây.

Điều tiếp theo cần thêm vào là hai properties để kiểm tra điều kiện.


```
 var isStopped: Bool {
    return timer == nil && elapsedTime == 0
  }
  var isPaused: Bool {
    return timer == nil && elapsedTime > 0
  }
```

Có một vài shortcut có thể dùng để quản lý trạng thái của EggTimer.

Tạo một protocol trong EggTimer.swift nhưng bên ngoài class EggTimer.


```
protocol EggTimerProtocol {
  func timeRemainingOnTimer(_ timer: EggTimer, timeRemaining: TimeInterval)
  func timerHasFinished(_ timer: EggTimer)
}
```

Bắt đầu timer của EggTimer sẽ kích hoạt chức năng mỗi giây, thêm đoạn code sau để kích hoạt chức năng được gọi từ timer. Từ khoá "dynamic" cần có để Timer có thể tìm được function.


```
dynamic func timerAction() {
    // 1
    guard let startTime = startTime else {
      return
    }

    // 2
    elapsedTime = -startTime.timeIntervalSinceNow

    // 3
    let secondsRemaining = (duration - elapsedTime).rounded()

    // 4
    if secondsRemaining <= 0 {
      resetTimer()
      delegate?.timerHasFinished(self)
    } else {
      delegate?.timeRemainingOnTimer(self, timeRemaining: secondsRemaining)
    }
  }
```

Cần chú ý các điểm sau:

1. "startTime" là một "Optional Date". Nếu như nó nil, timer sẽ không được chạy và không có gì xảy ra.
2. Tính lại "elapsedTime". "startTime" sớm hơn thời gian hiện tại, vì vậy "timeIntervalSinceNow" sẽ tạo ra giá trị âm. Dấu âm sẽ đổi giá trị "elapsedTime" thành dương.
3. Tính thời gian còn lại của timer, làm tròn về giây.
4. Nếu timer đã hoàn thành, khởi động lại nó và gọi "delegate" nó đã hoàn thành. Nếu không phải, gọi "delegate" báo số giây còn lại.


```
// 1
  func startTimer() {
    startTime = Date()
    elapsedTime = 0

    timer = Timer.scheduledTimer(timeInterval: 1,
                                 target: self,
                                 selector: #selector(timerAction),
                                 userInfo: nil,
                                 repeats: true)
    timerAction()
  }

  // 2
  func resumeTimer() {
    startTime = Date(timeIntervalSinceNow: -elapsedTime)

    timer = Timer.scheduledTimer(timeInterval: 1,
                                 target: self,
                                 selector: #selector(timerAction),
                                 userInfo: nil,
                                 repeats: true)
    timerAction()
  }

  // 3
  func stopTimer() {
    // really just pauses the timer
    timer?.invalidate()
    timer = nil

    timerAction()
  }

  // 4
  func resetTimer() {
    // stop the timer & reset back to start
    timer?.invalidate()
    timer = nil

    startTime = nil
    duration = 360
    elapsedTime = 0

    timerAction()
```

1. "startTime" đặt thời gian từ thời điểm hiện tại dùng "Date()" và đặt liên tiếp "Timer".
2. "resumeTimer" là cái được gọi khi timer bị dừng và chạy lại. Thời gian bắt đầu sẽ được tính lại dựa trên elapsedTime.
3. "stopTimer" dừng việc chạy timer.
4. "resetTimer" dừng việc chạy timer và đặt properties về giá trị ban đầu.
Tất cả các function đều gọi "timerAction" để hiện việc cập nhật liên tục.

# ViewController


Bây giờ đối tượng "*EggTimer*" đã hoạt động, đến lúc trở về ViewController.swift để hiện giá trị của đối tượng này, ViewController đã có các thuộc tính "***@IBOutlet***", nhưng bây giờ phải có một thuộc tính cho đối tượng "*EggTimer*":

```
var eggTimer = EggTimer()
```

Và thêm vào *viewDidLoad*
```
eggTimer.delegate = self
```

Điều này sẽ gây ra lỗi vì ViewController chưa thêm "EggTimerProtocol". Cần phải thêm code sau vào *ViewController*


```
extension ViewController: EggTimerProtocol {

  func timeRemainingOnTimer(_ timer: EggTimer, timeRemaining: TimeInterval) {
    updateDisplay(for: timeRemaining)
  }

  func timerHasFinished(_ timer: EggTimer) {
    updateDisplay(for: 0)
  }
}
```

Thêm hàm *updateDisplay* vào *ViewController*


```
extension ViewController {

  // MARK: - Display

  func updateDisplay(for timeRemaining: TimeInterval) {
    timeLeftField.stringValue = textToDisplay(for: timeRemaining)
    eggImageView.image = imageToDisplay(for: timeRemaining)
  }

  private func textToDisplay(for timeRemaining: TimeInterval) -> String {
    if timeRemaining == 0 {
      return "Done!"
    }

    let minutesRemaining = floor(timeRemaining / 60)
    let secondsRemaining = timeRemaining - (minutesRemaining * 60)

    let secondsDisplay = String(format: "%02d", Int(secondsRemaining))
    let timeRemainingDisplay = "\(Int(minutesRemaining)):\(secondsDisplay)"

    return timeRemainingDisplay
  }

  private func imageToDisplay(for timeRemaining: TimeInterval) -> NSImage? {
    let percentageComplete = 100 - (timeRemaining / 360 * 100)

    if eggTimer.isStopped {
      let stoppedImageName = (timeRemaining == 0) ? "100" : "stopped"
      return NSImage(named: stoppedImageName)
    }

    let imageName: String
    switch percentageComplete {
    case 0 ..< 25:
      imageName = "0"
    case 25 ..< 50:
      imageName = "25"
    case 50 ..< 75:
      imageName = "50"
    case 75 ..< 100:
      imageName = "75"
    default:
      imageName = "100"
    }

    return NSImage(named: imageName)
  }

}
```

"*updateDisplay*" dùng function private để lấy text và ảnh cho thời gian còn lại, và hiện nó trong text field và image view.

"*textToDisplay*" chuyển hoá số giây còn lại sang "MM:SS". Còn "*imageToDisplay*" tính xem trứng đã hoàn thành được bao nhiêu tương đương với số phần trăm và chọn ảnh hiển thị cho phù hợp.

Vậy "*ViewController*" đã có đối tượng "*EggTimer*" và nó có chức năng lấy dữ liệu từ "*EggTimer*" và hiện thị kết quả, nhưng các button vẫn chưa hoạt động. Trong phần 2 chúng ta đã có các "*@IBActions*" cho các nút.


```
@IBAction func startButtonClicked(_ sender: Any) {
    if eggTimer.isPaused {
      eggTimer.resumeTimer()
    } else {
      eggTimer.duration = 360
      eggTimer.startTimer()
    }
  }

  @IBAction func stopButtonClicked(_ sender: Any) {
    eggTimer.stopTimer()
  }

  @IBAction func resetButtonClicked(_ sender: Any) {
    eggTimer.resetTimer()
    updateDisplay(for: 360)
  }
```

Như vậy có 3 actions gọi đến chức năng của EggTime mà mình vừa thêm vào.

Chạy thử kết quả:

![](https://images.viblo.asia/c3bdf3e0-de58-4988-be10-49385bfb0a66.png)

Như vậy chúng ta đã khá hoàn thiện chức năng cho ứng dụng nhỏ này.

Để sinh động hơn thì ở phần sau chúng ta sẽ làm thêm chức năng cho các button trên menu và thêm vào âm thanh cho ứng dụng. 

Cảm ơn các bạn đã theo dõi.

Link ref: https://www.raywenderlich.com/151748/macos-development-beginners-part-3