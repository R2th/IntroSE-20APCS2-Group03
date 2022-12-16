Paging 3.0 là một bản cập nhật lớn so với các phiên bản trước của Paging Architecture Component của Android
![](https://miro.medium.com/max/1400/0*MZNV-03wERgc90U7)

Hầu hết tất cả các ứng dụng đều hiển thị một danh sách lớn dữ liệu cho người dùng, nhưng tại một thời điểm người dùng chỉ thấy một phần nhỏ dữ liệu trong ứng dụng của bạn, vì vậy việc fetch về tất cả dữ liệu từ mạng không phải là một giải pháp hiệu quả. Giải pháp là fetch từng phần nhỏ dữ liệu trong một thời điểm và ngay khi người dùng kéo đến gần cuối list dẽ fetch thêm dữ liệu. Đây gọi là Paging 
Với việc release Android 11 beta, Google cũng update thư viện Paging của họ. Với Paging 3 thực sự đơn giản và hiểu quả để implement vào ứng dụng Android của bạn 
## Paging 3.0 có gì mới?
Paging 3.0 khác biệt đáng kể so với các phiên bản trước. Một số tính năng mới của Paging 3.0:
- Support cho Kotlin coroutines, Flow như với LiveData và Rxjava
- Tích hợp hỗ trợ tính năng handling error, refresh và retry
- Tích hợp hỗ trợ cho việc loading state header, footer và list separators
- Trong memory caching, đảm bảo sử dụng hiệu quả tài nguyên hệ thống
- Ngăn ngừa việc call api trùng lặp
- Cải tiến đối với repository, hỗ trợ cancel và data source được đơn giản hóa.
##  Cài đặt
Ta chỉ cần add dependecy vào build.gradle

```kotlin
dependencies {
  def paging_version = "3.0.0-alpha03"
  implementation "androidx.paging:paging-runtime:$paging_version"
}
```

Nếu bạn muốn sử dụng thêm RxJava hay LiveData bạn cần add thêm 
```kotlin
// optional - RxJava2 support
implementation "androidx.paging:paging-rxjava2:$paging_version"

// optional - Guava ListenableFuture support
```

### Tạo Data Source 
- Không giống như các phiên bản Paging trước, ở Paging 3.0 chúng ta phải implement  PagingSource<Key, Value> để define data source. PagingSource gồm 2 parameter Key và Value. Key là một paramter định danh của data sẻ được tải, như số trang hay kiểu dữ liệu 
```kotlin 
class MoviePagingSource(
    val movieApiService: MovieApiService,
) : PagingSource<Int, Movie>() {
  
  override suspend fun load(params: LoadParams<Int>): LoadResult<Int, Movie> {
    try {
      // Start refresh at page 1 if undefined.
      val nextPage = params.key ?: 1
      val response = movieApiService.getPopularMovies(nextPage)
      
      return LoadResult.Page(
        data = response.movies,
        prevKey = if (nextPage == 1) null else nextPage - 1,
        nextKey = response.page + 1
      )
    } catch (e: Exception) {
        return LoadResult.Error(e)
    }
  }
}
```
- Lưu ý rằng hàm load() được overridden là một suspend function để chúng ta có thể thực hiện request api ở đây để lấy dữ liệu từ network hoặc trong database một cách dễ dàng 
- Object LoadParams giữa thông tin về cách thức fetch như Key và Page size 
- Nếu api được request thành công, sau đó sẽ trả về một response data được wrapped trong LoadResult.Page object cùng với key trước đó và tiếp theo 
- Nếu api request thất bại, sẽ trả về một exception được bọc trong LoadResult.Error


Hình bên dưới cho thấy chính xác cách hàm load() nhận các khóa từ lần fetch trước và cung cấp các khóa cho lần fetch tiếp theo.
![](https://miro.medium.com/max/744/1*2ZTAlZhZqSdd4Wz8OeWPJg.png)
### Lấy dữ liệu Paging trong ViewModel
Bây giờ ta sẽ tạo một instance của Pager trong viewmodel của chúng ta bằng việc tạo một stream data từ MoviePagineSource

```kotlin
val movies: Flow<PagingData<Movie>> = Pager(PagingConfig(pageSize = 20)) {
  MoviePagingSource(movieApiService)
}.flow
  .cachedIn(viewModelScope)
```
- Object Pager gọi method load() từ MoviePagingSource, cung cấp cho nó với LoadParams và return LoadResult
- Chúng ta cũng phải cung cấp các config như pagezie cho PagingConfig
- cacheIn(viewModelScope) lưu trữ dữ liệu từ MoviePagingSource để tồn tại với screen orentation change 

### Hiển thị trên Recycler View 
Đầu tiên chúng ta phải tạo một class RecyclerView Adapter extends từ PagingDataAdapter. Nó giống như một RecyclerView Adapter bình thường. PagingDataAdapter nhận hai tham số, tham số đầu tiên là kiểu dữ liệu (trong trường hợp cnày là Movie) và tham số thứ hai là RecyclerView.ViewHolder.
```kotlin
class MovieAdapter : 
    PagingDataAdapter<Movie, MovieAdapter.MovieViewHolder>(MovieComparator){

    override fun onBindViewHolder(holder: MovieViewHolder, position: Int) {
        holder.itemView.movie_title.text = getItem(position)!!.title
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MovieViewHolder {
        return MovieViewHolder(
            LayoutInflater.from(parent.context)
                .inflate(R.layout.movie_item, parent, false)
        )
    }

    class MovieViewHolder(view: View) : RecyclerView.ViewHolder(view)

    object MovieComparator : DiffUtil.ItemCallback<Movie>() {
        override fun areItemsTheSame(oldItem: Movie, newItem: Movie): Boolean {
            // Id is unique.
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: Movie, newItem: Movie): Boolean {
            return oldItem == newItem
        }
    }

}
```

Ở OnActivityCreated() trong fragment của bạn, ta có thể thu thập data từ PagingData và sau đó submit vào MovieAdapter
```kotlin
movieAdapter = MovieAdapter()

movie_recyclerView.apply {
    layoutManager = LinearLayoutManager(context)
    setHasFixedSize(true)
    adapter = movieAdapter
}

lifecycleOwner.lifecycleScope.launch {
    viewModel.movies.collectLatest {
        movieAdapter.submitData(it)
    }
}
```
RecyclerView hiện tại hiển thị dữ liệu từ DataSource và tự động loadmore khi mà chúng ta kéo xuống cuối list
### Hiển thị LoadState và Error Message 
- Paging 3.0 có hỗ trợ hiển thị trạng thái fetch và xử lý lỗi. Paging hiển thị trạng thái fetch để sử dụng trong UI thông qua đối tượng LoadState.
- Nếu LoadState là LoadState.NotLoading, thì không fetch chưa được hoạt động và cũng không có lỗi 
- Nếu LoadState là LoadState.Loading thì trạng thái hiện tại là đang fetch
- Nếu LoadState là LoadState.Error thì nó đang ở trạng thái Error 

Ta có thể lắng nghe trong method addLoadStateListener() ở MovieAdapter để lắng nghe LoadState được update

```kotlin 
movieAdapter.addLoadStateListener { loadState ->
                                   
    /**
        This code is taken from https://medium.com/@yash786agg/jetpack-paging-3-0-android-bae37a56b92d
    **/

    if (loadState.refresh is LoadState.Loading){
        progressBar.visibility = View.VISIBLE
    }
    else{
        progressBar.visibility = View.GONE

        // getting the error
        val error = when {
            loadState.prepend is LoadState.Error -> loadState.prepend as LoadState.Error
            loadState.append is LoadState.Error -> loadState.append as LoadState.Error
            loadState.refresh is LoadState.Error -> loadState.refresh as LoadState.Error
            else -> null
        }
        errorState?.let {
            Toast.makeText(this, it.error.message, Toast.LENGTH_LONG).show()
        }
    }
}
```

## Tổng kết 
Paging 3.0 là một bản cập nhật lớn so với các phiên bản trước và nó được viết lại hoàn toàn từ các phiên bản trước của thư viện Paging. Nó có hỗ trợ hoàn toàn cho Couroutines và các reative stream  như RxJava và LiveData. Nó cũng có chức năng xử lý lỗi có sẵn và hỗ trợ quản lý trạng thái tải giúp việc triển khai phân trang trong ứng dụng của bạn trở nên dễ dàng.

> Tham khảo https://proandroiddev.com/how-to-use-the-paging-3-library-in-android-5d128bb5b1d8