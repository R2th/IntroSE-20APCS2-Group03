Hai năm trước, Architecture Components được giới thiệu đến cộng đồng lập trình viên Android, nhằm giúp cho việc phát triển ứng dụng Android trở nên tốt hơn. Một trong những thành phần cốt lõi của bộ Architecture Components là ViewModel cùng với LiveData, thứ thực chất là một [observable lifecycle-aware data holder](https://developer.android.com/topic/libraries/architecture/livedata) dùng để kết nối một Activity với ViewModel. ViewModel sẽ đưa ra dữ liệu và Activity sẽ sử dụng nó.
Phần này khá là rõ ràng và không có nhiều điểm để thảo luận. Tuy nhiên, ViewModel cần phải load dữ liệu để Activity có thể sử dụng. Câu hỏi ở đây là thời điểm nào sẽ thích hợp để thực hiện công việc đó?

![](https://images.viblo.asia/6abdd843-8632-40ec-aa4b-59be60769c67.png)
# Use Case
Trong bài viết này, ta sẽ sử dụng một use case đơn giản là load danh sách contact trong ViewModel và publish nó bằng cách sử dụng LiveData.
```
class Contacts(val names: List<String>)

data class Parameters(val namePrefix: String = "")

class GetContactsUseCase {
  fun loadContacts(parameters: Parameters, onLoad: (Contacts) -> Unit) { /* Implementation detail */ }
}

class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  // TODO When to call getContactsUseCase.loadContacts?

  fun contacts(parameters: Parameters): LiveData<Contacts> {
    TODO("What to return here?")
  }
}
```
# Công việc cần thực hiện
Để có một số tiêu chí nhằm đánh giá, trước tiên, ta sẽ đặt ra những yêu cầu để có một phương thức load dữ liệu hiệu quả:
1. Tận dụng lợi thế của ViewModel để chỉ thực hiện load dữ liệu thi cần thiết, tránh việc load lại dữ liệu khi xoay màn hình hay configuration changes.
2. Dễ hiểu và dễ cài đặt, sử dụng clean code.
3. Sử dụng ít API để giảm yêu cầu kiến thức về việc sử dụng ViewModel.
4. Tăng khả năng cung cấp các tham số. ViewModel rất thường xuyên cần chấp nhận các tham số khi load dữ liệu của nó.
# Các giải pháp đưa ra
## Bad: Gọi tới một phương thức
Đây là một cách được sử dụng rộng rãi và được giới thiệu ngay cả trong [Google Blueprints example](https://github.com/googlesamples/android-architecture/blob/dev-todo-mvvm-live/todoapp/app/src/main/java/com/example/android/architecture/blueprints/todoapp/addedittask/AddEditTaskFragment.java#L64). Phương thức cần phải được gọi ở đâu đó và thường là ở trong một phương thức nào đó trong vòng đời của Activity hay Fragment.
```
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData = MutableLiveData<Contacts>()

  fun loadContacts(parameters: Parameters) {
    getContactsUseCase.loadContacts(parameters) { contactsLiveData.value = it }
  }

  fun contacts(): LiveData<Contacts> = contactsLiveData
}
```
**Nhược điểm**
* Chúng ta sẽ phải reload mỗi lần xoay màn hình, mất đi lợi thế của ViewModel.
* Phải kích hoạt thêm một phương thức.
* Thêm một điều kiện ngầm định rằng các tham số sẽ luôn giống nhau cho các instance giống nhau. Phương thức `loadContacts()` và `contacts()`  sẽ bị ghép với nhau.

**Ưu điểm**
* Dễ hiểu và dễ cài đặt.
* Dễ dàng để cung cấp tham số.
## Bad: Bắt đầu trong constructor của ViewModel
Chúng ta có thể đảm bảo dữ liệu chỉ được load một lần bằng cách thực hiện load dữ liệu trong constructor của ViewModel. Các tiếp cận này cũng đã được để cập trong [tài liệu](https://developer.android.com/topic/libraries/architecture/coroutines#viewmodelscope).
```
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData = MutableLiveData<Contacts>()

  init {
    getContactsUseCase.loadContacts(Parameters()) { contactsLiveData.value = it }
  }

  fun contacts(): LiveData<Contacts> = contactsLiveData
}
```
**Nhược điểm**
* Chúng ta không thể cung cấp tham số tới phương thức load dữ liệu.
* Ta thực hiện công việc trong constructor.

**Ưu điểm**
* Dữ liệu chỉ được load một lần.
* Dễ dàng cài đặt.
* Tất cả public API chỉ có một phương thức là `contacts()`.
## Better: Lazy field
Chúng ta có thể sử dụng `lazy` property của Kotlin như sau:
```
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData by lazy {
    val liveData = MutableLiveData<Contacts>()
    getContactsUseCase.loadContacts(Parameters()) { liveData.value = it }
    return@lazy liveData
  }

  fun contacts(): LiveData<Contacts> = contactsLiveData
}
```
**Nhược điểm**
* Việc cung cấp tham số cho phương thức load dữ liệu không có cách nào khác ngoài việc thêm một trạng thái, thứ mà cần thực hiện trước khi trường `contactsLiveData` được truy cập.

**Ưu điểm**
* Chúng ta load data chỉ một lần tại thời điểm truy cập LiveData lần đầu tiên.
* Dễ dàng cài đặt.
* Tất cả public API chỉ có một phương thức là `contacts()`.
## Good: Lazy Map
Chúng ta có thể sử dụng [lazy Map](https://gist.github.com/jraska/24c1ff2b5da3d4ac43ad7507b9189b80) hoặc một lazy init tương tự dựa trên tham số được cung cấp. Khi các tham số là Strings hay các class immutable khác, việc sử dụng chúng như là key của Map để lấy LiveData tương ứng với tham số được cung cấp là rất dễ dàng.
```
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData: Map<Parameters, LiveData<Contacts>> = lazyMap { parameters ->
    val liveData = MutableLiveData<Contacts>()
    getContactsUseCase.loadContacts(parameters) { liveData.value = it }
    return@lazyMap liveData
  }

  fun contacts(parameters: Parameters): LiveData<Contacts> = contactsLiveData.getValue(parameters)
}
```
```
fun <K, V> lazyMap(initializer: (K) -> V): Map<K, V> {
  val map = mutableMapOf<K, V>()
  return map.withDefault { key ->
    val newValue = initializer(key)
    map[key] = newValue
    return@withDefault newValue
  }
}
```
**Nhược điểm**
* Vẫn cần giữ một số trạng thái mutatble trong ViewModel.

**Ưu điểm**
* Chúng ta load data chỉ một lần tại thời điểm truy cập LiveData lần đầu tiên.
* Khá dễ hiểu và cài đặt
* Tất cả public API chỉ có một phương thức là `contacts()`.
* Chúng ta có thể cung cấp các tham số và ViewModel có thể sử lý nhiều tham số tại một thời điểm.
## Good: Lazy method - Lazy onActive() case
Khi sử dụng Room hay RxJava, chúng ta có các adapter để có thể tạo LiveData trực tiếp từ đối tượng `@Dao`, tương ứng với việc sử dụng phương thức mở rộng [`Publisher.toLiveData()`](https://github.com/aosp-mirror/platform_frameworks_support/blob/93930be7bb2e82019d659d6a3a343cf5aefd3b7b/lifecycle/lifecycle-reactivestreams-ktx/src/main/java/androidx/lifecycle/LiveDataReactiveSteams.kt#L36).

Cả hai thư viện này đều cài đặt [`ComputableLiveData`](https://github.com/aosp-mirror/platform_frameworks_support/blob/androidx-master-dev/lifecycle/lifecycle-livedata/src/main/java/androidx/lifecycle/ComputableLiveData.java) và [`PublisherLiveData`](https://github.com/aosp-mirror/platform_frameworks_support/blob/93930be7bb2e82019d659d6a3a343cf5aefd3b7b/lifecycle/lifecycle-reactivestreams/src/main/java/androidx/lifecycle/LiveDataReactiveStreams.java#L213) giúp cho chúng chỉ thực hiện công việc khi phương thức `LiveData.onActive()` được gọi tới.
```
class GetContactsUseCase {
  fun loadContacts(parameters: Parameters): Flowable<Contacts> { /* Implementation detail */ }
}

class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  fun contacts(parameters: Parameters): LiveData<Contacts> {
    return getContactsUseCase.loadContacts(parameters).toLiveData()
  }
}
```
**Nhược điểm**
* Việc load dữ liệu vẫn được gắn với lifecycle.
* Trong ví dụ này, ta tạo một LiveData mới mỗi lần gọi phương thức, để tránh trường hợp này, ta cần phải giải quyết vấn đề trong trường hợp các thông số khác nhau. Lazy Map có thể giúp trong trường hợp này.

**Ưu điểm**
* Chỉ load dữ liệu khi lifecycle ở trạng thái active.
* Dễ dàng cài đặt và sử dụng thư viện hỗ trợ.
* Tất cả public API chỉ có một phương thức là `contacts()`.
## Good: Truyền tham số vào trong constructor
Trong trường hợp trước về sử dụng lazy Map, chúng ta đã sử dụng Map chỉ để có thể truyền vào các tham số, nhưng trong nhiều trường hợp một instance của ViewModel sẽ luôn có các tham số giống nhau.
Do đó, sẽ tốt hơn nếu các tham số được truyền vào trong constructor và sử dụng lazy load hoặc bắt đầu load trong constructor. Chúng ta có thể sử dụng `ViewModelProvider.Factory` để đạt được điều này, nhưng vẫn có một số vấn đề.
```
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase, parameters: Parameters) : ViewModel() {
  private val contactsLiveData: LiveData<Contacts> by lazy {
    val liveData = MutableLiveData<Contacts>()
    getContactsUseCase.loadContacts(parameters) { liveData.value = it }
    return@lazy liveData
  }

  fun contacts(parameters: Parameters): LiveData<Contacts> = contactsLiveData
}

class ContactsViewModelFactory(val getContactsUseCase: GetContactsUseCase, val parameters: Parameters)
  : ViewModelProvider.Factory {
  override fun <T : ViewModel> create(modelClass: Class<T>): T {
    return ContactsViewModel(getContactsUseCase, parameters) as T
  }
}
```
**Nhược điểm**
* Không dễ để hiểu và cài đặt.

**Ưu điểm**
* Chỉ thực hiện load dữ liệu một lần.
* Tất cả public API chỉ có một phương thức là `contacts()`.
* ViewModel chấp nhận tham số trong constructor, immutable và dễ dàng kiểm thử.Đồng thời chúng tôi bắt đầu gặp vấn đề với các phụ thuộc khác và chúng tôi cần tìm ra cách thực sự chuyển chúng vào nhà máy cùng với các tham số, tạo ra nhiều bản tóm tắt hơn.
Cách này yêu cầu thêm một số code trong `ViewModeFactory` theo cách mà ta có thể truyền vào các tham số động. Đồng thời ta bắt đầu gặp vấn đề với các dependency khác và ta cần tìm ra cách thực sự chuyển chúng vào factory với các tham số.
[Assisted Injection](https://github.com/square/AssistedInject) là một nỗ lực để giải uyết vấn đề này và Jack Wharton đã trình bày nó trong [bài nói](https://www.youtube.com/watch?v=6eOyCEkQ5zQ) của anh ấy tại Droidcon London 2018. Tuy nhiên, vẫn có một số vấn đề, do đó, ngay cả khi đây là cách tiếp cận hoàn hảo thì vẫn có thể có các cách giải quyết các phù hợp với dự án của bạn hơn.
# Chọn phương án nào?
Giới thiệu Architecture Components đã đơn giản hóa đáng kể việc phát triển ứng dụng Android và giải quyết được nhiều vấn đề. Tuy nhiên, vẫn còn một số câu hỏi còn lại mà một trong số đó là load dữ liệu trong ViewModel mà ta đã thảo luận ở đây.
Từ kinh nghiệm của mình, mình khuyên các bạn nên sử dụng cách tiếp cận sử dụng Lazy Map để cân bằng giữa ưu và nhược điểm. Bạn có thể tham khảo ví dụ ở [đây](https://github.com/jraska/github-client/blob/7748c6ae80f07f4d0642ec38775444cb61338792/feature-users/src/main/java/com/jraska/github/client/users/model/RepoDetailViewModel.kt) .
Như bạn có thể thấy, không có một cách giải tuyết nào là hoàn hảo tuyệt đối và bạn chỉ có thể chọn giải pháp phù hợp nhất với dự án của mình. Hi vọng bài viết này giúp bạn có thể đưa ra lựa chọn đúng đắn.
Happy coding!
# Tài liệu tham khảo
[When to load data in ViewModels](https://proandroiddev.com/when-to-load-data-in-viewmodels-ad9616940da7)