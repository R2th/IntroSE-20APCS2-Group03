## Scopes trong Kotlin Coroutines

Scopes (các phạm vi) trong **Kotlin Coroutines** vô cùng hữu dụng vì chúng ta cần phải huỷ bỏ các tác vụ nền ngay khi Activity bị destroy. Tương tự, đối với tác vụ hiện tại trong ViewModel, nó cũng nên được huỷ bỏ ngay khi ViewModel bị clear.

Nếu bạn muốn tìm hiểu chi tiết, tôi thành thật khuyên bạn nên đọc [bài viết Làm chủ Kotlin Coroutines trên MindOrks này](https://blog.mindorks.com/mastering-kotlin-coroutines-in-android-step-by-step-guide).

![ViewModel luôn triển khai interface CoroutineScope](https://images.viblo.asia/263268a1-50f7-45e7-a1eb-9d227c231cf4.jpg)

Rồi, giờ hãy xem hiện tại chúng ta đang thực hiện việc huỷ bỏ tác vụ ra sao. Chúng ta cần implement `CoroutineScope`, gắn `Job` vào `CoroutineContext` và huỷ bỏ nó bên trong hàm `onCleared`.

```Kotlin
class HomeViewModel : ViewModel(), CoroutineScope {

    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Main + job

    private val job: Job = SupervisorJob()

    override fun onCleared() {
        super.onCleared()
        job.cancel() // huỷ bỏ job
    }

    fun fetchAndShowUser() {
        launch {
            val user = fetchUser()
            // hiển thị user trên UI
        }
    }

    suspend fun fetchUser(): User {
        return withContext(Dispatchers.Default) {
            // lấy dữ liệu user
            // trả về user
        }
    }
}
```

Có rất nhiều boilerplate code cần được loại bỏ bớt. Bằng việc sử dụng **ViewModelScope**, chúng ta có thể có ít boilerplate code hơn.

## Cách sử dụng ViewModelScope

Để sử dụng **ViewModelScope**, chỉ cần import dependency dưới đây bên trong file `build.gradle` của bạn:

```
implementation "androidx.lifecycle.lifecycle-viewmodel-ktx$lifecycle_version"
```
Sau đó, bên trong ViewModel của bạn:

```Kotlin
class HomeViewModel : ViewModel() {

    fun fetchAndShowUser() {
        viewModelScope.launch {
            val user = fetchUser()
            // hiển thị user trên UI
        }
    }

    suspend fun fetchUser(): User {
        return withContext(Dispatchers.Default) {
            // lấy dữ liệu user
            // trả về user
        }
    }
}
```

Ở đây, chúng ta không cần implement `CoroutineScope`, không cần phải attach Job bên trong `CoroutineContext` và cũng không cần phải huỷ bỏ `job` bên trong hàm `onCleared`.

Vô cùng healthy và balance đúng không ? Chúng ta chỉ cần sử dụng **ViewModelScope**. Vì thế, sẽ có ít boilerplate code hơn.

Đó là lý do tại sao **ViewModelScope** rất hữu dụng.  Cảm ơn vì đã dành thời gian đọc bài viết của mình. Nếu thấy bài viết hữu ích nhớ upvote cho mình nhé. :blush:

Nguồn: [Medium.com](https://medium.com/mindorks/use-viewmodelscope-for-less-boilerplate-code-with-coroutines-79c7fa19aa8f)