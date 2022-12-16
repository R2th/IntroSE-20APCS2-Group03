Hơn hai năm trước, **Architecture Components** đã được giới thiệu với thế giới Android, nhằm cải thiện cách chúng ta phát triển ứng dụng của mình. Một phần cốt lõi của các thành phần này là ***ViewModel*** với ***LiveData***, đây là một chủ sở hữu dữ liệu nhận biết vòng đời có thể quan sát để kết nối một Hoạt động với ViewModel. Dữ liệu đầu ra của ViewModels và Hoạt động tiêu thụ nó. Phần này rõ ràng và không dẫn đến quá nhiều cuộc thảo luận, tuy nhiên ViewModel phải tải, đăng ký hoặc kích hoạt tải dữ liệu của nó tại một số điểm. Câu hỏi vẫn còn là khi nào nên làm điều này.

![](https://miro.medium.com/max/1400/0*JeBvq3bXaAz47ro6.png)

# Use Case
Đối với cuộc thảo luận của chúng ta, hãy để sử dụng một trường hợp sử dụng đơn giản là tải danh sách liên lạc trong ViewModel của chúng ta và publishing nó bằng LiveData.

``` Kotlin
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

# Chúng ta muốn gì?
Để có một số tiêu chí để đánh giá, trước tiên, hãy đặt ra các yêu cầu chúng tôi có cho một kỹ thuật load dữ liệu hiệu quả:
1. Tận dụng ViewModel để chỉ tải khi cần, tách rời vòng quay vòng đời và thay đổi cấu hình.
2. Dễ hiểu và thực hiện, sử dụng mã sạch.
3. API nhỏ để giảm kiến thức cần thiết để sử dụng ViewModel.
4. Khả năng cung cấp thông số. ViewModel rất thường xuyên phải chấp nhận các tham số để tải dữ liệu của nó.

# Bad: Gọi các phương thức
Đây là khái niệm được sử dụng rộng rãi và được quảng bá ngay cả trong [ví dụ Google Blueprints](https://github.com/googlesamples/android-architecture/blob/dev-todo-mvvm-live/todoapp/app/src/main/java/com/example/android/architecture/blueprints/todoapp/addedittask/AddEditTaskFragment.java#L64), nhưng có vấn đề nghiêm trọng. Phương thức cần được gọi từ một nơi nào đó và điều này thường kết thúc trong một số phương thức lifecycler của Activity hoặc Fragment.

``` Kotlin
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData = MutableLiveData<Contacts>()

  fun loadContacts(parameters: Parameters) {
    getContactsUseCase.loadContacts(parameters) { contactsLiveData.value = it }
  }

  fun contacts(): LiveData<Contacts> = contactsLiveData
}
```

* Ưu điểm: 
1. Dễ dàng trong việc implement và nắm được vấn đề.
2. Dễ dàng cung cấp thêm các parameter.

* Nhược điểm:
1. Chúng ta tải lại trên mỗi vòng đời, mất lợi ích của việc tách rời khỏi vòng đời Activity/Fragment, vì họ phải gọi phương thức từ ```onCreate()``` hoặc method lifecycle nào đó.
2. Có 1 hoặc nhiều method được khởi động.
3. Đưa ra điều kiện ngầm định rằng các tham số luôn giống nhau cho cùng một thể hiện. Các phương thức `loadLink ()` và `contact ()` được ghép nối.

# Bad: Gọi hàm load dữ liệu trong ViewModel constructor
- Chúng tôi có thể dễ dàng đảm bảo dữ liệu chỉ được tải một lần bằng cách kích hoạt tải trong hàm tạo của **ViewModel**. Cách tiếp cận này cũng được thể hiện trong các tài liệu.

``` Kotlin
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData = MutableLiveData<Contacts>()

  init {
    getContactsUseCase.loadContacts(Parameters()) { contactsLiveData.value = it }
  }

  fun contacts(): LiveData<Contacts> = contactsLiveData
}
```

* Ưu điểm:
1. Sẽ chỉ load data 1 lần duy nhất.
2. Dễ dàng implement.
3. Sẽ chỉ có 1 public API là `contacts()`

* Nhược điểm:
1. Không thể cung cấp thêm parameter để load function.
2. Chúng ta phải làm việc trong constructor.

# Cách tốt hơn: Lazy field
- Chúc ta có thể sử dụng **lazy delegated**, một tính năng của Kotlin:

``` Kotlin
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData by lazy {
    val liveData = MutableLiveData<Contacts>()
    getContactsUseCase.loadContacts(Parameters()) { liveData.value = it }
    return@lazy liveData
  }

  fun contacts(): LiveData<Contacts> = contactsLiveData
}
```

* Ưu điểm:
- Ta chỉ load data vào lần đầu tiên khi LiveData được truy cập.
- Dễ dàng implement.
- Sẽ chỉ có 1 public method `contacts()`

* Nhược điểm:
- Không thể cung cấp thêm parameter tới load function ngoại trừ set `contactsLiveData` có thể truy cập vào.

# Cách tốt: Lazy Map
Chúng tôi có thể sử dụng [Lazy Map](https://gist.github.com/jraska/24c1ff2b5da3d4ac43ad7507b9189b80) hoặc một lazy init tương tự dựa trên các tham số được cung cấp. Khi các tham số là Strings hoặc các lớp immutable khác, thật dễ dàng sử dụng chúng làm khóa của Map để nhận LiveData tương ứng với các tham số được cung cấp.

``` Kotlin
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData: Map<Parameters, LiveData<Contacts>> = lazyMap { parameters ->
    val liveData = MutableLiveData<Contacts>()
    getContactsUseCase.loadContacts(parameters) { liveData.value = it }
    return@lazyMap liveData
  }

  fun contacts(parameters: Parameters): LiveData<Contacts> = contactsLiveData.getValue(parameters)
}
```

``` Kotlin

