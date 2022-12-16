Kotlin thực sự là một ngôn ngữ đẹp với một số tính năng tuyệt vời giúp phát triển ứng dụng trở thành một trải nghiệm thú vị. 
Một trong những tính năng như vậy là delegated properties. Trong bài đăng này, chúng ta sẽ thấy delegates có thể làm cho cuộc sống của chúng ta dễ dàng hơn trong việc phát triển Android.

## Khái niệm cơ bản
Điều đầu tiên, delegate là gì và nó hoạt động như thế nào? 
Nó có vẻ giống như một loại phép thuật nào đó nhưngnó thực sự không phức tạp lắm.
Một delegate chỉ là một class cung cấp giá trị cho một thuộc tính và xử lý các thay đổi của nó. Điều này cho phép chúng ta di chuyển hoặc ủy thác logic getter-setter từ chính thuộc tính sang một lớp riêng biệt, cho phép chúng ta sử dụng lại logic này.

Giả sử chúng ta muốn một tham số thuộc tính String luôn có một chuỗi được cắt xén, tức là với khoảng trắng hàng đầu và dấu kiểm được loại bỏ. Chúng ta có thể làm điều này trong setter của thuộc tính như thế này:

```
class Example {

    var param: String = ""
        set(value) {
            field = value.trim()
        }
}
```

Bây giờ, nếu chúng ta muốn sử dụng lại chức năng này trong một số lớp khác thì sao? Tại đây, nơi các delegate được dùng:

```
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

Vì vậy, một delegate chỉ là một class có hai phương thức: nhận và thiết lập giá trị của một thuộc tính. Để cung cấp thêm cho nó một số thông tin, nó được cung cấp với thuộc tính mà nó làm việc với thông qua Instance của class **KProperty** và một đối tượng có thuộc tính này thông qua **thisRef**. Và đây là cách chúng ta có thể sử dụng delegate mới được tạo này:

```
class Example {

    var param: String by TrimDelegate()
}
```

tương đương với điều này:

```
class Example {

    private val delegate = TrimDelegate()
    var param: String
        get() = delegate.getValue(this, ::param)
        set(value) {
            delegate.setValue(this, ::param, value)
        }
}
```

**:: param** là toán tử trả về một thể hiện của lớp KProperty cho thuộc tính.
Như bạn có thể thấy, không có gì bí ẩn về các delegate Nhưng mặc dù đơn giản, chúng có thể rất hữu ích. Vì vậy, hãy để xem xét một số ví dụ, cụ thể cho Android.

## Fragment arguments
Chúng ta thường cần truyền một số tham số cho một Fragment. Nó thường trông giống như thế này:

```
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

Ta chuyền các tham số khi tạo một Fragment thông qua phương thức tĩnh newInstance của nó. Bên trong nó, chúng ta đặt các tham số vào các đối số Fragment để lấy chúng sau này trong onCreate.
Chúng ta có thể làm cho code đẹp hơn một chút, di chuyển logic liên quan đến đối số sang các thuộc tính Getters và setters:

```
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

Nhưng về cơ bản chúng ta vẫn phải viết cùng một code cho mỗi thuộc tính, đây có thể là một việc vặt nếu chúng ta có nhiều trong số chúng. Bên cạnh đó, nó có vẻ hơi lộn xộn với tất cả các công việc rõ ràng này với các đối số.
Vậy có cách nào để làm đẹp thêm code? 

Câu trả lời là có! Chúng ta sẽ sử dụng các property delegates.
Đầu tiên, các *arguments* của *Fragment* được lưu trữ trong một đối tượng Bundle, có các phương thức riêng biệt để đặt các loại giá trị khác nhau. Vì vậy, hãy tạo ra một hàm mở rộng cố gắng đặt một giá trị của loại tùy ý vào gói và ném một ngoại lệ nếu loại không được hỗ trợ.

```
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

Bây giờ chúng ta đã sẵn sàng để tạo delegate cho nó:

```

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

các Delegate đọc giá trị property từ các fragment argument. Và khi giá trị thuộc tính thay đổi, Delegate sẽ truy xuất các fragment arguments (hoặc tạo và set Bundle mới làm đối số nếu fragment chưa có chúng), sau đó viết giá trị mới cho các argument này, bằng cách sử dụng hàm mở rộng Bundle.put mà chúng ta đã tạo trước.

**ReadWriteProperty** là một interface chung chấp nhận hai loại tham số . Chúng tôi đặt cái đầu tiên là Fragment, làm cho Delegate này chỉ có thể sử dụng được cho các thuộc tính bên trong một fragment. Điều này cho phép chúng ta truy cập vào fragment instance bằng thisRef và quản lý các argument của nó.

Lưu ý rằng chúng tôi sử dụng tên của property làm key cho argument, để chúng tôi không phải lưu trữ các khóa dưới dạng hằng số nữa.
Tham số loại thứ hai của ReadWriteProperty xác định loại giá trị nào mà thuộc tính có thể có. Chúng tôi set loại non-nullable và ném ngoại lệ nếu không thể đọc được giá trị. 
Điều này cho phép chúng ta có các non-nullable property trong fragment, tránh cho chúng ta khỏi các kiểm tra null khó chịu.
Nhưng đôi khi chúng ta cần một property là null. Vì vậy, hãy tạo một Delegate khác, nếu không tìm thấy argument, thì không ném ra một ngoại lệ, nhưng trả về null thay vào đó:

```
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

Tiếp theo, hãy thực hiện một số function cho thuận tiện (không cần thiết, chỉ hoàn toàn cho mục đích thẩm mỹ):

```

fun <T : Any> argument(): ReadWriteProperty<Fragment, T> =
    FragmentArgumentDelegate()
fun <T : Any> argumentNullable(): ReadWriteProperty<Fragment, T?> =
    FragmentNullableArgumentDelegate()
```

Cuối cùng, hãy đưa các delegate vào sử dụng:

```
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

Trông khá gọn gàng, phải không?

Còn tiếp