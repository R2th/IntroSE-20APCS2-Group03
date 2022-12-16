# I. Dẫn nhập
* Như chúng ta đã biết một trong những điểm nổi trội của Kotlin so với Java đó là khả năng xử lý null vô cùng hiệu quả. Nếu code của chúng ta có lỗi null thì Android Studio sẽ báo lỗi trong quá trình biên dịch. Lỗi sẽ được chỉ rõ như hình sau:

![](https://images.viblo.asia/1b46c955-0854-48bc-abea-53c5f91982b6.png)

* Dường như chỉ có một cách duy nhất để tạo ***NullPointerException (NPE)*** trong Kotlin là bất chấp sử dụng ***!!*** trong mọi hoàn cảnh. Tuy nhiên trong bài viết này chúng ta sẽ tìm hiểu cách để tạo ra NPE và đưa ra phương án để phòng tránh nó.
* Nội dung bài viết được tham khảo tại [đây](https://sal.vn/3gvFtI)
# II. Nội dung chính
## 1. Lấy dữ liệu từ Intent trong Android
### a. Hiện tượng
* Nếu chúng ta đang sử dụng Android API 29 trở xuống thì cách lấy String từ Intent như sau:
```
val value: String = intent.getStringExtra("MY_KEY")
```
* Đây là đoạn code hợp lệ nên IDE sẽ biên dịch bình thường, tuy nhiên nếu Intent không chưa bất kỳ thông tin nào liên quan tới MY_KEY thì sẽ xảy ra NPE.
### b. Giải pháp
* Chúng ta có thể kiểm tra null khi lấy dữ liệu
```
val value: String = intent.getStringExtra("MY_KEY") ?: ""
```
* Trong Android API 30 thì chúng ta sẽ được cảnh báo khi gặp trường hợp này.
## 2. Truy cập Intent trong Android
### a. Hiện tượng
* Như ở trường hợp trước, chúng ta sẽ gặp lỗi NPE khi thao tác với ***getStringExtra***. Với đoạn code dưới đây, IDE sẽ biên dịch thành công nhưng khi chạy app thì sẽ crash:
```
class MainActivity : AppCompatActivity() {
    val value: String = intent.getStringExtra("MY_KEY") ?: ""
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```
* Lý do là vì intent đã được khởi tạo null và nó chỉ có thể được sử dụng sau ***onCreate***. Trong Kotlin, chúng ta không được yêu cầu phải có ***?*** sau intent nên dẫn đến sự hiểu nhầm intent là object không null.
### b. Giải pháp
* Không bao giờ được sử dụng intent trước onCreate! Nếu chúng ta thực sự cần thì hãy sử dụng thêm ***by lazy***
```
class MainActivity : AppCompatActivity() {
    val value: String by lazy {
        intent.getStringExtra("MY_KEY") ?: ""
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        Log.d("TAG", value)
    }
}
``` 
## 3. Truy cập Java class instance của object
### a. Hiện tượng
* Trường hợp 1 và 2 ở trên có thể tóm tắt lại là do chúng ta đang truy cập vào một Java object và mặc định trong Java thì không thể phân định được object có đang null hay là không.
```
// Java
public class MyClass {
    String accessNullString() {
        return null;
    }
}
```
* Khi truy cập một Java object trong Kotlin, chúng ta có thể giả định object này có thể null hoặc không. Chúng ta sẽ có đoạn code như sau:
```
// Kotlin
val my = MyClass()
val notNull: String = my.accessNullString()
```
* Biên dịch và chạy thì chúng ta sẽ bị NPE.
### b. Giải pháp
* Trong Java code, chúng ta sẽ chú giải với ***@Nullable***
```
// Java
public class MyClass {
    @Nullable
    String accessNullString() {
        return null;
    }
}
```
## 4. Chuyển đổi object bằng GSON
### a. Hiện tượng
* Chúng ta cùng xem đoạn code sau
```
data class MyData (val myString :String)
fun jsonToObject() {
    val json = """{ "nonNull" : null}"""
    val myObj = Gson().fromJson(json, MyData::class.java)
    println(myObj)
    println(myObj.myString.length)
}
```
* Khi chạy code, GSON sẽ chuyển đổi json thành MyData. Hãy chú ý tới kết quả của ***println(myObj)***
```
MyData(myString=null)
```
* ***myObj.myString*** là null tuy nhiên **myString** lại là String không thể null. Do đó khi chúng ta chạy code ***println(myObj.myString.length)*** thì sẽ xảy ra NPE.  Điều này xảy ra bởi vì GSON sử dụng phản chiếu để cập nhật dữ liệu cho biến và do đó điều đó không thể ngăn một đối tượng không thể null nhận được null.
### b. Giải pháp
* Điều duy nhất chúng ta có thể làm là hãy cẩn thận khi dùng GSON hoặc tìm một giải pháp thay thế như [MOSHI](https://github.com/square/moshi).
## 5. Ép kiểu sử dụng AS
### a. Hiện tượng
* Để ép kiểu trong Kotlin chúng ta sẽ sử dụng từ khóa as. Nếu chúng ta ép kiểu thành công thì sẽ có cảnh báo sau:

![](https://images.viblo.asia/89dc2e5c-9832-4103-8086-3478b4731d35.png)

* Tuy nhiên, nếu chúng ta có đoạn code như sau thì mọi thứ đều bình thường:
```
val someAny: Any? = null
val someInt = someAny as Int
```
* Chúng ta đang gán cho someAny có giá trị null nhưng lại ép kiểu cho nó thành Int và điều này sẽ dẫn đến NPE.
### b. Giải pháp
* Tốt nhất là chúng ta nên kiểm tra trước khi ép kiểu. Bằng cách đó, nếu object là val thì nó sẽ tự động được ép kiểu qua Int thì thỏa mãn điều kiện so sánh
```
val someAny: Any? = null
if (someAny is Int) {
    val someInt = someAny
}
```
* Một cách tiếp cận khác là sử dụng as? – nó sẽ gán giá trị null thay vì NPE khi ép kiểu không thành công.
```
val someAny: Any? = null
val someInt = someAny as? Int
```
## 6. NPE với AS?
### a. Hiện tượng
* Với cách sử dụng as? ở trên dường như là hoàn hảo cho việc chống lại NPE, tuy nhiên chúng ta hãy cùng xem xét ví dụ sau
```
fun <T> Bundle.getDataOrNull(key: String): T? {
    return getSerializable(key) as? T
}
```
* Đoạn code này thường được sử dụng để lấy dữ liệu từ bundle và nó có thể tự động ép sang kiểu mong muốn.
```
val bundle: Bundle? = Bundle()
bundle?.putSerializable("DATA_KEY", "Testing")
val strData: String? = bundle?.getDataOrNull("DATA_KEY")
val intData: Int? = bundle?.getDataOrNull("DATA_KEY") // Crash
```
* Chúng ta đang lấy Int? từ String? và sẽ gây ra NPE.
### b. Giải pháp
* Chúng ta có thể sử dụng ***reified*** trong trường hợp này
```
private inline fun <reified T> Bundle.getDataOrNull(): T? {
    return getSerializable(DATA_KEY) as? T
}
```
* Bằng cách này chúng ta lấy dữ liệu thoải mái
```
val bundle: Bundle? = Bundle()
bundle?.putSerializable("DATA_KEY", "Testing")
val strData: String? = bundle?.getDataOrNull("DATA_KEY")
val intData: Int? = bundle?.getDataOrNull("DATA_KEY")
```
## 7. UninitializedPropertyAccessException
### a. Hiện tượng
* Trường hợp này xảy ra phổ biến khi chúng ta quên gán giá trị trước khi sử dụng.
```
class MainActivity : AppCompatActivity() {
    lateinit var someValue: String
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        // this line forgotten to uncomment
        // someValue = intent.getStringExtra(KEY) ?: ""
        Log.d("TAG" someValue)
    }
}
```
### b. Giải pháp
* Chúng ta sẽ sử dụng by lazy để quên đi nỗi lo khởi tạo trước khi sử dụng.
```
class MainActivity : AppCompatActivity() {
    val someValue by lazy {
       intent.getStringExtra(KEY) ?: ""
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        Log.d("TAG" someValue)
    }
}
```
# III. Kết
* Hy vọng với nội dung bài viết này các bạn sẽ phần nào hiểu và nắm được cách giải quyết các vấn đề liên quan tới NPE.