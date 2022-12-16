# Mở đầu 
Thời gian gần đây mình có tìm hiểu về Android Architecture Components và áp dụng vào trong các project. Các bạn có thể tham khảo các Android Architecture Components tại trang [Developer](https://developer.android.com/topic/libraries/architecture/) của Google. Ở bài này mình xin phép chỉ ra các lỗi mà mình hoặc các bạn có thể gặp khi thực hiện. 
## 1. Rò rỉ LiveData observers trong Fragments
Các Fragment có vòng đời phức tạp và khi một fragment bị detached và re-attached  thì không phải lúc nào nó cũng bị destroy. Ví dụ như trong trường hợp configuration changes thì fragment thì fragment được giữ lại chứ không bị hủy. Trong trường hợp này thì các biến instance của fragment này sẽ không bị hủy và chỉ view bị destroy nên hàm onDestroy() sẽ không được gọi và sẽ không trạng thái DESTROYED.
Điều này có nghĩa là khi chúng ta bắt đầu quan sat Live Data trong onCreateView() hoặc mới hơn (thường là ) trong onActivityCreated() và chuyển Fragment thành LifeCycleOwner:
```kotlin
class BlankFragment : Fragment() {

  companion object {
    fun newInstance(): BlankFragment {
      return BlankFragment()
    }
  }

  private lateinit var viewModel: BlankViewModel

  override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
      savedInstanceState: Bundle?): View? {
    // Inflate the layout for this fragment
    return inflater.inflate(R.layout.fragment_blank, container, false)
  }

  override fun onActivityCreated(savedInstanceState: Bundle?) {
    super.onActivityCreated(savedInstanceState)
    viewModel = ViewModelProviders.of(this).get(BlankViewModel::class.java)
    viewModel.liveData.observe(this,
        Observer<String> {it ->
          updateViews(it)
        })  // Rủi ro: Passing Fragment as LifecycleOwner
  }
}
```
Khi mỗi fragment được đính kèm lại thì LiveData sẽ không xóa các Observers trước đó vì LifecycleOwner (Fragment) không đạt được trạng thái DESTROYED.Điều này dẫn đến các Observers giống nhau được tạo nhiều lần và mỗi khi hàm onChanged() được gọi thì nó sẽ được thực hiện nhiều lần => lãng phí tài nguyên.

==> Cách gải quyết ở đây là theo dõi vòng đời của Fragment thông qua getViewLifecycleOwner() hoặc getViewLifecycleOwnerLiveData() được thêm vào Support Library 28.0.0 và AndroidX 1.0.0, sao cho LiveData sẽ xóa các Observers mỗi khi view bị hủy
```kotlin
  override fun onActivityCreated(savedInstanceState: Bundle?) {
    super.onActivityCreated(savedInstanceState)
    viewModel = ViewModelProviders.of(this).get(BlankViewModel::class.java)
    viewModel.liveData.observe(viewLifecycleOwner,
        Observer<String> {it ->
          updateViews(it)
        }) 
  }

```

## 2. Reload lại data mỗi khi có sự kiện xoay màn hình
Chúng ta đã quen đặt logic khởi tạo và thiết lập trong onCreate () trong các Activity (và bằng cách tương tự onCreateView () hoặc sau đó trong Fragments) để có thể kích hoạt load một số dữ liệu trong ViewModels tại thời điểm này. Tuy nhiên có thể gây ra tải lại dữ liệu sau mỗi lần xoay màn hình (mặc dù một ViewModel đã được sử dụng), mà trong nhiều trường hợp chỉ là vô nghĩa và không mong muốn.
```kotlin
class ImageViewModel(
    private val repository: ImageRepository
) : ViewModel() {

    private val iamgeDetails = MutableLiveData<ImageDetails>()
    private val imageLinks = MutableLiveData<ImageLinks>()

    fun getImageDetails(): LiveData<ImageDetails> {
        repository.getImageDetails()
        return imageDetails
    }

    fun loadImageLinks() {
        repository.getImageLinks()   
    }
}

class MainActivity : AppCompatActivity() {

    lateinit var imageViewModelFactory: ImageViewModelFactory

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val viewModel = ViewModelProviders.of(this, productViewModelFactory).get(ProductViewModel::class.java)
        viewModel.getProductsDetails().observe(this, Observer { /*...*/ })  
        //Reload image details sau mỗi lần xoay màn hình
        viewModel.loadImageLinks()                                       
        //Reload lại các link của ảnh sau mỗi lần xoay màn hình
    }
}
```
Các cách khắc phục phù thuộc vào logic của bạn. Ở đây mình có tìm hiểu được một số cách sau :
1. Sử dụng một cái gì đó tương tự như [AbsentLiveData](https://github.com/googlesamples/android-architecture-components/blob/master/GithubBrowserSample/app/src/main/java/com/android/example/github/util/AbsentLiveData.kt) và bắt đầu load dữ liệu chỉ khi dữ liệu chưa được set
2. Bắt đầu load dữ liệu khi thực sự cần thiết ví dụ như trong các listener ví dụ: OnClickListener()
3. Và có lẽ là đơn giản nhất: đặt các lời gọi load dữ liệu trong constructor của ViewModel và hiển thị các getters thuần túy
```kotlin
class ImageViewModel(
    private val repository: ImageRepository
) : ViewModel() {

    private val imageDetails = MutableLiveData<ImageDetails>()
    private val imageLinks = MutableLiveData<ImageLinks>()

    init {
    // ViewModel được tạo duy nhất 1 lần trong suốt vòng đời Activity/Fragment
        loadImageDetails()           
    }
    
    //Chỉ gọi ở constructor
    private fun loadImageDetails() { 
     // Lấy ImageDetails từ repository Và cập nhật ImageDetails LiveData
        repository.getProductDetails() 
        ...                            
    }

//được gọi ở các class khác khi cần
    fun loaddImageLinks() {         
        repository.getImageLinks() 
    }

//Getter
    fun getImageDetails(): LiveData<ImageDetails> {  
        return productDetails
    }

    fun getImaeLinks(): LiveData<ImageLinks> {   
        return imageLinks
    }
}

class ImageActivity : AppCompatActivity() {

    lateinit var imageViewModelFactory: ImageViewModelFactory

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val viewModel = ViewModelProviders.of(this, imageModelFactory).get(ImageViewModel::class.java)
        //chỉ thiết lập observe
        viewModel.getImageDetails().observe(this, Observer { /*...*/ })   
        viewModel.getImageLinks().observe(this, Observer { /*...*/ })
        button_links.setOnClickListener { viewModel.loadImageLinks() }
    }
}
```
## 3. Bị rò rỉ ViewModel
Điều này được lưu ý rõ ràng là chúng ta không được tham chiếu đến ViewModel từ View
![](https://images.viblo.asia/52214be2-fc05-4857-95dd-7adb5bc28672.png)
nhưng chúng ta cũng nên thận trọng khi chuyển các tham chiếu tới ViewModels đến các lớp khác. Sau khi một Activity (hoặc Fragment) được hoàn thành, ViewModel không nên được tham chiếu trong bất kỳ đối tượng nào có thể sống lâu hơn Activity, vì vậy ViewModel mới có thể được thu hồi bộ nhớ.
Ví dụ leak có thể được truyền trong ViewModel khi một listener đến Repository, đó là phạm vi Singleton, và không xóa listener sau đó:
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
    // Rủi ro: Passing listener (cái mà giữ tham chiếu tới MapViewModel)
        repository.setOnLocationChangedListener {   
            liveData.value = it            
        }
    }
}
```
=> Giải pháp ở đây có thể loại bỏ listener trong phương thức onCleared (), lưu trữ nó như là WeakReference trong Repository,sử dụng LiveData để giao tiếp giữa Repository và ViewModel - hoặc về cơ bản mọi thứ phù hợp với bạn và đảm bảo bộ nhớ được thu hồi đúng cách.
Thêm hàm onCleared() trong MapViewModel 
```kotlin
//giờ listtener đã được thu hồi
override onCleared() {                           
        repository.removeOnLocationChangedListener()  
    }  
```
## 4. Hiển thị LiveData dưới dạng mutable đối với views
Cái này không phải là 1 lỗi. Views - Fragments và Activities không thể cập nhật LiveData vì đó là trạng thái riêng và là trách nhiệm của ViewModels. Views sẽ chỉ có thể quan sát LiveData. Do đó chúng ta nên đóng gói quyền truy cập vào MutableLiveData ví dụ: getters hoặcbacking properties:
```kotlin
class CatalogueViewModel : ViewModel() {

    // Không nên hiển thị mutable LiveData
    val products = MutableLiveData<Products>()


    // Nên Đóng gói quyền truy cập vào LiveData tthoong qua getter
    private val promotions = MutableLiveData<Promotions>()

    fun getPromotions(): LiveData<Promotions> = promotions


    // Nên đóng gói uyền truy cập thông qua backing property
    private val offers = MutableLiveData<Offers>()
    val offers: LiveData<Offers> = offers


    fun loadData(){
    // Các lớp khác có thể set products value
        products.value = loadProducts()   
    // Chỉ CatalogueViewModel mới có thể set promotions value
        promotions.value = loadPromotions() 
    // Chỉ CatalogueViewModel mới có thể set offers value
        offers.value = loadOffers()        
    }
}
```
## 5. Tạo ViewModel’s dependencies sau mỗi lần configuration change
ViewModel tồn tại sau mỗi lần configuration change do đó, tạo ViewModel’s dependencies mỗi khi thay đổi xảy ra chỉ đơn giản là dư thừa và đôi khi có thể dẫn đến hành vi ngoài ý muốn, đặc biệt là khi có logic đưa vào dependencies constructors. Mặc dù điều này nghe có vẻ khá rõ ràng nhưng đó là điều dễ bị bỏ qua khi sử dụng ViewModelFactory, thường có các phụ thuộc giống như ViewModel mà nó tạo ra.
ViewModelProvider giữ ViewModel, nhưng không phải là ViewModelFactory, vì vậy nếu chúng ta có đoạn code như thế này:
```kotlin
class MoviesViewModel(
    private val repository: MoviesRepository,
    private val stringProvider: StringProvider,
    private val authorisationService: AuthorisationService
) : ViewModel() {

}


class MoviesViewModelFactory( 
    private val repository: MoviesRepository,
    private val stringProvider: StringProvider,
    private val authorisationService: AuthorisationService
) : ViewModelProvider.Factory {
// Nhưng method này chỉ được gọi bởi ViewModelProvider chỉ khi ViewModel không được tạo
    override fun <T : ViewModel> create(modelClass: Class<T>): T {  
        return MoviesViewModel(repository, stringProvider, authorisationService) as T
    }
}


class MoviesActivity : AppCompatActivity() {

    @Inject
    lateinit var viewModelFactory: MoviesViewModelFactory

    private lateinit var viewModel: MoviesViewModel
// Phương thức này được gọi bởi ViewModelProvider chỉ khi ViewModel chưa được tạo
    override fun onCreate(savedInstanceState: Bundle?) {    
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_movies)
// Tạo new instance của MoviesViewModelFactory
        injectDependencies() 
        viewModel = ViewModelProviders.of(this, viewModelFactory).get(MoviesViewModel::class.java)
    }

}
```
Mỗi lần thay đổi cấu hình xảy ra, chúng tôi sẽ tạo một instance mới của ViewModelFactory và do đó không cần tạo các instance mới của tất cả các phụ thuộc của nó.
```kotlin
class MoviesViewModel(
    private val repository: MoviesRepository,
    private val stringProvider: StringProvider,
    private val authorisationService: AuthorisationService
) : ViewModel() {

}


