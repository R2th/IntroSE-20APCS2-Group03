![](https://images.viblo.asia/d9388e35-1032-4150-90dd-2a50c17d12b0.png)


Chúng ta vẫn được biết tới một ứng dụng chất lượng tốt cái đầu tiên là về cảm quan từ phía người dùng đấy là UI giao diện, nhưng để sử dụng lâu dài người ta quan tâm nhất vấn đề bảo mật thông tin có tốt hay không. Chính những thiệt hại về thông tin cá nhân khách hàng bị lộ ra ngoài lại là thiệt hại lớn nhất về phía công ty hoặc dịch vụ bạn đang cung cấp. Vậy thì làm sao để giảm thiểu những rủi ro này trong quá trình phát triển ứng dụng Android, chúng ta cùng tìm hiểu và tiếp cận tới một vài phương án dưới đây nhé. Có thể bài viết về vấn đề này sẽ dài và mình chia thành 2 phần, nếu bạn thích thì tiếp tục theo dõi ở phần 2(sẽ phát hành sau).


### 1. Custom Permission

Điều này ít được sử dụng vì đa phần chúng ta hay sử dụng những Permission có sẵn như kết nối Internet, Wifi như dưới đây:

```
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

Mục đích của Custom Permission này là gì?

Đó là khi cần kết nối từ app của bạn tới một ứng dụng khác( của bên đối tác) hoặc từ app khác sang app của bạn, và giữa chúng cần share thông tin quan trọng. Đảm bảo việc permission này không bị sử dụng mất kiểm soát bạn cần chắc chắn rằng ứng dụng được kết nối tin cậy, chúng ta cần thực hiện như sau:

```
<permission android:name="my_custom_permission_name"
                android:protectionLevel="signature" />
```

Việc cần làm là khai báo 1 chữ ký riêng cho permission đó và khi sử dụng thì hãy kiểm tra lại xem chúng có khớp với nhau hay không.

### 2. Ngăn chặn việc truy cập tới Content Providers

Nếu như bạn có ý định gửi dữ liệu của mình cho một ứng dụng khác mà mình không sở hữu, KHÔNG thì bạn nên ngăn chặn những devloper khác truy cập được vào phần Content Provider trong ứng dụng của bạn. Để thực hiện được việc ngăn chặn này, hãy khai báo như sau trong Android Manifest nhé:

```
<provider
            android:name="android.support.v4.content.FileProvider"
            android:authorities="com.example.myapp.fileprovider"
            ...
            android:exported="false">
            <!-- Place child elements of <provider> here. -->
        </provider>
```

### 3. Kết nối HTTPS và Config Network

Ứng dụng đang kết nối tới 1 server Https với chứng chỉ bảo mật SSL, cần thực việc kết nối như dưới đây để nâng cao tính bảo mật. Hãy sử dụng **HttpsURLConnection** thay vì **HttpURLConnection** điều này hoàn toàn khác nhau đó bạn.

```
URL url = new URL("https://www.your_domain.com");
HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
urlConnection.connect();
InputStream in = urlConnection.getInputStream();
```

Tiếp theo bạn bổ xung thêm khai báo dưới đây, trước tiên là **android:networkSecurityConfig**

```
<application
        android:networkSecurityConfig="@xml/network_security_config"
        ... >
```

Trong folder **xml**  bạn tạo 1 file xml **network_security_config** và điền 1 số cài đặt như dưới đây:

```
<network-security-config>
    <domain-config cleartextTrafficPermitted="false">
        <domain includeSubdomains="true">secure.your_domain.com</domain>
        ...
    </domain-config>
</network-security-config>
```

Trong quá trình development bạn dùng tag dưới đây để thiết bị có thể tự cài certificate cần thiết cho việc kết nối

```
<debug-overrides>
        <trust-anchors>
            <certificates src="user" />
        </trust-anchors>
    </debug-overrides>
```

### 4. Cẩn thận khi nhúng WebView

Điều đầu tiên bạn cần lưu ý, không được tùy tiện cho WebView có thể điều hướng tới bất kỳ URL nào. WebView này chỉ thực hiện một số chức năng hạn định và không dùng JavaScript thì càng tốt, và thường được ứng dụng cho việc hiện thị nội dung Policy mà thôi.

Chính vì điều này mà Apple đã loại bỏ UIWebView trên bản iOS 13.

Nếu như bạn cần phải enable JavaScript thì hãy tham khảo cách sử dụng **HTML message channels** như ví dụ nhỏ dưới đây:

```
WebView myWebView = (WebView) findViewById(R.id.webview);

// messagePorts[0] and messagePorts[1] represent the two ports.
// They are already tangled to each other and have been started.
WebMessagePort[] channel = myWebView.createWebMessageChannel();

// Create handler for channel[0] to receive messages.
channel[0].setWebMessageCallback(new WebMessagePort.WebMessageCallback() {
    @Override
    public void onMessage(WebMessagePort port, WebMessage message) {
         Log.d(TAG, "On port " + port + ", received this message: " + message);
    }
});

// Send a message from channel[1] to channel[0].
channel[1].postMessage(new WebMessage("My secure message"));
```

### 5. Hiển thị App chooser

Mỗi khi hiển thị Intent tới những app khác liên quan về chức năng thì bạn có thể hiển thị đồng thời chúng để cho người dùng chủ động chọn App mà họ tin cậy nhất. Không nên bắn thẳng sang 1 app khác theo chủ đích ban đầu.

```
Intent intent = new Intent(Intent.ACTION_SEND);
List<ResolveInfo> possibleActivitiesList = getPackageManager()
        .queryIntentActivities(intent, PackageManager.MATCH_ALL);

// Verify that an activity in at least two apps on the user's device
// can handle the intent. Otherwise, start the intent only if an app
// on the user's device can handle the intent.
if (possibleActivitiesList.size() > 1) {

    // Create intent to show chooser.
    // Title is something similar to "Share this photo with".

    String title = getResources().getString(R.string.chooser_title);
    Intent chooser = Intent.createChooser(intent, title);
    startActivity(chooser);
} else if (intent.resolveActivity(getPackageManager()) != null) {
    startActivity(intent);
}
```

### 6. Tổng kết 

Trên đây mình cung cấp một số cách làm giúp cho ứng dụng được bảo mật hơn, dữ liệu app gửi đi sẽ an toàn hơn. Hy vọng bài viết mang lại sự hữu ích cho những bạn đang cần và hẹn lại các bạn trong bài viết chủ đề Android Security phần 2 nhé.

Nếu bạn có đóng góp hoặc cách làm hay, để lại comment phía dưới chúng ta cùng học hỏi nha !