# Giới thiệu

Tìm hiểu kĩ thuật cũng đã lâu nên nay mình xin phép đổi món chuyển sang viết về việc làm ứng dụng như thế nào.

Mình thỉnh thoảng hay nghịch dò pass wifi xung quanh bằng cách dùng điện thoại nhập thử một số pass phổ biến và nhận thấy có khá nhiều wifi đặt pass rất đơn giản mà nếu có thể tự động việc nhập pass, kết nối thử pass, thành công thì ngon rồi vào dùng thôi chứ gì nữa, còn thất bại thì thử pass khác, thử cỡ 30 cái pass trong danh sách pass phổ biến nhất thôi, toạch hết thì gia chủ đặt pass khó rồi, thôi qua hỏi cho nhanh chứ dò nữa mắc công :D

Và sau một thời gian mò mẫm lâu lâu suýt drop mấy lần thì mình cũng có ra được một bản dùng được để giới thiệu với mọi người.

![](https://images.viblo.asia/a9da14fa-ef9a-4561-ae1a-32a1fccc4100.png)


Fanpage https://www.facebook.com/wifihunter.vn

Tải app: https://raw.githubusercontent.com/dangquanuet/wifi-hunter-public/develop/apk/wifi-hunter-version-1-0-2.apk

Ứng dụng android Wifi Hunter cho phép bạn quét wifi xung quanh, kết nối bằng cách nhập pass, hoặc hunt pass. Ứng dụng có thể chạy offline.

Như mình đã nói ở trên thì ứng dụng chỉ tự động việc dò tìm trên khoảng 30 pass wifi phổ biến nhất chứ không đảm bảo 100% dò ra pass wifi.

Theo mình biết thì có nhiều cách để tìm pass wifi với tỷ lệ thành công lớn hơn hoặc thậm chí 100% nhưng đương nhiên là nó cũng không dễ với người dùng phổ thông nên mình sẽ ko bàn hay tranh luận ở đây.

Ứng dụng làm với mục đích vui là chính, phi lợi nhuận chỉ dò pass để dùng khi không có mạng, không có ý định làm hại ai cả nên mọi người cân nhắc khi sử dụng và không chỉ trích mình.

Có thể bạn sẽ hỏi là tại sao mình không cho app lên google play store thì mình trả lời luôn là app vi phạm policy nên nếu up thì bị chém ngay đừng hỏi tại sao account bị khóa. Nếu không qua google play store thì bạn có thể update app không thì mình xin trả lời là có và cách làm mình sẽ trình bày ở bên dưới.

Và dự án này không có open source nên mình chỉ chia sẻ cách làm thôi nhé :D

# Chốt spec
- Dò pass các wifi xung quanh dựa theo 30 pass phổ biến nhất
- Có thể kết nối thủ công bằng cách nhập pass
- Chia sẻ pass
- Lưu lịch sử hunt
- Ứng dụng chạy offline

# Design

Do không chuyên lắm về design nên mình vừa làm vừa sửa, UI của app cũng đã được sửa vài lần với tiêu chí đơn giản dễ dùng nhất có thể.

![](https://images.viblo.asia/53b532a8-8a60-4c27-9a23-97d515abc870.png)

![](https://images.viblo.asia/00f72776-0153-411b-8728-7e744de65674.png)

# Implement

## Khởi tạo project

Sử dụng base project MovieDB mình đã tạo từ lâu và tiếp tục maintain với những công nghệ mới của android.

https://github.com/dangquanuet/The-Movie-DB-Kotlin

## Tạo danh sách 30 pass wifi phổ biến

Danh sách này thì bạn có thể lên mạng tìm dễ dàng

```
["12345678","123456789","88888888","87654321","987654321","66666666","1234567890","0987654321","888888888","8888888888","66668888","68686868","99999999","00000000","11111111","22222222","33333333","44444444","55555555","77777777","password","qwertyui","qwertyuiop","asdfghjkl","abcdefgh","1q2w3e4r","1a2b3c4d","abcd1234","1234abcd","12341234","abcdabcd"]
```

## Dò pass các wifi xung quanh dựa theo 30 pass phổ biến nhất

Để thực hiện việc dò pass wifi xung quanh thì ứng dụng cần làm các việc sau

- Scan wifi xung quanh
- Kết nối tới wifi
- Bắt trạng thái kết nối thành công hay thất bại
- Thành công thì vào xài
- Thất bại thì thử pass tiếp theo cho tới khi kết thúc

### Scan wifi xung quanh

Để có thể hiển thị danh sách wifi xung quanh thì bạn sẽ cần wifiManager để scan và lắng nghe broadcast action `WifiManager.SCAN_RESULTS_AVAILABLE_ACTION`

```kotlin
    private val wifiManager: WifiManager by lazy {
        applicationContext?.getSystemService(Context.WIFI_SERVICE) as WifiManager
    }
    
    wifiManager.startScan()
    
    private val wifiConnectivityReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            when (intent?.action) {
                WifiManager.SCAN_RESULTS_AVAILABLE_ACTION -> {
                    if (intent.getBooleanExtra(WifiManager.EXTRA_RESULTS_UPDATED, false)) {
                        // scan wifi success, update available wifi list
                    }
                }
```

### Kết nối tới wifi
```kotlin
/**
 * format wifi ssid
 */
fun formatSsid(ssid: String?): String {
    return "\"$ssid\""
}

/**
 * format wifi password
 */
fun formatPassword(password: String?): String {
    return "\"$password\""
}

        // create netId
        val netId = wifiManager.addNetwork(WifiConfiguration().apply {
            SSID = formatSsid(ssid)
            preSharedKey = formatPassword(password)
        })

        // connect to netId
        wifiManager.apply {
            disconnect()
            enableNetwork(netId, true)
            reconnect()
        }
```

### Bắt trạng thái kết nối thành công hay thất bại
```kotlin
    private val connectivityStatusReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val networkInfo = intent.getParcelableExtra<NetworkInfo>(WifiManager.EXTRA_NETWORK_INFO)
            val activeNetworkInfo = connectivityManager.activeNetworkInfo
            if (networkInfo == null) {
                if (intent.action == WifiManager.SUPPLICANT_STATE_CHANGED_ACTION
                    && intent.hasExtra(WifiManager.EXTRA_SUPPLICANT_ERROR)
                ) {
                    // failed to connect
                    handleConnectFailed()
                }
            } else {
                if (networkInfo.isConnected) {
                    // connected
                    handleConnectedToNetwork()
                }
            }
        }
    }
```

## Có thể kết nối thủ công bằng cách nhập pass

Phần này thì chỉ cần làm giao diện cho user nhập pass rồi thực hiện như phần Kết nối tới wifi

## Chia sẻ pass

Chia sẻ pass đơn giản thì có thể dùng intent share, hoặc đầu tư thêm thì bạn có thể dùng thư viện để gen thông tin wifi: tên + pass thành QR code và chia sẻ ảnh qr code này thì ng khác ko cần phải nhập pass thủ công để kết nối đến nữa.

## Lưu lịch sử hunt

Cái này thì sử dụng Room thôi

## Ứng dụng chạy offline

Với cách dò wifi hiện tại thì ứng dụng hoàn toàn có thể chạy offline mà không cần mạng.

## Cập nhật ứng dụng

Do ứng dụng không thể đưa lên google play store nên mình cần tự xây dựng một cơ chế để update ứng dụng và mình đã có bài viết về việc này trước đây, các bạn có thể tham khảo

https://viblo.asia/p/tu-xay-dung-co-che-update-app-khi-khong-co-google-play-store-4P856OB1KY3

## Runtime permission

Để thực hiện scan wifi và kiểm tra wifi state thì bạn sẽ cần runtime permission nên các bạn có thể tham khảo việc xử lý request runtime permission ở đây.

https://viblo.asia/p/tu-refactor-phan-request-runtime-permission-trong-android-bJzKmjqrZ9N

## Hunt Service

Bạn hoàn toàn có thể đưa phần kết nối tới wifi vào một service để vẫn có thể dùng app khác trong quá trình đang hunt, đương nhiên là lúc ấy ko thể dùng mạng :D

# Kết

Bài viết hôm nay đến đây là hết, hẹn gặp lại các bạn sau và hãy dùng thử xem app như thế nào nhé :D

Fanpage https://www.facebook.com/wifihunter.vn

Tải app: https://raw.githubusercontent.com/dangquanuet/wifi-hunter-public/develop/apk/wifi-hunter-version-1-0-2.apk