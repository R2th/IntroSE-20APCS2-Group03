## Introduction
Đã ba năm kể từ khi bản phát hành chính thức của Kotlin Programming language, nhưng mọi người giống như tôi vẫn cố gắng hình dung khi sử dụng **lateinit** delegate và **by lazy**. **lateinit** và **by lazy** là tính năng đặc thu trong quá trình khởi tạo. Chúng ta cần biết khi nào sử dụng tính năng khởi tạo đặc biệt này.

Để có được những khái niệm cơ bản về Lazy Evaluation và Kotlin Lazy Evaluation trước tiên chúng ta hãy xem xét so sánh bên dưới.

## The main pillar of Kotlin Lazy Evaluation vs Haskell Laziness
Trước khi bắt đầu, tôi chỉ muốn đảm bảo rằng mọi lập trình viên người đọc phần này nên trở nên lười biếng giống như tôi.

<div align="center"><img src="https://images.viblo.asia/88c4310d-7a18-44be-bfca-3b123aed3101.jpg" /></div><br />
Trong hầu hết các ngôn ngữ lập trình hướng chức năng - giá trị không cần phải tính toán nếu chúng ta không sử dụng trước đó. Miranda, Haskell, và rất nhiều ngôn ngữ lập trình khác có khái niện là laziness cái giữ việc tính toán cho một một diễn tả cho đến khi một giá trị là thực sự cần thiết. Trong một số ngôn ngữ lập trình khác lại nghiệm ngặt hạn chế quá trình tính toán này.

### Kotlin strict evaluation example
Chúng ta sẽ bắt đầu với ví dụ về strict evaluation.

```
fun main() {
    printValue(getValue())
}

private fun printValue(value : Int) = println("Nothing")

private fun getValue() : Int {
    println("Returning 5")
    return 5
}
```

Và đây là kết quả sau khi chúng ta chạy chương trình.

<div align="left"><img src="https://images.viblo.asia/6b8955f7-335f-4ed0-9b91-177ab43245c4.png" /></div><br />