class MoviesViewModelFactory(
    private val repository: Provider<MoviesRepository>,            
    private val stringProvider: Provider<StringProvider>,        
    private val authorisationService: Provider<AuthorisationService>
) : ViewModelProvider.Factory {
 // Method này được gọi bởi ViewModelProvider chỉ khi nếu ViewModel không được tạo
    override fun <T : ViewModel> create(modelClass: Class<T>): T { 
     // chỉ tạo khi cần có new insance của ViewModel
        return MoviesViewModel(repository.get(),                    
                               stringProvider.get(),               
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
// tạo instance mới của MoviesViewModelFactory      
        injectDependencies() 
        viewModel = ViewModelProviders.of(this, viewModelFactory).get(MoviesViewModel::class.java)
    }

}
```

# Kết
Cảm ơn mọi người đã theo dõi bài viết của mình. Bài viết còn nhiều thiếu sót mong được mọi người góp ý. Bài viết có sử dụng nguồn từ 
https://developer.android.com/topic/libraries/architecture/viewmodel

https://medium.com/@marco_cattaneo/android-viewmodel-and-factoryprovider-good-way-to-manage-it-with-dagger-2-d9e20a07084c

https://proandroiddev.com/5-common-mistakes-when-using-architecture-components-403e9899f4cb

https://medium.com/androiddevelopers/viewmodels-and-livedata-patterns-antipatterns-21efaef74a54