## Việc sử dụng PickerView trong các dự án có 2 cách thông thường như sau:
1. Add thẳng PickerView vào file XIB, mỗi khi gọi sẽ show/hide PickerView.
2. Với các component cho phép input text như UITextField hay UITextView, chúng ta sẽ gán PickerView là InputView của các component đó. Xem đoạn code sau:
```
let rolePickerView: PickerView = .fromNib()
self.roleTextField.inputView = self.rolePickerView
```
Vấn đề ở đây là với trường hợp 1, chúng ta sẽ phải tự tạo hiệu ứng animation bottom to top cho PickerView. Còn trường hợp 2 thì không cần vì inputView đã support sẵn animation đó.
Tuy nhiên ở cả 2 trường hợp đều không có blur background giống như 1 AlertView hiển thị:
![](https://images.viblo.asia/014d0969-4ea5-4117-a76e-e135c37c546e.png)
Vì vậy trong bài viết này mình sẽ hướng dẫn tạo 1 PickerBlurView đáp ứng được animation khi xuất hiện và có blur background.

## Các bước thực hiện coding như sau:
- Đầu tiên bạn sẽ tạo 1 class kế thừa UIView đặt tên PickerBlurView và 1 file XIB có chứa 1 Visual Effect View with Blur + 1 PickerView như hình dưới đấy:
![](https://images.viblo.asia/4f986cc3-3365-4df2-9a7c-5488a3625869.png)

- Kéo các IBOutlet vào trong file PickerBlurView.swift:
```
@IBOutlet private weak var blurView: UIVisualEffectView!
@IBOutlet private weak var pickerView: UIPickerView!
```

- Để config dữ liệu cho PickerView ta thêm 1 biến có tên pickerData và 1 function:
```
fileprivate var pickerData = [String]()

func configData(_ data: [String]) {
        pickerData = data
        pickerView.reloadAllComponents()
    }
```

- Tạo 1 delegate để trả về data được chọn từ PickerView:
```
protocol PickerBlurViewDelegate: class {
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int, value: String?)
}
```
```
class PickerBlurView: UIView {
    weak var delegate: PickerBlurViewDelegate?
}
```

- Setup PickerView, control việc khi PickerView hiển thị người dùng sẽ cần tap vào màn hình để ẩn nó đi sau khi dùng:
```
private func setupPickerView() {
        pickerView.alpha = 0
        pickerView.dataSource = self
        pickerView.delegate = self
        self.addTapGesture(blurView)
    }
@objc func hidePickerView() {
        self.removeFromSuperview()
    }
    
    fileprivate func addTapGesture(_ inView: UIView) {
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(PickerBlurView.hidePickerView))
        inView.addGestureRecognizer(tapGesture)
    }
```

- Viết hàm hiển thị PickerView với animation + blur background, để làm việc này chúng ta sẽ phải add view vào window của ứng dụng:
```
let appDelegate:AppDelegate                         = UIApplication.shared.delegate as! AppDelegate
let MAIN_SCREEN:UIScreen                            = UIScreen.main
let ScreenWidth:CGFloat                             = MAIN_SCREEN.bounds.size.width
let ScreenHeight:CGFloat                            = MAIN_SCREEN.bounds.size.height
func showPickerView() {
        UIApplication.shared.keyWindow?.addSubview(self)
        self.frame = UIApplication.shared.keyWindow?.bounds ?? .zero
        var pickerFrame = pickerView.frame
        pickerFrame.origin.y = (ScreenHeight + pickerFrame.size.height)
        pickerView.frame = pickerFrame
        UIView.animate(withDuration: 0.3, animations: {
            pickerFrame.origin.y = ScreenHeight - pickerFrame.size.height
            self.pickerView.frame = pickerFrame
            self.pickerView.alpha = 1
        })
    }
```

- Việc tiếp theo là adapt các function trong UIPickerViewDelegate, UIPickerViewDatasource:
```
// MARK: - UIPickerViewDataSource Functions
extension PickerBlurView: UIPickerViewDataSource {
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return self.pickerData.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        let itemValue = self.pickerData[row]
        return itemValue
    }
}

// MARK: - UIPickerViewDelegate Functions
extension PickerBlurView: UIPickerViewDelegate {
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        let itemValue = self.pickerData[row]
        self.delegate?.pickerView(pickerView, didSelectRow: row, inComponent: component, value: itemValue)
    }
}
```

## Sử dụng:
- Tạo 1 extension UIView, function load libView:
```
extension UIView {
    class func fromNib() -> UIView? {
        return Bundle(for: self).loadNibNamed(String(describing: self), owner: nil, options: nil)?.first as? UIView
    }
}
```

- Tại ViewController cần sử dụng PickerBlurView:
```
@IBAction func showPickerBlur(_ sender: Any) {
        guard let pickerView = PickerBlurView.fromNib() as? PickerBlurView else {return}
        // set dummy data
        pickerView.configData(["123123123123", "123123123324234324", "edsfdsfdsfdsfs", "123123123123", "123123123324234324", "edsfdsfdsfdsfs", "123123123123", "123123123324234324", "edsfdsfdsfdsfs"])
        pickerView.delegate = self
        pickerView.showPickerView()
    }
```

- Adapt PickerBlurViewDelegate:
```
extension ViewController: PickerBlurViewDelegate {
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int, value: String?) {
        print("\(value ?? "")")
    }
}
```

- Hiển thị:
https://gyazo.com/58cca9e17b7cf9186ad6cf80a8d1ef03

## Kết luận:
Với việc custom 1 PickerView bạn có thể sử dụng lại ở các màn hình khác trong project của mình. Bạn cũng có thể viết thêm 1 custom của DatePicker tương tự như ở trên. Còn đây là [source code](https://drive.google.com/file/d/1bTQc6H6KPYAZibS6UzvL3MCpgsVOHQJH/view?usp=sharing).