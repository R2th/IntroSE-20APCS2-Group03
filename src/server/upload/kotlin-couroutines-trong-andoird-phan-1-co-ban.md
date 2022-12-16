Đây là phần đầu tiên trong series những bài viết về Kotlin Coroutines trong Android. Phần này sẽ tập trung vào cách mà coroutines làm việc và những vấn đề mà nó giải quyết. Hi vọng bài viết sẽ mang lại những kiến thức bổ ích cho bạn.
# Coroutines giải quyết những vấn đề gì?
[Kotlin coroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html) giới thiệu một kiểu đồng bộ mới có thể được sử dụng trên Android để đơn giản hóa mã bất đồng bộ (asynchronize). Mặc dù coroutines mới được đưa vào Kotlin từ phiên bản 1.3, nhưng khái niệm về coroutines đã xuất hiện thời kỳ sơ khai của các ngôn ngữ lập trình. Ngôn ngữ đầu tiên đưa ra khái niệm coroutines là [Simula](https://en.wikipedia.org/wiki/Simula) vào năm 1967.

Trong vài năm gần đây, coroutines đã trở nên phổ biến hơn và hiện được đưa vào nhiều ngôn ngữ lập trình phổ biến như [Javascript](https://javascript.info/async-await), [C#](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/), [Python](https://docs.python.org/3/library/asyncio-task.html), [Ruby](https://ruby-doc.org/core-2.1.1/Fiber.html) hay [Go](https://tour.golang.org/concurrency/1). Kotlin Coroutines dựa trên các khái niệm đã được thiết lập đã được sử dụng để xây dựng các ứng dụng lớn.

Trong Android, coroutines là một giải pháp tuyệt với cho 2 vấn đề:
1. **Long running tasks** là những tác vụ cần nhiều thời gian để thực thi và sẽ block main thread.
2. **Main-safety** cho phép ta đảm bảo rằng bất kỳ suspend function bào cũng có thể được gọi từ main thread.

Hãy cùng tìm hiểu xem làm cách nào coroutines có thể giúp chung ta tổ chức code một cách tốt hơn.

# Long running tasks
Tải một trang web hay tương tác với API đều là các tác vụ liên quan tới kết nối mạng. Tương tự, đọc dữ liệu từ database hoặc tải hình ảnh từ bộ nhớ liên quan đến việc đọc dữ liệu từ bộ nhớ. Những tác vụ này được gọi là những "long running task" - những tác vụ mất quá nhiều thời gian để ứng dụng của bạn dừng lại và chờ đợi chúng hoàn thành!

Để có thể so sánh tốc độ thực thi code với tốc độ truy xuất dữ liệu trên internet ở các thiết bị ngày nay , ta có thể dùng một phép so sánh. Trên Pixel 2, một chu kỳ của CPU chỉ mất dưới 0,00004 giây, một khoảng thời gian rất nhỏ để con người có thể nhận ra. Tuy nhiên, nếu giả sử một network request diễn ra chỉ trong nháy mắt, khoảng 400ms (0,4 giây), thì ta có thể hình dung ra CPU hoạt động nhanh tới mức nào. Chỉ trong nháy mắt, hoặc khi network request phản hồi lại chậm, CPU có thể thực hiện đến một triệu chu kỳ!

Trên Android, mỗi ứng dụng đều có một thread chính chịu trách nhiệm xử lý UI (vẽ các view) và điều phối các tương tác của người dùng. Nếu có quá nhiều công việc xảy ra trên thread này, ứng dụng sẽ bị treo hoặc chậm, dẫn đến trải nghiệm người dùng không mong muốn. Bất kỳ tác vụ dài hạn nào cũng nên được thực hiện mà không block main thread này, để ứng dụng của bạn không hiển thị những thứ được gọi là "jank", những animation bị khựng lại, hoặc bị delay với các tương tác như touch, swipe.

Để thực hiện một network request ngoài main thread, một pattern phổ biến là callbacks. Các callback cung cấp một công cụ cho phép ta gọi lại một đoạn code trong tương lai. Với callback, việc lấy dữ liệu từ một trang web trông như sau:
```
class ViewModel: ViewModel() {
   fun fetchDocs() {
       get("developer.android.com") { result ->
           show(result)
       }
    }
}
```
Mặc dù phương thức `get()` được gọi từ main thread, nó sẽ sử dụng một thread khác để thực hiện network reques. Sau đó, một khi kết quả được trả về từ network, callback sẽ được gọi từ main thread. Đây là một cách tốt để có thể xử lý các tác vụ dài hạn, và những thư viện như là [Retrofit](https://square.github.io/retrofit/) có thể giúp ta thực hiện các network request dài hạn mà không block main thread.
## Sử dụng Coroutines để thực hiện tác vụ dài hạn

Coroutines cung cấp một cách đơn giản hóa code được sử dụng để thực thi tác vụ dài hạn như là `fetchDocs`. Để tìm hiểu cách mà coroutines làm cho code ở các tác vụ dài hạn được thực hiện đơn giản hơn, ta cùng viết lại ví dụ về callback ở trên bằng cách sử dụng coroutines:

```
// Dispatchers.Main
suspend fun fetchDocs() {
    // Dispatchers.IO
    val result = get("developer.android.com")
    // Dispatchers.Main
    show(result)
}
// đoạn code này sẽ được giải thích ở phần sau
suspend fun get(url: String) = withContext(Dispatchers.IO){/*...*/}
```

Đoạn code này có block main thread không? Nó làm cách nào để trả về kết quả từ phương thức `get` mà không phải chờ đợi từ network request và block main thread? Nó chỉ ra rằng coroutines cung câp một cách để Kotlin thực thi đoạn code này mà không bao giờ block main thread.

Coroutines được xây dựng trên các function thông thường và thêm vào hai operation mới. Để có thể **invoke** và **return**, coroutines thêm vào **suspend** và **resume**.

* **suspend** - tạm dừng thực thi coroutine hiện tại, lưu lại tất cả các biến cục bộ.
* **resume** - coroutine bị suspend sẽ tiếp tục thực thi từ điểm nó dừng lại.

Tính năng này được đưa vào Kotlin bằng từ khóa `suspend` ở function. Ta có thể chỉ gọi suspend function từ một suspend function khác, bằng các sử dụng một coroutines builder như là `launch` để khởi một một coroutine mới.

> Suspend và resume làm việc cùng nhau để thay thế các callbacks

Trong ví dụ ở trên, `get` sẽ suspend coroutine trước khi nó bắt đầu network request. Funtion `get` sẽ vẫn chịu trách nhiệm chạy network request ở bên ngoài main thread. Sau đó, khi request hoàn thành, thay vì gọi tới callback để thông báo cho main thread, nó sẽ đơn giản là `resume`  coroutine bị suspend.

![](https://images.viblo.asia/2742a5cc-e0d4-458a-9ef0-6b5ffc6da8ce.gif)

Cùng nhìn vào cách mà `fetchDocs` được thực thi, ta có thể thấy cách mà **suspend** làm việc. Bất cứ khi nào một coroutines bị suspend, stack frame hiện tại (nơi mà Kotlin sử dụng để kiểm soát các function đang thực thi và các biến của chúng) được copy và lưu lại để sử dụng sau này. Khi nó được **resume**, stack frame sẽ được copy trở lại từ nơi nó được lưu trữ và tiếp tục chạy. Tại điểm giữa của animation, khi mà tất cả coroutines trên main thread bị suspend, main thread sẽ thoải mái update giao diện và xử lý sự kiện từ người dùng. Suspend và resume làm việc cùng nhau để thay thế các callbacks.

> Khi tất cả coroutines trên main thread bị suspend, main thread sẽ tự do làm những công việc khác.

Mặc dù chúng ta đã viết những mã thực thi tuần tự như là một network request và sẽ làm block main thread, coroutines sẽ thực thi code ta viết đúng như cách ta mong muốn để không block main thread.

Tiếp theo, ta hãy cùng nhìn vào cách để sử dụng coroutines để main-safety cũng như tìm hiều về dispatchers.

# Main-safety với coroutines
Trong Kotlin coroutines, một suspend function được viết đúng sẽ luôn luôn an toàn để có thể gọi từ main thread. Không quan trọn chúng làm gì, chúng sẽ luôn cho phép bất kỳ thread nào gọi tới chúng.

Tuy nhiên, có rất nhiều thứ ta cần phải làm trong ứng dụng Android mà chúng qua chậm để có thể thực hiện ở main thread. Các network request. parse JSON, đọc ghi dữ liệu từ database, ... Bất kỳ việc nào trong số đó đều có thể làm chậm đi main thread.

Sử dụng **suspend** không báo cho Kotlin chạy một function ở background thread. Chính xác, cần phải nói rằng coroutines sẽ thực thi ở main thread. Trong thực tế, nó là một ý tưởng tốt khi sử dụng `Dispatchers.Main.immediate` khi chạy một coroutines để phản hồi lại một UI event. Bằng cách đó, nếu ta không thực thi một công việc dài hạn yêu cầu main-safety, kết quả sẽ được trả về ngay ở frame tiếp theo cho người dùng.

> Coroutines sẽ chạy ở main thread, và suspend không có nghĩa là background thread.

Để có thể làm cho function thực thi lâu dài không làm chậm main thread, ta có thể báo cho Kotlin coroutines thực thi công việc ở `Default` hay `IO` dispatcher. Trong Kotlin, tất cả coroutines phải được chạy ở một dispatcher- kể cả khi chúng được chạy trên main thread. Coroutines có thể **suspend** chính bản thân chúng, và dispatcher là thứ sẽ biết cách để **resume** chúng.

Để có thể chỉ rõ nơi mà coroutines chạy, Kotlin cung cấp 3 [Dispatcher](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-coroutine-dispatcher/) để ta có thể sử dụng:


|Dispatchers.[Main](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-main.html) | Dispatchers.[IO](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-i-o.html) |Dispatchers.[Default](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-default.html) |
| -------- | -------- | -------- |
| Main thread trên Android, tương tác với UI và thực hiện những công việc nhẹ.     | Được tối ưu cho việc truy vấn bộ nhớ cũng như truy cập mạng ngoài main thread    | Được tối ưu cho các tác vụ yêu cầu nhiều CPU ngoài main thread     |
| Gọi tới suspend function, UI function và update Live Data    | Database, đọc ghi file, network request     | Sắp xếp danh sách, parse JSON, ...·     |

Tiếp tục với ví dụ ở trên, ta sẽ sử dụng dispathcer để khai báo `get` function. Bên trong thân của `get`, ta sẽ gọi `withContext(Dispathcer.IO)` để tạo một block mới sẽ chạy ở `IO` dispatcher. Bất kỳ dòng code nào ta viết ở trong block đó sẽ luôn luôn thực thi ở `IO` dispatcher. Vì `withContext` bản thân nó đã là một suspend function, nó sẽ sử dụng coroutines để cung cấp main-safety.

```
// Dispatchers.Main
suspend fun fetchDocs() {
    // Dispatchers.Main
    val result = get("developer.android.com")
    // Dispatchers.Main
    show(result)
}
// Dispatchers.Main
suspend fun get(url: String) =
    // Dispatchers.IO
    withContext(Dispatchers.IO) {
        // Dispatchers.IO
        /* perform blocking network IO here */
    }
    // Dispatchers.Main
```

Với coroutines, ta có thể thực hiện thread dispatch với sự kiểm soát hoàn toàn. Bởi `withContext` cho phép ta kiểm soát thread mà bất kỳ dòng code nào thực thi mà không cần sử dụng callbacks để trả về kết quả, ta có thể sử dụng nó ở những function rất nhỏ như là đọc từ database hay thực hiện network request. Vậy nên, ta có thể sử dụng `withContext`để đảm bảo mọi function đều có thể an toàn để gọi từ bất kỳ `Dispatcher` nào, bao gồm cả `Main`.

Trong ví dụ này, `fetchDocs` được thực thi ở main thread, nhưng nó hoàn toàn an toàn khi gọi tới phương thức `get` để có thể thực hiện network request ở trong background. Bởi coroutines hỗ trợ **suspend** và **resume**, coroutines ở main thread sẽ được resume ngay khi kết quả của block `withContext` hoàn thành.

> Suspend function được viết tốt sẽ luôn luôn an toàn để gọi tới từ main thread
 
Việc làm cho mọi suspend function thành main-safe là một ý tưởng rất tốt. Nếu function thực hiện bất kỳ công việc nào như là truy vấn bộ nhớ, network hay sử dụng nhiều CPU, sử dụng `withContext` để có thể đảm bảo nó an toàn để gọi từ main thread. 

# Tiếp theo
Trong bài viết này, ta đã cùng nhau tìm hiểu vấn đề mà coroutines sẽ giải quyết. Coroutines là một concept cũ trong các ngôn ngữ lập trình mà trở nên phổ biến trong khoảng thời gian gần đây.

Trong Android, ta có thể sử dụng coroutines để giải quyết hai vấn để thông thường:
1. Đơn giản code cho những tác vụ dài hạn.
2. Đảm bảo main-safety

Trong bài viết tiếp theo, ta sẽ cùng nhau tìm hiểu cách sử dụng Coroutines trong ANdroid. Cảm ơn bạn đã theo dõi bài viết

# Tài liệu tham khảo:
https://medium.com/androiddevelopers/coroutines-on-android-part-i-getting-the-background-3e0e54d20bb