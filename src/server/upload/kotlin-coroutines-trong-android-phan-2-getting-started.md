Chào các bạn, đây là phần thứ hai trong chuỗi bài viết về Kotlin Coroutines trong Android. Hi vọng bài viết sẽ mang lại những kiến thức bổ ích cho bạn.
# Tóm lược nội dung
Ở [phần một](https://viblo.asia/p/kotlin-couroutines-trong-andoird-phan-1-co-ban-GrLZD8DVZk0), chúng ta đã cùng nhau thảo luận về những vấn đề mà coroutine có thể giải quyết. Một cách ngắn gọn, coroutines giúp chúng ta giải quyết hai vấn đề rất thường gặp trong lập trình, gồm:
1. **Long running task**: là những tác vụ mất nhiều thời gian để thực hiện và sẽ block main thread.
2. **Main-safety**: cho phép ta đảm bảo bất kỳ suspend function nào cũng có thể được gọi từ main thread.

Để giải quyết hai vấn đề này, coroutines được xây dựng bằng cách thêm **suspend** và **resume** vào các function thông thường. Khi tất cả các coroutine trong một thread cụ thể được suspend, nó sẽ có thể thoải mái làm những công việc khác.
Tuy nhiên, bản thân coroutines không giúp chúng ta có thể theo dõi công việc đã được hoàn thành hay chưa. Việc có một số lượng lớn các coroutines - hàng trăm hoặc hàng nghìn - và tất cả chúng đều được suspend ở cùng một thời điểm là một điều rất tốt. Đồng thời, mặc dù các coroutine không tốn nhiều tài nguyên, nhưng công việc chúng thực hiện thường mang lại giá trị lớn, như là đọc file hay thực hiện các network request.
Để có thể tracking hàng nghìn coroutines thủ công bằng code là một công việc khá khó khăn. Ta *có thể* cố gắng tracking tất cả chúng thủ công và đảm bảo chúng đều hoàn thành hoặc bị huỷ, tuy nhiên việc code như thế này sẽ thật buồn chán và dễ lỗi. Nếu code không thật sự hoàn hảo, ta có thể mất kiểm soát các coroutine, thứ được gọi là *work leak*.
*Work leak* cũng tương tự như memory leak, nhưng tệ hơn. Đó là khi một coroutine bị mất. Ngoài việc sử dụng bộ nhớ, một *work leak* có thể tự resume bản thân nó để tiếp tục sử dụng CPU, disk hoặc thực hiện một network request.
> Một coroutine bị leak có thể tiêu tốn bộ nhớ, CPU, disk, hoặc thực hiện một network request không cần thiết.

Để tránh việc leak coroutine, Kotlin đưa ra khái niệm **[structured concurrency](https://kotlinlang.org/docs/reference/coroutines/basics.html#structured-concurrency)**. Structured concurrency là sự kết hợp các tính năng của ngôn ngữ và các trường hợp thực tiễn tốt nhất, cho phép chúng ta có thể tracking tất cả các coroutine đang chạy nếu ta thực hiện đúng cách.
Trong Android, ta có thể sử dụng structured concurrency để thực hiện 3 việc:
1. **Cancel work** khi nó không còn cần thiết nữa.
2. **Keep track** khi công việc đang thực hiện.
3. **Signal error** khi một coroutine thất bại.
Chúng ta hãy cùng đi sâu vào mỗi công việc trên và xem cách mà structured concurrency giúp chúng ta đảm bảo không bao giờ mất kiểm soát đối với các coroutine đang chạy và không để xảy ra leak work.
# Cancel work with scopes
Trong Kotlin, coroutine phải được chạy bên trong một thứ được gọi là `CoroutineScope`. Một `CoroutineScope` giữ kiểm soát các coroutine của chúng ta, kể cả khi coroutine đã được suspend. Không giống như `Dispatcher` mà ta đã nói đến ở phần một, `CoroutineScope` không phải là thứ thực sự thực thi các coroutine của chúng ta - nó chỉ là thứ đảm bảo chúng ta không mất kiểm soát các coroutine được tạo ra.
Để đảm bảo tất cả coroutine được kiểm soát, Kotlin không cho phép ta khởi động một coroutine mới mà không có một `CoroutineScope`. `CoroutineScope` cho phép ta có thể tạo một coroutine mới với đầy đủ tính năng đã giới thiệu ở phần một.
Một `CoroutineScope` giữ kiểm soát tất cả các coroutine của chúng ta, và nó có thể cancel tất cả các coroutine mà nó kiểm soát. Tính năng này rất phù hợp với việc phát triển ứng dụng Android, nơi mà ta luôn muốn đảm bảo rằng mọi thứ được bắt đầu bởi một màn hình sẽ được dọn dẹp sạch sẽ khi mà người dùng rời đi.
> Một `CoroutineScope` giữ kiểm soát tất cả các coroutine của chúng ta, và nó có thể cancel tất cả các coroutine mà nó kiểm soát.
## Starting new coroutines
Một điều quan trọng cần lưu ý rằng ta không thể gọi `suspend` function từ tất cả mọi nơi. Cơ chế suspend và resume yêu cầu ta chuyển đổi từ function thông thường sang một coroutine.
Có hai cách để khởi động một coroutine, và chúng có cách sử dụng khác nhau:
1. **launch** sẽ khởi động một coroutine mới theo cơ chế "fire and forget", nghĩa là nó sẽ không trả về kết quả cho người gọi.
2. **async** sẽ khởi động một coroutine mới và cho phép ta có thể trả về một kết quả với suspend function được gọi là `await`.
Trong hầu hết trường hợp, ta sẽ chỉ sử dụng `launch` để khởi chạy một coroutine mới. Do các function thông thường không có cách nào để gọi `await` (ghi nhớ rằng các function bình thường sẽ không thể gọi trực tiếp các suspend function), nó không có nhiều ý nghĩa khi sử dụng `async` như là điểm khởi động các coroutine. Ta sẽ bàn thêm về việc sử dụng `async` ở phần sau.
Ta sẽ sử dụng `launch` để khởi động một coroutine mới:
```
scope.launch {
    // Block này sẽ khởi động một coroutine mới
    // "bên trong" scope.
    // 
    // Có thể gọi tới suspend function
   fetchDocs()
}
```
Bạn có thể nghĩ đơn giản rằng `launch` như là một cây cầu giúp chúng ta đi từ các function thông thường sang suspend function. Bên trong body của `launch`, ta có thể gọi các suspend function và đảm bảo main safety như đã được giới thiệu ở bài viết trước.
> `launch` như là một cây cầu giúp chúng ta đi từ các function thông thường sang suspend function. 

*Note: Một điểm khác biệt quan trọng giữa `launch` và `async` đó là cách chúng xử lý exception. `async` sẽ giả định chúng ta sẽ gọi `await` để nhận kết quả (hay exception), do đó nó sẽ mặc định không trả về exception. Điều đó có nghĩa rằng nếu ta sử dụng `async` để khởi động một coroutine mới, nó sẽ âm thầm bỏ qua exception.*
Do `launch` và `async` chỉ có thể được gọi trên một `CoroutineScope`, nên tất cả các coroutine chúng ta tạo nên sẽ luôn được theo dõi bởi một scope. Kotlin sẽ không để chúng ta tạo nên một coroutine không được theo dõi, từ đó có thể tránh được work leak.
## Start in the ViewModel
Vậy nếu `CoroutineScope` theo dõi tất cả các coroutine được khởi động bởi nó, và `launch` tạo nên một coroutine thì chính xác là nơi nào ta sẽ gọi tới `launch` và để đặt scope của chúng ta? Đồng thời, khi nào ta sẽ huỷ bỏ tất cả coroutine được khởi động bên trong một scope?
Trong Android, ta thường liên kết một `CoroutineScope` với một màn hình. Điều này cho phép ta sẽ không bị leak các coroutine hay thực hiện những công việc cho `Activity` hay `Fragment` mà người dùng không còn cần tới. Khi người dùng chuyển hướng khởi màn hình, `CoroutineScope` liên kết với màn hình đó có thể `cancel` tất cả công việc.
> Structured concurrency đảm bảo khi một scope bị huỷ, tất cả coroutine của nó cũng sẽ bị huỷ.

Khi sử dụng coroutine cùng với Android Architecture Components, ta sẽ muốn `launch` các coroutine bên trong `ViewModel`. Đây là một vị trí tự nhiên, nơi mà mọi công việc được bắt đầu và ta không phải lo lắng việc xoay màn hình có thể huỷ tất cả các coroutine.
Để có thể sử dụng coroutine trong `ViewModel`, ta có thể sử dụng `viewModelScope` [extension property](https://kotlinlang.org/docs/tutorials/kotlin-for-py/extension-functionsproperties.html) từ `lifecycle-viewmodel-ktx:2.1.0-alpha04`.
Hãy quan sát ví dụ sau:
```
class MyViewModel(): ViewModel() {
    fun userNeedsDocs() {
        // Khởi động một coroutine mới trong ViewModel
        viewModelScope.launch {
            fetchDocs()
        }
    }
}
```
`viewModelScope` sẽ tự động cancel bất kỳ coroutine nào được khởi động bởi `ViewModel` này khi mà `ViewModel` bị clear (khi callback `onCleard()` được gọi).  Đây thường là một hành vi đúng - nếu chúng ta thực hiện công việc khi người dùng đã đóng ứng dụng, chúng ta đơn giản là đang tiêu tốn pin của người dùng một cách lãng phí cho các request.
Và để an toàn hơn nữa, một `CoroutineScope` sẽ tự lan truyền. Do đó, nếu một coroutine ta bắt đầu lại bắt đầu một coroutine khác, cả 2 coroutine này sẽ được kết thúc với cùng một scope.
Do đó, khi ta cần một coroutine được thự thi khi một `ViewModel` còn tồn tại, sử dụng `viewModelScope` để chuyển từ function thông thường sang coroutine. Từ đó, `viewModelScope` sẽ tự động `cancel` các coroutine cho chúng ta. Ta hoàn toàn có thể viết một vòng lặp vô tận mà không tạo nên leak, như ví dụ sau:
```
fun runForever() {
    // Khởi động một coroutine mới trong ViewModel
    viewModelScope.launch {
        // Huỷ bỏ khi ViewModel bị clear
        while(true) {
            delay(1_000)
            // do something every second
        }
    }
}
```
Bằng cách sử dụng `viewModelScope`, ta có thể đảm bảo tất cả công việc, kể cả một vòng lặp vô tận, sẽ được cancel khi mà nó không còn cần đến.
# Keep track of work
Khởi động một coroutine mới là một điều tốt - và phần lớn code thì đó là tất cả những điều ta cần quan tâm. Khởi động một coroutine, tạo một network request, và viết kết quả vào database.
Tuy nhiên, đôi khi, ta cần một số thứ phức tạp hơn. Ví dụ, ta có thể sẽ cần thực hiện hai network request đồng thời trong một coroutine - để làm điều này ta cần khởi động nhiều coroutine hơn.
Để tạo nhiều coroutine hơn, bất kỳ suspend function nào cũng có thể làm được bằng cách sử dụng một builder khác được gọi là [`coroutineScope`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/coroutine-scope.html) hoặc người anh em của nó, [`suspervisorScope`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/supervisor-scope.html). API này thực sự có phần khó hiểu. `coroutineScope` và `CoroutineScope` là những thứ hoàn toàn khác nhau mặc dù chúng chỉ khác nhau 1 chữ cái trong tên của chúng.
Khởi chạy một coroutine mới ở bất kỳ đâu là một cách để tạo nên các work leak tiềm ẩn. Người gọi có thể sẽ không biết về coroutine mới này và sẽ không kiểm soát công việc.
Để giải quyết vấn đề này, structured concurency sẽ giúp chúng ta. Cụ thể, nó cung cập một sự đảm bảo rằng khi một suspend function được trả về, tất cả công việc của nó đều được hoàn hành.
> Structured concurrency đảm bảo rằng khi một suspend function được trả về, tất cả công việc của nó đều được hoàn thành.
Đây là một ví dụ về việc sử dụng `coroutineScope` để fetch 2 document:
```
suspend fun fetchTwoDocs() {
    coroutineScope {
        launch { fetchDoc(1) }
        async { fetchDoc(2) }
    }
}
```
Trong ví dụ này, 2 document được fetch từ network cùng một thời điểm. Document đầu tiên được fetch trong một coroutine khởi động với `launch`, tức là "fire and forget" - có nghĩa là nó sẽ không trả về kết quả cho người gọi.
Document thứ hai được fetch với `async`, do đó document này có thể được trả về cho người gọi. Ví dụ này trông có vẻ hơi lạ, khi thông thường ta có thể sử dụng `async` cho cả 2 document - nhưng cái mình muốn là cho các bạn thấy về việc ta có thể kết hợp giữa `launch` và `asycn` tuỳ theo thứ bạn muốn.
> `couroutineScope` và `supervisorScope` cho phép ta có thể khởi động coroutine từ suspend function một cách an toàn.

Tuy nhiên, lưu ý rằng đoạn code này không bao giờ chờ đợi các coroutine mới khác. Trông có vẻ như `fetchTwoDocs` sẽ trả về khi mà các coroutine đang chạy.
Để thực hiện structured concurrency và tránh work leak, chúng ta muốn chắc chắn rằng khi một suspend function, như là `fetchTwoDocs` trả về, tất cả những công việc của nó đều được hoàn thành. Điều đó có nghĩa là các coroutine được khởi chạy bởi nó phải hoàn thành trước khi `fetchTwoDocs` trả về.
Kotlin đảm bảo rằng công việc này sẽ không leak khởi `fetchTwoDocs` với `coroutineScope` builder. `coroutineScope` builder sẽ tự suspend nó cho tới khi tất cả coroutine được khởi động bên trong nó hoàn thành. Do đó, không có cách nào để trả về `fetchTwoDocs` cho tới khi tất cả coroutine được khởi động bên trong `coroutineScope` builder được hoàn thành.
## Lots and lots of work
Ta đã tìm hiểu cách để kiểm soát một hay hai coroutine. Tiếp theo, ta hãy cùng all-in để cố gắng kiểm soát 1000 coroutine.
Hãy nhìn hình minh hoạ dưới đây:
![](https://images.viblo.asia/91c370e8-b154-455b-bd4f-54e0d8b35e1a.gif)
*Ví dụ này là về việc thực hiện 1000 network request cùng một thời điểm. Việc này không được khuyến khích thực hiện trong thực tế trên ứng dụng Android - ứng dụng của bạn sẽ tiêu tốn rất nhiều tài nguyên.*
Trong đoạn code này, chúng ta đã khởi chạy 1000 coroutine với `launch` bên sai một  `coroutineScope` builder. Ta có thể thấy mọi thứ được liên kết với nhau. Do chúng ta đang ở trong một suspend function, một đoạn code ở đâu đó phải sử dụng một `CoroutineScope` để khởi tạo một coroutine. Chúng ta không biết bất kỳ thứ gì về `CoroutineScope` đó, nó có thể là `viewModelScope` hay một `CoroutineScope` khác được định nghĩa ở đâu đó. Không quan trọng rằng scope nào gọi, `coroutineScope` builder sẽ sử dụng nó như là cha để tạo nên scope mới.
Sau đó, bên trong block của `coroutineScope`, `launch` sẽ khởi động các coroutine mới bên trong scope mới. Cho tới khi các coroutine được khởi chạy bởi `launch` được hoàn thành, scope mới sẽ kiểm soát chúng. Cuối cùng, một khi tất cả các coroutine được khởi động bên trong `coroutineScope` hoàn thành,  `loadLots` sẽ có thể tự do để trả về.
*Lưu ý: quan hệ cha-con giữa scope và coroutine được tạo nên bởi đối tượng Job. Nhưng thông thường ta không cần đi quá sâu vào vấn đề này.*
> `coroutineScope` và `supervisorScope` sẽ chờ tất cả các coroutine con hoàn thành.

Có rất nhiều thứ xảy ra bên trong - tuy nhiên điều quan trọng là với việc sử dụng `coroutineScope` và `supervisorScope`, ta có thể khởi chạy một coroutine mới một cách an toàn từ bất kỳ suspend function nào. Mặc dù nó tạo nên một coroutine mới, ta vẫn sẽ không để xảy ra trường hợp leak work bởi ta sẽ luôn suspend caller cho tới khi coroutine mới hoàn thành.
Một điều thú vị nữa là `coroutineScope` sẽ tạo nên một scope con. Do đó, nếu scope cha bị huỷ, nó sẽ truyền tín hiệu này tới tất cả coroutine con. Nếu người gọi là `viewModelScope`, tất cả 1000 coroutine sẽ tự động được huỷ khi người dùng navigate ra khỏi màn hình. Thật tuyệt.
Trước khi chuyển tới phần lỗi, ta cũng nên dành một chút thời gian so sánh giữa `coroutineScope` và `supervisorScope`. Điểm khác biệt chính giữa chúng là một `coroutineScope` sẽ huỷ bất cứ khi nào một con của nó thất bại. Do đó, nếu một network request thất bại, tất cả request khác sẽ bị huỷ ngay lập tức. Do đó, nếu bạn muốn tiếp tục những request khác kể cả khi một trong số chúng thất bại, ta có thể sử dụng `supervisorScope`. Một `supervisorScope` sẽ không huỷ những request khác khi một request thất bại.
# Signal errors when a coroutine fails
Trong coroutine, lỗi được báo hiệu bởi việc trả về exception, tương tự như những function thông thường khác. Exception từ một suspend function sẽ được trả lại caller thông qua resume. Cũng như các function thông thường, ta không bị giới hạn việc try/catch để xử lý lỗi và ta có thể xây dựng nên sự trừu tượng để có thể thực hiện xử lý lỗi với những style khác nhau nếu ta muốn.
Tuy nhiên, có thể có những trường hợp ta sẽ để sót lỗi trong coroutine.
```
val unrelatedScope = MainScope()
// Ví dụ về việc sót lỗi
suspend fun lostError() {
    // async without structured concurrency
    unrelatedScope.async {
        throw InAsyncNoOneCanHearYou("except")
    }
}
```
Chú ý rằng đoạn code này khai báo một coroutine scope không liên quan để chạy một coroutine mới mà không có structured concurrency. Bạn hãy chú ý rằng ở thời điểm bắt đầu, mình có nói rằng structured concurrency là một sự kết hợp giữa các type và thực tiễn lập trình, và khai báo một coroutine scope không liên quan ở trong một suspend function là một việc không tuân theo các thực tiễn lập trình của structured concurrency.
Lỗi bị sót trong đoạn code này bởi vì `async` giả định rằng ta sẽ luôn gọi `await` tại nơi nó sẽ trả lại exception. Tuy nhiên, nếu ta không bao giờ gọi tới `await`, exception sẽ không được xử lý.
> Structured concurrency đảm bảo rằng khi một coroutine bị lỗi, người gọi tới nó hay scope của nó sẽ được thông báo.
Nếu ta sử dụng structured concurrency cho đoạn code trên, lỗi sẽ được trả lại cho người gọi một cách đúng đắn.
```
suspend fun foundError() {
    coroutineScope {
        async { 
            throw StructuredConcurrencyWill("throw")
        }
    }
}
```
Do `coroutineScope` sẽ chờ cho tất cả con của nó hoàn thành, nó có thể nhận được thông báo khi chúng thất bại. Nếu một coroutine được bắt đầu bởi `coroutineScope` ném về một exception, `coroutineScope` sẽ có thể trả nó về cho người gọi. Do sử dụng `coroutineScope` thay vì `supervisorScope`, nó cũng sẽ ngay lập tực huỷ tất cả các coroutine con khi trả về exception.
# What’s next?
Trong bài viết này, chúng ta đã bắt đầu với coroutine trong Android với `ViewModel` và cách làm việc với structured concurrency để làm code của chúng ta tốt hơn.
Trong bài viết tới, chúng ta sẽ nói nhiều hơn về cách sử dụng coroutine trong các trường hợp thực tế.
Cảm ơn các bạn đã dành thời gian đọc bài viết của mình.
# References
[Coroutines on Android (part II): Getting started](https://medium.com/androiddevelopers/coroutines-on-android-part-ii-getting-started-3bff117176dd)