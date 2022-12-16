Bài viết này tôi sẽ sử dụng Kotlin để khởi tạo ViewModel và AndroidViewModel.  Trong bài này, tôi sử dụng kỹ thuật **Delegation** trong Kotlin khá nhiều. Nếu bạn chưa biết **Delegation** trong Kotlin thì hãy đọc bài viết [này](https://play.kotlinlang.org/byExample/07_Delegation/) trước nhé. Nếu đã ok rồi thì hay đưa tay cho tôi, tôi sẽ dẫn các bạn đi qua từng ngóc ngách của chủ đề này <3

Đây là một ví dụ minh họa  ViewModel và AndroidViewModel kiểu mẫu =]].

```swift
class MyViewModel: ViewModel() {
}

class MyAndroidViewModel (app: Application)
    : AndroidViewModel(app) {
}
```

## Khởi tạo theo cách thông thường
Đây là cách mà tôi thường thấy ở các bạn newbie. 
```scala
private val viewModel = MyViewModel()
private val androidViewModel = 
    MyAndroidViewModel(requireActivity().application)
```

Với cách này chỉ ổn khi ứng dụng của bạn không cho phép xoay màn hình vì khi xoay thiết bị, activity và fragment sẽ nhảy vào **onDestroy** và sau đó khởi tạo lại view, onCreate được gọi lại. Lúc này **instance của ViewModel, AndroidViewModel cũng sẽ được khởi tạo lại**. Vì vậy tất cả **data mà ViewModel đang nắm giữ sẽ bị mất hết**. Đấy là lí do tại sao chúng ta không nên dùng cách này để khởi tạo **ViewModel**. Nếu bạn muốn ViewModel vẫn sống ngay cả khi Activity hay Fragment khởi tạo lại thì ta tiếp tục với các cách tiếp theo nhé ^^.

## Kết hợp lateinit var và ViewModelProvider

```swift
private lateinit var viewModel: MyViewModel
private lateinit var androidViewModel: MyAndroidViewModel
override fun onCreateView(
    inflater: LayoutInflater, container: ViewGroup?,
    savedInstanceState: Bundle?
): View {

    viewModel = ViewModelProvider(this).get(MyViewModel::class.java)
    androidViewModel =          
        ViewModelProvider(this).get(MyAndroidViewModel::class.java)
}
```

Sử dụng ViewModelProvider là một cách cực kì tuyệt vời để khởi tạo ViewModel. Khi activity hay fragment được tạo, ViewModelProvidr sẽ tìm cách để tái sử dụng lại ViewModel instance mà ta đã tạo thay vì tạo mới như cách thứ nhất. Thật tuyệt vời phải không nào.

## Kết hợp by lazy và ViewModelProvider
Để sử dụng Delegate **by lazy** thì ViewModel phải là **val variable**
```rust
private val viewModel: MyViewModel by lazy {
    ViewModelProvider(this).get(MyViewModel::class.java)
}

private val androidViewModel: MyAndroidViewModel by lazy {
    ViewModelProvider(this).get(MyAndroidViewModel::class.java)
}
```
Với cách này thì nhìn code có vẻ gọn hơn so với **lateinit var** ở trên. Tuy nhiên còn có một cách ngầu hơn là sử dụng **by viewModels** và **by activityViewModels**

