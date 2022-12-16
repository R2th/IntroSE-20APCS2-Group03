# Mở đầu
*Kể từ khi được giới thiệu, **ViewModel** đã trở thành một trong những thư viện **Jetpack** cốt lõi nhất của Android. Dựa trên dữ liệu Developer Benchmarking năm 2019, hơn 40% developer đã thêm **ViewModel** vào ứng dụng của họ. Nếu bạn không quen thuộc với **ViewModel**, lý do tại sao trường hợp này có thể không rõ ràng: **ViewModel** xây dựng kiến trúc tốt hơn bằng cách tách dữ liệu khỏi UI của bạn, giúp dễ dàng xử lý vòng đời UI đồng thời cải thiện khả năng kiểm thử.*

*Vì **ViewModels** rất cơ bản, nên có rất nhiều cải tiến trong vài năm qua để giúp chúng dễ sử dụng hơn và dễ tích hợp hơn với các thư viện khác. Trong bài viết này, mình sẽ giới thiệu 4 sự kết hợp với **ViewModels**:*

**1. Saved State trong ViewModels:** Dữ liệu ViewModel tồn tại trong quá trình khởi động lại background process

**2. NavGraph tích hợp với ViewModel:** ViewModels và sự tương thích với thư viện Navigation

**3. Sử dụng ViewModels trong Data Binding:** Liên kết dữ liệu dễ dàng với ViewModels và LiveData
 
**4. ViewModelScope:** Tích hợp Kotlin Coroutines và ViewModels

# Saved State trong ViewModels: Dữ liệu ViewModel tồn tại trong quá trình khởi động lại background process.
## Vấn đề của onSaveInstanceState
Khi ViewModels mới ra mắt, đã có một vấn đề khó hiểu liên quan đến onSaveInstanceState. Các Activity và Fragment có thể bị destroy theo 3 tình huống:
1. **Điều hướng vĩnh viễn:** Người dùng điều hướng đi hoặc đóng các Activity bằng cách nhấn nút quay lại hoặc gọi hàm finish(). Activity này sẽ biến mất vĩnh viễn.
2. **Có thay đổi cấu hình:** Người dùng xoay thiết bị hoặc thực hiện một số thay đổi cấu hình khác. Các Activity cần phải được xây dựng lại ngay lập tức.
3. **Ứng dụng được đặt trong background và quá trình của nó bị tắt:** Điều này xảy ra khi thiết bị sắp hết bộ nhớ và cần nhanh chóng giải phóng một số thứ. Khi người dùng điều hướng trở lại ứng dụng của bạn, Activity sẽ cần phải được xây dựng lại.

Trong tình huống 2 và 3, bạn muốn xây dựng lại Activity. ViewModels luôn giúp xử lý tình huống 2 cho bạn, vì ViewModel không bị destroy khi thay đổi cấu hình. Nhưng trong tình huống 3, ViewModel cũng bị destroy, vì vậy bạn thực sự cần lưu và khôi phục dữ liệu bằng cách sử dụng hàm gọi lại onSaveInstanceState trong Activity của mình.

## Saved State Module
ViewModel Saved State Module giúp bạn xử lý tình huống thứ 3 ở trên. ViewModel không còn cần phải gửi và nhận trạng thái đến từ Activity. ViewModel giờ đây thực sự có thể xử lý và giữ tất cả dữ liệu của chính nó.
Điều này được thực hiện bằng SavingStateHandle, rất giống với Bundle; Nó là dữ liệu dạng key-value. Gói SavingStateHandle này được cài đặt trong ViewModel và nó vẫn sống sót sau khi background process chết. Bất kỳ dữ liệu nào bạn phải lưu trước đó trong onSaveInstanceState giờ đây có thể được lưu trong SavingStateHandle. Ví dụ: ID của người dùng là thứ bạn có thể lưu trữ trong SavingStateHandle.

### Cài đặt Saved State Module
#### Bước 1: Thêm Dependency
`SavingStateHandle` hiện đang ở trạng thái alpha (có nghĩa là API có thể thay đổi và đang trong quá trình thu thập ý kiến phản hồi từ người dùng) và đó là một thư viện riêng.

```php
implementation ‘androidx.lifecycle:lifecycle-viewmodel-savedstate:1.0.0-alpha01’
```

#### Bước 2: Update cho ViewModelProvider
Tiếp theo, bạn muốn tạo một ViewModel có SavingStateHandle. Trong hàm onCreate của Activity hoặc Fragment, hãy cập nhật các hàm gọi đến ViewModelProvider như sau:

```php
// This ktx requires at least androidx.fragment:fragment-ktx:1.1.0 or 
// androidx.activity:activity-ktx:1.0.0
val viewModel by viewModels { SavedStateVMFactory(this) }
// Or the non-ktx way...
val viewModel = ViewModelProvider(this, SavedStateVMFactory(this))
            .get(MyViewModel::class.java)
```

