Chúng ta, những nhà phát triển, thường dành nhiều thời gian để đánh bóng con đường hạnh phúc của ứng dụng của chúng ta. Tuy nhiên, điều quan trọng không kém là cung cấp trải nghiệm người dùng phù hợp bất cứ khi nào mọi thứ không diễn ra như mong đợi. Một mặt, việc ứng dụng gặp sự cố là một trải nghiệm không tốt cho người dùng; mặt khác, hiển thị thông điệp phù hợp cho người dùng khi một hành động không thành công là điều không thể thiếu.

Việc xử lý các ngoại lệ đúng cách có tác động rất lớn đến cách người dùng nhìn nhận ứng dụng của bạn. Trong bài viết này, tôi sẽ giải thích cách các ngoại lệ được lan truyền trong các coroutines và cách bạn luôn có thể kiểm soát, bao gồm các cách khác nhau để xử lý chúng.

## Một coroutine đột nhiên không thành công! Làm gì bây giờ? 😱
Khi một coroutine không thành công với một ngoại lệ, nó sẽ phổ biến ngoại lệ đó cho parent của nó! Sau đó, parent sẽ 
1) hủy bỏ phần còn lại của các phần tử con của nó, 
2) hủy chính nó và 
3) truyền ngoại lệ cho parent của nó.

Ngoại lệ sẽ đạt đến gốc của hệ thống phân cấp và tất cả các coroutine mà `CoroutineScope` bắt đầu cũng sẽ bị hủy bỏ.

