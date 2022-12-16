Dark Mode vừa được giới thiệu cùng với iOS 13, cho phép người dùng có thể kích hoạt một chế độ hiển thị với nền đen chữ xám (trắng), giúp giảm cảm giác mỏi mắt khi sử dụng trong điều kiện thiếu sáng và giúp tiết kiệm điện hơn đối với các thiết bị màn hình AMOLED. 

Trước đây ở iOS 11, 12 Apple đã giới thiệu một tính nắng được coi là tiền thân của Darkmode đó là Smart Invert Colors. Tuy nhiên tính năng này đôi khi hoạt động chưa chính xác và một số hình ảnh vẫn bị đảo ngược màu một cách không mong muốn.

Darkmode trên iOS 13 là một phiên bản nâng cấp tốt hơn của tính năng Smart Invert Colors, người dùng ngoài ra còn có thể đặt lịch để tự động chuyển sang Darkmode vào khung giờ nhất định. Đối với người dùng thì mọi thứ đơn giản chỉ có vậy, nhưng đối với nhà phát triển, chúng ta cần phải trải qua một vài bước để ứng dụng của mình có thể hiển thị một cách ngon nghẻ.

## Hỗ trợ Darkmode

Để ứng dụng có thể hỗ trợ Darkmode, chúng ta cần phải thực hiện các thay đổi cho từng màn hình. Và một điều kiện nữa đó là ứng dụng cần được build trên Xcode 11 trở đi.

Có hai vấn đề cần quan tâm để giúp ứng dụng của bạn hiển thị đẹp đẽ trên Darkmode đó là màu sắc và hình ảnh trong ứng dụng.

## Chỉnh sửa màu sắc

System color được Darkmode trên iOS hỗ trợ tự động, có nghĩa là nếu chúng ta đã để màu chữ là màu đen, thì khi Darkmode được bật, màu chữ sẽ được tự động chuyển sang màu trắng. 

Nhưng nếu đang sử dụng một màu sắc tùy chỉnh thì điều đó tương đương với việc ta phải cài đặt màu một cách thủ công.

Từ iOS 11 trở đi, việc quản lý màu đã dễ dàng hơn khi chúng ta có thể tự tạo một thư viện màu trong file Assets.xcassets. Tuy nhiên nếu chọn hình thức này thì ứng dụng của bạn chỉ có thể hỗ trợ từ iOS 11 trở đi.

Cách thực hiện là trong file *Assets.xcassets*, chọn một màu mà bạn muốn thay đổi mỗi khi trạng thái Darkmode được bật/tắt, sau đó trong phần thuộc tính ***Appearance*** ta chọn ***Any, Dark***. Bây giờ thì chúng ta đã có thể tùy chỉnh màu ở hai trạng thái Darkmode và non Darkmode.

![](https://images.viblo.asia/7d1e8f68-80bc-493c-8989-654e2693d082.gif)

## Chỉnh sửa hình ảnh

Ở chế độ Darkmode, background của app sẽ có màu đen, vì vậy một số hình ảnh cũng cần được thay đổi để hiển thị một cách đẹp đẽ hơn. Việc tùy chỉnh hình ảnh cũng hoàn toàn tương tự với việc tùy chỉnh màu sắc đã được nêu ở bước trước. 

Chúng ta cũng cần đưa hình ảnh vào *Assets.xcassets*, sau đó trong phần thuộc tính ***Appearance*** ta chọn ***Any, Dark***.

Đối với icon cho button, có một cách khác chúng ta có thể sử dụng mà không cần phải cài đặt 2 icon cho mỗi trạng thái, đó là thay đổi tintColor cho button, image view. Để làm được điều này image cần được đặt trong *Assets.xcassets* và thuộc tính "*Render as*" cần được set thành *Template image*.

## Kiểm tra Darkmode bằng code

Chúng ta có thể dùng thuộc tính sau để kiểm tra xem thiết bị có đang được enable Darkmode hay không:

```
traitCollection.userInterfaceStyle
```

Thuộc tính trên là một enum có tên UIUserInterfaceStyle, ta có thể set cho chúng các giá trị là  *light*, *dark* hoặc *unspecified*. Dựa vào thuộc tính này chúng ta có thể dễ dàng xác định xem ứng dụng sẽ được hiển thị ở dạng nào.

Vì tính năng Darkmode của iOS có cả tính năng đặt lịch, nên trong ứng dụng chúng ta cần biết khi nào ứng dụng của chúng ta sẽ hiển thị ở dạng thông thường, còn khi nào thì hiển thị ở dạng Darkmode.

Chúng ta có thể sử dụng phương thức sau để biết khi nào thì thiết bị được chuyển sang darkmode:

```
override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
    super.traitCollectionDidChange(previousTraitCollection)

    let hasUserInterfaceStyleChanged = previousTraitCollection.hasDifferentColorAppearance(comparedTo: traitCollection) // Bool
    // Update your user interface based on the appearance
}
```

## Vô hiệu hóa Darkmode

Mặc định thì tất cả các ứng dụng được build bằng Xcode 11 sẽ được enable Darkmode một cách tự động. Hiện tại việc hỗ trợ Darkmode chưa được Apple bắt buộc phải triển khai trên ứng dụng, tuy nhiên trong tương lai gần, rất có thể tất cả các ứng dụng có mặt trên Store đều được yêu cầu phải hỗ trợ Darkmode.

Nếu ứng dụng của bạn chưa sẵn sàng cho việc hỗ trợ Darkmode, nhưng bạn lại đang phát triển ứng dụng trên Xcode 11, việc cần làm đó là vô hiệu hóa tính năng này trong ứng dụng. Để làm được điều đó, chúng ta chỉ cần set thuộc tính *UIUserInterfaceStyle* sang *light* trong file *Info.plist*.

## Testing

Sau khi hoàn tất bước triển khai Darkmode cho ứng dụng, một việc quan trọng mà chúng ta cần thực hiện đó là kiểm thử lại xem nó hoạt động có chính xác hay không.
Trên Xcode 11 vừa giới thiệu một tính năng mới có tên *Environment Overrides* ngoài việc giúp thay đổi các setting mặc định của simulator như font size, các tùy chọn của accessibility thì chúng ta còn có thể dễ dàng switch giữa hai mode là Dark và Light.

Tính năng *Environment Overrides* có thể được nhìn thấy khi chúng ta chạy app bằng Xcode, tùy chọn này nằm trong khung Debug menu như hình sau:

![](https://images.viblo.asia/35f87c37-7bef-40f6-b82e-e92aa0a0dfed.png)

## Tổng kết

Để triển khai tính năng hỗ trợ Darkmode cho ứng dụng có thể tốn thêm một chút effort để update màu, assets,.. trong ứng dụng, nhưng hiệu quả mà nó đem lại là không thể chối cãi khi Darkmode đã và đang là xu thế của tất cả các ứng dụng hiện nay. 

Hãy update ứng dụng của bạn ngay hôm nay nào!