# **Mở bài**
- `Higher Order Functions` là 1 tính năng của Kotlin giúp chúng ta có thể tối ưu hóa và làm giảm code của mình.
- Nếu bạn muốn tìm hiểu nhiều hơn về `Higher Order Functions` thì hãy vào [đây](https://kotlinlang.org/docs/reference/lambdas.html) 
# **Ví dụ**
- Nếu bạn muốn code của mình trong khối `try/ catch` thì làm như nào ?
- Đây là cách thông thường
```
     try{
         helloWord()
      }catch (e: Throwable){}
```
- Với `Higher Order Functions` thì 
```
// tạo ra 1 Higher Order Functions
inline fun <T> justTry(block: () -> T) = try { block() } catch (e: Throwable) {}
// sử dụng
justTry {
    helloWord()
}
```
- Với `Higher Order Functions` chúng ta có thể tái sử dụng nhiều lần, code nhìn cũng gọn hơn rất nhiều.
- Tương tự ta có thể viết các function sau 
```
inline fun debugMode(block : () -> Unit) {
    if (BuildConfig.DEBUG) {
        block()
    }
}
inline fun lollipopAndAbove(block : () -> Unit) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
        block()
    }
}
inline fun Context.withNetwork(block: () -> Unit) {
    val connectivityManager = this
            .getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager
    connectivityManager?.let {
        val netInfo = it.activeNetworkInfo
        netInfo?.let {
            if (netInfo.isConnected) {
                block()
            }
        }
    }
}

```
- Khi sử dụng chỉ cần làm như sau: 
```
debugMode {
    StrictMode.setThreadPolicy(StrictMode.ThreadPolicy.Builder()
            .detectAll()
            .penaltyLog()
            .build())
}

lollipopAndAbove {
    view.elevation = 1.0f
}
withNetwork {
    // make network request
}
```
- Nâng cao hơn chút, chúng ta có thể kết hợp `Higher Order Functions` với `Rxjava` như sau : 
```
fun <T> asyncRxExecutor(heavyFunction: () -> T, response : (response : T?) -> Unit) {
    val observable = Single.create<T>({e ->
        e.onSuccess(heavyFunction())
    })
    observable.subscribeOn(Schedulers.newThread())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe { t: T? ->
                response(t)
            }
}
```
- Đoạn code trên sẽ tạo ra 1 observable thực thi trên 1 luồng mới và trả về response
```
asyncRxExecutor({ myHeavyFunction() }, { response ->
    println(response.toString())
})
```
# **Kết bài**
- Cảm ơn các bạn đã đọc bài của mình.
- Nguồn : [đây](https://kotlinlang.org/docs/reference/lambdas.html) và [đây](https://android.jlelse.eu/playing-with-kotlin-higher-order-functions-aecce3d72a12)