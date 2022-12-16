![](https://miro.medium.com/max/1074/1*j6rdiGHMTehpAr6GzTCksw.png)
Kotlin thực sự là một ngôn ngữ hiện đại với một số tính năng tuyệt vời giúp phát triển ứng dụng trở thành một trải nghiệm thú vị khi chúng ta thực hiện chúng. Một trong những tính năng như vậy là Delegated Properties. Trong bài đăng này, chúng ta sẽ cùng tìm hiểu Delegates có thể làm những gì giúp chũng ta phát triển ứng dụng Android một cách dễ dàng hơn
### Basic
Điều đầu tiên, chúng ta cần hiểu delegate là gì và chúng hoạt động như thế nào

Một delegate chỉ là một class cung cấp giá trị cho một thuộc tính và xử lý các thay đổi của nó. Điều này cho phép chúng ta di chuyển hoặc uỷ quyền logic getter-setter từ  chính thuộc tính đó sang một class riêng biệt cho phép chúng ta sử dụng logic này

Ví dụ tôi muốn thuộc tính param : String luôn được trim. Chúng ta có thể làm điều này ngay trong setter của thuộc tính này 


``` kotlin 
class Example {

    var param: String = ""
        set(value) {
            field = value.trim()
        }
}
```

- Bây giờ, nếu tôi muốn sử dụng lại chức năng này trong một số class khác thì như nàoo?? Delegates sẽ xử lý điều này 

```kotlin
class TrimDelegate : ReadWriteProperty<Any?, String> {

    private var trimmedValue: String = ""

    override fun getValue(
        thisRef: Any?,
        property: KProperty<*>
    ): String {
        return trimmedValue
    }

    override fun setValue(
        thisRef: Any?,
        property: KProperty<*>, value: String
    ) {
        trimmedValue = value.trim()
    }
}
```
Delegate chỉ là một class với 2 method cho get và set giá trị của một thuộc tính.  Để có thêm một số thông tin, nó được cung cấp với thuộc tính mà nó làm việc thông qua một thể hiện của KProperty class, và một đối tượng có thuộc tính này thông qua thisRef. 

Còn đây là cách ta sử dụng một delegates được tạo ra :

``` kotlin
class Example {

    private val delegate = TrimDelegate()
    var param: String
        get() = delegate.getValue(this, ::param)
        set(value) {
            delegate.setValue(this, ::param, value)
        }
```

::param là một operator trả về một instance của KProperty class cho property 

Bạn có thể thấy rằng, Delegate không có gì phức tạp và khó hiểu ngược lại nó rất đơn giản mà chúng lại còn thực sự rất hữu ích. Chúng ta cùng đi đến những ví dụ cụ thể trong việc phát triển Android 

## Fragment arguments

- Chúng ta thường truyền một số param sang fragment. Ta thường viết như thế này

```kotlin 
class DemoFragment : Fragment() {
    private var param1: Int? = null
    private var param2: String? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let { args ->
            param1 = args.getInt(Args.PARAM1)
            param2 = args.getString(Args.PARAM2)
        }
    }
    companion object {
        private object Args {
            const val PARAM1 = "param1"
            const val PARAM2 = "param2"
        }
        fun newInstance(param1: Int, param2: String): DemoFragment =
            DemoFragment().apply {
                arguments = Bundle().apply {
                    putInt(Args.PARAM1, param1)
                    putString(Args.PARAM2, param2)
                }
            }
    }
}
```

Ta truyền param khi tạo fragment với newInstance static method. Bên trong nó ta truyền param vào fragment argument để nhận nó ở onCreate

Ta có thể viết code gọn hơn, chuyển logic liên quan đến param sang getter và setter

```kotlin
class DemoFragment : Fragment() {
    private var param1: Int?
        get() = arguments?.getInt(Args.PARAM1)
        set(value) {
            value?.let {
                arguments?.putInt(Args.PARAM1, it)
            } ?: arguments?.remove(Args.PARAM1)
        }
    private var param2: String?
        get() = arguments?.getString(Args.PARAM2)
        set(value) {
            arguments?.putString(Args.PARAM2, value)
        }
    companion object {
        private object Args {
            const val PARAM1 = "param1"
            const val PARAM2 = "param2"
        }
         fun newInstance(param1: Int, param2: String): DemoFragment =
            DemoFragment().apply {
                this.param1 = param1
                this.param2 = param2
            }
    }
}
```

Nhưng chúng ta vẫn có thể viết code đơn giản hơn. Đầu tiên cần 1 số chuẩn bị. Arguments của fragment thường nằm trong bundle  object, để có các phương thức riêng biệt để put các kiểu dữ liệu khác nhau. Vì vậy cần tạo 1 extention function để đặt 1 giá trị tuỳ ý cho bundle, và bắt exception với kiểu dữ liệu không support

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
        is Bundle -> putBundle(key, value)
        is Parcelable -> putParcelable(key, value)
        is Serializable -> putSerializable(key, value)
        else -> throw IllegalStateException("Type of property $key is not supported")
    }
}
```
Giờ ta có thể tạo delegate cho nó 

```kotlin
class FragmentArgumentDelegate<T : Any> :
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

