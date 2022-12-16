## What is a Memory Leak?
<div align="center"><img src="https://images.viblo.asia/6f0ebe6d-ba08-4d9b-b0d0-fa16edb00221.jpg" /></div>
OutOfMemoryError hay đơn giản là OOM là cái gì đó mà mọi Android Developer đều đã từng gặp. Nếu bạn không thấy bất cứ OOM trong ứng dụng của mình, thì bạn sẽ gặp nó ở một thời điểm nào đó trong tương lai. OutOfMemoryError xảy ra trong Android là do memory leaks(rò rỉ bộ nhớ). Do đó, để loại bỏ OutOfMemoryError, bạn cần loại bỏ memory leaks khỏi ứng dụng Android của mình.

Trong bài viết này, bạn sẽ giải quyết OutOfMemoryError trong Android với sự trợ giúp của một vài ví dụ thực tế. Do đó, hay bắt đầu với những điều cơ bản về Memory Leak trong Android.

Khi bạn chạy một vài ứng dụng trên thiết bị Android thì Android System sẽ cung cấp một phân vùng bộ nhớ cho ứng dụng của bạn để nó có thể làm việc. Tất cả các quá trình tạo biến, function, activity,... đều diễn ra chỉ trong phân vùng bộ nhớ đó.

**Ví dụ**, nếu Android System cấp phát 100MB cho ứng dụng của bạn, thìn ứng dụng của bạn có thể sử dụng tối đa 100MB ở một khoảng thời gian cụ thể. Nếu trong khoảng thời gian đó, nếu khoảng không gian được cấp phép cho ứng dụng bị giảm xuống hoặc một vài khoản phí không gian bộ nhớ bị mất đi, thì Garbage Collector(GC) sẽ giải phóng bộ nhớ cái đang được giữ bởi các biến đó và các activities đó không thể được sử dụng. Trong cách thức này, ứng dụng sẽ nhận được phân vùng bộ nhớ sau đó.

**NOTE** : Garbage Collector thực hiện công việc giải phóng bộ nhớ một cách tự động và bạn không phải thực hiện bất cứ điều gì ở đây cả.

Nhưng thỉnh thoảng, khi bạn viết mã nguồn theo một cách thức ko được tốt lắm do đó mã nguồn của bạn giữ tham chiếu tới các objects cái là không cần thiết nữa, thì trong trường hợp này, Garbage Collector không thể giải phóng các phân vùng nhớ không được sử dụng và không có không gian sẽ được dọn dẹp đi cho ứng dụng của bạn thực hiện các công việc khác của nó. Cái này gọi là một Memory Leak.

Do hiện tượng Memory Leak trong Android, chúng ta gặp phải OutOfMemoryError trong Android bởi vì mã nguồn của mình đang giữ các tham chiếu tới các objects cái không cần thiết nữa và Garbage Collector không thể thực hiện công việc của nó, điều này dẫn tới ứng dụng của bạn sử dụng tất cả không gian được cấp phép cho nó bởi Android System và nó đang đòi hỏi thêm nữa.

## What may be the reasons for OutOfMemoryError?
Có rất nhiều lý do dẫn tới OutOfMemoryError trong Android. Một vài lý do thông thường về Memory Leak cái là kết quả trong OutOfMemoryError đó là:
* Sử dụng Static view/context/activity.
* Đăng kí hay hủy đăng kí các listeners.
* Non-Static inner class.
* Sử dụng sai **getContext()** và **getApplicationContext()**.

Hãy xem xét chi tiết từng cái một.

## Use of static views/context/activity.
Nếu bạn đang sử dụng một số static views/context/activity thì bạn sẽ gặp phải OutOfMemoryError(Nếu các activities của bạn đang chiếm rất nhiều không gian bộ nhớ). Điều này là bởi vì view hay context, hay activity sẽ được giữ bởi Application trong suốt vòng đời của  nó và do đó những phân vùng nhớ bị chiếm này sẽ không được giải phóng bởi Garbage Collector.

