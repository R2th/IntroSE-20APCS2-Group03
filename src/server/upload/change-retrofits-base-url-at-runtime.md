## Giới thiệu.
[Square Team](https://square.github.io/) đóng góp cho cộng đồng phát triển ứng dụng Android một công cụ để dễ dàng thực hiện, quản lý các HTTP requests cho ứng của mình đó là Retrofit.
Với khả năng tùy biến cao, Android Developers hoàn toàn có thể tùy biến Retrofit nhằm adapt được Retrofit với Network Module trong ứng dụng của mình, cũng như adapt được với những đòi hỏi cho những phiên giao tiếp từ phía server.
Chính vì vậy, Android Retrofit được coi là thư viện networking được sử dụng phổ biến nhất trong cộng đồng lập trình ứng dụng Android.
Một trong những công cụ đi kèm siêu tiện ích đó chính là Okhttp(một HTTP client). Thông qua Okhttp, người dùng hoàn toàn có thể custom lại những HTTP requests của mình nhằm đáp ứng được những đòi hỏi cho những phiên giao tiếp giữa ứng dụng Android với phía server.
Android Developers có thể thiết lập cơ chế logging cho quá trình phát triển; custom headers(Thiết lập cơ chế giao tiếp, loại dữ liệu(content-type), cơ chế encode/decode data, cơ chế bảo mật, ...); thay đổi hẳn HTTP request method, host, hay thậm chí là cả các params đã được thiết lập từ origin HTTP request từ trước.
Tất cả những điều này hoàn toàn có thể được thực hiện bằng cách tùy biến rồi thêm vào Okhttp những Interceptors tùy biến đó cho những mục đích của mình.

Chắc hẳn đối với những Android Developers, các bạn không mấy xa lạ với những đoạn mã nguồn nhằm thiết lập mặc định những thông số trong header của tất cả các HTTP request của mình như: Content-Type, Authorization,... hoặc thêm header/body các giá trị mặc định khác như: OS-Name, OS-Version,... và đã phần nào hình dung ra được cơ chế custom lại các HTTP requests thông qua Interceptor.
Về mặt lý thuyết, Interceptor có thể hiểu đơn giản là kẻ đánh chặn. Đánh chặn tất cả các requests được gửi đi, tùy biến nó theo mục đích riêng, gửi đi, rồi nhận lại responses theo đúng kì vọng.
Hôm nay, mình sẽ giới thiệu đến các bạn hai ứng dụng khác của Interceptor cho quá trình phát triển ứng dụng của mình đó là: MockInterceptor - nhằm giả lập kết quả trả về trong quá trình phát triển khi các real APIs từ phía server chưa được phát triển xong), và ChangeableBaseUrlInterceptor nhằm thay đổi **base_url**(host) cái đã thiết lập sẵn cho Retrofit từ trước.

## Change Retrofit's BASE_URL at runtime.
### 1. Mô tả bài toán.
Trong quá trình phát triển ứng dụng Client-Server cho Android, việc thay đổi các URL liên kết tới server là rất ít nhưng hoàn toàn vẫn có thể xảy ra. Điều này đòi hỏi ứng dụng của chúng ta phải tải về dữ liệu cấu hình các URL này trước khi thực hiện bất cứ requests nào khác tới server.
Thông thường để giải quyết được vấn đề này chúng ta phải tách công việc của mình ra thành hai giai đoạn:
1. Tải file cấu hình từ một server cố định(Không bao giờ thay đổi trong quá trình phát triển + triển khai ứng dụng).
2. Thay đổi Server URL theo file cấu hình ở giai đoạn 1 trước khi call bất cứ APIs nào khác.

Đối mặt với bài toán này, ngay lập tức chúng ta sẽ nghĩ đến một trong hai cách thức bên dưới:
1. Tạo ra hai đối tượng networking để thực hiện trong các giai đoạn riêng biệt.
2. Tạo ra đối tượng networking duy nhất có khả năng thay đổi base_url trong lúc thực thi.

