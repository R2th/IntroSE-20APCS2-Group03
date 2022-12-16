Trong năm 2018, chúng ta đã chứng kiến rất nhiều thay đổi lớn trong Thế Giới của Android. Đặc biệt là về Android Networking. Sự ra mắt của một phiên bản ổn định của `Kotlin Coroutines` đã thúc đẩy rất nhiều thay đổi từ `RxJava` sang `Kotlin Coroutines` để xử lý đa luồng trong Android.
Trong bài viết này, chúng ta sẽ nói về `Networking API` của Android có sử dụng [Retrofit2](https://square.github.io/retrofit/) và  [Kotlin Coroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html). Chúng ta sẽ thực hiện gọi các API của Trang [TheMoviesdb.org](https://developers.themoviedb.org/3) để tìm các bộ phim nổi tiếng.

### 1. Tóm tắt về Android Networking 
Tóm lại, `Android Networking` hay bất kỳ hệ thống `Networking` nào đi nữa thì đều hoạt động theo cách như sau : 

* **Request** — Tạo một  HTTP Request đến một URL (được gọi là `endpoint`) với các thuộc tính `headers` phù hợp và các `Authorisation Key` nếu được yêu cầu.
* **Response**  —  **Request** sẽ trả về **Response** có thể là lỗi hoặc thành công. Trong trường hợp thành công, **Response** sẽ chứa nội dung của endpoint  (nói chung chúng ở định dạng JSON hoặc XML hoặc text bình thường).
* **Parse & Store** —  Chúng ta sẽ phân tích `JSON-XML-Text` và lấy các giá trị cần thiết sau đó lưu trữ chúng trong class `Data` của chúng ta.

Và ở trong Android chúng ta có thể sử dụng các thư viện dưới đây để làm những công việc bên trên : 
* [**Okhttp**](http://square.github.io/okhttp/)  —  Để tạo một HTTP **Request** với tất cả các trường thích hợp.
* [**Retrofit**](https://square.github.io/retrofit/) —  Để tạo một **Request**.
* [**Moshi](https://github.com/square/moshi) / [GSON** ](https://github.com/google/gson)—Để phân tích dữ liệu.
* [**Kotlin Coroutines**](https://kotlinlang.org/docs/reference/coroutines-overview.html) — Để tạo một luồng kết nối `non-blocking` trên main thread.
* [**Picasso](http://square.github.io/picasso/) /[ Glide**](https://bumptech.github.io/glide/)— Để download một ảnh từ trên internet và hiển thị chúng ở ImageView.

Những thư viện bên trên chỉ là những thư viện phổ biến mà nhiều nhà phát triển sử dụng nhưng cũng còn có rất nhiều thư viện khác nữa.  Ngoài ra, hầu hết các thư viện này được phát triển bởi những con người người tuyệt vời tại [Square Inc](https://en.wikipedia.org/wiki/Square,_Inc.). Để biết thêm thông tin xin mời mọi người xem thêm các [dự án của họ](http://square.github.io/)
### 2. Bắt đầu nào !!!!!!
API của The Movie Database ([TMDB](https://www.themoviedb.org/))  chứa danh sách tất cả các phim phổ biến, sắp ra mắt, mới nhất, hiện đang chiếu phim và chương trình truyền hình. Đây là một trong những API phổ biến nhất để chúng ta có thể sử dụng trong bài viết này
`TMDB` API yêu cầu phải đăng ký  API key để có thể tạo các **Request** đến nó - Chúng ta sẽ làm các bước sau : 
* Tạo tài khoản ở `TMDB`
* [Làm theo các bước ở đây để tạo API Key](https://developers.themoviedb.org/3/getting-started/introduction)
#### Ẩn API key khỏi các hệ thống quán lý code (VCS) (Không bắt buộc nhưng là cần thiết)
Khi bạn có  API key, hãy thực hiện các bước sau để ẩn nó khỏi VCS :
* Add API key vào trong file `local.properties` ở root folder.
* Tạo quyền truy tập vào API Key trong `build.gradle`.
* Sau khi đó có thể lấy giá trị của API key thông qua `BuildConfig`.

```
//file local.properties
tmdb_api_key = "xxxxxxxxxxxxxxxxxxxxxxxxxx"

//file build.gradle (Module: app)
buildTypes.each {
        Properties properties = new Properties()
        properties.load(project.rootProject.file("local.properties").newDataInputStream())
        def tmdbApiKey = properties.getProperty("tmdb_api_key", "")

        it.buildConfigField 'String', "TMDB_API_KEY", tmdbApiKey
        
        it.resValue 'string', "api_key", tmdbApiKey

}

//Tại file Constants
var tmdbApiKey = BuildConfig.TMDB_API_KEY
```
### 3. Cài đặt Project 
Để thiết lập project, trước tiên chúng ta sẽ thêm tất cả các `dependencies` cần thiết vào trong `build.gradle` ở (Module:app)
```gradle 
// build.gradle(Module: app)
dependencies {

    def moshiVersion="1.8.0"
    def retrofit2_version = "2.5.0"
    def okhttp3_version = "3.12.0"
    def kotlinCoroutineVersion = "1.0.1"
    def picassoVersion = "2.71828"

     
    //Moshi
    implementation "com.squareup.moshi:moshi-kotlin:$moshiVersion"
    kapt "com.squareup.moshi:moshi-kotlin-codegen:$moshiVersion"

    //Retrofit2
    implementation "com.squareup.retrofit2:retrofit:$retrofit2_version"
    implementation "com.squareup.retrofit2:converter-moshi:$retrofit2_version"
    implementation "com.jakewharton.retrofit:retrofit2-kotlin-coroutines-adapter:0.9.2"

    //Okhttp3
    implementation "com.squareup.okhttp3:okhttp:$okhttp3_version"
    implementation 'com.squareup.okhttp3:logging-interceptor:3.11.0'
    
     //Picasso for Image Loading
    implementation ("com.squareup.picasso:picasso:$picassoVersion"){
        exclude group: "com.android.support"
    }

    //Kotlin Coroutines
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:$kotlinCoroutineVersion"
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:$kotlinCoroutineVersion"
}
```
#### Bây giờ chúng ta cùng nhau tạo ra TmdbAPI Services
``` Kotlin 
ApiFactory.kt
//ApiFactory to create TMDB Api
object Apifactory{
  
    //Creating Auth Interceptor to add api_key query in front of all the requests.
    private val authInterceptor = Interceptor {chain->
            val newUrl = chain.request().url()
                    .newBuilder()
                    .addQueryParameter("api_key", AppConstants.tmdbApiKey)
                    .build()

            val newRequest = chain.request()
                    .newBuilder()
                    .url(newUrl)
                    .build()

            chain.proceed(newRequest)
        }
  
   //OkhttpClient for building http request url
    private val tmdbClient = OkHttpClient().newBuilder()
                                .addInterceptor(authInterceptor)
                                .build()


  
    fun retrofit() : Retrofit = Retrofit.Builder()
                .client(tmdbClient)
                .baseUrl("https://api.themoviedb.org/3/")
                .addConverterFactory(MoshiConverterFactory.create())
                .addCallAdapterFactory(CoroutineCallAdapterFactory())
                .build()   

  
   val tmdbApi : TmdbApi = retrofit().create(TmdbApi::class.java)

}
```
Nào cùng nhìn lại xem chúng ta đang làm gì trong class `ApiFactory.kt`
* Đầu tiên, chúng ta đang tạo một `Network Interceptor` để thêm api_key trong tất cả các **request** dưới dạng **authInterceptor**.
* Sau đó, chúng ta đang tạo một `Networking client`  sử dụng OkHttp và thêm `authInterceptor`.
* Tiếp theo, chúng ta kết hợp mọi thứ lại với nhau để tạo `HTML Request Builder` bằng cách sử dụng `Retrofit`. Ở đây, chúng ta thêm `networking client` được tạo trước đó, `Base URL` và thêm bộ `converter` và `adapter factory`. 
Đầu tiên là `MoshiConverter` hỗ trợ phân tích cú pháp JSON và chuyển đổi. Response JSON thành các class dữ liệu Kotlin với việc phân tích cú pháp chọn lọc nếu được yêu cầu. Thứ 2 là `CoroutineCallAdapter`cái mà Retrofit `CallAdapter.Factory` sử dụng của `Kotlin Coroutines`.
* Cuối cùng, chúng ta chỉ cần tạo một giá trị `tmdbApi` của mình bằng cách chuyển tham chiếu của lớp `TmdbApi` (Điều này được tạo trong phần tiếp theo) cho class retrofit trước đó.
### Cùng nhau tìm hiểu về Tmdb API
Chúng ta sẽ nhận giá trị từ API `/movie/popular` của `TMDB`. `Reponse` sẽ trả về kết quả là một mảng của các đối tượng phim. Điểm này chúng ta cần phải quan tâm 
``` json
{
  "page": 1,
  "total_results": 19848,
  "total_pages": 993,
  "results": [
    {
      "vote_count": 2109,
      "id": 297802,
      "video": false,
      "vote_average": 6.9,
      "title": "Aquaman",
      "popularity": 497.334,
      "poster_path": "/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg",
      "original_language": "en",
      "original_title": "Aquaman",
      "genre_ids": [
        28,
        14,
        878,
        12
      ],
      "backdrop_path": "/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg",
      "adult": false,
      "overview": "Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.",
      "release_date": "2018-12-07"
    },
    {
      "vote_count": 625,
      "id": 424783,
      "video": false,
      "vote_average": 6.6,
      "title": "Bumblebee",
      "popularity": 316.098,
      "poster_path": "/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg",
      "original_language": "en",
      "original_title": "Bumblebee",
      "genre_ids": [
        28,
        12,
        878
      ],
      "backdrop_path": "/8bZ7guF94ZyCzi7MLHzXz6E5Lv8.jpg",
      "adult": false,
      "overview": "On the run in the year 1987, Bumblebee finds refuge in a junkyard in a small Californian beach town. Charlie, on the cusp of turning 18 and trying to find her place in the world, discovers Bumblebee, battle-scarred and broken.  When Charlie revives him, she quickly learns this is no ordinary yellow VW bug.",
      "release_date": "2018-12-15"
    }
  ]
}
```
Bây giờ chúng ta cùng tạo một data class `Movie` và một class `MovieResponse` với mỗi json data
``` Kotlin
// Data Model for TMDB Movie item
data class TmdbMovie(
    val id: Int,
    val vote_average: Double,
    val title: String,
    val overview: String,
    val adult: Boolean
)

// Data Model for the Response returned from the TMDB Api
data class TmdbMovieResponse(
    val results: List<TmdbMovie>
)

//A retrofit Network Interface for the Api
interface TmdbApi{
    @GET("movie/popular")
    fun getPopularMovie(): Deferred<Response<TmdbMovieResponse>>
}

```
#### TmdbApi interface
Sau khi tạo các lớp data, chúng ta tạo TmdbApi interface. Trong `interface` này, chúng ta thêm tất cả các lệnh gọi API cần thiết với bất kỳ tham số truy vấn nào nếu cần. Ví dụ: để nhận phim theo id, chúng ta sẽ thêm phương thức sau vào `interface` của chúng ta:
``` Kotlin
interface TmdbApi{
    @GET("movie/popular")
    fun getPopularMovies() : Deferred<Response<TmdbMovieResponse>>
    @GET("movie/{id}")      
    fun getMovieById(@Path("id") id:Int): Deferred<Response<Movie>>
}
```

### Cuối cùng chúng ta tạo Networking Call
 Cuối cùng chúng ta thực hiện một `Networking Call` để nhận dữ liệu cần thiết, chúng tôi có thể thực hiện trong `DataRepository`
 #### Sealed Result Class
Class này để xử lý `Response` . Nó có thể là Thành công với dữ liệu cần thiết hoặc Lỗi với một `Exception`.
``` Kotlin
sealed class Result<out T: Any> {
    data class Success<out T : Any>(val data: T) : Result<T>()
    data class Error(val exception: Exception) : Result<Nothing>()
}
```
#### Xây dựng BaseRepository để xử lý gọi Api an toàn hơn (safeApiCall)
``` Kotlin
open class BaseRepository{

    suspend fun <T : Any> safeApiCall(call: suspend () -> Response<T>, errorMessage: String): T? {

        val result : Result<T> = safeApiResult(call,errorMessage)
        var data : T? = null

        when(result) {
            is Result.Success ->
                data = result.data
            is Result.Error -> {
                Log.d("1.DataRepository", "$errorMessage & Exception - ${result.exception}")
            }
        }


        return data

    }

    private suspend fun <T: Any> safeApiResult(call: suspend ()-> Response<T>, errorMessage: String) : Result<T>{
        val response = call.invoke()
        if(response.isSuccessful) return Result.Success(response.body()!!)

        return Result.Error(IOException("Error Occurred during getting safe Api result, Custom ERROR - $errorMessage"))
    }
}
```
#### Xây dựng MovieRepository
``` Kotlin
class MovieRepository(private val api : TmdbApi) : BaseRepository() {
  
    fun getPopularMovies() : MutableList<TmdbMovie>?{
      
      //safeApiCall is defined in BaseRepository.kt
      val movieResponse = safeApiCall(
           call = {movieService.getPopularMovie().await()},
           errorMessage = "Error Fetching Popular Movies"
      )
      
      return movieResponse?.results.toMutableList();
    
    }

}
```
#### Tạo một ViewModel để lấy dữ liệu
``` Kotlin 
class TmdbViewModel : ViewModel(){
  
    private val parentJob = Job()

    private val coroutineContext: CoroutineContext
        get() = parentJob + Dispatchers.Default

    private val scope = CoroutineScope(coroutineContext)

    private val repository : MovieRepository = MovieRepository(ApiFactory.tmdbApi)
    

    val popularMoviesLiveData = MutableLiveData<MutableList<ParentShowList>>()

    fun fetchMovies(){
        scope.launch {
            val popularMovies = repository.getPopularMovies()
            popularMoviesLiveData.postValue(popularMovies)
        }
    }


    fun cancelAllRequests() = coroutineContext.cancel()

}
```
#### Sử dụng ViewModel trong Activity để Update Giao diện người dùng
``` Kotlin
class MovieActivity : AppCompatActivity(){
    
    private lateinit var tmdbViewModel: TmdbViewModel
  
     override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_movie)
       
        tmdbViewModel = ViewModelProviders.of(this).get(TmdbViewModel::class.java)
       
        tmdbViewModel.fetchMovies()
       
        tmdbViewModel.popularMovies.observe(this, Observer {
            
            //TODO - Your Update UI Logic
        })
       
     }
  
}
```
Trên đây chỉ là một số phần cơ bản nhưng đầy đủ các cấp độ từ Data, Repository, để View của Android.
[Để xem đầy đủ hơn mời các bạn vào đây](https://github.com/cong91/retrofitkotlindeferredtype)