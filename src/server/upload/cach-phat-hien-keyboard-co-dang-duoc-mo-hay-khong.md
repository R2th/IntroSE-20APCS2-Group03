### Bạn có đang mở không?
Android không cung cấp cách trực tiếp để xác định xem bàn phím có đang mở hay không, vì vậy chúng ta phải có một chút sáng tạo.
######
`View` có một hàm tiện dụng gọi là `getWindowVisibleDisplayFrame` từ đó chúng ta có thể truy xuất một hình chữ nhật chứa phần khung View hiển thị cho người dùng. Điều này tính đến các trang trí hệ thống có thể được đặt trên đầu của View (chẳng hạn như bàn phím).

```
val visibleBounds = Rect()
myView.getWindowVisibleDisplayFrame(visibleBounds)
```

Từ hình chữ nhật có thể nhìn thấy, chúng ta có thể nhận được chiều cao có thể nhìn thấy. Bằng cách so sánh chiều cao có thể nhìn thấy với chiều cao thực tế của View, chúng ta có thể xác định xem bàn phím có thể đã được vẽ trên đỉnh của View hay chưa. (Điều này cũng có thể được sử dụng để tìm ra bán phím cao bao nhiêu).
```
val heightDiff = myView.height - visibleBounds.height()
val isOpen = heightDiff > 0
```
Vì đây là một giải pháp sáng tạo, có khả năng dương tính giả bằng cách sử dụng so sánh trực tiếp. Vì lý do đó, nó rất tốt để thêm một margin lỗi.
```
val marginOfError = Math.round(this.convertDpToPx(50F))
heightDiff > marginOfError
```
Một điều cuối cùng, sẽ thật tuyệt nếu đoạn mã này có thể tái sử dụng trong bất kỳ activity nào. Làm thế nào chúng ta có thể làm điều đó?
######
Nếu bạn đã từng [inspected a layout](https://developer.android.com/studio/debug/layout-inspector), bạn sẽ nhận thấy rằng hướng tới root của mọi activity, có một ViewGroup với id của android.R.id.content. Bằng cách sử dụng View này, chúng ta có thể trừu tượng logic kiểm tra bàn phím của mình thành một extension function-resuable bởi bất kỳ activity nào.
```
// Add these extension functions to an empty kotlin file
fun Activity.getRootView(): View {
    return findViewById<View>(android.R.id.content)
}
fun Context.convertDpToPx(dp: Float): Float {
    return TypedValue.applyDimension(
            TypedValue.COMPLEX_UNIT_DIP, 
            dp, 
            this.resources.displayMetrics
    )
}
fun Activity.isKeyboardOpen(): Boolean {
    val visibleBounds = Rect()
    this.getRootView().getWindowVisibleDisplayFrame(visibleBounds)
    val heightDiff = getRootView().height - visibleBounds.height()
    val marginOfError = Math.round(this.convertDpToPx(50F))
    return heightDiff > marginOfError
}

fun Activity.isKeyboardClosed(): Boolean {
    return !this.isKeyboardOpen()
}
```

Tiếp tục và thử những điều này trong bất kỳ activity
######
Thật không may, nếu bạn sử dụng `android:windowSoftInputMode="adjustResize"` thì các phương thức này sẽ không được sử dụng cho bạn. Phương pháp này dựa vào View bên dưới giữ nguyên chiều cao của bàn phím được vẽ - adjustResize làm cho các View bên dưới thay đổi kích thước.
######
Vì vậy, bây giờ chúng ta (hầu hết) biết cách kiểm tra bàn phím đang mở hay đóng tại một thời điểm cụ thể. Nhưng làm thế nào nếu chúng ta muốn lắng nghe thời điểm chính xác khi bàn phím mở hay đóng? Một lần nữa, chúng ta phải sáng tạo.
###

### Lắng nghe Keyboard
######
![](https://images.viblo.asia/ecfad2a8-c840-4f34-8fb0-7b3069e470b7.png)
######
Sâu bên trong android có một class `ViewTreeObserver.OnGlobalLayoutListener`, cái mà có tài liệu Java khá khó hiểu về nó:
######
Định nghĩa giao diện cho một callback sẽ được gọi thi trạng thái global layout hoặc khả năng hiển thị của các `views` bên trong` view tree` thay đổi.
######
Tất cả những gì chúng ta quan tâm là giao diện này nhận được một callback tại thời điểm keyboard mở hoặc đóng (cộng với mỗi khi trạng thái toàn cục thay đổi, bất kể điều đó có nghĩa là gì). Trong callback này, chúng ta có thể sử dụng các chức năng mở rộng trước đây của mình để kiểm tra xem bàn phím có đang mở hay đóng.

```
val listener = object : ViewTreeObserver.OnGlobalLayoutListener {
    // Keep a reference to the last state of the keyboard
    private var lastState: Boolean = activity.isKeyboardOpen()
   /** 
     * Something in the layout has changed
     * so check if the keyboard is open or closed
     * and if the keyboard state has changed
     * save the new state and invoke the callback
     */  
    override fun onGlobalLayout() {
        val isOpen = activity.isKeyboardOpen()
        if (isOpen == lastState) {
            return
        } else {
            dispatchKeyboardEvent(isOpen)
            lastState = isOpen
        }
    }
}
```
Tất nhiên, global layout listener cần đăng ký và onResume là nơi tốt nhất.
```
override fun onResume() {
    super.onResume()
    val view = getRootView()
    view.viewTreeObserver.addOnGlobalLayoutListener(listener)
}
```
Và chúng ta cũng cần unregister listener.

```
override fun onPause() {
    super.onPause()
    val view = getRootView()
    view.viewTreeObserver.removeOnGlobalLayoutListener(listener)
}
```
Đây là một số lượng khá lớn code, mà không dựa vào bất kỳ màn hình cụ thể nào. Sẽ thật tuyệt nếu chúng ta có thể tái sử dụng nó phải không?
######
Một component, có thể được sử dụng bởi bất kỳ activity nào trong ứng dụng của chúng ta. Hoặc thậm chí được chuyển vào một dự án hoàn toàn mới. Trong khi chúng tôi sử dụng nó, hãy cho phép vòng đời component nhận biết, do đó, không cần phải unregister listener của chúng ta.
```
// Add android lifecycle libraries
"androidx.lifecycle:lifecycle-common:$vLifecycleVersion"
"androidx.lifecycle:lifecycle-extensions:$vLifecycleVersion"
kapt "androidx.lifecycle:lifecycle-compiler:$vLifecycleVersion"
class KeyboardEventListener(
        private val activity: AppCompatActivity,
        private val callback: (isOpen: Boolean) -> Unit
) : LifecycleObserver {

    private val listener = object : ViewTreeObserver.OnGlobalLayoutListener {
        private var lastState: Boolean = activity.isKeyboardOpen()

        override fun onGlobalLayout() {
            val isOpen = activity.isKeyboardOpen()
            if (isOpen == lastState) {
                return
            } else {
                dispatchKeyboardEvent(isOpen)
                lastState = isOpen
            }
        }
    }

    init {
        // Dispatch the current state of the keyboard
        dispatchKeyboardEvent(activity.isKeyboardOpen())
        // Make the component lifecycle aware
        activity.lifecycle.addObserver(this)
        registerKeyboardListener()
    }

    private fun registerKeyboardListener() {
        activity.getRootView().viewTreeObserver.addOnGlobalLayoutListener(listener)
    }

    private fun dispatchKeyboardEvent(isOpen: Boolean) {
        when {
            isOpen  -> callback(true)
            !isOpen -> callback(false)
        }
    }

    @OnLifecycleEvent(value = Lifecycle.Event.ON_PAUSE)
    @CallSuper
    fun onLifecyclePause() {
        unregisterKeyboardListener()
    }

    private fun unregisterKeyboardListener() {
        activity.getRootView().viewTreeObserver.removeOnGlobalLayoutListener(listener)
    }
}
```
Và để sử dụng chỉ cần thêm dòng này vào bất kỳ activity nào.

```
override fun onResume() {
    super.onResume()
    KeyboardEventListener(this) { isOpen -> // handle event }
}
```
### Một lời cảnh báo
Vì đây là một giải pháp sáng tạo, có khả năng giải pháp này có thể bị phá vỡ trong cách phiên bản Android trong tương lai. Ngay cả trong các phiên bản hiện tại của Android, sẽ có rất nhiều thiết lập dự án khiến giải pháp này trở nên vô dụng. Hy vọng rằng, một ngày nào đó, google làm cho nhiều developer hài lòng và phơi bày hành vi này một cách tự nhiên.
### Làm thế nào để bạn giải quyết vấn đề này?
Biết khi nào keyboard được mở hay đóng đã là một vấn đề khiến cho các Android Developer bị ảnh hưởng kể từ đầu thời đại. Vì vậy, phải có vô số cách giải quyết, nếu có một phương pháp mà bạn thích nói riêng, tôi rất thích xem cách nó hoạt động, hãy comment bên dưới!
### [Github](https://github.com/enyciaa/AndroidKeyboardStateChecker/tree/master)

Tham khảo: [Medium](https://proandroiddev.com/how-to-detect-if-the-android-keyboard-is-open-269b255a90f5)