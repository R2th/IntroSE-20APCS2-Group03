Xin chào bạn đọc, chào mừng bạn đến với bài chia sẻ của mình. Chủ đề chính ngày hôm nay: "Giao tiếp giữa các fragment không dùng interface". Trong quá trình học và làm việc với Android thì chắc hẳn trong số chúng ta ai cũng đã và đang gặp phải trường hợp truyền dữ liệu giữa fragment với fragmnet hoặc fragment với activity. Ngoài cách truyền thống như là sử dụng interface hoặc broadcast receiver thì Android còn hỗ trợ lập trình viên một số cách truyền dữ liệu giữa các fragment như là : Sử dụng ViewModel và Fragment Result API. Hôm nay chúng ta cùng tìm hiểu về các cách này nhé. Let's go !!!
# 1. Chia sẻ dữ liệu sử dụng ViewModel
- ViewModel là một sự lựa chọn lý tưởng khi bạn cần chia sẻ dữ liệu giữa nhiều fragment hoặc giữa những fragment và activity mà chúng được add vào. Các đối tượng ViewModel được sử dụng để lưu trữ và quản lý dữ liệu UI. Trong bài này mình sẽ không đi sâu vào ViewModel nên nếu bạn nào chưa biết ViewModel là gì thì hãy tìm hiểu ngay tại đây nha: [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel)
###    1.1 Chia sẻ dữ liệu giữa fragment và activity
- Trong một vài trường hợp bạn có thể cần chia sẻ dữ liệu giữa các fragment với activity mà chúng được add vào. Ví dụ bạn có thể muốn chuyển đổi một phần UI chung ở activity dựa trên một tương tác người dùng ở một fragment. Ví dụ ItemViewModel :
```kotlin
class ItemViewModel : ViewModel() {
    private val mutableSelectedItem = MutableLiveData<Item>()
    val selectedItem: LiveData<Item> get() = mutableSelectedItem

    fun selectItem(item: Item) {
        mutableSelectedItem.value = item
    }
}
```
- Trong ví dụ này, dữ liệu đang lưu trữ được bao bọc trong MutableLiveData class. LiveData là một kiểu dữ liệu có thể quan sát được, nó có thể thông báo ngay lập tức khi có sự thay đổi về dữ liệu vì vậy mà các bạn có thể update lại giao diện ngay lập tức. LiveData nhận biết vòng đời, có nghĩa là nó tôn trọng vòng đời của các thành phần ứng dụng khác, chẳng hạn như các activities, fragments hoặc services. Nhận thức này đảm bảo LiveData chỉ cập nhật các thành phần ứng dụng quan sát nó khi những thành phần này đang ở trạng thái hoạt động. Để biết thêm về LiveData, hãy tìm hiểu tại : [LiveData](https://developer.android.com/topic/libraries/architecture/livedata)
- Fragment của bạn và Activity đều truy cập đến cùng 1 instance của ViewModel (cùng phạm vi hoạt động - phạm vi hoạt động của ViewModel được khởi tạo bằng cách truyền activity vào constructor của ViewModelProvider). ViewModelProvider xử lý việc khởi tạo ViewModel hoặc truy xuất đến nó nếu nó đã tồn tại. Cả Fragment và Activity đều có thể quan sát và sửa đổi dữ liệu trong ViewModel :
```kotlin
class MainActivity : AppCompatActivity() {
    private val viewModel: ItemViewModel by viewModels()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewModel.selectedItem.observe(this, Observer { item ->
        })
    }
}

class ListFragment : Fragment() {
    private val viewModel: ItemViewModel by activityViewModels()

    fun onItemClicked(item: Item) {
        viewModel.selectItem(item)
    }
}
```
- Chú ý: 

   + Tại sao bên trên mình nói :  " truyền activity vào constructor của ViewModelProvider " thì theo cách khởi tạo ViewModel trước đây thì bạn sẽ phải làm như sau: 
   
   ```kotlin
     val viewModel : ItemViewModel = ViewModelProvider(this).get(ItemViewModel.class)
   ```
   + Đảm bảo sử dụng phạm vi thích hợp với ViewModelProvider. Trong ví dụ trên, MainActivity được sử dụng làm phạm vi trong cả MainActivity và Fragment, vì vậy cả 2 đều có thể dùng chung được ItemViewModel. Nếu điều đó ngược lại thì không thể làm được.
###  1.2 Chia sẻ dữ liệu giữa fragment với nhau
- Hai hay nhiều fragment trong cùng một Activity thường sẽ có trường hợp phải giao tiếp với nhau. Ngoài cách sử dụng interface để giao tiếp giữa các fragment thì ví dụ sau đây cho thấy cách 2 fragment có thể sử dụng ViewModel để giao tiếp với nhau.
```kotlin
class ListViewModel : ViewModel() {
    val filters = MutableLiveData<Set<Filter>>()

    private val originalList: LiveData<List<Item>>() = ...
    val filteredList: LiveData<List<Item>> = ...

    fun addFilter(filter: Filter) { ... }

    fun removeFilter(filter: Filter) { ... }
}

class ListFragment : Fragment() {
    private val viewModel: ListViewModel by activityViewModels()
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        viewModel.filteredList.observe(viewLifecycleOwner, Observer { list ->
        }
    }
}

class FilterFragment : Fragment() {
    private val viewModel: ListViewModel by activityViewModels()
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        viewModel.filters.observe(viewLifecycleOwner, Observer { set ->
        }
    }

    fun onFilterSelected(filter: Filter) = viewModel.addFilter(filter)

    fun onFilterDeselected(filter: Filter) = viewModel.removeFilter(filter)
}
```
- Chú ý:
    + Cả hai fragment trên đều sử dụng activity của chúng làm phạm vi cho ViewModelProvider. Bởi vì các fragment sử dụng cùng 1 phạm vi, chúng cùng nhận được một instance của ViewModel sẽ cho phép chúng giao tiếp qua lại. 
    + ViewModel vẫn còn trong bộ nhớ cho đến khi` ViewModelStoreOwner` mà nó có phạm vi sử dụng biến mất vĩnh viễn. 
###  1.3 Chia sẻ dữ liệu giữa parent fragment và child fragment
- Khi làm việc với các child fragment, parent fragmnent của bạn và child fragment của nó có thể cần chia sẻ dữ liệu với nhau. Để chia sẻ dữ liệu giữa các child fragment này, hãy sử dụng parent fragment làm phạm vi của ViewModel.
```kotlin
class ListFragment: Fragment() {
    private val viewModel: ListViewModel by viewModels()
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        viewModel.filteredList.observe(viewLifecycleOwner, Observer { list ->
        }
    }
}

class ChildFragment: Fragment() {
    private val viewModel: ListViewModel by viewModels({requireParentFragment()})
}
```
### 1.4 Phạm vi một ViewModel khi sử dụng Navigation Graph
- Nếu bạn sử dụng thư viện Navigation, bạn cũng có thể điều chỉnh ViewModel trong vòng đời của `NavBackStackEntry` của điểm đến. Ví dụ ViewModel có thể được đưa vào `NavBackStackEntry` cho ListFragment như sau:
```kotlin
class ListFragment: Fragment() {
    private val viewModel: ListViewModel by navGraphViewModels(R.id.list_fragment)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        viewModel.filteredList.observe(viewLifecycleOwner, Observer { item ->
        }
    }
}
```
# 2. Nhận kết quả bằng Fragment Result API
### 2.1 Chuyển dữ liệu giữa các fragment
- Để chuyển dữ liệu từ fragment B qua fragment A. Đầu tiên cài đặt một listener để lắng nghe kết quả bên fragment A - fragment A dùng để nhận kết quả. Gọi `setFragmentResultListener()` trên FragmentManager của fragment A, Ví dụ:
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setFragmentResultListener("requestKey") { requestKey, bundle ->
        val result = bundle.getString("bundleKey")
    }
}
```
- Sơ đồ Fragment B gửi dữ liệu tới Fragment A bằng FragmentManager

![](https://images.viblo.asia/b3887c61-764e-4401-b3a6-bbba1067c263.png)

- Trong Fragment B - fragment gửi dữ liệu. Bạn phải gửi kết quả đi trên cùng một `FragmentManager`bằng cách sử dụng cùng một requestKey. Bạn có thể làm như vậy bằng cách sử dụng `setFragmentRessult()`
```kotlin
button.setOnClickListener {
    val result = "result"
    setFragmentResult("requestKey", bundleOf("bundleKey" to result))
}
```
- Sau đó, fragment A nhận được kết quả và thực hiện listener callback khi fragment được `STARTED`.
- Bạn chỉ có thể có một listener duy nhất và result cho một key nhất định. Nếu bạn gọi `setFragmentResult()` nhiều hơn 1 lần với cùng một key và nếu listener không `STARTED`. Hệ thống sẽ thay thế mọi kết quả đang chờ xử lý bằng một kết quả cập nhật mới nhất của bạn.
- Nếu bạn gửi một result mà không có listener tương ứng nhận nó, thì kết quả sẽ được lưu trữ trong `FragmentManager` cho đến khi bạn cài đặt một listener với chung một key để nhận nó.
- Khi một listener nhận được kết quả và kích hoạt callback onFragmentResult(), kết quả sẽ bị xóa. Hành vi này có hai hàm ý chính:
    + Các fragment trên ngăn xếp phía sau không nhận được kết quả cho đến khi chúng được xuất hiện và `STARTED`.
    + Nếu một fragment đang lắng nghe một kết quả mà được `STARTED` khi kết quả được thiết lập thì callback của listener sẽ được kích hoạt ngay lập tức.
 - Chú ý: Vì kết quả fragment được lưu trữ ở `FragmentManager` nên fragment của bạn phải được đính kèm để gọi `setFragmentResultListener()` hoặc `setFragmentResult()` với FragmentManager của chúng.
###  2.2 Chuyển dữ liệu giữa parent fragment và child fragment
- Để chuyển một kết quả từ child fragment đến parent fragment, parent fragment nên sử dụng `getChildFragmentManager()` thay vì `getParentFragmentManager()` khi gọi `setFragmentResultListener()`
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    childFragmentManager.setFragmentResultListener("requestKey") { key, bundle ->
        val result = bundle.getString("bundleKey")
    }
}
```
- Sơ đồ child fragment có thể sử dụng FragmentManager để gửi kết quả đến parent fragment
![](https://images.viblo.asia/66e0fb5f-0121-45db-8f30-aefd65f9a3d3.png)

- Child fragment gửi kết quả thông qua FragmentManager của nó, Sau đó parent fragment sẽ nhận được kết quả khi fragment `STARTED`
```kotlin
button.setOnClickListener {
    val result = "result"
    setFragmentResult("requestKey", bundleOf("bundleKey" to result))
}
```
### 2.3 Nhận kết quả ở Activity chứa fragment
- Để nhận kết quả gửi từ fragment đến Activity, hãy đặt một listener để lắng nghe và sử dụng `getSupportFragmentManager()`
```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        supportFragmentManager.setFragmentResultListener("requestKey", this) { requestKey, bundle ->
            val result = bundle.getString("bundleKey")
        }
    }
}
```

# Kết luận
- Có nhiều cách để giao tiếp dữ liệu giữa các fragment với nhau hoặc fragment với activity. Bạn đang sử dụng cách nào, hãy để lại comment để cùng học tập và trao đổi nhé.
- Bài viết trên là cá nhân tìm hiểu nên có thể đúng, có thể sai, mong được mọi người góp ý.
- Cảm ơn mọi người đã đọc bài của mình,
- Tài liệu tham khảo: https://developer.android.com/guide/fragments/communicate#kotlin