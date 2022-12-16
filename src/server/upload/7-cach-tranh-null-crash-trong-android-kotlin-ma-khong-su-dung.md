Một trong những điểm hay của Kotlin so với Java là khả năng xử lý null. Nếu chúng ta có code có thể bị null, Android Studio sẽ xảy ra lỗi trong thời gian biên dịch như hình bên dưới
![](https://miro.medium.com/max/700/1*W-mwsqHNDtXI3QA5GOyQkQ.png)
Dường như đa phần chúng ta nghĩ là bị crash null khi runtime trong Kotlin là khi ta sử dụng !!.

Tuy nhiên, dưới đây là 7 cách có thể xảy ra null crash hay vài sự cố na ná vậy mà không hể sử dụng !! . Hãy cùng tìm hiểu và xem cách khắc phục cho nó nha
# 1. Lấy giá trị từ Intent trong Android
Nếu như bạn đang sử dụng Android APi 29 hoặc sớm hơn, bạn có thể lấy ra String từ Intent như cách sau :
```kotlin 
val value: String = intent.getStringExtra("MY_KEY")
```
Sẽ không có bất kỳ lỗi nào và bạn có thể biên dịch code. Tuy nhiên, nếu intent  không lưu trữ bất cứ thứ gì bằng MY_KEY, thì nó sẽ bị null crash 💥
![image.png](https://images.viblo.asia/ea07e289-1627-4a51-93ec-f4fa08a886ce.png)
**Solution**
Bạn có thể check null như sau :
```kotlin 
val value: String = intent.getStringExtra("MY_KEY") ?: ""
```
Và tin tốt là, trong Android API 30, điều này sẽ gắn cờ là một lỗi ngay bây giờ trong thời gian biên dịch.

Để an toàn hơn, bạn có thể xử lý khéo léo theo cách này nhé 

https://medium.com/mobile-app-development-publication/avoid-kotlins-with-common-graceful-error-report-function-a91493459e74

# 2. Truy cập Intent trong Android
Được rồi, chúng ta đã biết cách kiểm tra null cho những thứ như `getStringExtra`. Vì vậy, có vẻ như đoạn code dưới đây sẽ an toàn và chạy tốt. Woa nó biên dịch và không có vấn đề gì.
```kotlin
class MainActivity : AppCompatActivity() {
    val value: String = intent.getStringExtra("MY_KEY") ?: ""
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```
Nhưng khoan, bạn thử dừng lại vài giây và check thử xem

Oh no.., khi bạn chạy đoạn code như trên, chắc chắn nó sẽ bị crash 💥.

Lý do là, `intent` ban đầu là rỗng. Nó chỉ có thể được sử dụng trong hoặc sau `onCreate`.
Nhưng trong Kotlin, nó không yêu cầu chúng ta phải có ? sau `intent`, tức là `intent?.getStringExtra (“MY_KEY”)`, điều này khiến người ta nghĩ rằng `intent` không phải là một đối tượng nullable 😓.

**Solution**

Không bao giờ sử dụng `intent` trước khi `onCreate`! Đó không phải là cách hoạt động của Android. Nếu bạn thực sự muốn làm việc đó tự động hơn, hãy sử dụng `by lazy`
```kotlin 
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
# 3. Truy cập đối tượng của một instance Java class
Vấn đề 1 và 2 ở trên có thể được tóm tắt là vấn đề Kotlin truy cập đối tượng của Java. Trong Java, theo mặc định, không có dấu hiệu cho biết một đối tượng có thể null hay không.
```java
// Java
public class MyClass {
    String accessNullString() {
        return null;
    }
}
```
Trong khi đó, trong Kotlin khi truy cập một đối tượng Java, chúng ta có thể giả sử đối tượng Java là nullable hoặc không. Vì vậy, chúng ta có thể viết đoạn code dưới đây và biên dịch tốt.
```kotlin
// Kotlin
val my = MyClass()
val notNull: String = my.accessNullString()
```
Tuy nhiên, khi bạn chạy đoạn code như trên, nó sẽ bị crash 💥.

**Solution**

Tốt nhất, code Java nên được chú thích bằng @Nullable
```java
// Java
public class MyClass {
    @Nullable
    String accessNullString() {
        return null;
    }
}
```
Sau đó, trong code Kotlin, nó sẽ cảnh báo trong thời gian biên dịch nếu gán hàm đó cho một biến không thể nullable trong Kotlin.
Nếu bạn không có quyền kiểm soát code Java hoặc quá khó để thực hiện thay đổi, hãy luôn giả định rằng tất cả các đối tượng từ Java có thể là rỗng.

Việc bạn code lẫn cả Java và Kotlin có lẽ không phải là chuyện hiếm khi những dự án cũ được maintain và muốn nâng cấp thêm nhiều thứ. Do đó lỗi này hoàn toàn có thể găp nhiều lần.

Có các vấn đề khác khi giao tiếp giữa Java và Kotlin, hãy xem [đấy nhé](https://medium.com/mobile-app-development-publication/java-kotlin-border-crossing-checks-7e6313a330a5) 
# 4. GSON Converted Object
GSON là một thư viện tuần tự hóa JSON tuyệt vời do Google cung cấp. Chúng ta có thể chuyển đổi JSON sang Java hoặc Kotlin Class Object.
Một ví dụ bên dưới, chuyển đổi đơn giản
```kotlin 
data class MyData (val myString :String)
fun jsonToObject() {
    val json = """{ "nonNull" : null}"""
    val myObj = Gson().fromJson(json, MyData::class.java)
    println(myObj)
    println(myObj.myString.length)
}
```
Bằng cách chạy ở trên, nó sẽ chuyển đổi sang JSON thành `MyData`. Điều thú vị là `println (myObj)` sẽ cho kết quả
```kotlin 
MyData(myString=null)
```
Lưu ý rằng `myObj.myString` thực sự bị null, mặc dù myString không phải là một chuỗi `nullable` !
Vì vậy, khi chúng ta println (myObj.myString.length), nó sẽ bị crash 💥.

Điều này xảy ra vì GSON sử dụng phản chiếu để cập nhật dữ liệu biến và do đó không thể ngăn đối tượng không thể null nhận được null.

https://medium.com/mobile-app-development-publication/kotlin-hacking-non-null-variable-null-d976ac806806

**Solution**

Không thể làm được gì nhiều nếu bạn đang sử dụng GSON. Nó là lib kín rồi và cách duy nhất là cần cẩn thận.
Một tùy chọn khác là sử dụng `MOSHI`, phiên bản cụ thể của Kotlin của JSON Serializer
# 5. Kotlin casting sử dụng AS
Trong Kotlin, chúng ta sử dụng `as` để truyền từ loại này sang loại khác.
Nếu chúng ta `cast` thứ gì đó không thành công, nó sẽ có warning như bên dưới

![](https://miro.medium.com/max/700/1*dWA2pGgWkXUy1egEe3cKeg.png)
Tuy nhiên, với case dưới đây sẽ không có cảnh báo nào được hiển thị cả.
```kotlin 
val someAny: Any? = null
val someInt = someAny as Int
```
Điều này là do vẫn có thể có một` Int?` Là `Int`, là `Any`.
Nhưng đối với đoạn code của chúng ta ở trên, chúng ta đã đặt rõ ràng `someAny` thành `null`, và khi chạy nó, nó sẽ bị lỗi null 💥

**Solution**

Tốt hơn hết bạn nên kiểm tra lại type trước khi cast. Bằng cách kiểm tra như vậy nó sẽ tự động được chuyển thành `Int` khi so sánh thành công.
```kotlin 
val someAny: Any? = null
if (someAny is Int) {
    val someInt = someAny
}
```
Cách tiếp cận khác là, sử dụng `as?` , theo đó khi quá trình truyền không thành công, giá trị `null` được đưa ra thay vì là crash.
```kotlin 
val someAny: Any? = null
val someInt = someAny as? Int
```
> Lưu ý : `as? Int` khác với `Int`? Trong trường hợp trên, nó sẽ hoạt động như vậy. Tham khảo [StackOverflow](https://stackoverflow.com/q/65720186/3286489) .
# 6. Crashing với AS?
Với những điều trên `as?` nghe vẻ là giống như một sự bảo vệ tuyệt vời chống lại bất kỳ sự cố nào.
Với Android, bây giờ ta có thể xây dựng một cái gì đó ví dụ như `generic` để cast đến loại đối tượng đích.
```kotlin 
fun <T> Bundle.getDataOrNull(key: String): T? {
    return getSerializable(key) as? T
}
```
Điều này rất hữu ích khi chúng ta lấy dữ liệu từ `bundle` và sau đó chúng ta có thể để nó tự động cast đến đối mong muốn.
Thử xem nào
```kotlin 
val bundle: Bundle? = Bundle()
bundle?.putSerializable("DATA_KEY", "Testing")
val strData: String? = bundle?.getDataOrNull("DATA_KEY")
val intData: Int? = bundle?.getDataOrNull("DATA_KEY") // Crash
```
Ồ đậu xanh, nó vẫn crash 💥 khi cố gắng lấy `Int?` Từ một `String?`, mặc dù nó đang sử dụng `as?.` Làm thế nào mà có thể xảy ra việc đó được?
> Lưu ý: đây không phải là một loại  null crash, mà là một sự cố casting crash… mặc dù nó trông giống như một sự cố  null crash vậy😜
> 
**Solution**

Nó được giải thích trong bài viết dưới đây :

https://medium.com/mobile-app-development-publication/how-reified-type-makes-kotlin-so-much-better-7ae539ed0304

Để làm cho nó clean và safe hơn, chúng ta có thể sử dụng `reified`
```kotlin 
private inline fun <reified T> Bundle.getDataOrNull(): T? {
    return getSerializable(DATA_KEY) as? T
}
```
Từ khóa `reifed` có nhiều công dụng mạnh mẽ, bạn có thể tìm hiểu thêm nhé.
# 7. UninitializedPropertyAccessException
Đây không thực sự là sự cố crash do null , nhưng vẫn là một vụ tai nạn gần giống như vậy.
```kotlin 
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
Lý do rất đơn giản, quên gán giá trị `someValue` trước khi sử dụng nó.

**Solution**

Tất nhiên, giải pháp là khởi tạo nó, và tất nhiên là mọi người có thể quên.
Một cách để giải quyết là xem xét sử dụng `by lazy`. Điều này sẽ loại bỏ khả năng quên gán giá trị cho biến.
```kotlin 
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
Điều này có thể ngăn ngừa một số tai nạn do quên khởi tạo giá trị `lateinit`

https://medium.com/mobile-app-development-publication/kotlin-variable-to-be-lazy-or-to-be-late-ab865c682d61

Hy vọng bài viết lần này có thể giúp các bạn hạn chế đỡ được những lỗi null gây crash app. Bài viết được dịch từ trang [Medium](https://medium.com/mobile-app-development-publication/7-ways-to-null-crash-android-kotlin-without-using-a759751860c6)

Cảm ơn sự quan tâm của mọi người <3.