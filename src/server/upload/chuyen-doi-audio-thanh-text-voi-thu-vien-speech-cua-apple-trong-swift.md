Từ năm 2016, thư viện Speech chính thức được Apple giới thiệu với cộng đồng developer.
Trước đó, một số chức năng nhận dạng giọng nói đã có sẵn. Người dùng thường được hỗ trợ đọc chính tả bằng bàn phím hoặc Siri. Nhưng nhờ API mới này, khả năng tích hợp nhận dạng giọng nói theo cách sáng tạo trong ứng dụng của bạn đã tăng lên rất nhiều.
Hôm nay tôi sẽ hướng dẫn các bạn implement tool này vào dự án của mình.

Đầu tiên, `import Speech` để sử dụng được library này.
Thứ hai, yêu cầu quyền sao chép âm thanh:

```swift
func requestTranscribePermissions() {
    SFSpeechRecognizer.requestAuthorization { [unowned self] authStatus in
        DispatchQueue.main.async {
            if authStatus == .authorized {
                print("Good to go!")
            } else {
                print("Transcription permission was declined.")
            }
        }
    }
}
```

Thứ ba, thêm một khóa vào Info.plist của bạn có tên là NSSpeechRecognitionUsageDescription, sau đó cung cấp cho nó đoạn mô tả những gì bạn định làm với các bản ghi.
Cuối cùng, viết function để thực hiện phiên âm trên một URL âm thanh. URL này phải là bản ghi bạn đã tạo, được lưu trữ cục bộ trên thiết bị:

```swift
func transcribeAudio(url: URL) {
    // create a new recognizer and point it at our audio
    let recognizer = SFSpeechRecognizer()
    let request = SFSpeechURLRecognitionRequest(url: url)

    // start recognition!
    recognizer?.recognitionTask(with: request) { [unowned self] (result, error) in
        // abort if we didn't get any transcription back
        guard let result = result else {
            print("There was an error: \(error!)")
            return
        }

        // if we got the final transcription back, print it
        if result.isFinal {
            // pull out the best transcription...
            print(result.bestTranscription.formattedString)
        }
    }
}
```

Chúc bạn implement thành công vào dự án của mình!