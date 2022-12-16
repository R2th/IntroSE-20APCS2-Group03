## Chrome Custom tabs là gì?
Nhà phát triển ứng dụng phải đối mặt với lựa chọn khi người dùng nhấn vào URL để khởi chạy trình duyệt hoặc xây dựng trình duyệt trong ứng dụng của riêng họ bằng cách sử dụng WebViews.

Cả hai tùy chọn đều có thách thức - khởi chạy trình duyệt là một chuyển ngữ cảnh nặng không thể tùy chỉnh, trong khi WebViews không chia sẻ trạng thái với trình duyệt và thêm chi phí bảo trì.

Các tab tùy chỉnh của Chrome cung cấp cho các ứng dụng quyền kiểm soát nhiều hơn đối với trải nghiệm web của họ và làm cho quá trình chuyển đổi giữa nội dung gốc và nội dung web liền mạch hơn mà không cần phải xem WebView.

Các tab tùy chỉnh của Chrome cho phép ứng dụng tùy chỉnh giao diện và cảm nhận của Chrome.

* Màu thanh công cụ
* Nhập và thoát hoạt ảnh
* Thêm hành động tùy chỉnh vào thanh công cụ Chrome, menu mục bổ sung và thanh công cụ dưới cùng

Các tab tùy chỉnh của Chrome cũng cho phép nhà phát triển bắt đầu trước Chrome và tìm nạp trước nội dung để tải nhanh hơn.

