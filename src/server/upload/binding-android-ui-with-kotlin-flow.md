## Introduction
Mã nguồn cơ bản cho Android hiện đại đang hướng tới **reactive**. Với các khái niệm và mô hình như MVI, Redux, hay Unidirectional Data Flow, rất nhiều components của hệ thống được mô hình hóa như các **streams**.

Các sự kiện UI cũng có thể được mô hình hóa thành các streams là các inputs từ hệ thống.

Nền tảng Android và các UI widgets không được đóng gói cung cấp các  listener/callback theo kiểu các APIs, nhưng với [RxBinding](https://github.com/JakeWharton/RxBinding) chúng ta có thể dễ dàng ánh xạ chúng với RxJava **Observable**.

```
findViewById<Button>(R.id.button).clicks().subscribe {
    // handle button clicked
}
```

## Kotlin Flow
Kotlinx.coroutine 1.3 giới thiệu Flow, cái là một phần quan trọng được thêm vào thư viện nhằm hỗ trợ [**cold stream**](https://medium.com/@elizarov/cold-flows-hot-channels-d74769805f9). Nó(về lý thuyết) là một [reactive stream](https://www.reactive-streams.org/) được triển khai dựa trên các suspending functions của Kotlin và channels API.

## Binding Android UI with Flow
Trong bài viết này, chúng ta sẽ không thảo luận tại sao chung ta có hoặc không cần chuyển đổi từ RxJava sang Kotlin Coroutines/Flow. Những hãy xem xét làm thế nào chúng ta có thể triển khai **clicks()** tương tự như trên với **Flow**. API sẽ trông giống như thế này:

```
scope.launch {
    findViewById<Button>(R.id.button)
        .clicks() // this returns a Flow<Unit>
        .collect {
            // handle button clicked
        }
}
```

Thư viện **kotlinx.coroutine** cung cấp rất nhiều phương thức builder ở mức độ trừu tượng cao nhằm tạo ra **Flow**. Một trong số đó là **callbackFlow** cái được thiết kế một cách cụ thể nhằm chuyển đổi nhiều lần bắn callback thành một **Flow**.

```
fun View.clicks(): Flow<Unit> = callbackFlow 
    val listener = View.OnClickListener {
        offer(Unit)
    }
    setOnClickListener(listener)
    awaitClose { setOnClickListener(null) }
}
```

Khối mã nguồn với **awaitClose** được chạy khi người sử dụng flow hủy bỏ quá trình thu thập dữ liệu từ flow do đó đây là vị trí hoàn hảo để loại bỏ những listeners được đăng kí trước đó.

**offer(...)** đẩy một thành phần mới vào **SendChannel** cái **Flow** sử dụng ở bên trong. Nhưng function này có thể gây ra exception nếu channel bị đóng. Chúng ta có thể tạo một extension function cái bắt lấy bất cứ cancellation exception nào:

```
fun <E> SendChannel<E>.safeOffer(value: E) = !isClosedForSend && try {
    offer(value)
} catch (e: CancellationException) {
    false
}
```

Và đây là toàn bộ mã nguồn:

```
package reactivecircus.flowbinding.android.view

import android.view.View
import androidx.annotation.CheckResult
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.flow.conflate
import reactivecircus.flowbinding.common.checkMainThread
import reactivecircus.flowbinding.common.safeOffer

/**
 * Create a [Flow] of click events on the [View] instance.
 *
 * Note: Created flow keeps a strong reference to the [View] instance
 * until the coroutine that launched the flow collector is cancelled.
 *
 * Example of usage:
 *
 * ```
 * view.clicks()
 *     .onEach {
 *          // handle view clicked
 *     }
 *     .launchIn(uiScope)
 * ```
 */
@CheckResult
@OptIn(ExperimentalCoroutinesApi::class)
public fun View.clicks(): Flow<Unit> = callbackFlow {
    checkMainThread()
    val listener = View.OnClickListener {
        safeOffer(Unit)
    }
    setOnClickListener(listener)
    awaitClose { setOnClickListener(null) }
}.conflate()
```

Một vài UI widgets có thể giữ một trạng thái bên trong như là giá trị hiện tại của **Slider**(một cái được thêm vào [**Material Component**](https://github.com/material-components/material-components-android/blob/master/docs/components/Slider.md) gần đây) cái bạn có thể cần phải lắng nghe bởi một **Flow**. Trong trường hợp này nó cũng có thể là hữu ích nếu **Flow** có thể phát ra giá trị hiện tại ngay lập tức khi được thu thập, do đó bạn có thể gán giá trị này cho một vài thành phần UI khác từ sớm khi mà screen được hiển thị mà giá trị của slider không bị thay đổi bởi người dùng.

```
@CheckResult
@UseExperimental(ExperimentalCoroutinesApi::class)
fun Slider.valueChanges(emitImmediately: Boolean = false): Flow<Float> = callbackFlow {
    checkMainThread()
    val listener = Slider.OnChangeListener { _, value ->
        safeOffer(value)
    }
    setOnChangeListener(listener)
    awaitClose { setOnChangeListener(null) }
}
    .startWithCurrentValue(emitImmediately) { value }
    .conflate()
```

Tham số tùy chọn **emitImmediately** điều khiển giá trị hiện tại được phát ra ngay lập tức cho quá trình thu thập của flow.

Khi **emitImmediately** là **true** chúng ta thêm **onStart {emit(value)}** vào **flow** ban đầu cái là tương đương với **startWith(value)** trong RxJava. Hành vi này có thể được gói lại trong một extension function:

```
fun <T> Flow<T>.startWithCurrentValue(emitImmediately: Boolean, block: () -> T?): Flow<T> {
    return if (emitImmediately) onStart {
        block()?.run { emit(this) }
    } else this
}
```

Như chúng ta có thể thấy nó khá là dễ để triển khai quá trình gắn các sự kiện UI cho Kotlin Flow. Nhưng vẫn còn đó một số lượng không đếm xuể các widgets khác của nền tảng hoặc không được đóng gói sẵn vào AndroidX, cũng như các components mới như **MaterialDataPicker**, **Slider**,... đang được thêm vào [**Android Material Components**](https://github.com/material-components/material-components-android).

Do đó sẽ là tuyệt vời nếu chúng ta có một thư viện phục vụ cho quá trình bindings này mà sử dụng Kotlin Flow.

## Android FlowBinding
Có một thư viện gọi là [FlowBinding](https://github.com/ReactiveCircus/FlowBinding) cái cung cấp một tập hợp quan trọng các binding APIs cho nền tảng Android cũng như những UI widgets không được đóng gói khác được phát hành dưới dạng thư viện mở.

Thư viện này lấy ý tưởng từ RxBinding của Jake và nhắm tới việc hỗ trợ hầu hết các bindings được cung cấp bởi RxBinding, cũng như chuyển hướng tập trung vào việc hỗ trợ một số APIs mới của AndroidX như là **ViewPager2** cũng như một số components mới đã có sẵn trong **Material Design**.

Các Bindings là sẵn có như là những thực thể độc lập:

```
// Platform bindings
implementation "io.github.reactivecircus.flowbinding:flowbinding-android:${flowbinding_version}"// AndroidX bindings
implementation "io.github.reactivecircus.flowbinding:flowbinding-appcompat:${flowbinding_version}"
implementation "io.github.reactivecircus.flowbinding:flowbinding-core:${flowbinding_version}"
implementation "io.github.reactivecircus.flowbinding:flowbinding-drawerlayout:${flowbinding_version}"
implementation "io.github.reactivecircus.flowbinding:flowbinding-navigation:${flowbinding_version}"
implementation "io.github.reactivecircus.flowbinding:flowbinding-recyclerview:${flowbinding_version}"
implementation "io.github.reactivecircus.flowbinding:flowbinding-swiperefreshlayout:${flowbinding_version}"
implementation "io.github.reactivecircus.flowbinding:flowbinding-viewpager2:${flowbinding_version}"// Material Components bindings
implementation "io.github.reactivecircus.flowbinding:flowbinding-material:${flowbinding_version}"
```

Danh sách các binding APIs đã được cung cấp có ở [đây](https://github.com/ReactiveCircus/FlowBinding#roadmap).

### Test
Hầy hết nỗ lực đã được chuyển vào quá trình kiểm thử library. Tất cả các binding APIs đã được đảm bảo bởi các kiểm thử Android Instrument Tests cái được chạy trên các bản CI builds.

### Usage
Để lắng nghe các sự kiện click trên Android View:

```
findViewById<Button>(R.id.button)
    .clicks() // binding API available in flowbinding-android
    .onEach {
        // handle button clicked
    }
    .launchIn(uiScope)
```

### Binding Scope
**launchIn(scope)** là một sự rút gọn của **scope.launch { flow.collect() }** được cung cấp bởi thư viện **kotlinx.coroutines.core**.

**uiScope** trong ví dụ bên trên là một **CoroutineScope** cái định nghĩa lifecycle của Flow. Quá trình thực hiện binding sẽ gắn với scope này bởi quá trình hủy đăng kí callback/listener một cách tự động khi mà scope bị hủy.

Trong phạm vi của Android Lifecycle điều này có nghĩa là **uiScope** được truyền ở đây nên là một scopy cái được gắn với **Lifecycle** của view cái gắn liền với cuộc sống của widgets.

**androidx.lifecycle:lifecycle-runtime-ktx:2.2.0** giới thiệu một extension property là **LifecycleOwner.lifecycleScope: LifecycleCoroutineScope** cái sẽ được hủy mỗi khi **Lifecycle** bị hủy.

Trong một **Activity** nó có thể được trông giống như thế này:

```
class ExampleActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_example)
        findViewById<Button>(R.id.button)
            .clicks()
            .onEach {
                // handle button clicked
            }
            .launchIn(lifecycleScope) // provided by lifecycle-runtime-ktx
    }
}
```

Chú ý rằng với FlowBinding bạn không cần quan tâm tới unregister hoặc remove các listeners hay callbacks trong **onDestroy()** bởi vì nó được thực hiện một cách tự động cho bạn.

Tất cả các binding APIs khác cùng với ví dụ sử dụng được nêu trong tài liệu cái bạn có thể tìm thấy ở mà nguồn. Bạn cũng có thể thấy tất cả các instrumented tests cho tất cả các binding APIs ở đó.

### Roadmap
Với bản release hiện tại FlowBinding đã có thể hỗ trợ cho hầu hết các trường hợp bindings có trong RxBindings và thêm vào một số bindings cho **Material Components** bao gồm cả một số view mới như **MaterialDatePicker** và **Slider**.
Trong khi khối lượng công việc cho quá trình viết instruments tests là rất lớn nên các APIs vẫn chưa được ổn định. Tất cả kết hoạch cập nhật thư viện hay thêm vào các bindings còn xót hay quá trình fix bugs đều được cập nhật ở [đây](https://github.com/ReactiveCircus/FlowBinding/).

## Source
https://medium.com/@ychescale9/binding-android-ui-with-kotlin-flow-491c054cdb60

## References
1. [**Kotlin Coroutine Flow API: An Efficient Way To Handle Streams**](https://viblo.asia/p/kotlin-coroutine-flow-api-an-efficient-way-to-handle-streams-GrLZDaowlk0).
2.  [**Cold flows, hot channels**](https://viblo.asia/p/cold-flows-hot-channels-GrLZDaAwlk0).
3.  [**Reactive Stream**](https://www.reactive-streams.org/).
4.  [**Material Component**](https://github.com/material-components/material-components-android/blob/master/docs/components/Slider.md).

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))