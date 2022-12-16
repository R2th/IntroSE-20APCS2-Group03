Khi thực hiện xây dựng một ứng dụng, việc truyền và tiếp nhận các sự kiện cũng như các object giữa các activity, fragment, service... luôn là điều cần thiết. Có nhiều cách để thực hiện, thông thường sẽ dùng intent hoặc có thể dùng thư viện [EventBus](https://github.com/greenrobot/EventBus).

Trong bài viết này mình sẽ hướng dẫn tạo và sử dụng event bus đơn giản hiệu quả hơn với Subject trong RxJava bằng ngôn ngữ kotlin.

Trước tiên mình cùng nhắc lại kiến thức cơ bản về Subject trong RxJava.

## 1. Định nghĩa về Subject trong RxJava:
  Theo trang [Reactive](http://reactivex.io/documentation/subject.html), Subject được định nghĩa như sau:
>*A Subject is a sort of bridge or proxy that is available in some implementations of ReactiveX that acts both as an observer and as an Observable. Because it is an observer, it can subscribe to one or more Observables, and because it is an Observable, it can pass through the items it observes by reemitting them, and it can also emit new items.*

Có thể hiểu như sau:

 Subject là 1 đối tượng trong RxJava, là 1 loại cầu nối có sẵn trong RX. Subject hoạt động như Observable và Observer, nên có sức mạnh của cả 2. Nó như là một observer nên có thể đăng kí một hoặc nhiều Observable. Cũng là một Observable nên nó có thể bắn ra các item mới cho Observer.
Có 4 loại Subject là: AsyncSubject, BehaviorSubject, ReplaySubject và PublishSubject

**AsyncSubject**

[![QJ4bjf.md.png](https://i.im.ge/2021/09/10/QJ4bjf.md.png)](https://im.ge/i/QJ4bjf)

Một *AsyncSubject* chỉ phát ra value cuối cùng và chỉ khi nguồn observable hoàn tất.

**BehaviorSubject**

[![QJ4pma.md.png](https://i.im.ge/2021/09/10/QJ4pma.md.png)](https://im.ge/i/QJ4pma)

Khi có một observer đăng kí *BehaviorSubject* thì nó sẽ bắt đầu phát ra item được phát gần đây nhất.

**ReplaySubject**

[![T6HhHD.md.png](https://i.im.ge/2021/09/16/T6HhHD.md.png)](https://im.ge/i/T6HhHD)

*ReplaySubject* sẽ phát ra tất cả item mà nó có cho bất kì observer nào đăng kí nó.

**PublishSubject**

[![T2nArP.md.png](https://i.im.ge/2021/09/12/T2nArP.md.png)](https://im.ge/i/T2nArP)

*PublishSubject* sẽ phát ra item cho các observer nào đã đăng kí nó tại thời điểm đó.

 Đây là loại subject rõ ràng nhất. Chúng ta sẽ dùng publishSubject để tạo event bus. Cùng đi vào phần chính của bài viết.

## 2. Tạo và sử dụng Event Bus:
### Bước 1: Tạo Event Bus:
  Trước tiên bạn cần implement thư viện RxJava vào build.gradle(app):
  ```
  implementation 'io.reactivex.rxjava3:rxjava:3.0.0'
  ```

  Tạo Event bus sử dụng câu lệnh sau:
  ```java
  val eventBus: PublishSubject<T> by lazy { PublishSubject.create() }
  ```

  Trong đó:
  - `PublishSubject<T>`: T là kiểu dữ liệu bạn muốn phát đi.

  Để dễ dàng trong việc xử lí event mình sẽ dùng kiểu dữ liệu `HashMap<String, Any>`. Tương ứng như sau: `String`: mô tả tên event, `Any`: là kiểu dữ liệu được phát ra với event tương ứng.

  Nhằm phục vụ gửi và lắng nghe sự kiện cho toàn ứng dụng mình sẽ khai báo biến `eventBus` tại class App như sau:

  ```java
  class App : Application() {
    companion object {
        val eventBus: PublishSubject<HashMap<String, Any>> by lazy { PublishSubject.create() }
    }
}
```
### Bước 2: Gửi sự kiện:
Thực hiện phát các event bằng câu lệnh sau:
  ```java
    eventBus.onNext(data)
  ```

Hãy định nghĩa một `object Event`, tại đây chứa các const là tên các event trong ứng dụng và các fun dùng để gửi sự kiện. Điều này giúp bạn có thể dễ dàng quản lí và nắm bắt tất cả các sự kiện trong ứng dụng.

  Ví dụ: Giả sử ứng dụng của bạn có 2 sự kiện cần được phát đi là:
  - Sự kiện 1: Thông báo người dùng đã cập nhật email thành công với data là tên email mới
  - Sự kiện 2: Thông báo muốn finish chat activity
  ```java
  object Event {
      // định nghĩa các Event trong ứng dụng
      const val EVENT_UPDATED_EMAIL_SUCCESS = "UPDATED_EMAIL_SUCCESS"
      const val EVENT_FINISH_CHAT = "FINISH_CHAT"

      // Thực hiện phát các sự kiện
      fun updatedEmailSuccess(newEmail: String) {
          // Lệnh phát sự kiện với data là newEmail
          App.eventBus.onNext(hashMapOf(EVENT_UPDATED_EMAIL_SUCCESS to newEmail))
      }
      fun finishChatActivity() {
        // Lệnh phát sự kiện không có data
          App.eventBus.onNext(hashMapOf(EVENT_FINISH_CHAT to ""))
      }
  }
  ```

Tại activity bạn mong muốn phát ra sự kiện bạn chỉ cần gọi fun phát event tương ứng. Trong trường hợp này, sau khi người dùng thực hiện cập nhật email thành công bạn muốn phát event, thực hiện lệnh sau:
  ```Java
    Event.updatedEmailSuccess("newemail@gmail.com")
  ```

### Bước 3: Đăng kí lắng nghe sự kiện:
Thực hiện đăng kí để lắng nghe sự kiện bằng lệnh sau:
```java
  eventBus.subscribe{
    //tiếp nhận sự kiện
  }
```
Theo kiến thức ta nắm được ở phần 1, hoạt động của *PublishSubject* là chỉ phát ra item cho các observer đã đăng kí nó tại thời điểm đó. Do đó, ở mỗi activity hoặc fragment ta nên đăng kí lắng nghe *eventBus* ở hàm `onCreate` để có thể lắng nghe ngay tại thời điểm phát của tất cả các sự kiện của ứng dụng trong thời gian hoạt động của activity hoặc fragment, sau đó dựa theo key event để có thể tiếp nhận nhưng event mong muốn, ta thực hiện như sau:
Theo ví dụ trên ứng dụng có 2 sự kiện, bây giờ ta sẽ thực hiện xử lí sự kiện người dùng cập nhật thành công email tại `InfoUserActivity` và xử lí xự kiện finish chat tại `ChatActivity`.
* Tại fun `onCreate` của `InfoUserActivity`:
```java
App.eventBus.subscribe{
          it[Event.EVENT_UPDATED_EMAIL_SUCCESS]?.let { data ->
            (it as String?)?.let { newEmail ->
              //thực hiện update text hiển thị thông tin email của người dùng
              tvEmail.text = newEmail
             }
          }
      }
```
* Tại fun `onCreate` của `ChatActivity`:
```java
App.eventBus.subscribe{
          it[Event.EVENT_FINISH_CHAT]?.let {
            //thực hiện finish activity
            finish()
          }
      }
```
Ngoài ra để tiện sử dụng và giảm việc lặp code đăng kí lắng nghe sự kiện giữa các activity hoặc fragment. Thông thường, mình sẽ thực hiện đăng kí lắng nghe sự kiện tại `BaseActivity` hoặc `BaseFragment`(thực hiện tương tự như trên), sau đó override fun đó tại các Activity hoặc Fragment mong muốn.

### Bước 4: Huỷ đăng kí.
Khi thiết lập đăng kí lắng nghe sự kiện sẽ trả về một Disposable, ta chỉ cần dispose nó ở fun `onDestroy` của activity hoặc fragment, thực hiện huỷ đăng kí như sau:
```java
class ChatActivity : AppCompatActivity() {
    lateinit var viewBiding: ActivityChatBinding
    //khai báo disposable
    private var disposable: Disposable? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewBiding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(viewBiding.root)
        // thực hiện đăng kí lắng nghe sự kiện
        disposable = App.eventBus.subscribe {
            it[Event.EVENT_FINISH_CHAT]?.let {
              //thực hiện finish activity
              finish()
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        //huỷ đăng kí
        disposable?.dispose()
    }
}
```
>*Lưu ý: Nếu bạn thực hiện đăng kí tại `BaseActivity` hoặc `BaseFragment` thì thực hiện huỷ đăng kí tương tự tại fun `onDestroy` của `BaseActivity` hoặc `BaseFragment` nhé.*
## Tổng kết:
Trên đây mình đã nêu ra đầy đủ và chi tiết các bước để tạo và sử dụng event bus thông qua *PublishSubject*. Bài viết này viết chủ yếu dựa trên kinh nghiệm làm việc qua các dự án của bản thân mình. Hi vọng giúp ích cho mọi người. Cùng ứng dụng và trải nghiệm sự đơn giản, tiện lợi này.

**Trong bài này có tham khảo:**
-http://reactivex.io/documentation/subject.html