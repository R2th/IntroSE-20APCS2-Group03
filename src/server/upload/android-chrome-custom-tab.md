Hiện nay, khi phát triển ứng dụng Android tương tác với các loại Url, chúng ta thường nghĩ đến việc dùng Webview hoặc dùng browser của thiết bị. Bài viết này, mình sẽ giới thiệu cho các bạn một lựa chọn thứ ba khá hay, đó là **Chrome Custom Tabs**

![](https://images.viblo.asia/3e703c19-5d79-4219-aa87-6bb94ad96120.png)

# Giới thiệu
Trước tiên, chúng ta sẽ nhắc lại một chút với webView cũng như mở browser với intent để xử lý url.

- Với browser, khá là đơn giản để dùng. Chúng ta chỉ việc gọi Intent với ACTION_VIEW, và truyền url cho nó. Hệ thống sẽ tự đề xuất browser phù hợp để mở url này.
  `Intent(Intent.ACTION_VIEW, Uri.parse(url))`
  
  Tuy nhiên, việc mở 1 external browser như vậy đôi khi sẽ làm gián đoạn sự trải nghiệm của người dùng. Vì chúng ta đang hoàn toàn mở ra 1 component khác bên ngoài app. Ngoài ra, việc này còn gây ra sự thiếu nhất quán giữa app theme với giao hiện của browser đó.
  
- Với webview cũng vậy. Webview tuy cải thiện được độ liền mạch của trải nghiệm app, nhưng cũng khó để có được những UI tùy chỉnh như ý muốn. Ngoài ra tất cả những dữ liệu mà chúng ta đã tương tác như login vào 1 tài khoản sẽ không được đồng bộ, nó chỉ có tác dụng trong phạm vi webview đó mà thôi.

**Chrome Custom Tabs** sẽ giải quyết được những vấn đề này. Và đặc biệt, nó có ưu điểm vượt trội nhất là **nhanh hơn** :)

# Custom Chrome Tabs (CCT)

