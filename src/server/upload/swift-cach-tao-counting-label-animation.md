## Môi trường phát triển: 
- **Swift Language Version:** Swift 5.0
- **Xcode:** Version 10.2.1 (10E1001)
- **Deployment Target:** 12.0

## Bước 1: Khởi tạo các thuộc tính của Counting Label
Ta khởi tạo các thuộc tính sau trong class **CountingLabel**: 
```
class CountingLabel: UILabel {
    
    private let counterExponent: Float = 3.0
    
    enum CounterAnimationType {
        case Linear
        case EaseIn
        case EaseOut
    }
    
    enum CounterType {
        case Int
        case Float
    }
    
    private var startNumber: Float = 0.0
    private var endNumber: Float = 0.0
    
    private var progress: TimeInterval!
    private var duration: TimeInterval!
    private var lastUpdate: TimeInterval!
    
    private var timer: Timer?
    
    private var counterType: CounterType!
    private var counterAnimationType: CounterAnimationType!
```

Trong đó:
- **counterExponent:** số mũ để tính counter.
- **startNumber:** giá trị bắt đầu.
- **endNumber:** giá trị kết thúc.
- **progress:** khoảng thời gian tiến độ.
- **duration:** khoảng thời hạn.
- **lastUpdate:** thời điểm cập nhật cuối.
- **timer:** bộ đếm thời gian kích hoạt sau một khoảng thời gian nhất định.
- **counterType:**  kiểu giá trị counter.
- **counterAnimationType:** kiểu hiệu ứng counter.

## Bước 2: Setup timer
Tiếp theo, ta khởi tạo hàm **count()** để setup giá trị cho các thuộc tính của class CountingLabel và setup timer.
```
func count(fromValue: Float, to toValue: Float, withDuration duration: TimeInterval, andAnimationType animationType: CounterAnimationType, andCounterType counterType: CounterType) {
    self.startNumber = fromValue
    self.endNumber = toValue
    self.duration = duration
    self.counterType = counterType
    self.counterAnimationType = animationType
    self.progress = 0
    self.lastUpdate = Date.timeIntervalSinceReferenceDate
    invalidateTimer() // Reset timer

    if duration == 0 {
        {1} // Update text for label
        return 
    }

    // Setup timer
    timer = Timer.scheduledTimer(timeInterval: 0.01, target: self, selector: #selector(updateValue), userInfo: nil, repeats: true)
}
```
Hàm **updateValue()** cập nhật giá trị của progress, lastUpdate và text của Counting Label.
```
@objc
private func updateValue() {
    let now = Date.timeIntervalSinceReferenceDate
    progress = progress + (now - lastUpdate) // calculate a progress
    lastUpdate = now

    if progress >= duration {
        invalidateTimer() // Reset timer
        progress = duration
    }

    {2} // UpdateText in Label
}
```
Hàm **invalidateTimer()** dừng timer khỏi chạy một lần nữa và yêu cầu loại bỏ nó khỏi vòng lặp chạy của nó.
```
private func invalidateTimer() {
    timer?.invalidate()
    timer = nil
}
```
## Bước 3: Setup hàm updateText() và updateCounter()
Hàm **updateText()** cập nhật giá trị text của label.
```
private func updateText(_ value: Float) {
    switch counterType! {
    case .Int:
        self.text = "\(Int(value))"
    case .Float:
        self.text = String(format: "%.2f", value)
    }
}
```
Hàm **updateCounter()** trả về giá trị counter tại mỗi thời điểm khác nhau.
```
private func updateCounter(counterValue: Float) -> Float {
    switch counterAnimationType! {
    case .Linear:
        return counterValue
    case .EaseIn:
        return powf(counterValue, counterExponent) // exponent method for float
    case .EaseOut:
        return 1.0 - powf(1.0 - counterValue, counterExponent)
    }
}
```
Biến **currentCounterValue** là giá trị hiện tại của counter.
```
private var currentCounterValue: Float {
    if progress >= duration {
        return endNumber
    }

    let percentage = Float(progress/duration)
    let update = updateCounter(counterValue: percentage)

    return startNumber + (update * (endNumber - startNumber))
}
```

Tiếp theo ta thay thế {1} bằng đoạn code sau:
```
updateText(toValue)
```
và {2} bằng đoạn code sau:
```
updateText(currentCounterValue)
```

## Bước 4: Add Counting Label Animation
```
final class ViewController: UIViewController {
    @IBOutlet private weak var countingLabel: CountingLabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        countingLabel.count(fromValue: 0, to: 9999, withDuration: 10, andAnimationType: .EaseOut, andCounterType: .Int)
    }
}
```
Và đây là kết quả:
![](https://images.viblo.asia/ab3410b2-c320-43e4-aa7a-0cbcfa60c8f1.gif)
## Tài liệu tham khảo:
https://www.brianadvent.com/create-counting-uilabel-animation-0424/