![](https://developer.chrome.com/multidevice/images/customtab/performance.gif)

## Khi nào tôi nên sử dụng tab tùy chỉnh của Chrome và WebView?
WebView là giải pháp tốt nếu bạn đang lưu trữ nội dung của riêng bạn bên trong ứng dụng của bạn. Các tab tùy chỉnh của Chrome vì những lý do sau:

* Triển khai dễ dàng.Không cần phải xây dựng mã để quản lý các yêu cầu, cấp phép hoặc các kho lưu trữ cookie.
* Tùy chỉnh giao diện người dùng:
* Màu thanh công cụ
* Nút tác vụ
* Các mục menu tùy chỉnh
* Tùy chỉnh animations
* Thanh công cụ dưới cùng
* Nhận thức điều hướng: trình duyệt cung cấp gọi lại cho ứng dụng trên điều hướng bên ngoài.
* Bảo mật: trình duyệt sử dụng Duyệt web an toàn của Google để bảo vệ người dùng và thiết bị khỏi các trang web nguy hiểm.
* Tối ưu hóa hiệu suất:
Pre-warming của trình duyệt trong nền, trong khi tránh ăn cắp tài nguyên từ các ứng dụng.
Cung cấp URL có khả năng trước cho trình duyệt, có thể thực hiện công việc đầu cơ, tăng tốc thời gian tải trang.

* Quản lý vòng đời: trình duyệt ngăn cản ứng dụng bị hệ thống đuổi ra khi đang ở trên cùng của nó, bằng cách nâng tầm quan trọng của nó lên cấp độ "tiền cảnh".
* Mô hình cấp quyền và Shared Cookie để người dùng không phải đăng nhập vào trang web mà họ đã kết nối hoặc cấp lại quyền họ đã cấp.
* Nếu người dùng đã bật Trình tiết kiệm dữ liệu, họ sẽ vẫn được hưởng lợi từ việc đó.
* Tự động hoàn thành đồng bộ hóa trên các thiết bị để hoàn thành biểu mẫu tốt hơn.
* Mô hình tùy biến đơn giản.
* Nhanh chóng quay lại ứng dụng bằng một lần nhấn.
* Bạn muốn sử dụng các triển khai trình duyệt mới nhất trên các thiết bị trước Lollipop (tự động cập nhật WebView) thay vì các WebView cũ hơn.
## Khi nào điều này sẽ có sẵn?
Kể từ Chrome 45, Chrome Custom Tabs hiện khả dụng cho tất cả người dùng Chrome , trên tất cả các phiên bản Android được hỗ trợ của Chrome (Jellybean trở đi).

Chúng tôi đang tìm kiếm phản hồi, câu hỏi và đề xuất về dự án này, vì vậy chúng tôi khuyến khích bạn gửi các vấn đề về crbug.com và đặt câu hỏi cho tài khoản Twitter của chúng tôi @ ChromiumDev .

### Hướng dẫn triển khai

Mở tệp build.gradle của bạn và thêm thư viện hỗ trợ vào phần phụ thuộc.
```
dependencies {
    ...
    compile 'com.android.support:customtabs:23.3.0'
}
```
Khi Thư viện hỗ trợ được thêm vào dự án của bạn, có hai bộ tùy chỉnh có thể có:
Tùy chỉnh giao diện người dùng và tương tác với các tab tùy chỉnh.
Làm cho trang tải nhanh hơn và giữ cho ứng dụng luôn hoạt động.
Tùy chỉnh giao diện người dùng được thực hiện bằng cách sử dụng lớp CustomTabsIntent và lớp CustomTabsIntent.Builder , cải thiện hiệu suất đạt được bằng cách sử dụng CustomTabsClient để kết nối với dịch vụ Tab tùy chỉnh, khởi động Chrome và cho nó biết url sẽ được mở.

**Mở tab tùy chỉnh Chrome**
```
String url = ¨https://google.com/¨;
CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
CustomTabsIntent customTabsIntent = builder.build();
customTabsIntent.launchUrl(this, Uri.parse(url));
```

**Định cấu hình màu của thanh địa chỉ**

Một trong những khía cạnh quan trọng nhất (và đơn giản nhất để triển khai) của Tab tùy chỉnh của Chrome là khả năng bạn thay đổi màu sắc của thanh địa chỉ để phù hợp với chủ đề của ứng dụng.

```
builder.setToolbarColor(colorInt);
```
 
**Định cấu hình nút tác vụ tùy chỉnh**

Là nhà phát triển ứng dụng của bạn, bạn có toàn quyền kiểm soát nút Hành động được hiển thị cho người dùng của bạn bên trong tab Chrome.

Trong hầu hết các trường hợp, đây sẽ là hành động chính như Chia sẻ hoặc một hoạt động phổ biến khác mà người dùng của bạn sẽ thực hiện.

Biểu tượng này có chiều cao 24 dp và chiều rộng 24-48 dp, nút hành động được hiển thị dưới dạng một gói với nút tác vụ và một pendingIntent.

```
// Adds an Action Button to the Toolbar.
// 'icon' is a Bitmap to be used as the image source for the
// action button.

// 'description' is a String be used as an accessible description for the button.

// 'pendingIntent is a PendingIntent to launch when the action button
// or menu item was tapped. Chrome will be calling PendingIntent#send() on
// taps after adding the url as data. The client app can call
// Intent#getDataString() to get the url.

// 'tint' is a boolean that defines if the Action Button should be tinted.

builder.setActionButton(icon, description, pendingIntent, tint);
```

**Định cấu hình menu tùy chỉnh**

Trình duyệt Chrome có trình đơn hành động toàn diện mà người dùng sẽ thường xuyên có trong trình duyệt nhưng có thể có liên quan đến ngữ cảnh ứng dụng của bạn.

Các tab tùy chỉnh của Chrome sẽ có hàng ba biểu tượng có "Chuyển tiếp", "Thông tin trang" và "Làm mới" ở trên cùng mọi lúc, với "Tìm trang" và "Mở trong trình duyệt" ở cuối trình đơn.

Là nhà phát triển, bạn có thể thêm và tùy chỉnh tối đa năm mục menu sẽ xuất hiện giữa các mục biểu tượng và các mục chân.

Mục menu được thêm bằng cách gọi CustomTabsIntent.Builder#addMenuItem với tiêu đề và pendingIntent mà Chrome sẽ gọi thay cho bạn khi người dùng chạm vào mục được chuyển làm tham số.

 builder.addMenuItem (menuItemTitle, menuItemPendingIntent);
 
**Định cấu hình hoạt ảnh nhập và thoát tùy chỉnh**

Nhiều ứng dụng Android sử dụng các chế độ xem tùy chỉnh Lối vào và Thoát khi chuyển đổi giữa các Hoạt động trên Android.

```
builder.setStartAnimations(this, R.anim.slide_in_right, R.anim.slide_out_left);
builder.setExitAnimations(this, R.anim.slide_in_left, R.anim.slide_out_right);
```

**Làm ấm Chrome để giúp các trang tải nhanh hơn**
Theo mặc định, khi CustomTabsIntent # launchUrl được gọi, nó sẽ quay lên Chrome và khởi URL. Điều này có thể mất thời gian quý báu và ảnh hưởng đến cảm giác mượt mà.

Chrome cung cấp service mà bạn có thể kết nối và yêu cầu Chrome làm "ấm" trình duyệt và các thành phần gốc. Nhà phát triển cho Chrome biết tập hợp các trang web mà người dùng sẽ truy cập. Chrome sẽ có thể thực hiện:

* Phân giải trước DNS của miền chính
* DNS phân giải trước các tài nguyên phụ có khả năng nhất
* Kết nối trước đến đích bao gồm thương lượng HTTPS / TLS.

Quá trình làm ấm Chrome như sau:

Sử dụng CustomTabsClient # bindCustomTabsService để kết nối với Service.
Khi Service được kết nối, hãy gọi cho CustomTabsClient # warmup để khởi động Chrome đằng sau hậu trường.
Gọi CustomTabsClient # newSession để tạo phiên mới, phiên này được sử dụng cho tất cả các requests đối với API.
Tùy chọn, đính kèm một CustomTabsCallback làm tham số khi tạo phiên mới, để bạn biết một trang đã được tải.
Cho Chrome biết trang nào người dùng có khả năng tải bằng CustomTabsSession # mayLaunchUrl.
Gọi hàm constructor CustomTabsIntent.Builder để truyền CustomTabsSession đã tạo dưới dạng tham số.

**Kết nối với Dịch vụ Chrome**
Phương thức CustomTabsClient#bindCustomTabsService giúp giảm tính phức tạp của việc kết nối với dịch vụ Custom Tabs.

Tạo một lớp mở rộng CustomTabsServiceConnection và sử dụng onCustomTabsServiceConnected để lấy một cá thể của CustomTabsClient ví dụ này sẽ là cần thiết trong các bước tiếp theo.

```
// Package name for the Chrome channel the client wants to connect to. This
// depends on the channel name.
// Stable = com.android.chrome
// Beta = com.chrome.beta
// Dev = com.chrome.dev
public static final String CUSTOM_TAB_PACKAGE_NAME = "com.android.chrome";  // Change when in stable

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

**Làm nóng quá trình trình duyệt**
`boolean warmup(long flags)`
Sự khởi động là không đồng bộ, giá trị trả về cho biết yêu cầu đã được chấp nhận hay không. Nhiều cuộc gọi thành công cũng sẽ trả về giá trị true.

**Tạo phiên tab mới**

boolean newSession(CustomTabsCallback callback)
Phiên được sử dụng trong các cuộc gọi tiếp theo để liên kết cuộc gọi mayLaunchUrl, CustomTabsIntent và tabback cho phiên khác. trả về một phiên đã được tạo thành công Nhiều cuộc gọi với cùng một CustomTabsCallback hoặc một giá trị null sẽ trả về false.

**Cho Chrome biết người dùng có thể mở URL nào**

boolean mayLaunchUrl(Uri url, Bundle extras, List otherLikelyBundles) boolean mayLaunchUrl(Uri url, Bundle extras, List otherLikelyBundles)
Phương pháp warmup() nên được gọi là phương pháp hay nhất trước tiên. URL có nhiều khả năng nhất sẽ được chỉ định trước. Tùy chọn, danh sách các URL có khả năng khác có thể được cung cấp Các URL bổ sung này có thể bị bỏ qua, tất cả các cuộc gọi trước đó đến phương thức này sẽ bị hủy bỏ.

**Liên kết gọi lại tab tùy chỉnh**

void onNavigationEvent(int navigationEvent, Bundle extras)
`NavigationEvent int` là một trong 6 giá trị xác định trạng thái của giá trị này, xem bên dưới để biết thêm thông tin.

```
/**
* Sent when the tab has started loading a page.
*/
public static final int NAVIGATION_STARTED = 1;

/**
* Sent when the tab has finished loading a page.
*/
public static final int NAVIGATION_FINISHED = 2;

/**
* Sent when the tab couldn't finish loading due to a failure.
*/
public static final int NAVIGATION_FAILED = 3;

/**
* Sent when loading was aborted by a user action before it finishes like clicking on a link
* or refreshing the page.
*/
public static final int NAVIGATION_ABORTED = 4;

/**
* Sent when the tab becomes visible.
*/
public static final int TAB_SHOWN = 5;

/**
* Sent when the tab becomes hidden.
*/
public static final int TAB_HIDDEN = 6;
 
```