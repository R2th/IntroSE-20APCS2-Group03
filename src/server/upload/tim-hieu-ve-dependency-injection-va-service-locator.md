Notes :
- Để ngắn gọn thì bài viết mình dùng Dagger để thay cho Dagger2
- Link bài gốc: https://medium.com/modulotech/dependency-injection-and-service-locator-6144ed55a8e

-----


**Dependency Injection** (DI) có thể nói là một chủ đề tốn khá nhiều giấy mực trong cộng đồng Android. Nói một cách chủ quan thì DI không phải là một khái niệm quá khó hiểu và implementation của nó cũng *không nên* phức tạp. Theo mình thì đến bây giờ, chúng ta vẫn chưa có một giải pháp thực sự *clean*. Một trong những rào cản lớn nhất đó là việc Activity và Fragment không được thiết kế để có một *argument constructor* và những Component này có thể bị phá huỷ và tái tạo vào bất cứ thời điểm nào trong vòng đời của ứng dụng. Và điều này làm cho việc xây dựng một DI lí tưởng trong Android gần như là không thể.

Cách đây vài năm, khi Android Native vẫn còn là cuộc chơi độc quyền cho Java thì chúng ta vẫn chưa có nhiều sự lựa chọn cho DI framework. Và lúc đó thì chỉ có Dagger được xem là kẻ duy nhất "thống trị" và framework này còn được khuyến khích bởi Google. Tuy nhiên, không cần nói thì mọi người cũng biết sự phức tạp trong implementation của Dagger. Một vài người quen dùng thì cảm thấy khá thoải mái với nó, tuy nhiên, một số lượng không nhỏ khác thì lại dùng nó một cách khá gượng ép. Tại sao mình nói vậy? Thực sự thì Dagger khá lẳng nhằng cho người mới bắt đầu nhưng thời điểm đó họ lại không có sự lựa chọn. Thêm vào đó, mình nhận thấy mọi người khá là đón nhận khi một vài framework bằng Kotlin khác xuất hiện như **Koin** mặc dù cho một vài sự khác nhau về bản chất mà mình sẽ giải thích dưới đây. Nó giống như kiểu mọi người đã *"chịu đựng"* Dagger khá lâu và Koin xuất hiện một cách rất gì và này nọ : *"Thưa sếp, 1 là Koin, 2 là em nghỉ việc"*  :sweat_smile:. 

Mình cũng từng ở trong trường hợp như vậy. Và mình luôn tự hỏi so với Dagger thì tại sao Koin lại *dễ chơi dễ trúng thưởng* như vậy trong khi cả hai đều giải quyết cùng một vấn đề như nhau.

Đến một ngày thì mình đọc một bài viết cũng về Dagger và Koin (sorry mình quên mất đó là bài nào), trong đó có nhắc đến một khái niệm hoàn toàn mới mẻ với mình: **Service Locator**.

```
Koin là một Service Locator, không phải là Dependency Injector.
```

Cảm giác như kiểu niềm tin của bạn bị bẻ cong mà bạn không có luận điểm nào để bào chữa. Bài viết đó cũng phân tích những hạn chế của DI trong môi trường Android. Và rồi mình chấp nhận một sự thật là DI sẽ không bao giờ (ít nhất là đến khi nào kiến trúc của Activity và Fragment chưa thay đổi) là lí tưởng trong Android. Tuy nhiên thì *"đời mà"*, cuộc sống không bao giờ là lí tưởng và nhiệm vụ của chúng ta là phải thích nghi và tìm kiếm giải pháp tốt nhất.

Trong phạm vi bài viết này thì mình sẽ không giải thích làm sao để implement Dagger hay Koin mà chỉ tập trung nói về sự khác nhau của Dependency Injector và Service Locator. Đầu tiên thì mình sẽ thử implement một DI pattern một cách cơ bản nhất. Với pattern này thì mình sẽ có 3 phần:

