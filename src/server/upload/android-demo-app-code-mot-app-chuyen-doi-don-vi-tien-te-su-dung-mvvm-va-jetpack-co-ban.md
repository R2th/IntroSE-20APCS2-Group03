Trong bài viết này mình sẽ cùng viết một app chuyển đổi đơn vị tiền tệ, sử dụng những công cụ trong gói `JetPack` và sử dụng mô hình `MVVM` nhé ! Cụ thể sẽ gồm có : <br>
* Kotlin
* MVVM (Model View ViewModel Pattern)
* Hilt (For Dependency Injection)
* Retrofit
* Live Data
* Data Binding
* Kotlin Flow
* Kotlin Coroutine.... <br>

### 1. Add thư viện cho project: <br>

*  Thêm đoạn code này vào build.gradle (Module App) , <Br>

```kotlin
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-kapt'
apply plugin: 'dagger.hilt.android.plugin'


android {
    compileSdkVersion 30
    buildToolsVersion "30.0.2"

    defaultConfig {
        applicationId "hieu.vn.converter"
        minSdkVersion 22
        targetSdkVersion 30
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildFeatures {
        viewBinding true
        dataBinding true
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = '1.8'
    }
}

dependencies {

    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.2'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'com.google.android.material:material:1.3.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
    testImplementation 'junit:junit:4.+'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

    def activity_version = "1.1.0"
    implementation "androidx.activity:activity-ktx:$activity_version"
    implementation "androidx.fragment:fragment-ktx:$activity_version"

    //Material Spinner
    implementation 'com.jaredrummler:material-spinner:1.3.1'

    //ViewBinding
    implementation 'com.android.databinding:viewbinding:4.1.1'

    //Caroutines
    def couritines_version = "1.3.9"
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:$couritines_version"
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:$couritines_version"
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-play-services:$couritines_version"

    //Retrofit
    def retrofit_version = "2.9.0"
    implementation "com.squareup.retrofit2:retrofit:$retrofit_version"
    implementation "com.squareup.retrofit2:converter-gson:$retrofit_version"
    implementation "com.squareup.okhttp3:logging-interceptor:4.9.0"
    implementation "com.squareup.retrofit2:converter-scalars:$retrofit_version"

    //material design
    implementation 'com.google.android.material:material:1.2.1'

    //Glide
    def glide_version = "4.11.0"
    implementation "com.github.bumptech.glide:glide:$glide_version"
    kapt 'com.github.bumptech.glide:compiler:4.4.0'

    //Dexter for permission
    implementation 'com.karumi:dexter:6.2.1'

    // LifeCycle
    def lifecycle_version = "2.2.0"

    // ViewModel
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:$lifecycle_version"
    implementation "androidx.lifecycle:lifecycle-runtime-ktx:$lifecycle_version"


    // LiveData
    implementation "androidx.lifecycle:lifecycle-livedata-ktx:$lifecycle_version"

    //Room
    def room_version = "2.3.0-alpha02"
    //noinspection GradleDependency
    implementation "androidx.room:room-runtime:$room_version"
    kapt "androidx.room:room-compiler:$room_version"
    //noinspection GradleDependency
    implementation "androidx.room:room-ktx:$room_version"

    //Get currency code
    implementation 'com.neovisionaries:nv-i18n:1.27'

    //Hilt for di
    def hilt_version = "2.28-alpha"
    implementation "com.google.dagger:hilt-android:$hilt_version"
    kapt "com.google.dagger:hilt-android-compiler:$hilt_version"

    // Hilt ViewModel extension
    def hilt_jetpack_version = "1.0.0-alpha01"
    //noinspection GradleDependency
    implementation "androidx.hilt:hilt-lifecycle-viewmodel:$hilt_jetpack_version"
    kapt "androidx.hilt:hilt-compiler:$hilt_jetpack_version"

}

```

### 2.     Tạo package helper ( gồm những tiện ích mà chúng ta sẽ sử dụng trong project):<br>
* Trong `helper` ta thêm object là `Utility` (chứa các methord : ẩn bàn phím, kiểm tra kết nối mạng và set app full màn hình) <br>
   
