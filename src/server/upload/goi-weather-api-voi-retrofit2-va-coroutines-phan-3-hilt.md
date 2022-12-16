Hi các bạn, hôm nay mình sẽ tiếp tục series Weather App và ở phần này mình sẽ sử dụng Hilt một thư viện về Dependency injection (DI) do google tạo ra :money_mouth_face:.
# 1. Denpendency Injection là gì 
Dependency injection (DI) là một kỹ thuật được sử dụng phổ biến trong lập trình và rất phù hợp trong Android development, các phụ thuộc được cung cấp cho class thay vì tự bản thân class tạo ra. Mục đích là để giảm sự phụ thuộc giữa các class.

# **2. Bắt đầu code**
Trước tiên là add thư viện vào project nhé.

Trong **build gradle (project)**
```
dependencies {
        ...
        classpath 'com.google.dagger:hilt-android-gradle-plugin:2.38.1'
    }
```

**build gradle (Module)**
```
apply plugin: 'dagger.hilt.android.plugin'

dependencies {
    ...
    def hilt_version = "2.38.1"
    implementation "com.google.dagger:hilt-android:$hilt_version"
    kapt "com.google.dagger:hilt-compiler:$hilt_version"
    }
```

Sau khi Syn xong thì chúng ta bắt đầu tạo thư mục :kissing_heart:

Tạo 1 class application với annonation là @HiltAndroidApp
```kotlin
@HiltAndroidApp
class MyApplication: Application() {
}
```

![image.png](https://images.viblo.asia/b6009463-cfce-4b35-b3a6-1ccb9f5d41a1.png)

```
android:name=".application.MyApplication"
```

![image.png](https://images.viblo.asia/0346708f-a9a1-4ede-91f0-28899e71b757.png)

Tiếp theo là tạo 1 App Module nơi chứa code khởi tạo của bạn, thường thì class này sẽ được nằm trong một thư mục có tên là di (tự tạo nhé):stuck_out_tongue_winking_eye:

```kotlin
@Module
@InstallIn(SingletonComponent::class)
class ApplicationModule {
    ...
}
```

![image.png](https://images.viblo.asia/60798bea-e735-4af7-8d50-5b6fb50d88e5.png)

Trong class này nó sẽ chứa code khởi tại các object trong class Repository, ViewModel, ..., đây là code của mình, các phần setup bao gồm retrofit, repository.

ApplicationModule.kt
```kotlin
@Module
@InstallIn(SingletonComponent::class)
class ApplicationModule {
    @Provides
    @Singleton
    fun providerInterceptor(): HttpLoggingInterceptor {
        return HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }
    }

    @Provides
    @Singleton
    fun providerClient(interceptor: HttpLoggingInterceptor): OkHttpClient {
        val builder = OkHttpClient.Builder()
            .readTimeout(30, TimeUnit.SECONDS)

        if (BuildConfig.DEBUG) {
            builder.addInterceptor(interceptor)
        }
        return builder.build()
    }

    @Provides
    @Singleton
    fun providerGSonConverter(): GsonConverterFactory {
        return GsonConverterFactory.create()
    }

    @Provides
    @Singleton
    fun providerRetrofit(gSonConvert: GsonConverterFactory, client: OkHttpClient): Retrofit {
        return Retrofit.Builder()
            .baseUrl(BuildConfig.BASE_URL)
            .addConverterFactory(gSonConvert)
            .client(client)
            .build()
    }

    @Provides
    @Singleton
    fun providerService(retrofit: Retrofit): IWeatherService {
        return retrofit.create(IWeatherService::class.java)
    }
}
```

![image.png](https://images.viblo.asia/20d1eaf3-a1d0-43f2-a0db-09158006e80b.png)

ViewModelModule.kt
```kotlin
@Module
@InstallIn(ViewModelComponent::class)
internal object ViewModelModule{
    @Provides
    @ViewModelScoped
    fun providerWeatherRepository(weatherService: IWeatherService): IWeatherRepository {
        return WeatherRepository(weatherService)
    }
}
```

![image.png](https://images.viblo.asia/de327977-acb4-4016-8815-8f5dbb9a2cdb.png)

WeatherRepository.kt

Thêm annonation @Inject vào contructor() của class Repository. 
```kotlin
class WeatherRepository @Inject constructor(
    private val IWeatherService: IWeatherService
)
```

![image.png](https://images.viblo.asia/773b4d7f-a483-4c29-aa21-45acf35bc4c0.png)

MainActivityViewModel.kt
```kotlin
@HiltViewModelkotlin
class MainActivityViewModel @Inject constructor(
    private val weatherRepository: IWeatherRepository
) : ViewModel() {
```

![image.png](https://images.viblo.asia/1afe76c6-08fe-4822-ad90-3ccdcd7284be.png)

Cuối cùng là run và xem kết quả.

# 3. Demo
https://github.com/vinhlamle4/WeatherAppNew

#  4. Tài liệu tham khảo
https://developer.android.com/training/dependency-injection

https://viblo.asia/p/dependency-injection-trong-android-voi-hilt-LzD5dvEYZjY

https://developer.android.com/codelabs/android-hilt#5