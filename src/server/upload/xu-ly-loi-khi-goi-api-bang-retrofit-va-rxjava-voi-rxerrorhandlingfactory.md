# Mở đầu
Hiện nay chúng ta thường sử dụng [retrofit](https://square.github.io/retrofit/) và [rxjava](https://github.com/ReactiveX/RxJava) để làm việc với Api service. Khi mà chạy app thực tế thì hầu hết chúng ta mới thường **chỉ xử lý case "ngon"** là **gọi api success và không bị lỗi gì**. Tuy nhiên đời không như là mơ và việc ứng dụng **gọi api bị lỗi là việc quá bình thường** và có nhiều bạn lại **không hề để ý** đến việc **xử lý lỗi như thế nào cho gọn và có UX tốt**. 

> Vì vậy hôm nay mình sẽ giới thiệu đến các bạn một cách đơn giản nhất để xử lý lỗi khi gọi api bằng `retrofit` và `rxjava` với `RxErrorHandlingCallAdapterFactory`

# Tiến hành

Theo mô hình `MVVM` thì chúng ta thường sẽ gọi api bằng các `RepositoryImpl` ở trong `ViewModel`. Khi xảy ra lỗi thì chúng ta cần thực hiện theo 2 bước chính
> Bước 1: Bắt lỗi và tiền xử lý lỗi trong CallAdapterFactory
>
> Bước 2: Xử lý lỗi trong ViewModel

Chúng ta cùng đi vào tìm hiểu từng bước nhé :grinning:

## Bước 1: Bắt lỗi và tiền xử lý lỗi trong CallAdapterFactory

### Để bắt lỗi chúng ta cần có gì?

- Thêm `RxErrorHandlingCallAdapterFactory` khi tạo `retrofit`

```kotlin
val networkModule = module {
    ...
    single { RxErrorHandlingCallAdapterFactory() }
}

fun createAppRetrofit(
    okHttpClient: OkHttpClient,
    rxErrorHandlingCallAdapterFactory: RxErrorHandlingCallAdapterFactory
): Retrofit =
    Retrofit.Builder()
        .addCallAdapterFactory(rxErrorHandlingCallAdapterFactory) // rxErrorHandlingFactory
        .addConverterFactory(GsonConverterFactory.create())
        .baseUrl(BuildConfig.BASE_URL)
        .client(okHttpClient)
        .build()
```

## Tiền xử lý lỗi trong CallAdapterFactory
Quá trình tiền xử lý lỗi yêu cầu chúng ta cần lấy ra được các thành phần sau
- `httpCode`: 401, 500, ... 
- `ServerErrorResponse`: response lỗi server trả về từ đó có thể lấy ra thông tin cần thiết như các message lỗi để hiển thị
- `BaseException`: chứa đầy đủ các thông tin về error

Thực hiện tiền xử lý lỗi thông qua `RxErrorHandlingCallAdapterFactory`

https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/data/remote/RxErrorHandlingCallAdapterFactory.kt

```kotlin
package com.example.moviedb.data.remote

import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import io.reactivex.*
import io.reactivex.functions.Function
import retrofit2.*
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import java.io.IOException
import java.lang.reflect.Type

class RxErrorHandlingCallAdapterFactory : CallAdapter.Factory() {

    private val instance = RxJava2CallAdapterFactory.createAsync()

    override fun get(
        returnType: Type,
        annotations: Array<Annotation>,
        retrofit: Retrofit
    ): CallAdapter<*, *>? =
        RxCallAdapterWrapper(
            retrofit,
            instance.get(returnType, annotations, retrofit) as CallAdapter<Any, Any>
        )
}

class RxCallAdapterWrapper<R>(
    private val retrofit: Retrofit,
    private val wrapped: CallAdapter<R, Any>
) : CallAdapter<R, Any> {

    override fun responseType(): Type = wrapped.responseType()

    override fun adapt(call: Call<R>): Any {
        val result = wrapped.adapt(call)
        return when (result) {
            is Single<*> -> {
                result.onErrorResumeNext(Function<Throwable, SingleSource<Nothing>> { throwable ->
                    Single.error(convertToBaseException(throwable))
                })
            }

            is Observable<*> -> {
                result.onErrorResumeNext(Function<Throwable, ObservableSource<Nothing>> { throwable ->
                    Observable.error(convertToBaseException(throwable))
                })
            }

            is Completable -> {
                result.onErrorResumeNext { throwable ->
                    Completable.error(convertToBaseException(throwable))
                }
            }

            is Flowable<*> -> {
                result.onErrorResumeNext(Function<Throwable, Flowable<Nothing>> { throwable ->
                    Flowable.error(convertToBaseException(throwable))
                })
            }

            is Maybe<*> -> {
                result.onErrorResumeNext(Function<Throwable, Maybe<Nothing>> { throwable ->
                    Maybe.error(convertToBaseException(throwable))
                })
            }

            else -> result
        }
    }

    private fun convertToBaseException(throwable: Throwable): BaseException =
        when (throwable) {
            is BaseException -> throwable

            is IOException -> BaseException.toNetworkError(throwable)

            is HttpException -> {
                val response = throwable.response()
                val httpCode = throwable.code().toString()

                if (response.errorBody() == null) {
                    BaseException.toHttpError(
                        httpCode = httpCode,
                        response = response
                    )
                }

                val serverErrorResponseBody = try {
                    response.errorBody()?.string() ?: ""
                } catch (e: Exception) {
                    ""
                }

                val serverErrorResponse =
                    try {
                        Gson().fromJson(serverErrorResponseBody, ServerErrorResponse::class.java)
                    } catch (e: Exception) {
                        ServerErrorResponse()
                    }

                if (serverErrorResponse != null) {
                    BaseException.toServerError(
                        serverErrorResponse = serverErrorResponse,
                        httpCode = httpCode
                    )
                } else {
                    BaseException.toHttpError(
                        response = response,
                        httpCode = httpCode
                    )
                }
            }

            else -> BaseException.toUnexpectedError(throwable)
        }
}

class BaseException(
    val errorType: ErrorType,
    val serverErrorResponse: ServerErrorResponse? = null,
    val response: Response<*>? = null,
    val httpCode: String = "",
    cause: Throwable? = null
) : RuntimeException(cause?.message, cause) {

    override val message: String?
        get() = when (errorType) {
            ErrorType.HTTP -> response?.message()

            ErrorType.NETWORK -> cause?.message

            ErrorType.SERVER -> serverErrorResponse?.message // TODO update real response

            ErrorType.UNEXPECTED -> cause?.message
        }

    companion object {
        fun toHttpError(response: Response<*>, httpCode: String) =
            BaseException(
                errorType = ErrorType.HTTP,
                response = response,
                httpCode = httpCode
            )

        fun toNetworkError(cause: Throwable) =
            BaseException(
                errorType = ErrorType.NETWORK,
                cause = cause
            )

        fun toServerError(serverErrorResponse: ServerErrorResponse, httpCode: String) =
            BaseException(
                errorType = ErrorType.SERVER,
                serverErrorResponse = serverErrorResponse,
                httpCode = httpCode
            )

        fun toUnexpectedError(cause: Throwable) =
            BaseException(
                errorType = ErrorType.UNEXPECTED,
                cause = cause
            )
    }
}

/**
 * Identifies the error type which triggered a [BaseException]
 */
enum class ErrorType {
    /**
     * An [IOException] occurred while communicating to the server.
     */
    NETWORK,

    /**
     * A non-2xx HTTP status code was received from the server.
     */
    HTTP,

    /**
     * A error server with code & message
     */
    SERVER,

    /**
     * An internal error occurred while attempting to execute a request. It is best practice to
     * re-throw this exception so your application crashes.
     */
    UNEXPECTED
}

// TODO update server error response
data class ServerErrorResponse(
    @SerializedName("message") val message: String? = null
)
```

## Bước 2: Xử lý lỗi trong ViewModel

Cách tốt nhất để xử lỹ lỗi trong `viewModel` là có một hàm xử lý lỗi ở `BaseViewModel`, hàm nay bắn ra các event tương ứng để bạn observe bên view (activity hay fragment), hoặc bạn cũng có thể overide tuỳ theo case thực tế mình muốn.

BaseViewModel https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/base/BaseViewModel.kt

```kotlin
abstract class BaseViewModel : ViewModel() {
    val isLoading = MutableLiveData<Boolean>().apply { value = false }
    val errorMessage = MutableLiveData<String>()
    
    val noInternetConnectionEvent = SingleLiveEvent<Unit>()
    val connectTimeoutEvent = SingleLiveEvent<Unit>()
    
    ...

    open fun onLoadFail(throwable: Throwable) {
        when (throwable.cause) {
            is UnknownHostException -> {
                noInternetConnectionEvent.call()
            }
            is SocketTimeoutException -> {
                connectTimeoutEvent.call()
            }
            else -> {
                when (throwable) {
                    is BaseException -> {
                        when (throwable.httpCode) {
                            // custom server error code
                            else -> {

                            }
                        }
                    }
                    else -> {
                        errorMessage.value = throwable.message
                    }
                }
            }
        }
        isLoading.value = false
    }
}
```

Sử dụng với các `ViewModel`

```kotlin
class UserViewModel (
    val movieRepository: MovieRepository
) : BaseViewModel() {

    fun getUser() {
        addDisposable(
            userRepository.getUser()
                .subscribe({
                    user.value = it
                }, {
                    onLoadFail(it)
                })
        )
    }
}
```

Observe event ở View

```kotlin
abstract class BaseFragment :  Fragment() {
    
    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        ...
        noInternetConnectionEvent.observe(viewLifecycleOwner, Observer {
               // handle no internet connection
        })
        connectTimeoutEvent.observe(viewLifecycleOwner, Observer {
            // handle connection timout
        })
    }
}
```

Như vậy mình đã hướng dẫn cho các bạn cách đơn giản nhất để xử lý lỗi khi gọi api bằng `retrofit` và `rxjava` với `RxErrorHandlingCallAdapterFactory`, tuỳ trường hợp cụ thể các bạn có thể custom theo ý của mình.



![](https://images.viblo.asia/aa4b3f5e-1540-433c-9ea5-d806a6fa4480.png) Nếu bạn thấy bài viết có ích nhé, hẹn gặp lại các bạn trong các bài tiếp theo :grinning: