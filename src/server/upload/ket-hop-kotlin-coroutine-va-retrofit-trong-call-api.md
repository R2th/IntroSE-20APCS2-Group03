Như đã giới thiệu ở bài trước về cách sử dụng [Kotlin Coroutine trong Android](https://viblo.asia/p/cach-dung-kotlin-coroutine-trong-android-63vKja0y52R) thì ở bài này mình sẽ tiếp tục giới thiệu tới các bạn cách sử dụng Coroutine kết hợp Retrofit trong việc call api thay cho Rxjava.

- Bước 1: Thêm dependency của retrofit adapter cho Kotlin Coroutine

```kotlin
implementation 'com.jakewharton.retrofit:retrofit2-kotlin-coroutines-experimental-adapter:1.0.0'
```

- Bước 2: Trong `interface ApiService` khai báo api thì bạn cần chuyển từ `Single` hoặc `Observable` sang `Deferred`

```kotlin
interface ApiService {
    // rxjava
    // @GET("/movie/{id}")
    // fun getMovie(@Path("id") id: String): Single<Movie>

    // coroutine
    @GET("/movie/{id}")
    fun getMovie(@Path("id") id: String): Deferred<Movie>
}
```

- Bước 3: Khi định nghĩa `interface MovieRepository`, `class MovieRepositoryImpl` và `MovieDetailViewModel` bạn sẽ có 3 cách như sau:

```kotlin
interface MovieRepository {
    fun getMovie(@Path("id") id: String): Deferred<Movie>
    
    fun getMovie2(@Path("id") id: String, success: (Movie) -> Unit, fail: (Throwable) -> Unit): Deferred<Movie>
    
    fun getMovie3(@Path("id") id: String): Result<Movie>
}

class MovieRepositoryImpl : MovieRepository {
    fun getMovie(@Path("id") id: String): Deferred<Movie> =
        apiService.getMovie(id)
    
    
    fun getMovie2(@Path("id") id: String, success: (Movie) -> Unit, fail: (Throwable) -> Unit): Deferred<Movie> =
        async(UI) {
            try {
                success(apiService.getMovie(id)
            } catch (e: Throwable) {
                fail(e)
            }
        }
    
    fun getMovieDetail3(@Path("movide_id") id: String): Result<Movie> =
        async(UI) {
            try {
                return Result.Success(apiService.getMovie(id).await())
            } catch (e: Throwable) {
                return Result.Error(e)
            }
        }
}
    
class MovieDetailViewModel : ViewModel() {
    fun loadMovie() {
        try {
            val movie = movieRepository.getMovie(movieId).await()
            // show movie detail
        } catch (e: Throwable) {
            handleError(e)
        }
    }
    
    fun loadMovie2() {
        movieRepository.getMovie2(movieId, { movie ->
            // show movie detail
        }, { e -> 
            handleError(e) 
        })
    }
    
    fun loadMovie3() {
        val result = movieRepository.getMovie3(movieId)
        when(result) {
            is Result.Success<Movie> -> {
                val movie = result.data
                // show movie detail
            }
            is Result.Error -> {
                handleError(e.error)
            }
        }
    }
}

sealed class Result<out T : Any>() {
    class Success<out T : Any>(val data: T) : Result<T>()

    class Error(val error: Throwable) : Result<Nothing>()
}
```

   **Cách 1**: MovieRepositoryImpl không xử lý gì mà chỉ gọi tới apiService và trả về Deferred. Cách này giúp bạn nhận đc object Deferred ở ViewModel, nhưng có thể gây ra lặp code trong viewModel, vì dùng ở đâu cũng cần đoạn code async để chuyển thread về ui thread và try catch để bắt exception có thể xảy ra.

   **Cách 2**: MovieRepositoryImpl xử lý một phần logic ở đây và nhận callback cho các case success và fail. Cách này giúp cho bạn rút gọn code phần async để chuyển thread và try catch đều chỉ cần viết 1 lần trong này. Rồi thực hiện gọi callback tương ứng. Việc xử lý ở viewModel gọi khá giống với cách của Rxjava nên có thể sẽ dễ hiểu hơn khi xử lý. Theo ý kiến cá nhân của mình thì mình khuyên các bạn nên dùng cách này.

   **Cách 3**: MovieRepositoryImpl xử lý một phần logic như cách 2, tuy nhiên response trả về thuộc kiểu Result. nên đến viewModel sẽ check xem result thực sự là Success or Error để tiến hành xử lý tiếp theo case mong muốn.
    
   Như vậy mình đã giới thiệu cho bạn cách để có thể kết hợp giữa Kotlin Coroutine và Retrofit để thay thế Rxjava trong việc gọi api. Hiện tại coroutine hãn còn đang thử nghiệm nên mong sao trong thời gian tới thì Jetbrain có thể cải thiện nhiều hơn nữa để Coroutine có thể được sử dụng hoàn toàn rộng rãi.
    
   Hẹn gặp lại các bạn trong các bài tiếp theo.