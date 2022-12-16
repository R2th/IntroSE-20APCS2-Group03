Hiện nay việc tải dữ liệu và hiển thị trên màn hình dưới dạng danh sách rất phổ  biến mà hầu như ứng dụng Android nào cũng có. Với nguồn dữ liệu đầu vào vừa và nhỏ, chúng ta sẽ tải hết một lượt rồi hiển thị ( thường với RecyclerView ). Tuy nhiên cách này sẽ không hiệu quả khi dữ liệu đầu vào lớn, hàng trăm đến hàng nghìn bản ghi. Để giải quyết bài toán này, chắc chắn chúng ta sẽ nghĩ đến việc tải dữ liệu theo từng phần, hay còn gọi là "loadmore" rồi mới hiển thị lên UI. Nhưng đó là với dạng dữ liệu từ api đã được phân trang sẵn. Vậy với dạng dữ liệu từ local như Room DataBase thì sao ? Bài viết này mình sẽ giới thiệu một thư viện hỗ trợ chúng ta khi thực hiện "loadmore" dữ liệu - **Paging** .

# Giới thiệu 
Xuất hiện trong Android jetpack mới được giới thiệu của Google, Paging là một thư viện hỗ trợ việc tải dữ liệu và hiển thị dữ liệu lên RecyclerView một cách tự động và "thông minh". Paging sẽ tự động phân trang dữ liệu đầu vào theo yêu cầu của chúng ta và hiển thị chúng.

**Áp dụng thư viện này chúng ta sẽ được lợi ích gì ?**

- Đầu tiên đương nhiên phải nói đến 1 công dụng thần thánh của các lib chắc chắn là giúp cho qúa trình code được rút ngắn. Thay vì phải thực hiện task " loadmore" như thông thường, phụ thuộc vào việc api có phân trang hay không,... thì với Paging những việc này sẽ được hỗ  trợ "tận răng".
- Hỗ trợ loadmore với dạng dữ liệu không phân trang sẵn ( từ backend hoặc local database ). 
- Khi load dữ liệu với Paging, lượng tài nguyên sử dụng tại thời điểm sẽ tốn ít hơn, chỉ tải dữ liệu có ý nghĩa với người dùng.

# Các component chính
![](https://images.viblo.asia/564379e9-cba3-4102-9a78-be0659c116a8.png)

Để sử dụng Paging chúng ta sẽ cần tương tác với các thành phần sau đây : 

- **DataSource** : Class phụ trách việc tải dữ liệu. Ví dụ app của chúng ta có thể lấy dữ liệu từ backend api hay local database
- **PagedList** : List wrapper, chứa trong nó là danh sách dữ liệu thực cần hiển thị. PagedList sẽ chứa dữ liệu từ DataSource tải xuống.
- **PagedListAdapter** : PagedList sau khi đã có dữ liệu thì sẽ được truyền cho adapter để hiển thị. PagedListAdapter được kế thừa từ ListAdapter. Để thực thi nó chúng ta cần sử dụng đến DiffUtil cho phép tự động update dữ liệu khi có sự thay đổi.

Ngoài ra chúng ta còn các thành phần khác cần lưu ý như sau : 
- **DataSource.Factory** : Factory được sử dụng ( bắt buộc ) để tạo ra đối tượng DataSource ở trên.
- **PagedList.Config**  : Phần cấu hình cho Paging. Chúng ta có thể cấu hình 1 số option như lần đầu tải bao nhiêu item, từ các lần tiếp theo sẽ tải bao nhiêu item mỗi lần,tải trước bao nhiêu item,... 
- **LivePagedListBuilder** : Builder dùng để build ra đối tượng LiveData cho PagedList. Builder này sẽ nhận tham số là **Config** và **Factory**


Đi sâu một chút về **DataSource**. Như đã nói đây là class đại diện cho nguồn dữ liệu của chúng ta.Mà đương nhiên việc thiết kế dữ liệu đầu vào là rất đa dạng, vì vậy Paging cho phép chúng ta sử dụng 1 số kiểu DataSource khác nhau tùy thuộc vào kiểu dữ liệu đầu vào hay là cách mà chúng ta muốn tải các dữ liệu đó.

* **PagekeyedDataSource**: Kế thừa class này khi bạn muốn tải dữ liệu theo dạng đã phân trang. Ở phần sau mình sẽ có demo nhỏ về phần source này 
* **ItemKeyedDataSource**: Một cách thức khác để tải dữ liệu mà không phải theo từng trang. Khi kế thừa class này, Paging sẽ dựa vào item cụ thể để tải dữ liệu.Ví dụ lần trước dữ liệu đã được tải đến item 10. Lần sau nó sẽ tự động tải tiếp từ item thứ 11.
* **PositionalDataSource**: Sử dụng source này nếu bạn đã có 1 data cố định từ size cho đến content của các item hay vị trí của nó trong danh sách.Việc cố định data như vậy cho phép Paging truy cập đến từng phần tử một cách chính xác nhất.
# Áp dụng
Vậy là bên trên mình đã giới thiệu cơ bản về Paging cũng như các thành phần của nó. Khá nhiều lý thuyết phải không :D Bây giờ mình sẽ hướng dẫn các bạn làm 1 ví dụ nho nhỏ về tải dữ liệu từ api với Paging để dễ hiểu hơn nhé. Ở đây mình sẽ dùng **PagekeyedDataSource**.

## Bước 1 : Cấu hình project 
Thêm Paging 

```
implementation 'android.arch.paging:runtime:1.0.0'
```

     
Ngoài ra mình còn sử dụng RxAndroid và Retrofit để tải dữ liêu  

```
implementation 'io.reactivex.rxjava2:rxjava:2.1.9'
implementation 'io.reactivex.rxjava2:rxandroid:2.0.2'
implementation "io.reactivex.rxjava2:rxkotlin:2.2.0"

implementation 'com.squareup.retrofit2:retrofit:2.4.0'
implementation 'com.squareup.retrofit2:converter-gson:2.4.0'
implementation 'com.squareup.retrofit2:adapter-rxjava2:2.4.0'
implementation 'com.squareup.okhttp3:logging-interceptor:3.9.1'
```

Sử dụng Dagger inject đối tượng cần thiết
```
implementation 'com.google.dagger:dagger:2.16'
implementation 'com.google.dagger:dagger-android:2.16'
implementation 'com.google.dagger:dagger-android-support:2.16'
kapt "com.google.dagger:dagger-compiler:2.16"
kapt "com.google.dagger:dagger-android-processor:2.16"
```

## Bước 2 : Tải dữ liệu từ api với Retrofit 
Interface Api : fun GET dữ liệu : 

```
@GET("/v2/everything")
    fun fetchFeed(@Query("q") q: String,
                  @Query("apiKey") apiKey: String,
                  @Query("page") page: Long,
                  @Query("pageSize") pageSize: Int) : Single<WrapperResponse>
```
WrapperResponse là object đại diện cho dữ liệu trả về. Phần này mình sẽ không đề cập chi tiết. Các bạn có thể tham khảo link api mình dùng nhé 
https://newsapi.org/v2/everything?q=movies&apiKey=079dac74a5f94ebdb990ecf61c8854b7&pageSize=20&page=3

Sau khi đã tạo fun lấy dữ liệu về, tiếp đến sẽ cấu hình Retrofit trong class NetWorkModule với Dagger : 

```
@Module
class NetworkModule {

    @Singleton
    @Provides
    fun provideFeedApi(retrofit: Retrofit): FeedApi = retrofit.create(FeedApi::class.java)

    @Singleton
    @Provides
    fun provideRetrofit(okHttpClient: OkHttpClient): Retrofit = Retrofit.Builder().baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .build()

    @Provides
    @Singleton
    fun provideOkHttpClient(): OkHttpClient =
            OkHttpClient.Builder()
                    .connectTimeout(CONNECTION_TIMEOUT, TimeUnit.SECONDS)
                    .writeTimeout(WRITE_TIMEOUT, TimeUnit.SECONDS)
                    .readTimeout(READ_TIMEOUT, TimeUnit.SECONDS).build()

    companion object {
        const val BASE_URL = "https://newsapi.org"
        const val CONNECTION_TIMEOUT = 10L
        const val READ_TIMEOUT = 10L
        const val WRITE_TIMEOUT = 10L
    }
}
```

ok, vậy là đến đây ta chỉ cần khai báo đối tượng APi và inject nó ở nơi chúng ta muốn dùng ( về cách sử dụng retrofit và dagger các bạn có thể tìm hiểu nếu chưa rõ nhé ^.^ )

## Bước 3 : Tạo DataSource 
Bước này sẽ bắt đầu là bước chính và quan trọng của chúng ta. Tạo class FeedRemotePagedSource kế thừa PageKeyedDataSource. Đây là dạng source cho phép load data theo page. Chúng ta sẽ override và thực thi 2 function chính là **loadInitial** : load dữ liệu ban đầu, và **loadAfter** để load dữ liệu các lần tiếp theo : 

```
override fun loadInitial(params: LoadInitialParams<Long>, callback: LoadInitialCallback<Long, Article>) {
      
        feedApi.fetchFeed("movie", "079dac74a5f94ebdb990ecf61c8854b7", 1, params.requestedLoadSize)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeBy(
                        onError = {
               
                        },
                        onSuccess = {
                            it.articles?.let { articles ->
                                callback.onResult(articles, null, 2L)
                            }
                        }
                )
    }

        override fun loadAfter(params: LoadParams<Long>, callback: LoadCallback<Long, Article>) {
        feedApi.fetchFeed("movie", "079dac74a5f94ebdb990ecf61c8854b7", params.key, params.requestedLoadSize)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeBy(
                        onError = {
                       
                        },
                        onSuccess = {
                            it.articles?.let { articles ->
                                callback.onResult(articles, params.key + 1)
                            }
                        }
                )
    }
```

Có 2 giá trị chúng ta cần lưu ý : 

**params.key**: Đây sẽ là giá trị của trang hiện tại được tải. Lần đầu tiên ta gán bằng 1, trong các lần tiếp ta sẽ tăng nó lên 1 đơn vị để tải các trang sau đó 

**params.requestedLoadSize** : giá trị này dùng cho fun loadInit, là số item ta muốn load trong lần đầu tiên. Giá trị này sẽ được thiết lập vào config mình đề cập ở bước sau.

## Bước 4 : Tạo Factory 
Factory là thành phần tạo ra thể hiện của DataSource 
```
class FeedRemotePagedFactory constructor(var api: FeedApi)
    : DataSource.Factory<Long, Article>() {

    val feedDataSource = MutableLiveData<FeedRemotePagedSource>()

    override fun create(): DataSource<Long, Article> = FeedRemotePagedSource(api).apply {
        feedDataSource.postValue(this)
    }
}
```

## Bước 5 : Tạo PagedListAdapter 
Adapter này kế thừa ListAdapter và sử dụng DiffUtil như mình nói ở trên.

```
class FeedAdapter : PagedListAdapter<Article, FeedHolder>(feedDiffCallback) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int)
            = FeedHolder.createHolderView(parent)

    override fun onBindViewHolder(holder: FeedHolder, position: Int) {
        getItem(position)?.let { holder.bindView(it) }
    }

    companion object {
        val feedDiffCallback = object : DiffUtil.ItemCallback<Article>() {
            override fun areItemsTheSame(oldItem: Article, newItem: Article): Boolean {
                return oldItem.url == newItem.url
            }

            override fun areContentsTheSame(oldItem: Article, newItem: Article): Boolean {
                return oldItem == newItem
            }
        }
    }
}
```

class Holder :
```

class FeedHolder(view: View) : RecyclerView.ViewHolder(view) {

    fun bindView(article: Article) {
        //Thực thi bind data lên Ui tại đây
    }

    companion object {
        fun createHolderView(parent: ViewGroup) = FeedHolder(
                LayoutInflater.from(parent.context).inflate(R.layout.item_feed, parent, false)
        )
    }
}
```

## Bước 6 : Hiển thị dữ liệu 
Vậy là xong các bước trên thì dữ liệu đã sẵn sàng. Bây giờ ta sẽ hiển thị nó lên giao diện. Để đơn giản cho bài viết, mình sẽ thực hiện đoạn code này luôn trong MainActivity. 
```

    @Inject
    lateinit var api: FeedApi

    private lateinit var articles: LiveData<PagedList<Article>>

    private lateinit var feedAdapter: FeedAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        AndroidInjection.inject(this)
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        feedAdapter = FeedAdapter()
        recycler_feed.adapter = this@MainActivity.feedAdapter
        
        //the config ( and the factory ), is used for Builder build PagedLiveData
        val pagedListConfig = PagedList.Config.Builder()
                .setEnablePlaceholders(true) 
                .setInitialLoadSizeHint(10) 
                .setPageSize(10).build() 

        articles = LivePagedListBuilder(FeedRemotePagedFactory(api), pagedListConfig).build()
        articles.observe(this, Observer<PagedList<Article>> {
            feedAdapter.submitList(it)
        })
    }
    }
    
```

Tạo ra biến LiveData<PagedList<Article>> để observe khi có dữ liệu thay đổi.
    
Ở đây chúng ta sẽ tạo config cho PagedList: 
* **setInitialLoadSizeHint**: đây là fun thiết lập giá trị là số item sẽ được tải trong lần đầu tiên.
* **setPageSize**: thiết lập số item của mỗi trang. Bắt buộc phải có settign này nhé ! 
* **setEnablePlaceholders**: để là true nếu muốn PagedList hiển thị cả những item null, không được load đầy đủ.
    
 -> Công việc cuối cùng chỉ cần obsever và submistList cho adapter để update Ui khi có dữ liệu mới. 
 -> Bây giờ mỗi khi người dùng kéo RecyclerView xuống gần cuối, Paging sẽ tự động load dữ liệu ở trang mới.
 
#  Kết luận 
Trên đây mình đã chia sẻ cho các bạn về Paging lib trong Android. Đây là lib mới mà mình thấy khá hay và hữu ích. Về các trường hợp dùng nó thì vẫn còn. Mình sẽ cập nhật trong các bài viết tiếp theo. Hy vọng mọi người đọc và đóng góp ý kiến giúp mình nhé :D