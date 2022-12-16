Hiện nay Kotlin đang rất phổ biến đặc biệt trong mảng lập trình Android, hay nói cách khác nó là một ngôn ngữ được lựa chọn ưu thế hơn để phát triển một ứng dụng mới trên Android. Đôi khi chúng ta thấy thích một điều không phải vì nó "cao siêu" hơn ngôn ngữ cũ mà đơn giản là vì nó MỚI. Cũng giống như ta đã yêu một người sau một thời gian rồi đến người thứ 2, thứ 3 và đến thứ 4, thứ 5 sau đó lại trở về ở bên người đầu tiên lúc này ta sẽ thấy cảm giác nó giống như lúc lần đầu tiên yêu người thứ 5 vậy. :laughing: Quay trở lại về chủ đề Kotlin, sau quá trình áp dụng nó mình thấy nêu ra 5 điểm thú vị khi sử dụng. Tất nhiên sẽ có nhiều hơn tuỳ vào mỗi người!

### 1. Tên import

`import` dùng cho trình biên dịch có thể hiểu được việc khai báo những class của bạn đã đặt tên không đúng chuẩn.

Ví dụ: trường hợp dưới đây sẽ bị conflict
```
import android.view.View // Conflict

class UserInfoFragment : Fragment(), com.roma.info.ui.View { // Conflict

    override fun onCreateView(inflater: LayoutInflater, 
                              container: ViewGroup?, 
                              state: Bundle?): View = // Conflict
            inflater.inflate(user_info_fragment,
                             container,
                             false)
}

interface View // Conflict
```

Cách để giải quyết việc import như này là:

```
import android.view.View as AndroidView
class UserInfoFragment : Fragment(), View {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        state: Bundle?
    ): AndroidView =
        inflater.inflate(
            user_info_fragment,
            container,
            false
        )
}
```

### 2. Sử dụng companion object

Trong Android bạn đã quen sử dụng static như này :

```
//Java code
public class EventManager {

    private static EventManager instance;

    private EventManager() {

    }

    public static EventManager getManagerInstance() {
        if (instance == null) {
            instance = new EventManager();
        }

        return instance;
    }

    public boolean sendEvent(String eventName) {
        Log.d("Event Sent", eventName);
        return true;
    }
}
```

Sang Kotlin khi khai báo biến và hàm static bằng cách đặt trong block `companion object{...}` Và chúng ta có như sau

```
//Kotlin code
class EventManager {

    private constructor() {
    }

    companion object {
        private lateinit var instance: EventManager

        val managerInstance: EventManager
            get() {
                if (instance == null) {
                    instance = EventManager()
                }

                return instance
            }
    }

    fun sendEvent(eventName: String): Boolean {
        Log.d("Event Sent", eventName)
        return true;
    }
}
```

Sử dụng đơn giản chỉ cần : `EventManager.FirebaseManager.managerInstance.sendEvent("Some event")`

### 3. Compose functions

Trước đây chúng ta hay dùng tham chiếu các hàm với nhau. Nghĩa là bạn chạy 1 hàm được kết quả gọi tiếp hàm khác để đến kết quả mong muốn.
Ví dụ: Với một danh sách các giá trị hàng hoá, ta sẽ kiểm tra nó sau khi qua VAT -> giảm giá hiện thời -> Làm tròn -> Kết quả giá cần thanh toán.

*Code:*

```
val prices = listOf(21.8, 232.5, 231.3)
prices.map(::taxed)
      .map(::discounted)
      .map(::rounded)

fun taxed(value: Double): Double = value * 1.4
fun discounted(value: Double): Double = value * 0.9
fun rounded(value: Double): Double = Math.round(value).toDouble()

```

Khi sử dụng  `compose functions` ta có:

```
val prices = listOf(21.8, 232.5, 231.3)
    val taxedDiscountedRounded = compose(::taxed, ::discounted, ::rounded)
    var pricesFinal = prices.map(taxedDiscountedRounded)

    fun <A, B> compose(f: (A) -> A,
                       g: (A) -> A,
                       h: (A) -> B): (A) -> B = { x -> h(g(f(x))) }

    fun taxed(value: Double): Double = value * 1.4
    fun discounted(value: Double): Double = value * 0.9
    fun rounded(value: Double): Double = Math.round(value).toDouble()
```

Với cách dùng này thì công đoạn xử lý sẽ rõ ràng hơn và tốc độ xử lý nhanh hơn.

### 4. Generated class

Extension functions một tính năng của Kotlin, nhưng đôi lúc việc dùng kết hợp với Java lại khiến bạn khó chịu. Code không được đẹp mà chức năng chẳng khác gì 1 static class

Ví dụ:
`RouteController.java`
```
public class RouteController {

    public RouteData getRouteData() {
        RouteData name = null;

        Checking.ifNull(name, new Function1<Object, Unit>() {
            @Override
            public Unit invoke(Object o) {
                return null;
            }
        });
        return name;
    }
}
```

File Kotlin

`Checking.kt`

```
class Checking {
    inline fun <T> T?.ifNull(function: (T?) -> Unit) {
        if (this == null) function(this)
    }
}
```

Ok, bây giờ sẽ sửa lại file `Checking.kt` như sau, vì Kotlin generates class Checking với phương thức static để dùng như trong java rồi.

```
@file:JvmName("Nullcheck")

package com.interest.roma.ui

inline fun <T> T?.ifNull(function: (T?) -> Unit) {
    if (this == null) function(this)
}
```

Và bây giờ bên code java cũng sửa thành :

```
 Nullcheck.ifNull(name, new Function1<Object, Unit>() {
        @Override
        public Unit invoke(Object o) {
            return null;
        }
    });
```

### 5. Vetoable "gán giá trị được cấp phép nếu không sẽ không nhận" :hugs:

Về nghĩa của "Vetoable" thì các bạn có thể đoán được phần nào, qua đề mục trên thì các bạn cũng có thể biết điều mình định nới đến rồi :D
Kotlin có sự thú vị là khi ta gán một giá trị mới cho một biến đã được định nghĩa `vetoable` thì nó phải thoả mãn một điều kiện, nếu không nó sẽ từ chối việc gán này.

Docs:
> Returns a property delegate for a read/write property that calls a specified callback function when changed, allowing the callback to veto the modification.
> 

Ví dụ:

```
var price: Double by Delegates.vetoable(0.0) { prop, old, new ->
    validate(new)
}

fun validate(price: Double) : Boolean {
    // Validation checks
}
```

Bạn kiểm tra giá mới được gán, nếu thấy có điều bất ổn thì sẽ không chấp nhận giá này. 

### Tổng kết

Chúng ta đã đi qua những điều thú vị trong Kotlin, bài viết của mình kết thúc ở đây. Nếu có thêm những điều mới gì, hãy chia sẻ dưới comment bạn nhé!