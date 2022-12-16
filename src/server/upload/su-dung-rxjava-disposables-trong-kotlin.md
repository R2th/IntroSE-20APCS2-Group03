Trong bài viết này, chúng ta hãy cùng tìm hiểu cơ bản về RxJava Disposables.

Reactive Android Programming bao gồm RxJava, RxAndroid và RxKotlin. 

RxJava là thư viện Reactive Programming được sử dụng nhiều nhất trong thế giới Phát triển Android. Nó hỗ trợ quản lý đa luồng tốt hơn và làm cho mã trực quan hơn.

RxAndroid là một mô-đun nhẹ, liên kết các thành phần cụ thể của Android với các lớp RxJava. RxKotlin giúp viết các phương thức RxJava dễ dàng hơn bằng cách cung cấp các extension functions thuận tiện.

### Disposables
**Disposables** là gì? **Disposables** trong tiếng Anh ngụ ý sự thuận tiện ngắn hạn. Điều này cũng có nghĩa là chúng tồn tại trong thời gian ngắn hoặc có nghĩa là bị loại bỏ sau khi sử dụng. Ý tưởng tương tự cũng được chuyển tải trong Disposables của RxJava.

Khi một **Observer** đăng ký vào một **Emitter** hoặc **Observables**, bạn tạo một stream. Stream này chiếm tài nguyên (resources) mà sau này trở thành disposable “solid waste”. Bạn cần xử lý nó nếu không luồng sẽ chạy trong một thời gian dài.

`Observable` có một phương thức gọi là `onComplete()` sẽ thực hiện việc xử lý cho bạn khi được gọi. Tuy nhiên, nhiều lúc, bạn sẽ thấy có lợi và thuận tiện hơn khi có khả năng hủy đăng ký của mình một cách dễ dàng và bất cứ lúc nào.

Bây giờ, bạn sẽ giải quyết một trường hợp phức tạp hơn. Stream sẽ chạy vô tận và bạn sẽ sử dụng `Disposables` để xử lý chúng để tránh rò rỉ bộ nhớ (**memory leaks**).

`Disposable` là một stream hoặc một liên kết giữa một `Observable` và `Observer`. Kiểm tra nhanh [tài liệu](http://reactivex.io/RxJava/javadoc/io/reactivex/disposables/Disposable.html) cho thấy rằng nó có hai phương thức chính là `dispose()` và `isDisposed()`. Cái trước xử lý liên kết, trong khi cái sau kiểm tra nếu liên kết đã được xử lý.

### Testing Disposables
Khi bạn thiết lập đăng ký giữa Observable và Observer, nó sẽ trả về một Disposable. Ví dụ, hãy xem đoạn mã sau:
```
import android.util.Log
import io.reactivex.Observable
import java.util.concurrent.TimeUnit

object DisposableTester {

    @JvmStatic fun main() {
        val seconds = Observable.interval(1, TimeUnit.SECONDS)
        val disposable = seconds.subscribe({ l -> logData(l) })

        //sleep 10 seconds
        sleep(10000)

        //Dispose and stop emissions
        disposable.dispose()

        Log.d("Test","Disposed!")

        //Sleep 10 seconds to prove
        //There are no more emissions
        sleep(10000)
    }

    private fun logData(l: Long) {
        Log.d("Test","Received: " + l)
    }

    private fun sleep(millis:Int) {
        try {
            Thread.sleep(millis.toLong())
        }
        catch (e:InterruptedException) {
            e.printStackTrace()
        }
    }

}

```

Một `Observable` chạy và phát ra mỗi giây. Sau mười giây phát ra, tài nguyên `Disposable` trả về từ `subscribe()` được xử lý bằng cách gọi rõ ràng `dispose()`. Sau đó, bộ đếm thời gian mười giây khác phát ra để xác minh rằng tài nguyên đã được xử lý.

Xử lý `Disposables` bên ngoài là một cách để xử lý các tài nguyên không còn cần thiết. Kể từ **RxJava 2.0**, `Observer` có khả năng loại bỏ đăng ký bất cứ lúc nào. Ví dụ:
```
import io.reactivex.Observer
import io.reactivex.disposables.Disposable

object DisposableTester {

    var myObserver: Observer<Int> = object: Observer<Int> {
        private var disposable: Disposable? = null

        override fun onSubscribe(disposable: Disposable) {
            this.disposable = disposable
        }
        override fun onNext(value:Int) {
            //Has access to Disposable
        }
        
        override fun onError(e:Throwable) {
            //Has access to Disposable
        }
        
        override fun onComplete() {
            //Has access to Disposable
        }
    }

}
```

Nếu bất cứ lúc nào phát thải không còn cần thiết trong `onNext()`, `onError()` hoặc `onComplete()`, bạn có thể dừng chúng.


### CompositeDisposables
Khi phát triển ứng dụng, có những kịch bản mà bạn cần nhiều hơn một subscription. Lấy dữ liệu trực tiếp từ nhiều nguồn trong một ứng dụng du lịch cho khách sạn, các tour du lịch và vé máy bay là một ví dụ tuyệt vời.

Bạn cần sử dụng CompositeDisposables để quản lý tài nguyên. Nó implement Disposable và sau đó giữ một bộ sưu tập các disposables. Xem ví dụ sau:
```
import android.util.Log
import io.reactivex.Observable
import io.reactivex.disposables.CompositeDisposable
import java.util.concurrent.TimeUnit

object DisposableTester {

    private val disposables = CompositeDisposable()

    @JvmStatic fun main() {
        val seconds = Observable.interval(1, TimeUnit.SECONDS)

        //Subscribe and capture disposables
        val disposable1 = seconds.subscribe({ l -> logData(l, 1) })
        val disposable2 = seconds.subscribe({ l -> logData(l, 2) })

        //Put both disposables into CompositeDisposable
        disposables.addAll(disposable1, disposable2)

        //Sleep 10 seconds
        sleep(10000)

        //Dispose all disposables
        disposables.dispose()

        Log.d("Test", ("All Disposed!"))

        //Sleep 10 seconds to prove
        //there are no more emissions
        sleep(10000)
    }

    private fun logData(l: Long, observerNumber: Int) {
        Log.d("Test", ("Observer " + observerNumber + ": " + l))
    }

    private fun sleep(millis:Int) {
        try {
            Thread.sleep(millis.toLong())
        } catch (e:InterruptedException) {
            e.printStackTrace()
        }
    }

}
```

Trong triển khai này, mã được sử dụng trên tiện ích đơn giản này giúp bạn quản lý một bộ sưu tập các `Disposables`. Bằng cách gọi `add()` hoặc `addAll()`, bạn có thể loại bỏ tất cả chúng cùng một lúc khi chúng không còn cần thiết nữa.

Xin chúc mừng! Qua đây bạn đã làm mới kiến thức của mình về những điều cơ bản của Reactive Programming và học về Disposables.

ref: https://www.raywenderlich.com/3983802-working-with-rxjava-disposables-in-kotlin#toc-anchor-001