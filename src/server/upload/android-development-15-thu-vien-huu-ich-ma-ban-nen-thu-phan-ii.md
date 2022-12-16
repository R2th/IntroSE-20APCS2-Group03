Ở [phần trước](https://viblo.asia/p/android-development-15-thu-vien-huu-ich-ma-ban-nen-thu-phan-i-Az45b4WNZxY), mình đã giới thiệu một số thư viện sử dụng để load các dữ liệu đa phương tiện (Glide, Picasso, ExoPlayer) và thư viện giao tiếp với mạng (Retrofit). Trong bài viết này, mình sẽ giới thiệu tiếp một số thư viện mà mình cho là hữu ích khi sử dụng trong các dự án, giúp xử lý các tác vụ một cách đơn giản hơn, sử dụng ít dòng code hơn.

# Android Libraries - Dependency Injection

**Dependency injection** là một khái niệm mà một đối tượng không cần phải cấu hình các phụ thuộc của nó. Thay vào đó, các phụ thuộc được chuyển vào bởi một đối tượng khác. Nguyên tắc này giúp chúng ta tách các lớp của mình khỏi việc triển khai chúng. Cần lưu ý rằng đây là một thực tiễn kỹ thuật phần mềm tốt vì nó làm cho code của chúng ta được liên kết lỏng lẻo, giúp dễ bảo trì và kiểm tra hơn. Có một số thư viện hỗ trợ nhưng **Dagger2** theo mình là thư viện đáng sử dụng nhất.

## Dagger2

Dagger2 được ra đời để khắc phục các nhược điểm của Dagger1. Thay vì việc khởi tạo các đối tượng tại thời điểm Runtime, Dagger2 tạo ra 1 sơ đồ phụ thuộc (dependency graph) thông qua các Annotation. Nôm na là các class cung cấp sự phụ thuộc được sinh ra bằng các đoạn code (được generate bởi Dagger2) trong quá trình Compile time. Điều này làm giảm khả năng gây ra các lỗi không mong muốn. Và may mắn là các đoạn code mà Dagger2 generate ra để tạo ra các phụ thuộc cũng rất dễ đọc và dễ hiểu.

### Sử dụng Dagger2
Đầu tiên, ta cần add các dependencies vào file `build.gradle` (app):
````php
    kapt 'com.google.dagger:dagger:2.29.1'
    kapt 'com.google.dagger:dagger-compiler:2.29.1'
    kapt 'com.google.dagger:dagger-android-processor:2.29.1'
    implementation 'com.google.dagger:dagger:2.29.1'
    implementation 'com.google.dagger:dagger-android-support:2.29.1'
    annotationProcessor 'com.google.dagger:dagger-android-processor:2.29.1'
````

Sau đó, ta có thể tạo một module class để cho phép Dagger tạo các thành phần phụ (sub-components) cho các `activity` cần sự phụ thuộc. Ở ví dụ dưới đây, tôi đã tạo một class có tên `HistoryModule.kt` để tạo các module nhỏ `fragment` và `viewModel` cho chức năng lưu lịch sử của app:

````php
@Module
abstract class HistoryViewModelModule {
    @Binds
    @IntoMap
    @ViewModelKey(HistoryWrapperViewModel::class)
    abstract fun bindHistoryWrapperViewModel(historyWrapperViewModel: HistoryWrapperViewModel): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(HistoryViewModel::class)
    abstract fun bindHistoryViewModel(historyViewModel: HistoryViewModel): ViewModel
}

@Module
abstract class HistoryBuildersModule {
    @ContributesAndroidInjector
    abstract fun contributeHistoryWrapperFragment(): HistoryWrapperFragment

    @ContributesAndroidInjector
    abstract fun contributeHistoryFragment(): HistoryFragment
}
````

Sau đó tôi tiến hành include `HistoryModule` vào một module lớn hơn - có thể hiểu là main-component `ViewModelModule`:

````php
@Module(
    includes = [HistoryViewModelModule::class]
)
abstract class ViewModelModule {

    @Binds
    abstract fun bindViewModelFactory(providerFactory: ViewModelProviderFactory): ViewModelProvider.Factory
    
    ...
}
````

Tương tự như vậy, tôi có thể tạo các module tương ứng với các main-component khác cần sử dụng trong project như:
- `FragmentBuildersModule`: khởi tạo phụ thuộc cho các `fragment`
- `RepositoryModule`: khởi tạo phụ thuộc cho các function liên quan đến lưu trữ dữ liệu.
- `NetWorkModule`: khởi tạo phụ thuộc cho các tác vu liên quan đến network/API.

Include tất cả những module trên vào một module duy nhất - gọi là `AppModule`.  Giả sử như tất cả các class phụ thuộc trong các module này đều cần sử dụng đến `context` khi thực thi các function, ta chỉ việc cung cấp `applicationContext` cho module `AppModule` thông qua annotation `@Provides`. Annotation `@Singleton` biểu thị rằng chỉ có một instance duy nhất của `applicationContext` được tạo và được inject vào tất cả các class có sự phụ thuộc.

````php
@Module(includes = [ViewModelModule::class, FragmentBuildersModule::class, RepositoryModule::class, NetWorkModule::class])
class AppModule {

    @Singleton
    @Provides
    fun providerContext(application: MainApplication): Context {
        return application.applicationContext
    }
}
````

Tiếp theo ta cần include module `AppModule` vào trong một interface component - được gọi là `AppComponent` với annotation `@Component`. Tất nhiên ta cũng muốn component này chỉ được tạo duy nhất 1 instace trong suốt quá trình app hoạt động phải không nào? Vì vậy hãy thêm annotation `@Singleton`, và ta sẽ khai báo class `AppComponent` như dưới đây:

````php
@Singleton
@Component(modules = [AndroidInjectionModule::class, AppModule::class])
interface AppComponent : AndroidInjector<MainApplication> {

    @Component.Factory
    abstract class Factory : AndroidInjector.Factory<MainApplication>
}
````

Để **Dagger2** có thể thực hiện nhiệm vụ của mình trong project, ta chỉ cần tạo class Application của project được extend từ class `DaggerApplication` đơn giản như sau:

````php
class MainApplication : DaggerApplication() {

    override fun applicationInjector(): AndroidInjector<out DaggerApplication> {
        return DaggerAppComponent.factory().create(this)
    }
}
````

Ta sẽ tạo một ví dụ đơn giản để kiểm tra xem **Dagger2** đã hoạt động trong project chưa nhé! Bài toán đưa ra là khi tạo class `HistoryViewModel` và muốn inject `applicationContext` vào trong class này, ta chỉ cần khai báo constructor đơn giản như sau với annotation `@Inject`:

````php
class HistoryViewModel @Inject constructor(
    context: Context
) : BaseViewModel(context) {
    
    fun getOKString() {
        println(context.getString(android.R.string.ok))
    }
    
}
````

Tạo class `HistoryFragment`, inject `viewModelFactory` và lấy object `HistoryViewModel` đã được khai báo phụ thuộc
````php
class HistoryFragment : DaggerFragnent() {

    @Inject
    lateinit var viewModelFactory: ViewModelProvider.Factory

    val viewModel: HistoryViewModel by viewModels { viewModelFactory }
}
````

Trong `HistoryFragment`, khi gọi `viewModel.getOKString()`, ta có thể thấy console log in ra text "OK" mặc dù ta không cần khởi tạo đối tượng `HistoryViewModel` theo cách truyền thống `val viewModel = HistoryViewModel(context)`. Đối tượng `context` đã được inject vào `HistoryViewModel` ngay khi đối tượng `viewModel` được khởi tạo bởi `viewModelFactory`

# Android Libraries - View Binding

Các thư viện view binding xuất hiện khi nhu cầu giảm thiểu số lượng dòng code khi gán các View type cho các biến và truy cập đến các phương thức của View đó trong activity/fragment. Ta sẽ làm quen với thư viện binding phổ biến nhất hiện nay là **Android DataBinding**

## Android Databinding Library

**Android Databinding Library** được tích hợp sẵn trong thư viện `Android Support`. Nó yêu cầu Android Studio phiên bản 1.3 để có thể hoạt động. Thư viện này không giống như **ButterKnife** - nó không cần sử dụng các annotation.

### Sử dụng Databinding Library

Enable data binding trong file `build.gradle` app-module:

````php
android {
    ....
    buildFeatures {
        dataBinding true
    }
}
````

Sau đó, ta chỉnh sửa tag của file layout thành như sau:
````php
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <TextView
            android:id="@+id/textview"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content" />

    </androidx.constraintlayout.widget.ConstraintLayout>

</layout>    
````

Sau đó, một class ràng buộc được generate cho ta dựa trên tên của layout (`ActivityMainBinding` tương ứng với `activity_main.xml`). Ta sẽ sử dụng instance của class này để truy cập đến các view. Ta cũng có thêm một class khác - `DataBindingUtil` để xử lý các tiện ích khác.

````php
public class MainActivity extends AppCompatActivity {

    ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
        binding.textview.setText("Hello world!");
    }
}
````

