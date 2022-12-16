Mặc dù không khó để ghi lại âm thanh bằng iPhone, nhưng nó mất khá nhiều dòng code
Trước tiên, bạn cần import thư viện AVFoundation.

Bạn sẽ cần thêm ba thuộc tính vào bộ điều khiển xem của mình: một button để người dùng nhấn để bắt đầu hoặc dừng ghi âm, session để quản lý ghi âm và máy ghi âm để xử lý việc đọc và lưu dữ liệu thực tế. Bạn có thể tạo button trong Trình tạo giao diện nếu bạn thích; chúng tôi sẽ làm điều đó trong mã ở đây.

Đặt ba variable này :

```
var recordButton: UIButton!
var recordingSession: AVAudioSession!
var audioRecorder: AVAudioRecorder!
```

Ghi âm yêu cầu sự cho phép của người dùng để ngăn chặn các ứng dụng độc hại làm những việc độc hại, vì vậy chúng ta cần yêu cầu quyền ghi âm từ người dùng. Nếu người dùng cấp phép, chúng ta sẽ tạo nút ghi âm. Thêm vào viewDidLoad ():\

```
recordingSession = AVAudioSession.sharedInstance()

do {
    try recordingSession.setCategory(.playAndRecord, mode: .default)
    try recordingSession.setActive(true)
    recordingSession.requestRecordPermission() { [unowned self] allowed in
        DispatchQueue.main.async {
            if allowed {
                self.loadRecordingUI()
            } else {
                // failed to record!
            }
        }
    }
} catch {
    // failed to record!
}
```

Tạo hàm loadRecextUI () để cập nhật giao diện :

```
func loadRecordingUI() {
    recordButton = UIButton(frame: CGRect(x: 64, y: 64, width: 128, height: 64))
    recordButton.setTitle("Tap to Record", for: .normal)
    recordButton.titleLabel?.font = UIFont.preferredFont(forTextStyle: .title1)
    recordButton.addTarget(self, action: #selector(recordTapped), for: .touchUpInside)
    view.addSubview(recordButton)
}
```

Viết function startRecording để thực hiện việc record âm thanh : 
```
func startRecording() {
    let audioFilename = getDocumentsDirectory().appendingPathComponent("recording.m4a")

    let settings = [
        AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
        AVSampleRateKey: 12000,
        AVNumberOfChannelsKey: 1,
        AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue
    ]

    do {
        audioRecorder = try AVAudioRecorder(url: audioFilename, settings: settings)
        audioRecorder.delegate = self
        audioRecorder.record()

        recordButton.setTitle("Tap to Stop", for: .normal)
    } catch {
        finishRecording(success: false)
    }
}
```

Bạn cần thêm function getDocumentDirectory, một hàm rất hữu dụng trong nhiều project: 

```
func getDocumentsDirectory() -> URL {
    let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
    return paths[0]
}
```

Cần khai báo ViewController là một object tuân thủ protocol AVAudioRecorderDelegate.
Giờ thì thực hiện function finishRecording để xử lý việc kết thúc record:

```
func finishRecording(success: Bool) {
    audioRecorder.stop()
    audioRecorder = nil

    if success {
        recordButton.setTitle("Tap to Re-record", for: .normal)
    } else {
        recordButton.setTitle("Tap to Record", for: .normal)
        // recording failed :(
    }
}
```

Giờ thì khai báo function để handle action của button mà chúng ta đã tạo ở trên
```
@objc func recordTapped() {
    if audioRecorder == nil {
        startRecording()
    } else {
        finishRecording(success: true)
    }
} 
```

Trước khi bạn hoàn thành, có một điều nữa cần lưu ý: iOS có thể dừng ghi âm của bạn vì một số lý do ngoài tầm kiểm soát của bạn, chẳng hạn như nếu một cuộc gọi điện thoại đến. Vì vậy nếu tình huống này xảy ra bạn cần thực hiện bắt sự kiện đó bằng function audioRecorderDidFinishRecply ()  như thế này:

```
func audioRecorderDidFinishRecording(_ recorder: AVAudioRecorder, successfully flag: Bool) {
    if !flag {
        finishRecording(success: false)
    }
}
```