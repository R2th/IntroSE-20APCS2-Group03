Kotlin là một ngôn ngữ thân thiện và nó làm cho những công việc thách thức nhất trên thế giới trở thành một công việc thú vị, bất kể bạn làm việc ở nền tảng nào. Với Kotlin, bạn có thể tạo ra phong cách code riêng của mình.

Nếu bạn chưa xem qua phần đầu tiên, hãy ngó qua nó nhé . Bài viết đầu tiên chứa một hướng dẫn chi tiết về cách bạn sử dụng các tính năng mạnh mẽ và hữu ích từ Kotlin như các `extensions`, `higher-order,` and `scoped functions`. Xem qua phần 1 tại [đây](https://viblo.asia/p/kotlin-part-1-cac-tinh-nang-doc-quyen-ma-ban-nen-su-dung-RnB5p6xwZPG) nhé .
Giờ chúng ta sẽ tiếp tục tìm hiểu về những tính năng tuyệt vời của Kotlin 

# Kotlin Delegates
Một delegates là một lớp cung cấp giá trị cho một thuộc tính và xử lý các thay đổi của nó. Điều này cho phép chúng ta di chuyển hoặc ủy quyền, xử lý logic getter-setter từ chính thuộc tính sang một lớp riêng biệt, cho phép chúng ta sử dụng lại logic này.

Hãy xem một ví dụ đơn giản : 
```kotlin
class Sample {
    var str_sample : String = ""
        set(value) { field = value.trim() }
}
```


Nếu bạn có chút bối rối nào với cú pháp trên , hãy xem tài liệu của Kotlin doc tại [đây 
](https://kotlinlang.org/docs/reference/properties.html).

Ở  đây là chúng ta có thể gán một giá trị cho biến `str_sample` như ở trên, nhưng lợi thế của việc viết này là bạn không cần phải viết `.trim ()` mỗi lần. 
Bạn có thể tạo các extension functions hoặc các lớp tùy chỉnh để áp dụng điều này nhanh hơn nữa.
Đọc [part 1](https://viblo.asia/p/kotlin-part-1-cac-tinh-nang-doc-quyen-ma-ban-nen-su-dung-RnB5p6xwZPG) để biết cách tạo `extention functions` nhé 

Bạn có thể sẽ thắc mắc, ờ thì cũng hay nhưng cũng có gì to tát lắm đâu mà làm quá vậy.
Nếu vậy thì bạn đã sai , nó siêu hữu dụng luôn nhé , hãy xem xét ví dụ sau về put và get shared-preference :
```kotlin
    fun getAccessToken(): String {
        return sharedPreferenceHelper.getString(Constants.ACCESS_TOKEN, "")
    }

    fun setAccessToken(value : String) {
        sharedPreferenceHelper.edit().putString(Constants.ACCESS_TOKEN, value).apply()
    }
```
Chúng ta có thể giảm code và trông nó "chất " hơn như sau :
```kotlin
var accessToken: String
    get() = sharedPreferenceHelper.getString(Constants.ACCESS_TOKEN,"")
    set(accessToken) = sharedPreferenceHelper.setString(Constants.ACCESS_TOKEN, accessToken)
```
Bây giờ, hãy xem cách chúng ta có thể sử dụng các delegates này với các thành phần khác. Nếu bạn quan sát những gì mình đang làm ở đây một cách cẩn thận, bạn có thể thấy rằng chúng ta đang lưu một giá trị cho một biến và truy xuất giá trị sau này khi được yêu cầu.
Chúng ta có thể tận dụng chức năng này và thực hiện lưu và truy xuất các giá trị từ `bundle` theo cách dễ dàng hơn.

Hãy xem cách  lưu và lấy các giá trị từ `bundle` trong `fragments` nhé .
```kotlin
//saving values into bundle
arguments = Bundle().apply {
      putInt(Constants.CutomerID, id)
      putString(Constants.CutomerName, name)
}

//retrining values from bundle
arguments?.let { args ->
      id = args.getInt(Constants.CutomerID)
      name = args.getString(Constants.CutomerName)
}
```
Hãy xem những gì chúng ta đã làm ở đây , chúng ta lưu các giá trị vào `bundle` sau đó gán nó cho `fragment`  khi tạo và sau đó lấy các giá trị từ `bundle` trong hàm `OnCreate` 

Bạn thấy đấy, quá nhiều việc phải làm.Hãy làm cho nó dễ dàng hơn một chút với các `extensions` và `delegates`.

Trước tiên, hãy  tạo một extension chèn các giá trị trong bundle để chúng ta không cần phải gọi các hàm khác nhau dựa trên kiểu dữ liệu :
```kotlin 
fun <T> Bundle.put(key: String, value: T) {
    when (value) {
        is Boolean -> putBoolean(key, value)
        is String -> putString(key, value)
        is Int -> putInt(key, value)
        is Short -> putShort(key, value)
        is Long -> putLong(key, value)
        is Byte -> putByte(key, value)
        is ByteArray -> putByteArray(key, value)
        is Char -> putChar(key, value)
        is CharArray -> putCharArray(key, value)
        is CharSequence -> putCharSequence(key, value)
        is Float -> putFloat(key, value)
        else -> throw IllegalStateException("Type of property $key is not supported")
    }
}
```
Rồi chúng ta tạo một class extend `ReadWriteProperty` và override lại hàm set  get  như dưới đây để có thể lưu và lấy lại giá trị 
```kotlin
class FragmentBundleDataDelegate<T : Any> :
    ReadWriteProperty<Fragment, T> {

    @Suppress("UNCHECKED_CAST")
    override fun getValue(
        thisRef: Fragment,
        property: KProperty<*>
    ): T {
        val key = property.name
        return thisRef.arguments
            ?.get(key) as? T
            ?: throw IllegalStateException("Property ${property.name} could not be read")
    }

    override fun setValue(
        thisRef: Fragment,
        property: KProperty<*>, value: T
    ) {
        val args = thisRef.arguments
            ?: Bundle().also(thisRef::setArguments)
        val key = property.name
        args.put(key, value)
    }
}
```
Bây giờ hãy tạo một hàm để đơn giản hóa quá trình sử dụng lớp trên và cũng dễ hiểu hơn cho các dev mới trong dự án nhé :
```kotlin
fun <T : Any> argument(): ReadWriteProperty<Fragment, T> 
                      = FragmentArgumentDelegate()
```
Bây giờ là lúc sử dụng delegate này và xem cách nó làm cho việc code của chúng ta dễ dàng hơn
```kotlin
class CustomerFragment : Fragment() {
    private var id : Int by argument()
    private var name : String by argument()
    companion object {
        fun getInstance(mId: Int, nName: String): CustomerFragment =
            CustomerFragment().apply {
                this.id = mId
                this.name = nName
            }
    }
}
```
Đó là tất cả những gì bạn cần làm, thậm chí không cần viết bất kỳ đoạn code nào để đặt hoặc nhận các giá trị từ gói. Điều đó không phải là tuyệt vời hay sao.

-----


# Default & Named parameters trong functions
Kotlin có nhiều tính năng hữu ích nhưng lại bị đánh giá thấp, có lẽ đây là một trong số đó.

Viết một hàm tính tổng của hai giá trị. Phần khó khăn ở đây là người dùng có thể truyền cả hai giá trị hoặc bất kỳ một trong các giá trị hoặc không có gì. Tất nhiên java có thể xử lý việc này như hiển thị bên dưới
```java
public void add(int a, int b) : Int{
  return a + b
}
public void add(int a) : Int{
  return this.add(a, 0);
}
public void add() : Int {
  return this.add(0, 0);
}
```
Nhưng có vẻ khá dài dòng. Bây giờ hãy xem cách Kotlin xử lý nhé:
```kotlin
fun add(a : Int = 0, b : Int = 0) =  a + b
```
Ngon chưa, 1 dòng thôi. Một hàm với các tham số có giá trị mặc định. Bạn có thể chỉ truyền giá trị a hoặc b tùy theo mục đích của bạn

Đây là một tính năng hữu ích khác trong Kotlin. Chúng ta có thể truyền tham số bằng tên của chúng trong hàm 
```kotlin
add() // no values are passed so both will 0 by default
add(12,13) // Both values are passed
add(a = 12) // only a value is passed and b will be 0 by default
add(b = 13) // only b value is passed and a will be 0 by default
add(b = 13, a = 12) // You don't need to maintain sequence when using named parameters
``` 
# Inline functions để sử dụng higher-order functions hiệu quả hơn
Trong Kotlin,  `higher-order functions` và `lambads` được lưu trữ dưới dạng đối tượng, do đó, mức tiêu thụ bộ nhớ và các lời gọi ảo (virtual calls) có thể dẫn đến runtime overhead. Đôi khi chúng ta có thể loại bỏ memory overhead bằng cách nội tuyến mã (inlining) của các higher-oder-function

Inline function được khai báo với từ khóa `inline`. Việc sử dụng inline function giúp tăng cường hiệu suất của higher-order function. Inline function báo cho trình biên dịch sao chép các tham số và hàm vào nơi nó được gọi.

Để hiểu rõ hơn mọi người cùng xem ví dụ sau đâu nhé :
```kotlin
public inline fun print(message: String) {
    System.out.print(message)
}
```
Giờ invoke print function từ một fucntion khác nhé:
```kotlin
fun normalFunction(){
    print("Hello")
    print("world")
}
```
Đây là cách nó xuất hiện trước khi biên dịch, khi chúng ta khai báo một hàm là inline , trình biên dịch xử lý nó theo một cách khác . Trong khi biên dịch, nó thay thế lời gọi hàm bằng các câu lệnh thực tế trong hàm đó. Tức là trong hàm `print` có gì thì nó sẽ lôi hết vào nơi được gọi.
```kotlin
fun normalFunction(){
    System.out.print("Hello")
    System.out.print("world")
}
```
Vì vậy, không có đối tượng nào được lưu trong bộ nhớ và nó thực thi các câu lệnh từng bước như chức năng bình thường, điều này dẫn đến hiệu suất tốt hơn. Muốn hiểu rõ hơn các bạn có thể show byte code lên và check nhé . 
# Sự mạnh mẽ của câu lệnh ‘when’ trong Kotlin
Trọng tâm chính của câu lệnh `when` trong Kotlin là cung cấp chức năng tương tự như câu lệnh `switch`. Trong khi đó chức năng `switch` bị hạn chế ở một số giới hạn nhất định như so sánh giá trị và thực thi các khối mã khác nhau.

Nhưng `when` có rất nhiều chức năng hữu ích như nó có thể trả về giá trị hoặc thực thi các khối mã dựa trên các giá trị.
### Simple ‘when’ block
Hãy để xem cách thực hiện một khối  `when` bình thường
```kotlin
when(number) {
    0 -> println("apple")
    1, 2 -> println("banana")
    3 -> println("grape")
    4 -> println("Orange")
    else -> println("Not a fruite")
}
```
`when` thay thế từ khóa  `default` trong `switch`  thành `else` nhưng chức năng thì vẫn tương tự 
### Return values with ‘when’ block
Bây giờ, hãy xem cách trả về giá trị bằng cách sử dụng câu lệnh `when`
```kotlin
tv_name.text =  when(number) {
     0 -> "apple"
     1, 2 -> "banana"
     3 -> "grape"
     4 -> "Orange"
     else -> "Not a fruite"
}
```
Tất nhiên chức năng này không thể có trong `Java`
### Arbitrary conditions- điều kiện tùy biến
`when`  không chỉ hỗ trợ so sánh liên tục đơn giản, nó còn hỗ trợ các điều kiện bên trong như phạm vi số như hình dưới đây
```kotlin
tv_name.text =  when(number) {
     0 -> "apple"
     1, 2 -> "banana"
     in 3..7 -> "grape"
     !in 8..12 -> "Orange"
     else -> "Not a fruite"
}
```
### Sử dụng ‘when’ mà không có argument
Sức mạnh của `when` là chúng ta có thể sử dụng nó ngay cả khi không có `argument`. Đặc biệt chưa nào. Trong trường hợp này, nó hoạt động như một khối `if / else` đơn giản nhưng ưu điểm ở đây là nó clean hơn và dễ hiểu hơn.
```kotlin
    when {
        number > 1 -> print("apple")
        text == "apple" -> print("This is apple")
    }
```
Cảm ơn các bạn vì đã theo dõi từ đầu đến cuối bài viết của mình. Hy vọng các bạn cũng đã có cái nhìn mới về Kotlin và sử dụng Kotlin thuần thục hơn .
Bài viết được dịch từ trang [Medium 
](https://medium.com/android-dev-hacks/advanced-android-programming-with-kotlin-part-2-aae2a15258b0) và có thêm chút xàm xí của mình nữa. Có gì sai xót mong mọi người góp ý :heart_eyes::heart_eyes::heart_eyes: