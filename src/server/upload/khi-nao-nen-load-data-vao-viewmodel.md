Hơn hai năm trước, Architecture Components đã được giới thiệu với thế giới Android, nhằm cải thiện cách chúng ta phát triển ứng dụng của mình. Một phần cốt lõi của các thành phần này là ViewModel với LiveData, đây là một observable hỗ trợ nhận biết vòng đời có thể quan sát để kết nối một Activity với ViewModel. ViewModels cung cấp dữ liệu đầu ra và Activities tiêu thụ (consume) nó.

Phần này rõ ràng và không dẫn đến quá nhiều cuộc thảo luận, tuy nhiên ViewModel phải thực hiện load data, đăng ký hoặc kích hoạt load data của nó tại một số điểm. Câu hỏi vẫn còn là khi nào nên làm điều này.

## Use case của chúng ta
Trong cuộc thảo luận này, hãy sử dụng một use case đơn giản là load danh sách contacts trong ViewModel của chúng ta và xuất bản (publish) nó bằng LiveData.
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

## Các cách thực hiện
Để có một số tiêu chí để đánh giá, trước tiên, hãy đặt ra các yêu cầu chúng ta phải có cho một kỹ thuật load data hiệu quả:

1. Tận dụng ViewModel để chỉ load khi cần, tách rời vòng đời khi xoay màn hình (rotation) và thay đổi cấu hình (configuration changes).
2. Dễ hiểu và implement, sử dụng clean code.
3. Small API để giảm kiến thức cần thiết để sử dụng ViewModel.
4. Có khả năng cung cấp các parameter. ViewModel thường xuyên phải chấp nhận các tham số để load dữ liệu của nó.

### ❌ Bad: Calling a method
Đây là khái niệm được sử dụng rộng rãi và được sử dụng ngay cả trong ví dụ Google Blueprints, nhưng có vấn đề nghiêm trọng. Phương thức cần được gọi từ một nơi nào đó và điều này thường kết thúc trong một số phương thức Vòng đời của Activity hoặc Fragment.

```
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData = MutableLiveData<Contacts>()

  fun loadContacts(parameters: Parameters) {
    getContactsUseCase.loadContacts(parameters) { contactsLiveData.value = it }
  }

  fun contacts(): LiveData<Contacts> = contactsLiveData
}
```

➕Điểm cộng:
* Dễ hiểu và dễ implement
* Dễ dàng cung cấp các parameter

➖Điểm trừ:
* Chúng ta reload trên mỗi lần xoay màn hình, mất đi lợi ích của việc tách rời khỏi vòng đời Activity/Fragment, vì chúng phải gọi phương thức từ `onCreate()` hoặc một phương thức vòng đời khác.
* Thêm một phương thức để kích hoạt.
* Đưa ra điều kiện ngầm định rằng các tham số luôn giống nhau cho cùng một thể hiện. Các phương thức `loadContacts()` và `contacts()` được ghép nối lại.

