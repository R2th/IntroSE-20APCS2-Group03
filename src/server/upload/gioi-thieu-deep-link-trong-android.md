![](https://images.viblo.asia/8a153856-9a01-49ef-b488-3df6fe667442.jpeg)
# Deep link là gì?
Hiểu nôm na Deeplink là kĩ thuật giúp bạn chuyển từ một link trên website tới trực tiếp ứng dụng mobile của bạn. Với URI đó sẽ đưa bạn tới một nội dung cụ thể trong ứng dụng mà đã được thiết đặt từ trước.
# Các bước hệ thống Android xử lý một URI
Khi người dùng click vào một URI, hệ thống Android sẽ thực hiện các bước sau một cách tuần tự cho đến khi request được xử lý thành công:
1. Mở ứng dụng yêu thích của người dùng cái mà có thể xử lý được URI nếu nó đã được chỉ định từ trước.
2. Mở duy nhất một app khả dụng có thể xử lý URI.
3. Cho phép người dùng chọn ứng dụng từ dialog hiện lên.

Vừa rồi là khái niệm Deeplink và cách mà hệ thống Android xử lý một URI như thế nào. Sau đây mình sẽ trình bày chi tiết cách tạo một Deeplink cho ứng dụng của bạn. Để có thể lắng nghe khi người dùng click vào một URI đã được ứng dụng của chúng ta chỉ định.
# Các bước tạo Deeplink cho ứng dụng Android
## Thêm intent filter cho các link muốn xử lý
Để tạo link cho các nội dung app của bạn thêm intent filter, cái mà sẽ chứa những thuộc tính sau tới manifest của ứng dụng:

**action**

Chỉ định là ACTION_VIEW giúp cho intent có thể lắng nghe việc người dùng click URI từ Google Search.

**data**

Thêm một hoặc nhiều tags <data> Mỗi tag sẽ mô tả một URI cái mà sẽ đươc xử lý bởi activity đó. Tối thiểu một tag <data> phải chứa một thuộc tính android:scheme
    
Bạn có thể thêm nhiều thuộc tính hơn để lọc URI cho activity chấp nhận xử lý. Ví dụ, bạn có thể nhiều activity cùng xử lý một URI nhưng có thể khác nhau bởi đường dẫn. Trong trường hợp này chúng ta sử dụng thuộc tính android:path
    
 **category**
    
 Thêm BROWSABLE category. Category này được yêu cầu để intent filter có thể truy cập trình duyệt web. Không có category này thì khi click vào link trên trình duyệt, ứng dụng của bạn không thể xử lý.
    
   Đồng thời thêm DEFAULT category.  Category này cho phép ứng dụng của bạn xử lý những implicit intent.
    
 Đoạn snippet XML sau đã sử dụng intent filter trong manifest cho deep link. Đồng thời cả 2 URI “example://gizmos” và "http://www.example.com/gizmos"  được xử lý bởi activity
    
```
<activity
    android:name="com.example.android.GizmosActivity"
    android:label="@string/title_gizmos" >
    <intent-filter android:label="@string/filter_view_http_gizmos">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- Chấp nhận các URI bắt đầu với "http://www.example.com/gizmos” -->
        <data android:scheme="http"
              android:host="www.example.com"
              android:pathPrefix="/gizmos" />
    </intent-filter>
    <intent-filter android:label="@string/filter_view_example_gizmos">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- Chấp nhận các URI bắt đầu với "example://gizmos” -->
        <data android:scheme="example"
              android:host="gizmos" />
    </intent-filter>
</activity>
```
##  Đọc dữ liệu từ intent gửi tới
Sau khi hệ thống khởi tạo activity thông qua intent filter. Bạn có thể sử dụng data được cung cấp bởi intent để xác định cái gì cần xử lý tiếp. Gọi getData()  và getAction() phương thức để nhận được data liên kết với intent truyền tới. Bạn có thể gọi những phương thức này bất cứ đâu trong lifecycle của activity. Nhưng bạn nên gọi nó trong onCreate() và onStart().
    
  Đoạn snippet sau đây chỉ ra cách để nhận data từ Intent:
    
```
@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main);

    Intent intent = getIntent();
    String action = intent.getAction();
    Uri data = intent.getData();
}
```
#     Kết luận
  Việc sử dụng kĩ thuật deeplink trong phát triển ứng dụng mobile có rất nhiều lợi ích mà phải kể đến là: Tăng trải nghiệm người dùng khi người dùng có thể di chuyển trực tiếp từ link web tới app moblie, thu hút người dùng sử dụng app nhiều hơn, giúp cho việc marketing...
   
Bên trên mình cũng đã trình bày cách có thể implement deeplink trong một app Android một cách đơn giản.
    
Happy coding!!!
    
Bài viết có tham khảo tại: https://developer.android.com/training/app-links/deep-linking