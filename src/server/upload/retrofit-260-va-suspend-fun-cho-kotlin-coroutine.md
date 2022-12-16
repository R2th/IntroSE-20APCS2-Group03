Trước đây mình đã có bài giới thiệu cách kết hợp `retrofit` với `coroutine`:

https://viblo.asia/p/ket-hop-kotlin-coroutine-va-retrofit-trong-call-api-Az45bxbNZxY

### Retrofit < 2.6.0

Một chút tóm tắt:

```css:kotlin
implementation('com.jakewharton.retrofit:retrofit2-kotlin-coroutines-experimental-adapter:1.0.0')
```

```scala:kotlin
    @GET("/movie/{id}")
    fun getMovie(@Path("id") id: String): Deferred<Movie>
```

Và để nhận được kết quả cuối cùng thì cần gọi `await()`

Tuy nhiên retrofit 2.6.0 đã release và chính thức support `suspend fun`

### Retrofit >= 2.6.0

```python:kotlin
implementation("com.squareup.retrofit2:retrofit:2.6.0")
```

Giờ đây bạn có thể thêm `suspend` và bỏ `Deferred` trong định nghĩa fun của `ApiService`

```scala:kotlin
    @GET("/movie/{id}")
    suspend fun getMovie(@Path("id") id: String): Movie
```

Và khi đó thì những nơi bạn cần kết quả như `repository` hay `viewModel` sẽ không cần phải gọi tới `await()` nữa, retrofit sẽ làm điều đó cho bạn.

Lưu ý là bạn cần remove đoạn code sau khỏi chỗ khởi tọa Retrofit
```python:kotlin
.addCallAdapterFactory(CoroutineCallAdapterFactory())
```

Code tham khảo tại đây:

https://github.com/dangquanuet/The-Movie-DB-Kotlin/commit/c0f2635d68e0a2306136cf17fbe07f24c56fe7eb