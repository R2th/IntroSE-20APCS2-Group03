Một trong những mục tiêu chính của developer là tiếp cận tốt hơn với cộng đồng và nhận phản hồi từ user để cải thiện ứng dụng cũng như khuyến khích thêm nhiều user khác sử dụng app. Trong nhiều năm, developer đã sử dụng các method từ bên thứ 3 để đề xuất việc review với user dựa trên việc user đã dùng app trong bao lâu và có thường xuyên hay không. Nhưng vấn đề lớn với việc sử dụng method của bên thứ 3 đó là trải nghiệm không liền mạch như chúng ta mong đợi. Thông thường, người dùng đã bị đẩy ra khỏi app và chuyển sang AppStore để viết review: đó là nơi thậm chí user phải chọn tab `Review` để bắt đầu viết.
TRong bản update của iOS 10.3, Apple đã tạo ra 1 vài thay đổi chính trong iOS platform, và 1 trong những thay đổi thuận lợi nhất cho developer là 1 `official method` để yêu cầu user review và nó sẽ xử lý hết phần còn lại. Về mặt lý thuyết, developer chỉ cần thêm duy nhất 1 dòng code để yêu cầu việc review nhưng có 1 vài lưu ý cần xem xét.

Dựa trên tài liệu của Apple, việc yêu cầu review sử dụng một `proprietary method` để phân tích xem lúc nào là thời điểm thích hợp để yêu cầu người dùng reiview app, do đó developer nên tránh gọi function này trong việc response lại 1 user action. Ví dụ như nếu bạn đặt việc yêu cầu review trong 1 `callback function` cho việc touch vào 1 button, iOS có thể sẽ quyết định ko hiển thị bất cứ điều gì và vì vậy user có thể nghĩ rằng app của bạn ko hoạt động tốt. Mặt khác, điều quan trọng là cần phải chú ý việc ko nên yêu cầu user review quá sớm, nên chờ user chaỵ app 1 lúc rồi mới yêu cầu. Mặc dù chúng ta không biết thuật toán của Apple ntn, nhưng cho đến khi chúng t biết rõ cách hoạt động của nó, cách tiếp cận tốt nhất là chắc chắn yêu cầu user review vào thời điểm thích hợp.

> Chú ý: Khi app đang trong quá trình development, tất cả các yêu cầu review sẽ được chấp nhận, có nghĩa là mỗi khi bạn request thì 1 hộp thoại sẽ xuất hiện trên màn hình nhưng bạn không thể gửi nó đi. trong Testflight thì hơi sad một chút, không có request nào được thông qua, vì thế đừng vội hoảng loạn khi không thấy 1 hộp thoại nào xuất hiện khi bạn sử dụng Testflight. Khii app ở giai đoạn production, nó sẽ sử dụng các methods của Apple để show ra hộp thoại khi nó thấy phù hợp.
Sau đây là cách bạn implement:
1. import StoreKit
```swift
import StoreKit
```
2. Yêu cầu việc review:
```swift
SKStoreReviewController.requestReview()
```
Dĩ nhiên SKStoreReviewController chỉ có từ iOS 10.3 nên bạn cần phải check version:
```swift
if #available(iOS 10.3, *) {
    SKStoreReviewController.requestReview()
           
} else {
    // Fallback on earlier versions
    // Try any other 3rd party or manual method here. 
}
```

### Step by Step
1. Tạo 1 Swift file trong project của bạn
2. Import những frameworks cần thiết
```swift
import Foundation
import StoreKit
```
3. Define những variable cho việc setting
```swift
let runIncrementerSetting = "numberOfRuns"  // UserDefauls dictionary key where we store number of runs
let minimumRunCount = 5                     // Minimum number of runs that we should have until we ask for review
```
4. Tiếp theo tạo 1 bộ đếm số lần run app và lưu trong UserDefaults. Để tạo ra bộ đếm thì bạn sẽ cần 2 functions: 1 để đọc từ UserDefault và 1 để đếm và lưu lại vào UserDefaults.
```swift
func incrementAppRuns() {                   // counter for number of runs for the app. You can call this from App Delegate
    
    let usD = UserDefaults()
    let runs = getRunCounts() + 1
    usD.setValuesForKeys([runIncrementerSetting: runs])
    usD.synchronize()
    
}
func getRunCounts () -> Int {               // Reads number of runs from UserDefaults and returns it.
    
    let usD = UserDefaults()
    let savedRuns = usD.value(forKey: runIncrementerSetting)
    
    var runs = 0
    if (savedRuns != nil) {
        
        runs = savedRuns as! Int
    }
    
    print("Run Counts are \(runs)")
    return runs
    
}
```
5. Tiếp theo sẽ là function cho việc request người dùng review. Chúng ta cần phải chú ý tới 2 yếu tố ở trong fucntion này: Thứ nhất là chúng ta có đủe số lần run app để yêu cầu review chưa? Thứ 2 là app có đang chạy trên iOS 10.3 hoặc cao hơn không?
```swift
func showReview() {
    
    let runs = getRunCounts()
    print("Show Review")
    
    if (runs > minimumRunCount) {
        
        if #available(iOS 10.3, *) {
            print("Review Requested")
            SKStoreReviewController.requestReview()
            
        } else {
            // Fallback on earlier versions
        }
        
    } else {
        
        print("Runs are not enough to request review!")
        
    }
    
}
``` 
6. Tiếp theo chúng ta cần phải chạy function đếm số lần chạy app từ App Delegate
```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
incrementAppRuns()
        return true
 }
```
7. Bước cuối cùng là gọi `showReview()` ở 1 thời điểm hợp lý. Tài liệu suggest rằng nên gọi function này mỗi khi user hoàn thành một công việc quan trọng -major work- nào đó trong app. Ví dụ như nếu app của bạn là 1 game thì show khi user chơi xong, bạn show kết qủa cho user rồi bạn có thể gọi function này ngay sau đó. Nhớ gọi cả function này bên cạnh những công việc khác nếu bạn đặt nó trong 1 button callback. Như ở `CMath` `showReview()` được đặt ở back button của summary page. Vì vậy khi user vừa mới xem kết quả xong và đang muốn trở về home page thì nếu method `requestReview()` cho rằng nên show review, nó sẽ show review dialog lên.

Cuối cùng là code ở Github của tác giả:
[Github](https://github.com/Behrad3d/B2_Tutorials/tree/master/01_SwiftRequestReview)
### Reference
[Medium](https://medium.com/@behrad.bagheri/swift-tutorial-proper-way-to-request-review-using-skstorereviewcontroller-in-ios-10-3-and-higher-eaf724e5be83)