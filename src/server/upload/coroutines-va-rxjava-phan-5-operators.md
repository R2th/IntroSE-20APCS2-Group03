### Introduction
Trong bài viết này, chúng ta sẽ so sánh cách chuyển đổi các streams bằng cách sử dụng Operators.

### Common Operators
Một số operators (toán tử) RxJava có sẵn trong thư viện chuẩn Kotlin như một phần của [Kotlin Collections](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/). Ở đây bạn có thể thấy bảng so sánh các toán tử đơn giản.
![](https://images.viblo.asia/890d411e-2915-44d9-8bf6-7a4c17be9357.png)

Các toán tử này biến đổi stream theo cùng một cách mặc dù một số toán tử khác nhau về tên: ví dụ: skip trong RxJava được gọi là drop trong Coroutines.

### Create Your Own Operator
Một số toán tử không phải là một phần của Kotlin Collections. Tuy nhiên, bạn có thể tự mình tạo ra chúng một cách dễ dàng.

Chúng ta có thể tạo toán tử range RxJava thực hiện với vài dòng mã và một vòng lặp for đơn giản.
```
fun range(
        context: CoroutineContext,
        start: Int,
        count: Int
) = publish(context) {
    for (x in start until start + count) send(x)
}
```

Một số toán tử khác yêu cầu nhiều công sức hơn. Trong ví dụ dưới đây, bạn có thể thấy việc triển khai toán tử RxJava `Completable.zip`, toán tử này nhận hai khối mã và đợi cả hai khối này kết thúc.

```
suspend fun zip(
             context: CoroutineContext,             
             block: () -> Unit, 
             block2: () -> Unit
) {
    val deferred1 = async(context) { block() }
    val deferred2 = async(context) { block2() }
    deferred1.await()
    deferred2.await()
}
```

> Nếu bạn nhận thấy, chúng ta chuyển một CoroutineContext làm tham số. Chúng ta làm điều đó để có thể cancel toán tử một cách dễ dàng bằng cách gọi .cancel() trên Job của context đó như đã đề cập trong Part 2.

### Complex Operators
Còn các toán tử RxJava thậm chí phức tạp hơn như debounce?
![](https://images.viblo.asia/1f29c1ef-9984-42ea-bd66-358531f37334.png)

Bạn có thể tìm thấy debounce dưới dạng một extension function trên ReceiveChannel. Timeout của RxJava tương đương trong Kotlin Coroutines với withTimeoutOrNull, v.v.

### Similarities and Differences
Chúng ta thấy rằng hầu hết các toán tử đều có sẵn trong cả hai thư viện và nếu không, bạn có thể dễ dàng xây dựng chúng.

> Sự khác biệt duy nhất có thể thấy trong hai thư viện này là thời điểm bạn áp dụng các toán tử đó.

Trong khi với RxJava, bạn có thể áp dụng các operator trước khi đăng ký stream, bạn phải làm điều đó sau khi mở đăng ký trong Coroutines. Hãy xem cách map một phần tử trong RxJava:

```
rxObservable
    .map { result -> map(result) }
    .subscribe({
         consumeResult(it)    
    })
```

Và bây giờ chúng ta làm điều đó như thế nào trong Coroutines:
```
broadcastChannel
    .openSubscription()
    .map { result -> map(result) }
```

Trong Coroutines, chúng ta phải làm điều đó sau khi mở đăng ký vì map trong Coroutines là một chức năng mở rộng trên ReceiveChannel<E>. Đây là trường hợp của các toán tử khác như filter, drop, v.v. Khi gọi openSubscription() trả về một đối tượng SubscriptionReceiveChannel<T> mở rộng từ ReceiveChannel<E>.
    
Như vậy, Coroutines yêu cầu thêm công sức nếu bạn muốn nhiều Observers áp dụng các toán tử giống nhau. Tất nhiên là bạn có thể làm được! Nhưng nó yêu cầu nhiều mã hơn.
    
Ref: https://medium.com/capital-one-tech/coroutines-and-rxjava-an-asynchronicity-comparison-part-5-operators-2603a8ecaa5f