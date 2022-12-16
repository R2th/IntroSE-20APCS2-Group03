Đặt Log đôi khi có thể được coi là công cụ được sử dụng như một phương sách cuối cùng. Bạn viết rất nhiều dòng log như "being here", "user=23939", v.v. và xóa mọi thứ ngay khi bạn hiểu nguyên nhân gốc rễ của lỗi. Và lần sau, bạn bắt đầu lại.

Tôi thấy rằng log có thể hữu ích hàng ngày nếu được thực hiện đúng cách. Dưới đây là một số mẹo để đặt log tốt hơn trên ứng dụng Android của bạn.

## Làm cách nào để đặt log
Tất nhiên, bạn có thể sử dụng lớp Log tích hợp sẵn và các phương thức tĩnh tiện lợi của nó, `d()`, `e()`, `i()`…

Nhưng điều này có thể thiếu một số tính linh hoạt.

Một tùy chọn là tạo wrapper của riêng bạn cho lớp này và đưa nó vào các lớp của bạn. Điều này sẽ cho phép bạn dễ dàng vô hiệu hóa các log trong bản build production, chuyển hướng chúng đến một đầu ra khác hoặc decorate các line nếu cần.

[Timber](https://github.com/JakeWharton/timber) là một thư viện phổ biến sẽ cho phép bạn thực hiện chính xác điều đó.

## Sử dụng các log level
Bạn nên cố gắng không làm ngập các log level quan trọng nhất. Ví dụ: bạn có thể đặt mục tiêu trên mỗi log level:

![](https://images.viblo.asia/91bdd3b7-ef95-4dde-9f9a-b096d15e38ee.png)

## Đặt tag có ý nghĩa
Mặc dù sử dụng tên lớp làm log tag là một kiểu phổ biến, nhưng tôi khuyên bạn không nên sử dụng tên lớp cho tag của mình.

Đầu tiên, đó là chi tiết triển khai bị rò rỉ.

Nó cũng làm cho việc lọc khó khăn hơn dựa trên tag này, vì tính năng của bạn thường sẽ được triển khai với nhiều lớp. Nó cũng có thể dẫn đến độ dài tag lớn hơn 23, bị cắt ngắn trong đầu ra.

Bạn có thể sử dụng một mẫu như [PREFIX].[FEATURE]

Ví dụ đối với Ứng dụng My Good App (MGA), bạn sẽ xác định:

```
TAG = "mga.featureA"

TAG = "mga.featureB
```

Bạn có thể thêm một module.kt vào gốc của package tính năng có chứa một const như

`const val TAG = "mga.user"`

Tệp này cũng có thể chứa các định nghĩa khác cho mô-đun, chẳng hạn như định nghĩa dependency injection.

## Đặt log những gì
### Các lifecycle event quan trọng
Rất nhiều lỗi và hành vi sai của ứng dụng Android có liên quan đến vòng đời của Android. Bạn nên luôn ghi lại loại thông tin này. Nếu bạn có một base Fragment được kế thừa bởi tất cả các Fragment, hãy sử dụng nó để ghi log các sự kiện này.

```
abstract class BaseAppFragment {
 
   companion object {
       private const val TAG = "mga.lifecycle"
   }
 
   override fun onCreate(savedInstanceState: Bundle?) {
       super.onCreate(savedInstanceState)
       Log.d(TAG, "onCreate(): $this")
   }
 
   override fun onStart() {
       super.onStart()
       Log.d(TAG, "onStart(): $this")
   }
 
   override fun onResume() {
       super.onResume()
       Log.d(TAG, "onResume(): $this")
   }
 
   override fun onPause() {
       Log.d(TAG, "onPause(): $this")
       super.onPause()
   }
 
   override fun onStop() {
       cancelAllSubscriptions()
       Log.d(TAG, "onStop(): $this")
       super.onStop()
   }
 
   override fun onDestroy() {
       Log.d(TAG, "onDestroy(): $this")
       super.onDestroy()
   }
 
   override fun onDetach() {
       Log.d(TAG, "onDetach(): $this")
       super.onDetach()
   }
}
```

Điều này cũng có lợi thế là để lại dấu vết của tất cả các hành động điều hướng và cho phép dễ dàng truy cập vào tên Fragment hiện tại. Điều này có thể tiết kiệm rất nhiều thời gian cho người mới tìm hiểu ứng dụng và code base của nó.

### Hầu hết các hành động của user
Tất cả các hành động của người dùng sẽ dẫn đến một cái gì đó được in vào log. Điều này không có nghĩa là tất cả các trình xử lý click chuột trong lớp giao diện người dùng sẽ in nội dung nào đó, nhưng hành động được kích hoạt trong domain layer của bạn sẽ in nội dung nào đó với một số thông số có liên quan.

```
class Cart {
    // [...]
    fun addItem(item: Item) {
        Log.i(TAG,"Adding item: ${item.id} to cart: ${this.id}");
        // [...]
    }
}
```

### App version, BuildFlavor
Sử dụng lớp Application của ứng dụng để ghi lại một số thông tin cơ bản về version và variant của bạn. Bằng cách này, bạn sẽ có thể liên kết log với một version cụ thể mà không bị mơ hồ, ngay cả khi một số ngày hoặc tháng đã trôi qua.

```
class MyGoodApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        Log.i(TAG, "MyGoodApplication version ${BuildConfig.VERSION_NAME} is starting")
        // [...]
    }
}
```

### App Configuration
Ngoài những điểm trước đó, cũng ghi lại dynamic configuration khi khởi động và khi nó được thay đổi. Vì điều này có thể ảnh hưởng đến hoạt động của ứng dụng của bạn, điều quan trọng là phải có thông tin này để diễn giải log.

## Giải pháp logging từ xa

Đôi khi sự cố chỉ xảy ra trên thiết bị của khách hàng và bạn có thể cần thông tin theo ngữ cảnh để tìm hiểu điều gì đang xảy ra.

Ghi log từ xa là giải pháp của bạn trong tình huống này.

Firebase Crashlytics cung cấp một cách để ghi lại các trường hợp [Non-fatal exceptions](https://firebase.google.com/docs/crashlytics/customize-crash-reports?platform=android#log-excepts).

Nó đủ để có thêm ngữ cảnh về trạng thái không nhất quán mà bạn không thể tái tạo.

Nếu bạn cần thêm thông tin theo ngữ cảnh, bạn có thể sử dụng tính năng ghi log từ xa do [Bugfender](https://bugfender.com/) cung cấp, về cơ bản cung cấp đầu ra giống như Logcat (tức là tất cả các dấu vết) như thể bạn đang cắm cáp gỡ lỗi USB vào thiết bị của khách hàng!

## Không sử dụng các biểu tượng Unicode
Nội dung log phải đơn giản và đáng tin cậy và không nhằm mục đích gây cười hay bắt mắt.

* Bạn có thể phải sao chép nó từ các thiết bị đầu cuối khác nhau, trình soạn thảo văn bản và các trang web có thể không hỗ trợ tốt UTF-8 (hoặc hoàn toàn).
* Bạn sẽ phải tìm kiếm trong đó, và có vẻ như việc tìm kiếm một mẫu văn bản thay vì một biểu tượng cảm xúc ngẫu nhiên sẽ hiệu quả hơn.

![](https://images.viblo.asia/69b102de-de45-43d2-bd78-8139a389767d.jpeg)

Nói cách khác, giữ cho log thật đơn giản.

## Kết luận
Tóm lại, khá dễ dàng để chú ý đến Log ứng dụng của bạn và nó có thể giúp ích rất nhiều trong những thời điểm quan trọng và cũng giúp bạn và đồng đội của bạn hiệu quả hơn hàng ngày.

Ref: https://blog.bam.tech/developer-news/android-logging-with-style