### ❌ Bad: Start in ViewModel constructor
Chúng ta có thể dễ dàng đảm bảo dữ liệu chỉ được load một lần bằng cách kích hoạt load trong hàm khởi tạo của ViewModel. Cách tiếp cận này cũng được thể hiện trong các [tài liệu](https://developer.android.com/topic/libraries/architecture/coroutines#viewmodelscope).

```
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData = MutableLiveData<Contacts>()

  init {
    getContactsUseCase.loadContacts(Parameters()) { contactsLiveData.value = it }
  }

  fun contacts(): LiveData<Contacts> = contactsLiveData
}
```

➕Điểm cộng:
* Chúng ta chỉ load dữ liệu một lần
* Dễ hiểu và dễ implement
* Toàn bộ public API là một phương thức contacts()

➖Điểm trừ:
* Không thể cung cấp các parameter cho chức năng load.
* Phải thực hiện trong constructor

### ✔️ Better: Lazy field
Chúng ta có thể sử dụng tính năng thuộc tính được ủy quyền Lazy của Kotlin như:
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

➕Điểm cộng:
* Chúng ta chỉ load dữ liệu khi lần đầu tiên truy cập LiveData.
* Dễ dàng thực hiện.
* Toàn bộ public API là một phương thức contacts().

➖Điểm trừ:
* Không thể cung cấp các parameter cho function load ngoài việc thêm trạng thái, trạng thái này phải được đặt trước khi trường `contactLiveData` được truy cập.

### ✔️ Good: Lazy Map
Chúng ta có thể sử dụng lazy Map hoặc một lazy init tương tự dựa trên các parameter được cung cấp. Khi các parameter là Strings hoặc các lớp immutable khác, thật dễ dàng sử dụng chúng làm keys của Map để nhận LiveData tương ứng với các parameters được cung cấp.
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

➕Điểm cộng:
* Chúng ta chỉ tải dữ liệu khi lần đầu tiên truy cập LiveData.
* Dễ dàng thực hiện.
* Toàn bộ public API là một phương thức contacts().
* Chúng ta có thể cung cấp các parameters và ViewModel thậm chí có thể xử lý nhiều parameters cùng một lúc.

➖Điểm trừ:
* Vẫn giữ một số trạng thái có thể thay đổi trong ViewModel.

### ✔️ Good: Library method — Lazy onActive() case
Khi sử dụng Room hoặc RxJava, chúng có các adapter để có thể tạo `LiveData` trực tiếp trong các đối tượng `@Dao`, tương ứng sử dụng phương thức mở rộng trên [`Publisher.toLiveData()`](https://github.com/aosp-mirror/platform_frameworks_support/blob/93930be7bb2e82019d659d6a3a343cf5aefd3b7b/lifecycle/lifecycle-reactivestreams-ktx/src/main/java/androidx/lifecycle/LiveDataReactiveSteams.kt#L36)

Cả hai triển khai thư viện [ComputableLiveData](https://github.com/aosp-mirror/platform_frameworks_support/blob/androidx-master-dev/lifecycle/lifecycle-livedata/src/main/java/androidx/lifecycle/ComputableLiveData.java) và [PublisherLiveData](https://github.com/aosp-mirror/platform_frameworks_support/blob/93930be7bb2e82019d659d6a3a343cf5aefd3b7b/lifecycle/lifecycle-reactivestreams/src/main/java/androidx/lifecycle/LiveDataReactiveStreams.java#L213) đều là lazy theo nghĩa là chúng thực hiện công việc khi phương thức `LiveData.onActive()` được gọi.

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

➕Điểm cộng:
* Chúng ta chỉ load dữ liệu một cách lazy khi vòng đời ở trạng thái hoạt động.
* Dễ dàng thực hiện và sử dụng support library.
* Toàn bộ public API là một phương thức contacts().

➖Điểm trừ:
* Loading vẫn được liên kết với vòng đời, bởi vì `LiveData.onActive()` có nghĩa là về cơ bản (`onStart()` và có observers).
* Trong ví dụ này, chúng ta tạo LiveData mới cho mỗi lần gọi phương thức, để tránh điều này, chúng tôi sẽ phải giải quyết vấn đề về các parameters có thể khác nhau. Lazy Map có thể được giải quyết được ở đây.

### ✔️ Good: Pass the parameters in constructor
Trong trường hợp trước với tùy chọn lazy Map, chúng ta chỉ sử dụng Map để có thể truyền parameters, nhưng trong nhiều trường hợp, một instance của ViewModel sẽ luôn có cùng parameters.

Sẽ tốt hơn nhiều nếu truyền parameter cho hàm constructor và sử dụng lazy load  hoặc bắt đầu load trong hàm constructor. Chúng ta có thể sử dụng `ViewModelProvider.Factory` để đạt được điều này, nhưng nó sẽ có một số vấn đề.

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

➕Điểm cộng:
* Chúng ta chỉ tải dữ liệu một lần.
* ViewModel chấp nhận các parameters trong hàm constructor, immutable và có thể kiểm tra được.

➖Điểm trừ:
* Không dễ để implement và hiểu, cần đến boilerplate code.

Nó yêu cầu thêm code để nối vào ViewModelFactory theo cách mà chúng ta có thể truyền các tham số động. Đồng thời chúng ta bắt đầu gặp vấn đề với các phụ thuộc khác và chúng ta cần tìm ra cách thực sự chuyển chúng vào factory cùng với các tham số, tạo ra nhiều boilerplate hơn.

[Assisted Injection](https://github.com/square/AssistedInject) đang cố gắng giải quyết vấn đề này và Jake Wharton đã đề cập đến chủ đề này trong [bài nói](https://www.youtube.com/watch?v=6eOyCEkQ5zQ) của anh ấy tại Droidcon London 2018. Tuy nhiên, vẫn còn một số boilerplate, do đó, ngay cả khi đây có thể là giải pháp hoàn hảo, thì các tùy chọn khác có thể phù hợp hơn với team của bạn.

## Chọn cách tiếp cận nào
Architecture Components đơn giản hóa đáng kể sự phát triển Android và giải quyết nhiều vấn đề. Tuy nhiên, vẫn còn một số câu hỏi còn lại và chúng ta đã thảo luận ở đây vấn đề load dữ liệu ViewModel và đánh giá các tùy chọn khác nhau.

Từ kinh nghiệm của mình, tôi khuyên bạn nên sử dụng phương pháp Lazy Map vì tôi thấy nó là một sự cân bằng tốt về ưu và nhược điểm và thực sự dễ áp dụng. Bạn có thể tìm thấy các ví dụ [ở đây](https://github.com/jraska/github-client/blob/7748c6ae80f07f4d0642ec38775444cb61338792/feature-users/src/main/java/com/jraska/github/client/users/model/RepoDetailViewModel.kt) hoặc [ở đây](https://github.com/jraska/github-client/blob/master/feature-users/src/main/java/com/jraska/github/client/users/UserDetailViewModel.kt).

Như bạn có thể thấy, không có giải pháp hoàn hảo nào và tùy thuộc vào team của bạn để chọn phương pháp phù hợp nhất với bạn, cân bằng sự mạnh mẽ, đơn giản và nhất quán trong dự án của bạn. Hy vọng bài này sẽ giúp bạn lựa chọn.

Ref: https://proandroiddev.com/when-to-load-data-in-viewmodels-ad9616940da7