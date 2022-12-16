Trước đây, việc bảo trì ứng dụng Android khá là khó khăn. Một lý do chủ yếu của vấn đề này là do các activity, fragment và các view thường được liên kết chặt chẽ với nhau. Để khắc phục tình trạng này, cộng đồng phát triển ứng dụng cho Android đã đưa ra ý tưởng sử dụng mô hình MVP (Model-View-Presenter) để tăng tính phân tách code trong ứng dụng. Đến năm 2017, Google đã nhẹ nhàng thúc đẩy việc sử dụng mô hình MVVM (Model-View-ViewModel) bằng việc tung ra thành phần ViewModel trong bộ Architecture Components với mục đích chính là giúp quản lý vòng đời của Android tốt hơn. Trong bài viết này, mình muốn chia sẻ kinh nghiệm về quá trình thực hiện module hóa ứng dụng, nhằm giúp ứng dụng trở nên dễ dang mở rộng, bảo trì cũng như có thể kiểm thử dễ dàng hơn. Chúng ta sẽ thảo luận về kiến trúc của ứng dụng, tại sao cần áp dụng việc module hóa cũng như cách để module hóa. Cùng với đó là mô hình MV* nào được sử dụng và thứ mà ta học được từ nó.
# Kiến trúc
Vào năm 2017, dự án mình đang thực hiện đối mặt với một vấn đề rằng code được xây dựng không còn khả năng bảo trì nữa. Code được xây dựng trên mô hình MVP triển khai không đúng cách, làm nó khó có thể mở rộng và nhiều rủi ro khi triển khai thêm các tính năng mới.
Năm sau đó, dự án của mình có cơ hội để viết lại ứng dụng từ đầu. Team đã thảo luận và tìm những kiến trúc có thể áp dụng vào dự án, nhằm tăng tính phân tách code, giúp việc mở rộng hiệu quả và có thể kiểm thử dễ dàng, giúp tăng chất lượng của dự án. Cuối cùng, một mô hình kiến trúc được đưa ra với cảm hứng dựa trên [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) của Uncle Bob.
![](https://images.viblo.asia/9ba1a2dc-5a81-4a9f-9606-817d05aa346e.png)
Từ hình ảnh trên, rõ ràng đây là một kiến trúc đơn giản mà ở đó có sự phân tách rõ ràng giữa các lời gọi API với logic của database cụ bộ (tầng data) hay logic của UI (tầng presentation). Với kiến trúc này, ta chỉ cần hiển thị các interface của repository tới tầng presentation; tầng presentation sẽ không thể biết được dữ liệu tới từ lời gọi API hay database cụ bộ. Do đó, ta có thể dễ dàng chuyển data source mà không làm ảnh hưởng tới tầng presentation.
Thêm vào đó, việc thêm Unit Test cho dự án cũng trở nên dễ dàng hơn bởi ta chỉ cần test từng layer. Với data layer, ta chỉ cần xác minh dữ liệu được lấy về chính xác hay test local database có thực hiện việc thêm, sửa, xóa item chính xác hay không. Còn đối với presentation layer, chúng ta chỉ cần kiểm tra mỗi view model có phát ra trạng thái đúng hay không khi thực hiện các hành động.
Rõ ràng, với phương pháp này, ta có thể phân tách ứng dụng thành hai layer/module. Nhưng tại sao cần phải module hóa khi chúng ta có thể tách chúng thành các package? Trong trường hợp này, có hai lý do:
1. Dự án dự định sử dụng Kotlin để phát triển, do đó nên sử dụng những tính năng mới của Kotlin. Với Kotlin, access modifier `internal` được thêm vào giúp ta có thể làm cho các class/ function/ variable chỉ xuất hiện ở một module, từ đó tăng tường các biện pháp đảm bảo sự phân tách giữa các layer.
2. Việc chia tách module giúp tăng tính linh động khi sử dụng cùng một data layer cho những ứng dụng khác mà không phải lo lắng về vẫn đề bị ràng buộc với UI hay presentation layer.
# Triển khai module hóa
Như đã trình bày ở trên, project được chia thành hai module: module data và module app.
* Module data: chứa các lời gọi API, local database và tuân theo repository pattern. Thứ được expose là các repository interface.
* Module app: chứa tất cả code liên quan tới UI. Nó chứa tất cả activity, fragment, view, ... Module này sẽ phụ thuộc vào module data. 
![](https://images.viblo.asia/14b8d3f8-9026-4a4a-908e-d36b5c094310.png)
Tiếp theo, là vấn đề làm thế nào để cung cấp các repository với module app mà không cần expose các class cài đặt của chúng. Câu trả lời được đưa ra ở đây là Dagger2, một thư viện dependency injector cho Android và Java.
Các dagger component được khởi tạo bên trong module data, được gọi là DataComponent, cung cấp tất cả các repository mà presentation layer có thể cần tới.
```
@Component
interface DataComponent {
   fun providesSampleRepository() : SampleRepository
   ...
}
```
Để presentation layer có thể sử dụng các repository này, một dagger component được khởi tạo, có tên là AppComponent và thêm DataComponent vào như là dependency của nó. Việc cung cấp này giúp cho AppComponent có thể truy cập vào các repository cả DataComponent.
```
@Component(dependencies = [
    DataComponent::class
])
internal interface AppComponent {...}
```
Một lưu ý nữa rằng các repository trong DataComponent được giới hạn để chỉ có một instance. Điều này đảm bảo rằng khi repository đã được khai báo, nó sẽ không khởi tạo nhiều instance khác nhau nhằm giảm bộ nhớ sử dụng.
## Mô hình MV*
Trước đây, dự án được áp dụng mô hình MVP để có thể phân tách business logic khỏi các activity và fragment. Các interface được tạo cho cả view và presenter có thể ghi đè, do đó chúng không liên lạc trực tiếp với nhau.
Đó là một cách tiếp cận hữu ích để giảm tải công việc cho activity và fragment. Tuy nhiên, presenter vẫn sẽ giữ một tham chiếu tới view bên trong nó. Điều này khiến tình trạng memory leak có thể xảy ra khi view đã bị hủy mà presenter của nó vẫn chưa dừng lại.
Với việc làm lại dự án, ngoài các ưu điểm sẵn có của MVP, hai vấn đề cần được thêm vào gồm:
* Tìm cách để đảm bảo rằng không có tham chiếu tới view, khiến cho business logic không biết về sự tồn tại của view.
* Tìm cách để đảm bảo rằng các background process sẽ dừng lại khi tiến trình chết.
Và mô hình MVVM **(Model  -  View - ViewModel)** là câu trả lời.
## Cài đặt mô hình MVVM
Có nhiều cách khác nhau để cài đặt MVVM, một số cách sử dụng data binding, một số cách lại không. Tuy nhiên, có một thứ luôn phải đảm bảo rằng ViewModel sẽ không có nhận thức về sự tồn tại của View và View sẽ phải lắng nghe, quan sát ViewModel.
Để có thể cài đặt mô hình MVVM, dự án đã sử dụng thành phần [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel) của bộ Architecture Components mà Google phát hành. Cùng với đó là [LiveData](https://developer.android.com/topic/libraries/architecture/livedata) và sealed class của Kotlin. Thư viện Dât Binding không được sử dụng vì không thực sự cần thiết.
Để minh họa, mình sẽ trình bày một ví dụ ở màn hình tìm kiếm. Màn hình này cho phép người dùng có thể tìm kiếm một địa điểm, hiển thị kết quả nếu tìm thấy và hiển thị thông báo nếu không có kết quả phù hợp.

![](https://images.viblo.asia/f4d9c0dc-f01d-4651-a705-15fd8f1887d1.png)
### State (Model)
State là thứ mà ta sẽ xem như là Model trong mô hình MVVM. Nó chứa các thông tin để View có thể render. Sử dụng sealed class trong Kotlin, ta sẽ định nghĩa các trạng thái mà màn hình search có thể có, bao gồm: InitState, SearchState, NoResultState và SearchResultState.
```
internal sealed class SearchState {
    /**
     * Initial state of search
     */
    object InitState : SearchState()
    
    /**
     * State when search is ongoing (fetching from API)
     */
    object SearchingState : SearchState()

    /**
     * State when there are no results found from the search string provided
     *
     * @param searchString - string used to search
     */
    data class NoResultState(val searchString: String) : SearchState()

    /**
     * State with search results
     *
     * @param searchedPlaces - list of places returned for a given search
     */
    data class SearchResultState(val searchedPlaces: List<Place>) : SearchState()
}
```
### ViewModel
ViewModel chứa logic để tìm kiếm một địa điểm dựa trên từ khóa được nhập vào. Nó dữ State bằng một LiveData và phát ra State cho View quan sát.
```
internal class SearchViewModel : ViewModel() {
    private val _searchState = MutableLiveData<SearchState>()
    val searchState: LiveData<SearchState> = _searchState
    
    fun searchPlaces(searchString: String?) {
        searchString?.takeIf { it.trim().length >= SEARCH_MIN_INPUT_CHARS }?.let {
            Observable.timer(
                    SEARCH_THROTTLE_INTERVAL,
                    TimeUnit.MILLISECONDS
            ).flatMap {
                placeRepository.search(searchString)
            }.doOnSubscribe {
                _searchState.postValue(SearchState.SearchingState)
            }.subscribe({
                if (it.isEmpty()) _searchState.postValue(SearchState.NoResultState(searchString))
                else _searchState.postValue(SearchState.SearchResultState(it))
            }, {
                _searchState.postValue(SearchState.NoResultState(searchString))
            })
            return
        } ?: _searchState.postValue(SearchState.InitState)
    }
}
```
### View
View sẽ chỉ quan sát State mà ViewModel phát ra để có thể render ra giao diện người dùng.
```
internal class SearchActivity : BaseActivity() {

    @Inject
    lateinit var viewModelFactory: ViewModelProvider.Factory

    private val searchViewModel: SearchViewModel by lazy {
        ViewModelProviders.of(this, viewModelFactory)[SearchViewModel::class.java]
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        searchViewModel.searchState.observe(this, 
           Observer { state ->
             renderSearchState(state)
        })
    }

    private fun renderSearchState(searchState: SearchState?) {
        if (searchState == null) return
        when (searchState) {
            is SearchState.InitState -> renderInitState()
            is SearchState.SearchingState -> renderSearchingState()
            is SearchState.NoResultState -> {
                renderNoResultState(searchState.searchString)             
            }
            is SearchState.SearchResultState -> {
                renderSearchResultState(searchState.searchedPlaces)
            }
        }
    }
```
# Kết luận
Với việc triển khai mô hình MVVM dựa trên tư tưởng của Clean Architecture, có hai bài học được rút ra:
* Việc có một module data chỉ expose các interface của nó và các class cần thiết giúp chúng ta trong trường hợp khi gần kết thúc giai đoạn phát triển mà cần phải thay đổi data soucce. Do module app chỉ biết về interface và model nên ta có thể dễ dàng thay đổi datasouce mà không cần can thiệp vào module app.
* Thiết lập sơ đồ dependency sẽ gặp một chút khó khăn đối với các dự án có nhiều module. Cần phải inject một cách hợp lý các module.
# Tham khảo
Bài viết được tham khảo từ bài viết [*Our approach to modularization and MVVM*](https://medium.com/zoover-engineering/our-approach-to-modularization-and-mvvm-44aae0a3ea41)