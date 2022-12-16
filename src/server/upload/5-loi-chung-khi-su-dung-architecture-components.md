## 1. Leaking LiveData observers in Fragments
Fragment có vòng đời khá phức tạp và khi đã detach hoặc re-attach, không phải lúc nào nó cũng được destroy. Ví dụ, fragment còn lại không bị destroy suốt quá trình configure thay đổi, vấn đề bắt đầu xảy ra, instance của fragment vẫn tồn tại và chỉ các view của nó bị destroy, dẫn đến `onDestroy()` không được gọi, cuối cùng trạng thái Destroy sẽ không được reach. 

Điều này có nghĩa là nếu chúng ta bắt đầu observe `LiveData` trong `onCreateView()` hoặc sau đó (thông thường là trong `onActivityCreated()`) và truyền Fragment dưới dạng `LifecycleOwner` như:
```java 
class BooksFragment: Fragment() {

    private lateinit var viewModel: BooksViewModel

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_books, container)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(BooksViewModel::class.java)

        viewModel.liveData.observe(this, Observer { updateViews(it) })  // Risky: Passing Fragment as LifecycleOwner
    }
    
    ...
}
```

Chúng ta kết thúc bằng việc truyền vào một instance mới của *Observer* giống hệt nhau mỗi lần fragment được re-attach, nhưng LiveData lại không remove các observer trước đó. Bởi vì, LifecycleOwner (Fragment) không reach trạng thái Destroy.  Cuối cùng dẫn đến kết quả số lượng lớn các observer giống nhau active cùng một lúc và cùng một code từ `onChanged()` được thực thi nhiều lần.

