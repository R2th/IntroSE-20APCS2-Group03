## 1. Đặt vấn đề

Trong các dự án Android cần làm việc với API, chúng ta thường sử dụng thư viện Retrofit. Ngoài việc cung cấp các phương thức request API, Retrofit còn cung cấp một giao diện làm việc với các thư viện serialization/deserialization (như Gson, Jackson, Moshi...) hỗ trợ việc chuyển đổi response của API từ dạng text về dạng object model trong Java/Kotlin và ngược lại để truyền trong request body.

Tuy nhiên, để Retrofit có thể làm được việc này ta cần cung cấp cho nó một đối tượng Converter Factory. Retrofit cung cấp sẵn một số Converter Factory để làm việc được với JSON và XML. Nhưng, trong một số trường hợp ta cần làm việc với response ở cả 2 dạng XML và JSON thì sao ? Trong bài viết này mình sẽ đưa ra một cách để giúp Retrofit có thể làm việc được với cả 2 dạng này nhé.

## 2. Converter Factory trong Retrofit

Để khởi tạo một đối tượng Retrofit, ta cần dùng cú pháp như sau.
```kotlin
Retrofit.Builder()
    .baseUrl(HOST_NAME)
    .client(okHttpClient)
    .addConverterFactory(converterFactory)
    .build()
```

Bỏ qua các phần râu ria, hãy để ý đến phương thức `addConverterFactory`. Phương thức này cho phép thêm một converter factory mới vào danh sách converter factory của Retrofit. Vậy thì tại sao lại không add 2 converter factory vào như thế này ?

```kotlin
Retrofit.Builder()
    .baseUrl(HOST_NAME)
    .client(okHttpClient)
    .addConverterFactory(jsonConverterFactory)
    .addConverterFactory(xmlConverterFactory)
    .build()
```

Nhìn thì rất hợp lý nhưng vấn đề là khi Retrofit tạo Converter nó chỉ được sử dụng 1 converter factory mà thôi. Để ý lớp `Converter.Factory` của Retrofit ta sẽ thấy 2 phương thức dưới đây.
```java
    public @Nullable Converter<ResponseBody, ?> responseBodyConverter(
        Type type, Annotation[] annotations, Retrofit retrofit)

    public @Nullable Converter<?, RequestBody> requestBodyConverter(
        Type type,
        Annotation[] parameterAnnotations,
        Annotation[] methodAnnotations,
        Retrofit retrofit)
```

Trong trường hợp `jsonConverterFactory.responseBodyConverter()` trả về null thì nó mới dùng đến `xmlConverterFactory.responseBodyConverter()`. Như vậy nếu bình thường thì Retrofit chỉ dùng duy nhất Converter Factory đầu tiên được add.

**Do vậy, ta sẽ cần phải sử dụng 1 Converter Factory duy nhất cho Retrofit !**

## 3. Ý tưởng về một AutoTypeConverterFactory

Vấn đề mấu chốt là phải làm sao để Converter Factory nhận ra được API nào sử dụng JSON, API nào thì trả về XML để trả về Converter tương ứng. Nó không thể đợi response trả về rồi mới kiểm tra được, cũng không thể kiểm tra kiểu của model response/request body vì số lượng model là rất lớn. Cách tốt hơn cả là sử dụng Annotation cho các method request của interface API Service.

Với các request/response body kiểu JSON ta sẽ sử dụng annotation `@JsonType` còn với kiểu XML thì là `@XmlType`. Có lẽ đó là cách hoàn hảo nhất. Ta luôn biết với từng API thì kiểu truyền đi và trả về là dạng nào.

Vấn đề xác định kiểu trả về/truyền đi của API đã xong. Giờ đến phần làm sao để Converter Factory tự động nhận diện từng kiểu để trả về converter phù hợp.

Quay trở lại nội dung class Converter.Factory với 2 method quan trọng nhất:
```java
    public @Nullable Converter<ResponseBody, ?> responseBodyConverter(
        Type type, Annotation[] annotations, Retrofit retrofit)

    public @Nullable Converter<?, RequestBody> requestBodyConverter(
        Type type,
        Annotation[] parameterAnnotations,
        Annotation[] methodAnnotations,
        Retrofit retrofit)
```
Trong phương thức `responseBodyConverter` ta thấy có tham số `annnotations`. Tham số `annotations` sẽ trả về một mảng các annotation được sử dụng với từng phương thức trong API Service. Bây giờ do ta thêm annotation là  `@JsonType` hoặc `@XmlType` nên chúng cũng nằm trong mảng này luôn. Bằng việc kiểm tra tham số `annotations` chứa annotation `@JsonType` hay `@XmlType` ta sẽ xác định được converter nào cần dùng.