![](https://images.viblo.asia/ea683708-807c-4cbe-a826-b03eb5172384.gif)

Trên đây là ví dụ về hiệu suất khi mở cùng 1 url. Các bạn có thể tham khảo tại đây : https://github.com/GoogleChrome/custom-tabs-client

Theo thứ tự là : Mở bằng browser - Chrome Customer Tabs - Webview 
Rõ ràng ta thấy tốc độ của Chrome Custom Tabs là nhanh nhất. Sau đây mình sẽ làm rõ nguyên nhân dẫn đến sự vượt trội này cũng như các lợi ích khác mà chúng ta có được khi dùng CCT.

- Cho phép tùy chỉnh giao diện : address bar, bottom bar, enter & exit animation 
    
    Khi mở 1 url với browser, chắc chắn sẽ tạo 1 cảm giác ngắt quãng cho trải nghiệm người dùng dó ta đang hướng đến sử dụng 1 component khác ngoài app. Ngoài ra giao diện của app với browser cũng có thể không đồng nhất.
    
   Với Webview, cho phép tạo sự liền mạch và đồng bộ với app hơn. Tuy nhiên nếu bạn muốn lưu trữ hay chia sẻ thông tin nào đó của người dùng thì sẽ không được hỗ trợ. Ví dụ, dùng webview để login vào 1 trang web. Dữ liệu đó sẽ không còn được lưu trữ khi chúng ta vào lại đúng trang web đó ở browser.
   
   CCT giải quyết tất cả những vấn đề này, kết hợp được ưu điểm của 2 cách trên.
- Cách sử dụng CCT đơn giản, không cần code thêm bất kì đoạn mã nào để quản lý các request hay cookies, cấp quyền, ....
- Nhận biết được các sự kiện điều hướng ra bên ngoài và thông báo ngược lại cho app
- Tăng tính bảo mật : CCT sử dụng **Google's Safe Browsing** để bảo vệ user và device khỏi các trang nguy hiểm. Ngoài ra còn tránh được mất cắp dữ liệu trong quá trình duyệt web.
- Lifecycle management: khi chúng ta sử dụng CTT, app sẽ được nâng quyền ưu tiên lên mức 'foreground'. Đây là tính năng khá hay, cho phép app không bị kill vì các lý do không mong muốn.
- Tự động đồng bộ nội dung trên thiết bị: chia sẻ quyền đã cấp cho 1 trang web, các cookies đã được lưu,...
- Nhanh chóng back về ứng dụng chỉ với 1 lần chạm
- Và ưu điểm mình nghĩ hay nhất chắc chắn vẫn là **Hiệu suất vượt trội**
Mình sẽ mô tả cơ chế của nó kĩ hơn ở phàn dưới.

# Cách sử dụng
Phần trước chúng ta đã tìm hiểu về các lợi ích mà CCT đem lại. Tiếp theo sẽ là vài đoạn code mẫu để mô tả cách sử dụng của CCT.

Trước tiên, chúng ta import thư viện vào project như sau:
```
compile 'com.android.support:customtabs:23.3.0'
```

## Cơ chế warm-up 
Đây chính là cơ chế giúp CCT mở url nhanh hơn hẳn so với các phương pháp thông thường.

Nếu như bình thường, khi chúng ta mở 1 url, thì browser đó được khởi động và mới chạy url đó. Tuy nhiên , CCT lại có 1 serive là  Chrome Service . Nó cho phép app của chúng ta kết nối trước, và  báo cho Chrome là chuẩn bị sẵn sàng để mở Url sẽ được nhận sau đó. 

Do được báo trước để sẵn sàng, Chrome sẽ khởi tạo các thành phần, thư viện cần thiết. Và chỉ đợi đến lúc nhận đc url là sẽ load. Ngoài ra nó còn cho phép load trước content. Tất cả làm tăng hiệu suất cũng như trả nghiệm người dùng.

## Các bước thực hiện 
### Bước 1: Kết nối service 
Sử dụng **CustomTabsClient.bindCustomTabsService** để kết nối tới serivce 

Tạo đối tượng  **CustomTabsServiceConnection** và dùng func **onCustomTabsServiceConnected**  để lấy ra thể hiện của CustomTabsClient.
Đối tượng nay sẽ dùng ở bước tiếp theo.
```
public static final String CUSTOM_TAB_PACKAGE_NAME = "com.android.chrome";  

CustomTabsServiceConnection connection = new CustomTabsServiceConnection() {
    @Override
    public void onCustomTabsServiceConnected(ComponentName name, CustomTabsClient client) {
        mCustomTabsClient = client;
    }

    @Override
    public void onServiceDisconnected(ComponentName name) {

    }
};
boolean ok = CustomTabsClient.bindCustomTabsService(this, mPackageNameToBind, connection);

```

### Bước 2: warm-up Chrome 
Khi đã kết nối service thành công, ta sẽ dùng function **CustomTabsClient.warmup** để sẵn sàng Chrome.

### Bước 3: Tạo session
Session là quá trình bắt đầu kểu từ khi mở url đến khi kết thúc. Nó thực hiện quản lý mọi request tới các api. 

```
boolean newSession(CustomTabsCallback callback)
```

Có thể thêm tham số là 1 callback. Nó có nhiệm vụ thông báo lại các action đã xảy ra trên page.
Chúng ta sẽ override lại hàm sau :
```
void onNavigationEvent(int navigationEvent, Bundle extras)
```

Với **navigationEvent** chính là biến thông báo sự kiện nào được thực hiên. Chúng bao gồm các giá trị sau:

```
// Sự kiện bắt đầu load page
public static final int NAVIGATION_STARTED = 1;

// kết thúc load page
public static final int NAVIGATION_FINISHED = 2;

// không thể load page do có lỗi xảy ra
public static final int NAVIGATION_FAILED = 3;

// Tải page không thành công do vị gián đoạn bới action của user như back hoặc reload
public static final int NAVIGATION_ABORTED = 4;

// tab bắt đầu được hiển thi
public static final int TAB_SHOWN = 5;

// tab bị ẩn
public static final int TAB_HIDDEN = 6;
```
### Bước 4: Load url
Sau khi đã warm-up Chrome thành công. Chúng ta chỉ việc truyền url cho nó. 
Sử dụng function của session vừa khởi tạo ở trên:
```
boolean mayLaunchUrl(Uri url, Bundle extras, List otherLikelyBundles)
```
### Bước 5: Mở tab
```
String url = ¨https://viblo.asia/¨;
CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
CustomTabsIntent customTabsIntent = builder.build();
customTabsIntent.launchUrl(this, Uri.parse(url));
```
# Tổng kết
Bài viết này cũng chỉ ra khá nhiều ưu điểm của Chrome Custom Tabs. Vậy có khi nào mà chúng ta không nên sử dụng nó không ?  Thực ra đa số các trường hợp ta đều có thể sử dụng nó. Tuy nhiên, nếu muốn duyệt web và lưu trữ dữ liệu chỉ với riêng ứng dụng thì chúng ta nên dùng webview. Hy vọng bài viết sẽ giúp các bạn hiểu và vận dụng được Chrome Custom tab vào trong công việ cũng như học tập của mình. Cảm ơn các bạn đã đón đọc !