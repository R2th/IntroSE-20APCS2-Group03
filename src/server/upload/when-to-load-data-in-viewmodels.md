# When to load data in ViewModels

Hơn 2 năm về trước, Android Architecture Components được giới thiệu đến thế giới Android, để cải thiện việc phát triển ứng dụng. Một thành phần cốt lõi của các component đó chính là `ViewModel` kết hợp với `LiveData`. `LiveData` là "[observable lifecycle-aware data holder ](https://developer.android.com/topic/libraries/architecture/livedata)" được dùng để connect `Activity` với `ViewModel`. Về cơ bản thì `ViewModel` sẽ sản xuất ra data, còn các `Activity` sẽ xử lý chúng. 

## Our Use Case

Cho việc thảo luận của chúng ta, hãy dùng một use case cơ bản của việc load danh sách contact trong `ViewModel` và publish nó bằng `LiveData`.

```java
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
```

## What do we want
Các tiêu chí đánh giá: 
1. Tận dụng ViewModel để chỉ load khi cần thiết, tách rời lifecycle rotation và configuration changes.
2. Dễ hiểu và triển khai, sử dụng clean code.
3. Small API để giảm yêu cầu kiến thức sử dụng ViewModel. 
4. Có thể cung cấp parameters. ViewModel thường phải nhận parameters để load data của chính nó.

## ❌ Bad: Calling a method
Đây là khái niệm được sử dụng rộng rãi và được khuyến khích ngay cả trong ví dụ [Google Blueprints](https://github.com/googlesamples/android-architecture), nhưng nó có vấn đề nghiêm trọng. Method thường cần được gọi từ đâu đó và kết thúc trong các method vòng đời của Activity or Fragment.

```java
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData = MutableLiveData<Contacts>()

  fun loadContacts(parameters: Parameters) {
    getContactsUseCase.loadContacts(parameters) { contactsLiveData.value = it }
  }

  fun contacts(): LiveData<Contacts> = contactsLiveData
}
```

➖ Chúng ta reload mỗi khi rotate, mất đi lợi ích của việc tách rời khỏi vòng đời Activity / Fragment, vì chúng phải gọi phương thức từ `onCreate()` hoặc các lifecycle method khác.

➕ Dễ dàng để implement và hiểu.

➖ Nhiều hơn 1 method để trigger.

➖ Đưa ra điều kiện ngầm định rằng các tham số luôn giống nhau cho cùng một instance. Các phương thức `loadContacts()` và `contact ()` được ghép nối.

➕ Dễ dàng cung cấp parameters.

## ❌ Bad: Start in ViewModel constructor
Chúng ta có thể dễ dàng đảm bảo rằng data chỉ load một lần bởi việc gọi load data trong constructor của ViewModel. Cách tiếp cần này cũng được trình bày trong [docs](https://developer.android.com/topic/libraries/architecture/coroutines#viewmodelscope).

```java
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData = MutableLiveData<Contacts>()

  init {
    getContactsUseCase.loadContacts(Parameters()) { contactsLiveData.value = it }
  }

  fun contacts(): LiveData<Contacts> = contactsLiveData
}
```

➕ Load data chỉ một lần.

➕ Dễ dàng triển khai.

➕ Chỉ một public API method `contacts()`

➖ Không thể cung cấp parameters để load function.

➖ Làm việc trong constructor.

## ✔️ Better: Lazy field
Chúng ta có thể dùng chức năng khai báo thuộc tính lazy của Kotlin: 

```java 
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData by lazy {
    val liveData = MutableLiveData<Contacts>()
    getContactsUseCase.loadContacts(Parameters()) { liveData.value = it }
    return@lazy liveData
  }

  fun contacts(): LiveData<Contacts> = contactsLiveData
}
```

➕ Chỉ load data khi lần đầu tiên truy cập LiveData.

➕ Dễ dàng triển khai.

➕ Chỉ một public API method `contacts()`.

➖ Không thể cung cấp parameters để load function ngoài việc thêm state, state này phải được set trước khi `contactsLiveData` field được truy cập.

## ✔️ Good: Lazy Map

Chúng ta có thể dùng lazy Map hoặc khởi tạo tương tự lazy dựa trên parameters đã được cung cấp. Khi parameters là Strings hoặc immutable classes khác, chúng ta có thể dễ dàng dùng chúng như keys của Map để get LiveData tương ứng và cung cấp parameters. 

```java
class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  private val contactsLiveData: Map<Parameters, LiveData<Contacts>> = lazyMap { parameters ->
    val liveData = MutableLiveData<Contacts>()
    getContactsUseCase.loadContacts(parameters) { liveData.value = it }
    return@lazyMap liveData
  }

  fun contacts(parameters: Parameters): LiveData<Contacts> = contactsLiveData.getValue(parameters)
}
```

```java
fun <K, V> lazyMap(initializer: (K) -> V): Map<K, V> {
  val map = mutableMapOf<K, V>()
  return map.withDefault { key ->
    val newValue = initializer(key)
    map[key] = newValue
    return@withDefault newValue
  }
}
```

➕ Load data chỉ khi truy cập LiveData lần đầu tiên. 

➕ Dễ dàng triển khai và hiểu ở mức độ vừa phải. 

➕ Chỉ một public API method `contacts()`.

➕ Chúng ta có thể cung cấp parameter cho ViewModel và thậm chí có thể xử lý nhiều parameter cùng thời điểm.

➖ Vẫn giữ một vài mutable state trong ViewModel.

## ✔️ Good: Library method — Lazy onActive() case

Khi sử dụng Room hoặc RxJava, chúng có adapter để có thể create LiveData trực tiếp trong @Dao objects, tương ứng sử dụng các extension method `Publisher.toLiveData()`

Cả hai thư viện implementations của `ComputableLiveData` và `PublisherLiveData` đều là lazy,  bắt đầu làm việc khi `LiveData.onActive()` được gọi. 

```java
class GetContactsUseCase {
  fun loadContacts(parameters: Parameters): Flowable<Contacts> { /* Implementation detail */ }
}

class ContactsViewModel(val getContactsUseCase: GetContactsUseCase) : ViewModel() {
  fun contacts(parameters: Parameters): LiveData<Contacts> {
    return getContactsUseCase.loadContacts(parameters).toLiveData()
  }
}
```

➕ Load data lazily chỉ khi lifecycle là active state.

➖ Việc Loading vẫn còn ghép với lifecycle, Vì `LiveData.onActive()` nghĩa là `onStart() `và có observers.

➕ Dễ dàng implement và dùng support library.

➕ Chỉ một method contacts()

➖ Trong ví dụ này chúng ta có thể tạo LiveData mới trên method call, để tránh điều này chúng ta sẽ phải giải quyết vấn đề của việc có thể có các parameter khác nhau. Lazy Map có thể giúp ở đây. 

## ✔️ Good: Pass the parameters in constructor

Trong case trước với lựa chọn lazy Map, chúng ta đã dùng Map chỉ để có thể pass parameter, nhưng có nhiều trường hợp một instance của ViewModel sẽ luôn luôn có cùng parameter. 

Sẽ tốt hơn nếu truyền parameter cho constructor và dùng lazy load hoặc bắt đầu load trong constructor. Chúng ta có thể dùng `ViewModelProvider.Factory` để lưu trữ điều này, nhưng nó sẽ có một vài vấn đề. 

```java 
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

➕ Chúng ta chỉ load data 1 lần duy nhất.

➖ Không quá khó để implement và understand, boilerplate cần thiết.

➕ Chỉ có một public API method `contacts()`.

➕ ViewModel nhận parameters trong constructor, immutable và dễ dàng test.

Nó yêu cầu thêm code để móc vào `ViewModelFactory` với cách này chúng ta có thể truyền dynamic parameters. Cùng lúc chúng ta bắt đầu có vấn đề với các phụ thuộc khác và chúng ta cần tìm ra cách làm thế nào để pass chúng vào factory cùng nhau với parameters, việc này tạo ra nhiều boilerplate code hơn.  

## Which approach to choose

Giới thiệu các thành phần kiến trúc đơn giản hóa đáng kể sự phát triển Android và giải quyết nhiều vấn đề. Tuy nhiên, vẫn còn một số câu hỏi còn lại và chúng ta đã thảo luận ở đây, vấn đề load dữ liệu ViewModel và đánh giá các tùy chọn khác nhau.

Như chúng ta đã thấy, không solution nào là hoàn hảo cả và cái quan trọng chính ở đây là việc thống nhất của team chúng ta như thế nào để đơn giản và nhất quán code trong project. Hi vọng những note phía trên sẽ giúp bạn phần nào để hoàn thiện việc phát triển Android App.

Happy coding!!!

## Refs
1. https://proandroiddev.com/when-to-load-data-in-viewmodels-ad9616940da7
2. https://github.com/jraska/github-client