Với cách thức thứ nhất(tạo ra 2 đối tượng networking khác nhau) sẽ làm cho việc triển khai mã nguồn của chúng ta trở nên rắc rối, cả về mặt triển khai mã nguồn, cũng như quản lý các request.
Đặc biệt là khi chúng ta cần phải cung cấp hai đối tượng networking này gần như là cùng lúc, điều này dẫn đến đối tượng thứ 2 gần như được khởi tạo cùng lúc với đối tượng đầu tiên, nếu sử dụng retrofit + một dependency injection thì gần như chúng ta vẫn phải gán một base_url cho việc call APIs(không phải lấy cấu hình) cùng một lúc. Hay nói cách khác vẫn phải tìm cách để change base_url cho đối tượng networking thứ hai. Do đó có vẻ cách thức thứ hai sẽ khả thi hơn.

Với cách thức thứ hai, ý tưởng đầu tiên là chúng ta kì vọng Retrofit sẽ cung cấp sẵn một API để chúng ta chỉ việc call nó và rồi base_url sẽ tự động được thay đổi cho các lần call APIs sau đó. Nhưng các bạn có thể sẽ phải thất vọng ngay lập tức vì Retrofit vẫn chưa cung cấp một API như thế. Và vì thế chúng ta sẽ phải tìm cách khác.
Nếu đã từng google research thì các bạn sẽ thấy một suggestion là khởi tạo lại đối tượng này. Nó sẽ khá phức tạp nếu như chúng ta provide đối tượng networking của mình thông qua một Dependency Injection và nó được tạo + quản lý thông qua Dependency Injection đó.
VD: Bạn sẽ phải gán scope cho đối tượng đó, rồi gọi refresh các đối tượng theo scope đó lúc runtime để tạo ra một đối tượng retrofit theo base_url mới(Điều này là cần thiếu để tránh phải tạo lại tất cả các đối tượng đã được tạo + provide trong grah của Dependency Injection).
Vậy là cách change giá trị base_url thông qua Builder của Retrofit cũng là một giải pháp gây ra rắc rối lớn.
Rất may là chúng ta có thể tìm đến một công cụ khác mà Square cung cấp cùng Retrofit đó là Okhttp. Chúng ta có thể sử dụng Interceptor để chặn bắt các origin HTTP request từ Retrofit, thay đổi base_url(host), tổ chức lại request rồi gửi đi và nhận lại kết quả. :D

Phân tích như vậy có vẻ khá là khó hiểu và mình nghĩ giờ là lúc focus vào code để làm rõ hơn những luận điểm. Mình sẽ focus vào giải pháp sử dụng Interceptor(dĩ nhiên rồi) còn cách thức khác các bạn có thể tự thực hiện để có thêm trải nghiệm cũng như dữ liệu để so sánh.

### 2. Các bước thực hiện.
Okay. Mình sẽ đi ngay vào quá trình triển khai.

Đầu tiên bạn cần tạo ra một **ChangeableBaseUrlInterceptor** cái kế thừa **Interceptor** của Okhttp với nội dung như bên dưới:

