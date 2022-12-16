Mô hình **Unidiectional Data Flow(UDF)** đã tăng cường tính hữu ích và hiệu nặng cho Coinverse kể từ khi bản beta đầu tiên được phát hành vào tháng 2. Coinverse là ứng dụng đầu tiên tạo audiocasts về công nghệ và tin tức liên quan tới cryptocurrency. Các cập nhật sử dụng UDF bao gồm quá trình tạo tin tức hiệu quả hơn, loại bỏ các quảng cáo sát nhau, và quá trình tải audiocast nhanh hơn.

[***Android Unidirectional Data Flow - Sample App***](https://android.jlelse.eu/sample-app-android-unidirectional-data-flow-b9f8ad0fbca3).

Mô hình UDF được tổ chức trong ứng dụng thành ba vùng chính, **view state**, **events**, và **effects** cái đảm bảo cho ứng dụng tính chính xác và khả năng phân tách các module(module hóa). Tôi đã học về mô hình UDF từ episode 148 về Fragmented podcast, Evolving Android Architectures (Part 1) với Kaushik Gopal tại Instacart và Donn Felker. Lần đầu nghe về nó quả là thú vị, nhưng đã có nhiều thay đổi lớn. UDF trở thành hấp dẫn khi tôi fix bugs và tôi đã nhận ra các luồng(flows) trở lên rất phức tạp như thế nào.

Các ví dụ về UDF tôi đã thấy cho tới nay đã có với Rx. Rx là công cụ có sức mạnh và khả năng tùy biến tốt cho quá trình tạo các luồng dữ liệu cái có thể được lắng nghe thời gian thực. Tuy nhiên, LiveData cung cấp những lợi ích tương tự cho quá trình lắng nghe các trạng thái thay đổi và trên hết nó đơn giản, được tích hợp trực tiếp với architecture components của Android, và mặc định được xử lý theo các sự kiện vòng đời của Android. Nếu bạn không biết, hãy xem Jose Alcerreca tại Google nói về LiveData. Để bắt đầu, tôi đã tái cấu trúc các luồng nội dung tại newfeed bao gồm ContentFragment, ContentViewModel, và ContentRepository, trong Coinserve cũng như ở hướng dẫn bên dưới.

{@embed: https://www.youtube.com/watch?v=Elp-Z-pQTpM}

## UDF Background
Mô hình UDF còn gọi là Unidirectional Data or State Flow ban đầu được phổ biến trong phát triển ứng dụng web của Facebook như quản lý trạng thái React và Readux, và các thư viện Flux UI. Những thử nghiệm cho Android có thể sớm được tìm thấy từ [Biran Egan](https://medium.com/u/e363db1ba716?source=post_page-----bf24119e747----------------------) và [Guillaume Lung](https://medium.com/u/d85794e20ff7?source=post_page-----bf24119e747----------------------) tại SoundCloud vào năm 2015. [Jake Wharton](https://medium.com/u/8ddd94878165?source=post_page-----bf24119e747----------------------) cũng đề cập trong khi đào tạo Rx cho các nhà phát triển tại [reactive programming](https://en.wikipedia.org/wiki/Reactive_programming) nơi bắt nguồn cho UDF.

## Growing Number of Android Apps Adopting
Một vài cái tên như....
* Kaushik Gopal và Laimonas Turauskas tại Instacart.
* Dan Hill tại Robinhood.
* Donald Chen tại Instagram Enginneering/Lyft.
* Cesar Valiente tại Microsoft.

## Model View View Model - MVVM
Đầu tiên tôi xin nhắc lại Coinserve sử dụng mô hình MVVM. MVVM phân tách UI với business logic, tăng cường khả năng đọc hiểu và tổ chức. Tuy nhiên, vì một ứng dụng phát triển với MVVM nên nó sẽ trở thành một hồ dữ liệu.
Thông tin các luồng in/out và xoay quanh tại rất nhiều điểm thông qua các activities và fragments với Data Binding, ViewModels, và Repositories. Điều này làm tăng độ phức tạp, rắc rối cho quá trình theo dõi logic, debugging, testing và đòi hỏi phải giả lập rất nhiều các components.

## UDF Advantages
UDF là một waterfall, thông tin chạy theo các luồng tho một hướng thông qua một nguồn cung cấp rất nhiều lợi ích.
* Một điểm đầu vào cho các streams - UI và business logic tương tác thông qua các điểm độc lập đầu vào.
* Điều hướng UI liên quan tới các sự kiện bất đồng bộ - Biết chính xác khi nào và ở đâu cái gì bắt đầu và kết thúc.
* Debug issues - Dễ dàng theo dõi sự nối tiếp của các sự kiện và các lỗi được định danh.
* Streamlined tets - Logic chính được chứa trong ViewModel đòi hỏi rất ít việc phải giả lập.

## LiveData
LiveData cung cấp một cách thức rõ ràng nhằm triển khai UDF.
* Lifecycle aware
* Có thể phát ra multiple hoặc single events.
* Độ chính xác mã nguồn.
* Triển khai nhanh.

[LiveData talk from 2018 Android Developer Summit](https://www.youtube.com/watch?v=2rO4r-JOQtA)

## View State, Events, and Effects.
### View State

<div align="center"><img src="https://images.viblo.asia/5645674f-2c7f-4a91-9a7e-e28549dc26b9.png" /></div><br />

**View State** chị trách nhiệm giữ các persisted data của views. Điều này đại diện cho tất cả các nội dung được trình bày cho user thông qua các màn hình, bao gồm thông tin về nôi dung như các trạng thái kích hoạt.

Xem xét newsfeed chính của Coinverse bên trên, ví dụ về view state bao gồm nội dung của **toolbar**, **timeframe** là gì, và **feedtype** của loại feed được hiển thị, cũng như **contentList** để chứa feed.

### Events

<div align="center"><img src="https://images.viblo.asia/a0d06aa8-99cf-4d35-a25b-df0b552720b7.gif" /></div><br />

View Events tồn tại cùng với giao diện người dùng và các hoạt động khởi tạo hệ thống. Các hoạt động UI bao gồm nhấn vào các buttons, nhập text, bởi vì các hoạt động hệ thống có thể là các sự kiện vòng đời của Android và xoay màn hình.

Trong trường hợp nội dung được chọn của The Coinbase Blog's bên trên, một view event được tạo, **ContentSelected**. Event sẽ chia sẻ thông tin với lớp business nhằm khởi tạo đáp ứng với audiocast được chọn.

### Effects

<div align="center"><img src="https://images.viblo.asia/e51578a8-1372-43d7-9a6a-877c1eaa604d.gif" /></div><br />
View Effects là một biến cố UI xảy ra một lần cái không tồn tại mãi. Effects bao gồm navigation, dialogs, và toasts. Effects được tạo bởi tầng business nhằm mở ra các thay đổi UI.

Khi CNN item bên trên được trượt qua phải, tầng business thêm vào một nhãn lưu lại nội dung. Tầng business gửi một **effect**, **ContentSwiped**, thông báo tới UI về thay đổi trong nhãn nội dung. UI có thể xóa nội dung đó trong newsfeed chính.

## App Structure
<div align="center"><img src="https://images.viblo.asia/249ce0fa-5c72-4dd3-b6db-fe4c1762f721.png" /></div><br />
Hãy tìm hiểu làm thế nào luồng data một chiều được cấu trúc lên. View xử lý tất cả UI và các hoạt động lưu trữ có cấp bậc của hệ thông trong một singleton stream. Stream này được gửi tới một ViewModel cái nhận được các actions và xử lý chúng một cách chính xác theo business logic.

ViewModel là nguồn tài nguyên thực tế của view state và tạo ra rất nhiều effects cần thiết. ViewModel cũng xử lý các yêu cầu từ lớp dữ liệu Repository, quá trình quản lý các trạng thái kết quả **loading**, **success(content)**, và **error** được trả về từ Repository với một **Lce** object(Chi tiết về **Lce** ở bên dưới).

Cả **state** và **effects** được lắng nghe bởi views, quá trình cập nhận bất cứ thay đổi nào từ ViewModel là trong thời gian thực.

## Implementation
<div align="center"><img src="https://images.viblo.asia/a7683b1e-97b7-46e7-9801-ff5f82771e01.gif" /></div><br />
Chúng ta sẽ sử dụng quá trình tải newsfeed chính của Coinverse như ví dụ của chúng ta nhằm hiểu về làm thế nào để triển khai UDF.

### Step 1-6 - Define Models

```
// Immutable ViewState attributes.
data class ViewState(val contentList:LiveData<PagedList<Content>>, 
  ...)

// View sends to business logic.
sealed class ViewEvent {
  data class ScreenLoad(...) : ViewEvent()
  ...
}

// Business logic sends to UI.
sealed class ViewEffect {
  class UpdateAds : ViewEffect() 
  ...
}
```

* **View State** - Lưu trữ như một đối tượng LiveData trong ViewModel, quá trình lưu trữ **contentList** của loại LiveData.
* **View Events và Effects** - Sử dụng Sealed class của Kotlin nhằm truyền các sự kiện một lần.

View State sử dụng LiveData bởi vì nó là dữ liệu bất biến quan trọng ví dụ như **MutableLiveData**. Mặc khác, luồng dữ liệu không thể là một chiều, và state có thể được thay đổi ở rất nhiều nơi.

View Events và Effects không tồn tại mãi trong ViewModel, Một seale class, giống như một enum, nhưng ở cấp độ lướp, được sử dụng để truyền thông tin. Sealed classes định nghĩa một lớp cha và một lớp con cùng hoặc không cùng dữ liệu. Sự kiện **ScreenLoad** là một **data class** với dữ liệu về cái gì mà ViewModel nên tải. Bởi vì **UpdateAds** effect không phải là một class với dữ liệu nhằm nói cho view về việc update ads(quảng cáo) trên màn newsfeed.

### Step 2-6 - Pass events to ViewModel

```
private val viewEvent: LiveData<Event<ViewEvent>> get() = _viewEvent
private val _viewEvent = MutableLiveData<Event<ViewEvent>>()

override fun onCreate(savedInstanceState: Bundle?) {
    ...
    if (savedInstanceState == null)
      _viewEvent.value = Event(ScreenLoad(...))
}

override fun onResume() {
  super.onResume()
  viewEvent.observe(viewLifecycleOwner, EventObserver { event ->
    contentViewModel.processEvent(event)
  })
}
```

Trong ví dụ, khi hành động **onCreate** của hệ thống xảy ra, một sự kiện **ScreenLoad** được thêm vào stream của các sự kiện của view và gửi từ Fragment tới ViewModel nhằm bắt đầu quá trình khởi tạo newsfeed chính.

Tất cả các events được tạo trong View/Fragment được thêm vào một đối tượng LiveData  **&nbsp;&#818;viewEvent**, một đối tượng **MutableLiveData** cái cập nhật đối tượng bất biến **LiveData**. Tôi đang sử dụng mô hình để truyền tất cả các sự kiện trong **onResume** dựa trên [**ví dụ của Kaushik**](https://github.com/kaushikgopal/movies-usf)
 
 LiveData lưu dữ liệu được bao bọc trong một **Event**. Như đã giải thích bởi [**Jose**](https://medium.com/u/e0a4c9469bb5?source=post_page-----bf24119e747----------------------) trong bài viết về [events của LiveData](https://medium.com/androiddevelopers/livedata-with-snackbar-navigation-and-other-events-the-singleliveevent-case-ac2622673150), các events đảm bảo một đối tượng single duy nhất được thêm vào một stream. Điều này tránh được các tai nạn trong quá trình khởi tạo nhiều đối tượng cho một hoạt động độc lập.
 
 ### Step 3-6 - Process events
<div align="center"><img src="https://images.viblo.asia/dd19c9b3-11c0-4380-85aa-6ca942399a12.gif" /></div><br />

```
val viewState: LiveData<ViewState> get() = _viewState
val viewEffect: LiveData<Event<ViewEffect>> get() = _viewEffect

private val _viewState = MutableLiveData<ViewState>()
private val _viewEffect = MutableLiveData<Event<ViewEffect>>()

fun processEvent(event: ViewEvent) {
    when (event) {
        is ViewEvent.ScreenLoad -> {
          // Populate view state based on network request response.
          _viewState.value = ContentViewState(getMainFeed(...),...)
          _viewEffect.value = Event(UpdateAds())
        }
        ...
}
```
 
 ViewModel nhận được các sự kiện đến, quá trình xử lý mỗi event trong một khối  **when** dựa trên loại **Sealed ViewEvent**. Đối với **ScreenLoad**, **ViewState** được cập nhật một các hoàn toàn với dữ liệu yêu cầu. Một yêu cầu newsfeed được đặt trong Repository với **getMainFeed** được tạo ra.
 
 ### Update State Value
 
Trong các trường hợp nơi một thuộc tính của **ViewState** cần được cập nhật hơn là toàn bộ **ViewState**, phương thức **copy** của Kotlin là một sự hữu ích.

```
is ContentViewEvent.SwipeToRefresh -> 
  _viewState.value = _viewState.value?.copy(contentList = getMainFeed(...))
```

### Step 4-6 - Manage Network Request with LCE Pattern

```
sealed class Lce<T> {
  class Loading<T> : Lce<T>()
  data class Content<T>(val packet: T) : Lce<T>()
  data class Error<T>(val packet: T) : Lce<T>()
}
```

Để quả lý các network requests, [**Kaushik**](https://medium.com/u/b85c7e530b1f?source=post_page-----bf24119e747----------------------) giới thiệu một sealed class là **Lce** với ba states, **loading**, **content**, và **error**. **content** state thể hiện một request thành công.

```
sealed class Result {
  data class PagedListResult(
    val pagedList: LiveData<PagedList<Content>>?, 
    val errorMessage: String): ContentResult()
  ...
}
```

Một sealed class cũng là hữu ích cho các loại khác nhau của các kết quả trả về.

```
fun getMainFeed(...)= MutableLiveData<Lce<Result.PagedListResult>>().also { lce ->
  lce.value = Lce.Loading()
  /* Firestore request here. */.addOnCompleteListener {
    // Save data.
    lce.value = Lce.Content(ContentResult.PagedListResult(...))
  }.addOnFailureListener {
    lce.value = Lce.Error(ContentResult.PagedListResult(...))
  }
}
```

* Network request là **getMainFeed** gửi **Lce** states tới ViewModel thông qua LiveData Stream. lớp **PagedListResult** có thể được truyền tới **Lce** cho đồng thời các trạng thái **content** và **error**. ViewModel sẽ quản lý mỗi state một cách chính xác.

### Step 5-6 - Handle LCE States

<div align="center"><img src="https://images.viblo.asia/22e1b60e-4ec5-4a08-b91b-6ea9c6722b4d.gif" /></div><br />
Ảnh trên cho thấy có điều gì đó không ổn. Chúng ta sẽ xem xét làm thế nào các erros được xử lý trong ViewModel.

```
private fun getMainFeed(...) = Transformations.switchMap(repository.getFeed(...)) { 
  lce -> when (lce) {
    // SwitchMap must be observed for data to be emitted in ViewModel.
    is Lce.Loading -> Transformations.switchMap(/*Get data from Room Db.*/) { 
      pagedList -> MutableLiveData<PagedList<Content>>().apply {
        this.value = pagedList
      }
    }
    is Lce.Content -> Transformations.switchMap(lce.packet.pagedList!!) { 
      pagedList -> MutableLiveData<PagedList<Content>>().apply {
        this.value = pagedList
      }
    }    
    is Lce.Error -> { 
      _viewEffect.value = Event(SnackBar(...))
      Transformations.switchMap(/*Get data from Room Db.*/) { 
        pagedList -> MutableLiveData<PagedList<Content>>().apply {
          this.value = pagedList 
        }
    }
}
```

UDF đã sắp xếp một các hợp lý đồng thời các phương thức của quá trình request nội dung mới từ network và quá trình lấy dữ liệu được cập nhật vào Room Database. Trước khi sử dụng UDF, Coinserve gọi hai phương thức trong repository một các riêng biệt được đặt trong newsfeed chính.

Khi feed đang được tải, nội dung đang tồn tại trong Room database được trả về, do đó người dùng không phải bắt đầu với một màn hình trống rỗng. Đối với trường hợp lấy nội dung thành công, quá trình cập nhật nội dung của Room được trả về, Đối với trường hợp lỗi trong quá trình request nội dung mới, nội dung đang tồn tại trong Room cũng được hiển thị tương tự trong trường hợp **Loading**. Trong lỗi bên trên, một **SnackBar** view **effect** được truyền tới Fragment nhằm hiển thị thông điệp lỗi.

ViewModel lắng nghe mỗi trạng thái **Lce** với một LiveData **SwitchMap**. SwitchMap này truyền một đối tượng LiveData và trả về một đối tượng LiveData mới và khác cái đã được lưu lại trong view **state**.

Giống như tất cả các LiveData, một **SwitchMap** cần được lắng nghe trong view một cách có thứ tự để giá trị được phát ra cùng với map bên trong ViewModel.

### Step 6-6 - Observe State Change

```
contentViewModel.viewState.observe(viewLifecycleOwner, Observer { viewState ->
  viewState.contentList.observe(viewLifecycleOwner, Observer { contentList ->
    adapter.submitList(contentList)
  })
  ...
}
```

Bây giờ, view **state** có thể được lắng nghe mỗi khi một cập nhật xảy ra. view **effects** được lắng nghe một cách tương tự.

## Bonus — Removing Adjacent Ads

<div align="center"><img src="https://miro.medium.com/max/349/1*AGXWJqvVrY4C1Nje1KC1FQ.gif" /></div><br />
Ngoài ra, để sắp xếp newsfeed bên trên, UDF đã được cải tiến để làm thế nào quảng cáo MoPub của Twitter được hiển thị trên newsfeed. **MoPubRecyclerAdapter** của MoPub không có cách thức tích hợp nhằm tránh việc quảng cáo bị hiển thị liền nhau. Nội dung có thể được trượt để lưu lại hoặc bỏ qua, cái về sau gây ra hiện tượng hai quảng cáo xuất hiện ngay sau một cái khác. Tước khi sử dụng UDF, cái này được xử lý với một thao tác swipe-to-refresh bằng tay của người dùng.

Với UDF, có một **contentLabled** view state. Khi trạng thái của view state thay đổi, điều đó có nghĩa một item được dán nhãn nhằm loại bỏ nó khỏi danh sách, một kiểm tra về việc quảng cáo có xuất hiện liên tiếp hay không được tạo. Nếu quá trình xóa bỏa nội dung tạo ra các quảng cáo liên tiếp, các quảng cáo được làm mới một cách tự động.

## Trade-Offs
Sử dụng LiveData cho Unidirectional Data Flow là tuyệt vời, nhưng nó không hoàn hảo.

LiveData chỉ có khả năng áp dụng cho logic ảnh hưởng tới UI. Với những LiveData cho logic không liên quan tới UI sẽ không thể lắng nghe bởi nó đòi hỏi lifcycle phải được truyền vào. Đối với những trường hợp này, [Kotlin Coroutine](https://kotlinlang.org/docs/reference/coroutines-overview.html) hoặc Rx có thể được sử dụng. Nếu không có giao diện liên quan thì có một giải pháp thậm chí còn tốt hơn nhằm giảm thiểu logic một cách hoàn toàn cho backend với [Firebase Cloud Functions](https://firebase.google.com/docs/functions/callable#call_the_function).

Không có nhiều sự tùy biến với LiveData cho những thứ giống như thread. Với những cập nhật cuối năm của Google I/O, coroutine xuất nhiền nhằm tích hợp với LiveData một các dễ dàng cái cung cấp một khả năng tùy biến tốt hơn.

## Coinserve Next Steps
* **Unidiectional Data Flow** - Mở rộng cho phần còn lại của ứng dụng.
* **JUnit testing** - Hiện tại những phần logic chính của newsfeed được cấu trúc trong ViewModel, quá trình kiểm thử JUnit sẽ là dễ dàng hơn với việc ít phải giả lập các thành phần.
* [**Kotlin Coroutines**](https://developer.android.com/kotlin/coroutines) - Tăng cường hiệu năng bởi quá trình kiểm soát luồng sử dụng Kotlin Coroutine tích hợp với LiveData.
 
## Source
**[Android Unidirectional Data Flow with LiveData](https://medium.com/hackernoon/android-unidirectional-flow-with-livedata-bf24119e747)**.<br />
**[Android Unidirectional Data Flow with LiveData — 2.0](https://proandroiddev.com/udf2-0-5052c3e1c62a)**.<br />
**[Android Unidirectional Data Flow - Sample App](https://android.jlelse.eu/sample-app-android-unidirectional-data-flow-b9f8ad0fbca3)**.<br />

## Reference
## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))