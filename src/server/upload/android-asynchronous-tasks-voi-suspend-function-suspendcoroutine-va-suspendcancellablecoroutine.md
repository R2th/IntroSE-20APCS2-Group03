# Giới thiệu

Làm việc với asynchronous tasks là việc rất hay gặp khi dev android và đi cùng với sự phát triển của android đã có rất nhiều công cụ hỗ trợ cho chúng ta như Thread, Handler, AsyncTask, RxJava và gần nhất là Kotlin Corotuines.

Nói về curoutines thì một từ khoá được nhắc đến rất nhiều là suspend, chúng ta sẽ cùng đi tìm hiểu về sử dụng suspend để làm asynchronous tasks trong android nhé.

# suspend

Có thể bạn đã đọc ở đâu đó từ khoá suspend cho phép function có khả năng pause và resume, hay một cách khác là suspend function sẽ chờ cho đến khi kết quả sẵn sàn để return và trong thời gian suspend thì nó ko block thread.

Nếu tìm hiểu sâu hơn thì có thể bạn biết một suspend function sẽ được tự động thêm param Continuation để thành một state machine.

Nhưng các cách giải thích trên kia có vẻ không dễ hiểu lắm với người mới bắt đầu nên chúng ta hãy thử cách khác nhé. Trước hết hãy cùng nhìn lại quá khứ chút, trước đây để thực hiện asynchronous tasks chúng ta có gì nào
 
 - AsyncTask: sử dụng callback với các function doInBackground, onPreExecute, onPostExecute, onProgressUpdate. Vấn đề của asynctask là callback hell, nghĩa là khi bạn muốn lồng các async task với nhau thì nó trở nên rất khó quản lý, maintain, code phụ thuộc khó mở rộng ,...
 
- RxJava: Xuất hiện và thay thế callback hell của AsyncTask, tuy nhiên cấu trúc vẫn còn rất rườm rà và cồng kềnh.

- Coroutines: light weight thread, cú pháp ngắn gọn, code asynchronous tasks theo style đồng bộ cực kỳ dễ hiểu.
Thread được chỉ định bởi các hàm suspend tránh việc task bị gọi sai thread gây exception.

Về cơ bản thì các asynchronous tasks là task lâu và chúng ta không biết khi nào nó sẽ kết thúc và thường dùng callback để thông báo hoặc observable. Trên một góc độ nào đó ta có thể hiểu Coroutines làm giúp cho chúng ta việc viết callback, chúng ta chỉ cần await task return success hay là fail. Coroutines làm bằng cách sử dụng suspend, về bản chất là interface Continuation.

Trong Android hiện tại có 2 lib phổ biến là retrofit (network) và room (db) đã tích hợp suspend giúp cho chúng ta gọi api hay db rất gọn gàng. Nhưng liệu đó đã là tất cả, xin trả lời là không, sức mạnh của coroutines còn nhiều hơn và rất nhiều case khác chúng ta có thể xử dụng nó và các bạn có thể đọc thêm ở đây https://github.com/LukasLechnerDev/Kotlin-Coroutine-Use-Cases-on-Android

Ngoài use case ở ví dụ trên thì android còn rất nhiều case cần asynchronous tasks khác, ví dụ khi các bạn thực hiện code với view như khi thực hiện liên tiếp các animation.

Ví dụ 1: Thực hiện animation A, sau đó animation B. Cái này thì animation lib có hỗ trợ sẵn rồi

Ví dụ 2: Thực hiện animation A, sau đó thực hiện recycler view scroll đến item x, sau đó thực hiện animation B

- Cách 1: Nghe animation A kết thúc, gọi recyclerview sctoll to x ở callback animation end của A. Lắng nghe recyclerview scroll tới x rồi gọi start animation B.

Có vẻ cũng ổn nhỉ, không đâu nếu bạn muốn mở rộng như sau, sau animation A thì gọi api get user và thực hiện recycler view scroll đến item x, cả 2 cùng kết thúc mới thực hiện animation B.

Việc implement theo cách 1 khiến cho các CR liên quan asynchronous tasks rất khó thực hiện và tiềm ẩn rủi ro phát sinh bug rất lớn.

