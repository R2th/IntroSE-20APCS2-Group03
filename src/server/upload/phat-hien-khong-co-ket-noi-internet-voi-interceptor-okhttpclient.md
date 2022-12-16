iOS với thư viện Alamofire tự động cung cấp khả năng phát hiện khi không kết nối dữ liệu. Tuy nhiên, thư viện Android OkHttp không cung cấp điều đó theo mặc định.

Trong bìa viết này,  sẽ chỉ ra cách thiết lập phát hiện không có kết nối internet trong OkHttp, việc này chỉ cần được thực hiện một lần trong code của bạn và được sử dụng bởi tất cả các network call.

Chúng ta sẽ thực hiện theo thứ tự từ duới lên.

### Thêm interceptor vào OkHttpClient
Trong Android chúng ta thường sử dụng OkHttpClient cho các network call.

OkHttp cung cấp một cách để chặn(intercept) các network call thông qua [plugin này](https://square.github.io/okhttp/interceptors/) khi thêm nó vào OkHttpClient. Chúng ta chỉ cần tạo Interceptor của chúng ta cho bất kỳ chức năng cụ thể nào muốn làm, trong trường hợp này, đó là "kiểm tra không có Internet".

Để làm cho OKHttpClicnt nhận biết được khi không có internet, chúng ta sẽ cung cấp một đối tượng NoConnectionInterceptor.
```java
OkHttpClient.Builder()
    .addInterceptor(NoConnectionInterceptor(context))
    .build()
```
### Tạo class NoConnectionInterceptor
####  Phát hiện kết nối WIFI và Dữ liệu di động đang tắt
Để làm điều đó, đầu tiên chúng ta cần xin quyền trong Manifest.xml
```java
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```
Sau đó viết code để iểm tra kết nối:

Đầu tiên, sử dụng ConnectionManager từ Context,  nó sẽ cung cấp cho cho chúng ta thông tin về tính khả dụng của mạng.

```kotlin
val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
```

Trước Android Marshmallow, chúng ta sẽ phải lấy dữ liệu từ activeNetworkInfo trong ConnectionManager.
```kotlin
private fun preAndroidMInternetCheck(
      connectivityManager: ConnectivityManager): Boolean {
  val activeNetwork = connectivityManager.activeNetworkInfo
  if (activeNetwork != null) {
    return (activeNetwork.type == ConnectivityManager.TYPE_WIFI ||
          activeNetwork.type == ConnectivityManager.TYPE_MOBILE)
  }
  return false
}
```
Nhưng từ Android Marshmallow trở đi, chúng tôi sẽ phải lấy từ activeNetwork của ConnectionManager.
```kotlin
private fun postAndroidMInternetCheck(
      connectivityManager: ConnectivityManager): Boolean {
  val network = connectivityManager.activeNetwork
  val connection = 
    connectivityManager.getNetworkCapabilities(network)
    
  return connection != null && (
    connection.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) ||
    connection.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR))
}
```

Sau đó kết hợp chúng lại với nhau như dưới đây.
```kotlin
private fun isConnectionOn(): Boolean {
    val connectivityManager = 
      context.getSystemService(Context.CONNECTIVITY_SERVICE) as    
          ConnectivityManager

    return if (android.os.Build.VERSION.SDK_INT >= 
        android.os.Build.VERSION_CODES.M) {
        postAndroidMInternetCheck(connectivityManager)
    } else {
        preAndroidMInternetCheck(connectivityManager)
    }
}
```
> Tham khảo [repo này](https://github.com/elye/demo_android_no_network_interceptor/blob/master/app/src/main/java/com/elyeproj/networkexperiment/NoConnectionInterceptor.kt) để xem code đầy đủ.
>
#### Phát hiện Internet có sẵn
Code trên chỉ là phát hiện WiFi hoặc Dữ liệu di động được BẬT. Nhưng điều đó không đảm bảo được là  có mạng Internet hay không.

Chúng ta thực hiện network call, nó sẽ timeout và trả lại lỗi thích hợp nếu không có internet. Tuy nhiên, để đáp ứng nhanh chóng khi không có internet, chúng ta có thể thực hiện kết nối  với DNS công cộng của Google (8.8.8.8) để kiểm tra:

```kotlin
private fun isInternetAvailable(): Boolean {
    return try {
        val timeoutMs = 1500
        val sock = Socket()
        val sockaddr = InetSocketAddress("8.8.8.8", 53)

        sock.connect(sockaddr, timeoutMs)
        sock.close()

        true
    } catch (e: IOException) {
        false
    }
}
```
> Tham khảo từ câu trả lời trên [StackOverFlow](https://stackoverflow.com/questions/1560788/how-to-check-internet-access-on-android-inetaddress-never-times-out/27312494#27312494)
> 

#### Kết hợp hai phần kiểm tra trên trong Interceptor
Chúng ta  tạo NoConnectionInterceptor, được triển khai từ interface Interceptor:
```kotlin
class NoConnectionInterceptor(
      private val context: Context) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        return if (!isConnectionOn()) {
            throw NoConnectivityException()
        } else if(!isInternetAvailable()) {
            throw NoInternetException()
        } else {
            chain.proceed(chain.request())
        }
    }
    // ... Other Codes ...
}
```

Để làm cho lỗi không có kết nối trở nên có ý nghĩa hơn, hãy tạo 2 Exception như bên dưới:
```kotlin
class NoConnectivityException : IOException() {
 override val message: String
  get() = 
   "No network available, please check your WiFi or Data connection"
}

class NoInternetException() : IOException() {
 override val message: String
  get() = 
   "No internet available, please check your connected WIFi or Data"
}
```

### Tổng kết
Với đoạn code đơn giản trên, giờ đây OKHttpClient của bạn nhận biết được khi không có kết nối. Và bạn có thể dùng nó để thực hiện các network call. Nếu không có internet nó sẽ tự động ném ra Exception thông báo cho bạn. :D


Bài viết được dịch từ [Android: Intercept on no internet connection](https://medium.com/@elye.project/android-intercept-on-no-internet-connection-acb91d305357) của tác giả [Elye](https://medium.com/@elye.project)

Bạn có thể xem full code tại [đây](https://github.com/elye/demo_android_no_network_interceptor?source=post_page-----acb91d305357----------------------).

(thankyou)  :D