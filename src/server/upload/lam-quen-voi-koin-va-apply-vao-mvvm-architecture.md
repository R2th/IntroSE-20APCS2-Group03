**Hôm nay chúng ta sẽ làm quen với Koin - một component mà được tạo ra để thay thế hoặc là một sự lựa chọn thay cho Dagger khi viết app trong Kotlin  . Nó dùng để Inject các thành phần trong ứng dụng đến nơi mà chúng ta cần .**
### So sánh với Dagger
> Ưu điểm : Cấu hình đơn giản hơn , ít có code generation ,v.v
> Nhược điểm : Khi phát sinh lỗi thì lỗi không detail khiến chúng ta khó có thể tìm hiểu
> Bắt đầu tìm hiểu nào  
![](https://images.viblo.asia/47e4b979-0a23-4dba-9128-d086a775cc54.png)
- Hình ảnh trên mô tả cho chúng ta thấy độ phức tạp khi sử dụng Dagger và Koin
![](https://images.viblo.asia/0a32db7a-1168-406d-a91c-400732ba627b.png)
- Chúng ta thấy được số Code mà Dagger sinh ra lớn hơn rất nhiều khi Compile 
### Config Koin
Một điều nữa là thiết lập các thư viện này. nghĩ rằng bạn muốn sử dụng Dagger  với MVVM và hỗ trợ trong Android thì bạn phải cofig rất phức tạp nhưng với Koin thì rất đơn giản :
```
implementation "org.koin:koin-android-viewmodel:$koin_version"
```
Ở Version hiện tại thì Koin được dùng chung với Mvvm , sau khi thêm Koin Dependency thì chúng ta phải implement các module cần thiết . Nhưng trước hết hay sơ lược qua các cú pháp của Koin 

**- get()** : Để giải quyết các instance truyền  trong module của Koin 
![](https://images.viblo.asia/17168fae-aa47-4c4f-a7a8-4ff14e94595f.png)
![](https://images.viblo.asia/94a79f2d-7948-446f-9786-c4b08846b586.png)
Theo như chúng ta thấy thì **get()**  đã thể hiện được chức năng của mình 

**Factory**
Nó được dùng để phân tách sự khác nhau của các Application Context . Để truy xuất đến các component mà mình cần sự xuất hiện của chúng ở đó 
![](https://images.viblo.asia/9f0fe898-1f1a-42a4-a244-4fdef112b665.png)
**Single** Cung cấp 1 singleton 
```
val repositoryModule = module {
    single { AuthRepo(authApi = get()) }
}

val networkModule = module {
    single { generalApi }
    single { authApi }    
}
```
### Xây dựng MVVM architecture với Koin 

**Đầu tiên hãy tạo ra File Kotlin và thiết lập các module **

```

val weatherModule = applicationContext {

    viewModel { SearchViewModel(get(), get()) }

    viewModel { ResultViewModel(get(), get()) }

    viewModel { params -> DetailViewModel(params["id"],get(), get()) }
    bean { WeatherRepositoryImpl(get()) as WeatherRepository }
}

val rxModule = applicationContext {
    bean { ApplicationSchedulerProvider() as SchedulerProvider }
}

val weatherApp = listOf(weatherModule, rxModule)

```

**Tạo ra MainAppliaction của toàn App và file này phải được khai báo bên Manifest như là Dagger**

```
class MainApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        // start Koin context
        startKoin(this, listOf(weatherModule, rxModule) + localAndroidDatasourceModule)
        Iconify.with(WeathericonsModule())
    }
}

```
```
    <application
        android:name=".MainApplication"/>
```

**Tạo ViewModel** 

```
class SearchViewModel(private val weatherRepository: WeatherRepository, private val scheduler: SchedulerProvider) : AbstractViewModel() {

    val searchEvent = SingleLiveEvent<SearchEvent>()
    val uiData = MutableLiveData<SearchUIModel>()

    fun searchWeather(address: String) {
        launch {
            uiData.value = SearchUIModel(address)
            searchEvent.value = SearchEvent(isLoading = true)

            weatherRepository.searchWeather(address)
                    .with(scheduler)
                    .subscribe(
                            {
                                searchEvent.postValue(SearchEvent(isSuccess = true))
                            },
                            { err ->
                                searchEvent.postValue(SearchEvent(error = err))
                            })
        }
    }
}
```

**Tại Activity hoặc Fragment chúng ta có thể khai báo và khởi tạo View model đơn giản như sau và thực hiện sử dụng ViewModel như bình thường** 

```
 val myModel: SearchViewModel by viewModel()
```

> Trên đây là nội dung và ví dụ đơn giản để có thể làm quen và giúp ích được bạn thao tác giữa Koin và MVVM . Hy vọng nó giúp ích được cho bạn . Have a nice day !!