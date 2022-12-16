# 1. Giới thiệu
Hai mô hình MVP và MVVM là 2 mô hình được ưa thích và phổ biến nhất hiện này trong lập trình ứng dụng Android. Nhưng trong bài hướng dẫn này bạn sẽ được học một kiến trúc rất khác đó là MVI là một mô hình mới nhất hiện này.
<br>Bài hướng dẫn này bao gồm:
1. MVI là gì và nó hoạt động như thế nào
2. Các thành phần của MVI
3. Cách thức hoạt động của luồng đơn hướng
4. Ưu điểm và nhược điểm của MVI so với các mô hình kiến trúc khác
# 2. MVI là gì?
MVI là viết tắt của Model-View-Intent. MVI là một trong những mẫu kiến trúc mới nhất dành cho Android
<br> Mô hình MVI hoạt động rất khác so với các mô hình MVP, MVVP...Các thành phần trình của nó bao gồm:
* `Model represents a state `: Model trong MVI phải là bất biến để đảm bảo luồng dữ liệu đơn hướng giữa chúng và các lớp khác trong kiến trúc của bạn
* `View (User Interface)` : Cũng giống như mô hình MVP.
* `Intent ` :đại diện cho một ý định hoặc mong muốn thực hiện một hành động, bởi người dùng hoặc chính ứng dụng. Đối với mọi hành động, View nhận được Intent. Presenter sẽ quan sát hành động đó và Model chuyển nó sang trạng thái mới.
## 2.1. Model

Các kiến trúc khác triển khai Model dưới dạng một lớp để chứa dữ liệu và hoạt động như một cầu nối của ứng dụng đến cơ sở dữ liệu hay API. Tuy nhiên, trong MVI, Model vừa giữ dữ liệu vừa thể hiện trạng thái của ứng dụng.

Trạng thái của ứng dụng là gì?

Trong MVI, ứng dụng phản ứng với sự thay đổi, chẳng hạn như giá trị của biến hoặc một button click trên giao diện. Khi một ứng dụng phản ứng với sự thay đổi, nó sẽ chuyển sang trạng thái mới. Trạng thái mới có thể xuất hiện dưới dạng thay đổi giao diện người dùng với một tiến trình có thể là thay đổi màn hình.

