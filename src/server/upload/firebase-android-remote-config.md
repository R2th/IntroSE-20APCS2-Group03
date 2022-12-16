Trong bài viết giới thiệu mình đã nói sơ qua về Remote Config rồi. Bạn có thể sử dụng Firebase Remote Config để xác định tham số trong ứng dụng của mình và cập nhật giá trị của chúng trên cloud, cho phép bạn sửa đổi giao diện và behavior của ứng dụng mà không cần đưa ra một bản update nào cả. Hôm nay mình sẽ hướng dẫn từng bước implement nó nhé! Let's go!

## 1. Add Firebase và  Remote Config SDK vào app
1. Nếu bạn chưa config Firebase với app thì hãy theo dõi các bước ở [đây](https://viblo.asia/p/firebase-android-overview-3P0lPYL85ox#_4-cai-firebase-vao-project-9)!
2. Đối với Remote Config thì Google Analytics là bắt buộc cho việc thêm các rule khi config remote. Bạn có thể check xem đã [enable Google Analytics](https://support.google.com/?visit_id=637205397417501303-1409895749#linkga) trong project hay chưa?
3. Thêm các dependence cho Remote Config Android library vào file build.gradle (app-level): 
```scala
 implementation 'com.google.firebase:firebase-config:19.1.3'
```
## 2. Lấy ra đối tượng Remote Config
 Lấy ra đối tượng Remote Config, sau đó đặt thời gian nhỏ nhất để fetch data: 
```scala
 val remoteConfig = FirebaseRemoteConfig.getInstance()
        val configSettings = FirebaseRemoteConfigSettings.Builder()
            .setMinimumFetchIntervalInSeconds(3600)
            .build()
```
 Trong quá trình phát triển thì nên đặt thời gian fetch này thấp một chút, lý do hãy xem ở phần Throttling nhé! :D
## 3. Đặt các giá trị mặc định cho các tham số trong app
Bạn hoàn toàn có thể đặt các giá trị mặc định cho các tham số trong app, để cho ứng dụng hoạt động mặc định trước khi connect tới Remote Config backend. Và khi mà backend không có giá trị nào được trả về thì app vẫn hoạt động với giá trị mặc định đó.
1. Định nghĩa name-value cho các tham số mặc định, sử dụng đối tượng Map hoặc một file .xml lưu trong thư mục *res/xml* :

    ![](https://images.viblo.asia/21282a4e-c470-4d16-b35f-cbdc1969505a.png)
2. Set những giá trị này cho đối tượng Remote Config: 
```swift
remoteConfig.apply {
            setConfigSettingsAsync(configSettings)
            setDefaultsAsync(R.xml.remote_config_defaults)
            }
```
## 4. Cách lấy ra các giá trị của tham số
Bây giờ bạn có thể lấy các giá trị của tham số từ đối tượng Remote Config. Nếu bạn set các giá trị đó ở backend thì nó sẽ được fetch về và active, sau đó sử dụng tùy ý của bạn. Có các phương thức sau để giúp bạn lấy về các value: 
 * *getBoolean()*
 * *getByteArray()*
 * *getDouble()*
 * *getLong()*
 * *getString()*

## 5. Cách đặt các giá trị tham số phía backend
Sử dụng Firebase console hoặc là Remote Config REST API, bạn có thể tạo mới các giá trị cho Remote Config để nó ghi đè vào các giá trị trong file default. Mình hướng dẫn trên Firebase console nhé:
1. Trên Firebase console, mở project của bạn.
2. Chọn Remote Config từ menu bên trái màn hình console sau đó chọn **Add parameter** .
3. Định nghĩa các tham số bạn cần dùng vào trong này, lưu ý là tên tham số phải trùng với tên mà bạn định nghĩa trong file default (remote_config_defaults.xml) ấy. Với mỗi parameter bạn có thể tạo các giá trị mặc định hoặc giá trị điều kiện.

![](https://images.viblo.asia/336b54fe-79d7-4ad1-b0c4-ee330de911d4.png)

## 6. Fetch and activate các giá trị
1. Để fetch các giá trị từ backend thì sử dụng hàm *fetch()*, những giá trị ở backend sẽ được lấy về và lưu trong đối tượng Remote Config.
2. Để sử dụng được thì gọi thêm phương thức *active()* 
Trong trường hợp mà bạn muốn fetch và active cùng 1 nơi thì hãy sử dụng phương thức* fetchAndActivate() * 
```swift
remoteConfig.fetchAndActivate()
        .addOnCompleteListener(this) { task ->
            if (task.isSuccessful) {
                val updated = task.result
                Log.d(TAG, "Config params updated: $updated")
                Toast.makeText(this, "Fetch and activate succeeded",
                        Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "Fetch failed",
                        Toast.LENGTH_SHORT).show()
            }
            displayWelcomeMessage()
        }
```
Bởi vì những tham số này ảnh hưởng đến giao diện và trải nghiệm người dùng, cho nên bạn bên fetch và active các giá trị cùng  một thời điểm để cho app được mượt hơn.

## 7. Throttling

Nếu ứng dụng của bạn fetch quá nhiều lần trong một khoảng thời gian ngắn thì cái lời gọi fetch sẽ được điều tiết và SDK trả về FirebaseRemoteConfigFetchThrottledException. Khi version SDK < 17.0.0 thì giới hạn 5 request trong mỗi giờ. Trong quá trình phát triền và test thì bạn muốn thời gian fetch nó ngắn hơn nữa, có thể điều chỉnh được bằng cách  sử dụng *FirebaseRemoteConfigSettings.setMinimumFetchIntervalInSeconds(long)*  với khoảng thời gian fetch thấp theo mong muốn.

Và mặc định thì thời gian request sẽ là 12 giờ, thời gian mặc định sẽ được xác định theo độ ưu tiên sau:
1. Tham số truyền vào trong phương thức *fetch(long)*
2. Tham số trong *FirebaseRemoteConfigSettings.setMinimumFetchIntervalInSeconds(long)* 
3. Mặc định là 12 giờ.

Nhớ rằng *FirebaseRemoteConfigSettings.Builder.setMinimumFetchIntervalInSeconds(long)* chỉ sử dụng cho bản develop chứ không sử dụng cho bản product.

Bài viết của mình đến đây là kết thúc, chúc mọi người code vui vẻ! :D

Tham khảo: 
https://firebase.google.com/docs/remote-config/use-config-android