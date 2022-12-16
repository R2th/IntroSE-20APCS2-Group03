Trong bài viết này, chúng ta sẽ cùng tìm hiểu vấn đề, làm thế nào để xử lý các trường hợp bất đồng bộ khi load dữ liệu, bằng cách sử dụng flow trong kotlin.  
### Coroutines
Khi chúng ta gọi một asynchronous funtion như gọi service, lấy data từ database, đọc các file hoặc bất cứ gì, thì đều cần một callback để biết được lúc các hoạt động hoàn tất và có thể tiếp tục công việc tiếp theo như update UI người dùng sau khi tiếp nhận dữ liệu. 
Việc thực hiện các tác vụ như vậy là tốt nhưng trong thời gian thực (real-time) nó sẽ không được dễ dàng.

Ví dụ, sau khi nhận được data từ server, nếu ta cần lọc dữ liệu dựa trên một số số liệu mà chúng ta phải thao tác để lấy từ local và một lần nữa, chúng ta lại cần một callback khác, vì vậy data được lấy về theo cách phức tạp và kết quả nằm sẽ trong sự bùng nổ của các callback. 

Đây là lúc nhân tố mang tên coroutines xuất hiện để giải quyết vấn đề và không còn cần phải viết các callback cho các asynchronous funtion nữa.

Có một khái niệm tuyệt vời  trong coroutines được gọi là **suspend funtion** sẽ thực hiện tất các các công việc mà chúng ta cần, và trả về dữ liệu mong muốn sau khi hoàn tất.
```
suspend fun getFilteredItems(token : String){
  listItems = getItems(token)
  filteredItems = getFilteredItems(listItems)
  update()
}

suspend fun getItems( ... )
suspend fun getFilteredItems( ... )
fun update()
```
Điều này sẽ giúp tiết kiệm công sức hơn thay vì phải sử dụng các callback, thay vào đó chúng ta sẽ tập trung vào business logic.

