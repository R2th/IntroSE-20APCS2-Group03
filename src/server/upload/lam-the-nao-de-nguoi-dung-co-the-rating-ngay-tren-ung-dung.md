## Mở đầu
App Store là nền tảng phân phối kỹ thuật số các ứng dụng, hay Chợ ứng dụng cho các thiết bị chạy hệ điều hành iOS, phát triển và duy trì bởi Apple Inc.
![](https://images.viblo.asia/d0047354-5607-423f-a23b-94dd986cda78.png)

Hiện nay trên App Store đã có tới hàng triệu ứng dụng, với mỗi một danh mục ứng dụng nhất định đã có tới hàng trăm hoặc hàng ngàn ứng dụng tương tự nhau. Vậy làm sao để người dùng chọn ứng dụng của bạn? 

Với việc các trang thương mại điện tử đang ngày một thịnh hành, người dùng cũng đã quen dần với việc mua những mặt hàng có rating cao và nhiều lượt đánh giá tốt. Vì vậy việc thông báo nhắc nhở người dùng rating ứng dụng của mình là rất cần thiết.

Trong bài viết này, bạn sẽ tìm hiểu về cách yêu cầu người dùng xếp hạng và đánh giá ứng dụng của bạn bằng cách sử dụng SKStoreReviewController và các API có sẵn khác.

## Một số lưu ý quan trọng khi sử dụng SKStoreReviewController
1. Apple chỉ cho phép hiển thị tối đa 3 lần trong 365 ngày, bất kể bạn request bao nhiêu lần. Điều này đồng nghĩa với việc có thể một số trường hợp bạn gọi request nhưng ứng dụng sẽ không hiển thị Popup rating cho bạn.
2. Để tránh việc rating trùng lặp, hệ thống cũng sẽ không hiển thị Popup rating cho bạn nếu ứng dụng của bạn có cùng version với lần hiển thị Popup rating trước đó.
3. Popup rating sẽ hiển thị khác nhau tuỳ thuộc vào từng môi trường của ứng dụng hiện tại:
>    Development: Luôn hiển thị mỗi khi hàm request được gọi.
>    
>    Test Flight: Không bao giờ hiển thị.
>    
>    App Store: Hiển thị nhưng vẫn có những hạn chế nêu ở trên.

## Cài đặt
Bài viết sử dụng Xcode 13 và Swift 5, có sử dụng RxSwift.

Tạo mới project (trong bài viết đặt tên là RatingApp). Sau đó tạo final class RatingAppHelper.swift và tạo instance cho class này.
![](https://images.viblo.asia/0007860a-e915-45e5-9f22-af5d38e58ed1.png)

## Khởi tạo giao diện ứng dụng mẫu
Thông thường ở những ứng dụng thực tế, việc yêu cầu người dùng rating ứng dụng phải thoả mãn điều kiện nhất định nào đó. VD như hiện Popup rating khi mở ứng dụng được 20 lần, với ứng dụng nghe nhạc thì có thể nghe 20 bài nhạc chẳng hạn,...

Trong bài demo này, mình sẽ khởi tạo giao diện như hình dưới:
![](https://images.viblo.asia/b1013196-f215-4e59-a23a-21970b283d66.png)
Và khi bấm vào buttton Increment mỗi 5 lần thì sẽ hiển thị popup để người dùng rating.

Tuy nhiên việc rating ứng dụng bị Apple ràng buộc rất nhiều nên mình sẽ thêm điều kiện là mỗi một version của ứng dụng thì chỉ hiển thị 1 lần duy nhất.

## Config RatingAppHelper
Mở file `RatingAppHelper.swift` lên, đầu tiên bạn cần `import StoreKit`. Sau đó tiến hành thêm enum ReviewResult
```
enum ReviewResult {
   case displayed
   case requestSuccess
}
```
và các properties
```
private let userDefault = UserDefaults.standard
private let lastReviewRequestAppVersionKey = "lastReviewRequestAppVersion"
```
Sau đó thêm hàm `showRequestReviewIfAppropriate`
```
func showRequestReviewIfAppropriate() -> ReviewResult {
        let bundleVersionKey = kCFBundleVersionKey as String
        let currentVersion = Bundle.main.object(forInfoDictionaryKey: bundleVersionKey) as? String
        let lastReviewVersion = userDefault.string(forKey: lastReviewRequestAppVersionKey)
        guard lastReviewVersion == nil || lastReviewVersion != currentVersion else {
            return .displayed
        }
        
        SKStoreReviewController.requestReview()
        
        userDefault.setValue(currentVersion, forKey: lastReviewRequestAppVersionKey)
        userDefault.synchronize()
        return .requestSuccess
    }
```
Hàm này sẽ kiểm tra điều kiện xem ứng dụng đã hiển thị Popup rating lên trong version này hay chưa, nếu chưa thì hiển thị lên, nếu đã hiển thị trước đó thì return về trạng thái đã hiển thị. Chúng ta sẽ dùng UserDefaults để lưu lại version cuối cùng đã hiển thị Popup rating. Không phải thực hiện nhiều bước hay phải xin quyền như notification hay location, đơn giản bạn chỉ cần gọi         `SKStoreReviewController.requestReview()` là ứng dụng sẽ hiển thị Popup rating cho bạn.

Để sử dụng hàm này, trong ViewController, tạo hàm `checkAndShowRatingPopup`
```
func checkAndShowRatingPopup() {
    if count % 5 != 0 {
        return
    }
        
    let status = RatingAppHelper.shared.showRequestReviewIfAppropriate()
    print("status = \(status)")
}
```
và mỗi khi bạn bấm vào button Increment, bạn chỉ cần tăng biến count lên 1 và gọi hàm `checkAndShowRatingPopup`
```
btnIncrement.rx.tap
    .asDriverOnErrorJustComplete()
    .drive(onNext: { [weak self] _ in
        guard let self = self else { return }
        self.count += 1
        self.lblCount.text = "\(self.count)"
        self.checkAndShowRatingPopup()
    })
    .disposed(by: disposeBag)
```
## Chạy thử ứng dụng
Build ứng dụng lên, sau đó bấm button Increment đến khi biến count = 5. Nếu ứng dụng của bạn hiển thị Popup rating như hình thì chúc mừng bạn đã thành công 😆
![](https://images.viblo.asia/3e415213-4d68-4b40-8dd0-6dcd5cd5ab22.png)

Đừng lo lắng khi bạn thấy button Submit bị disable như hình dưới. Apple chỉ enable button này khi ứng dụng của bạn được download từ App Store mà thôi 😌
![](https://images.viblo.asia/234897e2-479f-4f5e-bb1b-3efde7d0b0bd.png)

Tới đây chắc hẳn một số bạn đọc sẽ có thắc mắc, nếu version này ứng dụng đã hiển thị Popup rating nhưng người dùng lại bấm vào button Not Now thì làm sao. 

Vì Apple hiện tại không cho chúng ta biết được thông tin là người dùng đã rating hay chưa và cũng vì những hạn chế mà Apple đưa ra nên chúng ta không thể show pop up này liên tục được. Vì vậy chúng ta có thể gọi hàm requestReview cho lần đầu tiên, còn những lần sau nếu thoả mãn điều kiện để rating thì chúng ta sẽ điều hướng tới ứng dụng của chúng ta trên App Store.

Để làm được điều đó, trước tiên chúng ta thêm hàm `reviewOnAppStore()` vào trong RatingAppHelper.swift
```
func reviewOnAppStore() {
        guard let productURL = URL(string: "https://apps.apple.com/vn/app/binance-buy-bitcoin-securely/id1436799971") else {
            return
        }
        
        var components = URLComponents(url: productURL, resolvingAgainstBaseURL: false)

        // 2.
        components?.queryItems = [
          URLQueryItem(name: "action", value: "write-review")
        ]

        // 3.
        guard let writeReviewURL = components?.url else {
          return
        }

        // 4.
        UIApplication.shared.open(writeReviewURL)
 }
```
Với productURL là url ứng dụng của bạn, ở đây mình lấy ví dụ là URL của ứng dụng Binance.
Tiếp theo update hàm `checkAndShowRatingPopup()` ở ViewController
```
func checkAndShowRatingPopup() {
        if count % 5 != 0 {
            return
        }
        
        let status = RatingAppHelper.shared.showRequestReviewIfAppropriate()
        print("status = \(status)")
        if status == .displayed {
            showOption(message: "We are very happy if you rate this application", leftButton: "Late", rightButton: "Go to review", completionRight: {
                RatingAppHelper.shared.reviewOnAppStore()
            })
        }
  }
```

Sau đó tiến hành build ứng dụng lên device thật để test (vì simulator không có App Store). Sau đó xem kết quả:
Khi count đến 5, ứng dụng sẽ hiện thị Popup rating lên cho user rating ngay trên ứng dụng
Khi count đến 10,15,20,... ứng dụng sẽ hiển thị alert như hình dưới, 

![](https://images.viblo.asia/0ef277a9-8fef-4035-b9e8-a55347607df1.PNG)

Nếu người dùng bấm `Go to review`, hệ thống sẽ điều hướng tới ứng dụng Binance trên App Store

![](https://images.viblo.asia/e7941a6a-1393-4bd3-a453-433dbb075d8b.PNG)

## Tổng kết
Qua bài viết trên, hi vọng bạn đã nắm được những điều cần lưu ý và cách thức sử dụng `SKStoreReviewController` trong swift, việc config như thế nào là tuỳ vào yêu cầu project của bạn. Chúc bạn thành công 🥰

Bài viết có tham khảo:

https://developer.apple.com/app-store/ratings-and-reviews/

https://developer.apple.com/documentation/storekit/requesting_app_store_reviews