Delegate đọc giá trị thuộc tính từ fragment arguments. Và khi giá trị thuộc tính thay đổi, delegate sẽ nhận fragment arguments (hay tạo và set mới 1 bundle làm argument nếu fragment đó không có giá trị nào truyền vào) và sau đó sẽ viết giá trị mới vào arguments, sử dụng enxtension Bundle.put được viết ở trên.

ReadWriteProperty là một generic interface chấp nhận 2 kiểu param. Ta đặt tham số đầu là fragment, làm delegate chỉ sử dụng cho các thuộc tính bên trong fragment. Điều này cho chúng ta truy cập vào fragment với thisReff và quản lý argument trong chúng.

Chú ý rằng chúng ta sử dụng tên của thuộc tính với key cho argument, để chúng ta không phải lưu key dưới dạng hằng số 

Kiểu param thứ 2 của ReadWriteProperty quyết định xem kiểu giá trị thuộc tính nào có thể có. Ta set kiểu non-nullable và bắt exception khi không được giá trị. Nó cho phép ta có thuộc tính non-nullable trong fragment, trách việc check null

Nhưng có lúc ta cần thuộc tính có thể null thì ta cần tạo 1 delegate khác để làm việc này, nếu argument không được tìm thấy, không trả về 1 exception thay vào đó return về null 

```kotlin
class FragmentNullableArgumentDelegate<T : Any?> :
    ReadWriteProperty<Fragment, T?> {

    @Suppress("UNCHECKED_CAST")
    override fun getValue(
        thisRef: Fragment,
        property: KProperty<*>
    ): T? {
        val key = property.name
        return thisRef.arguments?.get(key) as? T
    }

    override fun setValue(
        thisRef: Fragment,
        property: KProperty<*>, value: T?
    ) {
        val args = thisRef.arguments
            ?: Bundle().also(thisRef::setArguments)
        val key = property.name
        value?.let { args.put(key, it) } ?: args.remove(key)
    }
}
```

Ta có thể viết thêm 1 số function để thuận tiện cho việc sử dụng 

```kotlin
fun <T : Any> argument(): ReadWriteProperty<Fragment, T> =
    FragmentArgumentDelegate()
fun <T : Any> argumentNullable(): ReadWriteProperty<Fragment, T?> =
    FragmentNullableArgumentDelegate()
```

```kotlin
class DemoFragment : Fragment() {
    private var param1: Int by argument()
    private var param2: String by argument()
    companion object {
        fun newInstance(param1: Int, param2: String): DemoFragment =
            DemoFragment().apply {
                this.param1 = param1
                this.param2 = param2
            }
    }
}
```

