Android Q đã có phiên bản beta và được giới thiệu rất nhiều tính năng thú vị cho cả user và developer. Ở bài viết này mình sẽ chỉ focus vào những điểm mới dành cho các developer.

## Tăng cường bảo mật
Android Q giới thiệu một số tính năng bảo mật được tóm tắt như sau:

### Cải thiện dialog xác thực sinh trắc học

#### Chỉ định yêu cầu xác thực người dùng

Từ bây giờ, bạn có thể cung cấp một gợi ý cho hệ thống không yêu cầu xác thực người dùng sau khi đã xác thực bằng phương thức sinh trắc học ẩn. Ví dụ: yêu cầu không xác thực thêm sau khi người dùng đã xác thực bằng nhận diện khuôn mặt.

Mặc định, hệ thống thông thường sẽ yêu cầu user xác thực với các hành động nhạy cảm hoặc có rủi ro cao (ví dụ như purchase trên store). Tuy nhiên, nếu bạn có một số hành động với rủi ro thấp cho ứng dunhj, bạn có thể cung cấp gợi ý để user không yêu cầu authentication bằng cách truyền false vào phương thức [setConfirmationRequired(](https://developer.android.com/reference/android/hardware/biometrics/BiometricPrompt.Builder.html#setConfirmationRequired(boolean)). Vì biến này được truyền dưới dạng gợi ý cho hệ thống, hệ thống có thể bỏ qua giá trị nếu người dùng thay đổi cài đặt hệ thống của họ để xác thực sinh trắc học.

![](https://images.viblo.asia/a4b76330-2cc0-4394-8a4d-5c1efb20cc61.png)

*Face authentication mà không có xác thực người dùng*

![](https://images.viblo.asia/9e422408-a9ca-4f28-96db-c2a4a3fb89fc.png)

*Face authentication yêu cầu xác thực của người dùng*

#### Cải thiện hỗ trợ dự phòng cho thông tin đăng nhập thiết bị

Bây giờ bạn có thể yêu cầu hệ thống cho phép người dùng xác thực bằng mã PIN, mẫu hình hoặc mật khẩu của thiết bị nếu họ không thể xác thực bằng cách sử dụng đầu vào sinh trắc học vì một số lý do. Để bật tính năng hỗ trợ dự phòng này, hãy sử dụng phương thức [setDeviceCredentialALLowed()](https://developer.android.com/reference/android/hardware/biometrics/BiometricPrompt.Builder.html#setDeviceCredentialAllowed(boolean)).

Nếu ứng dụng của bạn hiện đang sử dụng [createdConfirmDeviceCredentialIntent()](https://developer.android.com/reference/android/app/KeyguardManager.html#createConfirmDeviceCredentialIntent(java.lang.CharSequence,%20java.lang.CharSequence)) để quay lại thông tin đăng nhập của thiết bị, hãy chuyển sang sử dụng phương thức mới thay thế.

#### Kiểm tra thiết bị để biết khả năng sinh trắc học

Bây giờ bạn có thể kiểm tra xem một thiết bị có hỗ trợ xác thực sinh trắc học hay không trước khi gọi [BiometricPrompt](https://developer.android.com/reference/android/hardware/biometrics/BiometricPrompt) bằng cách sử dụng phương thức [canAuthenticate()](https://developer.android.com/reference/android/hardware/biometrics/BiometricManager.html#canAuthenticate()) trong class [BiometricManager](https://developer.android.com/reference/android/hardware/biometrics/BiometricManager).

### Chạy code DEX nhúng trực tiếp từ APK

Bây giờ bạn có thể yêu cầu nền tảng chạy mã DEX nhúng trực tiếp từ tệp APK của ứng dụng. Tùy chọn này có thể giúp ngăn chặn một cuộc tấn công nếu kẻ tấn công từng cố gắng giả mạo mã được biên dịch cục bộ trên thiết bị.

Để bật tính năng này, hãy đặt giá trị của thuộc tính **android:useEmbeddedDex** thành **true** trong thẻ [<application>](https://developer.android.com/guide/topics/manifest/application-element.html) của tệp kê khai ứng dụng của bạn. Bạn cũng phải xây dựng APK chứa code DEX không nén mà ART có thể truy cập trực tiếp. Thêm các tùy chọn sau vào file config Gradle hoặc Bazel để xây dựng APK với code DEX không nén:
    
**Gradle**

```kotlin
aaptOptions {
   noCompress 'dex'
}
```
    
**Bazel**
    
```kotlin
android_binary(
   ...,
   nocompress_extensions = [“.dex”],
)
```

## Connectivity features
    
Android Q bao gồm một số cải tiến liên quan đến mạng và kết nối.
    
### Wi-Fi network connection API
 
Android Q bổ sung hỗ trợ cho các kết nối ngang hàng (peer-to-peer). Tính năng này cho phép ứng dụng của bạn nhắc người dùng thay đổi điểm truy cập mà thiết bị được kết nối bằng cách sử dụng [WifiNetworkSpecifier](https://developer.android.com/reference/android/net/wifi/WifiNetworkSpecifier) để mô tả các thuộc tính của mạng được yêu cầu. Kết nối ngang hàng được sử dụng cho các mục đích không cung cấp mạng, chẳng hạn như cấu hình bootstrapping cho các thiết bị thứ cấp như phần cứng Chromecast và Google Home.
    
Luồng sử dụng API:
    
1. Tạo trình xác định mạng Wi-Fi bằng [WifiNetworkSpecifier.Builder](https://developer.android.com/reference/android/net/wifi/WifiNetworkSpecifier.Builder).
    
2. Đặt bộ lọc mạng để khớp với các mạng để kết nối cùng với thông tin đăng nhập được yêu cầu.

3. Quyết định kết hợp [SSID](https://developer.android.com/reference/android/net/wifi/WifiNetworkSpecifier.Builder#setssid), mẫu [SSID](https://developer.android.com/reference/android/net/wifi/WifiNetworkSpecifier.Builder#setssidpattern), mẫu [BSSID](https://developer.android.com/reference/android/net/wifi/WifiNetworkSpecifier.Builder#setbssid) và [BSSID](https://developer.android.com/reference/android/net/wifi/WifiNetworkSpecifier.Builder#setbssidpattern) để đặt bộ lọc mạng trong mỗi yêu cầu, tuân theo các yêu cầu sau:
    
    * Mỗi request phải cung cấp ít nhất một mẫu SSID, SSID, BSSID hoặc BSSID
    * Mỗi request chỉ có thể đặt một mẫu SSID hoặc SSID
    * Mỗi request chỉ có thể đặt một mẫu BSSID hoặc BSSID
    
4. Thêm các bộ xác định vào yêu cầu mạng cùng với version [NetworkCallback](https://developer.android.com/reference/android/net/ConnectivityManager.NetworkCallback) để theo dõi trạng thái của request.
    
Nếu người dùng chấp nhận yêu cầu và kết nối với mạng thành công, [NetworkCallback.onAvailable()](https://developer.android.com/reference/android/net/ConnectivityManager.NetworkCallback#onAvailable(android.net.Network)) được gọi trên đối tượng callback. Nếu người dùng từ chối yêu cầu hoặc nếu kết nối với mạng không thành công, [NetworkCallback.onAvailable()](https://developer.android.com/reference/android/net/ConnectivityManager.NetworkCallback#onUnavailable()) được gọi trên object callback.
    
#### Bypassing user approval
    
Khi người dùng chấp thuận một mạng để kết nối để đáp ứng yêu cầu từ một ứng dụng,  thiết bị sẽ lưu phê duyệt cho điểm truy cập cụ thể. Nếu ứng dụng đưa ra yêu cầu cụ thể để kết nối lại điểm truy cập đó, thiết bị sẽ bỏ qua giai đoạn phê duyệt của người dùng và tự động kết nối với mạng. Nếu người dùng chọn quên mạng trong khi được kết nối với mạng do API yêu cầu, thì sự chấp thuận được lưu trữ này cho sự kết hợp giữa ứng dụng và mạng đó sẽ bị xóa và mọi yêu cầu trong tương lai từ ứng dụng sẽ cần được người dùng chấp thuận lại. Nếu ứng dụng đưa ra yêu cầu không cụ thể (chẳng hạn như với mẫu SSID hoặc BSSID), thì người dùng sẽ cần phê duyệt yêu cầu.
    
#### Code sample
    
```kotlin
val specifier = WifiNetworkSpecifier.Builder()
    .setSsidPattern(PatternMatcher("test", PatternMatcher.PATTERN_PREFIX))
    .setBssidPattern(MacAddress.fromString("10:03:23:00:00:00"), MacAddress.fromString("ff:ff:ff:00:00:00"))
    .build()

val request = NetworkRequest.Builder()
    .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
    .removeCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    .setNetworkSpecifier(specifier)
    .build()

val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

val networkCallback = object : ConnectivityManager.NetworkCallback() {
    ...
    override fun onAvailable(network: Network?) {
        // do success processing here..
    }

    override fun onUnavailable() {
        // do failure processing here..
    }
    ...
}
connectivityManager.requestNetwork(request, networkCallback)
...
// Release the request when done.
connectivityManager.unregisterNetworkCallback(networkCallback)
```
    
### Wi-Fi network suggestion API
    
Android Q bổ sung hỗ trợ cho ứng dụng để thêm thông tin mạng cho thiết bị tự động kết nối với điểm truy cập Wi-Fi. Bạn có thể cung cấp các đề xuất cho mạng nào sẽ kết nối bằng cách sử dụng [WifiNetworkSuggestion](https://developer.android.com/reference/android/net/wifi/WifiNetworkSuggestion). Nền tảng cuối cùng chọn điểm truy cập nào để chấp nhận dựa trên đầu vào từ ứng dụng của bạn và những người khác.
    
Đoạn code sau sẽ cho chúng ta thấy cách cung cấp thông tin đăng nhập cho một open network, một WPA2 và một WPA3 network:
    
 ```kotlin
    val suggestion1 = WifiNetworkSuggestion.Builder()
        .setSsid("test111111")
        .setIsAppInteractionRequired() // Optional (Needs location permission)
        .build()

val suggestion2 = WifiNetworkSuggestion.Builder()
        .setSsid("test222222")
        .setWpa2Passphrase("test123456")
        .setIsAppInteractionRequired() // Optional (Needs location permission)
        .build()

val suggestion3 = WifiNetworkSuggestion.Builder()
        .setSsid("test333333")
        .setWpa3Passphrase("test6789")
        .setIsAppInteractionRequired() // Optional (Needs location permission)
        .build()

val suggestionsList = listOf(suggestion1, suggestion2, suggestion3)

val wifiManager = context.getSystemService(Context.WIFI_SERVICE) as WifiManager

val status = wifiManager.addNetworkSuggestions(suggestionsList);
if (status != WifiManager.STATUS_NETWORK_SUGGESTIONS_SUCCESS) {
    // do error handling here
}

// Optional (Wait for post connection broadcast to one of your suggestions)
val intentFilter = IntentFilter(WifiManager.ACTION_WIFI_NETWORK_SUGGESTION_POST_CONNECTION);

val broadcastReceiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (!intent.action.equals(WifiManager.ACTION_WIFI_NETWORK_SUGGESTION_POST_CONNECTION)) {
            return;
        }
        // do post connect processing here
    }
};
context.registerReceiver(broadcastReceiver, intentFilter);
 ```
    
Các đề xuất từ ​​ứng dụng phải được người dùng chấp thuận trước khi bắt đầu kết nối với họ. Sự chấp thuận này được cung cấp bởi người dùng để phản hồi lại thông báo lần đầu tiên tìm thấy một mạng phù hợp với một trong những gợi ý từ ứng dụng trong kết quả quét. Khi kết nối với một trong các đề xuất mạng, cài đặt sẽ hiển thị văn bản thuộc tính kết nối mạng với ứng dụng suggest tương ứng.
    
#### Kiểm soát user disconnects
  
Nếu người dùng sử dụng trình chọn Wi-Fi để ngắt kết nối khỏi một trong các đề xuất mạng, thì mạng đó sẽ bị liệt vào blacklist trong 24 giờ. Trong thời gian backlist, mạng đó sẽ không được xem xét để tự động kết nối, ngay cả khi ứng dụng xóa và thêm lại đề xuất mạng tương ứng với mạng.
    
#### Thay đổi trạng thái phê duyệt cho ứng dụng
    
Một người dùng từ chối thông báo đề xuất mạng sẽ xóa quyền CHANGE_WIFI_STATE khỏi ứng dụng. Người dùng có thể cấp phê duyệt này sau bằng cách vào menu điều khiển Wi-Fi (Cài đặt> Ứng dụng & thông báo> Truy cập ứng dụng đặc biệt> Điều khiển Wi-Fi> Tên ứng dụng).
    
Trên đây mình đã giới thiệu một số chức năng mới dành cho developer trên phiên bản Android Q mới beta này. Mình sẽ giới thiệu các chức năng mới ở bài sau. Cảm ơn các bạn đã đọc bài của mình :D