## by viewModels / activityViewModels
Đây à Property Delegation được Kotlin support. Đầu tiên chúng ta cần thêm dependency dưới đây vào **build.gradle (module-level)**. Cập nhật version mới nhất tại [đây](https://developer.android.com/jetpack/androidx/releases/fragment).

> implementation 'androidx.fragment:fragment-ktx:1.4.0'

Thật tuyệt vời. Bây giờ ta có thể khởi tạo ViewModel giống như cách khởi bằng **by lazy** mà không cần chỉ định ViewModelProvider. Việc cần làm của bạn chỉ cần thêm by viewModels khi khởi tạo, còn những việc sau đó Kotlin sẽ tự động làm thay bạn ^^

```scala
private val viewModel: MyViewModel by viewModels()
private val androidViewModel: MyAndroidViewModel by viewModels()
```

Nếu bạn muốn chia sẻ data giữa các fragment nằm trong cùng một activity thì bạn sử dụng **by activityViewModels** . Thật tiện phải không nào...

## **by viewModels (Custom Constructor Parameter)**
Ôi không vậy khi chúng ta muốn truyền thêm tham số vào Constructor của ViewModel thì sao nhỉ? Trong ví dụ dưới đây tôi truyền thêm repository.

```scala
class MyViewModel(private val repository: Repository)
    : ViewModel() {
}

class MyAndroidViewModel(app: Application, repository: Repository)
    : AndroidViewModel(app) {
}
```

Đối với trường hợp này thì hơi phức tạp một tý. Để khởi tạo được bạn cần phải có ViewModel factory để tiếp tục.

```swift
class MyViewModelFactory(private val repository: Repository)
    : ViewModelProvider.NewInstanceFactory() {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {

        if (modelClass.isAssignableFrom(MyViewModel::class.java)) {
            return MyViewModel(repository) as T
        }

        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
```
Để tạo ra custom ViewModel factory, hãy kế thừa **ViewModelProvider.NewInstanceFactory**
Đối với AndroidViewModel factory thì hãy kế thừa **ViewModelProvider.AndroidViewModelFactory**
```swift
class MyAndroidViewModelFactory(
    private val app: Application,
    private val repository: Repository)
    : ViewModelProvider.AndroidViewModelFactory(app) {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {

        if (modelClass.isAssignableFrom(
                MyAndroidViewModel::class.java)) {

            return MyAndroidViewModel(app, repository) as T
        }

        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
```

Thực tế, chúng ta chỉ cần implement **ViewModelProvider.Factory** để thay thế cho **ViewModelProvider.AndroidViewModelFactory** và **ViewModelProvider.NewInstanceFactory**

```swift
class MyAndroidViewModelFactory(
    private val app: Application,
    private val repository: Repository)
    : ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {

        if (modelClass.isAssignableFrom(
                MyAndroidViewModel::class.java)) {

            return MyAndroidViewModel(app, repository) as T
        }

        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
```
Vậy còn khởi tạo ViewModel thì sao nhỉ?
```scala
private val viewModel: MyViewModel by viewModels {

    MyViewModelFactory(Repository())
}

private val androidViewModel: MyAndroidViewModel by viewModels {

    MyAndroidViewModelFactory(
        requireActivity().application,
        Repository())
}
```

```scala
private val viewModel: MyAndroidViewModel by activityViewModels {

    MyViewModelFactory(Repository())
}

private val androidViewModel: MyAndroidViewModel 
    by activityViewModels {

        MyAndroidViewModelFactory(
            requireActivity().application,
            Repository())
    }
```
## Áp dụng chúng vào thực tế như thế nào?
1. Tôi thường khởi tạo ViewModel theo cách cuối cùng vì thực tế tôi làm việc nhiều với ViewModel có custom constructor.
2. Khi muốn chia sẻ ViewModel giữa các Fragment thì dùng **by activityViewModels**  thay vì **by viewModel**. Tôi biết có nhiều bạn thường sử dụng Bundle để chia sẻ dữ liệu giữa các Fragments phải không nào? Bây giờ bạn đã biết thêm 1 cách cực kì cool ngầu rồi đó.
3. Khi muốn truy cập đến **string resource** hay các **service của hệ thống**. Tôi cần đến **context** để có thể truy cập được đến chúng, vì vậy tôi sử dụng **AndroidViewModel**. **AndroidViewModel** cho phép chúng ta sử dụng **Application context** trong khi đấy **ViewMode**l thì không. Đấy cũng là sự khác biệt giữa **AndroidViewModel** và **ViewModel** đấy. 
--------------------------
Github: https://github.com/iamhiutrun