Đây là bài dịch từ trang [medium.com](https://medium.com), mời các bạn xem bài gốc tại đây: https://medium.com/better-programming/5-xcode-extensions-you-must-have-46fb1fd39e7a

Sử dụng đúng Xcode Extension sẽ giúp bạn làm việc hiệu quả hơn.

![](https://images.viblo.asia/096eb731-3a6e-498e-b1d4-955c1949f00a.jpeg)

Mặc dù khả năng sử dụng của Xcode liên tục được cải thiện trong những năm qua, nhưng vẫn còn nhiều vấn đề chưa được thỏa mãn. 
Hôm nay, chúng ta sẽ cùng khám phá một số tiện ích mở rộng Xcode tuyệt vời mà bạn có thể tận dụng. 
Chúng có thể giúp bạn làm việc hiệu quả hơn khi phát triển các ứng dụng iOS sử dụng Xcode.
### Swimat
Định dạng một đoạn mã lộn xộn một cách nhanh chóng, có thể là nhu cầu phổ biến nhất đối với nhiều nhà phát triển.
`Swimat` là một phần mở rộng Xcode để định dạng mã Swift cho bạn. Nó có hỗ trợ **Xcode 11** mới nhất. 
`Swimat` giống với chức năng **Re-Indent** trên XCode, nhưng Swimat có nhiều tiện lợi hơn bởi vì nó không cần phải bôi đen mã trước khi dùng.
Để cài và kích hoạt tiện ích này, chúng ta cần tải về một file nén zip từ [Github](https://github.com/Jintin/Swimat/) và sau đó kích hoạt **Extension** trong **System Preferences**.

![](https://images.viblo.asia/07a2b4c5-540a-4341-baba-dbc3802b4299.png)

Sau khi cài đặt, để định dạng tệp hiện đang hoạt động, nhấp chuột **Editor -> Swimat -> Format** trên menu của XCode.

![](https://images.viblo.asia/27eb426d-82fa-42e8-8572-3940d77edee8.gif)

https://github.com/Jintin/Swimat
### TrikerX
Được giới thiệu trong Swift 4, `Codable` thì nhu cầu tạo ra mã để mã hóa và giải mã dữ liệu đã tăng lên rất nhiều. Các khóa tuần tự hóa có thể sử dụng quy ước đặt tên hơi khác so với quy ước. Chúng ta sẽ phải tùy chỉnh các khóa mà `Codable` sẽ sử dụng khi giải mã hoặc mã hóa.
Có một phần mở rộng Xcode tên là `TrikerX` có thể tạo `CodingKeys` tự động để tiết kiệm cho chúng ta rất nhiều thao tác mà có thể dễ xảy ra lỗi.
Để tạo `CodingKeys`, hãy nhấp vào **Editor -> Codable -> Make Coding Key** trong menu Xcode.

![](https://images.viblo.asia/51c69663-6fe0-4dbb-82b3-a9cfd860ef56.gif)

Trên hết, `TrickerX` cũng hỗ trợ xác định khóa tùy chỉnh sử dụng **comment**:
```
struct Demo: Codable {
  let myKeyHere: String //my_key_here
}

// Result
struct Demo: Codable {
  let myKeyHere: String
  
  enum CodingKeys: String, Codable {
    case myKeyHere = "my_key_here"
  }
}
```
https://github.com/wleii/TrickerX
### AccessControlKitty
Việc chỉ định cấp độ truy cập của mã là rất quan trọng khi phát triển một package với Swift. 
Việc thêm thủ công `public` và `private` vào hàng trăm thuộc tính sẽ tốn nhiều thời gian.
Tại sao bạn không thử sử dụng `AccessControlKitty`?
AccessControlKitty có sẵn trong [kho ứng dụng Mac](https://apps.apple.com/us/app/accesscontrolkitty/id1450391666?mt=12) và [GitHub](https://github.com/zoejessica/accesscontrolkitty).
Nó có thể dễ dàng thay đổi cấp độ truy cập của mã đã chọn để chuyển đổi giữa `public`, `private`, `fileprivate`, `internal`.
Dưới đây là ví dụ cách chúng ta thêm `public` vào struct và các thuộc tính của nó:

![](https://images.viblo.asia/e6f23c3b-96a2-45f3-bbbe-5a37bbfd47ff.gif)

https://github.com/zoejessica/accesscontrolkitty
### SwitchIt
Việc thực hiện thủ công tất cả các câu lệnh `switch` của một`enum` dễ xảy ra lỗi và tốn thời gian. `SwitchIt`sẽ giúp việc này dễ dàng hơn cho bạn.
Cài đặt nó từ [kho ứng dụng Mac](https://apps.apple.com/ie/app/switchit/id1244401606?mt=12) hoặc [Github](https://github.com/HarmVanRisk/SwitchIt), sau đó nhấp chuột vào **Editor -> SwitchIt -> Create Switch** trong menu Xcode. 
Nó sẽ tự động tạo các câu lệnh chuyển đổi của các trường hợp enum đã chọn cho bạn.

![](https://images.viblo.asia/a7efb9b7-c3d6-40d4-8bf9-f85c1c18c9ae.gif)

https://github.com/HarmVanRisk/SwitchIt
### Nef
Cuối cùng nhưng không kém phần quan trọng, `Nef` làm cho các đoạn mã của bạn đẹp hơn nhiều khi chia sẻ chúng với ai đó hoặc nhúng chúng vào bài viết của bạn.
Bạn có thể cài đặt tiện ích mở rộng từ [Mac App Store](https://apps.apple.com/app/nef/id1479391704?mt=8) hoặc từ [GitHub](https://github.com/bow-swift/nef-plugin).
Sau khi kích hoạt nó trong **System Preferences**, bạn có thể chọn mã được chia sẻ và nhấp vào **Editor -> nef -> Code selection -> Image** trong menu Xcode để tạo các đoạn mã dưới dạng ảnh PNG.

![](https://images.viblo.asia/41cc28cc-528d-44da-9b57-9ed2ed2c42da.gif)

Màu nền mặc định của hình ảnh là màu tím, nhưng bạn có thể chọn bất kỳ màu nào bạn thích bằng cách nhấp vào **Editor -> nef -> Code selection -> Preferences.**

![](https://images.viblo.asia/f340ebb8-fde8-4f07-aef5-cdd7bdc1ce29.png)

Màu nền trắng với một chút bóng làm cho các đoạn mã trông nổi bật hơn.

![](https://images.viblo.asia/70522261-3f16-4579-b9f9-818b25a40f04.png)

`Nef` cũng có thể tạo Playground Book từ gói Swift của bạn hoặc tạo tệp đánh dấu từ Playground. Tất cả đang chờ bạn khám phá.

https://github.com/bow-swift/nef-plugin