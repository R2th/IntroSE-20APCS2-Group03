### Giới thiệu

Một trong những yêu cầu cơ bản của bất kỳ ứng dụng mobile nào ngày nay là kết nối internet. Nếu đã sử dụng bất kỳ ứng dụng dành cho thiết bị di động nào trong một thời gian, bạn có thể đã thấy đâu đó có biểu biểu tượng để cho biết trạng thái kết nối mạng ở  trên cmàn hình, dựa trên giao diện người dùng ứng dụng.

Thực hiện tính năng này có hai lợi thế. Trước tiên, người dùng biết rằng họ đang offline để họ có thể thực hiện hành động thích hợp. Thứ hai, nếu bạn triển khai đúng cách, thì giao diện người dùng của app trông đẹp hơn.

### Những thứ cần tìm hiểu

Đây là một trong những tính năng có vẻ dễ xử lý nhưng liên quan đến việc hiểu về cách mọi thứ hoạt động trong `ConnectivityManager`. Ở đây, chúng ta sử dụng `ConnectivityManager` để lấy thông tin của kết nối mạng và sau đó chúng ta sử dụng `LiveData` để thông báo kết quả tới view dưới dạng `sealed class`. Chúng ta cũng sẽ sử dụng `Kotlin coroutines` để giải quyết vấn đề real-time với các Android APIs. Mọi người nên tìm hiểu trước về những kiến thức này nếu chưa nắm được.

### Sealed Class