Trong kotlin, ngay khi ứng dụng được chạy, chức năng **getValue** được gọi nhằm cung cấp giá trị tương ứng, mặc dù giá trị trả về không bao giờ được sử dụng trong phương thức **printValue**. Hành vi này xuất phát từ sự đánh giá háo hức(eager evaluation - Hơi khó hiểu vì chưa có tí lý thuyết nào về nó cả. :( ) và thứ tự áp dụng của quá trình gọi các chức năng. Trong thứ tự áp dụng của ngôn ngữ, function đầu tiên tính toán tất cả các tham số một cách hoàn toàn, rồi truyền chúng tới function khác như là một tham số.

Chúng ta có thể ghi đè hành vi bên trên của kotlin programming language và tạo cho nó trở lên lazy trong quá trình tính toán, nhưng trước đó, chúng ta cần hiểu được chúng ta nên quan tâm đến điều gì ở đây.

### Haskell Lazy Evaluation Example
Giờ đây nếu chúng ta đưa thêm một chút và viết vài dòng code tương tự trong một ngôn ngữ lazy thuần(a pure lazy programming language) giống như Haskell. Phương thức **getValue** sẽ không bao giờ được tính toán. Hãy xem một ví dụ về cái mà chúng ta đã đề cập.

```
import Debug.Trace

getValue = trace ("Returning 5") 5  // 1

printValue value = print("Nothing")  // 2

main = printValue (getValue)  // 3
```

Và đây là kết quả chúng ta nhận được khi chạy chương trình.

<div align="left"><img src="https://images.viblo.asia/625b7ed1-413e-4e8a-892a-565149d8a716.jpg" /></div><br />
Nếu bạn nhìn vào dòng thứ hai của kết quả bên trên, bạn sẽ chú ý rằng phần đầu ra chỉ phô ra **Nothing** và phương thức **getValue** không được gọi. Tốt, đó là bởi vì Haskell sử dụng lazy evaluation(tính toán lười biếng) với **Normal-Order** đối với quá trình gọi các phương thức. Trong **normal-order** chúng ta áp dụng function trước khi chúng ta tính toán tham số của nó.

Do đó, lý do chính mà phương thức **getValue** không được gọi là bởi vì khi phương thức **printValue** tính toán đơn giản là chỉ cần in **Nothing** ra màn hình điều khiển. Phương thức **printValue** không bao giờ sử dụng **giá trị** của tham số thực. Haskell nói rằng tại sao họ phải bận tâm đến điều đó, nó sẽ không tốn nỗ lực cho việc thực thi phương thức **getValue**.

Về bản chất, Haskell không tính toán đầu vào trừ khi chương trình thực sự cần tới việc tính toán đó.

### Kotlin Lazy Evaluation Example
Hãy trở lại với mã nguồn Kotlin lúc trước và thử làm cho nó lười biếng hơn.

```
fun main() {
    printValue(getValue())
}

private fun printValue(value: Lazy<Int>) = println("Nothing")

private fun getValue() = lazy {
    println("Returning 5")
    return@lazy 5
}
```

Và đây là kết quả.

<div align="left"><img src="https://images.viblo.asia/ab9313d5-993b-4677-98f2-24dc1a0b00cb.png"></div><br />
Giờ đây, bạn đã thấy rằng Koltin không thực hiện tính toán phương thức **getValue** bởi vì chúng ta gói phương thức của nó và trong cấu trúc **by lazy**. Điều này là tương tự với cái bạn có thể thực hiện trong F# hoặc Scala hoặc tương tự. Bạn thêm vào từ khóa **lazy** trước val và nói với compiler, "cái này mày có thể lazy với nó". Mặc dù nếu có side-effects, sẽ không có lỗi lầm nếu như bạn không gọi trực tiếp. Do đó, Language Compiler sẽ nói được được - Tao sẽ không vội vàng ở đây và trì hoãn tính toán cho đến khi mày thực sự cần.

Như vậy, một vài ngôn ngữ sinh ra trong lười biếng như ngồi ở bãi biển và không làm gì cả và một vài ngôn ngữ thực sự tích cực trở nên lười biếng. Kotlin mặc định là một strict language(ngôn ngữ nghiêm ngặt) nhưng để thực hiện laziness, chúng ta phải nói cho ngôn ngữ rằng đây là nơi tao cần mày trì hoãn quá trình tính toán cho đến khi tao thực sự cần nó.

## Significant differences between **lateinit var** delegated property and **by lazy** method

| <div align="center">**lateinit**</div> | <div align="center">**by lazy**</div> |
| -------- | -------- |
|Có thể được khởi tạo từ bất cứ noi nào đối tượng có thể nhìn thấy|Chỉ có thể được khởi tạo từ bộ khởi tạo lambda|
|Có thể có nhiều quá trình khởi tạo|Chi khởi tạo một lần|
|Non-Thread safe. Nó phụ thuộc vào người dùng nhằm khởi tạo chính xác trong một <br />môi trường đa luồng|Thread-safety là mặc định và đảm bảo rằng bộ khởi tạo được gọi một lần duy nhất|
|Chỉ có thể sử dụng cho **var**|Có thể chỉ sử dụng cho **val**|
|Không đủ điều kiện cho các thuộc tính nonnull|Không đủ điều kiện cho các thuộc tính nonnull|
|Một phương thức **[isInitialized](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/is-initialized.html)** <br />được thêm vào để kiểm tra xem giá trị đã được khởi tạo trước đó hay chưa?|Thuộc tính không bao giờ có thể không khởi tạo|
|Không cho phép áp dụng trên các thuộc tính nguyên thủy|Cho phép áp dụng với các thuộc tính nguyên thủy|

## Lazy pattern
**by lazy** giống như một singleton pattern, **if -> null -> then -> init -> else -> return value** và việc thực thi lambda chỉ khi biến được gọi lần đầu tiên.

Bây giờ, hãy xem xét ví dụ đơn giản trước.

```
class UserManager private constructor() {

    companion object {
        private val userManager = UserManager()
        fun getInstance() = userManager
    }
}

private val userManager : UserManager by lazy {
    println("Initializing...")
    UserManager.getInstance()
}

fun main() {
    println(userManager)
    println(userManager)
}
```

<div align="left"><img src="https://images.viblo.asia/e9c7273f-9ad0-4ba6-9032-6b3724de871f.png"></div><br />

Trong Kotlin, **lazy()** là một chức năng cái lấy một lambda và trả về một thể hiện của **lazy&lt;T&gt;**. Trong trường hợp của chúng ta, nó trả về **lazy&lt;UserManager&gt;**. Biến sẽ không được khởi tạo trừ khi bạn sử dụng giá trị của biến đó trong code. Bạn có thể thấy rằng trong kết quả xuất hiện trong ví dụ sau khi nhấn vào run button trên **__userManager** chỉ được khởi tạo lần đầu tiên và sau đó, nó trả về giá trị tương tự.

**by lazy** là một các thức rất tốt nếu chúng ta cố gắng truy cập vào service trong các lớp Activity hoặc Fragment của Android.

```
class MainActivity : AppCompatActivity {

   private val connectivityManager: ConnectivityManager by lazy {
        getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    }

    override fun onCreate(savedInstanceState : Bundle) {
         super.onCreate(savedInstanceState)
         setContentView(R.layout.activity_main)
         val netweorkInfo  = connectivityManager.activeNetworkInfo
    }
}
```

Mã nguồn bên trên làm việc hoàn hảo bởi vì chúng ta đang cố gắng truy cập lazy delegate bên trong phương thức **onCreate()** của Activity.

Hãy xem một ví dụ khác về **by lazy** delegate.

```
class MainActivity : AppCompatActivity {

   private val users = mutableListOf<User>()

   private val _myAdapter: MyAdapter by lazy {
        MyAdapter(context : this, data : users)
    }

    override fun onCreate(savedInstanceState : Bundle) {
         super.onCreate(savedInstanceState)
         setContentView(R.layout.activity_main)
         recyclerView.adapter = _myAdapter
    }
}
```

**Note**: **by lazy** là không tốt cho quá trình tham chiếu các views trong một fragment. Bởi vì mô hình chung của quá trình cấu hình views bên trong **onCreateView()** gây ra crash. Chúng ta có thể sử dụng nếu quá trình cấu hình view là thành công trong **onViewCreated()**.

## Lateinit pattern

Nếu chúng ta cần tạm hoãn quá trình xử lý khởi tạo của một thuộc tính non-null thì chúng ta vui mừng khi có thể sử dụng từ khóa **lateinit**. **lateinit** trong kotlin là một từ khóa và chúng ta có thể sử dụng nó như bên dưới.

```
class MediaHelper private constructor(){

    private lateinit var mediaRepo : MediaRepo
 
    init {
        mediaRepo = getMediaRepo()
    }

    private fun getMediaRepo() : MediaRepo {
         .....
         .....
    }
}
```

Thông thường, các thuộc tính được định nghĩa là non-null với **lateinit** có thể được định nghĩa ở bất cứ đâu trong project. Nhưng trước khi sử dụng thuộc tính bạn cần khởi tạo nó, nếu không thì bạn sẽ nhận được **Caused by:kotlin.UninitializedPropertyAccessException: lateinit property has not been initialized**. Trong trường hợp của chúng ta, chúng ta đang hởi tạo **mediaRepo** trong khối khởi tạo của lớp. Nếu bạn cần inject các thuộc tính này thông qua dependency injection bạn cần sử dụng từ khóa **lateinit** trong một thuộc tính.

```
class MediaHelper {

   @Inject
   lateinit var mediaRepo : MediaRepo

   init {
       DaggerAppComponent
           .builder()
           .build()
           .inject(this)              
   }

   fun extractMedia(mediaId: String) : Media {
        return mediaRepo.get(mediaId)
   } 
}
```

Như chúng ta thấy có một vài cách để sử dụng **lateinit**, hãy xem một ví dụ khác của quá trình khởi tạo view trong fragment.

```
class LoginFragment : Fragment() {

    private lateinit var email : TextView
    private lateinit var password : TextView

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?) : View? {
         val view = layoutInflater.inflate(R.layout.fragment_user, container, false)
         email = view.findViewById(R.id.email)
         password = view.findViewById(R.id.password)
         return view
    }
}
```

**Note**: Nó tạo ra ý nghĩa nhiều hơn khi sử dụng **lateinit** cho quá trình tham chiếu các views bên trong Activity hoặc Fragment.
Ở phía bên dưới chúng ta phải đảm bảo rằng chúng ta đã khởi tạo trong các phương thức vòng đời một cách chính xác.

**Protip**:  Bạn cũng có thể kiểm tra xem thuộc tính của **lateinit** đã được tạo hay chưa với phương thức **isInitialized**.

```
lateinit var lazyValue : String

fun main() {
    if(::lazyValue.isInitialized)
        println("Initialized...")
    else
        println("Not initialized...")
}
```

<div align="left"><img src="https://images.viblo.asia/1c022263-beaf-41c9-918a-10c35a6f5f32.png"></div>

## Lazy Evaluation of Kotlin with Lazy ThreadSafetyMode's

### Kotlin by Lazy Initializer

***Lazy delegate đơn giản tạo ra một thể hiện bằng cách thực hiện quá trình khởi tạo lúc truy cập đầu tiên tới giá trị của thuộc tính, lưu lại kết quả, và trả về giá trị đã lưu trữ đó***.

**lazy** trong kotlin là một function cái nhận một lambda(trong khối khởi tạo) và **by** là một từ khóa do đó bạn có thể thấy **lazy** function được triển khai như bên dưới.

```
public actual fun <T> lazy(mode: LazyThreadSafetyMode, initializer: () -> T): Lazy<T> =
    when (mode) {
        LazyThreadSafetyMode.SYNCHRONIZED -> SynchronizedLazyImpl(initializer)
        LazyThreadSafetyMode.PUBLICATION -> SafePublicationLazyImpl(initializer)
        LazyThreadSafetyMode.NONE -> UnsafeLazyImpl(initializer)
    }
```

Nếu chúng ta không chỉ rõ **[LazyThreadSafetyMode](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-lazy-thread-safety-mode/index.html)**, quá trình triển khai lazy sẽ được sử dụng **[SynchronizedLazyImp](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-lazy-thread-safety-mode/-s-y-n-c-h-r-o-n-i-z-e-d.html)** cái thực hiện quá trình khởi tạo chỉ duy nhất một lần theo mặc định.

### Types of Lazy ThreadSafetyMode
Có 3 loại **[Lazy ThreadSafetyMode](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-lazy-thread-safety-mode/index.html)** hãy xem xét chúng từng cái một.

#### 1. Synchronized mode

* Locks sẽ được sử dụng nhằm đảm bảo rằng giá trị sẽ được thực thi trong một luồng độc lập.
* Các threads khác sẽ được tham chiếu tới như là cached value.
* Không cố gắng nhằm đồng bộ nó bằng cách external code hoặc nó sẽ gây ra một external deadlock.
* Chế độ mặc định cho khối kotlin lazy initializer.

Nào hãy xem quá trình triển khai code.

```
private class SynchronizedLazyImpl<out T>(initializer: () -> T, lock: Any? = null) : Lazy<T>, Serializable {
    private var initializer: (() -> T)? = initializer
    @Volatile private var _value: Any? = UNINITIALIZED_VALUE
    // final field is required to enable safe publication of constructed instance
    private val lock = lock ?: this
    
    override val value: T
    get() {
        val _v1 = _value
        if (_v1 !== UNINITIALIZED_VALUE) {
            @Suppress("UNCHECKED_CAST")
            return _v1 as T
        }

        return synchronized(lock) {
            val _v2 = _value
            if (_v2 !== UNINITIALIZED_VALUE) {
                @Suppress("UNCHECKED_CAST") (_v2 as T)
            } else {
                val typedValue = initializer!!()
                _value = typedValue
                initializer = null
                typedValue
            }
        }
    }


    override fun isInitialized(): Boolean = _value !== UNINITIALIZED_VALUE

    override fun toString(): String = if (isInitialized()) value.toString() else "Lazy value not initialized yet."

    private fun writeReplace(): Any = InitializedLazyImpl(value)
}
```

Điều có thể chú ý trong mã nguồn trên là quá trình thực thi của khối khởi tạo với **[synchronized](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/synchronized.html)**. Nó sử dụng một lock nhằm đảm bảo rằng quá trình khởi tạo có thể được thực hiện một lần.

#### 2. Publication mode

* Khối khởi tạo có thể được gọi trên nhiều threads một cách đồng thời.
* Khi value đã được khởi tạo bằng bất cứ thread nào, các threads khác sẽ sử dụng cached value trước đó.
* Được đề xuất trong một môi trường đa luồng.

Bạn có thể thấy quá trình triển khai **SafePublicationLazyImp** theo [link này](https://github.com/JetBrains/kotlin/blob/160de2dbe290d9773e62471ef20f717c61b57816/libraries/stdlib/jvm/src/kotlin/util/LazyJVM.kt#L90).

#### 4. None mode

* Không đề xuất cho môi trường đa luồng.

**Note**: Trong **Synchronized** và **Publication** thread safety mode, **by lazy** bắt lấy tham chiếu từ ngữ cảnh nơi nó được sử dụng. Nó rồi sẽ lưu tham chiếu và phát hành chúng chỉ một lần thuộc tính đã được khởi tạo. Điều này có thể dẫn tới các kiến trúc đối tượng, như là Android Activities, không được phát hành quá lâu, do đó bạn nên cẩn thận về cái bạn sẽ sử dụng trong initializer lambda.

***Nếu quá trình khởi tạo giá trịnh ném ra một exception trong bất cứ ThreadSafetyMode, nó sẽ cố gắng khởi tạo lại ở lần truy cập tiếp theo***.

### Practical example of Synchronized vs Publication ThreadSafetyMode

```
import kotlinx.coroutines.Job
import kotlinx.coroutines.*

fun log(msg: String) = println("[${Thread.currentThread().name}] $msg")

// change mode to PUBLICATION for multiple times initialization.
val myLazilyEvaluatedValue: String by lazy(LazyThreadSafetyMode.SYNCHRONIZED) { 
    log("Initializing...")
    return@lazy "Ahsen Saeed initialized by -> ${Thread.currentThread().name}"
}

suspend fun main() {
    val jobs = mutableListOf<Job>()
    for(i in 0..3){
        val job = kotlinx.coroutines.GlobalScope.launch{
            println(myLazilyEvaluatedValue)
        }
        jobs.add(job)
    }
    jobs.joinAll()
}
```

<div align="left"><img src="https://images.viblo.asia/789b5076-3709-4eae-85db-21c20cee195c.png"></div><br />

Bây giờ, nếu bạn cố gắng chạy đoạn code bên trên trong **Synchronized** mode, **myLazilyEvaluatedValue** chỉ được tạo một lần duy nhất. Nhưng nếu bạn thay đổi mode thành **Publication** và chạy đoạn code trên 3 hoặc 4 lần, có thể bạn sẽ thấy rằng **myLazilyEvaluatedValue** được khởi tạo nhiều lần trong một lazy block.

## Source
https://ahsensaeed.com/differences-between-kotlin-lazy-lateinit-delegate/

## Reference

https://ahsensaeed.com/kotlin-lazy-evaluation-haskell-laziness/
https://ahsensaeed.com/lazy-evaluation-kotlin-with-lazy-threadsafetymode/