![](https://images.viblo.asia/ac7ff5bb-fc93-486e-964e-c853faf378bf.gif)

Một ngoại lệ trong một coroutines sẽ được phổ biến trong toàn bộ hệ thống phân cấp của coroutines

Mặc dù việc tuyên truyền một ngoại lệ có thể có ý nghĩa trong một số trường hợp, nhưng vẫn có những trường hợp khác khi điều đó là không mong muốn. Hãy tưởng tượng một `CoroutineScope` liên quan đến giao diện người dùng xử lý các tương tác của người dùng. Nếu một coroutine con ném một ngoại lệ, UI scope sẽ bị hủy và toàn UI component sẽ trở nên unresponsive vì scope bị hủy không thể bắt đầu thêm coroutine.

Nếu bạn không muốn hành vi đó thì sao? Thay vào đó, bạn có thể sử dụng một implementation khác của Job, cụ thể là `SupervisorJob`, trong `CoroutineContext` của `CoroutineScope` tạo ra các coroutines này.

### SupervisorJob để giải cứu
Với `SupervisorJob`, failure của một thành phần con không ảnh hưởng đến những thành phần con khác. `SupervisorJob` sẽ không tự hủy bỏ chính nó hoặc phần còn lại của thành phần con của nó. Hơn nữa, SupervisorJob cũng sẽ không tuyên truyền ngoại lệ và sẽ để coroutine con xử lý nó.

Bạn có thể tạo một CoroutineScope như sau `val uiScope = CoroutineScope(SupervisorJob())` để không tuyên truyền việc hủy bỏ khi coroutine fail như hình ảnh này mô tả:

![](https://images.viblo.asia/7a0b927e-b137-4bdd-a992-c0661cb61405.png)

SupervisorJob sẽ không hủy bỏ chính nó hoặc phần còn lại của thành phần con của nó

Nếu ngoại lệ không được xử lý và `CoroutineContext` không có `CoroutineExceptionHandler` (như chúng ta sẽ thấy ở phần sau), nó sẽ đến ExceptionHandler của default thread. Trong JVM, ngoại lệ sẽ được logged vào console; và trong Android, nó sẽ khiến ứng dụng của bạn crash bất kể điều này xảy ra với Dispatcher nào.

`💥 Uncaught exceptions sẽ luôn được thrown bất kể loại Job bạn sử dụng`

Hành vi tương tự cũng áp dụng cho các scope builders `coroutineScope` và `supervisorScope`. Những điều này sẽ tạo ra một sub-scope (với `Job` hoặc `SupervisorJob` tương ứng là parent) mà bạn có thể nhóm các coroutines một cách hợp lý (ví dụ: nếu bạn muốn thực hiện các phép tính song song hoặc bạn muốn chúng bị ảnh hưởng hoặc không bị ảnh hưởng lẫn nhau).

**Cảnh báo**: `SupervisorJob` chỉ hoạt động như được mô tả khi nó là một phần của scope: được tạo bằng `supervisorScope` hoặc `CoroutineScope (SupervisorJob()).`

### Job hay SupervisorJob? 🤔
Khi nào bạn nên sử dụng `Job` hay `SupervisorJob`? Sử dụng `SupervisorJob` hoặc `supervisorScope` khi bạn không muốn hủy kết quả của thành phần cha và thành phần con tương đương.

Vài ví dụ:
```
// Scope handling coroutines for a particular layer of my app
val scope = CoroutineScope(SupervisorJob())
scope.launch {
    // Child 1
}
scope.launch {
    // Child 2
}
```
Trong trường hợp này, nếu `child#1` không thành công, cả phạm vi và `child#2` sẽ không bị hủy.

Một vi dụ khác:

```
// Scope handling coroutines for a particular layer of my app
val scope = CoroutineScope(Job())
scope.launch {
    supervisorScope {
        launch {
            // Child 1
        }
        launch {
            // Child 2
        }
    }
}
```
Trong trường hợp này, vì supervisorScope tạo sub-scope với SupervisorJob, nếu `child#1` không thành công, `child#1` sẽ không bị hủy. Thay vào đó, nếu bạn sử dụng một `coroutineScope` trong quá trình triển khai, thì lỗi sẽ được lan truyền và cũng sẽ kết thúc việc cancelling scope.

### Xem câu đố! Ai là parent của tôi? 🎯
Với đoạn code sau, bạn có thể xác định loại Job `child#1` có tư cách là parent không?
```
val scope = CoroutineScope(Job())
scope.launch(SupervisorJob()) {
    // new coroutine -> can suspend
   launch {
        // Child 1
    }
    launch {
        // Child 2
    }
}
```
parentJob của `child#1` thuộc loại Job! Hy vọng bạn làm đúng! Mặc dù ngay từ ấn tượng đầu tiên, bạn có thể nghĩ rằng đó có thể là SupervisorJob, nhưng điều đó không phải bởi vì một coroutine mới luôn được giao một Job() mới mà trong trường hợp này sẽ ghi đè lên SupervisorJob. SupervisorJob là cha của coroutine được tạo bằng scope.launch; theo nghĩa đen, SupervisorJob không làm gì trong mã đó!

![](https://images.viblo.asia/eaa24d53-5241-46a9-bf72-5dfd3f9325dc.png)

Parent của child#1 và child#2 thuộc loại Job, không phải SupervisorJob

Do đó, nếu hild#1 hoặc child#2 không thành công, lỗi sẽ đạt đến scope và tất cả job bắt đầu bởi scope đó sẽ bị hủy bỏ.

Hãy nhớ rằng `SupervisorJob` chỉ hoạt động như được mô tả khi nó là một phần của scope: được tạo bằng `supervisorScope` hoặc `CoroutineScope (SupervisorJob ())`. Việc chuyển `SupervisorJob` làm tham số của coroutine builder sẽ không có tác dụng mong muốn mà bạn đã nghĩ đến việc hủy bỏ.

Về các ngoại lệ, nếu bất kỳ child nào ném ra một ngoại lệ, `SupervisorJob` đó sẽ không truyền bá ngoại lệ đó trong hệ thống phân cấp và sẽ để coroutine của nó xử lý nó.

### Under the hood
Nếu bạn tò mò về cách hoạt động của `Job`, hãy kiểm tra việc triển khai các chức năng `childCancelled` và `notifyCalcelling` trong tệp `JobSupport.kt.`

Trong triển khai `SupervisorJob`, phương thức childCancelled chỉ trả về false, có nghĩa là nó không có tác dụng hủy bỏ nhưng cũng không xử lý ngoại lệ.
## Đối phó với các trường hợp ngoại lệ 👩‍🚒
Coroutines sử dụng cú pháp Kotlin thông thường để xử lý các ngoại lệ: `try / catch` hoặc các hàm trợ giúp tích hợp sẵn như `runCatching` (sử dụng `try / catch` trong nội bộ).

Chúng tôi đã nói trước đó rằng **các trường hợp ngoại lệ không được suy xét sẽ luôn được ném ra.** Tuy nhiên, các coroutines builders khác nhau xử lý các ngoại lệ theo những cách khác nhau.

### Launch
Với `launch`, **các ngoại lệ sẽ được đưa ra ngay khi chúng xảy ra**. Do đó, bạn có thể bọc code có thể throw các ngoại lệ bên trong một `try / catch`, như trong ví dụ này:
```
scope.launch {
    try {
        codeThatCanThrowExceptions ()
    } catch (e: Exception) {
        // Xử lý ngoại lệ
    }
}
```
> Với launch, các ngoại lệ sẽ được đưa ra ngay khi chúng xảy ra
### Async
Khi `async` được sử dụng như là 1 root coroutine (coroutines là phần tử con trực tiếp của CoroutineScope instance hoặc supervisorScope), **các ngoại lệ sẽ không tự động được ném ra, thay vào đó, chúng sẽ được ném ra khi bạn gọi .await ().**
Để xử lý các ngoại lệ được đưa vào `async` bất cứ khi nào đó là một root coroutine, bạn có thể bọc lời gọi `.await ()` bên trong một `try / catch`:
```
supervisorScope {
    val deferred = async {
        codeThatCanThrowExceptions ()
    }
    try {
        deferred.await ()
    } catch (e: Exception) {
        // Xử lý ngoại lệ được đưa vào không đồng bộ
    }
}
```
Trong trường hợp này, hãy lưu ý rằng việc gọi `async` sẽ không bao giờ throw exception, đó là lý do tại sao không cần thiết phải bọc nó `.await` sẽ throw exception bên trong `async` coroutine.

> Khi `async` được sử dụng như một root coroutine, các ngoại lệ sẽ được throw ra khi bạn gọi `.await`


Ngoài ra, hãy lưu ý rằng chúng ta đang sử dụng `supervisorScope` để gọi `async` và `await`. Như tôi đã nói trước đây, một SupervisorJob cho phép coroutine xử lý trường hợp ngoại lệ; trái ngược với Job sẽ tự động truyền nó lên trong hệ thống phân cấp, vì vậy `catch` block sẽ không được gọi:

```
coroutineScope {
    try {
        val deferred = async {
            codeThatCanThrowExceptions ()
        }
        deferred.await ()
    } catch (e: Exception) {
        // Ngoại lệ được thrown trong async SẼ KHÔNG bị bắt ở đây
        // nhưng được truyền đến scope
    }
}
```
Hơn nữa, các trường hợp ngoại lệ xảy ra trong các coroutines được tạo bởi các coroutines khác sẽ luôn được lan truyền bất kể trình tạo coroutine nào. Ví dụ:
```
val scope = CoroutineScope (Job ())
scope.launch {
    async {
        // If async throws, launch throws without calling .await()
    }
}
```
Trong trường hợp này, nếu `async` ném một ngoại lệ, nó sẽ được ném ra ngay khi nó xảy ra vì coroutine là con trực tiếp của scope là `launch`. Lý do là `async` (với một `Job` trong `CoroutineContext` của nó) sẽ tự động truyền ngoại lệ đến cha của nó (`launch`) sẽ ném ngoại lệ.

> ⚠️ Các Exceptions được ném ra trong coroutineScope builder hoặc trong coroutines được tạo bởi các coroutines khác sẽ không bị bắt trong một `try/catch!`


Trong phần SupervisorJob, chúng ta đề cập đến sự tồn tại của CoroutineExceptionHandler. Cùng đi sâu vào nó nào!
### CoroutineExceptionHandler
`CoroutineExceptionHandler` là một phần tử tùy chọn của `CoroutineContext` cho phép bạn xử lý các trường hợp ngoại lệ không cần thiết.

Đây là cách bạn có thể xác định một `CoroutineExceptionHandler`, bất cứ khi nào bắt được một ngoại lệ, bạn sẽ có thông tin về CoroutineContext nơi ngoại lệ đã xảy ra và chính ngoại lệ đó:
```
val handler = CoroutineExceptionHandler {
    context, exception -> println("Caught $exception")
}
```
Các trường hợp ngoại lệ sẽ được áp dụng nếu các yêu cầu này được đáp ứng:

* **When** ⏰:: Ngoại lệ được ném bởi một coroutine *tự động ném ra các ngoại lệ* (hoạt động với `launch`, không với `async`).
* **Where** 🌍:: Nếu nó nằm trong `CoroutineContext` của `CoroutineScope` hoặc root coroutine (con trực tiếp của `CoroutineScope` hoặc `supervisorScope`).


Hãy xem một số ví dụ bằng cách sử dụng `CoroutineExceptionHandler` được định nghĩa ở trên. Trong ví dụ sau, exception sẽ bị bắt bởi handle:
```
val scope = CoroutineScope(Job())
scope.launch(handler) {
    launch {
        throw Exception("Failed coroutine")
    }
}
```
Trong trường hợp khác, trong đó handler được cài đặt trong một inner coroutine, nó sẽ không bị bắt:
```
val scope = CoroutineScope(Job())
scope.launch {
    launch(handler) {
        throw Exception("Failed coroutine")
    }
}
```
Không bắt được ngoại lệ vì handler không được cài đặt trong đúng `CoroutineContext`. Inner launch sẽ truyền ngoại lệ cho thành phần cha ngay khi nó xảy ra, vì thành phần cha không biết bất cứ điều gì về handler, ngoại lệ sẽ được ném ra.

Xử lý các ngoại lệ một cách khéo léo trong ứng dụng của bạn là điều quan trọng để có trải nghiệm người dùng tốt, ngay cả khi mọi thứ không diễn ra như mong đợi.

Hãy nhớ sử dụng `SupervisorJob` khi bạn muốn tránh việc tuyên truyền calcellation khi có ngoại lệ xảy ra và ngược lại thì Job.

Các exceptions không được catch sẽ được phổ biến, hãy catch chúng để cung cấp trải nghiệm người dùng tuyệt vời!