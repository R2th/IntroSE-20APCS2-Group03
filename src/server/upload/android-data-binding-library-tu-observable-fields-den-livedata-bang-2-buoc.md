Một trong những tính năng quan trọng nhất của Data Binding là khả năng quan sát ([observability](https://developer.android.com/topic/libraries/data-binding/observability)). Nó cho phép bạn liên kết các thành phần dữ liệu và giao diện người dùng để khi dữ liệu thay đổi, các thành phần tương ứng được cập nhật trên màn hình.

Các kiểu dữ liệu nguyên thuỷ và String **không thể quan sát được theo mặc định**, vì vậy nếu bạn sử dụng chúng trong Data Binding layout, các giá trị của chúng sẽ được sử dụng khi liên kết được tạo nhưng các thay đổi tiếp theo đối với chúng sẽ bị bỏ qua.

Để làm cho các đối tượng có thể quan sát được, chúng ta sử dụng Thư viện liên kết dữ liệu ([Data Binding Library](https://developer.android.com/topic/libraries/data-binding/)) với một loạt các class có thể quan sát được: `ObservableBoolean`, `ObservableInt`, `ObservableDouble`,...và kiểu generic `ObservableField<T>`. Từ bây giờ, chúng ta sẽ gọi chúng là những `ObservableFields`.

Cho tới bây giờ, như một phần của làn sóng áp dụng Thành phần Kiến trúc ([Architecture Components](https://developer.android.com/topic/libraries/architecture)), **LiveData** đã được phát hành, đó là một thứ khác có thể quan sát được. Đó là một ứng cử viên rõ ràng để tương thích với Data Binding, vì vậy chúng ta đã sẽ sử dụng khả năng này.

[LiveData](https://developer.android.com/topic/libraries/architecture/livedata) nhận thức được vòng đời (lifecycle-aware) nhưng đây không phải là một lợi thế lớn đối với các ObservableFields vì Data Binding đã kiểm tra khi view đang hoạt động. Tuy nhiên, **LiveData hỗ trợ Chuyển đổi ([Transformations](https://developer.android.com/reference/android/arch/lifecycle/Transformations)) và nhiều Thành phần Kiến trúc (Architecture Component), như [Room](https://developer.android.com/topic/libraries/architecture/room) và [WorkManager](https://developer.android.com/reference/androidx/work/WorkManager), hỗ trợ LiveData**.

Vì những lý do này, **chúng ta được khuyến nghị chuyển sang sử dụng LiveData**. Bạn chỉ cần hai bước đơn giản để làm như vậy.

### Bước 1: Thay thế các ObservableFields bằng LiveData
Nếu bạn đang sử dụng ObservableFields trực tiếp trong data binding layout của mình, chỉ cần thay thế `ObservableSomething` (hoặc `ObservableField<Something>`) bằng `LiveData<Something>`.

Trước:
```
<data>
    <import type="android.databinding.ObservableField"/>
    <variable 
        name="name" 
        type="ObservableField&lt;String>" />
</data>
…
<TextView
    android:text="@{name}"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"/>
```
> Hãy nhớ rằng %lt; không phải là một lỗi đánh máy. Nó là ký tự < bên trong các bố cục XML.
> 

Sau:
```
<data>
        <import type="android.arch.lifecycle.LiveData" />
        <variable
            name="name"
            type="LiveData&lt;String>" />
</data>
…
<TextView
    android:text="@{name}"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"/>
```

Ngoài ra, nếu bạn phát ra các observables từ [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel) (cách tiếp cận ưa thích) hoặc presenter (ứng với mô hình MVP) hay là controller (ứng với mô hình MVC), bạn không cần phải thay layout của mình. Chỉ cần thay thế các `ObservableFields` bằng `LiveData` trong ViewModel.

Trước:
```
class MyViewModel : ViewModel() {
    val name = ObservableField<String>("Ada")
}
```

Sau:
```
class MyViewModel : ViewModel() {
    private val _name = MutableLiveData<String>().apply { value = "Ada" }

    val name: LiveData<String> = _name // Expose the immutable version of the LiveData
}
```

### Bước 2 - Thiết lập lifecycle owner cho LiveData
Các lớp liên kết có một phương thức gọi là `setLifecycleOwner` phải được gọi khi quan sát LiveData từ data binding layout.

Trước:
```
val binding = DataBindingUtil.setContentView<TheGeneratedBinding>(
    this,
    R.layout.activity_data_binding
)

binding.name = myLiveData // or myViewModel
```

Sau:
```
val binding = DataBindingUtil.setContentView<TheGeneratedBinding>(
    this,
    R.layout.activity_data_binding
)

binding.lifecycleOwner = this // Use viewLifecycleOwner for fragments

binding.name = myLiveData // or myViewModel
```

> Lưu ý: Nếu bạn cài đặt nội dung cho một đoạn, bạn nên sử dụng `fragment.viewLifecyclOwner` (thay vì vòng đời của fragment) để xử lý các fragment đã detached ngầm.
> 

### Kết luận
Bây giờ bạn có thể sử dụng các đối tượng [LiveData](https://developer.android.com/topic/libraries/architecture/livedata) của mình với [Transformations](https://developer.android.com/reference/android/arch/lifecycle/Transformations) và [MediatorLiveData](https://developer.android.com/reference/android/arch/lifecycle/MediatorLiveData). Nếu bạn không quen thuộc với các tính năng này, hãy tham khảo "[Fun with LiveData](https://www.youtube.com/watch?v=2rO4r-JOQtA)", từ Android Dev Summit 2018.

Nguồn: https://medium.com/androiddevelopers/android-data-binding-library-from-observable-fields-to-livedata-in-two-steps-690a384218f2