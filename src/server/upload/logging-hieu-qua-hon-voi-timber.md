Nếu đã làm việc với Android thì hẳn là các bạn đều đã nghe tới log và mình đoán ít ai là chưa sử dụng tới class `Log` của Android phải không nào. Thực ra thì mình còn sử dụng log rất nhiều là đằng khác, vẫn còn nhớ cái thời mà chưa biết debug là gì thì log chính là cứu cánh đắc lực của mình. Và kể cả đến bây giờ thì mình vẫn còn dùng log khá nhiều, để log api response, exception, ... Tuy nhiên, liệu bạn đã bao giờ đặt ra câu hỏi rằng chúng ta đã sử dụng Log đúng cách và hiệu quả hay chưa?
<br><br>
Giả sử chúng ta có rất nhiều log, ta cần phải loại bỏ chúng trước khi publish ứng dụng của mình, nhưng bằng cách nào? Ta có thể sử dụng IDE và tìm mọi dòng code chứa cụm `Log.`, nhưng nếu nó là hàng trăm dòng log thì sao nhỉ? Liệu ta có thể xóa, comment hết tất cả được không? Mà nếu đươc, sẽ ra sao nếu chúng ta lại cần chúng khi tiếp tục phát triển ứng dụng đó? À, có một cách rất là đơn giản, chỉ cần kiểm tra xem ta có đang ở môi trường debug hay không, nếu có thì ta log còn không thì thôi:
```java
import android.util.Log;

public class Logger {
    public static void d(final String tag, final String message) {
        if (BuildConfig.DEBUG)
            Log.d(tag, message);
    }
}
```
Vấn đề của chúng ta có thể đã được giải quyết, nhưng nếu muốn sử dụng các chế độ log khác (`Log.e`, `Log.i`, `Log.v`, ...) ta sẽ phải viết từng đó phương thức để triển khai chúng hoặc thêm một tham số vào để sử dụng được log theo ý mình muốn.
<br><br>
Và đó chính là khi chúng ta nên sử dụng **Timber** để giải quyết vấn đề này một cách triệt để hơn!

