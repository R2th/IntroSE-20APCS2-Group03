# Giới thiệu
* Gần đây mình mới được tiếp xúc với **Dagger** và khái niệm về **Dependency injection** trong project của mình. Có thể có một số bạn chưa nghe thấy từ khóa trên hay vẫn còn đang loay hoay để sử dụng nó thì đây là bài viết đơn giản để tiếp cận Dagger 2.
* Nếu bạn đang băn khoăn về [Dagger](https://google.github.io/dagger/) hay là [tại sao phải sử dụng Dagger](https://android.jlelse.eu/why-and-how-you-should-switch-to-dagger-2-12-ba32aac44300) và [cách sử dụng Dagger](http://www.vogella.com/tutorials/Dagger/article.html) như thế nào, có thể tham khảo những nguồn khác mình đã để ở trên để hiểu thêm về khái niệm của chúng.
* Chính vì có rất nhiều loại tài liệu khác nhau, nhiều nguồn khác nhau và nhiều cách sử dụng Dependency injection khác nhau nhưng đối với mình và một số bạn mới học thì việc sử dụng nó vào trong project thì cũng gặp một số vấn đề nhất định. Bài viết này sẽ giúp cho các bạn sử dụng Dagger một cách đơn giản hơn trong project của mình.
* Mình sử dụng code demo là [Kotlin](https://kotlinlang.org/) vì hiện tại develop Android đang rất được ưa chuộng về các tính năng mới của nó. Nếu bạn chưa từng sử dụng, mình tin rằng sau khi sử dụng bạn sẽ cảm thấy thích nó !
* Chúng ta sử dụng một ứng dụng nhỏ về MovieDB để cho các bạn một ví dụ sử dụng Dagger dễ hiểu nhất.


# Sử dụng
## Bước 1: Thêm những phụ thuộc cần thiết
* Thêm phụ thuộc support của kotlin vào project build.gradle
```
dependencies {
        classpath 'com.android.tools.build:gradle:3.4.0-alpha01'
        classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.2.71'
        
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
```
* Phụ thuộc cần thiết của Dagger trong app build.gradle
```
...
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-kapt'

android {
    compileSdkVersion 28
    defaultConfig {
        ...
    }
    ...
}

dependencies {
    ...
    implementation 'com.google.dagger:dagger-android:2.17'
    implementation 'com.google.dagger:dagger-android-support:2.17'
    kapt 'com.google.dagger:dagger-android-processor:2.17'

    /* Dagger2 - default dependency */
    kapt 'com.google.dagger:dagger-compiler:2.17'

    /* Add Kotlin support */
    implementation 'org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.2.71'
}
```
## Bước 2: Cài đặt thư viện Room
> **Room** là một thư viện nằm trong gói Android Jetpack mới được ra mắt gần đây trong Google I/O 2018. Nó là thư viện sinh ra nhằm cung cấp một lớp trừu tượng hóa trên nền của SQLite để thao tác dễ dàng hơn và mạnh mẽ hơn. Bạn có thể tìm hiểu thêm cách implement về Room ở [đây](https://android.jlelse.eu/5-steps-to-implement-room-persistence-library-in-android-47b10cd47b24).

### Tạo class Entity cho Room
Class này cho phép bạn tạo các trường có tên như nào thì bảng sau này bạn lưu vào cũng sẽ như vậy. Nó cũng hỗ trợ khóa ngoại và khóa chính để bạn tùy chỉnh.
```
@Entity(primaryKeys = ["id"])
data class MovieEntity(
        @SerializedName("id")
        val id: Long,

        @SerializedName(value = "header", alternate = ["title", "name"])
        val header: String,

        @SerializedName("poster_path")
        var posterPath: String?,

        @SerializedName(value = "description", alternate = ["overview", "synopsis"])
        var description: String?,

        @SerializedName("release_date")
        var releaseDate: String?,

        @SerializedName("runtime")
        var runTime: Long,
        var status: String?
)
```
### Tạo class Dao cho Room
Class này cho phép bạn viết những hàm trừu tượng để thêm, sửa, xóa dữ liệu có trong bảng bằng các hàm với các annotation có sẵn của Room.
```
@Dao
interface MovieDao {
    
    /* Method to insert the movies fetched from api
     * to room */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertMovies(movies: List<MovieEntity>): LongArray

    /* Method to fetch the movies stored locally */    
    @Query("SELECT * FROM `MovieEntity`")
    fun getMoviesByPage(): List<MovieEntity>
}
```

### Tạo database
Tạo database với model là class entity và một vài tham số có sẵn của database
```
@Database(entities = [MovieEntity::class], version = 1, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {

    abstract fun movieDao(): MovieDao
}
```

## Bước 3: Cấu hình Api Service
Chúng ta đã cấu hình database SQLite ở local ở bước trên, đến đây chúng ta cần phải cấu hình api để gọi dữ liệu về.
### Tạo Api response
```
data class MovieApiResponse(val page: Long,
                            val results: List<MovieEntity>,
                            val total_results: Long,
                            val total_pages: Long)
```
### Tạo Api service
```
interface MovieApiService {

    @GET("movie/popular?language=en-US&region=US&page=1")
    fun fetchMoviesByType(): Observable<MovieApiResponse>
}
```
## Bước 4: Cấu hình Repository
> Đây là class chịu trách nhiệm xử lý tất cả các hoạt động liên quan đến dữ liệu, cả online và offline đều được xử lý ở đây. Để hiểu hơn tại sao lại có class này, bạn nên tham khảo mẫu [Repository Pattern](https://medium.com/@rikvanv/android-repository-pattern-using-room-retrofit2-and-rxjava2-b48aedd173c). Thông thường mẫu này kết hợp với Rx để trả callback khi có dữ liệu nhận được từ Api hoặc Local.

```
/*
 * One of the first things we do in the Repository class is to make it a Singleton.
 * */
 * 
@Singleton
class MovieRepository(
        private val movieDao: MovieDao,
        private val movieApiService: MovieApiService
) {

    fun loadMoviesByType(): Observable<Resource<List<MovieEntity>>> {
        return object : NetworkBoundResource<List<MovieEntity>, MovieApiResponse>() {

            override fun saveCallResult(item: MovieApiResponse) {
                movieDao.insertMovies(item.results)
            }

            override fun shouldFetch(): Boolean {
                return true
            }

            override fun loadFromDb(): Flowable<List<MovieEntity>> {
                val movieEntities = movieDao.getMoviesByPage()
                return if (movieEntities == null || movieEntities.isEmpty()) {
                    Flowable.empty()
                } else Flowable.just(movieEntities)
            }

            override fun createCall(): Observable<Resource<MovieApiResponse>> {
                return movieApiService.fetchMoviesByType()
                        .flatMap { movieApiResponse ->
                            Observable.just(
                                    if (movieApiResponse == null) Resource.error("", MovieApiResponse(1, emptyList(), 0, 1))
                                    else Resource.success(movieApiResponse)
                            )
                        }
            }
        }.getAsObservable()
    }
}
```

## Bước 5: Cấu hình ViewModel
> Như đã nhắc đến ở trên, **Repository** chịu trách nhiệm tìm và nạp dữ liệu về, còn về **ViewModel** thì chịu trách nhiệm việc cập nhật giao diện người dùng đối với các dữ liệu này.

Như ta thấy ở đây, **ViewModel** cần sử dụng đến **MovieDao** và **MovieService** để có thể lấy được dữ liệu từ Api và lưu trữ vào local database. Chính vì vậy nhiệm vụ của chúng ta là inject 2 phụ thuộc kia vào đây để sử dụng thông qua Dagger.
```
/* 
 * We are injecting the MovieDao class
 * and the MovieApiService class to the ViewModel.
 * */
class MovieListViewModel @Inject constructor(
        movieDao: MovieDao,
        movieApiService: MovieApiService) : ViewModel() {
    
    /* You can see we are initialising the MovieRepository class here */
    private val movieRepository: MovieRepository = MovieRepository(movieDao, movieApiService)

    /* We are using LiveData to update the UI with the data changes.
     */
    private val moviesListLiveData = MutableLiveData<Resource<List<MovieEntity>>>()
    
    /*  
     * Method called by UI to fetch movies list
     * */
    fun loadMoreMovies() {
        movieRepository.loadMoviesByType()
                .subscribe { resource -> getMoviesLiveData().postValue(resource) }
    }

    /*  
     * LiveData observed by the UI
     * */    
    fun getMoviesLiveData() = moviesListLiveData
}
```

## Bước 6: Cấu hình Dagger
### Module
Trong Dagger, chúng ta sử dụng Module để chú thích cho các lớp cung cấp phụ thuộc. Mà trong ví dụ này, ta cần phải inject **MovieDao** và **MovieApiService** vào trong ViewModel, vậy nên chúng ta sẽ tạo ra 2 Module cung cấp các lớp đó tương ứng là **ApiModule** và **ApiModule**. Các phương thức được chú thích bằng `@Providers` để chỉ hàm đó cung cấp gì.

* **ApiModule** sẽ cung cấp các phương thức trả về những cài đặt đối với việc gọi Api có sẵn
```
@Module
class ApiModule {

    @Provides
    @Singleton
    internal fun provideGson(): Gson {
        val gsonBuilder = GsonBuilder()
        return gsonBuilder.create()
    }

    @Provides
    @Singleton
    internal fun provideCache(application: Application): Cache {
        val cacheSize = (10 * 1024 * 1024).toLong() // 10 MB
        val httpCacheDirectory = File(application.cacheDir, "http-cache")
        return Cache(httpCacheDirectory, cacheSize)
    }

    @Provides
    @Singleton
    internal fun provideOkhttpClient(cache: Cache): OkHttpClient {
        val logging = HttpLoggingInterceptor()
        logging.level = HttpLoggingInterceptor.Level.BODY

        val httpClient = OkHttpClient.Builder()
        httpClient.cache(cache)
        httpClient.addInterceptor(logging)
        httpClient.addNetworkInterceptor(RequestInterceptor())
        httpClient.connectTimeout(30, TimeUnit.SECONDS)
        httpClient.readTimeout(30, TimeUnit.SECONDS)
        return httpClient.build()
    }
    
    @Provides
    @Singleton
    internal fun provideRetrofit(gson: Gson, okHttpClient: OkHttpClient): Retrofit {
        return Retrofit.Builder()
            .addConverterFactory(GsonConverterFactory.create(gson))
            .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .baseUrl("https://api.themoviedb.org/3/")
            .client(okHttpClient)
            .build()
    }
    
    @Provides
    @Singleton
    internal fun provideMovieApiService(retrofit: Retrofit): MovieApiService {
        return retrofit.create(MovieApiService::class.java)
    }
}
```
* **DbModule** sẽ cung cấp những phụ thuộc cho việc tương tác với database local thông qua Room library
```
@Module
class DbModule {

    @Provides
    @Singleton
    internal fun provideDatabase(application: Application): AppDatabase {
        return Room.databaseBuilder(
            application, AppDatabase::class.java, "Entertainment.db")
            .allowMainThreadQueries().build()
    }

    @Provides
    @Singleton
    internal fun provideMovieDao(appDatabase: AppDatabase): MovieDao {
        return appDatabase.movieDao()
    }
}
```

### Xử lý ViewModel
Về cơ bản thì ta sẽ thêm 2 Module trên vào ViewModel, vậy nên cần phải tạo lớp **VIewModelFactory** để giúp bạn tự động tạo **ViewModel** trên Activity hoặc Fragment của bạn. 
* **ViewModelFactory** có một danh sách các provider để có thể taọ bất kì ViewModel nào bị ràng buộc. Fragment hay Activity chỉ cần inject vào factory và lấy ra ViewModel của chúng.
```
@Singleton
class ViewModelFactory @Inject
constructor(private val viewModels: MutableMap<Class<out ViewModel>, Provider<ViewModel>>) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        val creator = viewModels[modelClass]
            ?: viewModels.asIterable().firstOrNull { modelClass.isAssignableFrom(it.key) }?.value
            ?: throw IllegalArgumentException("unknown model class $modelClass")
        return try {
            creator.get() as T
        } catch (e: Exception) {
            throw RuntimeException(e)
        }
    }
}
```

* **ViewModelKey**  giúp cho việc ánh xạ các ViewModel của bạn cho phép ViewModelFactory có thể provider hoặc inject chúng.
```
@Target(AnnotationTarget.FUNCTION, 
        AnnotationTarget.PROPERTY_GETTER, 
        AnnotationTarget.PROPERTY_SETTER)
@MapKey
annotation class ViewModelKey(val value: KClass<out ViewModel>)
```

* Tiếp tục chúng ta tạo **ViewModelModule** để cung cấp các bản của ViewModel thông qua Dagger, được sử dụng bởi ViewModelFactory.
```
@Module
internal abstract class ViewModelModule {

    @Binds
    internal abstract fun bindViewModelFactory(factory: ViewModelFactory): ViewModelProvider.Factory

    @Binds
    @IntoMap
    @ViewModelKey(MovieListViewModel::class)
    protected abstract fun movieListViewModel(moviesListViewModel: MovieListViewModel): ViewModel
}
```


-----

Về cơ bản thì chúng ta có thể tóm tắt lại như sau:
* Chúng ta có thể sử dụng ViewModelModule để định nghĩa các ViewModel
* ViewModelKey cung cấp cho mỗi một ViewModel một key duy nhất
* Sau đó Activity hoặc Fragment sẽ sử dụng ViewModeFactory để inject ViewModel tương ứng với nó.

### Xử lý trong Activity
Chúng ta sử dụng thư viện **dagger-android** nên có thể sử dụng Android Injection. **ActivityModule** sẽ tạo ra Android Injection để các hoạt động được định nghĩa ở đây.
```
@Module
abstract class ActivityModule {

    @ContributesAndroidInjector()
    abstract fun contributeMainActivity(): MainActivity
}
```

### Xử lý AppComponent
Bất kì lớp nào có chú thích `@Component` sẽ là chỗ để xác định kết nối giữa các Module với các lớp  yêu cầu phụ thuộc. Chúng ta xác định giao diện `@Component.Builder` sẽ được gọi từ lớp Application để xuyên suốt trong ứng dụng. Điều này sẽ khiến cho lớp đó trở thành AppComponent và tồn tại suốt vòng đời của ứng dụng và được truy cập bất cứ khi nào cần thiết.
```
@Component(
        modules = [
            ApiModule::class,
            DbModule::class,
            ViewModelModule::class,
            ActivityModule::class,
            AndroidSupportInjectionModule::class]
)
@Singleton
interface AppComponent {

    @Component.Builder
    interface Builder {
        @BindsInstance
        fun application(application: Application): Builder

        fun build(): AppComponent
    }

    /*  
     * This is our custom Application class
     * */
    fun inject(appController: AppController)
}
```

### Cấu hình lớp Application
Cuối cùng của việc cài đặt Dagger, chúng ta sẽ custom một Application để lưu trữ **AppComponent** và giữ chúng trong suốt quá trình chạy của ứng dụng.
```
class AppController : Application(), HasActivityInjector {

    @Inject
    lateinit var dispatchingAndroidInjector: DispatchingAndroidInjector<Activity>

    override fun activityInjector(): DispatchingAndroidInjector<Activity>? {
        return dispatchingAndroidInjector
    }

    override fun onCreate() {
        super.onCreate()
        DaggerAppComponent.builder()
            .application(this)
            .build()
            .inject(this)
    }
}
```
> Đừng quên thêm Application này vào AndroidManifest.xml nhé !!!

## Bước 7: Cài đặt trên Activity
Bây giờ chúng ta tạo Activity và hoàn thành các bước trong này nhé, vậy là cũng đã hoàn thành rồi

```
class MainActivity : AppCompatActivity() {

    @Inject
    internal lateinit var viewModelFactory: ViewModelProvider.Factory

    private lateinit var binding: MainActivityBinding

    lateinit var moviesListViewModel: MovieListViewModel

    private lateinit var moviesListAdapter: MoviesListAdapter

    override fun onCreate(savedInstanceState: Bundle?) {

        AndroidInjection.inject(this)

        super.onCreate(savedInstanceState)
        initialiseView()
        initialiseViewModel()
    }

    private fun initialiseView() {
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)

        moviesListAdapter = MoviesListAdapter(this)
        binding.moviesList.layoutManager = LinearLayoutManager(applicationContext, LinearLayoutManager.HORIZONTAL, false)
        binding.moviesList.adapter = moviesListAdapter

        val startSnapHelper = PagerSnapHelper(
                object : RecyclerSnapItemListener {
                    override fun onItemSnap(position: Int) {
                        val movie = moviesListAdapter.getItem(position)
                        binding.overlayLayout.updateCurrentBackground(movie.getFormattedPosterPath())
                    }
                }
        )
        startSnapHelper.attachToRecyclerView(binding.moviesList)
    }

    private fun initialiseViewModel() {
        moviesListViewModel = ViewModelProviders.of(this, viewModelFactory).get(MovieListViewModel::class.java)
        moviesListViewModel.getMoviesLiveData().observe(this, Observer { resource ->
            if (resource!!.isLoading) {
                displayLoader()

            } else if (resource.data != null && !resource.data.isEmpty()) {
                updateMoviesList(resource.data)

            } else
                handleErrorResponse()
        })
        moviesListViewModel.loadMoreMovies()
    }


    private fun displayLoader() {
        binding.moviesList.visibility = View.GONE
        binding.loaderLayout.rootView.visibility = View.VISIBLE
    }

    private fun hideLoader() {
        binding.moviesList.visibility = View.VISIBLE
        binding.loaderLayout.rootView.visibility = View.GONE
    }

    private fun updateMoviesList(movies: List<MovieEntity>) {
        hideLoader()
        binding.emptyLayout.emptyContainer.visibility = View.GONE
        binding.moviesList.visibility = View.VISIBLE
        moviesListAdapter.setItems(movies)
    }

    private fun handleErrorResponse() {
        hideLoader()
        binding.moviesList.visibility = View.GONE
        binding.emptyLayout.emptyContainer.visibility = View.VISIBLE
    }
}
```



-----

Trên đây là bài dịch hướng dẫn sử dụng đơn giản về **Dagger** theo các bước và có code demo khá dễ hiểu. Hi vọng mọi người thích và sử dụng Dagger cho ứng dụng của mình.

Bài viết có nguồn từ https://android.jlelse.eu/7-steps-to-implement-dagger-2-in-android-dabc16715a3a