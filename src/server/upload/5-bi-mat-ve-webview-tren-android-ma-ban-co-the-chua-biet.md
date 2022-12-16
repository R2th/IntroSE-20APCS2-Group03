WebView là một phần không thể thiếu của các ứng dụng ngày nay. Chúng cho phép bạn nhanh chóng thêm một màn hình UI tiện dụng bằng cách tận dụng các kỹ thuật từ phía team phát triển web.

Và WebViews có thể làm được nhiều việc hơn là chỉ hiển thị các trang web.

Trong bài viết này, mình sẽ liệt kê một số mẹo và thủ thuật ít được biết đến hơn để giúp các nhà phát triển Android tăng sức mạnh cho WebView và có quyền kiểm soát tốt hơn với JavaScript ngay từ code base Java/Kotlin native.

Les't go

# 1. Intercepting URLs
Bằng cách triển khai phương thức *shouldOverrideUrlLoading* trong quá trình khởi tạo WebViewClient, bạn có thể chặn (intercept) URL bằng cách sử dụng pattern matching trong quá trình điều hướng url.

Bằng cách này, bạn có thể kiểm soát xem URL có nên được load hoặc mở một activity/service nhất định bằng cách sử dụng Intent.

Đoạn code dưới đây hiển thị method thực tế mà bạn cần triển khai:

![](https://images.viblo.asia/c21de7fb-8d05-40b5-87fb-7287705e319a.png)

# 2. Basic Web Authentication
Rất nhiều trang web nhắc người dùng nhập thông tin đăng nhập của họ. Khi thiết lập WebView trong Android lần đầu tiên, bạn có thể bỏ lỡ điều này và dẫn đến lỗi xác thực 401 khi tải trang.
Nhưng đừng lo, bằng cách triển khai method sau, bạn có thể thực hiện dễ dàng xác thực cơ bản (basic authentication) trong Android WebView:
```java
override fun onReceivedHttpAuthRequest(
            view: WebView,
            handler: HttpAuthHandler,
            host: String,
            realm: String) {
            handler.proceed("username", "password")
}
```

Ngoài ra, để đăng nhập tự động, bạn có thể thêm 1 điều kiện bổ sung authorization dưới dạng cấu trúc dữ liệu Map trong hàm loadUrl.

# 3. Setting Listeners for WebView Buttons and EditText
Đôi khi, bạn có thể muốn lưu trữ một số dữ liệu nhất định từ các biểu mẫu (form) WebView trong Android. Hoặc có lẽ bạn muốn thực hiện một hành từ phía native khi một nút bên trong Android WebView được nhấp vào.

Rất may, chúng ta có thể tận dụng khả năng tương tác Android-JavaScript.

Nếu bạn biết ID của chế độ *view/widget* con trong HTML, thì việc thực hiện hành động có liên quan trong code Android của bạn dựa trên các tương tác WebView là khá đơn giản.

Chỉ cần sử dụng phương thức **evaluateJavaScript** và chuyển code JS dưới dạng một string. Và để tốt nhất, điều này nên được thực hiện trong phương thức onPageLoadFinishing:

![](https://images.viblo.asia/2b0b3c50-3b9f-4efe-b041-b5698c85dfa9.png)

Đoạn mã trên có nghĩa là để nắm bắt (capture) các chi tiết của biểu mẫu (form) của WebView khi 1 nút được click và chuyển chúng đến phương thức native *Android.onWebBtnClick*. Để làm cho nó hoạt động hoàn toàn, bạn cần tạo một lớp cho interface JavaScript và set nó trên WebView.

Đây là cách thực hiện:

```java
class WebAppInterface {
    Context mContext;
WebAppInterface(Context c) {
        mContext = c;
    }
@JavascriptInterface
    public void onWebBtnClick(String username, String password) {
       //handle the data captured from webview
}
}
```

Và bây giờ, bạn chỉ cần set vào WebView như hình dưới đây:
```java
webView.addJavascriptInterface(new WebAppInterface(this), "Android");
```

Quá tuyệt vời đúng k :D, chúng ta đã cố gắng xây dựng một cầu nối *interface* giữa Android và JavaScript. Điều này rất tốt để lắng nghe những thay đổi về giao diện người dùng trên trang web và theo đó kích hoạt các phương thức (method) trên Android native.

# 4. Trigger JavaScript Alert Prompts From Android
Theo mặc định, lời nhắc (promt) từ JavaScript không hiển thị nguyên bản trong Android. Vì vậy, chúng tôi cần ghi đè các phương thức *onJsAlert*, *onJsPrompt* và *onJsConfirm* trong interface WebChromeClient để hiển thị alert () của JavaScript và các hàm khác để xác nhận hoặc nhập văn bản trong lời nhắc (promt).

```java
webView.getSettings().setJavaScriptEnabled(true);
webView.setWebChromeClient(new MyWebChromeClient());
```

Bằng cách triển khai các chức năng sau, bạn có thể cung cấp dialog UI pop-up của Android để cung cấp cho người dùng trải nghiệm native hơn:
```java
final class MyWebChromeClient extends WebChromeClient {
    @Override
    public boolean onJsConfirm(WebView view, String url, String message, final JsResult result) {
       //implement AlertDialog here
        return true;
    }
}
```

# 5. Display Android File Chooser From WebView
Thẻ JavaScript <input> cho phép bạn tải tệp lên. Bây giờ, điều này khá đơn giản trong iOS, vì bạn không cần phải làm gì cả.

Nhưng trong Android, chúng ta cần triển khai phương thức onShowFileChooser bên trong WebChromeClient, trong đó bạn phải thiết lập 1 bộ chọn tệp bằng native (native file picker).

Về cơ bản, chúng ta sẽ cần sử dụng WebKit’s ValueCallBack interface để giúp chuyển dữ liệu từ bộ chọn tệp Android sang mã JavaScript.

Dưới đây là sơ lược về phương thức onShowFileChooser:

![](https://images.viblo.asia/a80fbf33-1367-448e-8b3d-7652c1c2231e.png)

Trong onActivityResult, khi bạn nhận được dữ liệu hình ảnh, chỉ cần pass nó vào instance uploadFile theo cách sau:
```
uploadMessage.onReceiveValue(results);
```

Như vậy, đó là cách quản lý code để pass hình ảnh được chọn từ Android sang mã JavaScript.

# Kết luận
WebView trong Android có thể là thứ đơn giản nhất để triển khai, nhưng có rất nhiều chi tiết cần xem xét.

Nếu chúng ta biết cách tận dụng khả năng tương tác JavaScript-Android, thì các bạn có thể chuyển dữ liệu đến WebViews từ code Android native và ngược lại.

Thanks for reading.


Tài liệu tham khảo:
https://medium.com/better-programming/5-android-webview-secrets-you-probably-didnt-know-b23f8a8b5a0c