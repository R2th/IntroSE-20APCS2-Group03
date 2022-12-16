Architecture Components- ngày càng trở nên phổ biến và được ưa chuộng trong cộng đồng developer Android. Nhưng khi apply kỹ thuật mới này, vô tình chúng ta sẽ gặp phải 1 số lỗi - dù nhiều hay ít, cũng sẽ gây ảnh hưởng đến performance của app. Sau đây là 5 lỗi mà chúng ta thường gặp, đặc biệt các bạn mới sử dụng.

**1. Leaking LiveData observers trong các Fragment**

Các fragment có vòng đời phức tạp: khi một fragment detached và re-attached, không phải lúc nào nó cũng bị destroy, ví dụ, các fragment được retain không bị destroy trong các thay đổi cấu hình. Khi điều này xảy ra, instance của fragment tồn tại và chỉ view của nó bị destroy, do đó onDestroy () không được gọi và không đạt được trạng thái DESTROYED.

Điều này có nghĩa là chúng ta bắt đầu observe các LiveData trong onCreateView () hoặc sau đó (thường ở trên ActivityCreated ()) và chuyển Fragment thành LifecycleOwner như sau:

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

chúng ta sẽ cuộn lên một phiên bản mới của Observer mỗi khi fragment được re-attached, nhưng LiveData sẽ không remove các observe trước đó, vì LifecycleOwner (Fragment) không đạt được trạng thái DESTROYED. đang hoạt động cùng một lúc và cùng một mã từ onChanged () đang được thực thi nhiều lần. Điều này cuối cùng dẫn đến số lượng các observer giống nhau đang gia tăng cùng một lúc và cùng code từ onChanged () được thực hiện nhiều lần.

Giải pháp được đề xuất là sử dụng getViewLifecycleOwner () hoặc getViewLifecycleOwnerLiveData () được thêm vào trong Support Library 28.0.0 và AndroidX 1.0.0, để LiveData sẽ loại bỏ observer mỗi  lần view của fragment bị hủy:

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

**2. Reloading data sau mối lần rotation**

Chúng ta đã quen đặt logic khởi tạo và thiết lập trong onCreate () trong các Activity (và bằng cách tương tự trong onCreateView () hoặc sau đó trong Fragments) để có thể tải một số dữ liệu trong ViewModels tại thời điểm này. Tùy thuộc vào logic của bạn, tuy nhiên có thể gây ra tải lại dữ liệu sau mỗi rotation (mặc dù một ViewModel đã được sử dụng), mà trong nhiều trường hợp chỉ là vô nghĩa và không mong muốn.

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

Giải pháp cũng phụ thuộc vào logic của bạn. Nếu ví dụ, Repository có cơ chế cache data thì có vẻ sẽ ổn. Các giải pháp khác cũng có thể là:

* Sử dụng một cái gì đó tương tự như AbsentLiveData và chỉ bắt đầu tải khi data chưa được set
* Bắt đầu tải dữ liệu khi thực sự cần thiết, ví dụ: trong OnClickListener
* và có lẽ là đơn giản nhất: đặt các loading call trong constructor của ViewModel và hiển thị các getters thuần túy

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

**3. Leaking ViewModels**

Điều này đã được đánh dấu rõ ràng rằng chúng ta không nên chuyển các tham chiếu View tới ViewModel

![](https://images.viblo.asia/f13587d0-d3b7-4bac-834b-a8971bc0dc07.png)

nhưng chúng ta cũng nên thận trọng khi chuyển các tham chiếu của ViewModels đến các class khác. Sau khi một Activity (hoặc Fragment) được finish, ViewModel không nên được tham chiếu trong bất kỳ đối tượng nào có thể sống lâu hơn Activity, vì vậy ViewModel có thể được giải phóng.

Ví dụ leak có thể được truyền trong ViewModel bởi một listener đến Repository, đó là Singleton scoped, và không xóa listener sau đó:

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

Giải pháp ở đây có thể loại bỏ listener trong method onCleared (), lưu trữ nó như là WeakReference trong Repository, sử dụng LiveData để giao tiếp giữa Repository và ViewModel - hoặc về cơ bản bất cứ thứ gì phù hợp với bạn và đảm bảo thu gom rác đúng.

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

**4. Hiển thị LiveData dưới dạng mutable tới View**

Đây không phải là một bug, nhưng nó đi ngược lại việc phân tách các mối quan tâm.
Views- Fragment hay Activity - không thể cập nhật LiveData vì đó là trách nhiệm của ViewModel. View chỉ nên observe LiveData.

Do đó chúng ta nên đóng gói quyền truy cập vào MutableLiveData:

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
```

**5. Tạo phụ thuộc của ViewModel mỗi khi thay đổi cấu hình**

ViewModels tồn tại các configuration changes như rotation, do đó, tạo phụ thuộc của chúng mỗi khi thay đổi xảy ra chỉ đơn giản là thừa và đôi khi có thể dẫn đến hành vi không mong muốn, đặc biệt nếu có logic đưa vào các hàm tạo phụ thuộc.

Mặc dù điều này nghe có vẻ khá rõ ràng nhưng dễ bị bỏ qua khi sử dụng ViewModelFactory, thường có các phụ thuộc giống như ViewModel mà nó tạo ra.

ViewModelProvider bảo tồn cá thể ViewModel, nhưng không phải là cá thể ViewModelFactory, vì vậy nếu chúng ta có code như sau:

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

mỗi lần thay đổi cấu hình xảy ra, chúng ta sẽ tạo một phiên bản mới của ViewModelFactory và do đó không cần tạo các phiên bản mới của tất cả các phụ thuộc của nó.

Giải pháp lần này là trì hoãn việc tạo các phụ thuộc cho đến khi phương thức create () thực sự được gọi, bởi vì nó được gọi chỉ một lần trong suốt quãng đời của Fragment / Activity. 

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

Nguồn: https://proandroiddev.com/5-common-mistakes-when-using-architecture-components-403e9899f4cb