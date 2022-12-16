![](https://images.viblo.asia/c44fc4ff-1bfa-44e4-902b-9b733ce02551.png)
Một trong những tính năng thú vị của Kotlin là coroutines. Trong quá trình phát triển các ứng dụng Android, việc quản lý các luồng luôn là một thách thức vì có những hạn chế trong việc xử lý những thứ liên quan UI hoặc Main thread. Và thực tế phổ biến là chúng ta sẽ phải làm việc rất nhiều với các tác vụ nặng như thực hiện các vụ mạng, xử lý các logic phức tạp, .... Và các tác vụ này sẽ gây ra hiện tượng block UI, tạo ra một trải nghiệm người dùng vô cùng tồi tệ. Vì vậy chúng ta thường tạo ra các luồng riêng chạy song song với main thread để thực hiện công việc này.
Để quản lý các luồng này chúng ta có nhiều cách, hiện nay có rất nhiều các thư viện bên thứ 3 được sinh ra để giúp chúng ta quản lý đa luồng, mà phải kể đến như RX.  Tuy nhiên, Kotlin đã cung cấp một sự lựa chọn riêng cho các nhà phát triểnm đó là Coroutines. Coroutines cung cấp giải pháp đơn giản nhất để xử lý cũng như quản lý các luồng. Coroutines không có gì khác ngoài cung cấp các lightweight thread . Chúng cung cấp cho chúng ta một cách dễ dàng để thực hiện lập trình đồng bộ và không đồng bộ. Coroutines cho phép chúng tôi thay thế các callback và không làm block UI.

# 1. Sử dụng Suspend Function
Cùng tìm hiểu về Suspend Function bằng cách lấy một ví dụ đơn giản về việc lấy thông tin chi tiết người dùng từ một  API hoặc cơ sở dữ liệu cục bộ và hiển thị chúng cho người dùng. Nếu chúng tôi cố gắng lấy dữ liệu qua API trên Main Thread,  nó sẽ ném ra một NetworkOnMainThreadException. Nếu chúng tôi lấy dữ liệu chi từ cơ sở dữ liệu cục bộ, thao tác này sẽ gây ra hiện tượng block Main Thread, Main Thread sẽ dừng các hoạt động của nó cho đến khi dữ liệu được tìm nạp, dẫn đến trải nghiệm không tốt cho người dùng.
```
![](https://images.viblo.asia/3f953af6-5198-44ac-86bd-cf90fa925283.png)

```
Chúng ta có thể làm điều này đơn giản bằng cách sử dụng các SuspenFunction trong coroutines. `suspend` là một từ khóa đánh dấu. Các phương thức được đánh dấu suspend  thì chúng được hiểu là các phương thức chạy đồng bộ, tuy nhiên sẽ không được trả về ngay lập tức. Các suspend function sẽ bị tạm ngưng cho đến khi có kết quả trả về. Như vậy trong khi các suspend function được gọi, các yêu cầu nặng sẽ không gây ra hiện tượng block main thread.
```
suspend fun loadUser(){
 val user = api.fetchUser()
 show(user)
}
```
Hãy hình dung nó rõ ràng hơn:

![](https://images.viblo.asia/95365fe7-c593-4bfe-9667-82edd2d7c682.png)

Khi một phương thức bị đánh dấu là suspend, phương thức đó sẽ không thực thi. Nó đã bị tạm dừng. Và khi nó tiếp tục, nó sẽ bắt đầu từ thời điểm nó đã dừng lại. Khi chúng ta gọi một suspend function trên luồng chính, hàm đó sẽ bị tạm ngưng và thực hiện công việc của nó trên bất kỳ luồng công nhân nào khác. Sau khi hoàn tất, nó sẽ tiếp tục với kết quả để chúng ta có thể sử dụng kết quả trên Main Thread.
![](https://images.viblo.asia/260599ae-1926-446a-9e14-2f7fcfca538e.png)

Nhưng có một số hạn chế khi sử dụng các suspend function. Chúng có thể được gọi bên trong một coroutine builder hoặc từ một suspend function khác.

**Dispatchers** được sử dụng để chỉ định luồng nào sẽ thực thi công việc của suspend funtcion. Chúng tương tự như **schedulers** trong Rx. Chúng tôi có thể chỉ định Dispatchers nào mà chúng tôi muốn thực hiện yêu cầu API fetchUser (trong trường hợp của chúng tôi, đó là Dispatchers.IO). Chúng tôi sử dụng phương thức **withContext** để chỉ định điều này:
```
suspend fun fetchUser = withContext(Dispatchers.IO){
 // We can write blocking calls here
}
```
Khi yêu cầu API được hoàn thành, chúng tôi có thể sử dụng kết quả trên main bằng Dispatchers.Main. Các Dispatchers khác nhau có sẵn là:

Dispatchers.Default: Nếu bạn không chỉ định rõ ràng, Dispatches.Default sẽ được gọi

Dispatchers.IO: Dispatchesnày được thiết kế để xử lý các hoạt động chặn IO trên đĩa và các hoạt động mạng.

Dispatchers.Main: Dispatches theo quy trình được giới hạn trong luồng chính, tương tác trực tiếp với UI. Truy cập vào thuộc tính này có thể ném ra một ngoại lệ IllegalStateException nếu không có Dispatches  nào có mặt trong classpath. Nó được sử dụng chủ yếu để xử lý dữ liệu được gọi từ API hoặc databse

Sử dụng Dispatches thích hợp dựa trên yêu cầu của bạn.
# 2. Quá trình xử lý Coroutines
Trình biên dịch Kotlin sử dụng callback khi quá trình tính toán có thể tạm dừng. Coroutines gọi những callbakc  này là sự tiếp tục. Phần tiếp theo không có gì khác ngoài một giao diện callback chung với một số thông tin bổ sung trong đó. Máy trạng thái sẽ giống như sau:
![](https://images.viblo.asia/006e741d-bd69-4432-8f68-0206dccbbc34.png)

# 3. Structured Concurrency
Structured Concurrency là một hệ thống mẫu thiết kế trong coroutines cố gắng giải quyết việc rò rỉ bộ nhớ. Và nó giúp chúng ta suy nghĩ về những điểm sau:
1. Ai có thể hủy bỏ một công việc đang thực hiện ?

2. Coroutine  vòng đời không?

3. Ai xử lý lỗi khi công việc thất bại?
## 3.1 Coroutine Scope
CoroutineScope là một interface trong gói kotlinx.coroutines.
1. Theo dõi các quy trình.

2. Nó cung cấp khả năng hủy bỏ quy trình coroutine.

3. Nó sẽ được thông báo bất cứ khi nào xảy ra lỗi.
Coroutine Scope  không chứa các tham chiếu của bất kỳ heavy Object nào. Vì vậy, bất cứ khi nào chúng ta muốn kiểm soát vòng đời của coroutine, chúng ta cần tạo một phạm vi. Nó có thể được tạo dễ dàng như sau:

```
val scope = CoroutineScope(Dispatchers.IO)

fun doSomething(){
  scope.launch{
    networkRequest()
  }
}
```
Bây giờ các coroutines được tạo ở trên bằng cách sử dụng **launch** coroutine khởi chạy sẽ tuân theo vòng đời của scope. Nếu có bất kỳ ngoại lệ nào phát sinh, điều đó sẽ được thông báo tới  để chúng tôi có thể xử lý. Trong nhiều trường hợp khi người dùng thoát khỏi màn hình trong khi yêu cầu mạng đang diễn ra, chúng ta cần phải hủy tất cả các yêu cầu đang diễn ra. Vì vậy, trong lệnh gọi lại **ViewModel**, **onCleared ()** hoặc trong lệnh gọi lại hoạt động **onDestroy (),** chúng ta có thể hủy phạm vi để tất cả các coroutines ngừng thực thi chúng.
```
fun onCleared(){
  scope.cancel()
}
```
# 4. Xử lý Exception với coroutine scope
```
val scope = CoroutineScope(Dispatchers.Main + Job())
```

Một công việc có thể được sử dụng để xác định vòng đời của scope và coroutine. Nếu chúng ta chuyển một công việc đến scope, nó sẽ xử lý các ngoại lệ theo một cách cụ thể. Khi có nhiều phần tử con được liên kết với scope:

Nếu bất kỳ công việc nào thất bại, nó sẽ tuyên truyền ngoại lệ cho những công việc khác khác.

Khi lỗi được thông báo, scope sẽ tự hủy và bắn ra ngoại lệ.

Tạm dừng những công việc khác và ném một ngoại lệ không phải là lý tưởng trong hầu hết các trường hợp thất bại, thường dẫn đến conflic. Đối với những trường hợp này, chúng tôi cần sử dụng **SupervisorJob**.
```
 val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
```

Khi chúng tôi sử dụng SupervisorJob, nó sẽ không cản trở việc thực thi những công việc khác trong cùng scope. Và khi một lỗi được thông báo, scope sẽ không làm gì cả. Vì ngoại lệ có thể phổ biến, chúng tôi có thể phải sử dụng khối try / catch trong mã của mình để đảm bảo an toàn.

Tôi sẽ viết một bài báo riêng về việc xử lý các ngoại lệ của coroutines, scope, v.v.
# 5. Cách tạo ra một coroutine
## 5.1 Launch
**launch** {} là một coroutine builder để tạo ra một coroutine mới. Hàm **launch** tạo một quy trình đăng ký và trả về ngay lập tức. Tuy nhiên, công việc vẫn tiếp tục trong  luồng nền. Nó thường được sử dụng khi không có giá trị trả về được mong đợi. Ví dụ: nếu chúng tôi muốn tải thứ gì đó lên máy chủ và chúng tôi không quan tâm đến kết quả
```
scope.launch(Dispatchers.IO){
   service.upload(data)
}
```
## 5.2 Async
**async{}** là một couroutine builder tạo ra một coroutine mới và sử dụng trong case muốn nhận về một giá trị mong muốn : 
```
suspend fun getUser(userId:Int):User = coroutineScope{
     val deffered =async(Dispatchers.IO){
        service.fetchUser(userId)
     }
     deffered.wait()
 }
```
**async** sẽ trả về đối tượng **deferred**. Chúng tôi gọi await () trên đối tượng hoãn lại đó, do đó, await sẽ đợi, tạm dừng việc thực thi coroutine cho đến khi async kết thúc quá trình tính toán của nó và trả về giá trị của coroutine.
# Summary
Bây giờ bạn sẽ hiểu coroutines là gì và cách sử dụng cơ bản của chúng. Chúng tôi sẽ tìm hiểu thêm về các quy trình, phạm vi và xử lý ngoại lệ này trong các bài viết sắp tới của tôi.