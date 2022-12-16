Tôi bắt đầu sử dụng Kotlin cho các dự án Android của tôi vào giữa năm 2017 trong thời điểm Google I/O 2017 bắt đầu giới thiệu nó đến toàn thể lập trình viên. Ban đầu, thì tôi thấy một cơ hội để thử Kotlin trên 1 dự án có quy mô nhỏ. Sau khi thử nó, thấy dễ sử dụng, có thể dễ dàng tách biệt chức năng khỏi logic nghiệp vụ bằng cách sử dụng (Extension)[https://kotlinlang.org/docs/reference/extensions.html].
Sau khi sử dụng kotlin một thời gian, tôi quyết định chia sẻ các mẹo hữu ích và được tôi sử dụng nhiều nhất. Trước khi đọc bài này bạn nên đọc qua tài liệu về Kotlin và tự mình khám phá nó tại (try.kotlinlang.org)[try.kotlinlang.org]. Vì những mẹo này tập trung cụ thể vào việc sử dụng Kotlin trong bối cảnh phát triển Android.
> Những lời khuyên này được sắp xếp dựa trên sự quen thuộc của bạn với Kotlin để bạn có thể dễ dàng bỏ qua các mẹo phù hợp với trình độ kỹ năng của bạn.

# Initial Kotlin Tips for Android
### 1. LAZY LOADING
Có một số lợi ích để sử dụng `LAZY LOADING`. Sử dụng `LAZY LOADING` có thể giúp thời gian khởi động một màn hình hay ứng dụng nhanh hơn. Vì việc `loading variable` được hoãn lại khi nó được truy cập. Điều này đặc biệt hữu ích khi sử dụng Kotlin cho ứng dụng Android thay vì ứng dụng máy chủ. Đối với ứng dụng Android, tôi muốn giảm thời gian khởi động ứng dụng để người dùng thấy nội dung ứng dụng nhanh hơn, thay vì ngồi ở màn hình tải ban đầu.
`Lazy Loading` như thế này cũng hiệu quả hơn bộ nhớ,  vì chúng ta chỉ nạp tài nguyên vào bộ nhớ nếu nó được gọi.  Việc sử dụng bộ nhớ rất quan trọng trên các nền tảng di động như Android, vì điện thoại có nguồn tài nguyên được chia sẻ là có giới hạn. Ví dụ: nếu bạn đang tạo ứng dụng mua sắm và có khả năng người dùng sẽ chỉ duyệt lựa chọn của bạn, bạn có thể có API mua thực tế được sử dụng `lazy loaded` : 
``` Kotlin
val purchaseApi: PurchaseApi by lazy {
    val retrofit: Retrofit = Retrofit.Builder()
            .baseUrl(API_URL)
            .addConverterFactory(MoshiConverterFactory.create())
            .build()
    retrofit.create(PurchaseApi::class.java)
}
```
Bằng cách dùng thế này, Nếu người dùng không bao giờ thanh toán trong ứng dụng. Bạn sẽ không bao giờ phải tải đối tượng `PurchaseApi`. Và do đó sẽ không bị tốn tài nguyên vào việc tạo ra đối tượng `PurchaseApi`

`lazy loading` cũng là một cách hay để gói gọn việc khởi tạo đối tượng
``` Kotlin
val point : PointF by lazy {
        PointF(0f,0f)
    }
```
Ngay khi lần đầu tiên bạn thực hiện sử dụng đối tượng `point`. `PointF` được tạo ra. Sử dụng tọa độ x = 0f, y = 0f. Việc này tiết kiệm cho chúng ta khỏi phải tạo `PointF` một cách rõ ràng và sau đó phải thiết lập nó 1 cách rõ ràng
### 2. LAMBDAS
`Lambdas` giúp làm ngắn gọn mã nguồn của bạn hơn, cho phép sử dụng `functional programming`. Trong khi `Lambdas` được sử dụng trong Android thì trong Kotlin đã được họ cải tiến xa hơn bằng cách đảm bảo rằng bạn không phải đối phó với [Retrolambda](https://github.com/orfjackal/retrolambda) hoặc cấu hình để thay đổi cách bạn xây dựng mã nguồn.
Ví dụ :  sự kiện onClickListener sẽ được xây dựng như sau
``` Kotlin
button.setOnClickListener { view ->
    startListActivity()
}
```
Thậm trí `lambdas` còn hoạt động khi chúng ta xây dựng với giá trị trả về 
```
toolbar.setOnLongClickListener { 
    showContextMenu()
    true
}
```
Ở Android thì có nhiều trường hợp bạn phải đặt một `listener` hoặc `implementing` một phương thức đơn lẻ. `Lambdas` làm việc rất tốt trong những hoàn cảnh đó.
### 3. DATA CLASSES
`Data classes` là một class đơn giản, trong đó nó có sẵn các phương thức `equals()`, `hashCode()`, `copy()`, và `toString()`. Nó làm rõ ý tưởng của một đối tương `Model` và những giá trị nào nên được khai báo. và tách dữ liệu thuần túy với logic nghiệp vụ.
Bây giờ hãy xem `data class` này như một ví dụ 
```Kotlin
data class People(val name: String, val age: Int)
```
Vâng chính nó thưa các bạn. Không có gì khác để sử dụng class này. Nếu bạn có sử dụng `data class` với một cái gì đó như `Gson` hoặc thư viện nào đó phân tích cú pháp `JSON` khác, bạn có thể tạo hàm tạo mặc định với các giá trị mặc định như sau:
``` Kotlin
// Ví dụ với Gson và có sử dụng @SerializedName Annotation
data class People
    @SerializedName("name") val name: String = "",
    @SerializedName("age") val age: Int = 0
)
```
### 4. COLLECTION FILTERING
`Collection` thường được xử lý khá thường xuyên khi làm việc với một API. Như một ví dụ thì bạn muốn lọc hoặc sửa đổi nội dung của `collections` đó. Bằng cách sử dụng `Kotlin collection filtering` để thêm sự rõ ràng và giúp cho source code của bạn trở nên gọn gàng hơn. Thật dễ dàng để biết danh sách kết quả của bạn nên chứa gì với `filtering` như sau:
``` Kotlin
val peoples = api.getPeople()
// Ở đây tôi muốn lấy tất cả những người chơi còn sống trong một game của tôi.
val peopleLives = peoples.filter { 
    it.live // biến "it" là tham số dành cho hàm lambdas có một tham số.
}
adapter.setPeoples(peopleLives)
```
Việc sử dụng filtering này giúp cho mã nguồn ngắn gọn hơn phải không.
### 5. OBJECT EXPRESSIONS
`OBJECT EXPRESSIONS`  cho phép định nghĩa singleton nghiêm ngặt,do đó không có nhầm lẫn cho một lớp có thể được khởi tạo. Chúng cũng đảm bảo rằng bạn không phải lưu trữ các `singleton` đơn lẻ ở đâu đó như trong class `Application` hoặc dưới dạng biến `static class` 
``` Kotlin
import android.os.Handler
import android.os.Looper

// notice that this is object instead of class
object ThreadUtil {

    fun onMainThread(runnable: Runnable) {
        val mainHandler = Handler(Looper.getMainLooper())
        mainHandler.post(runnable)
    }
}
```
`ThreadUtil` sẽ gọi hàm `onMainThread` như một phương thức tĩnh (static method)
``` Kotlin
ThreadUtil.onMainThread(runnable)
```
Còn một cách khác nước chúng ta có thể tạo ra các đối tượng thay cho `anonymous inner classes`:
``` Kotlin
view.addTextChangedListener(object : TextWatcher {
        override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
            //TODO nothing
        }

        override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
        }

        override fun afterTextChanged(editable: Editable) {

        }
})
```
### 6. COMPANION OBJECT
Chúng ta có thể thấy,  Kotlin dường như thiếu các biến và phương thức tĩnh. Theo nghĩa nào đó, Kotlin không có những khái niệm này, hưng thay vào đó có ý tưởng về các đối tượng đồng hành(`companion objects`). `Companion objects` này là các đối tượng singleton trong một class chứa các `method` và `variables` mà các bạn muốn truy cập theo kiểu static. Một `companion objects` cho phép bạn định nghĩa các các hằng số và phương thức, tương tự như `static` của `Java`. Với nó bạn có thể làm theo mô hình tạo `newInstance` pattern cho `fragments`

Dưới đây là xem một đối tượng đồng hành(companion objects) ở dạng đơn giản nhất của nó:
```
class User {

    companion object {
        const val DEFAULT_USER_AGE = 30
    }
}

user.age = User.DEFAULT_USER_AGE
```
Trong Android, chúng tôi thường sử dụng các phương pháp và biến static để tạo ra các `factories` pattern cho `fragments` hoặc `activity intents`. Ví dụ
``` Kotlin
class ViewUserActivity : AppCompatActivity() {

    companion object {

        const val KEY_USER = "user"

        fun intent(context: Context, user: User): Intent {
            val intent = Intent(context, ViewUserActivity::class.java)
            intent.putExtra(KEY_USER, user)
            return intent
        }
    }
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_cooking)
        
        val user = intent.getParcelableExtra<User>(KEY_USER)
        //...
    }
}

```
Bạn gọi phương thức tạo intent này tương tự và thân quen với những gì bạn đã làm trên `Java`
```Kotlin
val intent = ViewUserActivity.intent(context, user)
startActivity(intent)
```
Pattern này thật tuyệt phải không. Vì nó làm giảm khả năng một Intent hoặc Fragment sẽ bị thiếu dữ liệu để hiển thị một người dùng hoặc bất kỳ một nội dung muốn hiển thị. Các companion object  là một cách để giữ một số dạng truy cập tĩnh trong Kotlin và phải được sử dụng tương ứng.

Kết luận
Tôi chia sẻ bài viết này là từ những gì tôi thấy hữu ích nhất mà tôi học được trong quá trình phát triển ứng dụng bằng Kotlin. Để tiếp tục các bài viết về Tips Kotlin cho các lần tới mong các bạn hãy để lại comment để tôi có thể đánh giá được bài viết của mình có chất lượng hay không. và tiếp tục chia sẻ nhé :)