fun <K, V> lazyMap(initializer: (K) -> V): Map<K, V> {
  val map = mutableMapOf<K, V>()
  return map.withDefault { key ->
    val newValue = initializer(key)
    map[key] = newValue
    return@withDefault newValue
  }
}

```

Ưu điểm:
1. Chúng ta chỉ tải dữ liệu khi lần đầu tiên truy cập LiveData.
2. Dễ dàng thực Implement và hiểu.
3. API công khai là một phương thức `contact()`.
4. Chúng ta có thể cung cấp các tham số và ViewModel thậm chí có thể xử lý nhiều các tham số trong cùng một thời điểm.

Nhược điểm:
- Vẫn giữ một số trạng thái mutable trong ViewModel.

# Cách tốt: Library method — Lazy onActive() case
Khi sử dụng **Room** hoặc **RxJava**, họ có adapter để có thể tạo LiveData trực tiếp trong các đối tượng @Dao, tương ứng sử dụng phương thức mở rộng trên Publisher.toLiveData ()
Cả hai triển khai thư viện ComputableLiveData và PublisherLiveData đều lười biếng theo nghĩa là chúng thực hiện công việc khi phương thức LiveData.onActive () được gọi.

```Kotlin
class GetContactsUseCase {
  fun loadContacts(parameters: Parameters): Flowable<Contacts> { /* Implementation detail */ }
}

class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  fun contacts(parameters: Parameters): LiveData<Contacts> {
    return getContactsUseCase.loadContacts(parameters).toLiveData()
  }
}
```

* Ưu điểm: 
1. Chúng tôi chỉ tải dữ liệu một cách lười biếng khi vòng đời ở trạng thái hoạt động.
2. Dễ dàng thực hiện và sử dụng thư viện hỗ trợ.
3. API công khai là một phương thức `contact()`,

* Nhược điểm:
Trong ví dụ này, chúng tôi tạo LiveData mới cho mỗi lệnh gọi phương thức, để tránh điều này, chúng tôi sẽ phải giải quyết vấn đề về các tham số có thể khác nhau. Lazy Map có thể được giúp đỡ ở đây.
Loading vẫn được kết hợp với vòng đời, bởi vì LiveData.onActive () có nghĩa là về cơ bản (`onStart()` và có observers).

# Cách tốt: Truyền các tham số vào constructor

Trong trường hợp trước với tùy chọn Lazy Map, chúng tôi chỉ sử dụng Map để có thể truyền tham số, nhưng trong nhiều trường hợp, một phiên bản của ViewModel sẽ luôn có cùng tham số.
Sẽ tốt hơn nhiều nếu truyền tham số cho hàm tạo và sử dụng lazy load hoặc bắt đầu tải trong hàm tạo. Chúng tôi có thể sử dụng `ViewModelProvider.Factory` để đạt được điều này, nhưng nó sẽ có một số vấn đề.
``` Kotlin
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

* Ưu điểm:
1. Chúng ta chỉ tải dữ liệu một lần.
2. API công khai là một phương thức `contact()`
3. ViewModel chấp nhận các tham số trong hàm tạo, không thay đổi và có thể kiểm tra được.

* Nhược điểm
1. Khó hiểu và implement.

# Vậy chọn cách nào?
Giới thiệu Architecture Components đơn giản hóa đáng kể sự phát triển Android và giải quyết nhiều vấn đề. Tuy nhiên, vẫn còn một số câu hỏi còn lại và chúng tôi đã thảo luận ở đây vấn đề tải dữ liệu **ViewModel** và đánh giá các tùy chọn khác nhau.

Từ kinh nghiệm của mình, tôi khuyên bạn nên sử dụng phương pháp **Lazy Map** vì tôi thấy nó là một sự cân bằng tốt về ưu và nhược điểm và thực sự dễ áp dụng. Bạn có thể tìm thấy các ví dụ ở [đây](https://github.com/jraska/github-client/blob/7748c6ae80f07f4d0642ec38775444cb61338792/feature-users/src/main/java/com/jraska/github/client/users/model/RepoDetailViewModel.kt) hoặc ở [đây](https://github.com/jraska/github-client/blob/master/feature-users/src/main/java/com/jraska/github/client/users/UserDetailViewModel.kt).

Như bạn có thể thấy, không có giải pháp hoàn hảo nào và tùy thuộc vào nhóm của bạn để chọn phương pháp phù hợp nhất với bạn, cân bằng sự mạnh mẽ, đơn giản và nhất quán trong dự án của bạn. Hy vọng bài này sẽ giúp bạn lựa chọn.

Happy Coding!

Source: [When to load data in ViewModels](https://proandroiddev.com/when-to-load-data-in-viewmodels-ad9616940da7)