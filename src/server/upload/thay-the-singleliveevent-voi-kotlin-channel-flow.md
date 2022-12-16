![](https://images.viblo.asia/734e66ec-712c-4e78-bbda-49726f179a79.jpeg)
## SingleLiveEvent
Khi chúng ta làm việc với LiveData, đôi khi chúng ta sẽ gặp rắc rối với việc LiveData sẽ observer lại khi chúng ta back lại từ một màn hình khác. Điều này thật không hay khi chúng ta muốn thực hiện các công việc chỉ thực hiện một lần như hiển thị các thông báo, chuyển màn hay hiển thị dialog, ... Để khắc phục điều đó, chúng ta thường implement một clss là SingleLiveEvent. Nó thực sự hữu ích cho trường hợp này, tuy nhiên với việc kotlin cùng coroutine ngày càng phổ biến thì chúng ta có nhiều lựa chọn hơn để xử lý công việc trên. Ở bài viết này, mình sẽ giới thiệu đến các bạn **Chanel** và **Flow** của **Coroutine** để thay thế cho SingleLiveEvent
# 1. Channel
*Channels provide a way to transfer a stream of values.*
Thay vì dùng  `val action = SingleLiveEvent<Action>()` chúng ta sẽ đổi thành `val action = Channel<Action>(Channel.BUFFERED)`
và gọi ra để dùng : `viewModel.action.onEach{ ... }.launchIn(lifecycleScope)`

Và đúng như những gì chúng ta mong đợi, action đã không bị gọi lại.
![](https://images.viblo.asia/658e4a29-4a01-49ec-9885-a5f24e40706d.gif)

Tuy nhiên, channel được gắn với lifecycle của view nên khi view bị hủy, channel cũng bị hủy theo. Và action không được gọi khi chúng ta màn hình được tạo lại
```
override fun onStateChanged(source: LifecycleOwner, event: Lifecycle.Event) {
    if (lifecycle.currentState <= Lifecycle.State.DESTROYED) {
        lifecycle.removeObserver(this)
        coroutineContext.cancel()
    }
}
```

# 2. BroadcastChannel + Flow
Để giải quyết vấn đề trên, chúng ta có thể sử dụng **BroadcastChannel + Flow**. Cùng xem cách triển khai nhé
- ViewModel
```
class MyViewModel : ViewModel() {
    protected val actionSender = BroadcastChannel<Action>(Channel.BUFFERED)
    val actionReceiver = actionSender.asFlow()
}
```
- View
```
private fun observeActionCommand() {
    lifecycleScope.launchWhenStarted {
        viewModel.actionReceiver.collect {
            // TODO
        }
    }
}
```
## 2.1 So sánh Channel vs BroadcastChannel
Sử dụng cách tiếp cận đầu tiên với Channel, nó triển khai SendChannel và ReceiveChannel và cả 2 sẽ bị hủy khi view bị hủy
Mặt khác, BroadcastChannel chỉ triển khai SendChannel. GetChannel mới được tạo để thu thập các mục từ BroadcastChanel (openSubscription) mỗi khi chúng tôi khởi chạy Luồng (từ .asFlow). Bằng cách này, chỉ có GetChannel bị đóng khi view bị hủy còn BroadcastChannel được giữ lại.

## 2.2 launch vs launchWhenStarted
Như chúng ta đã biết LiveData chỉ observer khi LifecycleOwner ở trạng thái hoạt động (State.STARTED).

Nếu chúng tôi sử dụng khởi chạy trên giải pháp của mình, chúng tôi có thể gặp phải tình huống có vấn đề:

**Ứng dụng trong nền**

Màn hình của chúng tôi đã chuyển sang trạng thái **saveState** nhưng hành động của chúng tôi vẫn tiếp tục được tiêu thụ. Vì vậy, nó có thể dẫn đến một ngoại lệ nếu chúng ta đang cố gắng thực hiện một transaction.

Sử dụng launchWhenStarted, chúng tôi khiến biến LiveData tạm dừng tiêu thụ nếu trạng thái vòng đời "thấp hơn" so với Started.
# 3. Tham khảo
https://cesarmorigaki.medium.com/replace-singleliveevent-with-kotlin-channel-flow-b983f095a47a