```
class ChangeableBaseUrlInterceptor : Interceptor {

    /**
     * new base url with all path segments.
     */
    @Volatile
    private var newBaseUrl: String? = null

    /**
     * oldBaseUrl: URL which is set to Retrofit with method: Retrofit.Builder().baseUrl(oldBaseUrl)
     */
    @Volatile
    private var oldBaseUrl: String? = null

    @Volatile
    private var headersToRedact = emptySet<String>()

    /**
     * @param newBaseUrl: new URL with full Path Segments. ex: http://google.com/abc1/xyz1
     * @param oldBaseUrl: URL which is set to Retrofit with method: Retrofit.Builder().baseUrl(oldBaseUrl)
     */
    fun setApiDomain(newBaseUrl: String, oldBaseUrl: String) {
        this.newBaseUrl = newBaseUrl
        this.oldBaseUrl = oldBaseUrl
    }

    /**
     * retrieve old path params from origin request.
     * @param originRequest: request captured via interceptor.
     * @param oldBaseUrl: URL which is set to Retrofit with method: Retrofit.Builder().baseUrl(oldBaseUrl)
     * ex: origin request URL: https://google.com/abc?token=xyz
     * oldBaseUrl: https://google.com
     * => sParams = "abc?token=xyz"
     */
    private fun retrieveRequestParams(originRequest: Request): String? {
        var sParams: String? = null
        oldBaseUrl?.let {
            if (originRequest.url.toString().split(it).size > 1) {
                sParams = originRequest.url.toString().split(it)[1]
            }
        }
        return sParams
    }

    /**
     * retrieve http url with new base url and all path segments.
     * @param originRequest
     */
    private fun retrieveNewHttpUrl(originRequest: Request): HttpUrl? {
        val oldParams = retrieveRequestParams(originRequest)
        var httpUrlResult: HttpUrl? = null
        if (oldParams?.isNotBlank() == true && newBaseUrl?.isNotBlank() == true) {
            httpUrlResult = if (newBaseUrl?.endsWith("/") == true) {
                "$newBaseUrl$oldParams".toHttpUrlOrNull()
            } else {
                "$newBaseUrl/$oldParams".toHttpUrlOrNull()
            }
            Timber.d("new URL: https://${httpUrlResult?.toUrl()?.host}${httpUrlResult?.toUrl()?.path}")
        }
        return httpUrlResult
    }

    /**
     * clear new API domain => Retrofit will be request with origin base url.
     */
    fun clearApiDomain() {
        newBaseUrl = null
        oldBaseUrl = null
    }

    @Throws(IOException::class)
    @lombok.Generated
    override fun intercept(chain: Interceptor.Chain): okhttp3.Response {
        var request = chain.request()

        retrieveNewHttpUrl(request)?.let {
            val oldUrl = request.url
            request = request.newBuilder().url(it).build()
            HttpLoggingInterceptor.Logger.DEFAULT.log("--> Change request from $oldUrl to $it")
            logRequest(chain)
        }
        return chain.proceed(request)
    }
}
```

Đến đây có vẻ rõ ràng hơn chút rồi đúng ko nào? Chúng ta sẽ chặn lại request, thay đổi URL của nó, rồi tiếp tục chuyển request đi tới một server mới(theo file cấu hình).

Với mỗi lần nhận được intercept callback từ Okhttp, chúng ta sẽ tạo ra một HttpUrl với base url mới cùng với tất cả các path segments đã được truyền vào origin request bằng phương thức:

```
private fun retrieveNewHttpUrl(originRequest: Request): HttpUrl? {
    val oldParams = retrieveRequestParams(originRequest)
    var httpUrlResult: HttpUrl? = null
    if (oldParams?.isNotBlank() == true && newBaseUrl?.isNotBlank() == true) {
        httpUrlResult = if (newBaseUrl?.endsWith("/") == true) {
            "$newBaseUrl$oldParams".toHttpUrlOrNull()
        } else {
            "$newBaseUrl/$oldParams".toHttpUrlOrNull()
        }
        Timber.d("new URL: https://${httpUrlResult?.toUrl()?.host}${httpUrlResult?.toUrl()?.path}")
    }
    return httpUrlResult
}
```

Để ý kĩ phương thức này các bạn sẽ thấy chúng ta cần kết hợp base url mới(newBaseUrl) với lại các path segments là các params truyền vào url lúc tạo các phương thức HTTP request trong API Service của Retrofit.
Ví dụ bạn định nghĩa một HTTP request như sau:

```
@POST("SWFR010450.seam")
fun getInvitationsAsync(
    @Query("sort") sortFlg: String?,
    @Body invitationRequest: InvitationRequest
): Deferred<NetworkResponse<InvitationResponse, ErrorResponse>>
```

Thì bạn sẽ có link trên url dạng: https://danhdue.com/SWFR010450.seam?sort=abc với **https://danhdue.com** là base url, và **SWFR010450.seam?sort=abc** là các tham số truyền vào url gọi là path segments.

Và để lấy được các path segments này ta sử dụng method sau:

```
/**
 * retrieve old path params from origin request.
 * @param originRequest: request captured via interceptor.
 * @param oldBaseUrl: URL which is set to Retrofit with method: Retrofit.Builder().baseUrl(oldBaseUrl)
 * ex: origin request URL: https://google.com/abc?token=xyz
 * oldBaseUrl: https://google.com
 * => sParams = "abc?token=xyz"
 */
private fun retrieveRequestParams(originRequest: Request): String? {
    var sParams: String? = null
    oldBaseUrl?.let {
        if (originRequest.url.toString().split(it).size > 1) {
            sParams = originRequest.url.toString().split(it)[1]
        }
    }
    return sParams
}
```

