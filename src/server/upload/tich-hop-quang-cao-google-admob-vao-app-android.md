# Giới thiệu
Hôm nay mình sẽ giới thiệu tới các bạn cách tích hợp Google Adbmob vào app Android, để có thể trong lúc rảnh và với một vài ý tưởng của bản thân, các bạn có thể tạo cho mình những ứng dụng có thể giúp bạn có thêm chút thu nhập bị động.

# Tiến hành

- Mở Android Studio và chọn **Tools > Firebase**

![](https://images.viblo.asia/f315d160-0f03-4e51-bf00-64457aa9776e.png)

- Ở cửa sổ bên phải bạn chọn **Admob > Add a banner ad to your app**

![](https://images.viblo.asia/2b6a3170-832e-4d92-8145-ad1183bdb316.png)

- Các bạn nhấn mục 1 và 2 lần lượt để kết nối ứng dụng của mình với Firebase. Nếu bạn đã tạo ứng dụng trên firebase thì chỉ cần liên kết với ứng dụng. Còn không thì có thể tạo mới nhanh ứng dụng từ cửa sổ popup hiện lên.

![](https://images.viblo.asia/91d82eeb-5e42-4f52-9737-135333eeae49.png)

- Sau khi làm xong bước 1 và 2 thì code sẽ có thêm các phần sau

project gradle
```kotlin
classpath ("com.google.gms:google-services:4.2.0")
```

app gradle
```
implementation ("com.google.firebase:firebase-ads:17.1.3")
```

file google-services.json ở folder app

- Tiếp theo chúng ta cùng config app/build.gradle thêm một chút

```kotlin
productFlavors {

    create("dev") {
        resValue ("string", "ADMOB_APP_ID", "ca-app-pub-3940256099942544~3347511713")
        resValue ("string", "banner_ad_unit_id", "ca-app-pub-3940256099942544/6300978111")
    }

    create("prd") {
        resValue ("string", "ADMOB_APP_ID", "your_app_id")
        resValue ("string", "banner_ad_unit_id", "your_banner_ad_unit_id")
    }
}
```
**LƯU Ý: chính sách của google không cho phép các bạn tự click ad của mình quá nhiều, việc này dẫn tới tài khoản admob của bạn có thể bị khoá nên hãy chắc chắn rằng chỉ dùng app id và ad unit id test trong khi dev và thay thế `your_app_id` và `your_banner_ad_unit_id` bằng app ID và banner ad id bạn tạo từ app https://apps.admob.com**

- Chọn Build Variant dev
![](https://images.viblo.asia/685e8177-33fd-4db6-b58f-d09137895437.png)

- Thêm Admob app ID vào `AndroidManifest.xml`
```xml
<application
             
    <meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="@string/ADMOB_APP_ID"/>
</application>
```

- Khởi tạo admob ở `MainActivity`
```kotlin
import com.google.android.gms.ads.MobileAds

class MainActivity
    override fun onCreate(savedInstanceState: Bundle?) {
        ...
        MobileAds.initialize(this, getString(R.string.ADMOB_APP_ID))
    }

}
```
- Đặt abmob ở vị trí mà bạn muốn trong layout
fragment_main.xml
```xml
    <com.google.android.gms.ads.AdView
        android:id="@+id/ad_view"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        app:adSize="BANNER"
        app:adUnitId="@string/banner_ad_unit_id"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />
```
- Load ad ở view
```kotlin
ad_view.loadAd(AdRequest.Builder().build())
```

- Cùng chạy xem nào :grinning:

![](https://images.viblo.asia/66f7be05-018f-49bd-b8f5-d2effddf02c6.png)

Mình vừa giới thiệu cho các bạn cách tích hợp một banner ad vào ứng dụng Android.

- Các bạn có thể xem code tại commit

https://github.com/dangquanuet/The-Movie-DB-Kotlin/commit/dedf36c5126763fb230ee537bff9db30c0e345a7

# Các thông tin có ích cho bạn khi làm app có admob

- Trang quản lý ad của google Admob, nơi bạn đăng ký app, tạo ad, xem doanh thu, hiệu quả ad, ...
https://apps.admob.com
- Trang quản lý của firebase cho thêm các thông tin về app khác như crashlytic, analytic, ...
https://console.firebase.google.com
- Các loại mobile ad phổ biến hiện nay là

1. [Banner](https://developers.google.com/admob/android/banner)
2. [Interstitial](https://developers.google.com/admob/android/interstitial)
5. [Rewarded](https://developers.google.com/admob/android/rewarded-video)

Chi tiết thông tin về các loại ad các bạn có thể xem thêm ở link dưới

https://developers.google.com/admob/android/quick-start

- **Luôn dùng test ad id cho bản dev**

| Ad format	 | Sample ad unit ID| 
| -------- | -------- | 
| Banner     | ca-app-pub-3940256099942544/6300978111     | 
| Interstitial     | ca-app-pub-3940256099942544/1033173712     | 
| Interstitial Video     | ca-app-pub-3940256099942544/8691691433     | 
| Rewarded Video     | ca-app-pub-3940256099942544/5224354917     | 
| Native Advanced     | ca-app-pub-3940256099942544/2247696110     | 
| Native Advanced Video     | ca-app-pub-3940256099942544/1044960115     | 


Chúc các bạn có thêm thu nhập, xin chào và hẹn gặp lại sau :grinning:

# Tham khảo
- Mobile Ads SDK for Android

 https://developers.google.com/admob/android/quick-start

- Admob

https://apps.admob.com