[Theo Kotlin docs](https://kotlinlang.org/docs/sealed-classes.html),  Sealed classes và interfaces đại diện cho các cấu trúc phân cấp lớp bị hạn chế cung cấp nhiều quyền kiểm soát hơn đối với việc kế thừa (*Sealed classes and interfaces represent restricted class hierarchies that provide more control over inheritance*).

Bắt đầu bằng cách tạo sealed class đơn giản với hai trạng thái, network available và not available. Sealed classes phù hợp cho mục đích này và chúng giúp dễ dàng xử lý các trạng thái tại trong class. Đây là một sealed class đơn giản:

```kotlin
sealed class NetworkStatus {
    object Available : NetworkStatus()
    object Unavailable : NetworkStatus()
}
```

Bạn có thể truyền message để hiển thị ở mỗi trạng thái dưới dạng tham số nếu thấy cần thiết.

### Monitor network class cần những gì

Class mà chúng ta sắp tạo đáp ứng vài điều sau để nó dễ dàng áp dụng nhưng vẫn cung cấp các tính năng ngon nghẻ và chuẩn xác.

- Nó phản hồi tới View và nhận biết được `Lifecycle-aware`.
- Nó phải dễ dàng được tái sử dụng trên các thành phần khác nhau.
- Nó phải luôn cập nhật thông tin trạng thái mạng mới nhất.

### Tận dụng lợi thế của LiveData

Như đã đề cập ở trên, chúng ta sẽ sử dụng `LiveData`. Như chúng ta đã biết, `LiveData` nhận biết vòng đời và đáp ứng với Vòng đời của View. Chúng ta có thể mở rộng class `LiveData<NetworkStatus>`thành class `NetworkStatusHelper` kiểu như này:

```kotlin
class NetworkStatusHelper() : LiveData<NetworkStatus>() { }
```

Sau đó chúng ta override hai function `onActive` và `onInactive`. Ta có thể sử dụng hai function này để tiếp tục và ngừng theo dõi trạng thái mạng từ hệ thống, bạn sẽ thấy trong phần tiếp theo. Nó sẽ giải quyết vấn đề đầu tiên:

```kotlin
class NetworkStatusHelper() : LiveData<NetworkStatus>() {

    override fun onActive() {
        super.onActive()
    }

    override fun onInactive() {
        super.onInactive()
    }
    
}
```

Sử dụng `LiveData` như giúp việc tái sử dụng trên các thành phần Android trở nên dễ dàng hơn, điều này giải quyết được vấn đề thứ hai.

### Monitor network connection

Phần tiếp theo là thiết lập kết nối với hệ thống qua đó chúng ta có thể quan sát trạng thái kết nối mạng. Điều này có thể được thực hiện thông qua `ConnectivityManager`. Để truy cập `ConnectivityManager`, chúng ta cần có `context` và cách dễ nhất để truyền context là thông qua constructor:

```kotlin
class NetworkStatusHelper(private val context: Context) : LiveData<NetworkStatus>() {
    
    var connectivityManager: ConnectivityManager =
            context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    
}
```

### Network connection listener

Sau khi đã tạo instance của `ConnectivityManager`, phần tiếp theo là tạo callback để quan sát những thay đổi trong kết nối mạng ở cấp hệ thống. Ở đây chúng ta sử dụng `ConnectivityManager.NetworkCallback`:

```kotlin
fun getConnectivityManagerCallback() =
object : ConnectivityManager.NetworkCallback(){
    override fun onAvailable(network: Network) {
        super.onAvailable(network)
    }

    override fun onLost(network: Network) {
        super.onLost(network)
    }

    override fun onCapabilitiesChanged(network: Network, networkCapabilities: NetworkCapabilities) {
        super.onCapabilitiesChanged(network, networkCapabilities)
        
    }
}
```

Phần tiếp theo là sử lý trong các override functions . Bắt đầu với function `onAvailable`:

```kotlin
val valideNetworkConnections : ArrayList<Network> = ArrayList()
override fun onAvailable(network: Network) {
    super.onAvailable(network)
    val networkCapability = connectivityManager.getNetworkCapabilities(network)
    val hasNetworkConnection = networkCapability?.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)?:false
    if (hasNetworkConnection){
        // network connection available
        valideNetworkConnections.add(network)
        announceStatus()
    }
}

fun announceStatus(){
    if (valideNetworkConnections.isNotEmpty()){
        postValue(NetworkStatus.Available)
    } else {
        postValue(NetworkStatus.Unavailable)
    }
}
```

Trong bước đầu tiên, chúng ta lấy network capabilities từ `ConnectivityManager`, sau đó kiểm tra xem nó có internet capability hay không. Sau đó, chúng ta sẽ duy trì một danh sách các mạng hợp lệ và nếu danh sách không rỗng, thì hiển thị `network available` nếu không là `not available`..

Sau đó đến function `onLost`, nơi chúng ta xóa mạng khỏi danh sách và cập nhật `LiveData`:

```kotlin
override fun onLost(network: Network) {
    super.onLost(network)
    valideNetworkConnections.remove(network)
    announceStatus()
}
```

Cuối cùng, hàm `onCapabilitiesChanged` được gọi bất cứ khi nào network capabilities được cập nhật. Tại đây, chúng ta sẽ kiểm tra lại internet capability của mạng và thực hiện hành động thích hợp:

```kotlin
override fun onCapabilitiesChanged(network: Network, networkCapabilities: NetworkCapabilities) {
    super.onCapabilitiesChanged(network, networkCapabilities)
    if (networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)){
        valideNetworkConnections.add(network)
    } else {
        valideNetworkConnections.remove(network)
    }
    announceStatus()
}
```

### Register/Unregister connectivityManager Callbacks

Một trong những phương pháp hay nhất để tiết kiệm tài nguyên hệ thống là không sử dụng chúng khi không được yêu cầu. Để làm được điều này trong NetworkStatusHelper, chúng ta sẽ sử dụng `onActive` và `onInactive` của `LiveData`:

```kotlin
class NetworkStatusHelper(private val context: Context) : LiveData<NetworkStatus>() {
    
    ....
    
    override fun onActive() {
        super.onActive()
        ....
        connectivityManager.registerNetworkCallback(networkRequest, connectivityManagerCallback)
    }

    override fun onInactive() {
        super.onInactive()
        connectivityManager.unregisterNetworkCallback(connectivityManagerCallback)
    }
}
```

### Cách sử dụng

Cuối cùng thì cũng đến lúc sử dụng cái `NetworkStatusHelper` vừa được tạo để quan sát trạng thái kết nối mạng từ Activity và hiển thị thông báo thích hợp cho người dùng:

```kotlin
NetworkStatusHelper(this@MainActivity).observe(this, {
    textViewMessage.text = when(it){
        NetworkStatus.Available -> display("Network Connection Established")
        NetworkStatus.Unavailable -> display("No Internet")
    }
})
```

Bạn có thể thêm đoạn code này vào trong hàm onCreate của activity hoặc fragment.
### Sự cố với Android APIs

Có một số lỗi trong các API Android. Ví dụ, khi sử dụng function `onAvailable`, nó phát ra trạng thái kết nối mạng nhưng thực tế lại không kết nối được mạng đó. Để kiểm tra xem mạng có kết nối internet thật hay không, chúng ta cần thực hiện network call và xác định khả năng internet của mạng trê với kết quả thu được.

Để làm điều này, ta sẽ tạo mộ object `InernetAvailablity` Kotlin với một single function. Kiểu trả về của hàm là Boolean: true nếu nó có quyền truy cập internet ngược lại  là false:

```kotlin
object InernetAvailablity {

    fun check() : Boolean {
        return try {
            val socket = Socket()
            socket.connect(InetSocketAddress("8.8.8.8",53))
            socket.close()
            true
        } catch ( e: Exception){
            e.printStackTrace()
            false
        }
    }
}
```

Nếu socket kết nối không có bất kỳ exception nào, chúng ta xác định mạng có kết nối internet hoặc không.

Bây giờ chúng ta cần execute nó trong hàm `onAvailable` và `onCapabilitiesChanged` với coroutine scope và chỉ khi nó có khả năng kết nối internet, chúng ta mới cần thêm mạng vào danh sách:

```kotlin
override fun onAvailable(network: Network) {
    super.onAvailable(network)
    val networkCapability = connectivityManager.getNetworkCapabilities(network)
    val hasNetworkConnection = networkCapability?.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)?:false
    if (hasNetworkConnection){
        CoroutineScope(Dispatchers.IO).launch{
            if (InernetAvailablity.check()){
                withContext(Dispatchers.Main){
                    valideNetworkConnections.add(network)
                    announceStatus()
                }
            }
        }
    }
}

override fun onCapabilitiesChanged(network: Network, networkCapabilities: NetworkCapabilities) {
    super.onCapabilitiesChanged(network, networkCapabilities)
    if (networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)){
        CoroutineScope(Dispatchers.IO).launch{
            if (InernetAvailablity.check()){
                withContext(Dispatchers.Main){
                    valideNetworkConnections.add(network)
                    announceStatus()
                }
            }
        }
    } else {
        valideNetworkConnections.remove(network)
    }
    announceStatus()
}
```

### Cuối cùng đây là code hoàn chỉnh

```kotlin
sealed class NetworkStatus {
    object Available : NetworkStatus()
    object Unavailable : NetworkStatus()
}

class NetworkStatusHelper(private val context: Context) : LiveData<NetworkStatus>() {

    val valideNetworkConnections : ArrayList<Network> = ArrayList()
    var connectivityManager: ConnectivityManager =
            context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    private lateinit var connectivityManagerCallback: ConnectivityManager.NetworkCallback

    fun announceStatus(){
        if (valideNetworkConnections.isNotEmpty()){
            postValue(NetworkStatus.Available)
        } else {
            postValue(NetworkStatus.Unavailable)
        }
    }

    fun getConnectivityManagerCallback() =
    object : ConnectivityManager.NetworkCallback(){
        override fun onAvailable(network: Network) {
            super.onAvailable(network)
            val networkCapability = connectivityManager.getNetworkCapabilities(network)
            val hasNetworkConnection = networkCapability?.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)?:false
            if (hasNetworkConnection){
                determineInternetAccess(network)
            }
        }

        override fun onLost(network: Network) {
            super.onLost(network)
            valideNetworkConnections.remove(network)
            announceStatus()
        }

        override fun onCapabilitiesChanged(network: Network, networkCapabilities: NetworkCapabilities) {
            super.onCapabilitiesChanged(network, networkCapabilities)
            if (networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)){
                determineInternetAccess(network)
            } else {
                valideNetworkConnections.remove(network)
            }
            announceStatus()
        }
    }

    private fun determineInternetAccess(network: Network) {
        CoroutineScope(Dispatchers.IO).launch{
            if (InernetAvailablity.check()){
                withContext(Dispatchers.Main){
                    valideNetworkConnections.add(network)
                    announceStatus()
                }
            }
        }
    }


    override fun onActive() {
        super.onActive()
        connectivityManagerCallback = getConnectivityManagerCallback()
        val networkRequest = NetworkRequest
                .Builder()
                .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                .build()
        connectivityManager.registerNetworkCallback(networkRequest, connectivityManagerCallback)
    }

    override fun onInactive() {
        super.onInactive()
        connectivityManager.unregisterNetworkCallback(connectivityManagerCallback)
    }
    
}

object InernetAvailablity {

    fun check() : Boolean {
        return try {
            val socket = Socket()
            socket.connect(InetSocketAddress("8.8.8.8",53))
            socket.close()
            true
        } catch ( e: Exception){
            e.printStackTrace()
            false
        }
    }

}
```

### Reference
 - https://betterprogramming.pub/how-to-monitor-internet-connection-in-android-using-kotlin-and-livedata-135de9447796