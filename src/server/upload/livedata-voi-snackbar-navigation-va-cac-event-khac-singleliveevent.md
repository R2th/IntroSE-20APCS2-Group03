Một cách giao tiếp thuận tiện giữa view (Fragment hoặc Activity) với ViewModel là thông qua việc sử dụng LiveData để lắng nghe. View subcribes các thay đổi trong LiveData và phản hồi lại, điều này giúp cho data được cập nhật liên tục trên màn hình.

![](https://images.viblo.asia/ecd6ce47-0928-4dfd-b9a5-13f41501851c.png)

Tuy nhiên, có một số dữ liệu ta chỉ cần sử dụng một lần, giống như một message trên Snackbar, một sự kiện điều hướng hoặc một dialog.

![](https://images.viblo.asia/265dd214-b0bd-4bbc-8596-064e3d8e693f.png)

Bài viết này sẽ trình bày một số lỗi thường gặp và phương pháp được khuyên nên dùng.

# Bad: Using LiveData for events

Trong ViewModel:

```
// Don't use this for events
class ListViewModel : ViewModel {
    private val _navigateToDetails = MutableLiveData<Boolean>()

    val navigateToDetails : LiveData<Boolean>
        get() = _navigateToDetails


    fun userClicksOnButton() {
        _navigateToDetails.value = true
    }
}
```

Trong View (activity hoặc fragment):

```
myViewModel.navigateToDetails.observe(this, Observer {
    if (it) startActivity(DetailsActivity...)
})
```

Vấn đề với cách này là giá trị của `_navigateToDetails` vẫn đúng trong một thời gian dài và không có khả năng quay trở lại màn hình đầu tiên.

1. User ấn vào button để start một Activity con.
2. User ấn vào button Back, quay trở lại Activity cha.
3. Các observers hoạt động trở lại, sau khi bị inactive khi Activity được cho vào back stack.
4. Giá trị vẫn trả về true nên Activity  con được start lại không chính xác.

Một giải pháp cho việc này là set false ngay lập tức:

```
fun userClicksOnButton() {
    _navigateToDetails.value = true
    _navigateToDetails.value = false // Don't do this
}
```

Tuy nhiên, một điều quan trọng bạn cần nhớ là LiveData giữ giá trị nhưng không đảm bảo phát ra mọi giá trị mà nó nhận được. 
Ví dụ : một giá trị có thể được set khi không có observers hoạt động, vì vậy giá trị mới sẽ chỉ thay thế cho giá trị đó. 

Ngoài ra, việc setting các giá trị từ các luồng khác nhau dẫn đến `race condition` - tình huống xảy ra khi nhiều thread cùng truy cập và cùng lúc muốn thay đổi dữ liệu, vì thuật toán chuyển đổi việc thực thi giữa các thread có thể xảy ra bất cứ lúc nào, nên không thể biết được thứ tự của các thread truy cập và thay đổi dữ liệu đó, dẫn đến giá trị của data sẽ không như mong muốn.

Không thể chắc chắn được giá trị đã được reset lại sau khi xảy ra các navigation event.

# Better: Using LiveData for events, resetting event values in observer
Mục đích là bạn thêm một cách để indicate từ View rằng bạn đã xử lý các event và các giá trị chắc chắn sẽ được reset lại.
Với mỗi thay đổi nhỏ đến observers
Trên View:

```
listViewModel.navigateToDetails.observe(this, Observer {
    if (it) {
        myViewModel.navigateToDetailsHandled()
        startActivity(DetailsActivity...)
    }
})
```

Trên ViewModel:

```
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

Vấn đề với phương pháp này là sinh ra các boilerplate (một method với trong viewModel cho mỗi event) và dễ xảy ra lỗi. Quá dễ dàng để quên gọi đến viewModel từ observer.

# OK: Use SingleLiveEvent

Class SingleLiveEvent được tạo ra như một LiveData chỉ send và update một lần.

Trong ViewModel

```
class ListViewModel : ViewModel {
    private val _navigateToDetails = SingleLiveEvent<Any>()

    val navigateToDetails : LiveData<Any>
        get() = _navigateToDetails


    fun userClicksOnButton() {
        _navigateToDetails.call()
    }
}
```

Trong View

```
myViewModel.navigateToDetails.observe(this, Observer {
    startActivity(DetailsActivity...)
})
```

Vấn đề với SingleLiveEvent là nó bị hạn chế với một observer. Nếu bạn vô ý thêm nhiều hơn một, chỉ một cái được gọi và không có bảo đảm nó là cái nào.

![](https://images.viblo.asia/4972af8e-8d13-440b-9423-09c016f08f11.png)

# Recommended: Use an Event wrapper
Với phương pháp này, bạn quản lý một các rõ ràng cho dù sự kiện được xử lý hay không, giảm các lỗi có thể xảy ra.

Định nghĩa một Event
```
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

Trong ViewModel

```
class ListViewModel : ViewModel {
    private val _navigateToDetails = MutableLiveData<Event<String>>()

    val navigateToDetails : LiveData<Event<String>>
        get() = _navigateToDetails


    fun userClicksOnButton(itemId: String) {
        _navigateToDetails.value = Event(itemId)  // Trigger the event by setting a new Event as a new value
    }
}
```

Trong View:

```
myViewModel.navigateToDetails.observe(this, Observer {
    it.getContentIfNotHandled()?.let { // Only proceed if the event has never been handled
        startActivity(DetailsActivity...)
    }
})
```

Ưu điểm của phương pháp này là người dùng cần xác định rõ ý định sử dụng bằng các method `getContentIfNotHandled()` hoặc `peekContent()`.
Phương pháp này mô hình hóa các event như là một phần của state: Chúng đơn giản là các message đã được dùng hoặc là không.

![](https://images.viblo.asia/b7ebbce5-ebd3-46b8-870c-179ff8c62efb.png)

# In Summary: 
Bạn nên sử dụng Event wrapper trong LiveData và tùy chỉnh nó theo nhu cầu của bạn và nhớ là sử dụng EventObserver để xóa các code lặp nếu bạn có nhiều events.

Bài viết được dịch từ nguồn :

https://medium.com/androiddevelopers/livedata-with-snackbar-navigation-and-other-events-the-singleliveevent-case-ac2622673150