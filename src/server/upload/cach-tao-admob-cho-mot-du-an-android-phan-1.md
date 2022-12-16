Chào các bạn, chắc mọi người đều biết admob của Google rồi nhỉ :grinning: còn đối với các bạn chưa biết thì đây là một công cụ của Google giúp mình có thể thêm các loại quảng cáo vào trong app của mình. Các loại ads mà Google hỗ trợ:
* Banner ad.
* Interstials ad.
* Rewarded interestitial ad.
* Rewarded.
* Native advanced.
* App open.

Trong phạm vi bài viết này mình sẽ nói về Banner ad trước, những loại còn lại sẽ có trong các bài sau :sweat_smile::sweat_smile:
# Thiết lập cần thiết.
Vào  https://apps.admob.com để tạo một app admob, sau khi tạo xong sẽ kết quả sau:
Đây là một loại banner ad mà mình đã tạo. Ở dưới cùng là id của ad tự generate ra.

![](https://images.viblo.asia/4690db11-8056-4c96-93fe-c4a5164f4f4a.png)

Có thể tạo thêm nhiều loại ad
 bằng cách click vào **Thêm đơn vị quảng cáo**.

![](https://images.viblo.asia/9e68b5a6-d67d-4d5c-9dbf-1ee1cf4bf9d6.png)



Vào trong **build.gradle** thêm thư viện admob của Google
```
dependencies {
    implementation 'com.google.android.gms:play-services-ads:19.7.0'
}
```


**AndroidManifest.xml** khai báo id admob đã khởi tạo ở link  https://apps.admob.com .
```Kotlin
<manifest>
    <application>
        <!-- Sample AdMob app ID: ca-app-pub-3940256099942544~6300978111 -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy"/>
    </application>
</manifest>
```

Để khởi tạo admob, vào **MainActivity.class **
```Kotlin
class MainActivity : AppCompatActivity() {
    ...
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        MobileAds.initialize(this) {}
    }
    ...
}
```
# Banner ad.
Là một loại quảng cáo dạnh hình chữ nhật thường ở trên cùng hoặc ở dưới cùng của màn hình thiết bị. Những quảng cáo này lưu trên màn hình trong khi người dùng tương tác với ứng dụng và có thể tự động làm mới sau một khoảng thời gian nhất định.

Vào file **activity_main.xml** và thêm vào `AdView` để hiển thị banner trên app.

```Kotlin
   <com.google.android.gms.ads.AdView
        android:id="@+id/ad_view"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="0dp"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        ads:adSize="BANNER"
        ads:adUnitId="ca-app-pub-3940256099942544/6300978111"
        ads:layout_constraintBottom_toBottomOf="parent"
        ads:layout_constraintEnd_toEndOf="parent"
        ads:layout_constraintStart_toStartOf="parent" />
```

Có 2 giá trị bắt buộc phải có đó là adSize và adUnitId.

**ads:adSize** – Đặt giá trị này thành kích thước quảng cáo mà bạn muốn sử dụng. Nếu không muốn sử dụng kích thước chuẩn do hằng số xác định, bạn có thể đặt một kích thước tùy chỉnh.

**ads:adUnitId** – Đặt giá trị này thành giá trị nhận dạng duy nhất được cấp cho đơn vị quảng cáo trong ứng dụng mà quảng cáo sẽ hiển thị. Nếu bạn hiển thị quảng cáo biểu ngữ trong các hoạt động khác nhau, mỗi hoạt động sẽ cần một đơn vị quảng cáo.

Hoặc không nhất thiết phải bỏ trong file .xml mà có thể code trong file **MainActivity.class**
```Kotlin

val adView = AdView(this)

adView.adSize = AdSize.BANNER

adView.adUnitId = "ca-app-pub-3940256099942544/6300978111"
```

Để có thể load ad lên app:

```Kotlin
//Nhận giá trị test ads trên device được build lên.
 MobileAds.setRequestConfiguration(
         RequestConfiguration.Builder()
        .setTestDeviceIds(listOf("ABCDEF012345"))
        .build()
    )

    // Tạo một request.
    val adRequest = AdRequest.Builder().build()

    // Load ad ở background.
    ad_view.loadAd(adRequest)
```

AdView cũng có các callback listener để mình có thể xử lý khi rơi vào đúng trường hợp.
```Kotlin
mAdView.adListener = object: AdListener() {
    override fun onAdLoaded() {
        // Ad load thành công.
    }

    override fun onAdFailedToLoad(adError : LoadAdError) {
        // Ad trả về lỗi cùng với mã code.
    }

    override fun onAdOpened() {
        // Phương thức này được gọi khi người đã mở một quảng cáo.
    }

    override fun onAdClicked() {
        // Phương thức này được gọi khi người dùng nhấn vào một quảng cáo.
    }

    override fun onAdLeftApplication() {
        // Phương thức này được gọi sau onAdOpened(), 
        // khi người dùng nhấp để mở một ứng dụng khác (chẳng hạn như Google Play) 
        // và chuyển ứng dụng hiện tại sang chạy ở chế độ nền.
    }

    override fun onAdClosed() {
        // Sau khi người dùng xem URL đích của quảng cáo và quay lại ứng dụng, 
        // phương thức này sẽ được gọi. Ứng dụng của bạn có thể sử dụng phương 
        // thức này để tiếp tục các hoạt động bị tạm ngưng hoặc thực hiện mọi hoạt
        // động cần thiết khác để ứng dụng sẵn sàng tương tác.
    }
}
```

Kết quả: 
![](https://images.viblo.asia/1fd156db-b9e3-4970-a09d-24984be4940e.png)

# Banner Adaptive
Loại này cũng là một dạng Banner nhưng nó sẽ tối ưu hoá hiển thị trên các kích thước khác nhau của thiết bị. Biểu ngữ thích ứng cho phép chỉ định chiều rộng quảng cáo và sử dụng yếu tố này để xác định kích thước quảng cáo tối ưu.

Biểu ngữ thích ứng sử dụng tỷ lệ khung hình cố định thay vì chiều cao cố định. Nhờ đó, quảng cáo biểu ngữ chiếm phần màn hình nhất quán hơn trên các thiết bị và mang lại cơ hội cải thiện hiệu quả hoạt động.

Ưu điểm:
* Biểu ngữ thích ứng có thể hiển thị với chiều rộng đã chỉ định thay vì chiều rộng toàn màn hình, cho phép bạn xem xét vết cắt trên màn hình .
* Biểu ngữ thích ứng chọn một chiều cao tối ưu cho thiết bị cụ thể, thay vì hiển thị với chiều cao không đổi trên các thiết bị có kích thước khác nhau, giúp giảm thiểu tác động của hiện tượng phân mảnh thiết bị.

## Tạo một Banner Adaptive
Xác định chiều rộng màn hình để sử dụng cho chiều rộng quảng cáo.
Nếu quảng cáo chưa được bố trí, hãy đặt mặc định là chiều rộng toàn màn hình.
```Kotlin
  private val adSize: AdSize
    get() {
      val display = windowManager.defaultDisplay
      val outMetrics = DisplayMetrics()
      display.getMetrics(outMetrics)

      val density = outMetrics.density

      var adWidthPixels = ad_view_container.width.toFloat()
      if (adWidthPixels == 0f) {
        adWidthPixels = outMetrics.widthPixels.toFloat()
      }

      val adWidth = (adWidthPixels / density).toInt()
      // getCurrentOrientationBannerAdSizeWithWidthdùng()
      // để lấy kích thước của biểu ngữ ở một vị trí cố định 
      // cho hướng giao diện hiện tại.
      return AdSize.getCurrentOrientationBannerAdSizeWithWidth(this, adWidth)
    }
```

Sau đó adSize vào adView

```Kotlin
  private fun loadBanner() {
    adView.adUnitId = AD_UNIT_ID

    adView.adSize = adSize

    val adRequest = AdRequest.Builder().build()

    adView.loadAd(adRequest)
  }
```
Kết quả:
![](https://images.viblo.asia/3c956fe4-c4f8-469c-8142-a7d83d2a9cc1.png)
# Banner Smart

Banner Smart là các unit ad
 hiển thị quảng cáo biểu ngữ trải ngang các màn hình thuộc mọi kích thước trên nhiều loại thiết bị khác nhau, bất kể màn hình ở hướng ngang hay dọc. Biểu ngữ thông minh có thể nhận diện chiều rộng màn hình của thiết bị theo hướng xoay hiện tại và điều chỉnh chế độ xem quảng cáo cho phù hợp với kích thước đó.
 
###  Tạo một Banner Smart
Giống với Banner thông thường chỉ cần thay đổi giá trị của **layout_width ="match_parent"** và **
**
```Kotlin
<com.google.android.gms.ads.AdView
      xmlns:ads="http://schemas.android.com/apk/res-auto"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      ads:adSize="SMART_BANNER"
      ads:adUnitId="ca-app-pub-3940256099942544/6300978111">
    </com.google.android.gms.ads.AdView>
```
Thành quả.
![](https://images.viblo.asia/38954971-a668-4178-94aa-d0bd17464ab4.png)

Cảm ơn các bạn đã xem bài viết, mong rằng bài viết này sẽ giúp được các bạn ít nhiều. :kissing_heart::kissing_heart::kissing_heart::kissing_heart::kissing_heart::kissing_heart:


# Tài liệu tham khảo:
> https://developers.google.com/admob/android/banner