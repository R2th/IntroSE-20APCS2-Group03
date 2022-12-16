## Introduction
Một cách thức quen thuộc đối với một view(Activity hoặc Fragment) nhằm giao tiếp với một ViewModel đó là sử dụng **LiveData** observebles. View đăng kí sự thay đổi trong LiveData và phản ứng lại với chúng. Việc làm này là tốt đối với dữ liệu cái được hiển thị trong một screen một cách liên tục.
<br />
<div align="center"><img src="https://images.viblo.asia/8d4c13db-67f8-453f-b5aa-0e78ebda74ef.png" /></div>
<br />

Tuy nhiên, một vài dữ liệu có thể chỉ được sử dụng một lần, như một thông điệp Snackbar hoặc một dialog trigger.

<br />
<div align="center"><img src="https://images.viblo.asia/da36e1c4-c644-4f23-8d54-ba814db0355a.png" /></div>
<br />

Thay vì cố gắng giải quyết vấn đề này bằng các thư viện hoặc mở rộng của Architecture Components, nó phải đối mặt với một vấn đề thiết kế. Chúng tôi đề xuất bạn đối xử với các events của mình như là một phần trạng thái của mình.
Trong bài viết này, chúng ta sẽ xem xét một vài sài lầm thông thường và đề xuất một vài cách thức.

## Bad: 1. Using LiveData for events
Các thức này giữ một thông điệp Snackbar hoặc một tín hiện navigation trực tiếp bên trong một đối tượng LiveData. Mặc dù theo nguyên tắc nó được xem như một đối tượng LiveData thông thường có thể được sử dụng cho điều này, nó vẫn gây ra một số vấn đề.

Trong một ứng dụng master/detail(danh sách chính/chi tiết), đây là ViewModel của một master

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

Trong View(Activity hoặc Fragment)

```
myViewModel.navigateToDetails.observe(this, Observer {
    if (it) startActivity(DetailsActivity...)
})
```

Vấn đề xảy ra với cách thức này đó là gí trị của **__navigateToDetails** được giữ là **true** trong một khoảng thời gian dài và nó không thể trở lại với screen đầu tiên.
Chi tiết từng bước:
1. Người dùng click vào button để start DetailActivity.
2. Sau đó nhấn **back** để trở về MasterActivity.
3. Các observers được active trở lại, sau đó lại inactive trong khi activity ở trong back stack.
4. Giá trị vẫn là **true** do đó DetailActivity được started lại không chính xác.

Một giải pháp sẽ là đốt cháy quá trình dịch chuyển từ ViewModel và ngay lập tức thiết lập cờ này thành **false**:

```
fun userClicksOnButton() {
    _navigateToDetails.value = true
    _navigateToDetails.value = false // Don't do this
}
```

Tuy nhiên một vấn đề quan trọng cần nhớ đó alf LiveData giữ các giá trị nhưng không đảm bảo cho mỗi giá trị phát ra cái mà nó nhận được. Ví dụ: một giá trị có thể được thiết lập khi không có observers được active, do đó một cái mới sẽ cần để thay thế nó. Cũng như giá trình thiết laapjc ác giá trị từ các threads khác nhau dẫn đến các cuộc chạy đua điều kiện cái sẽ chỉ được sinh ra trong một lần gọi tới observers.

Nhưng vấn đề chính với cách thức này đó là nó khó hiểu và thật sự xấu xí. Làm thế nào để chúng ta đảm bảo giá trị được thiết lập lại sau khi sự kiện navigation xảy ra?

## Better: 2. Using LiveData for events, resetting event values in observer
Với cách thức này bạn thêm vào một cách để chỉ ra từ View rằng bạn đã xử lý sự kiện và nó nên được thiết lập lại.
**Các sử dụng**

Với một sự thay đổi nhỏ nhằm đối với các observers chúng ta có thể có một giải pháp cho điều này:

```
listViewModel.navigateToDetails.observe(this, Observer {
    if (it) {
        myViewModel.navigateToDetailsHandled()
        startActivity(DetailsActivity...)
    }
})
```

Thêm vào phương thức mới trong ViewModel giống như bên dưới:

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

**Issues**
Vấn đề xảy ra với cách thức này đó là có một vài đoạn mã nguồn(một phương thức mới trong ViewModel cho mỗi event) và nó dễ gây ra lỗi; chúng ta dễ dàng quên việc gọi tới ViewModel từ observer.

## OK: Use SingleLiveEvent
Lớp [**SingleLiveEvent**](https://github.com/googlesamples/android-architecture/blob/dev-todo-mvvm-live/todoapp/app/src/main/java/com/example/android/architecture/blueprints/todoapp/SingleLiveEvent.java) được tạo ra cho ví dụ như là một giải pháp cái giải quyết cho một hoàn cảnh cụ thể. Nó là LiveData cái sẽ chỉ gửi cập nhật một lần.

**Cách sử dụng**

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
<div align="center"><b>ListViewModel.kt</b></div>

```
myViewModel.navigateToDetails.observe(this, Observer {
    startActivity(DetailsActivity...)
})
```
<div align="center"><b>MyFragment.kt</b></div><br />

**Issues**
Vấn đề đối với **SingleLiveEvent** đó là nó hạn chế tới một observer. Nếu bạn vô tình thêm nhiều hơn một, chỉ một cái sẽ được gọi và không có sự đảm bảo cho bất cứ cái nào.
<br />
<div align="center"><img src="https://images.viblo.asia/04fa3b91-8c85-4fde-9fbb-2f0d07120713.png" /></div>
<br />
**Recommended: Sử dụng một Event wrapper**
Trong cách thức này bạn quản lý một cách rõ ràng xem liệu event đã được xử lý hay chưa nhằm giảm thiểu sai xót.

**Cách sử dụng**
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
<div align="center"><b>Event.kt</b></div><br />

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
<div align="center"><b>ListViewModel.kt</b></div><br />

```
myViewModel.navigateToDetails.observe(this, Observer {
    it.getContentIfNotHandled()?.let { // Only proceed if the event has never been handled
        startActivity(DetailsActivity...)
    }
})
```
<div align="center"><b>MyFragment.kt</b></div><br />

Lợi thế của cách thức này đó là người dùng cần chỉ dõ ý định bằng cách sử dụng **getContentIfNotHandle()** hay **peekContent()**. Các phương thức sự kiện mẫu như là một phần trạng thái: Giờ dây chúng đơn giản là một message cái được tiêu thụ hay chưa.
<br />
<div align="center"><img src="https://images.viblo.asia/d47c4cfb-afc2-440a-93d5-58c74e92041a.png" /></div>
<br />

Tổng kết: thiết kế các sự kiện như một phần trạng thái của bạn. Sử dụng Event wrapper của mình trong các LiveData observables và tùy biến nó nhằm phù hợp với những gì bạn cần.

Bonus! Sử dụng EventObserver nhằm loại bỏ một số mã nguồn lặp lại nếu bạn cuối cùng bạn có rất nhiều events.

## Source
https://medium.com/androiddevelopers/livedata-with-snackbar-navigation-and-other-events-the-singleliveevent-case-ac2622673150

## Reference
https://medium.com/@abhishektiwari_51145/how-to-use-singleliveevent-in-mvvm-architecture-component-b7c04ed8705 <br />

https://github.com/googlesamples/android-architecture-components/issues/63