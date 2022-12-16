# **Giới thiệu**
- `Paging` được google mới cho ra mắt trong bộ [Android JetPack](https://developer.android.com/jetpack/?gclid=EAIaIQobChMI1PyHs9vF3AIVU6aWCh0WGAGHEAAYASAAEgJEgvD_BwE) của mình
- Thành phần chính của `Paging` là `DataSource`, `PagedList` và `PagedListAdapter` các bạn có thể  tìm hiểu thêm ở [đây](https://developer.android.com/topic/libraries/architecture/paging/)
- Bài này chủ yếu mình muốn hướng đẫn cách sử dụng đơn giản của `Paging`

# **1.Thêm `Paging` vào dependencies ở `build.gradle` trong `module`:**
```
dependencies {
  ...
  implementation "android.arch.paging:runtime:1.0.1"
  implementation "android.arch.paging:rxjava2:1.0.1"
}
```
# **2.Tạo file `Service` để thực hiện request**
```
interface GithubService {

    @GET("/users")
    fun getUsers(@Query("since") userId: Long, @Query("per_page") perPage: Int): Single<List<User>>

    companion object {
        fun getService(): GithubService {
            val retrofit = Retrofit.Builder()
                    .baseUrl("https://api.github.com/")
                    .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
            return retrofit.create(GithubService::class.java)
        }
    }
}
```
# **3.Tạo file `UsersDataSource`**
- File này implement `ItemKeyedDataSource` để override lại 3 phương thức chính để tạo nên `Paging` đó là :
 + loadInitial: Như tên của nó thì nó sẽ gọi khi `DataSource` được khởi tạo
 + loadBefore: Sẽ được gọi sau `loadInitial`
 + loadAfter: Sẽ được gọi khi list của bạn đạt tới `limit` được khai báo
- Code của mình thì sẽ như này: 
```
class UsersDataSource(private val githubService: GithubService,
    private val compositeDisposable: CompositeDisposable) : ItemKeyedDataSource<Long, User>() {

    val isLoading = MutableLiveData<Boolean>()
    val isRefresh = MutableLiveData<Boolean>()

    override fun loadInitial(params: LoadInitialParams<Long>, callback: LoadInitialCallback<User>) {
        isLoading.postValue(true)
        isRefresh.postValue(true)
        logi(params.requestedLoadSize.toString())
        compositeDisposable.add(githubService.getUsers(1, params.requestedLoadSize)
            .subscribe({
                isLoading.postValue(false)
                isRefresh.postValue(false)
                callback.onResult(it)
            }, {
                isLoading.postValue(false)
                isRefresh.postValue(false)
            }))
    }
    override fun loadAfter(params: LoadParams<Long>, callback: LoadCallback<User>) {
        isLoading.postValue(true)
        compositeDisposable.add(
            githubService.getUsers(params.key, params.requestedLoadSize)
                .subscribe({ users ->
                    isLoading.postValue(false)
                    callback.onResult(users)
                }, {
                    isLoading.postValue(false)
                }))
    }
    override fun loadBefore(params: LoadParams<Long>, callback: LoadCallback<User>) {
    }
    override fun getKey(item: User): Long {
        return item.id
    }
}
```
# **3.Tạo `UsersDataSourceFactory`**
- Dùng để khởi tạo `DataSource` cung cấp dữ liệu cho `PagedList`
```
class UsersDataSourceFactory(private val githubService: GithubService,
    private val compositeDisposable: CompositeDisposable) : DataSource.Factory<Long, User>() {

    val userDataSourceLiveData = MutableLiveData<UsersDataSource>()

    override fun create(): DataSource<Long, User> {
        val userDataSource = UsersDataSource(githubService, compositeDisposable)
        userDataSourceLiveData.postValue(userDataSource)
        return userDataSource
    }
}
```
# **4.UserAdapter**
- Như mọi List thì phải có adapter để show data lên UI
```
class UserAdapter(
    private val retryCallback: () -> Unit) : PagedListAdapter<User, RecyclerView.ViewHolder>(
    UserDiffCallback) {

    private var isLoading = false

    override fun onCreateViewHolder(p0: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when (viewType) {
            R.layout.item_paging_user -> UserItemViewHolder.create(p0)
            R.layout.item_paging_loading -> NetworkStateItemViewHolder.create(p0)
            else -> throw IllegalAccessException("unknown view type")
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (getItemViewType(position)) {
            R.layout.item_paging_user -> (holder as? UserItemViewHolder)?.bindTo(getItem(position))
            R.layout.item_paging_loading -> (holder as? NetworkStateItemViewHolder)?.bindTo(
                isLoading)
        }
    }

    override fun getItemViewType(position: Int): Int {
        return if (isLoading && position == itemCount - 1) {
            R.layout.item_paging_loading
        } else {
            R.layout.item_paging_user
        }
    }

    override fun getItemCount(): Int {
        return super.getItemCount() + if (isLoading) 1 else 0
    }

    fun setLoading(isLoading: Boolean?) {
        isLoading?.let {
            currentList?.isNotEmpty()?.let {
                val previousState = this.isLoading
                this.isLoading = isLoading
                if (previousState != isLoading) {
                    if (!isLoading) {
                        notifyItemRemoved(super.getItemCount())
                    } else {
                        notifyItemInserted(super.getItemCount())
                    }
                }
            }

            notifyItemInserted(super.getItemCount())
        }
    }

    companion object {
        val UserDiffCallback = object : DiffUtil.ItemCallback<User>() {
            override fun areItemsTheSame(oldItem: User, newItem: User): Boolean {
                return oldItem.id == newItem.id
            }

            override fun areContentsTheSame(oldItem: User, newItem: User): Boolean {
                return oldItem == newItem
            }

        }
    }
}
```
# **5.ViewModel**
- `ViewModel` sẽ chịu tạo PagedList và cung cấp cho hoạt động để nó có thể thay đổi dữ liệu mỗi khi request từ server.
```
class PagingViewModel : ViewModel() {

    var userList: LiveData<PagedList<User>>

    private val compositeDisposable = CompositeDisposable()

    private val pageSize = 5

    private val sourceFactory: UsersDataSourceFactory

    init {
        sourceFactory = UsersDataSourceFactory(GithubService.getService(), compositeDisposable)
        val config = PagedList.Config.Builder()
            .setPageSize(pageSize)
            .setInitialLoadSizeHint(pageSize * 2)
            .setEnablePlaceholders(false)
            .build()
        userList = LivePagedListBuilder<Long, User>(sourceFactory, config).build()
    }

    fun getLoading() = Transformations.switchMap<UsersDataSource, Boolean>(
        sourceFactory.userDataSourceLiveData) { it.isLoading }

    fun getRefreshState() = Transformations.switchMap<UsersDataSource, Boolean>(
        sourceFactory.userDataSourceLiveData) { it.isRefresh }
        
    fun reset() {
        sourceFactory.userDataSourceLiveData.value?.invalidate()
    }
    
    override fun onCleared() {
        super.onCleared()
        compositeDisposable.dispose()
    }

}
```
# **6.Tạo RecyclerView**
```
    userAdapter = UserAdapter()
    usersRecyclerView.layoutManager = LinearLayoutManager(this, LinearLayoutManager.VERTICAL,
            false)
        usersRecyclerView.adapter = userAdapter 
```
# **7.Kết quả**
![](https://images.viblo.asia/6ded774d-3719-43ac-9d90-e42c61d1ebe1.gif)


- Toàn bộ source code của mình ở [đây](https://github.com/ThuanPx/Paging)
- Nguồn : [Android Developer](https://developer.android.com/topic/libraries/architecture/paging/) và [Medium](https://medium.com/@Ahmed.AbdElmeged/android-paging-library-with-rxjava-and-rest-api-e5c229fd70ba)