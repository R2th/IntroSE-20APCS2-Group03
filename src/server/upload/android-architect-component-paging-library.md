## I. Tổng quan về Paging
### 1. Paging labrary là gì?
Paging library là một component của Android Jetpack   
Sử dụng để tải và hiển thị một lượng nhỏ dữ liệu từ tập dữ liệu (local storage hoặc server api). Bằng cách đó, làm giảm việc sử dụng băng thông mạng. 
Hỗ trợ với LiveData hoặc RxJava cho việc quan sát dữ liệu mới trên UI.  
Thêm Paging libary vào ứng dụng Android 
```javascript
dependencies {
  def paging_version = "2.1.2"

  implementation "androidx.paging:paging-runtime:$paging_version" // For Kotlin use paging-runtime-ktx

  // alternatively - without Android dependencies for testing
  testImplementation "androidx.paging:paging-common:$paging_version" // For Kotlin use paging-common-ktx

  // optional - RxJava support
  implementation "androidx.paging:paging-rxjava2:$paging_version" // For Kotlin use paging-rxjava2-ktx
}
```    
### Library architecture   
Paging Library tích hợp trực tiếp vào kiến trúc ứng dụng Android (Android App Architecture). Các bạn cùng quan sát hình dưới đây nhé   
![](https://images.viblo.asia/8642982e-1f4d-4015-bf3c-216e6d33a421.png)
Hình bên trên sẽ mô tả về cách Paging Library tich hợp vào trong ứng dụng
Với 3 layer chính :  
* Repository Layer :   
Thành phần chính trong layer này chính là PagingSource. Mỗi PagingSource object sẽ xác định một nguồn dữ liệu và cách lấy dữ liệu từ nguồn đó.   
PagingSource có thể tải dữ liệu từ bất kỳ nguồn nào, bao gồm các nguồn trên mạng và cơ sở dữ liệu cục bộ. (network sources and local databases.)   
Một thành phần khác của Paging Library mà bạn có thể sử dụng là RemoteMediator. Đối tượng RemoteMediator xử lý phân trang từ tầng data source  
* ViewModel layer:  
Pager cung cấp một API để xây dựng PagingData Object
Component connect kết nối lớp ViewModel với UI chính là PagingData. Đối tượng PagingData là vùng chứa cho ảnh chụp nhanh dữ liệu được phân trang. Nó truy vấn một đối tượng PagingSource và lưu trữ kết quả.
Paging data chứa một snapshot của dữ liệu phân trang, nó truy vấn vào Paging Source và quản lí kết quả
* UI layer 
Component chính của layter này là PagingAdapter, và một recyclerview để xử lí việc phân trang 
### 2. Các thành phần chính của Paging library
* PagedList :   
Thành phần chính của Paging Library là class PagedList, lớp này tải các phần dữ liệu hoặc các trang của ứng dụng. Khi cần nhiều dữ liệu hơn, nó được phân trang vào đối tượng PagedList Object hiện có.   
Nếu bất kỳ dữ liệu được thay đổi, thì một newInstance() mới của PagedList sẽ được gửi tới  Observerble có thể quan sát sự thay đổi này như LiveData hoặc RxJava2. 
Khi các object của PagedList được tạo, ui sẽ đc hiên thị data, và nó vẫn tôn trọng vòng đời của UI controller  
* Data:   
Với mỗi instance của PageList() sẽ load data lấy từ DataSource và update vào snapshot  
Mỗi instance của PagedList sẽ load một snapshot và udpate vào data trong ứng dụng thông qua việc lấy data từ DataSource tương ứng của nó.   
Dữ liệu có thể lấy từ api hoặc cơ sở dữ liệu và sau đó sẽ được đưa vào đối tượng PagedList.   
Hay nói ngắn gọn thì dữ liệu đc lấy từ api (hoặc cơ sở dữ liệu đc đưa vào trong đối tượng PageList, từ PageList gửi một snapshot tới tập data của ứng dụng => update UI   
DataSource là lớp mà bạn cho ứng dụng của mình biết lượng dữ liệu muốn tải trong ứng dụng. Có thể tải dữ liệu từ máy chủ bằng cách sử dụng ba class con của lớp DataSource. 
    - ItemKeyedDataSource: Nếu bạn muốn dữ liệu của một item với sự trợ giúp của một item trước đó thì bạn có thể sử dụng ItemKeyedDataSource. Ví dụ: trong khi bình luận cho một bài viết, bạn cần id của bình luận cuối cùng để lấy nội dung của bình luận tiếp theo.
    - PageKeyedDataSource: Nếu trang nguồn cấp dữ liệu của bạn có một số tính năng của bài đăng tiếp theo hoặc trước đó thì bạn có thể sử dụng PageKeyedDataSource. Ví dụ: bạn có thể xem bài đăng tiếp theo bằng cách nhấp vào nút tiếp theo trong bất kỳ nền tảng truyền thông xã hội nào.  
    - PositionalDataSource: Nếu bạn chỉ muốn tìm nạp dữ liệu từ một vị trí cụ thể thì bạn có thể sử dụng PositionalDataSource. Ví dụ: trong số 1000 người dùng, nếu bạn muốn tìm nạp dữ liệu của những người dùng từ 300 đến 400 thì bạn có thể thực hiện việc này bằng cách sử dụng PositionalDataSource.      

* UI: 
PagedList class hoạt động với PagedListAdapter để đổ dữ liệu vào RecyclerView. Các lớp này làm việc cùng nhau để lấy và hiển thị nội dung khi dữ liệu đc tải về  
### 3. Lợi ích của việc sử dụng Paging
- Nội dụng đc hiển thị trên trang nhanh hơn  
- Sử dụng rất ít bộ nhớ
- Không tải cả cục dữ liệu lớn mà chỉ có thể tải một hoặc hai trang tại một thời điểm 
- Có thể sử dụng Paging cùng với LiveData và ViewModel để quan sát và cập nhật dữ liệu một cách dễ dàng hơn.  
## II. Load và Hiển thị Paged data
### 1. Xác định một DataSource
- Bước đầu tiên là xác định và implement PagingSource để xác định nguồn dữ liệu.  
 Override method load() để chỉ ra cách truy xuất dữ liệu được phân trang từ nguồn dữ liệu tương ứng. 
* Select key and value type  
PagingSource <Key, Value> có hai tham số kiểu: Key và Value. Key xác định một id được sử dụng để tải dữ liệu và value là loại dữ liệu muốn tải về.  
* Define the PagingSource    
Ví dụ sau đây sẽ implement một PagingSource tải các trang của các mục theo số trang đã định trước với key là kiểu Int và value là user
```javascript
class ExamplePagingSource(
    val backend: ExampleBackendService,
    val query: String
) : PagingSource<Int, User>() {
  override suspend fun load(
    params: LoadParams<Int>
  ): LoadResult<Int, User> {
    try {
      // tại thời điểm này nếu page 1 chưa đc define sẽ tự động refresh
      val nextPageNumber = params.key ?: 1 // 
      val response = backend.searchUsers(query, nextPageNumber)
      return LoadResult.Page(
        data = response.users,
        prevKey = null, // Only paging forward.
        nextKey = response.nextPageNumber
      )
    } catch (e: Exception) {
      // Handle errors in this block and return LoadResult.Error if it is an
      // expected error (such as a network failure).
    }
  }

  override fun getRefreshKey(state: PagingState<Int, User>): Int? {
    // Try to find the page key of the closest page to anchorPosition, from
    // either the prevKey or the nextKey, but you need to handle nullability
    // here:
    //  * prevKey == null -> anchorPage is the first page.
    //  * nextKey == null -> anchorPage is the last page.
    //  * both prevKey and nextKey null -> anchorPage is the initial page, so
    //    just return null.
    return state.anchorPosition?.let { anchorPosition ->
      val anchorPage = state.closestPageToPosition(anchorPosition)
      anchorPage?.prevKey?.plus(1) ?: anchorPage?.nextKey?.minus(1)
    }
  }
}
```  

Trong đoạn code trên bạn có thể thấy constructor có 2 param là backend và query 
- backend : Là một instance của backend service (là nơi cung cấp data)
- query : câu lệnh truy vấn vào backend service 
object LoadParams() :  bao gồm các thông tin về hoạt động tải sẽ được thực hiện. Nó bao gồm một key và số lượng item sẽ được tải.  
object LoadResult() : chứa kết quả của việc tải về. Nếu load thành công trả về object LoadResult.Page còn nếu fail return LoadResult.Error  
Việc Implement PagingSource bắt buộc phải ghi đè thêm một phương thức là getRefreshKey() 
method này lấy một đối tượng PagingState làm tham số và trả về key để truyền vào phương thức load() khi dữ liệu được làm mới hoặc mất hiệu lực sau lần tải đầu tiên.   
Paging Library sẽ tự động gọi phương thức này các lần làm mới dữ liệu tiếp theo.  
* xử lí lỗi 
Khi việc load data không thành công vì một số lý do ví dụ như do mạng. Lỗi đc trả về thông qua đối tượng LoadResult.Error từ phương thức load ().  
```javascript
catch (e: IOException) {
  // IOException for network failures.
  return LoadResult.Error(e)
} catch (e: HttpException) {
  // HttpException for any non-2xx HTTP status codes.
  return LoadResult.Error(e)
}
```  

### 2. Setup luồng dữ liệu
Thông thường, việc thiết lập luồng dữ liệu đc thực hiện trong ViewModel. Paging library hỗ trợ sử dụng một số luồng như Flow, LiveData, Flowable Observable types from RxJava.
Khi bạn tạo một đối tượng Pager để thiết lập luồng phản ứng của mình, bạn phải cung cấp cho nó một đối tượng cấu hình là PagingConfig và một hàm cho Pager biết cách lấy data từ PagingSource
```javascript
val flow = Pager(
  // Configure how data is loaded by passing additional properties to
  // PagingConfig, such as prefetchDistance.
  PagingConfig(pageSize = 20)
) {
  ExamplePagingSource(backend, query)
}.flow
  .cachedIn(viewModelScope)
```  

* Định nghĩa một recyclerview adapter :
Libary cung cấp lớp PagingDataAdapter để đưa dữ liệu lên recyclerview
```javascript
class UserAdapter(diffCallback: DiffUtil.ItemCallback<User>) :
  PagingDataAdapter<User, UserViewHolder>(diffCallback) {
  override fun onCreateViewHolder(
    parent: ViewGroup,
    viewType: Int
  ): UserViewHolder {
    return UserViewHolder(parent)
  }

  override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
    val item = getItem(position)
    // Note that item may be null. ViewHolder must support binding a
    // null item as a placeholder.
    holder.bind(item)
  }
}
```  

Ngoài việc xác định onCreateViewHolder() và onBindViewHolder() methods thì adapter cần phải chỉ định thêm một DiffUtil.ItemCallback. 
```javascript
object UserComparator : DiffUtil.ItemCallback<User>() {
  override fun areItemsTheSame(oldItem: User, newItem: User): Boolean {
    // Id is unique.
    return oldItem.id == newItem.id
  }

  override fun areContentsTheSame(oldItem: User, newItem: User): Boolean {
    return oldItem == newItem
  }
}
```

### 3. Hiển thị data lên UI 
Sau khi đã xác định đc PagingSource, đã tạo một luồng PagingData và xác định PagingDataAdapter => và bước cuối cùng là hiển thị dữ liệu lên UI
```javascript
val viewModel by viewModels<ExampleViewModel>()

val pagingAdapter = UserAdapter(UserComparator)
val recyclerView = findViewById<RecyclerView>(R.id.recycler_view)
recyclerView.adapter = pagingAdapter

// Activities can use lifecycleScope directly, but Fragments should instead use
// viewLifecycleOwner.lifecycleScope.
lifecycleScope.launch {
  viewModel.flow.collectLatest { pagingData ->
    pagingAdapter.submitData(pagingData)
  }
}
```
* Một số lưu í các bạn có thể quan tâm :   
List item của RecyclerView hiển thị dữ liệu được phân trang từ nguồn dữ liệu và tự động tải page khác khi cần thiết. => Chính vì vậy khi load data của page mới sẽ tự động udpate lên ui mà không cần quay lại call method submit data() => submit() chỉ đc không một lần.   
Vậy có khi nào nó đc call lại ko?
Câu trả lời là có : khi PagingSource bị vô hiệu hoặc adapter call method refresh() thì submitData() sẽ đc gọi lại  

### 4. Hiển thị trạng thái Loading State trên UI   
Paging Library hiển thị trạng thái loading của data thông qua đối tượng Load State.  
LoadState có 3 dạng tùy thuộc vào trạng thái hiện tại  
LoadState.NotLoading : không có việc load dữ liệu nào đc diễn ra và cả error cũng không có     
LoadState.Loading : trạng thái load đang diễn ra  
LoadState.Error : việc tải dữ liệu gây ra lỗi và trả về error  
Có hai cách để sử dụng LoadState để hiển thị lên UI đó là  
- sử dụng listener   
- sử dụng list adapter đặc biệt để hiển thị trạng thái tải trực tiếp trong danh sách RecyclerView.    
**4.1 . Sử dụng listener**
```javascript
// Activities can use lifecycleScope directly, but Fragments should instead use
// viewLifecycleOwner.lifecycleScope.
lifecycleScope.launch {
  pagingAdapter.loadStateFlow.collectLatest { loadStates ->
    progressBar.isVisible = loadStates.refresh is LoadState.Loading
    retry.isVisible = loadState.refresh !is LoadState.Loading
    errorMsg.isVisible = loadState.refresh is LoadState.Error
  }
}
```
**4.2. Sử dụng adapter để hiển thị trạng thái hiện tại của Loading state**   
Paging Library cung cấp một adapter được gọi là LoadStateAdapter nhằm mục đích hiển thị trạng thái load trong danh sách dữ liệu được phân trang    
```javascript
class LoadStateViewHolder(
  parent: ViewGroup,
  retry: () -> Unit
) : RecyclerView.ViewHolder(
  LayoutInflater.from(parent.context)
    .inflate(R.layout.load_state_item, parent, false)
) {
  private val binding = LoadStateItemBinding.bind(itemView)
  private val progressBar: ProgressBar = binding.progressBar
  private val errorMsg: TextView = binding.errorMsg
  private val retry: Button = binding.retryButton
    .also {
      it.setOnClickListener { retry() }
    }

  fun bind(loadState: LoadState) {
    if (loadState is LoadState.Error) {
      errorMsg.text = loadState.error.localizedMessage
    }

    progressBar.isVisible = loadState is LoadState.Loading
    retry.isVisible = loadState is LoadState.Error
    errorMsg.isVisible = loadState is LoadState.Error
  }
}

// Adapter that displays a loading spinner when
// state = LoadState.Loading, and an error message and retry
// button when state is LoadState.Error.
class ExampleLoadStateAdapter(
  private val retry: () -> Unit
) : LoadStateAdapter<LoadStateViewHolder>() {

  override fun onCreateViewHolder(
    parent: ViewGroup,
    loadState: LoadState
  ) = LoadStateViewHolder(parent, retry)

  override fun onBindViewHolder(
    holder: LoadStateViewHolder,
    loadState: LoadState
  ) = holder.bind(loadState)
}
```

Sau đó call method withLoadStateHeaderAndFoote () từ PagingDataAdapter 
```javascript
pagingAdapter
  .withLoadStateHeaderAndFooter(
    header = ExampleLoadStateAdapter(adapter::retry),
    footer = ExampleLoadStateAdapter(adapter::retry)
  )
```  

**Tài liệu tham khảo**   
https://developer.android.com/topic/libraries/architecture/paging/v3-paged-data  
https://blog.mindorks.com/paging-3-tutorial