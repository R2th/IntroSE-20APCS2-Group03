Nếu hiện tại bạn đang sử dụng Google Android Architecture Components, bạn sẽ biết LiveData là gì. Nếu không, bạn có thể tìm hiểu tại link sau: https://developer.android.com/topic/libraries/architecture/index.html.

Trong bài viết này, chúng ta sẽ tìm hiểu một vài cách để LiveData dễ sử dụng hơn, đặc biệt là làm nó an toàn hơn với NonNull. Chúng ta sẽ sử dụng Kotlin thay vì Java.

### Cách phổ biến để sử dụng NonNull LiveData
Hãy xem ví dụ sau:
```
val fooLiveData: MutableLiveData<Boolean> = MutableLiveData()
fooLiveData.observe(this, Observer { 
    it?.let { 
        // Now foo is non-null
    }
})
```

Kiểm tra với `it?` là không quá tệ, nhưng nó sẽ tốt hơn nếu chúng ta có thể filter được giá trị `null`. Một giải pháp là tạo class `NonNullObserver<T>` extend từ `Observer<T>` như sau:
```
abstract class NonNullObserver<T> : Observer<T> {
    
    abstract fun onNonNullChanged(t: T)
    
    override fun onChanged(t: T?) {
        t?.let { onNonNullChanged(it) }
    }
}
// Usage
fooLiveData.observe(this, object : NonNullObserver<Boolean>() {
    
    override fun onNonNullChanged(t: Boolean) {
        // Now foo is non-null
    }
})
```
Mặc dù cách trên giải quyết được vấn đề, tuy nhiên việc sử dụng nó làm cho code trở nên xấu xí.

### Giải pháp 1: tạo nonNullObserve với Kotlin extension
```
fun <T> LiveData<T>.nonNullObserve(owner: LifecycleOwner, observer: (t: T) -> Unit) {
    this.observe(owner, android.arch.lifecycle.Observer { 
        it?.let(observer)
    })
}
// Usage
fooLiveData.nonNullObserve(this, {
    // Now foo is non-null
})
```
Cách sử dụng này đẹp hơn, nhưng bạn cần định nghĩa một method mới để phân biệt giữa observe bình thường và non-null observe. Có một giải pháp tốt hơn cho nó.

### Giải pháp 2 (tốt nhất): tạo nonNull Kotlin extension và NonNullMediatorLiveData\<T>
Đầu tiên, chúng ta định nghĩa NonNullMediatorLiveData<T> extend từ MediatorLiveData<T>. Mục đích của nó là chúng ta có thể tạo chức năng mở rộng cho NonNullMediatorLiveData được return từ `.nonNull`. Nếu bạn chưa biết về MediatorLiveData, có thể tham khảo tại: https://developer.android.com/reference/android/arch/lifecycle/MediatorLiveData.html.
```
class NonNullMediatorLiveData<T> : MediatorLiveData<T>()
```
    
Tiếp theo, chúng ta tạo  Kotlin extension:
```
fun <T> LiveData<T>.nonNull(): NonNullMediatorLiveData<T> {
    val mediator: NonNullMediatorLiveData<T> = NonNullMediatorLiveData()
    mediator.addSource(this, Observer { it?.let { mediator.value = it } })
    return mediator
}
fun <T> NonNullMediatorLiveData<T>.observe(owner: LifecycleOwner, observer: (t: T) -> Unit) {
    this.observe(owner, android.arch.lifecycle.Observer {
        it?.let(observer)
    })
}
// Usage
fooLiveData
        .observe(this, Observer {
            // foo is still nullable
        })
fooLiveData
        .nonNull()
        .observe(this, {
            // Now foo is non-null
        })
```

Tuyệt vời! Bạn có thể thấy, chỉ có sự thay đổi nhỏ trong cách chúng ta observe và chúng ta đã có cách rất đẹp và an toàn để observe non-null LiveData. Giải pháp này không hạn chế bạn set giá trị null trong nguồn LiveData. Do đó, bạn vẫn có thể get giá trị nullable khi bạn gọi `fooLiveData.value`.