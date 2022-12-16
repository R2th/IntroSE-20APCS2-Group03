# I. Giới thiệu
- Như đã giới thiệu tại series [Cùng tìm hiểu coroutines trong kotlin](https://viblo.asia/s/cung-tim-hieu-coroutines-trong-kotlin-jy5VB2Vo5ra) và những thứ mà bạn cần chuẩn bị. Bài viết này sẽ hướng dẫn bạn chạy sample app đầu tiên và lướt qua một chút về coroutines và một chút về Android Architechture component :D

# II. Import Sample app
### 1. Import project và chạy thử
1. Sau khi bạn donwload `kotlin-coroutines`, mở project `kotlin-croutines-start` trong Android Studio.
2. Nhấn vào nút **Run** chọn emulator hoặc devices bạn kết nối. (Minimum SDK là 21).

![](https://i.imgur.com/qa4dyvB.png?1)

> Sử dụng Kotlin 1.3
> - Để sử dụng Kotlin 1.3, ta cần enable trong Android Studio.
> 1. Chọn **Tools > Kotlin > Configure Kotlin Plugin Updates.**
> 2. Trong drop-down chọn **"Stable".**
> 3. Click **"Check Again"** để fetch version mới nhất về.
> 4. Click **"Install."**
> 5. Restart Android Studio, Kotlin 1.3 sẽ cho phép bạn compile sample app trên.

### 2. Project Structure
- Sample App trên sử dụng Architechture Components để phân tách UI code trong `MainActivity` với logic code trong `MainViewModel`.
- `MainActivity`hiển thị UI, đăng ký các listeners và có thể hiển thị `Snackbar`. Nó sẽ passes sự kiện tới `MainViewModel` và updates màn hình trên `LiveData` trong `MainViewModel`.
- `MainViewModel` xử lý events trong `onMainViewClicked` và sẽ giao tiếp tới `MainActivity` sử dụng `LiveData`.
- `Executor` định nghĩa `BACKGROUND`, chúng ta có thể hiểu là sẽ execute thứ gì đó trên background thread.
- `MainViewModelTest` định nghĩa test cho `MainViewModel`

### 3. Add Coroutines vào project
- Để sử dụng Coroutines trong Kotlin, bạn cần thêm thư viện `coroutines-core` vào trong `build.gradle (Module:app)`. Hiện tại mình đang dùng version **1.0.0** cho project này.
```
dependencies {
  ...
  implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.0.0"
  implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.0.0"
}
```

- Nếu bạn sử dụng RxJava, bạn có thể sử dụng coroutines với RxJava với thư viện [kotlin-coroutines-rx](https://github.com/Kotlin/kotlinx.coroutines/tree/master/reactive).

# III. Coroutines trong Kotlin
- Như đã biết trong Android, chúng ta luôn luôn tránh blocking main thread. Main thread là một thread đơn lẻ sẽ sử lý tất cả update tới UI. Nó cũng như là một thread sẽ gọi các phần xử lý listener và UI callbacks. Như vậy sẽ giúp ứng dụng của bạn chạy mượt mà và tăng sự trải nghiệm với người dùng.
- Ứng dụng của bạn hiển thị tới user liên tục, main thread sẽ update screen với [16 millisecond mỗi giây 
 hoặc thường xuyên hơn](https://medium.com/androiddevelopers/exceed-the-android-speed-limit-b73a0692abc1) sẽ tương đương khoảng 60 frames trên giây (60 fps). Sẽ có rất nhiều các tác vụ chiếm nhiều thời gian xử lý như là parsing một datasets JSON lớn, ghi data vào database hoặc fetching data từ network. Vì vậy, xử lý chúng trên main thread sẽ có thể gây ra treo ứng dụng, giật lag, hoặc freeze rồi dẫn tới [ANR](https://developer.android.com/topic/performance/vitals/anr) luôn :D.
 
 ### 1. Callback Pattern
 - Một pattern xử lý long-running task để không blocking main thread thì chính là **callbacks**. Sử dụng **callbacks**, bạn có thể chạy long-running task trên background thread. Sau khi task đó hoàn thành, callback sẽ được gọi để cung cấp thông tin, kết quả trên main thread.
- Dưới đây là một ví dụ sử dụng **callback pattern**

```
// Một request có thể cần xử lý nhiều thời gian
@UiThread
fun makeNetworkRequest() {
    // The slow network request runs on another thread
    slowFetch { result ->
        // Khi kết quả sẵn sàng, callback sẽ nhận được result
        show(result)
    }
    // makeNetworkRequest() sẽ được giải phóng sau khi gọi slowFetch mà không cần đợi kết quả trả về
}
```

- Ví dụ trên sử dụng với [@UiThread](https://developer.android.com/reference/android/support/annotation/UiThread), nó phải chạy nhanh nhất có thể để xử lý trên main thread. Có nghĩa là nó cần phải trả về result thật nhanh chóng để screen update tiếp theo không bị treo. Tuy nhiên `slowFetch` sẽ mất vài giây cho đến vài phút để hoàn thành, main thread không thể đợi nó trong khoảng thời gian lâu như vậy :(. `show(result)` callback cho phép `slowFetch` để chạy trên background thread và trả về result khi nó sẵn sàng.

### 2. Sử dụng Coroutines để remove callbacks
- **Callback pattern** thực sự là pattern tuyệt vời, tuy nhiên nó sẽ có một vài nhược điểm nhất định. Code sẽ trở nên phức tạp và khó đọc hiểu hơn đối với bản thân và cả đồng nghiệp. Ngoài ra **callback** còn không cho phép sử dụng với 1 số feature của ngôn ngữ như **Exceptions**.
- Đích cuối cùng của chúng t là đợi cho đến khi result được trả về sau khi long-running task xử lý xong và tiếp tục thực thi chương trình.
- Keyword `suspend` là một function type dành riêng cho coroutines. Khi coroutine gọi function với type là `suspend`, thay vì blocking cho tới khi function trả về như một function bình thường, nó sẽ trì hoãn lại việc thực thi cho đến khi result sẵn sàng và nó sẽ tiếp tục lại sau khi kết thúc cùng với result. Trong lúc trì hoãn để đợi result, **nó sẽ unblock thread mà nó đang chạy trên** cho nên các function hoặc coroutines khác có thể chạy bình thường.
- Ví dụ dưới đây sẽ chỉ ra cách thay thế callback pattern phía trên bằng coroutines

```
// Một request có thể cần xử lý nhiều thời gian với coroutines
@UiThread
suspend fun makeNetworkRequest() {
    // slowFetch is là một suspend function cho nên thay vì blocking main thread
    // makeNetworkRequest sẽ `suspend` cho tới khi result được trả về và sẵn sàng
    val result = slowFetch()
    // tiếp tục xử lý sau khi result đã được trả về
    show(result)
}

suspend fun slowFetch(): SlowResult { ... }
```
- Cơ chế hoạt động cũng giống như callback, `makeNetworkRequest` phải return từ main thread bởi vì nó được đánh dấu `@UiThread`. Có nghĩa là không gọi blocking method như `slowFetch`. 

> Quan trọng: Keyword `suspend` không định nghĩa thread nào dùng để sư dụng. Suspend function có thể chạy trên **background thread** hoặc **main thread.**
> 

- So sánh với **callback-based** code, **coroutine** code hoàn thành với kết quả tương tự của việc unblocking thread hiện tại với số lượng code ít hơn hẳn. Trong một số trường hợp cần xử lý nhiều **long-running task** ta thường sẽ xử lý cùng với nhiều **callback**, tuy nhiên **coroutine** giúp chúng ta giải quyết việc này mà không cần phải bận tâm đến **callback**. Hãy xem ví dụ dưới đây:

```
// Request data từ network và save vào trong database với coroutines

// Bởi vì @WorkerThread, function này không thể gọi trên
// main thread mà không xảy ra lỗi.
@WorkerThread
suspend fun makeNetworkRequest() {
    // slowFetch và anotherFetch là suspend functions
    val slow = slowFetch()
    val another = anotherFetch()
    // save là regular function và nó sẽ block thread hiện tại
    database.save(slow, another)
}

suspend fun slowFetch(): SlowResult { ... }
suspend fun anotherFetch(): AnotherResult { ... }
```

- Coroutines dưới một cái tên gọi khác
> Một pattern của `async` và `await` trong các ngôn ngôn ngữ khác được dựa trên **coroutines**. Nếu bạn thấy quên thuộc với pattern này, keyword `suspend` sẽ tương tự như `async`. Tuy nhiên trong **Kotlin**, `await()` chạy ngầm khi gọi hàm `suspend`.
> 
> Kotlin có method `Deferred.await()` được sử dụng để đợi kết quả từ coroutine bắt đầu với `async` builder.

# IV. Tổng kết
- Qua bài viết trên chúng ta đã có cái nhìn cơ bản về Coroutines trong Kotlin và cách setup **Project Sample**.
- Phần tiếp theo mình sẽ hướng dẫn các bạn thực hành trên **Project Sample**.
Bài viết được dựa trên trang [CodeLabs](https://codelabs.developers.google.com) của Google.