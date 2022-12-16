# 1. Repro
### 1. Install Repro SDK
- Thêm dependence sau vào file app/build.gradle: 
```java
repositories {
     ...
     maven { url 'https://cdn.reproio.com/android' }
     ...
 }

 dependencies {
     ...
     implementation 'io.repro:repro-android-sdk:5.5.1'
     ...
 }
```
- Để dử dụng được Repro SDK, bạn phải có các permission sau: 
```java
android.permission.INTERNET
android.permission.ACCESS_NETWORK_STATE
```
- Setting rules sau vào ProGuard: 
```java
-dontwarn io.repro.android.**
-keep class io.repro.android.** { *; }
```

### 2. Setup
- Mình cần phải setup Repro với YOUR_APP_TOKEN ở SDK Token trong phần SETTINGS > PROJECT SETTINGS của màn hình quản lý. Khi lấy được token rồi thì init Repro như sau: 
```java
// Setup Repro
        Repro.setup(this, "YOUR_APP_TOKEN")
```

### 3. Track Events
- Để biết được các sự kiện của người dùng, tiện cho việc phân tích và áp dụng các chiến dịch quảng cáo thì Repro cho phép mình ghi lại các event của user. Nếu như không biết nên lấy sự kiện vào lúc nào thì Repro đề xuất cho bạn ghi lại sự kiện của user ngay khi user truy cập vào màn hình đó. Cụ thể là trong phương thức onResume():
```java
@Override
    protected void onResume() {
        super.onResume();
        Repro.track("MainActivity");

        ...
    }
```
- Sau khi set các events để tracking xong thì mình check kết quả trên Dashboard của Repro nhé: 
![](https://images.viblo.asia/b7fbea5e-7c7a-49cd-8e0b-bb5712194251.png)


### 4 . Set User ID
- Kết quả phân tích mà bạn nhìn thấy trên Repro là tổng hợp của mỗi user. Bằng cách set User ID, bạn có được các lợi thế như là: 
 + Xác định được một người dùng trên nhiều thiết bị khác nhau.
 + Đưa ra các chiến dịch được chính xác hơn.
- Bạn có thể set ID bằng cách dùng câu lệnh dưới đây. Giá trị maximum cho id là 191 ký tự.
```java
Repro.setUserID("xxxxxxxxxxxx")
```
- Ngoài ra, bạn cũng có thể sử dụng deviceID để thay thế: 
```java
Repro.setUserID(Repro.getDeviceID())
```
- Bạn cũng có thể get userID mà bạn vừa set: 
```java
val userID = Repro.getUserID()
```
- Hơn nữa, bạn còn có thể push notification từ Repro's dashboard. Xem thêm tại [đây](https://docs.repro.io/en/dev/sdk/push-notification/index.html)!

# 2. Adjust
![](https://images.viblo.asia/c63520a5-3217-4de6-90fe-c846045a6044.png)

### 1. Setup
- Thêm thư viện Adjust vào file build.gradle: 
```java
implementation 'com.adjust.sdk:adjust-android:4.28.4'
implementation 'com.android.installreferrer:installreferrer:2.2'
```
- Check các permission sau xem đã có trong project chưa, nếu chưa có thì thêm vào nhá: 
```java
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

### 2. Track Events
- Bạn có thể sử dụng Adjust để theo dõi bất kỳ sự kiện nào trên app của bạn. Cú pháp như sau: 
```java
AdjustEvent adjustEvent = new AdjustEvent("abc123");
Adjust.trackEvent(adjustEvent);
```
- Ngoài ra, Adjust còn có sự kiện check revenue như sau: 
```java
AdjustEvent adjustEvent = new AdjustEvent("abc123");
adjustEvent.setRevenue(0.01, "EUR");
Adjust.trackEvent(adjustEvent);
```
- Cụ thể hơn là mình còn có thể track được cả orderID: 
```java
AdjustEvent adjustEvent = new AdjustEvent("abc123");
adjustEvent.setRevenue(0.01, "EUR");
adjustEvent.setOrderId("{OrderId}");
Adjust.trackEvent(adjustEvent);
```
- Bạn cũng có thể virify được in-app Purchase thông qua   [Adjust's Purchase Verification ](https://github.com/adjust/android_purchase_sdk)
- Còn nhiều loại event nữa mà mình chưa dùng tới, mọi người tham khảo ở [đây](https://github.com/adjust/android_sdk#cp) nha.
- Khi set các events để tracking xong, theo dõi kết quả trên Dashboard của Adjust nhé:
![](https://images.viblo.asia/3bdd85f5-9944-4387-aee9-132bf5aa9c71.png)


### 3. Get Adid
- Bạn có thể get được định danh của device trên Adjust, bạn dùng: 
```java
String adid = Adjust.getAdid();
```


==> Tổng kết lại thì cả Repro và Adjust đều phục vụ mục đích chung đó là tracking event từ phía user để công ty phân tích và đưa ra các chiến lược kinh doanh cho phù hợp. Ngoài ra thì mỗi cái nó sẽ có những chức năng râu ria khác mà mình chưa tìm hiểu sâu được.
Vậy nên mình không đưa ra lời khuyên là nên dùng cái nào, cả 2 dự án mình join thì mỗi dự án dùng một cái. Cho nên là mình đưa ra để cho mọi người lựa chọn, ngoài Firebase Analytics thì còn mấy thằng khác nữa như Repro hay Adjust chẳng hạn.
# 3. Tham khảo
### 1. Repro: 
 - https://docs.repro.io/en/dev/sdk/getstarted/android.html
### 2. Adjust: 
- https://github.com/adjust/android_sdk