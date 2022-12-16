![](https://images.viblo.asia/5bfa79bf-e869-4cd4-9b8a-e1de85fb5b7b.png)

Kể từ Kotlin [1.4.20-M2](https://github.com/JetBrains/kotlin/releases/tag/v1.4.20-M2) JetBrains không còn dùng compiler plugin Kotlin Android Extensions nữa.

Thực ra điều này đã được mong đợi từ lâu, trong [commit](https://android-review.googlesource.com/c/platform/frameworks/support/+/882241) này, bạn có thể thấy ở phần Replaced kotlinx synthetic with findViewById:

> kotlinx.android.synthetic is no longer a recommended practice. Removing
in favour of explicit findViewById.

## Lý do?

Có một số vấn đề lớn với kotlinx synthetic:

- Để lộ ra một global namespace gồm các id không liên quan đến layout thực sự bị inflated mà không có sự kiểm tra nào (Ví dụ khi có cùng view ID ở layout khác nhau, khi dùng đến có thể import nhầm view của layout khác gây lỗi NullPointerException).
- Chỉ dùng được ở Kotlin.
- Không thực sự null safety khi layout chỉ có trong một số configurations (Ví dự layout landscape, portrait ...).
- Ngoài ra, kotlinx synthetic có thể không hoạt động trên nhiều mô-đun, có một [open issue](https://youtrack.jetbrains.com/issue/KT-22430)  từ tháng 1 năm 2018.
- Tất cả những vấn đề này khiến API làm tăng số lượng crashes cho các ứng dụng Android.

## Các lựa chọn thay thế?

- [View Binding](https://developer.android.com/topic/libraries/view-binding/) là đề xuất cho việc tương tác với View, nhưng nó có thêm một số thứ xịn hơn khi so sánh với Android Kotlin Extensions. So với Android Kotlin Extensions, nó bổ sung thêm tính năng kiểm tra tại thời gian biên dịch các tra view lookups và type safety.
- [findViewById](https://developer.android.com/reference/android/view/View#findViewById(int)) theo cách truyền thống cũ hoạt động cho cả Kotlin và Java.

JetBrains không dùng các Tiện ích mở rộng Android Kotlin để ủng hộ View Binding, vì vậy chúng ta sẽ khám phá cách chuyển sang View Binding trong bài viết này.

## View Binding

*View Binding* hoạt động với Java và Kotlin.

*View Binding* là một tính năng cho phép bạn viết code tương tác với view dễ dàng hơn.

Khi tính năng liên View Binding xem được enabled trong một mô-đun, nó tạo ra một *binding class* cho mỗi file layout XML có trong mô-đun đó. Một instance của binding class chứa các tham chiếu trực tiếp đến tất cả các View có ID trong layout tương ứng.

*View Binding* không *Null-safe* cho các layout được xác định trong nhiều configurations. *View binding* sẽ phát hiện xem một view chỉ có trong một số configurations và tạo một thuộc tính `@Nullable`.

>Note: Đừng nhầm lẫn *View Binding* với *Data Binding*

## Cách bật View binding?

Bạn không cần phải include bất kỳ thư viện bổ sung nào để bật View binding. Nó được tích hợp vào Plugin Android Gradle bắt đầu với các phiên bản được cung cấp trong Android Studio 3.6. Để bật tính năng này trong các mô-đun sẽ sử dụng nó, hãy thêm phần sau vào file `build.gradle` của bạn .

```kotlin
android {
    ....
    buildFeatures {
        viewBinding true
    }
}
```

Nếu bạn muốn file layout bị bỏ qua khi tạo các *binding class*, hãy thêm thuộc tính `tools: viewBindingIgnore = "true"` vào root view của layout đó:
```xml
<LinearLayout
    ...
        tools:viewBindingIgnore="true" >
    ...
</LinearLayout>
```
## Cách sử dụng View Binding?

Nếu tính năng view binding được bật cho một mô-đun, thì một *binding class* sẽ được tạo cho mỗi file layout XML mà mô-đun đó chứa.
Mỗi *binding class* chứa các tham chiếu đến root view và tất cả các view có ID.

Tên của *binding class* được tạo ra bằng cách chuyển tên của file XML thành kiểu chữ Pascal case và thêm từ `Binding`vào cuối, ví dụ file có tên `result_profile.xml` thì *binding class* sẽ có tên là  `ResultProfileBinding`

**Sử dụng View Binding trong các Activity**

```kotlin
private lateinit var binding: ResultProfileBinding

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    binding = ResultProfileBinding.inflate(layoutInflater)
    val view = binding.root
    setContentView(view)
}
```

Sau đó, bạn có thể truy cập các View bằng cách sử dụng đối tượng `binding`

```kotlin
bind.name.text = "String gì đó ..."
```

**Sử dụng View Binding trong các Fragment**

```kotlin
private var _binding: ResultProfileBinding? = null
// This property is only valid between onCreateView and
// onDestroyView.
private val binding get() = _binding!!

override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
): View? {
    _binding = ResultProfileBinding.inflate(inflater, container, false)
    val view = binding.root
    return view
}

override fun onDestroyView() {
    super.onDestroyView()
    _binding = null
}
```

Sau đó, bạn có thể truy cập các view bằng cách sử dụng `binding` giống như cách làm vơi Activity.

```kotlin
binding.name.text = viewModel.name
binding.button.setOnClickListener { viewModel.userClicked() }
```

>Lưu ý: 
> * The phương thức inflate() cần phải truyền vào một layout inflater. Nếu layout đã được inflated, có thể dùng phương thức static **bind()** của *binding class*.
> * Các Fragment tồn tại lâu hơn view của nó. Đảm bảo rằng bạn xóa mọi tham chiếu đến `binding class instance` trong phương thức onDestroyView () của Fragment.

## Về tính năng Parcelize trong Kotlin Android Extensions?

Tính năng Parcelize trong Kotlin là một phần của compiler plugin `kotlin-android-extensions`, vì vậy việc xóa plugin sẽ khiến tất cả các lớp [Parcelable](https://developer.android.com/reference/android/os/Parcelable.html) của bạn không biên dịch được nếu chúng phụ thuộc vào `Parcelize annotation`.

JetBrains đã [trích xuất](https://youtrack.jetbrains.com/issue/KT-42120) Parcelize từ Kotlin Android Extensions thành một plugin mới,`kotlin-parcelize`

Trước tiên, bạn sẽ cần thêm plugin `kotlin-parcelize` vào mô-đun của mình.

```kotlin
plugins {
    ....
    id 'kotlin-parcelize'
}
```

Sau đó, thay đổi câu lệnh import cũ từ

```kotlin
import kotlinx.android.parcel.Parcelize
```

thành

```kotlin
import kotlinx.parcelize.Parcelize
```

Bạn có thể tìm thấy lỗi IDE này

```
Class 'abc..' is not abstract and does not implement abstract member public abstract fun describeContents(): Int defined in android.os.Parcelable
```

Kệ nó đi, app vẫn build được bình thường, đây là một lỗi đã được báo cáo trên [youtrack](https://youtrack.jetbrains.com/issue/KT-42859) và được đánh dấu là fixed.

## Tóm lại

Đây là những gì bạn nên làm để chuyển từ plugin `kotlin-android-extensions` sang `ViewBinding`và plugin `kotlin-parcelize`:

- Xóa `kotlin-android-extensions`plugin khỏi file `build.gradle` của bạn.
- Xóa tất cả các kotlin synthetic import khỏi các activity và fragment của bạn.
- Bật tính năng `viewBinding` trong `build.gradle` ở mô-đun của bạn.
- Thêm binding object trong activities và fragments của bạn và sử dụng nó để *set content view* và truy cập các views từ file xml của bạn.
- Nếu bạn đang sử dụng `Parcelize` annotation, hãy thêm plugin `kotlin-parcelize` vào file `build.gradle` ở mô-đun của bạn và thay đổi các lệnh import như đã ghi ở trên.

## Reference
* https://developer.android.com/topic/libraries/view-binding/
* https://proandroiddev.com/migrating-the-deprecated-kotlin-android-extensions-compiler-plugin-to-viewbinding-d234c691dec7
* https://betterprogramming.pub/why-are-kotlin-synthetics-deprecated-and-what-are-the-alternatives-5c2b087dda1c