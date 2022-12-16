# **Mở bài**
- Bài này tôi sẽ hướng dẫn các bạn kết hợp `Lifecycle` của [Android Architecture Component ](https://developer.android.com/topic/libraries/architecture/lifecycle) và `CompositeDisposable` của RxJava để clear các `Disposable` .
# **Nội Dung**
- Theo cách thông thường, chúng ta xử lý đăng ký Rx bằng cách tạo một `CompositeDisposable` và thêm mọi loại `Disposable` vào đó, sau đó loại bỏ trong `onStop` hoặc `onDestroy` của Fragment / Activity.
- Như code dưới đây : 
```
//create the compositeDisposable
val compositeDisposable = CompositeDisposable()
...
var disposable = yourObservable.subscribeWith(aObserver)
compositeDisposable.add(disposable)
...

override fun onDestroy() {
  compositeDisposable.dispose()
  super.onDestroy()
}
```
- Điều này rất quan trọng đối với các developer tránh leak memory cũng như rất nhiều lỗi không mong muốn. Tuy nhiên, nó rất nhàm chán và dễ quên.
- Lifecycle là gì ?
> The android.arch.lifecycle package provides classes and interfaces that let you build lifecycle-aware components—which are components that can automatically adjust their behavior based on the current lifecycle state of an activity or fragment.
- Nói chung chung là lifecycle sẽ nhận biết vòng đời của activity/ fragment và có các function tương ứng để nhận biết.
- Dưới đây là việc kết hợp `CompositeDisposable` với `Lifecycle`
```
class AutoDisposable : LifecycleObserver {
    lateinit var compositeDisposable: CompositeDisposable
    fun bindTo(lifecycle: Lifecycle) {
        lifecycle.addObserver(this)
        compositeDisposable = CompositeDisposable()
    }

    fun add(disposable: Disposable) {
        if (::compositeDisposable.isInitialized) {
            compositeDisposable.add(disposable)
        } else {
            throw NotImplementedError("must bind AutoDisposable to a Lifecycle first")
        }
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_DESTROY)
    fun onDestroy() {
        compositeDisposable.dispose()
    }
} 
```
-  Toàn bộ `Disposable` sẽ được clear khi `Lifecycle` chạy  `ON_DESTROY`
-  Trong Activity / Fragment của bạn  cần khởi tạo AutoDisposable và bind tới Lifecycle. Lưu ý rằng Fragment / Activity có vòng đời riêng.
```
private val autoDisposable = AutoDisposable()
...
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    autoDisposable.bindTo(this.lifecycle)
}
```
- Sử dụng 
```
var disposable = observable.subscribe(observer) 
    autoDisposable.add(disposable)
```
- Chúng ta có thể viết 1 hàm extension để cho việc thêm các `Disposable` 1 cách ngắn gọn và code nhìn clear hơn.
```
fun Disposable.addTo(autoDisposable: AutoDisposable) {
    autoDisposable.add(this)
}
```
- Cuối cùng sẽ sử dụng như thế này :
```
observable
    .subscribeOn(Schedulers.io)
    .observeOn(AndroidSchedulers.mainThread())
    .subscribe(observer)
    .addTo(autoDisposable) // <- Dòng này sẽ thêm `Disposable` vào `CompositeDisposable` 
```
# **Kết thúc**
- Cám ơn các bạn đã đọc bài của viết của mình.
- Nguồn : [đây](https://medium.com/mindorks/autodisposable-for-rxjava-with-lifecycle-architecture-component-23dfcfa83a2) và [đây](https://developer.android.com/reference/android/arch/lifecycle/Lifecycle)