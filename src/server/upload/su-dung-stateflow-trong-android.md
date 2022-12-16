## StateFlow

[`StateFlow`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-state-flow/) được mô tả là một flow đại diện cho trạng thái chỉ đọc với một giá trị dữ liệu có thể cập nhật duy nhất phát ra các bản cập nhật giá trị cho bộ thu (flow collectors) của nó. `StateFlow` là một data-model hữu ích để đại diện cho bất kỳ loại trạng thái nào, nó được thiết kế để sử dụng trong các trường hợp yêu cầu quản lý trạng thái trong thực thi bất đồng bộ với Kotlin Coroutines.  `StateFlow` được nâng lên stable API kể từ phiên bản [`Kotlin Coroutines 1.4.0`](https://github.com/Kotlin/kotlinx.coroutines/releases/tag/1.4.0)

StateFlow gồm hai biến thể: **StateFlow** và **MutableStateFlow** :

- `StateFlow<T>` interface chỉ cung cấp quyền truy cập giá trị.
- `MutabaleStateFlow<T>` interface cung cấp khả năng sửa đổi giá trị.

```kotlin
public interface StateFlow<out T> : SharedFlow<T> {
   public val value: T
}

public interface MutableStateFlow<out T>: StateFlow<T>, MutableSharedFlow<T> {
   public override var value: T
   public fun compareAndSet(expect: T, update: T): Boolean
}
```

Trạng thái của `StateFlow` được biểu thị bằng giá trị thông qua thuộc tính `value`. Thuộc tính `value` luôn có giá trị ban đầu do đó có thể đọc một cách an toàn bất cứ lúc nào. Mọi cập nhật đối với giá trị sẽ được phản ánh trong tất cả các bộ thu bằng cách phát ra một giá trị với các cập nhật trạng thái. Trong Android, `StateFlow` rất phù hợp cho các lớp cần duy trì trạng thái có thể thay đổi quan sát được.

Một ví dụ đơn giản về cách sử dụng State flow:

```kotlin
class MainViewModel : ViewModel() {
    private val _countState = MutableStateFlow(0)

    val countState: StateFlow<Int> = _countState

    fun incrementCount() {
        viewModelScope.launch { _countState.value++ }
    }

    fun decrementCount() {
        viewModelScope.launch { _countState.value-- }
    }
}
```

Đoạn này khá giống cách sử dụng của `LiveData`:
- Khai báo` _countState` là MutableStateFlow để khởi tạo giá trị và cung cấp khả năng cập nhật giá trị.
- Khai báo một thể hiện của StateFlow là `countState` được để lộ cho Views (*read-only field*).

Khi bắt đầu thu giá trị từ `StateFlow`, bộ thu sẽ nhận được trạng thái cuối cùng trong luồng và mọi trạng thái tiếp theo. Các giá trị trong `StateFlow` được kết hợp bằng cách sử dụng so sánh Any.equals theo cách tương tự với toán tử [`distinctUntilChanged`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/distinct-until-changed.html). Nó được sử dụng để kết hợp các bản cập nhật `value` trong MutableStateFlow và để ngăn chặn việc phát ra các giá trị tới bộ thu khi giá trị mới bằng với giá trị được phát ra trước đó.

Ví dụ views lắng nghe trạng thái `StateFlow`:

```kotlin
class MainActivity : AppCompatActivity() {

    private val viewModel by lazy {
        ViewModelProvider(this)[MainViewModel::class.java]
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        button_plus.setOnClickListener {
            viewModel.incrementCount()
        }
        
        button_minus.setOnClickListener {
            viewModel.decrementCount()
        }
        
        viewLifecycleOwner.lifecycleScope.launchWhenStarted {
            viewModel.countState.collect { value ->
                textview_count.text = "$value"
            }
        }
    }
}
```

Ở ví dụ sử dụng  `viewLifecycleOwner.lifecycleScope.launchWhenStarted` để ràng buộc với lifecycle của views. 

### StateFlow và LiveData

`StateFlow`và [`LiveData`](https://developer.android.com/topic/libraries/architecture/livedata)có những điểm tương đồng. Cả hai đều là các lớp lưu trữ dữ liệu có thể quan sát được và cả hai đều tuân theo một mẫu tương tự khi được sử dụng trong kiến trúc ứng dụng.
Tuy nhiên, `StateFlow`và `LiveData` có những hành vi khác nhau:

- `StateFlow`yêu cầu một trạng thái ban đầu được chuyển vào hàm tạo trong khi `LiveData`thì không.
-  `StateFlow` ngăn chặn việc phát ra các giá trị tới bộ thu khi giá trị mới bằng với giá trị được phát ra trước đó.
- `LiveData.observe()`tự động hủy đăng ký consumer khi UI chuyển sang trạng thái `STOPPED`, trong khi collect từ một `StateFlow`hoặc bất kỳ luồng nào khác thì không.

Ngoài ra, `StateFlow` còn sử dụng được nhiều operators rất xịn của Flow (zip, combine ...) trong khi `LiveData` rất hạn chế.

Trong ví dụ ở bên trên có sử dụng `viewLifecycleOwner.lifecycleScope.launchWhenStarted` để nhận biết vòng đời khi thu thập từ flow, tránh lãng phí tài nguyên. Ngoài ra, cũng có thể xử lý khi thay đổi trạng thái vòng đời (Lifecycle states) theo cách thủ công, như trong ví dụ sau:

```kotlin
class MainActivity : AppCompatActivity() {
    ...
    private var uiStateJob: Job? = null

    override fun onStart() {
        super.onStart()
        uiStateJob = lifecycleScope.launch {
            viewModel.uiState.collect { uiState -> 
                // Handle UI state
            }
        }
    }

    override fun onStop() {
        uiStateJob?.cancel()
        super.onStop()
    }
}
```

Một cách khác để ngừng lắng nghe các `uiState`thay đổi khi UI không hiển thị là sử dụng hàm `asLiveData()` trong thư viện `lifecycle-livedata-ktx` để chuyển flow về `LiveData` :smiley::

```kotlin
class LatestNewsActivity : AppCompatActivity() {
    ...
    override fun onCreate(savedInstanceState: Bundle?) {
        ...
        viewModel.uiState.asLiveData().observe(this) { state ->
            // Handle UI state
        }
    }
}
```

---

### Tham khảo

https://developer.android.com/kotlin/flow/stateflow-and-sharedflow

https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-state-flow/

https://scalereal.com/android/2020/05/22/stateflow-end-of-livedata.html

https://cesarmorigaki.medium.com/replace-livedata-with-stateflow-4f3c89214b04