**Ví dụ**, Trong ứng dụng của bạn, bạn đang có 4 activities, giả sử là A, B, C, và D. "A" là main activity và bạn có thể mở các activity B, C, và D từ A. Giờ đây, giả sử các activities B, C, và D đang được giữ static tham chiếu tới context của nó và mỗi activities đang sử dụng 2MB và tổng memory được cấp phát cho ứng dụng trong Android System là 4MB. Như vậy, khi activity B được khởi chạy thì memory được sử dụng bởi ứng dụng sẽ là 2MB. Giờ thì trở lại acitivity A, và khởi chạy activity C. Giờ thì bộ nhớ được sử dụng bởi ứng dụng sẽ là 4MB(2MB cho activity B, và 2MB cho activity C). Trở lại activity A một lần nữa và start activity D. Giờ thì ứng dụng của bạn sẽ cần tới 6MB(2MB cho B, 2MB cho C, và 2MB cho D), nhưng bộ nhớ được cấp phát trước đó chỉ là 4MB. Do đó, trong khi mở activity D, bạn sẽ nhận được OutOfMemoryError bởi vì bộ nhớ được cấp phát là 4MB mà ứng dụng của bạn đòi hỏi 6MB.

Hãy tìm hiểu một ví dụ thực tế. Đây là một ví dụ, sử dụng Bitmap. Bằng các sử dụng nhiều hơn 5 images với kích thước mỗi cái là 1MB, ứng dụng của chúng ta sẽ gặp phải OutOfMemoryError trên thiết bị Android của mình. Có thể đối với trường hợp của bạn, số lượng images để có thể xayr ra OutOfMemoryError có thể nhiều hơn 5. Bạn có thể biết được giới hạn bằng các thêm vào các images cho BitmapArray từng cái một cho tới khi nào nhận được OOM, đó chính là giới hạn trên thiết bị của bạn.

Do đó, ứng dụng của chúng ta đang có một MainActivity và từ activity này, chúng ta có thể di chuyển tới ActivityB và ActivityC. Tất cả các activities này đó là ActivityB và ActivityC đang có các tham chiếu static tới context của chúng. Do đó, không gian bộ nhớ đã sử dụng bởi các activies này sẽ không bị xóa bởi Garbage Collector.

Mã nguồn bên dưới là cho ActivityB:

```
class ActivityB : AppCompatActivity() {
    // static context
    companion object {
        lateinit var context: Context
    }
    val bitmapArray = ArrayList<Bitmap>()
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_b)
        context = this
        Thread(Runnable {
            try {
                // adding 3 images to bitmapArray
                val bitmap1: Bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.image1)
                val bitmap2: Bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.image2)
                val bitmap3: Bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.image3)
                bitmapArray.add(bitmap1)
                bitmapArray.add(bitmap2)
                bitmapArray.add(bitmap3)
            } catch (e: Exception){
                Logger.getLogger(ActivityB::class.java.name).warning(e.toString())
            }
        }).start()
    }
}
```

Bên dưới là mã nguồn cho ActivityC:

```
class ActivityB : AppCompatActivity() {
    // static context
    companion object {
        lateinit var context: Context
    }
    val bitmapArray = ArrayList<Bitmap>()
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_b)
        context = this
        Thread(Runnable {
            try {
                // adding 3 images to bitmapArray
                val bitmap1: Bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.image1)
                val bitmap2: Bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.image2)
                val bitmap3: Bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.image3)
                bitmapArray.add(bitmap1)
                bitmapArray.add(bitmap2)
                bitmapArray.add(bitmap3)
            } catch (e: Exception){
                Logger.getLogger(ActivityB::class.java.name).warning(e.toString())
            }
        }).start()
    }
}
```

Do đó, nếu bạn chạy ActivityB từ MainActivity, thì sẽ không có OutOfMemoryError bởi vì giới hạn của thiết bị mobile là 5 images và trong ActivityB, chúng ta đang sử dụng chỉ có 3 images.

Bây giờ, trở lại với MainActivity và khởi chạy ActivityC và bạn sẽ nhận được OutOfMemoryError bởi vì ở trong ActivityC, chúng ta đang sử dụng 3 images và bởi vì chúng ta đang sử dụng static context trong cả ActivityB và ActivityC, tham chiếu tới ActivityB vẫn được chúng ta giữ và tất cả chúng ta có 6 images(3 từ ActivityB và 3 từ ActivityC) và giới hạn trên thiết bị mobile là 5 images. Do đó OutOfMemoryError sẽ xảy ra.

Để loại bỏ điều này, tạo context, hoặc view, hoặc activity **Non-Static**.

