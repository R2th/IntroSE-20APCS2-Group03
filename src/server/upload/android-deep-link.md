![](https://images.viblo.asia/5db998b0-ea86-4c92-bd8d-4af606e5f46f.jpeg)

Nguyên nhân tôi viết ra bài này là bởi vì tôi được một người bạn hỏi tôi
## 1. DEEP LINK LÀ GÌ ? 
Khi muốn mở ứng dụng của mình bằng cách nhấp vào một URL?. Có thể sử dụng `Deep Link` . Bạn không cần phải bật ứng dụng từ Icon Của Ứng dụng. Ứng dụng sẽ tự động được khởi chạy khi nhấp vào một URL. Nó cũng cho phép bạn chuyển dữ liệu từ URL tới ứng dụng (còn được gọi là Query Parameter).
Nhưng giải thích như vậy tôi cũng thấy chưa đủ cho bạn tôi. Nên tôi mới viết thêm bài này để bạn tôi và các bạn có thể hiểu hơn về `Deep Link`
Theo tài liệu chính thức trên Trang Chủ Android Developer : 
>When a clicked link or programmatic request invokes a web URI intent, the Android system tries each of the following actions, in sequential order, until the request succeeds:
>- Open the user’s preferred app that can handle the URI, if one is designated
>- Open the only available app that can handle the URI
>- Allow the user to select an app from a dialog
## 2. CÁC THUỘC TÍNH CỦA DEEP LINK
Để sử dụng được `Deep Link` thì chúng ta cần phải thêm các `Intent Filter`  ở trong  ứng dụng của chúng tôi để xử lý các liên kết đến với các thuộc tính và yếu tố sau:
`<action>`, `<data>` và `<category>`. Chúng sẽ cho phép hệ thống biết ứng dụng của chúng tôi cũng có thể xử lý URL loại cụ thể.
* `<action>`  : Chỉ định action là  ACTION_VIEW để có thể đạt được bộ lọc đích từ Tìm kiếm của Google.
* `<data>` : Có thể add được một hoặc nhiều thẻ `<data>`, mỗi thẻ này đại diện cho một định dạng URI để giải quyết trong từng `Activity`. thẻ `<data>` phải chứa tối thiểu thuộc tính `android:scheme`. Bạn có thể thêm các thuộc tính khác để tinh chỉnh thêm loại URI mà `Activity` cho phép. Ví dụ: Bạn có thể có nhiều `Activity` chấp nhận các URI tương tự, nhưng khác với các tên đường dẫn. Trong trường hợp này, sử dụng thuộc tính `android: path` hoặc các biến thể `pathPattern` hoặc `pathPrefix` để phân biệt `Activity` nào mà hệ thống nên mở cho các đường dẫn URI khác.
* `<category>`:  Bao gồm [BROWSABLE](https://developer.android.com/reference/android/content/Intent.html#CATEGORY_BROWSABLE). Đó là `category` bắt buộc để được yêu cầu Intent Filter có thể truy cập được từ trình duyệt web. Nếu không có nó việc click vào liên kết trong một trình duyệt không thể xử lý `Deep Link` cho ứng dụng của bạn.
        Cũng phải có category [DEFAULT](https://developer.android.com/reference/android/content/Intent.html#CATEGORY_DEFAULT). Điều này cho phép ứng dụng của bạn phản hồi những ý định tiềm ẩn. Nếu không có điều này, `Activity` chỉ có thể được bắt đầu nếu mục đích chỉ định tên thành phần ứng dụng của bạn. Cùng xem ví dụ bên dưới nhé 
``` XML
<intent-filter>
 <action android:name=”android.intent.action.VIEW” />
<category android:name=”android.intent.category.DEFAULT” />
 <category android:name=”android.intent.category.BROWSABLE” />
<data android:scheme=”http”
 android:host=”www.example.com"
 android:pathPrefix=”/gizmos” />
</intent-filter>
```
Ví dụ trên sẽ chỉ xử lý http://www.example.com/gizmos.
## 3. XỨ LÝ NHIỀU URL TRONG CÙNG MỘT ACTIVITY
Có thể thêm nhiều thẻ `<intent -filter>` để xử lý nhiều URL. Bạn cũng có thể thêm nhiều thẻ `<data>` trong `<intent-filter>` (xem ví dụ dưới đây) nhưng nó được coi là một cách làm tốt hơn là tạo nhiều thẻ `<intent-filter>` riêng biệt vì nó giúp tăng khả năng đọc và giải thích rõ ràng ý định đằng sau nó.
``` XML
<intent-filter>
 <action android:name=”android.intent.action.VIEW” />
<category android:name=”android.intent.category.DEFAULT” />
 <category android:name=”android.intent.category.BROWSABLE” />
<data android:scheme=”http”
 android:host=”www.example.com"
 android:pathPrefix=”/gizmos” />
<data android:scheme=”http”
 android:host=”www.example.com"
 android:pathPrefix=”/foobar” />
</intent-filter>
```
Bây giờ có thể xử lý 2 link http://www.example.com/gizmos và http://www.example.com/foobar .
## 4. XỬ LÝ PARAMETER NẰM TRONG LINK
Ở bên dưới tôi có 1 cái link 
```
http://www.example.com/gizmos?data=12345
```
Bây giờ chúng ta cần phải xử lý nó trong `onCreate ()` của Activity. Chỉ cần thêm các dòng này sau khi `setContentView ()`
```
Intent intent = getIntent();
Uri data = intent.getData();
```
## 5.  PHẦN MỞ RỘNG
Bạn có thể tùy chỉnh `scheme` ví dụ như `abc` thay cho `http` hoặc `https`. Xem ví dụ dưới đây cho URL này- abc: //www.example.com/gizmos
```
<intent-filter>
 <action android:name=”android.intent.action.VIEW” />
<category android:name=”android.intent.category.DEFAULT” />
 <category android:name=”android.intent.category.BROWSABLE” />
<data android:scheme=”abc”
 android:host=”www.example.com"
 android:pathPrefix=”/gizmos” />
</intent-filter>
```
Đó là tất cả. Tôi đã rất cố gắng viết chi tiết nhất để các bạn dễ hiểu hơn về `Deep Link` của Android.
Thanks các bạn.

Nguồn bài viết để các bạn tham khảo thêm tại link : https://android.jlelse.eu/deep-linking-in-androd-9c853573fdf4