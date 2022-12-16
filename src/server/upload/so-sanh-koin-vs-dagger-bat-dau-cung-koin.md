# Giới thiệu
Xin chào các bạn, sau một thời gian tìm hiểu về Dependency injection và Dagger 2, mình đã tìm ra Koin, một DI framework khác mà theo mình thì hay hơn Dagger.

Và bài này mình sẽ so sánh nó với Dagger và cách sử dụng Koin nhé.

Nguồn tham khảo: https://medium.com/@farshidabazari/android-koin-with-mvvm-and-retrofit-e040e4e15f9d

# Koin là gì
Koin là Dependency injection framework mạnh mẽ dành cho Kotlin. Được viết bằng Kotlin thuần túy sử dụng functional nên không proxy, không gen code, không ánh xạ.

# So sánh với Dagger
Chúng ta sẽ so sánh trên cùng 1 project sử dụng Dagger trước tiên, sau đó sử dụng Koin.

Đầu tiên hãy xem DI package trước và sau khi sử dụng Koin

![](https://images.viblo.asia/df9a0833-e191-4878-b85a-ce10623fbb1a.png)

Như các bạn thấy,  Dagger cần nhiều file hơn, như trong ví dụ này cần sử dụng 3 file để inject view nmodel.

## Sau khi Compile
Để có những số liệu này, mình sử dụng tool [Statistic](https://plugins.jetbrains.com/plugin/4509-statistic). 

![](https://images.viblo.asia/899e0a6d-9520-4646-8c28-c18d1b7c23f2.png)

Như các bạn thấy sau khi compile code, Dagger có số lượng dòng code gấp 2 lần so với Koin.

## Build time
Sau khi đã clean và rebuild project, mình được kết quả sau:

```
Koin:
BUILD SUCCESSFUL in 17s
88 actionable tasks: 83 executed, 5 up-to-date
```
```
Dagger:
BUILD SUCCESSFUL in 18s
88 actionable tasks: 83 executed, 5 up-to-date
```

## Setup
### Dagger
Thêm Dagger SDK vào gradle:
```
kapt "com.google.dagger:dagger-compiler:$dagger_version"
kapt "com.google.dagger:dagger-android-processor:$dagger_version"
implementation "com.google.dagger:dagger:$dagger_version"
```
Init dagger:
```
Class MyApplication : Application(), HasActivityInjector { 
  @Inject
  lateinit var dispatchingAndroidInjector:    DispatchingAndroidInjector<Activity>
override fun activityInjector() = dispatchingAndroidInjector
fun initDagger() {
   DaggerAppComponent
      .builder()
      .application(this)
      .build()
      .inject(this)
  }
}
```
Như vậy tất cả các activity hoặc BaseActivity cần implement HasSupportFragmentInjector và inject DispatchingAndroidInjector.

Đối với ViewModel, ta cũng cần inject ViewModelFactory trong BaseFragment và implement Injectable.

Không những vậy, với mỗi ViewModel, Fragment, Activity ta cũng cần khai báo với DI để có thể inject chúng. Ví dụ ta sẽ cần ActivityModule, FragmentModule, và ViewModelModule.

```
@Module
abstract class ActivityModule {
    @ContributesAndroidInjector(modules = [FragmentModule::class])
    abstract fun contributeMainActivity(): MainActivity
   
    //Add your other activities here
}
```

Fragment:
```
@Module
abstract class FragmentModule {
    @ContributesAndroidInjector
    abstract fun contributeLoginFragment(): LoginFragment

    @ContributesAndroidInjector
    abstract fun contributeRegisterFragment(): RegisterFragment

    @ContributesAndroidInjector
    abstract fun contributeStartPageFragment(): StartPageFragment
}
```

ViewModels:
```
@Module
abstract class ViewModelModule {

    @Binds
    abstract fun bindViewModelFactory(factory: ViewModelFactory): ViewModelProvider.Factory

    @Binds
    @IntoMap
    @ViewModelKey(loginViewModel::class)
    abstract fun bindLoginFragmentViewModel(loginViewModel: loginViewModel): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(StartPageViewModel::class)
    abstract fun bindStartPageViewModel(startPageViewModel:  StartPageViewModel): ViewModel
    ......
}
```

Như vậy bạn sẽ phải để ý đến việc thêm các Activity, Fragment, ViewModel mới vào DI module.

### Koin
Thêm thư viện vào gradle:
```
implementation "org.koin:koin-android-viewmodel:$koin_version"
```
Còn một số dependencies khác của Koin, nhưng ở ví dụ này chúng ta chỉ cần dependency này cho mô hình MVVM.

Trước khi bắt đầu, chúng ta nên lưu ý một chút về syntax của Koin:
 * `get()` giải quyết việc instance các Koin module, `get()` thường được sử dụng cho việc khởi tạo, nhằm thêm các giá trị cần thiết cho việc khởi tạo.
* `factory`  sẽ khai báo các định nghĩa mới (new instance) mỗi khi bạn yêu cầu. 
* `single` cung cấp singleton definition.
* `name =` sử dụng để định nghĩa tên. Cần thiết khi bản muốn sử dụng nhiều instances khác nhau nhưng lại có chung 1 class.

Dưới đây là 1 đoạn code ví dụ:
```
private val retrofit: Retrofit = createNetworkClient()

private val generalApi: GeneralApi = retrofit.create(GeneralApi::class.java)
private val authApi: AuthApi = retrofit.create(AuthApi::class.java)

val viewModelModule = module {
    viewModel { LoginFragmentViewModel(get()) }
    viewModel { StartPageViewModel() }    
}

val repositoryModule = module {
    single { AuthRepo(authApi = get()) }
}

val networkModule = module {
    single { generalApi }
    single { authApi }    
}

val databaseModule = module {
}

val sharedPrefModule = module {
}
```

Đơn giản vậy thôi. Thay cho việc bạn phải tạo nhiều file với nhiều comment, nhiều components, chúng ta chỉ cần tạo 1 class đơn giản cho DI.

### Giải thích 
```
private val retrofit: Retrofit = createNetworkClient()
```
createNetworkClient là function khởi tạo Retrofit, setting base Url, thêm ConverterFactory và Interceptor.
```
private val generalApi: GeneralApi =  retrofit.create(GeneralApi::class.java)
private val authApi: AuthApi = retrofit.create(AuthApi::class.java)
```
AuthApi và GeneralApi là các endpoints interfaces.
```
val viewModelModule = module {
    viewModel { LoginFragmentViewModel(get()) }
    viewModel { StartPageViewModel() }    
}
```
Chúng ta tiến hành khai báo các viewModels class bằng `viewModel` nằm bên trong các `module`. Koin sẽ cung cấp `viewModel` cho vòng đời ViewModelFactory và giúp nó bind với các component tương ứng.

Như các bạn thấy chúng ta có method `get()` bên trong hàm khởi tạo LoginFragmentViewModel. Nó sẽ giúp  LoginFragmentViewModel tìm được param cần thiết để khởi tạo. Mà cụ thể ở đây là **AuthRepo**.

Sau cùng, ở method `onCreate` trong Application class, chúng ta sẽ khởi tạo Koin.

```
startKoin(this, listOf(repositoryModule, networkModule, viewModelModule))
```
Ở đây chúng ta chỉ cần gọi method `startKoin`, truyền vào context và list các modules chúng ta muốn Koin khởi tạo.

Sử dụng ViewModel dễ hơn so với ViewModel nguyên thủy. Bây giờ ở các View class (Fragment, Activity) chỉ cần thêm:
```
private val startPageViewModel: StartPageViewModel by viewModel()
```
Bằng đoạn code này, koin sẽ tạo ra một đối object StartPageViewModel cho bạn. Sau đó bạn có thể sử dụng view model này cho view của bạn.

# Kết luận
Hi vọng qua bài viết này các bạn sẽ có thêm một chút thông tin hữu ích về Koin một Dependency injection framework rất hay này.
Xin cảm ơn các bạn. Mình cũng mới tìm hiểu về Koin, nên hãy để lại comment góp ý nếu thấy gì không hợp lý nhé :D