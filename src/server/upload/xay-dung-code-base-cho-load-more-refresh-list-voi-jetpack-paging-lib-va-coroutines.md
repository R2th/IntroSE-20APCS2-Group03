# Mở đầu
Việc load list dữ liệu có load more và refresh là một task rất hay gặp trong quá trình dev android, hôm nay mình giới thiệu với các bạn cách thực hiện nó với jetpack paging lib và tạo base để sử dụng lại cho các màn khác nhau.

# Tiến hành code base

## PagedListAdapter

Để paging lib có thể detect việc load more thì chúng ta cần sử dụng `PagedListAdapter`, các bạn có thể tạo một adapter hoặc extend từ `BasePagedListAdapter` bên dưới.

**Lưu ý: paging lib sử dụng hàm `getItem()` để detect việc load more nên các bạn cần gọi hàm này trong `onBindViewHolder()`, nếu các bạn sử dụng cách khác để get item, ví dụ `adapter.currentList.getPosition` thì paging lib sẽ không thể detect được việc load more list.**

```kotlin
abstract class BasePagedListAdapter<Item, ViewBinding : ViewDataBinding>(
    callBack: DiffUtil.ItemCallback<Item>
) : PagedListAdapter<Item, BaseViewHolder<ViewBinding>>(callBack) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<ViewBinding> {
        return BaseViewHolder(DataBindingUtil.inflate<ViewBinding>(
            LayoutInflater.from(parent.context),
            getLayoutRes(viewType),
            parent, false
        ).apply {
            bindFirstTime(this)
        })
    }

    override fun onBindViewHolder(holder: BaseViewHolder<ViewBinding>, position: Int) {
        val item: Item? = getItem(position)
        holder.binding.setVariable(BR.item, item)
        if (item != null) {
            bindView(holder.binding, item, position)
        }
        holder.binding.executePendingBindings()
    }

    /**
     * get layout res based on view type
     */
    protected abstract fun getLayoutRes(viewType: Int): Int

    /**
     * bind first time
     * use for set item onClickListener, something only set one time
     */
    protected open fun bindFirstTime(binding: ViewBinding) {}

    /**
     * bind view
     */
    protected open fun bindView(binding: ViewBinding, item: Item, position: Int) {}
}
```
https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/base/BaseListAdapter.kt#L80

## BasePageKeyedDataSource

Paging lib hiện tại hỗ trợ 3 loại data srouce khác nhau, nhưng `PageKeyedDataSource` là loại hay được dùng nhất nên mình sẽ làm ví dụ cho loại này, 2 loại còn lại các bạn có thể làm tương tự nhé.

Hiện tại `PageKeyedDataSource` có 3 hàm `loadInitial()`, `loadBefore()`, `loadAfter()` để định nghĩa cho các trạng thái load dữ liệu theo page nhưng thực tế mình thấy là chúng ta hoàn toàn chỉ cần một hàm load nên mình đã code gọn lại và đưa về 1 hàm `abstract loadDataSource()` duy nhất.

**Lưu ý:  Theo như mình được biết thì paging 3 (hiện đang là preview) đã gộp các hàm trên lại thành 1, thực sự rất là hơp lý. Mình sẽ giới thiệu tới các bạn sau khi nó đã ổn định hơn.**

