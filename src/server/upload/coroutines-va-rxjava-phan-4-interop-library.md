## Tại sao chúng ta cần thư viện Interop?
Câu trả lời rõ ràng nhất là khi bạn cần migrate từ thư viện này sang thư viện khác. Bạn không nên migrate một lần vì điều đó sẽ làm tăng nguy cơ xảy ra sự cố. Một cách tiếp cận tốt hơn là migrate theo tính năng. Trong trường hợp đó, bạn sẽ cần cả hai thư viện cùng nhau trong dự án của mình và khả năng sử dụng một thư viện này ở trên thư viện kia.

Câu trả lời ít rõ ràng hơn là khi bạn muốn sử dụng Coroutines từ mã Java. Bạn không thể gọi Coroutines từ Java do mã mà trình biên dịch Kotlin tạo cho bạn. Vì lý do này, bạn cần một cầu nối có thể sử dụng Coroutines từ Java. RxJava là một trong những lựa chọn.

## Bắt đầu
Nếu bạn muốn sử dụng thư viện Interop, bạn cần import thư viện này vào dự án của mình.
```
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-rx2:$kotlin_coroutines_version"
```

Thao tác này sẽ import Coroutines và RxJava 2, trong trường hợp bạn chưa import chúng vào dự án của mình.

## Coroutines trên RxJava
Hãy quay lại ví dụ mà chúng ta đã sử dụng trong [Phần 2](https://viblo.asia/p/coroutines-va-rxjava-phan-2-cancelling-execution-OeVKBNWYKkW#_rxjava-1): một bộ đếm thời gian timer phát ra một item mỗi giây.

```
Observable.interval(1, TimeUnit.SECONDS)
```

Đây là mã RxJava. Làm thế nào chúng ta có thể consume nó bằng cách sử dụng Coroutines?

Chúng ta có thể sử dụng extension function openSubscription trên Observable. Điều đó sẽ trả về một SubscriptionReceiveChannel mà bạn có thể mở một subscription và sử dụng các elements như thể chúng được phát ra bởi một Channel.

```
Observable.interval(1, TimeUnit.SECONDS)
    .openSubscription().use { channel ->
        for (value in channel) {
            consumeValue(value)
        }
    }
```

Bạn cũng có thể chỉ sử dụng phần tử đầu tiên được gửi bởi nguồn thông tin RxJava với họ phương thức await.  Toán tử `.await ()` có sẵn trên Single, `.awaitFirst()` có sẵn trên Observable, v.v.

Đây là cách bạn có thể sử dụng hàm mở rộng `awaitFirstOrDefault(value).`

```
val value = Observable.interval(1, TimeUnit.SECONDS)
                .awaitFirstOrDefault(-1)
```

Còn ngược lại thì sao? Làm thế nào chúng ta có thể sử dụng Coroutines bằng RxJava?

## RxJava trên Coroutines

Có một số chức năng mở rộng mà chúng ta có thể sử dụng để consume Channels và Coroutines bằng RxJava.

### Consuming Coroutines bằng RxJava
Bạn có thể chuyển đổi bất kỳ Job nào thành Completable với chức năng mở rộng `Job.asCompletable`.

```
val job = launch {
    heavyComputation()
}
job.asCompletable(CommonPool).subscribe({
    // Job completed
})
```

Hãy tưởng tượng chúng ta có một Coroutine thực hiện một phép tính heavy. Chúng ta có thể chuyển đổi Job đó thành một Completable và đăng ký nó như thể nó được tạo ban đầu bằng RxJava.

Trong ví dụ đó, chúng ta đang chuyển CommonPool làm tham số cho hàm tiện ích mở rộng: đó là CoroutineContext mà từ đó kết quả completable sẽ được báo hiệu.

Bạn cũng có thể sử dụng `Deferred.asSingle` theo cách tương tự.

```
val deferred = async {
    heavyComputation()
}
deferred.asSingle(CommonPool).subscribe({
    // Job completed
}, {
    // Error happened
})
```

### CoroutineBuilders
Có CoroutineBuilders sẽ trả về một nguồn thông tin RxJava. Khi bạn đăng ký, như bất kỳ CoroutineBuilder nào khác, nó sẽ tạo một Coroutine mới và chạy lambda suspending bên trong nó.

Các methods sẵn có: `rxCompletable`, `rxMaybe`, `rxSingle`, `rxObservable` and `rxFlowable`.

Ví dụ như cách sử dụng rxCompletable:

```
rxCompletable {
    // Suspending lambda
}.subscribe()
```

Unsubscribing sẽ huỷ Coroutine.

### Consuming các Channels bằng RxJava
Bạn cũng có thể sử dụng chức năng mở rộng [GetChannel.asObservable](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-rx2/kotlinx.coroutines.experimental.rx2/kotlinx.coroutines.experimental.channels.-receive-channel/as-observable.html) để chuyển đổi bất kỳ channel nào thành channel loại hot reactive observable.

Ref: https://medium.com/capital-one-tech/coroutines-and-rxjava-an-asynchronicity-comparison-part-4-interop-library-4a2439a690f9