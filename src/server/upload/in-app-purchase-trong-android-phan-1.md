Điều này có thể dưới hình thức bán các mặt hàng dành riêng cho ứng dụng hoặc các gói đăng ký cho phép người dùng truy cập các tính năng xịn xò trong một thời gian giới hạn,

Để có thể thực hiện được tính năng này, mình xin giới thiệu với các bạn Google Play Billing - một dịch vụ cho phép bạn thanh toán những sản phẩm trong app của mình.

Thành phần chính của google play billing:

- Google Play Console: là nơi bạn có thể thiết lập các loại sảm phẩm mà sẽ bán trên ứng dụng của mình cũng như các gói đăng ký sử dụng.

- Google Play Billing Library: là thư viện sẽ cần tích hợp vào ứng dụng android của mình

- Google Play Developer API: tập hợp các api mà bạn sử dụng để giao tiếp với google play. có thể truy vấn và quản lý các mặt hàng sẽ bán. Ngoài ra, sử dụng api còn có thể xác minh được người dùng có thực sự đã mua sản phẩm hay không hay đang gian lận hoặc kiểm tra có còn hoạt động hay không.

Nào, chúng ta bắt đầu bước vào việc set up  môi trường cho In App Purchase.

1. Đầu tiên chúng ta set up Google Play Billing Library cho ứng dụng của bạn.

Thêm dependency vào trong /build.gradle

implementation ‘com.android.billingclient:billing:3.0.0’

Để có thể tạo được các mặt hàng có thể mua trên google console, chúng ta cần phải upload 1 apk có chứa thư viện Google Billing lên console. Vì vậy sau khi thêm thư viện Google Billing, bạn hãy build 1 bản apk và upload lên play console.

2. Sau khi đã upload apk lên play console, bạn đã có thể tạo các sản phẩm cũng như các gói sẽ được bán trong GooglePlay Console. Khi tạo mới 1 sản phẩm, bạn được yêu cầu nhập product id cho mặt hàng đó. product id này sẽ không được trùng lặp và không thể thay đổi sau khi tạo.

3. Sau khi đã set up xong các sản phẩm, gói sẽ được bán, bạn có thể truy vấn các sản phẩm hay gói xem đã thành công hay chưa như sau:

```java
public class Demo extends AppCompatActivity {
    private BillingClient billingClient;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        billingClient = BillingClient.newBuilder(this)
                .enablePendingPurchases()
                .setListener((billingResult, list) -> {
                    //TODO: Hàm này sẽ trả về kết quả khi người dùng thực hiện mua hàng. 
                    // Mình sẽ nói chi tiết ở phần 2 của bài viết
                })
                .build();

        //TODO: Connect ứng dụng của bạn với Google Billing
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(@NonNull BillingResult billingResult) {
                //TODO: Sau khi connect thành công, thử lấy thông tin các sản phẩm
                queryProducts();
            }

            @Override
            public void onBillingServiceDisconnected() {
                //TODO: Connect Google Play not success
            }
        });
    }

    private void queryProducts() {
        // TODO: tạo list các product id (chính là product id bạn đã nhập ở bước trước) để lấy thông tin
        List<String> productIds = new ArrayList<>();
        productIds.add("hello_babe");
     
        SkuDetailsParams skuDetailsParams = SkuDetailsParams.newBuilder()
                .setSkusList(productIds)
                .setType(BillingClient.SkuType.INAPP) 
                //TODO: Sử dụng INAPP với one-time product và SUBS với các gói subscriptions. 
                .build();

        // TODO: Thực hiện query
        billingClient.querySkuDetailsAsync(skuDetailsParams, (billingResult, list) -> {
            if (list != null) {
                for (SkuDetails skuDetails: list) {
                    Log.d("Hello babe: ", new Gson().toJson(skuDetails));
                }
            }
        });
    }
}
```

Sau khi thành công, bạn sẽ lấy được thông tin của các sản phẩm sẽ bán. Chi tiết về các thông tin bạn có thể xem tại [SkuDetails](https://developer.android.com/reference/com/android/billingclient/api/SkuDetails)

Để hiểu rõ về INAPP và SUBS cũng như sự khác nhau giữa chúng,  bạn hãy xem tại [Google Billing Overview](https://developer.android.com/google/play/billing)

Trên đây mình đã giới thiệu cho các bạn cách set up môi trường, tạo các sản phẩm và việc query các sản phẩm đang bán. Bài viết lần tới mình sẽ hướng dẫn các bạn thanh toán khi người dùng mua sản phẩm. 

Cảm ơn bạn đã đọc bài viết!