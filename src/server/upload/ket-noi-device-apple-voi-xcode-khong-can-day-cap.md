Là một lập trình viên iOS thì chắc chắn nhiều lúc bạn sẽ khó chịu với mớ dây lộn xộn khi bạn cấm thiết bị iOS vào máy để debug các thứ, bao gồm 1 đống thiết bị: iPhone, iPad, iPod, Apple TV và Apple Watch. Thế thì làm thế nào để tối giản nó hơn, Apple đã giới thiệu cho chúng ta 1 tính năng mới khá hay về kết nối không cần dây với Xcode vào 2017.

Sẽ có những ưu và khuyết trong việc sử dụng kết nối không dây để debug. Ở bài viết này chúng ta sẽ đào sâu về vấn đề này nhé.

### Requirements: (Yêu cầu)
1. Xcode 9.0 hoặc ver mới hơn để chạy trên từ macOS 10.12.4 trở lên
1. Passcode (Password / Touch ID/ Face ID)  cần được confirm khi kết nối device

### Procedures: (Thủ tục) 
Bước 1: Kết nối i-Devices với máy Mac và nhấn nút `Trust`

![](https://images.viblo.asia/2b6e7b5d-6f63-45c6-83ec-63a32ff6d700.png)

Bước 2: Vào mục “Devices and Simulators” (Command + Shift + 2) trong Xcode và i-Device phải được thấy trong list ở bên trái mới đúng nhé

Bước 3: Stick vào checkbox "Connect via network"

![](https://images.viblo.asia/0a76aa11-4b1d-4ffc-b65a-4f7a404b4721.png)

Hãy nhớ chắc chắn là bạn đã setup passcode (Passcode / Touch ID / Face ID) trên i-Devices không thì sẽ xuất hiện dialog này đấy !

![](https://images.viblo.asia/e5641895-820b-4a0c-835c-d421ed961c98.png)

Để setup password, bạn có thể vào Settings > Face ID & Passcode session ở iPhoneX hoặc các devices mới hơn.

![](https://images.viblo.asia/d557bc4d-1674-4032-b00b-e83b3c14731c.png)

Bước 5: Rút dây ra khỏi i-Device và kết nối cùng chung 1 network với con Mac bạn đang dùng. Sau 1 hồi loading, bạn sẽ thấy icon “Network” được đặt cạnh tên của điện thoại của bạn và giờ thì có thể deploy app mà méo cần dây rồi đấy.


-----

Thế thì ưu và nhược của chúng là gì ? Cùng xem nhé: 

### Ưu:

1.  Có thể kết nối nhiều devices (> 2): Số lượng devices được connect sẽ bị giới hạn với số port cắm trên Mac của bạn. Lấy con 13" Macbook Pro 2015 là 1 ví dụ, nó chỉ có 3 cổng usb. Với kết nối không dây, bạn sẽ không bị giới hạn bởi vấn đề này :D quá tuyệt.
![](https://images.viblo.asia/66c2e30e-dbd7-4aa6-a504-09228a39b96c.png)

2. Không cần phải mua thêm đầu đổi từ USB-C sang lighting adapter
Developer sẽ không cần phải mua thêm cộng USB-C to Lightning cable để cho phép iPhone kết nối với MacBook Pro (2017 hoặc mới hơn). Theo như thông tin từ apple store, mỗi cộng dây này tới USD $19 [(Apple store: USB-C to lightning cable)](https://www.apple.com/shop/product/MKQ42AM/A/usb-c-to-lightning-cable-2-m?rdt=redirectionFromProductPage) nếu như bạn muốn mua hàng "hịn" ! (Đây có vẻ là một thiết kế tồi tệ tới từ Apple! iPhone dòng mới nhất méo thể kết nối với dòng mới nhất của MacBook mà phải mua thêm dây! 😫)

### Khuyết:
1. Thời gian load lâu hơn: 

Data được chuyển từ network sẽ lâu hơn so với thông qua cáp. Sau khi testing với 1 dự án mới và 1 dự án tầm trung. Sự khác biệt về thời gian build là rất lớn và nó khá phụ thuộc vào độ bự của con dự á. Xem kết quả dưới đây nhé:

Project rỗng với 2.5 MB .ipa file (Time difference: 5s)
![](https://images.viblo.asia/4dc62b01-a298-4840-987e-01ec08faee55.png)

Project tầm trung với 12.9 MB .ipa file (Time difference: 9s)
![](https://images.viblo.asia/b6ea4685-2d81-42d0-a5b3-c79b2ac7c954.png)

2. Auto lock nên được tắt

Kết nối không dây với iPhone sẽ bị tắt nếu như thiết bị auto-locked. Mặc định tự động khoá là 30s. Tuy nhiên, việc kết nối lại sau khi mở lại device sẽ tốn thêm thời gian và chiếm của chúng ta khoảng 10s. Điều này khá là phiền toái đối với các dev nếu như đang trong tình trạng deadline tới đít. 

Apple đã khuyên các developer nên off tính năng này đi bằng cách:
```
Settings > Display & Brightness > Auto-Lock > Never
```
Tuy nhiên, điều này lại gây ra một vài ảnh hưởng cho device về lâu dài và vấn đề về bảo mật khi mà devices vẫn còn trong tình trạng chưa khoá mà người khác cầm để sử dụng.


-----

### Kết luận

Wireless connection là một tính năng khá ấn tượng với các developers  đang dùng MacBook mà không cấm usb port, làm việc với các con dự án nhỏ và cần luân chuyển thay đổi liên tục các devices để test. Tuy nhiên, chúng ta lại phải xem xét tới việc là nó gây tốn thêm thời gian để kết nối lại và thời gian build sẽ lâu hơn. Nó còn có thể gây ra vấn đề về tuổi thọ màn hình và bảo mật nếu bạn không để ý.

Không giải pháp nào là tối ưu cả. Chúng ta chỉ có thể chọn lựa để xem giải pháp nào thấy tối ưu nhất cho mình. :D chúc các bạn vui.


-----
Bài dịch của mình tới đây là hết :D cám ơn các bạn đã theo dõi.
Link bài dịch của mình: [Xcode wireless debug tools
](https://itnext.io/apple-ios-xcode-wireless-debug-tools-ced6688dd1b7)

Các bạn có thể đọc thêm các bài ở dưới đây do tác giả đưa để hiểu thêm:
* [Troubleshoot a wireless device (iOS, tvOS) ](https://help.apple.com/xcode/mac/current/#/devac3261a70)
* [Pair a wireless device (iOS / tvOS) with Xcode (iOS, tvOS) — Xcode Help](https://help.apple.com/xcode/mac/current/#/devbc48d1bad)
* [Run an app on a wireless device (iOS, tvOS, watchOS)](https://help.apple.com/xcode/mac/current/#/dev3e2f4ee6d)

Tạm biệt các bác :D mong là sẽ lại gặp các bác một ngày không xaaaaaaaaaaaaaaaaaaaaaaaaaaaa. Cám ơn vì đã theo dõi bài dịch của mình từ lúc mình bắt đầu tới bây giờ nhé :D