```kotlin
/**
 * page keyed data source uses page number to request data
 */
abstract class BasePageKeyedDataSource<Item>(
    private val viewModel: BasePagedRefreshViewModel<Item>
) : PageKeyedDataSource<Int, Item>() {

    /**
     * load first page
     */
    override fun loadInitial(
        params: LoadInitialParams<Int>,
        callback: LoadInitialCallback<Int, Item>
    ) {
        viewModel.viewModelScope.launch {
            try {
                viewModel.showLoading()
                val itemList = loadDataSource(loadInitialParams = params)
                viewModel.isEmptyList.value = itemList.isEmpty()
                callback.onResult(
                    itemList,
                    null,
                    // last page
                    if (itemList.size < viewModel.pageSize) null
                    // load next page
                    else viewModel.firstPage + 1
                )
            } catch (e: Throwable) {
                viewModel.onError(e)
            } finally {
                viewModel.hideLoadMoreRefresh()
            }
        }
    }

    /**
     * load previous page
     */
    override fun loadBefore(params: LoadParams<Int>, callback: LoadCallback<Int, Item>) {
        viewModel.viewModelScope.launch {
            try {
                val itemList = loadDataSource(loadParams = params)
                callback.onResult(
                    itemList,
                    // is first page
                    if (params.key == viewModel.firstPage) null
                    else (params.key - 1)
                )
            } catch (e: Throwable) {
                viewModel.onError(e)
            } finally {
                viewModel.hideLoadMoreRefresh()
            }
        }
    }

    /**
     * load next page
     */
    override fun loadAfter(params: LoadParams<Int>, callback: LoadCallback<Int, Item>) {
        // disable load more when loading or refresh
        if (viewModel.isLoading.value == true || viewModel.isRefresh.value == true) return

        viewModel.viewModelScope.launch {
            try {
                viewModel.isLoadMore.value = true
                val itemList = loadDataSource(loadParams = params)
                callback.onResult(
                    itemList,
                    // last page
                    if (itemList.size < viewModel.pageSize) null
                    // load next page
                    else (params.key + 1)
                )
            } catch (e: Throwable) {
                viewModel.onError(e)
            } finally {
                viewModel.hideLoadMoreRefresh()
            }
        }
    }

    /**
     * load data
     */
    abstract suspend fun loadDataSource(
        loadInitialParams: LoadInitialParams<Int>? = null,
        loadParams: LoadParams<Int>? = null
    ): List<Item>
}
```
https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/base/BasePagedRefreshViewModel.kt#L123

## BasePagedRefreshViewModel

Sau khi có data source thì chúng ta sẽ định nghĩa viewmodel, viewmodel sẽ có các phần logic cơ bản của load more, refresh, config thông số cho `PageKeyedDataSource`  và một hàm `loadData()` để get dữ liệu

```kotlin
abstract class BasePagedRefreshViewModel<Item> : BaseViewModel() {

    // first page number of item list
    open val firstPage = Constants.DEFAULT_FIRST_PAGE

    // number visible threshold
    open val prefetchDistance = Constants.DEFAULT_NUM_VISIBLE_THRESHOLD

    // number item per page
    open val pageSize = Constants.DEFAULT_ITEM_PER_PAGE

    // refresh flag
    val isRefresh = MutableLiveData(false)

    // load more flag
    val isLoadMore = MutableLiveData(false)

    // enable refresh when not loading or not load more
    val enableRefresh = MediatorLiveData<Boolean>().apply {
        value = true
        addSource(isLoading) {
            value = !(isLoading.value == true || isLoadMore.value == true)
        }
        addSource(isLoadMore) {
            value = !(isLoading.value == true || isLoadMore.value == true)
        }
    }

    // data source
    private var dataSource: BasePageKeyedDataSource<Item>? = null

    // paged list config
    private val pagedListConfig: PagedList.Config by lazy {
        PagedList.Config.Builder()
            .setEnablePlaceholders(false)
            .setInitialLoadSizeHint(2 * pageSize)
            .setPageSize(pageSize)
            .setPrefetchDistance(prefetchDistance)
            .build()
    }

    // item list
    val itemList: LiveData<PagedList<Item>> by lazy {
        LivePagedListBuilder(
            object : DataSource.Factory<Int, Item>() {
                override fun create(): DataSource<Int, Item> {
                    return createDataSource()
                }
            }, pagedListConfig
        ).build()
    }

    // empty list flag
    val isEmptyList = MutableLiveData(false)

    /**
     * refresh data
     */
    fun doRefresh() {
        isRefresh.value = true
        dataSource?.invalidate()
    }

    /**
     * create page keyed data source
     */
    open fun createDataSource(): BasePageKeyedDataSource<Item> {
        return object : BasePageKeyedDataSource<Item>(viewModel = this) {
            override suspend fun loadDataSource(
                loadInitialParams: LoadInitialParams<Int>?,
                loadParams: LoadParams<Int>?
            ): List<Item> {
                return loadData(loadInitialParams, loadParams)
            }
        }.apply {
            dataSource = this
        }
    }

    /**
     * load and return item list from server
     */
    abstract suspend fun loadData(
        loadInitialParams: PageKeyedDataSource.LoadInitialParams<Int>?,
        loadParams: PageKeyedDataSource.LoadParams<Int>?
    ): List<Item>

    /**
     * handler error
     */
    override suspend fun onError(throwable: Throwable) {
        super.onError(throwable)
        // reset load
        hideLoadMoreRefresh()
    }

    /**
     * hide loading, load more and refresh indicator
     */
    fun hideLoadMoreRefresh() {
        hideLoading()
        isRefresh.value = false
        isLoadMore.value = false
    }
}
```
https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/base/BasePagedRefreshViewModel.kt#L14