- *Client class* (hoặc là *Consumer class*): còn được gọi là lớp bị phụ thuộc (dependant class). Lớp này sẽ phụ thuộc (sử dụng) một dịch vụ (service) nào đó để thực hiện một việc có chủ đích.
- *Service class* : lớp phụ thuộc (dependency). Lớp cung cấp một dịch vụ.
- *Injector class*: lớp làm nhiệm vụ "tiêm" (*inject*) *dependency* vào *dependant class*.

Xem xét một ví dụ sau:

Chúng ta có một `MessageService` dùng để gửi một tin nhắn tới một địa chỉ nào đó:

```
interface MessageService {
  
    fun sendMessage(message: String, destination : String)
  
}
```

Và một implementation `SMSService` để gửi tin nhắn bằng SMS.

```
class SMSService : MessageService {
    override fun sendMessage(message: String, destination: String) {
        println("Sending $message to $destination using SMSService")
    }
}
```

Tiếp theo chúng ta có một lớp `MessageClient`, lớp này dùng `MessageService` để gửi tin nhắn đến bạn bè. Theo [Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle) thì các module nên phụ thuộc vào *abstraction*, vì vậy lí tưởng nhất thì ở đây client cũng nên là một *interface*. Tuy nhiên, để dễ hình dung thì mình dùng một lớp cụ thể để diễn tả lớp client này:

```
class MessageClient(private val service: MessageService) {
    fun chatToFriend(message: String, destination: String) {
        service.sendMessage(message, destination)
    }
}
```

Ok mọi thứ đã chuẩn bị xong, bây giờ thì mình làm phần *injection* thôi:

```
class Component {
  
    val client : MessageClient = MessageClient(SMSService()) // SMSService được "tiêm" vào MessageClient thông qua "tiêm vào khởi tạo" (constructor injection)
  
    fun main(){
         val destination = "Moon"
         client.chatToFriend("Hello, I'm from the Earth!", destination)
    }
}
```

Vậy là xong chúng ta đã có một ví dụ đơn giản về DI. Dagger cũng gần như là đi theo cấu trúc như vậy. Tuy nhiên vấn đề là phần *Client* của Dagger (Activity/Fragment) vẫn biết về sự tồn tại của phần *Injector* bởi vì phương thức `inject()` của *Injector* vẫn được gọi trong Activity/Fragment để đưa những Component này vào trong đồ thị phụ thuộc (dependency graph). Sau đây là một AppComponent cơ bản trong Dagger và phương thức `onCreate()` trong một Activity *bị phụ thuộc*:

```
@Component(modules = [AppModule::class])
interface AppComponent {
    fun inject(mainActivity : MainActivity)
}
```

```
override fun onCreate(savedInstanceState: Bundle?) {
    (applicationContext as Appplication).appComponent.inject(this)
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
}
```

Chính vì điều này mà Dagger vẫn không được xem là một DI *nguyên chất*, tuy nhiên thì nó cũng đã đưa ra một giải pháp khá ổn. Và bây giờ thì mình sẽ xét đến Koin. So sánh với ví dụ về DI cơ bản ở trên thì mình có thể thấy Koin không có cung cấp một lớp *injector* hay bất cứ hành động *injection*. Hãy cùng xem cách mà những *dependencies* được truy cập vào từ bên trong những Activity/Fragment

```
class MainActivity : AppCompatActivity() {
      private val viewModel : MainViewModel by viewModel()
}
```

Cú pháp `by viewModel()` như trên này chỉ giống như một phương thức `getter()` lấy object từ một **Central Registry** của Koin. Và thực ra thì Koin nó cũng giống như một phiên bản *sạch* của việc dùng `object`(singleton trong Kotlin) để lưu trữ các dependencies. Nó cung cấp một quyền truy cập trực tiếp tới dependencies cho  bất cứ ai có nhu cầu. Vì vậy nó chỉ được xem là một **Locator** (người định vị).