Như vậy ở đây các bạn đã có thể hiểu được rằng lý do tại sao chúng ta cần truyền baseUrl cũ vào interceptor này rồi chứ?
Chính là để bóc tách các path segments chứa trong URL được chúng ta thêm vào mỗi phương thức HTTP request trong API Service đúng không nào?

Và cuối cùng là apply HttpUrl mới này cho request và forward request này đi:

```
retrieveNewHttpUrl(request)?.let {
    val oldUrl = request.url
    request = request.newBuilder().url(it).build()
    HttpLoggingInterceptor.Logger.DEFAULT.log("--> Change request from $oldUrl to $it")
    logRequest(chain)
}
return chain.proceed(request)
```

Đến đây, về cơ bản là chúng ta đã thực hiện xong việc chặn bắt và thay đổi URL cho các requests phát ra từ Retrofit.

**Chú ý**: Về cơ bản ở đây chúng ta chỉ thay đổi url của HTTP request vì thế chúng ta chủ yếu quan tâm tới những giá trị được add vào url(là các path segments) thôi. Còn lại các params khác được truyền vào header, body sẽ không thay đổi.

Ngoài ra, trong quá trình debug, nếu chúng ta muốn nhìn thấy logs để nhận biết được đúng request + response trả về(Một cách thức để hiểu rõ những gì đang xảy ra. :D) thì bạn có thể study thêm **HttpLoggingInterceptor** và custom cho **ChangeableBaseUrlInterceptor** của mình. Mã nguồn cho các methods show log còn lại như **logRequest(chain)** bạn có thể tìm thấy ở đây: [Github](https://github.com/DanhDue/AndroidGenericAdapter)

## Bonus: Mock(giả lập) kết quả trả về.
Một trong những ứng dụng tuyệt vời khác của **Interceptor** trong Okhttp đó chính là mock dữ liệu trả về theo các APIs requests. Một việc làm cần thiết nếu như ứng dụng của bạn được phát triển song song với quá trình phát triển APIs của phía server.

```
class MockInterceptor(private val assets: AssetManager) : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {
        if (BuildConfig.DEBUG) {
            val uri = chain.request().url.toUri().toString()
            val responseString = when {
                uri.endsWith(SAMPLE_REQUEST) -> getJsonStringFromFile(assets, MOCK_SAMPLE_RESPONSE_FILE_NAME)
                else -> ""
            }

            return if (responseString.isNotEmpty()) {
                chain.proceed(chain.request())
                    .newBuilder()
                    .code(HTTP_OK)
                    .protocol(Protocol.HTTP_2)
                    .message(responseString)
                    .body(
                        responseString.toByteArray()
                            .toResponseBody("application/json".toMediaTypeOrNull())
                    )
                    .addHeader("content-type", "application/json")
                    .build()
            } else {
                chain.proceed(chain.request())
            }
        } else {
            //just to be on safe side.
            throw IllegalAccessError(
                "MockInterceptor is only meant for Testing Purposes and " +
                        "bound to be used only with DEBUG mode"
            )
        }
    }

    companion object {
        const val SAMPLE_REQUEST = "SWFR01011991.seam"
        const val MOCK_SAMPLE_RESPONSE_FILE_NAME = "SWFR01011991.json"
    }

}
```

Với **MockInterceptor** này, các bạn hoàn toàn có thể giả được tất cả các kiểu dữ liệu(Cái là kết quả mà các bạn mong muốn khi gọi một API bất kì). Thậm chí là cả các response lỗi theo các HTTP Response Code.
Nó sẽ là một công cụ hữu ích giúp chúng ta giảm bớt quá trình mock response trong mã nguồn, gây tốn kém efforts trong việc chỉnh sửa(host & handle logics) trong mã nguồn về sau nếu có API thật đúng ko nào?

## Kết luận.
Đến đây chúng ta có thể thấy Retrofit và các công cụ kèm theo của nó quả là bá đạo phải không nào. Chỉ cần study một xíu là chúng ta có thể custom lại các components nhằm tương thích với những yều cầu về networking trong dự án của chúng ta có phải không?
Mã nguồn bạn có thể đục khoét ở đây: [Github](https://github.com/DanhDue/AndroidGenericAdapter)
Clap, upvote, leave a comment nếu bài viết có ích đối với bạn.

{>;} Happy coding!