Vấn đề ban đầu được report [ở đây](https://github.com/googlesamples/android-architecture-components/issues/47) và để hiểu sâu hơn bạn có thể tìm thấy [ở đây](https://medium.com/@BladeCoder/architecture-components-pitfalls-part-1-9300dd969808).

Để giải quyết vấn đề này chúng ta có thể dùng vòng đời của view trong fragment qua [`getViewLifecycleOwner()`](https://developer.android.com/reference/androidx/fragment/app/Fragment#getViewLifecycleOwner%28%29) hoặc [`getViewLifecycleOwnerLiveData()`](https://developer.android.com/reference/androidx/fragment/app/Fragment#getviewlifecycleownerlivedata), các function này được add vào Support Library 28.0.0 và AndroidX 1.0.0,  để LiveData remove các observers mỗi lần view của fragment bị destroy.
```java
class BooksFragment : Fragment() {

    ...

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(BooksViewModel::class.java)

        viewModel.liveData.observe(viewLifecycleOwner, Observer { updateViews(it) })    // Usually what we want: Passing Fragment's view as LifecycleOwner
    }
    
    ...
}
```

## 2. Reloading data after every rotation
Chúng ta thường đặt việc khởi tạo hoặc setup logic trong `onCreate()` của Activity (tương tự việc đặt trong `onCreateView()` hoặc sau đó của Fragment). Do vậy, chúng ta có thể loading data trong ViewModels tại thời điểm này luôn. Tất cả phụ thuộc vào logic của chúng ta, tuy nhiên điều này có thể gây ra việc re-load dữ liệu sau mỗi lần chúng ta rotation (mặc dù ViewModel đã được sử dụng), trong hầu hết các trường hợp thường chỉ là ngoài ý muốn.
Ví dụ:
```java
class ProductViewModel(
    private val repository: ProductRepository
) : ViewModel() {

    private val productDetails = MutableLiveData<Resource<ProductDetails>>()
    private val specialOffers = MutableLiveData<Resource<SpecialOffers>>()

    fun getProductsDetails(): LiveData<Resource<ProductDetails>> {
        repository.getProductDetails()  // Loading ProductDetails from network/database
        ...                             // Getting ProductDetails from repository and updating productDetails LiveData
        return productDetails
    }

    fun loadSpecialOffers() {
        repository.getSpecialOffers()   // Loading SpecialOffers from network/database
        ...                             // Getting SpecialOffers from repository and updating specialOffers LiveData
    }
}

class ProductActivity : AppCompatActivity() {

    lateinit var productViewModelFactory: ProductViewModelFactory

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val viewModel = ViewModelProviders.of(this, productViewModelFactory).get(ProductViewModel::class.java)

        viewModel.getProductsDetails().observe(this, Observer { /*...*/ })  // (probable) Reloading product details after every rotation
        viewModel.loadSpecialOffers()                                       // (probable) Reloading special offers after every rotation
    }
}
```

Có nhiều solution cho vấn đề này. Ví dụ như Repository sẽ lưu trữ data trong cache hoặc một số solution khác là: 
* Sử dụng LiveData khác tương tự  [`AbsentLiveData`](https://github.com/googlesamples/android-architecture-components/blob/master/GithubBrowserSample/app/src/main/java/com/android/example/github/util/AbsentLiveData.kt) và bắt đầu loading chỉ khi data không được set.
* Bắt đầu load data khi nó thật sự cần, ví dụ có một Click event chẳng hạn.
* Hoặc đơn giản nhất: Thực hiện việc gọi loading trong constructor của ViewModel.
```java
class ProductViewModel(
    private val repository: ProductRepository
) : ViewModel() {

    private val productDetails = MutableLiveData<Resource<ProductDetails>>()
    private val specialOffers = MutableLiveData<Resource<SpecialOffers>>()

    init {
        loadProductsDetails()           // ViewModel is created only once during Activity/Fragment lifetime
    }

    private fun loadProductsDetails() { // private, just utility method to be invoked in constructor
        repository.getProductDetails()  // Loading ProductDetails from network/database
        ...                             // Getting ProductDetails from repository and updating productDetails LiveData
    }

    fun loadSpecialOffers() {           // public, intended to be invoked by other classes when needed
        repository.getSpecialOffers()   // Loading SpecialOffers from network/database
        ...                             // Getting SpecialOffers from repository and updating _specialOffers LiveData
    }

    fun getProductDetails(): LiveData<Resource<ProductDetails>> {   // Simple getter
        return productDetails
    }

    fun getSpecialOffers(): LiveData<Resource<SpecialOffers>> {     // Simple getter
        return specialOffers
    }
}

class ProductActivity : AppCompatActivity() {

    lateinit var productViewModelFactory: ProductViewModelFactory

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val viewModel = ViewModelProviders.of(this, productViewModelFactory).get(ProductViewModel::class.java)

        viewModel.getProductDetails().observe(this, Observer { /*...*/ })    // Just setting observer
        viewModel.getSpecialOffers().observe(this, Observer { /*...*/ })     // Just setting observer

        button_offers.setOnClickListener { viewModel.loadSpecialOffers() }
    }
}
```

## 3. Leaking ViewModels
[Highlight](https://developer.android.com/topic/libraries/architecture/viewmodel#implement) dưới đây yêu cầu rõ ràng rằng chúng ta không nên truyền tham chiếu của view cho ViewModel. 

![](https://images.viblo.asia/a1e8dc22-3e60-4caf-bc0d-eefcf2a7139f.PNG)

Nhưng chúng ta cũng nên cẩn thận về việc truyền tham chiếu của các class khác đến ViewModel. Sau khi Activity (tương tự với Fragment) được finish. ViewModel không được tham chiếu đến bất kì object nào khác có thể tồn tại lâu hơn Activity, điều này để đảm bảo rằng ViewModel có thể được garbage collected.

Một ví dụ về leak đó là chúng ta truyền vào ViewModel một listener của Repository, cái này có scoped là Singleton, và listener không được dọn dẹp sau đó. 
```java
@Singleton
class LocationRepository() {

    private var listener: ((Location) -> Unit)? = null

    fun setOnLocationChangedListener(listener: (Location) -> Unit) {
        this.listener = listener
    }

    private fun onLocationUpdated(location: Location) {
        listener?.invoke(location)
    }
}


class MapViewModel: AutoClearViewModel() {

    private val liveData = MutableLiveData<LocationRepository.Location>()
    private val repository = LocationRepository()

    init {
        repository.setOnLocationChangedListener {   // Risky: Passing listener (which holds reference to the MapViewModel)
            liveData.value = it                     // to singleton scoped LocationRepository
        }
    }
}
```

Giải pháp ở đây đó là chúng ta có thể remove listener trong `onCreated()`, lưu trữ nó như `WeakReference` trong Repository, sử dụng LiveData để giao tiếp giữa Repository và ViewModel hoặc về cơ bản là bất cứ điều gì miễn nó phù hợp và đảm bảo garbage collection chính xác. 
```java
@Singleton
class LocationRepository() {

    private var listener: ((Location) -> Unit)? = null

    fun setOnLocationChangedListener(listener: (Location) -> Unit) {
        this.listener = listener
    }

    fun removeOnLocationChangedListener() {
        this.listener = null
    }

    private fun onLocationUpdated(location: Location) {
        listener?.invoke(location)
    }
}


class MapViewModel: AutoClearViewModel() {

    private val liveData = MutableLiveData<LocationRepository.Location>()
    private val repository = LocationRepository()

    init {
        repository.setOnLocationChangedListener {   // Risky: Passing listener (which holds reference to the MapViewModel)
            liveData.value = it                     // to singleton scoped LocationRepository
        }
    }
  
    override onCleared() {                            // GOOD: Listener instance from above and MapViewModel
        repository.removeOnLocationChangedListener()  //       can now be garbage collected
    }  
}
```

## 4. Exposing LiveData as mutable to views
Các View, Fragment và Activity - có thể không thể cập nhật được LiveData và trạng thái của chúng bởi vì đó là trách nhiệm của ViewModels. Các View chỉ có thể quan sát LiveData.

Do đó, chúng ta nên đóng gói quyền truy cập vào MutableLiveData, vd. getters hoặc sao lưu các thuộc tính.
```java
class CatalogueViewModel : ViewModel() {

    // BAD: Exposing mutable LiveData
    val products = MutableLiveData<Products>()


    // GOOD: Encapsulate access to mutable LiveData through getter
    private val promotions = MutableLiveData<Promotions>()

    fun getPromotions(): LiveData<Promotions> = promotions


    // GOOD: Encapsulate access to mutable LiveData using backing property
    private val _offers = MutableLiveData<Offers>()
    val offers: LiveData<Offers> = _offers


    fun loadData(){
        products.value = loadProducts()     // Other classes can also set products value
        promotions.value = loadPromotions() // Only CatalogueViewModel can set promotions value
        _offers.value = loadOffers()        // Only CatalogueViewModel can set offers value
    }
}
view raw
```

## 5. Creating ViewModel’s dependencies after every configuration change
ViewModels tồn tại các thay đổi cấu hình như rotations. Do đó, việc tạo ra các phụ thuộc của chúng mỗi khi thay đổi xảy ra chỉ đơn giản là dư thừa và đôi khi có thể dẫn đến hành vi ngoài ý muốn, đặc biệt là nếu có logic đưa vào các hàm khởi tạo phụ thuộc.

Mặc dù điều này nghe có vẻ khá rõ ràng, nhưng nó có một điều mà chúng ta có thể bỏ qua khi sử dụng ViewModelFactory, đó là thường có cùng các phụ thuộc như ViewModel được tạo ra.

ViewModelProvider giữ instance của ViewModel, chứ không phải là instance ViewModelFactory, vì vậy nếu chúng ta có code như thế này:
```java 
class MoviesViewModel(
    private val repository: MoviesRepository,
    private val stringProvider: StringProvider,
    private val authorisationService: AuthorisationService
) : ViewModel() {
    
    ...
}


class MoviesViewModelFactory(   // We need to create instances of below dependencies to create instance of MoviesViewModelFactory
    private val repository: MoviesRepository,
    private val stringProvider: StringProvider,
    private val authorisationService: AuthorisationService
) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {  // but this method is called by ViewModelProvider only if ViewModel wasn't already created
        return MoviesViewModel(repository, stringProvider, authorisationService) as T
    }
}


class MoviesActivity : AppCompatActivity() {

    @Inject
    lateinit var viewModelFactory: MoviesViewModelFactory

    private lateinit var viewModel: MoviesViewModel

    override fun onCreate(savedInstanceState: Bundle?) {    // Called each time Activity is recreated
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_movies)

        injectDependencies() // Creating new instance of MoviesViewModelFactory

        viewModel = ViewModelProviders.of(this, viewModelFactory).get(MoviesViewModel::class.java)
    }
    
    ...
}
```

Mỗi lần config thay đổi xảy ra, chúng ta sẽ tạo một instance mới của ViewModelFactory và do đó không cần thiết phải tạo ra các instance mới của tất cả các phụ thuộc của nó (giả sử rằng chúng không phải là scoped nào khác).

Giải pháp lần này đó là trì hoãn việc tạo ra các phụ thuộc cho đến khi phương thức `create()`
thật sự được gọi, bởi vì nó chỉ được gọi một lần trong suốt vòng đời của Activity/Fragment. Chúng ta có thể làm điều này bằng việc sử dụng khởi tạo lazy, ví dụ: [Providers](https://docs.oracle.com/javaee/7/api/javax/inject/Provider.htmlhttps://docs.oracle.com/javaee/7/api/javax/inject/Provider.html) 
```java
class MoviesViewModel(
    private val repository: MoviesRepository,
    private val stringProvider: StringProvider,
    private val authorisationService: AuthorisationService
) : ViewModel() {
    
    ...
}


class MoviesViewModelFactory(
    private val repository: Provider<MoviesRepository>,             // Passing Providers here 
    private val stringProvider: Provider<StringProvider>,           // instead of passing directly dependencies
    private val authorisationService: Provider<AuthorisationService>
) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {  // This method is called by ViewModelProvider only if ViewModel wasn't already created
        return MoviesViewModel(repository.get(),                    
                               stringProvider.get(),                // Deferred creating dependencies only if new insance of ViewModel is needed
                               authorisationService.get()
                              ) as T
    }
}


class MoviesActivity : AppCompatActivity() {

    @Inject
    lateinit var viewModelFactory: MoviesViewModelFactory

    private lateinit var viewModel: MoviesViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_movies)
      
        injectDependencies() // Creating new instance of MoviesViewModelFactory

        viewModel = ViewModelProviders.of(this, viewModelFactory).get(MoviesViewModel::class.java)
    }
    
    ...
}
```

## Tham khảo
1. https://proandroiddev.com/5-common-mistakes-when-using-architecture-components-403e9899f4cb