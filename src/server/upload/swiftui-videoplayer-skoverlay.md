## Điều kiện tiên quyết
Để làm theo hướng dẫn này, bạn sẽ cần:

* Cơ bản với Swift.
* Xcode 12 trở lên.
* Chỉ hỗ trợ iOS 14 trở lên

## Bắt đầu với VideoPlayer

Để bắt đầu, trước tiên bạn import module cần thiết.

```
import AVKit
```

Để minh họa, tôi sẽ tải xuống video Nyan Cat từ YouTube.
Nếu bạn tò mò video là gì, bạn có thể xem video.

Sau đó, kéo video vào project trong xcode như ảnh. 
Đảm bảo bạn phải chọn target project, nếu không ứng dụng sẽ gặp một số vấn đề.

![](https://images.viblo.asia/919152ff-4c93-4856-bfa0-963e23f7abb1.png)

**Kiểm tra nó trên thiết bị thật. Simulator sẽ không hoạt động.**

Sử dụng mã bên dưới, bây giờ bạn đã tạo một VideoPlayer trong SwiftUI.

```
VideoPlayer(player: AVPlayer(url: Bundle.main.url(forResource: "nyan", withExtension: "mp4")!))
```

Và bạn có thể kiểm tra kết quả, tua đi và tua lại 15 giây, kéo thanh và chuyển sang chế độ toàn màn hình.

[Hình ảnh](https://daddycoding.com/wp-content/uploads/2020/09/nyan-1.gif)
(Bấm vào để xem kết quả vì viblo không chèn được ảnh gif)

Ngoài việc sử dụng các tệp cục bộ, bạn có thể chọn một URL. Lưu ý rằng liên kết YouTube sẽ không hoạt động.

Bạn có thể sử dụng tệp m3u8 với một ví dụ đã thấy trên web và cách triển khai như sau. Đảm bảo rằng tệp tồn tại khi sử dụng. Đây không phải là một phương pháp hay.

```
VideoPlayer(player: AVPlayer(url: URL(string: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8")!))
```

Một điều thú vị mà bạn chắc chắn có thể làm trên video của mình là thêm lớp overlay! Điều này chủ yếu được sử dụng để thêm logo của bạn.

Ở đây bạn sẽ thêm logo riêng của mình và nó xuất hiện ở phía dưới bên phải.

```
VideoPlayer(player: AVPlayer(url: Bundle.main.url(forResource: "nyan", withExtension: "mp4")!)) {
    VStack {
        Image("logo")
            .resizable()
            .scaledToFit()
            .frame(height: 50)
    }.frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomTrailing)
}
```

![](https://images.viblo.asia/3b2d59ed-f326-49d9-9115-717162cd14e9.png)

Với một chút tinh chỉnh, bạn có thể di chuyển logo của mình lên trên cùng bên trái bằng cách sử dụng `topLeading`.

```
frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
```

![](https://images.viblo.asia/7ad9965c-1c0e-4e2f-ac0f-9806ad033f4b.png)

## SKOverlay

Để bắt đầu, bạn sẽ cần import framework cần thiết.

```
import StoreKit
```

Sau đó, tạo một `State` để giữ giá trị `bool`.

```
@State private var showRecommended = false
```

Tiếp theo, chèn một `Button` mà khi nhấp vào sẽ hiển thị `SKOverlay`.

```
Button("Show Recommended App") {
    self.showRecommended.toggle()
}.appStoreOverlay(isPresented: $showRecommended) {
    let config = SKOverlay.AppConfiguration(appIdentifier: "1504421248", position: .bottom)
    
    return config
}
```

**Để kiểm tra, bạn sẽ cần chạy nó trên thiết bị thực của mình chứ không phải simulator**. Đảm bảo thiết bị thực iOS 14 trở lên.

Hãy tìm hiểu cách truy xuất `appIdentifier`. 

Tiếp theo, bạn chỉ trích xuất số mà trong trường hợp này là **1504421248** và thêm vào tham số như được hiển thị trong đoạn mã trên.
Ví dụ: https://apps.apple.com/my/app/malaysia-law-101/id1504421248

Hiện tại, vị trí khả dụng chỉ có `.bottom` và `.bottomRaised`. Hãy xem sự khác biệt là gì.

Đối với `.bottom`:

![](https://images.viblo.asia/f9fc3ec5-8ed2-4891-bcfe-a147f4741dd9.gif)

Đối với `.bottomRaised`:

![](https://images.viblo.asia/98b7c960-d54b-47fe-99d1-88f7d7c6547a.gif)

Cảm ơn bạn đã theo dõi hết bài viết!