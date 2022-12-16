# Giới thiệu
- Một cách thuận tiện để View có thể giao tiếp với ViewModel là sử dụng LiveData để lắng nghe. View subscribe những sự thay đổi ở LiveData rồi sử dụng dữ liệu từ nó. Điều này rất hữu ích cho dữ liệu được cập nhật liên tục khi hiển thị lên View.

![](https://images.viblo.asia/e1c518a3-c6de-4dd3-94df-db9829d45567.png)

-Tuy nhiên có một vài dữ liệu chỉ được nên sử dụng một lần, như 1 tin nhắn trên Toast, Snackbar ,Dialog, các sự kiện điều hướng...
![](https://images.viblo.asia/380a47b6-87a9-4287-b1b5-09186609dfd2.png)

Trong bài viết này mình sẽ chỉ ra một số lỗi phổ biến và những phương pháp được đề xuất khi xử lý trường hợp này 
# ❌  Sử dụng LiveData cho các event
-Cách tiếp cận này giữ tin nhắn trên Snackbar, Toast hoặc các tín hiệu điều hướng thẳng ở trong LiveData Object.
Một ví dụ ở đây là trường hợp khi người dùng click vào button và muốn mở ra một lần Toast duy nhất.

-Đây là code ở trong ViewModel
```
class ViewModel : ViewModel() {
    private val _toastLiveData = MutableLiveData<String>()

    val toastLiveData: LiveData<String>
        get() = _toastLiveData

    fun setValue() {
        _toastLiveData.value = "test"
    }
}
```
-Và ở trong View(Activity hay Fragments)
```
viewModel.setValue()
        button.setOnClickListener {
            viewModel.toastLiveData.observe(this, Observer {
                if (it == "test") {
                    Toast.makeText(this, "hello", Toast.LENGTH_SHORT).show()
                }
            })
        }
```

-Vấn đề khi sử dụng cách này là value ở trong ` toastLiveData` luôn luôn có giá trị là `"test"`và tin nhắn Toast sẽ không ngừng hiện ra nếu ta tiếp tục ấn nút button. Cụ thể hơn:

    + Users ấn vào button để mở ra tin nhắn Toast 
    + Users nhấn tiếp Toast nhưng tin nhắn `"hello"` vẫn được hiện lên
-Chúng ta sẽ thử cách set lại value LiveData:
```
    fun setValue() {
         _toastLiveData.value = "test"
         _toastLiveData.value= "rofl" // Don't do this
    }
```
Và dĩ nhiên là kết quả vẫn giống như cách trên. Bởi vì một điều quan trọng là LiveData giữ những values nhưng không đảm bảo sẽ phát ra mọi giá trị mà nó nhận được. 
Ví dụ: một value có thể được set khi mà không có observer nào active, nên giá trị mới sẽ chỉ thay thế cho giá trị đó. Ở trường hợp này value ở trong LiveData sẽ là `"rofl"` thay vì là `"test"`.
Ngoài ra setting values từ những thread khác có thể dẫn tới `race conditions`(https://bit.ly/2EheBCe) xảy ra khi nhiều threads cùng truy cập và thay đổi dữ liệu dẫn đến value sẽ không được như mong muốn.
# ❌ Sử dụng LiveData cho các events, reset value ở trong observer 
Cách xử lý:
Thêm một method với vào trong ViewModel:
```
class ViewModel : ViewModel() {
    private val _toastLiveData = MutableLiveData<String>()

    val toastLiveData: LiveData<String>
        get() = _toastLiveData

    fun setValue() {
        _toastLiveData.value = "test"
    }

    fun resetValue() {
        _toastLiveData.value = "nope"
    }
}
```
-Và với việc thay đổi nhỏ trong observer chúng ta đã đạt được mục đích 
```
viewModel.setValue()
        button.setOnClickListener {
            viewModel.toastLiveData.observe(this, Observer {
                if (it == "test") {
                    viewModel.resetValue()
                    Toast.makeText(this, "hello", Toast.LENGTH_SHORT).show()
                }
            })
        }
```
-Issues: Vấn đề trong cách xử lý này nó sẽ tạo ra `boilerplate code`(mỗi một event lại có một method mới https://bit.ly/2Ju0AVN) và nó cũng rất dễ bị lỗi.
Nó cũng chúng ta rất dễ quên không gọi đến method đó trong ViewModel.
# ✔️ Sử dụng SingleLiveEvent
-Ở trong Google samples họ đã thêm một class gọi là SingleLiveEvent(https://bit.ly/2M7NlMo). SingleLiveEvent được tạo ra để xử lý cho trường hợp này. SingleLiveEvent là một class kế thừa từ LiveData nó sẽ chỉ gừi update data một lần duy nhất

-Cách áp dụng :
```
class ViewModel : ViewModel() {
    private val _toastLiveData = SingleLiveEvent<String>()

    val toastLiveData: LiveData<String>
        get() = _toastLiveData

    fun setValue() {
        _toastLiveData.call()
    }
}
```
-Ở trong View
```
        viewModel.setValue()
        button.setOnClickListener {
            viewModel.toastLiveData.observe(this, Observer {
                Toast.makeText(this, "hello", Toast.LENGTH_SHORT).show()
            })
        }
```
Issues:

-Vấn đề của SingleLiveEvent là nó bị giới hạn bởi một observer. Nếu bạn vô tình thêm nhiều hơn một observer, chỉ một observer được gọi và không thể biết chính xác là cái nào
![](https://images.viblo.asia/62e67b8d-5d86-4862-82e0-1fdab8e33e90.png)
# ✔️ Sử dụng Event Wrapper
-Class Event.kt (https://bit.ly/2QdoFRp)
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
-Ở trong ViewModel
```
class ViewModel : ViewModel() {
    private val _toastLiveData = MutableLiveData<Event<String>>()

    val toastLiveData: LiveData<Event<String>>
        get() = _toastLiveData

    fun setValue() {
        _toastLiveData.value = Event("lmfao")
    }
}
```
-Ở View:
```
viewModel.setValue()
        button.setOnClickListener {
            viewModel.toastLiveData.observe(this, Observer {
                it.getContentIfNotHandled()?.let {
                    Toast.makeText(this, it, Toast.LENGTH_SHORT).show()
                }
            })
        }
```
-Với cách này, bạn quản lý một các rõ ràng cho dù sự kiện được xử lý hay không, giảm các lỗi có thể xảy ra. Hãy sử dụng Event wrapper trong  Livedata và customize lại nó phù hợp với nhu cầu của bạn và EventObserver(https://bit.ly/2LRACxw) để remove những đoạn code lặp lại nếu bạn phải xử lý nhiều events.
# Kết luận:
Trên đây là một số kiến thức mà mình tổng hợp được về SingleLiveEvent và Event Wrapper trong LiveData.
Mong rằng nó sẽ giúp ích cho các bạn. Mình rất mong nhận được góp ý từ bạn đọc. Xin cảm ơn.

Nguồn tham khảo:
https://medium.com/androiddevelopers/livedata-with-snackbar-navigation-and-other-events-the-singleliveevent-case-ac2622673150

https://github.com/googlesamples/android-architecture/blob/dev-todo-mvvm-live/todoapp/app/src/main/java/com/example/android/architecture/blueprints/todoapp/SingleLiveEvent.java

https://gist.github.com/JoseAlcerreca/5b661f1800e1e654f07cc54fe87441af#file-event-kt