- Cách 2: Sử dụng `suspendcoroutine` và **`suspendcancellablecoroutine`** (nên dùng)

# suspendcoroutine và suspendcancellablecoroutine

`suspendcoroutine` và **`suspendcancellablecoroutine`** giúp chúng ta thực hiện việc code asynchronous tasks một cách tường mình, dễ hiểu, hạn chế phụ thuộc để tằng khả năng mở rộng và maintian.

- suspendcancellablecoroutine returns một CancellableContinuation để chúng ta resume, resumeWithException và throws CancellationException nếu continuation bị cancelled. 

- suspendCoroutine thì hơi khác là không bị cancelled bởi Job.cancel()

```kotlin 
suspend fun Animator.awaitEnd() = suspendCancellableCoroutine<Unit> { cont ->
    // Add an invokeOnCancellation listener. If the coroutine is
    // cancelled, cancel the animation too that will notify
    // listener's onAnimationCancel() function
    cont.invokeOnCancellation { cancel() }

    addListener(object : AnimatorListenerAdapter() {
        private var endedSuccessfully = true

        override fun onAnimationCancel(animation: Animator) {
            // Animator has been cancelled, so flip the success flag
            endedSuccessfully = false
        }

        override fun onAnimationEnd(animation: Animator) {
            // Make sure we remove the listener so we don't keep
            // leak the coroutine continuation
            animation.removeListener(this)

            if (cont.isActive) {
                // If the coroutine is still active...
                if (endedSuccessfully) {
                    // ...and the Animator ended successfully, resume the coroutine
                    cont.resume(Unit)
                } else {
                    // ...and the Animator was cancelled, cancel the coroutine too
                    cont.cancel()
                }
            }
        }
    })
}
```
src https://gist.githubusercontent.com/chrisbanes/2173c0bad46cdf534396bfb83f02884a/raw/f388ef046f823c2ba03c607ecb28795ba6c1c0cd/code.kt

hoặc

```kotlin

suspend fun RecyclerView.awaitScrollEnd() {
    // If a smooth scroll has just been started, it won't actually start until the next
    // animation frame, so we'll await that first
    awaitAnimationFrame()
    // Now we can check if we're actually idle. If so, return now
    if (scrollState == RecyclerView.SCROLL_STATE_IDLE) return

    suspendCancellableCoroutine<Unit> { continuation ->
        continuation.invokeOnCancellation {
            // If the coroutine is cancelled, remove the scroll listener
            recyclerView.removeOnScrollListener(this)
            // We could also stop the scroll here if desired
        }

        addOnScrollListener(object : RecyclerView.OnScrollListener() {
            override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
                if (newState == RecyclerView.SCROLL_STATE_IDLE) {
                    // Make sure we remove the listener so we don't leak the
                    // coroutine continuation
                    recyclerView.removeOnScrollListener(this)
                    // Finally, resume the coroutine
                    continuation.resume(Unit)
                }
            }
        })
    }
}
```
src: https://gist.githubusercontent.com/chrisbanes/005d31f1d6091165c28922454ae35d6a/raw/de1a47a81e8a3f1b2ba27798eaa6563494274f69/code.kt

Với `suspendCancellableCoroutine` thì tư tưởng code khi chúng ta làm các asynchronous tasks là làm cho hành động được gói gọn, async tasks ko biết khi kết thúc thì sẽ làm gì tiếp theo, giúp cho code của chúng độc lập nhất, dễ dàng maintain và mở rộng sau này. Nói một cách khác với callback thì chúng ta điều hướng hành động tiếp theo ngay trong đoạn code liên quan asynchronous tasks. Còn với suspend chúng ta chỉ lắng nghe điều kiện asynchronous tasks còn việc hành động tiếp như thế nào sẽ do đoạn code bên ngoài thực thi quyết định.

# Kết

Với việc sử dụng suspendCancellableCoroutine và suspendcoroutine chúng ta có thể làm các asynchronous tasks trở nên tường minh, giảm sự phụ thuộc nên dễ bảo trì và mở rộng code sau này.

# Tham khảo

https://medium.com/androiddevelopers/suspending-over-views-19de9ebd7020

https://medium.com/androiddevelopers/suspending-over-views-example-260ce3dc9100