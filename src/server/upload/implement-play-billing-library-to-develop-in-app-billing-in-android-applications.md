## I. In-App Billing là gì?
Khi chúng ta phát triển ứng dụng có chức năng cho phép người dùng mua hàng trong ứng dụng như ứng dụng Candy Crush Saga dưới đây thì lúc này chúng ta cần dùng đến In-App Billing.

![](https://images.viblo.asia/b8bf4d43-d7bc-4a07-84c8-b35b9ee0bd64.jpg)

Trong In-App Billing, các mặt hàng được gọi là các **SKU**. Có hai loại mặt hàng để user mua đó là **Purchase** và **Subscription**. 
### 1. Purchase
Purchase được gọi là các vật phẩm, sản phẩm mà người dùng có thể mua và sử dụng ngay tại trong ứng dụng hoặc game. 

![](https://images.viblo.asia/bd19141b-e96f-4aae-943e-70aec2c43911.jpg)

                                                        Hình ảnh minh họa cho Purchase

### 2. Subscription
Subscription là các sản phẩm, nội dung, dịch vụ hay tính năng ở bên trong ứng dụng của bạn bằng cách trả tiền hàng tháng hoặc định kỳ.

![](https://images.viblo.asia/ecd4a955-ba19-488d-8db1-f9f785092b2a.jpg)

                                                        Hình ảnh minh họa cho Subscription

## II. Implement Play Billing Library
Trước đây, mình nhớ để phát triển chức năng mua hàng trong ứng dụng phải sử dụng class InAppBillingService và công việc này không hề dễ dàng. Tuy nhiên kể từ ngày 19/09/2017, công việc này trở nên khá dễ dàng bởi thư viện **Play Billing Library** do chính Google phát hành. Và bài viết này chủ yếu để giới thiệu cách implement thư viện này.
### Bước 1: Thêm thư viện Play Billing Library vào:
```kotlin
implementation 'com.android.billingclient:billing:1.0'
```
Sau khi thêm thư viện này, nó sẽ tự động thêm **permission com.android.vending.BILLING** mà chúng ta không cần phải thêm nó một cách thủ công trong Manifest.
### Bước 2:  Xây dựng class InAppBillingManager để quản lý các giao dịch mua hàng trong ứng dụng
Chúng ta cần một instance của lớp BillingClient. BillingClient có thể được khởi tạo bằng cách sử dụng phương thức tĩnh newBuilder(). BillingClient cần lắng nghe interface PurchasingUpdatedListener để lắng nghe khi user mua hàng hoặc tiêu thụ hàng (chi tiết hơn về interface PurchasingUpdatedListener này sẽ được nói đến trong mục III phần 5 của bài viết này).
```kotlin
class InAppBillingManager(private val context: Context) : PurchasesUpdatedListener {
    private val billingClient: BillingClient

    init {
        billingClient = BillingClient.newBuilder(context).setListener(this).build()
    }
    
    override fun onPurchasesUpdated(responseCode: Int, purchases: List<Purchase>?) {
                // mỗi khi user mua hàng, tiêu thụ thì kết quả mới nhất được trả về biến purchases
    }
}
```
### Bước 3: Start service connection
Tiếp theo, chúng ta cần sử dụng billingClient để start service connection. 
```kotlin
billingClient.startConnection(object : BillingClientStateListener {
        override fun onBillingSetupFinished(@BillingClient.BillingResponse responseCode: Int) {

        }

        override fun onBillingServiceDisconnected() {
        
        }
    })
```
Hãy nhớ rằng sẽ không có bất cứ giao dịch nào thành công cho đến khi dịch vụ này được kết nối. Vì vậy, chúng ta phải thử start service connection lại để theo dõi xem service connection có còn kết nối hay không trước mỗi giao dịch. Bây giờ class InAppBillingManager của chúng ta sẽ như sau:
```kotlin
class InAppBillingManager(private val context: Context) : PurchasesUpdatedListener {
    private val billingClient: BillingClient
    private var isServiceConnected = false
    private var runnable: Runnable? = null

    init {
        billingClient = BillingClient.newBuilder(context).setListener(this).build()
        startServiceConnection()
    }

    private fun startServiceConnection() {
        billingClient.startConnection(object : BillingClientStateListener {
            override fun onBillingSetupFinished(responseCode: Int) {
                if (responseCode == BillingClient.BillingResponse.OK) {
                    isServiceConnected = true
                    runnable?.run()
                }
            }

            override fun onBillingServiceDisconnected() {
                isServiceConnected = false
            }
        })
    }

    private fun executeServiceRequest() {
        if (isServiceConnected) {
                runnable?.run()
        } else {
                startServiceConnection()
        }
    }
}
```
### Bước 4: Thực hiện truy vấn
Sau khi thực hiện 3 bước setup trên. Bây giờ, chúng ta có thể thực hiện các truy vấn cần thiết cho ứng dụng của mình. Giả sử chúng ta đang muốn thực hiện truy vấn khi user click mua hàng trong app. Chúng ta sẽ thực hiện truy vấn bằng phương thức sau:
```kotlin
fun launchBillingFlow(activity: AppCompatActivity) {
        runnable = Runnable {
            val flowParams = BillingFlowParams.newBuilder()
                    .setSku("android.test.purchased")
                    .setType(BillingClient.SkuType.INAPP) // .setType(BillingClient.SkuType.SUBS) nếu mặt hàng là Subscription
                    .build()
           val responseCode = billingClient.launchBillingFlow(activity, flowParams)
        }

        executeServiceRequest()
    }
```
Trong đó chuỗi "android.test.purchased" là Id của mặt hàng hay còn gọi là SKU_ID mà user chọn mua. Id này được tạo ra bằng cách truy cập vào Google Play Console([](https://developer.android.com/distribute/console/))  rồi đăng nhập bằng tài khoản Google Developer của bạn. Sau đó vào tag Store presence và chọn In-app products. 
Còn BillingClient.SkuType.INAPP là type của mặt hàng. Cụ thể có 2 type là BillingClient.SkuType.INAPP nếu mặt hàng là Purchase hoặc BillingClient.SkuType.SUBS nếu mặt hàng là Subscription. Output của function launchBillingFlow là responseCode. Đa số các truy vấn đều trả về responseCode. Response code giúp chúng ta kiểm tra liệu truy vấn có thành công hay xảy ra lỗi và lỗi gì?. Cụ thể có 11 ResponseCode có thể được trả về như sau:
1. BILLING_UNAVAILABLE —Trả về khi version của Billing API không hỗ trợ loại request này
2. DEVELOPER_ERROR — Trả về khi các tham số không chính xác đã được request đến Billing API
3. ERROR — Trả về lỗi chung khi xảy ra lỗi trong khi API được thực thi
4. FEATURE_NOT_SUPPORTED — Trả về khi request không được hỗ trợ bởi play services trên device
5. ITEM_ALREADY_OWNED —Trả về khi người dùng cố gắng mua một mặt hàng mà họ đã sở hữu rồi
6. ITEM_NOT_OWNED — Trả về khi người dùng cố gắng tiêu thụ một mặt hàng mà hiện tại họ không sở hữu
7. ITEM_UNAVAILABLE —  Trả về khi người dùng cố gắng mua một mặt hàng không có sẵn
8. OK — Trả về khi request thành công
9. SERVICE_DISCONNECTED — Trả về khi service connection không được kết nối tại điểm yêu cầu
10. SERVICE_UNAVAILABLE — Trả về khi xảy ra lỗi liên quan đến kết nối mạng của device
11. USER_CANCELED —Trả về khi người dùng cancel request đang diễn ra
### Bước 5: Kết thúc
Vậy là sau khi hoàn thành 4 bước trên, chúng ta đã có 1 class InAppBillingManager hoàn chỉnh:
```kotlin
class InAppBillingManager(private val context: Context) : PurchasesUpdatedListener {
    private val billingClient: BillingClient
    private var isServiceConnected = false
    private var runnable: Runnable? = null

    init {
        billingClient = BillingClient.newBuilder(context).setListener(this).build()
        startServiceConnection()
    }

    private fun startServiceConnection() {
        billingClient.startConnection(object : BillingClientStateListener {
            override fun onBillingSetupFinished(responseCode: Int) {
                if (responseCode == BillingClient.BillingResponse.OK) {
                    isServiceConnected = true
                    runnable?.run()
                }
            }

            override fun onBillingServiceDisconnected() {
                isServiceConnected = false
            }
        })
    }

    private fun executeServiceRequest() {
        if (isServiceConnected) {
            runnable?.run()
        } else {
            startServiceConnection()
        }
    }

    fun launchBillingFlow(activity: AppCompatActivity, skuId: String, productType: String) {
        runnable = Runnable {
            val flowParams = BillingFlowParams.newBuilder()
                    .setSku(skuId)
                    .setType(productType)
                    .build()
            billingClient.launchBillingFlow(activity, flowParams)
        }

        executeServiceRequest()
    }

    override fun onPurchasesUpdated(responseCode: Int, purchases: List<Purchase>?) {
        if (responseCode == BillingClient.BillingResponse.OK && purchases != null && purchases.isNotEmpty()) {
            // Use callback to Update UI
        }
    }
}
```
Và bây giờ sử dụng class InAppBillingManager:

Khởi tạo: 
```kotlin
val inAppBillingManager = InAppBillingManager(applicationContext)
val responseCode = inAppBillingManager.launchBillingFlow(this@MainActivity, "android.test.purchased", BillingClient.SkuType.INAPP)
if(responseCode == BillingClient.BillingResponse.OK){
        // Request thành công
}
```
## III. Một số request khác
### 1. Get danh sách các mặt hàng có sẵn để mua trong ứng dụng
Để làm điều này, chúng ta cần gửi một danh sách các SKU kèm với type của chúng mà chúng ta muốn lấy thông tin chi tiết. Chúng ta bắt đầu bằng cách sử dụng class SkuDetailsParams. Trong ví dụ này, chúng ta sẽ sử dụng type Purchase
```kotlin
val skuList = mutableListOf("android.test.purchased", "minh.pubg.bullet", "minh.ninjafruit.sakurablade")
val params = SkuDetailsParams.newBuilder()
params.setSkusList(skuList).setType(BillingClient.SkuType.INAPP) // .setType(BillingClient.SkuType.SUBS) nếu là Subscription
billingClient.querySkuDetailsAsync(params.build()) { responseCode, skuDetailsList ->
        // check responseCode và get thông tin chi tiết của SKU từ skuDetailsList
}
```
### 2. Get lịch sử mua hàng của user
Chúng ta có thể sử dụng truy vấn queryPurchaseHistoryAsync() hoặc truy vấn queryPurchases() để get lịch sử. Sự khác nhau ở đây là truy vấn queryPurchases() trả về data được get từ bộ nhớ cache của ứng dụng Google Play Store mà truy vấn không yêu cầu kết nối mạng. Còn truy vấn queryPurchaseHistoryAsync() trả về các giao dịch mua gần đây nhất được thực hiện bởi người dùng cho mỗi SKU, ngay cả khi giao dịch đó đã hết hạn, bị hủy hoặc tiêu thụ.
```kotlin
billingClient.queryPurchaseHistoryAsync(BillingClient.SkuType.INAPP) { // BillingClient.SkuType.SUBS nếu là Subscription
    responseCode, result ->
    // check responseCode và get lịch sử mua hàng từ result
}

billingClient.queryPurchases(BillingClient.SkuType.INAPP) // BillingClient.SkuType.SUBS nếu là Subscription
```
### 3. User Tiêu thụ/Sử dụng mặt hàng đã mua
Để tiêu thụ mặt hàng đã mua ta cần truyền purchaseToken của mặt hàng đó. PurchaseToken này được cấp khi user mua item nào đó qua hàm. Chúng ta cũng có thể get  purchaseToken này qua truy vấn get lịch sử mua hàng của user (xem mục III phần 2.) qua hàm purchase.purchaseToken.
```kotlin
billingClient.consumeAsync(purchaseToken) { responseCode, outToken ->
                                           
}
```
### 4. User thực hiện mua hàng
Như đã mô tả trong mục II bước 4.
### 5. Observe Purchases (Lắng nghe sự mua hàng/tiêu thụ của user)
Như đã đề cập trong mục II bước 2: class InAppBillingManager sẽ kế thừa interface PurchasesUpdatedListener và override lại hàm onPurchasesUpdated(). Mỗi khi user mua hàng, tiêu thụ thì kết quả mới nhất được trả về biến purchases trong hàm onPurchasesUpdated()
```kotlin
class InAppBillingManager(private val context: Context) : PurchasesUpdatedListener {
    override fun onPurchasesUpdated(responseCode: Int, purchases: List<Purchase>?) {
                // mỗi khi user mua hàng, tiêu thụ thì kết quả mới nhất được trả về biến purchases
    }
}
```
## IV. Kết luận
Tôi hy vọng từ bài đăng này, bạn đã có thể thấy những lợi ích mà Thư viện PLAY BILLING LIBRARY có thể mang lại khi thực hiện thanh toán trong ứng dụng vào những ứng dụng của bạn.

Tham khảo: 

https://medium.com/exploring-android/exploring-the-play-billing-library-for-android-55321f282929

https://developer.android.com/google/play/billing/billing_library_overview