Nối tiếp [phần 1](https://viblo.asia/p/idiomatic-kotlin-phan-1-Ljy5Veezlra)

Tiếp tục là một vài tips hữu ích khi sử dụng Kotlin

# Nâng giá trị các object (Leverage Value Object)
Với data classes, ta có thể dễ dàng viết các immutable-value object. Kể cả object chỉ có duy nhất 1 propety.
```
//Don't
fun send(target: String){}

//Do
fun send(target: EmailAddress){}
// expressive, readable, type-safe

data class EmailAddress(val value: String)
```
# Mapping ngắn gọn hơn với Single Expression Function
```
// Don't
fun mapToDTO(entity: SnippetEntity): SnippetDTO {
    val dto = SnippetDTO(
            code = entity.code,
            date = entity.date,
            author = "${entity.author.firstName} ${entity.author.lastName}"
    )
    return dto
}
```
Với single expression functions, ta có thể viết tên các argument dễ dàng, chính xác và tăng khả năng readable của mapping giữa các object.
```
// Do
fun mapToDTO(entity: SnippetEntity) = SnippetDTO(
        code = entity.code,
        date = entity.date,
        author = "${entity.author.firstName} ${entity.author.lastName}"
)
val dto = mapToDTO(entity)
```
Nếu bạn thích extension functions, ta cũng có thể sử dụng chúng như thế này
```
// Do
fun SnippetEntity.toDTO() = SnippetDTO(
        code = code,
        date = date,
        author = "${author.firstName} ${author.lastName}"
)
val dto = entity.toDTO()
```
# Tham chiếu đối số constructor khi khởi tạo
Hãy nhìn ví dụ dưới đây, bạn phải khai báo các khởi tạo (trong block init) bên trong constructor để set up cho httpClient
```
// Don't
class UsersClient(baseUrl: String, appName: String) {
    private val usersUrl: String
    private val httpClient: HttpClient
    init {
        usersUrl = "$baseUrl/users"
        val builder = HttpClientBuilder.create()
        builder.setUserAgent(appName)
        builder.setConnectionTimeToLive(10, TimeUnit.SECONDS)
        httpClient = builder.build()
    }
    fun getUsers(){
        //call service using httpClient and usersUrl
    }
}
```
apply() giúp ta nhóm lại khởi tạo với 1 single expression
```
// Do
class UsersClient(baseUrl: String, appName: String) {
    private val usersUrl = "$baseUrl/users"
    private val httpClient = HttpClientBuilder.create().apply {
        setUserAgent(appName)
        setConnectionTimeToLive(10, TimeUnit.SECONDS)
    }.build()
    fun getUsers(){
        //call service using httpClient and usersUrl
    }
}
```
# object cho Stateless Interface
object trong Kotlin giúp ta cài đặt framework interface mà không cần quan tâm đến state. 
```
//Do
object StringToInstantConverter : Converter<String, Instant> {
    private val DATE_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss Z")
            .withLocale(Locale.UK)
            .withZone(ZoneOffset.UTC)

    override fun convertToModel(value: String?, context: ValueContext?) = try {
        Result.ok(Instant.from(DATE_FORMATTER.parse(value)))
    } catch (ex: DateTimeParseException) {
        Result.error<Instant>(ex.message)
    }

    override fun convertToPresentation(value: Instant?, context: ValueContext?) =
            DATE_FORMATTER.format(value)
}
```
# Destructuring
Destructuring rất hữu ích sử dụng để trả về nhiều values từ một function. Ta có thể tự định nghĩa data class hoặc sử dụng Pair (performance tốt hơn)
```
//Do
data class ServiceConfig(val host: String, val port: Int)
fun createServiceConfig(): ServiceConfig {
    return ServiceConfig("api.domain.io", 9389)
}
//destructuring in action:
val (host, port) = createServiceConfig()
```
Ngoài ra, destructuring có thể dùng để iterate map
```
//Do
val map = mapOf("api.domain.io" to 9389, "localhost" to 8080)
for ((host, port) in map){
    //...
}
```
# Khởi tạo Structs theo cách khác
listOf, mapOf và to có thể được dùng để khởi tạo structs (như JSON) khá chính xác.
Mặc dù chúng ta nên dùng data classes và object mapping để tạo JSON, nhưng đây cũng là 1 phương pháp hay nên biết
```
//Do
val customer = mapOf(
        "name" to "Clair Grube",
        "age" to 30,
        "languages" to listOf("german", "english"),
        "address" to mapOf(
                "city" to "Leipzig",
                "street" to "Karl-Liebknecht-Straße 1",
                "zipCode" to "04107"
        )
)
```
[SourceCode](https://github.com/phauer/blog-related/tree/master/kotlin-idiomatic)

[Nguồn](https://blog.philipphauer.de/idiomatic-kotlin-best-practices/)