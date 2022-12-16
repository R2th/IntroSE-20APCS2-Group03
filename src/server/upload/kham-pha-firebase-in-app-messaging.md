![](https://images.viblo.asia/b1ccc213-2983-42a4-8c5a-81532909cffc.png)

Nguồn : https://medium.com/coding-blocks/exploring-firebase-in-app-messaging-e3cbcf3d6895


Một ngày tuyệt vời, một team tuyệt vời  đằng sau Firebase đã thông báo rằng In-App-Messaging cho những ngưới sử dụng Android và IOS

Ở phiên bản Beta này, dịch vụ mới này cho phép bạn hiện thị Alert Dialogs trên thiết bị của User trong khi họ đang sử dụng App của bạn để tăng sự tương tác hoặc là một hướng dẫn thực hiện một hành động nào đó trong App của bạn.Ví dụ , bạn có thể gửi In-App Messaging để  người sử dụng đăng ký , xem video , hoàn thành cấp độ level hoặc mua một mặt hàng nào đó.

Bạn có thể xem giới thiệu của Firebase :  https://www.youtube.com/watch?v=5MRKpvKV2pg

Chúng ta cùng thử khám phá nó nhé, Chúng ta tạo một message đơn giản để hiện một thông báo cho User xem về một trận đấu giữa TOTTENHAM - MANCHESTER UNITED.
 
##  Step 1: Kết nối tới App của bạn
 
 Đây là bước đơn giản để thiết lập firebase vào trong project của bạn. Bạn có thể tham khảo hướng dẫn [tại đây](https://firebase.google.com/docs/android/setup)  

## Step 2: Tích hợp SDK

In-App messaging yêu cầu bạn thêm vào dependency tới App của bạn:

```Kotlin
dependencies {
    //...
    // In app message
    implementation 'com.google.firebase:firebase-inappmessaging-display:17.0.0'
}
```

Tạo  `MyClickListenerBundles.class `
```
package com.friend.demoinapmessage

import android.util.Log
import com.google.firebase.inappmessaging.FirebaseInAppMessagingClickListener
import com.google.firebase.inappmessaging.model.Action
import com.google.firebase.inappmessaging.model.InAppMessage

class MyClickListenerBundles : FirebaseInAppMessagingClickListener {
    override fun messageClicked(inAppMessage: InAppMessage, action: Action) {
        val url = action.actionUrl
        val metadata = inAppMessage.campaignMetadata
        val dataBundle = inAppMessage.data
        Log.d(
            "MyClickListener",
            "url: $url , metadata: ${metadata?.campaignId} - ${metadata?.campaignName} - $dataBundle"
        )

    }
}
```

Trong `MainActivity` :

```Kotlin
package com.friend.demoinapmessage

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.google.firebase.inappmessaging.FirebaseInAppMessaging

/*
* https://medium.com/coding-blocks/exploring-firebase-in-app-messaging-e3cbcf3d6895
* */
class MainActivity : AppCompatActivity() {

    val listener = MyClickListenerBundles()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        FirebaseInAppMessaging.getInstance().addClickListener(listener)
    }
}
```

Trong `AndroidManifest.xml`
```Kotlin
<meta-data
            android:name="firebase_inapp_messaging_auto_data_collection_enabled"
            android:value="true" />
```


## Step 3: Tạo message đầu tiên

Gửi và nhận message không yêu cầu thiết lập code nào cả.

Chúng ta có thể gửi và nhận tin nhắn trực tiếp trên thiết bị từ Firebase Console. 

Bạn có thể tạo campaign và bên trong mỗi campaign , có 4 kiểu khác nhau của In-App message ,chúng ta có thể tạo Card, Modal, Image và Top Banner.

![](https://images.viblo.asia/c09d72a1-ed53-4fb2-8c93-16302c958f28.png)


**Step 3.1: Create a Card message**

Card thì tương tự với AlertDialog và nó có những thuộc tính sau:

**Background** : Dùng để xác định background cho dialog

**Text Colour**: Xác định text colour trong dialog

**Title**: Text hiện lên Title dialog

**Body** (Optional): là message như là body của Dialog

**Image URL** (Optional): Image URL nếu bạn muốn hiện image 

**Button Text** (Optional): Text cho button nếu bạn muốn có button

**Button Action**: URL để điều hướng khi user click button

![](https://images.viblo.asia/ff8fc79a-b4f7-4915-8a8b-74609458e09b.png)

**Step 3.2: Lựa chọn Target cho message của bạn**

Bạn có thể lựa chọn Target user mà Message được gửi đến. Nếu bạn có sử dụng Push Message thì nó khá giống:

**Campaign Name**: Không xuất hiện cho người dùng, và được dùng để đánh dấu campaigns của bạn

**Campaign Description** (Optional): Mô tả ngắn gọn campaign và không xuất hiện cho người dùng

**Target app and other conditions**: Xác định điều kiện mà tất cả user nhìn thấy message

![](https://images.viblo.asia/f5c26766-f74d-43b9-92c0-717bac8d747b.png)


**Step 3.3: Scheduling the message**

Phần này, bạn có thể chỉnh ngày bắt đầu và ngày kết thúc cho campaign của bạn , với số lượng thông báo được hiển thị:

**Start time**: Thời gian bắt đầu campaign theo mặc định là "Now"

**End time**: Thời gian kết thúc campaign

**Trigger**: Kích hoạt thông báo được hiện thị. Điều này có một số trường mặc định như app_exception, app_clear_data, first_open, app_start và bạn có thể thêm một số kích hoạt tùy chỉnh bằng cách sử dụng Firebase Anlytics.

**Frequency Limit**: Tần số message được xuất hiện trong 1 ngày.
Theo mặc định thì 1 ngày chỉ  1 message

![](https://images.viblo.asia/77acf22a-50c2-4b52-b5ea-a4e782c008b9.png)

**Step 3.4: Conversion eventsConversion events**

Đây là trường hợp tùy chọn, Bạn có thể kích hoạt sự chuyển đổi này dựa vào lựa chọn sự kiện mà bạn lựa chọn. Mà bạn có thể  theo dõi nó sau này trong phân tích của bạn.

![](https://images.viblo.asia/d87686a3-649c-4a60-a62b-e101dacc3786.png)

Bạn có thể xuất ra sự kiện và bạn có thể thấy các message trên thiết bị của user.

Để tạo các loại message khác nhau (Image hoặc Top Banner), bạn có thể chọn các loại khác ở bước **Step 3.1: Create a Modal message** 

Bạn có thể tạo những campaign khác rồi sẽ hiện cho các bạn danh sách như thế này :

![](https://images.viblo.asia/8112cfaf-afc4-4ca4-b1a5-d8cebc4222f2.PNG)

Bạn có thể xem bao nhiêu người xem message hay bao nhiều người click vào message như hình dưới :

![](https://images.viblo.asia/ad32b940-f0a2-42b5-82d0-1488d6b77309.PNG)


## Step 4: Test

Bạn có thể test với thiết bị cụ thể với id như sau trong Log của Android studio như sau :

![](https://images.viblo.asia/1f2a7854-cb96-4614-992f-7f1955a5103c.PNG)

Bạn nhớ lấy ID nhé sau đó gán vào  mục test của In App Message và mở mục test như sau:

![](https://images.viblo.asia/e59927b7-42ac-486e-944c-13ebaa518206.PNG)

Sau :

![](https://images.viblo.asia/90317b29-8157-4625-abe5-a57c30196980.PNG)

Việc còn lại là bạn chờ message trả về thồi  :)


## Step 5: Thành quả

![](https://images.viblo.asia/3a2df87f-a5f2-4a63-9e53-6c2063b04280.jpg)

Bài hiện giúp bạn thực hiện những bước thực hiện cơ bản về In App Message. Hy vọng bài này sẽ giúp một phần nào đó cho bạn. Nếu có sai xót gì. bạn có thể comment bên giúp mình cải thiện nhé.

Tài liệu : 

https://medium.com/coding-blocks/exploring-firebase-in-app-messaging-e3cbcf3d6895

https://firebase.google.com/docs/in-app-messaging/get-started

Link Github : https://github.com/haiminhtran810/InAppMessageDemo