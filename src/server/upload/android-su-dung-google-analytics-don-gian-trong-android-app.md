Trong khi đang sử dụng những ứng dụng Android thông thường, có khi nào bạn tự hỏi rằng làm thế nào mà những người pát triển ứng dụng có thể theo dõi, thống  kê những thao tác của bạn trên ứng dụng chưa? 

Trong bài viết này mình sẽ giới thiệu với các bạn [Google Analytics](https://developers.google.com/analytics/devguides/collection/android/v4/),
là một service mạnh mẽ với những tính năng tuyệt vời như đếm số người dùng active trong thời gian thực, theo dõi các event, theo dõi geo,báo cáo error,crash và còn rất nhiều tính năng nữa, và nó được Google phát triển nên hoàn toàn free.

> **Chú ý:** Google đề xuất chúng ta sử dụng [Firebase SDK](https://firebase.google.com/docs/analytics/android/start) để theo dõi các ứng dụng android. Bạn cũng có thể sử dụng kết hợp [TagManager + Firebase SDK](https://developers.google.com/tag-manager/android/v5/) để làm điều này. Nếu bạn vẫn muốn sử dụng Google Analytics thì tiếp tục đọc bài viết này nhé. Để biết thêm các phương thức để theo dõi ứng dụng bạn có thể tham khảo tại [đây](https://support.google.com/analytics/answer/7385763).
> 

Bìa viết này giúp bạn sử dụng Analytics đơn giản  trong  ứng dụng Android để đo hoạt động của người dùng trên từng màn hình. Nếu bạn chưa có ứng dụng nào, hoặc chỉ muốn biết các Aalytics hoạt động, có thể xem ứng dụng mẫu tại [đây](https://developers.google.com/analytics/devguides/collection/android/v4/start).

### Tạo tài khoản và Tracking ID
Đăng ký [Google Analytics](https://analytics.google.com/analytics/web/#/), bạn nhập tên, tên app chọn region, sau đó submit.
![](https://images.viblo.asia/e9bec8da-92a2-46fd-8bee-b3e2dd80d944.png)
 Nếu đăng ký thành công, trang web sẽ điều hướng bạn sang Google Analytics. Ở tab Admin bạn có thể thấy Google Analytics Tracking ID của bạn. ID có dang UA-xxxxxxxxx-x, nó sẽ được dùng  trong ứng dụng.
![](https://images.viblo.asia/90e55222-cd1d-48d8-a948-9bb6c701854d.jpg)

### Set up Project
* Thêm quyền INTERNET và ACCESS_NETWORK_STATE vào file AndroidManifest.xml
    ```java
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
              package="com.example.analytics">

      <uses-permission android:name="android.permission.INTERNET"/>
      <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>

      <application android:name="AnalyticsApplication">
        ...
      </application>
    </manifest>
    ```
* Mở build.gradle trong project và add google analytic  dependency
    ```java
    dependencies {
      // ...
      classpath 'com.google.gms:google-services:3.0.0'
    }
    ```
* Thêm   Google Play Service dependency vào file app/ build.gradle:
    ```java
    dependencies {
      // ...
      implementation 'com.google.android.gms:play-services-analytics:10.2.4'
    }
    ```
* **Tạo file global_tracker.xml**

    Tạo file theo đường dẫn src/res/xml/global_tracker.xml với nội dung:
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
      <string name="ga_trackingId" translatable="false">${YOUR_TRACKING_ID}</string>
    </resources>
    ```
    **Thay thế ${YOUR_TRACKING_ID} bằng TrackingID tạo được ở bước 1.**
   
 Bạn sẽ cần Sync Project để hoàn thành việc setup.
 
###  Theo dõi màn hình
Tại đây, bạn sẽ gửi tên màn hình  được thay đổi cho Analytics bất cứ khi nào người dùng mở hoặc thay đổi màn hình trên ứng dụng của bạn. Code của bạn nên làm như sau:
* Tạo instance của GoogleAnalytics trong lớp con của Application
* Override phương thức callback cho Activity.
* Cung cấp tên cho màn hình và thực hiện theo dõi.
* 
Tạo lớp con của Application
```java
public class AnalyticsApplication extends Application {

  private static GoogleAnalytics sAnalytics;
  private static Tracker sTracker;

  @Override
  public void onCreate() {
    super.onCreate();

    sAnalytics = GoogleAnalytics.getInstance(this);
  }

  /**
   * Gets the default {@link Tracker} for this {@link Application}.
   * @return tracker
   */
  synchronized public Tracker getDefaultTracker() {
    // To enable debug logging use: adb shell setprop log.tag.GAv4 DEBUG
    if (sTracker == null) {
      sTracker = sAnalytics.newTracker(R.xml.global_tracker);
    }

    return sTracker;
  }
}

```
> Xem thêm về cách tạo Tracker tại [đây](https://developers.google.com/analytics/devguides/collection/android/v4/advanced#init).
> 
Tại Activity hoặc Fragment muốn theo dõi, lấy instance của Tracker trong OnCreate:
```java
// Obtain the shared Tracker instance.
AnalyticsApplication application = (AnalyticsApplication) getApplication();
mTracker = application.getDefaultTracker();
```

Ghi đè phương thức thích hợp, chẳng hạn như onResume cho Activity hoặc onPageSelected cho ViewPager để ghi nhật ký khi màn hình thay đổi.
```java
mTracker.setScreenName("screen" + name);
mTracker.send(new HitBuilders.ScreenViewBuilder().build());
```
Đảm bảo đặt tên bên trong mỗi Actvity hoặc Fragment nếu bạn muốn phân biệt giữa các lượt xem màn hình cho ứng dụng của mình trong Analytics. Tất cả hoạt động được ghi lại trên trình theo dõi được chia sẻ sẽ gửi tên màn hình gần đây nhất cho đến khi được thay thế hoặc xóa (đặt thành null).

**Theo dõi màn hình tự động**
Bạn có thể tự động đo lượt xem màn hình mỗi khi Activity của ứng dụng được hiển thị cho người dùng.
Để bật tính năng này:
* Đặt tham số ga_autoActivityTracking trong file global_tracker.xml.
* Đặt tên cho mỗi Acitivity trong file global_tracking.xml.


    ```java
    <!-- Enable automatic Activity measurement -->
    <bool name="ga_autoActivityTracking">true</bool>

    <!-- The screen names that will appear in reports -->
    <screenName name="com.example.ScreenviewActivity">
        AnalyticsSampleApp ScreenViewSampleScreen
    </screenName>
    <screenName name="com.example.EcommerceActivity">
        AnalyticsSampleApp EcommerceSampleScreen
    </screenName>
    ```

### THeo dõi Event
Event là một cách hữu ích để thu thập dữ liệu về tương tác của người dùng với các thành phần tương tác của ứng dụng của bạn, như nhấn nút hoặc sử dụng một mục cụ thể trong trò chơi.

Một Event bao gồm bốn trường mà bạn có thể sử dụng để mô tả sự tương tác của người dùng với nội dung ứng dụng của bạn:
![](https://images.viblo.asia/f3d5e6c4-2d76-47e3-8379-26bcef5c2435.png)

Để gửi event, sử dụng HitBuilders.EventBuilder:
```java
mTracker.send(new HitBuilders.EventBuilder()
    .setCategory(getString(categoryId))
    .setAction(getString(actionId))
    .setLabel(getString(labelId))
    .build());
```
>    **Chú ý:** Trên các thiết bị có Google Play Service được cài đặt, theo mặc định, việc gửi tự động với khoảng thời gian 2 phút .
### Theo dõi Caught Exceptions
Caught Exeptions chẳng hạn như thời gian chờ kết nối mạng trong khi yêu cầu dữ liệu, là lỗi trong ứng dụng của bạn mà bạn đã triển khai code để xử lý. 
```java
try {
     ...
} catch (Exception e) {
     t.send(new HitBuilders.ExceptionBuilder()
      .setDescription(getExceptionMethod() + ":" + getExceptionLocation())
      .setFatal(getExceptionFatal())
      .build());
}
```

Có thể bạn sẽ không thể nhìn thấy record exception này ngay, thường nó sẽ cần 1 ngày để thống kê trên Google 

### Theo dõi Crash
Ứng dụng bị crash xảy ra trong nhiều trường hợp chúng ta không biết được nguyên nhân. Việc tự động lưu lại Crash App được thực hiện tự động bằng cách thiếp lập ga_reportUncaughtExceptions là true trong global_tracker.xml file. 
Sau khi gửi một ngoại lệ bằng cách sử dụng phép đo ngoại lệ tự động, ngoại lệ sẽ được chuyển cho trình xử lý ngoại lệ mặc định của Thread.

```xml
<bool name="ga_reportUncaughtExceptions">true</bool>
```
Việc thống kê Crash cũng có thể được update sau 1 ngay.

**Chú ý**: Giá trị này chỉ có thể được đặt thành đúng cho một Tracker duy nhất. Nếu được chỉ định cho nhiều Tracker, thì cái cuối cùng được khởi tạo sẽ được sử dụng

### Xem thống kê
Bạn có thể xem tại Trang chủ [Analytics](https://analytics.google.com/analytics/web/#/report-home/a134957690w195034452p190344850) 
![](https://images.viblo.asia/0c81b96a-9ac7-4dde-aac5-ffe9fce3241c.png)

Do chưa có người dùng nên hiện tại tất cả vẫn chưa có số liệu gì. :D




-----
Qua bài viết này hi vọng có thể giúp bạn bước đầu biết cách sử dụng Google Analytics trong ứng dụng của mình.
### Tài liệu tham khảo :
* https://developers.google.com/analytics/