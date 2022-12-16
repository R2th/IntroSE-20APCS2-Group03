### Overview
Một Context cung cấp quyền truy cập vào thông tin về trạng thái ứng dụng. Nó cung cấp quyền truy cập Activity, Fragnment và Service vào các tệp tài nguyên, hình ảnh, chủ đề / kiểu và vị trí thư mục bên ngoài. Nó cũng cho phép truy cập vào các dịch vụ tích hợp của Android, chẳng hạn như các dịch vụ được sử dụng cho nạp layout, bàn phím và tìm kiếm content provider

Trong nhiều trường hợp khi "Context là bắt buộc", chúng ta chỉ cần lấy chính Activity hiện tại là được. Trong các tình huống mà chúng ta ở bên trong các đối tượng được tạo bởi Activity như Adapter hoặc Fragment, chúng ta cần truyền Activity chứa các đối tượng đó. Trong trường hợp chúng tôi ở ngoài một Activity (trong một Application hoặc service), chúng ta có thể sử dụng context "application context  thay thế" .
### Một Context được sử dụng để làm gì?
```
// Provide context if MyActivity is an internal activity.
val intent = Intent(context, MyActivity::class.java)
startActivity(intent)
```
Khi bắt đầu rõ ràng một component trong android, hai phần thông tin được yêu cầu:

- tên gói, xác định ứng dụng có chứa component.
- Tên lớp Java đủ điều kiện cho component.
Nếu bắt đầu một component nội bộ, Context có thể được truyền vào vì tên gói của ứng dụng hiện tại có thể được trích xuất thông qua context.getPackageName ().
### Tạo ra View
```
val textView = TextView(context)
```
Các context chứa các thông tin sau mà các View yêu cầu:

- kích thước và kích thước màn hình thiết bị để chuyển đổi dp, sp thành pixel
- thuộc tính cho view
- tham chiếu đến activuty cho sự kiện OnClick()
### Nạp một file XML Layout
Chúng ta sử dụng context để tìm và nạp một file layout vào trong memory:
```
// A context is required when creating views.
val inflater = LayoutInflater.from(context)
inflater.inflate(R.layout.my_layout, parent)
```
### Gửi một local broadcast
Chúng ta sử dụng context để tìm nạp LocalBroadcastManager khi gửi hoặc đăng ký người nhận để phát sóng:
```
// The context contains a reference to the main Looper, 
// which manages the queue for the application's main thread.
val broadcastIntent = Intent("custom-action")
LocalBroadcastManager.getInstance(context).sendBroadcast(broadcastIntent)
```
### Lấy một dịch vụ hệ thống
Để gửi thông báo từ một ứng dụng, các dịch vụ hệ thống NotificationManager được yêu cầu:
```
// Context objects are able to fetch or start system services.
val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

val notificationId = 1

// Context is required to construct RemoteViews
val builder = Notification.Builder(context).setContentTitle("custom title")

notificationManager.notify(notificationId, builder.build())
```

Tham khảo danh sách tất cả các [dịch vụ hệ thống](http://developer.android.com/reference/android/content/Context.html#getSystemService(java.lang.String)) có sẵn có thể được truy xuất thông qua Context.

### Application và Activity Context

Trong khi các theme và style thường được áp dụng ở cấp ứng dụng, chúng có thể được cũng quy định ở cấp activity. Bằng cách này, activity này có thể có một bộ khác nhau của chủ đề hoặc phong cách hơn so với phần còn lại của ứng dụng (ví dụ nếu ActionBar cần phải được vô hiệu hóa cho các trang nhất định). Bạn sẽ nhận thấy trong tệp AndroidManifest.xml thường có chủ đề android: cho ứng dụng. Chúng ta cũng có thể chỉ định một cái khác cho một Activity:
```
<application
       android:allowBackup="true"
       android:icon="@mipmap/ic_launcher"
       android:label="@string/app_name"
       android:theme="@style/AppTheme" >
       <activity
           android:name=".MainActivity"
           android:label="@string/app_name"
           android:theme="@style/MyCustomTheme">
```

Vì lý do này, điều quan trọng cần biết là có Context ứng dụng và Context Activity, kéo dài trong suốt vòng đời tương ứng của chúng. Hầu hết các Chế độ xem phải được thông qua Context Activity để có quyền truy cập vào chủ đề, kiểu, kích thước nào sẽ được áp dụng. Nếu không có chủ đề nào được chỉ định rõ ràng cho Hoạt động, mặc định là sử dụng một chủ đề được chỉ định cho ứng dụng.

Trong hầu hết các trường hợp, bạn nên sử dụng Context Activity. Thông thường, từ khóa này trong Java tham chiếu thể hiện của lớp và có thể được sử dụng bất cứ khi nào Context là cần thiết trong một Activity. Ví dụ dưới đây cho thấy cách hiển thị các thông báo Toast bằng cách sử dụng phương pháp này:

```
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        Toast.makeText(this, "hello", Toast.LENGTH_SHORT).show()
    }
}
```

### Anonymous functions

Khi sử dụng các hàm ẩn danh khi implementing  listener, từ khóa này trong Java áp dụng cho lớp ngay lập tức nhất được khai báo. Trong các trường hợp này, lớp MainActivity bên ngoài phải được chỉ định để tham chiếu đến thể hiện Activity.

```
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // resource lookup using Kotlin extensions
        val tvTest = abc
        
        tvTest.setOnClickListener({ view -> Toast.makeText(this@MainActivity, "hello", Toast.LENGTH_SHORT).show()}) 
}
```

Cảm ơn các bạn đã đọc bài post của mình bài viết của mình dịch từ nguồn codepath Android