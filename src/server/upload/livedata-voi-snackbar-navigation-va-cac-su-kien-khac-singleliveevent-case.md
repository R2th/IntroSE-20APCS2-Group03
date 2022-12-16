Một cách tiện lợi cho một view (activity hay fragment) để giao tiếp với ViewModel là ta sử dụng LiveData lắng nghe. View đăng kí sự thay đổi trong LiveData và phản ứng lại chúng. Công việc này hoạt động tốt cho dữ liệu được hiển thị trên màn hình liên tục .

![](https://images.viblo.asia/e2d1d321-ad91-4041-b1a2-4f5684c9edde.png)

Tuy nhiên một số dữ liệu chỉ nên được sử dụng một lần, ví dụ như Snackbar message, hay navigation event hay hiển thị dialog

![](https://images.viblo.asia/b0e8c23d-6a94-4611-90d0-44c682007d20.png)

Thay vì cố gắng giải quyết vấn đề này bằng các thư viện hay các extention cho Architecture Component, ta nên tìm hiểu bản chất của chúng. Tôi khuyên bạn nên coi các event như một phần của state. Trong bài viết này, mình sẽ chỉ ra những sai lầm phổ biến và cách làm được khuyến khích

### ❌ Bad: 1. Using LiveData for events
- Cách này giữ một Snackbar message hay một sự kiện điều hướng trong LiveData. Mặc dù về nguyên tắc có vẻ như một đối tượng LiveData thông thường có thể sử dụng trong việc này như thực sự nó có một số vấn đề 

```Kotlin 
/ Don't use this for events
class ListViewModel : ViewModel {
    private val _navigateToDetails = MutableLiveData<Boolean>()

    val navigateToDetails : LiveData<Boolean>
        get() = _navigateToDetails


    fun userClicksOnButton() {
        _navigateToDetails.value = true
    }
}
```

Ở view 
```Kotlin 
myViewModel.navigateToDetails.observe(this, Observer {
    if (it) startActivity(DetailsActivity...)
})
```
Vấn đề ở đây là khi làm theo cách này giá trị trong _navigationToDetails luôn luôn là true trong một thời gian dài và nó không thể quay lại màn hình đầu tiên. Cụ thể là

1. Khi user click vào button để mở Detail Activity
2. User click back để quay lại màn hình ban đầu
3. Lúc này các observers bắt đầu hoạt động trở lại, sau đó không hoạt động khi activity ở backstack
4. Giá trị vẫn là true khi Detail Actitity được start không chính xác

Solution của vấn đề này là là kích hoạt điều hướng ngay từ ViewModel sau đó ngay lập tức set lại cờ này bằng false

```kotlin
fun userClicksOnButton() {
    _navigateToDetails.value = true
    _navigateToDetails.value = false // Don't do this
}
```
Tuy nhiên điều quan trọng bạn nên nhớ rằng LiveData giữ giá trị nhưng không đảm bảo phát ra mọi giá trị nhận được. Ví dụ, khi giá trị có thể được set lại khi không có observer nào hoạt động, vì vậy khi một sẽ có một cái mới sẽ thay thế nó. Mặc dù, việc setting giá trị từ một luồng khác nhau có thể dẫn đến các điều kiện được tạo ra một lần gọi từ observers 
Nhưng vấn đề chính ở cách làm này là  nó thật sự khó hiểu và xấu xí. Làm cách nào để chúng ta chắc rằng giá trị được set lại khi quá trình điều hướng hoàn thành?

### ❌ Better: 2. Using LiveData for events, resetting event values in observer
- Với phương pháp này bạn có thêm một cách để biểu thị từ View là bạn đã xử lý sự kiện và nó đã được reset 
- Với một chút thay đổi ở observers, ta có một giải pháp khác cho việc này 
```kotlin
listViewModel.navigateToDetails.observe(this, Observer {
    if (it) {
        myViewModel.navigateToDetailsHandled()
        startActivity(DetailsActivity...)
    }
})
```
```kotlin 
class ListViewModel : ViewModel {
    private val _navigateToDetails = MutableLiveData<Boolean>()

    val navigateToDetails : LiveData<Boolean>
        get() = _navigateToDetails


    fun userClicksOnButton() {
        _navigateToDetails.value = true
    }

    fun navigateToDetailsHandled() {
        _navigateToDetails.value = false
    }
}
```
### Issues 
- Vấn đề với cách tiếp cận này là có một số mẫu nồi hơi (một phương thức mới trong ViewModel cho mỗi sự kiện) và nó dễ bị lỗi. Rất dễ để quên gọi đến ViewModel từ observer.


### ✔️ OK: Use SingleLiveEvent
SingleLiveEvent Class được tạo ra cho như một giải pháp cho một kịch bản cụ thể. Nó là một live data chỉ update 1 lần 

```Kotlin
class ListViewModel : ViewModel {
    private val _navigateToDetails = SingleLiveEvent<Any>()

    val navigateToDetails : LiveData<Any>
        get() = _navigateToDetails


    fun userClicksOnButton() {
        _navigateToDetails.call()
    }
}
```

```Kotlin 
myViewModel.navigateToDetails.observe(this, Observer {
    startActivity(DetailsActivity...)
})
```

### Issues
- Vấn đề với SingleLiveEvent là nó giới hjan ở observer. Nếu bạn vô tình add nhiều hơn 1 observer nó chỉ có một cái được gọi ở đó, không đảm bảo nó là cái nào 

![](https://images.viblo.asia/e8dc6a1c-ea1b-461f-ae20-40821b394f69.png)

### ✔️ Recommended: Use an Event wrapper

Trong phương pháp này, bạn quản lý rõ ràng liệu sự kiện đã được xử lý hay chưa, giảm thiểu tối đa lỗi 

Event.kt

```kotlin 
/**
 * Used as a wrapper for data that is exposed via a LiveData that represents an event.
 */
open class Event<out T>(private val content: T) {

    var hasBeenHandled = false
        private set // Allow external read but not write

    /**
     * Returns the content and prevents its use again.
     */
    fun getContentIfNotHandled(): T? {
        return if (hasBeenHandled) {
            null
        } else {
            hasBeenHandled = true
            content
        }
    }

    /**
     * Returns the content, even if it's already been handled.
     */
    fun peekContent(): T = content
}
```

```kotlin 
class ListViewModel : ViewModel {
    private val _navigateToDetails = MutableLiveData<Event<String>>()

    val navigateToDetails : LiveData<Event<String>>
        get() = _navigateToDetails


    fun userClicksOnButton(itemId: String) {
        _navigateToDetails.value = Event(itemId)  // Trigger the event by setting a new Event as a new value
    }
}
```

```kotlin 
myViewModel.navigateToDetails.observe(this, Observer {
    it.getContentIfNotHandled()?.let { // Only proceed if the event has never been handled
        startActivity(DetailsActivity...)
    }
})
```

Ưu điểm của phương pháp này là user chỉ định ý định bằng cách sử dụng method getContentIfNotHandled() hoặc peekContent().  Method này mô hình hóa các event như một phần của trạng thái. Lúc này nó chỉ đơn giản là một thông điệp được xử lý hay chưa 

![](https://images.viblo.asia/8a68c2e1-8151-4206-beb7-42a46afdbe0d.png)

Bonus thêm. Bạn có thể sử dụng EventObserver này để xóa một số mã lặp đi lặp lại nếu bạn kết thúc có nhiều event

```kotlin 
class EventObserver<T>(private val onEventUnhandledContent: (T) -> Unit) : Observer<Event<T>> {
    override fun onChanged(event: Event<T>?) {
        event?.getContentIfNotHandled()?.let { value ->
            onEventUnhandledContent(value)
        }
    }
}
```


### Refer
- https://medium.com/androiddevelopers/livedata-with-snackbar-navigation-and-other-events-the-singleliveevent-case-ac2622673150