### SharedPreferences delegates
- Ta thường sử dụng sharedPrefences để lưu nhanh 1 số dữ liệu để lấy ra khi app được chạy. Chúng ta thường viết thế này 
```kotlin 
class Settings(context: Context) {

    private val prefs: SharedPreferences = 
        PreferenceManager.getDefaultSharedPreferences(context)

    fun getParam1(): String? {
        return prefs.getString(PrefKeys.PARAM1, null)
    }

    fun saveParam1(param1: String?) {
        prefs.edit().putString(PrefKeys.PARAM1, param1).apply()
    }

    fun getParam2(): Int {
        return prefs.getInt(PrefKeys.PARAM2, 0)
    }

    fun saveParam2(param2: Int) {
        prefs.edit().putInt(PrefKeys.PARAM2, param2).apply()
    }

    fun getParam3(): String {
        return prefs.getString(PrefKeys.PARAM3, null) 
            ?: DefaulsValues.PARAM3
    }

    fun saveParam3(param3: String) {
        prefs.edit().putString(PrefKeys.PARAM2, param3).apply()
    }

    companion object {
        private object PrefKeys {
            const val PARAM1 = "param1"
            const val PARAM2 = "param2"
            const val PARAM3 = "special_key_param3"
        }

        private object DefaulsValues {
            const val PARAM3 = "defaultParam3"
        }
    }
}
```

Ta có thể thấy trong đoạn code này có một số đoạn bị lặp đi lặp lại , Ta có thể chuyển chúng vào một private method. Nhưng nó vẫn khá phức tạp. Bên cạnh đó, điều gì sẽ xảy ra nếu chúng ta muốn sử dụng lại logic này trong một số class khác? Hãy cùng xem cách mà delegate làm chúng đơn giản hơn rất nhiều 

Để tăng góc nhìn, ta thử tiếp cần theo cách khác. Lần này, sẽ sử dụng Object expression và tạo extention function cho SharedPreferences.

```kotlin
fun SharedPreferences.string(
    defaultValue: String = "",
    key: (KProperty<*>) -> String = KProperty<*>::name
): ReadWriteProperty<Any, String> =
    object : ReadWriteProperty<Any, String> {
        override fun getValue(
            thisRef: Any,
            property: KProperty<*>
        ) = getString(key(property), defaultValue)
        override fun setValue(
            thisRef: Any,
            property: KProperty<*>,
            value: String
        ) = edit().putString(key(property), value).apply()
    }
```

Ở trên đã implement 1 extention function SharedPreferences, trả về một object của class con ReadWriteProperty ẩn danh cho delegate

Delegate đọc giá trị thuộc tính dưới dạng String, sử dụng hàm khóa được cung cấp cho preference key. Mặc định, khóa là tên thuộc tính, vì vậy  không phải giữ và chuyển bất kỳ hằng số nào. Đồng thời, vẫn có một tùy chọn để truyền custom key,Ta cũng có thể cung cấp giá trị mặc định cho thuộc tính, trong trường hợp đó là không tìm thấy trong preferences

Delegate cũng đảm nhiệm việc lưu trữ giá trị mới trong preferences, sử dụng cùng key chức năng.

Để làm cho ví dụ trên hoạt động, ta cần thêm hai delegate nữa cho 2 kiểu String và Int 