# 1) Timber là gì?
![](https://images.viblo.asia/4f5f3b2f-6cc5-44d2-b328-546f67d29178.png)
**Timber** là một API cho class `Log` của Android. Nó bổ trợ và nâng cấp cho chức năng log của Android. Ta làm việc đó bằng cách cấy một đối tương `Tree` và mỗi lần ta log một thứ gì đó, hành vi log có thể thay đổi dựa vào việc `Tree` nào đang được triển khai.
<br><br>
Để sử dụng Timber, bạn có thể thêm dòng sau vào file `build.gradle` trong project của mình:
```java
implementation 'com.jakewharton.timber:timber:4.7.1'
```

# 2) Timber hoạt động như thế nào?
Tạo một đối tượng `Tree` và cài đặt nó sớm nhất có thể (thường là trong phương thức `onCreate()` của class `Application`). Và chỉ cần như vậy, ta có thể bắt đầu sử dụng các phương thức mà Timber cung cấp để log thay vì class `Log` thông thường của Android. Rất đơn giản phải không nào.
<br><br>
Tiếp theo, hãy thử động tay động chân với Timber để hiểu rõ hơn về cách Timber hoạt động và tại sao bạn nên sử dụng nó nhé.

# 3) Logging với Timber
Sau khi đã thiết lập đối tượng `Tree` của mình, ta nên bắt đầu sử dụng class `Timber` và nó thực sự rất đơn giản. Nó chứa các phương thức tương tự như class `Log`, ví dụ: `.v`, `.d`, `.i`, `.w` và `.e`. Bởi vì các phương thức này là tương tự nhau, bạn có thể dễ dàng thay thế  `Log` bởi `Timber` bằng cách đổi tất cả các lời gọi `Log.` thành `Timber.`:
```java
  Log.v(TAG, "some verbose logs here");
  Timber.v("some verbose logs here");

  Log.d(TAG, "some debug logs here");
  Timber.d("some debug logs here");

  Log.i(TAG, "some info logs here");
  Timber.i("some info logs here");
  
  Log.w(TAG, "some warning logs here");
  Timber.w("some warning logs here");

  Log.e(TAG, "some error logs here");
  Timber.e("some error logs here");
  
  Log.wtf(TAG, "some error logs here");
  Timber.wtf("some error logs here");
```
Ủa như vậy thì có gì đặc biệt hơn đâu nhỉ? Nhưng bạn có để ý rằng các lời gọi của `Timber` không hề chứa thành phần tag không? Đó là bởi vì `Timber` sẽ tìm xem class nào đang gọi nó và tự động thêm tên class đó vào thành tag. 

## 3.1) Lint 
`Timber` chứa một số `lint rules` tương đối hữu ích (lint là quá trình phân tích code để tìm ra các lỗi tiểm ẩn). Chúng được chia thành hai loại: `error` và `warning`. Error ngăn không cho ứng dụng của bạn biên dịch, còn warning là cảnh báo được hiển thị để báo cho bạn biết nhưng vẫn cho phép ứng dụng biên dịch bình thường.
<br>
Nếu bạn cung cấp sai số lượng tham số truyền vào, sai kiểu tham số khi sử dụng string interpolation (ví dụ như `String.format("%d", "some text")`, ... nó sẽ kích hoạt một error rule. 
<br>
Nếu bạn sử dụng class `Log` để log, hay `String.format()` trong một lời gọi `Timber` hay log một exception thì nó sẽ kich hoạt một warning rule.
<br>
Sau đây là một vài ví dụ về lint rules của `Timber`, nó có thể phát hiện nếu số lượng tham số truyền vào một lời gọi tới Timber sử dụng `String.format()` không đúng:
```java
Example.java:35: Error: Wrong argument count, format string Hello %s %s! requires 2 but format call supplies 1 [TimberArgCount]
    Timber.d("Hello %s %s!", firstName);
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```
Hay phát hiện nếu độ dài tag của chúng ta đang dài hơn so với quy định của Android (23 kí tự):
```java
Example.java:35: Error: The logging tag can be at most 23 characters, was 35 (TagNameThatIsReallyReallyReallyLong) [TimberTagLength]
    Timber.tag("TagNameThatIsReallyReallyReallyLong").d("Hello %s %s!", firstName, lastName);
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```
Bạn có thể đọc thêm về các rule của Timber tại [đây](https://github.com/JakeWharton/timber#lint).

## 3.2) Triển khai Tree
Như mình đã đề cập từ đầu, ta nên tạo một đối tượng `Tree` và "trồng" nó ngay khi có thể, tuy nhiên nó là gì nhỉ?
<br>
Một `Tree` đơn giản là một class chứa hành vi của các log. Để tạo nó, ta phải `extends` từ lớp `Tree` và triển khai phương thức `log`. Mỗi lần chúng ta log sử dụng `Timber`, nó sẽ đi qua đối tượng `Tree` chúng ta khởi tạo; nếu ta "trồng" nhiều `Tree` thì nó sẽ đi qua tất cả chúng và chứa tất cả hành vi chúng ta muốn.
<br>
Ví dụ, nếu ta không muốn log ra thông tin gì khi ứng dụng được release, ta chỉ cần tạo một `Tree` và không triển khai gì trong phương thức `log` của nó:
```java
public class NotLoggingTree extends Timber.Tree {
    @Override
    protected void log(int priority, @Nullable String tag,
                       @NotNull String message, @Nullable Throwable t) {
        // Do nothing here
    }
}
```
Sau đó ta "trồng" nó ở phương thức `onCreate` của class application:
```java
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        if (!BuildConfig.DEBUG) {
            Timber.plant(new NotLoggingTree());
        }
    }
}
```
Khi đó, mọi lời gọi tới `Timber.*` sẽ không log ra thông tin gì cả khi ứng dụng không ở trong môi trường `DEBUG`. Tuy nhiên, nếu bạn chạy thử ứng dụng của mình, thì `Timber` cũng vẫn sẽ không log ngay cả khi ứng dụng đang ở môi trường `DEBUG`. Đó là bởi vì trong trường hợp đó, chúng ta chưa thiết lập một `Tree` nào cho `Timber` cả.
<br>
Đúng vậy, bạn phải luôn thiết lập ít nhất một `Tree` trước khi sử dụng `Timber`. Nhưng trong tình huống này, bạn không cần phải tạo ra riêng một `Tree` cho mục đích debugging, bạn chỉ cần phải "trồng" nó với **DebugTree** - một class được cung cấp sẵn bởi `Timber` và ứng dụng của bạn sẽ hoạt động một cách hoàn hảo:
```java
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        if (!BuildConfig.DEBUG) {
            Timber.plant(new NotLoggingTree());
        } else {
            Timber.plant(new Timber.DebugTree());
        }
    }
}
```
Nếu đó là một ứng dụng `debug`, nó sẽ sử dụng `DebugTree` và ngược lại, sử dụng `NotLoggingTree` cho môi trường `release`. Tuy nhiên, chúng ta không thể log khi ứng dụng được release, nếu có chuyện gì đó không tốt xảy ra, làm sao chúng ta có thể biết được? Hãy kết hợp sử dụng một thư viện báo cáo crash và `Timber` xem sao. Ta sẽ custom lại một `Tree` cho việc báo cáo error và warning tới thư viện crash của mình:
```java
public class ReleaseTree extends Timber.Tree {
    @Override
    protected void log(int priority, @Nullable String tag,
                       @NotNull String message, @Nullable Throwable t) {
        if (priority == Log.ERROR || priority == Log.WARN)
            YourCrashLibrary.log(priority, tag, message);
    }
}
```
Thật dễ dàng phải không, mọi error và warning sẽ được gửi tới thư viện crash khi ứng dụng được release và các log sẽ bị bỏ qua.
<br><br>
Vậy bây giờ nếu ta muốn nhiều thông tin hơn trong log thì sao nhỉ, giả sử như class và dòng chứa log đó. Ta có thể tự viết tay vào ví dụ như `Timber.d("MyClass:13-Something happened here!")` nhưng ... tại sao lại tự làm khó bản thân như vậy chứ, hãy để Timber làm việc đó cho bạn:
```java
public class DebugTree extends Timber.DebugTree {
    @Override
    protected @Nullable String createStackElementTag(@NotNull StackTraceElement element) {
        return String.format("C:%s:%s",
                super.createStackElementTag(element),
                element.getLineNumber());
    }
}
```
Class Application của chúng ta:
```java
public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        if (BuildConfig.DEBUG) {
            Timber.plant(new DebugTree());
        } else {
            Timber.plant(new ReleaseTree());
        }
    }
}
```
Và log chúng ta thu được sẽ như sau, có đủ cả tên class và số dòng của log đó và điều tuyệt vời nhất là nó hoàn toàn tự động:
```java
10-21 13:36:42.648 2391-2391/? D/C:MainActivity:20: Something happened here!
```

# 4. Tài liệu tham khảo
https://github.com/JakeWharton/timber
<br>
https://medium.com/@caueferreira/timber-enhancing-your-logging-experience-330e8af97341
<br>
https://medium.com/@rashi.karanpuria/timber-simple-logging-api-for-android-afb10a1dc30f
<br>
https://medium.com/@wdziemia/timber-c733b1faa5b6