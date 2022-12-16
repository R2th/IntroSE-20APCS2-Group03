## Mở đầu

Reified (thống nhất) có thể hiểu là việc làm cho mọi thứ trở nên cụ thể và thực tế hơn. Việc sở hữu từ khoá này đã giúp Kotlin trở nên lợi hại hơn rất nhiều trong việc phát triển ứng dụng Android. Dưới đây là 3 lợi ích cực kỳ khủng khiếp mà nó mang lại.

## Không cần truyền lại class

Đây là điều rõ ràng và có lẽ là được chia sẻ nhiều nhất bởi các bài viết có nói về công dụng của `reified`. Vì thế tôi sẽ đưa nó vào ngay vị trí đầu tiên.

Hãy tưởng tượng rằng bạn muốn có một hàm thông dụng để khởi động một activity, bạn sẽ phải có một tham số được truyền vào mang kiểu `Class<T>` là kiểu của Activity muốn khởi động.

```Kotlin
// Định nghĩa hàm
fun <T : Activity> Activity.startActivity(
    context: Context,
    class: Class<T>
) {
    startActivity(Intent(context, class))
}

// Gọi hàm
startActivity(context, NewActivity::class.java)
```

### Cách tiếp cận bằng reified

Với `reified`, nó có thể được giản lược thành việc chỉ dùng kiểu generic.

```Kotlin
// Định nghĩa hàm
inline fun <reified T : Activity> Activity.startActivity(
    context: Context
) {
    startActivity(Intent(context, T::class.java))
}

// Gọi hàm
startActivity<NewActivity>(context)
```

Ta không phải truyền thêm một tham số kiểu Java class nữa mà sẽ truyền vào phương thức bằng tên Activity class được chứa trong cặp ngoặc generic `<>`.

## Ép kiểu không xác định an toàn

Trong Kotlin, chúng ta đã biết đến `as?` cho phép ép kiểu đối tượng thành một kiểu nào đó và trả về `null` nếu việc ép kiểu thất bại.

Chúng ta nghĩ rằng mình có thể viết theo cách như dưới đây để lấy kiểu dữ liệu một cách an toàn hoặc là trả về `null`.

```Kotlin
// Định nghĩa hàm
fun <T> Bundle.getDataOrNull(): T? {
    return getSerializable(DATA_KEY) as? T
}

// Gọi hàm
val bundle: Bundle? = Bundle()
bundle?.putSerializable(DATA_KEY, "Testing")
val strData: String? = bundle?.getDataOrNull()
val intData: Int? = bundle?.getDataOrNull() // Lỗi crash
```

Thế nhưng, hàm này sẽ vẫn bị crash như thường nếu như dữ liệu thu được không phải là kiểu được mong đợi.

Vì thế, để lấy dữ liệu một cách an toàn, ta phải chỉ định rõ kiểu được kỳ vọng và kiểm tra xem kiểu trả về có đúng kỳ vọng hay không:
```Kotlin
// Định nghĩa hàm
fun <T> Bundle.getDataOrNull(class: Class<T>): T? {
    val data = getSerializable(DATA_KEY)
    return if (class.isInstance(data)) data as T else null
}

// Gọi hàm
val bundle: Bundle? = Bundle()
bundle?.putSerializable(DATA_KEY, "Testing")
val strData: String? = bundle?.getDataOrNull(String::class.java)
val intData: Int? = bundle?.getDataOrNull(String::class.java) // Null
```

Cách này nhìn không được hay cho lắm, không chỉ bởi cách viết các hàm mà còn bởi ta phải truyền vào tham số `class` nữa.

### Cách tiếp cận bằng reified

Với `reified`, nó có thể được viết ngắn gọn hơn và có thể sử dụng `as?` một cách an toàn.

```Kotlin
// Định nghĩa hàm
private inline fun <reified T> Bundle.getDataOrNull(): T? {
    return getSerializable(DATA_KEY) as? T
}

// Gọi hàm
val bundle: Bundle? = Bundle()
bundle?.putSerializable(DATA_KEY, "Testing")
val strData: String? = bundle?.getDataOrNull()
val intData: Int? = bundle?.getDataOrNull() // Null
```

## Giả lập nhiều kiểu trả về khác nhau với hàm Overload

Giả sử tôi muốn có một hàm mà tính toán từ DP sang Pixel (PX) và sẽ trả về kiểu `Int` hoặc `Float` tuỳ theo giá trị mong muốn.

Sử dụng hàm Overload là ý tưởng đầu tiên tôi nghĩ đến, nó sẽ như sau:
```Kotlin
fun Resources.dpToPx(value: Int): Float {
    return TypedValue.applyDimension(
        TypedValue.COMPLEX_UNIT_DIP,
        value.toFloat(),
        displayMetrics
    )
}
fun Resources.dpToPx(value: Int): Int {
    val floatValue: Float = dpToPx(value)
    return floatValue.toInt()
}
```

Tuy nhiên, hàm này sẽ xuất hiện lỗi khi biên dịch. Lý do là bởi vì, hàm Overload chỉ có thể khác nhau ở số lượng và kiểu của đối số, chứ KHÔNG phải kiểu trả về.

### Hướng tiếp cận bằng reified

Với `reified`, việc này có thể được giả lập.

```Kotlin
inline fun <reified T> Resources.dpToPx(value: Int): T {
    val result = TypedValue.applyDimension(
        TypedValue.COMPLEX_UNIT_DIP,
        value.toFloat(),
        displayMetrics
    )
    return when (T::class) {
        Float::class -> result as T
        Int::class -> result.toInt() as T
        else -> throw IllegalStateException("Type not supported")
    }
}

// Gọi hàm
val intValue: Int = resource.dpToPx(64)
val floatValue: Float = resource.dpToPx(64)
```

## Tổng kết

Từ 3 ví dụ ở trên, rõ ràng `reified` đã khiến cho Kotlin tuyệt vời hơn rất nhiều. Nếu các bạn có các cách khác để sử dụng `reified` mà khác với các trường hợp kể trên, hãy mạnh dạn chia sẻ dưới comment nhé.

Mong rằng bài viết này sẽ có ích với các bạn.

-----

Source: [ProAndroidDev](https://proandroiddev.com/how-reified-type-makes-kotlin-so-much-better-7ae539ed0304)

My Blog: https://phucynwa.wordpress.com/2019/09/05/tu-khoa-reified-trong-kotlin-loi-hai-ra-sao/