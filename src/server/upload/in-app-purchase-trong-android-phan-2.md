Bài viết trước mình đã giới thiệu sơ lược về Google Billing Library và các setup môi trường

Trong bài viết này, chúng ta sẽ xem xét kỹ hơn vòng đời khi mua *one-time product*, cụ thể là quy trình bán và cấp cho người dùng mặt hàng kỹ thuật số mà họ đã mua trong ứng dụng của bạn. 

Để đơn giản, bây giờ chúng ta sẽ tập trung vào các giao dịch *one-time product*, trong bài tiếp theo, chúng tôi sẽ xem xét chi tiết vòng đời phức tạp hơn của Subscription (mua gói)

*One-time product* là sản phẩm mà người dùng có thể mua với một khoản phí duy nhất và không định kỳ.

*One-time product* có thể là tiêu thụ được hoặc không tiêu thụ được với tiêu thụ được có nghĩa là người dùng khi sử dụng thì sẽ bị giảm đi nên họ có thể mua nhiều lần khi sử dụng. Ví dụ nếu ứng dụng của bạn cho phép người dùng có thể mua tiền ảo thì đó là sản phẩm tiêu thụ được, còn nếu ứng dụng của bạn có 1 list các truyện và khi người dùng mua truyện nào mới có thể đọc truyện đấy thì đó là sản phẩm không tiêu thụ được.

Sau khi bạn đã định được thứ mà mình muốn bán thuộc loại nào thì chúng ta bắt đầu vào xử lý nhé, quy trình bán sản phẩm sẽ trải qua các bước sau:

![](https://images.viblo.asia/930b506d-87e8-47e7-b507-68cabe0141e2.png)

## 1. Thiết lập BillingClient

Lớp BillingClient cho phép ứng dụng của bạn có thể giao tiếp với Play Billing Library. Đầu tiên bạn cần phải connect đến Google Play bằng cách gọi hàm startConnection()

```
BillingClient billingClient = BillingClient
    .newBuilder(this)
    .enablePendingPurchases()
    .setListener(new PurchasesUpdatedListener() {
                    @Override
                    public void onPurchasesUpdated(@NonNull BillingResult billingResult, @Nullable List<Purchase> list) {
                        //Xử lý kết quả mua hàng. Xem chi tiết hơn ở phần sau
                    }
    })
    .build();
    
billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(@NonNull BillingResult billingResult) {
                if (billingResult.getResponseCode() == OK) {
                    //Connect tới Google Play thành công. Bạn đã có thể lấy những sản phẩm mà người dùng đã mua
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                //Hiển thị lỗi khi connect thất bại tới google play
            }
        });
```

## 2. Lấy những sản phẩm mà người dùng đã mua

Sau khi connect thành công tới Google Play, ứng dụng của bạn đã có thể lấy những sản phẩm mà người dùng đã mua bằng cách gọi hàm *queryPurchases(int type)* (Param của hàm này hoặc là *BillingClient.SkuType.INAPP* đối với one-time product và *BillingClient.SkuType.SUBS* đối với subsciption)

```
List<Purchase> purchases = billingClient.queryPurchases(BillingClient.SkuType.INAPP).getPurchasesList();
if (purchases == null) {
        //Không có sản phẩm đã mua nào
    } else {
        //xử lý khi có sản phẩm đã mua
    }
```

## Lấy những sản phẩm hiện bán trong app

Đầu tiên bạn cần tạo list các product id được thiết lập trong Google console

```
 List<String> list = ArrayList<>();
    skuListToQuery.add("product_1");
    skuListToQuery.add("product_2");
    skuListToQuery.add("product_3");
```

Tạo param cho hàm query

```
SkuDetailsParams skuDetailsParams = SkuDetailsParams.newBuilder()
                .setSkusList(list)
                .setType(BillingClient.SkuType.INAPP)
                .build();
```

Sử dụng hàm *querySkuDetailsAsync()* để lấy thông tin những sản phẩm đang bán trong ứng dụng. Chi tiết thông tin lấy được xem tại [đây](https://developer.android.com/reference/com/android/billingclient/api/SkuDetails) 

```
billingClient.querySkuDetailsAsync(skuDetailsParams, (billingResult, list) -> {
            if (list != null && !list.isEmpty()) {
                //Đã lấy được thông tin các sản phẩm đang bán theo các product id ở trên
            }
        });
```

## 4. Launch purchase flow

Sau khi lấy được thông tin các sản phẩm, khi user click vào mua một sản phẩm, bạn hãy gọi hàm launchBillingFlow() để khởi chạy màn hình mua hàng trên Google Play

Param của hàm này là 1 object BillingFlowParams được tạo ra từ 1 SkuDetails lấy được ở bước 3.

```
BillingFlowParams billingFlowParams = BillingFlowParams.newBuilder()
                        .setSkuDetails(skuDetails)
                        .build();
                        
billingClient.launchBillingFlow(activity, billingFlowParams);
```

## 5. Xử lý kết quả mua hàng

Khi user click vào Buy trong màn hình mua hàng của Google Play, hàm onPurchaseUpdated() đã được setListener ở bước 1 sẽ được gọi để trả về kết quả mua hàng

```
public void onPurchasesUpdated(@NonNull BillingResult billingResult, @Nullable List<Purchase> list) {
                        //Xử lý kết quả mua hàng. Xem chi tiết hơn ở phần sau
                    }
```

Dựa vào billingResult.getResponseCode() bạn có thể xác nhận người dùng đã mua thành công hay chưa.

Nếu billingResult.getResponseCode() == OK tức là người dùng đã mua hàng thành công.

ngoài ra hàm còn trả về 1 `List<Purchase>` bao gồm tất cả các giao dịch mà người dùng đã mua trong app

## 6. Xác minh và xác nhận mua hàng

Khi sử dụng Play Billing Library 3.0, ứng dụng của bạn cần xác nhận các giao dịch mua thành công để hoàn tất quy trình mua hàng. **Nếu ứng dụng của bạn không xác nhận giao dịch mua trong vòng 72 giờ, người dùng sẽ được hoàn tiền và không còn quyền truy cập vào giao dịch mua ban đầu mà họ đã thực hiện.**

Các sản phẩm không tiêu thụ được phải được xác nhận bằng cách gọi hàm acknowledgePurchase()

Sản phẩm tiêu thụ phải được đánh dấu là 'đã tiêu thụ' để người dùng có tùy chọn mua thêm. 

Điều này được thực hiện với hàm consumeAsync(). Việc gọi điện consumeAsync() cũng xác nhận việc mua hàng như đã được thừa nhận, vì vậy không cần gọi acknowledgePurchase() nữa.

## 7. Cấp sản phẩm cho người dùng

Sau tất cả các bước trên đều thành công thì bạn phải cung cấp sản phẩm mà người dùng đã mua cho họ
```
public void handlePurchase(Purchase purchase) {
        handleConsumableProduct(purchase)

        handleNonConsumableProduct(purchase)
    }

    public void handleConsumableProduct(Purchase purchase) {
        ConsumeParams consumeParams =
                ConsumeParams.newBuilder()
                        .setPurchaseToken(purchase.getPurchaseToken())
                        .build();

        billingClient.consumeAsync(consumeParams,(billingResult, purchaseToken) -> {
            if (billingResult.getResponseCode() == OK) {
                // Handle the success of the consume operation.
            }
        });
    }

    public void handleNonConsumableProduct(Purchase purchase) {
        if (purchase.getPurchaseState() == purchase.getPurchaseState()) {
            if (!purchase.isAcknowledged()) {
                AcknowledgePurchaseParams acknowledgePurchaseParams = AcknowledgePurchaseParams.newBuilder()
                        .setPurchaseToken(purchase.getPurchaseToken())
                        .build();
                billingClient.acknowledgePurchase(acknowledgePurchaseParams, billingResult -> {
                    //Handle acknowledge result
                });
            }
        }
    }
```
# Tài liệu tham khảo
https://medium.com/androiddevelopers/working-with-google-play-billing-part-2-b859b55426d2