```kotlin
fun SharedPreferences.stringNullable(
    defaultValue: String? = null,
    key: (KProperty<*>) -> String = KProperty<*>::name
): ReadWriteProperty<Any, String?> =
    object : ReadWriteProperty<Any, String?> {
        override fun getValue(
            thisRef: Any,
            property: KProperty<*>
        ) = getString(key(property), defaultValue)

        override fun setValue(
            thisRef: Any,
            property: KProperty<*>,
            value: String?
        ) = edit().putString(key(property), value).apply()
    }

fun SharedPreferences.int(
    defaultValue: Int = 0,
    key: (KProperty<*>) -> String = KProperty<*>::name
): ReadWriteProperty<Any, Int> =
    object : ReadWriteProperty<Any, Int> {
        override fun getValue(
            thisRef: Any,
            property: KProperty<*>
        ) = getInt(key(property), defaultValue)

        override fun setValue(
            thisRef: Any,
            property: KProperty<*>,
            value: Int
        ) = edit().putInt(key(property), value).apply()
    }
```

Giờ ta đã có được class Perference thật sạch

```kotlin
class Settings(context: Context) {

    private val prefs: SharedPreferences =
        PreferenceManager.getDefaultSharedPreferences(context)

    var param1 by prefs.stringNullable()
    var param2 by prefs.int()
    var param3 by prefs.string(
        key = { "KEY_PARAM3" },
        defaultValue = "default"
    )
}
```

## View delegates
* Giả sử ta có 1 custom view, bao gồm 3 textview là title, subtitle và description như ví dụ sau đây 

```xml
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">

    <TextView
        android:id="@+id/tvTitle"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

    <TextView
        android:id="@+id/tvSubtitle"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

    <TextView
        android:id="@+id/tvDescription"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```

Ta muốn có 1 customview cung cấp các function để truy cập vaò sự thay đổi của textview này 

```kotlin
class CustomView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null
) : FrameLayout(context, attrs) {
    var title: String
        get() = tvTitle.text.toString()
        set(value) {
            tvTitle.text = value
        }
    var subtitle: String
        get() = tvSubtitle.text.toString()
        set(value) {
            tvSubtitle.text = value
        }
    var description: String
        get() = tvDescription.text.toString()
        set(value) {
            tvDescription.text = value
        }
    init {
        inflate(context, R.layout.custom_view, this)
    }
}
```

Ở đây ta sử dụng ViewBinding để truy cập vào view trong layout 

Rõ ràng là ta có một đoạn code khá linh động, nhưng ta có thể làm tốt hơn với delegate

Ta viết 1 extention function cho textview trả về delegate với text của nó 

```kotlin 
fun TextView.text(): ReadWriteProperty<Any, String> =
    object : ReadWriteProperty<Any, String> {
        override fun getValue(
            thisRef: Any,
            property: KProperty<*>
        ): String = text.toString()

        override fun setValue(
            thisRef: Any,
            property: KProperty<*>, value: String
        ) {
            text = value
        }
    }
```

Và sử dụng nó trong Customview của chúng ta 

```kotlin
class CustomView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null
) : FrameLayout(context, attrs) {

    init {
        inflate(context, R.layout.custom_view, this)
    }
    
    var title by tvTitle.text()
    var subtitle by tvSubtitle.text()
    var description by tvDescription.text()
}
```

Chắc chắn rằng ta khởi tạo thuộc tính sau khi inflate view trong khối init để view không bị null \

Đây có vẻ không phải là một cải tiến đột phá so với đoạn code ban đầu, nhưng vấn đề là thể hiện sức mạnh của delegate 

Tất nhiên không chỉ giới hạn với TextView, đây là 1 delegate thể hiện cho chế độ xem của view

```kotlin
fun View.isVisible(keepBounds: Boolean): ReadWriteProperty<Any, Boolean> =
    object : ReadWriteProperty<Any, Boolean> {
        override fun getValue(
            thisRef: Any,
            property: KProperty<*>
        ): Boolean = visibility == View.VISIBLE

        override fun setValue(
            thisRef: Any,
            property: KProperty<*>,
            value: Boolean
        ) {
            visibility = when {
                value -> View.VISIBLE
                keepBounds -> View.INVISIBLE
                else -> View.GONE
            }
        }
    }
```
### Tham khảo 
https://proandroiddev.com/kotlin-delegates-in-android-1ab0a715762d