Class khởi tạo ViewModel này là một ViewModel factory có nhiệm vụ tạo ra ViewModels với SavedStateHandles sẽ gọi đến SavedStateVMFactory. ViewModel được tạo giờ đây sẽ có SavedStateHandle được liên kết với Activity hoặc Fragment mà nó được truyền vào.

#### Bước 3: Sử dụng SaveStateHandle trong ViewModel
Khi đã hoàn thành tất cả, bạn có thể sử dụng SavedStateHandle trong ViewModel của bạn.

```php
class MyViewModel(state : SavedStateHandle) : ViewModel() {

    // Keep the key as a constant
    companion object {
        private val USER_KEY = "userId"
    }
    
    private val savedStateHandle = state
    
    fun saveCurrentUser(userId: String) {
        // Sets a new value for the object associated to the key.
        savedStateHandle.set(USER_KEY, userId)
    }
    
    fun getCurrentUser(): String {
        // Gets the current value of the user id from the saved state handle
        return savedStateHandle.get(USER_KEY)?: ""
    }
}
```

```php
// getLiveData gets MutableLiveData associated with a key. 
// When the value associated with the key updates, the MutableLiveData does as well.
private val _userId : MutableLiveData<String> = savedStateHandle.getLiveData(USER_KEY)

// Only expose a immutable LiveData
val userId : LiveData<String> = _userId
```

## NavGraph tích hợp với ViewModel
### Nhiệm cụ của ViewModel Sharing
Jetpack Navigation hoạt động vượt trội với các ứng dụng được thiết kế với tương đối ít Activity - hoặc thậm chí chỉ một - và chứa nhiều Fragment. Một lý do cụ thể là kiến trúc này cho phép bạn chia sẻ dữ liệu giữa các điểm đến khác nhau bằng cách tạo ViewModel được chia sẻ từ Activity. Bạn tạo một ViewModel bằng cách sử dụng Activity và sau đó bạn có thể nhận được một tham chiếu đến ViewModel đó từ bất kỳ Fragment nào của Activity:

```php
// Any fragment's onCreate or onActivityCreated
// This ktx requires at least androidx.fragment:fragment-ktx:1.1.0
val sharedViewModel: ActivityViewModel by activityViewModels()
```

### Tích hợp ViewModel NavGraph
Navigation 2.1.0 được giới thiệu là ViewModels đã kết hợp được với một Navigation Graph. Trong thực tế, điều này có nghĩa là bạn có thể lấy một tập hợp các điểm được liên kết như: luồng login, hoặc luồng checkout hoặc luồng thanh toán... đặt chúng vào một biểu đồ điều hướng và sử dụng chung một ViewModel.

