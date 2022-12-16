Nói về Architecture Component chắc hẳn ai cũng đã nghe hoặc đọc ở đâu đó rồi, đặc biệt là trên Viblo đã có rất nhiều bài giới thiệu từ tổng quan Architecture Component cho đến các thành phần của nó như ViewModel, Room, LiveData... Và với mong muốn thoát khỏi sự phụ thuộc vào Rx, cũng như mong muốn áp dụng những thứ thuần túy nhất mà Android (cụ thể là Google) đã cung cấp cho chúng ta, tôi sẽ triển khai một hệ thống chỉ sử dụng Architecture Component (và một vài thư viện hỗ trợ nữa trừ Rx). Bắt đầu thôi!
## Cái nhìn tổng quan về hệ thống 
Tôi sẽ sử dụng mô hình được khuyến nghị trong bài viết [ViewModels and LiveData: Patterns + AntiPatterns](https://medium.com/androiddevelopers/viewmodels-and-livedata-patterns-antipatterns-21efaef74a54) của Jose Alcérreca. Nó sẽ trông giống như hình sau: 
![](https://images.viblo.asia/2091e2e2-8dfb-413d-ab61-548cf1ef6337.png)
Khoan đã, nếu sử dụng mô hình đó thì chẳng phải ViewModel đang sử dụng callback để lắng nghe đến repository hay sao? Chúng ta đang sử dụng LiveData mà. Thế còn với mô hình thế này thì sao nhỉ:
![](https://images.viblo.asia/131cf880-2b4c-4ac6-99f5-79a1c87009c3.png)
ViewModel lắng nghe trực tiếp LiveData từ repository (vậy thì hàng ngày chúng ta sử dụng Rx có vẻ là hơi thừa). Tôi sẽ áp dụng mô hình thứ hai vào ứng dụng thời tiết này. Bắt đầu đi từ model nhé.
### 1. Xây dựng model
Khó khăn đầu tiên là làm sao biết được ViewModel có lấy được dữ liệu hay là lỗi, ví dụ khi ViewModel cần lấy thông tin thời tiết từ API, chúng ta phải biết được khi nào dữ liệu trả về đúng hoặc khi nào bị lỗi. Goole đã lấy ví dụ về một lớp chứa cả dữ liệu và trạng thái của dữ liệu như sau: <br>
```
data class Resource<out T>(val status: Status, val data: T?, val message: String?) {

    companion object {

        fun <T> success(data: T?): Resource<T> = Resource(Status.SUCCESS, data, null)

        fun <T> error(msg: String, data: T? = null) = Resource(Status.ERROR, data, msg)

        fun <T> loading(data: T? = null) = Resource(Status.LOADING, data, null)

    }
}
```
Lớp này sẽ được giải thích rõ hơn trong các phần sau của ứng dụng. Status ở đây chỉ là một enum chứa 3 trạng thái SUCCESS, ERROR và LOADING:
```
enum class Status {
    SUCCESS,
    ERROR,
    LOADING
}
```
Đối tượng Weather để lưu trạng thái của thời tiết lấy được từ database:
```
@Entity(tableName = "weather")
data class Weather(
    @PrimaryKey
    @ColumnInfo(name = "_id")
    val id: Long?,
    @ColumnInfo(name = "location")
    val location: String?,
    @ColumnInfo(name = "main")
    val main: String?,
    @ColumnInfo(name = "des")
    val des: String?,
    @ColumnInfo(name = "temp")
    val temp: Float?,
    @ColumnInfo(name = "pressure")
    val pressure: Float?,
    @ColumnInfo(name = "humidity")
    val humidity: Float?,
    @ColumnInfo(name = "temp_min")
    val tempMin: Float?,
    @ColumnInfo(name = "temp_max")
    val tempMax: Float?,
    @ColumnInfo(name = "last_updated")
    val lastUpdated: Long?
)
```
Đối tượng WeatherFromApi để retrofit parse Json từ api trả về:
```
data class WeatherFromApi(
    @Expose
    @SerializedName("id")
    val id: Long?,
    @Expose
    @SerializedName("name")
    val name: String?,
    @Expose
    @SerializedName("main")
    val main: Main?,
    @Expose
    @SerializedName("weather")
    val weathers: List<Weather>?
) {

    data class Weather(
        @Expose
        @SerializedName("main")
        val main: String,
        @Expose
        @SerializedName("description")
        val description: String
    )

    data class Main(
        @Expose
        @SerializedName("temp")
        val temp: Float,
        @Expose
        @SerializedName("pressure")
        val pressure: Float,
        @Expose
        @SerializedName("humidity")
        val humidity: Float,
        @Expose
        @SerializedName("temp_min")
        val tempMin: Float,
        @Expose
        @SerializedName("temp_max")
        val tempMax: Float
    )
    
    fun toWeather() = com.example.studiounknown.getridofrx.model.Weather(location = name, main = weathers?.get(0)?.main,
        des = weathers?.get(0)?.description, temp = main?.temp, pressure = main?.pressure, humidity = main?.humidity,
        tempMin = main?.tempMin, tempMax = main?.tempMax, id = id, lastUpdated = System.currentTimeMillis())
}
```
### 2. Xây dựng Dao và Api
WeatherApi tôi có dùng Retrofit, cái hay của thư viện này là nó hỗ trợ cả LiveData.
```
interface WeatherApi {

    @GET(WEATHER)
    fun findWeatherByLocation(
        @Query(QUERY_PARAM) location: String,
        @Query(APPID_PARAM) appId: String
    ): LiveData<ApiResponse<WeatherFromApi>>

}
```
Lớp [ApiResponse](https://github.com/tungtd95/architect-component/blob/master/app/src/main/java/com/example/studiounknown/getridofrx/utils/ApiResponse.kt) được sử dụng để xử lý dữ liệu từ api về, xem chi tiết ở link đính kèm nhé. Còn data access object tôi dùng Room, tất nhiên là nó cũng hỗ trợ LiveData:
```
@Dao
interface WeatherDao {
    @Query("SELECT * FROM weather WHERE location LIKE :location")
    fun getWeatherByLocation(location: String): LiveData<Weather>

    @Query("SELECT * FROM weather ORDER BY last_updated DESC")
    fun getWeather(): LiveData<List<Weather>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun saveWeather(weather: Weather)

    @Delete
    fun removeWeather(weather: Weather)
}
```
Có điểm chung giữa hai thư viện này là các phương thức của nó có thể trả về LiveData, giúp cho việc đồng bộ dữ liệu giữa các thành phần chứa data và thành phần sử dụng data.
### 3. Xây dựng repository
Chúng ta cần một WeatherRepo để cung cấp dữ liệu cho ViewModel
```
interface WeatherRepo {

    fun getWeatherByLocation(location: String): LiveData<Resource<Weather>>

    fun getWeathers(): LiveData<Resource<List<Weather>>>

    fun removeWeather(weather: Weather): LiveData<Resource<Unit>>
}
```
Và một WeatherRepoImpl để triển khai các phương thức của interface trên:
```
class WeatherRepoImpl(
    private val appExecutors: AppExecutors,
    private val weatherDao: WeatherDao,
    private val weatherApi: WeatherApi
) : WeatherRepo {

    override fun removeWeather(weather: Weather): LiveData<Resource<Unit>> =
        object : LocalBoundResource<Unit>(appExecutors) {

            override fun loadToDB() = weatherDao.removeWeather(weather)

        }.asLiveData()

    override fun getWeathers(): LiveData<Resource<List<Weather>>> =
        object : NetworkBoundResource<List<Weather>, Unit>(appExecutors) {

            override fun saveCallResult(item: Unit) {
                //do nothing
            }

            override fun shouldFetch(data: List<Weather>?): Boolean = false

            override fun loadFromDb(): LiveData<List<Weather>> = weatherDao.getWeather()

            override fun createCall(): LiveData<ApiResponse<Unit>> = AbsentLiveData.create()

        }.asLiveData()

    override fun getWeatherByLocation(location: String): LiveData<Resource<Weather>> =
        object : NetworkBoundResource<Weather, WeatherFromApi>(appExecutors) {

            override fun saveCallResult(item: WeatherFromApi) {
                weatherDao.saveWeather(item.toWeather())
            }

            override fun shouldFetch(data: Weather?): Boolean = true

            override fun loadFromDb(): LiveData<Weather> = weatherDao.getWeatherByLocation(location)

            override fun createCall(): LiveData<ApiResponse<WeatherFromApi>> =
                weatherApi.findWeatherByLocation(location = location, appId = APPID)

        }.asLiveData()

}
```
Khoan đã, AppExecutors và NetWorkBoundResource và LocalBoundResource là gì kia?<br><br>
AppExecutors là đối tượng chứa các loại luồng mà tác vụ sẽ chạy trên đó như là ui thread, io thread... cụ thể như sau:
```
open class AppExecutors(
        private val diskIO: Executor = Executors.newSingleThreadExecutor(),
        private val networkIO: Executor = Executors.newFixedThreadPool(3),
        private val mainThread: Executor = MainThreadExecutor()
) {

    fun diskIO(): Executor {
        return diskIO
    }

    fun networkIO(): Executor {
        return networkIO
    }

    fun mainThread(): Executor {
        return mainThread
    }

    private class MainThreadExecutor : Executor {
        private val mainThreadHandler = Handler(Looper.getMainLooper())
        override fun execute(command: Runnable) {
            mainThreadHandler.post(command)
        }
    }
}
```
Còn NetworkBoundResource các bạn theo [link này](https://github.com/tungtd95/architect-component/blob/master/app/src/main/java/com/example/studiounknown/getridofrx/utils/NetworkBoundResource.kt) để biết cụ thể nhé, về cơ bản thì lớp này sẽ qui định các tác vụ sẽ chạy cụ thể ở đâu, worker hay io hay ui, và nó sẽ trả về một LiveData có chứa dữ liệu và trạng thái của dữ liệu (đối tượng Resource) cho repository. Lưu ý WeatherRepo trả về một biến LiveData, khi ViewModel cần lấy dữ liệu, ví dụ như dữ liệu về thời tiết, nó sẽ gọi đến WeatherRepo, WeatherRepo sẽ gọi đến NetworkBoundResource qua phương thức getWeatherByLocation(location: String) bằng cách tạo một đối tượng NetworkBoundResource mới, đối tượng này sau đó sẽ lấy dữ liệu từ api và cập nhật dữ liệu đó vào local database (thông qua Room). Room sau đó sẽ trả về đối tượng Weather thông qua LiveData, NetworkBoundResource lấy dữ liệu đó gói vào đối tượng Resource rồi gói tiếp vào LiveData thông qua phương thức asLiveData() của NetworkBoundResource. Từ đó ViewModel sẽ observe LiveData của repository trả về. Quá trình xử lý hơi phức tạp một chút, nhưng nếu các bạn làm một hai lần với nó thì sẽ hiểu được cách chúng vận hành và ăn khớp với nhau.
### 4. Xây dựng ViewModel
Giả sử trong màn home tôi muốn có chức năng tìm kiếm thông tin thời tiết theo địa điểm, xem tất cả lịch sử tìm kiếm và xóa lịch sử tìm kiếm, thì HomeViewModel của tôi sẽ như sau:
```
class HomeViewModel private constructor(
    private val weatherRepo: WeatherRepo
): BaseViewModel() {

    private val query = MutableLiveData<String>()
    val weather: LiveData<Resource<Weather>> = Transformations.switchMap(query) {
        if (it.isNullOrBlank()) {
            AbsentLiveData.create()
        } else {
            weatherRepo.getWeatherByLocation(it)
        }
    }
    val weathers = weatherRepo.getWeathers()
    val weatherSelected = MutableLiveData<Weather>()

    fun search(query: String?) {
        if (query.isNullOrBlank()) {
            return
        }
        this.query.value = query.trim()
    }

    fun remove(weather: Weather) {
        weatherRepo.removeWeather(weather)
    }
}
```
Nhìn có vẻ đơn giản, nhưng đúng là nó đó, tất cả chức năng kể trên đều gói gọn trong từng ấy dòng code thôi, khá đơn giản phải không, hãy đi vào chi tiết một chút nhé. Đầu tiền là chức năng tìm kiếm, hàm search nhận vào giá trị mà người dùng nhập, giá trị này sẽ được gán cho biến query. Biến weather sau đó sẽ được gán bằng LiveData chứa dữ liệu và trạng thái của dữ liệu (đối tượng Resource), tại sao vậy? Hàm Transformations.switchMap() nhận một biến LiveData, khi biến LiveData này thay đổi giá trị thì khối lệnh trong hàm này sẽ được gọi đến, hàm này cũng khá giống mới map, flat map của Rx, có chức năng như một cái công tắc điều khiển luồng đi của dữ liệu. Nếu đọc kỹ lớp NetworkBoundResource bạn sẽ hiểu được các trạng thái mà dữ liệu sẽ rơi vào, bắt đầu từ LOADING sau đó là SUCCESS hoặc FAIL, khá tiện cho View hiển thị.<br><br>
Vậy còn chức năng xem lịch sử tìm kiếm? Để ý rằng biến weathers là một LiveData, LiveData này được đồng bộ với dữ liệu trong database, khi bất kỳ thay đổi nào trong db xảy ra thì biến này sẽ lập tức được cập nhật (đồng bộ thời gian thực), vậy là chỉ cần một biến LiveData chúng ta đã giảm bớt công việc load dữ liệu, reload dữ liệu. Giả sử khi tìm kiếm xong, tôi lưu luôn kết quả tìm kiếm đó vào db, sau khi db cập nhật xong, Room sẽ gửi LiveData cho các đối tượng đang lắng nghe, trong trường hợp này là biến weathers, tương tự như khi xóa một weather trong db, thì biến weathers cũng tự động được cập nhật.
### 5. Xây dựng View
Về nhiệm vụ của View thì khá đơn giản, nhận hành động của người dùng và hiển thị dữ liệu. Ví dụ HomeFragment:
```
class HomeFragment : BaseFragment() {
    ...
    override fun initViewModelComponent() {

        viewModel.weather.observe(this, Observer {
            if (it == null) {
                showError()
                return@Observer
            }
            when (it.status) {
                Status.LOADING -> {
                    showLoading()
                }
                Status.SUCCESS -> {
                    showResult(it.data?.location)
                }
                Status.ERROR -> {
                    showError()
                }
            }
        })
        viewModel.weathers.observe(this, Observer {
            if (it.status == Status.SUCCESS && it.data != null) {
                weatherAdapter.setWeathers(it.data)
            }
        })
    }
    ...
}
```
Ở đây các Observer lắng nghe đến các biến LiveData trong ViewModel, và chúng sẽ nhận được dữ liệu cộng với trạng thái của dữ liệu dùng để cập nhật View.
## Kết quả
Dưới đây là demo app Weather đơn giản sau khi hoàn thành: <br><br>
![](https://images.viblo.asia/ebd56cb3-8558-44fd-8a27-eef3132db7f3.gif) <br><br>
Như các bạn đã thấy trong HomeViewModel, tôi không có một hàm nào để getWeather hay updateWeather, mỗi lần tìm kiếm xong, weatherRepo tự động lưu kết quả vào db và BANG!! view lập tức được cập nhật.<br><br>
Theo tôi thấy, LiveData hoàn toàn có khả năng thay thế được Rx trong tương lai, hơn nữa việc kết hợp LiveData với các thành phần khác của Architecture Component như Worker, DataBinding, Room, ViewModel... khá dễ dàng và hoàn thiện. Đặc biệt là với Worker, cụ thể về LiveData và Worker có thể tôi sẽ viết một bài riêng, ngày hôm nay tạm dừng ở đây thôi nhé. Cảm ơn các bạn đã theo dõi bài viết, nếu có bất kỳ ý kiến nào hãy cứ comment bên dưới để chúng ta cùng thảo luận nhé. Happy coding!!
## Tham khảo
[Source code](https://github.com/tungtd95/architect-component) của ứng dụng này cho bạn nào cần (nếu có điều kiện hãy gửi PR hoặc đóng góp ý kiến nhé) <br>
[ViewModels and LiveData: Patterns + AntiPatterns](https://medium.com/androiddevelopers/viewmodels-and-livedata-patterns-antipatterns-21efaef74a54) <br>
[Android Architecture Components](https://developer.android.com/topic/libraries/architecture/) <br>
[Source code](https://github.com/googlesamples/android-architecture-components/tree/master/GithubBrowserSample) ví dụ gốc của Google