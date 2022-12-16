Trong quá trình làm dự án Android chắc bạn đã từng gặp phải trường hợp khi server chưa kịp làm xong mà mình thì muốn dựng giao diện lên xem trước. Gặp trường hợp như này thì bạn có thể dùng mock API server, hoặc chính server của bên bạn sẽ mock tạm dữ liệu trả về cho client. 

Hôm nay mình xin giới thiệu cho các bạn một cách nữa để làm mock api response mà chỉ cần code ở client mà thôi.

Khi sử dụng Retrofit để request API thì các bạn sẽ khởi tạo `ApiService` như sau:

```kotlin
fun createApiService(retrofit: Retrofit): ApiService {
    return retrofit.create(ApiService::class.java)
}
```

Khi muốn thêm mock api response cho client thì bạn thêm 1 flavor mock vào `build.gradle` như sau:

```kotlin
productFlavors {
        dev {
            buildConfigField "boolean", "MOCK_DATA", "false"
        }

        // add this flavor
        mock {
            buildConfigField "boolean", "MOCK_DATA", "true"
        }

        prd {
            buildConfigField "boolean", "MOCK_DATA", "false"
        }
    }
```

Khi đó bạn sửa lại phần khởi tạo `ApiService` như sau:

```kotlin
fun createApiService(retrofit: Retrofit): ApiService {
    return if (BuildConfig.MOCK_DATA) MockApi()
    else retrofit.create(ApiService::class.java)
}
```

Với class MockApi được định nghĩa như sau:

```kotlin
class MockApi : ApiService {

    override fun getMovieList(hashMap: HashMap<String, String>): Single<GetMovieListResponse> {
        // TODO return movie list
    }

    override fun getMovieDetail(hashMap: HashMap<String, String>): Single<Movie> {
        // TODO return movie detail
    }

    override fun getTvList(hashMap: HashMap<String, String>): Deferred<GetTvListResponse> {
        // TODO return tv list
    }

}
```

**Lưu ý**: code dưới đây mình có dùng [Koin làm DI lib](https://viblo.asia/p/goodbye-dagger-hello-koin-OeVKByb25kW), [Kotlin Gradle KTS](https://viblo.asia/p/nang-cap-app-android-len-gradle-kotlin-dsl-10-RQqKLvr6l7z), [Coroutines và Retrofit](https://viblo.asia/p/ket-hop-kotlin-coroutine-va-retrofit-trong-call-api-Az45bxbNZxY) nên có thể các bạn sẽ thấy cú pháp hơi lạ, nhưng không sao, bạn hiểu tư tưởng thực hiện là có thể tự làm được rồi.

Minh hoạ bước thêm flavor mock. Sau khi sync lại gradle thì chúng ta sẽ có thêm lựa chọn trong Build Variant. Nếu muốn nhận response từ class MockApi thì các bạn chọn variant mock.

![](https://images.viblo.asia/8a1d6250-26fc-421f-98e4-67a37ebf587c.png)

Khi đó chúng ta sẽ có file BuildConfig như sau và ApiService sẽ lấy response từ MockApi do MOCK_DATA == true, đúng theo ý định chúng ta muốn ban đầu.

![](https://images.viblo.asia/144c2c85-0c1c-49ca-be1f-7eca88a40c52.png)


Các bạn có thể tham khảo commit của mình ở link sau: 
https://github.com/dangquanuet/The-Movie-DB-Kotlin/commit/3b93966337edb496621c0c7ffe48f60544676c6a

Có thắc mắc gì các bạn cứ comment trao đổi nhé.

Nếu thấy bài viết hữu ích thì các bạn hãy **up vote** để mình có thêm động lực viết tiếp.

Xin chào và hẹn gặp lại trong các bài sau.