Để tạo một biểu đồ điều hướng lồng nhau, bạn có thể chọn màn hình của mình, nhấp chuột phải và chọn Move to Nested Graph → New Graph:
![](https://images.viblo.asia/f3b25660-0150-4e23-ad8c-a1f662fac9df.png)

Trong chế độ xem XML, lưu ý id của biểu đồ điều hướng, trong trường hợp này là *`checkout_graph`*:

```php
<navigation app:startDestination="@id/homeFragment" ...>
    <fragment android:id="@+id/homeFragment" .../>
    <fragment android:id="@+id/productListFragment" .../>
    <fragment android:id="@+id/productFragment" .../>
    <fragment android:id="@+id/bargainFragment" .../>
    
    <navigation 
    	android:id="@+id/checkout_graph" 
    	app:startDestination="@id/cartFragment">

        <fragment android:id="@+id/orderSummaryFragment".../>
        <fragment android:id="@+id/addressFragment" .../>
        <fragment android:id="@+id/paymentFragment" .../>
        <fragment android:id="@+id/cartFragment" .../>

    </navigation>
    
</navigation>
```

Khi thực hiện xong, bạn sẽ get được ViewModel bằng cách sử dụng `by navGraphViewModels`
```php
val viewModel: CheckoutViewModel by navGraphViewModels(R.id.checkout_graph)
```

## Sử dụng ViewModels trong Data Binding
Sự tích hợp này là một cách tuy cũ nhưng hiệu quả. ViewModels thường chứa LiveData, và LiveData có nghĩa sẽ phải được observe. Điều này có nghĩa ta sẽ thêm một observe trong Fragment:

```php
override fun onActivityCreated(savedInstanceState: Bundle?) {
    super.onActivityCreated(savedInstanceState)
    
    myViewModel.name.observe(this, { newName ->
        // Update the UI. In this case, a TextView.
        nameTextView.text = newName
    })
 
}
```

Thư viện Data Binding hỗ trợ tất cả về việc quan sát dữ liệu và cập nhật lên UI. Bằng cách sử dụng đồng thời ViewModel, LiveData và Data Binding, bạn có thể không cần đến những đoạn code observe trong Fragment mà có thể tham chiếu trực tiếp ViewModel và LiveData từ bố cục XML.
#### Cách sử dụng Data Binding, ViewModel và LiveData
Thêm đoạn code dưới đây vào file XML để tham chiếu đến ViewModel:
```php
<layout xmlns:android="http://schemas.android.com/apk/res/android">
    <data>
        <variable name="viewmodel" 
                  type="com.android.MyViewModel"/>
    </data>
    <... Rest of your layout ...>
</layout>
```
Để sử dụng LiveData với Data Binding, bạn cần gọi `binding.setLifecycleOwner(this)` và truyền ViewModel cho `binding` như sau:
```php
class MainActivity : AppCompatActivity() {
    
    // This ktx requires at least androidx.activity:activity-ktx:1.0.0
    private val myViewModel: MyViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
      
         //Inflate view and create binding
        val binding: MainActivityBinding = 
            DataBindingUtil.setContentView(this, R.layout.main_activity)

        //Specify this activity as the lifecycleOwner for Data Binding
        binding.lifecycleOwner = this
        
        // Pass the ViewModel into the binding
        binding.viewmodel = myViewModel
    }

}
```

Giờ trong layout của bạn, bạn đã có thể sử dụng ViewModel. Đoạn code dưới đây mô tả việc `setText` cho TextView với `viewmodel.name`
```php
<layout xmlns:android="http://schemas.android.com/apk/res/android">
    <data>
        <variable name="viewmodel" 
                  type="com.android.MyViewModel"/>
    </data>
    <TextView
            android:id="@+id/name"
            android:text="@{viewmodel.name}"
            android:layout_height="wrap_content"
            android:layout_width="wrap_content"/>
</layout>
```

Lưu ý rằng `viewmodel.name` bắt buộc phải có kiểu String hoặc một LiveData dạng String. Nếu nó là một LiveData, UI sẽ cập nhật bất cứ khi nào LiveData thay đổi.

## ViewModel và Kotlin Coroutines: viewModelScope
### Coroutines của Android
`Kotlin Coroutines` là một cách mới để xử lý code không đồng bộ. Một cách khác để xử lý code không đồng bộ là sử dụng các`callbacks`. `Callbacks` tốt, nhưng nếu bạn viết code không đồng bộ phức tạp, bạn có thể kết thúc với nhiều cấp độ của `callback` lồng nhau; Điều này làm cho code của bạn trở nên khó hiểu. `Coroutines` đơn giản hóa tất cả những điều này, và cũng cung cấp một cách dễ dàng để đảm bảo rằng bạn không chặn `main thread`.

Một ví dụ về coroutine đơn giản trông giống như một đoạn code  thực hiện một số công việc:
```php
// Don't use GlobalScope - for example purposes only
GlobalScope.launch {
    longRunningFunction()
    anotherLongRunningFunction()
}
```

Ở đây, tôi chỉ bắt đầu một `coroutine`, nhưng khi ta có hàng trăm coroutine, khả năng ta sẽ đánh mất dấu vết của chúng. Nếu ta để mất dấu một `coroutine` và nó chạy một số công việc ta định dừng lại, đó gọi là **work leak**.

Để tránh  **work leak**, bạn nên tổ chức các `coroutines` của mình bằng cách thêm chúng vào `CoroutineScope`, đây là một đối tượng có chức năng  theo dõi các `coroutines`. `CoroutineScopes` có thể bị hủy bỏ; và khi bạn hủy bỏ một scope, nó sẽ hủy tất cả các `coroutines` liên quan.

### viewModelScope
Thường khi ViewModel của bạn bị destroy, các công việc được liên kết với ViewModel cũng nên dừng lại. `viewModelScope` là một thuộc tính mở rộng của Kotlin trên lớp ViewModel. Đó là một CoroutineScope bị hủy bỏ khi ViewModel bị hủy khi gọi `onCleared ()`. Do đó, khi bạn sử dụng ViewModel, bạn có thể bắt đầu tất cả các `coroutines` của mình bằng scope này.

Dưới đây là một ví dụ nhỏ:
```php

class MyViewModel() : ViewModel() {

    fun initialize() {
        viewModelScope.launch {
            processBitmap()
        }
    }
        
    suspend fun processBitmap() = withContext(Dispatchers.Default) {
        // Do your long running work here
    }
    
}
```

## Tổng kết
* **ViewModels** xử lý trường hợp `onSaveInstanceState` với module `SavingStateHandle`.
* Bạn có thể định nghĩa phạm vi **ViewModel** cho Jetpack Navigation NavGraph để chia sẻ dữ liệu chính xác và được đóng gói giữa các `Fragment`.
* Nếu bạn sử dụng thư viện Data Binding và ViewModels, bạn có thể chuyển ViewModel cho `binding`. Nếu bạn cũng sử dụng LiveData, hãy sử dụng  `bind.setLifecycleOwner(lifecycleOwner)`.
* Sau đó, nếu bạn sử dụng Kotlin Coroutines với ViewModel, thì hãy sử dụng `viewModelScope` để tự động hủy bỏ các `coroutines` của bạn khi ViewModel bị destroy.

##### Nguồn tham khảo:
https://medium.com/androiddevelopers/viewmodels-with-saved-state-jetpack-navigation-data-binding-and-coroutines-df476b78144e