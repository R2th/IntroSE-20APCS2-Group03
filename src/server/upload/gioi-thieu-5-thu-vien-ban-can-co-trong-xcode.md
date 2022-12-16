Nguồn bài viết: https://medium.com/better-programming/5-xcode-extensions-you-must-have-46fb1fd39e7a
Sử dụng tốt phần mở rộng Xcode có thể giúp bạn làm việc hiệu quả hơn
![](https://images.viblo.asia/759a8a83-7431-4c11-9b0e-42ea0ec315a6.jpeg)

Trong khi khả năng mở rộng của Xcode vẫn đang được phát triển qua các năm, nhưng nó vẫn chưa thoả mãn nhu cầu của chúng ta. Hôm nay chúng ta sẽ tìm hiểu 1 số tiện ích mở rộng tuyệt vời Xcode mà bạn có thể tận dụng chúng. Giúp cho công việc của chúng ta hiệu quả và năng suất hơn khi phát triển ứng dụng iOS trong môi trường Xcode.

## Swimat
Nhanh chóng định dạng 1 khối code lộn xộn là 1 trong những nhu cầu phổ biến với các nhà phát triển.
`Swimat`là phần mở rộng Xcode cho việc định doạng code Swift của bạn. Nó hỗ trợ cho phiên bản mới nhất Xcode 11. Re-Indent trong Xcode hoạt động tương tự `Swiftmat` nhưng `Swiftmat` hoạt động thuận tiện hơn nhiều bởi nó không cần quan tâm tới việc lựa chọn mã code.

Để tải và sử dụng tiện ích này, bạn có thể download file ziep từ [GitHub repo](https://github.com/Jintin/Swimat/) và kích hoạt chúng ở phần Extensions trong System Preferences.![](https://images.viblo.asia/ef1082ee-f481-4ec6-a9c6-f0a9c23746b8.png)

Sau khi cái đặt, để định dạng tệp đang sử dụng, chọn Editor -> Swiftmat -> Format ở phần menu Xcode

![](https://images.viblo.asia/474c0c68-1881-4902-9981-7751210d4e14.gif)

## TrikerX
Được giới thiệu trong Swift4, `Codable` hỗ trợ việc mã hoá và giải mã dữ liệu. Các khoá tuần tự có thể sử dụng quy ước đặt tên phức tạp. Chúng ta phải tuỳ chỉnh các key mà `Codable`sử dụng khi mã hoá hoặc giải mã.

Đây là tiện ích Xcode tên là `TrikerX` có thể tạo tự động CodingKeys để tiết kiệm công sức và hạn chế việc xảy ra lỗi 

Để tạo CodingKeys, chọn Editer -> Codable -> Make Coding Key ở menu Xcode

![](https://images.viblo.asia/82f8e130-02be-4c51-8802-706ba6dc77d5.png)

trên hết, `TrikerX` cũng hỗ trợ định nghĩa các key tuỳ chọn như hướng dẫn: 
``` swift

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

## AccessControlKitty
Việc xác định phạm vi của đoạn code là rất quan trọng khi phát triển 1 package Swift. Thêm thủ công phạm vi public hay private hàng trăm thuộc tính/ biến sẽ tốn nhiều công sức và thời gian. Có điều gí giúp ta làm điều đó? Đó là `AccessControlKitty` ! `AccessControlKitty` có sẵn trong [Mac App Store](https://apps.apple.com/us/app/accesscontrolkitty/id1450391666?mt=12) và [repo Github của nó](https://github.com/zoejessica/accesscontrolkitty). Nó có thể dễ dàng thay đổi quyền truy cập của mã để thay đổi giữa public, private, fileprivate, internal hoặc truy cập không định danh
![](https://images.viblo.asia/232d8e9e-f63d-4837-9a4a-10e2ea63571c.png)
![](https://images.viblo.asia/fd3c8765-9d39-4ec5-abf0-c7a85026273b.png)
![](https://images.viblo.asia/99d1f4b4-f551-4263-803d-0a740c3e182f.png)

## SwitchIt
Việc thực hiện thủ công tất cả các câu lệnh enum switch cũng dễ xảy ra lỗi và tốn thời gian. SwitchIt giúp bạn dễ dàng hơn nhiều.
Cài đặt nó từ [Mac App Store](https://apps.apple.com/ie/app/switchit/id1244401606?mt=12) hoặc [repo GitHub](https://github.com/HarmVanRisk/SwitchIt), sau đó nhấp vào Editor -> SwitchIt -> Create Switch trong menu Xcode. Nó sẽ tự động tạo các câu lệnh chuyển đổi của các trường hợp enum đã chọn.

## Nef
Cuối cùng nhưng không kém phần quan trọng, Nef làm cho các đoạn mã của bạn đẹp hơn nhiều khi chia sẻ chúng với người khác hoặc nhúng chúng vào đoạn mã của bạn.
Bạn có thể cài đặt tiện ích mở rộng từ [Mac App Store](https://apps.apple.com/app/nef/id1479391704?mt=8) hoặc [repo GitHub](https://github.com/bow-swift/nef-plugin). Sau khi bật nó trong System Preferences, bạn có thể chọn mã được chia sẻ và nhấp vào Editor -> nef -> Code selection -> Hình ảnh trong menu Xcode để tạo các đoạn mã dưới dạng ảnh PNG.![](https://images.viblo.asia/1cca15dc-2d5b-4a49-9e2b-47ba0ce02a8d.png)

Màu nền mặc định của hình ảnh là màu tím, nhưng bạn có thể chọn bất kỳ màu nào bạn thích bằng cách nhấp vào Editor-> nef -> Code selection -> Preferences.
![](https://images.viblo.asia/24c065b0-a540-4c87-9d80-ad1cd88556f9.png)

Màu nền trắng với một chút bóng làm cho các đoạn mã trông nổi bật:
![](https://images.viblo.asia/17c69165-ab31-4017-a731-86ed40a0f554.png)

Nef cũng có thể tạo Playground Book từ gói Swift của bạn hoặc tạo tệp đánh dấu từ Playground. Tất cả đang chờ bạn khám phá.