- Chú ý rằng **Central Registry**  này không chỉ lưu trữ những *object* dependencies mà còn lưu trữ những phương thức khởi tạo các object này để khởi tạo chúng khi được gọi.

Và như vậy đây là lí do mà *Dependency Injection* và *Service Locator* là hai cách thức hoàn toàn khác nhau để giải quyết chung một vấn đề đó là truy cập vào những dependencies. Một cái là *tiêm* và một cái *định vị* những dependencies.

Có một thực tế đó là Koin dễ áp dụng hơn rất nhiều so với Dagger. Thêm vào đó, việc Koin được chính thức [giới thiệu](https://github.com/InsertKoinIO/koin) như là một DI framework: 

```
A pragmatic lightweight dependency injection framework for Kotlin developers
```

đã làm cho mọi người yêu thích nó và dùng nó một cách khá nhầm lẫn. Tuy nhiên sự thật thì *Service Locator* thì lại thường bị chỉ trích là một [*anti-pattern*](https://en.wikipedia.org/wiki/Service_locator_pattern#:~:text=The%20service%20locator%20pattern%20is,to%20perform%20a%20certain%20task.) vì một số điểm sau:

Xem xét một ví dụ:

```
class MessageClient() {
    private val service = Locator.GetService<MessageService>()
    fun chatToFriend(message : String, destination : String) {
        service.sendMessage(message, destination)
    }
}
```

- Việc nó cung cấp một cách cho phép những lớp Client không cần dùng *parameter constructor* (dependencies được lấy thông qua những phương thức `getter()` tĩnh) đã *giấu* đi sự phụ thuộc của lớp Client này và làm cho nó khó dùng và khó test hơn. Nếu không nhìn vào bên trong những lớp Client này, ta không thể ngay lập tức trích xuất những dependencies cần phải được mock khi ta thực hiện việc test lớp Client.
- Không có một lớp *injector* quản lí sự khởi tạo của những lớp Service, `MessageClient` phải giả định rằng `MessageService` đã *sẵn sàng* bằng một cách nào đó, thế nhưng nếu nó chưa *sẵn sàng* thì sao? Sao là làm sao? :grin:
- Lớp client bây giờ không chỉ phụ thuộc vào những dependencies mà còn phụ thuộc một cách *thừa thãi* vào Service Locator
- Tính tái sử dụng: sự có mặt của Service Locator bên trong những modules chung làm cho những modules này không thể được tái sử dụng trong những dự án khác không dùng đến Service Locator này.

Vì những lí do trên đây mà vẫn có những dev vẫn trung thành với Dagger và không đụng đến Koin. Theo mình thấy, Dagger hiện nay vẫn là giải pháp gần nhất với DI (mình chưa nhắc đến Hilt vì nó vần còn trong giai đoạn bắt đầu), vì vậy nó vẫn là sự lựa chọn tốt nhất nếu chúng ta thực sự làm chủ được nó. Tuy nhiên, mọi thứ đều có lí do của nó, và sự tồn tại của Koin cũng vậy. Cân đo đong đếm giữa sự hại (những điểm ở trên) và lợi (thông qua cú pháp đơn giản, dễ áp dụng và khả năng tương thích vởi Kotlin) của nó thì Koin vẫn rất đáng để sử dụng. Và theo mình thì điểm trừ lớn nhất của việc sử dụng Koin là việc gây ra nhầm lẫn giữa những khái niệm : Dependency Injection và Service Locator. Hiểu được sự khác nhau này thì chúng ta có thể an tâm mà tiến bước.

**Dài quá lười đọc (TL;DR)**

- Koin **không** phải là Dependency Injector mà là một Service Locator
- Service Locator thường được xem là một anti-pattern
- Tuy nhiên, với những lợi ích Koin mang lại, nó vẫn rất đáng giá để sử dụng.
- Hãy sử dụng Koin một cách hiểu biết.