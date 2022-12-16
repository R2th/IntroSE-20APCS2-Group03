Bài viết này sẽ hướng dẫn bạn cách để thêm tính năng Speech recognition vào ứng dụng iOS thông qua Speech Recognition framework của Apple .
![](https://images.viblo.asia/9bd844ee-53e9-4165-8450-496c32a83089.png)


Với sự phát triển của công nghệ, máy móc của chúng ta có thể nhanh chóng và chính xác thông dịch hầu hết các loại ngôn ngữ trên thế giới bao gồm cả tiếng địa phương. Không chỉ có vậy, kết quả chúng ta nhận được có thể dựa vào thông tin các nhân của chúng ta như các liên lạc, các ứng dụng đã tải, ảnh, video và một vài mẩu dữ liệu khác. Dữ liệu đưa vào được dịch tự động với thời gian thực (real time) và kết quả được trả về gần như ngay lập tức, điều này giúp cho chúng ta có thể nhập dữ liệu sử dụng giọng một cách nhanh gọn hơn nhiều so với cách nhập dữ liệu truyền thống sử dụng bàn phím. Với nhận diện giọng nói, chúng ta có thể làm ứng dụng của mình thú vị hơn rất nhiều. Ví dụ,  chúng ta có thể tạo ra một ứng dụng chụp ảnh mỗi khi nói "cheese". Chúng ta cũng cũng có thể tạo ra một ứng dụng mà có thể tự động thông dịch cả một bộ phim. 

Trong bài hướng dẫn này , chúng ta sẽ thử xây dựng một ứng dụng mang tên Gangstribe sử dụng nhận diện giọng để thông dịch một số đoạn audio có sẵn. Speech Recognition framework sẽ không thể hoạt động trên simulator cho nên bạn hãy chuẩn bị một thiết bị với iOS 10 trở lên nhé.

## Bắt đầu
Hãy tải về sample project [ở đây](https://koenig-media.raywenderlich.com/uploads/2017/06/gangstribe-starter-3-2-2.zip). Sau đó mở **Gangstribe.xcodeproj** để bắt đầu với bài hướng dẫn này. Chọn file project -> **Gangstribe** và sau đó là tab **General**, chọn development team của bạn trong phần signing. 

![](https://images.viblo.asia/609b5fc4-0ff5-407f-b543-d5cf266da716.png)

Kết nối với thiết bị iOS của bạn và chạy thử thế thấy được phần khung của ứng dụng này. Từ màn hình chính, bạn có thể lựa chọn một track và sau đó màn hình detail sẽ chơi bản track này cho bạn. Nút transcribe hiện tại chưa thể sử dụng nhưng bạn sẽ thấy thấy được phiên dịch của bản track bạn chọn.

![](https://images.viblo.asia/9f12e4b7-bc89-4194-a02e-d084bab79d5a.png)

Sau đây sẽ là một số Class và group mà bạn sẽ làm việc với chúng trong bài hướng dẫn này:
* **MasterViewController.swift**: Hiện thị danh sách các track trên table view.
* **RecordingViewController.swift**: Chơi bản track đã được lựa chọn đồng thời sẽ bắt đầu thông dịch khi bạn click vào nút transcribe sau khi chúng ta xử lí với `handleTranscribeButtonTapped(_:)`.

Chúng ta sẽ bắt đầu bằng việc xử lí nút transcribe trên màn hình detail.

## Cơ bản về Transcribe
Sẽ có 4 yếu tố quan trọng khi nhận diện giọng nói trong bài hướng dẫn này:
1. `SFSpeechRecognizer` là controller chính trong framework này. Việc quan trọng nhất mà nó sẽ làm là tạo ra các recognition task và trả về kết quả. Ngoài ra nó cũng xử lí với authorization và configures locales.
3. `SFSpeechRecognitionRequest` là base class cho recognition requests. Việc nó làm là chỉ cho `SFSpeechRecognizer` audio track sẽ được transcribe
4. `SFSpeechRecognitionTask` là kiểu object sẽ được khởi tạo khi request được bắt đầu bởi recognizer. Những object này có thể bám sát tiến độ thông dịch hoặc huỷ thông dịch.
5. `SFSpeechRecognitionResult`mỗi object này chưa một phần nhỏ của kết quả đã được phiên dịch, thường là một từ.

Sau đây là cách mà nhữung object trên tương tác với nhau trong quá trình thông dịch:

![](https://images.viblo.asia/381909cc-b7ea-4674-8ce4-806b7be99449.png)

Phần code để hoàn thành việc thông dịch khá đơn giản. Đưa audio file vào phần `url` dưới đây và nó sẽ được thông dịch và kết quả được in ra:

```
let request = SFSpeechURLRecognitionRequest(url: url)
SFSpeechRecognizer()?.recognitionTask(with: request) { (result, _) in
  if let transcription = result?.bestTranscription {
    print("\(transcription.formattedString)")
  }
}
```

`SFSpeechRecognizer` bắt đầu `SFSpeechRecognitionTask` cho `SFSpeechURLRecognitionRequest` sử dụng `recognitionTask(with:resultHandler:)`.  Nó sẽ trả về kết quả thông qua `resultHandler`. Phần code này sẽ in ra kết quả kiểu chuỗi trong `bestTranscription`.

## Phiên dịch các file audio
Trước khi bắt đầu đọc và gửi đi các dự liệu audio của người dùng đến một remote server, chúng ta phải cin sự cho phép trước đó. Trên thực tế, đây là điều bắt buộc dựa trên chính sách dành cho người dùng của Apple. hãy mở **RecordingViewController.swift** và thêm vào phần import: `import Speech`, đây chính là Speech Recognition API. Sau đó hãy thêm phần code sau cho hàm `handleTranscribeButtonTapped(_:)`:

```
SFSpeechRecognizer.requestAuthorization {
  [unowned self] (authStatus) in
  switch authStatus {
  case .authorized:
    if let recording = self.recording {
      //TODO: Kick off the transcription
    }
  case .denied:
    print("Speech recognition authorization denied")
  case .restricted:
    print("Not available on this device")
  case .notDetermined:
    print("Not determined")
  }
}
```

Chúng ta sẽ gọi `SFSpeechRecognizer` với kiểu method `requestAuthorization(_:)` để prompt lên màn hình của sổ authorization cho người dùng. Bên trong closure, hãy nhìn vào `authStatus` và các error messages được in ra. Nếu được `authorized` , chúng ta sẽ unwarp bản audio đã được chọn để phiên dịch sau đó. Tiếp đó, chúng ta phải thêm nội dung cho phần hiển thị cho người dùng. Mở file info.plist và thêm vào key `Privacy - Speech Recognition Usage Description` dòng sau `I want to write down everything you say`:

![](https://images.viblo.asia/ddf35f19-5cc9-4ff6-9c33-704e0ac77aef.png)

Build và chạy thử, chọn một track từ màn hình chính và chọn Transcribe. Bạn sẽ thấy cửa sổ xin cấp quyền hiện lên, chọn OK để tiếp tục.

![](https://images.viblo.asia/0d964b2e-68d1-4271-94b6-26345c561a98.png)

Quay lại ** RecordingViewController.swift**, tìm extension `RecordingViewController` ở cuối file, thêm vào method dưới đây để phiên dịch file được truyền vào từ url:

```
fileprivate func transcribeFile(url: URL) {

  // 1
  guard let recognizer = SFSpeechRecognizer() else {
    print("Speech recognition not available for specified locale")
    return
  }
  
  if !recognizer.isAvailable {
    print("Speech recognition not currently available")
    return
  }
  
  // 2
  updateUIForTranscriptionInProgress()
  let request = SFSpeechURLRecognitionRequest(url: url)
  
  // 3
  recognizer.recognitionTask(with: request) {
    [unowned self] (result, error) in
    guard let result = result else {
      print("There was an error transcribing that file")
      return
    }
    
    // 4
    if result.isFinal {
      self.updateUIWithCompletedTranscription(
        result.bestTranscription.formattedString)
    }
  }
}
```

Chi tiết cách mà file track sẽ được thông dịch:
1. `SFSpeechRecognizer` initializer có sẵn dẽ cung cấp một recognizer cho thiết bị và sẽ trả về `nil` nếu như ko có recognizer nào. `isAvailable` sẽ kiểm tra khi `recognizer` đã sẵn sàng.
2. `updateUIForTranscriptionInProgress()` được sử dụng để disable nút Transcribe  và bắt đầu hoạt ảnh của indicator khi đang tiến hành thông dịch. Một `SFSpeechURLRecognitionRequest` sẽ được khởi tạo cho file được truyền vào từ `url`.
3. `recognitionTask(with:resultHandler:)`  thực thi việc phiên dịch `request`. 
4. Biến `isFinal` sẽ mang giá trị true khi việc phiên dịch đã hoàn thành. `updateUIWithCompletedTranscription(_:)` sẽ ngừng hình ảnh của indicator, enable lại nút Transcribe và hiện thị kết quả phiên dịch trên textview.

Bây giờ chúng ta phải gọi phần code này khi người dùng tap vào nút Transcribe. Trong `handleTranscribeButtonTapped(_:)` hãy thay `//TODO: Kick off the transcription` với dòng sau: `self.transcribeFile(url: recording.audio)`. Sau khi authorization thành công, sau khi nút được tap sẽ gọi `transcribeFile(url:)` cùng với url của file được chọn. Hãy build và chạy thử và chọn **Gangsta’s Paradise**, sau đó tap vào nút Transcribe, bạn sẽ thấy indicator xuất hiện một vài giây và sau đó trên text view sẽ xuất hiện phần được thông dịch.

![](https://images.viblo.asia/53754001-e117-418b-a260-e356e6f36732.png)


Trên đây là phần hướng dẫn cơ bản khi sử dụng Speech Recognition trên nền tảng iOS, cảm ơn các bạn đã quan tâm.

References:
https://developer.apple.com/documentation/speech/sfspeechrecognizer
https://www.raywenderlich.com/573-speech-recognition-tutorial-for-ios
https://www.appcoda.com/siri-speech-framework/
https://medium.com/ios-os-x-development/speech-recognition-with-swift-in-ios-10-50d5f4e59c48