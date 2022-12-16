Trước khi tôi bắt đầu, mã của bài viết này có sẵn tại kotlin-mem-leak của repo performance-test:

https://github.com/marcosholgado/performance-test/tree/kotlin-mem-leak

Toàn bộ tiền đề rất đơn giản, tôi muốn viết một Activity sẽ bị memory leak để tôi có thể phát hiện ra điều đó trong integration test. Vì tôi đã sử dụng công cụ rò rỉ nên tôi đã sao chép Hoạt động mẫu của họ để tạo lại rò rỉ bộ nhớ. Tôi đã xóa một số mã từ mẫu và kết thúc với lớp Java sau.

```
public class LeakActivity extends Activity {

  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_leak);
    View button = findViewById(R.id.button);
    button.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        startAsyncWork();
      }
    });
  }

  @SuppressLint("StaticFieldLeak")
  void startAsyncWork() {
    Runnable work = new Runnable() {
      @Override public void run() {
        SystemClock.sleep(20000);
      }
    };
    new Thread(work).start();
  }
}
```

LeakActivity có một nút mà khi nhấn, sẽ tạo ra một Runnable mới chạy trong 20 giây. Vì Runnable là một lớp ẩn danh, nó có một tham chiếu ẩn đến LeakActivity bên ngoài và nếu Activity bị hủy trước khi luồng kết thúc (20 giây sau khi nhấn nút) thì Activity sẽ bị rò rỉ. Nó sẽ không bị rò rỉ mãi mãi, sau 20 giây đó, nó sẽ sãn sàng để được thu thập lại.

Vì tôi đang viết mã của mình trong Kotlin, tôi đã chuyển đổi lớp Java đó thành mã Kotlin trông như thế này:

```
class KLeakActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_leak)
        button.setOnClickListener { startAsyncWork() }
    }

    private fun startAsyncWork() {
        val work = Runnable { SystemClock.sleep(20000) }
        Thread(work).start()
    }
}
```

Không có gì đặc biệt ở đây, tôi đang tận dụng lambdas để loại bỏ boilerplate khỏi Runnable và trên lý thuyết mọi thứ sẽ giống nhau phải không? Sau đó tôi test bằng cách sử dụng công cụ rò rỉ và chú thích @LeakTest của riêng tôi để chạy bộ phân tích bộ nhớ của họ chỉ trong bài kiểm tra này.

```
class LeakTest {
    @get:Rule
    var mainActivityActivityTestRule = ActivityTestRule(KLeakActivity::class.java)

    @Test
    @LeakTest
    fun testLeaks() {
        onView(withId(R.id.button)).perform(click())
    }
}
```

Thử nghiệm thực hiện một lần bấm nút và vì đó là điều duy nhất chúng tôi đang thực hiện, hoạt động sẽ bị hủy ngay lập tức sau đó và tạo ra rò rỉ vì chúng tôi không đợi trong 20 giây.

Nếu chúng tôi cố gắng thực hiện kiểm tra testLeaks bên trong MyKLeakTest bạn sẽ thấy các kiểm tra được cho qua có nghĩa là chúng tôi đã không phát hiện bất kỳ rò rỉ bộ nhớ nào.

Kết quả này làm tôi bối rối rất nhiều, vào cuối ngày tôi đã thay thế lớp Java ẩn danh đó bằng một lớp bên trong Ẩn danh và vì đó là một instance của functional Java interface, tôi có thể sử dụng biểu thức lambda thay thế (thêm về các phương thức trừu tượng đơn lẻ hoặc Chuyển đổi SAM ở đây ).

Tôi đã viết một hoạt động mới, cùng mã nhưng lần này tôi giữ nó trong Java. Tôi đã thay đổi bài kiểm tra để trỏ đến activity mới này, chạy nó và lần này, nó đã thất bại. Mọi thứ bắt đầu có ý nghĩa hơn một chút bây giờ. Mã Kotlin phải khác với mã Java, một cái gì đó đã xảy ra ở đó và chỉ có một nơi để tìm nó: Byte code .


**Phân tích LeakActivity.java**
Để bắt đầu, tôi đã phân tích Mã số Dalvik của hoạt động Java. Để làm điều đó, bạn phải phân tích apk của mình thông qua Build/Analyze APK... và sau đó chọn từ tệp classes.dex mà lớp bạn muốn phân tích.

