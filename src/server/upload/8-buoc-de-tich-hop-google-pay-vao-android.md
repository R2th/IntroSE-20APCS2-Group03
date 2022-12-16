Như chúng ta thấy hiện nay thanh toán trên di dộng ngày càng phổ biến vì lợi ích của nó mang lại vô cùng lớn. Có thể kể đến một số dịch vụ thanh toán tích hợp ngay trên hệ điều hành di động như Apple Pay hay Samsung Pay. Và giờ đây trên Android cũng đã hỗ trợ chính thức phương thức thanh toán cho mình đó là Android Pay. Trong nội dung bài viết này tôi sẽ hướng dẫn mọi người cách tích hợp Android Pay vào ứng dụng của mình thông qua 8 bước cơ bản.

![](https://cdn-images-1.medium.com/max/1000/1*CVFXgubfWK2EFhqZuJMUrg.png)
Để tích hợp được Android Pay thì ta cần phải sử dụng *Google Pay API* như một plugin để giúp user thuận tiện để checkout trong app, không cần phải nhập các thông tin về thanh toán trong app (sau khi mà đã setup trước đó rồi). Điều này mang lại cho user nhưng ưu điểm sau :
* Tạo ra 1 môi trường tập trung để có thể dễ dàng hoàn thành thanh toán trong 1 ứng dụng, giống như việc họ thanh toán trên web hoặc trong các cửa hàng
* Một quy trình hợp lí khi hoàn thành giai đoạn thanh toán mua hàng từ trong ứng dụng của bạn
* Tạo cảm giác an toàn khi thanh toán do lưu trữ an toàn thông tin từ *Google Pay*

*Google Pay* Android cho phép developer dễ dàng tích hợp các phương thức thanh toán, nó cung cấp một quy trình bảo mật, an toàn và quen thuộc cho người sử dụng.

Tất cả chúng ta đều muốn mang lại những thứ đơn giản và hiệu quả dành cho user. Và chúng ta hãy bắt đầu ngay bây giờ nào. Đầu tiên cùng xem luồng xử lí thanh toán của *Google Pay* như nào nhé!

![](https://cdn-images-1.medium.com/max/1000/1*6J6_M4C4QxHqs5g7LmMqlg.png)

### Configure phương thức thanh toán
Trước khi chúng ta configure class dùng để handle cho việc thanh toán thì chúng ta cần phải khai báo một số dữ liệu cơ bản sử dụng trong request mà chúng ta sẽ thực hiện

Chúng ta sẽ bắt đầu bằng việc định nghĩa danh sách các loại thẻ được chấp nhận, danh sách các loại thẻ bao gồm **Amex**, **Discover**, **Master**, **JCB** và **Visa**.

```
private val allowedCardNetworks = JSONArray().apply {
    put("AMEX")
    put("MASTERCARD")
    put("VISA")
}
```
Tiếp theo chúng ta cần định nghĩa phương thức xác thực có thể sử dụng trong giao dịch. Sự lựa chọn có thể là :
* **PAN_ONLY**: Liên kết với các thẻ được lưu trữ cùng với tài khoản Google của người dùng hiện tại. Dữ liệu được trả về bao gồm số tài khoản tương ứng cùng với tháng và năm hết hạn.
* **CRYPTOGRAM_3DS** : Liên kết với các thẻ được lưu trữ dưới dạng mà thông báo thiết bị Android. Dữ liệu được trả về gồm một mật mã 3DS được tạo ra trên thiết bị đã cho.

```
private val allowedCardAuthMethods = JSONArray().apply {
    put("PAN_ONLY")
    put("CRYPTOGRAM_3DS")
}
```
Bây giờ chúng ta đã có các định nghĩa cụ thể rồi thì tiếp theo ta sẽ chuẩn bị data cho việc sử dụng với Google Pay API. Chúng ta cần như sau:
* **allowedAuthMethods** : cho phép các phương thức xác thực chấp nhận để có thể sử dụng được khi thực hiện yêu cầu thanh toán
* **allowedCardNetworks** : Cho phép các thẻ được chấp nhận khai báo có thể được sử dụng để thanh toán

```
private val paymentMethodParameters = JSONObject().apply {
    put("allowedAuthMethods", allowedCardAuthMethods)
    put("allowedCardNetworks", allowedCardNetworks)
}
```
Như phía trên ta cũng có thể có thêm các option để khai báo như sau:
* **allowPrepaidCards** : Cho biết có thể sử dụng thẻ trả trước hay không khi thực hiện yêu cầu thanh toán
*  **billingAddressRequired** : Cho biết có hay không việc bắt buộc địa chỉ thanh toán để hoàn thành giao dịch
*  **billingAddressParameters** : Lấy dữ liệu theo format của class [BillingAddressParameters](https://developers.google.com/pay/api/android/reference/object#BillingAddressParameters)
Cuối cùng chúng ta kết hợp những điều này lại với nhau bắng cách khai báo loại thanh toán được chấp nhận là CARD và truyển qua các tham số mà ta đã khai báo ở trên
```
val baseCardPaymentMethod = JSONObject().apply {
    put("type", "CARD")
    put("parameters", paymentMethodParameters)
}
```

### Configure wallet option
Trước khi khởi tạo ứng dụng thanh toán khách hàng thì ta cần phải tạo ra 1 instance của [WalletOptions](https://developers.google.com/android/reference/com/google/android/gms/wallet/Wallet.WalletOptions)
```
val options = Wallet.WalletOptions.Builder()
    .setEnvironment(WalletConstants.ENVIRONMENT_TEST)
    .setTheme(THEME_LIGHT)
    .build()
```
Việc sử dụng builder giúp chúng ta có thể configure 2 thuộc tính được sử dụng trong thanh toán của khách hàng:
* [**environment**](https://developers.google.com/android/reference/com/google/android/gms/wallet/Wallet.WalletOptions.html#environment) : Thuộc tính nhằm xác định môi trường làm việc khi thực hiện thoan toán là production ([ENVIRONMENT_PRODUCTION](https://developers.google.com/android/reference/com/google/android/gms/wallet/WalletConstants#ENVIRONMENT_PRODUCTION)) hay test ([ENVIRONMENT_TEST](https://developers.google.com/android/reference/com/google/android/gms/wallet/WalletConstants#ENVIRONMENT_TEST))
* [**theme**](https://developers.google.com/android/reference/com/google/android/gms/wallet/Wallet.WalletOptions.html#theme) : Thuộc tính nhằm set chủ để của giao diện là sáng ([THEME_LIGHT](https://developers.google.com/android/reference/com/google/android/gms/wallet/WalletConstants#THEME_LIGHT)) hay tối ( [THEME_DARK](https://developers.google.com/android/reference/com/google/android/gms/wallet/WalletConstants#THEME_DARK))

### Khởi tạo thanh toán khách hàng
Tại bước này ta có thể tạo ra 1 instance cho việc thanh toán rồi :
```
private val paymentsClient = Wallet.getPaymentsClient(this, options)
```

Ở đây chúng ta truyền vào context và welletOption mà đã đã định nghĩa là bước trên. Tại thời điểm này ta có 1 tham chiếu khách hàng thanh toán  trong ứng dụng và có thể được kích hoạt khi có yêu cầu thanh toán.
### Khai bảo nút Google Pay
Bằng việc sử dụng [asset provide Google Pay](https://developers.google.com/pay/api/android/guides/brand-guidelines#payment-buttons), bạn có thể thêm nút thanh toán dựa vào bộ thư viện cung cấp sẵn nhằm giúp người dùng nhận ra phương thức thanh toán Google Pay. KHi user chọn nút này thì sẽ kích hoạt luồng thanh toán mà tôi sẽ trình bày ở các bước dưới đây.
![](https://cdn-images-1.medium.com/max/800/1*zakJ6RNTYiratJ2kgTQ9ww.png)
### Kiểm tra nếu thanh toán sẵn sàng cho user
Bây giờ chúng ta đã có ứng dụng thanh toán khách hàng, chúng ta muốn kiểm tra xem người dùng có thể thực hiện thanh toán bằng Google Pay API hay không, chúng ta có thể gặp lỗi khi cố gắng truy cập API. Vì vậy chúng ta sẽ đảm bảo rằng nút Google Pay chỉ hiển thị khi người dùng thực sự sẵn sằng để sử dụng.
Chúng ta bắt đầu bằng cách xây dựng request và lắng nghe quá isReadyToPay :
* **apiVersion** : Phiên bản API chính đang sử dụng (Số nguyên)
* **apiVersionMinor**: Phiên bản API nhỏ đang sử dụng (Số nguyên)
* **allowedPaymentMethods** : Một tập hợp [PaymentMethod](https://developers.google.com/pay/api/android/reference/object#PaymentMethod) khai báo các phương thức thanh toán được hỗ trợ của khách hàng
```
val isReadyToPayRequest: JSONObject = JSONObject().apply {
    put("apiVersion", 2)
    put("apiVersionMinor", 0)
    put("allowedPaymentMethods", JSONArray().put(baseCardPaymentMethod))
}
```
Chúng ta cũng có thể tùy chọn cung cấp thuộc tính **existingPaymentMethodRequired(boolean)** Nếu đặt thuộc tính này là true thì sẽ khiến isReadyToPay() trả về true nếu người dùng sẵn sàng thanh toán bằng ít nhất một trong những phương thức thanh toán được chỉ định.
Như vậy ta đã xây dựng các thuộc tính này tiếp theo cùng lắng nghe callback
```
val request = IsReadyToPayRequest.fromJson(isReadyToPayRequest.toString())
request?.let {
    val task = paymentsClient?.isReadyToPay(request)
    task?.addOnCompleteListener { completedTask ->
        val result = completedTask.getResult(ApiException::class.java)
        result?.let {
            button_google_pay.setOnClickListener { view -> requestPayment(view) }
            button_google_pay.visibility = View.VISIBLE
        }
    }
}
```
### Thiết lập Gateway Configuration
Tiếp theo ta cần thiết lập các chi tiết gateway liên quan, cổng này sẽ là thứ sẽ nhận được thông tin người dùng đã được mã hóa để xử lí một giao dịch nhất định.
* **gateway** : Xác định cho 1 cổng mà được Google support
* **gatewayMerchantId**: ID duy nhất liên kêt người bán với cổng đã cho
Cùng theo dõi đoạn code sau. **tokenizationSpecification** sẽ là tham số dùng việc dùng *Google Pay API*
```
private val gatewayInformation = JSONObject().apply {
    put("gateway", "example")
    put("gatewayMerchantId", "exampleGatewayMerchantId")
}      

private val tokenizationSpecification = JSONObject().apply {
    put("type", "PAYMENT_GATEWAY")
    put("parameters", gatewayInformation)
}

private val cardPaymentMethod = JSONObject().apply {
    put("apiVersion", 2)
    put("apiVersionMinor", 0)
    put("tokenizationSpecification", tokenizationSpecification)
}
```
### Chuẩn bị transaction information
Tại đây là cần phải định nghĩa transaction theo chuẩn của Google đưa ra. Chúng ta bắt đầu với  [TransactionInfo](https://developers.google.com/pay/api/android/reference/object#TransactionInfo), có một số thuộc tính mà ta cần phải để tâm như sau:
* **currencyCode** : Mã tiền tệ được sử dụng trong giao dịch
* **totalPriceStatus** : Trạng thái của tổng giá (**NOT_CURRENTLY_KNOWN**, **ESTIMATED**, **FINAL**) là giá có thể đã bao gồm thuế, phí ship hay đã là giá cuối cùng
* **totalPrice**: Tổng giá tiền của giao dịch
* **checkoutOption** : Quyết định hành vi được sử dụng và văn bản được hiển thị trong nút thanh toán của bản thanh toán Google. Có thể là **DEFAULT** (Hành vi tiêu chuẩn, người dùng chỉ cần xác nhận giao dịch) hoặc **COMPLETE_IMMEDIATE_PURCHASE**( khi totalPriceStatus là **FINAL** thì người dùng sẽ hoàn tất giao dịch mua mà không cần thực hiện thêm hành động nào)
```
val transactionInfo = JSONObject().apply {
    put("totalPrice", "12.34")
    put("totalPriceStatus", "FINAL")
    put("currencyCode", "USD")
}

val paymentDataRequest = GooglePay.baseRequest.apply {
    put("allowedPaymentMethods", JSONArray().put(cardPaymentMethod))
    put("transactionInfo", transactionInfo)
    put("merchantInfo", merchantInfo)
}
```
Sau đó ta cần tạo ta 1 payment request sử dụng các thông tin của giao dịch mà ta vừa chuẩn bị. Request ở đây là 1 [PaymentDataRequest ](https://developers.google.com/pay/api/android/reference/object#PaymentDataRequest) và ta cần chú ý các dữ liệu bắt buộc sau đây:
* **apiVersion** — Version chính của API (integer)
* **apiVersionMinor** — Version nhỏ của API (integer)
* **merchantInfo** —Thông tin liên quan đến merchant dưới dạng [MerchantInfo](https://developers.google.com/pay/api/android/reference/object#MerchantInfo) 
* **allowedPaymentMethods** — Tập hợp các PaymentMethod mà ta đã khai báo nhằm hỗ trợ người dùng
* **transactionInfo** —Thông tin về giao dịch thông qua class [TransactionInfo ](https://developers.google.com/pay/api/android/reference/object#TransactionInfo)
* **emailRequired** — Cho biết địa chỉ email là bắt buộc để hoàn thành giao dịch
* **shippingAddressRequired** — Cho biết địa chỉ giao hàng là bắt buộc để hoàn thành giao dịch
* **shippingAddressParameters** — IThông tin về địa chỉ shipping qua form [ShippingAddressParameters](https://developers.google.com/pay/api/android/reference/object#ShippingAddressParameters)

### Lắng nghe Payment callback
Sau khi tạo gửi request payment chúng ta cần lắng nghe callback thông qua **onActivityResult** cùng với resultCode 
```
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    when (requestCode) {
        LOAD_PAYMENT_DATA_REQUEST_CODE -> when (resultCode) {
            Activity.RESULT_OK -> {
                data?.let {
                    val paymentData = PaymentData.getFromIntent(it)
                    paymentData?.let { data ->
                        val json = data.toJson()
                        val paymentMethodData = JSONObject(json)
                            .getJSONObject("paymentMethodData")
                        val paymentToken = paymentMethodData
                            .getJSONObject("tokenizationData")
                            .getString("token")
                    }
                }
            }
            Activity.RESULT_CANCELED -> {
                // handle cancelled state
            }
            AutoResolveHelper.RESULT_ERROR -> {
                val status = AutoResolveHelper.getStatusFromIntent(data)
            }
        }
    }
}
```

Khi chúng ta nhận được dữ liệu từ yêu cầu, chúng ta có thể sử dụng class PaymentData từ Google Pay API để phân tích kết quả và thông tin thanh toán giao dịch
Tại đây dữ liệu sẽ được chuyển thành định dạng JSON, tại thời điểm này chúng ta đã thực hiện tất cả các bước cần thiết và giao dịch đã hoàn thành.
## Tổng kết
Rất mong với những hướng dẫn cơ bản này có thể giúp bạn có một cách nhìn tổng quát nhất về luồng xử lí thanh toán với Google Pay và cách implement nó với Google Pay API. Còn ngần ngại gì mà không tích hợp vào ứng dụng của bạn khi đã có một cơ chế thanh toán tiện lợi và cực kì an toàn này. Hẹn gặp lại các bạn vào những bài viết sau.

Nguồn

https://medium.com/google-developer-experts/8-steps-to-google-pay-on-android-9fb899bfbfcb

https://pay.google.com/about/