Đối với fragment, ta có thể khởi tạo view  binding trong hàm `onCreateView()` như sau:

````php
class MainFragment : Fragment() {
    
    lateinit var viewDataBinding: FragmentMainBinding
    
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        viewDataBinding = DataBindingUtil.inflate(inflater, R.layout.fragment_main, container, false)
        return viewDataBinding.root
    }
}
````

### Kết hợp với viewModel và dữ liệu dạng observable

Thư viện **Android Databinding Library** giúp giảm đáng kể lượng mã code được viết để truy cập vào các view. Ngoài việc tránh được các dòng code `findViewById` nhàm chán, **Android Databinding Library** còn tỏ ra hiệu quả khi kết hợp với các component khác như `viewModel`, `observable objects`... như ví dụ dưới đây:

````php
<layout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto">
        
    <data>
        <variable
            name="viewmodel"
            type="com.myapp.data.ViewModel" />
    </data>
    
    <ConstraintLayout... />
    
        <TextView
            android:text="@{viewmodel.userName}" />
            
    <!-- UI layout's root element -->
</layout>
````

Ta có giá trị `userName` là một `observable objects`, nó có thể thay đổi giá trị tùy thuộc vào đối tượng mà nó quan sát. Mỗi khi `userName` được thay đổi giá trị, thay vì phải gọi hàm `setText()` ở controller, `TextView` có thể hiển thị ngay lập tức giá trị của `userName` mà ta không cần phải refer đến viewId như truyền thống.
# Tổng kết
Mình vừa giới thiệu thêm cho các bạn 2 thư viện hữu ích trong lập trình Android. Hi vọng chúng có thể giúp các bạn có nhiều trải nghiệm tuyệt với trong quá trình làm việc với ngôn ngữ Android. Các bạn hãy đón đọc những phần tiếp theo để cùng mình tìm hiểu thêm các thư viện hữu ích khác nhé. Many thanks!!