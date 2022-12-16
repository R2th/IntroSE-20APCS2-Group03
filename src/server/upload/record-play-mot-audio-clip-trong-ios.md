> AVFoundation Framework cung cấp rất nhiều chức năng cho các nhà phát triển để xử lý dữ liệu âm thanh.

![](https://images.viblo.asia/8d679d3e-724f-4015-96b5-82b9e4b15e77.jpeg)

Ứng dụng iOS có thể truy cập micrô của người dùng và mã hóa đầu vào âm thanh. Ví dụ: WhatsApp ghi lại giọng nói của người dùng để gửi tin nhắn thoại cho người khác. Apple cung cấp một framework tuyệt vời - framework AVFoundation để giúp các ứng dụng dễ dàng yêu cầu quyền sử dụng micrô, mã hóa đầu vào âm thanh và phát lại clip đã ghi, v.v. \

Trong hướng dẫn này, tôi sẽ giới thiệu các bước để ghi một đoạn âm thanh và phát lại sau khi nó được hệ thống mã hóa. Hãy bắt đầu!

### Recording an Audio Clip
##### 1. Cơ sở lý luận cho việc sử dụng micrô của người dùng
Đây là một vấn đề quan trọng về quyền riêng tư nếu một ứng dụng có thể truy cập vào micrô của người dùng và biết ngay cả những gì người dùng đã nói. Do đó, Apple buộc các ứng dụng phải cung cấp lý do hợp lý để cho người dùng biết lý do tại sao ứng dụng muốn truy cập micrô.\

Đầu tiên, hãy thêm NSMicrophoneUsageDescription tại info.plist.

![](https://images.viblo.asia/8c9e6d20-fbd6-424f-b9cd-29c3a5d9d7e1.png)

```
<dict>
  <key>NSMicrophoneUsageDescription</key>
  <string>(Enter your rationale about using user's microphone here)</string>
</dict>
```
##### 2. Yêu cầu Quyền đối với Micrô tại Runtime
```
import AVFoundation

AVAudioSession.sharedInstance().requestRecordPermission() { [weak self] isGranted in
                                                           
  guard let strongSelf = self else { return }
                                                           
  guard isGranted else {

    // You can present an UIAlertController and go to app Settings
    let settingURL = URL(string: UIApplication.openSettingsURLString)!
    UIApplication.shared.open(settingURL, options: [:], completionHandler: nil)
    
    return
  }

  // Ready for using the microphone
}
```
Bạn có thể sử dụng shared instance của AVAudioSession để yêu cầu sử dụng micrô của người dùng. Sẽ có một boolean được trả về ở completion handler.\

Trong trường hợp thực tế, dialog permission sẽ không hiển thị lại nếu người dùng đã từ chối permission trước đó. Do đó, bạn có thể tham khảo dòng 10–11 ở trên và chỉ ra cơ sở lý luận cho người dùng về mục đích sử dụng micrô của họ. Sau đó, bạn có thể chuyển hướng người dùng đến trang Cài đặt ứng dụng để họ cấp quyền theo cách thủ công.
##### 3. Set up AVAudioSession
```
do {
  try AVAudioSession.sharedInstance().setCategory(.playAndRecord, mode: .default)
  try AVAudioSession.sharedInstance().setActive(true)
} catch {
  print("Error on setting up the recorder: \(error.localizedDescription)")
}
```
AVAudioSession là một đối tượng giao tiếp với hệ thống về cách bạn định sử dụng âm thanh trong ứng dụng của mình.\

Bạn phải đặt danh mục AVAudioSession thành .playAndRecord hoặc .record để ghi âm thanh đầu vào từ micrô. Tôi chọn sử dụng .playAndRecord vì tôi sẽ phát lại đoạn âm thanh sau khi nó được ghi.

Sau đó, bạn phải kích hoạt AVAudioSession để hệ thống biết ứng dụng của bạn đang sử dụng micrô. Có những trường hợp có thể xảy ra đối với chức năng này để tạo ra một lỗi. Ví dụ: khi người dùng đang thực hiện hoặc trả lời cuộc gọi bằng ứng dụng điện thoại hệ thống đang sử dụng micrô. Lỗi được hiển thị bên dưới:\
`The operation couldn’t be completed. (OSStatus error 561017449.)`

##### 4. Lấy vị trí ổ đĩa để lưu file audio đã record

iOS cung cấp một thư mục cho mỗi ứng dụng để lưu trữ các tệp ứng dụng và thư mục được kiểm soát bởi FileManager. Bạn có thể lấy một cái bằng hàm bên dưới:
```
func getDocumentsDirectory() -> URL {
  let urlList = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
  return urlList.first!
}
```
##### 5. Set Up AVAudioRecorder
Sau đó, bạn có thể sử dụng URL tệp đã tạo để khởi tạo AVAudioRecorder chịu trách nhiệm mã hóa đoạn âm thanh đã ghi.
```
do {
  // Class variable in order not to be kept alive 
  let audioFilename = getDocumentsDirectory().appendingPathComponent("testing.wav")
  audioRecorder = try AVAudioRecorder(url: audioFilename, settings: [:])
  audioRecorder.delegate = self
} catch {
  print(error.localizedDescription)
}
```
Bạn cũng có thể chỉ định một delegate cho nó để listen các events khi AVAudioRecorder ghi xong và bất kỳ error nào xảy ra trong quá trình encoding đầu vào âm thanh.
```
extension AudioRecordingViewController: AVAudioRecorderDelegate {
  func audioRecorderDidFinishRecording(_ recorder: AVAudioRecorder, successfully flag: Bool) {
    if flag {
      // Will be written in the next session
      playSound(url: recorder.url)
    } else {
      print("The recording cannot be completed successfully")
    }
  }

  func audioRecorderEncodeErrorDidOccur(_ recorder: AVAudioRecorder, error: Error?) {
    print("There is an error during encoding: \(String(describing: error?.localizedDescription))")
  }
}
```

##### 6. Start & End Recording
```
audioRecorder.record()
audioRecorder.stop()
```

The final steps are “start” and “stop” recording the audio input. The codes above are self-explanatory. Build and run the app, and you can find the audioRecorderDidFinishRecording is triggered after the AVAudioRecorder is stopped.

Các bước cuối cùng là “start” và “stop” ghi âm thanh đầu vào. Build và run app, đồng thời bạn có thể tìm thấy audioRecorderDidFinishRecording được kích hoạt sau khi AVAudioRecorder bị dừng.

### Play Back the Audio Clip
![](https://images.viblo.asia/2d6391d3-d915-4b87-9ae1-4a765c18c4d6.jpeg)

```
func playSound(url: URL) {
  do {
    // Set up the AVAudioSession configuration
    try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
    try AVAudioSession.sharedInstance().setActive(true)

    // Keep an instance of AVAudioPlayer at the UIViewController level
    self.player = try AVAudioPlayer(contentsOf: url)
    player.play()
  } catch let error {
    print(error.localizedDescription)
  }  
}
```
Ngay sau khi ghi đoạn âm thanh, bạn có thể muốn nghe đoạn đó. Việc phát lại đoạn âm thanh khá đơn giản.\

Đầu tiên, bạn phải đặt danh mục AVAudioSession thành bất kỳ chế độ phát lại nào ngoại trừ chế độ .record.

> Bạn không cần reset lại nếu bạn đã đặt danh mục thành .playAndRecord trong phần trước.

Sau đó, bạn có thể initialise AVAudioPlayer với url file của clip âm thanh và gọi play() sau đó.

### Tổng kết
iOS cung cấp chức năng để ứng dụng truy cập micrô của người dùng. Tuy nhiên, nó yêu cầu người dùng cấp quyền cho ứng dụng trước.

Apple cung cấp framework AVFoundation để kiểm soát nội dung âm thanh và video trong iOS. Bạn có thể sử dụng AVAudioRecorder để ghi âm thanh đầu vào và lưu vào local file có thư mục do FileManager cung cấp.

Phát lại một đoạn âm thanh thật dễ dàng dưới sự trợ giúp của lớp AVAudioPlayer.

Nguồn tham khảo: [iOS — Record & Play an Audio Clip](https://itnext.io/ios-record-play-an-audio-clip-1ba8004543ee)