![](https://cdn-images-1.medium.com/max/1600/1*znJ48mU9tJtCoI_f45sxjA.png)

Chúng tôi nhấp chuột phải vào lớp và chọn Show Bytecode để lấy Dalvi Bytecode của lớp. Tôi sẽ chỉ tập trung vào phương thức startAsyncWork vì chúng tôi biết đó là nơi xảy ra rò rỉ bộ nhớ.

```
.method startAsyncWork()V
    .registers 3
    .annotation build Landroid/annotation/SuppressLint;
        value = {
            "StaticFieldLeak"
        }
    .end annotation

    .line 29
    new-instance v0, Lcom/marcosholgado/performancetest/LeakActivity$2;

    invoke-direct {v0, p0}, Lcom/marcosholgado/performancetest/LeakActivity$2;-><init>
                               (Lcom/marcosholgado/performancetest/LeakActivity;)V

    .line 34
    .local v0, "work":Ljava/lang/Runnable;
    new-instance v1, Ljava/lang/Thread;

    invoke-direct {v1, v0}, Ljava/lang/Thread;-><init>(Ljava/lang/Runnable;)V

    invoke-virtual {v1}, Ljava/lang/Thread;->start()V

    .line 35
    return-void
.end method
```

Chúng tôi biết rằng một lớp ẩn danh giữ một tham chiếu đến lớp bên ngoài vì vậy chúng tôi sẽ tìm kiếm điều đó. Trong mã byte ở trên, chúng tôi tạo một phiên bản mới của LeakActivity$2 và chúng tôi lưu trữ nó trong v0 (dòng 10).

```
new-instance v0, Lcom/marcosholgado/performancetest/LeakActivity$2;
```

Nhưng LeakActivity$2 gì? Nếu chúng ta tiếp tục nhìn vào tập tin class.dex của bạn, bạn sẽ tìm thấy nó ở đó.

Vì vậy, hãy xem mã byte Dalvik cho lớp đó. Tôi đã xóa một số mã khỏi kết quả mà chúng tôi không thực sự quan tâm.

```
.class Lcom/marcosholgado/performancetest/LeakActivity$2;
.super Ljava/lang/Object;
.source "LeakActivity.java"

# interfaces
.implements Ljava/lang/Runnable;

# instance fields
.field final synthetic this$0:Lcom/marcosholgado/performancetest/LeakActivity;


# direct methods
.method constructor <init>(Lcom/marcosholgado/performancetest/LeakActivity;)V
    .registers 2
    .param p1, "this$0"    # Lcom/marcosholgado/performancetest/LeakActivity;

    .line 29
    iput-object p1, p0, Lcom/marcosholgado/performancetest/LeakActivity$2;
                    ->this$0:Lcom/marcosholgado/performancetest/LeakActivity;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method
```

Điều thú vị đầu tiên bạn có thể thấy là lớp này triển khai Runnable.

```
# interfaces
.implements Ljava/lang/Runnable;
```

Giống như tôi đã nói trước lớp này nên có một tài liệu tham khảo cho lớp bên ngoài vậy nó ở đâu? Ngay bên dưới giao diện có một trường ví dụ kiểu LeakActivity .

```
# instance fields
.field final synthetic        
    this$0:Lcom/marcosholgado/performancetest/LeakActivity;
```

Và nếu chúng ta nhìn vào hàm tạo của Runnable của bạn, bạn sẽ thấy rằng nó cần một tham số, LeakActivity .

```
.method constructor 
    <init>(Lcom/marcosholgado/performancetest/LeakActivity;)V
```

Quay trở lại mã byte của LeakActivity nơi chúng tôi đang tạo một LeakActivity$2 , bạn có thể thấy cách nó sử dụng thể hiện đó (được lưu trữ trong v0) để gọi hàm tạo mà chúng ta vừa thấy để truyền một thể hiện của LeakActivity .

```
new-instance v0, Lcom/marcosholgado/performancetest/LeakActivity$2;
invoke-direct {v0, p0},   
    Lcom/marcosholgado/performancetest/LeakActivity$2;-><init>    
    (Lcom/marcosholgado/performancetest/LeakActivity;)V
```

Vì vậy, lớp LeakActivity.java thực sự sẽ bị rò rỉ nếu nó bị kill trước khi Runnable kết thúc vì nó có tham chiếu đến Activity và nó sẽ không phải là bộ nhớ rác được thu thập tại thời điểm đó.

**Phân tích LeakActivity.java**
Để bắt đầu, tôi đã phân tích bytecode Dalvik của Activity Java. Để làm điều đó, bạn phải phân tích apk của mình thông qua Build/Analyze APK... và sau đó chọn từ tệp classes.dex mà lớp bạn muốn phân tích.

```
.method private final startAsyncWork()V
    .registers 3

    .line 20
    sget-object v0, 
      Lcom/marcosholgado/performancetest/KLeakActivity$startAsyncWork$work$1;
      ->INSTANCE:Lcom/marcosholgado/performancetest/KLeakActivity$startAsyncWork$work$1;

    check-cast v0, Ljava/lang/Runnable;

    .line 24
    .local v0, "work":Ljava/lang/Runnable;
    new-instance v1, Ljava/lang/Thread;

    invoke-direct {v1, v0}, Ljava/lang/Thread;-><init>(Ljava/lang/Runnable;)V

    invoke-virtual {v1}, Ljava/lang/Thread;->start()V

    .line 25
    return-void
.end method
```

Trong trường hợp này, thay vì tạo một thể hiện mới, mã byte đang thực thi sget-object thực hiện một hoạt động object static field  với static field được xác định.

Đi sâu hơn một chút vào *KLeakActivity$startAsyncWork$work$1* mã byte, chúng ta có thể thấy rằng, giống như trước đây, lớp này thực hiện Runnable nhưng bây giờ nó có một phương thức tĩnh không cần một thể hiện của lớp bên ngoài.

```
.class final Lcom/marcosholgado/performancetest/KLeakActivity$startAsyncWork$work$1;
.super Ljava/lang/Object;
.source "KLeakActivity.kt"

# interfaces
.implements Ljava/lang/Runnable;

.method static constructor <clinit>()V
    .registers 1

    new-instance v0, 
      Lcom/marcosholgado/performancetest/KLeakActivity$startAsyncWork$work$1;

    invoke-direct {v0}, 
      Lcom/marcosholgado/performancetest/KLeakActivity$startAsyncWork$work$1;-><init>()V

    sput-object v0, 
      Lcom/marcosholgado/performancetest/KLeakActivity$startAsyncWork$work$1;
      ->INSTANCE:Lcom/marcosholgado/performancetest/KLeakActivity$startAsyncWork$work$1;

    return-void
.end method

.method constructor <init>()V
    .registers 1

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method
```

Và đó là lý do tại sao KLeakActivity của tôi  không bị rò rỉ bất cứ thứ gì, bằng cách sử dụng lambda (thực ra là SAM) chứ không phải là một lớp bên trong ẩn danh, tôi không tham chiếu đến Activity bên ngoài của mình. Nhưng sẽ không công bằng khi nói rằng đây là một cái gì đó cụ thể đối với Kotlin, nếu bạn đang sử dụng lambdas Java8 thì kết quả hoàn toàn giống nhau.

Nếu bạn muốn biết thêm về điều này, tôi khuyên bạn nên đọc bài viết này về [ lambda translations](https://cr.openjdk.java.net/~briangoetz/lambda/lambda-translation.html) 

> Lambdas như phần trên có thể được dịch sang các phương thức tĩnh, vì chúng không sử dụng thể hiện đối tượng kèm theo theo bất kỳ cách nào (không đề cập đến this , super hoặc các thành viên của thể hiện kèm theo.) Nói chung, chúng ta sẽ đề cập đến lambdas sử dụng this , super hoặc bắt các thành viên của cá thể kèm theo làm lambdas bắt cá thể .
> Non-instance-capturing lambdas là dịch sang các private , static method. Instance-capturing lambdas là được dịch sang các private method

Vậy cái này là về cái gì? Kotlin lambda của tôi là một Non-instance-capturing vì không sử dụng enclosing object instance. Tuy nhiên, nếu chúng ta đang sử dụng giả sử một trường từ lớp bên ngoài, lambda của chúng ta sẽ có một tham chiếu đến lớp bên ngoài và rò rỉ.

```
class KLeakActivity : Activity() {

    private var test: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_leak)
        button.setOnClickListener { startAsyncWork() }
    }

    private fun startAsyncWork() {
        val work = Runnable {
            test = 1 // comment this line to pass the test
            SystemClock.sleep(20000)
        }
        Thread(work).start()
    }
}
```

Trong ví dụ trên,  tôi sử dụng test trường bên trong Runnable của chúng tôi do đó có tham chiếu đến Activity bên ngoài và tạo rò rỉ bộ nhớ. Nhìn lại mã byte, bạn có thể thấy nó cần truyền một thể hiện của KLeakActivity cho Runnable của chúng tôi (dòng 9) vì chúng tôi hiện đang sử dụng Instance-capturing lambdas.

```
.method private final startAsyncWork()V
    .registers 3

    .line 20
    new-instance v0, Lcom/marcosholgado/performancetest/KLeakActivity$startAsyncWork$work$1;

    invoke-direct {v0, p0}, 
       Lcom/marcosholgado/performancetest/KLeakActivity$startAsyncWork$work$1;
       -><init>(Lcom/marcosholgado/performancetest/KLeakActivity;)V

    check-cast v0, Ljava/lang/Runnable;

    .line 24
    .local v0, "work":Ljava/lang/Runnable;
    new-instance v1, Ljava/lang/Thread;

    invoke-direct {v1, v0}, Ljava/lang/Thread;-><init>(Ljava/lang/Runnable;)V

    invoke-virtual {v1}, Ljava/lang/Thread;->start()V

    .line 25
    return-void
.end method
```

Nguồn : https://proandroiddev.com/how-kotlin-helps-you-avoid-memory-leaks-e2680cf6e71e