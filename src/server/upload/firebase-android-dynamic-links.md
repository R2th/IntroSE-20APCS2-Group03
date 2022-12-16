Như trong bài [Tổng quan về Firebase](https://viblo.asia/p/firebase-android-overview-3P0lPYL85ox#_36-firebase-dynamic-links-8) mình có giới thiệu về Dynamic Links rồi nên mọi người cũng biết nó là cái gì và nó sinh ra là để làm gì rồi đúng không? :D . Dĩ nhiên là có tổng quan thì phải có chi tiết thì mới hoàn chỉnh được chứ. Do vậy, hôm nay mình sẽ trình bày những kiến thức của mình tìm hiểu được về Dynamic Links nhé! 

## 1. Các trường hợp nào nên sử dụng Dynamic Links?
Dưới đây là một số trường hợp app của bạn có thể sử dụng Dynamic Links: 
###  a, Chuyển user từ web sang app
 - Ví dụ mình có một app bán hàng, nếu không có Dynamic Links, bạn đang dùng web để xem sản phẩm A bỗng nhiên cần phải điều hướng đến CH Play để cài app, sau khi cài app xong thì bạn không thể nào trở lại sản phẩm A mà bạn đang xem trước đó. Nhưng khi app có Dynamic Links thì bạn có thể trở lại xem sản phẩm A sau khi cài app. Điều này mang lại nhiều lợi ích cho app của bạn: 
  * Sự chuyển đổi này làm cho người dùng cảm thấy thoải mái hơn
  * Người dùng có thể bắt đầu dùng app với nội dung đúng như đã xem trước đó trên web.
  * Mà lại không cần code nhiều nữa chứ.

![](https://images.viblo.asia/7577e548-2bc7-48db-a3f1-a80ce1d4f451.png)


###  b, Các chiến lược quảng cáo app trên mạng xã hội, email hoặc SMS
 - Ví dụ với app mua sắm đợt này đang có chiến dịch kích cầu, bạn gửi các chương trình khuyến mại bằng cách sử dụng các links có thể hoạt động trên bất kỳ nền tảng nào. Người dùng hiện tại và tương lai có thể đổi phiếu mua hàng của bạn cho dù họ sử dụng iOS, Android hoặc trình duyệt web và bất kể họ đã cài đặt app của bạn hay chưa.
 
 ![](https://images.viblo.asia/1d375c2d-b298-4cd5-9443-0e8747828c6f.png)

 
###  c, User muốn chia sẻ cho nhau
 - Một trong những cách hiệu quả nhất để khiến người dùng mới cài đặt app của bạn là cho phép user chia sẻ nội dung từ app với bạn bè của họ. Với Dynamic Links, bạn có thể tạo ra những trải nghiệm chia sẻ giữa người dùng và người dùng một cách thuận tiện hơn:  khi user nhận được link từ bạn bè, họ có thể nhấp vào link và được đưa trực tiếp đến nội dung được chia sẻ trong ứng dụng, ngay cả khi họ phải truy cập App Store hoặc Google Play Store để cài đặt ứng dụng của bạn trước.

 - Bằng cách kết hợp các lượt giới thiệu người dùng và sự thuận tiện của Dynamic Links, bạn có thể tạo các tính năng chia sẻ và giới thiệu giữa người dùng với người dùng mới để phục vụ các chương trình khuyến mãi cùng có lợi cho người giới thiệu và người được giới thiệu.
 
 ![](https://images.viblo.asia/d635c326-0125-4a64-af5d-e27b39dafe8f.png)

 
###  d, Chuyển người dùng từ desktop sang app
 - Tạo Dynamic Links khi người dùng web đánh dấu một trang hoặc gửi đi một link nào đó. Khi họ mở link ấy trên một thiết bị khác, họ sẽ có được trải nghiệm tốt nhất trên mọi thiết bị.
 
 ![](https://images.viblo.asia/8c00ccc6-e7d8-4f51-8cb0-ca14c7392956.png) 
 
 **Sơ đồ hệ thống Android sẽ như sau: **
 
 ![](https://images.viblo.asia/fed48a3b-4b4b-43ae-8961-fa4770743bb8.png)

 
## 2. Cách tạo Dynamic Links như thế nào?
### Dynamic Links và Deep Links 
Khái niệm Dynamic Links của Firebase đang bao hàm cả Deep link. Bởi thực chất, deep link vẫn là link thực tế mà user muốn tương tác, muốn xem. Firebase sẽ dùng deep link đó, kết hợp với các thông tin khác để build thành một link cuối gọi là Dynamic Links. Dynamic Links mang theo nhiều thông tin hơn như là: 
* Domain
* Deep Links
* Project Information: một số thông tin của project như package name, version app,... cũng được gói vào trong link này.
* Fallback url: link dự phòng trong trường hợp app không thể cài đặt trên target device.

Một sự khác biệt nữa đó là trong trường hợp app chưa được cài Dynamic Links sẽ điều hướng người dùng tới store để cài đặt app. Sau khi cài thành công sẽ mở màn hình tương ứng với thông tin deep link mang theo, còn Deep Links sẽ mở link trên browser.

So sánh nhỏ giữa Deep links và App Links: 

 * Deep Links:  Khi có một link mà bạn click vào, app của bạn sẽ handle Intent được gửi tới, nhưng nếu như có nhiều app khác cũng handle Intent này thì system sẽ mở ra hộp thoại để bạn lựa chọn một app trong những app được show ra: 
 
 ![](https://images.viblo.asia/1063abc5-37b0-4b3f-bda4-a3e524769551.png)

 
 * Với App Links thì chỉ duy nhất app của bạn mới nhận và handle được cái Intent đó, khi bạn nhấp vào link thì user sẽ được điều hướng đến đúng app mà bạn muốn mở, không hiển thị hộp thoại lựa chọn. Vì App Links sử dụng HTTP URLs liên kết đến domain của web mà bạn sở hữu, không app nào có thể sử dụng link đó. Do vậy, một trong những yêu cầu của App Links đó là bạn phải xác minh domain mà bạn sở hữu thông qua website của Firebase. (cái này mình không đi sâu). Với App Links, bạn còn có thể mở trực tiếp content trong app khi click vào kết quả tìm kiếm trên công cụ Google Search, trong phần tìm kiếm trên màn hình Android hoặc Google Assistant.

Có 4 cách để tạo Dynamic Links như sau: 
### a. Sử dụng Firebase Console. 
- Cách này tốt trong trường hợp bạn tạo dynamic link để chia sẻ trên các phương tiện truyền thông xã hội. Bằng cách này, bạn có thể tự custom surffix link và tên của link trên Firebase console. Bạn cũng có thể theo dõi hiệu suất hoạt động của Dynamic Links này trên Firebase console hoặc Rest API Analytics.
 - Nếu các bạn chưa tạo 1 domain thì Firebase sẽ hiện lên form thông báo để bạn hoàn thành việc này. Domain này sẽ là tiền tố của Dynamic Links sau này. Nó sẽ có dạng như sau:
  ```java
  http://myapp.page.link
  ```
  
  Mặc định firebase sẽ suggest cho bạn một domain free với đuôi là page.link như trên. Nếu bạn muốn domain đẹp, sịn sò thì hãy đăng ký mua domain nhé!
  
Bạn điền đầy đủ thông tin vào đây theo các bước là được nhé. Với domain page.link thì sau bước 1.Nhập domain thì nó sẽ auto verify và nhảy tới bước cuối luôn.

![](https://images.viblo.asia/d0cc41b2-5f32-4a01-b82a-28fd4efa2f4d.png)

Sau khi hoàn thành các bước thì mình đã có domain và màn hình tạo dynamic link sẽ như sau: 

![](https://images.viblo.asia/28653aba-2c54-446e-95db-760ed9d0714e.png)

Bây giờ muốn tạo Dynamic link thì bạn nhấn "Create New Dynamic link".  Sau đó thực hiện từng bước theo hướng dẫn.
Đầu tiên là setup short link:

![](https://images.viblo.asia/c01a0817-ef8c-428d-837c-c98401928321.png)

Tiếp theo là setup dynamic link: 

![](https://images.viblo.asia/1b51ebef-fa73-4014-9348-798c7d8e4968.png)

Setup cho IOS: 

![](https://images.viblo.asia/94fe9918-2a8a-44b0-b49f-2f9c4e6b7906.png)

Setup cho Android: 

![](https://images.viblo.asia/255f2e1f-11ed-4a8e-9877-23b55d5d8558.png)

Cuối cùng là setup quảng bá. Xong thì bạn nhấn "Create" là hoàn thành rồi nhé:

![](https://images.viblo.asia/b720687f-3494-4a38-a9b7-5b767502e6ec.png)

Thành quả đây: 

![](https://images.viblo.asia/7bea611b-a835-460a-8474-137b9a6f53a7.png)

Bạn có thể nhấn vào button ba chấm ở cuối dòng dynamic link để xem thêm các option như sửa, xem chi tiết: 

![](https://images.viblo.asia/1dd4abdc-0a98-4b39-8eea-50d8bb1e932a.png)

Dưới đây là chi tiết dynamic link mình vừa tạo: 

![](https://images.viblo.asia/b4cc0a73-0be8-4384-8994-6694f69c3495.png)

Xong rùi nhé!


### b. Sử dụng Dynamic Link Builder API trên IOS hoặc Android.
- Đây là cách thích hợp để tự động tạo link trong ứng dụng của bạn để chia sẻ giữa người dùng với người dùng hoặc trong mọi tình huống mà cần nhiều links. Bạn cũng có thể theo dõi hiệu suất của Dynamic Link bằng Dynamic Links Analytics API.
### c. Sử dụng REST API.
- Cách này là cứu tinh cho cách số 3, nếu platform nào mà không có Builder API thì dùng cách này.  Analytics REST API có thể theo dõi được hiệu suất quảng cáo trên console.
### d. Tự tạo thủ công.
- Cách này thì dễ tính quá, nếu như bạn không cần quan tâm links dài hay ngắn, không cần quan tâm user click link hay không thì hãy sử dụng cách này. Tránh đi vòng vo như mấy cách trên. Và khi làm dự án thì mình cũng dùng cách này để test chỗ code Dynamic Links của mình trong dự án nó có chạy ổn hay không. Tất nhiên là sau này khách hàng sẽ tạo link sẵn cho mình rồi, mình không phải tạo.
- Để tạo Dynamic Links thì bạn cần theo cái form sau: 
```java
https://your_subdomain.page.link/?link=your_deep_link&apn=package_name[&amv=minimum_version][&afl=fallback_link]
```
- Các tham số trong link: 
* *yoursubdomain*: Cái này là domain nhé, app có domain như nào thì ném vào đây.
* *yourdeeplink*: đây là deep link này, ném deep link của bạn vào đây.
* *packagename*: lại vào project lôi cái package name ném vào đây. Package name là gía trị của tham số *apn*, dùng để liên kết ứng dụng của mình với Firebase console đấy.
* *minimumversion*: đây là versionCode thấp nhất có thể mở được link. Đây là giá trị của tham số *amv*, nếu version trong link này mà lớn hơn version hiện tại bạn đang có, thì bạn phải lên Store để cài lại app. Đoạn này phải xử lý trong code, mình code như này:
```
if (BuildConfig.VERSION_CODE < pendingDynamicLinkData.minimumAppVersion) { 
                       startActivity(
                            Intent(
                                Intent.ACTION_VIEW,
                                Uri.parse("https://play.google.com/store/apps/details?id=" + packageName)
                            )
                        )
                    }
```
* *fallbacklink*: như đã nói thì đây là link dự phòng. Bạn có thể điều hướng người dùng đến bản web hoặc trang quảng cáo nếu như app chưa được cài.


Trong một loạt các cách tạo dynamic link kể trên, thì mình suggest sử dụng cách tạo bằng firebase console nhé! Cách này trực quan, nhanh, dễ thao tác và sửa đổi.


## 3. Nhận Dynamic Links như thế nào?
Nếu app chưa liên kết với FireBase thì các bạn có thể tham khảo link hướng dẫn sau :
[https://firebase.google.com/docs/android/setup](https://firebase.google.com/docs/android/setup)

B1:  thêm dependences vào file app/build.gradle:
```java
implementation 'com.google.firebase:firebase-dynamic-links:21.0.1'
```

B2: Thêm intent-filter vào Mainifest:
```java
<activity ...
<intent-filter>
    <action android:name="android.intent.action.VIEW"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <category android:name="android.intent.category.BROWSABLE"/>
    <data
        android:host="example.com"
        android:scheme="https"/>
</intent-filter>
</activity>
```
- Trong trường hợp , thiết bị đã cài app rồi, firebase sẽ dùng trực tiếp deep-link và mở app. Cũng như nếu thiết bị chưa cài app, mở store -> Sau khi cài xong và ấn Continue và mở app. Khi người dùng mở Dynamic Links, Intent-filter này sẽ lọc theo deep-link được gắn trong Dynamic link, đi đến Activity mà xử lý Intent này.

B3: Nhận và xử lý Dynamic Links:
- Để nhận deep link, ta dùng function *getDynamicLink()* như sau: 
```java
FirebaseDynamicLinks.getInstance()
        .getDynamicLink(getIntent())
        .addOnSuccessListener(this, new OnSuccessListener<PendingDynamicLinkData>() {
            @Override
            public void onSuccess(PendingDynamicLinkData pendingDynamicLinkData) {
                // Get deep link from result (may be null if no link is found)
                Uri deepLink = null;
                if (pendingDynamicLinkData != null) {
                    deepLink = pendingDynamicLinkData.getLink();
                }
                if (BuildConfig.VERSION_CODE < pendingDynamicLinkData.minimumAppVersion) { 
                       startActivity(
                            Intent(
                                Intent.ACTION_VIEW,
                                Uri.parse("https://play.google.com/store/apps/details?id=" + packageName)
                            )
                        )
                    }
                    else {
                    // Handle open screen on app
                    }
            }
        })
        .addOnFailureListener(OnFailureListener {
                Log.d("MainActivity", "getDynamicLinks: ${it.message}")
            })
```

- Đoạn này mình thường để trong MainActivity để ngay khi mở app sẽ xử lý điều hướng người dùng đến màn hình tương ứng. Có hai case thường gặp đối với việc xử lý dynamic link, đó là: click dynamic link khi app tắt và click dynamic link khi app mở. Vậy nên chúng ta cần xử lý được cả hai trường hợp đó, để làm được như vậy, bạn nên xử lý dynamic link trong hàm ***onCreate()*** và ***onNewIntent()***.


- Vậy nếu như mình có 2 hay nhiều dynamic link trong cùng một ứng dụng thì làm như thế nào? ------- Câu trả lời là mình vẫn xử lý như bình thường. Cụ thể: 
- Trong Mainifest thì mình sẽ thêm các thẻ data trong cùng một thẻ intent-filter của một activity cho dynamic link mới. Ví dụ: 
```java
<activity ...
<intent-filter>
    <action android:name="android.intent.action.VIEW"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <category android:name="android.intent.category.BROWSABLE"/>
    <data
        android:host="example.com"
        android:scheme="https"/>
    <data
        android:host="example.com"
        android:scheme="http"/>
    <data
        android:host="hiendt.example.com"
        android:scheme="https"
        android:pathPrefix="/test"/>
</intent-filter>
</activity>
```

- Trong phần xử lý link getDynamicLink thì mình sẽ phân tách các case dựa vào deeplink. Ví dụ: 
```java
FirebaseDynamicLinks.getInstance()
        .getDynamicLink(getIntent())
        .addOnSuccessListener(this, new OnSuccessListener<PendingDynamicLinkData>() {
            @Override
            public void onSuccess(PendingDynamicLinkData pendingDynamicLinkData) {
                // Get deep link from result (may be null if no link is found)
                Uri deepLink = null;
                if (pendingDynamicLinkData != null) {
                    deepLink = pendingDynamicLinkData.getLink();
                    if (deepLink.toString().contains("video")) {
                          // TO DO
                    }
                     else if (deepLink.toString().contains("audio")) {
                                      // TO DO
                    }
                }
                if (BuildConfig.VERSION_CODE < pendingDynamicLinkData.minimumAppVersion) { 
                       startActivity(
                            Intent(
                                Intent.ACTION_VIEW,
                                Uri.parse("https://play.google.com/store/apps/details?id=" + packageName)
                            )
                        )
                    }
                    else {
                    // Handle open screen on app
                    }
            }
        })
        .addOnFailureListener(OnFailureListener {
                Log.d("MainActivity", "getDynamicLinks: ${it.message}")
            })
```


Góc tìm bug :D : Khi làm việc với Dynamic Links thì mình có gặp một bug như trên stack như sau : https://stackoverflow.com/questions/47570230/how-to-solve-deep-link-enable-in-android-using-firebase
 
 ====>>> Và cách giải quyết là các bạn phải thêm thằng SHA256 vào chỗ setting nhé, thêm như này nài; https://support.google.com/firebase/answer/9137403?hl=en . 
 
 Và nếu bạn public app lên chợ thì bạn cũng phải add mã SHA256 ứng với key store vào Firebase console nhé. Cách lấy mã SHA256 của file key store cho chế độ release: 
 
 Mở Command Prompt, cd tới thư mục Java -> jdk... -> bin. Sau đó gõ lệnh sau: 
 
 `keytool -list -v -keystore {keystore_name} -alias {alias_name}`
 

 Trên đây là những kiến thức về Dynamic Links mà mình học được, chúc mọi người code vui vẻ! :D

## Tài liệu tham khảo: 
Firebase docs: https://firebase.google.com/docs/dynamic-links 
:D