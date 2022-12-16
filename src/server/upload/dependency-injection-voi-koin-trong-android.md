# Dependency Injection là gì ?
Giả sử chúng ta có 2 Class là Class A và Class B, khi chúng ta sử dụng Class A tham chiếu với Class B với việc sử dụng các method của Class B, lúc này sinh ra quan hệ dependency giữa A và B. Để Class A có thể gọi method của B thì trước tiên nó phải tạo một instance của Class B.
Với những dự án nhỏ, chúng ta có thể thực hiện nó một cách thủ công, nhưng với những dự án lớn chúng ta nên tạo instance bằng cách tự động.

**Với việc nhờ một bên thứ ba thực hiện việc tạo ra các instance, sau đó sử dụng các instance đó trực tiếp thì được gọi là Dependency Injection.**
# Koin là gì ?
Koin là một dependency injection framework dành cho Kotlin developers và nó được viết bằng Kotlin thuần.
# Sử dụng Koin trong Android
Bài viết này mình sẽ hướng dẫn các bạn sử dụng Koin trong Android với  mô hình MVVM, sử dụng Retrofit.
### 1. Thêm dependencies vào file Gradle
```
repositories {
  jcenter()    
}
dependencies {

    // Retrofit
    compile "com.squareup.retrofit2:retrofit:2.6.0"
    compile "com.squareup.retrofit2:converter-gson:2.6.0"

    //Koin For Android
    compile "org.koin:koin-android:$2.1.3"
    compile "org.koin:koin-android-scope:$2.1.3"
    compile "org.koin:koin-android-viewmodel:$2.1.3"
    
    //Koin For AndroidX
    compile "org.koin:koin-android:2.1.3"
    compile "org.koin:koin-androidx-scope:$2.1.3"
    compile "org.koin:koin-androidx-viewmodel:$2.1.3"
}
```
### 2. Tạo data class
```
data class Book(
  val id: String,
  val name: String,
  val author: String
)
```
### 3. Tạo các Component
Tạo Interface Api Service
```
interface ApiService {

    @GET("books")
    fun getBooks(): Call<List<Book>>
}
```
Tạo Class Repository
```
class BookRepository(val apiService: ApiService) {
    fun getAllBooks() = apiService.getBooks()
}
```
Tạo ViewModel lấy Repository instance với param
```
class BookViewModel(private val bookRepository: BookRepository) : ViewModel(), Callback<List<Book>> {
    
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean>
        get() = _isLoading

    private val _books = MutableLiveData<List<Book>>()
    val books: LiveData<List<Book>>
        get() = _books

    init {
        fetchData()
    }

    private fun fetchData() {
        _isLoading.value = true
        bookRepository.getAllBooks().enqueue(this)
    }

    override fun onFailure(call: Call<List<Book>>, t: Throwable) {
        _isLoading.value = false
        // handle error
    }

    override fun onResponse(call: Call<List<Book>>, response: Response<List<Book>>) {
        if (response.isSuccessful) {
            _books.value = response.body()
        } else {
           // handle error
        }
        _isLoading.value = false
    }
}
```
### 4. Định nghĩa Koin Module
Một module là một component trong đó chúng ta sẽ khai báo tất cả các dependency được đẩy ( inject ) vào các component khác. Ví dụ như View Model sẽ được sử dụng ở Activity, ta phải khai báo một module và Koin sẽ tạo một instance của View Model.

Để tạo module, chúng ta sẽ gọi hàm **module** với cú pháp lambda. Trong đó có các method:

1. **viewModel** :  Khai báo một ViewModel component .
2. **get()** :  Lấy các instance đã được khai báo. Ví dụ như **BookRepository** cần instance của **ApiService** thì chúng ta chỉ cần truyền vào param `get()`. Nếu chúng ta chưa khai báo module cung cấp **ApiService** thì App sẽ bị crash.
3. **single**: Tạo một singleton, nó sẽ chỉ tạo một lần trong quá trình chạy App.
```

val viewModelModule = module {
    viewModel {
        BookViewModel(get())
    }
}

val repositoryModule = module {
    single {
        BookRepository(get())
    }
}

val apiModule = module {
    fun provideUseApi(retrofit: Retrofit): ApiService {
        return retrofit.create(ApiService::class.java)
    }

    single { provideUseApi(get()) }
}

val retrofitModule = module {

    fun provideGson(): Gson {
        return GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.IDENTITY).create()
    }

    fun provideHttpClient(): OkHttpClient {
        val okHttpClientBuilder = OkHttpClient.Builder()

        return okHttpClientBuilder.build()
    }

    fun provideRetrofit(factory: Gson, client: OkHttpClient): Retrofit {
        return Retrofit.Builder()
            .baseUrl("https://example.com/")
            .addConverterFactory(GsonConverterFactory.create(factory))
            .client(client)
            .build()
    }

    single { provideGson() }
    single { provideHttpClient() }
    single { provideRetrofit(get(), get()) }
}
```
### 5. Start Koin
Khi chúng ta có các modules rồi thì đến lúc tiến hành start chúng với Koin. Mở class Application, nếu chưa có thì bạn hãy tạo và đừng quên định nghĩa ở file manifest.xml. Chúng ta sẽ gọi hàm `startKoin()` :
```
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        startKoin {
            androidLogger()
            androidContext(this@MyApplication)
            modules(listOf(repositoryModule, viewModelModule, retrofitModule, apiModule))
        }
    }
}
```
### 6. Injecting Dependencies
`BookViewModel` sẽ được tạo với `BookRepository `instance. Để đưa `BookViewModel` vào Activity chúng ta sẽ sử dụng `by viewModel()` :
```
class MainActivity : AppCompatActivity() {

    private val bookViewModel: BookViewModel by viewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        bookViewModel.books.observe(this, Observer {
            // handle UI
        })

        bookViewModel.isLoading.observe(this, Observer {
            // handle UI
        })
    }
}
```
# Kết luận
Cảm ơn các bạn đã đọc bài viết của mình, nếu có gì sai sót mong các bạn góp ý với mình nhé!

Tài liệu tham khảo: 

[https://medium.com/swlh/dependency-injection-with-koin-6b6364dc8dba](https://medium.com/swlh/dependency-injection-with-koin-6b6364dc8dba)

[https://start.insert-koin.io/#/](https://start.insert-koin.io/#/)