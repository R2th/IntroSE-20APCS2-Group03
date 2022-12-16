# Đặt vấn đề

> Tôi muốn ứng dụng của tôi có chức năng quay màn hình ứng dụng để chia sẻ mà không dính mấy thứ tạp nhạp khác như push notification từ ứng dụng khác ... 

Tức nhiên là tôi biết iPhone có hỗ trợ quay màn hình điện thoại rồi, nhưng làm sao tôi loại được Push Notification, tin nhắn ... Tức nhiên bạn có thể vào phần Settings để Off hết các chứ năng đó ...

Vậy tại sao, tôi không làm hẳn chức năng quay màn hình app ở trên ứng dụng mình?

Sau thời gian tìm hiểu ngắn, thì cũng dễ dàng đấy, không khó khăn. iOS đã hỗ trợ vấn đề này. Sau đây tôi sẽ làm một ứng dụng demo nhỏ nhỏ nhé. :)

# ReplayKit
> Using the ReplayKit framework, users can record video from the screen, and audio from the app and microphone. They can then share their recordings with other users through email, messages, and social media. You can build app extensions for live broadcasting your content to sharing services. ReplayKit is incompatible with AVPlayer content.

Với ReplayKit này thật sự dễ dàng để thực hiện việc record lại App và lưu vào Photos mà không dính đến push notification ...

# AppDemo
Đầu tiên bạn có thể tự tạo 1 sample app nhé.

## Để bắt đầu Record 
Để Record, App sẽ hỏi quyền người dùng, vì vậy người dùng có thể từ chối chức năng của bạn nhé.

```swift
func startRecording() {
    RPScreenRecorder.shared().startRecording { [unowned self] (error) in
        if let unwrappedError = error {
            print(unwrappedError.localizedDescription)
        }
        // Làm điều gì bạn muốn sau khi bạn đã đồng ý để record
    }
}
```

## Để kết thúc Record
```swift
func stopRecording() {
    RPScreenRecorder.shared().stopRecording { [unowned self] (preview, error) in
        if let unwrappedPreview = preview {
            unwrappedPreview.previewControllerDelegate = self
            self.present(unwrappedPreview, animated: true, completion: nil)
        }
    }
}
```

Tuy nhiên sau khi record mà cần present lên một màn hình.
```swift
extension <View Controller>: RPPreviewViewControllerDelegate {
    func previewControllerDidFinish(_ previewController: RPPreviewViewController) {
        dismiss(animated: true)
    }
}
```

# Một số hình ảnh
Xin cấp quyền
![](https://images.viblo.asia/f81a52cd-e587-4837-ab87-9b56dfe76162.PNG)

Sau khi stop recording
![](https://images.viblo.asia/d5b1cc26-ddb8-4b1a-b963-449b2a5a77d9.PNG)

Ngoài ra các nhiều điều khác nữa như custom video / audio của ouput...

Nguồn:
https://medium.com/flawless-app-stories/wyler-screen-recording-made-easy-on-ios-b6451511a715