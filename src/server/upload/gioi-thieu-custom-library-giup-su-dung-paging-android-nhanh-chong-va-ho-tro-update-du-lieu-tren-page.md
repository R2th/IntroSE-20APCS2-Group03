# Giới thiệu
Chào các bạn, như các bạn đã biết Google cho ra mắt thư viện Paging nằm trong bộ Android Jetpack từ khá lâu. Tuy nhiên, thực tế là không nhiều dự án áp dụng thư viện này bởi 3 điểm hạn chế chí mạng của nó so với các phương pháp tạo danh sách infinite scroll khác:
1. Nếu chỉ lấy dữ liệu từ network để phân trang, list dữ liệu hiển thị lên UI chỉ có thể xem chứ không thể tương tác để cập nhật dữ liệu cho các item riêng biệt được (ví dụ bạn sẽ không thể update thuộc tính Like/Dislike của một item trong list lên network)
2. Nếu chỉ lấy dữ liệu từ local database để phân trang (ví dụ sử dụng Room), bạn có thể cập nhật các item khi tương tác với chúng, tuy nhiên hầu như các trường hợp dữ liệu không bao giờ chỉ có ở local database thôi.
3. Nếu lấy dữ liệu từ network lưu về local database, rồi sử dụng dữ liệu local database để phân trang và cập nhật ngược trở lại network khi có thay đổi, bạn sẽ giải quyết được cả 2 vấn đề còn tồn tại phía trên. Tuy nhiên triển khai phương pháp này tốn rất nhiều công sức, có thể khiến chúng ta nản lòng và quay trở lại với những cách phân trang cũ.

Mặc dù vậy, Paging có nhiều ưu điểm về hiệu suất hơn so với những người anh em khác, chúng ta không thể bỏ qua và không sử dụng nó chỉ vì những vấn đề chưa được giải quyết này.

Vì vậy mình đã làm sẵn một thư viện nhỏ giúp triển khai Paging với combo Room database + network trở nên đơn giản hơn rất nhiều. Trong bài viết này mình sẽ giới thiệu cách sử dụng thư viện này cho các bạn.

# Mục tiêu

Chúng ta sẽ làm 1 ứng dụng hiển thị danh sách phim chứa từ khoá **avenger**, có tính năng cuộn vô tận và có thể kéo thả thay đổi vị trí của item

