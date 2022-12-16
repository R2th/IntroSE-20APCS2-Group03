Trước lúc bước vào phần mới tiếp tục thì chúng ta hãy cùng nhau xem lại thành quả của lần trước:
![](https://images.viblo.asia/c3bdf3e0-de58-4988-be10-49385bfb0a66.png)

(Refer bài viết chi tiết tại [ĐÂY](https://viblo.asia/p/huong-dan-lap-trinh-macos-phan-3-GrLZDwLJKk0))

Ở phần trước chúng ta đã viết xong tất cả các hàm cho những button ở trên màn hình, cơ bản app của chúng ta đã chạy thành công nhưng vẫn chưa đủ. 

Những button ở trên thanh menu vẫn chưa được viết các hàm để hoạt động. Ở phần này chúng ta sẽ tiếp tục làm nốt các button ở trên thanh menu để hoàn thiện app của chúng ta.

Chúng ta hãy lần lượt đi từ các phần còn thiếu
* Các Buttons and Menus
* Preferences
* Implement các preferences
* Thêm âm thanh cho ứng dụng

# Menu button

Các button có thể được hoạt động hoặc disable dựa trạng thái của timer và các button timer ở trên Menu phải hoàn toàn phải phù hợp với trạng thái này.

Thêm hàm sau vào "View Controller", nằm trong phần extension:
```
 func configureButtonsAndMenus() {
    let enableStart: Bool
    let enableStop: Bool
    let enableReset: Bool

    if eggTimer.isStopped {
      enableStart = true
      enableStop = false
      enableReset = false
    } else if eggTimer.isPaused {
      enableStart = true
      enableStop = false
      enableReset = true
    } else {
      enableStart = false
      enableStop = true
      enableReset = false
    }

    startButton.isEnabled = enableStart
    stopButton.isEnabled = enableStop
    resetButton.isEnabled = enableReset

    if let appDel = NSApplication.shared().delegate as? AppDelegate {
      appDel.enableMenus(start: enableStart, stop: enableStop, reset: enableReset)
    }
  }
```

Hàm này sử dụng trạng thái của "*EggTimer*" để điều chỉnh xem button nào sẽ được hoạt động và button nào disable.

Ở trong phần 2, chúng ta đã tạo ra những button ở trên thanh menu và đặt thuộc tính của nó vào trong "*AppDelegate*", vì vậy chúng ta phải vào "*AppDelegate*" để tùy chỉnh chúng.

Chuyển sang "*AppDelegate*" và thêm hàm sau:

```
 func enableMenus(start: Bool, stop: Bool, reset: Bool) {
    startTimerMenuItem.isEnabled = start
    stopTimerMenuItem.isEnabled = stop
    resetTimerMenuItem.isEnabled = reset
  }
```

Vậy là thanh menu của chúng ta đã hoàn toàn được thiết lập khi app được chạy, thêm đoạn code sau vào trong "applicationDidFinishLaunching":

```
enableMenus(start: true, stop: false, reset: false)
```

Các button ở trong app và các các button trên menu phải được đồng bộ với nhau dựa vào trạng thái của "EggTimer". 

Vì vậy quay lại "*ViewController.swift*" và thêm dòng sau vào cuối đoạn code của ba hàm thuộc ba button trong app.

```
configureButtonsAndMenus()
```

Chạy thử app xem thế nào:
![](https://images.viblo.asia/624cea6a-d72b-4af7-a723-775cf80bbd5d.png)

# Preferences

Tiếp đến chúng ta hãy cùng nhau tạo ra phần Preferences cho phép thay đổi setting của app như thời gian luộc trứng

Giả sử như chúng ta muốn luộc trứng trong khoảng thời gian khác mà không phải là 6 phút. Thì nên làm thế nào?

Ở phần 2, chúng ta đã tạo ra một cửa sổ "*Preference*" để tùy chỉnh điều này. Cửa sổ đấy được điều khiển bởi "*PrefsViewController*", nhưng nó cần có một đối tượng model để lưu trữ dữ liệu.

Preferences sẽ được lưu trữ vào trong "*UserDefaults*", một cách để lưu trữ dựa vào key-value được cất trong thư mục Preference nằm trong app.

Chuột phải vào trong "*Model*" nằm trong "*Project Navigator*" và chọn "*New File...*" Chọn "*macOS/Swift File*" và chọn "*Next*". Đặt tên file là "*Preference.swift*" và bấm vào "*Create*". Thêm dòng code sau vào trong file này:

```
struct Preferences {

  // 1
  var selectedTime: TimeInterval {
    get {
      // 2
      let savedTime = UserDefaults.standard.double(forKey: "selectedTime")
      if savedTime > 0 {
        return savedTime
      }
      // 3
      return 360
    }
    set {
      // 4
      UserDefaults.standard.set(newValue, forKey: "selectedTime")
    }
  }

}
```

Chúng ta sẽ tạo ra một biến dựa vào getter và setter với "*UserDefaults*" để lưu trữ dữ liệu tự động.

Bây giờ hãy quay lại "*PrefsViewController.swift*", khi mà nhiệm vụ đầu tiên là phải cập nhật hiển thị sao cho đúng với dữ liệu đã được lưu.

Đầu tiên, thêm thuộc tính var prefs = Preferences() và thêm hàm show giá trị preferences

```
func showExistingPrefs() {
  // 1
  let selectedTimeInMinutes = Int(prefs.selectedTime) / 60

  // 2
  presetsPopup.selectItem(withTitle: "Custom")
  customSlider.isEnabled = true

  // 3
  for item in presetsPopup.itemArray {
    if item.tag == selectedTimeInMinutes {
      presetsPopup.select(item)
      customSlider.isEnabled = false
      break
    }
  }

  // 4
  customSlider.integerValue = selectedTimeInMinutes
  showSliderValueAsText()
}

// 5
func showSliderValueAsText() {
  let newTimerDuration = customSlider.integerValue
  let minutesDescription = (newTimerDuration == 1) ? "minute" : "minutes"
  customTextField.stringValue = "\(newTimerDuration) \(minutesDescription)"
}
```

Giải thích qua tí về các hàm 1,2,3,4 ở trên:
1. Lấy thời gian từ "selectedTime" và chuyển đổi nó từ giây sang phút.
2. Đặt giá trị mặc định là "Custom" khi mà không có giá trị setting khác.
3. Đặt vòng lặp vào trong button của menu nằm trong "presetsPopup" để kiểm tra tag của chúng. Các tag này đã được chúng ta đặt ở phần 2
4. Đặt giá trị cho thanh trượt và gọi "showSliderValueAsText".
5. "showSliderValueAsText" thêm phút vào trong text field.

Bây giờ, thêm dòng code sau vào "viewDidLoad":

showExistingPrefs()

Khi view được load, gọi hàm hiển thị lên các "*Preferences*" trong giao diện. 

Nhớ rằng chúng ta đang sử dụng MVC, đối tượng Model của "Preferences" hoàn toàn bị động và không biết khi nào được hiển thị lên, tuy nhiên điều này sẽ được "PrefsViewController" quản lý.

Bây giờ chúng ta đã có khả năng để setting thời gian, nhưng chỉnh thời gian ở trong popup hiện đang không có tác dụng gì. Chúng ta cần một hàm để lưu dữ liệu mới và dùng dữ liệu mới này ở các nơi khác của app.

Trong đối tượng "*EggTimer*", chúng ta đã dùng delegate để chuyển dữ liệu đến nơi chúng ta cần. Ở lần này, chúng ta sẽ dùng "*Notification*" để truyền tải việc dữ liệu đã được thay đổi. Bất cứ đối tượng nào chọn theo dõi "*Notification*" này sẽ có hành động khi nó được kích hoạt lên.

Thêm hàm sau vào "*PrefsViewController*" :

```
func saveNewPrefs() {
    prefs.selectedTime = customSlider.doubleValue * 60
    NotificationCenter.default.post(name: Notification.Name(rawValue: "PrefsChanged"),
                                    object: nil)
  }
```

Chúng ta sẽ lấy dữ liệu trên thanh trượt seekbar và gán giá trị đó vào trong thuộc tính "*selectedTime*" mà chúng ta đã cho nó tự động lưu vào "*UserDefaults*". Và một "*Notification*" tên là "*PrefsChanged*" được đẩy vào trong "NotificationCenter".

Ngay lập tức, ta sẽ thấy được "ViewController" lắng nghe "Notification" và hành động.

Bước cuối cùng của "*PrefsViewController*"và đặt code vào trong "*@IBAction*" mà chúng ta đã tạo ra trong phần 2. 

```
 // 1
  @IBAction func popupValueChanged(_ sender: NSPopUpButton) {
    if sender.selectedItem?.title == "Custom" {
      customSlider.isEnabled = true
      return
    }

    let newTimerDuration = sender.selectedTag()
    customSlider.integerValue = newTimerDuration
    showSliderValueAsText()
    customSlider.isEnabled = false
  }

  // 2
  @IBAction func sliderValueChanged(_ sender: NSSlider) {
    showSliderValueAsText()
  }

  // 3
  @IBAction func cancelButtonClicked(_ sender: Any) {
    view.window?.close()
  }

  // 4
  @IBAction func okButtonClicked(_ sender: Any) {
    saveNewPrefs()
    view.window?.close()
  }
```
  
Giải thích về các hàm 1,2,3,4 ở trên:

1. Khi một item được chọn trong popup, kiểm tra xem nó có ở trong Custom Menu không. Nếu có, cho thanh trượt hoạt động và đi ra. Nếu không, dùng tag để lưu số phút, và dùng chúng để đặt giá trị cho thanh slider và vô hiệu hóa thanh trượt.
2. Mỗi khi thanh trượt thay đổi, thay đổi text.
3. Bấm vào Cancel sẽ đóng cửa sổ và không lưu giá trị.
4. Bấm vào OK sẽ lưu giá trị vào "saveNewPrefs" sau đó đóng cửa sổ.

Để kiểm tra seekbar chạy đùng thì chúng ta chạy app, sau đó vào "*Preferences*". Chọn các giá trị khác nhau trong Popup - để ý xem thanh trượt và text có hoạt động không. Chọn Custom và chọn vào thời gian bạn mong muốn. Bấm OK, quay lại "Preferences" và xem thời gian bạn chọn có đúng không.

Bây giờ, hãy thoát app và chạy lại. Vào lại "*Preferences*" xem các tùy chỉnh của bạn đã được lưu chưa.

![](https://images.viblo.asia/2b966001-1a9d-4ff8-9329-236105bd26be.png)

Như vậy là chúng ta đã tạo ra được pop up của Preferences cũng như lưu lại được giá trị setting của Preferences rồi. 
Chúng ta hãy cùng xem cần phải sửa tiếp theo thế nào để app chạy được đúng với Preferences đã setting.

# Implement các preferences

Đầu tiên là chỉnh sửa file *ViewController.swift* để lưu trữ thời gian và để lắng nghe *Notification* về việc thời gian đã được setting lại.

Thêm extension sau vào *ViewController.swift* :

```
extension ViewController {

  // MARK: - Preferences

  func setupPrefs() {
    updateDisplay(for: prefs.selectedTime)

    let notificationName = Notification.Name(rawValue: "PrefsChanged")
    NotificationCenter.default.addObserver(forName: notificationName,
                                           object: nil, queue: nil) {
      (notification) in
      self.updateFromPrefs()
    }
  }

  func updateFromPrefs() {
    self.eggTimer.duration = self.prefs.selectedTime
    self.resetButtonClicked(self)
  }

}
```

Chúng ta cần khai báo prefs trong class ViewController như dưới:

```
 var prefs = Preferences()
```

Bây giờ, *PrefsViewController* và *ViewController* đều có đối tượng prefs, lý do:

1. PrefsViewController là một struct, vì vậy nó là dạng value không phải dạng preference. Mỗi View Controller đều có một đối tượng riêng biệt.
2. Preferences tương tác với UserDefaults thông qua một singleton, vì vậy mà tất cả các đối tượng đều dùng chung một UserDefaults và lấy cùng một dữ liệu.

Thêm đoạn code sau vào đoạn cuối cùng của hàm viewDidLoad :

```
 setupPrefs()
```

Thay thế các chỗ đã hardcode 360s (tương ứng với 6p) trước đây bằng giá trị time setting từ preference: *prefs.selectedTime* trong file *ViewController.swift*
 
Chạy lại ứng dụng check xem preference đã chạy đúng chưa và đã được hiển thị đúng trên view chưa?

![](https://images.viblo.asia/88b7c467-8800-4ab3-908a-126eca56201d.png)


Tiếp theo hãy suy nghĩ về việc thêm âm thanh cho ứng dụng khi báo luộc xong trứng.
# Thêm âm thanh cho ứng dụng

Chắc hẳn đầu tiên cần là download file âm thanh về. Bạn có thể dùng file âm thanh tại [đây](https://koenig-media.raywenderlich.com/uploads/2017/02/ding.mp3.zip)

Kéo file đã tải về (ding.mp3) vào trong *Project Navigator* vào trong EggTimer ngay dưới *Main.storyboard*. Đảm bảo rằng chọn vào *Copy items if needed*.

Sau đó bấm finish.

![](https://images.viblo.asia/fa7b157e-5f0c-4fda-b98f-143cd9318712.png)

Để bật âm thanh, bạn cần phải dùng thư viện *AVFoundation*. 

*ViewController* sẽ bật âm thanh khi bộ đếm thời gian kết thúc việc đếm. 

Hãy thêm đoạn code sau vào file ViewController.swift:

Tạo file chạy âm thanh:

```
import AVFoundation  
```

Khởi tạo player để chạy sound:

```
var soundPlayer: AVAudioPlayer?
```

Hàm **prepareSound()** sẽ giúp ta check file âm thanh và khởi tạo player tương ứng.

```
extension ViewController {

  // MARK: - Sound

  func prepareSound() {
    guard let audioFileUrl = Bundle.main.url(forResource: "ding",
                                             withExtension: "mp3") else {
      return
    }

    do {
      soundPlayer = try AVAudioPlayer(contentsOf: audioFileUrl)
      soundPlayer?.prepareToPlay()
    } catch {
      print("Sound player not available: \(error)")
    }
  }

  func playSound() {
    soundPlayer?.play()
  }

}
```

Chuẩn bị sẵn âm thanh trong file **startButtonClicked**

```
prepareSound()
```

Play sound khi luộc xong trứng (bộ đếm kết thúc - hàm **timerHasFinished**):

```
playSound()
```

Check lại thành quả app luộc trứng với (GUI, Menu button, preference, sound)

![](https://images.viblo.asia/863ab427-bc55-46a9-9508-01bc10a70a71.png)

Cảm ơn các bạn đã theo dõi. Enjoy coding ^^

Link ref: https://www.raywenderlich.com/151748/macos-development-beginners-part-3