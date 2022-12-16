# **1. Giới Thiệu T-Chain Payment**

Mặc dù cryptocurrency đã ở trong giai đoạn bear market một thời gian khá dài, nhưng tiềm năng của blockchain thì không thể bàn cãi. Cryptocurrency ngày càng được nhiều tổ chức, khu vực chấp nhận ([tham khảo](https://vi.wikipedia.org/wiki/Tình_trạng_pháp_lý_của_bitcoin_theo_quốc_gia_hoặc_vùng_lãnh_thổ#Tham_khảo)). Về thanh toán điện tử, đã có nhiều bên sử dụng stable coin để thanh toán. Trong bài viết này, mình hướng dẫn tính hợp [T-Chain Payment SDK](https://pub.dev/packages/t_chain_payment_sdk), 1 package của Tokoin, giúp tích hợp thanh toán bằng cryptocurrency một cách nhanh chóng.


# **2. Mục tiêu**

Hiện tại, đã có rất nhiều projects tích hợp thanh toán bằng E-Wallet, và có thể cũng muốn tích hợp thêm thanh toán bằng đồng crypto. Vì vậy, mình tạo trước shopping app với các tính năng cơ bản: xem, chọn sản phẩm, bỏ sản phẩm vào giỏ hàng và thanh toán với momo.
Vì là app demo, nên mình không đăng ký thông tin app với bên cung cấp phương thức thanh toán, mà sử dụng luôn những thông tin trong ví dụ của package đó.
Sau đó, sẽ tính hợp [T-Chain Payment SDK](https://pub.dev/packages/t_chain_payment_sdk) vào, để xem việc tích hợp có nhanh chóng và dễ dàng không.



| Collection | Details | Cart |
| -------- | -------- | -------- |
| <img src="https://images.viblo.asia/1d4ce59d-4637-46a4-bd00-47b3c1894a37.png" width="200" /> |   <img src="https://images.viblo.asia/bd31ef88-4d71-436f-8ab8-37f4a444fb7a.png" width="200" /> |   <img src="https://images.viblo.asia/5b4e4451-8594-441c-9a24-e3609b58df33.png" width="200" /> |



<br/>

Để test được trên testnet, bạn phải download app My T-Wallet. Bạn có thể vào trang chủ [Tokoin](https://tokoin.io) để lấy link download, hoặc tại đây [ios](https://apps.apple.com/my/app/tokow/id1489276175), [android](https://play.google.com/store/apps/details?id=com.tokoin.wallet). 

Sau khi đã cài đặt app, bạn cần chuyền app về môi trường sandbox để có thể test trên testnet. Để chuyển môi trường, bạn click nhiều lần vào logo Tokoin cho đến khi có message hiện ra, khi đó khỏi động lại ứng dụng thì sẽ thấy như hình dưới.

<div align="center"><img src="https://images.viblo.asia/81961575-c698-462e-b6a2-a676be52e85d.png" width="200" /></div>

# **3. Các bước tích hợp T-Chain Payment**

Để bắt đầu thì mình cần phải đăng ký thông tin trên [dev page](https://developer.tokoin.io/guides/creating-a-project). Điền form và chờ đợi họ gửi thông tin liên quan. Còn nếu bạn chỉ muốn thử giống mình thì lấy luôn thông tin `apiKey` trong ví dụ của package cho nhanh :D
```
final apiKey = '3e093592-3e0e-4a52-9601-ead49f794586'
```

<br/>
Cấu hình scheme theo hướng dẫn để My T-Wallet có thể callback sẽ riêng theo từng platform

Android: Cần phải chỉnh lại file `AndroidManifest.xml` như sau
```
<activity
      ...
     android:launchMode="singleTask"
     ...>
   <intent-filter>
     <action android:name="android.intent.action.VIEW" />
     <category android:name="android.intent.category.DEFAULT" />
     <category android:name="android.intent.category.BROWSABLE" />
     <data android:scheme="merchant.${applicationId}"
                    android:host="app" />
   </intent-filter>
</activity>
```
iOS: Cần phải sửa lại file Info.plist như sau
```
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLName</key>
    <string>Payment Scheme Callback</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>merchant.$(PRODUCT_BUNDLE_IDENTIFIER)</string>
    </array>
  </dict>
</array>
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>mtwallet</string>
  <string>mtwallet.dev</string>
</array>
```

<br/>

Vậy là xong phần cấu hình cho iOS và Android. 
Để tích hợp SDK bạn cần chú ý đến biến môi trường env, chain. Để test trược trên app được publish trên store, bạn phải sử dụng env là `prod` , còn `isTestnet` là `false` để test trên testnet.
```
TChainPaymentSDK.instance.init(
      apiKey: '3e093592-3e0e-4a52-9601-ead49f794586',
      bundleID: 'com.tokoin.tchainpayment.example',
      env: TChainPaymentEnv.prod,
      isTestnet: true,
      delegate: _handleResult,
    );
```

Sau khi đã chọn xong sản phẩm, đến bước thanh toán, mình gọi hàm deposit(...) để tiến hành thanh toán. Cũng giống như những phương thức thanh toán khác, mình cần gọi API tạo order bên server merchant để có thể quản lý, cũng như đối soát về sau. Ở trong ví dụ thì mình chỉ dùng id được tạo ra từ Datetime.
```
    final TChainPaymentResult result = await TChainPaymentSDK.instance.deposit(
      orderID: orderID,
      amount: amount.toDouble(),
      currency: TChainPaymentCurrency.idr,
    );
```

Sau khi gọi deposit, và tiến hành thanh toán trên app wallet, và app merchant sẽ nhận được callback cùng với kết quả thanh toán, đồng thời sau đó kết quả cũng được gửi đến webhook mà ta đăng ký lúc đầu. Kết quả nhận được từ callback, mới chỉ là kết quả trên mạng testnet / mainnet. Để chắc chắn thanh toán được ghi nhận ở phía server merchant, chúng ta nên chờ tín hiệu từ server của merchant.

![deposit](https://raw.githubusercontent.com/tokoinofficial/t-chain-payment-flutter-example/TW-1070_integration_guide_of_t_chain_payment/resources/deposit.gif)


Nếu bạn cần tham khảo code của project thì mình để trong [repository](https://github.com/tokoinofficial/t-chain-payment-flutter-example) này nha.

# **4. Kết**

Mình thấy việc tích hợp không mất quá nhiều thời gian. Các bạn có thể thử và cho team [Tokoin](https://tokoin.io) feedback để có thể hoàn thiện sản phẩm hơn. [Package T-Chain Payment SDK](https://pub.dev/packages/t_chain_payment_sdk) này cũng vừa mới được đưa lên, nên chắc chắn sắp tới sẽ còn cập nhật thêm nhiều tính năng nữa. 

Hi vọng bạn thấy package hữu ích, cũng như có thể tích hợp thanh toán cryptocurrency vào project mà bạn đang có.