~~~Kotlin
    object Utility {

    //hide keyboard
    fun hideKeyboard(activity: Activity) {
        val imm: InputMethodManager =
            activity.getSystemService(Activity.INPUT_METHOD_SERVICE) as InputMethodManager
        //Find the currently focused view, so we can grab the correct window token from it.
        var view: View? = activity.currentFocus
        //If no view currently has focus, create a new one, just so we can grab a window token from it
        if (view == null) {
            view = View(activity)
        }
        imm.hideSoftInputFromWindow(view.getWindowToken(), 0)
    }

    //check if network is connected
    fun isNetworkAvailable(context: Context?): Boolean {
        if (context == null) return false
        val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val capabilities = connectivityManager.getNetworkCapabilities(connectivityManager.activeNetwork)
            if (capabilities != null) {
                when {
                    capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> {
                        return true
                    }
                    capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> {
                        return true
                    }
                    capabilities.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET) -> {
                        return true
                    }
                }
            }
        } else {
            val activeNetworkInfo = connectivityManager.activeNetworkInfo
            if (activeNetworkInfo != null && activeNetworkInfo.isConnected) {
                return true
            }
        }
        return false
    }

    fun makeStatusBarTransparent(activity: Activity){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            val decor = activity.window.decorView
            decor.systemUiVisibility = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
            val w = activity.window
            w.statusBarColor = Color.TRANSPARENT
        }
    }
~~~
    
    
*   Tạo class `EndPoints` dùng cho việc call Api

    
~~~kotlin
    
class EndPoints {

    companion object {

        //Base URL
        const val BASE_URL = "[https://api.getgeoapi.com/api/v2/currency/"](https://api.getgeoapi.com/api/v2/currency/%22 "https://api.getgeoapi.com/api/v2/currency/%22")

        //API KEY - Go to geo currency converter website, obtain an                                       API key and paste it between " "

        const val API_KEY = "66aeea1c742e07ae95220be00217c46035168764"

        //COVERT URL
        const val CONVERT_URL = "convert"

    }
}
~~~
    
*   API_KEY mọi người có thể lấy trên trang `https://getgeoapi.com` 
*   Trong pakage này còn 2 class là `Recource.kt` ( định nghĩa 3 trạng thái thành công, thất bại và đang tải  để dùng cho việc call API)  và lớp `SingleLiveData.kt` . Mọi người có thể xem nội dung của 2 class này cũng như các file `layout.xml` ( bên trong có sử dụng viewDataBinding) , các file drawable ở link github của mình :
 *  https://github.com/hieunv-2463/ConvertApp
    
### 3. Tạo pakage network để thao tác với API:     
*   Trong pakage net work, ta tạo class `BaseDataSource` : để biết được trạng thái trả về của thao tác với API có thành công  hay thất bại.
    ```kotlin
    abstract class BaseDataSource {

    suspend fun <T> safeApiCall(apiCall: suspend () -> Response<T>): Resource<T> {

        try {
            val response = apiCall()
            if (response.isSuccessful) {
                val body = response.body()
                if (body != null) {
                    return Resource.success(body)
                }
            }
            return error("${response.code()} ${response.message()}")
        } catch (e: Exception) {
            return error(e.message ?: e.toString())
        }
    }

    private fun <T> error(message: String): Resource<T> {
        Log.e("remoteDataSource", message)
        return Resource.error("Network call has failed for a following reason: $message")
    }

*  Tiếp đến là tạo interface `ApiService` : định nghĩa HTTP operastion cần phải xử lý.
    
    ```kotlin
    interface ApiService {

    @GET(EndPoints.CONVERT_URL)
    suspend fun convertCurrency(
        @Query("api_key") access_key: String,
        @Query("from") from: String,
        @Query("to") to: String,
        @Query("amount") amount: Double
    ) : Response<ApiResponse>
    }
