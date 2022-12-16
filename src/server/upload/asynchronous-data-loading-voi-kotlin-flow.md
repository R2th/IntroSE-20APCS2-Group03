![](https://images.viblo.asia/1e335a72-d763-4227-836a-a1c23eb98223.png)

## Coroutines

Khi chúng ta gọi một function bất đồng bộ (asynchronous) như call service, lấy data từ database, read files , ... chúng ta cần callback để biết rằng task đã hoàn thành hay chưa, và cũng ta có thể tiếp tục các task khác như update UI sau khi nhận data từ servers. 
yub ! okey , nhưng trong real-time , nó không đơn giản như vậy ! 

Ví dụ, sau khi nhận dữ liệu từ server, nếu bạn cần filter dữ liệu dựa trên một số local database và thêm lần nữa, bạn lại cần gọi thêm 1 callback nữa, vậy kết quả có thể dẫn đến các cuộc gọi callback lẫn nhau , thật sự rất phức tạp. 

Đó là nơi mà sức mạnh thực sự của coroutines phát huy tác dụng, với coroutines bạn không còn cần phải viết các cuộc gọi lại cho các chức năng không đồng bộ nữa.
Trong coroutines , có một khái niệm là ***suspend functions*** giúp ta có thể thực hiện các thao tác và trả về kiểu dữ liệu ta muốn. 

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

Điều này thật sự có rất nhiều ý nghĩa, nó cứu các developers khỏi các vòng lặp callback và tập trung hơn vào các business logic ở dạng normal. Và không chỉ thế đâu, coroutine còn có thể làm nhiều hơn thế ! 

Với coroutines, bạn có thể **thực thi không đồng bộ, nhưng tuần tự**. !!!

## Suspend Functions

Suspend Functions đơn giản là function có thể paused và resumed vào thời điểm sau. Họ có thể thực hiện một hoạt động dài và chờ đợi nó hoàn thành mà không blocking service calls, hoạt động cơ sở dữ liệu hoặc đọc một tệp dài.

Cú pháp của Suspend Functions cũng như hàm bình thường, nhưng thêm từ khoá Suspend. Và nó có thể return bất kỳ kiểu dữ liệu nào. 

```
suspend fun getItem() : Response
suspend fun getItems() : List<Response>
```

Bây giờ, hãy cùng xem nó hoạt động như thế nào . 
Ví dụ, ta cùng khởi tạo function **foo** , hàm này return một response như dưới đây. 

```
suspend fun foo() : List<Responses> = buildlist{
      add(Execute("A"))
      add(Execute("B"))
      add(Execute("C"))
}
```

Và ta sẽ call nó như sau : 

```
fun getData() {
    val list = withContext(Dispatchers.IO) { foo() }
    for (x in list) println(x)
}
```

Và để thực thi Foo, HĐH sẽ chuyển sang một luồng mới, và thực hiện lần lượt các hành động, và trả về list response. 
![](https://images.viblo.asia/e387e1c4-73ba-43de-921a-7a1488ad1102.png)

 ở đây chúng ta phải đợi cho đến khi tất cả các thực thi được yêu cầu kết thúc vậy nên, hẳn rồi , đây không phải là một giải pháp tối ưu.
 Chúng ta có thể cải tiến hơn chút, bằng cách sử dụng **Channel**.
 
 ## Channel 
 
 Channel là một đường ống, cấu trúc, mà ở đó, khi bạn gửi dữ liệu 1 bên, thì nhận dữ liệu ở phía còn lại, như hình dưới đây: 
 
 ![](https://images.viblo.asia/a2c659f5-20da-4cc9-820a-5f8405a8852d.png)

Để sử dụng channels, ta sửa ít code,  vẫn sử  dụng List<Response> là return type, ta sử dụng ReceiveChannel<Response>, và buildlist là produce , addTo để replace send . 
    
```
      suspend fun foo() : ReceiveChannel<Response> = produce{
      send(execute("A"))
      send(xecute("B"))
      send(Execute("C"))}
```
    
và để sử dụng : 
    
```
fun getData() {
val chaannel = withContext(Dispatchers.IO) { foo() }
for (x in channel) println(x)}
```
    
   hừm hừm, trông giống giống nhau là tđn nhỉ ? okey, hãy cùng xem sự khác biệt . 
    Khi bạn gọi hàm foo, nó sẽ tạo một  channel và trả lại ngay lập tức giá trị (mặc dù chưa hề thực hiện task vụ). Và giờ đây, ta có 2 coroutines đang chạy, một để xử lý dữ liệu, một để lắng nghe sự thay đổi của dữ liệu (observe). 
    
 Khi bạn call channel trong khi thực hiện task vụ, việc thực thi bắt đầu và nó sẽ thực hiện lần đầu tiên và trả về phản hồi và sau đó lần thứ hai và các phản hồi khác tương tự. Nhìn hình sau để hiểu hơn nhé. 
    
![](https://images.viblo.asia/68b5a321-ad29-427e-abf8-4a2d25a9a2bf.png)

    
Vậy, bằng cách sử dụng các  channel , bạn không còn phải chờ để hoàn thành tất cả các thực thi. Mà ta có thể liên tục nhận kết quả khi nó trả về kết quả mới ! Nhưng, cũng có vấn đề xảy ra.

Nhớ mình đã nói gì không ?  Ta có 2 coroutines đang chạy, một để xử lý dữ liệu, một để lắng nghe sự thay đổi của dữ liệu (observe) , right ? Vậy điều gì sẽ xảy ra khi không có observer ? hoặc xảy ra lỗi hoặc exception ? 
Bạn biết Channels giống như network connection hoặc reading a file sử dụng tài nguyên bộ nhớ  và nếu không có observe, kết nối sẽ vẫn mở,  vẫn luôn tìm kiếm observe.
Tất nhiên là khi code, chúng ta sẽ phải giải quyết vấn đề này, tuy nhiên, công bằng mà nói, nó cũng khá phức tạp và khó để debug, test . 
    
Và chúng ta có thể có giải pháp tốt hơn không ? câu trả lời là có . Đó là **Flow**
    
## Kotlin Flow 
    
Về cơ bản, Flow giải quyết các vấn đề của Channel và thêm vài tính năng mới . Ta hãy dùng dạo qua nhé . 
    
Về cú pháp, ta sẽ sử dụng Flow , emit để thực hiện. Cụ thể 

```
fun foo() : Flow<Response> = flow{
      emit(execute("A"))
      emit(execute("B"))
      emit(execute("C"))
}
```

Và để sử dụng : 
    
```
fun getData() {
    val flowData = foo()
    withContext(Dispatchers.IO) { flowdata.collect{ println(x) }
}

```
    
Cách hoạt động : 
  
    khi gọi foo, nó sẽ lập tức return flow object, nhưng không thực hiện executing. 
    Khi bạn bắt đầu flow thì nó bắt đầu thực thi và một request  được thực thi. Nó trả về kết quả và sau đó bắt đầu tiếp theo cho đến khi không còn nữa.
    
![](https://images.viblo.asia/a5d07bbd-06c5-4857-8076-fcfb8203add4.png)

 Nó tương tự như Channel , nó phát ra dữ liệu và nhận cho đến khi không còn nữa, nhưng sự khác biệt lớn là flow sẽ được block. Khi ko còn observer, hoặc mistake , coroutine sẽ không giữ bởi nó không khởi động thứ gì .
    
Flow cung cấp một hành vi phản ứng cho chức năng của bạn bằng cách phát ra kết quả sau khi hoàn thành việc thực hiện hiện tại, không giống như chờ đợi để hoàn thành toàn bộ danh sách yêu cầu.

## Flow Is Declarative
    
Khi chúng ta gọi hàm foo trong flow , điều xảy ra là nó tạo ra một flow  và trả về nó, vì vậy chúng ta có thể sử dụng một số toán tử như  **map** để tạo ra flow declarative hơn. 
    
```
fun foo() : Flow<Response> = 
    flowOf("A","B","C").map{ name->
      execute(name)
    }
}
```
 
## Tổng kết 

Qua bài biết này, mong rằng đã cung cấp cho người đọc thêm kiến thức về Flow trong kotlin để thực hiện bất đồng bộ. Having fun ! 
    
Nguồn : https://medium.com/better-programming/asynchronous-data-loading-with-new-kotlin-flow-233f85ae1d8b