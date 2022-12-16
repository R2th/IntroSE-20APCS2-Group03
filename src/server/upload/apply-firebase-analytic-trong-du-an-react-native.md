# 1. Bài toán đặt ra
Mỗi một sản phẩm sau khi được tạo ra, thì cả developer lẫn khách hàng đó đều mong muốn nắm sát sao được những phản hồi từ chính end user mà không chỉ thông qua những lượt rate, những comment,... Hơn thế nữa, họ có thể theo dõi, phân tích được xu hướng của người dùng đối với từng screen, action... để đưa ra những suggest tốt hơn dành cho cả khách hàng cản thiện sản phẩm.

Trong bài viết này, mình xin chia sẻ về cách apply firebase analytic trong dự án react native bằng các sử dụng thư viện react-native-firebase.

# 2. Giới thiệu thư viện
Thư viện mình sử dụng ở đây là : [react-native-firebase](https://github.com/invertase/react-native-firebase)

Có lẽ thư viện này cũng khác quen thuộc, bởi trong một bài viết khác của mình cũng đã giới thiệu sử dụng thư viện này để handle các vấn đề liên quan tới push notification.

Phiên bản hiện tại của thư viện này đã là 6.x.

Các vấn đề liên quan tới thư viện, version, update như thế nào bạn có thể đọc kĩ hơn ở link:
https://rnfirebase.io/

Ngoài ra, các vấn đề liên quan tới firebase, bạn có thể tìm đọc tại 
https://firebase.google.com/docs/analytics/screenviews

# 3. So sánh qua về 2 version react-native-firebase 5.x và 6.x
Hôm trước, mình có mày mò thử nâng phiên bản react-native-firebase hiện tại là 5.x lên 6.x, thì mình thấy có khá nhiều thay đổi: 
- install có vẻ nhanh hơn, không cần link phức tạp như trước
- theo trong doc có nói, chia nhỏ các phần ra, nếu dùng phần nào gọi phần đó, ví dụ như muốn add analytic thì add : `@react-native-firebase/analytics` vào sử dụng, làm giảm bớt dung lượng của lib khi add cả như trước 
- một số hàm change, thay đổi, chi tiết[ ở đây](https://rnfirebase.io/releases/v6.4.0)

Tuy nhiên, ngoài những phần đó ra, thì cách gọi, sử dụng dành cho việc analytic thì không có thay đổi nhiều lắm

version 6.x
```
import analytics from '@react-native-firebase/analytics'
```

version 5.x
```
import firebase from 'react-native-firebase'
let Analytics = firebase.analytics()
```

Trong các phần giới thiệu tiếp theo, mình sẽ đi vào giới thiệu apply analytic đối với version 5.x 
# 4. Analytic collection enable
Trước hết, có một vài lưu ý với việc setup bên Android và IOS 

### 4.1 Android 
Trong MainApplication.java
```
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
```
sau đó add ` packages.add(new RNFirebaseAnalyticsPackage())` trong `getPackages`

Hãy nhớ rằng, gọi hàm `setAnalyticsCollectionEnabled(true)` để cho phép thu thập dữ liệu analytic hoặc set trong thẻ application của AndroidManifest.xml
```
<meta-data android:name="firebase_analytics_collection_deactivated" android:value="true" />
```
### 4.2 IOS
Cũng hãy nhớ rằng gọi `setAnalyticsCollectionEnabled(true)` , và mình sử dụng luôn hàm này ở file index.js

# 5. Tracking screen
Một bài toán đơn giản về việc theo dõi xu hướng sử dụng màn hình của user, chúng ta có thể dựa vào hàm `setCurrentScreen` và theo dõi trên Debug View để biết được các thông tin trước và sau của Screen.

Về phần điều hướng màn hình ở project của mình, mình sử dụng `react-native-navigation` nên mình có thể dựa vào hàm

```
 Navigation.events().registerComponentDidAppearListener(({ componentId, componentName }) => {
  console.log('registerComponentDidAppearListener: ' + componentId + " " + componentName)
  Analytics.setCurrentScreen(componentName, componentName)
});
```

Hay có thể sử dụng hàm đó ở từng màn hình trong hàm `componentDidAppear` hay `componentDidMount`
```
componentDidAppear(){
Analytics.setCurrentScreen('HomeScreen', 'HomeScreen')
}
```

# 6. Theo dõi trên Debug View 
![](https://images.viblo.asia/aa1fcca7-48d7-4b13-8f89-d4347bcb762f.png)

Để connect và có thể theo dõi trên debug view như hình thì:

**Android**:

Để bật chế độ debug analytic trên device android, ta chạy lệnh:
```
adb shell setprop debug.firebase.analytics.app <package_name>
```

Để vô hiệu hoá, run: 
```
adb shell setprop debug.firebase.analytics.app .none.
```

**IOS**:
Vào Xcode, chọn Product -> Scheme -> Edit Scheme

![](https://images.viblo.asia/046a1223-c09a-4f75-aeb1-6bebcadd924a.png)

Để enable, add và select `-FIRDebugEnabled và -FIRAnalyticsDebugEnabled`

Để diable, add và select `-FIRDebugDisabled`

Nếu máy của bạn run, thì thông tin khi bạn sử dụng màn hình sẽ được cập nhật trên debug view, bạn có thể xem được các thông tin: tên màn hình, time open, màn hình trước,... 
và có thể xem thống kê được số màn hình đã view, mỗi screen chiếm bao nhiêu %...

# 7. Kết luận
Ngoài tracking screen, thư viện còn support tracking theo event bằng logEvent, đính kèm các dữ liệu người dùng bằng setUserId, setUserProperties, setUserProperty.

Tuy nhiên, trong giới hạn bài này, mình  muốn giới thiệu và hình dung qua cách tracking screen người dùng như thế nào một cách đơn giản nhất. Do mình cũng mới tìm hiểu nên có phần nào sai sót hay chưa rõ, mong các bạn còm men đóng góp để mình hoàn thiện hơn ạ.

Cám ơn các bạn đã đọc <3