*  Cuồi cùng là tạo lớp `ApiDataSource` : chứa tất cả các phương thức thao tác vs api mà chúng ta sẽ gọi đến trong `ViewModel`
    
  ```kotlin
    class ApiDataSource @Inject constructor(private val apiService: ApiService) {

    suspend fun getConvertedRate(access_key: String, from: String, to: String, amount: Double) =
        apiService.convertCurrency(access_key, from, to, amount)
}
```
### 4. Tạo page di (Dependency Injection)
*   Đầu tiên là class `MyApplication.kt`(endable hilt)
    ```kotlin
    @HiltAndroidApp
    class MyApplication : Application() {
    }
  
*  Tiếp theo là class `AppModule.kt` ( chứa các dependencies sẽ được hilt inject )
    ```kotlin
    @Module
    @InstallIn(ApplicationComponent::class)
   class AppModule {

    //API Base Url
    @Provides
    fun providesBaseUrl() = EndPoints.BASE_URL

    //Gson for converting JSON String to Java Objects
    @Provides
    fun providesGson() : Gson = GsonBuilder().setLenient().create()

    //Retrofit for networking
    @Provides
    @Singleton
    fun provideRetrofit(gson: Gson) : Retrofit = Retrofit.Builder()
        .baseUrl(EndPoints.BASE_URL)
        .client(
            OkHttpClient.Builder().also { client ->
            if (BuildConfig.DEBUG){
                val logging = HttpLoggingInterceptor()
                logging.setLevel(HttpLoggingInterceptor.Level.BODY)
                client.addInterceptor(logging)
                client.connectTimeout(120, TimeUnit.SECONDS)
                client.readTimeout(120, TimeUnit.SECONDS)
                client.protocols(Collections.singletonList(Protocol.HTTP_1_1))
            }
        }.build()
        )
        .addConverterFactory(ScalarsConverterFactory.create())
        .addConverterFactory(GsonConverterFactory.create(gson))
        .build()

    //Api Service with retrofit instance
    @Provides
    @Singleton
    fun provideApiService(retrofit: Retrofit) : ApiService = retrofit.create(ApiService::class.java)

    //Class helper with apiService Interface
    @Provides
    @Singleton
    fun provideApiDatSource(apiService: ApiService) = ApiDataSource(apiService)
    }
### 5. Tạo pakage model chứa các model mà API trả về
*   Phần này có 2 data class là `ApiResponse.kt` và `Rates.kt` mọi người có thể sử dụng plugin Kotlin data class from Json hoặc nhiều cách khác để tạo từ chuỗi response trên getgeoapi.com
    
### 6.  Tạo pakage viewmodel   (chứa các thao tác về logic và call API)
*   Tạo class `MainRepo.kt` ( call API trên một suspend thread)
    ```kotlin
    class MainRepo @Inject constructor(private val apiDataSource: ApiDataSource) : BaseDataSource() {

    //Using coroutines flow to get the response from
    suspend fun getConvertedData(
        access_key: String,
        from: String,
        to: String,
        amount: Double
    ): Flow<Resource<ApiResponse>> {
        return flow {
            emit(safeApiCall { apiDataSource.getConvertedRate(access_key, from, to, amount) })
        }.flowOn(Dispatchers.IO)
    }
    }
*   Cuối cùng là class `MainViewModel.kt` vì app này là single activity nên sẽ không sử dụng đến navigation cũng như chỉ có 1 class ViewModel ( class này sẽ hứng kết quả khi mà `MainRepo` có response trả về)
    ```kotlin
    class MainViewModel @ViewModelInject constructor(private val mainRepo: MainRepo) : ViewModel() {

    //cached
    private val _data = SingleLiveEvent<Resource<ApiResponse>>()

    //public
    val data = _data

    val convertedRate = MutableLiveData<Double>()

    //Public function to get the result of conversion
    fun getConvertedData(access_key: String, from: String, to: String, amount: Double) {
        viewModelScope.launch {
            mainRepo.getConvertedData(access_key, from, to, amount).collect {
                data.value = it
            }
        }
    }
    }
### 7. Cuối cùng là pakage view ( chứa các thao tác với view, vì app demo chỉ có một màn hình nên sẽ dùng luôn class `MainActivity.kt`
*  Trong class này ta sẽ viết các funtion initSpiner, setUpOnclick, Observer data api trả về để binding lên view và một số các phương thức khác nữa. Do class này khá dài nên mọi người có thể clone về tại link github ở trên nhé! Hãy run app và mọi người có thể đổi đơn vị tiền tệ của rất nhiều quốc gia trên thế giới rồi !
    
### *  Cảm ơn mọi người đã dành thời gian quý báu để đọc bài viết này !!! <br><br><br><br>
    
*   Nguồn : **https://medium.com/swlh/how-i-built-a-simple-currency-converter-app-using-recommended-android-pattern-and-architecture-204a3bbfc142**