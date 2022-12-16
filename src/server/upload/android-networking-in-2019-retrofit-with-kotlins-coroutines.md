Chào các bạn, những ai đang đã và sẽ làm dev android hẳn đều biết Networking dường như là một vấn đề được sử dụng thường xuyên trong quá trình phát triển ứng dụng android. Hôm nay tôi sẽ nói về Networking API với việc sử dụng Retrofit2 và Kotlin Coroutines. 

![](https://images.viblo.asia/f6966e49-9a6a-4018-83ec-70736f19ad48.png)

- Android Networking in Nutshell: Trong một Nutshell android networking hay networking làm việc theo cách sau.

    *  Tạo một request HTTP đến một URL với các thuộc tính, với Authorisation Key nếu có.
    *  Response — một request sẽ nhận được một response, cái mà có thể là các giá trị error hay success. Trong trường hợp success, response sẽ có các nội dung mà 1 request cần (thường là các giá trị trả về có định dạng Json).
    *  Parse & Store: Chúng ta sẽ dựa vào các response trả về để lấy ra các giá trị mà có thể dùng được ở các class.
    
Trong Android chúng ta thường sử dụng:

* Okhttp 
* Retrofit 
* Moshi / GSON 
* Kotlin Coroutines 
* Picasso / Glide


**Hiding API key trong Version Control**

Bạn có một API Key, bạn làm theo các bước sau để ẩn trong VCS

* Thêm key của bạn vào trong file local.properties
* Bạn cho phép truy cập vào key từ build.gradle
* Sau đó key sẽ được lấy thông qua BuildConfig

```
//In local.properties
tmdb_api_key = "xxxxxxxxxxxxxxxxxxxxxxxxxx"

//In build.gradle (Module: app)
buildTypes.each {
        Properties properties = new Properties()
        properties.load(project.rootProject.file("local.properties").newDataInputStream())
        def tmdbApiKey = properties.getProperty("tmdb_api_key", "")

        it.buildConfigField 'String', "TMDB_API_KEY", tmdbApiKey
        
        it.resValue 'string', "api_key", tmdbApiKey

}

//In your Constants File
var tmdbApiKey = BuildConfig.TMDB_API_KEY
```

Tiếp theo chúng ta sẽ phải cài đặt cho project trong file build.gradle (Module: app):

```
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

**Bây giờ ta tạo TmdbAPI service**

```
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

Chúng ta hãy xem cái ApiFactory.kt đang làm ở đây:

* Đầu tiên, chúng ta tạo Network Interceptor để thêm api_key vào trong tất cả các request như authInterceptor.
* Sau đó chúng ta tạo networking client sử dụng OkHttp và thêm authInterceptor.
* Tiếp đến, chúng ta kết nối mọi thứ với nhau để tạo ra HTML Request builder và xử lý sử dụng Retrofit. Ở đây chúng ta thêm vào networking client, base URL, được tạo trước đó, và thêm một converter và adapter factory. 
* Đầu tiên là MoshiConverter cái mà hỗ trợ JSON parsing và chuyển đổi từ Response JSON thành Kotlin data class. Thứ 2 là CoroutineCallAdaptor cái mà là một Retrofit2 CallAdapter.Factory đối với Deferred của Kotlin coroutine .
* Cuối cùng chúng ta tạo một tmdbApi đơn giản với việc thông qua một tham chiếu của TmdbApi class(đây là cái được tạo ra trong phần tiếp) đến retrofit class được tạo ra trước đó.


**Exploring the Tmdb API**

Tiếp theo chúng ta lấy đối tượng /movie/popular trong mảng results:

```
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

bây giờ chúng ta sẽ tạo Movie data class và MovieResponse class tương ứng với file json.

```
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

**TmdbApi interface**

Sau khi tạo data classes, chúng ta tạo cái TmdbApi interface và thêm các API bắt buộc với các tham số:

```
interface TmdbApi{
    @GET("movie/popular")
    fun getPopularMovies() : Deferred<Response<TmdbMovieResponse>>
    @GET("movie/{id}")      
    fun getMovieById(@Path("id") id:Int): Deferred<Response<Movie>>
}
```

**Cuối cùng tạo ra một Networking Call**
Chúng ta có thể tạo ra một Networking Call trong DataRepository hoặc trong ViewModel hoặc trực tiếp trong Activity.

**Sealed Result Class**

Xử lý các kết quả trả về:

```
sealed class Result<out T: Any> {
    data class Success<out T : Any>(val data: T) : Result<T>()
    data class Error(val exception: Exception) : Result<Nothing>()
}
```

**Xây dựng BaseRepository để xử lý safeApiCall**

```
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

**Xây dựng MovieRepository**

```
class MovieRepository(private val api : TmdbApi) : BaseRepository() {
  
    fun getPopularMovies() : MutableList<TmdbMovie>?{
      
      //safeApiCall is defined in BaseRepository.kt (https://gist.github.com/navi25/67176730f5595b3f1fb5095062a92f15)
      val movieResponse = safeApiCall(
           call = {movieService.getPopularMovie().await()},
           errorMessage = "Error Fetching Popular Movies"
      )
      
      return movieResponse?.results.toMutableList();
    
    }

}
```

**Tạo View Model để lấy dữ liệu**

```
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

**Sử dụng ViewModel trong Activity để Update UI**

```
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

trên đây là các hướng dẫn cơ bản nhưng khá là đầy đủ để cho phép bạn có thể thực hiện việc call API.

Cảm ơn các bạn đã quan tâm, bài viết dc dịch từ [Android Networking in 2019 — Retrofit with Kotlin’s Coroutines.](https://android.jlelse.eu/android-networking-in-2019-retrofit-with-kotlins-coroutines-aefe82c4d777)