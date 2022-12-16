# Giới thiệu
Trong lập trình nói chung và lập trình iOS nói riêng, việc sử dụng các thư viện third-party là rất thường xảy ra cho phép phát triển ứng dụng rất nhanh chóng bằng cách dùng lại những phần code mà người khác đã viết trước đó. Hầu hết những ngôn ngữ lập trình hiện nay đều có các công cụ hỗ trợ quản lý các thư viện này một cách tập trung và hiệu quả, được gọi là các ***dependency manager*** hay ***package manager***. Khi làm việc với ngôn ngữ Swift, chúng ta đã rất quen thuộc với 2 dependency manager là **Cocoapods** và **Carthage**. hôm nay tôi sẽ giới thiệu đến các bạn một cái nữa đó là ***Swift Package Manager***, nó đã được giới thiệu từ Swift 3.0 và đến nay đã được *Apple* chính thức tích hợp vào trong Xcode 11, và trong bài viết này chúng ta sẽ cùng nhau tìm hiểu cách thức để thêm ***Swift Package Dependencies*** vào trong ứng dụng iOS.
# Adding Swift Package Dependencies to iOS App
## Overview
Do ***Swift Package Manager*** được *Apple* chính thức tích hợp vào trong Xcode 11 do vậy việc quản lý các dependency của chúng ta sẽ trở nên đơn giản hơn, không phức tạp như khi chúng ta sử dụng Cocoapods hay Carthage nữa. Chúng ta có thể dễ dàng kiểm tra xem thư viện mà ta dùng đã mới nhất chưa hay đang dùng version bao nhiêu ... Và nó cũng support cho cả *public* và *private repositories*.
## Add a Package Dependency
Để thêm**Swift Package Manager*** dự án Xcode của bạn, hãy chọn File > Swift Packages > Add Package Dependency và nhập URL của nó:

![](https://images.viblo.asia/4c072ebd-4edf-4f40-90ef-fe10f52e3b78.png)

sau đó chọn version hay cụ thể commit nào bạn muốn sử dụng, sau đó bấm next

![](https://images.viblo.asia/85ab1916-319f-412e-b769-a5a584febb3f.png)

![](https://images.viblo.asia/49a457f7-5cd5-4cdf-bc22-7237a33c8b3d.png)

![](https://images.viblo.asia/731d7b7d-9b2e-40f1-a2a4-34b6018987e4.png)

như trên thì tôi đã add thành công Alamofire vào trong dự án iOS rồi đấy, và cùng nhau test thử:

![](https://images.viblo.asia/6661ceff-1ce6-4bcd-b817-be0a5f12a3fd.png)

sau khi add thành công dependency rồi, bạn cũng có thể sửa hoặc xóa một cách dễ dàng.

So sánh với các package manager khác, như Cocoapods bạn phải khai báo thư viện kèm theo version bạn mong muốn rồi thực hiện terminal để install dependency đó vào trong dự án của bạn, khá là rắc rối. Đối với ***Swift Package Manager***  việc đó hoàn toàn được thực hiện trên Xcode rất đơn giản :)
## Tips
- Khi cùng team làm một dự án, hãy đảm bảo mọi người sử dụng cùng một phiên bản của package dependency.. Khi bạn thêm package dependency vào dự án, Xcode sẽ tạo ra file ***Package.resolved***. Tệp này đảm bảo rằng mọi người đều sử dụng cùng một phiên bản package dependency. Bạn có thể tìm thấy file *Package.resolved*  trong thư mục *.xcodeproj*  => *[appName].xcodeproj/project.workspace/xcshareddata/swiftpm/Package.resolved*. Nó sẽ có dạng:
```
{
  "object": {
    "pins": [
      {
        "package": "Alamofire",
        "repositoryURL": "https://github.com/Alamofire/Alamofire.git",
        "state": {
          "branch": null,
          "revision": "11928850d7273a8cd41bb766f2fc93b4d724b79b",
          "version": "5.0.4"
        }
      }
    ]
  },
  "version": 1
}
```
- Nếu bạn muốn update dependency của bạn là mới nhất, hãy chọn File > Swift Packages > Update To Lastest Versions thì thư viện của bạn sẽ được update mới nhất.

![](https://images.viblo.asia/2f87f415-8319-4528-bfbc-6fa4f355287c.png)

# Kết luận
Trên đây tôi cùng với các bạn cùng nhau tìm hiểu về một ***package manager*** cũ mà mới trong lập trình iOS. Tôi thấy rằng ***Swift Package Manager***  được support trực tiếp từ Xcode, đơn giản hơn quản lý  các version so với Cocoapods và Carthage. Sắp tới, khi hầu hết các Dependency đều support ***Swift Package Manager*** thì tôi tin rằng nó sẽ thay thế được các ***package manager*** kia. 
Trong bài viết tiếp theo, tôi sẽ cùng với các bạn tìm hiểu làm thế nào để có thể tạo ra một ***Swift Package Manager*** nhé. Cám ơn đã đọc bài viết :v: 

[Tham khảo](https://developer.apple.com/documentation/xcode/adding_package_dependencies_to_your_app)