Ví dụ: Model hoạt động trong MVI, hãy tưởng tượng bạn muốn lấy danh sách các phim phổ biến nhất từ một dịch vụ web như [API TMDB](https://www.themoviedb.org/). Trong một ứng dụng được xây dựng với mẫu MVP thông thường, Model là một lớp biểu thị dữ liệu như thế này:
```kotlin
data class Movie(
  var voteCount: Int? = null,
  var id: Int? = null,
  var video: Boolean? = null,
  var voteAverage: Float? = null,
  var title: String? = null,
  var popularity: Float? = null,
  var posterPath: String? = null,
  var originalLanguage: String? = null,
  var originalTitle: String? = null,
  var genreIds: List<Int>? = null,
  var backdropPath: String? = null,
  var adult: Boolean? = null,
  var overview: String? = null,
  var releaseDate: String? = null
)
```
Trong trường hợp này, Presenter chịu trách nhiệm sử dụng Model ở trên để hiển thị danh sách phim như sau:
```kotlin
class MainPresenter(private var view: MainView?) {    
  override fun onViewCreated() {
    view.showLoading()
    loadMovieList { movieList ->
      movieList.let {
        this.onQuerySuccess(movieList)
      }
    }
  }
  
  override fun onQuerySuccess(data: List<Movie>) {
    view.hideLoading()
    view.displayMovieList(data)
  }
}
```
Mặc dù các xử lý này không hề tồi nhưng vẫn có một vài vẫn đề mà MVI cố găng giải quyết nó như sau:
* `Multiple inputs` : Trong MVP và MVVM, Presenter và ViewModel thường kết thúc với một số lượng lớn đầu vào và đầu ra để quản lý. Đây là vấn đề trong các ứng dụng lớn với nhiều tác vụ nền.
* `Multiple states `: Trong MVP và MVVM, logic nghiệp vụ và View có thể có các trạng thái khác nhau tại bất kỳ thời điểm nào. Chúng ta thường  đồng bộ hóa trạng thái với Observable và Observer callbacks, nhưng điều này có thể dẫn đến xung đột.
<br>=> Để giải quyết vấn đề này, Model của bạn đại diện cho trạng thái chứ không phải dữ liệu.
<br>Sử dụng ví dụ trước, đây là cách bạn có thể tạo Model đại diện cho trạng thái:
```kotlin
sealed class MovieState {
  object LoadingState : MovieState()
  data class DataState(val data: List<Movie>) : MovieState()
  data class ErrorState(val data: String) : MovieState()
  data class ConfirmationState(val movie: Movie) : MovieState()
  object FinishState : MovieState()
}
```
Khi bạn tạo Model theo cách này, bạn không còn phải quản lý trạng thái ở nhiều nơi giống như View, Presenters hoặc ViewModel. Model sẽ cho biết khi nào ứng dụng của bạn sẽ hiển thị một Progress bar, thông báo lỗi hoặc danh sách các mục.
<br> Ví dụ về Presenter như sau :
```kotlin
class MainPresenter {
  
  private val compositeDisposable = CompositeDisposable()
  private lateinit var view: MainView

  fun bind(view: MainView) {
    this.view = view
    compositeDisposable.add(observeMovieDeleteIntent())
    compositeDisposable.add(observeMovieDisplay())
  }
  
  fun unbind() {
    if (!compositeDisposable.isDisposed) {
      compositeDisposable.dispose()
    }
  }
  
  private fun observeMovieDisplay() = loadMovieList()
      .observeOn(AndroidSchedulers.mainThread())
      .doOnSubscribe { view.render(MovieState.LoadingState) }
      .doOnNext { view.render(it) }
      .subscribe()
}
```
Presenter hiện có một đầu ra: trạng thái của View. Điều này được thực hiện với View ```render ()```, chấp nhận trạng thái hiện tại của ứng dụng làm đối số.

Một đặc điểm khác biệt của các models trong MVI là chúng không thể thay đổi để duy trì business logic của bạn. Bằng cách này, bạn có thể chắc chắn rằng Model của bạn sẽ không bị sửa đổi ở nhiều nơi. Chúng sẽ duy trì một trạng thái duy nhất trong toàn bộ vòng đời của ứng dụng.

Sơ đồ sau minh họa sự tương tác giữa các lớp khác nhau:
![](https://images.viblo.asia/fb107596-7113-46e6-bf2f-2a006d67b037.png)
Nhờ tính bất biến của các Model của bạn và vòng đời của các lớp trong chu trình, nó mang lại các lợi ích sau:
* `Single State`: Do cấu trúc dữ liệu bất biến rất dễ xử lý và phải được quản lý ở một nơi, bạn có thể chắc chắn sẽ có một trạng thái duy nhất giữa tất cả các lớp trong ứng dụng của bạn.
* `Thread Safety`: Điều này đặc biệt hữu ích khi làm việc với các ứng dụng phản ứng sử dụng các thư viện như RxJava hoặc LiveData. Vì không có phương pháp nào có thể sửa đổi Model của bạn, nên chúng sẽ luôn cần được tạo lại và giữ ở một nơi duy nhất. Điều này bảo vệ chống lại các tác dụng phụ như các đối tượng khác nhau sửa đổi Model của bạn từ các luồng khác nhau.

Tiếp theo, hãy xem Views and Intents
## 2.2. Views and Intents
Giống như với MVP, MVI xác định giao diện cho View, nó được thể hiện ở Fragment or Activity. View trong MVI có xu hướng có một `render()` chấp nhận trạng thái để hiển thị trên màn hình. Views trong MVI sử dụng Observable `render()`  để đáp ứng với hành động của người dùng. Mặt khác, MVP thường sử dụng tên phương thức dài dòng để xác định các đầu vào và đầu ra khác nhau.
<br> View trong MVI có thể như sau:
```kotlin
class MainActivity : MainView {
  
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
  }
    
  //1
  override fun displayMoviesIntent() = button.clicks()
    
  //2
  override fun render(state: MovieState) {
    when(state) {
      is MovieState.DataState -> renderDataState(state)
      is MovieState.LoadingState -> renderLoadingState()
      is MovieState.ErrorState -> renderErrorState(state)
    }
  }
    
  //4
  private fun renderDataState(dataState: MovieState.DataState) {
      //Render movie list
  }
    
  //3
  private fun renderLoadingState() {
      //Render progress bar on screen
  }
	
  //5
  private fun renderErrorState(errorState: MovieState.ErrorState) {
      //Display error mesage
  }
}
```
Các phương thức :
1. `displayMoviesIntent` : Liên kết các UI actions đến các intents hợp. Trong trường hợp này, nó liên kết button click Observable như một ý định. Điều này sẽ được xác định là một phần của MainView của bạn.
2. `render` : Ánh xạ ViewState của bạn tới các phương thức chính xác trong View của bạn. Điều này cũng sẽ được xác định là một phần của MainView của bạn
3.` renderDataState` : Render dữ liệu Model cho View. Dữ liệu này có thể là bất cứ thứ gì như dữ liệu thời tiết, danh sách phim hoặc lỗi. Điều này thường được định nghĩa là một phương pháp nội bộ để cập nhật màn hình dựa trên trạng thái.
4. `renderLoadingState `: Render một loading trong View
5. renderErrorState  : Render một thông báo lỗi trong View
<br>Ví dụ về một kết `render()` nhận trạng thái ứng dụng của bạn từ Presenter và Intent được kích hoạt bằng một lần click. Kết quả là thay đổi giao diện người dùng như thông báo lỗi hoặc màn hình loading.
## 2.3. State Reducers
Với các Model có thể thay đổi, bạn có thể dễ dàng thay đổi trạng thái của ứng dụng. Để thêm, xóa hoặc cập nhật một số dữ liệu cơ bản, hãy gọi một phương thức trong Model của bạn như sau:
```kotlin
myModel.insert(items)
```

# 3. Ưu điểm và nhược điểm của MVI
Nhược điểm:
* Một nhược điểm của việc sử dụng MVI thay vì các mẫu kiến trúc khác cho Android là học mô hình này khó hơn. Bạn cần một lượng kiến thức kha khá về lập trình đa luồng và RxJava. Các mẫu kiến trúc như MVC hoặc MVP có thể dễ nắm bắt hơn đối với các nhà phát triển Android mới.

<br>Ưu điểm chính của MVI là:
* Luồng dữ liệu đơn hướng và theo chu kỳ
* Trạng thái nhất quán trong vòng đời của View
* Model bất biến cung cấp hành vi đáng tin cậy và an toàn luồng trên các ứng dụng lớn.
# 4. Tổng kết
Mô hình MVI mang lại những điều mới mẻ trong phong cách lập trình và tư duy logic về xử lý dữ liệu trong lập trình Android. Hi vọng bài chia sẻ này sẽ giúp bạn có cái nhìn tổng quan về mô hình mới trong lập trình Android
# 5. Tài liệu tham khảo
* Bài viết được dịch theo bài : https://www.raywenderlich.com/817602-mvi-architecture-for-android-tutorial-getting-started