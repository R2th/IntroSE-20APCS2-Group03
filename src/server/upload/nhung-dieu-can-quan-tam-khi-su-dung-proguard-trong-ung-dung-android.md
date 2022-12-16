![](https://images.viblo.asia/a63e0e6b-3d5f-48d1-bf8a-4c201770dae5.png)
# Giới thiệu
Trong khi viết code cho ứng dụng Android của bạn, có thể có một số dòng code vô dụng và sẽ dẫn đến việc tăng kích thước APK ứng dụng của bạn. Ngoài mã không được sử dụng, có nhiều thư viện mà bạn có thể đã sử dụng trong ứng dụng của mình nhưng bạn chưa sử dụng tất cả các chức năng mà một thư viện cụ thể đang cung cấp. Ngoài ra, bạn có thể đã viết một số code không có ích trong tương lai và bạn đã quên xóa mã đó. Những điều này sẽ gây ra việc tăng kích thước APK của ứng dụng của bạn.

Để giảm kích thước của APK, Android cung cấp chức năng của Proguard. Sử dụng Proguard giúp đạt được ba chức năng dưới đây:

1. Minify the code (Rút gọn)
2. Obfuscate the code (Mã hóa)
3. Optimize the code (Tối ưu)

Vì vậy, Proguard sẽ giúp bạn giảm kích thước APK, loại bỏ các lớp và phương thức không sử dụng và cũng giúp cho ứng dụng của bạn khó có thể bị dịch ngược.

Vì vậy, trong khi sử dụng Proguard, bạn nên quan tâm đến một số điều. Trong blog này, chúng tôi sẽ xem xét một số điều cần phải quan tâm khi sử dụng Proguard trong Ứng dụng Android của chúng tôi. Vì vậy, hãy để bắt đầu với điểm đầu tiên.

# Loại trừ Proguard khỏi các lớp dữ liệu
Trong hầu hết mọi ứng dụng Android, có một số loại Dữ liệu hoặc Mô hình được sử dụng để tìm nạp một số dữ liệu từ cơ sở dữ liệu từ xa. Vì vậy, nếu bạn đang sử dụng Proguard thì Progurde sẽ thay đổi tên lớp, tên biến và tên phương thức. Ví dụ: nếu bạn đang có một lớp có tên Người dùng và nó chứa biến như **FirstName** và **LastName**, thì Proguard sẽ thay đổi tên lớp Người dùng của bạn thành A hoặc đại loại như thế. Đồng thời, tên biến của bạn có thể được thay đổi thành một số x, y, z. Vì vậy, nếu bạn muốn lưu trữ dữ liệu của cùng một biến được lưu trữ, trong Cơ sở dữ liệu, bạn sẽ có một ngoại lệ về thời gian chạy vì không có trường nào như vậy được tìm thấy trong cơ sở dữ liệu.

Để tránh điều này, bạn nên nói với Proguard để giữ các biến và methods của class User và không nên mã hóa nó. Để làm như vậy, hãy thêm dòng dưới đây vào tệp `proguard-rules.pro` của bạn:

```kotlin
-keep class your.fully.qualified.class.name.** { *; }
```

Bằng cách thêm dòng trên, Proguard sẽ bỏ qua việc mã hóa và tối ưu class mà bạn mong muốn.

# Không sử dụng Fragment TAG trong khi sử dụng Proguard

Hầu hết các vấn đề đang phải đối mặt trong Proguard là do khả năng mã hóa của nó. Tương tự như trong trường hợp của Fragment.

Bất cứ khi nào chúng ta tạo một Fragment, chúng ta đều khai báo một số String TAG như là `FragmentName. Class.getSimpleName ()` và sử dụng TAG này trong `Fragment` . Nhưng nếu bạn đang sử dụng Proguard, thì điều này có thể dẫn đến một số lỗi trong ứng dụng của bạn.

Ví dụ: Có hai fragments có tên `Fragement1` trong package `firstfragment` và `Fragment2` trong package `secondfragment`. Lúc này, Proguard sẽ thay đổi package `firstfragment` thành `a` và package `secondfragment` thành `b`,  đồng thời Proguard có thể thay đổi tên của `Fragment1` là `a`(vì package và Fragment khác nhau nên tên có thể giống nhau) và Fragment2 là `a` Cũng vì Fragment2 là package khác nhau.

Nhưng tại thời điểm này, nếu bạn đang sử dụng `FragmentName.class.getSimpleName()` thì điều này sẽ tạo ra sự nhầm lẫn bởi vì `Fragment1.class.getSimpleName()` đã được thay đổi thành `a.class.getSimpleName()` và `Fragment2.class.getSimpleName()` đã thay đổi thành `a.class.getSimpleName()`. Cả hai giá trị TAG sẽ bị lẫn lộn về đoạn nào đang được gọi. Vì vậy, nên tránh sử dụng `FragmentName.class.getSimpleName()`.

# Xử lý Reflection
Bất cứ khi nào các class và methods của bạn được truy cập một cách linh hoạt, tức là bằng cách sử dụng Reflection, thì bạn nên quan tâm đến Obfuscation của class hoặc method của bạn. Ví dụ: nếu bạn đang tham chiếu code của mình từ tệp XML (thường sử dụng reflection) và đồng thời nếu bạn đang sử dụng Proguard thì Proguard sẽ thay đổi tên lớp của bạn thành một tên hay một cái gì đó giống như trong mã XML không có thay đổi nào được thực hiện và điều này sẽ dẫn đến lớp không tìm thấy ngoại lệ hoặc phương pháp không tìm thấy ngoại lệ.

Vì vậy, luôn luôn giữ lớp sử dụng Reflection trong các quy tắc Proguard của bạn.

# Xử lý Views
Bất cứ khi nào bạn tạo view trong ứng dụng Android, hãy đảm bảo rằng view class mà bạn đang thực hiện được giữ trong quy tắc Proguard nếu không bạn sẽ nhận được class not found exception.

Ví dụ: nếu bạn đang tạo một view đơn giản có tên `com.mindork.simpleview` và nếu bạn đang sử dụng view này trong tệp XML của mình, thì Proguard sẽ thay đổi tên view class của bạn thành `a` hoặc là một cái gì đó tương tự và trong XML, code của bạn đang gọi `com.mindork.simpleview` và không có lớp nào như nó đã được đổi thành `a`.

Vì vậy, luôn đảm bảo giữ View của bạn trong các quy tắc của Proguard. Bạn có thể yêu cầu Proguard giữ các lớp đang mở rộng View bằng cách thêm các dòng dưới đây vào tệp proguard-rules.pro của bạn:

```kotlin
-keep public class * extends android.view.View {
    public <init>(android.content.Context);
    public <init>(android.content.Context, android.util.AttributeSet);
    public <init>(android.content.Context, android.util.AttributeSet, int);
    public void set*(...);
}
```

# Thêm quy tắc Proguard cho thư viện
Trong Ứng dụng Android của chúng ta, chúng ta sử dụng một số thư viện mã nguồn mở. Nhưng đồng thời nếu bạn đang sử dụng Progurad thì bạn phải bao gồm các quy tắc Proguard của các thư viện bạn đang sử dụng nếu có.

Để tìm các quy tắc Proguard của thư viện, bạn có thể đọc tệp `README.md` của thư viện mà bạn đã sử dụng và thêm các quy tắc Proguard đã cho trong ứng dụng của mình. Một mẫu quy tắc Proguard của thư viện Retrofit có thể được tìm thấy [ở đây](https://github.com/square/retrofit/blob/master/retrofit/src/main/resources/META-INF/proguard/retrofit2.pro).

# Keep Native codes
Trong khi sử dụng mã gốc trong ứng dụng Android của bạn, tức là trong khi sử dụng mã c ++ trong ứng dụng Android của bạn, bạn phải nhận thức được hậu quả của việc che giấu bởi Proguard. Nói chung, Proguard chỉ có thể kiểm tra lớp Java. Vì vậy, nếu bạn đang gọi một số phương thức Java từ mã c ++ và phương thức đó đã bị Proguard che giấu, thì JNI sẽ tạo ra method not found exception.

Vì vậy, nếu bạn đang gọi một số phương thức từ mã gốc thì bạn phải giữ các phương thức đó trong quy tắc Proguard bằng cách thêm dòng dưới đây vào tệp proguard-rules.pro:
```kotlin
-keepclasseswithmembernames class * { native <methods>; }
```

# Resource mở từ JAR/APK
Trong Java, chúng ta có thể tải resources từ tệp JAR hoặc thậm chí một số thư viện cũng tải tài nguyên từ tệp APK. Điều này không có vấn đề gì, nhưng bất cứ khi nào chúng tôi đang sử dụng Proguard thì các tên tệp tài nguyên này sẽ được Proguard thay đổi và các tệp này sẽ không được tìm thấy trong gói mong muốn.

Vì vậy, bạn nên giữ tên của các lớp tải tài nguyên từ APK trong quy tắc Proguard của bạn.

Nếu bạn đã hoàn thành việc tối ưu hóa code của mình thì bạn có thể đặt tất cả các tệp trong package gốc vì điều này sẽ làm giảm việc sử dụng các tên đủ điều kiện như `com.mindork.proguard.example`. Để sử dụng tính năng này, hãy thêm dòng dưới đây vào tệp `proguard-rules.pro` của bạn:

```kotlin
-repackageclasses
```

# Kết luận
Như vậy, chúng ta đã tìm hiểu về những điều cần chú ý khi sử dụng `Proguard` trong ứng dụng Android. Hi vọng có thể giúp ích trong dự án Android của các bạn.

Nguồn tham khảo: https://blog.mindorks.com/things-to-care-while-using-proguard-in-android-application