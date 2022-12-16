## Tổng quan
Người dùng tạo sự kiện chuyển động khi họ di chuyển, lắc hoặc nghiêng thiết bị. Những sự kiện chuyển động này được phát hiện bởi phần cứng thiết bị, cụ thể là gia tốc kế và con quay hồi chuyển. Core Motion Framework
cho phép ứng dụng của bạn nhận dữ liệu chuyển động từ phần cứng thiết bị và xử lý dữ liệu đó. Trong bài này tôi muốn tập trung vào các sự kiện pedometer và cách xử lý chúng.

![](https://images.viblo.asia/321daef5-bc75-49fa-88c8-edef20ad72c3.png)

### CMPedometer

Để sử dụng pedometer trong CoreMotion, chúng ta cần xem xét kỹ hơn lớp CMPedometer. Nó cho phép người dùng truy xuất một số thông tin về các bước được thực hiện trong quá khứ, ví dụ: Tôi đã thực hiện bao nhiêu bước trong 3 ngày qua? Một cách sử dụng khác của lớp CMPedometer là nhận các cập nhật trực tiếp về các bước đã thực hiện.

``` swift
open func queryPedometerData(from start: Date, to end: Date,
    withHandler handler: @escaping CoreMotion.CMPedometerHandler)

open func startUpdates(from start: Date,
    withHandler handler: @escaping CoreMotion.CMPedometerHandler)
```

### CMPedometerData

Đây là một lớp mà chúng ta nên chú ý đến nó. Lớp này đại diện cho dữ liệu sẽ được gửi với mọi cập nhật trong các hàm "*queryPedometerData*" và "*startUpdates*" phía trên. Nó chứa rất nhiều thông tin hữu ích như:
* numberOfSteps: NSNumber?
* distance: NSNumber?
* currentPace: NSNumber?
* floorsAscended: NSNumber?
* floorsDescended: NSNumber?

### CMMotionActivityManager

Nếu chúng tôi muốn bắt đầu đếm các bước, sẽ rất hữu ích khi biết loại hoạt động mà người dùng của chúng tôi đang thực hiện vào lúc này. Ở đây với một số trợ giúp đến lớp CMMotionActivityManager. Sử dụng ví dụ thứ hai của lớp này, chúng tôi có thể nhận thông tin cập nhật về loại hoạt động của người dùng. Để thực hiện điều này, chúng ta nên gọi:

``` swift
open func startActivityUpdates(to queue: OperationQueue,
    withHandler handler: @escaping CoreMotion.CMMotionActivityHandler)
```
và kết quả của việc đó là nhận các bản cập nhật với CMMotionActivity đại diện cho dữ liệu cho một bản cập nhật sự kiện chuyển động duy nhất. Dữ liệu này là một gói các giá trị bool:

* stationary: Bool
* walking: Bool
* running: Bool
* automotive: Bool
* cycling: Bool
* unknown: Bool

## Project Demo

### Tạo project và UI

![](https://images.viblo.asia/ec2cac8c-a247-414f-ad77-022ad8521481.png)

Trong tài liệu của [Apple docs](https://developer.apple.com/documentation/coremotion) có phần này:


> Important An iOS app linked on or after iOS 10.0 must include usage description keys in its Info.plist file for the types of data it needs. Failure to include these keys will cause the app to crash. To >access motion and fitness data specifically, it must include NSMotionUsageDescription.
> 

Vì vậy bạn cần sửa file info.plist của bạn thêm đoạn mã dưới đây:

```
<key>NSMotionUsageDescription</key>
<string>In order to count steps I need an access to your pedometer</string>
```

hoặc thêm mới một key vào nó:
![](https://images.viblo.asia/7ca62e5c-0445-4ff3-b807-11a063972706.png)

Bây giờ chúng ta hay tạo ra 1 giao diện đơn giản như này:

![](https://images.viblo.asia/db7c6777-9c6f-45f4-a889-aa35ad223808.png)

và kéo các outlet và action vào file ViewController.swift.

``` swift
@IBOutlet weak var startButton: UIButton!
@IBOutlet weak var stepsCountLabel: UILabel!
@IBOutlet weak var activityTypeLabel: UILabel!

@IBAction func startAndStopAction(_ sender: UIButton) {
    // Todos
}

```

### Implement

* Thêm import CoreMotion, khởi tạo CMMotionActivityManager và CMPedometer

``` swift
private let activityManager = CMMotionActivityManager()
private let pedometer = CMPedometer()
```

* Tạo phương thức theo dõi các sự kiện hoạt động

```swift
private func startTrackingActivityType() {
    activityManager.startActivityUpdates(to: OperationQueue.main) {
        [weak self] (activity: CMMotionActivity?) in
        guard let activity = activity else { return }
        DispatchQueue.main.async {
            if activity.walking {
                self?.activityTypeLabel.text = "Đi dạo"
            } else if activity.stationary {
                self?.activityTypeLabel.text = "Đứng yên"
            } else if activity.running {
                self?.activityTypeLabel.text = "Chạy"
            } else if activity.automotive {
                self?.activityTypeLabel.text = "Ô tô"
            }
        }
    }
}
```

* Tạo phương thức cho các bước đếm cập nhật

``` swift
private func startCountingSteps() {
  pedometer.startUpdates(from: Date()) { [weak self] pedometerData, error in
      guard let pedometerData = pedometerData, error == nil else { return }

      DispatchQueue.main.async {
          self?.stepsCountLabel.text = pedometerData.numberOfSteps.stringValue
      }
  }
}
```
* Thêm phương thức thực hiệc việc start, stop update hành động và số bước
``` swift
private func startUpdating() {
  if CMMotionActivityManager.isActivityAvailable() {
      startTrackingActivityType()
  }

  if CMPedometer.isStepCountingAvailable() {
      startCountingSteps()
  }
}

private func stopUpdating() {
    activityManager.stopActivityUpdates()
    pedometer.stopUpdates()
    pedometer.stopEventUpdates()
}
```

Thêm một vài biến và phương thức để thực hiên start và stop việc tracking action và hành động, số bước.

``` swift
private var shouldStartUpdating: Bool = false
private var startDate: Date? = nil

// Update steps when view will appear 
override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    guard let startDate = startDate else { return }
    updateStepsCountLabelUsing(startDate: startDate)
}

// Action button
@IBAction func startAndStopAction(_ sender: UIButton) {
    shouldStartUpdating = !shouldStartUpdating
    shouldStartUpdating ? (onStart()) : (onStop())
}

private func onStart() {
    startButton.setTitle("Stop", for: .normal)
    startDate = Date()
    startUpdating()
}

private func onStop() {
    startButton.setTitle("Start", for: .normal)
    startDate = nil
    stopUpdating()
}

// Update label steps
private func updateStepsCountLabelUsing(startDate: Date) {
    pedometer.queryPedometerData(from: startDate, to: Date()) {
        [weak self] pedometerData, error in
        if error != nil, let pedometerData = pedometerData {
            DispatchQueue.main.async {
                self?.stepsCountLabel.text = String(describing: pedometerData.numberOfSteps)
            }
        }
    }
}
    
```

### Build project và kết quả

![](https://media.giphy.com/media/3IUZvVPvkMyVKrVJ2f/giphy.gif)

## Kết luận
CoreMotion là một framework mạnh mẽ và bên cạnh một pedometer nó cho phép bạn làm việc với rất nhiều dữ liệu hữu ích từ gia tốc và con quay hồi chuyển. Qua bài viết này hy vọng các bạn hiểu thêm về CoreMotion.

[Sample project](https://github.com/oNguyenTuAnh/PedometerDemo)

[Nguồn tham khảo.](https://medium.com/ios-development-tips-and-tricks/coremotion-closer-look-at-pedometer-98306383ca52)

Thank! 😃