```
class ActivityB : AppCompatActivity() {
    
    lateinit var context: Context
    val bitmapArray = ArrayList<Bitmap>()

    override fun onCreate(savedInstanceState: Bundle?) {
        ...
    }
}
```

## Register and unregister listeners.
Trong Android, chúng ta sử dụng nhiều loại listeners nhằm lắng nghe các thay đổi giống như thay đổi location. Do đó, đừng quên unregister các listeners của bạn khi bạn hoạn thành việc sử dụng listener đó.
Nếu bạn không unregister các listeners, thì listener sẽ có mặt trong background và không gian bị chiếm bởi listener sẽ không được xóa bởi Garbage Collector ngay cả khi listener đó không được sử dụng. Do đó, tốt hơn hết là unregister các listeners nếu bạn không sử dụng. Hãy xem xét ví dụ thực tế bên dưới.

Trong ví dụ này, chúng ta đang có một lớp Singleton với tên là "SomeListener" cái sẽ có 2 functions ví dụ là ***register()*** và ***unregister()*** được sử dụng để thêm vào activity trong mảng activity và phương thức ***unregister()*** được sử dụng để loại bỏ activity từ mảng đó. Mã nguồn bên dưới là cho Singleton class:

```
object SomeListener {
    private val activityArray = ArrayList<Activity>()

    fun register(activity: Activity) {
        activityArray.add(activity)
    }
    fun unregister(activity: Activity) {
        activityArray.remove(activity)
    }
}
```

Trong thiết bị mobile của tôi, nếu tôi đang thêm vào 5 images thì ứng dụng sẽ nhận OutOfMemoryError. Do đó, trong ví dụ này, chúng ta sẽ có 3 activities. Ví dụ: MainActivity, ActivityB, ActivityC. ActivityB và ActivityC sẽ được gọi từ MainActivity và trong ***onCreate()*** fuction của tất cả các activities, chúng ta sẽ gọi phương thức ***register()*** của lớp Singleton để thêm các activities trong mảng các activity.

Bên dưới là mã nguồn của ActivityB:

```
class ActivityB : AppCompatActivity() {
    
    val bitmapArray = ArrayList<Bitmap>()
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_b)
        Thread(Runnable {
            try {
                // adding 3 images to bitmapArray
                val bitmap1: Bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.image1)
                val bitmap2: Bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.image2)
                val bitmap3: Bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.image3)
                bitmapArray.add(bitmap1)
                bitmapArray.add(bitmap2)
                bitmapArray.add(bitmap3)
            } catch (e: Exception){
                Logger.getLogger(ActivityB::class.java.name).warning(e.toString())
            }
        }).start()
        // calling the register() function
        SomeListener.register(this)
    }
}
```

Bên dưới là mã nguồn của ActivityC:

```
class ActivityC : AppCompatActivity() {
    
    val bitmapArray = ArrayList<Bitmap>()
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_c)
        Thread(Runnable {
            try {
                // adding 3 images to bitmapArray
                val bitmap1: Bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.image1)
                val bitmap2: Bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.image2)
                val bitmap3: Bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.image3)
                bitmapArray.add(bitmap1)
                bitmapArray.add(bitmap2)
                bitmapArray.add(bitmap3)
            } catch (e: Exception){
                Logger.getLogger(ActivityC::class.java.name).warning(e.toString())
            }
        }).start()
        // calling the register() function
        SomeListener.register(this)
    }
}
```

Nếu chúng ta gọi ActivityB từ MainActivity, thì tham chiếu tới 3 images sẽ được lưu lại(bởi vì chúng ta đang lưu trong lớp Singleton). Ở đây, không có OutOfMemoryError sẽ được show lên bởi vì giới hạn của chúng ta là 5 images. Bây giờ, nếu chúng ta trở lại MainActivity và gọi ActivityC, thì chúng ta sẽ nhận được OutOfMemoryError bởi quá trình khởi tạo, chúng ta đang tham chiếu tới 3 images và khi Activity được khởi chạy, thì 3 images khác sẽ xảy ra và tổng chúng ta có tham chiếu tới 6 images(bởi chúng ta đang sử dụng lớp Singleton) và giới hạn của chúng ta là 5 images. Do đó, chúng ta sẽ chạm trán MemoryOutOfBoundError.

