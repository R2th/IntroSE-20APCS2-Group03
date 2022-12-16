![](https://cdn-images-1.medium.com/max/1070/1*pgFREsmroqa52ITl4iBPZQ.png)
# I. Mở đầu
- Một trong những tính năng quan trọng nhất của Data Binding là khả năng quan sát ([Observability](https://developer.android.com/topic/libraries/data-binding/observability)). Nó cho phép bạn liên kết các yếu tố dữ liệu và giao diện người dùng để khi dữ liệu thay đổi, các yếu tố thích hợp được cập nhật trên màn hình.
- Các nguyên hàm và chuỗi đơn giản không thể quan sát được theo mặc định, vì vậy nếu bạn sử dụng chúng trong Data Binding layouts, các giá trị của chúng sẽ được sử dụng khi liên kết được tạo nhưng các thay đổi tiếp theo đối với chúng sẽ bị bỏ qua.
- Vài năm sau, [Architecture Components,](https://developer.android.com/topic/libraries/architecture) được ban hành, trong đó có [LiveData](https://developer.android.com/topic/libraries/architecture/livedata), một thứ khác tương tự như **observable**. Đó là một ứng cử viên rõ ràng để tương thích với Data Binding, vì vậy chúng tôi đã thêm khả năng này.
- LiveData nhận thức được vòng đời nhưng đây không phải là một lợi thế lớn đối với các Observable Fields vì Liên kết dữ liệu đã kiểm tra khi chế độ xem đang hoạt động. Tuy nhiên, LiveData hỗ trợ chuyển đổi và nhiều thành phần Kiến trúc, như Room và WorkManager, hỗ trợ LiveData.
- Vì những lý do này, nó đã khuyến khích di chuyển sang LiveData. Bạn chỉ cần hai bước đơn giản để làm như vậy.

![](http://thetechnocafe.com/wp-content/uploads/2018/03/live_data_android.png)
# II. Bước 1: Thay thế Observable Fields => LiveData
- Nếu bạn đang sử dụng Observable Fields trong binding layout của mình, chỉ cần thay thế `ObservableSomething (hoặc ObservableField <Something>)` bằng `LiveData <Something>.`

* **Before:**

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

* **After:**
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

- Ngoài ra, nếu bạn tiết lộ các observables từ **ViewModel** (cách tiếp cận ưa thích) hoặc **Presenter** hoặc **Controller**, bạn không cần phải thay đổi layout của mình. Chỉ cần thay thế các ObservableFields bằng LiveData trong ViewModel.
- **Before**
```
class MyViewModel : ViewModel() {
    val name = ObservableField<String>("Ada")
}
```
- **After**
```
class MyViewModel : ViewModel() {
    private val _name = MutableLiveData<String>().apply { value = "Ada" }

    val name: LiveData<String> = _name // Expose the immutable version of the LiveData
}
```

# III. Bước 2: Thiết lập vòng đời của lifedata
- Các **Binding Class** có một phương thức gọi là `setLifecycleOwner` phải được gọi khi observable LiveData từ data binding layout.

- **Before:**
```
val binding = DataBindingUtil.setContentView<TheGeneratedBinding>(
    this,
    R.layout.activity_data_binding
)

binding.name = myLiveData // or myViewModel
```

- **After:**
```
val binding = DataBindingUtil.setContentView<TheGeneratedBinding>(
    this,
    R.layout.activity_data_binding
)

binding.lifecycleOwner = this // Use viewLifecycleOwner for fragments

binding.name = myLiveData // or myViewModel
```

> **Lưu ý: Nếu bạn cài đặt nội dung cho một fragment, bạn nên sử dụng `fragment.viewLifecyclOwner` (thay vì vòng đời Fragment) để xử lý các đoạn bị detached khỏi Fragment.**
> 

- Bây giờ bạn có thể sử dụng các đối tượng LiveData của mình với Transformations và MediatorLiveData. Nếu bạn không quen thuộc với các tính năng này, hãy xem bản ghi này của Fun Fun với LiveData, từ Android Dev Summit 2018.

{@youtube: https://www.youtube.com/watch?v=2rO4r-JOQtA}


* Nguồn: [Jose Alcérreca](https://medium.com/androiddevelopers/android-data-binding-library-from-observable-fields-to-livedata-in-two-steps-690a384218f2)