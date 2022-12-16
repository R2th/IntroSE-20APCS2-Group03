## 1. Config project
- SDK log hai loại thông tin cơ bản gồm :
 + **Event**: những gì xảy ra trong app của bạn, ví dụ như actions, system events hoặc errors.
 + **User properties**: những thuộc tính bạn định nghĩa trong app, ví dụ như language preference, location.
 Ngoài ra, Analytics cũng tự động log một số [event](https://support.google.com/firebase/answer/6317485) và [user properties](https://support.google.com/firebase/answer/6317486) , vì vậy bạn không cần thêm code để enable chúng.
 
 Đầu tiên, project của bạn phải setup firebase trước, nếu chưa setup thì hãy tham khảo ở [đây](https://viblo.asia/p/firebase-android-overview-3P0lPYL85ox#_4-cai-firebase-vao-project-9) nhé. 
 
 Add Analytics SDK vào app: 
 1. Ở app/build.gradle, thêm dependency sau:
 
```java
implementation 'com.google.firebase:firebase-analytics-ktx:17.6.0'
```

2. Tạo một object **com.google.firebase.analytics.FirebaseAnalytics** ở activity:

```java
private lateinit var firebaseAnalytics: FirebaseAnalytics
```

3. Init nó trong hàm onCreate():

```java
// Obtain the FirebaseAnalytics instance.
firebaseAnalytics = Firebase.analytics
```

Đến đây là xong bước chuẩn bị rồi.
 
## 2. Log events
Sau khi bạn create một *FirebaseAnalytics* instance, bạn có thể bắt đầu log events với hàm *logEvent()*.
Có một số [event name](https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics.Event) chỉ được dành riêng cho firebase tự đông log, bạn không được đặt name giống với những event name này. 
Dưới đây là một ví dụ về cách log event:

```java
private val bundle = Bundle()
bundle.putString("state_noti", "ON")
firebaseAnalytics.logEvent("notification_onoff", bundle)
bundle.clear()
```

Có thể quan sát log ở Android Studio debug log, có thể log được các event auto và event custom. Bạn có thể enable verbose logging với các dòng lệnh adb commands:

```java
$ adb shell setprop log.tag.FA VERBOSE
```

```java
$ adb shell setprop log.tag.FA-SVC VERBOSE
```

```java
$ adb logcat -v time -s FA FA-SVC
```

Còn cách quan sát trên console nữa, mình trình bày phía sau đây.

## 3. Set user properties and user id

Bạn có thể set Analytics User Properties để mô tả người dùng app, khi xem các report thì bạn có thể phân tích các hành vi người dùng. Để set user property:
 1. Mở firebase console, vào mục Analytics sau đó đăng ký property vào trang "User Properties" . Để biết thêm thông tin, xem [Set and register a user property](https://support.google.com/firebase/answer/6317519?hl=en&ref_topic=6317489#create-property)
 2. Viết code để set một Analytics User Property với phương thức *setUserProperty()*.
Ví dụ :
```java
firebaseAnalytics.setUserProperty("favorite_food", food)
```

- Sau khi đăng ký user property, thì có thể mất hàng giờ sau mới có thể xem đc trên console. Bạn vào mục Analytics, chọn User Properties để có thể truy cập được dữ liệu này. Dashboard sẽ show ra một list user properties mà bạn đã define trong app. Dữ liệu này thường xuyên được refresh trong ngày.

## 4. Debug events

- DebugView sẽ giúp bạn theo dõi được những event mà bạn log lên firebase một cách dễ dàng và trực quan, từ đây bạn cũng có thể quan sát được code có lỗi hay không.

 Để bật chế độ debug trên thiết bị android, thực hiện theo lệnh sau:
   ```$ adb shell setprop debug.firebase.analytics.app package_name```
   
 Tắt chế độ debug: 
 ``` $ adb shell setprop debug.firebase.analytics.app .none. ```
 
 Khi bật chế độ debug trên thiết bị của bạn xong thì hãy vào mục DebugView của Analytics trên console: 
 
 ![](https://images.viblo.asia/a97acbf1-79f6-44e9-a880-39f87218c70d.png)
 
 Bạn chọn device mà bạn đang sử dụng để tracking log nhé :


![](https://images.viblo.asia/5bf709b6-e491-4b8b-9a19-a8d1b9cc835e.png)



Khi thực hiện các thao tác để log, thì các event sẽ được log lên, ví dụ như sau: 

![](https://images.viblo.asia/13a349de-6b9d-416d-85c0-2157f6737a64.png)


Ở đây có 3 cột: 
 + Cột bên trái là Minutes stream, hiển thị những thời gian có sự kiện trong vòng 30 phút trở lại hiện tại.

![](https://images.viblo.asia/15decb43-3f89-452f-a8ac-273609b787c0.png)


 + Cột ở giữa Seconds stream là cột các event được log ra trong mỗi 60s.

Với cột Seconds stream, mặc định bạn sẽ thấy những event được log ra trong 60s, mỗi event hiển thị ở một mốc thời gian xác định. Bạn có thể click vào một event và xem list param mà event đó mang theo, ví dụ như sau:

![](https://images.viblo.asia/f8ea42dc-b8b2-4f34-95ab-0a62bd1fcde8.png)

 + Cột bên phải là Top Event được log ra trong vòng 30phut, gồm cả user property.

![](https://images.viblo.asia/a20cd2d3-69e1-42f9-9ca0-71d75311641f.png)

## 5. Track Screens

Google Analytics sẽ theo dõi các màn hình và sẽ log thông tin khi có sự chuyển đổi giữa các màn. 

Nó sẽ mặc định theo dõi một số màn hình và tự động log thông tin của màn đó lên, ví dụ như tên của các class **UIViewController** hoặc **Activity** đang được focus. Khi có sự chuyển đổi màn hình thì Analytics sẽ log event *screenview* lên. 

Với Analytics version từ dưới 17.4.4 bạn có thể tự set event screen như sau : 

```java
firebaseAnalytics.setCurrentScreen(this, screenName, null /* class override */)
```

Còn với Analytics version 17.5.0 họ đã thông báo phương thức *setCurrentScreen()* sẽ bị bỏ ở những version sắp tới, thay thế cho nó là sử dụng *logEvent()* như sau : 

```java
firebaseAnalytics.logEvent(FirebaseAnalytics.Event.SCREEN_VIEW) {
    param(FirebaseAnalytics.Param.SCREEN_NAME, screenName)
    param(FirebaseAnalytics.Param.SCREEN_CLASS, "MainActivity")
}
```

Sau khi set xong thì quan sát Debug View thấy nó log lên các thông tin như sau : 

![](https://images.viblo.asia/2e10f31e-10d9-47da-8a95-3362a9530679.png)

Và nó sẽ giữ cái name này cho đến khi có sự chuyển đổi sang screen khác . Cho nên bạn  hãy check kỹ các event khác mà được log theo screen name nhé.

Bạn cũng có thể set id cho user bằng cách sử dụng : 

```java
Analytics.setUserID("123456")
```

Thì event được log lên là *user_id* với thông tin là id mà bạn đã set.

Trên đây là những gì mình học được, chia sẻ cho mọi người để nếu ai cần thì sử dụng được. Chúc mọi người code vui vẻ (F) .


### Tham khảo 

[Firebase Analytics docs](https://firebase.google.com/docs/analytics)