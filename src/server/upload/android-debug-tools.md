Bài viết được  tham khảo từ 
https://proandroiddev.com/android-debug-tools-a403a3f5bae8

# Introduce
 Cải thiện chất lượng sản phẩm luôn là một chủ đề nóng và quan trọng trong việc phát triển phần mềm. Quá trình phát triển sản phẩm bao gồm nhiều phần cần được thực hiện liên tục. Trong bài viết này chúng ta sẽ tìm hiểu về các tools hỗ trợ  việc debug trên Android. Debug là một quá trình quan trọng trong việc phát triển phần mềm mà bất cứ lập trình viên nào cũng phải biết. Nó giúp cho  chúng ta dễ dàng tìm và fix bug nhanh chóng kịp thời.
 
 Là lập trình viên, chúng ta cố gắng không chỉ đáp ứng mà còn vượt quá sự mong đợi của khách hàng . Tôi đã sử dụng nhiều công cụ debug khác nhau và mỗi công cụ đều có những ưu điểm riêng. Thật không thuận tiện khi có nhiều dependencies trong project và chuyển đổi tất cả thời gian giữa các công cụ khác nhau để kiểm tra các tầng network hay database.Sau một thời gian dài tôi đã tìm kiếm giải pháp đáp ứng tất cả các nhu cầu  cho đến khi một ngày nào đó xuất hiện ý tưởng để tạo ra giải pháp của riêng mình.
 
 
 Bài viết sẽ hướng dẫn bạn sử dụng một số công cụ debug hiệu quả khi phát triển ứng dụng Android
 
