Việc sử dụng Unit tests + Mock Webserver giúp chúng ta có thể test việc tích hợp retrofit, giảm rất nhiều thời gian
để tìm ra những lỗi có thể xảy ra với JSON parser.

Ở bài này mình sẽ chia sẻ cách để test retrofit converter với các phần sau:

- Coroutines cho async
- Mock api responses với Mockwebserver
- JSON parsing với Kotlin serialization

## Tại sao cần test network?

Để chắc chắn rằng việc tích hợp network là đúng và bạn có thể implement các phần khác của app như ui, logic mà
ko cần để ý tới nó nữa.

## Code

Giả sử chúng ta có rest interface sau

```kotlin
interface MoviesApi {
    @GET(NetworkConfig.DISCOVER_MOVIE_ENDPOINT)
    suspend fun fetchPopularMovies(): PaginatedResponse<MovieDTO>
}
```

và network datasource theo đúng chuẩn mô hình

```kotlin
class MoviesNetworkDataSource @Inject constructor(
    private val moviesApi: MoviesApi
) : MoviesDataSource {
    override suspend fun fetchMovies() = moviesApi.fetchPopularMovies()
}
```

Đầu tiên, chúng ta sẽ test trường hợp đơn giản nhất là khi response 200, và chúng ta có thể parse JSON thành DTO data class

```kotlin
@ExperimentalCoroutinesApi
@ExperimentalSerializationApi
class MoviesNetworkDataSourceTest {
    private val mockWebServer = MockWebServer()

    private val client = OkHttpClient.Builder()
        .connectTimeout(1, TimeUnit.SECONDS)
        .readTimeout(1, TimeUnit.SECONDS)
        .writeTimeout(1, TimeUnit.SECONDS)
        .build()

    private val api = Retrofit.Builder()
        .baseUrl(mockWebServer.url("/"))
        .client(client)
        .addConverterFactory(defaultConverter(isLenient = true))
        .build()
        .create(MoviesApi::class.java)

    private val sut = MoviesNetworkDataSource(api)

    @After
    fun tearDown() {
        mockWebServer.shutdown()
    }

    @Test
    fun `should fetch movies correctly given 200 response`() {
        mockWebServer.enqueueResponse("discover-movies-200.json", 200)

        runBlocking {
            val actual = sut.fetchMovies()

            val expected = listOf(
                movieDTO(
                    id = "464052",
                    overview = "Wonder Woman comes into...",
                    title = "Wonder Woman 1984",
                    voteAverage = 7.2,
                    posterPath = "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg"
                )
            ).toPaginatedResponse()

            assertEquals(expected, actual)
        }
    }
}
```

Cùng quan sát hành vi test thay vì chi tiết implement nhé, với code trên thì chúng ta có thể thay đổi JSON converter về sau mà ko cần thay đổi code test.

Chúng ta sử dụng một file JSON để thể hiện response thành công, các bạn thêm file vào folder "resources" ở
package test nhé

Chúng ta đăng ký một response mới với http code 200 và nội dung response đc định nghĩa trong file JSON, khi call fun `enqueueResponse()` thì đây là cái cúng ta thực sự thực hiện

```kotlin
internal fun MockWebServer.enqueueResponse(fileName: String, code: Int) {
    val inputStream = javaClass.classLoader?.getResourceAsStream("api-response/$fileName")

    val source = inputStream?.let { inputStream.source().buffer() }
    source?.let {
        enqueue(
            MockResponse()
                .setResponseCode(code)
                .setBody(source.readString(StandardCharsets.UTF_8))
        )
    }
}
```

Hàm này set mock web server thông tin http code và body của response tiếp theo.

Sau mỗi test case chúng ta thực hiện tắt web server

```kotlin
@After
fun tearDown() {
    mockWebServer.shutdown()
}
```

Như vậy là xong. Giờ chúng ta có thể kiểm tra việc parse dữ liệu có đúng không cũng như là việc config retrofit và converter chạy chuẩn như chúng ta muốn.

các bạn có thể tham khảo sample code ở đây https://github.com/horowitz/openMovie

## Nguồn

https://proandroiddev.com/testing-retrofit-converter-with-mock-webserver-50f3e1f54013