Để loại bỏ lỗi này, bạn phải unregister listener khi acitivity được closed hoặc không được sử dụng. Do đó, thêm các dòng bên dưới để unregister listener của mình khi Activity được stop:

```
override fun onStop() {
    SomeListener.unregister(this)
    super.onStop()
}
```

## The nested class must be Static.
Nếu bạn có một số nested classes trong ứng dụng của mình, thì tạo nó là một static class bởi vì static class không cần tới tham chiếu ngầm tới outer class. Do đó, nếu bạn đang sử dụng inner class như một non-static thì nó làm cho outer class sống cùng với vòng đời của ứng dụng.
Do đó, điều này dẫn tới OutOfMemoryError nếu class của bạn sử dụng rất nhiều bộ nhớ. Như vậy, sẽ là tốt hơn khi tạo ra các static inner class.

Trong Java, bạn phải tạo các static inner class cho mình nhưng trong Kotlin, inner class mặc định là static một cách tự nhiên. Do đó, bạn không cần lo lắng về static inner class trong Kotlin.

## Wrong use of getContext() and getApplicationContext() in third party libraries.
Chúng ta sử dụng rất nhiều thư viện của bên thứ 3 trong ứng dụng của mình và hầu hết chúng sử dụng các Singleton classes. Do đó, nếu bạn đang truyền context cho một third-party libary và third-party library đó thuộc về phạm vi của activity hiện tại thì sử dụng ***getApplicationContext()*** và không sử dụng ***getContext()***.

Thông thường, chúng ta thực hiện cái này trong application của mình:

```
SomeThirdPartyLibrary.initialize(this)
```

Ở đây, quá trình khởi tạo một số static function trong các thư viện đó và nó sử dụng context giống như cái này:

```
SomeThirdPartyLibrary {
  object companion {
    initialize(Content context) {
       this.context = context.getApplicationContext()
    }
  }
}
```

Nhưng một vài libraries không sử dụng quy ước như trên. Như vậy, trong trường hợp đó, nó sẽ sử dụng context của activity hiện tại và bởi vì điều này, tham chiếu tới activity hiện tại sẽ được giữ cho đến hết vọng đời của ứng dụng và điều này có thể dẫn tới OutOfMemoryError(bởi vì các initialize functions là static).

Như vậy, tốt hơn là sử dụng ***getApplicationContext()*** trong mã nguồn một cách rõ ràng và không tin tưởng vào third-party libraries thực hiện điều đó.

Có một số kĩ thuật cái có thể được sử dụng nhằm loại bỏ OutOfMemoryError khỏi ứng dụng của bạn. Tốt hơn là viết mã nguồn cái không nhận lại bất cứ OutOfMemoryError nào cả. Ngay cả khi nếu project của bạn là rất lớn và bạn mất rất nhiều công sức nhằm tìm kiếm các lớp cái nhận trách nhiệm cho OutOfMemoryError, thì bạn có thể sử dụng memory profiler của Android Studio và tìm ra lớp chịu trách nhiệm cho OutOfMemoryError này.

Tìm hiểu về cách sử dụng Android Studio Memory Profiler ở đây.

Ngoài ra, có một thư viện gọi là ***LeakCanary***, cái cho bạn biết về các classes cái chịu trách nhiệm cho memory leaks trong ứng dụng Android của mình.

Tìm hiểu thêm về ***LeaKCanary***.

## Conclusion.
Vừa rồi, chúng ta đã học về việc làm thế nào để loại bỏ OutOfMemoryError trong Android. Điều này có thể được loại bỏ bằng cách sử dụng một tham chiếu non-static của views/context/activity, bằng các đăng kí/hủy đăng kí các listeners, bằng các sử dụng một static inner class,....
Như vậy, trong tương lại, nếu bạn viết mã nguồn cho Android, thì chúng ta có thể tránh được các lỗi liên quan tới OutOfMemoryError nếu chúng ta áp dụng các chiến thuật này.

## Source
https://blog.mindorks.com/practical-guide-to-solve-out-of-memory-error-in-android-application
## Reference
1. **[How to use Android Studio Memory Profiler](https://www.youtube.com/watch?v=FxDa2td6Ej8)**.
2. **[LeakCanary](https://square.github.io/leakcanary/)**.
## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))