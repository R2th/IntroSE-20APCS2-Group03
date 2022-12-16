Như [phần 1](https://viblo.asia/p/kotlin-delegate-trong-android-phan-1-oOVlYLxBZ8W) mình đã giải thích cho các bạn về cấu trúc bên trong của Delegate như thế nào.
Hôm nay mình sẽ cho các bạn ví dụ về những trường hợp sử dụng Delegate và sự tiện lợi của nó như thế nào nhé :)
Chúng ta cùng đi qua ví dụ đầu tiên nhé : 

### **Fragment arguments**

Đôi khi chúng cần phải truyền một số tham số qua một số fragment khác . Chúng ta thường làm như sau :

```swift
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

Vì thế chúng ta truyền tham số không chúng ta tạo Fragment  thông qua phương thức tĩnh **newInstance**  Trong đó chúng ta đặt tham số vào trong arguments của Fragment và nhận lại nó trong **onCreate**

Chúng ta có thể tạo cho code của chúng ta rõ ràng hơn một chút nữa và đổi logic của chúng ta thành dạng getter và setter thì nó sẽ như thế nào :

```swift
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

Nhưng chúng ta vẫn phải viết code tương tự nhau cho mỗi thuộc tính nó làm cho code của chúng ta lại thêm chút lộn xộn và dài dòng hơn. Vậy chúng ta có cách nào cho code đẹp hơn không nhỉ ? với mình thì mình còn có 1 cách khác nữa nè. Như các bạn đã biết tiêu đề bài này là Delegate vậy chúng ta cùng áp dụng xem thế nào:

Đầu tiên  chúng ta phải chuẩn bị sẵn trước một số thứ . Argument của Fragment được lưu bên trong **Bundle** Chúng ta chia nhỏ các kiểu khác  nhau. Cùng tạo phần mở rộng của function này tới bundle và đừng quên thêm exception cho chúng nhé.

```swift
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

Bây giờ chúng ta Delegate tạo như sau :

```swift
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

Delegate đọc giá trị thuộc tính từ fragment arguments. Và khi giá trị của thuộc tính bị thay đổi, Delegate thay đổi fragment arguments (hoặc tạo hay làm mới bundle như là arguments nếu fragment không có chúng.) và sau đó thiết lập giá trị mới cho những arguments đó sử dụng `Bundle.put` đã được tạo trước đó.

`ReadWriteProperty` là một interface chung. có 2 đối số . Chúng ta thiết lập đối số đầu tiên là `Fragment` . để đảm bảo rằng delegate này chỉ sử dụng thuộc tính bên trong fragment và chúng ta có thể truy cập bằng cách `thisRef` .

Đối số thứ 2 là xác định kiểu của giá trị mà chúng ta có thể có. Chúng ta có thể để non-nullable thì hàm sẽ trả về exception. Nếu giá trị không thuộc trên những kiểu mà chúng ta đã truyền vào phía trên. Mà đôi khi chúng ta cũng có thể trả về null mà không throw ra exception như sau :

```swift
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

Sau khi chúng t áp dụng Delegate chúng ta sẽ thấy một sự khác biệt như sau : 

```swift
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

Nhiều trường hợp chúng ta cần lưu một số giá trị vào bộ nhớ và truy xuất chúng 1 cách nhanh chóng cho lần mở app kế tiếp.  Ví dụ như chúng ta lưu một số user , chúng ta sử dụng SharedPreferences  và nhúng key-value cho chúng.

```scala
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

Ở đây SharedPreferences cung cấp cho chúng ta các phương thức get và set giá trị cho tham số. Chúng ta cũng phải tạo những param khác nhau với những key khác nhau. Và chúng ta cũng thấy sự lặp lại code khác nhiều, gây cho code của chúng ta có chút cồng kềnh  và nhiều. Chúng ta cũng thử áp dụng Delegate xem thế nào và có tiện dụng hơn không nhỉ ?

```cpp
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

Ở code phía trên chúng ta đã tạo SharedPreferences extension .

Delegate đọc giá trị kiểu String từ preferences và sử dụng `key ` để cung cấp cho key của SharedPreferences. Theo mặc định thì, key sẽ là thuộc tính key name vì thế chúng ta không cần phải truyền bất kì một giá trị mặc định nào . chúng ta cùng xem lại khi code chúng ta khi sử dụng delegate đã gọn được như thế nào nhé :

```javascript
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

Sau khi chúng ta sử dụng Delegate code của chúng ta đã gọn hơn rất là nhiều . Chúng ta lập đi lập lại với chỉ 1 dòng code duy nhất. :)

### View delegates

Giả sử chúng ta có custom view, bao gồm có 3 text fields - 1 title, subtitle và description với layout đơn giản :

```html
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

và chúng ta muốn Customview để truy xuất và đổi text cho fields :

```swift
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

Chúng ta cũng viết tương tự như trên với Delegate for TextView extension :

```markdown
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

Và sử dụng nó trong CustomTextView:

```markdown
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

Để đảm bảo rằng khỏi tạo thuộc tính sau khi View được init như thế View sẽ không có bị null

### Kết luận 

Như trên mình đang có những ví dụ cho các bạn xem , Mình hy vọng nó có hữu ích cho các bạn trong việc phát triển ứng dụng android một cách ngắn gọn hơn.  Tiện bài này mình cũng chứng minh cho các bạn thấy về sức mạnh của Delegate như thế nào . Cám ơn các bạn đã đọc bài của mình . Có sai sót gì bạn có thể comment  bên dưới để  mình cải thiện nhiều hơn nữa

Tài liệu tham khảo : https://proandroiddev.com/kotlin-delegates-in-android-1ab0a715762d