Với phương thức `requestBodyConverter` thì cũng tương tự như vậy nhưng tham số cần kiểm tra sẽ là `parameterAnnotations` vì đây là tham số cho params được truyền trong request body.

Bằng việc dùng 1 Converter Factory và kiểm tra annotation, ta sẽ biết được lúc nào cần sử dụng converter nào và trả về converter tương ứng.

## 4. Bắt tay vào code

Mình sẽ ví dụ bằng Kotlin nhé. Đầu tiên cần định nghĩa 2 annotation class:
```kotlin
@Target(AnnotationTarget.FUNCTION, AnnotationTarget.VALUE_PARAMETER)
@Retention(AnnotationRetention.RUNTIME)
annotation class JsonType

@Target(AnnotationTarget.FUNCTION, AnnotationTarget.VALUE_PARAMETER)
@Retention(AnnotationRetention.RUNTIME)
annotation class XmlType
```
Giải thích qua:
- **`@Target(AnnotationTarget.FUNCTION)`**: Annotation chỉ được gắn vào một hàm/phương thức.
- **`@Target(AnnotationTarget.VALUE_PARAMETER)`**: Annotation chỉ được gắn vào  tham số một hàm/phương thức.
- **`@Retention(AnnotationRetention.RUNTIME)`**: Annotation có hiệu lực trong thời gian Runtime, không ảnh hưởng lúc Compile.

Trong API Service interface chỉ cần dùng thế này:

```kotlin
@XmlType
@GET("...")
fun getUser(): UserResponse

@POST("...")
fun postComment(@JsonType comment: Comment): ResultResponse
```

Giờ là nhân vật chính: **AutoTypeConverterFactory** 

```kotlin
class AutoTypeConverterFactory(
    private val jsonFactory: Converter.Factory,
    private val xmlFactory: Converter.Factory
) : Converter.Factory() {

    private fun getFactory(annotations: Array<Annotation?>) =
        when (annotations.firstOrNull { it is JsonType || it is XmlType }) {
            is XmlType ->  xmlFactory
            is JsonType ->  jsonFactory
            else -> jsonFactory
        }

    @Nullable
    override fun responseBodyConverter(
        type: Type,
        annotations: Array<Annotation?>,
        retrofit: Retrofit
    ): Converter<ResponseBody, *>? {
        return getFactory(annotations).responseBodyConverter(type, annotations, retrofit)
    }

    @Nullable
    override fun requestBodyConverter(
        type: Type,
        parameterAnnotations: Array<Annotation?>,
        methodAnnotations: Array<Annotation?>,
        retrofit: Retrofit
    ): Converter<*, RequestBody>? {
        return getFactory(parameterAnnotations)
            .requestBodyConverter(type, parameterAnnotations, methodAnnotations, retrofit)
    }
}
```

Trong mỗi phương thức, `AutoTypeConverterFactory` sẽ luôn kiểm tra annotions để lấy factory tương ứng và gọi phương thức converter factory. Ví dụ khi mình dùng JSON Converter Factory là **Gson**, XML Converter Factory là **TikXml** thì có thể khởi tạo `AutoTypeConverterFactory` như sau:
```kotlin
val converterFactory = AutoTypeConverterFactory(
    jsonFactory = GsonConverterFactory.create(),
    xmlFactory = TikXmlConverterFactory.create()
)
```

Và nhét nó vào trong Retrofit Builder như một converter factory thông thường:
```kotlin
Retrofit.Builder()
    .baseUrl(HOST_NAME)
    .client(okHttpClient)
    .addConverterFactory(converterFactory)
    .build()
```

Như vậy là đã xong. Bây giờ Retrofit đã sẵn sàng để một lúc cân 2 kiểu API.

##  5. Kết luận

Qua bài viết này, mình đã chia sẻ cách để áp dụng song song nhiều kiểu response/request body khác nhau đồng thời cũng đã giải thích tương đối chi tiết về Converter Factory trong Retrofit. Nếu có bất kỳ góp ý hay thắc mắc gì hãy gửi vào phần bình luận nhé.

Happy coding !!

Nguồn: [https://phucynwa.com/android/cach-de-retrofit-lam-viec-dong-thoi-duoc-voi-cac-api-dang-json-va-xml/](https://phucynwa.com/android/cach-de-retrofit-lam-viec-dong-thoi-duoc-voi-cac-api-dang-json-va-xml/)