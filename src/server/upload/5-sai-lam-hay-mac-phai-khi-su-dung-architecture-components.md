Hẳn là bộ thư viện Android Architecture Components đã không còn quá xa lạ với các Android Developer phải k nào?? Với những người mới tìm hiểu thì mình k nói nhưng thậm chí với 1 số các cao thủ thì có lẽ vẫn sẽ mắc phải 1 số sai lầm khi sử dụng Android Architecture Components. Mình tin chắc là vậy :))). Hoặc là nếu chưa từng mắc phải thì trong bài viết này mình cũng xin nêu ra 5 sai lầm phổ biến mà ta hay gặp phải khi sử dụng Architecture Components.
# 1. Leaking LiveData observers trong Fragment 
Vì Fragment có riêng 1 lifecycle cho riêng nó, thậm chí ngay cả khi Fragment bị detached và re-attached thì vẫn có thể là nó k bị destroy, ví dụ như trường hợp retained Fragment sẽ không bị destroy khi cấu hình thay đổi. Điều này có nghĩa là khi ta observing LiveData trong onCreateView() hay trong các callback sau đó (thường là onActivityCreated()) và pass Fragment như là LivecycleOwner như ví dụ 

```kotlin 
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
Đoạn code trên cho thấy sẽ luôn tạo ra Observer khi Fragment re-attached. Tuy nhiên LiveData sẽ k remove observer cũ vì LifecycleOwner (ở đây là Fragment) k bị destroy. Vậy để giải quyết vấn đề này ta sẽ sử dụng getViewLifecycleOwner() hoặc getViewLifecycleOwnerLiveData() thay vì truyền trực tiếp Fragment instance. 
# 2. Reloading data after every rotation
Thông thường ta hay đặt các xử lí logic trong onCreate() - đối với Activity, onCreateView - đối vs Fragment. Điều này tưởng chừng như đúng trong mọi trường hợp nhưng nếu ta để ý thì việc này sẽ k thực sự hiệu quả khi sử dụng cùng vs ViewModel. Bởi mỗi khi ta rotate màn hình thì activity hay fragment sẽ tạo lại, mà thằng ViewModel lại có cơ chế k bị destroy khi rotate. Chính vì thế việc đặt các logic trong trường hợp này có thể gây thừa (vì lại phải load lại data cũ). Để xử lí việc này đơn giản là ta chỉ cần đặt các logic load dữ liệu trong lúc khởi tạo ViewModel hoặc là chỉ load data khi thực hiện 1 hành động cụ thể nào đó. Như ví dụ dưới đây:
```kotlin
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

# 3. Leaking ViewModel
Như ta đã biết thì không nên pass View reference vào ViewModel. Tuy nhiên ta cũng không nên pass ViewModel reference vào các class khác. Ví dụ như trường hợp dưới đây:
```kotlin
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
Ở đây Repository được khai báo là Singleton và ta truyền listener vào Repository trong ViewModel nhưng lại k clear nó sau khi sử dụng xong. Để xử lí vấn đề này ta có thể làm như sau:
```kotlin
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
# 4. Exposing LiveData as mutable to views
Có nghĩa là Views-Fragment hay Activity không nên tự update LiveData mà hãy để ViewModel xử lí việc này. :))) Nhiệm vụ của View-Fragment hay Activity chỉ là observe LiveData mà thôi. Ví dụ:
```kotlin
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
```
# 5. Creating ViewModel’s dependencies after every configuration change
Vì ViewModel tồn tại trong các trường hợp configuration change, vì thế mà việc tạo dependencies mỗi lần cấu hình thay đổi như vậy là thừa, thậm chí có thể gây ra sự cố ngoài ý muốn. Đặc biệt là khi ta để các xử lí logic trong dependencies trong constructor. Ta thử xem qua ví dụ dưới đây:
```kotlin
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
Mỗi lần cấu hình thay đổi thì ta sẽ tạo 1 instance mới của ViewModelFactory vì thế mà ta không cần phải tạo ra instance mới của tất cả dependecies (ViewModelFactory có thể làm việc này).
Giải pháp ở đây là ta sẽ hoãn tạo dependencies cho đến khi hàm create() được gọi, bởi vì nó chỉ được gọi trong vòng đời của Activity hay Fragment. 
```kotlin
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
# Kết luận
Vậy là mình đã đưa ra cho các bạn 1 vài sai lầm hay gặp khi sử dụng Architecture Components. Mong rằng bài viết của mình sẽ hữu ích 1 chút đối vs các bạn :)). Nếu các bạn thấy có gì chưa hiểu hay không hợp lí thì hãy comment để đóng góp cho mình và mọi người khác nhé!! Thanks for reading :)))

Nguồn tham khảo: [Link đây nhé!](https://proandroiddev.com/5-common-mistakes-when-using-architecture-components-403e9899f4cb)