### Suspend Functions
Một suspending function đơn giản là một function có thể được tạm dừng và tiếp tục tại một thời điểm sau đó, nó có thể thực hiện một hoạt động kéo dài và chờ cho nó để hoàn thành mà không cần chặn các cuộc gọi service, hoạt động với database, hoặc đọc một file dài.
Cú pháp của một suspend function như funtion bình thường ngoại trừ phải thêm từ khóa **suspend** ở đầu.
Điều tuyệt vời của suspending function là nó có thể return bất kỳ số lượng responses.
```
suspend fun getItem() : Response
suspend fun getItems() : List<Response>
```
Hãy cùng xem cách mà nó hoạt động, ví dụ, chúng ta có một suspend funtion foo sẽ return một list các response như dưới đây
```
suspend fun foo() : List<Responses> = buildlist{
      add(Execute("A"))
      add(Execute("B"))
      add(Execute("C"))
}
```
Sau đó, ta gọi đến nó theo flow như dưới đây
```
fun getData() {
    val list = withContext(Dispatchers.IO) { foo() }
    for (x in list) println(x)
}
```
Câu chuyện xảy ra ở đây là, khi chúng ta gọi suspend funtion foo, nó sẽ bắt đầu executing one-by-one và đợi sau khi hoàn thành tất các các executions, nó sẽ return một list các response.
![](https://images.viblo.asia/86fd90fd-2bb2-4056-a145-2fb240e6a64b.png)
Như vậy, ở đây chúng ta phải chờ cho đến khi tất cả các executions hoàn thành và đây không phải là một giải pháp tối ưu. 
Nhưng chúng ta có thể làm tốt hơn, giải pháp tiếp theo mà Kotlin tìm thấy là Channel.
### Channel
Channel được hiểu như là một đường ống, cấu trúc, nơi chúng ta gửi dữ liệu ở một bên và nhận dữ liệu ở phía bên kia, như hình dưới đây.

![](https://images.viblo.asia/e13c1add-f7df-4cca-8a62-20ebb6a76a99.png)

Để sử dụng channel, chúng ta cần thay đổi một chút code, thay vì sử dụng List<Response> như một kiểu trả về thì chúng ta sử dụng ReceiveChannel<Response>, sử dụng **produce** thay vì  **buildlist**,  và sử dụng **send** thay vì **addTo**
```
suspend fun foo() : ReceiveChannel<Response> = produce{
      send(execute("A"))
      send(xecute("B"))
      send(Execute("C"))
}
```
Và tiếp theo, khi sử dụng nó trong flow của mình, thì chúng ta sẽ nhận được channel thay vì một list các response, sau đó thực hiện lặp và print, ta sẽ thực hiện như bên dưới.
    
```
fun getData() {
    val chaannel = withContext(Dispatchers.IO) { foo() }
    for (x in channel) println(x)
}
```
Điều gì làm nên sự khác biệt, hãy cùng xem nào
Khi chúng ta gọi function foo, nó sẽ tạo ra một channel và return lại nó ngay lập tức nhưng sẽ không bắt đầu thực hiện. Bây giờ chúng ta có 2 coroutine đang chạy, một phát ra dữ liệu và những cái khác observe nó.

Khi chúng ta gọi tới channel trong khi đang lặp (iterating), việc thực hiện được bắt đầu và nó sẽ thực hiện một trong những cái đầu tiên và return response và sau đó là thứ hai và những cái tiếp theo tương tự, 
ý tưởng hoạt động như hình dưới đây:

![](https://images.viblo.asia/2ff969c6-ca96-47e4-9604-8f9fcc5ff1f7.png)
Vì vậy, bằng cách sử dụng các channel, bạn không còn cần phải chờ đợi để hoàn thành tất cả các hành. Nhưng có một vấn đề ở đây, channel là nóng (hot).
    
Hãy cùng nhớ lại trước đó đã đề cập rằng hai coroutine đang chạy, một quan sát và một để phát ra, vậy chuyện gì sẽ xảy ra nếu không có observer nào hoặc nhầm lẫn hoặc có bất kì exception? 

Chúng ta biết channel giống như mở một network connection hoặc đọc một file sẽ sử dụng resource lớn và nếu không có observer, connection sẽ lại mở và tìm kiếm observer.

Điều đó có thể giải quyết nhưng về lâu dài, nó sẽ không được optimistic, nó sẽ gây ra vấn đề nghiêm trọng trong debug và testing trong thời gian dài.
Tuy nhiên, chúng ta vẫn sẽ lại có một giải pháp tốt hơn, đây là lúc dùng đến kotllin flow, nhân vật chính của chúng ta.
### Kotlin Flow
Phiên bản ổn định của flow đã được phát hành. Flow không chỉ giải quyết được các điểm yếu của channel mà còn cung cấp nhiều tính năng mới.
Để sử dụng flow trong ví dụ trên, chúng ta chỉ cần thay đổi một vài thứ như kiểu trả về là **Flow** và sử dụng **flow** thay vì **produce**, và bên trong flow chúng ta phải sử dụng **emit** như bên dưới 
```
fun foo() : Flow<Response> = flow{
      emit(execute("A"))
      emit(execute("B"))
      emit(execute("C"))
}
```
Tiếp nữa, trong general function, ta phải dử dụng **collect** trên kết quả của function foo. Phải collect tất cả các element được phát ra bởi foo thông qua flow 
```
fun getData() {
    val flowData = foo()
    withContext(Dispatchers.IO) { flowdata.collect{ println(x) }
}
```    
Điều gì xảy ra khi chúng ta gọi function foo, nó sẽ ngay lập tức trả về kết quả và sau đó tiếp tục start kế tiếp, cứ như vậy cho đến khi không còn nữa.
![](https://images.viblo.asia/061628ef-f8bc-4d5d-b4f2-bf144d7fc9bf.png)
    
Như vậy ở đây chúng ta thấy flow tương tự như Channel, nó phát ra dữ liệu và nhận cho đến khi không còn nữa,  nhưng sự khác biệt lớn ở đây là Flow là lạnh (cold). Thậm chí nếu không có observer hoặc do nhầm lẫn hoặc cố ý, các coroutine sẽ không giữ nó bởi vì nó sẽ không start bất cứ điều gì.

Flow đưa ra một hành vi phản ứng với chức năng của mình bằng cách phát ra các kết quả sau khi hoàn thành việc thực thi, nó không giống như việc chờ đợi để hoàn thành toàn bộ danh sách request.
### Flow Is Declarative
Khi chúng ta gọi function foo trong ví dụ của flow,  nó sẽ tạo ra một flow và trả về nó , vì vậy chúng ta có thể sử dụng một số operators như **map** để làm flow declarative hơn như bên dưới 
```
fun foo() : Flow<Response> = 
    flowOf("A","B","C").map{ name->
      execute(name)
    }
}
```    
Ở đây nếu bạn observer, funtion foo không phải là một suspend function, vì sao?
Như đã nói ở trước đây, nó chỉ xác định đối tượng flow, sau đó phát ra nó ngay lập tức và chỉ tính toán và chạy khi nó đã bắt đầu để collect .
### Flow Is Reactive
Với tiêu đề này, ắt hẳn mọi người sẽ nghĩ ngay đến RxJava,  đúng là như vậy, RxJava là một loại bắt đầu của reactive program trong JVM, nơi mà Kotlint chạy chủ yếu. 
Vậy thì tại sao chúng ta phải sử dụng flow? 
###  Why Flow?
Chúng ta sẽ cùng xem xét một ví dụ, nếu bạn muốn chuyển đổi bất kì đối tượng của loại A đến loại B trong RxJava, chúng ta có một operator được gọi là **map** .
Vâng, nó hoạt động tốt, nhưng điều gì xảy nếu việc chuyển đổi nên được thực hiện không đồng bộ ? Chúng ta có thể sử dụng một operator gọi là **flatmapSingle**.

Nhưng trong Kotlin, chúng ta có một operator được gọi là **map**, lambda chuyển đổi của operator này là suspend modifier, và nó làm cho **map** có thể sử dụng trong cả công việc synchronous hoặc asynchronous.
Chúng ta có thể tránh được hàng trăm operator như thế này bằng cách sử dụng Kotlin vì Kotlin có suspend function, nơi mà RxJava và những thứ khác thì không thể.


-----
Những khái niệm được đề cập và giải thích trong bài viết này, nằm trong bài phát biểu ở sự kiện KotlintConf 2019, 
    Link: [Asynchronous Data Streams with Kotlin Flow by Roman Elizarov
](https://youtu.be/tYcqn48SMT8) 

Cảm ơn các bạn đã đọc, xin chào và hẹn gặp lại.

Nguồn: https://medium.com/better-programming/asynchronous-data-loading-with-new-kotlin-flow-233f85ae1d8b