# Giới thiệu 

Coroutines giờ đã không còn xa lạ với dev android nữa, nhưng liệu chúng ta đã dùng đc hết các công dụng nó mang lại ngoài việc dùng để gọi api với retrofit hay truy cập db với room, nhiều khi chúng ta mới chỉ hiểu nó có tính năng nhưng chưa biết áp dụng vào đâu khi dev Android. Vậy hãy cùng bàn trong bài này nhé.

# Thực hiện

Khái niệm 60fps nghĩa là system sẽ redraw activity mỗi một khoảng th gian để đạt đc 60 frame per second, nghĩa là mỗi frame sẽ được vẽ trong khoảng 1 / 60 sec ~ 16 ms. App sẽ cần thực hiện các logic update trên main threadsao cho vừa đủ dưới 16ms. Nếu app của bạn thực hiện quá nhiều việc trên main thread như vừa tạo view, tính toán logic thì khả năng mỗi frame sẽ tốn hơn 16ms, khi đó sẽ xảy ra hiện tượng drop frame. Việc thời gian cho mỗi frame càng lâu thì càng dễ bị nhận ra qua việc thấy app bị lag, giật. Nếu app của bạn có animation thì việc drop frame càng nhận thấy rõ hơn khi animation ko mượt mà.

Và dưới đây là một đoạn log điển hình cho việc frame bị drop

`Skipped 55 frames!  The application may be doing too much work on its main thread. `

Vậy chúng ta có thể làm gì? Hãy cố gắng đưa tất cả các job cần tính toán nhiều lên server, những logic buộc phải tính toán ở app hãy đưa xuống background. Khi chưa có coroutines thì việc quản lý thread thủ công sẽ khá tốn thời gian và dễ xảy ra lỗi nếu không xử lý tốt, bù lại cho chúng ta khả năng tuỳ chỉnh lớn. Hiện tại coroutines cũng đã đủ để xử lý những tác vụ như vậy rồi nên chúng ta chẳng tội gì mà không dùng cả. Nếu mà chỉ nói đến đây thì lại giống các bài lý thuyết khác rồi, mình thì thích bàn đến cụ thể hơn nữa cho các bạn dễ hiểu.

Trong mô hình MVVM chúng ta đã xử lý data ở ViewModel với `viewModelScope`, viewModelScope là suspend fun nhưng mặc định nó chạy trên `Dispatchers.Main` như ví dụ ở dưới

```kotlin
        viewModelScope.launch {
            try {
                val result = repo.callApi()
                doWork(result)
            } catch (e: Exception) {
                onError(e)
            }
        }
```

Cách làm tốt hơn là move `doWork` xuống background như sau:

```kotlin
        viewModelScope.launch {
            try {
                val result = repo.callApi()
                withContext(Dispatchers.Default) {
                    doWork(result)
                }
            } catch (e: Exception) {
                onError(e)
            }
        }
```

Lưu ý thêm một chút là nếu chúng ta muốn cập nhật liveData để notify ui từ trong background thread thì cần dùng `livedata.post(value)`



Vậy  coroutines có gì hay cho Activity và Fragment ko? Có lifecycleScope phù hợp cho việc xử lý vớ UI

Để show một tip sau 5s, và sau đó 5s thì ẩn đi, code lại có callback hell rồi, không hay cho lắm nhỉ

```kotlin
val DELAY = 5000
Handler().postDelayed({
  showTip()
    Handler().postDelayed({
      hideTip()
    }, DELAY)
}, DELAY)
```

Với coroutines thì dễ hơn nhiều, lưu ý là `lifecycleScope` mặc định cũng trên `Dispatchers.Main` nên đừng tính toán logic gì trong này nhé hoặc có thì hãy `withContext(Dispatchers.Default)` và chuyển lại `Dispatchers.Main` khi cần cập nhật UI

```kotlin
lifecycleScope.launch {
    delay(5000)
    showTip()
    delay(5000)
    hideTip()
}
```

# Tham khảo

Kotlin Coroutines - Use Cases on Android
https://github.com/LukasLechnerDev/Kotlin-Coroutine-Use-Cases-on-Android

Android Performance Patterns: Rendering Performance 101
https://www.youtube.com/watch?v=HXQhu6qfTVU