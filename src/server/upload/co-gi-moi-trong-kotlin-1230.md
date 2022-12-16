Vào ngày 1/3 vừa qua, kotlin 1.2.30 chính thức được release, Vậy có những gì mới ở bản 1.2.30 này:
* Thêm một khai báo mới trong thư viện chuẩn, bắt chước trình suspend sửa đổi cho các biểu thức lambda
* Thêm hỗ trợ cho TestNG trong `kotlin.test`
* Cung cấp hỗ trợ cho các mô đun Android trong các dự án nhiều nền tảng
* Giới thiệu một tính năng mới trong kapt để báo cáo các lỗi xử lý chú thích cùng với liên kết thích hợp với bản Kotlin ban đầu
* Thêm nhiều kiểm tra và ý định mới trong plugin IntelliJ và cải thiện hiệu suất của nó
* Sửa lỗi trong trình biên dịch và plugin IntelliJ
Bản cập nhật này tương thích với tất cả các phiên bản của IntelliJ IDEA từ 2017.1 đến 2017.3 và 2018.1 EAP cũng như với Android Studio 3.0 và Android Studio 3.1 (Beta)
Danh sách đầy đủ các thay đổi trong bản phát hành này có thể được tìm thấy trong [changelog](https://github.com/JetBrains/kotlin/blob/1.2.30/ChangeLog.md).

## Thay đổi trong thư viện
Bản phát hành này bổ sung một chức năng mới vào thư viện chuẩn Kotlin với chữ ký sau đây:
```
public inline fun <R> suspend(
    noinline block: suspend () -> R
): suspend () -> R = block
```

Mục đích của chức năng này là để gói một chức năng vào một giá trị của suspending function và cho phép sử dụng nó như là suspending function . Thí dụ:
```
suspend {
    val result = deferredResult.await()
    renderResult()
}.startCoroutine(completion)
```

Điều quan trọng cần lưu ý là thêm chức năng này là một bước sơ bộ để dần dần giới thiệu một `suspend` sửa đổi cho biểu thức lambda trong các phiên bản Kotlin tương lai. Không được phép sử dụng các chức năng không hợp lệ nếu nó là sửa đổi, chẳng hạn như lấy tham chiếu hàm hoặc sử dụng nhãn `return@suspend`, và các cuộc gọi tới các chức năng `suspend` có tên của bên thứ ba mà có thể xung đột với sửa đổi lần này sẽ không được dùng nữa .

Một thay đổi khác đáng chú ý là sự hỗ trợ cho framework TestNG trong `kotlin.test`. Các đối tượng mới `kotlin-test-testng` cung cấp một thực hiện `Asserter` trên đầu trang của TestNG và bản đồ các chú thích test từ `kotlin-test-annotations-common` đến các chúc thích test TestNG.

## Các mô đun nền nhắm mục tiêu đến Android
Bản cập nhật của các dự án thử nghiệm nhiều nền tảng thử nghiệm giới thiệu hỗ trợ cho các mô đun nền tảng Android. Các mô-đun này nên áp dụng plugin tương ứng trong tập lệnh Xây dựng Gradle và có thể sử dụng mã được chia sẻ từ một mô-đun chung:
```
apply plugin: 'com.android.application'
apply plugin: 'kotlin-platform-android'
// ...
 
dependencies {
    expectedBy project(":multiplatform-app")
    // ...
}
```
 
 Có thể tìm thấy ví dụ đơn gian trong kho lưu trữ Kotlin: [multiplatformAndroidProject](https://github.com/JetBrains/kotlin/tree/7b212c5650c511c46e5feccafa5dfd2dffe39d07/libraries/tools/kotlin-gradle-plugin-integration-tests/src/test/resources/testProject/multiplatformAndroidProject)
 
 ## Kapt diagnostic locations
 
 Với Kotlin 1.2.30, kapt, công cụ xử lý chú thích Kotlin, có thể cung cấp liên kết đến các vị trí trong mã Kotlin ban đầu chứ không phải là các đoạn khai báo Java vì nó báo cáo lỗi gặp phải trong quá trình xử lý chú thích. Tính năng này có thể được kích hoạt bằng cách thêm các dòng này vào kịch bản xây dựng Gradle ( `build.gradle`):
 
 ``` 
kapt {
    mapDiagnosticLocations = true
}
```

Điều này sẽ thêm các vị trí ban đầu trong các tệp Kotlin vào các báo cáo lỗi từ bộ vi xử lý chú thích, ví dụ:
```
e: src/main/kotlin/Foo.kt:47: error: @Provides methods must not be private
```
### Chấp nhận của kapt cũ
Kaptor gốc đã bị phản đối một năm trước và trong 1.2.30 chúng tôi đã thay đổi cảnh báo phản đối sang lỗi. Quá trình chuyển đổi sang kapt mới (aka kapt3) rất dễ, chỉ cần áp dụng kotlin-kaptplugin trong file `build.gradle`:
```
apply plugin: "kotlin-kapt"
```

## Cải tiến plugin IntelliJ IDEA

Bản phát hành này mang lại nhiều cải tiến trong plugin IntelliJ IDEA Kotlin, chẳng hạn như cải tiến hiệu năng, sửa lỗi và kiểm tra và ý định mới

### Ý định chuyển đổi các scop mà hàm gọi đến

Kotlin 1.2.30 đã thêm chức năng chuyển đổi cho các sopce: `let` - `run`, `also` - `apply`

### Dán mã Kotlin vào một gói
Các plugin IntelliJ bây giờ cho phép dán mã Kotlin vào một gói mục trong dự án , tạo ra một flie Kotlin mới cho mã:

## Cách cập nhật
Để cập nhật plugin, sử dụng Tools | Kotlin | Configure Kotlin Plugin Updates và nhấn nút "Check for updates now". Ngoài ra, đừng quên cập nhật trình biên dịch và phiên bản thư viện chuẩn trong các kịch bản xây dựng Maven và Gradle của bạn. 
Như thường lệ, nếu bạn gặp phải bất kỳ sự cố nào với phiên bản mới, bạn có thể yêu cầu giúp đỡ trên [diễn đàn](https://discuss.kotlinlang.org/) , về Slack (nhận lời mời ở [đây](http://slack.kotlinlang.org/) ) hoặc để báo cáo vấn đề trong trình theo dõi [vấn đề](https://youtrack.jetbrains.com/issues/KT) .