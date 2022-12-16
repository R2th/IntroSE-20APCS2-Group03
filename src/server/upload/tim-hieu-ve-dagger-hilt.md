# Mở đầu

Làm việc trong một dự án Android, chúng ta cần phải tích hợp nhiều dependencies khác nhau và để quản lý những dependencies này, chúng ta sử dụng một dependency injection framework như Dagger.

Nhưng khi làm việc với Dagger, mình thấy nó khá khó để học và lượng code sinh ra sau khi compile quá lớn :(

Giờ đây, với việc Dagger-Hilt phát hành như một phần của thư viện Jetpack, đó là cách được Google khuyến nghị sử dụng. Theo Dagger-Hilt, nó giúp chúng ta:

* Khiến cho code dagger trở nên dễ dàng và đơn giản cho các nhà phát triển.
* Cung cấp một bộ ràng buộc khác nhau cho các loại bản dựng khác nhau.
* Chỉ cần quan tâm đến nơi inject dependencies và phần còn lại của tất cả các code generations xảy ra bởi chính dagger bằng cách sử dụng các chú thích và do đó loại bỏ tất cả các mã soạn sẵn.

Trong bài này chúng ta sẽ tìm hiểu:
* Cơ bản về Dagger
* Setting up a new project
* Cấu trúc dự án
* Tích hợp Dagger-Hilt
* WorkManager với Dagger-Hilt
* Qualifiers

![](https://images.viblo.asia/658ba6c2-d27b-4ab7-916c-85291d41ff6e.png)

Nguồn: https://blog.mindorks.com/dagger-hilt-tutorial

# Cơ bản về Dagger

Trước khi bắt đầu với Dagger-Hilt, chúng ta cần hiểu những điều cơ bản về Dagger. Trong phần này, chúng tôi sẽ giúp bạn hiểu về Dagger và các thuật ngữ của nó.

Về cơ bản, để hiểu Dagger, chúng ta phải hiểu 4 phần chính

* Module
* Component
* Provides
* Inject

Để hiểu nó một cách cơ bản hơn, hãy nghĩ Module như một nhà cung cấp sự phụ thuộc và coi một hoạt động hoặc bất kỳ lớp nào khác như một người dùng. Bây giờ để cung cấp sự phụ thuộc từ nhà cung cấp đến người dùng, chúng ta có một cầu nối giữa họ, trong Dagger, Component hoạt động như một cầu nối cụ thể đó.

Bây giờ, một module là một class và chúng ta chú thích nó bằng @Module để Dagger hiểu nó là Module.

Component là một giao diện, được chú thích bằng @Component và có các modules trong đó. (Nhưng hiện tại, annotation này không cần thiết trong Dagger-Hilt)

Provides là annotation được sử dụng trong class Module để cung cấp sự phụ thuộc và, Inject là một annotation được sử dụng để xác định sự phụ thuộc bên trong người dùng.

![](https://images.viblo.asia/ee8fe70e-0cc3-4289-89f2-f8a46764a486.jpg)

Bạn nên biết về Dagger trước khi chuyển đến Dagger-Hilt.

Nếu bạn chưa quen với Dagger và muốn hiểu chi tiết những điều này, tôi khuyên bạn nên xem [video](https://www.youtube.com/watch?v=Grzqz-B3NWU&feature=emb_title) này.

# Thiết lập một dự án mới

## Thêm dependencies

Thêm các phần dependencies sau vào tệp build.gradle của ứng dụng,

```kotlin
implementation "androidx.recyclerview:recyclerview:{latest-version}"
implementation 'android.arch.lifecycle:extensions:{latest-version}'
implementation 'com.github.bumptech.glide:glide:{latest-version}'
implementation 'androidx.activity:activity-ktx:{latest-version}'
```

# Cấu trúc Project

Đối với dự án, chúng ta sẽ làm theo một phiên bản cơ bản của MVVM. Package của chúng ta trong dự án sẽ như sau:

![](https://images.viblo.asia/fb434306-40af-4980-aa01-8ade14fb0a88.png)

Chúng ta cần enum để đại diện cho UI State. Chúng ta sẽ tạo trong gói utils.
```kotlin
package com.mindorks.framework.mvvm.utils

enum class Status {
    SUCCESS,
    ERROR,
    LOADING
}
```
Chúng ta cần một lớp tiện ích sẽ chịu trách nhiệm truyền đạt trạng thái hiện tại của Network Call tới UI Layer. Chúng ta đang đặt tên đó là Resource. Vì vậy, hãy tạo class Resource bên trong cùng một package utils và thêm đoạn mã sau.
```kotlin
package com.mindorks.framework.mvvm.utils

data class Resource<out T>(val status: Status, val data: T?, val message: String?) {

    companion object {

        fun <T> success(data: T?): Resource<T> {
            return Resource(Status.SUCCESS, data, null)
        }

        fun <T> error(msg: String, data: T?): Resource<T> {
            return Resource(Status.ERROR, data, msg)
        }

        fun <T> loading(data: T?): Resource<T> {
            return Resource(Status.LOADING, data, null)
        }

    }

}
```

# Tích hợp Dagger-Hilt
Để thiết lập Dagger trong dự án, chúng ta sẽ thêm phần sau vào tệp build.gradle của ứng dụng,
```kotlin
implementation 'com.google.dagger:hilt-android:{latest-version}'
kapt 'com.google.dagger:hilt-android-compiler:{latest-version}'
```
Tiếp theo, chúng ta sẽ áp dụng plugin **dagger.hilt** ở trên đầu build.gradle của ứng dụng cũng như sau

```kotlin
apply plugin: 'dagger.hilt.android.plugin'
```
và cuối cùng, chúng ta sẽ thêm classpath vào phần sau của build.gradle của dự án.
```kotlin
classpath "com.google.dagger:hilt-android-gradle-plugin:{latest-version}"
```
Đây là thiết lập bắt buộc để bắt đầu sử dụng Dagger-Hilt trong dự án.

## Thiết lập Dagger-Hilt
### Step 1
Bây giờ, để bắt đầu làm việc với Dagger, chúng ta cần chú thích lớp ứng dụng với **@HiltAndroidApp**. Code sẽ trông giống như,
```kotilin
@HiltAndroidApp
class App : Application()
```
Nếu bạn định sử dụng Dagger-Hilt trong ứng dụng của mình, thì bước đề cập ở trên là bước bắt buộc. Nó tạo ra tất cả các lớp thành phần mà chúng ta phải làm thủ công khi sử dụng Dagger.

### Step 2
Bây giờ, chúng tôi sẽ thêm các dependencies cho Retrofit và Kotlin-Coroutines trong build.gradle của ứng dụng như,
```kotlin
// Networking
implementation "com.squareup.retrofit2:retrofit:{latest-version}"
implementation "com.squareup.retrofit2:converter-moshi:{latest-version}"
implementation "com.squareup.okhttp3:okhttp:{latest-version}"
implementation "com.squareup.okhttp3:logging-interceptor:{latest-version}"

// Coroutine
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:{latest-version}"
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:{latest-version}"
```
Bây giờ, trong dự án, những gì chúng ta sẽ làm là thực hiện một lệnh gọi API và hiển thị danh sách người dùng. Chúng tôi cũng sẽ sử dụng Kotlin-Coroutine để đa luồng. 

Bây giờ, chúng ta sẽ tạo các package **api**, **model**, **repository** bên trong data layer. Nó sẽ có các tệp như,

![](https://images.viblo.asia/517b700e-f1cc-4528-83d1-3c6c65f13170.png)
ApiService
```kotlin
interface ApiService {

    @GET("users")
    suspend fun getUsers(): Response<List<User>>

}
```
ApiHelper
```kotlin
interface ApiHelper {

    suspend fun getUsers(): Response<List<User>>
}
```
và cuối cùng, trong ApiHelperImpl, chúng ta sẽ đưa ApiService vào hàm khởi tạo bằng cách sử dụng @Inject và triển khai ApiHelper.
```kotlin
class ApiHelperImpl @Inject constructor(private val apiService: ApiService) : ApiHelper {

    override suspend fun getUsers(): Response<List<User>> = apiService.getUsers()

}
```
Ở đây, **@Inject** đang giúp chuyển dependency được yêu cầu bởi ApiHelperImpl trong chính phương thức khởi tạo.

class User data
```kotlin
data class User(
    @Json(name = "id")
    val id: Int = 0,
    @Json(name = "name")
    val name: String = "",
    @Json(name = "email")
    val email: String = "",
    @Json(name = "avatar")
    val avatar: String = ""
)
```
và cuối cùng, trong **MainRepository**, chúng ta sẽ chuyển ApiHelper vào phương thức khởi tạo của repository. **MainRepository** trông giống như,
```kotlin
class MainRepository @Inject constructor(private val apiHelper: ApiHelper) {
    suspend fun getUsers() =  apiHelper.getUsers()
}
```

Bây giờ, nếu bạn có thể thấy, chúng ta đã truyền **ApiHelper** và **ApiService**  vào trong **MainRepository** và **ApiHelperImpl** tương ứng. Vì vậy, để đưa mọi thứ vào hàm tạo, chúng ta cũng cần cung cấp cho nó bằng cách sử dụng chú thích **@Provide** trong Dagger.

### Step 3

Bây giờ, chúng ta sẽ tạo một package **di -> module** và bên trong nó, chúng ta sẽ tạo ApplicationModule. Như bạn có thể thấy, chúng ta không tạo **ApplicationComponent** vì chúng ta sẽ sử dụng công cụ do chính Dagger-Hilt cung cấp.

Chúng ta sẽ tạo một ApplicationModule của lớp và chú thích nó bằng **@Module**. Sử dụng chú thích này sẽ làm cho dagger hiểu rằng lớp này là một module.
```kotlin
@Module
class ApplicationModule { }
```
Bây giờ, chúng ta sẽ cần phải cắm module class này vào component cụ thể. Trong trường hợp này, chúng ta cần điều này ở cấp ứng dụng, vì vậy chúng tôi sẽ cài đặt nó trong ApplicationComponent như,
```kotlin
@Module
@InstallIn(ApplicationComponent::class)
class ApplicationModule {}
```

Tại đây, bạn có thể thấy rằng chúng ta đã sử dụng chú thích **@InstallIn** để cài đặt nó trong ApplicationComponent. ApplicationComponent được cung cấp bởi Dagger-Hilt.

Điều này có nghĩa là các phụ thuộc được cung cấp ở đây sẽ được sử dụng trên toàn ứng dụng. Hãy xem xét rằng chúng ta muốn sử dụng ở cấp độ activity mà chúng tôi cài đặt module,
```kotlin
@InstallIn(ActivityComponent::class)
```
Tương tự như ApplicationComponent / ActivityComponent, chúng ta có một loại thành phần khác như,

FragmentComponent cho Fragment, ServiceComponent cho Service, v.v.

### Step 4
Bây giờ, bên trong ApplicationModule, chúng ta sẽ cung cấp lần lượt tất cả các dependencies và code của lớp ApplicationModule trông giống như,
```kotlin
@Module
@InstallIn(ApplicationComponent::class)
class ApplicationModule {

    @Provides
    fun provideBaseUrl() = BuildConfig.BASE_URL

    @Provides
    @Singleton
    fun provideOkHttpClient() = if (BuildConfig.DEBUG) {
        val loggingInterceptor = HttpLoggingInterceptor()
        loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY)
        OkHttpClient.Builder()
            .addInterceptor(loggingInterceptor)
            .build()
    } else OkHttpClient
        .Builder()
        .build()


    @Provides
    @Singleton
    fun provideRetrofit(okHttpClient: OkHttpClient, BASE_URL: String): Retrofit =
        Retrofit.Builder()
            .addConverterFactory(MoshiConverterFactory.create())
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .build()

    @Provides
    @Singleton
    fun provideApiService(retrofit: Retrofit) = retrofit.create(ApiService::class.java)

    @Provides
    @Singleton
    fun provideApiHelper(apiHelper: ApiHelperImpl): ApiHelper = apiHelper

}
```
Ở đây, chúng ta đã cung cấp các dependencies bằng cách sử dụng chú thích **@Provide**, sẽ được truy cập trên ứng dụng.

**@Singleton** annotation giúp phiên bản được tạo và sử dụng một lần trên toàn ứng dụng.

> Similarly, like Singleton which stays till the application lifecycle, we also have @ActivityScoped, @FragmentScoped, etc in which dependencies are scoped till the lifecycle of Activity and Fragment.

Bây giờ, nếu bạn nhớ ở bước cuối cùng, chúng ta đã chuyển **ApiHelper** và **ApiService** lần lượt trong **MainRepository** và **ApiHelperImpl**, và để đưa vào thành công, chúng ta cần cung cấp hai dependencies này.

Trong ApplicationModule, hai hàm cuối cùng, tức là `provideApiService` và `provideApiHelper` đang cung cấp instance của `ApiService` và `ApiHelper`.

Ngoài ra, đối với **BASE_URL**, chúng ta sẽ thêm phần sau vào khối `defaultConfig` trong tệp build.gradle của ứng dụng,
```kotlin
buildConfigField 'String', 'BASE_URL', "\"https://5e510330f2c0d300147c034c.mockapi.io/\""
```
### Step 5

Bây giờ, sau khi mọi thứ đã được thiết lập, chúng ta cần sử dụng / đưa chúng vào các class trong Android. Trong trường hợp của chúng ta, chúng ta cần activity của mình để bắt đầu sử dụng chúng.

Để tạo bất kỳ lớp Android nào được hỗ trợ bởi Dagger-Hilt, chúng tôi sử dụng,
```kotlin
@AndroidEntryPoint
```
Chúng ta sẽ tạo một package **ui** khác và bên trong nó sẽ tạo một gói phụ khác có tên là **main** sẽ có MainActivity, MainViewModel và MainAdapter để hiển thị danh sách người dùng.

Chúng tôi sẽ thêm Annotation `AndroidEntryPoint` trong MainActivity như,
```kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {}
```
Ở đây, **@AndroidEntryPoint** có nghĩa là Dagger-Hilt bây giờ có thể đưa các dependencies vào class này.

**@AndroidEntryPoint** có thể được sử dụng trong,
1. Activity
2. Fragment
3. View
4. Service
5. BroadcastReceiver

>Hilt currently only supports activities that extend **ComponentActivity** and fragments that extend androidx library **Fragment**.

### Step 6
MainActivity lúc này
```kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    private val mainViewModel : MainViewModel by viewModels()
    private lateinit var adapter: MainAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setupUI()
        setupObserver()
    }

    private fun setupUI() {
        recyclerView.layoutManager = LinearLayoutManager(this)
        adapter = MainAdapter(arrayListOf())
        recyclerView.addItemDecoration(
            DividerItemDecoration(
                recyclerView.context,
                (recyclerView.layoutManager as LinearLayoutManager).orientation
            )
        )
        recyclerView.adapter = adapter
    }

    private fun setupObserver() {
        mainViewModel.users.observe(this, Observer {
            when (it.status) {
                Status.SUCCESS -> {
                    progressBar.visibility = View.GONE
                    it.data?.let { users -> renderList(users) }
                    recyclerView.visibility = View.VISIBLE
                }
                Status.LOADING -> {
                    progressBar.visibility = View.VISIBLE
                    recyclerView.visibility = View.GONE
                }
                Status.ERROR -> {
                    progressBar.visibility = View.GONE
                    Toast.makeText(this, it.message, Toast.LENGTH_LONG).show()
                }
            }
        })
    }

    private fun renderList(users: List<User>) {
        adapter.addData(users)
        adapter.notifyDataSetChanged()
    }

}
```

MainAdapter lúc này
```kotlin
class MainAdapter(
    private val users: ArrayList<User>
) : RecyclerView.Adapter<MainAdapter.DataViewHolder>() {

    class DataViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(user: User) {
            itemView.textViewUserName.text = user.name
            itemView.textViewUserEmail.text = user.email
            Glide.with(itemView.imageViewAvatar.context)
                .load(user.avatar)
                .into(itemView.imageViewAvatar)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
        DataViewHolder(
            LayoutInflater.from(parent.context).inflate(
                R.layout.item_layout, parent,
                false
            )
        )

    override fun getItemCount(): Int = users.size

    override fun onBindViewHolder(holder: DataViewHolder, position: Int) =
        holder.bind(users[position])

    fun addData(list: List<User>) {
        users.addAll(list)
    }
}
```
Tại đây, bạn có thể thấy **MainViewModel** đang được sử dụng để quản lý các thay đổi dữ liệu.

### Step 7
Ở đây, chúng ta muốn chuyển phần sau vào hàm tạo của ViewModel,
```kotlin
private val mainRepository: MainRepository
private val networkHelper: NetworkHelper
```
Để chuyền điều này, trước tiên chúng ta cần tạo **NetworkHelper** như,
```kotlin
@Singleton
class NetworkHelper @Inject constructor(@ApplicationContext private val context: Context) {

    fun isNetworkConnected(): Boolean {
        var result = false
        val connectivityManager =
            context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val networkCapabilities = connectivityManager.activeNetwork ?: return false
            val activeNetwork =
                connectivityManager.getNetworkCapabilities(networkCapabilities) ?: return false
            result = when {
                activeNetwork.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> true
                activeNetwork.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> true
                activeNetwork.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET) -> true
                else -> false
            }
        } else {
            connectivityManager.run {
                connectivityManager.activeNetworkInfo?.run {
                    result = when (type) {
                        ConnectivityManager.TYPE_WIFI -> true
                        ConnectivityManager.TYPE_MOBILE -> true
                        ConnectivityManager.TYPE_ETHERNET -> true
                        else -> false
                    }

                }
            }
        }

        return result
    }
}
```
Ở đây, bạn có thể thấy chúng ta đang chuyển context trong hàm tạo của NetworkHelper. Chúng ta cũng đang chú thích ngữ cảnh với **@ApplicationContext** ở đây có nghĩa là `context` chúng ta sử dụng sẽ là `context` của application.
>Note: If we want to apply context of the Activity, we can use @ActivityContext which has to be provided in the module.

### Step 8
Bây giờ, vì chúng ta phải truyền NetworkHelper và MainRepository trong MainViewModel. ViewModels không được Dagger-Hilt hỗ trợ trực tiếp và để làm việc với Dagger-Hilt trong ViewModel, chúng tôi sử dụng Jetpack Extensions.

Chúng ta cần thiết lập các dependencies trong gradle cho phần mở rộng Jetpack.

Hãy thêm phần sau vào build.gradle của ứng dụng như,
```kotlin
implementation 'androidx.hilt:hilt-lifecycle-viewmodel:{latest-version}'
kapt 'androidx.hilt:hilt-compiler:{latest-version}'
```

Và để hỗ trợ kapt, chúng ta sẽ thêm plugin hỗ trợ cho kapt như sau trong build.gradle của ứng dụng,
```kotlin
apply plugin: 'kotlin-kapt'
```

Bây giờ, để truyền qua NetworkHelper và MainRepository, chúng tôi sẽ không sử dụng ViewModelFactory ở đây mà sẽ chuyển trực tiếp cả hai và sử dụng chú thích @ViewModelInject như,
```kotlin
class MainViewModel @ViewModelInject constructor(
    private val mainRepository: MainRepository,
    private val networkHelper: NetworkHelper
) : ViewModel() {

}
```
Ở đây, annotation ViewModelInject sẽ chèn phần phụ thuộc bằng cách sử dụng hàm tạo và bây giờ chúng ta sẽ thực hiện các hoạt động bên trong MainViewModel như,
```kotlin
class MainViewModel @ViewModelInject constructor(
    private val mainRepository: MainRepository,
    private val networkHelper: NetworkHelper
) : ViewModel() {

    private val _users = MutableLiveData<Resource<List<User>>>()
    val users: LiveData<Resource<List<User>>>
        get() = _users

    init {
        fetchUsers()
    }

    private fun fetchUsers() {
        viewModelScope.launch {
            _users.postValue(Resource.loading(null))
            if (networkHelper.isNetworkConnected()) {
                mainRepository.getUsers().let {
                    if (it.isSuccessful) {
                        _users.postValue(Resource.success(it.body()))
                    } else _users.postValue(Resource.error(it.errorBody().toString(), null))
                }
            } else _users.postValue(Resource.error("No internet connection", null))
        }
    }
}
```
Ở đây, chúng ta đang fetching người dùng trong khối init và bên trong viewModelScope, chúng ta sẽ kiểm tra kết nối internet và nếu kết nối ổn thì chúng tôi thực hiện lệnh gọi API hoặc nếu không, chúng tôi đặt giá trị thành LiveData có lỗi.

LiveData của người dùng này sau đó được quan sát trong MainActivity để hiển thị các item trong recyclerView.

Nếu bạn thấy trong các bước trên, chúng ta nhận được phiên bản của ViewModel bằng cách sử dụng `byviewModels()`

>The ViewModel which is annotated by @ViewModelInject can only be reference by Views which are annotated by @AndroidEntryPoint

Bước cuối cùng, hãy thêm quyền sau vào tệp kê khai của bạn,

```kotlin
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
```
Bây giờ, chúng ta đã hoàn tất việc thiết lập dự án và nếu bạn chạy dự án, bạn sẽ thấy danh sách người dùng đang được điền trong Chế độ recyclerView.

Bằng cách này, chúng ta có thể triển khai chuôi dao găm trong Dự án Android của mình.

Bây giờ, chúng ta hãy tìm hiểu về những khả năng khác có thể đến trong quá trình Phát triển ứng dụng Android của chúng ta.

# WorkManger với Dagger-Hilt
Làm thế nào chúng ta có thể làm việc với Dagger-Hilt và WorkManager?

Nếu chúng ta đang sử dụng WorkManger, chúng at sử dụng @WorkerInject để đưa sự phụ thuộc vào phương thức khởi tạo bằng cách sử dụng JetpackExtensions.

Chúng tôi cũng cần thêm phần phụ thuộc sau cho WorkManager,

```kotlin
 implementation 'androidx.hilt:hilt-work:{latest-version}'
```
# Qualifiers
Hãy xem xét một ví dụ trong đó chúng ta có hai hàm trả về giá trị chuỗi. Nhưng trong khi cung cấp nó thông qua Dagger, làm thế nào dagger biết được lớp nào cần giá trị chuỗi nào vì cả hai đều thuộc cùng một kiểu.

Để giải quyết vấn đề này, chúng tôi sử dụng Qualifier in Dagger.

Hãy xem xét một ví dụ trong đó chúng tôi phải cung cấp hai chuỗi khác nhau, một cho một khóa API và một cho một số khởi tạo thư viện như,
```kotlin
@Provides
@Singleton
fun provideApiKey() = "My ApiKey"

@Provides
@Singleton
fun provideLibraryKey() = "My Library Key"
```
Ở đây, Dagger-Hilt sẽ không bao giờ xây dựng thành công vì dagger sẽ coi cả hai đều giống nhau vì cả hai đều có một chuỗi là một loại và sẽ gây ra lỗi là,

```kotlin
error: [Dagger/DuplicateBindings] java.lang.String is bound multiple times:
```
Bây giờ, để cung cấp các kiểu triển khai khác nhau của cùng một kiểu trả về, chúng ta sẽ cần Dagger-Hilt cung cấp nhiều liên kết bằng cách sử dụng các định tính.
> A qualifier is an annotation that you use to identify a specific binding for a type when that type has multiple bindings defined.

Bây giờ, để xác định Qualifier, chúng ta sẽ tạo một tên tệp evalfier.kt trong package **di** và cập nhật tệp dưới dạng,

```kotlin
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class ApiKey

@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class LibraryKey
```
Ở đây, chúng ta đã tạo hai chú thích khác nhau ApiKey và LibraryKey và cả hai đều được đánh dấu là **@Qualifier.**

Những chú thích này sẽ giúp chúng tôi phân biệt cả việc triển khai **ApiKey** và **LibraryKey**.

Bây giờ, trong ApplicationModule, chúng ta sẽ cập nhật cả hai providers cho khóa bằng cách đính kèm chú thích mà chúng tôi vừa tạo như,
```kotlin
@ApiKey
@Provides
@Singleton
fun provideApiKey():String = "My ApiKey"

@LibraryKey
@Provides
@Singleton
fun provideLibraryKey():String = "My Library Key"
```

Bây giờ, ở đây bạn có thể thấy chúng tôi đã đính kèm các định mức riêng lẻ cho từng nhà cung cấp Chuỗi và bây giờ Dagger-Hilt sẽ tạo mã nội bộ để cung cấp các giá trị chuỗi này.

Bây giờ, để chèn chúng riêng lẻ, chúng ta sẽ vào MainActivity và chèn các chuỗi như,
```kotlin
@ApiKey
@Inject
lateinit var apiKey:String

@LibraryKey
@Inject
lateinit var libraryKey:String
```
Và bây giờ, nếu chúng ta log chúng riêng lẻ, chúng ta sẽ nhận được,
```kotlin
/MainActivity: My ApiKey
/MainActivity: My Library Key
```
Đây là cách bạn có thể cung cấp nhiều phụ thuộc cùng loại bằng cách sử dụng bộ định tính.

Nếu bạn còn nhớ trong NetworkHelper, chúng ta đã sử dụng @ApplicationContext, đây cũng là một loại Qualifier nhưng được cung cấp bởi chính Dagger-Hilt.

Đây là cách bạn có thể làm việc với Dagger-Hilt, thư viện tiêm phụ thuộc mới được xây dựng trên Dagger trong dự án của bạn.

Chúc bạn thành công. Cảm ơn bạn đã đọc đến đây !