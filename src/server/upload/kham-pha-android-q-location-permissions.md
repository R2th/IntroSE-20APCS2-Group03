![](https://images.viblo.asia/961a1c1c-a759-4026-974a-e000c3e96877.png)

 Android Q hiện vẫn chưa ra mắt chính thức mà chỉ xuất hiện ra mắt cho lập trình viên, với những thông báo với những sự thay đổi thú vị ở phiên bản này, thì tôi sẽ viết một seri những thay đổi đó để mọi người có thể cập nhật trước những sự cập nhật này, đến khi Android Q ra mắt chính thức ta có thể dễ dàng bắt kịp xu thế phát triển mới.
 Trong nội dung bài viết này tôi sẽ nói về một sự thay đổi đầu tiên liên quan đến Location Permissions. Mời mọi người theo dõi bài viết để có thể hiểu thêm về sự thay đổi này trên Android Q.
 Code của sample mô tả những sự thay đổi mọi người có thể cập nhật tại [đây](https://github.com/hitherejoe/Android-Q-Playground/tree/master)
 
 Theo như tài liệu trên trang chủ của Google cho [Android Q](https://developer.android.com/preview/privacy)  một trong những thay đổi được Google đề cập tới đó là vấn đề vị trí của người dùng trong ứng dụng. Sự thay đổi này sẽ áp dụng cho cả vấn đề location ở background và foreground. Điều này sẽ mang lại cho user của chúng ta nhiều tùy chọn hơn về việc điều khiển quyền truy cập vị trí của họ, cũng có thể cho phép họ chặn chia sẻ vị trí của mình khi mà không sử dụng app. Hãy cùng tôi tìm hiểu những sự thay đổi đó là gì và cách ta áp dụng vào ứng dụng của ta như thế nào.
 
##  Foreground Location Permission
Trong thực tế thì sẽ có rất nhiều trường hợp ứng dụng của bạn yêu cầu truy cập vị trí của user trong quá trình app đang chạy trên foreground. Ví dụ ứng dụng của bạn đang điều hướng user cách đi về nhà một cách real time, chẳng còn cách nào khác bạn sẽ phải yêu cầu user cho phép truy cập vị trí của họ và đặc biệt bạn phải đưa ra được lý do cho user là tại sao mình lại cần quyền truy cập đó.
Để bắt đầu, ta cần khai báo một service với định nghĩa rõ ràng là ta đang dùng nó để thực hiện xử lí việc liên quan đến location
```
<service
    android:name="ForegroundService"
    android:foregroundServiceType="location"/>
```
Trước khi ta kích hoạt forground service này hãy chắc chắn rằng chúng ta đã yêu cầu quyền truy cập vị trí. Chúng ta có thể check cho quyền **ACCESS_COARSE_LOCATION**. Thực ta đây không phải là một permission mới nó được thêm vào từ tận API level 1 cơ. Tuy nhiên trước đây chúng ta chỉ khái báo nó ở file *Manifest* nhưng bây giờ chúng ta phải request nó theo dạng runtime. Đây là cách mà ta request nó
```
val hasLocationPermission = ActivityCompat.checkSelfPermission(this, 
    Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED
    
    
    if (hasLocationPermission) {
    // handle location update
} else {
    ActivityCompat.requestPermissions(this,
        arrayOf(Manifest.permission.ACCESS_COARSE_LOCATION), REQUEST_CODE_FOREGROUND)
}
```
 Như bạn có thể thấy đoạn code trên ta bắt đầu kiểm tra bằng cách xem chúng ta đã có quyền truy cập vị trí chưa. Nếu đã có rồi thì ta sẽ tiếp tục công việc của mình nếu chưa thì ta sẽ yêu cầu người dùng xác nhận cung cấp cho ứng dụng của chúng ta. Khi ta yêu cầu quyền thì sẽ hiển thị như sau
 
 ![](https://images.viblo.asia/cd2fea6a-22f2-45f3-81e0-7420477aad7a.png)
 
 Như bạn có thể thấy, Intent của permisstion được thiết kế khá rõ ràng đơn giản mà cũng rất đẹp, ứng dụng của ta sẽ thông báo cho người dùng biết rằng ứng dụng của ta chỉ yêu cầu vị trí của user khi mà app đang chạy ở foreground, nghĩa là khi ứng dụng đang chạy trên màn hình. Nếu người dùng từ chối tai thời điểm đó và chúng ta lại request lại 1 lần nữa, thì một dialog thông báo khác sẽ hiển thị lên như sau:
 ![](https://images.viblo.asia/3f250571-a9e4-4210-835d-ec05fc63051f.png)
 
 Tương tự như cách mà các permission runtime mà Android thường xuyên làm việc, chúng được hiển thị và có những tùy chọn không được yêu cầu lại nếu người dùng xác nhận nó.  Vì chức năng này, nó khá quan trọng trong việc bạn chỉ yêu cầu vị trí tại thời điểm mà bạn cần thôi. Điều này hướng dẫn cho user biết lý do bận cần quyền truy cập đó thay vì cảm giác nó đang được hỏi truy cập mà không rõ lý do
 
##  Background location permission
Nếu bạn muốn làm việc mới location dưới background, thì bạn cần phải xử lí khác đi một chút. Đầu tiên chúng ta cần thêm 1 permission mới vào file Manifest, đó là  **ACCESS_BACKGROUND_LOCATION** 
 ```<manifest>
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
</manifest>
```
Chú ý là chúng ta không bắt buộc phải thêm **foregroundServiceType** vào file khải báo service, đó là bởi vì chúng ta không cần sự cho phép nhất thời để chạy cho ứng dụng trong chế độ background.
Cũng như phần trên ta đã làm permission cũng cần phải được hiển thị runtime để thông báo cho user biết. Để làm được điều đó ta cần check quyền **ACCESS_BACKGROUND_LOCATION** 
```
val hasForegroundLocationPermission = ActivityCompat.checkSelfPermission(this, 
    Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED
```
```
if (hasForegroundLocationPermission) {
    val hasBackgroundLocationPermission = ActivityCompat.checkSelfPermission(this, 
        Manifest.permission.ACCESS_BACKGROUND_LOCATION) == PackageManager.PERMISSION_GRANTED
```
```
if (hasBackgroundLocationPermission) {
        // handle location update
    } else {
        ActivityCompat.requestPermissions(this,
            arrayOf(Manifest.permission.ACCESS_BACKGROUND_LOCATION), REQUEST_CODE_BACKGROUND)
    }
} else {
    ActivityCompat.requestPermissions(this,
        arrayOf(Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.ACCESS_BACKGROUND_LOCATION), REQUEST_CODE_BACKGROUND)
}
```
Bạn thông báo cho user và dialog sẽ hiển thị ra theo kiểu như sau:
![](https://images.viblo.asia/26ccf27f-d93a-4687-91a1-0055c0d5d159.png)
Nếu user từ chối và chúng ra request lại thì dialog sẽ như sau:\
![](https://images.viblo.asia/5356fcb3-4b69-49be-9004-4733f5555d9c.png)
## Tổng kết
Chúng ta có thể thấy rằng với Android Q đã thay đổi cách mà ta làm việc với location permission. Ứng dụng của ta sẽ không còn thỏa thích sử dụng location của user từ service nữa cho dù ở foreground hay background. Để support những ứng dụng có target Android Q thì **ACCESS_BACKGROUND_LOCATION** permission sẽ được thêm vào nếu **COARSE** hoặc **FINE** permissions được khai báo.
Những thay đổi này sẽ giúp cho người dùng có thể control được việc chia sẽ vị trí của mình được dùng để làm gì và khi nào, sẽ giúp cho người dùng an tâm hơn. Phải nói đây là cải thiện đáng kể hướng đến user hơn là lập trình viên.

Tham khảo 

[developer.android.com](https://developer.android.com/preview/privacy)

[Exploring Android Q: Location Permissions](https://medium.com/google-developer-experts/exploring-android-q-location-permissions-64d312b0e2e1)