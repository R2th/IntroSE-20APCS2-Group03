### Introduction

Có thể nói quảng cáo trên mobile là xu thế, nếu trước kia chúng ta thường thấy quảng cáo xuất hiện trên banner của các trang web thì bây giờ, khi số lượng người sử dụng mobile bùng nổ thì quảng cáo trên mobile là không thể thiếu. Một số nền tảng quảng cáo nổi tiếng trên mobile như: iAd, google Admob...

Trong bài viết này chúng ta cùng nhau đi tìm hiểu về quảng cáo rất nổi tiếng trên mobile đó là Google Admob.

**Chúng ta cùng tìm hiểu nhé!**

### In App Advertising

Thật vậy, quảng cáo trên mobile xuất hiện tại nhiều vị trí như: top, bottom, hoặc hiển thị full toàn bộ màn hình theo kiểu popup. Chúng ta cùng tìm hiểu làm thế nào để cài đặt và tích hợp quảng cáo vào app ak!

### Get the Google AdMob SDK

Đi tới trang web: [https://developers.google.com]. Bạn sẽ nhìn thấy ở giữa màn hình:

![](https://images.viblo.asia/1873bae9-184e-4244-a9d6-6ed78ea87578.png)

Click vào nút giữa "iOS". Sau đó sẽ đi tới trang "Google APIs for iOS". Cuộc xuống dưới trang, có 3 cột. Sau đó bạn tìm phần nội dung có title là "Earn"

![](https://images.viblo.asia/e40d8c30-15f4-458f-b500-5821e798fcd4.png)

Click vào button AdMob. Sau đó bạn chọn tab "Download":

Trong trang này có một bảng là danh sách các version có thể download. Một trong số đó chúng ta chọn như hình dưới đây:

![](https://images.viblo.asia/d5a92303-5d5d-4e5b-8fe9-36c18aeb52dc.png)

### Create the Project

Trong Xcode, tạo mới **Single View Application**.

![](https://images.viblo.asia/efc6bee7-3b67-4783-abb6-c33f14b6f5db.png)

Sau đó Xcode sẽ hỏi nơi bạn lưu lại, bạn hãy chọn vị trí mong muốn và lưu lại. Sau đó copy toàn bộ thư mục của SDK Google AdMob mà bạn vừa tải xuống vào thư mục dự án mà bạn vừa lưu.

### Linking Google AdMob to our project

![](https://images.viblo.asia/f832bd4e-4173-4b24-a716-ac1997132169.png)

Mở project lên sau đó chúng ta thêm SDK vừa tải xuống vào thư mục của project như sau:

![](https://images.viblo.asia/f7ea7b7f-82bc-431c-ae7f-7ba1c54fc83f.png)

![](https://images.viblo.asia/e205a6aa-2dc6-46da-a2c7-722ef126c8a1.png)

Ngoài ra chúng ta cũng cần thêm nhiều frameworks vào project mà Google AdMob project yêu cầu:

AdSupport.framework
AudioToolbox.framework
AVFoundation.framework
CoreGraphics.framework
CoreTelephony.framework
EventKit.framework
EventKitUI.framework
MessageUI.framework
StoreKit.framework
SystemConfiguration.framework

![](https://images.viblo.asia/2c0e9970-ced3-4767-ba4c-680bfc42a617.png)

### Import GoogleMobileAds

Đi tới viewcontroller và import library GoogleMobile Ads:

**import GoogleMobileAds**

Bây giờ thì project đã sẵn sàng để thêm ads. Buld project và lưu lại .

### Create AdMob Banner Ads

Trong phần navigation của project chọn Main.storyboard:

![](https://images.viblo.asia/5684556e-9d22-496e-a630-b305ecb16521.png)

Sau đó chúng ta kéo **UIView** vào file controller và căn chỉnh x,y và width, height:

![](https://images.viblo.asia/85928edb-0ec1-484d-98e3-fe3f1a153811.png)

![](https://images.viblo.asia/339a16ce-bf1e-4df2-ac82-17b0b4992136.png)

![](https://images.viblo.asia/c1c0ac72-0fd8-4942-abdd-2f9860288fb1.png)

![](https://images.viblo.asia/693ae454-930f-4bc3-a1c1-d7780731af89.png)

Một lần nữa, chúng ta set super class: GADBannerView cho UIVIew vừa được thêm vào: 

![](https://images.viblo.asia/166b455d-7d6a-4258-8bb2-b5008f1f8808.png)

Sau đó chúng ta kéo IBOutlet vào file swift:

@IBOutlet weak var GoogleBannerView: GADBannerView!

Trong func ViewDidLoad chúng ta điền các dòng code setup:

```Swift
GoogleBannerView.adUnitID = "ca-app-pub-3940256099942544/2934735716"
GoogleBannerView.rootViewController = self
GoogleBannerView.loadRequest(GADRequest())
```

Sau đó đi tới file **.plist** để cài đặt key **NSAllowsArbitraryLoads** với giá trị **YES**

Sau đó chạy project bạn sẽ thấy GoodleAdmob đã được thêm vào ứng dụng.


###  Conclusion

Trong bài viết này mình đã giới thiệu tới các bạn làm thể nào để có thể hiển thị Ads trong ứng dụng với Google AdMob.
Có thể nói là khá đơn giản, chúng ta đã có thể dễ dàng thêm quảng cáo Google Admob vào ứng dụng của mình.

Cám ơn bạn đã dành thời gian cho bài viết! :)

##### _Nguồn:_
[https://www.ios-blog.com/tutorials/swift/display-ads-in-your-application-with-google-admob/]