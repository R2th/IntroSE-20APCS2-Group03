Kotlin coroutin đã chính thức được release và giới thiệu structed concurrency cho Kotlin couroutines.  Nó không chỉ là một tính năng- nó đánh dấu một sự thay đổi về tư tưởng lớn mà trong bài viết này tôi sẽ giải thích nó

Kể từ khi giới thiệu Kotlin coroutine như một chức năng thử nghiệm trong Koltin 1.1 bắt đầu từ năm 2017, nhưng người tạo ra corountine đã làm việc chăm chỉ để giải thích concept của coroutine tới các lập trình viên. Hơn nữa, những API chính trong coroutine được thiết kế tương tự như cac thread API để dễ dàng học tập. Sự tương tự này sẽ có ích trong những ví dụ nhỏ, nhưng nó sẽ không giúp giải thích sự thay đổi trong phong cách lập trình với coroutine

Khi học về thread, chúng ta hay được nghe rằng thread tiêu tốn nhiều tài nguyên và chúng ta không nên tạo ra quá nhiều thread trong ứng dụng. Một ứng dụng tốt thường tạo ra một thread pool tại thời điểm bắt đầu ứng dụng và sử dụng nó để giảm tải các tính toán khác nhau. Một vài môi trường ( đặc biệt phải nói tới iOS) đi xa tới mức nói rằng "không có khái niệm luồng" (mặc dù mọi thứ vẫn chạy trên các luồng). Chúng cung cấp một thread pool với hàng đợi để sẵn sàng submit code của bạn.

Nhưng câu chuyện khác với coroutine. Nó không chỉ ổn mà còn rất thuận tiện để tạo ra coroutine nếu bạn cần, vì chúng rất nhẹ. Chúng ta hãy xem xét một vài trường hợp sử dụng coroutine.

# Asynchronous operations

Giả sử dụng bạn viết một front-end UI application (mobile,web hoặc desktop- điều này không quan trọng trong cí dụ này) và bạn cần xử lý một request tới backend của bạn để fetch dữ liệu và update UI của bạn với kết quả mà bạn nhận được từ request. Hãy thử viết nó như sau:

```Kotlin
fun requestSomeData() {
    launch(UI) {
        updateUI(performRequest())
    }
}
```

Ở đây chúng ta chạy một coroutine mới trong UI context với launch(UI), gọi suspending function `performRequest` để thực hiện một cuộc gọi bất đồng bộ tới backend mà không block main UI thread, và sau đó cập nhật giao diện với kết quả nhận được. Mỗi requestSomeData được gọi tạo ra một coroutine của nó và nó ổn, đúng không? Nó không khác nhiều so với các ví dụ mà bạn tìm thấy trong các ngôn ngữ lập trình khác từ C# và JS cho tới GO.

Nhưng đây là một vấn đề. Những asynchronous operation có thể tốn nhiều thời gian, nhiều thời gian để hoàn thành nếu có một vài vấn đề với mạng hoặc với backend. Hơn nữa, nhưng operation này thường được thực thi trong một scope của một số thành phần UI như một window hoặc một page. Nếu một operation tốn quá nhiều thời gian để hoàn thành, thông thường người dùng sẽ đóng UI lại và làm cái gì đó khác hoặc tệ hơn là mở lại UI này và thử thực hiện lại thao tác đó. Nhưng chúng ta vẫn có một operation trước đó vẫn đang chạy trong background và chúng cần một cơ chế để hủy bỏ khi UI element tương ứng đụng đóng lại bởi người dùng. Trong Kotlin coroutine điều này dẫn chúng ta tới các đề xuất về các desgin patterns khá thủ đoạn ddể đảm bảo việc hủy bỏ được xử lý đúng cách. Hơn nữa, bạn phải luôn nhớ chỉ định một context thích hợp, hoăc `updateUI` có thể không hoạt động vì việc bị gọi sai thread và sẽ dẫn tới việc UI không hoạt động. Đây là một lỗi nghiêm trọng. Một hàm `launch { … }` đơn giản để viết, nhưng nó không thực sự là những gì bạn nên viết.