## BasePagedRefreshFragment

Base code fragment cho màn hình sử dụng BasePagedRefreshViewModel để chúng ta có thể dùng lại cho các màn hình khác nhau mà có chùng cơ chế.

```kotlin
abstract class BasePagedRefreshFragment<ViewBinding : ViewDataBinding, ViewModel : BasePagedRefreshViewModel<Item>, Item> :
    BaseFragment<ViewBinding, ViewModel>() {

    override val layoutId: Int = R.layout.fragment_paged_refresh

    abstract val pagedListAdapter: BasePagedListAdapter<Item, out ViewDataBinding>

    open fun getLayoutManager(): RecyclerView.LayoutManager =
        LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        setupPagedRefresh()
    }

    /**
     * setup default paged refresh
     */
    open fun setupPagedRefresh() {
        refresh_layout?.setOnRefreshListener {
            viewModel.doRefresh()
        }
        recycler_view?.layoutManager = getLayoutManager()
        recycler_view?.adapter = pagedListAdapter
        viewModel.apply {
            itemList.observe(viewLifecycleOwner, Observer {
                pagedListAdapter.submitList(it)
            })
        }
    }

    override fun handleLoading(isLoading: Boolean) {
        // use progress bar
    }
}
```
https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/base/BasePagedRefreshFragment.kt#L11

# Sử dụng

## PagedMovieAdapter

```kotlin
class PagedMovieAdapter(
    val itemClickListener: (Movie) -> Unit = {}
) : BasePagedListAdapter<Movie, ItemMovieBinding>(object : DiffUtil.ItemCallback<Movie>() {
    override fun areItemsTheSame(oldItem: Movie, newItem: Movie): Boolean {
        return oldItem.id == newItem.id
    }

    override fun areContentsTheSame(oldItem: Movie, newItem: Movie): Boolean {
        return oldItem == newItem
    }
}) {

    override fun getLayoutRes(viewType: Int): Int {
        return R.layout.item_movie
    }

    override fun bindFirstTime(binding: ItemMovieBinding) {
        binding.apply {
            root.setSingleClick {
                item?.apply {
                    itemClickListener(this)
                }
            }
        }
    }
}
```
https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/screen/paged/PagedMovieAdapter.kt#L10

## PagedMovieFragment
```kotlin
class PagedMovieFragment :
    BasePagedRefreshFragment<FragmentPagedRefreshBinding, PagedMovieViewModel, Movie>() {

    override val viewModel: PagedMovieViewModel by viewModel()

    override val pagedListAdapter by lazy {
        PagedMovieAdapter(
            itemClickListener = { toMovieDetail(it) }
        )
    }

    override fun getLayoutManager() = GridLayoutManager(context, 2)

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        container?.setBackgroundColor(Color.BLACK)
    }

    private fun toMovieDetail(movie: Movie) {
        findNavController().navigate(PagedMovieFragmentDirections.toGraphMovieDetail(movie))
    }
}
```
https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/screen/paged/PagedMovieFragment.kt#L13

## PagedMovieViewModel

```kotlin
class PagedMovieViewModel(
    private val userRepository: UserRepository
) : BasePagedRefreshViewModel<Movie>() {

    override suspend fun loadData(
        loadInitialParams: PageKeyedDataSource.LoadInitialParams<Int>?,
        loadParams: PageKeyedDataSource.LoadParams<Int>?
    ): List<Movie> {
        val apiParams = HashMap<String, String>()
        apiParams[ApiParams.PAGE] = (loadParams?.key ?: firstPage).toString()

        return userRepository.getMovieList(apiParams).results?.toList() ?: listOf()
    }

    override val pageSize: Int = 20

}
```
https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/screen/paged/PagedMovieViewModel.kt

# Kết

Bạn thấy đấy, với việc sử dụng base code thì giờ đây việc làm những màn hình có load more refresh trở nên nhanh chóng và tiện lợi hơn rất nhiều, chúng ta dễ dàng sử dụng cho các màn khác nhau có cấu trúc tương tự.

Các bạn có thể tham khảo full source code ở đây: https://github.com/dangquanuet/The-Movie-DB-Kotlin

Hẹn gặp lại các bạn trong các bài tiếp theo :).