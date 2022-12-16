Suspend function bất đồng bộ trả về 1 giá trị, vậy làm thế nào để có thể trả về nhiều giá trị bất đồng bộ???

## 1. Định nghĩa

- Flow được xây dựng trên Coroutine.
- Có thể cung cấp và trả ra nhiều giá trị.
- Là 1 luồng dữ liệu ở luồng đó có thể tính toán bất đồng bộ.
- Giá trị được emit luôn phải cùng kiểu giá trị trả về.

## 2. Thành phần chính trong luồng dữ liệu (stream data)

- Producer (người cung cấp): cung cấp data được thêm vào luồng dữ liệu. Flow có thể cung cấp data bất đồng bộ. Hiểu đơn giản là khi bạn `emit()` giá trị vào Flow.
- Intermediaries (người trung gian): có thể sửa đổi giá trị được emit ở luồng stream. Ở đây có thể hiểu là những toán tử trung gian của `Flow` như `.map()`, `.catch()`, ....
- Consumer (người sử dụng): sử dụng value từ luồng stream. Hiểu đơn giản là khi bạn `collect()` Flow.

![](https://developer.android.com/images/kotlin/flow/flow-entities.png?authuser=3)

## 3. Hạn chế

- Flow chạy tuần tự.

    Ví dụ, Producer đang trong 1 coroutine, khi đang gọi 1 suspend function, Producer suspend cho đến khi suspend function trả về.

    ```kotlin
    class NewsRemoteDataSource(
        private val newsApi: NewsApi,
        private val refreshIntervalMs: Long = 5000
    ) {
        val latestNews: Flow<List<ArticleHeadline>> = flow {
            while(true) {
                val latestNews = newsApi.fetchLatestNews()
                emit(latestNews) // Emits the result of the request to the flow
                delay(refreshIntervalMs) // Suspends the coroutine for some time
            }
        }
    }

    // Interface that provides a way to make network requests with suspend functions
    interface NewsApi {
        suspend fun fetchLatestNews(): List<ArticleHeadline>
    }
    ```

    Ở ví dụ trên, Producer suspend cho đến khi `fetchLastedNew()` thực hiện request network thành công. Chỉ khi đó, thì kết quả mới được trả về trong luồng.

- Producer không thể emit 1 giá trị từ 1 Coroutine context khác.

**Note:** Không nên gọi emit khi ở 1 CoroutineContext khác bằng cách tạo mới 1 Coroutine hoặc sử dụng withContext {} trong code. 
Bạn có thể sử dụng Flow Builder (flow {}) khác như [callbackFlow](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/callback-flow.html) 

## 4. Sửa đổi luồng

- Có thể sử dụng các toán tử trung gian để sửa đổi luồng dữ liệu mà không làm ảnh hưởng đến giá trị được trả ở Producer.
- Các toán tử này thế là 1 hàm mà khi áp dụng vào luồng dữ liệu, set up 1 toán tử không được thực thi cho đến khi giá trị được lấy ra ở tương lai.
- Ví dụ:

    Ở ví dụ dưới đây, Repository sử dụng 1 toán tử trung gian là `.map()` để biến đổi data hiển thị ở View.

    ```kotlin
    class NewsRepository(
        private val newsRemoteDataSource: NewsRemoteDataSource,
        private val userData: UserData
    ) {
        /**
         * Returns the favorite latest news applying transformations on the flow.
         * These operations are lazy and don't trigger the flow. They just transform
         * the current value emitted by the flow at that point in time.
         */
        val favoriteLatestNews: Flow<List<ArticleHeadline>> =
            newsRemoteDataSource.latestNews
                // Intermediate operation to filter the list of favorite topics
                .map { news -> news.filter { userData.isFavoriteTopic(it) } }
                // Intermediate operation to save the latest news in the cache
                .onEach { news -> saveInCache(news) }
    }
    ```

    Toán tử trung gian có thể được áp dụng sau 1 toán tử trung gian khác, tạo thành 1 chuỗi được thực hiện 1 cách lazy khi 1 item được emit ở Flow.

## 5. Thu thập từ 1 luồng

- Sử dụng 1 toán tử terminal để trigger flow để bắt đầu lắng nghe giá trị. `.collect()` sử dụng để lấy được tất cả các giá trị trong luồng khi các giá trị đó được emit.
- `.collect()` là 1 suspend function, chúng cần được thực thi bên trong 1 coroutine. Chúng lấy 1 lambda như là 1 parameter dùng để call khi có giá trị mới được trả về.
- Ví dụ

    ```kotlin
    class LatestNewsViewModel(
        private val newsRepository: NewsRepository
    ) : ViewModel() {

        init {
            viewModelScope.launch {
                // Trigger the flow and consume its elements using collect
                newsRepository.favoriteLatestNews.collect { favoriteNews ->
                    // Update View with the latest favorite news
                }
            }
        }
    }
    ```

    Collect 1 Flow trigger đến Producer mà ở đó sẽ làm mới tin tức và emit kết quả từ network request trong 1 khoảng thời gian nhất định. Producer sẽ luôn hoạt động trong vòng lặp while(true), luồng dữ liệu sẽ bị đóng khi `ViewModel` được clear hoặc `viewModelScope` bị hủy.

- Flow collection có thể bị dừng bởi 1 số lý do:
    - Coroutine mà sử dụng collect bị hủy, giống ví dụ trên. Điều này cũng đồng nghĩa với việc nó sẽ dừng tất cả các Producer ở bên dưới.
    - Producer hoàn thành việc emit item. Trong trường hợp này, luồng dữ liệu được đóng và Coroutine mà được sử dụng collect tiếp tục thực hiện.
- Flow là cold và lazy trừ khi được chỉ định bởi các toán tử trung gian khác. Có nghĩa là code của Producer được thực thi khi toán tử Terminal được gọi trong flow.

## 6. Thực thi trong 1 CoroutineContext khác

- Mặc định, Producer của Flow builder thực thi trong CoroutineContext của Coroutine mà nó collect đến, và cũng như lưu ý trên, nó - producer không thể emit giá trị từ 1 Coroutine khác. Nhưng vẫn có 1 số usecase không mong muốn.
- Ở ví dụ ở trên, Repository layer không nên thực hiện các hoạt động trên `Dispatcher.Main` - được sử dụng ở `viewModelScope`.
- Để có thể thay đổi CoroutineContext của 1 Flow ⇒ sử dụng toán tử trung gian là `.flowOn()`.
- `.flowOn()`: Thay đổi CoroutineContext của luồng upstream - nghĩa là Producer hoặc bất cứ 1 toán tử trung gian nào được áp dụng trước (hoặc trên) `.flowOn()`. Downstream flow - nghĩa là những toán tử trung gian sau `.flowOn()` cùng với Consumer) không bị ảnh hưởng và thực thi trong CoroutineContext được sử dụng để collect từ flow. Nếu có nhiều toán tử `.flowOn()`, nó sẽ thay đổi 1 Upstream tính từ vị trí của nó.

## 7. Nguồn tham khảo
- [Kotlin flows on Android](https://developer.android.com/kotlin/flow)
- [Asynchronous Flow](https://kotlinlang.org/docs/flow.html)