Ở cấp độ triết học hơn, bạn hiếm khi chạy coroutines "globally" như bạn làm với thread. Coroutine luôn luôn có liên quan tới một vài local scope trong ứng dụng của bạn mà có một life-time, như một UI element. Vì vậy, với structured concurrenct chúng ta bây giờ có thể yêu cầu launch được gọi trong một `CoroutineScope` , là một interface được thực thi bởi một đối tượng có vòng đời giới hạn (như UI element hoặc các view modles tương ứng). Bạn thực thi CoroutineScope một lần và bạn sẽ thấy rằng nó là một hàm `lauch` đơn giản bên trong UI class của bạn, mà bạn viết nhiều lần nó trở nên rất dễ dàng.

```Kotlin
fun requestSomeData() {
    launch {
        updateUI(performRequest())
    }
}
```

Chú ý rằng một thực thi của CoroutineScope cũng định nghĩa một coroutine context thích hoặc cho việc cập nhật UI của bạn. Bạn có thể tìm một ví dụ hoàn chỉnh về việc thực thi CoroutineScope trong [tài liệu chính thức của nó](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-coroutine-scope/index.html).

Trong một số trường hợp hiếm gặp nơi bạn cần một global coroutine mà được giới hạn hởi vòng đời của ứng dụng, coroutine cung cấp một đối tượng GlobalScope và nó sẽ chỉ bị giới hạn bởi vòng đời của ứng dụng.

# Parallel decomposition

Đã có nhiều bài viết về Kotlin coroutine, đoạn code sau cho thấy cách để load 2 bức ảnh song song và kết hợp chúng sau đó -  một ví dụ về parallel decomposition với Kotlin coroutine.
```Kotlin
suspend fun loadAndCombine(name1: String, name2: String): Image { 
    val deferred1 = async { loadImage(name1) }
    val deferred2 = async { loadImage(name2) }
    return combineImages(deferred1.await(), deferred2.await())
}
```

Đáng tiếc, ví dụ này sai ở nhiều cấp độ theo những cách rất đặc biệt. Suspending function `loadAndCombine`, bản thân nó được gọi từ bên trong một coroutine được chạy để xử lý một operation lớn hơn. Điều gì sẽ xảy ra nếu hoạt động đó bị hủy? Sau khi load cả hai hình ảnh vẫn tiếp tục. Đó không phải là những gì chúng ta muốn, đặc biệt nếu code đó là một phần của backend server, được nhiều client sử dụng.

Giả phap được đề xuất ở đây là viết `async(coroutineContext) { … }` để load cả hai hình ảnh được xử lý trong coroutine con mà được hủy bỏ khi coroutine cha bị hủy bỏ

Nó vẫn chưa hoàn hỏa. Nếu ảnh đầu tiên thất bại, sau đó `deferred1.await()` ném ra một exception tương ứng, nhưng `async` thứ hai vẫn chạy trong background. Giải quyết điều đó thậm chí còn phức tạp hơn

Chúng ta thấy vấn đề giống nhau xảy ra trong cả hai trường hợp. Một `async { … }` đơn giản có thể được viết một cách dễ dàng, nhưng nó có thể không phải là những gì bạn nên viết.

Với structured concurenct `async` coroutine builder trở thành một extension trong CoroutineScope chỉ như  `launch`. Bạn không chỉ đơn giản là viết `async { … }` nữa, bạn phải cung cấp một scope. Dưới đây là một ví dụ:
```Kotlin
suspend fun loadAndCombine(name1: String, name2: String): Image =
    coroutineScope { 
        val deferred1 = async { loadImage(name1) }
        val deferred2 = async { loadImage(name2) }
        combineImages(deferred1.await(), deferred2.await())
    }
```

Bạn phải đóng gói code bên trong khổi coroutineScope { … } mà tạo thành một giới hạn của operation hay là scope của chính nó. Tất cả các  `async` coroutine trở thành con của scope và nếu scope fails với một exception hoặc được hủy bỏ, tất cả các con của nó cũng bị hủy bỏ.

# Tham khảo
Bài viết có tham khảo từ: https://medium.com/@elizarov/structured-concurrency-722d765aa952

Cảm ơn các bạn đã theo dõi