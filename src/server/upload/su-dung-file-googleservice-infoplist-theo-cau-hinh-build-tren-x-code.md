Một vòng đời phát triển dự án trên X Code thường có 3 bản build config là Debug, Staging và Release. Trong đó Debug để bạn build phát triển trên môi trường Dev, ở Staging bạn build để cho các QC có thể test và cuối cùng bản build Release để có thể đưa dự án của mình lên App Store. Mỗi 1 bản build bạn hoàn toàn có thể cấu hình các dữ liệu khác nhau như URL API, ... Trong đó Firebase Environments là 1 trong số đó. Ở bài viết này mình sẽ chỉ cho các bạn cách sử dụng các file ***GoogleService-Info.plist*** khác nhau tuỳ theo cấu hình build.


### Tạo build configurations

Thông thường khi tạo mới 1 project với X Code, bạn chỉ có 2 cấu hình build là Debug và Release, bạn cần tạo thêm 1 configuration là Staging nữa. Tạo mới bằng cách mở **Project Natigation** ở bên trái, chọn project trong phần **Project**, chọn **Info** bạn sẽ thấy mục **Configurations** có 2 cấu hình build là Debug và Release. Để thêm cấu hình Staging bạn nhấn nút **"+"** ở bên dưới, chọn **Duplicate "Debug" Configuration** và đặt tên cấu hình là **Staging**.
Sau đó bạn đóng X Code lại và thêm thư viện Firebase bằng cocoapods. Cách tích hợp Firebase vào dự án bằng cocoapods bạn có thể tham khảo tại đây: [Firebase](https://cocoapods.org/pods/Firebase)
Khi ***pod install*** xong, mở lại dự án, vào phần **Configurations** như trên, bạn thấy có 3 cấu hình build như ảnh dưới thì là đã tạo đủ build configurations rồi.
![](https://images.viblo.asia/3346b935-c949-4d11-a347-92d2abbe0936.png)

### Tích hợp file GoogleService-Info.plist vào dự án

Để có thể tạo file GoogleService-Info.plist bạn cần tạo dự án trên [Firebase console](https://console.firebase.google.com/). Trong dự án bạn mới tạo bạn cần tạo 3 app iOS với 3 identify khác nhau.
![](https://images.viblo.asia/73f2e4f0-fa01-468e-b1a6-018598b36a57.png)

Mỗi app iOS sẽ có 1 file GoogleService-Info.plist riêng và bạn tải từng file về đổi tên từng file theo cấu hình như sau:
![](https://images.viblo.asia/772ddfbe-68e0-4e87-b35d-293d0b778145.png)

Trong X Code, bạn tạo mới 1 folder tên là **Configurations**, sau đó kéo thả 3 file GoogleService-Info.plist vào folder Configurations, trước khi Finish bạn hãy uncheck mục "Add to targets", mình sẽ giải thích điều này ở phần sau.
![](https://images.viblo.asia/80acd28d-6942-4086-b95f-b30affb13ba3.png)

### Quản lý file GoogleService-Info.plist theo bản build

Đây là công đoạn quan trọng nhất, bạn sẽ quản lý sao cho mỗi bản build Debug, Staging, Release sẽ dùng đúng file GoogleService-Info.plist tương ứng.
Mở **Project Natigation**, lần này chọn project trong phần **Targets**, sau đó chọn **Build Settings** để quản lý "bundle identifier" trước:
![](https://images.viblo.asia/1e9a4823-6fe5-422f-addc-052225902351.png)

Sau đó chọn sang **Build Phases** để quản  file GoogleService-Info.plist. Ấn **"+"** ở góc trên cùng bên trái, chọn **New Run Script Phase**, đặt tên là ***Switch Google Service***:
![](https://images.viblo.asia/418e23d0-3ab5-48c4-85d3-2be3af47bb3b.png)

Trong file **Switch Google Service**, bạn thêm dòng code sau:
![](https://images.viblo.asia/051e95fc-d6c6-43b3-8948-72f94a87942a.png)

Code sample:
```swift

PATH_TO_GOOGLE_PLISTS="${PROJECT_DIR}/${PROJECT_NAME}/Configurations"

case "${CONFIGURATION}" in

"Debug" )
cp -r "$PATH_TO_GOOGLE_PLISTS/GoogleService-Info-Debug.plist" "${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/GoogleService-Info.plist" ;;

"Staging" )
cp -r "$PATH_TO_GOOGLE_PLISTS/GoogleService-Info-Staging.plist" "${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/GoogleService-Info.plist" ;;

"Release" )
cp -r "$PATH_TO_GOOGLE_PLISTS/GoogleService-Info-Release.plist" "${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/GoogleService-Info.plist" ;;

*)
;;
esac

```

Mình giải thích như sau:
- Ở dòng đầu tiên là bạn tham chiếu tới 3 file GoogleService-Info.plist của bạn đã tạo trong dự án.
- Dòng code còn lại là tương ứng mỗi bản build thì sẽ dùng 1 file GoogleSerive tương ứng. Ở trường hợp build "Debug" là sẽ dùng file "GoogleService-Info-Debug.plist", sau đó copy file này vào 1 file "GoogleService-Info.plist" ở trong **${PRODUCT_NAME}.app** và Firebase sẽ sử dụng "GoogleService-Info.plist" để ***configure*** chứ không phải dùng file "GoogleService-Info-Debug.plist". Đó là lý do ở bước trên mình nói các bạn không cần phải check target ở file "GoogleService-Info-Debug.plist". Tương tự ở các trường hợp build bằng "Staging" và "Release".

Sau đó bạn run thử từng môi trường, nếu không báo lỗi gì thì đã cấu hình thành công rồi.

### Firebase configure

Bước này bạn mở file **AppDelegate.swift**, bạn thêm dòng code sau:

```swift

import UIKit
import Firebase

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        return true
    }
}

```



### Chọn môi trường build

Chọn môi trường build bằng sau. Ở trên thanh menu bạn chọn Product/Scheme/EditScheme... Sau đó đổi môi trường build tương ứng:
![](https://images.viblo.asia/a226bdd7-5711-41c1-a976-3571c0930fa5.png)

### Kiểm tra bước cuối

Để kiểm tra xem mọi thứ bình thường chưa thì sau khi **Run** ở 1 môi trường bất kỳ, ở đây mình Run ở "Debug", bạn kiểm tra như sau.
Trong folder **Products** bạn right-click vào **ProductName.app** chọn **Show In Finder**:
![](https://images.viblo.asia/165c7e52-96c3-43fd-a714-527034437869.png)

Sau đó bạn right-click tiếp vào **ProductName.app** và chọn **Show Package Contents**:
![](https://images.viblo.asia/2cc72e99-1f45-409c-8319-71fa20e2d167.png)

Nếu mọi thứ bình thường bạn sẽ thấy 1 file tên là **GoogleService-Info.plist**, đây chính là file mà Firebase sẽ configure. Bạn mở file này lên và so sánh với file **GoogleService-Info-Debug.plist**, nếu nó giống nhau thì chứng tỏ bạn đã quản lý các file thành công rồi đó. Tương tự hãy kiểm tra ở môi trường "Staging" và "Release" và xem kết quả nhé.
![](https://images.viblo.asia/a15aa307-bba9-43f8-99dd-9e1556b3b128.png)

### Tổng kết
Việc sử dụng X Code Configurations để quản lý cấu hình file GoogleService-Info.plist là gần như bắt buộc nếu dự án của bạn làm việc với Firebase Environments. Và bài viết hy vọng sẽ giúp các bạn có thể hiểu rõ hơn về cách làm này.

Project Demo: [github](https://github.com/nad27298/multi-ggservice)