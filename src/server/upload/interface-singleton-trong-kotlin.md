Object declaration trong Kotlin là một tính năng tiện lợi, được sử dụng để tạo một thực thể singleton trong khi tránh boilerplate. Tuy nhiên, nó cũng là một tính năng rất khắt khe, theo nghĩa là một object nhất thiết phải là final. 

Điều này có nghĩa là ta không thể mở rộng từ nó. Điều này có thể trở thành một vấn đề khi refactor code. Theo nguyên tắc chung, việc truy cập thực thể singleton trực tiếp đi ngược lại nguyên tắc của dependency injection, do đó, nó có khả năng trở thành một vấn đề. Nhưng một object còn có một hạn chế thậm chí còn lớn hơn, bởi vì nó phải được truy cập như một singleton.

Ví dụ, giả sử bạn đã viết Server object, vì bạn muốn có một singleton holder cho HTTP client của mình.

```
object Server {
    private val client = OkHttpClient()
    fun execute(request: Request): Response =
        client.newCall(request).execute()
}
```

Theo cách này, bạn có thể refer đơn giản đến thực thể Server duy nhất khi thực thi các HTTP requests.

```
private val url = 
    "https://en.wikipedia.org/api/rest_v1/page/summary/"
fun getWikipediaArticle(page: String): Response {
    val request = Request.Builder()
        .url("$url$page")
        .header("Accept", "application/json")
        .build()
    return Server.execute(request)
}
```

Việc này rất thuận tiện. Nhưng tại một số trường hợp, bạn có thể muốn thêm tests cho đoạn code này. Sau đó, bạn cần phải viết lại nó, với việc triển khai Server interface.
```
interface Server {
    fun execute(request: Request): Response
}
class WikipediaArticleRepository(val server: Server) {
    
    private val url = 
        "https://en.wikipedia.org/api/rest_v1/page/summary/"
    
    fun getWikipediaArticle(page: String): Response {
        val request = Request.Builder()
            .url("$url$page")
            .header("Accept", "application/json")
            .build()
        return server.execute(request)
    }
}
```

Thế này tốt hơn, nhưng bây giờ bạn sẽ làm gì với tất cả phần còn lại của đoạn code đang gọi trực tiếp singleton Server? Việc refactor code để sử dụng dependency injection cùng một lúc có thể gây khó khăn. 

Để giải quyết vấn đề trên, ta có thể sử dụng một mẹo với companion object trong Server interface, nó có thể thực hiện thay đổi trên theo một cách tương thích với source.

```
interface Server {

    fun execute(request: Request): Response

    companion object : Server {
        private val client = OkHttpClient()

        override fun execute(request: Request): Response =
            client.newCall(request).execute()
    }
}
```

Bằng cách này, đoạn code trong ví dụ đầu tiên sẽ tiếp tục được biên dịch và chạy, mà không cần thực hiện bất kì thay đổi nào!

> Bằng cách tạo một companion object cho một interface, nó sẽ implements chính interface đó, nó có thể tham khảo cho cả interface và singleton implementation của interface đó bằng cùng một tên.

Với tất cả các đoạn code mà trước đây đã sử dụng singleton vẫn tương thích. Nó có thể gọi đến các methods trên interface, hoặc là trên object.

Sử dụng loại thủ thuật này rất hữu ích trong quá trình refactor code. Nó giúp tiến lên dần dần tới các patterns tốt hơn, mà không bị chặn bởi các anti-patterns hiện có.

Câu hỏi còn lại là liệu sử dụng hỗn hợp interface-object sẽ được chấp nhận như là một quyết định thiết kế ban đầu. Lợi ích sẽ là giữ khả năng sử dụng trực tiếp thực thể singleton, trong trường hợp việc mocking là không liên quan hoặc khi code được sử dụng để tạo quick prototyping. Nhược điểm là nó để cánh cửa mở ra cho việc sử dụng kém của singleton này, dẫn đến code kế thừa. Điều này đưa chúng ta trở lại câu hỏi muôn thuở về việc liệu các nhà phát triển có nên bị ép buộc vào các mẫu chuẩn hay để lại trách nhiệm đưa ra quyết định của riêng họ hay không.

Link source: https://proandroiddev.com/interface-singleton-in-kotlin-4c14d862cd67