1. [Android Profiler ](https://developer.android.com/studio/profile/android-profiler)
2. [Facebook Stetho](http://facebook.github.io/stetho/) 
3. [DebugDrawer](https://github.com/palaima/DebugDrawer) 
4. [AppSpector ](https://appspector.com/)
## 1. Android Profiler (Trình giám sát)
![](https://images.viblo.asia/50212588-1de4-4cd3-85e5-fef1939b7c41.jpeg)

Android Profiler tool cung cấp dữ liệu real time giúp ta cấu hình tầng network và chỉ ra cách app sử dụng CPU và dùng bộ nhớ, và pin như thế nào. Kể từ Android Studio 3.0 ta có thể cấu hình profiler khi ứng dụng đang chạy với device 7.1 trở lên

![](https://images.viblo.asia/7a97dc09-1f4f-4bf1-b216-806b71053e54.png)
### Network inspection 
- Nếu bạn click vào network timeline profile sẽ show chi tiết thông tin về các request bao gồm các thông tin về size, time, status, request, respone,..
- ![](https://images.viblo.asia/417693b7-bf62-4909-b573-9610a05f0443.png)
### Memory inspection
- Profiler sẽ show cho ta biểu đồ mực sử dụng RAM như sau, nhờ nó mà ta có thể thấy các function tạo ra extra objects và giảm các sự kiện của garbage collection
![](https://images.viblo.asia/239c4818-fe7e-4e62-bb04-7a2bb38d628a.png)
### Advanced profiling
- Bạn có thể chỉnh sửa cấu hình Run của ứng dụng để bật tùy chọn advanced profiling
![](https://images.viblo.asia/9e2d7b59-7bd4-444a-9b47-6ed0e6972d22.png)
- Khi cấu hình advanced profiling nó sẽ cung cấp một số chức năng khác như:
1. Tất cả các màn hình cấu hình hỗ trợ event timeline 
2. Memory Profiler hiển thị số lượng object được phân bổ 
3. Memory Profiler hiển thị các sự kiện thu gom rác (garbage collection) 
4. Network Profiler hiển thị chi tiết về tất cả các tệp được truyền

### Ưu nhược điểm
- Android Studio profiler   hoạt động tốt và bạn không cần phải tích hợp các phụ thuộc của bên thứ ba vào dự án của mình. Các màn hình có sẵn (Mạng, CPU, Memory, Energy) hiển thị thông tin thực sự đầy đủ về ứng dụng của bạn. Nó thực sự hữu ích khi triển khai Trình giám sát mạng này vì bạn có thể chọn khung thời gian trên timeline và kiểm tra kỹ các request. 

- Không có trình giám sát cho database và đó là nhược điểm lớn nhất, theo tôi, điều gì khiến chúng tôi sử dụng các công cụ khác, ví dụ như plugin[ SQLStout](http://www.idescout.com/), hay[ Android-Debug-Database](https://github.com/amitshekhariitbhu/Android-Debug-Database)

## 2. Facebook Stetho
![](https://images.viblo.asia/f90c9076-33e6-43e2-a661-d3438f5dcaeb.png)
- Stetho là công cụ cầu nối cho Android cho phép truy cập vào Chrome Developer Tools để kiểm tra ứng dụng của bạn
### Integration
- Để cấu hình Stetho ta chỉ cần add dependecies vào ứng dụng của bạn

```kotlin
implementation 'com.facebook.stetho:stetho:1.5.0'
implementation 'com.facebook.stetho:stetho-okhttp3:1.5.0'
```
- Để khởi tạo Stetho ta chỉ cần add `Stetho.initializeWithDefaults(this);`  vào onCreate() của Application 
- Để Stetho có thể show dữ liệu network với Okhttp client tao cần cấu hình interceptor cho chúng 
```java
new OkHttpClient.Builder()
    .addNetworkInterceptor(new StethoInterceptor())
    .build()
```
### Features
- Stetho cho phép kiểm tra tầng network và dữ liệu trong app 
- ![](https://images.viblo.asia/b1d2f5f1-021d-4142-b637-050e038483c1.png)
- Ta có thể chuyển đổi các mục kiểm tra sử dụng các tab
### Network inspection
![](https://images.viblo.asia/6fe9ab9c-7374-4df2-a72f-46995b0d28ab.png)
- Với network Sthetho show cho chúng ta biết status, type, time, size của mỗi request. Nếu click vào mỗi dòng ta có thể xem được thông tin chi tiết 
![](https://images.viblo.asia/5ae8f8d7-0087-40d8-8ee8-64617cce38c8.png)
### Database inspection
- Ở tab resource sẽ show bảng SQL theo dạng
![](https://images.viblo.asia/80737dd9-f245-47e2-9a7d-c194a5bfc896.png)
- Tab này chứa cột bảng đơn giản mà không cần tìm kiếm và phân trang. Nó cũng có thể chứa lỗi, ví dụ, trên ảnh chụp màn hình ở trên, bạn có thể thấy hai cột id.
### Sample project
- Bạn có thể tham khảo : https://github.com/facebook/stetho/tree/master/stetho-sample
### Ưu nhược điểm
- Stetho là một công cụ miễn phí cho phép bạn kiểm tra các lớp mạng và tầng dữ liệu. Bạn cũng có thể cài đặt thư viện Stetho-Realm mà bạn cần để kiểm tra cơ sở dữ liệu Realm. Stetho là miễn phí và rất dễ để bắt đầu nhưng nó chứa lỗi, giao diện người dùng chưa được tối ưu và chức năng còn hạn chế.
## 3. DebugDrawer
- Thư viện giúp ta tạo ra 1 thanh navigation drawer hiển thị các thông tin debug của ứng dụng
- Để cấu hình debug drawer cho ứng dụng của bạn ta chỉ cần add dependencies cho chúng: 
```
debugImplementation ‘io.palaima.debugdrawer:debugdrawer:0.8.0’
```
- Sau đó ta có thể cài thêm các module mà chúng ta muốn debug ví dụ như ta muốn debug các request 
```java 
implementation 'io.palaima.debugdrawer:debugdrawer-okhttp3:0.8.0'
```
- Khởi tạo navigation drawer debug 
```java 
SwitchAction switchAction = new SwitchAction("Test switch", new SwitchAction.Listener() {
 @Override
 public void onCheckedChanged(boolean value) {
  Toast.makeText(MainActivity.this, "Switch checked", Toast.LENGTH_LONG).show();
 }
});

ButtonAction buttonAction = new ButtonAction("Test button", new ButtonAction.Listener() {
 @Override
 public void onClick() {
  Toast.makeText(MainActivity.this, "Button clicked", Toast.LENGTH_LONG).show();
 }
});

SpinnerAction < String > spinnerAction = new SpinnerAction < > (
 Arrays.asList("First", "Second", "Third"),
 new SpinnerAction.OnItemSelectedListener < String > () {
  @Override public void onItemSelected(String value) {
   Toast.makeText(MainActivity.this, "Spinner item selected - " + value, Toast.LENGTH_LONG).show();
  }
 }
);

debugDrawer = new DebugDrawer.Builder(this)
 .modules(
  new ActionsModule(switchAction, buttonAction, spinnerAction),
  new FpsModule(Takt.stock(getApplication())),
  new LocationModule(this),
  new ScalpelModule(this),
  new TimberModule(),
  new OkHttp3Module(okHttpClient),
  new PicassoModule(picasso),
  new GlideModule(Glide.get(getContext())),
  new DeviceModule(this),
  new BuildModule(this),
  new NetworkModule(this),
  new SettingsModule(this)
   ).build();
```
### Features
- Khi cấu hình xong nó sẽ trông như thế này 
![](https://images.viblo.asia/e002dda1-5ec1-480c-b898-83528e72ea1a.png)
- Nó rất thuận tiện cho phép ta kiểm tra các thông tin về device, change setting , location,...
- Bạn có thể xem code sample tại : https://github.com/palaima/DebugDrawer/blob/master/app/src/main/java/io/palaima/debugdrawer/app/DebugViewActivity.java
### Ưu nhược điểm
- DebugDrawer cho phép bạn truy cập nhanh vào thông tin và cài đặt của thiết bị, cho phép bạn giả định vị trí và trạng thái kết nối mạng. Điều này có thể đơn giản hóa một quá trình thử nghiệm nhưng thật khó để kiểm tra yêu cầu mạng trên màn hình của thiết bị di động. Nhưng nó không có chức năng debug với database
## 4. AppSpector 
![](https://images.viblo.asia/09e0e47d-c3cd-496b-aec7-b2a95ff78e79.png)
- AppSpector là một dịch vụ debuging trên IOS và Android app cho phép chúng ta kiểm tra và điều khiển app từ xa real time thông qua giao diện đơn giản. Bạn có thể xem tài liệu tại [đây ](https://docs.appspector.com/)
### Integration 

```java
buildscript {
    repositories {
        jcenter()
        google()
        maven {
            url "https://maven.appspector.com/artifactory/android-sdk"
        }
    }

    dependencies {
        classpath "com.appspector:android-sdk-plugin:1.+"
    }
}

apply plugin: 'com.android.application'
// Put AppSpector plugin after Android plugin
apply plugin: 'com.appspector.sdk'

repositories {
    maven {
        url "https://maven.appspector.com/artifactory/android-sdk"
    }
}

dependencies {
    implementation "com.appspector:android-sdk:1.+"
}
```
- Khởi tạo AppSpector 
```java
AppSpector
        .build(this)
        .withDefaultMonitors().run("android_OGMyYzA3NGYtNDkxNy00ZWRiLTgxOTktNjQ5YjIzMTZjOWM4");
```
### Features
- Khi bạn chạy ứng dụng của mình, một session mới sẽ được tạo và bạn sẽ thấy nó trong cửa sổ AppSpector chính trong trình duyệt
![](https://images.viblo.asia/921dca17-1da4-41a7-b488-70c84400edab.png)
### Performance inspection
- Với AppSpector ta có thể kiểm tra hiệu năng của app với các thông số về CPU, memory, FPS,... 
![](https://images.viblo.asia/1fa211c0-7621-4024-8276-16a7ec5e002b.png)
- Trình giám sát mạng hiển thị bảng có các request để bạn có thể nhấp vào một hàng nhất định để xem thông tin chi tiết request và response 
![](https://images.viblo.asia/efe8ab11-10da-4fcc-b4da-c51f594c7c5f.png)
### Database inspection 
- Ngoài performance inspection nó còn cho phép debug database trong ứng dụng của bạn 
![](https://images.viblo.asia/1ba6178e-7ad1-4d38-8571-6e693a10bf15.png)
### Ưu nhược điểm
- AppSpector có giao diện người dùng hoàn hảo. Nó rất dễ dàng để điều hướng thông qua nó và tìm màn hình cần thiết. Bạn có thể chia sẻ sesion của mình với đồng nghiệp của mình chỉ bằng cách đối phó địa chỉ url từ trình duyệt và gửi nó. Phiên chia sẻ có sẵn cho tất cả các thành viên trong project của bạn. AppSpector chứa nhiều màn hình khác nhau với các tùy chọn tìm kiếm và bộ lọc. Thời gian dùng thử là 14 ngày. AppSpector cũng hỗ trợ hai nền tảng: iOS và Android. Bạn kiểm tra bản demo trực tiếp [tại đây.](https://appspector.com/#live-demo)