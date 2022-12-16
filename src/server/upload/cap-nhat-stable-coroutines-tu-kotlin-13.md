![](https://images.viblo.asia/812d45a3-87d2-4257-a6d5-de2e9604c39a.png)

nguồn https://blog.jetbrains.com/kotlin/2018/10/kotlin-1-3/

## Giới thiệu

Kotlin 1.3 đã có stable coroutines với một số thay đổi so với hồi trước mình đã giới thiệu tại https://viblo.asia/p/cach-dung-kotlin-coroutine-trong-android-63vKja0y52R, nên hôm nay mình sẽ hướng dẫn các bạn cách update project lên bản `stable coroutines` này.

## Tiến hành

Về cơ bản coroutines vẫn dựa trên `suspend funtion` và là `lightweight-threead` chỉ khác ở cách cài đặt mà thôi. VIewModel sẽ cần có 
- `viewModelJob` (tương tự `compositeDisposable` trong rxjava)
- `uiContext`, `ioContext` để chuyển context thực hiện với `Dispatchers.Main` hay `Dispatchers.IO` (tương tự `Schedulers.io()` và `AndroidSchedulers.mainThread()` trong rxjava)
- `uiScope`, `ioScope` để khởi chạy corotuiens trên contexxt tương ứng

sourcoe https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/base/BaseViewModel.kt
```kotlin
abstract class BaseViewModel : ViewModel() {

    // coroutines
    private val viewModelJob = Job()
    protected val ioContext = viewModelJob + Dispatchers.IO // background context
    protected val uiContext = viewModelJob + Dispatchers.Main // ui context
    protected val ioScope = CoroutineScope(ioContext)
    protected val uiScope = CoroutineScope(uiContext)
    
    fun onDestroy() {
        viewModelJob.cancel()
    }
}
```

- Các bạn cũng sẽ cần đảm bảo hàm xử lý lỗi chạy trên Main
```kotlin
    suspend fun onLoadFailUI(throwable: Throwable) {
        withContext(uiContext) { // switch to main context
            onLoadFail(throwable)
        }
    }
```

- Và giờ thì khi cần chạy tác vụ ở background thì các bạn chỉ cần làm như sau:

source: https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/screen/favoritemovie/FavoriteMovieViewModel.kt
```kotlin
    ioScope.launch { // khởi chạy coroutines với ioContext
        try {
            val movieList = movieDao.getFavorite(getNumberItemPerPage(), page) // do task in background
            withContext(uiContext) { // switch to main context and update ui
                onLoadSuccess(page, movieList)
            }
        } catch (e: Exception) {
            onLoadFailUI(e) // handle error in main context
        }
    }
```

**Lưu ý**

https://kotlinlang.org/docs/reference/coroutines/basics.html#structured-concurrency
> When we use GlobalScope.launch we create a top-level coroutine. Even though it is light-weight, it still consumes some memory resources while it runs. If we forget to keep a reference to the newly launched coroutine it still runs. What if the code in the coroutine hangs (for example, we erroneously delay for too long), what if we launched too many coroutines and ran out of memory? Having to manually keep a reference to all the launched coroutines and join them is error-prone.
> 
> There is a better solution. We can use structured concurrency in our code. Instead of launching coroutines in the GlobalScope, just like we usually do with threads (threads are always global), we can launch coroutines in the specific scope of the operation we are performing.

Khi chúng ta dùng GlobalScope.launch, chúng ta tạo một top-level coroutine. Cho dù nó light-weight thì nó vẫn tiêu tốn bộ nhớ. Và để xả ra lỗi delay quá lâu mà ko kết thúc nó thì nó vẫn tiếp tục. Và khi chúng ta launch quá nhiều coroutines thì sẽ dẫn tới out of memory. Vì vậy hãy cấu trúc coroutines để chỉ chạy với scope cần thiết.

Bài đến đây là hết rồi, hẹn gặp lại các bạn và hãy ![](https://images.viblo.asia/aa4b3f5e-1540-433c-9ea5-d806a6fa4480.png) nếu bài viết có ích nhé.