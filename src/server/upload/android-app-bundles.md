Giới thiệu
Trong Google IO 2018, Google đã giới thiệu  một định dạng xuất bản mới (.aab) được gọi là Android App Bundle. Nó là một định dạng xuất bản mới cho ứng dụng Android. Android App Bundle giúp cho bạn giảm được kích cỡ của APK khi ứng dụng của bạn chú trọng vào các màn hình khác nhau, ngôn ngữ. Tôi thấy nó thú vị. Nhìn chung,  Android App Bundle có nghĩ là ứng dụng sẽ có kích cỡ nhỏ hơn và download sẽ nhanh hơn. Chúng ta cũng tìm hiểu về nó nhé.

Android App Bundle cung cấp những lợi thế sau :
* Bằng /Nhỏ hơn APK truyền thống
* Việc build dễ dàng quản lý từ Google Play console
* Phân phối linh động :Cài đặt ứng dụng theo nhu cầu của người dùng cần

**Cơ bản**

Cùng bắt đầu với những thứ cơ bản nào, Vậy Android App Bundle là gì nào ? Nó có định dạng tương tự như APK file, coi nó như 1 gói zip chứa code, resource,và cấu hình.  App Bundle không cài được trực tiếp và chứa metadate/configureation file cái mà giúp để build tối thiểu APK cho người dùng( Đừng lo lắng nhé bạn, Google Plays làm đó giúp cho bạn). Định dạng .aab trông tương tự như .apk. cùng xem nhé

![](https://images.viblo.asia/25c89bbc-6533-4850-8363-08f1a0dbd96b.png)

**Dynamic Delivery(Đưa APK chính xác cho user và thiết bị)**

![](https://images.viblo.asia/464782a7-ee5c-4c55-8232-f69ff905d9c0.gif)

Chúng ta cùng tìm hiểu mục tiêu APK làm cho user. Nó là khái nhiệm về phân phối của  Google Play  mà chúng ta đã để cập tới 1 trong những lợi thế phía trên. Việc phân phôi chỉ phục vụ  những file mà user cần đó là thứ làm cho dung lượng của ứng dụng nhỏ hơn. Nó cũng tương tự  khái niệm của APK. Bây giờ chúng ta cùng tìm hiểu làm sao họ có thể gen ra APK từ App Bundle và phục vụ cho người sử dụng theo cấu hình thiết bị của họ.

**App Bundle chia thành 3 loại APK :**

* **Base APK** : Chứa code và resource chung
 
* **Configuration APKs** : APKs bao gồm thư viện liên quan, resouce cho từng kích cỡ màn hình, hạ tầng  hoặc là ngôn ngữ
 
* **Dynamic feature APKs** : APKs chứa code và resource mà không được yêu cầu khi ứng dụng của bạn được cài lần đầu tiên, Nhưng có thể được tải về và cài đặt sau. 


![](https://images.viblo.asia/86ebc8e5-41b8-4178-97f7-03ab80737a49.png)https://images.viblo.asia/86ebc8e5-41b8-4178-97f7-03ab80737a49.png


Cuối cùng,  App Bundle của bạn có Base apks và Config apks. Bây giờ khi người sử dụng cài ứng dụng từ playstore, playstore chỉ phục vụ tập hợp con của những apks. Một ví dụ cho bạn như sau, Người sử dụng có thiết bị android với cấu hình: arm, xhdpi, en_Us  thì bản APK cuối cùng sẽ chứa  (base + arm + xhdpi + en).apk. 

Nếu người sử dụng chuyển qua một đất nước khác và thay đổi hay thêm ngôn ngữ mới vào cài đặt của thiết bị , khi đó người sử dụng sẽ thao tác trên Playstore để xác nhận và  tải ngôn ngữ bổ sung cho ứng dụng của bạn. Nếu bạn không có mạng bạn có thể tải sau.

**Trên L+ devices :**
![](https://images.viblo.asia/27a9d99b-ca1b-484f-a818-9b34200af78d.png)
Dynamic delivery với App Bundle chỉ hỗ trợ cho Lollipop và cao hơn. Tuy nhiên, Nó hỗ trợ cho những bản trước Lollipop cũng tốt nhưng không giảm nhiều dung lượng của ứng dụng, chỉ phục vụ density , kiến trúc CPY liên quan.

**Pre L Devices**

![](https://images.viblo.asia/b9e0f089-82a2-4024-8df5-d6a777ef7b10.png)

**Làm sao để build Android App Bundle**

Có 2 cách để sinh ra App Bundle

1. Sử dụng Android Studio (Yêu cầu : Android Studio 3.2 Canary 14 + version hoặc là cao hơn )

![](https://images.viblo.asia/fbe887fa-cb2f-4916-bfe9-37dc858cb129.png)

2. Từ Command line (Mình ít dùng cái này)

```
./gradlew bundleDebug
./gradlew bundle
```

**Vô hiệu hóa configuration APKs**

Nếu bạn muốn vô hiệu hóa mảnh nhỏ APK cho việc configuration . Bạn có thể điều chỉnh nó thông qua build.gradle của bạn

```
android {
    // When building Android App Bundles, the splits block is ignored.
    splits {...}

    // Instead, use the bundle block to control which types of configuration APKs
    // you want your app bundle to support.
    bundle {
        language {
            // Specifies that the app bundle should not support
            // configuration APKs for language resources. These
            // resources are instead packaged with each base and
            // dynamic feature APK.
            enableSplit = false
        }
        density {
            // This property is set to true by default.
            enableSplit = true
        }
        abi {
            // This property is set to true by default.
            enableSplit = true
        }
    }
}
```

**Test App Bundle với bundleTool**

Sau khi bạn build App Bundle, Bạn nên test  làm sao để Google Play sử dụng nó và sinh ra APKs và APKs sẽ thế nào khi được deployed tới thiết bị

Bạn có thể sử dụng bundletool- command line  mà Gradle, Android studio và Google Play sử dụng nó để build App Bundle hoặc là chuyển đổi App Bundle thành APKS . 

Sau khi bạn test ở local, Bạn nên kiểm trả nó thông qua Google  Play bằng cách upload  app bundle lên Google PLay console. Và test trên thiết bị với Dynamic Delivery trong vài phút mà thôi.

Tài liệu tham khảo : 

https://developer.android.com/guide/app-bundle/

https://proandroiddev.com/modular-and-dynamic-app-delivery-android-app-bundle-9bbfac814787

Mình hy vọng bài này có thể giúp bạn có thêm 1 lựa chon khi đưa ứng dụng của bạn lên GooglePlay thay vì dùng APK truyền thống như xưa .
Cám ơn các bạn đã đọc qua bài của mình :)