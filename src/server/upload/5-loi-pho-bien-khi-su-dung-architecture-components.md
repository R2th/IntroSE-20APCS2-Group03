### 1. Rò rỉ LiveData observers trong Fragments
Các Fragments có vòng đời khó quản lý và khi một Fragment bị detached và re-attached, không phải lúc nào nó cũng thực sự bị destroyed, ví dụ, các Fragments được giữ lại không bị destroyed trong quá trình thay đổi cấu hình (configuration changes). Khi điều này xảy ra, đối tượng fragment còn tồn tại và chỉ có view của nó bị destroyed, do đó `onDestroy()` không được gọi và trạng thái DESTROYED không đạt được.
Điều này có nghĩa là nếu chúng ta bắt đầu observe LiveData trong `onCreateView()` hoặc sau đó(thường là trong `onActivityCreated()`) và truyền tham số Fragment dưới dạng LifecycleOwner như:
```
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
Đoạn code trên, chúng ta truyền một đối tượng Observer giống hệt nhau mỗi khi fragment được re-attached, nhưng LiveData đã không xoá bỏ các observers trước đó, bởi vì LifecycleOwner(Fragment) đã không bị DESTROYED. Điều này cuối cùng dẫn đến số lượng observers giống hệt nhau đang hoạt động cùng một lúc và cùng một đoạn code trong `onChanged()` sẽ được thực thi nhiều lần.

Giải pháp được đề xuất là sử dụng vòng đời view của fragment  thông qua getViewLifecycleOwner() hoặc getViewLifecycleOwnerLiveData() đã được thêm vào Thư viện support 28.0.0 và AndroidX 1.0.0, do đó LiveData sẽ xóa trình quan sát mỗi khi view bị destroyed:
```
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

### 2. Reload lại dữ liệu mỗi khi quay hướng màn hình
Chúng ta đã từng sử dụng logic khởi tạo và thiết lập trong onCreate() của Activities (và bằng cách tương tự onCreateView() hoặc sau đó của Fragment) để có thể kích hoạt tải một số dữ liệu trong ViewModels. Tuy nhiên, tùy thuộc vào logic của bạn, điều này có thể gây ra tải lại dữ liệu sau mỗi lần quay (mặc dù ViewModel đã được sử dụng), trong hầu hết các trường hợp chỉ là vô nghĩa và ngoài ý muốn.
Ví dụ:
```
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
Giải pháp cũng phụ thuộc vào logic của bạn. Nếu ví dụ, Repository sẽ cache dữ liệu thì đoạn code ở trên có thể sẽ ổn. Các giải pháp khác cũng có thể là:
* Sử dụng kiểu LiveData tương tự như  [AbsentLiveData](https://github.com/googlesamples/android-architecture-components/blob/master/GithubBrowserSample/app/src/main/java/com/android/example/github/util/AbsentLiveData.kt)  và chỉ bắt đầu tải nếu dữ liệu được set
* Bắt đầu tải dữ liệu khi nó thực sự cần thiết, ví dụ trong OnClickListener
* Và có lẽ là đơn giản nhất: đặt các cuộc gọi tải vào hàm tạo của ViewModel và hiển thị các getters thuần
```
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

### 3. Rò rỉ các ViewModels
Trong tài liệu đã được làm nổi bật rõ ràng rằng chúng ta không nên chuyển qua các tham chiếu View cho ViewModel. Nhưng chúng ta cũng nên thận trọng về việc chuyển các tham chiếu đến ViewModels cho các lớp khác. Sau khi một Activity (hoặc Fragment tương tự) được finished, ViewModel không nên được tham chiếu trong bất kỳ đối tượng nào có thể tồn tại lâu hơn Activity để ViewModel có thể được thu gom rác (garbage collected).

Ví dụ: Rò rỉ có thể được chuyển qua ViewModel một listener đến Repository, trong phạm vi Singleton và không xóa listener sau đó:
```
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
Giải pháp ở đây có thể là xoá bỏ listener trong phương thức onCleared(), lưu trữ nó dưới dạng WeakReference trong Repository, sử dụng LiveData để liên lạc giữa Repository và ViewModel, khi đó mọi thứ sẽ phù hợp với bạn và đảm bảo thu gom rác chính xác.
```
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
### 4. Truyền LiveData dưới dạng mutable tới view
Đây không phải là một lỗi, nhưng nó đi ngược lại nguyên lý của mô hình. Views - Fragments và Activities - không thể cập nhật LiveData và  trạng thái của nó vì đó là trách nhiệm của ViewModels. View chỉ có thể quan sát(observe) LiveData.

Do đó, chúng ta nên đóng gói quyền truy cập vào MutableLiveData bằng cách sử dụng getters hoặc thuộc tính sao lưu(backing properties):
```
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
### 5. Tạo các phụ thuộc của ViewModel sau mỗi lần thay đổi cấu hình
ViewModels vẫn còn tồn tại khi xảy ra các thay đổi cấu hình như xoay màn hình, do đó, việc tạo ra các phụ thuộc của chúng mỗi khi thay đổi xảy ra chỉ đơn giản là dư thừa và đôi khi có thể dẫn đến hành vi ngoài ý muốn, đặc biệt là nếu logic được đưa vào các hàm tạo phụ thuộc.
Mặc dù điều này nghe có vẻ khá rõ ràng, nhưng nó lại dễ dàng bị bỏ qua khi sử dụng ViewModelFactory, thường có cùng các phụ thuộc như ViewModel mà nó tạo ra.

ViewModelProvider bảo tồn các đối tượng ViewModel, nhưng không giữ lại ViewModelFactory, vì vậy nếu chúng ta có code như sau:
```
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
mỗi lần thay đổi cấu hình xảy ra, chúng ta sẽ tạo một đối tượng mới của ViewModelFactory và do đó không cần thiết phải tạo các đối tượng mới của tất cả các phụ thuộc của nó (giả sử rằng chúng không phải là phạm vi nào đó).

Giải pháp đưa ra là trì hoãn việc tạo các phụ thuộc cho đến khi phương thức create() thực sự được gọi, bởi vì nó chỉ được gọi một lần trong suốt vòng đời Activity/Fragment. Chúng ta có thể đạt được điều này bằng cách sử dụng, ví dụ, khởi tạo lazy với [Providers](https://docs.oracle.com/javaee/7/api/javax/inject/Provider.html):
```
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

Nguồn: https://proandroiddev.com/5-common-mistakes-when-using-architecture-components-403e9899f4cb