[![Loadmore.gif](https://s3.gifyu.com/images/Loadmore.gif)](https://gifyu.com/image/EZXT)

Link ứng dụng sample: https://github.com/trunghq3101/LoadMoreDbNetworkPagination

# Cài đặt
Chúng ta bắt đầu bằng việc thêm thư viện vào danh sách dependencies

Hãy chắc chắn trong file build.gradle (module: project) đã có đoạn code này

```
allprojects {
		repositories {
			...
			maven { url 'https://jitpack.io' }
		}
	}
```

Sau đó hãy thêm các thư viện sau vào file build.gradle (module: app) 

```
dependencies {
            ...
            
            // Thư viện custom Paging
	        implementation 'com.github.trunghq3101:responsivepaging:1.0.1'
            
            // ViewModel & LiveData
            implementation 'androidx.lifecycle:lifecycle-extensions:2.0.0'

            // Paging
            implementation 'androidx.paging:paging-runtime:2.1.0'
            implementation 'androidx.paging:paging-runtime-ktx:2.1.0'

            // Room
            implementation 'androidx.room:room-runtime:2.1.0'
            implementation 'androidx.room:room-ktx:2.1.0'
            kapt 'androidx.room:room-compiler:2.1.0'

            // Rx
            implementation("io.reactivex.rxjava2:rxjava:2.2.2")
            implementation("io.reactivex.rxjava2:rxandroid:2.1.0")

            // Retrofit
            implementation("com.squareup.retrofit2:retrofit:2.5.0")
            implementation("com.squareup.retrofit2:converter-gson:2.5.0")
            implementation("com.squareup.okhttp3:logging-interceptor:3.11.0")
            implementation("com.squareup.retrofit2:adapter-rxjava2:2.5.0")

            // Gson
            implementation 'com.google.code.gson:gson:2.8.5'

            // Glide
            implementation 'com.github.bumptech.glide:glide:4.9.0'
            kapt 'com.github.bumptech.glide:compiler:4.9.0'

            // Koin
            implementation 'org.koin:koin-core:2.0.1'
            implementation 'org.koin:koin-android:2.0.1'
            implementation 'org.koin:koin-androidx-viewmodel:2.0.1'
            implementation 'org.koin:koin-java:2.0.0-beta-1'
```

# Chọn API

Mình sẽ sử dụng API miễn phí từ trang [OMDb](https://www.omdbapi.com/) để lấy dữ liệu đầu vào là danh sách các phim có chứa keyword **avenger**

Link API: https://www.omdbapi.com/?apikey=2ed35bde&s=avenger

![](https://images.viblo.asia/a32c43c5-09c9-4c00-90d9-731e449ba318.png)

# Cấu trúc project

Sơ đồ package trong ứng dụng này sẽ đơn giản như sau:

![](https://images.viblo.asia/1f31980a-2274-4000-853b-5646cd5d7f21.png)

# Tạo model

Bên trong package **data > model** mình sẽ tạo 2 model phục vụ cho Paging

1. Movie

**Chú ý**:
* Phải implement interface **BaseLoadMoreEntity**
* Phải đặt tableName là **page_data**

```
@Entity(tableName = "page_data")
data class Movie(
    @PrimaryKey(autoGenerate = true)
    val id: Long? = null,
    @SerializedName("Title")
    val title: String? = null,
    @SerializedName("Year")
    val year: String? = null,
    @SerializedName("Poster")
    val poster: String? = null
): BaseLoadMoreEntity {
    override var indexInResponse: Int = -1
}
```

2. MovieListResponse

**Chú ý**:
* Phải implement interface **BaseLoadMoreResponse**
 
```
data class MovieListResponse (
    @SerializedName("Search")
    val data: List<Movie>
) : BaseLoadMoreResponse<Movie> {
    override fun getListData(): List<Movie> {
        return data
    }
}
```

# Tạo lớp kế thừa Room Database và DAO của thư viện

Bên trong package **data > local** chúng ta sẽ tạo 2 class cho Room Database và DAO

1. MovieRoomDao

Bởi vì các câu query đã viết sẵn trong class **LoadMoreDao** nên chúng ta chỉ cần khai báo đơn giản như sau:
```
@Dao
abstract class MovieRoomDao : LoadMoreDao<Movie>
```

2. MovieRoomDb

Chúng ta khai báo như bình thường, tuy nhiên cần chú ý: 
* Phải implement **LoadMoreDb**
* Phải override **LoadMoreDao()** và trả về **MovieRoomDao**

```
@Database(
    entities = [Movie::class],
    version = 1,
    exportSchema = false
)
abstract class MovieRoomDb : LoadMoreDb<Movie>() {
    companion object {
        private var INSTANCE: MovieRoomDb? = null

        fun create(context: Context): MovieRoomDb? {
            if (INSTANCE == null) {
                synchronized(MovieRoomDb::class.java) {
                    INSTANCE =
                        Room.databaseBuilder(
                            context.applicationContext,
                            MovieRoomDb::class.java,
                            "MovieRoomDb"
                        ).fallbackToDestructiveMigration()
                            .build()
                }
            }
            return INSTANCE
        }
    }

    abstract override fun LoadMoreDao(): MovieRoomDao
}
```

# Tạo ApiService để call API
Trong package **data > remote** chúng ta tạo class ApiService

**Chú ý**
* Kiểu trả về là **Call<...>** chứ không phải Observable của Rx như bình thường

```
interface ApiService {

    @GET("/")
    fun searchMovies(
        @Query("apikey") apiKey: String? = "2ed35bde",
        @Query("s") keyword: String? = null,
        @Query("page") page: Int? =null
    ): Call<MovieListResponse>
}
```

# Tạo Repository
Trong package **data > repository** chúng ta tạo 1 interface và 1 class thực thi

1. MovieRepository

Đơn giản chỉ giúp việc mở rộng code sau này dễ dàng hơn

```
interface MovieRepository: ILoadMoreWithDbRepository<Movie, Int, MovieListResponse>
```

2. MovieRepositoryImpl

**Chú ý**
* Phải extend **BaseLoadMoreWithDbRepository**

```
class MovieRepositoryImpl(
    ioExecutor: Executor,
    db: LoadMoreDb<Movie>,
    private val apiService: ApiService
) : BaseLoadMoreWithDbRepository<Movie, Int, MovieListResponse>(
    db = db,
    ioExecutor = ioExecutor,
    networkPageSize = 10
), MovieRepository {

    private var key = 1

    override fun getKey(): Int? {
        return key
    }

    override fun nextKey(response: MovieListResponse) {
        key ++
    }

    override fun fetchDataFromNetwork(
        key: Int?,
        loadSize: Int?
    ): Call<MovieListResponse> {
        return apiService.searchMovies(keyword = "Avenger", page = key)
    }
}
```

# Xử lí UI
Trong package **ui > home** chúng ta sẽ tạo lần lượt ViewModel, Fragment và Adapter cho màn hiển thị danh sách phim

```
class MovieViewModel(
    private val repository: MovieRepository
) : BaseLoadMoreWithDbViewModel<Movie>() {

    override fun getInitData(): Listing<Movie> {
        return repository.refreshData()
    }

    fun swapItems(from: Movie, to: Movie) {
        repository.swapItem(from, to)
    }

    override fun syncDataToNetwork(item: Movie) {
    }

    override fun syncDataToNetwork(items: List<Movie>) {
        Log.d("------>", " : Sync data")
    }
}
```

```
class MovieAdapter : BaseLoadMoreAdapter<Movie>(homeSpotCallback) {

    override val itemBindingVariable: Int = BR.item

    override fun getItemLayoutRes(): Int {
        return R.layout.item_movie
    }

    class SwipeCallback(
        private val adapter: MovieAdapter,
        private val onItemMove: (from: Movie, to: Movie) -> Unit
    ) : ItemTouchHelper.SimpleCallback(ItemTouchHelper.UP or ItemTouchHelper.DOWN, ItemTouchHelper.RIGHT) {

        private var from: Int = 0
        private var to: Int = 0

        override fun onMove(
            recyclerView: RecyclerView,
            viewHolder: RecyclerView.ViewHolder,
            target: RecyclerView.ViewHolder
        ): Boolean {
            from = viewHolder.adapterPosition
            to = target.adapterPosition
            val item1 = adapter.getItem(from)
            val item2 = adapter.getItem(to)
            if (item1 != null && item2 != null) {
                adapter.notifyItemMoved(from, to)
                return true
            }
            return false
        }

        override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
        }

        override fun isLongPressDragEnabled(): Boolean {
            return true
        }

        override fun onSelectedChanged(viewHolder: RecyclerView.ViewHolder?, actionState: Int) {
            super.onSelectedChanged(viewHolder, actionState)
            if (actionState == ItemTouchHelper.ACTION_STATE_DRAG) {
                viewHolder?.itemView?.alpha = 0.5f
            }
        }

        override fun clearView(recyclerView: RecyclerView,
                               viewHolder: RecyclerView.ViewHolder) {
            super.clearView(recyclerView, viewHolder)
            viewHolder.itemView.alpha = 1.0f

            val item1 = adapter.getItem(from)
            val item2 = adapter.getItem(to)
            if (item1 != null && item2 != null) {
                onItemMove(item1, item2)
            }
        }
    }

}

val homeSpotCallback = object : DiffUtil.ItemCallback<Movie>() {
    override fun areItemsTheSame(oldItem: Movie, newItem: Movie): Boolean {
        return oldItem.id == newItem.id
    }

    override fun areContentsTheSame(oldItem: Movie, newItem: Movie): Boolean {
        return oldItem == newItem
    }

}
```

```
class HomeMovieFragment : Fragment() {

    private val viewModel: MovieViewModel by viewModel()
    private val adapter: MovieAdapter = MovieAdapter()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_home, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        initData()
        observeField()
    }

    fun initData() {

        recyclerHomeSpot.adapter = adapter
        recyclerHomeSpot.addItemDecoration(SpacesItemDecoration(resources.getDimensionPixelSize(R.dimen.dp_8)))

        ItemTouchHelper(MovieAdapter.SwipeCallback(adapter) { from, to ->
            viewModel.swapItems(from, to)
        }).apply {
            attachToRecyclerView(recyclerHomeSpot)
        }

        viewModel.loadData()
    }

    fun observeField() {
        viewModel.data.observe(viewLifecycleOwner, Observer {
            adapter.submitList(it)
            viewModel.syncDataToNetwork(it.snapshot())
        })
        viewModel.networkState.observe(viewLifecycleOwner, Observer {
            adapter.networkState = it
        })
    }

    companion object {
        fun newInstance() = HomeMovieFragment()
    }
}
```

# Inject dependency cần thiết

Mình sử dụng Koin để inject các thành phần phụ thuộc, chi tiết các bạn có thể xem [trong package **di** ](https://github.com/trunghq3101/LoadMoreDbNetworkPagination/tree/add_lib/app/src/main/java/com/trunghoang/generalapp/di)

# Hoàn thành

Chỉ sau 1 vài bước set up không quá phức tạp, chúng ta sẽ thu được kết quả là 1 danh sách phim có thể cuộn vô tận và kéo thả để thay đổi vị trí của 1 phim trong danh sách

[![Loadmore.gif](https://s3.gifyu.com/images/Loadmore.gif)](https://gifyu.com/image/EZXT)

Link ứng dụng sample: https://github.com/trunghq3101/LoadMoreDbNetworkPagination